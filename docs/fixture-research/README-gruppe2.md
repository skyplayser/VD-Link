# Fixture-Recherche – Gruppe 2: Mittelklasse, Verleih & Club-Standard

Stand: 13.11.2026 · Recherche-Agent Teil 2 von 4

Hersteller: ADJ, Chauvet DJ, Cameo, Eurolite, Futurelight, Briteq, JB Systems, Contest, Showtec, Infinity,
Stairville, lightmaXX, Varytec, IMG Stageline, Involight.

## Dateien

Je Hersteller ein JSON-Array in diesem Ordner (Felder: `manufacturer, model, kind, light, beamDeg, pan, tilt,
channels, features, ring, pixels, sizeMm, weightKg, url, manualUrl, status, inLibrary, notes`):

`adj.json`, `chauvet-dj.json`, `cameo.json`, `eurolite.json`, `futurelight.json`, `briteq.json`, `jb-systems.json`,
`contest.json`, `showtec.json`, `infinity.json`, `stairville.json`, `lightmaxx.json`, `varytec.json`,
`img-stageline.json`, `involight.json`

Sortierung in jeder Datei: zuerst **fehlende** Modelle (`inLibrary: null`), davon zuerst `status: "current"`.

## Übersicht

„Gefunden“ = Modelle aus Hersteller-/Händlerquellen. „In Bibliothek“ = davon mit Treffer in
`public/fixtures/index.json` (die id steht in `inLibrary`). „Fehlend“ = gefunden, aber nicht in der Bibliothek.
„Nur Bibliothek“ = Bibliotheks-Fixtures dieser Marke, die in keiner abgerufenen Quelle auftauchen (meist ältere Modelle).

| Hersteller | Gefunden | In Bibliothek | Fehlend (current / legacy / unbekannt) | Fehlend mit Kanalzahlen | Fehlend mit Handbuch-URL | Bibliothek gesamt / nur Bibliothek | Quelle(n) |
|---|---:|---:|---|---:|---:|---|---|
| ADJ | 769 | 143 | 626 (120 / 506 / 0) | 241 | 309 | 183 / 37 | adj.com (Shopify-Feed + Produktseiten) |
| Chauvet DJ | 343 | 110 | 233 (108 / 125 / 0) | 187 | 227 | 216 / 91 | chauvetdj.com (Katalog inkl. Discontinued + Produktseiten) |
| Cameo | 166 | 29 | 137 (137 / 0 / 0) | 0 | 137 | 106 / 80 | cameolight.com (Kategorieseiten + Produktseiten) |
| Eurolite | 463 | 35 | 428 (428 / 0 / 0) | 253 | 427 | 162 / 123 | steinigke.de (Listen, „Technische Daten“, Anleitungen) |
| Futurelight | 10 | 0 | 10 (10 / 0 / 0) | 10 | 10 | 44 / 44 | steinigke.de |
| Briteq | 87 | 12 | 75 (73 / 2 / 0) | 68 | 71 | 45 / 34 | briteq-lighting.com (Spec-Tabellen) |
| JB Systems | 207 | 13 | 194 (70 / 124 / 0) | 118 | 168 | 23 / 10 | jb-systems.eu (Nuxt-Produktdaten inkl. Discontinued) |
| Contest | 26 | 0 | 26 (25 / 0 / 1) | 3 | 0 | 18 / 18* | ribalto.com, simplysoundandlighting.co.uk (Händler) |
| Showtec | 132 | 15 | 117 (Status unbekannt) | 38 | 0 | 100 / 84* | simplysoundandlighting.co.uk (Händler-Feed) |
| Infinity | 2 | 0 | 2 (Status unbekannt) | 0 | 0 | 7 / 7* | Händler-Feed |
| Stairville | 44 | 13 | 31 (31 / 0 / 0) | 5 | 4 | 123 / 108* | Thomann-Markenseite (1 Abruf) + Websuche |
| lightmaXX | 5 | 1 | 4 (Status unbekannt) | 0 | 0 | 33 / 31* | Websuche (reverb.com, musicstore.com) |
| Varytec | 10 | 6 | 4 (4 / 0 / 0) | 0 | 0 | 50 / 43* | Websuche (Thomann-URLs) |
| IMG Stageline | 8 | 0 | 8 (0 / 8 / 0) | 1 | 0 | 10 / 10* | Websuche (Händler, Testberichte) |
| Involight | 50 | 0 | 50 (50 / 0 / 0) | 32 | 0 | 16 / 16 | involight.com (WooCommerce Store-API) |

