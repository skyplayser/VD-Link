// VD-Link's own fixture definitions (EPL-2.0) are written as short spec sheets
// ("Steckbriefe"): body kind, LEDs, halo ring, beam angle, pan/tilt, channel counts
// and features. This file turns a spec into a full FixtureDef: channel modes in a
// typical layout for that kind of lamp (pixel modes included) and the 3D model.
//
// The channel ORDER is the typical layout of the fixture class, unless a spec lists
// its channels explicitly (`modes`). Such definitions are marked verified: false and
// the library tells the user to compare with the manual before a show.

import type { Attr, Capability, CellGroup, FixtureDef, FixtureMode, FixtureModel, FixtureType, ModeChannel } from '../../src/shared/fixture-types.ts';
import { standardGoboWheel } from '../../src/shared/gobo-library.ts';

export type Kind =
  | 'beam' | 'spot' | 'hybrid' | 'profile' | 'wash' | 'beeeye' | 'matrixhead'
  | 'par' | 'cob' | 'bar' | 'matrix' | 'tiltbar' | 'retro' | 'blinder' | 'strobe'
  | 'laser' | 'lasermh' | 'ufo' | 'multihead' | 'spider' | 'panel' | 'tube'
  | 'fresnel' | 'pc' | 'ellipsoidal' | 'par64' | 'flood' | 'follow' | 'effect'
  // Own 3D shapes (see docs/3D-MODELLE.md): mirror scanner, bar with single heads,
  // multi-arm effect, derby/moonflower, ball effect, ball head (MagicDot), lamps on a T-bar.
  | 'scanner' | 'multibar' | 'arms' | 'derby' | 'ball' | 'dot' | 'gigbar';

export type LedColor = 'rgb' | 'rgbw' | 'rgba' | 'rgbwa' | 'rgbwauv' | 'rgbal' | 'rgbl' | 'rgbauv' | 'ww' | 'cw' | 'wwcw' | 'amber' | 'white' | 'amcw' | 'uv';

export interface Spec {
  man: string;
  /** Short id part, e.g. 'zq06133'. */
  key: string;
  model: string;
  kind: Kind;
  /** Main emitters: count and colour. */
  leds?: [number, LedColor];
  /** Halo / aperture ring that only glows. */
  ring?: [number, LedColor];
  /** Extra emitters: strobe line, backlight, golden COBs … */
  aux?: [number, LedColor, CellGroup['layout']?, boolean?];
  /** Grid for matrix / tilt bars (rows, cols). */
  grid?: [number, number];
  deg?: [number, number];
  pan?: number;
  tilt?: number;
  /** Channel counts of the modes (from the maker's spec). */
  ch: number[];
  /** Modes with at least this many channels address every pixel. */
  pixelFrom?: number;
  feat?: string[];
  /** mm: width, height (front), depth of head/body. */
  size?: [number, number, number];
  url?: string;
  note?: string;
  /** Explicit modes (overrides the generated ones). */
  modes?: FixtureMode[];
  verified?: boolean;
  /** Cell beam angle (bee-eye lenses, blinder cells …). */
  cellDeg?: number;
}

// ------------------------------------------------------------------ channels

const ch = (name: string, attr: Attr, extra: Partial<ModeChannel> = {}): ModeChannel => ({ name, attr, byte: 0, ...extra });
const fine = (name: string, attr: Attr): ModeChannel => ({ name, attr, byte: 1 });

