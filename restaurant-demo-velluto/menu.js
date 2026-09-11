const copy = {
  en: {back:'← Language selection',top:'Back to top',subtitle:'À la carte',nav:'Menu sections',sections:['Starters','Pasta','Mains','Desserts'],names:['Burrata & heirloom tomatoes','Tagliatelle with black truffle','Sea bass, lemon & asparagus','Vanilla panna cotta'],note:'Fictional sample menu · Prices in EUR · AI-generated food photography'},
  fr: {back:'← Choix de la langue',top:'Retour en haut',subtitle:'À la carte',nav:'Rubriques du menu',sections:['Entrées','Pâtes','Plats','Desserts'],names:['Burrata et tomates anciennes','Tagliatelles à la truffe noire','Bar, citron et asperges','Panna cotta à la vanille'],note:'Menu fictif · Prix en EUR · Photos culinaires générées par IA'},
  es: {back:'← Selección de idioma',top:'Volver arriba',subtitle:'A la carta',nav:'Secciones de la carta',sections:['Entrantes','Pasta','Principales','Postres'],names:['Burrata y tomates de variedades antiguas','Tagliatelle con trufa negra','Lubina, limón y espárragos','Panna cotta de vainilla'],note:'Carta ficticia · Precios en EUR · Fotografías gastronómicas generadas por IA'}
};
const items=[['antipasti','burrata.jpg',24],['primi','tagliatelle.jpg',38],['secondi','seabass.jpg',46],['dolci','panna-cotta.jpg',16]];
const gate=document.querySelector('#welcome'),menu=document.querySelector('#menu'),back=document.querySelector('#language-back'),topButton=document.querySelector('#back-top');
let current='en',observer;
/** Render a selected language and move keyboard focus into its menu. */
function showMenu(lang){
  current=lang;const t=copy[lang];document.documentElement.lang=lang;
  back.textContent=t.back;topButton.setAttribute('aria-label',t.top);
  document.querySelector('#menu-subtitle').textContent=t.subtitle;
  document.querySelector('#demo-note').textContent=t.note;
  const nav=document.querySelector('#courses');nav.setAttribute('aria-label',t.nav);
  nav.innerHTML=items.map((item,i)=>`<a href="#${item[0]}">${t.sections[i]}</a>`).join('');
  document.querySelector('#dishes').innerHTML=courses.map((id,i)=>`<section class="course" id="${id}" aria-labelledby="title-${id}"><div class="section-heading"><span aria-hidden="true">0${i+1}</span><h2 id="title-${id}">${t.sections[i]}</h2></div>${dishes.filter(d=>d.course===i).map(d=>`<article class="menu-dish">${d.image?`<img class="signature" src="assets/${d.image}" alt="${d[lang][0]}" width="1200" height="800" loading="lazy">`:''}<div class="dish-title"><h3>${d[lang][0]}</h3><span class="price">${new Intl.NumberFormat(lang,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(d.price)}</span></div><p class="description">${d[lang][1]}</p></article>`).join('')}</section>`).join('');
  gate.hidden=true;menu.hidden=false;document.title=`Velluto — ${t.subtitle}`;
  window.scrollTo(0,0);back.focus({preventScroll:true});
  observer?.disconnect();observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -55% 0px'});
  document.querySelectorAll('.course').forEach(s=>observer.observe(s));
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>showMenu(button.dataset.lang)));
back.addEventListener('click',()=>{observer?.disconnect();menu.hidden=true;gate.hidden=false;document.documentElement.lang='en';document.title='Velluto — Ristorante';history.replaceState(null,'',location.pathname);window.scrollTo(0,0);document.querySelector(`[data-lang="${current}"]`).focus({preventScroll:true});});
topButton.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});back.focus({preventScroll:true});});
