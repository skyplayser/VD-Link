// Lamp gallery for the location builder: the full library (makers to fold out, live
// 3D preview) in a large window. "Add to project" puts the lamp type with the chosen
// mode into the location's lamp list; single-pick mode closes after one choice.

import type { FixtureDef } from '../shared/fixture-types.ts';
import type { Ctx } from './ctx.ts';
import { Modal } from './dialogs.ts';
import { el } from './dom.ts';
import { getLang } from './i18n.ts';
import { LibraryPanel } from './panels.ts';

let panel: LibraryPanel | null = null;
const root = el('div', 'gallery');

function open(ctx: Ctx, title: string, label: string, run: (def: FixtureDef, mode: number) => void, onClose: () => void = () => {}) {
  panel ??= new LibraryPanel(root, ctx);
  const m = new Modal(title, true);
  m.box.classList.add('gallery-modal');
  m.box.append(root);
  m.onClose = () => {
    panel!.pick = null;
    onClose();
  };
  panel.pick = { label, run: (d, mode) => run(d, mode) };
  void panel.ready.then(() => panel!.render());
  return m;
}

/** Gallery that stays open; every click on "add" calls onAdd. */
export function openGallery(ctx: Ctx, onAdd: (def: FixtureDef, mode: number) => void) {
  const de = getLang() === 'de';
  open(ctx, de ? 'Lampen-Galerie' : 'Lamp gallery', de ? 'Zum Projekt hinzufügen' : 'Add to project', onAdd);
}

/** Pick one lamp type (and mode). */
export function pickFromGallery(ctx: Ctx): Promise<{ def: FixtureDef; mode: number } | null> {
  const de = getLang() === 'de';
  return new Promise((resolve) => {
    let done = false;
    const m = open(
      ctx,
      de ? 'Lampe wählen' : 'Choose lamp',
      de ? 'Diese Lampe nehmen' : 'Use this lamp',
      (def, mode) => {
        done = true;
        resolve({ def, mode });
        m.close();
      },
      () => !done && resolve(null),
    );
  });
}
