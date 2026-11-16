// VD-Link – renderer entry.
// Boot order: start screen first (no GPU work). The 3D view is created when the
// first project is opened (new, open, recent, demo, continue).

import { DEMO_SCENES, DEMO_SCENE_SECONDS } from './shared/demo-rig.ts';
import type { FixtureDef } from './shared/fixture-types.ts';
import { VD_GENERIC_MH } from './shared/fixtures/vd-generic-mh.ts';
import { SCENARIO_IDS, type ScenarioId } from './shared/scenarios.ts';
import {
  loadAppSettings,
  loadAutosave,
  newProject,
  normalize,
  saveAppSettings,
  saveAutosave,
  type ProjectData,
} from './project.ts';
import type { CamId, Ctx, TabId } from './ui/ctx.ts';
import { newProjectDialog, settingsDialog, type SettingsSection } from './ui/dialogs.ts';
import { el, icon, logoSlots, seg } from './ui/dom.ts';
import { DEMO_SCENE_NAMES, getLang, t } from './ui/i18n.ts';
import { ConnectPanel, LibraryPanel, PatchPanel, WallsPanel, type Panel } from './ui/panels.ts';
import { StartScreen } from './ui/startscreen.ts';
import { Viz } from './viz.ts';
import { LocationBuilder } from './builder/location-builder.ts';
import { FixtureBuilder } from './ui/fixture-builder.ts';
import { fixturePicker, locationWizard } from './ui/dialogs.ts';
import { openGallery, pickFromGallery } from './ui/gallery.ts';
import { newLocation, normalizeLocation, scenarioToLocation, type LocationData } from './shared/location.ts';
import { SCENARIOS } from './shared/scenarios.ts';
import { projectFromLocation, projectScenario } from './project.ts';
import type { DmxStatus } from '../electron/preload.ts';

const params = new URLSearchParams(location.search);
/** False while the window is minimised or hidden (sent by the main process). */
let windowVisible = true;
window.vd.onWindowVisible?.((v) => {
  windowVisible = v;
  // Builder and library preview read this too.
  document.documentElement.dataset.winHidden = v ? '' : '1';
});
const log = (...a: unknown[]) => console.log('[vd]', ...a);
document.documentElement.lang = getLang();

// Running outside Electron (plain browser): offline stub.
if (!window.vd) {
  const noop = async () => ({}) as never;
  window.vd = new Proxy(
    {
      platform: 'browser',
      appInfo: async () => ({ version: '0.0.0', platform: 'browser', arch: '' }),
      netInfo: async () => [],
      projectRecent: async () => [],
      userFixtures: async () => [],
      projectPending: async () => null,
      fileOpen: async () => null,
      projectOpen: async () => null,
      fileSave: async () => null,
      projectSave: async () => null,
      listCaptureSources: async () => [],
      openUrl: async (u: string) => void window.open(u, '_blank'),
    } as Record<string, unknown>,
    { get: (o, k: string) => (k in o ? o[k] : k.startsWith('on') || k === 'projectState' ? () => {} : noop) },
  ) as unknown as typeof window.vd;
}

// ------------------------------------------------------------------- state

const app = loadAppSettings();
const appInfo = await window.vd.appInfo().catch(() => ({ version: '0.0.0', platform: '', arch: '' }));
void window.vd.setLang(getLang());
let project: ProjectData | null = null;
let projectPath: string | null = null;
let dirty = false;
let viz: Viz | null = null;
let dmxStatus: DmxStatus = { sources: [], errors: [], active: false };
let currentTab: TabId = 'view';

window.vd.onDmxFrame((d) => viz?.netDmx.set(d.subarray(0, viz.netDmx.length)));
window.vd.onDmxStatus((s) => (dmxStatus = s));

function applyNet() {
  void window.vd.setDmxConfig({
    artnet: app.artnet,
    sacn: app.sacn,
    universes: app.universes,
    artnetOffset: project?.dmx.artnetOffset ?? 0,
    sacnOffset: project?.dmx.sacnOffset ?? 0,
  });
}
applyNet();

const usingNetwork = () => !!project && (project.dmx.mode === 'net' || (project.dmx.mode === 'auto' && dmxStatus.active));

