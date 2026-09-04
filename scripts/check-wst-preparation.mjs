import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const homepages = ["index.html", "fr/index.html", "es/index.html"];
const expectedCtas = [
  "contact_mobile",
  "contact_primary",
  "contact_section",
  "portfolio_adr",
  "portfolio_golden",
  "portfolio_golden_case_study",
  "portfolio_photosbyelie",
  "service_ai_ready",
  "service_cost_cleanup",
  "service_refresh",
  "service_seo",
  "services_overview",
];

for (const homepage of homepages) {
  const source = readFileSync(join(root, homepage), "utf8");
  const ctas = [...new Set([...source.matchAll(/data-wst-cta="([^"]+)"/g)].map((match) => match[1]))].sort();
  assert.deepEqual(ctas, expectedCtas, `${homepage}: stable CTA identifiers differ`);

  const beaconTags = source.match(/<script\b[^>]*\bsrc="(?:\.\.\/)?assets\/wst-beacon\.js"[^>]*><\/script>/g) ?? [];
  assert.equal(beaconTags.length, 1, `${homepage}: expected exactly one WST beacon tag`);
  const beacon = beaconTags[0];
  assert.match(beacon, /data-wst-enabled="true"/);
  assert.match(beacon, /data-wst-endpoint="https:\/\/web-signals-collector\.ec92009\.workers\.dev\/v1\/events"/);
  assert.match(beacon, /data-wst-site="webbyelie"/);
  assert.match(beacon, /data-wst-environment="production"/);
  assert.match(beacon, /data-wst-consent="not_required"/);
  assert.match(beacon, /data-wst-sessionless="true"/);
  assert.equal(source.includes("wst-consent.js"), false, `${homepage}: legacy consent prompt must not load`);
  assert.equal(source.includes("wst-consent.css"), false, `${homepage}: legacy consent styling must not load`);
}

const beaconSource = readFileSync(join(root, "assets/wst-beacon.js"), "utf8");
assert.match(beaconSource, /if \(!config\.enabled\) return;/, "beacon must fail closed before endpoint or listeners");
assert.equal(beaconSource.includes("preventDefault"), false, "beacon must not block navigation");

const themeSource = readFileSync(join(root, "assets/theme.js"), "utf8");
assert.match(themeSource, /versionPillVersion/, "version pill must use the site settings version source");
assert.match(themeSource, /className = "version-pill"/, "version pill must be created on the shared shell");
const styleSource = readFileSync(join(root, "assets/styles.css"), "utf8");
assert.match(styleSource, /\.version-pill\s*\{[\s\S]*position: fixed;/, "version pill must be fixed");
assert.match(styleSource, /\.version-pill\s*\{[\s\S]*bottom: 18px;/, "version pill needs a bottom-right baseline");
assert.match(styleSource, /\.version-pill\s*\{[\s\S]*pointer-events: none;/, "version pill must not block page controls");

const manifest = JSON.parse(readFileSync(join(root, ".wst/site.json"), "utf8"));
assert.equal(manifest.manifest_version, "wst.site.v1");
assert.equal(manifest.site_id, "webbyelie");
assert.equal(manifest.name, "Web By Elie");
assert.equal(manifest.production_url, "https://web-by-elie.com/");
assert.equal(manifest.ownership_verified, true);
assert.equal(manifest.approval_status, "approved");
assert.equal(manifest.beacon_verified, false);
assert.equal(manifest.operational_state, "active");
assert.equal(manifest.monitorability.contract_version, "wst.monitorable.v1");
assert.deepEqual(manifest.monitorability.route_scope, ["/", "/fr/", "/es/"]);
assert.deepEqual(
  [...manifest.monitorability.cta_ids].sort(),
  expectedCtas,
  "manifest CTA identifiers differ from the localized homepages",
);
assert.equal(manifest.monitorability.standards_profile, "elies-websites");
assert.equal(manifest.monitorability.standards_profile_version, "elies-websites.v1");
assert.ok(manifest.monitorability.standards_evidence.length);
assert.ok(manifest.monitorability.standards_next_action);
assert.equal(manifest.monitorability.surfaces.length, 3);
assert.equal(
  manifest.monitorability.surfaces.find((surface) => surface.environment === "preview").url,
  "https://ec92009.github.io/WebByElie/",
);
assert.equal(
  manifest.monitorability.surfaces.find((surface) => surface.environment === "production").url,
  manifest.production_url,
);

console.log("WST pilot checks passed: three localized homepages, stable CTA IDs, fail-closed bootstrap, approved manifest.");
