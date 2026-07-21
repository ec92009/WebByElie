# Web By Elie Summary

Last updated: 2026-07-21 14:36 CEST

## Current State

- Repo: `/Users/ecohen/Dev/WebByElie`
- Branch: `main`
- Production URL: `https://web-by-elie.com/`
- Production host: Cloudflare Pages project `web-by-elie`
- Public preview: `https://ec92009.github.io/WebByElie/?v=143.2`
- Local preview: `http://localhost:8094/`
- Contact email: `hello@web-by-elie.com`
- Current visible version: `v143.2`
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
- Added SEO/AIO improvements: extensionless canonical policy URLs, static French and Spanish homepages, hreflang sitemap entries, Open Graph/Twitter metadata, JSON-LD structured data, answer-friendly FAQ copy, `llms.txt`, and explicit compliant search/AI crawler policy.
- Completed account-side indexing setup in Google Search Console and Bing Webmaster Tools, including sitemap submission, URL inspection, and indexing requests for the homepage plus French and Spanish routes.
- Fixed Bing's homepage logo alt-text notice and kept that cleanup in `v143.2`.
- Added a localized selected-work showcase featuring Assurances de Rueil, Golden Years Tax Strategy, and Photos By Elie.
- Published an approved Golden Years case study with the owner-approved outcome wording, testimonial, a Web By Elie-aligned visual system, and current screenshots presented in laptop and phone frames.
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
- Current version is `143.2`, displayed as `v143.2`.
- CSS and JS cache-bust query strings should stay in sync with visible versions.
- Public-facing changes are committed and pushed to GitHub.
- Production is deployed through Cloudflare Pages; GitHub Pages remains a preview/fallback URL.
- Search indexing setup notes live in `SEO_INDEXING.md`; Google Search Console and Bing Webmaster Tools are verified, sitemap-submitted, and waiting on crawler processing for the localized routes.
- Public pages are indexable; archived redirect pages remain `noindex, nofollow`.
- Mobile install icons are declared through `apple-touch-icon.png` and `site.webmanifest`.
- Print/coaster files are kept locally in `private-print-assets/` and ignored by Git.

## Timelog

- `TIMELOG.md` was created on 2026-06-01 at 20:03 CEST.
- Clock state is currently `running`.
- Count only active user collaboration time, not Codex background implementation, deploy waits, or idle gaps.

## Fresh Numbered Backlog

1. Monitor search indexing pickup.
   Recheck Google coverage for `/fr/` and `/es/`, Bing sitemap processing, and Bing's homepage logo-alt notice after `v143.2` has deployed and crawlers have processed the requests.

2. Keep Cloudflare Pages deployment repeatable.
   Preserve the clean static publish set for production deploys, keep DNS/HTTPS on Cloudflare, and protect email-related DNS records.

3. Add more approved case studies.
   Golden Years now has a public case study. Add richer proof for the other selected-work examples only after names, screenshots, metrics, and wording are approved.

4. Continue browser/device polish.
   Recheck the homepage, policy pages, sticky header, settings panel, hero image, CTA layout, and service cards when future copy or layout changes land.

5. Do a final policy wording review.
   Confirm Privacy, Terms, and Data Deletion are acceptable for launch and update if forms, analytics, payments, or accounts are added.

6. Keep local print assets private.
   Keep coaster/3D-print files in `private-print-assets/`; do not re-add them to published assets unless explicitly requested.

7. Build a reusable chooser scaffold.
   If more chooser projects repeat this pattern, turn `CHOOSER_WORKFLOW_SOP.md` into a Codex skill or starter template.

8. Keep the timelog current.
   Update `TIMELOG.md` at the end of active collaboration bursts and whenever the clock is paused/resumed.
