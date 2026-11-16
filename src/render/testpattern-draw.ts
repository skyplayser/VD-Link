// Animated content that stands in for VJ output (VJ-Link, Resolume, …).
// Used inside the app as "internal test image" and in testpattern.html, which
// is opened full-screen on a virtual monitor to prove the capture path.

export function drawTestPattern(g: CanvasRenderingContext2D, w: number, h: number, t: number, label: string) {
  const bars = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#0000ff'];
  const bw = w / bars.length;
  bars.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect(i * bw, 0, bw + 1, h * 0.18);
  });
  const grad = g.createLinearGradient(0, h * 0.18, w, h);
  const hue = (t * 40) % 360;
  grad.addColorStop(0, `hsl(${hue},90%,45%)`);
  grad.addColorStop(1, `hsl(${(hue + 140) % 360},90%,30%)`);
  g.fillStyle = grad;
  g.fillRect(0, h * 0.18, w, h * 0.82);

  // Pulsing rings (visibly animated → proves the stream is live).
  g.strokeStyle = 'rgba(255,255,255,0.85)';
  g.lineWidth = h * 0.02;
  for (let i = 0; i < 4; i++) {
    const r = ((t * 0.6 + i / 4) % 1) * Math.min(h, w) * 0.6;
    g.beginPath();
    g.arc(w / 2, h * 0.6, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.fillStyle = '#fff';
  // Fonts follow the shorter side so portrait walls stay readable.
  const u = Math.min(h, w * 1.6);
  g.font = `700 ${Math.round(u * 0.11)}px system-ui, sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  // Shrink the label until it fits the wall width.
  let fs = Math.round(u * 0.11);
  while (fs > 8 && g.measureText(label).width > w * 0.9) {
    fs -= 2;
    g.font = `700 ${fs}px system-ui, sans-serif`;
  }
  g.fillText(label, w / 2, h * 0.47);
  g.font = `500 ${Math.round(u * 0.06)}px ui-monospace, monospace`;
  g.fillText(new Date().toLocaleTimeString('de-DE') + '.' + String(Math.floor((t % 1) * 10)), w / 2, h * 0.82);
}
