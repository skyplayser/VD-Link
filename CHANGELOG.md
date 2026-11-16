# Änderungen

## 0.2.0 – in Arbeit

- Startanimation der Link-Suite (gemeinsamer Baustein aus dem Suite-Launcher): alle Programme fächern aus dem Suite-Zeichen auf, VD-Link fliegt auf sein Logo im Startbildschirm, die Kacheln blenden ein (≤ 2,5 s). Überspringen mit Taste oder Klick, „Bewegung reduzieren“ wird beachtet, einmal je Programmstart, nicht nach einem Absturz und nicht über der 3D-Ansicht. Schalter: Einstellungen → Oberfläche → Startanimation (Wie die Suite / An / Aus)
- Leistung: 3D-Ansicht, Builder und Vorschau pausieren, solange das Fenster minimiert oder ausgeblendet ist
- Leistung: 3D-Ansicht auf 60 fps begrenzt (einstellbar: Einstellungen → Darstellung → Bildrate), Builder 60 fps, Bibliotheks-Vorschau 30 fps – vorher wurde auf 165-Hz-Monitoren mit voller Bildschirmrate gerendert, was z. B. VJ-Link Grafikleistung genommen hat
- Bibliothek: Hersteller zum Aufklappen statt langer Liste (alle Lampen erreichbar), gleiche Marken zusammengefasst (z. B. cameo/Cameo, Clay Paky/Claypaky), Live-3D-Vorschau der gewählten Lampe mit Bewegung, Farbwechsel, Gobos und Pixel-Lauflicht über die echte Kanalbelegung
- Location-Builder: Umschalter Raum/Technik; Lampen-Galerie im Builder; „Lampen im Projekt“ per Drag & Drop in die 3D-Ansicht ziehen – auf eine Traverse = hängend (rastet auf der Traverse ein), auf Boden/Podest = stehend; Lampen erscheinen mit ihrem echten 3D-Modell; Taste F zoomt auf die Auswahl
- Eigenes Logo im Suite-Stil: „Bühnenboden“ – die fünf Suite-Farben als zwei Reihen Bodenkacheln in Perspektive (3D); App-Icon, `.icns`/`.ico`, Logo-PNGs und Logo im Programm (`npm run logo`)
- Location-Builder: runde Objekte – Bogen/Ellipse als D-Bühne, Ring-Podest, runde Wand/Brüstung, Bank oder Stufen; Kreis- und Bogen-Traversen; Rundsofas mit einstellbarem Winkel; elliptische Säulen; „Lampen darauf verteilen“ für jede Traverse
- 3 785 eigene Fixture-Definitionen (EPL-2.0), die Bibliothek wächst damit auf 6 084 Geräte von 231 Herstellern:
  - Kataloge (273): UKing (49, u. a. ZQ06133 mit 4×9 RGB-Pixeln + 4×9 Warmweiß-Linsen), YUER (70), Betopper (37) und 117 Standardlampen (Robe, Claypaky, Martin, GLP, Ayrton, Chauvet, Elation, JB-Lighting, SGM, Astera, PAR64, Fresnel, Molefay …)
  - Fixture-Recherche (3 512 aus `docs/fixture-research/modes/`): High-End/Touring/Theater 718, Mittelklasse/Verleih/Club 952, China-Direktvertrieb 579, China OEM/ODM 1 263 – 67 davon mit Kanalbelegung aus dem DMX-Protokoll des Herstellers (u. a. JB-Lighting P9/P10/P15/P18/M18/Sparx 9, Chauvet Maverick Storm, Rogue Outcast, GLP impression S500, Martin MAC Ultra Wash)
  - Dubletten (gleicher Name wie OFL/QLC+ oder Katalog, gleiche Shop-Daten) werden beim Erzeugen erkannt und ausgelassen; Liste in `docs/FIXTURES-VD.md`, erzeugt mit `npm run vd-fixtures`
