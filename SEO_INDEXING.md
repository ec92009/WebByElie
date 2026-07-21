# Web By Elie Search Indexing

Current public version: `v143.9`

Last account-side indexing run: 2026-06-26

## Public URLs To Submit

- Production: `https://web-by-elie.com/`
- Sitemap: `https://web-by-elie.com/sitemap.xml`
- Robots: `https://web-by-elie.com/robots.txt`
- LLM summary: `https://web-by-elie.com/llms.txt`
- Golden Years case study: `https://web-by-elie.com/case-studies/golden-years/`

## Google Search Console

Status: verified and submitted.

1. Added the domain property for `web-by-elie.com`.
2. Verified ownership with a Cloudflare DNS TXT record.
3. Submitted `https://web-by-elie.com/sitemap.xml`.
4. Confirmed sitemap status: Success, last read 2026-06-26, 6 discovered pages.
5. Inspected and requested indexing for:
   - `https://web-by-elie.com/`: Page is indexed.
   - `https://web-by-elie.com/fr/`: Discovered, currently not indexed.
   - `https://web-by-elie.com/es/`: Discovered, currently not indexed.

The Google verification value is intentionally not stored in this repo.

## Bing Webmaster Tools

Status: verified and submitted.

1. Added site `https://web-by-elie.com/`.
2. Verified ownership with a Cloudflare DNS CNAME record.
3. Submitted `https://web-by-elie.com/sitemap.xml`.
4. Confirmed sitemap status: submitted successfully, Processing, 1 known sitemap, 0 errors, 0 warnings.
5. Inspected and requested indexing for:
   - `https://web-by-elie.com/`: Indexed successfully, URL can appear on Bing.
   - `https://web-by-elie.com/fr/`: Not discovered yet, indexing requested.
   - `https://web-by-elie.com/es/`: Not discovered yet, indexing requested.

Bing flagged one homepage SEO/GEO notice for the logo image alt text. The visible brand mark now has a meaningful `alt`, and that fix remains present in `v143.9`.

The Bing verification value is intentionally not stored in this repo.

## Follow-Up Checks

- Recheck Google coverage for `/fr/` and `/es/` after Search Console processes the indexing requests.
- Recheck Bing sitemap processing after the dashboard's processing window, especially discovered URL count.
- Re-run Bing URL Inspection for the homepage after `v143.9` is deployed and crawled to confirm the logo alt notice clears.

## Pages To Check

- `https://web-by-elie.com/`
- `https://web-by-elie.com/fr/`
- `https://web-by-elie.com/es/`
- `https://web-by-elie.com/case-studies/golden-years/`
- `https://web-by-elie.com/privacy`
- `https://web-by-elie.com/terms`
- `https://web-by-elie.com/data-deletion`

Expected technical signals:

- `200` response for canonical URLs.
- Canonical tags point to the production URL shape.
- Home pages include `hreflang` alternates for English, French, Spanish, and `x-default`.
- Home pages include `Organization`, `ProfessionalService`, `WebSite`, `OfferCatalog`, and `FAQPage` JSON-LD.
- Open Graph and Twitter card metadata are present.
- `robots.txt` allows compliant search and AI discovery crawlers.
