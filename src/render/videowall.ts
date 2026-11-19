// A video screen = one picture source (internal test image, captured (virtual) monitor,
// NDI® stream, later Syphon/Spout) shown on one or more LED surfaces.
// - The screen has a pixel size (its "output", e.g. one HDMI signal). Every surface shows
//   its pixel rect of that output, exactly like an LED processor mapping; a single wall
//   is one surface covering the whole output.
// - When the source has a different size than the output, `fit` decides how it lands
//   on the output: 'fit' (whole picture, undistorted, black bars), 'pixel' (1:1 pixels
//   from a position in the source, like a processor taking a part of a bigger signal) or
//   'stretch' (fill, distorted).
// - When an NDI® stream stops, the screen notices it and shows black, the last picture
//   or the test image (`onLoss`), like the "no signal" setting of an LED processor.
// Every surface also spills its average colour into the room.

import * as THREE from 'three/webgpu';
import { float, select, texture, uniform, uv, vec2, vec3 } from 'three/tsl';
import { drawTestPattern } from './testpattern-draw.ts';
import { ndiAttach, type NdiFeed } from './ndi-client.ts';

export type WallSource =
  | { kind: 'test' }
  | { kind: 'capture'; sourceId: string; label: string }
  /** NDI® source by its network name; `low` = NDI's low-bandwidth preview stream. */
  | { kind: 'ndi'; name: string; url: string; low: boolean }
  /** Pictures pushed in from outside (VR headset: the desktop sends what its wall shows). */
  | { kind: 'remote' };

/** What a screen shows, for mirrors (VR): own test image, a live picture, or black. */
export type MirrorState = 'test' | 'live' | 'black';

export type FitMode = 'fit' | 'pixel' | 'stretch';
export type LossMode = 'black' | 'freeze' | 'test';

/** What a project remembers per screen (key: screen name). Captures are not stored: their ids change on every start. */
export interface ScreenSettings {
  source: Exclude<WallSource, { kind: 'capture' }>;
  fit: FitMode;
  /** Pixel position in the source for fit = 'pixel'. */
  offset: [number, number];
  onLoss: LossMode;
  brightness: number;
}

export const DEFAULT_SCREEN: Omit<ScreenSettings, 'source'> = { fit: 'fit', offset: [0, 0], onLoss: 'black', brightness: 1 };

