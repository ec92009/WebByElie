# Web By Elie — Three.js Video Studio (`Three_AG`)

This subfolder contains the implementation of the four deterministic 11-second animated videos for Web By Elie using **Three.js**, **TypeScript**, and **Vite**.

## Output Specifications

- **Resolution**: 1920 × 1080
- **Frame Rate**: 30 fps
- **Duration**: 11 seconds per video (330 frames each)
- **Combined Duration**: 44 seconds total (1320 frames)
- **Output Files**:
  - `outputs/01-page-reassembly.mp4`
  - `outputs/02-seo-harvest.mp4`
  - `outputs/03-aio-recommendations.mp4`
  - `outputs/04-savings-cat.mp4`
  - `outputs/all-four-preview.mp4`

## Project Structure

```text
Three_AG/
  index.html                     # Studio browser preview & timeline scrubber UI
  package.json
  tsconfig.json
  src/
    main.ts                      # Main entry point & keyboard event bindings
    app/
      renderer.ts                # Three.js WebGLRenderer & 30fps animation loop
    core/
      palette.ts                 # Editorial studio palette & materials
      easing.ts                  # Smooth custom interpolation functions
      seededRandom.ts            # Deterministic PRNG for frame repeatability
      typography.ts              # High-DPI canvas texture typography generator
    components/
      SharedFrame.ts             # Unified top/bottom UI frame & stage indicator
      WebsitePage.ts             # 3D website board with 7 physical layer components
      CopyInspection.ts          # Scanning loupe & editorial strike-through annotation
      DataPacket.ts              # 3D capsule cards for structured data signals
      SearchRobot.ts             # Friendly Google/Search robot with intake arm
      Database.ts                # Indexed server cabinet with filling rows
      AIBot.ts                   # OpenAI (teal) & Claude (terracotta) 3D bots
      RecommendationPanel.ts     # Unfolding 4-bullet point recommendation panel
      MagnifyingGlass.ts         # Inspection lens used by Fat Cat
      SavingsCat.ts              # Procedural 3D Fat Cat with 2 physical pocket slots
    scenes/
      PageReassemblyScene.ts     # Video 1: Pick apart, rewrite, reassemble
      SeoHarvestScene.ts         # Video 2: Flip page, reveal data, harvest & store
      AioRecommendationsScene.ts # Video 3: AI bots step forward, build recommendations
      SavingsCatScene.ts         # Video 4: Fat Cat detects leaks & pockets dollar signs
  scripts/
    render-all.js                # Headless Puppeteer + FFmpeg 30fps frame encoder
```

## Running the Interactive Studio Preview

To run the local browser preview with play, pause, scene selector, and timeline scrubber:

```bash
cd Three_AG
npm run dev
```

Open `http://localhost:5173/` in your browser.

- **Space**: Play / Pause toggle
- **Left / Right Arrow**: Frame-by-frame scrubbing (30 fps)

## Rendering MP4 Videos

To render all 4 individual 11.0s MP4 files and the concatenated 44.0s preview MP4:

```bash
cd Three_AG
npm run render
```

Rendered MP4s will be saved in `Three_AG/outputs/`.

Before a full render, run the bounded smoke check:

```bash
cd Three_AG
npm run render:smoke
```

The smoke check renders and encodes three frames in a temporary directory, then removes them. It does not replace production media or write to `frames/` or `outputs/`.

The renderer discovers FFmpeg from `PATH` and uses Puppeteer's managed Chrome when available, followed by common system Chrome/Chromium locations. Set `FFMPEG_BIN` or `PUPPETEER_EXECUTABLE_PATH` (also `CHROME_BIN`) to override discovery. `THREE_AG_PORT` changes the preferred local port, and `THREE_AG_NO_SANDBOX=1` explicitly enables the Chrome no-sandbox flags outside CI.