const WHEEL: [string, string][] = [
  ['White', '#ffffff'], ['Red', '#ff2010'], ['Orange', '#ff8000'], ['Yellow', '#ffe000'],
  ['Green', '#20ff40'], ['Cyan', '#20e0ff'], ['Blue', '#2040ff'], ['Magenta', '#ff20c0'],
  ['Pink', '#ff80b0'], ['Light Blue', '#80c0ff'], ['Lime', '#b0ff40'], ['CTO', '#ffc080'],
  ['UV', '#7010ff'], ['Light Green', '#80ff80'],
];
export function colorWheelCaps(n = 8): Capability[] {
  const w = Math.floor(128 / n);
  const caps: Capability[] = WHEEL.slice(0, n).map(([label, color], i) => ({ from: i * w, to: i * w + w - 1, kind: 'color', color, label }));
  caps.push({ from: n * w, to: 255, kind: 'generic', label: 'Rotation / rainbow' });
  return caps;
}
const PRISM: Capability[] = [
  { from: 0, to: 127, kind: 'open', label: 'Open' },
  { from: 128, to: 255, kind: 'prism', label: 'Prism' },
];
const SHUTTER: Capability[] = [
  { from: 0, to: 31, kind: 'closed', label: 'Closed' },
  { from: 32, to: 63, kind: 'open', label: 'Open' },
  { from: 64, to: 95, kind: 'strobe', hz: [1, 20], label: 'Strobe slow → fast' },
  { from: 96, to: 127, kind: 'open', label: 'Open' },
  { from: 128, to: 191, kind: 'strobe', hz: [1, 15], label: 'Pulse / random strobe' },
  { from: 192, to: 255, kind: 'open', label: 'Open' },
];
const LASER_COLORS: Capability[] = [
  ['Red', '#ff0000'], ['Green', '#00ff30'], ['Blue', '#2030ff'], ['Yellow', '#ffe000'], ['Cyan', '#00ffff'], ['Magenta', '#ff00ff'], ['White', '#ffffff'],
].map(([label, color], i) => ({ from: i * 32, to: i * 32 + 31, kind: 'color', color, label }) as Capability).concat([{ from: 224, to: 255, kind: 'generic', label: 'Colour change' }]);

/** Colour emitter channels for one LED colour combination. */
function colorChs(c: LedColor, tag: Partial<ModeChannel> = {}, prefix = ''): ModeChannel[] {
  const map: Record<string, [string, Attr]> = {
    r: ['Red', 'red'], g: ['Green', 'green'], b: ['Blue', 'blue'], w: ['White', 'white'], a: ['Amber', 'amber'], uv: ['UV', 'uv'], l: ['Lime', 'lime'],
  };
  const keys: Record<LedColor, string[]> = {
    rgb: ['r', 'g', 'b'], rgbw: ['r', 'g', 'b', 'w'], rgba: ['r', 'g', 'b', 'a'], rgbwa: ['r', 'g', 'b', 'w', 'a'], rgbwauv: ['r', 'g', 'b', 'w', 'a', 'uv'],
    rgbal: ['r', 'g', 'b', 'a', 'l'], rgbl: ['r', 'g', 'b', 'l'], rgbauv: ['r', 'g', 'b', 'a', 'uv'],
    ww: ['ww'], cw: ['cw'], wwcw: ['cw', 'ww'], amber: ['a'], white: ['w'], amcw: ['cw', 'a'], uv: ['uv'],
  };
  return keys[c].map((k) => {
    if (k === 'ww') return ch(`${prefix}Warm White`, 'white', tag);
    if (k === 'cw') return ch(`${prefix}Cold White`, 'white', tag);
    const [n, a] = map[k];
    return ch(prefix + n, a, tag);
  });
}

const cellColor = (c: LedColor): CellGroup['color'] =>
  c === 'ww' ? 'ww' : c === 'cw' || c === 'white' ? 'cw' : c === 'amber' ? 'amber' : c === 'uv' ? 'uv' : c === 'wwcw' || c === 'amcw' ? 'ww' : c === 'rgbw' || c === 'rgbwa' || c === 'rgbwauv' ? 'rgbw' : 'rgb';

// ------------------------------------------------------------------ build

const MOVING: Kind[] = [
  'beam', 'spot', 'hybrid', 'profile', 'wash', 'beeeye', 'matrixhead', 'lasermh', 'multihead', 'spider', 'tiltbar',
  'scanner', 'multibar', 'arms', 'dot',
];
const CONVENTIONAL: Kind[] = ['fresnel', 'pc', 'ellipsoidal', 'par64', 'flood'];
/** Discharge / white-light engines with colour and gobo wheels. */
const WHEELS: Kind[] = ['beam', 'spot', 'hybrid', 'profile', 'lasermh'];
/** LED shapes that always mix colour, even when the spec names no LEDs. */
const LED_SHAPES: Kind[] = ['dot', 'multibar', 'arms', 'derby', 'ball', 'gigbar'];

