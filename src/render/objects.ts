// Geometry for location objects – shared by the Location Builder (plain materials)
// and the 3D view (materials that also receive beams and gobos).
// Convention: an object's origin is its bottom centre; size = full width/height/depth.

import * as THREE from 'three/webgpu';
import { float, fract, positionLocal, smoothstep, vec3 } from 'three/tsl';
import type { LocObject, MatPreset } from '../shared/location.ts';
import { aquariumMaterial, glow, marbleNode, sheen } from './club-decor.ts';
import type { BeamLightBuffer } from './lighting.ts';

export const MAT_PRESETS: { id: MatPreset; color: number; label: [string, string] }[] = [
  { id: 'black', color: 0x0c0c0e, label: ['Schwarz matt', 'Matt black'] },
  { id: 'darkgrey', color: 0x2a2b30, label: ['Dunkelgrau', 'Dark grey'] },
  { id: 'grey', color: 0x6a6c72, label: ['Grau', 'Grey'] },
  { id: 'white', color: 0xd8d8d4, label: ['Weiß', 'White'] },
  { id: 'marble', color: 0x050506, label: ['Marmor schwarz', 'Black marble'] },
  { id: 'velvet-petrol', color: 0x0f5d70, label: ['Samt petrol', 'Velvet petrol'] },
  { id: 'velvet-violet', color: 0x3a1e46, label: ['Samt violett', 'Velvet violet'] },
  { id: 'metal', color: 0xb9bcc4, label: ['Metall', 'Metal'] },
  { id: 'wood', color: 0x5a3b24, label: ['Holz', 'Wood'] },
  { id: 'glass', color: 0x99aabb, label: ['Glas', 'Glass'] },
  { id: 'concrete', color: 0x55565a, label: ['Beton', 'Concrete'] },
  { id: 'grass', color: 0x2b3a22, label: ['Rasen', 'Grass'] },
  { id: 'led', color: 0xb23cff, label: ['LED (leuchtet)', 'LED (glows)'] },
];

export type MaterialMaker = (preset: MatPreset, color?: string) => THREE.Material;

/** Materials for the 3D view: everything receives beams and gobos. */
export function litMaterials(lights: BeamLightBuffer): MaterialMaker {
  const cache = new Map<string, THREE.Material>();
  return (preset, color) => {
    const key = `${preset}|${color ?? ''}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const def = MAT_PRESETS.find((m) => m.id === preset) ?? MAT_PRESETS[0];
    const c = new THREE.Color(color ?? def.color);
    let m: THREE.Material;
    switch (preset) {
      case 'led':
        m = glow(c, 4);
        break;
      case 'glass':
        m = new THREE.MeshStandardNodeMaterial({ color: c, roughness: 0.05, transparent: true, opacity: 0.15 });
        break;
      case 'marble':
        m = lights.surface({ color: c, roughness: 0.22, metalness: 0.1, receive: 0.45, colorNode: marbleNode() });
        break;
      case 'velvet-petrol':
      case 'velvet-violet':
        m = lights.surface({ color: c, roughness: 0.95, receive: 0.45, emissive: sheen(c, 0.5) });
        break;
      case 'metal':
        m = lights.surface({ color: c, roughness: 0.35, metalness: 0.85, receive: 0.35 });
        break;
      default:
        m = lights.surface({ color: c, roughness: preset === 'black' ? 0.6 : 0.8, receive: 0.5 });
    }
    cache.set(key, m);
    return m;
  };
}

/** Materials for the builder: plain, evenly lit, no beams. */
export function plainMaterials(): MaterialMaker {
  const cache = new Map<string, THREE.Material>();
  return (preset, color) => {
    const key = `${preset}|${color ?? ''}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const def = MAT_PRESETS.find((m) => m.id === preset) ?? MAT_PRESETS[0];
    const c = new THREE.Color(color ?? def.color);
    let m: THREE.Material;
    if (preset === 'led') m = glow(c, 2);
    else if (preset === 'glass') m = new THREE.MeshStandardNodeMaterial({ color: c, roughness: 0.05, transparent: true, opacity: 0.25 });
    else {
      const sm = new THREE.MeshStandardNodeMaterial({ color: c, roughness: 0.7, metalness: preset === 'metal' ? 0.7 : 0 });
      if (preset === 'marble') sm.colorNode = marbleNode();
      m = sm;
    }
    cache.set(key, m);
    return m;
  };
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, y = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.y = y;
  return m;
}