function reportState() {
  if (project) saveAutosave(project, projectPath, dirty);
  window.vd.projectState({ path: projectPath, dirty, data: project });
  document.title = project ? `${dirty ? '● ' : ''}${project.name} – VD-Link` : 'VD-Link';
  renderProjectButton();
}

const ctx: Ctx = {
  project: () => project,
  app,
  changed() {
    if (!project) return;
    project.modified = new Date().toISOString();
    dirty = true;
    reportState();
  },
  saveApp: () => saveAppSettings(app),
  applyApp() {
    applyNet();
    viz?.applyApp(app);
  },
  rig: () => viz?.rig ?? null,
  looks: () => viz?.looks ?? [],
  dmx: () => viz?.currentDmx() ?? new Uint8Array(512),
  dmxStatus: () => dmxStatus,
  usingNetwork,
  walls: () => viz?.walls ?? [],
  setScenario(id) {
    if (!project) return;
    project.venue = { template: id };
    ctx.changed();
    void wallsPanel.resetVirtual();
    void reload();
  },
  setFixture(def, modeIndex) {
    if (!project) return;
    project.fixture = { id: def.id, mode: modeIndex };
    ctx.changed();
    void reload();
  },
  goTab(id) {
    currentTab = id;
    document.querySelectorAll<HTMLElement>('main > .tab').forEach((s) => s.classList.toggle('on', s.id === `tab-${id}`));
    document.querySelectorAll<HTMLButtonElement>('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === id));
    if (id === 'walls') void wallsPanel.refresh().then(() => wallsPanel.render());
    else panels[id]?.render();
    if (id === 'view') viz?.resize();
  },
  version: () => appInfo.version,
  cmd(c, arg) {
    void command(c, arg);
  },
};

const library = new LibraryPanel(document.getElementById('tab-library')!, ctx);
const wallsPanel = new WallsPanel(document.getElementById('tab-walls')!, ctx);
const panels: Partial<Record<TabId, Panel>> = {
  patch: new PatchPanel(document.getElementById('tab-patch')!, ctx),
  library,
  walls: wallsPanel,
  connect: new ConnectPanel(document.getElementById('tab-connect')!, ctx),
};
const start = new StartScreen(ctx);
const shell = document.getElementById('shell')!;

// ----------------------------------------------------------- project flow

async function ensureViz() {
  if (viz) return viz;
  viz = await Viz.create(document.getElementById('view')!, app, params.get('webgl') === '1');
  viz.useNetwork = usingNetwork;
  viz.isVisible = () => windowVisible && currentTab === 'view' && !start.visible && !document.hidden && !locBuilder.visible && !fixBuilder.visible;
  viz.debug = { nosurf: params.get('nosurf') === '1', nobeams: params.get('nobeams') === '1' };
  if (params.get('t')) viz.setTimeOffset(Number(params.get('t')));
  viz.onSecond = (fps, tt) => {
    renderStatus(fps, tt);
    void start.tick();
    if (params.get('perflog') === '1' || Math.floor(tt) % 4 === 0) log(`perf fps=${fps} beams=${viz!.beamCount} fixtures=${viz!.rig?.fixtures.length} backend=${viz!.backend} tab=${currentTab}`);
  };
  log(`viz started backend=${viz.backend}`);
  return viz;
}

async function reload() {
  if (!project) return;
  const v = await ensureViz();
  const def: FixtureDef = (await library.fetchDef(project.fixture.id)) ?? VD_GENERIC_MH;
  const sc = projectScenario(project);
  // Resolve every lamp type used in the location before building the rig.
  const ids = [...new Set(sc.fixtures.map((f) => f.fixtureId).filter((x): x is string => !!x))];
  const defs = new Map<string, FixtureDef>();
  for (const id of ids) {
    const d = await library.fetchDef(id);
    if (d) defs.set(id, d);
  }
  v.load(def, project, sc, (id) => defs.get(id));
  renderToolbar();
  for (const p of Object.values(panels)) p?.render();
  log(`load ${project.venue.template}: ${def.manufacturer} ${def.model} ×${v.rig.fixtures.length}, ${v.rig.universes} universes`);
}

async function openProject(p: ProjectData, path: string | null, isDirty = false) {
  await wallsPanel.resetVirtual();
  project = p;
  projectPath = path;
  dirty = isDirty;
  library.setProjectDefs(p.customFixtures ?? []);
  applyNet();
  shell.hidden = false;
  start.hide();
  await reload();
  ctx.goTab('view');
  reportState();
}

async function save(saveAs: boolean) {
  if (!project) return;
  // Embed own lamps so the project file works on every computer.
  const own = new Map<string, FixtureDef>();
  for (const f of viz?.rig?.fixtures ?? []) if (f.def.source.db === 'user') own.set(f.def.id, f.def);
  project.customFixtures = [...own.values()];
  const p = await window.vd.projectSave(project, projectPath, saveAs);
  if (!p) return;
  projectPath = p;
  dirty = false;
  reportState();
  toast(t('proj.saved', { p: p.split(/[\\/]/).pop() ?? p }));
}

async function command(c: string, arg?: unknown) {
  try {
    if (c === 'new') {
      const r = await newProjectDialog();
      if (!r) return;
      if (r.template === 'file') {
        const f = await window.vd.fileOpen('location');
        if (f) await openProject(projectFromLocation(r.name, normalizeLocation(f.data)), null, true);
      } else await openProject(newProject(r.name, r.template), null, true);
    } else if (c === 'demo') {
      await openProject(newProject('Demo', 'club'), null, false);
    } else if (c === 'open') {
      const a = (arg ?? {}) as { path?: string; autosave?: boolean };
      if (a.autosave) {
        const auto = loadAutosave();
        if (auto) await openProject(auto.project, auto.path, auto.dirty);
        return;
      }
      if (a.path) return await openAny(a.path);
      const f = await window.vd.projectOpen();
      if (f) await openProject(normalize(f.data), f.path, false);
    } else if (c === 'openPath') {
      await openAny(String(arg));
    } else if (c === 'save') await save(false);
    else if (c === 'saveAs') await save(true);
    else if (c === 'start') {
      await start.show();
    } else if (c === 'settings') settingsDialog(ctx, (arg as SettingsSection) ?? 'net');
    else if (c === 'fixtureBuilder') {
      const a = (arg ?? {}) as { def?: FixtureDef; copy?: boolean };
      fixBuilder.open(a.def, a.copy);
    } else if (c === 'locationBuilder') {
      const a = (arg ?? {}) as { fromProject?: boolean };
      if (a.fromProject && project) {
        const loc =
          project.venue.template === 'custom' && project.venue.location
            ? project.venue.location
            : scenarioToLocation(SCENARIOS[project.venue.template as ScenarioId], project.name, project.fixture);
        await locBuilder.open(loc, null, true);
        return;
      }
      const w = await locationWizard();
      if (!w) return;
      let loc: LocationData;
      if (w.start === 'empty') loc = newLocation(w.name, w.kind);
      else loc = scenarioToLocation(SCENARIOS[w.start], w.name, { id: VD_GENERIC_MH.id, mode: 0 });
      loc.room = { width: w.width, depth: w.depth, height: w.kind === 'indoor' ? w.height : 0 };
      if (w.start !== 'empty') {
        // Templates bring their own size.
        const sc = SCENARIOS[w.start];
        loc.room = sc.room ? { width: sc.room.width, depth: sc.room.depth, height: sc.room.height } : { width: sc.ground!.width, depth: sc.ground!.depth, height: 0 };
      }
      start.hide();
      await locBuilder.open(loc);
    } else if (c === 'openLocation') {
      const f = await window.vd.fileOpen('location');
      if (f) {
        start.hide();
        await locBuilder.open(normalizeLocation(f.data), f.path);
      }
    }
  } catch (e) {
    toast(t('proj.error', { e: (e as Error).message }), true);
  }
}
window.vd.onMenu((c, arg) => void command(c, arg));

/** Opens a project, location or lamp file by its type. */
async function openAny(path: string) {
  const f = await window.vd.fileOpenPath(path);
  if (f.kind === 'location') {
    start.hide();
    await locBuilder.open(normalizeLocation(f.data), f.path);
  } else if (f.kind === 'fixture') {
    const def = (f.data as { fixture?: FixtureDef }).fixture;
    if (def) fixBuilder.open(def);
  } else await openProject(normalize(f.data), f.path, false);
}

// ------------------------------------------------------------- builders

const locBuilder = new LocationBuilder({
  preview: (loc) => {
    void (async () => {
      locBuilder.hideForPreview();
      if (locBuilder.isFromProject && project) {
        project.venue = { template: 'custom', location: loc };
        ctx.changed();
        await reload();
        shell.hidden = false;
        start.hide();
        ctx.goTab('view');
      } else await openProject(projectFromLocation(loc.name, loc), null, true);
    })();
  },
  pickFixture: () => pickFromGallery(ctx),
  gallery: (onAdd) => openGallery(ctx, onAdd),
  fixtureName: (id) => library.fetchDef(id),
  onClose: () => {
    if (!project) void start.show();
  },
});

const fixBuilder = new FixtureBuilder({
  pickFixture: () => fixturePicker(library),
  onSaved: async () => {
    await library.reloadUser();
    if (currentTab === 'library') library.render();
  },
});

// -------------------------------------------------------------- header etc.

function renderHeader() {
  const logo = document.getElementById('logo')!;
  logo.replaceChildren(logoSlots(), document.createTextNode('VD-Link'));
  logo.style.cursor = 'pointer';
  logo.title = t('proj.start');
  logo.onclick = () => void command('start');

  const tabs = document.getElementById('tabs')!;
  tabs.replaceChildren();
  for (const id of ['view', 'patch', 'library', 'walls', 'connect'] as TabId[]) {
    const b = el('button', id === currentTab ? 'on' : '', t(`tab.${id}`));
    b.dataset.tab = id;
    b.setAttribute('role', 'tab');
    b.onclick = () => ctx.goTab(id);
    tabs.append(b);
  }
  const gear = document.getElementById('gear')!;
  gear.replaceChildren(icon('settings'));
  gear.title = t('set.title');
  gear.onclick = () => void command('settings');
}

function renderProjectButton() {
  const btn = document.getElementById('proj-btn')!;
  const menu = document.getElementById('proj-menu')!;
  btn.replaceChildren(document.createTextNode(project?.name ?? t('untitled')));
  if (dirty) {
    const d = el('b', 'dirty', '●');
    d.title = t('proj.unsaved');
    btn.append(d);
  }
  btn.append(document.createTextNode(' ▾'));
  btn.onclick = (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
  };
  menu.replaceChildren();
  const item = (label: string, kbd: string, run: () => void, on = false) => {
    const b = el('button', on ? 'on' : '');
    b.append(document.createTextNode(label));
    if (kbd) b.append(el('kbd', '', kbd));
    b.onclick = () => {
      menu.hidden = true;
      run();
    };
    menu.append(b);
  };
  const mod = window.vd.platform === 'darwin' ? '⌘' : 'Ctrl+';
  item(t('proj.new'), `${mod}N`, () => void command('new'));
  item(t('proj.open'), `${mod}O`, () => void command('open'));
  item(t('proj.save'), `${mod}S`, () => void command('save'));
  item(t('proj.saveAs'), `⇧${mod}S`, () => void command('saveAs'));
  menu.append(el('hr'));
  item(t('proj.editLocation'), '', () => void command('locationBuilder', { fromProject: true }));
  item(t('proj.fixtureBuilder'), '', () => void command('fixtureBuilder'));
  menu.append(el('hr'), el('div', 'menu-label', t('proj.venue')));
  for (const id of SCENARIO_IDS) item(t(`scen.${id}`), '', () => ctx.setScenario(id as ScenarioId), project?.venue.template === id);
  menu.append(el('hr'));
  item(t('proj.start'), '', () => void command('start'));
}
addEventListener('click', () => (document.getElementById('proj-menu')!.hidden = true));

function renderStatus(fps: number, tt: number) {
  const statusEl = document.getElementById('status')!;
  const hudEl = document.getElementById('hud')!;
  const net = usingNetwork();
  const n = new Set(dmxStatus.sources.map((s) => s.address + s.proto)).size;
  const dmxPill = el('button', `pill ${net ? 'ok' : 'warn'}`);
  dmxPill.append(el('span', 'dot'), document.createTextNode(net ? t('pill.net', { n }) : t('pill.demo')));
  dmxPill.onclick = () => ctx.goTab('connect');
  statusEl.replaceChildren(dmxPill, el('span', 'pill', viz && currentTab === 'view' ? `${viz.backend} · ${t('common.fps', { n: fps })}` : viz?.backend ?? ''));
  if (!viz?.rig) return;
  const sceneName = DEMO_SCENE_NAMES[getLang()][Math.floor(tt / DEMO_SCENE_SECONDS) % DEMO_SCENES.length];
  hudEl.replaceChildren(
    el('span', 'pill', net ? t('view.net') : t('view.demoScene', { s: sceneName })),
    el('span', 'pill', viz.rig.types.length === 1 ? `${viz.rig.types[0].def.manufacturer} ${viz.rig.types[0].def.model} ×${viz.rig.fixtures.length}` : `${viz.rig.fixtures.length} Fixtures · ${viz.rig.types.length} Typen`),
    el('span', 'pill', t('view.beams', { n: viz.beamCount })),
  );
}

function renderToolbar() {
  if (!project || !viz) return;
  const p = project;
  const v = viz;
  const tb = document.getElementById('toolbar')!;
  const group = (label: string, ...c: HTMLElement[]) => {
    const g = el('div', 'tb-group');
    g.append(el('span', '', label), ...c);
    return g;
  };
  const cam = seg<CamId>(
    (['audience', 'dj', 'wide', 'side'] as CamId[]).map((id) => ({ id, label: t(`cam.${id}`) })),
    p.view.camera,
    (c) => {
      p.view.camera = c;
      ctx.changed();
      v.setCamera(c);
    },
  );
  const haze = el('input');
  haze.type = 'range';
  haze.min = '0';
  haze.max = '1.5';
  haze.step = '0.01';
  haze.value = String(p.view.haze);
  haze.oninput = () => {
    p.view.haze = Number(haze.value);
    v.setHaze(p.view.haze);
  };
  haze.onchange = () => ctx.changed();
  const items: HTMLElement[] = [group(t('view.cam'), cam)];
  if (v.venue?.outdoor) {
    items.push(
      group(
        t('view.time'),
        seg<'day' | 'night'>(
          [
            { id: 'day', label: t('view.day') },
            { id: 'night', label: t('view.night') },
          ],
          p.view.day ? 'day' : 'night',
          (d) => {
            p.view.day = d === 'day';
            ctx.changed();
            v.setDay(p);
          },
        ),
      ),
    );
  }
  const full = el('button', 'iconbtn');
  full.title = t('view.full');
  full.append(icon('full'));
  full.onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.getElementById('tab-view')!.requestFullscreen());
  items.push(group(t('view.haze'), haze), full);
  tb.replaceChildren(...items);
}

