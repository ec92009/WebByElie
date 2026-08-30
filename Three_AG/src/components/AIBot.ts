import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class AIBot {
  public group: THREE.Group;
  public botType: 'openai' | 'claude';

  constructor(botType: 'openai' | 'claude') {
    this.botType = botType;
    this.group = new THREE.Group();

    const isOpenAI = botType === 'openai';
    const mainColor = isOpenAI ? PALETTE.teal : PALETTE.terracotta;
    const labelText = isOpenAI ? 'OPENAI' : 'CLAUDE';

    // Body (Sleek rounded cylinder/box)
    const bodyGeo = new THREE.CylinderGeometry(0.9, 1.0, 2.2, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: 0.2,
      metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.1;
    body.castShadow = true;
    this.group.add(body);

    // Head / Eye Sensor
    const headGeo = new THREE.SphereGeometry(0.8, 32, 16);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.8
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.4;
    this.group.add(head);

    // Visor glowing eye
    const visorGeo = new THREE.BoxGeometry(0.9, 0.25, 0.4);
    const visorMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      emissive: mainColor,
      emissiveIntensity: 0.6
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.45, 0.65);
    this.group.add(visor);

    // Brand Label
    const labelTex = new DynamicCanvasTexture(1.4, 0.4, { width: 280, height: 80, bgColor: '#0f172a', borderRadius: 6 });
    labelTex.ctx.fillStyle = '#ffffff';
    labelTex.ctx.font = 'bold 22px sans-serif';
    labelTex.ctx.textAlign = 'center';
    labelTex.ctx.fillText(labelText, 140, 48);
    labelTex.update();
    labelTex.mesh.position.set(0, 1.3, 0.95);
    this.group.add(labelTex.mesh);
  }
}
