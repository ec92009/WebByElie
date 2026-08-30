import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class RecommendationPanel {
  public group: THREE.Group;
  private canvasTex: DynamicCanvasTexture;

  private bullets: string[] = [
    'Make the business and audience explicit.',
    'Answer service and location questions directly.',
    'Put proof beside every important claim.',
    'Give people and assistants one clear next step.'
  ];

  constructor() {
    this.group = new THREE.Group();

    // 16:9 proportional board for recommendations
    this.canvasTex = new DynamicCanvasTexture(4.8, 3.2, {
      width: 960,
      height: 640,
      bgColor: '#ffffff',
      borderColor: '#10b981',
      borderWidth: 4,
      borderRadius: 12
    });

    this.group.add(this.canvasTex.mesh);
    this.renderBullets(0); // 0 to 4 visible bullets
  }

  public renderBullets(visibleCount: number): void {
    const ctx = this.canvasTex.ctx;
    this.canvasTex.clear({
      bgColor: '#ffffff',
      borderColor: '#10b981',
      borderWidth: 4,
      borderRadius: 12
    });

    // Panel Header
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, 0, 960, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('AI RECOMMENDATIONS FOR WEB PRESENCE', 40, 52);

    // Render active bullet points
    ctx.font = '500 22px sans-serif';
    ctx.fillStyle = '#1e293b';

    for (let i = 0; i < Math.min(visibleCount, 4); i++) {
      const y = 140 + i * 110;

      // Bullet icon
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(60, y + 10, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✓', 60, y + 16);
      ctx.textAlign = 'left';

      // Bullet Text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(this.bullets[i], 95, y + 18);
    }

    this.canvasTex.update();
  }
}
