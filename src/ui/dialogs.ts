// Modal dialogs: "Neues Projekt" and "Einstellungen" (VJ-Link style: left navigation, right content).

import { SCENARIOS, SCENARIO_IDS, type ScenarioId } from '../shared/scenarios.ts';
import type { Ctx, Quality } from './ctx.ts';
import { el, icon, seg } from './dom.ts';
import { getLang, LANGS, setLang, t } from './i18n.ts';
import { ma2Assistant } from './ma2.ts';

export class Modal {
  readonly root = el('div', 'modal-back');
  readonly box = el('div', 'modal');
  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
  };
  onClose: () => void = () => {};

  constructor(title: string, wide = false) {
    this.box.classList.toggle('wide', wide);
    const h = el('div', 'modal-head');
    const x = el('button', 'iconbtn');
    x.append(icon('close'));
    x.title = 'Esc';
    x.onclick = () => this.close();
    h.append(el('h2', 'modal-title', title), x);
    this.box.append(h);
    this.root.append(this.box);
    this.root.addEventListener('mousedown', (e) => {
      if (e.target === this.root) this.close();
    });
    document.body.append(this.root);
    addEventListener('keydown', this.onKey, true);
  }

  close() {
    removeEventListener('keydown', this.onKey, true);
    this.root.remove();
    this.onClose();
  }
}

// ============================================================== new project

export function newProjectDialog(): Promise<{ name: string; template: ScenarioId | 'file' } | null> {
  return new Promise((resolve) => {
    const m = new Modal(t('np.title'));
    let done = false;
    m.onClose = () => !done && resolve(null);
    let template: ScenarioId = 'club';
    const name = el('input', 'big-input');
    name.value = t('np.defaultName');
    const nameL = el('label', 'field');
    nameL.append(el('span', '', t('np.name')), name);
    const cards = el('div', 'tpl-grid');
    const renderCards = () => {
      cards.replaceChildren();
      for (const id of SCENARIO_IDS) {
        const sc = SCENARIOS[id];
        const c = el('button', `tpl${id === template ? ' on' : ''}`);
        c.append(icon(id));
        const tx = el('span', 'start-btxt');
        tx.append(
          el('b', '', t(`scen.${id}`)),
          el('small', '', t(`start.${id}.sub` as 'start.club.sub')),
          el('em', '', t('np.facts', { f: sc.fixtures.length, w: sc.walls.length })),
        );
        c.append(tx);
        c.onclick = () => {
          template = id;
          renderCards();
        };
        c.ondblclick = () => create();
        cards.append(c);
      }
      const own = el('button', 'tpl');
      own.append(icon('editor'));
      const tx = el('span', 'start-btxt');
      tx.append(el('b', '', t('np.ownLoc')), el('small', '', t('np.ownLoc.sub')));
      own.append(tx);
      own.onclick = () => {
        done = true;
        resolve({ name: name.value.trim() || t('np.defaultName'), template: 'file' });
        m.close();
      };
      cards.append(own);
    };
    renderCards();
    const foot = el('div', 'modal-foot');
    const cancel = el('button', 'btn', t('common.cancel'));
    cancel.onclick = () => m.close();
    const ok = el('button', 'btn primary', t('np.create'));
    const create = () => {
      done = true;
      resolve({ name: name.value.trim() || t('np.defaultName'), template });
      m.close();
    };
    ok.onclick = create;
    name.onkeydown = (e) => e.key === 'Enter' && create();
    foot.append(el('span', 'muted small', t('np.hint')), cancel, ok);
    const body = el('div', 'modal-body');
    body.append(nameL, el('h2', '', t('np.template')), cards);
    m.box.append(body, foot);
    name.focus();
    name.select();
  });
}

// ================================================================ settings

export type SettingsSection = 'net' | 'ma2' | 'view' | 'ui' | 'about';

