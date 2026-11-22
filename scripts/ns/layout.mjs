/**
 * Production Night Signal HTML layout shell for Web By Elie.
 * Emits trilingual (EN / FR / ES) pages with strict CSP compatibility,
 * canonical/hreflang/OG/Twitter metadata, cache-busted assets, and WST
 * sessionless beacon on the three localized homepages.
 */
import { CONTENT, LOCALES, ORIGIN, shared } from "./content.mjs";

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function relToRoot(filePath) {
  const depth = filePath.split("/").length - 1;
  return depth === 0 ? "" : "../".repeat(depth);
}

export function localePrefix(locale) {
  return locale === "en" ? "" : `${locale}/`;
}

export function localeHref(root, locale, route = "") {
  const joined = `${root}${localePrefix(locale)}${route}`;
  return joined || "./";
}

function canonicalUrl(locale, route, explicitCanonical) {
  if (explicitCanonical) return explicitCanonical;
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (!route) return `${ORIGIN}${prefix}/`;
  return `${ORIGIN}${prefix}/${route}`;
}

function isNavActive(route, navRoute) {
  if (navRoute === "services/") return route.startsWith("services/");
  if (navRoute === "work/") return route === "work/" || route === "case-studies/golden-years/";
  return route === navRoute;
}

function renderJsonLd(locale) {
  const c = CONTENT[locale];
  const url = locale === "en" ? `${ORIGIN}/` : `${ORIGIN}/${locale}/`;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: shared.name,
    url,
    email: shared.email,
    image: shared.ogImage,
    description: c.site.homeDescription,
    availableLanguage: ["English", "French", "Spanish"],
    areaServed: "Independent businesses",
    serviceType: [
      ...c.coreServices.map((s) => s.name),
      ...c.newServices.map((s) => s.name),
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function renderPage({
  filePath,
  locale = "en",
  route = "",
  localized = true,
  title,
  description,
  ogDescription,
  canonical,
  version,
  content,
  extraScripts = [],
  includeWstBeacon = false,
  includeJsonLd = false,
  isHome = false,
}) {
  const c = CONTENT[locale];
  const root = relToRoot(filePath);
  const homeHref = localeHref(root, locale, "");
  const fullTitle = title || c.site.homeTitle;
  const desc = description || c.site.homeDescription;
  const ogDesc = ogDescription || desc;
  const canon = canonicalUrl(locale, route, canonical);

  const navItems = [
    { label: c.nav.services, route: "services/" },
    { label: c.nav.work, route: "work/" },
    { label: c.nav.process, route: "process/" },
    { label: c.nav.check, route: "check/" },
  ];

  const navLinksHtml = navItems
    .map((item) => {
      const active = isNavActive(route, item.route) ? ' aria-current="page"' : "";
      return `<a class="ns-nav-link" href="${localeHref(root, locale, item.route)}"${active}>${esc(item.label)}</a>`;
    })
    .join("");

  const langSwitchLinks = LOCALES.map((target) => {
    const href = localized ? localeHref(root, target, route) : localeHref(root, target, "");
    const active = target === locale ? ' aria-current="page"' : "";
    return `<a class="ns-lang-link" href="${href}" lang="${target}" hreflang="${target}"${active}>${target.toUpperCase()}</a>`;
  }).join("");

  const hreflangTags = localized
    ? [
        ...LOCALES.map(
          (target) =>
            `<link rel="alternate" hreflang="${target}" href="${canonicalUrl(target, route)}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${canonicalUrl("en", route)}" />`,
      ].join("\n  ")
    : "";

  const ogAlternates = localized
    ? LOCALES.filter((l) => l !== locale)
        .map((l) => `<meta property="og:locale:alternate" content="${CONTENT[l].ogLocale}" />`)
        .join("\n  ")
    : "";

  const vq = `?v=${encodeURIComponent(version)}`;
  const scriptsHtml = [
    `<script src="${root}assets/ns/js/signal-core.js${vq}" defer></script>`,
    ...extraScripts.map((s) => `<script src="${root}assets/ns/js/${s}${vq}" defer></script>`),
    includeWstBeacon
      ? `<script src="${root}assets/wst-beacon.js" defer data-wst-enabled="true" data-wst-endpoint="https://web-signals-collector.ec92009.workers.dev/v1/events" data-wst-site="webbyelie" data-wst-environment="production" data-wst-consent="not_required" data-wst-sessionless="true"></script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n  ");

  const mobileEmailAttr = isHome ? ' data-wst-cta="contact_mobile"' : "";

  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="theme-color" content="#07090f" />
  <link rel="canonical" href="${esc(canon)}" />
  ${hreflangTags}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(shared.name)}" />
  <meta property="og:locale" content="${c.ogLocale}" />
  ${ogAlternates}
  <meta property="og:title" content="${esc(fullTitle)}" />
  <meta property="og:description" content="${esc(ogDesc)}" />
  <meta property="og:url" content="${esc(canon)}" />
  <meta property="og:image" content="${esc(shared.ogImage)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(fullTitle)}" />
  <meta name="twitter:description" content="${esc(ogDesc)}" />
  <meta name="twitter:image" content="${esc(shared.ogImage)}" />
  <link rel="icon" type="image/svg+xml" href="${root}${shared.logo}" />
  <link rel="apple-touch-icon" href="${root}apple-touch-icon.png" />
  <link rel="manifest" href="${root}site.webmanifest" />
  <link rel="stylesheet" href="${root}assets/ns/css/tokens.css${vq}" />
  <link rel="stylesheet" href="${root}assets/ns/css/layout.css${vq}" />
  <link rel="stylesheet" href="${root}assets/ns/css/components.css${vq}" />
  <link rel="stylesheet" href="${root}assets/ns/css/pages.css${vq}" />
  <script src="${root}assets/ns/js/boot.js${vq}"></script>
  ${includeJsonLd ? renderJsonLd(locale) : ""}
</head>
<body data-site-version="v${esc(version)}" data-locale="${c.lang}" data-page="${esc(route || "home")}">
  <a class="skip-link" href="#main-content">${esc(c.nav.skip)}</a>

  <header class="ns-header">
    <div class="ns-scroll-laser" aria-hidden="true">
      <div class="ns-scroll-laser-bar"></div>
    </div>
    <div class="ns-wrap ns-header-inner">
      <a class="ns-brand" href="${homeHref}">
        <span class="ns-brand-mark">
          <img src="${root}${shared.logo}" alt="${esc(shared.name)} logo" width="32" height="32" />
        </span>
        <span class="ns-brand-text">
          <span>${esc(shared.name)}</span>
          <span class="ns-brand-sub">${esc(c.site.brandSub)}</span>
        </span>
      </a>

      <nav class="ns-nav" aria-label="Primary">
        ${navLinksHtml}
      </nav>

      <div class="ns-header-actions">
        <div class="ns-lang-switch ns-lang-switch-desktop" role="group" aria-label="Language">
          ${langSwitchLinks}
        </div>
        <a class="ns-btn ns-btn-primary ns-btn-sm ns-btn-magnetic ns-header-cta-desktop" href="${esc(c.site.mailto)}">${esc(c.nav.emailCta)}</a>
        <button class="ns-menu-toggle" type="button" aria-expanded="false" aria-controls="ns-mobile-drawer" data-menu-toggle>
          <span class="ns-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>${esc(c.nav.menu)}</span>
        </button>
      </div>
    </div>
    <div class="ns-mobile-drawer" id="ns-mobile-drawer" data-mobile-drawer>
      <nav class="ns-mobile-links" aria-label="Mobile primary">
        ${navLinksHtml}
        <div class="ns-mobile-lang" role="group" aria-label="Language">
          ${langSwitchLinks}
        </div>
        <a class="ns-btn ns-btn-primary" href="${esc(c.site.mailto)}"${mobileEmailAttr}>${esc(c.nav.emailCta)}</a>
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
          <a class="ns-brand" href="${homeHref}">
            <span class="ns-brand-mark">
              <img src="${root}${shared.logo}" alt="${esc(shared.name)} logo" width="32" height="32" />
            </span>
            <span class="ns-brand-text">
              <span>${esc(shared.name)}</span>
              <span class="ns-brand-sub">${esc(shared.domain)}</span>
            </span>
          </a>
          <p class="ns-footer-note">${esc(c.site.audience)}</p>
        </div>

        <div>
          <p class="ns-footer-heading">${esc(c.nav.navigation)}</p>
          <ul class="ns-footer-list">
            <li><a href="${homeHref}">${esc(c.nav.home)}</a></li>
            <li><a href="${localeHref(root, locale, "services/")}">${esc(c.nav.services)}</a></li>
            <li><a href="${localeHref(root, locale, "work/")}">${esc(c.nav.work)}</a></li>
            <li><a href="${localeHref(root, locale, "process/")}">${esc(c.nav.process)}</a></li>
            <li><a href="${localeHref(root, locale, "check/")}">${esc(c.nav.check)}</a></li>
          </ul>
        </div>

        <div>
          <p class="ns-footer-heading">${esc(c.nav.directSignal)}</p>
          <ul class="ns-footer-list">
            <li><a href="${esc(c.site.mailto)}">${esc(shared.email)}</a></li>
            <li><a href="${esc(c.site.mailtoCheck)}">${esc(c.nav.requestCheck)}</a></li>
            <li><a href="${root}case-studies/golden-years/">${esc(c.nav.goldenCaseStudy)}</a></li>
            <li><a href="${localeHref(root, locale, "services/multilingual/")}">${esc(c.nav.multilingualLink)}</a></li>
          </ul>
        </div>
      </div>

      <p class="ns-footer-notice">${esc(c.nav.analyticsNotice)}</p>

      <div class="ns-footer-bottom">
        <span class="ns-version-pill">
          <span class="ns-kicker-dot" aria-hidden="true"></span>
          <span>Web By Elie · v${esc(version)}</span>
        </span>
        <div class="ns-footer-legal">
          <a href="${root}privacy">${esc(c.nav.privacy)}</a>
          <a href="${root}terms">${esc(c.nav.terms)}</a>
          <a href="${root}data-deletion">${esc(c.nav.dataDeletion)}</a>
        </div>
      </div>
    </div>
  </footer>

  <span class="ns-version-float" aria-hidden="true">v${esc(version)}</span>
  ${scriptsHtml}
</body>
</html>
`;
}
