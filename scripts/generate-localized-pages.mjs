import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import vm from "node:vm";

const version = readFileSync("VERSION", "utf8").trim();
const siteVersion = `v${version}`;
const source = readFileSync("assets/i18n.js", "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);

const i18n = sandbox.window.webByElieI18n;
const locales = {
  en: { label: "English", path: "", ogLocale: "en_US" },
  fr: { label: "French", path: "fr", ogLocale: "fr_FR" },
  es: { label: "Spanish", path: "es", ogLocale: "es_ES" },
};

const baseUrl = "https://web-by-elie.com";
const imageUrl = `${baseUrl}/assets/web-refresh-workspace.png`;
const logoUrl = `${baseUrl}/assets/web-by-elie-logo.png`;

const html = (value) => String(value);
const text = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const settingsButton = `<div class="site-settings" data-site-settings data-site-version="${siteVersion}">
            <button class="settings-button" type="button" data-settings-toggle aria-label="Open site settings" aria-haspopup="dialog" aria-expanded="false" aria-controls="site-settings-panel">
              <svg class="settings-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7A2 2 0 1 1 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
              </svg>
            </button>
          </div>`;

const graphFor = (lang, page, common) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/${lang}/#website`,
      name: "Web By Elie",
      url: `${baseUrl}/${lang}/`,
      description: page.description,
      inLanguage: lang,
      publisher: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${baseUrl}/#organization`,
      name: "Web By Elie",
      url: `${baseUrl}/`,
      email: "hello@web-by-elie.com",
      description: page.description,
      logo: logoUrl,
      image: imageUrl,
      priceRange: "$100/hour",
      areaServed: "Independent businesses",
      founder: { "@id": `${baseUrl}/#elie` },
      knowsAbout: [
        page.services[0][0],
        page.services[1][0],
        page.services[2][0],
        page.services[3][0],
        common.navServices,
      ],
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#elie`,
      name: "Elie",
      url: `${baseUrl}/`,
      jobTitle: "Software engineer and website advisor",
      worksFor: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${baseUrl}/${lang}/#services`,
      name: "Web By Elie services",
      itemListElement: page.services.map(([name, description]) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          serviceType: name,
          provider: { "@id": `${baseUrl}/#organization` },
          description,
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${baseUrl}/${lang}/#answers`,
      mainEntity: page.answers.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
});

