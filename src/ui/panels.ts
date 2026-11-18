// Tab panels: PATCH, BIBLIOTHEK, VIDEOWÄNDE, VERBINDEN.
// Each panel has render() (rebuild) and tick() (live values while visible).

import { compileMode } from '../shared/dmx-codec.ts';
import { patchCsv } from '../shared/demo-rig.ts';
import type { FixtureDef, FixtureIndexEntry } from '../shared/fixture-types.ts';
import { VD_GENERIC_MH } from '../shared/fixtures/vd-generic-mh.ts';
import { FixturePreview } from '../render/fixture-preview.ts';
import type { Ctx, DmxMode } from './ctx.ts';
import { el, icon, seg } from './dom.ts';
import { getLang, t } from './i18n.ts';
import { ma2Assistant } from './ma2.ts';

export interface Panel {
  render(): void;
  tick(): void;
}

const TYPE_LABEL: Record<string, [string, string]> = {
  movinghead: ['Moving Head', 'Moving head'], scanner: ['Scanner', 'Scanner'], par: ['PAR / Washer', 'PAR / wash'],
  bar: ['Bar', 'Bar'], pixelbar: ['Pixel-Bar', 'Pixel bar'], strobe: ['Strobe', 'Strobe'], blinder: ['Blinder', 'Blinder'],
  laser: ['Laser', 'Laser'], effect: ['Effekt', 'Effect'], dimmer: ['Dimmer', 'Dimmer'], hazer: ['Hazer', 'Hazer'],
  smoke: ['Nebel', 'Fog'], other: ['Sonstige', 'Other'],
};
const typeLabel = (t: string) => (TYPE_LABEL[t] ?? [t, t])[getLang() === 'en' ? 1 : 0];

function head(title: string, sub: string, ...actions: HTMLElement[]) {
  const h = el('div', 'headrow');
  const l = el('div');
  l.append(el('h1', 'page', title), el('p', 'muted', sub));
  const r = el('div', 'row');
  r.append(...actions);
  h.append(l, r);
  return h;
}

function button(label: string, onClick: () => void, cls = 'btn', ic?: string) {
  const b = el('button', cls);
  if (ic) b.append(icon(ic));
  b.append(document.createTextNode(label));
  b.onclick = onClick;
  return b;
}

// =================================================================== PATCH

export class PatchPanel implements Panel {
  private swatches: HTMLElement[] = [];
  constructor(private root: HTMLElement, private ctx: Ctx) {}

  render() {
    const rig = this.ctx.rig();
    if (!rig) return;
    const w = el('div', 'wrap');
    w.append(
      head(
        rig.types.length === 1 ? `${t('patch.title')}: ${rig.types[0].def.manufacturer} ${rig.types[0].def.model}` : t('patch.title'),
        `${rig.types.map((x) => `${x.count}× ${x.def.model} (${x.def.modes[x.modeIndex]?.name})`).join(' · ')} · ${t('patch.sub', { n: rig.fixtures.length, u: rig.universes })}`,
        button(t('patch.change'), () => this.ctx.goTab('library'), 'btn'),
        button(t('patch.csv'), () => this.download(), 'btn primary', 'download'),
      ),
    );
    const tw = el('div', 'table-wrap');
    const tb = el('table');
    tb.innerHTML = `<thead><tr><th>${t('patch.col.nr')}</th><th>${t('patch.col.group')}</th><th>${t('patch.col.fixture')}</th><th>${t('patch.col.addr')}</th><th>${t('patch.col.ch')}</th><th>${t('patch.col.pos')}</th><th>${t('patch.col.mount')}</th><th>${t('patch.col.live')}</th></tr></thead>`;
    const body = el('tbody');
    this.swatches = [];
    for (const f of rig.fixtures) {
      const tr = el('tr');
      const sw = el('span', 'swatch');
      this.swatches.push(sw);
      const live = el('td');
      live.append(sw);
      tr.append(
        el('td', 'n', String(f.index + 1)),
        el('td', '', f.group),
        el('td', '', `${f.def.manufacturer} ${f.def.model}`),
        el('td', 'mono', `${f.universe}.${String(f.address).padStart(3, '0')}`),
        el('td', 'n', `${f.address}–${f.address + f.cm.footprint - 1}`),
        el('td', 'n', f.pos.map((v) => v.toFixed(1)).join(' / ')),
        el('td', '', f.mount === 'hang' ? t('patch.hang') : t('patch.floor')),
        live,
      );
      body.append(tr);
    }
    tb.append(body);
    tw.append(tb);
    w.append(tw);
    this.root.replaceChildren(w);
  }

