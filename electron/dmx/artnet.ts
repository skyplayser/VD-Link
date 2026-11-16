// Art-Net 4 receiver: ArtDmx in, ArtPollReply out (so consoles list VD-Link as a node).
// Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd. The protocol is free to implement.

import dgram from 'node:dgram';
import os from 'node:os';
import type { DmxFrame } from './merger.ts';

export const ARTNET_PORT = 6454;
const ID = Buffer.from('Art-Net\0', 'latin1');
const OP_POLL = 0x2000;
const OP_POLL_REPLY = 0x2100;
const OP_DMX = 0x5000;

export interface ArtNetOptions {
  /** How many universes (from Port-Address 0) are announced in ArtPollReply. */
  announceUniverses: number;
  shortName: string;
  longName: string;
  onFrame: (f: DmxFrame) => void;
  onError: (e: Error) => void;
  /** A console asked for nodes (ArtPoll) – useful to show that e.g. a grandMA2 sees VD-Link. */
  onPoll?: (address: string) => void;
}

export class ArtNetReceiver {
  private sock?: dgram.Socket;
  private replies = 0;

  constructor(private opts: ArtNetOptions) {}

  setAnnounceUniverses(n: number) {
    this.opts.announceUniverses = n;
  }

  start(port = ARTNET_PORT) {
    const sock = dgram.createSocket({ type: 'udp4', reuseAddr: true });
    this.sock = sock;
    sock.on('error', (e) => this.opts.onError(e));
    sock.on('message', (msg, rinfo) => this.handle(msg, rinfo));
    sock.bind(port, () => sock.setBroadcast(true));
  }

  stop() {
    this.sock?.close();
    this.sock = undefined;
  }

  private handle(msg: Buffer, rinfo: dgram.RemoteInfo) {
    if (msg.length < 12 || !msg.subarray(0, 8).equals(ID)) return;
    const op = msg.readUInt16LE(8);
    if (op === OP_DMX) {
      if (msg.length < 18) return;
      const universe = msg.readUInt16LE(14) & 0x7fff; // Net(7) | SubNet(4) | Universe(4)
      const len = Math.min(msg.readUInt16BE(16), 512, msg.length - 18);
      this.opts.onFrame({
        proto: 'artnet',
        universe,
        data: msg.subarray(18, 18 + len),
        sourceKey: `artnet:${rinfo.address}:${universe}`,
        sourceName: rinfo.address,
        address: rinfo.address,
        priority: 100,
      });
    } else if (op === OP_POLL) {
      this.opts.onPoll?.(rinfo.address);
      this.replyToPoll(rinfo.address, rinfo.port);
    }
  }

  private localIpFor(remote: string): string {
    const r = remote.split('.').map(Number);
    let fallback = '127.0.0.1';
    for (const list of Object.values(os.networkInterfaces())) {
      for (const ni of list ?? []) {
        if (ni.family !== 'IPv4') continue;
        if (remote.startsWith('127.') && ni.internal) return ni.address;
        if (ni.internal) continue;
        const a = ni.address.split('.').map(Number);
        const m = ni.netmask.split('.').map(Number);
        if (a.every((v, i) => (v & m[i]) === (r[i] & m[i]))) return ni.address;
        if (fallback === '127.0.0.1') fallback = ni.address;
      }
    }
    return fallback;
  }

  /** One ArtPollReply per page of 4 ports (BindIndex 1..n). */
  private replyToPoll(remote: string, remotePort: number) {
    if (!this.sock) return;
    const ip = this.localIpFor(remote).split('.').map(Number);
    const pages = Math.ceil(Math.max(1, this.opts.announceUniverses) / 4);
    for (let page = 0; page < pages; page++) {
      const b = Buffer.alloc(239);
      ID.copy(b, 0);
      b.writeUInt16LE(OP_POLL_REPLY, 8);
      ip.forEach((v, i) => (b[10 + i] = v));
      b.writeUInt16LE(ARTNET_PORT, 14);
      b[16] = 0; // VersInfo hi
      b[17] = 1; // VersInfo lo
      const first = page * 4;
      b[18] = (first >> 8) & 0x7f; // NetSwitch
      b[19] = (first >> 4) & 0x0f; // SubSwitch
      b.writeUInt16BE(0x00ff, 20); // OEM: unknown
      b[23] = 0xd0; // Status1: indicators normal, Port-Address set by front panel
      b.write(this.opts.shortName.slice(0, 17), 26, 'latin1');
      b.write(this.opts.longName.slice(0, 63), 44, 'latin1');
      b.write(`#0001 [${String(++this.replies).padStart(4, '0')}] VD-Link OK`, 108, 'latin1');
      const ports = Math.min(4, this.opts.announceUniverses - first);
      b.writeUInt16BE(ports, 172);
      for (let p = 0; p < ports; p++) {
        b[174 + p] = 0x80; // can output from Art-Net (DMX512)
        b[182 + p] = 0x80; // GoodOutputA: data being transmitted
        b[190 + p] = (first + p) & 0x0f; // SwOut
      }
      b[200] = 0x00; // StNode
      ip.forEach((v, i) => (b[207 + i] = v)); // BindIp
      b[211] = page + 1; // BindIndex
      b[212] = 0x08; // Status2: 15-bit Port-Address supported
      this.sock.send(b, ARTNET_PORT, remote);
      // Tools on the same machine cannot bind 6454 exclusively → also answer the source port.
      if (remotePort !== ARTNET_PORT) this.sock.send(b, remotePort, remote);
    }
  }
}
