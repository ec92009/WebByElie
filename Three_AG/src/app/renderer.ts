import * as THREE from 'three';
import { PageReassemblyScene } from '../scenes/PageReassemblyScene';
import { SeoHarvestScene } from '../scenes/SeoHarvestScene';
import { AioRecommendationsScene } from '../scenes/AioRecommendationsScene';
import { SavingsCatScene } from '../scenes/SavingsCatScene';

export class VideoRenderer {
  public canvas: HTMLCanvasElement;
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;

  public scene1: PageReassemblyScene;
  public scene2: SeoHarvestScene;
  public scene3: AioRecommendationsScene;
  public scene4: SavingsCatScene;

  public activeSceneIndex = 0; // 0: Scene 1, 1: Scene 2, 2: Scene 3, 3: Scene 4, 4: All 4
  public currentFrame = 0;     // 0 to 330 (or 0 to 1320 for All 4)
  public isPlaying = false;
  private animFrameId: number | null = null;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: false
    });
    this.renderer.setSize(1920, 1080);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(45, 1920 / 1080, 0.1, 100);
    this.camera.position.set(0, 0, 12.5);

    // Initialize scenes
    this.scene1 = new PageReassemblyScene();
    this.scene2 = new SeoHarvestScene();
    this.scene3 = new AioRecommendationsScene();
    this.scene4 = new SavingsCatScene();

    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  public handleResize(): void {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const aspect = 1920 / 1080;
    let w = parent.clientWidth;
    let h = parent.clientHeight;

    if (w / h > aspect) {
      w = h * aspect;
    } else {
      h = w / aspect;
    }

    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
  }

  public renderFrame(frame: number): void {
    this.currentFrame = frame;
    const maxFrames = this.activeSceneIndex === 4 ? 1320 : 330;
    this.currentFrame = Math.max(0, Math.min(maxFrames - 1, this.currentFrame));

    if (this.activeSceneIndex < 4) {
      const timeInSec = this.currentFrame / 30.0;
      const targetScene = [this.scene1, this.scene2, this.scene3, this.scene4][this.activeSceneIndex];
      targetScene.renderAtTime(timeInSec);
      this.renderer.render(targetScene.scene, this.camera);
    } else {
      // All 4 Concatenated (0-1320 frames, 44s total)
      const sceneIdx = Math.min(3, Math.floor(this.currentFrame / 330));
      const localFrame = this.currentFrame % 330;
      const timeInSec = localFrame / 30.0;

      const scenes = [this.scene1, this.scene2, this.scene3, this.scene4];
      scenes[sceneIdx].renderAtTime(timeInSec);
      this.renderer.render(scenes[sceneIdx].scene, this.camera);
    }
  }

  public setScene(index: number): void {
    this.activeSceneIndex = index;
    this.renderFrame(0);
  }

  public play(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastTime = performance.now();
    this.tick();
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private tick(): void {
    if (!this.isPlaying) return;

    const maxFrames = this.activeSceneIndex === 4 ? 1320 : 330;
    this.currentFrame++;

    if (this.currentFrame >= maxFrames) {
      this.currentFrame = 0;
    }

    this.renderFrame(this.currentFrame);

    // Dispatch update event for UI controls
    window.dispatchEvent(new CustomEvent('renderFrameUpdate', {
      detail: { frame: this.currentFrame, maxFrames }
    }));

    setTimeout(() => {
      this.animFrameId = requestAnimationFrame(() => this.tick());
    }, 1000 / 30); // Cap at 30 fps
  }
}
