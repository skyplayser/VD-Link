// Turns a fixture definition into a renderable model: body kind, head kind, size and
// the position of every LED cell / lens on the front face.
//
// Own definitions (db 'vd') describe their model explicitly (e.g. UKing ZQ06133: tilt
// bar with a 4×9 RGB pixel matrix + 4×9 warm-white lenses). For the thousands of
// imported OFL / QLC+ fixtures the model is derived from type, name and channels, so
// a pixel bar automatically gets its pixels and a bee-eye its lenses.

import { beamStyle, type BeamStyle } from './beam-style.ts';
import type { BodyKind, CellGroup, FixtureDef, FixtureMode, HeadKind } from './fixture-types.ts';

export interface ResolvedCell {
  /** Position on the front face in metres (x right, y up, face centre = 0). */
  x: number;
  y: number;
  /** Radius (disc) or half edge (square) in metres. */
  r: number;
  shape: 'disc' | 'square';
  group: number;
  /** Emitter tint (warm white, amber …) – multiplied with the decoded cell level. */
  tint: [number, number, number];
  /** 'rgb': cell shows a mixed colour; 'mono': a single fixed-colour emitter. */
  mix: 'rgb' | 'mono';
  beam: boolean;
  deg: number;
}

export interface ResolvedModel {
  body: BodyKind;
  head: HeadKind;
  style: BeamStyle;
  /** Head (moving) or body (static) size in metres: width, height (front face), depth. */
  size: [number, number, number];
  cells: ResolvedCell[];
  /** The fixture throws one main beam from its lens (no per-cell beams). */
  mainBeam: boolean;
  pan: boolean;
  tilt: boolean;
  tungsten: boolean;
  /** Main lens radius in metres. */
  lens: number;
  /** Number of sub-heads (multibar, spider, arms, gigbar), else 1. */
  heads: number;
  /** Barn doors on the front. */
  doors: boolean;
}

const TINT: Record<CellGroup['color'], [number, number, number]> = {
  rgb: [1, 1, 1],
  rgbw: [1, 1, 1],
  ww: [1, 0.72, 0.42],
  cw: [0.85, 0.92, 1],
  white: [1, 0.95, 0.88],
  amber: [1, 0.55, 0.12],
  uv: [0.35, 0.1, 0.9],
};

const BEE = /\b(bee|b-?eye|k10|k15|k20|k25|bees)\b/i;

// Name hints for imported fixtures whose type does not tell the shape.
const FOLLOW = /follow ?spot|followspot|verfolger|\bfollow\b/i;
const DERBY = /derby|moon ?flower|mushroom|kinta|\bgem\b|flower|starball|rotosphere|hemisphere|minisphere|star ?sphere|hellball|swarm/i;
const BALL = /ball|sphere|globe/i;
// Only names known to have single moving heads (a bar that tilts as a whole is a 'tiltbar').
const MULTIBAR = /chorus ?line|tornadot|\btb ?5f?\b|magic ?blade neo/i;
const GIGBAR = /gig ?bar|party ?bar|2 ?go bar|\bfx ?bar\b|\bdj ?set\b|lightset|light set/i;
const ARMS = /\barms?\b|octopus|tentacle|butterfly/i;
const ORB = /magic ?dot|magic ?ring|\borb\b|m-sphere|double balls/i;

function bodyFromDef(def: FixtureDef): BodyKind {
  const name = `${def.manufacturer} ${def.model}`;
  if (GIGBAR.test(name) && def.type !== 'movinghead' && def.type !== 'bar' && def.type !== 'pixelbar') return 'gigbar';
  if (FOLLOW.test(name) && def.type !== 'movinghead') return 'follow';
  switch (def.type) {
    case 'movinghead':
      if (MULTIBAR.test(name)) return 'multibar';
      if (/spider/i.test(name)) return 'spider';
      if (ARMS.test(name)) return 'arms';
      return 'movinghead';
    case 'scanner':
      return 'scanner';
    case 'par':
      if (/fresnel|\bpc\b/i.test(name)) return 'fresnel';
      if (/batten/i.test(name)) return 'bar';
      if (/\bcyc\b|cyclo/i.test(name)) return 'panel';
      return /\bcob\b/i.test(name) ? 'cob' : 'par';
    case 'bar':
    case 'pixelbar':
      if (MULTIBAR.test(name)) return 'multibar';
      return /tube|titan|helios|ax1|pixeltube/i.test(name) ? 'tube' : 'bar';
    case 'strobe':
      return 'strobe';
    case 'blinder':
      return 'blinder';
    case 'laser':
      return 'laser';
    case 'effect':
      if (/spider/i.test(name)) return 'spider';
      if (ARMS.test(name)) return 'arms';
      if (DERBY.test(name)) return 'derby';
      return 'effect';
    case 'dimmer':
      if (/fresnel|\bpc\b/i.test(name)) return 'fresnel';
      if (/profile|source four|ellips|zoom spot|leko/i.test(name) && !/\bpar\b/i.test(name)) return 'profile';
      if (/panel|skypanel|orbiter|\bcyc\b/i.test(name)) return 'panel';
      return 'par';
    default:
      if (/panel|skypanel|orbiter/i.test(name)) return 'panel';
      return 'par';
  }
}