/** GigBAR Move & co.: sets with moving pods (pan/tilt given or "Move" in the name). */
const gigMove = (s: Spec) => s.kind === 'gigbar' && (s.pan !== undefined || s.tilt !== undefined || /\bmove\b/i.test(s.model));
export const isMoving = (s: Spec) => MOVING.includes(s.kind) || gigMove(s);
/** Tilt bars and spiders only tilt; bars with single heads pan only when the spec says so. */
const hasPan = (s: Spec) => isMoving(s) && s.kind !== 'tiltbar' && s.kind !== 'spider' && (s.kind !== 'multibar' || !!s.pan);
const PAN_DEFAULT: Partial<Record<Kind, number>> = { scanner: 170, arms: 360, multibar: 180 };
const TILT_DEFAULT: Partial<Record<Kind, number>> = { tiltbar: 180, scanner: 110, multibar: 180, arms: 90, gigbar: 180 };
/** LED colour mixing (more than one emitter colour). */
const mixes = (c: LedColor) => !['ww', 'cw', 'white', 'amber', 'uv'].includes(c);

function fixtureType(s: Spec): FixtureType {
  if (s.kind === 'scanner') return 'scanner';
  if (isMoving(s)) return 'movinghead';
  if (CONVENTIONAL.includes(s.kind)) return 'dimmer';
  switch (s.kind) {
    case 'par': case 'cob': case 'retro': case 'follow': return 'par';
    case 'bar': case 'tube': return s.pixelFrom ? 'pixelbar' : 'bar';
    case 'matrix': return 'pixelbar';
    case 'blinder': return 'blinder';
    case 'strobe': return 'strobe';
    case 'laser': return 'laser';
    default: return 'effect';
  }
}

