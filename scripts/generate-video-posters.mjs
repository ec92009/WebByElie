import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
for (const name of ["service-refresh", "service-seo", "service-ai-ready", "service-cost-cleanup", "web-page-reassembly", "seo-page-flip", "aio-recommendations", "savings-cat"]) {
  // Read one frame; never write or transcode the source MP4.
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-ss", "1", "-i", `assets/${name}.mp4`, "-frames:v", "1", "-vf", "scale='min(960,iw)':-2", "-q:v", "3", `assets/${name}-poster.jpg`], { cwd: root });
}
console.log("Generated eight video posters; source videos unchanged.");