  tick() {
    const looks = this.ctx.looks();
    this.swatches.forEach((sw, i) => {
      const l = looks[i];
      if (!l) return;
      const k = l.open ? l.dimmer : 0;
      const c = (v: number) => Math.round(Math.min(1, v * k) * 255);
      sw.style.background = `rgb(${c(l.r)},${c(l.g)},${c(l.b)})`;
    });
  }

  private download() {
    const rig = this.ctx.rig();
    if (!rig) return;
    const blob = new Blob(['﻿' + patchCsv(rig)], { type: 'text/csv;charset=utf-8' });
    const a = el('a');
    a.href = URL.createObjectURL(blob);
    a.download = `VD-Link-Patch-${rig.scenario.id}-${rig.def.model.replace(/[^\w-]+/g, '_')}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
}

// ================================================================= LIBRARY

/**
 * The same maker is spelled differently across OFL, QLC+ and our own research
 * ("cameo"/"Cameo", "Clay Paky"/"Claypaky" …). The library shows one name per maker;
 * fixture ids stay untouched, so saved projects keep working.
 */
const MAKER_ALIASES: Record<string, string> = {
  'clay paky': 'Claypaky',
  'u`king': 'UKing',
  'american dj': 'ADJ',
  'robe lighting': 'Robe',
  blizzard: 'Blizzard Lighting',
  'img stage line': 'IMG Stageline',
  glx: 'GLX Lighting',
  'martin professional': 'Martin',
  'elation professional': 'Elation',
};
const makerKey = (m: string) => m.toLowerCase().replace(/[^a-z0-9]/g, '');

function unifyMakers(index: FixtureIndexEntry[]) {
  for (const e of index) e.manufacturer = MAKER_ALIASES[e.manufacturer.toLowerCase()] ?? e.manufacturer;
  // Remaining case/space variants: use the most common spelling.
  const spell = new Map<string, Map<string, number>>();
  for (const e of index) {
    const k = makerKey(e.manufacturer);
    const m = spell.get(k) ?? spell.set(k, new Map()).get(k)!;
    m.set(e.manufacturer, (m.get(e.manufacturer) ?? 0) + 1);
  }
  const best = new Map([...spell].map(([k, m]) => [k, [...m].sort((a, b) => b[1] - a[1] || (a[0] === a[0].toUpperCase() ? 1 : -1))[0][0]]));
  for (const e of index) e.manufacturer = best.get(makerKey(e.manufacturer)) ?? e.manufacturer;
}

export class LibraryPanel implements Panel {
  private index: FixtureIndexEntry[] = [];
  private byId = new Map<string, FixtureIndexEntry>();
  /** Lower-case "manufacturer model" per entry, built once (search runs on every key). */
  private hay = new WeakMap<FixtureIndexEntry, string>();
  private bundles = new Map<string, Promise<FixtureDef[]>>();
  private selected: FixtureDef = VD_GENERIC_MH;
  private q = '';
  private type = '';
  private searchTimer = 0;
  /** Makers opened by the user (no search) / closed by the user (while searching). */
  private open = new Set<string>();
  private closedInSearch = new Set<string>();
  private list = el('ul');
  private more = el('div', 'muted small lib-more');
  private detail = el('div', 'lib-detail');
  private previewBox = el('div', 'lib-preview');
  private preview: FixturePreview | null = null;
  private previewInit: Promise<FixturePreview | null> | null = null;
  /** Gallery mode (location builder): an "add" button instead of "use in rig". */
  pick: { label: string; run: (def: FixtureDef, mode: number) => void } | null = null;
  readonly ready: Promise<void>;

  constructor(private root: HTMLElement, private ctx: Ctx) {
    this.ready = this.load();
  }

  get count() {
    return this.index.length;
  }

  /** Own lamps (user library on this computer) and lamps embedded in the open project. */
  private userDefs = new Map<string, FixtureDef>();
  private projectDefs = new Map<string, FixtureDef>();

