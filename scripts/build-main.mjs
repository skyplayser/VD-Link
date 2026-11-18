// Bundles the Electron main + preload scripts (TypeScript) into CommonJS.
import { build, context } from 'esbuild';

const watch = process.argv.includes('--watch');
const options = {
  entryPoints: { main: 'electron/main.ts', preload: 'electron/preload.ts', 'ndi-worker': 'electron/ndi/ndi-worker.ts' },
  outdir: 'dist-electron',
  outExtension: { '.js': '.cjs' },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  // koffi loads its native module at run time from node_modules.
  external: ['electron', 'koffi'],
  sourcemap: true,
  logLevel: 'info',
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}
