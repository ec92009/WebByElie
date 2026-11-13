# November 13 audit remediation

Local candidate: **v317.1**, not pushed or deployed. The six numbered tasks were accepted; the two owner decisions below remain deferred. The original brief is preserved alongside this report.

| Task | Commit | Main changed files | Verification |
| --- | --- | --- | --- |
| 1. Security headers | `2976727` | `_headers`, `scripts/security-headers.mjs`, `scripts/check-site.mjs`, `scripts/public-site.mjs`, `scripts/build-public.mjs`, desktop-mail pages/CSS, restaurant styles/icons/menu JS; active version surfaces | CSP hashes cover every published JSON-LD block; inline CSS moved to files; data favicons moved to SVG files; Lima's dynamic CSS uses property assignment. Source checks pass and all page types were loaded with CSP enforced, without CSP errors. |
| 2. Publish boundary | `071eace` | `scripts/public-site.mjs`, `scripts/build-public.mjs`, `scripts/check-site.mjs`, restaurant pages, archived legacy pages | Exactly 31 allowed HTML pages; all are represented in the existing sitemap URL set (including hreflang alternates) or noindex. No archived drafts or source internals in `dist`. Published WST metadata has no approval references or development/preview URLs; source manifest is unchanged. Desktop-mail pages retained. |
| 3. No-JavaScript contact | `c4210a8` | `assets/i18n.js`, `scripts/generate-localized-pages.mjs`, `scripts/check-site.mjs`, three homepages | EN/FR/ES contact sections contain readable noscript addresses, generated from i18n. Generator reproducibility passes. This fallback was verified in HTML source; a browser with JavaScript disabled was not available through the preview controls. |
| 4. Links | `abe6cbc` | Three homepages, localization generator, `assets/styles.css` | Each service link contains its visible heading and preserves its CTA ID. Portfolio overlays are hidden from accessibility/tab order; keyboard stops per card are 1, 2, 1 for distinct destinations. Whole-card targets and hover playback work. Final verification fixes in task 6 preserve compact mobile labels. |
| 5. Posters and motion | `9f33a11` | Eight `assets/*-poster.jpg` files, `scripts/generate-video-posters.mjs`, `assets/theme.js`, generator and generated pages, source checker, `video-sizes.md` | Every published video has a poster. All eight MP4 checksums remain unchanged. Task 6 adds execution tests for load, pageshow, visibility, loadeddata, hover, narrow layout and live reduced-motion changes. Sizes and separate WebM/shorter-loop recommendations are in `video-sizes.md`. |
| 6. Build hygiene and final checks | Commit containing this report | `package.json`, `package-lock.json`, `scripts/generate-sitemap.mjs`, `sitemap.xml`, build/source/output checks, `scripts/serve-public.py`, workflow, `.gitignore`, internal navigation and generated pages, README/SUMMARY/TIMELOG | Root package renamed; scripts preserved. Build generates the same sitemap loc/hreflang set with relevant modification dates. Internal page version queries removed; asset version queries retained. CI checks the public build with full Git history. WST source remains tracked. Shared settings default restored with persisted System/Day/Night choices and EN/FR/ES labels. |

## Acceptance evidence

- `npm test`: passed; 31 public HTML files, 620 local references, 15 reproducible generated pages; WST preparation/consent checks, playback lifecycle checks, syntax and TypeScript checks passed.
- `npm run build:public`: passed for v317.1; exact allowlist, current headers and reduced WST output verified.
- Original sitemap `<loc>` URLs and hreflang alternates are unchanged. Restaurant routes remain excluded.
- Browser QA used `python3 scripts/serve-public.py` on port 8094, serving `dist/` with the global Pages headers. This is local evidence, not a Cloudflare deployment receipt.
- Home, FR, ES, Refresh service detail, Golden Years case study, Privacy, Terms, Data Deletion, all four restaurant demos, the restaurant offer and desktop-mail information page loaded without CSP violations. Lima & Masala's language/menu interaction rendered all six dishes with the expected image positions.
- Settings open/close, Escape focus return, language changes, persisted preferences, Day/Night and System following the emulated OS scheme were checked. The About value and bottom-right pill matched. Transparency/blur extremes were visually inspected. Viewports included 320, 390, 768 and 1280 CSS pixels; no horizontal overflow was observed. Final visual proof is in `screenshots/`.
- Desktop hover playback and narrow-layout landscape playback worked. The final mobile service label measured about 94 CSS pixels within a 269-pixel card, remained visible, and the card corner still linked to the service page.
- Preview diagnostics included collector HTTP 403 responses from localhost and canceled media requests during navigation. These were not CSP violations and do not establish a production analytics receipt. Consent and collector configuration were not changed.
- The pre-existing `.private/` ignore edit is preserved as an unstaged user change. Background implementation and the paused interval are excluded from the active collaboration timelog.

## Needs decision

1. Must the four desktop-mail information/policy URLs remain live for external OAuth or policy references? They remain published and noindex until confirmed.
2. Arrange legal review of the existing `not_required` aggregate analytics consent model for FR/ES visitors. Its behavior is unchanged.

Separate-scope recommendations: consider WebM alternatives and shorter loops; consider reorganizing Remotion/Three/media sources. No source-studio relocation or video re-encoding was performed. Publishing requires a separate instruction.
