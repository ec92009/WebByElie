/* Owner-approved, route-scoped, sessionless shop monitoring. */
(() => {
 const routes={'/june.rowan':'tilbury-june-rowan','/nora.vela':'tilbury-nora-vela','/elena.brooks':'tilbury-elena-brooks'};
 const id=routes[location.pathname.replace(/\/$/,'')];
 if(location.origin!=='https://web-by-elie.com'||!id)return;
 const script=document.createElement('script');
 script.src='/assets/wst-beacon.js';script.defer=true;
 Object.assign(script.dataset,{wstEnabled:'true',wstEndpoint:'https://web-signals-collector.ec92009.workers.dev/v1/events',wstSite:id,wstEnvironment:'production',wstConsent:'not_required',wstSessionless:'true',wstSynthetic:(navigator.webdriver||new URLSearchParams(location.search).get('wst_synthetic')==='1')?'true':'false'});
 document.head.appendChild(script);
})();
