// Headsets in the 3D view: where each connected VR headset (VDM app or browser viewer) is and where it looks.
// Pose comes from the headset via the VR server (POST api/pose, ~10×/s). A headset that sends nothing for
// 3 s disappears.

import * as THREE from 'three/webgpu';

export interface HeadsetPose {
  /** Stable per headset (address + id from the app). */
  id: string;
  name: string;
  pos: [number, number, number];
  /** Rotation as quaternion x, y, z, w (the same convention in three.js and Godot). */
  quat: [number, number, number, number];
}

const COLOR = 0xff4f8b;
const TIMEOUT_MS = 3000;
/** View cone: about the field of view of Pico 4 Ultra / Quest 3, 2 m long. */
const FOV_H = THREE.MathUtils.degToRad(100);
const FOV_V = THREE.MathUtils.degToRad(90);
const CONE_LEN = 2;

class Marker {
  readonly group = new THREE.Group();
  /** On the floor below the headset – easy to find in the top view. */
  readonly ring: THREE.Mesh;
  last = 0;
  private target = new THREE.Vector3();
  private targetQ = new THREE.Quaternion();

  constructor(readonly name: string) {
    const mat = new THREE.MeshBasicMaterial({ color: COLOR });
    // Head: visor box with a darker front glass.
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.11, 0.12), new THREE.MeshStandardMaterial({ color: 0xe8e8ee, roughness: 0.4 }));
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.08, 0.01), new THREE.MeshBasicMaterial({ color: 0x15151c }));
    glass.position.z = -0.065;
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 6, 24), mat);
    strap.rotation.x = Math.PI / 2;
    strap.position.z = 0.06;
    // View cone as lines: 4 edges and the far rectangle (looking along -Z, as in three.js and Godot).
    const x = Math.tan(FOV_H / 2) * CONE_LEN;
    const y = Math.tan(FOV_V / 2) * CONE_LEN;
    const z = -CONE_LEN;
    const c = [
      [-x, -y, z],
      [x, -y, z],
      [x, y, z],
      [-x, y, z],
    ];
    const pts: number[] = [];
    for (let i = 0; i < 4; i++) pts.push(0, 0, -0.07, ...c[i], ...c[i], ...c[(i + 1) % 4]);
    const lines = new THREE.BufferGeometry();
    lines.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const cone = new THREE.LineSegments(lines, new THREE.LineBasicMaterial({ color: COLOR, transparent: true, opacity: 0.8, depthTest: false }));
    // Centre line of the view.
    const ray = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -0.07), new THREE.Vector3(0, 0, -CONE_LEN * 1.6)]),
      new THREE.LineBasicMaterial({ color: COLOR, depthTest: false }),
    );
    // Cone and ray stay visible behind the audience and decor.
    cone.renderOrder = ray.renderOrder = 10;
    const head = new THREE.Group();
    head.add(visor, glass, strap, cone, ray);
    head.name = 'head';
    // Name above the head.
    const label = makeLabel(name);
    label.position.y = 0.32;
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 32), new THREE.MeshBasicMaterial({ color: COLOR, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthTest: false }));
    this.ring.rotation.x = -Math.PI / 2;
    this.group.add(head, label, this.ring);
    this.group.renderOrder = 10;
  }

  set(p: HeadsetPose, now: number, snap: boolean) {
    this.target.set(...p.pos);
    this.targetQ.set(...p.quat).normalize();
    if (snap) {
      this.group.position.copy(this.target);
      this.head.quaternion.copy(this.targetQ);
    }
    this.last = now;
  }

  get head() {
    return this.group.getObjectByName('head')!;
  }

  /** Smooth between the ~10 poses per second; ring on the floor below. */
  tick(dt: number, floorY: number) {
    const k = 1 - Math.exp(-dt * 14);
    this.group.position.lerp(this.target, k);
    this.head.quaternion.slerp(this.targetQ, k);
    this.ring.position.y = floorY - this.group.position.y + 0.02;
  }

  dispose() {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | undefined;
      (mat as THREE.SpriteMaterial | undefined)?.map?.dispose();
      mat?.dispose();
    });
  }
}

function makeLabel(text: string): THREE.Sprite {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 96;
  const g = c.getContext('2d')!;
  g.font = '600 52px system-ui, sans-serif';
  const w = Math.min(500, g.measureText(text).width + 44);
  g.fillStyle = 'rgba(16,16,22,0.85)';
  g.beginPath();
  g.roundRect((512 - w) / 2, 8, w, 80, 40);
  g.fill();
  g.fillStyle = '#fff';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 256, 50, 470);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  // Same size on screen at every distance.
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true, sizeAttenuation: false }));
  s.scale.set(0.16, 0.03, 1);
  s.renderOrder = 11;
  return s;
}

export class Headsets {
  readonly group = new THREE.Group();
  private markers = new Map<string, Marker>();
  /** Floor height for the ring below each headset. */
  floorY = 0;
  onChange: (names: string[]) => void = () => {};

  set(p: HeadsetPose) {
    const now = performance.now();
    let m = this.markers.get(p.id);
    const isNew = !m;
    if (!m) {
      m = new Marker(p.name);
      this.markers.set(p.id, m);
      this.group.add(m.group);
    }
    m.set(p, now, isNew);
    if (isNew) this.changed();
  }

  tick(dt: number) {
    const now = performance.now();
    for (const [id, m] of this.markers) {
      if (now - m.last > TIMEOUT_MS) {
        this.group.remove(m.group);
        m.dispose();
        this.markers.delete(id);
        this.changed();
        continue;
      }
      m.tick(dt, this.floorY);
    }
  }

  /** Connected headsets with their smoothed pose (for the VR menu in the header). */
  list(): { id: string; name: string; pos: THREE.Vector3; quat: THREE.Quaternion }[] {
    return [...this.markers].map(([id, m]) => ({ id, name: m.name, pos: m.group.position, quat: m.head.quaternion }));
  }

  /** Hide one marker (the camera sits in it while following that headset). */
  hide(id: string | null) {
    for (const [k, m] of this.markers) m.group.visible = k !== id;
  }

  private changed() {
    this.onChange([...this.markers.keys()]);
  }
}
