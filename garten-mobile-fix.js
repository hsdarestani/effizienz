(()=>{
  const GARDEN_PAGE='garten-landschaftsbau';
  const MOBILE_QUERY='(max-width: 680px)';

  // These are the two photos the client approved in the mobile layout.
  const PHOTOS=[
    {
      src:'https://images.pexels.com/photos/37351066/pexels-photo-37351066.jpeg?auto=compress&dpr=1&h=1100&w=1800',
      alt:'Gepflegte Gartenanlage mit Bäumen und weißen Blüten'
    },
    {
      src:'https://images.unsplash.com/photo-1766603636671-484c4911a84b?auto=format&fit=crop&q=88&w=2200',
      alt:'Modernes Wohnhaus mit gepflegter Außenanlage'
    }
  ];

  function buildMobileDuo(media){
    if(media.dataset.gardenMobileDuo==='1') return;

    // Replace the dynamically generated poster artwork with the two intended
    // photos as real <img> elements. width:100% + height:auto preserves each
    // source image's intrinsic ratio, so Safari cannot stretch either image.
    media.replaceChildren();
    media.style.setProperty('background','none','important');
    media.style.setProperty('display','flex','important');
    media.style.setProperty('flex-direction','column','important');
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
      img.loading='lazy';
      img.decoding='async';
      img.style.setProperty('display','block','important');
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','auto','important');
      img.style.setProperty('min-height','0','important');
      img.style.setProperty('max-height','none','important');
      img.style.setProperty('object-fit','contain','important');
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
