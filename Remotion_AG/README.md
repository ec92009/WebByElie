# Web By Elie — Remotion Video Studio (`Remotion_AG`)

This subfolder contains the landscape and portrait service animations used by Web By Elie, implemented with **Remotion**, **React**, and **TypeScript**.

## Output Specifications

- **Landscape resolution**: 1920 × 1080
- **Portrait resolution**: 1080 × 1440
- **Frame rate**: 30 fps
- **Output directories**: `outputs/` for landscape renders and `out/` for portrait renders
- Rendered intermediates stay local; the narrated production MP4s live in the repository-level `assets/` directory.

## Running Remotion Studio

To launch the interactive Remotion Studio preview:

```bash
cd Remotion_AG
npm run dev
```

## Rendering MP4 Videos

To render all nine intermediate MP4 files:

```bash
cd Remotion_AG
npm run render
```

The command renders all landscape, portrait, and combined-preview intermediates. From the repository root, `npm run service-videos:build` then regenerates the two-voice narration and writes the eight production MP4s under `assets/`.
