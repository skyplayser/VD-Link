// Generic gobo motifs shared by the fixture data, the DMX decoder and the renderer.
// The motifs are our own procedural drawings (src/render/gobos.ts) of shapes that are
// common on moving-head gobo wheels – no manufacturer artwork. See docs/GOBOS.md.
//
// - GOBO_ART: motif list; index + 1 = atlas tile (0 = open / no gobo).
// - goboArtFromLabel(): capability label ("Dots", "Breakup", "Gobo 3 (Star) shake") → motif.
// - goboArtOfCap(): motif for a gobo capability (explicit goboArt → label → slot fallback).
// - standardGoboWheel(): typical gobo wheel channel (open, gobos, shake, scroll) per fixture kind.

import type { Capability } from './fixture-types.ts';

export const GOBO_ART = [
  { id: 'dots-ring', de: 'Punkte-Ring', en: 'Dots ring' },
  { id: 'rays', de: 'Strahlen', en: 'Rays' },
  { id: 'breakup', de: 'Breakup (Laub)', en: 'Breakup' },
  { id: 'tunnel', de: 'Tunnel (Ringe)', en: 'Tunnel' },
  { id: 'triangle', de: 'Dreieck', en: 'Triangle' },
  { id: 'bars', de: 'Linien', en: 'Bars' },
  { id: 'spiral', de: 'Spirale', en: 'Spiral' },
  { id: 'flame', de: 'Flamme', en: 'Flame' },
  { id: 'water', de: 'Wasser', en: 'Water' },
  { id: 'star', de: 'Stern', en: 'Star' },
  { id: 'shards', de: 'Splitter', en: 'Shards' },
  { id: 'flower', de: 'Blume', en: 'Flower' },
  { id: 'cross', de: 'Kreuz', en: 'Cross' },
  { id: 'window', de: 'Fenster', en: 'Window' },
  { id: 'dot-grid', de: 'Punktraster', en: 'Dot grid' },
  { id: 'bubbles', de: 'Blasen', en: 'Bubbles' },
  { id: 'beam-reducer', de: 'Strahlreduzierer', en: 'Beam reducer' },
  { id: 'ring', de: 'Kreisring', en: 'Ring' },
  { id: 'three-dots', de: 'Drei Punkte', en: 'Three dots' },
  { id: 'snowflake', de: 'Schneeflocke', en: 'Snowflake' },
  { id: 'square', de: 'Quadrat', en: 'Square' },
  { id: 'eclipse', de: 'Sichel', en: 'Eclipse' },
  { id: 'segments', de: 'Segmentring', en: 'Segments' },
  { id: 'grid', de: 'Gitter', en: 'Grid' },
] as const;

export type GoboArtId = (typeof GOBO_ART)[number]['id'];

export const GOBO_ART_COUNT = GOBO_ART.length;

const INDEX = new Map<string, number>(GOBO_ART.map((a, i) => [a.id, i + 1]));

/** 1-based atlas index of a motif id, 0 if unknown. */
export const goboArtIndex = (id: string | undefined): number => (id ? (INDEX.get(id) ?? 0) : 0);

/** English display name of a motif. */
export const goboArtName = (id: GoboArtId): string => GOBO_ART[goboArtIndex(id) - 1].en;

// Our own names (id, English, German) map back exactly, e.g. "Dots ring" or "Dots ring shake".
const BY_NAME = new Map<string, GoboArtId>(
  GOBO_ART.flatMap((a) => [a.id, a.en, a.de].map((n) => [n.toLowerCase().replace(/-/g, ' '), a.id] as [string, GoboArtId])),
);

