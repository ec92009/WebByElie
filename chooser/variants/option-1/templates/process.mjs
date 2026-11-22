/**
 * Process & budget page — 4 steps, transparent budget ledger, savings spots, and FAQ.
 */
import {
  site,
  process as processSteps,
  budget,
  savingsSpots,
  faq,
  toOptionRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  inkUnderline,
  folioBar,
  contactBroadsheet,
} from "./utils.mjs";

export function renderProcessPage() {
  const pagePath = "process/";
  const root = toOptionRoot(pagePath);

  const stepsHtml = processSteps
    .map(
      (step) => `<article class="process-card" data-reveal>
        <span class="process-card-num">${esc(step.num)}</span>
        <div>
          <h3>${esc(step.title)}</h3>
          <p>${esc(step.text)}</p>
        </div>
      </article>`
    )
    .join("\n");

  const budgetHtml = budget
    .map(
      (row) => `<li class="ledger-item">
        <span class="ledger-label">${esc(row.label)}</span>
        <p class="ledger-text">${esc(row.text)}</p>
      </li>`
    )
    .join("");

  const savingsHtml = savingsSpots
    .map(
      (spot) => `<li class="ledger-item">
        <span class="ledger-label">${esc(spot.label)}</span>
        <p class="ledger-text">${esc(spot.text)}</p>
      </li>`
    )
    .join("");

  const faqHtml = faq
    .map(
      (item, idx) => `<details class="faq-item"${idx === 0 ? " open" : ""}>
        <summary>
          <span>${esc(item.q)}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </summary>
        <p class="faq-answer">${esc(item.a)}</p>
      </details>`
    )
    .join("\n");

  return `
    <section class="page-head" aria-labelledby="process-page-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Process &amp; budget</span>
        </nav>
        <div class="page-head-grid">
          <h1 class="page-title" id="process-page-title" data-reveal>
            ${revealWords("How we work, and")} ${inkUnderline("what it costs.")}
          </h1>
          <div data-reveal>
            <p class="lede">Start by preserving what works, compare real design directions side by side, and track every hour openly at ${esc(site.rate)}.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="steps-heading">
      <div class="wrap">
        ${folioBar("§ 01", "Four stages", "Intake to launch")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="steps-heading">A calm four-step <em>editorial pass.</em></h2>
          <p class="lede">No endless slide decks. You look at live clickable options, combine what you like, and sign off on a clean launch checklist.</p>
        </div>
        <div class="process-track">
          ${stepsHtml}
        </div>
      </div>
    </section>

    <section class="section section-tinted" aria-labelledby="ledger-heading">
      <div class="wrap">
        ${folioBar("§ 02", "Budget & savings", `${site.rate} · ${site.bundle}`)}
        <h2 class="section-heading work-index-subhead" id="ledger-heading" data-reveal>Clear accounting, <em>quiet savings.</em></h2>

        <div class="ledger-grid ledger-grid-flush">
          <div class="ledger-panel" data-reveal>
            <span class="kicker kicker-sage">Simple accounting</span>
            <h3 class="ledger-title">How budget is handled</h3>
            <div class="budget-metrics">
              <div>
                <div class="budget-metric-val" data-count="100" data-prefix="$">$100</div>
                <div class="budget-metric-label">Hourly rate</div>
              </div>
              <div>
                <div class="budget-metric-val" data-count="10" data-suffix="h">10h</div>
                <div class="budget-metric-label">Starting bundle</div>
              </div>
              <div>
                <div class="budget-metric-val" data-count="50" data-suffix="%">50%</div>
                <div class="budget-metric-label">Manual check-in</div>
              </div>
            </div>
            <ul class="ledger-list">${budgetHtml}</ul>
          </div>

          <div class="ledger-panel" data-reveal>
            <span class="kicker kicker-vermilion">Cost cleanup ledger</span>
            <h3 class="ledger-title">Four places bills hide</h3>
            <ul class="ledger-list">${savingsHtml}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="process-faq-heading">
      <div class="wrap">
        ${folioBar("§ 03", "Frequently asked", "Six honest answers")}
        <div class="faq-layout">
          <div data-reveal>
            <h2 class="section-heading" id="process-faq-heading">Before you <em>write in.</em></h2>
            <p class="lede">Plain answers on first-pass scope, AI-readability reviews, and why honest web work avoids ranking guarantees.</p>
          </div>
          <div class="faq-list" data-reveal>
            ${faqHtml}
          </div>
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}
