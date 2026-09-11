const copy = {
  en: {back:'← Back to language choice', kicker:'MEXICAN KITCHEN · INDIAN SOUL', note:'Demo menu · Fictional restaurant & sample prices', starters:'Starters', mains:'Main courses', desserts:'Desserts', count:'2 DISHES', top:'Back to top', nav:'Menu sections', footer:'Fictional demo by Web By Elie. Illustrative food images and sample prices. No ordering or payments.'},
  fr: {back:'← Retour au choix de langue', kicker:'CUISINE MEXICAINE · ÂME INDIENNE', note:'Menu démo · Restaurant fictif et prix indicatifs', starters:'Entrées', mains:'Plats', desserts:'Desserts', count:'2 PLATS', top:'Retour en haut', nav:'Sections du menu', footer:'Démo fictive par Web By Elie. Photos illustratives et prix indicatifs. Sans commande ni paiement.'},
  es: {back:'← Volver a elegir idioma', kicker:'COCINA MEXICANA · ALMA INDIA', note:'Menú de muestra · Restaurante ficticio y precios orientativos', starters:'Entrantes', mains:'Platos principales', desserts:'Postres', count:'2 PLATOS', top:'Volver arriba', nav:'Secciones del menú', footer:'Demo ficticia de Web By Elie. Imágenes ilustrativas y precios orientativos. Sin pedidos ni pagos.'}
};
const dishes = {
  starters: [
    {price:7.5,image:'mexican',panel:0,names:{en:'Guacamole & tortilla chips',fr:'Guacamole et chips de maïs',es:'Guacamole con totopos'}},
    {price:6.5,image:'indian',panel:0,names:{en:'Vegetable samosas',fr:'Samosas aux légumes',es:'Samosas de verduras'}}
  ],
  mains: [
    {price:12.5,image:'mexican',panel:1,names:{en:'Chicken tacos',fr:'Tacos au poulet',es:'Tacos de pollo'}},
    {price:14.5,image:'indian',panel:1,names:{en:'Butter chicken',fr:'Poulet au beurre',es:'Pollo a la mantequilla'}}
  ],
  desserts: [
    {price:7,image:'desserts',panel:0,names:{en:'Churros with chocolate',fr:'Churros au chocolat',es:'Churros con chocolate'}},
    {price:8,image:'desserts',panel:1,names:{en:'Gulab jamun',fr:'Gulab jamun',es:'Gulab jamun'}}
  ]
};
let currentLanguage = 'en';
const gate = document.querySelector('#language-screen');
const menu = document.querySelector('#menu-screen');
const topButton = document.querySelector('#back-top');
/** Render the selected language without persisting a preference or skipping the gate. */
function showMenu(language) {
  if (!copy[language]) return;
  currentLanguage = language;
  const t = copy[language];
  document.documentElement.lang = language;
  document.title = 'Lima & Masala · ' + ({en:'Menu',fr:'Menu',es:'Menú'}[language]);
  document.querySelector('#back-language').textContent = t.back;
  document.querySelector('#menu-kicker').textContent = t.kicker;
  document.querySelector('#menu-note').textContent = t.note;
  document.querySelector('#footer-note').textContent = t.footer;
  topButton.setAttribute('aria-label',t.top);
  document.querySelector('.section-nav').setAttribute('aria-label',t.nav);
  document.querySelectorAll('[data-section]').forEach(link => {
    link.textContent = t[link.dataset.section] + ' ↘';
    link.removeAttribute('aria-current');
  });
  document.querySelector('#dishes').innerHTML = Object.entries(dishes).map(([section,items]) => `
    <section class="cuisine" id="${section}" aria-labelledby="${section}-title">
      <div class="cuisine-heading"><h2 id="${section}-title">${t[section]}</h2><span>${t.count}</span></div>
      <div class="dish-grid">${items.map((dish,index) => `<article class="dish">
        <div class="dish-photo" style="--panel:${dish.panel}"><img src="assets/${dish.image}.png" alt="${dish.names[language]}" width="2172" height="724" loading="lazy"><span class="dish-index" aria-hidden="true">0${index+1}</span></div>
        <div class="dish-label"><h3>${dish.names[language]}</h3><span class="price">${new Intl.NumberFormat(language,{style:'currency',currency:'EUR'}).format(dish.price)}</span></div>
      </article>`).join('')}</div>
    </section>`).join('');
  gate.hidden = true;
  menu.hidden = false;
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelector('#menu-top').focus({preventScroll:true});
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click',() => showMenu(button.dataset.language)));
document.querySelector('#back-language').addEventListener('click',() => {
  menu.hidden = true;
  gate.hidden = false;
  document.documentElement.lang = 'en';
  history.replaceState(null,'',location.pathname + location.search);
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelector(`[data-language="${currentLanguage}"]`).focus({preventScroll:true});
});
topButton.addEventListener('click',() => {
  document.querySelector('#menu-top').focus({preventScroll:true});
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
document.querySelectorAll('[data-section]').forEach(link => link.addEventListener('click',() => {
  document.querySelectorAll('[data-section]').forEach(item => item.removeAttribute('aria-current'));
  link.setAttribute('aria-current','true');
}));
