const editorialCss=document.createElement('link');editorialCss.rel='stylesheet';editorialCss.href='/editorial.css?v=20260907c';document.head.appendChild(editorialCss);

const path=location.pathname.replace(/^\/+|\/+$/g,'');
const page=path||'home';
document.body.dataset.page=page;

const IMG={
  architecture:'https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=82&w=1800',
  property:'https://images.unsplash.com/photo-1759355787286-f1c5fd456a0d?auto=format&fit=crop&q=82&w=1800',
  garden:'https://images.unsplash.com/photo-1766603636671-484c4911a84b?auto=format&fit=crop&q=82&w=1800',
  move:'https://images.unsplash.com/photo-1780932564199-1bcb4d9e6571?auto=format&fit=crop&q=82&w=1800',
  winter:'https://images.unsplash.com/photo-1769955506606-7d6437f9c9d1?auto=format&fit=crop&q=82&w=1800',
  renovation:'https://images.unsplash.com/photo-1768321917661-d4f1a89d2185?auto=format&fit=crop&q=82&w=1800'
};
const SOURCES={
  architecture:{author:'Ellen Qin',url:'https://unsplash.com/photos/modern-white-house-with-minimalist-landscaping-and-clean-design-GEkHoBMJxjs'},
  property:{author:'ubeyonroad',url:'https://unsplash.com/photos/modern-house-with-manicured-hedges-and-gate-4b25Ic2VjiQ'},
  garden:{author:'Alef Morais',url:'https://unsplash.com/photos/modern-house-with-palm-trees-and-green-lawn-BnRBFRv2WZA'},
  move:{author:'Jimmy Liu',url:'https://unsplash.com/photos/cardboard-boxes-on-wheels-moving-past-apartment-buildings-J5KT6e4YLfA'},
  winter:{author:'Eugeniya Belova',url:'https://unsplash.com/photos/snow-plow-clearing-street-in-warm-winter-sunlight-4pv8-2E_q3g'},
  renovation:{author:'Olek Buzunov',url:'https://unsplash.com/photos/interior-of-building-under-renovation-with-exposed-framing-J2AdfKkDY5s'}
};
const pageVisual={
  home:{hero:'architecture',band:'move',alt:'Modernes Objekt als Symbolbild',label:'Rhein-Main · Deutschlandweit',title:'Sie haben die Aufgabe. <em>Wir die Lösung.</em>'},
  leistungen:{hero:'property',band:'renovation',alt:'Gepflegtes modernes Objekt als Symbolbild',label:'Mehrere Leistungen · ein Ansprechpartner',title:'Platz. Ordnung. <em>Freiraum.</em>'},
  hausmeisterservice:{hero:'property',band:'architecture',alt:'Modernes gepflegtes Wohnobjekt als Symbolbild',label:'Hausmeister- & Gebäudeservice',title:'Objekte im Blick. <em>Abläufe im Griff.</em>'},
  'abriss-entruempelung':{hero:'renovation',band:'renovation',alt:'Innenraum während einer Renovierung als Symbolbild',label:'Entrümpelung · Haushaltsauflösung · Abbruch',title:'Freiraum beginnt mit <em>einem klaren Schnitt.</em>'},
  winterdienst:{hero:'winter',band:'property',alt:'Winterdienst und Schneeräumung als Symbolbild',label:'Winterdienst',title:'Bereit, wenn <em>es darauf ankommt.</em>'},
  umzug:{hero:'move',band:'architecture',alt:'Umzug und Transport als Symbolbild',label:'Umzug · Rhein-Main · Deutschlandweit',title:'Von hier nach dort. <em>Ohne Umwege.</em>'},
  'garten-landschaftsbau':{hero:'garden',band:'property',alt:'Gepflegte Außenanlage als Symbolbild',label:'Gartenpflege & Außenanlagen',title:'Außenbereiche mit <em>klarem Anspruch.</em>'},
  'ueber-uns':{hero:'architecture',band:'garden',alt:'Moderne Architektur als Symbolbild',label:'ES Effizienz Services',title:'Persönlich geführt. <em>Direkt erreichbar.</em>'},
  referenzen:{hero:'property',band:'renovation',alt:'Modernes Objekt als Symbolbild',label:'Referenzen',title:'Ergebnisse, die <em>für sich sprechen.</em>'},
  faq:{hero:'architecture',band:'property',alt:'Modernes Objekt als Symbolbild',label:'Fragen & Antworten',title:'Klar gefragt. <em>Klar beantwortet.</em>'},
  kontakt:{hero:'garden',band:'architecture',alt:'Gepflegtes Objekt als Symbolbild',label:'Kontakt · 0162 / 2150164',title:'Einfach anfragen. <em>Wir machen den Rest.</em>'}
};