  private async load() {
    try {
      this.index = await (await fetch('./fixtures/index.json')).json();
    } catch {
      this.index = [];
    }
    unifyMakers(this.index);
    this.byId = new Map(this.index.map((e) => [e.id, e]));
    await this.reloadUser();
  }

  async reloadUser() {
    const raw = await window.vd.userFixtures().catch(() => []);
    const list = (Array.isArray(raw) ? raw : []) as FixtureDef[];
    this.userDefs = new Map(list.filter((d) => d?.id).map((d) => [d.id, d]));
  }

  setProjectDefs(defs: FixtureDef[]) {
    this.projectDefs = new Map(defs.map((d) => [d.id, d]));
  }

  /** Own lamps known right now (user library + open project). */
  ownDefs(): FixtureDef[] {
    const m = new Map([...this.projectDefs, ...this.userDefs]);
    return [...m.values()];
  }

  /** Search entries for pickers (own lamps first, then built-in, then library). */
  search(q: string, type = '', limit = 120): FixtureIndexEntry[] {
    return this.match(q, type, '', limit).hits;
  }

  /** Hits (up to `limit`) and the total number of matches. */
  private match(q: string, type: string, man: string, limit: number): { hits: FixtureIndexEntry[]; total: number } {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits: FixtureIndexEntry[] = [];
    let total = 0;
    for (const e of this.entries()) {
      if (type && e.type !== type) continue;
      if (man && e.manufacturer !== man) continue;
      let hay = this.hay.get(e);
      if (hay === undefined) this.hay.set(e, (hay = `${e.manufacturer} ${e.model}`.toLowerCase()));
      if (!words.every((x) => hay.includes(x))) continue;
      if (++total <= limit) hits.push(e);
    }
    return { hits, total };
  }

  private entries(): FixtureIndexEntry[] {
    const own = this.ownDefs().map(
      (d): FixtureIndexEntry => ({ id: d.id, manufacturer: d.manufacturer, model: d.model, type: d.type, modes: d.modes.map((m) => ({ name: m.name, channels: m.channels.length })), db: 'user', file: '' }),
    );
    const builtIn: FixtureIndexEntry = { id: VD_GENERIC_MH.id, manufacturer: 'VD-Link', model: VD_GENERIC_MH.model, type: 'movinghead', modes: [{ name: '16ch', channels: 16 }], db: 'vd', file: '' };
    return [...own, builtIn, ...this.index];
  }

  async fetchDef(id: string): Promise<FixtureDef | undefined> {
    if (id === VD_GENERIC_MH.id) return VD_GENERIC_MH;
    const own = this.projectDefs.get(id) ?? this.userDefs.get(id);
    if (own) return own;
    await this.ready;
    const e = this.byId.get(id);
    if (!e) return undefined;
    let p = this.bundles.get(e.file);
    if (!p) {
      p = fetch('./fixtures/' + e.file).then((r) => r.json());
      this.bundles.set(e.file, p);
    }
    return (await p).find((d) => d.id === e.id);
  }

  render() {
    const w = el('div');
    w.style.height = '100%';
    const mans = new Set(this.index.map((e) => e.manufacturer)).size;
    w.append(
      head(
        t('tab.library').charAt(0) + t('tab.library').slice(1).toLowerCase(),
        this.index.length ? t('lib.count', { n: this.index.length.toLocaleString(getLang()), m: mans }) : t('lib.none'),
        this.pick ? el('span') : button(t('lib.newLamp'), () => this.ctx.cmd('fixtureBuilder'), 'btn primary', 'new'),
      ),
    );
    const lib = el('div', 'lib');
    const left = el('div', 'lib-list');
    const filter = el('div', 'lib-filter');
    const q = el('input');
    q.placeholder = t('lib.search');
    q.value = this.q;
    // Debounced: filtering ~6 000 entries and redrawing the list on every key stutters.
    q.oninput = () => {
      clearTimeout(this.searchTimer);
      this.searchTimer = window.setTimeout(() => {
        this.q = q.value;
        this.renderList();
      }, 120);
    };
    const sel = el('select');
    const types = [...new Set(this.index.map((e) => e.type))].sort((a, b) => typeLabel(a).localeCompare(typeLabel(b)));
    sel.innerHTML = `<option value="">${t('lib.alltypes')}</option>` + types.map((x) => `<option value="${x}">${typeLabel(x)}</option>`).join('');
    sel.value = this.type;
    sel.onchange = () => {
      this.type = sel.value;
      this.renderList();
    };
    filter.append(q, sel);
    left.append(filter, this.list, this.more, el('div', 'note', t('lib.missing')));
    lib.append(left, this.detail);
    w.append(lib);
    this.root.replaceChildren(w);
    const pf = this.ctx.project()?.fixture;
    const cur = this.byId.get(pf?.id ?? '');
    if (cur) this.open.add(cur.manufacturer);
    this.renderList();
    void this.fetchDef(pf?.id ?? VD_GENERIC_MH.id).then((d) => this.renderDetail(d ?? VD_GENERIC_MH, pf?.mode ?? 0));
  }

