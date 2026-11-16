# Recherche Gruppe 4 – China OEM/ODM, B2B & Eigenmarken

Stand: 13.11.2026. Hersteller: Fine Art (Guangzhou Caiyi), ACME, PR Lighting, Terbly, Light Sky, Golden Sea (GTD),
Yajiang (Silver Star), CKC Lighting, XMlite (Xiangming Light), EK Lights, MOKA SFX, GBR, Topled, VSHOW, KIMU,
LiteLEES, Marslite, JCLight, Grace Lighting, HongYi.

## Dateien und Zahlen

| Datei | Hersteller | Einträge | in Bibliothek (`inLibrary`) | fehlend | mit Kanalzahl | Quelle |
|---|---|---:|---:|---:|---:|---|
| `acme.json` | ACME (Acme Yifeng) | 150 (68 aktuell, 82 eingestellt) | 6 | 144 | 139 | en.acmelighting.com (Produktseiten + Liste „Discontinued“) |
| `fine-art.json` | Fine Art (Guangzhou Caiyi Technology) | 78 | 0 | 78 | 69 | www.fineart-light.com |
| `pr-lighting.json` | PR Lighting | 76 | 0 | 76 | 69 | www.pr-lighting.com |
| `golden-sea.json` | Golden Sea (Guangzhou Haoyang Electronic, Marke TERBLY) | 179 (33 neu, 59 aktuell, 87 eingestellt) | 0 | 179 | 175 | en.terbly.com (Produkt-JSON der Katalogseiten) |
| `terbly.json` | Terbly | 0 (siehe unten) | – | – | – | – |
| `gtd.json` | GTD (Guangzhou GTD Lighting Technology) | 5 (nur Namen/Typ) | 0 | 5 | 0 | nur Drittquellen |
| `light-sky.json` | Light Sky (Guangzhou Shenglong / LiGHT SKY) | 100 | 1 | 99 | 95 | en.lightsky.com.cn |
| `yajiang-silver-star.json` | Yajiang / Silver Star | 3 (nur Namen/Teildaten) | 0 | 3 | 0 | nur Drittquellen |
| `ckc-lighting.json` | CKC Lighting (Guangzhou Penglin) | 202 (13 eingestellt) | 0 | 202 | 194 | www.ckclighting.com |
| `xmlite.json` | XMlite (Guangzhou Xiangming Light) | 103 | 0 | 103 | 92 | www.movinghead.net (englische XMLITE-Seite) |
| `ek-lights.json` | EK Lights | 93 (61 von der EN-Seite, 32 nur CN-Seite) | 1 | 92 | 79 | www.eklights.com (+ /cn/) |
| `moka-sfx.json` | MOKA SFX (nur Licht) | 96 | 0 | 96 | 76 | mokasfx.com |
| `vshow.json` | VSHOW | 66 | 0 | 66 | 62 | vshowlighting.com |
| `kimu.json` | KIMU | 75 | 0 | 75 | 36 | www.kimulighting.com |
| `litelees.json` | LiteLEES | 71 | 0 | 71 | 64 | www.litelees.com |
| `jclight.json` | JCLight | 261 | 0 | 261 | 111 | jclight.com (Shopify-Katalog) |
| `topled.json` | Topled (topledlighting.com = DASEN / Guangzhou Dasen Lighting) | 64 | 0 | 64 | 35 | www.topledlighting.com |
| `gbr.json` | GBR | 0 | – | – | – | keine Quelle gefunden |
| `marslite.json` | Marslite | 0 | – | – | – | gesperrt (siehe Lücken) |
| `grace-lighting.json` | Grace Lighting | 0 | – | – | – | gesperrt / nicht eindeutig |
| `hongyi.json` | HongYi | 0 | – | – | – | gesperrt |

Summe: 1 622 Einträge, davon 8 bereits in der Bibliothek.

Felder je Eintrag: `manufacturer, model, kind, light, beamDeg, pan, tilt, channels, features, ring, pixels, sizeMm, weightKg, url, manualUrl, status, inLibrary, notes`.

- `kind` aus der vorgegebenen Liste (beam/spot/hybrid/profile/wash/…/follow/effect). „hybrid“ = BSW, „profile“ = mit Framing-Blades (BSWF), „ellipsoidal“ = statischer Profilscheinwerfer, „tiltbar“ = Leiste mit motorischem Tilt, „multihead“ = Leiste mit mehreren einzeln beweglichen Köpfen.
- `beamDeg` = [min, max] (bei festem Winkel zweimal derselbe Wert). `pan`/`tilt` in Grad oder `"infinite"`.
- `channels` = Kanalzahlen aller Modi in Herstellerreihenfolge; Modi „8+100“ o. ä. sind aufsummiert (Original in `notes`, wo relevant).
- `features`: `cmy`, `cto`, `colorwheel`, `gobo` bzw. `gobo:N+M` (Anzahl je Rad, soweit lesbar), `prism`, `frost`, `iris`, `zoom`, `focus`, `blades`, `animation`, `pixel`, `ring`, `IP65/IP66/IP67/IP68`, `artnet`, `rdm`.
- `sizeMm` = [Breite, Tiefe, Höhe] bzw. Reihenfolge wie vom Hersteller angegeben; Verpackungs-/Case-Maße sind ausgefiltert.
- `status`: `aktuell`, `neu` (vom Hersteller als neu markiert), `eingestellt` (EOL/Discontinued), `null` = unbekannt.
- `notes` enthalten Bauform-Beschreibungen (Ring, Mehrkopf, Tilt-Bar, Matrix, Retro …), Modellcodes und Unsicherheiten.