function makePhoto(type,alt,cls='cinematic-media'){
  const src=SOURCES[type];
  const fig=document.createElement('figure');fig.className=`${cls} site-photo-reveal`;
  const img=document.createElement('img');img.src=IMG[type];img.alt=alt;img.referrerPolicy='no-referrer';img.decoding='async';
  if(cls==='cinematic-media'){img.loading='eager';img.fetchPriority='high'}else{img.loading='lazy'}
  const cap=document.createElement('figcaption');
  const label=document.createElement('span');label.textContent='Symbolbild';
  const credit=document.createElement('a');credit.href=src.url;credit.target='_blank';credit.rel='noopener noreferrer';credit.textContent=`Foto · ${src.author} / Unsplash`;
  cap.append(label,credit);fig.append(img,cap);return fig;
}

const visual=pageVisual[page];
if(visual){
  const heroAside=document.querySelector('.page-hero .hero-aside');
  if(heroAside && !heroAside.querySelector('.cinematic-media')){
    heroAside.prepend(makePhoto(visual.hero,visual.alt));
    const info=heroAside.querySelector('.info-card');
    if(info) info.classList.add('floating-spec');
  }
  const cta=document.querySelector('.cta');
  if(cta && !document.querySelector('.cinema-band')){
    const band=document.createElement('section');band.className='cinema-band reveal';
    const media=makePhoto(visual.band,visual.alt,'cinema-band__media');
    const inner=document.createElement('div');inner.className='cinema-band__inner';
    const top=document.createElement('div');top.className='cinema-band__top';
    const label=document.createElement('span');label.textContent=visual.label;
    const credit=media.querySelector('figcaption a');
    const creditClone=credit.cloneNode(true);
    media.querySelector('figcaption').remove();
    top.append(label,creditClone);
    const h2=document.createElement('h2');h2.innerHTML=visual.title;
    inner.append(top,h2);band.append(media,inner);cta.before(band);
  }
}

const header=document.querySelector('header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>10),{passive:true});
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

const observed=document.querySelectorAll('.reveal,.site-photo-reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.07});
  observed.forEach(el=>io.observe(el));
}else{observed.forEach(el=>el.classList.add('in'))}
requestAnimationFrame(()=>document.body.classList.add('site-ready'));

document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item')?.classList.toggle('open')));
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

/* give cards subtle sequence numbers without changing HTML */
document.querySelectorAll('.cards').forEach(group=>group.querySelectorAll('.card').forEach((card,i)=>card.dataset.index=String(i+1).padStart(2,'0')));

const footerLinks=document.querySelector('.footer-links');
if(footerLinks){
  const additions=[
    ['tel:+491622150164','0162 / 2150164'],
    ['mailto:info@es-effizienz.de','E-Mail'],
    ['https://www.instagram.com/es_effizienz_services/','Instagram']
  ];
  additions.forEach(([href,label])=>{
    if(!footerLinks.querySelector(`a[href="${href}"]`)){
      const a=document.createElement('a');a.href=href;a.textContent=label;
      if(href.startsWith('http')){a.target='_blank';a.rel='noopener';}
      footerLinks.prepend(a);
    }
  });
}

/* restrained desktop parallax on cinematic hero */
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
  document.querySelectorAll('.cinematic-media').forEach(box=>{
    const img=box.querySelector('img');
    box.addEventListener('mousemove',e=>{const r=box.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;img.style.transform=`scale(1.025) translate(${x*-7}px,${y*-7}px)`});
    box.addEventListener('mouseleave',()=>img.style.transform='scale(1) translate(0,0)');
  });
}

const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);const get=k=>(data.get(k)||'').toString().trim();
  const subject=`Projektanfrage – ${get('service')||'Effizienz Services'}`;
  const body=[`Name: ${get('name')}`,`Firma / Objekt: ${get('company')}`,`E-Mail: ${get('email')}`,`Telefon: ${get('phone')}`,`Leistung: ${get('service')}`,`Ort / PLZ: ${get('location')}`,'','Nachricht:',get('message')].join('\n');
  const status=document.querySelector('#formStatus');if(status) status.textContent='Ihr E-Mail-Programm wird geöffnet. Die Nachricht wird an info@es-effizienz.de vorbereitet.';
  window.location.href=`mailto:info@es-effizienz.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});