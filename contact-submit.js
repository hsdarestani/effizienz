(()=>{
  const form=document.querySelector('#contactForm');
  if(!form)return;

  const status=document.querySelector('#formStatus');
  const submit=form.querySelector('button[type="submit"]');
  const EMAIL='info@es-effizienz.de';

  if(!form.querySelector('input[name="website"]')){
    const trap=document.createElement('input');
    trap.type='text';trap.name='website';trap.tabIndex=-1;trap.autocomplete='off';
    trap.setAttribute('aria-hidden','true');
    trap.style.position='absolute';trap.style.left='-9999px';trap.style.opacity='0';trap.style.pointerEvents='none';
    form.appendChild(trap);
  }

  const setState=(text,type='info')=>{
    if(!status)return;
    status.textContent=text;
    status.dataset.state=type;
    status.style.color=type==='error'?'#9d2f2f':type==='success'?'#2d6a4f':'var(--bronze)';
  };

  const fallbackToMailClient=data=>{
    const subject=`Projektanfrage – ${data.service||'Effizienz Services'}`;
    const body=[`Name: ${data.name||''}`,`Firma / Objekt: ${data.company||''}`,`E-Mail: ${data.email||''}`,`Telefon: ${data.phone||''}`,`Leistung: ${data.service||''}`,`Ort / PLZ: ${data.location||''}`,'','Nachricht:',data.message||''].join('\n');
    setState('Der direkte Versand ist gerade nicht verfügbar. Ihr E-Mail-Programm wird als Alternative geöffnet.');
    window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    e.stopImmediatePropagation();

    const data=Object.fromEntries(new FormData(form).entries());
    submit?.setAttribute('disabled','disabled');
    if(submit)submit.textContent='Wird gesendet …';
    setState('Ihre Anfrage wird sicher gesendet …');

    try{
      const response=await fetch('/api/contact/send',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data),
        credentials:'same-origin'
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok){
        if(response.status>=500){fallbackToMailClient(data);return;}
        throw new Error(result.message||'Die Nachricht konnte nicht gesendet werden.');
      }
      form.reset();
      setState(result.message||'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.','success');
    }catch(error){
      if(error instanceof TypeError){fallbackToMailClient(data);return;}
      setState(error.message||'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@es-effizienz.de.','error');
    }finally{
      submit?.removeAttribute('disabled');
      if(submit)submit.textContent='Anfrage senden';
    }
  },true);
})();
