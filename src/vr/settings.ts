// Settings of the VR viewer (stored per headset in the browser).

export type VrQuality = 'low' | 'mid' | 'high';
export type TurnMode = 30 | 45 | 0;

export interface VrSettings {
  quality: VrQuality;
  /** Left stick walks smoothly (with comfort vignette). */
  walk: boolean;
  /** Snap turn in degrees, 0 = smooth turn. */
  turn: TurnMode;
  /** Seated: eye height raised to standing height. */
  seated: boolean;
  /** Haze multiplier 0…1. */
  haze: number;
  /** Comfort vignette while walking/turning smoothly. */
  vignette: boolean;
  /** Show the audience figures (off = free view, e.g. on the dance floor). */
  crowd: boolean;
  /** Both eyes in one pass (faster; switch off if the picture stays black). */
  multiview: boolean;
  /** Base light of the room 0 (off) … 3 (bright) – to find your way in a dark club. */
  ambient: number;
}

/** Intensity of the room light per level (0.25 = the dark club as on the desktop). */
export const AMBIENT = [0.25, 0.9, 1.8, 3.0];
export const AMBIENT_LABEL = ['Aus', 'Wenig', 'Mittel', 'Hell'];

const KEY = 'vdlink.vr';

/** Standalone headsets (Pico, Quest …) get the light quality, PCs the full one. */
export const isStandalone = () => /OculusBrowser|Quest|Pico|PicoBrowser|Android|Wolvic/i.test(navigator.userAgent);

export function loadSettings(): VrSettings {
  const base: VrSettings = { quality: isStandalone() ? 'low' : 'high', walk: true, turn: 30, seated: false, haze: 0.6, vignette: true, crowd: false, multiview: true, ambient: 2 };
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<VrSettings>;
    return {
      quality: s.quality === 'low' || s.quality === 'mid' || s.quality === 'high' ? s.quality : base.quality,
      walk: typeof s.walk === 'boolean' ? s.walk : base.walk,
      turn: s.turn === 30 || s.turn === 45 || s.turn === 0 ? s.turn : base.turn,
      seated: typeof s.seated === 'boolean' ? s.seated : base.seated,
      haze: typeof s.haze === 'number' && s.haze >= 0 && s.haze <= 1 ? s.haze : base.haze,
      vignette: typeof s.vignette === 'boolean' ? s.vignette : base.vignette,
      crowd: typeof s.crowd === 'boolean' ? s.crowd : base.crowd,
      multiview: typeof s.multiview === 'boolean' ? s.multiview : base.multiview,
      ambient: s.ambient === 0 || s.ambient === 1 || s.ambient === 2 || s.ambient === 3 ? s.ambient : base.ambient,
    };
  } catch {
    return base;
  }
}

export function saveSettings(s: VrSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode – keep for this session */
  }
}

export const QUALITY_LABEL: Record<VrQuality, string> = { low: 'Sparsam', mid: 'Ausgewogen', high: 'Hoch' };
export const TURN_LABEL: Record<string, string> = { 30: '30°-Schritte', 45: '45°-Schritte', 0: 'Gleitend' };
