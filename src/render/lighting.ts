// "Fake spot lights" for surfaces.
// Real SpotLights are far too expensive for hundreds of beams on a 2018 laptop GPU.
// Instead every lit beam is written into a small float texture each frame and the
// surface shader loops over the *active* beams only (cone test, Lambert, distance
// falloff, gobo projection). Cost scales with lit beams, not with patched fixtures.

import * as THREE from 'three/webgpu';
import {
  Fn,
  If,
  Loop,
  cross,
  dot,
  float,
  floor,
  int,
  ivec2,
  length,
  max,
  normalWorld,
  positionWorld,
  select,
  smoothstep,
  sqrt,
  texture,
  textureLoad,
  uniform,
  vec2,
  vec3,
  clamp,
  mix,
} from 'three/tsl';
import { GOBO_COLS, GOBO_ROWS } from './gobos.ts';

export const MAX_BEAMS = 1024;

export class BeamLightBuffer {
  readonly data = new Float32Array(MAX_BEAMS * 4 * 4);
  readonly tex: THREE.DataTexture;
  readonly count = uniform(0, 'int');
  readonly gobos: THREE.Texture;
  private n = 0;

  constructor(goboAtlas: THREE.Texture) {
    this.tex = new THREE.DataTexture(this.data, 4, MAX_BEAMS, THREE.RGBAFormat, THREE.FloatType);
    this.tex.minFilter = this.tex.magFilter = THREE.NearestFilter;
    this.tex.generateMipmaps = false;
    this.tex.needsUpdate = true;
    this.gobos = goboAtlas;
  }

  get size() {
    return this.n;
  }

  begin() {
    this.n = 0;
  }

  /**
   * @param apex cone apex in world space
   * @param dir normalised beam direction
   * @param right normalised vector perpendicular to dir (gobo orientation)
   * @param halfAngle half beam angle in radians
   */
  push(apex: THREE.Vector3, dir: THREE.Vector3, right: THREE.Vector3, halfAngle: number, r: number, g: number, b: number, gobo: number, inner = 0.82) {
    if (this.n >= MAX_BEAMS) return;
    const o = this.n * 16;
    const d = this.data;
    const cosOuter = Math.cos(halfAngle);
    // inner = fraction of the cone at full brightness: small → soft wash edge.
    const cosInner = Math.cos(halfAngle * inner);
    d[o] = apex.x;
    d[o + 1] = apex.y;
    d[o + 2] = apex.z;
    d[o + 3] = cosOuter;
    d[o + 4] = dir.x;
    d[o + 5] = dir.y;
    d[o + 6] = dir.z;
    d[o + 7] = cosInner;
    d[o + 8] = r;
    d[o + 9] = g;
    d[o + 10] = b;
    d[o + 11] = gobo;
    d[o + 12] = right.x;
    d[o + 13] = right.y;
    d[o + 14] = right.z;
    d[o + 15] = 0;
    this.n++;
  }

  end() {
    this.count.value = this.n;
    this.tex.needsUpdate = true;
  }

  /**
   * Keep only the `max` brightest beams for the surfaces (VR on mobile chips): they are moved
   * to the front, the shader loops over those only. Dim beams barely show on surfaces anyway.
   */
  limit(max: number) {
    if (this.n <= max) return;
    const d = this.data;
    const idx = Array.from({ length: this.n }, (_, i) => i);
    const lum = (i: number) => d[i * 16 + 8] + d[i * 16 + 9] + d[i * 16 + 10];
    idx.sort((a, b) => lum(b) - lum(a));
    const copy = d.slice(0, this.n * 16);
    for (let k = 0; k < max; k++) d.set(copy.subarray(idx[k] * 16, idx[k] * 16 + 16), k * 16);
    this.n = max;
    this.count.value = max;
  }

