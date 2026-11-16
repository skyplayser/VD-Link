// Betopper – spec sheets from the maker's shop (betopperdj.com, 11/2026). Already in
// the library (QLC+/OFL) and skipped: L1015, LB150, LB230, LM70, LM108, LPC-007,
// LPC-017, LPC-120, LPC-1218, LPC004, LPC006.

import type { Spec } from './archetype.ts';

const U = 'https://www.betopperdj.com/products/';
const s = (key: string, model: string, rest: Omit<Spec, 'man' | 'key' | 'model'>): Spec => ({ man: 'Betopper', key, model, ...rest });

export const BETOPPER: Spec[] = [
  s('lm0740', 'LM0740 7×40W Wash Moving Head', { kind: 'wash', leds: [7, 'rgbw'], deg: [5, 50], ch: [13, 15], url: U + 'betopper-lm0740-7x40w-wash-moving-head-light' }),
  s('lm0740-mkii', 'LM0740 MKII 7×40W Wash & Zoom', { kind: 'wash', leds: [7, 'rgbw'], deg: [4, 60], ch: [15, 17, 35], pixelFrom: 35 }),
  s('lb300', 'LB300 300W Beam with RGB ring', { kind: 'beam', ring: [48, 'rgb'], deg: [2.1, 2.1], ch: [18, 22], feat: ['gobo:14', 'prism', 'prism2', 'focus', 'frost', 'rainbow'] }),
  s('lm1925r', 'LM1925R 19×25W Wash with Halo Ring', { kind: 'wash', leds: [19, 'rgbw'], ring: [60, 'rgb'], deg: [4, 60], ch: [21, 23, 35, 78, 111], pixelFrom: 78, feat: ['rot'], url: U + 'betopper-lm1925r-19x25w-rgbw-moving-head-wash-light-with-halo-ring' }),
  s('lm1925', 'LM1925 19×25W Zoom Wash', { kind: 'wash', leds: [19, 'rgbw'], deg: [4, 60], ch: [21, 23, 35, 78, 111], pixelFrom: 78 }),
  s('lpd001', 'LPD001 9×18W RGBWA+UV Battery Uplight', { kind: 'par', leds: [9, 'rgbwauv'], deg: [30, 30], ch: [6, 10] }),
  s('lpw0450', 'LPW0450 4×50W IP65 WW/CW COB PAR', { kind: 'cob', leds: [4, 'wwcw'], ch: [2, 4, 6] }),
  s('lpw0918', 'LPW0918 9×18W IP65 RGBAL+UV PAR', { kind: 'par', leds: [9, 'rgbauv'], ch: [6, 10] }),
  s('lc005-b', 'LC005-B 4×50W WW/CW COB PAR with Barn Doors', { kind: 'cob', leds: [4, 'wwcw'], ch: [2, 4, 6] }),
  s('lm3715r', 'LM3715R 37×15W Wash with Halo Ring', { kind: 'wash', leds: [37, 'rgbw'], ring: [222, 'rgb'], deg: [4, 60], ch: [22, 27, 30, 33, 58], pixelFrom: 999, size: [380, 380, 300], feat: ['rot'] }),
  s('lw2418', 'LW2418 24×18W RGBWA+UV Pixel Linear Wash', { kind: 'bar', leds: [24, 'rgbwauv'], deg: [30, 30], ch: [6, 8, 11, 48, 50], pixelFrom: 48, size: [1000, 90, 110] }),
  s('lf80', 'LF80 LED Strobe Bar 280 RGB + 70 W', { kind: 'strobe', leds: [28, 'rgb'], aux: [14, 'cw', 'line'], ch: [10, 15, 36, 112], pixelFrom: 112, size: [1000, 90, 100] }),
  s('bsw500', 'BSW500 500W CMY + CTO Spot Beam Wash Hybrid', { kind: 'hybrid', deg: [2.5, 19], ch: [29], feat: ['cmy', 'cto', 'gobo:9', 'gobor', 'gobo2', 'prism', 'prism2', 'frost', 'focus', 'zoom', 'iris', 'dim16'], size: [320, 320, 420] }),
  s('lm1940', 'LM1940 19×40W Wash with Pixel Mapping', { kind: 'wash', leds: [19, 'rgbw'], deg: [4, 60], ch: [21, 23, 35, 92], pixelFrom: 92, feat: ['rot'] }),
  s('lpc018', 'LPC018 54×1W RGB PAR', { kind: 'par', leds: [54, 'rgb'], ch: [7] }),
  s('lf105', 'LF105 150W Matrix Strobe 945 RGB', { kind: 'matrix', leds: [45, 'rgb'], grid: [5, 9], ch: [8, 9, 15] }),
  s('lf350', 'LF350 Matrix Strobe Moving Head 672 RGB + 256 W', { kind: 'tiltbar', leds: [16, 'cw'], aux: [16, 'rgb', 'grid'], grid: [4, 4], tilt: 270, ch: [17, 38, 73], pixelFrom: 38, size: [300, 300, 160] }),
  s('bsw200', 'BSW200 200W Spot Beam Wash Hybrid', { kind: 'hybrid', deg: [3, 22], ch: [16, 20], feat: ['gobo:12', 'gobor', 'prism', 'frost', 'focus', 'zoom'] }),
  s('lf1421', 'LF1421 Matrix Beam Strobe Bar 42 RGB + 63 W', { kind: 'bar', leds: [42, 'rgb'], aux: [63, 'cw'], ch: [4, 16, 63], pixelFrom: 63, size: [1000, 120, 100] }),
  s('lf4808', 'LF4808 260W Matrix Strobe 768 RGB + 112 W', { kind: 'matrix', leds: [48, 'rgb'], aux: [8, 'cw', 'line'], grid: [4, 12], ch: [4, 15, 152], pixelFrom: 152 }),
  s('lf2405', 'LF2405 300W Matrix Beam Strobe 384 RGB + 24 gold', { kind: 'matrix', leds: [24, 'rgb'], aux: [24, 'ww', 'grid'], grid: [4, 6], ch: [5, 11, 112], pixelFrom: 112 }),
  s('lc500', 'LC500 4×100W Amber/CW COB Blinder', { kind: 'blinder', leds: [4, 'amcw'], grid: [2, 2], ch: [12], size: [420, 420, 140] }),
  s('lb295', 'LB295 295W Pro Beam', { kind: 'beam', deg: [2.2, 2.2], ch: [16], feat: ['gobo:14', 'prism', 'focus', 'frost'] }),
  s('lpc010-b', 'LPC010-B 54×4W RGBW PAR with Barn Doors', { kind: 'par', leds: [54, 'rgbw'], ch: [4, 8] }),
  s('lm1915', 'LM1915 19×15W Wash with Halo Ring', { kind: 'wash', leds: [19, 'rgbw'], ring: [48, 'rgb'], deg: [5, 60], ch: [21, 23, 35] }),
  s('lpc010n', 'LPC010N 54×4W RGBW High CRI PAR', { kind: 'par', leds: [54, 'rgbw'], ch: [4, 8] }),
  s('lm120', "LM120 Demon's Eye 120W RGBW Moving Head", { kind: 'hybrid', leds: [1, 'rgbw'], ring: [24, 'rgb'], deg: [4, 40], ch: [14, 18] }),
  s('lcx200', 'LCX200 High CRI LED Profile Spot', { kind: 'ellipsoidal', leds: [1, 'white'], deg: [19, 36], ch: [4, 8], feat: ['zoom'] }),
  s('lw3603', 'LW3603 36×3W RGB Wash Bar', { kind: 'bar', leds: [36, 'rgb'], ch: [8, 11, 40, 108], pixelFrom: 108 }),
  s('lpc1818', 'LPC1818 18×18W RGBALUV PAR', { kind: 'par', leds: [18, 'rgbauv'], ch: [6, 10] }),
  s('clb260-o', 'CLB260-O 9R 260W Pro Beam', { kind: 'beam', deg: [2, 2], ch: [16, 20], feat: ['gobo:14', 'prism', 'prism2', 'focus', 'frost', 'rainbow'] }),
  s('ls30', 'LS30 30W Mini Spot', { kind: 'spot', deg: [14, 14], ch: [9, 11], feat: ['gobo:8'] }),
  s('ls105', 'LS105 100W Gobo Spot', { kind: 'spot', deg: [12, 12], ch: [14], feat: ['gobo:8', 'gobor', 'prism', 'focus'] }),
  s('ls35', 'LS35 30W Spot with Ring Effect', { kind: 'spot', ring: [12, 'rgb'], deg: [14.3, 14.3], tilt: 200, ch: [10, 12], feat: ['gobo:8'] }),
  s('lc001-h', 'LC001-H 100W COB PAR WW/CW', { kind: 'cob', leds: [1, 'wwcw'], ch: [2, 4] }),
  s('lc002-h', 'LC002-H 200W COB PAR WW/CW', { kind: 'cob', leds: [1, 'wwcw'], ch: [2, 4] }),
  s('lm30a', 'LM30A 8×3W Mini Spider', { kind: 'spider', leds: [8, 'rgbw'], grid: [2, 4], ch: [7, 13] }),
];
