// UKING (Shenzhen) – spec sheets from the maker's shop (uking-online.com, 11/2026):
// light source, beam angle, pan/tilt and channel counts. Channel layouts follow the
// typical layout of the fixture class (verified: false) except where noted.
// Already in the library from OFL/QLC+ and therefore skipped here: ZQ02021, ZQ02102,
// ZQ02115, ZQ02255, ZQ02367, ZQ01061 (B117).

import type { ModeChannel } from '../../src/shared/fixture-types.ts';
import type { Spec } from './archetype.ts';

const U = 'https://www.uking-online.com/products/';
const M = 'UKing';
const s = (key: string, model: string, rest: Omit<Spec, 'man' | 'key' | 'model'>): Spec => ({ man: M, key, model, ...rest });

// ---- ZQ06133 "Matrix Moving Head": tilt-only bar, 4 × 9 warm-white lenses, each
// surrounded by a square RGB pixel (DMXControl forum, thread 18221: 146CH = tilt,
// tilt fine, 4×9 RGB matrix from ch 3, 4×9 warm-white matrix from ch 111).
const zq06133_146: ModeChannel[] = [
  { name: 'Tilt', attr: 'tilt', byte: 0 },
  { name: 'Tilt fine', attr: 'tilt', byte: 1 },
  ...Array.from({ length: 36 }, (_, i) => [
    { name: `RGB ${i + 1} Red`, attr: 'red', byte: 0, cell: i } as ModeChannel,
    { name: `RGB ${i + 1} Green`, attr: 'green', byte: 0, cell: i } as ModeChannel,
    { name: `RGB ${i + 1} Blue`, attr: 'blue', byte: 0, cell: i } as ModeChannel,
  ]).flat(),
  ...Array.from({ length: 36 }, (_, i) => ({ name: `Warm white ${i + 1}`, attr: 'white', byte: 0, cell: 36 + i }) as ModeChannel),
];
const zq06133_16: ModeChannel[] = [
  { name: 'Tilt', attr: 'tilt', byte: 0 },
  { name: 'Tilt fine', attr: 'tilt', byte: 1 },
  { name: 'Tilt speed', attr: 'speed', byte: 0 },
  { name: 'Dimmer', attr: 'dimmer', byte: 0 },
  { name: 'Strobe', attr: 'shutter', byte: 0 },
  { name: 'Red', attr: 'red', byte: 0, group: 0 },
  { name: 'Green', attr: 'green', byte: 0, group: 0 },
  { name: 'Blue', attr: 'blue', byte: 0, group: 0 },
  { name: 'Warm white', attr: 'white', byte: 0, group: 1 },
  { name: 'RGB colour macro', attr: 'other', byte: 0 },
  { name: 'RGB effect', attr: 'other', byte: 0 },
  { name: 'RGB effect speed', attr: 'speed', byte: 0 },
  { name: 'White effect', attr: 'other', byte: 0 },
  { name: 'White effect speed', attr: 'speed', byte: 0 },
  { name: 'Auto / sound', attr: 'control', byte: 0 },
  { name: 'Reset', attr: 'control', byte: 0 },
];
const zq06133_6: ModeChannel[] = [
  { name: 'Tilt', attr: 'tilt', byte: 0 },
  { name: 'Dimmer', attr: 'dimmer', byte: 0 },
  { name: 'Strobe', attr: 'shutter', byte: 0 },
  { name: 'RGB colour macro', attr: 'other', byte: 0 },
  { name: 'Warm white', attr: 'white', byte: 0, group: 1 },
  { name: 'Auto / sound', attr: 'control', byte: 0 },
];

