// Project files (.vdlink, JSON) and the "recently opened" list.
// The renderer owns the project content; the main process only does dialogs and disk I/O.

import { app, dialog, type BrowserWindow } from 'electron';
import { existsSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export const EXT = 'vdlink';

/** The three file types VD-Link saves. */
export const KINDS = {
  project: { ext: 'vdlink', name: 'VD-Link-Projekt', format: 'vd-link-project' },
  location: { ext: 'vdloc', name: 'VD-Link-Location', format: 'vd-link-location' },
  fixture: { ext: 'vdfix', name: 'VD-Link-Lampe', format: 'vd-link-fixture' },
} as const;
export type FileKind = keyof typeof KINDS;
export const kindOf = (file: string): FileKind | null =>
  (Object.keys(KINDS) as FileKind[]).find((k) => file.toLowerCase().endsWith('.' + KINDS[k].ext)) ?? null;
const MAX_RECENT = 10;

export interface RecentProject {
  path: string;
  kind: FileKind;
  name: string;
  folder: string;
  modified: number;
  exists: boolean;
}

const recentFile = () => path.join(app.getPath('userData'), 'recent.json');

function loadRecent(): string[] {
  try {
    const list = JSON.parse(readFileSync(recentFile(), 'utf8'));
    return Array.isArray(list) ? list.filter((p) => typeof p === 'string') : [];
  } catch {
    return [];
  }
}

function storeRecent(list: string[]) {
  try {
    mkdirSync(path.dirname(recentFile()), { recursive: true });
    writeFileSync(recentFile(), JSON.stringify(list.slice(0, MAX_RECENT), null, 2));
  } catch {
    /* ignore */
  }
}

export function addRecent(file: string) {
  storeRecent([file, ...loadRecent().filter((p) => p !== file)]);
  app.addRecentDocument(file);
}

export function clearRecent() {
  storeRecent([]);
  app.clearRecentDocuments();
}

export function listRecent(): RecentProject[] {
  return loadRecent().map((p) => {
    const exists = existsSync(p);
    let modified = 0;
    if (exists) {
      try {
        modified = statSync(p).mtimeMs;
      } catch {
        /* ignore */
      }
    }
    const kind = kindOf(p) ?? 'project';
    return { path: p, kind, name: path.basename(p, '.' + KINDS[kind].ext), folder: path.dirname(p), modified, exists };
  });
}

export function readProject(file: string): { path: string; data: unknown } {
  return readFile(file, 'project');
}

/** Reads any of the three file types; checks the format tag. */
export function readFile(file: string, expect?: FileKind): { path: string; kind: FileKind; data: unknown } {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const kind = (Object.keys(KINDS) as FileKind[]).find((k) => data?.format === KINDS[k].format);
  if (!kind || (expect && kind !== expect)) throw new Error(`Keine ${KINDS[expect ?? 'project'].name}-Datei`);
  if (kind !== 'fixture') addRecent(file);
  return { path: file, kind, data };
}

export async function openFileDialog(win: BrowserWindow | null, kind: FileKind) {
  const k = KINDS[kind];
  const opts = { title: k.name, filters: [{ name: k.name, extensions: [k.ext] }], properties: ['openFile' as const] };
  const res = win ? await dialog.showOpenDialog(win, opts) : await dialog.showOpenDialog(opts);
  if (res.canceled || !res.filePaths[0]) return null;
  return readFile(res.filePaths[0], kind);
}

export async function saveFile(win: BrowserWindow | null, kind: FileKind, data: { name?: string; model?: string }, file: string | null, saveAs: boolean) {
  const k = KINDS[kind];
  let target = file;
  if (!target || saveAs) {
    const base = (data.name || data.model || 'Unbenannt').replace(/[\\/:*?"<>|]+/g, '_');
    const opts = {
      title: k.name,
      defaultPath: path.join(file ? path.dirname(file) : app.getPath('documents'), `${base}.${k.ext}`),
      filters: [{ name: k.name, extensions: [k.ext] }],
    };
    const res = win ? await dialog.showSaveDialog(win, opts) : await dialog.showSaveDialog(opts);
    if (res.canceled || !res.filePath) return null;
    target = res.filePath.endsWith('.' + k.ext) ? res.filePath : `${res.filePath}.${k.ext}`;
  }
  writeFileSync(target, JSON.stringify(data, null, 2));
  if (kind !== 'fixture') addRecent(target);
  return target;
}

// ------------------------------------------------- own lamps (user library)

const userFixtureDir = () => path.join(app.getPath('userData'), 'fixtures');

export function listUserFixtures(): unknown[] {
  try {
    return readdirSync(userFixtureDir())
      .filter((f) => f.endsWith('.vdfix'))
      .map((f) => {
        try {
          return JSON.parse(readFileSync(path.join(userFixtureDir(), f), 'utf8')).fixture;
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function storeUserFixture(def: { id: string }) {
  mkdirSync(userFixtureDir(), { recursive: true });
  const file = path.join(userFixtureDir(), def.id.replace(/[^a-z0-9-]+/gi, '_') + '.vdfix');
  writeFileSync(file, JSON.stringify({ format: 'vd-link-fixture', version: 1, fixture: def }, null, 2));
  return file;
}

export function removeUserFixture(id: string) {
  const file = path.join(userFixtureDir(), id.replace(/[^a-z0-9-]+/gi, '_') + '.vdfix');
  if (existsSync(file)) unlinkSync(file);
}

export async function openDialog(win: BrowserWindow | null) {
  const opts = {
    title: 'Projekt öffnen',
    filters: [{ name: 'VD-Link-Projekt', extensions: [EXT] }],
    properties: ['openFile' as const],
  };
  const res = win ? await dialog.showOpenDialog(win, opts) : await dialog.showOpenDialog(opts);
  if (res.canceled || !res.filePaths[0]) return null;
  return readProject(res.filePaths[0]);
}

export async function saveProject(win: BrowserWindow | null, data: { name?: string }, file: string | null, saveAs: boolean) {
  let target = file;
  if (!target || saveAs) {
    const base = (data.name || 'Unbenannt').replace(/[\\/:*?"<>|]+/g, '_');
    const opts = {
      title: 'Projekt speichern',
      defaultPath: path.join(file ? path.dirname(file) : app.getPath('documents'), `${base}.${EXT}`),
      filters: [{ name: 'VD-Link-Projekt', extensions: [EXT] }],
    };
    const res = win ? await dialog.showSaveDialog(win, opts) : await dialog.showSaveDialog(opts);
    if (res.canceled || !res.filePath) return null;
    target = res.filePath.endsWith('.' + EXT) ? res.filePath : `${res.filePath}.${EXT}`;
  }
  writeFileSync(target, JSON.stringify(data, null, 2));
  addRecent(target);
  return target;
}
