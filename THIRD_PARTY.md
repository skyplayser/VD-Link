# Drittanbieter-Bausteine

VD-Link selbst steht unter der Eclipse Public License 2.0 (`LICENSE`).

## In der App enthalten

| Baustein | Lizenz | Wofür |
|---|---|---|
| [three.js](https://github.com/mrdoob/three.js) 0.187.0 | MIT | 3D-Darstellung (WebGPU/WebGL2), inkl. OrbitControls, BloomNode, SkyMesh |
| [Electron](https://github.com/electron/electron) 45.3.1 | MIT (bringt Chromium u. a. mit eigenen Lizenzen mit, siehe `LICENSES.chromium.html` im App-Paket) | Desktop-Laufzeit |
| [Inter Display](https://github.com/rsms/inter) | SIL Open Font License 1.1 (`assets/fonts/Inter-OFL.txt`) | Logo und App-Icon (als Bild gerendert) |
| Fixture-Daten der [Open Fixture Library](https://github.com/OpenLightingProject/open-fixture-library) | MIT | Fixture-Bibliothek, Autoren je Gerät in `source.authors` |
| Fixture-Definitionen von [QLC+](https://github.com/mcallegari/qlcplus) (`resources/fixtures`) | Apache-2.0 | Fixture-Bibliothek, umgewandelt (verändert) ins VD-Link-Format, Autoren je Gerät in `source.authors` |

Die Lizenztexte der Fixture-Daten liegen nach `npm run fixtures` in `public/fixtures/NOTICE.md` und werden mit der App ausgeliefert.

## Nur zum Bauen (nicht in der App)

Vite (MIT), esbuild (MIT), TypeScript (Apache-2.0), electron-builder (MIT), fast-xml-parser (MIT) und deren Abhängigkeiten. Vite bringt lightningcss (MPL-2.0) als Werkzeug mit; es landet nicht in der App.

## Bewusst nicht verwendet

GDTF-Share-Dateien (keine Weitergabe erlaubt – Import durch Nutzer geplant), Bibliotheken von MA, Daslight oder Capture (proprietär), NDI SDK (proprietär), Gobo-Grafiken der Hersteller. Gobos, Geräte-Modelle, Locations, Symbole und das Logo sind eigene Arbeit.

## Eigener Code mit Vorbild

- `native/macos/vd-display-helper.m` deklariert die macOS-Klassen `CGVirtualDisplay*` selbst. Die Schnittstelle ist nicht öffentlich; die Deklaration folgt dem, was u. a. [DeskPad](https://github.com/Stengo/DeskPad) (MIT) dokumentiert. Kein Code übernommen.
- Art-Net und sACN sind nach den öffentlichen Spezifikationen implementiert (Art-Net 4 von Artistic Licence, ANSI E1.31).

## Marken

Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd. Hersteller- und Produktnamen in der Bibliothek sind Marken ihrer Inhaber und dienen nur zur Bezeichnung der Geräte.
