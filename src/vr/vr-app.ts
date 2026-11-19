// VD-Link VR viewer – runs in the browser of the headset (Pico, Quest …) or in Chrome/Edge
// for PC VR. VD-Link (desktop) serves this page, the scene of the open project and the
// live DMX. The headset builds the same scene with the same code and renders it itself.

import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { decode, newLook, type Look } from '../shared/dmx-codec.ts';
import { buildRig, type Rig } from '../shared/demo-rig.ts';
import type { FixtureDef } from '../shared/fixture-types.ts';
import type { Scenario } from '../shared/scenarios.ts';
import { normalize, projectScenario, type ProjectData } from '../project.ts';
import { beamFeatures, beamGlobals } from '../render/beam.ts';
import { RigRenderer } from '../render/fixture.ts';
import { createGoboAtlas } from '../render/gobos.ts';
import { BeamLightBuffer } from '../render/lighting.ts';
import { buildVenue, type Venue } from '../render/venue.ts';
import { VideoWall, type MirrorState, type ScreenSettings } from '../render/videowall.ts';
import { Player, TeleportArc } from './locomotion.ts';
import { VrHint, VrMenu, type MenuModel } from './menu.ts';
import { AMBIENT, AMBIENT_LABEL, isStandalone, loadSettings, QUALITY_LABEL, saveSettings, TURN_LABEL, type VrSettings } from './settings.ts';

const UNIVERSES = 32;
const CAM_NAMES: Record<string, string> = { audience: 'Publikum', dj: 'DJ-Pult', wide: 'Totale', side: 'Seite' };
/** Surface light spots per quality (the per-pixel loop is the most expensive part on mobile chips). */
const SPOT_CAP = { low: 20, mid: 40, high: 0 };
// No depth-buffer copy for soft beam edges in the headset (expensive on tile-based GPUs).
beamFeatures.depthSoft = false;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// ------------------------------------------------------------------ remote log
// Headset browsers have no visible console: errors and a short status go back to VD-Link
// (userData/vr-log.txt) so problems on the device can be read on the computer.
const logBuf: string[] = [];
function rlog(msg: string) {
  logBuf.push(`${new Date().toISOString().slice(11, 19)} ${msg}`.slice(0, 2000));
}
addEventListener('error', (e) => rlog(`error: ${e.message} @ ${e.filename}:${e.lineno}`));
addEventListener('unhandledrejection', (e) => rlog(`rejection: ${(e.reason as Error)?.stack ?? e.reason}`));
for (const k of ['error', 'warn'] as const) {
  const orig = console[k].bind(console);
  console[k] = (...a: unknown[]) => {
    rlog(`console.${k}: ${a.map((x) => (x instanceof Error ? x.stack : String(x))).join(' ')}`);
    orig(...a);
  };
}
setInterval(() => {
  if (!logBuf.length) return;
  void fetch('api/log', { method: 'POST', body: logBuf.splice(0).join('\n') }).catch(() => {});
}, 2000);
rlog(`start ${navigator.userAgent}`);
const params = new URLSearchParams(location.search);
/** Debug switches for the on-device measurement (and ?nobeams=1 etc.). */
const dbg = { beams: params.get('nobeams') !== '1', surf: params.get('nosurf') !== '1', spill: params.get('nospill') !== '1', walls: params.get('nowalls') !== '1' };
const settings: VrSettings = loadSettings();
/** Room light (adjustable „Grundlicht“). */
const roomLight = new THREE.HemisphereLight(0xe8eef8, 0x303038, AMBIENT[settings.ambient]);

interface ScenePayload {
  project: ProjectData;
  def: FixtureDef;
  defs: Record<string, FixtureDef>;
}

// ------------------------------------------------------------------ state
let renderer: THREE.WebGPURenderer;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 1500);
let orbit: OrbitControls;
const lights = new BeamLightBuffer(createGoboAtlas());
const world = new THREE.Group();
let rig: Rig | null = null;
let rigRenderer: RigRenderer | null = null;
let venue: Venue | null = null;
let walls: VideoWall[] = [];
let looks: Look[] = [];
let sc: Scenario | null = null;
let project: ProjectData | null = null;
let walkables: THREE.Object3D[] = [];
let solids: THREE.Object3D[] = [];
let hazeEnv = 1;
let crowdMesh: THREE.InstancedMesh | null = null;
const dmx = new Uint8Array(UNIVERSES * 512);
let lastDmx = 0;
let connected = false;
let fps = 0;

const player = new Player();
const arc = new TeleportArc();
const menu = new VrMenu();
const hint = new VrHint(['Rechter Stick nach vorn: zielen, loslassen = springen', 'Rechter Stick zur Seite: drehen', 'Linker Stick: laufen', 'Taste B oder Y: Menü · Abzug: auswählen']);
let baseSpace: XRReferenceSpace | null = null;
const vignette = makeVignette();