  /** Accumulated beam light arriving at world position P with normal N. */
  readonly light = Fn(([P, N]: [any, any]) => {
    const sum: any = vec3(0).toVar();
    Loop({ start: int(0), end: this.count, type: 'int', condition: '<' }, ({ i }: { i: any }) => {
      // Only the cone (texels 0 and 1) for the early out; colour and gobo axis when inside.
      const t0 = textureLoad(this.tex, ivec2(int(0), i));
      const t1 = textureLoad(this.tex, ivec2(int(1), i));
      const toP = P.sub(t0.xyz);
      const dist = max(length(toP), 0.001);
      const L = toP.div(dist);
      const cosT = dot(L, t1.xyz);
      // Early out: most pixels are outside most cones.
      If(cosT.greaterThan(t0.w), () => {
      const t2 = textureLoad(this.tex, ivec2(int(2), i));
      const t3 = textureLoad(this.tex, ivec2(int(3), i));
      const cone = smoothstep(t0.w, t1.w, cosT);
      const lambert = max(dot(N, L.negate()), 0.0);
      // Gobo: coordinates of P on the beam's cross-section, -1..1 at the cone edge.
      const tanHalf = sqrt(float(1).sub(t0.w.mul(t0.w))).div(t0.w);
      const denom = max(cosT, 0.01).mul(tanHalf);
      const up = cross(t1.xyz, t3.xyz);
      const gx = clamp(dot(L, t3.xyz).div(denom), -0.98, 0.98);
      const gy = clamp(dot(L, up).div(denom), -0.98, 0.98);
      // Atlas tile (gobo index - 1) → column/row; atlas rows run top to bottom (flipY off).
      const tile = max(t2.w.sub(1), 0);
      const row = floor(tile.add(0.5).div(GOBO_COLS));
      const col = tile.sub(row.mul(GOBO_COLS));
      const uvG = vec2(col.add(gx.mul(0.5).add(0.5)).div(GOBO_COLS), row.add(gy.mul(-0.5).add(0.5)).div(GOBO_ROWS));
      const goboMask = select(t2.w.lessThan(0.5), float(1), texture(this.gobos, uvG).level(float(0)).r);
      const atten = float(1).div(float(1).add(dist.mul(dist).mul(0.012)));
      sum.addAssign(t2.xyz.mul(cone.mul(lambert).mul(atten).mul(goboMask)));
      });
    });
    return sum;
  });

  /** Global strength of beam light on surfaces (spots and gobos on floor, walls, furniture). */
  readonly surfaceGain = uniform(1.6);

  /**
   * Standard PBR material that additionally receives the beams.
   * `receive` (0..1) is how strongly the surface shows spots and gobos – independent of how
   * dark it looks, so black walls and floors still show the light like real matt paint does.
   */
  surface(o: {
    color: THREE.ColorRepresentation;
    roughness?: number;
    metalness?: number;
    receive?: number;
    colorNode?: any;
    emissive?: any;
  }) {
    const m = new THREE.MeshStandardNodeMaterial({ color: o.color, roughness: o.roughness ?? 0.7, metalness: o.metalness ?? 0 });
    if (o.colorNode) m.colorNode = o.colorNode;
    const base = uniform(new THREE.Color(o.color));
    // Light picks up a bit of the surface colour but stays visible on dark materials.
    const tint = mix(base, vec3(1, 1, 1), 0.55);
    const beams = tint.mul(this.light(positionWorld, normalWorld)).mul(this.surfaceGain).mul(o.receive ?? 0.35);
    m.emissiveNode = o.emissive ? beams.add(o.emissive) : beams;
    // Description for the native VDM app (src/render/vr-export.ts); patterns are added by the caller.
    m.userData.vr = { kind: 'lit', color: `#${new THREE.Color(o.color).getHexString()}`, rough: o.roughness ?? 0.7, metal: o.metalness ?? 0, recv: o.receive ?? 0.35 };
    return m;
  }

  /** Backwards-compatible shortcut. */
  material(color: THREE.ColorRepresentation, roughness = 0.7, metalness = 0, receive = 0.35) {
    return this.surface({ color, roughness, metalness, receive });
  }
}
