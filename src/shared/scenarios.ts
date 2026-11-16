// The three ready-made scenarios. Everything is described as data here; the
// renderer builds geometry from it (src/render/venue.ts), the rig builder takes
// the fixture positions (src/shared/demo-rig.ts).

import type { Mount } from './demo-rig.ts';
import type { LocObject } from './location.ts';

export type ScenarioId = 'club' | 'disco' | 'festival';

export interface WallSpec {
  name: string;
  /** Size in metres. */
  width: number;
  height: number;
  /** Centre position. */
  pos: [number, number, number];
  /** Rotation around Y in degrees (0 = facing +Z, the audience). */
  rotY: number;
  /** Pixel resolution of the virtual monitor for this wall. */
  pixels: [number, number];
  /** Full rotation in degrees (e.g. LED strips on the ceiling facing down). Overrides rotY. */
  rot?: [number, number, number];
  /** Part of a shared output (one HDMI feeding several walls): output id + pixel rect x, y, w, h. */
  output?: string;
  rect?: [number, number, number, number];
}

/** One video output (e.g. one HDMI port of an LED processor) feeding one or more walls. */
export interface OutputSpec {
  id: string;
  name: string;
  pixels: [number, number];
  /** How walls are laid out in the output (builder). */
  arrange?: 'stack' | 'row';
}

export interface Place {
  pos: [number, number, number];
  mount: Mount;
  group: string;
  /** Rotation around the vertical axis in degrees (0 = beams swing towards the audience). */
  yaw?: number;
  /** Own locations: fixture type, mode and an optional fixed patch per lamp. */
  fixtureId?: string;
  mode?: number;
  universe?: number;
  address?: number;
}

export interface Scenario {
  id: ScenarioId | 'custom';
  /** Built from an own location (.vdloc). */
  custom?: boolean;
  outdoor?: boolean;
  /** Furniture / room objects of an own location. */
  objects?: LocObject[];
  /** Crowd areas of an own location. */
  crowdAreas?: { x: number; z: number; w: number; d: number; rot: number; count: number }[];
  /** Shared video outputs of an own location. */
  outputs?: OutputSpec[];
  /** Indoor room size (width × depth × height) or open air. */
  room: { width: number; depth: number; height: number; backZ: number } | null;
  /** Open-air ground size (festival). */
  ground?: { width: number; depth: number };
  stage: { width: number; depth: number; height: number; z: number; roof?: number };
  booth: { z: number; y: number };
  walls: WallSpec[];
  crowd: { count: number; xMin: number; xMax: number; zMin: number; zMax: number };
  fixtures: Place[];
  cameras: Record<string, [[number, number, number], [number, number, number]]>;
}

function row(n: number, x0: number, x1: number, y: number, z: number, mount: Mount, group: string): Place[] {
  return Array.from({ length: n }, (_, i) => ({
    pos: [x0 + ((x1 - x0) * i) / Math.max(1, n - 1), y, z] as [number, number, number],
    mount,
    group,
  }));
}

function column(n: number, x: number, y: number, z0: number, z1: number, mount: Mount, group: string): Place[] {
  return Array.from({ length: n }, (_, i) => ({
    pos: [x, y, z0 + ((z1 - z0) * i) / Math.max(1, n - 1)] as [number, number, number],
    mount,
    group,
  }));
}

// --------------------------------------------------------------------- club

const club: Scenario = {
  id: 'club',
  room: { width: 24, depth: 16, height: 7.5, backZ: -8 },
  stage: { width: 7, depth: 3.2, height: 0.45, z: -6.3 },
  booth: { z: -5.2, y: 0.45 },
  walls: [{ name: 'Wall 1', width: 8, height: 4.5, pos: [0, 3.4, -7.85], rotY: 0, pixels: [1920, 1080] }],
  crowd: { count: 170, xMin: -6.6, xMax: 6.4, zMin: -3.6, zMax: 6.5 },
  fixtures: [
    ...row(12, -8.25, 8.25, 6.2, 2, 'hang', 'Front-Truss'),
    ...row(12, -8.25, 8.25, 6.2, -2.5, 'hang', 'Mid-Truss'),
    ...row(10, -6.75, 6.75, 6.4, -6.8, 'hang', 'Back-Truss'),
    ...row(4, -7.6, -4.6, 0.05, -7.3, 'floor', 'Floor links'),
    ...row(4, 4.6, 7.6, 0.05, -7.3, 'floor', 'Floor rechts'),
    ...column(4, -11.2, 5, -4, 3.5, 'hang', 'Side links'),
    ...column(4, 11.2, 5, -4, 3.5, 'hang', 'Side rechts'),
  ],
  cameras: {
    audience: [[0, 2.9, 7.6], [0, 3.1, -6]],
    dj: [[0, 2.3, -5.9], [0, 2.4, 6]],
    wide: [[13, 8.5, 12], [0, 2, -2.5]],
    side: [[-1.2, 3.1, 7.6], [-11, 1.7, 0.4]],
  },
};

