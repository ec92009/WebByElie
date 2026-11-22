/**
 * Rebuilds the Original snapshot and all three refresh chooser options from
 * chooser/content.mjs. Run from the repo root: node chooser/build-all.mjs
 */
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const scripts = [
  "chooser/build-original.mjs",
  "chooser/variants/option-1/build.mjs",
  "chooser/variants/option-2/build.mjs",
  "chooser/variants/option-3/build.mjs",
];

for (const script of scripts) {
  console.log(`\n==> ${script}`);
  execFileSync(process.execPath, [join(root, script)], { cwd: root, stdio: "inherit" });
}
console.log("\nAll chooser variants rebuilt.");
