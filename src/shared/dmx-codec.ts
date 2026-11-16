// Converts between raw DMX bytes and a device-independent "look" of one fixture.
// decode(): DMX from a console → what the renderer needs.
// encode(): a look → DMX bytes (used by the demo show and the DMX test sender,
//           which also proves that the fixture mapping works in both directions).

import type { Attr, Capability, FixtureDef, ModeChannel } from './fixture-types.ts';
import { autoCellCount } from './fixture-model.ts';
import { goboArtForSlot, goboArtOfCap, isOpenGoboLabel } from './gobo-library.ts';

export interface Look {
  /** 0..1 over the full pan/tilt range of the fixture. */
  pan: number;
  tilt: number;
  /** 0..1 master intensity. */
  dimmer: number;
  /** Additive emitted colour, 0..1 per component (can exceed 1 with white/amber added). */
  r: number;
  g: number;
  b: number;
  /** false = shutter closed / blackout. */
  open: boolean;
  /** 0 = no strobe. */
  strobeHz: number;
  /** 0 = narrowest, 1 = widest. */
  zoom: number;
  /** 0 = open, 1..n = gobo slot. */
  gobo: number;
  /** Gobo motif: 1-based index into GOBO_ART (gobo-library.ts), 0 = unknown → slot fallback. */
  goboArt?: number;
  prism: boolean;
  /** Global white/amber emitter level (for warm-white cells in simple modes). */
  w?: number;
  /**
   * Per-cell colour (r, g, b per cell, before tint and master dimmer) for pixel
   * fixtures. NaN in r = this cell has no own channels → use the fixture colour.
   */
  cells?: Float32Array;
}

export const newLook = (): Look => ({
  pan: 0.5,
  tilt: 0.5,
  dimmer: 0,
  r: 1,
  g: 1,
  b: 1,
  open: true,
  strobeHz: 0,
  zoom: 0,
  gobo: 0,
  goboArt: 0,
  prism: false,
});

interface Slot {
  ch: ModeChannel;
  coarse: number;
  fine?: number;
}

export interface CompiledMode {
  def: FixtureDef;
  modeIndex: number;
  footprint: number;
  slots: Partial<Record<Attr, Slot>>;
  channels: ModeChannel[];
  /** Per cell: channel indices with their attribute (pixel fixtures). */
  cells: { attr: Attr; i: number }[][];
}

const CELL_ATTRS = new Set<Attr>(['red', 'green', 'blue', 'white', 'amber', 'uv', 'lime', 'dimmer']);

/**
 * Cell index per channel. Explicit (`cell` in the definition) or, for imported pixel
 * fixtures, every repeated colour block (R G B [W A UV]) becomes one cell.
 */
function cellOf(mode: ModeChannel[]): (number | undefined)[] {
  if (mode.some((c) => c.cell !== undefined || c.cells || c.group !== undefined)) return mode.map((c) => c.cell);
  const n = autoCellCount({ name: '', channels: mode });
  if (n < 2) return mode.map(() => undefined);
  const out: (number | undefined)[] = mode.map(() => undefined);
  const rgb = mode.some((c) => c.attr === 'red');
  let cell = -1;
  mode.forEach((c, i) => {
    if (c.byte !== 0 || !CELL_ATTRS.has(c.attr)) return;
    if (rgb) {
      if (c.attr === 'red') cell++;
      if (cell >= 0 && c.attr !== 'dimmer') out[i] = cell;
    } else if (c.attr === 'white' || c.attr === 'dimmer') {
      // Mono fixtures (blinders, dimmer bars): every intensity channel is a lamp.
      out[i] = ++cell;
    }
  });
  return out;
}

const MIX: Partial<Record<Attr, [number, number, number]>> = {
  red: [1, 0, 0],
  green: [0, 1, 0],
  blue: [0, 0, 1],
  white: [1, 1, 1],
  amber: [1, 0.55, 0],
  uv: [0.25, 0, 0.6],
  lime: [0.6, 1, 0.1],
};

