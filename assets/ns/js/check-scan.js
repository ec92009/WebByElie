/*
 * Night Signal — Free Site Check Interactive Signal Scan (EN / FR / ES)
 * Updates radial SVG gauge, highlights recommended service modules for "No" answers,
 * and enriches the mailto CTA while remaining usable without JS.
 */
(function () {
  "use strict";

  var form = document.querySelector("[data-signal-check]");
  if (!form) return;

  var lang = (document.documentElement.lang || "en").toLowerCase().slice(0, 2);
  var COPY = {
    en: {
      awaiting: "AWAITING INPUT",
      scanned: function (a, t) { return a + " OF " + t + " SCANNED"; },
      clear: "SIGNAL CLEAR",
      gaps: function (n) { return n + (n === 1 ? " GAP FOUND" : " GAPS FOUND"); },
      statusInit: "Toggle Yes or No on each check to illuminate matching fixes.",
      statusAllYes: "All eight checks answered Yes. Send your URL if you want a second pair of eyes.",
      statusKeepGoing: "Keep toggling the remaining checks to complete the diagnostic scan.",
      statusLit: function (n) { return n + (n === 1 ? " service module lit up below" : " service modules lit up below") + " based on your No answers."; },
      summaryAll: "All 8 linked service modules",
      summaryHit: function (n) { return n + " recommended module" + (n === 1 ? "" : "s") + " highlighted"; },
    },
    fr: {
      awaiting: "EN ATTENTE",
      scanned: function (a, t) { return a + " SUR " + t + " VÉRIFIÉS"; },
      clear: "SIGNAL CLAIR",
      gaps: function (n) { return n + (n === 1 ? " POINT À REVOIR" : " POINTS À REVOIR"); },
      statusInit: "Cochez Oui ou Non sur chaque point pour éclairer les modules correspondants.",
      statusAllYes: "Huit réponses Oui. Envoyez votre adresse si vous voulez un second regard.",
      statusKeepGoing: "Continuez les vérifications restantes pour terminer le diagnostic.",
      statusLit: function (n) { return n + (n === 1 ? " module mis en avant ci-dessous" : " modules mis en avant ci-dessous") + " selon vos réponses Non."; },
      summaryAll: "Les 8 modules de service liés",
      summaryHit: function (n) { return n + (n === 1 ? " module recommandé mis en avant" : " modules recommandés mis en avant"); },
    },
    es: {
      awaiting: "ESPERANDO DATOS",
      scanned: function (a, t) { return a + " DE " + t + " REVISADOS"; },
      clear: "SEÑAL CLARA",
      gaps: function (n) { return n + (n === 1 ? " BRECHA DETECTADA" : " BRECHAS DETECTADAS"); },
      statusInit: "Marca Sí o No en cada punto para destacar las mejoras correspondientes.",
      statusAllYes: "Las ocho comprobaciones son Sí. Envía tu URL si quieres una segunda revisión.",
      statusKeepGoing: "Continúa con los puntos restantes para completar el diagnóstico.",
      statusLit: function (n) { return n + (n === 1 ? " módulo destacado abajo" : " módulos destacados abajo") + " según tus respuestas No."; },
      summaryAll: "Los 8 módulos de servicio vinculados",
      summaryHit: function (n) { return n + (n === 1 ? " módulo recomendado destacado" : " módulos recomendados destacados"); },
    },
  };
  var t = COPY[lang] || COPY.en;

  var CIRCUMFERENCE = 2 * Math.PI * 80;
  var items = form.querySelectorAll(".ns-check-item");
  var gaugeArc = document.querySelector("[data-gauge-arc]");
  var scoreEl = document.querySelector("[data-gauge-score]");
  var subEl = document.querySelector("[data-gauge-sub]");
  var statusEl = document.querySelector("[data-gauge-status]");
  var fixSummaryEl = document.querySelector("[data-fix-summary]");
  var fixCards = document.querySelectorAll("[data-fix-service]");
  var mailtoBtn = document.querySelector("[data-check-mailto]");
  var resetBtn = document.querySelector("[data-check-reset]");
  var baseMailto = mailtoBtn ? mailtoBtn.getAttribute("href") : "";

  function evaluate() {
    var total = items.length;
    var answered = 0;
    var yesCount = 0;
    var noServices = [];

    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var checked = item.querySelector("input[type='radio']:checked");
      var svc = item.getAttribute("data-service");
      if (checked) {
        answered += 1;
        item.setAttribute("data-answer", checked.value);
        if (checked.value === "yes") {
          yesCount += 1;
        } else if (checked.value === "no" && svc) {
          noServices.push(svc);
        }
      } else {
        item.removeAttribute("data-answer");
      }
    }

    var ratio = answered > 0 ? yesCount / total : 0;
    var offset = CIRCUMFERENCE * (1 - ratio);

    if (gaugeArc) {
      gaugeArc.style.setProperty("--gauge-offset", offset.toFixed(2));
      if (answered === 0) {
        gaugeArc.style.setProperty("--gauge-stroke", "var(--ns-cyan)");
      } else if (noServices.length === 0 && answered === total) {
        gaugeArc.style.setProperty("--gauge-stroke", "var(--ns-lime)");
      } else if (yesCount >= Math.ceil(total * 0.5)) {
        gaugeArc.style.setProperty("--gauge-stroke", "var(--ns-cyan)");
      } else {
        gaugeArc.style.setProperty("--gauge-stroke", "var(--ns-amber)");
      }
    }

    if (scoreEl) {
      scoreEl.textContent = answered === 0 ? "--/" + total : yesCount + "/" + total;
    }

    if (subEl) {
      if (answered === 0) subEl.textContent = t.awaiting;
      else if (answered < total) subEl.textContent = t.scanned(answered, total);
      else if (noServices.length === 0) subEl.textContent = t.clear;
      else subEl.textContent = t.gaps(noServices.length);
    }

    if (statusEl) {
      if (answered === 0) {
        statusEl.textContent = t.statusInit;
      } else if (noServices.length === 0 && answered === total) {
        statusEl.textContent = t.statusAllYes;
      } else if (noServices.length === 0) {
        statusEl.textContent = t.statusKeepGoing;
      } else {
        statusEl.textContent = t.statusLit(noServices.length);
      }
    }

    for (var c = 0; c < fixCards.length; c += 1) {
      var card = fixCards[c];
      var slug = card.getAttribute("data-fix-service");
      var isHit = noServices.indexOf(slug) !== -1;
      card.classList.toggle("is-recommended", isHit);
      card.classList.toggle("is-dimmed", noServices.length > 0 && !isHit);
    }

    if (fixSummaryEl) {
      fixSummaryEl.textContent =
        noServices.length > 0 ? t.summaryHit(noServices.length) : t.summaryAll;
    }

    if (mailtoBtn && baseMailto) {
      if (answered > 0) {
        var extra =
          "%0A%0ASelf-check%20score%3A%20" +
          yesCount +
          "%2F" +
          total +
          (noServices.length ? "%0AGaps%20flagged%3A%20" + encodeURIComponent(noServices.join(", ")) : "");
        mailtoBtn.setAttribute("href", baseMailto + extra);
      } else {
        mailtoBtn.setAttribute("href", baseMailto);
      }
    }
  }

  form.addEventListener("change", evaluate);

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      var inputs = form.querySelectorAll("input[type='radio']");
      for (var r = 0; r < inputs.length; r += 1) {
        inputs[r].checked = false;
      }
      evaluate();
    });
  }

  evaluate();
})();
