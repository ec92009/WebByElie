const translations = {
  en: {
    meta: { title: "La Piazza | Sample menu | Web By Elie", description: "A warm multilingual La Piazza menu demo by Web By Elie.", gateTitle: "La Piazza | Choose a language | Web By Elie", gateDescription: "Choose a language for the La Piazza sample menu." },
    gate: { title: "Welcome to La Piazza", lede: "Choose the language you would like to use for the menu.", qrTitle: "Scan for the menu", qrNote: "A real restaurant can place this on a table card, coaster, or window sticker." },
    nav: { backToLanguages: "Back to languages", backToTop: "Back to top" },
    sectionNav: { label: "Choose a menu section" },
    hero: { kicker: "La Piazza · Pizzeria", title: "Good food, shared.", lede: "A simple Italian table for evenings that run a little longer.", note: "Sample menu for demonstration only. Dishes and prices are placeholders." },
    menu: { kicker: "Today at La Piazza", title: "Choose your favourite.", intro: "Browse at your leisure. Your language appears first, with the Spanish name underneath for the local team." },
    sections: { starters: { title: "Starters", intro: "Begin with something bright." }, pizzas: { title: "Pizzas", intro: "From the wood-fired oven." }, pasta: { title: "Pasta", intro: "Comfort, made to order." }, desserts: { title: "Desserts", intro: "Finish on a sweet note." } },
    qr: { kicker: "Ready when you are", title: "Keep the menu close.", body: "The same menu can live behind a QR code on a table card, coaster, or entrance sticker. Updates stay online." },
    footer: { demo: "Demo menu by", privacy: "Privacy", terms: "Terms", data: "Data deletion" }
  },
  fr: {
    meta: { title: "La Piazza | Menu exemple | Web By Elie", description: "Un exemple de menu multilingue pour La Piazza par Web By Elie.", gateTitle: "La Piazza | Choisir une langue | Web By Elie", gateDescription: "Choisissez une langue pour le menu exemple de La Piazza." },
    gate: { title: "Bienvenue à La Piazza", lede: "Choisissez la langue que vous souhaitez utiliser pour le menu.", qrTitle: "Scannez le menu", qrNote: "Un restaurant peut placer ce QR code sur une carte, un dessous-de-verre ou une vitrine." },
    nav: { backToLanguages: "Retour aux langues", backToTop: "Retour en haut" },
    sectionNav: { label: "Choisir une section du menu" },
    hero: { kicker: "La Piazza · Pizzeria", title: "Le goût à partager.", lede: "Une table italienne simple pour les soirées qui s'attardent.", note: "Menu présenté à titre d'exemple. Les plats et les prix sont fictifs." },
    menu: { kicker: "Aujourd'hui à La Piazza", title: "Choisissez votre envie.", intro: "Parcourez le menu à votre rythme. Votre langue apparaît en premier, puis le nom espagnol pour l'équipe locale." },
    sections: { starters: { title: "Entrées", intro: "Commencer tout en fraîcheur." }, pizzas: { title: "Pizzas", intro: "Sorties du four à bois." }, pasta: { title: "Pâtes", intro: "Réconfort, minute après minute." }, desserts: { title: "Desserts", intro: "Finir sur une note douce." } },
    qr: { kicker: "À portée de main", title: "Gardez le menu près de vous.", body: "Le même menu peut se cacher derrière un QR code sur une carte, un dessous-de-verre ou une vitrine. Les mises à jour restent en ligne." },
    footer: { demo: "Menu démo par", privacy: "Confidentialité", terms: "Conditions", data: "Suppression des données" }
  },
  es: {
    meta: { title: "La Piazza | Menú de muestra | Web By Elie", description: "Un ejemplo de menú multilingüe para La Piazza de Web By Elie.", gateTitle: "La Piazza | Elige un idioma | Web By Elie", gateDescription: "Elige un idioma para el menú de muestra de La Piazza." },
    gate: { title: "Bienvenido a La Piazza", lede: "Elige el idioma que quieres usar para el menú.", qrTitle: "Escanea el menú", qrNote: "Un restaurante puede colocar este QR en una tarjeta, un posavasos o un adhesivo en el escaparate." },
    nav: { backToLanguages: "Volver a los idiomas", backToTop: "Volver arriba" },
    sectionNav: { label: "Elige una sección del menú" },
    hero: { kicker: "La Piazza · Pizzería", title: "Comida para compartir.", lede: "Una mesa italiana sencilla para las noches que se alargan.", note: "Menú de muestra para demostración. Los platos y precios son provisionales." },
    menu: { kicker: "Hoy en La Piazza", title: "Elige tu favorito.", intro: "Navega a tu ritmo. Tu idioma aparece primero y debajo queda el nombre en español para el equipo local." },
    sections: { starters: { title: "Entrantes", intro: "Empieza con algo fresco." }, pizzas: { title: "Pizzas", intro: "Del horno de leña." }, pasta: { title: "Pasta", intro: "Confort, hecho al momento." }, desserts: { title: "Postres", intro: "Un final dulce." } },
    qr: { kicker: "Siempre a mano", title: "Lleva el menú contigo.", body: "El mismo menú puede vivir detrás de un QR en una tarjeta, un posavasos o un adhesivo de entrada. Las actualizaciones se hacen online." },
    footer: { demo: "Menú demo de", privacy: "Privacidad", terms: "Condiciones", data: "Eliminación de datos" }
  }
};

