/**
 * Work index (work/index.html) and Golden Years Tax Strategy case study
 * (work/golden-years/index.html).
 */
import {
  site,
  caseStudy,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { renderPage, esc } from "./layout.mjs";
import { renderWorkGrid, renderContactBand } from "./sections.mjs";

export function buildWorkIndexPage() {
  const pagePath = "work/";
  const root = toOptionRoot(pagePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="work-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span>Work</span>
        </nav>
        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>PRODUCTION LOG // 03 PROJECTS</p>
        <h1 class="ns-h1-sub" id="work-h1">Websites refreshed, clarified, and shipped.</h1>
        <p class="ns-lede">
          Three live sites showing practical refreshes, WordPress maintenance, search &amp; AI structure, Cloudflare Pages moves, and full catalog design.
        </p>
      </div>
    </section>

    <section class="ns-section-tight" aria-label="Portfolio projects">
      <div class="ns-wrap">
        ${renderWorkGrid(pagePath)}
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: "Work",
    description: "Selected websites built, refreshed, and maintained by Web By Elie.",
    content,
  });
}

export function buildCaseStudyPage() {
  const pagePath = "work/golden-years/";
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const content = `
    <section class="ns-page-hero" aria-labelledby="cs-h1">
      <div class="ns-wrap">
        <nav class="ns-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <a href="${root}work/">Work</a>
          <span aria-hidden="true">/</span>
          <span>${esc(caseStudy.name)}</span>
        </nav>

        <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>${esc(caseStudy.kicker)}</p>
        <h1 class="ns-h1-sub" id="cs-h1">${esc(caseStudy.name)}</h1>
        <p class="ns-lede">${esc(caseStudy.intro)}</p>

        <div class="ns-chip-row">
          ${caseStudy.tags.map((t) => `<span class="ns-pill ns-pill-cyan">${esc(t)}</span>`).join("")}
        </div>

        <div class="ns-actions">
          <a class="ns-btn ns-btn-primary ns-btn-magnetic" href="${esc(caseStudy.url)}" target="_blank" rel="noopener noreferrer">Visit live site &rarr;</a>
          <a class="ns-btn ns-btn-ghost" href="${esc(site.mailto)}">Discuss a similar sprint</a>
        </div>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="cs-steps-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>SPRINT BREAKDOWN</p>
            <h2 class="ns-h2 ns-decode" id="cs-steps-heading">Three focused passes.</h2>
          </div>
        </div>
        <div class="ns-grid-3">
          ${caseStudy.steps
            .map(
              (st, i) => `
            <article class="ns-card ns-reveal">
              <p class="ns-stat-label">STAGE 0${i + 1}</p>
              <h3 class="ns-h3">${esc(st.title)}</h3>
              <div class="ns-about-paragraphs">
                <p class="ns-body">${esc(st.text)}</p>
              </div>
            </article>`
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
            <span>VERIFIED SIGNAL // OWNER STATEMENT</span>
          </p>
          <blockquote>&ldquo;${esc(caseStudy.quote)}&rdquo;</blockquote>
          <figcaption>&mdash; ${esc(caseStudy.quoteBy)}</figcaption>
        </figure>
      </div>
    </section>

    <section class="ns-section ns-section-bordered" aria-labelledby="cs-views-heading">
      <div class="ns-wrap">
        <div class="ns-section-head">
          <div class="ns-section-head-copy">
            <p class="ns-kicker"><span class="ns-kicker-dot" aria-hidden="true"></span>VIEWPORT CAPTURES</p>
            <h2 class="ns-h2 ns-decode" id="cs-views-heading">Desktop &amp; mobile layouts.</h2>
          </div>
        </div>

        <div class="ns-bezel-showcase">
          <figure class="ns-device-frame ns-reveal">
            <div class="ns-monitor-chrome">
              <span>DESKTOP VIEW // 1440px</span>
              <span class="ns-pill ns-pill-cyan">CLOUDFLARE PAGES</span>
            </div>
            <img
              src="${repo}${esc(caseStudy.desktopImage)}"
              alt="${esc(caseStudy.name)} desktop homepage screenshot"
            />
          </figure>

          <figure class="ns-device-frame ns-device-phone ns-reveal">
            <div class="ns-monitor-chrome">
              <span>MOBILE VIEW</span>
              <span class="ns-pill ns-pill-new">LIVE</span>
            </div>
            <img
              src="${repo}${esc(caseStudy.mobileImage)}"
              alt="${esc(caseStudy.name)} mobile homepage screenshot"
            />
          </figure>
        </div>
      </div>
    </section>

    ${renderContactBand(pagePath)}
  `;

  return renderPage({
    pagePath,
    title: `${caseStudy.name} case study`,
    description: caseStudy.intro,
    content,
  });
}