function visual(s: Spec): FixtureModel {
  const cells: CellGroup[] = [];
  const [n, col] = s.leds ?? [0, 'rgbw'];
  const size = s.size;
  const add = (g: CellGroup) => cells.push(g);
  const ring = () => s.ring && add({ layout: 'ring', count: s.ring[0], color: cellColor(s.ring[1]), extent: 0.47, beam: false });
  const aux = (beam = false) => s.aux && add({ layout: s.aux[2] ?? 'line', count: s.aux[0], color: cellColor(s.aux[1]), beam: s.aux[3] ?? beam, deg: 40, extent: 0.9 });
  switch (s.kind) {
    case 'beam': case 'spot': case 'hybrid': case 'profile':
      ring();
      return { body: 'movinghead', head: s.kind === 'beam' ? 'beam' : s.kind === 'profile' ? 'profile' : 'spot', cells, sizeMm: size };
    case 'wash':
      if (n > 1) add({ layout: 'hex', count: n, color: cellColor(col), beam: false, extent: 0.86 });
      ring();
      return { body: 'movinghead', head: 'wash', cells, sizeMm: size };
    case 'beeeye':
      add({ layout: 'hex', count: n || 19, color: cellColor(col), beam: true, deg: s.cellDeg ?? 4, extent: 0.86 });
      ring();
      return { body: 'movinghead', head: 'beeeye', cells, sizeMm: size };
    case 'matrixhead':
      add({ layout: 'grid', count: n, rows: s.grid?.[0], cols: s.grid?.[1], color: cellColor(col), beam: true, deg: s.cellDeg ?? 5, shape: 'square', extent: 0.9 });
      return { body: 'movinghead', head: 'matrix', cells, sizeMm: size };
    case 'spider': {
      // Two (or more) LED bars in a yoke that tilt against each other; grid = [bars, LEDs per bar].
      const heads = s.grid?.[0] ?? 2;
      const cols = s.grid?.[1] ?? Math.ceil((n || 8) / heads);
      add({ layout: 'grid', count: n || heads * cols, rows: heads, cols, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.92 });
      aux();
      return { body: 'spider', heads, cells, sizeMm: size ?? [Math.max(240, cols * 70), heads * 100, 80] };
    }
    case 'tiltbar': {
      const [rows, cols] = s.grid ?? [1, n];
      if (s.aux && s.aux[2] === 'grid') {
        // ZQ06133 style: RGB square pixels with warm-white lenses on top.
        add({ layout: 'grid', count: s.aux[0], rows, cols, color: cellColor(s.aux[1]), shape: 'square', beam: false, extent: 0.95 });
        add({ layout: 'grid', count: n, rows, cols, color: cellColor(col), shape: 'disc', beam: true, deg: s.cellDeg ?? 8, extent: 0.55 });
      } else {
        add({ layout: rows > 1 ? 'grid' : 'line', count: n, rows, cols, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.92 });
        aux();
      }
      return { body: 'tiltbar', cells, sizeMm: size ?? [Math.max(300, cols * 60), Math.max(110, rows * 60), 140] };
    }
    case 'par':
      if (n > 1) add({ layout: n <= 7 ? 'hex' : n <= 64 ? 'grid' : 'circle', count: Math.min(n, 64), color: cellColor(col), beam: false, extent: 0.9 });
      ring();
      return { body: 'par', cells, sizeMm: size };
    case 'cob':
      if (n > 1) add({ layout: n <= 6 ? 'grid' : 'hex', count: n, color: cellColor(col), beam: false, extent: 0.85 });
      aux();
      return { body: 'cob', cells, sizeMm: size };
    case 'retro':
      if (s.aux) add({ layout: 'circle', count: Math.min(s.aux[0], 96), color: cellColor(s.aux[1]), beam: false, extent: 0.92 });
      add({ layout: n <= 7 ? 'hex' : 'grid', count: n || 1, color: cellColor(col), beam: false, extent: n > 1 ? 0.55 : 0.3 });
      return { body: 'retro', cells, sizeMm: size };
    case 'bar':
    case 'tube':
      add({ layout: 'line', count: n, color: cellColor(col), beam: false });
      aux();
      return { body: s.kind, cells, sizeMm: size ?? (s.kind === 'tube' ? [1000, 50, 50] : [Math.max(500, n * 90), 90, 100]) };
    case 'matrix': {
      const [rows, cols] = s.grid ?? [4, Math.ceil(n / 4)];
      add({ layout: 'grid', count: n, rows, cols, color: cellColor(col), shape: 'square', beam: false, extent: 0.95 });
      if (s.aux) add({ layout: s.aux[2] ?? 'line', count: s.aux[0], color: cellColor(s.aux[1]), beam: false, extent: 0.4 });
      return { body: 'strobe', cells, sizeMm: size ?? [Math.max(400, cols * 50), Math.max(200, rows * 50), 120] };
    }
    case 'blinder':
      add({ layout: 'grid', count: n, rows: s.grid?.[0] ?? (n > 4 ? 2 : 1), cols: s.grid?.[1] ?? Math.ceil(n / (n > 4 ? 2 : 1)), color: cellColor(col), beam: true, deg: s.cellDeg ?? 50, extent: 0.92 });
      return { body: 'blinder', cells, sizeMm: size ?? [n * 160 / (n > 4 ? 2 : 1) + 60, n > 4 ? 340 : 200, 150] };
    case 'strobe':
      if (s.ring) {
        // Round strobe with a matrix and an LED ring (Atomic Dot style).
        add({ layout: n > 7 ? 'grid' : 'hex', count: Math.max(1, n), rows: s.grid?.[0], cols: s.grid?.[1], color: cellColor(col), beam: false, extent: 0.6 });
        ring();
        return { body: 'retro', cells, sizeMm: size ?? [400, 400, 150] };
      }
      if (n > 1) add({ layout: s.grid ? 'grid' : 'line', count: n, rows: s.grid?.[0], cols: s.grid?.[1], color: cellColor(col), shape: 'square', beam: false, extent: 0.92 });
      aux();
      return { body: 'strobe', cells, sizeMm: size };
    case 'laser':
      return { body: 'laser', sizeMm: size };
    case 'lasermh':
      ring();
      return { body: 'movinghead', head: 'beam', cells, sizeMm: size ?? [220, 220, 260] };
    case 'ufo':
    case 'multihead':
      add({ layout: 'circle', count: n || 6, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.75 });
      aux();
      return s.kind === 'ufo' ? { body: 'ufo', cells, sizeMm: size } : { body: 'movinghead', head: 'matrix', cells, sizeMm: size ?? [380, 380, 200] };
    case 'panel':
      if (n > 1) add({ layout: 'grid', count: n, color: cellColor(col), shape: 'square', beam: false, extent: 0.95 });
      return { body: 'panel', cells, sizeMm: size };
    case 'follow':
      return { body: 'follow', sizeMm: size ?? [300, 300, 1100] };
    case 'scanner':
      ring();
      return { body: 'scanner', cells, sizeMm: size ?? [200, 180, 600] };
    case 'multibar': {
      // Bar with single heads (Chorus Line, Tornado, MagicBlade); grid = [1, heads].
      const heads = s.grid?.[1] ?? (n > 1 ? n : 5);
      add({ layout: 'line', count: n > 1 ? n : heads, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.92 });
      aux();
      ring();
      return { body: 'multibar', heads, cells, sizeMm: size ?? [Math.max(400, heads * 200), 160, 220] };
    }
    case 'arms': {
      // Hub with radial arms, one beam LED per arm; aux = centre emitters (bee-eye, strobe).
      const heads = Math.max(2, n || 6);
      add({ layout: 'circle', count: heads, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.8 });
      if (s.aux) add({ layout: 'hex', count: s.aux[0], color: cellColor(s.aux[1]), beam: s.aux[3] ?? true, deg: 10, extent: 0.2 });
      ring();
      return { body: 'arms', heads, cells, sizeMm: size ?? [Math.max(400, heads * 90), Math.max(400, heads * 90), 160] };
    }
    case 'derby':
    case 'ball':
      // Lenses on a dome (derby, moonflower) or all round a ball (starball, rotosphere).
      add({ layout: 'hex', count: n || (s.kind === 'ball' ? 24 : 19), color: cellColor(col), beam: true, deg: s.cellDeg ?? 4, extent: 0.86 });
      aux();
      return { body: 'derby', head: s.kind === 'ball' ? 'orb' : undefined, cells, sizeMm: size ?? (s.kind === 'ball' ? [300, 300, 300] : [300, 300, 140]) };
    case 'dot':
      // Ball-shaped head without classic yoke look (MagicDot, endless heads).
      if (n > 1) add({ layout: 'hex', count: n, color: cellColor(col), beam: true, deg: s.cellDeg ?? 6, extent: 0.5 });
      ring();
      return { body: 'movinghead', head: 'orb', cells, sizeMm: size ?? [240, 240, 240] };
    case 'gigbar': {
      // Several lamps on one T-bar; grid = [1, pods]. Outer pods: PAR boxes, inner pods: derby domes.
      const heads = s.grid?.[1] ?? 4;
      add({ layout: 'line', count: n > 1 ? n : heads, color: cellColor(col), beam: true, deg: s.cellDeg ?? 20, extent: 0.92 });
      aux();
      return { body: 'gigbar', heads, cells, sizeMm: size ?? [1100, 120, 160] };
    }
    case 'fresnel':
    case 'pc':
      return { body: 'fresnel', tungsten: !s.leds, sizeMm: size };
    case 'ellipsoidal':
      return { body: 'profile', tungsten: !s.leds, sizeMm: size };
    case 'par64':
      return { body: 'par', tungsten: true, sizeMm: size ?? [240, 240, 380] };
    case 'flood':
      return { body: 'panel', tungsten: !s.leds, sizeMm: size ?? [300, 220, 160] };
    default:
      if (n > 1) add({ layout: 'circle', count: n, color: cellColor(col), beam: true, deg: s.cellDeg ?? 8, extent: 0.7 });
      aux();
      return { body: 'effect', cells, sizeMm: size };
  }
}

