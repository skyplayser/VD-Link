// All lamps of a rig, rendered with instancing.
//
// Every lamp is described by a resolved model (see shared/fixture-model.ts): body kind
// (moving head, tilt bar, PAR, bar, blinder …), head kind and its LED cells. The 3D
// shapes are built from a few shared parts – box and cylinder bodies in two materials,
// a main lens, round and square LED cells. Each part type is ONE InstancedMesh for the
// whole rig ("standard parts that always look the same are shared"), so 300 lamps of
// 40 types still cost about 8 draw calls plus 1 for all beams.
//
// Per lamp a tiny math-only hierarchy computes the transforms:
// root → yoke (pan) → head (tilt) → parts / lens / cells. Local +Y of the head is
// the optical axis; positive tilt swings the beam towards local +Z.

import * as THREE from 'three/webgpu';
import type { Look } from '../shared/dmx-codec.ts';
import type { FixtureDef } from '../shared/fixture-types.ts';
import type { Rig } from '../shared/demo-rig.ts';
import { beamRange, type BeamStyle } from '../shared/beam-style.ts';
import { resolveModel, type ResolvedModel } from '../shared/fixture-model.ts';
import { goboArtForSlot } from '../shared/gobo-library.ts';
import { InstancedBeams } from './beam.ts';
import type { BeamLightBuffer } from './lighting.ts';

const DEG = Math.PI / 180;
const PRISM_OFFSET = 7 * DEG;
const MAX_PAN_SPEED = 360; // °/s – real heads need time to move
const MAX_TILT_SPEED = 300;
const TUNGSTEN: [number, number, number] = [1, 0.74, 0.46];

/** Shared unit geometries (scaled per instance). */
const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 28),
  disc: new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2),
  square: new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2),
  // Ball heads, ball effects (diameter 1).
  sphere: new THREE.SphereGeometry(0.5, 24, 16),
  // Derby / moonflower lens dome: upper half ball, +Y (diameter 1).
  dome: new THREE.SphereGeometry(0.5, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2),
};
type GeoKey = keyof typeof GEO;
type MatKey = 'body' | 'front' | 'glow' | 'mirror';

interface Part {
  node: THREE.Object3D;
  geo: GeoKey;
  mat: MatKey;
}

interface Cell {
  node: THREE.Object3D;
  idx: number;
  /** Cell sits on a sub-head / rotor or is turned on its own → beam direction from the cell node. */
  own: boolean;
}

/** A small moving head of a multi-head lamp (bar head, spider bar, arm, gigbar pod). */
interface Sub {
  yoke: THREE.Object3D;
  head: THREE.Object3D;
  /** Tilt direction (spider bars tilt against each other). */
  sign: number;
  /** Fixed tilt offset in degrees. */
  base: number;
  /** Fixed fan-out (radians) around the sub yoke's Y and Z axis. */
  fanY: number;
  fanZ: number;
}

class Lamp {
  root = new THREE.Object3D();
  yoke = new THREE.Object3D();
  head = new THREE.Object3D();
  lens = new THREE.Object3D();
  pivots = [new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D()];
  parts: Part[] = [];
  cells: Cell[] = [];
  subs: Sub[] = [];
  /** Scanner mirror (oriented every frame between lamp and beam). */
  mirror: THREE.Object3D | null = null;
  /** Derby rotor (turns while the lamp is lit). */
  rotor: THREE.Object3D | null = null;
  spin = 0;
  /** Fixed tilt offset in degrees (follow spot on a stand aims forward). */
  baseTilt = 0;
  pan = 0;
  tilt = 0;
  first = true;
  strobePhase = Math.random();

  constructor(
    pos: [number, number, number],
    readonly hang: boolean,
    yawDeg: number,
    readonly m: ResolvedModel,
  ) {
    this.root.position.set(...pos);
    // Euler XYZ: the flip (Z) is applied first, then the yaw around world Y.
    if (hang) this.root.rotation.z = Math.PI;
    this.root.rotation.y = (yawDeg * Math.PI) / 180;
    this.root.add(this.yoke);
    this.yoke.add(this.head);
    buildBody(this);
    this.head.add(this.lens);
    for (const p of this.pivots) {
      p.position.copy(this.lens.position);
      this.head.add(p);
    }
  }

  part(parent: THREE.Object3D, geo: GeoKey, mat: MatKey, pos: [number, number, number], scale: [number, number, number], rot?: [number, number, number]) {
    const node = new THREE.Object3D();
    node.position.set(...pos);
    node.scale.set(...scale);
    if (rot) node.rotation.set(...rot);
    parent.add(node);
    this.parts.push({ node, geo, mat });
    return node;
  }

  /** LED cell / lens `idx` of the model at `pos` inside `parent` (cells must be added in model order). */
  cell(parent: THREE.Object3D, idx: number, pos: [number, number, number], r = this.m.cells[idx].r, own = false) {
    const node = new THREE.Object3D();
    node.position.set(...pos);
    node.scale.setScalar(r);
    parent.add(node);
    this.cells.push({ node, idx, own });
    return node;
  }

  sub(parent: THREE.Object3D, pos: [number, number, number], sign = 1, base = 0, fanY = 0, fanZ = 0) {
    const yoke = new THREE.Object3D();
    const head = new THREE.Object3D();
    yoke.position.set(...pos);
    parent.add(yoke);
    yoke.add(head);
    this.subs.push({ yoke, head, sign, base, fanY, fanZ });
    return head;
  }
}

const ROUND_BODY = new Set(['movinghead', 'par', 'cob', 'fresnel', 'profile', 'retro', 'ufo', 'derby', 'arms', 'follow']);
const UP = new THREE.Vector3(0, 1, 0);

