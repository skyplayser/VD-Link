// Application menu (German / English). Menu commands are sent to the renderer as 'menu:<cmd>'.

import { app, Menu, type BrowserWindow, type MenuItemConstructorOptions } from 'electron';
import { listRecent } from './projects.ts';

const TXT = {
  de: {
    file: 'Ablage', new: 'Neues Projekt …', open: 'Projekt öffnen …', recent: 'Zuletzt geöffnet', none: 'Keine Projekte',
    save: 'Speichern', saveAs: 'Speichern unter …', start: 'Startbildschirm', settings: 'Einstellungen …',
    edit: 'Bearbeiten', view: 'Ansicht', window: 'Fenster', help: 'Hilfe', about: 'Über VD-Link', full: 'Vollbild',
  },
  en: {
    file: 'File', new: 'New Project …', open: 'Open Project …', recent: 'Open Recent', none: 'No projects',
    save: 'Save', saveAs: 'Save As …', start: 'Start Screen', settings: 'Settings …',
    edit: 'Edit', view: 'View', window: 'Window', help: 'Help', about: 'About VD-Link', full: 'Full Screen',
  },
};

let lang: 'de' | 'en' = 'de';

export function buildMenu(getWin: () => BrowserWindow | null, newLang?: 'de' | 'en') {
  if (newLang) lang = newLang;
  const t = TXT[lang];
  const send = (cmd: string, arg?: unknown) => () => getWin()?.webContents.send('menu:' + cmd, arg);
  const isMac = process.platform === 'darwin';
  const recent = listRecent().filter((r) => r.exists);

  const fileMenu: MenuItemConstructorOptions = {
    label: t.file,
    submenu: [
      { label: t.new, accelerator: 'CmdOrCtrl+N', click: send('new') },
      { label: t.open, accelerator: 'CmdOrCtrl+O', click: send('open') },
      {
        label: t.recent,
        submenu: recent.length ? recent.map((r) => ({ label: r.name, click: send('openPath', r.path) })) : [{ label: t.none, enabled: false }],
      },
      { type: 'separator' },
      { label: t.save, accelerator: 'CmdOrCtrl+S', click: send('save') },
      { label: t.saveAs, accelerator: 'Shift+CmdOrCtrl+S', click: send('saveAs') },
      { type: 'separator' },
      { label: t.start, accelerator: 'Shift+CmdOrCtrl+H', click: send('start') },
      ...(isMac ? [] : [{ type: 'separator' as const }, { label: t.settings, accelerator: 'Ctrl+,', click: send('settings') }, { role: 'quit' as const }]),
    ],
  };

  const template: MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const, label: t.about },
              { type: 'separator' as const },
              { label: t.settings, accelerator: 'Cmd+,', click: send('settings') },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    fileMenu,
    { label: t.edit, role: 'editMenu' },
    {
      label: t.view,
      submenu: [
        { role: 'togglefullscreen', label: t.full },
        ...(app.isPackaged ? [] : [{ type: 'separator' as const }, { role: 'reload' as const }, { role: 'toggleDevTools' as const }]),
      ],
    },
    { label: t.window, role: 'windowMenu' },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
