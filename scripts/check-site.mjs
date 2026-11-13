import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { securityHeaders } from "./security-headers.mjs";
import { publishedHtml } from "./public-site.mjs";
import { sitemapXml } from "./generate-sitemap.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const version = readFileSync(join(root, "VERSION"), "utf8").trim();
const expectedVersion = `v${version}`;
const failures = [];

const fail = (message) => failures.push(message);

const headersPath = join(root, "_headers");
if (!existsSync(headersPath)) {
  fail("_headers is missing");
} else {
  const headers = readFileSync(headersPath, "utf8");
  if (!headers.includes("Content-Security-Policy:")) fail("_headers lacks a CSP");
  if (headers !== securityHeaders(root)) fail("_headers is stale; run node scripts/security-headers.mjs");
}

const publicHtml = publishedHtml();
// Hreflang alternates are part of the existing sitemap URL set too.
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
if (sitemap !== sitemapXml(root)) fail("sitemap.xml is stale; run node scripts/generate-sitemap.mjs");
const sitemapUrls = new Set([
  ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  ...[...sitemap.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]),
]);

const resolveLocalTarget = (sourceFile, rawReference) => {
  const reference = rawReference.split("#")[0].split("?")[0];
  if (!reference) return join(root, sourceFile);

  let decoded;
  try {
    decoded = decodeURIComponent(reference);
  } catch {
    fail(`${sourceFile}: invalid URL encoding in ${rawReference}`);
    return null;
  }

  const absoluteTarget = isAbsolute(decoded)
    ? resolve(root, `.${decoded}`)
    : resolve(dirname(join(root, sourceFile)), decoded);
  const relativeTarget = relative(root, absoluteTarget);
  if (relativeTarget.startsWith(`..${sep}`) || relativeTarget === "..") {
    fail(`${sourceFile}: local reference escapes the site root: ${rawReference}`);
    return null;
  }

  const candidates = [
    absoluteTarget,
    join(absoluteTarget, "index.html"),
    `${absoluteTarget}.html`,
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
};

let localReferenceCount = 0;
for (const sourceFile of publicHtml) {
  const sourcePath = join(root, sourceFile);
  const source = readFileSync(sourcePath, "utf8");
  const noindex = /<meta\b[^>]*name="robots"[^>]*content="[^"]*\bnoindex\b/i.test(source);
  const canonical = source.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  if (!noindex && (!canonical || !sitemapUrls.has(canonical))) fail(`${sourceFile}: published page needs a sitemap URL or noindex`);
  if (/<style\b|\sstyle\s*=|\son[a-z]+\s*=/i.test(source)) {
    fail(`${sourceFile}: inline style or event handler conflicts with CSP`);
  }
  for (const [video] of source.matchAll(/<video\b[^>]*>/gi)) {
    if (!/\bposter="[^"]+"/.test(video)) fail(`${sourceFile}: video needs a poster`);
    if (/\sautoplay(?:\s|>|=)/i.test(video)) fail(`${sourceFile}: native autoplay bypasses reduced-motion preferences`);
  }
  const references = [...source.matchAll(/\b(?:href|src|poster)=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );
  for (const [, link] of source.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    if (!/^(?:https?:|mailto:|tel:|\/\/)/i.test(link) && /[?&]v=/.test(link)) fail(`${sourceFile}: internal page link must not carry a version query: ${link}`);
  }

  for (const rawReference of references) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(rawReference)) continue;
    localReferenceCount += 1;
    const target = resolveLocalTarget(sourceFile, rawReference);
    if (!target) {
      fail(`${sourceFile}: missing local target ${rawReference}`);
      continue;
    }

    const fragment = rawReference.includes("#")
      ? rawReference.slice(rawReference.indexOf("#") + 1)
      : "";
    if (!fragment) continue;

    let decodedFragment;
    try {
      decodedFragment = decodeURIComponent(fragment);
    } catch {
      fail(`${sourceFile}: invalid fragment encoding in ${rawReference}`);
      continue;
    }
    const targetSource = readFileSync(target, "utf8");
    const escapedFragment = decodedFragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!new RegExp(`(?:id|name)=["']${escapedFragment}["']`).test(targetSource)) {
      fail(`${sourceFile}: missing fragment ${decodedFragment} in ${relative(root, target)}`);
    }
  }

  const versionPatterns = [
    /\?v=([0-9]+(?:\.[0-9]+)*)/g,
    /data-site-version=["']v([0-9]+(?:\.[0-9]+)*)["']/g,
    /Web By Elie · v([0-9]+(?:\.[0-9]+)*)/g,
    /Version v([0-9]+(?:\.[0-9]+)*)/g,
  ];
  for (const pattern of versionPatterns) {
    for (const match of source.matchAll(pattern)) {
      if (match[1] !== version) {
        fail(`${sourceFile}: version ${match[1]} does not match VERSION ${version}`);
      }
    }
  }
}

for (const homepage of ["index.html", "fr/index.html", "es/index.html"]) {
  const source = readFileSync(join(root, homepage), "utf8");
  if (!source.includes(`data-site-version="${expectedVersion}"`)) {
    fail(`${homepage}: missing ${expectedVersion} site-version marker`);
  }
}

const generatedFiles = [
  "index.html",
  "fr/index.html",
  "es/index.html",
  ...["", "fr", "es"].flatMap((locale) =>
    ["refresh", "seo", "ai-ready", "cost-cleanup"].map((service) =>
      join(locale, "services", service, "index.html"),
    ),
  ),
];

const generationRoot = mkdtempSync(join(tmpdir(), "webbyelie-site-check-"));
try {
  mkdirSync(join(generationRoot, "assets"), { recursive: true });
  mkdirSync(join(generationRoot, "scripts"), { recursive: true });
  cpSync(join(root, "VERSION"), join(generationRoot, "VERSION"));
  cpSync(join(root, "index.html"), join(generationRoot, "index.html"));
  cpSync(join(root, "assets", "i18n.js"), join(generationRoot, "assets", "i18n.js"));
  cpSync(
    join(root, "scripts", "generate-localized-pages.mjs"),
    join(generationRoot, "scripts", "generate-localized-pages.mjs"),
  );
  execFileSync(process.execPath, ["scripts/generate-localized-pages.mjs"], {
    cwd: generationRoot,
    stdio: "pipe",
  });

  for (const generatedFile of generatedFiles) {
    const expectedPath = join(generationRoot, generatedFile);
    const actualPath = join(root, generatedFile);
    if (!existsSync(expectedPath)) {
      fail(`generator did not produce ${generatedFile}`);
      continue;
    }
    if (!existsSync(actualPath)) {
      fail(`repository is missing generated file ${generatedFile}`);
      continue;
    }
    if (readFileSync(expectedPath, "utf8") !== readFileSync(actualPath, "utf8")) {
      fail(`${generatedFile}: committed page differs from generator output`);
    }
  }
} finally {
  rmSync(generationRoot, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(
    `Site checks passed: ${publicHtml.length} HTML files, ${localReferenceCount} local references, ${generatedFiles.length} generated pages, version ${expectedVersion}.`,
  );
}
