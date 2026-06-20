# Web By Elie Summary

Last updated: 2026-06-20 19:00 CEST

## Current State

- Repo: `/Users/ecohen/Dev/WebByElie`
- Branch: `main`
- Public preview: `https://ec92009.github.io/WebByElie/?v=112.0`
- Local preview: `http://localhost:8094/`
- Intended domain: `web-by-elie.com`
- Contact email: `hello@web-by-elie.com`
- Current visible version: `v112.0`
- Selected look: `Studio Clean`
- Active timelog: `TIMELOG.md`

## What We Built

- Created a static Web By Elie site for small-business web refresh work.
- Started with a chooser workflow, then corrected the chooser from service choices to visual website look choices.
- Built three full proposal pages:
  - `Friendly Local`
  - `Studio Clean`
  - `Practical Advisor`
- Promoted `Studio Clean` as the main site.
- Archived the chooser and losing proposals under `Archive/`.
- Left old proposal URLs as simple moved pages that route back to the main site.
- Added a shared generated hero image showing a geeky desk setup with two monitors, compact desktop computer, keyboard, mouse, notebook, and coffee.
- Added a gear settings panel through `assets/theme.js`, including day/night mode and display preferences.
- Added public policy pages: Privacy, Terms, and Data Deletion.
- Added launch crawl basics: `robots.txt`, `sitemap.xml`, canonical metadata, and indexable public pages.
- Added mobile home-screen and browser install icon metadata using the Web By Elie logo.
- Added generated logo, QR assets, and a local-only print/coaster asset folder.
- Added the site to the Webapps hub at `/Users/ecohen/Dev/Webapps`.
- Upgraded the public site with a unified gear settings panel, day/night segmented control, English/French/Spanish translated copy, glass transparency/translucency sliders, reveal effects, and a phone sticky email CTA.

## Current Offer Copy

The site now presents four service lanes:

1. Refresh: preserve useful existing work, explore possible looks, and build toward a final sign-off site.
2. Search Engine Optimization: visible and behind-the-scenes checklist work for titles, descriptions, headings, links, service wording, locations, and structure.
3. AI-ready search: clear facts, services, locations, and answers for chat and AI-search systems.
4. Cost cleanup: unused subscriptions, overlapping tools, paid tiers, renewals, and unclear ownership.

The money-saving angle was added after discussing work with Magali: in addition to improving web presence, Web By Elie can help small businesses reduce avoidable web/tooling spend.

## Shared SOPs Created Or Used

- `~/Dev/.SOPs/VERSIONING_SOP.md`: canonical version source and calendar visible versions.
- `~/Dev/.SOPs/TIMELOG_SOP.md`: active collaboration tracking.
- `~/Dev/.SOPs/CHOOSER_WORKFLOW_SOP.md`: newly created to memorialize site/look chooser workflow.
- `~/Dev/.SOPs/PUBLIC_WEBSITE_POLICY_PAGES_SOP.md`: policy page expectation.
- `~/Dev/.SOPs/STATIC_WEBSITE_GITHUB_CLOUDFLARE_SOP.md`: GitHub/Cloudflare responsibilities.

## Version And Publishing Notes

- `VERSION` is the source of truth for visible site version numbers.
- Current version is `112.0`, displayed as `v112.0`.
- CSS and JS cache-bust query strings should stay in sync with visible versions.
- Public-facing changes are committed and pushed to GitHub.
- Public pages are indexable; archived redirect pages remain `noindex, nofollow`.
- Mobile install icons are declared through `apple-touch-icon.png` and `site.webmanifest`.
- Print/coaster files are kept locally in `private-print-assets/` and ignored by Git.

## Timelog

- `TIMELOG.md` was created on 2026-06-01 at 20:03 CEST.
- Clock state is currently `running`.
- Count only active user collaboration time, not Codex background implementation, deploy waits, or idle gaps.

## Fresh Numbered Backlog

1. Prepare custom-domain launch.
   Configure `web-by-elie.com` using the GitHub/Cloudflare SOP, verify DNS/HTTPS, and preserve email-related records.

2. Continue browser/device polish.
   Recheck the homepage, policy pages, sticky header, settings panel, hero image, CTA layout, and service cards when future copy or layout changes land.

3. Decide whether to keep GitHub Pages as preview only.
   If production should live on Cloudflare Pages, prepare that deployment path and keep GitHub Pages as a public preview/fallback.

4. Do a final policy wording review.
   Confirm Privacy, Terms, and Data Deletion are acceptable for launch and update if forms, analytics, payments, or accounts are added.

5. Keep local print assets private.
   Keep coaster/3D-print files in `private-print-assets/`; do not re-add them to published assets unless explicitly requested.

6. Build a reusable chooser scaffold.
   If more chooser projects repeat this pattern, turn `CHOOSER_WORKFLOW_SOP.md` into a Codex skill or starter template.

7. Keep the timelog current.
   Update `TIMELOG.md` at the end of active collaboration bursts and whenever the clock is paused/resumed.