/** Number of separately controllable colour cells in a mode (repeated red channels). */
export function autoCellCount(mode: FixtureMode): number {
  if (mode.channels.some((c) => c.cell !== undefined || c.cells || c.group !== undefined))
    return Math.max(0, ...mode.channels.map((c) => Math.max((c.cell ?? -1) + 1, ...(c.cells ?? []).map((k) => k + 1))));
  const reds = mode.channels.filter((c) => c.attr === 'red' && c.byte === 0).length;
  if (reds >= 2) return reds;
  const whites = mode.channels.filter((c) => c.attr === 'white' && c.byte === 0).length;
  const dims = mode.channels.filter((c) => c.attr === 'dimmer' && c.byte === 0).length;
  // Blinders and multi-lamp bars: several dimmer channels, no colour.
  if (!mode.channels.some((c) => c.attr === 'red') && Math.max(whites, dims) >= 2) return Math.max(whites, dims);
  return 0;
}

const DEFAULT_SIZE: Record<BodyKind, [number, number, number]> = {
  movinghead: [0.26, 0.26, 0.34],
  tiltbar: [0.55, 0.16, 0.14],
  par: [0.24, 0.24, 0.16],
  cob: [0.26, 0.26, 0.2],
  bar: [1.0, 0.09, 0.1],
  blinder: [0.42, 0.22, 0.14],
  strobe: [0.38, 0.16, 0.12],
  panel: [0.62, 0.3, 0.1],
  tube: [1.0, 0.05, 0.05],
  fresnel: [0.22, 0.22, 0.3],
  profile: [0.2, 0.2, 0.6],
  retro: [0.34, 0.34, 0.12],
  ufo: [0.4, 0.4, 0.16],
  laser: [0.24, 0.12, 0.22],
  effect: [0.26, 0.16, 0.2],
  // New shapes: width, front-face height, depth (see fixture.ts for how they are built).
  scanner: [0.2, 0.18, 0.6], // width, body height, body length
  multibar: [1.0, 0.14, 0.2], // bar length, bar width, head length
  spider: [0.32, 0.2, 0.08], // bar length, both bars, bar thickness
  arms: [0.56, 0.56, 0.16], // span, span, hub height
  derby: [0.3, 0.3, 0.14], // dome diameter, -, base height
  follow: [0.3, 0.3, 1.1],
  gigbar: [1.1, 0.12, 0.16], // bar length, pod size, pod depth
};

/** Bodies whose cells sit on own moving / rotated sub-parts (beams per cell). */
export const SUB_BODIES: BodyKind[] = ['multibar', 'spider', 'arms', 'gigbar', 'derby'];
/** Round front face. */
const ROUND: BodyKind[] = ['movinghead', 'par', 'cob', 'retro', 'ufo', 'fresnel', 'profile', 'derby', 'arms', 'follow'];

