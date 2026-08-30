import * as THREE from 'three';
import { PALETTE } from '../core/palette';

export class CopyInspection {
  public group: THREE.Group;
  public loupeMesh: THREE.Group;
  public scanLineMesh: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    // 1. Editorial Loupe (Magnifying Ring)
    this.loupeMesh = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(0.6, 0.06, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: PALETTE.terracotta,
      metalness: 0.8,
      roughness: 0.2
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);

    const handleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
    const handleMat = new THREE.MeshStandardMaterial({ color: PALETTE.inkDark });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.6, -0.6, 0);
    handle.rotation.z = -Math.PI / 4;

    this.loupeMesh.add(ring, handle);
    this.group.add(this.loupeMesh);

    // 2. Scan Line
    const scanGeo = new THREE.PlaneGeometry(0.08, 1.2);
    const scanMat = new THREE.MeshBasicMaterial({
      color: PALETTE.rust,
      transparent: true,
      opacity: 0.8
    });
    this.scanLineMesh = new THREE.Mesh(scanGeo, scanMat);
    this.group.add(this.scanLineMesh);
    this.scanLineMesh.visible = false;
  }
}
