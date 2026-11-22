/**
 * Shared content for the Web By Elie refresh chooser.
 *
 * Every proposal (Option 1..3) renders the SAME facts from this module so the
 * comparison stays about look, motion, and structure. Copy for the four
 * existing services is taken from the live site; the "new" services are draft
 * proposals for the owner to validate before anything is published.
 *
 * Honesty rules baked into this copy (keep them when editing):
 * - No ranking, traffic, lead, AI-answer placement, or savings is guaranteed.
 * - The only client result quoted is the Golden Years owner statement.
 * - Prices: $100/hour general work, 10-hour starting bundle.
 */

export const site = {
  name: "Web By Elie",
  domain: "web-by-elie.com",
  email: "hello@web-by-elie.com",
  mailto: "mailto:hello@web-by-elie.com?subject=Web%20By%20Elie%20intro",
  mailtoCheck: "mailto:hello@web-by-elie.com?subject=Free%20site%20check&body=My%20website%3A%20",
  tagline: "New look, better reach.",
  lede:
    "Upgrade your website so it looks better, is easier for people, search engines, and AI assistants to find, and quietly stops costing more than it should.",
  audience: "Independent businesses that already have a website, or the web tools around one.",
  rate: "$100/hour",
  bundle: "10-hour starting bundle",
  logo: "assets/web-by-elie-logo.svg",
  heroImage: "assets/web-refresh-workspace.png",
};

/** The four pillars: existing services, copy from the live site. */
export const coreServices = [
  {
    slug: "refresh",
    num: "01",
    name: "Refresh",
    short: "A better look, without throwing away the work you already did.",
    summary:
      "You have already put real work into the current site. We preserve what is working, create a palette of possible looks, and help you choose and combine options into the final sign-off site.",
    bullets: [
      "Short intake interview and a review of what already works",
      "A small palette of real, clickable design directions",
      "Mix pieces between options, including your current site",
      "Final pages tightened for mobile, speed, and sign-off",
    ],
    deliverables: ["Side-by-side design chooser", "Chosen direction built out", "Mobile and launch checklist"],
    video: "assets/service-refresh.mp4",
    videoMobile: "assets/web-page-reassembly.mp4",
    poster: "assets/service-refresh-poster.jpg",
    motif: "reassemble",
  },
  {
    slug: "seo",
    num: "02",
    name: "SEO",
    short: "Precise, practical search basics that people and crawlers can read.",
    summary:
      "Search Engine Optimization is precise, but practical. Search engines read visible content and behind-the-scenes page details, so we work through a checklist: titles, descriptions, headings, links, service wording, locations, and structure.",
    bullets: [
      "Titles and descriptions written for real searches",
      "Headings, links, and service wording that match intent",
      "Locations and structured data where they apply",
      "Sitemap, canonical, and indexing checks",
    ],
    deliverables: ["Page-by-page checklist", "Rewritten metadata", "Indexing verification"],
    video: "assets/service-seo.mp4",
    videoMobile: "assets/seo-page-flip.mp4",
    poster: "assets/service-seo-poster.jpg",
    motif: "search",
  },
  {
    slug: "ai-ready",
    num: "03",
    name: "AI-ready",
    short: "Make the facts easy for ChatGPT, Gemini, and Google AI results to get right.",
    summary:
      "Many searches now start in a chat box, from ChatGPT to Google AI results. We make the basic facts easier to understand: who the business serves, what it offers, where it works, and which answers belong on the site.",
    bullets: [
      "Test whether an assistant can name your services, area, and next step",
      "Find missing or conflicting facts across pages",
      "Plain-language answers and structured business data",
      "An llms.txt summary and quotable FAQ blocks",
    ],
    deliverables: ["AI-readability review", "Fact corrections", "Answer-ready FAQ"],
    video: "assets/service-ai-ready.mp4",
    videoMobile: "assets/aio-recommendations.mp4",
    poster: "assets/service-ai-ready-poster.jpg",
    motif: "assistant",
  },
  {
    slug: "cost-cleanup",
    num: "04",
    name: "Cost cleanup",
    short: "Find the small web bills that add up quietly.",
    summary:
      "Small web costs add up quietly. We look for unused subscriptions, overlapping tools, paid tiers, renewals, and ownership gaps, then sort what is worth keeping, changing, or canceling.",
    bullets: [
      "Inventory of hosting, domains, plugins, apps, and AI tools",
      "Overlap and oversized-tier detection",
      "Renewal calendar and account ownership map",
      "Keep / change / cancel list you approve line by line",
    ],
    deliverables: ["Spend inventory", "Keep/change/cancel list", "Renewal calendar"],
    video: "assets/service-cost-cleanup.mp4",
    videoMobile: "assets/savings-cat.mp4",
    poster: "assets/service-cost-cleanup-poster.jpg",
    motif: "savings",
  },
];