  tick() {}

  /** Makers as fold-out groups; lamps only appear when a maker is opened (or found). */
  private renderList() {
    const words = this.q.toLowerCase().split(/\s+/).filter(Boolean);
    const searching = words.length > 0;
    const ownLabel = t('lib.ownGroup');
    const groups = new Map<string, FixtureIndexEntry[]>();
    let hits = 0;
    for (const e of this.entries()) {
      if (this.type && e.type !== this.type) continue;
      let hay = this.hay.get(e);
      if (hay === undefined) this.hay.set(e, (hay = `${e.manufacturer} ${e.model}`.toLowerCase()));
      if (!words.every((x) => hay.includes(x))) continue;
      const g = e.db === 'user' ? ownLabel : e.manufacturer;
      (groups.get(g) ?? groups.set(g, []).get(g)!).push(e);
      hits++;
    }
    const rank = (g: string) => (g === ownLabel ? 0 : g === 'VD-Link' ? 1 : 2);
    const order = [...groups.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, undefined, { sensitivity: 'base' }));
    const scroll = this.list.scrollTop;
    const frag = document.createDocumentFragment();
    for (const g of order) {
      const list = groups.get(g)!;
      const isOpen = searching ? !this.closedInSearch.has(g) : this.open.has(g);
      const head = el('li', `lib-man${isOpen ? ' open' : ''}`);
      head.append(el('span', 'lib-arrow', isOpen ? '▾' : '▸'), el('span', 'lib-man-name', g), el('small', '', String(list.length)));
      head.onclick = () => {
        const set = searching ? this.closedInSearch : this.open;
        if (set.has(g)) set.delete(g);
        else set.add(g);
        this.renderList();
      };
      frag.append(head);
      if (!isOpen) continue;
      for (const e of list) {
        const li = el('li', 'lib-item');
        if (e.id === this.selected.id && !e.aliasOf) li.classList.add('sel');
        const src = (e.db === 'ofl' ? 'OFL' : e.db === 'qlcplus' ? 'QLC+' : e.db === 'user' ? t('lib.own') : 'VD') + (e.verified === false ? ' · ?' : '');
        li.append(el('span', '', e.model), el('small', '', `${src} · ${e.modes.map((m) => m.channels).join('/')} ch`));
        li.onclick = async () => {
          this.list.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel'));
          li.classList.add('sel');
          const def = await this.fetchDef(e.id);
          if (def) this.renderDetail(def, 0, e.aliasOf);
        };
        frag.append(li);
      }
    }
    this.list.replaceChildren(frag);
    this.list.scrollTop = scroll;
    this.more.textContent = t('lib.hits', { n: hits.toLocaleString(getLang()), m: order.length });
    this.more.hidden = false;
  }

  /** Live 3D preview of the selected lamp (created on first use). */
  private showPreview(def: FixtureDef, modeIndex: number) {
    this.previewInit ??= FixturePreview.create(this.previewBox).then((p) => (this.preview = p));
    void this.previewInit.then((p) => p?.set(def, Math.min(modeIndex, def.modes.length - 1)));
  }

