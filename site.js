const ensureCss=(href,id)=>{if(!document.getElementById(id)){const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)}};
ensureCss('/editorial.css?v=20260907e','editorial-css');
ensureCss('/signature.css?v=20260907d','signature-css');
ensureCss('/velocity.css?v=20260907a','velocity-css');

const path=location.pathname.replace(/^\/+|\/+$/g,'');
const page=path||'home';
document.body.dataset.page=page;

const PHONE='+491622150164';
const PHONE_LABEL='0162 / 2150164';
const LANDLINE='+4961815039675';
const LANDLINE_LABEL='06181 / 503 96 75';
const EMAIL='info@es-effizienz.de';
const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';
const WHATSAPP='https://wa.me/491622150164?text=Hallo%20ES%20Effizienz%20Services%2C%20ich%20m%C3%B6chte%20eine%20Anfrage%20stellen.';
const SITE='https://effizienz.pages.dev';

const IMG={
  signature:'/SAVE_20260907_190136.jpg',
  architecture:'https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=88&w=2200',
  property:'https://images.unsplash.com/photo-1759355787286-f1c5fd456a0d?auto=format&fit=crop&q=88&w=2200',
  garden:'https://images.unsplash.com/photo-1766603636671-484c4911a84b?auto=format&fit=crop&q=88&w=2200',
  move:'https://images.unsplash.com/photo-1780932564199-1bcb4d9e6571?auto=format&fit=crop&q=88&w=2200',
  winter:'https://images.unsplash.com/photo-1769955506606-7d6437f9c9d1?auto=format&fit=crop&q=88&w=2200',
  renovation:'https://images.unsplash.com/photo-1768321917661-d4f1a89d2185?auto=format&fit=crop&q=88&w=2200'
};
const SOURCES={
  architecture:{author:'Ellen Qin',url:'https://unsplash.com/photos/modern-white-house-with-minimalist-landscaping-and-clean-design-GEkHoBMJxjs'},
  property:{author:'ubeyonroad',url:'https://unsplash.com/photos/modern-house-with-manicured-hedges-and-gate-4b25Ic2VjiQ'},
  garden:{author:'Alef Morais',url:'https://unsplash.com/photos/modern-house-with-palm-trees-and-green-lawn-BnRBFRv2WZA'},
  move:{author:'Jimmy Liu',url:'https://unsplash.com/photos/cardboard-boxes-on-wheels-moving-past-apartment-buildings-J5KT6e4YLfA'},
  winter:{author:'Eugeniya Belova',url:'https://unsplash.com/photos/snow-plow-clearing-street-in-warm-winter-sunlight-4pv8-2E_q3g'},
  renovation:{author:'Olek Buzunov',url:'https://unsplash.com/photos/interior-of-building-under-renovation-with-exposed-framing-J2AdfKkDY5s'},
  signature:{author:'ES Effizienz Services',url:null}
};

const pageVisual={
  home:{hero:'architecture',alt:'Modernes Objekt als Symbolbild'},
  leistungen:{hero:'property',alt:'Gepflegtes modernes Objekt als Symbolbild'},
  hausmeisterservice:{hero:'property',alt:'Modernes gepflegtes Wohnobjekt als Symbolbild'},
  'abriss-entruempelung':{hero:'renovation',alt:'Innenraum während einer Renovierung als Symbolbild'},
  winterdienst:{hero:'winter',alt:'Winterdienst und Schneeräumung als Symbolbild'},
  umzug:{hero:'move',alt:'Umzug und Transport als Symbolbild'},
  'garten-landschaftsbau':{hero:'garden',alt:'Gepflegte Außenanlage als Symbolbild'},
  'ueber-uns':{hero:'architecture',alt:'Moderne Architektur als Symbolbild'},
  referenzen:{hero:'property',alt:'Modernes Objekt als Symbolbild'},
  faq:{hero:'architecture',alt:'Modernes Objekt als Symbolbild'},
  kontakt:{hero:'garden',alt:'Gepflegtes Objekt als Symbolbild'}
};

