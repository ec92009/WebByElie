# Web By Elie Search Indexing

Current public version: `v118.0`

## Public URLs To Submit

- Production: `https://web-by-elie.com/`
- Sitemap: `https://web-by-elie.com/sitemap.xml`
- Robots: `https://web-by-elie.com/robots.txt`
- LLM summary: `https://web-by-elie.com/llms.txt`

## Google Search Console

Status: ready for account-side setup.

1. Add property for `https://web-by-elie.com/`.
2. Verify ownership with a DNS TXT record or an HTML verification file.
3. Submit `https://web-by-elie.com/sitemap.xml`.
4. Inspect the homepage URL after deployment.
5. Request indexing after the production deploy is live.

No Google verification token is stored in this repo yet.

## Bing Webmaster Tools

Status: ready for account-side setup.

1. Add site `https://web-by-elie.com/`.
2. Verify ownership with DNS TXT, XML, or meta tag verification.
3. Submit `https://web-by-elie.com/sitemap.xml`.
4. Use URL inspection for the homepage and localized pages.

No Bing verification token is stored in this repo yet.

## Pages To Check

- `https://web-by-elie.com/`
- `https://web-by-elie.com/fr/`
- `https://web-by-elie.com/es/`
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
