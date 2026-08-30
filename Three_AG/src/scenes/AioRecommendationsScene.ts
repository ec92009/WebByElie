import * as THREE from 'three';
import { WebsitePage } from '../components/WebsitePage';
import { SearchRobot } from '../components/SearchRobot';
import { Database } from '../components/Database';
import { AIBot } from '../components/AIBot';
import { DataPacket } from '../components/DataPacket';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { SharedFrame } from '../components/SharedFrame';
import { Ease, lerp, progress } from '../core/easing';

export class AioRecommendationsScene {
  public scene: THREE.Scene;
  public page: WebsitePage;
  public robot: SearchRobot;
  public database: Database;
  public openAiBot: AIBot;
  public claudeBot: AIBot;
  public panel: RecommendationPanel;
  public packets: DataPacket[] = [];
  public frame: SharedFrame;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf6f5f1);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    this.scene.add(ambient, dirLight);

    // Page from Video 2
    this.page = new WebsitePage();
    this.page.group.rotation.y = Math.PI;
    this.page.group.position.set(-3.5, 0, 0);
    this.scene.add(this.page.group);

    // Search Robot & Database in foreground initially
    this.robot = new SearchRobot();
    this.robot.group.position.set(1.5, -1, 0);
    this.scene.add(this.robot.group);

    this.database = new Database();
    this.database.group.position.set(4.5, -1, 0);
    for (let i = 0; i < 5; i++) {
      this.database.setRowState(i, ['TITLE', 'SERVICE', 'LOCATION', 'FAQ', 'JSON-LD'][i], 'INDEXED ✓', true);
    }
    this.scene.add(this.database.group);

    // AI Bots (Offscreen initially)
    this.openAiBot = new AIBot('openai');
    this.openAiBot.group.position.set(-10, -1, 1.5);
    this.scene.add(this.openAiBot.group);

    this.claudeBot = new AIBot('claude');
    this.claudeBot.group.position.set(10, -1, 1.5);
    this.scene.add(this.claudeBot.group);

    // Data packets
    ['Facts', 'Context', 'Proof', 'Action'].forEach((lbl) => {
      const pkt = new DataPacket(lbl);
      pkt.mesh.visible = false;
      this.packets.push(pkt);
      this.scene.add(pkt.mesh);
    });

    // Recommendation Panel
    this.panel = new RecommendationPanel();
    this.panel.group.position.set(0, 0.5, 1.8);
    this.panel.group.visible = false;
    this.scene.add(this.panel.group);

    this.frame = new SharedFrame();
    this.scene.add(this.frame.group);
  }

  public renderAtTime(t: number): void {
    const prog = t / 11.0;

    if (t < 1.5) {
      // 0.0–1.5s — Re-establish search robot & database
      this.robot.group.position.set(1.5, -1, 0);
      this.database.group.position.set(4.5, -1, 0);
      this.frame.updateFrame(3, "3. AI READINESS", "Re-establish traditional search indexing", "INDEXED", prog);
    } else if (t < 3.2) {
      // 1.5–3.2s — OpenAI & Claude bots enter and nudge search robot backward
      const p = progress(t, 1.5, 3.2);
      const easeP = Ease.cubicOut(p);

      // AI Bots enter foreground
      this.openAiBot.group.position.x = lerp(-10, -4.2, easeP);
      this.claudeBot.group.position.x = lerp(10, 4.2, easeP);

      // Nudge search robot and database backward in depth
      this.robot.group.position.z = lerp(0, -3.5, easeP);
      this.database.group.position.z = lerp(0, -3.5, easeP);
      this.robot.group.position.x = lerp(1.5, 2.5, easeP);

      this.frame.updateFrame(3, "3. AI READINESS", "OpenAI & Claude bots step forward to inspect facts", "NUDGING SEARCH", prog);
    } else if (t < 6.2) {
      // 3.2–6.2s — AI Bots collect data packets directly
      const p = progress(t, 3.2, 6.2);

      this.packets.forEach((pkt, idx) => {
        pkt.mesh.visible = true;
        const itemP = Math.max(0, Math.min(1, (p - idx * 0.2) * 2));
        const easeItem = Ease.cubicInOut(itemP);

        // Fly from page into OpenAI or Claude bot
        const targetX = idx % 2 === 0 ? -4.2 : 4.2;
        pkt.mesh.position.x = lerp(-3.5, targetX, easeItem);
        pkt.mesh.position.y = lerp(1.5 - idx * 0.8, 1.0, easeItem);
        pkt.mesh.position.z = lerp(0.5, 1.5, easeItem);
      });

      this.frame.updateFrame(3, "3. AI READINESS", "Bots synthesize facts, services, and location context", "UNDERSTANDING", prog);
    } else if (t < 9.5) {
      // 6.2–9.5s — Recommendation panel unfolds & generates 4 bullet points
      this.panel.group.visible = true;
      const p = progress(t, 6.2, 9.5);

      // Unfold scale
      const scaleP = Ease.backOut(Math.min(1, p * 2));
      this.panel.group.scale.set(scaleP, scaleP, scaleP);

      // Calculate how many bullets are generated
      const visibleBullets = Math.floor(progress(t, 7.0, 9.5) * 4) + 1;
      this.panel.renderBullets(visibleBullets);

      this.frame.updateFrame(3, "3. AI READINESS", "Generate actionable recommendations one by one", "RECOMMENDING", prog);
    } else {
      // 9.5–11.0s — Recommendations complete
      this.panel.renderBullets(4);
      this.frame.updateFrame(3, "3. AI READINESS", "Four AI recommendations synthesized", "RECOMMENDATIONS READY ✓", prog);
    }
  }
}