\* Bei den schwach belegten Marken (Contest, Showtec, Infinity, Stairville, lightmaXX, Varytec, IMG Stageline) sind die
„Nur Bibliothek“-Modelle **zusätzlich als Einträge** in der JSON-Datei enthalten (`inLibrary` gesetzt, `status: null`,
`channels` aus den Bibliotheks-Modi, Notiz „Nur aus vorhandener Bibliothek bekannt“), damit die Datei einen
vollständigeren Modellüberblick gibt. Bei den gut belegten Marken stehen diese nur hier als Zahl.

Insgesamt: 2.623 Einträge, davon rund 1.950 fehlende Modelle.

## Methode

1. **Katalog je Hersteller** aus maschinenlesbaren bzw. gut strukturierten Quellen:
   - ADJ: Shopify `collections/<…>/products.json` (Licht-Kollektionen + Kollektion „discontinued“), danach die
     Produktseiten der fehlenden Modelle (alle aktuellen und die LED-Ära-Legacy-Modelle) mit 5 s Abstand.
   - Chauvet DJ: Katalogseiten `/products/page/N/` (aktuell, 292 Produkte) und `?status=discontinued` (327 Produkte);
     Kategorie/Subtyp/Features aus den CSS-Klassen der Produktkarten, Specs aus den Produktseiten der fehlenden Modelle.
   - Cameo: alle Lösungs-Kategorieseiten aus der Sitemap (Produktboxen mit Bestellnummer), dann die Produktseiten.
   - Eurolite/Futurelight: Steinigke-Listen per Ajax-Endpunkt der Kategorien Licht/Moving-Lights/Scheinwerfer/Bühneneffekte,
     „Technische Daten“ der Produktseiten, Anleitung je Artikel über den Manuals-Endpunkt.
   - Briteq: `?limit=all`-Liste der Licht-Kategorie und Attributtabellen der Produktseiten.
   - JB Systems: strukturierte Produktattribute (`beglec_attr_*`) aus den Nuxt-Daten der Kategorieseiten und der Seite „discontinued“.
   - Involight: WooCommerce Store-API (`/wp-json/wc/store/v1/products`).
2. **Abgleich mit der Bibliothek** (`public/fixtures/index.json`): Herstellernamen normalisiert („American DJ“ = „ADJ“,
   „Chauvet“ = „Chauvet DJ“, „IMG Stage Line“/„Monacor“ = „IMG Stageline“, Infinity auch unter „Showtec Infinity …“),
   Modellnamen normalisiert (Kleinschreibung, nur a–z/0–9, MKII = MK2). Zweite Stufe: Vergleich des Namenskerns
   (beschreibende Zusätze wie „Moving-Head Spot“, „Leiste“, „Strahleneffekt“, Gehäusefarbe sowie „LED“ am Anfang entfernt).
   Treffer der zweiten Stufe stehen in `notes` als „per Namenskern (prüfen)“. Bevorzugt wird eine vd-, dann ofl-, dann qlc-id.
3. **Eckdaten** automatisch aus den Herstellerseiten extrahiert (nur Fakten: Zahlen, Winkel, Maße, Kanalzahlen).
   Es wurden keine Beschreibungstexte, Bilder oder Handbuchinhalte abgelegt.

## Hinweise zur Datenqualität

