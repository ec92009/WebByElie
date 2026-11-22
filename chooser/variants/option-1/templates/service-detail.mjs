/**
 * Service detail page template — rendered for each of the 10 services.
 * Includes bespoke animated SVG ink-engraving motif plate, optional core mp4 plate,
 * deliverables, related services, and CTA.
 */
import {
  site,
  allServices,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  folioBar,
  newStamp,
  contactBroadsheet,
} from "./utils.mjs";
import { renderMotifPlate } from "./motifs.mjs";

export function renderServiceDetail(service) {
  const pagePath = `services/${service.slug}/`;
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const bulletsHtml = service.bullets
    .map((b) => `<li>${esc(b)}</li>`)
    .join("\n");

  const deliverablesHtml = service.deliverables
    .map(
      (d, idx) =>
        `<li><span>Deliverable 0${idx + 1}</span>${esc(d)}</li>`
    )
    .join("\n");

  const videoPlateHtml = service.video
    ? `<figure class="engraving-plate" data-reveal>
        <div class="plate-video-frame">
          <video
            data-lazy-video
            muted
            loop
            playsinline
            preload="none"
            poster="${repo}${esc(service.poster)}"
            aria-label="${esc(service.name)} walkthrough animation"
          >
            <source src="${repo}${esc(service.video)}" type="video/mp4" />
          </video>
        </div>
        <figcaption class="hero-plate-caption">
          <strong>Plate ${esc(service.num)} &middot; Live motion study</strong>
          <span>Auto-pauses off-screen</span>
        </figcaption>
      </figure>`
    : "";

  // Pick 3 related services (wrap around catalog deterministically)
  const idx = allServices.findIndex((item) => item.slug === service.slug);
  const related = [1, 2, 3].map(
    (offset) => allServices[(idx + offset) % allServices.length]
  );

  const relatedHtml = related
    .map(
      (r) => `<a class="related-card" href="${root}services/${esc(r.slug)}/" data-reveal>
        <div class="season-card-top">
          <span class="kicker">${esc(r.num)}</span>
          ${r.isNew ? newStamp() : `<span class="kicker">Core</span>`}
        </div>
        <h3>${esc(r.name)}</h3>
        <p>${esc(r.short)}</p>
      </a>`
    )
    .join("\n");

  const billingNote = `Billed at the standard ${site.rate} rate, typically inside a ${site.bundle}.`;

  return `
    <section class="page-head" aria-labelledby="service-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <a href="${root}services/">Services</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">${esc(service.num)} &middot; ${esc(service.name)}</span>
        </nav>

        <div class="page-head-grid">
          <div>
            <div class="page-title-row">
              <span class="folio-num">Service ${esc(service.num)}</span>
              ${service.isNew ? newStamp() : `<span class="tag-pill">Core pillar</span>`}
              ${service.vertical ? `<span class="tag-pill tag-sage">${esc(service.vertical)}</span>` : ""}
            </div>
            <h1 class="page-title" id="service-title" data-reveal>
              ${revealWords(service.name)}
            </h1>
          </div>
          <div data-reveal>
            <p class="lede">${esc(service.short)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Service overview">
      <div class="wrap">
        <div class="detail-grid">
          <div>
            <p class="detail-prose drop-cap" data-reveal>${esc(service.summary)}</p>

            <div data-reveal>
              <h2 class="detail-subhead">What is included</h2>
              <ul class="editorial-bullets">${bulletsHtml}</ul>
            </div>

            <div data-reveal>
              <h2 class="detail-subhead">What you walk away with</h2>
              <ul class="deliverables-strip">${deliverablesHtml}</ul>
            </div>

            <div data-reveal>
              <p class="margin-note">${esc(billingNote)}</p>
              <div class="hero-actions detail-cta-row">
                <a class="btn btn-ink" href="${esc(site.mailto)}">Ask about ${esc(service.name)} <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
                <a class="btn btn-ghost" href="${root}check/">Run the free site check</a>
              </div>
            </div>
          </div>

          <div class="plate-column">
            ${renderMotifPlate(service.motif, `Plate ${service.num} · ${service.name}`)}
            ${videoPlateHtml}
          </div>
        </div>
      </div>
    </section>

    <section class="section section-tinted" aria-labelledby="related-heading">
      <div class="wrap">
        ${folioBar("Next", "Related services", "Continue reading")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="related-heading">Other services in <em>this edition.</em></h2>
          <a class="text-link" href="${root}services/">View all 10 services <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="related-grid">
          ${relatedHtml}
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}
