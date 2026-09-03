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
  assert.match(beacon, /data-wst-enabled="false"/);
  assert.match(beacon, /data-wst-endpoint=""/);
  assert.match(beacon, /data-wst-site="webbyelie"/);
  assert.match(beacon, /data-wst-environment="production"/);
  assert.match(beacon, /data-wst-consent="unknown"/);
}

const beaconSource = readFileSync(join(root, "assets/wst-beacon.js"), "utf8");
assert.match(beaconSource, /if \(!config\.enabled\) return;/, "beacon must fail closed before endpoint or listeners");
assert.equal(beaconSource.includes("preventDefault"), false, "beacon must not block navigation");

const manifest = JSON.parse(readFileSync(join(root, ".wst/site.json"), "utf8"));
assert.deepEqual(manifest, {
  manifest_version: "wst.site.v1",
  site_id: "webbyelie",
  name: "Web By Elie",
  production_url: "https://web-by-elie.com/",
  ownership_verified: true,
  approval_status: "awaiting",
  beacon_verified: false,
  operational_state: "active",
});

console.log("WST preparation checks passed: three localized homepages, stable CTA IDs, disabled beacon, awaiting manifest.");
