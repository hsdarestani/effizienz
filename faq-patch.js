(()=>{
  const FAQ_IMAGE={
    src:'https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=90&w=2400'
  };

  const apply=()=>{
    if(document.body.dataset.page!=='faq')return;
    const img=document.querySelector('.page-hero .cinematic-media img');
    if(img){
      img.src=FAQ_IMAGE.src;
      img.srcset='';
      img.alt='Modernes gepflegtes Gebäude als Objektmotiv';
      img.loading='eager';
      img.fetchPriority='high';
      img.referrerPolicy='no-referrer';
      img.style.objectPosition='center center';
    }
    document.querySelector('.page-hero .cinematic-media figcaption')?.remove();
  };
  apply();
  requestAnimationFrame(apply);
})();