const serviceImageByHref={
  '/hausmeisterservice/':'property',
  '/abriss-entruempelung/':'renovation',
  '/winterdienst/':'winter',
  '/umzug/':'move',
  '/garten-landschaftsbau/':'garden'
};
const servicePoster={
  hausmeisterservice:{image:'property',eyebrow:'Hausmeister- & Gebäudeservice',title:'Präsenz, die <em>man merkt.</em>',facts:['Regelmäßige Objektkontrolle','Direkte Abstimmung','Kleinleistungen nach Bedarf','Außenbereiche optional']},
  'abriss-entruempelung':{image:'renovation',eyebrow:'Entrümpelung · Haushaltsauflösung · Abbruch',title:'Platz entsteht durch <em>klare Entscheidungen.</em>',facts:['Räumung & Organisation','Haushaltsauflösung','Demontage nach Vereinbarung','Sauberer Abschluss']},
  winterdienst:{image:'winter',eyebrow:'Winterdienst',title:'Bereit, wenn <em>es zählt.</em>',facts:['Wege & Zufahrten','Planbare Einsätze','Direkte Erreichbarkeit','Rhein-Main']},
  umzug:{image:'move',eyebrow:'Umzug',title:'Von A nach B. <em>Ohne Reibung.</em>',facts:['Privat & gewerblich','Rhein-Main','Deutschlandweit','Klare Koordination']},
  'garten-landschaftsbau':{image:'garden',eyebrow:'Gartenpflege & Außenanlagen',title:'Außenbereiche mit <em>Haltung.</em>',facts:['Pflege & Ordnung','Grundstücke','Regelmäßig oder einzeln','Direkte Abstimmung']}
};

function ensureMeta(selector,attrs){
  let el=document.head.querySelector(selector);
  if(!el){el=document.createElement('meta');document.head.appendChild(el)}
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
  return el;
}
function enhanceSeo(){
  const canonicalPath=location.pathname.endsWith('/')?location.pathname:`${location.pathname}/`;
  const canonical=`${SITE}${canonicalPath==='//'?'/':canonicalPath}`;
  let c=document.head.querySelector('link[rel="canonical"]');
  if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}
  c.href=canonical;
  ensureMeta('meta[property="og:site_name"]',{property:'og:site_name',content:'ES Effizienz Services'});
  ensureMeta('meta[property="og:url"]',{property:'og:url',content:canonical});
  ensureMeta('meta[property="og:type"]',{property:'og:type',content:'website'});
  ensureMeta('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
  ensureMeta('meta[name="twitter:title"]',{name:'twitter:title',content:document.title});
  const desc=document.head.querySelector('meta[name="description"]')?.content||'ES Effizienz Services – Umzug, Entrümpelung, Hausmeisterservice, Gartenpflege und Winterdienst im Rhein-Main-Gebiet und deutschlandweit.';
  ensureMeta('meta[name="twitter:description"]',{name:'twitter:description',content:desc});
  ensureMeta('meta[name="format-detection"]',{name:'format-detection',content:'telephone=yes'});
  if(!document.head.querySelector('link[data-unsplash-preconnect]')){const p=document.createElement('link');p.rel='preconnect';p.href='https://images.unsplash.com';p.crossOrigin='anonymous';p.dataset.unsplashPreconnect='1';document.head.appendChild(p)}
  if(!document.getElementById('business-schema')){
    const schema=document.createElement('script');schema.type='application/ld+json';schema.id='business-schema';
    schema.textContent=JSON.stringify({
      '@context':'https://schema.org','@type':['LocalBusiness','HomeAndConstructionBusiness'],
      name:'ES Effizienz Services UG (haftungsbeschränkt)',url:SITE+'/',image:SITE+'/SAVE_20260907_190136.jpg',logo:SITE+'/Picture2.png',
      telephone:[LANDLINE,PHONE],email:EMAIL,priceRange:'€€',
      address:{'@type':'PostalAddress',streetAddress:'In der Aue 22',postalCode:'63486',addressLocality:'Bruchköbel',addressCountry:'DE'},
      areaServed:[{'@type':'Place',name:'Rhein-Main-Gebiet'},{'@type':'Country',name:'Deutschland'}],
      sameAs:[INSTAGRAM],
      contactPoint:[{'@type':'ContactPoint',telephone:LANDLINE,contactType:'customer service',availableLanguage:['de']},{'@type':'ContactPoint',telephone:PHONE,contactType:'mobile',availableLanguage:['de']},{'@type':'ContactPoint',url:WHATSAPP,contactType:'customer service',availableLanguage:['de']}],
      hasOfferCatalog:{'@type':'OfferCatalog',name:'Leistungen',itemListElement:['Umzug','Entrümpelung und Haushaltsauflösung','Hausmeister- und Gebäudeservice','Gartenpflege und Außenanlagen','Winterdienst','Abbrucharbeiten'].map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name}}))}
    });
    document.head.appendChild(schema);
  }
}
enhanceSeo();

