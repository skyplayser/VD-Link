// NDI® frames in the renderer: one MessagePort from the receiver process, frames
// dispatched to the video walls by key. NDI® is a registered trademark of Vizrt NDI AB.

import * as THREE from 'three/webgpu';

export interface NdiFrame {
  w: number;
  h: number;
  /** Tight RGBA, bottom row first. */
  data: Uint8Array;
  /** 16×16 RGBA average colours, top row first. */
  spill: Uint8Array;
}

export interface NdiState {
  state: 'connecting' | 'waiting' | 'live' | 'lost' | 'error';
  fps?: number;
  w?: number;
  h?: number;
  error?: string;
}

interface Listener {
  frame(f: NdiFrame): void;
  status(s: NdiState): void;
}

let port: MessagePort | null = null;
let ready: Promise<void> | null = null;
const listeners = new Map<string, Listener>();

function connect(): Promise<void> {
  if (ready) return ready;
  ready = new Promise((resolve) => {
    const onMsg = (e: MessageEvent) => {
      if (e.source !== window || !(e.data as { vdNdiPort?: boolean })?.vdNdiPort || !e.ports[0]) return;
      window.removeEventListener('message', onMsg);
      port = e.ports[0];
      port.onmessage = (ev) => {
        const m = ev.data as { t: string; key: string } & NdiFrame & NdiState;
        const l = listeners.get(m.key);
        if (m.t === 'frame') {
          l?.frame(m);
          // Ready for the next one (also when nobody listens any more).
          port?.postMessage({ t: 'ack', key: m.key });
        } else if (m.t === 'status') l?.status(m);
      };
      resolve();
    };
    window.addEventListener('message', onMsg);
    void window.vd.ndiConnect();
  });
  return ready;
}

export async function ndiSubscribe(key: string, l: Listener) {
  await connect();
  listeners.set(key, l);
}

export function ndiUnsubscribe(key: string) {
  listeners.delete(key);
}

// ------------------------------------------------------------------ shared receivers
// Several walls on the same source share one receiver and one texture: the stream is
// received and decoded once, however many walls show it.

export interface NdiFeed {
  /** Current picture (null until the first frame). */
  tex: THREE.DataTexture | null;
  spill: Uint8Array | null;
  w: number;
  h: number;
  /** performance.now() of the last frame, 0 = none yet. */
  lastFrame: number;
  state: NdiState;
}

interface Hub extends NdiFeed {
  key: string;
  users: Set<() => void>;
}

const hubs = new Map<string, Hub>();
let hubSerial = 0;

/** Attach to a source; `changed` runs after every frame and status. Returns detach. */
export async function ndiAttach(src: { name: string; url: string; low: boolean }, changed: () => void): Promise<{ feed: NdiFeed; detach: () => void }> {
  const id = `${src.name}\u0000${src.low ? 1 : 0}`;
  let hub = hubs.get(id);
  if (!hub) {
    const h: Hub = { key: `ndi${++hubSerial}-${Date.now()}`, tex: null, spill: null, w: 0, h: 0, lastFrame: 0, state: { state: 'connecting' }, users: new Set() };
    hub = h;
    hubs.set(id, h);
    await ndiSubscribe(h.key, {
      frame: (f) => {
        let tex = h.tex;
        if (!tex || tex.image.width !== f.w || tex.image.height !== f.h) {
          tex?.dispose();
          tex = new THREE.DataTexture(f.data, f.w, f.h, THREE.RGBAFormat);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          h.tex = tex;
        } else tex.image.data = f.data;
        tex.needsUpdate = true;
        h.spill = f.spill;
        h.w = f.w;
        h.h = f.h;
        h.lastFrame = performance.now();
        h.users.forEach((u) => u());
      },
      status: (st) => {
        h.state = st;
        h.users.forEach((u) => u());
      },
    });
    await window.vd.ndiOpen(h.key, { name: src.name, url: src.url }, src.low);
  }
  const hb = hub;
  hb.users.add(changed);
  return {
    feed: hb,
    detach: () => {
      hb.users.delete(changed);
      if (hb.users.size) return;
      hubs.delete(id);
      void window.vd.ndiClose(hb.key);
      ndiUnsubscribe(hb.key);
      hb.tex?.dispose();
      hb.tex = null;
    },
  };
}

/** Number of open receivers (tests). */
export const ndiReceivers = () => hubs.size;
