// grandMA2 / grandMA2 onPC connection assistant with a live check.
// Two setups: MA on a second computer in the same network, or MA2 onPC on the same Windows PC.

import type { DmxStatus } from '../../electron/preload.ts';
import type { Ctx } from './ctx.ts';
import { el, seg } from './dom.ts';
import { getLang } from './i18n.ts';

type Setup = 'network' | 'local';
type Proto = 'artnet' | 'sacn';

const TXT = {
  de: {
    title: 'grandMA2 / grandMA2 onPC verbinden',
    hw: 'grandMA2 onPC gibt nur mit MA-Hardware, die Parameter freischaltet (z. B. onPC command wing oder MA Node), Art-Net oder sACN aus.',
    network: 'MA auf zweitem Rechner im Netzwerk',
    local: 'MA2 onPC auf diesem Windows-Rechner',
    artnet: 'Art-Net',
    sacn: 'sACN',
    netPrep: (ips: string) => `Beide Rechner ins selbe Netzwerk, am besten per Kabel. VD-Link ist erreichbar unter: ${ips}`,
    localPrep: 'MA2 onPC braucht eine aktive Netzwerkkarte (Kabel oder WLAN). Ohne Netzwerk hilft der „Microsoft KM-TEST Loopback Adapter“.',
    firewall: 'Windows fragt beim ersten Start nach der Firewall: VD-Link für private Netzwerke zulassen.',
    menu: 'In der MA2: Setup → Network Protocols.',
    artLine: (n: number) => `Art-Net einschalten, Zeile anlegen: Mode „Output Auto“ (oder Broadcast), LocalStart 1, Amount ${n}, Network 1, Subnet 0, Universe 0.`,
    artMap: 'Damit wird MA-Universe 1 zu Art-Net 0 = VD-Link-Universe 1.',
    sacnLine: (n: number) => `sACN einschalten, Zeile anlegen: Mode Output, LocalStart 1, ExternStart 1, Amount ${n}.`,
    sacnLocal: 'Auf demselben Rechner ist sACN die sicherste Wahl: Multicast kommt auch lokal an.',
    artLocal: 'Mit „Output Auto“ findet die MA2 VD-Link über ArtPoll auf derselben IP.',
    cmd: 'Oder in der Befehlszeile (Beispiel nach MA-Handbuch):',
    copy: 'Kopieren',
    copied: 'Kopiert',
    patch: 'Im Patch der MA2 dieselben Adressen verwenden wie unter PATCH in VD-Link.',
    check: 'Live-Prüfung',
    recvOn: (p: string) => `VD-Link empfängt ${p}`,
    recvOff: (p: string) => `${p} ist in den Einstellungen ausgeschaltet`,
    poll: (ips: string) => `Pult fragt nach Nodes (ArtPoll) von ${ips}`,
    pollWait: 'Noch keine ArtPoll-Anfrage von einem Pult',
    uni: (have: string, need: number) => `DMX kommt an auf Universe ${have} (Rig braucht 1–${need})`,
    uniWait: (need: number) => `Noch kein DMX – Rig braucht Universe 1–${need}`,
  },
  en: {
    title: 'Connect grandMA2 / grandMA2 onPC',
    hw: 'grandMA2 onPC only outputs Art-Net or sACN with MA hardware that unlocks parameters (e.g. onPC command wing or MA node).',
    network: 'MA on a second computer in the network',
    local: 'MA2 onPC on this Windows PC',
    artnet: 'Art-Net',
    sacn: 'sACN',
    netPrep: (ips: string) => `Put both computers in the same network, ideally by cable. VD-Link is reachable at: ${ips}`,
    localPrep: 'MA2 onPC needs an active network adapter (cable or Wi-Fi). Without a network, the "Microsoft KM-TEST Loopback Adapter" helps.',
    firewall: 'Windows asks about the firewall on first start: allow VD-Link for private networks.',
    menu: 'On the MA2: Setup → Network Protocols.',
    artLine: (n: number) => `Enable Art-Net, add a line: mode "Output Auto" (or Broadcast), LocalStart 1, Amount ${n}, Network 1, Subnet 0, Universe 0.`,
    artMap: 'This sends MA universe 1 as Art-Net 0 = VD-Link universe 1.',
    sacnLine: (n: number) => `Enable sACN, add a line: mode Output, LocalStart 1, ExternStart 1, Amount ${n}.`,
    sacnLocal: 'On the same computer sACN is the safest choice: multicast also arrives locally.',
    artLocal: 'With "Output Auto" the MA2 finds VD-Link via ArtPoll on the same IP.',
    cmd: 'Or on the command line (example from the MA manual):',
    copy: 'Copy',
    copied: 'Copied',
    patch: 'Use the same addresses in the MA2 patch as shown under PATCH in VD-Link.',
    check: 'Live check',
    recvOn: (p: string) => `VD-Link receives ${p}`,
    recvOff: (p: string) => `${p} is switched off in the settings`,
    poll: (ips: string) => `Console asks for nodes (ArtPoll) from ${ips}`,
    pollWait: 'No ArtPoll request from a console yet',
    uni: (have: string, need: number) => `DMX arrives on universe ${have} (rig needs 1–${need})`,
    uniWait: (need: number) => `No DMX yet – rig needs universe 1–${need}`,
  },
};

