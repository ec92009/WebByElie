import { execFileSync } from "node:child_process";
import { statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ALL_SERVICE_SLUGS, LOCALES, ORIGIN } from "./ns/content.mjs";

const localePath = (locale, route) => `${locale === "en" ? "" : `/${locale}`}${route}`;

export function sitemapXml(root) {
  const entries = [
    { route: "/", localized: true },
    { route: "/services/", localized: true },
    ...ALL_SERVICE_SLUGS.map((slug) => ({ route: `/services/${slug}/`, localized: true })),
    { route: "/work/", localized: true },
    { route: "/process/", localized: true },
    { route: "/check/", localized: true },
    { route: "/case-studies/golden-years/" },
    ...["privacy", "terms", "data-deletion"].map((slug) => ({ route: `/${slug}` })),
    // Indexable creator shops and digital-product policy pages
    ...["alex.ward", "june.rowan", "nora.vela", "elena.brooks", "creators.privacy", "creators.terms", "creators.data-deletion"].map((slug) => ({
      route: `/${slug}`,
      creator: true,
    })),
  ];

  const modified = (files) => {
    try {
      const committed = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
        cwd: root,
        encoding: "utf8",
      }).trim();
      const dirty = execFileSync("git", ["diff", "--name-only", "HEAD", "--", ...files], {
        cwd: root,
        encoding: "utf8",
      }).trim();
      if (committed && !dirty) return committed;
    } catch {
      /* Source exports have no Git metadata; use their file timestamps. */
    }
    return new Date(Math.max(...files.map((file) => statSync(join(root, file)).mtimeMs)))
      .toISOString()
      .slice(0, 10);
  };

  const urls = [];
  for (const { route, localized, creator } of entries) {
    const pageLocales = localized ? LOCALES : ["en"];
    for (const locale of pageLocales) {
      const pathname = localePath(locale, route);
      const file = pathname.endsWith("/")
        ? `${pathname.slice(1)}index.html`
        : `${pathname.slice(1)}.html`;
      const dependencies = creator
        ? [file]
        : [
            file,
            "assets/ns/css/tokens.css",
            "assets/ns/css/layout.css",
            "assets/ns/css/components.css",
            "assets/ns/css/pages.css",
            "assets/ns/js/signal-core.js",
          ];
      const alternates = localized
        ? [...LOCALES, "x-default"]
            .map(
              (lang) =>
                `    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}${localePath(lang === "x-default" ? "en" : lang, route)}" />`,
            )
            .join("\n")
        : "";
      urls.push(
        `  <url>\n    <loc>${ORIGIN}${pathname}</loc>\n    <lastmod>${modified(dependencies)}</lastmod>${alternates ? `\n${alternates}` : ""}\n  </url>`,
      );
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  writeFileSync(join(root, "sitemap.xml"), sitemapXml(root));
  console.log("Generated sitemap.xml for all localized Night Signal routes and indexable pages.");
}
