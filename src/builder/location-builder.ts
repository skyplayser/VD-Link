// Location Builder: rebuild a club or festival in 3D – without running lights.
// Palette → place objects, gizmo to move/rotate/scale (with snapping), outliner,
// properties, undo/redo, top view, save/open as .vdloc, preview with light.

import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { buildObjectMesh, MAT_PRESETS, placeObject, plainMaterials } from '../render/objects.ts';
import { fixtureModelObject } from '../render/fixture.ts';
import type { FixtureDef } from '../shared/fixture-types.ts';
import { arrangeOutput, newId, normalizeLocation, rotateXYZ, spreadPoints, wallPixels, type ArrangeMode, type LocationData, type LocObject, type MatPreset, type ObjType, type V3 } from '../shared/location.ts';
import { el, icon } from '../ui/dom.ts';
import { getLang } from '../ui/i18n.ts';

const L = () => getLang();
const tr = (de: string, en: string) => (L() === 'de' ? de : en);

interface PaletteItem {
  type: ObjType;
  de: string;
  en: string;
  size: V3;
  material: MatPreset;
  y?: number;
  extra?: Partial<LocObject>;
}

const PALETTE: { de: string; en: string; items: PaletteItem[] }[] = [
  {
    de: 'Raum',
    en: 'Room',
    items: [
      { type: 'wall', de: 'Wand', en: 'Wall', size: [4, 3, 0.2], material: 'black' },
      { type: 'box', de: 'Block', en: 'Block', size: [1, 1, 1], material: 'darkgrey' },
      { type: 'stage', de: 'Podest / Bühne', en: 'Riser / stage', size: [6, 0.6, 3], material: 'darkgrey' },
      { type: 'arc', de: 'Rundes Podest (D-Form)', en: 'Round riser (D shape)', size: [10, 0.6, 8], material: 'darkgrey', extra: { arc: { angle: 180, thickness: 0 } } },
      { type: 'arc', de: 'Bogen / Ring-Podest', en: 'Curved riser / ring', size: [12, 0.4, 10], material: 'darkgrey', extra: { arc: { angle: 240, thickness: 2.5 } } },
      { type: 'arc', de: 'Runde Wand / Brüstung', en: 'Curved wall / parapet', size: [8, 1.1, 6], material: 'black', extra: { arc: { angle: 180, thickness: 0.15 } } },
      { type: 'stairs', de: 'Treppe / Stufen', en: 'Stairs / steps', size: [2, 0.6, 1.2], material: 'darkgrey' },
      { type: 'pillar', de: 'Säule', en: 'Pillar', size: [0.5, 4, 0.5], material: 'concrete' },
      { type: 'cylinder', de: 'Zylinder / Rohr', en: 'Cylinder / duct', size: [0.6, 0.6, 0.6], material: 'metal' },
    ],
  },
  {
    de: 'Einrichtung',
    en: 'Furniture',
    items: [
      { type: 'bar', de: 'Bar-Tresen', en: 'Bar counter', size: [4, 1.1, 0.8], material: 'marble' },
      { type: 'djbooth', de: 'DJ-Pult', en: 'DJ booth', size: [2.4, 1.1, 0.9], material: 'black', extra: { color: '#ff3cc8' } },
      { type: 'sofa', de: 'Lounge-Sofa', en: 'Lounge sofa', size: [2.6, 0.9, 1.3], material: 'velvet-petrol' },
      { type: 'table', de: 'Tisch', en: 'Table', size: [0.8, 0.7, 0.8], material: 'black' },
      { type: 'aquarium', de: 'Aquarium', en: 'Aquarium', size: [4, 2.2, 0.2], material: 'glass', y: 1 },
      { type: 'ledstrip', de: 'LED-Streifen', en: 'LED strip', size: [3, 0.03, 0.03], material: 'led', extra: { color: '#b23cff' } },
    ],
  },
  {
    de: 'Technik',
    en: 'Tech',
    items: [
      { type: 'truss', de: 'Traverse', en: 'Truss', size: [6, 0.3, 0.3], material: 'metal', y: 5 },
      { type: 'truss', de: 'Kreis-Traverse', en: 'Circle truss', size: [4, 0.3, 4], material: 'metal', y: 5, extra: { arc: { angle: 360, thickness: 0 } } },
      { type: 'truss', de: 'Bogen-Traverse', en: 'Curved truss', size: [8, 0.3, 4], material: 'metal', y: 5, extra: { arc: { angle: 180, thickness: 0 } } },
      { type: 'tower', de: 'Traversen-Turm', en: 'Truss tower', size: [0.3, 6, 0.3], material: 'metal' },
      { type: 'videowall', de: 'Videowand', en: 'Video wall', size: [6, 3.375, 0.12], material: 'black', y: 1, extra: { pixels: [1920, 1080] } },
    ],
  },
  {
    de: 'Publikum',
    en: 'Audience',
    items: [{ type: 'crowd', de: 'Publikumsfläche', en: 'Crowd area', size: [8, 0, 6], material: 'grey', extra: { density: 1.5 } }],
  },
];

export interface BuilderDeps {
  /** Opens the lamp gallery; every "add" calls onAdd (the gallery stays open). */
  gallery: (onAdd: (def: FixtureDef, mode: number) => void) => void;
  /** Opens the location with light (new project or the project it came from). */
  preview: (loc: LocationData) => void;
  /** Pick a lamp type (and mode) from the library gallery. */
  pickFixture: () => Promise<{ def: FixtureDef; mode: number } | null>;
  fixtureName: (id: string) => Promise<FixtureDef | undefined>;
  onClose: () => void;
}

