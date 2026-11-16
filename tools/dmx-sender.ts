// DMX test sender – behaves like a lighting console on the network.
//
//   npm run dmx-sender -- --proto artnet --target 127.0.0.1
//   npm run dmx-sender -- --proto sacn                 (multicast)
//   npm run dmx-sender -- --proto sacn --target 192.168.1.20 --priority 120
//   npm run dmx-sender -- --show demo                  (same show as the in-app demo)
//   npm run dmx-sender -- --scenario disco             (club | disco | festival – must match the app)
//
// Default show "universe-test": every head on universe 1 is RED, universe 2 BLUE,
// universe 3 GREEN …, all slowly sweeping – so universe mapping errors are obvious.

import dgram from 'node:dgram';
import { randomBytes } from 'node:crypto';
import { compileMode, encode, newLook } from '../src/shared/dmx-codec.ts';
import { buildRig, demoLook } from '../src/shared/demo-rig.ts';
import { VD_GENERIC_MH } from '../src/shared/fixtures/vd-generic-mh.ts';
import { SCENARIOS, type ScenarioId } from '../src/shared/scenarios.ts';

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i += 2) args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1]);
const proto = args.get('proto') ?? 'artnet';
const target = args.get('target');
const show = args.get('show') ?? 'universe-test';
const fps = Number(args.get('fps') ?? 40);
const scenario = SCENARIOS[(args.get('scenario') ?? 'club') as ScenarioId] ?? SCENARIOS.club;
const priority = Number(args.get('priority') ?? 100);
const seconds = Number(args.get('seconds') ?? 0);
/** Art-Net Port-Address of VD universe 1 (consoles differ: MA starts at 0 or 1). */
const artBase = Number(args.get('art-base') ?? 0);
/** sACN universe of VD universe 1. */
const sacnBase = Number(args.get('sacn-base') ?? 1);

const rig = buildRig(VD_GENERIC_MH, 0, scenario);
const cm = compileMode(VD_GENERIC_MH, 0);
const universes = Array.from({ length: rig.universes }, () => new Uint8Array(512));
const look = newLook();
const COLORS: [number, number, number][] = [
  [1, 0, 0],
  [0, 0.15, 1],
  [0, 1, 0],
  [1, 0.7, 0],
];

const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
const cid = randomBytes(16);
let seq = 0;

function artDmx(port: number, data: Uint8Array) {
  const b = Buffer.alloc(18 + 512);
  b.write('Art-Net\0', 0, 'latin1');
  b.writeUInt16LE(0x5000, 8);
  b.writeUInt16BE(14, 10); // protocol version
  b[12] = (seq % 255) + 1;
  b[13] = 0;
  b.writeUInt16LE(port & 0x7fff, 14);
  b.writeUInt16BE(512, 16);
  Buffer.from(data).copy(b, 18);
  return b;
}

function sacnPacket(universe: number, data: Uint8Array) {
  const b = Buffer.alloc(126 + 512);
  // Root layer
  b.writeUInt16BE(0x0010, 0);
  b.writeUInt16BE(0x0000, 2);
  b.write('ASC-E1.17\0\0\0', 4, 'latin1');
  b.writeUInt16BE(0x7000 | (638 - 16), 16);
  b.writeUInt32BE(0x00000004, 18);
  cid.copy(b, 22);
  // Framing layer
  b.writeUInt16BE(0x7000 | (638 - 38), 38);
  b.writeUInt32BE(0x00000002, 40);
  b.write('VD-Link DMX Test Sender', 44, 'utf8');
  b[108] = priority;
  b.writeUInt16BE(0, 109);
  b[111] = seq & 0xff;
  b[112] = 0;
  b.writeUInt16BE(universe, 113);
  // DMP layer
  b.writeUInt16BE(0x7000 | (638 - 115), 115);
  b[117] = 0x02;
  b[118] = 0xa1;
  b.writeUInt16BE(0x0000, 119);
  b.writeUInt16BE(0x0001, 121);
  b.writeUInt16BE(513, 123);
  b[125] = 0x00;
  Buffer.from(data).copy(b, 126);
  return b;
}

function frame(t: number) {
  universes.forEach((u) => u.fill(0));
  for (const f of rig.fixtures) {
    if (show === 'demo') demoLook(rig, f, t, look);
    else {
      const [r, g, b] = COLORS[(f.universe - 1) % COLORS.length];
      Object.assign(look, newLook(), { r, g, b, dimmer: 1, zoom: 0.08 });
      look.tilt = 0.5 + (25 + 15 * Math.sin(t * 0.8)) / 270;
      look.pan = 0.5 + (Math.sin(t * 0.5 + f.index * 0.15) * 20) / 540;
    }
    encode(f.cm, look, universes[f.universe - 1], f.address - 1);
  }
  universes.forEach((data, i) => {
    if (proto === 'sacn') {
      const u = sacnBase + i;
      const host = target ?? `239.255.${(u >> 8) & 0xff}.${u & 0xff}`;
      sock.send(sacnPacket(u, data), 5568, host);
    } else {
      sock.send(artDmx(artBase + i, data), 6454, target ?? '255.255.255.255');
    }
  });
  seq++;
}

sock.bind(() => {
  sock.setBroadcast(true);
  sock.setMulticastLoopback(true);
  const start = Date.now();
  console.log(
    `Sende ${show} via ${proto === 'sacn' ? 'sACN' : 'Art-Net'} an ${target ?? (proto === 'sacn' ? 'Multicast' : 'Broadcast')} · ` +
      `${rig.fixtures.length} Köpfe · ${rig.universes} Universes · ${fps} fps`,
  );
  const timer = setInterval(() => {
    const t = (Date.now() - start) / 1000;
    frame(t);
    if (seconds && t >= seconds) {
      clearInterval(timer);
      sock.close();
    }
  }, 1000 / fps);
});