const STORE = 'vdlink.ma2';

export function ma2Assistant(ctx: Ctx) {
  const T = TXT[getLang()];
  let setup: Setup = (localStorage.getItem(STORE + '.setup') as Setup) || (window.vd.platform === 'win32' ? 'local' : 'network');
  let proto: Proto = (localStorage.getItem(STORE + '.proto') as Proto) || 'artnet';
  const root = el('div', 'card ma2');
  const steps = el('ol', 'steps');
  const checks = el('ul', 'checks');
  let ips = '…';

  const need = () => ctx.rig()?.universes ?? 1;

  const renderSteps = () => {
    steps.replaceChildren();
    const li = (txt: string) => {
      const item = el('li', '', txt);
      steps.append(item);
      return item;
    };
    /** Small grey note under the previous step (no own number). */
    const note = (txt: string) => steps.lastElementChild?.append(el('div', 'muted small', txt));
    if (setup === 'network') li(T.netPrep(ips));
    else {
      li(T.localPrep);
      li(T.firewall);
    }
    li(T.menu);
    if (proto === 'artnet') {
      li(T.artLine(need()));
      note(T.artMap);
      if (setup === 'local') note(T.artLocal);
      const cmd = `Assign Protocol 1.1 /mode=outputauto /localstart=1 /amount=${need()} /network=1 /subnet=0 /universe=0`;
      const box = el('div', 'cmdbox');
      box.append(el('div', 'muted small', T.cmd));
      const row = el('div', 'cmdrow');
      const code = el('code', '', cmd);
      const copy = el('button', 'btn', T.copy);
      copy.onclick = async () => {
        try {
          await navigator.clipboard.writeText(cmd);
          copy.textContent = T.copied;
          setTimeout(() => (copy.textContent = T.copy), 1500);
        } catch {
          /* ignore */
        }
      };
      row.append(code, copy);
      box.append(row);
      steps.lastElementChild?.append(box);
    } else {
      li(T.sacnLine(need()));
      if (setup === 'local') note(T.sacnLocal);
    }
    li(T.patch);
  };

  const head = el('div', 'head');
  head.append(el('b', '', T.title));
  const opts = el('div', 'row wrapline');
  opts.append(
    seg<Setup>(
      [
        { id: 'network', label: T.network },
        { id: 'local', label: T.local },
      ],
      setup,
      (v) => {
        setup = v;
        localStorage.setItem(STORE + '.setup', v);
        renderSteps();
      },
    ),
    seg<Proto>(
      [
        { id: 'artnet', label: T.artnet },
        { id: 'sacn', label: T.sacn },
      ],
      proto,
      (v) => {
        proto = v;
        localStorage.setItem(STORE + '.proto', v);
        renderSteps();
      },
    ),
  );
  const check = el('div', 'ma2-check');
  check.append(el('h2', '', T.check), checks);
  root.append(head, el('div', 'note warn', T.hw), opts, check, steps);

  void window.vd.netInfo().then((list) => {
    ips = list.map((i) => i.address).join(', ') || '127.0.0.1';
    renderSteps();
  });
  renderSteps();

  const item = (ok: boolean, txt: string) => {
    const li = el('li', ok ? 'ok' : 'wait');
    li.append(el('span', 'dot'), document.createTextNode(txt));
    return li;
  };

  return {
    el: root,
    update(st: DmxStatus) {
      const net = st.net ?? { artnet: ctx.app.artnet, sacn: ctx.app.sacn, universes: ctx.app.universes };
      const enabled = proto === 'artnet' ? net.artnet : net.sacn;
      const pname = proto === 'artnet' ? 'Art-Net' : 'sACN';
      const have = [...new Set(st.sources.map((s) => s.vdUniverse))].sort((a, b) => a - b);
      const n = need();
      const list = [item(enabled, enabled ? T.recvOn(pname) : T.recvOff(pname))];
      if (proto === 'artnet') list.push(item(!!st.pollers?.length, st.pollers?.length ? T.poll(st.pollers.join(', ')) : T.pollWait));
      const complete = Array.from({ length: n }, (_, i) => i + 1).every((u) => have.includes(u));
      list.push(item(complete, have.length ? T.uni(have.join(', '), n) : T.uniWait(n)));
      checks.replaceChildren(...list);
    },
  };
}
