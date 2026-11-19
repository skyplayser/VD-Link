// Club scan from VD VR (github.com/skyplayser/VD-VR, scripts/scan.gd) → an editable location.
// Version 4 – the club studio (drawn by hand in the headset): storeys, straight and curved walls,
// doors/windows/passages, furniture and VD-Link materials → studioToLocation() below.
// Recognised and corrected in the headset (version 3: rooms with walls, doors, objects; version 2:
// one room): the walls run along the axes, the side you looked at first in the first room becomes
// the back wall; every wall becomes a wall object (doors split it and leave a lintel above), the
// room box sits a little outside around everything, objects keep their kind (bar, table, DJ booth,
// stage, pillar, block, sofa). Further rooms are joined at their passages (doors with the same
// `link`): turned and moved so both doors lie on top of each other, the rooms on either side.
// Rooms without a passage stand next to each other, to be moved in the builder.
// Only what the headset found by itself (planes: walls, floor, ceiling, tables) – then:
//   - the walls are turned so they run along the axes (the strongest wall direction), the side
//     you looked at when the scan started becomes the back wall (stage side, −z)
//   - room = the outline of the walls, height = ceiling (or the highest wall)
//   - walls on the left, right and back edge are the room's own walls; every other wall
//     (front, niches, corners of an L-shaped room) becomes a wall object
//   - long horizontal surfaces become a bar, small ones a table, others a block

import { newId, newLocation, type LocationData, type LocObject, type MatPreset, type V3 } from './location.ts';

export interface ScanPlane {
  label: 'wall' | 'floor' | 'ceiling' | 'table' | 'other' | string;
  normal: V3;
  points: V3[];
  size?: [number, number];
}

export interface ScanWall {
  a: [number, number];
  b: [number, number];
  /** Base height (tracking space) and height – walls of galleries and upper floors. */
  y0?: number;
  h?: number;
}

export interface ScanDoor {
  wall: number;
  /** Centre along the wall, 0…1. */
  t: number;
  w: number;
  h: number;
  /** Passage: the door with the same number in another room is the same opening. */
  link?: number;
  /** Base height of the door (tracking space). */
  y?: number;
}

export interface ScanObject {
  type: string;
  c: [number, number];
  w: number;
  d: number;
  /** Direction of the object's width (radians, x/z plane). */
  angle: number;
  /** Height; 0 = up to the ceiling. Stairs: the rise. */
  h: number;
  /** Base height (tracking space). */
  y?: number;
}

export interface ScanRoom {
  name?: string;
  floor_y?: number;
  forward?: [number, number];
  height?: number;
  grid?: number;
  walls?: ScanWall[];
  doors?: ScanDoor[];
  objects?: ScanObject[];
  planes?: ScanPlane[];
}

export interface ScanData {
  format: 'vd-vr-scan';
  version: 1 | 2 | 3;
  rooms?: ScanRoom[];
  height?: number;
  grid?: number;
  walls?: ScanWall[];
  doors?: ScanDoor[];
  objects?: ScanObject[];
  name: string;
  created: number;
  device: string;
  forward?: [number, number];
  planes?: ScanPlane[];
}

export function isScan(x: unknown): x is ScanData {
  const s = x as ScanData;
  return !!s && s.format === 'vd-vr-scan' && (Array.isArray(s.planes) || Array.isArray(s.rooms));
}

/** Materials the scan suggests per kind of surface (changeable in the builder). */
export const SCAN_MATERIALS: Record<string, MatPreset> = { wall: 'darkgrey', table: 'wood', bar: 'black', other: 'grey' };

const WALL_THICK = 0.15;
const EDGE = 0.35;

interface Seg {
  a: [number, number];
  b: [number, number];
  y0: number;
  y1: number;
}

