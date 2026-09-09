(()=>{
  const style=document.createElement('style');
  style.id='hero-layout-hotfix-20260909';
  style.textContent=`
    html body .page-hero{overflow:hidden!important;}
    html body .page-hero .hero-shell{
      min-height:calc(100svh - 108px)!important;
      position:relative!important;
      z-index:1!important;
    }
    html body .hero-copy{
      padding-bottom:clamp(80px,10vw,150px)!important;
      justify-content:center!important;
      overflow:visible!important;
    }
    html body .hero-copy>p{
      position:relative!important;
      z-index:2!important;
      margin-bottom:0!important;
    }
    html body .lux-strip{
      position:relative!important;
      z-index:3!important;
      clear:both!important;
    }
    html body .velocity-ticker{
      position:relative!important;
      z-index:2!important;
    }
    html body .page-hero + .lux-strip{
      margin-top:0!important;
    }
    @media(max-width:1000px){
      html body .page-hero .hero-shell{min-height:auto!important;}
      html body .hero-copy{padding-bottom:50px!important;}
    }
  `;
  document.head.append(style);
})();