export function settingsDialog(ctx: Ctx, section: SettingsSection = 'net') {
  const m = new Modal(t('set.title'), true);
  const nav = el('nav', 'set-nav');
  const content = el('div', 'set-content');
  const body = el('div', 'set-body');
  body.append(nav, content);
  m.box.append(body);
  let ma2: ReturnType<typeof ma2Assistant> | null = null;
  const timer = setInterval(() => ma2?.update(ctx.dmxStatus()), 500);
  m.onClose = () => clearInterval(timer);

  const sections: { id: SettingsSection; label: string }[] = [
    { id: 'net', label: t('set.net') },
    { id: 'ma2', label: 'grandMA2' },
    { id: 'view', label: t('set.view') },
    { id: 'ui', label: t('set.ui') },
    { id: 'about', label: t('set.about') },
  ];

  const toggle = (label: string, value: boolean, onChange: (v: boolean) => void, hint = '') => {
    const row = el('label', 'set-row');
    const box = el('input');
    box.type = 'checkbox';
    box.checked = value;
    box.onchange = () => onChange(box.checked);
    const tx = el('span', 'set-label');
    tx.append(el('b', '', label));
    if (hint) tx.append(el('small', 'muted', hint));
    row.append(tx, box);
    return row;
  };
  const line = (label: string, ctrl: HTMLElement, hint = '') => {
    const row = el('div', 'set-row');
    const tx = el('span', 'set-label');
    tx.append(el('b', '', label));
    if (hint) tx.append(el('small', 'muted', hint));
    row.append(tx, ctrl);
    return row;
  };

  const render = () => {
    ma2 = null;
    nav.replaceChildren(
      ...sections.map((s) => {
        const b = el('button', s.id === section ? 'on' : '', s.label);
        b.onclick = () => {
          section = s.id;
          render();
        };
        return b;
      }),
    );
    content.replaceChildren();
    const app = ctx.app;
    const p = ctx.project();
    if (section === 'net') {
      content.append(
        el('h3', '', t('set.net')),
        toggle(t('set.artnet'), app.artnet, (v) => ((app.artnet = v), ctx.saveApp(), ctx.applyApp()), t('set.artnet.hint')),
        toggle(t('set.sacn'), app.sacn, (v) => ((app.sacn = v), ctx.saveApp(), ctx.applyApp()), t('set.sacn.hint')),
      );
      const uni = el('input');
      uni.type = 'number';
      uni.min = '1';
      uni.max = '32';
      uni.value = String(app.universes);
      uni.onchange = () => {
        app.universes = Math.max(1, Math.min(32, Number(uni.value) || 8));
        ctx.saveApp();
        ctx.applyApp();
      };
      content.append(line(t('set.universes'), uni, t('set.universes.hint')));
      if (p) {
        content.append(el('h3', '', t('set.project', { n: p.name })));
        const num = (val: number, set: (v: number) => void) => {
          const i = el('input');
          i.type = 'number';
          i.min = '0';
          i.max = '16';
          i.value = String(val + 1);
          i.onchange = () => set(Number(i.value) - 1);
          return i;
        };
        content.append(
          line(
            t('conn.mode'),
            seg(
              [
                { id: 'auto', label: t('conn.mode.auto') },
                { id: 'net', label: t('conn.mode.net') },
                { id: 'demo', label: t('conn.mode.demo') },
              ],
              p.dmx.mode,
              (v) => ((p.dmx.mode = v), ctx.changed()),
            ),
            t('set.mode.hint'),
          ),
          line(t('conn.artoffset'), num(p.dmx.artnetOffset, (v) => ((p.dmx.artnetOffset = v), ctx.changed(), void window.vd.setDmxConfig({ artnetOffset: v })))),
          line(t('conn.sacnoffset'), num(p.dmx.sacnOffset, (v) => ((p.dmx.sacnOffset = v), ctx.changed(), void window.vd.setDmxConfig({ sacnOffset: v })))),
        );
      }
    } else if (section === 'ma2') {
      ma2 = ma2Assistant(ctx);
      content.append(ma2.el);
      ma2.update(ctx.dmxStatus());
    } else if (section === 'view') {
      content.append(
        el('h3', '', t('set.view')),
        line(
          t('view.quality'),
          seg<Quality>(
            (['low', 'mid', 'high'] as Quality[]).map((id) => ({ id, label: t(`q.${id}`) })),
            app.quality,
            (v) => ((app.quality = v), ctx.saveApp(), ctx.applyApp()),
          ),
          t('set.quality.hint'),
        ),
        toggle(t('view.bloom'), app.bloom, (v) => ((app.bloom = v), ctx.saveApp(), ctx.applyApp()), t('set.bloom.hint')),
        line(
          t('view.fps'),
          seg<'60' | '0'>(
            [
              { id: '60', label: t('view.fps.60') },
              { id: '0', label: t('view.fps.0') },
            ],
            String(app.fpsCap ?? 60) as '60' | '0',
            (v) => ((app.fpsCap = Number(v) as 60 | 0), ctx.saveApp(), ctx.applyApp()),
          ),
          t('set.fps.hint'),
        ),
      );
    } else if (section === 'ui') {
      content.append(
        el('h3', '', t('set.ui')),
        line(
          t('start.lang'),
          seg(LANGS.map((l) => ({ id: l.id, label: l.label })), getLang(), (l) => {
            setLang(l);
            location.reload();
          }),
          t('set.lang.hint'),
        ),
      );
    } else {
      const about = el('div', 'about');
      about.append(
        el('h3', '', `VD-Link ${ctx.version()}`),
        el('p', '', t('start.tag')),
        el('p', 'muted', '© 2026 Philipp Spruck / NEXTPHILM · Eclipse Public License 2.0'),
        el('p', 'muted small', t('set.about.third')),
      );
      content.append(about);
    }
  };
  render();
  return m;
}

