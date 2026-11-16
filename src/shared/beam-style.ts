// What kind of light a fixture throws – decides how its cone looks in the 3D view:
//   wash  – wide, soft-edged, even (MAC Aura, LED washes, PARs, blinders)
//   spot  – medium, gobos, crisp edge (profiles, spots, hybrids with a gobo wheel)
//   beam  – very narrow, hard, bright pencil (Sharpy, Pointe, "… Beam")
// Derived from the fixture data (type, model name, gobo/zoom channels, beam angle),
// because neither OFL nor QLC+ store this explicitly.

import type { FixtureDef } from './fixture-types.ts';

export type BeamStyle = 'wash' | 'spot' | 'beam';

const BEAM_NAMES = /\b(beam|sharpy|pointe|b-?eye|spikie|ledbeam|hybrid)\b|beam\b/i;
const WASH_NAMES = /\b(wash|aura|par|blinder|flood|cyc|batten|matrix)\b/i;

export function beamStyle(def: FixtureDef): BeamStyle {
  const name = `${def.manufacturer} ${def.model}`;
  if (def.type === 'par' || def.type === 'blinder' || def.type === 'bar' || def.type === 'pixelbar' || def.type === 'strobe' || def.type === 'dimmer') return 'wash';
  const attrs = new Set(def.modes.flatMap((m) => m.channels.map((c) => c.attr)));
  const [, max] = def.physical.beamDeg ?? [0, 0];
  if (BEAM_NAMES.test(name) || (max > 0 && max <= 7)) return 'beam';
  if (attrs.has('gobo')) return 'spot';
  if (WASH_NAMES.test(name)) return 'wash';
  // No gobo wheel: an LED wash (colour mixing or a zoom that starts wide).
  if (attrs.has('red') || attrs.has('cyan') || attrs.has('zoom')) return 'wash';
  return 'spot';
}

/** Beam angle range in degrees, with sensible defaults per style. */
export function beamRange(def: FixtureDef, style = beamStyle(def)): [number, number] {
  const d = def.physical.beamDeg;
  if (style === 'beam') {
    // Beam fixtures are drawn as tight pencils even if the data lists a wide zoom
    // (often field angle or the spot mode of a hybrid).
    const lo = Math.min(d?.[0] || 2, 2.5);
    return [lo, Math.max(lo, Math.min(d?.[1] || 4, 6))];
  }
  if (d && d[1] > 0) return [Math.max(0.5, d[0]), Math.max(d[0], d[1])];
  return style === 'wash' ? [12, 40] : [6, 25];
}
