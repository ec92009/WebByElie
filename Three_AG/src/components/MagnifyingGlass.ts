import * as THREE from 'three';
import { PALETTE } from '../core/palette';

export class MagnifyingGlass {
  public group: THREE.Group;
  public lensMesh: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    // Metallic Rim
    const rimGeo = new THREE.TorusGeometry(1.0, 0.08, 16, 32);
    const rimMat = new THREE.MeshStandardMaterial({
      color: PALETTE.gold,
      metalness: 0.9,
      roughness: 0.1
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    this.group.add(rim);

    // Glass Lens
    const lensGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.05, 32);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.5
    });
    this.lensMesh = new THREE.Mesh(lensGeo, lensMat);
    this.lensMesh.rotation.x = Math.PI / 2;
    this.group.add(this.lensMesh);

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4);
    const handleMat = new THREE.MeshStandardMaterial({ color: PALETTE.inkDark, roughness: 0.3 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.9, -0.9, 0);
    handle.rotation.z = -Math.PI / 4;
    this.group.add(handle);
  }
}
