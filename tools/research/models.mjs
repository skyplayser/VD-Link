// Maps every researched fixture to a spec kind + 3D hints → docs/fixture-research/models.json
// (read by tools/vd-fixtures/research.ts). Local files only. Run: node tools/research/models.mjs
// Generic rules (name, notes, light, pixels, ring); rerun when new research files arrive.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const DIR = new URL('../../docs/fixture-research/', import.meta.url).pathname;
const files = readdirSync(DIR).filter((f) => f.endsWith('.json') && f !== 'models.json').sort();

const KIND_BODY = {
  beam: 'movinghead/beam', spot: 'movinghead/spot', hybrid: 'movinghead/spot', profile: 'movinghead/profile', wash: 'movinghead/wash',
  beeeye: 'movinghead/beeeye', matrixhead: 'movinghead/matrix', lasermh: 'movinghead/beam', multihead: 'movinghead/matrix',
  par: 'par', cob: 'cob', bar: 'bar', matrix: 'strobe', tiltbar: 'tiltbar', retro: 'retro', blinder: 'blinder', strobe: 'strobe',
  laser: 'laser', ufo: 'ufo', panel: 'panel', tube: 'tube', fresnel: 'fresnel', pc: 'fresnel', ellipsoidal: 'profile', par64: 'par',
  flood: 'panel', effect: 'effect',
  // own shapes
  spider: 'spider', follow: 'follow', scanner: 'scanner', multibar: 'multibar', arms: 'arms', derby: 'derby', ball: 'derby/orb', dot: 'movinghead/orb', gigbar: 'gigbar',
};
const OWN = new Set(['spider', 'follow', 'scanner', 'multibar', 'arms', 'derby', 'ball', 'dot', 'gigbar']);

const WORD_N = { dual: 2, double: 2, two: 2, twin: 2, three: 3, four: 4, quad: 4, five: 5, six: 6, eight: 8 };
const num = (s) => (s == null ? NaN : WORD_N[String(s).toLowerCase()] ?? Number(s));

function ledColor(t) {
  const s = t.toUpperCase().replace(/[\s+\-/]/g, '');
  if (/RGBWAUV|RGBWAU\b|RGBWAUV|RGBAWUV|6IN1/.test(s)) return 'rgbwauv';
  if (/RGBALC|RGBLAC|RGBWAC/.test(s)) return 'rgbwa';
  if (/RGBWA|RGBAW|5IN1/.test(s)) return 'rgbwa';
  if (/RGBAUV|RGBAU/.test(s)) return 'rgbauv';
  if (/RGBAL/.test(s)) return 'rgbal';
  if (/RGBL/.test(s)) return 'rgbl';
  if (/RGBW|4IN1/.test(s)) return 'rgbw';
  if (/RGBA/.test(s)) return 'rgba';
  if (/RGB|3IN1/.test(s)) return 'rgb';
  if (/WWCW|CWWW|WARMCOOL|COOLWARM|BICOLOU?R|DUALCOLOU?R|TUNABLE|KALTWARM|WARMKALT/.test(s)) return 'wwcw';
  if (/WARMWEI|WARMWHITE|\bWW\b|3200K|3000K|2700K|GOLD/.test(s) || /^WW/.test(s)) return 'ww';
  if (/KALTWEI|COOLWHITE|COLDWHITE|\bCW\b|6500K|5600K|8000K|7000K/.test(s)) return 'cw';
  if (/AMBER/.test(s)) return 'amber';
  if (/UV/.test(s)) return 'uv';
  if (/WEI|WHITE/.test(s)) return 'white';
  return null;
}

/** "19 x 40 W RGBL", "19x40W RGBW", "7*40W", "36 x 15 W" → [n, colour]. */
function parseLeds(light) {
  if (!light) return null;
  const m = /(\d{1,4})\s*(?:x|×|\*|pcs|stk)\s*\d+(?:[.,]\d+)?\s*w/i.exec(light) ?? /(\d{1,4})\s*(?:x|×|\*)\s*(?:\d+(?:[.,]\d+)?\s*)?(?:w\b|led)/i.exec(light);
  const col = ledColor(light);
  if (!m) return col && /led|cob/i.test(light) ? [1, col] : null;
  return [Number(m[1]), col ?? 'rgbw'];
}

