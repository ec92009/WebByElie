#!/usr/bin/env node
/**
 * Zero-dependency static site generator for Option 3 ("Toybox").
 * Run from repo root: node chooser/variants/option-3/build.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  site,
  allServices,
  caseStudy,
  pages,
} from "../../content.mjs";

import { renderLayout } from "./templates/layout.mjs";
import { renderHomePage } from "./templates/page-home.mjs";
import { renderServicesPage } from "./templates/page-services.mjs";
import { renderServiceDetailPage } from "./templates/page-service-detail.mjs";
import { renderWorkPage, renderGoldenYearsCaseStudyPage } from "./templates/page-work.mjs";
import { renderProcessPage } from "./templates/page-process.mjs";
import { renderCheckPage } from "./templates/page-check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function writePage(pagePath, html) {
  const outDir = pagePath ? path.join(__dirname, pagePath) : __dirname;
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "index.html");
  fs.writeFileSync(outFile, html, "utf8");
  return outFile;
}

const written = [];

// 1. Home
written.push(
  writePage(
    "",
    renderLayout({
      pagePath: "",
      title: site.tagline,
      description: site.lede,
      bodyHtml: renderHomePage(),
    })
  )
);

// 2. Services index
written.push(
  writePage(
    "services/",
    renderLayout({
      pagePath: "services/",
      title: "Services",
      description: "All 10 Web By Elie services: 4 core pillars plus 6 new practical website activities.",
      bodyHtml: renderServicesPage(),
    })
  )
);

// 3..12. All 10 Service detail pages
for (const service of allServices) {
  const p = `services/${service.slug}/`;
  written.push(
    writePage(
      p,
      renderLayout({
        pagePath: p,
        title: service.name,
        description: service.short,
        bodyHtml: renderServiceDetailPage(service),
      })
    )
  );
}

// 13. Work index
written.push(
  writePage(
    "work/",
    renderLayout({
      pagePath: "work/",
      title: "Selected work",
      description: "Websites refreshed, cleaned up, and built by Web By Elie.",
      bodyHtml: renderWorkPage(),
    })
  )
);

// 14. Golden Years case study
written.push(
  writePage(
    "work/golden-years/",
    renderLayout({
      pagePath: "work/golden-years/",
      title: `${caseStudy.name} case study`,
      description: caseStudy.intro,
      bodyHtml: renderGoldenYearsCaseStudyPage(),
    })
  )
);

// 15. Process & budget
written.push(
  writePage(
    "process/",
    renderLayout({
      pagePath: "process/",
      title: "Process & budget",
      description: "Four practical steps, $100/hour tracking with a 10-hour starting bundle, cost cleanup spots, and FAQ.",
      bodyHtml: renderProcessPage(),
    })
  )
);

// 16. Free site check
written.push(
  writePage(
    "check/",
    renderLayout({
      pagePath: "check/",
      title: "Free site check",
      description: "An interactive 8-question website self-check with tailored service suggestions.",
      bodyHtml: renderCheckPage(),
      extraScripts: ["check-quiz.js"],
    })
  )
);

if (written.length !== pages.length) {
  console.error(`Expected ${pages.length} pages from content.mjs, wrote ${written.length}`);
  process.exit(1);
}

console.log(`Toybox (option-3) built ${written.length} pages successfully.`);
