/**
 * Reusable Night Signal section templates (Core Monitors, New Modules Node-Grid,
 * Process Pipeline, 3D Work Cards, Savings, Budget, FAQ Accordion, Contact Band).
 */
import {
  site,
  coreServices,
  newServices,
  process as processSteps,
  budget,
  savingsSpots,
  work,
  faq,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { esc } from "./layout.mjs";

export function renderCoreMonitors(pagePath) {
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const cards = coreServices
    .map(
      (s) => `
      <article class="ns-monitor ns-reveal">
        <div class="ns-monitor-inner">
          <div class="ns-monitor-chrome">
            <span>${esc(s.num)} // CORE SERVICE</span>
            <span class="ns-pill ns-pill-cyan">SIGNAL FEED</span>
          </div>
          <div class="ns-monitor-screen">
            <video
              class="ns-monitor-video"
              muted
              loop
              playsinline
              preload="none"
              poster="${repo}${esc(s.poster)}"
              data-signal-video
              aria-label="${esc(s.name)} visual preview"
            >
              <source src="${repo}${esc(s.video)}" type="video/mp4" />
            </video>
            <div class="ns-monitor-scanline" aria-hidden="true"></div>
          </div>
          <div class="ns-monitor-body">
            <div class="ns-monitor-title-row">
              <h3 class="ns-h3">${esc(s.name)}</h3>
              <span class="ns-monitor-num">[${esc(s.num)}]</span>
            </div>
            <p class="ns-body">${esc(s.short)}</p>
            <div class="ns-chip-row">
              ${s.deliverables.map((d) => `<span class="ns-chip">${esc(d)}</span>`).join("")}
            </div>
            <a class="ns-card-link" href="${root}services/${esc(s.slug)}/">
              <span>Inspect ${esc(s.name)}</span>
              <span class="ns-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </article>`
    )
    .join("");

  return `<div class="ns-monitor-grid">${cards}</div>`;
}

export function renderNewModules(pagePath) {
  const root = toOptionRoot(pagePath);

  const nodes = newServices
    .map(
      (s) => `
      <article class="ns-card ns-node ns-reveal">
        <div class="ns-node-top">
          <span class="ns-node-id">
            <span class="ns-node-dot" aria-hidden="true"></span>
            <span>MOD_${esc(s.num)}</span>
          </span>
          <span class="ns-node-badges">
            ${s.vertical ? `<span class="ns-pill ns-pill-violet">${esc(s.vertical)}</span>` : ""}
            <span class="ns-pill ns-pill-new">New</span>
          </span>
        </div>
        <h3 class="ns-h3">${esc(s.name)}</h3>
        <p class="ns-body">${esc(s.short)}</p>
        <div class="ns-chip-row">
          ${s.deliverables.slice(0, 2).map((d) => `<span class="ns-chip">${esc(d)}</span>`).join("")}
        </div>
        <a class="ns-card-link" href="${root}services/${esc(s.slug)}/">
          <span>Open module</span>
          <span class="ns-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </article>`
    )
    .join("");

  return `
    <div class="ns-nodes-stage">
      <svg class="ns-nodes-traces" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ns-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#5ee7ff" stop-opacity="0" />
            <stop offset="50%" stop-color="#5ee7ff" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#c6ff3d" stop-opacity="0.95" />
          </linearGradient>
        </defs>
        <path class="ns-trace-base" d="M 180 125 L 600 125 L 1020 125" />
        <path class="ns-trace-base" d="M 180 395 L 600 395 L 1020 395" />
        <path class="ns-trace-base" d="M 600 125 L 600 395" />
        <path class="ns-trace-pulse" d="M 180 125 L 600 125 L 1020 125" />
        <path class="ns-trace-pulse ns-trace-pulse-alt" d="M 180 395 L 600 395 L 1020 395" />
      </svg>
      <div class="ns-nodes-grid">${nodes}</div>
    </div>`;
}

export function renderProcessPipeline() {
  const stepsHtml = processSteps
    .map(
      (step) => `
      <li class="ns-pipe-step ns-reveal">
        <div class="ns-pipe-node" aria-hidden="true">${esc(step.num)}</div>
        <div class="ns-card ns-pipe-card">
          <h3 class="ns-h3">${esc(step.title)}</h3>
          <p class="ns-body">${esc(step.text)}</p>
        </div>
      </li>`
    )
    .join("");

  return `<ol class="ns-pipeline">${stepsHtml}</ol>`;
}

export function renderWorkGrid(pagePath) {
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const cards = work
    .map(
      (w) => `
      <article class="ns-work-card ns-reveal">
        <div class="ns-work-media">
          <img src="${repo}${esc(w.image)}" alt="${esc(w.name)} website screenshot" loading="lazy" />
          <div class="ns-work-glare" aria-hidden="true"></div>
        </div>
        <div class="ns-work-body">
          <p class="ns-work-role">${esc(w.role)}</p>
          <h3 class="ns-h3">${esc(w.name)}</h3>
          <p class="ns-body">${esc(w.text)}</p>
          <p class="ns-work-detail">${esc(w.detail)}</p>
          <div class="ns-work-links">
            ${
              w.caseStudy
                ? `<a class="ns-link-accent" href="${root}work/golden-years/">Read case study &rarr;</a>`
                : ""
            }
            <a href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">Visit live site</a>
          </div>
        </div>
      </article>`
    )
    .join("");

  return `<div class="ns-work-grid">${cards}</div>`;
}

export function renderSavingsGrid() {
  return `
    <div class="ns-grid-4">
      ${savingsSpots
        .map(
          (item, i) => `
        <article class="ns-card ns-reveal">
          <p class="ns-stat-label">0${i + 1} // ${esc(item.label)}</p>
          <p class="ns-body">${esc(item.text)}</p>
        </article>`
        )
        .join("")}
    </div>`;
}

export function renderBudgetGrid() {
  return `
    <div class="ns-grid-3">
      ${budget
        .map(
          (b, i) => `
        <article class="ns-card ns-reveal">
          <p class="ns-stat-label">0${i + 1} // ${esc(b.label)}</p>
          <p class="ns-body">${esc(b.text)}</p>
        </article>`
        )
        .join("")}
    </div>`;
}

export function renderFaqAccordion() {
  return `
    <div class="ns-faq-list">
      ${faq
        .map(
          (item, i) => `
        <div class="ns-faq-item ns-reveal" data-open="true">
          <h3>
            <button
              class="ns-faq-btn"
              type="button"
              aria-expanded="true"
              aria-controls="faq-panel-${i}"
              id="faq-btn-${i}"
            >
              <span>${esc(item.q)}</span>
              <span class="ns-faq-icon" aria-hidden="true">+</span>
            </button>
          </h3>
          <div class="ns-faq-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}">
            <div class="ns-faq-panel-inner">
              <p>${esc(item.a)}</p>
            </div>
          </div>
        </div>`
        )
        .join("")}
    </div>`;
}

export function renderContactBand(pagePath) {
  const root = toOptionRoot(pagePath);
  return `
    <section class="ns-section ns-section-bordered" aria-labelledby="contact-heading">
      <div class="ns-wrap">
        <div class="ns-cta-band ns-reveal">
          <div class="ns-cta-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>DIRECT CHANNEL // START SMALL</p>
            <h2 class="ns-h2 ns-decode" id="contact-heading">Send your URL for a practical look.</h2>
            <p class="ns-lede">
              ${esc(site.audience)} Standard rate: ${esc(site.rate)} (${esc(site.bundle)}).
            </p>
          </div>
          <div class="ns-actions">
            <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(site.mailto)}">Email ${esc(site.email)}</a>
            <a class="ns-btn ns-btn-ghost" href="${root}check/">Run free site check</a>
          </div>
        </div>
      </div>
    </section>`;
}
