/**
 * Document shell, sticky editorial masthead, mobile drawer, and colophon footer.
 */
import {
  site,
  coreServices,
  toOptionRoot,
  toRepoRoot,
  chooserHead,
  chooserBar,
  chooserScript,
} from "../../../content.mjs";
import { esc } from "./utils.mjs";

const OPTION_ID = "option-1";

export function renderLayout({
  pagePath,
  title,
  description,
  bodyHtml,
  extraScripts = [],
}) {
  const root = toOptionRoot(pagePath);
  const repo = toRepoRoot(pagePath);

  const navItems = [
    { label: "Services", href: `${root}services/`, match: "services/" },
    { label: "Work", href: `${root}work/`, match: "work/" },
    { label: "Process", href: `${root}process/`, match: "process/" },
    { label: "Free check", href: `${root}check/`, match: "check/" },
  ];

  const isCurrent = (match) => pagePath === match || pagePath.startsWith(match);

  const navLinksHtml = navItems
    .map(
      (item) =>
        `<a class="nav-link" href="${item.href}"${isCurrent(item.match) ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`
    )
    .join("");

  const mobileLinksHtml = navItems
    .map(
      (item, idx) =>
        `<a href="${item.href}"${isCurrent(item.match) ? ' aria-current="page"' : ""}>${esc(item.label)} <span>0${idx + 1}</span></a>`
    )
    .join("");

  const coreLinksHtml = coreServices
    .map(
      (s) =>
        `<li><a href="${root}services/${esc(s.slug)}/">${esc(s.num)} &middot; ${esc(s.name)}</a></li>`
    )
    .join("");

  const scriptsHtml = [
    `<script src="${root}js/main.js" defer></script>`,
    ...extraScripts.map((src) => `<script src="${root}${src}" defer></script>`),
    chooserScript(pagePath),
  ].join("\n  ");

  const fullTitle =
    pagePath === "" ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description || site.lede)}" />
  ${chooserHead(pagePath)}
  <link rel="icon" href="${repo}assets/icon-192.png" type="image/png" />
  <script src="${root}js/boot.js"></script>
  <link rel="stylesheet" href="${root}css/tokens.css" />
  <link rel="stylesheet" href="${root}css/base.css" />
  <link rel="stylesheet" href="${root}css/sections.css" />
  <link rel="stylesheet" href="${root}css/pages.css" />
</head>
<body data-proposal="${OPTION_ID}" data-page="${esc(pagePath)}">
  ${chooserBar(OPTION_ID, pagePath)}
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="masthead">
    <div class="wrap masthead-inner">
      <a class="brand" href="${root}"${pagePath === "" ? ' aria-current="page"' : ""}>
        <img class="brand-mark" src="${repo}${esc(site.logo)}" alt="" width="34" height="34" />
        <span class="brand-text">
          <span class="brand-name">${esc(site.name)}</span>
          <span class="brand-edition">Issue 01 &middot; Paper &amp; Ink</span>
        </span>
      </a>

      <nav class="nav-primary" aria-label="Primary">
        ${navLinksHtml}
      </nav>

      <div class="nav-actions">
        <a class="btn btn-ink btn-sm" href="${esc(site.mailto)}">Email Elie <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" data-nav-toggle>
          Menu
        </button>
      </div>
    </div>

    <div class="mobile-drawer" id="mobile-drawer" hidden>
      <nav class="mobile-drawer-nav" aria-label="Mobile primary">
        <a href="${root}"${pagePath === "" ? ' aria-current="page"' : ""}>Home <span>00</span></a>
        ${mobileLinksHtml}
      </nav>
      <div class="mobile-drawer-cta">
        <a class="btn btn-ink" href="${esc(site.mailto)}">Email Elie <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </header>

  <main id="main">
    ${bodyHtml}
  </main>

  <footer class="colophon">
    <div class="wrap">
      <div class="colophon-grid">
        <div>
          <p class="colophon-brand">${esc(site.name)}</p>
          <p class="colophon-note">${esc(site.audience)}</p>
          <a class="text-link" href="${esc(site.mailto)}">${esc(site.email)} <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
        </div>

        <div class="colophon-col">
          <h2>Core practice</h2>
          <ul class="colophon-list">
            ${coreLinksHtml}
          </ul>
        </div>

        <div class="colophon-col">
          <h2>Directory</h2>
          <ul class="colophon-list">
            <li><a href="${root}services/">All 10 services</a></li>
            <li><a href="${root}work/">Selected work</a></li>
            <li><a href="${root}work/golden-years/">Golden Years case study</a></li>
            <li><a href="${root}process/">Process &amp; budget</a></li>
            <li><a href="${root}check/">Free site check</a></li>
          </ul>
        </div>

        <div class="colophon-col">
          <h2>Colophon</h2>
          <p class="margin-note">
            ${esc(site.rate)} standard rate &middot; ${esc(site.bundle)}.
            Working in English, French, and Spanish.
          </p>
        </div>
      </div>

      <div class="colophon-bottom">
        <div class="colophon-legal">
          <span class="draft-pill">Refresh draft</span>
          <span>&copy; ${esc(site.name)}</span>
        </div>
        <nav class="colophon-legal" aria-label="Legal">
          <a href="${repo}privacy.html">Privacy</a>
          <a href="${repo}terms.html">Terms</a>
          <a href="${repo}data-deletion.html">Data deletion</a>
        </nav>
      </div>
    </div>
  </footer>

  ${scriptsHtml}
</body>
</html>
`;
}