  private renderDetail(def: FixtureDef, modeIndex: number, aliasOf?: string) {
    this.selected = def;
    const d = this.detail;
    d.replaceChildren(this.previewBox);
    this.showPreview(def, modeIndex);
    d.append(el('div', 'muted small', `${this.byId.get(def.id)?.manufacturer ?? def.manufacturer} · ${typeLabel(def.type)}`), el('h3', '', def.model));
    if (aliasOf) d.append(el('div', 'note', t('lib.alias', { x: aliasOf })));
    if (def.source.verified === false) d.append(el('div', 'note warn', t('lib.unverified') + (def.source.note ? ` ${def.source.note}` : '')));
    const modeSel = el('select');
    modeSel.innerHTML = def.modes.map((m, i) => `<option value="${i}">${m.name} (${m.channels.length} ch)</option>`).join('');
    modeSel.value = String(Math.min(modeIndex, def.modes.length - 1));
    const chips = el('div', 'chips');
    const kv = el('div', 'kv');
    const chans = el('div', 'table-wrap');
    const fill = () => {
      const mi = Number(modeSel.value);
      const cm = compileMode(def, mi);
      chips.replaceChildren(...Object.keys(cm.slots).filter((a) => !['other', 'control', 'speed'].includes(a)).map((a) => el('span', 'chip', a)));
      if (cm.cells.some((c) => c.length)) chips.append(el('span', 'chip', `pixel × ${cm.cells.filter((c) => c.length).length}`));
      const tb = el('table');
      tb.innerHTML = '<thead><tr><th>#</th><th>Kanal</th><th>Funktion</th></tr></thead>';
      const body = el('tbody');
      def.modes[mi].channels.forEach((c, i) => {
        const tr = el('tr');
        tr.append(el('td', 'n', String(i + 1)), el('td', '', c.name), el('td', 'n', c.attr + (c.byte ? ' (fine)' : '')));
        body.append(tr);
      });
      tb.append(body);
      chans.replaceChildren(tb);
    };
    modeSel.onchange = () => {
      fill();
      this.showPreview(def, Number(modeSel.value));
    };
    const p = def.physical;
    kv.innerHTML =
      `<span>Pan / Tilt</span><b>${p.panDeg ?? '?'}° / ${p.tiltDeg ?? '?'}°</b>` +
      `<span>Beam</span><b>${p.beamDeg ? p.beamDeg.join('–') + '°' : '?'}</b>` +
      `<span>${t('lib.source')}</span><b>${def.source.db.toUpperCase()} · ${def.source.license}${def.source.authors?.length ? ' · ' + def.source.authors.slice(0, 2).join(', ') : ''}</b>`;
    const inRig = this.ctx.rig()?.def.id === def.id;
    const use = button(inRig ? t('lib.inuse') : t('lib.use'), () => {
      this.ctx.setFixture(def, Number(modeSel.value));
      use.textContent = t('lib.inuse');
    }, 'btn primary');
    const r = el('div', 'row');
    const ml = el('label', 'muted small', t('lib.mode') + ' ');
    ml.append(modeSel);
    const own = def.source.db === 'user';
    const edit = button(own ? t('lib.edit') : t('lib.copyEdit'), () => this.ctx.cmd('fixtureBuilder', { def, copy: !own }), 'btn');
    if (!this.ctx.project()) use.hidden = true;
    if (this.pick) {
      const p = this.pick;
      const add = button(p.label, () => {
        p.run(def, Number(modeSel.value));
        add.textContent = '✓ ' + p.label;
      }, 'btn primary');
      r.append(ml, add);
    } else r.append(ml, edit, use);
    d.append(kv, r, el('div', 'muted small', t('lib.found')), chips, chans);
    fill();
  }
}

// =================================================================== WALLS

export class WallsPanel implements Panel {
  private statusEls: HTMLElement[] = [];
  private sources: Awaited<ReturnType<typeof window.vd.listCaptureSources>> = [];
  private permDenied = false;
  private virtual = new Map<number, number>(); // wall index → displayID
  private ndi: Awaited<ReturnType<typeof window.vd.ndiStatus>> | null = null;
  private ndiSources: Awaited<ReturnType<typeof window.vd.ndiSources>> = [];
  private ndiSearching = false;

  constructor(private root: HTMLElement, private ctx: Ctx) {}

  async refresh() {
    try {
      this.sources = await window.vd.listCaptureSources();
      this.permDenied = false;
    } catch {
      this.sources = [];
      this.permDenied = window.vd.platform === 'darwin' && (await window.vd.capturePermission()) !== 'granted';
    }
    // NDI®: the receiver process starts here, discovery runs in the background.
    if (!this.ndi?.ok) this.ndi = await window.vd.ndiStatus().catch(() => null);
    if (this.ndi?.ok) void this.findNdi();
  }

