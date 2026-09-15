(()=>{
  const GARDEN_PAGE='garten-landschaftsbau';
  const MOBILE_QUERY='(max-width: 680px)';
  let building=false;

  const PHOTOS=[
    {
      src:'/assets/garten-mobile-1.jpg',
      alt:'Gepflegte Gartenanlage mit Bäumen und weißen Blüten'
    },
    {
      src:'/assets/garten-mobile-2.jpg',
      alt:'Modernes Wohnhaus mit gepflegter Außenanlage'
    }
  ];

  function preloadPhoto({src,alt}){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.className='garten-mobile-photo';
      img.alt=alt;
      img.loading='eager';
      img.decoding='async';
      img.onload=()=>resolve(img);
      img.onerror=()=>reject(new Error(`Could not load ${src}`));
      img.src=src;
    });
  }

  async function buildMobileDuo(media){
    if(building || media.dataset.gardenMobileDuo==='1') return;
    building=true;

    try{
      // Keep the existing artwork visible until BOTH replacement photos have
      // loaded successfully. That prevents the black/empty state seen on iOS.
      const images=await Promise.all(PHOTOS.map(preloadPhoto));

      if(!media.isConnected) return;

      images.forEach(img=>{
        img.style.setProperty('display','block','important');
        img.style.setProperty('width','100%','important');
        img.style.setProperty('height','auto','important');
        img.style.setProperty('min-height','0','important');
        img.style.setProperty('max-height','none','important');
        img.style.setProperty('object-fit','contain','important');
        img.style.setProperty('object-position','center center','important');
      });

      media.replaceChildren(...images);
      media.dataset.gardenMobileDuo='1';
      media.style.setProperty('background','none','important');
      media.style.setProperty('display','flex','important');
      media.style.setProperty('flex-direction','column','important');
      media.style.setProperty('width','100%','important');
      media.style.setProperty('height','auto','important');
      media.style.setProperty('min-height','0','important');
      media.style.setProperty('max-height','none','important');
      media.style.setProperty('aspect-ratio','auto','important');
      media.style.setProperty('overflow','hidden','important');
    }catch(err){
      console.warn('Gartenpflege mobile photos were not swapped; keeping original artwork.',err);
    }finally{
      building=false;
    }
  }

  function fixGardenMedia(){
    if(document.body?.dataset?.page!==GARDEN_PAGE) return;
    if(!window.matchMedia(MOBILE_QUERY).matches) return;

    const media=document.querySelector('.velocity-poster__media');
    if(media) buildMobileDuo(media);
  }

  // site.js may create the poster after this script has started. Observe DOM
  // changes so the two-photo layout is applied as soon as the media exists.
  const observer=new MutationObserver(fixGardenMedia);
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-page']});

  fixGardenMedia();
  requestAnimationFrame(fixGardenMedia);
  window.addEventListener('DOMContentLoaded',fixGardenMedia,{once:true});
  window.addEventListener('load',fixGardenMedia,{once:true});
  window.addEventListener('resize',fixGardenMedia,{passive:true});
})();
