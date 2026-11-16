// Renders the VD-Link logo and app icon to PNG, .icns and .ico. Suite style (dark tile,
// Inter Display ExtraBold – SIL OFL 1.1, assets/fonts – and the five suite colours); the
// VD sign is the "stage floor": the five colour squares as two rows of tiles in
// perspective (front row full colour, back row dimmed) = 3D. Same geometry as
// src/ui/dom.ts logoSlots().
// Run: npx electron scripts/logo/render.cjs
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const FONT = fs.readFileSync(path.join(ROOT, 'assets/fonts/InterDisplay-ExtraBold.ttf')).toString('base64');
const COLORS = ['#FF3B3B', '#FFB020', '#3DDC84', '#22C8F0', '#B45CFF'];

const PAGE = `<!doctype html><html><head><meta charset=utf-8><style>
@font-face{font-family:IDX;src:url(data:font/ttf;base64,${FONT})}
html,body{margin:0;background:transparent}</style></head><body><canvas id=c></canvas>
<script>
const COLORS=${JSON.stringify(COLORS)};
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return 'rgba('+(n>>16)+','+(n>>8&255)+','+(n&255)+','+a+')'};
// Stage floor: 2 rows × 5 tiles in perspective inside the box x, y, w, h.
function floor(g,x,y,w,h){
  const vx=x+w/2, vy=y-h*2.2;
  const row=(y0,y1,alpha)=>COLORS.forEach((c,i)=>{
    const fx=t=>vx+(x+t*w-vx)*((y0-vy)/(y+h-vy)), bx=t=>vx+(x+t*w-vx)*((y1-vy)/(y+h-vy));
    const a=i/5+0.012, b=(i+1)/5-0.012;
    g.fillStyle=alpha<1?rgba(c,alpha):c;g.beginPath();g.moveTo(fx(a),y0);g.lineTo(fx(b),y0);g.lineTo(bx(b),y1);g.lineTo(bx(a),y1);g.closePath();g.fill()});
  row(y,y+h*0.42,0.38);row(y+h*0.5,y+h,1)}
window.logo=(fill)=>{const c=document.getElementById('c');c.width=640;c.height=144;const g=c.getContext('2d');
  g.clearRect(0,0,640,144);floor(g,28,49,166,52);
  g.fillStyle=fill;g.font='800 92px IDX';g.textBaseline='alphabetic';g.letterSpacing='-1px';g.fillText('VD-Link',218,97);
  const w=Math.ceil(218+g.measureText('VD-Link').width+28);const o=document.createElement('canvas');o.width=w;o.height=144;
  o.getContext('2d').drawImage(c,0,0);return o.toDataURL('image/png')};
window.icon=(n)=>{const c=document.getElementById('c');c.width=c.height=n;const g=c.getContext('2d');const s=n/1024;g.setTransform(s,0,0,s,0,0);
  g.clearRect(0,0,1024,1024);const gr=g.createLinearGradient(100,100,924,924);gr.addColorStop(0,'#1A1E2A');gr.addColorStop(1,'#0D1016');
  g.fillStyle=gr;rr(g,101.5,101.5,821,821,196);g.strokeStyle='#2A2F3D';g.lineWidth=3;g.beginPath();g.roundRect(101.5,101.5,821,821,196);g.stroke();
  g.fillStyle='#F2F4F8';g.font='800 330px IDX';g.textAlign='center';g.letterSpacing='-4px';g.fillText('VD',512,560);
  floor(g,214,650,596,150);
  return c.toDataURL('image/png')};
</script></body></html>`;

function ico(pngs) {
  // ICO container with PNG-compressed entries (Windows Vista+).
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(pngs.length, 4);
  let off = head.length;
  pngs.forEach(([n, buf], i) => {
    const e = 6 + i * 16;
    head[e] = n >= 256 ? 0 : n;
    head[e + 1] = n >= 256 ? 0 : n;
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8);
    head.writeUInt32LE(off, e + 12);
    off += buf.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p[1])]);
}

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  await win.loadURL('data:text/html;base64,' + Buffer.from(PAGE).toString('base64'));
  await win.webContents.executeJavaScript('document.fonts.load("800 92px IDX")');
  const png = async (js) => Buffer.from((await win.webContents.executeJavaScript(js)).split(',')[1], 'base64');
  fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'assets/logo-for-dark.png'), await png(`logo('#F2F3F7')`));
  fs.writeFileSync(path.join(ROOT, 'assets/logo-for-light.png'), await png(`logo('#141821')`));
  fs.writeFileSync(path.join(ROOT, 'build/icon.png'), await png(`icon(1024)`));
  fs.writeFileSync(path.join(ROOT, 'public/icon.png'), await png(`icon(256)`));
  const set = path.join(ROOT, 'build/icon.iconset');
  fs.mkdirSync(set, { recursive: true });
  const icoParts = [];
  for (const n of [16, 32, 64, 128, 256, 512, 1024]) {
    const buf = await png(`icon(${n})`);
    if (n <= 512) fs.writeFileSync(path.join(set, `icon_${n}x${n}.png`), buf);
    if (n >= 32) fs.writeFileSync(path.join(set, `icon_${n / 2}x${n / 2}@2x.png`), buf);
    if (n <= 256) icoParts.push([n, buf]);
  }
  fs.writeFileSync(path.join(ROOT, 'build/icon.ico'), ico(icoParts));
  if (process.platform === 'darwin') execFileSync('iconutil', ['-c', 'icns', set, '-o', path.join(ROOT, 'build/icon.icns')]);
  fs.rmSync(set, { recursive: true });
  console.log('Logo + Icons geschrieben');
  app.quit();
});
