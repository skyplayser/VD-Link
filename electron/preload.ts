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
};

export type VdApi = typeof api;

contextBridge.exposeInMainWorld('vd', api);
