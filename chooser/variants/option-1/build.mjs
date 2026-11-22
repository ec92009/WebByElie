#!/usr/bin/env node
/**
 * Zero-dependency static site generator for Option 1 ("Paper & Ink").
 * Run from the repo root: `node chooser/variants/option-1/build.mjs`
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site, allServices, caseStudy, pages } from "../../content.mjs";
import { renderLayout } from "./templates/layout.mjs";
import { renderHome } from "./templates/home.mjs";
import { renderServicesIndex } from "./templates/services.mjs";
import { renderServiceDetail } from "./templates/service-detail.mjs";
import { renderWorkIndex, renderGoldenYearsCaseStudy } from "./templates/work.mjs";
import { renderProcessPage } from "./templates/process.mjs";
import { renderCheckPage } from "./templates/check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const servicesBySlug = new Map(allServices.map((s) => [s.slug, s]));

function renderPage(page) {
  const { path: pagePath, title } = page;

  if (pagePath === "") {
    return renderLayout({
      pagePath,
      title,
      description: site.lede,
      bodyHtml: renderHome(),
    });
  }

  if (pagePath === "services/") {
    return renderLayout({
      pagePath,
      title,
      description: `All 10 Web By Elie services: four core pillars and six new activities for independent businesses.`,
      bodyHtml: renderServicesIndex(),
    });
  }

  if (pagePath.startsWith("services/")) {
    const slug = pagePath.replace(/^services\/|\/$/g, "");
    const service = servicesBySlug.get(slug);
    if (!service) {
      throw new Error(`Unknown service slug for page path: ${pagePath}`);
    }
    return renderLayout({
      pagePath,
      title: service.name,
      description: service.short,
      bodyHtml: renderServiceDetail(service),
    });
  }

  if (pagePath === "work/") {
    return renderLayout({
      pagePath,
      title,
      description: "Selected website refreshes, designs, and the Golden Years Tax Strategy case study.",
      bodyHtml: renderWorkIndex(),
    });
  }

  if (pagePath === "work/golden-years/") {
    return renderLayout({
      pagePath,
      title: `${caseStudy.name} — Case study`,
      description: caseStudy.intro,
      bodyHtml: renderGoldenYearsCaseStudy(),
    });
  }

  if (pagePath === "process/") {
    return renderLayout({
      pagePath,
      title,
      description: `How Web By Elie works, ${site.rate} transparent accounting, avoidable web costs, and FAQ.`,
      bodyHtml: renderProcessPage(),
    });
  }

  if (pagePath === "check/") {
    return renderLayout({
      pagePath,
      title,
      description: "An eight-question self-assessment to see where a practical web pass would help most.",
      bodyHtml: renderCheckPage(),
      extraScripts: ["js/check.js"],
    });
  }

  throw new Error(`Unhandled canonical page path: ${pagePath}`);
}

async function build() {
  let count = 0;
  for (const page of pages) {
    const outDir = path.join(__dirname, page.path);
    const outFile = path.join(outDir, "index.html");
    await mkdir(outDir, { recursive: true });
    const html = renderPage(page);
    await writeFile(outFile, html, "utf8");
    count += 1;
  }
  console.log(`Paper & Ink (option-1): built ${count} pages.`);
}

build().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
