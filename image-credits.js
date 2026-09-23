(function imageCreditsRuntime(){
  const STYLE_ID='image-credit-style';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .image-credit-badge{
        position:absolute!important;
        top:8px!important;
        right:8px!important;
        bottom:auto!important;
        left:auto!important;
        z-index:18!important;
        display:inline-flex!important;
        align-items:center!important;
        width:auto!important;
        max-width:calc(100% - 16px)!important;
        padding:4px 6px!important;
        margin:0!important;
        border:1px solid rgba(255,255,255,.18)!important;
        border-radius:5px!important;
        background:rgba(8,13,14,.58)!important;
        color:rgba(255,255,255,.9)!important;
        box-shadow:0 2px 10px rgba(0,0,0,.12)!important;
        -webkit-backdrop-filter:blur(5px)!important;
        backdrop-filter:blur(5px)!important;
        font:500 9px/1.15 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        letter-spacing:.01em!important;
        text-decoration:none!important;
        white-space:nowrap!important;
        overflow:hidden!important;
        text-overflow:ellipsis!important;
        pointer-events:auto!important;
      }
      span.image-credit-badge{pointer-events:none!important}
      .image-credit-badge:hover{color:#fff!important;background:rgba(8,13,14,.72)!important}
      .cinematic-media>figcaption{display:none!important}
      @media(max-width:680px){
        .image-credit-badge{
          top:6px!important;
          right:6px!important;
          max-width:calc(100% - 12px)!important;
          padding:3px 5px!important;
          font-size:8px!important;
          border-radius:4px!important;
        }
      }
    `;
    document.head.append(style);
  }

  const STOCK_RULES=[
    {needle:'photo-1776655890108-b8b0a8f3b5cf',label:'Foto · Ellen Qin / Unsplash',href:'https://unsplash.com/photos/modern-white-house-with-minimalist-landscaping-and-clean-design-GEkHoBMJxjs'},
    {needle:'photo-1759355787286-f1c5fd456a0d',label:'Foto · ubeyonroad / Unsplash',href:'https://unsplash.com/photos/modern-house-with-manicured-hedges-and-gate-4b25Ic2VjiQ'},
    {needle:'photo-1766603636671-484c4911a84b',label:'Foto · Alef Morais / Unsplash',href:'https://unsplash.com/photos/modern-house-with-palm-trees-and-green-lawn-BnRBFRv2WZA'},
    {needle:'photo-1780932564199-1bcb4d9e6571',label:'Foto · Jimmy Liu / Unsplash',href:'https://unsplash.com/photos/cardboard-boxes-on-wheels-moving-past-apartment-buildings-J5KT6e4YLfA'},
    {needle:'photo-1769955506606-7d6437f9c9d1',label:'Foto · Eugeniya Belova / Unsplash',href:'https://unsplash.com/photos/snow-plow-clearing-street-in-warm-winter-sunlight-4pv8-2E_q3g'},
    {needle:'photo-1768321917661-d4f1a89d2185',label:'Foto · Olek Buzunov / Unsplash',href:'https://unsplash.com/photos/interior-of-building-under-renovation-with-exposed-framing-J2AdfKkDY5s'},
    {needle:'photo-1758523670991-ee93bc48d81d',label:'Foto · Vitaly Gariev / Unsplash',href:'https://unsplash.com/photos/couple-carrying-moving-boxes-into-a-new-home-vV5iOAidkQE'}
  ];

  const urlObject=raw=>{
    try{return new URL(raw,location.href)}catch{return null}
  };

  const creditFor=raw=>{
    if(!raw||raw.startsWith('data:')||raw.startsWith('blob:'))return null;
    const u=urlObject(raw);
    if(!u)return null;

    const decodedPath=decodeURIComponent(u.pathname);
    if(/(?:^|\/)(?:Picture2\.png|logo-transparent\.jpg|detail-shape\.webp)$/i.test(decodedPath))return null;

    if(/\/assets\/winterdienst-rhein-main\.(?:png|jpe?g)$/i.test(decodedPath)){
      return {label:'KI-generiertes Bild',href:null};
    }

    if(u.hostname==='images.unsplash.com'){
      const rule=STOCK_RULES.find(item=>u.href.includes(item.needle));
      return rule||{label:'Foto · Unsplash',href:'https://unsplash.com/'};
    }

    if(u.hostname==='images.pexels.com'){
      return {
        label:'Foto · Pexels',
        href:/35540157/.test(decodedPath)?'https://www.pexels.com/photo/35540157/':'https://www.pexels.com/'
      };
    }

    if(
      u.origin===location.origin &&
      /(?:^|\/)(?:IMG_\d+\.(?:jpe?g|png|webp)|ueber-uns(?:-new)?\.png|SAVE_20260907_190136\.jpg|WhatsApp Image .*\.jpe?g)$/i.test(decodedPath)
    ){
      return {label:'Bild · ES Effizienz Services',href:null};
    }

    return null;
  };

  const directBadge=host=>[...host.children].find(
    el=>el.classList&&el.classList.contains('image-credit-badge')
  );

  const applyBadge=(host,credit,key)=>{
    if(!host||!credit)return;
    if(getComputedStyle(host).position==='static')host.style.position='relative';

    let badge=directBadge(host);
    const tag=credit.href?'A':'SPAN';

    if(badge&&badge.tagName!==tag){
      const replacement=document.createElement(tag.toLowerCase());
      replacement.className='image-credit-badge';
      badge.replaceWith(replacement);
      badge=replacement;
    }

    if(!badge){
      badge=document.createElement(tag.toLowerCase());
      badge.className='image-credit-badge';
      host.append(badge);
    }

    if(badge.dataset.creditKey===key&&badge.textContent===credit.label)return;

    badge.dataset.creditKey=key||credit.label;
    badge.textContent=credit.label;
    badge.setAttribute('aria-label',credit.label);

    if(credit.href){
      badge.href=credit.href;
      badge.target='_blank';
      badge.rel='noopener noreferrer';
      badge.title='Bildquelle öffnen';
    }else{
      badge.removeAttribute('title');
    }
  };

  const decorateImage=img=>{
    if(!img||img.closest('.brand,.footer-brand')||img.classList.contains('hero-mark'))return;
    const raw=img.currentSrc||img.getAttribute('src')||'';
    const credit=creditFor(raw);
    if(!credit)return;
    const host=img.closest('figure')||img.parentElement;
    applyBadge(host,credit,raw.split('?')[0]);
  };

  const backgroundUrls=value=>{
    const urls=[];
    if(!value||value==='none')return urls;
    const re=/url\(["']?(.*?)["']?\)/g;
    let match;
    while((match=re.exec(value))){
      if(match[1]&&!match[1].startsWith('data:'))urls.push(match[1]);
    }
    return urls;
  };

  const decorateBackground=el=>{
    if(!el||el.closest('.brand,.footer-brand'))return;
    const values=[el.style.backgroundImage,getComputedStyle(el).backgroundImage];
    for(const raw of values.flatMap(backgroundUrls)){
      const credit=creditFor(raw);
      if(credit){
        applyBadge(el,credit,raw.split('?')[0]);
        return;
      }
    }
  };

  const scan=()=>{
    document.querySelectorAll('img').forEach(decorateImage);
    document.querySelectorAll(
      '[style*="background-image"],[style*="background:"],.abstract-panel,.service-media,.detail-story__media,.cinematic-media,.velocity-poster__media,.garten-poster__photo'
    ).forEach(decorateBackground);
  };

  scan();

  let queued=false;
  const queueScan=()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      scan();
    });
  };

  const observer=new MutationObserver(queueScan);
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    attributes:true,
    attributeFilter:['src','srcset','style']
  });

  window.addEventListener('load',queueScan,{once:true});
})();
