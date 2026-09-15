(()=>{
  const GARDEN_PAGE='garten-landschaftsbau';
  const POSTER_BG='https://images.pexels.com/photos/24595771/pexels-photo-24595771/free-photo-of-man-cutting-hedge-with-a-trimmer-in-the-garden.jpeg?auto=compress&dpr=1&h=1100&w=1800';

  function fixGardenMedia(){
    if(document.body?.dataset?.page!==GARDEN_PAGE) return;

    const media=document.querySelector('.velocity-poster__media');
    if(!media) return;

    // The poster image is already supplied as a CSS background. Remove the
    // generated fallback <img> completely so iOS/Safari cannot lay it out as
    // a second, compressed image underneath the intended artwork.
    media.querySelectorAll('img').forEach(img=>img.remove());

    media.style.setProperty('background-image',`url("${POSTER_BG}")`,'important');
    media.style.setProperty('background-size','cover','important');
    media.style.setProperty('background-position','center center','important');
    media.style.setProperty('background-repeat','no-repeat','important');
    media.style.setProperty('overflow','hidden','important');

    if(window.matchMedia('(max-width: 680px)').matches){
      media.style.setProperty('width','100%','important');
      media.style.setProperty('height','auto','important');
      media.style.setProperty('min-height','0','important');
      media.style.setProperty('aspect-ratio','4 / 3','important');
    }
  }

  // site.js creates the poster during deferred execution; this file is loaded
  // immediately after it, and these extra passes also guard against late DOM
  // mutations and Safari's delayed image/layout work.
  fixGardenMedia();
  requestAnimationFrame(fixGardenMedia);
  window.addEventListener('load',fixGardenMedia,{once:true});
  window.addEventListener('resize',fixGardenMedia,{passive:true});
})();
