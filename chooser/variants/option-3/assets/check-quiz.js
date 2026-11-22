/**
 * Web By Elie — Option 3 ("Toybox")
 * Free Site Check: game-show flashcard quiz (progressive enhancement).
 */
(function () {
  "use strict";

  var stage = document.getElementById("toybox-quiz");
  if (!stage) return;

  var cards = Array.prototype.slice.call(stage.querySelectorAll(".quiz-card"));
  var dots = Array.prototype.slice.call(stage.querySelectorAll(".quiz-dot"));
  var resultsBox = document.getElementById("quiz-results");
  var scoreRing = document.getElementById("quiz-score-ring");
  var scoreText = document.getElementById("quiz-score-text");
  var scoreSummary = document.getElementById("quiz-score-summary");
  var recCards = Array.prototype.slice.call(stage.querySelectorAll(".rec-sticker"));
  var recEmpty = document.getElementById("quiz-rec-empty");
  var mailCta = document.getElementById("quiz-mailto-cta");
  var prevBtn = document.getElementById("quiz-prev");
  var statusEl = document.getElementById("quiz-status");
  var resetBtn = document.getElementById("quiz-reset");

  if (!cards.length) return;

  var baseMailto = mailCta ? mailCta.getAttribute("href") : "";
  var total = cards.length;
  var answers = new Array(total).fill(null);
  var current = 0;

  stage.classList.add("is-active");
  if (resultsBox) resultsBox.classList.add("is-hidden");

  function syncUI() {
    cards.forEach(function (card, idx) {
      var active = idx === current;
      card.classList.toggle("is-current", active);
      var yesBtn = card.querySelector("[data-answer='yes']");
      var noBtn = card.querySelector("[data-answer='no']");
      if (yesBtn) {
        yesBtn.classList.toggle("is-picked", answers[idx] === true);
        yesBtn.setAttribute("aria-pressed", String(answers[idx] === true));
      }
      if (noBtn) {
        noBtn.classList.toggle("is-picked", answers[idx] === false);
        noBtn.setAttribute("aria-pressed", String(answers[idx] === false));
      }
    });

    dots.forEach(function (dot, idx) {
      dot.classList.toggle("is-current", idx === current);
      dot.classList.toggle("is-yes", answers[idx] === true);
      dot.classList.toggle("is-no", answers[idx] === false);
      if (idx === current) {
        dot.setAttribute("aria-current", "step");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = current === 0;
    }

    if (statusEl) {
      var answered = answers.filter(function (v) {
        return v !== null;
      }).length;
      statusEl.textContent = "Question " + (current + 1) + " of " + total + " (" + answered + " answered)";
    }
  }

  function showResults() {
    var yesCount = answers.filter(function (v) {
      return v === true;
    }).length;
    var flagged = [];
    cards.forEach(function (card, idx) {
      if (answers[idx] === false) {
        flagged.push(card.getAttribute("data-service"));
      }
    });

    if (scoreText) {
      scoreText.textContent = yesCount + " / " + total;
    }
    if (scoreRing) {
      scoreRing.style.setProperty("--score-ratio", String(yesCount / total));
    }
    if (scoreSummary) {
      if (flagged.length === 0) {
        scoreSummary.textContent =
          "You answered yes to every check! If you want a second pair of eyes on anything coming up, send your URL to Elie.";
      } else {
        scoreSummary.textContent =
          "You spotted " +
          flagged.length +
          " area" +
          (flagged.length === 1 ? "" : "s") +
          " worth tightening. Here are the matching services:";
      }
    }

    recCards.forEach(function (rec) {
      var slug = rec.getAttribute("data-rec-service");
      rec.hidden = flagged.indexOf(slug) === -1;
    });

    if (recEmpty) {
      recEmpty.hidden = flagged.length > 0;
    }

    if (mailCta && baseMailto) {
      var note = "%0AScore%3A%20" + yesCount + "%2F" + total;
      if (flagged.length) {
        note += "%0AAreas%20to%20review%3A%20" + encodeURIComponent(flagged.join(", "));
      }
      mailCta.setAttribute("href", baseMailto + note);
    }

    if (resultsBox) {
      resultsBox.classList.remove("is-hidden");
      resultsBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (typeof window.toyboxConfetti === "function") {
      window.toyboxConfetti(window.innerWidth * 0.5, window.innerHeight * 0.35);
    }
  }

  function choose(idx, val) {
    answers[idx] = val;
    if (idx < total - 1) {
      current = idx + 1;
      syncUI();
      var nextYes = cards[current].querySelector("[data-answer='yes']");
      if (nextYes) nextYes.focus();
    } else {
      syncUI();
      showResults();
    }
  }

  cards.forEach(function (card, idx) {
    var yesBtn = card.querySelector("[data-answer='yes']");
    var noBtn = card.querySelector("[data-answer='no']");
    if (yesBtn) {
      yesBtn.addEventListener("click", function () {
        choose(idx, true);
      });
    }
    if (noBtn) {
      noBtn.addEventListener("click", function () {
        choose(idx, false);
      });
    }
  });

  dots.forEach(function (dot, idx) {
    dot.addEventListener("click", function () {
      current = idx;
      syncUI();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (current > 0) {
        current -= 1;
        syncUI();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      answers = new Array(total).fill(null);
      current = 0;
      if (resultsBox) resultsBox.classList.add("is-hidden");
      if (scoreRing) scoreRing.style.setProperty("--score-ratio", "0");
      if (mailCta && baseMailto) mailCta.setAttribute("href", baseMailto);
      syncUI();
    });
  }

  stage.addEventListener("keydown", function (ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if (ev.key === "y" || ev.key === "Y") {
      choose(current, true);
    } else if (ev.key === "n" || ev.key === "N") {
      choose(current, false);
    } else if (ev.key === "ArrowLeft" && current > 0) {
      current -= 1;
      syncUI();
    } else if (ev.key === "ArrowRight" && current < total - 1) {
      current += 1;
      syncUI();
    }
  });

  syncUI();
})();
