// The room for the native VDM app: VD-Link's own venue meshes (bar, lounge, trusses, stage …),
// baked into world space and merged per material, so the headset shows the same room with few
// draw calls. Point lights of the room are baked into vertex colours (the headset GPU has no
// budget for real lights). The crowd goes as a list of people, video pictures VDM draws itself.
//
// Format "VDV1": 4 bytes magic, uint32 header length, JSON header (padded to 4 bytes), binary.
//   header.meshes[i] = { mat, verts, tris, pos, nrm, uv, col?, idx }   byte offsets into the binary
//   header.mats[i]   = { kind: lit|glow|add|aqua|glass, color: '#rrggbb' (sRGB), intensity?,
//                        rough?, metal?, recv?, pattern?: quilt|marble|duct|sheen|fade, sheen?,
//                        opacity?, emissive?, double?, tex?: index into header.textures }
//   header.textures  = [{ off, len }]  PNG
//   header.crowd     = { off, count }  float32 x, z, height, phase per person
// Little-endian; positions/normals float32 ×3, uv ×2, colours ×4, indices int32,
// triangles clockwise (Godot's front face).

import * as THREE from 'three/webgpu';

export interface VrMatTag {
  kind: 'lit' | 'glow' | 'add' | 'aqua' | 'glass';
  color?: string;
  intensity?: number;
  rough?: number;
  metal?: number;
  recv?: number;
  pattern?: string;
  sheen?: number;
  opacity?: number;
  /** Own glow of untagged standard materials (bottles, glasses). */
  emissive?: string;
  map?: HTMLCanvasElement;
}

interface Bucket {
  mat: Omit<VrMatTag, 'map'> & { double?: boolean; tex?: number };
  map?: HTMLCanvasElement;
  pos: number[];
  nrm: number[];
  uv: number[];
  col: number[] | null;
  idx: number[];
}

interface PointL {
  p: THREE.Vector3;
  c: THREE.Color;
  intensity: number;
  distance: number;
}

const hex = (c: THREE.Color) => `#${c.getHexString()}`;

/** Material description: the tag the builders put on it, else read from the material itself. */
function describe(m: THREE.Material): VrMatTag {
  const tag = m.userData.vr as VrMatTag | undefined;
  if (tag) return tag;
  const s = m as THREE.MeshStandardMaterial;
  if (m.transparent && m.opacity < 0.9) return { kind: 'glass', color: s.color ? hex(s.color) : '#888888', opacity: m.opacity };
  if ((s as { isMeshStandardMaterial?: boolean }).isMeshStandardMaterial) {
    const t: VrMatTag = { kind: 'lit', color: hex(s.color), rough: s.roughness, metal: s.metalness, recv: 0 };
    if (s.emissive && s.emissive.getHex() !== 0) t.emissive = hex(s.emissive);
    return t;
  }
  const b = m as THREE.MeshBasicMaterial;
  return { kind: 'glow', color: b.color ? hex(b.color) : '#ffffff', intensity: 1 };
}

/** Light of the room's point lights at a point (lambert, three.js falloff), for the vertex colour. */
function bake(lights: PointL[], p: THREE.Vector3, n: THREE.Vector3, out: THREE.Color) {
  out.setRGB(0, 0, 0);
  const L = new THREE.Vector3();
  for (const l of lights) {
    L.subVectors(l.p, p);
    const d = Math.max(L.length(), 0.05);
    const ndl = Math.max(0, n.dot(L) / d);
    if (ndl <= 0) continue;
    let win = 1;
    if (l.distance > 0) win = Math.pow(THREE.MathUtils.clamp(1 - Math.pow(d / l.distance, 4), 0, 1), 2);
    const k = (l.intensity * ndl * win) / (d * d) / Math.PI;
    out.r += l.c.r * k;
    out.g += l.c.g * k;
    out.b += l.c.b * k;
  }
}

export interface VenueExport {
  bytes: Uint8Array;
  triangles: number;
  meshes: number;
}

