import * as THREE from 'three';

export interface CanvasTextOptions {
  width?: number;
  height?: number;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
}

export class DynamicCanvasTexture {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public texture: THREE.CanvasTexture;
  public mesh: THREE.Mesh;
  private width: number;
  private height: number;

  constructor(planeWidth: number, planeHeight: number, options: CanvasTextOptions = {}) {
    this.width = options.width || 1024;
    this.height = options.height || Math.round(1024 * (planeHeight / planeWidth));

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    this.ctx = ctx;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = true;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshStandardMaterial({
      map: this.texture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.05
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.clear(options);
  }

  public clear(options: CanvasTextOptions = {}): void {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    if (options.bgColor) {
      ctx.fillStyle = options.bgColor;
      if (options.borderRadius && options.borderRadius > 0) {
        this.roundRect(0, 0, width, height, options.borderRadius);
        ctx.fill();
      } else {
        ctx.fillRect(0, 0, width, height);
      }
    }

    if (options.borderColor && options.borderWidth) {
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      if (options.borderRadius && options.borderRadius > 0) {
        this.roundRect(options.borderWidth / 2, options.borderWidth / 2, width - options.borderWidth, height - options.borderWidth, options.borderRadius);
        ctx.stroke();
      } else {
        ctx.strokeRect(options.borderWidth / 2, options.borderWidth / 2, width - options.borderWidth, height - options.borderWidth);
      }
    }
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  public update(): void {
    this.texture.needsUpdate = true;
  }
}
