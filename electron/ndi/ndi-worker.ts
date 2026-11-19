// NDI® receiver process (Electron utilityProcess) – keeps NDI's network threads and the
// frame copies away from the main process. Frames go straight to the renderer through
// a MessagePort; the renderer acknowledges each frame, so a slow GPU never builds a queue.
//
// NDI® is a registered trademark of Vizrt NDI AB.

import { loadNdi, FRAME, type VideoFrame } from './ndi-lib.ts';

type Port = Electron.MessagePortMain;
interface Recv {
  key: string;
  name: string;
  inst: unknown;
  closed: boolean;
  waiting: boolean;
  sentAt: number;
  frames: number;
  w: number;
  h: number;
}

const parent = process.parentPort;
const debug = !!process.env.VD_NDI_DEBUG;
const dbg = (...a: unknown[]) => debug && console.log('[vd-ndi]', ...a);
const loaded = loadNdi();
let initialized = false;
let finder: unknown = null;
let port: Port | null = null;
const recvs = new Map<string, Recv>();

function init(): boolean {
  if (!loaded.ok) return false;
  if (!initialized) {
    initialized = loaded.lib.initialize();
    dbg('initialize', initialized, loaded.lib.path, loaded.lib.version);
  }
  return initialized;
}

function reply(id: number, data: unknown) {
  parent.postMessage({ t: 'reply', id, data });
}

parent.on('message', async (e) => {
  const m = e.data as { t: string; id?: number; key?: string; name?: string; url?: string; low?: boolean };
  switch (m.t) {
    case 'status':
      reply(m.id!, loaded.ok ? { ok: true, version: loaded.lib.version, path: loaded.lib.path } : { ok: false, error: loaded.error });
      break;
    case 'sources': {
      if (!init()) return reply(m.id!, []);
      const lib = loaded.ok ? loaded.lib : null;
      if (!lib) return reply(m.id!, []);
      if (!finder) {
        finder = lib.findCreate();
        // First look: give mDNS a moment to answer.
        await lib.findWait(finder, 1500).catch(() => false);
      }
      const found = finder ? lib.findSources(finder) : [];
      dbg('sources', found.length, JSON.stringify(found));
      reply(m.id!, found);
      break;
    }
    case 'port':
      // A (re)loaded renderer: start over.
      for (const r of recvs.values()) close(r);
      port?.close();
      port = e.ports[0] ?? null;
      port?.on('message', (ev) => {
        const a = ev.data as { t: string; key: string };
        const r = recvs.get(a.key);
        if (a.t === 'ack' && r) r.waiting = false;
      });
      port?.start();
      break;
    case 'open':
      open(m.key!, m.name!, m.url ?? '', !!m.low);
      break;
    case 'close': {
      const r = recvs.get(m.key!);
      if (r) close(r);
      break;
    }
  }
});

function send(msg: unknown) {
  port?.postMessage(msg);
}

function open(key: string, name: string, url: string, low: boolean) {
  const old = recvs.get(key);
  if (old) close(old);
  if (!init() || !loaded.ok) {
    send({ t: 'status', key, state: 'error', error: loaded.ok ? 'init' : loaded.error });
    return;
  }
  const inst = loaded.lib.recvCreate(name, url, low, `VD-Link ${key}`);
  if (!inst) {
    send({ t: 'status', key, state: 'error', error: 'recv' });
    return;
  }
  const r: Recv = { key, name, inst, closed: false, waiting: false, sentAt: 0, frames: 0, w: 0, h: 0 };
  recvs.set(key, r);
  send({ t: 'status', key, state: 'connecting' });
  void loop(r);
}

function close(r: Recv) {
  r.closed = true;
  recvs.delete(r.key);
  // The capture loop destroys the receiver once its pending call has returned.
}

async function loop(r: Recv) {
  if (!loaded.ok) return;
  const lib = loaded.lib;
  let lastReport = Date.now();
  let count = 0;
  while (!r.closed) {
    const frame: Partial<VideoFrame> = {};
    let type: number;
    try {
      type = await lib.capture(r.inst, frame, 250);
    } catch (err) {
      send({ t: 'status', key: r.key, state: 'error', error: String(err) });
      break;
    }
    if (debug && type !== FRAME.none) dbg('capture', r.key, type);
    if (type === FRAME.video) {
      const f = frame as VideoFrame;
      count++;
      // Drop the frame if the renderer is still busy with the previous one (or lost it).
      if (!r.closed && (!r.waiting || Date.now() - r.sentAt > 1000)) {
        const out = repack(lib.pixels(f), f.xres, f.yres, f.line_stride_in_bytes);
        r.waiting = true;
        r.sentAt = Date.now();
        r.frames++;
        if (f.xres !== r.w || f.yres !== r.h) {
          r.w = f.xres;
          r.h = f.yres;
        }
        send({ t: 'frame', key: r.key, w: f.xres, h: f.yres, data: out.data, spill: out.spill });
      }
      lib.freeVideo(r.inst, f);
    } else if (type === FRAME.error) {
      send({ t: 'status', key: r.key, state: 'lost' });
    }
    const now = Date.now();
    if (now - lastReport >= 1000) {
      send({ t: 'status', key: r.key, state: count ? 'live' : 'waiting', fps: Math.round((count * 1000) / (now - lastReport)), w: r.w, h: r.h });
      count = 0;
      lastReport = now;
    }
  }
  lib.recvDestroy(r.inst);
}

/**
 * Tight RGBA rows, bottom row first (= texture origin bottom-left, no flip needed on the
 * GPU), plus a 16×16 average-colour grid for the room spill light.
 */
function repack(src: Uint8Array, w: number, h: number, stride: number) {
  const row = w * 4;
  const data = new Uint8Array(row * h);
  for (let y = 0; y < h; y++) data.set(src.subarray(y * stride, y * stride + row), (h - 1 - y) * row);
  const spill = new Uint8Array(16 * 16 * 4);
  for (let gy = 0; gy < 16; gy++)
    for (let gx = 0; gx < 16; gx++) {
      // Few samples per cell are enough for a light colour.
      let r = 0,
        g = 0,
        b = 0,
        n = 0;
      for (let sy = 0; sy < 4; sy++)
        for (let sx = 0; sx < 4; sx++) {
          const x = Math.min(w - 1, Math.floor(((gx + (sx + 0.5) / 4) / 16) * w));
          const y = Math.min(h - 1, Math.floor(((gy + (sy + 0.5) / 4) / 16) * h));
          const i = y * stride + x * 4;
          r += src[i];
          g += src[i + 1];
          b += src[i + 2];
          n++;
        }
      const o = (gy * 16 + gx) * 4;
      spill[o] = r / n;
      spill[o + 1] = g / n;
      spill[o + 2] = b / n;
      spill[o + 3] = 255;
    }
  return { data, spill };
}