function hints(x, kind) {
  const h = {};
  const leds = parseLeds(x.light);
  const px = x.pixels ? String(x.pixels) : '';
  const grid = /(\d+)\s*[x×]\s*(\d+)/.exec(px);
  const lin = /(\d+)\s*(?:linear|Köpfe|Zellen|Pixel|LEDs|Segmente|Zonen|\(Hex\)|$)/i.exec(px);
  if (leds && leds[0] > 0) h.leds = leds;
  if (grid) {
    h.grid = [Number(grid[1]), Number(grid[2])];
    if (!h.leds) h.leds = [h.grid[0] * h.grid[1], ledColor(x.light ?? '') ?? 'rgbw'];
  } else if (lin && !h.leds) h.leds = [Number(lin[1]), ledColor(x.light ?? '') ?? 'rgbw'];
  if (x.ring) {
    const r = String(x.ring);
    const n = /(\d+)\s*(?:x|×|LEDs|SMD|RGB|Pixel)/i.exec(r);
    h.ring = [n ? Number(n[1]) : 24, ledColor(r) ?? 'rgb'];
  }
  if (Array.isArray(x.sizeMm) && x.sizeMm.length === 3 && x.sizeMm.every((v) => v > 0)) h.size = x.sizeMm;
  if (Array.isArray(x.beamDeg) && x.beamDeg[0] > 0) h.deg = x.beamDeg;
  if ((kind === 'beeeye' || kind === 'matrixhead' || kind === 'derby' || kind === 'ball') && h.deg) h.cellDeg = h.deg[0];
  return h;
}

function classify(x) {
  const name = `${x.model}`;
  // Notes may name library ids ("vd:yuer/6x10w-six-arm") – those are no shape hints.
  const notes = String(x.notes ?? '').replace(/\b(?:vd|ofl|qlc):[\w/.-]+/g, '');
  const text = `${x.model} ${notes} ${x.pixels ?? ''} ${x.light ?? ''}`;
  const k0 = x.kind;
  const heads = /(\d+|dual|double|two|twin|three|four|five|six|eight)[\s-]*(?:heads?|köpfe|kopf|eyes?)\b/i.exec(text);
  const isBar = /\bbar\b|leiste|wave|linear|1x\d+ köpfe/i.test(text);
  // Not a lamp at all.
  if (/hazer|haze machine|fog|smoke|nebel|bubble|seifenblas|snow|schnee|confetti|konfetti|co2|\\bspark(?:s|ular)?\\b|cold spark|funken|fan\b|ventilator|controller|steuer|dimmerpack|dimmer pack|splitter|truss|stativ ohne|stand only|case\b/i.test(name) && !/light|led|lamp|strobe|par\b/i.test(name))
    return { kind: null, rule: 'kein Lichtgerät' };
  if (k0 === 'scanner' || ((k0 === 'effect' || k0 == null) && /\bscan|scanner|roller|spiegel|mirror(?! ?ball)/i.test(name))) return { kind: 'scanner', rule: 'Spiegelscanner' };
  if (/gig ?bar|\bpartybar|\bfx ?bar\b|lightset|light set|stativ-bar|t-bar|lichtanlage|system with .*(?:par|derby|ball)|on a stand|auf stativ/i.test(text) && k0 !== 'tiltbar' && k0 !== 'bar' && k0 !== 'tube') return { kind: 'gigbar', rule: 'Set auf T-Bar/Stativ' };
  if (/\barms?\b|arme\b|octopus|tentakel|tentacle/i.test(text) && /moving|head|arm/i.test(text)) return { kind: 'arms', rule: 'Mehrarm-Effekt' };
  if (/spider/i.test(text) && k0 !== 'laser') return { kind: 'spider', rule: 'Spider (kippende Leisten im Bügel)' };
  if (k0 === 'multihead' || k0 === 'tiltbar' || k0 === 'beam' || k0 === 'hybrid' || k0 === 'matrixhead' || k0 == null) {
    if (/einzeln\w* (beweg|kipp|pan|tilt)|einzelköpfe|tornado|tornadot|\btb ?5|magic ?blade neo|chorus ?line|moving head (wave )?bar|wave bar|light bar beam/i.test(text) || (heads && isBar && num(heads[1]) >= 3))
      return { kind: 'multibar', rule: 'Leiste mit Einzelköpfen', heads: heads ? num(heads[1]) : undefined };
    if (/magic ?dot|kugelförmig|double balls|\bball head|\bsphere\b/i.test(text) && /moving|head|kopf|endlos/i.test(text)) return { kind: 'dot', rule: 'Kugelkopf' };
    if (heads && num(heads[1]) >= 2 && num(heads[1]) <= 4 && !/laser/i.test(name)) return { kind: 'spider', rule: 'mehrere Köpfe an einem Bügel', heads: num(heads[1]) };
  }
  if (k0 === 'effect' || k0 == null) {
    if (/derby|moon ?flower|mushroom|kinta|flower|gem\b|circus|swarm|centerpiece|helicopter|copter|butterfly/i.test(text)) return { kind: 'derby', rule: 'Derby/Moonflower' };
    if (/(?<!mirror |disco |spiegel)ball\b|sphere|globe|kugel(?!förmig)/i.test(text) && !/mirror ?ball|spiegelkugel|disco ?ball/i.test(text)) return { kind: 'ball', rule: 'Kugel-Effekt' };
    if (/mirror ?ball|spiegelkugel|disco ?ball/i.test(text)) {
      if (/led|moving|strobe|laser|beam/i.test(text)) return { kind: 'ball', rule: 'Kugel-Effekt' };
      return { kind: null, rule: 'Spiegelkugel (Deko, kein DMX-Licht)' };
    }
  }
  if (k0 === 'follow') return { kind: 'follow', rule: 'Verfolger' };
  if (k0 === 'strobe' && x.ring) return { kind: 'strobe', rule: 'runder Strobe mit Ring (retro-Körper)' };
  if (k0) return { kind: k0, rule: 'Kategorie der Recherche' };
  // Unknown kind: guess from the name.
  const g = [
    [/moving ?head|\bmh\b|lyre/i, /wash/i.test(name) ? 'wash' : /beam/i.test(name) ? 'beam' : 'spot'],
    [/laser/i, 'laser'], [/strobe|flash/i, 'strobe'], [/blinder/i, 'blinder'], [/\bcob\b/i, 'cob'], [/\bpar\b|pod|can\b/i, 'par'],
    [/bar|batten|strip|leiste/i, 'bar'], [/tube|röhre/i, 'tube'], [/panel/i, 'panel'], [/fresnel/i, 'fresnel'], [/profile|ellips|leko/i, 'ellipsoidal'],
    [/flood|cyc|wash/i, 'flood'], [/black ?light|black-|uv\b|blb/i, 'bar'],
  ];
  for (const [re, k] of g) if (re.test(name)) return { kind: k, rule: 'aus dem Namen geraten' };
  return { kind: 'effect', rule: 'unbekannt → Effekt-Box' };
}

