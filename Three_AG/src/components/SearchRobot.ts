import * as THREE from 'three';
import { PALETTE } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class SearchRobot {
  public group: THREE.Group;
  public intakeArm: THREE.Group;
  public tray: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    // 1. Robot Main Body (Rounded friendly cube)
    const bodyGeo = new THREE.BoxGeometry(2.4, 2.8, 1.8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.position.y = 1.4;
    this.group.add(body);

    // 2. Search / Google Brand Header Badge (Red, Blue, Yellow, Green accents)
    const labelTex = new DynamicCanvasTexture(2.0, 0.5, { width: 400, height: 100, bgColor: '#1e293b', borderRadius: 8 });
    const ctx = labelTex.ctx;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#4285F4'; ctx.fillText('G', 120, 62);
    ctx.fillStyle = '#EA4335'; ctx.fillText('o', 145, 62);
    ctx.fillStyle = '#FBBC05'; ctx.fillText('o', 165, 62);
    ctx.fillStyle = '#4285F4'; ctx.fillText('g', 185, 62);
    ctx.fillStyle = '#34A853'; ctx.fillText('l', 205, 62);
    ctx.fillStyle = '#EA4335'; ctx.fillText('e', 215, 62);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText(' SEARCH BOT', 235, 62);
    labelTex.update();
    labelTex.mesh.position.set(0, 2.2, 0.92);
    this.group.add(labelTex.mesh);

    // 3. Robot Scanner Eye / Sensor lens
    const eyeGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: PALETTE.blue,
      roughness: 0.1,
      metalness: 0.9,
      emissive: PALETTE.blue,
      emissiveIntensity: 0.3
    });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.rotation.x = Math.PI / 2;
    eye.position.set(0, 1.5, 0.95);
    this.group.add(eye);

    // 4. Intake Arm with Suction / Scanner Tool
    this.intakeArm = new THREE.Group();
    const armSegmentGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.6);
    const armMat = new THREE.MeshStandardMaterial({ color: PALETTE.inkDark, metalness: 0.7 });
    const arm = new THREE.Mesh(armSegmentGeo, armMat);
    arm.position.y = -0.8;
    this.intakeArm.add(arm);

    const suctionHeadGeo = new THREE.ConeGeometry(0.4, 0.5, 16);
    const suctionMat = new THREE.MeshStandardMaterial({ color: PALETTE.rust, metalness: 0.5 });
    const suction = new THREE.Mesh(suctionHeadGeo, suctionMat);
    suction.rotation.x = Math.PI;
    suction.position.y = -1.6;
    this.intakeArm.add(suction);

    this.intakeArm.position.set(-1.3, 1.8, 0.5);
    this.group.add(this.intakeArm);

    // 5. Collection Tray
    const trayGeo = new THREE.BoxGeometry(2.2, 0.3, 1.2);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5 });
    this.tray = new THREE.Mesh(trayGeo, trayMat);
    this.tray.position.set(-0.8, 0.2, 0.9);
    this.group.add(this.tray);
  }
}
