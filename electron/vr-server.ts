// VR-Brille: VD-Link liefert den VR-Viewer (vr.html) und die Live-Daten an VR-Brillen im Netz.
// - http://localhost:7700/<Code>/  nur dieser Rechner bzw. per USB (adb reverse) – „sicher“ für WebXR ohne Zertifikat
// - https://<IP>:7701/<Code>/       im WLAN, mit eigenem Zertifikat (in der Brille einmal bestätigen)
// Die Brille ist nur Zuschauer: Sie holt die Szene (/api/scene) und bekommt DMX und Ansicht als Server-Sent Events.
// Ohne den 4-stelligen Code gibt es nur eine Seite zum Eingeben des Codes.

import { randomInt } from 'node:crypto';
import dgram from 'node:dgram';
import { gzipSync } from 'node:zlib';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import { hostname, networkInterfaces } from 'node:os';
import path from 'node:path';
import selfsigned from 'selfsigned';
import { app, ipcMain, shell, type BrowserWindow } from 'electron';

export const VR_HTTP_PORT = 7700;
export const VR_HTTPS_PORT = 7701;
/** UDP: VDM headsets ask „VDM?“ as broadcast, VD-Link answers with its name and HTTPS port. */
export const VR_DISCOVERY_PORT = 7702;

export interface VrInfo {
  running: boolean;
  code: string;
  /** Adresse für diesen Rechner und USB (adb reverse). */
  local: string;
  /** Adressen im WLAN/LAN (HTTPS). */
  lan: string[];
  clients: number;
  error?: string;
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
};

/** Where a headset is and where it looks (VD-Link coordinates, metres; quaternion x, y, z, w). */
export interface VrPose {
  id: string;
  name: string;
  pos: [number, number, number];
  quat: [number, number, number, number];
}

/** Checks a pose sent by a headset; null if it is not one. */
export function parsePose(body: string, from: string): VrPose | null {
  let j: unknown;
  try {
    j = JSON.parse(body);
  } catch {
    return null;
  }
  if (!j || typeof j !== 'object') return null;
  const o = j as Record<string, unknown>;
  const nums = (v: unknown, n: number) => Array.isArray(v) && v.length === n && v.every((x) => typeof x === 'number' && Number.isFinite(x) && Math.abs(x) < 1e5);
  if (!nums(o.pos, 3) || !nums(o.quat, 4)) return null;
  const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[^\p{L}\p{N} ._:-]/gu, '').slice(0, max) : '');
  return {
    id: `${from}#${clean(o.id, 40)}`,
    name: clean(o.name, 40) || 'VR-Brille',
    pos: o.pos as VrPose['pos'],
    quat: o.quat as VrPose['quat'],
  };
}

export class VrServer {
  private http: http.Server | null = null;
  private https: https.Server | null = null;
  private clients = new Set<http.ServerResponse>();
  /** Native VR apps (api/events?frame=1): they get ready-made beams instead of computing from DMX. */
  private native = new Set<http.ServerResponse>();
  onNative: (n: number) => void = () => {};
  /** Pose of a headset (POST api/pose from VDM or the browser viewer). */
  onPose: (p: VrPose) => void = () => {};
  private scene: string | null = null;
  private lastView = '';
  private lastWalls = '';
  /** Latest JPEG per video screen (index as in the scene). */
  private wallJpeg = new Map<number, Buffer>();
  private gobos: { png: Buffer; cols: number; rows: number } | null = null;
  /** The room as VD-Link draws it (src/render/vr-export.ts), gzip, for VDM: GET api/venue.bin. */
  private venue: { id: number; raw: Buffer; gz: Buffer } | null = null;
  private discovery: dgram.Socket | null = null;
  private keepAlive: NodeJS.Timeout | null = null;
  /** Wrong codes per address (simple brake against trying all 10 000 codes). */
  private wrong = new Map<string, { n: number; since: number }>();
  code = '';
  error = '';

  constructor(
    private distDir: string,
    private dataDir: string,
    private onClients: (n: number) => void,
  ) {
    this.code = this.loadCode();
  }

