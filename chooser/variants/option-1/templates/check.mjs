/**
 * Free site check page — printed editorial diagnostic questionnaire ("Form 08")
 * with ink-stamping Yes/No boxes, animated score tally, and tailored Prescription Slip.
 * Fully keyboard-accessible and degrades cleanly without JS.
 */
import {
  site,
  allServices,
  checkQuestions,
  toOptionRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  inkUnderline,
  folioBar,
} from "./utils.mjs";

export function renderCheckPage() {
  const pagePath = "check/";
  const root = toOptionRoot(pagePath);

  const serviceBySlug = new Map(allServices.map((s) => [s.slug, s]));

  const questionsHtml = checkQuestions
    .map((item, idx) => {
      const svc = serviceBySlug.get(item.service);
      const svcName = svc ? svc.name : item.service;
      const svcNum = svc ? svc.num : "";
      const numStr = String(idx + 1).padStart(2, "0");

      return `<li class="check-row" data-check-item data-index="${idx}" data-service-slug="${esc(item.service)}" data-service-name="${esc(svcName)}" data-service-num="${esc(svcNum)}">
        <span class="check-qnum">${numStr}</span>
        <div>
          <p class="check-qtext" id="check-q-${idx}">${esc(item.q)}</p>
          <span class="check-qservice">Addresses: <a href="${root}services/${esc(item.service)}/">${esc(svcNum)} &middot; ${esc(svcName)}</a></span>
        </div>
        <div class="check-controls" role="group" aria-labelledby="check-q-${idx}">
          <button class="stamp-btn stamp-yes" type="button" data-answer="yes" aria-pressed="false">Yes</button>
          <button class="stamp-btn stamp-no" type="button" data-answer="no" aria-pressed="false">No</button>
        </div>
      </li>`;
    })
    .join("\n");

  // Default fallback list (shown cleanly when JS is disabled, updated live when JS runs)
  const fallbackRxHtml = checkQuestions
    .map((item) => {
      const svc = serviceBySlug.get(item.service);
      if (!svc) return "";
      return `<li class="rx-item" data-fallback-item>
        <a href="${root}services/${esc(svc.slug)}/">${esc(svc.num)} &middot; ${esc(svc.name)}</a>
        <span class="kicker">If &ldquo;No&rdquo;</span>
      </li>`;
    })
    .join("\n");

  return `
    <section class="page-head" aria-labelledby="check-page-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Free site check</span>
        </nav>
        <div class="page-head-grid">
          <div>
            <span class="kicker kicker-vermilion">Form 08 &middot; Self-assessment broadsheet</span>
            <h1 class="page-title" id="check-page-title" data-reveal>
              ${revealWords("Eight honest checks for")} ${inkUnderline("your website.")}
            </h1>
          </div>
          <div data-reveal>
            <p class="lede">Stamp Yes or No on each line. Everything stays in your browser &mdash; every &ldquo;No&rdquo; prints the matching service onto your Prescription Slip.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Diagnostic questionnaire">
      <div class="wrap">
        ${folioBar("Diagnostic", "Stamp each question", "8 items · Client-side only")}

        <div class="check-layout" data-check-app data-mailto-base="${esc(site.mailtoCheck)}" data-option-root="${esc(root)}">
          <div class="check-form-sheet" data-reveal>
            <ol class="check-list">
              ${questionsHtml}
            </ol>
          </div>

          <aside class="rx-slip" aria-label="Prescription Slip" aria-live="polite" data-reveal>
            <div class="rx-head">
              <div>
                <span class="kicker kicker-vermilion">Prescription Slip</span>
                <h2 class="ledger-title rx-slip-title">Recommended next pass</h2>
              </div>
              <span class="rx-symbol" aria-hidden="true">&#8478;</span>
            </div>

            <div class="rx-score-row">
              <div>
                <div class="rx-score-num" data-rx-score>0 / 8</div>
                <span class="kicker" data-rx-answered>0 of 8 stamped</span>
              </div>
              <span class="tag-pill tag-sage" data-rx-verdict>Awaiting stamps</span>
            </div>

            <div class="rx-meter" aria-hidden="true">
              <div class="rx-meter-fill" data-rx-meter></div>
            </div>

            <p class="rx-status" data-rx-status>
              Stamp Yes or No on the left to calculate your score and tailor this list. Each &ldquo;No&rdquo; adds the matching Web By Elie service below.
            </p>

            <ul class="rx-list" data-rx-list>
              ${fallbackRxHtml}
            </ul>

            <div class="rx-actions">
              <a class="btn btn-vermilion" href="${esc(site.mailtoCheck)}" data-rx-mailto>
                Send my free site check <span class="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <button class="rx-reset" type="button" data-rx-reset hidden>Clear stamps &amp; start over</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}
