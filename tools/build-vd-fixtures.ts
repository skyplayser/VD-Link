// Builds VD-Link's own fixture definitions (EPL-2.0) and adds them to the library:
//   - spec sheets in tools/vd-fixtures/catalog-*.ts (ids stay stable, they win on collisions)
//   - research spec sheets in docs/fixture-research/modes/<maker>.json (see tools/vd-fixtures/research.ts)
// Output:
//   public/fixtures/vd/<manufacturer>.json   – full definitions (incl. 3D model)
//   public/fixtures/index.json                – index entries (db 'vd')
//   docs/FIXTURES-VD.md                       – list with sources
// Run: npm run vd-fixtures   (after import-fixtures, which rewrites the index)
//
// Duplicates (same id, same maker + model as a catalog lamp, OFL/QLC+ or an earlier
// research spec, same data as another shop listing) are left out and listed, not fatal.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { FixtureDef, FixtureIndexEntry } from '../src/shared/fixture-types.ts';
import { compileMode } from '../src/shared/dmx-codec.ts';
import { resolveModel } from '../src/shared/fixture-model.ts';
import { build, type Spec } from './vd-fixtures/archetype.ts';
import { BETOPPER } from './vd-fixtures/catalog-betopper.ts';
import { PRO_FIXTURES } from './vd-fixtures/catalog-pro.ts';
import { UKING } from './vd-fixtures/catalog-uking.ts';
import { YUER } from './vd-fixtures/catalog-yuer.ts';
import { checkPossibleDuplicates, dataKey, GROUPS, loadResearchSpecs, type ResearchSpec } from './vd-fixtures/research.ts';

const OUT = path.resolve('public/fixtures');
const catalog: Spec[] = [...UKING, ...YUER, ...BETOPPER, ...PRO_FIXTURES];

const indexPath = path.join(OUT, 'index.json');
const index = (JSON.parse(readFileSync(indexPath, 'utf8')) as FixtureIndexEntry[]).filter((e) => e.db !== 'vd');
const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '');
const nameKey = (man: string, model: string) => norm(man.split(' ')[0]) + '|' + norm(model);
// Own lamps: '+' marks a different model (Fuze Profile / Fuze Profile+).
const ownKey = (man: string, model: string) => norm(man) + '|' + model.toLowerCase().replace(/[^a-z0-9+]/g, '');
const library = new Map(index.map((e) => [nameKey(e.manufacturer, e.model), e.id]));

const defs: FixtureDef[] = [];
const origin = new Map<string, { group: number; hints: string[] }>();
const ids = new Set<string>();
const names = new Map<string, string>();
const dataKeys = new Map<string, string>();
const problems: string[] = [];
const skipped: string[] = [];

/** Self-check: every mode compiles, footprint matches, the model resolves. */
function check(d: FixtureDef): string[] {
  const p: string[] = [];
  d.modes.forEach((m, i) => {
    const cm = compileMode(d, i);
    if (cm.footprint !== m.channels.length) p.push(`${d.id} ${m.name}: footprint`);
    const want = Number(/^(\d+)CH/.exec(m.name)?.[1]);
    if (want && want !== m.channels.length) p.push(`${d.id} ${m.name}: ${m.channels.length} Kanäle`);
  });
  const rm = resolveModel(d, d.modes.length - 1);
  if (!rm.body) p.push(`${d.id}: kein Modell`);
  return p;
}

function add(d: FixtureDef, group = 0, hints: string[] = []) {
  defs.push(d);
  ids.add(d.id);
  names.set(ownKey(d.manufacturer, d.model), d.id);
  origin.set(d.id, { group, hints });
}

// ---- 1. catalog spec sheets (must all build: locations refer to their ids)
for (const s of catalog) {
  const d = build(s);
  if (ids.has(d.id)) problems.push(`doppelte ID ${d.id}`);
  const lib = library.get(nameKey(d.manufacturer, d.model));
  if (lib) problems.push(`schon in der Bibliothek: ${d.manufacturer} ${d.model} (${lib})`);
  problems.push(...check(d));
  add(d);
  dataKeys.set(dataKey(s), d.id);
}