export function compileMode(def: FixtureDef, modeIndex = 0): CompiledMode {
  const mode = def.modes[Math.min(modeIndex, def.modes.length - 1)];
  const slots: Partial<Record<Attr, Slot>> = {};
  const cellIdx = cellOf(mode.channels);
  const cells: { attr: Attr; i: number }[][] = [];
  cellIdx.forEach((c, i) => {
    if (c === undefined) return;
    (cells[c] ??= []).push({ attr: mode.channels[i].attr, i });
  });
  // Group channels (whole halo ring, all warm-white lenses …) → every cell of the group.
  const groups = def.visual?.cells ?? [];
  const first: number[] = [];
  groups.reduce((n, g, gi) => ((first[gi] = n), n + g.count), 0);
  mode.channels.forEach((ch, i) => {
    if (!ch.cells?.length) return;
    cellIdx[i] = -1;
    for (const k of ch.cells) (cells[k] ??= []).push({ attr: ch.attr, i });
  });
  mode.channels.forEach((ch, i) => {
    if (ch.group === undefined || !groups[ch.group]) return;
    cellIdx[i] = -1; // not fixture-wide
    for (let k = 0; k < groups[ch.group].count; k++) (cells[first[ch.group] + k] ??= []).push({ attr: ch.attr, i });
  });
  if (groups.length) {
    const total = groups.reduce((n, g) => n + g.count, 0);
    if (cells.length) for (let k = 0; k < total; k++) cells[k] ??= [];
  }
  for (let k = 0; k < cells.length; k++) cells[k] ??= [];
  mode.channels.forEach((ch, i) => {
    if (cellIdx[i] !== undefined) return; // per-cell channel, not a fixture-wide one
    const existing = slots[ch.attr];
    if (ch.byte === 0 && !existing) slots[ch.attr] = { ch, coarse: i };
    else if (ch.byte === 1 && existing && existing.fine === undefined) existing.fine = i;
  });
  // A fine channel listed before its coarse channel.
  mode.channels.forEach((ch, i) => {
    const s = slots[ch.attr];
    if (cellIdx[i] === undefined && ch.byte === 1 && s && s.fine === undefined && i !== s.coarse) s.fine = i;
  });
  return { def, modeIndex, footprint: mode.channels.length, slots, channels: mode.channels, cells };
}

