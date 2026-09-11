(()=>{
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';
  const FACEBOOK='https://www.facebook.com/share/1DoPkc8UnS/?mibextid=wwXIfr';

  const icons={
    instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 22v-9h3l.45-3.5H13.7V7.27c0-1.01.28-1.7 1.73-1.7h1.85V2.44c-.32-.04-1.42-.14-2.7-.14-2.67 0-4.5 1.63-4.5 4.63V9.5H7v3.5h3.08v9h3.62Z"/></svg>'
  };

  const ensureStyle=()=>{
    let style=document.getElementById('social-dock-four-actions');
    if(!style){
      style=document.createElement('style');
      style.id='social-dock-four-actions';
      document.head.append(style);
    }
    style.textContent=`
      .velocity-dock{visibility:visible!important;opacity:1!important;overflow:visible!important}
      .velocity-dock a{display:flex!important;visibility:visible!important;opacity:1!important}
      .velocity-dock a[data-action="facebook"] svg{fill:currentColor!important;stroke:none!important}
      @media(max-width:680px){
        .velocity-dock{
          display:flex!important;
          flex-direction:row!important;
          align-items:center!important;
          gap:8px!important;
          width:auto!important;
          min-width:0!important;
          left:auto!important;
          right:14px!important;
          overflow:visible!important;
        }
        .velocity-dock a{
          flex:0 0 48px!important;
          width:48px!important;
          min-width:48px!important;
          max-width:48px!important;
          min-height:48px!important;
          position:relative!important;
        }
        .velocity-dock a[data-action="instagram"]{background:#9b6c4f!important}
        .velocity-dock a[data-action="facebook"]{background:rgba(9,13,14,.94)!important}
      }
    `;
  };

  const ensureSocial=(dock,action,href,label)=>{
    let a=dock.querySelector(`[data-action="${action}"]`);
    if(!a){
      a=document.createElement('a');
      a.dataset.action=action;
      dock.append(a);
    }
    a.href=href;
    a.target='_blank';
    a.rel='noopener';
    a.setAttribute('aria-label',label);
    a.title=label;
    a.innerHTML=icons[action];
    a.style.setProperty('display','flex','important');
    a.style.setProperty('visibility','visible','important');
    a.style.setProperty('opacity','1','important');
    return a;
  };

  let running=false;
  const apply=()=>{
    if(running)return;
    running=true;
    try{
      ensureStyle();
      const dock=document.querySelector('.velocity-dock');
      if(!dock)return;

      ensureSocial(dock,'instagram',INSTAGRAM,'Instagram');
      ensureSocial(dock,'facebook',FACEBOOK,'Facebook');

      dock.style.setProperty('display',matchMedia('(max-width:680px)').matches?'flex':'flex','important');
      dock.style.setProperty('visibility','visible','important');
      dock.style.setProperty('opacity','1','important');

      // Requested visible order: Facebook, Instagram, then the remaining actions.
      ['facebook','instagram','whatsapp','call'].forEach(action=>{
        const item=dock.querySelector(`[data-action="${action}"]`);
        if(item)dock.append(item);
      });
    } finally {
      running=false;
    }
  };

  apply();
  requestAnimationFrame(apply);
  document.addEventListener('DOMContentLoaded',apply,{once:true});
  window.addEventListener('load',apply,{once:true});
  [100,300,700,1500,3000].forEach(ms=>setTimeout(apply,ms));

  const observer=new MutationObserver(()=>requestAnimationFrame(apply));
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['data-action','href','style','class']});
})();

// Keep the homepage overview image in sync with the Leistungen page.
(()=>{
  const HOME_OVERVIEW_IMAGE='/IMG_6754.JPG?v=20260911b';

  const applyHomeOverview=()=>{
    if(document.body.dataset.page!=='home')return;
    const overview=document.querySelector('.visual-mosaic__main img');
    if(!overview)return;

    overview.src=HOME_OVERVIEW_IMAGE;
    overview.srcset='';
    overview.alt='Projektaufnahme von ES Effizienz Services';
    overview.loading='lazy';
    overview.decoding='async';
    overview.removeAttribute('referrerpolicy');
    overview.style.setProperty('object-position','center center','important');
  };

  applyHomeOverview();
  requestAnimationFrame(applyHomeOverview);
  document.addEventListener('DOMContentLoaded',applyHomeOverview,{once:true});
  window.addEventListener('load',applyHomeOverview,{once:true});
})();
