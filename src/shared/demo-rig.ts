// Rig = scenario lamp positions + fixture types + patch. Plus the built-in demo show.

import type { FixtureDef } from './fixture-types.ts';
import { compileMode, type CompiledMode, type Look } from './dmx-codec.ts';
import type { Scenario } from './scenarios.ts';

export type Mount = 'hang' | 'floor';

export interface RigFixture {
  index: number;
  pos: [number, number, number];
  mount: Mount;
  /** 1-based universe and address, like on a console. */
  universe: number;
  address: number;
  group: string;
  yaw: number;
  /** Fixture type of this lamp (own locations can mix types). */
  def: FixtureDef;
  modeIndex: number;
  cm: CompiledMode;
}

export interface Rig {
  /** Default fixture type (built-in scenarios, and lamps without own type). */
  def: FixtureDef;
  modeIndex: number;
  footprint: number;
  fixtures: RigFixture[];
  universes: number;
  scenario: Scenario;
  /** Distinct fixture types in this rig. */
  types: { def: FixtureDef; modeIndex: number; count: number }[];
}

/**
 * Builds the rig. Lamps with a fixed patch keep it; all others are patched
 * sequentially (universe by universe, no gaps, never across a universe border).
 */
export function buildRig(def: FixtureDef, modeIndex: number, scenario: Scenario, lookup: (id: string) => FixtureDef | undefined = () => undefined): Rig {
  const cache = new Map<string, CompiledMode>();
  const compiled = (d: FixtureDef, m: number) => {
    const k = `${d.id}#${m}`;
    let c = cache.get(k);
    if (!c) cache.set(k, (c = compileMode(d, m)));
    return c;
  };
  const used = new Map<number, Set<number>>(); // universe → occupied addresses
  const occupy = (u: number, a: number, n: number) => {
    const set = used.get(u) ?? used.set(u, new Set()).get(u)!;
    for (let i = 0; i < n; i++) set.add(a + i);
  };
  const free = (u: number, a: number, n: number) => {
    const set = used.get(u);
    if (a + n - 1 > 512) return false;
    if (!set) return true;
    for (let i = 0; i < n; i++) if (set.has(a + i)) return false;
    return true;
  };
  // Fixed patches first.
  for (const p of scenario.fixtures) {
    if (!p.universe || !p.address) continue;
    const d = (p.fixtureId && lookup(p.fixtureId)) || def;
    occupy(p.universe, p.address, compiled(d, Math.min(p.mode ?? modeIndex, d.modes.length - 1)).footprint);
  }
  let universe = 1;
  let address = 1;
  const fixtures = scenario.fixtures.map((p, index) => {
    const d = (p.fixtureId && lookup(p.fixtureId)) || def;
    const m = Math.min(p.fixtureId ? (p.mode ?? 0) : modeIndex, d.modes.length - 1);
    const cm = compiled(d, m);
    let u = p.universe ?? 0;
    let a = p.address ?? 0;
    if (!u || !a) {
      while (!free(universe, address, cm.footprint)) {
        address++;
        if (address + cm.footprint - 1 > 512) {
          universe++;
          address = 1;
        }
      }
      u = universe;
      a = address;
      occupy(u, a, cm.footprint);
      address += cm.footprint;
    }
    const f: RigFixture = { index, pos: p.pos, mount: p.mount, universe: u, address: a, group: p.group, yaw: p.yaw ?? 0, def: d, modeIndex: m, cm };
    return f;
  });
  const types = new Map<string, { def: FixtureDef; modeIndex: number; count: number }>();
  for (const f of fixtures) {
    const k = `${f.def.id}#${f.modeIndex}`;
    const t = types.get(k) ?? types.set(k, { def: f.def, modeIndex: f.modeIndex, count: 0 }).get(k)!;
    t.count++;
  }
  const universes = fixtures.reduce((mx, f) => Math.max(mx, f.universe), 1);
  return { def, modeIndex, footprint: compiled(def, Math.min(modeIndex, def.modes.length - 1)).footprint, fixtures, universes, scenario, types: [...types.values()] };
}

