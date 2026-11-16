// Our own procedural gobo set (no manufacturer artwork → no licensing issue).
// Generic shapes that are common on gobo wheels, drawn from scratch (docs/GOBOS.md).
// Atlas: GOBO_COLS × GOBO_ROWS tiles of 256×256 in the order of GOBO_ART
// (tile i ↔ motif index i + 1). White = light passes. flipY is off: row 0 is the top row.

import * as THREE from 'three/webgpu';
import { GOBO_ART, type GoboArtId } from '../shared/gobo-library.ts';

export const GOBO_COLS = 6;
export const GOBO_ROWS = Math.ceil(GOBO_ART.length / GOBO_COLS);
const S = 256;
/** Usable radius inside a tile (the projected cone is round anyway). */
const R = 118;
const TAU = Math.PI * 2;

type Ctx = CanvasRenderingContext2D;

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const disc = (g: Ctx, x: number, y: number, r: number) => {
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
};

/** Regular polygon / star path around the origin (first point pointing up). */
function poly(g: Ctx, n: number, rOut: number, rIn = 0) {
  g.beginPath();
  const k = rIn ? n * 2 : n;
  for (let i = 0; i < k; i++) {
    const a = -Math.PI / 2 + (i / k) * TAU;
    const r = rIn && i % 2 ? rIn : rOut;
    if (i) g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  g.closePath();
}

/** Clip further drawing to the round gobo aperture. */
function aperture(g: Ctx, r = R) {
  g.beginPath();
  g.arc(0, 0, r, 0, TAU);
  g.clip();
}

// Each motif draws white on black around (0, 0), radius ≤ R. Strong, simple shapes stay
// readable when projected small and blurred on a dark floor.
const DRAW: Record<GoboArtId, (g: Ctx) => void> = {
  'dots-ring': (g) => {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU;
      disc(g, Math.cos(a) * 72, Math.sin(a) * 72, 26);
    }
    disc(g, 0, 0, 22);
  },
  rays: (g) => {
    for (let i = 0; i < 10; i++) {
      g.rotate(TAU / 10);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(-11, 125);
      g.lineTo(11, 125);
      g.closePath();
      g.fill();
    }
  },
  breakup: (g) => {
    const r = rng(7);
    for (let i = 0; i < 38; i++) {
      const a = r() * TAU;
      const d = Math.sqrt(r()) * 110;
      g.beginPath();
      g.ellipse(Math.cos(a) * d, Math.sin(a) * d, 8 + r() * 16, 5 + r() * 9, r() * Math.PI, 0, TAU);
      g.fill();
    }
  },
  tunnel: (g) => {
    g.lineWidth = 13;
    for (let rad = 20; rad < 128; rad += 30) {
      g.beginPath();
      g.arc(0, 0, rad, 0, TAU);
      g.stroke();
    }
  },
  triangle: (g) => {
    g.lineWidth = 24;
    g.lineJoin = 'round';
    g.translate(0, 12);
    poly(g, 3, 98);
    g.stroke();
  },
  bars: (g) => {
    aperture(g);
    for (let x = -100; x <= 100; x += 40) g.fillRect(x - 10, -R, 20, R * 2);
  },
  spiral: (g) => {
    // Three tapering arms.
    for (let arm = 0; arm < 3; arm++) {
      for (let r = 6; r < 102; r += 1) {
        const a = (arm / 3) * TAU + r * 0.042;
        disc(g, Math.cos(a) * r, Math.sin(a) * r, 2 + r * 0.12);
      }
    }
  },
  flame: (g) => {
    aperture(g);
    const r = rng(11);
    // Tongues rising from the bottom edge (canvas y grows downward), tallest in the middle.
    for (let i = 0; i < 6; i++) {
      const x = -90 + i * 36 + (r() - 0.5) * 8;
      const w = 20 + r() * 8;
      const tip = -110 + Math.abs(x) * 0.7 + r() * 25;
      const sway = (r() - 0.5) * 50;
      g.beginPath();
      g.moveTo(x - w, 125);
      g.bezierCurveTo(x - w * 1.3, 40, x + sway - 20, tip + 60, x + sway, tip);
      g.bezierCurveTo(x + sway * 0.2 + 6, tip + 70, x + w * 1.2, 40, x + w, 125);
      g.closePath();
      g.fill();
    }
  },
  water: (g) => {
    aperture(g);
    g.lineCap = 'round';
    g.lineWidth = 10;
    for (let row = 0, y = -110; y <= 110; y += 24, row++) {
      // Broken wavy bands – reads as moving water when the wheel scrolls.
      g.setLineDash([52 + row * 7 % 30, 14 + row * 5 % 12]);
      g.lineDashOffset = row * 23;
      g.beginPath();
      for (let x = -125; x <= 125; x += 4) {
        const yy = y + Math.sin(x * 0.045 + row * 1.7) * 9;
        if (x === -125) g.moveTo(x, yy);
        else g.lineTo(x, yy);
      }
      g.stroke();
    }
    g.setLineDash([]);
  },
  star: (g) => {
    g.translate(0, 8);
    poly(g, 5, 116, 46);
    g.fill();
  },
  shards: (g) => {
    g.save();
    aperture(g);
    g.fillRect(-R, -R, R * 2, R * 2);
    g.restore();
    // Black cracks from an impact point plus a few long ones.
    g.strokeStyle = '#000';
    g.lineCap = 'round';
    const r = rng(5);
    const ix = -22,
      iy = 14;
    g.lineWidth = 6;
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU + r() * 0.4;
      g.beginPath();
      g.moveTo(ix, iy);
      let px = ix,
        py = iy;
      for (let s = 0; s < 4; s++) {
        px += Math.cos(a + (r() - 0.5) * 0.6) * 40;
        py += Math.sin(a + (r() - 0.5) * 0.6) * 40;
        g.lineTo(px, py);
      }
      g.stroke();
    }
    g.lineWidth = 5;
    for (let ring = 34; ring < 120; ring += 38) {
      g.beginPath();
      for (let i = 0; i <= 9; i++) {
        const a = (i / 9) * TAU + r() * 0.3;
        const rr = ring + (r() - 0.5) * 16;
        if (i) g.lineTo(ix + Math.cos(a) * rr, iy + Math.sin(a) * rr);
        else g.moveTo(ix + Math.cos(a) * rr, iy + Math.sin(a) * rr);
      }
      g.stroke();
    }
    g.strokeStyle = '#fff';
  },
  flower: (g) => {
    for (let i = 0; i < 8; i++) {
      g.save();
      g.rotate((i / 8) * TAU);
      g.beginPath();
      g.ellipse(0, -64, 22, 50, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    g.fillStyle = '#000';
    disc(g, 0, 0, 16);
    g.fillStyle = '#fff';
    disc(g, 0, 0, 8);
  },
  cross: (g) => {
    g.fillRect(-17, -112, 34, 224);
    g.fillRect(-112, -17, 224, 34);
  },
  window: (g) => {
    // 2 × 2 panes, slightly taller than wide.
    const pw = 76,
      ph = 92,
      gap = 14;
    for (const x of [-pw - gap / 2, gap / 2]) for (const y of [-ph - gap / 2, gap / 2]) g.fillRect(x, y, pw, ph);
  },
  'dot-grid': (g) => {
    for (let row = -4; row <= 4; row++) {
      for (let col = -4; col <= 4; col++) {
        const x = col * 27 + (row % 2 ? 13.5 : 0);
        const y = row * 24;
        if (Math.hypot(x, y) < 108) disc(g, x, y, 8.5);
      }
    }
  },
  bubbles: (g) => {
    const r = rng(23);
    const placed: [number, number, number][] = [];
    for (let tries = 0; tries < 400 && placed.length < 26; tries++) {
      const rad = 8 + r() * 24;
      const a = r() * TAU;
      const d = Math.sqrt(r()) * (R - rad - 2);
      const x = Math.cos(a) * d,
        y = Math.sin(a) * d;
      if (placed.some(([px, py, pr]) => Math.hypot(px - x, py - y) < pr + rad + 6)) continue;
      placed.push([x, y, rad]);
    }
    g.lineWidth = 6;
    for (const [x, y, rad] of placed) {
      g.beginPath();
      g.arc(x, y, rad, 0, TAU);
      if (rad < 16) g.fill();
      else g.stroke();
    }
  },
  'beam-reducer': (g) => disc(g, 0, 0, 34),
  ring: (g) => {
    g.lineWidth = 32;
    g.beginPath();
    g.arc(0, 0, 94, 0, TAU);
    g.stroke();
  },
  'three-dots': (g) => {
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i / 3) * TAU;
      disc(g, Math.cos(a) * 62, Math.sin(a) * 62, 30);
    }
  },
  snowflake: (g) => {
    g.lineWidth = 12;
    g.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      g.save();
      g.rotate((i / 6) * TAU);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(0, -108);
      for (const [y, l] of [[-50, 30], [-82, 22]]) {
        g.moveTo(0, y);
        g.lineTo(-l, y - l);
        g.moveTo(0, y);
        g.lineTo(l, y - l);
      }
      g.stroke();
      g.restore();
    }
  },
  square: (g) => {
    g.lineWidth = 24;
    g.strokeRect(-76, -76, 152, 152);
    g.fillRect(-16, -16, 32, 32);
  },
  eclipse: (g) => {
    disc(g, 0, 0, 104);
    g.fillStyle = '#000';
    disc(g, 40, -24, 92);
    g.fillStyle = '#fff';
  },
  segments: (g) => {
    g.lineWidth = 40;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU - Math.PI / 2;
      g.beginPath();
      g.arc(0, 0, 90, a + 0.22, a + TAU / 3 - 0.22);
      g.stroke();
    }
    disc(g, 0, 0, 24);
  },
  grid: (g) => {
    aperture(g, 112);
    g.rotate(Math.PI / 4);
    for (let x = -150; x <= 150; x += 34) {
      g.fillRect(x - 5, -160, 10, 320);
      g.fillRect(-160, x - 5, 320, 10);
    }
  },
};

/** Draws the whole atlas into a canvas (also handy for previews outside three.js). */
export function drawGoboAtlas(c: HTMLCanvasElement) {
  c.width = S * GOBO_COLS;
  c.height = S * GOBO_ROWS;
  const g = c.getContext('2d')!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, c.width, c.height);
  GOBO_ART.forEach((art, i) => {
    g.save();
    g.translate(S * ((i % GOBO_COLS) + 0.5), S * (Math.floor(i / GOBO_COLS) + 0.5));
    g.fillStyle = '#fff';
    g.strokeStyle = '#fff';
    DRAW[art.id](g);
    g.restore();
  });
}

export function createGoboAtlas(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  drawGoboAtlas(c);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  tex.flipY = false;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}
