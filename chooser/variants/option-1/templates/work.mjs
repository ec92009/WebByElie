/**
 * Work portfolio index (3 projects) and Golden Years magazine feature case study.
 */
import {
  site,
  work,
  caseStudy,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  inkUnderline,
  folioBar,
  contactBroadsheet,
} from "./utils.mjs";

export function renderWorkIndex() {
  const pagePath = "work/";
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const cardsHtml = work
    .map(
      (item, idx) => `<article class="work-card" data-reveal>
        <div class="work-thumb">
          <img src="${repo}${esc(item.image)}" alt="${esc(item.name)} screenshot" data-parallax />
        </div>
        <div class="work-card-body">
          <span class="kicker kicker-sage">0${idx + 1} &middot; ${esc(item.role)}</span>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.text)}</p>
          <p class="work-card-detail">${esc(item.detail)}</p>
          <div class="work-card-links">
            ${item.caseStudy ? `<a class="btn btn-ink btn-sm" href="${root}work/golden-years/">Read feature case study <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>` : ""}
            <a class="text-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Visit live site <span class="btn-arrow" aria-hidden="true">&nearr;</span></a>
          </div>
        </div>
      </article>`
    )
    .join("\n");

  return `
    <section class="page-head" aria-labelledby="work-page-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Work</span>
        </nav>
        <div class="page-head-grid">
          <h1 class="page-title" id="work-page-title" data-reveal>
            ${revealWords("Selected work &")} ${inkUnderline("field notes.")}
          </h1>
          <div data-reveal>
            <p class="lede">Three independent sites refreshed or designed end-to-end, plus a full editorial case study on Golden Years Tax Strategy.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="portfolio-heading">
      <div class="wrap">
        ${folioBar("Portfolio", "Three published sites", "2024 — Present")}
        <h2 class="section-heading work-index-subhead" id="portfolio-heading" data-reveal>Built for clarity, <em>not bloat.</em></h2>
        <div class="work-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>

    <section class="section section-tinted" aria-labelledby="spotlight-heading">
      <div class="wrap">
        ${folioBar("Feature Study", caseStudy.kicker, "Full story")}
        <div class="about-spread" data-reveal>
          <div>
            <h2 class="section-heading" id="spotlight-heading">${esc(caseStudy.name)}</h2>
            <p class="lede">${esc(caseStudy.intro)}</p>
            <div class="hero-actions detail-cta-row">
              <a class="btn btn-ink" href="${root}work/golden-years/">Open the case study <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
              <a class="btn btn-ghost" href="${esc(caseStudy.url)}" target="_blank" rel="noopener noreferrer">Visit live site &nearr;</a>
            </div>
          </div>
          <figure class="feature-quote feature-quote-compact">
            <blockquote>${esc(caseStudy.quote)}</blockquote>
            <figcaption>&mdash; ${esc(caseStudy.quoteBy)}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}

export function renderGoldenYearsCaseStudy() {
  const pagePath = "work/golden-years/";
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const tagsHtml = caseStudy.tags
    .map((t) => `<span class="tag-pill tag-sage">${esc(t)}</span>`)
    .join("");

  const stepsHtml = caseStudy.steps
    .map(
      (step, idx) => `<article class="case-step" data-reveal>
        <span class="plate-num">0${idx + 1}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </article>`
    )
    .join("\n");

  return `
    <section class="page-head" aria-labelledby="case-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <a href="${root}work/">Work</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${esc(caseStudy.name)}</span>
        </nav>

        <div class="page-head-grid">
          <div>
            <span class="kicker kicker-vermilion">${esc(caseStudy.kicker)}</span>
            <h1 class="page-title" id="case-title" data-reveal>
              ${revealWords(caseStudy.name)}
            </h1>
            <div class="case-tags" data-reveal>${tagsHtml}</div>
          </div>
          <div data-reveal>
            <p class="lede drop-cap">${esc(caseStudy.intro)}</p>
            <div class="hero-actions detail-cta-row">
              <a class="btn btn-ink btn-sm" href="${esc(caseStudy.url)}" target="_blank" rel="noopener noreferrer">Visit live website &nearr;</a>
              <a class="btn btn-ghost btn-sm" href="${root}work/">&larr; Back to work</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Feature narrative and screenshots">
      <div class="wrap">
        ${folioBar("Feature Story", "Client statement & scope", "Three stages")}

        <figure class="feature-quote" data-reveal>
          <blockquote>${esc(caseStudy.quote)}</blockquote>
          <figcaption>&mdash; ${esc(caseStudy.quoteBy)}</figcaption>
        </figure>

        <div class="case-steps">
          ${stepsHtml}
        </div>
      </div>
    </section>

    <section class="section section-tinted" aria-labelledby="screens-heading">
      <div class="wrap">
        ${folioBar("Plates", "Desktop & mobile layouts", "Live captures")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="screens-heading">The refreshed site on <em>desk and pocket.</em></h2>
          <p class="lede">Both desktop and mobile captures from the launched Cloudflare Pages build, structured for direct consultation paths and readable headings.</p>
        </div>

        <div class="device-showcase">
          <figure data-reveal>
            <div class="frame-browser">
              <div class="frame-browser-bar" aria-hidden="true">
                <span class="frame-dot frame-dot-accent"></span>
                <span class="frame-dot"></span>
                <span class="frame-dot"></span>
                <span class="frame-url">goldenyearstaxstrategy.com</span>
              </div>
              <img src="${repo}${esc(caseStudy.desktopImage)}" alt="Golden Years Tax Strategy desktop homepage screenshot" />
            </div>
            <figcaption class="frame-caption">Plate I &middot; Desktop edition</figcaption>
          </figure>

          <figure data-reveal>
            <div class="frame-phone">
              <div class="frame-phone-notch" aria-hidden="true"></div>
              <div class="frame-phone-screen">
                <img src="${repo}${esc(caseStudy.mobileImage)}" alt="Golden Years Tax Strategy mobile homepage screenshot" />
              </div>
            </div>
            <figcaption class="frame-caption">Plate II &middot; Mobile edition</figcaption>
          </figure>
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}