// =========================================================== location wizard

export interface LocationWizardResult {
  name: string;
  kind: 'indoor' | 'outdoor';
  width: number;
  depth: number;
  height: number;
  /** Start empty or from a built-in template. */
  start: 'empty' | ScenarioId;
}

export function locationWizard(): Promise<LocationWizardResult | null> {
  const de = getLang() === 'de';
  return new Promise((resolve) => {
    const m = new Modal(de ? 'Eigene Location bauen' : 'Build own location');
    let done = false;
    m.onClose = () => !done && resolve(null);
    let kind: 'indoor' | 'outdoor' = 'indoor';
    let start: 'empty' | ScenarioId = 'empty';
    const body = el('div', 'modal-body');
    const name = el('input', 'big-input');
    name.value = de ? 'Mein Club' : 'My club';
    const nameL = el('label', 'field');
    nameL.append(el('span', '', 'Name'), name);
    const kinds = el('div', 'tpl-grid');
    const dims = el('div', 'lb-row dims');
    const w = el('input');
    const d = el('input');
    const h = el('input');
    for (const i of [w, d, h]) i.type = 'number';
    const setDims = () => {
      w.value = kind === 'indoor' ? '20' : '120';
      d.value = kind === 'indoor' ? '14' : '100';
      h.value = '6';
      h.disabled = kind === 'outdoor';
    };
    const lab = (t: string, i: HTMLInputElement) => {
      const l = el('label', 'field');
      l.append(el('span', '', t), i);
      return l;
    };
    dims.append(lab(de ? 'Breite (m)' : 'Width (m)', w), lab(de ? 'Tiefe (m)' : 'Depth (m)', d), lab(de ? 'Höhe (m)' : 'Height (m)', h));
    const starts = el('div', 'seg');
    const renderStarts = () => {
      starts.replaceChildren();
      const opts: { id: 'empty' | ScenarioId; label: string }[] =
        kind === 'indoor'
          ? [
              { id: 'empty', label: de ? 'Leer – von Grund auf' : 'Empty – from scratch' },
              { id: 'club', label: de ? 'Vorlage Club' : 'Club template' },
              { id: 'disco', label: de ? 'Vorlage Großraumdisko' : 'Large disco template' },
            ]
          : [
              { id: 'empty', label: de ? 'Leer – von Grund auf' : 'Empty – from scratch' },
              { id: 'festival', label: de ? 'Vorlage Festival' : 'Festival template' },
            ];
      if (!opts.some((o) => o.id === start)) start = 'empty';
      starts.append(seg(opts, start, (v) => (start = v)));
    };
    const renderKinds = () => {
      kinds.replaceChildren();
      for (const k of ['indoor', 'outdoor'] as const) {
        const c = el('button', `tpl${k === kind ? ' on' : ''}`);
        c.append(icon(k === 'indoor' ? 'club' : 'festival'));
        const tx = el('span', 'start-btxt');
        tx.append(
          el('b', '', k === 'indoor' ? 'Indoor-Club' : 'Outdoor-Festival'),
          el('small', '', k === 'indoor' ? (de ? 'Raum mit Wänden und Decke' : 'Room with walls and ceiling') : de ? 'Gelände mit Himmel, Tag/Nacht' : 'Grounds with sky, day/night'),
        );
        c.append(tx);
        c.onclick = () => {
          kind = k;
          setDims();
          renderKinds();
          renderStarts();
        };
        kinds.append(c);
      }
    };
    setDims();
    renderKinds();
    renderStarts();
    body.append(nameL, el('h2', '', de ? 'Was willst du bauen?' : 'What do you want to build?'), kinds, el('h2', '', de ? 'Größe' : 'Size'), dims, el('h2', '', de ? 'Start' : 'Start'), starts);
    const foot = el('div', 'modal-foot');
    const cancel = el('button', 'btn', t('common.cancel'));
    cancel.onclick = () => m.close();
    const ok = el('button', 'btn primary', de ? 'Builder öffnen' : 'Open builder');
    ok.onclick = () => {
      done = true;
      resolve({ name: name.value.trim() || 'Location', kind, width: Number(w.value) || 20, depth: Number(d.value) || 14, height: Number(h.value) || 6, start });
      m.close();
    };
    foot.append(el('span', 'muted small', de ? 'Lichter laufen im Builder nicht – mit „Mit Licht ansehen“ prüfst du das Ergebnis.' : 'Lights do not run in the builder – check with "View with light".'), cancel, ok);
    m.box.append(body, foot);
    name.focus();
    name.select();
  });
}

