# Recherche Gruppe 3 – China-Direktvertrieb & Budget (Online-Handel)

Stand: 13.11.2026. Marken: SHEHDS, UKing, Betopper, Lixada, Tomshine, OPPSK, YUER, Big Dipper, ZQ.

## Dateien

| Datei | Marke | Einträge | in Bibliothek (`inLibrary`) | fehlend | mit Kanalzahlen |
|---|---|---:|---:|---:|---:|
| `shehds.json` | SHEHDS (inkl. Serien JMS WEBB, GalaxyJet, CoralPar, ShockCore, Constellaser, GlamoPar) | 123 | 17 sicher (+10 „wahrscheinlich“ in `notes`) | 106 | 17 |
| `uking.json` | UKing (U\`King) | 66 | 54 | 12 (ältere Modelle) | 58 |
| `betopper.json` | Betopper | 44 | 43 | 1 (LM70SR) | 23 |
| `yuer.json` | YUER | 829 | 15 sicher (10 Bibliotheks-ids) + 111 „mögliche Entsprechung“ | 814 | 585 |
| `oppsk.json` | OPPSK | 62 | 0 | 62 | 51 |
| `big-dipper.json` | Big Dipper / SEVEN STARS | 22 | 5 | 17 | 11 |
| `lixada.json` | Lixada | 11 | 6 | 5 | 5 |
| `tomshine.json` | Tomshine | 6 | 2 | 4 | 4 |
| `zq.json` | ZQ (Artikelnummern, Querverweise) | 5 | 2 | 3 | 3 |

„fehlend“ = kein sicherer Treffer in `public/fixtures/index.json`. Unsichere Zuordnungen stehen nur in `notes`
(„mögliche Entsprechung …“ / „wahrscheinlich entspricht …“), `inLibrary` bleibt dann `null`.

Felder je Eintrag: `manufacturer, model, kind, light, beamDeg, pan, tilt, channels, features, ring, pixels, sizeMm, weightKg, url, manualUrl, status, inLibrary, notes`.
`features` nutzt Kürzel wie `gobo:14`, `gobo-rotation`, `prism:8+24`, `colorwheel:13`, `frost`, `zoom`, `focus`, `rainbow`, `cmy`, `cto`, `iris`, `shutter-blades`, `laser`, `strobe-leds`, `ring`, `pixel`, `rdm`, `battery`, `ip65`, `infinite-rotation`, `ilda`, `app`, `uv`.

## Wichtigste Ergebnisse

- **Betopper = Big Dipper.** Betopper-Modelle (LB230/LB200, LM70, LM108, LM80 …) werden von *Shenzhen Big Dipper Laser Science & Technology* (Marken „Big Dipper“, „SEVEN STARS“) im eigenen Herstellerkatalog geführt. Bibliotheks-ids der Betopper-Geräte gelten deshalb auch für die gleichnamigen Big-Dipper-Modelle (in `big-dipper.json` eingetragen).
- **ZQ ist kein eigener Hersteller.** „ZQxxxxx“/„ZQ-Bxxx“ sind die Artikelnummern von UKing (ZQ01xxx PAR, ZQ02xxx Moving Heads, ZQ06xxx Bars/Wash/Retro, ZQ09xxx COB-Spots, ZQ-Bxxx ältere Serie). Dieselben Nummern tauchen bei weiteren Amazon-Marken auf (GdjRttk ZQ02253, WZYBUTA ZQ02341, ZonQoonz ZQ01511, Ktaxon/Lampwin ZQ-B54) – baugleiche OEM-Ware. Ein Hersteller „Zhiqiang“ ließ sich nicht belegen.
- **UKing-Shop vollständig abgedeckt:** Alle 52 Leuchten-Einträge aus uking-online.com sind schon in der Bibliothek (vd:/qlc:/ofl:). Ergänzt wurden nur ältere Modelle (ZQ02373 Doppelkopf-Beam, ZQ02254, ZQ02110, ZQ-B147, ZQ-B243, ZQ-B54A, ZQ02006, ZQ-B257 …) – meist nur mit Kanalzahl/Leistung, weil die Quellen gesperrt oder offline sind.
- **Betopper-Shop vollständig abgedeckt** (39 Modelle). Fehlend nur LM70SR (nicht mehr gelistet, keine Daten).
- **YUER:** 1 173 Shop-Produkte (yuerlights.com 960, yuer-online.com 213) → 829 nach Dublettenfilter. YUER listet dasselbe Gerät oft mehrfach unter verschiedenen Titeln; der Filter fasst nur gleichlautende Titel zusammen, es bleiben also inhaltliche Dubletten. Bauformen mit Sonderaufbau sind zahlreich: Mehrarm-/Mehrkopf-Effekte (~34), Moving Heads mit Strobe-/Matrixflächen (~70), Retro-Leuchten (~35), Tilt-Bars, UFO, Spider, Pixel-Tubes, Laser-Moving-Heads.
- **SHEHDS:** Die technischen Daten stehen im Shop nur als Bilder (body_html leer). Erfasst sind daher Lichtquelle/Leistung/Varianten aus Titeln, Kanalzahlen nur, wo Titel oder URL-Handle sie nennen, plus der **Handbuch-Link (Google Drive) für 119 von 123 Einträgen** von shehds.com/pages/user-manual-download. Sonderbauformen: 2/3/4/6-Arm-Beam, GalaxyJet-Wave-Bars mit 5/6/12 bewegten Köpfen, 8-Eye-Laser-Beam, „Football“-Effekt, 36-LED-Strobe-Beam-Moving-Head, 25×30W-Matrix-Blinder.
- **OPPSK:** Kein Gerät in der Bibliothek. Spezifikationen aus den Produktseiten (Spec-Block) gezogen; 11 Hersteller-Modellnummern und PDF-Handbücher von oppsk.com/pages/user-guides-all-access zugeordnet. Sonderbauformen: 8-Arm-Hybrid (8×10W Arme + 4×10W Bee-Eye + Laser + Strobe), 6-Arm-Hybrid, GigBar-Set (2 Mini-Heads, 2 PAR, 2 Magic-Balls, 6 RGB-Ringe, Laser, Strobe), Double-Ball-Beam (14×10W), 10×30W-Tilt-Bar, 360°-Pixel-Tubes.
- **Lixada / Tomshine** sind Handelsmarken der Tomtop-Gruppe; lixada.com und tomshine.com sind inzwischen geparkte Domains. Daten nur aus Suchmaschinen-Auszügen von Amazon/Walmart/eBay-Listings (Werte teils widersprüchlich, in `notes` vermerkt).

## Quellen

- Shopify-Kataloge (`/products.json`): shehds.com, oppsk.com, uking-online.com, betopperdj.com, yuerlights.com, yuer-online.com (11/2026).
- Produktseiten oppsk.com (Spec-Block), Handbuchseiten shehds.com/pages/user-manual-download und oppsk.com/pages/user-guides-all-access (nur Links übernommen, keine PDFs geladen).
- Herstellerkatalog Big Dipper: made-in-china.com/showroom/bigdipperyork (Produktdetailseiten).
- Suchmaschinen-Auszüge (Amazon, Walmart, eBay, Pioneer-DJ-/QLC+-Forum, usedlighting.com, ktaxon.com) für Lixada, Tomshine, ältere UKing/Betopper-Modelle und ZQ-Querverweise.
- Abgleich: `public/fixtures/index.json`.

Nicht genutzt bzw. gesperrt: manuals.plus und manualslib.com (403), manualshive.com (Bot-Check), Amazon/AliExpress direkt, tomtop.com (nicht auflösbar), finale3d.com (404). Bibliotheken (GDTF-Share, Avolites, MA, Finale-3D) wurden nicht übernommen.

## Methode und Grenzen

- Werte wurden per Regex aus Shop-Texten gezogen (nur Zahlen/Stichworte, keine Texte). Typische Fehlerquellen: `kind` ist automatisch aus dem Titel geschätzt; bei Shop-Texten mit mehreren Gerätevarianten (z. B. 295W/350W/380W) gelten die Werte meist für die ganze Familie; `channels` sammelt alle genannten Modi (vereinzelt Ausreißer wie 280 bei Pixelgeräten – so im Shop angegeben).
- `ring` enthält nur dann eine LED-Zahl, wenn der Text sie in Verbindung mit Ring/Halo/Aperture nennt; `pixels` ist nur bei manuell geprüften Geräten gesetzt.
- Bibliotheksabgleich: „sicher“ nur bei gleicher LED-Bestückung (NxW), passender Bauform und übereinstimmenden Kanalmodi bzw. bei Modellcode (Betopper/UKing). Die vd:yuer-Einträge wurden früher aus denselben Shops gebaut, decken sich aber oft in den Kanalzahlen nicht mit dem aktuellen Listing – daher viele „mögliche Entsprechungen“.

## Lücken

1. SHEHDS: Kanalbelegungen, Abstrahlwinkel, Pan/Tilt fehlen fast vollständig (nur in Bildern/Handbüchern auf Google Drive).
2. YUER: inhaltliche Dubletten nicht vollständig zusammengeführt; Laser-/Effekt-Kategorie enthält auch reine Projektoren.
3. Lixada, Tomshine, Big-Dipper-Amazon-Sortiment, ältere UKing-ZQ-B-Modelle: nur Bruchstücke (Leistung, Kanalmodi), keine Maße/Winkel.
4. Keine Handbücher heruntergeladen; Kanal-Layouts müssen beim Bau der Definitionen nach typischem Schema angenommen oder aus den verlinkten Handbüchern übernommen werden.
