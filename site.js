const ensureCss=(href,id)=>{if(!document.getElementById(id)){const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)}};
ensureCss('/editorial.css?v=20260907d','editorial-css');
ensureCss('/signature.css?v=20260907a','signature-css');

const path=location.pathname.replace(/^\/+|\/+$/g,'');
const page=path||'home';
document.body.dataset.page=page;

const IMG={
  signature:'/assets/detail-shape.webp',
  architecture:'https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=84&w=2000',
  property:'https://images.unsplash.com/photo-1759355787286-f1c5fd456a0d?auto=format&fit=crop&q=84&w=2000',
  garden:'https://images.unsplash.com/photo-1766603636671-484c4911a84b?auto=format&fit=crop&q=84&w=2000',
  move:'https://images.unsplash.com/photo-1780932564199-1bcb4d9e6571?auto=format&fit=crop&q=84&w=2000',
  winter:'https://images.unsplash.com/photo-1769955506606-7d6437f9c9d1?auto=format&fit=crop&q=84&w=2000',
  renovation:'https://images.unsplash.com/photo-1768321917661-d4f1a89d2185?auto=format&fit=crop&q=84&w=2000'
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
  home:{hero:'architecture',band:'move',alt:'Modernes Objekt als Symbolbild',label:'Rhein-Main · Deutschlandweit',title:'Sie haben die Aufgabe. <em>Wir die Lösung.</em>'},
  leistungen:{hero:'property',band:'renovation',alt:'Gepflegtes modernes Objekt als Symbolbild',label:'Mehrere Leistungen · ein Ansprechpartner',title:'Platz. Ordnung. <em>Freiraum.</em>'},
  hausmeisterservice:{hero:'property',band:'architecture',alt:'Modernes gepflegtes Wohnobjekt als Symbolbild',label:'Hausmeister- & Gebäudeservice',title:'Objekte im Blick. <em>Abläufe im Griff.</em>'},
  'abriss-entruempelung':{hero:'renovation',band:'renovation',alt:'Innenraum während einer Renovierung als Symbolbild',label:'Entrümpelung · Haushaltsauflösung · Abbruch',title:'Freiraum beginnt mit <em>einem klaren Schnitt.</em>'},
  winterdienst:{hero:'winter',band:'property',alt:'Winterdienst und Schneeräumung als Symbolbild',label:'Winterdienst',title:'Bereit, wenn <em>es darauf ankommt.</em>'},
  umzug:{hero:'move',band:'architecture',alt:'Umzug und Transport als Symbolbild',label:'Umzug · Rhein-Main · Deutschlandweit',title:'Von hier nach dort. <em>Ohne Umwege.</em>'},
  'garten-landschaftsbau':{hero:'garden',band:'property',alt:'Gepflegte Außenanlage als Symbolbild',label:'Gartenpflege & Außenanlagen',title:'Außenbereiche mit <em>klarem Anspruch.</em>'},
  'ueber-uns':{hero:'architecture',band:'signature',alt:'Architektur und Materialität als Markenmotiv',label:'ES Effizienz Services',title:'Persönlich geführt. <em>Direkt erreichbar.</em>'},
  referenzen:{hero:'property',band:'renovation',alt:'Modernes Objekt als Symbolbild',label:'Referenzen',title:'Ergebnisse, die <em>für sich sprechen.</em>'},
  faq:{hero:'architecture',band:'property',alt:'Modernes Objekt als Symbolbild',label:'Fragen & Antworten',title:'Klar gefragt. <em>Klar beantwortet.</em>'},
  kontakt:{hero:'garden',band:'architecture',alt:'Gepflegtes Objekt als Symbolbild',label:'Kontakt · 0162 / 2150164',title:'Einfach anfragen. <em>Wir machen den Rest.</em>'}
};

