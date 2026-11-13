import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { publicPages } from "./public-site.mjs";
import { securityHeaders } from "./security-headers.mjs";

export function checkPublicBuild(output, root) {
  const walk = (directory, prefix = "") => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(prefix, entry.name);
    return entry.isDirectory() ? walk(join(directory, entry.name), file) : [file];
  });
  const files = walk(output);
  assert.deepEqual(files.filter((file) => file.endsWith(".html")).sort(), [...publicPages].sort(), "Built HTML must match the page allowlist exactly");
  assert.equal(readFileSync(join(output, "_headers"), "utf8"), securityHeaders(root), "Built security headers must be current");
  const manifestSource = readFileSync(join(output, ".wst/site.json"), "utf8");
  assert.doesNotMatch(manifestSource, /localhost|github\.io|approval|owner_role|next_action|standards_evidence/, "Published monitor declaration must omit internal preparation details");
  assert.equal(files.some((file) => /^(?:Archive|scripts|\.private|\.git|Remotion_AG|Three_AG|outputs)\//.test(file)), false, "Internal directories must not be published");
  console.log(`Public build checks passed: ${publicPages.length} allowed pages, current headers, reduced monitor declaration.`);
}