function imageEl(type,alt,eager=false){
  const img=document.createElement('img');
  img.src=IMG[type];img.alt=alt;img.decoding='async';img.loading=eager?'eager':'lazy';
  if(eager) img.fetchPriority='high';
  if(type!=='signature'){
    img.referrerPolicy='no-referrer';
    img.onerror=()=>{img.onerror=null;img.src=IMG.signature;};
  }
  return img;
}
function makePhoto(type,alt,cls='cinematic-media'){
  const fig=document.createElement('figure');fig.className=`${cls} site-photo-reveal`;
  fig.append(imageEl(type,alt,cls==='cinematic-media'));
  const cap=document.createElement('figcaption');
  const label=document.createElement('span');label.textContent=type==='signature'?'Markenmotiv':'Symbolbild';cap.append(label);
  const src=SOURCES[type];
  if(src?.url){const a=document.createElement('a');a.href=src.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=`Foto · ${src.author} / Unsplash`;cap.append(a)}
  else{const s=document.createElement('span');s.textContent='ES Effizienz Services';cap.append(s)}
  fig.append(cap);return fig;
}

function enhanceHero(){
  const visual=pageVisual[page];if(!visual)return;
  const aside=document.querySelector('.page-hero .hero-aside');
  if(aside&&!aside.querySelector('.cinematic-media')){
    aside.prepend(makePhoto(visual.hero,visual.alt));
    aside.querySelector('.info-card')?.classList.add('floating-spec');
  }
}
enhanceHero();

function addTrustStrip(){
  const hero=document.querySelector('.page-hero');
  if(!hero||document.querySelector('.lux-strip')||['impressum','datenschutz'].includes(page))return;
  const strip=document.createElement('section');strip.className='lux-strip';
  strip.innerHTML=`<div class="lux-strip__inner"><div class="lux-strip__item"><small>Einsatzgebiet</small><strong>Rhein-Main</strong></div><div class="lux-strip__item"><small>Aufträge</small><strong>Deutschlandweit</strong></div><div class="lux-strip__item"><small>Festnetz · Mobil</small><strong>${LANDLINE_LABEL}<br>${PHONE_LABEL}</strong></div><div class="lux-strip__item"><small>Prinzip</small><strong>Alles aus einer Hand</strong></div></div>`;
  hero.after(strip);
}
addTrustStrip();

function addTicker(){
  const anchor=document.querySelector('.lux-strip')||document.querySelector('.page-hero');
  if(!anchor||document.querySelector('.velocity-ticker')||['impressum','datenschutz'].includes(page))return;
  const items=['Hausmeisterservice','Entrümpelung','Haushaltsauflösung','Umzug','Gartenpflege','Winterdienst','Rhein-Main','Deutschlandweit'];
  const sec=document.createElement('div');sec.className='velocity-ticker';
  const track=document.createElement('div');track.className='velocity-ticker__track';
  [...items,...items].forEach(t=>{const s=document.createElement('span');s.textContent=t;track.append(s)});
  sec.append(track);anchor.after(sec);
}
addTicker();

function upgradeServiceCards(){
  if(!['home','leistungen'].includes(page))return;
  const group=document.querySelector('section.content:not(.dark-section) .cards');
  if(!group||group.classList.contains('service-editorial'))return;
  group.classList.add('service-editorial');
  group.querySelectorAll('.card').forEach((card,i)=>{
    card.dataset.index=String(i+1).padStart(2,'0');
    const href=card.getAttribute('href')||'';const type=serviceImageByHref[href]||'architecture';
    const media=document.createElement('figure');media.className='service-media';media.append(imageEl(type,card.querySelector('h3')?.textContent||'Leistung'));
    const copy=document.createElement('div');copy.className='service-copy';
    [...card.children].forEach(el=>{if(!el.classList.contains('service-media'))copy.append(el)});
    card.prepend(media);card.append(copy);
  });
}
upgradeServiceCards();

