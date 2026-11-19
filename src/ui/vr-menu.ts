// VR button in the header (between the status pills and the settings): switch the VR server on,
// show the code, list the connected headsets – look along with one (the 3D view shows what it
// sees) or bring it to the spot the 3D view looks at, and send the open project to VD VR headsets as
// a world to walk around in without a computer. The CONNECT tab keeps the full card.

import type { VrScanInfo, VrWorldStatus } from '../../electron/preload.ts';
import type { Viz } from '../viz.ts';
import type { Ctx } from './ctx.ts';
import { el, icon } from './dom.ts';
import { t } from './i18n.ts';

export class VrMenu {
  private btn = document.getElementById('vr-btn') as HTMLButtonElement;
  private pop = document.getElementById('vr-pop') as HTMLDivElement;
  private clients = 0;
  private running = false;
  private note = '';
  private rendering = false;
  /** Loading the world, newest per headset. */
  private worlds = new Map<string, VrWorldStatus>();
  /** Club scans from VD VR; the newest one gets a dot on the button until the menu was opened. */
  private scans: VrScanInfo[] = [];
  private newScan: VrScanInfo | null = null;

  /** Club studio drawing live from this headset (latest). */
  private live: { device: string; at: number } | null = null;

  liveChanged(device: string) {
    const first = !this.live;
    this.live = { device, at: Date.now() };
    if (first) this.paintButton();
    if (!this.pop.hidden && first) void this.render();
  }

  private async loadScans() {
    this.scans = (await window.vd.vrScans?.().catch(() => [])) ?? [];
    if (!this.pop.hidden) void this.render();
  }

