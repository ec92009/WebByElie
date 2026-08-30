import * as THREE from 'three';
import { WebsitePage } from '../components/WebsitePage';
import { SavingsCat, DollarSign } from '../components/SavingsCat';
import { MagnifyingGlass } from '../components/MagnifyingGlass';
import { SharedFrame } from '../components/SharedFrame';
import { DynamicCanvasTexture } from '../core/typography';
import { Ease, lerp, progress } from '../core/easing';

export class SavingsCatScene {
  public scene: THREE.Scene;
  public page: WebsitePage;
  public cat: SavingsCat;
  public glass: MagnifyingGlass;
  public dollarSigns: DollarSign[] = [];
  public expenseCards: THREE.Mesh[] = [];
  public frame: SharedFrame;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf6f5f1);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    this.scene.add(ambient, dirLight);

    // Central Website Page
    this.page = new WebsitePage();
    this.page.group.position.set(0, 0, 0);
    this.scene.add(this.page.group);

    // 4 Recurring Expense Cards attached to page
    const cardTexts = [
      'Unused plugin — $29/mo',
      'Duplicate tool — $18/mo',
      'Silent renewal — $49/yr',
      'Old service — $12/mo'
    ];

    cardTexts.forEach((txt, idx) => {
      const cardTex = new DynamicCanvasTexture(2.2, 0.5, {
        width: 440,
        height: 100,
        bgColor: '#fff1f2',
        borderColor: '#fda4af',
        borderWidth: 2,
        borderRadius: 8
      });

      const ctx = cardTex.ctx;
      ctx.fillStyle = '#9f1239';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(txt, 20, 58);
      cardTex.update();

      const y = 2.0 - idx * 1.2;
      cardTex.mesh.position.set(2.2, y, 0.8);
      this.expenseCards.push(cardTex.mesh);
      this.scene.add(cardTex.mesh);

      // Create matching Dollar Sign
      const dollar = new DollarSign();
      dollar.group.visible = false;
      this.dollarSigns.push(dollar);
      this.scene.add(dollar.group);
    });

    // Fat Cat Character
    this.cat = new SavingsCat();
    this.cat.group.position.set(-10, -1, 1.2); // Offscreen left initially
    this.scene.add(this.cat.group);

    // Magnifying Glass
    this.glass = new MagnifyingGlass();
    this.glass.group.visible = false;
    this.scene.add(this.glass.group);

    this.frame = new SharedFrame();
    this.scene.add(this.frame.group);
  }

  public renderAtTime(t: number): void {
    const prog = t / 11.0;

    if (t < 1.5) {
      // 0.0–1.5s — Establish expensive page ecosystem
      this.page.group.position.set(0, 0, 0);
      this.cat.group.position.x = -10;
      this.glass.group.visible = false;
      this.dollarSigns.forEach(d => d.group.visible = false);
      this.frame.updateFrame(4, "4. SAVINGS", "Establish recurring expense cards and page leaks", "INSPECTING", prog);
    } else if (t < 3.2) {
      // 1.5–3.2s — Fat Cat enters from left, everything else slides right
      const p = progress(t, 1.5, 3.2);
      const easeP = Ease.cubicOut(p);

      // Cat enters left frame
      this.cat.group.position.x = lerp(-10, -3.8, easeP);

      // Page and cards shift right to clear center left
      this.page.group.position.x = lerp(0, 1.2, easeP);
      this.expenseCards.forEach((c, idx) => {
        c.position.x = lerp(2.2, 3.4, easeP);
      });

      this.frame.updateFrame(4, "4. SAVINGS", "Fat cat enters frame to find wasteful spend", "SCANNING", prog);
    } else if (t < 5.8) {
      // 3.2–5.8s — Magnifying Glass scans page to detect leaks
      this.glass.group.visible = true;
      const p = progress(t, 3.2, 5.8);

      const glassY = lerp(2.0, -1.6, p);
      this.glass.group.position.set(1.2, glassY, 2.0);

      // Cat head tracks magnifying glass
      this.cat.headGroup.rotation.y = lerp(-0.2, 0.2, p);
      this.cat.headGroup.rotation.x = lerp(0.1, -0.1, p);

      this.frame.updateFrame(4, "4. SAVINGS", "Scan page with magnifying glass to discover leaks", "LEAK DETECTED", prog);
    } else if (t < 8.2) {
      // 5.8–8.2s — Dollar signs evaporate upward & Cat catches them with bare paws
      this.glass.group.visible = false;
      const p = progress(t, 5.8, 8.2);

      // Cat raises paws to catch position
      const pawP = Ease.backOut(Math.min(1, p * 2));
      this.cat.leftPaw.position.set(-1.1, lerp(1.4, 2.8, pawP), 1.2);
      this.cat.rightPaw.position.set(1.1, lerp(1.4, 2.8, pawP), 1.2);

      this.dollarSigns.forEach((d, idx) => {
        d.group.visible = true;
        const itemP = Math.max(0, Math.min(1, (p - idx * 0.2) * 2.2));
        const easeItem = Ease.cubicOut(itemP);

        // Evaporate upward from card -> catch in cat's paw
        const startY = 2.0 - idx * 1.2;
        d.group.position.x = lerp(3.4, -3.8 + (idx % 2 === 0 ? -0.8 : 0.8), easeItem);
        d.group.position.y = lerp(startY, 2.6, easeItem);
        d.group.position.z = lerp(0.8, 1.4, easeItem);
      });

      this.frame.updateFrame(4, "4. SAVINGS", "Evaporating dollar signs caught in bare paws", "CATCHING", prog);
    } else if (t < 10.2) {
      // 8.2–10.2s — Move dollar signs into initially empty pockets
      const p = progress(t, 8.2, 10.2);

      this.dollarSigns.forEach((d, idx) => {
        const itemP = Math.max(0, Math.min(1, (p - idx * 0.22) * 2.5));
        const easeItem = Ease.cubicInOut(itemP);

        // Cat paw moves down to pocket opening
        const isLeft = idx % 2 === 0;
        const targetPocketX = isLeft ? -4.55 : -3.05;
        const targetPocketY = 0.95;

        d.group.position.x = lerp(-3.8 + (isLeft ? -0.8 : 0.8), targetPocketX, easeItem);
        d.group.position.y = lerp(2.6, targetPocketY, easeItem);
        d.group.position.z = lerp(1.4, 1.8, easeItem);

        // Scale down slightly as it enters physical pocket slot
        const s = lerp(1.0, 0.6, easeItem);
        d.group.scale.set(s, s, s);

        if (isLeft) {
          this.cat.leftPaw.position.y = lerp(2.8, 1.2, easeItem);
        } else {
          this.cat.rightPaw.position.y = lerp(2.8, 1.2, easeItem);
        }
      });

      this.frame.updateFrame(4, "4. SAVINGS", "Place recovered dollar signs into physical pockets", "POCKETING SAVINGS", prog);
    } else {
      // 10.2–11.0s — Confirm savings sealed
      this.cat.leftPaw.position.set(-1.1, 1.4, 0.6);
      this.cat.rightPaw.position.set(1.1, 1.4, 0.6);

      this.frame.updateFrame(4, "4. SAVINGS", "Keep more of what you earn.", "SAVINGS FOUND ✓", prog);
    }
  }
}
