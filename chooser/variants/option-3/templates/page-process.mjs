import {
  process as processSteps,
  budget,
  savingsSpots,
  faq,
  site,
  toOptionRoot,
} from "../../../content.mjs";
import { esc, waveDivider, contactBanner } from "./utils.mjs";
import { renderCoinJar } from "./scenes.mjs";

export function renderProcessPage() {
  const root = toOptionRoot("process/");
  const stepColors = ["tile-sunflower", "tile-lilac", "tile-mint", "tile-coral"];
  const budgetColors = ["tile-sunflower", "tile-mint", "tile-lilac"];

  const stepsHtml = processSteps
    .map(
      (p, i) => `<article class="tile ${stepColors[i % stepColors.length]} reveal reveal-d${i + 1}">
        <span class="sticker">Step ${esc(p.num)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`
    )
    .join("");

  const budgetHtml = budget
    .map(
      (b, i) => `<article class="tile ${budgetColors[i % budgetColors.length]} reveal reveal-d${i + 1}">
        <span class="sticker">${esc(b.label)}</span>
        <p>${esc(b.text)}</p>
      </article>`
    )
    .join("");

  const savingsHtml = savingsSpots
    .map(
      (s, i) => `<article class="tile reveal reveal-d${(i % 2) + 1}">
        <span class="sticker sticker-coral">${esc(s.label)}</span>
        <p>${esc(s.text)}</p>
      </article>`
    )
    .join("");

  const faqHtml = faq
    .map(
      (item, idx) => `<details class="faq-item reveal"${idx === 0 ? " open" : ""}>
        <summary>
          <span>${esc(item.q)}</span>
          <span class="faq-plus" aria-hidden="true">+</span>
        </summary>
        <div class="faq-body">
          <p>${esc(item.a)}</p>
        </div>
      </details>`
    )
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <div class="tile tile-mint">
      <div class="section-head">
        <div class="section-head-copy">
          <span class="sticker sticker-sunflower">Process &amp; budget</span>
          <h1>Practical steps, no surprises</h1>
          <p class="hero-lede">Start by preserving what already works, compare real clickable design directions, and track every hour clearly at ${esc(site.rate)} (${esc(site.bundle)}).</p>
        </div>
        <div class="hero-cta-row">
          <a class="btn btn-coral js-confetti-cta" href="${esc(site.mailto)}">Email Elie ✉</a>
          <a class="btn btn-white" href="${root}check/">Take the Free Site Check →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="steps-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-lilac">Step by step</span>
        <h2 id="steps-heading">How a website refresh unfolds</h2>
      </div>
    </div>
    <div class="bento-4">
      ${stepsHtml}
    </div>
  </div>
</section>

${waveDivider("#ffc93c")}

<section class="section" aria-labelledby="budget-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-sunflower">Budget transparency</span>
        <h2 id="budget-heading">${esc(site.rate)} · ${esc(site.bundle)}</h2>
        <p class="section-sub">Straightforward hourly accounting with a manual check-in halfway through.</p>
      </div>
    </div>
    <div class="bento-3">
      ${budgetHtml}
    </div>
  </div>
</section>

${waveDivider("#ff6b5b")}

<section class="section" aria-labelledby="savings-spots-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-coral">Cost cleanup spots</span>
        <h2 id="savings-spots-heading">Four places avoidable web bills hide</h2>
      </div>
    </div>
    <div class="savings-bento">
      <div class="tile tile-sunflower coin-jar-tile">
        <span class="sticker">Savings Cat Jar</span>
        ${renderCoinJar()}
        <p>Every item goes onto a keep / change / cancel list that you approve line by line.</p>
      </div>
      <div class="bento-2">
        ${savingsHtml}
      </div>
    </div>
  </div>
</section>

${waveDivider("#c4b5ff")}

<section class="section" aria-labelledby="process-faq-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-lilac">FAQ</span>
        <h2 id="process-faq-heading">Questions people ask before starting</h2>
      </div>
    </div>
    <div class="faq-list">
      ${faqHtml}
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}
