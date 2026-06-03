import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'voiceover');
const generatedPath = join(root, 'remotion', 'narration.generated.ts');
const fps = 30;
const pauseFrames = 8;
const scenePadFrames = 28;
const minSceneFrames = 150;
const voiceRate = '245';

const voices = {
  female: 'Flo (English (US))',
  male: 'Reed (English (US))',
};

const scenes = [
  {
    id: 'hero',
    lines: [
      {speaker: 'female', text: 'A website refresh does not have to mean starting over.'},
      {speaker: 'male', text: 'Right. The goal is a sharper web presence: better looking, easier to find, and less wasteful to run.'},
    ],
  },
  {
    id: 'intro',
    lines: [
      {speaker: 'male', text: 'This starts with decades of software engineering judgment.'},
      {speaker: 'female', text: 'Yes, and that means looking past the surface: structure, maintainability, search signals, tool choices, and costs.'},
    ],
  },
  {
    id: 'problem',
    lines: [
      {speaker: 'female', text: 'Most independent businesses have already put real work into their current website.'},
      {
        speaker: 'male',
        text: 'Exactly. But over time, the look can age, search signals can weaken, AI clarity can fade, and recurring costs can pile up quietly.',
        cues: [
          {id: 'problemDated', phrase: 'look can age'},
          {id: 'problemSearch', phrase: 'search signals can weaken'},
          {id: 'problemAi', phrase: 'AI clarity can fade'},
          {id: 'problemCosts', phrase: 'recurring costs can pile up'},
        ],
      },
    ],
  },
  {
    id: 'passes',
    lines: [
      {speaker: 'male', text: 'The work follows a practical checklist.'},
      {speaker: 'female', text: 'Right: refresh the look, improve search, make the site AI-ready, and clean up unnecessary spend.'},
    ],
  },
  {
    id: 'refresh',
    lines: [
      {
        speaker: 'female',
        text: 'Instead of guessing from abstract design ideas, we compare real visual directions.',
        cues: [{id: 'refreshGuessing', phrase: 'guessing from abstract design ideas'}],
      },
      {
        speaker: 'male',
        text: 'Yes. Real options make the choice easier, preserve useful existing work, and give everyone a clear sign-off direction.',
        cues: [
          {id: 'refreshPreserve', phrase: 'preserve useful existing work'},
          {id: 'refreshSignoff', phrase: 'clear sign-off direction'},
        ],
      },
    ],
  },
  {
    id: 'search',
    lines: [
      {speaker: 'male', text: 'Search Engine Optimization is precise. Search engines read visible content and behind-the-scenes details.'},
      {
        speaker: 'female',
        text: 'Exactly: titles, headings, links, service wording, locations, and image labels each help the site explain itself clearly.',
        cues: [
          {id: 'searchTitles', phrase: 'titles'},
          {id: 'searchHeadings', phrase: 'headings'},
          {id: 'searchServices', phrase: 'service wording, locations'},
          {id: 'searchImages', phrase: 'image labels'},
        ],
      },
    ],
  },
  {
    id: 'ai',
    lines: [
      {speaker: 'female', text: 'Today, many searches begin in chat boxes and AI assistants, not only search engines.'},
      {
        speaker: 'male',
        text: 'Right. AI systems look for clear facts: who you are, what you do, where you work, which services matter, and what answer you provide.',
        cues: [
          {id: 'aiWhoWhat', phrase: 'what you do'},
          {id: 'aiServices', phrase: 'which services matter'},
          {id: 'aiFacts', phrase: 'clear facts'},
          {id: 'aiAnswers', phrase: 'what answer you provide'},
        ],
      },
    ],
  },
  {
    id: 'cost',
    lines: [
      {
        speaker: 'male',
        text: 'Then there are the small bills: domains, hosting, plugins, email add-ons, booking tools, analytics, and image tools.',
        cues: [
          {id: 'costDomains', phrase: 'domains'},
          {id: 'costHosting', phrase: 'hosting'},
          {id: 'costPlugins', phrase: 'plugins'},
          {id: 'costEmail', phrase: 'email add-ons'},
          {id: 'costBooking', phrase: 'booking tools'},
          {id: 'costAnalytics', phrase: 'analytics'},
          {id: 'costImages', phrase: 'image tools'},
        ],
      },
      {speaker: 'female', text: 'Yes. Some are essential. Some overlap. Some renew because nobody has looked at them in years.'},
    ],
  },
  {
    id: 'work',
    lines: [
      {speaker: 'female', text: 'The process starts with a short intake conversation.'},
      {speaker: 'male', text: 'Right. What is already working? What should be preserved? Where are visitors getting stuck?'},
    ],
  },
  {
    id: 'retainer',
    lines: [
      {speaker: 'male', text: 'Work begins with a practical initial bundle, usually around ten hours.'},
      {speaker: 'female', text: 'Exactly. Progress is tracked clearly, with notes on what changed and a warning when the budget reaches halfway.'},
    ],
  },
  {
    id: 'cta',
    lines: [
      {speaker: 'female', text: 'Send the link.'},
      {speaker: 'male', text: 'Yes. Get the first pass. A clearer site starts with knowing what is already there.'},
    ],
  },
];

