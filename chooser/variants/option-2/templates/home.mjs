/**
 * Home page template (index.html)
 */
import { site, about, toOptionRoot } from "../../../content.mjs";
import { renderPage, esc } from "./layout.mjs";
import {
  renderCoreMonitors,
  renderNewModules,
  renderProcessPipeline,
  renderWorkGrid,
  renderSavingsGrid,
  renderBudgetGrid,
  renderFaqAccordion,
  renderContactBand,
} from "./sections.mjs";

export function buildHomePage() {
  const pagePath = "";
  const root = toOptionRoot(pagePath);

  const content = `
    <section class="ns-hero" aria-labelledby="hero-heading">
      <canvas class="ns-hero-canvas" id="ns-hero-canvas" aria-hidden="true"></canvas>
      <div class="ns-hero-scrim" aria-hidden="true"></div>
      <div class="ns-wrap ns-hero-grid">
        <div>
          <p class="ns-kicker">
            <span class="ns-kicker-dot" aria-hidden="true"></span>
            <span>NIGHT SIGNAL // SEARCH &amp; AI PARSE VIEW</span>
          </p>
          <h1 class="ns-h1" id="hero-heading">${esc(site.tagline)}</h1>
          <p class="ns-lede">${esc(site.lede)}</p>
          <div class="ns-actions">
            <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(site.mailto)}">Email Elie</a>
            <a class="ns-btn ns-btn-ghost" href="${root}check/">Run free site check</a>
            <a class="ns-btn ns-btn-ghost" href="${root}services/">Explore 10 services</a>
          </div>
          <div class="ns-hero-meta">
            <span>RATE <strong>${esc(site.rate)}</strong></span>
            <span>START <strong>${esc(site.bundle)}</strong></span>
            <span>LANGUAGES <strong>${esc(about.languages)}</strong></span>
          </div>
        </div>

        <aside class="ns-terminal" aria-label="Illustrative AI retrieval demo" data-terminal>
          <div class="ns-terminal-bar">
            <span class="ns-terminal-dots" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="ns-terminal-tag">AI RETRIEVAL TERMINAL</span>
            <span>ILLUSTRATIVE DEMO</span>
          </div>
          <div class="ns-terminal-body">
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-query">query &gt;</span>
              <span>"Need local heating service near North Harbor"</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix">crawl &gt;</span>
              <span>reading sample-local-business.example (HTML, headings, llms.txt)</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">business:</span> Sample Local Service Co. (generic demo)</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">services:</span> Boiler repair, annual check, emergency callout</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">area:</span> North Harbor &amp; surrounding neighborhoods</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">pricing_factors:</span> Diagnostic visit + written quote before work</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-extract">extract</span>
              <span><span class="ns-term-key">next_step:</span> Direct phone or email booking</span>
            </div>
            <div class="ns-term-line">
              <span class="ns-term-prefix ns-term-prefix-status">status &gt;</span>
              <span>Clear facts parsed without guessing<span class="ns-term-cursor" data-term-cursor aria-hidden="true"></span></span>
            </div>
          </div>
          <div class="ns-terminal-foot">
            <span class="ns-live-pulse">GENERIC SAMPLE BUSINESS</span>
            <span>NO PLACEMENT GUARANTEED</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="ns-section" id="core-services" aria-labelledby="core-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>01 // CORE PILLARS</p>
            <h2 class="ns-h2 ns-decode" id="core-heading">Four core ways we tighten a site.</h2>
            <p class="ns-lede">${esc(site.audience)}</p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}services/">All 10 services &rarr;</a>
        </div>
        ${renderCoreMonitors(pagePath)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="new-modules" aria-labelledby="new-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker ns-kicker-violet"><span class="ns-kicker-dot" aria-hidden="true"></span>02 // NEW MODULES</p>
            <h2 class="ns-h2 ns-decode" id="new-heading">Six new activities around the site.</h2>
            <p class="ns-lede">
              Practical extensions beyond the four pillars: ongoing care, speed &amp; accessibility, local map listings, platform moves, small AI helpers, and restaurant phone menus.
            </p>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}services/#new-modules">Inspect modules &rarr;</a>
        </div>
        ${renderNewModules(pagePath)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="process" aria-labelledby="process-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>03 // EXECUTION PIPELINE</p>
            <h2 class="ns-h2 ns-decode" id="process-heading">Preserve what works, then upgrade.</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}process/">Full process &amp; budget &rarr;</a>
        </div>
        ${renderProcessPipeline()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="work" aria-labelledby="work-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>04 // FIELD LOG</p>
            <h2 class="ns-h2 ns-decode" id="work-heading">Selected sites in production.</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}work/">View work &rarr;</a>
        </div>
        ${renderWorkGrid(pagePath)}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="about" aria-labelledby="about-heading">
      <div class="ns-wrap">
        <div class="ns-about-grid">
          <div class="ns-card ns-reveal">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>05 // OPERATOR</p>
            <h2 class="ns-h2 ns-decode" id="about-heading">${esc(about.title)}</h2>
            <div class="ns-about-paragraphs">
              ${about.paragraphs.map((p) => `<p class="ns-body">${esc(p)}</p>`).join("")}
            </div>
          </div>

          <aside class="ns-card ns-reveal" aria-label="Working profile">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>SPECIFICATIONS</p>
            <dl class="ns-spec-list">
              <div class="ns-spec-row">
                <dt class="ns-spec-label">Rate</dt>
                <dd class="ns-spec-val">${esc(site.rate)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">Typical start</dt>
                <dd class="ns-spec-val">${esc(site.bundle)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">Languages</dt>
                <dd class="ns-spec-val">${esc(about.languages)}</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">Focus</dt>
                <dd class="ns-spec-val">Independent businesses</dd>
              </div>
              <div class="ns-spec-row">
                <dt class="ns-spec-label">Direct email</dt>
                <dd class="ns-spec-val"><a class="ns-accent-lime" href="${esc(site.mailto)}">${esc(site.email)}</a></dd>
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
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>06 // COST TELEMETRY</p>
            <h2 class="ns-h2 ns-decode" id="savings-heading">Where quiet web costs hide.</h2>
          </div>
          <a class="ns-btn ns-btn-ghost ns-btn-sm" href="${root}services/cost-cleanup/">Cost cleanup details &rarr;</a>
        </div>
        ${renderSavingsGrid()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="budget" aria-labelledby="budget-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>07 // BUDGET &amp; TRACKING</p>
            <h2 class="ns-h2 ns-decode" id="budget-heading">Clear hours, zero surprise retainers.</h2>
          </div>
        </div>
        ${renderBudgetGrid()}
      </div>
    </section>

    <section class="ns-section ns-section-bordered" id="faq" aria-labelledby="faq-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>08 // ANSWERS</p>
            <h2 class="ns-h2 ns-decode" id="faq-heading">Frequently asked questions.</h2>
          </div>
        </div>
        ${renderFaqAccordion()}
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: "",
    description: site.lede,
    content,
    extraScripts: ["hero-canvas.js"],
  });
}