function imageEl(type,alt,eager=false){
  const img=document.createElement('img');img.src=IMG[type];img.alt=alt;img.decoding='async';img.loading=eager?'eager':'lazy';if(eager)img.fetchPriority='high';
  if(type!=='signature'){img.referrerPolicy='no-referrer';img.onerror=()=>{img.onerror=null;img.src=IMG.signature;};}
  return img;
}
function makePhoto(type,alt,cls='cinematic-media'){
  const fig=document.createElement('figure');fig.className=`${cls} site-photo-reveal`;fig.append(imageEl(type,alt,cls==='cinematic-media'));
  const cap=document.createElement('figcaption');const label=document.createElement('span');label.textContent=type==='signature'?'Markenmotiv':'Symbolbild';cap.append(label);
  const src=SOURCES[type];if(src?.url){const credit=document.createElement('a');credit.href=src.url;credit.target='_blank';credit.rel='noopener noreferrer';credit.textContent=`Foto · ${src.author} / Unsplash`;cap.append(credit)}else{const credit=document.createElement('span');credit.textContent='ES Effizienz Services';cap.append(credit)}
  fig.append(cap);return fig;
}

const visual=pageVisual[page];
if(visual){
  const heroAside=document.querySelector('.page-hero .hero-aside');
  if(heroAside && !heroAside.querySelector('.cinematic-media')){
    heroAside.prepend(makePhoto(visual.hero,visual.alt));
    heroAside.querySelector('.info-card')?.classList.add('floating-spec');
  }
}

function addTrustStrip(){
  const hero=document.querySelector('.page-hero');if(!hero||document.querySelector('.lux-strip')||['impressum','datenschutz'].includes(page))return;
  const strip=document.createElement('section');strip.className='lux-strip';
  strip.innerHTML=`<div class="lux-strip__inner"><div class="lux-strip__item"><small>Einsatzgebiet</small><strong>Rhein-Main</strong></div><div class="lux-strip__item"><small>Aufträge</small><strong>Deutschlandweit</strong></div><div class="lux-strip__item"><small>Direktkontakt</small><strong>0162 / 2150164</strong></div><div class="lux-strip__item"><small>Leistung</small><strong>Alles aus einer Hand</strong></div></div>`;
  hero.after(strip);
}
addTrustStrip();

function makeMosaic(){
  if(!['home','leistungen'].includes(page)||document.querySelector('.visual-mosaic'))return;
  const anchor=document.querySelector('section.content');if(!anchor)return;
  const types=page==='home'?['move','garden','winter']:['renovation','property','move'];
  const section=document.createElement('section');section.className='visual-mosaic reveal';
  const grid=document.createElement('div');grid.className='visual-mosaic__grid';
  const main=document.createElement('figure');main.className='visual-mosaic__main';main.append(imageEl(types[0],'Dienstleistung als Symbolbild'));
  const copy=document.createElement('div');copy.className='visual-mosaic__copy';copy.innerHTML=`<div class="eyebrow">ES Effizienz Services</div><h2>${page==='home'?'Wir schaffen Platz.<br><em>Wir schaffen Freiraum.</em>':'Mehr Leistung.<br><em>Weniger Umwege.</em>'}</h2>`;main.append(copy);
  const side=document.createElement('div');side.className='visual-mosaic__side';
  [[types[1],'Außenbereiche'],[types[2],page==='home'?'Winterdienst':'Umzug & Organisation']].forEach(([type,label])=>{const f=document.createElement('figure');f.append(imageEl(type,`${label} als Symbolbild`));const l=document.createElement('span');l.className='visual-mosaic__label';l.textContent=label;f.append(l);side.append(f)});
  grid.append(main,side);section.append(grid);anchor.after(section);
}
makeMosaic();

