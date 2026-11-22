import {
  site,
  chooserHead,
  chooserBar,
  chooserScript,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";
import { esc } from "./utils.mjs";

const NAV_ITEMS = [
  { label: "Services", path: "services/" },
  { label: "Work", path: "work/" },
  { label: "Process", path: "process/" },
  { label: "Free check", path: "check/" },
];

export function renderLayout({ pagePath, title, description, bodyHtml, extraScripts = [] }) {
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const isNavCurrent = (itemPath) =>
    pagePath === itemPath || (itemPath === "services/" && pagePath.startsWith("services/")) || (itemPath === "work/" && pagePath.startsWith("work/"));

  const navLinks = NAV_ITEMS.map(
    (item) =>
      `<li><a href="${root}${item.path}"${isNavCurrent(item.path) ? ' aria-current="page"' : ""}>${esc(item.label)}</a></li>`
  ).join("");

  const drawerLinks = NAV_ITEMS.map(
    (item) =>
      `<li><a href="${root}${item.path}"${isNavCurrent(item.path) ? ' aria-current="page"' : ""}><span>${esc(item.label)}</span><span aria-hidden="true">→</span></a></li>`
  ).join("");

  const extraScriptTags = extraScripts
    .map((s) => `<script src="${root}assets/${s}" defer></script>`)
    .join("\n  ");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} — ${esc(site.name)}</title>
  <meta name="description" content="${esc(description)}" />
  ${chooserHead(pagePath)}
  <link rel="icon" type="image/svg+xml" href="${repo}assets/web-by-elie-logo.svg" />
  <link rel="stylesheet" href="${root}assets/toybox.css" />
  <link rel="stylesheet" href="${root}assets/components.css" />
  <link rel="stylesheet" href="${root}assets/animations.css" />
  <script src="${root}assets/boot.js"></script>
</head>
<body data-proposal="option-3" data-page="${esc(pagePath)}">
  ${chooserBar("option-3", pagePath)}
  <a class="skip-link" href="#main-content">Skip to content</a>

  <header class="site-header">
    <div class="container">
      <div class="nav-shell">
        <a class="brand-link" href="${root}"${pagePath === "" ? ' aria-current="page"' : ""}>
          <span class="brand-mark">
            <img src="${repo}${site.logo}" alt="" width="34" height="34" />
          </span>
          <span>${esc(site.name)}</span>
        </a>

        <nav aria-label="Primary">
          <ul class="nav-links">${navLinks}</ul>
        </nav>

        <div class="nav-actions">
          <a class="btn btn-sm btn-coral js-confetti-cta" href="${esc(site.mailto)}">Email Elie</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav-drawer" aria-label="Open menu">☰</button>
        </div>
      </div>

      <nav id="mobile-nav-drawer" class="nav-drawer" aria-label="Mobile menu">
        <ul>
          ${drawerLinks}
          <li><a href="${esc(site.mailto)}" class="js-confetti-cta"><span>Email Elie</span><span aria-hidden="true">✉</span></a></li>
        </ul>
      </nav>
    </div>
    <div class="inchworm-track" aria-hidden="true">
      <div class="inchworm-fill"></div>
    </div>
  </header>

  <main id="main-content">
    ${bodyHtml}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-card">
          <a class="brand-link" href="${root}">
            <span class="brand-mark"><img src="${repo}${site.logo}" alt="" width="34" height="34" /></span>
            <span>${esc(site.name)}</span>
          </a>
          <p>${esc(site.tagline)} ${esc(site.audience)}</p>
          <p><strong>${esc(site.rate)}</strong> · ${esc(site.bundle)}</p>
        </div>

        <div class="footer-card">
          <p class="footer-title">Explore</p>
          <ul class="footer-list">
            <li><a href="${root}">Home</a></li>
            <li><a href="${root}services/">All 10 services</a></li>
            <li><a href="${root}work/">Selected work</a></li>
            <li><a href="${root}work/golden-years/">Golden Years case study</a></li>
            <li><a href="${root}process/">Process &amp; budget</a></li>
            <li><a href="${root}check/">Free site check</a></li>
          </ul>
        </div>

        <div class="footer-card">
          <p class="footer-title">Get in touch</p>
          <p>Questions about your site, search clarity, or web bills?</p>
          <div>
            <a class="btn btn-sm btn-cobalt js-confetti-cta" href="${esc(site.mailto)}">${esc(site.email)}</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>${esc(site.name)} · Refresh draft</span>
        <div class="footer-legal">
          <a href="${repo}privacy.html">Privacy</a>
          <a href="${repo}terms.html">Terms</a>
          <a href="${repo}data-deletion.html">Data deletion</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="${root}assets/toybox.js" defer></script>
  ${extraScriptTags}
  ${chooserScript(pagePath)}
</body>
</html>
`;
}