  private loadCode(): string {
    try {
      const j = JSON.parse(readFileSync(path.join(this.dataDir, 'vr.json'), 'utf8')) as { code?: string };
      if (j.code && /^\d{4}$/.test(j.code)) return j.code;
    } catch {
      /* first start */
    }
    const c = String(randomInt(1000, 10000));
    this.saveCode(c);
    return c;
  }

  private saveCode(c: string) {
    try {
      writeFileSync(path.join(this.dataDir, 'vr.json'), JSON.stringify({ code: c }));
    } catch {
      /* read-only profile */
    }
  }

  /** New code: every connected headset has to enter it again. */
  newCode() {
    this.code = String(randomInt(1000, 10000));
    this.saveCode(this.code);
    for (const c of this.clients) c.end();
    this.clients.clear();
    this.onClients(0);
  }

  get running() {
    return !!this.http || !!this.https;
  }

  info(): VrInfo {
    const lan: string[] = [];
    for (const list of Object.values(networkInterfaces()))
      for (const a of list ?? []) if (a.family === 'IPv4' && !a.internal) lan.push(`https://${a.address}:${VR_HTTPS_PORT}/${this.code}/`);
    return { running: this.running, code: this.code, local: `http://localhost:${VR_HTTP_PORT}/${this.code}/`, lan, clients: this.clients.size, ...(this.error ? { error: this.error } : {}) };
  }

  private async cert(): Promise<{ key: string; cert: string }> {
    const file = path.join(this.dataDir, 'vr-cert.json');
    if (existsSync(file)) {
      try {
        const j = JSON.parse(readFileSync(file, 'utf8')) as { key: string; cert: string; until: number };
        if (j.until > Date.now() + 7 * 864e5) return j;
      } catch {
        /* make a new one */
      }
    }
    const until = new Date();
    until.setFullYear(until.getFullYear() + 2);
    const pems = await selfsigned.generate([{ name: 'commonName', value: 'VD-Link VR' }], {
      keyType: 'ec',
      algorithm: 'sha256',
      notAfterDate: until,
    });
    const j = { key: pems.private, cert: pems.cert, until: until.getTime() };
    try {
      writeFileSync(file, JSON.stringify(j));
    } catch {
      /* keep in memory */
    }
    return j;
  }

  async start(): Promise<VrInfo> {
    if (this.running) return this.info();
    this.error = '';
    const handler = (req: http.IncomingMessage, res: http.ServerResponse) => this.handle(req, res);
    try {
      this.http = http.createServer(handler);
      await listen(this.http, VR_HTTP_PORT, '127.0.0.1');
    } catch (e) {
      this.http = null;
      this.error = `Port ${VR_HTTP_PORT}: ${(e as Error).message}`;
    }
    try {
      const { key, cert } = await this.cert();
      this.https = https.createServer({ key, cert }, handler);
      await listen(this.https, VR_HTTPS_PORT, '0.0.0.0');
    } catch (e) {
      this.https = null;
      this.error = (this.error ? this.error + ' · ' : '') + `Port ${VR_HTTPS_PORT}: ${(e as Error).message}`;
    }
    this.startDiscovery();
    // Comment lines keep proxies and the headset browser from closing an idle stream.
    this.keepAlive = setInterval(() => this.broadcast(': ping\n\n'), 15000);
    return this.info();
  }

  /** Answer VDM's search in the local network (the code is not part of the answer). */
  private startDiscovery() {
    if (this.discovery) return;
    const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
    sock.on('error', () => {
      sock.close();
      this.discovery = null;
    });
    sock.on('message', (msg, from) => {
      if (msg.toString('utf8').trim() !== 'VDM?' || !this.https) return;
      const answer = JSON.stringify({ app: 'VD-Link', name: hostname().replace(/\.local$/, '').slice(0, 40), port: VR_HTTPS_PORT });
      sock.send(answer, from.port, from.address);
    });
    sock.bind(VR_DISCOVERY_PORT, '0.0.0.0');
    this.discovery = sock;
  }

