import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('outputs');
const FRAMES_DIR = path.resolve('frames');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function renderVideos() {
  console.log('🚀 Starting Vite Dev Server...');
  const server = await createServer({
    server: { port: 5173 }
  });
  await server.listen();

  console.log('🎥 Launching Headless Chrome via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const sceneNames = [
    '01-page-reassembly',
    '02-seo-harvest',
    '03-aio-recommendations',
    '04-savings-cat'
  ];

  for (let sceneIdx = 0; sceneIdx < 4; sceneIdx++) {
    const sceneName = sceneNames[sceneIdx];
    console.log(`🎬 Rendering ${sceneName} (330 frames)...`);

    const sceneFramesDir = path.join(FRAMES_DIR, sceneName);
    if (!fs.existsSync(sceneFramesDir)) fs.mkdirSync(sceneFramesDir, { recursive: true });

    // Select scene in UI
    await page.evaluate((idx) => {
      const btns = document.querySelectorAll('.scene-btn');
      if (btns[idx]) (btns[idx]).click();
    }, sceneIdx);

    // Render 330 frames deterministically
    for (let frame = 0; frame < 330; frame++) {
      await page.evaluate((f) => {
        const scrubber = document.getElementById('timeline-scrubber');
        if (scrubber) {
          scrubber.value = f.toString();
          scrubber.dispatchEvent(new Event('input'));
        }
      }, frame);

      const canvas = await page.$('#webgl-canvas');
      if (canvas) {
        const framePath = path.join(sceneFramesDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await canvas.screenshot({ path: framePath, type: 'png' });
      }
    }

    // FFmpeg encode scene
    const mp4Path = path.join(OUTPUT_DIR, `${sceneName}.mp4`);
    console.log(`📦 Encoding MP4 via FFmpeg: ${mp4Path}`);

    const ffmpegCmd = `/opt/homebrew/bin/ffmpeg -y -framerate 30 -i "${sceneFramesDir}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 18 "${mp4Path}"`;
    execSync(ffmpegCmd, { stdio: 'inherit' });
  }

  // Concatenate all 4 videos into all-four-preview.mp4
  console.log('🔗 Concatenating all 4 videos into all-four-preview.mp4...');
  const concatListPath = path.join(OUTPUT_DIR, 'concat_list.txt');
  const concatContent = sceneNames.map(name => `file '${OUTPUT_DIR}/${name}.mp4'`).join('\n');
  fs.writeFileSync(concatListPath, concatContent);

  const finalMp4 = path.join(OUTPUT_DIR, 'all-four-preview.mp4');
  const concatCmd = `/opt/homebrew/bin/ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${finalMp4}"`;
  execSync(concatCmd, { stdio: 'inherit' });

  console.log('✅ All 4 Three.js MP4 videos rendered successfully!');
  await browser.close();
  await server.close();
}

renderVideos().catch((err) => {
  console.error('❌ Render error:', err);
  process.exit(1);
});
