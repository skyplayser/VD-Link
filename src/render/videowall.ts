// A video screen = one picture source (internal test image, captured (virtual) monitor,
// later Syphon/Spout) shown on one or more LED surfaces.
// - Single wall: the whole picture, never stretched (letterbox if the format differs).
// - Shared output (one HDMI → several walls): each surface shows its pixel rect of the
//   output, exactly like an LED processor mapping.
// Every surface also spills its average colour into the room.

import * as THREE from 'three/webgpu';
import { float, select, texture, uniform, uv, vec2, vec3 } from 'three/tsl';
import { drawTestPattern } from './testpattern-draw.ts';

export type WallSource = { kind: 'test' } | { kind: 'capture'; sourceId: string; label: string };

export interface SurfaceSpec {
  name: string;
  width: number;
  height: number;
  pos: [number, number, number];
  /** Degrees. */
  rot: [number, number, number];
  /** Pixel rect x, y, w, h inside the output (shared outputs only). */
  rect?: [number, number, number, number];
}

interface Surface {
  spec: SurfaceSpec;
  mesh: THREE.Mesh;
  tex: ReturnType<typeof texture>;
  fit: ReturnType<typeof uniform>;
  spill: THREE.PointLight;
}

export class VideoWall {
  readonly group = new THREE.Group();
  private canvas = document.createElement('canvas');
  private ctx: CanvasRenderingContext2D;
  private canvasTex: THREE.CanvasTexture;
  private videoTex: THREE.VideoTexture | null = null;
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private surfaces: Surface[] = [];
  private sample = document.createElement('canvas');
  private sampleCtx: CanvasRenderingContext2D;
  private lastSample = 0;
  readonly brightness = uniform(1.0);
  source: WallSource = { kind: 'test' };
  status = 'Testbild';

