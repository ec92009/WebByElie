import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const version = readFileSync(join(root, "VERSION"), "utf8").trim();
const expectedVersion = `v${version}`;
const ignoredDirectories = new Set([
  ".git",
  ".playwright-cli",
  "Archive",
  "Remotion_AG",
  "Three_AG",
  "node_modules",
  "dist",
  "output",
  "outputs",
]);
const failures = [];

const fail = (message) => failures.push(message);

const walkHtml = (directory, prefix = "") => {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const relativePath = join(prefix, entry.name);
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtml(absolutePath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(relativePath);
    }
  }
  return files;
};

const publicHtml = walkHtml(root).sort();

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
  const references = [...source.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );

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
