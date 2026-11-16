// sACN (ANSI E1.31) receiver: multicast + unicast on port 5568, with priority.

import dgram from 'node:dgram';
import os from 'node:os';
import type { DmxFrame } from './merger.ts';

export const SACN_PORT = 5568;
const ACN_ID = Buffer.from('ASC-E1.17\0\0\0', 'latin1');

export interface SacnOptions {
  /** sACN universes (1-based) to join via multicast. Unicast works for all. */
  universes: number[];
  onFrame: (f: DmxFrame) => void;
  onError: (e: Error) => void;
}

export const multicastGroup = (u: number) => `239.255.${(u >> 8) & 0xff}.${u & 0xff}`;

function ipv4Interfaces(): string[] {
  const out: string[] = [];
  for (const list of Object.values(os.networkInterfaces()))
    for (const ni of list ?? []) if (ni.family === 'IPv4') out.push(ni.address);
  return out;
}

export class SacnReceiver {
  private sock?: dgram.Socket;
  private joined = new Set<string>();

  constructor(private opts: SacnOptions) {}

  /** Universes to join on the next start(). */
  setUniverses(universes: number[]) {
    this.opts.universes = universes;
  }

  start() {
    const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
    this.sock = sock;
    sock.on('error', (e) => this.opts.onError(e));
    sock.on('message', (msg, rinfo) => this.handle(msg, rinfo));
    sock.bind(SACN_PORT, () => this.join(this.opts.universes));
  }

  /** Joins the multicast groups on every IPv4 interface (incl. loopback). */
  join(universes: number[]) {
    if (!this.sock) return;
    for (const u of universes) {
      for (const iface of ipv4Interfaces()) {
        const key = `${u}@${iface}`;
        if (this.joined.has(key)) continue;
        try {
          this.sock.addMembership(multicastGroup(u), iface);
          this.joined.add(key);
        } catch {
          // Interface without multicast support – ignore.
        }
      }
    }
  }

  stop() {
    this.sock?.close();
    this.sock = undefined;
    this.joined.clear();
  }

  private handle(msg: Buffer, rinfo: dgram.RemoteInfo) {
    if (msg.length < 126) return;
    if (!msg.subarray(4, 16).equals(ACN_ID)) return;
    if (msg.readUInt32BE(18) !== 0x00000004) return; // root: E1.31 data
    if (msg.readUInt32BE(40) !== 0x00000002) return; // framing: DMP data
    if (msg[117] !== 0x02) return; // DMP set property
    if (msg[125] !== 0x00) return; // only null start code
    const options = msg[112];
    if (options & 0x80) return; // preview data – not for live output
    const universe = msg.readUInt16BE(113);
    const cid = msg.subarray(22, 38).toString('hex');
    const name = msg.toString('utf8', 44, 108).replace(/\0.*$/s, '') || rinfo.address;
    const count = Math.min(msg.readUInt16BE(123) - 1, 512, msg.length - 126);
    this.opts.onFrame({
      proto: 'sacn',
      universe,
      data: msg.subarray(126, 126 + Math.max(0, count)),
      sourceKey: `sacn:${cid}:${universe}`,
      sourceName: name,
      address: rinfo.address,
      priority: msg[108],
      terminated: (options & 0x40) !== 0,
    });
  }
}
