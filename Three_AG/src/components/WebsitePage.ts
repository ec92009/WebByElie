import * as THREE from 'three';
import { PALETTE, createInkMaterial } from '../core/palette';
import { DynamicCanvasTexture } from '../core/typography';

export class WebsitePage {
  public group: THREE.Group;
  public pageBoardMesh: THREE.Mesh;

  // Individual layers for physical picking apart
  public layerNav: THREE.Group;
  public layerHero: THREE.Group;
  public layerVagueCopy: THREE.Group;
  public layerImage: THREE.Group;
  public layerCards: THREE.Group;
  public layerProof: THREE.Group;
  public layerCTA: THREE.Group;

  private copyTexture!: DynamicCanvasTexture;
  private ctaTexture!: DynamicCanvasTexture;

  constructor() {
    this.group = new THREE.Group();

    // Base Page Frame (Paper board)
    const pageGeo = new THREE.BoxGeometry(6.4, 8.8, 0.15);
    const pageMat = new THREE.MeshStandardMaterial({
      color: PALETTE.cardBg,
      roughness: 0.2,
      metalness: 0.05
    });
    this.pageBoardMesh = new THREE.Mesh(pageGeo, pageMat);
    this.pageBoardMesh.castShadow = true;
    this.pageBoardMesh.receiveShadow = true;
    this.group.add(this.pageBoardMesh);

    // Initialize layers
    this.layerNav = new THREE.Group();
    this.layerHero = new THREE.Group();
    this.layerVagueCopy = new THREE.Group();
    this.layerImage = new THREE.Group();
    this.layerCards = new THREE.Group();
    this.layerProof = new THREE.Group();
    this.layerCTA = new THREE.Group();

    this.group.add(
      this.layerNav,
      this.layerHero,
      this.layerVagueCopy,
      this.layerImage,
      this.layerCards,
      this.layerProof,
      this.layerCTA
    );

    // Position default layout
    this.setupInitialLayout();
  }