  constructor(
    readonly name: string,
    readonly pixels: [number, number],
    specs: SurfaceSpec[],
    /** true = one output feeding several walls (pixel mapping). */
    readonly shared = false,
  ) {
    this.canvas.width = Math.max(32, Math.round(pixels[0] / 2));
    this.canvas.height = Math.max(32, Math.round(pixels[1] / 2));
    this.ctx = this.canvas.getContext('2d')!;
    this.canvasTex = new THREE.CanvasTexture(this.canvas);
    this.canvasTex.colorSpace = THREE.SRGBColorSpace;
    this.sample.width = 16;
    this.sample.height = 16;
    this.sampleCtx = this.sample.getContext('2d', { willReadFrequently: true })!;
    const frameMat = new THREE.MeshStandardNodeMaterial({ color: 0x0b0b0d, roughness: 0.6 });

    for (const spec of specs) {
      const holder = new THREE.Group();
      holder.position.set(...spec.pos);
      const d = Math.PI / 180;
      holder.rotation.set(spec.rot[0] * d, spec.rot[1] * d, spec.rot[2] * d);
      const fit = uniform(new THREE.Vector2(1, 1));
      let st;
      if (spec.rect) {
        // Pixel rect (origin top-left) → texture UV (origin bottom-left).
        const [x, y, w, h] = spec.rect;
        const u0 = x / pixels[0];
        const uw = w / pixels[0];
        const v1 = 1 - y / pixels[1];
        const vh = h / pixels[1];
        st = vec2(uv().x.mul(uw).add(u0), uv().y.mul(vh).add(v1 - vh));
      } else st = uv().sub(0.5).mul(fit).add(0.5);
      const tex = texture(this.canvasTex, st);
      const inside = st.x.greaterThanEqual(0).and(st.x.lessThanEqual(1)).and(st.y.greaterThanEqual(0)).and(st.y.lessThanEqual(1));
      const mat = new THREE.MeshBasicNodeMaterial();
      mat.colorNode = select(inside, (tex as any).rgb.mul(this.brightness), vec3(0, 0, 0));
      mat.opacityNode = float(1);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(spec.width, spec.height), mat);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(spec.width + 0.12, spec.height + 0.12, 0.12), frameMat);
      frame.position.z = -0.07;
      const spill = new THREE.PointLight(0xffffff, 0, 0, 2);
      spill.position.set(0, 0, 1.5);
      holder.add(frame, mesh, spill);
      this.group.add(holder);
      this.surfaces.push({ spec, mesh, tex, fit, spill });
    }
  }

  /** Physical size of the first surface (shown in the UI). */
  get widthM() {
    return this.surfaces[0]?.spec.width ?? 0;
  }

  get heightM() {
    return this.surfaces[0]?.spec.height ?? 0;
  }

  get members(): string[] {
    return this.surfaces.map((s) => s.spec.name);
  }

  get rects(): { name: string; rect?: [number, number, number, number] }[] {
    return this.surfaces.map((s) => ({ name: s.spec.name, rect: s.spec.rect }));
  }

  async setSource(src: WallSource) {
    this.stopCapture();
    this.source = src;
    if (src.kind === 'test') {
      for (const s of this.surfaces) s.tex.value = this.canvasTex;
      this.status = 'Testbild';
      return;
    }
    this.status = 'verbinde…';
    await window.vd.selectCaptureSource(src.sourceId);
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 60 }, audio: false });
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.srcObject = stream;
    await video.play();
    this.stream = stream;
    this.video = video;
    this.videoTex = new THREE.VideoTexture(video);
    this.videoTex.colorSpace = THREE.SRGBColorSpace;
    for (const s of this.surfaces) s.tex.value = this.videoTex;
    const st = stream.getVideoTracks()[0]?.getSettings();
    this.status = `Capture: ${src.label} (${st?.width}×${st?.height} @ ${Math.round(st?.frameRate ?? 0)} fps)`;
  }

  dispose() {
    this.stopCapture();
    this.canvasTex.dispose();
  }

  private stopCapture() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.video = null;
    this.videoTex?.dispose();
    this.videoTex = null;
  }

  /** Single walls: content aspect vs. wall aspect → UV scale (never stretch). */
  private updateFit() {
    if (this.shared) return;
    const v = this.video;
    const cw = this.source.kind === 'test' ? this.canvas.width : v?.videoWidth || 0;
    const ch = this.source.kind === 'test' ? this.canvas.height : v?.videoHeight || 0;
    if (!cw || !ch) return;
    const content = cw / ch;
    for (const s of this.surfaces) {
      const wall = s.spec.width / s.spec.height;
      (s.fit.value as THREE.Vector2).set(content > wall ? 1 : wall / content, content > wall ? content / wall : 1);
    }
  }

  update(t: number) {
    this.updateFit();
    if (this.source.kind === 'test') {
      drawTestPattern(this.ctx, this.canvas.width, this.canvas.height, t, this.name);
      if (this.shared) this.drawMapping();
      this.canvasTex.needsUpdate = true;
    }
    // Room spill: average colour of each surface's part of the picture, ~7×/s.
    if (t - this.lastSample > 0.15) {
      this.lastSample = t;
      const src: CanvasImageSource | null = this.source.kind === 'test' ? this.canvas : this.video;
      if (src && (!(src instanceof HTMLVideoElement) || src.readyState >= 2)) {
        this.sampleCtx.drawImage(src, 0, 0, 16, 16);
        const d = this.sampleCtx.getImageData(0, 0, 16, 16).data;
        for (const s of this.surfaces) {
          const [x, y, w, h] = s.spec.rect ?? [0, 0, this.pixels[0], this.pixels[1]];
          const x0 = Math.floor((x / this.pixels[0]) * 16);
          const y0 = Math.floor((y / this.pixels[1]) * 16);
          const x1 = Math.max(x0 + 1, Math.ceil(((x + w) / this.pixels[0]) * 16));
          const y1 = Math.max(y0 + 1, Math.ceil(((y + h) / this.pixels[1]) * 16));
          let r = 0,
            g = 0,
            b = 0,
            n = 0;
          for (let yy = y0; yy < Math.min(16, y1); yy++)
            for (let xx = x0; xx < Math.min(16, x1); xx++) {
              const i = (yy * 16 + xx) * 4;
              r += d[i];
              g += d[i + 1];
              b += d[i + 2];
              n++;
            }
          if (!n) continue;
          s.spill.color.setRGB(r / n / 255, g / n / 255, b / n / 255, THREE.SRGBColorSpace);
          // Bigger surfaces throw more light.
          s.spill.intensity = Math.min(30, 2.4 * s.spec.width * s.spec.height) * this.brightness.value;
        }
      }
    }
  }

  /** Test image of a shared output: outline and name of every wall's area. */
  private drawMapping() {
    const g = this.ctx;
    const sx = this.canvas.width / this.pixels[0];
    const sy = this.canvas.height / this.pixels[1];
    g.save();
    g.lineWidth = 2;
    g.strokeStyle = '#ffffff';
    g.fillStyle = '#ffffff';
    g.textBaseline = 'top';
    g.textAlign = 'left';
    for (const s of this.surfaces) {
      if (!s.spec.rect) continue;
      const [x, y, w, h] = s.spec.rect;
      g.strokeRect(x * sx + 1, y * sy + 1, w * sx - 2, h * sy - 2);
      g.font = `600 ${Math.max(9, Math.min(h * sy * 0.35, 22))}px system-ui, sans-serif`;
      g.fillText(s.spec.name, x * sx + 6, y * sy + 4);
    }
    g.restore();
  }
}