## Abgleich mit der Bibliothek

Vergleich normalisiert (nur Buchstaben/Ziffern, Groß-/Kleinschreibung egal), nur exakte Treffer gelten als `inLibrary`:

- ACME: LYRA → `vd:acme/lyra`, OXYGEN → `qlc:acme/oxygen`, PIXEL LINE IP → `qlc:acme/pixel-line-ip`, SUPER DOTLINE → `qlc:acme/super-dotline`, DOTLINE360 → `qlc:acme/dotline360`, DOTLINE180 → `qlc:acme/dotline180` (beide eingestellt). Deluge und Ginamp aus der Bibliothek stehen nicht mehr auf der ACME-Seite.
- Light Sky: AURORA → `ofl:light-sky/aurora`.
- EK: „R3 Beam Wash“ → `qlc:ek/r3-wash` (gleiche Kanalmodi 16/20, vermutlich dasselbe Gerät). „E3 LED Spot“ steht nicht mehr auf der EK-Seite.
- PR Lighting: Die 10 Bibliotheksgeräte (Pilot 150/575, PR 5000 Spot, XL 250/700, XLED 1037, XR 230 Spot, XS 250 Spot, JNR Flat PAR) sind ältere Modelle, die auf pr-lighting.com nicht mehr gelistet sind → kein Treffer; alle 76 Website-Modelle fehlen.
- GTD (LM150 Spot) und Silver Star (MX-Indigo 6000XE): keine Überschneidung mit den hier gefundenen Modellen.

## Wichtige Befunde

- **Terbly = Golden Sea.** www.terbly.com ist die Seite von Guangzhou Haoyang Electronic Co., Ltd., die international als „Golden Sea“ auftritt; TERBLY ist deren Marke. Alle Produkte stehen deshalb in `golden-sea.json` (Hersteller „Golden Sea“, Marke in `notes`); `terbly.json` ist absichtlich leer, um Dubletten zu vermeiden. www.goldensea.cn gehört dagegen einer anderen Firma (Zhejiang Jinhai).
- **GTD ist eine eigene Firma** (Guangzhou GTD Lighting Technology), nicht Golden Sea. Ihre Seite ist nicht abrufbar (siehe Lücken).
- **Nachbauten bekannter Bauformen:** VSHOW TB5/TB5F, LiteLEES TORNADOT 5 und MOKA EPL 5120 entsprechen der ACME TORNADO (Leiste mit 5 Köpfen und Ring); LiteLEES BIG EYE BAR L6010 und MOKA EPL 1060 entsprechen der ACME SUPER DOTLINE; LiteLEES Stormy Flash/Strobe Bar entsprechen der ACME PIXEL LINE IP. In `notes` vermerkt.
- **Sonderbauformen** (in `notes`/`ring`/`pixels` beschrieben): ACME CYCLONE (Pixel-Ring + Roll-Achse), THETA (Beam mit Wash-Ring), GEMINI und PULSAR (zweiseitige Köpfe), LIGHTNING X; Fine Art 4019/4037 PIXIE (rotierende Front); PR GALAXY/PLANET (rotierende Frontplatte); Light Sky SEA LION (Beam-Zellen mit Aura-Ring, Tilt ±25°), AQUA MIRROR (Spiegel-Moving-Head ohne Lichtquelle), MAMBA (Tilt-Bar); EK Alligator/Diamondback (Bars), DLM 7x7 (Doppel-Matrix); CKC Qdot 16 (4x4-Blinder-Matrix), Y840/Y1640/Evo T (Tilt-Bars); Golden Sea GLB6/GLB12 IP (Tilt-Bars mit Strobe-Feld); VSHOW Q7 Magic Dot (7x7-Matrix), V7 RETROLINE; MOKA Kinetik-Objekte (höhenverfahrbar).
- **iSPOT (Fine Art):** Moving Heads mit eingebauter HD-Kamera zur Fernverfolgung (Bedienpult FINE iSPOT PILOT nicht erfasst).

## Datenqualität