// ------------------------------------------------------------------ boot
async function boot() {
  status('Verbinde mit VD-Link …');
  const emu = params.get('emulate');
  if (emu) {
    // Test without a headset: emulated Quest (IWER, MIT) – only with ?emulate=quest2|quest3.
    const { XRDevice, metaQuest2, metaQuest3 } = await import('iwer');
    const dev = new XRDevice(emu === 'quest2' ? metaQuest2 : metaQuest3);
    dev.installRuntime({ forceInstall: true });
    (window as unknown as { __xr: unknown }).__xr = dev;
  }
  // Multiview: both eyes in one pass (OVR_multiview2) – halves the draw calls in VR. ?multiview=0 switches it off.
  const multiview = params.get('multiview') !== '0' && settings.multiview;
  // Always with antialiasing: without it three.js draws straight into the headset's framebuffer,
  // which stayed black on the Pico 4 Ultra (MSAA is cheap on mobile GPUs anyway).
  renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL: true, multiview } as ConstructorParameters<typeof THREE.WebGPURenderer>[0]);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.xr.enabled = true;
  $('view').appendChild(renderer.domElement);
  await renderer.init();
  {
    const gl = (renderer.backend as unknown as { gl?: WebGL2RenderingContext }).gl;
    const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
    rlog(`renderer ${(renderer.backend as { isWebGPUBackend?: boolean }).isWebGPUBackend ? 'WebGPU' : 'WebGL2'} ${gl && dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : ''} secure=${isSecureContext} xr=${!!navigator.xr} multiview=${multiview} ovr=${!!gl?.getExtension('OVR_multiview2')}`);
  }
  if (emu) {
    // The emulator renders into the page's own framebuffer (null) – real headsets hand over a framebuffer object.
    const st = (renderer.backend as unknown as { state?: { drawBuffers?: (rc: unknown, fb: unknown) => unknown } }).state;
    if (st?.drawBuffers) {
      const orig = st.drawBuffers.bind(st);
      st.drawBuffers = (rc, fb) => (fb ? orig(rc, fb) : undefined);
    }
  }
  scene.background = new THREE.Color(0x020203);
  scene.add(roomLight, world, arc.group, menu.mesh, hint.mesh, vignette);
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableDamping = true;
  setupControllers();
  addEventListener('resize', resize);
  resize();
  renderer.setAnimationLoop(frame);
  await loadScene();
  connectEvents();
  await setupEnterButton();
  renderSettingsUi();
  if (isStandalone() || params.get('bench') === '1') void bench();
}

/**
 * On the headset: measure once what costs how much (flat view, before entering VR) and
 * report it to VD-Link. Each step ~2 s; stops as soon as VR starts.
 */
async function bench() {
  const steps: [string, () => void][] = [
    // (No light switching here: adding/removing lights recompiles every shader.)
    ['alles', () => {}],
    ['ohne Lichtflecken', () => (dbg.surf = false)],
    ['zusätzlich ohne Lichtkegel', () => (dbg.beams = false)],
    ['zusätzlich ohne Videowände', () => (dbg.walls = false)],
    ['zusätzlich halbe Auflösung', () => renderer.setPixelRatio(0.4)],
  ];
  const saved = { ...dbg };
  const out: string[] = [];
  status('Messe die Leistung der Brille … (10 s)');
  await new Promise((r) => setTimeout(r, 2500));
  for (const [name, apply] of steps) {
    if (renderer.xr.isPresenting) break;
    apply();
    applyQuality();
    await new Promise((r) => setTimeout(r, 2200));
    out.push(`${name}: ${fps} fps (CPU ${cpuMs.toFixed(1)} ms)`);
  }
  Object.assign(dbg, saved);
  applyQuality();
  if (!renderer.xr.isPresenting) renderer.setPixelRatio(settings.quality === 'low' ? 0.75 : 1);
  status('');
  rlog(`bench q=${settings.quality} ${innerWidth}x${innerHeight}@${devicePixelRatio}: ${out.join(' | ')}`);
}

async function loadScene() {
  status('Lade Szene …');
  const r = await fetch('api/scene', { cache: 'no-store' }).catch(() => null);
  if (!r || !r.ok) {
    status(r?.status === 503 ? 'In VD-Link ist noch kein Projekt geöffnet.' : 'VD-Link nicht erreichbar.', true);
    return false;
  }
  const data = (await r.json()) as ScenePayload;
  build(data);
  status('Shader werden vorbereitet …');
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* compiled on first frame instead */
  }
  status('');
  return true;
}

function build(data: ScenePayload) {
  const keepPlayer = !!sc;
  // Tear down the previous scene.
  world.clear();
  venue?.dispose();
  for (const w of walls) w.dispose();
  walls = [];
  project = normalize(data.project);
  sc = projectScenario(project);
  const def = data.def;
  const lookup = (id: string) => data.defs[id];
  rig = buildRig(def, Math.min(project.fixture.mode, def.modes.length - 1), sc, lookup);
  rigRenderer = new RigRenderer(rig, def);
  looks = rig.fixtures.map(() => newLook());
  venue = buildVenue(sc, rig, lights);
  world.add(rigRenderer.group, venue.group);
  // Video walls: test image (live pictures follow in a later step).
  const surface = (ws: Scenario['walls'][number]) => ({ name: ws.name, width: ws.width, height: ws.height, pos: ws.pos, rot: ws.rot ?? ([0, ws.rotY, 0] as [number, number, number]), rect: ws.rect });
  for (const out of sc.outputs ?? []) {
    const members = sc.walls.filter((w) => w.output === out.id && w.rect);
    if (members.length) walls.push(new VideoWall(out.name, out.pixels, members.map(surface), true));
  }
  for (const ws of sc.walls.filter((w) => !w.output || !w.rect || !(sc!.outputs ?? []).some((o) => o.id === w.output))) walls.push(new VideoWall(ws.name, ws.pixels, [surface(ws)]));
  for (const w of walls) world.add(w.group);
  wallBusy.clear();
  applyWallStates();
  const env = venue.setDay(project.view.day, scene, renderer);
  hazeEnv = env.haze;
  applyQuality();
  world.updateMatrixWorld(true);
  collectWalkables();
  document.title = `${project.name} – VD-Link VR`;
  $('proj').textContent = project.name;
  spots = makeSpots();
  crowdMesh = null;
  venue.group.traverse((o) => {
    const im = o as THREE.InstancedMesh;
    if (im.isInstancedMesh && (im.geometry as THREE.BufferGeometry).type === 'CapsuleGeometry') crowdMesh = im;
  });
  if (crowdMesh) (crowdMesh as THREE.InstancedMesh).visible = settings.crowd;
  if (!keepPlayer || !renderer.xr.isPresenting) goTo(spots[0]?.id ?? '');
  updateMenu();
}

