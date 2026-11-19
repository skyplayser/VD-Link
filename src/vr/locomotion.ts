// Moving around in VR: the player is a transform from the headset's play space into the
// club ("world"). Teleport, snap/smooth turn and smooth walking change it; the XR
// reference space is offset accordingly (the standard WebXR way – no scene graph tricks).

import * as THREE from 'three/webgpu';

const UP = new THREE.Vector3(0, 1, 0);

export class Player {
  /** World ← play space. */
  readonly m = new THREE.Matrix4();
  /** Extra eye height for seated use (metres). */
  seatOffset = 0;
  /** Floor height under the player (world y of the play-space floor, without seat offset). */
  floor = 0;
  private dirty = true;

  /** Put the player at a world position (floor point), looking in direction `yaw` (radians). */
  place(x: number, floorY: number, z: number, yaw: number) {
    this.floor = floorY;
    this.m.compose(new THREE.Vector3(x, floorY + this.seatOffset, z), new THREE.Quaternion().setFromAxisAngle(UP, yaw), new THREE.Vector3(1, 1, 1));
    this.dirty = true;
  }

  /** Move so that the head ends up above (x, z) on a floor at height y. */
  teleport(head: THREE.Vector3, x: number, y: number, z: number) {
    const t = new THREE.Vector3();
    t.setFromMatrixPosition(this.m);
    const d = new THREE.Vector3(x - head.x, y + this.seatOffset - t.y, z - head.z);
    this.m.premultiply(new THREE.Matrix4().makeTranslation(d.x, d.y, d.z));
    this.floor = y;
    this.dirty = true;
  }

  /** Rotate around the head (radians, positive = left). */
  turn(head: THREE.Vector3, angle: number) {
    const r = new THREE.Matrix4().makeTranslation(head.x, 0, head.z).multiply(new THREE.Matrix4().makeRotationY(angle)).multiply(new THREE.Matrix4().makeTranslation(-head.x, 0, -head.z));
    this.m.premultiply(r);
    this.dirty = true;
  }

  /** Walk in the world (metres). */
  move(dx: number, dz: number) {
    this.m.premultiply(new THREE.Matrix4().makeTranslation(dx, 0, dz));
    this.dirty = true;
  }

  setSeated(on: boolean) {
    const nv = on ? 0.45 : 0;
    this.m.premultiply(new THREE.Matrix4().makeTranslation(0, nv - this.seatOffset, 0));
    this.seatOffset = nv;
    this.dirty = true;
  }

  /** Offset reference space for the current transform (null = unchanged). */
  space(base: XRReferenceSpace): XRReferenceSpace | null {
    if (!this.dirty) return null;
    this.dirty = false;
    const inv = this.m.clone().invert();
    const p = new THREE.Vector3();
    const q = new THREE.Quaternion();
    inv.decompose(p, q, new THREE.Vector3());
    return base.getOffsetReferenceSpace(new XRRigidTransform({ x: p.x, y: p.y, z: p.z, w: 1 }, { x: q.x, y: q.y, z: q.z, w: q.w }));
  }
}

/**
 * Teleport target: a throwing arc from the controller, landing on any walkable surface
 * (floor, stage, platforms, gallery – roughly horizontal faces).
 */
export class TeleportArc {
  readonly group = new THREE.Group();
  private line: THREE.Line;
  private positions: Float32Array;
  private marker = new THREE.Group();
  private ray = new THREE.Raycaster();
  readonly points = 48;
  target: THREE.Vector3 | null = null;

  constructor() {
    this.positions = new Float32Array(this.points * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.line = new THREE.Line(g, new THREE.LineBasicNodeMaterial({ color: 0x4fe3ff, transparent: true, opacity: 0.9 }));
    this.line.frustumCulled = false;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicNodeMaterial({ color: 0x4fe3ff, transparent: true, opacity: 0.9, depthTest: false }));
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.08, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicNodeMaterial({ color: 0x4fe3ff, transparent: true, opacity: 0.7, depthTest: false }));
    this.marker.add(ring, dot);
    this.group.add(this.line, this.marker);
    this.group.visible = false;
  }

  /** Recompute the arc from a controller pose; returns the landing point or null. */
  update(origin: THREE.Vector3, dir: THREE.Vector3, walk: THREE.Object3D[]): THREE.Vector3 | null {
    this.group.visible = true;
    const v = dir.clone().normalize().multiplyScalar(8);
    const g = -9.81;
    const dt = 0.04;
    let prev = origin.clone();
    let hit: THREE.Vector3 | null = null;
    let n = 0;
    this.positions.set([prev.x, prev.y, prev.z], 0);
    for (let i = 1; i < this.points; i++) {
      const t = i * dt;
      const p = new THREE.Vector3(origin.x + v.x * t, origin.y + v.y * t + 0.5 * g * t * t, origin.z + v.z * t);
      const seg = p.clone().sub(prev);
      const len = seg.length();
      this.ray.set(prev, seg.normalize());
      this.ray.far = len;
      const hits = this.ray.intersectObjects(walk, false);
      const h = hits.find((x) => {
        const nrm = x.face?.normal.clone().transformDirection(x.object.matrixWorld);
        return !!nrm && nrm.y > 0.7;
      });
      if (h || hits.length) {
        // Hit something: walkable surface = target, wall/edge = end of the arc (invalid).
        if (h) hit = h.point.clone();
        this.positions.set([(h ?? hits[0]).point.x, (h ?? hits[0]).point.y, (h ?? hits[0]).point.z], i * 3);
        n = i + 1;
        break;
      }
      this.positions.set([p.x, p.y, p.z], i * 3);
      prev = p;
      n = i + 1;
      if (p.y < -2) break;
    }
    for (let i = n; i < this.points; i++) this.positions.set(this.positions.subarray((n - 1) * 3, n * 3), i * 3);
    this.line.geometry.attributes.position.needsUpdate = true;
    const col = hit ? 0x4fe3ff : 0xff4f6d;
    (this.line.material as THREE.LineBasicNodeMaterial).color.setHex(col);
    this.marker.visible = !!hit;
    if (hit) this.marker.position.copy(hit).add(new THREE.Vector3(0, 0.02, 0));
    this.target = hit;
    return hit;
  }

  hide() {
    this.group.visible = false;
    this.target = null;
  }
}
