// NDI® frames in the renderer: one MessagePort from the receiver process, frames
// dispatched to the video walls by key. NDI® is a registered trademark of Vizrt NDI AB.

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
