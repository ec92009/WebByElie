const copy = {
  en: {back:'← Back to language choice', kicker:'MEXICAN KITCHEN · INDIAN SOUL', note:'Demo menu · Fictional restaurant & sample prices', mexican:'Mexican', indian:'Indian', count:'3 DISHES', top:'Back to top', nav:'Menu sections', footer:'Fictional demo by Web By Elie. Illustrative food images and sample prices. No ordering or payments.'},
  fr: {back:'← Retour au choix de langue', kicker:'CUISINE MEXICAINE · ÂME INDIENNE', note:'Menu démo · Restaurant fictif et prix indicatifs', mexican:'Mexicain', indian:'Indien', count:'3 PLATS', top:'Retour en haut', nav:'Sections du menu', footer:'Démo fictive par Web By Elie. Photos illustratives et prix indicatifs. Sans commande ni paiement.'},
  es: {back:'← Volver a elegir idioma', kicker:'COCINA MEXICANA · ALMA INDIA', note:'Menú de muestra · Restaurante ficticio y precios orientativos', mexican:'Mexicano', indian:'Indio', count:'3 PLATOS', top:'Volver arriba', nav:'Secciones del menú', footer:'Demo ficticia de Web By Elie. Imágenes ilustrativas y precios orientativos. Sin pedidos ni pagos.'}
};
const dishes = {
  mexican: [
    {price:7.5,names:{en:'Guacamole & tortilla chips',fr:'Guacamole et chips de maïs',es:'Guacamole con totopos'}},
    {price:12.5,names:{en:'Chicken tacos',fr:'Tacos au poulet',es:'Tacos de pollo'}},
    {price:10,names:{en:'Cheese quesadilla',fr:'Quesadilla au fromage',es:'Quesadilla de queso'}}
  ],
  indian: [
    {price:6.5,names:{en:'Vegetable samosas',fr:'Samosas aux légumes',es:'Samosas de verduras'}},
    {price:14.5,names:{en:'Butter chicken',fr:'Poulet au beurre',es:'Pollo a la mantequilla'}},
    {price:13,names:{en:'Palak paneer',fr:'Palak paneer',es:'Palak paneer'}}
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
        <div class="dish-photo" style="--panel:${index}"><img src="assets/${section}.png" alt="${dish.names[language]}" width="2172" height="724" ${section === 'indian' ? 'loading="lazy"' : ''}><span class="dish-index" aria-hidden="true">0${index+1}</span></div>
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
