/**
 * Home page template — Paper & Ink magazine cover & editorial spreads.
 */
import {
  site,
  coreServices,
  newServices,
  allServices,
  process as processSteps,
  work,
  about,
  savingsSpots,
  budget,
  faq,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  inkUnderline,
  inkCircle,
  folioBar,
  newStamp,
  serviceTicker,
  contactBroadsheet,
} from "./utils.mjs";

const ROMAN = ["I", "II", "III", "IV"];

export function renderHome() {
  const root = toOptionRoot("");
  const repo = toRepoRoot("");

  const corePlatesHtml = coreServices
    .map((s, idx) => {
      const deliverables = s.deliverables
        .map((d) => `<li class="tag-pill">${esc(d)}</li>`)
        .join("");

      return `<article class="service-plate plate-${idx + 1}" data-reveal>
        <div class="plate-body">
          <div>
            <div class="plate-meta">
              <span class="plate-num">${esc(s.num)}</span>
              <span class="kicker">Plate ${ROMAN[idx]} &middot; Core service</span>
            </div>
            <h3 class="plate-title"><a href="${root}services/${esc(s.slug)}/">${esc(s.name)}</a></h3>
            <p class="plate-summary">${esc(s.summary)}</p>
          </div>
          <div>
            <ul class="plate-deliverables" aria-label="Deliverables">${deliverables}</ul>
            <a class="text-link" href="${root}services/${esc(s.slug)}/">Read the ${esc(s.name)} brief <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="plate-media">
          <div class="plate-video-frame">
            <video
              data-lazy-video
              muted
              loop
              playsinline
              preload="none"
              poster="${repo}${esc(s.poster)}"
              aria-label="${esc(s.name)} preview animation"
            >
              <source src="${repo}${esc(s.video)}" type="video/mp4" />
            </video>
          </div>
          <div class="plate-media-caption">
            <span>Fig. ${esc(s.num)} &middot; ${esc(s.name)}</span>
            <span>Motion plate</span>
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  const seasonCardsHtml = newServices
    .map(
      (s) => `<article class="season-card" data-reveal>
        <div>
          <div class="season-card-top">
            <span class="season-num">${esc(s.num)}</span>
            ${newStamp()}
          </div>
          <h3 class="season-card-title"><a href="${root}services/${esc(s.slug)}/">${esc(s.name)}</a></h3>
          <p class="season-card-desc">${esc(s.short)}</p>
        </div>
        <div class="season-card-foot">
          ${s.vertical ? `<span class="tag-pill tag-sage">${esc(s.vertical)}</span>` : `<span class="kicker">New activity</span>`}
          <a class="text-link" href="${root}services/${esc(s.slug)}/">Details <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
        </div>
      </article>`
    )
    .join("\n");

  const processCardsHtml = processSteps
    .map(
      (step) => `<article class="process-card">
        <span class="process-card-num">${esc(step.num)}</span>
        <div>
          <h3>${esc(step.title)}</h3>
          <p>${esc(step.text)}</p>
        </div>
      </article>`
    )
    .join("\n");

  const workCardsHtml = work
    .map(
      (item) => `<article class="work-card" data-reveal>
        <div class="work-thumb">
          <img src="${repo}${esc(item.image)}" alt="${esc(item.name)} website preview" loading="lazy" data-parallax />
        </div>
        <div class="work-card-body">
          <span class="kicker kicker-sage">${esc(item.role)}</span>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.text)}</p>
          <p class="work-card-detail">${esc(item.detail)}</p>
          <div class="work-card-links">
            ${item.caseStudy ? `<a class="text-link" href="${root}work/golden-years/">Read case study <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>` : ""}
            <a class="text-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Visit site <span class="btn-arrow" aria-hidden="true">&nearr;</span></a>
          </div>
        </div>
      </article>`
    )
    .join("\n");

  const savingsHtml = savingsSpots
    .map(
      (spot) => `<li class="ledger-item">
        <span class="ledger-label">${esc(spot.label)}</span>
        <p class="ledger-text">${esc(spot.text)}</p>
      </li>`
    )
    .join("");

  const budgetHtml = budget
    .map(
      (row) => `<li class="ledger-item">
        <span class="ledger-label">${esc(row.label)}</span>
        <p class="ledger-text">${esc(row.text)}</p>
      </li>`
    )
    .join("");

  const faqHtml = faq
    .map(
      (item, idx) => `<details class="faq-item"${idx === 0 ? " open" : ""}>
        <summary>
          <span>${esc(item.q)}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </summary>
        <p class="faq-answer">${esc(item.a)}</p>
      </details>`
    )
    .join("\n");

  return `
    <!-- Cover / Broadsheet Hero -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="wrap">
        <div class="hero-dateline">
          <span>Issue 01 &middot; ${esc(site.name)}</span>
          <span class="hero-dateline-accent">Four core pillars &middot; Six new activities</span>
          <span>${esc(site.domain)}</span>
        </div>

        <div class="hero-grid">
          <div>
            <h1 class="hero-title" id="hero-heading" data-reveal>
              ${revealWords("New look,")} ${inkUnderline("better reach.")}
            </h1>

            <div class="hero-columns" data-reveal>
              <div>
                <p class="hero-lede">${esc(site.lede)}</p>
                <div class="hero-actions">
                  <a class="btn btn-ink" href="${esc(site.mailto)}">Email Elie <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
                  <a class="btn btn-ghost" href="${root}check/">Free site check</a>
                </div>
              </div>

              <aside class="hero-side-note" aria-label="Practice summary">
                <p class="margin-note">${esc(site.audience)}</p>
                <div class="hero-facts">
                  <div>
                    <div class="hero-fact-num" data-count="100" data-prefix="$">$100</div>
                    <div class="hero-fact-label">per hour</div>
                  </div>
                  <div>
                    <div class="hero-fact-num" data-count="10">10</div>
                    <div class="hero-fact-label">hour starter bundle</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <figure class="hero-plate" data-reveal>
            <div class="hero-plate-frame">
              <img src="${repo}${esc(site.heroImage)}" alt="Workspace showing a website refresh in progress" fetchpriority="high" decoding="sync" data-parallax />
            </div>
            <figcaption class="hero-plate-caption">
              <strong>Frontispiece</strong>
              <span>Refresh &middot; SEO &middot; AI-ready &middot; Costs</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    ${serviceTicker(allServices, root)}

    <!-- § 01 Core Services: Sticky Stacking Plates -->
    <section class="section" aria-labelledby="core-heading">
      <div class="wrap">
        ${folioBar("§ 01", "Core practice", "Plates I — IV")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="core-heading">Four pillars for a site you ${inkCircle("already")} have.</h2>
          <p class="lede">Keep the work that already earns its place, tighten how people and search tools read it, and trim the recurring bills quietly hiding underneath.</p>
        </div>
        <div class="plates-stack">
          ${corePlatesHtml}
        </div>
      </div>
    </section>

    <!-- § 02 New This Season: 6 New Activities -->
    <section class="section section-tinted" aria-labelledby="season-heading">
      <div class="wrap">
        ${folioBar("§ 02", "New this season", "Activities 05 — 10")}
        <div class="season-header" data-reveal>
          <div>
            <div class="season-stamp-row">
              ${newStamp()}
              <span class="kicker kicker-vermilion">Expanded catalog</span>
            </div>
            <h2 class="section-heading" id="season-heading">Six new ways to keep a small site <em>capable.</em></h2>
          </div>
          <div>
            <p class="lede">Beyond the original four pillars: steady monthly upkeep, faster accessible pages, accurate map pins, clean platform moves, small AI helpers, and multilingual sites.</p>
            <a class="text-link" href="${root}services/">Browse the complete 10-service index <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>

        <div class="season-grid">
          ${seasonCardsHtml}
        </div>
      </div>
    </section>

    <!-- § 03 Horizontal-Scroll Pinned Process Chapter -->
    <section class="process-section" aria-labelledby="process-heading">
      <div class="process-stage" data-hscroll>
        <div class="process-sticky">
          <div class="wrap">
            ${folioBar("§ 03", "How a project unfolds", "Four chapters")}
            <div class="process-head">
              <h2 class="section-heading" id="process-heading">Compare real pages, <em>never abstract decks.</em></h2>
              <div class="process-progress-wrap" aria-hidden="true">
                <span class="kicker" data-hscroll-label>01 / 04</span>
                <div class="process-progress-bar">
                  <div class="process-progress-fill" data-hscroll-fill></div>
                </div>
              </div>
            </div>

            <div class="process-viewport">
              <div class="process-track" data-hscroll-track>
                ${processCardsHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- § 04 Selected Work -->
    <section class="section" aria-labelledby="work-heading">
      <div class="wrap">
        ${folioBar("§ 04", "Selected work", "Three recent sites")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="work-heading">Real sites, <em>practical improvements.</em></h2>
          <div>
            <p class="lede">Independent practices and studios refreshed for clarity, search structure, and lower long-term friction.</p>
            <a class="text-link" href="${root}work/">View portfolio &amp; Golden Years feature <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="work-grid">
          ${workCardsHtml}
        </div>
      </div>
    </section>

    <!-- § 05 About, Savings & Budget Ledger -->
    <section class="section section-tinted" aria-labelledby="about-heading">
      <div class="wrap">
        ${folioBar("§ 05", "Notes from the desk", "Background & accounting")}
        <div class="about-spread" data-reveal>
          <div>
            <span class="kicker kicker-sage">Practice note</span>
            <h2 class="section-heading" id="about-heading">${esc(about.title)}</h2>
            <p class="margin-note">Languages spoken: ${esc(about.languages)}.</p>
          </div>
          <div class="about-prose">
            <p class="drop-cap">${esc(about.paragraphs[0])}</p>
            <p>${esc(about.paragraphs[1])}</p>
          </div>
        </div>

        <div class="ledger-grid">
          <div class="ledger-panel" data-reveal>
            <span class="kicker kicker-vermilion">Cost cleanup ledger</span>
            <h3 class="ledger-title">Where small web bills hide</h3>
            <ul class="ledger-list">${savingsHtml}</ul>
          </div>

          <div class="ledger-panel" data-reveal>
            <span class="kicker kicker-sage">Simple accounting</span>
            <h3 class="ledger-title">Clear hours, no surprises</h3>
            <div class="budget-metrics">
              <div>
                <div class="budget-metric-val" data-count="100" data-prefix="$">$100</div>
                <div class="budget-metric-label">Hourly rate</div>
              </div>
              <div>
                <div class="budget-metric-val" data-count="10" data-suffix="h">10h</div>
                <div class="budget-metric-label">Starting bundle</div>
              </div>
              <div>
                <div class="budget-metric-val" data-count="50" data-suffix="%">50%</div>
                <div class="budget-metric-label">Manual check-in</div>
              </div>
            </div>
            <ul class="ledger-list">${budgetHtml}</ul>
          </div>
        </div>
      </div>
    </section>

    <!-- § 06 Editorial FAQ -->
    <section class="section" aria-labelledby="faq-heading">
      <div class="wrap">
        ${folioBar("§ 06", "Questions & straight answers", "Six notes")}
        <div class="faq-layout">
          <div data-reveal>
            <h2 class="section-heading" id="faq-heading">Honest scope, <em>plain English.</em></h2>
            <p class="lede">No guaranteed rankings, no mystery retainers. Everything is written down so you can decide calmly.</p>
            <a class="text-link" href="${root}process/">Read full process &amp; budget <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          </div>
          <div class="faq-list" data-reveal>
            ${faqHtml}
          </div>
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}
