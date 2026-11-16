// Project = one prepared show/venue: which location, which fixtures, view and DMX settings.
// Saved as .vdlink (JSON). Machine settings (quality, network) live in AppSettings instead.

import type { ScenarioId } from './shared/scenarios.ts';
import { SCENARIOS } from './shared/scenarios.ts';
import { VD_GENERIC_MH } from './shared/fixtures/vd-generic-mh.ts';
import type { FixtureDef } from './shared/fixture-types.ts';
import { locationToScenario, normalizeLocation, type LocationData } from './shared/location.ts';
import type { Scenario } from './shared/scenarios.ts';
import type { CamId, DmxMode, Quality } from './ui/ctx.ts';

export interface ProjectData {
  format: 'vd-link-project';
  version: 1;
  name: string;
  created: string;
  modified: string;
  /** Built-in template, or 'custom' with the whole location embedded. */
  venue: { template: ScenarioId | 'custom'; location?: LocationData };
  fixture: { id: string; mode: number };
  view: { camera: CamId; haze: number; day: boolean };
  dmx: { mode: DmxMode; artnetOffset: number; sacnOffset: number };
  notes: string;
  /** Own lamps used in this project – embedded so the file works on every computer. */
  customFixtures: FixtureDef[];
}

export function newProject(name: string, template: ScenarioId): ProjectData {
  const now = new Date().toISOString();
  return {
    format: 'vd-link-project',
    version: 1,
    name,
    created: now,
    modified: now,
    venue: { template },
    fixture: { id: VD_GENERIC_MH.id, mode: 0 },
    view: { camera: 'audience', haze: 0.6, day: false },
    dmx: { mode: 'auto', artnetOffset: 0, sacnOffset: 0 },
    notes: '',
    customFixtures: [],
  };
}

export function projectFromLocation(name: string, loc: LocationData): ProjectData {
  const p = newProject(name, 'club');
  p.venue = { template: 'custom', location: loc };
  return p;
}

/** The scenario the 3D view should show for a project. */
export function projectScenario(p: ProjectData): Scenario {
  if (p.venue.template === 'custom' && p.venue.location) return locationToScenario(p.venue.location);
  return SCENARIOS[(p.venue.template as ScenarioId) in SCENARIOS ? (p.venue.template as ScenarioId) : 'club'];
}

/** Accepts older / partial files and fills in defaults. */
export function normalize(raw: unknown): ProjectData {
  const r = (raw ?? {}) as Partial<ProjectData>;
  const tpl = r.venue?.template;
  const base = newProject(String(r.name ?? 'Unbenannt'), (tpl && tpl !== 'custom' && SCENARIOS[tpl] ? tpl : 'club') as ScenarioId);
  return {
    ...base,
    ...r,
    format: 'vd-link-project',
    version: 1,
    venue:
      tpl === 'custom' && r.venue?.location
        ? { template: 'custom', location: normalizeLocation(r.venue.location) }
        : { template: base.venue.template },
    customFixtures: Array.isArray(r.customFixtures) ? r.customFixtures : [],
    fixture: { ...base.fixture, ...r.fixture },
    view: { ...base.view, ...r.view },
    dmx: { ...base.dmx, ...r.dmx },
  };
}

// ------------------------------------------------------------- app settings

export interface AppSettings {
  quality: Quality;
  bloom: boolean;
  artnet: boolean;
  sacn: boolean;
  universes: number;
  /** Frame-rate limit of the 3D view: 60 (default) or 0 = display refresh rate. */
  fpsCap: 60 | 0;
  /** Start animation: like the Link-Suite (suite.json → intro), or the own value of VD-Link. */
  intro?: 'suite' | 'on' | 'off';
}

const APP_KEY = 'vdlink.app';
const APP_DEFAULTS: AppSettings = { quality: 'mid', bloom: true, artnet: true, sacn: true, universes: 8, fpsCap: 60 };

export function loadAppSettings(): AppSettings {
  try {
    const s: AppSettings = { ...APP_DEFAULTS, ...JSON.parse(localStorage.getItem(APP_KEY) ?? '{}') };
    // Development/measurements: ?fpscap=0|60 overrides the stored frame-rate limit.
    const cap = new URLSearchParams(location.search).get('fpscap');
    if (cap === '0' || cap === '60') s.fpsCap = Number(cap) as 60 | 0;
    const q = new URLSearchParams(location.search);
    if (q.get('nobloom') === '1') s.bloom = false;
    if (q.get('quality') === 'low' || q.get('quality') === 'mid' || q.get('quality') === 'high') s.quality = q.get('quality') as AppSettings['quality'];
    return s;
  } catch {
    return { ...APP_DEFAULTS };
  }
}

export function saveAppSettings(s: AppSettings) {
  try {
    localStorage.setItem(APP_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------- autosave

const AUTO_KEY = 'vdlink.autosave';

export function saveAutosave(p: ProjectData, path: string | null, dirty: boolean) {
  try {
    localStorage.setItem(AUTO_KEY, JSON.stringify({ project: p, path, dirty }));
  } catch {
    /* ignore */
  }
}

export function loadAutosave(): { project: ProjectData; path: string | null; dirty: boolean } | null {
  try {
    const v = JSON.parse(localStorage.getItem(AUTO_KEY) ?? 'null');
    return v?.project ? { project: normalize(v.project), path: v.path ?? null, dirty: !!v.dirty } : null;
  } catch {
    return null;
  }
}
