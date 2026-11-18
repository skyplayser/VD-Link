// NDI® receive – dynamic binding to the NDI runtime that the user installed.
//
// VD-Link ships no NDI binaries and no NDI SDK files. The runtime (libndi.dylib /
// Processing.NDI.Lib.x64.dll) comes from NDI's own installer (NDI Tools or the NDI
// Runtime, https://ndi.video/tools/) and is loaded at run time – the mechanism NDI
// recommends for open-source projects.
//
// The few declarations below follow the NDI SDK headers, which NDI publishes under the
// MIT license (Copyright (C) 2023-2026 Vizrt NDI AB), see THIRD_PARTY.md.
// NDI® is a registered trademark of Vizrt NDI AB.

import { existsSync } from 'node:fs';
import path from 'node:path';
import koffi from 'koffi';

/** Official download pages of the NDI runtime (NDI SDK documentation). */
export const NDI_RUNTIME_URL = process.platform === 'darwin' ? 'https://ndi.link/NDIRedistV6Apple' : 'https://ndi.link/NDIRedistV6';
export const NDI_HOME_URL = 'https://ndi.video/';

const LIB_NAME = process.platform === 'win32' ? 'Processing.NDI.Lib.x64.dll' : 'libndi.dylib';

/** Places where NDI's installers put the runtime (newest API first). */
export function runtimeCandidates(env = process.env, platform = process.platform): string[] {
  const out: string[] = [];
  for (const v of ['NDI_RUNTIME_DIR_V6', 'NDI_RUNTIME_DIR_V5']) if (env[v]) out.push(path.join(env[v]!, LIB_NAME));
  if (platform === 'darwin') {
    out.push('/usr/local/lib/libndi.dylib', '/Library/NDI SDK for Apple/lib/macOS/libndi.dylib');
  } else if (platform === 'win32') {
    const pf = env.ProgramFiles || 'C:\\Program Files';
    out.push(path.win32.join(pf, 'NDI', 'NDI 6 Runtime', 'v6', LIB_NAME), path.win32.join(pf, 'NDI', 'NDI 5 Runtime', 'v5', LIB_NAME));
  }
  return [...new Set(out)];
}

// ------------------------------------------------------------------ declarations

const source_t = koffi.struct('NDIlib_source_t', {
  p_ndi_name: 'const char *',
  p_url_address: 'const char *',
});

const find_create_t = koffi.struct('NDIlib_find_create_t', {
  show_local_sources: 'bool',
  p_groups: 'const char *',
  p_extra_ips: 'const char *',
});

const recv_create_v3_t = koffi.struct('NDIlib_recv_create_v3_t', {
  source_to_connect_to: source_t,
  color_format: 'int32_t',
  bandwidth: 'int32_t',
  allow_video_fields: 'bool',
  p_ndi_recv_name: 'const char *',
});

const video_frame_v2_t = koffi.struct('NDIlib_video_frame_v2_t', {
  xres: 'int',
  yres: 'int',
  FourCC: 'uint32_t',
  frame_rate_N: 'int',
  frame_rate_D: 'int',
  picture_aspect_ratio: 'float',
  frame_format_type: 'int32_t',
  timecode: 'int64_t',
  p_data: 'void *',
  line_stride_in_bytes: 'int',
  p_metadata: 'const char *',
  timestamp: 'int64_t',
});

export const FRAME = { none: 0, video: 1, audio: 2, metadata: 3, error: 4, statusChange: 100, sourceChange: 101 } as const;
export const COLOR_RGBX_RGBA = 2;
export const BANDWIDTH = { lowest: 0, highest: 100 } as const;

export interface VideoFrame {
  xres: number;
  yres: number;
  FourCC: number;
  frame_rate_N: number;
  frame_rate_D: number;
  line_stride_in_bytes: number;
  p_data: unknown;
}

export interface NdiLib {
  path: string;
  version: string;
  initialize(): boolean;
  findCreate(): unknown;
  findWait(finder: unknown, ms: number): Promise<boolean>;
  findSources(finder: unknown): { name: string; url: string }[];
  recvCreate(name: string, url: string, low: boolean, recvName: string): unknown;
  recvDestroy(recv: unknown): void;
  /** Waits up to `ms` for the next frame (off the JS thread). Audio/metadata are not requested. */
  capture(recv: unknown, frame: Partial<VideoFrame>, ms: number): Promise<number>;
  freeVideo(recv: unknown, frame: VideoFrame): void;
  /** Copy of the frame's pixels (Electron forbids views on foreign memory). */
  pixels(frame: VideoFrame): Uint8Array;
}