- **`channels`** = alle gefundenen Kanalzahlen der DMX-Modi, sortiert. Ausnahmen:
  - Briteq und JB Systems: Der Hersteller nennt nur die **minimale und maximale** Kanalzahl. Zwischenmodi stehen im Handbuch (Hinweis in `notes`).
  - Bei ADJ, Chauvet DJ, Involight, Showtec und Contest wurden die Kanalzahlen **per Mustererkennung aus Fließtext**
    gelesen, z. B. „5 DMX Channel modes (1, 9, 12, 15 or 21 Ch.)“. Lagen mehr als 12 Zahlen vor, wurde nichts
    übernommen (Notiz „uneindeutig“). Vor dem Bau der Fixture bitte gegen das Handbuch prüfen.
  - Cameo nennt auf den Produktseiten nur die **Anzahl** der DMX-Modi (steht in `notes`), keine Kanalzahlen.
    `manualUrl` zeigt auf das Adam-Hall-Downloadcenter des Artikels.
  - Steinigke gibt in „DMX-Kanäle“ teils nur einen Wert an; die Anleitung (`manualUrl`, PDF de/en) enthält die vollständigen Modi.
- **`kind`** wurde heuristisch gesetzt, aus Herstellerkategorie, Subtyp und Namen (z. B. TMH-S → spot, „Hypno“ → beeeye,
  „TMH Bar“ → tiltbar). Wo nichts eindeutig war, ist der Wert `null` (vor allem ADJ-Legacy-Effekte und alte JB-Effekte).
  Einzelne Fehlzuordnungen sind möglich, z. B. ADJ „Profile Panel RGBA“ → ellipsoidal.
- **`beamDeg`**: Bei festen Optiken ist `[x, x]` gesetzt. Bei Cameo und Briteq ist es teils der Beam-Winkel, nicht der Field-Winkel.
- **`sizeMm`**: Reihenfolge wie beim Hersteller angegeben (meist B×T×H oder L×B×H). Bei Beglec (Briteq/JB) wurden cm in mm umgerechnet.
- **`pan`/`tilt`**: Nur gesetzt, wenn ausdrücklich mit Grad angegeben. Bei Cameo OPUS X4 / X4 IP nennt der Hersteller Pan 270°/Tilt 630°;
  das ist vermutlich vertauscht und als Notiz markiert.
- **`ring`/`pixels`**: Nur dort gesetzt, wo die Quelle es ausdrücklich nennt (z. B. Varytec Hero Spot Wash 140, Contest HEZO300ZR).
  Pixel-Anordnungen fehlen meist. `features` enthält dann `pixel-control`.
- **`status`**: `current` = im aktuellen Herstellerkatalog. `legacy` = Herstellerkategorie „discontinued“.
  `null` = Händlerquelle, Status unklar (Showtec, Infinity, lightmaXX).

## Kürzungen (was und warum)

- **ADJ**: Die Discontinued-Liste enthält rund 1.800 Artikel, darunter Audio, Kabel, Video und Ersatzteile. Übernommen wurden nur
  Lichtgeräte nach Namensfilter (788 → nach Bereinigung 769). Produktseiten wurden für alle aktuellen fehlenden Modelle und für
  LED-Ära-Legacy-Modelle mit Prioritäts-Stichworten abgerufen (392 Seiten). Ältere Halogen- und Discharge-Effekte aus der Zeit vor
  etwa 2008 stehen nur mit Name, URL und Status in der Liste, ohne Specs. Grund: Zeitbudget und Rate-Limit von adj.com.
- **Chauvet DJ**: Packs, Bundles, Cases, Fernbedienungen, Ladegeräte und Konfetti wurden entfernt. „… X4“-Sets (4 Akku-Geräte
  plus Ladecase) sind enthalten, haben aber nur Set-Specs (Notiz).
- **Eurolite**: Zubehör (Flügelbegrenzer, Diffusoren, Farbfilter, Ersatzteile), Sets und Nebel wurden entfernt. Nicht-DMX-Baustrahler
  (LED IP FL-…, KKL-…) sind als `flood` enthalten, auch die einzelnen Farbvarianten. Steinigke zeigt nur das **aktuelle** Sortiment,
  deshalb gibt es keine Eurolite-Legacy-Einträge (ältere Modelle stehen weitgehend schon in der Bibliothek: 123 „nur Bibliothek“).
