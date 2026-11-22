import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ALL_SERVICE_SLUGS, LOCALES, POLICIES } from "./ns/content.mjs";
import {
  buildCaseStudyPage,
  buildCheckPage,
  buildHomePage,
  buildPolicyPage,
  buildProcessPage,
  buildServiceDetailPage,
  buildServicesIndexPage,
  buildWorkIndexPage,
} from "./ns/pages.mjs";

export function generatedPagesList() {
  const files = [];
  for (const locale of LOCALES) {
    const prefix = locale === "en" ? "" : `${locale}/`;
    files.push(`${prefix}index.html`);
    files.push(`${prefix}services/index.html`);
    for (const slug of ALL_SERVICE_SLUGS) {
      files.push(`${prefix}services/${slug}/index.html`);
    }
    files.push(`${prefix}work/index.html`);
    files.push(`${prefix}process/index.html`);
    files.push(`${prefix}check/index.html`);
  }
  files.push("case-studies/golden-years/index.html");
  for (const slug of Object.keys(POLICIES)) {
    files.push(`${slug}.html`, `${slug}/index.html`);
  }
  return files;
}

export function generateAllPages(root) {
  const version = readFileSync(join(root, "VERSION"), "utf8").trim();
  const pages = [];

  for (const locale of LOCALES) {
    pages.push(buildHomePage(locale, version));
    pages.push(buildServicesIndexPage(locale, version));
    for (const slug of ALL_SERVICE_SLUGS) {
      pages.push(buildServiceDetailPage(locale, slug, version));
    }
    pages.push(buildWorkIndexPage(locale, version));
    pages.push(buildProcessPage(locale, version));
    pages.push(buildCheckPage(locale, version));
  }

  pages.push(buildCaseStudyPage(version));

  for (const slug of Object.keys(POLICIES)) {
    pages.push(buildPolicyPage(slug, `${slug}.html`, version));
    pages.push(buildPolicyPage(slug, `${slug}/index.html`, version));
  }

  for (const { filePath, html } of pages) {
    const target = join(root, filePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html, "utf8");
  }

  return { count: pages.length, version };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const { count, version } = generateAllPages(root);
  console.log(`Generated ${count} Night Signal pages (EN/FR/ES, case study, and policies) at v${version}.`);
}
