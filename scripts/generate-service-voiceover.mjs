import {execFileSync} from "node:child_process";
import {mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const audioDir = join(root, "public", "voiceover", "services");
const fps = 30;
const voiceRate = "320";
const pauseSeconds = 0.24;

const voices = [
  {id: "female", mac: "Flo (English (US))"},
  {id: "male", mac: "Reed (English (US))"},
];

const services = [
  {
    slug: "refresh",
    landscapeSource: "Remotion_AG/outputs/01-page-reassembly.mp4",
    landscapeOutput: "assets/web-page-reassembly.mp4",
    portraitSource: "Remotion_AG/out/01-page-reassembly-portrait.mp4",
    portraitOutput: "assets/service-refresh.mp4",
  },
  {
    slug: "seo",
    landscapeSource: "Remotion_AG/outputs/02-seo-harvest.mp4",
    landscapeOutput: "assets/seo-page-flip.mp4",
    portraitSource: "Remotion_AG/out/02-seo-harvest-portrait.mp4",
    portraitOutput: "assets/service-seo.mp4",
  },
  {
    slug: "ai-ready",
    landscapeSource: "Remotion_AG/outputs/03-aio-recommendations.mp4",
    landscapeOutput: "assets/aio-recommendations.mp4",
    portraitSource: "Remotion_AG/out/03-aio-recommendations-portrait.mp4",
    portraitOutput: "assets/service-ai-ready.mp4",
  },
  {
    slug: "cost-cleanup",
    landscapeSource: "Remotion_AG/outputs/04-cost-efficiency.mp4",
    landscapeOutput: "assets/savings-cat.mp4",
    portraitSource: "Remotion_AG/out/04-cost-efficiency-portrait.mp4",
    portraitOutput: "assets/service-cost-cleanup.mp4",
  },
];

const run = (command, args) => execFileSync(command, args, {stdio: "pipe"});

const probe = (file) => {
  const value = run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ]).toString().trim();
  return Number(value);
};

const splitCopy = (description) => {
  const match = description.match(/^(.+?[.!?])\s+(.+)$/);
  if (!match) throw new Error(`Expected two sentences in service copy: ${description}`);
  return [match[1], match[2]];
};

const loadEnglishServices = () => {
  const source = readFileSync(join(root, "assets", "i18n.js"), "utf8");
  const context = {window: {}};
  vm.runInNewContext(source, context, {filename: join(root, "assets", "i18n.js")});
  return context.window.webByElieI18n.en.pages.home.services;
};

const makeVoiceover = (service, copy) => {
  const [first, second] = splitCopy(copy);
  const lines = [first, second].map((text, index) => {
    const voice = voices[index];
    const stem = `${service.slug}-${String(index + 1).padStart(2, "0")}-${voice.id}`;
    const aiff = join(audioDir, `${stem}.aiff`);
    const mp3 = join(audioDir, `${stem}.mp3`);
    run("say", ["-v", voice.mac, "-r", voiceRate, "-o", aiff, text]);
    run("ffmpeg", ["-y", "-v", "error", "-i", aiff, "-codec:a", "libmp3lame", "-q:a", "4", mp3]);
    unlinkSync(aiff);
    return {text, voice: voice.id, file: mp3, durationSeconds: probe(mp3)};
  });
  return {copy, lines};
};

const muxVoiceover = (source, output, lines) => {
  const duration = probe(source);
  const temp = `${output}.voiceover.tmp.mp4`;
  const filter = [
    "[1:a]aformat=sample_rates=48000:channel_layouts=stereo[a1]",
    "[2:a]aformat=sample_rates=48000:channel_layouts=stereo[a2]",
    "[3:a]aformat=sample_rates=48000:channel_layouts=stereo[silence]",
    `[a1][silence][a2]concat=n=3:v=0:a=1,apad,atrim=duration=${duration.toFixed(3)}[voice]`,
  ].join(";");
  run("ffmpeg", [
    "-y",
    "-v",
    "error",
    "-i",
    join(root, source),
    "-i",
    lines[0].file,
    "-i",
    lines[1].file,
    "-f",
    "lavfi",
    "-t",
    pauseSeconds.toFixed(3),
    "-i",
    "anullsrc=r=48000:cl=stereo",
    "-filter_complex",
    filter,
    "-map",
    "0:v:0",
    "-map",
    "[voice]",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-t",
    duration.toFixed(3),
    "-movflags",
    "+faststart",
    temp,
  ]);
  renameSync(temp, join(root, output));
  return duration;
};

mkdirSync(audioDir, {recursive: true});
const englishServices = loadEnglishServices();
const manifest = {voiceRate, pauseSeconds, services: []};

services.forEach((service, index) => {
  const copy = englishServices[index]?.[1];
  if (!copy) throw new Error(`Missing English homepage copy for ${service.slug}`);
  const voiceover = makeVoiceover(service, copy);
  const landscapeDuration = muxVoiceover(service.landscapeSource, service.landscapeOutput, voiceover.lines);
  const portraitDuration = muxVoiceover(service.portraitSource, service.portraitOutput, voiceover.lines);
  manifest.services.push({
    slug: service.slug,
    copy,
    lines: voiceover.lines.map(({text, voice, file, durationSeconds}) => ({
      text,
      voice,
      file: file.replace(`${root}/`, ""),
      durationSeconds: Number(durationSeconds.toFixed(3)),
    })),
    landscapeDurationSeconds: Number(landscapeDuration.toFixed(3)),
    portraitDurationSeconds: Number(portraitDuration.toFixed(3)),
  });
});

writeFileSync(join(audioDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated service voiceover for ${services.length} animations`);
