(()=>{
  const GARDEN_PAGE='garten-landschaftsbau';
  const MOBILE_QUERY='(max-width: 680px)';

  // Keep the two approved photos, but serve them from our own Strato host.
  // This avoids hotlink failures on Safari/iOS while preserving the images'
  // intrinsic aspect ratios.
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

  function buildMobileDuo(media){
    if(media.dataset.gardenMobileDuo==='1') return;

    media.replaceChildren();
    media.style.setProperty('background','none','important');
    media.style.setProperty('display','flex','important');
    media.style.setProperty('flex-direction','column','important');
    media.style.setProperty('width','100%','important');
    media.style.setProperty('height','auto','important');
    media.style.setProperty('min-height','0','important');
    media.style.setProperty('max-height','none','important');
    media.style.setProperty('aspect-ratio','auto','important');
    media.style.setProperty('overflow','hidden','important');

    PHOTOS.forEach(({src,alt})=>{
      const img=document.createElement('img');
      img.className='garten-mobile-photo';
      img.src=src;
      img.alt=alt;
      img.loading='eager';
      img.decoding='async';
      img.style.setProperty('display','block','important');
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','auto','important');
      img.style.setProperty('min-height','0','important');
      img.style.setProperty('max-height','none','important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('object-position','center center','important');
      media.appendChild(img);
    });

    media.dataset.gardenMobileDuo='1';
  }

  function fixGardenMedia(){
    if(document.body?.dataset?.page!==GARDEN_PAGE) return;
    if(!window.matchMedia(MOBILE_QUERY).matches) return;

    const media=document.querySelector('.velocity-poster__media');
    if(!media) return;
    buildMobileDuo(media);
  }

  fixGardenMedia();
  requestAnimationFrame(fixGardenMedia);
  window.addEventListener('load',fixGardenMedia,{once:true});
  window.addEventListener('resize',fixGardenMedia,{passive:true});
})();
