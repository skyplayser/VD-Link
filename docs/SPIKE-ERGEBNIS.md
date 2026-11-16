# VD-Link Tech-Spike – Ergebnis (13.11.2026)

Getestet auf MacBook Pro M4 Max, macOS 27.0.1, Electron 45.3.1, three.js 0.187.0.

## Kurzfassung

| Baustein | Status |
|---|---|
| Lichtkegel-Shader + Moving Heads | ✅ funktioniert, nach Optimierung sehr schnell |
| Art-Net-Empfang (inkl. ArtPoll → Pult findet VD-Link) | ✅ getestet (Testsender, 2 Universes, 39 fps) |
| sACN-Empfang (Multicast, Priorität) | ✅ getestet |
| Fixture-Datenbank OFL + QLC+ | ✅ 2286 Fixtures, 212 Hersteller, 91 % der Moving Heads vollständig erkannt |
| Virtueller Monitor macOS | ✅ wird erzeugt, macOS sieht ihn als 1920×1080-Bildschirm, verschwindet beim Beenden |
| Virtueller Monitor → Bild auf der 3D-Wand | ✅ macOS: Capture 1920×1080 @ 60 fps, Renderer bleibt bei 165 fps (nach Freigabe „Bildschirmaufnahme“) |
| Virtueller Monitor Windows | ⏳ nicht im Spike (kein Windows-Gerät), Plan unten |
| Messung auf Zielhardware (M2, GTX 1050 Ti/1060) | ⏳ offen – Referenzgeräte nötig |

## Leistung

Fenster 1600×950, Qualität „Mittel“, gemessen ohne VSync-Begrenzung (`VD_UNCAPPED=1`):

| Szene | Lichtkegel | fps |
|---|---:|---:|
| 50 Köpfe, Fächer | 50 | 1150 |
| 150 Köpfe, Fächer | 150 | 625 |
| 150 Köpfe, Prisma (3 Kegel je Kopf) | 423 | 194 |
| 300 Köpfe, Fächer | 300 | 311 |
| 300 Köpfe, Prisma | 870 | 97 |
| 150 Köpfe, Prisma, **WebGL2-Fallback** | 450 | 155 |

**Vor den Optimierungen** lag „150 Köpfe, Prisma“ bei **27 fps**. Drei Änderungen haben das gelöst:

1. **Instancing:** alle Lichtkegel in einem Draw-Call, Gerätekörper in 6 Draw-Calls – unabhängig von der Anzahl.
   (Three.js wendet die Instanz-Matrix vor einem eigenen Vertex-Shader an; deshalb `InstancedBufferGeometry`
   mit eigenen Attributen.)
2. **Haze aus 3D-Rauschtextur** statt 3 Oktaven Perlin pro Pixel; Kegel nur mit Rückseiten (halbe Überzeichnung).
3. **Frühabbruch** im Flächen-Shader, wenn ein Pixel nicht im Kegel liegt.

**Schätzung für die Zielhardware** (nicht gemessen!): Eine GTX 1050 Ti hat grob 1/7–1/8 der Rechenleistung
dieser GPU. Hochgerechnet: 150 Köpfe normal ≈ 70–80 fps, 150 Köpfe mit Prisma ≈ 25 fps auf „Mittel“ –
dort braucht es „Niedrig“ bzw. die automatische Auflösung. Muss auf echten Geräten gemessen werden.

## Fixture-Datenbank

| | |
|---|---|
| Open Fixture Library (MIT) | 653 Fixtures + 13 Marken-Klone (z. B. UKing = Lixada) |
| QLC+ (Apache-2.0) | 1781 Fixtures, davon 1633 nicht schon in OFL |
| UKing / Shehds / Betopper / Lixada / Yuer | 29 / 29 / 12 / 9 / **1** Einträge |

- China-typischer **kombinierter Kanal** („Aus / Master-Dimmer / Strobe / Offen“) wird erkannt und funktioniert
  in beide Richtungen (DMX → Bild und Bild → DMX).
- **Yuer ist praktisch nicht abgedeckt** → der geplante Fixture-Editor ist Pflicht, nicht Kür.
- Größe: 13 MB (Index 640 KB, Rest pro Hersteller nachgeladen).

## Erkenntnisse für die Architektur

- **WebGPU + TSL funktioniert** und fällt sauber auf WebGL2 zurück – dieselben Shader für beide.
- **Pult und VD-Link auf einem Rechner:** Art-Net-Port 6454 teilen klappt mit `SO_REUSEADDR`, aber
  Unicast-Antworten landen dann beim falschen Socket. Lösung im Spike: ArtPollReply zusätzlich an den
  Absender-Port. Empfehlung für Nutzer bleibt: sACN oder Art-Net-Unicast an 127.0.0.1.
- **Bildschirmaufnahme braucht unter macOS eine einmalige Freigabe** – muss im Onboarding erklärt werden.
- **Bewegungsträgheit:** Pan/Tilt fahren mit max. 360°/s bzw. 300°/s statt zu springen – wirkt sofort realistischer.

## Offene Punkte

1. **Onboarding:** Ohne Freigabe „Bildschirmaufnahme“ zeigt VD-Link jetzt einen klaren Hinweis; im Produkt
   braucht das einen geführten Einrichtungsschritt.
2. **Windows:** Treiber [VirtualDrivers/Virtual-Display-Driver](https://github.com/VirtualDrivers/Virtual-Display-Driver)
   (MIT) einbinden, Monitore per Konfiguration anlegen; Capture läuft über denselben Electron-Weg
   (Windows.Graphics.Capture). Treiber-Signatur und Hybrid-GPU (Optimus) auf einem Gaming-Laptop testen.
3. **Referenzgeräte messen:** MacBook Pro M2 (Basis), Laptop mit GTX 1050 Ti / 1060, RTX-Laptop.
4. Weitere Gerätetypen (PAR, Bars/Pixel, Strobe, Blinder, Laser), Gobos im Lichtkegel selbst, Spiegelkugel.
5. Vertrieb: macOS-Notarisierung (Apple-Developer-Konto) und Windows-Codesignatur einplanen.
