# VD-Link – Konzept

VD-Link (Virtual-Demo Link) ist der 3D-Lichtvisualisierer der Suite mit LJ-Link und VJ-Link – vergleichbar mit MA 3D oder dem Daslight-Visualizer, aber frei (EPL-2.0) und auf günstige Laptops ausgelegt.

## Ziele

- Empfängt DMX von **allen gängigen Pulten** über Art-Net 4 und sACN (grandMA2/3, ChamSys, Avolites, Hog, Onyx, ETC Eos, Daslight, QLC+). LJ-Link sendet selbst kein DMX, sondern Takt und Tempo an die Pulte. Kein eigenes Lichtpult, nur ein Testmodus.
- **Drei fertige Szenarien:** Club mit einer Videowand hinter dem DJ, Großraumdisko mit drei Videowänden, Festival im Freien mit Tag/Nacht.
- **Eigene Szenarien** in einem 3D-Editor (Truss, Bühne, Wände, Geräte einrasten, Patch, Kamera-Presets, Import glTF, Austausch über MVR).
- **Videowände als virtuelle Monitore:** Jede Wand erscheint im System als Bildschirm, VJ-Link (oder jede andere Software) gibt im Vollbild darauf aus. Zusätzlich Syphon (macOS) und Spout (Windows).
- **Fixture-Bibliothek** aus offenen Quellen: Open Fixture Library (MIT) und QLC+ (Apache-2.0), dazu Import von GDTF/QXF/OFL durch den Nutzer und ein eigener Fixture-Editor (wichtig für China-Geräte wie Yuer, die kaum erfasst sind).
- **Rolle in der Suite:** LJ-Link führt, VJ-Link und VD-Link folgen. VD-Link steuert weder LJ-Link noch VJ-Link.
  - Heute: VJ-Link gibt per virtuellem Monitor auf die Videowände aus – der VJ wählt den Bildschirm in VJ-Link selbst.
  - Offen, erst nach Bestätigung durch den Entwickler: ob und wie VD-Link Daten von LJ-Link übernimmt (z. B. Takt für die Demo-Show) oder ob LJ-Link aktiv zu VD-Link verbindet.

## Rahmen

- Plattformen: macOS 13+ (Apple Silicon) und Windows 10 22H2 / 11 (x64).
- Zielhardware: MacBook Pro ab M2, Gaming-Laptops ab 2018 (ungünstigster Fall GTX 1050 Ti / 1060).
- Nur Code, Daten und Assets mit Lizenzen, die Open Source **und** kommerzielle Nutzung erlauben.

## Phasen

0. Tech-Spike (erledigt, siehe `SPIKE-ERGEBNIS.md`)
1. Beta 0.1: drei Szenarien, Bibliothek, Patch, Art-Net/sACN, virtuelle Monitore macOS, Oberfläche wie VJ-Link (dieser Stand)
2. Windows-Monitore (Virtual-Display-Driver), Syphon/Spout, weitere Gerätetypen, Messungen auf Zielhardware
3. 3D-Editor, Fixture-Editor
4. MVR/GDTF, Video-Export; Anbindung an LJ-Link nur nach Absprache (LJ-Link führt)