/** Surfaces you can stand on (floor, stage, platforms) and things you cannot walk through. */
function collectWalkables() {
  walkables = [];
  solids = [];
  venue?.group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || (m as unknown as THREE.InstancedMesh).isInstancedMesh) return;
    const mat = m.material as THREE.Material;
    if (mat && mat.transparent && mat.opacity < 0.5) return;
    if (m.geometry) {
      walkables.push(m);
      solids.push(m);
    }
  });
  // Always a floor, also in rooms built from blocks only.
  const r = sc?.room ?? (sc?.ground ? { width: sc.ground.width, depth: sc.ground.depth } : { width: 60, depth: 60 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(r.width, r.depth).rotateX(-Math.PI / 2), new THREE.MeshBasicNodeMaterial({ visible: false }));
  floor.updateMatrixWorld(true);
  walkables.push(floor);
}

const down = new THREE.Raycaster();
/** Highest walkable surface below `fromY` at x/z. */
function floorAt(x: number, z: number, fromY: number): number | null {
  down.set(new THREE.Vector3(x, fromY, z), new THREE.Vector3(0, -1, 0));
  down.far = fromY + 5;
  const h = down.intersectObjects(walkables, false).find((i) => (i.face?.normal.clone().transformDirection(i.object.matrixWorld).y ?? 0) > 0.7);
  return h ? h.point.y : null;
}

interface Spot {
  id: string;
  label: string;
  /** Eye position (x, y, z) and look-at target. */
  p: [number, number, number];
  t: [number, number, number];
}
let spots: Spot[] = [];

/**
 * Places to stand. Own locations: every audience area by its name, on the stage and behind
 * the DJ booth – real floor positions instead of the room-rectangle cameras (those can end
 * up in a wall). Templates: their camera positions.
 */
function makeSpots(): Spot[] {
  const loc = project?.venue.location;
  const out: Spot[] = [];
  if (loc && sc?.room) {
    const back = sc.room.backZ;
    const crowds = loc.objects.filter((o) => o.type === 'crowd').sort((a, b) => b.size[0] * b.size[2] - a.size[0] * a.size[2]);
    for (const o of crowds) out.push({ id: 'spot:' + o.id, label: o.name.replace(/\s*\(.*\)\s*/g, ''), p: [o.pos[0], o.pos[1] + 1.65, o.pos[2]], t: [o.pos[0], 2.5, back] });
    const stage = loc.objects
      .filter((o) => (o.type === 'stage' || o.type === 'arc') && /bühne|stage/i.test(o.name))
      .sort((a, b) => a.pos[2] - b.pos[2])[0];
    if (stage) {
      const depth = stage.type === 'arc' ? stage.size[2] / 2 : stage.size[2];
      const z = stage.type === 'arc' ? stage.pos[2] + depth * 0.45 : stage.pos[2];
      out.push({ id: 'spot:stage', label: 'Auf der Bühne', p: [stage.pos[0], stage.size[1] + 1.65, z], t: [stage.pos[0], 2, z + 10] });
    }
    const dj = loc.objects.find((o) => o.type === 'djbooth');
    if (dj) {
      const yaw = (dj.rot[1] * Math.PI) / 180;
      const bx = dj.pos[0] - Math.sin(yaw) * 0.85;
      const bz = dj.pos[2] - Math.cos(yaw) * 0.85;
      out.push({ id: 'spot:dj', label: 'DJ-Pult', p: [bx, dj.pos[1] + 1.65, bz], t: [bx + Math.sin(yaw) * 10, 1.5, bz + Math.cos(yaw) * 10] });
    }
  }
  if (!out.length && sc) for (const [k, [p, t]] of Object.entries(sc.cameras)) out.push({ id: 'spot:' + k, label: CAM_NAMES[k] ?? k, p, t });
  return out.slice(0, 8);
}

/** Jump to a place (standing on the floor below it, looking at its target). */
function goTo(id: string) {
  const s = spots.find((x) => x.id === id || x.id === 'spot:' + id) ?? spots[0];
  if (!s) return;
  const { p, t: tg } = s;
  const d = new THREE.Vector3(tg[0] - p[0], 0, tg[2] - p[2]);
  const yaw = Math.atan2(-d.x, -d.z);
  const fy = floorAt(p[0], p[2], p[1]) ?? 0;
  player.place(p[0], fy, p[2], yaw);
  camera.position.set(p[0], fy + 1.65, p[2]);
  orbit.target.set(...tg);
  orbit.update();
}

