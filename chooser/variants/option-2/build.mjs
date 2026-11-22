#!/usr/bin/env node
/**
 * Zero-dependency Node ESM static site generator for Option 2 ("Night Signal").
 * Run from repo root: `node chooser/variants/option-2/build.mjs`
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { allServices, pages } from "../../content.mjs";
import { buildHomePage } from "./templates/home.mjs";
import { buildServicesIndexPage, buildServiceDetailPage } from "./templates/services.mjs";
import { buildWorkIndexPage, buildCaseStudyPage } from "./templates/work.mjs";
import { buildProcessPage } from "./templates/process.mjs";
import { buildCheckPage } from "./templates/check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function emit(pagePath, html) {
  const targetDir = pagePath ? path.join(__dirname, pagePath) : __dirname;
  await mkdir(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, "index.html");
  await writeFile(targetFile, html, "utf8");
  return targetFile;
}

async function main() {
  const outputs = [
    ["", buildHomePage()],
    ["services/", buildServicesIndexPage()],
    ...allServices.map((svc) => [`services/${svc.slug}/`, buildServiceDetailPage(svc)]),
    ["work/", buildWorkIndexPage()],
    ["work/golden-years/", buildCaseStudyPage()],
    ["process/", buildProcessPage()],
    ["check/", buildCheckPage()],
  ];

  // Verify parity with canonical page list from content.mjs
  const expected = new Set(pages.map((p) => p.path));
  const actual = new Set(outputs.map(([p]) => p));
  for (const p of expected) {
    if (!actual.has(p)) {
      throw new Error(`Missing required page from content.mjs: "${p}"`);
    }
  }

  for (const [pagePath, html] of outputs) {
    await emit(pagePath, html);
  }

  console.log(`Night Signal (option-2): generated ${outputs.length} pages.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
