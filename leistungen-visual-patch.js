(()=>{
  const OVERVIEW_IMAGE='/IMG_6754.JPG?v=20260910c';
  const STORY_IMAGE='/IMG_6737.JPG?v=20260910c';
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';

  const apply=()=>{
    if(document.body.dataset.page!=='leistungen')return;

    const mosaic=document.querySelector('.visual-mosaic');
    const detailStory=document.querySelector('.detail-story');
    mosaic?.style.setProperty('display','block','important');
    detailStory?.style.setProperty('display','block','important');

    const overview=document.querySelector('.visual-mosaic__main img');
    if(overview){
      overview.src=OVERVIEW_IMAGE;
      overview.srcset='';
      overview.alt='Projektaufnahme von ES Effizienz Services';
      overview.loading='lazy';
      overview.decoding='async';
      overview.removeAttribute('referrerpolicy');
      overview.style.setProperty('object-position','center center','important');
    }

    // Force the second supplied project photo as an actual <img> so the global
    // signature background rule can no longer show the old concrete image.
    const story=document.querySelector('.detail-story__media');
    if(story){
      story.style.setProperty('background-image','none','important');
      story.style.setProperty('background','none','important');
      story.style.setProperty('overflow','hidden','important');
      story.removeAttribute('aria-label');

      let img=story.querySelector('img');
      if(!img){
        img=document.createElement('img');
        story.prepend(img);
      }
      img.src=STORY_IMAGE;
      img.srcset='';
      img.alt='Projektaufnahme von ES Effizienz Services';
      img.loading='lazy';
      img.decoding='async';
      img.removeAttribute('referrerpolicy');
      img.style.setProperty('display','block','important');
      img.style.setProperty('opacity','1','important');
      img.style.setProperty('visibility','visible','important');
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','100%','important');
      img.style.setProperty('min-height','inherit','important');
      img.style.setProperty('object-fit','cover','important');
      img.style.setProperty('object-position','center center','important');
      img.style.setProperty('position','absolute','important');
      img.style.setProperty('inset','0','important');
    }

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