const menu = [
  { id: "starters", image: "assets/melon.jpg", items: [
    { n: "01", image: "assets/melon.jpg", price: "€9", name: { en: "Melon with cured ham", fr: "Melon au jambon cru", es: "Melón con jamón" }, es: "Melón con jamón", alt: "Melon wrapped in thin cured ham" },
    { n: "02", image: "assets/pan-tomato.jpg", price: "€5", name: { en: "Bread with tomato", fr: "Pain à la tomate", es: "Pan con tomate" }, es: "Pan con tomate", alt: "Bread with ripe tomato and olive oil" },
    { n: "03", image: "assets/gazpacho.jpg", price: "€6", name: { en: "House gazpacho", fr: "Gaspacho maison", es: "Gazpacho casero" }, es: "Gazpacho casero", alt: "Chilled tomato gazpacho" }
  ] },
  { id: "pizzas", image: "assets/margherita.jpg", items: [
    { n: "04", image: "assets/margherita.jpg", price: "€10", name: { en: "Margherita", fr: "Margherita", es: "Margherita" }, es: "Margherita", alt: "Neapolitan margherita pizza with basil" },
    { n: "05", image: "assets/prosciutto-funghi.jpg", price: "€13", name: { en: "Prosciutto e funghi", fr: "Prosciutto e funghi", es: "Prosciutto e funghi" }, es: "Prosciutto e funghi", alt: "Pizza with prosciutto and mushrooms" },
    { n: "06", image: "assets/diavola.jpg", price: "€13", name: { en: "Diavola", fr: "Diavola", es: "Diavola" }, es: "Diavola", alt: "Spicy salami pizza" },
    { n: "07", image: "assets/quattro-formaggi.jpg", price: "€14", name: { en: "Quattro formaggi", fr: "Quattro formaggi", es: "Quattro formaggi" }, es: "Quattro formaggi", alt: "Four cheese pizza" },
    { n: "08", image: "assets/vegetariana.jpg", price: "€12", name: { en: "Vegetariana", fr: "Vegetariana", es: "Vegetariana" }, es: "Vegetariana", alt: "Vegetable pizza" },
    { n: "09", image: "assets/tonno-cipolla.jpg", price: "€13", name: { en: "Tonno e cipolla", fr: "Tonno e cipolla", es: "Tonno e cipolla" }, es: "Tonno e cipolla", alt: "Tuna and onion pizza" }
  ] },
  { id: "pasta", image: "assets/carbonara.jpg", items: [
    { n: "10", image: "assets/carbonara.jpg", price: "€13", name: { en: "Spaghetti alla carbonara", fr: "Spaghetti alla carbonara", es: "Spaghetti alla carbonara" }, es: "Spaghetti alla carbonara", alt: "Spaghetti alla carbonara" },
    { n: "11", image: "assets/bolognese.jpg", price: "€13", name: { en: "Tagliatelle alla bolognese", fr: "Tagliatelle alla bolognese", es: "Tagliatelle alla bolognese" }, es: "Tagliatelle alla bolognese", alt: "Tagliatelle with bolognese sauce" },
    { n: "12", image: "assets/arrabbiata.jpg", price: "€11", name: { en: "Penne all’arrabbiata", fr: "Penne all’arrabbiata", es: "Penne all’arrabbiata" }, es: "Penne all’arrabbiata", alt: "Penne with spicy tomato sauce" },
    { n: "13", image: "assets/lasagne.jpg", price: "€14", name: { en: "Lasagne al forno", fr: "Lasagne al forno", es: "Lasagne al forno" }, es: "Lasagne al forno", alt: "Baked lasagne" }
  ] },
  { id: "desserts", image: "assets/tiramisu.jpg", items: [
    { n: "14", image: "assets/tiramisu.jpg", price: "€6", name: { en: "Tiramisù", fr: "Tiramisù", es: "Tiramisú" }, es: "Tiramisú", alt: "Tiramisu dusted with cocoa" },
    { n: "15", image: "assets/panna-cotta.jpg", price: "€6", name: { en: "Panna cotta", fr: "Panna cotta", es: "Panna cotta" }, es: "Panna cotta", alt: "Panna cotta dessert" },
    { n: "16", image: "assets/gelato.jpg", price: "€5", name: { en: "Gelato", fr: "Glace italienne", es: "Helado", }, es: "Helado", alt: "Scoop of gelato" }
  ] }
];

