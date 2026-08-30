import * as THREE from 'three';
import { WebsitePage } from '../components/WebsitePage';
import { DataPacket } from '../components/DataPacket';
import { SearchRobot } from '../components/SearchRobot';
import { Database } from '../components/Database';
import { SharedFrame } from '../components/SharedFrame';
import { Ease, lerp, progress } from '../core/easing';
import { PALETTE } from '../core/palette';

export class SeoHarvestScene {
  public scene: THREE.Scene;
  public page: WebsitePage;
  public packets: DataPacket[] = [];
  public robot: SearchRobot;
  public database: Database;
  public frame: SharedFrame;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf6f5f1);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    this.scene.add(ambient, dirLight);

    this.page = new WebsitePage();
    this.page.setVagueCopyText("Clear facts people can find.", "APPROVED ✓", true);
    this.page.setCTAText("Get Your Audit", true);
    this.scene.add(this.page.group);

    // Initialize 5 Data Packets
    const labels = ['Title Tag', 'Meta Description', 'Keywords', 'JSON-LD', 'Service Area'];
    labels.forEach((lbl, idx) => {
      const pkt = new DataPacket(lbl, idx % 2 === 0 ? PALETTE.blue : PALETTE.teal);
      pkt.mesh.visible = false;
      this.packets.push(pkt);
      this.scene.add(pkt.mesh);
    });

    // Search Robot
    this.robot = new SearchRobot();
    this.robot.group.position.set(12, -1, 0); // Offscreen right initially
    this.scene.add(this.robot.group);

    // Database Cabinet
    this.database = new Database();
    this.database.group.position.set(15, -1, -2); // Offscreen behind robot initially
    this.scene.add(this.database.group);

    this.frame = new SharedFrame();
    this.scene.add(this.frame.group);
  }

  public renderAtTime(t: number): void {
    const prog = t / 11.0;

    if (t < 1.5) {
      // 0.0–1.5s — Re-establish page
      this.page.group.position.set(0, 0, 0);
      this.page.group.rotation.set(0, 0, 0);
      this.packets.forEach(p => p.mesh.visible = false);
      this.frame.updateFrame(2, "2. SEO", "Re-establish clean structure", "INSPECTING", prog);
    } else if (t < 3.0) {
      // 1.5–3.0s — Flip page to reveal technical underside
      const p = progress(t, 1.5, 3.0);
      const easeP = Ease.cubicInOut(p);

      this.page.group.rotation.y = lerp(0, Math.PI, easeP);
      this.page.group.position.x = lerp(0, -2.5, easeP); // Shift left to make room for robot

      this.frame.updateFrame(2, "2. SEO", "Flip page to expose hidden technical data", "EXPOSING", prog);
    } else if (t < 5.2) {
      // 3.0–5.2s — Reveal data packets emerging from page underside
      const p = progress(t, 3.0, 5.2);
      const easeP = Ease.backOut(p);

      this.page.group.rotation.y = Math.PI;
      this.page.group.position.x = -2.5;

      this.packets.forEach((pkt, idx) => {
        pkt.mesh.visible = true;
        const startY = 2.5 - idx * 1.1;
        pkt.mesh.position.set(-2.5, startY, lerp(-0.1, 1.2, easeP));
      });

      this.frame.updateFrame(2, "2. SEO", "Expose keywords, headers, and JSON-LD schema", "DATA REVEALED", prog);
    } else if (t < 8.2) {
      // 5.2–8.2s — Search Robot arrives & harvests packets into tray
      const robotP = Ease.cubicOut(progress(t, 5.2, 6.2));
      this.robot.group.position.x = lerp(12, 2.5, robotP);

      const harvestP = progress(t, 6.2, 8.2);
      this.packets.forEach((pkt, idx) => {
        const itemP = Math.max(0, Math.min(1, (harvestP - idx * 0.15) * 2));
        const easeItem = Ease.cubicInOut(itemP);

        const startY = 2.5 - idx * 1.1;
        // Travel from page into robot collection tray
        pkt.mesh.position.x = lerp(-2.5, 1.7, easeItem);
        pkt.mesh.position.y = lerp(startY, 0.3, easeItem);
        pkt.mesh.position.z = lerp(1.2, 0.9, easeItem);
      });

      this.frame.updateFrame(2, "2. SEO", "Search robot harvests structured data packets", "HARVESTING", prog);
    } else if (t < 10.2) {
      // 8.2–10.2s — Store harvest into database cabinet
      const dbP = Ease.cubicOut(progress(t, 8.2, 9.0));
      this.database.group.position.x = lerp(15, 6.0, dbP);

      const storeP = progress(t, 9.0, 10.2);
      const dbLabels = ['TITLE', 'SERVICE', 'LOCATION', 'FAQ', 'JSON-LD'];

      this.packets.forEach((pkt, idx) => {
        const itemP = Math.max(0, Math.min(1, (storeP - idx * 0.18) * 2.5));
        const easeItem = Ease.cubicInOut(itemP);

        pkt.mesh.position.x = lerp(1.7, 6.0, easeItem);
        pkt.mesh.position.y = lerp(0.3, 2.2 - idx * 0.65, easeItem);

        if (itemP >= 0.9) {
          this.database.setRowState(idx, dbLabels[idx], 'INDEXED ✓', true);
        }
      });

      this.frame.updateFrame(2, "2. SEO", "Store harvested signals into search database", "STORING", prog);
    } else {
      // 10.2–11.0s — Confirm indexing
      this.frame.updateFrame(2, "2. SEO", "Search signals indexed & database updated", "DATABASE UPDATED ✓", prog);
    }
  }
}
