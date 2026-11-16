// Fixture library importer (build time).
//
//   sh tools/fetch-fixture-sources.sh      # downloads data only
//   npm run import-fixtures -- vendor-src public/fixtures
//
// Reads the Open Fixture Library (MIT) and QLC+ fixture definitions (Apache-2.0),
// converts both into the VD-Link format and writes:
//   public/fixtures/index.json             light search index
//   public/fixtures/<db>/<manufacturer>.json   full definitions
//   public/fixtures/NOTICE.md              licences + attribution
// Input files are treated purely as data (JSON / XML parsing, nothing executed).

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import type { Attr, Capability, FixtureDef, FixtureIndexEntry, FixtureMode, FixtureType, ModeChannel } from '../src/shared/fixture-types.ts';
import { compileMode } from '../src/shared/dmx-codec.ts';
import { goboArtFromLabel, isOpenGoboLabel } from '../src/shared/gobo-library.ts';

const SRC = path.resolve(process.argv[2] ?? 'vendor-src');
const OUT = path.resolve(process.argv[3] ?? 'public/fixtures');

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ------------------------------------------------------------------- helpers

function hz(v: unknown): number | undefined {
  if (typeof v !== 'string') return undefined;
  const m = v.match(/^([\d.]+)\s*Hz$/i);
  if (m) return Number(m[1]);
  const p = v.match(/^([\d.]+)%$/);
  if (p) return 1 + (Number(p[1]) / 100) * 24;
  if (/^(slow|slowest)/i.test(v)) return 1;
  if (/^(fast|fastest)/i.test(v)) return 20;
  return undefined;
}

function deg(v: unknown): number | undefined {
  if (typeof v !== 'string') return undefined;
  const m = v.match(/^(-?[\d.]+)deg$/);
  return m ? Number(m[1]) : undefined;
}

function typeFrom(s: string | undefined): FixtureType {
  const t = (s ?? '').toLowerCase();
  if (t.includes('moving head')) return 'movinghead';
  if (t.includes('scanner')) return 'scanner';
  if (t.includes('pixel') || t.includes('matrix')) return 'pixelbar';
  if (t.includes('bar')) return 'bar';
  if (t.includes('strobe')) return 'strobe';
  if (t.includes('blinder')) return 'blinder';
  if (t.includes('laser')) return 'laser';
  if (t.includes('hazer')) return 'hazer';
  if (t.includes('smoke') || t.includes('fog')) return 'smoke';
  if (t.includes('dimmer')) return 'dimmer';
  if (t.includes('color changer') || t.includes('par')) return 'par';
  if (t.includes('effect') || t.includes('flower')) return 'effect';
  return 'other';
}

const COLOR_ATTR: Record<string, Attr> = {
  red: 'red', green: 'green', blue: 'blue', white: 'white', 'warm white': 'white', 'cold white': 'white',
  amber: 'amber', uv: 'uv', indigo: 'uv', lime: 'lime', cyan: 'cyan', magenta: 'magenta', yellow: 'yellow',
};

/** Text heuristics for capabilities in shutter / combined channels. */
function shutterKindFromText(text: string): Capability['kind'] | undefined {
  const t = text.toLowerCase();
  if (/strob|flash|pulse|lightning|random/.test(t)) return 'strobe';
  if (/dimm|intensity|0\s*-\s*100\s*%|0%\s*-\s*100%/.test(t)) return 'dimmer';
  if (/clos|blackout|black out|^off$|^off\b|no light|led off|shutter off/.test(t)) return 'closed';
  if (/open|^on$|light on|full|no strobe|no function/.test(t)) return 'open';
  return undefined;
}

// ======================================================================= OFL

