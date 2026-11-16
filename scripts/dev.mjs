// Dev runner: esbuild watch for main/preload, Vite dev server for the renderer, then Electron.
import { spawn } from 'node:child_process';
import { createServer } from 'vite';
import electronPath from 'electron';

const esb = spawn(process.execPath, ['scripts/build-main.mjs', '--watch'], { stdio: 'inherit' });
const server = await createServer({ server: { port: 5199, strictPort: true } });
await server.listen();
const url = 'http://localhost:5199/';
await new Promise((r) => setTimeout(r, 800));

const app = spawn(electronPath, ['.'], {
  stdio: 'inherit',
  env: { ...process.env, VITE_DEV_SERVER_URL: url },
});
app.on('exit', async (code) => {
  esb.kill();
  await server.close();
  process.exit(code ?? 0);
});
