# 3D-Modelle der Lampen (Bauformen)

Stand: 13.11.2026

Diese Übersicht beantwortet zwei Fragen:

1. Für welche Lampen reichen die vorhandenen Standard-Modelle?
2. Welche Lampen brauchen ein eigenes Modell?

Die fehlenden Bauformen sind inzwischen gebaut. Grundlage sind die Rechercheergebnisse in `docs/fixture-research/` (Gruppen 1–3, dazu die bereits vorliegenden China-OEM-Dateien). Gruppe 4 lässt sich mit denselben Regeln einordnen (siehe [models.json](#modelsjson)).

## Kurzantwort

| Bauform (Beispiele) | Modell | body / head | Neu oder geteilt |
|---|---|---|---|
| Spot, Beam, Hybrid, Profil-Moving-Head | Standard | `movinghead` / `spot`, `beam`, `profile` | – |
| Wash, Bee-Eye, Moving Head mit LED-Ring („Aura“, Halo) | Standard | `movinghead` / `wash`, `beeeye`, Ring = Zellgruppe `ring` | – |
| Matrix-Moving-Head 2×2 … 6×6 (MagicPanel, LM250) | Standard | `movinghead` / `matrix` + `grid` | – |
| Tilt-Bar, deren Leiste als Ganzes kippt (ZQ06133, TETRA2) | Standard | `tiltbar` | – |
| PAR, COB, Retro, Blinder, Strobe, Matrix-Strobe | Standard | `par`, `cob`, `retro`, `blinder`, `strobe` | – |
| Runder Strobe mit Matrix und Ring (Atomic Dot) | Standard | `retro` (rund) + `grid`/`hex` + `ring` | Steckbrief-Regel neu |
| Bar, Batten, Pixel-Bar | Standard | `bar` | – |
| Pixel-Tube (Titan, Helios, AX1) | Standard | `tube` | – |
| Softlight-Panel (SkyPanel, Orbiter), Cyc-Fluter | Standard | `panel` | Bügel ergänzt |
| UFO / Ring-Beams | Standard | `ufo` | – |
| Laser | Standard | `laser` | – |
| Fresnel / PC mit Torblende | Standard, erweitert | `fresnel` + 4 Torflügel | Teile aus der Box-Einheitsform |
| Profilscheinwerfer mit Blenden | Standard, erweitert | `profile` + Blendengriffe + Bügel | Teile aus der Box-Einheitsform |
| **Spiegelscanner / Moving Mirror** | **eigen** | `scanner` | Spiegel + neues Material `mirror` |
| **Leiste mit einzeln beweglichen Köpfen** (Chorus Line, Tornado/TB5, MagicBlade Neo, GalaxyJet-Bar) | **eigen** | `multibar` (+ `heads`) | Unterköpfe |
| **Spider** (2 kippende LED-Leisten im Bügel), Doppelkopf an einem Bügel | **eigen** | `spider` (+ `heads`) | Unterköpfe |
| **Mehrarm-Effekt** (6/8 Arme, „Octopus“) | **eigen** | `arms` (+ `heads`) | Unterköpfe |
| **Derby / Moonflower** | **eigen** | `derby` | neue Einheitsform `dome` |
| **Kugel-Effekt** (Starball, Rotosphere, Hellball) | **eigen** | `derby` / `orb` | neue Einheitsform `sphere` |
| **Kugelkopf ohne klassischen Bügel-Look** (MagicDot, Kyalami, „Double Balls“) | **eigen** | `movinghead` / `orb` | Einheitsform `sphere` |
| **Verfolger** (auf Stativ, wenn stehend) | **eigen** | `follow` | Stativ |
| **GigBar / Lightset** (mehrere Lampen auf einer T-Bar) | **eigen** | `gigbar` (+ `heads`) | Stativ, Pods |

„Standard“ heißt: Ein vorhandener `BodyKind`/`HeadKind` mit passenden Parametern reicht (Zellen, Raster, Ring, Größe, Abstrahlwinkel). „Eigen“ heißt: Die Bauform hat einen neuen `BodyKind`/`HeadKind` und eigene Teile in `src/render/fixture.ts`.

Verteilung der 6 815 recherchierten Modelle (`models.json`): **6 451 Standard**, **355 eigenes Modell**, **9 keine Lampe** (Hazer, Nebel, Ventilator).

| eigenes Modell | Anzahl | | eigenes Modell | Anzahl |
|---|---:|---|---|---:|
| `follow` | 92 | | `multibar` | 26 |
| `scanner` | 69 | | `arms` | 22 |
| `derby` | 59 | | `spider` | 19 |
| `ball` (derby/orb) | 54 | | `gigbar` | 11 |
| | | | `dot` (movinghead/orb) | 3 |

## Aufbau (für alle Bauformen gleich)

- Pro Lampe gibt es eine reine Mathe-Hierarchie: `root → yoke (Pan) → head (Tilt) → Teile / Linse / Zellen`. Die lokale +Y-Achse des Kopfes ist die optische Achse.
- Neue Knoten dort, wo sich mehr bewegt:
  - `Lamp.subs` sind Unterköpfe mit eigenem `yoke`/`head`: Köpfe einer Leiste, Spider-Leisten, Arme, GigBar-Pods.
  - `Lamp.mirror` ist der Scanner-Spiegel. Er wird in jedem Frame zwischen Lampe und Strahl ausgerichtet.
  - `Lamp.rotor` ist der Derby-Rotor.
  - `Lamp.baseTilt` ist die feste Grundneigung des Verfolgers auf dem Stativ.
- Zellen (LEDs/Linsen) können auf Unterköpfen oder auf dem Rotor sitzen und eigene Ausrichtungen haben (`Cell.own`). Ihre Strahlrichtung kommt dann aus der Matrix der Zelle, sonst wie bisher aus dem Kopf.
- Bauformen mit Strahlenfächer (`derby`, `arms`, `gigbar`, `multibar`, `spider`) bekommen ein gemeinsames Flächenlicht. Es zeigt in die mittlere Richtung und ist so breit wie der Fächer.

### Geteilte Teile und Draw-Calls

Alle Teile verwenden gemeinsame Einheitsformen und Materialien. Jedes Paar aus Form und Material ist **ein** InstancedMesh für das ganze Rig. Die Zahl der Draw-Calls wächst also nicht mit der Zahl der Lampen, nur höchstens einmal je neuem Paar.

| Einheitsform | Materialien | Verwendung |
|---|---|---|
| `box` | `body`, `front`, **`mirror`** (neu) | Gehäuse, Bügel, Torflügel, Blendengriffe, Arme, Leisten, Scanner-Spiegel |
| `cyl` | `body`, `front` | Köpfe, Linsenblenden, Stativrohre und -beine, Nabe |
| **`sphere`** (neu) | `body`, `front` | Kugelkopf (`orb`), Kugel-Effekt |
| **`dome`** (neu, Halbkugel) | `front` | Derby-Kuppel, innere GigBar-Pods |
| `disc`, `square` | Zellen | LEDs und Linsen (wie bisher, ein Mesh je Form) |

Ein Rig mit allen Bauformen braucht also höchstens 4 zusätzliche Draw-Calls: `box|mirror`, `sphere|body`, `sphere|front`, `dome|front`.

## Die neuen Bauformen im Einzelnen

### `scanner` – Spiegelscanner / Moving Mirror

- **Aussehen:** Ein liegendes Lampengehäuse entlang −Z. Vorne sitzt die Austrittslinse, davor ein schräger Spiegel zwischen zwei Seitenwangen.
- **Bewegung:** Pan schwenkt den Strahl seitlich (Drehung um Z), Tilt vor und zurück (Drehung um X). Der Spiegel wird jeden Frame so gedreht, dass seine Normale die Winkelhalbierende zwischen einfallendem Licht und Strahl ist. Der Strahl startet am Spiegel.
- **Größe:** `[Breite, Höhe, Länge]`. Ohne Angabe wird sie aus den Maßen gelesen (längste Seite = Länge). Standardwerte: Pan 170°, Tilt 110°.

### `multibar` – Leiste mit Einzelköpfen

- **Aussehen:** Eine statische Leiste mit zwei Schellen. Darunter (hängend) bzw. darüber (stehend) sitzen `heads` kleine Zylinderköpfe, jeder in einer kleinen Gabel. Köpfe, die pannen können, bekommen eine Gabelbrücke.
- **Bewegung:** Alle Köpfe folgen gemeinsam Tilt (und Pan, wenn die Lampe einen Pan-Kanal hat). Kanäle je Kopf gibt es im Format nicht.
- **Zellen:** werden nach ihrer x-Position auf die Köpfe verteilt. Gibt es weniger abgeleitete Farbzonen als Köpfe, bekommt jeder Kopf eine Linse in der Lampenfarbe.
- **Größe:** `[Länge, Leistenbreite, Kopflänge]`.

### `spider`

- **Aussehen:** Fuß und Bügel wie bei einem Moving Head. Im Bügel sitzen `heads` (Standard 2) LED-Leisten auf einer gemeinsamen Achse.
- **Bewegung:** Pan dreht den Bügel. Die Leisten kippen gegeneinander (Leiste 1 +Tilt, Leiste 2 −Tilt), wie die typische Scheren-Bewegung.
- **Zellen:** werden nach Reihe verteilt. Raster im Steckbrief: `grid: [Leisten, LEDs je Leiste]`.

### `arms` – Mehrarm-Effekt

- **Aussehen:** Eine Nabe mit Frontscheibe, davon gehen `heads` Arme strahlenförmig ab. An jedem Armende sitzt ein kleiner Kopf.
- **Bewegung:** Pan dreht die Nabe. Tilt schwenkt alle Armköpfe nach außen; die Grundneigung ist 20°.
- **Zellen:** Zellen nahe der Mitte bleiben auf der Nabe (Bee-Eye, Strobe). Die anderen werden nach Winkel dem nächsten Arm zugeordnet.

### `derby` – Derby, Moonflower und Kugel-Effekt (`head: 'orb'`)

- **Aussehen:**
  - Derby: Kastengehäuse mit Linsenkuppel (`dome`).
  - Kugel-Effekt: eine ganze Kugel (`sphere`) an einem kurzen Stiel.
- **Zellen:** Die Linsen werden von der Frontfläche auf die Kuppel bzw. Kugel abgebildet. Der Abstand von der Mitte wird zum Winkel: bis 62° beim Derby, bis 115° bei der Kugel. Jede Linse zeigt nach außen und wirft ihren eigenen schmalen Strahl. So entsteht der Strahlenfächer.
- **Bewegung:** Ein Rotor dreht sich, solange die Lampe leuchtet (0,9 rad/s). Den Motorkanal decodiert das Format nicht.

### `movinghead` / `orb` – Kugelkopf

- **Aussehen:** Fuß und Bügel wie bisher, der Kopf ist aber eine Kugel mit flacher Frontlinse.
- **Verwendung:** MagicDot-artige Köpfe, Köpfe mit endlosem Pan/Tilt, „Double Balls“. Endlos-Rotation braucht nur einen großen `pan`/`tilt`-Wert im Steckbrief (z. B. 9999).

### `follow` – Verfolger

- **Stehend (`mount: floor`):** Dreibein-Stativ (1,25 m) mit Gabel. Das lange Rohr zeigt fest nach vorne (lokal +Z, 8° nach unten); der Verfolger wird über die Gierung (yaw) der Location ausgerichtet. Hinten sitzt ein Bediengriff.
- **Hängend:** wie ein Profilscheinwerfer im U-Bügel.

### `gigbar` – Lampen-Set auf einer T-Bar

- **Stehend:** Stativ (1,6 m) mit T-Bar. Darauf sitzen `heads` Pods (Standard 4): außen PAR-Boxen, innen Derby-Kuppeln. Die Pods zeigen 70° nach vorne und fächern seitlich auf (±22°).
- **Hängend:** Die Leiste hängt an zwei Schellen, die Pods zeigen nach unten und fächern seitlich auf (±18°).
- **Bewegung:** Sets mit beweglichen Köpfen (GigBAR Move) bewegen alle Pods mit Pan/Tilt.

### Erweiterte Standard-Bauformen

- **`fresnel`:**
  - 4 Torflügel, um 40° geöffnet.
  - Gilt für jede Fresnel/PC (`doors` ist dort standardmäßig an) und für Lampen mit „Barn door(s)“ im Namen, z. B. Betopper LC005-B.
  - Dazu kommt ein U-Bügel.
- **`profile` (statisch):** U-Bügel und 4 Blendengriffe am Gate.
- **`panel`:** U-Bügel.
- **Neues Feld `FixtureModel.doors`:** schaltet die Torflügel für jede Bauform an oder aus.

## Ableitung für importierte Lampen (OFL/QLC+)

`resolveModel()` ordnet Lampen ohne eigenes `visual` jetzt auch über Typ und Namen zu. Nur Namen mit klarer Bedeutung werden genutzt:

| Treffer | Bauform | betroffene Bibliotheks-Lampen |
|---|---|---:|
| Typ `scanner` | `scanner` | 124 |
| `skypanel`, `orbiter`, `cyc` (Typ par/dimmer) | `panel` | 18 |
| `derby`, `moonflower`, `kinta`, `gem`, `swarm` … (Typ effect) | `derby` | 14 |
| `starball`, `rotosphere`, `sphere`, `hellball` … | `derby` / `orb` | 8 |
| `gigbar`, `partybar`, `fx bar`, `lightset` (nicht Typ bar) | `gigbar` | 19 |
| `batten` (Typ par) | `bar` | 5 |
| `fresnel`, `pc` (Typ par) | `fresnel` | 4 |
| `spider` | `spider` | 5 |
| `follow spot`, `verfolger` (nicht Typ movinghead) | `follow` | 4 |
| `arms`, `octopus`, `butterfly` (Typ movinghead/effect) | `arms` | 1 |
| `magic dot`, `magic ring`, `m-sphere` (Moving Head) | `movinghead` / `orb` | 1 |
| `chorus line`, `tornadot`, `TB5`, `magic blade neo` | `multibar` | 0 (nur als eigene vd-Lampe vorhanden) |

Dabei gilt:

- Alle übrigen der 2 559 Bibliotheks-Lampen behalten ihre Bauform.
- Bei Bauformen mit Unterköpfen bestimmt der Pixelmodus mit den meisten Zellen die Zahl der Köpfe. Fehlt er, kommt die Zahl aus dem Modellnamen.
- Bewusst **nicht** als `multibar` gelten Leisten, die als Ganzes kippen. Beispiele sind MagicBlade-R/FX, Swing-Batten und Briteq Tornado 7 (ein normaler Moving Head).

## Steckbriefe (`tools/vd-fixtures/archetype.ts`)

Neue `Kind`-Werte und was `visual()` daraus macht:

| Kind | Modell | Konvention im Steckbrief |
|---|---|---|
| `scanner` | `scanner` | `size: [B, H, Länge]`, optional `ring` |
| `multibar` | `multibar` | `leds: [n, Farbe]` = 1 LED je Kopf; `grid: [1, Köpfe]`; `aux` = Pixelstreifen, `ring` |
| `spider` | `spider` (bisher `tiltbar`) | `grid: [Leisten, LEDs je Leiste]` |
| `arms` | `arms` | `leds` = 1 Strahl je Arm; `aux: [n, Farbe, 'hex', true]` = Mitte (Bee-Eye/Strobe) |
| `derby` | `derby` | `leds: [Linsen, Farbe]`, `cellDeg` |
| `ball` | `derby` / `orb` | wie `derby` |
| `dot` | `movinghead` / `orb` | `leds` > 1 = mehrere Frontlinsen |
| `gigbar` | `gigbar` | `grid: [1, Pods]`, `leds` = Strahlen, `aux` = Strobe/Laser |
| `follow` | `follow` (bisher `profile`) | `size` |
| `strobe` mit `ring` | `retro` (rund) | Matrix + Ring (Atomic Dot) |

**Kanäle der neuen Kinds (Builder, umgesetzt in `archetype.ts`):**

- `scanner` → Typ `scanner`, Pan/Tilt heißen „Pan (mirror)“/„Tilt (mirror)“, Farbrad (oder LED-Farben), Goborad, Fokus; Standard 170° / 110°.
- `multibar` → `movinghead`, Tilt; Pan nur mit `pan` im Steckbrief (Chorus Line 16 ist jetzt `multibar`).
- `arms` → `movinghead`, Pan/Tilt (360° / 90°), Mitte über `aux`.
- `dot` → `movinghead`, LED-Farben.
- `derby`/`ball` → `effect` mit Kanal „Rotation“ (auch im Pixelmodus).
- `gigbar` → `effect` mit Set-Blöcken (Par-Farben, Derby Farbe/Strobe/Rotation, Strobe-LEDs, Laser, Master-Dimmer); Move-Varianten (`pan`/`tilt` oder „Move“ im Namen) → `movinghead` mit Pan/Tilt.
- Der Renderer nimmt für die neuen Bauformen sinnvolle Bereiche, wenn `panDeg`/`tiltDeg` 0 oder leer sind (`PAN_DEF`/`TILT_DEF` in `fixture.ts`).

## models.json

`docs/fixture-research/models.json` enthält einen Eintrag je recherchiertem Modell (ein Eintrag pro Zeile):

```json
{"manufacturer":"Elation Professional","model":"Chorus Line 16","kind":"multibar","body":"multibar","standard":false,
 "visualHints":{"leds":[16,"rgbw"],"size":[1068,189,291],"deg":[4,40],"grid":[1,16]},
 "rule":"Leiste mit Einzelköpfen","inLibrary":"vd:elation/chorus-line-16"}
```

| Feld | Inhalt |
|---|---|
| `kind` | Kind für den Steckbrief; `null` = keine Lampe |
| `body` | resultierendes 3D-Modell (`body` oder `body/head`) |
| `standard` | `true` = vorhandenes Modell reicht, `false` = eigene Bauform, `null` = keine Lampe |
| `visualHints` | Spec-Felder: `leds`, `grid`, `ring`, `size`, `deg`, `cellDeg` |
| `rule` | welche Regel gegriffen hat (zum Nachprüfen) |

Hinweise zu den `visualHints`:

- `leds` kommt aus `light` (z. B. „19 x 40 W RGBL“).
- `grid` kommt aus `pixels`, bei Unterköpfen aus der Kopfzahl.
- `ring` kommt aus `ring`.
- `size` kommt aus `sizeMm`. Bei Leisten ist die Reihenfolge `[Länge, Breite, Tiefe]` normiert.

**Regeln (in dieser Reihenfolge):**

1. Hazer, Nebel, CO2, Ventilator, Controller → keine Lampe.
2. Kategorie `scanner` oder „scan/roller/mirror“ bei Effekten → `scanner`.
3. GigBar, Partybar, FX-Bar, Lightset, Set auf Stativ → `gigbar`.
4. „Arms/Arme/Octopus“ bei Moving Heads → `arms`.
5. „Spider“ → `spider`.
6. Bei Multihead, Tiltbar oder Beam:
   - „einzeln beweglich/kippbar“, „Einzelköpfe“, Tornado/TB5/Chorus Line oder „N Heads“ zusammen mit „Bar“ → `multibar`.
   - Kugelkopf oder MagicDot → `dot`.
   - 2–4 Köpfe an einem Bügel → `spider`.
7. Bei Effekten:
   - Derby, Moonflower, Gem, Kinta, Swarm → `derby`.
   - Ball, Sphere, Globe → `ball`.
   - Eine reine Spiegelkugel ohne LED → keine Lampe.
8. Sonst gilt die Kategorie der Recherche. Fehlt sie, wird sie aus dem Namen geraten (z. B. „moving head“, „par“, „laser“), am Ende `effect`.

Bibliotheks-IDs in den Notizen (z. B. `vd:yuer/6x10w-six-arm`) werden vor dem Prüfen entfernt, damit sie keine Bauform vortäuschen. Die Datei wird mit `node tools/research/models.mjs` erzeugt (Regeln wie oben, nur lokale Dateien). Bei neuen Recherche-Dateien einfach erneut laufen lassen; `npm run vd-fixtures` liest sie über `tools/vd-fixtures/research.ts`.

## Showroom

`beispiele/Fixture-Showroom.vdloc` hat zwei neue Gruppen. Alle verwendeten Lampen-IDs stehen in `public/fixtures/index.json`.

- **Reihe 4 · Effekte & Spezialformen** (Truss bei z = −6,2 m, 4,6 m hoch):

  | Lampe | Bauform |
  |---|---|
  | Cameo Gobo Scanner 80 | Scanner |
  | Chauvet Derby X | Derby |
  | Chauvet Rotosphere LED | Kugel |
  | Fun Generation MiniSpider FX | Spider |
  | Equinox Butterfly Quad | Arme |
  | Mega-Lite M-Sphere | Kugelkopf |
  | ARRI SkyPanel S60-C | Panel mit Bügel |
  | ETC ColorSource Fresnel V | Torblende |

- **Boden · Stative:** Chauvet Followspot 120ST (Verfolger auf Stativ, links) und Chauvet GigBAR Move (T-Bar auf Stativ mit beweglichen Pods, rechts).

- **Reihe 5 · Neue Bauformen (eigene Definitionen)** (Truss bei z = −7,3 m, 6,2 m hoch): Robe SilverScan (Scanner), Elation Chorus Line 16 und Acme TORNADO (Leiste mit Einzelköpfen), Chauvet Cosmos HP (Derby), Chauvet Rotosphere HP (Kugel), YUER 6-Arm-Effekt (Arme), Ayrton MagicDot Neo (Kugelkopf), Chauvet GigBAR 3 ILS (GigBar hängend); dazu am Boden Chauvet GigBAR Move ILS (GigBar auf Stativ, hinten links).

## Prüfung und Screenshots

- `npm run typecheck`: ohne Fehler. `npm run build`: erfolgreich.
- Screenshots, Test-Location und Test-Lampen wurden nur lokal erstellt und liegen nicht im Repository:

| Datei | Inhalt |
|---|---|
| `before-*.png` / `after-*.png` | Showroom und Demo-Club vor und nach der Änderung. Der Demo-Club sieht gleich aus. Showroom Reihe 1–3 ist unverändert, nur Fresnel/Profil haben jetzt Bügel, Torflügel und Blendengriffe. |
| `c1.png` | Scanner (Gehäuse, Spiegel leuchtet), Leiste mit 5 Köpfen (gekippt), Leiste mit 16 Köpfen |
| `c--3.8.png` | Spider (2 Leisten im Bügel), Mehrarm-Effekt (6 Arme + Bee-Eye-Mitte) |
| `c-0.png` | Derby (Kasten + Linsenkuppel) und Kugel-Effekt |
| `c-3.8.png` | Kugelkopf im Bügel, GigBar hängend (4 Pods, außen Boxen, innen Kuppeln) |
| `c-10.4.png` | Verfolger hängend im Bügel, runder Strobe mit Matrix (Atomic-Dot-Regel) |
| `f-right.png` | GigBar und Verfolger auf Stativen (Pods und Rohr zeigen nach vorne) |
| `s-3.png`, `s-7.png` | Strahlen: Scanner-Strahl kommt aus dem Spiegel, Kopf-Strahlen der Leiste, Armfächer, Derby-Fächer, Spider-Scherenbewegung |
| `scan-close.png` | Scanner aus der Nähe: Strahl verlässt den schrägen Spiegel |
| `after-sr-row4.png` | Showroom Reihe 4 mit Rotosphere-Fächer, Spider und Butterfly |
| `after-showroom.png` | Showroom gesamt mit Stativen am Boden |

## Offene Punkte

1. **Builder:** erledigt – die neuen Kinds sind im Generator, die vd-Bundles neu erzeugt (Chorus Line 16 als `multibar`, Spider als `spider`); Showroom Reihe 5 zeigt eigene vd-Lampen der neuen Bauformen.
2. **Kanäle je Kopf:** Das Format kennt kein Pan/Tilt je Unterkopf. Die Köpfe von `multibar`, `arms` und `gigbar` folgen deshalb gemeinsam den Lampenwerten; Spider-Leisten kippen gegenläufig. Wenn eigene Kanäle je Kopf kommen (z. B. `ModeChannel.cell` für `tilt`), lassen sie sich in `pose()` direkt anschließen.
3. **Derby-Rotation:** Der Motor- bzw. Rotationskanal wird nicht decodiert; der Rotor dreht konstant, solange die Lampe leuchtet. Gleiches gilt für die rotierenden UFOs. Diese bleiben vorerst statisch (Standard `ufo`).
4. **Scanner:** Der Spiegel ist vereinfacht und hat keine Spiegelgrenzen. Der Strahl kann theoretisch auch „nach hinten“ zeigen; durch die Bereiche Pan ±85° und Tilt ±55° kommt das praktisch nicht vor. Barrel-Scanner („Roller“) sehen wie Spiegelscanner aus.
5. **Ringe auf Leisten:** Ein `ring` auf `multibar` (z. B. Tornado mit Pixel-Ring) liegt noch mittig auf der Leiste statt um jeden Kopf.
6. **Nicht modelliert:**
   - Zweiseitige Köpfe (ACME Pulsar, Ayrton DreamPanel Twin): Standard `matrix`.
   - Kinetische Objekte (MOKA MK-LB01): Standard `effect`.
   - Spiegelkugeln ohne Licht.
   - Wasser- und Flammeneffekte: Standard `effect`-Box.
7. **Heuristiken:** Die Namensregeln für importierte Lampen und für `models.json` können einzelne Geräte falsch einordnen. Beispiel: Der QLC+-Typ „Scanner“ enthält auch Roller und manche Effektgeräte. Die Spalte `rule` hilft beim Nachprüfen.
8. **Sichtprüfung:** Bei Nacht und mit Demo-Show sind die dunklen Gehäuse schwer zu beurteilen. Über URL-Parameter lässt sich für Locations kein Tageslicht einschalten. Die Screenshots nutzen deshalb `worklight=1` und teils `nobeams=1`.
