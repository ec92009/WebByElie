# Web By Elie

Simple static chooser site for Web By Elie, a small-business website refresh, SEO, and AI-search-readiness offer.

## Local Preview

```sh
python3 -m http.server 8094
```

Then open `http://localhost:8094/`.

## Files

- `index.html`: three-option service chooser and sign-off section.
- `assets/styles.css`: site styling.
- `assets/browser-mosaic.svg`: local visual asset for the hero.
- `privacy.html`, `terms.html`, `data-deletion.html`: baseline public policy pages.

## Launch Notes

- The draft currently uses `noindex, nofollow` while the chooser is a review surface.
- Before production launch on `web-by-elie.com`, decide whether the chooser remains public or becomes a simpler homepage.
- If the domain is hosted through Cloudflare, keep DNS and production edge settings in Cloudflare, with GitHub as source control.
