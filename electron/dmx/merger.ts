// Merges DMX from several sources into VD-Link universes.
// Rules: sources time out after 2.5 s; per universe the highest sACN priority wins
// (Art-Net counts as priority 100, the sACN default); equal priorities are merged HTP.
// Universe numbering: VD universe = Art-Net Port-Address + 1 + artnetOffset
//                     VD universe = sACN universe + sacnOffset

export interface DmxFrame {
  proto: 'artnet' | 'sacn';
  /** Native universe number of the protocol (Art-Net 0-based, sACN 1-based). */
  universe: number;
  data: Uint8Array;
  sourceKey: string;
  sourceName: string;
  address: string;
  priority: number;
  terminated?: boolean;
}

interface SourceState {
  data: Uint8Array;
  priority: number;
  lastSeen: number;
  frames: number;
  proto: DmxFrame['proto'];
  name: string;
  address: string;
  vdUniverse: number;
}

export interface SourceInfo {
  proto: DmxFrame['proto'];
  name: string;
  address: string;
  vdUniverse: number;
  nativeUniverse: string;
  priority: number;
  fps: number;
}

const TIMEOUT_MS = 2500;

export class DmxMerger {
  readonly universeCount: number;
  readonly output: Uint8Array;
  private sources = new Map<string, SourceState>();
  private fpsWindow = new Map<string, number>();
  private lastFpsCalc = Date.now();
  private fps = new Map<string, number>();
  dirty = false;

  artnetOffset = 0;
  sacnOffset = 0;

  constructor(universeCount: number) {
    this.universeCount = universeCount;
    this.output = new Uint8Array(universeCount * 512);
  }

  push(f: DmxFrame) {
    const vd = f.proto === 'artnet' ? f.universe + 1 + this.artnetOffset : f.universe + this.sacnOffset;
    if (f.terminated) {
      this.sources.delete(f.sourceKey);
      this.recompute(vd);
      return;
    }
    if (vd < 1 || vd > this.universeCount) return;
    let s = this.sources.get(f.sourceKey);
    if (!s) {
      s = {
        data: new Uint8Array(512),
        priority: f.priority,
        lastSeen: 0,
        frames: 0,
        proto: f.proto,
        name: f.sourceName,
        address: f.address,
        vdUniverse: vd,
      };
      this.sources.set(f.sourceKey, s);
    }
    s.data.fill(0);
    s.data.set(f.data.subarray(0, 512));
    s.priority = f.priority;
    s.lastSeen = Date.now();
    s.frames++;
    s.vdUniverse = vd;
    this.fpsWindow.set(f.sourceKey, (this.fpsWindow.get(f.sourceKey) ?? 0) + 1);
    this.recompute(vd);
  }

  /** Drops stale sources; returns true if something changed. */
  expire(): boolean {
    const now = Date.now();
    const touched = new Set<number>();
    for (const [k, s] of this.sources) {
      if (now - s.lastSeen > TIMEOUT_MS) {
        this.sources.delete(k);
        touched.add(s.vdUniverse);
      }
    }
    touched.forEach((u) => this.recompute(u));
    if (now - this.lastFpsCalc >= 1000) {
      const dt = (now - this.lastFpsCalc) / 1000;
      this.fps.clear();
      for (const [k, n] of this.fpsWindow) this.fps.set(k, n / dt);
      this.fpsWindow.clear();
      this.lastFpsCalc = now;
    }
    return touched.size > 0;
  }

  get hasActiveSources() {
    return this.sources.size > 0;
  }

  info(): SourceInfo[] {
    return [...this.sources.entries()].map(([k, s]) => ({
      proto: s.proto,
      name: s.name,
      address: s.address,
      vdUniverse: s.vdUniverse,
      nativeUniverse:
        s.proto === 'artnet'
          ? `Art-Net ${s.vdUniverse - 1 - this.artnetOffset}`
          : `sACN ${s.vdUniverse - this.sacnOffset}`,
      priority: s.priority,
      fps: Math.round(this.fps.get(k) ?? 0),
    }));
  }

  private recompute(vd: number) {
    if (vd < 1 || vd > this.universeCount) return;
    const out = this.output.subarray((vd - 1) * 512, vd * 512);
    let best = -1;
    for (const s of this.sources.values()) if (s.vdUniverse === vd) best = Math.max(best, s.priority);
    out.fill(0);
    if (best >= 0) {
      for (const s of this.sources.values()) {
        if (s.vdUniverse !== vd || s.priority !== best) continue;
        for (let i = 0; i < 512; i++) if (s.data[i] > out[i]) out[i] = s.data[i];
      }
    }
    this.dirty = true;
  }
}