export function scanToLocation(scan: ScanData, name = scan.name): LocationData {
  if ((scan.version ?? 0) >= 4) return studioToLocation(scan as unknown as StudioScan, name);
  const rooms = (scan.rooms ?? []).filter((r) => r.walls?.length || r.objects?.length);
  if (rooms.length) return roomsToLocation(rooms, name);
  if (scan.walls?.length || scan.objects?.length) return roomsToLocation([scan], name);
  const planes = (scan.planes ?? []).filter((p) => Array.isArray(p.points) && p.points.length >= 3 && p.points.every((q) => q.length === 3 && q.every(Number.isFinite)));
  const isWall = (p: ScanPlane) => p.label === 'wall' || (Math.abs(p.normal[1]) < 0.3 && p.label !== 'floor' && p.label !== 'ceiling');
  const walls = planes.filter(isWall);
  const flats = planes.filter((p) => !isWall(p));

  // Floor height: the floor plane, else the lowest wall edge.
  const ys = (p: ScanPlane) => p.points.map((q) => q[1]);
  const floorP = flats.filter((p) => p.label === 'floor');
  const floorY = floorP.length ? Math.min(...floorP.map((p) => avg(ys(p)))) : walls.length ? Math.min(...walls.flatMap(ys)) : 0;

  // Strongest wall direction (mod 90°, weighted by length) → that becomes the x axis.
  let sx = 0;
  let sy = 0;
  for (const w of walls) {
    const s = wallSeg(w);
    const dx = s.b[0] - s.a[0];
    const dz = s.b[1] - s.a[1];
    const len = Math.hypot(dx, dz);
    const ang = Math.atan2(dz, dx) * 4; // 90° symmetry
    sx += Math.cos(ang) * len;
    sy += Math.sin(ang) * len;
  }
  let turn = walls.length ? -Math.atan2(sy, sx) / 4 : 0;
  // Quarter turns: what you looked at becomes −z.
  const fwd = scan.forward ?? [0, -1];
  let best = -Infinity;
  let bestTurn = turn;
  for (let k = 0; k < 4; k++) {
    const t = turn + (k * Math.PI) / 2;
    const [, fz] = rot2(fwd, t);
    if (-fz > best) {
      best = -fz;
      bestTurn = t;
    }
  }
  turn = bestTurn;

  // Everything into the turned frame (x, z), heights relative to the floor.
  const segs: Seg[] = walls.map((w) => {
    const s = wallSeg(w);
    return { a: rot2(s.a, turn), b: rot2(s.b, turn), y0: Math.max(0, s.y0 - floorY), y1: s.y1 - floorY };
  });
  const flatPts = flats.map((p) => ({ p, pts: p.points.map((q) => rot2([q[0], q[2]], turn)), y: avg(ys(p)) - floorY }));
  const outline = segs.length ? segs.flatMap((s) => [s.a, s.b]) : flatPts.filter((f) => f.p.label === 'floor').flatMap((f) => f.pts);
  if (!outline.length) return newLocation(name, 'indoor');
  const minX = Math.min(...outline.map((q) => q[0]));
  const maxX = Math.max(...outline.map((q) => q[0]));
  const minZ = Math.min(...outline.map((q) => q[1]));
  const maxZ = Math.max(...outline.map((q) => q[1]));
  const cx = (minX + maxX) / 2;
  const cz = (minZ + maxZ) / 2;
  const W = round(maxX - minX);
  const D = round(maxZ - minZ);
  const ceil = flatPts.filter((f) => f.p.label === 'ceiling');
  const H = round(ceil.length ? Math.max(...ceil.map((f) => f.y)) : segs.length ? Math.max(...segs.map((s) => s.y1)) : 4);

  const loc = newLocation(name, 'indoor');
  loc.room = { width: Math.max(2, W), depth: Math.max(2, D), height: Math.max(2, H) };
  const objects: LocObject[] = [];
  let nWall = 0;
  for (const s of segs) {
    const a: [number, number] = [s.a[0] - cx, s.a[1] - cz];
    const b: [number, number] = [s.b[0] - cx, s.b[1] - cz];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len < 0.3) continue;
    // Left, right and back edge: the room box draws those walls itself.
    const onX = (x: number) => Math.abs(a[0] - x) < EDGE && Math.abs(b[0] - x) < EDGE;
    if (onX(-W / 2) || onX(W / 2) || (Math.abs(a[1] + D / 2) < EDGE && Math.abs(b[1] + D / 2) < EDGE)) continue;
    const yaw = Math.atan2(-(b[1] - a[1]), b[0] - a[0]);
    const h = Math.max(0.3, s.y1 - s.y0);
    objects.push({
      id: newId(),
      type: 'wall',
      name: `Wand ${++nWall}`,
      pos: [round((a[0] + b[0]) / 2), round(s.y0), round((a[1] + b[1]) / 2)],
      rot: [0, round((yaw * 180) / Math.PI, 1), 0],
      size: [round(len), round(h), WALL_THICK],
      material: SCAN_MATERIALS.wall,
      group: 'Scan',
    });
  }
  let nTable = 0;
  let nBar = 0;
  let nBox = 0;
  for (const f of flatPts) {
    if (f.p.label === 'floor' || f.p.label === 'ceiling') continue;
    if (f.y < 0.15 || f.y > H - 0.2) continue;
    const xs = f.pts.map((q) => q[0] - cx);
    const zs = f.pts.map((q) => q[1] - cz);
    const w = Math.max(...xs) - Math.min(...xs);
    const d = Math.max(...zs) - Math.min(...zs);
    if (w < 0.2 || d < 0.2) continue;
    const long = Math.max(w, d) >= 2 || Math.max(w, d) / Math.min(w, d) > 2.5;
    const kind = f.p.label === 'table' ? (long ? 'bar' : 'table') : 'box';
    // Bars run along x in the builder; turn long ones that run along z.
    const alongZ = kind === 'bar' && d > w;
    objects.push({
      id: newId(),
      type: kind,
      name: kind === 'bar' ? `Tresen ${++nBar}` : kind === 'table' ? `Tisch ${++nTable}` : `Block ${++nBox}`,
      pos: [round((Math.max(...xs) + Math.min(...xs)) / 2), 0, round((Math.max(...zs) + Math.min(...zs)) / 2)],
      rot: [0, alongZ ? 90 : 0, 0],
      size: kind === 'table' ? [round(Math.max(w, d)), round(f.y), round(Math.max(w, d))] : [round(alongZ ? d : w), round(f.y), round(alongZ ? w : d)],
      material: SCAN_MATERIALS[kind === 'box' ? 'other' : kind],
      group: 'Scan',
    });
  }
  loc.objects = objects;
  return loc;
}

const OBJ_TYPES: Record<string, { type: LocObject['type']; name: string; mat: MatPreset; round?: boolean }> = {
  bar: { type: 'bar', name: 'Tresen', mat: 'black' },
  table: { type: 'table', name: 'Tisch', mat: 'wood', round: true },
  djbooth: { type: 'djbooth', name: 'DJ-Pult', mat: 'black' },
  stage: { type: 'stage', name: 'Podest', mat: 'black' },
  stairs: { type: 'stairs', name: 'Treppe', mat: 'concrete' },
  level: { type: 'box', name: 'Ebene', mat: 'concrete' },
  pillar: { type: 'pillar', name: 'Säule', mat: 'concrete' },
  box: { type: 'box', name: 'Block', mat: 'grey' },
  sofa: { type: 'sofa', name: 'Sofa', mat: 'velvet-violet', round: true },
};
/** Room box around the drawn walls – behind a door you see its wall, not the void. */
const MARGIN = 0.6;