/** Candidate channels for a kind, in canonical order, each with a priority (0 = always). */
function candidates(s: Spec, ringGroup: number): { c: ModeChannel[]; prio: number }[] {
  const f = new Set(s.feat ?? []);
  // 'gobo' also matches 'gobo:6' (count given), not 'gobo2' / 'gobor'.
  const has = (name: string) => f.has(name) || [...f].some((x) => x.startsWith(name + ':'));
  const featN = (name: string, def: number) => Number([...f].find((x) => x.startsWith(name + ':'))?.split(':')[1] ?? def);
  const out: { c: ModeChannel[]; prio: number }[] = [];
  const P = (prio: number, ...c: ModeChannel[]) => out.push({ c, prio });
  const col: LedColor = s.leds?.[1] ?? 'rgbw';
  const pro = f.has('pro');
  const conventional = CONVENTIONAL.includes(s.kind);
  const scanner = s.kind === 'scanner';
  if (isMoving(s)) {
    const mirror = scanner ? ' (mirror)' : '';
    if (hasPan(s)) P(0, ch('Pan' + mirror, 'pan'));
    if (hasPan(s)) P(2, fine('Pan fine', 'pan'));
    P(0, ch('Tilt' + mirror, 'tilt'));
    P(2, fine('Tilt fine', 'tilt'));
    P(3, ch('Pan/Tilt speed', 'speed'));
  }
  if (['ufo', 'multihead', 'derby', 'ball'].includes(s.kind)) P(1, ch('Rotation', 'other'));
  const discharge = WHEELS.includes(s.kind);
  // Scanners: colour wheel unless they mix colour with LEDs, always a gobo wheel.
  const wheelColour = discharge || (scanner && !(s.leds && mixes(s.leds[1])));
  if (pro && discharge) P(4, ch('Control / lamp', 'control'));
  // Colour
  if (wheelColour) {
    if (f.has('cmy')) P(1, ch('Cyan', 'cyan'), ch('Magenta', 'magenta'), ch('Yellow', 'yellow'));
    if (f.has('cto')) P(3, ch('CTO', 'other'));
    P(1, ch('Colour wheel', 'colorWheel', { caps: colorWheelCaps(featN('cw', scanner ? 8 : 13)) }));
    if (f.has('cw2')) P(4, ch('Colour wheel 2', 'other'));
  } else if (s.kind === 'laser' || s.kind === 'lasermh') {
    P(1, ch('Laser colour', 'colorWheel', { caps: LASER_COLORS }));
  } else if (s.kind === 'gigbar') {
    // Typical set blocks: PAR pods (colour mix), derbies, strobe / laser, master.
    P(0, ...colorChs(col, {}, 'Par '));
    P(1, ch('Derby colour', 'other'), ch('Derby strobe', 'other'), ch('Derby rotation', 'other'));
    if (s.aux || /strobe|ils|\blt\b/i.test(s.model)) P(2, ch('Strobe LEDs', 'other'), ch('Strobe LEDs effect', 'other'));
    if (/laser|ils|\b2\b|move/i.test(s.model)) P(2, ch('Laser colour', 'other'), ch('Laser strobe', 'other'), ch('Laser pattern', 'other'));
    P(3, ch('Par effect', 'other'));
  } else if (s.leds && (!conventional || mixes(col))) {
    P(0, ...colorChs(col));
    if (f.has('cto') || conventional || ['par', 'wash', 'beeeye', 'panel', 'bar', 'tube'].includes(s.kind))
      P(3, ch(s.kind === 'panel' || conventional ? 'CCT' : 'Colour macro / CTO', 'other'));
  } else if (!s.leds && LED_SHAPES.includes(s.kind)) {
    P(0, ...colorChs(col));
  }
  if (s.aux && !['tiltbar', 'spider', 'retro', 'gigbar'].includes(s.kind)) P(2, ...colorChs(s.aux[1], {}, 'Aux '));
  if (s.kind === 'retro' && s.aux) P(1, ...colorChs(s.aux[1], {}, 'Ring '));
  if (s.kind === 'tiltbar' && s.aux) P(1, ...colorChs(s.aux[1], {}, 'Pixel '));
  // Beam shaping
  if (discharge || scanner || has('gobo')) {
    P(1, ch('Gobo', 'gobo', { caps: standardGoboWheel(s.kind, featN('gobo', scanner ? 8 : 14)) }));
    if (f.has('gobor')) P(2, ch('Gobo rotation', 'goboRotation'));
    if (f.has('gobo2')) P(3, ch('Gobo 2', 'other'));
    if (f.has('anim')) P(4, ch('Animation wheel', 'other'));
  }
  if (f.has('prism') || (discharge && s.kind !== 'profile')) {
    P(1, ch('Prism', 'prism', { caps: PRISM }));
    P(2, ch('Prism rotation', 'other'));
    if (f.has('prism2')) P(4, ch('Prism 2', 'other'));
  }
  if (f.has('iris')) P(3, ch('Iris', 'other'));
  if (f.has('frost') || discharge) P(3, ch('Frost', 'frost'));
  if (f.has('rot')) P(2, ch('Lens rotation', 'other'));
  if (f.has('zoom') || ['wash', 'beeeye', 'hybrid', 'profile', 'follow'].includes(s.kind)) P(1, ch('Zoom', 'zoom'));
  if (f.has('focus') || discharge || scanner) P(2, ch('Focus', 'focus'));
  if (f.has('blades')) P(4, ch('Blade 1', 'other'), ch('Blade 2', 'other'), ch('Blade 3', 'other'), ch('Blade 4', 'other'));
  // Ring
  if (s.ring && ringGroup >= 0) P(2, ...colorChs(s.ring[1], { group: ringGroup }, 'Ring '));
  // Intensity
  if (s.kind === 'laser' || s.kind === 'lasermh') {
    P(0, ch('Laser mode', 'control'), ch('Pattern', 'other'));
    P(2, ch('Size', 'other'), ch('Rotation', 'other'), ch('X move', 'other'), ch('Y move', 'other'));
  }
  P(0, ch(s.kind === 'gigbar' ? 'Master dimmer' : 'Dimmer', 'dimmer'));
  if (f.has('dim16') || pro) P(3, fine('Dimmer fine', 'dimmer'));
  if (s.kind === 'strobe') P(0, ch('Strobe rate', 'shutter'), ch('Duration', 'other'));
  else if (!conventional) P(1, ch('Strobe', 'shutter', pro ? { caps: SHUTTER, default: 40 } : {}));
  else if (s.leds) P(3, ch('Strobe', 'shutter'));
  if (f.has('rainbow')) P(4, ch('Rainbow / effect wheel', 'other'));
  if (!conventional) {
    P(5, ch('Effect / macro', 'other'));
    P(5, ch('Effect speed', 'speed'));
    P(6, ch('Auto / sound', 'control'));
    P(6, ch('Reset', 'control'));
  } else if (s.leds) {
    // LED theatre lamps: colour presets, dimmer curve, fan / control.
    P(4, ch('Colour preset', 'other'));
    P(5, ch('Dimmer curve', 'control'));
    P(6, ch('Fan / control', 'control'));
  }
  return out;
}