export async function exportVenue(root: THREE.Object3D): Promise<VenueExport> {
  root.updateMatrixWorld(true);
  const lights: PointL[] = [];
  root.traverseVisible((o) => {
    const l = o as THREE.PointLight;
    if (l.isPointLight) lights.push({ p: l.getWorldPosition(new THREE.Vector3()), c: l.color.clone(), intensity: l.intensity, distance: l.distance });
  });

  const buckets = new Map<string, Bucket>();
  let crowd: { x: number; z: number; h: number; ph: number }[] = [];
  const world = new THREE.Matrix4();
  const inst = new THREE.Matrix4();
  const nmat = new THREE.Matrix3();
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  const c = new THREE.Color();
  const ic = new THREE.Color();

  const add = (mesh: THREE.Mesh, m: THREE.Material, matrix: THREE.Matrix4, tint: THREE.Color | null) => {
    const g = mesh.geometry;
    const P = g.getAttribute('position');
    if (!P) return;
    let N = g.getAttribute('normal');
    if (!N) {
      g.computeVertexNormals();
      N = g.getAttribute('normal');
    }
    const U = g.getAttribute('uv');
    const tag = describe(m);
    const lit = tag.kind === 'lit';
    let color = tag.color;
    if (tint && color) color = hex(new THREE.Color(color).multiply(tint));
    else if (tint) color = hex(tint);
    const double = m.side === THREE.DoubleSide;
    const key = JSON.stringify([tag.kind, color, tag.intensity, tag.rough, tag.metal, tag.recv, tag.pattern, tag.sheen, tag.opacity, tag.emissive, double, tag.map ? m.uuid : '']);
    let b = buckets.get(key);
    if (!b) {
      const { map, ...rest } = tag;
      b = { mat: { ...rest, color, double }, map, pos: [], nrm: [], uv: [], col: lit ? [] : null, idx: [] };
      buckets.set(key, b);
    }
    const base = b.pos.length / 3;
    nmat.getNormalMatrix(matrix);
    for (let i = 0; i < P.count; i++) {
      v.fromBufferAttribute(P, i).applyMatrix4(matrix);
      n.fromBufferAttribute(N, i).applyMatrix3(nmat).normalize();
      b.pos.push(v.x, v.y, v.z);
      b.nrm.push(n.x, n.y, n.z);
      // Ribbed duct: the stripes run along the cylinder's own axis.
      if (tag.pattern === 'duct') b.uv.push(0, P.getY(i));
      // Godot's v runs from the top of a texture, three.js' from the bottom.
      else if (U) b.uv.push(U.getX(i), 1 - U.getY(i));
      else b.uv.push(0, 0);
      if (b.col) {
        bake(lights, v, n, c);
        b.col.push(c.r, c.g, c.b, 1);
      }
    }
    // three.js: counter-clockwise front faces, Godot: clockwise. A mirroring matrix flips it back.
    const flip = matrix.determinant() > 0;
    const I = g.getIndex();
    const tri = (a: number, bb: number, cc: number) => (flip ? b!.idx.push(base + a, base + cc, base + bb) : b!.idx.push(base + a, base + bb, base + cc));
    if (I) for (let i = 0; i + 2 < I.count; i += 3) tri(I.getX(i), I.getX(i + 1), I.getX(i + 2));
    else for (let i = 0; i + 2 < P.count; i += 3) tri(i, i + 1, i + 2);
  };

  root.traverseVisible((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || o.userData.vrSkip) return;
    if (o.userData.vrCrowd) {
      crowd = o.userData.vrCrowd;
      return;
    }
    const m = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    if (!m || !m.visible) return;
    const im = mesh as THREE.InstancedMesh;
    if (im.isInstancedMesh) {
      for (let i = 0; i < im.count; i++) {
        im.getMatrixAt(i, inst);
        world.multiplyMatrices(im.matrixWorld, inst);
        let tint: THREE.Color | null = null;
        if (im.instanceColor) {
          im.getColorAt(i, ic);
          tint = ic;
        }
        add(mesh, m, world, tint);
      }
    } else add(mesh, m, mesh.matrixWorld, null);
  });

  // ---- binary
  const parts: ArrayBuffer[] = [];
  let off = 0;
  const put = (buf: ArrayBuffer) => {
    const at = off;
    parts.push(buf);
    off += buf.byteLength;
    const pad = (4 - (buf.byteLength % 4)) % 4;
    if (pad) {
      parts.push(new ArrayBuffer(pad));
      off += pad;
    }
    return at;
  };
  const textures: { off: number; len: number }[] = [];
  const texOf = new Map<HTMLCanvasElement, number>();
  const mats: Bucket['mat'][] = [];
  const meshes: Record<string, number>[] = [];
  let triangles = 0;
  for (const b of buckets.values()) {
    if (b.map) {
      let t = texOf.get(b.map);
      if (t === undefined) {
        const blob = await new Promise<Blob | null>((r) => b.map!.toBlob(r, 'image/png'));
        if (blob) {
          const buf = await blob.arrayBuffer();
          t = textures.length;
          textures.push({ off: put(buf), len: buf.byteLength });
          texOf.set(b.map, t);
        }
      }
      if (t !== undefined) b.mat.tex = t;
    }
    mats.push(b.mat);
    const e: Record<string, number> = {
      mat: mats.length - 1,
      verts: b.pos.length / 3,
      tris: b.idx.length / 3,
      pos: put(new Float32Array(b.pos).buffer),
      nrm: put(new Float32Array(b.nrm).buffer),
      uv: put(new Float32Array(b.uv).buffer),
      idx: put(new Int32Array(b.idx).buffer),
    };
    if (b.col) e.col = put(new Float32Array(b.col).buffer);
    meshes.push(e);
    triangles += e.tris;
  }
  const crowdData = new Float32Array(crowd.length * 4);
  crowd.forEach((p, i) => crowdData.set([p.x, p.z, p.h, p.ph], i * 4));
  const header = { version: 1, mats, meshes, textures, crowd: { off: put(crowdData.buffer), count: crowd.length } };
  let json = new TextEncoder().encode(JSON.stringify(header));
  const jpad = (4 - (json.length % 4)) % 4;
  if (jpad) {
    const j = new Uint8Array(json.length + jpad).fill(32);
    j.set(json);
    json = j;
  }
  const out = new Uint8Array(8 + json.length + off);
  out.set([86, 68, 86, 49]); // "VDV1"
  new DataView(out.buffer).setUint32(4, json.length, true);
  out.set(json, 8);
  let at = 8 + json.length;
  for (const p of parts) {
    out.set(new Uint8Array(p), at);
    at += p.byteLength;
  }
  return { bytes: out, triangles, meshes: meshes.length };
}