  constructor(
    private ctx: Ctx,
    private viz: () => Viz | null,
    /** Called after switching the server on/off here (CONNECT card refreshes). */
    private onToggle: () => void,
    /** Open a club scan from VD VR as a new location in the builder. */
    private openScan: (id: string) => void = () => {},
    /** Follow the club studio live in the builder. */
    private openLive: () => void = () => {},
  ) {
    window.vd.onVrScan?.((s) => {
      this.newScan = s;
      void this.loadScans();
      this.paintButton();
    });
    void this.loadScans();
    this.btn.onclick = (e) => {
      e.stopPropagation();
      this.pop.hidden = !this.pop.hidden;
      this.note = '';
      if (!this.pop.hidden) void this.render();
    };
    this.pop.onclick = (e) => e.stopPropagation();
    addEventListener('click', () => (this.pop.hidden = true));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.pop.hidden = true;
    });
    window.vd.onVrWorldStatus?.((s) => {
      this.worlds.set(s.headset, s);
      if (!this.pop.hidden) void this.render();
    });
    void this.refresh();
  }

  /** Number of connected viewers changed (VR server). */
  clientsChanged(n: number) {
    this.clients = n;
    void this.refresh();
  }

  /** Headsets appeared/disappeared in the 3D view, or following ended. */
  headsetsChanged() {
    this.paintButton();
    if (!this.pop.hidden) void this.render();
  }

  async refresh() {
    const info = await window.vd.vrInfo?.().catch(() => null);
    this.running = !!info?.running;
    this.paintButton();
    if (!this.pop.hidden) void this.render();
  }

  private paintButton() {
    const n = Math.max(this.clients, this.viz()?.headsets.list().length ?? 0);
    const b = this.btn;
    b.className = `pill vr-btn ${this.running ? (n ? 'ok live' : 'ok') : ''}`;
    b.title = t('vr.btnTitle');
    b.replaceChildren(icon('vr'), document.createTextNode(t('vr.btn')));
    if (this.running) b.append(el('span', 'vr-n', n ? String(n) : '·'));
    if (this.newScan) b.append(el('span', 'vr-scan-dot', '●'));
    if (this.viz()?.following) b.classList.add('follow');
  }

  private async render() {
    if (this.rendering) return;
    this.rendering = true;
    try {
      await this.renderNow();
    } finally {
      this.rendering = false;
    }
  }

  private async renderNow() {
    const p = this.pop;
    const info = await window.vd.vrInfo?.().catch(() => null);
    const head = el('div', 'vr-pop-head');
    head.append(el('b', '', t('vr.title')), el('em', '', info?.running ? t('vr.clients', { n: String(this.clients) }) : t('vr.off')));
    if (!info) {
      p.replaceChildren(head, el('div', 'muted small', t('vr.unavailable')));
      return;
    }
    this.running = info.running;
    const sw = el('button', `vr-switch ${info.running ? 'on' : ''}`);
    sw.setAttribute('role', 'switch');
    sw.setAttribute('aria-checked', String(info.running));
    sw.title = info.running ? t('vr.stop') : t('vr.start');
    sw.onclick = async () => {
      this.ctx.app.vr = !info.running;
      this.ctx.saveApp();
      await window.vd.vrEnable(!info.running);
      if (info.running) this.viz()?.followHeadset(null);
      this.onToggle();
      void this.refresh();
    };
    head.append(sw);
    const out: HTMLElement[] = [head];
    if (!info.running) {
      out.push(el('div', 'muted small', t('vr.popText')));
      const on = el('button', 'btn primary', t('vr.start'));
      on.onclick = sw.onclick;
      out.push(on);
      p.replaceChildren(...out);
      this.paintButton();
      return;
    }
    const code = el('div', 'vr-pop-code');
    code.append(el('div', 'muted small', t('vr.popCode')), el('div', 'vr-code', info.code));
    out.push(code, el('div', 'muted small', t('vr.popHow')));
    if (info.lan[0]) {
      const u = el('div', 'vr-pop-url');
      u.append(el('span', 'muted small', t('vr.popBrowser')), el('span', 'ipl', info.lan[0].replace(/^https?:\/\//, '').replace(/\/$/, '')));
      out.push(u);
    }
    if (info.error) out.push(el('div', 'note warn small', info.error));

    // Connected headsets
    out.push(el('div', 'menu-label', t('vr.headsets')));
    const v = this.viz();
    const list = v?.headsets.list() ?? [];
    if (!list.length) out.push(el('div', 'muted small vr-none', t('vr.noHeadsets')));
    for (const h of list) {
      const row = el('div', 'vr-hs');
      const following = v?.following === h.id;
      row.append(el('span', 'dot'), el('span', 'vr-hs-name', h.name));
      const look = el('button', `btn small ${following ? 'on' : ''}`);
      look.append(icon('eye'), document.createTextNode(following ? t('vr.following') : t('vr.follow')));
      look.title = t('vr.followTitle');
      look.onclick = () => {
        this.ctx.goTab('view');
        v?.followHeadset(following ? null : h.id);
        this.headsetsChanged();
      };
      const go = el('button', 'btn small');
      go.append(icon('target'), document.createTextNode(t('vr.goto')));
      go.title = t('vr.gotoTitle');
      go.onclick = () => void this.bring(h.id);
      row.append(look, go);
      out.push(row);
    }
    if (list.length > 1) {
      const all = el('button', 'btn small', t('vr.gotoAll'));
      all.onclick = () => void this.bring(null);
      out.push(all);
    }
    if (this.note) out.push(el('div', 'muted small', this.note));

    for (const w of this.worlds.values())
      out.push(
        el(
          'div',
          `small ${w.state === 'failed' ? 'note warn' : 'muted'}`,
          w.state === 'saved' ? t('vr.worldSaved', { h: w.headset, name: w.name }) : w.state === 'failed' ? t('vr.worldFailed', { h: w.headset }) : t('vr.worldLoading', { h: w.headset, p: String(Math.round(w.progress * 100)) }),
        ),
      );

    // Club scans from VD VR → new location; the drawing live while it is made.
    out.push(el('div', 'menu-label', t('vr.scans')));
    if (this.live && Date.now() - this.live.at < 10 * 60 * 1000) {
      const row = el('div', 'vr-hs');
      row.append(el('span', 'dot new'), el('span', 'vr-hs-name', t('vr.liveRow', { h: this.live.device })));
      const watch = el('button', 'btn small primary', t('vr.liveWatch'));
      watch.onclick = () => {
        this.pop.hidden = true;
        this.openLive();
      };
      row.append(watch);
      out.push(row);
    }
    if (!this.scans.length) out.push(el('div', 'muted small', t('vr.scansNone')));
    for (const s of this.scans.slice(0, 5)) {
      const row = el('div', 'vr-hs');
      const when = s.created ? new Date(s.created * 1000).toLocaleString(undefined, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
      row.append(el('span', `dot ${this.newScan?.id === s.id ? 'new' : ''}`), el('span', 'vr-hs-name', `${s.device} · ${when} · ${s.rooms > 1 ? t('vr.scanRooms', { n: String(s.rooms) }) + ' · ' : ''}${t('vr.scanPlanes', { n: String(s.planes) })}`));
      const open = el('button', 'btn small', t('vr.scanOpen'));
      open.title = t('vr.scanOpenTitle');
      open.onclick = () => {
        this.pop.hidden = true;
        this.newScan = null;
        this.paintButton();
        this.openScan(s.id);
      };
      row.append(open);
      out.push(row);
    }

    const actions = el('div', 'vr-pop-actions');
    const world = el('button', 'btn small', t('vr.world'));
    world.title = t('vr.worldTitle');
    world.onclick = async () => {
      this.worlds.clear();
      const n = await window.vd.vrSendWorld(null);
      this.note = n > 0 ? t('vr.worldSent', { n: String(n) }) : t('vr.recordNone');
      void this.render();
    };
    actions.append(world);
    if (window.vd.platform === 'win32') {
      const pc = el('button', 'btn small', t('vr.pcvr'));
      pc.onclick = () => void window.vd.vrOpenPcvr();
      actions.append(pc);
    }
    const more = el('button', 'linkbtn small', t('vr.more'));
    more.onclick = () => {
      this.pop.hidden = true;
      this.ctx.goTab('connect');
    };
    out.push(actions, more);
    p.replaceChildren(...out);
    this.paintButton();
  }

  private async bring(id: string | null) {
    const v = this.viz();
    if (!v) return;
    if (v.following) v.followHeadset(null);
    const { pos, yaw } = v.viewPoint();
    const n = await window.vd.vrGoto(id, pos, yaw);
    this.note = n > 0 ? t('vr.gotoSent') : t('vr.recordNone');
    void this.render();
  }
}
