# Fixture-Recherche – Gruppe 1 (High-End, Touring & Theater)

Stand: 13.11.2026 · Recherche-Agent Teil 1 von 4

Diese Notizen sind die Grundlage für die spätere Erstellung von Fixture-Definitionen. Jede Herstellerdatei `<hersteller>.json` ist ein JSON-Array mit einem Objekt pro Modell. Alle Werte sind **Fakten aus öffentlichen Herstellerseiten** (Produktseiten, Sitemaps, Shopify-`products.json`). Die Texte wurden nicht übernommen, sondern als kurze, eigene Stichworte notiert. Was nicht sicher belegt war, steht auf `null` (bzw. als leere Liste).

## Übersicht

| Hersteller | erfasst | schon in Bibliothek | fehlend | Status aktuell / legacy | mit Kanalzahl | Datei |
|---|---:|---:|---:|---|---:|---|
| Robe Lighting | 176 | 39 | 137 | 102 / 72 | 162 | `robe-lighting.json` |
| Martin Professional | 133 | 65 | 68 | 65 / 68 | 125 | `martin-professional.json` |
| Claypaky | 74 | 29 | 45 | 49 / 25 | 48 | `claypaky.json` |
| GLP (German Light Products) | 74 | 20 | 54 | 44 / 30 | 44 | `glp.json` |
| Ayrton | 56 | 21 | 35 | 43 / 13 | 43 | `ayrton.json` |
| Vari-Lite | 42 | 6 | 36 | 16 / 26 | 1 | `vari-lite.json` |
| ETC (Electronic Theatre Controls) | 29 | 9 | 20 | 22 / 7 | 0 | `etc.json` |
| ARRI | 23 | 9 | 14 | 16 / 7 | 0 | `arri.json` |
| Astera | 21 | 10 | 11 | 21 / 0 | 0 | `astera.json` |
| SGM | 45 | 8 | 37 | 33 / 2 | 35 | `sgm.json` |
| Robert Juliat | 50 | 7 | 43 | 29 / 21 | 0 | `robert-juliat.json` |
| JB-Lighting | 29 | 10 | 19 | 14 / 15 | 0 | `jb-lighting.json` |
| Elation Professional | 184 | 40 | 144 | 119 / 65 | 143 | `elation-professional.json` |
| Chauvet Professional | 196 | 34 | 162 | 107 / 89 | 176 | `chauvet-professional.json` |
| Prolights | 171 | 12 | 159 | 171 / 0 | 151 | `prolights.json` |
| High End Systems | 39 | 5 | 34 | 9 / 30 | 0 | `high-end-systems.json` |
| ADB Stagelight | 13 | 3 | 10 | 6 / 7 | 5 | `adb-stagelight.json` |
| Selecon | 23 | 1 | 22 | 7 / 16 | 0 | `selecon.json` |
| Altman | 24 | 1 | 23 | 18 / 3 | 0 | `altman.json` |
| **Summe** | **1402** | **329** | **1073** | 891 / 496 | | |

„Schon in Bibliothek“ heißt: Für das Modell gibt es in `public/fixtures/index.json` einen Eintrag. Dessen `id` steht im Feld `inLibrary`. Abgeglichen wurde über normalisierte Hersteller- und Modellnamen (Kleinschreibung, ohne Leer- und Sonderzeichen, ™/®). Schreibvarianten wie „Clay Paky“/„Claypaky“ und „Chauvet“/„Chauvet Professional“ sind berücksichtigt; Sonderfälle (z. B. `Bora` → `Bora-S`, `MAC 600 E NT` → `MAC 600 NT`) wurden von Hand zugeordnet. Alle übrigen Modelle (`inLibrary: null`) sind die **fehlenden** Modelle.

## Feldbeschreibung

