// Venue geometry for the three scenarios: room or open-air ground, stage/riser,
// DJ booth, trusses, crowd and – for the festival – roof, towers, FOH and sky.
// Everything is procedural (no third-party assets).

import * as THREE from 'three/webgpu';
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';
import type { Rig } from '../shared/demo-rig.ts';
import type { Scenario } from '../shared/scenarios.ts';
import type { BeamLightBuffer } from './lighting.ts';
import { buildClubDecor } from './club-decor.ts';
import { buildObjectMesh, litMaterials, placeObject } from './objects.ts';
import { fract, min, smoothstep, float, vec3, positionWorld } from 'three/tsl';

export interface Venue {
  group: THREE.Group;
  outdoor: boolean;
  update(t: number): void;
  /** Festival only: switch between day and night. Returns the haze visibility factor. */
  setDay(day: boolean, scene: THREE.Scene, renderer: THREE.WebGPURenderer): { haze: number; bloomThreshold: number };
  dispose(): void;
}

const TRUSS = 0.29; // 30 cm box truss

function boxTruss(length: number, mat: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const s = TRUSS;
  const chord = new THREE.CylinderGeometry(0.024, 0.024, length, 8).rotateZ(Math.PI / 2);
  for (const [y, z] of [
    [s / 2, s / 2],
    [s / 2, -s / 2],
    [-s / 2, s / 2],
    [-s / 2, -s / 2],
  ]) {
    const m = new THREE.Mesh(chord, mat);
    m.position.set(0, y, z);
    g.add(m);
  }
  const steps = Math.max(1, Math.floor(length / 0.5));
  const lace = new THREE.CylinderGeometry(0.01, 0.01, s * 1.41, 6);
  const im = new THREE.InstancedMesh(lace, mat, steps * 4);
  const o = new THREE.Object3D();
  let k = 0;
  for (let i = 0; i < steps; i++) {
    const x = -length / 2 + (i + 0.5) * 0.5;
    const faces: [number, number, number, number][] = [
      [0, s / 2, 0, Math.PI / 4],
      [0, -s / 2, 0, -Math.PI / 4],
      [s / 2, 0, Math.PI / 2, Math.PI / 4],
      [-s / 2, 0, Math.PI / 2, -Math.PI / 4],
    ];
    for (const [z, y, rx, rz] of faces) {
      o.position.set(x, y, z);
      o.rotation.set(rx, 0, rz);
      o.updateMatrix();
      im.setMatrixAt(k++, o.matrix);
    }
  }
  g.add(im);
  return g;
}

/** Truss between two points. */
function trussBetween(a: THREE.Vector3, b: THREE.Vector3, mat: THREE.Material) {
  const len = a.distanceTo(b);
  const t = boxTruss(len, mat);
  t.position.copy(a).add(b).multiplyScalar(0.5);
  t.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), b.clone().sub(a).normalize());
  return t;
}

