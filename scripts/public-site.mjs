import { generatedPagesList } from "./generate-localized-pages.mjs";

export const publicDirectories = [
  "assets",
  "fr",
  "es",
  "services",
  "work",
  "process",
  "check",
  "case-studies",
  "privacy",
  "terms",
  "data-deletion",
  "restaurant-demo",
  "restaurant-demo-la-piazza",
  "restaurant-demo-lima-masala",
  "restaurant-demo-velluto",
  "restaurants",
];

export const publicRootFiles = [
  "VERSION",
  "_headers",
  "_routes.json",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "site.webmanifest",
  "apple-touch-icon.png",
];

export const creatorPages = [
  "alex.ward.html",
  "june.rowan.html",
  "nora.vela.html",
  "elena.brooks.html",
  "creators.order.html",
  "creators.privacy.html",
  "creators.terms.html",
  "creators.data-deletion.html",
];

// Every HTML file must be named here; adding a file to a directory cannot publish it.
export const publicPages = [
  ...generatedPagesList(),
  ...creatorPages,
  // Retained pending confirmation of external OAuth/policy dependencies.
  ...["tools", "privacy", "terms", "data-deletion"].map((page) => `desktop-mail-${page}.html`),
  // Standalone vertical campaign pages (intentionally disconnected from front page).
  ...["restaurant-demo", "restaurant-demo-la-piazza", "restaurant-demo-lima-masala", "restaurant-demo-velluto", "restaurants"].map((directory) => `${directory}/index.html`),
];

export const publishedHtml = () => [...publicPages].sort();
