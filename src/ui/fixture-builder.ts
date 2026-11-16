// Fixture Builder: create own lamps (e.g. China fixtures missing in the library),
// or copy a library fixture and adapt it. Channel table per mode, value ranges
// for shutter/strobe, gobo, colour wheel and prism, and a live DMX test.

import { compileMode, decode, newLook } from '../shared/dmx-codec.ts';
import type { Attr, Capability, CapKind, FixtureDef, FixtureMode, FixtureType, ModeChannel } from '../shared/fixture-types.ts';
import { el, icon } from './dom.ts';
import { getLang } from './i18n.ts';

const ATTRS: { id: Attr; de: string; en: string }[] = [
  { id: 'pan', de: 'Pan', en: 'Pan' },
  { id: 'tilt', de: 'Tilt', en: 'Tilt' },
  { id: 'dimmer', de: 'Dimmer', en: 'Dimmer' },
  { id: 'shutter', de: 'Shutter / Strobe', en: 'Shutter / strobe' },
  { id: 'red', de: 'Rot', en: 'Red' },
  { id: 'green', de: 'Grün', en: 'Green' },
  { id: 'blue', de: 'Blau', en: 'Blue' },
  { id: 'white', de: 'Weiß', en: 'White' },
  { id: 'amber', de: 'Amber', en: 'Amber' },
  { id: 'uv', de: 'UV', en: 'UV' },
  { id: 'lime', de: 'Lime', en: 'Lime' },
  { id: 'cyan', de: 'Cyan', en: 'Cyan' },
  { id: 'magenta', de: 'Magenta', en: 'Magenta' },
  { id: 'yellow', de: 'Gelb', en: 'Yellow' },
  { id: 'colorWheel', de: 'Farbrad / Farbmakro', en: 'Colour wheel / macro' },
  { id: 'gobo', de: 'Gobo', en: 'Gobo' },
  { id: 'goboRotation', de: 'Gobo-Rotation', en: 'Gobo rotation' },
  { id: 'zoom', de: 'Zoom', en: 'Zoom' },
  { id: 'focus', de: 'Fokus', en: 'Focus' },
  { id: 'prism', de: 'Prisma', en: 'Prism' },
  { id: 'frost', de: 'Frost', en: 'Frost' },
  { id: 'speed', de: 'Pan/Tilt-Speed', en: 'Pan/tilt speed' },
  { id: 'control', de: 'Reset / Steuerung', en: 'Reset / control' },
  { id: 'other', de: 'Sonstiges (ignoriert)', en: 'Other (ignored)' },
];

const TYPES: { id: FixtureType; de: string; en: string }[] = [
  { id: 'movinghead', de: 'Moving Head', en: 'Moving head' },
  { id: 'scanner', de: 'Scanner', en: 'Scanner' },
  { id: 'par', de: 'PAR / Washer', en: 'PAR / wash' },
  { id: 'bar', de: 'LED-Bar', en: 'LED bar' },
  { id: 'strobe', de: 'Strobe', en: 'Strobe' },
  { id: 'blinder', de: 'Blinder', en: 'Blinder' },
  { id: 'laser', de: 'Laser', en: 'Laser' },
  { id: 'effect', de: 'Effekt', en: 'Effect' },
  { id: 'other', de: 'Sonstiges', en: 'Other' },
];

const KINDS: { id: CapKind; de: string; en: string }[] = [
  { id: 'open', de: 'Offen', en: 'Open' },
  { id: 'closed', de: 'Zu / Blackout', en: 'Closed' },
  { id: 'strobe', de: 'Strobe', en: 'Strobe' },
  { id: 'dimmer', de: 'Dimmer (im Kanal)', en: 'Dimmer (in channel)' },
  { id: 'color', de: 'Farbe', en: 'Colour' },
  { id: 'gobo', de: 'Gobo', en: 'Gobo' },
  { id: 'prism', de: 'Prisma an', en: 'Prism on' },
  { id: 'generic', de: 'Sonstiges', en: 'Other' },
];

