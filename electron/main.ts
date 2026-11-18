// VD-Link – Electron main process.
// Owns everything the renderer may not do: UDP sockets (Art-Net/sACN),
// virtual monitors (native helper), screen capture selection, extra windows.

import { app, BrowserWindow, desktopCapturer, dialog, ipcMain, screen, session, shell, systemPreferences } from 'electron';
import os from 'node:os';
import { spawn, type ChildProcess } from 'node:child_process';
import { writeFileSync, existsSync, readFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { ArtNetReceiver } from './dmx/artnet.ts';
import { SacnReceiver } from './dmx/sacn.ts';
import { DmxMerger } from './dmx/merger.ts';
import { buildMenu } from './menu.ts';
import { detectLauncher, type LauncherInfo } from './suite/launcher-detect.ts';
import { registerNdi, stopNdi } from './ndi/ndi.ts';
import { clearRecent, kindOf, listRecent, listUserFixtures, openDialog, openFileDialog, readFile, readProject, removeUserFixture, saveFile, saveProject, storeUserFixture, type FileKind } from './projects.ts';

const UNIVERSES = 32;
const DEV_URL = process.env.VITE_DEV_SERVER_URL;

// Our name everywhere (menu bar, dock, About, user data folder) – never "Electron".
app.setName('VD-Link');

// Automated test runs get their own profile so they never collide with a running VD-Link.
if (process.env.VD_USER_DATA) app.setPath('userData', process.env.VD_USER_DATA);

// One VD-Link per profile: a second start just brings the open window to the front.
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

// Gaming laptops with hybrid graphics: always use the dedicated GPU.
app.commandLine.appendSwitch('force_high_performance_gpu');
// Benchmarking only: VD_UNCAPPED=1 removes the vsync / frame-rate cap.
if (process.env.VD_UNCAPPED) {
  app.commandLine.appendSwitch('disable-frame-rate-limit');
  app.commandLine.appendSwitch('disable-gpu-vsync');
}

let win: BrowserWindow | null = null;
const patternWins = new Map<string, BrowserWindow>();

// ------------------------------------------------------------------ DMX input

const merger = new DmxMerger(UNIVERSES);
const errors: string[] = [];
const onError = (e: Error) => {
  const msg = `${e.name}: ${e.message}`;
  if (!errors.includes(msg)) errors.push(msg);
  console.error('[dmx]', msg);
};
// Consoles that sent ArtPoll recently (address → last seen).
const pollers = new Map<string, number>();
const netCfg = { artnet: true, sacn: true, universes: 8 };

const artnet = new ArtNetReceiver({
  announceUniverses: 8,
  onPoll: (address) => pollers.set(address, Date.now()),
  shortName: 'VD-Link',
  longName: 'VD-Link Virtual-Demo Link 3D Visualizer',
  onFrame: (f) => merger.push(f),
  onError,
});
const sacn = new SacnReceiver({
  universes: Array.from({ length: 8 }, (_, i) => i + 1),
  onFrame: (f) => merger.push(f),
  onError,
});

function applyNetCfg() {
  artnet.stop();
  sacn.stop();
  artnet.setAnnounceUniverses(netCfg.universes);
  if (netCfg.artnet) artnet.start();
  sacn.setUniverses(Array.from({ length: netCfg.universes }, (_, i) => i + 1));
  if (netCfg.sacn) sacn.start();
}

function startDmx() {
  applyNetCfg();
  setInterval(() => {
    merger.expire();
    if (merger.dirty && win && !win.isDestroyed()) {
      merger.dirty = false;
      win.webContents.send('dmx:frame', merger.output.slice());
    }
  }, 1000 / 60);
  setInterval(() => {
    const now = Date.now();
    for (const [ip, t] of pollers) if (now - t > 10000) pollers.delete(ip);
    win?.webContents.send('dmx:status', {
      sources: merger.info(),
      errors,
      active: merger.hasActiveSources,
      pollers: [...pollers.keys()],
      net: netCfg,
    });
  }, 500);
}

ipcMain.handle('dmx:config', (_e, cfg: { artnetOffset?: number; sacnOffset?: number; artnet?: boolean; sacn?: boolean; universes?: number }) => {
  if (typeof cfg.artnetOffset === 'number') merger.artnetOffset = cfg.artnetOffset;
  if (typeof cfg.sacnOffset === 'number') merger.sacnOffset = cfg.sacnOffset;
  let restart = false;
  if (typeof cfg.artnet === 'boolean' && cfg.artnet !== netCfg.artnet) (netCfg.artnet = cfg.artnet), (restart = true);
  if (typeof cfg.sacn === 'boolean' && cfg.sacn !== netCfg.sacn) (netCfg.sacn = cfg.sacn), (restart = true);
  if (typeof cfg.universes === 'number' && cfg.universes !== netCfg.universes) {
    netCfg.universes = Math.max(1, Math.min(UNIVERSES, Math.round(cfg.universes)));
    restart = true;
  }
  if (restart && app.isReady()) applyNetCfg();
  return { artnetOffset: merger.artnetOffset, sacnOffset: merger.sacnOffset };
});

// ------------------------------------------------------------ virtual monitors

interface VirtualDisplay {
  proc: ChildProcess;
  displayID: number;
  name: string;
  width: number;
  height: number;
}
const virtualDisplays = new Map<number, VirtualDisplay>();
let serial = 1;

function helperPath() {
  const candidates = [
    path.join(app.getAppPath(), 'native/macos/build/vd-display-helper'),
    path.join(process.resourcesPath ?? '', 'vd-display-helper'),
  ];
  return candidates.find((p) => existsSync(p));
}

ipcMain.handle('vdisplay:create', async (_e, o: { name: string; width: number; height: number }) => {
  if (process.platform !== 'darwin') {
    return { ok: false, error: 'Virtuelle Monitore unter Windows kommen über den Indirect-Display-Treiber (noch nicht im Spike).' };
  }
  const bin = helperPath();
  if (!bin) return { ok: false, error: 'Helper fehlt – bitte "npm run build:native" ausführen.' };
  const proc = spawn(bin, ['--name', o.name, '--width', String(o.width), '--height', String(o.height), '--serial', String(serial++)], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  const rl = readline.createInterface({ input: proc.stdout! });
  const first = await new Promise<Record<string, unknown>>((resolve) => {
    const t = setTimeout(() => resolve({ event: 'error', message: 'timeout' }), 5000);
    rl.once('line', (l) => {
      clearTimeout(t);
      try {
        resolve(JSON.parse(l));
      } catch {
        resolve({ event: 'error', message: l });
      }
    });
    proc.once('exit', () => resolve({ event: 'error', message: 'helper exited' }));
  });
  if (first.event !== 'ready') {
    proc.kill();
    return { ok: false, error: String(first.message) };
  }
  const displayID = Number(first.displayID);
  virtualDisplays.set(displayID, { proc, displayID, name: o.name, width: o.width, height: o.height });
  proc.once('exit', () => virtualDisplays.delete(displayID));
  // Give macOS a moment to arrange the new screen before anyone captures it.
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, displayID };
});

ipcMain.handle('vdisplay:remove', (_e, displayID: number) => {
  const vd = virtualDisplays.get(displayID);
  vd?.proc.stdin?.end();
  vd?.proc.kill();
  virtualDisplays.delete(displayID);
  return true;
});

// --------------------------------------------------------------- screen capture

let pendingCaptureId: string | null = null;

ipcMain.handle('capture:list', async () => {
  const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 0, height: 0 } });
  const displays = screen.getAllDisplays();
  return sources.map((s) => {
    const d = displays.find((x) => String(x.id) === s.display_id);
    const vd = virtualDisplays.get(Number(s.display_id));
    return {
      id: s.id,
      displayId: s.display_id,
      name: vd ? vd.name : d?.label || s.name,
      width: d ? d.size.width : 0,
      height: d ? d.size.height : 0,
      virtual: !!vd,
    };
  });
});

