(()=>{
  const page=document.body.dataset.page||location.pathname.replace(/^\/+|\/+$/g,'')||'home';
  const PEXELS={
    declutter:'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&dpr=1&h=1100&w=1800',
    gardenDE:'https://images.pexels.com/photos/37351066/pexels-photo-37351066.jpeg?auto=compress&dpr=1&h=1100&w=1800',
    gardener:'https://images.pexels.com/photos/24595771/pexels-photo-24595771/free-photo-of-man-cutting-hedge-with-a-trimmer-in-the-garden.jpeg?auto=compress&dpr=1&h=1100&w=1800',
    faq:'https://images.pexels.com/photos/8867425/pexels-photo-8867425.jpeg?auto=compress&dpr=1&h=1100&w=1800'
  };
  const LOCAL={
    haus1:'/IMG_6889.JPG',
    haus2:'/IMG_6888.JPG',
    frankfurt:'/IMG_6830.JPG',
    logo:'/Picture2.png'
  };

  if(!document.getElementById('client-final-20260910-style')){
    const s=document.createElement('style');
    s.id='client-final-20260910-style';
    s.textContent=`
      /* Final customer feedback 2026-09-10 */
      .client-slider{position:relative!important;overflow:hidden!important}
      .client-slider>.client-slide{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:0!important;visibility:hidden!important;transition:opacity .9s ease,visibility .9s ease!important;transform:none!important}
      .client-slider>.client-slide.is-active{opacity:1!important;visibility:visible!important}
      .client-slider>.client-slider-dots{position:absolute;left:18px;bottom:18px;z-index:6;display:flex;gap:7px}
      .client-slider>.client-slider-dots button{width:8px;height:8px;border-radius:50%;border:1px solid rgba(255,255,255,.8);padding:0;background:transparent;cursor:pointer}
      .client-slider>.client-slider-dots button.is-active{background:#fff}
      .client-slider>.quote,.client-slider>.info-card,.client-slider>figcaption{z-index:7!important}
      body[data-page="abriss-entruempelung"] .page-hero .hero-copy h1{white-space:normal!important;text-wrap:wrap!important;letter-spacing:-.06em!important}
      body[data-page="abriss-entruempelung"] .page-hero .hero-copy h1 .serif{margin-left:0!important}
      body[data-page="winterdienst"] .page-hero .hero-copy h1{white-space:nowrap!important;text-wrap:nowrap!important}
      body[data-page="winterdienst"] .page-hero .hero-copy h1 .serif{margin-left:.04em!important}
      .detail-story__media.brand-frankfurt{position:relative!important;overflow:hidden!important;background:#0b1112!important}
      .detail-story__media.brand-frankfurt>img.brand-frankfurt-bg{width:100%!important;height:100%!important;object-fit:cover!important;filter:grayscale(.35) contrast(1.03) brightness(.72)!important}
      .detail-story__media.brand-frankfurt:after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,15,17,.2),rgba(8,15,17,.68));z-index:1}
      .detail-story__media.brand-frankfurt>img.brand-frankfurt-logo{position:absolute!important;z-index:2!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;width:min(38%,230px)!important;height:auto!important;object-fit:contain!important;filter:drop-shadow(0 10px 30px rgba(0,0,0,.32))!important}
      body[data-page="ueber-uns"] main>section.content:not(.dark-section) .about-photo-panel.client-slider{isolation:isolate}
      body[data-page="ueber-uns"] main>section.content:not(.dark-section) .about-photo-panel.client-slider>.quote{position:absolute!important}
      .contact-method.facebook-pending strong{color:#c6a88f!important;font-weight:600!important}
      .social-quick .facebook-pending-link{opacity:.58;cursor:default!important;pointer-events:none!important}
      @media(max-width:680px){
        body[data-page="abriss-entruempelung"] .page-hero .hero-copy h1{font-size:clamp(2.55rem,11.5vw,3.8rem)!important;line-height:.92!important}
        body[data-page="winterdienst"] .page-hero .hero-copy h1{font-size:clamp(2.7rem,12.2vw,4rem)!important}
      }
    `;
    document.head.appendChild(s);
  }

  const setImg=(img,src,alt)=>{
    if(!img)return;
    img.src=src; img.srcset='';
    if(alt)img.alt=alt;
    img.removeAttribute('data-fallback');
  };

  const installSlider=(host,images,alts=[])=>{
    if(!host||!images?.length)return;
    if(host.dataset.clientSlider==='1')return;
    host.dataset.clientSlider='1';
    host.classList.add('client-slider');
    [...host.children].filter(el=>el.tagName==='IMG').forEach(el=>el.remove());
    const slides=images.map((src,i)=>{
      const img=document.createElement('img');
      img.className='client-slide'+(i===0?' is-active':'');
      img.src=src;img.alt=alts[i]||'ES Effizienz Services';img.decoding='async';img.loading=i===0?'eager':'lazy';
      host.prepend(img);return img;
    });
    if(images.length<2)return;
    const dots=document.createElement('div');dots.className='client-slider-dots';
    let index=0,timer;
    const show=n=>{
      index=(n+slides.length)%slides.length;
      slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===index));
      [...dots.children].forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
    };
    slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Bild ${i+1}`);b.classList.toggle('is-active',i===0);b.addEventListener('click',()=>{show(i);restart()});dots.append(b)});
    host.append(dots);
    const restart=()=>{clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(index+1),4500)};
    restart();
  };

  const mediaFor=(selector)=>document.querySelector(selector);

  /* Hausmeisterservice: use the new customer-supplied photos, one/two as requested. */
  document.querySelectorAll('.card[href="/hausmeisterservice/"] .service-media img').forEach(img=>setImg(img,LOCAL.haus1,'Hausmeisterservice – reale Objektaufnahme'));
  if(page==='hausmeisterservice'){
    const hero=mediaFor('.page-hero .cinematic-media');
    installSlider(hero,[LOCAL.haus1,LOCAL.haus2],['Hausmeisterservice – reale Objektaufnahme','Hausmeisterservice – reale Objektaufnahme']);
    const poster=mediaFor('.velocity-poster__media img');setImg(poster,LOCAL.haus2,'Hausmeisterservice – reale Objektaufnahme');
  }

  /* Entrümpelung: realistic clearing/boxed-home visual instead of construction-shell imagery. */
  document.querySelectorAll('.card[href="/abriss-entruempelung/"] .service-media img').forEach(img=>setImg(img,PEXELS.declutter,'Entrümpelung und Haushaltsauflösung – realistische Wohnraumszene'));
  if(page==='abriss-entruempelung'){
    const heroTitle=document.querySelector('.page-hero .hero-copy h1');
    if(heroTitle){heroTitle.classList.remove('service-name-one-line');heroTitle.innerHTML='Abriss &<br><span class="serif">Entrümpelung.</span>';}
    setImg(mediaFor('.page-hero .cinematic-media img'),PEXELS.declutter,'Entrümpelung und Haushaltsauflösung – realistische Wohnraumszene');
    setImg(mediaFor('.velocity-poster__media img'),PEXELS.declutter,'Entrümpelung und Haushaltsauflösung – realistische Wohnraumszene');
  }

  /* Gartenpflege: explicitly German residential context + real garden work. */
  document.querySelectorAll('.card[href="/garten-landschaftsbau/"] .service-media img').forEach(img=>setImg(img,PEXELS.gardenDE,'Gepflegtes Wohnhaus mit Garten in Deutschland'));
  if(page==='garten-landschaftsbau'){
    setImg(mediaFor('.page-hero .cinematic-media img'),PEXELS.gardenDE,'Gepflegtes Wohnhaus mit Garten in Deutschland');
    setImg(mediaFor('.velocity-poster__media img'),PEXELS.gardener,'Professionelle Gartenpflege mit Heckenschere');
  }

  /* Winterdienst stays on one line, in the existing black/beige treatment. */
  if(page==='winterdienst'){
    const t=document.querySelector('.page-hero .hero-copy h1');
    if(t){t.classList.add('service-name-one-line');t.innerHTML='Winter<span class="serif">dienst.</span>';}
  }

  /* Umzug: remove placeholder wording and make the process copy readable. */
  if(page==='umzug'){
    const rows=document.querySelectorAll('.page-hero .info-list span');
    rows.forEach(row=>{
      const b=row.querySelector('b')?.textContent.trim();const em=row.querySelector('em');if(!em)return;
      if(b==='Privatumzug')em.textContent='Wohnung & Haus';
      if(b==='Gewerbeumzug')em.textContent='Büro & Betrieb';
    });
  }

  /* Replace the generic brand-detail photo with Frankfurt skyline + logo. */
  const manifesto=document.querySelector('.detail-story__media');
  if(manifesto){
    manifesto.classList.add('brand-frankfurt');
    manifesto.innerHTML=`<img class="brand-frankfurt-bg" src="${LOCAL.frankfurt}" alt="Frankfurt Skyline"><img class="brand-frankfurt-logo" src="${LOCAL.logo}" alt="ES Effizienz Services Logo">`;
  }

  /* About: turn the static project image into a project slideshow. */
  if(page==='ueber-uns'){
    const aboutPanels=document.querySelectorAll('main>section.content:not(.dark-section) .about-photo-panel');
    const panel=aboutPanels[aboutPanels.length-1];
    installSlider(panel,['/IMG_6831.JPG','/IMG_6835.JPG','/IMG_6842.JPG'],['Projektaufnahme ES Effizienz Services','Projektaufnahme ES Effizienz Services','Projektaufnahme ES Effizienz Services']);
  }

  /* References: hero becomes a dynamic slideshow made only from real project photos. */
  if(page==='referenzen'){
    const hero=mediaFor('.page-hero .cinematic-media')||mediaFor('.page-hero .hero-aside');
    installSlider(hero,['/IMG_6831.JPG','/IMG_6837.JPG','/IMG_6842.JPG','/IMG_6840.JPG'],['Innenausbau – Projektaufnahme','Rückbau – Projektaufnahme','Innenbereich – Projektaufnahme','Projektarbeit – Projektaufnahme']);
  }

  /* FAQ: use a clean, professional customer-service visual. */
  if(page==='faq')setImg(mediaFor('.page-hero .cinematic-media img'),PEXELS.faq,'Professioneller Kundenservice und direkte Antworten');

  /* Contact: reserve the Facebook row/button without inventing a URL until the client sends it. */
  if(page==='kontakt'){
    const methods=document.querySelector('.contact-methods');
    if(methods&&!methods.querySelector('.facebook-pending')){
      const row=document.createElement('div');row.className='contact-method facebook-pending';row.innerHTML='<span>Facebook</span><strong>Link folgt</strong>';
      const instagram=[...methods.querySelectorAll('.contact-method')].find(x=>x.querySelector('span')?.textContent.trim()==='Instagram');
      if(instagram)instagram.after(row);else methods.append(row);
    }
    const quick=document.querySelector('.social-quick');
    if(quick&&!quick.querySelector('.facebook-pending-link')){
      const span=document.createElement('span');span.className='facebook-pending-link';span.textContent='Facebook';span.title='Link folgt';quick.append(span);
    }
  }
})();