/** No frame for this long = connection lost. */
const LOSS_MS = 1500;

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
  private feed: NdiFeed | null = null;
  private detach: (() => void) | null = null;
  private surfaces: Surface[] = [];
  private sample = document.createElement('canvas');
  private sampleCtx: CanvasRenderingContext2D;
  private lastSample = 0;
  /** Output → source mapping in top-left normalised coordinates: scale x, y, offset x, y. */
  private readonly map = uniform(new THREE.Vector4(1, 1, 0, 0));
  /** 0 = black (lost signal). */
  private readonly blank = uniform(1.0);
  readonly brightness = uniform(1.0);
  source: WallSource = { kind: 'test' };
  fit: FitMode = DEFAULT_SCREEN.fit;
  offset: [number, number] = [0, 0];
  onLoss: LossMode = DEFAULT_SCREEN.onLoss;
  status = 'Testbild';
  /** True while an NDI® stream has stopped delivering pictures. */
  lost = false;
  private remoteTex: THREE.Texture | null = null;
  private remoteImg: ImageBitmap | null = null;
  private remoteState: MirrorState = 'test';
  private snapCanvas: HTMLCanvasElement | null = null;
  /** Test image redraws per second (0 = every frame). Headsets use fewer to save CPU. */
  testFps = 0;
  private lastTest = -1;

  /** Room spill lights on/off (each is a point light every lit surface pays for). */
  set spillOn(on: boolean) {
    this.spillEnabled = on;
    for (const s of this.surfaces) s.spill.visible = on;
  }
  private spillEnabled = true;

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
    const [W, H] = pixels;

    for (const spec of specs) {
      const holder = new THREE.Group();
      holder.position.set(...spec.pos);
      const d = Math.PI / 180;
      holder.rotation.set(spec.rot[0] * d, spec.rot[1] * d, spec.rot[2] * d);
      // Fragment → position in the output (top-left origin, 0…1) → position in the source.
      const [x, y, w, h] = spec.rect ?? [0, 0, W, H];
      const ox = uv().x.mul(w / W).add(x / W);
      const oy = float(1).sub(uv().y).mul(h / H).add(y / H);
      const sx = ox.mul(this.map.x).add(this.map.z);
      const sy = oy.mul(this.map.y).add(this.map.w);
      const st = vec2(sx, float(1).sub(sy));
      const tex = texture(this.canvasTex, st);
      const inside = sx.greaterThanEqual(0).and(sx.lessThanEqual(1)).and(sy.greaterThanEqual(0)).and(sy.lessThanEqual(1));
      const mat = new THREE.MeshBasicNodeMaterial();
      mat.colorNode = select(inside, (tex as any).rgb.mul(this.brightness).mul(this.blank), vec3(0, 0, 0));
      mat.opacityNode = float(1);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(spec.width, spec.height), mat);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(spec.width + 0.12, spec.height + 0.12, 0.12), frameMat);
      frame.position.z = -0.07;
      const spill = new THREE.PointLight(0xffffff, 0, 0, 2);
      spill.position.set(0, 0, 1.5);
      holder.add(frame, mesh, spill);
      this.group.add(holder);
      this.surfaces.push({ spec, mesh, tex, spill });
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

  /** Pixel size of the current source picture (0 × 0 while none). */
  get sourceSize(): [number, number] {
    if (this.source.kind === 'ndi') return [this.feed?.w ?? 0, this.feed?.h ?? 0];
    if (this.source.kind === 'capture') return [this.video?.videoWidth ?? 0, this.video?.videoHeight ?? 0];
    if (this.source.kind === 'remote') return [this.remoteImg?.width ?? 0, this.remoteImg?.height ?? 0];
    return [...this.pixels];
  }

  /** Settings to store in the project. */
  settings(): ScreenSettings {
    const src = this.source.kind === 'capture' || this.source.kind === 'remote' ? { kind: 'test' as const } : this.source;
    return { source: src, fit: this.fit, offset: [...this.offset], onLoss: this.onLoss, brightness: this.brightness.value };
  }

  /** Restore stored settings (an NDI® source connects as soon as it is on the network). */
  async applySettings(s: Partial<ScreenSettings>) {
    if (s.fit === 'fit' || s.fit === 'pixel' || s.fit === 'stretch') this.fit = s.fit;
    if (Array.isArray(s.offset) && s.offset.length === 2) this.offset = [Math.max(0, Math.round(Number(s.offset[0]) || 0)), Math.max(0, Math.round(Number(s.offset[1]) || 0))];
    if (s.onLoss === 'black' || s.onLoss === 'freeze' || s.onLoss === 'test') this.onLoss = s.onLoss;
    if (typeof s.brightness === 'number' && isFinite(s.brightness)) this.brightness.value = Math.min(2, Math.max(0, s.brightness));
    if (s.source?.kind === 'ndi' && s.source.name) await this.setSource({ kind: 'ndi', name: String(s.source.name), url: String(s.source.url ?? ''), low: !!s.source.low });
  }

  async setSource(src: WallSource) {
    this.stopCapture();
    this.source = src;
    this.lost = false;
    this.blank.value = 1;
    if (src.kind === 'test' || src.kind === 'remote') {
      for (const s of this.surfaces) s.tex.value = this.canvasTex;
      this.status = src.kind === 'test' ? 'Testbild' : 'Bild von VD-Link';
      return;
    }
    this.status = 'verbinde…';
    if (src.kind === 'ndi') {
      const label = src.name + (src.low ? ' · Vorschau' : '');
      this.status = `NDI®: ${label} – verbinde…`;
      const { feed, detach } = await ndiAttach(src, () => {});
      // Source changed again while connecting.
      if (this.source !== src) return detach();
      this.feed = feed;
      this.detach = detach;
      return;
    }
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

  /** VR headset: a new picture of this screen from the desktop (top row first), or a state change. */
  setRemote(img: ImageBitmap | null, state: MirrorState) {
    if (this.source.kind !== 'remote') this.source = { kind: 'remote' };
    this.remoteState = state;
    if (!img) return;
    const old = this.remoteImg;
    if (!this.remoteTex || !old || old.width !== img.width || old.height !== img.height) {
      this.remoteTex?.dispose();
      const t = new THREE.Texture(img);
      t.colorSpace = THREE.SRGBColorSpace;
      t.flipY = false;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      this.remoteTex = t;
    } else this.remoteTex.image = img;
    this.remoteTex.needsUpdate = true;
    this.remoteImg = img;
    old?.close();
  }

  /** What a mirror (VR headset) should show for this screen. */
  get mirrorState(): MirrorState {
    if (this.source.kind === 'test' || this.source.kind === 'remote') return 'test';
    if (this.source.kind === 'ndi') {
      if (this.lost) return this.onLoss === 'test' ? 'test' : this.onLoss === 'black' ? 'black' : 'live';
      return this.feed?.tex ? 'live' : 'black';
    }
    return this.video && this.video.readyState >= 2 ? 'live' : 'black';
  }

  /**
   * Desktop: the current source picture, scaled to at most `maxW` pixels wide (top row first),
   * for a mirror. Null when there is no live picture (test image: the mirror draws its own).
   */
  snapshot(maxW: number): HTMLCanvasElement | null {
    if (this.mirrorState !== 'live') return null;
    let src: CanvasImageSource | null = null;
    let w = 0;
    let h = 0;
    let flip = false;
    if (this.source.kind === 'capture' && this.video) {
      src = this.video;
      w = this.video.videoWidth;
      h = this.video.videoHeight;
    } else if (this.source.kind === 'ndi' && this.feed?.tex) {
      const img = this.feed.tex.image as { data: Uint8Array; width: number; height: number };
      w = img.width;
      h = img.height;
      // NDI frames are bottom row first → through a canvas, flipped when drawn.
      const tmp = (this.ndiCanvas ??= document.createElement('canvas'));
      if (tmp.width !== w || tmp.height !== h) {
        tmp.width = w;
        tmp.height = h;
      }
      tmp.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(img.data.buffer as ArrayBuffer, img.data.byteOffset, w * h * 4), w, h), 0, 0);
      src = tmp;
      flip = true;
    }
    if (!src || !w || !h) return null;
    const k = Math.min(1, maxW / w);
    const out = (this.snapCanvas ??= document.createElement('canvas'));
    const ow = Math.max(1, Math.round(w * k));
    const oh = Math.max(1, Math.round(h * k));
    if (out.width !== ow || out.height !== oh) {
      out.width = ow;
      out.height = oh;
    }
    const g = out.getContext('2d')!;
    g.save();
    if (flip) {
      g.translate(0, oh);
      g.scale(1, -1);
    }
    g.drawImage(src, 0, 0, ow, oh);
    g.restore();
    return out;
  }

  private ndiCanvas: HTMLCanvasElement | null = null;

  private stopCapture() {
    this.detach?.();
    this.detach = null;
    this.feed = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.video = null;
    this.videoTex?.dispose();
    this.videoTex = null;
  }

  /** Output → source mapping for the current source size and fit mode. */
  private updateMap(showTest: boolean) {
    const m = this.map.value as THREE.Vector4;
    const [W, H] = this.pixels;
    const [sw, sh] = this.sourceSize;
    if (showTest || !sw || !sh || this.fit === 'stretch') return void m.set(1, 1, 0, 0);
    if (this.fit === 'pixel') return void m.set(W / sw, H / sh, this.offset[0] / sw, this.offset[1] / sh);
    // fit: the whole source inside the output, centred, undistorted.
    const src = sw / sh;
    const out = W / H;
    const bw = src > out ? 1 : src / out;
    const bh = src > out ? out / src : 1;
    m.set(1 / bw, 1 / bh, -(1 - bw) / (2 * bw), -(1 - bh) / (2 * bh));
  }

  private ndiStatus(f: NdiFeed, src: Extract<WallSource, { kind: 'ndi' }>, now: number) {
    const label = src.name + (src.low ? ' · Vorschau' : '');
    if (this.lost) {
      const secs = Math.round((now - f.lastFrame) / 1000);
      const shows = this.onLoss === 'black' ? 'Schwarz' : this.onLoss === 'freeze' ? 'letztes Bild' : 'Testbild';
      return `NDI®: ${label} – Verbindung verloren (seit ${secs} s, zeigt ${shows})`;
    }
    const st = f.state;
    if (st.state === 'error') return `NDI®: ${label} – Fehler (${st.error ?? '?'})`;
    if (f.lastFrame && st.state === 'live') return `NDI®: ${label} (${st.w}×${st.h} @ ${st.fps} fps)`;
    if (f.lastFrame) return `NDI®: ${label} (${f.w}×${f.h})`;
    return `NDI®: ${label} – warte auf Bild…`;
  }

  update(t: number) {
    const now = performance.now();
    const src = this.source;
    let showTest = src.kind === 'test';
    if (src.kind === 'remote') {
      showTest = this.remoteState === 'test' || (!this.remoteImg && this.remoteState !== 'black');
      this.blank.value = this.remoteState === 'black' ? 0 : 1;
      const want = showTest || !this.remoteTex ? this.canvasTex : this.remoteTex;
      for (const s of this.surfaces) if (s.tex.value !== want) s.tex.value = want;
    }
    if (src.kind === 'ndi') {
      const f = this.feed;
      this.lost = !!f && f.lastFrame > 0 && now - f.lastFrame > LOSS_MS;
      if (f) this.status = this.ndiStatus(f, src, now);
      const picture = f?.tex ?? null;
      showTest = this.lost && this.onLoss === 'test';
      this.blank.value = this.lost && this.onLoss === 'black' ? 0 : 1;
      const want = showTest || !picture ? this.canvasTex : picture;
      if (!picture && !showTest) this.blank.value = 0;
      for (const s of this.surfaces) if (s.tex.value !== want) s.tex.value = want;
    }
    this.updateMap(showTest);
    if (showTest && (!this.testFps || t - this.lastTest >= 1 / this.testFps || t < this.lastTest)) {
      this.lastTest = t;
      drawTestPattern(this.ctx, this.canvas.width, this.canvas.height, t, this.name);
      if (this.shared) this.drawMapping();
      this.canvasTex.needsUpdate = true;
    }
    // Room spill: average colour of each surface's part of the picture, ~7×/s.
    if (this.spillEnabled && t - this.lastSample > 0.15) {
      this.lastSample = t;
      this.updateSpill(showTest);
    }
  }

  private updateSpill(showTest: boolean) {
    let d: Uint8Array | Uint8ClampedArray | null = null;
    if (!showTest && this.source.kind === 'ndi') d = this.feed?.spill ?? null;
    else {
      const src: CanvasImageSource | null = showTest ? this.canvas : this.source.kind === 'remote' ? this.remoteImg : this.video;
      if (src && (!(src instanceof HTMLVideoElement) || src.readyState >= 2)) {
        // Remote pictures arrive upside down (texture convention) – sample them the right way up.
        const up = src === this.remoteImg;
        this.sampleCtx.save();
        if (up) {
          this.sampleCtx.translate(0, 16);
          this.sampleCtx.scale(1, -1);
        }
        this.sampleCtx.drawImage(src, 0, 0, 16, 16);
        this.sampleCtx.restore();
        d = this.sampleCtx.getImageData(0, 0, 16, 16).data;
      }
    }
    const dark = this.blank.value === 0;
    const m = this.map.value as THREE.Vector4;
    const [W, H] = this.pixels;
    for (const s of this.surfaces) {
      if (!d || dark) {
        s.spill.intensity = 0;
        continue;
      }
      // The surface's part of the output, in source coordinates (16 × 16 grid).
      const [x, y, w, h] = s.spec.rect ?? [0, 0, W, H];
      const cl = (v: number) => Math.min(16, Math.max(0, v * 16));
      const x0 = Math.floor(cl((x / W) * m.x + m.z));
      const x1 = Math.ceil(cl(((x + w) / W) * m.x + m.z));
      const y0 = Math.floor(cl((y / H) * m.y + m.w));
      const y1 = Math.ceil(cl(((y + h) / H) * m.y + m.w));
      let r = 0,
        g = 0,
        b = 0,
        n = 0;
      for (let yy = y0; yy < Math.max(y0 + 1, y1) && yy < 16; yy++)
        for (let xx = x0; xx < Math.max(x0 + 1, x1) && xx < 16; xx++) {
          const i = (yy * 16 + xx) * 4;
          r += d[i];
          g += d[i + 1];
          b += d[i + 2];
          n++;
        }
      if (!n || x1 <= x0 || y1 <= y0) {
        s.spill.intensity = 0;
        continue;
      }
      s.spill.color.setRGB(r / n / 255, g / n / 255, b / n / 255, THREE.SRGBColorSpace);
      // Bigger surfaces throw more light.
      s.spill.intensity = Math.min(30, 2.4 * s.spec.width * s.spec.height) * this.brightness.value;
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
