// VD-Link logo drafts (4 variants) in the suite style – rendered with Electron canvas.
// Run from the VD-Link folder: npx electron <this file> <outDir>
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const OUT = process.argv[process.argv.length - 1];
const FONT = fs.readFileSync(path.join(ROOT, 'assets/fonts/InterDisplay-ExtraBold.ttf')).toString('base64');

const PAGE = `<!doctype html><html><head><meta charset=utf-8><style>
@font-face{font-family:IDX;src:url(data:font/ttf;base64,${FONT})}
html,body{margin:0;background:transparent}</style></head><body>
<script>
const C=['#FF3B3B','#FFB020','#3DDC84','#22C8F0','#B45CFF'];
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return 'rgba('+(n>>16)+','+(n>>8&255)+','+(n&255)+','+a+')'};
const shade=(h,k)=>{const n=parseInt(h.slice(1),16);const f=v=>Math.round(Math.min(255,v*k));return 'rgb('+f(n>>16)+','+f(n>>8&255)+','+f(n&255)+')'};
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
function tile(g){const gr=g.createLinearGradient(100,100,924,924);gr.addColorStop(0,'#1A1E2A');gr.addColorStop(1,'#0D1016');
  g.fillStyle=gr;rr(g,101.5,101.5,821,821,196);g.strokeStyle='#2A2F3D';g.lineWidth=3;g.beginPath();g.roundRect(101.5,101.5,821,821,196);g.stroke();
  g.save();g.beginPath();g.roundRect(101.5,101.5,821,821,196);g.clip()}
function letters(g,y,size){g.fillStyle='#F2F4F8';g.font='800 '+size+'px IDX';g.textAlign='center';g.textBaseline='alphabetic';g.letterSpacing=(-size/80)+'px';g.fillText('VD',512,y)}

// ---------- symbols, drawn into a box (x,y,w,h); used for icon and wordmark
const SYM={
  // 1 Lichtrampe: five fixtures on a bar, coloured cones fanning down
  beams(g,x,y,w,h,{coneH}={}){
    const s=w/5.6, gap=(w-5*s)/4;
    g.save();g.beginPath();g.rect(x-s*0.6,y,w+s*1.2,h+2);g.clip();g.globalCompositeOperation='lighter';
    C.forEach((c,i)=>{const cx=x+i*(s+gap)+s/2, top=y+s*0.9, bot=top+(coneH??h-s);
      const spread=(i-2)*s*0.5, wb=s*1.6;
      const gr=g.createLinearGradient(0,top,0,bot);gr.addColorStop(0,rgba(c,0.62));gr.addColorStop(1,rgba(c,0));
      g.fillStyle=gr;g.beginPath();g.moveTo(cx-s*0.32,top);g.lineTo(cx+s*0.32,top);g.lineTo(cx+spread+wb/2,bot);g.lineTo(cx+spread-wb/2,bot);g.closePath();g.fill()});
    g.restore();
    C.forEach((c,i)=>{g.fillStyle=c;rr(g,x+i*(s+gap),y,s,s,s*0.23)});
  },
  // 2 Bühnenboden: two rows of tiles in perspective
  floor(g,x,y,w,h){
    const vx=x+w/2, vy=y-h*2.2; // vanishing point above
    const row=(y0,y1,alpha)=>{C.forEach((c,i)=>{
      const fx=t=>vx+(x+t*w-vx)*((y0-vy)/(y+h-vy)), bx=t=>vx+(x+t*w-vx)*((y1-vy)/(y+h-vy));
      const a=i/5+0.012, b=(i+1)/5-0.012;
      g.fillStyle=alpha<1?rgba(c,alpha):c;g.beginPath();g.moveTo(fx(a),y0);g.lineTo(fx(b),y0);g.lineTo(bx(b),y1);g.lineTo(bx(a),y1);g.closePath();g.fill()})};
    row(y,y+h*0.42,0.38);row(y+h*0.5,y+h,1);
  },
  // 3 Iso-Blöcke: five isometric blocks rising left to right
  iso(g,x,y,w,h){
    const n=5, cw=w/(n*0.92+0.1), ch=cw*0.5;
    C.forEach((c,i)=>{const hh=h*(0.18+0.13*i);const cx=x+cw/2+i*cw*0.92, base=y+h-ch*0.1;
      const top=base-hh;
      // left face
      g.fillStyle=shade(c,0.62);g.beginPath();g.moveTo(cx-cw*0.46,top);g.lineTo(cx,top+ch*0.46);g.lineTo(cx,base);g.lineTo(cx-cw*0.46,base-ch*0.46);g.closePath();g.fill();
      // right face
      g.fillStyle=shade(c,0.42);g.beginPath();g.moveTo(cx+cw*0.46,top);g.lineTo(cx,top+ch*0.46);g.lineTo(cx,base);g.lineTo(cx+cw*0.46,base-ch*0.46);g.closePath();g.fill();
      // top
      g.fillStyle=c;g.beginPath();g.moveTo(cx,top-ch*0.46);g.lineTo(cx+cw*0.46,top);g.lineTo(cx,top+ch*0.46);g.lineTo(cx-cw*0.46,top);g.closePath();g.fill();
    });
  },
  // 4 Sucher: four coloured viewfinder corners + green live dot
  finder(g,x,y,w,h,{dot=true,lw}={}){
    const L=Math.min(w,h)*0.3, t=lw??Math.min(w,h)*0.085;
    g.lineWidth=t;g.lineCap='round';g.lineJoin='round';
    const corner=(c,px,py,dx,dy)=>{g.strokeStyle=c;g.beginPath();g.moveTo(px+dx*L,py);g.lineTo(px,py);g.lineTo(px,py+dy*L);g.stroke()};
    const i=t/2;
    corner(C[0],x+i,y+i,1,1);corner(C[1],x+w-i,y+i,-1,1);corner(C[3],x+i,y+h-i,1,-1);corner(C[4],x+w-i,y+h-i,-1,-1);
    if(dot){const r=t*0.62;g.fillStyle=C[2];g.beginPath();g.arc(x+w-i-L-t*1.5,y+i,r,0,Math.PI*2);g.fill()}
  },
};

window.icon=(v,n)=>{const c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d');g.setTransform(n/1024,0,0,n/1024,0,0);
  tile(g);
  if(v==='beams'){SYM.beams(g,262,196,500,600,{coneH:470});letters(g,800,300)}
  if(v==='floor'){letters(g,560,330);SYM.floor(g,214,650,596,150)}
  if(v==='iso'){letters(g,520,320);SYM.iso(g,236,590,552,230)}
  if(v==='finder'){SYM.finder(g,214,232,596,560);letters(g,632,330)}
  g.restore();return c.toDataURL('image/png')};

// Wordmark: symbol + "VD-Link"; text colour for dark or light backgrounds.
window.mark=(v,fill)=>{const c=document.createElement('canvas');c.width=1400;c.height=288;const g=c.getContext('2d');g.scale(2,2);
  const sx=28,sy=26,sw=166,sh=92;
  if(v==='beams')SYM.beams(g,sx,sy,sw,sh,{coneH:62});
  if(v==='floor')SYM.floor(g,sx,sy+30,sw,52);
  if(v==='iso')SYM.iso(g,sx,sy+6,sw,84);
  if(v==='finder'){SYM.finder(g,sx+20,sy+6,126,82,{lw:7});g.fillStyle=fill;g.font='800 42px IDX';g.textAlign='center';g.textBaseline='alphabetic';g.fillText('VD',sx+83,sy+62)}
  g.fillStyle=fill;g.font='800 92px IDX';g.textAlign='left';g.textBaseline='alphabetic';g.letterSpacing='-1px';g.fillText('VD-Link',218,104);
  const w=Math.ceil(218+g.measureText('VD-Link').width+28);const o=document.createElement('canvas');o.width=w*2;o.height=288;o.getContext('2d').drawImage(c,0,0);return o.toDataURL('image/png')};

// Comparison sheet.
window.sheet=async(names,titles)=>{const W=4*560,H=1180;const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#0B0D12';g.fillRect(0,0,W,H*0.62);g.fillStyle='#EEF0F4';g.fillRect(0,H*0.62,W,H*0.38);
  const load=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=src});
  for(let k=0;k<4;k++){const v=names[k],x0=k*560;
    g.fillStyle='#8A93A6';g.font='800 30px IDX';g.textAlign='left';g.fillText((k+1)+' · '+titles[k],x0+40,58);
    g.drawImage(await load(icon(v,1024)),x0+40,80,440,440);
    g.drawImage(await load(icon(v,1024)),x0+40,535,64,64);g.drawImage(await load(icon(v,1024)),x0+118,551,32,32);g.drawImage(await load(icon(v,1024)),x0+164,559,16,16);
    const md=await load(mark(v,'#F2F4F8'));g.drawImage(md,x0+40,620,480,480*md.height/md.width);
    const ml=await load(mark(v,'#20242E'));g.drawImage(ml,x0+40,790,480,480*ml.height/ml.width);
    const tile=await load(icon(v,1024));g.drawImage(tile,x0+40,940,180,180);
  }
  return c.toDataURL('image/png')};
</script></body></html>`;

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
  await win.loadURL('data:text/html;base64,' + Buffer.from(PAGE).toString('base64'));
  await win.webContents.executeJavaScript('document.fonts.load("800 92px IDX")');
  const save = async (file, js) => fs.writeFileSync(path.join(OUT, file), Buffer.from((await win.webContents.executeJavaScript(js)).split(',')[1], 'base64'));
  fs.mkdirSync(OUT, { recursive: true });
  const V = ['beams', 'floor', 'iso', 'finder'];
  const T = ['Lichtrampe', 'Bühnenboden', 'Iso-Blöcke', 'Sucher'];
  for (const [i, v] of V.entries()) {
    await save(`entwurf-${i + 1}-${v}-icon.png`, `icon('${v}',1024)`);
    await save(`entwurf-${i + 1}-${v}-logo-dark.png`, `mark('${v}','#F2F4F8')`);
    await save(`entwurf-${i + 1}-${v}-logo-light.png`, `mark('${v}','#20242E')`);
  }
  await save('vergleich.png', `sheet(${JSON.stringify(V)},${JSON.stringify(T)})`);
  console.log('ok');
  app.quit();
});