type P2 = [number, number];
interface RoomGeo {
  segs: { a: P2; b: P2; y0: number; h: number; gaps: { t0: number; t1: number; h: number; link?: number; y: number }[] }[];
  boxes: { o: ScanObject; c: P2; ang: number; y: number }[];
  H: number;
  /** Height offset of the whole room (joined one storey up or down). */
  dy: number;
}

/** One room in its own frame: walls straight along the axes (the first room also turned so its first view is −z). */
function roomGeo(r: ScanRoom, first: boolean): RoomGeo {
  const walls = (r.walls ?? []).filter((w) => [...w.a, ...w.b].every(Number.isFinite));
  const objs = (r.objects ?? []).filter((o) => [...o.c, o.w, o.d, o.angle].every(Number.isFinite));
  const H = Math.max(2, Math.min(30, r.height ?? 4));
  const grid = Number.isFinite(r.grid) ? (r.grid as number) : 0;
  let turn = -grid;
  if (first) {
    const fwd = r.forward ?? [0, -1];
    let best = -Infinity;
    for (let k = 0; k < 4; k++) {
      const t = -grid + (k * Math.PI) / 2;
      const fz = rot2(fwd, t)[1];
      if (-fz > best) {
        best = -fz;
        turn = t;
      }
    }
  }
  // Heights relative to this room's floor.
  const fy = Number.isFinite(r.floor_y) ? (r.floor_y as number) : 0;
  const segs = walls.map((w, i) => {
    const len = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]) || 1;
    const y0 = Number.isFinite(w.y0) ? Math.max(0, (w.y0 as number) - fy) : 0;
    const h = Number.isFinite(w.h) && (w.h as number) > 0.05 ? (w.h as number) : H;
    const gaps = (r.doors ?? [])
      .filter((d) => d.wall === i)
      .map((d) => ({ t0: Math.max(0, d.t - d.w / 2 / len), t1: Math.min(1, d.t + d.w / 2 / len), h: Math.min(h, d.h || 2.1), link: d.link, y: y0 }))
      .sort((x, y) => x.t0 - y.t0);
    return { a: rot2(w.a, turn), b: rot2(w.b, turn), y0, h, gaps };
  });
  const boxes = objs.map((o) => ({ o, c: rot2(o.c, turn), ang: o.angle + turn, y: Number.isFinite(o.y) ? Math.max(0, (o.y as number) - fy) : 0 }));
  const top = Math.max(H, ...segs.map((s) => s.y0 + s.h));
  return { segs, boxes, H: top, dy: 0 };
}

/** Moves a room: p → rot(p − from, θ) + to. */
function moveRoom(g: RoomGeo, from: P2, theta: number, to: P2) {
  const f = (p: P2): P2 => {
    const q = rot2([p[0] - from[0], p[1] - from[1]], theta);
    return [q[0] + to[0], q[1] + to[1]];
  };
  for (const s of g.segs) {
    s.a = f(s.a);
    s.b = f(s.b);
  }
  for (const b of g.boxes) {
    b.c = f(b.c);
    b.ang += theta;
  }
}

const centroid = (g: RoomGeo): P2 => {
  const pts = g.segs.flatMap((s) => [s.a, s.b]);
  if (!pts.length) return g.boxes[0]?.c ?? [0, 0];
  return [avg(pts.map((p) => p[0])), avg(pts.map((p) => p[1]))];
};

/** Passage `link` of a room: door centre and wall direction. */
function passage(g: RoomGeo, link: number): { p: P2; d: P2; y: number } | null {
  for (const s of g.segs) {
    for (const gap of s.gaps) {
      if (gap.link !== link) continue;
      const t = (gap.t0 + gap.t1) / 2;
      const len = Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) || 1;
      return { p: [s.a[0] + (s.b[0] - s.a[0]) * t, s.a[1] + (s.b[1] - s.a[1]) * t], d: [(s.b[0] - s.a[0]) / len, (s.b[1] - s.a[1]) / len], y: gap.y + g.dy };
    }
  }
  return null;
}

const cross = (d: P2, v: P2) => d[0] * v[1] - d[1] * v[0];