export function resolveModel(def: FixtureDef, modeIndex = 0): ResolvedModel {
  const m = def.visual;
  const style = beamStyle(def);
  const body = m?.body ?? bodyFromDef(def);
  const name = `${def.manufacturer} ${def.model}`;
  const mode = def.modes[Math.min(modeIndex, def.modes.length - 1)];
  const hasAttr = (a: string) => mode.channels.some((c) => c.attr === a);
  let head: HeadKind =
    m?.head ??
    (body === 'movinghead'
      ? ORB.test(name)
        ? 'orb'
        : BEE.test(name)
          ? 'beeeye'
          : style === 'wash'
            ? 'wash'
            : style === 'beam'
              ? 'beam'
              : 'spot'
      : body === 'derby' && BALL.test(name)
        ? 'orb'
        : 'wash');
  let size: [number, number, number] = m?.sizeMm ? [m.sizeMm[0] / 1000, m.sizeMm[1] / 1000, m.sizeMm[2] / 1000] : [...DEFAULT_SIZE[body]];
  const fromDims = body !== 'movinghead' && body !== 'scanner' && body !== 'spider' && body !== 'arms' && body !== 'derby' && body !== 'follow' && body !== 'gigbar';
  if (!m?.sizeMm && def.physical.dims && fromDims) {
    // Physical dims are the whole fixture – good enough for static bodies.
    const [w, h, d] = def.physical.dims;
    if (w > 0 && h > 0 && d > 0) size = body === 'multibar' ? [w / 1000, Math.min(h, d, 220) / 1000, size[2]] : [w / 1000, Math.min(h, w) / 1000, d / 1000];
  }
  if (!m?.sizeMm && def.physical.dims && (body === 'scanner' || body === 'follow')) {
    // Long bodies: the longest side is the length, the shortest the width.
    const [a, b, c] = [...def.physical.dims].sort((x, y) => x - y).map((x) => x / 1000);
    if (a > 0) size = body === 'scanner' ? [Math.min(a, 0.4), Math.min(b, 0.4), Math.min(c, 1.4)] : [Math.min(a, 0.5), Math.min(a, 0.5), Math.min(c, 1.6)];
  }
  if (body === 'movinghead' && head === 'wash' && !m?.sizeMm) size = [0.32, 0.32, 0.3];
  if (body === 'movinghead' && head === 'beam' && !m?.sizeMm) size = [0.2, 0.2, 0.36];
  if (body === 'movinghead' && head === 'orb' && !m?.sizeMm) size = [0.26, 0.26, 0.26];

  // ---- cell groups: explicit, or derived from the channels
  let groups: CellGroup[] = m?.cells ?? [];
  const sub = SUB_BODIES.includes(body);
  if (!m?.cells) {
    const n = autoCellCount(mode);
    if (n >= 2) {
      const mono = !mode.channels.some((c) => c.attr === 'red');
      const layout: CellGroup['layout'] =
        body === 'bar' || body === 'tube' || body === 'strobe' || body === 'multibar' || body === 'gigbar'
          ? 'line'
          : body === 'arms'
            ? 'circle'
            : head === 'beeeye' || body === 'movinghead' || body === 'derby'
              ? 'hex'
              : 'grid';
      groups = [{ layout, count: n, color: mono ? (/amber|molefay|blinder/i.test(name) ? 'amber' : 'white') : 'rgb', beam: head === 'beeeye' || body === 'blinder' || sub, deg: head === 'beeeye' || sub ? 4 : 40 }];
      if (body === 'blinder' || mono) groups[0].shape = 'disc';
    } else if (head === 'beeeye') {
      groups = [{ layout: 'hex', count: /k20|19/i.test(name) ? 19 : /k10|37/i.test(name) ? 37 : 7, color: 'rgb', beam: true, deg: 4 }];
      head = 'beeeye';
    }
  }
  // Sub-head bodies: how many heads / bars / arms / pods.
  const nameN = Number(/(?:^|\D)(\d{1,2})(?:\D|$)/.exec(def.model)?.[1] ?? 0);
  const main = groups.find((g) => g.layout !== 'ring');
  // Largest pixel count over all modes (a pixel mode shows how many heads there are).
  const maxCells = Math.max(0, ...def.modes.map(autoCellCount));
  const heads =
    m?.heads ??
    (body === 'multibar'
      ? maxCells >= 3 && maxCells <= 24
        ? maxCells
        : nameN >= 3 && nameN <= 24
          ? nameN
          : 5
      : body === 'spider'
        ? 2
        : body === 'arms'
          ? main && main.count >= 2 && main.count <= 12
            ? main.count
            : nameN >= 2 && nameN <= 12
              ? nameN
              : 6
          : body === 'gigbar'
            ? 4
            : 1);
  // Derived zones that are fewer than the heads (e.g. 2 colour zones on a 7-head bar):
  // one lens per head instead, coloured like the whole fixture.
  if (!m?.cells && (body === 'multibar' || body === 'gigbar' || body === 'arms') && groups.length && groups[0].count < heads) groups = [];
  // Bodies that throw their light only from cells need beam cells: one lens per head / dome.
  if (sub && !groups.some((g) => g.beam)) {
    const k = body === 'derby' ? (head === 'orb' ? 24 : 19) : body === 'spider' ? heads * 4 : heads;
    groups = [...groups, { layout: body === 'derby' ? 'hex' : body === 'arms' ? 'circle' : body === 'spider' ? 'grid' : 'line', count: k, rows: body === 'spider' ? heads : undefined, color: 'rgb', beam: true, deg: body === 'derby' ? 4 : 6, extent: body === 'arms' ? 0.8 : undefined }];
  }

  const cells: ResolvedCell[] = [];
  const round = ROUND.includes(body);
  const [fw, fh] = [size[0], round ? size[0] : size[1]];
  groups.forEach((g, gi) => {
    const tint = TINT[g.color];
    const mix: ResolvedCell['mix'] = g.color === 'rgb' || g.color === 'rgbw' ? 'rgb' : 'mono';
    const ext = g.extent ?? (g.layout === 'ring' ? 0.46 : 0.86);
    const pos = layoutCells(g, fw * ext, fh * ext, fw === fh);
    const pitch = pos.pitch;
    for (const [x, y] of pos.pts)
      cells.push({ x, y, r: Math.max(0.004, pitch * (g.layout === 'ring' ? 0.42 : 0.38)), shape: g.shape ?? (g.layout === 'grid' && fw !== fh ? 'square' : 'disc'), group: gi, tint, mix, beam: !!g.beam, deg: g.deg ?? 6 });
  });
  const beamCells = cells.some((c) => c.beam);
  const moving = body === 'movinghead' || body === 'tiltbar' || body === 'scanner' || body === 'multibar' || body === 'spider' || body === 'arms' || body === 'gigbar';
  const panBody = body === 'movinghead' ? !(def.physical.panDeg === 0) : body === 'scanner' || ((body === 'multibar' || body === 'spider' || body === 'arms' || body === 'gigbar') && hasAttr('pan'));
  return {
    body,
    head,
    style,
    size,
    cells,
    mainBeam: !beamCells && body !== 'laser' && !sub,
    pan: panBody,
    tilt: moving && (body !== 'gigbar' || hasAttr('tilt')),
    tungsten: !!m?.tungsten || (def.type === 'dimmer' && !mode.channels.some((c) => c.attr === 'red')),
    lens:
      body === 'movinghead'
        ? head === 'beam' || head === 'orb'
          ? 0.045
          : head === 'wash'
            ? 0.12
            : 0.075
        : body === 'scanner'
          ? Math.min(0.045, size[0] * 0.25)
          : Math.min(fw, fh) * 0.4,
    heads,
    doors: m?.doors ?? (body === 'fresnel' || /barn ?doors?/i.test(name)),
  };
}

