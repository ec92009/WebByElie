# Web By Elie refresh chooser: builder brief

Owner request: "A refresh of this web site. 3 alternative versions, distinctly
different from each other. A chooser with the current version and the 3 new
options. Animated, all pages, a fresh take on the whole site. Show new
activities beyond the existing four (refresh / SEO / AIO / save money)."

Follows `~/Dev/.SOPs/CHOOSER_WORKFLOW_SOP.md`: full-page options, a fixed
`1 + n` bar (Original, Option 1, Option 2, Option 3) on every page, noindex.

## Layout

```
chooser/
  index.html            redirect to variants/original/
  content.mjs           SHARED COPY: import everything from here, do not fork text
  chooser-nav.css/.js   the 1+n bar (do not edit)
  build-original.mjs    copies the live v317.1 pages into variants/original/
  variants/
    original/           current site (generated)
    option-1/           Paper & Ink
    option-2/           Night Signal
    option-3/           Toybox
```

Each option folder owns: `build.mjs` (Node ESM, no dependencies, generates
all HTML from `../../content.mjs`), its CSS, JS, fonts, and any SVG/image
assets. Run with `node chooser/variants/<id>/build.mjs` from the repo root.

## Required pages (relative to the option root, see `pages` in content.mjs)

| Path | Content |
| --- | --- |
| `index.html` | Home: hero, the 4 core services, the 6 new services, process, work, about, savings, budget, FAQ, contact |
| `services/index.html` | All 10 services, core vs new clearly grouped |
| `services/<slug>/index.html` | 10 detail pages (summary, bullets, deliverables, motif animation, related services, CTA). Core ones may use the existing mp4 video. `menus` shows pricing + the 4 demo links |
| `work/index.html` | 3 portfolio projects |
| `work/golden-years/index.html` | Case study (steps, quote, desktop + mobile screenshots) |
| `process/index.html` | Process steps, budget, savings spots, FAQ |
| `check/index.html` | Interactive "Free site check": the 8 `checkQuestions`, yes/no, animated score, recommended services from "no" answers, mailto CTA (`site.mailtoCheck`) |

## Every page must

- Include `chooserHead(path)` in `<head>`, `chooserBar(id, path)` as the first
  child of `<body>`, `chooserScript(path)` before `</body>`, and
  `<body data-proposal="<id>" data-page="<path>">` (path like `services/seo/`,
  `""` for home).
- Offset any sticky/fixed header with `top: var(--chooser-h)`.
- Use relative URLs only. Option-internal links via `toOptionRoot(path)`;
  repo assets (videos, posters, work screenshots, logo, case-study images,
  restaurant demos) via `toRepoRoot(path)` + the path from content.mjs.
- Share one primary nav: Services, Work, Process, Free check, and an "Email
  Elie" CTA (`site.mailto`). Footer: version label "Refresh draft", links to
  the live Privacy / Terms / Data deletion (`toRepoRoot(path)+"privacy.html"` etc).
- Mark new services with a small "New" badge.

## Technical rules (keep it promotable to production)

- No CDNs, no frameworks, no npm packages. Vanilla JS + CSS. Fonts are
  self-hosted woff2 in the option folder (download from Google Fonts with
  curl, include the OFL licence note in a comment) or system stacks.
- No inline `<script>` code and no `style="..."` attributes (production CSP is
  `script-src 'self'; style-src 'self'`). JSON-LD blocks are allowed.
  Set CSS custom properties from JS via `el.style.setProperty` if needed.
- Respect `prefers-reduced-motion`: content must be fully visible and usable
  with motion off, and if JS fails (no content hidden by default without a
  `.js` class gate).
- Responsive from 320px to 1600px wide with no horizontal overflow.
- Accessible: semantic landmarks, one h1 per page, alt text, visible focus,
  keyboard-usable interactive parts, contrast AA.
- Pause off-screen canvas/video loops (IntersectionObserver), cap DPR at 2.
- Keep individual source files under ~400 lines where practical; split
  templates into modules inside the option folder.

## Honesty rules

Use only copy from `content.mjs` for facts. Short decorative microcopy is fine
(e.g. section labels), but never invent results, stats, testimonials, client
names, guarantees, or prices. Illustrative UI (fake search results, a mock
assistant answer about "your business") must be clearly generic.

## Design directions (must stay distinctly different)

1. **Paper & Ink** (option-1): warm editorial print. Light, serif display.
2. **Night Signal** (option-2): dark cinematic tech. Canvas, glow, mono.
3. **Toybox** (option-3): bright playful bento. Bouncy, stickers, mascots.
