(()=>{
  const MOVE={
    src:'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?auto=format&fit=crop&q=84&w=2200',
    source:'https://unsplash.com/photos/couple-carrying-moving-boxes-into-a-new-home-vV5iOAidkQE',
    author:'Vitaly Gariev'
  };
  const WINTER={
    src:'/assets/winterdienst-rhein-main.png?v=20260910b',
    source:'/winterdienst/',
    author:'Motiv · Rhein-Main'
  };

  if(!document.getElementById('service-compact-v2')){
    const style=document.createElement('style');
    style.id='service-compact-v2';
    style.textContent=`
      @media (min-width:1001px){
        html body main .cards.service-editorial .card,
        html body main .cards.service-editorial .card:nth-child(even){
          height:290px!important;min-height:290px!important;max-height:290px!important;
        }
        html body main .cards.service-editorial .service-media,
        html body main .cards.service-editorial .card:nth-child(even) .service-media{
          height:290px!important;min-height:290px!important;max-height:290px!important;
        }
        html body main .cards.service-editorial .card>.service-copy,
        html body main .cards.service-editorial .card:nth-child(even)>.service-copy{
          height:290px!important;min-height:290px!important;max-height:290px!important;
          padding:24px 30px!important;justify-content:center!important;gap:12px!important;overflow:hidden!important;
        }
        html body main .cards.service-editorial .card h3{
          margin:0!important;font-size:clamp(2rem,2.6vw,3.25rem)!important;line-height:.95!important;
        }
        html body main .cards.service-editorial .card p{
          margin:0!important;font-size:.86rem!important;line-height:1.42!important;
        }
      }
      @media (min-width:681px) and (max-width:1000px){
        html body main .cards.service-editorial .card,
        html body main .cards.service-editorial .card:nth-child(even){
          height:250px!important;min-height:250px!important;max-height:250px!important;
        }
        html body main .cards.service-editorial .service-media,
        html body main .cards.service-editorial .card:nth-child(even) .service-media{
          height:250px!important;min-height:250px!important;max-height:250px!important;
        }
        html body main .cards.service-editorial .card>.service-copy,
        html body main .cards.service-editorial .card:nth-child(even)>.service-copy{
          height:250px!important;min-height:250px!important;max-height:250px!important;
          padding:20px 24px!important;justify-content:center!important;gap:10px!important;overflow:hidden!important;
        }
        html body main .cards.service-editorial .card h3{
          margin:0!important;font-size:clamp(1.75rem,3.4vw,2.6rem)!important;line-height:.96!important;
        }
        html body main .cards.service-editorial .card p{margin:0!important;font-size:.82rem!important;line-height:1.38!important;}
      }
      @media (max-width:680px){
        html body main .cards.service-editorial .card,
        html body main .cards.service-editorial .card:nth-child(even){
          height:320px!important;min-height:320px!important;max-height:320px!important;display:flex!important;flex-direction:column!important;
        }
        html body main .cards.service-editorial .service-media,
        html body main .cards.service-editorial .card:nth-child(even) .service-media{
          width:100%!important;height:150px!important;min-height:150px!important;max-height:150px!important;
        }
        html body main .cards.service-editorial .card>.service-copy,
        html body main .cards.service-editorial .card:nth-child(even)>.service-copy{
          width:100%!important;height:170px!important;min-height:170px!important;max-height:170px!important;
          padding:16px 18px!important;justify-content:center!important;gap:8px!important;overflow:hidden!important;
        }
        html body main .cards.service-editorial .card h3{
          margin:0 32px 0 0!important;font-size:clamp(1.55rem,7vw,2.15rem)!important;line-height:.95!important;
        }
        html body main .cards.service-editorial .card p{margin:0!important;font-size:.79rem!important;line-height:1.32!important;}
        html body main .cards.service-editorial .card .arrow{right:16px!important;bottom:18px!important;}
      }
      html body main .cards.service-editorial .service-media img{width:100%!important;height:100%!important;object-fit:cover!important;}
    `;
    document.head.append(style);
  }

  const setImg=(img,cfg)=>{
    if(!img)return;
    img.src=cfg.src;
    img.srcset='';
    img.loading=cfg.src.startsWith('/')?'eager':'lazy';
    img.decoding='async';
    if(cfg.src.startsWith('/')){
      img.fetchPriority='high';
      const media=img.closest('.service-media');
      if(media){
        media.style.setProperty('background-image',`url("${cfg.src}")`,'important');
        media.style.setProperty('background-size','cover','important');
        media.style.setProperty('background-position','center center','important');
      }
    }
  };

  const swapCard=(href,cfg)=>{
    document.querySelectorAll(`.cards.service-editorial .card[href="${href}"] .service-media img`).forEach(img=>setImg(img,cfg));
  };

  const swapServicePage=(page,cfg)=>{
    if(document.body.dataset.page!==page)return;
    document.querySelectorAll('.page-hero .cinematic-media img,.velocity-poster__media img').forEach(img=>setImg(img,cfg));
    const credit=document.querySelector('.page-hero .cinematic-media figcaption');
    if(credit){
      let link=credit.querySelector('a');
      if(!link){link=document.createElement('a');credit.append(link)}
      link.href=cfg.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`Foto · ${cfg.author} / Unsplash`;
    }
  };

  const apply=()=>{
    swapCard('/umzug/',MOVE);
    swapCard('/winterdienst/',WINTER);
    swapServicePage('umzug',MOVE);
    swapServicePage('winterdienst',WINTER);
  };

  apply();
  requestAnimationFrame(apply);
})();

