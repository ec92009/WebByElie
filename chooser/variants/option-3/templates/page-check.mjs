import {
  checkQuestions,
  allServices,
  site,
  toOptionRoot,
} from "../../../content.mjs";
import { esc, serviceTheme } from "./utils.mjs";
import { renderMascot } from "./mascots.mjs";

export function renderCheckPage() {
  const root = toOptionRoot("check/");
  const bySlug = new Map(allServices.map((s) => [s.slug, s]));
  const cardColors = [
    "tile-sunflower",
    "tile-cobalt",
    "tile-lilac",
    "tile-coral",
    "tile-mint",
    "tile-sunflower",
    "tile-coral",
    "tile-cobalt",
  ];

  const dotsHtml = checkQuestions
    .map(
      (_, i) =>
        `<button class="quiz-dot" type="button" aria-label="Go to question ${i + 1}">${i + 1}</button>`
    )
    .join("");

  const cardsHtml = checkQuestions
    .map((item, i) => {
      const svc = bySlug.get(item.service);
      const color = cardColors[i % cardColors.length];
      return `<li class="tile ${color} quiz-card" data-service="${esc(item.service)}">
        <div class="strip-card-top">
          <span class="sticker">Question ${i + 1} of ${checkQuestions.length}</span>
          <div class="mascot-badge">${renderMascot(item.service)}</div>
        </div>
        <h2 class="quiz-q">${esc(item.q)}</h2>
        <div class="quiz-actions">
          <button class="btn btn-mint quiz-choice" type="button" data-answer="yes" aria-pressed="false">Yes ✓</button>
          <button class="btn btn-white quiz-choice" type="button" data-answer="no" aria-pressed="false">No / Not sure ✗</button>
        </div>
        ${svc ? `<p class="card-text">Related service: <a href="${root}services/${svc.slug}/"><strong>${esc(svc.name)}</strong></a> — ${esc(svc.short)}</p>` : ""}
      </li>`;
    })
    .join("");

  const recStickersHtml = checkQuestions
    .map((item) => {
      const svc = bySlug.get(item.service);
      if (!svc) return "";
      const theme = serviceTheme(svc.slug);
      return `<a class="tile ${theme.tile} tile-interactive rec-sticker" data-rec-service="${esc(svc.slug)}" href="${root}services/${svc.slug}/">
        <div class="strip-card-top">
          <div class="mascot-badge">${renderMascot(svc.slug)}</div>
          <span class="sticker">${esc(svc.num)}</span>
        </div>
        <h3>${esc(svc.name)}</h3>
        <p class="card-text">${esc(svc.short)}</p>
        <span class="sticker">See how it helps →</span>
      </a>`;
    })
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <div class="tile tile-sunflower">
      <div class="section-head">
        <div class="section-head-copy">
          <span class="sticker sticker-coral">Interactive · 8 quick checks</span>
          <h1>Free site check</h1>
          <p class="hero-lede">Answer eight quick yes-or-no flashcards about your current website. Everything stays right in your browser — at the end you get a score, matching service stickers for any "no" answers, and a ready-to-send email link for Elie.</p>
        </div>
        <div class="mascot-badge mascot-badge-lg">${renderMascot("seo")}</div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="quiz-heading">
  <div class="container">
    <h2 id="quiz-heading" class="sr-only">Eight website check questions</h2>

    <div id="toybox-quiz" class="quiz-stage" tabindex="-1">
      <div class="quiz-dots" role="navigation" aria-label="Question progress">
        ${dotsHtml}
      </div>

      <div class="quiz-nav-row">
        <button id="quiz-prev" class="btn btn-sm btn-white" type="button">← Previous</button>
        <p id="quiz-status" class="sticker" aria-live="polite">8-question self-check (keys: Y / N / ← / →)</p>
      </div>

      <ol class="quiz-list">
        ${cardsHtml}
      </ol>

      <div id="quiz-results" class="tile quiz-results" aria-live="polite">
        <div class="score-dial-wrap">
          <div class="score-dial" aria-hidden="true">
            <svg viewBox="0 0 140 140">
              <circle class="score-ring-bg" cx="70" cy="70" r="60" />
              <circle id="quiz-score-ring" class="score-ring-fg" cx="70" cy="70" r="60" />
            </svg>
            <div class="score-num">
              <span id="quiz-score-text">— / 8</span>
              <small>YES SCORE</small>
            </div>
          </div>

          <div class="section-head-copy">
            <span class="sticker sticker-mint">Your Toybox scorecard</span>
            <h2>Here is what stood out</h2>
            <p id="quiz-score-summary">Answer the 8 questions above, or email your website URL directly to Elie for a manual review.</p>
            <div class="hero-cta-row">
              <a id="quiz-mailto-cta" class="btn btn-coral js-confetti-cta" href="${esc(site.mailtoCheck)}">Email Elie my site check ✉</a>
              <button id="quiz-reset" class="btn btn-sm btn-white" type="button">Play again ↻</button>
            </div>
          </div>
        </div>

        <p id="quiz-rec-empty" hidden><strong>All 8 checked!</strong> Everything looks tidy on your end — still feel free to say hello anytime.</p>

        <div class="sticker-recs">
          ${recStickersHtml}
        </div>
      </div>
    </div>
  </div>
</section>
`;
}
