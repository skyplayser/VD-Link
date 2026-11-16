// Own locations ("Eigene Location bauen"): file format .vdloc and conversion into the
// Scenario shape the 3D view understands. Everything in a location is an object:
// room parts, furniture, trusses, video walls, crowd areas and the lamps themselves.

import type { OutputSpec, Place, Scenario, WallSpec } from './scenarios.ts';

export type V3 = [number, number, number];
export type LocKind = 'indoor' | 'outdoor';

export type ObjType =
  | 'box'
  | 'wall'
  | 'stage'
  | 'arc'
  | 'stairs'
  | 'pillar'
  | 'cylinder'
  | 'bar'
  | 'djbooth'
  | 'sofa'
  | 'table'
  | 'truss'
  | 'tower'
  | 'videowall'
  | 'ledstrip'
  | 'aquarium'
  | 'crowd'
  | 'fixture'
  | 'scan';

export type MatPreset =
  | 'black'
  | 'darkgrey'
  | 'grey'
  | 'white'
  | 'marble'
  | 'velvet-petrol'
  | 'velvet-violet'
  | 'metal'
  | 'wood'
  | 'glass'
  | 'concrete'
  | 'grass'
  | 'led';

export interface LocFixture {
  /** Fixture definition id (library, built-in or own .vdfix). */
  id: string;
  mode: number;
  mount: 'hang' | 'floor';
  /** Optional fixed patch; empty = automatic. */
  universe?: number;
  address?: number;
}

export interface LocObject {
  id: string;
  type: ObjType;
  name: string;
  /** Centre position in metres (y = bottom for most furniture, see builder). */
  pos: V3;
  /** Rotation in degrees. */
  rot: V3;
  /** Size in metres (x = width/length, y = height, z = depth). */
  size: V3;
  material: MatPreset;
  /** Hex colour for LED strips / tinting. */
  color?: string;
  /** Video wall resolution. */
  pixels?: [number, number];
  /** Video wall fed by a shared output: output id + pixel rect x, y, w, h in that output. */
  output?: { id: string; rect: [number, number, number, number] };
  /** Lamp placement. */
  fixture?: LocFixture;
  /** Crowd: people per square metre. */
  density?: number;
  /** Optional group name (patch list). */
  group?: string;
  /**
   * Round shapes. 'arc': part of an ellipse (size x / z = diameters) – filled
   * (thickness 0, e.g. a D-shaped stage with angle 180°) or a ring band (riser, curved
   * wall, parapet, bench, steps). Also bends a truss into an arc / circle and sets
   * how far a round sofa reaches around. The arc is centred on the local +z side.
   */
  arc?: ArcSpec;
}

export interface ArcSpec {
  /** Degrees, 1–360 (360 = closed ring / full ellipse). */
  angle: number;
  /** Band width in metres; 0 = filled (pie / half ellipse). */
  thickness: number;
}

export interface LocationData {
  format: 'vd-link-location';
  version: 1;
  name: string;
  kind: LocKind;
  created: string;
  modified: string;
  /** Indoor: the room. Outdoor: the ground area. */
  room: { width: number; depth: number; height: number };
  objects: LocObject[];
  /** Shared video outputs (one HDMI → several walls). */
  outputs?: OutputSpec[];
  /** Lamp types added to this location/project (palette "Lamps in project"). */
  fixtureTypes?: { id: string; mode: number }[];
}

let counter = 0;
export const newId = () => `o${Date.now().toString(36)}${(counter++).toString(36)}`;

export function newLocation(name: string, kind: LocKind): LocationData {
  const now = new Date().toISOString();
  const indoor = kind === 'indoor';
  return {
    format: 'vd-link-location',
    version: 1,
    name,
    kind,
    created: now,
    modified: now,
    room: indoor ? { width: 20, depth: 14, height: 6 } : { width: 120, depth: 100, height: 0 },
    objects: [],
  };
}

export function normalizeLocation(raw: unknown): LocationData {
  const r = (raw ?? {}) as Partial<LocationData>;
  const base = newLocation(String(r.name ?? 'Location'), r.kind === 'outdoor' ? 'outdoor' : 'indoor');
  return {
    ...base,
    ...r,
    format: 'vd-link-location',
    version: 1,
    room: { ...base.room, ...r.room },
    objects: Array.isArray(r.objects) ? r.objects.map((o) => ({ ...o, rot: o.rot ?? [0, 0, 0], size: o.size ?? [1, 1, 1] })) : [],
  };
}

