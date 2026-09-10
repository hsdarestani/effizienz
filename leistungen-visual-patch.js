(()=>{
  const OVERVIEW_IMAGE='/IMG_6754.JPG?v=20260910c';
  const STORY_IMAGE='/IMG_6737.JPG?v=20260910c';
  const INSTAGRAM='https://www.instagram.com/es_effizienz_services/';
  const FACEBOOK='https://www.facebook.com/share/1DoPkc8UnS/?mibextid=wwXIfr';

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

    // Requested Instagram CTA directly below the Portfolio intro copy.
    const portfolioCopy=document.querySelector('main > section.content:not(.dark-section) .section-head > div:last-child');
    if(portfolioCopy&&!portfolioCopy.querySelector('.portfolio-instagram-button')){
      const a=document.createElement('a');
      a.className='btn dark portfolio-instagram-button';
      a.href=INSTAGRAM;
      a.target='_blank';
      a.rel='noopener';
      a.setAttribute('aria-label','ES Effizienz Services auf Instagram');
      a.textContent='Instagram ↗';
      a.style.setProperty('display','inline-flex','important');
      a.style.setProperty('width','fit-content','important');
      a.style.setProperty('margin-top','24px','important');
      a.style.setProperty('text-decoration','none','important');
      portfolioCopy.append(a);
    }

    // Restore Facebook in the floating quick-contact dock on this page.
    // The Instagram destination remains available through the new Portfolio button above.
    const dock=document.querySelector('.velocity-dock');
    if(dock){
      const social=dock.querySelector('[data-action="facebook"]') || dock.querySelector('[data-action="instagram"]');
      if(social){
        social.dataset.action='facebook';
        social.href=FACEBOOK;
        social.target='_blank';
        social.rel='noopener';
        social.setAttribute('aria-label','Facebook');
        social.setAttribute('title','Facebook');
        social.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 22v-9h3l.45-3.5H13.7V7.27c0-1.01.28-1.7 1.73-1.7h1.85V2.44c-.32-.04-1.42-.14-2.7-.14-2.67 0-4.5 1.63-4.5 4.63V9.5H7v3.5h3.08v9h3.62Z"/></svg>';
      }
    }
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load',apply,{once:true});
})();