// -------------------------------------------------------------------- disco

const disco: Scenario = {
  id: 'disco',
  room: { width: 40, depth: 30, height: 10, backZ: -15 },
  stage: { width: 12, depth: 5, height: 0.8, z: -12.3 },
  booth: { z: -11, y: 0.8 },
  walls: [
    { name: 'Wall 1 (Mitte)', width: 12, height: 6.75, pos: [0, 5, -14.85], rotY: 0, pixels: [1920, 1080] },
    { name: 'Wall 2 (links)', width: 7, height: 4, pos: [-19.85, 5, -5], rotY: 90, pixels: [1920, 1080] },
    { name: 'Wall 3 (rechts)', width: 7, height: 4, pos: [19.85, 5, -5], rotY: -90, pixels: [1920, 1080] },
  ],
  crowd: { count: 700, xMin: -17, xMax: 17, zMin: -8.5, zMax: 12 },
  fixtures: [
    ...row(16, -15, 15, 8.6, 6, 'hang', 'Truss 1 (hinten im Raum)'),
    ...row(16, -15, 15, 8.6, 0, 'hang', 'Truss 2 (Mitte)'),
    ...row(16, -15, 15, 8.6, -6, 'hang', 'Truss 3 (vorne)'),
    ...row(14, -13, 13, 9, -13.6, 'hang', 'Bühnen-Truss'),
    ...row(6, -14, -7, 0.85, -13.6, 'floor', 'Bühne links'),
    ...row(6, 7, 14, 0.85, -13.6, 'floor', 'Bühne rechts'),
    ...column(6, -19, 7.5, -12, 10, 'hang', 'Side links'),
    ...column(6, 19, 7.5, -12, 10, 'hang', 'Side rechts'),
  ],
  cameras: {
    audience: [[0, 3.4, 13.5], [0, 4.6, -12]],
    dj: [[0, 2.9, -11.6], [0, 3, 10]],
    wide: [[22, 13, 19], [0, 2.5, -4]],
    side: [[-17, 4, 9], [4, 4, -9]],
  },
};

// ----------------------------------------------------------------- festival

const festival: Scenario = {
  id: 'festival',
  room: null,
  ground: { width: 160, depth: 140 },
  stage: { width: 26, depth: 14, height: 1.8, z: -14, roof: 14 },
  booth: { z: -10, y: 1.8 },
  walls: [
    { name: 'Wall 1 (Bühne)', width: 16, height: 9, pos: [0, 7.3, -20.6], rotY: 0, pixels: [1920, 1080] },
    { name: 'Wall 2 (IMAG links)', width: 8, height: 4.5, pos: [-19, 8, -8.5], rotY: 12, pixels: [1920, 1080] },
    { name: 'Wall 3 (IMAG rechts)', width: 8, height: 4.5, pos: [19, 8, -8.5], rotY: -12, pixels: [1920, 1080] },
  ],
  crowd: { count: 1600, xMin: -30, xMax: 30, zMin: -4, zMax: 40 },
  fixtures: [
    ...row(14, -11.5, 11.5, 13.3, -8, 'hang', 'Dach-Truss vorne'),
    ...row(14, -11.5, 11.5, 13.3, -13, 'hang', 'Dach-Truss Mitte'),
    ...row(12, -10, 10, 13.3, -18.5, 'hang', 'Dach-Truss hinten'),
    ...row(10, -12, 12, 1.85, -19.5, 'floor', 'Bühnenboden'),
    ...column(5, -13.5, 11.5, -19, -9, 'hang', 'Tower links'),
    ...column(5, 13.5, 11.5, -19, -9, 'hang', 'Tower rechts'),
    ...row(4, -10, 10, 8, 18, 'hang', 'Delay-Tower').map((p) => ({ ...p, yaw: 180 })),
  ],
  cameras: {
    audience: [[0, 4.2, 26], [0, 7, -14]],
    dj: [[0, 3.6, -9.6], [0, 4, 25]],
    wide: [[40, 24, 45], [0, 5, -6]],
    side: [[-30, 6, 12], [4, 6, -12]],
  },
};

export const SCENARIOS: Record<ScenarioId, Scenario> = { club, disco, festival };
export const SCENARIO_IDS: ScenarioId[] = ['club', 'disco', 'festival'];
