/**
 * Process & budget page (process/index.html)
 */
import { site, toOptionRoot } from "../../../content.mjs";
import { renderPage, esc } from "./layout.mjs";
import {
  renderProcessPipeline,
  renderBudgetGrid,
  renderSavingsGrid,
  renderFaqAccordion,
  renderContactBand,
} from "./sections.mjs";

export function buildProcessPage() {
  const pagePath = "process/";
  const root = toOptionRoot(pagePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="process-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span>Process &amp; budget</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>METHOD &amp; ACCOUNTING</p>
        <h1 class="ns-h1-sub" id="process-h1">How we work, track hours, and trim waste.</h1>
        <p class="ns-lede">
          Standard rate: ${esc(site.rate)}, starting with a practical ${esc(site.bundle)}. Keep what already works, compare real clickable directions, and approve every step before launch.
        </p>
      </div>
    </section>

    <section class="ns-section-tight" aria-labelledby="steps-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>01 // FOUR-STEP PIPELINE</p>
            <h2 class="ns-h2 ns-decode" id="steps-heading">From review to sign-off.</h2>
          </div>
        </div>
        ${renderProcessPipeline()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="budget-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>02 // BUDGET STRUCTURE</p>
            <h2 class="ns-h2 ns-decode" id="budget-page-heading">Transparent hours and check-ins.</h2>
          </div>
        </div>
        ${renderBudgetGrid()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="savings-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>03 // SAVINGS SPOTS</p>
            <h2 class="ns-h2 ns-decode" id="savings-page-heading">Where avoidable web bills usually sit.</h2>
          </div>
        </div>
        ${renderSavingsGrid()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="faq-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>04 // FAQ</p>
            <h2 class="ns-h2 ns-decode" id="faq-page-heading">Common questions before starting.</h2>
          </div>
        </div>
        ${renderFaqAccordion()}
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: "Process & budget",
    description: "Four-step website refresh process, $100/hour tracking, savings audit spots, and FAQ.",
    content,
  });
}
