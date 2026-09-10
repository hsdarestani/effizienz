(()=>{
  const OVERVIEW_IMAGE='https://images.unsplash.com/photo-1759355787286-f1c5fd456a0d?auto=format&fit=crop&q=90&w=2400';
  const STORY_IMAGE='https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=90&w=2400';
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';

  const apply=()=>{
    if(document.body.dataset.page!=='leistungen')return;

    // Replace the repeated construction image in "Mehr Leistung. Weniger Umwege."
    const overview=document.querySelector('.visual-mosaic__main img');
    if(overview){
      overview.src=OVERVIEW_IMAGE;
      overview.srcset='';
      overview.alt='Gepflegtes modernes Wohnobjekt';
      overview.loading='lazy';
      overview.decoding='async';
      overview.referrerPolicy='no-referrer';
      overview.style.objectPosition='center center';
    }

    // Keep the following quality section visually distinct as well.
    const story=document.querySelector('.detail-story__media');
    if(story){
      story.style.setProperty('background-image',`url("${STORY_IMAGE}")`,'important');
      story.style.setProperty('background-position','center center','important');
      story.style.setProperty('background-size','cover','important');
      story.removeAttribute('aria-label');
    }

    // Existing portfolio intro: add only the requested Instagram button.
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