const T = {
  de: {
    title: 'Fixture-Builder', newLamp: 'Neue Lampe', openFile: 'Datei öffnen', saveFile: 'Als Datei speichern', saveLib: 'In Bibliothek speichern',
    close: 'Schließen', manufacturer: 'Hersteller', model: 'Modell', type: 'Typ', beam: 'Abstrahlwinkel (°) min / max', pan: 'Pan (°)', tilt: 'Tilt (°)',
    templates: 'Vorlage', modes: 'Modi', addMode: '+ Modus', dupMode: 'Modus kopieren', delMode: 'Modus löschen', modeName: 'Name des Modus',
    channels: 'Kanäle', addCh: '+ Kanal', name: 'Name', func: 'Funktion', fine: '16 bit (Fine)', def: 'Standard', ranges: 'Bereiche', from: 'von', to: 'bis',
    kind: 'Bedeutung', value: 'Farbe / Gobo / Hz', addRange: '+ Bereich', test: 'DMX-Test', reset: 'Alles auf 0', saved: 'Gespeichert',
    warnPan: 'Moving Head ohne Pan/Tilt-Kanal.', warnLight: 'Kein Dimmer und keine Farbe gefunden – die Lampe bleibt weiß/voll.',
    ok: 'Alles erkannt.', fineOf: 'Fine', coarse: 'Grob', hint: 'Tipp: Kanaltabelle aus der Bedienungsanleitung abtippen. Bei China-Geräten steckt der Dimmer oft im Kanal „Strobe/Dimmer“ – dann Bereiche mit „Dimmer (im Kanal)“ anlegen.',
    tplMh: 'Moving Head 14ch', tplPar: 'PAR RGBW 8ch', tplBar: 'LED-Bar RGB 3ch', tplStrobe: 'Strobe 2ch',
  },
  en: {
    title: 'Fixture builder', newLamp: 'New lamp', openFile: 'Open file', saveFile: 'Save as file', saveLib: 'Save to library',
    close: 'Close', manufacturer: 'Manufacturer', model: 'Model', type: 'Type', beam: 'Beam angle (°) min / max', pan: 'Pan (°)', tilt: 'Tilt (°)',
    templates: 'Template', modes: 'Modes', addMode: '+ Mode', dupMode: 'Copy mode', delMode: 'Delete mode', modeName: 'Mode name',
    channels: 'Channels', addCh: '+ Channel', name: 'Name', func: 'Function', fine: '16 bit (fine)', def: 'Default', ranges: 'Ranges', from: 'from', to: 'to',
    kind: 'Meaning', value: 'Colour / gobo / Hz', addRange: '+ Range', test: 'DMX test', reset: 'All to 0', saved: 'Saved',
    warnPan: 'Moving head without pan/tilt channel.', warnLight: 'No dimmer and no colour found – the lamp stays white/full.',
    ok: 'Everything detected.', fineOf: 'Fine', coarse: 'Coarse', hint: 'Tip: copy the channel table from the manual. Cheap fixtures often hide the dimmer in a "strobe/dimmer" channel – add ranges with "Dimmer (in channel)".',
    tplMh: 'Moving head 14ch', tplPar: 'PAR RGBW 8ch', tplBar: 'LED bar RGB 3ch', tplStrobe: 'Strobe 2ch',
  },
};

const ch = (name: string, attr: Attr, byte: 0 | 1 = 0, caps?: Capability[], dflt?: number): ModeChannel => ({ name, attr, byte, caps, default: dflt });