/** Builds the parts and cells of one lamp from its model. */
function buildBody(l: Lamp) {
  const m = l.m;
  let faceY: number;
  switch (m.body) {
    case 'movinghead':
    case 'tiltbar':
      faceY = buildMoving(l);
      break;
    case 'scanner':
      return buildScanner(l);
    case 'multibar':
    case 'gigbar':
      return buildBarHeads(l);
    case 'spider':
      return buildSpider(l);
    case 'arms':
      return buildArms(l);
    case 'derby':
      return buildDerby(l);
    case 'follow':
      faceY = buildFollow(l);
      break;
    default:
      faceY = buildStatic(l);
  }
  l.lens.position.y = faceY + 0.003;
  // Cells on the front face: face x → local X, face y → local Z.
  m.cells.forEach((c, idx) => l.cell(l.head, idx, [c.x, faceY + 0.004, -c.y]));
}

/** Moving head / tilt bar: base, yoke bridge and two arms; the head sits between the arms. */
function buildMoving(l: Lamp): number {
  const m = l.m;
  const [W, H, D] = m.size;
  const bar = m.body === 'tiltbar';
  const orb = m.head === 'orb';
  const faceH = bar ? H : W;
  const baseW = bar ? W * 0.85 : Math.max(0.3, W * 1.2);
  l.part(l.root, 'box', 'body', [0, 0.06, 0], [baseW, 0.12, Math.max(0.24, bar ? 0.24 : W * 0.95)]);
  l.yoke.position.y = 0.12;
  const armX = W / 2 + 0.035;
  const armH = Math.max(D, faceH) * 0.55 + 0.1;
  l.part(l.yoke, 'box', 'body', [0, 0.025, 0], [armX * 2 + 0.05, 0.05, 0.11]);
  for (const s of [-1, 1]) l.part(l.yoke, 'box', 'body', [s * armX, armH / 2, 0], [0.045, armH, 0.11]);
  l.head.position.y = armH - 0.03;
  if (bar) l.part(l.head, 'box', 'body', [0, 0, 0], [W, D, H]);
  else if (m.head === 'matrix') l.part(l.head, 'box', 'body', [0, 0, 0], [W, D, W]);
  else if (orb) l.part(l.head, 'sphere', 'body', [0, 0, 0], [W, W, W]);
  else {
    const len = m.head === 'wash' || m.head === 'beeeye' ? D * 0.85 : D;
    l.part(l.head, 'cyl', 'body', [0, 0, 0], [W, len, W]);
    // Spots and beams: slimmer rear section.
    if (m.head === 'spot' || m.head === 'beam' || m.head === 'profile') l.part(l.head, 'cyl', 'body', [0, -len * 0.55, 0], [W * 0.8, len * 0.3, W * 0.8]);
  }
  const faceY = orb ? W * 0.4 : (m.head === 'wash' || m.head === 'beeeye') && !bar ? (D * 0.85) / 2 : D / 2;
  if (orb) l.part(l.head, 'cyl', 'front', [0, faceY - 0.004, 0], [W * 0.6, 0.012, W * 0.6]);
  else l.part(l.head, !bar && m.head !== 'matrix' ? 'cyl' : 'box', 'front', [0, faceY - 0.004, 0], bar ? [W * 0.98, 0.01, H * 0.94] : [W * 0.94, 0.01, W * 0.94]);
  return faceY;
}

/** Static lamps: small clamp, body hangs/stands right below it. Theatre lamps get a U-bracket. */
function buildStatic(l: Lamp): number {
  const m = l.m;
  const [W, H, D] = m.size;
  const round = ROUND_BODY.has(m.body);
  l.part(l.root, 'box', 'body', [0, 0.03, 0], [0.08, 0.06, 0.08]);
  l.yoke.position.y = 0.06;
  l.head.position.y = D / 2 + 0.02;
  if (round) {
    l.part(l.head, 'cyl', 'body', [0, 0, 0], [W, D, W]);
    if (m.body === 'profile') l.part(l.head, 'cyl', 'body', [0, D * 0.35, 0], [W * 0.75, D * 0.5, W * 0.75]);
  } else l.part(l.head, 'box', 'body', [0, 0, 0], [W, D, H]);
  const faceY = m.body === 'profile' ? D * 0.6 : D / 2;
  if (m.body !== 'laser' && m.body !== 'effect')
    l.part(l.head, round ? 'cyl' : 'box', 'front', [0, faceY - 0.004, 0], round ? [W * 0.92, 0.01, W * 0.92] : [W * 0.97, 0.01, H * 0.9]);
  if (m.body === 'fresnel' || m.body === 'profile' || m.body === 'panel') bracket(l, W, D / 2 + 0.01);
  if (m.body === 'profile')
    // Shutter blade handles at the gate.
    for (const [x, z] of [[1, 0], [-1, 0], [0, 1], [0, -1]])
      l.part(l.head, 'box', 'body', [x * (W / 2 + 0.02), D * 0.08, z * (W / 2 + 0.02)], [x ? 0.05 : 0.025, 0.014, z ? 0.05 : 0.025]);
  if (m.doors) doors(l, W, round ? W : H, faceY);
  return faceY;
}

/** U-bracket from the clamp down to the side of the body (reach = clamp → body centre). */
function bracket(l: Lamp, W: number, reach: number) {
  l.part(l.root, 'box', 'body', [0, 0.07, 0], [W + 0.08, 0.022, 0.05]);
  for (const s of [-1, 1]) l.part(l.root, 'box', 'body', [s * (W / 2 + 0.03), 0.07 + reach / 2, 0], [0.02, reach, 0.05]);
}

/** Four barn doors, opened 40° around the front. */
function doors(l: Lamp, W: number, H: number, faceY: number) {
  const a = 40 * DEG;
  const L = Math.min(W, H) * 0.5;
  const c = Math.cos(a) * (L / 2);
  const sn = Math.sin(a) * (L / 2);
  for (const s of [-1, 1]) {
    l.part(l.head, 'box', 'body', [s * (W / 2 + sn), faceY + c, 0], [0.005, L, H * 0.95], [0, 0, -s * a]);
    l.part(l.head, 'box', 'body', [0, faceY + c, s * (H / 2 + sn)], [W * 0.95, L, 0.005], [s * a, 0, 0]);
  }
}