// ------------------------------------------------------------------ live data from VD-Link
function connectEvents() {
  const es = new EventSource('api/events');
  es.onopen = () => {
    connected = true;
    updateMenu();
  };
  es.onerror = () => {
    connected = false;
    updateMenu();
  };
  es.addEventListener('dmx', (e) => {
    const s = atob((e as MessageEvent).data);
    const n = Math.min(s.length, dmx.length);
    for (let i = 0; i < n; i++) dmx[i] = s.charCodeAt(i);
    lastDmx = performance.now();
  });
  es.addEventListener('scene', () => void loadScene());
  // Video screens: what the desktop's screens show right now.
  es.addEventListener('walls', (e) => {
    try {
      wallStates = JSON.parse((e as MessageEvent).data) as WallState[];
      applyWallStates();
    } catch {
      /* ignore */
    }
  });
  es.addEventListener('view', (e) => {
    try {
      const v = JSON.parse((e as MessageEvent).data) as { haze?: number };
      if (typeof v.haze === 'number') {
        settings.haze = Math.min(1, Math.max(0, v.haze));
        applyQuality();
        updateMenu();
      }
    } catch {
      /* ignore */
    }
  });
}

// ------------------------------------------------------------------ video screens
interface WallState {
  name: string;
  state: MirrorState;
  fit: ScreenSettings['fit'];
  offset: [number, number];
  brightness: number;
}
let wallStates: WallState[] = [];
const wallBusy = new Set<number>();
const wallLast: number[] = [];

function applyWallStates() {
  wallStates.forEach((s, i) => {
    const w = walls[i];
    if (!w || w.name !== s.name) return;
    void w.applySettings({ fit: s.fit, offset: s.offset, brightness: s.brightness });
    w.setRemote(null, s.state);
  });
}

/** Fetch the latest picture of every live screen (one request per screen at a time, ≤ 20/s). */
function pumpWalls(now: number) {
  wallStates.forEach((s, i) => {
    const w = walls[i];
    if (!w || s.state !== 'live' || wallBusy.has(i) || now - (wallLast[i] ?? 0) < 50) return;
    wallBusy.add(i);
    wallLast[i] = now;
    fetch(`api/wall/${i}.jpg`, { cache: 'no-store' })
      .then((r) => (r.status === 200 ? r.blob() : null))
      .then((b) => (b ? createImageBitmap(b, { imageOrientation: 'flipY' }) : null))
      .then((img) => {
        if (img && walls[i] === w) w.setRemote(img, wallStates[i]?.state ?? 'live');
        else img?.close();
      })
      .catch(() => {})
      .finally(() => wallBusy.delete(i));
  });
}

// ------------------------------------------------------------------ quality
function applyQuality() {
  const q = settings.quality;
  beamGlobals.noise.value = q === 'low' ? 0 : 1;
  beamGlobals.soft.value = q === 'low' ? 0 : 1;
  beamGlobals.haze.value = settings.haze * hazeEnv;
  roomLight.intensity = AMBIENT[settings.ambient];
  for (const w of walls) {
    w.spillOn = q !== 'low' && dbg.spill;
    w.testFps = q === 'high' ? 0 : 10;
    w.group.visible = dbg.walls;
  }
  if (rigRenderer) rigRenderer.beams.mesh.visible = dbg.beams;
  if (!renderer) return;
  if (!renderer.xr.isPresenting) {
    renderer.setPixelRatio(q === 'low' ? 0.75 : q === 'mid' ? 1 : Math.min(devicePixelRatio || 1, 1.5));
    // Full resolution: a smaller XR framebuffer stayed black on the Pico 4 Ultra when a
    // session started with it. ?fbscale=0.8 for experiments only.
    renderer.xr.setFramebufferScaleFactor(Number(params.get('fbscale')) || 1);
  }
  renderer.xr.setFoveation(q === 'low' ? 1 : q === 'mid' ? 0.5 : 0);
}

// ------------------------------------------------------------------ controllers
interface Ctrl {
  /** Small „Menü“ button on the controller (shown on the left hand) – point and pull the trigger. */
  btn: THREE.Mesh;
  ray: THREE.Group;
  grip: THREE.Group;
  line: THREE.Line;
  dot: THREE.Mesh;
  src: XRInputSource | null;
  prev: boolean[];
  aiming: boolean;
  turned: boolean;
}
const ctrls: Ctrl[] = [];

function setupControllers() {
  for (const i of [0, 1]) {
    const ray = renderer.xr.getController(i);
    const grip = renderer.xr.getControllerGrip(i);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicNodeMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }));
    line.scale.z = 2;
    line.visible = false;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 8), new THREE.MeshBasicNodeMaterial({ color: 0xffffff, depthTest: false }));
    dot.visible = false;
    dot.renderOrder = 11;
    ray.add(line);
    grip.add(controllerModel());
    const btn = menuButton();
    grip.add(btn);
    const c: Ctrl = { btn, ray, grip, line, dot, src: null, prev: [], aiming: false, turned: false };
    ray.addEventListener('connected', (e) => {
      c.src = (e as unknown as { data: XRInputSource }).data;
    });
    ray.addEventListener('disconnected', () => {
      c.src = null;
    });
    ray.addEventListener('selectstart', () => select(c));
    scene.add(ray, grip, dot);
    ctrls.push(c);
  }
}

