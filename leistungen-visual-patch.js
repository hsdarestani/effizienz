(()=>{
  const OVERVIEW_IMAGE='/IMG_6754.JPG?v=20260910b';
  const STORY_IMAGE='/IMG_6737.JPG?v=20260910b';
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';

  const apply=()=>{
    if(document.body.dataset.page!=='leistungen')return;

    // Use the first customer-supplied replacement image in the overview visual.
    const overview=document.querySelector('.visual-mosaic__main img');
    if(overview){
      overview.src=OVERVIEW_IMAGE;
      overview.srcset='';
      overview.alt='Projektaufnahme von ES Effizienz Services';
      overview.loading='lazy';
      overview.decoding='async';
      overview.removeAttribute('referrerpolicy');
      overview.style.objectPosition='center center';
    }

    // Use the second customer-supplied replacement image in the following story section.
    const story=document.querySelector('.detail-story__media');
    if(story){
      story.style.setProperty('background-image',`url("${STORY_IMAGE}")`,'important');
      story.style.setProperty('background-position','center center','important');
      story.style.setProperty('background-size','cover','important');
      story.removeAttribute('aria-label');
    }

    // Existing portfolio intro: keep only the requested Instagram button.
    const portfolioCopy=document.querySelector('main > section.content:not(.dark-section) .section-head > div:last-child');
    if(portfolioCopy&&!portfolioCopy.querySelector('.portfolio-instagram-button')){
      const a=document.createElement('a');
      a.className='btn light portfolio-instagram-button';
      a.href=INSTAGRAM;
      a.target='_blank';
      a.rel='noopener';
      a.setAttribute('aria-label','ES Effizienz Services auf Instagram');
      a.textContent='Instagram ↗';
      portfolioCopy.append(a);
    }
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load',apply,{once:true});
})();