/** Tripod with a centre post; returns the height of the post top. */
function tripod(l: Lamp, h: number) {
  const legL = 0.8;
  const a = 30 * DEG;
  const top = Math.cos(a) * legL;
  l.part(l.root, 'cyl', 'body', [0, h / 2, 0], [0.045, h, 0.045]);
  for (let k = 0; k < 3; k++) {
    const p = (k * Math.PI * 2) / 3 + Math.PI / 6;
    const out = Math.sin(a) * legL;
    const leg = l.part(l.root, 'cyl', 'body', [(Math.cos(p) * out) / 2, top / 2, (Math.sin(p) * out) / 2], [0.03, legL, 0.03]);
    leg.quaternion.setFromUnitVectors(UP, new THREE.Vector3(-Math.cos(p) * out, top, -Math.sin(p) * out).normalize());
  }
  return h;
}

/**
 * Mirror scanner / moving mirror: the lamp housing lies along local −Z, the mirror sits
 * in front of it (z > 0). yoke (pan, around Z) → head (tilt, around X) give the beam
 * direction; the mirror plate is turned every frame to sit between lamp and beam.
 */
function buildScanner(l: Lamp) {
  const m = l.m;
  const [W, H, D] = m.size;
  const yc = 0.06 + H / 2;
  const mz = Math.max(0.08, W * 0.5);
  l.part(l.root, 'box', 'body', [0, 0.03, -D / 2], [0.08, 0.06, 0.08]);
  l.part(l.root, 'box', 'body', [0, yc, -D / 2], [W, H, D]);
  l.part(l.root, 'cyl', 'front', [0, yc, 0.004], [W * 0.5, 0.01, W * 0.5], [Math.PI / 2, 0, 0]);
  for (const s of [-1, 1]) l.part(l.root, 'box', 'body', [s * (W / 2 - 0.008), yc, mz / 2 + 0.01], [0.016, H * 0.9, mz + 0.02]);
  l.yoke.position.set(0, yc, mz / 2 + 0.01);
  l.mirror = l.part(l.root, 'box', 'mirror', [0, yc, mz / 2 + 0.01], [W * 0.78, 0.006, Math.min(mz, H) * 1.1]);
  l.mirror.quaternion.setFromUnitVectors(UP, new THREE.Vector3(0, 1, -1).normalize());
  m.cells.forEach((c, idx) => l.cell(l.head, idx, [c.x * 0.3, 0.012, -c.y * 0.3], Math.min(c.r, 0.01)));
}

/**
 * Multibar (Chorus Line, Tornado, MagicBlade …) and gigbar (several lamps on a T-bar):
 * a static bar with `heads` small heads in a row. Cells go to the head above them.
 */
function buildBarHeads(l: Lamp) {
  const m = l.m;
  const [W, H, D] = m.size;
  const n = Math.max(1, m.heads);
  const gig = m.body === 'gigbar';
  const stand = gig && !l.hang;
  let y = 0.06;
  if (stand) y = tripod(l, 1.6);
  else for (const s of [-1, 1]) l.part(l.root, 'box', 'body', [s * W * 0.3, 0.03, 0], [0.08, 0.06, 0.08]);
  const barT = gig ? 0.05 : Math.max(0.06, D * 0.35);
  l.part(l.root, 'box', 'body', [0, y + barT / 2, 0], [W, barT, gig ? 0.05 : H]);
  l.yoke.position.y = y + barT;
  const pitch = W / n;
  const hd = gig ? Math.min(pitch * 0.7, H * 1.6, 0.22) : Math.min(pitch * 0.84, H * 1.3, 0.24);
  const hl = gig ? hd * 0.85 : Math.max(D, hd) * 0.9;
  const pivot = Math.max(hl, hd) / 2 + 0.012;
  const pan = m.pan;
  const subX: number[] = [];
  for (let k = 0; k < n; k++) {
    const x = -W / 2 + pitch * (k + 0.5);
    subX.push(x);
    const f = n > 1 ? (k - (n - 1) / 2) / ((n - 1) / 2) : 0;
    const head = gig ? l.sub(l.head, [x, pivot, 0], 1, stand ? 70 : 0, stand ? -f * 22 * DEG : 0, stand ? 0 : -f * 18 * DEG) : l.sub(l.head, [x, pivot, 0]);
    const yoke = head.parent!;
    // Side plates of the little fork (+ bridge when the heads pan).
    for (const s of [-1, 1]) l.part(yoke, 'box', 'body', [s * (hd / 2 + 0.008), -pivot / 2, 0], [0.012, pivot, Math.min(0.05, hd * 0.6)]);
    if (pan) l.part(yoke, 'box', 'body', [0, -pivot + 0.006, 0], [hd + 0.03, 0.012, Math.min(0.05, hd * 0.6)]);
    const pod = gig && k > 0 && k < n - 1; // inner pods of a gigbar: derby domes
    if (gig && !pod) l.part(head, 'box', 'body', [0, 0, 0], [hd, hl, hd]);
    else l.part(head, 'cyl', 'body', [0, 0, 0], [hd, hl, hd]);
    if (pod) l.part(head, 'dome', 'front', [0, hl / 2, 0], [hd * 0.9, hd * 0.6, hd * 0.9]);
    else l.part(head, gig ? 'box' : 'cyl', 'front', [0, hl / 2 - 0.004, 0], [hd * 0.9, 0.01, hd * 0.9]);
  }
  l.lens.position.y = pivot + hl / 2;
  const subs = l.subs;
  m.cells.forEach((c, idx) => {
    const k = Math.max(0, Math.min(n - 1, Math.floor((c.x + W / 2) / pitch)));
    const lim = hd * 0.38;
    const face = gig && k > 0 && k < n - 1 ? hl / 2 + hd * 0.3 : hl / 2 + 0.002;
    l.cell(subs[k].head, idx, [Math.max(-lim, Math.min(lim, c.x - subX[k])), face, Math.max(-lim, Math.min(lim, -c.y))], Math.min(c.r, hd * 0.4), true);
  });
}