const renderHome = (lang) => {
  const copy = i18n[lang];
  const common = copy.common;
  const page = copy.pages.home;
  const locale = locales[lang];
  const canonical = `${baseUrl}/${locale.path}/`;
  const jsonLd = JSON.stringify(graphFor(lang, page, common), null, 2);
  const ogAlternates = Object.entries(locales)
    .filter(([code]) => code !== lang)
    .map(([, alternate]) => `  <meta property="og:locale:alternate" content="${alternate.ogLocale}" />`)
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="../assets/web-by-elie-logo.svg" />
  <link rel="icon" type="image/png" sizes="512x512" href="../assets/icon-512.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png" />
  <link rel="manifest" href="../site.webmanifest" />
  <meta name="theme-color" content="#f7faf7" />
  <meta name="apple-mobile-web-app-title" content="Web By Elie" />
  <meta name="application-name" content="Web By Elie" />
  <title>${text(page.title)}</title>
  <meta name="description" content="${text(page.description)}" />
  <link rel="alternate" hreflang="en" href="${baseUrl}/" />
  <link rel="alternate" hreflang="fr" href="${baseUrl}/fr/" />
  <link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
  <link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  <meta property="og:site_name" content="Web By Elie" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${text(page.title)}" />
  <meta property="og:description" content="${text(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:locale" content="${locale.ogLocale}" />
${ogAlternates}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${text(page.title)}" />
  <meta name="twitter:description" content="${text(page.description)}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <script type="application/ld+json">
  ${jsonLd}
  </script>
  <link rel="stylesheet" href="../assets/styles.css?v=${version}" />
</head>
<body class="site-demo studio-demo">
  <header class="topbar demo-topbar dark-demo-topbar">
    <div class="shell topbar-stack">
      <div class="topbar-inner">
        <a class="brand" href="./?v=${version}">
          <img class="brand-mark" src="../assets/web-by-elie-logo.svg" alt="Web By Elie logo" />
          <span>Web By Elie</span>
        </a>
        <div class="topbar-actions">
          <nav class="nav" aria-label="Primary navigation">
            <a href="#services">${text(common.navServices)}</a>
            <a href="#process">${text(common.navProcess)}</a>
            <a href="#work">${text(common.navWork)}</a>
            <a href="#contact">${text(common.navContact)}</a>
          </nav>
          ${settingsButton}
        </div>
      </div>
    </div>
  </header>
  <main>
    <section class="shell demo-hero studio-hero">
      <div>
        <p class="eyebrow">${text(page.heroEyebrow)}</p>
        <h1>${text(page.heroTitle)}</h1>
        <p class="lede">${text(page.heroLede)}</p>
        <div class="actions">
          <a class="button" href="#contact" data-email-link data-email-user="hello" data-email-domain="web-by-elie.com" data-email-subject="${text(common.emailSubject)}">${text(common.emailCta)}</a>
          <a class="button secondary" href="#services">${text(page.seeServices)}</a>
        </div>
      </div>
      <figure class="demo-photo">
        <img src="../assets/web-refresh-workspace.png" alt="${text(page.imageAlt)}" />
      </figure>
    </section>
    <section id="services" class="section studio-band">
      <div class="shell studio-services">
        ${page.services
          .map(
            ([heading, paragraph], index) => `<article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h2>${text(heading)}</h2>
          <p>${text(paragraph)}</p>
        </article>`
          )
          .join("\n        ")}
      </div>
    </section>
    <section id="process" class="section">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">${text(page.processEyebrow)}</p>
            <h2>${text(page.processTitle)}</h2>
          </div>
          <p class="lede">${text(page.processLede)}</p>
        </div>
        <div class="work-steps">
          ${page.steps
            .map(
              ([heading, paragraph], index) => `<article>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${text(heading)}</h3>
            <p>${text(paragraph)}</p>
          </article>`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>
    <section id="work" class="section work-showcase">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">${text(page.workEyebrow)}</p>
            <h2>${text(page.workTitle)}</h2>
          </div>
          <p class="lede">${text(page.workLede)}</p>
        </div>
        <div class="work-grid">
          ${page.workExamples
            .map(
              (site) => `<article class="work-card">
            <a class="work-card-hit" href="${text(site.url)}"${site.url === baseUrl + "/" ? "" : ' target="_blank" rel="noopener"'} aria-label="${text(site.cta)}: ${text(site.title)}"></a>
            <div class="work-preview">
              <img src="../assets/work-${text(site.theme === "golden" ? "golden-years" : site.theme === "photos" ? "photos-by-elie" : "assurances")}.png" alt="${text(site.title)} homepage" loading="lazy" />
            </div>
            <div class="work-body">
              <span class="work-role">${text(site.role)}</span>
              <h3>${text(site.title)}</h3>
              <p>${text(site.summary)}</p>
              <p class="work-detail">${text(site.detail)}</p>
              <div class="work-links">
                <a class="text-link" href="${text(site.url)}"${site.url === baseUrl + "/" ? "" : ' target="_blank" rel="noopener"'}>${text(site.cta)}</a>
${site.caseStudyUrl ? `                <a class="text-link" href="${text(site.caseStudyUrl)}">${text(site.caseStudyCta)}</a>\n` : ""}              </div>
            </div>
          </article>`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="shell about-layout">
        <div>
          <p class="eyebrow">${text(page.aboutEyebrow)}</p>
          <h2>${text(page.aboutTitle)}</h2>
        </div>
        <div class="about-copy">
          ${page.aboutCopy.map((paragraph) => `<p>${text(paragraph)}</p>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="shell savings-layout">
        <div>
          <p class="eyebrow">${text(page.savingsEyebrow)}</p>
          <h2>${text(page.savingsTitle)}</h2>
        </div>
        <div class="savings-list">
          ${page.savings.map((paragraph) => `<p>${html(paragraph)}</p>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="shell budget-layout">
        <div>
          <p class="eyebrow">${text(page.budgetEyebrow)}</p>
          <h2>${text(page.budgetTitle)}</h2>
        </div>
        <div class="budget-list">
          ${page.budget.map((paragraph) => `<p>${html(paragraph)}</p>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section id="answers" class="section">
      <div class="shell answers-layout">
        <div class="section-head">
          <div>
            <p class="eyebrow">${text(page.answersEyebrow)}</p>
            <h2>${text(page.answersTitle)}</h2>
          </div>
          <p class="lede">${text(page.answersLede)}</p>
        </div>
        <div class="answer-list">
          ${page.answers
            .map(
              ([heading, paragraph]) => `<article>
            <h3>${text(heading)}</h3>
            <p>${text(paragraph)}</p>
          </article>`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>
    <section id="contact" class="section alt">
      <div class="shell signoff-box">
        <div>
          <p class="eyebrow">${text(page.contactEyebrow)}</p>
          <h2>${text(page.contactTitle)}</h2>
        </div>
        <a class="button" href="#contact" data-email-link data-email-user="hello" data-email-domain="web-by-elie.com" data-email-subject="${text(common.emailSubject)}" data-email-label="address">${text(common.emailCta)}</a>
      </div>
    </section>
  </main>
  <a class="mobile-sticky-cta" href="#contact" data-email-link data-email-user="hello" data-email-domain="web-by-elie.com" data-email-subject="${text(common.emailSubject)}">${text(common.emailCta)}</a>
  <footer class="footer">
    <div class="shell footer-inner">
      <span>${text(common.versionLine.replace("{version}", siteVersion))}</span>
      <div class="footer-links">
        <a href="../privacy">${text(common.privacy)}</a>
        <a href="../terms">${text(common.terms)}</a>
        <a href="../data-deletion">${text(common.dataDeletion)}</a>
      </div>
    </div>
  </footer>
  <script src="../assets/i18n.js?v=${version}"></script>
  <script src="../assets/theme.js?v=${version}"></script>
</body>
</html>
`;
};

for (const lang of ["fr", "es"]) {
  const output = join(locales[lang].path, "index.html");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, renderHome(lang));
}