function trussGeometryGroup(len: number, h: number, mat: THREE.Material) {
  const g = new THREE.Group();
  const s = Math.max(0.2, Math.min(h, 0.6));
  const chord = new THREE.CylinderGeometry(0.024, 0.024, len, 8).rotateZ(Math.PI / 2);
  for (const [y, z] of [
    [s, s / 2],
    [s, -s / 2],
    [0, s / 2],
    [0, -s / 2],
  ]) {
    const c = new THREE.Mesh(chord, mat);
    c.position.set(0, y, z);
    g.add(c);
  }
  const steps = Math.max(1, Math.floor(len / 0.5));
  const lace = new THREE.CylinderGeometry(0.01, 0.01, s * 1.41, 6);
  const im = new THREE.InstancedMesh(lace, mat, steps * 2);
  const o = new THREE.Object3D();
  for (let i = 0; i < steps; i++) {
    const x = -len / 2 + (i + 0.5) * 0.5;
    for (const [z, rz] of [
      [s / 2, Math.PI / 4],
      [-s / 2, -Math.PI / 4],
    ]) {
      o.position.set(x, s / 2, z);
      o.rotation.set(0, 0, rz);
      o.updateMatrix();
      im.setMatrixAt(i * 2 + (z > 0 ? 0 : 1), o.matrix);
    }
  }
  g.add(im);
  return g;
}

/**
 * Builds the visual for one object (without position/rotation – the caller sets those).
 * Video walls, crowd and fixtures get simple placeholders here; the 3D view replaces
 * them with live walls, people and lamps.
 */