/** Spider: moving-head base and yoke (pan) holding `heads` LED bars that tilt against each other. */
function buildSpider(l: Lamp) {
  const m = l.m;
  const [W, H, D] = m.size;
  const n = Math.max(1, m.heads);
  l.part(l.root, 'box', 'body', [0, 0.06, 0], [Math.max(0.24, W * 0.9), 0.12, 0.22]);
  l.yoke.position.y = 0.12;
  const armX = W / 2 + 0.03;
  const armH = H * 0.6 + 0.1;
  l.part(l.yoke, 'box', 'body', [0, 0.025, 0], [armX * 2 + 0.05, 0.05, 0.1]);
  for (const s of [-1, 1]) l.part(l.yoke, 'box', 'body', [s * armX, armH / 2, 0], [0.04, armH, 0.1]);
  l.head.position.y = armH - 0.03;
  const rowH = H / n;
  const rowY: number[] = [];
  for (let k = 0; k < n; k++) {
    const fy = H / 2 - rowH * (k + 0.5);
    rowY.push(fy);
    const head = l.sub(l.head, [0, 0, -fy], k % 2 ? -1 : 1);
    l.part(head, 'box', 'body', [0, 0, 0], [W, D, rowH * 0.8]);
    l.part(head, 'box', 'front', [0, D / 2 - 0.004, 0], [W * 0.97, 0.01, rowH * 0.7]);
  }
  // Rod through all bars (tilt axis).
  l.part(l.head, 'cyl', 'body', [0, 0, 0], [0.02, W + 0.06, 0.02], [0, 0, Math.PI / 2]);
  l.lens.position.y = D / 2;
  m.cells.forEach((c, idx) => {
    const k = Math.max(0, Math.min(n - 1, Math.floor((H / 2 - c.y) / rowH)));
    l.cell(l.subs[k].head, idx, [c.x, D / 2 + 0.002, -(c.y - rowY[k])], Math.min(c.r, rowH * 0.35), true);
  });
}

/** Multi-arm effect: hub (pans) with `heads` radial arms, a small tilting head at each arm end. */
function buildArms(l: Lamp) {
  const m = l.m;
  const [W, , Dh] = m.size;
  const n = Math.max(1, m.heads);
  l.part(l.root, 'box', 'body', [0, 0.03, 0], [0.08, 0.06, 0.08]);
  l.yoke.position.y = 0.06;
  const hub = Math.max(0.12, W * 0.3);
  l.part(l.yoke, 'cyl', 'body', [0, Dh / 2, 0], [hub, Dh, hub]);
  l.head.position.y = Dh;
  l.part(l.head, 'cyl', 'front', [0, -0.004, 0], [hub * 0.85, 0.01, hub * 0.85]);
  const hd = Math.min(0.09, ((Math.PI * W) / n) * 0.45);
  const hl = hd * 1.3;
  const R = W / 2 - hd / 2;
  const armY = -Dh * 0.45;
  for (let k = 0; k < n; k++) {
    const arm = new THREE.Object3D();
    arm.rotation.y = (k / n) * Math.PI * 2;
    l.head.add(arm);
    l.part(arm, 'box', 'body', [(hub / 2 + R) / 2, armY, 0], [R - hub / 2, 0.025, 0.035]);
    const head = l.sub(arm, [R, armY, 0], 1, 20);
    l.part(arm, 'box', 'body', [R, armY, 0], [0.035, 0.035, 0.05]);
    l.part(head, 'cyl', 'body', [0, hl * 0.35, 0], [hd, hl, hd]);
    l.part(head, 'cyl', 'front', [0, hl * 0.85 - 0.004, 0], [hd * 0.85, 0.01, hd * 0.85]);
  }
  l.lens.position.y = 0;
  // Cells: centre cells stay on the hub, the others go to the nearest arm.
  const per = new Array(n).fill(0);
  const armOf = m.cells.map((c) => (Math.hypot(c.x, c.y) < W * 0.12 ? -1 : (Math.round(Math.atan2(c.y, c.x) / ((Math.PI * 2) / n)) + n) % n));
  armOf.forEach((k) => k >= 0 && per[k]++);
  const seen = new Array(n).fill(0);
  m.cells.forEach((c, idx) => {
    const k = armOf[idx];
    if (k < 0) return l.cell(l.head, idx, [c.x, 0.002, -c.y], Math.min(c.r, hub * 0.2));
    const j = seen[k]++;
    const off = per[k] > 1 ? hd * 0.25 : 0;
    const a = (j / per[k]) * Math.PI * 2;
    l.cell(l.subs[k].head, idx, [Math.cos(a) * off, hl * 0.85 + 0.002, Math.sin(a) * off], Math.min(c.r, per[k] > 1 ? hd * 0.18 : hd * 0.38), true);
  });
}

/**
 * Derby / moonflower: box with a lens dome; ball effects ('orb'): a full ball.
 * The cells sit on the dome, each lens turned outwards, on a rotor that spins while lit.
 */
