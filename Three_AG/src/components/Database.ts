import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class Database {
  public group: THREE.Group;
  private rowTextures: DynamicCanvasTexture[] = [];

  constructor() {
    this.group = new THREE.Group();

    // 1. Cabinet Main Frame (Server tower)
    const cabGeo = new THREE.BoxGeometry(2.6, 4.2, 1.8);
    const cabMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6
    });
    const cab = new THREE.Mesh(cabGeo, cabMat);
    cab.position.y = 2.1;
    cab.castShadow = true;
    this.group.add(cab);

    // Header label
    const headTex = new DynamicCanvasTexture(2.2, 0.4, { width: 440, height: 80, bgColor: '#0f172a' });
    headTex.ctx.fillStyle = '#10b981';
    headTex.ctx.font = 'bold 22px monospace';
    headTex.ctx.textAlign = 'center';
    headTex.ctx.fillText('[ INDEXED DATABASE ]', 220, 50);
    headTex.update();
    headTex.mesh.position.set(0, 3.9, 0.92);
    this.group.add(headTex.mesh);

    // 2. Database Slots (5 rows)
    const slotLabels = ['TITLE', 'SERVICE', 'LOCATION', 'FAQ', 'JSON-LD'];
    for (let i = 0; i < 5; i++) {
      const y = 3.2 - i * 0.65;
      const slotTex = new DynamicCanvasTexture(2.2, 0.5, { width: 440, height: 100, bgColor: '#334155', borderRadius: 6 });
      this.updateSlotRow(slotTex, slotLabels[i], 'EMPTY', false);
      slotTex.mesh.position.set(0, y, 0.92);
      this.group.add(slotTex.mesh);
      this.rowTextures.push(slotTex);
    }
  }

  public updateSlotRow(tex: DynamicCanvasTexture, label: string, status: string, isFilled: boolean): void {
    tex.clear({
      bgColor: isFilled ? '#065f46' : '#334155',
      borderColor: isFilled ? '#10b981' : '#475569',
      borderWidth: 2,
      borderRadius: 6
    });

    const ctx = tex.ctx;
    ctx.fillStyle = isFilled ? '#a7f3d0' : '#94a3b8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`${label}:`, 20, 58);

    ctx.fillStyle = isFilled ? '#ffffff' : '#64748b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(status, 420, 58);
    ctx.textAlign = 'left';

    tex.update();
  }

  public setRowState(index: number, label: string, status: string, isFilled: boolean): void {
    if (this.rowTextures[index]) {
      this.updateSlotRow(this.rowTextures[index], label, status, isFilled);
    }
  }
}
