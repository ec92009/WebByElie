import {
  allServices,
  site,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { esc, serviceTheme, waveDivider, contactBanner } from "./utils.mjs";
import { renderMascot } from "./mascots.mjs";
import { renderMotifScene } from "./scenes.mjs";

export function renderServiceDetailPage(service) {
  const pagePath = `services/${service.slug}/`;
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);
  const theme = serviceTheme(service.slug);

  const idx = allServices.findIndex((s) => s.slug === service.slug);
  const related = [
    allServices[(idx + 1) % allServices.length],
    allServices[(idx + 2) % allServices.length],
    allServices[(idx + 3) % allServices.length],
  ];

  const bulletsHtml = service.bullets.map((b) => `<li>${esc(b)}</li>`).join("");
  const deliverablesHtml = service.deliverables
    .map((d) => `<span class="sticker sticker-sunflower">★ ${esc(d)}</span>`)
    .join("");

  const videoBlock = service.video
    ? `<div class="retro-tv reveal">
        <div class="retro-tv-screen">
          <video autoplay muted loop playsinline preload="metadata" poster="${repo}${service.poster}">
            <source src="${repo}${service.video}" type="video/mp4" />
          </video>
        </div>
        <div class="retro-tv-bar">
          <div class="retro-tv-dials" aria-hidden="true">
            <span class="tv-knob"></span>
            <span class="tv-knob tv-knob-mint"></span>
            <span class="sticker">CH ${esc(service.num)} · Preview</span>
          </div>
          <button class="btn btn-sm btn-white tv-toggle" type="button">Pause</button>
        </div>
      </div>`
    : "";

  const pricingBlock = service.pricing
    ? `<section class="section-tight" aria-labelledby="menu-pricing-heading">
        <div class="container">
          <div class="tile tile-sunflower reveal">
            <div class="section-head">
              <div class="section-head-copy">
                <span class="sticker">Transparent venue pricing</span>
                <h2 id="menu-pricing-heading">Phone menu pricing</h2>
                <p>${esc(service.pricingNote || "")}</p>
              </div>
            </div>
            <div class="bento-2">
              ${service.pricing
                .map(
                  (p) => `<div class="tile">
                    <span class="sticker sticker-mint">${esc(p.label)}</span>
                    <h3>${esc(p.price)}</h3>
                    <p>${esc(p.note)}</p>
                  </div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>`
    : "";

  const demosBlock = service.demos
    ? `<section class="section-tight" aria-labelledby="menu-demos-heading">
        <div class="container">
          <div class="section-head">
            <div class="section-head-copy">
              <span class="sticker sticker-coral">Try them on your phone</span>
              <h2 id="menu-demos-heading">Four live restaurant menu demos</h2>
              <p class="section-sub">Each demo shows the permanent QR flow, seasonal dish layout, and language switcher.</p>
            </div>
          </div>
          <div class="bento-4">
            ${service.demos
              .map(
                (demo, dIdx) => `<a class="tile ${["tile-sunflower", "tile-mint", "tile-lilac", "tile-coral"][dIdx % 4]} tile-interactive service-card" href="${repo}${demo.href}">
                  <span class="sticker">${esc(demo.kind)}</span>
                  <h3>${esc(demo.name)}</h3>
                  <span class="btn btn-sm btn-white">Open demo →</span>
                </a>`
              )
              .join("")}
          </div>
        </div>
      </section>`
    : "";

  const relatedHtml = related
    .map((rel) => {
      const rTheme = serviceTheme(rel.slug);
      return `<a class="tile ${rTheme.tile} tile-interactive service-card${rel.isNew ? " peel-card" : ""}" href="${root}services/${rel.slug}/">
        ${rel.isNew ? '<span class="new-sticker">NEW!</span>' : ""}
        <div class="service-card-head">
          <div>
            <span class="sticker">${esc(rel.num)}</span>
            <h3>${esc(rel.name)}</h3>
          </div>
          <div class="mascot-badge">${renderMascot(rel.slug)}</div>
        </div>
        <p class="card-text">${esc(rel.short)}</p>
        <span class="sticker">Explore →</span>
      </a>`;
    })
    .join("");

  return `
<section class="hero-section">
  <div class="container">
    <p><a class="sticker" href="${root}services/">← All 10 services</a></p>
    <div class="section-tight">
      <div class="tile ${theme.tile}${service.isNew ? " peel-card" : ""}">
        ${service.isNew ? '<span class="new-sticker">NEW!</span>' : ""}
        <div class="service-card-head">
          <div class="section-head-copy">
            <div class="hero-cta-row">
              <span class="sticker">${service.isNew ? "New activity" : "Core service"} · ${esc(service.num)}</span>
              ${service.vertical ? `<span class="sticker sticker-sunflower">${esc(service.vertical)}</span>` : ""}
            </div>
            <h1>${esc(service.name)}</h1>
            <p class="hero-lede card-text">${esc(service.short)}</p>
            <p class="card-text">${esc(service.summary)}</p>
            <div class="hero-cta-row">
              <a class="btn ${theme.btn} js-confetti-cta" href="${esc(site.mailto)}">Ask Elie about ${esc(service.name)} ✉</a>
              <a class="btn btn-white" href="${root}check/">Free site check</a>
            </div>
          </div>
          <div class="mascot-badge mascot-badge-lg">${renderMascot(service.slug)}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-tight" aria-label="Service visual overview">
  <div class="container">
    <div class="${service.video ? "bento-2" : ""}">
      <div class="motif-stage${service.video ? "" : " motif-stage-solo"} reveal" data-pause-offscreen>
        <div class="strip-card-top">
          <span class="sticker sticker-lilac">Toybox preview</span>
          <span class="sticker">${esc(service.name)}</span>
        </div>
        ${renderMotifScene(service.motif)}
      </div>
      ${videoBlock}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="included-heading">
  <div class="container">
    <div class="bento-2">
      <div class="tile reveal">
        <span class="sticker sticker-mint">What we do</span>
        <h2 id="included-heading">Practical steps included</h2>
        <ul class="service-bullets">${bulletsHtml}</ul>
      </div>

      <div class="tile tile-cream reveal reveal-d1">
        <span class="sticker sticker-coral">What you receive</span>
        <h2>Deliverables</h2>
        <div class="hero-facts">${deliverablesHtml}</div>
        <p>Standard projects start with a ${esc(site.bundle)} tracked at ${esc(site.rate)}, with clear notes as work progresses.</p>
      </div>
    </div>
  </div>
</section>

${pricingBlock}
${demosBlock}

${waveDivider("#ffc93c")}

<section class="section" aria-labelledby="related-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-lilac">Keep exploring</span>
        <h2 id="related-heading">Related services</h2>
      </div>
      <a class="btn btn-sm btn-white" href="${root}services/">See all 10</a>
    </div>
    <div class="bento-3">
      ${relatedHtml}
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}