export function buildObjectMesh(o: LocObject, mat: MaterialMaker): THREE.Object3D {
  const [w, h, d] = o.size;
  const m = mat(o.material, o.color);
  const g = new THREE.Group();
  switch (o.type) {
    case 'box':
    case 'wall':
    case 'stage':
      g.add(mesh(new THREE.BoxGeometry(w, h, d), m, h / 2));
      break;
    case 'stairs': {
      const n = Math.max(1, Math.round(h / 0.18));
      for (let i = 0; i < n; i++) {
        const sh = (h * (i + 1)) / n;
        const sd = d * (1 - i / n);
        const step = mesh(new THREE.BoxGeometry(w, sh, sd), m, sh / 2);
        step.position.z = (d - sd) / 2;
        g.add(step);
      }
      break;
    }
    case 'pillar':
    case 'cylinder': {
      // Depth ≠ width → elliptic column.
      const c = mesh(new THREE.CylinderGeometry(w / 2, w / 2, h, 32), m, h / 2);
      c.scale.z = Math.max(0.01, d) / Math.max(0.01, w);
      g.add(c);
      break;
    }
    case 'arc':
      g.add(mesh(arcGeometry(w / 2, d / 2, o.arc?.angle ?? 180, o.arc?.thickness ?? 0, Math.max(0.01, h)), m));
      break;
    case 'bar': {
      g.add(mesh(new THREE.BoxGeometry(w, h - 0.06, d), m, (h - 0.06) / 2));
      g.add(mesh(new THREE.BoxGeometry(w + 0.1, 0.06, d + 0.25), mat('black'), h - 0.03));
      const led = mesh(new THREE.BoxGeometry(w, 0.025, 0.02), mat('led', '#ffd9a8'), 0.05);
      led.position.z = d / 2 + 0.02;
      g.add(led);
      break;
    }
    case 'djbooth': {
      g.add(mesh(new THREE.BoxGeometry(w, h, d), m, h / 2));
      g.add(mesh(new THREE.BoxGeometry(w * 0.8, 0.05, d * 0.6), mat('black'), h + 0.025));
      const led = mesh(new THREE.BoxGeometry(w, 0.025, 0.02), mat('led', o.color ?? '#ff3cc8'), 0.06);
      led.position.z = d / 2 + 0.01;
      g.add(led);
      break;
    }
    case 'sofa': {
      // Round booth: the back reaches `arc.angle` degrees around (default half round).
      const r = w / 2;
      const A = THREE.MathUtils.degToRad(Math.min(360, Math.max(30, o.arc?.angle ?? 180)));
      const back = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 48, 1, true, Math.PI - A / 2, A), m);
      (back.material as THREE.Material).side = THREE.DoubleSide;
      back.position.y = h / 2;
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.97, r * 0.97, h * 0.42, 48, 1, false, Math.PI - A / 2, A), m);
      seat.position.y = h * 0.21;
      g.add(back, seat);
      break;
    }
    case 'table':
      g.add(mesh(new THREE.CylinderGeometry(w / 2, w / 2, 0.04, 28), m, h - 0.02));
      g.add(mesh(new THREE.CylinderGeometry(0.04, w / 4, h - 0.04, 12), mat('metal'), (h - 0.04) / 2));
      break;
    case 'truss':
      g.add(o.arc ? curvedTruss(w / 2, d / 2, o.arc.angle, h, mat('metal')) : trussGeometryGroup(w, h, mat('metal')));
      break;
    case 'tower': {
      const t = trussGeometryGroup(h, Math.max(w, 0.3), mat('metal'));
      t.rotation.z = Math.PI / 2;
      t.position.set(Math.max(w, 0.3) / 2, h / 2, 0);
      g.add(t);
      break;
    }
    case 'ledstrip':
      g.add(mesh(new THREE.BoxGeometry(w, Math.max(h, 0.02), Math.max(d, 0.02)), mat('led', o.color), Math.max(h, 0.02) / 2));
      break;
    case 'aquarium': {
      const p = mesh(new THREE.PlaneGeometry(w, h), aquariumMaterial(), h / 2);
      g.add(p, mesh(new THREE.BoxGeometry(w + 0.1, 0.1, 0.25), mat('black'), -0.05), mesh(new THREE.BoxGeometry(w + 0.1, 0.1, 0.25), mat('black'), h + 0.05));
      break;
    }
    case 'videowall': {
      const scr = mesh(new THREE.PlaneGeometry(w, h), glow(0x2a4a8a, 0.8), h / 2);
      scr.position.z = 0.07;
      g.add(mesh(new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.12), mat('black'), h / 2), scr);
      break;
    }
    case 'crowd': {
      const area = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2),
        new THREE.MeshBasicNodeMaterial({ color: 0x22c8f0, transparent: true, opacity: 0.18, depthWrite: false }),
      );
      area.position.y = 0.01;
      g.add(area);
      const capsule = new THREE.CapsuleGeometry(0.21, 1.05, 4, 8);
      const n = Math.min(60, Math.round(w * d * (o.density ?? 1.5) * 0.2));
      for (let i = 0; i < n; i++) {
        const p = new THREE.Mesh(capsule, mat('grey'));
        const hx = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const hz = Math.abs(Math.sin(i * 78.233 + 1.7) * 24634.6345) % 1;
        p.position.set((hx - 0.5) * w, 0.73, (hz - 0.5) * d);
        g.add(p);
      }
      break;
    }
    case 'fixture': {
      const hang = o.fixture?.mount !== 'floor';
      const body = new THREE.Group();
      body.add(mesh(new THREE.BoxGeometry(0.34, 0.12, 0.28), mat('darkgrey'), 0.06));
      const head = mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.32, 16), mat('darkgrey'), 0.36);
      body.add(head, mesh(new THREE.CircleGeometry(0.09, 16).rotateX(-Math.PI / 2), glow(0xffffff, 1.5), 0.53));
      if (hang) body.rotation.z = Math.PI;
      g.add(body);
      break;
    }
    case 'scan':
      g.add(mesh(new THREE.BoxGeometry(w, h, d), mat('grey'), h / 2));
      break;
  }
  return g;
}