  private setupInitialLayout(): void {
    const zOffset = 0.1;

    // 1. Navigation bar
    const navBarTex = new DynamicCanvasTexture(5.8, 0.6, { width: 580, height: 60, bgColor: '#f1f5f9', borderRadius: 8 });
    navBarTex.ctx.fillStyle = '#1e293b';
    navBarTex.ctx.font = 'bold 22px sans-serif';
    navBarTex.ctx.fillText('Acme Services', 20, 38);
    navBarTex.ctx.font = '16px sans-serif';
    navBarTex.ctx.fillText('Home  •  About  •  Services  •  Contact', 260, 38);
    navBarTex.update();
    this.layerNav.add(navBarTex.mesh);
    this.layerNav.position.set(0, 3.8, zOffset);

    // 2. Hero Headline
    const heroTex = new DynamicCanvasTexture(5.8, 0.8, { width: 580, height: 80 });
    heroTex.ctx.fillStyle = '#0f172a';
    heroTex.ctx.font = 'bold 34px sans-serif';
    heroTex.ctx.fillText('Modern Solutions For Your Business', 20, 50);
    heroTex.update();
    this.layerHero.add(heroTex.mesh);
    this.layerHero.position.set(0, 2.9, zOffset);

    // 3. Vague Copy ("We help with your website.")
    this.copyTexture = new DynamicCanvasTexture(5.8, 0.7, { width: 580, height: 70, bgColor: '#fef2f2', borderColor: '#fca5a5', borderWidth: 2, borderRadius: 8 });
    this.setVagueCopyText("We help with your website.", "TOO BROAD");
    this.layerVagueCopy.add(this.copyTexture.mesh);
    this.layerVagueCopy.position.set(0, 2.0, zOffset);

    // 4. Generic Image
    const imgTex = new DynamicCanvasTexture(5.8, 2.0, { width: 580, height: 200, bgColor: '#e2e8f0', borderRadius: 10 });
    imgTex.ctx.fillStyle = '#94a3b8';
    imgTex.ctx.fillRect(40, 30, 140, 140);
    imgTex.ctx.fillStyle = '#64748b';
    imgTex.ctx.font = '20px sans-serif';
    imgTex.ctx.fillText('[ Generic Stock Photo Placeholder ]', 200, 110);
    imgTex.update();
    this.layerImage.add(imgTex.mesh);
    this.layerImage.position.set(0, 0.5, zOffset);

    // 5. Service Cards (3)
    const cardsTex = new DynamicCanvasTexture(5.8, 1.4, { width: 580, height: 140 });
    const cCtx = cardsTex.ctx;
    for (let i = 0; i < 3; i++) {
      const x = i * 190 + 10;
      cCtx.fillStyle = '#f8fafc';
      cCtx.strokeStyle = '#cbd5e1';
      cCtx.lineWidth = 2;
      cCtx.beginPath();
      cCtx.roundRect(x, 10, 180, 120, 8);
      cCtx.fill();
      cCtx.stroke();

      cCtx.fillStyle = '#334155';
      cCtx.font = 'bold 18px sans-serif';
      cCtx.fillText(`Service 0${i + 1}`, x + 15, 40);
      cCtx.fillStyle = '#64748b';
      cCtx.font = '14px sans-serif';
      cCtx.fillText('Standard features and', x + 15, 65);
      cCtx.fillText('general support.', x + 15, 85);
    }
    cardsTex.update();
    this.layerCards.add(cardsTex.mesh);
    this.layerCards.position.set(0, -1.3, zOffset);

    // 6. Proof / Testimonial Block
    const proofTex = new DynamicCanvasTexture(5.8, 0.9, { width: 580, height: 90, bgColor: '#f8fafc', borderColor: '#e2e8f0', borderWidth: 2, borderRadius: 8 });
    proofTex.ctx.fillStyle = '#334155';
    proofTex.ctx.font = 'italic 16px sans-serif';
    proofTex.ctx.fillText('"Great work and friendly service!" — Local Business Owner', 30, 50);
    proofTex.update();
    this.layerProof.add(proofTex.mesh);
    this.layerProof.position.set(0, -2.6, zOffset);

    // 7. CTA Button
    this.ctaTexture = new DynamicCanvasTexture(3.2, 0.7, { width: 320, height: 70, bgColor: '#94a3b8', borderRadius: 8 });
    this.setCTAText("Contact Us", false);
    this.layerCTA.add(this.ctaTexture.mesh);
    this.layerCTA.position.set(0, -3.6, zOffset);
  }

  public setVagueCopyText(text: string, badge?: string, isApproved = false): void {
    const ctx = this.copyTexture.ctx;
    this.copyTexture.clear({
      bgColor: isApproved ? '#ecfdf5' : '#fef2f2',
      borderColor: isApproved ? '#10b981' : '#fca5a5',
      borderWidth: 3,
      borderRadius: 8
    });

    ctx.fillStyle = isApproved ? '#065f46' : '#991b1b';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(text, 25, 42);

    if (badge) {
      ctx.fillStyle = isApproved ? '#10b981' : '#ef4444';
      ctx.fillRect(390, 15, 160, 40);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badge, 470, 41);
      ctx.textAlign = 'left';
    }

    this.copyTexture.update();
  }

  public setCTAText(text: string, isHighContrast = false): void {
    const ctx = this.ctaTexture.ctx;
    this.ctaTexture.clear({
      bgColor: isHighContrast ? '#10b981' : '#94a3b8',
      borderRadius: 10
    });

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, 160, 43);
    ctx.textAlign = 'left';

    this.ctaTexture.update();
  }

  public resetPositions(): void {
    const zOffset = 0.1;
    this.layerNav.position.set(0, 3.8, zOffset);
    this.layerHero.position.set(0, 2.9, zOffset);
    this.layerVagueCopy.position.set(0, 2.0, zOffset);
    this.layerImage.position.set(0, 0.5, zOffset);
    this.layerCards.position.set(0, -1.3, zOffset);
    this.layerProof.position.set(0, -2.6, zOffset);
    this.layerCTA.position.set(0, -3.6, zOffset);
  }
}
