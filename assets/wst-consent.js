/* WebByElie analytics preferences: fail closed, explicit opt-in, no preview collection. */
(function configureAnalytics(window, document, navigator) {
  "use strict";
  const beacon = document.querySelector("script[data-wst-site]");
  if (!beacon) return;
  const production = window.location.origin === "https://web-by-elie.com";
  const privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
  const preferenceKey = "wbe:analytics-consent:v1";
  const copy = {
    en: ["Optional analytics", "May we count visits and button presses to improve this website? No form contents or contact details are collected.", "Allow analytics", "No thanks", "Analytics choices", "Analytics allowed", "Analytics off", "Your browser privacy preference is respected.", "Tracking is off on this preview.", "Privacy policy"],
    fr: ["Statistiques facultatives", "Pouvons-nous compter les visites et les clics pour améliorer ce site ? Aucun contenu de formulaire ni coordonnée n’est collecté.", "Autoriser", "Non merci", "Choix statistiques", "Statistiques autorisées", "Statistiques désactivées", "La préférence de confidentialité de votre navigateur est respectée.", "Le suivi est désactivé sur cet aperçu.", "Confidentialité"],
    es: ["Analítica opcional", "¿Podemos contar visitas y clics para mejorar este sitio? No recopilamos contenidos de formularios ni datos de contacto.", "Permitir analítica", "No, gracias", "Opciones de analítica", "Analítica permitida", "Analítica desactivada", "Respetamos la preferencia de privacidad de su navegador.", "El seguimiento está desactivado en esta vista previa.", "Privacidad"],
  }[document.documentElement.lang] || null;
  if (!copy) return;
  let preference = "unknown";
  try {
    const saved = window.localStorage.getItem(preferenceKey);
    if (saved === "granted" || saved === "denied") preference = saved;
  } catch { /* Storage denial leaves the visitor free to choose per page. */ }
  if (privacySignal || !production) preference = "denied";

  beacon.dataset.wstEnabled = String(production);
  beacon.dataset.wstEndpoint = production ? "https://web-signals-collector.ec92009.workers.dev/v1/events" : "";
  beacon.dataset.wstConsent = preference;
  beacon.dataset.wstSynthetic = String(navigator.webdriver === true || new URLSearchParams(window.location.search).get("wst_test") === "1");

  const panel = document.createElement("section");
  panel.className = "shell analytics-panel";
  panel.setAttribute("aria-labelledby", "analytics-heading");
  const heading = document.createElement("h2");
  heading.id = "analytics-heading";
  heading.tabIndex = -1;
  heading.textContent = copy[0];
  const explanation = document.createElement("p");
  explanation.textContent = privacySignal ? copy[7] : !production ? copy[8] : copy[1];
  const actions = document.createElement("div");
  actions.className = "analytics-actions";
  const result = document.createElement("p");
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");

  const choices = document.createElement("button");
  choices.type = "button";
  choices.className = "analytics-choices";
  choices.setAttribute("aria-controls", "analytics-heading");
  choices.textContent = copy[4];

  /** Apply the visible choice synchronously before permitting any beacon. */
  function choose(value) {
    preference = privacySignal || !production ? "denied" : value;
    result.textContent = preference === "granted" ? copy[5] : copy[6];
    for (const button of actions.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.consent === preference));
    }
    try { window.localStorage.setItem(preferenceKey, preference); } catch {}
    beacon.dataset.wstConsent = preference;
    window.WebSignals?.setConsent(preference);
  }

  for (const [value, label] of [["granted", copy[2]], ["denied", copy[3]]]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary";
    button.dataset.consent = value;
    button.textContent = label;
    button.disabled = privacySignal || !production;
    button.setAttribute("aria-pressed", String(value === preference));
    button.addEventListener("click", () => choose(value));
    actions.append(button);
  }
  const policy = document.createElement("a");
  policy.href = "/privacy";
  policy.textContent = copy[9];
  actions.append(policy);
  panel.append(heading, explanation, actions, result);
  panel.hidden = preference !== "unknown" && new URLSearchParams(window.location.search).get("analytics") !== "choices";
  choices.setAttribute("aria-expanded", String(!panel.hidden));
  choices.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    choices.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) heading.focus();
  });
  document.querySelector("main")?.before(panel);
  document.querySelector(".footer-links")?.append(choices);
})(window, document, navigator);
