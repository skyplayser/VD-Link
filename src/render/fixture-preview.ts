// Small live 3D preview of one lamp for the library: the real model (same renderer as
// the venue view), slowly orbiting camera, and a standard show – pan/tilt movement,
// colour fade, zoom, gobos, prism and pixel chase. The show goes through encode() →
// DMX → decode() of the selected mode, so the preview also shows that the channel
// mapping of the fixture works.

import * as THREE from 'three/webgpu';
import { compileMode, decode, encode, newLook, type CompiledMode, type Look } from '../shared/dmx-codec.ts';
import type { Rig, RigFixture } from '../shared/demo-rig.ts';
import type { FixtureDef } from '../shared/fixture-types.ts';
import { resolveModel } from '../shared/fixture-model.ts';
import { RigRenderer } from './fixture.ts';
import { createGoboAtlas } from './gobos.ts';
import { BeamLightBuffer } from './lighting.ts';

const MOUNT_Y = 2.3;

export class FixturePreview {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(42, 1, 0.05, 60);
  private lights = new BeamLightBuffer(createGoboAtlas());
  private rr: RigRenderer | null = null;
  private cm: CompiledMode | null = null;
  private show = newLook();
  private look = newLook();
  private dmx = new Uint8Array(512);
  private t0 = performance.now();
  private last = performance.now();
  private target = new THREE.Vector3(0, 1.5, 0);
  private dist = 2;
  private floorMount = false;

  private constructor(
    private renderer: THREE.WebGPURenderer,
    private box: HTMLElement,
  ) {
    this.scene.background = new THREE.Color(0x101116);
    this.scene.add(new THREE.HemisphereLight(0xdfe6f2, 0x30303a, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 5, 4);
    this.scene.add(key);
    // Floor receives the beams (spots, gobos) like the venue floor.
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14).rotateX(-Math.PI / 2), this.lights.material(0x1c1d22, 0.85, 0, 0.9));
    this.scene.add(floor);
    renderer.setAnimationLoop(() => this.frame());
  }

  static async create(box: HTMLElement): Promise<FixturePreview | null> {
    for (const forceWebGL of [false, true]) {
      try {
        const r = new THREE.WebGPURenderer({ antialias: true, forceWebGL });
        r.toneMapping = THREE.AgXToneMapping;
        r.toneMappingExposure = 1.1;
        await r.init();
        box.append(r.domElement);
        return new FixturePreview(r, box);
      } catch {
        /* try the WebGL backend */
      }
    }
    return null;
  }

  /** Shows a lamp (replaces the previous one). */
  set(def: FixtureDef, modeIndex = 0) {
    if (this.rr) {
      this.scene.remove(this.rr.group);
      this.rr = null;
    }
    const model = resolveModel(def, modeIndex);
    const floor = model.body === 'gigbar' || model.body === 'follow';
    const cm = compileMode(def, modeIndex);
    const f: RigFixture = { index: 0, pos: [0, floor ? 0 : MOUNT_Y, 0], mount: floor ? 'floor' : 'hang', universe: 1, address: 1, group: '', yaw: 0, def, modeIndex, cm };
    const rig = { def, modeIndex, footprint: cm.footprint, fixtures: [f], universes: 1, scenario: null, types: [{ def, modeIndex, count: 1 }] } as unknown as Rig;
    this.rr = new RigRenderer(rig, def);
    this.scene.add(this.rr.group);
    this.cm = cm;
    // Frame the lamp: wide bars need more distance.
    const w = Math.max(model.size[0], model.size[1], 0.3);
    this.dist = Math.min(5, 1.2 + w * 1.7);
    this.floorMount = floor;
    // Look at the lamp itself; hanging lamps are seen from below like from the audience.
    this.target.set(0, floor ? 1.1 : MOUNT_Y - 0.25, 0);
    this.t0 = performance.now();
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    this.renderer.domElement.remove();
    this.renderer.dispose();
  }

  private nextFrame = 0;

  private frame() {
    const now = performance.now();
    // The small preview needs no more than 30 frames per second.
    if (now < this.nextFrame) return;
    this.nextFrame = now + 1000 / 30 - 2;
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    // Only draw while the library is on screen.
    if (!this.rr || !this.cm || !this.box.isConnected || this.box.offsetParent === null || document.documentElement.dataset.winHidden) return;
    const w = this.box.clientWidth;
    const h = this.box.clientHeight;
    if (!w || !h) return;
    if (this.renderer.domElement.width !== Math.round(w * devicePixelRatio)) {
      this.renderer.setPixelRatio(devicePixelRatio);
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
    const t = (now - this.t0) / 1000;
    // Standard show.
    const s: Look = this.show;
    s.pan = 0.5 + 0.16 * Math.sin(t * 0.55);
    s.tilt = 0.5 + 0.14 * Math.sin(t * 0.8 + 1);
    s.dimmer = 1;
    s.open = true;
    s.strobeHz = 0;
    const c = new THREE.Color().setHSL((t * 0.07) % 1, 1, 0.5);
    s.r = c.r;
    s.g = c.g;
    s.b = c.b;
    s.zoom = 0.5 + 0.5 * Math.sin(t * 0.45);
    const step = Math.floor(t / 2.6);
    s.gobo = step % 6 === 0 ? 0 : ((step - 1) % 5) + 1;
    s.prism = step % 7 === 5;
    encode(this.cm, s, this.dmx, 0, t);
    decode(this.cm, this.dmx, 0, this.look);

    const a = t * 0.18 + 0.7;
    const dy = this.floorMount ? 0.35 : -this.dist * 0.45;
    this.camera.position.set(Math.sin(a) * this.dist, this.target.y + dy, Math.cos(a) * this.dist);
    this.camera.lookAt(this.target);
    this.lights.begin();
    this.rr.update([this.look], dt, t, this.lights);
    this.lights.end();
    this.renderer.render(this.scene, this.camera);
  }
}
