// Demo club interior after reference images (kept locally, not in the repository):
// dark and classy – black marble bar with mint neon and lit bottle shelf, glasses and
// pendant bulbs, quilted dark walls, petrol velvet lounge on a riser with violet/pink LED
// edges, glowing aquarium wall, lamella divider, ventilation duct and downlights.
// Everything is procedural (own shaders/geometry, no third-party assets).

import * as THREE from 'three/webgpu';
import {
  abs,
  dot,
  float,
  fract,
  length,
  min,
  mix,
  mx_fractal_noise_float,
  normalView,
  normalize,
  positionLocal,
  positionView,
  positionWorld,
  sin,
  smoothstep,
  time,
  uv,
  vec2,
  vec3,
} from 'three/tsl';
import type { BeamLightBuffer } from './lighting.ts';

type V3 = [number, number, number];

// ------------------------------------------------------------------ materials

/** Black marble with thin white veins. */
export function marbleNode(scale = 1) {
  const p = positionWorld.mul(vec3(0.55 * scale, 1.1 * scale, 0.55 * scale));
  const n1 = mx_fractal_noise_float(p, 3, 2, 0.5);
  const n2 = mx_fractal_noise_float(p.mul(2.7).add(vec3(3.1, 0.7, 1.3)), 2, 2, 0.5);
  const v1 = float(1).sub(smoothstep(0.0, 0.03, abs(n1)));
  const v2 = float(1).sub(smoothstep(0.0, 0.018, abs(n2))).mul(0.5);
  return mix(vec3(0.018, 0.018, 0.02), vec3(0.62, 0.62, 0.64), v1.add(v2).clamp(0, 1).mul(0.85));
}

/** Fake velvet sheen: brighter at grazing angles. */
export function sheen(color: THREE.Color, k = 0.35) {
  const f = float(1).sub(abs(dot(normalize(normalView), normalize(positionView.negate())))).pow(2);
  return vec3(color.r, color.g, color.b).mul(f.mul(k));
}

export function glow(color: THREE.ColorRepresentation, intensity: number) {
  const m = new THREE.MeshBasicNodeMaterial();
  const c = new THREE.Color(color);
  m.colorNode = vec3(c.r, c.g, c.b).mul(intensity);
  return m;
}

// --------------------------------------------------------------- small makers

function box(w: number, h: number, d: number, mat: THREE.Material, p: V3) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(...p);
  return m;
}

/** Neon script on a transparent canvas, additive. */
function neonSign(text: string, color: string, width: number) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d')!;
  g.font = 'italic 600 120px "Snell Roundhand", "Segoe Script", "Brush Script MT", cursive';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.strokeStyle = color;
  g.lineWidth = 7;
  g.shadowColor = color;
  g.shadowBlur = 24;
  g.strokeText(text, 512, 120);
  g.fillStyle = '#ffffff';
  g.shadowBlur = 8;
  g.fillText(text, 512, 120);
  g.beginPath();
  g.moveTo(170, 200);
  g.lineTo(880, 192);
  g.lineWidth = 6;
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.MeshBasicNodeMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 4), m);
  m.color.setScalar(3.2);
  return mesh;
}

/** Turquoise aquarium with caustics and drifting jellyfish. */
export function aquariumMaterial() {
  const m = new THREE.MeshBasicNodeMaterial();
  const st = uv();
  const caust = mx_fractal_noise_float(vec3(st.mul(vec2(7, 3)), time.mul(0.25)), 3, 2, 0.55);
  const rays = sin(st.x.mul(40).add(caust.mul(6))).mul(0.5).add(0.5).pow(6).mul(st.y).mul(0.35);
  let col = vec3(0.0, 0.42, 0.55).mul(float(0.75).add(caust.mul(0.5))).add(vec3(0.3, 0.9, 1).mul(rays));
  // Jellyfish: soft violet-pink blobs drifting upwards.
  for (let i = 0; i < 9; i++) {
    const sx = (i * 0.37 + 0.11) % 1;
    const sp = 0.012 + (i % 3) * 0.006;
    const y = fract(time.mul(sp).add(i * 0.23));
    const x = float(sx).add(sin(time.mul(0.3).add(i)).mul(0.03));
    const d = length(st.sub(vec2(x, y)).mul(vec2(3.2, 1.2)));
    const blob = smoothstep(0.05, 0.0, d);
    col = col.add(vec3(0.85, 0.3, 1.0).mul(blob.mul(1.4)));
  }
  // Darker bottom, brighter top.
  m.colorNode = col.mul(float(0.45).add(st.y.mul(0.7))).mul(1.05);
  return m;
}

