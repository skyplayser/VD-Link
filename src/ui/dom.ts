// Tiny DOM helpers + own line icons (24×24, stroke = currentColor). All icons drawn for VD-Link.

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

const ICONS: Record<string, string> = {
  new: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M12 12v6M9 15h6"/>',
  open: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1"/><path d="M3 7v11a2 2 0 0 0 2 2h13l3-9H7l-4 9"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 17l2-4 2 2 2-5 2 7"/>',
  demo: '<path d="M8 3l3 7-3 11M16 3l-3 7 3 11"/><path d="M4 21h16"/>',
  settings: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
  club: '<rect x="4" y="5" width="16" height="9" rx="1.5"/><path d="M8 20h8M10 14v3M14 14v3"/><path d="M7 9.5h2M11 9.5h2M15 9.5h2"/>',
  disco: '<rect x="2.5" y="7" width="5" height="7" rx="1"/><rect x="9" y="4.5" width="6" height="9.5" rx="1"/><rect x="16.5" y="7" width="5" height="7" rx="1"/><path d="M5 19h14"/>',
  festival: '<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/><circle cx="19.5" cy="4.5" r="1.5"/>',
  editor: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  library: '<path d="M7 3h10l-2 7H9z"/><path d="M9 10l-4 11h14l-4-11"/><circle cx="12" cy="6" r="1"/>',
  connect: '<rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 13V9M12 13V6M17 13v-3"/><circle cx="7" cy="16.5" r=".8"/><circle cx="12" cy="16.5" r=".8"/><circle cx="17" cy="16.5" r=".8"/>',
  walls: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 8l3 3-3 3"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  net: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
  full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
};

export function icon(name: string): SVGSVGElement {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('aria-hidden', 'true');
  s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', '1.8');
  s.setAttribute('stroke-linecap', 'round');
  s.setAttribute('stroke-linejoin', 'round');
  s.innerHTML = ICONS[name] ?? '';
  return s;
}

/**
 * VD-Link sign: the five suite colours as a stage floor – two rows of tiles in
 * perspective (front row full colour, back row dimmed). Same geometry as the app icon
 * (scripts/logo/render.cjs).
 */
export function logoSlots(big = false): HTMLSpanElement {
  const s = el('span', big ? 'slots big' : 'slots');
  const [w, h] = [166, 52];
  const vx = w / 2;
  const vy = -h * 2.2;
  const paths: string[] = [];
  const row = (y0: number, y1: number, op: number) => {
    for (let i = 0; i < 5; i++) {
      const fx = (t: number) => vx + (t * w - vx) * ((y0 - vy) / (h - vy));
      const bx = (t: number) => vx + (t * w - vx) * ((y1 - vy) / (h - vy));
      const a = i / 5 + 0.012;
      const b = (i + 1) / 5 - 0.012;
      const r = (n: number) => n.toFixed(2);
      paths.push(`<path d="M${r(fx(a))} ${r(y0)}L${r(fx(b))} ${r(y0)}L${r(bx(b))} ${r(y1)}L${r(bx(a))} ${r(y1)}Z" fill="var(--s${'ABCDE'[i]})"${op < 1 ? ` opacity="${op}"` : ''}/>`);
    }
  };
  row(0, h * 0.42, 0.38);
  row(h * 0.5, h, 1);
  s.innerHTML = `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${paths.join('')}</svg>`;
  return s;
}

/** Segmented control. */
export function seg<T extends string>(options: { id: T; label: string }[], value: T, onChange: (v: T) => void): HTMLDivElement {
  const box = el('div', 'seg');
  const render = (v: T) => {
    box.replaceChildren();
    for (const o of options) {
      const b = el('button', o.id === v ? 'on' : '', o.label);
      b.setAttribute('aria-pressed', String(o.id === v));
      b.onclick = () => {
        render(o.id);
        onChange(o.id);
      };
      box.append(b);
    }
  };
  render(value);
  return box;
}