- **Futurelight**: Im Steinigke-Lichtsortiment sind aktuell nur 10 Leuchten (Moving Heads, Strobes, Profiler).

## Gesperrte bzw. nicht nutzbare Quellen (nicht umgangen)

| Quelle | Befund | Folge |
|---|---|---|
| highlite.com (Showtec, Infinity) | „Human verification“ (Anubis) | Showtec/Infinity nur über einen Händler-Shopify-Feed, ohne Handbuch-URLs |
| thomann.de (Stairville, Varytec) | Listen „Just a moment…“ (Cloudflare), danach HTTP 429 | Nur die Stairville-Markenseite (1 Abruf) und Websuche. Specs nur aus Such-Snippets |
| musicstore.com (Marke lightmaXX) | Cloudflare 403 | lightmaXX nur über Websuche; lightmaxx.de steht zum Verkauf |
| hitmusic.eu (Contest) | Cloudflare | Contest über die Händler ribalto.com und simplysoundandlighting.co.uk |
| chauvetdj.com `/wp-json` | 403 | Stattdessen die normalen HTML-Katalogseiten (erlaubt) |
| bax-shop.* | 406 | nicht genutzt |
| Monacor (IMG Stageline) | Der Webshop führt keine Lichttechnik mehr | IMG-Modelle nur aus Händlerseiten und Testberichten, alle als `legacy` |

GDTF-Share, Avolites-, MA- und Daslight-Bibliotheken wurden **nicht** verwendet.

## Wichtigste Lücken / Empfehlungen für den Fixture-Bau

1. **Cameo**: Bei allen 137 fehlenden Modellen fehlen die Kanalzahlen. Sie stehen nur in den Handbüchern des Adam-Hall-Downloadcenters
   (`manualUrl`). Darunter sind wichtige Verleihgeräte: OPUS X4/X Profile/X Wash/SP5/SP6/H6, AZOR S2/SP2/W2/B1, OTOS W3/W6/W12/H5/B5/L16/LC12,
   ORON H2, EVOS W3, ZENIT W300/W600/B60/SPIN16, PIXBAR G2.
2. **Showtec und Infinity**: Die Liste stammt aus einem einzelnen Händler und ist unvollständig. Aktuelle Infinity-Modelle fehlen weitgehend,
   ebenso viele Showtec-Pro-Modelle. Empfehlung: Daten manuell über highlite.com (Browser) oder Handbücher ergänzen.
3. **Stairville, Varytec, lightmaXX**: Es gab nur Stichproben (44 / 10 / 5 Modelle). Die Kataloge sind deutlich größer. Die Bibliothek deckt
   viele ältere Modelle ab (123 / 50 / 33), aktuelle Modelle sind aber kaum erfasst.
4. **ADJ-Legacy**: 138 fehlende Einträge ohne `kind` und viele ohne Specs (alte DJ-Effekte).
5. **Contest**: Bei den aktuellen Bühnengeräten sind nur HEZO120Z und HEZO300ZR mit Specs erfasst. Die V-Serie (Architektur) hat kaum Kanalzahlen.
6. **Prioritäre fehlende Moving Heads mit vollständigen Eckdaten** (gute Kandidaten für den nächsten Agenten): Chauvet Intimidator Spot 360X/375ZX/
   Beam 360X/Hybrid 251SR/Spot 360QD, Eurolite LED TMH-S200 CMY/S400 CMY/H90/H240/H380/W400/W480/W555/X1/B90/IP TMH-S250/B250/H420/H760,
   Futurelight DMH-190/380/640, EYE-740 MK2/EYE-1940, Briteq BTI-Blizzard Wash2s/BSW1/BSW2/Profile/LBeam, BTX-Cirrus 3, Involight BLADE2/TRINITY/LEDMH127, ADJ Focus/Hydro/Inno-Reihen.
