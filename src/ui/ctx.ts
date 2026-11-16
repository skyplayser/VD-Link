// Shared application context handed to every panel and dialog.
import type { Look } from '../shared/dmx-codec.ts';
import type { Rig } from '../shared/demo-rig.ts';
import type { FixtureDef } from '../shared/fixture-types.ts';
import type { ScenarioId } from '../shared/scenarios.ts';
import type { VideoWall } from '../render/videowall.ts';
import type { DmxStatus } from '../../electron/preload.ts';
import type { AppSettings, ProjectData } from '../project.ts';

export type TabId = 'view' | 'patch' | 'library' | 'walls' | 'connect';
export type DmxMode = 'auto' | 'net' | 'demo';
export type Quality = 'low' | 'mid' | 'high';
export type CamId = 'audience' | 'dj' | 'wide' | 'side';

export interface Ctx {
  /** The open project (null on the start screen before anything was opened). */
  project(): ProjectData | null;
  app: AppSettings;
  /** Call after changing project data (marks unsaved + autosave). */
  changed(): void;
  saveApp(): void;
  rig(): Rig | null;
  looks(): Look[];
  /** DMX buffer currently driving the rig (network or demo). */
  dmx(): Uint8Array;
  dmxStatus(): DmxStatus;
  usingNetwork(): boolean;
  walls(): VideoWall[];
  setScenario(id: ScenarioId): void;
  setFixture(def: FixtureDef, modeIndex: number): void;
  goTab(id: TabId): void;
  version(): string;
  /** Apply machine settings (quality, bloom, network) after a change. */
  applyApp(): void;
  /** Project file commands. */
  cmd(c: 'new' | 'open' | 'save' | 'saveAs' | 'start' | 'settings' | 'demo' | 'fixtureBuilder' | 'locationBuilder' | 'openLocation', arg?: unknown): void;
}