interface OflCap {
  dmxRange?: [number, number];
  type: string;
  color?: string;
  colors?: string[];
  shutterEffect?: string;
  speed?: string;
  speedStart?: string;
  speedEnd?: string;
  angleStart?: string;
  angleEnd?: string;
  angle?: string;
  wheel?: string | string[];
  slotNumber?: number;
  slotNumberStart?: number;
  brightnessStart?: string;
  comment?: string;
}
interface OflChannel {
  capability?: OflCap;
  capabilities?: OflCap[];
  fineChannelAliases?: string[];
  switchChannels?: Record<string, string>;
  defaultValue?: number | string;
  dmxValueResolution?: string;
}

function importOfl(): { defs: FixtureDef[]; aliases: { from: [string, string]; to: string }[] } {
  const root = path.join(SRC, 'ofl/fixtures');
  const manufacturers = JSON.parse(readFileSync(path.join(root, 'manufacturers.json'), 'utf8')) as Record<string, { name: string }>;
  const defs: FixtureDef[] = [];
  const aliases: { from: [string, string]; to: string }[] = [];

  for (const man of readdirSync(root, { withFileTypes: true })) {
    if (!man.isDirectory()) continue;
    const manName = manufacturers[man.name]?.name ?? man.name;
    for (const file of readdirSync(path.join(root, man.name))) {
      if (!file.endsWith('.json')) continue;
      let j: any;
      try {
        j = JSON.parse(readFileSync(path.join(root, man.name, file), 'utf8'));
      } catch {
        continue;
      }
      if (j.redirectTo) {
        aliases.push({ from: [manName, j.name], to: 'ofl:' + j.redirectTo });
        continue;
      }
      if (!j.availableChannels && !j.templateChannels) continue;
      try {
        defs.push(convertOfl(j, man.name, manName, file.replace(/\.json$/, '')));
      } catch (e) {
        console.warn('OFL skip', man.name, file, (e as Error).message);
      }
    }
  }
  return { defs, aliases };
}

function wheelKind(j: any, wheelName: string): 'colorWheel' | 'gobo' | 'prism' | 'other' {
  const slots: any[] = j.wheels?.[wheelName]?.slots ?? [];
  if (slots.some((s) => s.type === 'Gobo' || s.type === 'AnimationGoboStart')) return 'gobo';
  if (slots.some((s) => s.type === 'Color')) return 'colorWheel';
  if (slots.some((s) => s.type === 'Prism') || /prism/i.test(wheelName)) return 'prism';
  if (/gobo/i.test(wheelName)) return 'gobo';
  if (/colou?r/i.test(wheelName)) return 'colorWheel';
  return 'other';
}

function oflAttrOfCap(c: OflCap, j: any, channelName: string): Attr {
  switch (c.type) {
    case 'Pan':
    case 'PanContinuous':
      return 'pan';
    case 'Tilt':
    case 'TiltContinuous':
      return 'tilt';
    case 'Intensity':
      return 'dimmer';
    case 'ColorIntensity':
      return COLOR_ATTR[(c.color ?? '').toLowerCase()] ?? 'other';
    case 'ShutterStrobe':
    case 'StrobeSpeed':
      return 'shutter';
    case 'ColorPreset':
      return 'colorWheel';
    case 'WheelSlot':
    case 'WheelShake':
    case 'WheelRotation':
    case 'WheelSlotRotation': {
      const w = Array.isArray(c.wheel) ? c.wheel[0] : (c.wheel ?? channelName);
      const k = wheelKind(j, w);
      if (k === 'gobo' && c.type === 'WheelRotation') return 'goboRotation';
      return k;
    }
    case 'Zoom':
    case 'BeamAngle':
      return 'zoom';
    case 'Focus':
      return 'focus';
    case 'Prism':
    case 'PrismRotation':
      return 'prism';
    case 'Frost':
      return 'frost';
    case 'PanTiltSpeed':
      return 'speed';
    case 'Maintenance':
      return 'control';
    default:
      return 'other';
  }
}

