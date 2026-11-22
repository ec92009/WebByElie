import {
  site,
  coreServices,
  newServices,
  allServices,
  process as processSteps,
  budget,
  savingsSpots,
  work,
  about,
  faq,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { esc, serviceTheme, waveDivider, washiTape, contactBanner } from "./utils.mjs";
import { renderMascot } from "./mascots.mjs";
import { renderCoinJar } from "./scenes.mjs";

export function renderHomePage() {
  const root = toOptionRoot("");
  const repo = toRepoRoot("");

  const stripCards = allServices
    .map((s) => {
      const theme = serviceTheme(s.slug);
      return `<a class="tile ${theme.tile} tile-interactive strip-card${s.isNew ? " peel-card" : ""}" href="${root}services/${s.slug}/">
        ${s.isNew ? '<span class="new-sticker">NEW!</span>' : ""}
        <div class="strip-card-top">
          <div class="mascot-badge">${renderMascot(s.slug)}</div>
          <span class="sticker">${esc(s.num)}${s.vertical ? " · " + esc(s.vertical) : ""}</span>
        </div>
        <div>
          <h3>${esc(s.name)}</h3>
          <p class="card-text">${esc(s.short)}</p>
        </div>
        <span class="sticker">Peek inside →</span>
      </a>`;
    })
    .join("");

  const coreCards = coreServices
    .map((s, idx) => {
      const theme = serviceTheme(s.slug);
      const bullets = s.bullets
        .slice(0, 3)
        .map((b) => `<li>${esc(b)}</li>`)
        .join("");
      return `<article class="tile ${theme.tile} tile-interactive service-card reveal reveal-d${(idx % 4) + 1}">
        <div class="service-card-head">
          <div>
            <span class="sticker">Core · ${esc(s.num)}</span>
            <h3>${esc(s.name)}</h3>
          </div>
          <div class="mascot-badge">${renderMascot(s.slug)}</div>
        </div>
        <p class="card-text">${esc(s.summary)}</p>
        <ul class="service-bullets">${bullets}</ul>
        <div>
          <a class="btn btn-sm ${theme.btn}" href="${root}services/${s.slug}/">Explore ${esc(s.name)} →</a>
        </div>
      </article>`;
    })
    .join("");

  const newCards = newServices
    .map((s, idx) => {
      const theme = serviceTheme(s.slug);
      return `<article class="tile ${theme.tile} tile-interactive service-card peel-card reveal reveal-d${(idx % 3) + 1}">
        <span class="new-sticker">NEW!</span>
        <div class="service-card-head">
          <div>
            <span class="sticker">${esc(s.num)}${s.vertical ? " · " + esc(s.vertical) : ""}</span>
            <h3>${esc(s.name)}</h3>
          </div>
          <div class="mascot-badge">${renderMascot(s.slug)}</div>
        </div>
        <p class="card-text">${esc(s.short)}</p>
        <div>
          <a class="btn btn-sm ${theme.btn}" href="${root}services/${s.slug}/">See details →</a>
        </div>
      </article>`;
    })
    .join("");

  const stepColors = ["tile-sunflower", "tile-lilac", "tile-mint", "tile-coral"];
  const processHtml = processSteps
    .map(
      (p, i) => `<article class="tile ${stepColors[i % stepColors.length]} reveal reveal-d${i + 1}">
        <span class="sticker">Step ${esc(p.num)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`
    )
    .join("");

  const budgetColors = ["tile-sunflower", "tile-mint", "tile-lilac"];
  const budgetHtml = budget
    .map(
      (b, i) => `<article class="tile ${budgetColors[i % budgetColors.length]} reveal reveal-d${i + 1}">
        <span class="sticker">${esc(b.label)}</span>
        <p>${esc(b.text)}</p>
      </article>`
    )
    .join("");

  const savingsHtml = savingsSpots
    .map(
      (s, i) => `<article class="tile reveal reveal-d${(i % 2) + 1}">
        <span class="sticker sticker-coral">${esc(s.label)}</span>
        <p>${esc(s.text)}</p>
      </article>`
    )
    .join("");

  const workColors = ["tile-cream", "tile-sunflower", "tile-lilac"];
  const workHtml = work
    .map(
      (w, i) => `<article class="tile ${workColors[i % workColors.length]} tile-interactive work-card reveal reveal-d${i + 1}">
        <div class="work-frame">
          <img src="${repo}${w.image}" alt="${esc(w.name)} website screenshot" loading="lazy" />
        </div>
        <span class="sticker">${esc(w.role)}</span>
        <h3>${esc(w.name)}</h3>
        <p>${esc(w.text)}</p>
        <div class="work-actions">
          ${w.caseStudy ? `<a class="btn btn-sm btn-cobalt" href="${root}work/golden-years/">Read case study →</a>` : ""}
          <a class="btn btn-sm btn-white" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">Visit site ↗</a>
        </div>
      </article>`
    )
    .join("");

  const faqHtml = faq
    .map(
      (item, idx) => `<details class="faq-item reveal"${idx === 0 ? " open" : ""}>
        <summary>
          <span>${esc(item.q)}</span>
          <span class="faq-plus" aria-hidden="true">+</span>
        </summary>
        <div class="faq-body">
          <p>${esc(item.a)}</p>
        </div>
      </details>`
    )
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <div class="hero-bento">
      <div class="tile hero-main">
        <div>
          <span class="sticker sticker-sunflower">Web By Elie · Independent businesses</span>
        </div>
        <h1>${esc(site.tagline)}</h1>
        <p class="hero-lede">${esc(site.lede)}</p>
        <div class="hero-cta-row">
          <a class="btn btn-coral js-confetti-cta" href="${esc(site.mailto)}">Email Elie ✉</a>
          <a class="btn btn-mint" href="${root}check/">Take the Free Site Check →</a>
        </div>
        <div class="hero-facts">
          <span class="sticker">${esc(site.rate)}</span>
          <span class="sticker sticker-lilac">${esc(site.bundle)}</span>
          <span class="sticker sticker-sunflower">${esc(about.languages)}</span>
        </div>
      </div>

      <div class="hero-side">
        <div class="tile tile-sunflower hero-squad-tile" data-pause-offscreen>
          <div>
            <span class="sticker">Meet the core four</span>
            <h2>Friendly web help, zero corporate fog.</h2>
          </div>
          <div class="mascot-squad">
            <a class="mascot-wrap" href="${root}services/refresh/" aria-label="Refresh">${renderMascot("refresh")}</a>
            <a class="mascot-wrap" href="${root}services/seo/" aria-label="SEO">${renderMascot("seo")}</a>
            <a class="mascot-wrap" href="${root}services/ai-ready/" aria-label="AI-ready">${renderMascot("ai-ready")}</a>
            <a class="mascot-wrap" href="${root}services/cost-cleanup/" aria-label="Cost cleanup">${renderMascot("cost-cleanup")}</a>
          </div>
          <p>${esc(site.audience)}</p>
        </div>

        <div class="hero-mini-row">
          <a class="tile tile-cobalt tile-interactive hero-mini-tile" href="${root}services/">
            <span class="sticker sticker-sunflower">Services</span>
            <div>
              <p class="mini-big">4 + 6</p>
              <p class="card-text">Core pillars &amp; new activities</p>
            </div>
          </a>
          <a class="tile tile-mint tile-interactive hero-mini-tile" href="${root}check/">
            <span class="sticker">Self-check</span>
            <div>
              <p class="mini-big">8 Qs</p>
              <p>Spot quick wins in 60s →</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

${washiTape()}

<section class="section-tight" aria-labelledby="strip-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-lilac">Toybox shelf</span>
        <h2 id="strip-heading">All 10 services, drag or flip through</h2>
      </div>
      <div class="strip-controls">
        <button class="strip-btn" type="button" data-strip-prev aria-label="Previous services">←</button>
        <button class="strip-btn" type="button" data-strip-next aria-label="Next services">→</button>
        <a class="btn btn-sm btn-white" href="${root}services/">View all 10</a>
      </div>
    </div>
    <div class="showcase-strip" tabindex="0" role="region" aria-label="All 10 services showcase">
      ${stripCards}
    </div>
  </div>
</section>

${waveDivider("#3ccf91")}

<section class="section" aria-labelledby="core-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-sunflower">The 4 core pillars</span>
        <h2 id="core-heading">Start with what makes the biggest difference</h2>
        <p class="section-sub">Preserve what works, sharpen search and AI clarity, and tidy up avoidable web bills.</p>
      </div>
    </div>
    <div class="bento-2">
      ${coreCards}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="new-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-coral">6 new activities</span>
        <h2 id="new-heading">Fresh ways to keep your site light and handy</h2>
        <p class="section-sub">Draft additions alongside the four core pillars — pick only what fits your business.</p>
      </div>
      <a class="btn btn-sm btn-white" href="${root}services/#new-services">Compare all new services →</a>
    </div>
    <div class="bento-3">
      ${newCards}
    </div>
  </div>
</section>

${waveDivider("#ff6b5b")}

<section class="section" aria-labelledby="savings-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-coral">Cost cleanup</span>
        <h2 id="savings-heading">Where quiet web costs usually hide</h2>
        <p class="section-sub">You approve every keep, change, or cancel line yourself.</p>
      </div>
      <a class="btn btn-sm btn-coral" href="${root}services/cost-cleanup/">About Cost cleanup →</a>
    </div>
    <div class="savings-bento">
      <div class="tile tile-sunflower coin-jar-tile">
        <span class="sticker">Savings Cat Jar</span>
        ${renderCoinJar()}
        <p><strong>Small subscriptions add up quietly.</strong> We map every tool and renewal before touching a thing.</p>
      </div>
      <div class="bento-2">
        ${savingsHtml}
      </div>
    </div>
  </div>
</section>

${waveDivider("#c4b5ff")}

<section class="section" aria-labelledby="process-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-mint">How we work</span>
        <h2 id="process-heading">Four plain steps, clear budget</h2>
        <p class="section-sub">Real clickable pages to compare, tracked at ${esc(site.rate)}.</p>
      </div>
      <a class="btn btn-sm btn-white" href="${root}process/">Full process &amp; FAQ →</a>
    </div>
    <div class="bento-4">
      ${processHtml}
    </div>
    <div class="section-tight">
      <div class="bento-3">
        ${budgetHtml}
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="work-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-cobalt">Selected work</span>
        <h2 id="work-heading">Real sites built and refreshed</h2>
      </div>
      <a class="btn btn-sm btn-white" href="${root}work/">All work →</a>
    </div>
    <div class="bento-3">
      ${workHtml}
    </div>
  </div>
</section>

${waveDivider("#ffc93c")}

<section class="section" aria-labelledby="about-heading">
  <div class="container">
    <div class="bento-2">
      <article class="tile tile-mint reveal">
        <span class="sticker">About Elie</span>
        <h2 id="about-heading">${esc(about.title)}</h2>
        ${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        <div>
          <span class="sticker sticker-sunflower">Languages: ${esc(about.languages)}</span>
        </div>
      </article>

      <div class="faq-list" aria-labelledby="faq-heading">
        <div class="section-head-copy">
          <span class="sticker sticker-lilac">Common questions</span>
          <h2 id="faq-heading">Straight answers</h2>
        </div>
        ${faqHtml}
      </div>
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}
