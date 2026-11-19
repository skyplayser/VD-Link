import { contextBridge, ipcRenderer } from 'electron';

export interface CaptureSource {
  id: string;
  displayId: string;
  name: string;
  width: number;
  height: number;
  virtual: boolean;
}

export interface DmxSourceInfo {
  proto: 'artnet' | 'sacn';
  name: string;
  address: string;
  vdUniverse: number;
  nativeUniverse: string;
  priority: number;
  fps: number;
}

export interface DmxStatus {
  sources: DmxSourceInfo[];
  errors: string[];
  active: boolean;
  /** Addresses of consoles that recently sent ArtPoll. */
  pollers?: string[];
  net?: { artnet: boolean; sacn: boolean; universes: number };
}

export type FileKind = 'project' | 'location' | 'fixture';

export interface RecentProject {
  path: string;
  kind: FileKind;
  name: string;
  folder: string;
  modified: number;
  exists: boolean;
}

export interface ProjectFile {
  path: string;
  kind?: FileKind;
  data: unknown;
}

const api = {
  platform: process.platform,
  appInfo: () => ipcRenderer.invoke('app:info') as Promise<{ version: string; platform: string; arch: string }>,
  netInfo: () => ipcRenderer.invoke('net:info') as Promise<{ name: string; address: string }[]>,
  openUrl: (url: string) => ipcRenderer.invoke('open:url', url),
  onDmxFrame: (cb: (data: Uint8Array) => void) => {
    ipcRenderer.on('dmx:frame', (_e, data: Uint8Array) => cb(data));
  },
  onDmxStatus: (cb: (s: DmxStatus) => void) => {
    ipcRenderer.on('dmx:status', (_e, s: DmxStatus) => cb(s));
  },
  setDmxConfig: (cfg: { artnetOffset?: number; sacnOffset?: number; artnet?: boolean; sacn?: boolean; universes?: number }) =>
    ipcRenderer.invoke('dmx:config', cfg),
  projectOpen: () => ipcRenderer.invoke('project:open') as Promise<ProjectFile | null>,
  projectOpenPath: (p: string) => ipcRenderer.invoke('project:openPath', p) as Promise<ProjectFile>,
  projectSave: (data: unknown, path: string | null, saveAs: boolean) => ipcRenderer.invoke('project:save', data, path, saveAs) as Promise<string | null>,
  fileOpen: (kind: FileKind) => ipcRenderer.invoke('file:open', kind) as Promise<ProjectFile | null>,
  fileOpenPath: (p: string) => ipcRenderer.invoke('file:openPath', p) as Promise<ProjectFile & { kind: FileKind }>,
  fileSave: (kind: FileKind, data: unknown, path: string | null, saveAs: boolean) => ipcRenderer.invoke('file:save', kind, data, path, saveAs) as Promise<string | null>,
  userFixtures: () => ipcRenderer.invoke('fixtures:list') as Promise<unknown[]>,
  storeUserFixture: (def: unknown) => ipcRenderer.invoke('fixtures:store', def) as Promise<string>,
  removeUserFixture: (id: string) => ipcRenderer.invoke('fixtures:remove', id),
  projectRecent: () => ipcRenderer.invoke('project:recent') as Promise<RecentProject[]>,
  projectClearRecent: () => ipcRenderer.invoke('project:clearRecent'),
  /** Start animation: allowed = first load of this app start (main process decides); suite = suite.json → intro. */
  introInfo: () => ipcRenderer.invoke('intro:info') as Promise<{ allowed: boolean; suite: boolean | null }>,
  /** Link-Suite launcher installed? (local check in the main process; null = unknown/unsupported) */
  suiteLauncher: () => ipcRenderer.invoke('suite:launcher') as Promise<{ installed: boolean; version?: string } | null>,
  onSuiteLauncher: (cb: (l: { installed: boolean; version?: string } | null) => void) => ipcRenderer.on('suite:launcher', (_e, l) => cb(l)),
  /** Opens the Link-Suite download page (fixed address in the main process). */
  openLauncherPage: () => ipcRenderer.invoke('suite:launcher-page') as Promise<void>,
  projectPending: () => ipcRenderer.invoke('project:pending') as Promise<string | null>,
  projectState: (st: { path: string | null; dirty: boolean; data: unknown }) => ipcRenderer.send('project:state', st),
  setLang: (l: 'de' | 'en') => ipcRenderer.invoke('app:lang', l),
  /** Window minimised / hidden (backgroundThrottling is off, so the page never learns it otherwise). */
  onWindowVisible: (cb: (visible: boolean) => void) => ipcRenderer.on('win:visible', (_e, v: boolean) => cb(v)),
  onMenu: (cb: (cmd: string, arg?: unknown) => void) => {
    for (const c of ['new', 'open', 'openPath', 'save', 'saveAs', 'start', 'settings'])
      ipcRenderer.on('menu:' + c, (_e, arg) => cb(c, arg));
  },
  createVirtualDisplay: (o: { name: string; width: number; height: number }) =>
    ipcRenderer.invoke('vdisplay:create', o) as Promise<{ ok: boolean; displayID?: number; error?: string }>,
  removeVirtualDisplay: (displayID: number) => ipcRenderer.invoke('vdisplay:remove', displayID),
  listCaptureSources: () => ipcRenderer.invoke('capture:list') as Promise<CaptureSource[]>,
  selectCaptureSource: (id: string) => ipcRenderer.invoke('capture:select', id),
  capturePermission: () => ipcRenderer.invoke('capture:permission') as Promise<string>,
  openTestPattern: (displayId: string) => ipcRenderer.invoke('pattern:open', displayId) as Promise<boolean>,
  closeTestPattern: (displayId?: string) => ipcRenderer.invoke('pattern:close', displayId),
  // NDI® (Vizrt NDI AB) – receive only, via the user's NDI runtime.
  ndiStatus: () => ipcRenderer.invoke('ndi:status') as Promise<NdiStatus>,
  ndiSources: () => ipcRenderer.invoke('ndi:sources') as Promise<NdiSource[]>,
  /** Asks for the frame channel; it arrives as window message {vdNdiPort: true} with the port. */
  ndiConnect: () => ipcRenderer.invoke('ndi:connect'),
  ndiOpen: (key: string, src: NdiSource, low: boolean) => ipcRenderer.invoke('ndi:open', key, src.name, src.url, low),
  ndiClose: (key: string) => ipcRenderer.invoke('ndi:close', key),
  ndiLink: (which: 'home' | 'runtime') => ipcRenderer.invoke('ndi:link', which),
  // VR-Brille: viewer server for headsets on the network.
  vrInfo: () => ipcRenderer.invoke('vr:info') as Promise<VrInfo>,
  vrEnable: (on: boolean) => ipcRenderer.invoke('vr:enable', on) as Promise<VrInfo>,
  vrNewCode: () => ipcRenderer.invoke('vr:newCode') as Promise<VrInfo>,
  vrOpenPcvr: () => ipcRenderer.invoke('vr:openPcvr'),
  /** Ask connected VDM headsets to record the show (seconds); returns how many got it. */
  vrRecord: (seconds: number) => ipcRenderer.invoke('vr:record', seconds) as Promise<number>,
  vrScene: (json: string) => ipcRenderer.send('vr:scene', json),
  /** VD VR headsets (id, or all with null) download the open project as a world to walk without a computer. */
  vrSendWorld: (target: string | null) => ipcRenderer.invoke('vr:sendWorld', target) as Promise<number>,
  /** Club scans from VD VR (userData/scans) – a location is built from them in src/shared/scan.ts. */
  vrScans: () => ipcRenderer.invoke('vr:scans') as Promise<VrScanInfo[]>,
  vrReadScan: (id: string) => ipcRenderer.invoke('vr:readScan', id) as Promise<unknown>,
  onVrScan: (cb: (s: VrScanInfo) => void) => {
    ipcRenderer.on('vr:scan', (_e, s: VrScanInfo) => cb(s));
  },
  /** The club studio's drawing, live while you draw in the headset. */
  onVrScanLive: (cb: (device: string, data: unknown) => void) => {
    ipcRenderer.on('vr:scanLive', (_e, device: string, data: unknown) => cb(device, data));
  },
  onVrWorldStatus: (cb: (s: VrWorldStatus) => void) => {
    ipcRenderer.on('vr:worldStatus', (_e, s: VrWorldStatus) => cb(s));
  },
  vrDmx: (data: Uint8Array) => ipcRenderer.send('vr:dmx', data),
  vrView: (v: { haze: number; day: boolean }) => ipcRenderer.send('vr:view', v),
  /** Picture of video screen i (JPEG) and the state of all screens (JSON). */
  vrWall: (i: number, jpeg: Uint8Array) => ipcRenderer.send('vr:wall', i, jpeg),
  vrWalls: (json: string) => ipcRenderer.send('vr:walls', json),
  /** Native VR apps: ready-made beams per frame, and how many such apps are connected. */
  vrFrame: (data: Uint8Array) => ipcRenderer.send('vr:frame', data),
  /** Gobo atlas (PNG, cols × rows tiles) for native VR apps. */
  vrGobos: (png: Uint8Array, cols: number, rows: number) => ipcRenderer.send('vr:gobos', png, cols, rows),
  /** The room as VD-Link draws it, for VDM (src/render/vr-export.ts). */
  vrVenue: (bytes: Uint8Array) => ipcRenderer.send('vr:venue', bytes),
  /** Put a VDM headset (id, or all with null) at a place, looking along yaw (degrees). Returns how many. */
  vrGoto: (id: string | null, pos: [number, number, number], yaw: number) => ipcRenderer.invoke('vr:goto', id, pos, yaw) as Promise<number>,
  onVrNative: (cb: (n: number) => void) => {
    ipcRenderer.on('vr:native', (_e, n: number) => cb(n));
  },
  /** Where a connected headset is and where it looks (~10×/s per headset). */
  onVrPose: (cb: (p: VrPose) => void) => {
    ipcRenderer.on('vr:pose', (_e, p: VrPose) => cb(p));
  },
  onVrClients: (cb: (n: number) => void) => {
    ipcRenderer.on('vr:clients', (_e, n: number) => cb(n));
  },
};

// MessagePorts cannot cross the context bridge – hand them over as a window message.
ipcRenderer.on('ndi:port', (e) => window.postMessage({ vdNdiPort: true }, '*', e.ports));

import type { VrInfo, VrPose, VrScanInfo, VrWorldStatus } from './vr-server.ts';
export type { VrInfo, VrScanInfo, VrWorldStatus };

export interface NdiSource {
  name: string;
  url: string;
}
export interface NdiStatus {
  ok: boolean;
  version?: string;
  error?: string;
  runtimeUrl: string;
  homeUrl: string;
}

export type VdApi = typeof api;

contextBridge.exposeInMainWorld('vd', api);