/** Rooms recognised and corrected in the headset → one location. */
function roomsToLocation(rooms: ScanRoom[], name: string): LocationData {
  const geos = rooms.map((r, i) => roomGeo(r, i === 0));
  const placed = new Set<number>([0]);
  // Join rooms at their passages: the new room's door onto the placed room's door, rooms on opposite sides.
  for (let guard = 0; guard < geos.length; guard++) {
    for (let k = 0; k < geos.length; k++) {
      if (placed.has(k)) continue;
      const links = geos[k].segs.flatMap((s) => s.gaps.map((g) => g.link)).filter((l): l is number => l != null);
      for (const l of links) {
        const j = [...placed].find((x) => passage(geos[x], l));
        if (j == null) continue;
        const A = passage(geos[j], l)!;
        const B = passage(geos[k], l)!;
        const cA = centroid(geos[j]);
        let theta = Math.atan2(A.d[1], A.d[0]) - Math.atan2(B.d[1], B.d[0]);
        const cB = rot2([centroid(geos[k])[0] - B.p[0], centroid(geos[k])[1] - B.p[1]], theta);
        if (Math.sign(cross(A.d, cB)) === Math.sign(cross(A.d, [cA[0] - A.p[0], cA[1] - A.p[1]]))) theta += Math.PI;
        moveRoom(geos[k], B.p, theta, A.p);
        // One storey up or down: both door sills at the same height.
        geos[k].dy = A.y - B.y;
        placed.add(k);
        break;
      }
    }
  }
  // Rooms without a passage: next to the others, to be moved in the builder.
  for (let k = 1; k < geos.length; k++) {
    if (placed.has(k)) continue;
    const others = [...placed].flatMap((x) => geos[x].segs.flatMap((s) => [s.a, s.b]));
    const mine = geos[k].segs.flatMap((s) => [s.a, s.b]);
    const right = others.length ? Math.max(...others.map((p) => p[0])) : 0;
    const left = mine.length ? Math.min(...mine.map((p) => p[0])) : 0;
    moveRoom(geos[k], [0, 0], 0, [right - left + 2, 0]);
    placed.add(k);
  }

  const pts = geos.flatMap((g) => [...g.segs.flatMap((s) => [s.a, s.b]), ...g.boxes.map((b) => b.c)]);
  if (!pts.length) return newLocation(name, 'indoor');
  const minX = Math.min(...pts.map((q) => q[0]));
  const maxX = Math.max(...pts.map((q) => q[0]));
  const minZ = Math.min(...pts.map((q) => q[1]));
  const maxZ = Math.max(...pts.map((q) => q[1]));
  const cx = (minX + maxX) / 2;
  const cz = (minZ + maxZ) / 2;
  // Rooms below the first one (cellar): everything goes up so nothing is under the floor.
  const low = Math.min(0, ...geos.map((g) => g.dy));
  for (const g of geos) g.dy -= low;
  const H = Math.max(...geos.map((g) => g.H + g.dy));
  const loc = newLocation(name, 'indoor');
  loc.room = { width: round(maxX - minX + 2 * MARGIN), depth: round(maxZ - minZ + 2 * MARGIN), height: round(H) };
  const objects: LocObject[] = [];
  const many = geos.length > 1;
  const wallObj = (a: P2, b: P2, y0: number, h: number, label: string) => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len < 0.05 || h < 0.05) return;
    objects.push({
      id: newId(),
      type: 'wall',
      name: label,
      pos: [round((a[0] + b[0]) / 2 - cx), round(y0), round((a[1] + b[1]) / 2 - cz)],
      rot: [0, round((Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180) / Math.PI, 1), 0],
      size: [round(len), round(h), WALL_THICK],
      material: SCAN_MATERIALS.wall,
      group: 'Scan',
    });
  };
  geos.forEach((g, r) => {
    const pre = many ? `Raum ${r + 1} · ` : '';
    let nDoor = 0;
    g.segs.forEach((s, i) => {
      const at = (t: number): P2 => [s.a[0] + (s.b[0] - s.a[0]) * t, s.a[1] + (s.b[1] - s.a[1]) * t];
      let t = 0;
      let part = 0;
      const n = s.gaps.length;
      const y0 = s.y0 + g.dy;
      for (const gap of s.gaps) {
        if (gap.t0 > t) wallObj(at(t), at(gap.t0), y0, s.h, `${pre}Wand ${i + 1}${n ? '.' + ++part : ''}`);
        wallObj(at(gap.t0), at(gap.t1), y0 + gap.h, s.h - gap.h, `${pre}${gap.link != null ? `Durchgang ${gap.link}` : `Tür ${++nDoor}`} · Sturz`);
        t = Math.max(t, gap.t1);
      }
      if (t < 1) wallObj(at(t), s.b, y0, s.h, `${pre}Wand ${i + 1}${n ? '.' + ++part : ''}`);
    });
    const count: Record<string, number> = {};
    for (const b of g.boxes) {
      const k = OBJ_TYPES[b.o.type] ?? OBJ_TYPES.box;
      count[k.name] = (count[k.name] ?? 0) + 1;
      const h = b.o.h > 0 ? Math.min(b.o.h, g.H) : g.H - b.y;
      const big = Math.max(b.o.w, b.o.d);
      objects.push({
        id: newId(),
        type: k.type,
        name: `${pre}${k.name} ${count[k.name]}`,
        pos: [round(b.c[0] - cx), round(b.y + g.dy), round(b.c[1] - cz)],
        rot: [0, round((-b.ang * 180) / Math.PI, 1), 0],
        size: k.round ? [round(big), round(h), round(big)] : [round(b.o.w), round(h), round(b.o.d)],
        material: k.mat,
        group: 'Scan',
      });
    }
  });
  loc.objects = objects;
  return loc;
}

/** A wall plane as a floor segment (ends along its width) and its height span. */
function wallSeg(p: ScanPlane): Seg {
  const n: [number, number] = [p.normal[0], p.normal[2]];
  const nl = Math.hypot(n[0], n[1]) || 1;
  const dir: [number, number] = [-n[1] / nl, n[0] / nl];
  let lo = Infinity;
  let hi = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  let off = 0;
  for (const q of p.points) {
    const t = q[0] * dir[0] + q[2] * dir[1];
    lo = Math.min(lo, t);
    hi = Math.max(hi, t);
    y0 = Math.min(y0, q[1]);
    y1 = Math.max(y1, q[1]);
    off += (q[0] * n[0] + q[2] * n[1]) / nl;
  }
  off /= p.points.length;
  const base: [number, number] = [(n[0] / nl) * off, (n[1] / nl) * off];
  return { a: [base[0] + dir[0] * lo, base[1] + dir[1] * lo], b: [base[0] + dir[0] * hi, base[1] + dir[1] * hi], y0, y1 };
}

