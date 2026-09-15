(()=>{
  const PAGE='garten-landschaftsbau';
  const MOBILE_QUERY='(max-width: 680px)';

  const unique=list=>[...new Set(list.filter(Boolean))];

  function backgroundUrls(value){
    if(!value || value==='none') return [];
    const urls=[];
    const re=/url\((['"]?)(.*?)\1\)/g;
    let match;
    while((match=re.exec(value))){
      if(match[2] && !match[2].startsWith('data:')) urls.push(match[2]);
    }
    return urls;
  }

  function desktopSources(){
    const media=document.querySelector('.velocity-poster__media');
    if(!media) return [];

    const sources=[
      ...backgroundUrls(media.style.backgroundImage),
      ...backgroundUrls(getComputedStyle(media).backgroundImage),
      ...[...media.querySelectorAll('img')].map(img=>img.currentSrc||img.src)
    ];

    // The mobile presentation must only reuse artwork already used on the
    // desktop Gartenpflege page. If the poster exposes only one source, use
    // the desktop hero artwork as the second source instead of inventing a
    // mobile-only image.
    const hero=document.querySelector('.page-hero .cinematic-media img');
    if(hero) sources.push(hero.currentSrc||hero.src);

    return unique(sources);
  }

  function syncMobilePhotos(){
    if(document.body?.dataset?.page!==PAGE) return false;
    if(!window.matchMedia(MOBILE_QUERY).matches) return false;

    const targets=[...document.querySelectorAll('.garten-mobile-static__photos img')];
    if(targets.length<2) return false;

    const sources=desktopSources();
    if(sources.length<2) return false;

    targets.slice(0,2).forEach((img,index)=>{
      img.src=sources[index];
      img.removeAttribute('srcset');
      img.loading='eager';
      img.decoding='async';
    });

    document.querySelector('.garten-mobile-static')?.setAttribute('data-desktop-synced','1');
    return true;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(syncMobilePhotos() || attempts>=50) clearInterval(timer);
  },100);

  const observer=new MutationObserver(()=>syncMobilePhotos());
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true});

  requestAnimationFrame(syncMobilePhotos);
  window.addEventListener('DOMContentLoaded',syncMobilePhotos,{once:true});
  window.addEventListener('load',syncMobilePhotos,{once:true});
  window.addEventListener('resize',syncMobilePhotos,{passive:true});
})();
