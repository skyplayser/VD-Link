// Tileable 3D value-noise texture (2 octaves baked in), generated once at start-up.
// One texture lookup per beam fragment instead of procedural fractal noise.

import * as THREE from 'three/webgpu';

export function createNoise3D(size = 64): THREE.Data3DTexture {
  let seed = 1337;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const octave = (period: number) => {
    const lat = new Float32Array(period ** 3).map(() => rnd());
    const at = (x: number, y: number, z: number) =>
      lat[((z % period) * period + (y % period)) * period + (x % period)];
    const s = (t: number) => t * t * (3 - 2 * t);
    return (x: number, y: number, z: number) => {
      const fx = (x / size) * period, fy = (y / size) * period, fz = (z / size) * period;
      const x0 = Math.floor(fx), y0 = Math.floor(fy), z0 = Math.floor(fz);
      const tx = s(fx - x0), ty = s(fy - y0), tz = s(fz - z0);
      const l = (a: number, b: number, t: number) => a + (b - a) * t;
      return l(
        l(l(at(x0, y0, z0), at(x0 + 1, y0, z0), tx), l(at(x0, y0 + 1, z0), at(x0 + 1, y0 + 1, z0), tx), ty),
        l(l(at(x0, y0, z0 + 1), at(x0 + 1, y0, z0 + 1), tx), l(at(x0, y0 + 1, z0 + 1), at(x0 + 1, y0 + 1, z0 + 1), tx), ty),
        tz,
      );
    };
  };
  const o1 = octave(4);
  const o2 = octave(8);
  const o3 = octave(16);
  const data = new Uint8Array(size ** 3);
  let i = 0;
  for (let z = 0; z < size; z++)
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) data[i++] = Math.round((o1(x, y, z) * 0.55 + o2(x, y, z) * 0.3 + o3(x, y, z) * 0.15) * 255);
  const tex = new THREE.Data3DTexture(data, size, size, size);
  tex.format = THREE.RedFormat;
  tex.type = THREE.UnsignedByteType;
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = tex.wrapR = THREE.RepeatWrapping;
  tex.unpackAlignment = 1;
  tex.needsUpdate = true;
  return tex;
}
