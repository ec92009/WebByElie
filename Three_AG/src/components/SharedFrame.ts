import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class SharedFrame {
  public group: THREE.Group;
  private canvasTex: DynamicCanvasTexture;

  constructor() {
    this.group = new THREE.Group();
    // Position frame close to camera overlay plane
    this.group.position.set(0, 0, 8);

    // Frame canvas (1920x1080 proportional plane)
    const planeWidth = 17.777; // 16:9 ratio at distance
    const planeHeight = 10.0;
    this.canvasTex = new DynamicCanvasTexture(planeWidth, planeHeight, {
      width: 1920,
      height: 1080
    });

    this.group.add(this.canvasTex.mesh);
    this.updateFrame(1, "1. REVISION", "Website Refresh: Pick Apart & Rewrite", "INSPECTION", 0.0);
  }

  public updateFrame(
    stageIndex: number, // 1 to 4
    serviceLabel: string,
    caption: string,
    badgeText: string,
    progressPercent: number // 0 to 1
  ): void {
    const ctx = this.canvasTex.ctx;
    this.canvasTex.clear();

    const w = 1920;
    const h = 1080;

    // Top Header Bar
    ctx.fillStyle = '#1e2229';
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Web By Elie', 60, 60);

    // Service Label Top Right
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(w - 280, 32, 220, 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(serviceLabel, w - 170, 61);
    ctx.textAlign = 'left';

    // Thin Progress Indicator Top Center
    const barW = 400;
    const barX = (w - barW) / 2;
    const barY = 46;

    ctx.fillStyle = '#e2ded4';
    ctx.fillRect(barX, barY, barW, 8);

    // Active progress width (continuous across 4 stages)
    const totalProg = ((stageIndex - 1) + Math.min(1, Math.max(0, progressPercent))) / 4;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(barX, barY, barW * totalProg, 8);

    // Stage ticks
    for (let i = 1; i <= 3; i++) {
      ctx.fillStyle = '#1e2229';
      ctx.fillRect(barX + (barW * i / 4) - 1, barY - 2, 2, 12);
    }

    // Bottom Left Caption
    ctx.fillStyle = '#1e2229';
    ctx.font = '500 22px -apple-system, sans-serif';
    ctx.fillText(caption, 60, h - 50);

    // Bottom Right Badge
    if (badgeText) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(w - 360, h - 75, 300, 48, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badgeText, w - 210, h - 44);
      ctx.textAlign = 'left';
    }

    this.canvasTex.update();
  }
}
