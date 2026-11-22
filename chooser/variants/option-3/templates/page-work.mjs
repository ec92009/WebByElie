import {
  work,
  caseStudy,
  site,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { esc, waveDivider, contactBanner } from "./utils.mjs";
import { renderMascot } from "./mascots.mjs";

export function renderWorkPage() {
  const root = toOptionRoot("work/");
  const repo = toRepoRoot("work/");
  const colors = ["tile-cream", "tile-sunflower", "tile-lilac"];

  const projectCards = work
    .map(
      (item, i) => `<article class="tile ${colors[i % colors.length]} tile-interactive work-card reveal reveal-d${i + 1}">
        <div class="work-frame">
          <img src="${repo}${item.image}" alt="${esc(item.name)} homepage screenshot" loading="lazy" />
        </div>
        <span class="sticker">${esc(item.role)}</span>
        <h2>${esc(item.name)}</h2>
        <p>${esc(item.text)}</p>
        <p><strong>Scope:</strong> ${esc(item.detail)}</p>
        <div class="work-actions">
          ${item.caseStudy ? `<a class="btn btn-sm btn-cobalt" href="${root}work/golden-years/">Open case study →</a>` : ""}
          <a class="btn btn-sm btn-white" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>
        </div>
      </article>`
    )
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <div class="tile tile-lilac">
      <div class="section-head">
        <div class="section-head-copy">
          <span class="sticker sticker-sunflower">Portfolio · 3 projects</span>
          <h1>Selected work</h1>
          <p class="hero-lede">Real websites refreshed, cleaned up, and designed for independent businesses — including the full Golden Years Tax Strategy scrapbook case study.</p>
        </div>
        <div class="hero-cta-row">
          <a class="btn btn-cobalt" href="${root}work/golden-years/">Read Golden Years case study →</a>
          <a class="btn btn-white js-confetti-cta" href="${esc(site.mailto)}">Email Elie ✉</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-label="Portfolio projects">
  <div class="container">
    <div class="bento-3">
      ${projectCards}
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}

export function renderGoldenYearsCaseStudyPage() {
  const pagePath = "work/golden-years/";
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const tagsHtml = caseStudy.tags
    .map((t, i) => `<span class="sticker ${["sticker-sunflower", "sticker-mint", "sticker-lilac", "sticker-coral"][i % 4]}">${esc(t)}</span>`)
    .join("");

  const noteStyles = [
    "tile-sunflower sticky-tilt-l",
    "tile-mint sticky-tilt-r",
    "tile-lilac sticky-tilt-l",
  ];

  const stepsHtml = caseStudy.steps
    .map(
      (step, i) => `<article class="sticky-note ${noteStyles[i % noteStyles.length]} reveal reveal-d${i + 1}">
        <span class="sticker">Note 0${i + 1}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </article>`
    )
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <p><a class="sticker" href="${root}work/">← Back to selected work</a></p>
    <div class="section-tight">
      <div class="tile tile-sunflower">
        <div class="service-card-head">
          <div class="section-head-copy">
            <span class="sticker">${esc(caseStudy.kicker)}</span>
            <h1>${esc(caseStudy.name)}</h1>
            <p class="hero-lede">${esc(caseStudy.intro)}</p>
            <div class="hero-facts">${tagsHtml}</div>
            <div class="hero-cta-row">
              <a class="btn btn-cobalt" href="${esc(caseStudy.url)}" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>
              <a class="btn btn-white js-confetti-cta" href="${esc(site.mailto)}">Ask Elie about a similar sprint ✉</a>
            </div>
          </div>
          <div class="mascot-badge mascot-badge-lg">${renderMascot("platform-move")}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="scrapbook-shots-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-coral">Scrapbook snapshots</span>
        <h2 id="scrapbook-shots-heading">Desktop &amp; mobile views</h2>
      </div>
    </div>
    <div class="scrapbook-grid">
      <figure class="polaroid polaroid-desktop reveal">
        <span class="polaroid-tape" aria-hidden="true"></span>
        <img src="${repo}${caseStudy.desktopImage}" alt="Golden Years Tax Strategy desktop homepage" />
        <figcaption class="polaroid-caption">Desktop homepage — clear positioning &amp; consultation path</figcaption>
      </figure>

      <figure class="polaroid polaroid-mobile reveal reveal-d1">
        <span class="polaroid-tape polaroid-tape-mint" aria-hidden="true"></span>
        <img src="${repo}${caseStudy.mobileImage}" alt="Golden Years Tax Strategy mobile homepage" />
        <figcaption class="polaroid-caption">Mobile flow — fast &amp; readable on a phone</figcaption>
      </figure>
    </div>
  </div>
</section>

${waveDivider("#3ccf91")}

<section class="section" aria-labelledby="scrapbook-notes-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-mint">What changed</span>
        <h2 id="scrapbook-notes-heading">Three focused sprint notes</h2>
      </div>
    </div>
    <div class="bento-3">
      ${stepsHtml}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="owner-quote-heading">
  <div class="container">
    <div class="comic-bubble reveal">
      <span class="sticker sticker-sunflower" id="owner-quote-heading">From the owner</span>
      <blockquote class="comic-quote">“${esc(caseStudy.quote)}”</blockquote>
      <p class="comic-by">— ${esc(caseStudy.quoteBy)}</p>
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}
