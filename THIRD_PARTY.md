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
| [selfsigned](https://github.com/jfromaniello/selfsigned) 5.5.0 mit [@peculiar/x509](https://github.com/PeculiarVentures/x509), `@peculiar/asn1-*`, [pkijs](https://github.com/PeculiarVentures/PKI.js), asn1js, bytestreamjs, pvtsutils, pvutils, tsyringe, @noble/hashes, tslib, reflect-metadata | MIT; pkijs, asn1js, bytestreamjs: BSD-3-Clause; tslib: 0BSD; reflect-metadata: Apache-2.0 | Eigenes Zertifikat für den VR-Server im WLAN (HTTPS, WebXR verlangt eine sichere Verbindung) |
| [IWER](https://github.com/meta-quest/immersive-web-emulation-runtime) 2.8.0 mit [gl-matrix](https://github.com/toji/gl-matrix) | MIT | Nur im VR-Viewer mit `?emulate=quest2/quest3`: emulierte VR-Brille zum Testen ohne Brille (wird nur dann nachgeladen) |

## VDM (VD-Mobile) – App für Pico und Meta Quest (`vr-app/`, in Arbeit)

Eigene Android-App, getrennt von der Desktop-App gebaut. Sie spricht nur mit dem VR-Server von VD-Link (HTTP/SSE,
UDP-Suche im WLAN), NDI kommt in der Brille nicht vor. Die mitgelieferte Demo (`vr-app/demo/`) ist eine Aufnahme der
VD-Link-Vorlage „Club“ mit der Demo-Show von VD-Link. Der Raum darin (`venue.bin`) ist die Geometrie, die VD-Link
selbst zeichnet (`src/render/vr-export.ts`). Gobo-Bilder, Demo-Bilder der Videowände, die Lounge des Startbildschirms
(`scripts/home.gd`) und alle Shader sind eigene Arbeit. Schrift im Menü und in der Neon-Schrift ist Godots eingebaute
Schrift (Open Sans, SIL Open Font License 1.1, in Godots `COPYRIGHT.txt`).

| Baustein | Lizenz | Wofür |
|---|---|---|
| [Godot Engine](https://github.com/godotengine/godot) 4.7.2 (Android-Vorlage, `libgodot_android.so`) | MIT; die mitgebauten Bibliotheken stehen in Godots `COPYRIGHT.txt` (u. a. MIT, BSD, zlib, Apache-2.0) | Laufzeit der App, Darstellung (OpenGL ES 3) |
| [Godot OpenXR Vendors](https://github.com/GodotVR/godot_openxr_vendors) 5.1.0 (`libgodotopenxrvendors.so`, Plugin-AARs) | MIT | OpenXR-Anbindung je Hersteller |
| — darin Pico-Teil (`addons/godotopenxrvendors/pico/`, `godotopenxr-pico-release.aar`) | Apache-2.0 (`pico/LICENSE`) | Pico-Erweiterungen; enthält nur den Plugin-Code, kein Pico-SDK |
| [Khronos OpenXR Loader für Android](https://github.com/KhronosGroup/OpenXR-SDK) (`libopenxr_loader.so`) | Apache-2.0 | Verbindung zur OpenXR-Laufzeit der Brille |
| LLVM `libc++_shared.so` (Android NDK) | Apache-2.0 mit LLVM-Ausnahme | C++-Laufzeit |

Für eine Quest-Version kämen Teile von Meta dazu: der Loader steht unter Apache-2.0 (`meta/LICENSE-LOADER`), die
SDK-Teile unter der proprietären Oculus SDK License (`meta/LICENSE-SDK`). Die Quest-Version wird erst nach Prüfung
durch die Rechts-Session gebaut. Vor jeder Store-Veröffentlichung fragt die Entwicklung ebenfalls die Rechts-Session.

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