function buildDerby(l: Lamp) {
  const m = l.m;
  const [W, , Dh] = m.size;
  const orb = m.head === 'orb';
  const R = W / 2;
  l.part(l.root, 'box', 'body', [0, 0.03, 0], [0.08, 0.06, 0.08]);
  l.yoke.position.y = 0.06;
  if (orb) {
    l.part(l.yoke, 'cyl', 'body', [0, 0.03, 0], [0.05, 0.06, 0.05]);
    l.head.position.y = 0.06 + R;
    l.part(l.head, 'sphere', 'front', [0, 0, 0], [W, W, W]);
  } else {
    l.part(l.yoke, 'box', 'body', [0, Dh / 2, 0], [W * 1.2, Dh, W * 1.2]);
    l.head.position.y = Dh;
    l.part(l.head, 'dome', 'front', [0, 0, 0], [W, W * 0.8, W]);
  }
  l.rotor = new THREE.Object3D();
  l.head.add(l.rotor);
  l.lens.position.y = orb ? R : R * 0.4;
  const maxA = (orb ? 115 : 62) * DEG;
  const lim = R * 0.86;
  const nrm = new THREE.Vector3();
  m.cells.forEach((c, idx) => {
    const rho = Math.min(1, Math.hypot(c.x, c.y) / lim);
    const th = rho * maxA;
    const ph = Math.atan2(c.y, c.x);
    nrm.set(Math.sin(th) * Math.cos(ph), Math.cos(th), -Math.sin(th) * Math.sin(ph));
    const k = orb ? 1 : 0.8;
    const node = l.cell(l.rotor!, idx, [nrm.x * R * 1.005, nrm.y * R * k * 1.005, nrm.z * R * 1.005], Math.min(c.r, R * 0.14), true);
    node.quaternion.setFromUnitVectors(UP, nrm);
  });
}

/** Follow spot: long barrel; standing on a tripod and aimed forward, or hanging in a bracket. */
function buildFollow(l: Lamp): number {
  const [W, , D] = l.m.size;
  if (!l.hang) {
    const top = tripod(l, 1.25);
    l.yoke.position.y = top;
    l.part(l.yoke, 'box', 'body', [0, 0.015, 0], [W + 0.1, 0.03, 0.06]);
    for (const s of [-1, 1]) l.part(l.yoke, 'box', 'body', [s * (W / 2 + 0.035), W * 0.3 + 0.03, 0], [0.025, W * 0.6, 0.06]);
    l.head.position.y = W * 0.55 + 0.03;
    l.baseTilt = 82; // beam towards local +Z, slightly down
  } else {
    l.part(l.root, 'box', 'body', [0, 0.03, 0], [0.08, 0.06, 0.08]);
    l.yoke.position.y = 0.06;
    l.head.position.y = D * 0.5 + 0.02;
    bracket(l, W, D * 0.5 + 0.01);
  }
  l.part(l.head, 'cyl', 'body', [0, -D * 0.1, 0], [W, D * 0.8, W]);
  l.part(l.head, 'cyl', 'body', [0, D * 0.38, 0], [W * 0.72, D * 0.25, W * 0.72]);
  l.part(l.head, 'box', 'body', [0, -D * 0.45, W * 0.5 + 0.04], [0.03, 0.03, 0.1]); // operator handle
  const faceY = D * 0.5;
  l.part(l.head, 'cyl', 'front', [0, faceY - 0.004, 0], [W * 0.66, 0.01, W * 0.66]);
  return faceY;
}

const v = new THREE.Vector3();
const dir = new THREE.Vector3();
const right = new THREE.Vector3();
const apex = new THREE.Vector3();
const q = new THREE.Quaternion();
const sc = new THREE.Vector3();
const color = new THREE.Color();
const Y = new THREE.Vector3(0, 1, 0);
const X = new THREE.Vector3(1, 0, 0);
const BLACK = new THREE.Color(0, 0, 0);
const upV = new THREE.Vector3();
const dk = new THREE.Vector3();
const mtx = new THREE.Matrix4();
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
const cq = new THREE.Quaternion();
const cdir = new THREE.Vector3();
const cright = new THREE.Vector3();
const avg = new THREE.Vector3();
const yq = new THREE.Quaternion();
const nrm = new THREE.Vector3();
const IN = new THREE.Vector3(0, 0, 1); // scanner: light runs from the lamp to the mirror

/** Default pan / tilt range (degrees) of the new shapes when the fixture does not say. */
const PAN_DEF: Partial<Record<ResolvedModel['body'], number>> = { scanner: 170, multibar: 180, spider: 540, arms: 360, gigbar: 540 };
const TILT_DEF: Partial<Record<ResolvedModel['body'], number>> = { scanner: 110, multibar: 180, spider: 180, arms: 90, gigbar: 180 };
/** Bodies whose cell beams spread in many directions (one wide surface light). */
const SPREAD = new Set(['derby', 'arms', 'gigbar', 'multibar', 'spider']);

/** Applies pan / tilt (degrees in l.pan / l.tilt) to the lamp's moving parts. */
function pose(l: Lamp, dt: number, lit: boolean) {
  const m = l.m;
  const pan = l.pan * DEG;
  const tilt = l.tilt * DEG;
  switch (m.body) {
    case 'scanner': {
      // Beam swings left/right (pan) and front/back (tilt); the mirror halves the angle.
      l.yoke.rotation.set(0, 0, pan);
      l.head.rotation.x = tilt;
      if (l.mirror) {
        yq.multiplyQuaternions(l.yoke.quaternion, l.head.quaternion);
        nrm.copy(UP).applyQuaternion(yq).sub(IN).normalize();
        l.mirror.quaternion.setFromUnitVectors(UP, nrm);
      }
      return;
    }
    case 'multibar':
    case 'gigbar':
      for (const s of l.subs) {
        s.yoke.rotation.set(0, pan + s.fanY, s.fanZ);
        s.head.rotation.x = (s.base + l.tilt) * DEG;
      }
      return;
    case 'spider':
      l.yoke.rotation.y = pan;
      for (const s of l.subs) s.head.rotation.x = s.sign * tilt;
      return;
    case 'arms':
      // Hub turns with pan, the arm heads swing outwards with tilt.
      l.yoke.rotation.y = pan;
      for (const s of l.subs) s.head.rotation.z = -(s.base + l.tilt) * DEG;
      return;
    case 'derby':
      // No rotation channel in the model: the rotor turns while the lamp is lit.
      if (lit) l.spin = (l.spin + dt * 0.9) % (Math.PI * 2);
      if (l.rotor) l.rotor.rotation.y = l.spin;
      return;
    default:
      l.yoke.rotation.y = pan;
      l.head.rotation.x = (l.tilt + l.baseTilt) * DEG;
  }
}

