import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { publicDirectories, publicRootFiles, publicPages } from "./public-site.mjs";

// Cloudflare publishes only this allowlisted static site, never the source tree.
const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist");
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const file of [...publicRootFiles, ...publicPages.filter((page) => !page.includes("/"))]) {
  cpSync(join(root, file), join(output, file));
}
const pages = new Set(publicPages);
for (const directory of publicDirectories) {
  cpSync(join(root, directory), join(output, directory), {
    recursive: true,
    filter: (source) => !source.endsWith(".html") || pages.has(relative(root, source)),
  });
}
mkdirSync(join(output, ".wst"));
const manifest = JSON.parse(readFileSync(join(root, ".wst/site.json"), "utf8"));
const monitor = manifest.monitorability;
const publicManifest = {
  manifest_version: manifest.manifest_version,
  site_id: manifest.site_id,
  name: manifest.name,
  production_url: manifest.production_url,
  operational_state: manifest.operational_state,
  beacon_verified: manifest.beacon_verified,
  monitorability: {
    contract_version: monitor.contract_version,
    route_scope: monitor.route_scope,
    surfaces: monitor.surfaces.filter((surface) => surface.environment === "production").map(({ environment, url, version_url }) => ({ environment, url, version: readFileSync(join(root, "VERSION"), "utf8").trim(), version_url })),
    cta_ids: monitor.cta_ids,
    privacy_profile: monitor.privacy_profile,
    collector_url: monitor.collector_url,
    capabilities: Object.fromEntries(Object.entries(monitor.capabilities).map(([key, { state, freshness_hours }]) => [key, { state, freshness_hours }])),
  },
};
writeFileSync(join(output, ".wst/site.json"), JSON.stringify(publicManifest, null, 2) + "\n");
console.log("Public static output ready in dist (no source, credentials, or working notes).");