function makeVisualMosaic(){
  if(!['home','leistungen'].includes(page)||document.querySelector('.visual-mosaic'))return;
  const first=document.querySelector('section.content');if(!first)return;
  const types=page==='home'?['move','garden','winter']:['renovation','property','move'];
  const sec=document.createElement('section');sec.className='visual-mosaic reveal';
  const grid=document.createElement('div');grid.className='visual-mosaic__grid';
  const main=document.createElement('figure');main.className='visual-mosaic__main';main.append(imageEl(types[0],'Dienstleistung als Symbolbild'));
  const copy=document.createElement('div');copy.className='visual-mosaic__copy';
  copy.innerHTML=`<div class="eyebrow">ES Effizienz Services</div><h2>${page==='home'?'Wir schaffen Platz.<br><em>Wir schaffen Freiraum.</em>':'Mehr Leistung.<br><em>Weniger Umwege.</em>'}</h2>`;main.append(copy);
  const side=document.createElement('div');side.className='visual-mosaic__side';
  [[types[1],'Außenbereiche'],[types[2],page==='home'?'Winterdienst':'Umzug & Organisation']].forEach(([type,label])=>{const f=document.createElement('figure');f.append(imageEl(type,`${label} als Symbolbild`));const l=document.createElement('span');l.className='visual-mosaic__label';l.textContent=label;f.append(l);side.append(f)});
  grid.append(main,side);sec.append(grid);first.after(sec);
}
makeVisualMosaic();

function makeManifesto(){
  if(!['home','leistungen','ueber-uns'].includes(page)||document.querySelector('.detail-story'))return;
  const target=document.querySelector('.dark-section')||document.querySelector('.cta');if(!target)return;
  const copy=page==='leistungen'
    ?{eye:'Unser Anspruch',title:'Qualität entsteht,<br><em>wenn Details stimmen.</em>',p:'Klare Kommunikation, direkte Wege und ein Ergebnis, das ordentlich übergeben werden kann. Nicht kompliziert. Sondern konsequent.'}
    :{eye:'Wo Details Form annehmen',title:'Ordnung ist kein Extra.<br><em>Sie ist der Standard.</em>',p:'Von der ersten Abstimmung bis zum letzten Handgriff soll sich Zusammenarbeit einfach anfühlen. Dafür steht ES Effizienz Services: anpacken, sauber arbeiten, zuverlässig abschließen.'};
  const sec=document.createElement('section');sec.className='detail-story reveal';
  sec.innerHTML=`<div class="detail-story__grid"><figure class="detail-story__media"><img src="${IMG.signature}" alt="Architektonisches Detail und Materialität als Markenmotiv von ES Effizienz Services"></figure><div class="detail-story__copy"><div><div class="eyebrow">${copy.eye}</div><h2>${copy.title}</h2><p>${copy.p}</p></div><div class="detail-story__footer"><span>Rhein-Main · Deutschlandweit</span><span>Sie haben die Aufgabe. Wir die Lösung.</span></div></div></div>`;
  target.before(sec);
}
makeManifesto();

function makeServicePoster(){
  const cfg=servicePoster[page];if(!cfg||document.querySelector('.velocity-poster'))return;
  const target=document.querySelector('.cta');if(!target)return;
  const sec=document.createElement('section');sec.className='velocity-poster reveal';
  const media=document.createElement('div');media.className='velocity-poster__media';media.append(imageEl(cfg.image,`${cfg.eyebrow} als Symbolbild`));
  const copy=document.createElement('div');copy.className='velocity-poster__copy';
  copy.innerHTML=`<div><div class="eyebrow">${cfg.eyebrow}</div><h2>${cfg.title}</h2></div><div class="velocity-poster__facts">${cfg.facts.map(f=>`<span>${f}</span>`).join('')}</div>`;
  sec.append(media,copy);target.before(sec);
}
makeServicePoster();