// ============================================================ fixture picker

export interface PickerSource {
  search(q: string, type?: string, limit?: number): import('../shared/fixture-types.ts').FixtureIndexEntry[];
  fetchDef(id: string): Promise<import('../shared/fixture-types.ts').FixtureDef | undefined>;
}

export function fixturePicker(src: PickerSource): Promise<import('../shared/fixture-types.ts').FixtureDef | null> {
  const de = getLang() === 'de';
  return new Promise((resolve) => {
    const m = new Modal(de ? 'Lampe wählen' : 'Choose lamp');
    let done = false;
    m.onClose = () => !done && resolve(null);
    const body = el('div', 'modal-body picker');
    const q = el('input', 'big-input');
    q.placeholder = de ? 'Suchen: Hersteller oder Modell (z. B. uking, beam)' : 'Search: manufacturer or model';
    const list = el('ul', 'picker-list');
    const render = () => {
      list.replaceChildren();
      for (const e of src.search(q.value, '', 150)) {
        const li = el('li');
        li.append(el('span', '', `${e.manufacturer} – ${e.model}`), el('small', '', `${e.db === 'user' ? (de ? 'Eigen' : 'Own') : e.db.toUpperCase()} · ${e.modes.map((x) => x.channels).join('/')} ch`));
        li.onclick = async () => {
          const d = await src.fetchDef(e.id);
          if (!d) return;
          done = true;
          resolve(d);
          m.close();
        };
        list.append(li);
      }
    };
    let timer = 0;
    q.oninput = () => {
      clearTimeout(timer);
      timer = window.setTimeout(render, 100);
    };
    body.append(q, list);
    m.box.append(body);
    render();
    q.focus();
  });
}
