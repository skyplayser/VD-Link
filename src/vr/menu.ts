// Menu inside VR: a panel that appears in front of you (B/Y or menu button), operated by
// pointing with either controller and pulling the trigger. Big buttons, few levels.

import * as THREE from 'three/webgpu';

export interface MenuButton {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  on?: boolean;
  /** Section title above a row (drawn once). */
}

export interface MenuModel {
  title: string;
  status: string;
  statusOk: boolean;
  sections: { title: string; buttons: Omit<MenuButton, 'x' | 'y' | 'w' | 'h'>[] }[];
  footer: Omit<MenuButton, 'x' | 'y' | 'w' | 'h'>[];
}

const W = 1280;
const H = 1160;
const PAD = 40;

export class VrMenu {
  readonly mesh: THREE.Mesh;
  private canvas = document.createElement('canvas');
  private g: CanvasRenderingContext2D;
  private tex: THREE.CanvasTexture;
  private buttons: MenuButton[] = [];
  private hover = '';
  private model: MenuModel | null = null;
  /** Panel size in metres. */
  readonly width = 0.96;
  readonly height = (0.96 * H) / W;

  constructor() {
    this.canvas.width = W;
    this.canvas.height = H;
    this.g = this.canvas.getContext('2d')!;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicNodeMaterial({ map: this.tex, transparent: true, depthTest: false, toneMapped: false });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height), mat);
    this.mesh.renderOrder = 10;
    this.mesh.visible = false;
  }

  get open() {
    return this.mesh.visible;
  }

  /** Show in front of the head: 0.85 m ahead, slightly below eye height, facing you. */
  show(head: THREE.Vector3, headDir: THREE.Vector3) {
    const d = new THREE.Vector3(headDir.x, 0, headDir.z).normalize();
    if (!isFinite(d.x)) d.set(0, 0, -1);
    this.mesh.position.copy(head).addScaledVector(d, 0.85).add(new THREE.Vector3(0, -0.12, 0));
    this.mesh.lookAt(head.x, this.mesh.position.y, head.z);
    this.mesh.visible = true;
  }

  hide() {
    this.mesh.visible = false;
    this.hover = '';
  }

  set(model: MenuModel) {
    this.model = model;
    this.draw();
  }

  /** Pointer ray → button id under it (or '' when on the panel but not on a button, null when off the panel). */
  pick(ray: THREE.Ray): string | null {
    if (!this.mesh.visible) return null;
    const inv = this.mesh.matrixWorld.clone().invert();
    const r = ray.clone().applyMatrix4(inv);
    const t = -r.origin.z / r.direction.z;
    if (!(t > 0)) return null;
    const p = r.origin.clone().addScaledVector(r.direction, t);
    if (Math.abs(p.x) > this.width / 2 || Math.abs(p.y) > this.height / 2) return null;
    const px = (p.x / this.width + 0.5) * W;
    const py = (0.5 - p.y / this.height) * H;
    const b = this.buttons.find((b) => px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h);
    return b?.id ?? '';
  }

  /** Point of the ray on the panel (for the pointer dot), or null. */
  hitPoint(ray: THREE.Ray): THREE.Vector3 | null {
    if (!this.mesh.visible) return null;
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1).applyQuaternion(this.mesh.quaternion), this.mesh.position);
    const p = ray.intersectPlane(plane, new THREE.Vector3());
    return p && this.pick(ray) !== null ? p : null;
  }

  setHover(id: string) {
    if (id === this.hover) return;
    this.hover = id;
    this.draw();
  }

  private draw() {
    const m = this.model;
    const g = this.g;
    if (!m) return;
    g.clearRect(0, 0, W, H);
    // Panel
    g.fillStyle = 'rgba(14,14,20,0.94)';
    round(g, 0, 0, W, H, 36);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.12)';
    g.lineWidth = 3;
    g.stroke();
    // Title + status
    g.fillStyle = '#ffffff';
    g.font = '700 46px system-ui, -apple-system, Segoe UI, sans-serif';
    g.textBaseline = 'middle';
    g.textAlign = 'left';
    g.fillText(m.title, PAD, 62);
    g.font = '500 30px system-ui, sans-serif';
    g.fillStyle = m.statusOk ? '#5dffa8' : '#ff8a8a';
    g.beginPath();
    g.arc(PAD + 9, 112, 9, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#b8b8c8';
    g.fillText(m.status, PAD + 30, 113);
    this.buttons = [];
    let y = 160;
    for (const s of m.sections) {
      if (s.title) {
        g.fillStyle = '#8a8a9c';
        g.font = '600 26px system-ui, sans-serif';
        g.fillText(s.title.toUpperCase(), PAD, y + 14);
        y += 38;
      } else y -= 10;
      const n = s.buttons.length;
      const gap = 16;
      const bw = (W - 2 * PAD - gap * (n - 1)) / n;
      s.buttons.forEach((b, i) => this.button({ ...b, x: PAD + i * (bw + gap), y, w: bw, h: 78 }));
      y += 78 + 26;
    }
    const n = m.footer.length;
    const gap = 16;
    const bw = (W - 2 * PAD - gap * (n - 1)) / n;
    m.footer.forEach((b, i) => this.button({ ...b, x: PAD + i * (bw + gap), y: H - PAD - 84, w: bw, h: 84 }));
    this.tex.needsUpdate = true;
  }

  private button(b: MenuButton) {
    const g = this.g;
    this.buttons.push(b);
    const hot = this.hover === b.id;
    g.fillStyle = b.on ? (hot ? '#ff6f9f' : '#ff4f8b') : hot ? '#3a3a50' : '#24242f';
    round(g, b.x, b.y, b.w, b.h, 18);
    g.fill();
    if (hot) {
      g.strokeStyle = '#ffffff';
      g.lineWidth = 4;
      g.stroke();
    }
    g.fillStyle = '#ffffff';
    g.textAlign = 'center';
    g.font = `600 ${b.label.length > 14 ? 28 : 32}px system-ui, sans-serif`;
    g.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + 1, b.w - 16);
    g.textAlign = 'left';
  }
}

