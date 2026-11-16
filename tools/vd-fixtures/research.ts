// Spec sheets from the fixture research (docs/fixture-research/modes/<maker>.json,
// written by the research agents from makers' data sheets, shop texts and – for the
// verified ones – public DMX charts). This file loads them for build-vd-fixtures.ts:
// - 3D hints from docs/fixture-research/models.json are added where the spec has none
//   (and the kind is replaced when the spec only has a generic one, e.g. 'effect' → 'derby'),
// - possible-duplicates.json is checked against the library: same type and a shared mode
//   size → duplicate (left out), otherwise built as its own lamp.

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import type { FixtureIndexEntry } from '../../src/shared/fixture-types.ts';
import { build, type Kind, type LedColor, type Spec } from './archetype.ts';

const DIR = path.resolve('docs/fixture-research');
const MODES = path.join(DIR, 'modes');
const SKIP = new Set(['missing-data.json', 'possible-duplicates.json']);

const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Research group per research file (docs/fixture-research/README-gruppeN.md). */
export const GROUPS: Record<number, string> = {
  1: 'Gruppe 1 · High-End, Touring & Theater',
  2: 'Gruppe 2 · Mittelklasse, Verleih & Club',
  3: 'Gruppe 3 · China-Direktvertrieb & Budget',
  4: 'Gruppe 4 · China OEM/ODM & Eigenmarken',
};
function groupOfFile(): Map<string, number> {
  const m = new Map<string, number>();
  for (const g of [1, 2, 3, 4]) {
    const txt = readFileSync(path.join(DIR, `README-gruppe${g}.md`), 'utf8');
    for (const x of txt.matchAll(/`([a-z0-9-]+\.json)`/g)) if (!m.has(x[1])) m.set(x[1], g);
  }
  return m;
}

interface ModelHint {
  manufacturer: string;
  model: string;
  kind: Kind | null;
  standard: boolean | null;
  visualHints?: { leds?: [number, LedColor]; grid?: [number, number]; ring?: [number, LedColor]; size?: [number, number, number]; deg?: [number, number]; cellDeg?: number };
}

/** Spec kinds that only name a category – an own shape from models.json fits better. */
const GENERIC: Kind[] = ['effect', 'multihead', 'tiltbar', 'beam', 'matrixhead', 'lasermh', 'ufo'];
/** Moving heads: research sizes are whole-fixture sizes, not head sizes (see modes/README.md). */
const NO_SIZE: Kind[] = ['beam', 'spot', 'hybrid', 'profile', 'wash', 'beeeye', 'matrixhead', 'lasermh', 'multihead', 'dot', 'arms', 'spider', 'scanner'];

export interface ResearchSpec {
  spec: Spec;
  group: number;
  file: string;
  /** What was taken from models.json ('kind effect→derby', 'leds', …). */
  hints: string[];
}

function applyHints(s: Spec, h: ModelHint | undefined): { spec: Spec; used: string[] } {
  const used: string[] = [];
  let kind = s.kind;
  // Obvious set names the research filed as bar / strobe / moving head.
  if (/gig ?bar/i.test(s.model) && !/bridge/i.test(s.model) && kind !== 'gigbar') kind = 'gigbar';
  else if (h?.standard === false && h.kind && h.kind !== s.kind && GENERIC.includes(s.kind)) kind = h.kind;
  if (kind !== s.kind) used.push(`kind ${s.kind}→${kind}`);
  const out: Spec = { ...s, kind };
  const v = h?.visualHints;
  if (v) {
    if (!out.leds && v.leds && !['beam', 'spot', 'hybrid', 'profile', 'lasermh', 'laser'].includes(kind)) (out.leds = v.leds), used.push('leds');
    if (!out.grid && v.grid) (out.grid = v.grid), used.push('grid');
    if (!out.ring && v.ring) (out.ring = v.ring), used.push('ring');
    if (!out.size && v.size && !NO_SIZE.includes(kind)) (out.size = v.size), used.push('size');
    if (!out.deg && v.deg) (out.deg = v.deg), used.push('deg');
    if (!out.cellDeg && v.cellDeg) (out.cellDeg = v.cellDeg), used.push('cellDeg');
  }
  // Own shapes: one LED per head / arm unless the spec says otherwise.
  if ((kind === 'multibar' || kind === 'gigbar') && !out.grid) {
    const n = out.leds?.[0] ?? 0;
    if (n >= 2 && n <= 24) out.grid = [1, n];
  }
  return { spec: out, used };
}

