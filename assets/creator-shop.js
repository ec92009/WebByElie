(() => {
 const backend='https://photosbyelie-checkout-mock.ec92009.workers.dev';
 const form=document.querySelector('form[data-sku]');
 let busy=false,attempt=crypto.randomUUID();
 form?.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||!form.reportValidity())return;
  busy=true;const button=form.querySelector('button[type=submit]'),status=form.querySelector('[role=status]'),label=button.textContent;
  button.disabled=true;button.textContent='Opening checkout…';status.textContent='Preparing your US$0.99 checkout.';
  try{
   const r=await fetch(backend+'/tilbury/checkout',{method:'POST',headers:{'content-type':'application/json','idempotency-key':attempt},body:JSON.stringify({sku:form.dataset.sku,email:form.elements.email.value.trim(),letterOptIn:form.elements.letter.checked,termsConsent:form.elements.terms.checked,digitalConsent:form.elements.digital.checked})});
   const data=await r.json();if(!r.ok||!data.url)throw Error(data.error||'Checkout is temporarily unavailable.');
   const target=new URL(data.url);if(target.hostname!=='checkout.stripe.com')throw Error('Checkout could not be opened.');
   status.textContent='Taking you to Stripe…';location.assign(target.href);
  }catch(error){status.textContent=error.message+' Please try again or email hello@web-by-elie.com.';button.disabled=false;button.textContent=label;busy=false;}
 });
 const sample=document.querySelector('#sample-price');
 sample?.addEventListener('input',()=>{const value=Number(sample.value);document.querySelector('#sample-total').textContent=sample.value!==''&&Number.isFinite(value)&&value>=0?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value*12):'Enter a monthly price';});
 document.querySelector('.sample-copy')?.addEventListener('click',async event=>{const button=event.currentTarget;button.disabled=true;button.textContent='Copying…';try{await navigator.clipboard.writeText(document.querySelector('#sample-message').value);button.textContent='Copied';document.querySelector('#sample-status').textContent='Sample copied. Edit it to match the details before sending.';}catch{const text=document.querySelector('#sample-message');text.focus();text.select();button.textContent='Selected — copy with your keyboard';}finally{button.disabled=false;}});
})();
