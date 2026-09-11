(()=>{
  const HOME_OVERVIEW_IMAGE='/IMG_6754.JPG?v=20260911a';

  const apply=()=>{
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

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load',apply,{once:true});
})();