interface Style {
  style: BeamStyle;
  range: [number, number];
  soft: number;
  inner: number;
}

export class RigRenderer {
  readonly group = new THREE.Group();
  readonly beams: InstancedBeams;
  private lamps: Lamp[];
  private styles: Style[];
  /** One InstancedMesh per (geometry, material) – shared by all lamps. */
  private meshes = new Map<string, { mesh: THREE.InstancedMesh; nodes: THREE.Object3D[] }>();
  private lensMesh: THREE.InstancedMesh;
  private cellCol: Float32Array[];
  private cellMeshes: Record<'disc' | 'square', { mesh: THREE.InstancedMesh; refs: { lamp: number; cell: number }[] }>;

  constructor(
    private rig: Rig,
    _def?: FixtureDef,
  ) {
    this.lamps = rig.fixtures.map((f) => new Lamp(f.pos, f.mount === 'hang', f.yaw, resolveModel(f.def, f.modeIndex)));
    this.styles = rig.fixtures.map((f, i) => {
      const style = this.lamps[i].m.style;
      return {
        style,
        range: beamRange(f.def, style),
        soft: style === 'wash' ? 1 : style === 'beam' ? 0 : 0.35,
        inner: style === 'wash' ? 0.25 : style === 'beam' ? 0.93 : 0.82,
      };
    });

    const mats: Record<MatKey, THREE.Material> = {
      body: new THREE.MeshStandardNodeMaterial({ color: 0x2c2e35, roughness: 0.5, metalness: 0.2 }),
      front: new THREE.MeshStandardNodeMaterial({ color: 0x07070a, roughness: 0.15, metalness: 0.1 }),
      glow: new THREE.MeshBasicNodeMaterial({ color: 0xffffff }),
      mirror: new THREE.MeshStandardNodeMaterial({ color: 0xb8c0cc, roughness: 0.18, metalness: 0.55 }),
    };
    // Group all parts by (geometry, material) → one InstancedMesh each.
    for (const l of this.lamps)
      for (const p of l.parts) {
        const key = `${p.geo}|${p.mat}`;
        let e = this.meshes.get(key);
        if (!e) this.meshes.set(key, (e = { mesh: null as unknown as THREE.InstancedMesh, nodes: [] }));
        e.nodes.push(p.node);
      }
    for (const [key, e] of this.meshes) {
      const [geo, mat] = key.split('|') as [GeoKey, MatKey];
      e.mesh = this.mk(GEO[geo], mats[mat], e.nodes.length);
    }
    this.lensMesh = this.mk(GEO.disc, new THREE.MeshBasicNodeMaterial({ color: 0xffffff }), this.lamps.length);
    this.lensMesh.setColorAt(0, BLACK);
    const refs = { disc: [] as { lamp: number; cell: number }[], square: [] as { lamp: number; cell: number }[] };
    this.lamps.forEach((l, li) => l.m.cells.forEach((c, ci) => refs[c.shape].push({ lamp: li, cell: ci })));
    this.cellMeshes = {
      disc: { mesh: this.mk(GEO.disc, new THREE.MeshBasicNodeMaterial({ color: 0xffffff }), Math.max(1, refs.disc.length)), refs: refs.disc },
      square: { mesh: this.mk(GEO.square, new THREE.MeshBasicNodeMaterial({ color: 0xffffff }), Math.max(1, refs.square.length)), refs: refs.square },
    };
    for (const k of ['disc', 'square'] as const) {
      this.cellMeshes[k].mesh.count = refs[k].length;
      if (refs[k].length) this.cellMeshes[k].mesh.setColorAt(0, BLACK);
    }
    this.cellCol = this.lamps.map((l) => new Float32Array(l.m.cells.length * 3));
    const beamCells = this.lamps.reduce((n, l) => n + l.m.cells.filter((c) => c.beam).length, 0);
    this.beams = new InstancedBeams(this.lamps.length * 7 + beamCells);
    this.group.add(this.beams.mesh);
  }

  private mk(g: THREE.BufferGeometry, m: THREE.Material, n: number) {
    const im = new THREE.InstancedMesh(g, m, Math.max(1, n));
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    im.frustumCulled = false;
    this.group.add(im);
    return im;
  }

