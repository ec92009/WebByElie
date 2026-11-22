/**
 * Paper & Ink — Interactive Free Site Check ("Form 08") & Prescription Slip.
 * Purely client-side; gracefully enhances the static checklist.
 */
(function () {
  "use strict";

  var app = document.querySelector("[data-check-app]");
  if (!app) return;

  var rows = Array.prototype.slice.call(app.querySelectorAll("[data-check-item]"));
  var scoreEl = app.querySelector("[data-rx-score]");
  var answeredEl = app.querySelector("[data-rx-answered]");
  var verdictEl = app.querySelector("[data-rx-verdict]");
  var meterEl = app.querySelector("[data-rx-meter]");
  var statusEl = app.querySelector("[data-rx-status]");
  var listEl = app.querySelector("[data-rx-list]");
  var mailtoEl = app.querySelector("[data-rx-mailto]");
  var resetBtn = app.querySelector("[data-rx-reset]");

  var total = rows.length;
  var mailtoBase = app.getAttribute("data-mailto-base") || "";
  var optionRoot = app.getAttribute("data-option-root") || "../";
  var answers = new Array(total).fill(null);
  var displayedYes = 0;

  function animateScoreTo(targetYes) {
    var start = displayedYes;
    displayedYes = targetYes;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || start === targetYes) {
      scoreEl.textContent = targetYes + " / " + total;
      return;
    }
    var t0 = performance.now();
    var dur = 260;
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var val = Math.round(start + (targetYes - start) * p);
      scoreEl.textContent = val + " / " + total;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderSlip() {
    var yesCount = 0;
    var answeredCount = 0;
    var flagged = [];

    for (var i = 0; i < total; i += 1) {
      var ans = answers[i];
      if (ans !== null) answeredCount += 1;
      if (ans === "yes") yesCount += 1;
      if (ans === "no") {
        var row = rows[i];
        flagged.push({
          slug: row.getAttribute("data-service-slug"),
          name: row.getAttribute("data-service-name"),
          num: row.getAttribute("data-service-num"),
        });
      }
    }

    animateScoreTo(yesCount);
    answeredEl.textContent = answeredCount + " of " + total + " stamped";
    meterEl.style.setProperty("--score-pct", (yesCount / total).toFixed(3));
    resetBtn.hidden = answeredCount === 0;

    if (answeredCount === 0) {
      verdictEl.textContent = "Awaiting stamps";
      statusEl.textContent =
        "Stamp Yes or No on the left to tally your score and print tailored recommendations below.";
    } else if (flagged.length === 0 && answeredCount === total) {
      verdictEl.textContent = "Strong shape";
      statusEl.textContent =
        "All eight checks passed. If you still want a second pair of eyes or a lighter visual refresh, drop a line.";
    } else if (flagged.length === 0) {
      verdictEl.textContent = "Looking steady";
      statusEl.textContent =
        "No gaps flagged so far. Finish stamping the remaining items to complete your Prescription Slip.";
    } else {
      verdictEl.textContent = flagged.length + (flagged.length === 1 ? " area to tighten" : " areas to tighten");
      statusEl.textContent =
        "Based on your \"No\" answers, these services directly address the gaps you flagged:";
    }

    // Rebuild Prescription Slip list cleanly using DOM nodes
    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }

    if (answeredCount === 0) {
      var idleLi = document.createElement("li");
      idleLi.className = "rx-item";
      var idleSpan = document.createElement("span");
      idleSpan.className = "kicker";
      idleSpan.textContent = "No gaps stamped yet";
      idleLi.appendChild(idleSpan);
      listEl.appendChild(idleLi);
    } else if (flagged.length === 0) {
      var okLi = document.createElement("li");
      okLi.className = "rx-item";
      var okSpan = document.createElement("span");
      okSpan.className = "kicker kicker-sage";
      okSpan.textContent = "Nothing flagged so far";
      okLi.appendChild(okSpan);
      listEl.appendChild(okLi);
    } else {
      flagged.forEach(function (svc) {
        var li = document.createElement("li");
        li.className = "rx-item";

        var link = document.createElement("a");
        link.href = optionRoot + "services/" + svc.slug + "/";
        link.textContent = svc.num + " · " + svc.name;

        var tag = document.createElement("span");
        tag.className = "kicker kicker-vermilion";
        tag.textContent = "Recommended →";

        li.appendChild(link);
        li.appendChild(tag);
        listEl.appendChild(li);
      });
    }

    // Update mailto link while preserving site.mailtoCheck base
    if (answeredCount === 0) {
      mailtoEl.setAttribute("href", mailtoBase);
    } else {
      var summary =
        "%0A%0AFree%20site%20check%20score%3A%20" +
        yesCount +
        "%2F" +
        total +
        (flagged.length
          ? "%0AFlagged%20areas%3A%20" +
            encodeURIComponent(
              flagged
                .map(function (s) {
                  return s.name;
                })
                .join(", ")
            )
          : "");
      mailtoEl.setAttribute("href", mailtoBase + summary);
    }
  }

  rows.forEach(function (row, idx) {
    var btns = Array.prototype.slice.call(row.querySelectorAll(".stamp-btn"));
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-answer");
        answers[idx] = answers[idx] === val ? null : val;

        btns.forEach(function (b) {
          var isActive = answers[idx] === b.getAttribute("data-answer");
          b.setAttribute("aria-pressed", String(isActive));
          b.classList.remove("just-stamped");
          if (isActive) {
            void b.offsetWidth;
            b.classList.add("just-stamped");
          }
        });

        renderSlip();
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      answers.fill(null);
      app.querySelectorAll(".stamp-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
        b.classList.remove("just-stamped");
      });
      renderSlip();
    });
  }

  renderSlip();
})();