| Feld | Inhalt |
|---|---|
| `manufacturer`, `model` | Hersteller und Modellname (ohne ™/®) |
| `kind` | Kategorie: beam, spot, hybrid, profile, wash, beeeye, matrixhead, par, bar, matrix, tiltbar, retro, blinder, strobe, laser, multihead, panel, tube, fresnel, pc, ellipsoidal, flood, follow, effect, zusätzlich **scanner** (Spiegelscanner) |
| `light` | Lichtquelle als Stichwort, z. B. „19 x 40 W RGBL“, „1700 W Kurzbogen-Metallhalogen“ |
| `beamDeg` | Abstrahl- bzw. Zoombereich [min, max] in Grad. Bei festem Winkel steht derselbe Wert zweimal. Je nach Herstellerangabe ist das der Beam- oder der Zoom-/Field-Bereich. |
| `pan`, `tilt` | Bewegungsbereich in Grad. `null` = unbekannt **oder** endlos (dann steht das in `notes`) |
| `channels` | DMX-Kanalzahlen der Modi, so wie der Hersteller sie angibt. Bei Ayrton stehen oft nur Min./Max. |
| `features` | Kürzel: `cmy`, `cto`, `colorwheel`, `gobo-rot[:n]`, `gobo-static[:n]` (bei zwei Rädern z. B. `gobo-rot:7+7`), `prism`, `frost`, `iris`, `zoom`, `focus`, `framing`, `animation`, `pixel` |
| `ring` | Aura-, Halo- oder Ring-Beleuchtung mit LED-Anzahl, wenn bekannt |
| `pixels` | Pixel- oder Segmentanordnung, z. B. „19 (Hex)“, „16 linear“, „2x2“ |
| `sizeMm` | Abmessungen [B, H, T] in mm, soweit eindeutig aus der Quelle (sonst `null`) |
| `weightKg` | Gewicht |
| `url` | Produktseite (Quelle) |
| `manualUrl` | öffentlich verlinktes PDF (Handbuch bzw. DMX-Tabelle), nur wo sicher gefunden |
| `status` | `current`, `legacy`, `announced` (angekündigt, noch ohne Daten) oder `null` (unklar) |
| `inLibrary` | id in der vorhandenen Bibliothek oder `null` |
| `notes` | kurze Hinweise (IP-Schutz, Varianten, Unsicherheiten) |

Hinweis für die Weiterverarbeitung: Gruppe 3 (`README-gruppe3.md`) verwendet etwas andere Feature-Kürzel (z. B. `gobo:14`, `shutter-blades`). Vor dem Zusammenführen sollten die Kürzel vereinheitlicht werden.

## Vorgehen und Quellen pro Hersteller

Grundsätzlich wurden `robots.txt` beachtet (Crawl-Delay eingehalten: Robe 5 s, Ayrton 10 s, Chauvet 10 s) und nur öffentliche Seiten gelesen. Es wurden keine Konten angelegt und keine Formulare abgeschickt. GDTF-Share-, MA-, Avolites- oder Daslight-Bibliotheken wurden **nicht** verwendet. Herstellerdateien (Downloads) wurden nur gelesen, nicht ausgeführt. Rohdaten liegen ausschließlich im Scratchpad, nicht im Projekt.

