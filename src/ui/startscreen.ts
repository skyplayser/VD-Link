// Start screen – shown BEFORE the visualisation starts (same structure as VJ-Link):
// big logo, the main ways in as tiles, on the right the recently opened projects,
// how a console finds VD-Link, language, update line and Instagram.

import type { RecentProject } from '../../electron/preload.ts';
import { loadAutosave } from '../project.ts';
import type { Ctx } from './ctx.ts';
import { el, icon, logoSlots, seg } from './dom.ts';
import { getLang, LANGS, setLang, t } from './i18n.ts';
import { defaultImages, playProgramIntro } from './intro/program-intro.js';
import { showLauncherHint } from './suite/launcher-hint.js';
import './suite/launcher-hint.css';

export const REPO = 'skyplayser/VD-Link';

export class StartScreen {
  private root = el('div', 'start');
  private netBox = el('div', 'start-net');
  /** Link-Suite launcher hint: result of the main process, the open card, and what it waits for. */
  private launcher: { installed: boolean } | null = null;
  private launcherAsked = false;
  private hint: { el: HTMLElement | null; update(l: { installed: boolean } | null): void } | null = null;
  /** Set by main before the first show when the start animation plays: the hint fades in after it. */
  introWait: Promise<unknown> | true = true;

  constructor(private ctx: Ctx) {
    window.vd.onSuiteLauncher?.((l) => {
      this.launcher = l;
      this.hint?.update(l);
    });
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-label', 'VD-Link Start');
    document.body.append(this.root);
    addEventListener(
      'keydown',
      (e) => {
        // Escape only closes the start screen when a project is open behind it.
        if (!this.root.hidden && e.key === 'Escape' && this.ctx.project()) this.hide();
      },
      true,
    );
  }

  get visible() {
    return !this.root.hidden;
  }

  async show(focus = true) {
    await this.render();
    this.root.hidden = false;
    if (focus) this.focusFirst();
    void this.tick();
  }

  focusFirst() {
    this.root.querySelector<HTMLButtonElement>('.start-btn')?.focus();
  }