function convertOfl(j: any, manKey: string, manName: string, key: string): FixtureDef {
  const avail: Record<string, OflChannel> = { ...(j.availableChannels ?? {}) };
  const physical: FixtureDef['physical'] = {};
  const p = j.physical ?? {};
  if (Array.isArray(p.dimensions)) physical.dims = p.dimensions;
  if (p.weight) physical.weightKg = p.weight;
  if (Array.isArray(p.lens?.degreesMinMax)) physical.beamDeg = p.lens.degreesMinMax;

  // Channel name → mode channel template (attr/caps), incl. fine aliases.
  const table = new Map<string, Omit<ModeChannel, 'name'>>();
  const addChannel = (name: string, ch: OflChannel) => {
    const caps: OflCap[] = ch.capabilities ?? (ch.capability ? [ch.capability] : []);
    // Dominant attribute by covered DMX range.
    const weight = new Map<Attr, number>();
    for (const c of caps) {
      const a = oflAttrOfCap(c, j, name);
      const [lo, hi] = c.dmxRange ?? [0, 255];
      weight.set(a, (weight.get(a) ?? 0) + (hi - lo + 1) + (a === 'other' ? -1000 : 0));
    }
    let attr: Attr = 'other';
    let best = -Infinity;
    for (const [a, w] of weight) if (w > best) [attr, best] = [a, w];
    if (caps.some((c) => c.type === 'ShutterStrobe')) attr = 'shutter';
    if (caps.length === 0) attr = 'other';

    const out: Capability[] = [];
    let invert = false;
    let gobos = 0;
    for (const c of caps) {
      const [from, to] = c.dmxRange ?? [0, 255];
      if (to > 255) continue; // 16-bit capability ranges – coarse handled generically
      if (c.type === 'ShutterStrobe') {
        const e = c.shutterEffect ?? '';
        if (e === 'Open') out.push({ from, to, kind: 'open' });
        else if (e === 'Closed') out.push({ from, to, kind: 'closed' });
        else out.push({ from, to, kind: 'strobe', hz: [hz(c.speedStart ?? c.speed) ?? 1, hz(c.speedEnd ?? c.speed) ?? 20] });
      } else if (c.type === 'Intensity' && attr === 'shutter') out.push({ from, to, kind: 'dimmer' });
      else if (c.type === 'ColorPreset' && c.colors?.length) out.push({ from, to, kind: 'color', color: c.colors[0] });
      else if (c.type === 'WheelSlot') {
        const w = Array.isArray(c.wheel) ? c.wheel[0] : (c.wheel ?? name);
        const slots: any[] = j.wheels?.[w]?.slots ?? [];
        const slot = slots[Math.floor((c.slotNumber ?? c.slotNumberStart ?? 1) - 1)];
        if (!slot) continue;
        if (slot.type === 'Open') out.push({ from, to, kind: 'open' });
        else if (slot.type === 'Color' && slot.colors?.length) out.push({ from, to, kind: 'color', color: slot.colors[0] });
        else if (slot.type === 'Gobo') {
          const idx = slots.filter((s) => s.type === 'Gobo').indexOf(slot) + 1;
          // Unnamed slots often point to an OFL gobo image ("gobos/10-circles") – its name is the motif.
          const res = typeof slot.resource === 'string' ? slot.resource.split('/').pop()!.replace(/-/g, ' ') : undefined;
          const label: string | undefined = slot.name ?? res;
          const art = goboArtFromLabel(slot.name) ?? goboArtFromLabel(res);
          out.push({ from, to, kind: 'gobo', gobo: idx || ++gobos, label, ...(art ? { goboArt: art } : {}) });
        } else if (slot.type === 'Prism') out.push({ from, to, kind: 'prism' });
      } else if (c.type === 'Prism') out.push({ from, to, kind: 'prism' });
      else if (c.type === 'NoFunction' && (attr === 'prism' || attr === 'gobo' || attr === 'colorWheel'))
        out.push({ from, to, kind: 'open' });
      else if (c.type === 'Pan' || c.type === 'Tilt') {
        const a0 = deg(c.angleStart);
        const a1 = deg(c.angleEnd);
        if (a0 !== undefined && a1 !== undefined) {
          if (c.type === 'Pan') physical.panDeg = Math.abs(a1 - a0);
          else physical.tiltDeg = Math.abs(a1 - a0);
        }
      } else if (c.type === 'Zoom' || c.type === 'BeamAngle') {
        const a0 = deg(c.angleStart);
        const a1 = deg(c.angleEnd);
        if (a0 !== undefined && a1 !== undefined) {
          invert = a0 > a1;
          physical.beamDeg ??= [Math.min(a0, a1), Math.max(a0, a1)];
        } else if (c.angleStart === 'wide' || c.angleEnd === 'narrow') invert = true;
      }
    }
    const def = typeof ch.defaultValue === 'number' ? ch.defaultValue : undefined;
    const base = { attr, caps: out.length ? out : undefined, invert: invert || undefined, default: def };
    table.set(name, { ...base, byte: 0 });
    (ch.fineChannelAliases ?? []).forEach((alias, i) =>
      table.set(alias, { attr, byte: (i === 0 ? 1 : 2) as 1 | 2, invert: invert || undefined }),
    );
  };
  for (const [name, ch] of Object.entries(avail)) addChannel(name, ch);
  // Switching channels: use the default target.
  for (const ch of Object.values(avail)) {
    for (const [alias, target] of Object.entries(ch.switchChannels ?? {})) {
      const t = table.get(target);
      if (t && !table.has(alias)) table.set(alias, t);
    }
  }

  // Matrix templates ($pixelKey).
  const pixelKeys: string[] = [];
  const mx = j.matrix;
  if (mx?.pixelKeys) for (const z of mx.pixelKeys) for (const y of z) for (const x of y) if (x) pixelKeys.push(x);
  else if (Array.isArray(mx?.pixelCount)) {
    const [X, Y, Z] = mx.pixelCount;
    const dims = [X, Y, Z].filter((n: number) => n > 1).length;
    for (let z = 1; z <= Z; z++)
      for (let y = 1; y <= Y; y++)
        for (let x = 1; x <= X; x++) pixelKeys.push(dims <= 1 ? String(Math.max(x, y, z)) : `(${x}, ${y}, ${z})`);
  }
  const templates: Record<string, OflChannel> = j.templateChannels ?? {};
  for (const [tname, ch] of Object.entries(templates))
    for (const key of pixelKeys) {
      const inst: OflChannel = JSON.parse(JSON.stringify(ch).replaceAll('$pixelKey', key));
      inst.fineChannelAliases = (ch.fineChannelAliases ?? []).map((a) => a.replaceAll('$pixelKey', key));
      addChannel(tname.replaceAll('$pixelKey', key), inst);
    }

  const modes: FixtureMode[] = [];
  for (const m of j.modes ?? []) {
    const channels: ModeChannel[] = [];
    for (const entry of m.channels ?? []) {
      if (entry === null) channels.push({ name: '–', attr: 'other', byte: 0 });
      else if (typeof entry === 'string') {
        const t = table.get(entry);
        channels.push({ name: entry, ...(t ?? { attr: 'other' as Attr, byte: 0 as const }) });
      } else if (entry?.insert === 'matrixChannels') {
        const keys: string[] = Array.isArray(entry.repeatFor) ? entry.repeatFor : pixelKeys;
        const tnames: (string | null)[] = entry.templateChannels ?? [];
        const push = (tn: string | null, key: string) => {
          if (tn === null) return channels.push({ name: '–', attr: 'other', byte: 0 });
          const n = tn.replaceAll('$pixelKey', key);
          const t = table.get(n);
          channels.push({ name: n, ...(t ?? { attr: 'other' as Attr, byte: 0 as const }) });
        };
        if (entry.channelOrder === 'perChannel') for (const tn of tnames) for (const k of keys) push(tn, k);
        else for (const k of keys) for (const tn of tnames) push(tn, k);
      }
    }
    modes.push({ name: m.name ?? `${channels.length}ch`, channels });
  }

  return {
    id: `ofl:${manKey}/${key}`,
    manufacturer: manName,
    model: j.name,
    type: typeFrom((j.categories ?? [])[0]),
    physical,
    modes,
    source: {
      db: 'ofl',
      license: 'MIT',
      authors: j.meta?.authors,
      url: `https://open-fixture-library.org/${manKey}/${key}`,
    },
  };
}

