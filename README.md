# Web By Elie

Static public-facing site for Web By Elie, a small-business web presence offer.

Current visible version: `v93.5`

Preview URL: `https://ec92009.github.io/WebByElie/?v=93.5`

Intended domain: `web-by-elie.com`

Contact email: `hello@web-by-elie.com`

## Offer

The current offer has four lanes:

1. Website refresh: clearer pages, better mobile flow, stronger first impression, and simpler contact paths.
2. SEO: page titles, descriptions, local/service wording, headings, links, and search-friendly structure.
3. AI-ready search: plain-language facts, service explanations, and FAQ-style content that reduce guessing.
4. Cost cleanup: unused subscriptions, overlapping tools, paid tiers, renewals, and unclear account ownership.

## Current Direction

The selected public look is `Studio Clean`.

Earlier chooser/proposal artifacts are archived under `Archive/`. The old proposal URLs remain as simple moved pages that point back to the main site.

## Local Preview

```sh
python3 -m http.server 8094
```

Then open `http://localhost:8094/?v=93.5`.

## Files

- `VERSION`: source of truth for the visible site version.
- `index.html`: promoted Studio Clean homepage.
- `assets/styles.css`: site styling.
- `assets/theme.js`: day/night mode toggle.
- `assets/web-refresh-workspace.png`: generated shared hero image.
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

- The site still has `noindex, nofollow` while the offer and domain setup are being shaped.
- Before production launch on `web-by-elie.com`, remove draft-only indexing restrictions if the site should be discoverable.
- Add production basics before launch: `robots.txt`, `sitemap.xml`, custom-domain configuration, and final metadata.
- If the domain is hosted through Cloudflare, keep DNS and production edge settings in Cloudflare, with GitHub as source control.