/** All research spec sheets (verified ones first, so they win over unverified duplicates). */
export function loadResearchSpecs(): ResearchSpec[] {
  const groups = groupOfFile();
  const hints: ModelHint[] = JSON.parse(readFileSync(path.join(DIR, 'models.json'), 'utf8'));
  const hintBy = new Map(hints.map((h) => [norm(h.manufacturer) + '|' + norm(h.model), h]));
  const out: ResearchSpec[] = [];
  for (const file of readdirSync(MODES).filter((f) => f.endsWith('.json') && !SKIP.has(f)).sort()) {
    // Spec → research entry (same model name, else same product URL) → models.json entry.
    const research: { manufacturer: string; model: string; url?: string }[] = JSON.parse(readFileSync(path.join(DIR, file), 'utf8'));
    const byModel = new Map(research.map((r) => [norm(r.model), r]));
    const byUrl = new Map<string, (typeof research)[number] | null>();
    for (const r of research) if (r.url) byUrl.set(r.url, byUrl.has(r.url) ? null : r);
    for (const raw of JSON.parse(readFileSync(path.join(MODES, file), 'utf8')) as Spec[]) {
      const r = byModel.get(norm(raw.model)) ?? (raw.url ? byUrl.get(raw.url) : undefined) ?? undefined;
      const h = r ? hintBy.get(norm(r.manufacturer) + '|' + norm(r.model)) : undefined;
      // Verified specs keep their data: cell indices in the modes refer to their own cells.
      const { spec, used } = raw.verified ? { spec: raw, used: [] } : applyHints(raw, h);
      out.push({ spec, group: groups.get(file) ?? 0, file, hints: used });
    }
  }
  return out.sort((a, b) => Number(!!b.spec.verified) - Number(!!a.spec.verified));
}

export interface DuplicateCheck {
  accepted: ResearchSpec[];
  /** Left out: [spec, reason]. */
  skipped: [Spec, string][];
}

/**
 * possible-duplicates.json: the research marked these shop entries as "maybe already in
 * the library" (note: "Mögliche Dublette von <id>"). Same fixture type and a shared mode
 * size → the same device (left out); otherwise an own lamp.
 */
export function checkPossibleDuplicates(index: FixtureIndexEntry[]): DuplicateCheck {
  const groups = groupOfFile();
  const list: Spec[] = JSON.parse(readFileSync(path.join(MODES, 'possible-duplicates.json'), 'utf8'));
  const byId = new Map(index.map((e) => [e.id, e]));
  const accepted: ResearchSpec[] = [];
  const skipped: [Spec, string][] = [];
  const file = (s: Spec) => [...groups.keys()].find((f) => norm(f.replace('.json', '')) === norm(s.man)) ?? '';
  for (const raw of list) {
    const ref = /Dublette von ((?:vd|ofl|qlcplus):[^\s,]+?)[,.]?(?:\s|$)/.exec(raw.note ?? '')?.[1];
    const e = ref ? byId.get(ref) : undefined;
    const d = build(raw);
    const sizes = new Set(d.modes.map((m) => m.channels.length));
    if (e && e.type === d.type && e.modes.some((m) => sizes.has(m.channels))) {
      skipped.push([raw, `gleich wie ${ref} (Typ ${e.type}, gemeinsame Kanalzahl)`]);
      continue;
    }
    const why = e ? `geprüft: anderes Gerät als ${ref} (${e.type !== d.type ? 'anderer Typ' : 'andere Kanalzahlen'})` : 'geprüft: Verweis nicht in der Bibliothek';
    const spec: Spec = { ...raw, note: `${(raw.note ?? '').replace(/\s*Mögliche Dublette von [^\s]+?[,.]?(?=\s|$)/, '').trim()} ${why}.`.trim() };
    accepted.push({ spec, group: groups.get(file(raw)) ?? 3, file: 'possible-duplicates.json', hints: [] });
  }
  return { accepted, skipped };
}

/** Same data (shop listings of one device under different titles). */
export const dataKey = (s: Spec) =>
  [norm(s.man), s.kind, JSON.stringify(s.leds ?? null), s.ch.join(','), [...(s.feat ?? [])].sort().join(','), JSON.stringify(s.deg ?? null)].join('|');