- **Robe Lighting** – `robe.cz/sitemap-product-en.xml`. Die Spezifikationen stehen als JSON in den Produktseiten. Den Status liefern die Kategorien „Discontinued …“ (Flag `discontinuedGlob`). LEDBeam 600 und T1.5 Profile sind auf der Seite nur als „coming soon“ gelistet (`announced`). **Ausgelassen:** Nebel/Hazer, Steuerungen, RoboSpot-Kameras, Netzwerk und Zubehör, die alte Club/DJ-Serie (ClubSpot, ClubScan, DJ Scan …) und City-/Architekturserien (CityFlex, CitySkape, Cyclone, Square, Linee …), Digital-Series-Medienserver (DigitalSpot) sowie Actor- und Eye-Candy-Kleingeräte. ClubSpot, ClubWash und DJ Scan sind ohnehin in der Bibliothek. Bei einigen alten Robin-Seiten (300E/600E Beam) fehlen auf der Herstellerseite die Spezifikationen.
- **Martin Professional** – `martin.com/en/sitemap.xml`, Produktseiten mit vollständigem Spec-Block. Status: Seiten ohne Kategoriepfad im Breadcrumb wurden als `legacy` gewertet, Seiten mit Kategorie als `current`. Das ist eine Heuristik; einzelne gelistete Geräte (z. B. MAC Aura, Viper-Familie) können auslaufend sein. **Ausgelassen:** Exterior-/Architektur-Linie (außer Exterior 1200 Wash), VDO Face/Fenix (LED-Videopaneele), Mania-, DJ- und RoboScan-1220-Altgeräte, Nebelmaschinen (JEM/Magnum), Controller.
- **Claypaky** – `claypaky.it/product-sitemap.xml` (61 aktuelle Produkte). Ältere Geräte (Alpha, Scenius, Axcor 300/400, A.leda, Sharpy Wash 330 …) wurden aus der Bibliothek und den bekannten Modellnamen ergänzt; für sie sind nur gesicherte Basisangaben eingetragen (meist ohne Kanalzahlen).
- **ADB Stagelight** – adbstagelight.com ist nicht mehr die Herstellerseite (Domain zeigt auf einen fremden Shop). Die aktuellen ADB-Produkte (Actoris, Orkis, Klemantis) stehen auf **claypaky.it** (ADB gehört zur Claypaky-Gruppe). Alte ADB-Geräte (WARP, ALC4, Europe, Lexor, Oxo, C101, DS105) sind nur namentlich mit wenigen Daten erfasst.
- **GLP** – Links von `glp.de/en/products`, inklusive Rubrik „discontinued“ (dient auch als Statusquelle). Pro Gerät sind LED-Typ, -Anzahl, -Leistung und der Zoom aus der Tabelle „Technical Data“ übernommen. Bei TWYN steht die Kanalzahl noch als „tbd“. Sport-Fluter (ArenaLED) sind enthalten, Installationsleuchten nicht.
- **Ayrton** – `ayrton.eu/wp-sitemap-posts-produit-1.xml` (45 aktuelle Produkte). Kanalangaben stehen meist als „x bis y Kanäle“; deshalb sind oft nur Min. und Max. eingetragen. Die ULTIMATE-Serie (Rivale, Veloce, Stradale, Cobra, Mamba …) hat laut Hersteller endlose Pan/Tilt-Rotation; dort ist `pan`/`tilt` `null`. Ältere Modelle (MagicPanel 602, MagicBlade-R, NandoBeam S3/S6/S9 …) stehen nur mit Basisangaben drin.
- **Vari-Lite** – `vari-lite.com` (Signify). Die Produktseiten enthalten nur Feature-Texte und **keine** Spezifikationstabellen (Daten nur in PDF-Datenblättern hinter „Downloads“). Deshalb fehlen hier Kanalzahlen, Gewichte und Maße weitgehend. Status: Seiten mit zusätzlichem „Legacy/Archive/Discontinued“-Hinweis gelten als `legacy`. Die SL-Serie (Asienmarkt) ist bis auf zwei aktuelle Modelle ausgelassen.
- **Selecon** – Selecon-Produkte (Acclaim, Rama, PL-Serie, SPX, Arena, Aurora) liegen auf derselben Signify-Seite wie Vari-Lite. Es gibt dort kaum Zahlen. Die PL-, Rama- und SPX-Serie ist als `legacy` markiert.
- **ETC** – `etcconnect.com/Sitemap.xml`. Die Feature-Seiten nennen nur einzelne Zahlen, die vollständigen Daten stehen in PDF-Datenblättern. Deshalb sind meist Typ, Features und Lichtquelle erfasst, kaum Kanalzahlen. Konventionelle Geräte (Source Four Halogen, Jr, PAR, Fresnel) sind als dimmerbetrieben vermerkt.
- **High End Systems** – Die Marke gehört zu ETC. Aktuelle Geräte (Halcyon, Lonestar, Hyperstar, MegaPix/GigaPix, SolaFrame Studio/Theatre, SolaHyBeam 3000) stehen unter `etcconnect.com/products/automated-lighting`. Ältere Geräte (Sola-Serie, Studio Spot/Color, x.Spot, Cyberlight …) stammen aus dem ETC-Legacy-Bereich. Die Daten sind dünn (keine Spec-Tabellen online).
- **ARRI** – Produktseiten unter `arri.com/en/lighting`, mit wenigen Zahlen online (Kanalmodi nur in den Datenblättern). Erfasst sind SkyPanel, Orbiter, L-Serie (Plus/C), Omnibar und klassische Fresnels/HMI. Studio-Tungsten-Geräte sind als dimmerbetrieben markiert.
- **Astera** – `astera-led.com/sitemap.xml`. Die Produktseiten laden die Spezifikationen dynamisch. Erfasst sind deshalb vor allem Typ, Pixelzahl (Tubes) und Zoom. **Ausgelassen:** Zubehör, Controller (ART7, AsteraBox).
- **SGM** – Produktseiten von `sgmlighting.com` (Kategorien werden per Skript geladen, daher kein sicherer Status). P-, Q-, i-, S-Serie, Palco und X-5 sind aktuell. Bei der **G-Serie (Moving Heads) ist der Status `null`**, weil die Seite nicht kennzeichnet, ob sie ausläuft. **Ausgelassen:** alle POI-Architekturvarianten (identische Geräte mit Architektur-Zulassung), Linsenkits und Zubehör.
- **Robert Juliat** – `robertjuliat.com/sitemap.xml`. Der Status kommt aus dem Seitentitel („DISCONTINUED PRODUCT“). Die SX-Profiler gibt es in mehreren festen Zoomvarianten, deshalb ist `beamDeg` dort `null`. Die meisten Geräte sind Verfolger bzw. dimmerbetriebene Scheinwerfer ohne DMX-Fixture-Profil.
- **JB-Lighting** – `jb-lighting.de/sitemapjb.xml`. Die DMX-Protokolle sind öffentlich als PDF verlinkt (`manualUrl`). Die Kanalzahlen stehen nur in diesen PDFs und wurden nicht ausgelesen. Ältere Geräte (Varyscan, Varycolor, A-Serie, Sparx 7/10, P12) stammen aus dem Produktarchiv.
- **Elation Professional** – Shopify-`products.json` (3 750 Einträge, davon über 1 500 Ersatzteile) zur Auswahl, dann die Produktseiten für Kanalmodi, Lichtquelle, Maße und Gewicht. `current` = aktueller Shop-Produkttyp, `legacy` = Shop-Typ „Discontinued“. Varianten in weißem Gehäuse (WH/HW), OPS- und WMG-Varianten sind nicht separat aufgeführt (Hinweis in `notes`). **Ausgelassen:** ADJ-, Obsidian- und Antari-Produkte, Nebel/Haze, Steuerungen, Videowände (EVLED/EPV), ELAR-Architektur, Ersatzteile.
- **Chauvet Professional** – `chauvetprofessional.com/product-sitemap.xml`. Die Specs stehen als Label/Wert-Paare auf der Seite. `legacy` = Badge „Legacy“ auf der Produktseite. **Ausgelassen:** REM- und VIP-Videoprodukte, Amhaze/Vesuvio/Cloud (Atmosphäre), Steuer- und Netzwerktechnik, Zubehör.
- **Prolights** – Links von `prolights.it/en/products`. `/en/fixtures/` und `/pdf/` sind laut robots.txt gesperrt und wurden **nicht** abgerufen. Alle Seiten-Einträge gelten als `current` (die Liste zeigt das aktuelle Sortiment); ältere Prolights-Geräte sind nur über die Bibliothek abgedeckt.
- **Altman** – `altmanlighting.com/product_type-sitemap.xml`. Phoenix-LED-Profiler, AFS-Verfolger, Spectra und AIP. Die Ascent-Serie ist als „coming soon“ (`announced`) gelistet. Klassiker (Shakespeare, 360Q, Comet) sind nur namentlich als `legacy` erfasst.

