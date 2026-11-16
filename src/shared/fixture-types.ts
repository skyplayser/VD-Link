// VD-Link unified fixture format.
// Every importer (Open Fixture Library, QLC+, later GDTF and the built-in editor)
// converts into this one shape, so the runtime only has to understand one format.

export type FixtureType =
  | 'movinghead'
  | 'scanner'
  | 'par'
  | 'bar'
  | 'pixelbar'
  | 'strobe'
  | 'blinder'
  | 'laser'
  | 'effect'
  | 'dimmer'
  | 'hazer'
  | 'smoke'
  | 'other';

export type Attr =
  | 'pan'
  | 'tilt'
  | 'dimmer'
  | 'shutter'
  | 'red'
  | 'green'
  | 'blue'
  | 'white'
  | 'amber'
  | 'uv'
  | 'cyan'
  | 'magenta'
  | 'yellow'
  | 'lime'
  | 'colorWheel'
  | 'gobo'
  | 'goboRotation'
  | 'zoom'
  | 'focus'
  | 'prism'
  | 'frost'
  | 'speed'
  | 'control'
  | 'other';

export type CapKind =
  | 'open'
  | 'closed'
  | 'strobe'
  | 'color'
  | 'gobo'
  | 'prism'
  /** Intensity ramp inside a combined channel (e.g. "Off / Dimmer / Strobe / Open"). */
  | 'dimmer'
  | 'generic';

/** A DMX value range of one channel with a meaning. */
export interface Capability {
  from: number;
  to: number;
  kind: CapKind;
  /** '#rrggbb' for color wheel / color macro slots. */
  color?: string;
  /** 1-based gobo slot (0 = open). */
  gobo?: number;
  /** Generic gobo motif id from src/shared/gobo-library.ts (e.g. 'dots-ring', 'breakup'). */
  goboArt?: string;
  /** Strobe speed in Hz at `from` and `to`. */
  hz?: [number, number];
  label?: string;
}

export interface ModeChannel {
  name: string;
  attr: Attr;
  /** 0 = coarse byte, 1 = fine byte, 2 = ultra fine. */
  byte: 0 | 1 | 2;
  /** Inverted range (e.g. zoom big→small, strobe fast→slow). */
  invert?: boolean;
  default?: number;
  /**
   * Pixel / cell this channel belongs to (0-based, counted over all cell groups of the
   * fixture model in order). Channels without `cell` act on the whole fixture.
   */
  cell?: number;
  /** Channel for a whole cell group (e.g. "Ring red" for all LEDs of a halo ring). */
  group?: number;
  /** Channel for several cells (e.g. one dimmer for lamps 1+2 of a blinder). */
  cells?: number[];
  caps?: Capability[];
}

export interface FixtureMode {
  name: string;
  channels: ModeChannel[];
}

export interface FixturePhysical {
  /** Width, height, depth in millimetres. */
  dims?: [number, number, number];
  weightKg?: number;
  /** Beam angle min/max in degrees. */
  beamDeg?: [number, number];
  panDeg?: number;
  tiltDeg?: number;
}

export interface FixtureSource {
  db: 'vd' | 'ofl' | 'qlcplus' | 'gdtf' | 'user';
  license: string;
  authors?: string[];
  url?: string;
  /** false = channel layout written from specs / typical layout, not checked on the device. */
  verified?: boolean;
  /** Where the data comes from (shown in the library). */
  note?: string;
}

/** How the lamp looks in 3D (optional – derived from type/channels when missing). */
export type BodyKind =
  | 'movinghead'
  | 'tiltbar' // head is a long bar that only tilts (matrix / strobe moving bars)
  | 'par'
  | 'cob'
  | 'bar' // static batten / pixel bar / strobe bar
  | 'blinder'
  | 'strobe'
  | 'panel' // soft light panel
  | 'tube' // pixel tube (Astera style)
  | 'fresnel'
  | 'profile' // ellipsoidal / follow spot
  | 'retro' // round retro light with many small LEDs
  | 'ufo' // round body with several beam lenses
  | 'laser'
  | 'effect'
  | 'scanner' // mirror scanner / moving mirror: static body, the mirror moves the beam
  | 'multibar' // bar with several small heads that tilt (and pan) on their own
  | 'spider' // yoke with 2+ LED bars that tilt against each other
  | 'arms' // hub with radial arms, a small head at the end of each arm
  | 'derby' // derby / moonflower / ball: dome with many lenses, rotating
  | 'follow' // follow spot (on a tripod when standing)
  | 'gigbar'; // several lamps on one T-bar (on a tripod when standing)

/** 'orb': ball-shaped head (MagicDot style, endless heads; on a derby: full ball). */
export type HeadKind = 'spot' | 'beam' | 'wash' | 'beeeye' | 'matrix' | 'profile' | 'orb';

/** A set of LEDs / lenses on the front face that can light up on their own. */
export interface CellGroup {
  layout: 'grid' | 'ring' | 'hex' | 'line' | 'circle';
  count: number;
  rows?: number;
  cols?: number;
  /** Emitter colour: rgb(w) mix or a fixed white. */
  color: 'rgb' | 'rgbw' | 'ww' | 'cw' | 'white' | 'amber' | 'uv';
  shape?: 'disc' | 'square';
  /** true = the cell throws its own beam (lens), false = it only glows (pixel, halo ring). */
  beam?: boolean;
  /** Beam angle of a cell in degrees. */
  deg?: number;
  /** 0..1 – size of the area the group covers on the front (ring: radius). */
  extent?: number;
}

export interface FixtureModel {
  body: BodyKind;
  head?: HeadKind;
  /** Width, height, depth of the head / body in millimetres (rough). */
  sizeMm?: [number, number, number];
  cells?: CellGroup[];
  /** Halogen / tungsten look (warm, no colour mixing). */
  tungsten?: boolean;
  /** Sub-heads of multibar / spider / arms / gigbar (cells are shared out by position). */
  heads?: number;
  /** Barn doors on the front (default on for fresnel / PC). */
  doors?: boolean;
}

export interface FixtureDef {
  id: string;
  manufacturer: string;
  model: string;
  type: FixtureType;
  physical: FixturePhysical;
  modes: FixtureMode[];
  source: FixtureSource;
  visual?: FixtureModel;
}

/** Light summary used by the fixture browser (index file). */
export interface FixtureIndexEntry {
  id: string;
  manufacturer: string;
  model: string;
  type: FixtureType;
  modes: { name: string; channels: number }[];
  db: FixtureSource['db'];
  /** Relative path of the bundle that contains the full definition. */
  file: string;
  /** Set when this entry is a re-branded clone of another fixture. */
  aliasOf?: string;
  /** false = channel layout not checked on the device (see FixtureSource.verified). */
  verified?: boolean;
}