// ====================================================================== QLC+

const QLC_PRESET: Record<string, [Attr, 0 | 1]> = {
  IntensityMasterDimmer: ['dimmer', 0], IntensityMasterDimmerFine: ['dimmer', 1],
  IntensityDimmer: ['dimmer', 0], IntensityDimmerFine: ['dimmer', 1],
  IntensityRed: ['red', 0], IntensityRedFine: ['red', 1], IntensityGreen: ['green', 0], IntensityGreenFine: ['green', 1],
  IntensityBlue: ['blue', 0], IntensityBlueFine: ['blue', 1], IntensityCyan: ['cyan', 0], IntensityCyanFine: ['cyan', 1],
  IntensityMagenta: ['magenta', 0], IntensityMagentaFine: ['magenta', 1], IntensityYellow: ['yellow', 0], IntensityYellowFine: ['yellow', 1],
  IntensityAmber: ['amber', 0], IntensityAmberFine: ['amber', 1], IntensityWhite: ['white', 0], IntensityWhiteFine: ['white', 1],
  IntensityUV: ['uv', 0], IntensityUVFine: ['uv', 1], IntensityIndigo: ['uv', 0], IntensityIndigoFine: ['uv', 1],
  IntensityLime: ['lime', 0], IntensityLimeFine: ['lime', 1],
  PositionPan: ['pan', 0], PositionPanFine: ['pan', 1], PositionTilt: ['tilt', 0], PositionTiltFine: ['tilt', 1],
  SpeedPanSlowFast: ['speed', 0], SpeedPanFastSlow: ['speed', 0], SpeedTiltSlowFast: ['speed', 0], SpeedTiltFastSlow: ['speed', 0],
  SpeedPanTiltSlowFast: ['speed', 0], SpeedPanTiltFastSlow: ['speed', 0],
  ColorMacro: ['colorWheel', 0], ColorWheel: ['colorWheel', 0], ColorWheelFine: ['colorWheel', 1],
  GoboWheel: ['gobo', 0], GoboWheelFine: ['gobo', 1], GoboIndex: ['goboRotation', 0], GoboIndexFine: ['goboRotation', 1],
  ShutterStrobeSlowFast: ['shutter', 0], ShutterStrobeFastSlow: ['shutter', 0],
  BeamFocusNearFar: ['focus', 0], BeamFocusFarNear: ['focus', 0], BeamFocusFine: ['focus', 1],
  BeamZoomSmallBig: ['zoom', 0], BeamZoomBigSmall: ['zoom', 0], BeamZoomFine: ['zoom', 1],
  PrismRotationSlowFast: ['prism', 0], PrismRotationFastSlow: ['prism', 0],
  NoFunction: ['other', 0],
};

