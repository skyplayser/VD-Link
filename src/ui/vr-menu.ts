// VR button in the header (between the status pills and the settings): switch the VR server on,
// show the code, list the connected headsets – look along with one (the 3D view shows what it
// sees) or bring it to the spot the 3D view looks at. The CONNECT tab keeps the full card.

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

  constructor(
    private ctx: Ctx,
    private viz: () => Viz | null,
    /** Called after switching the server on/off here (CONNECT card refreshes). */
    private onToggle: () => void,
  ) {
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

    const actions = el('div', 'vr-pop-actions');
    const rec = el('button', 'btn small', t('vr.record'));
    rec.onclick = async () => {
      const n = await window.vd.vrRecord(60);
      this.note = n > 0 ? t('vr.recordSent', { n: String(n) }) : t('vr.recordNone');
      void this.render();
    };
    actions.append(rec);
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
