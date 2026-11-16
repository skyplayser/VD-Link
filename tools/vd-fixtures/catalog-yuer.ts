// YUER – spec sheets from the maker's shops (yuerlights.com / yuer-online.com, 11/2026;
// 374 distinct product configurations, a broad selection here). YUER names products by
// their light source, so the model names below are built the same way.
// Already in the library: Jade Dragon 200W Beam (OFL).

import type { Spec } from './archetype.ts';

const U = 'https://yuerlights.com/collections/moving-head-light';
const s = (key: string, model: string, rest: Omit<Spec, 'man' | 'key' | 'model' | 'url'>): Spec => ({ man: 'YUER', key, model, url: U, ...rest });

export const YUER: Spec[] = [
  // ---- bee eyes
  s('19x40w-bee-eye-zoom', '19×40W Bee Eye Zoom RGBW', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [4, 60], ch: [21, 23, 35, 78, 92, 97, 99], pixelFrom: 78, feat: ['rot', 'zoom'] }),
  s('19x40w-bee-eye-ring', '19×40W Bee Eye with Ring Wash Effect', { kind: 'beeeye', leds: [19, 'rgbw'], ring: [60, 'rgb'], deg: [4, 60], ch: [23, 35, 101], pixelFrom: 101, feat: ['rot', 'zoom'] }),
  s('19x40w-ip65-wash', '19×40W IP65 Zoom Wash', { kind: 'wash', leds: [19, 'rgbw'], deg: [4, 60], ch: [19, 27] }),
  s('19x15w-bee-eye-k10', '19×15W Bee Eye RGBW Zoom & Rotation', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [4, 50], ch: [16, 21, 79], pixelFrom: 79, feat: ['rot', 'zoom'] }),
  s('19x20w-big-bee-eye', '19×20W Big Bee Eye Zoom', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [4, 55], ch: [21, 23, 35, 78], pixelFrom: 78, feat: ['rot', 'zoom'] }),
  s('19x25w-bee-eye-cto', '19×25W Bee Eye Spot/Wash/Zoom CTO', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [4, 60], ch: [21, 23, 35], feat: ['rot', 'zoom', 'cto'] }),
  s('19x60w-ip65-bee-eye', '19×60W IP65 Bee Eye with Ring', { kind: 'beeeye', leds: [19, 'rgbl'], ring: [48, 'rgb'], deg: [4, 50], ch: [25, 37, 101], pixelFrom: 101, feat: ['rot', 'zoom'] }),
  s('19x80w-ip66-bee-eye', '19×80W IP66 Bee Eye Beam Wash', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [4, 45], ch: [23, 35, 99], pixelFrom: 99, feat: ['rot', 'zoom'], size: [420, 420, 320] }),
  s('7x40w-mini-bee-eye', '7×40W Mini Bee Eye', { kind: 'beeeye', leds: [7, 'rgbw'], deg: [4, 4], ch: [13, 15, 36], pixelFrom: 36 }),
  s('7x60w-bee-eye-ring', '7×60W Mini Bee Eye with Ring', { kind: 'beeeye', leds: [7, 'rgbw'], ring: [24, 'rgb'], deg: [4, 50], ch: [15, 19, 43], pixelFrom: 43, feat: ['zoom'] }),
  s('6x40w-pixel-bee-eye', '6×40W Pixel Bee Eye Zoom Wash', { kind: 'beeeye', leds: [6, 'rgbw'], deg: [5, 45], ch: [14, 38], pixelFrom: 38, feat: ['zoom'] }),
  s('4x40w-bee-eye-zoom', '4×40W Bee Eye Zoom', { kind: 'beeeye', leds: [4, 'rgbw'], deg: [5, 45], ch: [16, 20], feat: ['zoom'] }),
  s('4x60w-bee-eye-mirror', '4×60W Bee Eye Mirror Rotation', { kind: 'beeeye', leds: [4, 'rgbw'], deg: [4, 50], ch: [16, 20, 32], pixelFrom: 32, feat: ['zoom', 'rot'] }),
  s('18x40w-bee-eye-laser', '18×40W Bee Eye + RGB Laser', { kind: 'beeeye', leds: [18, 'rgbw'], ring: [36, 'rgb'], deg: [4, 4], ch: [52, 76, 148], pixelFrom: 76 }),
  s('10x15w-bee-eye-100w-beam', '10×15W Bee Eye Wash + 100W Beam with Aperture', { kind: 'beeeye', leds: [10, 'rgbw'], ring: [24, 'rgb'], deg: [3, 3], ch: [22, 28, 64], pixelFrom: 64 }),
  // ---- beams / spots / hybrids
  s('7r-230w-beam-aperture', '7R 230W Beam with LED Aperture', { kind: 'beam', ring: [24, 'rgb'], deg: [2, 2], ch: [16, 20], feat: ['gobo:14', 'prism', 'focus', 'frost', 'rainbow'] }),
  s('12r-295w-beam-aperture', '12R 295W Beam with SMD Aperture', { kind: 'beam', ring: [30, 'rgb'], deg: [2, 2], ch: [16, 22], feat: ['gobo:14', 'prism', 'prism2', 'focus', 'frost', 'rainbow'] }),
  s('14r-295w-beam-zoom', '14R 295W Beam with Aperture & Zoom', { kind: 'hybrid', ring: [30, 'rgb'], deg: [2, 25], ch: [16, 24], feat: ['gobo:14', 'prism', 'focus', 'frost', 'zoom'] }),
  s('17r-350w-beam-spot', '17R 350W Beam Spot with Aperture', { kind: 'hybrid', ring: [36, 'rgb'], deg: [2, 30], ch: [16, 24], feat: ['gobo:14', 'gobor', 'prism', 'prism2', 'focus', 'frost', 'zoom', 'rainbow'] }),
  s('19r-380w-beam-spot', '19R 380W Beam Spot with Aperture', { kind: 'hybrid', ring: [36, 'rgb'], deg: [1.5, 30], ch: [20, 24], feat: ['gobo:14', 'gobor', 'prism', 'prism2', 'focus', 'frost', 'zoom', 'rainbow'] }),
  s('19r-420w-beam', '19R 420W Beam with Atomisation & Ring', { kind: 'hybrid', ring: [40, 'rgb'], deg: [1.5, 28], ch: [20, 24], feat: ['gobo:14', 'gobor', 'prism', 'prism2', 'focus', 'frost', 'zoom'] }),
  s('20r-380w-beam-spot-wash', '20R 380W Beam Spot Wash Double Prism', { kind: 'hybrid', deg: [1.5, 30], ch: [16, 22], feat: ['gobo:14', 'gobor', 'prism', 'prism2', 'focus', 'frost', 'zoom', 'rainbow'] }),
  s('10r-280w-beam-spot-wash', '10R 280W Beam Spot Wash Zoom', { kind: 'hybrid', ring: [24, 'rgb'], deg: [2, 30], ch: [16, 24], feat: ['gobo:14', 'gobor', 'prism', 'focus', 'frost', 'zoom'] }),
  s('260w-beam-spot', '260W Beam Spot with Aperture', { kind: 'hybrid', ring: [24, 'rgb'], deg: [2, 20], ch: [16, 20], feat: ['gobo:14', 'prism', 'focus', 'frost', 'zoom', 'rainbow'] }),
  s('275w-beam-spot-ring', '275W Mini Beam Spot with Light Ring', { kind: 'hybrid', ring: [24, 'rgb'], deg: [2, 20], ch: [16, 20], feat: ['gobo:12', 'prism', 'focus', 'frost', 'rainbow'] }),
  s('295w-mini-beam-ring', '295W Mini Beam Spot with LED Ring', { kind: 'beam', ring: [24, 'rgb'], deg: [2, 2], ch: [16, 22], feat: ['gobo:14', 'prism', 'prism2', 'focus'] }),
  s('100w-led-beam', '100W LED Beam 15 Gobos 18 Prism', { kind: 'beam', deg: [3, 3], ch: [13, 16], feat: ['gobo:15', 'prism', 'focus'] }),
  s('120w-beam-spot-aperture', '120W LED Beam Spot with Aperture', { kind: 'spot', ring: [16, 'rgb'], deg: [4, 4], ch: [14, 16], feat: ['gobo:8', 'gobor', 'prism', 'focus'] }),
  s('150w-led-beam-spot', '150W LED Beam Spot', { kind: 'spot', deg: [4, 4], ch: [14, 16], feat: ['gobo:12', 'gobor', 'prism', 'focus'] }),
  s('200w-beam-spot-18prism', '200W LED Beam Spot 18 Prism Rainbow', { kind: 'spot', deg: [3, 3], ch: [16, 18], feat: ['gobo:12', 'gobor', 'prism', 'prism2', 'focus', 'rainbow'] }),
  s('230w-led-spot-zoom', '230W LED Spot Beam Wash Zoom', { kind: 'hybrid', deg: [3, 30], ch: [16, 20], feat: ['gobo:12', 'gobor', 'prism', 'focus', 'zoom', 'frost'] }),
  s('400w-led-cmy-cto', '400W LED Beam Spot Wash CMY CTO', { kind: 'hybrid', deg: [2, 40], ch: [24, 30], feat: ['cmy', 'cto', 'gobo:9', 'gobor', 'gobo2', 'prism', 'prism2', 'frost', 'focus', 'zoom', 'iris', 'dim16'], size: [320, 320, 420] }),
  s('550w-led-profile', '550W LED CMY CTO Profile Spot', { kind: 'profile', deg: [5, 50], ch: [30, 38], feat: ['cmy', 'cto', 'gobo:7', 'gobor', 'gobo2', 'prism', 'frost', 'focus', 'zoom', 'iris', 'blades', 'dim16'], size: [340, 340, 520] }),
  s('600w-led-cutter', '600W Mini LED Cutter CMY CTO with Aperture', { kind: 'profile', ring: [36, 'rgb'], deg: [4, 50], ch: [32, 40], feat: ['cmy', 'cto', 'gobo:7', 'gobor', 'prism', 'frost', 'focus', 'zoom', 'iris', 'blades', 'dim16'], size: [340, 340, 520] }),
  s('650w-ip66-hybrid', '650W IP66 LED Beam Spot Wash CMY CTO', { kind: 'hybrid', deg: [2, 45], ch: [26, 34], feat: ['cmy', 'cto', 'gobo:9', 'gobor', 'prism', 'prism2', 'frost', 'focus', 'zoom', 'rainbow', 'dim16'], size: [380, 380, 480] }),
  s('1200w-led-cutter', '1200W LED CMY CTO Beam Spot Wash Cutter', { kind: 'profile', deg: [4, 55], ch: [36, 44], feat: ['cmy', 'cto', 'gobo:7', 'gobor', 'gobo2', 'anim', 'prism', 'prism2', 'frost', 'focus', 'zoom', 'iris', 'blades', 'dim16'], size: [420, 420, 620] }),
  s('150w-rgbl-beam-wash-backlight', '150W RGBL Beam Wash with 24 Backlight Pixels', { kind: 'wash', leds: [1, 'rgbl'], ring: [24, 'rgb'], deg: [4, 50], ch: [16, 22, 88], pixelFrom: 88 }),
  s('60w-mini-beam-ring', '60W Mini LED Beam with Ring', { kind: 'beam', leds: [1, 'rgbw'], ring: [16, 'rgb'], deg: [3, 3], ch: [13, 16] }),
  s('40w-rgbw-beam-ring', '40W RGBW Beam with Ring', { kind: 'beam', leds: [1, 'rgbw'], ring: [12, 'rgb'], deg: [4, 4], ch: [11, 14] }),
  s('80w-beam-rgb-ring-backlight', '80W RGBW Beam + 48×2W Retro Backlight', { kind: 'beam', leds: [1, 'rgbw'], ring: [48, 'rgb'], deg: [3, 3], ch: [16, 22] }),
  // ---- washes
  s('7x40w-zoom-wash', '7×40W RGBW Beam Wash Zoom', { kind: 'wash', leds: [7, 'rgbw'], deg: [5, 50], ch: [13, 17] }),
  s('12x40w-zoom-wash', '12×40W RGBW Zoom Wash', { kind: 'wash', leds: [12, 'rgbw'], deg: [5, 50], ch: [14, 18] }),
  s('19x10w-wash-ring', '19×10W RGBW Wash with Ring', { kind: 'wash', leds: [19, 'rgbw'], ring: [36, 'rgb'], deg: [8, 50], ch: [16, 22] }),
  s('36x12w-wash', '36×12W RGBW Focusing Wash', { kind: 'wash', leds: [36, 'rgbw'], deg: [10, 55], ch: [16, 18], size: [400, 400, 300] }),
  // ---- multi heads, UFO, spider, tilt bars
  s('6x40w-ufo', 'UFO 6×40W Meteor Beam', { kind: 'ufo', leds: [6, 'rgbw'], ch: [14, 20, 32], pixelFrom: 32, size: [450, 450, 180] }),
  s('4x40w-4-head-ring', '4×40W 4-Head Beam with Ring', { kind: 'multihead', leds: [4, 'rgbw'], aux: [24, 'rgb', 'ring'], ch: [16, 20, 31], pixelFrom: 31 }),
  s('4x80w-infinite-ring', '4×80W Beam with Ring, Infinite Rotation', { kind: 'multihead', leds: [4, 'rgbw'], aux: [32, 'rgb', 'ring'], ch: [16, 20, 31], pixelFrom: 31 }),
  s('10x40w-10-head', '10×40W 10-Head Beam with Strobe', { kind: 'tiltbar', leds: [10, 'rgbw'], aux: [10, 'ww', 'line'], tilt: 180, ch: [16, 46], pixelFrom: 46 }),
  s('10x60w-moving-bar', '10×60W Beam Wash Strobe Moving Bar', { kind: 'tiltbar', leds: [10, 'rgbw'], aux: [20, 'cw', 'line'], tilt: 180, ch: [14, 56], pixelFrom: 56, size: [1000, 140, 160] }),
  s('10x80w-electrodeless', '10×80W Double-sided Electrodeless Beam Bar', { kind: 'tiltbar', leds: [10, 'rgbw'], aux: [36, 'ww', 'line'], tilt: 360, ch: [16, 60], pixelFrom: 60, size: [1100, 160, 180] }),
  s('12x80w-lifting-ring', '12×80W Infinite Lifting Ring Beam', { kind: 'ufo', leds: [12, 'rgbw'], aux: [48, 'ww', 'ring'], ch: [16, 60], pixelFrom: 60, size: [600, 600, 200] }),
  s('6x10w-six-arm', '6×10W Six-Arm Magic Ball', { kind: 'multihead', leds: [6, 'rgbw'], aux: [6, 'white', 'ring'], ch: [16, 22] }),
  s('8x6w-mini-spider', '8×6W Mini Spider', { kind: 'spider', leds: [8, 'rgbw'], grid: [2, 4], ch: [13, 16] }),
  s('12x10w-4-head-laser', '12×10W 4-Head Beam with Ring & Lasers', { kind: 'multihead', leds: [12, 'rgbw'], aux: [24, 'rgb', 'ring'], ch: [18, 26] }),
  // ---- retro, matrix, strobes, bars, pars
  s('6x50w-retro-telescopic', '6-Eye 6×50W W/WW Retro Telescopic', { kind: 'retro', leds: [6, 'wwcw'], aux: [72, 'rgb'], ch: [10, 18] }),
  s('300w-retro-bee-eye', '300W Retro Bee Eye Moving Head', { kind: 'beeeye', leds: [7, 'ww'], ring: [72, 'rgb'], deg: [8, 8], ch: [16, 24] }),
  s('3x80w-golden-retro', '3×80W Golden Retro + RGB Strobe + Beam', { kind: 'retro', leds: [3, 'ww'], aux: [36, 'rgb'], ch: [12, 24] }),
  s('25x30w-matrix-beam', '25×30W RGBW Matrix Beam Star Sky', { kind: 'matrix', leds: [25, 'rgbw'], grid: [5, 5], aux: [40, 'rgb', 'ring'], ch: [10, 108], pixelFrom: 108 }),
  s('36x4w-vertical-strobe', '36×4W RGBW Vertical Beam Strobe Wash', { kind: 'bar', leds: [36, 'rgbw'], aux: [12, 'cw'], ch: [12, 156], pixelFrom: 156, size: [1000, 120, 110] }),
  s('144x3w-pixel-strobe', '144×3W Pixel Strobe', { kind: 'matrix', leds: [48, 'rgb'], grid: [4, 12], ch: [8, 144], pixelFrom: 144 }),
  s('1200w-ip65-strobe', '1200W IP65 RGBW Strobe', { kind: 'strobe', leds: [24, 'rgbw'], aux: [12, 'cw'], ch: [10, 26] }),
  s('10x12w-cob-blinder-bar', '10×12W Warm White COB Blinder Bar', { kind: 'blinder', leds: [10, 'ww'], grid: [1, 10], ch: [2, 10], size: [1000, 120, 120] }),
  s('10x35w-halogen-strobe-bar', '10×35W Halogen Look Strobe Bar', { kind: 'blinder', leds: [10, 'ww'], grid: [1, 10], ch: [2, 12], size: [1000, 140, 140] }),
  s('44x12w-floodlight', '44×12W RGBW Floodlight', { kind: 'panel', leds: [44, 'rgbw'], ch: [8, 12], size: [600, 320, 110] }),
  s('18x10w-ip65-wall-washer', '18×10W IP65 Wall Washer', { kind: 'bar', leds: [18, 'rgbw'], deg: [25, 25], ch: [8, 72], pixelFrom: 72 }),
  s('100w-cob-par-rgb-aux', '100W W/WW COB PAR with RGB Auxiliary', { kind: 'cob', leds: [1, 'wwcw'], aux: [24, 'rgb', 'ring'], ch: [6, 10] }),
  s('14x6w-par', '14×6W RGBW PAR', { kind: 'par', leds: [14, 'rgbw'], deg: [25, 25], ch: [4, 8] }),
  s('10w-laser-mh-ring', '10W RGB Moving Head Laser with Ring', { kind: 'lasermh', ring: [16, 'rgb'], ch: [16, 23] }),
  s('ilda-12w-laser-mh', 'ILDA 12W Laser Moving Head with RGB Ring', { kind: 'lasermh', ring: [24, 'rgb'], ch: [18, 28] }),
  s('15w-ilda-laser', '15W RGB ILDA Animation Laser', { kind: 'laser', ch: [16, 24] }),
];
