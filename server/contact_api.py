#!/usr/bin/env python3
import html
import json
import re
import smtplib
import ssl
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

CONFIG_PATH = Path('/etc/effizienz-mail.json')
HOST = '127.0.0.1'
PORT = 8765
MAX_BODY = 64 * 1024
RATE_WINDOW = 10 * 60
RATE_LIMIT = 5
REQUESTS = defaultdict(deque)
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')


def load_config():
    data = json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
    required = ['smtp_user', 'smtp_password', 'mail_to']
    missing = [key for key in required if not str(data.get(key, '')).strip()]
    if missing:
        raise RuntimeError('Missing mail configuration: ' + ', '.join(missing))
    data.setdefault('smtp_host', 'smtps.udag.de')
    data.setdefault('smtp_port', 465)
    data.setdefault('mail_from', data['smtp_user'])
    return data


def clean(value, max_len):
    value = str(value or '').replace('\x00', '').strip()
    return value[:max_len]


def allowed(ip):
    now = time.time()
    bucket = REQUESTS[ip]
    while bucket and bucket[0] < now - RATE_WINDOW:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT:
        return False
    bucket.append(now)
    return True


def send_mail(config, payload):
    service = clean(payload.get('service'), 120) or 'Allgemeine Anfrage'
    name = clean(payload.get('name'), 120)
    company = clean(payload.get('company'), 160)
    email = clean(payload.get('email'), 200)
    phone = clean(payload.get('phone'), 80)
    location = clean(payload.get('location'), 120)
    message = clean(payload.get('message'), 5000)

    rows = [
        ('Name', name),
        ('Firma / Objekt', company or '—'),
        ('E-Mail', email),
        ('Telefon', phone or '—'),
        ('Leistung', service),
        ('Ort / PLZ', location or '—'),
    ]
    plain_rows = '\n'.join(f'{label}: {value}' for label, value in rows)
    plain = f'Neue Projektanfrage über es-effizienz.de\n\n{plain_rows}\n\nNachricht:\n{message}\n'

    row_html = ''.join(
        f'<tr><td style="padding:8px 12px;color:#6f6258;border-bottom:1px solid #e7dfd7">{html.escape(label)}</td>'
        f'<td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #e7dfd7">{html.escape(value)}</td></tr>'
        for label, value in rows
    )
    admin_html = f'''<!doctype html><html><body style="margin:0;background:#f4f1ec;font-family:Arial,sans-serif;color:#10191b">
<div style="max-width:680px;margin:0 auto;padding:28px 16px">
  <div style="background:#10191b;color:white;padding:22px 26px"><div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#c69878">ES Effizienz Services</div><h1 style="font-size:26px;margin:8px 0 0">Neue Projektanfrage</h1></div>
  <div style="background:white;padding:22px 26px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">{row_html}</table>
    <div style="margin-top:22px"><div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8c7768">Nachricht</div><p style="font-size:16px;line-height:1.65;white-space:pre-wrap">{html.escape(message)}</p></div>
  </div>
  <div style="padding:16px 4px;color:#7c716a;font-size:12px">Gesendet über das Kontaktformular auf es-effizienz.de</div>
</div></body></html>'''

    admin = EmailMessage()
    admin['Subject'] = f'Neue Projektanfrage – {service}'
    admin['From'] = f'ES Effizienz Website <{config["mail_from"]}>'
    admin['To'] = config['mail_to']
    admin['Reply-To'] = email
    admin.set_content(plain)
    admin.add_alternative(admin_html, subtype='html')

    confirmation = EmailMessage()
    confirmation['Subject'] = 'Ihre Anfrage bei ES Effizienz Services'
    confirmation['From'] = f'ES Effizienz Services <{config["mail_from"]}>'
    confirmation['To'] = email
    confirmation.set_content(
        f'Hallo {name},\n\nvielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.\n\n'
        f'Leistung: {service}\nOrt / PLZ: {location or "—"}\n\nES Effizienz Services UG (haftungsbeschränkt)\n'
        f'06181 / 503 96 75 · 0162 / 2150164\ninfo@es-effizienz.de\n'
    )
    confirmation_html = f'''<!doctype html><html><body style="margin:0;background:#f4f1ec;font-family:Arial,sans-serif;color:#10191b">
<div style="max-width:640px;margin:0 auto;padding:30px 16px"><div style="background:white;border:1px solid #ded5cc;padding:30px">
<div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a66f4d">ES Effizienz Services</div>
<h1 style="font-size:28px;margin:10px 0 16px">Vielen Dank für Ihre Anfrage.</h1>
<p style="font-size:16px;line-height:1.65">Hallo {html.escape(name)},<br><br>wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.</p>
<div style="margin:24px 0;padding:16px;background:#f4f1ec"><strong>{html.escape(service)}</strong><br><span style="color:#6d625b">{html.escape(location or 'Rhein-Main / deutschlandweit')}</span></div>
<p style="line-height:1.65">ES Effizienz Services UG (haftungsbeschränkt)<br>06181 / 503 96 75 · 0162 / 2150164<br><a href="mailto:info@es-effizienz.de" style="color:#8b5b3d">info@es-effizienz.de</a></p>
</div></div></body></html>'''
    confirmation.add_alternative(confirmation_html, subtype='html')

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(config['smtp_host'], int(config['smtp_port']), timeout=20, context=context) as smtp:
        smtp.login(config['smtp_user'], config['smtp_password'])
        smtp.send_message(admin)
        smtp.send_message(confirmation)


class Handler(BaseHTTPRequestHandler):
    server_version = 'EffizienzContact/1.0'

    def log_message(self, fmt, *args):
        print(f'{self.address_string()} - {fmt % args}', flush=True)

    def json_response(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path != '/health':
            return self.json_response(404, {'ok': False})
        try:
            load_config()
            return self.json_response(200, {'ok': True, 'service': 'contact-mail'})
        except Exception:
            return self.json_response(503, {'ok': False, 'service': 'contact-mail'})

    def do_POST(self):
        if urlparse(self.path).path != '/send':
            return self.json_response(404, {'ok': False, 'message': 'Nicht gefunden.'})

        forwarded = self.headers.get('X-Forwarded-For', '')
        ip = forwarded.split(',')[0].strip() if forwarded else self.client_address[0]
        if not allowed(ip):
            return self.json_response(429, {'ok': False, 'message': 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.'})

        try:
            length = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY:
            return self.json_response(400, {'ok': False, 'message': 'Ungültige Anfrage.'})

        try:
            payload = json.loads(self.rfile.read(length).decode('utf-8'))
        except Exception:
            return self.json_response(400, {'ok': False, 'message': 'Ungültige Anfrage.'})

        if clean(payload.get('website'), 200):
            return self.json_response(200, {'ok': True})

        name = clean(payload.get('name'), 120)
        email = clean(payload.get('email'), 200)
        message = clean(payload.get('message'), 5000)
        if len(name) < 2 or not EMAIL_RE.match(email) or len(message) < 5:
            return self.json_response(422, {'ok': False, 'message': 'Bitte prüfen Sie Name, E-Mail-Adresse und Nachricht.'})

        try:
            send_mail(load_config(), payload)
        except Exception as exc:
            print(f'Mail send failed: {type(exc).__name__}: {exc}', flush=True)
            return self.json_response(502, {'ok': False, 'message': 'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.'})

        return self.json_response(200, {'ok': True, 'message': 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Eine Bestätigung wurde an Ihre E-Mail-Adresse geschickt.'})


if __name__ == '__main__':
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'Effizienz contact API listening on {HOST}:{PORT}', flush=True)
    httpd.serve_forever()