/** Outline points of an arc / ellipse in the floor plane (x, z), centred on +z. */
function arcOutline(a: number, b: number, A: number, n: number): [number, number][] {
  const full = A >= Math.PI * 2 - 1e-3;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    if (full && i === n) break;
    const phi = full ? -Math.PI + (Math.PI * 2 * i) / n : -A / 2 + (A * i) / n;
    pts.push([a * Math.sin(phi), b * Math.cos(phi)]);
  }
  return pts;
}

/**
 * Solid for round objects: part of an ellipse (radii a × b), `angleDeg` wide, either
 * filled (thickness 0 → pie / D shape) or as a band of the given thickness. Bottom at
 * y = 0, height h.
 */
export function arcGeometry(a: number, b: number, angleDeg: number, thickness: number, h: number): THREE.BufferGeometry {
  const A = THREE.MathUtils.degToRad(Math.min(360, Math.max(1, angleDeg)));
  const full = A >= Math.PI * 2 - 1e-3;
  const solid = !(thickness > 0) || thickness >= Math.min(a, b) - 0.01;
  const n = Math.max(12, Math.ceil((A / (Math.PI * 2)) * 128));
  // Shape lives in x/y; after rotateX(-90°) shape-y becomes -z, so store -z.
  const v = ([x, z]: [number, number]) => new THREE.Vector2(x, -z);
  const outer = arcOutline(a, b, A, n).map(v);
  const inner = solid ? [] : arcOutline(a - thickness, b - thickness, A, n).map(v);
  let shape: THREE.Shape;
  if (full) {
    shape = new THREE.Shape(outer);
    if (!solid) shape.holes.push(new THREE.Path(inner.reverse()));
  } else if (solid) shape = new THREE.Shape([new THREE.Vector2(0, 0), ...outer]);
  else shape = new THREE.Shape([...outer, ...inner.reverse()]);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 1 });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

/** Truss bent along an ellipse (circle, crescent, arc) out of short straight pieces. */
function curvedTruss(a: number, b: number, angleDeg: number, h: number, mat: THREE.Material) {
  const g = new THREE.Group();
  const A = THREE.MathUtils.degToRad(Math.min(360, Math.max(5, angleDeg)));
  const full = A >= Math.PI * 2 - 1e-3;
  const approxLen = A * (a + b) * 0.5;
  const n = Math.max(full ? 12 : 4, Math.ceil(approxLen / 0.9));
  const pts = arcOutline(a, b, A, n);
  if (full) pts.push(pts[0]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, z0] = pts[i];
    const [x1, z1] = pts[i + 1];
    const len = Math.hypot(x1 - x0, z1 - z0);
    const seg = trussGeometryGroup(len + 0.03, h, mat);
    seg.position.set((x0 + x1) / 2, 0, (z0 + z1) / 2);
    seg.rotation.y = Math.atan2(-(z1 - z0), x1 - x0);
    g.add(seg);
  }
  return g;
}

/** Ribbed duct look for cylinders lying on the ceiling (used by club decor and builder). */
export function ductNode() {
  return vec3(0.16, 0.165, 0.18).mul(float(0.7).add(smoothstep(0.75, 0.85, fract(positionLocal.y.mul(4))).mul(0.6)));
}

export function placeObject(obj: THREE.Object3D, o: LocObject) {
  obj.position.set(...o.pos);
  obj.rotation.set((o.rot[0] * Math.PI) / 180, (o.rot[1] * Math.PI) / 180, (o.rot[2] * Math.PI) / 180);
}
