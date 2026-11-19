// Volumetric-looking light cones ("beams in haze") – ALL beams in ONE draw call.
//
// Geometry: an open unit cylinder (y 0..1) as InstancedBufferGeometry. Every
// instance carries origin, direction, side vector, colour and tan(half angle);
// the vertex stage builds the truncated cone in world space, so moving, zooming
// and colouring 1000 beams costs one buffer upload per frame.

import * as THREE from 'three/webgpu';
import { createNoise3D } from './noise3d.ts';
import {
  abs,
  cameraFar,
  cameraNear,
  cameraViewMatrix,
  clamp,
  cross,
  dot,
  float,
  instancedDynamicBufferAttribute,
  linearDepth,
  mix,
  normalize,
  positionGeometry,
  positionView,
  positionWorld,
  smoothstep,
  texture3D,
  time,
  uniform,
  varying,
  vec3,
  vec4,
  viewportDepthTexture,
} from 'three/tsl';

export const BEAM_LENGTH = 32;
const LENS_RADIUS = 0.07;

/** Uniforms shared by all beams (haze, quality). */
export const beamGlobals = {
  haze: uniform(0.6),
  /** 0 = flat (low quality), 1 = animated haze noise. */
  noise: uniform(1),
  /** 0 = off, 1 = soft fade where beams hit geometry. */
  soft: uniform(1),
};

/**
 * Build-time features of the beam shader. `depthSoft` reads the scene depth for soft edges
 * where beams meet geometry – that needs a copy of the depth buffer every frame, which is
 * expensive on mobile (tile-based) GPUs. VR headsets switch it off and fade near the floor
 * instead; set before the rig is built.
 */
export const beamFeatures = { depthSoft: true };

export class InstancedBeams {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private a0: THREE.InstancedBufferAttribute; // origin.xyz, tanHalf
  private a1: THREE.InstancedBufferAttribute; // dir.xyz
  private a2: THREE.InstancedBufferAttribute; // right.xyz, lens radius
  private a3: THREE.InstancedBufferAttribute; // color.rgb, softness (0 beam … 1 wash)
  private n = 0;

  constructor(readonly capacity: number) {
    const base = new THREE.CylinderGeometry(1, 1, 1, 36, 1, true);
    base.translate(0, 0.5, 0);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.setAttribute('position', base.getAttribute('position'));
    geo.setAttribute('uv', base.getAttribute('uv'));
    const mk = () => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
      a.setUsage(THREE.DynamicDrawUsage);
      return a;
    };
    this.a0 = mk();
    this.a1 = mk();
    this.a2 = mk();
    this.a3 = mk();
    geo.instanceCount = 0;
    this.geo = geo;

    const i0: any = instancedDynamicBufferAttribute(this.a0, 'vec4'); // TSL typings lag behind runtime
    const i1: any = instancedDynamicBufferAttribute(this.a1, 'vec4'); // TSL typings lag behind runtime
    const i2: any = instancedDynamicBufferAttribute(this.a2, 'vec4'); // TSL typings lag behind runtime
    const i3: any = instancedDynamicBufferAttribute(this.a3, 'vec4'); // TSL typings lag behind runtime

    const m = new THREE.MeshBasicNodeMaterial({
      transparent: true,
      depthWrite: false,
      // Back faces only: visible from outside AND from inside the cone, half the overdraw of DoubleSide.
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });

    // ---- vertex: unit cylinder → truncated cone in world space
    const g = positionGeometry;
    const v = g.y;
    const origin = i0.xyz;
    const tanHalf = i0.w;
    const dir = i1.xyz;
    const right = i2.xyz;
    const up = cross(dir, right);
    const radius = i2.w.add(v.mul(BEAM_LENGTH).mul(tanHalf));
    m.positionNode = origin.add(right.mul(g.x.mul(radius))).add(up.mul(g.z.mul(radius))).add(dir.mul(v.mul(BEAM_LENGTH)));
    const nView = varying(cameraViewMatrix.mul(vec4(right.mul(g.x).add(up.mul(g.z)), 0)).xyz);
    const vColor: any = varying(i3.xyz);
    const vTan: any = varying(tanHalf);
    const vSoft: any = varying(i3.w);

