(()=>{
  const apply=()=>{
    if(document.body.dataset.page!=='referenzen')return;
    const img=document.querySelector('.page-hero .cinematic-media img');
    if(img){
      img.src='/IMG_6837.JPG';
      img.srcset='';
      img.alt='Rückbauarbeiten aus einem realen Projekt von ES Effizienz Services';
      img.loading='eager';
      img.fetchPriority='high';
      img.style.objectPosition='center center';
    }
    const credit=document.querySelector('.page-hero .cinematic-media figcaption');
    if(credit){
      credit.replaceChildren();
      const label=document.createElement('span');
      label.textContent='Projektaufnahme · ES Effizienz Services';
      credit.append(label);
    }
  };
  apply();
  requestAnimationFrame(apply);
})();
