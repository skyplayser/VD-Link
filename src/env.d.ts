/// <reference types="vite/client" />
import type { VdApi } from '../electron/preload.ts';

declare global {
  interface Window {
    vd: VdApi;
  }
}

export {};