export type LoadResult = { ok: true; lib: NdiLib } | { ok: false; error: string; tried: string[] };

/** uint8_t[n] decoded as one Uint8Array (a plain copy); types cached per frame size. */
const byteTypes = new Map<number, unknown>();
function bytes(n: number) {
  let t = byteTypes.get(n);
  if (!t) byteTypes.set(n, (t = koffi.array('uint8_t', n, 'Typed')));
  return t as ReturnType<typeof koffi.array>;
}

export function loadNdi(): LoadResult {
  const tried = runtimeCandidates();
  const file = tried.find((p) => existsSync(p));
  if (!file) return { ok: false, error: 'runtime-missing', tried };
  let so: ReturnType<typeof koffi.load>;
  try {
    so = koffi.load(file);
  } catch (e) {
    return { ok: false, error: `load: ${(e as Error).message}`, tried };
  }
  try {
    const version = so.func('const char *NDIlib_version(void)');
    const initialize = so.func('bool NDIlib_initialize(void)');
    const findCreate = so.func('void *NDIlib_find_create_v2(const NDIlib_find_create_t *p)');
    const findWait = so.func('bool NDIlib_find_wait_for_sources(void *inst, uint32_t ms)');
    const findSources = so.func('const NDIlib_source_t *NDIlib_find_get_current_sources(void *inst, _Out_ uint32_t *n)');
    const recvCreate = so.func('void *NDIlib_recv_create_v3(const NDIlib_recv_create_v3_t *p)');
    const recvDestroy = so.func('void NDIlib_recv_destroy(void *inst)');
    const capture = so.func(
      'int32_t NDIlib_recv_capture_v3(void *inst, _Out_ NDIlib_video_frame_v2_t *video, void *audio, void *meta, uint32_t ms)',
    );
    const freeVideo = so.func('void NDIlib_recv_free_video_v2(void *inst, const NDIlib_video_frame_v2_t *video)');
    const lib: NdiLib = {
      path: file,
      // "NDI SDK APPLE 12:49:17 Apr 13 2026 6.3.2.0" → "NDI 6.3.2.0"
      version: ((v) => (v.match(/(\d+\.\d+\.\d+(?:\.\d+)?)\s*$/) ? `NDI ${RegExp.$1}` : v))(String(version() ?? '')),
      initialize: () => initialize(),
      findCreate: () => findCreate({ show_local_sources: true, p_groups: null, p_extra_ips: null }),
      findWait: (f, ms) => new Promise((res, rej) => findWait.async(f, ms, (err: unknown, r: boolean) => (err ? rej(err) : res(r)))),
      findSources(f) {
        const n = [0];
        const ptr = findSources(f, n);
        if (!ptr || !n[0]) return [];
        const list = koffi.decode(ptr, source_t, n[0]) as { p_ndi_name: string; p_url_address: string }[];
        return list.map((s) => ({ name: s.p_ndi_name, url: s.p_url_address ?? '' }));
      },
      recvCreate: (name, url, low, recvName) =>
        recvCreate({
          source_to_connect_to: { p_ndi_name: name, p_url_address: url || null },
          color_format: COLOR_RGBX_RGBA,
          bandwidth: low ? BANDWIDTH.lowest : BANDWIDTH.highest,
          allow_video_fields: false,
          p_ndi_recv_name: recvName,
        }),
      recvDestroy: (r) => recvDestroy(r),
      capture: (r, frame, ms) =>
        new Promise((res, rej) => capture.async(r, frame, null, null, ms, (err: unknown, t: number) => (err ? rej(err) : res(t)))),
      freeVideo: (r, frame) => freeVideo(r, frame),
      pixels: (f) => koffi.decode(f.p_data, bytes(f.line_stride_in_bytes * f.yres)) as Uint8Array,
    };
    return { ok: true, lib };
  } catch (e) {
    return { ok: false, error: `symbols: ${(e as Error).message}`, tried };
  }
}