// ------------------------------------------------------------------- the club

export function buildClubDecor(lights: BeamLightBuffer) {
  const g = new THREE.Group();

  // Shared materials
  const marble = lights.surface({ color: 0x050506, roughness: 0.22, metalness: 0.1, receive: 0.45, colorNode: marbleNode() });
  const blackTop = lights.surface({ color: 0x08080a, roughness: 0.18, metalness: 0.2, receive: 0.4 });
  const velvetColor = new THREE.Color(0x0f5d70);
  const velvet = lights.surface({ color: velvetColor, roughness: 0.95, receive: 0.45, emissive: sheen(velvetColor, 0.5) });
  const violetVelvet = new THREE.Color(0x3a1e46);
  const velvet2 = lights.surface({ color: violetVelvet, roughness: 0.95, receive: 0.45, emissive: sheen(violetVelvet, 0.45) });
  const darkMetal = lights.surface({ color: 0x1b1c20, roughness: 0.45, metalness: 0.6, receive: 0.35 });
  const riser = lights.surface({ color: 0x141418, roughness: 0.6, receive: 0.5 });
  const warmLed = glow(0xffd9a8, 3.2);
  const violetLed = glow(0xb23cff, 4);
  const pinkLed = glow(0xff3cc8, 4);

  // =========================================================== BAR (left wall)
  const barX = -8.2; // counter front
  const z0 = -2.6;
  const z1 = 4.4;
  const len = z1 - z0;
  const zc = (z0 + z1) / 2;
  // Counter body with rounded ends
  g.add(box(0.75, 1.08, len, marble, [barX - 0.38, 0.54, zc]));
  for (const z of [z0, z1]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.375, 0.375, 1.08, 24, 1, false, z === z0 ? Math.PI : 0, Math.PI), marble);
    cap.position.set(barX - 0.38, 0.54, z);
    g.add(cap);
  }
  // Top
  const top = box(0.95, 0.06, len + 0.8, blackTop, [barX - 0.38, 1.11, zc]);
  g.add(top);
  // Warm LED under the counter edge + glow on the floor
  g.add(box(0.02, 0.03, len, warmLed, [barX + 0.02, 0.06, zc]));
  const floorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, len + 0.6),
    (() => {
      const m = new THREE.MeshBasicNodeMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const st = uv();
      m.colorNode = vec3(1, 0.78, 0.5).mul(smoothstep(1, 0, st.x).pow(2).mul(0.35));
      return m;
    })(),
  );
  floorGlow.rotation.x = -Math.PI / 2;
  floorGlow.position.set(barX + 0.6, 0.01, zc);
  g.add(floorGlow);

  // Back bar: lit shelf with bottles
  const shelfX = -11.7;
  const backPanel = box(0.05, 1.5, len - 0.6, glow(0x6fcfb8, 0.42), [shelfX - 0.2, 1.75, zc]);
  // Warm LED strips under the shelves light the bottles from below.
  g.add(box(0.04, 0.015, len - 0.5, warmLed, [shelfX + 0.18, 1.025, zc]), box(0.04, 0.015, len - 0.5, warmLed, [shelfX + 0.18, 1.595, zc]));
  g.add(backPanel);
  g.add(box(0.45, 0.04, len - 0.4, darkMetal, [shelfX, 1.05, zc]), box(0.45, 0.04, len - 0.4, darkMetal, [shelfX, 1.62, zc]));
  g.add(box(0.5, 1.0, len - 0.2, darkMetal, [shelfX, 0.5, zc]));
  const bottleGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.3, 10).translate(0, 0.15, 0);
  const bottleMat = new THREE.MeshStandardNodeMaterial({ roughness: 0.15, metalness: 0.1, emissive: 0x111111 });
  const nBottles = 90;
  const bottles = new THREE.InstancedMesh(bottleGeo, bottleMat, nBottles);
  const palette = [0x2a7a2a, 0x7a1515, 0xd8d8d8, 0x111111, 0xc8862a, 0x1f3f7a, 0x6a6a6a, 0xa02060];
  const o = new THREE.Object3D();
  const col = new THREE.Color();
  for (let i = 0; i < nBottles; i++) {
    const row = i % 2;
    const k = Math.floor(i / 2);
    o.position.set(shelfX + 0.05 - (k % 2) * 0.12, row ? 1.64 : 1.07, z0 + 0.4 + (k / (nBottles / 2)) * (len - 0.8));
    o.scale.set(1, 0.8 + ((i * 37) % 10) / 20, 1);
    o.updateMatrix();
    bottles.setMatrixAt(i, o.matrix);
    bottles.setColorAt(i, col.set(palette[(i * 7) % palette.length]));
  }
  g.add(bottles);
  // Mint neon sign
  const sign = neonSign('Feel the Light', '#7dffd8', 4.4);
  sign.position.set(-11.88, 3.0, zc);
  sign.rotation.y = Math.PI / 2;
  g.add(sign);
  // Marble soffit above the bar with warm LED underside
  g.add(box(3.4, 0.9, len + 0.6, marble, [-10.2, 3.75, zc]));
  // Only the soffit edges glow (indirect light), not the whole underside.
  g.add(box(0.04, 0.02, len + 0.4, warmLed, [-8.58, 3.29, zc]), box(0.04, 0.02, len + 0.4, warmLed, [-11.8, 3.29, zc]));
  // Hanging glasses along the soffit edge
  const glassGeo = new THREE.ConeGeometry(0.045, 0.16, 10, 1, true).rotateX(Math.PI);
  const glassMat = new THREE.MeshStandardNodeMaterial({ color: 0xe8eef2, roughness: 0.1, metalness: 0.2, emissive: 0x333a40, side: THREE.DoubleSide });
  const nGlass = 44;
  const glasses = new THREE.InstancedMesh(glassGeo, glassMat, nGlass);
  for (let i = 0; i < nGlass; i++) {
    o.position.set(-8.75 - (i % 2) * 0.12, 3.18, z0 + 0.2 + (Math.floor(i / 2) / (nGlass / 2)) * (len - 0.4));
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    glasses.setMatrixAt(i, o.matrix);
  }
  g.add(glasses);
  // Pendant bulb cluster in front of the bar
  const nBulbs = 28;
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 12, 8), glow(0xfff1d6, 5), nBulbs);
  const wires = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.004, 0.004, 1, 4).translate(0, 0.5, 0), darkMetal, nBulbs);
  let seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < nBulbs; i++) {
    const x = -7.2 + rnd() * 0.9;
    const z = z0 + 0.3 + rnd() * (len - 0.6);
    const y = 2.5 + rnd() * 0.9;
    o.position.set(x, y, z);
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    bulbs.setMatrixAt(i, o.matrix);
    o.scale.set(1, 7.5 - y, 1);
    o.updateMatrix();
    wires.setMatrixAt(i, o.matrix);
  }
  g.add(bulbs, wires);
  const barLight = new THREE.PointLight(0xffd2a0, 22, 10, 2);
  barLight.position.set(-9.5, 2.6, zc);
  g.add(barLight);
  // Soft warm light on the marble front of the counter.
  const counterLight = new THREE.PointLight(0xffe0b8, 7, 5, 2);
  counterLight.position.set(-6.4, 0.9, zc);
  g.add(counterLight);
  // Small violet booth next to the bar (like in the bar reference)
  const booth = box(0.8, 1.0, 2.2, velvet2, [-11.5, 0.5, -5.2]);
  const boothSeat = box(1.2, 0.45, 2.2, velvet2, [-10.9, 0.225, -5.2]);
  g.add(booth, boothSeat);

  // ======================================================= LOUNGE (right wall)
  const lx0 = 7.4;
  const lx1 = 12;
  const lz0 = -3.4;
  const lz1 = 6.2;
  const rH = 0.35;
  g.add(box(lx1 - lx0, rH, lz1 - lz0, riser, [(lx0 + lx1) / 2, rH / 2, (lz0 + lz1) / 2]));
  // LED edges: pink on the step, violet in the gap under it
  g.add(box(0.02, 0.025, lz1 - lz0, pinkLed, [lx0 - 0.01, rH - 0.02, (lz0 + lz1) / 2]));
  g.add(box(0.03, 0.02, lz1 - lz0, violetLed, [lx0 - 0.02, 0.02, (lz0 + lz1) / 2]));
  // Glass railing with violet top edge
  const glass = new THREE.MeshStandardNodeMaterial({ color: 0x9ab, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.12 });
  g.add(box(0.03, 0.9, lz1 - lz0 - 2.2, glass, [lx0 + 0.15, rH + 0.45, (lz0 + lz1) / 2 + 1.1]));
  g.add(box(0.03, 0.02, lz1 - lz0 - 2.2, violetLed, [lx0 + 0.15, rH + 0.9, (lz0 + lz1) / 2 + 1.1]));
  // Aquarium wall
  const aq = new THREE.Mesh(new THREE.PlaneGeometry(lz1 - lz0 - 1.6, 2.4), aquariumMaterial());
  aq.position.set(11.93, rH + 1.0 + 1.2, (lz0 + lz1) / 2);
  aq.rotation.y = -Math.PI / 2;
  g.add(aq);
  g.add(box(0.2, 0.12, lz1 - lz0 - 1.4, darkMetal, [11.9, rH + 1.0 - 0.06, (lz0 + lz1) / 2]));
  g.add(box(0.2, 0.12, lz1 - lz0 - 1.4, darkMetal, [11.9, rH + 3.4 + 0.06, (lz0 + lz1) / 2]));
  const aqLight = new THREE.PointLight(0x30d8e8, 10, 9, 2);
  aqLight.position.set(10.6, 2.4, (lz0 + lz1) / 2);
  g.add(aqLight);
  // Two half-round velvet booths with tables
  for (const zc2 of [-0.6, 3.6]) {
    const back = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 1.05, 32, 1, true, Math.PI, Math.PI), velvet);
    back.material.side = THREE.DoubleSide;
    back.position.set(10.4, rH + 0.52, zc2);
    back.rotation.y = -Math.PI / 2;
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.42, 32, 1, false, Math.PI, Math.PI), velvet);
    seat.position.set(10.4, rH + 0.21, zc2);
    seat.rotation.y = -Math.PI / 2;
    const cut = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.44, 32, 1, false, Math.PI, Math.PI), riser);
    cut.position.set(10.38, rH + 0.22, zc2);
    cut.rotation.y = -Math.PI / 2;
    const table = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.04, 28), blackTop);
    table.position.set(9.9, rH + 0.62, zc2);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.2, 0.6, 12), darkMetal);
    leg.position.set(9.9, rH + 0.3, zc2);
    const tableGlow = new THREE.Mesh(new THREE.CircleGeometry(0.38, 28).rotateX(-Math.PI / 2), glow(0x9b3cff, 1.4));
    tableGlow.position.set(9.9, rH + 0.645, zc2);
    g.add(back, seat, cut, table, leg, tableGlow);
  }
  const lounge = new THREE.PointLight(0xa040ff, 6, 7, 2);
  lounge.position.set(8.4, 0.8, 1.4);
  g.add(lounge);
  // Lamella divider between dance floor and lounge
  const lam = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 3.4, 0.11), darkMetal, 7);
  for (let i = 0; i < 7; i++) {
    o.position.set(7.1, 1.7, lz1 - 0.25 - i * 0.5);
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    lam.setMatrixAt(i, o.matrix);
  }
  g.add(lam);

  // ===================================================== DJ riser LED edge
  g.add(box(7, 0.025, 0.02, pinkLed, [0, 0.43, -4.69]));
  g.add(box(7, 0.02, 0.03, violetLed, [0, 0.02, -4.66]));

  // ============================================================== ceiling
  // Ventilation duct with ribs (stripes on the surface)
  const ductMat = new THREE.MeshStandardNodeMaterial({ color: 0x2a2b30, roughness: 0.4, metalness: 0.7 });
  ductMat.colorNode = vec3(0.16, 0.165, 0.18).mul(float(0.7).add(smoothstep(0.75, 0.85, fract(positionLocal.y.mul(4))).mul(0.6)));
  const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 15, 24, 1, true), ductMat);
  duct.rotation.x = Math.PI / 2;
  duct.position.set(-6.4, 6.95, 0);
  g.add(duct);
  // Recessed downlights
  const spots: V3[] = [];
  for (const x of [-9.5, -5.5, 5.5, 9.5]) for (const z of [-5.5, -2, 1.5, 5]) spots.push([x, 7.48, z]);
  const dl = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 16), glow(0xffffff, 3), spots.length);
  spots.forEach((p, i) => {
    o.position.set(...p);
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    dl.setMatrixAt(i, o.matrix);
  });
  g.add(dl);

  return g;
}
