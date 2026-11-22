import { site, allServices } from "../../../content.mjs";

export function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SERVICE_THEME = {
  refresh: { tile: "tile-sunflower", sticker: "sticker-sunflower", btn: "btn-white" },
  seo: { tile: "tile-cobalt", sticker: "sticker-cobalt", btn: "btn-sunflower" },
  "ai-ready": { tile: "tile-lilac", sticker: "sticker-lilac", btn: "btn-white" },
  "cost-cleanup": { tile: "tile-coral", sticker: "sticker-coral", btn: "btn-white" },
  "site-care": { tile: "tile-mint", sticker: "sticker-mint", btn: "btn-white" },
  "speed-access": { tile: "tile-sunflower", sticker: "sticker-sunflower", btn: "btn-white" },
  "local-presence": { tile: "tile-coral", sticker: "sticker-coral", btn: "btn-white" },
  "platform-move": { tile: "tile-cobalt", sticker: "sticker-cobalt", btn: "btn-sunflower" },
  "ai-helpers": { tile: "tile-lilac", sticker: "sticker-lilac", btn: "btn-white" },
  multilingual: { tile: "tile-mint", sticker: "sticker-mint", btn: "btn-white" },
};

export function serviceTheme(slug) {
  return SERVICE_THEME[slug] || { tile: "tile-sunflower", sticker: "sticker-sunflower", btn: "btn-white" };
}

export function waveDivider(colorHex = "#ffc93c") {
  return `<div class="wave-divider" aria-hidden="true" data-pause-offscreen>
  <svg class="wave-svg" viewBox="0 0 1200 32" preserveAspectRatio="none">
    <path class="wave-path" d="M-40 16 Q 20 2, 80 16 T 200 16 T 320 16 T 440 16 T 560 16 T 680 16 T 800 16 T 920 16 T 1040 16 T 1160 16 T 1280 16" fill="none" stroke="${colorHex}" stroke-width="10" stroke-linecap="round" />
    <path class="wave-path" d="M-40 16 Q 20 2, 80 16 T 200 16 T 320 16 T 440 16 T 560 16 T 680 16 T 800 16 T 920 16 T 1040 16 T 1160 16 T 1280 16" fill="none" stroke="#1b1b1f" stroke-width="3" stroke-linecap="round" />
  </svg>
</div>`;
}

export function washiTape() {
  const dots = ["washi-dot", "washi-dot washi-dot-mint", "washi-dot washi-dot-lilac", "washi-dot washi-dot-sun"];
  const items = allServices
    .map(
      (s, i) =>
        `<span>${esc(s.name)}${s.isNew ? " · NEW" : ""}</span><span class="${dots[i % dots.length]}" aria-hidden="true"></span>`
    )
    .join("");
  return `<div class="washi-wrap" aria-hidden="true" data-pause-offscreen>
  <div class="washi-tape">
    <div class="washi-track">${items}</div>
    <div class="washi-track">${items}</div>
  </div>
</div>`;
}

export function contactBanner(root) {
  return `<section class="section">
  <div class="container">
    <div class="tile tile-cobalt reveal">
      <div class="section-head">
        <div class="section-head-copy">
          <span class="sticker sticker-sunflower">Say hello</span>
          <h2>${esc(site.tagline)}</h2>
          <p class="card-text">${esc(site.audience)} Start with a quick email about your site, or run the 8-question self-check first.</p>
        </div>
        <div class="hero-cta-row">
          <a class="btn js-confetti-cta" href="${esc(site.mailto)}">Email Elie ✉</a>
          <a class="btn btn-white" href="${root}check/">Free site check</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
