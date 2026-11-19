import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    target: 'es2022',
    rolldownOptions: {
      input: {
        main: root + 'index.html',
        testpattern: root + 'testpattern.html',
        vr: root + 'vr.html',
      },
    },
  },
});
