import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('outputs');
const portraitDir = path.resolve('out');
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(portraitDir, { recursive: true });

const compositions = [
  { id: 'PageReassembly', file: 'outputs/01-page-reassembly.mp4' },
  { id: 'PageReassemblyPortrait', file: 'out/01-page-reassembly-portrait.mp4' },
  { id: 'SeoHarvest', file: 'outputs/02-seo-harvest.mp4' },
  { id: 'SeoHarvestPortrait', file: 'out/02-seo-harvest-portrait.mp4' },
  { id: 'AioRecommendations', file: 'outputs/03-aio-recommendations.mp4' },
  { id: 'AioRecommendationsPortrait', file: 'out/03-aio-recommendations-portrait.mp4' },
  { id: 'CostEfficiency', file: 'outputs/04-cost-efficiency.mp4' },
  { id: 'CostEfficiencyPortrait', file: 'out/04-cost-efficiency-portrait.mp4' },
  { id: 'AllFourPreview', file: 'outputs/all-four-preview.mp4' },
];

console.log('Starting Web By Elie service-video renders...');

compositions.forEach(({ id, file }) => {
  console.log(`Rendering ${id} -> ${file}`);
  execFileSync(
    'npx',
    ['remotion', 'render', 'src/index.ts', id, file, '--codec=h264', '--pixel-format=yuv420p'],
    { stdio: 'inherit' },
  );
});

console.log(`Rendered ${compositions.length} service-video files.`);