  private async findNdi() {
    if (this.ndiSearching) return;
    this.ndiSearching = true;
    if (this.root.isConnected) this.render();
    const list = await window.vd.ndiSources().catch(() => []);
    this.ndiSearching = false;
    this.ndiSources = list.sort((a, b) => a.name.localeCompare(b.name));
    this.render();
  }

  /** NDI® block: sources found, runtime hint, trademark and the ndi.video link (NDI SDK terms). */
  private ndiNote(): HTMLElement {
    const n = el('div', 'note ndi');
    const s = this.ndi;
    const p = el('p');
    if (s?.ok) {
      p.append(
        document.createTextNode(this.ndiSearching ? t('walls.ndi.searching') : t('walls.ndi.found', { n: String(this.ndiSources.length) }) + ' '),
      );
      if (!this.ndiSearching) p.append(button(t('walls.ndi.search'), () => void this.findNdi(), 'btn small'));
    } else if (s && s.error === 'runtime-missing') {
      p.append(document.createTextNode(t('walls.ndi.missing') + ' '), button(t('walls.ndi.get'), () => void window.vd.ndiLink('runtime'), 'btn small primary'));
    } else if (s && s.error !== 'browser') {
      p.append(document.createTextNode(t('walls.ndi.failed', { e: s.error ?? '?' })));
    } else p.append(document.createTextNode(t('walls.ndi.unavailable')));
    const tm = el('p', 'muted small');
    const link = el('a', '', 'ndi.video');
    link.href = 'https://ndi.video/';
    link.onclick = (e) => {
      e.preventDefault();
      void window.vd.ndiLink('home');
    };
    tm.append(document.createTextNode(t('walls.ndi.tm') + ' '), link);
    if (s?.ok && s.version) tm.append(document.createTextNode(` · ${s.version}`));
    n.append(p, tm);
    return n;
  }

  render() {
    const w = el('div', 'wrap');
    w.append(head(t('walls.title'), t('walls.sub')));
    if (this.permDenied) w.append(el('div', 'note warn', t('walls.perm')));
    if (window.vd.platform === 'win32') w.append(el('div', 'note', t('walls.win')));
    const cards = el('div', 'cards');
    this.statusEls = [];
    this.ctx.walls().forEach((wall, i) => {
      const c = el('div', `card ${wall.source.kind !== 'test' ? 'ok' : ''}`);
      const h = el('div', 'head');
      h.append(
        el('b', '', wall.name),
        el('em', '', wall.shared ? `${wall.members.length} ${t('walls.surfaces')} · ${wall.pixels[0]}×${wall.pixels[1]}` : `${wall.widthM} × ${wall.heightM} m · ${wall.pixels[0]}×${wall.pixels[1]}`),
      );
      const st = el('div', 'muted small', wall.status);
      this.statusEls.push(st);
      const src = el('select');
      const opt = (value: string, label: string) => {
        const o = el('option', '', label);
        o.value = value;
        return o;
      };
      src.append(opt('', t('walls.test')));
      if (this.sources.length) {
        const g = el('optgroup');
        g.label = t('walls.screens');
        g.append(...this.sources.map((s) => opt(s.id, `${s.virtual ? '★ ' : ''}${s.name} (${s.width}×${s.height})`)));
        src.append(g);
      }
      const cur = wall.source;
      const ndiList = [...this.ndiSources];
      if (cur.kind === 'ndi' && !ndiList.some((x) => x.name === cur.name)) ndiList.push({ name: cur.name, url: cur.url });
      if (ndiList.length) {
        const g = el('optgroup');
        g.label = 'NDI®';
        g.append(...ndiList.map((s) => opt('ndi:' + s.name, s.name)));
        src.append(g);
      }
      src.value = cur.kind === 'capture' ? cur.sourceId : cur.kind === 'ndi' ? 'ndi:' + cur.name : '';
      src.onchange = async () => {
        const v = src.value;
        const n = v.startsWith('ndi:') ? ndiList.find((x) => 'ndi:' + x.name === v) : undefined;
        const s = this.sources.find((x) => x.id === v);
        const next = n
          ? { kind: 'ndi' as const, name: n.name, url: n.url, low: cur.kind === 'ndi' && cur.low }
          : s
            ? { kind: 'capture' as const, sourceId: s.id, label: s.name }
            : { kind: 'test' as const };
        await wall.setSource(next).catch((e) => (wall.status = String(e)));
        this.render();
      };
      const row1 = el('div', 'row');
      row1.append(el('span', 'muted small', t('walls.source')), src);
      const vd = this.virtual.get(i);
      const create = button(vd ? t('walls.remove') : t('walls.create'), () => void (vd ? this.removeVirtual(i) : this.createVirtual(i)), vd ? 'btn' : 'btn primary', 'walls');
      if (window.vd.platform !== 'darwin') create.disabled = true;
      const bright = el('input');
      bright.type = 'range';
      bright.min = '0';
      bright.max = '2';
      bright.step = '0.05';
      bright.value = String(wall.brightness.value);
      bright.oninput = () => (wall.brightness.value = Number(bright.value));
      const row2 = el('div', 'row');
      row2.append(el('span', 'muted small', t('walls.brightness')), bright);
      c.append(h);
      if (wall.shared) c.append(el('div', 'muted small', `${t('walls.sharedHint')}: ${wall.members.join(', ')}`));
      c.append(row1, row2);
      if (cur.kind === 'ndi') {
        const low = el('input');
        low.type = 'checkbox';
        low.checked = cur.low;
        low.onchange = async () => {
          await wall.setSource({ ...cur, low: low.checked }).catch((e) => (wall.status = String(e)));
          this.render();
        };
        const lab = el('label', 'row muted small');
        lab.append(el('span', '', t('walls.ndi.low')), low);
        c.append(lab);
      }
      c.append(create, st);
      if (vd) c.append(el('div', 'muted small', t('walls.howto', { n: `VD-Link ${wall.name}` })));
      cards.append(c);
    });
    w.append(cards, this.ndiNote());
    this.root.replaceChildren(w);
  }

