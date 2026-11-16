# Steckbriefe aus der Fixture-Recherche (Fixture-Agent)

Stand: 13.11.2026. Eingang: `docs/fixture-research/*.json` der Recherche-Gruppen 1–4 (nur Modelle mit `inLibrary: null`, Status nicht `announced`). Ausgabe: je Hersteller eine JSON-Datei mit Spec-Objekten im Format von `tools/vd-fixtures/archetype.ts` (`Spec`), direkt mit `build()` baubar.

## Dateien

- `<hersteller>.json` – Steckbriefe (JSON-Array von `Spec`). Dateiname = Recherche-Datei; ZQ-Artikelnummern stehen unter `uking.json` (ZQ = UKing-Nummernkreis).
- `missing-data.json` – Modelle ohne jede Kanalzahl (manufacturer, model, url, manualUrl, reason).
- `possible-duplicates.json` – Steckbriefe zu Shop-Einträgen, die laut Recherche *möglicherweise* schon in der Bibliothek sind („mögliche Entsprechung“/„wahrscheinlich entspricht“). Bewusst **nicht** in den Herstellerdateien, um Dubletten zu vermeiden; bei Bedarf übernehmen.
- `README.md` – diese Datei.

## Methode

1. **Normalisierung (alle Modelle, `verified: false`)** – Skript `convert.py` (Scratchpad): `kind` aus der Recherche (fehlend → aus dem Modellnamen), `leds` aus der Lichtquelle (Anzahl aus „19 x 40 W“, „(6) 20W“, „12 LEDs“ …, Farbe aus RGBW/RGBWA+UV/hex/quad/tri/WW/CW …; bei Entladungs-/Weißlicht-Spots und -Beams keine `leds`), `ring` nur bei belegter LED-Zahl, `grid` aus Pixelangaben „AxB“, `deg`, `pan`/`tilt` (nur Zahlen, „endlos“ wird weggelassen), `ch` = alle Modi sortiert, `feat` aus den Recherche-Kürzeln (cmy, cto, colorwheel:N → cw:N, gobo/gobo-rot/gobo-static → gobo:N/gobor/gobo2, prism mit „+“ → prism2, animation → anim, framing/blades → blades, frost, iris, zoom, focus, rainbow; `pro` für Moving Heads der Gruppe-1-Hersteller), `size` nur bei statischen Bauformen (bei Moving Heads sind die Recherche-Maße Gesamtmaße, nicht Kopfmaße), `url`, `note` (Quelle).
2. **Plausibilität** – verworfen werden: Kanalzahlen ≥ 512 („512“ = DMX-Universum), Kanalzahlen < 5 bei Moving Heads, eine Kanalzahl gleich der LED-Anzahl (Regex-Verwechslung, z. B. „37 x 15 W“ → „37“), bei Shop-Daten (Gruppe 3, KIMU, JCLight) Werte ≥ 100 und bei Gruppe 4 ≥ 300, die nicht durch Pixel × Farben erklärbar sind. Verworfene Werte stehen in `note`. Modelle, deren Name schon in der Bibliothek steht (Abgleich wie in `tools/build-vd-fixtures.ts`), werden übersprungen: Robe ROBIN LEDWash 600+ -> ofl:robe/robin-ledwash-600, Ayrton Cobra² -> vd:ayrton/cobra.
3. **`pixelFrom`** nur, wenn eine Kanalzahl ≥ Zellen × Farben ist und höchstens ~20 Kanäle (bzw. 25 %) darüber liegt (Zellen = Pixelangabe oder LED-Zahl, ≥ 2).
4. **Shop-Dubletten** (YUER, SHEHDS, OPPSK, KIMU, JCLight …): Einträge mit identischen Daten (Bauform, LEDs, Kanalzahlen, Features, Winkel) werden zusammengefasst; lange Shop-Titel werden um Füllwörter gekürzt (`model`), `key` = Slug (max. 56 Zeichen, eindeutig je Hersteller).
5. **Verifizierte Kanalbelegungen** – aus öffentlichen Herstellerhandbüchern/DMX-Charts (PDF, nur mit `pdftotext` gelesen). Kanalfolge, Attribute und Wertebereiche (Shutter/Strobe, Farbrad mit #hex, Gobos mit Nummer + Name, Prisma) wurden mit eigenen Parsern bzw. von Hand in eigene JSON-Daten übertragen; keine Handbuchtexte. Feinkanäle `byte: 1`, Pixel-Kanäle mit `cell`. Bei mehrdeutigen Kanälen (z. B. „Strobe / Auto-Speed“ je nach Programmkanal) steht das im Kanalnamen. Die Modusnamen beginnen mit der Kanalzahl („25CH Mode 1“), damit der Selbsttest in `build-vd-fixtures.ts` greift.

## Zählung

**3452 Steckbriefe, davon 67 verifiziert** · 2040 Modelle ohne Kanalzahl in `missing-data.json` · 90 mögliche Dubletten in `possible-duplicates.json` · 67 Shop-Listings zusammengefasst.

| Hersteller | Datei | Steckbriefe | verifiziert |
|---|---|---:|---:|
| Chauvet DJ | `chauvet-dj.json` | 187 | 29 |
| Chauvet Professional | `chauvet-professional.json` | 142 | 23 |
| JB-Lighting | `jb-lighting.json` | 9 | 9 |
| Eurolite | `eurolite.json` | 253 | 2 |
| Martin | `martin-professional.json` | 64 | 2 |
| GLP | `glp.json` | 37 | 2 |
| YUER | `yuer.json` | 439 | 0 |
| ADJ | `adj.json` | 237 | 0 |
| CKC Lighting | `ckc-lighting.json` | 194 | 0 |
| Golden Sea | `golden-sea.json` | 175 | 0 |
| Prolights | `prolights.json` | 139 | 0 |
| Acme | `acme.json` | 133 | 0 |
| Robe | `robe-lighting.json` | 126 | 0 |
| JB Systems | `jb-systems.json` | 118 | 0 |
| Elation | `elation-professional.json` | 106 | 0 |
| Light Sky | `light-sky.json` | 94 | 0 |
| JCLight | `jclight.json` | 92 | 0 |
| XMlite | `xmlite.json` | 92 | 0 |
| EK | `ek-lights.json` | 78 | 0 |
| MOKA SFX | `moka-sfx.json` | 76 | 0 |
| Fine Art | `fine-art.json` | 69 | 0 |
| PR Lighting | `pr-lighting.json` | 69 | 0 |
| Briteq | `briteq.json` | 68 | 0 |
| LiteLEES | `litelees.json` | 64 | 0 |
| VSHOW | `vshow.json` | 62 | 0 |
| OPPSK | `oppsk.json` | 50 | 0 |
| Showtec | `showtec.json` | 38 | 0 |
| Topled | `topled.json` | 35 | 0 |
| Claypaky | `claypaky.json` | 33 | 0 |
| Involight | `involight.json` | 32 | 0 |
| KIMU | `kimu.json` | 30 | 0 |
| SGM | `sgm.json` | 29 | 0 |
| Ayrton | `ayrton.json` | 27 | 0 |
| Shehds | `shehds.json` | 14 | 0 |
| Futurelight | `futurelight.json` | 10 | 0 |
| Big Dipper | `big-dipper.json` | 7 | 0 |
| ADB | `adb-stagelight.json` | 5 | 0 |
| Stairville | `stairville.json` | 5 | 0 |
| UKing | `uking.json` | 5 | 0 |
| Contest | `contest.json` | 3 | 0 |
| Tomshine | `tomshine.json` | 3 | 0 |
| IMG Stageline | `img-stageline.json` | 1 | 0 |
| Lixada | `lixada.json` | 1 | 0 |
| Vari-Lite | `vari-lite.json` | 1 | 0 |

`missing-data.json` je Hersteller: ADJ 389, YUER 246, Eurolite 175, JCLight 153, Cameo 137, Shehds 92, Showtec 79, JB Systems 76, Chauvet DJ 46, Robert Juliat 43, KIMU 39, Elation 38, Vari-Lite 35, High End Systems 34, Topled 29, Stairville 26, Contest 23, Selecon 22, ETC 20, Chauvet Professional 20, Prolights 20, Altman 20, MOKA SFX 20, Involight 18, GLP 17, ARRI 14, EK 14, Claypaky 12, Astera 11, OPPSK 11, Acme 11, XMlite 11, JB-Lighting 10, Big Dipper 10, Fine Art 9, Robe 8, SGM 8, UKing 8, CKC Lighting 8, Ayrton 7, Briteq 7, IMG Stageline 7, PR Lighting 7, LiteLEES 7, ADB 5, GTD 5, Light Sky 5, Martin 4, lightmaXX 4, Varytec 4, Golden Sea 4, VSHOW 4, Silver Star 3, Infinity 2, Betopper 1, Lixada 1, Tomshine 1.

## Verifizierte Geräte

| Hersteller | Modell | Modi | Quelle |
|---|---|---|---|
| Chauvet DJ | 4BAR Quad ILS | 4CH, 6CH, 19CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, 4BAR_Quad_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/4bar-quad-ils/ |
| Chauvet DJ | COREpar Q120 ILS | 4CH, 9CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, COREpar_Q120_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/corepar-q120/ |
| Chauvet DJ | Core 5X1 ILS | 4CH, 10CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, CORE_5X1_ILS_UM_Rev5.pdf). https://www.chauvetdj.com/products/core-5x1-ils/ |
| Chauvet DJ | EVE P-140 VW | 3CH, 4CH, 9CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, EVE_P-140_VW_UM_Rev7.pdf). https://www.chauvetdj.com/products/eve-p-140-vw/ |
| Chauvet DJ | EZLink Par Q4BT | 4CH, 8CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (EZLink_Par_Q4BT_UM_Rev7.pdf). https://www.chauvetdj.com/products/ezlink-par-q4-bt/ |
| Chauvet DJ | EZLink Par Q6BT ILS | 4CH, 8CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, EZLink_Par_Q6BT_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/ezlink-par-q6bt-ils/ |
| Chauvet DJ | EZLink Strip Q6BT ILS | 4CH, 6CH, 16CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, EZLink_Strip_Q6BT_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/ezlink-strip-q6bt-ils/ |
| Chauvet DJ | EZPar 64 RGBA ILS | 4CH, 8CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, EZPar-64-RGBA-ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/ezpar-64-rgba-ils/ |
| Chauvet DJ | Freedom Flex H4 IP | 6CH, 8CH, 12CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Freedom_Flex_H4_IP_UM_Rev2.pdf). https://www.chauvetdj.com/products/freedom-flex-h4-ip/ |
| Chauvet DJ | Freedom Par Q9 | 4CH, 6CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Freedom-Par-Q9_and-Q9X4_UM_Rev5.pdf). https://www.chauvetdj.com/products/freedom-par-q9/ |
| Chauvet DJ | Intimidator Beam 360X | 8CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator_Beam_360X_UM_Rev2.pdf). https://www.chauvetdj.com/products/intimidator-beam-360x/ |
| Chauvet DJ | Intimidator Free Spot 60 ILS | 8CH, 10CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator-Free-Spot-60-ILS_UM_Rev5.pdf). https://www.chauvetdj.com/products/intimidator-free-spot-60-ils/ |
| Chauvet DJ | Intimidator Hybrid 251SR | 13CH, 19CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator_Hybrid_251SR_UM_Rev2.pdf). https://www.chauvetdj.com/products/intimidator-hybrid-251sr/ |
| Chauvet DJ | Intimidator Spot 260X | 8CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator_Spot_260X_UM_Rev2.pdf). https://www.chauvetdj.com/products/intimidator-spot-260x/ |
| Chauvet DJ | Intimidator Spot 360X IP | 8CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator-Spot-360X-IP_UM_Rev5.pdf). https://www.chauvetdj.com/products/intimidator-spot-360x-ip/ |
| Chauvet DJ | Intimidator Spot 375ZX | 9CH, 15CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator_Spot_375ZX_UM_Rev5.pdf). https://www.chauvetdj.com/products/intimidator-spot-375zx/ |
| Chauvet DJ | Intimidator Spot 60 ILS | 8CH, 10CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Intimidator_Spot_60_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/intimidator-spot-60-ils/ |
| Chauvet DJ | Pinspot Q1Z ILS | 4CH, 6CH, 7CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Pinspot_Q1Z_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/pinspot-q1z-ils/ |
| Chauvet DJ | Sentinel Spot 50 ILS | 5CH, 11CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Sentinel_Spot_50_ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/sentinel-spot-50-ils/ |
| Chauvet DJ | Sentinel Spot Q60 ILS | 9CH, 15CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Sentinel_Spot_Q60_ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/sentinel-spot-q60-ils/ |
| Chauvet DJ | Sentinel Wash Q7Z ILS | 9CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Sentinel_Wash_Q7Z_ILS_UM_Rev2-1.pdf). https://www.chauvetdj.com/products/sentinel-wash-q7z-ils/ |
| Chauvet DJ | Shocker P2 | 7CH, 12CH, 20CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, Shocker_P2_UM_Rev4.pdf). https://www.chauvetdj.com/products/shocker-p2/ |
| Chauvet DJ | SlimBANK Q18 ILS | 4CH, 6CH, 10CH, 16CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimBANK_Q18_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/slimbank-q18-ils/ |
| Chauvet DJ | SlimPAR 56 ILS | 3CH, 7CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPAR_56_ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/slimpar-56-ils/ |
| Chauvet DJ | SlimPAR H6 ILS | 6CH, 8CH, 12CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPAR_H6_ILS_UM_Rev2.pdf). https://www.chauvetdj.com/products/slimpar-h6-ils/ |
| Chauvet DJ | SlimPAR Pro Q IP | 4CH, 5CH, 10CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPAR-Pro-Q-IP_UM_Rev3.pdf). https://www.chauvetdj.com/products/slimpar-pro-q-ip/ |
| Chauvet DJ | SlimPAR Q12BT ILS | 4CH, 8CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPAR-Q12BT-ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/slimpar-q12bt-ils/ |
| Chauvet DJ | SlimPAR T12 ILS | 3CH, 8CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPar_T12_ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/slimpar-t12-ils/ |
| Chauvet DJ | SlimPAR T6BT ILS | 3CH, 7CH | Kanalfolge und Bereiche aus dem Chauvet-DJ-Benutzerhandbuch (DMX-Tabelle, SlimPAR-T6BT-ILS_UM_Rev1.pdf). https://www.chauvetdj.com/products/slimpar-t6bt-ils/ |
| Chauvet Professional | COLORado 2 Solo VW | 4CH, 7CH, 10CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (COLORado_2_Solo_VW_UM_Rev1.pdf, Benutzerhandbuch). https://chauvetprofessional.com/wp-content/uploads/2022/04/COLORado_2_Solo_VW_UM_Rev1.pdf |
| Chauvet Professional | COLORado Panel Q40 | 4CH, 7CH, 11CH, 16CH, 23CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (COLORado_Panel_Q40_DMX_Chart_Rev2.pdf). 23CH = 4 Zonen RGBW. https://chauvetprofessional.com/wp-content/uploads/2018/01/COLORado_Panel_Q40_DMX_Chart_Rev2.pdf |
| Chauvet Professional | COLORdash PAR H12X IP | 6CH, 8CH, 9CH, 13CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (COLORdash_Par-H12XIP_DMX_Chart_Rev1.pdf). https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H12XIP_DMX_Chart_Rev1.pdf |
| Chauvet Professional | COLORdash PAR H18X | 6CH, 8CH, 9CH, 13CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (COLORdash_Par-H18X_DMX_Chart_Rev1.pdf). https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H18X_DMX_Chart_Rev1.pdf |
| Chauvet Professional | COLORdash PAR H7X | 6CH, 8CH, 9CH, 13CH, 14CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (COLORdash_Par-H7X_DMX_Chart_Rev1.pdf). https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H7X_DMX_Chart_Rev1.pdf |
| Chauvet Professional | Maverick Force X Spot | 22CH, 29CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Force_X_Spot_DMX_Chart_Rev1.pdf). https://chauvetprofessional.com/wp-content/uploads/2025/07/Maverick_Force_X_Spot_DMX_Chart_Rev1.pdf |
| Chauvet Professional | Maverick Storm 1 Flex | 26CH, 33CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Storm_1_Flex_DMX_Chart_Rev2.pdf). https://chauvetprofessional.com/wp-content/uploads/2025/03/Maverick_Storm_1_Flex_DMX_Chart_Rev2.pdf |
| Chauvet Professional | Maverick Storm 1 Hybrid | 24CH, 29CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Storm_1_Hybrid_DMX_Chart_Rev1.pdf). https://chauvetprofessional.com/wp-content/uploads/2023/04/Maverick_Storm_1_Hybrid_DMX_Chart_Rev1.pdf |
| Chauvet Professional | Maverick Storm 2 Profile | 32CH, 48CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Storm_2_Profile_DMX_Chart_Rev4.pdf, V1.240709). https://chauvetprofessional.com/wp-content/uploads/2022/11/Maverick_Storm_2_Profile_DMX_Chart_Rev4.pdf |
| Chauvet Professional | Maverick Storm 3 Profile | 34CH, 50CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Storm_3_Profile_DMX_Chart_Rev2.pdf). https://chauvetprofessional.com/wp-content/uploads/2025/07/Maverick_Storm_3_Profile_DMX_Chart_Rev2.pdf |
| Chauvet Professional | Maverick Storm 4 Profile | 38CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Maverick_Storm_4_Profile_DMX_Chart_Rev3.pdf). 55CH-Modus (16 Bit) nicht erfasst. https://chauvetprofessional.com/wp-content/uploads/2022/11/Maverick_Storm_4_Profile_DMX_Chart_Rev3.pdf |
| Chauvet Professional | Rogue Outcast 1 BeamWash | 15CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_Outcast_1_Beam_Wash_DMX_Chart_Rev5.pdf). Nur der 15CH-Modus erfasst (Ring/Zentrum-Modi bis 135CH nicht). https://chauvetprofessional.com/wp-content/uploads/2021/06/Rogue_Outcast_1_Beam_Wash_DMX_Chart_Rev5.pdf |
| Chauvet Professional | Rogue Outcast 1M Beam | 21CH, 25CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_Outcast_1M_Beam_DMX_Chart_Rev1.pdf). Kanal "Colour macro" = RGB-Farbverlauf-Makro. https://chauvetprofessional.com/wp-content/uploads/2024/06/Rogue_Outcast_1M_Beam_DMX_Chart_Rev1.pdf |
| Chauvet Professional | Rogue Outcast 2 Beam | 16CH, 19CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue-Outcast-2-Beam_DMX-Chart_Rev2.pdf). https://chauvetprofessional.com/wp-content/uploads/2023/01/Rogue-Outcast-2-Beam_DMX-Chart_Rev2.pdf |
| Chauvet Professional | Rogue Outcast 2 Hybrid | 20CH, 25CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_Outcast_2_Hybrid_DMX_Chart_Rev2.pdf). https://chauvetprofessional.com/wp-content/uploads/2023/01/Rogue_Outcast_2_Hybrid_DMX_Chart_Rev2.pdf |
| Chauvet Professional | Rogue Outcast 2X Wash | 17CH, 22CH, 23CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_Outcast_2X_Wash_DMX_Chart_Rev3.pdf). Zonen-/Pixelmodi (33-56CH) nicht erfasst. https://chauvetprofessional.com/wp-content/uploads/2022/08/Rogue_Outcast_2X_Wash_DMX_Chart_Rev3.pdf |
| Chauvet Professional | Rogue Outcast 3 Spot | 20CH, 25CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_Outcast_3_Spot_DMX_Chart_Rev2.pdf). https://chauvetprofessional.com/wp-content/uploads/2025/08/Rogue_Outcast_3_Spot_DMX_Chart_Rev2.pdf |
| Chauvet Professional | Rogue R1 BeamWash | 14CH, 15CH, 19CH, 21CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_R1_Beam_Wash_DMX_Charts_Rev3.pdf). https://chauvetprofessional.com/wp-content/uploads/2019/11/Rogue_R1_Beam_Wash_DMX_Charts_Rev3.pdf |
| Chauvet Professional | Rogue R1E Spot | 16CH, 19CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue-R1E-Spot_DMX_Chart_Rev4.pdf). https://chauvetprofessional.com/wp-content/uploads/2024/03/Rogue-R1E-Spot_DMX_Chart_Rev4.pdf |
| Chauvet Professional | Rogue R2E Spot | 18CH, 21CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue-R2E-Spot_DMX_Chart_Rev3.pdf). Laut Chart 18/21 Kanäle (Recherche nannte 19/22). https://chauvetprofessional.com/wp-content/uploads/2024/01/Rogue-R2E-Spot_DMX_Chart_Rev3.pdf |
| Chauvet Professional | Rogue R3 Beam | 16CH, 19CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (Rogue_R3_Beam_DMX_Chart_Rev3.pdf). https://chauvetprofessional.com/wp-content/uploads/2021/04/Rogue_R3_Beam_DMX_Chart_Rev3.pdf |
| Chauvet Professional | STRIKE Array 2 | 1CH, 2CH, 9CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (STRIKE_Array_2_DMX_Chart_Rev5.pdf). https://chauvetprofessional.com/wp-content/uploads/2021/02/STRIKE_Array_2_DMX_Chart_Rev5.pdf |
| Chauvet Professional | STRIKE P38 | 1CH, 7CH | Kanalfolge und Bereiche aus dem Chauvet-Professional-DMX-Chart (STRIKE_P38_DMX_Chart_Rev3.pdf). https://chauvetprofessional.com/wp-content/uploads/2018/10/STRIKE_P38_DMX_Chart_Rev3.pdf |
| Eurolite | LED TMH-S180 Moving-Head Spot | 13CH, 15CH | Kanalfolge und Bereiche aus der Eurolite-Bedienungsanleitung (DMX-Protokoll, 51786086-Anleitung-138075-1.0000-eurolite-led-tmh-s180-moving-head-spot-de_en.pdf). https://www.steinigke.de/download/51786086-Anleitung-138075-1.0000-eurolite-led-tmh-s180-moving-head-spot-de_en.pdf |
| Eurolite | LED TMH-S400 CMY Moving-Head Beam/Spot/Wash | 22CH, 25CH | Kanalfolge und Bereiche aus der Eurolite-Bedienungsanleitung (DMX-Protokoll, 51786089-Anleitung-170920-1.2000-eurolite-led-tmh-s400-cmy-moving-head-beam-spot-wash-de_en.pdf). https://www.steinigke.de/download/51786089-Anleitung-170920-1.2000-eurolite-led-tmh-s400-cmy-moving-head-beam-spot-wash-de_en.pdf |
| GLP | impression S500 Profile | 35CH Normal | Kanalfolge aus GLP DMX Channel Index impression S500 Profile HO/HC (Rev. 20250116-02, Firmware 0.4.3); einziger Modus. https://glp.de/files/products/impression-s500-profile-product-data/GLP_impression_S500_Profile_DMX_Channel_Index_EN_Rev20250116-02.pdf |
| GLP | impression S500 Wash | 27CH Normal | Kanalfolge aus GLP DMX Channel Index impression S500 Wash (Rev. 20241209-02); einziger Modus. https://glp.de/files/products/impression-s500-wash-product-data/GLP_impression_S500_Wash_DMX_Channel_Index_EN_Rev20241209-02.pdf |
| JB-Lighting | M18 Profile | 47CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (M18_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit, 58 Kanäle) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/M18_DMX_Protocol.pdf |
| JB-Lighting | P10 Profile | 40CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (P10_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit, mehr Kanäle) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/P10_DMX_Protocol.pdf |
| JB-Lighting | P10 Wash | 37CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (P10_Wash_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/P10_Wash_DMX_Protocol.pdf |
| JB-Lighting | P15 Profile | 44CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (P15_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/P15_DMX_Protocol.pdf |
| JB-Lighting | P15 Wash | 35CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (P15_Wash_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/P15_Wash_DMX_Protocol.pdf |
| JB-Lighting | P18 Wash | 36CH Mode 1 | Kanalfolge aus JB-Lighting DMX-Protokoll (P18_Wash_MK2_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Mode 2 (16-Bit) nicht erfasst. https://www.jb-lighting.de/download/DMX-Protokolle/P18_Wash_MK2_DMX_Protocol.pdf |
| JB-Lighting | P5 Beamspot | 25CH Mode 1, 32CH Mode 2 | Kanalfolge aus JB-Lighting DMX-Protokoll (P5_DMX_Protocol.pdf, Version 1.06); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. https://www.jb-lighting.de/download/DMX-Protokolle/P5_DMX_Protocol.pdf |
| JB-Lighting | P9 Spot | 29CH Mode 1, 39CH Mode 2 | Kanalfolge aus JB-Lighting DMX-Protokoll (P9_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. https://www.jb-lighting.de/download/DMX-Protokolle/P9_DMX_Protocol.pdf |
| JB-Lighting | Sparx 9 | 32CH Mode 1, 21CH Mode 3, 49CH Mode 3 + Pixel | Kanalfolge aus JB-Lighting DMX-Protokoll (Sparx_9_DMX_Protocol.pdf); Bereiche für Shutter/Farbrad/Gobos/Prisma nach Handbuch. Einzelpixel-Block (7 × RGBW, 28 Kanäle) wird an jeden Modus angehängt; hier mit Mode 3. https://www.jb-lighting.de/download/DMX-Protokolle/Sparx_9_DMX_Protocol.pdf |
| Martin | MAC Ultra Wash | 23CH Compact | Kanalfolge aus dem MAC Ultra Wash User Guide (DMX-Protokoll, ab Firmware 1.0.0): Compact Mode = Basic Mode ohne P3-Mix/FX. Basic Mode nicht erfasst. https://www.martin.com/en/products/mac-ultra-wash |
| Martin | RUSH MH 1 Profile Plus | 17CH | Kanalfolge und Bereiche aus dem RUSH MH 1 Profile Plus User Manual (Kapitel DMX protocol, martin.com). https://www.martin.com/en/products/rush-mh-1-profile-plus |

## Selbsttest

Skript `selftest.ts` (Scratchpad, mit esbuild gebündelt wie `npm run vd-fixtures`): baut jeden Steckbrief mit `build()`, prüft doppelte keys/ids (auch gegen `tools/vd-fixtures/catalog-*.ts`), Kanalzahl jedes Modus gegen `ch` und Modusnamen, `compileMode()` aus `src/shared/dmx-codec.ts` für alle Modi, `resolveModel()`, bei verifizierten Modi zusätzlich Attr-Namen, `byte`, fine-Kanal mit passendem coarse-Kanal, `cell`/`group` im Bereich der 3D-Zellen, Cap-Bereiche (sortiert, ohne Überlappung, 0–255, Farbe als #hex, Gobo-Nummer).

```
node selftest.mjs  (esbuild-Bundle von selftest.ts)
{"steckbriefe": 3452, "verifiziert": 67, "modi": 10878, "verifizierteModi": 153, "fehler": 0, "warnungen": 0}
keine Fehler, keine Warnungen; Exit-Code 0
```

## Offene Punkte

- **Gesperrte/ausgelassene Quellen:** `assets.centryngroup.com` (Handbücher von ADJ und Elation) sperrt `ClaudeBot` per robots.txt → nicht geladen; ADJ/Elation daher ohne verifizierte Modi. `support.musiclights.it` (Prolights-Downloads) hat `Disallow: /` → nicht genutzt. Robe-Downloads nur per JavaScript/Login → nicht genutzt. Claypaky/Ayrton: keine offenen DMX-PDFs auf den Produktseiten gefunden (Ayrton nur ZIP-Pakete) → nicht genutzt.
- **Teilweise erfasst:** Bei einigen Geräten nur der Haupt-/Kompaktmodus (Notiz im Steckbrief), z. B. JB-Lighting P10/P15/P18/M18 (Mode 2 = 16 Bit), MAC Ultra Wash (nur Compact), Rogue Outcast 1 BeamWash (nur 15CH), Rogue Outcast 2X Wash (ohne Zonenmodi). Sparx 12/18/30: Kanalliste im PDF widerspricht der Kanalzahl in der Überschrift → nicht verifiziert. Martin Viper XIP, ERA 600–800, MAC One Beam, Allure Wash PC: Tabellen-Layout nicht sicher maschinell lesbar → Generator-Schema.
- **ACME** (66 Handbuch-Links, Gruppe 4) und ältere Chauvet-DJ-Handbücher (anderes Tabellenlayout) sind gute nächste Kandidaten; ACME ARES ist geladen, aber noch nicht ausgewertet (Spalten-Layout 21ch/17ch).
- **Generator-Grenzen (behoben, Builder 13.11.2026):** Konventionelle Bauformen mit LED-Farbmischung (RGBAL, RGBW, WW/CW …) bekommen Farbkanäle, Strobe und typische Steuerkanäle statt „Function N“; `scanner` und die übrigen neuen Bauformen sind in `archetype.ts` eingebaut. `npm run vd-fixtures` liest die Steckbriefe direkt (`tools/vd-fixtures/research.ts`), ergänzt 3D-Angaben aus `models.json` und arbeitet `possible-duplicates.json` ab (Ergebnis in `docs/FIXTURES-VD.md`).
- **Shop-Daten (YUER, SHEHDS, OPPSK, KIMU, JCLight, Lixada, Tomshine, Big Dipper):** Werte per Regex aus Titeln/Texten; Bauform und LED-Zahl können falsch sein, mehrere Varianten unter einem Titel. Vor Übernahme stichprobenartig prüfen.
- Recherche-Kanalzahlen und Handbuch weichen teils ab (z. B. Rogue R2E Spot: Recherche 19/22, DMX-Chart Rev3 18/21) – verifizierte Steckbriefe folgen dem Handbuch.
- Farbwerte (#hex) der Farbräder sind Näherungen aus den Farbnamen.
