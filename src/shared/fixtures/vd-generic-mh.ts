import type { FixtureDef } from '../fixture-types.ts';

/** Built-in reference fixture used by the spike rig and the DMX test sender. */
export const VD_GENERIC_MH: FixtureDef = {
  id: 'vd:generic-moving-head',
  manufacturer: 'VD-Link',
  model: 'Generic Moving Head 16ch',
  type: 'movinghead',
  physical: { dims: [280, 420, 220], weightKg: 12, beamDeg: [4, 30], panDeg: 540, tiltDeg: 270 },
  source: { db: 'vd', license: 'EPL-2.0' },
  modes: [
    {
      name: '16ch',
      channels: [
        { name: 'Pan', attr: 'pan', byte: 0, default: 128 },
        { name: 'Pan fine', attr: 'pan', byte: 1 },
        { name: 'Tilt', attr: 'tilt', byte: 0, default: 128 },
        { name: 'Tilt fine', attr: 'tilt', byte: 1 },
        { name: 'Speed', attr: 'speed', byte: 0 },
        { name: 'Dimmer', attr: 'dimmer', byte: 0 },
        {
          name: 'Shutter',
          attr: 'shutter',
          byte: 0,
          default: 8,
          caps: [
            { from: 0, to: 7, kind: 'closed' },
            { from: 8, to: 15, kind: 'open' },
            { from: 16, to: 131, kind: 'strobe', hz: [1, 20] },
            { from: 132, to: 255, kind: 'open' },
          ],
        },
        { name: 'Red', attr: 'red', byte: 0 },
        { name: 'Green', attr: 'green', byte: 0 },
        { name: 'Blue', attr: 'blue', byte: 0 },
        { name: 'White', attr: 'white', byte: 0 },
        {
          name: 'Gobo',
          attr: 'gobo',
          byte: 0,
          caps: [
            { from: 0, to: 15, kind: 'open' },
            { from: 16, to: 47, kind: 'gobo', gobo: 1 },
            { from: 48, to: 79, kind: 'gobo', gobo: 2 },
            { from: 80, to: 111, kind: 'gobo', gobo: 3 },
            { from: 112, to: 143, kind: 'gobo', gobo: 4 },
            { from: 144, to: 255, kind: 'open' },
          ],
        },
        { name: 'Zoom', attr: 'zoom', byte: 0 },
        {
          name: 'Prism',
          attr: 'prism',
          byte: 0,
          caps: [
            { from: 0, to: 127, kind: 'open' },
            { from: 128, to: 255, kind: 'prism' },
          ],
        },
        { name: 'Focus', attr: 'focus', byte: 0 },
        { name: 'Control', attr: 'control', byte: 0 },
      ],
    },
  ],
};