- Steckbrief-Generator: neue Bauformen Scanner (Pan/Tilt = Spiegel), Leiste mit Einzelköpfen, Mehrarm-Effekt, Derby/Kugel (Rotation), Kugelkopf und GigBar (Set-Kanäle Par/Derby/Strobe/Laser); LED-Fresnel/-Profiler mit Farbmischung bekommen Farbkanäle; Goboräder mit typischen Motiven (`standardGoboWheel`)
- Fixture-Import: OFL-Goboräder übernehmen das Motiv aus dem Gobo-Bild (`gobos/10-circles` …); „White“, „Solid“, „None“ am QLC+-Goborad gelten als offen
- Bibliothek: Herstellerfilter, Suche entprellt, Liste zeigt höchstens 300 Treffer mit Hinweis auf die Gesamtzahl
- 3D-Modelle je Bauform: Moving Head (Spot/Beam/Wash/Bee-Eye/Matrix), Tilt-Bar, PAR, COB, Bar, Röhre, Blinder, Strobe/Matrix, Panel, Fresnel, Profiler, Retro, UFO, Laser – gleiche Bauteile werden für alle Lampen gemeinsam gezeichnet
- Pixel: jede LED-Zelle, Linse und jeder Halo-Ring leuchtet einzeln (DMX pro Zelle, Gruppen- und Mehrzellen-Kanäle); Pixel-Bars aus OFL/QLC+ bekommen ihre Pixel automatisch; Linsen-Zellen (Bee-Eye, Warmweiß-Linsen, Blinder) werfen eigene Lichtkegel
- Bibliothek: Hinweis „Kanalbelegung ungeprüft“ bei Definitionen nach Herstellerangaben
- Arbeitslicht für die 3D-Ansicht (macht Gehäuse und Traversen sichtbar)
- 3D-Ansicht: Washer (breit, weich), Spots (mit Gobos) und Beams (schmal, hart) werden unterschiedlich gezeichnet – automatisch aus den Fixture-Daten erkannt
- Startbildschirm vor der 3D-Ansicht: Weiterarbeiten, Neues Projekt (Vorlage Club/Disco/Festival), Projekt öffnen, Demo, grandMA2 verbinden, Einstellungen, zuletzt geöffnete Projekte
- Projektdateien `.vdlink`: Neu, Öffnen, Speichern, Speichern unter (⌘N/⌘O/⌘S/⇧⌘S), laufende Sicherung, Nachfrage bei ungespeicherten Änderungen, Öffnen per Doppelklick
- Einstellungen: Art-Net/sACN ein/aus, Anzahl Universes, DMX-Quelle und Universe-Zählung je Projekt, Qualität, Glühen, Sprache
- grandMA2-Assistent für „MA auf zweitem Rechner“ und „MA2 onPC auf diesem Windows-Rechner“ mit Live-Prüfung (ArtPoll vom Pult, ankommende Universes) und fertiger Befehlszeile
- Die 3D-Ansicht startet erst mit dem ersten Projekt
- **Location-Builder** („Eigene Location bauen“): erst Indoor-Club oder Outdoor-Festival wählen, dann leer oder aus Vorlage starten. 3D-Editor ohne laufende Lichter: Wände, Blöcke, Podeste, Treppen, Säulen, Rohre, Bar, DJ-Pult, Sofas, Tische, Aquarium, LED-Streifen, Traversen, Türme, Videowände, Lampen, Publikumsflächen; Verschieben/Drehen/Größe mit Raster, Objektliste, Eigenschaften (Material, Farbe, Auflösung, Lampe, Montage, fester Patch), „Traverse mit Lampen“, Rückgängig, Draufsicht, „Mit Licht ansehen“
- **Fixture-Builder**: eigene Lampen anlegen oder Bibliotheks-Lampen kopieren und anpassen – Modi, Kanäle, 16 bit, Bereiche (Strobe, Dimmer im Kanal, Farbe, Gobo, Prisma), Vorlagen, DMX-Test mit Vorschau
- Dateien: Location `.vdloc`, Lampe `.vdfix`, Projekt `.vdlink` (enthält Location und eigene Lampen – läuft auf jedem Rechner)
- **Ausgänge (HDMI)**: mehrere Videowände zu einem Bildschirm zusammenfassen (z. B. 5 LED-Streifen an der Decke an einem HDMI-Ausgang) – jede Wand zeigt ihren Pixel-Ausschnitt, automatisch gestapelt oder nebeneinander nach Lage im Raum, Mapping-Vorschau, ein virtueller Monitor je Ausgang
- Videowände frei drehbar (z. B. an der Decke nach unten), Auflösung folgt der Wandform, Quellen werden nie verzerrt
- Rigs mit gemischten Lampentypen und festem oder automatischem Patch
- Demo-Club nach Referenzbildern: Marmor-Bar mit Neon, Lounge mit Samt und Aquarium; Lichtkegel und Gobos auf allen Flächen sichtbar

## 0.1.0 – Beta (erste veröffentlichte Version)

- 3D-Ansicht mit WebGPU (Rückfall WebGL2): Moving Heads mit Lichtkegeln im Haze, Gobos, Prisma, Zoom, Strobe, Glühen
- Drei Szenarien: Club (1 Videowand), Großraumdisko (3 Videowände), Festival mit Tag/Nacht
- Art-Net 4 (inkl. ArtPoll) und sACN (Multicast, Priorität) als Eingang, Merge mehrerer Quellen, Universe-Zählung einstellbar
- Fixture-Bibliothek: Open Fixture Library + QLC+ (über 2.200 Geräte, inkl. UKing, Betopper, Shehds)
- Patch automatisch, Patchliste als CSV
- Videowände als virtuelle Monitore (macOS) – VJ-Link gibt darauf aus, VD-Link zeigt es auf der Wand
- Startbildschirm, Deutsch/Englisch, Demo-Show ohne Pult