const capAt = (caps: Capability[] | undefined, v: number) =>
  caps?.find((c) => v >= c.from && v <= c.to);

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', '').slice(0, 6), 16);
  if (Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function read(cm: CompiledMode, attr: Attr, dmx: Uint8Array, base: number): number | undefined {
  const s = cm.slots[attr];
  if (!s) return undefined;
  const hi = dmx[base + s.coarse] ?? 0;
  let v = s.fine !== undefined ? (hi * 256 + (dmx[base + s.fine] ?? 0)) / 65535 : hi / 255;
  if (s.ch.invert) v = 1 - v;
  return v;
}

const raw = (cm: CompiledMode, attr: Attr, dmx: Uint8Array, base: number) => {
  const s = cm.slots[attr];
  return s ? (dmx[base + s.coarse] ?? 0) : undefined;
};

/** @param base 0-based offset of the fixture's first channel inside `dmx`. */
export function decode(cm: CompiledMode, dmx: Uint8Array, base: number, out: Look): Look {
  out.pan = read(cm, 'pan', dmx, base) ?? 0.5;
  out.tilt = read(cm, 'tilt', dmx, base) ?? 0.5;
  out.dimmer = read(cm, 'dimmer', dmx, base) ?? 1;
  out.zoom = read(cm, 'zoom', dmx, base) ?? 0;

  // Colour: additive emitters, then subtractive CMY, then colour wheel filter.
  let r = 0,
    g = 0,
    b = 0,
    hasMix = false;
  for (const attr of Object.keys(MIX) as Attr[]) {
    const v = read(cm, attr, dmx, base);
    if (v === undefined) continue;
    hasMix = true;
    const m = MIX[attr]!;
    r += m[0] * v;
    g += m[1] * v;
    b += m[2] * v;
  }
  if (!hasMix) {
    r = g = b = 1;
    const c = read(cm, 'cyan', dmx, base);
    const m = read(cm, 'magenta', dmx, base);
    const y = read(cm, 'yellow', dmx, base);
    if (c !== undefined) r = 1 - c;
    if (m !== undefined) g = 1 - m;
    if (y !== undefined) b = 1 - y;
  }
  const cw = cm.slots.colorWheel;
  if (cw) {
    const cap = capAt(cw.ch.caps, dmx[base + cw.coarse] ?? 0);
    if (cap?.color) {
      const [cr, cg, cb] = hexToRgb(cap.color);
      r *= cr;
      g *= cg;
      b *= cb;
    }
  }
  out.r = r;
  out.g = g;
  out.b = b;
  out.w = (read(cm, 'white', dmx, base) ?? 0) + (read(cm, 'amber', dmx, base) ?? 0) * 0.6;

  // Pixel cells.
  if (cm.cells.length) {
    if (!out.cells || out.cells.length !== cm.cells.length * 3) out.cells = new Float32Array(cm.cells.length * 3);
    const c = out.cells;
    cm.cells.forEach((list, k) => {
      if (!list.length) {
        c[k * 3] = NaN;
        return;
      }
      let cr = 0,
        cg = 0,
        cb = 0,
        dim = 1,
        colour = false;
      for (const { attr, i } of list) {
        const v = (dmx[base + i] ?? 0) / 255;
        if (attr === 'dimmer') {
          dim = v;
          continue;
        }
        const mx = MIX[attr];
        if (!mx) continue;
        colour = true;
        cr += mx[0] * v;
        cg += mx[1] * v;
        cb += mx[2] * v;
      }
      if (!colour) cr = cg = cb = 1;
      c[k * 3] = cr * dim;
      c[k * 3 + 1] = cg * dim;
      c[k * 3 + 2] = cb * dim;
    });
  } else out.cells = undefined;

  // Shutter / strobe.
  out.open = true;
  out.strobeHz = 0;
  const sh = cm.slots.shutter;
  if (sh) {
    const v = dmx[base + sh.coarse] ?? 0;
    const cap = capAt(sh.ch.caps, v);
    if (sh.ch.caps?.length) {
      if (cap?.kind === 'closed') out.open = false;
      else if (cap?.kind === 'dimmer') {
        // Combined channel: this range is the master dimmer.
        out.dimmer *= cap.to > cap.from ? (v - cap.from) / (cap.to - cap.from) : 1;
      } else if (cap?.kind === 'strobe') {
        const [h0, h1] = cap.hz ?? [1, 20];
        const t = cap.to > cap.from ? (v - cap.from) / (cap.to - cap.from) : 0;
        out.strobeHz = h0 + (h1 - h0) * t;
      }
    } else if (v >= 10) {
      // Typical cheap fixture: 0-9 open, 10-255 strobe slow→fast.
      out.strobeHz = 1 + ((v - 10) / 245) * 19;
    }
  }

  // Gobo: slot number plus motif (explicit goboArt → label → stable slot fallback).
  out.gobo = 0;
  out.goboArt = 0;
  const gv = raw(cm, 'gobo', dmx, base);
  if (gv !== undefined) {
    const caps = cm.slots.gobo!.ch.caps;
    if (caps?.length) {
      const c = capAt(caps, gv);
      // QLC+ marks "White" / "Solid" / "None" as gobo macros – those are open.
      if (c?.gobo && !(c.goboArt === undefined && isOpenGoboLabel(c.label))) {
        out.gobo = c.gobo;
        out.goboArt = goboArtOfCap(c);
      }
    } else {
      out.gobo = gv < 16 ? 0 : 1 + Math.floor((gv - 16) / 32);
      out.goboArt = goboArtForSlot(out.gobo);
    }
  }

  // Prism.
  out.prism = false;
  const pv = raw(cm, 'prism', dmx, base);
  if (pv !== undefined) {
    const caps = cm.slots.prism!.ch.caps;
    out.prism = caps?.length ? capAt(caps, pv)?.kind === 'prism' : pv >= 128;
  }
  return out;
}

function write(cm: CompiledMode, attr: Attr, v01: number, dmx: Uint8Array, base: number) {
  const s = cm.slots[attr];
  if (!s) return;
  let v = Math.min(1, Math.max(0, v01));
  if (s.ch.invert) v = 1 - v;
  if (s.fine !== undefined) {
    const w = Math.round(v * 65535);
    dmx[base + s.coarse] = w >> 8;
    dmx[base + s.fine] = w & 255;
  } else dmx[base + s.coarse] = Math.round(v * 255);
}

const mid = (c: Capability) => Math.round((c.from + c.to) / 2);

/**
 * @param t optional show time: pixel fixtures then run a soft chase over their cells,
 *          so every pixel visibly gets its own value.
 */
export function encode(cm: CompiledMode, look: Look, dmx: Uint8Array, base: number, t?: number) {
  cm.channels.forEach((ch, i) => (dmx[base + i] = ch.default ?? 0));
  write(cm, 'pan', look.pan, dmx, base);
  write(cm, 'tilt', look.tilt, dmx, base);
  write(cm, 'dimmer', look.dimmer, dmx, base);
  write(cm, 'zoom', look.zoom, dmx, base);
  // Fixtures without a dimmer channel: scale the colour instead.
  const combinedDimmer = (cm.slots.shutter?.ch.caps ?? []).some((c) => c.kind === 'dimmer');
  const k = cm.slots.dimmer || combinedDimmer ? 1 : look.dimmer;

  if (cm.slots.red || cm.slots.green || cm.slots.blue) {
    write(cm, 'red', look.r * k, dmx, base);
    write(cm, 'green', look.g * k, dmx, base);
    write(cm, 'blue', look.b * k, dmx, base);
  } else if (cm.slots.cyan || cm.slots.magenta || cm.slots.yellow) {
    write(cm, 'cyan', 1 - look.r, dmx, base);
    write(cm, 'magenta', 1 - look.g, dmx, base);
    write(cm, 'yellow', 1 - look.b, dmx, base);
  } else if (cm.slots.white) {
    write(cm, 'white', k, dmx, base);
  }
  const cw = cm.slots.colorWheel;
  if (cw?.ch.caps?.length) {
    let best: Capability | undefined;
    let bestD = Infinity;
    for (const c of cw.ch.caps) {
      if (!c.color) continue;
      const [cr, cg, cb] = hexToRgb(c.color);
      const d = (cr - look.r) ** 2 + (cg - look.g) ** 2 + (cb - look.b) ** 2;
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    if (best) dmx[base + cw.coarse] = mid(best);
  }

  const sh = cm.slots.shutter;
  if (sh) {
    const caps = sh.ch.caps;
    if (caps?.length) {
      const dimCap = !cm.slots.dimmer ? caps.find((c) => c.kind === 'dimmer') : undefined;
      const pick = !look.open || (dimCap && look.dimmer <= 0)
        ? caps.find((c) => c.kind === 'closed') ?? dimCap
        : look.strobeHz > 0
          ? caps.find((c) => c.kind === 'strobe')
          : dimCap && look.dimmer < 0.999
            ? dimCap
            : caps.find((c) => c.kind === 'open') ?? dimCap;
      if (pick?.kind === 'dimmer') {
        dmx[base + sh.coarse] = Math.round(pick.from + Math.min(1, Math.max(0, look.dimmer)) * (pick.to - pick.from));
      } else if (pick?.kind === 'strobe') {
        const [h0, h1] = pick.hz ?? [1, 20];
        const t = h1 !== h0 ? (look.strobeHz - h0) / (h1 - h0) : 0;
        dmx[base + sh.coarse] = Math.round(pick.from + Math.min(1, Math.max(0, t)) * (pick.to - pick.from));
      } else if (pick) dmx[base + sh.coarse] = mid(pick);
    } else {
      dmx[base + sh.coarse] = look.strobeHz > 0 ? Math.round(10 + ((look.strobeHz - 1) / 19) * 245) : 0;
    }
  }

  // Pixel cells: colour of the look, modulated by a chase over the cells.
  if (cm.cells.length) {
    const kk = cm.slots.dimmer || combinedDimmer ? 1 : look.dimmer;
    const n = cm.cells.length;
    cm.cells.forEach((list, ci) => {
      const pat = t === undefined ? 1 : 0.55 + 0.45 * Math.sin(t * 3.2 - (ci / n) * Math.PI * 4);
      const hasRgb = list.some((x) => x.attr === 'red');
      for (const { attr, i } of list) {
        let v = 0;
        if (attr === 'red') v = look.r;
        else if (attr === 'green') v = look.g;
        else if (attr === 'blue') v = look.b;
        else if (attr === 'white') v = hasRgb ? Math.min(look.r, look.g, look.b) * 0.5 : 1;
        else if (attr === 'amber' || attr === 'uv' || attr === 'lime') v = 0;
        else if (attr === 'dimmer') v = 1;
        dmx[base + i] = Math.round(Math.min(1, Math.max(0, v * (attr === 'dimmer' ? pat * kk : hasRgb ? pat * kk : pat * kk))) * 255);
      }
    });
  }

  const gs = cm.slots.gobo;
  if (gs) {
    const caps = gs.ch.caps;
    if (caps?.length) {
      const c = caps.find((c) => (look.gobo ? c.gobo === look.gobo && (c.goboArt !== undefined || !isOpenGoboLabel(c.label)) : c.kind === 'open'));
      if (c) dmx[base + gs.coarse] = mid(c);
    } else dmx[base + gs.coarse] = look.gobo ? 16 + (look.gobo - 1) * 32 + 16 : 0;
  }

  const ps = cm.slots.prism;
  if (ps) {
    const caps = ps.ch.caps;
    if (caps?.length) {
      const c = caps.find((c) => c.kind === (look.prism ? 'prism' : 'open'));
      if (c) dmx[base + ps.coarse] = mid(c);
    } else dmx[base + ps.coarse] = look.prism ? 200 : 0;
  }
}