function box(w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

/** Quilted diamond stitch pattern for dark club walls. */
function quilt(hex: number) {
  const c = new THREE.Color(hex);
  const u = positionWorld.x.add(positionWorld.z);
  const y = positionWorld.y;
  const a = fract(u.add(y).mul(1.6));
  const b = fract(u.sub(y).mul(1.6));
  const line = float(1).sub(smoothstep(0.0, 0.05, min(min(a, a.oneMinus()), min(b, b.oneMinus()))));
  return vec3(c.r, c.g, c.b).mul(float(1).sub(line.mul(0.5)));
}

export function buildVenue(sc: Scenario, rig: Rig, lights: BeamLightBuffer): Venue {
  const group = new THREE.Group();
  const trussMat = new THREE.MeshStandardNodeMaterial({ color: 0xb9bcc4, roughness: 0.35, metalness: 0.85 });
  const crowdMat = lights.material(0x55555f, 0.85, 0, 0.45);
  const stageMat = lights.material(0x141418, 0.8, 0, 0.45);
  const boothMat = lights.material(0x1c1c22, 0.4, 0.2, 0.45);

  // ---- room or ground
  let sky: SkyMesh | null = null;
  let sun: THREE.DirectionalLight | null = null;
  let hemi: THREE.HemisphereLight | null = null;
  if (sc.room) {
    const { width: W, depth: D, height: H, backZ } = sc.room;
    const zMid = backZ + D / 2;
    const club = sc.id === 'club';
    // Dark polished floor and quilted walls – dark to look at, but spots and gobos show clearly.
    const floorMat = lights.surface({ color: club ? 0x17171b : 0x3a3a42, roughness: club ? 0.32 : 0.55, metalness: 0.05, receive: 0.6 });
    const wallMat = club
      ? lights.surface({ color: 0x1d1d22, roughness: 0.85, receive: 0.5, colorNode: quilt(0x1d1d22) })
      : lights.material(0x24242a, 0.9, 0, 0.5);
    if (club) wallMat.userData.vr.pattern = 'quilt';
    const ceilMat = lights.material(0x0c0c0e, 0.95, 0, 0.2);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = zMid;
    const back = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat);
    back.position.set(0, H / 2, backZ);
    const left = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat);
    left.rotation.y = Math.PI / 2;
    left.position.set(-W / 2, H / 2, zMid);
    const right = left.clone();
    right.rotation.y = -Math.PI / 2;
    right.position.x = W / 2;
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), ceilMat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, H, zMid);
    group.add(floor, back, left, right, ceil);
    if (club) group.add(buildClubDecor(lights));
  } else {
    const g = sc.ground!;
    const groundMat = lights.material(0x2b3324, 0.95, 0, 0.5);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(g.width, g.depth), groundMat);
    ground.rotation.x = -Math.PI / 2;
    group.add(ground);
    sky = new SkyMesh();
    sky.scale.setScalar(900);
    sky.turbidity.value = 4;
    sky.rayleigh.value = 1.4;
    sky.mieCoefficient.value = 0.004;
    sky.mieDirectionalG.value = 0.8;
    group.add(sky);
    sun = new THREE.DirectionalLight(0xfff2e0, 0);
    sun.position.set(-40, 60, 50);
    hemi = new THREE.HemisphereLight(0xbfd6ff, 0x3a4a2a, 0);
    group.add(sun, hemi);

    // Stage roof: four towers, roof slab, side wings for the IMAG screens (festival template only).
    if (!sc.custom) {
    const st = sc.stage;
    const roofY = st.roof ?? 14;
    const x0 = -st.width / 2 - 0.6;
    const x1 = st.width / 2 + 0.6;
    const zf = st.z + st.depth / 2 + 0.6;
    const zb = st.z - st.depth / 2 - 0.6;
    for (const [x, z] of [
      [x0, zf],
      [x1, zf],
      [x0, zb],
      [x1, zb],
    ])
      group.add(trussBetween(new THREE.Vector3(x, 0, z), new THREE.Vector3(x, roofY, z), trussMat));
    group.add(trussBetween(new THREE.Vector3(x0, roofY, zf), new THREE.Vector3(x1, roofY, zf), trussMat));
    group.add(trussBetween(new THREE.Vector3(x0, roofY, zb), new THREE.Vector3(x1, roofY, zb), trussMat));
    const roofMat = new THREE.MeshStandardNodeMaterial({ color: 0x15161a, roughness: 0.8 });
    group.add(box(st.width + 3, 0.25, st.depth + 3, roofMat, 0, roofY + 0.6, st.z));
    // Back wall of the stage (black molton).
    group.add(box(st.width + 1, roofY, 0.1, lights.material(0x0d0d10, 0.95), 0, roofY / 2, zb - 0.3));
    // Wings / scaffolds carrying the side screens.
    for (const w of sc.walls.slice(1)) {
      const [wx, , wz] = w.pos;
      const sx = Math.sign(wx);
      for (const dx of [-w.width / 2 + 0.3, w.width / 2 - 0.3]) {
        const px = wx + dx * Math.cos((w.rotY * Math.PI) / 180);
        const pz = wz - dx * Math.sin((w.rotY * Math.PI) / 180) - 0.4;
        group.add(trussBetween(new THREE.Vector3(px, 0, pz), new THREE.Vector3(px, w.pos[1] + w.height / 2 + 0.6, pz), trussMat));
      }
      void sx;
    }
    // Barricade, FOH tent, delay-tower legs.
    const barrierMat = lights.material(0x6f737b, 0.5, 0.6);
    group.add(box(st.width + 6, 1.1, 0.15, barrierMat, 0, 0.55, zf + 2.2));
    group.add(box(6, 0.1, 4, roofMat, 0, 3.2, 23));
    group.add(box(5.6, 1.1, 3.6, lights.material(0x202227, 0.8), 0, 0.55, 23));
    for (const x of [-11, 11]) group.add(trussBetween(new THREE.Vector3(x, 0, 18), new THREE.Vector3(x, 8.2, 18), trussMat));
    }
  }

  // ---- own location: all objects from the builder
  if (sc.custom && sc.objects) {
    const mats = litMaterials(lights);
    for (const ob of sc.objects) {
      const m = buildObjectMesh(ob, mats);
      placeObject(m, ob);
      group.add(m);
    }
  }

  // ---- stage / riser + DJ booth (templates only)
  const st = sc.stage;
  if (!sc.custom) {
    group.add(box(st.width, st.height, st.depth, stageMat, 0, st.height / 2, st.z));
    group.add(box(3.2, 1.1, 0.9, boothMat, 0, sc.booth.y + 0.55, sc.booth.z));
    const deck = box(2.6, 0.06, 0.6, new THREE.MeshStandardNodeMaterial({ color: 0x08080a, roughness: 0.3, emissive: 0x112244 }), 0, sc.booth.y + 1.13, sc.booth.z - 0.05);
    group.add(deck);
  }

  // ---- trusses for every group of hanging fixtures
  const groups = new Map<string, THREE.Vector3[]>();
  for (const f of rig.fixtures) {
    if (f.mount !== 'hang' || sc.custom) continue; // own locations place their trusses themselves
    const arr = groups.get(f.group) ?? [];
    arr.push(new THREE.Vector3(...f.pos));
    groups.set(f.group, arr);
  }
  for (const pts of groups.values()) {
    const min = pts.reduce((a, p) => a.min(p), pts[0].clone());
    const max = pts.reduce((a, p) => a.max(p), pts[0].clone());
    const alongX = max.x - min.x >= max.z - min.z;
    const len = (alongX ? max.x - min.x : max.z - min.z) + 1.2;
    const t = boxTruss(len, trussMat);
    t.position.set((min.x + max.x) / 2, min.y + 0.18, (min.z + max.z) / 2);
    if (!alongX) t.rotation.y = Math.PI / 2;
    group.add(t);
  }

  // ---- crowd: instanced capsules that bob to 128 BPM
  const c = sc.crowd;
  const areas = sc.crowdAreas ?? [];
  const total = sc.custom ? areas.reduce((n, a) => n + a.count, 0) : c.count;
  const crowd = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.21, 1.05, 4, 10), crowdMat, Math.max(1, total));
  crowd.frustumCulled = false;
  const people: { x: number; z: number; h: number; ph: number }[] = [];
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const stageFront = st.z + st.depth / 2 + 1.2;
  for (const a of areas) {
    const cos = Math.cos((a.rot * Math.PI) / 180);
    const sin = Math.sin((a.rot * Math.PI) / 180);
    for (let i = 0; i < a.count; i++) {
      const lx = (rnd() - 0.5) * a.w;
      const lz = (rnd() - 0.5) * a.d;
      people.push({ x: a.x + lx * cos + lz * sin, z: a.z - lx * sin + lz * cos, h: 0.85 + rnd() * 0.25, ph: rnd() * 6.28 });
    }
  }
  let guard = 0;
  while (!sc.custom && people.length < c.count && guard++ < c.count * 20) {
    const x = c.xMin + rnd() * (c.xMax - c.xMin);
    // Denser towards the stage.
    const z = c.zMin + Math.pow(rnd(), 1.4) * (c.zMax - c.zMin);
    if (Math.abs(x) < st.width / 2 + 0.6 && z < stageFront) continue;
    if (!sc.room && Math.abs(x) < 3.5 && z > 20 && z < 26) continue; // FOH
    people.push({ x, z, h: 0.85 + rnd() * 0.25, ph: rnd() * 6.28 });
  }
  crowd.count = people.length;
  crowd.userData.vrCrowd = people; // VDM draws the crowd itself (same people, same bobbing)
  group.add(crowd);
  const o = new THREE.Object3D();

  return {
    group,
    outdoor: !sc.room,
    update(t: number) {
      for (let i = 0; i < people.length; i++) {
        const p = people[i];
        const bob = Math.max(0, Math.sin(t * 2 * Math.PI * (128 / 60) + p.ph)) * 0.06;
        o.position.set(p.x, 0.735 * p.h + bob, p.z);
        o.scale.set(1, p.h, 1);
        o.updateMatrix();
        crowd.setMatrixAt(i, o.matrix);
      }
      crowd.instanceMatrix.needsUpdate = true;
    },
    setDay(day: boolean, scene: THREE.Scene, renderer: THREE.WebGPURenderer) {
      if (!sky || !sun || !hemi) {
        scene.background = new THREE.Color(0x020203);
        renderer.toneMappingExposure = 1.1;
        return { haze: 1, bloomThreshold: 0.75 };
      }
      if (day) {
        const elev = (38 * Math.PI) / 180;
        const az = (200 * Math.PI) / 180;
        sky.sunPosition.value.setFromSphericalCoords(1, Math.PI / 2 - elev, az);
        sun.position.copy(sky.sunPosition.value).multiplyScalar(100);
        sky.visible = true;
        scene.background = null;
        sun.intensity = 2.6;
        hemi.intensity = 1.1;
        renderer.toneMappingExposure = 0.5;
        // Beams are hardly visible in daylight; only really bright things glow.
        return { haze: 0.12, bloomThreshold: 4 };
      }
      sky.visible = false;
      scene.background = new THREE.Color(0x03050b);
      sun.intensity = 0;
      hemi.intensity = 0.05;
      renderer.toneMappingExposure = 1.1;
      return { haze: 1, bloomThreshold: 0.75 };
    },
    dispose() {
      group.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
    },
  };
}
