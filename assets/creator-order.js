(async()=>{
 const params=new URLSearchParams(location.search);let id=params.get('session_id');
 try{if(id)sessionStorage.setItem('tilbury-delivery-session',id);else id=sessionStorage.getItem('tilbury-delivery-session');}catch{}
 history.replaceState(null,'',location.pathname);
 const title=document.querySelector('#order-title'),status=document.querySelector('#order-status'),retry=document.querySelector('#retry');let busy=false;
 async function load(){
  if(busy)return;busy=true;retry.disabled=true;status.textContent='Checking your order…';
  if(!id){title.textContent='Open your delivery link.';status.textContent='Use the private link in your purchase email, or contact us for download recovery.';busy=false;return;}
  try{
   const response=await fetch('https://photosbyelie-checkout-mock.ec92009.workers.dev/tilbury/order?session_id='+encodeURIComponent(id),{cache:'no-store',referrerPolicy:'no-referrer'});const data=await response.json();
   if(!response.ok)throw Error(data.error||'Your order is not ready yet.');
   title.textContent=data.name;status.textContent=data.free?'Your free kit is ready. No payment is due.':'Payment confirmed. Your files are ready.';document.querySelector('#order-result').hidden=false;
   const download=new URL(data.download);if(download.origin!=='https://photosbyelie-checkout-mock.ec92009.workers.dev')throw Error('Download unavailable.');
   document.querySelector('#download').href=download.href;document.querySelector('#expiry').textContent='Download access until '+new Date(data.expires*1000).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})+'.';retry.hidden=true;
  }catch(error){title.textContent='Checking your order.';status.textContent=error.message+' If you just completed checkout, allow a moment for confirmation, then check again.';retry.hidden=false;}
  finally{busy=false;retry.disabled=false;}
 }
 retry.addEventListener('click',load);await load();
})();