/**
 * New activities proposed for the refresh. Draft copy: validate scope and
 * pricing before publishing. All billed at the standard rate unless noted.
 */
export const newServices = [
  {
    slug: "site-care",
    num: "05",
    name: "Site care",
    isNew: true,
    short: "A calm monthly retainer for updates, fixes, and small edits.",
    summary:
      "Websites drift: plugins age, opening hours change, a form stops sending. Site care is a small monthly block of time for updates, backups, uptime checks, and the little edits you never get around to, with a short written log of what changed.",
    bullets: [
      "Software, plugin, and certificate updates",
      "Backups and uptime monitoring",
      "Small content edits on request, by email",
      "A monthly one-paragraph change log",
    ],
    deliverables: ["Monthly care block", "Change log", "Uptime alerts"],
    motif: "care",
  },
  {
    slug: "speed-access",
    num: "06",
    name: "Speed & accessibility",
    isNew: true,
    short: "Faster pages, readable by everyone, including assistive technology.",
    summary:
      "Slow pages lose visitors and inaccessible pages lose customers. We measure Core Web Vitals, compress images and video, remove render-blocking weight, and check contrast, keyboard use, and screen-reader labels against WCAG 2.2, which also helps with the European Accessibility Act.",
    bullets: [
      "Core Web Vitals measurement before and after",
      "Image, font, and video weight reduction",
      "Keyboard, contrast, and screen-reader checks",
      "Plain-language accessibility statement",
    ],
    deliverables: ["Speed report", "Accessibility fix list", "Before/after scores"],
    motif: "speed",
  },
  {
    slug: "local-presence",
    num: "07",
    name: "Local presence",
    isNew: true,
    short: "Show up correctly on Google Maps, Apple Maps, and local listings.",
    summary:
      "For many local customers the first impression is a map pin, not your homepage. We tidy your Google Business Profile, Apple Business Connect, and Bing Places listings so names, hours, categories, photos, and links agree with the website.",
    bullets: [
      "Google Business Profile categories, hours, and services",
      "Apple Maps and Bing Places alignment",
      "Consistent name, address, and phone everywhere",
      "A simple routine for asking for and answering reviews",
    ],
    deliverables: ["Listing cleanup", "Consistency check", "Review routine"],
    motif: "map",
  },
  {
    slug: "platform-move",
    num: "08",
    name: "Platform move",
    isNew: true,
    short: "Move off an expensive builder to fast, low-cost hosting you own.",
    summary:
      "Many small sites pay every month for a website builder they barely use. When it makes sense, we move the site to fast static hosting such as Cloudflare Pages, keep the design and search signals intact, and hand you the keys. Golden Years made this move from Squarespace.",
    bullets: [
      "Fit check: what you would gain and lose by moving",
      "Pixel-faithful rebuild with redirects for every old URL",
      "Domain, email, and analytics carried over safely",
      "You own the code, the domain, and the accounts",
    ],
    deliverables: ["Move plan", "Rebuilt site", "Redirect map"],
    motif: "move",
  },
  {
    slug: "ai-helpers",
    num: "09",
    name: "AI helpers",
    isNew: true,
    short: "Small, practical automations that give back hours every week.",
    summary:
      "Not a chatbot for the sake of it. We look at the repetitive work around your website, such as inbox triage, quote drafts, FAQ answers, and content updates, and set up small AI-assisted helpers you can understand, switch off, and afford.",
    bullets: [
      "Map the repetitive tasks worth automating",
      "Inbox and email drafting helpers",
      "FAQ and intake assistants grounded in your own pages",
      "Clear cost ceiling and an off switch for every helper",
    ],
    deliverables: ["Automation shortlist", "One working helper", "Running-cost estimate"],
    motif: "helpers",
  },
  {
    slug: "multilingual",
    num: "10",
    name: "Multilingual sites",
    isNew: true,
    short: "Serve visitors in more than one language, with clean search signals.",
    summary:
      "If your customers speak more than one language, bolted-on auto-translate widgets often hurt clarity and search visibility. We set up clean localized pages—such as English, French, and Spanish—with proper hreflang metadata, straightforward language switching, and a single maintainable structure so updates stay in sync.",
    bullets: [
      "Clean language routes and straightforward switching",
      "hreflang alternates plus localized titles, descriptions, and sitemaps",
      "One maintainable content structure so edits stay consistent",
      "Clear human-reviewed wording instead of awkward auto-translate overlays",
    ],
    deliverables: ["Localized pages", "hreflang & sitemap", "Language switcher"],
    motif: "multilingual",
  },
];

export const allServices = [...coreServices, ...newServices];

