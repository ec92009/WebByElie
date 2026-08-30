import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class DataPacket {
  public mesh: THREE.Group;
  public label: string;
  private canvasTex: DynamicCanvasTexture;

  constructor(label: string, colorHex: number = PALETTE.blue) {
    this.label = label;
    this.mesh = new THREE.Group();

    // 3D Capsule card background
    const bgGeo = new THREE.BoxGeometry(1.8, 0.5, 0.1);
    const bgMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.3,
      metalness: 0.1
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.castShadow = true;
    this.mesh.add(bgMesh);

    // Label texture overlay
    this.canvasTex = new DynamicCanvasTexture(1.7, 0.45, { width: 340, height: 90 });
    const ctx = this.canvasTex.ctx;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, 170, 52);
    this.canvasTex.update();

    this.canvasTex.mesh.position.z = 0.06;
    this.mesh.add(this.canvasTex.mesh);
  }
}