ipcMain.handle('capture:select', (_e, sourceId: string) => {
  pendingCaptureId = sourceId;
  return true;
});

ipcMain.handle('capture:permission', () =>
  process.platform === 'darwin' ? systemPreferences.getMediaAccessStatus('screen') : 'granted',
);

// --------------------------------------------- test pattern on a (virtual) screen

ipcMain.handle('pattern:open', (_e, displayId: string) => {
  const d = screen.getAllDisplays().find((x) => String(x.id) === displayId);
  if (!d) return false;
  patternWins.get(displayId)?.destroy();
  const patternWin = new BrowserWindow({
    x: d.bounds.x,
    y: d.bounds.y,
    width: d.bounds.width,
    height: d.bounds.height,
    frame: false,
    show: false,
    backgroundColor: '#000000',
    webPreferences: { backgroundThrottling: false },
  });
  patternWin.setBounds(d.bounds);
  if (process.platform === 'darwin') patternWin.setSimpleFullScreen(true);
  else patternWin.setFullScreen(true);
  patternWin.showInactive();
  if (DEV_URL) patternWin.loadURL(DEV_URL + 'testpattern.html');
  else patternWin.loadFile(path.join(app.getAppPath(), 'dist/testpattern.html'));
  patternWins.set(displayId, patternWin);
  patternWin.on('closed', () => patternWins.delete(displayId));
  return true;
});

