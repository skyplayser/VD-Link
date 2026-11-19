// electron-builder afterPack hook (macOS): the helper apps keep "Electron Helper" as
// bundle name, which shows up e.g. in Activity Monitor and crash dialogs. Rename them
// to "VD-Link Helper …" before the app is signed.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const LOCAL_NET = 'VD-Link empfängt Art-Net, sACN und NDI®-Streams im lokalen Netzwerk.';

exports.default = async (ctx) => {
  if (ctx.electronPlatformName !== 'darwin') return;
  const app = path.join(ctx.appOutDir, `${ctx.packager.appInfo.productFilename}.app`);
  const frameworks = path.join(app, 'Contents', 'Frameworks');
  for (const dir of fs.readdirSync(frameworks)) {
    if (!dir.endsWith('.app')) continue;
    const plist = path.join(frameworks, dir, 'Contents', 'Info.plist');
    const name = dir.replace(/\.app$/, '');
    execFileSync('plutil', ['-replace', 'CFBundleName', '-string', name, plist]);
    execFileSync('plutil', ['-replace', 'CFBundleDisplayName', '-string', name, plist]);
    // NDI® discovery and receive run in a helper (utilityProcess). macOS asks for "Local
    // Network" per bundle, so the helpers need the same usage text as the app.
    execFileSync('plutil', ['-replace', 'NSLocalNetworkUsageDescription', '-string', LOCAL_NET, plist]);
    execFileSync('plutil', ['-replace', 'NSBonjourServices', '-json', '["_ndi._tcp"]', plist]);
  }
};
