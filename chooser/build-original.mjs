/**
 * Copies the live v317.1 pages into chooser/variants/original/ so the current
 * site can be compared inside the chooser without touching production files.
 *
 * Internal links between copied pages stay inside the Original variant; every
 * other relative URL (assets, policy pages, demos) is rewritten to point back
 * at the repo root. Run from the repo root: node chooser/build-original.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chooserHead, chooserBar, chooserScript, toOptionRoot, toRepoRoot } from "./content.mjs";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(repo, "chooser/variants/original");

/** Source file -> page path inside the variant. */
const PAGES = [
  ["index.html", ""],
  ["services/refresh/index.html", "services/refresh/"],
  ["services/seo/index.html", "services/seo/"],
  ["services/ai-ready/index.html", "services/ai-ready/"],
  ["services/cost-cleanup/index.html", "services/cost-cleanup/"],
  ["case-studies/golden-years/index.html", "work/golden-years/"],
];

/** Core v317.1 assets bundled inside variants/original/assets/ for branch-safe previews. */
const BUNDLED_ASSETS = new Map([
  ["/assets/styles.css", "assets/styles.css"],
  ["/assets/theme.js", "assets/theme.js"],
  ["/assets/i18n.js", "assets/i18n.js"],
]);

/** Root-absolute pathname -> page path, for links that stay in the variant. */
const LOCAL = new Map([
  ["/", ""],
  ["/index.html", ""],
  ["/services/refresh/", "services/refresh/"],
  ["/services/seo/", "services/seo/"],
  ["/services/ai-ready/", "services/ai-ready/"],
  ["/services/cost-cleanup/", "services/cost-cleanup/"],
  ["/case-studies/golden-years/", "work/golden-years/"],
]);

const SKIP = /^(#|mailto:|tel:|data:|javascript:|\/\/)/i;
const SELF_ORIGIN = "https://web-by-elie.com";

mkdirSync(join(outRoot, "assets"), { recursive: true });
for (const rel of BUNDLED_ASSETS.values()) {
  copyFileSync(join(repo, rel), join(outRoot, rel));
}

/**
 * Rewrites one URL found in a copied page.
 * @param {string} value attribute value as written in the source page
 * @param {string} srcRel source file path relative to the repo root
 * @param {string} page destination page path inside the variant
 */
function rewrite(value, srcRel, page) {
  if (!value || SKIP.test(value)) return value;
  let url;
  if (/^https?:/i.test(value)) {
    // Only own-site links to copied pages become local; the rest stay absolute.
    if (!value.startsWith(SELF_ORIGIN)) return value;
    url = new URL(value);
    if (!LOCAL.has(url.pathname)) return value;
  } else {
    url = new URL(value, `http://local/${srcRel}`);
  }
  const tail = url.search + url.hash;
  if (BUNDLED_ASSETS.has(url.pathname)) {
    return toOptionRoot(page) + BUNDLED_ASSETS.get(url.pathname) + tail;
  }
  if (LOCAL.has(url.pathname)) {
    const target = LOCAL.get(url.pathname);
    return (target === "" && toOptionRoot(page) === "./" ? "./" : toOptionRoot(page) + target) + tail;
  }
  return toRepoRoot(page) + url.pathname.slice(1) + tail;
}

for (const [srcRel, page] of PAGES) {
  let html = readFileSync(join(repo, srcRel), "utf8");
  // Strip analytics beacon from chooser review pages.
  html = html.replace(/\s*<script[^>]*wst-beacon\.js[^>]*><\/script>\s*/gi, "\n");
  // Only rewrite URLs on links, media, and resources; meta/og URLs stay as-is.
  html = html.replace(/\b(href|src|poster)="([^"]*)"/g, (match, attr, value, offset) => {
    const tagStart = html.lastIndexOf("<", offset);
    if (/^<meta\b/i.test(html.slice(tagStart, tagStart + 5))) return match;
    return `${attr}="${rewrite(value, srcRel, page)}"`;
  });
  html = html.replace(/<meta name="robots"[^>]*>\s*/i, "");
  html = html.replace("</head>", `  ${chooserHead(page)}\n</head>`);
  html = html.replace(/<body([^>]*)>/i, `<body$1 data-proposal="original" data-page="${page}">\n  ${chooserBar("original", page)}`);
  html = html.replace("</body>", `  ${chooserScript(page)}\n</body>`);

  const outFile = join(outRoot, page, "index.html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`original: ${page || "(home)"} <- ${srcRel}`);
}