/** Patch list as CSV (for Daslight, MA, QLC+ …). */
export function patchCsv(rig: Rig): string {
  const head = 'Nr;Gruppe;Hersteller;Modell;Modus;Kanäle;Universe;Adresse;X;Y;Z;Montage';
  const lines = rig.fixtures.map((f) =>
    [f.index + 1, f.group, f.def.manufacturer, f.def.model, f.def.modes[f.modeIndex]?.name, f.cm.footprint, f.universe, f.address,
      ...f.pos.map((v) => v.toFixed(2).replace('.', ',')), f.mount === 'hang' ? 'hängend' : 'stehend'].join(';'),
  );
  return [head, ...lines].join('\r\n') + '\r\n';
}

// ---------------------------------------------------------------- demo show

function hsv(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h * 6) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)];
}

export const DEMO_SCENE_SECONDS = 12;
export const DEMO_SCENES = ['Fächer', 'Ballyhoo + Gobos', 'Strobe-Hit', 'Prisma-Welle'];

/**
 * Writes the look of fixture `f` at time `t` (seconds). Angles are converted
 * into 0..1 DMX ranges using the fixture's pan/tilt range.
 */
export function demoLook(rig: Rig, f: RigFixture, t: number, out: Look): Look {
  const n = rig.fixtures.length;
  const i = f.index;
  const panRange = f.def.physical.panDeg ?? 540;
  const tiltRange = f.def.physical.tiltDeg ?? 270;
  const pan = (deg: number) => 0.5 + deg / panRange;
  const tilt = (deg: number) => 0.5 + deg / tiltRange;
  const scene = Math.floor(t / DEMO_SCENE_SECONDS) % DEMO_SCENES.length;
  const st = t % DEMO_SCENE_SECONDS;
  const u = n > 1 ? i / (n - 1) : 0;
  const side = f.pos[0] < 0 ? -1 : 1;

  out.open = true;
  out.strobeHz = 0;
  out.prism = false;
  out.gobo = 0;

  switch (scene) {
    case 0: {
      const [r, g, b] = hsv((u * 0.8 + t * 0.05) % 1, 0.9, 1);
      out.r = r;
      out.g = g;
      out.b = b;
      out.dimmer = 1;
      out.zoom = 0.05;
      out.pan = pan(-side * (10 + 25 * Math.abs(f.pos[0]) / 10) + Math.sin(t * 0.8) * 25);
      out.tilt = tilt(f.mount === 'floor' ? 15 + 10 * Math.sin(t * 0.6 + i * 0.3) : 35 + 15 * Math.sin(t * 0.7 + i * 0.25));
      break;
    }
    case 1: {
      const c = i % 2 ? [1, 0.05, 0.8] : [0.1, 0.6, 1];
      out.r = c[0];
      out.g = c[1];
      out.b = c[2];
      out.dimmer = 0.55 + 0.45 * Math.sin(t * 3 - i * 0.6);
      out.zoom = 0.35;
      out.gobo = 1 + (i % 4);
      out.pan = pan(Math.sin(t * 1.2 + i) * 45);
      out.tilt = tilt((f.mount === 'floor' ? 10 : 40) + Math.cos(t * 1.05 + i * 0.7) * 22);
      break;
    }
    case 2: {
      out.r = out.g = out.b = 1;
      out.zoom = 0.15;
      out.pan = pan(side * -8);
      out.tilt = tilt(f.mount === 'floor' ? 5 : 25);
      const hit = st < 4;
      out.strobeHz = hit ? 12 : 0;
      out.dimmer = hit ? 1 : Math.max(0, Math.sin(st * Math.PI * 2) * (1 - (st - 4) / 8));
      break;
    }
    default: {
      out.r = 1;
      out.g = 0.55;
      out.b = 0.08;
      out.prism = true;
      out.zoom = 0.2;
      out.dimmer = 0.5 + 0.5 * Math.sin(t * 2.2 - i * 0.45);
      out.pan = pan(Math.sin(t * 0.5 + u * Math.PI) * 30);
      out.tilt = tilt((f.mount === 'floor' ? 12 : 30) + 20 * Math.sin(t * 1.6 - i * 0.4));
    }
  }
  return out;
}