const shell = (command, args, options = {}) => execFileSync(command, args, {stdio: 'pipe', ...options});

const durationSeconds = (file) => {
  const value = shell('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    file,
  ]).toString().trim();
  return Number(value);
};

const cueFrame = (line, durationFrames, cue) => {
  const lowerText = line.text.toLowerCase();
  const lowerPhrase = cue.phrase.toLowerCase();
  const index = Math.max(0, lowerText.indexOf(lowerPhrase));
  const ratio = lowerText.length > 0 ? index / lowerText.length : 0;
  return Math.max(0, Math.min(durationFrames - 8, Math.round(durationFrames * ratio)));
};

rmSync(outDir, {recursive: true, force: true});
mkdirSync(outDir, {recursive: true});

const generatedScenes = [];
const generatedLines = [];
const cues = {};
let currentFrame = 0;
let globalLineIndex = 0;

scenes.forEach((scene, sceneIndex) => {
  const sceneStartFrame = currentFrame;
  let localFrame = 16;

  scene.lines.forEach((line, lineIndex) => {
    const stem = `${String(sceneIndex + 1).padStart(2, '0')}-${scene.id}-${String(lineIndex + 1).padStart(2, '0')}-${line.speaker}`;
    const aiff = join(outDir, `${stem}.aiff`);
    const mp3 = join(outDir, `${stem}.mp3`);
    shell('say', ['-v', voices[line.speaker], '-r', voiceRate, '-o', aiff, line.text]);
    shell('ffmpeg', ['-y', '-v', 'error', '-i', aiff, '-codec:a', 'libmp3lame', '-q:a', '4', mp3]);
    rmSync(aiff, {force: true});

    const durationFrames = Math.ceil(durationSeconds(mp3) * fps);
    const lineStartFrame = sceneStartFrame + localFrame;
    const file = `voiceover/${stem}.mp3`;
    generatedLines.push({
      id: stem,
      scene: sceneIndex,
      speaker: line.speaker,
      text: line.text,
      file,
      startFrame: lineStartFrame,
      durationFrames,
    });

    (line.cues || []).forEach((cue) => {
      cues[cue.id] = sceneStartFrame + localFrame + cueFrame(line, durationFrames, cue);
    });

    localFrame += durationFrames + pauseFrames;
    globalLineIndex += 1;
  });

  const sceneDurationFrames = Math.max(minSceneFrames, localFrame + scenePadFrames);
  generatedScenes.push({
    id: scene.id,
    startFrame: sceneStartFrame,
    durationFrames: sceneDurationFrames,
  });
  currentFrame += sceneDurationFrames;
});

const generated = `// Generated by scripts/generate-remotion-voiceover.mjs. Do not edit by hand.
export const FPS = ${fps};
export const SCENES = ${JSON.stringify(generatedScenes, null, 2)} as const;
export const LINES = ${JSON.stringify(generatedLines, null, 2)} as const;
export const CUES = ${JSON.stringify(cues, null, 2)} as const;
export const TOTAL_FRAMES = ${currentFrame};
`;

writeFileSync(generatedPath, generated);
console.log(`Generated ${globalLineIndex} voiceover lines`);
console.log(`Total frames: ${currentFrame}`);
console.log(`Total seconds: ${(currentFrame / fps).toFixed(2)}`);