/** Cell centres for one group inside a w × h area (metres). */
function layoutCells(g: CellGroup, w: number, h: number, round: boolean): { pts: [number, number][]; pitch: number } {
  const n = Math.max(1, g.count);
  const pts: [number, number][] = [];
  switch (g.layout) {
    case 'line': {
      const pitch = w / n;
      for (let i = 0; i < n; i++) pts.push([-w / 2 + pitch * (i + 0.5), 0]);
      return { pts, pitch: Math.min(pitch, h * 1.1) };
    }
    case 'ring':
    case 'circle': {
      const r = Math.min(w, h) / 2;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        pts.push([Math.cos(a) * r, Math.sin(a) * r]);
      }
      const pitch = g.layout === 'ring' ? (Math.PI * 2 * r) / n : Math.min((Math.PI * 2 * r) / n, r * 0.9);
      return { pts, pitch };
    }
    case 'hex': {
      // Bee-eye packing: 1, 7, 19, 37, 61 … cells.
      let rings = 0;
      while (1 + 3 * rings * (rings + 1) < n) rings++;
      const pitch = Math.min(w, h) / (2 * rings + 1);
      const all: [number, number][] = [[0, 0]];
      for (let k = 1; k <= rings; k++)
        for (let s = 0; s < 6; s++)
          for (let j = 0; j < k; j++) {
            const a0 = (s * Math.PI) / 3;
            const a1 = ((s + 2) * Math.PI) / 3;
            all.push([(Math.cos(a0) * k + Math.cos(a1) * j) * pitch, (Math.sin(a0) * k + Math.sin(a1) * j) * pitch]);
          }
      return { pts: all.slice(0, n), pitch };
    }
    default: {
      // grid
      let cols = g.cols ?? Math.ceil(Math.sqrt((n * w) / Math.max(h, 0.001)));
      let rows = g.rows ?? Math.ceil(n / cols);
      if (!g.cols && !g.rows && round) cols = rows = Math.ceil(Math.sqrt(n));
      const pitch = Math.min(w / cols, h / rows);
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          if (pts.length >= n) break;
          pts.push([(c - (cols - 1) / 2) * pitch, ((rows - 1) / 2 - r) * pitch]);
        }
      return { pts, pitch };
    }
  }
}