export const UKING: Spec[] = [
  s('zq06133', 'ZQ06133 Matrix Moving Head 36 WW + RGB', {
    kind: 'tiltbar', leds: [36, 'ww'], aux: [36, 'rgb', 'grid'], grid: [4, 9], tilt: 180, ch: [6, 16, 146], deg: [8, 8], cellDeg: 8, size: [560, 250, 150],
    url: 'https://forum.dmxcontrol-projects.org/thread/18221-ddf-f%C3%BCr-matrix-moving-head-erstellen-uking-zq06133/',
    note: '146CH laut DMXControl-Forum (Tilt, Tilt fein, 4×9 RGB ab Kanal 3, 4×9 Warmweiß ab Kanal 111); 6CH/16CH nach typischem Schema.',
    modes: [
      { name: '6CH', channels: zq06133_6 },
      { name: '16CH', channels: zq06133_16 },
      { name: '146CH Pixel', channels: zq06133_146 },
    ],
  }),
  s('zq01339', 'ZQ01339 50W PAR (RGB + white ring)', { kind: 'par', leds: [72, 'rgb'], ring: [81, 'white'], deg: [25, 25], ch: [8, 12, 23], url: U + 'uking-zq01339-50w-par-light' }),
  s('zq02798', 'ZQ02798 Party Light 6×10W + strobe + laser', { kind: 'multihead', leds: [6, 'rgbw'], aux: [12, 'white', 'ring'], ch: [24], url: U + 'uking-zq02798-party-light' }),
  s('zq06144', 'ZQ06144 180W Retro Light', { kind: 'retro', leds: [96, 'ww'], aux: [192, 'rgb'], ch: [8, 23, 106, 300], pixelFrom: 106, tilt: 180, url: U + 'uking-zq06144-180w-retro-light' }),
  s('zq09012', 'ZQ09012 200W Dual Colour COB Spotlight', { kind: 'cob', leds: [1, 'wwcw'], deg: [65, 65], ch: [2, 3], url: U + 'uking-zq09012-200w-dual-color-rgbwa-uv-cob-spotlight' }),
  s('zq02825', 'ZQ02825 295W Beam Pro', { kind: 'beam', deg: [2, 2], ch: [16], feat: ['gobo:14', 'prism', 'focus', 'frost', 'rainbow'], url: U + 'uking-zq02825-295w-beam-pro' }),
  s('splashpwr-1', 'SplashPWR 1 Waterproof 140W PAR', { kind: 'par', leds: [7, 'rgbwauv'], deg: [25, 25], ch: [6, 10], url: U + 'uking-zq01249-waterproof-mobile-par-light' }),
  s('zq02578', 'ZQ02578 18W Mini Moving Head', { kind: 'spot', leds: [6, 'rgbw'], ch: [9], pan: 360, url: U + 'uking-zq02578-moving-head-light' }),
  s('zq02040', 'ZQ02040 10W Mini Beam', { kind: 'beam', leds: [1, 'rgbw'], deg: [1, 1], tilt: 205, ch: [11, 13], url: U + 'b28-moving-head-light-mini-10w-spot-lighting' }),
  s('zq02015', 'ZQ02015 36W Mini Beam with RGB ring', { kind: 'spot', ring: [12, 'rgb'], deg: [15, 15], ch: [9, 11], feat: ['gobo:8', 'gobor'], url: U + 'b243-50w-moving-head-light-with-led-belt-black' }),
  s('zq02001', 'ZQ02001 10W Mini Beam', { kind: 'spot', deg: [12, 12], ch: [9, 11], feat: ['gobo:8'], url: U + 'b242-led-30w-moving-head-light-spot-color-gobos-light' }),
  s('zq02354', 'ZQ02354 28W Mini Moving Head 7×4W', { kind: 'wash', leds: [7, 'rgbw'], deg: [30, 30], tilt: 180, ch: [9, 14], url: U + 'uking-105w-rgbw-7leds-stage-lights-moving-head-dmx-dj-disco-' }),
  s('zq06143', 'ZQ06143 290W Wash 24×12W', { kind: 'tiltbar', leds: [24, 'rgbw'], grid: [2, 12], deg: [2, 2], tilt: 150, ch: [7, 13, 99, 105], pixelFrom: 99, url: U + 'uking-zq06143-wash' }),
  s('zq01335', 'ZQ01335 350W Retro PAR 7×50W gold COB', { kind: 'retro', leds: [7, 'ww'], aux: [189, 'rgb'], deg: [120, 120], ch: [16, 37], url: U + 'uking-zq01335-par-light-1' }),
  s('zq02873', 'ZQ02873 Moving Laser 6×RGB', { kind: 'lasermh', deg: [5, 60], tilt: 180, ch: [15, 27], url: U + 'uking-zq02873-moving-head-light-1' }),
  s('zq02109', 'ZQ02109 225W Moving Head 7×30W + RGB ring', { kind: 'wash', leds: [7, 'rgbw'], ring: [30, 'rgb'], deg: [4.5, 45], ch: [30, 42, 58], pixelFrom: 42, url: U + 'uking-zq02109-moving-head-light-1' }),
  s('zq02823', 'ZQ02823 300W Beam Pro with RGB ring', { kind: 'beam', ring: [31, 'rgb'], deg: [4, 4], ch: [16, 22], feat: ['gobo:14', 'prism', 'prism2', 'focus', 'frost', 'rainbow'], url: U + 'uking-zq02823-beam-1' }),
  s('zq06139', 'ZQ06139 75W Waterproof Wash Bar 24×3W', { kind: 'bar', leds: [24, 'rgb'], deg: [25, 25], ch: [2, 3, 4, 6, 7, 12, 24], pixelFrom: 24, url: U + 'uking-zq06139-waterproof-wash' }),
  s('zq01334', 'ZQ01334 385W Retro Wash 6×50W', { kind: 'retro', leds: [6, 'ww'], aux: [168, 'rgb'], deg: [120, 120], ch: [15, 33], url: U + 'uking-zq01334-wash' }),
  s('zq02623', 'ZQ02623 Party Light 6×10W + laser', { kind: 'multihead', leds: [6, 'rgbw'], ch: [24], url: U + 'uking-zq02623-moving-head-light' }),
  s('zq02821', 'ZQ02821 250W Beam Pro with RGB ring', { kind: 'beam', ring: [29, 'rgb'], deg: [2.3, 2.3], ch: [18, 22], feat: ['gobo:14', 'prism', 'prism2', 'focus', 'frost', 'rainbow'], url: U + 'uking-zq02821-beam' }),
  s('zq02372', 'ZQ02372 200W Beam with RGB ring', { kind: 'beam', ring: [31, 'rgb'], deg: [4, 4], ch: [16, 22], feat: ['gobo:14', 'prism'], url: U + 'uking-zq02372-beam' }),
  s('zq02371', 'ZQ02371 200W Beam Spot Zoom', { kind: 'hybrid', deg: [8, 25], tilt: 255, ch: [18], feat: ['gobo:12', 'gobor', 'prism', 'focus', 'zoom'], url: U + 'uking-zq02371-beam-pro' }),
  s('zq02622', 'ZQ02622 Moving Laser 2W full colour', { kind: 'lasermh', deg: [1, 50], ch: [28], url: U + 'uking-zq02622-moving-head-light' }),
  s('zq06200', 'ZQ06200 160W Wash Panel 80×2W', { kind: 'panel', leds: [80, 'rgb'], deg: [45, 45], ch: [24], size: [500, 250, 90], url: U + 'uking-zq06200-wash' }),
  s('zq02620', 'ZQ02620 50W Moving Head 4×3W + ring + laser', { kind: 'beeeye', leds: [4, 'rgbw'], ring: [28, 'rgb'], deg: [2, 2], tilt: 180, ch: [19, 25], url: U + 'uking-zq02620-moving-head-light' }),
  s('zq01553', 'ZQ01553 210W Waterproof PAR 14×15W', { kind: 'par', leds: [14, 'rgbw'], deg: [25, 25], ch: [4, 9], url: U + 'uking-zq01553-waterproof-par-light' }),
  s('zq06140', 'ZQ06140 100W Waterproof Wash Bar 168 RGB + 168 W', { kind: 'bar', leds: [56, 'rgb'], aux: [56, 'white'], ch: [2, 3, 4, 6, 8, 112, 114], pixelFrom: 112, url: U + '100w-336leds-rgb-waterproof-wall-washer-light-with-strobe-fa' }),
  s('zq03268', 'ZQ03268 Laser 2W full colour', { kind: 'laser', deg: [1, 50], ch: [16], url: U + '3d-animation-laser-machine-with-bluetooth-app-rgb-party-lase' }),
  s('zq02103', 'ZQ02103 190W Hybrid Moving Head 19×10W', { kind: 'beeeye', leds: [19, 'rgbw'], deg: [5, 45], ch: [16, 24], feat: ['rot'], url: U + '36pcs-focusing-light-moving-head-light-stage-lighting-effect' }),
  s('zq09013', 'ZQ09013 200W RGBWA+UV COB Spotlight', { kind: 'cob', leds: [1, 'rgbwauv'], deg: [65, 65], ch: [6, 10], url: U + 'cob-200w-linear-spotlights-with-barn-doors-rgbwa-uv-6in1-cob' }),
  s('zq02359', 'ZQ02359 300W Party Light 6×50W', { kind: 'multihead', leds: [6, 'rgbw'], deg: [2, 2], tilt: 320, ch: [14, 16], url: U + '240w-high-brightness-moving-head-light-6-leds-rgbw-360rotati' }),
  s('zq02356', 'ZQ02356 175W Moving Head 7×25W Zoom', { kind: 'wash', leds: [7, 'rgbw'], deg: [4.5, 45], tilt: 255, ch: [23, 35, 51], pixelFrom: 35, url: U + '7pcs-25w-rgbw-leds-bees-eye-wash-moving-head-dj-light' }),
  s('zq02357', 'ZQ02357 230W Beam Pro with strip', { kind: 'beam', ring: [24, 'rgb'], deg: [2.3, 2.3], ch: [18], feat: ['gobo:14', 'prism', 'focus', 'frost'], url: U + 'mini-230w-led-moving-head-rgbw-stage-lights-with-strip-light' }),
  s('zq01528', 'ZQ01528 110W RGBWA+UV Wireless Battery PAR', { kind: 'par', leds: [6, 'rgbwauv'], deg: [25, 25], ch: [6, 10], url: U + 'wireless-built-in-battery-remote-control-wifi-par-light-wash' }),
  s('zq02314', 'ZQ02314 250W Waterproof Beam Pro', { kind: 'beam', deg: [2, 2], ch: [14, 16], feat: ['gobo:14', 'prism', 'focus'], url: U + 'dragon-king-led300-waterproof-beam-moving-head-light-for-dj-' }),
  s('zq06121', 'ZQ06121 200W Retro Light 768 RGB + 96 W', { kind: 'retro', leds: [96, 'cw'], aux: [96, 'rgb'], ch: [4, 6, 12, 144, 154], pixelFrom: 144, url: U + '768pcs-0-5w-three-in-one-color-mixing-rainbow-effect-highlig' }),
  s('zq02341', 'ZQ02341 80W Mini Beam', { kind: 'beam', deg: [2.8, 2.8], tilt: 180, ch: [12], feat: ['gobo:12', 'prism'], url: U + 'zq02341-150w-beam-moving-head-light-stage-light-for-dj-conce' }),
  s('zq01496', 'ZQ01496 200W COB PAR 2-Eye', { kind: 'cob', leds: [2, 'wwcw'], ch: [8], url: U + '200w-double-color-two-eyes-cob-par-light-fill-light-lighting' }),
  s('zq02253', 'ZQ02253 285W Moving Head 19×15W Zoom', { kind: 'wash', leds: [19, 'rgbw'], deg: [5, 60], ch: [16, 24, 32], pixelFrom: 99, url: U + '19pcs-focusing-19pcs15w-4-in-1-led-dmx512-moving-head-par-li' }),
  s('zq06079', 'ZQ06079 250W Swing Wash Bar 10×25W', { kind: 'tiltbar', leds: [10, 'rgbw'], deg: [2, 2], tilt: 120, ch: [7, 13, 43], pixelFrom: 43, url: U + '250w-swing-dot-beam-wall-washer-light-10pcs-25w-led-rgbw-4in' }),
  s('zq02042', 'ZQ02042 230W Beam 7R', { kind: 'beam', deg: [6, 6], tilt: 230, ch: [16, 20], feat: ['gobo:14', 'prism', 'focus', 'frost', 'rainbow'], url: U + '230w-stage-moving-head-light-15-gobos-and-14-colors-rainbow-' }),
  s('zq01026', 'ZQ01026 24W Mobile Battery PAR', { kind: 'par', leds: [12, 'rgbw'], deg: [40, 40], ch: [8], url: U + '12pcs-rgbw-4-in-1-led-built-in-battery-par-light-strobe-ligh' }),
  s('zq02011', 'ZQ02011 85W Mini Beam', { kind: 'beam', deg: [7, 7], tilt: 180, ch: [11, 13], feat: ['gobo:12', 'prism'], url: U + '85w-gobo-moving-head-stage-light-rgbw-dmx-led-beam-spot-ligh' }),
  s('zq01417', 'ZQ01417 180W Waterproof PAR 18×10W', { kind: 'par', leds: [18, 'rgbw'], deg: [25, 25], ch: [4, 8], url: U + 'zq01417-uking-stage-lights-waterproof-ip65-leds-par-light-fo' }),
  s('zq02229', 'ZQ02229 250W Beam Pro Zoom', { kind: 'hybrid', deg: [2, 25], ch: [16], feat: ['gobo:14', 'prism', 'focus', 'frost', 'zoom', 'rainbow'], url: U + 'high-brightness-rainbow-lighting-prism-pattern-light-beam-li' }),
  s('zq01424', 'ZQ01424 85W PAR 14×6W', { kind: 'par', leds: [14, 'rgbw'], deg: [25, 25], ch: [4, 8], url: U + 'par-light-stage-light-4-in-1-rgbw-14-leds-stage-effect-light' }),
  s('zq06017', 'ZQ06017 Wash Bar 24×3W', { kind: 'bar', leds: [24, 'rgb'], deg: [25, 25], ch: [2, 3, 4, 6, 7, 12, 24], pixelFrom: 24, url: U + 'b354-led-bar-rgb-24-leds-wall-light-with-remote-controller' }),
  s('zq01069', 'ZQ01069 145W PAR 18×8W', { kind: 'par', leds: [18, 'rgbw'], deg: [25, 25], ch: [4, 8], url: U + 'b35-par-can-rgbw-18-leds-par-light' }),
];
