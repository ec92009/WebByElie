import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const PROJECT_ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCENE_NAMES = [
  '01-page-reassembly',
  '02-seo-harvest',
  '03-aio-recommendations',
  '04-savings-cat'
];
const SMOKE_MODE = process.argv.includes('--smoke');
const FRAMES_PER_SCENE = SMOKE_MODE ? 3 : 330;

function requireExecutable(command, args, label) {
  const result = spawnSync(command, args, { stdio: 'ignore' });
  if (result.error || result.status !== 0) {
    throw new Error(
      `${label} is unavailable at "${command}". Install it or set ${label === 'FFmpeg' ? 'FFMPEG_BIN' : 'PUPPETEER_EXECUTABLE_PATH'}.`
    );
  }
  return command;
}

function executableOnPath(command) {
  const lookup = process.platform === 'win32' ? 'where' : 'which';
  const result = spawnSync(lookup, [command], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  return result.stdout.split(/\r?\n/, 1)[0].trim() || null;
}

async function resolveChromeExecutable() {
  const override = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_BIN;
  if (override) return requireExecutable(override, ['--version'], 'Chrome');

  try {
    const bundledChrome = await puppeteer.executablePath();
    if (bundledChrome && fs.existsSync(bundledChrome)) return bundledChrome;
  } catch {
    // Puppeteer's managed browser is optional; continue to system browsers.
  }

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
    process.env['PROGRAMFILES(X86)'] && path.join(process.env['PROGRAMFILES(X86)'], 'Google/Chrome/Application/chrome.exe')
  ].filter(Boolean);

  const systemChrome = candidates.find((candidate) => fs.existsSync(candidate));
  if (systemChrome) return systemChrome;

  for (const command of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    const executable = executableOnPath(command);
    if (executable) return executable;
  }

  throw new Error(
    'Chrome is unavailable. Let Puppeteer install its managed browser, or set PUPPETEER_EXECUTABLE_PATH/CHROME_BIN.'
  );
}

function encodeScene(ffmpeg, sceneFramesDir, mp4Path) {
  execFileSync(
    ffmpeg,
    [
      '-y',
      '-framerate', '30',
      '-i', path.join(sceneFramesDir, 'frame_%04d.png'),
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-crf', '18',
      mp4Path
    ],
    { stdio: 'inherit' }
  );
}

async function renderVideos() {
  const ffmpeg = requireExecutable(process.env.FFMPEG_BIN || 'ffmpeg', ['-version'], 'FFmpeg');
  const chrome = await resolveChromeExecutable();
  const requestedPort = Number.parseInt(process.env.THREE_AG_PORT || '5173', 10);
  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    throw new Error(`THREE_AG_PORT must be an integer from 1 to 65535; received "${process.env.THREE_AG_PORT}".`);
  }

  const smokeRoot = SMOKE_MODE ? fs.mkdtempSync(path.join(os.tmpdir(), 'three-ag-smoke-')) : null;
  const framesDir = smokeRoot ? path.join(smokeRoot, 'frames') : path.join(PROJECT_ROOT, 'frames');
  const outputDir = smokeRoot ? path.join(smokeRoot, 'outputs') : path.join(PROJECT_ROOT, 'outputs');
  fs.mkdirSync(framesDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  let server;
  let browser;
  try {
    console.log(`🚀 Starting Vite server${SMOKE_MODE ? ' for bounded smoke render' : ''}...`);
    server = await createServer({
      root: PROJECT_ROOT,
      server: { host: '127.0.0.1', port: requestedPort, strictPort: false }
    });
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === 'string') throw new Error('Vite did not expose a usable local port.');

    const disableSandbox = process.env.CI === 'true' || process.env.THREE_AG_NO_SANDBOX === '1';
    console.log(`🎥 Launching headless Chrome: ${chrome}`);
    browser = await puppeteer.launch({
      headless: true,
      executablePath: chrome,
      args: disableSandbox ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: 'networkidle0' });

    const scenes = SMOKE_MODE ? SCENE_NAMES.slice(0, 1) : SCENE_NAMES;
    for (let sceneIdx = 0; sceneIdx < scenes.length; sceneIdx += 1) {
      const sceneName = scenes[sceneIdx];
      console.log(`🎬 Rendering ${sceneName} (${FRAMES_PER_SCENE} frames)...`);
      const sceneFramesDir = path.join(framesDir, sceneName);
      fs.mkdirSync(sceneFramesDir, { recursive: true });

      await page.evaluate((idx) => {
        const button = document.querySelectorAll('.scene-btn')[idx];
        if (button instanceof HTMLElement) button.click();
      }, sceneIdx);

      for (let frame = 0; frame < FRAMES_PER_SCENE; frame += 1) {
        await page.evaluate((value) => {
          const scrubber = document.getElementById('timeline-scrubber');
          if (scrubber instanceof HTMLInputElement) {
            scrubber.value = value.toString();
            scrubber.dispatchEvent(new Event('input'));
          }
        }, frame);

        const canvas = await page.$('#webgl-canvas');
        if (!canvas) throw new Error('Three.js canvas #webgl-canvas was not found.');
        await canvas.screenshot({
          path: path.join(sceneFramesDir, `frame_${String(frame).padStart(4, '0')}.png`),
          type: 'png'
        });
      }

      const mp4Path = path.join(outputDir, `${sceneName}.mp4`);
      console.log(`📦 Encoding MP4 via FFmpeg: ${mp4Path}`);
      encodeScene(ffmpeg, sceneFramesDir, mp4Path);
    }

    if (SMOKE_MODE) {
      console.log('✅ Bounded Three.js smoke render completed without touching tracked media.');
      return;
    }

    console.log('🔗 Concatenating all 4 videos into all-four-preview.mp4...');
    const concatListPath = path.join(outputDir, 'concat_list.txt');
    const concatContent = SCENE_NAMES
      .map((name) => `file '${path.join(outputDir, `${name}.mp4`)}'`)
      .join('\n');
    fs.writeFileSync(concatListPath, concatContent);
    execFileSync(
      ffmpeg,
      ['-y', '-f', 'concat', '-safe', '0', '-i', concatListPath, '-c', 'copy', path.join(outputDir, 'all-four-preview.mp4')],
      { stdio: 'inherit' }
    );
    console.log('✅ All 4 Three.js MP4 videos rendered successfully!');
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
    if (smokeRoot) fs.rmSync(smokeRoot, { recursive: true, force: true });
  }
}

renderVideos().catch((error) => {
  console.error('❌ Render error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
