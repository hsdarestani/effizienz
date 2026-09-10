(()=>{
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';
  const FACEBOOK='https://www.facebook.com/share/1DoPkc8UnS/?mibextid=wwXIfr';

  const icons={
    instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 22v-9h3l.45-3.5H13.7V7.27c0-1.01.28-1.7 1.73-1.7h1.85V2.44c-.32-.04-1.42-.14-2.7-.14-2.67 0-4.5 1.63-4.5 4.63V9.5H7v3.5h3.08v9h3.62Z"/></svg>'
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
    return a;
  };

  const apply=()=>{
    const dock=document.querySelector('.velocity-dock');
    if(!dock)return;

    // Keep Instagram and Facebook as two separate actions. Do not replace one with the other.
    ensureSocial(dock,'instagram',INSTAGRAM,'Instagram');
    ensureSocial(dock,'facebook',FACEBOOK,'Facebook');

    // Stable order: phone, WhatsApp, Instagram, Facebook.
    ['call','whatsapp','instagram','facebook'].forEach(action=>{
      const item=dock.querySelector(`[data-action="${action}"]`);
      if(item)dock.append(item);
    });

    if(!document.getElementById('social-dock-four-actions')){
      const style=document.createElement('style');
      style.id='social-dock-four-actions';
      style.textContent=`
        .velocity-dock a[data-action="facebook"] svg{fill:currentColor!important;stroke:none!important}
        @media(max-width:680px){
          .velocity-dock{display:grid!important;grid-template-columns:repeat(4,48px)!important;grid-auto-flow:column!important;gap:8px!important;width:auto!important;left:auto!important;right:14px!important}
          .velocity-dock a{width:48px!important;min-width:48px!important;min-height:48px!important}
          .velocity-dock a[data-action="instagram"]{background:#9b6c4f!important}
          .velocity-dock a[data-action="facebook"]{background:rgba(9,13,14,.94)!important}
        }
      `;
      document.head.append(style);
    }
  };

  apply();
  requestAnimationFrame(apply);
  document.addEventListener('DOMContentLoaded',apply,{once:true});
  window.addEventListener('load',apply,{once:true});
  setTimeout(apply,250);
})();
