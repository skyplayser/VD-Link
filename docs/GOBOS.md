# Gobos in VD-Link

Stand: November 2026. Code: `src/shared/gobo-library.ts` (Motivliste, Label-Zuordnung, typische Goborad-Kanäle), `src/render/gobos.ts` (prozeduraler Atlas), `src/render/lighting.ts` (Projektion auf Flächen).

## 1. Gibt es „Standard-Gobos“?

Nein, eine Norm gibt es nicht. Jeder Hersteller bestückt seine Goboräder selbst und tauscht die Bestückung oft zwischen Gerätegenerationen. Bei genauerem Hinsehen fällt aber dreierlei auf:

- **Dieselben Grundmotive kommen immer wieder vor.** Punkte-Ring, Breakup/Laub, Linien/Balken, Tunnel bzw. konzentrische Ringe, Spirale/Swirl, Stern, Dreieck, Kreisring, Blasen, Strahlen, Wasser/Wellen, Flamme, Fenster, Glasbruch und Schneeflocke. Bei Beams kommen Strahlreduzierer dazu (kleine runde Lochblenden in mehreren Größen) sowie Mehrfachpunkte (2, 3 oder 5 Punkte) und einfache Luftbilder wie Kreuz, Quadrat oder Sichel.
- **Günstige China-Geräte verwenden gemeinsame OEM-Goboräder.** In den QLC+-Definitionen verweisen Capabilities verschiedener Marken auf dieselben Gobo-Bilder. So ist `Chauvet/gobo00001` 54-mal referenziert, `Others/gobo00027` 44-mal und `ClayPaky/gobo00012` 44-mal (Auswertung siehe Abschnitt 2). Beim Klonen eines Geräts wird das Goborad gleich mitkopiert, etwa bei Sharpy-Klonen (7R/230 W) oder 17R/380-W-Beams.
- **Bestückung nach Gerätetyp:**
  - **Beam** (Sharpy, Pointe, MegaPointe, China 7R/9R/17R): viele kleine statische Gobos, darunter mehrere Strahlreduzierer und grafische Luftbilder. Sharpy: 17 feste Gobos + White (QLC+). MegaPointe: statisches Rad mit 14 Gobos + offen (darunter vier Aperturgrößen) und ein rotierendes Rad mit 9 Gobos, dazu ein Animationsrad ([Robe-Leaflet](https://www.robe.cz/res/downloads/catalogues/ROBE_MegaPointe_leaflet.pdf), [Mike Wood Review](https://www.mikewoodconsulting.com/articles/RobeRobinMegaPointe.pdf)).
  - **Spot/Profile** (BMFL, MAC Viper/Encore, Maverick, Mythos, LED-Spots): 5–9 Gobos pro Rad, oft ein rotierendes und ein statisches Rad. Typisch sind Breakup, Punkte, Linien, Tunnel, Wasser und Glas (Farbglas-Gobos).
  - **Mini-LED-Spots/-Beams** (UKing, Betopper, Shehds): 7–8 Gobos, manchmal zwei Räder mit je 7.

Gobo-Hersteller (Rosco, Apollo, GAM, Projected Image u. a.) führen große Kataloge mit Nummern. Diese Grafiken sind urheberrechtlich geschützt und **werden von uns nicht verwendet** (siehe Abschnitt 3).

## 2. DMX-Werte („Adressen“) der Gobos

Ein Goborad hat einen Kanal (Gobo-Rad), oft dazu einen Kanal für Gobo-Rotation/Index und bei Profi-Geräten ein zweites Rad. Die Werte innerhalb des Gobo-Rad-Kanals folgen fast immer demselben Muster:

1. **Offen** bei 0 (0–3, 0–7 oder 0–9, bei manchen Geräten nur der Wert 0)
2. **Statische Gobos in gleich breiten Slots** aufsteigend: 3, 4, 5, 6, 8 oder 10 Werte pro Slot
3. **Shake-Bereiche** je Gobo (langsam → schnell), manchmal in umgekehrter Reihenfolge (Maverick: Gobo 7 … 1)
4. **Scroll/Rotation des ganzen Rads** CW/CCW, oft mit Stopp-Bereich dazwischen
5. Gelegentlich **Random/Sound** am Ende (z. B. Pointe 244–255)

### Beispiele (aus lokal gespiegelten QLC+-Definitionen, Apache-2.0)

| Gerät | Offen | Gobo-Slots | Danach | Quelle |
|---|---|---|---|---|
| Clay Paky Sharpy | 0–3 „White“ | Gobo 1–17 in 4er-Schritten (4–71) | Rotation 72–113, Stopp 114–117, Rotation 118–159, Shake 160–255 | `vendor-src/qlcplus/resources/fixtures/Clay_Paky/Clay-Paky-Sharpy.qxf` |
| Clay Paky Mythos | 0–3 „None“ | Gobo 1–18, 3–4 breit (4–71) | wie Sharpy, Shake 160–255 | `…/Clay_Paky/Clay-Paky-Mythos.qxf` |
| Robe Pointe (Rad 1) | 0–3 | Gobo 1–10 in 6er-Schritten (4–63) | Strahlreduzierer 64–87, Shake 88–167, Scroll 202–243, Random 244–255 | `…/Robe/Robe-Pointe.qxf` |
| Martin MAC Viper Performance | 0–9 | Indexed 1–5 (10–34), Continuous 1–5 (35–59), 5er-Schritte | Shake 60–209 (je 30), Scroll 210–255 | `…/Martin/Martin-MAC-Viper-Performance.qxf` |
| Chauvet Maverick MK3 Profile CX | 0–7 | Gobo 1–7 in 8er-Schritten (8–63) | Shake 64–119 (absteigend), offen 120–127, Scroll 128–255 | `…/Chauvet/Chauvet-Maverick-MK3-Profile-CX.qxf` |
| Betopper LB230 (7R-Klasse) | nur 0 | Gobo 1–17 in 5er-Schritten (1–85) | Wechsel/Stopp 86–170, Shake ab 171 | `…/Betopper/Betopper-LB230.qxf` |
| Shehds 230 W LED Beam | 0–7 „Solid“ | 7 benannte Gobos in 10er-Schritten (8–77) | Shake 78–147, Rotation 148–255 | `…/Shehds/Shehds-230W-LED-Beam-Moving-Head.qxf` |
| Shehds 380 W 19R Beam | 0–3 „White“ | Gobo 1–14+ in 3er-Schritten | … | `…/Shehds/Shehds-GalaxyJet-Waterproof-IP65-380W-19R-Beam-Moving-Head.qxf` |

Achtung: In QLC+-Dateien sind „White“, „Solid“ und „None“ teils als Gobo-Makro eingetragen, obwohl sie „offen“ bedeuten. Der Decoder behandelt sie deshalb als offen (`isOpenGoboLabel`).

### Auswertung der Gobo-Namen (OFL MIT, QLC+ Apache-2.0)

Ausgewertet wurden `vendor-src/ofl/fixtures` und `vendor-src/qlcplus/resources/fixtures`. 

- **OFL:** 127 Goboräder in 109 Geräten mit Wheels. Häufigste Gobo-Anzahl pro Rad: 7 (49 Räder), 6 (17), 9 (14), 8 (12), 5/10/14 (je 5). Rund drei Viertel der Gobo-Slots (727) haben **keinen Namen**. Benannte Slots: Stars/Star (6), Gobo N, Bubbles, Flower(s), Triangle, Lines, Diamonds, Shattered, Splash, Swirl, Tunnel, Leaves … OFL-`resource`-Verweise: `10-circles`, `biohazard` (je 5), `glass-raindrops-on-window` (4), `3-fold-swirl`, `rose-petal`, `triangle-hexagon-pattern`, `dot-spiral` (je 3).
- **QLC+:** 6205 Gobo-Capabilities. Fast alle heißen „Gobo N“, „Gobo N shake“ oder „Shaking Gobo N“. Nur wenige sind benannt, etwa Star (8), Triangle (8), Spot, Wave, Circle, Snowflake, Breakup, Dots, Bars oder Circles.

Folgerung: Am Namen allein lässt sich meist kein Motiv ablesen. Deshalb gibt es einen **stabilen Fallback nach Slot-Nummer**, der einem typischen Goborad entspricht.

## 3. Wie die Motive aussehen – und was wir verwenden dürfen

Hersteller- und Gobo-Firmen-Grafiken sind geschützt, **nichts davon wird kopiert oder heruntergeladen**. Alle VD-Link-Gobos sind eigene, prozedural gezeichnete Grundformen (Canvas 2D, weiß = Licht).

**OFL-Gobo-Verzeichnis (`resources/gobos` im OFL-Repo, nicht lokal gespiegelt):** Das Repo steht unter MIT. Laut den `source`-Feldern der Gobo-JSONs stammen die Bilder aber zum großen Teil aus dem QLC+-Gobo-Ordner. Der ist nach Herstellern sortiert (Chauvet, ClayPaky, Robe, SGM, GLP, Others), z. B. `biohazard` → `qlcplus/resources/gobos/Others/gobo00039.svg`, `stars` → `…/Chauvet/gobo00050.png`. Andere stammen aus Herstellerhandbüchern, z. B. `rays` → Handbuch-PDF bei Thomann. Damit sind sie **nicht eindeutig selbst erstellt**, sondern Nachzeichnungen von Hersteller-Gobos. Ergebnis: **nicht übernommen, auch nicht als Vorlage**. Nur die Namen bzw. Stichwörter (z. B. „10 circles → dots“) fließen als Text in die Label-Zuordnung ein. Für den QLC+-Gobo-Ordner gilt dasselbe. `THIRD_PARTY.md` muss deshalb nicht ergänzt werden, dort steht bereits „Gobo-Grafiken der Hersteller: bewusst nicht verwendet“.

### Unsere Motive (Atlas-Reihenfolge = Index 1…24)

| # | id | Name | Aussehen |
|---|---|---|---|
| 1 | `dots-ring` | Punkte-Ring | 7 runde Punkte im Kreis + Mittelpunkt |
| 2 | `rays` | Strahlen | 10 spitze Strahlen aus der Mitte |
| 3 | `breakup` | Breakup (Laub) | zufällige Blatt-Ellipsen |
| 4 | `tunnel` | Tunnel (Ringe) | konzentrische Ringe |
| 5 | `triangle` | Dreieck | dicker Dreiecksrahmen |
| 6 | `bars` | Linien | 6 senkrechte Balken |
| 7 | `spiral` | Spirale | 3 sich verjüngende Spiralarme |
| 8 | `flame` | Flamme | 6 Flammenzungen von unten |
| 9 | `water` | Wasser | unterbrochene Wellenbänder |
| 10 | `star` | Stern | fünfzackiger Stern |
| 11 | `shards` | Splitter | Glasbruch: Fläche mit Rissen |
| 12 | `flower` | Blume | 8 Blütenblätter |
| 13 | `cross` | Kreuz | Plus-Kreuz |
| 14 | `window` | Fenster | 2 × 2 Scheiben |
| 15 | `dot-grid` | Punktraster | hexagonales Punktraster |
| 16 | `bubbles` | Blasen | Kreise/Ringe verschiedener Größe |
| 17 | `beam-reducer` | Strahlreduzierer | kleiner Punkt (Lochblende) |
| 18 | `ring` | Kreisring | Donut |
| 19 | `three-dots` | Drei Punkte | 3 große Punkte im Dreieck |
| 20 | `snowflake` | Schneeflocke | 6 Arme mit Verzweigungen |
| 21 | `square` | Quadrat | Quadratrahmen mit Mittelpunkt |
| 22 | `eclipse` | Sichel | Mondsichel |
| 23 | `segments` | Segmentring | 3 Ringsegmente + Mittelpunkt |
| 24 | `grid` | Gitter | diagonales Gitter |

Die Motive 1–4 sind die bisherigen vier Demo-Gobos, daher sehen bestehende Shows unverändert aus.

## 4. Umsetzung

### Datenmodell
- `Capability.goboArt?: string` (`fixture-types.ts`): Motiv-id aus `GOBO_ART`.
- `Look.goboArt?: number` (`dmx-codec.ts`): 1-basierter Motiv-Index, 0 = unbekannt.

### Motivwahl im Decoder (`goboArtOfCap`)
1. explizites `goboArt` der Capability
2. Label-Zuordnung `goboArtFromLabel(label)`. Vorher werden „Gobo N“, „shake“, „slow to fast“, „glass“, „rotating“ … entfernt. „Gobo 3 (Star) shake“ ergibt also `star`.
3. Fallback nach Slot: Nummer aus dem Label („Gobo 2 shake“ → Slot 2), sonst `gobo`. Dann `goboArtForSlot(n)` mit fester Reihenfolge: Punkte-Ring, Strahlen, Breakup, Tunnel, Dreieck, Linien, Spirale, Flamme, Wasser, Stern, … (zyklisch).

Ohne Capabilities gilt der bisherige Fallback (`0–15` offen, dann 32er-Slots) plus `goboArtForSlot`. Labels wie „White“, „Solid“, „None“ oder „Empty“ ohne `goboArt` zählen als offen. Der Renderer (`fixture.ts`) nimmt `look.goboArt || goboArtForSlot(look.gobo)` als Atlas-Kachel, Washer bekommen kein Gobo. `lighting.ts` liest die Kachel aus einem 6 × 4-Atlas (1536 × 1024 px, `flipY` aus).

### Zuordnung Label → Motiv (Auszug, Reihenfolge = Priorität)

| Motiv | Stichwörter (Regex, Kleinbuchstaben) |
|---|---|
| `beam-reducer` | beam reducer, reducer, pinhole, aperture, small dot/circle, „(Beam)“, „Hole“ |
| `three-dots` | two/three/2–5 dots, dots row, linear dots, multi dots, four eyes |
| `dot-grid` | dot grid/matrix, pointed grid, many dots, starry, sprinkles, dots in space |
| `water` | water, wave, ripple, rain (nicht rainbow), ocean, sea, liquid, shower |
| `spiral` | spiral, swirl, twist, vortex, hurricane, galaxy, hypnotic, yin |
| `segments` | segment, pie, sector, triptych, quarter, propeller, mower, blade, machete, fan, biohazard |
| `grid` | grid, mesh, woven, weaving, web, chess, checker, lattice, circuit, honeycomb |
| `tunnel` | tunnel, concentric, rings, target, eccentric, orbit |
| `flame` | flame, fire, burn, lava, torch |
| `breakup` | breakup, leaf/leaves, foliage, forest, tree, cloud, organic, splotch, blob, abstract, random, dune, bolts |
| `shards` | shard, shatter, crack, fracture, ice, stone, splash, shred, broken |
| `snowflake` | snow, flake, crystal |
| `star` | star, asterisk, compass, nova |
| `rays` | ray, sun, burst, spokes, radial lines, beams |
| `flower` | flower, rose, petal, daisy, bloom, mandala, rosette, knot, clover, lollipop |
| `triangle` | triangle, pyramid, delta, darts, arrow, kite, sail |
| `cross` | cross, plus |
| `window` | window, frame, pane, blind, venetian, shutter, door |
| `square` | square, rectangle, box, diamond |
| `eclipse` | eclipse, moon, crescent, half, planet |
| `bubbles` | bubble, circles, bokeh, drop(s), droplet, balls, cells |
| `ring` | ring, donut, circle, circular |
| `bars` | bar(s), line(s), stripe, slash, zebra |
| `dots-ring` | dot(s), points, holes, radial |

Unsere eigenen Namen (id, Englisch, Deutsch) werden exakt zurückgeordnet („Dots ring shake“ → `dots-ring`).

### Typische Goborad-Kanäle: `standardGoboWheel(kind, count, opt?)`

| `kind` | Aufteilung | Vorbild |
|---|---|---|
| `'beam'` | Offen 0–3, Gobos je 4 Werte ab 4 (bis 71; bei mehr als 17 Gobos schmaler), Scroll CW 72–113, Stopp 114–117, Scroll CCW 118–159, Shake 160–255 gleichmäßig auf alle Gobos | Sharpy / China 7R–17R |
| alles andere (`'spot'`, `'profile'`, `'hybrid'`, LED-Spot …) | Offen 0–7, Gobos je 8 Werte ab 8 (bis 63; bei mehr als 7 Gobos schmaler, mindestens 2), Shake 64–127, Scroll CW 128–191, CCW 192–255 | Maverick / Viper |

Jede Gobo-Capability (auch die Shake-Bereiche) hat `kind: 'gobo'`, `gobo: n`, `goboArt: '<id>'` und `label` = englischer Motivname (bzw. „… shake“). Scroll-Bereiche sind `generic` und werden als offen dargestellt. Die Motivfolge ist pro Typ fest: Beam beginnt mit Strahlreduzierer, Punkte-Ring, Kreisring, Dreieck, Stern, Linien …, Spot mit Punkte-Ring, Strahlen, Breakup, Tunnel, Dreieck … Mit `opt.motifs` lässt sich eine eigene Folge angeben, mit `shake: false` bzw. `scroll: false` werden die Bereiche zu „Open“.

### Anleitung für den Builder (`tools/vd-fixtures/archetype.ts`)

```ts
import { standardGoboWheel } from '../../src/shared/gobo-library.ts';
…
if (f.has('gobo') || discharge)
  P(1, ch('Gobo', 'gobo', { caps: standardGoboWheel(s.kind, featN('gobo', 14)) }));
```

- `s.kind === 'beam'` ergibt das Sharpy-Layout, alle anderen Typen das Spot-Layout.
- Echte Motive eines bestimmten Geräts (aus Handbuch-Text, keine Grafiken): `standardGoboWheel(s.kind, n, { motifs: ['breakup', 'dots-ring', …] })`.
- `goboCaps()` kann danach entfallen oder auf `standardGoboWheel('spot', n)` umgeleitet werden.
- Ein zweites Goborad (`gobo2`) ist im Renderer derzeit nicht sichtbar (Attribut `other`).

## Grenzen / offen
- Gobos erscheinen in der Flächenprojektion (Boden, Wände, Möbel). Der volumetrische Lichtkegel (`beam.ts`) zeigt noch kein Gobo-Muster.
- Shake, Rad-Scroll und Gobo-Rotation (`goboRotation`) werden nicht animiert, das Motiv steht still.
- Der Importer (`tools/import-fixtures.ts`) übernimmt bei OFL nur `slot.name`. Wenn er künftig auch `slot.resource` (z. B. `gobos/10-circles`) ins Label oder als `goboArt` schreibt, greift die Label-Zuordnung bei deutlich mehr OFL-Geräten.