export const process = [
  {
    num: "01",
    title: "Review what exists",
    text:
      "A short intake interview, then a review of the current site: what already works, what to preserve, and where visitors get stuck. If analytics are available, they inform the review; otherwise the first pass stays observational and practical.",
  },
  {
    num: "02",
    title: "Explore possible looks",
    text: "A small palette of real design directions, so you compare actual pages instead of abstract descriptions.",
  },
  {
    num: "03",
    title: "Choose and combine",
    text: "Pick one direction or mix pieces from several, including the existing website, until it feels right.",
  },
  {
    num: "04",
    title: "Prepare the final site",
    text: "Tighten pages, search details, AI-ready structure, mobile flow, and practical launch items, then sign off.",
  },
];

export const budget = [
  { label: "Start", text: "Most projects begin with a practical 10-hour bundle: room to review, design, and make real progress without a long proposal cycle." },
  { label: "Accounting", text: "Work is tracked in clear $100/hour increments, with notes on what was done and what changed." },
  { label: "Visibility", text: "You are kept up to date as the budget is used, with a manual check-in when the retainer reaches 50%." },
];

export const savingsSpots = [
  { label: "Subscriptions", text: "Website apps, booking tools, email add-ons, analytics, image or AI tools nobody actively uses." },
  { label: "Overlap", text: "Two services doing the same job, legacy plugins kept out of habit, or a paid tier chosen years ago." },
  { label: "Renewals", text: "Domains, hosting, themes, plugins, and directories that renew automatically but no longer help." },
  { label: "Ownership", text: "Unclear logins, scattered billing, and vendor accounts that hide what is essential and what can go. Savings are treated as opportunities to verify, not as guaranteed project payback." },
];

export const work = [
  {
    slug: "assurances",
    name: "Assurances de Rueil",
    role: "Refresh / WordPress care",
    image: "assets/work-assurances.png",
    url: "https://assurancesderueil.fr/",
    text: "A French insurance brokerage site refreshed for clearer service navigation, local trust signals, and a steadier WordPress foundation.",
    detail: "WordPress maintenance, page fixes, metadata and content cleanup, mobile polish, ongoing upkeep.",
  },
  {
    slug: "golden-years",
    name: "Golden Years Tax Strategy",
    role: "Refresh / SEO / AIO / Platform move",
    image: "assets/work-golden-years.png",
    url: "https://www.goldenyearstaxstrategy.com/",
    caseStudy: true,
    text: "A tax-strategy site refreshed around clearer positioning, stronger search structure, and a direct consultation flow.",
    detail: "SEO metadata, answer-friendly structure, Cloudflare Pages launch, policy pages, ongoing maintenance.",
  },
  {
    slug: "photos",
    name: "Photos By Elie",
    role: "Full design",
    image: "assets/work-photos-by-elie.png",
    url: "https://photos-by-elie.com/",
    text: "A photography-commerce site designed around travel collections, photo detail pages, campaigns, and digital downloads.",
    detail: "Brand system, catalog browsing, campaign pages, policy and support flows.",
  },
];

export const caseStudy = {
  name: "Golden Years Tax Strategy",
  kicker: "Case study / Tax strategy practice",
  intro:
    "A focused website and search sprint that clarified the practice, strengthened the consultation path, and created a path to eliminate a recurring hosting expense.",
  tags: ["SEO / AIO", "Content structure", "Consultation path", "Hosting move"],
  steps: [
    { title: "Positioning and structure", text: "Clarified audience positioning, headings, content structure, common prospective-client questions, and the consultation path." },
    { title: "Search and answer readiness", text: "An SEO/AIO pass across search metadata and visible page content, supported by modest cosmetic improvements." },
    { title: "Practical cost cleanup", text: "Moved the live site from Squarespace to Cloudflare, putting Golden Years in a position to eliminate its Squarespace subscription." },
  ],
  quote:
    "Before the website changes, I wasn't getting leads from Google. Now, when I ask people how they found me, a few are saying Google.",
  quoteBy: "Owner, Golden Years Tax Strategy",
  desktopImage: "case-studies/golden-years/assets/golden-years-home-desktop.png",
  mobileImage: "case-studies/golden-years/assets/golden-years-home-mobile.png",
  url: "https://www.goldenyearstaxstrategy.com/",
};

export const about = {
  title: "Decades of software judgment, applied practically.",
  paragraphs: [
    "I have spent decades in software engineering, so I look at websites as more than a surface design problem. A good site also has structure, maintainability, search signals, tool choices, and costs underneath it.",
    "For independent businesses, I am excited by how quickly the web is changing: AI search, better design tools, automation, and new ways to make small sites more capable without making them bloated.",
  ],
  languages: "English, French, and Spanish",
};