// Label keywords → motif, checked in this order (specific before generic). Covers the
// names used in OFL wheel slots / resources and QLC+ capability texts.
const RULES: [GoboArtId, RegExp][] = [
  ['beam-reducer', /beam ?reducer|reducer|pin ?hole|aperture|small (dot|circle|hole)|^\(?beam\)?$|\(beam\)|^hole$/],
  ['three-dots', /\b(two|three|four|five|2|3|4|5)[ -]dots?\b|dots? row|linear dots|multi.?dots?|four eyes|eyes/],
  ['dot-grid', /dot ?(grid|matrix|raster)|pointed grid|many (small )?dots|dots? (field|pattern)|starry|sprinkle|confetti|space lice|dots in space/],
  ['water', /water|wave|ripple|rain(?!bow)|ocean|\bsea\b|aqua|liquid|shower/],
  ['spiral', /spiral|swirl|twist|vortex|hurricane|galaxy|whirl|hypno|milky|twirl|helix|yin/],
  ['segments', /segment|\bpie\b|sector|triptych|quarter|propeller|mower|blade|machete|\bfan\b|biohazard|radioactive/],
  ['grid', /grid|mesh|woven|weav|\bnet\b|web|chess|checker|lattice|circuit|cage|honeycomb|hexagon/],
  ['tunnel', /tunnel|concentric|rings\b|target|bullseye|bull's eye|eccentric|orbit/],
  ['flame', /flame|fire|burn|lava|heat|torch|inferno/],
  ['breakup', /break.?up|leaf|leaves|foliage|forest|tree|branch|cloud|organic|splotch|blob|camo|dapple|abstract|random|dune|clouds|bolts/],
  ['shards', /shard|shatter|glass|crack|fractur|\bice\b|stone|splash|shred|broken|splinter/],
  ['snowflake', /snow|flake|crystal/],
  ['star', /star|asterisk|astrisk|compass|nova/],
  ['rays', /\bray|sun|burst|spoke|radial (line|bar)|beams|fuzzy/],
  ['flower', /flower|rose|petal|daisy|bloom|lotus|mandala|rosette|caro|knot|clover|lollipop/],
  ['triangle', /triang|pyramid|delta|darts?\b|arrow|kite|sail/],
  ['cross', /cross|plus|\+|crosshair/],
  ['window', /window|frame|pane|blind|venetian|shutter|door/],
  ['square', /square|rectangle|\bbox|diamond/],
  ['eclipse', /eclipse|moon|crescent|half|planet/],
  ['bubbles', /bubble|circles|bokeh|drops?|droplet|balls?|eggs?|cells/],
  ['ring', /\bring\b|donut|annulus|circle|circular/],
  ['bars', /\bbars?\b|lines?|stripe|slash|slot|zebra|stick/],
  ['dots-ring', /dots?|points?|holes|radial/],
];

/** Labels that QLC+ files mark as gobo macros but that mean "no gobo". */
export const isOpenGoboLabel = (label: string | undefined): boolean =>
  !!label && /^\s*(open|solid|white|none|no gobo|empty|blank|no function)\b/i.test(label) && !/gobo\s*\d/i.test(label);

/** Motif for a capability label, or undefined if the label is generic ("Gobo 3", "Gobo 3 shake"). */
export function goboArtFromLabel(label: string | undefined): GoboArtId | undefined {
  if (!label) return undefined;
  const s = label
    .toLowerCase()
    .replace(/\b(indexed|continuous|rotating)?\s*gobo\s*\d*/g, ' ')
    .replace(/\b(shak\w*|swin\w*|slow|fast|to|from|speed|increasing|decreasing|glass|metal|static|rotat\w*|scroll\w*)\b/g, ' ')
    .replace(/[()\[\]:,>]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!s) return undefined;
  const exact = BY_NAME.get(s.replace(/\s+/g, ' '));
  if (exact) return exact;
  for (const [id, re] of RULES) if (re.test(s)) return id;
  return undefined;
}

// Unlabelled slots: stable order modelled on a typical spot/beam wheel. The first four
// match the original four demo gobos so existing shows look the same.
const SPOT_ORDER: GoboArtId[] = [
  'dots-ring', 'rays', 'breakup', 'tunnel', 'triangle', 'bars', 'spiral', 'flame', 'water', 'star',
  'shards', 'flower', 'cross', 'window', 'dot-grid', 'bubbles', 'snowflake', 'ring', 'eclipse', 'segments',
  'grid', 'square', 'three-dots', 'beam-reducer',
];
// Beam fixtures (Sharpy-style, 7R/17R China beams): aerial shapes first.
const BEAM_ORDER: GoboArtId[] = [
  'beam-reducer', 'dots-ring', 'ring', 'triangle', 'star', 'bars', 'three-dots', 'cross', 'square', 'rays',
  'eclipse', 'spiral', 'snowflake', 'dot-grid', 'tunnel', 'flower', 'segments', 'grid', 'bubbles', 'window',
  'breakup', 'shards', 'water', 'flame',
];

/** Fallback motif index (1-based) for gobo slot n when nothing else is known. */
export const goboArtForSlot = (slot: number): number =>
  slot > 0 ? goboArtIndex(SPOT_ORDER[(slot - 1) % SPOT_ORDER.length]) : 0;

// decode() runs per fixture and frame → cache per capability (validated, the fixture
// builder edits capabilities in place).
const capCache = new WeakMap<Capability, { art?: string; label?: string; gobo?: number; idx: number }>();

/** Motif index (1-based) for a gobo capability: explicit goboArt → label → slot fallback. */
export function goboArtOfCap(c: Capability): number {
  const hit = capCache.get(c);
  if (hit && hit.art === c.goboArt && hit.label === c.label && hit.gobo === c.gobo) return hit.idx;
  let idx = goboArtIndex(c.goboArt) || goboArtIndex(goboArtFromLabel(c.label));
  if (!idx) {
    // "Gobo 2 shake" belongs to slot 2 even if the importer numbered it differently.
    const n = Number(/gobo\s*(\d+)/i.exec(c.label ?? '')?.[1] ?? c.gobo ?? 0);
    idx = goboArtForSlot(n || (c.gobo ?? 0));
  }
  capCache.set(c, { art: c.goboArt, label: c.label, gobo: c.gobo, idx });
  return idx;
}

export interface GoboWheelOptions {
  /** Add one shake range per gobo (default true). */
  shake?: boolean;
  /** Add wheel scroll ranges (default true). */
  scroll?: boolean;
  /** Explicit motif order instead of the typical one for the fixture kind. */
  motifs?: GoboArtId[];
}

/**
 * Typical gobo wheel channel for a fixture kind, `count` gobos plus open.
 * - 'beam' (Sharpy / China 7R-17R style): narrow 4-value slots from 0 (open 0–3),
 *   wheel scroll up to 159 (stop 114–117), shake ranges 160–255.
 * - everything else (spot, profile, hybrid, LED spot – Maverick / Viper style):
 *   slots in 0–63 (8 wide when they fit, open first), shake 64–127,
 *   scroll CW 128–191, CCW 192–255.
 * Every gobo capability carries `gobo` (slot) and `goboArt` (motif id); shake ranges are
 * gobo capabilities too, so the projection keeps showing the motif.
 */
export function standardGoboWheel(kind: string, count: number, opt: GoboWheelOptions = {}): Capability[] {
  const n = Math.max(1, Math.min(30, Math.round(count)));
  const beam = kind === 'beam';
  const order = opt.motifs?.length ? opt.motifs : beam ? BEAM_ORDER : SPOT_ORDER;
  const art = (i: number) => order[(i - 1) % order.length];
  const name = (i: number) => goboArtName(art(i));
  const caps: Capability[] = [];

  const staticEnd = beam ? 72 : 64; // first value after the static slots
  const w = Math.max(2, Math.min(beam ? 4 : 8, Math.floor(staticEnd / (n + 1))));
  caps.push({ from: 0, to: w - 1, kind: 'open', label: 'Open' });
  for (let i = 1; i <= n; i++) caps.push({ from: i * w, to: i * w + w - 1, kind: 'gobo', gobo: i, goboArt: art(i), label: name(i) });
  const used = (n + 1) * w;
  if (used < staticEnd) caps.push({ from: used, to: staticEnd - 1, kind: 'open', label: 'Open' });

  const shakeRange = (from: number, to: number) => {
    if (opt.shake === false) return caps.push({ from, to, kind: 'open', label: 'Open' });
    const sw = Math.max(1, Math.floor((to - from + 1) / n));
    for (let i = 1; i <= n; i++) {
      const a = from + (i - 1) * sw;
      if (a > to) break;
      caps.push({ from: a, to: i === n ? to : Math.min(to, a + sw - 1), kind: 'gobo', gobo: i, goboArt: art(i), label: `${name(i)} shake` });
    }
  };
  const scroll = (from: number, to: number, label: string) =>
    caps.push(opt.scroll === false ? { from, to, kind: 'open', label: 'Open' } : { from, to, kind: 'generic', label });

  if (beam) {
    scroll(72, 113, 'Wheel scroll CW fast → slow');
    caps.push({ from: 114, to: 117, kind: 'open', label: 'Stop' });
    scroll(118, 159, 'Wheel scroll CCW slow → fast');
    shakeRange(160, 255);
  } else {
    shakeRange(64, 127);
    scroll(128, 191, 'Wheel scroll CW slow → fast');
    scroll(192, 255, 'Wheel scroll CCW slow → fast');
  }
  return caps;
}