  update(looks: Look[], dt: number, t: number, lights: BeamLightBuffer) {
    const step = (cur: number, target: number, speed: number) => cur + Math.max(-speed * dt, Math.min(speed * dt, target - cur));
    this.beams.begin();
    const cellCol = this.cellCol;

    for (let i = 0; i < this.lamps.length; i++) {
      const l = this.lamps[i];
      const m = l.m;
      const look = looks[i];
      const f = this.rig.fixtures[i];
      const st = this.styles[i];
      const phys = f.def.physical;

      // ---- movement
      const classic = m.body === 'movinghead' || m.body === 'tiltbar';
      const panRange = classic ? (phys.panDeg ?? 540) : phys.panDeg || (PAN_DEF[m.body] ?? 540);
      const tiltRange = classic ? (phys.tiltDeg ?? (m.body === 'tiltbar' ? 180 : 270)) : phys.tiltDeg || (TILT_DEF[m.body] ?? 270);
      const targetPan = m.pan ? (look.pan - 0.5) * panRange : 0;
      const targetTilt = m.tilt ? (look.tilt - 0.5) * tiltRange : 0;
      if (l.first) {
        l.pan = targetPan;
        l.tilt = targetTilt;
        l.first = false;
      } else {
        l.pan = step(l.pan, targetPan, MAX_PAN_SPEED);
        l.tilt = step(l.tilt, targetTilt, MAX_TILT_SPEED);
      }
      pose(l, dt, look.open && look.dimmer > 0.002);

      // ---- intensity and colours
      let intensity = look.open ? look.dimmer : 0;
      if (look.strobeHz > 0) intensity *= (t * look.strobeHz + l.strobePhase) % 1 < 0.22 ? 1 : 0;
      const tint = m.tungsten ? TUNGSTEN : null;
      let r = look.r,
        g = look.g,
        b = look.b;
      if (tint) {
        const lv = Math.max(r, g, b);
        r = lv * tint[0];
        g = lv * tint[1];
        b = lv * tint[2];
      }
      // Cell colours (before master intensity).
      const cc = cellCol[i];
      const hasWhite = !!(f.cm.slots.white || f.cm.slots.amber);
      let ar = 0,
        ag = 0,
        ab = 0,
        an = 0;
      m.cells.forEach((c, k) => {
        let cr: number, cg: number, cb: number;
        const own = look.cells && k * 3 < look.cells.length && !Number.isNaN(look.cells[k * 3]);
        if (own) {
          cr = look.cells![k * 3];
          cg = look.cells![k * 3 + 1];
          cb = look.cells![k * 3 + 2];
          if (c.mix === 'mono') cr = cg = cb = Math.max(cr, cg, cb);
        } else if (c.mix === 'mono') {
          const lv = hasWhite ? (look.w ?? 0) : Math.max(r, g, b);
          cr = cg = cb = lv;
        } else {
          cr = r;
          cg = g;
          cb = b;
        }
        cr *= c.tint[0];
        cg *= c.tint[1];
        cb *= c.tint[2];
        cc[k * 3] = cr;
        cc[k * 3 + 1] = cg;
        cc[k * 3 + 2] = cb;
        if (own || !m.mainBeam) {
          ar += cr;
          ag += cg;
          ab += cb;
          an++;
        }
      });
      // Lamps whose light comes from the cells (bars, blinders …): main beam = average.
      const centerLens =
        m.body === 'movinghead' || m.body === 'fresnel' || m.body === 'profile' || m.body === 'laser' || m.body === 'effect' || m.body === 'scanner' || m.body === 'follow' || !m.cells.length;
      if (!centerLens && an) {
        r = ar / an;
        g = ag / an;
        b = ab / an;
      }
      const R = r * intensity,
        G = g * intensity,
        B = b * intensity;

      // ---- beams
      const wash = st.style === 'wash';
      const zoom = wash ? 0.45 + 0.55 * look.zoom : look.zoom;
      const [bMin, bMax] = st.range;
      let halfAngle = ((bMin + (bMax - bMin) * zoom) / 2) * DEG;
      if (m.body === 'laser') halfAngle = 0.25 * DEG;
      const prism = look.prism && !wash && (m.body === 'movinghead' || m.body === 'scanner');
      const fan = m.body === 'laser' ? 7 : 0;
      const cones = fan || (prism ? 3 : 1);
      const per = fan ? 0.5 : prism ? 0.4 : 1;
      const lit = intensity > 0.002;
      for (let k = 0; k < Math.min(cones, 3); k++) l.pivots[k].rotation.set(0, 0, 0);
      l.root.updateMatrixWorld(true);

      if (lit && m.mainBeam) {
        const tanHalf = Math.tan(halfAngle);
        const gobo = look.gobo > 0 && !wash ? look.goboArt || goboArtForSlot(look.gobo) : 0;
        l.lens.matrixWorld.decompose(v, q, sc);
        dir.copy(Y).applyQuaternion(q).normalize();
        right.copy(X).applyQuaternion(q).normalize();
        const up = upV.crossVectors(dir, right);
        for (let k = 0; k < cones; k++) {
          const d = dk.copy(dir);
          if (fan) {
            const a = (k / (cones - 1) - 0.5) * 50 * DEG + Math.sin(t * 0.9) * 20 * DEG;
            d.addScaledVector(right, Math.tan(a)).addScaledVector(up, Math.sin(t * 1.7 + k) * 0.15).normalize();
          } else if (prism) {
            const a = (k / 3) * Math.PI * 2 + t * 0.9;
            d.addScaledVector(right, Math.cos(a) * Math.tan(PRISM_OFFSET)).addScaledVector(up, Math.sin(a) * Math.tan(PRISM_OFFSET)).normalize();
          }
          const lensR = Math.min(m.lens, 0.12);
          this.beams.push(v, d, right, tanHalf, R * per, G * per, B * per, fan ? 0 : st.soft, fan ? 0.01 : lensR);
          // Surface light: apex behind the lens so the projected cone matches the volume.
          apex.copy(d).multiplyScalar(-lensR / Math.max(tanHalf, 0.01)).add(v);
          if (!fan || k % 3 === 0) lights.push(apex, d, right, halfAngle, R * per, G * per, B * per, gobo, st.inner);
        }
      }

      // Per-cell beams (bee-eye lenses, warm-white lenses of a matrix bar, blinder cells …).
      if (lit && !m.mainBeam) {
        l.head.matrixWorld.decompose(v, q, sc);
        dir.copy(Y).applyQuaternion(q).normalize();
        right.copy(X).applyQuaternion(q).normalize();
        let sr = 0,
          sg = 0,
          sb = 0,
          maxDeg = 0;
        avg.set(0, 0, 0);
        for (const cell of l.cells) {
          const c = m.cells[cell.idx];
          if (!c.beam) continue;
          const cr = cc[cell.idx * 3] * intensity;
          const cg = cc[cell.idx * 3 + 1] * intensity;
          const cb = cc[cell.idx * 3 + 2] * intensity;
          if (cr + cg + cb < 0.004) continue;
          let d = dir,
            rt = right;
          if (cell.own) {
            // Cell on a sub-head / rotor: own direction (scale is uniform, so decompose is safe).
            cell.node.matrixWorld.decompose(v, cq, sc);
            d = cdir.copy(Y).applyQuaternion(cq).normalize();
            rt = cright.copy(X).applyQuaternion(cq).normalize();
          } else cell.node.getWorldPosition(v);
          this.beams.push(v, d, rt, Math.tan((c.deg / 2) * DEG), cr, cg, cb, c.deg > 20 ? 1 : 0.1, Math.max(0.006, c.r * 0.9));
          sr += cr;
          sg += cg;
          sb += cb;
          avg.addScaledVector(d, cr + cg + cb);
          maxDeg = Math.max(maxDeg, c.deg);
        }
        // One combined surface light for the whole lamp.
        if (sr + sg + sb > 0.01) {
          l.lens.getWorldPosition(v);
          let ha = Math.max(maxDeg, 8) * 0.5 * DEG;
          let d = dir;
          if (SPREAD.has(m.body)) {
            // Beams fan out: light along the mean direction, as wide as the fan.
            const sum = sr + sg + sb;
            const len = avg.length();
            if (len > 1e-4) d = avg.multiplyScalar(1 / len);
            ha = Math.min(80 * DEG, ha + Math.acos(Math.min(1, len / sum)) * 1.2);
            right.crossVectors(d, Math.abs(d.y) < 0.95 ? Y : X).normalize();
          }
          const k = 1 / Math.max(1, Math.sqrt(m.cells.length));
          apex.copy(d).multiplyScalar(-0.1 / Math.tan(ha)).add(v);
          lights.push(apex, d, right, ha, sr * k, sg * k, sb * k, 0, maxDeg > 20 ? 0.3 : 0.85);
        }
      }

      // Main lens colour.
      this.lensMesh.setMatrixAt(i, m.mainBeam && centerLens ? mtx.makeScale(m.lens, 1, m.lens).premultiply(l.lens.matrixWorld) : ZERO);
      this.lensMesh.setColorAt(i, color.setRGB(R * 6, G * 6, B * 6));
    }

    // ---- parts and cells
    for (const e of this.meshes.values()) {
      e.nodes.forEach((n, k) => e.mesh.setMatrixAt(k, n.matrixWorld));
      e.mesh.instanceMatrix.needsUpdate = true;
    }
    for (const kind of ['disc', 'square'] as const) {
      const { mesh, refs } = this.cellMeshes[kind];
      refs.forEach((ref, k) => {
        const l = this.lamps[ref.lamp];
        const look = looks[ref.lamp];
        let intensity = look.open ? look.dimmer : 0;
        if (look.strobeHz > 0) intensity *= (t * look.strobeHz + l.strobePhase) % 1 < 0.22 ? 1 : 0;
        const cc = cellCol[ref.lamp];
        mesh.setMatrixAt(k, l.cells[ref.cell].node.matrixWorld);
        // Dark cells stay visible as dark LEDs; lit cells glow.
        const e = 5 * intensity;
        mesh.setColorAt(k, color.setRGB(0.02 + cc[ref.cell * 3] * e, 0.02 + cc[ref.cell * 3 + 1] * e, 0.025 + cc[ref.cell * 3 + 2] * e));
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    this.lensMesh.instanceMatrix.needsUpdate = true;
    if (this.lensMesh.instanceColor) this.lensMesh.instanceColor.needsUpdate = true;
    this.beams.end();
  }
}

// ------------------------------------------------------------ static model (builder)

let staticMats: Record<MatKey | 'lens', THREE.Material> | null = null;
const cellMats = new Map<string, THREE.Material>();

/**
 * The lamp's 3D model as plain meshes (no instancing, no light) – for the location
 * builder, where every object is a pickable, movable mesh. Same parts as in the venue
 * view, LED cells glow softly in their emitter colour. Origin = mounting point.
 */
export function fixtureModelObject(def: FixtureDef, modeIndex = 0, hang = true): THREE.Group {
  staticMats ??= {
    body: new THREE.MeshStandardNodeMaterial({ color: 0x2c2e35, roughness: 0.5, metalness: 0.2 }),
    front: new THREE.MeshStandardNodeMaterial({ color: 0x07070a, roughness: 0.15, metalness: 0.1 }),
    glow: new THREE.MeshBasicNodeMaterial({ color: 0xffffff }),
    mirror: new THREE.MeshStandardNodeMaterial({ color: 0xb8c0cc, roughness: 0.18, metalness: 0.55 }),
    lens: new THREE.MeshBasicNodeMaterial({ color: 0x9fb6d6 }),
  };
  const m = resolveModel(def, modeIndex);
  const l = new Lamp([0, 0, 0], hang, 0, m);
  pose(l, 0, false);
  for (const p of l.parts) p.node.add(new THREE.Mesh(GEO[p.geo], staticMats[p.mat]));
  if (m.mainBeam && !m.cells.length) {
    const lens = new THREE.Mesh(GEO.disc, staticMats.lens);
    lens.scale.set(m.lens, 1, m.lens);
    l.lens.add(lens);
  }
  const g = new THREE.Group();
  g.add(l.root);
  g.updateMatrixWorld(true);
  // LED cells: one InstancedMesh per shape and colour (a retro light has hundreds).
  const groups = new Map<string, Cell[]>();
  for (const c of l.cells) {
    const cell = m.cells[c.idx];
    const key = `${cell.shape}|${cell.tint.join(',')}`;
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(c);
  }
  for (const [key, list] of groups) {
    const cell = m.cells[list[0].idx];
    let mat = cellMats.get(key);
    if (!mat) cellMats.set(key, (mat = new THREE.MeshBasicNodeMaterial({ color: new THREE.Color(cell.tint[0] * 0.75, cell.tint[1] * 0.75, cell.tint[2] * 0.8) })));
    const im = new THREE.InstancedMesh(cell.shape === 'square' ? GEO.square : GEO.disc, mat, list.length);
    list.forEach((c, i) => im.setMatrixAt(i, c.node.matrixWorld));
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere();
    g.add(im);
  }
  return g;
}