/** „☰ Menü“ tag above the controller, facing the user. */
function menuButton() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 96;
  const g = c.getContext('2d')!;
  g.fillStyle = '#ff4f8b';
  g.beginPath();
  g.roundRect(4, 4, 248, 88, 40);
  g.fill();
  g.fillStyle = '#fff';
  g.font = '700 44px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('☰ Menü', 128, 50);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.0375), new THREE.MeshBasicNodeMaterial({ map: tex, transparent: true, toneMapped: false }));
  m.position.set(0, 0.06, 0.02);
  m.rotation.x = -0.6;
  m.visible = false;
  return m;
}

function controllerModel() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.12, 16).rotateX(Math.PI / 2), new THREE.MeshStandardNodeMaterial({ color: 0x2a2a33, roughness: 0.5 }));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.006, 8, 32), new THREE.MeshBasicNodeMaterial({ color: 0xff4f8b }));
  ring.position.z = -0.05;
  ring.rotation.x = Math.PI / 4;
  g.add(body, ring);
  return g;
}

const tmpRay = new THREE.Ray();
function ctrlRay(c: Ctrl): THREE.Ray {
  c.ray.updateMatrixWorld();
  tmpRay.origin.setFromMatrixPosition(c.ray.matrixWorld);
  tmpRay.direction.set(0, 0, -1).transformDirection(c.ray.matrixWorld);
  return tmpRay;
}

/** Trigger: click on the menu, or on the „Menü“ button of the other controller. */
function select(c: Ctrl) {
  if (!menu.open) {
    const ray = ctrlRay(c);
    const rc = new THREE.Raycaster(ray.origin.clone(), ray.direction.clone(), 0, 3);
    for (const o of ctrls) {
      if (o === c || !o.btn.visible) continue;
      o.btn.updateMatrixWorld();
      if (rc.intersectObject(o.btn, false).length) {
        const h = head();
        updateMenu();
        menu.show(h.p, h.dir);
        hint.hide();
        return;
      }
    }
    return;
  }
  const id = menu.pick(ctrlRay(c));
  if (id === null) {
    menu.hide();
    return;
  }
  if (id) action(id);
}

function head() {
  // Pose of the headset in the club (the XR camera, already in the offset reference space).
  const xc = renderer.xr.getCamera();
  const p = xc.position.clone();
  const q = xc.quaternion.clone();
  const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
  return { p, dir };
}

