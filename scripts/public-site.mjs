export const publicDirectories = ["assets", "fr", "es", "services", "case-studies", "privacy", "terms", "data-deletion", "restaurant-demo", "restaurant-demo-la-piazza", "restaurant-demo-lima-masala", "restaurant-demo-velluto", "restaurants"];
export const publicRootFiles = ["VERSION", "_headers", "robots.txt", "sitemap.xml", "llms.txt", "site.webmanifest", "apple-touch-icon.png"];

// Every HTML file must be named here; adding a file to a directory cannot publish it.
export const publicPages = [
  "index.html", "fr/index.html", "es/index.html",
  ...["", "fr/", "es/"].flatMap((locale) => ["refresh", "seo", "ai-ready", "cost-cleanup"].map((service) => `${locale}services/${service}/index.html`)),
  "case-studies/golden-years/index.html",
  ...["privacy", "terms", "data-deletion"].flatMap((policy) => [`${policy}.html`, `${policy}/index.html`]),
  // Retained pending confirmation of external OAuth/policy dependencies.
  ...["tools", "privacy", "terms", "data-deletion"].map((page) => `desktop-mail-${page}.html`),
  ...["restaurant-demo", "restaurant-demo-la-piazza", "restaurant-demo-lima-masala", "restaurant-demo-velluto", "restaurants"].map((directory) => `${directory}/index.html`),
];

export const publishedHtml = () => [...publicPages].sort();
