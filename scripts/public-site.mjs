import { readdirSync } from "node:fs";
import { join } from "node:path";

export const publicDirectories = ["assets", "fr", "es", "services", "case-studies", "privacy", "terms", "data-deletion", "restaurant-demo", "restaurant-demo-la-piazza", "restaurant-demo-lima-masala", "restaurant-demo-velluto", "restaurants"];
export const publicRootFiles = ["VERSION", "_headers", "robots.txt", "sitemap.xml", "llms.txt", "site.webmanifest", "apple-touch-icon.png"];

export function publishedHtml(root) {
  const walk = (directory) => readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name.endsWith(".html") ? [file] : [];
  });
  return [...readdirSync(root).filter((file) => file.endsWith(".html")), ...publicDirectories.flatMap(walk)].sort();
}