export class LocationBuilder {
  private root = el('div', 'workspace lb');
  private loc!: LocationData;
  private filePath: string | null = null;
  private dirty = false;
  private selected: string | null = null;
  private undo: string[] = [];
  private redo: string[] = [];
  private renderer: THREE.WebGPURenderer | null = null;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, 1, 0.05, 2000);
  private orbit!: OrbitControls;
  private gizmo!: TransformControls;
  private world = new THREE.Group();
  private shell = new THREE.Group();
  private meshes = new Map<string, THREE.Object3D>();
  private mats = plainMaterials();
  private view = el('div', 'lb-view');
  private outliner = el('div', 'lb-outliner');
  private props = el('div', 'lb-props');
  private titleInput = el('input', 'lb-name');
  private status = el('span', 'muted small');
  private snap = true;
  private down = { x: 0, y: 0 };
  private fromProject = false;
  /** Left side: room building or technics (trusses, walls, lamps). */
  private side: 'room' | 'tech' = 'room';
  private leftBox = el('div', 'lb-left');
  /** Loaded lamp definitions (for real 3D models and names). */
  private defs = new Map<string, FixtureDef>();
  private defLoads = new Map<string, Promise<FixtureDef | undefined>>();
  private leftWait = false;

  constructor(private deps: BuilderDeps) {
    this.root.hidden = true;
    document.body.append(this.root);
    this.scene.background = new THREE.Color(0x14161c);
    this.scene.add(new THREE.HemisphereLight(0xdde4f0, 0x2a2a30, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(20, 40, 30);
    this.scene.add(sun, this.shell, this.world);
    addEventListener('keydown', (e) => this.key(e), true);
  }

  get visible() {
    return !this.root.hidden;
  }

  async open(loc: LocationData, filePath: string | null = null, fromProject = false) {
    this.loc = normalizeLocation(structuredClone(loc));
    // Older files: lamp types from the placed lamps.
    if (!this.loc.fixtureTypes) {
      const seen = new Map<string, { id: string; mode: number }>();
      for (const o of this.loc.objects) if (o.type === 'fixture' && o.fixture) seen.set(`${o.fixture.id}|${o.fixture.mode}`, { id: o.fixture.id, mode: o.fixture.mode });
      this.loc.fixtureTypes = [...seen.values()];
    }
    this.filePath = filePath;
    this.fromProject = fromProject;
    this.dirty = false;
    this.undo = [];
    this.redo = [];
    this.selected = null;
    this.layout();
    this.root.hidden = false;
    await this.ensureRenderer();
    this.rebuildAll();
    this.frameAll();
    this.renderPanels();
  }

  /** Leave the builder for the 3D preview (data was handed over). */
  hideForPreview() {
    this.dirty = false;
    this.root.hidden = true;
    this.renderer?.setAnimationLoop(null);
  }

  close() {
    if (this.dirty && !confirm(tr('Ungespeicherte Änderungen an der Location verwerfen?', 'Discard unsaved changes to the location?'))) return;
    this.root.hidden = true;
    this.renderer?.setAnimationLoop(null);
    this.deps.onClose();
  }

  // ---------------------------------------------------------------- layout

  private layout() {
    const r = this.root;
    r.replaceChildren();
    const bar = el('div', 'ws-bar');
    const ttl = el('div', 'ws-title');
    ttl.append(icon('editor'), el('b', '', tr('Location-Builder', 'Location builder')), el('span', 'chip', this.loc.kind === 'indoor' ? 'Indoor-Club' : 'Outdoor-Festival'));
    this.titleInput.value = this.loc.name;
    this.titleInput.oninput = () => {
      this.loc.name = this.titleInput.value;
      this.dirty = true;
    };
    const btn = (label: string, run: () => void, cls = 'btn', ic?: string, title = '') => {
      const b = el('button', cls);
      if (ic) b.append(icon(ic));
      if (label) b.append(document.createTextNode(label));
      if (title) b.title = title;
      b.onclick = run;
      return b;
    };
    const modes = el('div', 'seg');
    for (const [m, label, k] of [
      ['translate', tr('Verschieben', 'Move'), 'W'],
      ['rotate', tr('Drehen', 'Rotate'), 'E'],
      ['scale', tr('Größe', 'Scale'), 'R'],
    ] as const) {
      const b = el('button', m === 'translate' ? 'on' : '', label);
      b.title = k;
      b.dataset.mode = m;
      b.onclick = () => this.setMode(m);
      modes.append(b);
    }
    const snap = btn(tr('Raster', 'Snap'), () => {
      this.snap = !this.snap;
      snap.classList.toggle('on', this.snap);
      this.applySnap();
    }, 'btn on');
    bar.append(
      ttl,
      this.titleInput,
      modes,
      snap,
      btn('', () => this.topView(), 'iconbtn', 'editor', tr('Draufsicht', 'Top view')),
      btn('', () => this.frameAll(), 'iconbtn', 'full', tr('Alles zeigen', 'Show all')),
      btn('↶', () => this.doUndo(), 'iconbtn', undefined, '⌘Z'),
      btn('↷', () => this.doRedo(), 'iconbtn', undefined, '⇧⌘Z'),
      el('span', 'grow'),
      this.status,
      btn(tr('Öffnen', 'Open'), () => void this.openFile(), 'btn', 'open'),
      btn(tr('Speichern', 'Save'), () => void this.save(false), 'btn', 'download'),
      btn(tr('Mit Licht ansehen', 'View with light'), () => this.deps.preview(structuredClone(this.loc)), 'btn primary', 'play'),
      btn(tr('Schließen', 'Close'), () => this.close(), 'btn'),
    );
    this.renderLeft();
    const body = el('div', 'lb-body');
    body.append(this.leftBox, this.view, this.props);
    this.setupDrop();
    r.append(bar, body);
  }

  /** Left column: Room / Tech switch, palette, (tech) lamps in project, objects. */
  private renderLeft() {
    const sw = el('div', 'seg lb-side');
    for (const [k, label] of [
      ['room', tr('Raum', 'Room')],
      ['tech', tr('Technik', 'Tech')],
    ] as const) {
      const b = el('button', this.side === k ? 'on' : '', label);
      b.onclick = () => {
        this.side = k;
        this.renderLeft();
      };
      sw.append(b);
    }
    this.leftBox.replaceChildren(sw, this.palette());
    if (this.side === 'tech') this.leftBox.append(this.projectLamps());
    this.leftBox.append(el('h2', '', tr('Objekte', 'Objects')), this.outliner);
  }

  private palette() {
    const box = el('div', 'lb-palette');
    for (const cat of PALETTE.filter((c) => (c.en === 'Tech') === (this.side === 'tech'))) {
      box.append(el('h2', '', L() === 'de' ? cat.de : cat.en));
      const grid = el('div', 'lb-pal-grid');
      for (const it of cat.items) {
        const b = el('button', 'lb-pal', L() === 'de' ? it.de : it.en);
        b.onclick = () => this.add(it);
        grid.append(b);
      }
      if (cat.en === 'Tech') {
        const row = el('button', 'lb-pal accent', tr('Traverse mit Lampen …', 'Truss with lamps …'));
        row.onclick = () => void this.addTrussRow();
        grid.append(row);
      }
      box.append(grid);
    }
    return box;
  }

  // ------------------------------------------------------------- three.js

  private async ensureRenderer() {
    if (this.renderer) {
      this.renderer.setAnimationLoop(() => this.frame());
      this.view.append(this.renderer.domElement);
      return;
    }
    const r = new THREE.WebGPURenderer({ antialias: true });
    r.toneMapping = THREE.AgXToneMapping;
    await r.init();
    this.renderer = r;
    this.view.append(r.domElement);
    this.orbit = new OrbitControls(this.camera, r.domElement);
    this.orbit.enableDamping = true;
    this.gizmo = new TransformControls(this.camera, r.domElement);
    this.scene.add(this.gizmo.getHelper());
    this.gizmo.addEventListener('dragging-changed', (e) => {
      this.orbit.enabled = !(e as unknown as { value: boolean }).value;
      if (!(e as unknown as { value: boolean }).value) this.commitGizmo();
    });
    this.applySnap();
    r.domElement.addEventListener('pointerdown', (e) => (this.down = { x: e.clientX, y: e.clientY }));
    r.domElement.addEventListener('pointerup', (e) => {
      if (Math.hypot(e.clientX - this.down.x, e.clientY - this.down.y) > 4) return;
      if (this.gizmo.dragging || (this.gizmo as unknown as { axis: string | null }).axis) return;
      this.pick(e);
    });
    new ResizeObserver(() => this.resize()).observe(this.view);
    r.setAnimationLoop(() => this.frame());
  }

  private resize() {
    if (!this.renderer) return;
    const w = this.view.clientWidth || 800;
    const h = this.view.clientHeight || 600;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  private nextFrame = 0;

  private frame() {
    if (this.root.hidden || !this.renderer || document.documentElement.dataset.winHidden) return;
    // 60 frames per second are plenty for editing (high refresh screens would render 165).
    const now = performance.now();
    if (now < this.nextFrame) return;
    this.nextFrame = now + 1000 / 60 - 2;
    this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  }

  private applySnap() {
    if (!this.gizmo) return;
    this.gizmo.setTranslationSnap(this.snap ? 0.1 : null);
    this.gizmo.setRotationSnap(this.snap ? THREE.MathUtils.degToRad(15) : null);
    this.gizmo.setScaleSnap(this.snap ? 0.1 : null);
  }

  private setMode(m: 'translate' | 'rotate' | 'scale') {
    this.gizmo?.setMode(m);
    this.root.querySelectorAll<HTMLButtonElement>('.ws-bar .seg button').forEach((b) => b.classList.toggle('on', b.dataset.mode === m));
  }

  private buildShell() {
    this.shell.clear();
    const { width: W, depth: D, height: H } = this.loc.room;
    if (this.loc.kind === 'indoor') {
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D).rotateX(-Math.PI / 2), new THREE.MeshStandardNodeMaterial({ color: 0x3a3c44, roughness: 0.9 }));
      // Walls render only from the inside → you can always look into the room from outside.
      const wallMat = new THREE.MeshStandardNodeMaterial({ color: 0x4a4c55, roughness: 0.9, side: THREE.BackSide });
      const box = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), wallMat);
      box.position.y = H / 2;
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, D)), new THREE.LineBasicNodeMaterial({ color: 0x8a90a0 }));
      edges.position.y = H / 2;
      const grid = new THREE.GridHelper(Math.max(W, D), Math.round(Math.max(W, D)), 0x6a6e7a, 0x4a4e5a);
      grid.position.y = 0.002;
      this.shell.add(floor, box, edges, grid);
    } else {
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(W, D).rotateX(-Math.PI / 2), new THREE.MeshStandardNodeMaterial({ color: 0x31402a, roughness: 1 }));
      const grid = new THREE.GridHelper(Math.max(W, D), Math.round(Math.max(W, D) / 2), 0x5c6e52, 0x45553d);
      grid.position.y = 0.01;
      this.shell.add(ground, grid);
    }
  }

  private rebuildAll() {
    this.buildShell();
    this.gizmo?.detach();
    this.world.clear();
    this.meshes.clear();
    for (const o of this.loc.objects) this.rebuildOne(o);
    this.attachSelected();
  }

  private rebuildOne(o: LocObject) {
    const old = this.meshes.get(o.id);
    if (old) this.world.remove(old);
    let m: THREE.Object3D;
    const def = o.type === 'fixture' && o.fixture ? this.defs.get(o.fixture.id) : undefined;
    if (def && o.fixture) m = fixtureModelObject(def, o.fixture.mode, o.fixture.mount !== 'floor');
    else {
      m = buildObjectMesh(o, this.mats);
      // Real model as soon as the definition is loaded.
      if (o.type === 'fixture' && o.fixture) void this.loadDef(o.fixture.id).then((d) => d && this.loc.objects.includes(o) && this.rebuildOne(o) && this.attachSelected());
    }
    placeObject(m, o);
    m.userData.id = o.id;
    this.world.add(m);
    this.meshes.set(o.id, m);
    return m;
  }

  private attachSelected() {
    if (!this.gizmo) return;
    const m = this.selected ? this.meshes.get(this.selected) : null;
    if (m) this.gizmo.attach(m);
    else this.gizmo.detach();
  }

  private pick(e: PointerEvent) {
    const rect = this.renderer!.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const hit = ray.intersectObjects(this.world.children, true)[0];
    let o: THREE.Object3D | null = hit?.object ?? null;
    while (o && !o.userData.id) o = o.parent;
    this.select(o?.userData.id ?? null);
  }

  private select(id: string | null) {
    this.selected = id;
    this.attachSelected();
    this.renderPanels();
  }

  /** Screen position of a named object, slightly off its centre (development tests). */
  screenPointOf(name: string): { x: number; y: number } | null {
    const o = this.loc.objects.find((x) => x.name === name);
    const m = o && this.meshes.get(o.id);
    if (!m || !this.renderer) return null;
    const p = new THREE.Vector3(1, 0.15, 0).applyMatrix4(m.matrixWorld).project(this.camera);
    const r = this.renderer.domElement.getBoundingClientRect();
    return { x: r.left + ((p.x + 1) / 2) * r.width, y: r.top + ((1 - p.y) / 2) * r.height };
  }

  /** Camera onto the selected object (key F). */
  private focusSelected() {
    const m = this.selected ? this.meshes.get(this.selected) : null;
    if (!m || !this.orbit) return;
    const box = new THREE.Box3().setFromObject(m);
    const c = box.getCenter(new THREE.Vector3());
    const r = Math.max(0.6, box.getSize(new THREE.Vector3()).length());
    const dir = this.camera.position.clone().sub(this.orbit.target).normalize();
    this.orbit.target.copy(c);
    this.camera.position.copy(c).addScaledVector(dir, r * 2.2);
    this.orbit.update();
  }

  private frameAll() {
    const { width: W, depth: D, height: H } = this.loc.room;
    const s = Math.max(W, D);
    this.camera.position.set(s * 0.55, Math.max(H, 6) * 1.6 + s * 0.2, s * 0.75);
    this.orbit?.target.set(0, this.loc.kind === 'indoor' ? H / 3 : 0, 0);
    this.orbit?.update();
  }

  private topView() {
    const s = Math.max(this.loc.room.width, this.loc.room.depth);
    this.camera.position.set(0, s * 1.1, 0.01);
    this.orbit.target.set(0, 0, 0);
    this.orbit.update();
  }

  // ---------------------------------------------------------------- edits

  private snapshot() {
    this.undo.push(JSON.stringify(this.loc));
    if (this.undo.length > 60) this.undo.shift();
    this.redo = [];
    this.dirty = true;
  }

  private doUndo() {
    const s = this.undo.pop();
    if (!s) return;
    this.redo.push(JSON.stringify(this.loc));
    this.loc = JSON.parse(s);
    this.rebuildAll();
    this.renderPanels();
  }

  private doRedo() {
    const s = this.redo.pop();
    if (!s) return;
    this.undo.push(JSON.stringify(this.loc));
    this.loc = JSON.parse(s);
    this.rebuildAll();
    this.renderPanels();
  }

  private spawnPoint(): V3 {
    const t = this.orbit?.target ?? new THREE.Vector3();
    const r = (v: number) => Math.round(v * 10) / 10;
    return [r(t.x), 0, r(t.z)];
  }

  private add(it: PaletteItem, at?: V3) {
    this.snapshot();
    const p = at ?? this.spawnPoint();
    const n = this.loc.objects.filter((o) => o.type === it.type).length + 1;
    const o: LocObject = {
      id: newId(),
      type: it.type,
      name: `${L() === 'de' ? it.de : it.en} ${n}`,
      pos: [p[0], it.y ?? 0, p[2]],
      rot: [0, 0, 0],
      size: [...it.size] as V3,
      material: it.material,
      ...structuredClone(it.extra ?? {}),
    };
    if (it.type === 'pillar' && this.loc.kind === 'indoor') o.size[1] = this.loc.room.height;
    this.loc.objects.push(o);
    this.rebuildOne(o);
    this.select(o.id);
  }

  private async addTrussRow() {
    const pick = await this.deps.pickFixture();
    if (!pick) return;
    const def = pick.def;
    this.addType(def, pick.mode);
    const count = Number(prompt(tr('Wie viele Lampen auf die Traverse?', 'How many lamps on the truss?'), '8'));
    if (!count || count < 1) return;
    const len = Number(prompt(tr('Länge der Traverse in Metern?', 'Truss length in metres?'), String(Math.max(2, count * 1.2)))) || count * 1.2;
    const height = Number(prompt(tr('Höhe (Unterkante) in Metern?', 'Height (bottom) in metres?'), this.loc.kind === 'indoor' ? String(Math.max(2.5, this.loc.room.height - 0.8)) : '8')) || 5;
    this.snapshot();
    const p = this.spawnPoint();
    const n = this.loc.objects.filter((o) => o.type === 'truss').length + 1;
    const group = `Truss ${n}`;
    this.loc.objects.push({ id: newId(), type: 'truss', name: group, pos: [p[0], height, p[2]], rot: [0, 0, 0], size: [len, 0.3, 0.3], material: 'metal' });
    for (let i = 0; i < count; i++) {
      const x = p[0] - len / 2 + 0.6 + (count > 1 ? ((len - 1.2) * i) / (count - 1) : (len - 1.2) / 2);
      this.loc.objects.push({
        id: newId(),
        type: 'fixture',
        name: `${group} · ${i + 1}`,
        group,
        pos: [Math.round(x * 100) / 100, height, p[2]],
        rot: [0, 0, 0],
        size: [0.4, 0.5, 0.4],
        material: 'darkgrey',
        fixture: { id: def.id, mode: pick.mode, mount: 'hang' },
      });
    }
    this.rebuildAll();
    this.renderPanels();
  }

  /** Puts `count` lamps evenly on a truss (along its line or arc); replaces the old ones. */
  private async spreadLamps(t: LocObject, count: number) {
    const pick = await this.deps.pickFixture();
    if (!pick) return;
    const def = pick.def;
    this.addType(def, pick.mode);
    this.snapshot();
    const group = t.name;
    this.loc.objects = this.loc.objects.filter((o) => !(o.type === 'fixture' && o.group === group));
    for (const [i, p] of spreadPoints(t, count).entries())
      this.loc.objects.push({
        id: newId(),
        type: 'fixture',
        name: `${group} · ${i + 1}`,
        group,
        pos: p.map((v) => Math.round(v * 100) / 100) as V3,
        rot: [0, 0, 0],
        size: [0.4, 0.5, 0.4],
        material: 'darkgrey',
        fixture: { id: def.id, mode: pick.mode, mount: 'hang' },
      });
    this.rebuildAll();
    this.select(t.id);
    this.flash(tr(`${count} Lampen auf „${group}“ verteilt`, `${count} lamps spread on “${group}”`));
  }

  // ------------------------------------------------------------- lamps

  private loadDef(id: string): Promise<FixtureDef | undefined> {
    let p = this.defLoads.get(id);
    if (!p) {
      p = this.deps.fixtureName(id).then((d) => {
        if (d) this.defs.set(id, d);
        return d;
      });
      this.defLoads.set(id, p);
    }
    return p;
  }

  /** Adds a lamp type to the location's "lamps in project" list. */
  private addType(def: FixtureDef, mode: number) {
    this.defs.set(def.id, def);
    this.defLoads.set(def.id, Promise.resolve(def));
    const list = (this.loc.fixtureTypes ??= []);
    if (!list.some((t) => t.id === def.id && t.mode === mode)) {
      list.push({ id: def.id, mode });
      this.dirty = true;
    }
    if (this.side === 'tech') this.renderLeft();
  }

  /** "Lamps in project": drag a card into the view (onto a truss = hanging). */
  private projectLamps() {
    const box = el('div', 'lb-lamps');
    box.append(el('h2', '', tr('Lampen im Projekt', 'Lamps in project')));
    const types = this.loc.fixtureTypes ?? [];
    if (!types.length) box.append(el('p', 'muted small', tr('Noch keine Lampen. Hol dir Lampentypen aus der Galerie und zieh sie dann in die Ansicht.', 'No lamps yet. Add lamp types from the gallery, then drag them into the view.')));
    for (const t of types) {
      const d = this.defs.get(t.id);
      const used = this.loc.objects.filter((o) => o.type === 'fixture' && o.fixture?.id === t.id && o.fixture.mode === t.mode).length;
      const card = el('div', 'lb-lamp');
      card.draggable = true;
      card.title = tr('In die 3D-Ansicht ziehen – auf eine Traverse = hängend, auf Boden/Podest = stehend. Klick = in der Mitte einsetzen.', 'Drag into the 3D view – onto a truss = hanging, onto floor/riser = standing. Click = place in the middle.');
      const x = el('button', 'iconbtn lb-lamp-x', '×');
      x.title = tr('Aus der Liste nehmen (platzierte Lampen bleiben)', 'Remove from list (placed lamps stay)');
      x.onclick = (e) => {
        e.stopPropagation();
        this.loc.fixtureTypes = types.filter((y) => y !== t);
        this.dirty = true;
        this.renderLeft();
      };
      card.append(
        el('div', 'lb-lamp-name', d ? d.model : this.defLoads.has(t.id) && !this.leftWait ? tr('Unbekannte Lampe', 'Unknown lamp') : '…'),
        el('div', 'muted small', d ? `${d.manufacturer} · ${d.modes[t.mode]?.name ?? ''}${used ? ` · ${used}×` : ''}` : t.id),
        x,
      );
      card.ondragstart = (e) => {
        e.dataTransfer?.setData('application/x-vd-fixture', JSON.stringify(t));
        if (e.dataTransfer) e.dataTransfer.effectAllowed = 'copy';
      };
      card.onclick = () => void this.placeLamp(t, null);
      box.append(card);
    }
    // Names of lamp types still loading: redraw once when all of them are there.
    const missing = types.filter((t) => !this.defs.has(t.id));
    if (missing.length && !this.leftWait) {
      this.leftWait = true;
      void Promise.all(missing.map((t) => this.loadDef(t.id))).then(() => {
        this.leftWait = false;
        if (this.side === 'tech' && missing.some((t) => this.defs.has(t.id))) this.renderLeft();
      });
    }
    const add = el('button', 'lb-pal accent', tr('+ Lampen aus der Galerie …', '+ Lamps from the gallery …'));
    add.onclick = () => this.deps.gallery((def, mode) => this.addType(def, mode));
    box.append(add);
    return box;
  }

  private setupDrop() {
    const v = this.view;
    if (v.dataset.drop) return;
    v.dataset.drop = '1';
    v.addEventListener('dragover', (e) => {
      if (!e.dataTransfer?.types.includes('application/x-vd-fixture')) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    v.addEventListener('drop', (e) => {
      const raw = e.dataTransfer?.getData('application/x-vd-fixture');
      if (!raw) return;
      e.preventDefault();
      void this.placeLamp(JSON.parse(raw) as { id: string; mode: number }, { x: e.clientX, y: e.clientY });
    });
  }

  /** Places a lamp: on a truss (hanging, snapped onto the truss line), on an object or the floor (standing). */
  private async placeLamp(t: { id: string; mode: number }, at: { x: number; y: number } | null) {
    const def = this.defs.get(t.id) ?? (await this.loadDef(t.id));
    if (def) this.addType(def, t.mode);
    let pos: V3 | null = null;
    let mount: 'hang' | 'floor' = 'floor';
    let group: string | undefined;
    if (at && this.renderer) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(((at.x - rect.left) / rect.width) * 2 - 1, -((at.y - rect.top) / rect.height) * 2 + 1);
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, this.camera);
      // Trusses are thin lattices: "magnetic" within 0.6 m of the truss line.
      let best: { lo: LocObject; p: THREE.Vector3; d: number } | null = null;
      for (const lo of this.loc.objects) {
        if (lo.type !== 'truss') continue;
        const line: V3[] = lo.arc
          ? spreadPoints(lo, 40)
          : [-1, 1].map((sgn) => {
              const v = rotateXYZ([(sgn * lo.size[0]) / 2, 0, 0], lo.rot);
              return [v[0] + lo.pos[0], v[1] + lo.pos[1], v[2] + lo.pos[2]] as V3;
            });
        if (lo.arc && lo.arc.angle >= 360) line.push(line[0]);
        for (let i = 0; i < line.length - 1; i++) {
          const a = new THREE.Vector3(line[i][0], line[i][1] + 0.15, line[i][2]);
          const b = new THREE.Vector3(line[i + 1][0], line[i + 1][1] + 0.15, line[i + 1][2]);
          const onSeg = new THREE.Vector3();
          const d = ray.ray.distanceSqToSegment(a, b, undefined, onSeg);
          if (d < 0.36 && (!best || d < best.d)) best = { lo, p: onSeg, d };
        }
      }
      if (best) {
        mount = 'hang';
        group = best.lo.name;
        pos = [best.p.x, best.lo.pos[1], best.p.z];
      }
      for (const h of pos ? [] : ray.intersectObjects(this.world.children, true)) {
        let o: THREE.Object3D | null = h.object;
        while (o && !o.userData.id) o = o.parent;
        const lo = this.loc.objects.find((x) => x.id === o?.userData.id);
        if (!lo || lo.type === 'fixture' || lo.type === 'crowd') continue;
        if (lo.type === 'truss') {
          mount = 'hang';
          group = lo.name;
          const p = h.point.clone();
          if (!lo.arc) {
            // Snap onto the truss axis (local x).
            const mesh = this.meshes.get(lo.id)!;
            const local = mesh.worldToLocal(p);
            local.set(local.x, 0, 0);
            mesh.localToWorld(local);
            p.copy(local);
          }
          pos = [p.x, lo.pos[1], p.z];
          break;
        }
        // Stand only on surfaces that face up (riser, table, floor) – skip walls.
        const n = h.face?.normal.clone().transformDirection(h.object.matrixWorld);
        if (n && n.y < 0.6) continue;
        pos = [h.point.x, h.point.y, h.point.z];
        break;
      }
      if (!pos) {
        const p = new THREE.Vector3();
        if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), p)) pos = [p.x, 0, p.z];
      }
    }
    if (!pos) {
      const c = this.spawnPoint();
      pos = [c[0], 0, c[2]];
    }
    this.snapshot();
    const n = this.loc.objects.filter((o) => o.type === 'fixture' && o.fixture?.id === t.id).length + 1;
    const o: LocObject = {
      id: newId(),
      type: 'fixture',
      name: `${def?.model ?? tr('Lampe', 'Lamp')} · ${n}`,
      group,
      pos: pos.map((v) => Math.round(v * 100) / 100) as V3,
      rot: [0, 0, 0],
      size: [0.4, 0.5, 0.4],
      material: 'darkgrey',
      fixture: { id: t.id, mode: t.mode, mount },
    };
    this.loc.objects.push(o);
    this.rebuildOne(o);
    this.select(o.id);
    if (this.side === 'tech') this.renderLeft();
    this.flash(mount === 'hang' ? tr(`An „${group}“ gehängt`, `Hung on “${group}”`) : tr('Aufgestellt', 'Placed standing'));
  }

  private remove(id: string) {
    this.snapshot();
    this.loc.objects = this.loc.objects.filter((o) => o.id !== id);
    this.rearrange();
    const m = this.meshes.get(id);
    if (m) this.world.remove(m);
    this.meshes.delete(id);
    this.select(null);
  }

  private duplicate(id: string) {
    const src = this.loc.objects.find((o) => o.id === id);
    if (!src) return;
    this.snapshot();
    const o: LocObject = { ...structuredClone(src), id: newId(), name: src.name + ' +', pos: [src.pos[0] + 1, src.pos[1], src.pos[2] + 1] };
    this.loc.objects.push(o);
    if (o.output) this.rearrange();
    this.rebuildOne(o);
    this.select(o.id);
  }

  /** After a gizmo drag: write position/rotation/size back into the data. */
  private commitGizmo() {
    const id = this.selected;
    const o = this.loc.objects.find((x) => x.id === id);
    const m = id ? this.meshes.get(id) : null;
    if (!o || !m) return;
    this.snapshot();
    const r2 = (v: number) => Math.round(v * 100) / 100;
    o.pos = [r2(m.position.x), r2(m.position.y), r2(m.position.z)];
    o.rot = [m.rotation.x, m.rotation.y, m.rotation.z].map((v) => Math.round(THREE.MathUtils.radToDeg(v) * 10) / 10) as V3;
    if (m.scale.x !== 1 || m.scale.y !== 1 || m.scale.z !== 1) {
      o.size = [r2(Math.max(0.02, o.size[0] * m.scale.x)), r2(Math.max(0, o.size[1] * m.scale.y)), r2(Math.max(0.02, o.size[2] * m.scale.z))];
      if (o.type === 'videowall') {
        o.pixels = wallPixels(o.size[0], o.size[1], Math.max(...(o.pixels ?? [1920, 1080])));
        if (o.output) this.rearrange();
      }
      m.scale.set(1, 1, 1);
      this.rebuildOne(o);
      this.attachSelected();
    }
    this.renderPanels();
  }

  // --------------------------------------------------------------- panels

  private renderPanels() {
    // outliner
    this.outliner.replaceChildren();
    for (const o of this.loc.objects) {
      const b = el('button', `lb-item${o.id === this.selected ? ' on' : ''}`, o.name);
      b.onclick = () => this.select(o.id);
      this.outliner.append(b);
    }
    if (!this.loc.objects.length) this.outliner.append(el('p', 'muted small', tr('Noch leer – links ein Objekt anklicken.', 'Still empty – click an object on the left.')));
    // properties
    const p = this.props;
    p.replaceChildren();
    const o = this.loc.objects.find((x) => x.id === this.selected);
    if (!o) return this.roomPanel();
    const commit = (fn: () => void, rebuild = true) => {
      this.snapshot();
      const before = o.size.join();
      fn();
      // Video walls: resolution follows the size (portrait walls get portrait pixels).
      if (o.type === 'videowall' && o.size.join() !== before) {
        o.pixels = wallPixels(o.size[0], o.size[1], Math.max(...(o.pixels ?? [1920, 1080])));
        if (o.output) this.rearrange();
      }
      if (rebuild) {
        this.rebuildOne(o);
        this.attachSelected();
      }
      this.renderPanels();
    };
    const num = (v: number, set: (n: number) => void, step = 0.1) => {
      const i = el('input');
      i.type = 'number';
      i.step = String(step);
      i.value = String(Math.round(v * 100) / 100);
      i.onchange = () => commit(() => set(Number(i.value)));
      return i;
    };
    const vec = (label: string, v: V3, keys = ['X', 'Y', 'Z'], step = 0.1) => {
      const row = el('div', 'lb-vec');
      row.append(el('span', 'muted small', label));
      v.forEach((x, k) => {
        const l = el('label', 'small');
        l.append(el('span', 'muted', keys[k]), num(x, (n) => (v[k] = n), step));
        row.append(l);
      });
      return row;
    };
    const name = el('input');
    name.value = o.name;
    name.onchange = () => commit(() => (o.name = name.value), false);
    p.append(el('h2', '', tr('Eigenschaften', 'Properties')), name);
    p.append(vec(tr('Position (m)', 'Position (m)'), o.pos));
    p.append(vec(tr('Drehung (°)', 'Rotation (°)'), o.rot, ['X', 'Y', 'Z'], 15));
    const round = o.type === 'arc' || (o.type === 'truss' && !!o.arc);
    if (o.type !== 'fixture')
      p.append(vec(round ? tr('Größe (m) – B/T = Durchmesser', 'Size (m) – W/D = diameters') : tr('Größe (m)', 'Size (m)'), o.size, [tr('B', 'W'), 'H', 'T']));
    if (o.type === 'truss') {
      // Straight, arc or full circle.
      const form = el('select');
      form.innerHTML = `<option value="line">${tr('gerade', 'straight')}</option><option value="arc">${tr('Bogen', 'arc')}</option><option value="circle">${tr('Kreis / Oval', 'circle / oval')}</option>`;
      form.value = !o.arc ? 'line' : o.arc.angle >= 360 ? 'circle' : 'arc';
      form.onchange = () =>
        commit(() => {
          if (form.value === 'line') {
            delete o.arc;
            o.size[2] = 0.3;
          } else {
            o.arc = { angle: form.value === 'circle' ? 360 : Math.min(o.arc?.angle ?? 180, 359), thickness: 0 };
            if (o.size[2] < 1) o.size[2] = form.value === 'circle' ? o.size[0] : o.size[0] / 2;
          }
        });
      p.append(el('span', 'muted small', tr('Form', 'Shape')), form);
    }
    if (o.arc && (o.type === 'arc' || o.type === 'truss' || o.type === 'sofa')) {
      const a = o.arc;
      const row = el('div', 'lb-vec');
      row.append(el('span', 'muted small', o.type === 'arc' ? tr('Bogen: Winkel (°) · Stärke (m, 0 = voll)', 'Arc: angle (°) · band width (m, 0 = filled)') : tr('Bogen: Winkel (°)', 'Arc: angle (°)')));
      const la = el('label', 'small');
      la.append(el('span', 'muted', '∠'), num(a.angle, (n) => (a.angle = Math.min(360, Math.max(1, n))), 15));
      row.append(la);
      if (o.type === 'arc') {
        const lt = el('label', 'small');
        lt.append(el('span', 'muted', tr('St', 'W')), num(a.thickness, (n) => (a.thickness = Math.max(0, n)), 0.05));
        row.append(lt);
      }
      p.append(row);
    } else if (o.type === 'sofa') {
      const b = el('button', 'btn', tr('Rundung einstellen', 'Set roundness'));
      b.onclick = () => commit(() => (o.arc = { angle: 180, thickness: 0 }));
      p.append(b);
    }
    if (o.type === 'truss') {
      // Spread lamps evenly along this truss (straight or round).
      const row = el('div', 'lb-row');
      const cnt = el('input');
      cnt.type = 'number';
      cnt.min = '1';
      cnt.value = String(Math.max(1, Math.round((o.arc ? (Math.PI * (o.size[0] + o.size[2])) / 2 * (o.arc.angle / 360) : o.size[0]) / 1.2)));
      cnt.title = tr('Anzahl Lampen', 'Number of lamps');
      const go = el('button', 'btn', tr('Lampen darauf verteilen …', 'Spread lamps on it …'));
      go.onclick = () => void this.spreadLamps(o, Math.max(1, Math.round(Number(cnt.value) || 1)));
      row.append(cnt, go);
      p.append(el('span', 'muted small', tr('Lampen (ersetzt die Lampen dieser Traverse)', 'Lamps (replaces this truss’s lamps)')), row);
    }
    if (o.type !== 'fixture' && o.type !== 'crowd') {
      const mat = el('select');
      mat.innerHTML = MAT_PRESETS.map((m) => `<option value="${m.id}">${m.label[L() === 'de' ? 0 : 1]}</option>`).join('');
      mat.value = o.material;
      mat.onchange = () => commit(() => (o.material = mat.value as MatPreset));
      const col = el('input');
      col.type = 'color';
      col.value = o.color ?? '#' + new THREE.Color(MAT_PRESETS.find((m) => m.id === o.material)?.color ?? 0x888888).getHexString();
      col.onchange = () => commit(() => (o.color = col.value));
      const row = el('div', 'lb-row');
      row.append(mat, col);
      p.append(el('span', 'muted small', tr('Material / Farbe', 'Material / colour')), row);
    }
    if (o.type === 'videowall') {
      // Output: own screen, or part of a shared output (one HDMI → several walls).
      const outs = this.loc.outputs ?? [];
      const sel = el('select');
      sel.innerHTML =
        `<option value="">${tr('Eigener Bildschirm', 'Own screen')}</option>` +
        outs.map((x) => `<option value="${x.id}">${x.name} (${x.pixels[0]}×${x.pixels[1]})</option>`).join('') +
        `<option value="+">${tr('+ Neuer Ausgang …', '+ New output …')}</option>`;
      sel.value = o.output?.id ?? '';
      sel.onchange = () =>
        commit(() => {
          if (sel.value === '+') {
            const out = this.newOutput();
            o.output = { id: out.id, rect: [0, 0, 1, 1] };
          } else if (sel.value) o.output = { id: sel.value, rect: [0, 0, 1, 1] };
          else delete o.output;
          this.rearrange();
        }, false);
      p.append(el('span', 'muted small', tr('Ausgang (HDMI)', 'Output (HDMI)')), sel);
      if (o.output) {
        const r = o.output.rect;
        p.append(vec(tr('Ausschnitt im Ausgang (Pixel)', 'Area in output (pixels)'), [r[0], r[1], r[2]] as V3, ['X', 'Y', tr('B', 'W')], 1));
        const xyw = p.lastElementChild!;
        xyw.querySelectorAll('input').forEach((inp, k) => {
          (inp as HTMLInputElement).onchange = () => commit(() => (o.output!.rect[k] = Math.max(0, Math.round(Number((inp as HTMLInputElement).value)))), false);
        });
        const hRow = el('label', 'small lb-row');
        const hIn = el('input');
        hIn.type = 'number';
        hIn.value = String(r[3]);
        hIn.onchange = () => commit(() => (o.output!.rect[3] = Math.max(1, Math.round(Number(hIn.value)))), false);
        hRow.append(el('span', 'muted', 'H'), hIn);
        p.append(hRow);
      }
    }
    if (o.type === 'videowall' && !o.output) {
      const px = o.pixels ?? [1920, 1080];
      p.append(vec(tr('Auflösung (Pixel)', 'Resolution (pixels)'), [px[0], px[1], 0] as V3, ['W', 'H', '–'], 1));
      const last = p.lastElementChild!;
      last.querySelectorAll('input').forEach((inp, k) => {
        if (k === 2) (inp as HTMLInputElement).disabled = true;
        (inp as HTMLInputElement).onchange = () => commit(() => {
          const cur = o.pixels ?? [1920, 1080];
          cur[k] = Math.max(64, Math.round(Number((inp as HTMLInputElement).value)));
          o.pixels = [cur[0], cur[1]];
        }, false);
      });
    }
    if (o.type === 'crowd') p.append(el('span', 'muted small', tr('Personen pro m²', 'People per m²')), num(o.density ?? 1.5, (n) => (o.density = n), 0.1));
    if (o.type === 'fixture' && o.fixture) {
      const f = o.fixture;
      const typeBtn = el('button', 'btn', '…');
      void this.deps.fixtureName(f.id).then((d) => {
        typeBtn.textContent = d ? `${d.manufacturer} ${d.model}` : f.id;
        const mode = el('select');
        mode.innerHTML = (d?.modes ?? []).map((m, i) => `<option value="${i}">${m.name} (${m.channels.length} ch)</option>`).join('');
        mode.value = String(f.mode);
        mode.onchange = () => commit(() => (f.mode = Number(mode.value)), false);
        typeBtn.after(mode);
      });
      typeBtn.onclick = async () => {
        const pick = await this.deps.pickFixture();
        if (!pick) return;
        this.addType(pick.def, pick.mode);
        commit(() => ((f.id = pick.def.id), (f.mode = pick.mode)));
      };
      const mount = el('select');
      mount.innerHTML = `<option value="hang">${tr('hängend', 'hanging')}</option><option value="floor">${tr('stehend', 'standing')}</option>`;
      mount.value = f.mount;
      mount.onchange = () => commit(() => (f.mount = mount.value as 'hang' | 'floor'));
      const grp = el('input');
      grp.value = o.group ?? '';
      grp.placeholder = tr('Gruppe (z. B. Truss 1)', 'Group (e.g. truss 1)');
      grp.onchange = () => commit(() => (o.group = grp.value), false);
      const patch = el('div', 'lb-row');
      const uni = el('input');
      uni.type = 'number';
      uni.placeholder = 'Universe';
      uni.value = f.universe ? String(f.universe) : '';
      uni.onchange = () => commit(() => (f.universe = Number(uni.value) || undefined), false);
      const adr = el('input');
      adr.type = 'number';
      adr.placeholder = tr('Adresse', 'Address');
      adr.value = f.address ? String(f.address) : '';
      adr.onchange = () => commit(() => (f.address = Number(adr.value) || undefined), false);
      patch.append(uni, adr);
      p.append(
        el('span', 'muted small', tr('Lampe', 'Lamp')),
        typeBtn,
        el('span', 'muted small', tr('Montage', 'Mount')),
        mount,
        grp,
        el('span', 'muted small', tr('Patch (leer = automatisch)', 'Patch (empty = automatic)')),
        patch,
      );
    }
    const act = el('div', 'lb-row');
    const dup = el('button', 'btn', tr('Duplizieren', 'Duplicate'));
    dup.title = '⌘D';
    dup.onclick = () => this.duplicate(o.id);
    const del = el('button', 'btn danger', tr('Löschen', 'Delete'));
    del.onclick = () => this.remove(o.id);
    act.append(dup, del);
    p.append(act);
  }

  private roomPanel() {
    const p = this.props;
    const r = this.loc.room;
    p.append(el('h2', '', this.loc.kind === 'indoor' ? tr('Raum', 'Room') : tr('Gelände', 'Grounds')));
    const field = (label: string, v: number, set: (n: number) => void) => {
      const l = el('label', 'field');
      const i = el('input');
      i.type = 'number';
      i.step = '0.5';
      i.value = String(v);
      i.onchange = () => {
        this.snapshot();
        set(Math.max(1, Number(i.value)));
        this.buildShell();
      };
      l.append(el('span', '', label), i);
      return l;
    };
    p.append(
      field(tr('Breite (m)', 'Width (m)'), r.width, (n) => (r.width = n)),
      field(tr('Tiefe (m)', 'Depth (m)'), r.depth, (n) => (r.depth = n)),
    );
    if (this.loc.kind === 'indoor') p.append(field(tr('Höhe (m)', 'Height (m)'), r.height, (n) => (r.height = n)));
    this.outputsPanel(p);
    p.append(
      el('div', 'note', tr(
        'Objekt links in der Palette anklicken – es erscheint in der Mitte der Ansicht. Anklicken zum Auswählen, Pfeile ziehen zum Bewegen. W/E/R: Verschieben/Drehen/Größe · ⌘D duplizieren · Entf löschen · ⌘Z rückgängig.',
        'Click an object in the palette – it appears in the middle of the view. Click to select, drag the arrows to move. W/E/R: move/rotate/scale · ⌘D duplicate · Del delete · ⌘Z undo.',
      )),
      el('div', 'note', tr('3D-Scans (z. B. vom iPhone) einbinden ist vorbereitet und kommt in einer späteren Version.', 'Importing 3D scans (e.g. from an iPhone) is planned for a later version.')),
    );
  }

  // -------------------------------------------------------------- outputs

  private newOutput() {
    const outs = (this.loc.outputs ??= []);
    const out = { id: newId(), name: `${tr('Ausgang', 'Output')} ${outs.length + 1}`, pixels: [1920, 1080] as [number, number], arrange: 'stack' as ArrangeMode };
    outs.push(out);
    return out;
  }

  /** Re-layout every output with its walls (same pixel density for all walls). */
  private rearrange() {
    for (const out of this.loc.outputs ?? []) {
      const walls = this.loc.objects.filter((o) => o.type === 'videowall' && o.output?.id === out.id);
      arrangeOutput(out, walls, ((out as { arrange?: ArrangeMode }).arrange ?? 'stack'));
    }
  }

  private outputsPanel(p: HTMLElement) {
    p.append(el('h2', '', tr('Ausgänge (HDMI)', 'Outputs (HDMI)')));
    p.append(el('p', 'muted small', tr('Ein Ausgang = ein Bild, z. B. ein HDMI-Kabel zum LED-Prozessor. Mehrere Videowände teilen sich dann dieses Bild.', 'One output = one picture, e.g. one HDMI cable to the LED processor. Several video walls then share it.')));
    const free = this.loc.objects.filter((o) => o.type === 'videowall' && !o.output);
    const join = el('button', 'btn primary', tr(`Alle freien Videowände (${free.length}) zusammenfassen`, `Combine all free video walls (${free.length})`));
    join.disabled = free.length < 2;
    join.onclick = () => {
      this.snapshot();
      const out = this.newOutput();
      for (const w of free) w.output = { id: out.id, rect: [0, 0, 1, 1] };
      this.rearrange();
      this.renderPanels();
    };
    p.append(join);
    for (const out of this.loc.outputs ?? []) {
      const o2 = out as typeof out & { arrange?: ArrangeMode };
      const members = this.loc.objects.filter((o) => o.type === 'videowall' && o.output?.id === out.id);
      const card = el('div', 'card lb-out');
      const name = el('input');
      name.value = out.name;
      name.onchange = () => {
        this.snapshot();
        out.name = name.value;
        this.renderPanels();
      };
      const res = el('div', 'lb-row');
      const w = el('input');
      const h = el('input');
      for (const [i, inp] of [w, h].entries()) {
        inp.type = 'number';
        inp.value = String(out.pixels[i]);
        inp.onchange = () => {
          this.snapshot();
          out.pixels[i] = Math.max(64, Math.round(Number(inp.value)));
          this.rearrange();
          this.renderPanels();
        };
      }
      res.append(w, el('span', 'muted', '×'), h);
      const arr = el('div', 'seg');
      for (const [m, label] of [
        ['stack', tr('Gestapelt', 'Stacked')],
        ['row', tr('Nebeneinander', 'Side by side')],
      ] as const) {
        const b = el('button', (o2.arrange ?? 'stack') === m ? 'on' : '', label);
        b.onclick = () => {
          this.snapshot();
          o2.arrange = m;
          this.rearrange();
          this.renderPanels();
        };
        arr.append(b);
      }
      const del = el('button', 'linkish', tr('Ausgang auflösen', 'Remove output'));
      del.onclick = () => {
        this.snapshot();
        for (const m of members) delete m.output;
        this.loc.outputs = (this.loc.outputs ?? []).filter((x) => x.id !== out.id);
        this.renderPanels();
      };
      card.append(name, res, arr, this.mappingPreview(out.pixels, members), el('span', 'muted small', members.map((m) => m.name).join(', ') || tr('Noch keine Videowand zugeordnet', 'No video wall assigned yet')), del);
      p.append(card);
    }
  }

  /** Small drawing of the output with each wall's area. */
  private mappingPreview(px: [number, number], members: LocObject[]) {
    const c = el('canvas', 'lb-map');
    const W = 260;
    const H = Math.max(40, Math.round((W * px[1]) / px[0]));
    c.width = W * 2;
    c.height = H * 2;
    c.style.width = `${W}px`;
    c.style.height = `${H}px`;
    const g = c.getContext('2d')!;
    g.scale(2, 2);
    g.fillStyle = '#0c0e13';
    g.fillRect(0, 0, W, H);
    const sx = W / px[0];
    const sy = H / px[1];
    const colors = ['#FF3B3B', '#FFB020', '#3DDC84', '#22C8F0', '#B45CFF', '#FF5C93'];
    members.forEach((m, i) => {
      const [x, y, w, h] = m.output!.rect;
      g.fillStyle = colors[i % colors.length] + '55';
      g.strokeStyle = colors[i % colors.length];
      g.fillRect(x * sx, y * sy, w * sx, h * sy);
      g.strokeRect(x * sx + 0.5, y * sy + 0.5, w * sx - 1, h * sy - 1);
      g.fillStyle = '#fff';
      g.font = '10px system-ui';
      g.fillText(m.name, x * sx + 4, y * sy + 12);
    });
    g.strokeStyle = '#2A2F3D';
    g.strokeRect(0.5, 0.5, W - 1, H - 1);
    return c;
  }

  // ----------------------------------------------------------------- keys

  private key(e: KeyboardEvent) {
    if (this.root.hidden) return;
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      e.shiftKey ? this.doRedo() : this.doUndo();
    } else if (mod && e.key.toLowerCase() === 'd' && this.selected) {
      e.preventDefault();
      this.duplicate(this.selected);
    } else if (mod && e.key.toLowerCase() === 's') {
      e.preventDefault();
      e.stopPropagation();
      void this.save(e.shiftKey);
    } else if (!mod && (e.key === 'Delete' || e.key === 'Backspace') && this.selected) {
      e.preventDefault();
      this.remove(this.selected);
    } else if (!mod && e.key.toLowerCase() === 'w') this.setMode('translate');
    else if (!mod && e.key.toLowerCase() === 'e') this.setMode('rotate');
    else if (!mod && e.key.toLowerCase() === 'r') this.setMode('scale');
    else if (!mod && e.key.toLowerCase() === 'f') this.focusSelected();
    else if (e.key === 'Escape') this.select(null);
  }

  // ---------------------------------------------------------------- files

  private flash(msg: string) {
    this.status.textContent = msg;
    setTimeout(() => (this.status.textContent = ''), 2500);
  }

  private async save(saveAs: boolean) {
    this.loc.modified = new Date().toISOString();
    const p = await window.vd.fileSave('location', this.loc, this.filePath, saveAs || !this.filePath);
    if (p) {
      this.filePath = p;
      this.dirty = false;
      this.flash(tr('Gespeichert', 'Saved'));
    }
  }

  private async openFile() {
    const f = await window.vd.fileOpen('location');
    if (f) await this.open(normalizeLocation(f.data), f.path);
  }

  /** Hand the current state to the 3D view (same as the button). */
  previewNow() {
    this.deps.preview(structuredClone(this.loc));
  }

  /** For the "edit location" flow from a project. */
  get location() {
    return this.loc;
  }

  get isFromProject() {
    return this.fromProject;
  }
}
