/**
 * Shared HTML helpers and editorial micro-components for Paper & Ink.
 * Zero inline styles or inline scripts (CSP: script-src 'self'; style-src 'self').
 */

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Splits plain text into masked words for staggered entrance reveal.
 * `js/main.js` assigns `--i` via `el.style.setProperty` so HTML stays style-free.
 */
export function revealWords(text) {
  return String(text)
    .split(/\s+/)
    .filter(Boolean)
    .map(
      (word) =>
        `<span class="word-mask"><span class="word-inner">${esc(word)}</span></span>`
    )
    .join(" ");
}

/**
 * Hand-drawn vermilion ink underline annotation wrapped around an italic phrase.
 */
export function inkUnderline(text) {
  return `<span class="ink-annotate"><em>${esc(text)}</em><svg class="ink-underline-svg" viewBox="0 0 240 22" preserveAspectRatio="none" aria-hidden="true"><path class="ink-stroke" d="M3 16 C 62 7, 178 4, 237 13 M 26 20 C 98 14, 174 12, 224 17"/></svg></span>`;
}

/**
 * Hand-drawn vermilion ink circle annotation wrapped around a key word.
 */
export function inkCircle(text) {
  return `<span class="ink-annotate"><em>${esc(text)}</em><svg class="ink-circle-svg" viewBox="0 0 200 72" preserveAspectRatio="none" aria-hidden="true"><path class="ink-stroke" d="M18 44 C 8 18, 56 5, 114 7 C 172 9, 196 26, 189 45 C 181 64, 124 69, 64 65 C 24 62, 6 48, 22 28"/></svg></span>`;
}

/** Editorial chapter folio bar */
export function folioBar(num, label, rightText = "") {
  return `<div class="folio-bar" data-reveal>
    <div class="folio-bar-left">
      <span class="folio-num">${esc(num)}</span>
      <span class="kicker">${esc(label)}</span>
    </div>
    ${rightText ? `<span class="kicker">${esc(rightText)}</span>` : ""}
  </div>`;
}

/** Vermilion rubber-stamp NEW badge */
export function newStamp() {
  return `<span class="stamp-new" aria-label="New service">New</span>`;
}

/** Infinite marquee ticker ribbon of all 10 services */
export function serviceTicker(allServices, root) {
  const items = allServices
    .map(
      (s) =>
        `<a class="ticker-item" href="${root}services/${esc(s.slug)}/"><span class="ticker-num">${esc(s.num)}</span><span>${esc(s.name)}</span>${s.isNew ? newStamp() : ""}</a><span class="ticker-sep" aria-hidden="true">&#10022;</span>`
    )
    .join("");
  return `<section class="ticker-band" aria-label="All services index">
    <div class="ticker-viewport">
      <div class="ticker-track">${items}</div>
      <div class="ticker-track" aria-hidden="true">${items}</div>
    </div>
  </section>`;
}

/** Shared closing contact broadsheet */
export function contactBroadsheet(site, root) {
  return `<section class="section-tight" aria-labelledby="contact-sheet-heading">
    <div class="wrap">
      <div class="contact-sheet" data-reveal>
        <div>
          <span class="kicker">Correspondence &middot; ${esc(site.domain)}</span>
          <h2 id="contact-sheet-heading">Ready for a calm, practical next pass?</h2>
          <p>${esc(site.audience)} Start with a short note or run through the eight-question self-check first.</p>
        </div>
        <div class="contact-sheet-actions">
          <a class="btn btn-vermilion" href="${esc(site.mailto)}">Email Elie <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
          <a class="btn btn-ghost" href="${root}check/">Free site check</a>
        </div>
      </div>
    </div>
  </section>`;
}
