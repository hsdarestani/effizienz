const editorialCss=document.createElement('link');editorialCss.rel='stylesheet';editorialCss.href='/editorial.css?v=20260907b';document.head.appendChild(editorialCss);
const header=document.querySelector('header');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>10),{passive:true});
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item')?.classList.toggle('open')));
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
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
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const get=k=>(data.get(k)||'').toString().trim();
  const subject=`Projektanfrage – ${get('service')||'Effizienz Services'}`;
  const body=[
    `Name: ${get('name')}`,
    `Firma / Objekt: ${get('company')}`,
    `E-Mail: ${get('email')}`,
    `Telefon: ${get('phone')}`,
    `Leistung: ${get('service')}`,
    `Ort / PLZ: ${get('location')}`,
    '',
    'Nachricht:',
    get('message')
  ].join('\n');
  const status=document.querySelector('#formStatus');
  if(status) status.textContent='Ihr E-Mail-Programm wird geöffnet. Die Nachricht wird an info@es-effizienz.de vorbereitet.';
  window.location.href=`mailto:info@es-effizienz.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});