# Web By Elie

Static public-facing site for Web By Elie, a small-business web presence offer.

Current visible version: `v118.0`

Production URL: `https://web-by-elie.com/`

Preview URL: `https://ec92009.github.io/WebByElie/?v=118.0`

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
- `fr/index.html`, `es/index.html`: static localized homepages with hreflang metadata.
- `assets/styles.css`: site styling.
- `assets/i18n.js`: English, French, and Spanish site copy.
- `assets/theme.js`: settings popover, language switching, day/night mode, glass controls, reveal effects, and mobile sticky CTA.
- `apple-touch-icon.png`, `site.webmanifest`, `assets/icon-192.png`, `assets/icon-512.png`: mobile home-screen and browser install icons.
- `assets/web-refresh-workspace.png`: generated shared hero image.
- `robots.txt`, `sitemap.xml`: production crawl and sitemap basics.
- `privacy.html`, `terms.html`, `data-deletion.html`: baseline public policy pages.
- `privacy/`, `terms/`, `data-deletion/`: extensionless policy routes for static preview and production canonical URLs.
- `llms.txt`: concise public summary for answer-engine crawlers.
- `SEO_INDEXING.md`: Search Console and Bing Webmaster setup/checklist notes.
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
- Home pages include Open Graph/Twitter metadata, JSON-LD structured data, and English/French/Spanish hreflang alternates.
- Canonical policy URLs use extensionless production routes.
- `robots.txt` explicitly allows compliant search and AI discovery crawlers.
- Archived proposal redirect pages remain `noindex, nofollow`.
- Production basics now include `robots.txt`, `sitemap.xml`, and mobile home-screen icon metadata.
- Production is served by Cloudflare Pages project `web-by-elie` (`web-by-elie.pages.dev`), with GitHub Pages retained as the public preview/fallback.
- 3D print/coaster files are kept locally under `private-print-assets/` and ignored by Git.
- Keep DNS and production edge settings in Cloudflare, with GitHub as source control.