  tick() {
    this.ctx.walls().forEach((wall, i) => {
      const s = this.statusEls[i];
      if (s && s.textContent !== wall.status) s.textContent = wall.status;
    });
  }

  async createVirtual(i: number) {
    const wall = this.ctx.walls()[i];
    wall.status = '…';
    const res = await window.vd.createVirtualDisplay({ name: `VD-Link ${wall.name}`, width: wall.pixels[0], height: wall.pixels[1] });
    if (!res.ok || !res.displayID) {
      wall.status = res.error ?? 'Fehler';
      this.render();
      return;
    }
    this.virtual.set(i, res.displayID);
    await window.vd.openTestPattern(String(res.displayID));
    await new Promise((r) => setTimeout(r, 700));
    await this.refresh();
    const s = this.sources.find((x) => x.displayId === String(res.displayID));
    if (s) await wall.setSource({ kind: 'capture', sourceId: s.id, label: s.name }).catch((e) => (wall.status = String(e)));
    else wall.status = this.permDenied ? t('walls.perm') : 'Monitor erzeugt, aber nicht gefunden';
    this.render();
  }

  /** Scenario change: remove all virtual monitors of the old walls. */
  async resetVirtual() {
    for (const id of this.virtual.values()) {
      await window.vd.removeVirtualDisplay(id);
      await window.vd.closeTestPattern(String(id));
    }
    this.virtual.clear();
  }

  private async removeVirtual(i: number) {
    const id = this.virtual.get(i);
    if (id) await window.vd.removeVirtualDisplay(id);
    if (id) await window.vd.closeTestPattern(String(id));
    this.virtual.delete(i);
    await this.ctx.walls()[i].setSource({ kind: 'test' });
    await this.refresh();
    this.render();
  }
}

// ================================================================= CONNECT

export class ConnectPanel implements Panel {
  private srcBox = el('div');
  private monitor = el('div', 'dmx-live');
  private bars: HTMLElement[] = [];
  private uni = 1;
  private ma2: ReturnType<typeof ma2Assistant> | null = null;

  constructor(private root: HTMLElement, private ctx: Ctx) {}

