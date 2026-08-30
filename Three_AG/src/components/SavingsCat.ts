import * as THREE from 'three';
import { PALETTE } from '../core/palette';

export class DollarSign {
  public group: THREE.Group;
  public mesh: THREE.Mesh;
  public value: string;

  constructor(value = '$') {
    this.value = value;
    this.group = new THREE.Group();

    // 3D Dollar Coin / Sign geometry
    const coinGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 24);
    const coinMat = new THREE.MeshStandardMaterial({
      color: PALETTE.gold,
      metalness: 0.9,
      roughness: 0.2
    });
    this.mesh = new THREE.Mesh(coinGeo, coinMat);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.castShadow = true;
    this.group.add(this.mesh);

    // Inner embossed '$' symbol bar
    const barGeo = new THREE.BoxGeometry(0.08, 0.45, 0.12);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.8 });
    const bar = new THREE.Mesh(barGeo, barMat);
    this.group.add(bar);
  }
}

export class SavingsCat {
  public group: THREE.Group;

  // Body parts
  public bodyMesh: THREE.Mesh;
  public bellyMesh: THREE.Mesh;
  public headGroup: THREE.Group;
  public leftPaw: THREE.Group;
  public rightPaw: THREE.Group;
  public tailMesh: THREE.Mesh;

  // Pocket slot references for physical storage
  public leftPocketSlot: THREE.Vector3;
  public rightPocketSlot: THREE.Vector3;

  // Dollar signs stored inside pockets
  public pocketedDollarSigns: DollarSign[] = [];

  constructor() {
    this.group = new THREE.Group();

    // 1. Cat Body (Round, substantial fat body)
    const bodyGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: PALETTE.catFur,
      roughness: 0.4,
      metalness: 0.05
    });
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.scale.set(1.1, 1.25, 1.0);
    this.bodyMesh.position.y = 1.4;
    this.bodyMesh.castShadow = true;
    this.group.add(this.bodyMesh);

    // Cream Belly overlay
    const bellyGeo = new THREE.SphereGeometry(1.0, 32, 16);
    const bellyMat = new THREE.MeshStandardMaterial({ color: PALETTE.catBelly, roughness: 0.5 });
    this.bellyMesh = new THREE.Mesh(bellyGeo, bellyMat);
    this.bellyMesh.scale.set(0.9, 1.1, 0.5);
    this.bellyMesh.position.set(0, 1.3, 0.7);
    this.group.add(this.bellyMesh);

    // 2. Waistcoat / Vest with 2 Pockets
    const vestGeo = new THREE.CylinderGeometry(1.22, 1.3, 1.4, 32, 1, true, -Math.PI * 0.7, Math.PI * 1.4);
    const vestMat = new THREE.MeshStandardMaterial({
      color: PALETTE.catVest,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    const vest = new THREE.Mesh(vestGeo, vestMat);
    vest.position.y = 1.2;
    this.group.add(vest);

    // Left Pocket Slot (Visible opening)
    const pocketGeo = new THREE.BoxGeometry(0.5, 0.4, 0.25);
    const pocketMat = new THREE.MeshStandardMaterial({ color: PALETTE.catPockets });

    const leftPocket = new THREE.Mesh(pocketGeo, pocketMat);
    leftPocket.position.set(-0.75, 0.85, 0.9);
    leftPocket.rotation.y = 0.3;
    this.group.add(leftPocket);

    const rightPocket = new THREE.Mesh(pocketGeo, pocketMat);
    rightPocket.position.set(0.75, 0.85, 0.9);
    rightPocket.rotation.y = -0.3;
    this.group.add(rightPocket);

    // Store local coordinates of pocket openings for dollar entry targets
    this.leftPocketSlot = new THREE.Vector3(-0.75, 0.95, 0.95);
    this.rightPocketSlot = new THREE.Vector3(0.75, 0.95, 0.95);

    // 3. Head & Expressive Facial Features
    this.headGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({ color: PALETTE.catFur, roughness: 0.4 });
    const head = new THREE.Mesh(headGeo, headMat);
    this.headGroup.add(head);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.3, 0.5, 16);
    const earMat = new THREE.MeshStandardMaterial({ color: PALETTE.catFur });
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-0.55, 0.8, 0);
    leftEar.rotation.z = 0.3;

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(0.55, 0.8, 0);
    rightEar.rotation.z = -0.3;
    this.headGroup.add(leftEar, rightEar);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.3, 0.15, 0.75);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.3, 0.15, 0.75);
    this.headGroup.add(leftEye, rightEye);

    // Snout & Whiskers
    const snoutGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const snoutMat = new THREE.MeshStandardMaterial({ color: PALETTE.catBelly });
    const snout = new THREE.Mesh(snoutGeo, snoutMat);
    snout.position.set(0, -0.05, 0.8);
    this.headGroup.add(snout);

    this.headGroup.position.set(0, 2.7, 0.1);
    this.group.add(this.headGroup);

    // 4. Bare Cream Paws (Left & Right)
    this.leftPaw = new THREE.Group();
    this.rightPaw = new THREE.Group();

    const pawGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const pawMat = new THREE.MeshStandardMaterial({ color: PALETTE.catPaws, roughness: 0.5 });

    const lPawMesh = new THREE.Mesh(pawGeo, pawMat);
    lPawMesh.scale.set(1.0, 0.7, 1.2);
    this.leftPaw.add(lPawMesh);

    const rPawMesh = new THREE.Mesh(pawGeo, pawMat);
    rPawMesh.scale.set(1.0, 0.7, 1.2);
    this.rightPaw.add(rPawMesh);

    // Default paw positions (relaxed by side)
    this.leftPaw.position.set(-1.1, 1.4, 0.6);
    this.rightPaw.position.set(1.1, 1.4, 0.6);

    this.group.add(this.leftPaw, this.rightPaw);

    // 5. Tail
    const tailGeo = new THREE.CylinderGeometry(0.1, 0.08, 1.6, 16);
    const tailMat = new THREE.MeshStandardMaterial({ color: PALETTE.catFur });
    this.tailMesh = new THREE.Mesh(tailGeo, tailMat);
    this.tailMesh.position.set(0, 0.8, -1.0);
    this.tailMesh.rotation.x = -Math.PI / 3;
    this.group.add(this.tailMesh);
  }
}
