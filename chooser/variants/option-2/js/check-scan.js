/*
 * Night Signal — Free Site Check Interactive Signal Scan
 * Updates radial SVG gauge, highlights recommended service modules for "No" answers,
 * and enriches the mailto CTA while remaining usable without JS.
 */
(function () {
  "use strict";

  var form = document.querySelector("[data-signal-check]");
  if (!form) return;

  var CIRCUMFERENCE = 2 * Math.PI * 80; // r=80 -> 502.65
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
      if (answered === 0) subEl.textContent = "AWAITING INPUT";
      else if (answered < total) subEl.textContent = answered + " OF " + total + " SCANNED";
      else if (noServices.length === 0) subEl.textContent = "SIGNAL CLEAR";
      else subEl.textContent = noServices.length + (noServices.length === 1 ? " GAP FOUND" : " GAPS FOUND");
    }

    if (statusEl) {
      if (answered === 0) {
        statusEl.textContent = "Toggle Yes or No on each check to illuminate matching fixes.";
      } else if (noServices.length === 0 && answered === total) {
        statusEl.textContent = "All eight checks answered Yes. Send your URL if you want a second pair of eyes.";
      } else if (noServices.length === 0) {
        statusEl.textContent = "Keep toggling the remaining checks to complete the diagnostic scan.";
      } else {
        statusEl.textContent =
          noServices.length +
          (noServices.length === 1 ? " service module lit up below" : " service modules lit up below") +
          " based on your No answers.";
      }
    }

    // Highlight matching fix cards
    for (var c = 0; c < fixCards.length; c += 1) {
      var card = fixCards[c];
      var slug = card.getAttribute("data-fix-service");
      var isHit = noServices.indexOf(slug) !== -1;
      card.classList.toggle("is-recommended", isHit);
      card.classList.toggle("is-dimmed", noServices.length > 0 && !isHit);
    }

    if (fixSummaryEl) {
      fixSummaryEl.textContent =
        noServices.length > 0
          ? noServices.length + " recommended module" + (noServices.length === 1 ? "" : "s") + " highlighted"
          : "All 8 linked service modules";
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