let toastTimer = 0;
function toast(msg: string, error = false) {
  let box = document.getElementById('toast');
  if (!box) {
    box = el('div', 'toast');
    box.id = 'toast';
    document.body.append(box);
  }
  box.textContent = msg;
  box.classList.toggle('err', error);
  box.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (box!.hidden = true), 3500);
}

// Panels tick a few times per second while visible.
setInterval(() => {
  if (project && !start.visible) panels[currentTab]?.tick();
  if (start.visible) void start.tick();
}, 300);

// --------------------------------------------------------------------- boot

renderHeader();
renderProjectButton();
await library.ready;
log(`started version=${appInfo.version} library=${library.count}`);

const pending = await window.vd.projectPending();
if (pending) await command('openPath', pending);
else if (params.get('project') === 'new') await openProject(newProject(params.get('name') ?? 'Test', (params.get('scenario') as ScenarioId) ?? 'club'), null, true);
else if (params.get('project') === 'demo') {
  const p = newProject('Demo', (params.get('scenario') as ScenarioId) ?? 'club');
  if (params.get('day')) p.view.day = params.get('day') === '1';
  if (params.get('camera')) p.view.camera = params.get('camera') as CamId;
  await openProject(p, null, false);
  if (params.get('tab')) ctx.goTab(params.get('tab') as TabId);
  // Development: pick a lamp / search text in the library for screenshots.
  if (params.get('libfixture') || params.get('libq'))
    setTimeout(async () => {
      const lib = library as unknown as { q: string; renderList(): void; renderDetail(d: unknown, m: number): void };
      if (params.get('libq')) {
        lib.q = params.get('libq')!;
        lib.renderList();
      }
      const d = params.get('libfixture') ? await library.fetchDef(params.get('libfixture')!) : null;
      if (d) lib.renderDetail(d, Number(params.get('libmode') ?? 0));
    }, 1500);
  const cp = params.get('campos')?.split(',').map(Number);
  const ct = params.get('camtarget')?.split(',').map(Number);
  if (cp?.length === 3 && ct?.length === 3) (viz as Viz | null)?.setCameraRaw(cp as [number, number, number], ct as [number, number, number]);
} else await start.show();
// Development only: handle for automated UI tests in the browser.
if (import.meta.env.DEV) (window as unknown as { __vd: unknown }).__vd = { locBuilder, fixBuilder, library, ctx };