export const faq = [
  { q: "Who is Web By Elie for?", a: "Independent businesses that already have a website or web tools and want a practical refresh, clearer search signals, AI-readable structure, and a review of avoidable web spending." },
  { q: "What happens in the first pass?", a: "The first pass reviews the current site, preserves useful work, identifies visitor friction, compares design directions, and checks titles, descriptions, headings, service wording, links, mobile flow, AI-readable facts, and avoidable costs." },
  { q: "What does an AI-ready review actually test?", a: "Whether a person or AI assistant can identify the business, services, intended customers, locations, pricing factors, evidence, and next step without guessing. It records missing or conflicting facts and recommends corrections; it does not promise placement in an AI answer." },
  { q: "Can SEO or AI answer placement be guaranteed?", a: "No ranking, traffic, lead, or AI answer placement is guaranteed. The work improves clarity, crawlability, structure, and answer quality so the site is easier to understand." },
  { q: "Is the existing website replaced from scratch?", a: "Not by default. The process starts by preserving what works, then offers practical design and structure improvements before preparing a final direction." },
  { q: "How is the budget handled?", a: "Most projects begin with a 10-hour bundle. Work is tracked at $100 per hour with progress notes and a manual check-in when the retainer reaches 50%." },
];

/**
 * Free site check: a short self-assessment. Each "no" answer points to the
 * service that addresses it. Purely client-side; ends in a mailto.
 */
export const checkQuestions = [
  { q: "Does your homepage say what you do and where, in one sentence?", service: "refresh" },
  { q: "Does each page have its own title and description in Google results?", service: "seo" },
  { q: "Ask ChatGPT about your business. Does it get your services and area right?", service: "ai-ready" },
  { q: "Do you know every web subscription you pay for, and when each renews?", service: "cost-cleanup" },
  { q: "Has someone checked your site's updates and backups in the last three months?", service: "site-care" },
  { q: "Does your homepage load in under three seconds on a phone?", service: "speed-access" },
  { q: "Are your hours and address identical on Google Maps and your website?", service: "local-presence" },
  { q: "Do you own your site's code and domain, outside a monthly builder plan?", service: "platform-move" },
];

/** Canonical page set every proposal must render (paths relative to option root). */
export const pages = [
  { path: "", title: "Home" },
  { path: "services/", title: "Services" },
  ...allServices.map((s) => ({ path: `services/${s.slug}/`, title: s.name })),
  { path: "work/", title: "Work" },
  { path: "work/golden-years/", title: "Golden Years case study" },
  { path: "process/", title: "Process & budget" },
  { path: "check/", title: "Free site check" },
];

/** The 1 + n chooser options, in bar order. */
export const options = [
  { id: "original", label: "Original", name: "Current site (v317.1)" },
  { id: "option-1", label: "Option 1", name: "Paper & Ink" },
  { id: "option-2", label: "Option 2", name: "Night Signal" },
  { id: "option-3", label: "Option 3", name: "Toybox" },
];

/**
 * Relative prefix from a page path back to the option root, e.g.
 * "services/seo/" -> "../../". Use for every internal link and asset.
 */
export function toOptionRoot(pagePath) {
  const depth = pagePath.split("/").filter(Boolean).length;
  return depth ? "../".repeat(depth) : "./";
}

/** Relative prefix from a page inside chooser/variants/<id>/ to the repo root. */
export function toRepoRoot(pagePath) {
  return toOptionRoot(pagePath) + "../../../";
}

/** Relative prefix from a page inside chooser/variants/<id>/ to chooser/. */
export function toChooserRoot(pagePath) {
  return toOptionRoot(pagePath) + "../../";
}

/**
 * Standard chooser head/body snippets. Every generated page must include:
 *   - chooserHead(pagePath) inside <head>
 *   - chooserBar(optionId, pagePath) as the FIRST child of <body>
 *   - chooserScript(pagePath) before </body>
 * and set <body data-proposal="<optionId>" data-page="<pagePath>">.
 */
export function chooserHead(pagePath) {
  const c = toChooserRoot(pagePath);
  return `<meta name="robots" content="noindex, nofollow" />\n  <link rel="stylesheet" href="${c}chooser-nav.css" />`;
}

export function chooserBar(optionId, pagePath) {
  const c = toChooserRoot(pagePath);
  const links = options
    .map(
      (o) =>
        `<a class="chooser-btn" data-option="${o.id}" href="${c}variants/${o.id}/"${o.id === optionId ? ' aria-current="page"' : ""} title="${o.name}">${o.label}</a>`
    )
    .join("");
  return `<nav class="chooser-nav" aria-label="Design options">${links}</nav>`;
}

export function chooserScript(pagePath) {
  return `<script src="${toChooserRoot(pagePath)}chooser-nav.js" defer></script>`;
}