  /**
   * Link-Suite start animation over the rendered start screen (shared module from the
   * Suite-Launcher, src/ui/intro/). The VD icon lands on the logo sign, the name wipes in,
   * then the tiles fade in. enabled = false only removes the cover layer.
   */
  async intro(enabled: boolean, dev: { speed?: number; reduced?: boolean } = {}) {
    const layer = document.getElementById('lsi');
    if (!layer) return;
    if (enabled) {
      await document.fonts.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    const t0 = performance.now();
    const run = playProgramIntro({
      layer,
      app: 'vd',
      logoTarget: () => this.root.querySelector('.start-logo'),
      signTarget: () => this.root.querySelector('.start-logo .slots'),
      revealTargets: () => [...this.root.querySelectorAll('.start-tag, .start-grid .start-btn, .start-right > *')],
      images: defaultImages('./intro/icons/', 'dark', 'vd'),
      theme: 'dark',
      enabled,
      speed: dev.speed ?? 1,
      reduced: dev.reduced,
      text: (k) => t(`intro.${k}`),
    });
    const r = await run.done;
    if (r.shown) console.log(`[vd] intro done skipped=${r.skipped} t=${Math.round(performance.now() - t0)}ms`);
  }

  hide() {
    this.root.hidden = true;
  }

  /** Live part (network, incoming DMX), called ~1×/s while visible. */
  async tick() {
    if (this.root.hidden) return;
    // Development: ?noip=1 hides the network box (screenshots for the README without real addresses).
    if (new URLSearchParams(location.search).get('noip') === '1') {
      this.netBox.hidden = true;
      return;
    }
    const ips = await window.vd.netInfo().catch(() => []);
    const st = this.ctx.dmxStatus();
    this.netBox.replaceChildren(el('h3', '', t('start.net')));
    const line = el('div', 'start-net-ips');
    line.append(el('span', 'ipl', ips.map((i) => i.address).slice(0, 2).join(' · ') || '127.0.0.1'), el('span', 'muted small', t('start.net.ports')));
    this.netBox.append(line);
    const n = new Set(st.sources.map((s) => s.address + s.proto)).size;
    const polled = st.pollers?.length ?? 0;
    const live = el('div', `live ${n ? 'ok' : 'wait'}`);
    live.append(
      el('span', 'dot'),
      document.createTextNode(n ? t('start.net.live', { n }) : polled ? t('start.net.polled', { ip: st.pollers![0] }) : t('start.net.wait')),
    );
    this.netBox.append(live);
  }

  private async render() {
    const r = this.root;
    r.replaceChildren();
    const card = el('div', 'start-card');

    // ---- left: logo + tiles
    const left = el('div', 'start-left');
    const logo = el('div', 'start-logo');
    logo.append(logoSlots(true), el('span', '', 'VD-Link'));
    left.append(logo, el('p', 'start-tag', t('start.tag')));
    const grid = el('div', 'start-grid');
    const btn = (ic: string, title: string, sub: string, run: () => void, cls = '') => {
      const b = el('button', `start-btn ${cls}`);
      b.append(icon(ic));
      const tx = el('span', 'start-btxt');
      tx.append(el('b', '', title), el('small', '', sub));
      b.append(tx);
      b.addEventListener('click', run);
      grid.append(b);
      return b;
    };
    const open = this.ctx.project();
    const auto = loadAutosave();
    if (open) btn('play', t('start.continue'), open.name, () => this.hide(), 'primary');
    else if (auto) btn('play', t('start.continue'), `${auto.project.name}${auto.dirty ? ' ●' : ''}`, () => this.ctx.cmd('open', { autosave: true }), 'primary');
    btn('new', t('start.new'), t('start.new.sub'), () => this.ctx.cmd('new'), auto || open ? '' : 'primary');
    btn('open', t('start.open'), t('start.open.sub'), () => this.ctx.cmd('open'));
    btn('editor', t('start.locBuilder'), t('start.locBuilder.sub'), () => this.ctx.cmd('locationBuilder'));
    btn('library', t('start.fixBuilder'), t('start.fixBuilder.sub'), () => this.ctx.cmd('fixtureBuilder'));
    btn('demo', t('start.demo'), t('start.demo.sub'), () => this.ctx.cmd('demo'));
    btn('connect', t('start.ma2'), t('start.ma2.sub'), () => this.ctx.cmd('settings', 'ma2'));
    btn('settings', t('start.settings'), t('start.settings.sub'), () => this.ctx.cmd('settings'));
    left.append(grid);

    // ---- right: recent projects, network, language, update, Instagram
    const right = el('div', 'start-right');
    right.append(el('h3', '', t('start.recent')));
    const list = el('div', 'start-recent');
    const recent: RecentProject[] = await window.vd.projectRecent().catch(() => []);
    if (!recent.length) list.append(el('p', 'muted small', t('start.recent.none')));
    for (const p of recent.slice(0, 5)) {
      const b = el('button', `start-proj${p.exists ? '' : ' missing'}`);
      b.disabled = !p.exists;
      b.title = p.path;
      b.append(icon(p.kind === 'location' ? 'editor' : 'file'));
      const tx = el('span', 'start-btxt');
      tx.append(el('b', '', p.name + (p.kind === 'location' ? ' · Location' : '')), el('small', '', p.exists ? `${shortFolder(p.folder)} · ${when(p.modified)}` : t('start.recent.missing')));
      b.append(tx);
      b.addEventListener('click', () => this.ctx.cmd('open', { path: p.path }));
      list.append(b);
    }
    right.append(list);
    if (recent.length) {
      const clr = el('button', 'linkish', t('start.recent.clear'));
      clr.onclick = async () => {
        await window.vd.projectClearRecent();
        void this.render();
      };
      right.append(clr);
    }
    right.append(this.netBox);

    const langBox = el('div', 'start-lang');
    langBox.append(icon('globe'), el('span', '', t('start.lang')));
    langBox.append(
      seg(LANGS.map((l) => ({ id: l.id, label: l.label })), getLang(), (l) => {
        setLang(l);
        location.reload();
      }),
    );
    const upd = el('div', 'start-upd', t('start.update.check'));
    void this.checkUpdate(upd);
    const love = el('button', 'start-love');
    love.append(icon('insta'));
    const lt = el('span', 'start-btxt');
    lt.append(el('b', '', t('start.love.title')), el('small', '', t('start.love.text')));
    love.append(lt);
    love.title = 'instagram.com/nextphilm';
    love.onclick = () => window.vd.openUrl('https://www.instagram.com/nextphilm/');
    const extra = el('div', 'start-extra');
    const slot = el('div', 'lsh-slot');
    extra.append(langBox, upd, slot, love);
    await this.launcherHint(slot);
    right.append(extra);
    card.append(left, right);

    const foot = el('div', 'start-foot');
    foot.append(el('span', 'muted small', t('start.hint')), el('span', 'muted small', t('start.foot', { v: this.ctx.version() })));
    r.append(card, foot);
  }

  /**
   * Small card „Link-Suite laden“ when the Link-Suite launcher is not installed (shared module
   * from the Suite-Launcher). Never over an open project / the 3D view, never in automated runs
   * (unless ?hint=1); after the start animation on the first show, right away afterwards.
   */
  private async launcherHint(slot: HTMLElement) {
    const q = new URLSearchParams(location.search);
    if (!this.launcherAsked) {
      this.launcherAsked = true;
      this.launcher = await window.vd.suiteLauncher().catch(() => null);
    }
    // Development: ?hint=1&launcher=missing|installed to check both cases.
    const force = q.get('launcher');
    const launcher = force === 'missing' ? { installed: false } : force === 'installed' ? { installed: true } : this.launcher;
    const after = this.introWait;
    this.introWait = true;
    this.hint = showLauncherHint({
      host: slot,
      launcher,
      iconSrc: './suite/icons/link-suite-icon.svg',
      lang: getLang() === 'en' ? 'en' : 'de',
      hidden: !!this.ctx.app.hideLauncherHint,
      allowed: !this.ctx.project() && ([...q.keys()].length === 0 || q.get('hint') === '1'),
      compact: true,
      after,
      onGet: () => void window.vd.openLauncherPage(),
      onHide: () => {
        this.ctx.app.hideLauncherHint = true;
        this.ctx.saveApp();
      },
    });
    if (q.size) console.log(`[vd] launcher ${JSON.stringify(launcher)} card=${!!this.hint.el}`);
    // Development: ?hintclick=hide clicks „Nicht mehr zeigen“ after 4 s (test of the flag).
    if (q.get('hintclick') === 'hide') setTimeout(() => slot.querySelector<HTMLButtonElement>('.lsh-hide')?.click(), 4000);
  }

  private async checkUpdate(box: HTMLElement) {
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (res.status === 404) {
        box.hidden = true; // nothing published yet
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const j = await res.json();
      const latest = String(j.tag_name ?? '').replace(/^v/, '');
      box.replaceChildren();
      if (latest && cmp(latest, this.ctx.version()) > 0) {
        const a = el('a', '', t('start.update.new', { v: latest }));
        a.href = '#';
        a.onclick = (e) => {
          e.preventDefault();
          window.vd.openUrl(String(j.html_url));
        };
        box.append(a);
      } else box.textContent = t('start.update.ok');
    } catch {
      box.hidden = true;
    }
  }
}

function cmp(a: string, b: string) {
  const pa = a.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  const pb = b.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  return 0;
}

function shortFolder(f: string): string {
  const parts = f.split(/[\\/]/).filter(Boolean);
  return parts.length > 2 ? `…/${parts.slice(-2).join('/')}` : f;
}

function when(ms: number): string {
  if (!ms) return '';
  const d = new Date(ms);
  const now = new Date();
  const loc = getLang() === 'de' ? 'de-DE' : 'en-GB';
  const time = d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
  if (d.toDateString() === now.toDateString()) return `${t('start.today')} ${time}`;
  if (new Date(now.getTime() - 86400000).toDateString() === d.toDateString()) return `${t('start.yesterday')} ${time}`;
  return d.toLocaleDateString(loc, { day: '2-digit', month: '2-digit', year: 'numeric' });
}