// Preserve the responsive hero fix added after the service imagery patch.
(()=>{
  const style=document.createElement('style');
  style.id='hero-layout-hotfix-20260909';
  style.textContent=`
    html body .page-hero{overflow:hidden!important;}
    html body .page-hero .hero-shell{
      min-height:calc(100svh - 108px)!important;
      position:relative!important;
      z-index:1!important;
    }
    html body .hero-copy{
      padding-bottom:clamp(80px,10vw,150px)!important;
      justify-content:center!important;
      overflow:visible!important;
    }
    html body .hero-copy>p{
      position:relative!important;
      z-index:2!important;
      margin-bottom:0!important;
    }
    html body .lux-strip{
      position:relative!important;
      z-index:3!important;
      clear:both!important;
    }
    html body .velocity-ticker{
      position:relative!important;
      z-index:2!important;
    }
    html body .page-hero + .lux-strip{
      margin-top:0!important;
    }
    @media(max-width:1000px){
      html body .page-hero .hero-shell{min-height:auto!important;}
      html body .hero-copy{padding-bottom:50px!important;}
    }
  `;
  document.head.append(style);

  if(document.body.dataset.page==='winterdienst' && !document.getElementById('winter-mobile-layout-20260910')){
    const mobile=document.createElement('style');
    mobile.id='winter-mobile-layout-20260910';
    mobile.textContent=`
      @media(max-width:680px){
        body[data-page="winterdienst"] .page-hero{overflow:visible!important;background:#071011!important;}
        body[data-page="winterdienst"] .page-hero .hero-shell{display:flex!important;flex-direction:column!important;padding:0!important;min-height:0!important;}
        body[data-page="winterdienst"] .page-hero .hero-aside{order:1!important;position:relative!important;inset:auto!important;width:100%!important;height:42svh!important;min-height:320px!important;display:block!important;}
        body[data-page="winterdienst"] .page-hero .hero-aside>.cinematic-media{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;clip-path:none!important;}
        body[data-page="winterdienst"] .page-hero .cinematic-media img{display:block!important;opacity:1!important;visibility:visible!important;filter:saturate(.82) contrast(1.02) brightness(.9)!important;object-position:center center!important;}
        body[data-page="winterdienst"] .page-hero .cinematic-media:after{background:linear-gradient(0deg,rgba(7,16,17,.25),transparent 55%)!important;}
        body[data-page="winterdienst"] .page-hero .cinematic-media figcaption{display:none!important;}
        body[data-page="winterdienst"] .page-hero .hero-copy{order:2!important;min-height:0!important;padding:42px 18px 54px!important;background:#071011!important;justify-content:flex-start!important;}
        body[data-page="winterdienst"] .page-hero .hero-copy:before{display:none!important;}
      }
    `;
    document.head.append(mobile);
  }
})();