function rot2(p: [number, number], a: number): [number, number] {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
}

const avg = (v: number[]) => v.reduce((a, b) => a + b, 0) / Math.max(1, v.length);
const round = (v: number, step = 0.01) => Number((Math.round(v / step) * step).toFixed(3));


// ================================================================== version 4: club studio

interface StudioLevel {
  name: string;
  y: number;
  height: number;
  floor?: string;
  ceiling?: string;
}
interface StudioWall {
  level: number;
  a: P2;
  b: P2;
  via?: P2;
  h?: number;
  mat?: string;
  /** "railing": railing / parapet (thin, usually glass). */
  kind?: string;
}
interface StudioOpening {
  wall: number;
  t: number;
  w: number;
  h: number;
  sill: number;
  kind: string;
  link?: number;
}
interface StudioObject {
  level: number;
  type: string;
  c: P2;
  w: number;
  d: number;
  h: number;
  angle: number;
  mat?: string;
  /** Bottom above the storey's floor (on a platform; galleries: −h). */
  base?: number;
  /** Empore (type "slab"): outline around c in the frame of angle. */
  pts?: P2[];
}
interface StudioRoom {
  name?: string;
  /** Same number = drawn in the same coordinates (the Pico did not recentre in between). */
  frame?: number;
  forward?: P2;
  grid?: number;
  levels?: StudioLevel[];
  walls?: StudioWall[];
  openings?: StudioOpening[];
  objects?: StudioObject[];
}
interface StudioScan {
  version: number;
  name: string;
  rooms?: StudioRoom[];
}

const MATS = new Set<MatPreset>(['black', 'darkgrey', 'grey', 'white', 'marble', 'velvet-petrol', 'velvet-violet', 'metal', 'wood', 'glass', 'concrete', 'grass', 'led']);
const matOf = (m: string | undefined, fallback: MatPreset): MatPreset => (m && MATS.has(m as MatPreset) ? (m as MatPreset) : fallback);

const STUDIO_TYPES: Record<string, { type: LocObject['type']; name: string; mat: MatPreset; round?: boolean }> = {
  bar: { type: 'bar', name: 'Tresen', mat: 'black' },
  table: { type: 'table', name: 'Tisch', mat: 'wood', round: true },
  hightable: { type: 'table', name: 'Stehtisch', mat: 'wood', round: true },
  sofa: { type: 'sofa', name: 'Sofa', mat: 'velvet-violet', round: true },
  djbooth: { type: 'djbooth', name: 'DJ-Pult', mat: 'black' },
  stage: { type: 'stage', name: 'Bühne', mat: 'black' },
  podest: { type: 'stage', name: 'Podest', mat: 'concrete' },
  pillar: { type: 'pillar', name: 'Säule', mat: 'concrete' },
  stairs: { type: 'stairs', name: 'Treppe', mat: 'concrete' },
  box: { type: 'box', name: 'Block', mat: 'grey' },
  speaker: { type: 'box', name: 'Lautsprecher', mat: 'black' },
  ledwall: { type: 'videowall', name: 'LED-Wand', mat: 'led' },
  level: { type: 'box', name: 'Galerie', mat: 'concrete' },
  slab: { type: 'slab', name: 'Empore', mat: 'concrete' },
};
const RAILING_THICK = 0.05;
const OPENING_NAMES: Record<string, string> = { door: 'Tür', double: 'Doppeltür', gate: 'Tor', passage: 'Durchgang', window: 'Fenster', band: 'Fensterband' };

/** Centre and radius of the circle through three points (null if they lie on a line). */
function circle3(a: P2, b: P2, c: P2): { c: P2; r: number } | null {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-6) return null;
  const sq = (p: P2) => p[0] * p[0] + p[1] * p[1];
  const ux = (sq(a) * (b[1] - c[1]) + sq(b) * (c[1] - a[1]) + sq(c) * (a[1] - b[1])) / d;
  const uy = (sq(a) * (c[0] - b[0]) + sq(b) * (a[0] - c[0]) + sq(c) * (b[0] - a[0])) / d;
  return { c: [ux, uy], r: Math.hypot(a[0] - ux, a[1] - uy) };
}

interface StudioGeo {
  walls: { a: P2; b: P2; via?: P2; y: number; h: number; mat: MatPreset; railing: boolean; gaps: { t0: number; t1: number; sill: number; top: number; kind: string; link?: number }[] }[];
  objects: { o: StudioObject; c: P2; ang: number; y: number; poly?: P2[] }[];
  slabs: { pts: P2[]; y: number; h: number; mat: MatPreset; name: string }[];
  H: number;
  dy: number;
}

/** Turn of a set of rooms in one frame: its drawing grid along the axes; the very first also so that its first view is −z. */
function studioTurn(r: StudioRoom, first: boolean): number {
  const grid = Number.isFinite(r.grid) ? (r.grid as number) : 0;
  let turn = -grid;
  if (first) {
    const fwd = r.forward ?? [0, -1];
    let best = -Infinity;
    for (let k = 0; k < 4; k++) {
      const t = -grid + (k * Math.PI) / 2;
      const fz = rot2(fwd, t)[1];
      if (-fz > best) {
        best = -fz;
        turn = t;
      }
    }
  }
  return turn;
}