function template(kind: 'mh' | 'par' | 'bar' | 'strobe'): Pick<FixtureDef, 'type' | 'physical' | 'modes'> {
  if (kind === 'par')
    return {
      type: 'par',
      physical: { beamDeg: [25, 25] },
      modes: [{ name: '8ch', channels: [ch('Dimmer', 'dimmer'), ch('Rot', 'red'), ch('Grün', 'green'), ch('Blau', 'blue'), ch('Weiß', 'white'), ch('Strobe', 'shutter', 0, [{ from: 0, to: 9, kind: 'open' }, { from: 10, to: 255, kind: 'strobe', hz: [1, 20] }]), ch('Makro', 'other'), ch('Speed', 'other')] }],
    };
  if (kind === 'bar') return { type: 'bar', physical: { beamDeg: [30, 30] }, modes: [{ name: '3ch', channels: [ch('Rot', 'red'), ch('Grün', 'green'), ch('Blau', 'blue')] }] };
  if (kind === 'strobe') return { type: 'strobe', physical: { beamDeg: [90, 90] }, modes: [{ name: '2ch', channels: [ch('Dimmer', 'dimmer'), ch('Strobe', 'shutter', 0, [{ from: 0, to: 9, kind: 'open' }, { from: 10, to: 255, kind: 'strobe', hz: [1, 25] }])] }] };
  return {
    type: 'movinghead',
    physical: { beamDeg: [8, 25], panDeg: 540, tiltDeg: 270 },
    modes: [
      {
        name: '14ch',
        channels: [
          ch('Pan', 'pan', 0, undefined, 128), ch('Pan fine', 'pan', 1), ch('Tilt', 'tilt', 0, undefined, 128), ch('Tilt fine', 'tilt', 1), ch('Speed', 'speed'),
          ch('Dimmer', 'dimmer'),
          ch('Strobe', 'shutter', 0, [{ from: 0, to: 9, kind: 'open' }, { from: 10, to: 255, kind: 'strobe', hz: [1, 20] }]),
          ch('Rot', 'red'), ch('Grün', 'green'), ch('Blau', 'blue'), ch('Weiß', 'white'),
          ch('Gobo', 'gobo', 0, [{ from: 0, to: 15, kind: 'open' }, { from: 16, to: 47, kind: 'gobo', gobo: 1 }, { from: 48, to: 79, kind: 'gobo', gobo: 2 }, { from: 80, to: 111, kind: 'gobo', gobo: 3 }, { from: 112, to: 143, kind: 'gobo', gobo: 4 }]),
          ch('Zoom', 'zoom'), ch('Reset', 'control'),
        ],
      },
    ],
  };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'lampe';

export interface FixtureBuilderDeps {
  /** Pick a library fixture to copy (returns null when cancelled). */
  pickFixture: () => Promise<FixtureDef | null>;
  /** After saving to the user library. */
  onSaved: (def: FixtureDef) => void;
}

export class FixtureBuilder {
  private root = el('div', 'workspace fb');
  private def!: FixtureDef;
  private modeIx = 0;
  private openRanges = -1;
  private dmx = new Uint8Array(512);
  private filePath: string | null = null;
  private T = T[getLang()];
  private testBox = el('div', 'fb-test');
  private status = el('span', 'muted small');

  constructor(private deps: FixtureBuilderDeps) {
    this.root.hidden = true;
    document.body.append(this.root);
  }

  get visible() {
    return !this.root.hidden;
  }

  open(def?: FixtureDef, copy = false) {
    if (def) {
      this.def = structuredClone(def);
      if (copy || def.source.db !== 'user') {
        this.def.id = '';
        this.def.manufacturer = def.manufacturer;
        this.def.model = `${def.model} (eigen)`;
      }
    } else this.def = this.blank();
    this.def.source = { db: 'user', license: 'eigene Definition', authors: [] };
    this.modeIx = 0;
    this.filePath = null;
    this.render();
    this.root.hidden = false;
  }

  close() {
    this.root.hidden = true;
  }

  private blank(): FixtureDef {
    return { id: '', manufacturer: '', model: '', source: { db: 'user', license: 'eigene Definition' }, ...template('mh') };
  }

  private ensureId() {
    if (!this.def.id) this.def.id = `user:${slug(this.def.manufacturer)}/${slug(this.def.model)}-${Date.now().toString(36)}`;
  }

  // ------------------------------------------------------------------ UI

  private render() {
    const t = this.T;
    const r = this.root;
    r.replaceChildren();
    // top bar
    const bar = el('div', 'ws-bar');
    const ttl = el('div', 'ws-title');
    ttl.append(icon('library'), el('b', '', t.title));
    const btn = (label: string, run: () => void, cls = 'btn', ic?: string) => {
      const b = el('button', cls);
      if (ic) b.append(icon(ic));
      b.append(document.createTextNode(label));
      b.onclick = run;
      return b;
    };
    const tpl = el('select');
    tpl.innerHTML = `<option value="">${t.templates} …</option><option value="mh">${t.tplMh}</option><option value="par">${t.tplPar}</option><option value="bar">${t.tplBar}</option><option value="strobe">${t.tplStrobe}</option><option value="lib">${getLang() === 'de' ? 'Aus Bibliothek kopieren …' : 'Copy from library …'}</option>`;
    tpl.onchange = async () => {
      if (tpl.value === 'lib') {
        const d = await this.deps.pickFixture();
        if (d) this.open(d, true);
        return;
      }
      if (tpl.value) Object.assign(this.def, template(tpl.value as 'mh'));
      this.modeIx = 0;
      this.render();
    };
    bar.append(
      ttl,
      tpl,
      btn(t.newLamp, () => this.open(), 'btn', 'new'),
      btn(t.openFile, () => void this.openFile(), 'btn', 'open'),
      el('span', 'grow'),
      this.status,
      btn(t.saveFile, () => void this.saveFile(), 'btn', 'download'),
      btn(t.saveLib, () => void this.saveLib(), 'btn primary'),
      btn(t.close, () => this.close(), 'btn'),
    );

    const body = el('div', 'fb-body');
    body.append(this.renderGeneral(), this.renderModes(), this.testBox);
    r.append(bar, body);
    this.renderTest();
  }

  private input(value: string | number, onInput: (v: string) => void, type = 'text', cls = '') {
    const i = el('input', cls);
    i.type = type;
    i.value = String(value ?? '');
    i.oninput = () => onInput(i.value);
    return i;
  }

  private renderGeneral() {
    const t = this.T;
    const d = this.def;
    const box = el('div', 'fb-col fb-general');
    const field = (label: string, ctrl: HTMLElement) => {
      const l = el('label', 'field');
      l.append(el('span', '', label), ctrl);
      return l;
    };
    const type = el('select');
    type.innerHTML = TYPES.map((x) => `<option value="${x.id}">${getLang() === 'de' ? x.de : x.en}</option>`).join('');
    type.value = d.type;
    type.onchange = () => ((d.type = type.value as FixtureType), this.renderTest());
    const beam = el('div', 'row2');
    beam.append(
      this.input(d.physical.beamDeg?.[0] ?? 10, (v) => ((d.physical.beamDeg = [Number(v), d.physical.beamDeg?.[1] ?? Number(v)]), this.renderTest()), 'number'),
      this.input(d.physical.beamDeg?.[1] ?? 10, (v) => ((d.physical.beamDeg = [d.physical.beamDeg?.[0] ?? Number(v), Number(v)]), this.renderTest()), 'number'),
    );
    const pt = el('div', 'row2');
    pt.append(
      this.input(d.physical.panDeg ?? 540, (v) => (d.physical.panDeg = Number(v)), 'number'),
      this.input(d.physical.tiltDeg ?? 270, (v) => (d.physical.tiltDeg = Number(v)), 'number'),
    );
    box.append(
      field(t.manufacturer, this.input(d.manufacturer, (v) => (d.manufacturer = v))),
      field(t.model, this.input(d.model, (v) => (d.model = v))),
      field(t.type, type),
      field(t.beam, beam),
      field(`${t.pan} / ${t.tilt}`, pt),
      el('div', 'note', t.hint),
    );
    return box;
  }

  private get mode(): FixtureMode {
    return this.def.modes[this.modeIx];
  }

  private renderModes() {
    const t = this.T;
    const lang = getLang();
    const box = el('div', 'fb-col fb-modes');
    // mode tabs
    const tabs = el('div', 'fb-tabs');
    this.def.modes.forEach((m, i) => {
      const b = el('button', i === this.modeIx ? 'on' : '', `${m.name || '–'} (${m.channels.length})`);
      b.onclick = () => ((this.modeIx = i), (this.openRanges = -1), this.render());
      tabs.append(b);
    });
    const add = el('button', 'linkish', t.addMode);
    add.onclick = () => {
      this.def.modes.push({ name: `${this.def.modes.length + 1}. Modus`, channels: [] });
      this.modeIx = this.def.modes.length - 1;
      this.render();
    };
    const dup = el('button', 'linkish', t.dupMode);
    dup.onclick = () => {
      this.def.modes.push(structuredClone({ ...this.mode, name: this.mode.name + ' (2)' }));
      this.modeIx = this.def.modes.length - 1;
      this.render();
    };
    const del = el('button', 'linkish', t.delMode);
    del.onclick = () => {
      if (this.def.modes.length < 2) return;
      this.def.modes.splice(this.modeIx, 1);
      this.modeIx = 0;
      this.render();
    };
    tabs.append(add, dup, del);
    const nameRow = el('label', 'field');
    nameRow.append(el('span', '', t.modeName), this.input(this.mode.name, (v) => (this.mode.name = v)));

    // channel table
    const table = el('table', 'fb-table');
    table.innerHTML = `<thead><tr><th>#</th><th>${t.name}</th><th>${t.func}</th><th>${t.fine}</th><th>${t.def}</th><th>${t.ranges}</th><th></th></tr></thead>`;
    const tb = el('tbody');
    this.mode.channels.forEach((c, i) => {
      const tr = el('tr');
      const attr = el('select');
      attr.innerHTML = ATTRS.map((a) => `<option value="${a.id}">${lang === 'de' ? a.de : a.en}</option>`).join('');
      attr.value = c.attr;
      attr.onchange = () => ((c.attr = attr.value as Attr), this.renderTest());
      const fine = el('select');
      fine.innerHTML = `<option value="0">${t.coarse}</option><option value="1">${t.fineOf}</option>`;
      fine.value = String(c.byte);
      fine.onchange = () => ((c.byte = Number(fine.value) as 0 | 1), this.renderTest());
      const rangesBtn = el('button', 'btn small', `${c.caps?.length ?? 0} ▾`);
      rangesBtn.onclick = () => ((this.openRanges = this.openRanges === i ? -1 : i), this.render());
      const tools = el('td', 'fb-tools');
      const mk = (txt: string, run: () => void) => {
        const b = el('button', 'iconbtn small', txt);
        b.onclick = run;
        return b;
      };
      tools.append(
        mk('↑', () => i > 0 && (this.mode.channels.splice(i - 1, 0, this.mode.channels.splice(i, 1)[0]), this.render())),
        mk('↓', () => i < this.mode.channels.length - 1 && (this.mode.channels.splice(i + 1, 0, this.mode.channels.splice(i, 1)[0]), this.render())),
        mk('✕', () => (this.mode.channels.splice(i, 1), this.render())),
      );
      const td = (n: HTMLElement) => {
        const x = el('td');
        x.append(n);
        return x;
      };
      tr.append(
        el('td', 'n', String(i + 1)),
        td(this.input(c.name, (v) => (c.name = v))),
        td(attr),
        td(fine),
        td(this.input(c.default ?? 0, (v) => (c.default = Number(v) || 0), 'number', 'narrow')),
        td(rangesBtn),
        tools,
      );
      tb.append(tr);
      if (this.openRanges === i) tb.append(this.renderRanges(c));
    });
    table.append(tb);
    const addCh = el('button', 'btn', t.addCh);
    addCh.onclick = () => {
      this.mode.channels.push(ch(`Kanal ${this.mode.channels.length + 1}`, 'other'));
      this.render();
    };
    box.append(el('h2', '', t.modes), tabs, nameRow, el('h2', '', t.channels), table, addCh);
    return box;
  }

  private renderRanges(c: ModeChannel) {
    const t = this.T;
    const lang = getLang();
    const tr = el('tr', 'fb-ranges');
    const td = el('td');
    td.colSpan = 7;
    const list = el('div', 'fb-range-list');
    c.caps ??= [];
    c.caps.forEach((cap, j) => {
      const row = el('div', 'fb-range');
      const kind = el('select');
      kind.innerHTML = KINDS.map((k) => `<option value="${k.id}">${lang === 'de' ? k.de : k.en}</option>`).join('');
      kind.value = cap.kind;
      kind.onchange = () => ((cap.kind = kind.value as CapKind), this.render());
      const extra =
        cap.kind === 'color'
          ? this.input(cap.color ?? '#ffffff', (v) => (cap.color = v), 'color')
          : cap.kind === 'gobo'
            ? this.input(cap.gobo ?? 1, (v) => (cap.gobo = Number(v)), 'number', 'narrow')
            : cap.kind === 'strobe'
              ? (() => {
                  const w = el('span', 'row2');
                  w.append(
                    this.input(cap.hz?.[0] ?? 1, (v) => (cap.hz = [Number(v), cap.hz?.[1] ?? 20]), 'number', 'narrow'),
                    this.input(cap.hz?.[1] ?? 20, (v) => (cap.hz = [cap.hz?.[0] ?? 1, Number(v)]), 'number', 'narrow'),
                  );
                  return w;
                })()
              : el('span');
      const x = el('button', 'iconbtn small', '✕');
      x.onclick = () => (c.caps!.splice(j, 1), this.render());
      row.append(
        el('span', 'muted small', t.from),
        this.input(cap.from, (v) => ((cap.from = Number(v)), this.renderTest()), 'number', 'narrow'),
        el('span', 'muted small', t.to),
        this.input(cap.to, (v) => ((cap.to = Number(v)), this.renderTest()), 'number', 'narrow'),
        kind,
        extra,
        x,
      );
      list.append(row);
    });
    const add = el('button', 'linkish', t.addRange);
    add.onclick = () => {
      const last = c.caps!.at(-1);
      const from = last ? Math.min(255, last.to + 1) : 0;
      c.caps!.push({ from, to: 255, kind: c.attr === 'gobo' ? 'gobo' : c.attr === 'colorWheel' ? 'color' : 'open' });
      this.render();
    };
    td.append(list, add);
    tr.append(td);
    return tr;
  }

  // --------------------------------------------------------- live DMX test

  private renderTest() {
    const t = this.T;
    const box = this.testBox;
    box.replaceChildren(el('h2', '', t.test));
    if (!this.mode) return;
    const cm = compileMode(this.def, this.modeIx);
    // warnings
    const warn: string[] = [];
    if (this.def.type === 'movinghead' && !(cm.slots.pan && cm.slots.tilt)) warn.push(t.warnPan);
    const s = cm.slots;
    const light = s.dimmer || s.red || s.white || s.cyan || (s.shutter?.ch.caps ?? []).some((c) => c.kind === 'dimmer');
    if (!light) warn.push(t.warnLight);
    box.append(el('div', `note ${warn.length ? 'warn' : ''}`, warn.length ? warn.join(' ') : t.ok));

    const preview = el('div', 'fb-preview');
    const beam = el('div', 'fb-beam');
    const info = el('div', 'fb-info mono');
    preview.append(beam, info);
    const sliders = el('div', 'fb-sliders');
    const update = () => {
      const look = decode(cm, this.dmx, 0, newLook());
      const k = look.open ? look.dimmer : 0;
      const c = (v: number) => Math.round(Math.min(1, v) * 255);
      beam.style.background = `radial-gradient(circle, rgba(${c(look.r)},${c(look.g)},${c(look.b)},${k}) 0%, rgba(${c(look.r)},${c(look.g)},${c(look.b)},${k * 0.4}) 55%, transparent 72%)`;
      beam.style.animation = look.strobeHz > 0 ? `fbstrobe ${(1 / look.strobeHz).toFixed(3)}s steps(2) infinite` : '';
      const deg = this.def.physical.beamDeg ?? [10, 10];
      info.textContent =
        `Pan ${Math.round((look.pan - 0.5) * (this.def.physical.panDeg ?? 540))}°  Tilt ${Math.round((look.tilt - 0.5) * (this.def.physical.tiltDeg ?? 270))}°\n` +
        `Dimmer ${Math.round(look.dimmer * 100)} %  ${look.open ? '' : 'ZU'}\n` +
        `Strobe ${look.strobeHz ? look.strobeHz.toFixed(1) + ' Hz' : '–'}  Gobo ${look.gobo || 'offen'}  Prisma ${look.prism ? 'an' : 'aus'}\n` +
        `Zoom ${(deg[0] + (deg[1] - deg[0]) * look.zoom).toFixed(1)}°`;
    };
    this.mode.channels.forEach((chn, i) => {
      const row = el('label', 'fb-slider');
      const val = el('span', 'mono small', String(this.dmx[i]));
      const sl = el('input');
      sl.type = 'range';
      sl.min = '0';
      sl.max = '255';
      sl.value = String(this.dmx[i]);
      sl.oninput = () => {
        this.dmx[i] = Number(sl.value);
        val.textContent = sl.value;
        update();
      };
      row.append(el('span', 'small', `${i + 1} ${chn.name}`), sl, val);
      sliders.append(row);
    });
    const reset = el('button', 'linkish', t.reset);
    reset.onclick = () => {
      this.dmx.fill(0);
      this.renderTest();
    };
    box.append(preview, sliders, reset);
    update();
  }

  // --------------------------------------------------------------- files

  private flash(msg: string) {
    this.status.textContent = msg;
    setTimeout(() => (this.status.textContent = ''), 2500);
  }

  private async saveLib() {
    if (!this.def.model.trim()) return this.flash(this.T.model + '?');
    this.ensureId();
    await window.vd.storeUserFixture(this.def);
    this.deps.onSaved(structuredClone(this.def));
    this.flash(this.T.saved);
  }

  private async saveFile() {
    this.ensureId();
    const p = await window.vd.fileSave('fixture', { format: 'vd-link-fixture', version: 1, name: this.def.model, fixture: this.def }, this.filePath, !this.filePath);
    if (p) {
      this.filePath = p;
      this.flash(this.T.saved);
    }
  }

  private async openFile() {
    const f = await window.vd.fileOpen('fixture');
    const def = (f?.data as { fixture?: FixtureDef })?.fixture;
    if (def) {
      this.open(def);
      this.filePath = f!.path;
    }
  }
}