- Werte wurden mit einem eigenen Parser aus den Spezifikationstexten gelesen und je Hersteller stichprobenartig geprüft; offensichtlich falsche Werte (Verpackungsmaße, „DMX512“ als Kanalzahl, vertauschte Achsen) wurden korrigiert oder auf `null` gesetzt. Kanallisten können einzelne Fehlzuordnungen enthalten – vor dem Bau einer Fixture-Definition mit der Herstellerseite (`url`) gegenprüfen.
- `features` zeigen, was im Spec-Text erwähnt wird. Bei EK Lights enthält die Website Vorlagen-Felder (z. B. „Framing System“ bei Beams); dort wurden prism/frost/iris/blades für statische Leuchten verworfen und blades nur bei Profilen behalten.
- KIMU und JCLight führen keine Hersteller-Modellnummern; `model` ist der Shop-Titel, `kind` aus dem Titel abgeleitet. Viele JCLight-Einträge ohne Specs (Shop-Text leer). Pan/Tilt fehlen bei KIMU und VSHOW fast immer.
- XMlite: Fallstudien-Seiten (TV-/Theater-Projekte) wurden ausgefiltert; einzelne Modelle erscheinen doppelt (z. B. H5 in zwei Varianten).
- MOKA SFX: Nebel, Funken, CO2, Konfetti, Blasen, Schnee, Flammen, Tanzböden und LED-Screens ausgelassen; Laser und kinetische Lichtobjekte sind enthalten.
- ACME: Aus der Liste „Discontinued“ wurden Zubehör, Controller, Splitter, Medienserver und die Architektur-Serie (BP/BW/VI „AR“-Fluter, Cove-Leisten) weggelassen.
- Golden Sea: LED-Videowände, Zubehör, Controller, Dome und Architektur-Cove/Graze-Leuchten weggelassen; Dubletten über die Modellnummer zusammengefasst.
- CKC: Steuerungen („Control System“) und Kundenvarianten „(BZ)“ weggelassen.
- Topled/DASEN: 7 Steuer-/Signalprodukte (KZ-Serie, Art-Net-Wandler, Intuiit-Control) weggelassen. Ein großer Teil des Katalogs ist Architektur-/Landschaftslicht (Wandfluter, Fluter, Slim-Pars der Serie „Arc“) – mit aufgenommen, da DMX-Leuchten; Pan/Tilt-Werte stehen auf den Seiten nicht.
- Handbuch-Links (`manualUrl`) gibt es fast nur bei ACME (66) und vereinzelt bei VSHOW; andere Seiten bieten Downloads nur über Formulare oder gar nicht. Es wurden keine Handbücher heruntergeladen oder abgelegt.

## Lücken

- **GTD:** www.gtd-lighting.com liefert ein abgelaufenes TLS-Zertifikat; nicht umgangen. Nur 5 Modellnamen aus Handbuch-Spiegeln/Händlerlisten.
- **Yajiang / Silver Star:** www.silverstarlighting.com zeigt Aliyun-WAF/Captcha (nicht umgangen); www.yajiang.cn hat keine Produktliste. Nur 3 Modelle aus Drittquellen (eines nur als Name).
- **Marslite:** Nur Alibaba-Shop (Anti-Bot-Seite) und www.marsliteled.com (Aliyun-WAF-Challenge) – nicht umgangen. Keine Daten.
- **HongYi:** Alibaba-Shop (Anti-Bot-Seite), www.hongyi-light.com hinter Cloudflare-Challenge (Zuordnung ohnehin unsicher). Keine Daten.
- **Grace Lighting:** www.grace-lighting.com hinter Cloudflare-Challenge; gracelighting.net ist ein anderer Anbieter (Gebäudebeleuchtung). Nur ein Verzeichnis-Eintrag „Grace Stage Lighting Factory“ (Guangzhou) ohne Produktdaten.
- **GBR:** Keine Herstellerseite gefunden (nur ein Made-in-China-Treffer „Guangdong GBR Prolight Group“ ohne Produktliste).
- **Topled:** Zuordnung über die Domain topledlighting.com zu Guangzhou Dasen Lighting (Marken DasenPro, Intuiit). Ob „Topled“ wirklich diese Firma meint, ist nicht sicher belegt.
- **PR Lighting:** Ältere Serien (XR 1700, XR 330/440 BWS, Phantom, XLED-Altmodelle) sind auf der Seite nicht mehr gelistet und wurden nicht nachrecherchiert.
- **Fine Art:** FA 1700CF BSWF ohne Spec-Tabelle.
- **EK Lights:** 32 Modelle stehen nur auf der chinesischen Seite; Werte aus dem chinesischen Text (Lichtquelle teils `null`). Einige CN-Seiten (FF1, K1, ORB 300, ORCA, SWORD FISH, TIGER) ohne Spezifikation.

## Quellen

- Herstellerseiten (11/2026): en.acmelighting.com, www.fineart-light.com, www.pr-lighting.com, en.terbly.com (Golden Sea), en.lightsky.com.cn, www.ckclighting.com, www.movinghead.net (XMLITE), www.eklights.com, mokasfx.com, vshowlighting.com (inkl. WooCommerce-Store-API für die Produktliste), www.kimulighting.com, www.litelees.com, jclight.com (/products.json), www.topledlighting.com.
- Drittquellen nur für GTD/Silver Star: manualshive.com, abraa.com, deep-sound.ru (gespiegeltes Handbuch SS847, nur Eckdaten gelesen).
- Keine Daten aus GDTF-Share, Avolites- oder MA-Bibliotheken übernommen; keine Texte/Bilder/Handbücher abgelegt.