  /** Room geometry for VDM. Connected headsets fetch it again (event `venue`). */
  setVenue(bytes: Buffer) {
    this.venue = { id: (this.venue?.id ?? 0) + 1, raw: bytes, gz: gzipSync(bytes, { level: 6 }) };
    for (const c of this.native) c.write(`event: venue\ndata: {"id":${this.venue.id}}\n\n`);
  }

  /** Put a headset (id, or all with null) at a place in the room, looking along yaw (degrees). */
  sendGoto(id: string | null, pos: [number, number, number], yaw: number): number {
    const msg = `event: goto\ndata: ${JSON.stringify({ id, pos, yaw })}\n\n`;
    for (const c of this.native) c.write(msg);
    return this.native.size;
  }

  /** Gobo atlas of the desktop (PNG) for native apps: GET api/gobos.png, tile layout in the headers. */
  setGobos(png: Buffer, cols: number, rows: number) {
    this.gobos = { png, cols, rows };
  }

  stop() {
    this.discovery?.close();
    this.discovery = null;
    for (const c of this.clients) c.end();
    this.clients.clear();
    this.native.clear();
    this.onNative(0);
    this.http?.close();
    this.https?.close();
    this.http = this.https = null;
    if (this.keepAlive) clearInterval(this.keepAlive);
    this.keepAlive = null;
    this.onClients(0);
  }

  /** Scene changed (project opened, location edited): headsets reload it. */
  setScene(json: string) {
    this.scene = json;
    this.wallJpeg.clear();
    this.lastWalls = '';
    this.broadcast('event: scene\ndata: {}\n\n');
  }

  /** Raw DMX of all used universes (decoded in the headset with the same codec). */
  /** Beams + surface spots of one frame (Float32 little endian, see Viz.vrFrame) – native apps only. */
  pushFrame(data: Uint8Array) {
    if (!this.native.size) return;
    const msg = `event: frame\ndata: ${Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString('base64')}\n\n`;
    for (const c of this.native) c.write(msg);
  }

  /** VDM headsets record the running show and keep it (event `record`). Returns how many. */
  requestRecord(seconds: number): number {
    const s = Math.max(5, Math.min(300, Math.round(seconds)));
    for (const c of this.native) c.write(`event: record\ndata: {"seconds":${s}}\n\n`);
    return this.native.size;
  }

  pushDmx(data: Uint8Array) {
    if (!this.clients.size) return;
    this.broadcast(`event: dmx\ndata: ${Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString('base64')}\n\n`);
  }

  /** Latest picture of a video screen. */
  pushWall(i: number, jpeg: Uint8Array) {
    if (!this.clients.size) return;
    this.wallJpeg.set(i, Buffer.from(jpeg.buffer, jpeg.byteOffset, jpeg.byteLength));
  }

  /** State of the screens (test image / live / black, fit, brightness) – only sent when it changed. */
  pushWalls(json: string) {
    if (json === this.lastWalls) return;
    this.lastWalls = json;
    this.broadcast(`event: walls\ndata: ${json}\n\n`);
  }

  /** View settings from the desktop (haze, day). */
  pushView(view: unknown) {
    this.lastView = JSON.stringify(view);
    this.broadcast(`event: view\ndata: ${this.lastView}\n\n`);
  }

  private broadcast(msg: string) {
    for (const c of this.clients) c.write(msg);
  }

