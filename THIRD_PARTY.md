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
| [Koffi](https://github.com/Koromix/koffi) 3.3.8 (`koffi`, `@koromix/koffi-*`) | MIT | Aufruf der vom Nutzer installierten NDI®-Laufzeit |

## NDI®

VD-Link enthält **keine** NDI-Software. Für NDI-Streams lädt es zur Laufzeit die NDI-Laufzeit, die der Nutzer selbst von
NDI installiert ([ndi.video/tools](https://ndi.video/tools/)). Für diese Laufzeit gilt NDIs eigene Lizenz.
NDI® ist eine eingetragene Marke der Vizrt NDI AB. VD-Link ist kein Produkt von NDI. Einrichtung und die Bedingungen für
die NDI-Teile stehen in `docs/NDI.md`.

Die Deklarationen in `electron/ndi/ndi-lib.ts` folgen den Header-Dateien des NDI SDK, die NDI unter der MIT-Lizenz
veröffentlicht:

> Copyright (C) 2023-2026 Vizrt NDI AB. All rights reserved.
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files(the "Software"), to deal in the Software without restriction, including without limitation the
> rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
> Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
> WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
> OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Die Lizenztexte der Fixture-Daten liegen nach `npm run fixtures` in `public/fixtures/NOTICE.md` und werden mit der App ausgeliefert.

## Nur zum Bauen (nicht in der App)

Vite (MIT), esbuild (MIT), TypeScript (Apache-2.0), electron-builder (MIT), fast-xml-parser (MIT) und deren Abhängigkeiten. Vite bringt lightningcss (MPL-2.0) als Werkzeug mit; es landet nicht in der App.

## Bewusst nicht verwendet

GDTF-Share-Dateien (keine Weitergabe erlaubt – Import durch Nutzer geplant), Bibliotheken von MA, Daslight oder Capture (proprietär), Dateien des NDI SDK und die NDI-Laufzeit (proprietär, werden nicht mitgeliefert, siehe oben), Gobo-Grafiken der Hersteller. Gobos, Geräte-Modelle, Locations, Symbole und das Logo sind eigene Arbeit.

## Eigener Code mit Vorbild

- `native/macos/vd-display-helper.m` deklariert die macOS-Klassen `CGVirtualDisplay*` selbst. Die Schnittstelle ist nicht öffentlich; die Deklaration folgt dem, was u. a. [DeskPad](https://github.com/Stengo/DeskPad) (MIT) dokumentiert. Kein Code übernommen.
- Art-Net und sACN sind nach den öffentlichen Spezifikationen implementiert (Art-Net 4 von Artistic Licence, ANSI E1.31).

## Marken

Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd. NDI® ist eine eingetragene Marke der Vizrt NDI AB. Hersteller- und Produktnamen in der Bibliothek sind Marken ihrer Inhaber und dienen nur zur Bezeichnung der Geräte.