ipcMain.handle('pattern:close', (_e, displayId?: string) => {
  for (const [id, w] of patternWins) if (!displayId || id === displayId) w.destroy();
  return true;
});

// ----------------------------------------------------------------- app info

// Link-Suite start animation (shared module from the Suite-Launcher, see src/ui/intro/).
// The main process decides: only the first load of the main window per app start, not after a
// crash (running.lock still there), not in automated runs; the suite-wide switch comes from
// Link-Suite/suite.json → "intro". The window only gets the result, it never reads files itself.
const runningLock = () => path.join(app.getPath('userData'), 'running.lock');
let crashedLastRun = false;
let introAsked = false;
const autoRun = !!(process.env.VD_QUERY || process.env.VD_SCREENSHOT || process.argv.includes('--no-anim') || process.argv.includes('--shot'));
function suiteIntro(): boolean | null {
  try {
    const v = JSON.parse(readFileSync(path.join(app.getPath('appData'), 'Link-Suite', 'suite.json'), 'utf8')).intro;
    return typeof v === 'boolean' ? v : null;
  } catch {
    return null;
  }
}
ipcMain.handle('intro:info', () => {
  const allowed = !introAsked && !crashedLastRun && !autoRun;
  introAsked = true;
  return { allowed, suite: suiteIntro() };
});
// Link-Suite launcher hint (shared module from the Suite-Launcher, src/ui/suite/): is the
// launcher installed? Checked locally (fixed paths, Spotlight/registry only as fallback), no
// network. The window only gets installed/version, never the path.
let launcher: LauncherInfo | null = null;
const launcherForUi = (l: LauncherInfo | null) => (l && l.via !== 'unsupported' ? { installed: l.installed, version: l.version } : null);
ipcMain.handle('suite:launcher', async () => launcherForUi(launcher ?? (launcher = await detectLauncher().catch(() => null))));
// Fixed address, never taken from the window.
ipcMain.handle('suite:launcher-page', () => shell.openExternal('https://skyplayser.github.io/Link-Suite/'));
ipcMain.handle('app:info', () => ({ version: app.getVersion(), platform: process.platform, arch: process.arch }));

ipcMain.handle('net:info', () => {
  // Screenshots for the docs (VD_DOCS=1): neutral example address instead of the real network.
  if (process.env.VD_DOCS) return [{ name: 'en0', address: '192.168.1.20' }];
  const out: { name: string; address: string }[] = [];
  for (const [name, list] of Object.entries(os.networkInterfaces()))
    for (const ni of list ?? []) if (ni.family === 'IPv4' && !ni.internal) out.push({ name, address: ni.address });
  return out;
});

/** Only well-known https pages are opened in the system browser. */
const ALLOWED_HOSTS = ['github.com', 'www.instagram.com', 'instagram.com', 'open-fixture-library.org', 'www.qlcplus.org'];
ipcMain.handle('open:url', (_e, url: string) => {
  try {
    const u = new URL(url);
    if (u.protocol === 'https:' && ALLOWED_HOSTS.includes(u.hostname)) return shell.openExternal(u.toString());
  } catch {
    /* ignore */
  }
  return false;
});