function studioRoomGeo(r: StudioRoom, turn: number, base: number, roomNo: string): StudioGeo {
  const levels = (r.levels ?? []).length ? (r.levels as StudioLevel[]) : [{ name: 'EG', y: 0, height: 4 }];
  const ly = (i: number) => (levels[i] ?? levels[0]).y - base;
  const lh = (i: number) => (levels[i] ?? levels[0]).height || 4;
  const T = (p: P2) => rot2(p, turn);
  const ws = (r.walls ?? []).filter((w) => [...w.a, ...w.b].every(Number.isFinite));
  const walls = ws.map((w, i) => {
    const len = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]) || 1;
    const h = w.h && w.h > 0.05 ? w.h : lh(w.level);
    const gaps = w.via
      ? []
      : (r.openings ?? [])
          .filter((o) => o.wall === i)
          .map((o) => ({ t0: Math.max(0, o.t - o.w / 2 / len), t1: Math.min(1, o.t + o.w / 2 / len), sill: Math.max(0, o.sill || 0), top: Math.min(h, (o.sill || 0) + o.h), kind: o.kind, link: o.link }))
          .sort((x, y) => x.t0 - y.t0);
    const railing = w.kind === 'railing';
    return { a: T(w.a), b: T(w.b), via: w.via ? T(w.via) : undefined, y: ly(w.level), h, mat: matOf(w.mat, railing ? 'glass' : SCAN_MATERIALS.wall), railing, gaps: railing ? [] : gaps };
  });
  const objects = (r.objects ?? [])
    .filter((o) => [...o.c, o.w, o.d, o.angle].every(Number.isFinite))
    .map((o) => {
      const base = Number.isFinite(o.base) ? (o.base as number) : o.type === 'level' ? -(o.h || 0.25) : 0;
      const h = o.h > 0.01 ? o.h : lh(o.level) - base;
      // Empore: its outline into the turned frame (absolute points).
      const poly = o.type === 'slab' && o.pts && o.pts.length >= 3 ? o.pts.map((q) => T([o.c[0] + rot2(q, o.angle)[0], o.c[1] + rot2(q, o.angle)[1]])) : undefined;
      return { o: { ...o, h }, c: T(o.c), ang: o.angle + turn, y: ly(o.level) + base, poly };
    });
  // Floors of closed upper storeys, painted floors, painted ceilings.
  const slabs: StudioGeo['slabs'] = [];
  levels.forEach((l, i) => {
    const pts = walls.filter((_, k) => ws[k].level === i).flatMap((w) => [w.a, w.b, ...(w.via ? [w.via] : [])]);
    if (pts.length < 3) return;
    const xs = pts.map((p) => p[0]);
    const zs = pts.map((p) => p[1]);
    const rect: P2[] = [[Math.min(...xs), Math.min(...zs)], [Math.max(...xs), Math.max(...zs)]];
    const area = (rect[1][0] - rect[0][0]) * (rect[1][1] - rect[0][1]);
    const closed = ws.filter((w) => w.level === i).length >= 3 && area > 2;
    // Upper floors come from the Emporen drawn there; only a painted floor of the lowest storey gets a plate.
    if (l.floor && closed && ly(i) < 0.05) slabs.push({ pts: rect, y: ly(i), h: 0.02, mat: matOf(l.floor, 'darkgrey'), name: `${roomNo}${l.name} · Boden` });
    if (l.ceiling && closed) slabs.push({ pts: rect, y: ly(i) + lh(i), h: 0.05, mat: matOf(l.ceiling, 'black'), name: `${roomNo}${l.name} · Decke` });
  });
  const H = Math.max(...levels.map((_, i) => ly(i) + lh(i)), ...walls.map((w) => w.y + w.h));
  return { walls, objects, slabs, H, dy: 0 };
}

function studioMove(g: StudioGeo, from: P2, theta: number, to: P2) {
  const f = (p: P2): P2 => {
    const q = rot2([p[0] - from[0], p[1] - from[1]], theta);
    return [q[0] + to[0], q[1] + to[1]];
  };
  for (const w of g.walls) {
    w.a = f(w.a);
    w.b = f(w.b);
    if (w.via) w.via = f(w.via);
  }
  for (const o of g.objects) {
    o.c = f(o.c);
    o.ang += theta;
    if (o.poly) o.poly = o.poly.map(f);
  }
  for (const s of g.slabs) {
    // Slabs are axis rectangles; after a quarter turn they stay rectangles.
    const c = s.pts.map(f);
    s.pts = [[Math.min(c[0][0], c[1][0]), Math.min(c[0][1], c[1][1])], [Math.max(c[0][0], c[1][0]), Math.max(c[0][1], c[1][1])]];
  }
}

function studioPassage(g: StudioGeo, link: number): { p: P2; d: P2; y: number } | null {
  for (const w of g.walls) {
    for (const gap of w.gaps) {
      if (gap.link !== link) continue;
      const t = (gap.t0 + gap.t1) / 2;
      const len = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]) || 1;
      return { p: [w.a[0] + (w.b[0] - w.a[0]) * t, w.a[1] + (w.b[1] - w.a[1]) * t], d: [(w.b[0] - w.a[0]) / len, (w.b[1] - w.a[1]) / len], y: w.y + g.dy };
    }
  }
  return null;
}