function fitMode(s: Spec, n: number, groups: CellGroup[]): FixtureMode {
  const cand = candidates(s, groups.findIndex((g) => g.layout === 'ring'));
  const order = cand.map((x, i) => ({ ...x, i }));
  const picked: typeof order = [];
  let used = 0;
  for (const x of [...order].sort((a, b) => a.prio - b.prio || a.i - b.i)) {
    if (used + x.c.length > n) continue;
    picked.push(x);
    used += x.c.length;
  }
  picked.sort((a, b) => a.i - b.i);
  const chans = picked.flatMap((x) => x.c);
  for (let k = chans.length; k < n; k++) chans.push(ch(`Function ${k + 1}`, 'other'));
  return { name: `${n}CH`, channels: chans.map((c) => ({ ...c })) };
}

/** Pixel mode: base channels + one colour block per cell. */
function pixelMode(s: Spec, n: number, groups: CellGroup[]): FixtureMode {
  const main = groups.findIndex((g) => g.layout !== 'ring');
  const base: ModeChannel[] = [];
  if (hasPan(s)) base.push(ch('Pan', 'pan'), fine('Pan fine', 'pan'));
  if (isMoving(s)) base.push(ch('Tilt', 'tilt'), fine('Tilt fine', 'tilt'));
  const extra: ModeChannel[] = [...(isMoving(s) ? [ch('Pan/Tilt speed', 'speed')] : []), ch('Dimmer', 'dimmer'), ch('Strobe', 'shutter')];
  if (['wash', 'beeeye'].includes(s.kind)) extra.push(ch('Zoom', 'zoom'));
  if (s.kind === 'derby' || s.kind === 'ball') extra.push(ch('Rotation', 'other'));
  if (s.feat?.includes('rot')) extra.push(ch('Lens rotation', 'other'));
  // Cell blocks.
  let first = 0;
  const blocks: ModeChannel[][] = [];
  groups.forEach((g, gi) => {
    const color: LedColor = g.color === 'rgbw' ? 'rgbw' : g.color === 'rgb' ? 'rgb' : g.color === 'amber' ? 'amber' : 'white';
    if (g.layout === 'ring' && gi !== main) {
      blocks.push(colorChs(color === 'rgbw' ? 'rgbw' : 'rgb', { group: gi }, 'Ring '));
    } else {
      const cols = s.ch.length && gi !== main && g.color !== 'rgb' && g.color !== 'rgbw' ? 'white' : color;
      for (let k = 0; k < g.count; k++) blocks.push(colorChs(cols as LedColor, { cell: first + k }, `P${first + k + 1} `));
    }
    first += g.count;
  });
  let chans = [...base, ...extra, ...blocks.flat()];
  // Too many: drop the extras, then reduce RGBW → RGB.
  if (chans.length > n) chans = [...base, ...blocks.flat()];
  if (chans.length > n) chans = [...base, ...blocks.map((b) => b.filter((c) => c.attr !== 'white' || b.length === 1)).flat()];
  chans = chans.slice(0, n);
  for (let k = chans.length; k < n; k++) chans.push(ch(`Function ${k + 1}`, 'other'));
  return { name: `${n}CH Pixel`, channels: chans.map((c) => ({ ...c })) };
}

