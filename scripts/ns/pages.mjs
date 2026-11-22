/**
 * Production Night Signal page builders (EN / FR / ES) for Web By Elie.
 * Generates:
 * - Localized homepages: index.html, fr/index.html, es/index.html
 * - Localized services index + 10 service detail pages (4 core + 6 new modules)
 * - Localized work index: work/, fr/work/, es/work/
 * - Canonical Golden Years case study: case-studies/golden-years/index.html
 * - Localized process & budget: process/, fr/process/, es/process/
 * - Localized interactive free site check: check/, fr/check/, es/check/
 * - Policy pages: privacy, terms, data-deletion (.html + /index.html)
 */
import { CONTENT, ORIGIN, POLICIES, shared } from "./content.mjs";
import { esc, localeHref, localePrefix, relToRoot, renderPage } from "./layout.mjs";

function renderCoreMonitors(locale, root, isHome) {
  const c = CONTENT[locale];
  const cards = c.coreServices
    .map((s) => {
      const media = shared.coreVideos[s.slug];
      const ctaAttr = isHome && s.ctaId ? ` data-wst-cta="${esc(s.ctaId)}"` : "";
      return `
      <article class="ns-monitor ns-reveal">
        <div class="ns-monitor-inner">
          <div class="ns-monitor-chrome">
            <span>${esc(s.num)} // ${esc(c.ui.coreTag)}</span>
            <span class="ns-pill ns-pill-cyan">${esc(c.ui.signalFeed)}</span>
          </div>
          <div class="ns-monitor-screen">
            <video
              class="ns-monitor-video"
              muted
              loop
              playsinline
              preload="none"
              poster="${root}${esc(media.poster)}"
              data-signal-video
              aria-label="${esc(s.name)}"
            >
              <source src="${root}${esc(media.video)}" type="video/mp4" />
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
            <a class="ns-card-link" href="${localeHref(root, locale, `services/${s.slug}/`)}"${ctaAttr}>
              <span>${esc(c.ui.inspectPrefix)} ${esc(s.name)}</span>
              <span class="ns-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </article>`;
    })
    .join("");

  return `<div class="ns-monitor-grid">${cards}</div>`;
}

