import { execFileSync } from "node:child_process";
import { statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const origin = "https://web-by-elie.com";
const locales = ["en", "fr", "es"];
const localePath = (locale, route) => `${locale === "en" ? "" : `/${locale}`}${route}`;

export function sitemapXml(root) {
  // Preserve the established <loc> set and all its hreflang alternates.
  const entries = [
    { route: "/", localized: true },
    ...["refresh", "seo", "ai-ready", "cost-cleanup"].map((slug) => ({ route: `/services/${slug}/`, localized: true })),
    { route: "/case-studies/golden-years/" },
    ...["privacy", "terms", "data-deletion"].map((slug) => ({ route: `/${slug}` })),
  ];
  const modified = (files) => {
    try {
      const committed = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], { cwd: root, encoding: "utf8" }).trim();
      const dirty = execFileSync("git", ["diff", "--name-only", "HEAD", "--", ...files], { cwd: root, encoding: "utf8" }).trim();
      if (committed && !dirty) return committed;
    } catch { /* Source exports have no Git metadata; use their file timestamps. */ }
    return new Date(Math.max(...files.map((file) => statSync(join(root, file)).mtimeMs))).toISOString().slice(0, 10);
  };
  const urls = [];
  for (const { route, localized } of entries) {
    const pageLocales = localized && route === "/" ? locales : ["en"];
    for (const locale of pageLocales) {
      const pathname = localePath(locale, route);
      const file = pathname.endsWith("/") ? `${pathname.slice(1)}index.html` : `${pathname.slice(1)}.html`;
      const dependencies = [file, "assets/theme.js", "assets/styles.css", "assets/i18n.js"];
      const alternates = localized ? [...locales, "x-default"].map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${localePath(lang === "x-default" ? "en" : lang, route)}" />`).join("\n") : "";
      urls.push(`  <url>\n    <loc>${origin}${pathname}</loc>\n    <lastmod>${modified(dependencies)}</lastmod>${alternates ? `\n${alternates}` : ""}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  writeFileSync(join(root, "sitemap.xml"), sitemapXml(root));
  console.log("Generated sitemap.xml from the established route and language set.");
}