/** Converts a location into the Scenario the 3D view and rig builder use. */
export function locationToScenario(loc: LocationData): Scenario {
  const { width: W, depth: D, height: H } = loc.room;
  const indoor = loc.kind === 'indoor';
  const walls: WallSpec[] = loc.objects
    .filter((o) => o.type === 'videowall')
    .map((o) => ({
      name: o.name,
      width: o.size[0],
      height: o.size[1],
      // Builder objects pivot at their bottom edge → centre = pos + R·(0, h/2, 0).
      pos: add3(o.pos, rotateXYZ([0, o.size[1] / 2, 0], o.rot)),
      rotY: o.rot[1],
      rot: o.rot,
      output: o.output && loc.outputs?.some((x) => x.id === o.output!.id) ? o.output.id : undefined,
      rect: o.output?.rect,
      // Resolution always follows the wall's shape – a 2×6 m wall gets portrait pixels.
      pixels: fitPixels(o.pixels, o.size[0], o.size[1]),
    }));
  const fixtures: Place[] = loc.objects
    .filter((o) => o.type === 'fixture' && o.fixture)
    .map((o) => ({
      pos: o.pos,
      mount: o.fixture!.mount,
      group: o.group || o.name,
      yaw: o.rot[1],
      fixtureId: o.fixture!.id,
      mode: o.fixture!.mode,
      universe: o.fixture!.universe,
      address: o.fixture!.address,
    }));
  const crowds = loc.objects.filter((o) => o.type === 'crowd');
  const s = Math.max(W, D);
  return {
    id: 'custom',
    custom: true,
    outdoor: !indoor,
    room: indoor ? { width: W, depth: D, height: H, backZ: -D / 2 } : null,
    ground: indoor ? undefined : { width: W, depth: D },
    stage: { width: 0, depth: 0, height: 0, z: 0 },
    booth: { z: 0, y: 0 },
    walls,
    outputs: loc.outputs ?? [],
    crowd: { count: 0, xMin: 0, xMax: 0, zMin: 0, zMax: 0 },
    crowdAreas: crowds.map((c) => ({
      x: c.pos[0],
      z: c.pos[2],
      w: c.size[0],
      d: c.size[2],
      rot: c.rot[1],
      count: Math.round(c.size[0] * c.size[2] * (c.density ?? 1.5)),
    })),
    fixtures,
    objects: loc.objects.filter((o) => o.type !== 'fixture' && o.type !== 'videowall' && o.type !== 'crowd'),
    cameras: indoor
      ? {
          audience: [[0, 2.8, D / 2 - 1], [0, H / 2, -D / 2]],
          dj: [[0, 2.2, -D / 2 + 2], [0, 2, D / 2]],
          wide: [[W * 0.55, H * 1.4, D * 0.7], [0, 1, 0]],
          side: [[-W / 2 + 1, 2.6, D / 2 - 1], [W / 4, 1.6, -D / 4]],
        }
      : {
          audience: [[0, 4, s * 0.25], [0, 5, -s * 0.15]],
          dj: [[0, 3.5, -s * 0.1], [0, 3, s * 0.3]],
          wide: [[s * 0.35, s * 0.25, s * 0.4], [0, 2, 0]],
          side: [[-s * 0.3, 6, s * 0.1], [0, 4, -s * 0.1]],
        },
  };
}

/**
 * Turns a built-in template into an editable location (room, stage, booth, trusses,
 * lamps, video walls, crowd) – a starting point for rebuilding a real club.
 */
export function scenarioToLocation(sc: Scenario, name: string, defaultFixture: { id: string; mode: number }): LocationData {
  const kind: LocKind = sc.room ? 'indoor' : 'outdoor';
  const loc = newLocation(name, kind);
  if (sc.room) loc.room = { width: sc.room.width, depth: sc.room.depth, height: sc.room.height };
  else if (sc.ground) loc.room = { width: sc.ground.width, depth: sc.ground.depth, height: 0 };
  const add = (o: Omit<LocObject, 'id'>) => loc.objects.push({ id: newId(), ...o });
  const st = sc.stage;
  if (st.width) add({ type: 'stage', name: kind === 'indoor' ? 'Podest' : 'Bühne', pos: [0, 0, st.z], rot: [0, 0, 0], size: [st.width, st.height, st.depth], material: 'darkgrey' });
  add({ type: 'djbooth', name: 'DJ-Pult', pos: [0, sc.booth.y, sc.booth.z], rot: [0, 0, 0], size: [3.2, 1.1, 0.9], material: 'black', color: '#ff3cc8' });
  for (const w of sc.walls)
    add({ type: 'videowall', name: w.name, pos: [w.pos[0], w.pos[1] - w.height / 2, w.pos[2]], rot: [0, w.rotY, 0], size: [w.width, w.height, 0.12], material: 'black', pixels: w.pixels });
  // One truss per group of hanging lamps.
  const groups = new Map<string, Place[]>();
  for (const f of sc.fixtures) if (f.mount === 'hang') (groups.get(f.group) ?? groups.set(f.group, []).get(f.group)!).push(f);
  for (const [g, list] of groups) {
    const xs = list.map((f) => f.pos[0]);
    const zs = list.map((f) => f.pos[2]);
    const alongX = Math.max(...xs) - Math.min(...xs) >= Math.max(...zs) - Math.min(...zs);
    const len = (alongX ? Math.max(...xs) - Math.min(...xs) : Math.max(...zs) - Math.min(...zs)) + 1.2;
    add({
      type: 'truss',
      name: g,
      pos: [(Math.max(...xs) + Math.min(...xs)) / 2, list[0].pos[1] + 0.02, (Math.max(...zs) + Math.min(...zs)) / 2],
      rot: [0, alongX ? 0 : 90, 0],
      size: [len, 0.3, 0.3],
      material: 'metal',
    });
  }
  sc.fixtures.forEach((f, i) =>
    add({
      type: 'fixture',
      name: `${f.group} · ${i + 1}`,
      group: f.group,
      pos: f.pos,
      rot: [0, f.yaw ?? 0, 0],
      size: [0.4, 0.5, 0.4],
      material: 'darkgrey',
      fixture: { id: f.fixtureId ?? defaultFixture.id, mode: f.mode ?? defaultFixture.mode, mount: f.mount },
    }),
  );
  const c = sc.crowd;
  if (c.count)
    add({ type: 'crowd', name: 'Publikum', pos: [(c.xMin + c.xMax) / 2, 0, (c.zMin + c.zMax) / 2], rot: [0, 0, 0], size: [c.xMax - c.xMin, 0, c.zMax - c.zMin], material: 'grey', density: c.count / Math.max(1, (c.xMax - c.xMin) * (c.zMax - c.zMin)) });
  return loc;
}

