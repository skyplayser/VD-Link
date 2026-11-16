// Full-screen animated output on a (virtual) monitor – stands in for VJ-Link.
import { drawTestPattern } from './render/testpattern-draw.ts';

const c = document.getElementById('c') as HTMLCanvasElement;
const g = c.getContext('2d')!;
const t0 = performance.now();

function frame() {
  if (c.width !== innerWidth || c.height !== innerHeight) {
    c.width = innerWidth;
    c.height = innerHeight;
  }
  drawTestPattern(g, c.width, c.height, (performance.now() - t0) / 1000, 'VJ-Ausgabe → virtueller Monitor');
  requestAnimationFrame(frame);
}
frame();