function renderNewModules(locale, root) {
  const c = CONTENT[locale];
  const nodes = c.newServices
    .map(
      (s) => `
      <article class="ns-card ns-node ns-reveal">
        <div class="ns-node-top">
          <span class="ns-node-id">
            <span class="ns-node-dot" aria-hidden="true"></span>
            <span>MOD_${esc(s.num)}</span>
          </span>
          <span class="ns-node-badges">
            <span class="ns-pill ns-pill-new">${esc(c.ui.newBadge)}</span>
          </span>
        </div>
        <h3 class="ns-h3">${esc(s.name)}</h3>
        <p class="ns-body">${esc(s.short)}</p>
        <div class="ns-chip-row">
          ${s.deliverables.slice(0, 2).map((d) => `<span class="ns-chip">${esc(d)}</span>`).join("")}
        </div>
        <a class="ns-card-link" href="${localeHref(root, locale, `services/${s.slug}/`)}">
          <span>${esc(c.ui.openModule)}</span>
          <span class="ns-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </article>`,
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

function renderProcessPipeline(locale) {
  const c = CONTENT[locale];
  const stepsHtml = c.process
    .map(
      (step) => `
      <li class="ns-pipe-step ns-reveal">
        <div class="ns-pipe-node" aria-hidden="true">${esc(step.num)}</div>
        <div class="ns-card ns-pipe-card">
          <h3 class="ns-h3">${esc(step.title)}</h3>
          <p class="ns-body">${esc(step.text)}</p>
        </div>
      </li>`,
    )
    .join("");

  return `<ol class="ns-pipeline">${stepsHtml}</ol>`;
}

function renderWorkGrid(locale, root, isHome) {
  const c = CONTENT[locale];
  const cards = c.work
    .map((w) => {
      const meta = shared.workMeta[w.slug];
      const liveCtaAttr = isHome && meta.ctaId ? ` data-wst-cta="${esc(meta.ctaId)}"` : "";
      const caseCtaAttr = isHome ? ' data-wst-cta="portfolio_golden_case_study"' : "";
      return `
      <article class="ns-work-card ns-reveal">
        <div class="ns-work-media">
          <img src="${root}${esc(meta.image)}" alt="${esc(w.name)}" loading="lazy" />
          <div class="ns-work-glare" aria-hidden="true"></div>
        </div>
        <div class="ns-work-body">
          <p class="ns-work-role">${esc(w.role)}</p>
          <h3 class="ns-h3">${esc(w.name)}</h3>
          <p class="ns-body">${esc(w.text)}</p>
          <p class="ns-work-detail">${esc(w.detail)}</p>
          <div class="ns-work-links">
            ${
              meta.caseStudy
                ? `<a class="ns-link-accent" href="${root}case-studies/golden-years/"${caseCtaAttr}>${esc(c.ui.readCaseStudy)} &rarr;</a>`
                : ""
            }
            <a href="${esc(meta.url)}" target="_blank" rel="noopener noreferrer"${liveCtaAttr}>${esc(c.ui.visitLiveSite)}</a>
          </div>
        </div>
      </article>`;
    })
    .join("");

  return `<div class="ns-work-grid">${cards}</div>`;
}

function renderSavingsGrid(locale) {
  const c = CONTENT[locale];
  return `
    <div class="ns-grid-4">
      ${c.savingsSpots
        .map(
          (item, i) => `
        <article class="ns-card ns-reveal">
          <p class="ns-stat-label">0${i + 1} // ${esc(item.label)}</p>
          <p class="ns-body">${esc(item.text)}</p>
        </article>`,
        )
        .join("")}
    </div>`;
}

function renderBudgetGrid(locale) {
  const c = CONTENT[locale];
  return `
    <div class="ns-grid-3">
      ${c.budget
        .map(
          (b, i) => `
        <article class="ns-card ns-reveal">
          <p class="ns-stat-label">0${i + 1} // ${esc(b.label)}</p>
          <p class="ns-body">${esc(b.text)}</p>
        </article>`,
        )
        .join("")}
    </div>`;
}

function renderFaqAccordion(locale) {
  const c = CONTENT[locale];
  return `
    <div class="ns-faq-list">
      ${c.faq
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
        </div>`,
        )
        .join("")}
    </div>`;
}

function renderContactBand(locale, root, isHome) {
  const c = CONTENT[locale];
  const ctaAttr = isHome ? ' data-wst-cta="contact_section"' : "";
  return `
    <section class="ns-section ns-section-bordered" id="contact" aria-labelledby="contact-heading">
      <div class="ns-wrap">
        <div class="ns-cta-band ns-reveal">
          <div class="ns-cta-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.contactKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="contact-heading">${esc(c.ui.contactHeading)}</h2>
            <p class="ns-lede">
              ${esc(c.site.audience)} ${esc(c.site.rate)} (${esc(c.site.bundle)}).
            </p>
          </div>
          <div class="ns-actions">
            <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(c.site.mailto)}"${ctaAttr}>${esc(c.ui.contactEmailPrefix)} ${esc(shared.email)}</a>
            <a class="ns-btn ns-btn-ghost" href="${localeHref(root, locale, "check/")}">${esc(c.ui.runFreeCheck)}</a>
          </div>
        </div>
      </div>
    </section>`;
}

export function buildHomePage(locale, version) {
  const c = CONTENT[locale];
  const filePath = `${localePrefix(locale)}index.html`;
  const root = relToRoot(filePath);

  const content = `
    <section class="ns-hero" aria-labelledby="hero-heading">
      <canvas class="ns-hero-canvas" id="ns-hero-canvas" aria-hidden="true"></canvas>
      <div class="ns-hero-scrim" aria-hidden="true"></div>
      <div class="ns-wrap ns-hero-grid">
        <div>
          <p class="ns-kicker">
            <span class="ns-kicker-dot" aria-hidden="true"></span>
            <span>${esc(c.ui.heroKicker)}</span>
          </p>
          <h1 class="ns-h1" id="hero-heading">${esc(c.site.tagline)}</h1>
          <p class="ns-lede">${esc(c.site.lede)}</p>
          <div class="ns-actions">
            <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(c.site.mailto)}" data-wst-cta="contact_primary">${esc(c.nav.emailCta)}</a>
            <a class="ns-btn ns-btn-ghost" href="${localeHref(root, locale, "check/")}">${esc(c.ui.runFreeCheck)}</a>
            <a class="ns-btn ns-btn-ghost" href="${localeHref(root, locale, "services/")}" data-wst-cta="services_overview">${esc(c.ui.exploreServices)}</a>
          </div>
          <div class="ns-hero-meta">
            <span>${esc(c.ui.rateLabel)} <strong>${esc(c.site.rate)}</strong></span>
            <span>${esc(c.ui.startLabel)} <strong>${esc(c.site.bundle)}</strong></span>
            <span>${esc(c.ui.languagesLabel)} <strong>${esc(c.about.languages)}</strong></span>
          </div>
        </div>

        <aside class="ns-terminal" aria-label="${esc(c.ui.terminalTag)}" data-terminal>
          <div class="ns-terminal-bar">
            <span class="ns-terminal-dots" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="ns-terminal-tag">${esc(c.ui.terminalTag)}</span>
            <span>${esc(c.ui.terminalDemo)}</span>
          </div>
          <div class="ns-terminal-body">
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-query">query &gt;</span>
              <span>${esc(c.ui.terminalQuery)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix">crawl &gt;</span>
              <span>${esc(c.ui.terminalCrawl)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">business:</span> ${esc(c.ui.terminalBiz)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">services:</span> ${esc(c.ui.terminalServices)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">area:</span> ${esc(c.ui.terminalArea)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">pricing_factors:</span> ${esc(c.ui.terminalPricing)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">next_step:</span> ${esc(c.ui.terminalNext)}</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-status">status &gt;</span>
              <span>${esc(c.ui.terminalStatus)}<span class="ns-term-cursor" data-term-cursor aria-hidden="true"></span></span>
            </div>
          </div>
          <div class="ns-terminal-foot">
            <span class="ns-live-pulse">${esc(c.ui.terminalFootLeft)}</span>
            <span>${esc(c.ui.terminalFootRight)}</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="ns-section" id="services" aria-labelledby="core-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.coreKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="core-heading">${esc(c.ui.coreHeading)}</h2>
            <p class="ns-lede">${esc(c.site.audience)}</p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "services/")}">${esc(c.ui.allServicesBtn)} &rarr;</a>
        </div>
        ${renderCoreMonitors(locale, root, true)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="new-modules" aria-labelledby="new-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker ns-kicker-violet"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.newKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="new-heading">${esc(c.ui.newHeading)}</h2>
            <p class="ns-lede">${esc(c.ui.newLede)}</p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "services/")}#new-modules">${esc(c.ui.inspectModulesBtn)} &rarr;</a>
        </div>
        ${renderNewModules(locale, root)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="process" aria-labelledby="process-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="process-heading">${esc(c.ui.processHeading)}</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "process/")}">${esc(c.ui.fullProcessBtn)} &rarr;</a>
        </div>
        ${renderProcessPipeline(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="work" aria-labelledby="work-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.workKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="work-heading">${esc(c.ui.workHeading)}</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "work/")}">${esc(c.ui.viewWorkBtn)} &rarr;</a>
        </div>
        ${renderWorkGrid(locale, root, true)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="about" aria-labelledby="about-heading">
      <div class="ns-wrap">
        <div class="ns-about-grid">
          <div class="ns-card ns-reveal">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.aboutKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="about-heading">${esc(c.about.title)}</h2>
            <div class="ns-about-paragraphs">
              ${c.about.paragraphs.map((p) => `<p class="ns-body">${esc(p)}</p>`).join("")}
            </div>
          </div>

          <aside class="ns-card ns-reveal" aria-label="${esc(c.ui.specsKicker)}">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.specsKicker)}</p>
            <dl class="ns-spec-list">
              <div class="ns-spec-row">
                <dt class="ns-spec-label">${esc(c.ui.specRate)}</dt>
                <dd class="ns-spec-val">${esc(c.site.rate)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">${esc(c.ui.specStart)}</dt>
                <dd class="ns-spec-val">${esc(c.site.bundle)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">${esc(c.ui.specLangs)}</dt>
                <dd class="ns-spec-val">${esc(c.about.languages)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">${esc(c.ui.specFocus)}</dt>
                <dd class="ns-spec-val">${esc(c.ui.specFocusVal)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">${esc(c.ui.specEmail)}</dt>
                <dd class="ns-spec-val"><a class="ns-accent-lime" href="${esc(c.site.mailto)}">${esc(shared.email)}</a></dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="savings" aria-labelledby="savings-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.savingsKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="savings-heading">${esc(c.ui.savingsHeading)}</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "services/cost-cleanup/")}">${esc(c.ui.costDetailsBtn)} &rarr;</a>
        </div>
        ${renderSavingsGrid(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="budget" aria-labelledby="budget-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.budgetKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="budget-heading">${esc(c.ui.budgetHeading)}</h2>
          </div>
        </div>
        ${renderBudgetGrid(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="faq" aria-labelledby="faq-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.faqKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="faq-heading">${esc(c.ui.faqHeading)}</h2>
          </div>
        </div>
        ${renderFaqAccordion(locale)}
      </div>
    </section>

    ${renderContactBand(locale, root, true)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route: "",
      localized: true,
      title: c.site.homeTitle,
      description: c.site.homeDescription,
      version,
      content,
      extraScripts: ["hero-canvas.js"],
      includeWstBeacon: true,
      includeJsonLd: true,
      isHome: true,
    }),
  };
}

export function buildServicesIndexPage(locale, version) {
  const c = CONTENT[locale];
  const route = "services/";
  const filePath = `${localePrefix(locale)}services/index.html`;
  const root = relToRoot(filePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="services-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(c.nav.services)}</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.servicesHeroKicker)}</p>
        <h1 class="ns-h1-sub" id="services-h1">${esc(c.ui.servicesHeroHeading)}</h1>
        <p class="ns-lede">${esc(c.ui.servicesHeroLede)}</p>
      </div>
    </section>

    <section class="ns-section-tight" aria-labelledby="core-group-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.coreGroupKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="core-group-heading">${esc(c.ui.coreGroupHeading)}</h2>
          </div>
        </div>
        ${renderCoreMonitors(locale, root, false)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="new-modules" aria-labelledby="new-group-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker ns-kicker-violet"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.newGroupKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="new-group-heading">${esc(c.ui.newGroupHeading)}</h2>
          </div>
        </div>
        ${renderNewModules(locale, root)}
      </div>
    </section>

    ${renderContactBand(locale, root, false)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: true,
      title: `${c.nav.services} | ${shared.name}`,
      description: c.ui.servicesHeroLede,
      version,
      content,
    }),
  };
}

export function buildServiceDetailPage(locale, slug, version) {
  const c = CONTENT[locale];
  const allServices = [...c.coreServices, ...c.newServices];
  const idx = allServices.findIndex((s) => s.slug === slug);
  if (idx === -1) throw new Error(`Unknown service slug: ${slug}`);
  const service = allServices[idx];
  const route = `services/${slug}/`;
  const filePath = `${localePrefix(locale)}services/${slug}/index.html`;
  const root = relToRoot(filePath);
  const meta = c.motifMeta[service.motif] || c.motifMeta.reassemble;
  const videoMedia = shared.coreVideos[slug];

  const related = [
    allServices[(idx + 1) % allServices.length],
    allServices[(idx + 2) % allServices.length],
    allServices[(idx + 3) % allServices.length],
  ];

  const videoBlock = videoMedia
    ? `
      <div class="ns-video-bezel ns-reveal">
        <div class="ns-monitor-chrome">
          <span>${esc(service.num)} // ${esc(c.ui.liveMotionFeed)}</span>
          <span class="ns-pill ns-pill-cyan">${esc(c.ui.mp4Loop)}</span>
        </div>
        <video
          muted
          loop
          playsinline
          controls
          preload="metadata"
          poster="${root}${esc(videoMedia.detailPoster)}"
          data-signal-video
          aria-label="${esc(service.name)}"
        >
          <source src="${root}${esc(videoMedia.detailVideo)}" type="video/mp4" />
        </video>
      </div>`
    : "";

  const content = `
    <section class="ns-page-hero" aria-labelledby="service-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <a href="${localeHref(root, locale, "services/")}">${esc(c.nav.services)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(service.name)}</span>
        </nav>

        <div class="ns-detail-grid">
          <div>
            <p class="ns-kicker">
              <span class="ns-kicker-dot" aria-hidden="true"></span>
              <span>${esc(c.ui.moduleLabel)} ${esc(service.num)} // ${esc(service.isNew ? c.ui.newActivityLabel : c.ui.corePillarLabel)}</span>
              ${service.isNew ? `<span class="ns-pill ns-pill-new">${esc(c.ui.newBadge)}</span>` : ""}
            </p>
            <h1 class="ns-h1-sub" id="service-h1">${esc(service.name)}</h1>
            <p class="ns-lede">${esc(service.short)}</p>
            <div class="ns-about-paragraphs">
              <p class="ns-body">${esc(service.summary)}</p>
            </div>
            <div class="ns-actions">
              <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(c.site.mailto)}">${esc(c.ui.askAboutPrefix)} ${esc(service.name)}</a>
              <a class="ns-btn ns-btn-ghost" href="${localeHref(root, locale, "check/")}">${esc(c.ui.runFreeCheck)}</a>
            </div>
          </div>

          <div>
            <div class="ns-console ns-reveal" data-motif-console="${esc(service.motif)}">
              <div class="ns-console-bar">
                <span>${esc(meta.code)}</span>
                <span class="ns-live-pulse">${esc(c.ui.telemetryTag)}</span>
              </div>
              <div class="ns-console-stage">
                <canvas
                  class="ns-motif-canvas"
                  data-motif="${esc(service.motif)}"
                  role="img"
                  aria-label="${esc(service.name)}: ${esc(meta.caption)}"
                ></canvas>
              </div>
              <div class="ns-console-caption">
                <span>${esc(meta.caption)}</span>
                <span>${esc(c.ui.illustrativeVisual)}</span>
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
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.scopeKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="scope-heading">${esc(c.ui.scopeHeading)}</h2>
            <ul class="ns-bullet-list">
              ${service.bullets.map((b) => `<li><span>${esc(b)}</span></li>`).join("")}
            </ul>
          </article>

          <article class="ns-card ns-reveal">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.deliverablesKicker)}</p>
            <h2 class="ns-h2 ns-decode">${esc(c.ui.deliverablesHeading)}</h2>
            <ul class="ns-bullet-list">
              ${service.deliverables.map((d) => `<li><span>${esc(d)}</span></li>`).join("")}
            </ul>
            <div class="ns-hero-meta">
              <span>${esc(c.ui.rateLabel)} <strong>${esc(c.site.rate)}</strong></span>
              <span>${esc(c.ui.startLabel)} <strong>${esc(c.site.bundle)}</strong></span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="related-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.adjacentKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="related-heading">${esc(c.ui.relatedHeading)}</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "services/")}">${esc(c.ui.allServicesBtn)} &rarr;</a>
        </div>
        <div class="ns-grid-3">
          ${related
            .map(
              (rel) => `
            <article class="ns-card ns-node ns-reveal">
              <div class="ns-node-top">
                <span class="ns-node-id"><span class="ns-node-dot" aria-hidden="true"></span>MOD_${esc(rel.num)}</span>
                ${rel.isNew ? `<span class="ns-pill ns-pill-new">${esc(c.ui.newBadge)}</span>` : `<span class="ns-pill ns-pill-cyan">${esc(c.ui.coreBadge)}</span>`}
              </div>
              <h3 class="ns-h3">${esc(rel.name)}</h3>
              <p class="ns-body">${esc(rel.short)}</p>
              <a class="ns-card-link" href="${localeHref(root, locale, `services/${rel.slug}/`)}">
                <span>${esc(c.ui.inspectPrefix)} ${esc(rel.name)}</span>
                <span class="ns-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    ${renderContactBand(locale, root, false)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: true,
      title: `${service.name} | ${shared.name}`,
      description: service.short,
      version,
      content,
      extraScripts: ["motif-console.js"],
    }),
  };
}

export function buildWorkIndexPage(locale, version) {
  const c = CONTENT[locale];
  const route = "work/";
  const filePath = `${localePrefix(locale)}work/index.html`;
  const root = relToRoot(filePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="work-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(c.nav.work)}</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.workHeroKicker)}</p>
        <h1 class="ns-h1-sub" id="work-h1">${esc(c.ui.workHeroHeading)}</h1>
        <p class="ns-lede">${esc(c.ui.workHeroLede)}</p>
      </div>
    </section>

    <section class="ns-section-tight" aria-label="${esc(c.nav.work)}">
      <div class="ns-wrap">
        ${renderWorkGrid(locale, root, false)}
      </div>
    </section>

    ${renderContactBand(locale, root, false)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: true,
      title: `${c.nav.work} | ${shared.name}`,
      description: c.ui.workHeroLede,
      version,
      content,
    }),
  };
}

export function buildCaseStudyPage(version) {
  const locale = "en";
  const c = CONTENT[locale];
  const cs = c.caseStudy;
  const route = "case-studies/golden-years/";
  const filePath = "case-studies/golden-years/index.html";
  const root = relToRoot(filePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="cs-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <a href="${localeHref(root, locale, "work/")}">${esc(c.nav.work)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(cs.name)}</span>
        </nav>

        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(cs.kicker)}</p>
        <h1 class="ns-h1-sub" id="cs-h1">${esc(cs.name)}</h1>
        <p class="ns-lede">${esc(cs.intro)}</p>

        <div class="ns-chip-row">
          ${cs.tags.map((t) => `<span class="ns-pill ns-pill-cyan">${esc(t)}</span>`).join("")}
        </div>

        <div class="ns-actions">
          <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(shared.caseStudyMedia.url)}" target="_blank" rel="noopener noreferrer">${esc(c.ui.visitLiveSite)} &rarr;</a>
          <a class="ns-btn ns-btn-ghost" href="${esc(c.site.mailto)}">${esc(c.ui.csDiscussBtn)}</a>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="cs-steps-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.csSprintKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="cs-steps-heading">${esc(c.ui.csSprintHeading)}</h2>
          </div>
        </div>
        <div class="ns-grid-3">
          ${cs.steps
            .map(
              (st, i) => `
            <article class="ns-card ns-reveal">
              <p class="ns-stat-label">${esc(c.ui.csStageLabel)} 0${i + 1}</p>
              <h3 class="ns-h3">${esc(st.title)}</h3>
              <div class="ns-about-paragraphs">
                <p class="ns-body">${esc(st.text)}</p>
              </div>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="cs-quote-heading">
      <div class="ns-wrap">
        <h2 class="sr-only" id="cs-quote-heading">Client statement</h2>
        <figure class="ns-quote-signal ns-reveal">
          <p class="ns-kicker">
            <span class="ns-kicker-dot" aria-hidden="true"></span>
            <span>${esc(c.ui.csQuoteKicker)}</span>
          </p>
          <blockquote>&ldquo;${esc(cs.quote)}&rdquo;</blockquote>
          <figcaption>&mdash; ${esc(cs.quoteBy)}</figcaption>
        </figure>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="cs-views-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.csViewsKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="cs-views-heading">${esc(c.ui.csViewsHeading)}</h2>
          </div>
        </div>

        <div class="ns-bezel-showcase">
          <figure class="ns-device-frame ns-reveal">
            <div class="ns-monitor-chrome">
              <span>DESKTOP VIEW // 1440px</span>
              <span class="ns-pill ns-pill-cyan">CLOUDFLARE PAGES</span>
            </div>
            <img
              src="${root}${esc(shared.caseStudyMedia.desktopImage)}"
              alt="${esc(cs.name)} desktop homepage screenshot"
            />
          </figure>

          <figure class="ns-device-frame ns-device-phone ns-reveal">
            <div class="ns-monitor-chrome">
              <span>MOBILE VIEW</span>
              <span class="ns-pill ns-pill-new">LIVE</span>
            </div>
            <img
              src="${root}${esc(shared.caseStudyMedia.mobileImage)}"
              alt="${esc(cs.name)} mobile homepage screenshot"
            />
          </figure>
        </div>
      </div>
    </section>

    ${renderContactBand(locale, root, false)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: false,
      title: `${cs.name} Case Study | ${shared.name}`,
      description: cs.intro,
      canonical: `${ORIGIN}/case-studies/golden-years/`,
      version,
      content,
    }),
  };
}

export function buildProcessPage(locale, version) {
  const c = CONTENT[locale];
  const route = "process/";
  const filePath = `${localePrefix(locale)}process/index.html`;
  const root = relToRoot(filePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="process-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(c.nav.process)}</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processHeroKicker)}</p>
        <h1 class="ns-h1-sub" id="process-h1">${esc(c.ui.processHeroHeading)}</h1>
        <p class="ns-lede">${esc(c.ui.processHeroLede)}</p>
      </div>
    </section>

    <section class="ns-section-tight" aria-labelledby="steps-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processStepsKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="steps-heading">${esc(c.ui.processStepsHeading)}</h2>
          </div>
        </div>
        ${renderProcessPipeline(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="budget-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processBudgetKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="budget-page-heading">${esc(c.ui.processBudgetHeading)}</h2>
          </div>
        </div>
        ${renderBudgetGrid(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="savings-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processSavingsKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="savings-page-heading">${esc(c.ui.processSavingsHeading)}</h2>
          </div>
        </div>
        ${renderSavingsGrid(locale)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="faq-page-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.processFaqKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="faq-page-heading">${esc(c.ui.processFaqHeading)}</h2>
          </div>
        </div>
        ${renderFaqAccordion(locale)}
      </div>
    </section>

    ${renderContactBand(locale, root, false)}
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: true,
      title: `${c.nav.process} | ${shared.name}`,
      description: c.ui.processHeroLede,
      version,
      content,
    }),
  };
}

export function buildCheckPage(locale, version) {
  const c = CONTENT[locale];
  const route = "check/";
  const filePath = `${localePrefix(locale)}check/index.html`;
  const root = relToRoot(filePath);
  const allServices = [...c.coreServices, ...c.newServices];
  const serviceBySlug = new Map(allServices.map((s) => [s.slug, s]));

  const questionsHtml = c.checkQuestions
    .map(
      (item, idx) => `
      <fieldset class="ns-check-item" data-service="${esc(item.service)}">
        <legend class="sr-only">${idx + 1}. ${esc(item.q)}</legend>
        <div class="ns-check-row">
          <div class="ns-check-q">
            <span class="ns-check-num">0${idx + 1}</span>
            <span>${esc(item.q)}</span>
          </div>
          <div class="ns-toggle-group" role="group" aria-label="Check ${idx + 1}">
            <label class="ns-radio-pill">
              <input type="radio" name="check-q-${idx}" value="yes" />
              <span>${esc(c.ui.checkYes)}</span>
            </label>
            <label class="ns-radio-pill">
              <input type="radio" name="check-q-${idx}" value="no" />
              <span>${esc(c.ui.checkNo)}</span>
            </label>
          </div>
        </div>
      </fieldset>`,
    )
    .join("");

  const fixCardsHtml = c.checkQuestions
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
              <span class="ns-pill ns-pill-new ns-fix-badge">${esc(c.ui.checkRecBadge)}</span>
              ${svc.isNew ? `<span class="ns-pill ns-pill-violet">${esc(c.ui.newBadge)}</span>` : ""}
            </span>
          </div>
          <h3 class="ns-h3">${esc(svc.name)}</h3>
          <p class="ns-body">${esc(svc.short)}</p>
          <a class="ns-card-link" href="${localeHref(root, locale, `services/${svc.slug}/`)}">
            <span>${esc(c.ui.inspectPrefix)} ${esc(svc.name)}</span>
            <span class="ns-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </article>`;
    })
    .join("");

  const content = `
    <section class="ns-page-hero" aria-labelledby="check-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, locale, "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(c.nav.check)}</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.checkHeroKicker)}</p>
        <h1 class="ns-h1-sub" id="check-h1">${esc(c.ui.checkHeroHeading)}</h1>
        <p class="ns-lede">${esc(c.ui.checkHeroLede)}</p>
      </div>
    </section>

    <section class="ns-section-tight" aria-label="${esc(c.nav.check)}">
      <div class="ns-wrap">
        <div class="ns-check-layout">
          <div class="ns-check-list" data-signal-check>
            ${questionsHtml}
          </div>

          <aside class="ns-card ns-gauge-panel" aria-live="polite">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.checkReadoutKicker)}</p>
            <div class="ns-gauge-wrap">
              <svg class="ns-gauge-svg" viewBox="0 0 200 200" aria-hidden="true">
                <circle class="ns-gauge-track" cx="100" cy="100" r="80" />
                <circle class="ns-gauge-arc" cx="100" cy="100" r="80" data-gauge-arc />
              </svg>
              <div class="ns-gauge-center">
                <span class="ns-gauge-score" data-gauge-score>--/8</span>
                <span class="ns-gauge-sub" data-gauge-sub>${esc(c.ui.checkAwaiting)}</span>
              </div>
            </div>
            <p class="ns-gauge-status" data-gauge-status>${esc(c.ui.checkStatusInit)}</p>
            <div class="ns-actions">
              <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(c.site.mailtoCheck)}" data-check-mailto>
                ${esc(c.ui.checkEmailBtn)}
              </a>
              <button class="ns-btn ns-btn-ghost ns-btn-sm" type="button" data-check-reset>
                ${esc(c.ui.checkResetBtn)}
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
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(c.ui.checkMappingKicker)}</p>
            <h2 class="ns-h2 ns-decode" id="fixes-heading">${esc(c.ui.checkFixesHeading)}</h2>
            <p class="ns-lede" data-fix-summary>${esc(c.ui.checkFixesSummary)}</p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, locale, "services/")}">${esc(c.ui.allServicesBtn)} &rarr;</a>
        </div>
        <div class="ns-grid-4">
          ${fixCardsHtml}
        </div>
      </div>
    </section>
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale,
      route,
      localized: true,
      title: `${c.nav.check} | ${shared.name}`,
      description: c.ui.checkHeroLede,
      version,
      content,
      extraScripts: ["check-scan.js"],
    }),
  };
}

function linkifyPolicyParagraph(text, subject) {
  const href = `mailto:${shared.email}?subject=${encodeURIComponent(subject)}`;
  return esc(text).replace(
    /hello@web-by-elie\.com/g,
    `<a href="${href}">${esc(shared.email)}</a>`,
  );
}

export function buildPolicyPage(slug, filePath, version) {
  const policy = POLICIES[slug];
  if (!policy) throw new Error(`Unknown policy slug: ${slug}`);
  const root = relToRoot(filePath);
  const c = CONTENT.en;
  const policyMailto = `mailto:${shared.email}?subject=${encodeURIComponent(policy.mailtoSubject || "Web By Elie")}`;

  const content = `
    <section class="ns-page-hero" aria-labelledby="policy-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${localeHref(root, "en", "")}">${esc(c.nav.home)}</a>
          <span aria-hidden="true">/</span>
          <span>${esc(policy.heading)}</span>
        </nav>
        <div class="ns-card ns-policy-card">
          <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(policy.kicker)}</p>
          <h1 class="ns-h1-sub" id="policy-h1">${esc(policy.heading)}</h1>
          <div class="ns-policy-prose">
            ${policy.paragraphs.map((p) => `<p>${linkifyPolicyParagraph(p, policy.mailtoSubject || "Web By Elie")}</p>`).join("\n            ")}
          </div>
          <div class="ns-actions">
            <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${localeHref(root, "en", "")}">&larr; ${esc(c.nav.home)}</a>
            <a class="ns-btn ns-btn-primary ns-btn-sm" href="${policyMailto}">${esc(shared.email)}</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return {
    filePath,
    html: renderPage({
      filePath,
      locale: "en",
      route: slug,
      localized: false,
      title: policy.title,
      description: policy.description,
      ogDescription: policy.ogDescription,
      canonical: `${ORIGIN}/${slug}`,
      version,
      content,
    }),
  };
}