function addContactSocials(){
  const panel=document.querySelector('.contact-panel');if(!panel||panel.querySelector('.social-quick'))return;
  const box=document.createElement('div');box.className='social-quick';
  box.innerHTML=`<a href="tel:${PHONE}" aria-label="ES Effizienz Services anrufen">Anrufen</a><a href="${WHATSAPP}" target="_blank" rel="noopener" aria-label="ES Effizienz Services über WhatsApp kontaktieren">WhatsApp</a><a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="ES Effizienz Services auf Instagram">Instagram</a>`;
  panel.querySelector('.contact-methods')?.after(box);
}
addContactSocials();

function addDock(){
  if(document.querySelector('.velocity-dock')||['impressum','datenschutz'].includes(page))return;
  const dock=document.createElement('div');dock.className='velocity-dock';dock.setAttribute('aria-label','Schnellkontakt');
  dock.innerHTML=`<a data-action="call" href="tel:${PHONE}" aria-label="Anrufen">Anrufen</a><a data-action="whatsapp" href="${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a><a data-action="instagram" href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a><a data-action="request" href="/kontakt/" aria-label="Projekt anfragen">Projekt anfragen ↗</a>`;
  document.body.append(dock);
}
addDock();

function normalizeActions(){
  document.querySelectorAll(`a[href="tel:${PHONE}"],a[href="tel:+491622150164"]`).forEach(a=>{if(!a.getAttribute('aria-label'))a.setAttribute('aria-label','ES Effizienz Services mobil anrufen')});
  document.querySelectorAll(`a[href="tel:${LANDLINE}"],a[href="tel:+4961815039675"]`).forEach(a=>{if(!a.getAttribute('aria-label'))a.setAttribute('aria-label','ES Effizienz Services Festnetz anrufen')});
  document.querySelectorAll(`a[href="mailto:${EMAIL}"]`).forEach(a=>{if(!a.getAttribute('aria-label'))a.setAttribute('aria-label','E-Mail an ES Effizienz Services senden')});
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));rel.add('noopener');a.setAttribute('rel',[...rel].join(' '))});
}
normalizeActions();

const header=document.querySelector('header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('nav');
let lastY=0;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;header?.classList.toggle('scrolled',y>12);lastY=y;
},{passive:true});
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

document.querySelectorAll('.cards').forEach(group=>group.querySelectorAll('.card').forEach((card,i)=>{if(!card.dataset.index)card.dataset.index=String(i+1).padStart(2,'0')}));

const observed=document.querySelectorAll('.reveal,.site-photo-reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});
  observed.forEach(el=>io.observe(el));
}else observed.forEach(el=>el.classList.add('in'));
requestAnimationFrame(()=>document.body.classList.add('site-ready'));

document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item')?.classList.toggle('open')));
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

const footerLinks=document.querySelector('.footer-links');
if(footerLinks){
  [[`tel:${LANDLINE}`,`Festnetz ${LANDLINE_LABEL}`],[`tel:${PHONE}`,`Mobil ${PHONE_LABEL}`],[`mailto:${EMAIL}`,'E-Mail'],[WHATSAPP,'WhatsApp'],[INSTAGRAM,'Instagram']].forEach(([href,label])=>{
    if(!footerLinks.querySelector(`a[href="${href}"]`)){const a=document.createElement('a');a.href=href;a.textContent=label;if(href.startsWith('http')){a.target='_blank';a.rel='noopener'}footerLinks.prepend(a)}
  });
}

if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  document.querySelectorAll('.cinematic-media').forEach(box=>{
    const img=box.querySelector('img');if(!img)return;
    box.addEventListener('mousemove',e=>{const r=box.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;img.style.transform=`scale(1.04) translate(${x*-10}px,${y*-10}px)`});
    box.addEventListener('mouseleave',()=>img.style.transform='scale(1) translate(0,0)');
  });
}

const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();const data=new FormData(form),get=k=>(data.get(k)||'').toString().trim();
  const subject=`Projektanfrage – ${get('service')||'Effizienz Services'}`;
  const body=[`Name: ${get('name')}`,`Firma / Objekt: ${get('company')}`,`E-Mail: ${get('email')}`,`Telefon: ${get('phone')}`,`Leistung: ${get('service')}`,`Ort / PLZ: ${get('location')}`,'','Nachricht:',get('message')].join('\n');
  const status=document.querySelector('#formStatus');if(status)status.textContent=`Ihr E-Mail-Programm wird geöffnet. Die Nachricht wird an ${EMAIL} vorbereitet.`;
  window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