// Development screenshots: open builders directly.
if (params.get('builder')) {
  const k = params.get('builder')!;
  const loc = k === 'club' || k === 'disco' || k === 'festival' ? scenarioToLocation(SCENARIOS[k], 'Test', { id: VD_GENERIC_MH.id, mode: 0 }) : newLocation('Test', k === 'outdoor' ? 'outdoor' : 'indoor');
  start.hide();
  await locBuilder.open(loc);
}
if (params.get('locfile')) {
  await openAny(params.get('locfile')!);
  if (params.get('topview') === '1') (locBuilder as unknown as { topView(): void }).topView();
  if (params.get('preview') === '1') {
    locBuilder.previewNow();
    if (params.get('tab')) setTimeout(() => ctx.goTab(params.get('tab') as TabId), 1500);
    const cp = params.get('campos')?.split(',').map(Number);
    const ct = params.get('camtarget')?.split(',').map(Number);
    if (cp?.length === 3 && ct?.length === 3) setTimeout(() => (viz as Viz | null)?.setCameraRaw(cp as [number, number, number], ct as [number, number, number]), 2000);
    if (params.get('haze')) setTimeout(() => (viz as Viz | null)?.setHaze(Number(params.get('haze'))), 2100);
    if (params.get('worklight') === '1') setTimeout(() => (viz as Viz | null)?.setWorkLight(true), 2100);
  }
}
if (params.get('preview') === '1' && params.get('builder')) locBuilder.previewNow();
// Development: builder side, gallery and a test drop for screenshots.
{
  const lb = locBuilder as unknown as { side: string; renderLeft(): void; placeLamp(t: { id: string; mode: number }, at: { x: number; y: number } | null): void };
  if (params.get('lbside') === 'tech') {
    lb.side = 'tech';
    lb.renderLeft();
  }
  if (params.get('lbdrop'))
    setTimeout(() => {
      const aim = params.get('lbtruss') ? locBuilder.screenPointOf(params.get('lbtruss')!) : null;
      void lb.placeLamp({ id: params.get('lbdrop')!, mode: Number(params.get('lbmode') ?? 0) }, aim ?? { x: Number(params.get('dx') ?? innerWidth / 2), y: Number(params.get('dy') ?? innerHeight / 2) });
      if (params.get('lbfocus') === '1') setTimeout(() => (locBuilder as unknown as { focusSelected(): void }).focusSelected(), 1500);
    }, 2500);
  if (params.get('gallery') === '1') setTimeout(() => openGallery(ctx, () => {}), 1500);
}
if (params.get('fixbuilder') === '1') fixBuilder.open(await library.fetchDef(params.get('fixture') ?? VD_GENERIC_MH.id));
if (params.get('dialog') === 'new') void command('new');
if (params.get('dialog') === 'locwizard') void command('locationBuilder');
if (params.get('dialog') === 'settings') void command('settings', params.get('section') ?? 'net');
if (params.get('autowall') === '1') setTimeout(() => void wallsPanel.createVirtual(0), 1500);

// Automated tests: save the opened project to a given path without a dialog.
if (params.get('testsave'))
  setTimeout(async () => {
    if (!project) return;
    projectPath = params.get('testsave');
    await save(false);
    log(`saved ${projectPath}`);
  }, 2500);