/** Pixel resolution matching a wall's aspect ratio (long side = `long`, even numbers). */
export function wallPixels(w: number, h: number, long = 1920): [number, number] {
  const even = (n: number) => Math.max(64, Math.round(n / 2) * 2);
  if (w >= h) return [even(long), even((long * h) / Math.max(w, 0.01))];
  return [even((long * w) / Math.max(h, 0.01)), even(long)];
}

/** Keeps a stored resolution if it fits the wall, otherwise derives one from the size. */
export function fitPixels(px: [number, number] | undefined, w: number, h: number): [number, number] {
  if (px && Math.abs(px[0] / px[1] - w / h) / (w / h) < 0.03) return px;
  return wallPixels(w, h, px ? Math.max(px[0], px[1]) : 1920);
}

export type ArrangeMode = 'stack' | 'row';

/**
 * Lays out walls inside one output with the same pixel density for all of them
 * (like an LED processor): stacked top to bottom, or side by side.
 */
export function arrangeOutput(out: OutputSpec, walls: LocObject[], mode: ArrangeMode) {
  const [W, H] = out.pixels;
  if (!walls.length) return;
  const sumH = walls.reduce((n, w) => n + w.size[1], 0);
  const sumW = walls.reduce((n, w) => n + w.size[0], 0);
  const maxW = Math.max(...walls.map((w) => w.size[0]));
  const maxH = Math.max(...walls.map((w) => w.size[1]));
  // pixels per metre
  const p = mode === 'stack' ? Math.min(W / maxW, H / sumH) : Math.min(W / sumW, H / maxH);
  // Order by position in the room, as seen on the walls themselves: the image's "up"
  // and "right" directions of the first wall decide which wall gets the top / left part.
  const up = rotateXYZ([0, 1, 0], walls[0].rot);
  const right = rotateXYZ([1, 0, 0], walls[0].rot);
  const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const ordered = [...walls].sort((a, b) => (mode === 'stack' ? dot(b.pos, up) - dot(a.pos, up) : dot(a.pos, right) - dot(b.pos, right)));
  let x = 0;
  let y = 0;
  for (const w of ordered) {
    const pw = Math.max(1, Math.round(w.size[0] * p));
    const ph = Math.max(1, Math.round(w.size[1] * p));
    w.output = { id: out.id, rect: [x, y, pw, ph] };
    if (mode === 'stack') y += ph;
    else x += pw;
  }
}

/**
 * Points along an object: for round objects (arc / curved truss) along the ellipse,
 * `inset` metres inside the outer edge; for straight ones along the local x axis
 * (0.6 m away from both ends). World coordinates, height = object position.
 */
export function spreadPoints(o: LocObject, n: number, inset = 0): V3[] {
  const pts: V3[] = [];
  if (n < 1) return pts;
  if (o.arc) {
    const A = (Math.min(360, Math.max(1, o.arc.angle)) * Math.PI) / 180;
    const full = A >= Math.PI * 2 - 1e-3;
    const a = Math.max(0.05, o.size[0] / 2 - inset);
    const b = Math.max(0.05, o.size[2] / 2 - inset);
    for (let i = 0; i < n; i++) {
      const phi = full ? (Math.PI * 2 * i) / n : n > 1 ? -A / 2 + (A * i) / (n - 1) : 0;
      pts.push(add3(o.pos, rotateXYZ([a * Math.sin(phi), 0, b * Math.cos(phi)], o.rot)));
    }
    return pts;
  }
  const len = o.size[0];
  for (let i = 0; i < n; i++) {
    const x = n > 1 ? -len / 2 + 0.6 + ((len - 1.2) * i) / (n - 1) : 0;
    pts.push(add3(o.pos, rotateXYZ([x, 0, 0], o.rot)));
  }
  return pts;
}

const add3 = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Rotates v by Euler angles in degrees, order XYZ (same as three.js). */
export function rotateXYZ(v: V3, rotDeg: V3): V3 {
  const [ax, ay, az] = rotDeg.map((d) => (d * Math.PI) / 180);
  let [x, y, z] = v;
  // Rz
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  // Ry
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  // Rx
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  return [x, y, z];
}
