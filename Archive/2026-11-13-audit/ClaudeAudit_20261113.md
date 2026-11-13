# Task: Remediate the 2026-11-13 audit of Web By Elie (v254.3)

You are working in the repo at `/Users/ecohen/Dev/WebByElie` (static public site for `web-by-elie.com`, deployed to Cloudflare Pages from `dist/`).

## Before you start
- Read `~/Dev/AGENTS.md` if it exists, then the repo `AGENTS.md`, and apply the repo file last.
- Follow `~/Dev/.SOPs/VERSIONING_SOP.md` (bump `VERSION` and the version references) and `~/Dev/.SOPs/TIMELOG_SOP.md` (update `TIMELOG.md`).
- Keep secrets, private client context and unpublished strategy out of source files.
- Local preview: `python3 -m http.server 8094`. Verify with `npm test`.
- Do not touch `.private/`, `node_modules/`, or rendered media files unless a task says so.
- Make one commit per numbered task so each can be reviewed or reverted. Do not push.
- If a task is ambiguous or risky, skip it and list it under "Needs decision" in your final report. Do not guess.

## Tasks (in priority order)

### 1. Security headers
- Add a `_headers` file (Cloudflare Pages format) and include it in the `scripts/build-public.mjs` allowlist so it lands in `dist/`.
- Set a CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`, and `frame-ancestors 'none'`.
- The CSP must allow: same-origin assets, the inline JSON-LD (use a hash; do not use `unsafe-inline` for scripts), and `connect-src` to `https://web-signals-collector.ec92009.workers.dev`. Allow media and images from `'self'`.
- Check every page type (home, `fr/`, `es/`, `services/`, `case-studies/`, the policy pages and the restaurant demos) for inline scripts or styles that the CSP would break, and fix or hash them.
- Extend `scripts/check-site.mjs` to fail if `_headers` is missing or lacks a CSP.

### 2. Stop publishing drafts and internals
- `friendly-local.html`, `practical-advisor.html`, `studio-clean.html` and `desktop-mail-*.html` are legacy or unrelated pages that the build copies. Move the design drafts to `Archive/`. For the `desktop-mail-*` pages, ask first in "Needs decision" whether they must stay live (they may be referenced by an external app's OAuth or policy URLs). Do not delete them without that confirmation.
- Switch the build from "all root `*.html`" to an explicit allowlist, and add a check that every published HTML page is in `sitemap.xml` or marked `noindex`.
- Mark `restaurant-demo*` and `restaurants/` as `noindex` and keep them out of the sitemap.
- Trim `.wst/site.json` in the published output to only what the monitor needs (remove internal approval references and the localhost and preview URLs). Keep the source file intact if `scripts/check-wst-preparation.mjs` requires it, and have the build emit a reduced copy.

### 3. Contact path works without JavaScript
- The "Email Elie" buttons (`data-email-link`, `href="#contact"`) do nothing without JS. Keep the anti-scrape approach, but give a `<noscript>` fallback that shows the address in readable form (for example `hello [at] web-by-elie.com`), on `index.html` and the `fr/` and `es/` generated pages.
- Update `scripts/generate-localized-pages.mjs` (and the i18n source it uses) so the localized pages are regenerated, not hand-edited.

### 4. Service panel and portfolio-card link structure
- Service panels: replace the empty `<a class="panel-link" aria-label=...>` with a link that contains the visible heading text (stretched-link pattern is fine). Videos stay decorative (`aria-hidden`).
- Portfolio cards: remove the duplicate empty full-card `<a class="work-card-hit">`, or make it `tabindex="-1" aria-hidden="true"`, so each card has one keyboard tab stop per destination.
- Keep `data-wst-cta` attributes working. Do not change visual layout beyond what is needed.

### 5. Video and motion
- Add `poster` images to every `<video>` on the site, generated from a frame of each video (use `ffmpeg` if available; otherwise leave a TODO and report).
- Confirm that every `video.play()` path in `assets/theme.js` is skipped when `prefers-reduced-motion: reduce` is set, and fix any that is not.
- Do not re-encode the videos in this task. Report the sizes and recommend WebM and shorter loops instead.

### 6. Repo and build hygiene
- Rename the root package in `package.json` to `web-by-elie` (the current name is `web-by-elie-remotion`). Do not remove any scripts.
- Generate `sitemap.xml` from the build (correct `lastmod` and the existing hreflang alternates) instead of maintaining it by hand. Keep the current URL set.
- Stop adding `?v=<version>` to internal page links (`./?v=...`, `services/...?v=...`). Keep it on asset URLs, or move to content-hashed filenames if the build can do it without breaking `scripts/check-site.mjs`.
- Add `.wrangler/` and `.wst/` handling to `.gitignore` only where they are not tracked. Do not untrack `.wst/site.json`.

## Out of scope (do not do)
- Moving or splitting `Remotion_AG`, `Three_AG`, `remotion` or `outputs`. Report it as a recommendation only.
- Changing pricing, copy or branding.
- Changing the analytics consent model (`data-wst-consent="not_required"`). Flag it in "Needs decision" for a legal check, since the site serves FR and ES visitors.
- Deploying, pushing, or touching Cloudflare settings.

## Done means
- `npm test` passes, and `npm run build:public` produces a `dist/` with no draft pages and with `_headers`.
- The home page, `/fr/`, `/es/`, one service page and the case study load locally on port 8094 with no CSP violations in the browser console, and the settings dialog, language switch and video hover still work.
- The final report lists, per task: the commit hash, files changed, what was verified, and anything skipped. It ends with a "Needs decision" section.