const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Grid [rows, cols] that holds exactly the LEDs (research hints can disagree with the LED count). */
function fitGrid(s: Spec): Spec {
  if (!s.grid || !s.leds || ['multibar', 'gigbar', 'spider'].includes(s.kind)) return s;
  const [r, c] = s.grid;
  const n = s.leds[0];
  if (r * c === n) return s;
  return { ...s, grid: n % r === 0 ? [r, n / r] : n % c === 0 ? [n / c, c] : undefined };
}

export function build(spec: Spec): FixtureDef {
  const s = fitGrid(spec);
  const vis = visual(s);
  const groups = vis.cells ?? [];
  const totalCells = groups.reduce((a, g) => a + g.count, 0);
  const modes =
    s.modes ??
    s.ch.map((n) => (s.pixelFrom && n >= s.pixelFrom && totalCells > 1 ? pixelMode(s, n, groups) : fitMode(s, n, groups)));
  return {
    id: `vd:${slug(s.man)}/${slug(s.key)}`,
    manufacturer: s.man,
    model: s.model,
    type: fixtureType(s),
    physical: {
      beamDeg: s.deg,
      panDeg: hasPan(s) ? (s.pan ?? PAN_DEFAULT[s.kind] ?? 540) : 0,
      tiltDeg: isMoving(s) ? (s.tilt ?? TILT_DEFAULT[s.kind] ?? 270) : 0,
      dims: s.size,
    },
    modes,
    source: {
      db: 'vd',
      license: 'EPL-2.0',
      authors: ['VD-Link'],
      url: s.url,
      verified: s.verified ?? false,
      note: s.note,
    },
    visual: vis,
  };
}
