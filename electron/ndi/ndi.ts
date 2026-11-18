// NDI® in the main process: starts the receiver process on first use and wires the
// renderer to it. Nothing NDI-related runs (and nothing goes on the network) until the
// user opens the video-wall panel.
//
// NDI® is a registered trademark of Vizrt NDI AB.

import { ipcMain, MessageChannelMain, shell, utilityProcess, type UtilityProcess, type WebContents } from 'electron';
import path from 'node:path';
import { NDI_HOME_URL, NDI_RUNTIME_URL } from './ndi-lib.ts';

let child: UtilityProcess | null = null;
let nextId = 1;
const pending = new Map<number, (v: unknown) => void>();

function worker(): UtilityProcess {
  if (child) return child;
  const c = utilityProcess.fork(path.join(__dirname, 'ndi-worker.cjs'), [], { serviceName: 'VD-Link NDI', stdio: 'inherit' });
  c.on('message', (m: { t: string; id: number; data: unknown }) => {
    if (m.t !== 'reply') return;
    pending.get(m.id)?.(m.data);
    pending.delete(m.id);
  });
  c.on('exit', (code) => {
    if (code) console.warn('[vd] NDI process ended', code);
    child = null;
    for (const r of pending.values()) r(null);
    pending.clear();
  });
  child = c;
  return c;
}

function ask<T>(t: string, timeoutMs = 5000): Promise<T | null> {
  const id = nextId++;
  return new Promise((res) => {
    pending.set(id, res as (v: unknown) => void);
    worker().postMessage({ t, id });
    setTimeout(() => {
      if (pending.delete(id)) res(null);
    }, timeoutMs);
  });
}

export function registerNdi() {
  ipcMain.handle('ndi:status', async () => {
    const s = await ask<{ ok: boolean; version?: string; error?: string }>('status');
    return { ...(s ?? { ok: false, error: 'process' }), runtimeUrl: NDI_RUNTIME_URL, homeUrl: NDI_HOME_URL };
  });
  ipcMain.handle('ndi:sources', async () => (await ask<{ name: string; url: string }[]>('sources')) ?? []);
  ipcMain.handle('ndi:connect', (e) => connect(e.sender));
  ipcMain.handle('ndi:open', (_e, key: string, name: string, url: string, low: boolean) => worker().postMessage({ t: 'open', key, name, url, low }));
  ipcMain.handle('ndi:close', (_e, key: string) => child?.postMessage({ t: 'close', key }));
  ipcMain.handle('ndi:link', (_e, which: 'home' | 'runtime') => shell.openExternal(which === 'runtime' ? NDI_RUNTIME_URL : NDI_HOME_URL));
}

/** Direct frame channel worker → renderer (one per window load). */
function connect(wc: WebContents) {
  const { port1, port2 } = new MessageChannelMain();
  worker().postMessage({ t: 'port' }, [port1]);
  wc.postMessage('ndi:port', null, [port2]);
}

export function stopNdi() {
  child?.kill();
  child = null;
}
