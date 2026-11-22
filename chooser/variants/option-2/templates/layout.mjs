/**
 * Shared Night Signal page shell (HTML head, chooser bar, sticky header + laser,
 * mobile drawer, main landmark, footer, and CSP-safe scripts).
 */
import {
  site,
  chooserHead,
  chooserBar,
  chooserScript,
  toOptionRoot,
  toRepoRoot,
} from "../../../content.mjs";

export const OPTION_ID = "option-2";

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isNavActive(pagePath, navPath) {
  if (navPath === "services/") return pagePath.startsWith("services/");
  if (navPath === "work/") return pagePath.startsWith("work/");
  return pagePath === navPath;
}

export function renderPage({ pagePath, title, description, content, extraScripts = [] }) {
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = description || site.lede;

  const navItems = [
    { label: "Services", path: "services/" },
    { label: "Work", path: "work/" },
    { label: "Process", path: "process/" },
    { label: "Free check", path: "check/" },
  ];

  const navLinksHtml = navItems
    .map((item) => {
      const active = isNavActive(pagePath, item.path) ? ' aria-current="page"' : "";
      return `<a class="ns-nav-link" href="${root}${item.path}"${active}>${esc(item.label)}</a>`;
    })
    .join("");

  const scriptsHtml = [
    `<script src="${root}js/signal-core.js" defer></script>`,
    ...extraScripts.map((s) => `<script src="${root}js/${s}" defer></script>`),
    chooserScript(pagePath),
  ].join("\n  ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(desc)}" />
  ${chooserHead(pagePath)}
  <link rel="icon" type="image/svg+xml" href="${repo}assets/web-by-elie-logo.svg" />
  <link rel="stylesheet" href="${root}css/tokens.css" />
  <link rel="stylesheet" href="${root}css/layout.css" />
  <link rel="stylesheet" href="${root}css/components.css" />
  <link rel="stylesheet" href="${root}css/pages.css" />
  <script src="${root}js/boot.js"></script>
</head>
<body data-proposal="${OPTION_ID}" data-page="${esc(pagePath)}">
  ${chooserBar(OPTION_ID, pagePath)}
  <a class="skip-link" href="#main-content">Skip to content</a>

  <header class="ns-header">
    <div class="ns-scroll-laser" aria-hidden="true">
      <div class="ns-scroll-laser-bar"></div>
    </div>
    <div class="ns-wrap ns-header-inner">
      <a class="ns-brand" href="${root}">
        <span class="ns-brand-mark">
          <img src="${repo}${site.logo}" alt="${esc(site.name)} logo" width="32" height="32" />
        </span>
        <span class="ns-brand-text">
          <span>${esc(site.name)}</span>
          <span class="ns-brand-sub">SIGNAL // WEB</span>
        </span>
      </a>

      <nav class="ns-nav" aria-label="Primary">
        ${navLinksHtml}
      </nav>

      <div class="ns-header-actions">
        <a class="ns-btn ns-btn-primary ns-btn-sm ns-btn-magnetic ns-header-cta-desktop" href="${esc(site.mailto)}">Email Elie</a>
        <button class="ns-menu-toggle" type="button" aria-expanded="false" aria-controls="ns-mobile-drawer" data-menu-toggle>
          <span class="ns-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>MENU</span>
        </button>
      </div>
    </div>
    <div class="ns-mobile-drawer" id="ns-mobile-drawer" data-mobile-drawer>
      <nav class="ns-mobile-links" aria-label="Mobile primary">
        ${navLinksHtml}
        <a class="ns-btn ns-btn-primary" href="${esc(site.mailto)}">Email Elie</a>
      </nav>
    </div>
  </header>

  <main id="main-content" class="ns-main">
    ${content}
  </main>

  <footer class="ns-footer">
    <div class="ns-wrap">
      <div class="ns-footer-grid">
        <div>
          <a class="ns-brand" href="${root}">
            <span class="ns-brand-mark">
              <img src="${repo}${site.logo}" alt="${esc(site.name)} logo" width="32" height="32" />
            </span>
            <span class="ns-brand-text">
              <span>${esc(site.name)}</span>
              <span class="ns-brand-sub">${esc(site.domain)}</span>
            </span>
          </a>
          <p class="ns-footer-note">${esc(site.audience)}</p>
        </div>

        <div>
          <p class="ns-footer-heading">Navigation</p>
          <ul class="ns-footer-list">
            <li><a href="${root}">Home</a></li>
            <li><a href="${root}services/">Services</a></li>
            <li><a href="${root}work/">Work</a></li>
            <li><a href="${root}process/">Process</a></li>
            <li><a href="${root}check/">Free check</a></li>
          </ul>
        </div>

        <div>
          <p class="ns-footer-heading">Direct signal</p>
          <ul class="ns-footer-list">
            <li><a href="${esc(site.mailto)}">${esc(site.email)}</a></li>
            <li><a href="${esc(site.mailtoCheck)}">Request a free site check</a></li>
            <li><a href="${root}work/golden-years/">Golden Years case study</a></li>
            <li><a href="${root}services/multilingual/">Multilingual sites</a></li>
          </ul>
        </div>
      </div>

      <div class="ns-footer-bottom">
        <span class="ns-version-pill">
          <span class="ns-kicker-dot" aria-hidden="true"></span>
          <span>Refresh draft</span>
        </span>
        <div class="ns-footer-legal">
          <a href="${repo}privacy.html">Privacy</a>
          <a href="${repo}terms.html">Terms</a>
          <a href="${repo}data-deletion.html">Data deletion</a>
        </div>
      </div>
    </div>
  </footer>

  ${scriptsHtml}
</body>
</html>
`;
}