// ---- 2. research spec sheets (duplicates are left out)
const dup = checkPossibleDuplicates([...index, ...defs.map((d) => ({ id: d.id, type: d.type, modes: d.modes.map((m) => ({ name: m.name, channels: m.channels.length })) }) as FixtureIndexEntry)]);
for (const [s, why] of dup.skipped) skipped.push(`${s.man} ${s.model} – ${why}`);
const research: ResearchSpec[] = [...loadResearchSpecs(), ...dup.accepted];
const perGroup = new Map<number, { n: number; verified: number }>();
let hinted = 0;
let kindChanged = 0;
for (const r of research) {
  let s = r.spec;
  // Same name as an own lamp but other data: a variant (shop listings, old/new version).
  const same = names.get(ownKey(s.man, s.model));
  if (same && !s.verified && dataKeys.get(dataKey(s)) !== same) s = { ...s, model: `${s.model} (${s.ch.join('/')} CH)` };
  let d: FixtureDef;
  try {
    d = build(s);
  } catch (e) {
    problems.push(`${s.man} ${s.model}: ${String(e)}`);
    continue;
  }
  const shop = r.file === 'possible-duplicates.json';
  const why =
    ids.has(d.id) ? `ID ${d.id} schon vergeben`
    : names.has(ownKey(d.manufacturer, d.model)) ? `gleich wie ${names.get(ownKey(d.manufacturer, d.model))}`
    : library.has(nameKey(d.manufacturer, d.model)) ? `schon in der Bibliothek (${library.get(nameKey(d.manufacturer, d.model))})`
    : shop && dataKeys.has(dataKey(s)) ? `gleiche Daten wie ${dataKeys.get(dataKey(s))} (Shop-Eintrag)`
    : '';
  if (why) {
    skipped.push(`${d.manufacturer} ${d.model} – ${why}`);
    continue;
  }
  const p = check(d);
  if (p.length) {
    problems.push(...p);
    continue;
  }
  add(d, r.group, r.hints);
  dataKeys.set(dataKey(s), d.id);
  const g = perGroup.get(r.group) ?? { n: 0, verified: 0 };
  g.n++;
  if (d.source.verified) g.verified++;
  perGroup.set(r.group, g);
  if (r.hints.length) hinted++;
  if (r.hints.some((h) => h.startsWith('kind'))) kindChanged++;
}

// ---- bundles per manufacturer
const dir = path.join(OUT, 'vd');
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const byMan = new Map<string, FixtureDef[]>();
for (const d of defs) (byMan.get(d.manufacturer) ?? byMan.set(d.manufacturer, []).get(d.manufacturer)!).push(d);
const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
for (const [man, list] of byMan) {
  const file = `vd/${slug(man)}.json`;
  writeFileSync(path.join(OUT, file), JSON.stringify(list));
  for (const d of list)
    index.push({
      id: d.id,
      manufacturer: d.manufacturer,
      model: d.model,
      type: d.type,
      modes: d.modes.map((m) => ({ name: m.name, channels: m.channels.length })),
      db: 'vd',
      file,
      verified: d.source.verified,
    });
}
index.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer) || a.model.localeCompare(b.model));
writeFileSync(indexPath, JSON.stringify(index));

