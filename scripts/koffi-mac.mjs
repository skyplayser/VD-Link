// The macOS installers are built for Apple chip and Intel on one machine, but npm only
// installs koffi's native module for the machine's own CPU. Fetch the other one too
// (same version, from the npm registry) so both apps contain a working koffi.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const version = JSON.parse(readFileSync('node_modules/koffi/package.json', 'utf8')).version;
for (const arch of ['arm64', 'x64']) {
  const name = `@koromix/koffi-darwin-${arch}`;
  const dest = path.join('node_modules', name);
  if (existsSync(path.join(dest, 'package.json'))) continue;
  const tmp = mkdtempSync(path.join(tmpdir(), 'koffi-'));
  const file = execFileSync('npm', ['pack', `${name}@${version}`, '--silent', '--pack-destination', tmp], { encoding: 'utf8' }).trim().split('\n').pop();
  mkdirSync(dest, { recursive: true });
  execFileSync('tar', ['-xzf', path.join(tmp, file), '-C', dest, '--strip-components=1']);
  rmSync(tmp, { recursive: true, force: true });
  console.log(`koffi: added ${name}@${version}`);
}
