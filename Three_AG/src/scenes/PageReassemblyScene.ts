import * as THREE from 'three';
import { WebsitePage } from '../components/WebsitePage';
import { CopyInspection } from '../components/CopyInspection';
import { SharedFrame } from '../components/SharedFrame';
import { Ease, lerp, progress } from '../core/easing';

export class PageReassemblyScene {
  public scene: THREE.Scene;
  public page: WebsitePage;
  public inspection: CopyInspection;
  public frame: SharedFrame;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf6f5f1);

    // Ambient & Directional Lighting for editorial shallow 3D
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    this.scene.add(ambient, dirLight);

    this.page = new WebsitePage();
    this.scene.add(this.page.group);

    this.inspection = new CopyInspection();
    this.scene.add(this.inspection.group);
    this.inspection.group.visible = false;

    this.frame = new SharedFrame();
    this.scene.add(this.frame.group);
  }

  public renderAtTime(t: number): void {
    // t is 0.0 to 11.0 seconds
    const prog = t / 11.0;

    if (t < 1.2) {
      // 0.0–1.2s — Establish original page front-on
      this.page.resetPositions();
      this.page.pageBoardMesh.position.set(0, 0, 0);
      this.page.pageBoardMesh.rotation.set(0, 0, 0);
      this.inspection.group.visible = false;
      this.frame.updateFrame(1, "1. REVISION", "Establish original web page structure", "INSPECTION", prog);
    } else if (t < 3.2) {
      // 1.2–3.2s — Physically pick page apart along z-axis into inspection layout
      const p = progress(t, 1.2, 3.2);
      const easeP = Ease.cubicOut(p);

      this.page.layerNav.position.z = lerp(0.1, 1.2, easeP);
      this.page.layerHero.position.z = lerp(0.1, 1.6, easeP);
      this.page.layerVagueCopy.position.z = lerp(0.1, 2.2, easeP);
      this.page.layerImage.position.z = lerp(0.1, 1.4, easeP);
      this.page.layerCards.position.z = lerp(0.1, 1.8, easeP);
      this.page.layerProof.position.z = lerp(0.1, 2.0, easeP);
      this.page.layerCTA.position.z = lerp(0.1, 2.4, easeP);

      // Tilt page slightly for depth perspective
      this.page.group.rotation.y = lerp(0, -0.15, easeP);
      this.page.group.rotation.x = lerp(0, 0.08, easeP);

      this.frame.updateFrame(1, "1. REVISION", "Physically pick components apart", "SCRUTINIZE", prog);
    } else if (t < 6.0) {
      // 3.2–6.0s — Scrutinize and rewrite vague copy
      const p = progress(t, 3.2, 6.0);
      this.inspection.group.visible = true;

      // Bring vague copy layer into prominent inspection focus
      this.page.layerVagueCopy.position.set(0, 1.5, 3.0);

      // Loupe scans copy line
      const scanX = lerp(-2.5, 2.5, p);
      this.inspection.group.position.set(scanX, 1.5, 3.5);

      if (p < 0.5) {
        this.page.setVagueCopyText("We help with your website.", "TOO BROAD", false);
      } else {
        // Rewrite transformation
        this.page.setVagueCopyText("Clear facts people can find.", "APPROVED ✓", true);
      }

      this.frame.updateFrame(1, "1. REVISION", "Scrutinize and rewrite weak wording", "REWRITING", prog);
    } else if (t < 9.0) {
      // 6.0–9.0s — Improve remaining elements (Proof, CTA, Spacing)
      const p = progress(t, 6.0, 9.0);
      this.inspection.group.visible = false;

      // CTA high contrast transformation
      this.page.setCTAText("Get Your Audit", true);

      // Reposition proof block next to headline claim
      const proofP = Ease.cubicOut(progress(t, 6.0, 7.5));
      this.page.layerProof.position.set(lerp(0, 1.8, proofP), lerp(-2.6, 2.0, proofP), 1.5);

      this.frame.updateFrame(1, "1. REVISION", "Re-align hierarchy, proof, and calls to action", "OPTIMIZING", prog);
    } else {
      // 9.0–11.0s — Reassemble improved page
      const p = progress(t, 9.0, 11.0);
      const easeP = Ease.backOut(p);

      this.page.group.rotation.set(0, 0, 0);

      // Snap all layers back to pristine reassembled positions
      this.page.layerNav.position.set(0, 3.8, lerp(1.2, 0.1, easeP));
      this.page.layerHero.position.set(0, 2.9, lerp(1.6, 0.1, easeP));
      this.page.layerVagueCopy.position.set(0, 2.0, lerp(3.0, 0.1, easeP));
      this.page.layerProof.position.set(0, 1.1, lerp(1.5, 0.1, easeP)); // Proof relocated near hero
      this.page.layerImage.position.set(0, -0.3, lerp(1.4, 0.1, easeP));
      this.page.layerCards.position.set(0, -2.0, lerp(1.8, 0.1, easeP));
      this.page.layerCTA.position.set(0, -3.6, lerp(2.4, 0.1, easeP));

      this.frame.updateFrame(1, "1. REVISION", "Reassemble into clear, high-converting structure", "CLEARER STRUCTURE ✓", prog);
    }
  }
}
