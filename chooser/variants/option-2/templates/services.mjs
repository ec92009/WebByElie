/**
 * Services index page (services/index.html) and the 10 service detail pages
 * (services/<slug>/index.html) with motif telemetry consoles, video bezels for core
 * services, and pricing + 4 restaurant demos on services/menus/.
 */
import {
  site,
  allServices,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { renderPage, esc } from "./layout.mjs";
import {
  renderCoreMonitors,
  renderNewModules,
  renderContactBand,
} from "./sections.mjs";

const MOTIF_META = {
  reassemble: { code: "CON_01 // LAYOUT REASSEMBLY", caption: "Preserved structure realigned into upgraded grid" },
  search: { code: "CON_02 // CRAWLER INDEX SCAN", caption: "Titles, metadata, headings, schema, and sitemap checks" },
  assistant: { code: "CON_03 // AI FACT GRAPH", caption: "Structured answers connecting services, area, and next step" },
  savings: { code: "CON_04 // SPEND AUDIT", caption: "Overlapping tools and silent renewals isolated for review" },
  care: { code: "CON_05 // SITE CARE MONITOR", caption: "Updates, backups, uptime checks, and monthly change log" },
  speed: { code: "CON_06 // VITALS & WCAG 2.2", caption: "Payload weight reduction alongside contrast and keyboard checks" },
  map: { code: "CON_07 // LOCAL MAP ALIGNMENT", caption: "Google Maps, Apple Maps, and Bing Places synced to your site" },
  move: { code: "CON_08 // STATIC EDGE TRANSFER", caption: "URL redirects and ownership carried cleanly to static hosting" },
  helpers: { code: "CON_09 // GUARDRAILED HELPER", caption: "Practical inbox and FAQ workflows with cost cap and off switch" },
  menu: { code: "CON_10 // QR PHONE MENU", caption: "Permanent QR address serving up to three languages" },
};

export function buildServicesIndexPage() {
  const pagePath = "services/";
  const root = toOptionRoot(pagePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="services-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span>Services</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>SERVICE MATRIX // 10 MODULES</p>
        <h1 class="ns-h1-sub" id="services-h1">Four core pillars, plus six new modules.</h1>
        <p class="ns-lede">
          Start with a focused refresh, search pass, AI-readability review, or cost cleanup — or add ongoing care, speed &amp; accessibility, local listings, a platform move, small AI helpers, or restaurant phone menus.
        </p>
      </div>
    </section>

    <section class="ns-section-tight" aria-labelledby="core-group-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>01 // CORE PILLARS (01-04)</p>
            <h2 class="ns-h2 ns-decode" id="core-group-heading">Core services</h2>
          </div>
        </div>
        ${renderCoreMonitors(pagePath)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="new-modules" aria-labelledby="new-group-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker ns-kicker-violet"><span class="ns-kicker-dot" aria-hidden="true"></span>02 // EXPANDED CAPABILITIES (05-10)</p>
            <h2 class="ns-h2 ns-decode" id="new-group-heading">New modules</h2>
          </div>
        </div>
        ${renderNewModules(pagePath)}
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: "Services",
    description: "Four core services and six new modules for independent business websites.",
    content,
  });
}

export function buildServiceDetailPage(service) {
  const pagePath = `services/${service.slug}/`;
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);
  const meta = MOTIF_META[service.motif] || MOTIF_META.reassemble;

  const idx = allServices.findIndex((s) => s.slug === service.slug);
  const related = [
    allServices[(idx + 1) % allServices.length],
    allServices[(idx + 2) % allServices.length],
    allServices[(idx + 3) % allServices.length],
  ];

  const videoBlock = service.video
    ? `
      <div class="ns-video-bezel ns-reveal">
        <div class="ns-monitor-chrome">
          <span>${esc(service.num)} // LIVE MOTION FEED</span>
          <span class="ns-pill ns-pill-cyan">MP4 LOOP</span>
        </div>
        <video
          muted
          loop
          playsinline
          controls
          preload="metadata"
          poster="${repo}${esc(service.poster)}"
          data-signal-video
          aria-label="${esc(service.name)} walkthrough animation"
        >
          <source src="${repo}${esc(service.video)}" type="video/mp4" />
        </video>
      </div>`
    : "";

  const pricingBlock = service.pricing
    ? `
      <section class="ns-section ns-section-bordered" aria-labelledby="menu-pricing-heading">
        <div class="ns-wrap">
          <div class="ns-section-head">
            <div class="ns-section-head-copy">
              <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>RESTAURANT PRICING</p>
              <h2 class="ns-h2 ns-decode" id="menu-pricing-heading">Simple venue pricing.</h2>
              ${service.pricingNote ? `<p class="ns-lede">${esc(service.pricingNote)}</p>` : ""}
            </div>
          </div>
          <div class="ns-price-row">
            ${service.pricing
              .map(
                (p) => `
              <article class="ns-card ns-reveal">
                <p class="ns-stat-label">${esc(p.label)}</p>
                <p class="ns-price-val">${esc(p.price)}</p>
                <p class="ns-body">${esc(p.note)}</p>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </section>`
    : "";

  const demosBlock = service.demos
    ? `
      <section class="ns-section ns-section-bordered" aria-labelledby="menu-demos-heading">
        <div class="ns-wrap">
          <div class="ns-section-head">
            <div class="ns-section-head-copy">
              <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>PUBLIC DEMOS</p>
              <h2 class="ns-h2 ns-decode" id="menu-demos-heading">Try four live restaurant menus.</h2>
            </div>
          </div>
          <div class="ns-demo-grid">
            ${service.demos
              .map(
                (d, i) => `
              <article class="ns-card ns-node ns-reveal">
                <div class="ns-node-top">
                  <span class="ns-node-id"><span class="ns-node-dot" aria-hidden="true"></span>DEMO_0${i + 1}</span>
                  <span class="ns-pill ns-pill-cyan">${esc(d.kind)}</span>
                </div>
                <h3 class="ns-h3">${esc(d.name)}</h3>
                <a class="ns-card-link" href="${repo}${esc(d.href)}" target="_blank" rel="noopener noreferrer">
                  <span>Open live demo</span>
                  <span class="ns-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </article>`
              )
              .join("")}
          </div>
        </div>
      </section>`
    : "";

  const content = `
    <section class="ns-page-hero" aria-labelledby="service-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <a href="${root}services/">Services</a>
          <span aria-hidden="true">/</span>
          <span>${esc(service.name)}</span>
        </nav>

        <div class="ns-detail-grid">
          <div>
            <p class="ns-kicker">
              <span class="ns-kicker-dot" aria-hidden="true"></span>
              <span>MODULE ${esc(service.num)} // ${service.isNew ? "NEW ACTIVITY" : "CORE PILLAR"}</span>
              ${service.isNew ? `<span class="ns-pill ns-pill-new">New</span>` : ""}
              ${service.vertical ? `<span class="ns-pill ns-pill-violet">${esc(service.vertical)}</span>` : ""}
            </p>
            <h1 class="ns-h1-sub" id="service-h1">${esc(service.name)}</h1>
            <p class="ns-lede">${esc(service.short)}</p>
            <p class="ns-body" style_forbidden_placeholder="no"></p>
            <div class="ns-about-paragraphs">
              <p class="ns-body">${esc(service.summary)}</p>
            </div>
            <div class="ns-actions">
              <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(site.mailto)}">Ask about ${esc(service.name)}</a>
              <a class="ns-btn ns-btn-ghost" href="${root}check/">Run free site check</a>
            </div>
          </div>

          <div>
            <div class="ns-console ns-reveal" data-motif-console="${esc(service.motif)}">
              <div class="ns-console-bar">
                <span>${esc(meta.code)}</span>
                <span class="ns-live-pulse">TELEMETRY</span>
              </div>
              <div class="ns-console-stage">
                <canvas
                  class="ns-motif-canvas"
                  data-motif="${esc(service.motif)}"
                  role="img"
                  aria-label="${esc(service.name)} telemetry visualization: ${esc(meta.caption)}"
                ></canvas>
              </div>
              <div class="ns-console-caption">
                <span>${esc(meta.caption)}</span>
                <span>ILLUSTRATIVE VISUAL</span>
              </div>
            </div>
            ${videoBlock}
          </div>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="scope-heading">
      <div class="ns-wrap">
        <div class="ns-grid-2">
          <article class="ns-card ns-reveal">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>WHAT WE WORK THROUGH</p>
            <h2 class="ns-h2 ns-decode" id="scope-heading">Practical scope</h2>
            <ul class="ns-bullet-list">
              ${service.bullets.map((b) => `<li><span>${esc(b)}</span></li>`).join("")}
            </ul>
          </article>

          <article class="ns-card ns-reveal">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>DELIVERABLES</p>
            <h2 class="ns-h2 ns-decode">What you leave with</h2>
            <ul class="ns-bullet-list">
              ${service.deliverables.map((d) => `<li><span>${esc(d)}</span></li>`).join("")}
            </ul>
            <div class="ns-hero-meta">
              ${
                service.pricing
                  ? `<span>PRICING <strong>${esc(service.pricing[0].price)} launch / ${esc(service.pricing[1].price)}</strong></span>`
                  : `<span>RATE <strong>${esc(site.rate)}</strong></span><span>START <strong>${esc(site.bundle)}</strong></span>`
              }
            </div>
          </article>
        </div>
      </div>
    </section>

    ${pricingBlock}
    ${demosBlock}

    <section class="ns-section ns-section-bordered" aria-labelledby="related-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>ADJACENT MODULES</p>
            <h2 class="ns-h2 ns-decode" id="related-heading">Related services</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}services/">All 10 services &rarr;</a>
        </div>
        <div class="ns-grid-3">
          ${related
            .map(
              (rel) => `
            <article class="ns-card ns-node ns-reveal">
              <div class="ns-node-top">
                <span class="ns-node-id"><span class="ns-node-dot" aria-hidden="true"></span>MOD_${esc(rel.num)}</span>
                ${rel.isNew ? `<span class="ns-pill ns-pill-new">New</span>` : `<span class="ns-pill ns-pill-cyan">Core</span>`}
              </div>
              <h3 class="ns-h3">${esc(rel.name)}</h3>
              <p class="ns-body">${esc(rel.short)}</p>
              <a class="ns-card-link" href="${root}services/${esc(rel.slug)}/">
                <span>Inspect ${esc(rel.name)}</span>
                <span class="ns-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </article>`
            )
            .join("")}
        </div>
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: service.name,
    description: service.short,
    content: content.replace('<p class="ns-body" style_forbidden_placeholder="no"></p>', ""),
    extraScripts: ["motif-console.js"],
  });
}