/** A short hint panel (controls), fades out by itself. */
export class VrHint {
  readonly mesh: THREE.Mesh;
  private until = 0;
  constructor(lines: string[]) {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 96 + lines.length * 58;
    const g = c.getContext('2d')!;
    g.fillStyle = 'rgba(14,14,20,0.9)';
    round(g, 0, 0, c.width, c.height, 30);
    g.fill();
    g.fillStyle = '#ffffff';
    g.font = '700 40px system-ui, sans-serif';
    g.textBaseline = 'middle';
    g.fillText('So bewegst du dich', 36, 52);
    g.font = '500 32px system-ui, sans-serif';
    g.fillStyle = '#d0d0dc';
    lines.forEach((l, i) => g.fillText(l, 36, 112 + i * 58));
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const w = 0.8;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, (w * c.height) / c.width), new THREE.MeshBasicNodeMaterial({ map: tex, transparent: true, depthTest: false, toneMapped: false }));
    this.mesh.renderOrder = 9;
    this.mesh.visible = false;
  }

  show(head: THREE.Vector3, dir: THREE.Vector3, seconds = 10) {
    const d = new THREE.Vector3(dir.x, 0, dir.z).normalize();
    if (!isFinite(d.x)) d.set(0, 0, -1);
    this.mesh.position.copy(head).addScaledVector(d, 1.2).add(new THREE.Vector3(0, -0.25, 0));
    this.mesh.lookAt(head.x, this.mesh.position.y, head.z);
    this.mesh.visible = true;
    this.until = performance.now() + seconds * 1000;
  }

  update() {
    if (this.mesh.visible && performance.now() > this.until) this.mesh.visible = false;
  }

  hide() {
    this.mesh.visible = false;
  }
}

function round(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