// ---- overview document
const cell = (x: string) => x.replace(/\|/g, '/').replace(/\s+/g, ' ');
const row = (d: FixtureDef) => {
  const m = resolveModel(d, d.modes.length - 1);
  const cells = m.cells.length ? `${m.cells.length} Zellen` : '';
  return `| ${cell(d.manufacturer)} | ${cell(d.model)} | ${m.body}${m.body === 'movinghead' || m.head === 'orb' ? ' / ' + m.head : ''} | ${cells} | ${d.modes.map((x) => x.name).join(', ')} | ${d.source.verified ? 'ja' : 'nein'} | ${d.source.url ? `[Link](${d.source.url})` : ''} |`;
};
const table = (list: FixtureDef[]) => `| Hersteller | Modell | 3D-Modell | Pixel/Linsen | Modi | Geprüft | Quelle |\n|---|---|---|---|---|---|---|\n${list.map(row).join('\n')}\n`;
const catDefs = defs.filter((d) => origin.get(d.id)!.group === 0);
const resDefs = defs.filter((d) => origin.get(d.id)!.group !== 0);
const verified = defs.filter((d) => d.source.verified).length;
const manCount = (list: FixtureDef[]) => {
  const m = new Map<string, number>();
  for (const d of list) m.set(d.manufacturer, (m.get(d.manufacturer) ?? 0) + 1);
  return [...m].map(([k, v]) => `${k}: ${v}`).join(' · ');
};
const groupLines = [1, 2, 3, 4].map((g) => {
  const list = resDefs.filter((d) => origin.get(d.id)!.group === g);
  const v = perGroup.get(g);
  return `- **${GROUPS[g]}:** ${list.length} Lampen${v?.verified ? `, davon ${v.verified} geprüft` : ''} (${manCount(list)})`;
});
const bodies = new Map<string, number>();
for (const d of defs) {
  const b = d.visual?.body ?? '?';
  bodies.set(b, (bodies.get(b) ?? 0) + 1);
}
writeFileSync(
  path.resolve('docs/FIXTURES-VD.md'),
  `# Eigene Fixture-Definitionen (VD-Link, EPL-2.0)\n\n` +
    `${defs.length} Lampen, davon ${verified} mit geprüfter Kanalbelegung. Erzeugt mit \`npm run vd-fixtures\` aus\n\n` +
    `- den Steckbriefen in \`tools/vd-fixtures/catalog-*.ts\` (${catDefs.length} Lampen) und\n` +
    `- den Steckbriefen der Fixture-Recherche in \`docs/fixture-research/modes/\` (${resDefs.length} Lampen, Methode und Quellen: \`docs/fixture-research/README.md\`).\n\n` +
    `**Geprüft = nein** heißt: Kanalzahl und Funktionen stammen aus den Herstellerangaben (bei Shop-Daten aus den Produkttexten), die Reihenfolge der Kanäle folgt dem typischen Schema dieser Lampenart. Vor einer echten Show mit dem Handbuch vergleichen (in der Bibliothek steht dazu ein Hinweis). **Geprüft = ja** heißt: Kanalfolge und Wertebereiche wurden aus dem DMX-Protokoll des Herstellers übertragen.\n\n` +
    `## Übersicht\n\n` +
    `- **Kataloge** (\`tools/vd-fixtures/\`): ${catDefs.length} Lampen (${manCount(catDefs)})\n` +
    groupLines.join('\n') +
    `\n\n3D-Bauformen: ${[...bodies].sort((a, b) => b[1] - a[1]).map(([b, n]) => `${b} ${n}`).join(' · ')}\n\n` +
    `${hinted} Recherche-Steckbriefe wurden um 3D-Angaben aus \`docs/fixture-research/models.json\` ergänzt, bei ${kindChanged} davon mit eigener Bauform (Scanner, Derby, Kugel, Arme, Leiste mit Einzelköpfen, GigBar …).\n\n` +
    `## Ausgelassene Dubletten (${skipped.length})\n\n` +
    `Gleiche ID, gleicher Hersteller und Modellname wie eine Katalog- oder Bibliothekslampe (OFL/QLC+), gleiche Daten wie ein anderer Shop-Eintrag oder laut \`possible-duplicates.json\` dasselbe Gerät (gleicher Typ, gemeinsame Kanalzahl).\n\n` +
    (skipped.length ? `<details><summary>Liste</summary>\n\n${skipped.map((x) => `- ${x}`).join('\n')}\n\n</details>\n\n` : '') +
    `## Kataloge\n\n${table(catDefs)}\n## Recherche\n\n${table(resDefs)}`,
);

// Licence note next to the imported databases (NOTICE.md is rewritten by import-fixtures).
const noticePath = path.join(OUT, 'NOTICE.md');
const notice = readFileSync(noticePath, 'utf8').replace(/\n\* \*\*VD-Link own fixture definitions\*\*[^\n]*\n?/, '\n');
writeFileSync(
  noticePath,
  notice.trimEnd() +
    `\n\n* **VD-Link own fixture definitions** (\`vd/*.json\`, ids \`vd:…\`) – written by the VD-Link project from makers' published specifications, data sheets and DMX charts (own data, no manufacturer files copied) – Eclipse Public License 2.0 (same as VD-Link).\n`,
);

const counts = [...byMan].map(([m, l]) => `${m}: ${l.length}`).join(' · ');
console.log(`${defs.length} eigene Fixtures (${catDefs.length} Kataloge, ${resDefs.length} Recherche, ${verified} geprüft); Index jetzt ${index.length} Einträge`);
for (const l of groupLines) console.log(l.replace(/\*\*/g, ''));
console.log(`${byMan.size} Hersteller: ${counts}`);
if (skipped.length) console.log(`Ausgelassene Dubletten: ${skipped.length} (Liste in docs/FIXTURES-VD.md)`);
if (process.env.VD_VERBOSE) console.log('  ' + skipped.join('\n  '));
if (problems.length) {
  console.log('Probleme:\n  ' + problems.join('\n  '));
  process.exitCode = 1;
}