const asArr = <T>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const text = (v: any): string => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : (v?.['#text'] ?? '')).toString();

function qlcChannel(ch: any): Omit<ModeChannel, 'name'> {
  const preset: string | undefined = ch['@_Preset'];
  const group = text(ch.Group);
  const byte = Number(ch.Group?.['@_Byte'] ?? 0) === 1 ? 1 : 0;
  const caps = asArr(ch.Capability);
  const name = String(ch['@_Name'] ?? '');
  let attr: Attr = 'other';
  let b: 0 | 1 = byte;
  let invert = false;

  if (preset && QLC_PRESET[preset]) {
    [attr, b] = QLC_PRESET[preset];
    invert = /FastSlow|BigSmall|FarNear/.test(preset);
  } else {
    switch (group) {
      case 'Pan': attr = 'pan'; break;
      case 'Tilt': attr = 'tilt'; break;
      case 'Intensity': attr = COLOR_ATTR[text(ch.Colour).toLowerCase()] ?? 'dimmer'; break;
      case 'Colour': attr = 'colorWheel'; break;
      case 'Gobo': attr = 'gobo'; break;
      case 'Shutter': attr = 'shutter'; break;
      case 'Prism': attr = 'prism'; break;
      case 'Speed': attr = 'speed'; break;
      case 'Maintenance': attr = 'control'; break;
      case 'Beam':
        attr = /zoom/i.test(name) ? 'zoom' : /focus/i.test(name) ? 'focus' : /frost/i.test(name) ? 'frost' : 'other';
        break;
      default:
        attr = 'other';
    }
  }
  // Combined "Dimmer / Strobe" channels in Effect/other groups.
  const strobeCaps = caps.filter((c: any) => /^(Strobe|Pulse|Ramp)/.test(c['@_Preset'] ?? '') || /strob/i.test(text(c)));
  if ((attr === 'other' || attr === 'dimmer') && strobeCaps.length && caps.length > 1) attr = 'shutter';
  if (attr === 'other' && /^(dimmer|master|intensity)/i.test(name) && caps.length <= 1) attr = 'dimmer';

  const out: Capability[] = [];
  let gobo = 0;
  for (const c of caps) {
    const from = Number(c['@_Min'] ?? 0);
    const to = Number(c['@_Max'] ?? 255);
    const p: string = c['@_Preset'] ?? '';
    const label = text(c).trim();
    if (attr === 'shutter') {
      let kind = p === 'ShutterOpen' ? 'open' : p === 'ShutterClose' ? 'closed' : /^(Strobe|Pulse|Ramp|Lightning)/.test(p) ? 'strobe' : undefined;
      kind ??= shutterKindFromText(label) ?? (p === 'ColorMacro' && /#0{6}/.test(c['@_Res1'] ?? '') ? 'closed' : undefined);
      if (!kind) continue;
      const cap: Capability = { from, to, kind: kind as Capability['kind'], label };
      if (kind === 'strobe') {
        const r1 = Number(c['@_Res1']);
        const r2 = Number(c['@_Res2']);
        cap.hz = p === 'StrobeFreqRange' && r1 && r2 ? [r1, r2] : p === 'StrobeFrequency' && r1 ? [r1, r1] : p.includes('FastToSlow') ? [20, 1] : [1, 20];
      }
      out.push(cap);
    } else if (attr === 'colorWheel') {
      const col = c['@_Res1'] ?? c['@_Color'];
      if (typeof col === 'string' && col.startsWith('#')) out.push({ from, to, kind: 'color', color: col, label });
      else if (/open|white/i.test(label)) out.push({ from, to, kind: 'color', color: '#ffffff', label });
    } else if (attr === 'gobo') {
      // "Open", "White", "Solid", "None" on a gobo wheel = no gobo.
      if ((/open/i.test(label) && !/gobo\s*\d/i.test(label)) || isOpenGoboLabel(label)) out.push({ from, to, kind: 'open', label });
      else if (p.startsWith('Gobo') || /gobo/i.test(label)) out.push({ from, to, kind: 'gobo', gobo: ++gobo, label });
    } else if (attr === 'prism') {
      if (/no prism|prism off|^off$|open|no function/i.test(label)) out.push({ from, to, kind: 'open', label });
      else if (/prism|facet|on/i.test(label) || p.startsWith('Prism')) out.push({ from, to, kind: 'prism', label });
    }
  }
  return { attr, byte: b, invert: invert || undefined, caps: out.length ? out : undefined };
}

function importQlc(): FixtureDef[] {
  const root = path.join(SRC, 'qlcplus/resources/fixtures');
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', parseAttributeValue: false, trimValues: true });
  const defs: FixtureDef[] = [];
  for (const man of readdirSync(root, { withFileTypes: true })) {
    if (!man.isDirectory()) continue;
    for (const file of readdirSync(path.join(root, man.name))) {
      if (!file.endsWith('.qxf')) continue;
      try {
        const x = parser.parse(readFileSync(path.join(root, man.name, file), 'utf8')).FixtureDefinition;
        if (!x) continue;
        const table = new Map<string, Omit<ModeChannel, 'name'>>();
        for (const ch of asArr<any>(x.Channel)) table.set(String(ch['@_Name']), qlcChannel(ch));
        const physicalOf = (ph: any): FixtureDef['physical'] => {
          if (!ph) return {};
          const d = ph.Dimensions ?? {};
          const l = ph.Lens ?? {};
          const f = ph.Focus ?? {};
          const out: FixtureDef['physical'] = {};
          const w = Number(d['@_Width']), h = Number(d['@_Height']), dp = Number(d['@_Depth']);
          if (w && h) out.dims = [w, h, dp || w];
          if (Number(d['@_Weight'])) out.weightKg = Number(d['@_Weight']);
          const a = Number(l['@_DegreesMin']), b = Number(l['@_DegreesMax']);
          if (b > 0) out.beamDeg = [a || b, b];
          if (Number(f['@_PanMax'])) out.panDeg = Number(f['@_PanMax']);
          if (Number(f['@_TiltMax'])) out.tiltDeg = Number(f['@_TiltMax']);
          return out;
        };
        let physical = physicalOf(x.Physical);
        const modes: FixtureMode[] = [];
        for (const m of asArr<any>(x.Mode)) {
          const chans = asArr<any>(m.Channel)
            .map((c) => ({ n: Number(c['@_Number'] ?? 0), name: text(c) }))
            .sort((a, b) => a.n - b.n);
          modes.push({
            name: String(m['@_Name'] ?? ''),
            channels: chans.map(({ name }) => ({ name, ...(table.get(name) ?? { attr: 'other' as Attr, byte: 0 as const }) })),
          });
          if (!physical.panDeg && m.Physical) physical = { ...physicalOf(m.Physical), ...physical };
        }
        const manName = String(x.Manufacturer ?? man.name);
        const model = String(x.Model ?? file);
        defs.push({
          id: `qlc:${slug(manName)}/${slug(model)}`,
          manufacturer: manName,
          model,
          type: typeFrom(String(x.Type ?? '')),
          physical,
          modes,
          source: { db: 'qlcplus', license: 'Apache-2.0', authors: asArr<any>(x.Creator?.Author).map(String) },
        });
      } catch (e) {
        console.warn('QLC+ skip', man.name, file, (e as Error).message);
      }
    }
  }
  return defs;
}

// ===================================================================== write

const ofl = importOfl();
const qlc = importQlc();

// Manufacturer display names: prefer OFL spelling.
const manDisplay = new Map<string, string>();
for (const d of ofl.defs) manDisplay.set(norm(d.manufacturer), d.manufacturer);
for (const d of qlc) d.manufacturer = manDisplay.get(norm(d.manufacturer)) ?? d.manufacturer;

const seen = new Set(ofl.defs.map((d) => norm(d.manufacturer) + '|' + norm(d.model)));
const qlcUnique = qlc.filter((d) => !seen.has(norm(d.manufacturer) + '|' + norm(d.model)));
const all = [...ofl.defs, ...qlcUnique].filter((d) => d.modes.length > 0);

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
const bundles = new Map<string, FixtureDef[]>();
const index: FixtureIndexEntry[] = [];
for (const d of all) {
  const file = `${d.source.db === 'ofl' ? 'ofl' : 'qlc'}/${slug(d.manufacturer) || 'unknown'}.json`;
  (bundles.get(file) ?? bundles.set(file, []).get(file)!).push(d);
  index.push({
    id: d.id,
    manufacturer: d.manufacturer,
    model: d.model,
    type: d.type,
    modes: d.modes.map((m) => ({ name: m.name, channels: m.channels.length })),
    db: d.source.db,
    file,
  });
}
const byId = new Map(index.map((e) => [e.id, e]));
let aliasCount = 0;
for (const a of ofl.aliases) {
  const target = byId.get(a.to);
  if (!target) continue;
  index.push({ ...target, manufacturer: a.from[0], model: a.from[1], aliasOf: `${target.manufacturer} ${target.model}` });
  aliasCount++;
}
index.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer) || a.model.localeCompare(b.model));

