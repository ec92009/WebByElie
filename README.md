# Web By Elie

Static public-facing site for Web By Elie, a small-business web presence offer.

Current visible version: `v109.0`

Preview URL: `https://ec92009.github.io/WebByElie/?v=109.0`

Intended domain: `web-by-elie.com`

Contact email: `hello@web-by-elie.com`

## Offer

The current offer has four lanes:

1. Refresh: preserve useful existing work, explore possible looks, and build toward a final sign-off site.
2. Search Engine Optimization: visible and behind-the-scenes checklist work for titles, descriptions, headings, links, service wording, locations, and structure.
3. AI-ready search: clear facts, services, locations, and answers for chat and AI-search systems.
4. Cost cleanup: unused subscriptions, overlapping tools, paid tiers, renewals, and unclear account ownership.

## Current Direction

The selected public look is `Studio Clean`.

Earlier chooser/proposal artifacts are archived under `Archive/`. The old proposal URLs remain as simple moved pages that point back to the main site.

## Local Preview

```sh
python3 -m http.server 8094
```

Then open `http://localhost:8094/`.

## Files

- `VERSION`: source of truth for the visible site version.
- `index.html`: promoted Studio Clean homepage.
- `assets/styles.css`: site styling.
- `assets/theme.js`: settings popover, day/night mode, language preference, glass controls, reveal effects, and mobile sticky CTA.
- `apple-touch-icon.png`, `site.webmanifest`, `assets/icon-192.png`, `assets/icon-512.png`: mobile home-screen and browser install icons.
- `assets/web-refresh-workspace.png`: generated shared hero image.
- `robots.txt`, `sitemap.xml`: production crawl and sitemap basics.
- `privacy.html`, `terms.html`, `data-deletion.html`: baseline public policy pages.
- `SUMMARY.md`: current project handoff and backlog.
- `TIMELOG.md`: active collaboration timelog.

## Workflow Notes

- Follow `~/Dev/AGENTS.md` first, then this repo's `AGENTS.md`.
- Follow `~/Dev/.SOPs/VERSIONING_SOP.md` for visible site changes.
- Follow `~/Dev/.SOPs/TIMELOG_SOP.md` and keep `TIMELOG.md` current.
- Follow `~/Dev/.SOPs/CHOOSER_WORKFLOW_SOP.md` when using temporary site/look choosers.
- Public-facing changes should be committed and pushed once complete unless the user asks otherwise.

## Launch Notes

- Public pages are indexable and include canonical metadata for `https://web-by-elie.com/`.
- Archived proposal redirect pages remain `noindex, nofollow`.
- Production basics now include `robots.txt`, `sitemap.xml`, and mobile home-screen icon metadata.
- 3D print/coaster files are kept locally under `private-print-assets/` and ignored by Git.
- If the domain is hosted through Cloudflare, keep DNS and production edge settings in Cloudflare, with GitHub as source control.