  render() {
    const p = this.ctx.project()!;
    const w = el('div', 'wrap');
    w.append(head(t('conn.title'), t('conn.sub')));
    this.ma2 = ma2Assistant(this.ctx);
    w.append(this.ma2.el);
    const cards = el('div', 'cards');
    const card = (title: string, text: string, cls = '') => {
      const c = el('div', `card ${cls}`);
      const h = el('div', 'head');
      h.append(el('b', '', title));
      c.append(h, el('div', 'muted small', text));
      return c;
    };
    cards.append(card(t('conn.artnet'), t('conn.artnet.text'), 'ok'), card(t('conn.sacn'), t('conn.sacn.text'), 'ok'));
    const ipCard = card(t('conn.ips'), '');
    void window.vd.netInfo().then((ips) => {
      for (const ip of ips) ipCard.append(el('div', 'ipl', `${ip.address}`), el('div', 'muted small', ip.name));
      if (!ips.length) ipCard.append(el('div', 'ipl', '127.0.0.1'));
    });
    cards.append(ipCard);
    w.append(cards);

    const opt = el('div', 'form');
    opt.style.marginTop = '16px';
    const modeL = el('label', '', t('conn.mode'));
    modeL.append(
      seg<DmxMode>(
        [
          { id: 'auto', label: t('conn.mode.auto') },
          { id: 'net', label: t('conn.mode.net') },
          { id: 'demo', label: t('conn.mode.demo') },
        ],
        p.dmx.mode,
        (v) => {
          p.dmx.mode = v;
          this.ctx.changed();
        },
      ),
    );
    const num = (label: string, val: number, set: (v: number) => void) => {
      const l = el('label', '', label);
      const i = el('input');
      i.type = 'number';
      i.min = '-1';
      i.max = '16';
      i.value = String(val + 1);
      i.onchange = () => set(Number(i.value) - 1);
      l.append(i);
      return l;
    };
    opt.append(
      modeL,
      num(t('conn.artoffset'), p.dmx.artnetOffset, (v) => {
        p.dmx.artnetOffset = v;
        this.ctx.changed();
        void window.vd.setDmxConfig({ artnetOffset: v });
      }),
      num(t('conn.sacnoffset'), p.dmx.sacnOffset, (v) => {
        p.dmx.sacnOffset = v;
        this.ctx.changed();
        void window.vd.setDmxConfig({ sacnOffset: v });
      }),
    );
    w.append(opt);

    w.append(el('h2', '', t('conn.sources')), this.srcBox);
    const mh = el('div', 'row');
    mh.style.justifyContent = 'flex-start';
    const uniSel = el('select');
    for (let u = 1; u <= Math.max(4, this.ctx.rig()?.universes ?? 1); u++) uniSel.append(new Option(`Universe ${u}`, String(u)));
    uniSel.value = String(this.uni);
    uniSel.onchange = () => (this.uni = Number(uniSel.value));
    mh.append(el('h2', '', t('conn.monitor')), uniSel);
    this.bars = [];
    this.monitor.replaceChildren();
    for (let i = 0; i < 512; i++) {
      const c = el('i');
      c.title = String(i + 1);
      const b = el('b');
      c.append(b);
      this.bars.push(b);
      this.monitor.append(c);
    }
    w.append(mh, this.monitor, el('div', 'note', t('conn.tip')));
    this.root.replaceChildren(w);
  }

  tick() {
    const st = this.ctx.dmxStatus();
    this.ma2?.update(st);
    if (!st.sources.length) this.srcBox.replaceChildren(el('div', 'muted', t('conn.nosrc')));
    else {
      const tw = el('div', 'table-wrap');
      const tb = el('table');
      tb.innerHTML = '<thead><tr><th>Protokoll</th><th>Name</th><th>IP</th><th>Universe</th><th>→ VD</th><th>Prio</th><th>fps</th></tr></thead>';
      const body = el('tbody');
      for (const s of st.sources) {
        const tr = el('tr');
        tr.append(el('td', '', s.proto === 'artnet' ? 'Art-Net' : 'sACN'), el('td', '', s.name), el('td', 'mono', s.address), el('td', 'mono', s.nativeUniverse), el('td', 'mono', `U${s.vdUniverse}`), el('td', 'n', String(s.priority)), el('td', 'n', String(s.fps)));
        body.append(tr);
      }
      tb.append(body);
      tw.append(tb);
      this.srcBox.replaceChildren(tw);
    }
    const dmx = this.ctx.dmx();
    const base = (this.uni - 1) * 512;
    for (let i = 0; i < 512; i++) this.bars[i].style.height = `${((dmx[base + i] ?? 0) / 255) * 100}%`;
  }
}