  private handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const url = new URL(req.url ?? '/', 'http://x');
    const parts = url.pathname.split('/').filter(Boolean);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    // Without the right code: page to enter it. More than 10 wrong codes a minute → wait.
    const ip = req.socket.remoteAddress ?? '';
    const w = this.wrong.get(ip);
    if (w && Date.now() - w.since > 60000) this.wrong.delete(ip);
    if (parts[0] !== this.code) {
      if (parts.length > 0 && /^\d{4}$/.test(parts[0])) {
        const e = this.wrong.get(ip) ?? { n: 0, since: Date.now() };
        e.n++;
        this.wrong.set(ip, e);
        if (e.n > 10) {
          res.writeHead(429, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('Zu viele falsche Codes – bitte eine Minute warten.');
        }
      }
      return this.codePage(res, parts.length > 0);
    }
    if (parts.length === 1 && !url.pathname.endsWith('/')) {
      res.writeHead(302, { Location: `/${this.code}/` });
      return res.end();
    }
    const rest = parts.slice(1).join('/');
    if (rest === 'api/scene') {
      if (!this.scene) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        return res.end('{"error":"no-project"}');
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(this.scene);
    }
    if (rest === 'api/log' && req.method === 'POST') {
      let body = '';
      req.on('data', (d: Buffer) => {
        if (body.length < 64000) body += d.toString('utf8');
      });
      req.on('end', () => {
        try {
          appendFileSync(path.join(this.dataDir, 'vr-log.txt'), body.split('\n').map((l) => `${req.socket.remoteAddress} ${l}`).join('\n') + '\n');
        } catch {
          /* read-only profile */
        }
        res.writeHead(204);
        res.end();
      });
      return;
    }
    if (rest === 'api/pose' && req.method === 'POST') {
      let body = '';
      req.on('data', (d: Buffer) => {
        if (body.length < 2000) body += d.toString('utf8');
      });
      req.on('end', () => {
        const p = parsePose(body, req.socket.remoteAddress ?? '');
        if (p) this.onPose(p);
        res.writeHead(p ? 204 : 400);
        res.end();
      });
      return;
    }
    if (rest === 'api/events') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', Connection: 'keep-alive' });
      res.write('retry: 2000\n\n');
      if (this.lastView) res.write(`event: view\ndata: ${this.lastView}\n\n`);
      if (this.lastWalls) res.write(`event: walls\ndata: ${this.lastWalls}\n\n`);
      this.clients.add(res);
      this.onClients(this.clients.size);
      const wantsFrames = url.searchParams.get('frame') === '1';
      if (wantsFrames) {
        this.native.add(res);
        this.onNative(this.native.size);
      }
      req.on('close', () => {
        this.clients.delete(res);
        this.onClients(this.clients.size);
        if (this.native.delete(res)) this.onNative(this.native.size);
      });
      return;
    }
    if (rest === 'api/gobos.png') {
      if (!this.gobos) {
        res.writeHead(204);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': this.gobos.png.length, 'X-Gobo-Cols': String(this.gobos.cols), 'X-Gobo-Rows': String(this.gobos.rows) });
      return res.end(this.gobos.png);
    }
    if (rest === 'api/venue.bin') {
      if (!this.venue) {
        res.writeHead(204);
        return res.end();
      }
      const gz = /\bgzip\b/.test(String(req.headers['accept-encoding'] ?? ''));
      const body = gz ? this.venue.gz : this.venue.raw;
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': body.length, 'X-Venue-Id': String(this.venue.id), ...(gz ? { 'Content-Encoding': 'gzip' } : {}) });
      return res.end(body);
    }
    const wm = /^api\/wall\/(\d+)\.jpg$/.exec(rest);
    if (wm) {
      const img = this.wallJpeg.get(Number(wm[1]));
      if (!img) {
        res.writeHead(204);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Content-Length': img.length });
      return res.end(img);
    }
    // Static files of the build (vr.html, assets, fixture library).
    const file = path.normalize(path.join(this.distDir, rest || 'vr.html'));
    if (!file.startsWith(this.distDir + path.sep) || !existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('nicht gefunden');
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  }

  /** Big keypad – easy to use with a VR controller. */
  private codePage(res: http.ServerResponse, wrong: boolean) {
    res.writeHead(wrong ? 404 : 200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>VD-Link VR</title><style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b10;color:#eee;font:20px system-ui,sans-serif}
main{text-align:center;padding:24px}h1{font-size:30px;margin:0 0 6px}p{color:#9a9aa8;margin:0 0 22px}
#c{font:600 54px ui-monospace,monospace;letter-spacing:.35em;min-height:66px;margin-bottom:18px}
.k{display:grid;grid-template-columns:repeat(3,110px);gap:14px;justify-content:center}
button{height:96px;border:0;border-radius:18px;background:#1d1d27;color:#fff;font-size:36px;cursor:pointer}
button:hover,button:focus{background:#2c2c3c;outline:none}button.go{background:#ff4f8b}
.err{color:#ff7a8f}</style></head><body><main>
<h1>VD-Link VR</h1><p class="${wrong ? 'err' : ''}">${wrong ? 'Code stimmt nicht. ' : ''}Code eingeben – steht in VD-Link unter VERBINDEN → VR-Brille.</p>
<div id="c"></div><div class="k">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button>${n}</button>`).join('')}<button>⌫</button><button>0</button><button class="go">→</button></div>
</main><script>
let v='';const c=document.getElementById('c');const show=()=>c.textContent=v.padEnd(4,'·');show();
document.querySelectorAll('button').forEach(b=>b.onclick=()=>{const t=b.textContent;
if(t==='⌫')v=v.slice(0,-1);else if(t==='→'){if(v.length===4)location.href='/'+v+'/';}else if(v.length<4)v+=t;
show();if(v.length===4&&t!=='⌫')setTimeout(()=>location.href='/'+v+'/',250);});
addEventListener('keydown',e=>{if(/^\\d$/.test(e.key)&&v.length<4){v+=e.key;show();if(v.length===4)location.href='/'+v+'/';}if(e.key==='Backspace'){v=v.slice(0,-1);show();}});
</script></body></html>`);
  }
}

function listen(s: http.Server | https.Server, port: number, host: string) {
  return new Promise<void>((resolve, reject) => {
    s.once('error', reject);
    s.listen(port, host, () => {
      s.off('error', reject);
      resolve();
    });
  });
}

/** IPC for the renderer (desktop window): switch on/off, address and code, live data. */
export function registerVr(getWin: () => BrowserWindow | null) {
  const server = new VrServer(path.join(app.getAppPath(), 'dist'), app.getPath('userData'), (n) => getWin()?.webContents.send('vr:clients', n));
  ipcMain.handle('vr:info', () => server.info());
  ipcMain.handle('vr:enable', async (_e, on: unknown) => {
    if (on) return server.start();
    server.stop();
    return server.info();
  });
  ipcMain.handle('vr:newCode', () => {
    server.newCode();
    return server.info();
  });
  ipcMain.handle('vr:openPcvr', () => shell.openExternal(server.info().local));
  ipcMain.handle('vr:record', (_e, seconds: unknown) => server.requestRecord(typeof seconds === 'number' && isFinite(seconds) ? seconds : 60));
  ipcMain.on('vr:scene', (_e, json: unknown) => {
    if (typeof json === 'string') server.setScene(json);
  });
  server.onNative = (n) => getWin()?.webContents.send('vr:native', n);
  server.onPose = (p) => getWin()?.webContents.send('vr:pose', p);
  ipcMain.on('vr:frame', (_e, data: unknown) => {
    if (data instanceof Uint8Array) server.pushFrame(data);
  });
  ipcMain.on('vr:venue', (_e, bytes: unknown) => {
    if (bytes instanceof Uint8Array) server.setVenue(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
  });
  ipcMain.handle('vr:goto', (_e, id: unknown, pos: unknown, yaw: unknown) => {
    if (!Array.isArray(pos) || pos.length !== 3 || !pos.every((x) => typeof x === 'number' && isFinite(x)) || typeof yaw !== 'number' || !isFinite(yaw)) return 0;
    return server.sendGoto(typeof id === 'string' ? id.slice(0, 64) : null, pos as [number, number, number], yaw);
  });
  ipcMain.on('vr:gobos', (_e, png: unknown, cols: unknown, rows: unknown) => {
    if (png instanceof Uint8Array && typeof cols === 'number' && typeof rows === 'number') server.setGobos(Buffer.from(png), cols, rows);
  });
  ipcMain.on('vr:dmx', (_e, data: unknown) => {
    if (data instanceof Uint8Array) server.pushDmx(data);
  });
  ipcMain.on('vr:view', (_e, v: unknown) => server.pushView(v));
  ipcMain.on('vr:wall', (_e, i: unknown, jpeg: unknown) => {
    if (typeof i === 'number' && jpeg instanceof Uint8Array) server.pushWall(i, jpeg);
  });
  ipcMain.on('vr:walls', (_e, json: unknown) => {
    if (typeof json === 'string') server.pushWalls(json);
  });
  app.on('will-quit', () => server.stop());
}
