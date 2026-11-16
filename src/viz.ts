// The 3D visualisation: renderer, scene, rig, venue, video walls and the frame loop.
// Created lazily – only when the first project is opened (the start screen needs no GPU).

import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { compileMode, decode, encode, newLook, type CompiledMode, type Look } from './shared/dmx-codec.ts';
import { buildRig, demoLook, type Rig } from './shared/demo-rig.ts';
import type { FixtureDef } from './shared/fixture-types.ts';
import type { Scenario } from './shared/scenarios.ts';
import { beamGlobals } from './render/beam.ts';
import { RigRenderer } from './render/fixture.ts';
import { createGoboAtlas } from './render/gobos.ts';
import { BeamLightBuffer } from './render/lighting.ts';
import { buildVenue, type Venue } from './render/venue.ts';
import { VideoWall } from './render/videowall.ts';
import type { AppSettings, ProjectData } from './project.ts';
import type { CamId } from './ui/ctx.ts';

const UNIVERSES = 32;

export class Viz {
  readonly backend: string;
  rig!: Rig;
  looks: Look[] = [];
  walls: VideoWall[] = [];
  venue: Venue | null = null;
  readonly netDmx = new Uint8Array(UNIVERSES * 512);
  readonly demoDmx = new Uint8Array(UNIVERSES * 512);
  /** Rendering only while the 3D tab is visible – asked every frame, never cached. */
  isVisible: () => boolean = () => false;
  useNetwork = () => false;
  /** Debug switches (?nosurf=1, ?nobeams=1). */
  debug = { nosurf: false, nobeams: false };
  onSecond: (fps: number, t: number) => void = () => {};

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1500);
  private controls: OrbitControls;
  private pipeline: THREE.RenderPipeline;
  private sceneColor;
  private bloomNode;
  private lights = new BeamLightBuffer(createGoboAtlas());
  private rigRenderer: RigRenderer | null = null;
  private rigGroup = new THREE.Group();
  private hazeFactor = 1;
  private daylight = false;
  private tStart = performance.now();
  private last = performance.now();
  /** Next frame time when the frame rate is limited. */
  private nextFrame = 0;
  private frames = 0;
  private fpsT = performance.now();

  private constructor(
    private renderer: THREE.WebGPURenderer,
    private container: HTMLElement,
    private app: AppSettings,
  ) {
    this.backend = (renderer.backend as { isWebGPUBackend?: boolean }).isWebGPUBackend ? 'WebGPU' : 'WebGL2';
    this.scene.background = new THREE.Color(0x020203);
    this.scene.add(new THREE.HemisphereLight(0x8090b0, 0x101014, 0.25), this.rigGroup);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.pipeline = new THREE.RenderPipeline(renderer);
    const scenePass = pass(this.scene, this.camera);
    this.sceneColor = scenePass.getTextureNode('output');
    this.bloomNode = bloom(this.sceneColor, 0.85, 0.5, 0.75);
    new ResizeObserver(() => this.resize()).observe(container);
    this.applyApp(app);
    renderer.setAnimationLoop(() => this.frame());
  }

  static async create(container: HTMLElement, app: AppSettings, forceWebGL = false): Promise<Viz> {
    const renderer = new THREE.WebGPURenderer({ antialias: false, forceWebGL });
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    await renderer.init();
    return new Viz(renderer, container, app);
  }

  setTimeOffset(seconds: number) {
    this.tStart = performance.now() - seconds * 1000;
  }

  get beamCount() {
    return this.lights.size;
  }

  // ------------------------------------------------------------------ setup

  resize() {
    const w = this.container.clientWidth || innerWidth;
    const h = this.container.clientHeight || innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  applyApp(app: AppSettings) {
    this.app = app;
    const q = app.quality;
    this.renderer.setPixelRatio(q === 'low' ? 0.75 : q === 'mid' ? 1 : Math.min(devicePixelRatio || 1, 1.5));
    beamGlobals.noise.value = q === 'low' ? 0 : 1;
    beamGlobals.soft.value = q === 'low' ? 0 : 1;
    this.applyBloom();
    this.resize();
  }

  private applyBloom() {
    // In daylight the HDR sky would bloom over everything – glow only at night / indoors.
    this.pipeline.outputNode = this.app.bloom && !this.daylight ? this.sceneColor.add(this.bloomNode) : this.sceneColor;
    this.pipeline.needsUpdate = true;
  }

  /** Free camera (development screenshots). */
  setCameraRaw(p: [number, number, number], t: [number, number, number]) {
    this.camera.position.set(...p);
    this.controls.target.set(...t);
    this.controls.update();
  }

  setCamera(id: CamId) {
    const [p, tg] = this.rig.scenario.cameras[id];
    this.camera.position.set(...p);
    this.controls.target.set(...tg);
    this.controls.update();
  }

  setHaze(h: number) {
    beamGlobals.haze.value = h * this.hazeFactor;
  }

  private work: THREE.HemisphereLight | null = null;

  /** Work light: evenly lights the venue so lamp bodies and trusses are visible. */
  setWorkLight(on: boolean) {
    if (on && !this.work) {
      this.work = new THREE.HemisphereLight(0xe8eef8, 0x404048, 2.2);
      this.scene.add(this.work);
    } else if (!on && this.work) {
      this.scene.remove(this.work);
      this.work = null;
    }
  }

  setDay(project: ProjectData) {
    const env = this.venue?.setDay(project.view.day, this.scene, this.renderer) ?? { haze: 1, bloomThreshold: 0.75 };
    this.hazeFactor = env.haze;
    this.bloomNode.threshold.value = env.bloomThreshold;
    this.daylight = !!this.venue?.outdoor && project.view.day;
    this.applyBloom();
    this.setHaze(project.view.haze);
  }

  /** (Re)build rig, venue and walls for a project. */
  load(def: FixtureDef, project: ProjectData, sc: Scenario, lookup: (id: string) => FixtureDef | undefined) {
    this.rigGroup.clear();
    this.venue?.dispose();
    for (const w of this.walls) {
      this.scene.remove(w.group);
      w.dispose();
    }
    this.rig = buildRig(def, Math.min(project.fixture.mode, def.modes.length - 1), sc, lookup);
    this.rigRenderer = new RigRenderer(this.rig, def);
    this.looks = this.rig.fixtures.map(() => newLook());
    this.venue = buildVenue(sc, this.rig, this.lights);
    this.rigGroup.add(this.rigRenderer.group, this.venue.group);
    // Walls on a shared output become one screen with several surfaces.
    const surface = (ws: Scenario['walls'][number]) => ({
      name: ws.name,
      width: ws.width,
      height: ws.height,
      pos: ws.pos,
      rot: ws.rot ?? ([0, ws.rotY, 0] as [number, number, number]),
      rect: ws.rect,
    });
    this.walls = [];
    for (const out of sc.outputs ?? []) {
      const members = sc.walls.filter((w) => w.output === out.id && w.rect);
      if (members.length) this.walls.push(new VideoWall(out.name, out.pixels, members.map(surface), true));
    }
    for (const ws of sc.walls.filter((w) => !w.output || !w.rect || !(sc.outputs ?? []).some((o) => o.id === w.output)))
      this.walls.push(new VideoWall(ws.name, ws.pixels, [surface(ws)]));
    for (const w of this.walls) this.scene.add(w.group);
    this.demoDmx.fill(0);
    this.setCamera(project.view.camera);
    this.setDay(project);
  }

  currentDmx() {
    return this.useNetwork() ? this.netDmx : this.demoDmx;
  }

  // ------------------------------------------------------------------ loop

  private frame() {
    const now = performance.now();
    // Frame-rate limit: consoles send ≤ 44 DMX frames/s and captured video runs at 60,
    // so rendering a 165 Hz screen at full rate only costs GPU time (e.g. VJ-Link's).
    const cap = this.app.fpsCap ?? 60;
    if (cap > 0) {
      if (now < this.nextFrame - 1) return;
      const iv = 1000 / cap;
      this.nextFrame = now - this.nextFrame > iv ? now + iv : this.nextFrame + iv;
    }
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    const tt = (now - this.tStart) / 1000;
    const rig = this.rig;
    if (rig) {
      const net = this.useNetwork();
      const dmx = net ? this.netDmx : this.demoDmx;
      if (!net) {
        // Demo goes through encode → DMX → decode, exactly like a console would.
        for (let i = 0; i < rig.fixtures.length; i++) {
          const f = rig.fixtures[i];
          encode(f.cm, demoLook(rig, f, tt, this.looks[i]), this.demoDmx, (f.universe - 1) * 512 + f.address - 1, tt);
        }
      }
      for (let i = 0; i < rig.fixtures.length; i++) {
        const f = rig.fixtures[i];
        decode(f.cm, dmx, (f.universe - 1) * 512 + f.address - 1, this.looks[i]);
      }
      if (this.isVisible()) {
        this.lights.begin();
        this.rigRenderer!.update(this.looks, dt, tt, this.lights);
        this.lights.end();
        if (this.debug.nosurf) this.lights.count.value = 0;
        if (this.debug.nobeams) this.rigRenderer!.beams.mesh.visible = false;
        this.venue?.update(tt);
        for (const w of this.walls) w.update(tt);
        this.controls.update();
        this.pipeline.render();
        this.frames++;
      }
    }
    if (now - this.fpsT > 1000) {
      const fps = Math.round((this.frames * 1000) / (now - this.fpsT));
      this.frames = 0;
      this.fpsT = now;
      this.onSecond(fps, tt);
    }
  }
}
