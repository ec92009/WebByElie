# Web By Elie Summary

Last updated: 2026-06-01 20:06 CEST

## Current State

- Repo: `/Users/ecohen/Dev/WebByElie`
- Branch: `main`
- Public preview: `https://ec92009.github.io/WebByElie/?v=93.5`
- Local preview: `http://localhost:8094/?v=93.5`
- Intended domain: `web-by-elie.com`
- Contact email: `hello@web-by-elie.com`
- Current visible version: `v93.5`
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
- Added a day/night mode toggle through `assets/theme.js`.
- Added public policy pages: Privacy, Terms, and Data Deletion.
- Added the site to the Webapps hub at `/Users/ecohen/Dev/Webapps`.

## Current Offer Copy

The site now presents four service lanes:

1. Website refresh: clearer pages, mobile flow, first impression, and contact paths.
2. SEO: titles, descriptions, local/service wording, headings, links, and structure.
3. AI-ready search: plain-language facts, service explanations, and FAQ-style content.
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
- Current version is `93.5`, displayed as `v93.5`.
- CSS and JS cache-bust query strings should stay in sync with visible versions.
- Public-facing changes are committed and pushed to GitHub.
- GitHub Pages preview has been verified for `v93.5`.

## Timelog

- `TIMELOG.md` was created on 2026-06-01 at 20:03 CEST.
- Clock state is currently `running`.
- Count only active user collaboration time, not Codex background implementation, deploy waits, or idle gaps.

## Fresh Numbered Backlog

1. Finalize production-readiness basics.
   Add `robots.txt`, `sitemap.xml`, canonical metadata, and decide when to remove `noindex, nofollow`.

2. Tighten homepage copy.
   Refine the cost-cleanup language, make the four lanes feel balanced, and decide whether the hero should mention savings more directly.

3. Prepare custom-domain launch.
   Configure `web-by-elie.com` using the GitHub/Cloudflare SOP, verify DNS/HTTPS, and preserve email-related records.

4. Add lightweight proof/process detail.
   Add a small section explaining how the work starts: current-site review, priorities, edits, handoff, and optional cost cleanup notes.

5. Improve mobile polish.
   Check the four service cards, sticky header, theme toggle, hero image, and CTA layout at phone widths.

6. Decide whether to keep GitHub Pages as preview only.
   If production should live on Cloudflare Pages, prepare that deployment path and keep GitHub Pages as a public preview/fallback.

7. Build a reusable chooser scaffold.
   If more chooser projects repeat this pattern, turn `CHOOSER_WORKFLOW_SOP.md` into a Codex skill or starter template.

8. Keep the timelog current.
   Update `TIMELOG.md` at the end of active collaboration bursts and whenever the clock is paused/resumed.