    // ---- fragment
    const facing = abs(dot(normalize(nView), normalize(positionView.negate())));
    // Beam (soft 0): crisp silhouette, bright core. Wash (soft 1): light fades out
    // towards the edge of the cone and is spread thinner.
    const edge = facing.pow(mix(float(1.1), float(3.4), vSoft)).mul(mix(float(1.35), float(0.28), vSoft));
    const dist = v.mul(BEAM_LENGTH);
    const falloff = float(1).div(float(1).add(dist.mul(0.09))).mul(float(1).sub(v).pow(0.6));
    // Narrow beams concentrate the light → look more intense.
    const narrow = clamp(float(0.08).div(vTan.max(0.004)), 0.6, 3.5).pow(0.65);
    const noiseTex = createNoise3D();
    const n = texture3D(noiseTex, positionWorld.mul(0.045).add(vec3(time.mul(0.012), time.mul(-0.004), time.mul(0.006)))).r.sub(0.5);
    const hazeNoise = float(1).add(n.mul(2.2).mul(beamGlobals.noise));
    // Soft intersection with floor/walls/people (depth difference in metres).
    let soft;
    if (beamFeatures.depthSoft) {
      const sceneDepth = linearDepth(viewportDepthTexture());
      const diff = sceneDepth.sub(linearDepth()).mul(cameraFar.sub(cameraNear));
      soft = smoothstep(0, 0.8, diff).mul(beamGlobals.soft).add(float(1).sub(beamGlobals.soft));
    } else {
      // Cheap: fade out the last 60 cm above the floor (where most beams end).
      soft = smoothstep(0.02, 0.6, positionWorld.y);
    }
    const alpha = edge.mul(falloff).mul(narrow).mul(clamp(hazeNoise, 0.15, 2)).mul(soft).mul(beamGlobals.haze).mul(0.9);
    m.colorNode = vColor.mul(alpha);
    m.opacityNode = float(1);

    this.mesh = new THREE.Mesh(geo, m);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 10;
  }

  get count() {
    return this.n;
  }

  /**
   * The current beams for another renderer (native VR app): 16 floats per beam –
   * origin.xyz, tanHalf | dir.xyz, 0 | right.xyz, lens | colour.rgb, softness.
   */
  pack(out: Float32Array, at: number, max: number): number {
    const n = Math.min(this.n, max);
    const src = [this.a0.array, this.a1.array, this.a2.array, this.a3.array] as Float32Array[];
    for (let i = 0; i < n; i++) for (let k = 0; k < 4; k++) out.set(src[k].subarray(i * 4, i * 4 + 4), at + i * 16 + k * 4);
    return n;
  }

  begin() {
    this.n = 0;
  }

  /** origin = lens centre (world), dir/right normalised. */
  push(origin: THREE.Vector3, dir: THREE.Vector3, right: THREE.Vector3, tanHalf: number, r: number, g: number, b: number, soft = 0.35, lens = LENS_RADIUS) {
    if (this.n >= this.capacity) return;
    const o = this.n * 4;
    const d0 = this.a0.array as Float32Array;
    const d1 = this.a1.array as Float32Array;
    const d2 = this.a2.array as Float32Array;
    const d3 = this.a3.array as Float32Array;
    d0[o] = origin.x;
    d0[o + 1] = origin.y;
    d0[o + 2] = origin.z;
    d0[o + 3] = tanHalf;
    d1[o] = dir.x;
    d1[o + 1] = dir.y;
    d1[o + 2] = dir.z;
    d2[o] = right.x;
    d2[o + 1] = right.y;
    d2[o + 2] = right.z;
    d2[o + 3] = lens;
    d3[o] = r;
    d3[o + 1] = g;
    d3[o + 2] = b;
    d3[o + 3] = soft;
    this.n++;
  }

  end() {
    this.geo.instanceCount = this.n;
    for (const a of [this.a0, this.a1, this.a2, this.a3]) {
      a.clearUpdateRanges();
      a.addUpdateRange(0, this.n * 4);
      a.needsUpdate = true;
    }
  }
}
