(()=>{
  const FAQ_IMAGE={
    src:'https://images.pexels.com/photos/7414959/pexels-photo-7414959.jpeg?auto=compress&cs=tinysrgb&w=2200',
    source:'https://www.pexels.com/photo/woman-in-black-suit-holding-papers-7414959/',
    author:'MART PRODUCTION'
  };

  const apply=()=>{
    if(document.body.dataset.page!=='faq')return;
    const img=document.querySelector('.page-hero .cinematic-media img');
    if(img){
      img.src=FAQ_IMAGE.src;
      img.srcset='';
      img.alt='Professionelle Objektbesprechung und Projektplanung';
      img.loading='eager';
      img.fetchPriority='high';
      img.referrerPolicy='no-referrer';
      img.style.objectPosition='center 42%';
    }
    const credit=document.querySelector('.page-hero .cinematic-media figcaption');
    if(credit){
      credit.replaceChildren();
      const label=document.createElement('span');
      label.textContent='Symbolbild';
      const link=document.createElement('a');
      link.href=FAQ_IMAGE.source;
      link.target='_blank';
      link.rel='noopener noreferrer';
      link.textContent=`Foto · ${FAQ_IMAGE.author} / Pexels`;
      credit.append(label,link);
    }
  };
  apply();
  requestAnimationFrame(apply);
})();
