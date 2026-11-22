import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { publishedHtml } from "./public-site.mjs";

export const inlineHash = (source) => `'sha256-${createHash("sha256").update(source).digest("base64")}'`;

export function securityHeaders(root) {
  const hashes = new Set();
  for (const file of publishedHtml(root)) {
    const source = readFileSync(join(root, file), "utf8");
    for (const [, attributes, body] of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/\bsrc\s*=/.test(attributes) && body.trim()) hashes.add(inlineHash(body));
    }
  }
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].sort().join(" ")}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "font-src 'self'",
    "img-src 'self'",
    "media-src 'self'",
    "connect-src 'self' https://web-signals-collector.ec92009.workers.dev https://photosbyelie-checkout-mock.ec92009.workers.dev",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
  const result = `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-Frame-Options: DENY
`;
  if (result.split("\n").some((line) => line.length > 2000)) throw new Error("Pages _headers line exceeds 2,000 characters");
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  writeFileSync(join(root, "_headers"), securityHeaders(root));
  console.log("Updated _headers with hashes of the published inline scripts.");
}
