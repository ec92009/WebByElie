import { VideoRenderer } from './app/renderer';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const renderer = new VideoRenderer(canvas);

  const btnPlay = document.getElementById('btn-play') as HTMLButtonElement;
  const playIcon = document.getElementById('play-icon') as HTMLSpanElement;
  const playText = document.getElementById('play-text') as HTMLSpanElement;
  const scrubber = document.getElementById('timeline-scrubber') as HTMLInputElement;
  const timeDisplay = document.getElementById('time-display') as HTMLSpanElement;
  const frameDisplay = document.getElementById('frame-display') as HTMLSpanElement;
  const sceneBtns = document.querySelectorAll('.scene-btn');

  // Initial render at frame 0
  renderer.renderFrame(0);

  // Play / Pause Toggle
  btnPlay.addEventListener('click', () => {
    if (renderer.isPlaying) {
      renderer.pause();
      playIcon.textContent = '▶';
      playText.textContent = 'Play';
    } else {
      renderer.play();
      playIcon.textContent = '⏸';
      playText.textContent = 'Pause';
    }
  });

  // Scene Selection
  sceneBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const sceneIdx = parseInt(target.getAttribute('data-scene') || '0', 10);

      sceneBtns.forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      const maxFrames = sceneIdx === 4 ? 1320 : 330;
      scrubber.max = (maxFrames - 1).toString();
      scrubber.value = '0';

      renderer.pause();
      playIcon.textContent = '▶';
      playText.textContent = 'Play';

      renderer.setScene(sceneIdx);
      updateMetaDisplays(0, maxFrames);
    });
  });

  // Timeline Scrubber Input
  scrubber.addEventListener('input', () => {
    renderer.pause();
    playIcon.textContent = '▶';
    playText.textContent = 'Play';

    const frameVal = parseInt(scrubber.value, 10);
    const maxFrames = renderer.activeSceneIndex === 4 ? 1320 : 330;
    renderer.renderFrame(frameVal);
    updateMetaDisplays(frameVal, maxFrames);
  });

  // Frame Update Event from animation loop
  window.addEventListener('renderFrameUpdate', ((e: CustomEvent) => {
    const { frame, maxFrames } = e.detail;
    scrubber.value = frame.toString();
    updateMetaDisplays(frame, maxFrames);
  }) as EventListener);

  function updateMetaDisplays(frame: number, maxFrames: number): void {
    const sec = (frame / 30.0).toFixed(2);
    const totalSec = ((maxFrames - 1) / 30.0).toFixed(2);
    timeDisplay.textContent = `${sec}s / ${totalSec}s`;
    frameDisplay.textContent = `Frame: ${frame} / ${maxFrames - 1}`;
  }

  // Keyboard Shortcuts (Space to play/pause, Left/Right arrows to step frames)
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      btnPlay.click();
    } else if (e.code === 'ArrowLeft') {
      renderer.pause();
      const current = parseInt(scrubber.value, 10);
      const next = Math.max(0, current - 1);
      scrubber.value = next.toString();
      renderer.renderFrame(next);
      updateMetaDisplays(next, renderer.activeSceneIndex === 4 ? 1320 : 330);
    } else if (e.code === 'ArrowRight') {
      renderer.pause();
      const current = parseInt(scrubber.value, 10);
      const max = renderer.activeSceneIndex === 4 ? 1320 : 330;
      const next = Math.min(max - 1, current + 1);
      scrubber.value = next.toString();
      renderer.renderFrame(next);
      updateMetaDisplays(next, max);
    }
  });
});
