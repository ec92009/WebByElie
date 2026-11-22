import {
  coreServices,
  newServices,
  site,
  toOptionRoot,
} from "../../../content.mjs";
import { esc, serviceTheme, waveDivider, contactBanner } from "./utils.mjs";
import { renderMascot } from "./mascots.mjs";

export function renderServicesPage() {
  const root = toOptionRoot("services/");

  const renderCard = (s, idx) => {
    const theme = serviceTheme(s.slug);
    const pills = s.deliverables
      .map((d) => `<span class="sticker">${esc(d)}</span>`)
      .join("");
    return `<article class="tile ${theme.tile} tile-interactive service-card${s.isNew ? " peel-card" : ""} reveal reveal-d${(idx % 3) + 1}">
      ${s.isNew ? '<span class="new-sticker">NEW!</span>' : ""}
      <div class="service-card-head">
        <div>
          <span class="sticker">${s.isNew ? "New" : "Core"} · ${esc(s.num)}${s.vertical ? " · " + esc(s.vertical) : ""}</span>
          <h3>${esc(s.name)}</h3>
        </div>
        <div class="mascot-badge">${renderMascot(s.slug)}</div>
      </div>
      <p class="card-text">${esc(s.summary)}</p>
      <div class="hero-facts">${pills}</div>
      <div>
        <a class="btn btn-sm ${theme.btn}" href="${root}services/${s.slug}/">Open ${esc(s.name)} →</a>
      </div>
    </article>`;
  };

  return `
<section class="hero-section">
  <div class="container">
    <div class="tile tile-sunflower">
      <div class="section-head">
        <div class="section-head-copy">
          <span class="sticker">Services menu · 10 activities</span>
          <h1>Everything in the Toybox</h1>
          <p class="hero-lede">Four core services from the live site plus six practical new ways to keep an independent business website fast, findable, and tidy. Standard work is tracked at ${esc(site.rate)} (${esc(site.bundle)}).</p>
        </div>
        <div class="hero-cta-row">
          <a class="btn btn-coral js-confetti-cta" href="${esc(site.mailto)}">Email Elie ✉</a>
          <a class="btn btn-white" href="${root}check/">Not sure? Take the 8-Q check</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="core-services" aria-labelledby="core-group-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-cobalt">Part 1 · Core services (01–04)</span>
        <h2 id="core-group-heading">The four pillars</h2>
        <p class="section-sub">Refresh your look, clarify SEO and AI facts, and clean up quiet recurring web costs.</p>
      </div>
    </div>
    <div class="bento-2">
      ${coreServices.map(renderCard).join("")}
    </div>
  </div>
</section>

${waveDivider("#ff6b5b")}

<section class="section" id="new-services" aria-labelledby="new-group-heading">
  <div class="container">
    <div class="section-head">
      <div class="section-head-copy">
        <span class="sticker sticker-coral">Part 2 · New activities (05–10)</span>
        <h2 id="new-group-heading">Six fresh additions</h2>
        <p class="section-sub">Draft proposals for ongoing care, speed &amp; accessibility, local map listings, platform moves, small AI helpers, and multilingual sites.</p>
      </div>
    </div>
    <div class="bento-3">
      ${newServices.map(renderCard).join("")}
    </div>
  </div>
</section>

${contactBanner(root)}
`;
}
