(()=>{
  const apply=()=>{
    if(document.body.dataset.page!=='leistungen')return;
    const story=document.querySelector('.detail-story__media');
    if(!story)return;

    story.style.setProperty(
      'background-image',
      'url("https://images.unsplash.com/photo-1776655890108-b8b0a8f3b5cf?auto=format&fit=crop&q=88&w=2200")',
      'important'
    );
    story.style.setProperty('background-position','center center','important');
    story.style.setProperty('background-size','cover','important');
    story.setAttribute('aria-label','Modernes, gepflegtes Objekt als Symbolbild für Qualität und zuverlässige Ausführung');
  };

  apply();
  requestAnimationFrame(apply);
})();