for (const [file, defs] of bundles) {
  mkdirSync(path.join(OUT, path.dirname(file)), { recursive: true });
  writeFileSync(path.join(OUT, file), JSON.stringify(defs));
}
writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index));

const lic = (f: string) => (existsSync(path.join(SRC, f)) ? readFileSync(path.join(SRC, f), 'utf8') : '(see upstream)');
writeFileSync(
  path.join(OUT, 'NOTICE.md'),
  `# Fixture data – third-party notices\n\n` +
    `VD-Link ships fixture definitions converted from:\n\n` +
    `* **Open Fixture Library** – https://github.com/OpenLightingProject/open-fixture-library – MIT License. ` +
    `Per-fixture authors are kept in each definition (\`source.authors\`).\n` +
    `* **QLC+ fixture definitions** – https://github.com/mcallegari/qlcplus (resources/fixtures) – Apache License 2.0. ` +
    `Converted (modified) into the VD-Link format; per-fixture authors are kept in \`source.authors\`.\n\n` +
    `## Open Fixture Library – MIT License\n\n\`\`\`\n${lic('ofl-LICENSE.txt')}\n\`\`\`\n\n` +
    `## QLC+ – Apache License 2.0\n\n\`\`\`\n${lic('qlcplus-LICENSE.txt').slice(0, 12000)}\n\`\`\`\n`,
);