// ---------------------------------------------------------------- projects

let pendingOpen: string | null = null;
let projectState: { path: string | null; dirty: boolean; data: { name?: string } | null } = { path: null, dirty: false, data: null };

ipcMain.handle('project:open', () => openDialog(win).then((r) => (buildMenu(() => win), r)));
ipcMain.handle('project:openPath', (_e, file: string) => {
  const r = readProject(file);
  buildMenu(() => win);
  return r;
});
ipcMain.handle('project:save', async (_e, data: { name?: string }, file: string | null, saveAs: boolean) => {
  const p = await saveProject(win, data, file, saveAs);
  buildMenu(() => win);
  return p;
});
ipcMain.handle('project:recent', () => listRecent());
ipcMain.handle('file:open', (_e, kind: FileKind) => openFileDialog(win, kind).then((r) => (buildMenu(() => win), r)));
ipcMain.handle('file:openPath', (_e, file: string) => {
  const r = readFile(file);
  buildMenu(() => win);
  return r;
});
ipcMain.handle('file:save', async (_e, kind: FileKind, data: { name?: string }, file: string | null, saveAs: boolean) => {
  const p = await saveFile(win, kind, data, file, saveAs);
  buildMenu(() => win);
  return p;
});
ipcMain.handle('fixtures:list', () => listUserFixtures());
ipcMain.handle('fixtures:store', (_e, def: { id: string }) => storeUserFixture(def));
ipcMain.handle('fixtures:remove', (_e, id: string) => removeUserFixture(id));
ipcMain.handle('project:clearRecent', () => {
  clearRecent();
  buildMenu(() => win);
});
ipcMain.handle('project:pending', () => {
  const p = pendingOpen;
  pendingOpen = null;
  return p;
});
ipcMain.on('project:state', (_e, st: typeof projectState) => {
  projectState = st;
  if (!win) return;
  win.setDocumentEdited(st.dirty);
  if (process.platform === 'darwin') win.setRepresentedFilename(st.path ?? '');
});
ipcMain.handle('app:lang', (_e, l: 'de' | 'en') => buildMenu(() => win, l));

// macOS: double-click on a .vdlink file.
app.on('open-file', (e, file) => {
  e.preventDefault();
  if (!kindOf(file)) return;
  if (win) win.webContents.send('menu:openPath', file);
  else pendingOpen = file;
});
// Windows: file path as argument.
const argFile = process.argv.find((a) => !!kindOf(a));
if (argFile) pendingOpen = argFile;