/** The club studio's drawing → one location (rooms joined at their passages). */
export function studioToLocation(scan: StudioScan, name: string): LocationData {
  const rooms = (scan.rooms ?? []).filter((r) => r.walls?.length || r.objects?.length);
  if (!rooms.length) return newLocation(name, 'indoor');
  const many = rooms.length > 1;
  // Rooms drawn in the same coordinates move together: same turn, same floor base.
  const frameOf = (r: StudioRoom) => (Number.isFinite(r.frame) ? (r.frame as number) : 0);
  const leader = new Map<number, number>();
  rooms.forEach((r, i) => leader.has(frameOf(r)) || leader.set(frameOf(r), i));
  const bases = new Map<number, number>();
  for (const r of rooms) {
    const ys = (r.levels ?? []).map((l) => l.y).filter(Number.isFinite);
    if (ys.length) bases.set(frameOf(r), Math.min(bases.get(frameOf(r)) ?? Infinity, ...ys));
  }
  const geos = rooms.map((r, i) => {
    const f = frameOf(r);
    const lead = leader.get(f)!;
    return studioRoomGeo(r, studioTurn(rooms[lead], lead === 0), bases.get(f) ?? 0, many ? `Raum ${i + 1} · ` : '');
  });
  const groups = [...leader.keys()].map((f) => rooms.map((r, i) => (frameOf(r) === f ? i : -1)).filter((i) => i >= 0));
  const centre = (g: StudioGeo): P2 => {
    const pts = g.walls.flatMap((w) => [w.a, w.b]);
    return pts.length ? [avg(pts.map((p) => p[0])), avg(pts.map((p) => p[1]))] : (g.objects[0]?.c ?? [0, 0]);
  };
  // Other frames: joined at a passage (door with the same link in both); the whole frame moves.
  const placed = new Set<number>(groups[0]);
  const moveGroup = (g: number[], from: P2, theta: number, to: P2, dy: number) => {
    for (const k of g) {
      studioMove(geos[k], from, theta, to);
      geos[k].dy = dy;
      placed.add(k);
    }
  };
  for (let guard = 0; guard < groups.length; guard++) {
    for (const g of groups.slice(1)) {
      if (placed.has(g[0])) continue;
      const links = g.flatMap((k) => geos[k].walls.flatMap((w) => w.gaps.map((x) => x.link))).filter((l): l is number => l != null);
      for (const l of links) {
        const j = [...placed].find((x) => studioPassage(geos[x], l));
        const k = g.find((x) => studioPassage(geos[x], l));
        if (j == null || k == null) continue;
        const A = studioPassage(geos[j], l)!;
        const B = studioPassage(geos[k], l)!;
        const cA = centre(geos[j]);
        let theta = Math.atan2(A.d[1], A.d[0]) - Math.atan2(B.d[1], B.d[0]);
        const cB = rot2([centre(geos[k])[0] - B.p[0], centre(geos[k])[1] - B.p[1]], theta);
        if (Math.sign(cross(A.d, cB)) === Math.sign(cross(A.d, [cA[0] - A.p[0], cA[1] - A.p[1]]))) theta += Math.PI;
        moveGroup(g, B.p, theta, A.p, A.y - B.y);
        break;
      }
    }
  }
  // Frames without a passage: next to the others, to be moved in the builder.
  for (const g of groups.slice(1)) {
    if (placed.has(g[0])) continue;
    const others = [...placed].flatMap((x) => geos[x].walls.flatMap((w) => [w.a, w.b]));
    const mine = g.flatMap((k) => geos[k].walls.flatMap((w) => [w.a, w.b]));
    const right = others.length ? Math.max(...others.map((p) => p[0])) : 0;
    const left = mine.length ? Math.min(...mine.map((p) => p[0])) : 0;
    moveGroup(g, [0, 0], 0, [right - left + 2, 0], 0);
  }
  const low = Math.min(0, ...geos.map((g) => g.dy));
  for (const g of geos) g.dy -= low;

  // Bounds: walls (curves by their circle), furniture corners.
  const pts: P2[] = [];
  for (const g of geos) {
    for (const w of g.walls) {
      pts.push(w.a, w.b);
      if (w.via) {
        const c = circle3(w.a, w.via, w.b);
        if (c) pts.push([c.c[0] - c.r, c.c[1] - c.r], [c.c[0] + c.r, c.c[1] + c.r]);
      }
    }
    for (const o of g.objects) {
      if (o.poly) pts.push(...o.poly);
      for (const [sx, sz] of [[-1, -1], [1, 1], [1, -1], [-1, 1]]) {
        const q = rot2([(sx * o.o.w) / 2, (sz * o.o.d) / 2], o.ang);
        pts.push([o.c[0] + q[0], o.c[1] + q[1]]);
      }
    }
  }
  const minX = Math.min(...pts.map((q) => q[0]));
  const maxX = Math.max(...pts.map((q) => q[0]));
  const minZ = Math.min(...pts.map((q) => q[1]));
  const maxZ = Math.max(...pts.map((q) => q[1]));
  const cx = (minX + maxX) / 2;
  const cz = (minZ + maxZ) / 2;
  const loc = newLocation(name, 'indoor');
  loc.room = { width: round(maxX - minX + 2 * MARGIN), depth: round(maxZ - minZ + 2 * MARGIN), height: round(Math.max(...geos.map((g) => g.H + g.dy))) };
  const objects: LocObject[] = [];
  const at = (p: P2): [number, number] => [round(p[0] - cx), round(p[1] - cz)];
  const wallObj = (a: P2, b: P2, y0: number, h: number, mat: MatPreset, label: string, thick = WALL_THICK) => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len < 0.05 || h < 0.05) return;
    const [x, z] = at([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
    objects.push({ id: newId(), type: 'wall', name: label, pos: [x, round(y0), z], rot: [0, round((Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180) / Math.PI, 1), 0], size: [round(len), round(h), thick], material: mat, group: 'Club-Studio' });
  };
  geos.forEach((g, r) => {
    const pre = many ? `Raum ${r + 1} · ` : '';
    const count: Record<string, number> = {};
    const num = (k: string) => (count[k] = (count[k] ?? 0) + 1);
    g.walls.forEach((w, i) => {
      const y0 = w.y + g.dy;
      if (w.railing) {
        const pts = w.via ? (() => {
          const c = circle3(w.a, w.via!, w.b);
          return c ? [w.a, w.via!, w.b] : [w.a, w.b];
        })() : [w.a, w.b];
        const n = num('Geländer');
        for (let k = 0; k < pts.length - 1; k++) wallObj(pts[k], pts[k + 1], y0, w.h, w.mat, `${pre}Geländer ${n}`, RAILING_THICK);
        return;
      }
      if (w.via) {
        // Curve: VD-Link's curved wall (an arc of a circle, 0.15 m thick).
        const c = circle3(w.a, w.via, w.b);
        if (!c) return void wallObj(w.a, w.b, y0, w.h, w.mat, `${pre}Wand ${i + 1}`);
        const ang = (p: P2) => Math.atan2(p[1] - c.c[1], p[0] - c.c[0]);
        let span = (((ang(w.b) - ang(w.a)) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const viaOff = (((ang(w.via) - ang(w.a)) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        if (viaOff > span) span -= 2 * Math.PI;
        const mid = ang(w.a) + span / 2;
        const m: P2 = [Math.cos(mid), Math.sin(mid)];
        const [x, z] = at(c.c);
        objects.push({
          id: newId(),
          type: 'arc',
          name: `${pre}Rundung ${num('Rundung')}`,
          pos: [x, round(y0), z],
          rot: [0, round((Math.atan2(m[0], m[1]) * 180) / Math.PI, 1), 0],
          size: [round(2 * c.r), round(w.h), round(2 * c.r)],
          material: w.mat,
          arc: { angle: round((Math.abs(span) * 180) / Math.PI, 0.1), thickness: WALL_THICK },
          group: 'Club-Studio',
        });
        return;
      }
      const pt = (t: number): P2 => [w.a[0] + (w.b[0] - w.a[0]) * t, w.a[1] + (w.b[1] - w.a[1]) * t];
      let t = 0;
      let part = 0;
      const n = w.gaps.length;
      for (const gap of w.gaps) {
        const label = gap.link != null ? `Durchgang ${gap.link}` : `${OPENING_NAMES[gap.kind] ?? 'Öffnung'} ${num(gap.kind)}`;
        if (gap.t0 > t) wallObj(pt(t), pt(gap.t0), y0, w.h, w.mat, `${pre}Wand ${i + 1}${n ? '.' + ++part : ''}`);
        if (gap.sill > 0.05) wallObj(pt(gap.t0), pt(gap.t1), y0, gap.sill, w.mat, `${pre}${label} · Brüstung`);
        wallObj(pt(gap.t0), pt(gap.t1), y0 + gap.top, w.h - gap.top, w.mat, `${pre}${label} · Sturz`);
        t = Math.max(t, gap.t1);
      }
      if (t < 1) wallObj(pt(t), w.b, y0, w.h, w.mat, `${pre}Wand ${i + 1}${n ? '.' + ++part : ''}`);
    });
    for (const b of g.objects) {
      const k = STUDIO_TYPES[b.o.type] ?? STUDIO_TYPES.box;
      const [x, z] = at(b.c);
      const big = Math.max(b.o.w, b.o.d);
      const o: LocObject = {
        id: newId(),
        type: k.type,
        name: `${pre}${k.name} ${num(k.name)}`,
        pos: [x, round(b.y + g.dy), z],
        rot: [0, round((-b.ang * 180) / Math.PI, 1), 0],
        size: k.round ? [round(big), round(b.o.h), round(big)] : [round(b.o.w), round(b.o.h), round(b.o.d)],
        material: matOf(b.o.mat, k.mat),
        group: 'Club-Studio',
      };
      if (k.type === 'videowall') o.pixels = [1920, 1080];
      if (k.type === 'slab' && b.poly) {
        // Empore: outline around the middle of its bounds, no turn.
        const xs = b.poly.map((p) => p[0]);
        const zs = b.poly.map((p) => p[1]);
        const mx = (Math.min(...xs) + Math.max(...xs)) / 2;
        const mz = (Math.min(...zs) + Math.max(...zs)) / 2;
        const [px, pz] = at([mx, mz]);
        o.pos = [px, round(b.y + g.dy), pz];
        o.rot = [0, 0, 0];
        o.size = [round(Math.max(...xs) - Math.min(...xs)), round(b.o.h), round(Math.max(...zs) - Math.min(...zs))];
        o.poly = b.poly.map((p) => [round(p[0] - mx), round(p[1] - mz)] as [number, number]);
      }
      objects.push(o);
    }
    for (const s of g.slabs) {
      const [x, z] = at([(s.pts[0][0] + s.pts[1][0]) / 2, (s.pts[0][1] + s.pts[1][1]) / 2]);
      objects.push({ id: newId(), type: 'box', name: s.name, pos: [x, round(s.y + g.dy), z], rot: [0, 0, 0], size: [round(s.pts[1][0] - s.pts[0][0]), round(s.h), round(s.pts[1][1] - s.pts[0][1])], material: s.mat, group: 'Club-Studio' });
    }
  });
  loc.objects = objects;
  return loc;
}
