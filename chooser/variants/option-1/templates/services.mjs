/**
 * Services index page — all 10 services, clearly grouped into Core vs New this season.
 */
import {
  site,
  coreServices,
  newServices,
  allServices,
  toOptionRoot,
} from "../../../content.mjs";
import {
  esc,
  revealWords,
  inkUnderline,
  folioBar,
  newStamp,
  serviceTicker,
  contactBroadsheet,
} from "./utils.mjs";

function renderCatalogRow(s, root) {
  return `<a class="catalog-row" href="${root}services/${esc(s.slug)}/" data-reveal>
    <span class="catalog-num">${esc(s.num)}</span>
    <span class="catalog-name">
      <span>${esc(s.name)}</span>
      ${s.isNew ? newStamp() : ""}
      ${s.vertical ? `<span class="tag-pill tag-sage">${esc(s.vertical)}</span>` : ""}
    </span>
    <p class="catalog-short">${esc(s.short)}</p>
    <span class="catalog-arrow" aria-hidden="true">&rarr;</span>
  </a>`;
}

export function renderServicesIndex() {
  const pagePath = "services/";
  const root = toOptionRoot(pagePath);

  const coreRows = coreServices.map((s) => renderCatalogRow(s, root)).join("\n");
  const newRows = newServices.map((s) => renderCatalogRow(s, root)).join("\n");

  return `
    <section class="page-head" aria-labelledby="services-page-title">
      <div class="wrap">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Services</span>
        </nav>
        <div class="page-head-grid">
          <h1 class="page-title" id="services-page-title" data-reveal>
            ${revealWords("Ten practical ways to improve")} ${inkUnderline("your web presence.")}
          </h1>
          <div data-reveal>
            <p class="lede">Four core pillars carried over from the live practice, plus six new activities proposed for independent businesses. Standard work is billed at ${esc(site.rate)} (${esc(site.bundle)}).</p>
          </div>
        </div>
      </div>
    </section>

    ${serviceTicker(allServices, root)}

    <section class="section" aria-labelledby="group-core-heading">
      <div class="wrap">
        ${folioBar("Part I", "Core services", "01 — 04")}
        <div class="plates-intro" data-reveal>
          <h2 class="section-heading" id="group-core-heading">The four <em>original pillars.</em></h2>
          <p class="lede">The foundation of Web By Elie: refresh what exists, clarify search signals, make facts legible to AI assistants, and eliminate avoidable web bills.</p>
        </div>
        <div class="catalog-list">
          ${coreRows}
        </div>
      </div>
    </section>

    <section class="section section-tinted" aria-labelledby="group-new-heading">
      <div class="wrap">
        ${folioBar("Part II", "New this season", "05 — 10")}
        <div class="plates-intro" data-reveal>
          <div>
            <div class="season-stamp-row">
              ${newStamp()}
              <span class="kicker kicker-vermilion">Proposed additions</span>
            </div>
            <h2 class="section-heading" id="group-new-heading">Six new <em>activities.</em></h2>
          </div>
          <p class="lede">Ongoing site care, speed &amp; WCAG 2.2 accessibility, local map listings, clean builder migrations, practical AI helpers, and QR phone menus for restaurants.</p>
        </div>
        <div class="catalog-list">
          ${newRows}
        </div>
      </div>
    </section>

    ${contactBroadsheet(site, root)}
  `;
}