// ------------------------------------------------------------------- windows

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 950,
    title: 'VD-Link',
    backgroundColor: '#0C0E13',
    icon: [path.join(app.getAppPath(), 'dist/icon.png'), path.join(app.getAppPath(), 'public/icon.png')].find((p) => existsSync(p)),
    minWidth: 1000,
    minHeight: 640,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'dist-electron/preload.cjs'),
      contextIsolation: true,
      sandbox: true,
      backgroundThrottling: false,
    },
  });
  // VD_QUERY="fixtures=150&quality=Niedrig&autowall=1" for automated test runs.
  const query = Object.fromEntries(new URLSearchParams(process.env.VD_QUERY ?? ''));
  if (DEV_URL) win.loadURL(DEV_URL + '?' + new URLSearchParams(query));
  else win.loadFile(path.join(app.getAppPath(), 'dist/index.html'), { query });

  // Renderer console → stdout (handy for perf logs during development).
  win.webContents.on('console-message', (e) => {
    const m = (e as unknown as { message: string }).message;
    const lvl = (e as unknown as { level: string }).level;
    if (m.startsWith('[vd]') || lvl === 'error') console.log(lvl === 'error' ? '[renderer error] ' + m : m);
  });

  // Automated screenshot for CI / development: VD_SCREENSHOT=out.png VD_SCREENSHOT_DELAY=ms
  const shot = process.env.VD_SCREENSHOT;
  if (shot) {
    const delays = (process.env.VD_SCREENSHOT_DELAY ?? '8000').split(',').map(Number);
    delays.forEach((ms, i) =>
      setTimeout(async () => {
        const img = await win!.webContents.capturePage();
        const file = delays.length > 1 ? shot.replace(/\.png$/, `-${i + 1}.png`) : shot;
        writeFileSync(file, img.toPNG());
        console.log('[vd] screenshot', file);
      }, ms),
    );
  }
  if (process.env.VD_QUIT_AFTER) setTimeout(() => app.quit(), Number(process.env.VD_QUIT_AFTER));
  // Measurements: minimise the window after n ms (rendering must pause).
  if (process.env.VD_MINIMIZE_AFTER) setTimeout(() => win?.minimize(), Number(process.env.VD_MINIMIZE_AFTER));
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (e, url) => {
    if (!DEV_URL || !url.startsWith(DEV_URL)) e.preventDefault();
  });
  // Unsaved changes: ask before closing.
  let closing = false;
  win.on('close', async (e) => {
    if (closing || !projectState.dirty || !projectState.data || process.env.VD_QUIT_AFTER) return;
    e.preventDefault();
    const de = app.getLocale().startsWith('de');
    const { response } = await dialog.showMessageBox(win!, {
      type: 'question',
      buttons: de ? ['Speichern', 'Nicht speichern', 'Abbrechen'] : ['Save', "Don't save", 'Cancel'],
      defaultId: 0,
      cancelId: 2,
      message: de ? `Änderungen an „${projectState.data.name}“ speichern?` : `Save changes to "${projectState.data.name}"?`,
    });
    if (response === 2) return;
    if (response === 0) {
      const saved = await saveProject(win, projectState.data, projectState.path, false);
      if (!saved) return;
    }
    closing = true;
    win?.close();
  });
  win.on('closed', () => (win = null));
  // Pause the 3D view while the window is minimised or hidden – with background
  // throttling off, the page's visibility API never reports this by itself.
  const vis = (v: boolean) => () => win?.webContents.send('win:visible', v);
  win.on('minimize', vis(false));
  win.on('hide', vis(false));
  // Back in the window (e.g. Link-Suite just installed) → check again, the hint disappears.
  win.on('focus', async () => {
    launcher = await detectLauncher({ search: false }).catch(() => launcher);
    win?.webContents.send('suite:launcher', launcherForUi(launcher));
  });
  win.on('restore', vis(true));
  win.on('show', vis(true));
}

app.setAboutPanelOptions({
  applicationName: 'VD-Link',
  applicationVersion: app.getVersion(),
  copyright: '© 2026 Philipp Spruck / NEXTPHILM · EPL-2.0',
  website: 'https://github.com/skyplayser/VD-Link',
  // NDI SDK documentation: the About box names the trademark owner.
  credits: 'NDI® is a registered trademark of Vizrt NDI AB.',
});

registerNdi();

app.whenReady().then(() => {
  // Packaged builds get the dock icon from the bundle; in development set it here.
  if (process.platform === 'darwin' && !app.isPackaged) app.dock?.setIcon(path.join(app.getAppPath(), 'build/icon.png'));
  session.defaultSession.setDisplayMediaRequestHandler(async (_req, callback) => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    const src = sources.find((s) => s.id === pendingCaptureId);
    pendingCaptureId = null;
    if (src) callback({ video: src });
    else callback(null);
  });
  void detectLauncher().then((l) => (launcher = l), () => {});
  crashedLastRun = existsSync(runningLock());
  try {
    writeFileSync(runningLock(), String(process.pid));
  } catch {
    /* read-only profile: no crash detection */
  }
  startDmx();
  buildMenu(() => win);
  createWindow();
  if (process.platform === 'darwin') console.log('[vd] screen capture permission:', systemPreferences.getMediaAccessStatus('screen'));
});

app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => {
  stopNdi();
  try {
    unlinkSync(runningLock());
  } catch {
    /* already gone */
  }
  for (const vd of virtualDisplays.values()) vd.proc.kill();
  artnet.stop();
  sacn.stop();
});