/** Tell VD-Link where this headset is (shown in its 3D view), ~10×/s while in VR. */
const poseId = Math.random().toString(36).slice(2, 10);
let poseLast = 0;
let poseBusy = false;
function sendPose(now: number) {
  if (!renderer.xr.isPresenting || poseBusy || now - poseLast < 100) return;
  poseLast = now;
  poseBusy = true;
  const xc = renderer.xr.getCamera();
  const body = JSON.stringify({ id: poseId, name: 'VR-Browser', pos: xc.position.toArray(), quat: xc.quaternion.toArray() });
  fetch('api/pose', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
    .catch(() => {})
    .finally(() => (poseBusy = false));
}

// ------------------------------------------------------------------ menu
function updateMenu() {
  if (!sc) return;
  const live = connected && performance.now() - lastDmx < 2000;
  const m: MenuModel = {
    title: project?.name ?? 'VD-Link VR',
    status: !connected ? 'Verbindung zu VD-Link unterbrochen – verbinde neu …' : live ? `Live von VD-Link · ${fps} fps` : `Verbunden · warte auf Licht · ${fps} fps`,
    statusOk: connected,
    sections: [
      ...[0, 4].filter((i) => i < spots.length).map((i) => ({ title: i ? '' : 'Standort', buttons: spots.slice(i, i + 4).map((s) => ({ id: 'loc:' + s.id, label: s.label })) })),
      {
        title: `Haze ${Math.round(settings.haze * 100)} %`,
        buttons: [
          { id: 'haze:0', label: 'Aus', on: settings.haze === 0 },
          { id: 'haze:0.3', label: 'Wenig', on: settings.haze === 0.3 },
          { id: 'haze:0.6', label: 'Mittel', on: settings.haze === 0.6 },
          { id: 'haze:1', label: 'Viel', on: settings.haze === 1 },
        ],
      },
      {
        title: 'Grundlicht',
        buttons: AMBIENT_LABEL.map((l, i) => ({ id: 'amb:' + i, label: l, on: settings.ambient === i })),
      },
      {
        title: 'Bewegung',
        buttons: [
          { id: 'walk', label: settings.walk ? 'Laufen: an' : 'Laufen: aus', on: settings.walk },
          { id: 'turn', label: `Drehen: ${TURN_LABEL[settings.turn]}` },
          { id: 'seated', label: settings.seated ? 'Sitzend' : 'Stehend', on: settings.seated },
          { id: 'vignette', label: settings.vignette ? 'Tunnelblick: an' : 'Tunnelblick: aus', on: settings.vignette },
        ],
      },
      {
        title: 'Ansicht',
        buttons: [
          ...(['low', 'mid', 'high'] as const).map((q) => ({ id: 'q:' + q, label: QUALITY_LABEL[q], on: settings.quality === q })),
          { id: 'crowd', label: settings.crowd ? 'Publikum: an' : 'Publikum: aus', on: settings.crowd },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Steuerung zeigen' },
      { id: 'close', label: 'Menü schließen' },
      { id: 'exit', label: 'VR verlassen' },
    ],
  };
  menu.set(m);
}

function action(id: string) {
  if (id.startsWith('loc:')) {
    goTo(id.slice(4));
    menu.hide();
  } else if (id.startsWith('haze:')) settings.haze = Number(id.slice(5));
  else if (id.startsWith('amb:')) settings.ambient = Number(id.slice(4));
  else if (id === 'walk') settings.walk = !settings.walk;
  else if (id === 'turn') settings.turn = settings.turn === 30 ? 45 : settings.turn === 45 ? 0 : 30;
  else if (id === 'seated') {
    settings.seated = !settings.seated;
    player.setSeated(settings.seated);
  } else if (id === 'vignette') settings.vignette = !settings.vignette;
  else if (id === 'crowd') {
    settings.crowd = !settings.crowd;
    if (crowdMesh) crowdMesh.visible = settings.crowd;
  }
  else if (id.startsWith('q:')) settings.quality = id.slice(2) as VrSettings['quality'];
  else if (id === 'help') {
    menu.hide();
    const h = head();
    hint.show(h.p, h.dir);
  } else if (id === 'close') menu.hide();
  else if (id === 'exit') void renderer.xr.getSession()?.end();
  saveSettings(settings);
  applyQuality();
  updateMenu();
  renderSettingsUi();
}

// ------------------------------------------------------------------ input per frame
const WALK_SPEED = 1.8;
const SMOOTH_TURN = Math.PI * 0.6;
let moving = 0;

function input(dt: number) {
  const h = head();
  moving = Math.max(0, moving - dt * 4);
  // Handedness: right stick = teleport/turn, left = walk. One controller only: it does both.
  const active = ctrls.filter((c) => c.src?.gamepad);
  for (const c of active) {
    const gp = c.src!.gamepad!;
    const hand = c.src!.handedness;
    const [ax, ay] = gp.axes.length >= 4 ? [gp.axes[2], gp.axes[3]] : [gp.axes[0] ?? 0, gp.axes[1] ?? 0];
    const pressed = gp.buttons.map((b) => b.pressed);
    const edge = (i: number) => !!pressed[i] && !c.prev[i];
    // Menu: B / Y (upper face button) or A / X.
    if (edge(5) || edge(4)) {
      if (menu.open) menu.hide();
      else {
        updateMenu();
        menu.show(h.p, h.dir);
        hint.hide();
      }
    }
    c.prev = pressed;
    // With only one controller it teleports and turns (no walking hand).
    const walkHand = settings.walk && hand === 'left' && active.length > 1;
    if (walkHand) {
      if (Math.hypot(ax, ay) > 0.15 && !menu.open) {
        const f = new THREE.Vector3(h.dir.x, 0, h.dir.z).normalize();
        const r = new THREE.Vector3(-f.z, 0, f.x);
        const v = f.multiplyScalar(-ay).add(r.multiplyScalar(ax)).multiplyScalar(WALK_SPEED * dt);
        walk(h.p, v);
        moving = Math.min(1, Math.hypot(ax, ay));
      }
      continue;
    }
    // Teleport: stick forward = aim, release = jump.
    if (!menu.open && ay < -0.6 && Math.abs(ax) < 0.6) c.aiming = true;
    if (c.aiming) {
      const ray = ctrlRay(c);
      arc.update(ray.origin.clone(), ray.direction.clone(), walkables);
      if (Math.hypot(ax, ay) < 0.3) {
        c.aiming = false;
        const t = arc.target;
        arc.hide();
        if (t) {
          player.teleport(h.p, t.x, t.y, t.z);
          player.floor = t.y;
        }
      }
      continue;
    }
    // Turn: snap (30°/45°) or smooth.
    if (settings.turn === 0) {
      if (Math.abs(ax) > 0.2 && !menu.open) {
        player.turn(h.p, -ax * SMOOTH_TURN * dt);
        moving = Math.max(moving, Math.abs(ax));
      }
    } else if (Math.abs(ax) > 0.7 && !c.turned && !menu.open) {
      c.turned = true;
      player.turn(h.p, (-Math.sign(ax) * settings.turn * Math.PI) / 180);
    } else if (Math.abs(ax) < 0.3) c.turned = false;
  }
  if (!active.some((c) => c.aiming)) arc.hide();
  // „Menü“ button on the left controller (or the only one), while the menu is closed.
  for (const c of ctrls) c.btn.visible = !menu.open && !!c.src && (c.src.handedness === 'left' || (active.length === 1 && c.src.handedness !== 'right'));
  // Pointer rays only while the menu is open.
  for (const c of ctrls) {
    const show = menu.open && !!c.src;
    c.line.visible = show;
    c.dot.visible = false;
    if (show) {
      const ray = ctrlRay(c);
      const p = menu.hitPoint(ray);
      if (p) {
        c.dot.position.copy(p);
        c.dot.visible = true;
        c.line.scale.z = p.distanceTo(ray.origin);
        menu.setHover(menu.pick(ray) ?? '');
      } else c.line.scale.z = 2;
    }
  }
  vignette.visible = settings.vignette && moving > 0.05;
  if (vignette.visible) {
    vignette.position.copy(h.p).addScaledVector(h.dir, 0.25);
    vignette.lookAt(h.p);
    ((vignette.material as THREE.MeshBasicNodeMaterial).opacity as number) = Math.min(0.85, moving);
  }
}

const side = new THREE.Raycaster();
/** Smooth walking: no walking through walls, steps up to 40 cm, follows floors and stairs. */
function walk(headP: THREE.Vector3, v: THREE.Vector3) {
  const len = v.length();
  if (len < 1e-5) return;
  // Blocked by a wall in front (checked at knee and chest height)?
  for (const hgt of [0.5, 1.2]) {
    side.set(new THREE.Vector3(headP.x, player.floor + hgt, headP.z), v.clone().normalize());
    side.far = len + 0.3;
    if (side.intersectObjects(solids, false).some((i) => Math.abs(i.face?.normal.clone().transformDirection(i.object.matrixWorld).y ?? 1) < 0.5)) return;
  }
  const nx = headP.x + v.x;
  const nz = headP.z + v.z;
  const fy = floorAt(nx, nz, player.floor + 0.45);
  if (fy === null || fy - player.floor > 0.42) return;
  player.move(v.x, v.z);
  if (Math.abs(fy - player.floor) > 0.01) player.teleport(new THREE.Vector3(nx, 0, nz), nx, fy, nz);
}

function makeVignette() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(128, 128, 40, 128, 128, 128);
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  grd.addColorStop(0.55, 'rgba(0,0,0,0)');
  grd.addColorStop(1, 'rgba(0,0,0,1)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75), new THREE.MeshBasicNodeMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false, opacity: 0 }));
  m.renderOrder = 20;
  m.visible = false;
  return m;
}

// ------------------------------------------------------------------ frame loop
let last = performance.now();
const t0 = performance.now();
let frames = 0;
let fpsT = performance.now();

let frameErr = 0;
let cpuMs = 0;
const tm = { decode: 0, rig: 0, venue: 0, walls: 0, render: 0 };
let tmLast = '';
let cpuAcc = 0;
let xrFrames = 0;
function frame() {
  try {
    frameInner();
  } catch (e) {
    if (frameErr++ < 3) rlog(`frame: ${(e as Error).stack ?? e}`);
  }
}

function frameInner() {
  const now = performance.now();
  if (renderer.xr.isPresenting && xrFrames++ % 120 === 0) rlog(`xr frame ${xrFrames} fps=${fps} q=${settings.quality} cpu=${cpuMs.toFixed(1)}ms [${tmLast}] head=${JSON.stringify(head().p)}`);
  const c0 = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const tt = (now - t0) / 1000;
  if (renderer.xr.isPresenting && baseSpace) {
    input(dt);
    const sp = player.space(baseSpace);
    if (sp) renderer.xr.setReferenceSpace(sp);
    hint.update();
  } else orbit?.update();
  if (rig && rigRenderer) {
    let ta = performance.now();
    for (let i = 0; i < rig.fixtures.length; i++) {
      const f = rig.fixtures[i];
      decode(f.cm, dmx, (f.universe - 1) * 512 + f.address - 1, looks[i]);
    }
    tm.decode += performance.now() - ta;
    ta = performance.now();
    lights.begin();
    rigRenderer.update(looks, dt, tt, lights);
    lights.end();
    tm.rig += performance.now() - ta;
    ta = performance.now();
    const cap = dbg.surf ? SPOT_CAP[settings.quality] : -1;
    if (cap === -1) lights.count.value = 0;
    else if (cap) lights.limit(cap);
    // The audience animation costs CPU every frame – only while it is shown.
    if (settings.crowd) venue?.update(tt);
    tm.venue += performance.now() - ta;
    ta = performance.now();
    pumpWalls(now);
    for (const w of walls) w.update(tt);
    tm.walls += performance.now() - ta;
  }
  cpuAcc += performance.now() - c0;
  sendPose(now);
  const tr = performance.now();
  renderer.render(scene, camera);
  tm.render += performance.now() - tr;
  frames++;
  if (now - fpsT > 1000) {
    fps = Math.round((frames * 1000) / (now - fpsT));
    cpuMs = frames ? cpuAcc / frames : 0;
    tmLast = Object.entries(tm).map(([k, v]) => `${k} ${(v / Math.max(1, frames)).toFixed(1)}`).join(', ');
    for (const k of Object.keys(tm) as (keyof typeof tm)[]) tm[k] = 0;
    cpuAcc = 0;
    frames = 0;
    fpsT = now;
    $('fps').textContent = `${fps} fps`;
    if (menu.open) updateMenu();
  }
}

function resize() {
  const w = innerWidth;
  const h = innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

// ------------------------------------------------------------------ entering VR
async function setupEnterButton() {
  const b = $<HTMLButtonElement>('enter');
  const ok = !!navigator.xr && (await navigator.xr.isSessionSupported('immersive-vr').catch(() => false));
  if (!ok) {
    b.disabled = true;
    b.textContent = 'VR hier nicht verfügbar';
    $('xrnote').hidden = false;
    $('xrnote').textContent = window.isSecureContext
      ? 'Dieser Browser kann kein VR. Öffne die Adresse im Browser der VR-Brille (Pico, Quest) oder unter Windows in Chrome/Edge mit SteamVR, Quest Link oder Pico Connect.'
      : 'Keine sichere Verbindung: Öffne die https-Adresse aus VD-Link (oder per USB http://localhost).';
    return;
  }
  b.disabled = false;
  b.textContent = 'VR starten';
  b.onclick = () => void enterVr();
}

async function enterVr() {
  const session = await navigator.xr!.requestSession('immersive-vr', { requiredFeatures: ['local-floor'], optionalFeatures: ['bounded-floor', 'hand-tracking'] }).catch((e: Error) => {
    status('VR konnte nicht starten: ' + e.message, true);
    return null;
  });
  if (!session) return;
  rlog(`session started, blend=${session.environmentBlendMode} frameRate=${(session as unknown as { frameRate?: number }).frameRate}`);
  renderer.xr.setReferenceSpaceType('local-floor');
  // A reference space of an earlier session must not be reused (black picture otherwise).
  renderer.xr.setReferenceSpace(null as unknown as XRReferenceSpace);
  applyQuality();
  try {
    await renderer.xr.setSession(session);
  } catch (e) {
    rlog(`setSession: ${(e as Error).stack ?? e}`);
    throw e;
  }
  baseSpace = renderer.xr.getReferenceSpace();
  // Sparsam: 72 Hz when the headset offers it (more time per frame).
  const rates = (session as unknown as { supportedFrameRates?: Float32Array }).supportedFrameRates;
  const upd = (session as unknown as { updateTargetFrameRate?: (r: number) => Promise<void> }).updateTargetFrameRate;
  if (settings.quality === 'low' && rates && [...rates].includes(72) && upd) void upd.call(session, 72).catch(() => {});
  rlog(`xr ready, layer=${!!session.renderState.baseLayer} fb=${!!(session.renderState.baseLayer as XRWebGLLayer | undefined)?.framebuffer} layers=${(session.renderState as unknown as { layers?: unknown[] }).layers?.length ?? 0}`);
  player.seatOffset = 0;
  goTo(spots[0]?.id ?? '');
  if (settings.seated) player.setSeated(true);
  document.body.classList.add('in-vr');
  // Show the controls right in front of you for the first seconds.
  setTimeout(() => {
    const h = head();
    hint.show(h.p, h.dir, 12);
  }, 600);
  session.addEventListener('end', () => {
    baseSpace = null;
    renderer.xr.setReferenceSpace(null as unknown as XRReferenceSpace);
    menu.hide();
    hint.hide();
    arc.hide();
    document.body.classList.remove('in-vr');
    resize();
  });
}

// ------------------------------------------------------------------ 2D page (before entering)
function status(text: string, err = false) {
  const s = $('status');
  s.textContent = text;
  s.classList.toggle('err', err);
  s.hidden = !text;
}

function renderSettingsUi() {
  const box = $('settings');
  box.replaceChildren();
  const seg = (label: string, opts: [string, string][], cur: string, set: (v: string) => void) => {
    const row = document.createElement('div');
    row.className = 'row';
    const l = document.createElement('span');
    l.textContent = label;
    const s = document.createElement('div');
    s.className = 'seg';
    for (const [v, t] of opts) {
      const b = document.createElement('button');
      b.textContent = t;
      b.className = v === cur ? 'on' : '';
      b.onclick = () => {
        set(v);
        saveSettings(settings);
        applyQuality();
        updateMenu();
        renderSettingsUi();
      };
      s.append(b);
    }
    row.append(l, s);
    box.append(row);
  };
  seg('Qualität', (['low', 'mid', 'high'] as const).map((q) => [q, QUALITY_LABEL[q]]), settings.quality, (v) => (settings.quality = v as VrSettings['quality']));
  seg('Grundlicht im Raum', AMBIENT_LABEL.map((l, i) => [String(i), l]), String(settings.ambient), (v) => (settings.ambient = Number(v)));
  seg('Laufen mit dem Stick', [['1', 'An'], ['0', 'Aus']], settings.walk ? '1' : '0', (v) => (settings.walk = v === '1'));
  seg('Drehen', [['30', '30°'], ['45', '45°'], ['0', 'Gleitend']], String(settings.turn), (v) => (settings.turn = Number(v) as VrSettings['turn']));
  seg('Haltung', [['0', 'Stehend'], ['1', 'Sitzend']], settings.seated ? '1' : '0', (v) => (settings.seated = v === '1'));
  seg('Beide Augen in einem Durchgang (schneller, nach Neuladen)', [['1', 'An'], ['0', 'Aus']], settings.multiview ? '1' : '0', (v) => (settings.multiview = v === '1'));
  $('device').textContent = isStandalone() ? 'VR-Brille erkannt' : 'Rechner';
}

void boot().catch((e) => status('Fehler: ' + (e as Error).message, true));

// Tests: state from outside.
(window as unknown as { __vr: unknown }).__vr = {
  player,
  settings,
  menu,
  action,
  goTo,
  head: () => (renderer.xr.isPresenting ? head() : null),
  enter: () => enterVr(),
  renderer: () => renderer,
  base: () => baseSpace,
  info: () => ({ fixtures: rig?.fixtures.length ?? 0, walls: walls.length, fps, connected, lastDmx: Math.round(performance.now() - lastDmx), presenting: renderer?.xr.isPresenting, floor: player.floor, menu: menu.open, arc: arc.group.visible, target: arc.target?.toArray() ?? null }),
};