// ------------------------------------------------------------------- report

function usable(d: FixtureDef) {
  const cm = compileMode(d, d.modes.length - 1);
  const s = cm.slots;
  const hasLight = !!(s.dimmer || s.red || s.white || s.cyan || (s.shutter?.ch.caps ?? []).some((c) => c.kind === 'dimmer'));
  return { moves: !!(s.pan && s.tilt), hasLight };
}
const heads = all.filter((d) => d.type === 'movinghead');
const headsOk = heads.filter((d) => {
  const u = usable(d);
  return u.moves && u.hasLight;
});
const china = ['uking', 'betopper', 'yuer', 'shehds', 'lixada', 'ehaho', 'mfl', 'stage4'];
console.log(`OFL:      ${ofl.defs.length} Fixtures (+${aliasCount} Marken-Klone/Aliase)`);
console.log(`QLC+:     ${qlc.length} Fixtures, davon ${qlcUnique.length} nicht schon in OFL`);
console.log(`Gesamt:   ${all.length} Fixtures, ${new Set(all.map((d) => norm(d.manufacturer))).size} Hersteller`);
console.log(`Moving Heads: ${heads.length}, davon vollständig erkannt (Pan+Tilt+Licht): ${headsOk.length} (${Math.round((headsOk.length / heads.length) * 100)} %)`);
for (const c of china) {
  const list = index.filter((e) => norm(e.manufacturer).startsWith(c));
  if (list.length) console.log(`  ${c.padEnd(9)} ${String(list.length).padStart(3)} Einträge (${list.filter((e) => e.type === 'movinghead').length} Moving Heads)`);
}
const size = [...bundles.keys()].length;
console.log(`Geschrieben: ${OUT}/index.json + ${size} Hersteller-Dateien + NOTICE.md`);
