# Web By Elie

Static public-facing site for Web By Elie, a small-business web presence offer.

Current visible version: `v247.0`

Production URL: `https://web-by-elie.com/`

Preview URL: `https://ec92009.github.io/WebByElie/?v=247.0`

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

## Verification

```sh
npm test
```

This read-only source check validates public local links and fragments, generated-page reproducibility, visible version/cache-bust consistency, JavaScript syntax, and TypeScript compilation. It does not verify a deployment; production remains a separate browser and live-URL gate.

## Files

- `VERSION`: source of truth for the visible site version.
- `index.html`: promoted Studio Clean homepage.
- `fr/index.html`, `es/index.html`: static localized homepages with hreflang metadata.
- `case-studies/golden-years/`: approved Golden Years Tax Strategy case study with current public-site screenshots.
- `assets/styles.css`: site styling.
- `assets/i18n.js`: English, French, and Spanish site copy.
- `assets/theme.js`: settings popover, language switching, day/night mode, glass controls, reveal effects, mobile sticky CTA, and the fixed version pill sourced from the same release marker as About.
- `apple-touch-icon.png`, `site.webmanifest`, `assets/icon-192.png`, `assets/icon-512.png`: mobile home-screen and browser install icons.
- `assets/web-refresh-workspace.png`: generated shared hero image.
- `assets/web-page-reassembly.mp4`: Standalone Remotion video asset that disassembles and rebuilds a page structure, including a visible copy-scrutiny and rewrite pass.
- `assets/seo-page-flip.mp4`: Standalone Remotion video asset that flips a page open, exposes SEO signals, and shows search robots harvesting them into a big database.
- `assets/aio-recommendations.mp4`: Standalone Remotion video asset where OpenAI and Claude collect the SEO context, nudge Google into the background, and create bullet-point recommendations.
- `assets/savings-cat.mp4`: Standalone Remotion video asset where a fat cat clears the tool noise, finds evaporating dollar signs on the page, catches them, and pockets the savings.
- `assets/service-refresh.mp4`, `assets/service-seo.mp4`, `assets/service-ai-ready.mp4`, `assets/service-cost-cleanup.mp4`: Portrait Antigravity-generated service videos used by the homepage's hover/tap accordion panels.
- `services/`, `fr/services/`, `es/services/`: localized service detail pages linked from the four homepage panels, each with its landscape Remotion video and short description.
- The four detail-page landscape assets are synced from the latest numbered AG renders in `Remotion_AG/outputs/`.
- `public/voiceover/services/`: two-voice service narration generated from the English homepage panel copy.
- `scripts/generate-service-voiceover.mjs`: regenerates the service narration and embeds it into both portrait and landscape MP4 variants.
- `remotion/WebPageReassembly.tsx`: source composition for the standalone page-reassembly video.
- `remotion/SEOPageFlip.tsx`: source composition for the standalone SEO signal video.
- `remotion/AIORecommendations.tsx`: source composition for the standalone AIO recommendations video.
- `remotion/SavingsCat.tsx`: source composition for the standalone savings/cost-cleanup video.
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

- The WST pilot counts aggregate homepage page views and marked CTA presses by default in a cookieless, sessionless mode. It never creates a visitor/session identifier, so Visits and session attribution are unavailable. The footer notice discloses the measurement; Global Privacy Control and Do Not Track suppress collection. Cloudflare is the canonical production surface; GitHub Pages remains a separate phone-test preview and stays outside production totals. `?wst_test=1` marks owner verification as synthetic, excluded from business totals.
- The collector endpoint is `https://web-signals-collector.ec92009.workers.dev/v1/events`. Contact clicks have no delivery receipt and must not be reported as accepted conversions.
- Public policy copy describes the aggregate measurement, sessionless processing, browser privacy signals and retention. The public `.wst/site.json` declaration is approved; live receipt verification is recorded separately in the WST registry/ticket.

- Public pages are indexable and include canonical metadata for `https://web-by-elie.com/`.
- Home pages include Open Graph/Twitter metadata, JSON-LD structured data, and English/French/Spanish hreflang alternates.
- The homepage includes a localized selected-work section for Assurances de Rueil, Golden Years Tax Strategy, and Photos By Elie, with a public Golden Years case-study link.
- Google Search Console and Bing Webmaster Tools are verified, with the sitemap submitted and key URLs requested for indexing.
- Canonical policy URLs use extensionless production routes.
- `robots.txt` explicitly allows compliant search and AI discovery crawlers.
- Archived proposal redirect pages remain `noindex, nofollow`.
- Production basics now include `robots.txt`, `sitemap.xml`, and mobile home-screen icon metadata.
- Production is served by Cloudflare Pages project `web-by-elie` (`web-by-elie.pages.dev`), with GitHub Pages retained as the public preview/fallback.
- Cloudflare builds with `node scripts/build-public.mjs` and publishes `dist/`, an allowlisted public-file bundle. The prior production deployment `68c36c81-b8f2-4642-83e3-6845268fc0bd` is the pre-WST rollback point.
- 3D print/coaster files are kept locally under `private-print-assets/` and ignored by Git.
- Keep DNS and production edge settings in Cloudflare, with GitHub as source control.