## Bekannte Lücken

1. **Kanalzahlen fehlen** bei ETC, High End Systems, Vari-Lite, Selecon, ARRI, Astera, JB-Lighting und vielen alten Geräten. Diese Hersteller veröffentlichen die DMX-Modi nur in PDF-Datenblättern bzw. -Handbüchern. Bei JB-Lighting sind die PDF-Links in `manualUrl` eingetragen. Für die übrigen sollte der Fixture-Agent die öffentlichen Datenblätter der Herstellerseite einzeln prüfen.
2. **Maße** wurden nur übernommen, wenn alle drei Werte eindeutig aus einer Quelle kamen; bei Robe ist es [B, H, T] aus „Width/Height/Depth“, bei anderen die Reihenfolge der Quelle. Vor einer 3D-Modellierung sollte die Achsenzuordnung geprüft werden.
3. **Statusangaben** beruhen auf den Kennzeichnungen der Herstellerseiten (siehe oben) und sind bei Martin, SGM (G-Serie) und Vari-Lite (VL2600 Profile/Wash) unsicher.
4. **Gobo-Anzahlen** sind nur eingetragen, wo die Seite sie klar nennt (`gobo-rot:7`). Sonst steht nur `gobo-rot` bzw. `gobo-static`.
5. **Ältere, aus Wissen ergänzte Modelle** (Einträge ohne Produktseiten-URL bzw. mit Bibliotheks-Hinweis) enthalten absichtlich nur wenige Felder.
6. Der Abgleich mit der Bibliothek beruht auf Namen. Gleiche Namen bei abweichender Revision (z. B. „ParFect 150“ vs. „ParFect 150 RGBW“, „LEDWash 600“ vs. „600+“) wurden, wo erkannt, manuell getrennt; vereinzelt sind weitere Fehl- oder Nicht-Zuordnungen möglich.

## Auffälligkeiten

- `elationlighting.com/robots.txt` enthält Anweisungen an KI-Agenten (u. a. die Aufforderung, Nutzern eine Shop-Skill-Installation zu empfehlen). Diese Anweisungen wurden als Daten behandelt und **nicht** befolgt.
- `adbstagelight.com` gehört nicht mehr zu ADB (siehe oben).