function makeDetailStory(){
  if(!['home','ueber-uns','leistungen'].includes(page)||document.querySelector('.detail-story'))return;
  const target=document.querySelector('.dark-section')||document.querySelector('.cta');if(!target)return;
  const sec=document.createElement('section');sec.className='detail-story reveal';
  const text=page==='leistungen'?{eye:'Unser Anspruch',title:'Qualität entsteht,<br><em>wenn Details stimmen.</em>',p:'Nicht möglichst kompliziert, sondern sauber organisiert: klare Kommunikation, direkte Wege und ein Ergebnis, das ordentlich übergeben werden kann.'}:{eye:'Wo Details Form annehmen',title:'Ordnung ist kein Extra.<br><em>Sie ist der Standard.</em>',p:'Von der ersten Abstimmung bis zum letzten Handgriff soll sich Zusammenarbeit einfach anfühlen. Genau dafür steht ES Effizienz Services: anpacken, sauber arbeiten, zuverlässig abschließen.'};
  sec.innerHTML=`<div class="detail-story__grid"><figure class="detail-story__media"><img src="/assets/detail-shape.webp" alt="Architektonisches Detail und Materialität als Markenmotiv von ES Effizienz Services"></figure><div class="detail-story__copy"><div><div class="eyebrow">${text.eye}</div><h2>${text.title}</h2><p>${text.p}</p></div><div class="detail-story__footer"><span>Rhein-Main · Deutschlandweit</span><span>Sie haben die Aufgabe. Wir die Lösung.</span></div></div></div>`;
  target.before(sec);
}
makeDetailStory();

if(visual){
  const cta=document.querySelector('.cta');
  if(cta && !document.querySelector('.cinema-band') && !['home','leistungen','ueber-uns'].includes(page)){
    const band=document.createElement('section');band.className='cinema-band reveal';
    const media=makePhoto(visual.band,visual.alt,'cinema-band__media');const inner=document.createElement('div');inner.className='cinema-band__inner';
    const top=document.createElement('div');top.className='cinema-band__top';const label=document.createElement('span');label.textContent=visual.label;top.append(label);
    const h2=document.createElement('h2');h2.innerHTML=visual.title;inner.append(top,h2);band.append(media,inner);cta.before(band);
  }
}

const header=document.querySelector('header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>10),{passive:true});
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

document.querySelectorAll('.cards').forEach(group=>group.querySelectorAll('.card').forEach((card,i)=>card.dataset.index=String(i+1).padStart(2,'0')));
const observed=document.querySelectorAll('.reveal,.site-photo-reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});observed.forEach(el=>io.observe(el));}else observed.forEach(el=>el.classList.add('in'));
requestAnimationFrame(()=>document.body.classList.add('site-ready'));

document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item')?.classList.toggle('open')));
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

const footerLinks=document.querySelector('.footer-links');
if(footerLinks){[['tel:+491622150164','0162 / 2150164'],['mailto:info@es-effizienz.de','E-Mail'],['https://www.instagram.com/es_effizienz_services/','Instagram']].forEach(([href,label])=>{if(!footerLinks.querySelector(`a[href="${href}"]`)){const a=document.createElement('a');a.href=href;a.textContent=label;if(href.startsWith('http')){a.target='_blank';a.rel='noopener'}footerLinks.prepend(a)}})}

if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){document.querySelectorAll('.cinematic-media').forEach(box=>{const img=box.querySelector('img');box.addEventListener('mousemove',e=>{const r=box.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;img.style.transform=`scale(1.035) translate(${x*-9}px,${y*-9}px)`});box.addEventListener('mouseleave',()=>img.style.transform='scale(1) translate(0,0)')})}

const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),get=k=>(data.get(k)||'').toString().trim();const subject=`Projektanfrage – ${get('service')||'Effizienz Services'}`;const body=[`Name: ${get('name')}`,`Firma / Objekt: ${get('company')}`,`E-Mail: ${get('email')}`,`Telefon: ${get('phone')}`,`Leistung: ${get('service')}`,`Ort / PLZ: ${get('location')}`,'','Nachricht:',get('message')].join('\n');const status=document.querySelector('#formStatus');if(status)status.textContent='Ihr E-Mail-Programm wird geöffnet. Die Nachricht wird an info@es-effizienz.de vorbereitet.';window.location.href=`mailto:info@es-effizienz.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});