const out = [];
const stats = {};
for (const f of files) {
  for (const x of JSON.parse(readFileSync(DIR + f, 'utf8'))) {
    const c = classify(x);
    const e = { manufacturer: x.manufacturer, model: x.model, kind: c.kind };
    if (c.kind) {
      const body = KIND_BODY[c.kind] ?? 'effect';
      const h = hints(x, c.kind);
      if (c.heads && c.kind === 'multibar') h.grid = [1, c.heads];
      // Long bodies: spec size is [length, width, depth] – the source order varies.
      if (h.size && (c.kind === 'multibar' || c.kind === 'gigbar')) {
        const [a, b, d] = [...h.size].sort((p, q) => p - q);
        h.size = [d, a, b];
      }
      if (c.kind === 'multibar' && !h.grid) {
        // Heads: LED count (1 per head) or the number in the model name (Chorus Line 16).
        const nn = Number(/\b(\d{1,2})\b/.exec(x.model)?.[1] ?? 0);
        const n = h.leds && h.leds[0] >= 3 && h.leds[0] <= 24 ? h.leds[0] : nn >= 3 && nn <= 24 ? nn : 0;
        if (n) h.grid = [1, n];
        if (n && (!h.leds || h.leds[0] < n)) h.leds = [n, h.leds?.[1] ?? 'rgbw'];
      }
      if (c.heads && c.kind === 'spider') h.grid = [c.heads, Math.max(1, Math.round((h.leds?.[0] ?? c.heads) / c.heads))];
      if (c.kind === 'strobe' && x.ring) e.body = 'retro';
      else e.body = body;
      e.standard = !OWN.has(c.kind);
      if (Object.keys(h).length) e.visualHints = h;
    } else e.standard = null;
    e.rule = c.rule;
    if (x.inLibrary) e.inLibrary = x.inLibrary;
    out.push(e);
    const key = `${e.kind}|${e.body ?? '-'}|${e.standard}`;
    stats[key] = (stats[key] ?? 0) + 1;
  }
}
writeFileSync(DIR + 'models.json', '[\n' + out.map((e) => '  ' + JSON.stringify(e)).join(',\n') + '\n]\n');
console.log(out.length, 'entries');
for (const [k, v] of Object.entries(stats).sort((a, b) => b[1] - a[1])) console.log(String(v).padStart(5), k);