const root = document.documentElement;
const languageGate = document.querySelector("#language-gate");
const menuContent = document.querySelector("#menu-content");
const footer = document.querySelector(".site-footer");
const backLanguage = document.querySelector("#back-language");
const backToTop = document.querySelector("#back-to-top");
const menuSections = document.querySelector("#menu-sections");
const languageCards = [...document.querySelectorAll(".language-card")];
const supportedLanguages = Object.keys(translations);

const getCopy = (language, path) => path.split(".").reduce((value, key) => value?.[key], translations[language]);
const applyCopy = (language) => {
  document.querySelectorAll("[data-copy]").forEach((element) => {
    const value = getCopy(language, element.dataset.copy);
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-copy-attr]").forEach((element) => {
    const [attribute, path] = element.dataset.copyAttr.split(":");
    const value = getCopy(language, path);
    if (typeof value === "string") element.setAttribute(attribute, value);
  });
  document.title = getCopy(language, "meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", getCopy(language, "meta.description"));
};

const renderMenu = (language) => {
  menuSections.innerHTML = menu.map((section) => {
    const sectionCopy = getCopy(language, `sections.${section.id}`);
    const items = section.items.map((item) => {
      const name = item.name[language] ?? item.name.en;
      const spanish = language === "es" ? "" : `<p class="dish-spanish" lang="es">${item.es}</p>`;
      return `<article class="dish-card"><img src="${item.image ?? section.image}" alt="${item.alt}" loading="lazy" width="1000" height="1000"><div class="dish-body"><span class="dish-number">${item.n}</span><div class="dish-topline"><div><h4 class="dish-name">${name}</h4>${spanish}</div><span class="price">${item.price}</span></div></div></article>`;
    }).join("");
    return `<section class="menu-section" id="${section.id}" aria-labelledby="${section.id}-title"><div class="menu-heading"><h3 id="${section.id}-title">${sectionCopy.title}</h3><p>${sectionCopy.intro}</p></div><div class="dish-grid">${items}</div></section>`;
  }).join("");
};

const setLanguage = (language, updateUrl = true) => {
  const selected = supportedLanguages.includes(language) ? language : null;
  const display = selected ?? "en";
  root.lang = display;
  root.dataset.menuLanguage = selected ?? "none";
  applyCopy(display);
  if (selected) renderMenu(selected);
  languageGate.hidden = Boolean(selected);
  menuContent.hidden = !selected;
  footer.hidden = !selected;
  backToTop.setAttribute("aria-label", getCopy(display, "nav.backToTop"));
  backToTop.hidden = !selected || window.scrollY < 300;
  document.querySelector(".skip-link").setAttribute("href", selected ? "#menu" : "#language-gate");
  document.querySelector(".skip-link").textContent = selected ? (display === "fr" ? "Aller au menu" : display === "es" ? "Ir al menú" : "Skip to the menu") : (display === "fr" ? "Aller au choix de langue" : display === "es" ? "Ir a la selección de idioma" : "Skip to language selection");
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selected) url.searchParams.set("lang", selected); else { url.searchParams.delete("lang"); url.hash = ""; }
    window.history.replaceState({}, "", url);
  }
};

languageCards.forEach((card) => card.addEventListener("click", () => { setLanguage(card.dataset.lang); window.scrollTo({ top: 0, behavior: "smooth" }); }));
backLanguage.addEventListener("click", () => { setLanguage(null); window.scrollTo({ top: 0, behavior: "smooth" }); languageCards[0]?.focus({ preventScroll: true }); });
backToTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); document.querySelector("#menu")?.focus?.({ preventScroll: true }); });
window.addEventListener("scroll", () => { backToTop.hidden = menuContent.hidden || window.scrollY < 300; }, { passive: true });

document.querySelectorAll(".section-nav a").forEach((link) => link.addEventListener("click", () => { const target = document.querySelector(link.getAttribute("href")); target?.setAttribute("tabindex", "-1"); target?.focus({ preventScroll: true }); }));

const initialLanguage = new URLSearchParams(window.location.search).get("lang");
setLanguage(initialLanguage, false);
