/**
 * Free site check page (check/index.html) — Diagnostic 'Signal Scan'
 */
import {
  site,
  allServices,
  checkQuestions,
  toOptionRoot,
} from "../../../content.mjs";
import { renderPage, esc } from "./layout.mjs";

export function buildCheckPage() {
  const pagePath = "check/";
  const root = toOptionRoot(pagePath);

  const serviceBySlug = new Map(allServices.map((s) => [s.slug, s]));

  const questionsHtml = checkQuestions
    .map(
      (item, idx) => `
      <fieldset class="ns-check-item" data-service="${esc(item.service)}">
        <legend class="sr-only">Check ${idx + 1}: ${esc(item.q)}</legend>
        <div class="ns-check-row">
          <div class="ns-check-q">
            <span class="ns-check-num">0${idx + 1}</span>
            <span>${esc(item.q)}</span>
          </div>
          <div class="ns-toggle-group" role="group" aria-label="Check ${idx + 1} answer">
            <label class="ns-radio-pill">
              <input type="radio" name="check-q-${idx}" value="yes" />
              <span>YES</span>
            </label>
            <label class="ns-radio-pill">
              <input type="radio" name="check-q-${idx}" value="no" />
              <span>NO</span>
            </label>
          </div>
        </div>
      </fieldset>`
    )
    .join("");

  const fixCardsHtml = checkQuestions
    .map((item, idx) => {
      const svc = serviceBySlug.get(item.service);
      if (!svc) return "";
      return `
        <article class="ns-card ns-node ns-fix-card" data-fix-service="${esc(svc.slug)}">
          <div class="ns-node-top">
            <span class="ns-node-id">
              <span class="ns-node-dot" aria-hidden="true"></span>
              <span>CHK_0${idx + 1} &rarr; MOD_${esc(svc.num)}</span>
            </span>
            <span class="ns-node-badges">
              <span class="ns-pill ns-pill-new ns-fix-badge">Recommended fix</span>
              ${svc.isNew ? `<span class="ns-pill ns-pill-violet">New</span>` : ""}
            </span>
          </div>
          <h3 class="ns-h3">${esc(svc.name)}</h3>
          <p class="ns-body">${esc(svc.short)}</p>
          <a class="ns-card-link" href="${root}services/${esc(svc.slug)}/">
            <span>Inspect ${esc(svc.name)}</span>
            <span class="ns-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </article>`;
    })
    .join("");

  const content = `
    <section class="ns-page-hero" aria-labelledby="check-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span>Free site check</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>DIAGNOSTIC // SIGNAL SCAN</p>
        <h1 class="ns-h1-sub" id="check-h1">Eight quick checks on your current site.</h1>
        <p class="ns-lede">
          Answer Yes or No below. Everything runs locally in your browser — nothing is uploaded. Every &ldquo;No&rdquo; lights up the matching service module below, or email your URL for a free look.
        </p>
      </div>
    </section>

    <section class="ns-section-tight" aria-label="Interactive site check">
      <div class="ns-wrap">
        <div class="ns-check-layout">
          <form class="ns-check-list" data-signal-check>
            ${questionsHtml}
          </form>

          <aside class="ns-card ns-gauge-panel" aria-live="polite">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>SIGNAL READOUT</p>
            <div class="ns-gauge-wrap">
              <svg class="ns-gauge-svg" viewBox="0 0 200 200" aria-hidden="true">
                <circle class="ns-gauge-track" cx="100" cy="100" r="80" />
                <circle class="ns-gauge-arc" cx="100" cy="100" r="80" data-gauge-arc />
              </svg>
              <div class="ns-gauge-center">
                <span class="ns-gauge-score" data-gauge-score>--/8</span>
                <span class="ns-gauge-sub" data-gauge-sub>AWAITING INPUT</span>
              </div>
            </div>
            <p class="ns-gauge-status" data-gauge-status>
              Toggle Yes or No on each check to illuminate matching fixes.
            </p>
            <div class="ns-actions">
              <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(site.mailtoCheck)}" data-check-mailto>
                Email my URL for a free check
              </a>
              <button class="ns-btn ns-btn-ghost ns-btn-sm" type="button" data-check-reset>
                Reset scan
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="fixes-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>MODULE MAPPING</p>
            <h2 class="ns-h2 ns-decode" id="fixes-heading">Recommended fixes by check.</h2>
            <p class="ns-lede" data-fix-summary>All 8 linked service modules</p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}services/">All 10 services &rarr;</a>
        </div>
        <div class="ns-grid-4">
          ${fixCardsHtml}
        </div>
      </div>
    </section>
  `;

  return renderPage({
    pagePath,
    title: "Free site check",
    description: "Eight practical Yes/No checks on clarity, SEO, AI-readiness, cost, speed, and ownership.",
    content,
    extraScripts: ["check-scan.js"],
  });
}
