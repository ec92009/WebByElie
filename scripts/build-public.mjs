import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

// Cloudflare publishes only this allowlisted static site, never the source tree.
const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist");
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
const rootFiles = new Set(["VERSION", "robots.txt", "sitemap.xml", "llms.txt", "site.webmanifest", "apple-touch-icon.png"]);
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && (entry.name.endsWith(".html") || rootFiles.has(entry.name))) cpSync(join(root, entry.name), join(output, entry.name));
}
for (const directory of ["assets", "fr", "es", "services", "case-studies", "privacy", "terms", "data-deletion"]) {
  cpSync(join(root, directory), join(output, directory), { recursive: true });
}
mkdirSync(join(output, ".wst"));
cpSync(join(root, ".wst/site.json"), join(output, ".wst/site.json"));
console.log("Public static output ready in dist (no source, credentials, or working notes).");
