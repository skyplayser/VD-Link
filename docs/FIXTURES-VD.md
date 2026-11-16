# Eigene Fixture-Definitionen (VD-Link, EPL-2.0)

3785 Lampen, davon 87 mit geprüfter Kanalbelegung. Erzeugt mit `npm run vd-fixtures` aus

- den Steckbriefen in `tools/vd-fixtures/catalog-*.ts` (273 Lampen) und
- den Steckbriefen der Fixture-Recherche in `docs/fixture-research/modes/` (3512 Lampen, Methode und Quellen: `docs/fixture-research/README.md`).

**Geprüft = nein** heißt: Kanalzahl und Funktionen stammen aus den Herstellerangaben (bei Shop-Daten aus den Produkttexten), die Reihenfolge der Kanäle folgt dem typischen Schema dieser Lampenart. Vor einer echten Show mit dem Handbuch vergleichen (in der Bibliothek steht dazu ein Hinweis). **Geprüft = ja** heißt: Kanalfolge und Wertebereiche wurden aus dem DMX-Protokoll des Herstellers übertragen.

## Übersicht

- **Kataloge** (`tools/vd-fixtures/`): 273 Lampen (UKing: 49 · YUER: 70 · Betopper: 37 · Robe: 12 · Claypaky: 4 · Martin: 11 · GLP: 5 · Ayrton: 10 · Chauvet Professional: 11 · Chauvet DJ: 1 · ETC: 1 · ARRI: 1 · Astera: 4 · SGM: 4 · Elation: 9 · ADJ: 2 · Cameo: 4 · JB-Lighting: 6 · Robert Juliat: 4 · High End Systems: 1 · Vari-Lite: 2 · Acme: 1 · Chroma-Q: 1 · Briteq: 1 · Prolights: 1 · Generic: 21)
- **Gruppe 1 · High-End, Touring & Theater:** 718 Lampen, davon 36 geprüft (Chauvet Professional: 142 · GLP: 37 · JB-Lighting: 9 · Martin: 64 · ADB: 5 · Ayrton: 27 · Claypaky: 33 · Elation: 106 · Prolights: 139 · Robe: 126 · SGM: 29 · Vari-Lite: 1)
- **Gruppe 2 · Mittelklasse, Verleih & Club:** 952 Lampen, davon 31 geprüft (Chauvet DJ: 187 · Eurolite: 253 · ADJ: 237 · Briteq: 68 · Contest: 3 · Futurelight: 10 · IMG Stageline: 1 · Involight: 32 · JB Systems: 118 · Showtec: 38 · Stairville: 5)
- **Gruppe 3 · China-Direktvertrieb & Budget:** 579 Lampen (Big Dipper: 7 · Lixada: 1 · OPPSK: 50 · Shehds: 14 · Tomshine: 3 · UKing: 5 · YUER: 499)
- **Gruppe 4 · China OEM/ODM & Eigenmarken:** 1263 Lampen (Acme: 133 · CKC Lighting: 194 · EK: 78 · Fine Art: 69 · Golden Sea: 175 · JCLight: 92 · KIMU: 30 · Light Sky: 94 · LiteLEES: 64 · MOKA SFX: 76 · PR Lighting: 69 · Topled: 35 · VSHOW: 62 · XMlite: 92)

3D-Bauformen: movinghead 1567 · par 564 · bar 317 · strobe 230 · effect 205 · panel 166 · profile 132 · fresnel 132 · blinder 83 · laser 78 · tiltbar 63 · retro 49 · derby 42 · cob 38 · follow 29 · tube 22 · multibar 19 · scanner 17 · arms 12 · spider 10 · gigbar 6 · ufo 4

314 Recherche-Steckbriefe wurden um 3D-Angaben aus `docs/fixture-research/models.json` ergänzt, bei 97 davon mit eigener Bauform (Scanner, Derby, Kugel, Arme, Leiste mit Einzelköpfen, GigBar …).

## Ausgelassene Dubletten (30)

Gleiche ID, gleicher Hersteller und Modellname wie eine Katalog- oder Bibliothekslampe (OFL/QLC+), gleiche Daten wie ein anderer Shop-Eintrag oder laut `possible-duplicates.json` dasselbe Gerät (gleicher Typ, gemeinsame Kanalzahl).

<details><summary>Liste</summary>

- Lixada 25W Mini Moving Head RGBW (8 Farben, Gobos) – gleich wie ofl:lixada/mini-gobo-moving-head-light (Typ movinghead, gemeinsame Kanalzahl)
- Lixada 7×10W RGBW Mini Moving Head (70–105W) – gleich wie ofl:stage-right/stage-wash-7x10w-led-moving-head (Typ movinghead, gemeinsame Kanalzahl)
- Lixada 50W RGBW Beam Moving Head (12W Lampe) – gleich wie ofl:stage-right/mini-beam-rgbw (Typ movinghead, gemeinsame Kanalzahl)
- YUER 19x40W Bee Eye Moving Head Light With Ring Wash Effect – gleich wie vd:yuer/19x40w-bee-eye-zoom (Typ movinghead, gemeinsame Kanalzahl)
- YUER 18x10W RGBW 4in1 LED Wall Washer Light Point Control Wash Effect Sound – gleich wie vd:yuer/18x10w-ip65-wall-washer (Typ pixelbar, gemeinsame Kanalzahl)
- YUER LED 10x40W RGBW 4IN1 Beam 10 Heads Moving Head Light With Gold/White – gleich wie vd:yuer/10x40w-10-head (Typ movinghead, gemeinsame Kanalzahl)
- YUER Copy Claypaky K10 19x15W Bee Eye RGBW 4in1 LED Wash Moving Head Light – gleich wie vd:yuer/19x15w-bee-eye-k10 (Typ movinghead, gemeinsame Kanalzahl)
- YUER 6-Eye 6X50W White+Warm White 2IN1 LED COB Vertical Retro Light – gleich wie vd:yuer/6x50w-retro-telescopic (Typ par, gemeinsame Kanalzahl)
- YUER IP65 Waterproof LED 19x40W RGBW Bee Eye Wash Moving Head Light RDM – gleich wie vd:yuer/19x40w-bee-eye-zoom (Typ movinghead, gemeinsame Kanalzahl)
- YUER 19X15W RGBW 4IN1 Focusing Moving Head Wash Light – gleich wie vd:yuer/19x15w-bee-eye-k10 (Typ movinghead, gemeinsame Kanalzahl)
- YUER 420W 19R Moving Head Beam Light With Atomization Zoom Gobo Ring – gleich wie vd:yuer/19r-420w-beam (Typ movinghead, gemeinsame Kanalzahl)
- YUER 300W LED Retro Bee Eye Moving Head Light 4 in 1 Background Mixed – gleich wie vd:yuer/4x60w-bee-eye-mirror (Typ movinghead, gemeinsame Kanalzahl)
- YUER Profession 380W 20R Beam Spot Wash Moving Head Light Double Prism Zoom – gleich wie vd:yuer/20r-380w-beam-spot-wash (Typ movinghead, gemeinsame Kanalzahl)
- YUER 230W 7R Beam Moving Head With Ring 3 Prism Raibow Effect Bar – gleich wie vd:yuer/7r-230w-beam-aperture (Typ movinghead, gemeinsame Kanalzahl)
- YUER Copy Claypaky K10 19x15W Bee Eye RGBW LED Wash with Zoom Beam Moving – gleich wie vd:yuer/19x15w-bee-eye-k10 (Typ movinghead, gemeinsame Kanalzahl)
- YUER Super Bright UFO 6x40W LED Moving Head Light Rotate Meteor Beam Effect – gleich wie vd:yuer/6x40w-ufo (Typ effect, gemeinsame Kanalzahl)
- YUER Professional 14R 295W Beam Moving Head Light With Aperture Zoom Gobo – gleich wie vd:yuer/14r-295w-beam-zoom (Typ movinghead, gemeinsame Kanalzahl)
- YUER Mini Beam 295W 14R Moving Head Light With Flightcase Beam 14r Beam – gleich wie vd:yuer/14r-295w-beam-zoom (Typ movinghead, gemeinsame Kanalzahl)
- YUER 19x15W LED RGBW Beam + Wash Zoom Moving Head Light Bar Dance Floor – gleich wie vd:yuer/19x15w-bee-eye-k10 (Typ movinghead, gemeinsame Kanalzahl)
- YUER With SMD Aperture 295W 12R Beam Moving Head 8+16+24 Prism Rainbow – gleich wie vd:yuer/12r-295w-beam-aperture (Typ movinghead, gemeinsame Kanalzahl)
- YUER 12R 295W Beam Moving Head Light 8 + Honeycomb Prism Gobo Projector – gleich wie vd:yuer/12r-295w-beam-aperture (Typ movinghead, gemeinsame Kanalzahl)
- YUER Mini 7x40w Zoom Wash Beam LED Moving Head RGBW Patry Spotlight – gleich wie vd:yuer/7x40w-zoom-wash (Typ movinghead, gemeinsame Kanalzahl)
- YUER LED Wall Wash Light 18X10W RGBW 4in1/18X15W RGBWA 5in1/18x18W – gleich wie vd:yuer/18x10w-ip65-wall-washer (Typ pixelbar, gemeinsame Kanalzahl)
- YUER IP65 Water Proof Point Control 18X10W RGBW 4in1/18X15W RGBWA – gleich wie vd:yuer/18x10w-ip65-wall-washer (Typ pixelbar, gemeinsame Kanalzahl)
- YUER Pro Wash 14X6W LED Beam RGBW 4in1 LED Par Light Professional Stage – gleich wie vd:yuer/14x6w-par (Typ par, gemeinsame Kanalzahl)
- YUER 10x12W COB Warm White Blinder Bar Light COB Amber LED High Power – gleich wie vd:yuer/10x12w-cob-blinder-bar (Typ blinder, gemeinsame Kanalzahl)
- YUER MINI 7R 230W Beam 0SRAM Moving Head 16/20CH Lyre – gleich wie vd:yuer/7r-230w-beam-aperture (Typ movinghead, gemeinsame Kanalzahl)
- YUER Copy Claypaky Mini 7x40w RGBW LED Beam Zoom Moving Head Light Macros – gleich wie vd:yuer/7x40w-zoom-wash (Typ movinghead, gemeinsame Kanalzahl)
- YUER Copy Robe Pointe 280W 10R Beam Spot Wash 3IN1 Moving Head Light – gleich wie vd:yuer/10r-280w-beam-spot-wash (Typ movinghead, gemeinsame Kanalzahl)
- YUER LED 7X60W Retro Flash Light Transport Light professional light – gleiche Daten wie vd:yuer/7x60w-led-retro-flash-light-professional-decorate-bar-st (Shop-Eintrag)

</details>

## Kataloge

| Hersteller | Modell | 3D-Modell | Pixel/Linsen | Modi | Geprüft | Quelle |
|---|---|---|---|---|---|---|
| UKing | ZQ06133 Matrix Moving Head 36 WW + RGB | tiltbar | 72 Zellen | 6CH, 16CH, 146CH Pixel | nein | [Link](https://forum.dmxcontrol-projects.org/thread/18221-ddf-f%C3%BCr-matrix-moving-head-erstellen-uking-zq06133/) |
| UKing | ZQ01339 50W PAR (RGB + white ring) | par | 145 Zellen | 8CH, 12CH, 23CH | nein | [Link](https://www.uking-online.com/products/uking-zq01339-50w-par-light) |
| UKing | ZQ02798 Party Light 6×10W + strobe + laser | movinghead / matrix | 18 Zellen | 24CH | nein | [Link](https://www.uking-online.com/products/uking-zq02798-party-light) |
| UKing | ZQ06144 180W Retro Light | retro | 192 Zellen | 8CH, 23CH, 106CH Pixel, 300CH Pixel | nein | [Link](https://www.uking-online.com/products/uking-zq06144-180w-retro-light) |
| UKing | ZQ09012 200W Dual Colour COB Spotlight | cob |  | 2CH, 3CH | nein | [Link](https://www.uking-online.com/products/uking-zq09012-200w-dual-color-rgbwa-uv-cob-spotlight) |
| UKing | ZQ02825 295W Beam Pro | movinghead / beam |  | 16CH | nein | [Link](https://www.uking-online.com/products/uking-zq02825-295w-beam-pro) |
| UKing | SplashPWR 1 Waterproof 140W PAR | par | 7 Zellen | 6CH, 10CH | nein | [Link](https://www.uking-online.com/products/uking-zq01249-waterproof-mobile-par-light) |
| UKing | ZQ02578 18W Mini Moving Head | movinghead / spot |  | 9CH | nein | [Link](https://www.uking-online.com/products/uking-zq02578-moving-head-light) |
| UKing | ZQ02040 10W Mini Beam | movinghead / beam |  | 11CH, 13CH | nein | [Link](https://www.uking-online.com/products/b28-moving-head-light-mini-10w-spot-lighting) |
| UKing | ZQ02015 36W Mini Beam with RGB ring | movinghead / spot | 12 Zellen | 9CH, 11CH | nein | [Link](https://www.uking-online.com/products/b243-50w-moving-head-light-with-led-belt-black) |
| UKing | ZQ02001 10W Mini Beam | movinghead / spot |  | 9CH, 11CH | nein | [Link](https://www.uking-online.com/products/b242-led-30w-moving-head-light-spot-color-gobos-light) |
| UKing | ZQ02354 28W Mini Moving Head 7×4W | movinghead / wash | 7 Zellen | 9CH, 14CH | nein | [Link](https://www.uking-online.com/products/uking-105w-rgbw-7leds-stage-lights-moving-head-dmx-dj-disco-) |
| UKing | ZQ06143 290W Wash 24×12W | tiltbar | 24 Zellen | 7CH, 13CH, 99CH Pixel, 105CH Pixel | nein | [Link](https://www.uking-online.com/products/uking-zq06143-wash) |
| UKing | ZQ01335 350W Retro PAR 7×50W gold COB | retro | 103 Zellen | 16CH, 37CH | nein | [Link](https://www.uking-online.com/products/uking-zq01335-par-light-1) |
| UKing | ZQ02873 Moving Laser 6×RGB | movinghead / beam |  | 15CH, 27CH | nein | [Link](https://www.uking-online.com/products/uking-zq02873-moving-head-light-1) |
| UKing | ZQ02109 225W Moving Head 7×30W + RGB ring | movinghead / wash | 37 Zellen | 30CH, 42CH Pixel, 58CH Pixel | nein | [Link](https://www.uking-online.com/products/uking-zq02109-moving-head-light-1) |
| UKing | ZQ02823 300W Beam Pro with RGB ring | movinghead / beam | 31 Zellen | 16CH, 22CH | nein | [Link](https://www.uking-online.com/products/uking-zq02823-beam-1) |
| UKing | ZQ06139 75W Waterproof Wash Bar 24×3W | bar | 24 Zellen | 2CH, 3CH, 4CH, 6CH, 7CH, 12CH, 24CH Pixel | nein | [Link](https://www.uking-online.com/products/uking-zq06139-waterproof-wash) |
| UKing | ZQ01334 385W Retro Wash 6×50W | retro | 102 Zellen | 15CH, 33CH | nein | [Link](https://www.uking-online.com/products/uking-zq01334-wash) |
| UKing | ZQ02623 Party Light 6×10W + laser | movinghead / matrix | 6 Zellen | 24CH | nein | [Link](https://www.uking-online.com/products/uking-zq02623-moving-head-light) |
| UKing | ZQ02821 250W Beam Pro with RGB ring | movinghead / beam | 29 Zellen | 18CH, 22CH | nein | [Link](https://www.uking-online.com/products/uking-zq02821-beam) |
| UKing | ZQ02372 200W Beam with RGB ring | movinghead / beam | 31 Zellen | 16CH, 22CH | nein | [Link](https://www.uking-online.com/products/uking-zq02372-beam) |
| UKing | ZQ02371 200W Beam Spot Zoom | movinghead / spot |  | 18CH | nein | [Link](https://www.uking-online.com/products/uking-zq02371-beam-pro) |
| UKing | ZQ02622 Moving Laser 2W full colour | movinghead / beam |  | 28CH | nein | [Link](https://www.uking-online.com/products/uking-zq02622-moving-head-light) |
| UKing | ZQ06200 160W Wash Panel 80×2W | panel | 80 Zellen | 24CH | nein | [Link](https://www.uking-online.com/products/uking-zq06200-wash) |
| UKing | ZQ02620 50W Moving Head 4×3W + ring + laser | movinghead / beeeye | 32 Zellen | 19CH, 25CH | nein | [Link](https://www.uking-online.com/products/uking-zq02620-moving-head-light) |
| UKing | ZQ01553 210W Waterproof PAR 14×15W | par | 14 Zellen | 4CH, 9CH | nein | [Link](https://www.uking-online.com/products/uking-zq01553-waterproof-par-light) |
| UKing | ZQ06140 100W Waterproof Wash Bar 168 RGB + 168 W | bar | 112 Zellen | 2CH, 3CH, 4CH, 6CH, 8CH, 112CH Pixel, 114CH Pixel | nein | [Link](https://www.uking-online.com/products/100w-336leds-rgb-waterproof-wall-washer-light-with-strobe-fa) |
| UKing | ZQ03268 Laser 2W full colour | laser |  | 16CH | nein | [Link](https://www.uking-online.com/products/3d-animation-laser-machine-with-bluetooth-app-rgb-party-lase) |
| UKing | ZQ02103 190W Hybrid Moving Head 19×10W | movinghead / beeeye | 19 Zellen | 16CH, 24CH | nein | [Link](https://www.uking-online.com/products/36pcs-focusing-light-moving-head-light-stage-lighting-effect) |
| UKing | ZQ09013 200W RGBWA+UV COB Spotlight | cob |  | 6CH, 10CH | nein | [Link](https://www.uking-online.com/products/cob-200w-linear-spotlights-with-barn-doors-rgbwa-uv-6in1-cob) |
| UKing | ZQ02359 300W Party Light 6×50W | movinghead / matrix | 6 Zellen | 14CH, 16CH | nein | [Link](https://www.uking-online.com/products/240w-high-brightness-moving-head-light-6-leds-rgbw-360rotati) |
| UKing | ZQ02356 175W Moving Head 7×25W Zoom | movinghead / wash | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://www.uking-online.com/products/7pcs-25w-rgbw-leds-bees-eye-wash-moving-head-dj-light) |
| UKing | ZQ02357 230W Beam Pro with strip | movinghead / beam | 24 Zellen | 18CH | nein | [Link](https://www.uking-online.com/products/mini-230w-led-moving-head-rgbw-stage-lights-with-strip-light) |
| UKing | ZQ01528 110W RGBWA+UV Wireless Battery PAR | par | 6 Zellen | 6CH, 10CH | nein | [Link](https://www.uking-online.com/products/wireless-built-in-battery-remote-control-wifi-par-light-wash) |
| UKing | ZQ02314 250W Waterproof Beam Pro | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://www.uking-online.com/products/dragon-king-led300-waterproof-beam-moving-head-light-for-dj-) |
| UKing | ZQ06121 200W Retro Light 768 RGB + 96 W | retro | 192 Zellen | 4CH, 6CH, 12CH, 144CH Pixel, 154CH Pixel | nein | [Link](https://www.uking-online.com/products/768pcs-0-5w-three-in-one-color-mixing-rainbow-effect-highlig) |
| UKing | ZQ02341 80W Mini Beam | movinghead / beam |  | 12CH | nein | [Link](https://www.uking-online.com/products/zq02341-150w-beam-moving-head-light-stage-light-for-dj-conce) |
| UKing | ZQ01496 200W COB PAR 2-Eye | cob | 2 Zellen | 8CH | nein | [Link](https://www.uking-online.com/products/200w-double-color-two-eyes-cob-par-light-fill-light-lighting) |
| UKing | ZQ02253 285W Moving Head 19×15W Zoom | movinghead / wash | 19 Zellen | 16CH, 24CH, 32CH | nein | [Link](https://www.uking-online.com/products/19pcs-focusing-19pcs15w-4-in-1-led-dmx512-moving-head-par-li) |
| UKing | ZQ06079 250W Swing Wash Bar 10×25W | tiltbar | 10 Zellen | 7CH, 13CH, 43CH Pixel | nein | [Link](https://www.uking-online.com/products/250w-swing-dot-beam-wall-washer-light-10pcs-25w-led-rgbw-4in) |
| UKing | ZQ02042 230W Beam 7R | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.uking-online.com/products/230w-stage-moving-head-light-15-gobos-and-14-colors-rainbow-) |
| UKing | ZQ01026 24W Mobile Battery PAR | par | 12 Zellen | 8CH | nein | [Link](https://www.uking-online.com/products/12pcs-rgbw-4-in-1-led-built-in-battery-par-light-strobe-ligh) |
| UKing | ZQ02011 85W Mini Beam | movinghead / beam |  | 11CH, 13CH | nein | [Link](https://www.uking-online.com/products/85w-gobo-moving-head-stage-light-rgbw-dmx-led-beam-spot-ligh) |
| UKing | ZQ01417 180W Waterproof PAR 18×10W | par | 18 Zellen | 4CH, 8CH | nein | [Link](https://www.uking-online.com/products/zq01417-uking-stage-lights-waterproof-ip65-leds-par-light-fo) |
| UKing | ZQ02229 250W Beam Pro Zoom | movinghead / spot |  | 16CH | nein | [Link](https://www.uking-online.com/products/high-brightness-rainbow-lighting-prism-pattern-light-beam-li) |
| UKing | ZQ01424 85W PAR 14×6W | par | 14 Zellen | 4CH, 8CH | nein | [Link](https://www.uking-online.com/products/par-light-stage-light-4-in-1-rgbw-14-leds-stage-effect-light) |
| UKing | ZQ06017 Wash Bar 24×3W | bar | 24 Zellen | 2CH, 3CH, 4CH, 6CH, 7CH, 12CH, 24CH Pixel | nein | [Link](https://www.uking-online.com/products/b354-led-bar-rgb-24-leds-wall-light-with-remote-controller) |
| UKing | ZQ01069 145W PAR 18×8W | par | 18 Zellen | 4CH, 8CH | nein | [Link](https://www.uking-online.com/products/b35-par-can-rgbw-18-leds-par-light) |
| YUER | 19×40W Bee Eye Zoom RGBW | movinghead / beeeye | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel, 99CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×40W Bee Eye with Ring Wash Effect | movinghead / beeeye | 79 Zellen | 23CH, 35CH, 101CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×40W IP65 Zoom Wash | movinghead / wash | 19 Zellen | 19CH, 27CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×15W Bee Eye RGBW Zoom & Rotation | movinghead / beeeye | 19 Zellen | 16CH, 21CH, 79CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×20W Big Bee Eye Zoom | movinghead / beeeye | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×25W Bee Eye Spot/Wash/Zoom CTO | movinghead / beeeye | 19 Zellen | 21CH, 23CH, 35CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×60W IP65 Bee Eye with Ring | movinghead / beeeye | 67 Zellen | 25CH, 37CH, 101CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×80W IP66 Bee Eye Beam Wash | movinghead / beeeye | 19 Zellen | 23CH, 35CH, 99CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 7×40W Mini Bee Eye | movinghead / beeeye | 7 Zellen | 13CH, 15CH, 36CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 7×60W Mini Bee Eye with Ring | movinghead / beeeye | 31 Zellen | 15CH, 19CH, 43CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 6×40W Pixel Bee Eye Zoom Wash | movinghead / beeeye | 6 Zellen | 14CH, 38CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 4×40W Bee Eye Zoom | movinghead / beeeye | 4 Zellen | 16CH, 20CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 4×60W Bee Eye Mirror Rotation | movinghead / beeeye | 4 Zellen | 16CH, 20CH, 32CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 18×40W Bee Eye + RGB Laser | movinghead / beeeye | 54 Zellen | 52CH, 76CH Pixel, 148CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×15W Bee Eye Wash + 100W Beam with Aperture | movinghead / beeeye | 34 Zellen | 22CH, 28CH, 64CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 7R 230W Beam with LED Aperture | movinghead / beam | 24 Zellen | 16CH, 20CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 12R 295W Beam with SMD Aperture | movinghead / beam | 30 Zellen | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 14R 295W Beam with Aperture & Zoom | movinghead / spot | 30 Zellen | 16CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 17R 350W Beam Spot with Aperture | movinghead / spot | 36 Zellen | 16CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19R 380W Beam Spot with Aperture | movinghead / spot | 36 Zellen | 20CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19R 420W Beam with Atomisation & Ring | movinghead / spot | 40 Zellen | 20CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 20R 380W Beam Spot Wash Double Prism | movinghead / spot |  | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10R 280W Beam Spot Wash Zoom | movinghead / spot | 24 Zellen | 16CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 260W Beam Spot with Aperture | movinghead / spot | 24 Zellen | 16CH, 20CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 275W Mini Beam Spot with Light Ring | movinghead / spot | 24 Zellen | 16CH, 20CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 295W Mini Beam Spot with LED Ring | movinghead / beam | 24 Zellen | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 100W LED Beam 15 Gobos 18 Prism | movinghead / beam |  | 13CH, 16CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 120W LED Beam Spot with Aperture | movinghead / spot | 16 Zellen | 14CH, 16CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 150W LED Beam Spot | movinghead / spot |  | 14CH, 16CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 200W LED Beam Spot 18 Prism Rainbow | movinghead / spot |  | 16CH, 18CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 230W LED Spot Beam Wash Zoom | movinghead / spot |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 400W LED Beam Spot Wash CMY CTO | movinghead / spot |  | 24CH, 30CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 550W LED CMY CTO Profile Spot | movinghead / profile |  | 30CH, 38CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 600W Mini LED Cutter CMY CTO with Aperture | movinghead / profile | 36 Zellen | 32CH, 40CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 650W IP66 LED Beam Spot Wash CMY CTO | movinghead / spot |  | 26CH, 34CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 1200W LED CMY CTO Beam Spot Wash Cutter | movinghead / profile |  | 36CH, 44CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 150W RGBL Beam Wash with 24 Backlight Pixels | movinghead / wash | 24 Zellen | 16CH, 22CH, 88CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 60W Mini LED Beam with Ring | movinghead / beam | 16 Zellen | 13CH, 16CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 40W RGBW Beam with Ring | movinghead / beam | 12 Zellen | 11CH, 14CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 80W RGBW Beam + 48×2W Retro Backlight | movinghead / beam | 48 Zellen | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 7×40W RGBW Beam Wash Zoom | movinghead / wash | 7 Zellen | 13CH, 17CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 12×40W RGBW Zoom Wash | movinghead / wash | 12 Zellen | 14CH, 18CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 19×10W RGBW Wash with Ring | movinghead / wash | 55 Zellen | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 36×12W RGBW Focusing Wash | movinghead / wash | 36 Zellen | 16CH, 18CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | UFO 6×40W Meteor Beam | ufo | 6 Zellen | 14CH, 20CH, 32CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 4×40W 4-Head Beam with Ring | movinghead / matrix | 28 Zellen | 16CH, 20CH, 31CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 4×80W Beam with Ring, Infinite Rotation | movinghead / matrix | 36 Zellen | 16CH, 20CH, 31CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×40W 10-Head Beam with Strobe | tiltbar | 20 Zellen | 16CH, 46CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×60W Beam Wash Strobe Moving Bar | tiltbar | 30 Zellen | 14CH, 56CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×80W Double-sided Electrodeless Beam Bar | tiltbar | 46 Zellen | 16CH, 60CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 12×80W Infinite Lifting Ring Beam | ufo | 60 Zellen | 16CH, 60CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 6×10W Six-Arm Magic Ball | movinghead / matrix | 12 Zellen | 16CH, 22CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 8×6W Mini Spider | spider | 8 Zellen | 13CH, 16CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 12×10W 4-Head Beam with Ring & Lasers | movinghead / matrix | 36 Zellen | 18CH, 26CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 6-Eye 6×50W W/WW Retro Telescopic | retro | 78 Zellen | 10CH, 18CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 300W Retro Bee Eye Moving Head | movinghead / beeeye | 79 Zellen | 16CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 3×80W Golden Retro + RGB Strobe + Beam | retro | 39 Zellen | 12CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 25×30W RGBW Matrix Beam Star Sky | strobe | 65 Zellen | 10CH, 108CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 36×4W RGBW Vertical Beam Strobe Wash | bar | 48 Zellen | 12CH, 156CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 144×3W Pixel Strobe | strobe | 48 Zellen | 8CH, 144CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 1200W IP65 RGBW Strobe | strobe | 36 Zellen | 10CH, 26CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×12W Warm White COB Blinder Bar | blinder | 10 Zellen | 2CH, 10CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10×35W Halogen Look Strobe Bar | blinder | 10 Zellen | 2CH, 12CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 44×12W RGBW Floodlight | panel | 44 Zellen | 8CH, 12CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 18×10W IP65 Wall Washer | bar | 18 Zellen | 8CH, 72CH Pixel | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 100W W/WW COB PAR with RGB Auxiliary | cob | 24 Zellen | 6CH, 10CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 14×6W RGBW PAR | par | 14 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 10W RGB Moving Head Laser with Ring | movinghead / beam | 16 Zellen | 16CH, 23CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | ILDA 12W Laser Moving Head with RGB Ring | movinghead / beam | 24 Zellen | 18CH, 28CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| YUER | 15W RGB ILDA Animation Laser | laser |  | 16CH, 24CH | nein | [Link](https://yuerlights.com/collections/moving-head-light) |
| Betopper | LM0740 7×40W Wash Moving Head | movinghead / wash | 7 Zellen | 13CH, 15CH | nein | [Link](https://www.betopperdj.com/products/betopper-lm0740-7x40w-wash-moving-head-light) |
| Betopper | LM0740 MKII 7×40W Wash & Zoom | movinghead / wash | 7 Zellen | 15CH, 17CH, 35CH Pixel | nein |  |
| Betopper | LB300 300W Beam with RGB ring | movinghead / beam | 48 Zellen | 18CH, 22CH | nein |  |
| Betopper | LM1925R 19×25W Wash with Halo Ring | movinghead / wash | 79 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 111CH Pixel | nein | [Link](https://www.betopperdj.com/products/betopper-lm1925r-19x25w-rgbw-moving-head-wash-light-with-halo-ring) |
| Betopper | LM1925 19×25W Zoom Wash | movinghead / wash | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 111CH Pixel | nein |  |
| Betopper | LPD001 9×18W RGBWA+UV Battery Uplight | par | 9 Zellen | 6CH, 10CH | nein |  |
| Betopper | LPW0450 4×50W IP65 WW/CW COB PAR | cob | 4 Zellen | 2CH, 4CH, 6CH | nein |  |
| Betopper | LPW0918 9×18W IP65 RGBAL+UV PAR | par | 9 Zellen | 6CH, 10CH | nein |  |
| Betopper | LC005-B 4×50W WW/CW COB PAR with Barn Doors | cob | 4 Zellen | 2CH, 4CH, 6CH | nein |  |
| Betopper | LM3715R 37×15W Wash with Halo Ring | movinghead / wash | 259 Zellen | 22CH, 27CH, 30CH, 33CH, 58CH | nein |  |
| Betopper | LW2418 24×18W RGBWA+UV Pixel Linear Wash | bar | 24 Zellen | 6CH, 8CH, 11CH, 48CH Pixel, 50CH Pixel | nein |  |
| Betopper | LF80 LED Strobe Bar 280 RGB + 70 W | strobe | 42 Zellen | 10CH, 15CH, 36CH, 112CH Pixel | nein |  |
| Betopper | BSW500 500W CMY + CTO Spot Beam Wash Hybrid | movinghead / spot |  | 29CH | nein |  |
| Betopper | LM1940 19×40W Wash with Pixel Mapping | movinghead / wash | 19 Zellen | 21CH, 23CH, 35CH, 92CH Pixel | nein |  |
| Betopper | LPC018 54×1W RGB PAR | par | 54 Zellen | 7CH | nein |  |
| Betopper | LF105 150W Matrix Strobe 945 RGB | strobe | 45 Zellen | 8CH, 9CH, 15CH | nein |  |
| Betopper | LF350 Matrix Strobe Moving Head 672 RGB + 256 W | tiltbar | 32 Zellen | 17CH, 38CH Pixel, 73CH Pixel | nein |  |
| Betopper | BSW200 200W Spot Beam Wash Hybrid | movinghead / spot |  | 16CH, 20CH | nein |  |
| Betopper | LF1421 Matrix Beam Strobe Bar 42 RGB + 63 W | bar | 105 Zellen | 4CH, 16CH, 63CH Pixel | nein |  |
| Betopper | LF4808 260W Matrix Strobe 768 RGB + 112 W | strobe | 56 Zellen | 4CH, 15CH, 152CH Pixel | nein |  |
| Betopper | LF2405 300W Matrix Beam Strobe 384 RGB + 24 gold | strobe | 48 Zellen | 5CH, 11CH, 112CH Pixel | nein |  |
| Betopper | LC500 4×100W Amber/CW COB Blinder | blinder | 4 Zellen | 12CH | nein |  |
| Betopper | LB295 295W Pro Beam | movinghead / beam |  | 16CH | nein |  |
| Betopper | LPC010-B 54×4W RGBW PAR with Barn Doors | par | 54 Zellen | 4CH, 8CH | nein |  |
| Betopper | LM1915 19×15W Wash with Halo Ring | movinghead / wash | 67 Zellen | 21CH, 23CH, 35CH | nein |  |
| Betopper | LPC010N 54×4W RGBW High CRI PAR | par | 54 Zellen | 4CH, 8CH | nein |  |
| Betopper | LM120 Demon's Eye 120W RGBW Moving Head | movinghead / spot | 24 Zellen | 14CH, 18CH | nein |  |
| Betopper | LCX200 High CRI LED Profile Spot | profile |  | 4CH, 8CH | nein |  |
| Betopper | LW3603 36×3W RGB Wash Bar | bar | 36 Zellen | 8CH, 11CH, 40CH, 108CH Pixel | nein |  |
| Betopper | LPC1818 18×18W RGBALUV PAR | par | 18 Zellen | 6CH, 10CH | nein |  |
| Betopper | CLB260-O 9R 260W Pro Beam | movinghead / beam |  | 16CH, 20CH | nein |  |
| Betopper | LS30 30W Mini Spot | movinghead / spot |  | 9CH, 11CH | nein |  |
| Betopper | LS105 100W Gobo Spot | movinghead / spot |  | 14CH | nein |  |
| Betopper | LS35 30W Spot with Ring Effect | movinghead / spot | 12 Zellen | 10CH, 12CH | nein |  |
| Betopper | LC001-H 100W COB PAR WW/CW | cob |  | 2CH, 4CH | nein |  |
| Betopper | LC002-H 200W COB PAR WW/CW | cob |  | 2CH, 4CH | nein |  |
| Betopper | LM30A 8×3W Mini Spider | spider | 8 Zellen | 7CH, 13CH | nein |  |
| Robe | BMFL Spot | movinghead / spot |  | 25CH, 33CH | nein |  |
| Robe | BMFL Blade | movinghead / profile |  | 34CH, 41CH | nein |  |
| Robe | BMFL WashBeam | movinghead / spot |  | 25CH, 31CH | nein |  |
| Robe | MegaPointe | movinghead / beam |  | 34CH, 39CH | nein |  |
| Robe | ESPRITE | movinghead / profile |  | 42CH, 49CH | nein |  |
| Robe | FORTE | movinghead / profile |  | 44CH, 51CH | nein |  |
| Robe | T2 Profile | movinghead / profile |  | 52CH, 61CH | nein |  |
| Robe | iPAINTE | movinghead / profile |  | 36CH, 43CH | nein |  |
| Robe | TETRA2 | tiltbar | 18 Zellen | 17CH, 34CH, 92CH Pixel | nein |  |
| Robe | TETRA1 | bar | 18 Zellen | 11CH, 77CH Pixel | nein |  |
| Robe | TARRANTULA | movinghead / beeeye | 37 Zellen | 24CH, 31CH, 175CH Pixel | nein |  |
| Robe | iFORTE | movinghead / profile |  | 44CH, 51CH | nein |  |
| Claypaky | Mythos 2 | movinghead / spot |  | 26CH, 32CH | nein |  |
| Claypaky | Axcor Profile 900 | movinghead / profile |  | 33CH, 42CH | nein |  |
| Claypaky | Skylos | movinghead / beam |  | 18CH, 24CH | nein |  |
| Claypaky | Alpha Spot HPE 1500 | movinghead / spot |  | 24CH, 30CH | nein |  |
| Martin | MAC Aura XB | movinghead / wash | 55 Zellen | 14CH, 25CH, 87CH Pixel | nein |  |
| Martin | MAC Aura PXL | movinghead / wash | 160 Zellen | 27CH, 40CH, 123CH Pixel | nein |  |
| Martin | MAC Viper Profile | movinghead / profile |  | 26CH, 34CH | nein |  |
| Martin | MAC Ultra Performance | movinghead / profile |  | 46CH, 53CH | nein |  |
| Martin | MAC Quantum Wash | movinghead / wash | 19 Zellen | 19CH, 23CH, 99CH Pixel | nein |  |
| Martin | MAC One | movinghead / wash | 24 Zellen | 16CH, 22CH | nein |  |
| Martin | ERA 600 Profile | movinghead / profile |  | 32CH, 40CH | nein |  |
| Martin | MAC Allure Profile | movinghead / profile |  | 28CH, 36CH | nein |  |
| Martin | MAC III Profile | movinghead / profile |  | 26CH, 31CH | nein |  |
| Martin | VC-Strip 1 m | bar | 16 Zellen | 3CH, 48CH Pixel | nein |  |
| Martin | VC-Dot 9 | panel | 9 Zellen | 3CH, 27CH Pixel | nein |  |
| GLP | impression X4 XL | movinghead / wash | 55 Zellen | 15CH, 22CH, 233CH Pixel | nein |  |
| GLP | impression X4 Bar 20 | tiltbar | 20 Zellen | 14CH, 25CH, 88CH Pixel | nein |  |
| GLP | JDC2 IP | tiltbar | 24 Zellen | 16CH, 61CH Pixel | nein |  |
| GLP | JDC Line 1000 | tiltbar | 64 Zellen | 10CH, 67CH Pixel | nein |  |
| GLP | impression S350 | movinghead / profile |  | 24CH, 30CH | nein |  |
| Ayrton | Khamsin-S | movinghead / profile |  | 37CH, 48CH | nein |  |
| Ayrton | Perseo-S | movinghead / profile |  | 34CH, 45CH | nein |  |
| Ayrton | MagicDot-R | movinghead / beam |  | 10CH, 17CH | nein |  |
| Ayrton | Ghibli | movinghead / spot |  | 30CH, 38CH | nein |  |
| Ayrton | Cobra | movinghead / beam |  | 22CH, 27CH | nein |  |
| Ayrton | Huracan-LT | movinghead / profile |  | 40CH, 50CH | nein |  |
| Ayrton | Zonda 9 FX | movinghead / wash | 61 Zellen | 27CH, 51CH, 271CH Pixel | nein |  |
| Ayrton | Levante | movinghead / spot |  | 30CH, 38CH | nein |  |
| Ayrton | Eurus-S | movinghead / profile |  | 38CH, 50CH | nein |  |
| Ayrton | Bora-S | movinghead / wash |  | 24CH, 30CH | nein |  |
| Chauvet Professional | Rogue R2X Spot | movinghead / spot |  | 19CH, 23CH | nein |  |
| Chauvet Professional | Rogue R3 Wash | movinghead / wash | 19 Zellen | 17CH, 26CH, 80CH Pixel | nein |  |
| Chauvet Professional | Maverick MK3 Spot | movinghead / spot |  | 24CH, 32CH | nein |  |
| Chauvet Professional | Maverick MK3 Wash | movinghead / wash | 27 Zellen | 17CH, 24CH, 131CH Pixel | nein |  |
| Chauvet Professional | Maverick Storm 1 Spot | movinghead / spot |  | 26CH, 34CH | nein |  |
| Chauvet Professional | Maverick Storm 1 Wash | movinghead / wash | 19 Zellen | 17CH, 24CH, 97CH Pixel | nein |  |
| Chauvet Professional | Color STRIKE M | tiltbar | 12 Zellen | 12CH, 22CH, 62CH Pixel | nein |  |
| Chauvet Professional | STRIKE 1 | blinder | 1 Zellen | 2CH, 4CH | nein |  |
| Chauvet Professional | STRIKE 4 | blinder | 4 Zellen | 4CH, 6CH | nein |  |
| Chauvet Professional | WELL Fit | par | 9 Zellen | 6CH, 10CH | nein |  |
| Chauvet Professional | Rogue Outcast 1 Beam | movinghead / beam |  | 16CH, 22CH | nein |  |
| Chauvet DJ | Intimidator Spot 360 | movinghead / spot |  | 11CH, 14CH | nein |  |
| ETC | Desire D60 Lustr | par | 60 Zellen | 5CH, 9CH | nein |  |
| ARRI | Orbiter | par |  | 7CH, 13CH | nein |  |
| Astera | AX1 PixelTube | tube | 16 Zellen | 8CH, 64CH Pixel | nein |  |
| Astera | AX2 PixelBar | bar | 8 Zellen | 6CH, 32CH Pixel | nein |  |
| Astera | AX9 PowerPAR | par |  | 7CH, 9CH | nein |  |
| Astera | PixelBrick | par |  | 5CH, 9CH | nein |  |
| SGM | Q-7 | strobe | 36 Zellen | 7CH, 13CH, 144CH Pixel | nein |  |
| SGM | Q-2 | strobe | 8 Zellen | 6CH, 34CH Pixel | nein |  |
| SGM | P-6 | par | 36 Zellen | 6CH, 12CH | nein |  |
| SGM | Q-8 | strobe | 48 Zellen | 9CH, 18CH, 196CH Pixel | nein |  |
| Elation | Proteus Maximus | movinghead / profile |  | 46CH, 54CH | nein |  |
| Elation | Proteus Lucius | movinghead / profile |  | 40CH, 48CH | nein |  |
| Elation | Proteus Rayzor 760 | movinghead / wash | 7 Zellen | 17CH, 23CH, 52CH Pixel | nein |  |
| Elation | Rayzor 760 | movinghead / wash | 7 Zellen | 16CH, 22CH, 46CH Pixel | nein |  |
| Elation | Chorus Line 16 | multibar | 16 Zellen | 14CH, 79CH Pixel | nein |  |
| Elation | Fuze Wash 500 | movinghead / wash |  | 16CH, 20CH | nein |  |
| Elation | Artiste Picasso | movinghead / profile |  | 38CH, 46CH | nein |  |
| Elation | Smarty Hybrid | movinghead / spot |  | 20CH, 24CH | nein |  |
| Elation | Dartz 360 | movinghead / beam |  | 18CH, 22CH | nein |  |
| ADJ | Mega Tri Par Profile | par | 9 Zellen | 3CH, 7CH | nein |  |
| ADJ | Vizi Beam RXONE | movinghead / beam |  | 16CH, 20CH | nein |  |
| Cameo | AURO BAR 100 | tiltbar | 10 Zellen | 13CH, 49CH Pixel | nein |  |
| Cameo | EVOS W7 | movinghead / wash | 7 Zellen | 15CH, 21CH, 42CH Pixel | nein |  |
| Cameo | OPUS H5 | movinghead / spot |  | 22CH, 30CH | nein |  |
| Cameo | ZENIT P40 | par | 4 Zellen | 4CH, 8CH | nein |  |
| JB-Lighting | P12 Spot | movinghead / spot |  | 32CH, 40CH | nein |  |
| JB-Lighting | P18 Profile | movinghead / profile |  | 38CH, 47CH | nein |  |
| JB-Lighting | Sparx 7 | movinghead / wash | 7 Zellen | 14CH, 20CH, 43CH Pixel | nein |  |
| JB-Lighting | Sparx 10 | movinghead / wash | 43 Zellen | 18CH, 25CH, 97CH Pixel | nein |  |
| JB-Lighting | Sparx 18 | movinghead / wash | 37 Zellen | 20CH, 28CH, 175CH Pixel | nein |  |
| JB-Lighting | JBLED A8 Wash | movinghead / wash | 19 Zellen | 18CH, 24CH | nein |  |
| Robert Juliat | Sully 650SX Profile | profile |  | 5CH, 9CH | nein |  |
| Robert Juliat | ZEP 640SX Profile | profile |  | 2CH, 4CH | nein |  |
| Robert Juliat | Cyrano LED Follow Spot | follow |  | 6CH, 10CH | nein |  |
| Robert Juliat | Merlin Follow Spot | follow |  | 6CH, 10CH | nein |  |
| High End Systems | SolaFrame 3000 | movinghead / profile |  | 44CH, 52CH | nein |  |
| Vari-Lite | VL2600 Profile | movinghead / profile |  | 32CH, 40CH | nein |  |
| Vari-Lite | VL10 BeamWash | movinghead / spot |  | 30CH, 38CH | nein |  |
| Acme | LYRA | movinghead / spot |  | 22CH, 28CH | nein |  |
| Chroma-Q | Studio Force II 72 | bar | 24 Zellen | 5CH, 9CH, 96CH Pixel | nein |  |
| Briteq | BeamBlade 7 | tiltbar | 7 Zellen | 11CH, 34CH Pixel | nein |  |
| Prolights | PANORAMA IP Wash | movinghead / wash | 19 Zellen | 18CH, 24CH, 97CH Pixel | nein |  |
| Generic | PAR64 1000W (CP62) | par |  | 1CH | ja |  |
| Generic | PAR56 300W | par |  | 1CH | ja |  |
| Generic | PAR36 Pinspot 30W | par |  | 1CH | ja |  |
| Generic | Fresnel 1 kW | fresnel |  | 1CH | ja |  |
| Generic | Fresnel 2 kW | fresnel |  | 1CH | ja |  |
| Generic | PC 1 kW | fresnel |  | 1CH | ja |  |
| Generic | Profile 750W 26° | profile |  | 1CH | ja |  |
| Generic | Profile 750W Zoom 15–30° | profile |  | 1CH | ja |  |
| Generic | Blinder 2-Lite DWE 2×650W | blinder | 2 Zellen | 1CH, 2CH | ja |  |
| Generic | Blinder 4-Lite DWE 4×650W | blinder | 4 Zellen | 2CH, 4CH | ja |  |
| Generic | Molefay 8-Lite 8×650W | blinder | 8 Zellen | 4CH, 8CH | ja |  |
| Generic | Cyc Flood 1 kW | panel |  | 1CH | ja |  |
| Generic | Halogen Floodlight 500W | panel |  | 1CH | ja |  |
| Generic | LED PAR RGB 3CH | par | 18 Zellen | 3CH | ja |  |
| Generic | LED PAR RGBW 4CH | par | 18 Zellen | 4CH | ja |  |
| Generic | LED PAR RGBWA+UV 6CH | par | 12 Zellen | 6CH | ja |  |
| Generic | LED Strobe 2CH (Atomic style) | strobe |  | 2CH | ja |  |
| Generic | LED Pixel Bar 8 × RGB | bar | 8 Zellen | 3CH, 24CH Pixel | ja |  |
| Generic | LED Pixel Bar 16 × RGBW | bar | 16 Zellen | 4CH, 64CH Pixel | ja |  |
| Generic | LED Follow Spot 350W | follow |  | 4CH, 8CH | nein |  |
| Generic | UV Cannon 400W | panel |  | 1CH | ja |  |

## Recherche

| Hersteller | Modell | 3D-Modell | Pixel/Linsen | Modi | Geprüft | Quelle |
|---|---|---|---|---|---|---|
| Chauvet DJ | 4BAR Quad ILS | bar | 4 Zellen | 4CH, 6CH, 19CH | ja | [Link](https://www.chauvetdj.com/products/4bar-quad-ils/) |
| Chauvet DJ | Core 5X1 ILS | bar | 5 Zellen | 4CH, 10CH | ja | [Link](https://www.chauvetdj.com/products/core-5x1-ils/) |
| Chauvet DJ | COREpar Q120 ILS | par |  | 4CH, 9CH | ja | [Link](https://www.chauvetdj.com/products/corepar-q120/) |
| Chauvet DJ | EVE P-140 VW | par | 40 Zellen | 3CH, 4CH, 9CH | ja | [Link](https://www.chauvetdj.com/products/eve-p-140-vw/) |
| Chauvet DJ | EZLink Par Q6BT ILS | par | 6 Zellen | 4CH, 8CH | ja | [Link](https://www.chauvetdj.com/products/ezlink-par-q6bt-ils/) |
| Chauvet DJ | EZLink Strip Q6BT ILS | bar | 3 Zellen | 4CH, 6CH, 16CH | ja | [Link](https://www.chauvetdj.com/products/ezlink-strip-q6bt-ils/) |
| Chauvet DJ | EZPar 64 RGBA ILS | par |  | 4CH, 8CH | ja | [Link](https://www.chauvetdj.com/products/ezpar-64-rgba-ils/) |
| Chauvet DJ | Freedom Par Q9 | par | 9 Zellen | 4CH, 6CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/freedom-par-q9/) |
| Chauvet DJ | Intimidator Beam 360X | movinghead / beam |  | 8CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-beam-360x/) |
| Chauvet DJ | Intimidator Free Spot 60 ILS | movinghead / spot |  | 8CH, 10CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-free-spot-60-ils/) |
| Chauvet DJ | Intimidator Hybrid 251SR | movinghead / spot |  | 13CH, 19CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-hybrid-251sr/) |
| Chauvet DJ | Intimidator Spot 260X | movinghead / spot |  | 8CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-spot-260x/) |
| Chauvet DJ | Intimidator Spot 360X IP | movinghead / spot |  | 8CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-spot-360x-ip/) |
| Chauvet DJ | Intimidator Spot 375ZX | movinghead / spot |  | 9CH, 15CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-spot-375zx/) |
| Chauvet DJ | Intimidator Spot 60 ILS | movinghead / spot |  | 8CH, 10CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/intimidator-spot-60-ils/) |
| Chauvet DJ | Pinspot Q1Z ILS | par |  | 4CH, 6CH, 7CH | ja | [Link](https://www.chauvetdj.com/products/pinspot-q1z-ils/) |
| Chauvet DJ | Sentinel Spot 50 ILS | movinghead / spot |  | 5CH, 11CH | ja | [Link](https://www.chauvetdj.com/products/sentinel-spot-50-ils/) |
| Chauvet DJ | Sentinel Spot Q60 ILS | movinghead / spot |  | 9CH, 15CH | ja | [Link](https://www.chauvetdj.com/products/sentinel-spot-q60-ils/) |
| Chauvet DJ | Sentinel Wash Q7Z ILS | movinghead / wash | 7 Zellen | 9CH, 14CH | ja | [Link](https://www.chauvetdj.com/products/sentinel-wash-q7z-ils/) |
| Chauvet DJ | Shocker P2 | strobe | 2 Zellen | 7CH, 12CH, 20CH | ja | [Link](https://www.chauvetdj.com/products/shocker-p2/) |
| Chauvet DJ | SlimPAR 56 ILS | par | 64 Zellen | 3CH, 7CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-56-ils/) |
| Chauvet DJ | SlimPAR H6 ILS | par | 6 Zellen | 6CH, 8CH, 12CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-h6-ils/) |
| Chauvet DJ | SlimPAR Pro Q IP | par | 12 Zellen | 4CH, 5CH, 10CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-pro-q-ip/) |
| Chauvet DJ | SlimPAR Q12BT ILS | par | 12 Zellen | 4CH, 8CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-q12bt-ils/) |
| Chauvet DJ | SlimPAR T12 ILS | par | 12 Zellen | 3CH, 8CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-t12-ils/) |
| Chauvet DJ | SlimPAR T6BT ILS | par | 6 Zellen | 3CH, 7CH | ja | [Link](https://www.chauvetdj.com/products/slimpar-t6bt-ils/) |
| Chauvet DJ | EZLink Par Q4BT | par | 4 Zellen | 4CH, 8CH | ja | [Link](https://www.chauvetdj.com/products/ezlink-par-q4-bt/) |
| Chauvet DJ | Freedom Flex H4 IP | par | 4 Zellen | 6CH, 8CH, 12CH | ja | [Link](https://www.chauvetdj.com/products/freedom-flex-h4-ip/) |
| Chauvet DJ | SlimBANK Q18 ILS | bar | 3 Zellen | 4CH, 6CH, 10CH, 16CH | ja | [Link](https://www.chauvetdj.com/products/slimbank-q18-ils/) |
| Chauvet Professional | COLORado 2 Solo VW | par | 3 Zellen | 4CH, 7CH, 10CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/04/COLORado_2_Solo_VW_UM_Rev1.pdf) |
| Chauvet Professional | COLORado Panel Q40 | panel | 4 Zellen | 4CH, 7CH, 11CH, 16CH, 23CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2018/01/COLORado_Panel_Q40_DMX_Chart_Rev2.pdf) |
| Chauvet Professional | COLORdash PAR H12X IP | par | 12 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H12XIP_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | COLORdash PAR H18X | par | 18 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H18X_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | COLORdash PAR H7X | par | 7 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/11/COLORdash_Par-H7X_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | Maverick Force X Spot | movinghead / spot |  | 22CH, 29CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2025/07/Maverick_Force_X_Spot_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | Maverick Storm 1 Flex | movinghead / spot |  | 26CH, 33CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2025/03/Maverick_Storm_1_Flex_DMX_Chart_Rev2.pdf) |
| Chauvet Professional | Maverick Storm 1 Hybrid | movinghead / spot |  | 24CH, 29CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2023/04/Maverick_Storm_1_Hybrid_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | Maverick Storm 2 Profile | movinghead / profile |  | 32CH, 48CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/11/Maverick_Storm_2_Profile_DMX_Chart_Rev4.pdf) |
| Chauvet Professional | Maverick Storm 3 Profile | movinghead / profile |  | 34CH, 50CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2025/07/Maverick_Storm_3_Profile_DMX_Chart_Rev2.pdf) |
| Chauvet Professional | Maverick Storm 4 Profile | movinghead / profile |  | 38CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/11/Maverick_Storm_4_Profile_DMX_Chart_Rev3.pdf) |
| Chauvet Professional | Rogue Outcast 1 BeamWash | movinghead / wash |  | 15CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2021/06/Rogue_Outcast_1_Beam_Wash_DMX_Chart_Rev5.pdf) |
| Chauvet Professional | Rogue Outcast 1M Beam | movinghead / beam |  | 21CH, 25CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2024/06/Rogue_Outcast_1M_Beam_DMX_Chart_Rev1.pdf) |
| Chauvet Professional | Rogue Outcast 2 Beam | movinghead / beam |  | 16CH, 19CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2023/01/Rogue-Outcast-2-Beam_DMX-Chart_Rev2.pdf) |
| Chauvet Professional | Rogue Outcast 2 Hybrid | movinghead / spot |  | 20CH, 25CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2023/01/Rogue_Outcast_2_Hybrid_DMX_Chart_Rev2.pdf) |
| Chauvet Professional | Rogue Outcast 2X Wash | movinghead / wash | 19 Zellen | 17CH, 22CH, 23CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2022/08/Rogue_Outcast_2X_Wash_DMX_Chart_Rev3.pdf) |
| Chauvet Professional | Rogue Outcast 3 Spot | movinghead / spot |  | 20CH, 25CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2025/08/Rogue_Outcast_3_Spot_DMX_Chart_Rev2.pdf) |
| Chauvet Professional | Rogue R1 BeamWash | movinghead / wash | 7 Zellen | 14CH, 15CH, 19CH, 21CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2019/11/Rogue_R1_Beam_Wash_DMX_Charts_Rev3.pdf) |
| Chauvet Professional | Rogue R1E Spot | movinghead / spot |  | 16CH, 19CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2024/03/Rogue-R1E-Spot_DMX_Chart_Rev4.pdf) |
| Chauvet Professional | Rogue R2E Spot | movinghead / spot |  | 18CH, 21CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2024/01/Rogue-R2E-Spot_DMX_Chart_Rev3.pdf) |
| Chauvet Professional | Rogue R3 Beam | movinghead / beam |  | 16CH, 19CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2021/04/Rogue_R3_Beam_DMX_Chart_Rev3.pdf) |
| Chauvet Professional | STRIKE Array 2 | blinder | 2 Zellen | 1CH, 2CH, 9CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2021/02/STRIKE_Array_2_DMX_Chart_Rev5.pdf) |
| Chauvet Professional | STRIKE P38 | blinder | 1 Zellen | 1CH, 7CH | ja | [Link](https://chauvetprofessional.com/wp-content/uploads/2018/10/STRIKE_P38_DMX_Chart_Rev3.pdf) |
| Eurolite | LED TMH-S180 Moving-Head Spot | movinghead / spot |  | 13CH, 15CH | ja | [Link](https://www.steinigke.de/download/51786086-Anleitung-138075-1.0000-eurolite-led-tmh-s180-moving-head-spot-de_en.pdf) |
| Eurolite | LED TMH-S400 CMY Moving-Head Beam/Spot/Wash | movinghead / spot |  | 22CH, 25CH | ja | [Link](https://www.steinigke.de/download/51786089-Anleitung-170920-1.2000-eurolite-led-tmh-s400-cmy-moving-head-beam-spot-wash-de_en.pdf) |
| GLP | impression S500 Profile | movinghead / profile |  | 35CH Normal | ja | [Link](https://glp.de/files/products/impression-s500-profile-product-data/GLP_impression_S500_Profile_DMX_Channel_Index_EN_Rev20250116-02.pdf) |
| GLP | impression S500 Wash | movinghead / wash |  | 27CH Normal | ja | [Link](https://glp.de/files/products/impression-s500-wash-product-data/GLP_impression_S500_Wash_DMX_Channel_Index_EN_Rev20241209-02.pdf) |
| JB-Lighting | M18 Profile | movinghead / profile |  | 47CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/M18_DMX_Protocol.pdf) |
| JB-Lighting | P18 Wash | movinghead / wash |  | 36CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P18_Wash_MK2_DMX_Protocol.pdf) |
| JB-Lighting | P15 Profile | movinghead / profile |  | 44CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P15_DMX_Protocol.pdf) |
| JB-Lighting | P15 Wash | movinghead / wash |  | 35CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P15_Wash_DMX_Protocol.pdf) |
| JB-Lighting | P10 Profile | movinghead / profile |  | 40CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P10_DMX_Protocol.pdf) |
| JB-Lighting | P10 Wash | movinghead / wash |  | 37CH Mode 1 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P10_Wash_DMX_Protocol.pdf) |
| JB-Lighting | P9 Spot | movinghead / spot |  | 29CH Mode 1, 39CH Mode 2 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P9_DMX_Protocol.pdf) |
| JB-Lighting | P5 Beamspot | movinghead / spot |  | 25CH Mode 1, 32CH Mode 2 | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/P5_DMX_Protocol.pdf) |
| JB-Lighting | Sparx 9 | movinghead / wash | 7 Zellen | 32CH Mode 1, 21CH Mode 3, 49CH Mode 3 + Pixel | ja | [Link](https://www.jb-lighting.de/download/DMX-Protokolle/Sparx_9_DMX_Protocol.pdf) |
| Martin | MAC Ultra Wash | movinghead / wash |  | 23CH Compact | ja | [Link](https://www.martin.com/en/products/mac-ultra-wash) |
| Martin | RUSH MH 1 Profile Plus | movinghead / spot |  | 17CH | ja | [Link](https://www.martin.com/en/products/rush-mh-1-profile-plus) |
| Acme | AECO 15 | movinghead / profile |  | 22CH, 29CH, 31CH, 38CH | nein | [Link](https://en.acmelighting.com/item/AECO-15) |
| Acme | AECO 30 IP | movinghead / profile |  | 23CH, 32CH, 34CH, 43CH | nein | [Link](https://en.acmelighting.com/item/AECO-30-IP) |
| Acme | AECO 5 | movinghead / profile |  | 24CH, 28CH, 33CH | nein | [Link](https://en.acmelighting.com/item/AECO-5) |
| Acme | ARES IP | movinghead / beam |  | 24CH | nein | [Link](https://en.acmelighting.com/item/ARES-IP) |
| Acme | ARES | movinghead / beam |  | 17CH, 21CH | nein | [Link](https://en.acmelighting.com/item/ARES) |
| Acme | AUTOLUX | movinghead / wash |  | 25CH | nein | [Link](https://en.acmelighting.com/item/AUTOLUX) |
| Acme | BEAMONE PRO | movinghead / beam |  | 25CH | nein | [Link](https://en.acmelighting.com/item/BEAMONE-PRO) |
| Acme | BLINDER LINE 10 IP | blinder | 10 Zellen | 14CH, 55CH Pixel | nein | [Link](https://en.acmelighting.com/item/BLINDER-LINE-10-IP) |
| Acme | BLINDER LINE 5 IP | blinder | 5 Zellen | 14CH, 30CH Pixel | nein | [Link](https://en.acmelighting.com/item/BLINDER-LINE-5-IP) |
| Acme | COMET | follow |  | 7CH | nein | [Link](https://en.acmelighting.com/item/COMET) |
| Acme | COOLIE 186 | par | 18 Zellen | 4CH, 5CH, 8CH, 10CH | nein | [Link](https://en.acmelighting.com/item/COOLIE-186) |
| Acme | CYCLONE | effect |  | 27CH, 50CH, 58CH | nein | [Link](https://en.acmelighting.com/item/CYCLONE) |
| Acme | ELLIPSOIDAL 300 WW | profile |  | 1CH, 2CH | nein | [Link](https://en.acmelighting.com/item/ELLIPSOIDAL-300-WW) |
| Acme | ELLIPSOIDAL 40 DMX WW | profile |  | 1CH, 2CH | nein | [Link](https://en.acmelighting.com/item/ELLIPSOIDAL-40-DMX-WW) |
| Acme | GEIST BSWF | movinghead / profile |  | 25CH, 29CH, 34CH | nein | [Link](https://en.acmelighting.com/item/GEIST-BSWF) |
| Acme | GEMINI | tiltbar | 5 Zellen | 23CH Pixel, 25CH Pixel, 27CH Pixel, 35CH Pixel, 55CH Pixel, 58CH Pixel, 70CH Pixel | nein | [Link](https://en.acmelighting.com/item/GEMINI) |
| Acme | HUE 6 IP | movinghead / profile |  | 43CH, 45CH, 46CH, 50CH | nein | [Link](https://en.acmelighting.com/item/HUE-6-IP) |
| Acme | HUELINE 16 IP | bar | 16 Zellen | 16CH, 18CH, 133CH, 136CH | nein | [Link](https://en.acmelighting.com/item/HUELINE-16-IP) |
| Acme | HYPERZONE | movinghead / wash | 7 Zellen | 19CH, 20CH, 21CH, 41CH Pixel, 42CH Pixel, 43CH Pixel | nein | [Link](https://en.acmelighting.com/item/HYPERZONE) |
| Acme | LIGHTNING X | strobe | 30 Zellen | 31CH, 43CH, 100CH Pixel, 230CH Pixel | nein | [Link](https://en.acmelighting.com/item/LIGHTNING-X) |
| Acme | LIGHTNING | strobe | 30 Zellen | 10CH, 17CH, 21CH, 24CH, 26CH, 36CH, 41CH, 61CH, 150CH Pixel, 158CH Pixel | nein | [Link](https://en.acmelighting.com/item/LIGHTNING) |
| Acme | LINEFORCE 10 IP | bar | 10 Zellen | 10CH, 12CH, 16CH, 18CH, 19CH, 21CH, 79CH, 82CH | nein | [Link](https://en.acmelighting.com/item/LINEFORCE-10-IP) |
| Acme | LINEFORCE 5 IP | bar | 5 Zellen | 10CH, 12CH, 16CH, 18CH, 19CH, 21CH, 44CH Pixel, 47CH Pixel | nein | [Link](https://en.acmelighting.com/item/LINEFORCE-5-IP) |
| Acme | LYRA BW | movinghead / beam |  | 18CH, 30CH | nein | [Link](https://en.acmelighting.com/item/LYRA-BW) |
| Acme | MANA HYBRID | movinghead / spot |  | 24CH, 30CH | nein | [Link](https://en.acmelighting.com/item/MANA-HYBRID) |
| Acme | MANA PROFILE | movinghead / profile |  | 22CH, 30CH, 31CH, 40CH | nein | [Link](https://en.acmelighting.com/item/MANA-PROFILE) |
| Acme | NEOZONE | movinghead / wash | 19 Zellen | 10CH, 17CH, 21CH, 86CH Pixel | nein | [Link](https://en.acmelighting.com/item/NEOZONE) |
| Acme | NOVA BEAM | movinghead / beam |  | 18CH | nein | [Link](https://en.acmelighting.com/item/NOVA-BEAM) |
| Acme | PASODOBLE | par | 12 Zellen | 4CH, 5CH, 8CH, 10CH | nein | [Link](https://en.acmelighting.com/item/PASODOBLE) |
| Acme | PHOTON HYBRID 500 | movinghead / spot |  | 28CH, 31CH | nein | [Link](https://en.acmelighting.com/item/PHOTON-HYBRID-500) |
| Acme | PIXEL LINE IP 500 | strobe | 16 Zellen | 8CH, 10CH, 16CH, 18CH, 22CH, 26CH, 34CH, 37CH, 38CH, 39CH, 56CH Pixel, 62CH Pixel, 63CH Pixel, 68CH Pixel, 69CH Pixel | nein | [Link](https://en.acmelighting.com/item/PIXEL-LINE-IP-500) |
| Acme | PIXEL LINE SLIM 500 | bar | 24 Zellen | 14CH, 19CH, 24CH, 29CH, 39CH, 49CH, 69CH, 124CH, 129CH | nein | [Link](https://en.acmelighting.com/item/PIXEL-LINE-SLIM-500) |
| Acme | PIXEL LINE SLIM | bar | 48 Zellen | 14CH, 19CH, 24CH, 29CH, 39CH, 49CH, 69CH, 89CH, 129CH, 244CH, 249CH | nein | [Link](https://en.acmelighting.com/item/PIXEL-LINE-SLIM) |
| Acme | PULSAR PLUS S2 | effect | 4 Zellen | 43CH, 153CH, 163CH, 195CH | nein | [Link](https://en.acmelighting.com/item/PULSAR-PLUS-S2) |
| Acme | PULSAR S2 | effect | 4 Zellen | 21CH, 24CH, 39CH, 97CH | nein | [Link](https://en.acmelighting.com/item/PULSAR-S2) |
| Acme | SAGITTA IP | movinghead / beam |  | 16CH, 19CH, 20CH | nein | [Link](https://en.acmelighting.com/item/SAGITTA-IP) |
| Acme | SANA BEAM | movinghead / beam |  | 16CH, 27CH, 29CH | nein | [Link](https://en.acmelighting.com/item/SANA-BEAM) |
| Acme | SANA PROFILE | movinghead / profile |  | 27CH, 36CH, 45CH | nein | [Link](https://en.acmelighting.com/item/SANA-PROFILE) |
| Acme | SANDANE FROST | par | 55 Zellen | 6CH, 7CH, 8CH, 9CH, 11CH | nein | [Link](https://en.acmelighting.com/item/SANDANE-FROST) |
| Acme | SKYTRK | movinghead / beam |  | 23CH | nein | [Link](https://en.acmelighting.com/item/SKYTRK) |
| Acme | SOLAR WIND | movinghead / spot |  | 24CH, 30CH | nein | [Link](https://en.acmelighting.com/item/SOLAR-WIND) |
| Acme | STAGE PAR 100 COLOUR IP | par |  | 4CH, 6CH, 7CH, 8CH | nein | [Link](https://en.acmelighting.com/item/STAGE-PAR-100-COLOUR-IP) |
| Acme | STAGE PAR 100 IP CW | par |  | 1CH, 2CH, 3CH | nein | [Link](https://en.acmelighting.com/item/STAGE-PAR-100-IP-CW) |
| Acme | STAGE PAR 100 IP WW | par |  | 1CH, 2CH, 3CH | nein | [Link](https://en.acmelighting.com/item/STAGE-PAR-100-IP-WW) |
| Acme | STAGE PAR 400 ZOOM IP | par | 7 Zellen | 5CH, 9CH | nein | [Link](https://en.acmelighting.com/item/STAGE-PAR-400-ZOOM-IP) |
| Acme | SUPERNOVA LT | movinghead / profile |  | 23CH, 32CH, 35CH, 44CH | nein | [Link](https://en.acmelighting.com/item/SUPERNOVA-LT) |
| Acme | SUPERNOVA | movinghead / profile |  | 23CH, 32CH, 34CH, 43CH | nein | [Link](https://en.acmelighting.com/item/SUPERNOVA) |
| Acme | TANGO | par | 7 Zellen | 4CH, 5CH, 8CH, 10CH | nein | [Link](https://en.acmelighting.com/item/TANGO) |
| Acme | THEATRE SPOT 300 WW | fresnel |  | 2CH, 3CH | nein | [Link](https://en.acmelighting.com/item/THEATRE-SPOT-300-WW) |
| Acme | THEATRE SPOT 500 CW | fresnel |  | 4CH, 6CH | nein | [Link](https://en.acmelighting.com/item/THEATRE-SPOT-500-CW) |
| Acme | THEATRE SPOT 500 RGBWW | fresnel |  | 10CH, 12CH | nein | [Link](https://en.acmelighting.com/item/THEATRE-SPOT-500-RGBWW) |
| Acme | THEATRE SPOT 500 WW | fresnel |  | 4CH, 6CH | nein | [Link](https://en.acmelighting.com/item/THEATRE-SPOT-500-WW) |
| Acme | THETA | effect |  | 19CH, 27CH, 29CH, 139CH, 141CH | nein | [Link](https://en.acmelighting.com/item/THETA) |
| Acme | THUNDER IP | blinder | 3 Zellen | 4CH, 8CH, 9CH, 16CH Pixel | nein | [Link](https://en.acmelighting.com/item/THUNDER-IP) |
| Acme | THUNDERBOLT | strobe | 12 Zellen | 4CH, 8CH, 9CH, 52CH Pixel | nein | [Link](https://en.acmelighting.com/item/THUNDERBOLT) |
| Acme | TORNADO | multibar | 125 Zellen | 41CH, 71CH, 75CH, 85CH, 170CH | nein | [Link](https://en.acmelighting.com/item/TORNADO) |
| Acme | TV LIGHT PANEL 1000 WW | panel |  | 1CH, 2CH, 3CH | nein | [Link](https://en.acmelighting.com/item/TV-LIGHT-PANEL-1000-WW) |
| Acme | TV LIGHT PANEL 3000 | panel | 64 Zellen | 10CH, 28CH | nein | [Link](https://en.acmelighting.com/item/TV-LIGHT-PANEL-3000) |
| Acme | ULTRA BLINDER IP | blinder | 2 Zellen | 1CH, 2CH, 4CH, 6CH, 7CH, 9CH Pixel, 10CH Pixel, 11CH Pixel, 14CH Pixel, 16CH Pixel | nein | [Link](https://en.acmelighting.com/item/ULTRA-BLINDER-IP) |
| Acme | ULTRA PAR IP | par |  | 1CH, 2CH, 4CH, 6CH, 7CH, 9CH, 11CH | nein | [Link](https://en.acmelighting.com/item/ULTRA-PAR-IP) |
| Acme | VOLTKA | strobe | 50 Zellen | 5CH, 12CH, 35CH, 150CH Pixel | nein | [Link](https://en.acmelighting.com/item/VOLTKA) |
| Acme | WILLOW 200 | movinghead / spot |  | 17CH | nein | [Link](https://en.acmelighting.com/item/WILLOW-200) |
| Acme | WILLOW 500 | movinghead / spot |  | 18CH | nein | [Link](https://en.acmelighting.com/item/WILLOW-500) |
| Acme | ZEUS | movinghead / spot |  | 20CH, 28CH | nein | [Link](https://en.acmelighting.com/item/ZEUS) |
| Acme | SABER BEAM FX | movinghead / beam |  | 14CH, 17CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=120) |
| Acme | SOLAR FLARE | movinghead / profile |  | 20CH, 25CH, 29CH, 34CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=1809) |
| Acme | SPARTAN HYBRID C | movinghead / spot |  | 20CH, 21CH, 24CH, 28CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=1826) |
| Acme | RAYZOR HYBRID | movinghead / spot |  | 17CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=1829) |
| Acme | SABER PERFORMANCE II | movinghead / beam |  | 15CH, 17CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=1830) |
| Acme | COLOR BAR 16FC | bar | 16 Zellen | 1CH, 3CH, 4CH, 7CH, 8CH, 32CH, 67CH Pixel | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1841) |
| Acme | COLOR PAR 54 | par | 54 Zellen | 3CH, 5CH, 6CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1844) |
| Acme | COLOR PAR 36 | par | 36 Zellen | 3CH, 5CH, 6CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1845) |
| Acme | GLAMOUR 350Z III | movinghead / wash | 7 Zellen | 11CH, 14CH, 15CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1846) |
| Acme | ELLIPSOIDAL | profile |  | 1CH, 2CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=1852) |
| Acme | THEATRE LED COLOUR FLOOD | panel |  | 4CH, 9CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=1853) |
| Acme | SAPPHIRE | laser |  | 17CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1854) |
| Acme | LP-324ADB CW/WW/VW | panel |  | 1CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=1855) |
| Acme | THEATRE LED FLOOD CW | panel |  | 2CH, 3CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=1856) |
| Acme | INFINITY MATRIX | strobe | 1 Zellen | 3CH, 4CH, 36CH, 40CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=1865) |
| Acme | GLORY WASH 1000 | movinghead / wash |  | 16CH, 21CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=1866) |
| Acme | WHACK BEAM SPOT | movinghead / spot |  | 15CH, 21CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=20) |
| Acme | ULTRA STROBE | strobe |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=2086) |
| Acme | THEATRE SPOT 100 CW | fresnel |  | 2CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=2163) |
| Acme | STAGE PAR 300 ZOOM II | par | 19 Zellen | 5CH, 6CH, 8CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=2165) |
| Acme | SABER | movinghead / beam |  | 16CH, 19CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=2166) |
| Acme | GLAMOUR 700Z RGBY | movinghead / wash | 19 Zellen | 14CH, 16CH, 26CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=2177) |
| Acme | SABER BEAM SPOT | movinghead / spot |  | 17CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=2178) |
| Acme | COOLIE 545 | par | 54 Zellen | 4CH, 5CH, 7CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=2180) |
| Acme | SOLAR IMPULSE | movinghead / profile |  | 29CH, 34CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=2637) |
| Acme | CHIRON | movinghead / beam |  | 14CH, 17CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=3087) |
| Acme | THEATRE LED FLOOD WW | panel |  | 2CH, 3CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=3120) |
| Acme | PAGEANT 300ZR II | movinghead / wash | 19 Zellen | 14CH, 26CH, 30CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=3213) |
| Acme | SUPER GEIST FRAMING | movinghead / profile |  | 30CH, 32CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=334) |
| Acme | ENERGY SPOT | movinghead / spot |  | 19CH, 22CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=335) |
| Acme | SOLARIS | effect | 36 Zellen | 21CH, 166CH, 206CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=336) |
| Acme | INFINITY MATRIX HEX | strobe | 1 Zellen | 3CH, 4CH, 36CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=340) |
| Acme | LASER BAR RGB | laser |  | 5CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=345) |
| Acme | DIAMONDS | laser |  | 17CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=346) |
| Acme | SABER MINI | movinghead / beam |  | 12CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=357) |
| Acme | LED-BR30 | effect | 4 Zellen | 9CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=358) |
| Acme | PAGEANT 600Z II | movinghead / wash | 37 Zellen | 14CH, 26CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=3632) |
| Acme | GLAMOUR 700Z | movinghead / wash | 19 Zellen | 15CH, 17CH, 27CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=3639) |
| Acme | WHACK 231 | movinghead / beam |  | 15CH, 16CH, 19CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=370) |
| Acme | WHACK | movinghead / beam |  | 15CH, 16CH, 19CH, 20CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=372) |
| Acme | SPARTAN HYBRID | movinghead / spot |  | 24CH, 27CH, 30CH, 34CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=373) |
| Acme | GLORY PROFILE T | movinghead / profile |  | 21CH, 24CH, 26CH, 28CH, 34CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=378) |
| Acme | GEIST SPOT | movinghead / spot |  | 20CH, 22CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=385) |
| Acme | GEIST FRAMING | movinghead / profile |  | 29CH, 31CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=386) |
| Acme | CETUS | movinghead / beam |  | 16CH, 18CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=3867) |
| Acme | ENERGY HYBRID | movinghead / spot |  | 16CH, 19CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=387) |
| Acme | STAGE PAR 600 ZOOM IP | par | 22 Zellen | 5CH, 7CH, 9CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=3875) |
| Acme | TOUR PIXEL BAR 1010 II | bar | 10 Zellen | 4CH, 5CH, 7CH, 40CH Pixel | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=3884) |
| Acme | COOLIE 14FC | par | 14 Zellen | 4CH, 5CH, 7CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=3888) |
| Acme | FARANDOLE | bar | 18 Zellen | 6CH, 9CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=3957) |
| Acme | GLAMOUR 350Z | movinghead / wash | 7 Zellen | 11CH, 15CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=4649) |
| Acme | 10W LED COLOR SPOT | fresnel |  | 3CH, 4CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=4650) |
| Acme | LED WAVE 100 | panel |  | 3CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=4651) |
| Acme | ASTRO DMX RGBW | par |  | 3CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=4652) |
| Acme | PAGEANT 300 | movinghead / wash | 19 Zellen | 14CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=4662) |
| Acme | THEATRE SPOT 100 WW | fresnel |  | 2CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=5278) |
| Acme | DAVY | fresnel |  | 1CH, 2CH, 3CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=263&id=5415) |
| Acme | THUNDER ROAR | blinder | 1 Zellen | 5CH, 8CH, 9CH, 10CH, 68CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=5435) |
| Acme | AECO 10 | movinghead / profile |  | 20CH, 26CH, 29CH, 35CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=5558) |
| Acme | AECO 8 | movinghead / profile |  | 28CH, 33CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=196&id=5786) |
| Acme | STAGE PAR ZOOM COLOUR | par |  | 13CH, 19CH, 42CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=5857) |
| Acme | SANDANE | par | 54 Zellen | 4CH, 5CH, 6CH, 8CH, 10CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=5871) |
| Acme | PIXEL 100/PIXEL POWER 8 | effect |  | 19CH, 103CH, 152CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=195&id=5890) |
| Acme | ANDROMEDA | movinghead / spot |  | 19CH, 26CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=5991) |
| Acme | HYGIEA | movinghead / beam |  | 12CH, 14CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=6007) |
| Acme | DOTUS | movinghead / beam |  | 7CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=263&id=6012) |
| Acme | AQUARIUS | movinghead / beam |  | 13CH, 18CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=6025) |
| Acme | SHAKAN | movinghead / beam |  | 12CH, 15CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=193&id=6552) |
| Acme | BONZAI 200 | movinghead / beam |  | 18CH | nein | [Link](https://en.acmelighting.com/cms/old/productdetailold?cat_id=194&id=9461) |
| ADB | Actoris Fresnel | fresnel |  | 1CH, 9CH, 17CH, 33CH | nein | [Link](https://www.claypaky.it/products/actoris-fresnel/) |
| ADB | Actoris ParLED | par |  | 16CH, 17CH | nein | [Link](https://www.claypaky.it/products/actoris-parled/) |
| ADB | Orkis Fresnel | fresnel |  | 15CH, 28CH | nein | [Link](https://www.claypaky.it/products/orkis-fresnel/) |
| ADB | Orkis Cyc | panel |  | 14CH, 27CH | nein | [Link](https://www.claypaky.it/products/orkis-cyc/) |
| ADB | Klemantis 1000 HCR | panel |  | 14CH, 27CH, 29CH | nein | [Link](https://www.claypaky.it/products/klemantis-1000/) |
| ADJ | 12PX HEX | par | 12 Zellen | 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/12px-hex) |
| ADJ | 15 HEX BAR IP | bar | 15 Zellen | 15CH | nein | [Link](https://www.adj.com/products/15-hex-bar-ip) |
| ADJ | 32 HEX Panel IP | bar | 32 Zellen | 32CH | nein | [Link](https://www.adj.com/products/32-hex-panel-ip) |
| ADJ | COB Cannon LP200STX | cob |  | 5CH, 8CH, 9CH, 10CH, 12CH, 13CH, 16CH, 20CH | nein | [Link](https://www.adj.com/products/cob-cannon-lp200stx) |
| ADJ | COB Cannon LP200X | cob |  | 5CH, 8CH, 9CH, 10CH, 12CH, 13CH, 16CH, 20CH | nein | [Link](https://www.adj.com/products/cob-cannon-lp200x) |
| ADJ | Dotz Par 100 | cob |  | 3CH, 4CH, 5CH, 9CH | nein | [Link](https://www.adj.com/products/dotz-par-100) |
| ADJ | ElectraPix Bar 16 | bar | 1 Zellen | 5CH, 6CH, 7CH, 9CH, 12CH, 13CH, 22CH, 24CH, 96CH, 99CH, 114CH | nein | [Link](https://www.adj.com/products/electrapix-bar-16) |
| ADJ | ElectraPix Bar 8 | bar | 1 Zellen | 5CH, 6CH, 7CH, 9CH, 12CH, 13CH, 22CH, 24CH, 48CH, 52CH, 66CH | nein | [Link](https://www.adj.com/products/electrapix-bar-8) |
| ADJ | ElectraPix Par 7 | par |  | 5CH, 6CH, 7CH, 9CH, 12CH, 13CH, 22CH, 24CH, 42CH, 45CH, 60CH | nein | [Link](https://www.adj.com/products/electrapix-par-7) |
| ADJ | Encore FR Pro Color | fresnel |  | 3CH, 4CH, 7CH, 10CH, 13CH, 14CH, 17CH, 19CH | nein | [Link](https://www.adj.com/products/encore-fr-pro-color) |
| ADJ | Encore LB15IP | par | 15 Zellen | 4CH, 7CH, 8CH, 13CH, 16CH, 60CH Pixel, 63CH Pixel, 69CH Pixel, 72CH Pixel, 120CH Pixel | nein | [Link](https://www.adj.com/products/encore-lb15ip) |
| ADJ | Encore LP12IP | par | 12 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH, 16CH | nein | [Link](https://www.adj.com/products/encore-lp12ip) |
| ADJ | Encore LP18IP | par | 18 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH, 16CH | nein | [Link](https://www.adj.com/products/encore-lp18ip) |
| ADJ | Encore LP5IP | par | 5 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH, 16CH Pixel | nein | [Link](https://www.adj.com/products/encore-lp5ip) |
| ADJ | Encore LP7IP | par | 7 Zellen | 4CH, 8CH, 10CH, 13CH, 16CH | nein | [Link](https://www.adj.com/products/encore-lp7ip) |
| ADJ | Encore Profile 1000 Color | profile |  | 4CH, 5CH, 6CH, 10CH, 11CH | nein | [Link](https://www.adj.com/products/encore-profile-1000-color) |
| ADJ | Encore Profile Mini Color | profile |  | 2CH, 4CH, 5CH, 6CH, 13CH, 14CH, 16CH | nein | [Link](https://www.adj.com/products/encore-profile-mini-color) |
| ADJ | Encore Profile Mini WW | profile |  | 2CH, 3CH, 6CH | nein | [Link](https://www.adj.com/products/encore-profile-mini-ww) |
| ADJ | Encore Profile Pro Color | profile |  | 2CH, 4CH, 6CH, 13CH, 14CH, 16CH | nein | [Link](https://www.adj.com/products/encore-profile-pro-color) |
| ADJ | Encore Profile Pro WW | profile |  | 2CH, 3CH, 6CH | nein | [Link](https://www.adj.com/products/encore-profile-pro-ww) |
| ADJ | Encore Z7LP | par | 7 Zellen | 6CH, 9CH, 10CH, 12CH, 15CH, 18CH | nein | [Link](https://www.adj.com/products/encore-z7lp) |
| ADJ | Focus Beam LED | movinghead / beam |  | 16CH, 18CH | nein | [Link](https://www.adj.com/products/focus-beam-led) |
| ADJ | Focus CMY Compact | movinghead / spot |  | 26CH, 31CH, 40CH | nein | [Link](https://www.adj.com/products/focus-cmy-compact) |
| ADJ | Focus Flex L19 | movinghead / wash | 19 Zellen | 22CH, 31CH, 34CH, 40CH, 104CH | nein | [Link](https://www.adj.com/products/focus-flex-l19) |
| ADJ | Focus Flex L7 | movinghead / wash | 7 Zellen | 16CH, 25CH, 28CH Pixel, 34CH Pixel, 42CH Pixel, 50CH Pixel | nein | [Link](https://www.adj.com/products/focus-flex-l7) |
| ADJ | Focus Hybrid | movinghead / spot |  | 19CH, 23CH, 25CH | nein | [Link](https://www.adj.com/products/focus-hybrid) |
| ADJ | Focus Profile | movinghead / profile |  | 36CH, 40CH, 51CH | nein | [Link](https://www.adj.com/products/focus-profile) |
| ADJ | Focus Spot 4Z Pearl | movinghead / spot |  | 16CH, 18CH, 22CH | nein | [Link](https://www.adj.com/products/focus-spot-4z-pearl) |
| ADJ | Focus Spot 6Z | movinghead / spot |  | 21CH, 25CH, 29CH | nein | [Link](https://www.adj.com/products/focus-spot-6z) |
| ADJ | Focus Spot 7Z | movinghead / spot |  | 30CH, 34CH, 45CH | nein | [Link](https://www.adj.com/products/focus-spot-7z) |
| ADJ | Focus Wash 400 | movinghead / wash |  | 17CH, 18CH, 22CH, 24CH | nein | [Link](https://www.adj.com/products/focus-wash-400) |
| ADJ | H2O Two | effect |  | 4CH, 9CH | nein | [Link](https://www.adj.com/products/h2o-two) |
| ADJ | Hydro Beam CMY | movinghead / beam |  | 20CH, 24CH | nein | [Link](https://www.adj.com/products/hydro-beam-cmy) |
| ADJ | Hydro Beam X1 | movinghead / beam |  | 11CH, 14CH | nein | [Link](https://www.adj.com/products/hydro-beam-x1) |
| ADJ | Hydro Flex L19 | movinghead / wash | 19 Zellen | 22CH, 31CH, 34CH, 40CH, 104CH | nein | [Link](https://www.adj.com/products/hydro-flex-l19) |
| ADJ | Hydro Flex L7 | movinghead / wash | 7 Zellen | 16CH, 25CH, 26CH, 28CH Pixel, 34CH Pixel, 42CH Pixel, 50CH Pixel | nein | [Link](https://www.adj.com/products/hydro-flex-l7) |
| ADJ | Hydro Hybrid | movinghead / spot |  | 24CH, 27CH, 32CH | nein | [Link](https://www.adj.com/products/hydro-hybrid) |
| ADJ | Hydro Profile | movinghead / profile |  | 36CH, 50CH, 57CH | nein | [Link](https://www.adj.com/products/hydro-profile) |
| ADJ | Hydro Spot 1 | movinghead / spot |  | 17CH, 20CH, 22CH | nein | [Link](https://www.adj.com/products/hydro-spot-1) |
| ADJ | Hydro Spot 2 | movinghead / spot |  | 24CH, 29CH, 36CH | nein | [Link](https://www.adj.com/products/hydro-spot-2) |
| ADJ | Jolt MFX 360 | tiltbar | 1 Zellen | 16CH, 31CH, 36CH, 42CH, 79CH, 96CH, 99CH, 105CH, 203CH, 220CH, 223CH, 229CH | nein | [Link](https://www.adj.com/products/jolt-mfx-360) |
| ADJ | LED Pixel 10C | tube | 1 Zellen | 5CH, 7CH, 10CH, 32CH | nein | [Link](https://www.adj.com/products/led-pixel-10c) |
| ADJ | LED Pixel 4C | tube | 1 Zellen | 4CH, 5CH, 7CH, 14CH, 192CH | nein | [Link](https://www.adj.com/products/led-pixel-4c) |
| ADJ | LED Pixel Tube 360 Sys 10 | tube | 1 Zellen | 1CH, 10CH | nein | [Link](https://www.adj.com/products/led-pixel-tube-360-sys-10) |
| ADJ | Mirage Par H IP | par |  | 5CH, 6CH, 9CH, 15CH, 17CH | nein | [Link](https://www.adj.com/products/mirage-par-h-ip) |
| ADJ | MOD STQ | par | 7 Zellen | 4CH, 5CH, 8CH, 9CH, 12CH, 13CH, 15CH | nein | [Link](https://www.adj.com/products/mod-stq) |
| ADJ | Par Z100 3K2 | cob |  | 1CH, 3CH, 4CH | nein | [Link](https://www.adj.com/products/par-z100-3k2) |
| ADJ | Par Z100 5K2 | cob |  | 1CH, 3CH, 4CH | nein | [Link](https://www.adj.com/products/par-z100-5k2) |
| ADJ | Par Z150 RGBA | cob |  | 4CH, 5CH, 6CH, 7CH, 8CH, 9CH, 10CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/par-z150-rgba) |
| ADJ | Par Z150 RGBA Plus | par |  | 4CH, 5CH, 9CH, 13CH, 15CH | nein | [Link](https://www.adj.com/products/par-z150-rgba-plus) |
| ADJ | Par Z300 3K | par |  | 1CH, 3CH, 4CH | nein | [Link](https://www.adj.com/products/par-z300-3k) |
| ADJ | Par Z300 6K | cob |  | 1CH, 3CH, 4CH | nein | [Link](https://www.adj.com/products/par-z300-6k) |
| ADJ | Par Z300 RGBA | cob |  | 4CH, 5CH, 9CH, 13CH, 15CH | nein | [Link](https://www.adj.com/products/par-z300-rgba) |
| ADJ | Protégé XM | movinghead / spot |  | 29CH | nein | [Link](https://www.adj.com/products/protege-xm) |
| ADJ | Saber Spot DTW | par |  | 1CH, 2CH, 4CH | nein | [Link](https://www.adj.com/products/saber-spot-dtw) |
| ADJ | Saber Spot RGBL | par |  | 3CH, 4CH, 5CH, 6CH, 7CH, 8CH, 10CH, 12CH, 13CH | nein | [Link](https://www.adj.com/products/saber-spot-rgbl) |
| ADJ | Saber Spot UV | par |  | 1CH, 2CH | nein | [Link](https://www.adj.com/products/saber-spot-uv) |
| ADJ | Saber Spot WW | par |  | 1CH, 2CH | nein | [Link](https://www.adj.com/products/saber-spot-ww) |
| ADJ | UBL12H | bar | 1 Zellen | 2CH, 6CH, 11CH, 13CH, 16CH, 36CH, 43CH, 46CH | nein | [Link](https://www.adj.com/products/ubl12h) |
| ADJ | UBL12HB | bar | 1 Zellen | 2CH, 6CH, 11CH, 13CH, 16CH, 36CH, 43CH, 46CH | nein | [Link](https://www.adj.com/products/ubl12hb) |
| ADJ | UBL6H | bar | 1 Zellen | 2CH, 3CH, 6CH, 11CH, 13CH, 16CH, 18CH, 25CH, 28CH | nein | [Link](https://www.adj.com/products/ubl6h) |
| ADJ | UBL9H | par |  | 3CH, 6CH, 11CH, 13CH, 16CH, 18CH, 25CH, 28CH | nein | [Link](https://www.adj.com/products/ubl9h) |
| ADJ | Ultra Beam Bar 12CW | bar | 1 Zellen | 1CH, 3CH, 12CH, 14CH, 19CH | nein | [Link](https://www.adj.com/products/ultra-beam-bar-12cw) |
| ADJ | UV Flood 36 | panel | 12 Zellen | 1CH, 2CH, 3CH | nein | [Link](https://www.adj.com/products/uv-flood-36) |
| ADJ | UV LED BAR20 IR | bar | 20 Zellen | 1CH, 2CH, 3CH | nein | [Link](https://www.adj.com/products/uv-led-bar20-ir) |
| ADJ | UV Par 100IP | par |  | 1CH, 2CH, 3CH, 4CH, 6CH | nein | [Link](https://www.adj.com/products/uv-par-100ip) |
| ADJ | Vintage Bar | par |  | 5CH, 6CH, 8CH, 14CH, 17CH, 18CH, 84CH, 88CH, 90CH, 97CH | nein | [Link](https://www.adj.com/products/vintage-bar) |
| ADJ | Vintage X | par |  | 10CH, 16CH, 25CH, 42CH, 47CH, 196CH, 203CH, 210CH, 214CH, 218CH | nein | [Link](https://www.adj.com/products/vintage-x) |
| ADJ | Vizi Beam CMY | movinghead / beam |  | 20CH, 24CH | nein | [Link](https://www.adj.com/products/vizi-beam-cmy) |
| ADJ | Vizi Beam RX2 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.adj.com/products/vizi-beam-rx2) |
| ADJ | Vizi FX7 | movinghead / beam |  | 31CH, 55CH, 57CH, 60CH, 237CH | nein | [Link](https://www.adj.com/products/vizi-fx7) |
| ADJ | Vizi Pix Z19 | movinghead / wash |  | 30CH, 32CH, 40CH, 43CH, 58CH, 123CH, 133CH, 203CH | nein | [Link](https://www.adj.com/products/vizi-pix-z19) |
| ADJ | VIZI XTREME | movinghead / beam |  | 28CH, 40CH, 54CH, 63CH, 73CH | nein | [Link](https://www.adj.com/products/vizi-xtreme) |
| ADJ | WMX WING | strobe | 1 Zellen | 4CH, 96CH | nein | [Link](https://www.adj.com/products/wmx-wing) |
| ADJ | 12P HEX | par | 12 Zellen | 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/12p-hex) |
| ADJ | 12PX HEX PEARL | par | 12 Zellen | 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/12px-hex-pearl) |
| ADJ | 32 HEX Panel IP Pearl | panel | 32 Zellen | 32CH | nein | [Link](https://www.adj.com/products/32-hex-panel-ip-pearl) |
| ADJ | 5P Hex Pearl | par | 5 Zellen | 6CH, 7CH, 8CH, 12CH | nein | [Link](https://www.adj.com/products/5p-hex-pearl) |
| ADJ | 5PX HEX Pearl | par | 5 Zellen | 6CH, 7CH, 8CH, 12CH | nein | [Link](https://www.adj.com/products/5px-hex-pearl) |
| ADJ | Accu Spot 250 | movinghead / spot |  | 8CH | nein | [Link](https://www.adj.com/products/accu-spot-250) |
| ADJ | Accu Spot 250 Hybrid | movinghead / spot |  | 11CH | nein | [Link](https://www.adj.com/products/accu-spot-250-hybrid) |
| ADJ | Accu Spot 300 | par |  | 11CH | nein | [Link](https://www.adj.com/products/accu-spot-300) |
| ADJ | Accu Spot 575 | par |  | 16CH | nein | [Link](https://www.adj.com/products/accu-spot-575) |
| ADJ | Accu Wash 250 | movinghead / wash |  | 7CH | nein | [Link](https://www.adj.com/products/accu-wash-250) |
| ADJ | Boom Box FX1 | derby | 6 Zellen | 3CH, 22CH | nein | [Link](https://www.adj.com/products/boom-box-fx1) |
| ADJ | COB Cannon Wash ST DW | panel | 2 Zellen | 1CH, 2CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/cob-cannon-wash-st-dw) |
| ADJ | Crazy 8 | movinghead / spot |  | 9CH, 12CH, 15CH, 21CH | nein | [Link](https://www.adj.com/products/crazy-8) |
| ADJ | Deco 250 | effect |  | 2CH | nein | [Link](https://www.adj.com/products/deco-250) |
| ADJ | DJ Spot LED | movinghead / spot |  | 8CH | nein | [Link](https://www.adj.com/products/dj-spot-led) |
| ADJ | Dotz Brick 3.3 | strobe | 1 Zellen | 3CH, 6CH, 8CH, 27CH, 32CH | nein | [Link](https://www.adj.com/products/dotz-brick-3-3) |
| ADJ | Electro Strip | bar | 1 Zellen | 4CH | nein | [Link](https://www.adj.com/products/electro-strip) |
| ADJ | Element Hex | par |  | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/element-hex) |
| ADJ | Element Hex IP Chrome | par |  | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/element-hex-ip-chrome) |
| ADJ | Element HEXIP | par |  | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/element-hexip) |
| ADJ | Element HEXIP Pearl | par |  | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/element-hexip-pearl) |
| ADJ | Element QA | par |  | 4CH, 5CH, 6CH, 9CH, 10CH | nein | [Link](https://www.adj.com/products/element-qa) |
| ADJ | Element QAIP | par |  | 4CH, 5CH, 6CH, 9CH, 10CH | nein | [Link](https://www.adj.com/products/element-qaip) |
| ADJ | Element ST HEX | par |  | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/element-st-hex) |
| ADJ | Encore 2000 | effect |  | 2CH, 3CH | nein | [Link](https://www.adj.com/products/encore-2000) |
| ADJ | Encore Burst 100 IP | blinder | 1 Zellen | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.adj.com/products/encore-burst-100-ip) |
| ADJ | Encore Burst 200 | strobe | 2 Zellen | 6CH Pixel | nein | [Link](https://www.adj.com/products/encore-burst-200) |
| ADJ | Encore Burst UV IP | par |  | 1CH, 2CH, 3CH, 4CH, 6CH | nein | [Link](https://www.adj.com/products/encore-burst-uv-ip) |
| ADJ | Event Bar DMX | bar | 4 Zellen | 1CH, 17CH Pixel | nein | [Link](https://www.adj.com/products/event-bar-dmx) |
| ADJ | FLAT PAR CWWW18 | par | 18 Zellen | 3CH, 4CH, 5CH | nein | [Link](https://www.adj.com/products/flat-par-cwww18) |
| ADJ | FLAT PAR CWWW9 | par | 9 Zellen | 3CH, 4CH, 5CH | nein | [Link](https://www.adj.com/products/flat-par-cwww9) |
| ADJ | Flat Par QA5 | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qa5) |
| ADJ | Flat Par QA5X | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qa5x) |
| ADJ | Flat Par QA5XS | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qa5xs) |
| ADJ | Flat Par QWH12 | par | 12 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh12) |
| ADJ | Flat Par QWH12X | par | 12 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh12x) |
| ADJ | Flat Par QWH12XS | par | 12 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh12xs) |
| ADJ | Flat Par QWH5 | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh5) |
| ADJ | Flat Par QWH5X | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh5x) |
| ADJ | Flat Par QWH5XS | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/flat-par-qwh5xs) |
| ADJ | FLAT PAR TRI18 | par |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/flat-par-tri18) |
| ADJ | Flat Par TRI18X | par | 18 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/flat-par-tri18x) |
| ADJ | Flat Par TRI18XS | par | 18 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/flat-par-tri18xs) |
| ADJ | FLAT PAR TRI7 | par |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/flat-par-tri7) |
| ADJ | Flat Par TRI7XS | par | 7 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH | nein | [Link](https://www.adj.com/products/flat-par-tri7xs) |
| ADJ | Flat Par TW5 | par |  | 2CH, 3CH, 4CH, 5CH, 8CH, 9CH | nein | [Link](https://www.adj.com/products/flat-par-tw5) |
| ADJ | Focus Spot One | movinghead / spot |  | 15CH, 17CH | nein | [Link](https://www.adj.com/products/focus-spot-one) |
| ADJ | Focus Spot Three Z Pearl | movinghead / spot |  | 18CH, 21CH | nein | [Link](https://www.adj.com/products/focus-spot-three-z-pearl) |
| ADJ | FREQ Matrix | strobe | 16 Zellen | 1CH, 2CH, 16CH Pixel, 18CH Pixel | nein | [Link](https://www.adj.com/products/freq-matrix) |
| ADJ | Fusion Tri FX Bar | bar | 1 Zellen | 8CH | nein | [Link](https://www.adj.com/products/fusion-tri-fx-bar) |
| ADJ | Hydro Beam X2 | movinghead / beam |  | 15CH, 17CH | nein | [Link](https://www.adj.com/products/hydro-beam-x2) |
| ADJ | Ikon Profile Pearl | profile |  | 3CH | nein | [Link](https://www.adj.com/products/ikon-profile-pearl) |
| ADJ | Ikon Profile WW | profile |  | 3CH | nein | [Link](https://www.adj.com/products/ikon-profile-ww) |
| ADJ | Indy Hex Par | par |  | 4CH, 6CH, 7CH, 8CH, 11CH | nein | [Link](https://www.adj.com/products/indy-hex-par) |
| ADJ | Inno Beam LED | movinghead / beam |  | 12CH, 14CH | nein | [Link](https://www.adj.com/products/inno-beam-led) |
| ADJ | Inno Color Beam 12 | movinghead / beam |  | 9CH, 16CH | nein | [Link](https://www.adj.com/products/inno-color-beam-12) |
| ADJ | Inno Color Beam Z19 | movinghead / beam |  | 14CH | nein | [Link](https://www.adj.com/products/inno-color-beam-z19) |
| ADJ | Inno Pocket Spot LZR | movinghead / spot |  | 12CH, 13CH, 15CH | nein | [Link](https://www.adj.com/products/inno-pocket-spot-lzr) |
| ADJ | Inno Pocket Spot Pearl | movinghead / spot |  | 9CH, 11CH | nein | [Link](https://www.adj.com/products/inno-pocket-spot-pearl) |
| ADJ | Inno Roll HP | effect |  | 9CH | nein | [Link](https://www.adj.com/products/inno-roll-hp) |
| ADJ | Inno Roll LED | effect |  | 8CH | nein | [Link](https://www.adj.com/products/inno-roll-led) |
| ADJ | Inno Scan HP | scanner |  | 9CH, 12CH | nein | [Link](https://www.adj.com/products/inno-scan-hp) |
| ADJ | Inno Spot LED WiFLY | movinghead / spot |  | 10CH | nein | [Link](https://www.adj.com/products/inno-spot-led-wifly) |
| ADJ | Inno Spot Pro Pearl | movinghead / spot |  | 14CH | nein | [Link](https://www.adj.com/products/inno-spot-pro-pearl) |
| ADJ | Jelly Go Par64 | par |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/jelly-go-par64) |
| ADJ | Jelly Go Par64 RGBA | par |  | 1CH, 2CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/jelly-go-par64-rgba) |
| ADJ | Jelly Par Profile | profile |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/jelly-par-profile) |
| ADJ | Jellyfish | movinghead / beam |  | 28CH | nein | [Link](https://www.adj.com/products/jellyfish) |
| ADJ | Jellyfish IR | movinghead / beam |  | 28CH | nein | [Link](https://www.adj.com/products/jellyfish-ir) |
| ADJ | Jolt Bar FX | bar | 96 Zellen | 6CH, 9CH, 13CH, 16CH, 18CH, 32CH, 38CH, 43CH, 64CH, 78CH, 112CH, 126CH | nein | [Link](https://www.adj.com/products/jolt-bar-fx) |
| ADJ | Jolt Panel FX | panel |  | 6CH, 9CH, 13CH, 18CH, 36CH, 41CH, 51CH, 81CH, 126CH, 141CH | nein | [Link](https://www.adj.com/products/jolt-panel-fx) |
| ADJ | Kaos | movinghead / beam |  | 6CH, 15CH, 23CH, 45CH | nein | [Link](https://www.adj.com/products/kaos) |
| ADJ | LED Beam Scan | scanner |  | 3CH, 5CH | nein | [Link](https://www.adj.com/products/led-beam-scan) |
| ADJ | LED Matrix | strobe |  | 2CH, 25CH | nein | [Link](https://www.adj.com/products/led-matrix) |
| ADJ | LED Moon Beam | effect |  | 3CH | nein | [Link](https://www.adj.com/products/led-moon-beam) |
| ADJ | Matrix Beam LED | strobe | 25 Zellen | 1CH, 4CH, 25CH Pixel | nein | [Link](https://www.adj.com/products/matrix-beam-led) |
| ADJ | Mega 24PRO | movinghead / spot |  | 6CH, 7CH, 10CH, 12CH, 16CH | nein | [Link](https://www.adj.com/products/mega-24pro) |
| ADJ | Mega 64 Profile Plus | profile |  | 4CH, 5CH, 6CH, 9CH, 10CH | nein | [Link](https://www.adj.com/products/mega-64-profile-plus) |
| ADJ | Mega Bar Pro | bar | 27 Zellen | 2CH, 3CH, 4CH, 6CH, 7CH, 11CH, 29CH | nein | [Link](https://www.adj.com/products/mega-bar-pro) |
| ADJ | Mega Bar UV100 | bar | 1 Zellen | 2CH | nein | [Link](https://www.adj.com/products/mega-bar-uv100) |
| ADJ | Mega Bar UV50 | bar | 1 Zellen | 2CH | nein | [Link](https://www.adj.com/products/mega-bar-uv50) |
| ADJ | Mega Beam Bar | bar | 16 Zellen | 2CH, 4CH, 8CH, 10CH | nein | [Link](https://www.adj.com/products/mega-beam-bar) |
| ADJ | Mega Flat Pak8 PLUS | profile |  | 4CH, 5CH, 6CH, 9CH, 10CH | nein | [Link](https://www.adj.com/products/mega-flat-pak8-plus) |
| ADJ | Mega Go Bar 50 | bar | 1 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-go-bar-50) |
| ADJ | Mega Go Bar 50 RGBA | bar | 1 Zellen | 1CH, 2CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/mega-go-bar-50-rgba) |
| ADJ | Mega Go Flood Bar | bar | 1 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-go-flood-bar) |
| ADJ | Mega Go Flood Par | panel |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-go-flood-par) |
| ADJ | Mega Go Flood Par HO | panel |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-go-flood-par-ho) |
| ADJ | Mega Go Par 64 | par |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-go-par-64) |
| ADJ | Mega Go Par64 Plus | par |  | 4CH, 5CH, 6CH, 9CH, 10CH | nein | [Link](https://www.adj.com/products/mega-go-par64-plus) |
| ADJ | Mega Go Par64 RGBA | par |  | 1CH, 2CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/mega-go-par64-rgba) |
| ADJ | Mega Pixel Arch | effect |  | 3CH, 4CH, 7CH, 10CH, 16CH, 24CH, 28CH | nein | [Link](https://www.adj.com/products/mega-pixel-arch) |
| ADJ | Mega Pixel LED | effect |  | 3CH, 4CH, 7CH, 10CH, 16CH, 24CH, 28CH | nein | [Link](https://www.adj.com/products/mega-pixel-led) |
| ADJ | Mega QA Go | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/mega-qa-go) |
| ADJ | Mega QPlus Go | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/mega-qplus-go) |
| ADJ | Mega TRI 60 | par | 9 Zellen | 3CH, 5CH, 6CH, 8CH, 11CH, 29CH Pixel | nein | [Link](https://www.adj.com/products/mega-tri-60) |
| ADJ | Mega TRI64 Profile | profile |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/mega-tri64-profile) |
| ADJ | MEGA-BRITE | effect |  | 3CH, 6CH, 120CH, 250CH | nein | [Link](https://www.adj.com/products/mega-brite) |
| ADJ | Micro Wash WWCW | panel |  | 3CH, 5CH | nein | [Link](https://www.adj.com/products/micro-wash-wwcw) |
| ADJ | Mini Par UVW LED | par |  | 4CH, 6CH, 8CH | nein | [Link](https://www.adj.com/products/mini-par-uvw-led) |
| ADJ | Monster Quad | par | 25 Zellen | 1CH | nein | [Link](https://www.adj.com/products/monster-quad) |
| ADJ | Octo Beam RGBW | effect | 8 Zellen | 1CH, 10CH | nein | [Link](https://www.adj.com/products/octo-beam-rgbw) |
| ADJ | Octo Beam WW | panel | 8 Zellen | 1CH, 8CH Pixel, 10CH Pixel | nein | [Link](https://www.adj.com/products/octo-beam-ww) |
| ADJ | P64 LED UV | par | 64 Zellen | 3CH | nein | [Link](https://www.adj.com/products/p64-led-uv) |
| ADJ | PAR Z Move | par |  | 7CH, 9CH, 11CH | nein | [Link](https://www.adj.com/products/par-z-move) |
| ADJ | Par Z Move RGBW | par |  | 13CH, 15CH, 16CH | nein | [Link](https://www.adj.com/products/par-z-move-rgbw) |
| ADJ | PAR Z100 3K | par |  | 2CH | nein | [Link](https://www.adj.com/products/par-z100-3k) |
| ADJ | PAR Z100 5K | par |  | 2CH | nein | [Link](https://www.adj.com/products/par-z100-5k) |
| ADJ | PAR Z120 RGBW | par |  | 4CH, 5CH, 6CH, 7CH, 8CH, 9CH | nein | [Link](https://www.adj.com/products/par-z120-rgbw) |
| ADJ | PAR ZP100 3K | par |  | 2CH | nein | [Link](https://www.adj.com/products/par-zp100-3k) |
| ADJ | PAR ZP120 RGBW | par |  | 4CH, 5CH, 6CH, 7CH, 8CH, 9CH | nein | [Link](https://www.adj.com/products/par-zp120-rgbw) |
| ADJ | Penta Beam | movinghead / beam |  | 6CH | nein | [Link](https://www.adj.com/products/penta-beam) |
| ADJ | Pixel Pulse Bar | bar | 15 Zellen | 1CH, 4CH, 17CH | nein | [Link](https://www.adj.com/products/pixel-pulse-bar) |
| ADJ | Profile Panel RGBA | profile |  | 4CH, 7CH, 9CH, 32CH | nein | [Link](https://www.adj.com/products/profile-panel-rgba) |
| ADJ | Quad Color | par |  | 4CH | nein | [Link](https://www.adj.com/products/quad-color) |
| ADJ | Quad Phase GO | par |  | 4CH | nein | [Link](https://www.adj.com/products/quad-phase-go) |
| ADJ | Quad Scan Pro | scanner |  | 1CH, 5CH, 32CH | nein | [Link](https://www.adj.com/products/quad-scan-pro) |
| ADJ | Revo I | effect | 49 Zellen | 4CH | nein | [Link](https://www.adj.com/products/revo-i) |
| ADJ | Revo II | effect | 64 Zellen | 4CH | nein | [Link](https://www.adj.com/products/revo-ii) |
| ADJ | Revo III | effect | 7 Zellen | 4CH, 10CH | nein | [Link](https://www.adj.com/products/revo-iii) |
| ADJ | Revo Rave | effect | 64 Zellen | 5CH | nein | [Link](https://www.adj.com/products/revo-rave) |
| ADJ | Revo Roll LED | effect | 52 Zellen | 4CH | nein | [Link](https://www.adj.com/products/revo-roll-led) |
| ADJ | Revo Scan LED | scanner |  | 4CH | nein | [Link](https://www.adj.com/products/revo-scan-led) |
| ADJ | Revo Xpress | effect |  | 4CH, 256CH | nein | [Link](https://www.adj.com/products/revo-xpress) |
| ADJ | Starship | effect | 24 Zellen | 22CH, 120CH | nein | [Link](https://www.adj.com/products/starship) |
| ADJ | Stinger Gobo | effect | 8 Zellen | 2CH, 14CH | nein | [Link](https://www.adj.com/products/stinger-gobo) |
| ADJ | Stinger Star | effect | 6 Zellen | 2CH, 14CH | nein | [Link](https://www.adj.com/products/stinger-star) |
| ADJ | Sunray Tri LED DMX | par |  | 2CH | nein | [Link](https://www.adj.com/products/sunray-tri-led-dmx) |
| ADJ | Super Spot LED | par |  | 2CH | nein | [Link](https://www.adj.com/products/super-spot-led) |
| ADJ | Theatrix Pro 48 LED | effect | 48 Zellen | 4CH, 5CH, 7CH, 8CH, 11CH, 16CH, 19CH | nein | [Link](https://www.adj.com/products/theatrix-pro-48-led) |
| ADJ | Tri Fecta | par |  | 3CH | nein | [Link](https://www.adj.com/products/tri-fecta) |
| ADJ | Tri Pearl | par |  | 3CH | nein | [Link](https://www.adj.com/products/tri-pearl) |
| ADJ | TRiDiSC 9 IR | strobe |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH | nein | [Link](https://www.adj.com/products/tridisc-9-ir) |
| ADJ | TriDisc 9 LED | effect | 9 Zellen | 6CH, 8CH | nein | [Link](https://www.adj.com/products/tridisc-9-led) |
| ADJ | Trio Par LED | par | 9 Zellen | 13CH, 22CH, 26CH | nein | [Link](https://www.adj.com/products/trio-par-led) |
| ADJ | Trio Par LED RG | par | 6 Zellen | 6CH, 10CH, 26CH Pixel, 30CH Pixel | nein | [Link](https://www.adj.com/products/trio-par-led-rg) |
| ADJ | Tripleflex | effect |  | 4CH, 9CH | nein | [Link](https://www.adj.com/products/tripleflex) |
| ADJ | Ultra Go Par7X | par | 7 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH | nein | [Link](https://www.adj.com/products/ultra-go-par7x) |
| ADJ | Ultra Hex Bar 6 | bar | 6 Zellen | 6CH, 7CH, 8CH, 12CH, 18CH Pixel | nein | [Link](https://www.adj.com/products/ultra-hex-bar-6) |
| ADJ | Ultra Kling Bar 18 | bar | 18 Zellen | 3CH, 4CH, 6CH, 7CH, 8CH, 9CH, 15CH, 54CH Pixel | nein | [Link](https://www.adj.com/products/ultra-kling-bar-18) |
| ADJ | Ultra Scan 250 | scanner |  | 6CH | nein | [Link](https://www.adj.com/products/ultra-scan-250) |
| ADJ | UV 72IP | par |  | 1CH, 2CH, 3CH | nein | [Link](https://www.adj.com/products/uv-72ip) |
| ADJ | Vizi Beam 12RX | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://www.adj.com/products/vizi-beam-12rx) |
| ADJ | Vizi Beam Hybrid 2R | movinghead / spot |  | 10CH, 12CH, 16CH | nein | [Link](https://www.adj.com/products/vizi-beam-hybrid-2r) |
| ADJ | Vizi CMY 16RX | movinghead / wash |  | 22CH, 24CH | nein | [Link](https://www.adj.com/products/vizi-cmy-16rx) |
| ADJ | Vizi Hybrid 16RX | movinghead / spot |  | 19CH | nein | [Link](https://www.adj.com/products/vizi-hybrid-16rx) |
| ADJ | Vizi Scan LED Pro | movinghead / wash |  | 12CH, 14CH | nein | [Link](https://www.adj.com/products/vizi-scan-led-pro) |
| ADJ | Vizi Spot 5R | movinghead / spot |  | 13CH | nein | [Link](https://www.adj.com/products/vizi-spot-5r) |
| ADJ | Vizi Wash Z19 | movinghead / wash |  | 13CH, 14CH, 17CH, 18CH, 29CH, 30CH, 45CH, 46CH | nein | [Link](https://www.adj.com/products/vizi-wash-z19) |
| ADJ | Vizi Wash Z37 | movinghead / wash | 37 Zellen | 6CH, 14CH, 16CH, 17CH, 64CH, 71CH | nein | [Link](https://www.adj.com/products/vizi-wash-z37) |
| ADJ | WiFLY Bar RGBA | bar | 1 Zellen | 4CH, 6CH, 7CH, 8CH, 9CH, 10CH, 18CH, 34CH | nein | [Link](https://www.adj.com/products/wifly-bar-rgba) |
| ADJ | WiFLY EXR Hex Par | par | 5 Zellen | 6CH, 7CH, 8CH, 11CH, 12CH | nein | [Link](https://www.adj.com/products/wifly-exr-hex-par) |
| ADJ | WiFLY EXR QA12BAR IP | bar | 12 Zellen | 4CH, 6CH, 7CH, 8CH, 9CH, 14CH | nein | [Link](https://www.adj.com/products/wifly-exr-qa12bar-ip) |
| ADJ | WiFLY EXR QA5 IP | panel |  | 4CH, 5CH, 6CH, 10CH, 11CH | nein | [Link](https://www.adj.com/products/wifly-exr-qa5-ip) |
| ADJ | WiFLY Par QA5 WH | par | 5 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH | nein | [Link](https://www.adj.com/products/wifly-par-qa5-wh) |
| ADJ | WiFLY QA5 IP | panel |  | 4CH, 5CH, 6CH, 10CH, 11CH | nein | [Link](https://www.adj.com/products/wifly-qa5-ip) |
| ADJ | WiFLY Wash Bar | bar | 15 Zellen | 3CH, 4CH, 6CH | nein | [Link](https://www.adj.com/products/wifly-wash-bar) |
| ADJ | X-Move Laser | movinghead / beam |  | 6CH | nein | [Link](https://www.adj.com/products/x-move-laser) |
| ADJ | X-Move LED | movinghead / beam |  | 6CH | nein | [Link](https://www.adj.com/products/x-move-led) |
| ADJ | X-MOVE LED 25R | movinghead / beam |  | 9CH | nein | [Link](https://www.adj.com/products/x-move-led-25r) |
| ADJ | X-Move LED Plus | movinghead / beam |  | 8CH | nein | [Link](https://www.adj.com/products/x-move-led-plus) |
| ADJ | X-Move LED Plus R | movinghead / beam |  | 9CH | nein | [Link](https://www.adj.com/products/x-move-led-plus-r) |
| ADJ | XS 200 | movinghead / spot |  | 16CH, 18CH | nein | [Link](https://www.adj.com/products/xs-200) |
| Ayrton | Veloce Profile | movinghead / profile |  | 44CH, 67CH | nein | [Link](https://www.ayrton.eu/produit/veloce-profile/) |
| Ayrton | Veloce Wash | movinghead / wash |  | 60CH | nein | [Link](https://www.ayrton.eu/produit/veloce-wash/) |
| Ayrton | Rivale Wash | movinghead / wash |  | 60CH | nein | [Link](https://www.ayrton.eu/produit/rivale-wash/) |
| Ayrton | Stradale Profile | movinghead / profile |  | 42CH, 65CH | nein | [Link](https://www.ayrton.eu/produit/stradale-profile/) |
| Ayrton | EagleStrike | movinghead / profile |  | 44CH, 66CH | nein | [Link](https://www.ayrton.eu/produit/eaglestrike/) |
| Ayrton | Naja | movinghead / beam |  | 49CH | nein | [Link](https://www.ayrton.eu/produit/naja/) |
| Ayrton | Mamba | movinghead / beam |  | 47CH | nein | [Link](https://www.ayrton.eu/produit/mamba/) |
| Ayrton | Rawbeam 350 | movinghead / beam |  | 43CH | nein | [Link](https://www.ayrton.eu/produit/rawbeam-350/) |
| Ayrton | Karif LT | movinghead / beam |  | 32CH, 46CH | nein | [Link](https://www.ayrton.eu/produit/karif-lt/) |
| Ayrton | Perseo Beam | movinghead / beam |  | 29CH, 42CH | nein | [Link](https://www.ayrton.eu/produit/perseo-beam/) |
| Ayrton | Domino Profile | movinghead / profile |  | 44CH, 66CH | nein | [Link](https://www.ayrton.eu/produit/domino-profile/) |
| Ayrton | Domino Wash | movinghead / wash |  | 37CH, 61CH | nein | [Link](https://www.ayrton.eu/produit/domino-wash/) |
| Ayrton | Huracán Profile | movinghead / profile |  | 44CH, 70CH | nein | [Link](https://www.ayrton.eu/produit/huracan-profile/) |
| Ayrton | Huracán Wash | movinghead / wash |  | 39CH, 61CH | nein | [Link](https://www.ayrton.eu/produit/huracan-wash/) |
| Ayrton | Merak | movinghead / wash |  | 18CH, 28CH | nein | [Link](https://www.ayrton.eu/produit/merak/) |
| Ayrton | Argo 6 Wash | movinghead / wash | 19 Zellen | 26CH, 67CH Pixel | nein | [Link](https://www.ayrton.eu/produit/argo-6-wash/) |
| Ayrton | Argo 6 FX | movinghead / wash | 19 Zellen | 26CH, 127CH | nein | [Link](https://www.ayrton.eu/produit/argo-6-fx/) |
| Ayrton | Zonda 3 Wash | movinghead / wash | 7 Zellen | 26CH, 46CH Pixel | nein | [Link](https://www.ayrton.eu/produit/zonda-3-wash/) |
| Ayrton | Zonda 3 FX | movinghead / wash | 7 Zellen | 26CH Pixel, 79CH Pixel | nein | [Link](https://www.ayrton.eu/produit/zonda-3-fx/) |
| Ayrton | Zonda 9 Wash | movinghead / wash | 37 Zellen | 26CH, 54CH | nein | [Link](https://www.ayrton.eu/produit/zonda-9-wash/) |
| Ayrton | Nando 502 Wash | movinghead / wash | 12 Zellen | 26CH, 86CH | nein | [Link](https://www.ayrton.eu/produit/nando-502-wash/) |
| Ayrton | Nando 1202 | movinghead / wash | 28 Zellen | 26CH, 150CH | nein | [Link](https://www.ayrton.eu/produit/nando-1202/) |
| Ayrton | WildSun K9 Wash | movinghead / wash |  | 14CH, 30CH | nein | [Link](https://www.ayrton.eu/produit/wildsun-k9-wash/) |
| Ayrton | WildBeam-R | movinghead / beam |  | 42CH | nein | [Link](https://www.ayrton.eu/produit/wildbeam-r/) |
| Ayrton | MagicPanel FX | movinghead / matrix | 25 Zellen | 19CH, 118CH Pixel | nein | [Link](https://www.ayrton.eu/produit/magicpanel-fx/) |
| Ayrton | MagicDot Neo | movinghead / orb |  | 35CH | nein | [Link](https://www.ayrton.eu/produit/magicdot-neo/) |
| Ayrton | MagicBlade Neo | multibar | 5 Zellen | 175CH, 184CH | nein | [Link](https://www.ayrton.eu/produit/magicblade-neo/) |
| Big Dipper | LM250 Matrix Moving Head 25×10W RGBW | movinghead / matrix | 25 Zellen | 19CH, 29CH, 117CH Pixel | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailFBWJzClufXkp/China-Matrix-Moving-Head-LED.html) |
| Big Dipper | LM80 Spider 8×8W RGBW (2 bewegliche LED-Leisten) | spider | 2 Zellen | 6CH, 12CH Pixel, 36CH Pixel | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailrBdJQUDbbqWc/China-Moving-Head-Spider-Light-Lm80.html) |
| Big Dipper | LPC001 9×8W RGBW PAR | par | 9 Zellen | 8CH | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailUBFJawIuLokd/China-9-8W-Lpc001-LED-PAR-Light.html) |
| Big Dipper | LP002 36×3W RGB PAR | par | 36 Zellen | 7CH | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailXSFmbHqCkxVk/China-LED-PAR-Light-LP002-.html) |
| Big Dipper | LPW001 54×3W RGBW IP65 PAR | par | 54 Zellen | 8CH | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailgXOJAkIonqcl/China-54X3w-Waterproof-PAR-Light.html) |
| Big Dipper | L001 Disco/Magic Ball 6×3W | derby / orb | 6 Zellen | 6CH | nein | [Link](https://www.made-in-china.com/showroom/bigdipperyork/product-detailIvZxotbThQVM/China-Disco-Ball-Light-L001-.html) |
| Big Dipper | 35W LED Gobo Moving Head | movinghead / spot |  | 9CH, 11CH | nein | [Link](https://www.amazon.ca/Big-Dipper-Spotlights-Activated-Equipment/dp/B0CF1TC889) |
| Briteq | BEAMSPOT-4BAR NW | bar | 1 Zellen | 1CH, 5CH | nein | [Link](https://briteq-lighting.com/beamspot-4bar-nw) |
| Briteq | BEAMSPOT-4BAR WW | bar | 1 Zellen | 1CH, 5CH | nein | [Link](https://briteq-lighting.com/beamspot-4bar-ww) |
| Briteq | BEAMSPOT1-DMX WW | par |  | 1CH, 2CH | nein | [Link](https://briteq-lighting.com/beamspot1-dmx-ww) |
| Briteq | BT-AKKUBAR | bar | 1 Zellen | 1CH | nein | [Link](https://briteq-lighting.com/bt-akkubar) |
| Briteq | BT-AKKULITE IP | par |  | 4CH, 10CH | nein | [Link](https://briteq-lighting.com/bt-akkulite-ip) |
| Briteq | BT-AKKULITE IP MINI | par |  | 4CH, 10CH | nein | [Link](https://briteq-lighting.com/bt-akkulite-ip-mini) |
| Briteq | BT-BLINDER2 IP | blinder | 1 Zellen | 1CH, 12CH | nein | [Link](https://briteq-lighting.com/bt-blinder2-ip) |
| Briteq | BT-CHROMA 800 | effect |  | 3CH, 81CH | nein | [Link](https://briteq-lighting.com/bt-chroma-800) |
| Briteq | BT-COLORAY 18FCR (XLR 5pin) | effect |  | 4CH, 7CH | nein | [Link](https://briteq-lighting.com/bt-coloray-18fcr-xlr-5pin) |
| Briteq | BT-COLORAY MULTI | effect |  | 4CH, 7CH | nein | [Link](https://briteq-lighting.com/bt-coloray-multi) |
| Briteq | BT-LASER2000 RGB | laser |  | 1CH, 17CH | nein | [Link](https://briteq-lighting.com/bt-laser2000-rgb) |
| Briteq | BT-MAGICFLASH | strobe |  | 1CH, 13CH | nein | [Link](https://briteq-lighting.com/bt-magicflash) |
| Briteq | BT-MAGICFLASH RGB | strobe |  | 1CH, 13CH | nein | [Link](https://briteq-lighting.com/bt-magicflash-rgb) |
| Briteq | BT-NONABEAM - BQ1 | effect |  | 13CH, 45CH | nein | [Link](https://briteq-lighting.com/bt-nonabeam) |
| Briteq | BT-NONAMOVE | movinghead / beam |  | 18CH, 50CH | nein | [Link](https://briteq-lighting.com/bt-nonamove) |
| Briteq | BT-NONAPIXEL WHITE | effect |  | 5CH, 95CH | nein | [Link](https://briteq-lighting.com/bt-nonapixel-white) |
| Briteq | BT-PROFILE 500TW/LED ENGINE | profile |  | 1CH, 4CH | nein | [Link](https://briteq-lighting.com/bt-profile-500tw-led-engine) |
| Briteq | BT-PROFILE 6C10 | profile |  | 1CH, 19CH | nein | [Link](https://briteq-lighting.com/bt-profile-6c10) |
| Briteq | BT-PROFILE 6C20 ENGINE | profile |  | 4CH, 21CH | nein | [Link](https://briteq-lighting.com/bt-profile-6c20-engine) |
| Briteq | BT-PROFILE HD | profile |  | 3CH, 18CH | nein | [Link](https://briteq-lighting.com/bt-profile-hd) |
| Briteq | BT-PROFILE WW | profile |  | 1CH, 4CH | nein | [Link](https://briteq-lighting.com/bt-profile-ww) |
| Briteq | BT-PROFILE250/LED ENGINE | profile |  | 1CH, 2CH | nein | [Link](https://briteq-lighting.com/bt-profile250-led-engine) |
| Briteq | BT-SHARK | movinghead / spot |  | 5CH, 19CH | nein | [Link](https://briteq-lighting.com/bt-shark) |
| Briteq | BT-SUNRAY 130R | effect |  | 1CH, 8CH | nein | [Link](https://briteq-lighting.com/bt-sunray-130r) |
| Briteq | BT-THEATRE 100MZ | fresnel |  | 1CH, 4CH | nein | [Link](https://briteq-lighting.com/bt-theatre-100mz) |
| Briteq | BT-THEATRE 150EZ Mk3 | fresnel |  | 1CH, 9CH | nein | [Link](https://briteq-lighting.com/bt-theatre-150ez-mk3) |
| Briteq | BT-THEATRE 400TW | fresnel |  | 1CH, 6CH | nein | [Link](https://briteq-lighting.com/bt-theatre-400tw) |
| Briteq | BT-THEATRE 50WW (BLACK) | par |  | 1CH, 3CH | nein | [Link](https://briteq-lighting.com/bt-theatre-50ww-black) |
| Briteq | BT-THEATRE 50WW (WHITE) | par |  | 1CH, 3CH | nein | [Link](https://briteq-lighting.com/bt-theatre-50ww-white) |
| Briteq | BT-THEATRE 60FCL | par |  | 4CH, 7CH | nein | [Link](https://briteq-lighting.com/bt-theatre-60fcl) |
| Briteq | BT-TVPANEL TW | panel |  | 7CH | nein | [Link](https://briteq-lighting.com/bt-tvpanel-tw) |
| Briteq | BT-VENUELITE4 | effect |  | 1CH, 4CH | nein | [Link](https://briteq-lighting.com/bt-venuelite4) |
| Briteq | BT-VERTIGO | movinghead / wash |  | 17CH, 23CH | nein | [Link](https://briteq-lighting.com/bt-vertigo) |
| Briteq | BTI-AKKUBEAMER | par |  | 3CH, 8CH | nein | [Link](https://briteq-lighting.com/bti-akkubeamer) |
| Briteq | BTI-AKKUCHROMA | par |  | 3CH, 8CH | nein | [Link](https://briteq-lighting.com/bti-akkuchroma) |
| Briteq | BTI-BEAMBAR18 | bar | 1 Zellen | 11CH, 96CH | nein | [Link](https://briteq-lighting.com/bti-beambar18) |
| Briteq | BTI-BLINDER1 FX | blinder | 1 Zellen | 1CH, 58CH | nein | [Link](https://briteq-lighting.com/bti-blinder1-fx) |
| Briteq | BTI-BLIZZARD BSW1 | movinghead / spot |  | 21CH, 28CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-bsw1) |
| Briteq | BTI-BLIZZARD BSW2 | movinghead / spot |  | 22CH, 29CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-bsw2) |
| Briteq | BTI-BLIZZARD LBEAM | movinghead / beam |  | 19CH, 25CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-lbeam) |
| Briteq | BTI-BLIZZARD PROFILE | movinghead / profile |  | 35CH, 44CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-profile) |
| Briteq | BTI-BLIZZARD WASH1 | movinghead / wash |  | 18CH, 27CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-wash1) |
| Briteq | BTI-BLIZZARD WASH2s | movinghead / wash |  | 26CH, 133CH | nein | [Link](https://briteq-lighting.com/bti-blizzard-wash2s) |
| Briteq | BTI-CYCLO | bar | 1 Zellen | 3CH, 20CH | nein | [Link](https://briteq-lighting.com/bti-cyclo) |
| Briteq | BTI-EXPOBEAM WW | effect |  | 1CH, 4CH | nein | [Link](https://briteq-lighting.com/bti-expobeam-ww) |
| Briteq | BTI-FLATPAR12 | par |  | 3CH, 12CH | nein | [Link](https://briteq-lighting.com/bti-flatpar12) |
| Briteq | BTI-LIGHTSTRIKE IP66 | bar | 1 Zellen | 6CH, 123CH | nein | [Link](https://briteq-lighting.com/bti-lightstrike-ip66) |
| Briteq | BTI-RAPTOR | strobe |  | 10CH, 80CH | nein | [Link](https://briteq-lighting.com/bti-raptor) |
| Briteq | BTI-SPECTRABLAST | blinder | 1 Zellen | 1CH, 12CH | nein | [Link](https://briteq-lighting.com/bti-spectrablast) |
| Briteq | BTI-THEATRE 6C20 | fresnel |  | 10CH, 20CH | nein | [Link](https://briteq-lighting.com/bti-theatre-6c20) |
| Briteq | BTI-VERSABEAM | effect |  | 3CH, 8CH | nein | [Link](https://briteq-lighting.com/bti-versabeam) |
| Briteq | BTX-CIRRUS 3 | movinghead / wash |  | 24CH, 100CH | nein | [Link](https://briteq-lighting.com/btx-cirrus-3) |
| Briteq | BTX-LIGHTSTRIKE | bar | 1 Zellen | 6CH, 123CH | nein | [Link](https://briteq-lighting.com/btx-lightstrike) |
| Briteq | BTX-SKYRAN | blinder | 1 Zellen | 13CH | nein | [Link](https://briteq-lighting.com/btx-skyran) |
| Briteq | BTX-SUPREME | movinghead / spot |  | 24CH, 35CH | nein | [Link](https://briteq-lighting.com/btx-supreme) |
| Briteq | COB PAR56-100WW SILVER | cob |  | 1CH, 2CH | nein | [Link](https://briteq-lighting.com/cob-par56-100ww-silver) |
| Briteq | EXPO CANNON | effect |  | 1CH, 2CH | nein | [Link](https://briteq-lighting.com/expo-cannon) |
| Briteq | LDP-COLORBAR 12FC | bar | 1 Zellen | 3CH, 10CH | nein | [Link](https://briteq-lighting.com/ldp-colorbar-12fc) |
| Briteq | LDP-COLORBAR 24FC | bar | 1 Zellen | 3CH, 20CH | nein | [Link](https://briteq-lighting.com/ldp-colorbar-24fc) |
| Briteq | LDP-COLORSTRIP 12FC | bar | 1 Zellen | 3CH, 10CH | nein | [Link](https://briteq-lighting.com/ldp-colorstrip-12fc) |
| Briteq | LDP-COLORSTRIP 24FC | bar | 1 Zellen | 3CH, 20CH | nein | [Link](https://briteq-lighting.com/ldp-colorstrip-24fc) |
| Briteq | LED UV-GUN 100W | par |  | 1CH, 2CH | nein | [Link](https://briteq-lighting.com/led-uv-gun-100w) |
| Briteq | Powerpixel4-RGB | effect |  | 3CH, 16CH | nein | [Link](https://briteq-lighting.com/powerpixel4-rgb) |
| Briteq | Powerpixel8-RGB | effect |  | 3CH, 16CH | nein | [Link](https://briteq-lighting.com/powerpixel8-rgb) |
| Briteq | PRO BEAMER ZOOM Mk5 - RENTAL | movinghead / beam |  | 25CH | nein | [Link](https://briteq-lighting.com/pro-beamer-zoom-mk5-rental) |
| Briteq | STAGE BEAMER FC - INDOOR | effect |  | 4CH, 15CH | nein | [Link](https://briteq-lighting.com/stage-beamer-fc-indoor) |
| Briteq | STAGE BEAMER FC - OUTDOOR | effect |  | 4CH, 15CH | nein | [Link](https://briteq-lighting.com/stage-beamer-fc-outdoor) |
| Briteq | BTX-BLIZZARD WASH1 | movinghead / wash |  | 18CH, 27CH | nein | [Link](https://briteq-lighting.com/btx-blizzard-wash1) |
| Chauvet DJ | 4BAR Flex Q ILS | bar | 1 Zellen | 4CH, 6CH, 19CH | nein | [Link](https://www.chauvetdj.com/products/4bar-flex-q-ils/) |
| Chauvet DJ | 4BAR ILS | bar | 96 Zellen | 3CH, 5CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-ils/) |
| Chauvet DJ | 4BAR LT QuadBT ILS | bar | 12 Zellen | 4CH, 6CH, 19CH | nein | [Link](https://www.chauvetdj.com/products/4bar-lt-quadbt-ils/) |
| Chauvet DJ | 4BAR LTBT ILS | bar | 12 Zellen | 3CH, 5CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-ltbt-ils/) |
| Chauvet DJ | Abyss 2 | effect |  | 3CH | nein | [Link](https://www.chauvetdj.com/products/abyss-2/) |
| Chauvet DJ | Blazor | movinghead / spot |  | 11CH | nein | [Link](https://www.chauvetdj.com/products/blazor/) |
| Chauvet DJ | CoDot ILS | effect |  | 4CH, 6CH | nein | [Link](https://www.chauvetdj.com/products/codot-ils/) |
| Chauvet DJ | COLORband H9 ILS | bar | 9 Zellen | 6CH, 11CH, 18CH, 23CH | nein | [Link](https://www.chauvetdj.com/products/colorband-h9-ils/) |
| Chauvet DJ | COLORband Pix ILS | bar | 12 Zellen | 3CH, 4CH, 6CH, 7CH, 8CH, 9CH, 18CH, 36CH Pixel, 41CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorband-pix-ils/) |
| Chauvet DJ | COLORband PiX-M ILS | bar | 10 Zellen | 5CH, 6CH, 8CH, 17CH, 32CH Pixel, 36CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorband-pix-m-ils/) |
| Chauvet DJ | COLORband Q3BT ILS | bar | 12 Zellen | 4CH, 6CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/colorband-q3bt-ils/) |
| Chauvet DJ | COLORband Q4 IP | bar | 12 Zellen | 4CH, 7CH, 10CH, 16CH, 22CH | nein | [Link](https://www.chauvetdj.com/products/colorband-q4-ip/) |
| Chauvet DJ | COLORband Spectra ILS | bar | 40 Zellen | 6CH, 11CH, 17CH, 19CH, 164CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorband-spectra-ils/) |
| Chauvet DJ | COLORband T3BT ILS | bar | 12 Zellen | 3CH, 5CH, 13CH | nein | [Link](https://www.chauvetdj.com/products/colorband-t3bt-ils/) |
| Chauvet DJ | COLORstrip | bar | 96 Zellen | 4CH | nein | [Link](https://www.chauvetdj.com/products/colorstrip/) |
| Chauvet DJ | COLORstrip Pix ILS | bar | 40 Zellen | 3CH, 8CH, 120CH Pixel, 122CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorstrip-pix-ils/) |
| Chauvet DJ | COREpar Q60 ILS | par |  | 4CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/corepar-q60-ils/) |
| Chauvet DJ | COREpar UV 120 ILS | par |  | 1CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/corepar-uv120-ils/) |
| Chauvet DJ | Cosmos HP | derby | 16 Zellen | 6CH, 23CH | nein | [Link](https://www.chauvetdj.com/products/cosmos-hp/) |
| Chauvet DJ | EVE B-160Q | par | 24 Zellen | 3CH, 4CH, 11CH, 39CH | nein | [Link](https://www.chauvetdj.com/products/eve-b-160q/) |
| Chauvet DJ | EVE E-100Z | profile |  | 1CH, 3CH | nein | [Link](https://www.chauvetdj.com/products/eve-e-100z/) |
| Chauvet DJ | EVE E-160ZQ | profile |  | 3CH, 4CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/eve-e-160zq/) |
| Chauvet DJ | EVE E-50Z | profile |  | 1CH, 3CH | nein | [Link](https://www.chauvetdj.com/products/eve-e-50z/) |
| Chauvet DJ | EVE F-160ZQ | fresnel |  | 3CH, 4CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/eve-f-160zq/) |
| Chauvet DJ | EVE F-50Z | fresnel |  | 1CH, 3CH | nein | [Link](https://www.chauvetdj.com/products/eve-f-50z/) |
| Chauvet DJ | EZBeam Q3 ILS | effect | 3 Zellen | 6CH, 9CH, 14CH, 17CH | nein | [Link](https://www.chauvetdj.com/products/ezbeam-q3-ils/) |
| Chauvet DJ | EZLink Par Q4BT ILS | par | 4 Zellen | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/ezlink-par-q4bt-ils/) |
| Chauvet DJ | EZLink Wedge Q3BT ILS | par | 3 Zellen | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/ezlink-wedge-q3bt-ils/) |
| Chauvet DJ | EZwedge Tri | par | 3 Zellen | 3CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/ezwedge-tri/) |
| Chauvet DJ | Festoon 2 RGB | retro | 1 Zellen | 3CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/festoon-2-rgb/) |
| Chauvet DJ | Followspot 200ST | follow |  | 3CH | nein | [Link](https://www.chauvetdj.com/products/followspot-200st/) |
| Chauvet DJ | Freedom Flex H9 IP X6 | par | 9 Zellen | 6CH, 8CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/freedom-flex-h9-ip-x6/) |
| Chauvet DJ | Freedom Flex Stick X4 | tube | 92 Zellen | 4CH, 9CH, 10CH, 18CH, 34CH, 66CH, 94CH | nein | [Link](https://www.chauvetdj.com/products/freedom-flex-stick-x4/) |
| Chauvet DJ | Freedom H1 IP ILS X4 | par |  | 6CH, 8CH, 12CH | nein | [Link](https://www.chauvetdj.com/products/freedom-h1-ip-ils-x4/) |
| Chauvet DJ | Freedom Par H9 IP | par | 9 Zellen | 6CH, 8CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-h9-ip/) |
| Chauvet DJ | Freedom Par Q12 | par | 12 Zellen | 4CH, 6CH, 14CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-q12/) |
| Chauvet DJ | Freedom Par T6 | par | 6 Zellen | 3CH, 5CH, 13CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-t6/) |
| Chauvet DJ | Freedom Stick X4 | tube | 32 Zellen | 3CH, 8CH, 48CH, 50CH | nein | [Link](https://www.chauvetdj.com/products/freedom-stick-x4/) |
| Chauvet DJ | FXpar 6 | par | 18 Zellen | 3CH, 6CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/fxpar-6/) |
| Chauvet DJ | GigBAR 3 ILS | gigbar | 6 Zellen | 2CH, 21CH Pixel, 132CH Pixel | nein | [Link](https://www.chauvetdj.com/products/gigbar-3-ils/) |
| Chauvet DJ | GigBAR Bridge Beam ILS | tiltbar | 2 Zellen | 24CH Pixel, 60CH Pixel | nein | [Link](https://www.chauvetdj.com/products/gigbar-bridge-beam-ils/) |
| Chauvet DJ | GigBAR Bridge ILS | tiltbar | 1 Zellen | 16CH, 46CH | nein | [Link](https://www.chauvetdj.com/products/gigbar-bridge-ils/) |
| Chauvet DJ | GigBAR Move + ILS | gigbar | 4 Zellen | 29CH, 51CH | nein | [Link](https://www.chauvetdj.com/products/gigbar-move-ils/) |
| Chauvet DJ | GigBAR Move ILS | gigbar | 4 Zellen | 27CH, 46CH | nein | [Link](https://www.chauvetdj.com/products/gig-bar-move-ils/) |
| Chauvet DJ | Gobo Zoom 2 | effect |  | 1CH | nein | [Link](https://www.chauvetdj.com/products/gobo-zoom-2/) |
| Chauvet DJ | Helicopter Q6 | movinghead / spot |  | 16CH | nein | [Link](https://www.chauvetdj.com/products/helicopter-q6/) |
| Chauvet DJ | Intimidator Scan 110 | scanner |  | 5CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-scan-110/) |
| Chauvet DJ | Intimidator Spot 160 ILS | movinghead / spot |  | 5CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-spot-160-ils/) |
| Chauvet DJ | Intimidator Spot 360QD | movinghead / spot |  | 11CH, 18CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-spot-360qd/) |
| Chauvet DJ | Intimidator Spot 360X | movinghead / spot |  | 8CH, 14CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-spot-360x/) |
| Chauvet DJ | Intimidator Trio XD | movinghead / spot |  | 16CH, 23CH, 52CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-trio-xd/) |
| Chauvet DJ | Kinta FX ILS | laser |  | 2CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/kinta-fx-ils/) |
| Chauvet DJ | LED Followspot 75ST | follow |  | 3CH | nein | [Link](https://www.chauvetdj.com/products/led-followspot-75st/) |
| Chauvet DJ | LED Shadow 2 ILS | panel | 18 Zellen | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/led-shadow2-ils/) |
| Chauvet DJ | Mini Kinta ILS | derby | 4 Zellen | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/mini-kinta-ils/) |
| Chauvet DJ | Obsession HP | derby | 1 Zellen | 2CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/obsession-hp/) |
| Chauvet DJ | Pinspot Bar | bar | 6 Zellen | 1CH, 6CH Pixel, 11CH Pixel | nein | [Link](https://www.chauvetdj.com/products/pinspot-bar/) |
| Chauvet DJ | Rotosphere HP | derby / orb | 10 Zellen | 3CH, 12CH, 28CH | nein | [Link](https://www.chauvetdj.com/products/rotosphere-hp/) |
| Chauvet DJ | Scorpion Dual RGB ILS | laser |  | 10CH | nein | [Link](https://www.chauvetdj.com/products/scorpion-dual-rgb-ils/) |
| Chauvet DJ | Sentinel Wash Q120 | movinghead / wash |  | 10CH, 14CH | nein | [Link](https://www.chauvetdj.com/products/sentinel-wash-q120/) |
| Chauvet DJ | Shocker 2 | strobe |  | 1CH, 2CH, 4CH, 7CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/shocker-2/) |
| Chauvet DJ | Shocker FX | strobe | 96 Zellen | 8CH, 18CH, 30CH, 43CH | nein | [Link](https://www.chauvetdj.com/products/shocker-fx/) |
| Chauvet DJ | Shocker Panel FX | strobe | 96 Zellen | 8CH, 18CH, 34CH, 47CH | nein | [Link](https://www.chauvetdj.com/products/shocker-panel-fx/) |
| Chauvet DJ | Shocker Panel FX IP | strobe | 96 Zellen | 8CH, 18CH, 34CH, 47CH | nein | [Link](https://www.chauvetdj.com/products/shocker-panel-fx-ip/) |
| Chauvet DJ | SlimBANK H18 ILS | bar | 18 Zellen | 6CH, 8CH, 12CH, 22CH | nein | [Link](https://www.chauvetdj.com/products/slimbank-h18-ils/) |
| Chauvet DJ | SlimBANK T18 USB | bar | 18 Zellen | 3CH, 5CH, 9CH, 13CH | nein | [Link](https://www.chauvetdj.com/products/slimbank-t18-usb/) |
| Chauvet DJ | SlimPAR 64 RGBA ILS | par |  | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-64-rgba-ils/) |
| Chauvet DJ | SlimPAR Q6 ILS | par | 6 Zellen | 4CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-q6-ils/) |
| Chauvet DJ | SlimPAR T12BT ILS | par | 12 Zellen | 3CH, 7CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-t12bt-ils/) |
| Chauvet DJ | Swarm 5 FX ILS | laser |  | 9CH | nein | [Link](https://www.chauvetdj.com/products/swarm-5-fx-ils/) |
| Chauvet DJ | Swarm Wash FX ILS | derby | 8 Zellen | 2CH, 18CH | nein | [Link](https://www.chauvetdj.com/products/swarm-wash-fx-ils/) |
| Chauvet DJ | Wash FX Hex ILS | panel |  | 3CH, 6CH, 11CH, 40CH | nein | [Link](https://www.chauvetdj.com/products/wash-fx-hex-ils/) |
| Chauvet DJ | 4BAR Flex | bar | 96 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-flex/) |
| Chauvet DJ | 4BAR Flex Q | bar | 28 Zellen | 4CH, 6CH, 19CH | nein | [Link](https://www.chauvetdj.com/products/4bar-flex-q/) |
| Chauvet DJ | 4BAR Flex T USB | bar | 28 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-flex-t-usb/) |
| Chauvet DJ | 4BAR LT QuadBT | bar | 12 Zellen | 4CH, 6CH, 19CH | nein | [Link](https://www.chauvetdj.com/products/4bar-lt-quad-bt/) |
| Chauvet DJ | 4BAR LT USB | bar | 12 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-lt-usb/) |
| Chauvet DJ | 4BAR LTBT | bar | 12 Zellen | 3CH, 5CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-lt-bt/) |
| Chauvet DJ | 4BAR Quad | bar | 28 Zellen | 4CH, 6CH, 19CH | nein | [Link](https://www.chauvetdj.com/products/4bar-quad/) |
| Chauvet DJ | 4BAR Tri USB | bar | 28 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-tri-usb/) |
| Chauvet DJ | 4BAR USB | bar | 96 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/4bar-usb/) |
| Chauvet DJ | 4Play 2 | effect | 64 Zellen | 6CH | nein | [Link](https://www.chauvetdj.com/products/4play-2/) |
| Chauvet DJ | 4PLAY CL | effect | 64 Zellen | 6CH | nein | [Link](https://www.chauvetdj.com/products/4play-cl/) |
| Chauvet DJ | 6SPOT Quad IRC | par | 6 Zellen | 4CH, 10CH, 28CH Pixel | nein | [Link](https://www.chauvetdj.com/products/6spot-quad-irc/) |
| Chauvet DJ | 6SPOT RGBW | par | 6 Zellen | 3CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/6spot-rgbw/) |
| Chauvet DJ | Abyss LED 3.0 | effect |  | 2CH | nein | [Link](https://www.chauvetdj.com/products/abyss-led-3-0/) |
| Chauvet DJ | BEAMbar | bar | 5 Zellen | 4CH, 5CH Pixel | nein | [Link](https://www.chauvetdj.com/products/beambar/) |
| Chauvet DJ | Beamer 6 FX | effect | 6 Zellen | 2CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/beamer-6-fx/) |
| Chauvet DJ | Beamer 8 | effect | 4 Zellen | 2CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/beamer-8/) |
| Chauvet DJ | BEAMshot | effect |  | 2CH, 4CH | nein | [Link](https://www.chauvetdj.com/products/beamshot/) |
| Chauvet DJ | Circus 2.0 IRC | derby | 64 Zellen | 4CH | nein | [Link](https://www.chauvetdj.com/products/circus-2-0-irc/) |
| Chauvet DJ | COLORband 3 IRC | bar | 12 Zellen | 3CH, 6CH, 8CH, 9CH, 14CH | nein | [Link](https://www.chauvetdj.com/products/colorband-3-irc/) |
| Chauvet DJ | COLORband H9 USB | bar | 9 Zellen | 6CH, 11CH, 18CH, 23CH | nein | [Link](https://www.chauvetdj.com/products/colorband-h9-usb/) |
| Chauvet DJ | COLORband Hex 9 IRC | bar | 9 Zellen | 6CH, 11CH, 18CH, 23CH | nein | [Link](https://www.chauvetdj.com/products/colorband-hex-9-irc/) |
| Chauvet DJ | COLORband PiX Mini | bar | 6 Zellen | 3CH, 4CH, 6CH, 7CH, 9CH, 18CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorband-pix-mini/) |
| Chauvet DJ | COLORband PiX USB | bar | 12 Zellen | 3CH, 4CH, 6CH, 7CH, 8CH, 9CH, 18CH, 36CH Pixel, 41CH Pixel | nein | [Link](https://www.chauvetdj.com/products/colorbandpix-usb/) |
| Chauvet DJ | COLORrail IRC IP | bar | 96 Zellen | 2CH, 3CH, 4CH, 7CH, 14CH, 26CH | nein | [Link](https://www.chauvetdj.com/products/colorrail-irc-ip/) |
| Chauvet DJ | Core 3×1 | blinder | 3 Zellen | 3CH, 5CH, 9CH Pixel, 10CH Pixel, 13CH Pixel | nein | [Link](https://www.chauvetdj.com/products/core-3x1/) |
| Chauvet DJ | COREbar 4 | bar | 4 Zellen | 3CH, 15CH Pixel | nein | [Link](https://www.chauvetdj.com/products/corebar-4/) |
| Chauvet DJ | EVE P-150 UV | par | 40 Zellen | 1CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/eve-p-150-uv/) |
| Chauvet DJ | EZLink Strip Q6BT | bar | 6 Zellen | 4CH, 6CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/ezlink-strip-q6-bt/) |
| Chauvet DJ | EZpar 56 | par | 64 Zellen | 3CH, 7CH | nein | [Link](https://www.chauvetdj.com/products/ezpar-56/) |
| Chauvet DJ | EZpar T6 USB | par | 6 Zellen | 3CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/ezpar-t6-usb/) |
| Chauvet DJ | EZrail RGBA | bar | 96 Zellen | 2CH, 4CH, 5CH, 8CH, 10CH, 18CH | nein | [Link](https://www.chauvetdj.com/products/ezrail-rgba/) |
| Chauvet DJ | Festoon | retro | 1 Zellen | 3CH, 8CH, 9CH, 60CH, 120CH, 180CH | nein | [Link](https://www.chauvetdj.com/products/festoon/) |
| Chauvet DJ | Festoon VW | retro | 1 Zellen | 3CH, 9CH, 60CH, 120CH, 180CH | nein | [Link](https://www.chauvetdj.com/products/festoon-vw/) |
| Chauvet DJ | Firebird LED | derby | 4 Zellen | 9CH | nein | [Link](https://www.chauvetdj.com/products/firebird-led/) |
| Chauvet DJ | Freedom Centerpiece | derby | 12 Zellen | 6CH, 8CH, 10CH, 16CH | nein | [Link](https://www.chauvetdj.com/products/freedom-centerpiece/) |
| Chauvet DJ | Freedom Cyc | bar | 16 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.chauvetdj.com/products/freedom-cyc/) |
| Chauvet DJ | Freedom Flex H4 IP X6 | par | 4 Zellen | 6CH, 8CH, 12CH Pixel | nein | [Link](https://www.chauvetdj.com/products/freedom-flex-h4-ip-x6/) |
| Chauvet DJ | Freedom Gobo IP | effect |  | 1CH, 3CH | nein | [Link](https://www.chauvetdj.com/products/freedom-gobo-ip/) |
| Chauvet DJ | Freedom Par Quad-4 | par | 4 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-quad-4/) |
| Chauvet DJ | Freedom Par Quad-4 IP | par | 4 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-quad-4-ip/) |
| Chauvet DJ | Freedom Par Quad-5 | par | 5 Zellen | 4CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-quad-5/) |
| Chauvet DJ | Freedom Par RGBA | par | 64 Zellen | 4CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-rgba/) |
| Chauvet DJ | Freedom Par Tri-6 | par | 6 Zellen | 3CH, 4CH, 5CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/freedom-par-tri-6/) |
| Chauvet DJ | Freedom Q1N | par |  | 4CH, 6CH, 10CH | nein | [Link](https://www.chauvetdj.com/products/freedom-q1n/) |
| Chauvet DJ | Freedom Strip Hex-4 | bar | 4 Zellen | 6CH, 8CH, 12CH Pixel, 18CH Pixel | nein | [Link](https://www.chauvetdj.com/products/freedom-strip-hex-4/) |
| Chauvet DJ | Freedom Strip Mini Quad-5 | bar | 5 Zellen | 4CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/freedom-strip-mini-quad-5/) |
| Chauvet DJ | Freedom Strip Mini RGBA | bar | 96 Zellen | 4CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/freedom-strip-mini-rgba/) |
| Chauvet DJ | Freedom Wedge Quad | par | 3 Zellen | 4CH, 6CH, 10CH Pixel | nein | [Link](https://www.chauvetdj.com/products/freedom-wedge-quad/) |
| Chauvet DJ | FXarray Q5 | effect | 5 Zellen | 3CH, 10CH, 30CH | nein | [Link](https://www.chauvetdj.com/products/fxarray-q5/) |
| Chauvet DJ | GigBAR LT | gigbar | 6 Zellen | 3CH, 6CH, 17CH | nein | [Link](https://www.chauvetdj.com/products/gig-bar-lt/) |
| Chauvet DJ | Gobo Shot 50W IRC | effect |  | 4CH | nein | [Link](https://www.chauvetdj.com/products/gobo-shot-50w-irc/) |
| Chauvet DJ | Gobo Zoom USB | effect |  | 2CH | nein | [Link](https://www.chauvetdj.com/products/gobo-zoom-usb/) |
| Chauvet DJ | Impulse 648 | strobe | 96 Zellen | 2CH | nein | [Link](https://www.chauvetdj.com/products/impulse-648/) |
| Chauvet DJ | Intimidator Barrel LED 300 | movinghead / spot |  | 8CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-barrel-led-300/) |
| Chauvet DJ | Intimidator Spot Duo 150 | movinghead / spot |  | 10CH, 17CH, 20CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-spot-duo-150/) |
| Chauvet DJ | Intimidator Wash LED 150 | movinghead / wash |  | 6CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-wash-led-150/) |
| Chauvet DJ | Intimidator Wash Zoom 250 IRC | movinghead / wash | 7 Zellen | 14CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-wash-zoom-250-irc/) |
| Chauvet DJ | Intimidator Wave IRC | movinghead / beam |  | 14CH, 34CH | nein | [Link](https://www.chauvetdj.com/products/intimidator-wave-irc/) |
| Chauvet DJ | LED Followspot 120ST | follow |  | 3CH | nein | [Link](https://www.chauvetdj.com/products/led-followspot-120st/) |
| Chauvet DJ | LED Mushroom | derby | 3 Zellen | 2CH | nein | [Link](https://www.chauvetdj.com/products/led-mushroom/) |
| Chauvet DJ | LED Techno Strobe | strobe | 96 Zellen | 3CH | nein | [Link](https://www.chauvetdj.com/products/led-techno-strobe/) |
| Chauvet DJ | LFS-75DMX | effect |  | 4CH | nein | [Link](https://www.chauvetdj.com/products/lfs-75dmx/) |
| Chauvet DJ | Line Dancer | effect | 27 Zellen | 3CH, 6CH | nein | [Link](https://www.chauvetdj.com/products/line-dancer/) |
| Chauvet DJ | Mega Trix | effect |  | 3CH | nein | [Link](https://www.chauvetdj.com/products/mega-trix/) |
| Chauvet DJ | Mini 4BAR 2.0 | bar | 96 Zellen | 3CH, 15CH | nein | [Link](https://www.chauvetdj.com/products/mini-4bar-2-0/) |
| Chauvet DJ | Obsession | derby | 1 Zellen | 7CH | nein | [Link](https://www.chauvetdj.com/products/obsession/) |
| Chauvet DJ | PiXPar 12 | par | 12 Zellen | 3CH, 9CH, 36CH Pixel | nein | [Link](https://www.chauvetdj.com/products/pixpar-12/) |
| Chauvet DJ | Radius 2.0 | derby | 1 Zellen | 3CH | nein | [Link](https://www.chauvetdj.com/products/radius-2-0/) |
| Chauvet DJ | Scorpion Burst GB | laser |  | 11CH | nein | [Link](https://www.chauvetdj.com/products/scorpion-burst-gb/) |
| Chauvet DJ | Scorpion Storm FXRG | laser |  | 7CH | nein | [Link](https://www.chauvetdj.com/products/scorpion-storm-fxrg/) |
| Chauvet DJ | Shocker 90 IRC | strobe | 90 Zellen | 2CH, 5CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/shocker-90-irc/) |
| Chauvet DJ | Shocker Panel 180 USB | strobe |  | 2CH, 5CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/shocker-panel-180-usb/) |
| Chauvet DJ | Shocker Panel 480 | strobe |  | 4CH | nein | [Link](https://www.chauvetdj.com/products/shocker-panel-480/) |
| Chauvet DJ | SlimBANK UV-18 | bar | 18 Zellen | 2CH, 5CH | nein | [Link](https://www.chauvetdj.com/products/slimbank-uv-18/) |
| Chauvet DJ | SlimBEAM Quad IRC | par | 3 Zellen | 4CH, 9CH, 16CH Pixel | nein | [Link](https://www.chauvetdj.com/products/slimbeam-quad-irc/) |
| Chauvet DJ | SlimPANEL Tri 12 IP | panel | 12 Zellen | 3CH, 4CH, 5CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/slimpanel-tri-12-ip/) |
| Chauvet DJ | SlimPANEL Tri 24 IP | panel | 24 Zellen | 3CH, 4CH, 5CH, 9CH | nein | [Link](https://www.chauvetdj.com/products/slimpanel-tri-24-ip/) |
| Chauvet DJ | SlimPAR 56 IRC IP | par | 64 Zellen | 3CH, 7CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-56-irc-ip/) |
| Chauvet DJ | SlimPAR H6 USB | par | 6 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-h6-usb/) |
| Chauvet DJ | SlimPAR HEX 3 IRC | par | 3 Zellen | 6CH, 8CH, 12CH Pixel | nein | [Link](https://www.chauvetdj.com/products/slimpar-hex-3-irc/) |
| Chauvet DJ | SlimPAR HEX 6 IRC | par | 6 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-hex-6-irc/) |
| Chauvet DJ | SlimPAR Pro QZ12 USB | par | 12 Zellen | 5CH, 6CH, 11CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-pro-qz12-usb/) |
| Chauvet DJ | SlimPAR QUAD 3 IRC | par | 3 Zellen | 4CH, 9CH Pixel | nein | [Link](https://www.chauvetdj.com/products/slimpar-quad-3-irc/) |
| Chauvet DJ | SlimPAR QUAD 6 IRC | par | 6 Zellen | 4CH, 8CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-quad-6-irc/) |
| Chauvet DJ | SlimPAR T6BT | par | 6 Zellen | 3CH, 7CH | nein | [Link](https://www.chauvetdj.com/products/slimpar-t6bt/) |
| Chauvet Professional | COLORado 1-Quad Zoom | par | 7 Zellen | 3CH, 4CH, 5CH, 6CH, 10CH, 12CH, 17CH, 25CH Pixel | nein | [Link](https://chauvetprofessional.com/product/colorado-1-quad-zoom/) |
| Chauvet Professional | COLORado 1 Quad | par | 14 Zellen | 4CH, 5CH, 6CH, 7CH, 9CH, 10CH, 13CH, 15CH | nein | [Link](https://chauvetprofessional.com/product/colorado-1-quad/) |
| Chauvet Professional | COLORado 1QS | par | 24 Zellen | 7CH, 10CH, 15CH | nein | [Link](https://chauvetprofessional.com/product/colorado-1qs/) |
| Chauvet Professional | COLORado 3 Quad Zoom | par | 7 Zellen | 1CH, 5CH, 11CH, 12CH, 13CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/colorado-3-quad-zoom/) |
| Chauvet Professional | COLORado Batten Q15 | bar | 1 Zellen | 1CH, 4CH, 6CH, 8CH, 10CH, 15CH, 45CH, 60CH, 64CH, 66CH, 76CH | nein | [Link](https://chauvetprofessional.com/product/colorado-batten-q15/) |
| Chauvet Professional | COLORado Expo W | par |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://chauvetprofessional.com/product/colorado-expo-w/) |
| Chauvet Professional | COLORado PXL Bar 8 | tiltbar | 8 Zellen | 7CH, 19CH, 24CH, 25CH, 32CH Pixel, 51CH Pixel, 64CH Pixel, 89CH Pixel, 105CH Pixel | nein | [Link](https://chauvetprofessional.com/product/colorado-pxl-bar-8/) |
| Chauvet Professional | COLORado PXL Curve 1 | movinghead / beam |  | 24CH, 31CH, 39CH, 71CH | nein | [Link](https://chauvetprofessional.com/product/colorado-pxl-curve-1/) |
| Chauvet Professional | COLORado PXL Curve 12 | tiltbar | 1 Zellen | 20CH, 53CH, 101CH, 155CH, 179CH | nein | [Link](https://chauvetprofessional.com/product/colorado-pxl-curve-12/) |
| Chauvet Professional | COLORado PXL Curve 5 | tiltbar | 5 Zellen | 120CH, 155CH, 195CH, 355CH | nein | [Link](https://chauvetprofessional.com/product/colorado-pxl-curve-5/) |
| Chauvet Professional | COLORado Solo Bar 1 | bar | 1 Zellen | 1CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-bar-1/) |
| Chauvet Professional | COLORado Solo Bar 4 | bar | 1 Zellen | 1CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-bar-4/) |
| Chauvet Professional | COLORado Solo Bar 6 | bar | 1 Zellen | 1CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-bar-6/) |
| Chauvet Professional | COLORado Solo Batten 4 | bar | 48 Zellen | 1CH, 3CH, 4CH, 5CH, 8CH, 9CH, 10CH, 13CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-batten-4/) |
| Chauvet Professional | COLORado Solo Batten | bar | 96 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 8CH, 9CH, 10CH, 13CH, 15CH, 16CH, 17CH, 19CH, 20CH, 30CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-batten/) |
| Chauvet Professional | COLORado Solo Edge 1 | bar | 1 Zellen | 1CH, 5CH, 6CH, 7CH, 11CH, 12CH, 13CH, 14CH, 21CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-edge-1/) |
| Chauvet Professional | COLORado Solo Edge 3 | bar | 1 Zellen | 1CH, 5CH, 6CH, 7CH, 11CH, 12CH, 13CH, 14CH, 21CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-edge-3/) |
| Chauvet Professional | COLORado Solo Pod E | par | 12 Zellen | 1CH, 5CH, 7CH, 11CH, 13CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/colorado-solo-pod-e/) |
| Chauvet Professional | COLORdash Accent 3 | par |  | 4CH, 7CH, 11CH | nein | [Link](https://chauvetprofessional.com/product/colordash-accent-3/) |
| Chauvet Professional | COLORdash Accent 5X IP | par |  | 6CH, 8CH, 9CH, 13CH, 14CH | nein | [Link](https://chauvetprofessional.com/product/colordash-accent-5x-ip/) |
| Chauvet Professional | COLORdash Batten H12X IP | bar | 12 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH, 42CH Pixel, 47CH Pixel, 59CH Pixel | nein | [Link](https://chauvetprofessional.com/product/colordash-batten-h12x-ip/) |
| Chauvet Professional | COLORdash Batten-Quad 12 | bar | 12 Zellen | 4CH, 6CH, 10CH, 48CH Pixel, 52CH Pixel | nein | [Link](https://chauvetprofessional.com/product/colordash-batten-quad-12/) |
| Chauvet Professional | COLORdash PAR Bar 4 | bar | 1 Zellen | 6CH, 8CH, 9CH, 14CH, 24CH, 32CH, 36CH, 41CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-bar-4/) |
| Chauvet Professional | COLORdash Par H12IP | par | 12 Zellen | 6CH, 8CH, 13CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-h12ip/) |
| Chauvet Professional | COLORdash PAR H18 XIP | par | 18 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-h18-xip/) |
| Chauvet Professional | Colordash Par H18X M | par | 18 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-h18x-m/) |
| Chauvet Professional | COLORdash Par H7IP | par | 7 Zellen | 6CH, 8CH, 13CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-h7ip/) |
| Chauvet Professional | COLORdash Par H7X IP | par | 7 Zellen | 6CH, 8CH, 9CH, 13CH, 14CH | nein | [Link](https://chauvetprofessional.com/product/colordash-par-h7x-ip/) |
| Chauvet Professional | ÉPIX Flex 20 | bar | 240 Zellen | 17CH, 34CH | nein | [Link](https://chauvetprofessional.com/product/epix-flex-20/) |
| Chauvet Professional | ÉPIX Line 10 IP S | bar | 1 Zellen | 2CH, 5CH, 10CH, 18CH, 25CH, 50CH, 150CH | nein | [Link](https://chauvetprofessional.com/product/epix-line-10-ip-s/) |
| Chauvet Professional | ÉPIX Line 10 IP | bar | 1 Zellen | 2CH, 5CH, 10CH, 18CH, 50CH, 255CH, 300CH | nein | [Link](https://chauvetprofessional.com/product/epix-line-10-ip/) |
| Chauvet Professional | Maverick Force 1 Spot | movinghead / spot |  | 25CH, 32CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-1-spot/) |
| Chauvet Professional | Maverick Force 2 Profile | movinghead / profile |  | 33CH, 50CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-2-profile/) |
| Chauvet Professional | Maverick Force 2 SoloWash | movinghead / wash |  | 21CH, 27CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-2-solowash/) |
| Chauvet Professional | Maverick Force 3 Profile | movinghead / profile |  | 37CH, 53CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-3-profile/) |
| Chauvet Professional | Maverick Force S Profile | movinghead / profile |  | 31CH, 47CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-s-profile/) |
| Chauvet Professional | Maverick Force S Spot | movinghead / spot |  | 22CH, 29CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-s-spot/) |
| Chauvet Professional | Maverick Force X Profile | movinghead / profile |  | 31CH, 47CH | nein | [Link](https://chauvetprofessional.com/product/maverick-force-x-profile/) |
| Chauvet Professional | Maverick MK Pyxis | movinghead / wash | 9 Zellen | 26CH, 66CH, 113CH, 131CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk-pyxis/) |
| Chauvet Professional | Maverick MK1 Hybrid | movinghead / spot |  | 27CH, 30CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk1-hybrid/) |
| Chauvet Professional | Maverick MK1 Spot | movinghead / spot |  | 22CH, 29CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk1-spot/) |
| Chauvet Professional | Maverick MK2 Profile | movinghead / profile |  | 33CH, 50CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk2-profile/) |
| Chauvet Professional | Maverick MK2 Spot | movinghead / spot |  | 24CH, 32CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk2-spot/) |
| Chauvet Professional | Maverick MK2 Wash | movinghead / wash | 12 Zellen | 20CH, 69CH, 115CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk2-wash/) |
| Chauvet Professional | Maverick MK3 Profile | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://chauvetprofessional.com/product/maverick-mk3-profile/) |
| Chauvet Professional | Maverick Storm 1 Beam | movinghead / beam |  | 19CH, 21CH | nein | [Link](https://chauvetprofessional.com/product/maverick-storm-1-beam/) |
| Chauvet Professional | Maverick Storm 2 Profile M | movinghead / profile |  | 32CH, 48CH | nein | [Link](https://chauvetprofessional.com/product/maverick-storm-2-profile-m/) |
| Chauvet Professional | Maverick Storm 3 BeamWash | movinghead / wash | 28 Zellen | 20CH, 32CH, 38CH, 180CH, 336CH, 416CH, 424CH | nein | [Link](https://chauvetprofessional.com/product/maverick-storm-3-beamwash/) |
| Chauvet Professional | Maverick Storm 4 SoloWash | movinghead / wash |  | 31CH, 46CH | nein | [Link](https://chauvetprofessional.com/product/maverick-storm-4-solowash/) |
| Chauvet Professional | Maverick Storm LT | effect |  | 37CH, 53CH | nein | [Link](https://chauvetprofessional.com/product/maverick-storm-lt/) |
| Chauvet Professional | onAir Flex 12 | movinghead / spot |  | 8CH, 10CH | nein | [Link](https://chauvetprofessional.com/product/onair-flex-12/) |
| Chauvet Professional | onAir Panel 2 IP | panel | 64 Zellen | 1CH, 3CH, 4CH, 5CH, 6CH, 8CH, 11CH, 15CH, 16CH, 18CH, 23CH, 32CH | nein | [Link](https://chauvetprofessional.com/product/onair-panel-2-ip/) |
| Chauvet Professional | onAir Panel 3 IP | panel | 64 Zellen | 1CH, 3CH, 4CH, 5CH, 6CH, 8CH, 11CH, 12CH, 15CH, 19CH, 24CH | nein | [Link](https://chauvetprofessional.com/product/onair-panel-3-ip/) |
| Chauvet Professional | onAir Panel Min IP | panel |  | 1CH, 3CH, 4CH, 5CH, 6CH, 8CH, 10CH, 11CH, 15CH | nein | [Link](https://chauvetprofessional.com/product/onair-panel-min-ip/) |
| Chauvet Professional | Ovation B-1965FC | panel |  | 1CH, 3CH, 4CH, 5CH, 7CH, 8CH, 9CH, 10CH, 17CH, 21CH, 28CH, 35CH, 45CH, 52CH, 59CH, 70CH, 96CH | nein | [Link](https://chauvetprofessional.com/product/ovation-b-1965fc/) |
| Chauvet Professional | Ovation B-2805FC | panel |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 8CH, 9CH, 10CH, 15CH, 17CH, 19CH, 20CH, 25CH, 30CH, 31CH, 33CH, 38CH, 40CH, 43CH, 50CH, 63CH, 70CH, 73CH, 83CH, 100CH, 135CH | nein | [Link](https://chauvetprofessional.com/product/ovation-b-2805fc/) |
| Chauvet Professional | Ovation B-565FC | panel |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 8CH, 9CH, 10CH, 15CH, 17CH, 19CH, 20CH, 31CH | nein | [Link](https://chauvetprofessional.com/product/ovation-b-565fc/) |
| Chauvet Professional | Ovation C-640FC | panel |  | 3CH, 4CH, 5CH, 6CH, 7CH, 8CH, 12CH, 18CH, 24CH | nein | [Link](https://chauvetprofessional.com/product/ovation-c-640fc/) |
| Chauvet Professional | Ovation C-805FC | panel |  | 3CH, 4CH, 5CH, 6CH, 7CH, 8CH, 12CH, 18CH, 24CH | nein | [Link](https://chauvetprofessional.com/product/ovation-c-805fc/) |
| Chauvet Professional | Ovation CYC 3 FC | panel |  | 1CH, 3CH, 5CH, 7CH, 10CH, 12CH, 13CH, 16CH, 17CH, 33CH | nein | [Link](https://chauvetprofessional.com/product/ovation-cyc-3-fc/) |
| Chauvet Professional | Ovation E-160WW | profile |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-160ww/) |
| Chauvet Professional | Ovation E-2 FC | profile |  | 1CH, 4CH, 5CH, 7CH, 11CH, 13CH, 17CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-2-fc/) |
| Chauvet Professional | Ovation E-260WW / E-260CW | profile |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-260ww-e-260cw/) |
| Chauvet Professional | Ovation E-260WW IP | profile |  | 2CH, 3CH, 4CH, 7CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-260ww-ip/) |
| Chauvet Professional | Ovation E-4WW IP | profile |  | 2CH, 3CH, 4CH, 7CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-4ww-ip/) |
| Chauvet Professional | Ovation E-910FC IP | profile |  | 1CH, 4CH, 6CH, 8CH, 11CH, 13CH, 14CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-910fc-ip/) |
| Chauvet Professional | Ovation E-930VW | profile |  | 3CH, 5CH, 6CH, 8CH, 11CH, 15CH, 17CH | nein | [Link](https://chauvetprofessional.com/product/ovation-e-930vw/) |
| Chauvet Professional | Ovation ED-200WW | profile |  | 1CH, 2CH, 3CH | nein | [Link](https://chauvetprofessional.com/product/ovation-ed-200ww/) |
| Chauvet Professional | Ovation F-145WW | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-145ww/) |
| Chauvet Professional | Ovation F-265WW | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-265ww/) |
| Chauvet Professional | Ovation F-415VW | fresnel |  | 2CH, 5CH, 7CH, 10CH, 14CH, 17CH, 19CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-415vw/) |
| Chauvet Professional | Ovation F-55FC | fresnel |  | 3CH, 5CH, 7CH, 10CH, 12CH, 13CH, 15CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-55fc/) |
| Chauvet Professional | Ovation F-55WW | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-55ww/) |
| Chauvet Professional | Ovation F-95WW | fresnel |  | 1CH, 2CH, 3CH | nein | [Link](https://chauvetprofessional.com/product/ovation-f-95ww/) |
| Chauvet Professional | Ovation FD-105WW | fresnel |  | 1CH, 2CH, 3CH | nein | [Link](https://chauvetprofessional.com/product/ovation-fd-105ww/) |
| Chauvet Professional | Ovation FD-205WW | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://chauvetprofessional.com/product/ovation-fd-205ww/) |
| Chauvet Professional | Ovation H-265WW | panel |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/ovation-h-265ww/) |
| Chauvet Professional | Ovation H-55FC | panel |  | 4CH, 5CH, 8CH, 11CH, 13CH, 14CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/ovation-h-55fc/) |
| Chauvet Professional | Ovation H-55WW | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://chauvetprofessional.com/product/ovation-h-55ww/) |
| Chauvet Professional | Ovation P-56UV | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/ovation-p-56uv/) |
| Chauvet Professional | Ovation P-56VW | par | 48 Zellen | 3CH, 5CH, 6CH, 8CH, 11CH, 15CH, 17CH | nein | [Link](https://chauvetprofessional.com/product/ovation-p-56vw/) |
| Chauvet Professional | Ovation P-56WW | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/ovation-p-56ww/) |
| Chauvet Professional | Ovation Rêve E3 IP | profile |  | 1CH, 5CH, 6CH, 8CH, 12CH, 14CH, 18CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-e3-ip/) |
| Chauvet Professional | Ovation Rêve E3 | profile |  | 1CH, 5CH, 6CH, 8CH, 12CH, 14CH, 18CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-e3/) |
| Chauvet Professional | Ovation Rêve F3 IP | fresnel |  | 1CH, 5CH, 6CH, 8CH, 12CH, 14CH, 18CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-f3-ip/) |
| Chauvet Professional | Ovation Rêve F3 | fresnel |  | 1CH, 5CH, 6CH, 8CH, 12CH, 14CH, 18CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-f3/) |
| Chauvet Professional | Ovation Rêve P2 IP | par |  | 1CH, 4CH, 6CH, 8CH, 12CH, 14CH, 15CH, 19CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-p2-ip/) |
| Chauvet Professional | Ovation Rêve P3 IP | par | 64 Zellen | 1CH, 4CH, 5CH, 7CH, 11CH, 13CH, 17CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-p3-ip/) |
| Chauvet Professional | Rogue Outcast 1 BeamWash M | movinghead / wash | 7 Zellen | 15CH, 24CH, 30CH Pixel, 64CH Pixel, 111CH Pixel, 135CH Pixel | nein | [Link](https://chauvetprofessional.com/product/rogue-outcast-1-beamwash-m/) |
| Chauvet Professional | Rogue Outcast 1 Hybrid | movinghead / spot |  | 20CH, 25CH | nein | [Link](https://chauvetprofessional.com/product/rogue-outcast-1-hybrid/) |
| Chauvet Professional | Rogue Outcast 1L Beam | movinghead / beam |  | 17CH, 19CH | nein | [Link](https://chauvetprofessional.com/product/rogue-outcast-1l-beam/) |
| Chauvet Professional | Rogue Outcast 2X Wash M | movinghead / wash | 19 Zellen | 15CH, 17CH, 22CH, 23CH, 33CH, 54CH, 55CH, 56CH | nein | [Link](https://chauvetprofessional.com/product/rogue-outcast-2x-wash-m/) |
| Chauvet Professional | Rogue Outcast 3X Wash | movinghead / wash | 37 Zellen | 21CH, 62CH, 71CH, 107CH | nein | [Link](https://chauvetprofessional.com/product/rogue-outcast-3x-wash/) |
| Chauvet Professional | Rogue R1X Spot | movinghead / spot |  | 16CH, 19CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r1x-spot/) |
| Chauvet Professional | Rogue R1X Wash | movinghead / wash | 7 Zellen | 14CH, 15CH, 19CH, 21CH Pixel | nein | [Link](https://chauvetprofessional.com/product/rogue-r1x-wash/) |
| Chauvet Professional | Rogue R2X Beam | movinghead / beam |  | 16CH, 19CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r2x-beam/) |
| Chauvet Professional | Rogue R2X Wash VW | movinghead / wash | 19 Zellen | 15CH, 18CH, 23CH Pixel, 34CH Pixel, 36CH Pixel | nein | [Link](https://chauvetprofessional.com/product/rogue-r2x-wash-vw/) |
| Chauvet Professional | Rogue R2X Wash | movinghead / wash | 19 Zellen | 15CH, 17CH, 22CH, 33CH, 54CH, 56CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r2x-wash/) |
| Chauvet Professional | Rogue R3 Spot | movinghead / spot |  | 19CH, 25CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r3-spot/) |
| Chauvet Professional | Rogue R3E Spot | movinghead / spot |  | 19CH, 25CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r3e-spot/) |
| Chauvet Professional | Rogue R3X Wash | movinghead / wash | 37 Zellen | 21CH, 27CH, 62CH, 71CH, 107CH | nein | [Link](https://chauvetprofessional.com/product/rogue-r3x-wash/) |
| Chauvet Professional | STRIKE Array 1 | blinder |  | 1CH, 2CH, 5CH, 9CH, 14CH, 23CH, 26CH, 43CH, 46CH | nein | [Link](https://chauvetprofessional.com/product/strike-array-1/) |
| Chauvet Professional | STRIKE Array 4 | blinder | 64 Zellen | 1CH, 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://chauvetprofessional.com/product/strike-array-4/) |
| Chauvet Professional | STRIKE Array Ultra | blinder |  | 4CH, 6CH, 11CH, 14CH, 18CH, 19CH, 24CH, 27CH, 47CH, 90CH | nein | [Link](https://chauvetprofessional.com/product/strike-array-ultra/) |
| Chauvet Professional | STRIKE Bolt 1C | strobe | 66 Zellen | 10CH, 11CH, 13CH, 17CH, 20CH, 25CH, 27CH, 40CH | nein | [Link](https://chauvetprofessional.com/product/strike-bolt-1c/) |
| Chauvet Professional | STRIKE Saber 10 | strobe | 10 Zellen | 1CH, 3CH, 6CH, 13CH Pixel, 22CH Pixel, 26CH Pixel | nein | [Link](https://chauvetprofessional.com/product/strike-saber-10/) |
| Chauvet Professional | STRIKE Saber | strobe |  | 1CH, 3CH, 7CH, 10CH, 11CH, 20CH, 27CH | nein | [Link](https://chauvetprofessional.com/product/strike-saber/) |
| Chauvet Professional | WELL BATTEN 14 | bar | 28 Zellen | 5CH, 8CH, 15CH, 66CH, 85CH Pixel | nein | [Link](https://chauvetprofessional.com/product/well-batten-14/) |
| Chauvet Professional | WELL FIT X | par | 9 Zellen | 5CH, 8CH, 12CH | nein | [Link](https://chauvetprofessional.com/product/well-fit-x/) |
| Chauvet Professional | WELL Gobo | effect |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://chauvetprofessional.com/product/well-gobo/) |
| Chauvet Professional | WELL Pad | panel | 64 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://chauvetprofessional.com/product/well-pad/) |
| Chauvet Professional | WELL PANEL X | panel | 40 Zellen | 5CH, 8CH, 9CH, 12CH, 16CH | nein | [Link](https://chauvetprofessional.com/product/well-panel-x/) |
| Chauvet Professional | WELL PANEL | panel | 24 Zellen | 4CH, 8CH, 12CH, 13CH, 21CH | nein | [Link](https://chauvetprofessional.com/product/well-panel/) |
| Chauvet Professional | WELL POD 2 | par | 7 Zellen | 5CH, 8CH, 12CH | nein | [Link](https://chauvetprofessional.com/product/well-pod-2/) |
| Chauvet Professional | WELL POD 3 | par | 19 Zellen | 5CH, 8CH, 12CH | nein | [Link](https://chauvetprofessional.com/product/well-pod-3/) |
| Chauvet Professional | WELL STX 180 | bar | 96 Zellen | 4CH, 15CH, 64CH, 67CH | nein | [Link](https://chauvetprofessional.com/product/well-stx-180/) |
| Chauvet Professional | WELL STX 360 | bar | 96 Zellen | 4CH, 15CH, 64CH, 67CH | nein | [Link](https://chauvetprofessional.com/product/well-stx-360/) |
| Chauvet Professional | Ovation Rêve E2 | profile |  | 1CH, 5CH, 6CH, 8CH, 12CH, 14CH, 18CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-e2/) |
| Chauvet Professional | Ovation Rêve F2 | fresnel |  | 1CH, 5CH, 7CH, 9CH, 13CH, 15CH, 16CH, 20CH | nein | [Link](https://chauvetprofessional.com/product/ovation-reve-f2/) |
| CKC Lighting | Proxima Hybrid | movinghead / spot |  | 29CH, 36CH | nein | [Link](https://www.ckclighting.com/item/220.html) |
| CKC Lighting | MP5X | movinghead / beam |  | 23CH, 28CH | nein | [Link](https://www.ckclighting.com/item/221.html) |
| CKC Lighting | Wash Z500 | movinghead / wash |  | 18CH, 25CH | nein | [Link](https://www.ckclighting.com/item/222.html) |
| CKC Lighting | EV Block IP | strobe | 96 Zellen | 14CH, 32CH, 37CH, 47CH, 77CH, 126CH, 137CH | nein | [Link](https://www.ckclighting.com/item/223.html) |
| CKC Lighting | UV S100 IP | panel |  | 1CH, 2CH, 3CH | nein | [Link](https://www.ckclighting.com/item/224.html) |
| CKC Lighting | Rotor | effect |  | 5CH, 12CH, 33CH, 119CH | nein | [Link](https://www.ckclighting.com/item/225.html) |
| CKC Lighting | CYC X | panel |  | 1CH, 2CH, 4CH, 11CH, 13CH, 16CH, 19CH, 20CH, 31CH, 32CH, 56CH | nein | [Link](https://www.ckclighting.com/item/226.html) |
| CKC Lighting | W1000 | par |  | 8CH, 14CH, 32CH | nein | [Link](https://www.ckclighting.com/item/227.html) |
| CKC Lighting | Fresnel 350TW | fresnel |  | 1CH, 7CH, 10CH, 12CH, 15CH, 19CH | nein | [Link](https://www.ckclighting.com/item/228.html) |
| CKC Lighting | Gobo Projector 1000 | effect |  | 32CH, 47CH | nein | [Link](https://www.ckclighting.com/item/229.html) |
| CKC Lighting | ARC W1000 | panel |  | 1CH, 2CH, 8CH, 16CH | nein | [Link](https://www.ckclighting.com/item/230.html) |
| CKC Lighting | ARC Par 18 IP | panel |  | 4CH, 8CH, 16CH | nein | [Link](https://www.ckclighting.com/item/231.html) |
| CKC Lighting | Wash ZP480 | movinghead / wash |  | 27CH, 31CH, 39CH | nein | [Link](https://www.ckclighting.com/item/232.html) |
| CKC Lighting | IP Flood 150FC | panel |  | 1CH, 2CH, 3CH, 4CH, 6CH | nein | [Link](https://www.ckclighting.com/item/233.html) |
| CKC Lighting | Profile 500FC IP | profile |  | 1CH, 4CH, 6CH, 9CH, 10CH, 11CH, 13CH, 15CH, 19CH | nein | [Link](https://www.ckclighting.com/item/234.html) |
| CKC Lighting | ZB Par 7 | movinghead / wash | 7 Zellen | 5CH, 6CH, 12CH, 13CH, 16CH, 18CH | nein | [Link](https://www.ckclighting.com/item/235.html) |
| CKC Lighting | V15 Pro | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/236.html) |
| CKC Lighting | V15 | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/237.html) |
| CKC Lighting | AK M Blast | strobe | 96 Zellen | 24CH, 55CH, 91CH, 99CH, 133CH, 140CH, 177CH, 180CH | nein | [Link](https://www.ckclighting.com/item/238.html) |
| CKC Lighting | Proxima X | movinghead / beam |  | 23CH, 28CH | nein | [Link](https://www.ckclighting.com/item/239.html) |
| CKC Lighting | VH20 | movinghead / spot |  | 27CH, 32CH | nein | [Link](https://www.ckclighting.com/item/240.html) |
| CKC Lighting | CYC M | panel |  | 1CH, 2CH, 4CH, 11CH, 13CH, 16CH, 19CH, 20CH, 32CH | nein | [Link](https://www.ckclighting.com/item/241.html) |
| CKC Lighting | FC Profile 400 | profile |  | 1CH, 2CH, 5CH, 10CH, 12CH, 17CH, 21CH | nein | [Link](https://www.ckclighting.com/item/242.html) |
| CKC Lighting | Par Z19 IP | par | 19 Zellen | 7CH, 9CH, 10CH, 14CH | nein | [Link](https://www.ckclighting.com/item/243.html) |
| CKC Lighting | Gobo Projector 500FC | effect |  | 32CH, 34CH, 49CH, 53CH | nein | [Link](https://www.ckclighting.com/item/244.html) |
| CKC Lighting | IP Flood 100WW | panel |  | 1CH, 2CH | nein | [Link](https://www.ckclighting.com/item/245.html) |
| CKC Lighting | ARC W700 | panel |  | 1CH, 2CH, 8CH, 16CH | nein | [Link](https://www.ckclighting.com/item/246.html) |
| CKC Lighting | ARC Par 12 IP | panel |  | 2CH, 4CH, 5CH, 6CH, 8CH | nein | [Link](https://www.ckclighting.com/item/247.html) |
| CKC Lighting | V4 Wash | movinghead / wash |  | 28CH, 36CH | nein | [Link](https://www.ckclighting.com/item/248.html) |
| CKC Lighting | MP5T | movinghead / beam |  | 20CH, 22CH | nein | [Link](https://www.ckclighting.com/item/249.html) |
| CKC Lighting | V15 IP | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/250.html) |
| CKC Lighting | ZB19X IP | movinghead / wash | 19 Zellen | 17CH, 21CH, 93CH Pixel | nein | [Link](https://www.ckclighting.com/item/251.html) |
| CKC Lighting | V10 | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/252.html) |
| CKC Lighting | V10 Pro | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/253.html) |
| CKC Lighting | VH10 | movinghead / spot |  | 28CH, 33CH | nein | [Link](https://www.ckclighting.com/item/254.html) |
| CKC Lighting | Wash Z350 | movinghead / wash |  | 15CH, 16CH, 17CH, 19CH | nein | [Link](https://www.ckclighting.com/item/255.html) |
| CKC Lighting | AK Blast | strobe | 96 Zellen | 15CH, 50CH, 158CH | nein | [Link](https://www.ckclighting.com/item/256.html) |
| CKC Lighting | UV F100 IP | panel |  | 2CH, 3CH, 6CH | nein | [Link](https://www.ckclighting.com/item/257.html) |
| CKC Lighting | Legend | retro | 1 Zellen | 5CH, 6CH, 7CH | nein | [Link](https://www.ckclighting.com/item/258.html) |
| CKC Lighting | W700 | par |  | 1CH, 2CH, 3CH, 4CH, 8CH, 10CH, 16CH, 38CH, 80CH, 82CH, 88CH | nein | [Link](https://www.ckclighting.com/item/259.html) |
| CKC Lighting | FC Profile 300 | profile |  | 3CH, 6CH, 7CH, 9CH, 12CH | nein | [Link](https://www.ckclighting.com/item/260.html) |
| CKC Lighting | Fresnel 180TW | fresnel |  | 1CH, 2CH, 3CH, 6CH, 11CH, 13CH | nein | [Link](https://www.ckclighting.com/item/261.html) |
| CKC Lighting | EV Stick IP | strobe | 96 Zellen | 11CH, 14CH, 16CH, 32CH, 34CH, 39CH, 75CH, 112CH, 123CH | nein | [Link](https://www.ckclighting.com/item/262.html) |
| CKC Lighting | PAR Z180 IP | par |  | 6CH, 9CH, 14CH | nein | [Link](https://www.ckclighting.com/item/263.html) |
| CKC Lighting | Mini Profile 50 | profile |  | 2CH, 3CH, 6CH | nein | [Link](https://www.ckclighting.com/item/265.html) |
| CKC Lighting | Profile 300 | profile |  | 1CH, 3CH, 4CH | nein | [Link](https://www.ckclighting.com/item/266.html) |
| CKC Lighting | V8 | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/267.html) |
| CKC Lighting | Fresnel 150TW | fresnel |  | 1CH, 6CH, 9CH, 11CH, 14CH, 18CH | nein | [Link](https://www.ckclighting.com/item/268.html) |
| CKC Lighting | EV Block | strobe | 96 Zellen | 14CH, 32CH, 37CH, 47CH, 77CH, 126CH, 137CH | nein | [Link](https://www.ckclighting.com/item/269.html) |
| CKC Lighting | ZB Par 12s | par | 12 Zellen | 6CH, 9CH, 10CH, 15CH, 18CH | nein | [Link](https://www.ckclighting.com/item/270.html) |
| CKC Lighting | Gobo Projector 400 | effect |  | 29CH, 49CH | nein | [Link](https://www.ckclighting.com/item/271.html) |
| CKC Lighting | IP Flood 60FC | panel |  | 1CH, 2CH, 3CH, 4CH, 6CH | nein | [Link](https://www.ckclighting.com/item/272.html) |
| CKC Lighting | ARC W350 | panel |  | 8CH, 14CH, 16CH | nein | [Link](https://www.ckclighting.com/item/273.html) |
| CKC Lighting | ARC Par 7 IP | panel |  | 2CH, 4CH, 5CH, 6CH, 8CH | nein | [Link](https://www.ckclighting.com/item/274.html) |
| CKC Lighting | VH5 | movinghead / spot |  | 19CH, 24CH | nein | [Link](https://www.ckclighting.com/item/275.html) |
| CKC Lighting | P10 | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/276.html) |
| CKC Lighting | PAR Z180 | par |  | 2CH, 4CH, 5CH, 6CH, 7CH, 8CH, 9CH, 10CH, 12CH, 13CH | nein | [Link](https://www.ckclighting.com/item/277.html) |
| CKC Lighting | FC Profile 200 | profile |  | 1CH, 3CH, 5CH, 6CH, 7CH, 9CH, 10CH, 11CH, 15CH, 19CH | nein | [Link](https://www.ckclighting.com/item/278.html) |
| CKC Lighting | V8 IP | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/279.html) |
| CKC Lighting | V8 Pro | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/280.html) |
| CKC Lighting | MP5W | movinghead / beam |  | 17CH, 20CH | nein | [Link](https://www.ckclighting.com/item/281.html) |
| CKC Lighting | Wash Z120 | movinghead / wash |  | 15CH, 16CH, 17CH, 19CH | nein | [Link](https://www.ckclighting.com/item/282.html) |
| CKC Lighting | AK Storm Bar | strobe | 96 Zellen | 15CH, 80CH, 137CH | nein | [Link](https://www.ckclighting.com/item/283.html) |
| CKC Lighting | UV Par 100 IP | panel |  | 1CH, 2CH, 4CH | nein | [Link](https://www.ckclighting.com/item/284.html) |
| CKC Lighting | Vintage | retro | 1 Zellen | 5CH, 6CH, 7CH | nein | [Link](https://www.ckclighting.com/item/285.html) |
| CKC Lighting | W350 | par |  | 3CH, 4CH, 8CH, 10CH, 16CH, 48CH, 50CH, 56CH | nein | [Link](https://www.ckclighting.com/item/286.html) |
| CKC Lighting | FC Mini Profile 50 | profile |  | 2CH, 4CH, 5CH, 6CH, 13CH, 14CH, 16CH | nein | [Link](https://www.ckclighting.com/item/287.html) |
| CKC Lighting | Fresnel 80TW | fresnel |  | 1CH, 6CH, 9CH, 11CH, 14CH, 18CH | nein | [Link](https://www.ckclighting.com/item/288.html) |
| CKC Lighting | Gobo Projector 380 | effect |  | 30CH | nein | [Link](https://www.ckclighting.com/item/289.html) |
| CKC Lighting | IP Flood 50WW | panel |  | 1CH, 3CH | nein | [Link](https://www.ckclighting.com/item/290.html) |
| CKC Lighting | ARC W100 | panel |  | 8CH, 14CH | nein | [Link](https://www.ckclighting.com/item/291.html) |
| CKC Lighting | MP5 | movinghead / beam |  | 19CH, 22CH, 25CH | nein | [Link](https://www.ckclighting.com/item/292.html) |
| CKC Lighting | V6 IP | movinghead / profile |  | 36CH, 50CH, 57CH | nein | [Link](https://www.ckclighting.com/item/293.html) |
| CKC Lighting | V6 | movinghead / profile |  | 33CH, 38CH, 43CH | nein | [Link](https://www.ckclighting.com/item/294.html) |
| CKC Lighting | Wash ZB19 | movinghead / wash | 19 Zellen | 17CH, 21CH, 93CH Pixel | nein | [Link](https://www.ckclighting.com/item/295.html) |
| CKC Lighting | EV Stick | strobe | 96 Zellen | 11CH, 14CH, 16CH, 32CH, 34CH, 39CH, 75CH, 112CH, 123CH | nein | [Link](https://www.ckclighting.com/item/296.html) |
| CKC Lighting | UV P50 IP | panel |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.ckclighting.com/item/297.html) |
| CKC Lighting | UV P40 IP | panel |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.ckclighting.com/item/298.html) |
| CKC Lighting | W100 | par | 9 Zellen | 1CH, 2CH, 3CH, 4CH, 8CH, 10CH, 16CH, 17CH, 24CH, 26CH, 32CH Pixel | nein | [Link](https://www.ckclighting.com/item/299.html) |
| CKC Lighting | Mini Profile 40 | profile |  | 1CH, 2CH, 4CH | nein | [Link](https://www.ckclighting.com/item/300.html) |
| CKC Lighting | Fresnel 60FC | fresnel |  | 5CH, 7CH | nein | [Link](https://www.ckclighting.com/item/301.html) |
| CKC Lighting | V4 | movinghead / profile |  | 38CH, 52CH | nein | [Link](https://www.ckclighting.com/item/303.html) |
| CKC Lighting | Gobo Projector 200 | effect |  | 12CH | nein | [Link](https://www.ckclighting.com/item/304.html) |
| CKC Lighting | L Par 12 | par | 12 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH | nein | [Link](https://www.ckclighting.com/item/305.html) |
| CKC Lighting | L Par 18 | par | 18 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH, 16CH | nein | [Link](https://www.ckclighting.com/item/306.html) |
| CKC Lighting | ARC Par 1 IP | panel |  | 6CH, 12CH, 18CH | nein | [Link](https://www.ckclighting.com/item/307.html) |
| CKC Lighting | Tourist M5 | movinghead / profile |  | 38CH, 56CH | nein | [Link](https://www.ckclighting.com/item/308.html) |
| CKC Lighting | V6 Pro | movinghead / profile |  | 33CH, 38CH, 43CH | nein | [Link](https://www.ckclighting.com/item/309.html) |
| CKC Lighting | Wash ZB7 | movinghead / wash | 7 Zellen | 17CH, 21CH, 45CH Pixel | nein | [Link](https://www.ckclighting.com/item/310.html) |
| CKC Lighting | Fresnel 350 | fresnel |  | 2CH, 3CH, 4CH, 6CH | nein | [Link](https://www.ckclighting.com/item/312.html) |
| CKC Lighting | IP PixBar 100 | bar | 60 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 9CH, 10CH, 12CH, 22CH, 25CH, 27CH, 32CH | nein | [Link](https://www.ckclighting.com/item/313.html) |
| CKC Lighting | L Par 5 | par | 5 Zellen | 4CH, 7CH, 8CH, 10CH, 13CH, 16CH Pixel | nein | [Link](https://www.ckclighting.com/item/314.html) |
| CKC Lighting | V4s | movinghead / spot |  | 24CH, 29CH, 34CH | nein | [Link](https://www.ckclighting.com/item/315.html) |
| CKC Lighting | SP4 | movinghead / profile |  | 36CH, 40CH, 51CH | nein | [Link](https://www.ckclighting.com/item/317.html) |
| CKC Lighting | FC Par 7 | panel |  | 1CH, 3CH, 6CH, 7CH, 8CH, 9CH, 11CH, 12CH, 14CH, 20CH | nein | [Link](https://www.ckclighting.com/item/318.html) |
| CKC Lighting | Fresnel 400DW | fresnel | 2 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH | nein | [Link](https://www.ckclighting.com/item/319.html) |
| CKC Lighting | FC Par 14 | panel |  | 1CH, 3CH, 6CH, 7CH, 8CH, 9CH, 11CH, 12CH, 14CH, 20CH | nein | [Link](https://www.ckclighting.com/item/320.html) |
| CKC Lighting | Gobo Projector 100 | effect |  | 6CH | nein | [Link](https://www.ckclighting.com/item/321.html) |
| CKC Lighting | FlatPar 1812 | par | 18 Zellen | 6CH, 7CH, 8CH, 12CH | nein | [Link](https://www.ckclighting.com/item/324.html) |
| CKC Lighting | PixBar 1212 | bar | 12 Zellen | 6CH, 7CH, 11CH, 13CH, 36CH, 72CH Pixel, 75CH Pixel, 79CH Pixel | nein | [Link](https://www.ckclighting.com/item/325.html) |
| CKC Lighting | Fresnel 100DW | fresnel | 2 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.ckclighting.com/item/326.html) |
| CKC Lighting | Fresnel 250 | fresnel |  | 3CH | nein | [Link](https://www.ckclighting.com/item/327.html) |
| CKC Lighting | Fresnel 150 | fresnel |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.ckclighting.com/item/328.html) |
| CKC Lighting | IP PixBar 200 | bar | 96 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 9CH, 10CH, 12CH, 37CH, 50CH, 52CH, 57CH | nein | [Link](https://www.ckclighting.com/item/329.html) |
| CKC Lighting | IP FlatPar 712 | par | 7 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.ckclighting.com/item/330.html) |
| CKC Lighting | IP FlatPar 1212 | par | 12 Zellen | 6CH, 7CH, 8CH | nein | [Link](https://www.ckclighting.com/item/331.html) |
| CKC Lighting | IP FlatPar 1812 | par | 18 Zellen | 6CH, 7CH, 8CH, 12CH | nein | [Link](https://www.ckclighting.com/item/332.html) |
| CKC Lighting | PinSpot 40IP | par |  | 4CH, 6CH, 7CH | nein | [Link](https://www.ckclighting.com/item/333.html) |
| CKC Lighting | V3 BSW | movinghead / spot |  | 25CH, 30CH | nein | [Link](https://www.ckclighting.com/item/334.html) |
| CKC Lighting | UV 36 | panel |  | 1CH, 2CH, 3CH | nein | [Link](https://www.ckclighting.com/item/335.html) |
| CKC Lighting | IP PixBar 1212 | bar | 12 Zellen | 6CH, 7CH, 11CH, 13CH, 36CH, 72CH Pixel, 75CH Pixel, 79CH Pixel | nein | [Link](https://www.ckclighting.com/item/336.html) |
| CKC Lighting | FlatPar 1212 | par | 12 Zellen | 6CH, 7CH, 8CH | nein | [Link](https://www.ckclighting.com/item/337.html) |
| CKC Lighting | FlatPar 712 | par | 7 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.ckclighting.com/item/338.html) |
| CKC Lighting | Pinspot 40 | par |  | 1CH, 4CH, 6CH, 7CH | nein | [Link](https://www.ckclighting.com/item/339.html) |
| CKC Lighting | PixBar 1204 | bar | 12 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH | nein | [Link](https://www.ckclighting.com/item/340.html) |
| CKC Lighting | PixBar 2404 | bar | 24 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH, 16CH, 20CH | nein | [Link](https://www.ckclighting.com/item/341.html) |
| CKC Lighting | Fresnel 50 | fresnel |  | 1CH, 2CH | nein | [Link](https://www.ckclighting.com/item/342.html) |
| CKC Lighting | Fresnel 100 | fresnel |  | 1CH, 3CH | nein | [Link](https://www.ckclighting.com/item/343.html) |
| CKC Lighting | Fresnel 60 | fresnel |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.ckclighting.com/item/344.html) |
| CKC Lighting | P500 FC IP | par |  | 1CH, 6CH, 9CH, 11CH, 14CH, 15CH, 18CH, 19CH | nein | [Link](https://www.ckclighting.com/item/345.html) |
| CKC Lighting | P500 FC | par |  | 1CH, 6CH, 9CH, 11CH, 14CH, 18CH | nein | [Link](https://www.ckclighting.com/item/346.html) |
| CKC Lighting | P250 WW | par |  | 1CH, 5CH | nein | [Link](https://www.ckclighting.com/item/347.html) |
| CKC Lighting | IP PixBar 1205 | bar | 12 Zellen | 3CH, 4CH, 7CH, 8CH, 10CH | nein | [Link](https://www.ckclighting.com/item/348.html) |
| CKC Lighting | IP PixBar 2405 | bar | 24 Zellen | 3CH, 4CH, 7CH, 8CH, 10CH, 16CH, 20CH | nein | [Link](https://www.ckclighting.com/item/349.html) |
| CKC Lighting | UV 36B | panel |  | 1CH, 2CH | nein | [Link](https://www.ckclighting.com/item/350.html) |
| CKC Lighting | P200 FC IP | par |  | 1CH, 4CH, 6CH, 9CH, 10CH, 12CH, 15CH, 20CH | nein | [Link](https://www.ckclighting.com/item/351.html) |
| CKC Lighting | VH5B IP | movinghead / beam |  | 21CH, 26CH | nein | [Link](https://www.ckclighting.com/item/352.html) |
| CKC Lighting | VH5 IP | movinghead / spot |  | 27CH, 30CH | nein | [Link](https://www.ckclighting.com/item/353.html) |
| CKC Lighting | Tourist M9 | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/354.html) |
| CKC Lighting | Proxima IP | movinghead / beam |  | 22CH, 30CH | nein | [Link](https://www.ckclighting.com/item/355.html) |
| CKC Lighting | V20 | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/356.html) |
| CKC Lighting | PixBar 1515 | bar | 15 Zellen | 4CH, 7CH, 8CH, 11CH, 14CH, 60CH Pixel, 63CH Pixel, 67CH Pixel, 70CH Pixel, 120CH Pixel | nein | [Link](https://www.ckclighting.com/item/357.html) |
| CKC Lighting | IP H2O 400 | effect |  | 10CH, 12CH | nein | [Link](https://www.ckclighting.com/item/359.html) |
| CKC Lighting | IP H2O 200 | effect |  | 5CH | nein | [Link](https://www.ckclighting.com/item/360.html) |
| CKC Lighting | IP H2O 100 | effect |  | 5CH | nein | [Link](https://www.ckclighting.com/item/361.html) |
| CKC Lighting | TS6 | movinghead / profile |  | 39CH, 41CH, 53CH, 57CH | nein | [Link](https://www.ckclighting.com/item/362.html) |
| CKC Lighting | Marvel S2P | movinghead / spot |  | 19CH, 21CH, 25CH | nein | [Link](https://www.ckclighting.com/item/363.html) |
| CKC Lighting | S3 | movinghead / spot |  | 21CH, 25CH, 29CH | nein | [Link](https://www.ckclighting.com/item/364.html) |
| CKC Lighting | IP PixBar 30 WW | bar | 12 Zellen | 4CH, 5CH | nein | [Link](https://www.ckclighting.com/item/367.html) |
| CKC Lighting | IP PixBar 50 WW | bar | 24 Zellen | 5CH, 8CH | nein | [Link](https://www.ckclighting.com/item/368.html) |
| CKC Lighting | IP PixBar 30 | bar | 12 Zellen | 14CH, 16CH | nein | [Link](https://www.ckclighting.com/item/369.html) |
| CKC Lighting | IP PixBar 50 | bar | 24 Zellen | 14CH, 32CH | nein | [Link](https://www.ckclighting.com/item/370.html) |
| CKC Lighting | V9 | movinghead / profile |  | 37CH, 39CH, 57CH | nein | [Link](https://www.ckclighting.com/item/371.html) |
| CKC Lighting | V3 | movinghead / profile |  | 36CH, 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/372.html) |
| CKC Lighting | Nonabeam | bar | 9 Zellen | 5CH, 18CH, 34CH Pixel, 50CH Pixel | nein | [Link](https://www.ckclighting.com/item/373.html) |
| CKC Lighting | M160 | movinghead / beam |  | 16CH, 18CH, 20CH | nein | [Link](https://www.ckclighting.com/item/374.html) |
| CKC Lighting | Sunstrip 12 | retro | 12 Zellen | 1CH, 2CH, 3CH, 5CH, 6CH, 7CH, 10CH, 12CH, 15CH, 20CH, 36CH Pixel, 41CH Pixel, 45CH Pixel, 72CH Pixel | nein | [Link](https://www.ckclighting.com/item/375.html) |
| CKC Lighting | Proxima Tiny | movinghead / beam |  | 21CH, 26CH | nein | [Link](https://www.ckclighting.com/item/376.html) |
| CKC Lighting | Tourist M7 | movinghead / profile |  | 41CH, 57CH | nein | [Link](https://www.ckclighting.com/item/377.html) |
| CKC Lighting | Tourist M3 | movinghead / profile |  | 38CH, 52CH | nein | [Link](https://www.ckclighting.com/item/378.html) |
| CKC Lighting | Par Z60 IP | movinghead / wash |  | 5CH, 6CH, 7CH, 8CH, 9CH, 10CH, 12CH, 13CH | nein | [Link](https://www.ckclighting.com/item/379.html) |
| CKC Lighting | Soft Panel 300DW | panel |  | 1CH, 2CH, 8CH, 9CH | nein | [Link](https://www.ckclighting.com/item/381.html) |
| CKC Lighting | FC Pendant 300 | panel |  | 1CH, 2CH, 4CH, 5CH, 9CH, 10CH, 17CH | nein | [Link](https://www.ckclighting.com/item/382.html) |
| CKC Lighting | Pendant 300 | panel |  | 1CH, 2CH, 4CH | nein | [Link](https://www.ckclighting.com/item/383.html) |
| CKC Lighting | Mini Blinder | blinder | 64 Zellen | 1CH, 2CH, 3CH, 4CH, 6CH, 7CH, 10CH, 14CH, 15CH, 21CH | nein | [Link](https://www.ckclighting.com/item/387.html) |
| CKC Lighting | Nonabeam Move | tiltbar | 9 Zellen | 5CH, 18CH, 34CH Pixel, 50CH Pixel | nein | [Link](https://www.ckclighting.com/item/389.html) |
| CKC Lighting | Y840 | tiltbar | 8 Zellen | 16CH, 18CH, 46CH Pixel | nein | [Link](https://www.ckclighting.com/item/390.html) |
| CKC Lighting | Y1640 | tiltbar | 16 Zellen | 18CH, 78CH Pixel | nein | [Link](https://www.ckclighting.com/item/391.html) |
| CKC Lighting | P10+ | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/392.html) |
| CKC Lighting | Qdot 16 IP DTW | strobe | 16 Zellen | 1CH, 2CH, 7CH, 13CH, 16CH Pixel, 32CH Pixel, 37CH Pixel, 64CH Pixel | nein | [Link](https://www.ckclighting.com/item/394.html) |
| CKC Lighting | Qdot 16 IP | strobe | 16 Zellen | 1CH, 2CH, 3CH, 4CH, 6CH, 7CH, 8CH, 11CH, 12CH, 48CH, 64CH Pixel, 72CH Pixel, 128CH Pixel | nein | [Link](https://www.ckclighting.com/item/395.html) |
| CKC Lighting | IP Blinder DTW4 | blinder | 4 Zellen | 1CH, 2CH, 4CH Pixel, 5CH Pixel, 6CH Pixel, 7CH Pixel, 9CH Pixel, 13CH Pixel | nein | [Link](https://www.ckclighting.com/item/396.html) |
| CKC Lighting | IP Blinder DTW2 | blinder | 2 Zellen | 1CH, 2CH Pixel, 4CH Pixel, 5CH Pixel, 6CH Pixel, 7CH Pixel, 9CH Pixel | nein | [Link](https://www.ckclighting.com/item/397.html) |
| CKC Lighting | Blinder WW4 | blinder | 4 Zellen | 1CH, 2CH, 4CH Pixel, 5CH Pixel, 7CH Pixel, 9CH Pixel | nein | [Link](https://www.ckclighting.com/item/398.html) |
| CKC Lighting | Blinder WW2 | blinder | 2 Zellen | 1CH, 2CH Pixel, 3CH Pixel, 4CH Pixel | nein | [Link](https://www.ckclighting.com/item/399.html) |
| CKC Lighting | Pinspot 15 | par |  | 1CH, 4CH, 6CH, 7CH | nein | [Link](https://www.ckclighting.com/item/400.html) |
| CKC Lighting | Soft Panel 600TW | movinghead / profile |  | 6CH, 7CH, 12CH, 14CH, 23CH, 24CH, 48CH, 58CH, 96CH | nein | [Link](https://www.ckclighting.com/item/401.html) |
| CKC Lighting | Soft Panel 300TW | movinghead / profile |  | 6CH, 8CH, 14CH | nein | [Link](https://www.ckclighting.com/item/402.html) |
| CKC Lighting | Soft Panel 400DW | panel |  | 1CH, 2CH, 8CH | nein | [Link](https://www.ckclighting.com/item/403.html) |
| CKC Lighting | V15 Pro IP | movinghead / profile |  | 36CH, 52CH | nein | [Link](https://www.ckclighting.com/item/404.html) |
| CKC Lighting | V20 IP | movinghead / profile |  | 38CH, 54CH | nein | [Link](https://www.ckclighting.com/item/405.html) |
| CKC Lighting | V4s IP | movinghead / spot |  | 24CH, 29CH, 36CH | nein | [Link](https://www.ckclighting.com/item/406.html) |
| CKC Lighting | V2s IP | movinghead / spot |  | 17CH, 20CH, 22CH | nein | [Link](https://www.ckclighting.com/item/407.html) |
| CKC Lighting | ZB7X IP | movinghead / wash | 7 Zellen | 17CH, 21CH, 45CH Pixel | nein | [Link](https://www.ckclighting.com/item/408.html) |
| CKC Lighting | L Par 7 | par | 7 Zellen | 4CH, 8CH, 10CH, 13CH, 16CH | nein | [Link](https://www.ckclighting.com/item/410.html) |
| CKC Lighting | FC Pendant 200 | panel |  | 1CH, 4CH, 5CH, 9CH, 10CH, 17CH | nein | [Link](https://www.ckclighting.com/item/411.html) |
| CKC Lighting | Follow Wo | follow |  | 1CH, 2CH, 7CH, 8CH | nein | [Link](https://www.ckclighting.com/item/412.html) |
| CKC Lighting | EvoWash Pro | movinghead / wash | 12 Zellen | 21CH, 25CH, 69CH | nein | [Link](https://www.ckclighting.com/item/413.html) |
| CKC Lighting | EvoWash Air | movinghead / wash |  | 21CH, 25CH, 37CH | nein | [Link](https://www.ckclighting.com/item/414.html) |
| CKC Lighting | Wash Z300 | movinghead / wash |  | 18CH, 19CH, 20CH, 24CH | nein | [Link](https://www.ckclighting.com/item/415.html) |
| CKC Lighting | Tourist M6 | movinghead / profile |  | 43CH, 58CH | nein | [Link](https://www.ckclighting.com/item/416.html) |
| CKC Lighting | Evo Linebar 72 | bar | 24 Zellen | 1CH, 9CH, 15CH, 16CH, 21CH, 154CH, 274CH | nein | [Link](https://www.ckclighting.com/item/417.html) |
| CKC Lighting | Evo Linebar 48 | bar | 16 Zellen | 1CH, 9CH, 15CH, 21CH, 108CH, 186CH | nein | [Link](https://www.ckclighting.com/item/418.html) |
| CKC Lighting | Evo Linebar 12 | bar | 4 Zellen | 1CH, 9CH, 15CH, 16CH, 21CH Pixel, 34CH Pixel, 54CH Pixel | nein | [Link](https://www.ckclighting.com/item/419.html) |
| CKC Lighting | FC Halonel Plus | fresnel |  | 1CH, 8CH, 14CH, 16CH, 20CH | nein | [Link](https://www.ckclighting.com/item/420.html) |
| CKC Lighting | FC Halonel Pro | fresnel |  | 1CH, 8CH, 14CH, 16CH, 20CH | nein | [Link](https://www.ckclighting.com/item/421.html) |
| CKC Lighting | Footslim X | bar | 96 Zellen | 1CH, 2CH, 8CH, 12CH, 13CH, 14CH, 29CH | nein | [Link](https://www.ckclighting.com/item/422.html) |
| CKC Lighting | Footslim M | bar | 96 Zellen | 1CH, 2CH, 8CH, 12CH, 13CH, 14CH, 19CH | nein | [Link](https://www.ckclighting.com/item/423.html) |
| CKC Lighting | Evo T Double | tiltbar | 16 Zellen | 24CH, 33CH, 121CH | nein | [Link](https://www.ckclighting.com/item/424.html) |
| CKC Lighting | Evo T Single | tiltbar | 8 Zellen | 22CH, 29CH Pixel, 69CH Pixel | nein | [Link](https://www.ckclighting.com/item/425.html) |
| CKC Lighting | EvoWash Plus | movinghead / wash | 37 Zellen | 21CH, 25CH, 169CH Pixel | nein | [Link](https://www.ckclighting.com/item/432.html) |
| CKC Lighting | M Trio | movinghead / spot |  | 31CH, 36CH | nein | [Link](https://www.ckclighting.com/item/437.html) |
| CKC Lighting | Proxima Compact | movinghead / spot |  | 30CH, 37CH | nein | [Link](https://www.ckclighting.com/item/440.html) |
| CKC Lighting | PixBar 1515 IP | bar | 15 Zellen | 4CH, 7CH, 8CH, 11CH, 14CH, 60CH Pixel, 63CH Pixel, 67CH Pixel, 70CH Pixel, 120CH Pixel | nein | [Link](https://www.ckclighting.com/item/441.html) |
| Claypaky | Arolla Aqua HP | movinghead / profile |  | 43CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua-hp/) |
| Claypaky | Arolla Aqua | movinghead / profile |  | 38CH, 41CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua/) |
| Claypaky | Arolla Aqua LT | movinghead / profile |  | 38CH, 41CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua-lt/) |
| Claypaky | Arolla Aqua M-LT | movinghead / profile |  | 44CH, 54CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua-m-lt/) |
| Claypaky | Arolla Aqua S-LT | movinghead / profile |  | 44CH, 54CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua-s-lt/) |
| Claypaky | Arolla Aqua Wash HC | movinghead / wash |  | 30CH | nein | [Link](https://www.claypaky.it/products/arolla-aqua-wash-hc/) |
| Claypaky | Axcor Spot 400 | movinghead / spot |  | 28CH | nein | [Link](https://www.claypaky.it/products/axcor-spot400/) |
| Claypaky | Sinfonya Profile 600 | movinghead / profile |  | 43CH, 49CH, 58CH | nein | [Link](https://www.claypaky.it/products/sinfonya-profile-600/) |
| Claypaky | Rhapsodya | movinghead / profile |  | 48CH, 55CH, 63CH | nein | [Link](https://www.claypaky.it/products/rhapsodya/) |
| Claypaky | Ultimo Hybrid | movinghead / spot |  | 43CH | nein | [Link](https://www.claypaky.it/products/ultimo-hybrid/) |
| Claypaky | Ultimo Sharpy | movinghead / beam |  | 16CH, 27CH | nein | [Link](https://www.claypaky.it/products/ultimo-sharpy/) |
| Claypaky | Ultimo Skybeam | movinghead / beam |  | 25CH | nein | [Link](https://www.claypaky.it/products/ultimo-skybeam/) |
| Claypaky | Sharpy Plus Aqua | movinghead / spot |  | 31CH | nein | [Link](https://www.claypaky.it/products/sharpy-plus-aqua/) |
| Claypaky | Xtylos Aqua | movinghead / beam |  | 31CH | nein | [Link](https://www.claypaky.it/products/xtylos-aqua/) |
| Claypaky | Mini Xtylos | movinghead / beam |  | 27CH | nein | [Link](https://www.claypaky.it/products/mini-xtylos/) |
| Claypaky | B-Eye K30 | movinghead / beeeye | 37 Zellen | 47CH, 148CH Pixel | nein | [Link](https://www.claypaky.it/products/b-eye-k30/) |
| Claypaky | B-Eye K30 FX | movinghead / beeeye | 37 Zellen | 38CH, 54CH | nein | [Link](https://www.claypaky.it/products/b-eye-k30-fx/) |
| Claypaky | B-Eye 12 | movinghead / beeeye | 12 Zellen | 30CH, 47CH, 48CH Pixel | nein | [Link](https://www.claypaky.it/products/b-eye-12/) |
| Claypaky | B-Eye 7 | movinghead / beeeye | 7 Zellen | 28CH Pixel, 30CH Pixel, 47CH Pixel | nein | [Link](https://www.claypaky.it/products/b-eye-7/) |
| Claypaky | HY B-Eye K15 Aqua | movinghead / beeeye | 19 Zellen | 21CH, 22CH, 35CH, 36CH, 37CH | nein | [Link](https://www.claypaky.it/products/hy-b-eye-k15-aqua/) |
| Claypaky | K-Eye K10 HCR | movinghead / wash |  | 19CH, 32CH | nein | [Link](https://www.claypaky.it/products/k-eye-k10-hcr/) |
| Claypaky | K-Eye K20 HCR | movinghead / wash |  | 27CH, 31CH | nein | [Link](https://www.claypaky.it/products/k-eye-k20-hcr/) |
| Claypaky | Midi-B FX | movinghead / wash | 43 Zellen | 70CH Pixel | nein | [Link](https://www.claypaky.it/products/midi-b-fx/) |
| Claypaky | Mini-B Aqua PX | movinghead / wash | 7 Zellen | 8CH, 16CH, 45CH Pixel | nein | [Link](https://www.claypaky.it/products/mini-b-aqua-px/) |
| Claypaky | Mini-B Sparky Aqua | movinghead / wash | 394 Zellen | 14CH, 18CH, 28CH, 30CH, 36CH | nein | [Link](https://www.claypaky.it/products/mini-b-sparky-aqua/) |
| Claypaky | Mini-B ParLED Aqua | par |  | 25CH | nein | [Link](https://www.claypaky.it/products/minib-parled-aqua/) |
| Claypaky | Volero Cube | movinghead / matrix | 4 Zellen | 22CH Pixel, 41CH Pixel, 45CH Pixel | nein | [Link](https://www.claypaky.it/products/volero-cube/) |
| Claypaky | Volero Twins | movinghead / matrix | 8 Zellen | 25CH, 43CH Pixel, 50CH Pixel | nein | [Link](https://www.claypaky.it/products/volero-twins/) |
| Claypaky | Tambora Stormy | strobe | 27 Zellen | 10CH, 26CH, 32CH | nein | [Link](https://www.claypaky.it/products/tambora-stormy/) |
| Claypaky | Tambora Rays | strobe | 27 Zellen | 10CH, 26CH, 32CH | nein | [Link](https://www.claypaky.it/products/tambora-rays/) |
| Claypaky | Tambora Glare | blinder | 10 Zellen | 19CH, 41CH Pixel, 52CH Pixel | nein | [Link](https://www.claypaky.it/products/tambora-glare/) |
| Claypaky | Tambora Stormy Linear | strobe | 5 Zellen | 16CH Pixel, 36CH Pixel, 48CH Pixel | nein | [Link](https://www.claypaky.it/products/tambora-stormy-linear/) |
| Claypaky | Tambora Linear 60 | bar | 96 Zellen | 9CH, 13CH, 31CH, 33CH, 39CH | nein | [Link](https://www.claypaky.it/products/tambora-linear-60/) |
| Contest | HEZO120Z | movinghead / wash | 12 Zellen | 17CH | nein | [Link](https://ribalto.com/fr/contest-hezo120z-h10408) |
| Contest | HEZO300ZR | movinghead / wash | 43 Zellen | 22CH, 30CH | nein | [Link](https://ribalto.com/fr/contest-hezo300zr-h10710) |
| Contest | VPAR-40RGBL | par | 18 Zellen | 2CH, 8CH | nein | [Link](https://ribalto.com/fr/contest-vpar-40rgbl-h11754) |
| EK | Alligator | tiltbar | 1 Zellen | 26CH, 50CH, 84CH, 98CH | nein | [Link](https://www.eklights.com/products/alligator/) |
| EK | Apollo 6PACK | par |  | 4CH, 6CH, 10CH | nein | [Link](https://www.eklights.com/products/apollo/) |
| EK | AURORA XGP 200 | effect |  | 12CH, 14CH | nein | [Link](https://www.eklights.com/products/aurora-xgp-200/) |
| EK | AURORA XGP 70 | effect |  | 8CH, 14CH | nein | [Link](https://www.eklights.com/products/aurora-xgp-70/) |
| EK | AURORA XGP 750P | effect |  | 28CH | nein | [Link](https://www.eklights.com/products/aurora-xgp-750p/) |
| EK | AURORA XGP 750S | effect |  | 22CH | nein | [Link](https://www.eklights.com/products/aurora-xgp-750s/) |
| EK | Billy The Kid | movinghead / beam |  | 19CH | nein | [Link](https://www.eklights.com/products/billy-the-kid/) |
| EK | Blinder II C | blinder |  | 1CH, 2CH, 5CH, 7CH, 10CH, 12CH, 13CH, 15CH, 28CH | nein | [Link](https://www.eklights.com/products/blinder-ii-c/) |
| EK | Blinder II IP | blinder |  | 1CH, 2CH, 3CH, 4CH, 5CH, 8CH | nein | [Link](https://www.eklights.com/products/blinder-ii-ip/) |
| EK | Collider Bar IP | strobe |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 8CH, 11CH, 15CH, 60CH, 62CH, 67CH, 120CH | nein | [Link](https://www.eklights.com/products/collider-bar-ip/) |
| EK | Color Keep One | par |  | 4CH, 8CH | nein | [Link](https://www.eklights.com/products/color-keep-one/) |
| EK | Color Keep Two | par |  | 4CH, 8CH | nein | [Link](https://www.eklights.com/products/color-keep-two/) |
| EK | Color Line PB120 | bar | 1 Zellen | 4CH, 6CH, 11CH | nein | [Link](https://www.eklights.com/products/color-line-pb120/) |
| EK | Color Line PB72 | bar | 1 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.eklights.com/products/color-line-pb72/) |
| EK | Color Ranger Q48E | panel |  | 4CH, 6CH, 10CH, 16CH | nein | [Link](https://www.eklights.com/products/color-ranger-q48e/) |
| EK | Color Ranger Q96A | panel |  | 2CH, 4CH, 5CH, 7CH, 9CH, 11CH, 13CH, 15CH, 16CH, 21CH, 32CH | nein | [Link](https://www.eklights.com/products/color-ranger-q96a/) |
| EK | Cyber Beam | movinghead / beam |  | 14CH | nein | [Link](https://www.eklights.com/products/cyber-beam/) |
| EK | Diamondback | tiltbar | 1 Zellen | 14CH, 32CH, 88CH, 91CH, 118CH, 119CH | nein | [Link](https://www.eklights.com/products/diamondback/) |
| EK | EC12 | movinghead / wash | 12 Zellen | 17CH, 35CH, 36CH, 61CH Pixel, 83CH Pixel, 84CH Pixel | nein | [Link](https://www.eklights.com/products/ec12/) |
| EK | EC60 | movinghead / wash | 61 Zellen | 16CH, 31CH, 34CH, 255CH Pixel, 278CH Pixel | nein | [Link](https://www.eklights.com/products/ec60/) |
| EK | EC7 | movinghead / wash | 7 Zellen | 18CH, 36CH Pixel, 37CH Pixel, 42CH Pixel, 64CH Pixel, 65CH Pixel | nein | [Link](https://www.eklights.com/products/ec7/) |
| EK | EPAR INFINITI VW | par |  | 4CH, 6CH, 10CH | nein | [Link](https://www.eklights.com/products/epar-infiniti-vw/) |
| EK | EPAR MULTI CW | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.eklights.com/products/epar-multi-cw/) |
| EK | EPAR MULTI WW | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.eklights.com/products/epar-multi-ww/) |
| EK | EPROFILE HP | profile |  | 1CH, 2CH, 5CH | nein | [Link](https://www.eklights.com/products/eprofile-hp/) |
| EK | EProfile VW 500 | profile |  | 1CH, 4CH, 5CH, 7CH, 11CH, 13CH, 113CH, 217CH | nein | [Link](https://www.eklights.com/products/eprofile-vw-500/) |
| EK | H1 IP | movinghead / spot |  | 32CH | nein | [Link](https://www.eklights.com/products/h1-ip/) |
| EK | H1 | movinghead / spot |  | 31CH | nein | [Link](https://www.eklights.com/products/h1/) |
| EK | H360 | movinghead / spot |  | 21CH | nein | [Link](https://www.eklights.com/products/h360/) |
| EK | K Max HP | movinghead / profile |  | 34CH | nein | [Link](https://www.eklights.com/products/k-max-hp/) |
| EK | K Max HR | movinghead / profile |  | 34CH | nein | [Link](https://www.eklights.com/products/k-max-hr/) |
| EK | K Smart P | movinghead / profile |  | 33CH | nein | [Link](https://www.eklights.com/products/k-smart-p/) |
| EK | K Smart S | movinghead / spot |  | 25CH | nein | [Link](https://www.eklights.com/products/k-smart-s/) |
| EK | K35 | movinghead / profile |  | 39CH, 41CH | nein | [Link](https://www.eklights.com/products/k35/) |
| EK | K65 IP | movinghead / profile |  | 39CH, 41CH | nein | [Link](https://www.eklights.com/products/k65/) |
| EK | KX 100+ | movinghead / profile |  | 34CH, 36CH | nein | [Link](https://www.eklights.com/products/kx-100-2/) |
| EK | LT15 | movinghead / profile |  | 40CH | nein | [Link](https://www.eklights.com/products/lt15/) |
| EK | LT6 | movinghead / profile |  | 38CH | nein | [Link](https://www.eklights.com/products/lt6/) |
| EK | MC10 | movinghead / profile |  | 43CH, 45CH, 51CH | nein | [Link](https://www.eklights.com/products/mc10/) |
| EK | MC15 | movinghead / profile |  | 42CH, 44CH, 50CH | nein | [Link](https://www.eklights.com/products/mc15/) |
| EK | MC15FS | movinghead / profile |  | 42CH, 44CH, 50CH | nein | [Link](https://www.eklights.com/products/mc15fs/) |
| EK | MC6 | movinghead / profile |  | 41CH, 43CH, 49CH | nein | [Link](https://www.eklights.com/products/mc6/) |
| EK | Power Pixel Q50 | bar | 1 Zellen | 2CH, 4CH, 6CH, 8CH, 10CH, 11CH, 13CH, 14CH, 20CH, 26CH, 40CH, 46CH, 100CH, 106CH, 200CH, 206CH | nein | [Link](https://www.eklights.com/products/power-pixel-q50/) |
| EK | R2 Beam Wash | movinghead / wash |  | 16CH, 43CH, 86CH | nein | [Link](https://www.eklights.com/products/r2-beam-wash/) |
| EK | Radiant 3000+ | strobe |  | 4CH, 12CH | nein | [Link](https://www.eklights.com/products/radiant-3000-2/) |
| EK | Radiant 3000 | strobe |  | 4CH, 12CH | nein | [Link](https://www.eklights.com/products/radiant-3000/) |
| EK | Radiant Bar 1000 | strobe |  | 4CH, 5CH, 12CH, 40CH, 72CH, 104CH, 192CH, 200CH | nein | [Link](https://www.eklights.com/products/radiant-bar-1000/) |
| EK | Ratel | movinghead / beam |  | 18CH | nein | [Link](https://www.eklights.com/products/ratel/) |
| EK | Shark | movinghead / spot |  | 21CH | nein | [Link](https://www.eklights.com/products/shark/) |
| EK | Terminator | movinghead / spot |  | 32CH | nein | [Link](https://www.eklights.com/products/terminator/) |
| EK | 12QP-C LED PAR | par |  | 4CH, 9CH | nein | [Link](https://www.eklights.com/cn/products/12qp-c/) |
| EK | Color Line OB36 | bar | 1 Zellen | 4CH, 6CH, 11CH | nein | [Link](https://www.eklights.com/cn/products/color-line-ob36/) |
| EK | Color Ranger Q15A | panel |  | 4CH, 8CH | nein | [Link](https://www.eklights.com/cn/products/color-ranger-q15a/) |
| EK | Color Ranger Q27A | panel |  | 4CH, 8CH | nein | [Link](https://www.eklights.com/cn/products/color-ranger-q27a/) |
| EK | Color Ranger Q27E | panel |  | 4CH, 6CH, 10CH, 12CH | nein | [Link](https://www.eklights.com/cn/products/color-ranger-q27e/) |
| EK | CYC1000 | bar | 1 Zellen | 1CH, 2CH, 4CH, 5CH, 6CH, 10CH, 15CH, 17CH | nein | [Link](https://www.eklights.com/cn/products/cyc1000/) |
| EK | CYC500 | bar | 1 Zellen | 1CH, 2CH, 4CH, 5CH, 6CH, 10CH, 15CH, 17CH | nein | [Link](https://www.eklights.com/cn/products/cyc500/) |
| EK | DLM 7X7 | strobe | 1 Zellen | 1CH, 5CH, 7CH, 10CH, 12CH, 13CH, 16CH, 252CH | nein | [Link](https://www.eklights.com/cn/products/dlm-7x7/) |
| EK | EFRESNEL CW 500 LED | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.eklights.com/cn/products/efresnel-cw-500/) |
| EK | EFRESNEL CW 5600K | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.eklights.com/cn/products/efresnel-cw/) |
| EK | EFRESNEL VW 500 LED | fresnel |  | 2CH, 5CH, 7CH, 9CH, 13CH, 16CH, 19CH | nein | [Link](https://www.eklights.com/cn/products/efresnel-vw-500/) |
| EK | EFRESNEL WW 500 LED | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.eklights.com/cn/products/efresnel-ww-500/) |
| EK | EFRESNEL WW LED | fresnel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.eklights.com/cn/products/efresnel-ww/) |
| EK | EPAR ULTRA UV LED UV PAR | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.eklights.com/cn/products/epar-ultra-uv/) |
| EK | EPROFILE FC LED | profile |  | 5CH, 7CH, 10CH, 12CH, 13CH, 15CH | nein | [Link](https://www.eklights.com/cn/products/eprofile-fc/) |
| EK | Jin Gu Bang | tube | 1 Zellen | 4CH, 14CH, 64CH, 67CH | nein | [Link](https://www.eklights.com/cn/products/jin-gu-bang/) |
| EK | K2 LED | movinghead / profile |  | 33CH, 34CH | nein | [Link](https://www.eklights.com/cn/products/k2/) |
| EK | K4 Beam | movinghead / beam |  | 11CH, 12CH | nein | [Link](https://www.eklights.com/cn/products/k4-beam/) |
| EK | K4 Spot LED | movinghead / spot |  | 12CH, 14CH | nein | [Link](https://www.eklights.com/cn/products/k4-spot/) |
| EK | MC10 PRO | movinghead / profile |  | 41CH, 44CH, 46CH, 52CH | nein | [Link](https://www.eklights.com/cn/products/mc10-pro/) |
| EK | MC6 PRO | movinghead / profile |  | 40CH, 42CH, 48CH | nein | [Link](https://www.eklights.com/cn/products/mc6-pro/) |
| EK | MC6X | movinghead / profile |  | 39CH, 41CH, 47CH | nein | [Link](https://www.eklights.com/cn/products/mc6x/) |
| EK | MCXX | movinghead / profile |  | 42CH, 44CH, 49CH, 50CH | nein | [Link](https://www.eklights.com/cn/products/mcxx/) |
| EK | Ru Lai | movinghead / spot |  | 23CH | nein | [Link](https://www.eklights.com/cn/products/ru-lai/) |
| EK | S240 LED RGBW | effect |  | 4CH, 14CH, 28CH, 31CH | nein | [Link](https://www.eklights.com/cn/products/s240/) |
| EK | SOFT LIGHT 250 LED | panel |  | 1CH, 2CH, 4CH, 5CH, 6CH, 10CH, 15CH, 17CH | nein | [Link](https://www.eklights.com/cn/products/soft-light-250/) |
| EK | SOFT LIGHT LED | panel |  | 1CH, 2CH, 4CH, 5CH, 6CH, 10CH, 15CH, 17CH | nein | [Link](https://www.eklights.com/cn/products/soft-light/) |
| EK | Wu Kong | movinghead / beam |  | 18CH | nein | [Link](https://www.eklights.com/cn/products/wu-kong/) |
| Elation | Proteus Brutus | movinghead / wash |  | 25CH, 34CH, 36CH, 56CH | nein | [Link](https://www.elationlighting.com/products/proteus-brutus) |
| Elation | Proteus Brutus FS | follow |  | 27CH, 36CH | nein | [Link](https://www.elationlighting.com/products/proteus-brutus-fs) |
| Elation | Proteus Atlas | movinghead / beam |  | 30CH, 41CH | nein | [Link](https://www.elationlighting.com/products/proteus-atlas) |
| Elation | Proteus Hybrid Max | movinghead / spot |  | 32CH, 43CH | nein | [Link](https://www.elationlighting.com/products/proteus-hybrid-max) |
| Elation | Proteus Rayzor 1960 | movinghead / wash | 19 Zellen | 25CH, 100CH, 176CH | nein | [Link](https://www.elationlighting.com/products/proteus-rayzor-1960) |
| Elation | Proteus Rayzor Blade S | tiltbar | 6 Zellen | 28CH Pixel, 50CH Pixel, 66CH Pixel, 72CH Pixel, 82CH Pixel, 106CH Pixel | nein | [Link](https://www.elationlighting.com/products/proteus-rayzor-blade-s) |
| Elation | Proteus Rayzor Blade L | tiltbar | 12 Zellen | 28CH, 76CH, 108CH, 120CH, 140CH, 188CH | nein | [Link](https://www.elationlighting.com/products/proteus-rayzor-blade-l) |
| Elation | Artiste Mondrian | movinghead / profile |  | 42CH, 68CH | nein | [Link](https://www.elationlighting.com/products/artiste-mondrian) |
| Elation | Artiste Monet | movinghead / profile |  | 40CH, 67CH | nein | [Link](https://www.elationlighting.com/products/artiste-monet) |
| Elation | Artiste Rembrandt | movinghead / wash |  | 35CH, 59CH | nein | [Link](https://www.elationlighting.com/products/artiste-rembrandt) |
| Elation | Paragon S | movinghead / profile |  | 41CH, 64CH | nein | [Link](https://www.elationlighting.com/products/paragon-s) |
| Elation | Paragon M | movinghead / profile |  | 43CH, 65CH | nein | [Link](https://www.elationlighting.com/products/paragon-m) |
| Elation | Paragon LT | movinghead / profile |  | 44CH, 47CH, 67CH, 73CH | nein | [Link](https://www.elationlighting.com/products/paragon-lt) |
| Elation | Rebel Wash 12 | movinghead / wash | 12 Zellen | 21CH, 28CH, 68CH Pixel | nein | [Link](https://www.elationlighting.com/products/rebel-wash-12) |
| Elation | Rebel Line 8 | tiltbar | 8 Zellen | 22CH, 30CH Pixel, 70CH Pixel | nein | [Link](https://www.elationlighting.com/products/rebel-line-8) |
| Elation | Rebel Line 16 | tiltbar | 16 Zellen | 22CH, 24CH, 30CH, 31CH, 70CH Pixel, 122CH Pixel | nein | [Link](https://www.elationlighting.com/products/rebel-line-16) |
| Elation | Fuze Max Profile | movinghead / profile |  | 38CH, 40CH, 57CH, 61CH | nein | [Link](https://www.elationlighting.com/products/fuze-max-profile) |
| Elation | Fuze Max Spot | movinghead / spot |  | 32CH, 34CH, 40CH, 44CH | nein | [Link](https://www.elationlighting.com/products/fuze-max-spot) |
| Elation | Fuze Profile | movinghead / profile |  | 36CH, 38CH, 55CH, 59CH | nein | [Link](https://www.elationlighting.com/products/fuze-profile) |
| Elation | Fuze Profile+ | movinghead / profile |  | 38CH, 40CH, 55CH, 59CH | nein | [Link](https://www.elationlighting.com/products/fuze-profile-1) |
| Elation | Fuze Spot | movinghead / spot |  | 29CH, 31CH, 37CH, 41CH | nein | [Link](https://www.elationlighting.com/products/fuze-spot) |
| Elation | Fuze SFX | movinghead / spot |  | 31CH | nein | [Link](https://www.elationlighting.com/products/fuze-sfx) |
| Elation | Fuze Wash FR | movinghead / wash |  | 27CH, 29CH, 43CH, 47CH | nein | [Link](https://www.elationlighting.com/products/fuze-wash-fr) |
| Elation | Fuze Wash Z120 | movinghead / wash |  | 19CH | nein | [Link](https://www.elationlighting.com/products/fuze-wash-z120) |
| Elation | Smarty Max | movinghead / spot |  | 27CH, 44CH | nein | [Link](https://www.elationlighting.com/products/smarty-max) |
| Elation | Fuze Par Z120 IP | par |  | 13CH | nein | [Link](https://www.elationlighting.com/products/fuze-par-z120-ip) |
| Elation | KL Core IP | profile |  | 1CH, 4CH, 5CH, 6CH, 9CH, 10CH, 11CH, 13CH, 15CH, 19CH | nein | [Link](https://www.elationlighting.com/products/kl-core-ip) |
| Elation | KL Profile FC | profile |  | 1CH, 5CH, 10CH, 12CH, 17CH, 21CH | nein | [Link](https://www.elationlighting.com/products/kl-profile-fc) |
| Elation | KL Profile Compact | profile |  | 1CH, 3CH, 5CH, 6CH, 7CH, 9CH, 10CH, 11CH, 15CH, 19CH | nein | [Link](https://www.elationlighting.com/products/kl-profile-compact) |
| Elation | KL Spot IP | profile |  | 22CH, 24CH, 28CH, 32CH, 34CH, 46CH, 50CH | nein | [Link](https://www.elationlighting.com/products/kl-spot-ip) |
| Elation | KL Fresnel 4 | fresnel |  | 1CH, 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-4) |
| Elation | KL Fresnel 4 CW | fresnel |  | 1CH, 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-4-cw) |
| Elation | KL Fresnel 4 FC | fresnel |  | 1CH, 2CH, 6CH, 9CH, 11CH, 14CH, 15CH, 18CH, 19CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-4-fc) |
| Elation | KL Fresnel 6 | fresnel |  | 1CH, 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-6) |
| Elation | KL Fresnel 6 CW | fresnel |  | 1CH, 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-6-cw) |
| Elation | KL Fresnel 6 IP | fresnel |  | 1CH, 5CH, 7CH, 10CH, 11CH, 12CH, 14CH, 16CH, 20CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-6-ip) |
| Elation | KL Fresnel 8 | fresnel |  | 2CH, 3CH, 6CH, 7CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-8) |
| Elation | KL Fresnel 8 CW | fresnel |  | 2CH, 3CH, 6CH, 7CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-8-cw) |
| Elation | KL Fresnel 8 FC | fresnel |  | 1CH, 5CH, 7CH, 10CH, 11CH, 12CH, 14CH, 15CH, 16CH, 19CH, 20CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-8-fc) |
| Elation | KL Fresnel 8 IP | fresnel |  | 1CH, 5CH, 7CH, 10CH, 11CH, 12CH, 14CH, 16CH, 20CH | nein | [Link](https://www.elationlighting.com/products/kl-fresnel-8-ip) |
| Elation | KL Par FC IP | par |  | 1CH, 6CH, 9CH, 11CH, 14CH, 15CH, 18CH, 19CH | nein | [Link](https://www.elationlighting.com/products/kl-par-fc-ip) |
| Elation | KL Par IP Compact | par |  | 1CH, 4CH, 5CH, 6CH, 9CH, 10CH, 11CH, 15CH, 19CH | nein | [Link](https://www.elationlighting.com/products/kl-par-ip-compact) |
| Elation | KL Cyc S | panel |  | 1CH, 4CH, 11CH, 12CH, 13CH, 16CH, 19CH, 20CH, 32CH | nein | [Link](https://www.elationlighting.com/products/kl-cyc-s) |
| Elation | KL Cyc L | panel |  | 1CH, 4CH, 11CH, 12CH, 13CH, 16CH, 19CH, 20CH, 31CH, 32CH, 56CH | nein | [Link](https://www.elationlighting.com/products/kl-cyc-l) |
| Elation | CW Profile HP | profile |  | 4CH | nein | [Link](https://www.elationlighting.com/products/cw-profile-hp) |
| Elation | WW Profile HP | profile |  | 4CH | nein | [Link](https://www.elationlighting.com/products/ww-profile-hp) |
| Elation | CW Profile HP IP | profile |  | 1CH, 3CH, 6CH, 8CH | nein | [Link](https://www.elationlighting.com/products/cw-profile-hp-ip) |
| Elation | Chorus Line 8 | multibar | 8 Zellen | 46CH Pixel | nein | [Link](https://www.elationlighting.com/products/chorus-line-8) |
| Elation | SIX+ Bar S | bar | 6 Zellen | 1CH, 3CH, 6CH, 9CH, 13CH, 16CH, 22CH, 34CH Pixel, 36CH Pixel, 46CH Pixel, 82CH Pixel | nein | [Link](https://www.elationlighting.com/products/six-bar-s) |
| Elation | SIX+ Bar L | bar | 12 Zellen | 1CH, 3CH, 6CH, 9CH, 13CH, 16CH, 22CH, 34CH, 44CH, 58CH, 72CH Pixel, 82CH Pixel, 154CH Pixel | nein | [Link](https://www.elationlighting.com/products/six-bar-l) |
| Elation | SIX+ Par S | par | 7 Zellen | 1CH, 3CH, 6CH, 9CH, 11CH, 14CH, 20CH | nein | [Link](https://www.elationlighting.com/products/six-par-s) |
| Elation | SIX+ Par L | par | 14 Zellen | 1CH, 3CH, 6CH, 9CH, 11CH, 20CH | nein | [Link](https://www.elationlighting.com/products/six-par-l) |
| Elation | SIX+ Panel | panel | 40 Zellen | 1CH, 3CH, 4CH, 6CH, 9CH, 12CH, 16CH, 19CH, 21CH, 25CH, 27CH, 30CH, 39CH, 43CH, 60CH, 73CH, 75CH, 135CH Pixel | nein | [Link](https://www.elationlighting.com/products/six-panel) |
| Elation | SixBar 500 | bar | 6 Zellen | 6CH, 7CH, 11CH, 13CH, 18CH, 36CH Pixel, 39CH Pixel, 43CH Pixel | nein | [Link](https://www.elationlighting.com/products/sixbar-500) |
| Elation | SixBar 1000 IP | bar | 12 Zellen | 6CH, 7CH, 11CH, 13CH, 36CH, 72CH Pixel, 75CH Pixel, 79CH Pixel | nein | [Link](https://www.elationlighting.com/products/sixbar-1000-ip) |
| Elation | Limelight Par S | par | 7 Zellen | 4CH, 12CH, 13CH, 15CH, 17CH, 25CH Pixel | nein | [Link](https://www.elationlighting.com/products/limelight-par-s) |
| Elation | Limelight Par L | par | 12 Zellen | 4CH, 13CH, 15CH, 17CH, 25CH | nein | [Link](https://www.elationlighting.com/products/limelight-par-l) |
| Elation | Volt+ Par S | par |  | 1CH, 3CH, 6CH, 9CH, 11CH, 14CH, 20CH | nein | [Link](https://www.elationlighting.com/products/volt-par-s) |
| Elation | Volt+ Par L | par |  | 1CH, 3CH, 6CH, 9CH, 11CH, 14CH, 20CH | nein | [Link](https://www.elationlighting.com/products/volt-par-l) |
| Elation | Volt+ Bar S | bar | 6 Zellen | 1CH, 3CH, 6CH, 9CH, 14CH, 17CH, 23CH, 35CH Pixel, 36CH Pixel, 47CH Pixel, 83CH Pixel | nein | [Link](https://www.elationlighting.com/products/volt-bar-s) |
| Elation | SŌL I ACL | par |  | 1CH, 4CH, 5CH, 6CH, 7CH, 9CH, 12CH, 14CH, 17CH, 21CH | nein | [Link](https://www.elationlighting.com/products/sol-i-acl) |
| Elation | SŌL I Blinder | blinder | 1 Zellen | 1CH, 2CH, 3CH, 4CH, 6CH, 7CH, 10CH, 13CH, 15CH, 21CH | nein | [Link](https://www.elationlighting.com/products/sol-i-blinder) |
| Elation | SŌL II Blinder | blinder | 2 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 8CH, 10CH Pixel, 12CH Pixel, 16CH Pixel, 22CH Pixel, 25CH Pixel, 37CH Pixel | nein | [Link](https://www.elationlighting.com/products/sol-ii-blinder) |
| Elation | SŌL I Strobe | strobe | 8 Zellen | 4CH, 12CH Pixel, 23CH Pixel, 40CH Pixel, 57CH Pixel, 80CH Pixel | nein | [Link](https://www.elationlighting.com/products/sol-i-strobe) |
| Elation | Paladin Panel | blinder | 50 Zellen | 88CH | nein | [Link](https://www.elationlighting.com/products/paladin-panel) |
| Elation | Paladin Brick | blinder | 24 Zellen | 56CH | nein | [Link](https://www.elationlighting.com/products/paladin-brick) |
| Elation | Paladin Cube | blinder | 9 Zellen | 32CH Pixel | nein | [Link](https://www.elationlighting.com/products/paladin-cube) |
| Elation | CUEPIX 16IP DTW | blinder | 16 Zellen | 64CH | nein | [Link](https://www.elationlighting.com/products/cuepix-16ip-dtw) |
| Elation | Pulse Panel | strobe | 24 Zellen | 3CH, 12CH, 22CH, 45CH, 60CH, 88CH Pixel, 156CH Pixel, 170CH Pixel, 178CH Pixel | nein | [Link](https://www.elationlighting.com/products/pulse-panel) |
| Elation | Pulse Panel FX | strobe | 96 Zellen | 8CH, 16CH, 27CH, 50CH, 62CH, 65CH, 90CH, 93CH, 156CH, 161CH, 175CH, 183CH | nein | [Link](https://www.elationlighting.com/products/pulse-panel-fx) |
| Elation | Pulse Bar S | strobe | 20 Zellen | 3CH, 11CH, 22CH, 34CH, 52CH, 77CH Pixel, 110CH Pixel, 124CH Pixel, 132CH Pixel | nein | [Link](https://www.elationlighting.com/products/pulse-bar-s) |
| Elation | Pulse Bar L | strobe | 40 Zellen | 3CH, 11CH, 22CH, 52CH, 92CH, 132CH Pixel, 220CH Pixel, 234CH Pixel, 242CH Pixel | nein | [Link](https://www.elationlighting.com/products/pulse-bar-l) |
| Elation | TVL Panel DW | panel |  | 7CH | nein | [Link](https://www.elationlighting.com/products/tvl-panel-dw) |
| Elation | Artiste DaVinci | movinghead / spot |  | 40CH | nein | [Link](https://www.elationlighting.com/products/artiste-davinci) |
| Elation | Artiste Van Gogh | movinghead / wash |  | 22CH, 36CH | nein | [Link](https://www.elationlighting.com/products/artiste-van-gogh) |
| Elation | Proteus Smarty Hybrid | movinghead / spot |  | 20CH, 34CH | nein | [Link](https://www.elationlighting.com/products/proteus-smarty-hybrid) |
| Elation | Satura Profile | movinghead / profile |  | 33CH, 35CH, 54CH | nein | [Link](https://www.elationlighting.com/products/satura-profile) |
| Elation | Satura Spot LED Pro | movinghead / spot |  | 22CH, 24CH, 32CH | nein | [Link](https://www.elationlighting.com/products/satura-spot-led-pro) |
| Elation | Fuze Wash 575 | movinghead / wash |  | 11CH | nein | [Link](https://www.elationlighting.com/products/fuze-wash-575) |
| Elation | Fuze Profile CW | movinghead / profile |  | 26CH, 40CH | nein | [Link](https://www.elationlighting.com/products/fuze-profile-cw) |
| Elation | Platinum FLX | movinghead / spot |  | 24CH, 26CH, 37CH | nein | [Link](https://www.elationlighting.com/products/platinum-flx) |
| Elation | Platinum SBX | movinghead / spot |  | 16CH, 18CH, 25CH | nein | [Link](https://www.elationlighting.com/products/platinum-sbx) |
| Elation | Platinum BX | movinghead / beam |  | 14CH, 16CH, 22CH | nein | [Link](https://www.elationlighting.com/products/platinum-bx) |
| Elation | Platinum Beam 5R Extreme | movinghead / beam |  | 12CH, 14CH, 18CH | nein | [Link](https://www.elationlighting.com/products/platinum-beam-5r-extreme) |
| Elation | Platinum Wash 16R Pro | movinghead / wash |  | 17CH, 19CH, 26CH | nein | [Link](https://www.elationlighting.com/products/platinum-wash-16r-pro) |
| Elation | Platinum Profile 35 Pro | movinghead / profile |  | 36CH, 38CH, 59CH | nein | [Link](https://www.elationlighting.com/products/platinum-profile-35-pro) |
| Elation | Platinum Spot 35 Pro | movinghead / spot |  | 27CH, 29CH, 41CH | nein | [Link](https://www.elationlighting.com/products/platinum-spot-35-pro) |
| Elation | Platinum Spot LED Pro II | movinghead / spot |  | 15CH, 17CH, 22CH | nein | [Link](https://www.elationlighting.com/products/platinum-spot-led-pro-ii) |
| Elation | Rayzor Q12 Zoom | movinghead / wash | 12 Zellen | 17CH, 20CH, 28CH | nein | [Link](https://www.elationlighting.com/products/rayzor-q12-zoom) |
| Elation | Rayzor 360Z | movinghead / wash | 3 Zellen | 20CH Pixel, 26CH Pixel, 32CH Pixel | nein | [Link](https://www.elationlighting.com/products/rayzor-360z) |
| Elation | Rayzor Beam 2R | movinghead / beam |  | 10CH, 12CH, 16CH | nein | [Link](https://www.elationlighting.com/products/rayzor-beam-2r) |
| Elation | Sniper Pro | effect |  | 2CH, 25CH, 27CH | nein | [Link](https://www.elationlighting.com/products/sniper-pro) |
| Elation | ACL 360 Bar | multibar | 7 Zellen | 17CH, 19CH, 43CH Pixel | nein | [Link](https://www.elationlighting.com/products/acl-360-bar) |
| Elation | ACL 360 Matrix | movinghead / matrix | 25 Zellen | 17CH, 19CH, 115CH Pixel | nein | [Link](https://www.elationlighting.com/products/acl-360-matrix) |
| Elation | ACL 360i | movinghead / beam |  | 16CH, 18CH, 20CH | nein | [Link](https://www.elationlighting.com/products/acl-360i) |
| Elation | ZCL 360 Bar | tiltbar | 5 Zellen | 37CH Pixel | nein | [Link](https://www.elationlighting.com/products/zcl-360-bar) |
| Elation | CUEPIX Panel | blinder | 1 Zellen | 3CH, 6CH, 7CH, 75CH, 79CH | nein | [Link](https://www.elationlighting.com/products/cuepix-panel) |
| Elation | CUEPIX 16IP | blinder | 16 Zellen | 128CH | nein | [Link](https://www.elationlighting.com/products/cuepix-16ip) |
| Elation | Protron 3K Color | strobe | 96 Zellen | 3CH, 4CH, 5CH, 7CH, 8CH | nein | [Link](https://www.elationlighting.com/products/protron-3k-color-led-strobe) |
| Elation | Protron Eclypse | strobe |  | 24CH | nein | [Link](https://www.elationlighting.com/products/protron-eclypse) |
| Elation | ZW37 | movinghead / wash | 37 Zellen | 14CH, 22CH, 42CH | nein | [Link](https://www.elationlighting.com/products/zw37) |
| Elation | Arena Zoom Q7IP | par | 7 Zellen | 12CH | nein | [Link](https://www.elationlighting.com/products/arena-zoom-q7ip) |
| Elation | DTW Bar 1000 | bar | 12 Zellen | 72CH | nein | [Link](https://www.elationlighting.com/products/dtw-bar-1000) |
| Elation | DW Profile | profile |  | 2CH, 3CH, 7CH, 8CH | nein | [Link](https://www.elationlighting.com/products/dw-profile) |
| Elation | WW Profile | profile |  | 1CH, 4CH | nein | [Link](https://www.elationlighting.com/products/ww-profile) |
| Elation | TVL Softlight DW | panel |  | 7CH | nein | [Link](https://www.elationlighting.com/products/tvl-softlight-dw) |
| Eurolite | AKKU B-40 Laser Strahleneffekt AIR | laser |  | 3CH, 10CH, 22CH | nein | [Link](https://www.steinigke.de/mpn41700340-eurolite-akku-b-40-laser-strahleneffekt-air.html) |
| Eurolite | AKKU B-40 Laser Strahleneffekt AIR weiß | laser |  | 3CH, 10CH, 22CH | nein | [Link](https://www.steinigke.de/mpn41700341-eurolite-akku-b-40-laser-strahleneffekt-air-weiss.html) |
| Eurolite | AKKU Bar-3 Glow QCL Flex QuickDMX | bar | 15 Zellen | 3CH, 7CH, 8CH, 9CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700117-eurolite-akku-bar-3-glow-qcl-flex-quickdmx.html) |
| Eurolite | AKKU Bar-6 Entry QCL RGBW Leiste | bar | 6 Zellen | 3CH, 4CH, 6CH, 8CH | nein | [Link](https://www.steinigke.de/mpn41700101-eurolite-akku-bar-6-entry-qcl-rgbw-leiste.html) |
| Eurolite | AKKU Bar-6 Glow QCL Flex QuickDMX | bar | 30 Zellen | 3CH, 7CH, 8CH, 9CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700120-eurolite-akku-bar-6-glow-qcl-flex-quickdmx.html) |
| Eurolite | AKKU Flat Light 3 sw | par | 3 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700016-eurolite-akku-flat-light-3-sw.html) |
| Eurolite | AKKU IP BAR-6 Entry QCL QuickDMX | bar | 6 Zellen | 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41700105-eurolite-akku-ip-bar-6-entry-qcl-quickdmx.html) |
| Eurolite | AKKU IP Flat Light 1 cr | par |  | 3CH, 4CH, 6CH, 8CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41700050-eurolite-akku-ip-flat-light-1-cr.html) |
| Eurolite | AKKU IP Flat Light 3 sw | par | 3 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700020-eurolite-akku-ip-flat-light-3-sw.html) |
| Eurolite | AKKU IP Flat Light SMD sw | par | 64 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41700051-eurolite-akku-ip-flat-light-smd-sw.html) |
| Eurolite | AKKU IP PAR 14 HCL QuickDMX | par | 14 Zellen | 1CH, 2CH, 3CH, 6CH, 12CH | nein | [Link](https://www.steinigke.de/mpn41700800-eurolite-akku-ip-par-14-hcl-quickdmx.html) |
| Eurolite | AKKU IP PAR 7 QCL CRMX MK2 | par | 7 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700793-eurolite-akku-ip-par-7-qcl-crmx-mk2.html) |
| Eurolite | AKKU IP Pixel Tube 360° PRO CRMX | tube | 96 Zellen | 1CH, 2CH, 4CH, 5CH, 7CH, 14CH, 16CH, 20CH, 22CH, 24CH, 120CH, 124CH | nein | [Link](https://www.steinigke.de/mpn41700420-eurolite-akku-ip-pixel-tube-360-pro-crmx.html) |
| Eurolite | AKKU IP TL-3 QCL Trusslight CRMX | par | 3 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700515-eurolite-akku-ip-tl-3-qcl-trusslight-crmx.html) |
| Eurolite | AKKU IP Tourlight 200 RGB+WW | par |  | 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41700900-eurolite-akku-ip-tourlight-200-rgb+ww.html) |
| Eurolite | AKKU IP Tourlight 200 WW | par |  | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn41700910-eurolite-akku-ip-tourlight-200-ww.html) |
| Eurolite | AKKU IP UP-4 Entry QCL Spot QuickDMX | par | 4 Zellen | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn41700585-eurolite-akku-ip-up-4-entry-qcl-spot-quickdmx.html) |
| Eurolite | AKKU IP UP-4 Plus HCL Spot CRMX MK2 | par | 4 Zellen | 6CH, 8CH, 12CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700583-eurolite-akku-ip-up-4-plus-hcl-spot-crmx-mk2.html) |
| Eurolite | AKKU IP UP-4 QCL Spot QuickDMX MK2 | par | 4 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700548-eurolite-akku-ip-up-4-qcl-spot-quickdmx-mk2.html) |
| Eurolite | AKKU MBT-3 Spot MK2 | par | 3 Zellen | 3CH, 4CH, 8CH, 12CH Pixel, 16CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700150-eurolite-akku-mbt-3-spot-mk2.html) |
| Eurolite | AKKU Mini PARty RGBW Spot MK2 | par | 3 Zellen | 4CH Pixel, 6CH Pixel | nein | [Link](https://www.steinigke.de/mpn42110205-eurolite-akku-mini-party-rgbw-spot-mk2.html) |
| Eurolite | AKKU Multiflood IP 18x10W RGBW Wash CRMX | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41606265-eurolite-akku-multiflood-ip-18x10w-rgbw-wash-crmx.html) |
| Eurolite | AKKU Multiflood IP 8x10W RGBW Wash CRMX | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41606258-eurolite-akku-multiflood-ip-8x10w-rgbw-wash-crmx.html) |
| Eurolite | AKKU PAR 6 QCL | par | 6 Zellen | 6CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700700-eurolite-akku-par-6-qcl.html) |
| Eurolite | AKKU PLL-168 WW/CW Panel | panel | 64 Zellen | 2CH, 4CH, 6CH | nein | [Link](https://www.steinigke.de/mpn40001845-eurolite-akku-pll-168-ww-cw-panel.html) |
| Eurolite | AKKU PT-100/32 Pixel DMX Tube | tube | 32 Zellen | 3CH, 5CH, 8CH, 48CH, 96CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700350-eurolite-akku-pt-100-32-pixel-dmx-tube.html) |
| Eurolite | AKKU Slim Tube AIR | tube | 32 Zellen | 4CH, 6CH, 10CH, 13CH, 19CH, 49CH | nein | [Link](https://www.steinigke.de/mpn41700401-eurolite-akku-slim-tube-air.html) |
| Eurolite | AKKU TL-3 QCL RGB+UV Trusslight | par | 3 Zellen | 2CH, 4CH, 5CH, 6CH, 9CH Pixel | nein | [Link](https://www.steinigke.de/mpn41700510-eurolite-akku-tl-3-qcl-rgb+uv-trusslight.html) |
| Eurolite | AKKU TL-3 TCL Trusslight QuickDMX | par | 3 Zellen | 3CH, 5CH, 8CH | nein | [Link](https://www.steinigke.de/mpn41700501-eurolite-akku-tl-3-tcl-trusslight-quickdmx.html) |
| Eurolite | AKKU TL-3 TCL Trusslight QuickDMX ws | par | 3 Zellen | 3CH, 5CH, 8CH | nein | [Link](https://www.steinigke.de/mpn41700503-eurolite-akku-tl-3-tcl-trusslight-quickdmx-ws.html) |
| Eurolite | AKKU UP-1 QCL Flex Spot QuickDMX | par |  | 3CH, 4CH, 6CH, 8CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41700505-eurolite-akku-up-1-qcl-flex-spot-quickdmx.html) |
| Eurolite | AKKU UP-4 Entry QCL Spot | par | 4 Zellen | 3CH, 4CH, 6CH, 8CH | nein | [Link](https://www.steinigke.de/mpn41700575-eurolite-akku-up-4-entry-qcl-spot.html) |
| Eurolite | AKKU UP-4 QCL Spot QuickDMX MK2 | par | 4 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41700546-eurolite-akku-up-4-qcl-spot-quickdmx-mk2.html) |
| Eurolite | Audience Blinder 2x100W LED COB CW/WW | blinder | 2 Zellen | 4CH Pixel, 8CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606122-eurolite-audience-blinder-2x100w-led-cob-cw-ww.html) |
| Eurolite | Audience Blinder 2x100W LED COB WW | blinder | 2 Zellen | 2CH Pixel, 4CH Pixel, 6CH Pixel | nein | [Link](https://www.steinigke.de/mpn41604121-eurolite-audience-blinder-2x100w-led-cob-ww.html) |
| Eurolite | Audience Blinder 2xPAR-36 DMX sw | blinder | 1 Zellen | 1CH | nein | [Link](https://www.steinigke.de/mpn42103413-eurolite-audience-blinder-2xpar-36-dmx-sw.html) |
| Eurolite | Audience Blinder 4x100W LED COB CW/WW | blinder | 4 Zellen | 2CH, 8CH Pixel, 12CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606147-eurolite-audience-blinder-4x100w-led-cob-cw-ww.html) |
| Eurolite | DMX Megastrobe 3000 | strobe |  | 1CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn52202179-eurolite-dmx-megastrobe-3000.html) |
| Eurolite | IP Audience Blinder 2x100W LED COB RGB+WW | blinder | 2 Zellen | 4CH, 6CH, 8CH Pixel, 12CH Pixel | nein | [Link](https://www.steinigke.de/mpn41604160-eurolite-ip-audience-blinder-2x100w-led-cob-rgb+ww.html) |
| Eurolite | IP Audience Blinder 2x100W LED COB WW | blinder | 2 Zellen | 2CH Pixel, 6CH Pixel | nein | [Link](https://www.steinigke.de/mpn41604170-eurolite-ip-audience-blinder-2x100w-led-cob-ww.html) |
| Eurolite | LED 4C-7 Silent Slim Spot | par | 7 Zellen | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51915315-eurolite-led-4c-7-silent-slim-spot.html) |
| Eurolite | LED 7C-12 Silent Slim Spot | par | 12 Zellen | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51915321-eurolite-led-7c-12-silent-slim-spot.html) |
| Eurolite | LED B-100 Hypno Single Ball Strahleneffekt | derby / orb | 8 Zellen | 16CH | nein | [Link](https://www.steinigke.de/mpn51918825-eurolite-led-b-100-hypno-single-ball-strahleneffekt.html) |
| Eurolite | LED B-200 Hypno Double Ball Strahleneffekt | derby / orb | 8 Zellen | 17CH, 24CH | nein | [Link](https://www.steinigke.de/mpn51918826-eurolite-led-b-200-hypno-double-ball-strahleneffekt.html) |
| Eurolite | LED B-40 HCL Strahleneffekt MK2 | effect | 5 Zellen | 3CH, 12CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51918952-eurolite-led-b-40-hcl-strahleneffekt-mk2.html) |
| Eurolite | LED B-40 HCL Strahleneffekt MK2 ws | effect | 5 Zellen | 3CH, 12CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51918953-eurolite-led-b-40-hcl-strahleneffekt-mk2-ws.html) |
| Eurolite | LED B-40 Laser Strahleneffekt | laser |  | 3CH, 10CH, 22CH | nein | [Link](https://www.steinigke.de/mpn51741087-eurolite-led-b-40-laser-strahleneffekt.html) |
| Eurolite | LED B-40 Laser Strahleneffekt ws | laser |  | 3CH, 10CH, 22CH | nein | [Link](https://www.steinigke.de/mpn51741088-eurolite-led-b-40-laser-strahleneffekt-ws.html) |
| Eurolite | LED BAR-12 QCL RGB+WW Leiste | bar | 12 Zellen | 2CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51930388-eurolite-led-bar-12-qcl-rgb+ww-leiste.html) |
| Eurolite | LED BAR-12 QCL RGBW Leiste | bar | 12 Zellen | 2CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51930398-eurolite-led-bar-12-qcl-rgbw-leiste.html) |
| Eurolite | LED BAR-6 QCL RGB+UV Leiste | bar | 6 Zellen | 2CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51930394-eurolite-led-bar-6-qcl-rgb+uv-leiste.html) |
| Eurolite | LED BAR-6 QCL RGB+WW Leiste | bar | 6 Zellen | 2CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51930389-eurolite-led-bar-6-qcl-rgb+ww-leiste.html) |
| Eurolite | LED BAR-8 ABL SWING QCL Leiste | bar | 8 Zellen | 14CH, 19CH, 27CH Pixel, 58CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930384-eurolite-led-bar-8-abl-swing-qcl-leiste.html) |
| Eurolite | LED BC-6 Strahleneffekt | effect | 6 Zellen | 9CH | nein | [Link](https://www.steinigke.de/mpn51918806-eurolite-led-bc-6-strahleneffekt.html) |
| Eurolite | LED BP-9 Panel RGBW+CW | panel | 9 Zellen | 6CH, 12CH, 43CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930261-eurolite-led-bp-9-panel-rgbw+cw.html) |
| Eurolite | LED BREAKDANCE Strahleneffekt | effect | 12 Zellen | 32CH, 73CH | nein | [Link](https://www.steinigke.de/mpn50944324-eurolite-led-breakdance-strahleneffekt.html) |
| Eurolite | LED CAT-80 Strahleneffekt | effect |  | 7CH | nein | [Link](https://www.steinigke.de/mpn51918595-eurolite-led-cat-80-strahleneffekt.html) |
| Eurolite | LED CAT-80 Strahleneffekt ws | effect |  | 7CH | nein | [Link](https://www.steinigke.de/mpn51918596-eurolite-led-cat-80-strahleneffekt-ws.html) |
| Eurolite | LED CBB-2 COB RGB Leiste | bar | 2 Zellen | 3CH, 4CH, 5CH, 6CH Pixel, 11CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930274-eurolite-led-cbb-2-cob-rgb-leiste.html) |
| Eurolite | LED CBB-2 COB WW Leiste | bar | 2 Zellen | 2CH Pixel, 3CH Pixel, 5CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930276-eurolite-led-cbb-2-cob-ww-leiste.html) |
| Eurolite | LED CBB-2 WW/CW Fairlight | bar | 2 Zellen | 2CH, 3CH, 4CH Pixel, 6CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930272-eurolite-led-cbb-2-ww-cw-fairlight.html) |
| Eurolite | LED CBB-4 COB RGB Leiste | bar | 4 Zellen | 3CH, 5CH, 12CH Pixel, 15CH Pixel, 19CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930278-eurolite-led-cbb-4-cob-rgb-leiste.html) |
| Eurolite | LED CLS-18 QCL RGB/WW 18x7W | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51913905-eurolite-led-cls-18-qcl-rgb-ww-18x7w.html) |
| Eurolite | LED CLS-6 PIX HCL | panel |  | 1CH, 5CH, 6CH, 10CH, 26CH, 36CH | nein | [Link](https://www.steinigke.de/mpn51913909-eurolite-led-cls-6-pix-hcl.html) |
| Eurolite | LED CLS-9 QCL RGB/WW 9x7W | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51913901-eurolite-led-cls-9-qcl-rgb-ww-9x7w.html) |
| Eurolite | LED Compact Multi FX Laser Bar | laser |  | 2CH, 5CH, 8CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51741098-eurolite-led-compact-multi-fx-laser-bar.html) |
| Eurolite | LED D-2000 Strahleneffekt | effect | 5 Zellen | 5CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51918317-eurolite-led-d-2000-strahleneffekt.html) |
| Eurolite | LED D-30 Hybrid Strahleneffekt | effect | 6 Zellen | 4CH, 13CH | nein | [Link](https://www.steinigke.de/mpn51918310-eurolite-led-d-30-hybrid-strahleneffekt.html) |
| Eurolite | LED D-4000 Strahleneffekt | effect | 8 Zellen | 5CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51917318-eurolite-led-d-4000-strahleneffekt.html) |
| Eurolite | LED DMF-3 Hybrid Flowereffekt | derby | 36 Zellen | 8CH, 22CH | nein | [Link](https://www.steinigke.de/mpn51918562-eurolite-led-dmf-3-hybrid-flowereffekt.html) |
| Eurolite | LED DMF-4 Hybrid Flowereffekt | derby | 12 Zellen | 7CH | nein | [Link](https://www.steinigke.de/mpn51918563-eurolite-led-dmf-4-hybrid-flowereffekt.html) |
| Eurolite | LED EVO-120 QCL Multi-Effekt Projektor | effect |  | 6CH, 10CH, 17CH, 20CH | nein | [Link](https://www.steinigke.de/mpn51918551-eurolite-led-evo-120-qcl-multi-effekt-projektor.html) |
| Eurolite | LED FE-1750 Hybrid Laserflower | laser |  | 4CH, 13CH | nein | [Link](https://www.steinigke.de/mpn51741083-eurolite-led-fe-1750-hybrid-laserflower.html) |
| Eurolite | LED FE-300 Hybrid Flowereffekt | derby | 6 Zellen | 7CH | nein | [Link](https://www.steinigke.de/mpn51918569-eurolite-led-fe-300-hybrid-flowereffekt.html) |
| Eurolite | LED Flood 210 asym RGBLI | panel |  | 1CH, 3CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn40001020-eurolite-led-flood-210-asym-rgbli.html) |
| Eurolite | LED GF-120 Flowereffekt | derby | 1 Zellen | 6CH | nein | [Link](https://www.steinigke.de/mpn51918589-eurolite-led-gf-120-flowereffekt.html) |
| Eurolite | LED IP Atmo Bar 10 | bar | 10 Zellen | 14CH, 20CH, 50CH Pixel, 59CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606410-eurolite-led-ip-atmo-bar-10.html) |
| Eurolite | LED IP Atmo Blinder 9 | blinder | 64 Zellen | 13CH, 18CH, 72CH, 85CH | nein | [Link](https://www.steinigke.de/mpn41606430-eurolite-led-ip-atmo-blinder-9.html) |
| Eurolite | LED IP LP-120 Logo-Projektor | effect |  | 3CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn51799301-eurolite-led-ip-lp-120-logo-projektor.html) |
| Eurolite | LED IP Mega PIX Strobe 714 SWING | strobe | 96 Zellen | 8CH, 9CH, 11CH, 12CH, 17CH, 18CH, 71CH | nein | [Link](https://www.steinigke.de/mpn52200943-eurolite-led-ip-mega-pix-strobe-714-swing.html) |
| Eurolite | LED IP PAR 12x8W QCL Spot | par | 12 Zellen | 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51914231-eurolite-led-ip-par-12x8w-qcl-spot.html) |
| Eurolite | LED IP PAR 12x9W SCL Spot | par | 12 Zellen | 3CH, 5CH, 7CH, 9CH, 13CH | nein | [Link](https://www.steinigke.de/mpn51914233-eurolite-led-ip-par-12x9w-scl-spot.html) |
| Eurolite | LED IP PAR 14x10W HCL | par | 14 Zellen | 3CH, 5CH, 6CH, 8CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51914172-eurolite-led-ip-par-14x10w-hcl.html) |
| Eurolite | LED IP PAR 14x8W QCL | par | 14 Zellen | 2CH, 3CH, 4CH, 8CH | nein | [Link](https://www.steinigke.de/mpn51914178-eurolite-led-ip-par-14x8w-qcl.html) |
| Eurolite | LED IP PAR 3x8W QCL Spot | par | 3 Zellen | 3CH, 4CH, 5CH, 6CH, 10CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914234-eurolite-led-ip-par-3x8w-qcl-spot.html) |
| Eurolite | LED IP PAR 3x9W SCL Spot | par | 3 Zellen | 3CH, 5CH, 7CH, 9CH Pixel, 13CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914235-eurolite-led-ip-par-3x9w-scl-spot.html) |
| Eurolite | LED IP PAR 7x15W RGBL Spot | par | 7 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51914227-eurolite-led-ip-par-7x15w-rgbl-spot.html) |
| Eurolite | LED IP PAR 7x8W QCL Spot | par | 7 Zellen | 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51914230-eurolite-led-ip-par-7x8w-qcl-spot.html) |
| Eurolite | LED IP PAR 7x9W SCL Spot | par | 7 Zellen | 3CH, 5CH, 9CH, 13CH | nein | [Link](https://www.steinigke.de/mpn51914232-eurolite-led-ip-par-7x9w-scl-spot.html) |
| Eurolite | LED IP PAR 9 UV Spot | par | 9 Zellen | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51914255-eurolite-led-ip-par-9-uv-spot.html) |
| Eurolite | LED IP PAR-64 COB 3000K 100W Zoom sw | cob |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn41603610-eurolite-led-ip-par-64-cob-3000k-100w-zoom-sw.html) |
| Eurolite | LED IP PFE-40 CW/WW 15-30° | profile | 2 Zellen | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.steinigke.de/mpn40001705-eurolite-led-ip-pfe-40-cw-ww-15-30.html) |
| Eurolite | LED IP PFE-40 CW/WW 25-50° | profile | 2 Zellen | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.steinigke.de/mpn40001706-eurolite-led-ip-pfe-40-cw-ww-25-50.html) |
| Eurolite | LED IP PIX Strobe FROST 5pol | strobe | 96 Zellen | 7CH, 11CH, 19CH, 25CH, 26CH, 32CH, 33CH, 34CH, 35CH | nein | [Link](https://www.steinigke.de/mpn52200938-eurolite-led-ip-pix-strobe-frost-5pol.html) |
| Eurolite | LED IP PIX Strobe RGB CW+WW 5pol MK2 | strobe | 96 Zellen | 6CH, 10CH, 18CH, 24CH, 25CH, 32CH, 33CH, 34CH | nein | [Link](https://www.steinigke.de/mpn52200941-eurolite-led-ip-pix-strobe-rgb-cw+ww-5pol-mk2.html) |
| Eurolite | LED IP PIX Strobe RGB CW+WW MK2 | strobe | 96 Zellen | 6CH, 10CH, 18CH, 24CH, 25CH, 32CH, 33CH, 34CH | nein | [Link](https://www.steinigke.de/mpn52200939-eurolite-led-ip-pix-strobe-rgb-cw+ww-mk2.html) |
| Eurolite | LED IP PST-40 QCL Spot | par |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51916175-eurolite-led-ip-pst-40-qcl-spot.html) |
| Eurolite | LED IP PT-100/34 RGB/WW Pixel DMX Tube | tube | 96 Zellen | 3CH, 4CH, 6CH, 9CH, 13CH, 20CH, 68CH, 136CH | nein | [Link](https://www.steinigke.de/mpn51928619-eurolite-led-ip-pt-100-34-rgb-ww-pixel-dmx-tube.html) |
| Eurolite | LED IP T-Bar 16 QCL Leiste | bar | 16 Zellen | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51914107-eurolite-led-ip-t-bar-16-qcl-leiste.html) |
| Eurolite | LED IP T-Bar 8 QCL Leiste | bar | 8 Zellen | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51914098-eurolite-led-ip-t-bar-8-qcl-leiste.html) |
| Eurolite | LED IP T-PIX 12 HCL Leiste | bar | 12 Zellen | 6CH, 11CH, 24CH, 41CH, 77CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914111-eurolite-led-ip-t-pix-12-hcl-leiste.html) |
| Eurolite | LED IP T-PIX 18 QCL Leiste | bar | 18 Zellen | 3CH, 4CH, 6CH, 9CH, 22CH, 24CH, 36CH, 72CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914129-eurolite-led-ip-t-pix-18-qcl-leiste.html) |
| Eurolite | LED IP TL-3 QCL Trusslight | par | 3 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914270-eurolite-led-ip-tl-3-qcl-trusslight.html) |
| Eurolite | LED IP TMH-B250 Moving-Head Beam | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://www.steinigke.de/mpn51782205-eurolite-led-ip-tmh-b250-moving-head-beam.html) |
| Eurolite | LED IP TMH-H420 Beam/Wash/Flowereffekt | movinghead / beeeye | 7 Zellen | 18CH, 26CH, 46CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785940-eurolite-led-ip-tmh-h420-beam-wash-flowereffekt.html) |
| Eurolite | LED IP TMH-H760 Beam/Wash/Flowereffekt | movinghead / beeeye | 19 Zellen | 18CH, 30CH, 94CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785944-eurolite-led-ip-tmh-h760-beam-wash-flowereffekt.html) |
| Eurolite | LED IP TMH-S250 Moving-Head Beam/Spot/Wash | movinghead / spot |  | 18CH, 19CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51782200-eurolite-led-ip-tmh-s250-moving-head-beam-spot-wash.html) |
| Eurolite | LED IP TMH-W285 Hypno Moving-Head Wash | movinghead / beeeye | 19 Zellen | 18CH, 26CH | nein | [Link](https://www.steinigke.de/mpn51785932-eurolite-led-ip-tmh-w285-hypno-moving-head-wash.html) |
| Eurolite | LED IP Tourlight 200 RGB+WW | par |  | 3CH, 4CH, 5CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51914252-eurolite-led-ip-tourlight-200-rgb+ww.html) |
| Eurolite | LED IP Tourlight 200 WW | par |  | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51914253-eurolite-led-ip-tourlight-200-ww.html) |
| Eurolite | LED IP Tourlight 80 RGB+WW | par |  | 3CH, 4CH, 7CH, 12CH, 27CH | nein | [Link](https://www.steinigke.de/mpn51914246-eurolite-led-ip-tourlight-80-rgb+ww.html) |
| Eurolite | LED IP Triple Eye Hybrid | blinder | 3 Zellen | 1CH, 2CH, 5CH, 10CH, 12CH Pixel, 18CH Pixel, 36CH Pixel | nein | [Link](https://www.steinigke.de/mpn51914211-eurolite-led-ip-triple-eye-hybrid.html) |
| Eurolite | LED KLS Laser Bar FX AIR | bar | 4 Zellen | 3CH, 8CH, 11CH, 24CH Pixel, 27CH Pixel | nein | [Link](https://www.steinigke.de/mpn51741099-eurolite-led-kls-laser-bar-fx-air.html) |
| Eurolite | LED Laser Derby MK3 AIR | laser |  | 2CH, 4CH, 5CH, 7CH, 8CH, 9CH, 10CH, 14CH | nein | [Link](https://www.steinigke.de/mpn51741068-eurolite-led-laser-derby-mk3-air.html) |
| Eurolite | LED LP-100 Logo-Projektor MK2 | effect |  | 5CH | nein | [Link](https://www.steinigke.de/mpn51799326-eurolite-led-lp-100-logo-projektor-mk2.html) |
| Eurolite | LED LP-30 Logo-Projektor | effect |  | 2CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51799329-eurolite-led-lp-30-logo-projektor.html) |
| Eurolite | LED Mini D-20 Hybrid Strahleneffekt | effect | 16 Zellen | 1CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51918202-eurolite-led-mini-d-20-hybrid-strahleneffekt.html) |
| Eurolite | LED Mini Strobe ABL | strobe | 96 Zellen | 11CH | nein | [Link](https://www.steinigke.de/mpn52201081-eurolite-led-mini-strobe-abl.html) |
| Eurolite | LED PAR-56 HCL Short sw | par | 9 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51913591-eurolite-led-par-56-hcl-short-sw.html) |
| Eurolite | LED PAR-56 QCL Short sw | par | 9 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.steinigke.de/mpn51913593-eurolite-led-par-56-qcl-short-sw.html) |
| Eurolite | LED PAR-64 COB 3000K 100W Zoom sw | cob |  | 1CH, 2CH, 3CH | nein | [Link](https://www.steinigke.de/mpn41603600-eurolite-led-par-64-cob-3000k-100w-zoom-sw.html) |
| Eurolite | LED PAR-64 COB 3000K 100W Zoom ws | cob |  | 1CH, 2CH, 3CH | nein | [Link](https://www.steinigke.de/mpn41603602-eurolite-led-par-64-cob-3000k-100w-zoom-ws.html) |
| Eurolite | LED PAR-64 COB RGBW 120W Zoom sw MK2 | cob |  | 2CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn41603606-eurolite-led-par-64-cob-rgbw-120w-zoom-sw-mk2.html) |
| Eurolite | LED PARty Spot COB | cob |  | 2CH, 3CH, 4CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn42110201-eurolite-led-party-spot-cob.html) |
| Eurolite | LED PARty Spot Silent RGB/WW | par | 12 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.steinigke.de/mpn42110203-eurolite-led-party-spot-silent-rgb-ww.html) |
| Eurolite | LED PFE-100 RGBW Profile Spot | profile |  | 9CH | nein | [Link](https://www.steinigke.de/mpn40001982-eurolite-led-pfe-100-rgbw-profile-spot.html) |
| Eurolite | LED PFE-200 3000K Profile Spot | profile |  | 3CH | nein | [Link](https://www.steinigke.de/mpn40001975-eurolite-led-pfe-200-3000k-profile-spot.html) |
| Eurolite | LED PFE-250 3000K Profile Spot | profile |  | 3CH | nein | [Link](https://www.steinigke.de/mpn40001970-eurolite-led-pfe-250-3000k-profile-spot.html) |
| Eurolite | LED PFE-60 RGBW Profile Spot 20-50° | profile |  | 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn40001732-eurolite-led-pfe-60-rgbw-profile-spot-20-50.html) |
| Eurolite | LED PFE-60 RGBW Profile Spot 9-25° | profile |  | 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn40001731-eurolite-led-pfe-60-rgbw-profile-spot-9-25.html) |
| Eurolite | LED PFE-60 WW Profile Spot 20-50° | profile |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn40001712-eurolite-led-pfe-60-ww-profile-spot-20-50.html) |
| Eurolite | LED PFE-60 WW Profile Spot 9-25° | profile |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn40001711-eurolite-led-pfe-60-ww-profile-spot-9-25.html) |
| Eurolite | LED PFE-60 WW/CW Profile Spot 20-50° | profile | 2 Zellen | 2CH, 5CH | nein | [Link](https://www.steinigke.de/mpn40001722-eurolite-led-pfe-60-ww-cw-profile-spot-20-50.html) |
| Eurolite | LED PFE-60 WW/CW Profile Spot 9-25° | profile | 2 Zellen | 2CH, 5CH | nein | [Link](https://www.steinigke.de/mpn40001721-eurolite-led-pfe-60-ww-cw-profile-spot-9-25.html) |
| Eurolite | LED PIX-12 SWING QCL Zoom Leiste | bar | 12 Zellen | 28CH, 34CH, 67CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930386-eurolite-led-pix-12-swing-qcl-zoom-leiste.html) |
| Eurolite | LED PIX-144 RGB Leiste | bar | 8 Zellen | 3CH, 5CH, 6CH, 12CH, 24CH Pixel, 48CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930439-eurolite-led-pix-144-rgb-leiste.html) |
| Eurolite | LED PIX-144 RGBW Leiste | bar | 96 Zellen | 6CH, 9CH, 16CH, 30CH, 58CH | nein | [Link](https://www.steinigke.de/mpn51930351-eurolite-led-pix-144-rgbw-leiste.html) |
| Eurolite | LED PIX-144 RGBW Leiste ws | bar | 96 Zellen | 6CH, 9CH, 16CH, 30CH, 58CH | nein | [Link](https://www.steinigke.de/mpn51930349-eurolite-led-pix-144-rgbw-leiste-ws.html) |
| Eurolite | LED PIX-40 RGB Leiste | bar | 40 Zellen | 3CH, 11CH, 120CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930436-eurolite-led-pix-40-rgb-leiste.html) |
| Eurolite | LED PIX-72 RGB Leiste | bar | 4 Zellen | 3CH, 5CH, 6CH, 12CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930434-eurolite-led-pix-72-rgb-leiste.html) |
| Eurolite | LED Pixel Matrix Bar 10 RGB/WW | strobe | 10 Zellen | 4CH, 15CH, 40CH Pixel, 42CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606360-eurolite-led-pixel-matrix-bar-10-rgb-ww.html) |
| Eurolite | LED Pixel Matrix Panel 2x5 RGB/WW | strobe | 10 Zellen | 4CH, 15CH, 40CH Pixel, 42CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606355-eurolite-led-pixel-matrix-panel-2x5-rgb-ww.html) |
| Eurolite | LED Pixel Matrix Panel 5x5 RGB/WW | strobe | 25 Zellen | 4CH, 10CH, 15CH, 100CH Pixel, 102CH Pixel | nein | [Link](https://www.steinigke.de/mpn41606350-eurolite-led-pixel-matrix-panel-5x5-rgb-ww.html) |
| Eurolite | LED PLL-2000 RGBALC Panel | panel |  | 5CH, 8CH, 9CH, 11CH | nein | [Link](https://www.steinigke.de/mpn40001905-eurolite-led-pll-2000-rgbalc-panel.html) |
| Eurolite | LED PLL-360 6000K Panel | panel | 64 Zellen | 3CH | nein | [Link](https://www.steinigke.de/mpn40001891-eurolite-led-pll-360-6000k-panel.html) |
| Eurolite | LED PLL-384 CW/WW Panel | panel | 64 Zellen | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn40001892-eurolite-led-pll-384-cw-ww-panel.html) |
| Eurolite | LED PLL-384 RGB/WW Panel | panel | 64 Zellen | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn40001893-eurolite-led-pll-384-rgb-ww-panel.html) |
| Eurolite | LED PLL-480 QCL Panel | panel | 64 Zellen | 4CH, 6CH | nein | [Link](https://www.steinigke.de/mpn40001898-eurolite-led-pll-480-qcl-panel.html) |
| Eurolite | LED PLL-576 CW/WW Panel | panel | 64 Zellen | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn40001899-eurolite-led-pll-576-cw-ww-panel.html) |
| Eurolite | LED PLL-704 6000K Panel | panel | 64 Zellen | 1CH, 2CH, 3CH | nein | [Link](https://www.steinigke.de/mpn40001835-eurolite-led-pll-704-6000k-panel.html) |
| Eurolite | LED PMB-4 COB QCL 30W Leiste | bar | 4 Zellen | 3CH, 4CH, 5CH, 6CH, 8CH, 16CH Pixel, 20CH Pixel | nein | [Link](https://www.steinigke.de/mpn51930287-eurolite-led-pmb-4-cob-qcl-30w-leiste.html) |
| Eurolite | LED PR-100/32 Pixel DMX Rail | tube | 32 Zellen | 3CH, 5CH, 8CH, 48CH, 96CH Pixel | nein | [Link](https://www.steinigke.de/mpn51928609-eurolite-led-pr-100-32-pixel-dmx-rail.html) |
| Eurolite | LED PR-100/32 Pixel DMX Rail sw | tube | 32 Zellen | 3CH, 5CH, 8CH, 48CH, 96CH Pixel | nein | [Link](https://www.steinigke.de/mpn51928608-eurolite-led-pr-100-32-pixel-dmx-rail-sw.html) |
| Eurolite | LED PST-10 QCL Spot | par |  | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51916152-eurolite-led-pst-10-qcl-spot.html) |
| Eurolite | LED PST-10 QCL Spot ws | par |  | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51916153-eurolite-led-pst-10-qcl-spot-ws.html) |
| Eurolite | LED PST-15W MK2 COB RGBW Floor Spot/Wash | par |  | 4CH, 6CH, 7CH | nein | [Link](https://www.steinigke.de/mpn51916251-eurolite-led-pst-15w-mk2-cob-rgbw-floor-spot-wash.html) |
| Eurolite | LED PST-15W MK2 WW Floor Spot/Wash | par |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn51916252-eurolite-led-pst-15w-mk2-ww-floor-spot-wash.html) |
| Eurolite | LED PST-40 QCL Spot | par |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51916170-eurolite-led-pst-40-qcl-spot.html) |
| Eurolite | LED RETRO 6 Bar ABL | bar | 6 Zellen | 12CH, 16CH, 43CH | nein | [Link](https://www.steinigke.de/mpn51916645-eurolite-led-retro-6-bar-abl.html) |
| Eurolite | LED RETRO 6 Spot ABL | retro | 6 Zellen | 6CH, 10CH, 12CH, 16CH, 49CH | nein | [Link](https://www.steinigke.de/mpn51916605-eurolite-led-retro-6-spot-abl.html) |
| Eurolite | LED Silent Bar 16x4W RGB/WW | bar | 16 Zellen | 4CH, 6CH, 8CH, 18CH, 20CH | nein | [Link](https://www.steinigke.de/mpn51930370-eurolite-led-silent-bar-16x4w-rgb-ww.html) |
| Eurolite | LED Silent Par 12x10W RGBL | par | 12 Zellen | 4CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51915345-eurolite-led-silent-par-12x10w-rgbl.html) |
| Eurolite | LED Silent Par 6 QCL Floor sw | par | 6 Zellen | 6CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51915340-eurolite-led-silent-par-6-qcl-floor-sw.html) |
| Eurolite | LED Silent Par 6 QCL Floor ws | par | 6 Zellen | 6CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51915341-eurolite-led-silent-par-6-qcl-floor-ws.html) |
| Eurolite | LED SL-350 DMX Search Light | follow |  | 6CH | nein | [Link](https://www.steinigke.de/mpn51787316-eurolite-led-sl-350-dmx-search-light.html) |
| Eurolite | LED SL-400 DMX Search Light | follow |  | 6CH | nein | [Link](https://www.steinigke.de/mpn51787320-eurolite-led-sl-400-dmx-search-light.html) |
| Eurolite | LED SL-600 DMX Search Light | follow |  | 5CH | nein | [Link](https://www.steinigke.de/mpn51787330-eurolite-led-sl-600-dmx-search-light.html) |
| Eurolite | LED SLS-12 HCL MK2 Floor | par | 12 Zellen | 2CH, 3CH, 4CH, 6CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51915381-eurolite-led-sls-12-hcl-mk2-floor.html) |
| Eurolite | LED SLS-12 QCL Floor | par | 12 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.steinigke.de/mpn51915383-eurolite-led-sls-12-qcl-floor.html) |
| Eurolite | LED SLS-12 UV Floor | par | 12 Zellen | 1CH, 3CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51915283-eurolite-led-sls-12-uv-floor.html) |
| Eurolite | LED SLS-30 COB QCL Floor | par |  | 3CH, 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51915301-eurolite-led-sls-30-cob-qcl-floor.html) |
| Eurolite | LED SLS-30 COB RGBAL Floor | par |  | 3CH, 5CH, 7CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51915304-eurolite-led-sls-30-cob-rgbal-floor.html) |
| Eurolite | LED SLS-30 COB UV Floor | par |  | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51915303-eurolite-led-sls-30-cob-uv-floor.html) |
| Eurolite | LED SLS-30 COB WW Floor | par |  | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn51915302-eurolite-led-sls-30-cob-ww-floor.html) |
| Eurolite | LED SLS-6 TCL Spot | par | 6 Zellen | 2CH, 3CH, 4CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn51915361-eurolite-led-sls-6-tcl-spot.html) |
| Eurolite | LED SLS-603 TCL + UV Floor | par | 6 Zellen | 4CH, 8CH | nein | [Link](https://www.steinigke.de/mpn51915358-eurolite-led-sls-603-tcl-+-uv-floor.html) |
| Eurolite | LED SLS-98 Strobe SMD | strobe | 96 Zellen | 4CH, 9CH | nein | [Link](https://www.steinigke.de/mpn52201092-eurolite-led-sls-98-strobe-smd.html) |
| Eurolite | LED STP-10 Sunbar 3200K 10x5W Lichtleiste 6° | bar | 10 Zellen | 1CH, 3CH, 5CH, 10CH Pixel, 15CH Pixel | nein | [Link](https://www.steinigke.de/mpn42103491-eurolite-led-stp-10-sunbar-3200k-10x5w-lichtleiste-6.html) |
| Eurolite | LED STP-14 Sunbar | bar | 14 Zellen | 2CH, 6CH, 34CH, 37CH | nein | [Link](https://www.steinigke.de/mpn42103493-eurolite-led-stp-14-sunbar.html) |
| Eurolite | LED STP-15 QCL Leiste | bar | 14 Zellen | 9CH, 11CH, 17CH, 19CH | nein | [Link](https://www.steinigke.de/mpn42103494-eurolite-led-stp-15-qcl-leiste.html) |
| Eurolite | LED STP-7 Beam/Wash Bar | bar | 7 Zellen | 3CH, 4CH, 6CH, 10CH, 12CH, 15CH | nein | [Link](https://www.steinigke.de/mpn51930390-eurolite-led-stp-7-beam-wash-bar.html) |
| Eurolite | LED Strobe COB PRO 8x20W DMX | strobe | 8 Zellen | 5CH | nein | [Link](https://www.steinigke.de/mpn52200870-eurolite-led-strobe-cob-pro-8x20w-dmx.html) |
| Eurolite | LED Strobe SMD PRO 540 DMX RGB | strobe | 96 Zellen | 2CH, 3CH, 4CH, 5CH, 7CH, 9CH, 18CH, 22CH | nein | [Link](https://www.steinigke.de/mpn52200915-eurolite-led-strobe-smd-pro-540-dmx-rgb.html) |
| Eurolite | LED Strobe SMD PRO 864 DMX RGB | strobe | 96 Zellen | 5CH, 13CH, 54CH | nein | [Link](https://www.steinigke.de/mpn52200918-eurolite-led-strobe-smd-pro-864-dmx-rgb.html) |
| Eurolite | LED Super PIX Strobe 864 Panel | strobe | 96 Zellen | 4CH, 6CH, 7CH, 9CH, 16CH, 32CH | nein | [Link](https://www.steinigke.de/mpn52200922-eurolite-led-super-pix-strobe-864-panel.html) |
| Eurolite | LED TCL-150 Color Changer COB | par |  | 6CH | nein | [Link](https://www.steinigke.de/mpn51786110-eurolite-led-tcl-150-color-changer-cob.html) |
| Eurolite | LED TCL-450 Color Changer COB | par |  | 6CH | nein | [Link](https://www.steinigke.de/mpn51786114-eurolite-led-tcl-450-color-changer-cob.html) |
| Eurolite | LED THA-100F MK3 Theater-Spot | profile |  | 1CH, 3CH | nein | [Link](https://www.steinigke.de/mpn41602127-eurolite-led-tha-100f-mk3-theater-spot.html) |
| Eurolite | LED THA-120F MK2 Theater-Spot | profile |  | 1CH, 2CH, 4CH, 6CH, 16CH | nein | [Link](https://www.steinigke.de/mpn41602131-eurolite-led-tha-120f-mk2-theater-spot.html) |
| Eurolite | LED THA-150F Theater-Spot | profile |  | 2CH, 6CH, 7CH | nein | [Link](https://www.steinigke.de/mpn41602133-eurolite-led-tha-150f-theater-spot.html) |
| Eurolite | LED THA-230F Theater-Spot | profile |  | 1CH, 2CH, 4CH, 7CH, 18CH | nein | [Link](https://www.steinigke.de/mpn41602170-eurolite-led-tha-230f-theater-spot.html) |
| Eurolite | LED THA-250F P.O. Theater-Spot | profile |  | 3CH | nein | [Link](https://www.steinigke.de/mpn41602138-eurolite-led-tha-250f-po-theater-spot.html) |
| Eurolite | LED THA-40PC Theater-Spot sw | fresnel |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn41602080-eurolite-led-tha-40pc-theater-spot-sw.html) |
| Eurolite | LED THA-40PC Theater-Spot ws | fresnel |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn41602081-eurolite-led-tha-40pc-theater-spot-ws.html) |
| Eurolite | LED THA-450F Theater-Spot | profile |  | 1CH, 2CH, 4CH, 7CH, 18CH | nein | [Link](https://www.steinigke.de/mpn41602200-eurolite-led-tha-450f-theater-spot.html) |
| Eurolite | LED THA-500F Theater-Spot | profile |  | 1CH, 2CH, 4CH, 8CH | nein | [Link](https://www.steinigke.de/mpn41602180-eurolite-led-tha-500f-theater-spot.html) |
| Eurolite | LED Theatre COB 100 RGB+WW | profile |  | 4CH, 5CH, 6CH, 9CH | nein | [Link](https://www.steinigke.de/mpn41602018-eurolite-led-theatre-cob-100-rgb+ww.html) |
| Eurolite | LED Theatre COB 100 RGBAL | profile |  | 3CH, 5CH, 7CH, 10CH | nein | [Link](https://www.steinigke.de/mpn41602016-eurolite-led-theatre-cob-100-rgbal.html) |
| Eurolite | LED Theatre COB 100 WW | profile |  | 1CH, 4CH | nein | [Link](https://www.steinigke.de/mpn41602010-eurolite-led-theatre-cob-100-ww.html) |
| Eurolite | LED Theatre COB 100 WW/CW | profile | 2 Zellen | 2CH, 4CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn41602014-eurolite-led-theatre-cob-100-ww-cw.html) |
| Eurolite | LED Theatre COB 200 RGBAL | profile |  | 3CH, 5CH, 7CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41602036-eurolite-led-theatre-cob-200-rgbal.html) |
| Eurolite | LED Theatre COB 200 WW | profile |  | 1CH, 2CH, 4CH | nein | [Link](https://www.steinigke.de/mpn41602030-eurolite-led-theatre-cob-200-ww.html) |
| Eurolite | LED Theatre COB 200 WW/CW | profile | 2 Zellen | 2CH, 4CH, 5CH, 7CH | nein | [Link](https://www.steinigke.de/mpn41602034-eurolite-led-theatre-cob-200-ww-cw.html) |
| Eurolite | LED TL-4 QCL RGB+UV Trusslight | par | 4 Zellen | 3CH, 4CH, 8CH | nein | [Link](https://www.steinigke.de/mpn51915448-eurolite-led-tl-4-qcl-rgb+uv-trusslight.html) |
| Eurolite | LED TMH Bar B240 Moving-Head Beam | tiltbar | 4 Zellen | 8CH, 13CH, 15CH, 23CH Pixel, 27CH Pixel, 40CH Pixel, 48CH Pixel | nein | [Link](https://www.steinigke.de/mpn51786059-eurolite-led-tmh-bar-b240-moving-head-beam.html) |
| Eurolite | LED TMH Bar H240 Moving-Head Beam/Flower | tiltbar | 16 Zellen | 5CH, 9CH, 14CH, 25CH, 29CH, 44CH, 52CH Pixel | nein | [Link](https://www.steinigke.de/mpn51786057-eurolite-led-tmh-bar-h240-moving-head-beam-flower.html) |
| Eurolite | LED TMH Bar S120 Moving-Head Spots | tiltbar | 4 Zellen | 5CH, 9CH, 11CH, 17CH, 21CH, 30CH, 38CH | nein | [Link](https://www.steinigke.de/mpn51786055-eurolite-led-tmh-bar-s120-moving-head-spots.html) |
| Eurolite | LED TMH-41 Hypno Moving-Head Spot | movinghead / beeeye | 1 Zellen | 12CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51785895-eurolite-led-tmh-41-hypno-moving-head-spot.html) |
| Eurolite | LED TMH-B120 Hypno Moving-Head Beam | movinghead / beeeye | 1 Zellen | 21CH | nein | [Link](https://www.steinigke.de/mpn51786081-eurolite-led-tmh-b120-hypno-moving-head-beam.html) |
| Eurolite | LED TMH-B60 Moving-Head Beam | movinghead / beam |  | 12CH, 14CH | nein | [Link](https://www.steinigke.de/mpn51786082-eurolite-led-tmh-b60-moving-head-beam.html) |
| Eurolite | LED TMH-B90 Moving-Head Beam | movinghead / beam |  | 14CH | nein | [Link](https://www.steinigke.de/mpn51786080-eurolite-led-tmh-b90-moving-head-beam.html) |
| Eurolite | LED TMH-H180 Hybrid Moving-Head Spot/Wash COB | movinghead / spot |  | 21CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51786085-eurolite-led-tmh-h180-hybrid-moving-head-spot-wash-cob.html) |
| Eurolite | LED TMH-H240 Beam/Wash/Flowereffekt | movinghead / beeeye | 6 Zellen | 16CH, 21CH, 24CH Pixel, 32CH Pixel, 56CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785925-eurolite-led-tmh-h240-beam-wash-flowereffekt.html) |
| Eurolite | LED TMH-H380 Beam/Wash/Flowereffekt | movinghead / beeeye | 19 Zellen | 18CH, 30CH, 94CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785923-eurolite-led-tmh-h380-beam-wash-flowereffekt.html) |
| Eurolite | LED TMH-H60 Hybrid Moving-Head Spot/Flower | movinghead / beeeye | 1 Zellen | 16CH, 26CH | nein | [Link](https://www.steinigke.de/mpn51786071-eurolite-led-tmh-h60-hybrid-moving-head-spot-flower.html) |
| Eurolite | LED TMH-H90 Hybrid Moving-Head Spot/Wash COB | movinghead / spot |  | 25CH | nein | [Link](https://www.steinigke.de/mpn51786077-eurolite-led-tmh-h90-hybrid-moving-head-spot-wash-cob.html) |
| Eurolite | LED TMH-H90 Hybrid Moving-Head Spot/Wash COB ws | movinghead / spot |  | 25CH | nein | [Link](https://www.steinigke.de/mpn51786078-eurolite-led-tmh-h90-hybrid-moving-head-spot-wash-cob-ws.html) |
| Eurolite | LED TMH-S200 CMY Moving-Head Beam/Spot/Wash | movinghead / spot |  | 22CH | nein | [Link](https://www.steinigke.de/mpn51786087-eurolite-led-tmh-s200-cmy-moving-head-beam-spot-wash.html) |
| Eurolite | LED TMH-S30 Moving-Head Spot | movinghead / spot |  | 10CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51786070-eurolite-led-tmh-s30-moving-head-spot.html) |
| Eurolite | LED TMH-S60 Moving-Head Spot | movinghead / spot |  | 10CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51786072-eurolite-led-tmh-s60-moving-head-spot.html) |
| Eurolite | LED TMH-S60 Moving-Head Spot ws | movinghead / spot |  | 10CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51786073-eurolite-led-tmh-s60-moving-head-spot-ws.html) |
| Eurolite | LED TMH-W120 Hypno Moving-Head Wash | movinghead / beeeye | 1 Zellen | 23CH | nein | [Link](https://www.steinigke.de/mpn51785928-eurolite-led-tmh-w120-hypno-moving-head-wash.html) |
| Eurolite | LED TMH-W375 Matrix Moving-Head Wash Zoom | movinghead / matrix | 25 Zellen | 11CH, 22CH, 109CH Pixel, 122CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785931-eurolite-led-tmh-w375-matrix-moving-head-wash-zoom.html) |
| Eurolite | LED TMH-W400 Moving-Head Wash Zoom | movinghead / wash |  | 13CH | nein | [Link](https://www.steinigke.de/mpn51785930-eurolite-led-tmh-w400-moving-head-wash-zoom.html) |
| Eurolite | LED TMH-W480 Moving-Head Wash Zoom | movinghead / wash | 12 Zellen | 11CH, 16CH, 18CH, 58CH Pixel | nein | [Link](https://www.steinigke.de/mpn51785935-eurolite-led-tmh-w480-moving-head-wash-zoom.html) |
| Eurolite | LED TMH-W555 Moving-Head Wash Zoom | movinghead / wash | 37 Zellen | 24CH, 36CH, 48CH | nein | [Link](https://www.steinigke.de/mpn51785920-eurolite-led-tmh-w555-moving-head-wash-zoom.html) |
| Eurolite | LED TMH-W63 Moving-Head Zoom Wash | movinghead / wash | 7 Zellen | 15CH | nein | [Link](https://www.steinigke.de/mpn51785885-eurolite-led-tmh-w63-moving-head-zoom-wash.html) |
| Eurolite | LED TMH-X1 Moving-Head Beam | movinghead / beam |  | 14CH | nein | [Link](https://www.steinigke.de/mpn51785988-eurolite-led-tmh-x1-moving-head-beam.html) |
| Eurolite | LED TSL-150 Scan COB | scanner |  | 9CH | nein | [Link](https://www.steinigke.de/mpn51786119-eurolite-led-tsl-150-scan-cob.html) |
| Eurolite | LED TSL-1500 Scan | scanner |  | 13CH | nein | [Link](https://www.steinigke.de/mpn51786127-eurolite-led-tsl-1500-scan.html) |
| Eurolite | LED TSL-350 Scan COB | scanner |  | 10CH | nein | [Link](https://www.steinigke.de/mpn51786150-eurolite-led-tsl-350-scan-cob.html) |
| Eurolite | LED TSL-350 Scan COB ws | scanner |  | 10CH | nein | [Link](https://www.steinigke.de/mpn51786151-eurolite-led-tsl-350-scan-cob-ws.html) |
| Eurolite | LED WF-100 Wassereffekt | effect |  | 5CH | nein | [Link](https://www.steinigke.de/mpn51918547-eurolite-led-wf-100-wassereffekt.html) |
| Eurolite | LED WF-40 Wassereffekt | effect |  | 9CH | nein | [Link](https://www.steinigke.de/mpn51918544-eurolite-led-wf-40-wassereffekt.html) |
| Eurolite | LED Z-2000 Strahleneffekt | effect | 5 Zellen | 5CH, 9CH | nein | [Link](https://www.steinigke.de/mpn51918222-eurolite-led-z-2000-strahleneffekt.html) |
| Eurolite | LED Z-4000 Strahleneffekt | effect | 8 Zellen | 5CH, 12CH | nein | [Link](https://www.steinigke.de/mpn51918223-eurolite-led-z-4000-strahleneffekt.html) |
| Eurolite | LED Z-PAR 18x8W QCL Zoom | par | 18 Zellen | 7CH, 11CH | nein | [Link](https://www.steinigke.de/mpn51916505-eurolite-led-z-par-18x8w-qcl-zoom.html) |
| Eurolite | MDM-50 MOVING DOUBLE MIRROR | movinghead / spot |  | 10CH, 14CH, 16CH, 25CH, 88CH | nein | [Link](https://www.steinigke.de/mpn51918900-eurolite-mdm-50-moving-double-mirror.html) |
| Eurolite | Multiflood IP 18x10W RGBW Wash CRMX | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41606260-eurolite-multiflood-ip-18x10w-rgbw-wash-crmx.html) |
| Eurolite | Multiflood IP 24x40W RGBL SWING FROST | panel |  | 1CH, 2CH, 6CH, 7CH, 10CH, 13CH, 16CH, 28CH, 100CH, 106CH | nein | [Link](https://www.steinigke.de/mpn52200946-eurolite-multiflood-ip-24x40w-rgbl-swing-frost.html) |
| Eurolite | Multiflood IP 8x10W RGBW Wash | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41606250-eurolite-multiflood-ip-8x10w-rgbw-wash.html) |
| Eurolite | Multiflood IP 8x10W RGBW Wash CRMX | panel |  | 3CH, 4CH, 6CH, 8CH, 11CH | nein | [Link](https://www.steinigke.de/mpn41606255-eurolite-multiflood-ip-8x10w-rgbw-wash-crmx.html) |
| Eurolite | Multiflood Pro IP SMD RGBW Strobe/Wash MK2 | strobe | 96 Zellen | 7CH, 11CH, 12CH, 20CH, 25CH, 56CH, 66CH | nein | [Link](https://www.steinigke.de/mpn52200928-eurolite-multiflood-pro-ip-smd-rgbw-strobe-wash-mk2.html) |
| Eurolite | PolarStar RGB Laser | laser |  | 8CH | nein | [Link](https://www.steinigke.de/mpn51741069-eurolite-polarstar-rgb-laser.html) |
| Eurolite | PowerDome 200 RGBW | effect | 20 Zellen | 2CH, 3CH, 4CH, 5CH, 10CH | nein | [Link](https://www.steinigke.de/mpn51918860-eurolite-powerdome-200-rgbw.html) |
| Eurolite | RETRO BOWL 1 | retro | 1 Zellen | 7CH, 13CH, 15CH | nein | [Link](https://www.steinigke.de/mpn51916650-eurolite-retro-bowl-1.html) |
| Eurolite | Stage Panel 16 HCL LED | panel | 16 Zellen | 2CH, 3CH, 5CH, 6CH, 8CH, 11CH, 24CH, 32CH | nein | [Link](https://www.steinigke.de/mpn51913891-eurolite-stage-panel-16-hcl-led.html) |
| Eurolite | SUNSET IP BAR 12 Blinder dim2warm | blinder | 36 Zellen | 1CH, 4CH, 6CH, 12CH, 16CH, 21CH, 24CH, 34CH | nein | [Link](https://www.steinigke.de/mpn41604100-eurolite-sunset-ip-bar-12-blinder-dim2warm.html) |
| Eurolite | SUNSET IP EYE 1 Blinder dim2warm | blinder | 1 Zellen | 1CH, 4CH, 8CH, 10CH, 12CH | nein | [Link](https://www.steinigke.de/mpn41604105-eurolite-sunset-ip-eye-1-blinder-dim2warm.html) |
| Eurolite | TMH XB-280 Moving-Head-Beam | movinghead / beam |  | 16CH, 19CH | nein | [Link](https://www.steinigke.de/mpn51786825-eurolite-tmh-xb-280-moving-head-beam.html) |
| Eurolite | Zoom4Bar QCL Leiste | bar | 16 Zellen | 5CH, 7CH, 9CH, 20CH, 26CH | nein | [Link](https://www.steinigke.de/mpn51913896-eurolite-zoom4bar-qcl-leiste.html) |
| Fine Art | FA 1507 IP 2-in-1 Beam Wash Moving Head Light | movinghead / wash | 7 Zellen | 20CH, 32CH Pixel, 41CH Pixel, 48CH Pixel | nein | [Link](https://www.fineart-light.com/fa-1507-ip) |
| Fine Art | FA 17 iSPOT | movinghead / profile |  | 35CH, 43CH, 47CH | nein | [Link](https://www.fineart-light.com/fa-17-ispot) |
| Fine Art | FA 17 | movinghead / profile |  | 35CH, 43CH, 47CH | nein | [Link](https://www.fineart-light.com/fa-17) |
| Fine Art | FA 1700LB BSWF IP | movinghead / profile |  | 16CH, 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fa-1700lb-bswf-ip) |
| Fine Art | FA 1700LH BSWF IP | movinghead / profile |  | 16CH, 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fa-1700lh-bswf-ip) |
| Fine Art | FA 1700LH iSPOT IP | movinghead / profile |  | 16CH, 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fa-1700lh-ispot-ip) |
| Fine Art | FA 1700ZL BSWF | movinghead / profile |  | 16CH, 34CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fa-1700zl-bswf) |
| Fine Art | FA 17C iSPOT | movinghead / profile |  | 40CH, 50CH, 56CH | nein | [Link](https://www.fineart-light.com/fa-17c-ispot) |
| Fine Art | FA 17C | movinghead / profile |  | 40CH, 50CH, 56CH | nein | [Link](https://www.fineart-light.com/fa-17c) |
| Fine Art | FA 300 BEAM IP Outdoor Waterproof Moving Head Light | movinghead / beam |  | 21CH, 23CH, 27CH | nein | [Link](https://www.fineart-light.com/fa-300-beam-ip) |
| Fine Art | FA 500BSW IP 3-in-1 Beam Spot Wash Moving Head Light | movinghead / spot |  | 24CH, 29CH, 33CH | nein | [Link](https://www.fineart-light.com/fa-500-bsw-ip) |
| Fine Art | FA 6010 BATTEN | tiltbar | 10 Zellen | 25CH, 40CH Pixel, 91CH Pixel, 98CH Pixel, 148CH Pixel | nein | [Link](https://www.fineart-light.com/fa-6010-batten) |
| Fine Art | FINE 1000C STROBE | strobe |  | 12CH, 17CH, 167CH | nein | [Link](https://www.fineart-light.com/fine-1000c-strobe) |
| Fine Art | FINE 1200C STROBE IP | strobe | 96 Zellen | 16CH, 23CH, 48CH, 61CH, 138CH | nein | [Link](https://www.fineart-light.com/fine-1200c-strobe-ip) |
| Fine Art | FINE 1200C STROBE | strobe | 96 Zellen | 16CH, 23CH, 61CH, 138CH | nein | [Link](https://www.fineart-light.com/fine-1200c-strobe) |
| Fine Art | FINE 120LS BEAM IP | movinghead / beam |  | 15CH, 17CH, 21CH | nein | [Link](https://www.fineart-light.com/fine-120ls-beam-ip) |
| Fine Art | FINE 1400 PERF | movinghead / profile |  | 32CH, 35CH, 42CH | nein | [Link](https://www.fineart-light.com/fine-1400-perf) |
| Fine Art | FINE 1400LB BSWF IP | movinghead / profile |  | 32CH, 40CH, 44CH | nein | [Link](https://www.fineart-light.com/fine-1400lb-bswf-ip) |
| Fine Art | FINE 1400LH BSWF IP | movinghead / profile |  | 32CH, 40CH, 44CH | nein | [Link](https://www.fineart-light.com/fine-1400lh-bswf-ip) |
| Fine Art | FINE 150 FT IP | bar | 2 Zellen | 7CH, 11CH Pixel, 20CH Pixel | nein | [Link](https://www.fineart-light.com/fine-150-ft-ip) |
| Fine Art | FINE 150 FT | bar | 2 Zellen | 10CH Pixel, 16CH Pixel, 20CH Pixel | nein | [Link](https://www.fineart-light.com/fine-150-ft) |
| Fine Art | FINE 150W FT IP | bar | 1 Zellen | 7CH, 11CH, 20CH | nein | [Link](https://www.fineart-light.com/fine-150w-ft-ip) |
| Fine Art | FINE 150W FT | bar | 1 Zellen | 7CH, 11CH, 20CH | nein | [Link](https://www.fineart-light.com/fine-150w-ft) |
| Fine Art | FINE 1514 DG | par | 14 Zellen | 4CH, 5CH, 10CH | nein | [Link](https://www.fineart-light.com/fine-1514-dg) |
| Fine Art | FINE 1514 ZOOM | par | 14 Zellen | 5CH, 6CH, 11CH | nein | [Link](https://www.fineart-light.com/fine-1514-zoom) |
| Fine Art | FINE 1700L WASH PERF | movinghead / wash |  | 25CH, 29CH, 33CH | nein | [Link](https://www.fineart-light.com/fine-1700l-wash-perf) |
| Fine Art | FINE 1700LB BSWF IP | movinghead / profile |  | 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fine-1700lb-bswf-ip) |
| Fine Art | FINE 1700LC iSPOT | movinghead / profile |  | 39CH, 48CH, 55CH | nein | [Link](https://www.fineart-light.com/fine-1700lc-ispot) |
| Fine Art | FINE 1700LH BSWF IP | movinghead / profile |  | 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fine-1700lh-bswf-ip) |
| Fine Art | FINE 1700LH iSPOT IP | movinghead / profile |  | 34CH, 42CH, 46CH | nein | [Link](https://www.fineart-light.com/fine-1700lh-ispot-ip) |
| Fine Art | FINE 1700LH iSPOT | movinghead / profile |  | 34CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fine-1700lh-ispot) |
| Fine Art | FINE 1700Lite BSWF | movinghead / profile |  | 34CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fine-1700lite-bswf) |
| Fine Art | FINE 1700Ultra BSWF | movinghead / profile |  | 34CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fine-1700ultra-bswf) |
| Fine Art | FINE 1800 PERF | movinghead / profile |  | 32CH, 35CH, 42CH | nein | [Link](https://www.fineart-light.com/fine-1800-perf) |
| Fine Art | FINE 2000L BSWF | movinghead / profile |  | 32CH, 40CH, 44CH | nein | [Link](https://www.fineart-light.com/fine-2000l-bswf) |
| Fine Art | FINE 300D/400D FS | fresnel |  | 1CH, 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-300d/400d-fs) |
| Fine Art | FINE 300D/400D LEKO | profile |  | 1CH, 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-300d/400d-leko) |
| Fine Art | FINE 300D/T PANEL | panel | 420 Zellen | 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-300d/t-panel) |
| Fine Art | FINE 300T/400T FS | fresnel |  | 1CH, 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-300t/400t-fs) |
| Fine Art | FINE 300T/400T LEKO | profile |  | 1CH, 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-300t/400t-leko) |
| Fine Art | FINE 320 BEAM | movinghead / beam |  | 15CH, 17CH, 21CH | nein | [Link](https://www.fineart-light.com/fine-320-beam) |
| Fine Art | FINE 400C FS | fresnel |  | 6CH, 8CH, 10CH, 11CH, 13CH | nein | [Link](https://www.fineart-light.com/fine-400c-fs) |
| Fine Art | FINE 400CL7 | panel |  | 4CH, 5CH, 7CH, 17CH | nein | [Link](https://www.fineart-light.com/fine-400cl7) |
| Fine Art | FINE 400D/T FS II | fresnel |  | 1CH, 4CH, 5CH | nein | [Link](https://www.fineart-light.com/fine-400d/t-fs-ii) |
| Fine Art | FINE 4019 PIXIE IP | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 97CH Pixel | nein | [Link](https://www.fineart-light.com/fine-4019-pixie-ip) |
| Fine Art | FINE 4019 PIXIE PLUS | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 97CH Pixel | nein | [Link](https://www.fineart-light.com/fine-4019-pixie-plus) |
| Fine Art | FINE 4019 WASH PLUS | movinghead / wash | 19 Zellen | 21CH, 33CH, 35CH, 37CH | nein | [Link](https://www.fineart-light.com/fine-4019-wash-plus) |
| Fine Art | FINE 4037 PIXIE PLUS | movinghead / wash | 37 Zellen | 21CH, 35CH, 132CH, 169CH Pixel | nein | [Link](https://www.fineart-light.com/fine-4037-pixie-plus) |
| Fine Art | FINE 4037 WASH PLUS | movinghead / wash | 37 Zellen | 21CH, 35CH, 36CH, 41CH | nein | [Link](https://www.fineart-light.com/fine-4037-wash-plus) |
| Fine Art | FINE 407 WASH Mini Moving Head Wash Light | movinghead / wash |  | 20CH | nein | [Link](https://www.fineart-light.com/fine-407-wash) |
| Fine Art | FINE 420 BEAM IP | movinghead / beam |  | 15CH, 17CH, 21CH | nein | [Link](https://www.fineart-light.com/fine-420-beam-ip) |
| Fine Art | FINE 450 BEAM | movinghead / beam |  | 17CH, 19CH, 23CH | nein | [Link](https://www.fineart-light.com/fine-450-beam) |
| Fine Art | FINE600 BSW II light in weight and easy to operate 3-in-1 Moving Head Beam Spot Wash Light Professional Stage Lighting | movinghead / spot |  | 24CH, 28CH, 32CH | nein | [Link](https://www.fineart-light.com/fine-600-bsw-ii) |
| Fine Art | FINE 600 BSW IP 3-in-1 Moving Head | movinghead / spot |  | 24CH, 28CH, 32CH | nein | [Link](https://www.fineart-light.com/fine-600-bsw-ip) |
| Fine Art | FINE 600C PANEL | panel | 504 Zellen | 7CH, 9CH, 10CH, 12CH, 14CH, 16CH, 17CH, 20CH, 27CH, 33CH | nein | [Link](https://www.fineart-light.com/fine-600c-panel) |
| Fine Art | FINE 600D/T PANEL | panel | 840 Zellen | 3CH, 4CH | nein | [Link](https://www.fineart-light.com/fine-600d/t-panel) |
| Fine Art | FINE 600L BSWF | movinghead / profile |  | 32CH, 40CH, 44CH | nein | [Link](https://www.fineart-light.com/fine-600l-bswf) |
| Fine Art | FINE 600L SL PLUS | profile |  | 1CH, 4CH, 5CH | nein | [Link](https://www.fineart-light.com/fine-600l-sl-plus) |
| Fine Art | FINE 600LB BSWF IP 3-in-1 Moving Head Light | movinghead / profile |  | 33CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fine-600lb-bswf-ip) |
| Fine Art | FINE 600LH BSWF IP | movinghead / profile |  | 33CH, 41CH, 45CH | nein | [Link](https://www.fineart-light.com/fine-600lh-bswf-ip) |
| Fine Art | FINE 6010 BATTEN IP | tiltbar | 10 Zellen | 25CH, 40CH Pixel, 91CH Pixel, 98CH Pixel, 148CH Pixel | nein | [Link](https://www.fineart-light.com/fine-6010-batten-ip) |
| Fine Art | FINE 6019 PIXIE IP | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 97CH Pixel | nein | [Link](https://www.fineart-light.com/fine-6019-pixie-ip) |
| Fine Art | FINE 604 BATTEN | tiltbar | 4 Zellen | 14CH, 26CH Pixel, 30CH Pixel | nein | [Link](https://www.fineart-light.com/fine-604-batten) |
| Fine Art | FINE 608 BATTEN | tiltbar | 8 Zellen | 15CH, 27CH, 39CH Pixel, 47CH Pixel | nein | [Link](https://www.fineart-light.com/fine-608-batten) |
| Fine Art | FINE 75 FT IP | bar | 24 Zellen | 10CH, 16CH, 20CH | nein | [Link](https://www.fineart-light.com/fine-75-ft-ip) |
| Fine Art | FINE 75 FT | bar | 24 Zellen | 10CH, 12CH, 16CH | nein | [Link](https://www.fineart-light.com/fine-75-ft) |
| Fine Art | FINE 75W FT IP | bar | 1 Zellen | 7CH, 11CH, 20CH | nein | [Link](https://www.fineart-light.com/fine-75w-ft-ip) |
| Fine Art | FINE 75W FT | bar | 1 Zellen | 7CH, 11CH, 12CH | nein | [Link](https://www.fineart-light.com/fine-75w-ft) |
| Fine Art | FINE 800C STROBE PRO IP | strobe | 240 Zellen | 12CH, 22CH, 66CH | nein | [Link](https://www.fineart-light.com/fine-800c-strobe-pro-ip) |
| Futurelight | DMH-190 Hybrid Moving-Head Spot/Beam | movinghead / spot |  | 17CH, 21CH | nein | [Link](https://www.steinigke.de/mpn51841974-futurelight-dmh-190-hybrid-moving-head-spot-beam.html) |
| Futurelight | DMH-380 Hybrid CMY Moving-Head Spot/Beam | movinghead / spot |  | 26CH, 30CH | nein | [Link](https://www.steinigke.de/mpn51841985-futurelight-dmh-380-hybrid-cmy-moving-head-spot-beam.html) |
| Futurelight | DMH-640 Profile CMY Moving-Head Spot | movinghead / profile |  | 33CH, 35CH, 39CH | nein | [Link](https://www.steinigke.de/mpn51841990-futurelight-dmh-640-profile-cmy-moving-head-spot.html) |
| Futurelight | EYE-1940 QCL Zoom LED Moving-Head Wash | movinghead / wash | 19 Zellen | 18CH, 25CH, 30CH, 37CH, 49CH, 94CH Pixel, 101CH Pixel, 113CH Pixel | nein | [Link](https://www.steinigke.de/mpn51841302-futurelight-eye-1940-qcl-zoom-led-moving-head-wash.html) |
| Futurelight | EYE-740 MK2 QCL Zoom LED Moving-Head Wash | movinghead / wash | 7 Zellen | 18CH, 25CH, 26CH, 33CH Pixel, 37CH Pixel, 45CH Pixel, 46CH Pixel, 53CH Pixel, 65CH Pixel | nein | [Link](https://www.steinigke.de/mpn51841303-futurelight-eye-740-mk2-qcl-zoom-led-moving-head-wash.html) |
| Futurelight | IP PLB-420 Moving-Head Beam | movinghead / beam |  | 18CH | nein | [Link](https://www.steinigke.de/mpn51838830-futurelight-ip-plb-420-moving-head-beam.html) |
| Futurelight | IP PLH-420 Moving-Head Spot/Beam | movinghead / spot |  | 23CH | nein | [Link](https://www.steinigke.de/mpn51838800-futurelight-ip-plh-420-moving-head-spot-beam.html) |
| Futurelight | PRO Slim Strobe SMD 840 CW | strobe | 96 Zellen | 2CH, 3CH, 5CH, 7CH, 17CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51842710-futurelight-pro-slim-strobe-smd-840-cw.html) |
| Futurelight | PRO Slim Strobe SMD 840 WW | strobe | 96 Zellen | 2CH, 3CH, 5CH, 7CH, 17CH, 23CH | nein | [Link](https://www.steinigke.de/mpn51842715-futurelight-pro-slim-strobe-smd-840-ww.html) |
| Futurelight | Profile 200, 20-45° | profile |  | 1CH, 2CH | nein | [Link](https://www.steinigke.de/mpn51840915-futurelight-profile-200-20-45.html) |
| GLP | impression X5 Compact | movinghead / wash | 7 Zellen | 22CH, 32CH Pixel, 33CH Pixel, 36CH Pixel, 39CH Pixel, 51CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-x5-compact-en) |
| GLP | impression X5 IP | movinghead / wash | 19 Zellen | 24CH, 35CH, 41CH, 70CH, 89CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-x5-ip-en) |
| GLP | impression X5 IP Maxx | movinghead / wash | 37 Zellen | 22CH, 33CH, 42CH, 122CH, 141CH, 159CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-x5-ip-maxx-en) |
| GLP | impression X5 Bar 1000 | tiltbar | 18 Zellen | 20CH, 33CH, 48CH, 63CH, 81CH Pixel, 84CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-x5-bar-1000-en) |
| GLP | impression X5 IP Bar 1000 | tiltbar | 18 Zellen | 20CH, 33CH, 48CH, 63CH, 81CH Pixel, 84CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-x5-ip-bar-1000-en) |
| GLP | X5 atom | par |  | 17CH, 60CH, 84CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/x5-atom-en) |
| GLP | X5 dot | par |  | 6CH, 9CH, 11CH, 12CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/x5-dot-en) |
| GLP | impression FR2 | movinghead / wash | 32 Zellen | 18CH, 28CH, 40CH, 52CH, 171CH, 427CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-fr2-en) |
| GLP | impression FR10 Bar | multibar | 10 Zellen | 25CH, 51CH, 57CH, 79CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/impression-fr10-bar-en) |
| GLP | Creos | movinghead / wash | 18 Zellen | 22CH, 34CH, 42CH, 51CH, 66CH, 84CH Pixel, 87CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/creos-en) |
| GLP | MAD MAXX | movinghead / beam |  | 15CH, 22CH, 70CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/mad-maxx-en) |
| GLP | WildBar 16 | tiltbar | 16 Zellen | 28CH, 79CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/wildbar-16-en) |
| GLP | Agilio | movinghead / spot |  | 7CH, 15CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/agilio-en) |
| GLP | Exo Beam 10 | movinghead / beam |  | 10CH, 15CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/fusion-exo-beam-10-en) |
| GLP | Exo Hybrid 40 | movinghead / spot |  | 10CH, 22CH, 27CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/fusion-exo-hybrid-40-en) |
| GLP | Exo Spot 30 | movinghead / spot |  | 23CH, 30CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/fusion-exo-spot-30-en) |
| GLP | Exo Wash 30 | movinghead / wash | 7 Zellen | 13CH, 22CH, 37CH Pixel, 50CH Pixel | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/moving-lights/fusion-exo-wash-30-en) |
| GLP | FUSION X-PAR 8Z | par |  | 4CH, 8CH, 11CH, 16CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/fusion-x-par-8z-en) |
| GLP | FUSION X-PAR 12Z | par |  | 4CH, 6CH, 8CH, 11CH, 16CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/fusion-x-par-12z-en) |
| GLP | FUSION X-PAR 18Z | par |  | 4CH, 6CH, 8CH, 11CH, 16CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/fusion-x-par-18z-en) |
| GLP | TW dot Pinspot | par |  | 4CH, 7CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/tw-dot-pinspot-en) |
| GLP | TW dot Wash | par |  | 6CH, 9CH, 11CH, 12CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/static-lights/tw-dot-wash-en) |
| GLP | JDC Burst 1 | strobe | 96 Zellen | 19CH, 37CH, 62CH, 68CH, 87CH, 105CH, 135CH, 153CH, 231CH, 249CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/strobes/jdc-burst-en) |
| GLP | JDC Line 500 | strobe | 96 Zellen | 16CH, 34CH, 38CH, 47CH, 84CH, 98CH, 158CH | nein | [Link](https://www.glp.de/en/products/entertainment-lighting/strobes/jdc-line-500-en) |
| GLP | ArenaLED1 Touring | panel |  | 2CH, 5CH, 7CH, 11CH, 34CH | nein | [Link](https://www.glp.de/en/products/glp-sports-lighting/sports-lighting/arenaled1-touring-en) |
| GLP | ArenaLED3 | panel |  | 2CH, 5CH, 8CH | nein | [Link](https://www.glp.de/en/products/glp-sports-lighting/sports-lighting/arenaled3-en) |
| GLP | impression S350 Wash | movinghead / wash |  | 27CH | nein | [Link](https://www.glp.de/en/products/discontinued/impression-s350-wash-en) |
| GLP | Highlander Wash | movinghead / wash |  | 12CH, 19CH, 26CH | nein | [Link](https://www.glp.de/en/products/discontinued/highlander-wash-en) |
| GLP | XDC1 IP Hybrid | strobe | 96 Zellen | 21CH, 50CH, 53CH, 58CH, 80CH, 92CH, 113CH | nein | [Link](https://www.glp.de/en/products/discontinued/xdc1-ip-hybrid-en) |
| GLP | KNV Line | bar | 5 Zellen | 8CH, 24CH Pixel | nein | [Link](https://www.glp.de/en/products/discontinued/knv-line-en) |
| GLP | KNV Dot | effect |  | 8CH, 24CH | nein | [Link](https://www.glp.de/en/products/discontinued/knv-dot-en) |
| GLP | FUSION Stick FS16 Z | bar | 16 Zellen | 4CH, 14CH, 33CH, 79CH Pixel | nein | [Link](https://www.glp.de/en/products/discontinued/fusion-stick-fs16-z-en) |
| GLP | FUSION PAR FP7 | par | 7 Zellen | 2CH, 3CH, 4CH, 5CH, 6CH, 8CH | nein | [Link](https://www.glp.de/en/products/discontinued/fusion-par-fp7-en) |
| GLP | FUSION MBL 20 | blinder | 1 Zellen | 2CH, 5CH | nein | [Link](https://www.glp.de/en/products/discontinued/fusion-mbl-20-en) |
| GLP | FUSION MBL 40 | blinder | 1 Zellen | 2CH, 5CH | nein | [Link](https://www.glp.de/en/products/discontinued/fusion-mbl-40-en) |
| Golden Sea | GLZ100 | movinghead / beam |  | 15CH, 17CH, 24CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/182) |
| Golden Sea | GLZ300 IP | movinghead / beam |  | 22CH, 24CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/187) |
| Golden Sea | GLZ100X | movinghead / beam |  | 16CH, 18CH, 25CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/188) |
| Golden Sea | G550B IP | movinghead / beam |  | 24CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/189) |
| Golden Sea | TP300 | panel |  | 8CH, 13CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/204) |
| Golden Sea | SH9 | movinghead / beam |  | 17CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/206) |
| Golden Sea | GLZ100 IP | movinghead / beam |  | 27CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/211) |
| Golden Sea | GL750PH | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/213) |
| Golden Sea | GLZ500 IP | movinghead / beam |  | 27CH, 38CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/214) |
| Golden Sea | S620B | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/215) |
| Golden Sea | S620H | movinghead / spot |  | 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/216) |
| Golden Sea | TP300FX | panel |  | 36CH, 61CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/222) |
| Golden Sea | TP300 TW | panel |  | 7CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/227) |
| Golden Sea | S620B IP | movinghead / beam |  | 20CH, 29CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/228) |
| Golden Sea | S620H IP | movinghead / spot |  | 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/229) |
| Golden Sea | SL880P IP | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/230) |
| Golden Sea | SL880P | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/231) |
| Golden Sea | SL3000P IP | movinghead / profile |  | 44CH, 66CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/233) |
| Golden Sea | GLW1940 IP | movinghead / wash | 19 Zellen | 25CH, 95CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/234) |
| Golden Sea | SL10P IP | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/236) |
| Golden Sea | T400WW | profile |  | 1CH, 4CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/239) |
| Golden Sea | GL9P IP | movinghead / profile |  | 43CH, 44CH, 68CH, 69CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/251) |
| Golden Sea | SL18P | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/267) |
| Golden Sea | SLZ IP | movinghead / spot |  | 27CH, 40CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/270) |
| Golden Sea | S620HL IP | movinghead / spot |  | 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/273) |
| Golden Sea | S620HL | movinghead / spot |  | 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/274) |
| Golden Sea | SLC IP | movinghead / profile |  | 49CH, 73CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/275) |
| Golden Sea | S620BL | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/277) |
| Golden Sea | S620BL IP | movinghead / beam |  | 20CH, 29CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/278) |
| Golden Sea | T180C II | profile |  | 5CH, 6CH, 8CH, 13CH, 19CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/279) |
| Golden Sea | SL18P IP | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/308) |
| Golden Sea | T400TW | profile |  | 4CH, 9CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/314) |
| Golden Sea | GS-Z1940 | par | 19 Zellen | 16CH, 24CH, 104CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/315) |
| Golden Sea | G21 HYBRID | movinghead / spot |  | 25CH, 27CH, 39CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/1) |
| Golden Sea | G20 HYBRID IP | movinghead / spot |  | 24CH, 26CH, 37CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/2) |
| Golden Sea | G14B IP | movinghead / beam |  | 17CH, 19CH, 28CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/3) |
| Golden Sea | G12 HYBRID | movinghead / spot |  | 24CH, 26CH, 37CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/4) |
| Golden Sea | G12WB | movinghead / spot |  | 22CH, 24CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/5) |
| Golden Sea | G10 HYBRID | movinghead / spot |  | 16CH, 18CH, 25CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/6) |
| Golden Sea | G10B | movinghead / beam |  | 12CH, 14CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/7) |
| Golden Sea | G9 HYBRID | movinghead / spot |  | 17CH, 19CH, 26CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/8) |
| Golden Sea | G9B | movinghead / beam |  | 14CH, 16CH, 22CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/9) |
| Golden Sea | PT330W | movinghead / wash |  | 17CH, 19CH, 26CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/10) |
| Golden Sea | PT320B | movinghead / beam |  | 14CH, 16CH, 22CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/11) |
| Golden Sea | PT320S | movinghead / spot |  | 21CH, 23CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/12) |
| Golden Sea | PT189B | movinghead / beam |  | 12CH, 14CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/13) |
| Golden Sea | PDH-2R | movinghead / beam |  | 21CH, 24CH, 32CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/14) |
| Golden Sea | PTB-2R | movinghead / beam |  | 10CH, 12CH, 16CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/15) |
| Golden Sea | V1000P | movinghead / profile |  | 37CH, 39CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/16) |
| Golden Sea | V1000LT | movinghead / profile |  | 36CH, 38CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/17) |
| Golden Sea | V2500S | movinghead / spot |  | 27CH, 29CH, 41CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/18) |
| Golden Sea | V3000P | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/22) |
| Golden Sea | PT160PRO | movinghead / spot |  | 21CH, 23CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/25) |
| Golden Sea | PT160S | movinghead / spot |  | 15CH, 17CH, 24CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/26) |
| Golden Sea | JT160B | movinghead / beam |  | 10CH, 12CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/27) |
| Golden Sea | PT230B | movinghead / beam |  | 12CH, 14CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/28) |
| Golden Sea | PT800S | movinghead / spot |  | 27CH, 29CH, 41CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/30) |
| Golden Sea | PT800B | movinghead / beam |  | 21CH, 23CH, 35CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/31) |
| Golden Sea | PT801P | movinghead / profile |  | 36CH, 38CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/32) |
| Golden Sea | V1200TB | movinghead / beam |  | 19CH, 21CH, 32CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/33) |
| Golden Sea | V1200TW | movinghead / wash |  | 14CH, 16CH, 23CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/34) |
| Golden Sea | V1500T-ER | movinghead / spot |  | 24CH, 26CH, 38CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/35) |
| Golden Sea | V1500TB-ER | movinghead / beam |  | 19CH, 21CH, 32CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/36) |
| Golden Sea | V1500TW-ER | movinghead / wash |  | 14CH, 16CH, 23CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/37) |
| Golden Sea | V2000B | movinghead / beam |  | 21CH, 23CH, 35CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/38) |
| Golden Sea | V2000P | movinghead / profile |  | 34CH, 36CH, 57CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/39) |
| Golden Sea | V2500P | movinghead / profile |  | 36CH, 38CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/40) |
| Golden Sea | V3000S | movinghead / spot |  | 28CH, 30CH, 43CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/41) |
| Golden Sea | LS-2R | effect |  | 11CH, 13CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/43) |
| Golden Sea | GL2P | movinghead / profile |  | 36CH, 38CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/50) |
| Golden Sea | GL4 | movinghead / profile |  | 23CH, 25CH, 35CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/51) |
| Golden Sea | GL5(GL5H) | movinghead / spot |  | 28CH, 30CH, 42CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/52) |
| Golden Sea | GL6 (GL6H) | movinghead / profile |  | 37CH, 39CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/53) |
| Golden Sea | GLW370Z | movinghead / wash | 37 Zellen | 17CH, 19CH, 165CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/54) |
| Golden Sea | OK370Z-R II | movinghead / wash | 37 Zellen | 19CH, 35CH, 49CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/55) |
| Golden Sea | GLW3QZ | movinghead / wash | 3 Zellen | 20CH Pixel, 22CH Pixel, 28CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/56) |
| Golden Sea | OK190Z-R II | movinghead / wash | 19 Zellen | 21CH, 33CH, 43CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/57) |
| Golden Sea | GLW7QZ | movinghead / wash | 7 Zellen | 19CH, 21CH Pixel, 26CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/58) |
| Golden Sea | GLW190Z | movinghead / wash | 19 Zellen | 17CH, 35CH, 93CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/59) |
| Golden Sea | GLW1925 | movinghead / wash | 19 Zellen | 22CH, 31CH, 40CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/61) |
| Golden Sea | OK108ZOOM | movinghead / wash | 108 Zellen | 14CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/62) |
| Golden Sea | LSP230PRO | movinghead / spot |  | 20CH, 22CH, 30CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/63) |
| Golden Sea | F90（CW/WW） | fresnel |  | 2CH, 3CH, 6CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/64) |
| Golden Sea | T180C | profile |  | 5CH, 6CH, 8CH, 13CH, 19CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/65) |
| Golden Sea | F250 | fresnel |  | 2CH, 3CH, 7CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/66) |
| Golden Sea | C5 | bar | 1 Zellen | 12CH, 20CH, 28CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/69) |
| Golden Sea | TP01（CW/WW） | panel |  | 1CH, 3CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/70) |
| Golden Sea | T250 | profile |  | 2CH, 3CH, 7CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/71) |
| Golden Sea | T90（CW/WW） | profile |  | 1CH, 4CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/72) |
| Golden Sea | OVAL48D | par | 48 Zellen | 4CH, 5CH, 7CH, 9CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/73) |
| Golden Sea | LPAR1Q | par |  | 4CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/74) |
| Golden Sea | LPAR7QZ | par | 7 Zellen | 5CH, 8CH, 16CH, 21CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/75) |
| Golden Sea | BPAR5QB-R | par | 5 Zellen | 4CH, 5CH, 11CH, 12CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/76) |
| Golden Sea | PB4D-RGBW | bar | 4 Zellen | 4CH, 5CH, 8CH, 10CH, 16CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/77) |
| Golden Sea | PB8D-RGBW | bar | 8 Zellen | 4CH, 5CH, 10CH, 16CH, 32CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/78) |
| Golden Sea | A51C | par | 15 Zellen | 13CH, 25CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/79) |
| Golden Sea | A51-E | par | 12 Zellen | 16CH, 29CH, 38CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/80) |
| Golden Sea | PB75 | bar | 75 Zellen | 5CH, 6CH, 8CH, 25CH, 28CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/82) |
| Golden Sea | LB70V | bar | 70 Zellen | 4CH, 5CH, 8CH, 11CH, 35CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/83) |
| Golden Sea | PAINTER150 | panel |  | 2CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/84) |
| Golden Sea | LB12T | bar | 12 Zellen | 3CH, 4CH, 6CH, 12CH, 15CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/85) |
| Golden Sea | LPAR21T | par | 21 Zellen | 7CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/86) |
| Golden Sea | OVAL36FC II | par | 36 Zellen | 4CH, 5CH, 7CH, 9CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/87) |
| Golden Sea | LSC36II | effect |  | 9CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/88) |
| Golden Sea | LPAR36X3 | par | 36 Zellen | 3CH, 4CH, 6CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/89) |
| Golden Sea | LBM51 | movinghead / beam |  | 9CH, 11CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/90) |
| Golden Sea | LSP150PRO | movinghead / spot |  | 15CH, 17CH, 22CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/91) |
| Golden Sea | OK7QZ | movinghead / wash | 7 Zellen | 16CH, 19CH, 23CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/92) |
| Golden Sea | OK7Q | movinghead / wash | 7 Zellen | 15CH, 17CH, 21CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/93) |
| Golden Sea | OK12Q | movinghead / wash | 12 Zellen | 15CH, 17CH, 21CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/94) |
| Golden Sea | OK12QZ | movinghead / wash | 12 Zellen | 16CH, 19CH, 23CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/95) |
| Golden Sea | LSP150S | movinghead / spot |  | 14CH, 16CH, 20CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/96) |
| Golden Sea | LSP40 | movinghead / spot |  | 14CH, 16CH, 20CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/97) |
| Golden Sea | LSP60 | movinghead / spot |  | 12CH, 14CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/98) |
| Golden Sea | LSP180S | movinghead / spot |  | 15CH, 17CH, 21CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/99) |
| Golden Sea | OVAL7D-E | par | 7 Zellen | 4CH, 5CH, 6CH, 8CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/100) |
| Golden Sea | OVAL9D-E | par | 9 Zellen | 4CH, 5CH, 6CH, 8CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/101) |
| Golden Sea | LSP300S | movinghead / spot |  | 22CH, 24CH, 33CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/102) |
| Golden Sea | OK108A-R | movinghead / wash | 108 Zellen | 11CH, 13CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/103) |
| Golden Sea | OK60A-R | movinghead / wash | 60 Zellen | 11CH, 13CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/104) |
| Golden Sea | V4000WP | movinghead / wash |  | 31CH, 33CH, 55CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/129) |
| Golden Sea | V4000P | movinghead / profile |  | 38CH, 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/130) |
| Golden Sea | GL10WP (GL10WPH) | movinghead / profile |  | 37CH, 39CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/132) |
| Golden Sea | T90H(CW/WW) | profile | 2 Zellen | 2CH, 5CH, 7CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/136) |
| Golden Sea | GL3WP | movinghead / wash |  | 26CH, 28CH, 41CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/138) |
| Golden Sea | T200C IP | profile |  | 12CH, 13CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/140) |
| Golden Sea | LH270 | movinghead / spot |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/141) |
| Golden Sea | F90H(CW/WW) | fresnel | 2 Zellen | 2CH, 3CH, 6CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/142) |
| Golden Sea | G25 HYBRID | movinghead / spot |  | 28CH, 30CH, 42CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/144) |
| Golden Sea | G7B NOVA | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/145) |
| Golden Sea | G7H NOVA | movinghead / spot |  | 23CH, 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/146) |
| Golden Sea | G7B NOVA IP | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/148) |
| Golden Sea | G22H NOVA IP | movinghead / spot |  | 24CH, 26CH, 37CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/150) |
| Golden Sea | G22H NOVA | movinghead / spot |  | 28CH, 30CH, 42CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/151) |
| Golden Sea | GLX IP (GLXH IP) | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/153) |
| Golden Sea | GLX (GLXH) | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/154) |
| Golden Sea | GL8P IP (GL8PH IP) | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/155) |
| Golden Sea | GL8P (GL8PH) | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/156) |
| Golden Sea | GLW760 IP | movinghead / wash | 7 Zellen | 20CH, 26CH, 48CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/159) |
| Golden Sea | G25B IP | movinghead / beam |  | 22CH, 26CH, 33CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/160) |
| Golden Sea | GLW3740 | movinghead / wash | 37 Zellen | 19CH, 25CH, 167CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/162) |
| Golden Sea | GLW1940 | movinghead / wash | 19 Zellen | 25CH, 95CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/163) |
| Golden Sea | LPAR7 IP | par | 7 Zellen | 5CH, 9CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/165) |
| Golden Sea | S380B IP | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/170) |
| Golden Sea | S380B | movinghead / beam |  | 17CH, 19CH, 27CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/171) |
| Golden Sea | S380H | movinghead / spot |  | 23CH, 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/173) |
| Golden Sea | S380H IP | movinghead / spot |  | 23CH, 25CH, 36CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/174) |
| Golden Sea | S550B IP | movinghead / beam |  | 22CH, 24CH, 34CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/175) |
| Golden Sea | S550H | movinghead / spot |  | 27CH, 29CH, 41CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/176) |
| Golden Sea | S550H IP | movinghead / spot |  | 25CH, 27CH, 39CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/177) |
| Golden Sea | SL1000P IP | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/178) |
| Golden Sea | SL1000PH | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/179) |
| Golden Sea | SL400S | movinghead / spot |  | 26CH, 28CH, 40CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/181) |
| Golden Sea | SL1200WP | movinghead / wash |  | 39CH, 59CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/185) |
| Golden Sea | SL1200P (SL1200PH) | movinghead / profile |  | 37CH, 39CH, 60CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/186) |
| Golden Sea | GLW760 | movinghead / wash | 7 Zellen | 18CH, 24CH, 46CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/190) |
| Golden Sea | SL5000P IP | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/198) |
| Golden Sea | SL5000P | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/201) |
| Golden Sea | GLW1920Z | movinghead / wash | 19 Zellen | 17CH, 35CH, 93CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/202) |
| Golden Sea | GLW3720Z | movinghead / wash | 37 Zellen | 17CH, 39CH, 165CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/203) |
| Golden Sea | SL5000WPH | movinghead / profile |  | 36CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/205) |
| Golden Sea | GL12W IP | movinghead / wash |  | 25CH, 34CH, 36CH, 56CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/208) |
| Golden Sea | SL5000WP IP | movinghead / profile |  | 36CH, 56CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/209) |
| Golden Sea | T400C | profile |  | 10CH, 16CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/210) |
| Golden Sea | T90H IP(CW/WW) | profile | 2 Zellen | 3CH, 6CH, 8CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/212) |
| Golden Sea | SL750P | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/218) |
| Golden Sea | MAX 02 | effect |  | 10CH, 15CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/219) |
| Golden Sea | GLW740 | movinghead / wash | 7 Zellen | 12CH, 24CH Pixel, 51CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/221) |
| Golden Sea | GLB12 IP | tiltbar | 12 Zellen | 29CH, 188CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/224) |
| Golden Sea | GLB6 IP | tiltbar | 6 Zellen | 27CH Pixel, 103CH Pixel | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/225) |
| Golden Sea | GLW1960 IP | movinghead / wash | 19 Zellen | 29CH, 176CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/226) |
| Golden Sea | GS-Z19 | par | 19 Zellen | 16CH, 24CH, 104CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/235) |
| Golden Sea | SL15P IP | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/258) |
| Golden Sea | GS-PAR19 | par | 19 Zellen | 9CH, 11CH, 18CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/266) |
| Golden Sea | SL15P | movinghead / profile |  | 40CH, 62CH | nein | [Link](https://en.terbly.com/index.php/Product/detail/goods_id/291) |
| IMG Stageline | TWIST-60LED | movinghead / spot |  | 10CH, 15CH | nein | [Link](https://www.ltt-versand.de/en/light/moving-lights/moving-head-spots-beams/22804/img-stage-line-twist-60led-compact-led-moving-head) |
| Involight | BLADE2 | movinghead / beam |  | 24CH, 53CH, 59CH, 86CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/blade2/) |
| Involight | COBPAR100HEX | cob |  | 3CH, 4CH, 6CH, 7CH, 8CH, 13CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/1857-cobpar100hex-4052809267395/) |
| Involight | COBPAR100W | cob |  | 3CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/76-cobpar100w-4052809266718/) |
| Involight | COBPAR150W | cob |  | 3CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/cobpar150w/) |
| Involight | HIVE | effect |  | 14CH, 19CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/hive-4052809268118/) |
| Involight | IP PAR1818 V.2 | par |  | 1CH, 5CH, 6CH, 7CH, 13CH | nein | [Link](https://involight.com/shop/ledpars/outdoor-led-pars/involight-ip-par1818-v2/) |
| Involight | IPBAR1818 | bar | 1 Zellen | 10CH, 28CH, 90CH, 100CH | nein | [Link](https://involight.com/shop/led-bars/led-bars-outdoor/ipbar1818/) |
| Involight | LED FS150 | follow |  | 3CH | nein | [Link](https://involight.com/shop/follow-spots/led-fs150271-led-fs150-4052809266602/) |
| Involight | LED FS75 | follow |  | 3CH | nein | [Link](https://involight.com/shop/follow-spots/fs75/) |
| Involight | LED RX350 | effect |  | 2CH, 3CH | nein | [Link](https://involight.com/shop/led-effects/208-led-rx350-4052809265636/) |
| Involight | LED RX350 HP | effect |  | 3CH, 7CH, 16CH | nein | [Link](https://involight.com/shop/led-effects/led-rx350-hp/) |
| Involight | LEDMH127B | movinghead / beam |  | 15CH, 19CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/1878-ledmh127b-4052809267166/) |
| Involight | LEDMH127S | movinghead / spot |  | 15CH, 19CH | nein | [Link](https://involight.com/shop/movingheads/spot-movingheads/428-ledmh127s-4052809267159/) |
| Involight | LEDMH50 DUAL | movinghead / beam |  | 14CH, 20CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/1913-ledmh50-dual-4052809267784/) |
| Involight | LEDPAR12HEX | par |  | 6CH, 7CH, 9CH, 12CH, 24CH | nein | [Link](https://involight.com/shop/ledpars/ledpar12hex/) |
| Involight | LEDPAR35W | par |  | 5CH, 7CH, 9CH | nein | [Link](https://involight.com/shop/ledpars/outdoor-led-pars/ledpar35w/) |
| Involight | LEDPAR95W | par |  | 5CH, 7CH, 9CH | nein | [Link](https://involight.com/shop/ledpars/outdoor-led-pars/ledpar95w/) |
| Involight | LIBERTY 50B | movinghead / beam |  | 10CH, 12CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/1909-liberty-50b-4052809267807/) |
| Involight | LIBERTY 50S | movinghead / spot |  | 11CH, 13CH | nein | [Link](https://involight.com/shop/movingheads/spot-movingheads/1910-liberty-50s-4052809267791/) |
| Involight | LIBERTY 710W | movinghead / wash |  | 15CH, 17CH | nein | [Link](https://involight.com/shop/movingheads/wash-movingheads/1911-liberty-710w-4052809267814/) |
| Involight | LIBERTY MODPAR | par | 4 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://involight.com/shop/ledpars/outdoor-led-pars/liberty-modpar/) |
| Involight | LIBERTY PAR1810IP | par |  | 9CH, 17CH | nein | [Link](https://involight.com/shop/ledpars/outdoor-led-pars/liberty-par1810ip/) |
| Involight | MH FXWASH1912 | movinghead / wash |  | 21CH, 23CH, 35CH, 78CH, 92CH, 97CH, 99CH | nein | [Link](https://involight.com/shop/movingheads/wash-movingheads/1874-mh-fxwash1912-4052809267647/) |
| Involight | OB200 | effect |  | 3CH | nein | [Link](https://involight.com/shop/led-effects/219-ob200-4052809266213/) |
| Involight | OB350 | effect |  | 7CH, 26CH | nein | [Link](https://involight.com/shop/led-effects/213-ob350-4052809266022/) |
| Involight | PAINTBAR UV12 | bar | 1 Zellen | 1CH, 2CH, 4CH | nein | [Link](https://involight.com/shop/led-bars/uv-bars/1846-paint-bar-uv12-4052809267562/) |
| Involight | PROBEAM50 | movinghead / beam |  | 10CH, 12CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/426-probeam50-4052809267265/) |
| Involight | PROSPOT50 | movinghead / spot |  | 11CH, 13CH | nein | [Link](https://involight.com/shop/movingheads/spot-movingheads/prospot50425-prospot50-4052809267258/) |
| Involight | SLIMPAR 710PRO | par |  | 6CH, 7CH, 8CH, 9CH, 11CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/slimpar-710pro/) |
| Involight | SLIMPAR1266 | par |  | 2CH, 3CH, 4CH, 6CH, 10CH | nein | [Link](https://involight.com/shop/ledpars/indoor-led-pars/slimpar1266/) |
| Involight | TRINITY150LED | movinghead / beam |  | 15CH, 20CH | nein | [Link](https://involight.com/shop/movingheads/moving-head-beam/1934-trinity150led-4052809268194/) |
| Involight | TRINITY200LED | movinghead / spot |  | 25CH, 30CH | nein | [Link](https://involight.com/shop/movingheads/spot-movingheads/1875-trinity200led-4052809266381/) |
| JB Systems | ACCU COLOR-BLACK | par |  | 4CH, 10CH | nein | [Link](https://jb-systems.eu/accu-color-black) |
| JB Systems | ACCU COLOR-WHITE | par |  | 4CH, 10CH | nein | [Link](https://jb-systems.eu/accu-color) |
| JB Systems | ACCU DECOLITE IP | par |  | 10CH | nein | [Link](https://jb-systems.eu/accu-decolite-ip) |
| JB Systems | ACCU MINI-PAR 12TC Mk2 | par |  | 3CH, 5CH | nein | [Link](https://jb-systems.eu/accu-mini-par-12tc-mk2) |
| JB Systems | ACCU-COMPACT | par |  | 10CH | nein | [Link](https://jb-systems.eu/accu-compact) |
| JB Systems | ALIEN | effect |  | 3CH, 28CH | nein | [Link](https://jb-systems.eu/alien) |
| JB Systems | CAM-LITE 200 | profile |  | 2CH, 4CH | nein | [Link](https://jb-systems.eu/cam-lite-200) |
| JB Systems | CAM-SPOT 50TW | par |  | 2CH, 4CH | nein | [Link](https://jb-systems.eu/cam-spot-50tw) |
| JB Systems | CHALLENGER BEAM | movinghead / beam |  | 5CH, 27CH | nein | [Link](https://jb-systems.eu/challenger-beam) |
| JB Systems | CHALLENGER WASH | movinghead / wash |  | 5CH, 43CH | nein | [Link](https://jb-systems.eu/challenger-wash) |
| JB Systems | CLUBSPOT | movinghead / spot |  | 5CH, 11CH | nein | [Link](https://jb-systems.eu/clubspot) |
| JB Systems | CLUBWASH 2 | movinghead / wash |  | 5CH, 15CH | nein | [Link](https://jb-systems.eu/clubwash-2) |
| JB Systems | CLUBWASH MINI | movinghead / wash |  | 5CH, 15CH | nein | [Link](https://jb-systems.eu/clubwash-mini) |
| JB Systems | DELUSION | effect |  | 3CH, 7CH | nein | [Link](https://jb-systems.eu/delusion) |
| JB Systems | EXPLORER SPOT | movinghead / spot |  | 5CH, 18CH | nein | [Link](https://jb-systems.eu/explorer-spot) |
| JB Systems | HEXAGON 3D | par |  | 3CH, 9CH | nein | [Link](https://jb-systems.eu/hexagon-3d) |
| JB Systems | INTRUDER | movinghead / wash |  | 7CH, 21CH | nein | [Link](https://jb-systems.eu/intruder) |
| JB Systems | INVADER | effect |  | 1CH, 9CH | nein | [Link](https://jb-systems.eu/invader) |
| JB Systems | KINETIC | effect |  | 1CH, 21CH | nein | [Link](https://jb-systems.eu/kinetic) |
| JB Systems | LED GLOBE | derby / orb | 1 Zellen | 1CH, 19CH | nein | [Link](https://jb-systems.eu/led-globe) |
| JB Systems | LED PAR12-6in1 | par |  | 2CH, 9CH | nein | [Link](https://jb-systems.eu/led-par12-6in1) |
| JB Systems | LED PAR64FC ZOOM | par |  | 4CH, 7CH | nein | [Link](https://jb-systems.eu/led-par64fc-zoom) |
| JB Systems | LED PLANO 6in1 | effect |  | 2CH, 9CH | nein | [Link](https://jb-systems.eu/led-plano-6in1) |
| JB Systems | LED PLANO 7FC-BLACK | effect |  | 2CH, 7CH | nein | [Link](https://jb-systems.eu/led-plano-7fc-black) |
| JB Systems | LED PLANO 7FC-WHITE | effect |  | 2CH, 7CH | nein | [Link](https://jb-systems.eu/led-plano-7fc-white) |
| JB Systems | LED PLANO12-6in1 | effect |  | 2CH, 9CH | nein | [Link](https://jb-systems.eu/led-plano12-6in1) |
| JB Systems | LED PLANO5-6in1 | effect |  | 2CH, 9CH | nein | [Link](https://jb-systems.eu/led-plano5-6in1) |
| JB Systems | MINI-PAR 12TC Mk2 | par |  | 3CH, 5CH | nein | [Link](https://jb-systems.eu/mini-par-12tc-mk2) |
| JB Systems | MINI-PAR COB Mk2 | cob |  | 3CH, 5CH | nein | [Link](https://jb-systems.eu/mini-par-cob-mk2) |
| JB Systems | PARTY BAR | bar | 1 Zellen | 3CH, 27CH | nein | [Link](https://jb-systems.eu/party-bar) |
| JB Systems | PARTY DERBY | derby | 1 Zellen | 1CH, 5CH | nein | [Link](https://jb-systems.eu/party-derby) |
| JB Systems | PARTY SPOT | par |  | 4CH, 8CH | nein | [Link](https://jb-systems.eu/party-spot) |
| JB Systems | PIXBAR 12TC | bar | 1 Zellen | 3CH, 41CH | nein | [Link](https://jb-systems.eu/pixbar-12tc) |
| JB Systems | PIXEL PIPE | effect |  | 3CH, 24CH | nein | [Link](https://jb-systems.eu/pixel-pipe) |
| JB Systems | PIXELTUBE | tube | 1 Zellen | 3CH, 266CH | nein | [Link](https://jb-systems.eu/pixeltube) |
| JB Systems | POWERBALL COLOR | derby / orb | 1 Zellen | 1CH, 10CH | nein | [Link](https://jb-systems.eu/powerball-color) |
| JB Systems | POWERBALL WHITE | derby / orb | 1 Zellen | 1CH, 10CH | nein | [Link](https://jb-systems.eu/powerball-white) |
| JB Systems | QUADRA MOVE | movinghead / spot |  | 56CH | nein | [Link](https://jb-systems.eu/quadra-move) |
| JB Systems | RAVE BAR | bar | 1 Zellen | 1CH, 37CH | nein | [Link](https://jb-systems.eu/rave-bar) |
| JB Systems | RAVE SPOT | par |  | 1CH, 22CH | nein | [Link](https://jb-systems.eu/rave-spot) |
| JB Systems | ROTOGOBO ZOOM | effect |  | 1CH, 4CH | nein | [Link](https://jb-systems.eu/rotogobo-zoom) |
| JB Systems | SPACE-4 Mk2 LASER | laser |  | 1CH, 8CH | nein | [Link](https://jb-systems.eu/space-4-mk2-laser) |
| JB Systems | SPYDER-RGB LASER | laser |  | 6CH, 10CH | nein | [Link](https://jb-systems.eu/spyder-rgb-laser) |
| JB Systems | STRIKER | movinghead / wash |  | 5CH, 19CH | nein | [Link](https://jb-systems.eu/striker) |
| JB Systems | SUNBAR COMBI Mk2 | bar | 1 Zellen | 1CH, 17CH | nein | [Link](https://jb-systems.eu/sunbar-combi-mk2) |
| JB Systems | SUNBAR WHITE Mk2 | bar | 1 Zellen | 1CH, 16CH | nein | [Link](https://jb-systems.eu/sunbar-white-mk2) |
| JB Systems | UFO X1 | ufo | 1 Zellen | 1CH, 16CH | nein | [Link](https://jb-systems.eu/ufo) |
| JB Systems | UFO X4 | ufo | 1 Zellen | 1CH, 25CH | nein | [Link](https://jb-systems.eu/ufo-x4) |
| JB Systems | VANTA BEAM | movinghead / beam |  | 5CH, 21CH | nein | [Link](https://jb-systems.eu/vanta-beam) |
| JB Systems | VANTA SPOT | par |  | 5CH, 20CH | nein | [Link](https://jb-systems.eu/vanta-spot) |
| JB Systems | VECTOR SCAN | scanner |  | 5CH, 14CH | nein | [Link](https://jb-systems.eu/vector-scan) |
| JB Systems | ACCU DECOLITE | effect |  | 10CH | nein | [Link](https://jb-systems.eu/accu-decolite) |
| JB Systems | ACCU MINI-PAR 12TC | par |  | 3CH, 6CH | nein | [Link](https://jb-systems.eu/accu-mini-par-12tc) |
| JB Systems | ANDROMEDA DMX | effect |  | 1CH | nein | [Link](https://jb-systems.eu/andromeda-dmx) |
| JB Systems | APOLLO DMX | effect |  | 1CH | nein | [Link](https://jb-systems.eu/apollo-dmx) |
| JB Systems | BEAM TWISTER | effect |  | 4CH | nein | [Link](https://jb-systems.eu/beam-twister) |
| JB Systems | CLUBWASH | movinghead / wash |  | 15CH | nein | [Link](https://jb-systems.eu/clubwash) |
| JB Systems | DYNABARREL | effect |  | 1CH, 9CH | nein | [Link](https://jb-systems.eu/dynabarrel) |
| JB Systems | GALAXY | effect |  | 1CH | nein | [Link](https://jb-systems.eu/galaxy) |
| JB Systems | GENIUS 2 | effect |  | 3CH | nein | [Link](https://jb-systems.eu/genius-2) |
| JB Systems | iCOLOR 4 | effect |  | 4CH | nein | [Link](https://jb-systems.eu/icolor-4) |
| JB Systems | iMove 5S (ELC 250W/24V incl.) | movinghead / spot |  | 5CH | nein | [Link](https://jb-systems.eu/imove-5s-elc-250w-24v-incl) |
| JB Systems | iROCK 7S | effect |  | 7CH | nein | [Link](https://jb-systems.eu/irock-7s) |
| JB Systems | LASERBURST III | laser |  | 11CH | nein | [Link](https://jb-systems.eu/laserburst-iii) |
| JB Systems | LED CLUBHEAD | movinghead / spot |  | 7CH | nein | [Link](https://jb-systems.eu/led-clubhead) |
| JB Systems | LED CLUBSCAN | effect |  | 5CH | nein | [Link](https://jb-systems.eu/led-clubscan) |
| JB Systems | LED CROSSFIRE | effect |  | 4CH | nein | [Link](https://jb-systems.eu/led-crossfire) |
| JB Systems | LED DEVIL II | effect |  | 3CH | nein | [Link](https://jb-systems.eu/led-devil-ii) |
| JB Systems | LED DEVIL III | effect |  | 3CH | nein | [Link](https://jb-systems.eu/led-devil-iii) |
| JB Systems | LED DIAMOND | effect |  | 6CH | nein | [Link](https://jb-systems.eu/led-diamond) |
| JB Systems | LED LIGHTBAR 4TC | bar | 1 Zellen | 16CH | nein | [Link](https://jb-systems.eu/led-lightbar-4tc) |
| JB Systems | LED MARVEL | effect |  | 21CH | nein | [Link](https://jb-systems.eu/led-marvel) |
| JB Systems | LED MICROSCAN II | effect |  | 5CH | nein | [Link](https://jb-systems.eu/led-microscan-ii) |
| JB Systems | LED MOON | effect |  | 28CH | nein | [Link](https://jb-systems.eu/led-moon) |
| JB Systems | LED OCTO PANEL | panel |  | 27CH | nein | [Link](https://jb-systems.eu/led-octo-panel) |
| JB Systems | LED PAR64/Black | par |  | 4CH | nein | [Link](https://jb-systems.eu/led-par64-black) |
| JB Systems | LED PAR64/Silver | par |  | 4CH | nein | [Link](https://jb-systems.eu/led-par64-silver) |
| JB Systems | LED PULSAR | effect |  | 6CH | nein | [Link](https://jb-systems.eu/led-pulsar) |
| JB Systems | LED QUADRA BEAM | par |  | 6CH | nein | [Link](https://jb-systems.eu/led-quadra-beam) |
| JB Systems | LED QUADRO PANEL | panel |  | 16CH | nein | [Link](https://jb-systems.eu/led-quadro-panel) |
| JB Systems | LED RAINBOW | effect |  | 22CH | nein | [Link](https://jb-systems.eu/led-rainbow) |
| JB Systems | LED RAVE | effect |  | 1CH | nein | [Link](https://jb-systems.eu/led-rave) |
| JB Systems | LED SEAWAVE 100W | effect |  | 3CH | nein | [Link](https://jb-systems.eu/led-seawave-100w) |
| JB Systems | LED SEAWAVE 50W | effect |  | 3CH | nein | [Link](https://jb-systems.eu/led-seawave-50w) |
| JB Systems | LED SPINNER | effect |  | 8CH | nein | [Link](https://jb-systems.eu/led-spinner) |
| JB Systems | LED UV-BAR | bar | 1 Zellen | 3CH | nein | [Link](https://jb-systems.eu/led-uv-bar) |
| JB Systems | LED VICTORYSCAN | effect |  | 8CH | nein | [Link](https://jb-systems.eu/led-victoryscan) |
| JB Systems | LED VICTORYSCAN Mk2 | effect |  | 8CH | nein | [Link](https://jb-systems.eu/led-victoryscan-mk2) |
| JB Systems | LED WASH | panel |  | 4CH | nein | [Link](https://jb-systems.eu/led-wash) |
| JB Systems | LEDBALL INDOOR | derby / orb | 1 Zellen | 4CH | nein | [Link](https://jb-systems.eu/ledball-indoor) |
| JB Systems | LEDFLOWER DMX | derby | 1 Zellen | 4CH | nein | [Link](https://jb-systems.eu/ledflower-dmx) |
| JB Systems | LEDPIPE RGB 230V | tube | 1 Zellen | 3CH | nein | [Link](https://jb-systems.eu/ledpipe-rgb-230v) |
| JB Systems | MATRIX LED | strobe | 1 Zellen | 256CH | nein | [Link](https://jb-systems.eu/matrix-led) |
| JB Systems | MINI-PAR 12TC | par |  | 3CH, 5CH | nein | [Link](https://jb-systems.eu/mini-par-12tc) |
| JB Systems | MULTIBEAM LASER | laser |  | 2CH, 10CH | nein | [Link](https://jb-systems.eu/multibeam-laser) |
| JB Systems | MYSTERY LED | effect |  | 3CH | nein | [Link](https://jb-systems.eu/mystery-led) |
| JB Systems | ORION | effect |  | 7CH | nein | [Link](https://jb-systems.eu/orion) |
| JB Systems | PARTY BEAMS | par |  | 14CH | nein | [Link](https://jb-systems.eu/party-beams) |
| JB Systems | PLANO SPOT | par |  | 4CH | nein | [Link](https://jb-systems.eu/plano-spot) |
| JB Systems | RADIANT LASER | laser |  | 10CH | nein | [Link](https://jb-systems.eu/radiant-laser) |
| JB Systems | RS-40 | effect |  | 4CH | nein | [Link](https://jb-systems.eu/rs-40) |
| JB Systems | SIRIUS | effect |  | 11CH | nein | [Link](https://jb-systems.eu/sirius) |
| JB Systems | SMOOTH SCAN-3 Laser | laser |  | 17CH | nein | [Link](https://jb-systems.eu/smooth-scan-3-laser) |
| JB Systems | SMOOTH SCAN-3 Mk2 LASER | laser |  | 1CH, 17CH | nein | [Link](https://jb-systems.eu/smooth-scan-3-mk2-laser) |
| JB Systems | SMOOTH SCAN-BLUE Laser | laser |  | 17CH | nein | [Link](https://jb-systems.eu/smooth-scan-blue-laser) |
| JB Systems | SPACE-3 Mk2 Laser | laser |  | 8CH | nein | [Link](https://jb-systems.eu/space-3-mk2-laser) |
| JB Systems | SUNBAR COMBI | bar | 1 Zellen | 1CH, 17CH | nein | [Link](https://jb-systems.eu/sunbar-combi) |
| JB Systems | SUNBAR WHITE | bar | 1 Zellen | 1CH, 15CH | nein | [Link](https://jb-systems.eu/sunbar-white) |
| JB Systems | SUPER BOOGIE | effect |  | 3CH | nein | [Link](https://jb-systems.eu/super-boogie) |
| JB Systems | SUPER LED RAINBOW | effect |  | 28CH | nein | [Link](https://jb-systems.eu/super-led-rainbow) |
| JB Systems | SUPER ORION | effect |  | 3CH | nein | [Link](https://jb-systems.eu/super-orion) |
| JB Systems | SUPER QUADRA BEAM | par |  | 3CH | nein | [Link](https://jb-systems.eu/super-quadra-beam) |
| JB Systems | SUPERSOLAR II | effect |  | 3CH | nein | [Link](https://jb-systems.eu/supersolar-ii) |
| JB Systems | TAURUS | effect |  | 28CH | nein | [Link](https://jb-systems.eu/taurus) |
| JB Systems | TWIN EFFECT Laser Mk2 | laser |  | 10CH | nein | [Link](https://jb-systems.eu/twin-effect-laser-mk2) |
| JB Systems | TWINBEAM COLOR Laser Mk2 | laser |  | 9CH | nein | [Link](https://jb-systems.eu/twinbeam-color-laser-mk2) |
| JB Systems | TWINBEAM COLOR Laser Mk3 | laser |  | 9CH | nein | [Link](https://jb-systems.eu/twinbeam-color-laser-mk3) |
| JB Systems | WIZARD 4 | effect |  | 3CH | nein | [Link](https://jb-systems.eu/wizard-4) |
| JCLight | 300W LED Ellipsoidal Profile Spotlight Sirius | profile | 2 Zellen | 2CH, 4CH | nein | [Link](https://jclight.com/products/300w-led-ellipsoidal-profile-spotlight-sirius-jc-light) |
| JCLight | Waterproof 10W 20W 30W Moving Head Animation Laser Light | movinghead / beam |  | 27CH | nein | [Link](https://jclight.com/products/2-3-5w-full-color-amination-moving-head-laser-light) |
| JCLight | 6PCS Rotating Round Retro Stage Light | strobe | 6 Zellen | 24CH Pixel, 34CH Pixel, 64CH Pixel | nein | [Link](https://jclight.com/products/6pcs-rotating-round-retro-stage-light-jc-light) |
| JCLight | 7PCS 3in1 Retro Stage Light With Auxiliary Light | strobe | 7 Zellen | 21CH Pixel, 64CH Pixel | nein | [Link](https://jclight.com/products/7pcs-3in1-retro-stage-light-with-auxiliary-light-jc-light) |
| JCLight | 480W Beam Moving Head Light With Gobo Effects | movinghead / beam |  | 34CH, 39CH | nein | [Link](https://jclight.com/products/jc-light-mega-pointe-480w-beam-moving-head-light) |
| JCLight | 7PCS Waterproof LED Wash Moving Head Light | movinghead / wash |  | 30CH, 42CH, 58CH | nein | [Link](https://jclight.com/products/jc-light-waterproof-7pcs-bee-eye-wash-moving-head-light) |
| JCLight | 5+4 Beam Laser DJ Light Effect Fixture | laser |  | 23CH | nein | [Link](https://jclight.com/products/54-beam-laser-dj-light) |
| JCLight | 10 Eyes LED Beam Moving Head Light | movinghead / beam |  | 5CH, 7CH, 14CH, 18CH, 42CH, 54CH | nein | [Link](https://jclight.com/products/10-eyes-beam-light) |
| JCLight | 8 Eyes LED Beam Moving Head Bar Light | multibar | 8 Zellen | 9CH, 38CH Pixel | nein | [Link](https://jclight.com/products/8-eyes-beam-light) |
| JCLight | 6 Eyes Full Color Animation Laser Light | laser |  | 12CH, 62CH | nein | [Link](https://jclight.com/products/6-eyes-full-color-animation-laser-light) |
| JCLight | 24 Eyes Matrix Laser Light Effect Fixture | laser |  | 12CH, 35CH | nein | [Link](https://jclight.com/products/24-eyes-matrix-laser-light) |
| JCLight | 8 Eyes Laser Moving Head Bar Light | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://jclight.com/products/8-eyes-laser-bar-light) |
| JCLight | 8+8 Beam Laser Moving Head Light | movinghead / beam |  | 23CH | nein | [Link](https://jclight.com/products/88-beam-laser-dj-light) |
| JCLight | 8 EYES SKYNET LASER MOVING HEAD LIGHT | movinghead / beam |  | 23CH | nein | [Link](https://jclight.com/products/8-eyes-skynet-laser-light) |
| JCLight | 6 HEADS 3IN1 DOT MATRIX LED LASER LIGHT | laser |  | 31CH, 59CH | nein | [Link](https://jclight.com/products/six-heads-3in1-dot-matrix-laser-light) |
| JCLight | 5+16 Laser Dot Matrix Light | laser |  | 12CH, 35CH | nein | [Link](https://jclight.com/products/516-laser-dot-matrix-light) |
| JCLight | 6 Eyes Laser Moving Head Light | movinghead / beam |  | 19CH | nein | [Link](https://jclight.com/products/6-eyes-moving-head-laser-light-i8-1) |
| JCLight | 1000W 8+8 Strobe Light With LED Effects | strobe |  | 4CH, 12CH, 32CH | nein | [Link](https://jclight.com/products/1000w-88-strobe-light) |
| JCLight | 1000W Strobe Light For Stage Lighting | strobe | 96 Zellen | 4CH, 6CH, 9CH, 12CH, 32CH, 44CH | nein | [Link](https://jclight.com/products/1000w-strobe-light) |
| JCLight | LED Strobe Panel Moving Head Light | strobe |  | 1CH, 18CH | nein | [Link](https://jclight.com/products/led-strobe-panel-moving-head-light) |
| JCLight | 5PCS 3in1 LED Matrix Light | strobe | 5 Zellen | 8CH, 20CH Pixel | nein | [Link](https://jclight.com/products/5pcs-3in1-led-matrix-light) |
| JCLight | 36PCS Gold LED Matrix Light | strobe | 36 Zellen | 10CH, 40CH, 108CH Pixel, 118CH Pixel | nein | [Link](https://jclight.com/products/36pcs-gold-led-matrix-light) |
| JCLight | 14PCS LED Wash Dot Matrix Light | strobe | 14 Zellen | 6CH, 8CH, 12CH, 60CH Pixel | nein | [Link](https://jclight.com/products/14pcs-led-wash-dot-matrix-light) |
| JCLight | 7PCS Retro Stage Light For Events | strobe | 96 Zellen | 8CH | nein | [Link](https://jclight.com/products/7pcs-retro-stage-light) |
| JCLight | Rotating Maple Leaf Retro Stage Light | strobe | 36 Zellen | 15CH, 20CH, 26CH | nein | [Link](https://jclight.com/products/360w-retro-stage-light) |
| JCLight | 36PCS LED Matrix Background Light | strobe | 36 Zellen | 4CH, 11CH, 17CH, 44CH, 144CH Pixel, 147CH Pixel | nein | [Link](https://jclight.com/products/36pcs-led-matrix-background-light) |
| JCLight | 25PCS LED Matrix Light For Stage Effects | strobe | 25 Zellen | 8CH, 75CH Pixel, 80CH Pixel | nein | [Link](https://jclight.com/products/25pcs-led-matrix-light) |
| JCLight | 6 Line Retro Stage Lighting | strobe | 96 Zellen | 4CH, 12CH, 24CH | nein | [Link](https://jclight.com/products/kinetic-beam-ring-light-copy) |
| JCLight | 12PCS 60W LED Beam Zoom Moving Head Light | movinghead / beam |  | 20CH, 53CH | nein | [Link](https://jclight.com/products/12pic-60w-led-beam-zoom-moving-head-light) |
| JCLight | 12/14PCS 3in1 LED Matrix Light | strobe | 14 Zellen | 5CH, 7CH, 13CH, 73CH, 75CH, 86CH | nein | [Link](https://jclight.com/products/12-14pcs-3in1-led-matrix-light) |
| JCLight | MINI 7PCS RETRO STAGE LIGHT | strobe | 63 Zellen | 8CH, 32CH | nein | [Link](https://jclight.com/products/mini-7pcs-retro-stage-light) |
| JCLight | WATERPROOF DMX FOLLOW SPOT LIGHT (THE SMURFS) | follow |  | 5CH | nein | [Link](https://jclight.com/products/waterproof-led-follow-spot-light) |
| JCLight | COB ZOOM LED MOVING HEAD LIGHT | cob |  | 10CH | nein | [Link](https://jclight.com/products/cob-zoom-led-moving-head-light) |
| JCLight | LED LEKO PROFILE SPOTLIGHT | profile |  | 2CH, 4CH, 9CH | nein | [Link](https://jclight.com/products/led-leko-profile-light) |
| JCLight | 4 EYES AUDIENCE BLINDER LIGHT | blinder | 4 Zellen | 2CH, 4CH Pixel, 12CH Pixel | nein | [Link](https://jclight.com/products/4-eyes-audience-light-e9-e10) |
| JCLight | 2 EYES AUDIENCE BLINDERS LIGHT | blinder | 2 Zellen | 2CH Pixel, 4CH Pixel, 8CH Pixel | nein | [Link](https://jclight.com/products/2-eyes-audience-light) |
| JCLight | COB ZOOM LED MOVING HEAD LIGHT (12 CH) | cob |  | 12CH | nein | [Link](https://jclight.com/products/cob-zoom-led-moving-head-light-2) |
| JCLight | 4 EYES COB MOVING HEAD LIGHT | cob | 4 Zellen | 9CH, 16CH | nein | [Link](https://jclight.com/products/4-eyes-cob-moving-head-light) |
| JCLight | LED TRICOLOR PANEL STUDIO SOFT LIGHT | panel |  | 4CH | nein | [Link](https://jclight.com/products/led-tricolor-panel-studio-soft-light) |
| JCLight | 300W FOCUS COB PROFILE LIGHT | cob |  | 3CH, 4CH | nein | [Link](https://jclight.com/products/300w-focus-cob-profile-light) |
| JCLight | 400W LED FRESNEL ZOOM SPOTLIGHT | fresnel |  | 2CH | nein | [Link](https://jclight.com/products/400w-led-fresnel-zoom-spotlight) |
| JCLight | 680S SUPER BEAM LIGHT | movinghead / beam |  | 16CH | nein | [Link](https://jclight.com/products/680s-super-beam-light) |
| JCLight | 440W/460W BEAM LIGHT | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/440w-460w-beam-light) |
| JCLight | 300/330/350/380W LED BEAM MOVING HEAD LIGHT | movinghead / beam |  | 13CH | nein | [Link](https://jclight.com/products/300-330-350-380w-led-beam-moving-head-light) |
| JCLight | 260W/295W BEAM LIGHT WITH LED RING(THE SILVER FOX) | movinghead / beam | 24 Zellen | 16CH, 20CH | nein | [Link](https://jclight.com/products/260w-295w-beam-light-with-led-ring) |
| JCLight | 580S BEAM LIGHT (YANGWANG) | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/480w-beam-light) |
| JCLight | MINI 230W BEAM LIGHT – A4 | movinghead / beam |  | 14CH | nein | [Link](https://jclight.com/products/mini-230w-beam-light) |
| JCLight | 251W BEAM LIGHT(RHINO) | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/251w-beam-lightrhino) |
| JCLight | 18R 380W BEAM LIGHT WITH RING(THE WOLF WARRIORS) | movinghead / beam | 24 Zellen | 16CH, 20CH | nein | [Link](https://jclight.com/products/18r-380w-beam-light-with-ringthe-wolf-warriors) |
| JCLight | 7R 230W BEAM LIGHT(THE WOLF KING) | movinghead / beam |  | 16CH | nein | [Link](https://jclight.com/products/7r-230w-beam-light-the-wolf-king) |
| JCLight | UPGRADED LED 3IN1 SPOT MOVING HEAD LIGHT(JUNNO) | movinghead / spot |  | 21CH | nein | [Link](https://jclight.com/products/upgraded-led-3in1-spot-moving-head-lightjunno) |
| JCLight | LED 3IN1 SPOT MOVING HEAD LIGHT (LIGHT WEIGHT) | movinghead / spot |  | 26CH | nein | [Link](https://jclight.com/products/led-3in1-spot-moving-head-light-light-weight) |
| JCLight | 380/480W BEAM(LIGHT WEIGHT) | movinghead / beam |  | 16CH | nein | [Link](https://jclight.com/products/380-480w-beam-lightlight-weight) |
| JCLight | 18R 380W BEAM LIGHT (THE SMURFS) | movinghead / beam |  | 20CH, 24CH | nein | [Link](https://jclight.com/products/18r-380w-beam-light-the-smurfs) |
| JCLight | Beam Moving Head 295 Light | movinghead / beam |  | 16CH | nein | [Link](https://jclight.com/products/295w-beam-light) |
| JCLight | LED 4IN1 CUTTING MOVING HEAD LIGHT (LIGHT WEIGHT) | movinghead / profile |  | 22CH, 26CH | nein | [Link](https://jclight.com/products/led-4in1-cutting-moving-head-light-light-weight) |
| JCLight | WATERPROOF WIRELESS BATTERY DMX LED PAR LIGHT D37-3 | par |  | 6CH, 10CH | nein | [Link](https://jclight.com/products/waterproof-wireless-battery-dmx-led-par-light-d37-3) |
| JCLight | WATERPROOF WIRELESS BATTERY 18 LED WALL WASHER | bar | 1 Zellen | 6CH, 10CH | nein | [Link](https://jclight.com/products/waterproof-wireless-battery-18-led-wall-washer) |
| JCLight | WATERPROOF 480/550/680/800W BEAM LIGHT(ALUMINUM ALLOY SLIVER DRAGON) | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/waterproof-480-550-680-800w-beam-light) |
| JCLight | WATERPROOF 230/260/350/380W BEAM LIGHT | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/waterproof-230-260-350-380w-beam-light) |
| JCLight | WATERPROOF 380W BEAM LIGHT WITH LED RING(LIGHT WEIGHT) | movinghead / beam | 24 Zellen | 16CH, 20CH | nein | [Link](https://jclight.com/products/waterproof-380w-beam-light-with-led-ringlight-weight) |
| JCLight | WATERPROOF LASER BEAM MOVING HEAD LIGHT(LIGHT WEIGHT) | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/waterproof-laser-beam-moving-head-lightlight-weight) |
| JCLight | WATERPROOF 5x60W LED ZOOM MATRIX LIGHT WITH AUXILIARY LIGHT(PHOENIX | strobe | 5 Zellen | 17CH, 27CH Pixel, 55CH Pixel, 58CH Pixel, 88CH Pixel, 90CH Pixel | nein | [Link](https://jclight.com/products/waterproof-5x60w-led-zoom-matrix-light-with-auxiliary-lightphoenix-dance) |
| JCLight | WATERPROOF 48PCS LED CITY COLOR WASH LIGHT | panel |  | 8CH, 12CH | nein | [Link](https://jclight.com/products/waterproof-48pcs-led-city-color-wash-light) |
| JCLight | 200W BEE EYE MOVING HEAD LIGHT | movinghead / beeeye | 4 Zellen | 18CH Pixel | nein | [Link](https://jclight.com/products/200w-bee-eye-moving-head-light) |
| JCLight | Waterproof 3in1 Spot moving head light (Neptune) | movinghead / spot | 24 Zellen | 17CH | nein | [Link](https://jclight.com/products/waterproof-3in1-spot-moving-head-light-neptune) |
| JCLight | 12 segment strobe moving head light | strobe |  | 4CH, 11CH, 32CH, 39CH | nein | [Link](https://jclight.com/products/12-segment-strobe-moving-head-light) |
| JCLight | 1000w Waterproof strobe light | strobe |  | 11CH, 15CH, 59CH, 71CH | nein | [Link](https://jclight.com/products/1000w-waterproof-strobe-light) |
| JCLight | LED 3in1 CMY+CTO moving head (Junno) | movinghead / spot |  | 24CH, 32CH | nein | [Link](https://jclight.com/products/led-3in1-cmy-cto-moving-head-junno) |
| JCLight | Upgraded LED 3in1 spot moving head Light (Junno) (21 CH) | movinghead / spot |  | 21CH | nein | [Link](https://jclight.com/products/upgraded-led-3in1-spot-moving-head-light-junno) |
| JCLight | 480w 3in1 Spot Moving Head Light (Optimus Prime) | movinghead / spot |  | 24CH | nein | [Link](https://jclight.com/products/480w-3in1-spot-moving-head-light-optimus-prime) |
| JCLight | LED Computer Cut moving head Light | movinghead / profile |  | 40CH, 42CH, 65CH | nein | [Link](https://jclight.com/products/led-computer-cut-moving-head-light-3) |
| JCLight | Waterproof LED Computer Cut moving head Light | movinghead / profile |  | 35CH, 44CH | nein | [Link](https://jclight.com/products/waterproof-led-computer-cut-moving-head-light) |
| JCLight | Waterproof LED Computer Cut moving head Light (34 CH) | movinghead / profile |  | 34CH | nein | [Link](https://jclight.com/products/led-computer-cut-moving-head-light-copy) |
| JCLight | LED Computer Cut Moving Head Light (34/42 CH) | movinghead / profile |  | 34CH, 42CH | nein | [Link](https://jclight.com/products/led-computer-cut-moving-head-light-2) |
| JCLight | 580S beam light (Yangwang) (16/20 CH) | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://jclight.com/products/680s-beam-light-yangwang-copy) |
| JCLight | Waterproof 7pcs LED Bee Eyes Moving Head Light (Wasp) | movinghead / beeeye | 7 Zellen | 17CH | nein | [Link](https://jclight.com/products/waterproof-7pcs-led-bee-eyes-moving-head-light-wasp) |
| JCLight | 19X40w Bee eye Moving head Light with pixel strip | movinghead / beeeye | 19 Zellen | 22CH, 26CH, 36CH, 78CH Pixel | nein | [Link](https://jclight.com/products/19pcs-bee-eye-moving-head-light-copy) |
| JCLight | 19pcs Bee eye Moving head Light | movinghead / beeeye | 19 Zellen | 18CH | nein | [Link](https://jclight.com/products/19pcs-bee-eye-moving-head-light) |
| JCLight | Waterproof 200w LED Ellipsoidal Profile light | profile |  | 2CH, 4CH, 9CH | nein | [Link](https://jclight.com/products/waterproof-200w-led-ellipsoidal-profile-light) |
| JCLight | 300w LED Ellipsoidal Profile light | profile |  | 2CH | nein | [Link](https://jclight.com/products/300w-led-ellipsoidal-profile-light) |
| JCLight | 3in1 Spot Moving Head Light (Holy bird) | movinghead / spot | 24 Zellen | 26CH, 35CH | nein | [Link](https://jclight.com/products/3in1-spot-moving-head-light-holy-bird) |
| JCLight | 200w LED Spot moving head light | movinghead / spot |  | 13CH | nein | [Link](https://jclight.com/products/200w-led-spot-moving-head-light) |
| JCLight | 12x60w LED beam zoom moving head light with auxiliary light | movinghead / beam |  | 29CH, 62CH | nein | [Link](https://jclight.com/products/37x40w-bee-eye-moving-head-light-wasp-copy) |
| JCLight | 37x40W Bee eye moving head light (Wasp) | movinghead / beeeye | 37 Zellen | 18CH | nein | [Link](https://jclight.com/products/37x40w-bee-eye-moving-head-light-wasp) |
| JCLight | 200W COB surface light (Sirius) | cob |  | 6CH | nein | [Link](https://jclight.com/products/200w-cob-surface-light-sirius) |
| JCLight | 24pcs Waterproof LED Par light (Whale Shark) | par | 48 Zellen | 8CH | nein | [Link](https://jclight.com/products/24pcs-led-par-light-thor-copy) |
| JCLight | 18pcs Waterproof LED Par light (Whale Shark) | par | 18 Zellen | 8CH | nein | [Link](https://jclight.com/products/18pcs-led-par-light-thor-copy) |
| JCLight | 27pcs LED Par light (Thor) | par | 51 Zellen | 7CH, 12CH | nein | [Link](https://jclight.com/products/27pcs-led-par-light-thor) |
| JCLight | 19pcs LED Par light (Thor) | par | 43 Zellen | 7CH, 12CH | nein | [Link](https://jclight.com/products/19pcs-led-par-light-thor) |
| JCLight | 24pcs LED Par light (Thor) | par | 48 Zellen | 7CH, 12CH | nein | [Link](https://jclight.com/products/24pcs-led-par-light-thor) |
| JCLight | 18pcs LED Par light (Thor) | par | 18 Zellen | 7CH, 12CH | nein | [Link](https://jclight.com/products/18pcs-led-par-light-new-upgraded) |
| KIMU | 14pcs*6W Stage Wash Par Light Stage | par | 14 Zellen | 8CH | nein | [Link](https://www.kimulighting.com/14pcs-6w-stage-wash-par-disco-dj-light-for-stage-dj-club-disco-lighting-event-show.html) |
| KIMU | 14x15W Aluminum Led Stage Par Light RGBW 4in1 Led Par Can Light | par | 14 Zellen | 4CH, 8CH | nein | [Link](https://www.kimulighting.com/14x15w-dmx-512-full-color-aluminum-led-stage-par-light-disco-dj-show-concert-led-par-can-church-concert-wedding-light.html) |
| KIMU | 14x20W RGBWY+UV Full Color Waterproof LED Par Light Light Wash | par | 14 Zellen | 11CH | nein | [Link](https://www.kimulighting.com/14x20w-rgbwy-uv-full-color-waterproof-led-par-light-dmx512-wedding-party-light-wash-dj-disco-stage-lighting.html) |
| KIMU | 150W Mini Beam Moving Head Light 18Prism High Brightness LED Spot | movinghead / beam |  | 12CH | nein | [Link](https://www.kimulighting.com/150w-mini-beam-moving-head-light-18prism-high-brightness-led-spot-club-dj-disco-stage-effect-light.html) |
| KIMU | 150W Mini Sharpy Beam LED Spot Rainbow Effect RGBW Luces LED Beam | movinghead / beam |  | 11CH, 13CH | nein | [Link](https://www.kimulighting.com/150w-mini-sharpy-beam-led-dmx-spot-rainbow-effect-rgbw-luces-dj-event-stage-light-led-beam-moving-head-light.html) |
| KIMU | 18*10W Aluminum Luz Par LED Uplights RGBW 4in1 Par Can Luces Para | par | 18 Zellen | 8CH, 9CH | nein | [Link](https://www.kimulighting.com/18-10w-aluminum-luz-par-led-uplights-rgbw-4in1-par-can-dmx-dj-disco-lights-party-stage-effect-luces-para-discoteca-par-light.html) |
| KIMU | 18x15W RGBW 4in1 Waterproof LED Par Light Light Wash | par | 18 Zellen | 9CH | nein | [Link](https://www.kimulighting.com/18x15w-rgbw-4in1-waterproof-led-par-light-dmx512-wedding-party-light-wash-dj-disco-stage-lighting.html) |
| KIMU | 21LED X 12W Wash RGBW 4in1 Strobe Luces Light LED Wall Washer | strobe |  | 4CH, 8CH, 28CH, 32CH | nein | [Link](https://www.kimulighting.com/21led-x-12w-wash-lights-rgbw-4in1-disco-strobe-dmx512-luces-dj-light-led-wall-washer.html) |
| KIMU | 260W Beam Moving Head 18 Prisms 9r Sharpy Beam 16Gobos Concer | movinghead / beam |  | 14CH | nein | [Link](https://www.kimulighting.com/260w-beam-moving-head-18-prisms-9r-sharpy-beam-lights-16gobos-dj-disco-stage-lighting-for-wedding-concer-nightclubt.html) |
| KIMU | 295W Moving Head Beam Light With Strip 14r Double Prisms Lyre Beam | movinghead / beam |  | 16CH, 22CH | nein | [Link](https://www.kimulighting.com/295w-moving-head-beam-light-with-strip-14r-double-prisms-lyre-beam-light-15gobos-dmx512-stage-effect-lights-for-wedding-concert-disco.html) |
| KIMU | 36PCS*10W Zoom Light RGBW 4in1 LED Moving Head | effect | 36 Zellen | 13CH | nein | [Link](https://www.kimulighting.com/36pcs-10w-dmx-zoom-light-rgbw-4in1-led-moving-head-lights-for-dj-disco-music-event-nightclub.html) |
| KIMU | 4.5W Lezer Disco Laser Projector Light | laser |  | 16CH | nein | [Link](https://www.kimulighting.com/4-5w-lezer-disco-laser-projector-light.html) |
| KIMU | 48 Segment RGBW LED Strobe Light with Letters Numbers Display High | strobe | 96 Zellen | 4CH, 6CH, 16CH, 192CH, 194CH | nein | [Link](https://www.kimulighting.com/48-segment-rgbw-led-strobe-light-with-letters-numbers-display-dmx-high-bright-dj-wash-bar-strobe-lighting-effects.html) |
| KIMU | 54 LED Aluminum RGB 3in1 LED Par 180W Light | par | 54 Zellen | 8CH, 9CH | nein | [Link](https://www.kimulighting.com/54-led-aluminum-rgb-3in1-led-par-lights-dj-180w-dmx512-wedding-disco-light.html) |
| KIMU | 6 Eyes Moving Head Laser Light Laser Beam Bar Light Laser Beam | movinghead / beam |  | 8CH | nein | [Link](https://www.kimulighting.com/6-eyes-moving-head-laser-light-laser-beam-bar-light-disco-laser-beam-shaking-head-light.html) |
| KIMU | 6 Eyes Rgb Laser Light Stage Laser Rgb Light | laser |  | 8CH | nein | [Link](https://www.kimulighting.com/6-eyes-rgb-laser-light-dmx-stage-party-lighting-laser-rgb-light.html) |
| KIMU | 7*40W Bee Eye Zoom Cabeza Movil Beam 280W LED Moving Head Light Luces | movinghead / beeeye | 7 Zellen | 10CH, 16CH | nein | [Link](https://www.kimulighting.com/7-40w-bee-eye-zoom-cabeza-movil-beam-280w-dmx-led-moving-head-light-for-disco-luces-dj-lighting.html) |
| KIMU | 72X1W LED Par Light RGB Full Color Control Light Concerts | par | 64 Zellen | 7CH, 31CH | nein | [Link](https://www.kimulighting.com/72x1w-led-par-light-rgb-full-color-dmx512-control-wedding-disco-party-light-dj-stage-effect-for-concerts-bar-club.html) |
| KIMU | 7 LED Led Party Stage Par Light | par | 7 Zellen | 6CH, 10CH | nein | [Link](https://www.kimulighting.com/7led-led-party-stage-par-light.html) |
| KIMU | 7x20W RGBWY + UV Full Color Waterproof LED Par Light Light Wash | par | 7 Zellen | 6CH, 11CH | nein | [Link](https://www.kimulighting.com/7x20w-rgbwy-uv-full-color-waterproof-led-par-light-dmx512-wedding-party-light-wash-dj-disco-stage-lighting.html) |
| KIMU | 7x30W Aluminum Par Light RGBW 4in1 | par | 7 Zellen | 9CH | nein | [Link](https://www.kimulighting.com/7x30w-aluminum-easy-dancing-dj-led-studio-for-wedding-and-church-par-light.html) |
| KIMU | 9X4W LED Wall Wash Light RGBW 4in1 Bar | bar | 9 Zellen | 4CH, 8CH | nein | [Link](https://www.kimulighting.com/9x4w-led-wall-wash-light-rgbw-4in1-dmx-dj-disco-bar-stage-light-with-remote-control.html) |
| KIMU | Beam 150W LED Equipment 18 Prism Rainbow Moving Head Light Gobo Spot | movinghead / beam |  | 16CH | nein | [Link](https://www.kimulighting.com/beam-150w-led-dj-lighting-equipment-18-prism-disco-stage-lights-rainbow-moving-head-light-gobo-spot-150-dmx-cabeza-movil.html) |
| KIMU | Beam 200W LED Sharpy Beam 24 Prism Spot Moving Head Light | movinghead / beam |  | 14CH, 20CH | nein | [Link](https://www.kimulighting.com/beam-200w-led-sharpy-beam-24-prism-spot-moving-head-light-party-club-stage-light-for-dj-party.html) |
| KIMU | Cabezas Movile 295W Sharpy Light Moving Head Spot Beam 295 14r Luces | movinghead / beam |  | 16CH, 22CH | nein | [Link](https://www.kimulighting.com/cabezas-movile-295w-sharpy-light-moving-head-spot-beam-295-14r-luces-dj-stage-light-equipment-dmx-luce-beam-moving-light.html) |
| KIMU | Equipment 19x15w Wash Zoom LED Moving Head Light With Ring | movinghead / wash | 24 Zellen | 28CH | nein | [Link](https://www.kimulighting.com/dj-equipment-19x15w-dmx-wash-zoom-led-moving-head-light-with-ring.html) |
| KIMU | DMX 19*15W Bee Eye Zoom Moving Head for Disco for Night Club | movinghead / beeeye | 1 Zellen | 17CH, 26CH, 86CH | nein | [Link](https://www.kimulighting.com/dmx-19-15w-bee-eye-zoom-moving-head-for-disco-for-night-club.html) |
| KIMU | Mini Sharpy Beam 230W 7r Moving Head Light High Brightness Light | movinghead / beam |  | 16CH | nein | [Link](https://www.kimulighting.com/mini-sharpy-beam-230w-7r-moving-head-light-dmx-dj-lights-high-brightness-stage-effect-light.html) |
| KIMU | Professional 5W 10W 3D Cabeza Stage Laser Moving Light | laser |  | 32CH, 49CH | nein | [Link](https://www.kimulighting.com/professional-5w-10w-3d-dj-night-club-disco-cabeza-stage-disco-laser-light-for-club.html) |
| KIMU | Professional 80 Segment RGB Strobe Light 800LED Wall Wash 160W Luces | strobe |  | 3CH, 4CH, 8CH, 12CH, 13CH, 24CH, 25CH, 60CH, 61CH | nein | [Link](https://www.kimulighting.com/professional-80-segment-rgb-strobe-light-800led-wall-wash-lighting-160w-dmx-disco-luces-dj-stage-strobe-led-bars.html) |
| Light Sky | 6800-C34 | profile |  | 1CH, 2CH, 6CH, 7CH, 11CH, 13CH, 14CH | nein | [Link](https://en.lightsky.com.cn/product/6800-c34/) |
| Light Sky | 6800-D34 | profile |  | 11CH | nein | [Link](https://en.lightsky.com.cn/product/6800-d34/) |
| Light Sky | 6800-T34 | profile |  | 11CH | nein | [Link](https://en.lightsky.com.cn/product/6800-t34/) |
| Light Sky | 8800-C42 | profile |  | 1CH, 2CH, 6CH, 7CH, 11CH, 13CH, 14CH | nein | [Link](https://en.lightsky.com.cn/product/8800-c42/) |
| Light Sky | 9800 D48 | fresnel |  | 4CH | nein | [Link](https://en.lightsky.com.cn/product/9800-d48/) |
| Light Sky | 9800 T48 | fresnel |  | 4CH | nein | [Link](https://en.lightsky.com.cn/product/9800-t48/) |
| Light Sky | AQUA MIRROR | scanner |  | 8CH | nein | [Link](https://en.lightsky.com.cn/product/aqua-mirror/) |
| Light Sky | AQUABEAM230 (IP1000E) | movinghead / beam |  | 15CH | nein | [Link](https://en.lightsky.com.cn/product/aquabeam230-ip1000e/) |
| Light Sky | AQUABEAM330(IP2000) | movinghead / beam |  | 20CH, 24CH | nein | [Link](https://en.lightsky.com.cn/product/aquabeam330ip2000/) |
| Light Sky | AQUABEAM400LL-E | movinghead / beam |  | 14CH | nein | [Link](https://en.lightsky.com.cn/product/aquabeam400ll-e/) |
| Light Sky | AQUABEAM400LL | movinghead / beam |  | 17CH | nein | [Link](https://en.lightsky.com.cn/product/aquabeam400ll/) |
| Light Sky | AQUABEAM440 (IP3000) | movinghead / beam |  | 20CH, 24CH | nein | [Link](https://en.lightsky.com.cn/product/aquabeam440-ip3000/) |
| Light Sky | AQUAPEARL-MINI | movinghead / wash | 7 Zellen | 21CH, 28CH Pixel, 31CH Pixel, 35CH Pixel, 55CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/aquapearl-mini/) |
| Light Sky | AQUAPEARL-PRO II | movinghead / wash | 19 Zellen | 26CH, 28CH, 35CH, 98CH, 100CH | nein | [Link](https://en.lightsky.com.cn/product/aquapearl-pro-ii/) |
| Light Sky | AQUAPEARL-PRO | movinghead / wash | 19 Zellen | 16CH, 22CH, 26CH, 35CH, 39CH, 45CH, 79CH Pixel, 98CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/aquapearl-pro/) |
| Light Sky | AQUAPEARL-SMART | movinghead / wash | 12 Zellen | 28CH, 35CH, 40CH Pixel, 72CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/aquapearl-smart/) |
| Light Sky | AURORA AQUA | movinghead / spot |  | 33CH, 35CH, 36CH, 39CH | nein | [Link](https://en.lightsky.com.cn/product/aurora-aqua/) |
| Light Sky | AURORA TIDE | movinghead / spot |  | 30CH, 39CH, 42CH | nein | [Link](https://en.lightsky.com.cn/product/aurora-tide/) |
| Light Sky | Budg Beam 300 | movinghead / beam |  | 16CH | nein | [Link](https://en.lightsky.com.cn/product/budg-beam-300/) |
| Light Sky | BUMBLEBEE | movinghead / beam |  | 16CH | nein | [Link](https://en.lightsky.com.cn/product/bumblebee/) |
| Light Sky | DOLPHIN SMART | movinghead / beam |  | 23CH | nein | [Link](https://en.lightsky.com.cn/product/dolphin-smart/) |
| Light Sky | E280BEAM | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/e280beam/) |
| Light Sky | Economic AURORA | movinghead / spot |  | 28CH | nein | [Link](https://en.lightsky.com.cn/product/economic-aurora/) |
| Light Sky | F1700WB-E | movinghead / wash |  | 17CH | nein | [Link](https://en.lightsky.com.cn/product/f1700wb-e/) |
| Light Sky | F1700WB-P | movinghead / profile |  | 32CH | nein | [Link](https://en.lightsky.com.cn/product/f1700wb-p/) |
| Light Sky | F1700WB-PS | movinghead / profile |  | 32CH | nein | [Link](https://en.lightsky.com.cn/product/f1700wb-ps/) |
| Light Sky | F1700WB | movinghead / wash |  | 25CH | nein | [Link](https://en.lightsky.com.cn/product/f1700wb/) |
| Light Sky | F230II | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/f230ii/) |
| Light Sky | F260PLUS | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/f260plus/) |
| Light Sky | F330II | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/f330ii/) |
| Light Sky | F350II | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/f350ii/) |
| Light Sky | F400BSW | movinghead / spot |  | 18CH, 20CH | nein | [Link](https://en.lightsky.com.cn/product/f400bsw/) |
| Light Sky | HS880 | movinghead / profile |  | 43CH, 55CH | nein | [Link](https://en.lightsky.com.cn/product/hs880for-south-korean-only/) |
| Light Sky | IPL715N | par |  | 7CH | nein | [Link](https://en.lightsky.com.cn/product/ipl715n/) |
| Light Sky | IPL715P | par |  | 7CH | nein | [Link](https://en.lightsky.com.cn/product/ipl715p/) |
| Light Sky | LOTUS MINI | effect |  | 9CH | nein | [Link](https://en.lightsky.com.cn/product/lotus-mini/) |
| Light Sky | LOTUS | effect |  | 9CH | nein | [Link](https://en.lightsky.com.cn/product/lotus/) |
| Light Sky | LUNAR BEAM | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/lunar-beam/) |
| Light Sky | LUNAR BSW | movinghead / spot |  | 21CH, 24CH | nein | [Link](https://en.lightsky.com.cn/product/lunar-bsw/) |
| Light Sky | LUNAR MAX | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/lunar-max/) |
| Light Sky | MAMBA | tiltbar | 12 Zellen | 19CH, 64CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/mamba/) |
| Light Sky | MINI LASER AQUA | movinghead / beam |  | 17CH, 19CH | nein | [Link](https://en.lightsky.com.cn/product/mini-laser-aqua/) |
| Light Sky | MINI LUNAR | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/mini-lunar/) |
| Light Sky | MINI WHALE | movinghead / beam |  | 15CH | nein | [Link](https://en.lightsky.com.cn/product/mini-whale/) |
| Light Sky | PEARL WASH MAX | movinghead / wash | 37 Zellen | 26CH, 39CH, 44CH, 56CH | nein | [Link](https://en.lightsky.com.cn/product/pearl-wash-max/) |
| Light Sky | PEARL WASH | movinghead / wash |  | 26CH, 38CH | nein | [Link](https://en.lightsky.com.cn/product/pearl-wash/) |
| Light Sky | PL1015B | bar | 10 Zellen | 9CH, 18CH, 25CH, 45CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/pl1015b/) |
| Light Sky | PL1015W | bar | 10 Zellen | 9CH, 18CH, 25CH, 40CH, 45CH | nein | [Link](https://en.lightsky.com.cn/product/pl1015w/) |
| Light Sky | PL1215-HC | par |  | 7CH | nein | [Link](https://en.lightsky.com.cn/product/pl1215-hc/) |
| Light Sky | PL1215II | par | 12 Zellen | 5CH, 10CH | nein | [Link](https://en.lightsky.com.cn/product/pl1215ii/) |
| Light Sky | PL6103 | par |  | 5CH, 12CH | nein | [Link](https://en.lightsky.com.cn/product/pl6103/) |
| Light Sky | PL61W3 | par |  | 5CH | nein | [Link](https://en.lightsky.com.cn/product/pl61w3/) |
| Light Sky | SCOPE-Ⅱ | movinghead / profile |  | 27CH, 33CH | nein | [Link](https://en.lightsky.com.cn/product/scope-2/) |
| Light Sky | SCOPE BEAM | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://en.lightsky.com.cn/product/scope-beam/) |
| Light Sky | SCOPE (39/54 CH) | movinghead / profile |  | 39CH, 54CH | nein | [Link](https://en.lightsky.com.cn/product/scope/) |
| Light Sky | SEA ANGEL-BATT | par | 7 Zellen | 5CH, 13CH | nein | [Link](https://en.lightsky.com.cn/product/sea-angel-batt/) |
| Light Sky | SEA ANGEL-DUAL | par | 7 Zellen | 5CH, 13CH | nein | [Link](https://en.lightsky.com.cn/product/sea-angel-dual/) |
| Light Sky | SEA LION | effect | 2 Zellen | 26CH, 48CH | nein | [Link](https://en.lightsky.com.cn/product/sea-lion/) |
| Light Sky | SEAGUL | strobe | 40 Zellen | 21CH, 168CH | nein | [Link](https://en.lightsky.com.cn/product/seagul/) |
| Light Sky | SEAL | blinder | 2 Zellen | 1CH, 2CH Pixel, 8CH Pixel, 14CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/seal/) |
| Light Sky | SHARK LASER (Economic) | movinghead / beam |  | 14CH | nein | [Link](https://en.lightsky.com.cn/product/shark-laser-economic/) |
| Light Sky | SHARK LASER | movinghead / beam |  | 17CH | nein | [Link](https://en.lightsky.com.cn/product/shark-laser/) |
| Light Sky | SHARK PROFILE HC | movinghead / profile |  | 44CH, 56CH | nein | [Link](https://en.lightsky.com.cn/product/shark-profile-hc/) |
| Light Sky | SHARK PROFILE | movinghead / profile |  | 44CH, 56CH | nein | [Link](https://en.lightsky.com.cn/product/shark-profile/) |
| Light Sky | SHARK400 | movinghead / beam |  | 17CH | nein | [Link](https://en.lightsky.com.cn/product/shark400/) |
| Light Sky | SHARK400BSW | movinghead / spot |  | 28CH | nein | [Link](https://en.lightsky.com.cn/product/shark400bsw/) |
| Light Sky | SHARK450 | movinghead / beam |  | 17CH | nein | [Link](https://en.lightsky.com.cn/product/shark450/) |
| Light Sky | SHARK450BSW | movinghead / spot |  | 28CH | nein | [Link](https://en.lightsky.com.cn/product/shark450bsw/) |
| Light Sky | SIRENA BAR | bar | 14 Zellen | 16CH, 68CH Pixel | nein | [Link](https://en.lightsky.com.cn/product/sirena-bar/) |
| Light Sky | SOUSA | strobe | 96 Zellen | 15CH, 21CH, 158CH | nein | [Link](https://en.lightsky.com.cn/product/sousa/) |
| Light Sky | SUPER SCOPE-Ⅱ | movinghead / profile |  | 27CH, 33CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-2/) |
| Light Sky | SUPER SCOPE AQUA | movinghead / profile |  | 41CH, 42CH, 53CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-aqua/) |
| Light Sky | SUPER SCOPE COLOR | movinghead / profile |  | 35CH, 49CH, 60CH, 64CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-color/) |
| Light Sky | SUPER SCOPE HYBRID PRO | movinghead / spot |  | 30CH, 34CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-hybrid-pro/) |
| Light Sky | SUPER SCOPE HYBRID | movinghead / spot |  | 22CH, 25CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-hybrid/) |
| Light Sky | SUPER SCOPE II | movinghead / profile |  | 42CH, 54CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-ii/) |
| Light Sky | SUPER SCOPE MAX | movinghead / profile |  | 90CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-max/) |
| Light Sky | SUPER SCOPE PLUS | movinghead / profile |  | 43CH, 55CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-plus/) |
| Light Sky | SUPER SCOPE PRO | movinghead / profile |  | 33CH, 36CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-pro/) |
| Light Sky | SUPER SCOPE WASH | movinghead / wash |  | 32CH, 44CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope-wash/) |
| Light Sky | SUPER SCOPE (39/54 CH) | movinghead / profile |  | 39CH, 54CH | nein | [Link](https://en.lightsky.com.cn/product/super-scope/) |
| Light Sky | SUPER SHARK BEAM | movinghead / beam |  | 18CH | nein | [Link](https://en.lightsky.com.cn/product/super-shark-beam/) |
| Light Sky | TH-346 | profile |  | 1CH, 2CH, 4CH, 7CH | nein | [Link](https://en.lightsky.com.cn/product/th-346/) |
| Light Sky | TH-347 | profile |  | 2CH | nein | [Link](https://en.lightsky.com.cn/product/th-347/) |
| Light Sky | TH-353 | fresnel |  | 4CH, 5CH, 6CH, 7CH, 9CH, 10CH, 12CH | nein | [Link](https://en.lightsky.com.cn/product/th-353/) |
| Light Sky | TX0610 BEAM | movinghead / beam |  | 11CH, 17CH | nein | [Link](https://en.lightsky.com.cn/product/tx0610-beam/) |
| Light Sky | TX0710 WASH | movinghead / wash |  | 9CH, 15CH | nein | [Link](https://en.lightsky.com.cn/product/tx0710-wash/) |
| Light Sky | TX1810 ZOOM | movinghead / wash |  | 10CH, 16CH, 20CH, 24CH | nein | [Link](https://en.lightsky.com.cn/product/tx1810-zoom/) |
| Light Sky | TX1810BEAM | movinghead / beam |  | 11CH, 17CH, 21CH, 25CH | nein | [Link](https://en.lightsky.com.cn/product/tx1810beam/) |
| Light Sky | TX1910 WASH | movinghead / wash |  | 9CH, 15CH, 23CH, 27CH | nein | [Link](https://en.lightsky.com.cn/product/tx1910-wash/) |
| Light Sky | TX1920-HC | movinghead / wash |  | 13CH | nein | [Link](https://en.lightsky.com.cn/product/tx1920-hc/) |
| Light Sky | TX1920 ZOOM | movinghead / wash |  | 15CH, 24CH, 25CH | nein | [Link](https://en.lightsky.com.cn/product/tx1920-zoom/) |
| Light Sky | TX1940 ZOOM | movinghead / wash |  | 9CH, 12CH, 13CH, 23CH | nein | [Link](https://en.lightsky.com.cn/product/tx1940-zoom/) |
| Light Sky | TX1940D | movinghead / wash |  | 11CH, 17CH, 21CH, 40CH, 74CH, 93CH | nein | [Link](https://en.lightsky.com.cn/product/tx1940d/) |
| LiteLEES | 1915 RGBW Zoom Par | par | 19 Zellen | 1CH, 5CH, 8CH, 23CH | nein | [Link](https://www.litelees.com/product/1915-rgbw-zoom-par/) |
| LiteLEES | 740 RGBW Zoom Par IP | par | 7 Zellen | 10CH | nein | [Link](https://www.litelees.com/product/740-rgbw-zoom-par-ip/) |
| LiteLEES | Aria Par 750 | par | 7 Zellen | 5CH | nein | [Link](https://www.litelees.com/product/aria-par-750/) |
| LiteLEES | BIG EYE BAR L6010 IP | tiltbar | 10 Zellen | 17CH, 27CH, 99CH, 108CH, 168CH, 170CH | nein | [Link](https://www.litelees.com/product/big-eye-bar-l6010-ip/) |
| LiteLEES | BIG EYE BAR L6010 | tiltbar | 10 Zellen | 17CH, 27CH, 99CH, 108CH, 168CH | nein | [Link](https://www.litelees.com/product/big-eye-bar-l6010/) |
| LiteLEES | BIG EYE L1507 IP | movinghead / wash | 7 Zellen | 21CH, 35CH Pixel, 42CH Pixel, 49CH Pixel, 56CH Pixel | nein | [Link](https://www.litelees.com/product/big-eye-l1507-ip/) |
| LiteLEES | BIG EYE L4019 IP | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel | nein | [Link](https://www.litelees.com/product/big-eye-l4019-ip/) |
| LiteLEES | BIG EYE L4019 PRO | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel | nein | [Link](https://www.litelees.com/product/big-eye-l4019-pro/) |
| LiteLEES | BIG EYE L6019 PRO | movinghead / wash | 19 Zellen | 23CH, 37CH, 80CH Pixel, 94CH Pixel, 99CH Pixel | nein | [Link](https://www.litelees.com/product/big-eye-l6019-pro/) |
| LiteLEES | BIG EYE L8019 IP | movinghead / wash | 19 Zellen | 21CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel | nein | [Link](https://www.litelees.com/product/big-eye-l8019-ip/) |
| LiteLEES | Circle Battery Par 615 IP | par | 6 Zellen | 2CH, 6CH, 8CH, 11CH | nein | [Link](https://www.litelees.com/product/circle-battery-par-615-ip/) |
| LiteLEES | Classic Par 2710 | par |  | 8CH | nein | [Link](https://www.litelees.com/product/classic-par-2710/) |
| LiteLEES | ECO Par 1812 | par | 18 Zellen | 4CH, 8CH | nein | [Link](https://www.litelees.com/product/eco-par-1812/) |
| LiteLEES | Fresnel 200 | fresnel | 2 Zellen | 4CH | nein | [Link](https://www.litelees.com/product/fresnel-200/) |
| LiteLEES | Fresnel ZOOM 600 | fresnel | 2 Zellen | 4CH | nein | [Link](https://www.litelees.com/product/fresnel-600/) |
| LiteLEES | Fresnel ZOOM 300 | fresnel | 2 Zellen | 5CH | nein | [Link](https://www.litelees.com/product/fresnel-zoom-300/) |
| LiteLEES | L1537 WASH | movinghead / wash | 37 Zellen | 10CH, 15CH, 21CH, 25CH, 37CH | nein | [Link](https://www.litelees.com/product/l1537-wash/) |
| LiteLEES | L2537 WASH | movinghead / wash | 37 Zellen | 15CH, 31CH, 35CH | nein | [Link](https://www.litelees.com/product/l2537-wash/) |
| LiteLEES | L4019 WASH | movinghead / wash | 19 Zellen | 10CH, 15CH, 21CH, 25CH, 37CH | nein | [Link](https://www.litelees.com/product/l4019-wash/) |
| LiteLEES | LE BEAM 300 | movinghead / beam |  | 18CH | nein | [Link](https://www.litelees.com/product/le-beam-300/) |
| LiteLEES | LE-BSW 500 | movinghead / spot |  | 31CH | nein | [Link](https://www.litelees.com/product/le-bsw-500/) |
| LiteLEES | LE-BSW 700 IP | movinghead / spot |  | 26CH | nein | [Link](https://www.litelees.com/product/le-bsw-700-ip/) |
| LiteLEES | LUMIX BEAM 420 IP | movinghead / beam |  | 16CH | nein | [Link](https://www.litelees.com/product/litelees-lumix-beam-420-ip/) |
| LiteLEES | Stormy Pixel Bar 1820 IP | bar | 18 Zellen | 4CH, 10CH, 34CH, 96CH | nein | [Link](https://www.litelees.com/product/litelipees-stormy-pixel-bar-1820/) |
| LiteLEES | LP Profile 1000 IP | movinghead / profile |  | 34CH, 39CH, 56CH | nein | [Link](https://www.litelees.com/product/lp-profile-1000-ip/) |
| LiteLEES | LP Profile 700 | movinghead / profile |  | 37CH | nein | [Link](https://www.litelees.com/product/lp-profile-700/) |
| LiteLEES | LP Profile 900 | movinghead / profile |  | 35CH | nein | [Link](https://www.litelees.com/product/lp-profile-900/) |
| LiteLEES | LS BEAM 350/250 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.litelees.com/product/ls-beam-350-250/) |
| LiteLEES | Magic Cube V6 IP | effect | 16 Zellen | 8CH | nein | [Link](https://www.litelees.com/product/magic-cube-v6-ip/) |
| LiteLEES | Magic Cube V8 IP | effect | 4 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.litelees.com/product/magic-cube-v8-ip/) |
| LiteLEES | MINI Battery Par 412 | par | 4 Zellen | 10CH | nein | [Link](https://www.litelees.com/product/mini-battery-par-412/) |
| LiteLEES | MINI EYE L3019 IP | movinghead / wash | 19 Zellen | 17CH, 29CH, 32CH, 33CH | nein | [Link](https://www.litelees.com/product/mini-eye-l3019-ip/) |
| LiteLEES | Mini Profile 100 | profile |  | 2CH | nein | [Link](https://www.litelees.com/product/mini-profile-100/) |
| LiteLEES | Mini Profile 80W IP | profile |  | 4CH | nein | [Link](https://www.litelees.com/product/mini-profile-80-ip/) |
| LiteLEES | P10 Flood Light IP | panel |  | 8CH, 13CH, 16CH, 21CH, 33CH, 48CH | nein | [Link](https://www.litelees.com/product/p10-flood-light-ip/) |
| LiteLEES | P5 Flood Light IP | panel |  | 4CH, 6CH, 9CH | nein | [Link](https://www.litelees.com/product/p5-flood-light-ip/) |
| LiteLEES | Pixel Bar 1812 | bar | 18 Zellen | 10CH, 72CH Pixel, 78CH Pixel | nein | [Link](https://www.litelees.com/product/pixel-bar-1812/) |
| LiteLEES | Profile 200 | profile | 2 Zellen | 4CH | nein | [Link](https://www.litelees.com/product/profile-200/) |
| LiteLEES | Profile 300 | profile | 2 Zellen | 4CH | nein | [Link](https://www.litelees.com/product/profile-300/) |
| LiteLEES | Profile 300W IP | profile |  | 4CH | nein | [Link](https://www.litelees.com/product/profile-300w-ip/) |
| LiteLEES | Smart Battery Par 618 | par | 6 Zellen | 6CH, 10CH | nein | [Link](https://www.litelees.com/product/smart-battery-par-618/) |
| LiteLEES | Stormy Battery Flood Light 1820 IP | panel |  | 2CH, 4CH | nein | [Link](https://www.litelees.com/product/stormy-battery-flood-light-1820-ip/) |
| LiteLEES | Stormy Battery Par 1212 IP | par | 12 Zellen | 1CH, 6CH, 8CH | nein | [Link](https://www.litelees.com/product/stormy-battery-par-1212-ip/) |
| LiteLEES | Stormy Battery Par 420 IP | par | 4 Zellen | 2CH, 6CH, 8CH, 11CH | nein | [Link](https://www.litelees.com/product/stormy-battery-par-420-ip/) |
| LiteLEES | Stormy Battery Par 620 IP | par | 6 Zellen | 2CH, 4CH | nein | [Link](https://www.litelees.com/product/stormy-battery-par-620-ip/) |
| LiteLEES | Stormy Battery Par 720 IP | par | 7 Zellen | 1CH, 2CH, 3CH, 6CH, 8CH | nein | [Link](https://www.litelees.com/product/stormy-battery-par-720-ip/) |
| LiteLEES | Stormy Battery Par 918 IP | par | 9 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://www.litelees.com/product/stormy-battery-par-918-ip/) |
| LiteLEES | Stormy Blinder 400 IP | blinder | 2 Zellen | 8CH Pixel | nein | [Link](https://www.litelees.com/product/stormy-blinder-400-ip/) |
| LiteLEES | Stormy Blinder 800 IP | blinder | 4 Zellen | 12CH Pixel | nein | [Link](https://www.litelees.com/product/stormy-blinder-800-ip/) |
| LiteLEES | Stormy Flash 550 IP | strobe | 96 Zellen | 7CH, 15CH, 17CH, 21CH, 33CH, 39CH, 65CH, 68CH, 70CH, 112CH, 117CH | nein | [Link](https://www.litelees.com/product/stormy-flash-550-lp/) |
| LiteLEES | Stormy Pixel Bar 1812 IP | bar | 18 Zellen | 6CH, 10CH, 28CH, 108CH | nein | [Link](https://www.litelees.com/product/stormy-pixel-bar-1812-ip/) |
| LiteLEES | Stormy Shake Blinder IP | blinder | 2 Zellen | 8CH, 12CH | nein | [Link](https://www.litelees.com/product/stormy-shake-blinder-ip/) |
| LiteLEES | Stormy STRIKE M IP | strobe | 14 Zellen | 8CH, 11CH, 13CH, 18CH, 24CH, 25CH, 95CH | nein | [Link](https://www.litelees.com/product/stormy-strike-m-ip/) |
| LiteLEES | Stormy Strike M PRO IP | strobe | 14 Zellen | 8CH, 11CH, 13CH, 24CH, 30CH, 47CH Pixel, 68CH Pixel, 74CH Pixel, 97CH Pixel | nein | [Link](https://www.litelees.com/product/stormy-strike-m-pro-ip/) |
| LiteLEES | Stormy Strip Duo IP | bar | 4 Zellen | 12CH, 21CH, 26CH, 28CH, 32CH, 35CH, 39CH, 42CH, 46CH, 53CH, 56CH | nein | [Link](https://www.litelees.com/product/stormy-strip-duo-ip/) |
| LiteLEES | Stormy Strobe 500 IP | strobe | 96 Zellen | 4CH, 12CH, 120CH | nein | [Link](https://www.litelees.com/product/stormy-strobe-500-ip/) |
| LiteLEES | Stormy Strobe 700 IP | strobe | 30 Zellen | 6CH, 8CH, 19CH, 33CH, 73CH, 141CH | nein | [Link](https://www.litelees.com/product/stormy-strobe-700-ip/) |
| LiteLEES | Stormy Strobe Bar IP | strobe | 96 Zellen | 7CH, 15CH, 17CH, 21CH, 33CH, 39CH, 65CH, 68CH, 70CH, 112CH, 117CH | nein | [Link](https://www.litelees.com/product/stormy-strobe-bar-ip/) |
| LiteLEES | Stormy Strobe M 3000 IP | strobe | 96 Zellen | 6CH, 20CH, 41CH | nein | [Link](https://www.litelees.com/product/stormy-strobe-m-3000-ip/) |
| LiteLEES | Stormy Supreme 600 IP | strobe | 30 Zellen | 15CH, 29CH, 33CH, 86CH, 152CH | nein | [Link](https://www.litelees.com/product/stormy-supreme-600-ip/) |
| LiteLEES | SUPER HERO 470 PRO | movinghead / spot |  | 30CH, 34CH | nein | [Link](https://www.litelees.com/product/super-hero-470-pro/) |
| LiteLEES | TORNADOT 5 IP | multibar | 5 Zellen | 21CH Pixel, 41CH Pixel, 71CH Pixel, 75CH Pixel, 85CH Pixel, 170CH Pixel | nein | [Link](https://www.litelees.com/product/tornadot-5-ip/) |
| LiteLEES | TORNADOT 5 | multibar | 5 Zellen | 41CH, 71CH, 75CH, 85CH, 170CH | nein | [Link](https://www.litelees.com/product/tornadot-5/) |
| LiteLEES | Volero 1000 IP | bar | 12 Zellen | 26CH, 59CH Pixel, 128CH Pixel, 182CH Pixel | nein | [Link](https://www.litelees.com/product/volero-1000-ip/) |
| Lixada | 75W RGBWY Par-Wash Moving Head 5×15W | movinghead / wash | 5 Zellen | 10CH, 15CH Pixel | nein | [Link](https://www.lixada.com/p-l0817us.html) |
| Martin | MAC Viper XIP | movinghead / profile |  | 54CH, 64CH, 70CH | nein | [Link](https://www.martin.com/en/products/mac-viper-xip) |
| Martin | MAC Encore Two | movinghead / profile |  | 52CH, 62CH, 68CH | nein | [Link](https://www.martin.com/en/products/mac-encore-two) |
| Martin | MAC Encore Wash CLD | movinghead / wash |  | 24CH | nein | [Link](https://www.martin.com/en/products/mac-encore-wash-cld) |
| Martin | MAC Encore Wash WRM | movinghead / wash |  | 24CH | nein | [Link](https://www.martin.com/en/products/mac-encore-wash-wrm) |
| Martin | ERA 600 Performance | movinghead / profile |  | 41CH | nein | [Link](https://www.martin.com/en/products/era-600-performance) |
| Martin | ERA 700 Performance IP | movinghead / profile |  | 42CH, 54CH | nein | [Link](https://www.martin.com/en/products/era-700-performance-ip) |
| Martin | ERA 800 Performance | movinghead / profile |  | 42CH | nein | [Link](https://www.martin.com/en/products/era-800-performance) |
| Martin | ERA 800 Profile | movinghead / spot |  | 36CH | nein | [Link](https://www.martin.com/en/products/era-800-profile) |
| Martin | MAC One Beam | movinghead / beam | 24 Zellen | 19CH, 35CH, 107CH | nein | [Link](https://www.martin.com/en/products/mac-one-beam) |
| Martin | MAC Aura Raven XIP | movinghead / wash |  | 22CH, 38CH, 149CH, 266CH | nein | [Link](https://www.martin.com/en/products/mac-aura-raven-xip) |
| Martin | MAC Allure Wash PC | movinghead / wash | 7 Zellen | 28CH Pixel, 64CH Pixel | nein | [Link](https://www.martin.com/en/products/mac-allure-wash-pc) |
| Martin | MAC Viper Beam | movinghead / beam |  | 20CH, 28CH | nein | [Link](https://www.martin.com/en/products/mac-viper-beam) |
| Martin | MAC Viper Quadray | effect |  | 20CH, 28CH | nein | [Link](https://www.martin.com/en/products/mac-viper-quadray) |
| Martin | MAC Viper Wash | movinghead / wash |  | 18CH, 24CH | nein | [Link](https://www.martin.com/en/products/mac-viper-wash) |
| Martin | MAC III Performance | movinghead / profile |  | 33CH, 40CH | nein | [Link](https://www.martin.com/en/products/mac-iii-performance) |
| Martin | MAC III Wash | movinghead / wash |  | 21CH | nein | [Link](https://www.martin.com/en/products/mac-iii-wash) |
| Martin | MAC III AirFX | movinghead / beam |  | 22CH | nein | [Link](https://www.martin.com/en/products/mac-iii-airfx) |
| Martin | MAC III Quadray | effect |  | 22CH | nein | [Link](https://www.martin.com/en/products/mac-iii-quadray) |
| Martin | MAC 2000 Profile | movinghead / spot |  | 20CH, 24CH | nein | [Link](https://www.martin.com/en/products/mac-2000-profile) |
| Martin | MAC 2000 Wash XB | movinghead / wash |  | 19CH, 21CH | nein | [Link](https://www.martin.com/en/products/mac-2000-wash-xb) |
| Martin | MAC TW1 | movinghead / wash |  | 14CH, 20CH | nein | [Link](https://www.martin.com/en/products/mac-tw1) |
| Martin | MAC 550 | movinghead / spot |  | 21CH, 27CH | nein | [Link](https://www.martin.com/en/products/mac-550) |
| Martin | MAC 575 Krypton | movinghead / spot |  | 19CH, 25CH | nein | [Link](https://www.martin.com/en/products/mac-575-krypton) |
| Martin | MAC 101 CT | movinghead / wash |  | 10CH | nein | [Link](https://www.martin.com/en/products/mac-101-ct) |
| Martin | RUSH MH 4 Beam | movinghead / beam |  | 13CH | nein | [Link](https://www.martin.com/en/products/rush-mh-4-beam) |
| Martin | RUSH MH 6 Wash CT | movinghead / wash | 12 Zellen | 14CH | nein | [Link](https://www.martin.com/en/products/rush-mh-6-wash-ct) |
| Martin | RUSH MH 8 Mini Profile | movinghead / spot |  | 10CH | nein | [Link](https://www.martin.com/en/products/rush-mh-8-mini-profile) |
| Martin | RUSH MH 10 Beam FX | movinghead / beam |  | 24CH, 93CH | nein | [Link](https://www.martin.com/en/products/rush-mh-10-beam-fx) |
| Martin | RUSH MH 11 Beam | movinghead / beam |  | 18CH | nein | [Link](https://www.martin.com/en/products/rush-mh-11-beam) |
| Martin | RUSH Multibeam 2 | effect | 10 Zellen | 44CH | nein | [Link](https://www.martin.com/en/products/rush-multibeam-2) |
| Martin | RUSH PAR 2 CT Zoom | par | 12 Zellen | 7CH | nein | [Link](https://www.martin.com/en/products/rush-par-2-ct-zoom) |
| Martin | RUSH PAR 3 RGB | par |  | 9CH | nein | [Link](https://www.martin.com/en/products/rush-par-3-rgb) |
| Martin | RUSH PAR 4 UV | par |  | 3CH | nein | [Link](https://www.martin.com/en/products/rush-par-4-uv) |
| Martin | RUSH Batten 1 Hex | bar | 12 Zellen | 13CH, 80CH Pixel | nein | [Link](https://www.martin.com/en/products/rush-batten-1-hex) |
| Martin | RUSH Blinder 1 WW | blinder | 4 Zellen | 1CH, 4CH Pixel, 8CH Pixel | nein | [Link](https://www.martin.com/en/products/rush-blinder-1-ww) |
| Martin | RUSH Strobe 1 5x5 | strobe | 25 Zellen | 4CH, 25CH Pixel, 29CH Pixel | nein | [Link](https://www.martin.com/en/products/rush-strobe-1-5x5) |
| Martin | RUSH Strobe CWL | strobe | 96 Zellen | 1CH, 4CH | nein | [Link](https://www.martin.com/en/products/rush-strobe-cwl) |
| Martin | RUSH DC 1 Aqua | effect |  | 4CH | nein | [Link](https://www.martin.com/en/products/rush-dc-1-aqua) |
| Martin | VDO Atomic Bold | strobe |  | 1CH, 3CH, 4CH, 10CH, 27CH, 243CH | nein | [Link](https://www.martin.com/en/products/vdo-atomic-bold) |
| Martin | VDO Atomic Dot CLD | strobe |  | 1CH, 3CH, 4CH, 19CH, 64CH | nein | [Link](https://www.martin.com/en/products/vdo-atomic-dot-cld) |
| Martin | VDO Atomic Dot WRM | strobe |  | 1CH, 3CH, 4CH, 19CH, 64CH | nein | [Link](https://www.martin.com/en/products/vdo-atomic-dot-wrm) |
| Martin | VDO Sceptron 10 | bar | 1 Zellen | 3CH, 10CH, 13CH, 22CH, 103CH, 307CH | nein | [Link](https://www.martin.com/en/products/vdo-sceptron-10) |
| Martin | VDO Sceptron 20 | bar | 1 Zellen | 3CH, 10CH, 13CH, 22CH, 55CH, 157CH | nein | [Link](https://www.martin.com/en/products/vdo-sceptron-20) |
| Martin | VDO Sceptron 40 | bar | 1 Zellen | 3CH, 10CH, 13CH, 22CH, 31CH, 82CH | nein | [Link](https://www.martin.com/en/products/vdo-sceptron-40) |
| Martin | VDO Fatron 20 | bar | 1 Zellen | 3CH, 10CH, 19CH, 37CH, 55CH, 157CH | nein | [Link](https://www.martin.com/en/products/vdo-fatron-20) |
| Martin | VDO Dotron | effect |  | 3CH, 10CH | nein | [Link](https://www.martin.com/en/products/vdo-dotron) |
| Martin | VC-Dot 1 | effect |  | 3CH | nein | [Link](https://www.martin.com/en/products/vc-dot-1) |
| Martin | VC-Dot 4 | effect | 4 Zellen | 3CH | nein | [Link](https://www.martin.com/en/products/vc-dot-4) |
| Martin | VC-Grid 15 | strobe | 256 Zellen | 3CH, 192CH | nein | [Link](https://www.martin.com/en/products/vc-grid-15) |
| Martin | VC-Grid 30 | strobe | 1 Zellen | 3CH, 192CH | nein | [Link](https://www.martin.com/en/products/vc-grid-30) |
| Martin | Stagebar 2 | bar | 1 Zellen | 3CH, 30CH | nein | [Link](https://www.martin.com/en/products/stagebar-2) |
| Martin | ELP CL IP | profile |  | 1CH, 10CH, 17CH | nein | [Link](https://www.martin.com/en/products/elp-cl-ip) |
| Martin | ELP WW | profile |  | 1CH, 2CH, 4CH | nein | [Link](https://www.martin.com/en/products/elp-ww) |
| Martin | ELP WW IP | profile |  | 1CH, 2CH, 4CH | nein | [Link](https://www.martin.com/en/products/elp-ww-ip) |
| Martin | ELP PAR IP | par | 7 Zellen | 14CH | nein | [Link](https://www.martin.com/en/products/elp-par-ip) |
| Martin | ELP Manet 8f | fresnel |  | 11CH, 17CH | nein | [Link](https://www.martin.com/en/products/elp-manet-8f) |
| Martin | THRILL Compact PAR 64 LED | par | 5 Zellen | 6CH, 9CH | nein | [Link](https://www.martin.com/en/products/thrill-compact-par-64-led) |
| Martin | THRILL Compact PAR Mini LED | par | 7 Zellen | 3CH, 6CH | nein | [Link](https://www.martin.com/en/products/thrill-compact-par-mini-led) |
| Martin | THRILL Multi-FX LED | effect | 5 Zellen | 2CH, 16CH | nein | [Link](https://www.martin.com/en/products/thrill-multi-fx-led) |
| Martin | Exterior 1200 Wash | panel |  | 8CH | nein | [Link](https://www.martin.com/en/products/exterior-1200-wash) |
| Martin | Extube | tube | 1 Zellen | 3CH, 4CH, 12CH, 16CH | nein | [Link](https://www.martin.com/en/products/extube) |
| Martin | Tripix Wash | bar | 1 Zellen | 3CH, 4CH | nein | [Link](https://www.martin.com/en/products/tripix-wash) |
| MOKA SFX | EPL B-Eyes 19*40W Led Wash Light | movinghead / beeeye | 19 Zellen | 24CH, 26CH, 38CH, 81CH, 95CH, 102CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/b-eye-1940w-stage-moving-head-led-wash-lights/) |
| MOKA SFX | EPL 12*40 ZOOM RGBW LED Moving Head Wash Light | movinghead / wash | 12 Zellen | 18CH, 24CH, 68CH Pixel | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-1240w-led-zoom/) |
| MOKA SFX | EPL 1260 12×60W LED Zoom Pixel Beam Bar | tiltbar | 1 Zellen | 20CH, 53CH, 101CH, 155CH, 169CH, 179CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-1260-12x60w-led-bar-moving-head-wash-light/) |
| MOKA SFX | EPL 19X15W LED Zoom Moving Head Wash Light | movinghead / wash | 19 Zellen | 11CH, 27CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-19x15w-led-zoom-moving-head-wash-light/) |
| MOKA SFX | EPL 3715 37×15 LED Zoom Moving Head Wash Light | movinghead / wash |  | 12CH, 20CH, 32CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-3715-led-zoom-wash-light/) |
| MOKA SFX | EPL 5120 5×120W LED Zoom Pixel Beam Bar Moving Head LED Bar | multibar | 5 Zellen | 41CH, 71CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-5120-5x120w-led-bar-wash-light/) |
| MOKA SFX | EPL 640B 6×40W Zoom Pixel Beam Wash Bar Light | tiltbar | 1 Zellen | 100CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-640b-6x40w-zoom-pixel-beam-wash-bar/) |
| MOKA SFX | EPL 7*40W LED ZOOM Wash Moving Light | movinghead / wash |  | 17CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-7-40w-led-zoom-moving-head-light/) |
| MOKA SFX | EPL 740S MINI 740W LED Zoom Moving Head Wash | movinghead / wash | 7 Zellen | 5CH, 45CH Pixel | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-740s-mini-740w-led-zoom-moving-head-wash/) |
| MOKA SFX | EPL 7*40W LED Bee Moving Head Wash Light | movinghead / beeeye | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-740w-led-bee-moving-head-wash-light/) |
| MOKA SFX | EPL Aura led moving wash light | movinghead / wash |  | 14CH, 25CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-aura-led-moving-wash-light/) |
| MOKA SFX | EPL B-eye 1915 moving head light | movinghead / beeeye | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel, 99CH Pixel | nein | [Link](https://mokasfx.com/eplmovingheadlight/epl-b-eye-1915-moving-head-light/) |
| MOKA SFX | EPR LED 740 Moving Head Spot Wash Light | movinghead / spot |  | 12CH, 22CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/epr-spot-740/) |
| MOKA SFX | EPL Aura led moving wash light (the-epl-aura-led-moving-wash-light-2825) | movinghead / wash |  | 72CH | nein | [Link](https://mokasfx.com/eplmovingheadlight/the-epl-aura-led-moving-wash-light-2825/) |
| MOKA SFX | MK-LB02 DMX Kinetic Tube Light | effect |  | 60CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb02-dmx-kinetic-tube-light/) |
| MOKA SFX | MK-LB02 LED Kinetic Triangle Tubes | effect |  | 60CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb02-led-kinetic-triangle-tube/) |
| MOKA SFX | MK-LB03 LED Kinetic Football Light | derby / orb | 24 Zellen | 18CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb03-led-kinetic-football-light/) |
| MOKA SFX | MK-LB04 Kinetic Mirror Discs | scanner |  | 8CH, 60CH, 62CH, 80CH, 83CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb04-kinetic-mirror-discs/) |
| MOKA SFX | MK-LB05 Golden Kinetic Drop | effect |  | 4CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb05-kinetic-waterdrop/) |
| MOKA SFX | MK-LB06 RGB Kinetic Pixel Tube | effect |  | 60CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb06-rgb-kinetic-pixel-tube/) |
| MOKA SFX | MK-LB07 LED Kinetic Conch | effect |  | 9CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb07-led-kinetic-conch/) |
| MOKA SFX | MK-LB08 LED Kinetic Light / Crystal Waterdrop | effect |  | 10CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb08-led-kinetic-light-crystal-waterdrop/) |
| MOKA SFX | MK-LB09 LED Kinetic Crystal Ball | derby / orb | 24 Zellen | 7CH, 9CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb09-led-kinetic-crystal/) |
| MOKA SFX | MK-LB10 Kinetic Beam Ring | effect |  | 12CH, 200CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb10-kinetic-beam-ring/) |
| MOKA SFX | MK-LB11 Kinetic Ring Light | effect |  | 8CH, 80CH | nein | [Link](https://mokasfx.com/kinetic-light-system/mk-lb11-kinetic-ring-light/) |
| MOKA SFX | MK-LB01 Kinetic Lighting System | effect |  | 10CH | nein | [Link](https://mokasfx.com/kinetic-light-system/moka-lf-01-kinetic/) |
| MOKA SFX | MK-LS06 6 Eyes RGB Swing Laser Light Projector | laser |  | 11CH, 26CH, 38CH | nein | [Link](https://mokasfx.com/laser-light/mk-ls06-500w-6-eyes-rgb-beam-laser-light/) |
| MOKA SFX | MK-LS08 8 Eyes Swing Head Laser Lights - RGB / Red | laser |  | 19CH | nein | [Link](https://mokasfx.com/laser-light/mk-ls08-500w-8-eyes-rgb-beam-laser-light/) |
| MOKA SFX | MK-LS09 6 Head RGB Animation Laser Light | laser |  | 12CH, 62CH | nein | [Link](https://mokasfx.com/laser-light/mk-ls09-6-head-rgb-animation-laser-light/) |
| MOKA SFX | MK-LS10A 3W Moving Party Laser Light | laser |  | 40CH | nein | [Link](https://mokasfx.com/laser-light/mk-ls10a-moving-head-party-laser-light-3w/) |
| MOKA SFX | EPR 150W 3 in 1 led moving head | movinghead / spot |  | 18CH | nein | [Link](https://mokasfx.com/moving-head-light/150w-3in1-led-moving-head/) |
| MOKA SFX | EPR 350BSW 17R Beam Spot Wash 3in1 Moving Head Beam Light | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://mokasfx.com/moving-head-light/350w-3-in-1-moving-head-beam-light/) |
| MOKA SFX | EPR 380BSW 17R Beam Spot Wash 3in1 Moving Head Beam Light | movinghead / spot |  | 22CH | nein | [Link](https://mokasfx.com/moving-head-light/380-pattern-beam-moving-head-light/) |
| MOKA SFX | EPL 200W moving head light | movinghead / spot |  | 18CH | nein | [Link](https://mokasfx.com/moving-head-light/epl-200w/) |
| MOKA SFX | EPR Beam 350W moving head light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/eplbeam350w-moving-lights/) |
| MOKA SFX | EPR 100W LED Moving Head Spot Light | movinghead / spot |  | 14CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-100w-led-gobo-dj-moving-light/) |
| MOKA SFX | EPR 230W MINI Moving Head Beam Light / Sharpy Beam Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-230w-mini-moving-head-beam-light/) |
| MOKA SFX | EPR 300L 300W LED Moving Head Beam Light | movinghead / beam |  | 18CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-300l-300w-led-moving-head-beam-light/) |
| MOKA SFX | 400W 3IN1 CMY LED Moving Head Beam Light | movinghead / spot |  | 23CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-400w-3in1-led-moving-head-beam-light/) |
| MOKA SFX | EPR 420 420W Moving Head Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-420-420w-moving-head-light/) |
| MOKA SFX | EPR SPOT 470 MEGAPOINTE | movinghead / profile |  | 34CH, 39CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-470-megapointe/) |
| MOKA SFX | EPR 480CMY 480W LED CMY 3-in-1 Beam Spot Wash | movinghead / spot |  | 23CH, 25CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-480cmy-480w-3in1-beam-spot-light/) |
| MOKA SFX | EPR 500CMY 500W LED CMY 3-in-1 Beam Spot Wash | movinghead / spot |  | 23CH, 25CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-500cmy-500w-led-cmy-3in1-beam-spot-wash-moving-head-light/) |
| MOKA SFX | EPR 500FC 500W LED 4-in-1 Moving Head Light (CMY) | movinghead / profile |  | 26CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-500fc-500w-led-frame-light-cmy/) |
| MOKA SFX | EPR 500FP 500W LED 4-in-1 Frame Moving Light (+Pattern) | movinghead / profile |  | 26CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-500fp-500w-led-frame-light/) |
| MOKA SFX | EPR 500L 500W LED Moving Head Beam Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-500l-500w-led-moving-head-beam-light/) |
| MOKA SFX | EPR 600 PR 600W LED Moving Head Profile Light | movinghead / profile |  | 34CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-600-pr-600w-led-frame-light/) |
| MOKA SFX | EPR 800 PR 800W LED Framing | movinghead / profile |  | 39CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-800-pr-800w-led-framing-moving-head/) |
| MOKA SFX | EPR BEAM 295W moving head stage lights | movinghead / beam |  | 20CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-beam-295w-moving-head-stage-lights/) |
| MOKA SFX | EPR 382S Beam 17R Moving Head Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-beam-380w-moving-beam-light/) |
| MOKA SFX | EPR 250BSW 250W 3-in-1 LED Beam Wash Spot Light | movinghead / spot |  | 18CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-led-250w-3in1-moving-head-beam-light/) |
| MOKA SFX | EPR Spot 370 moving head spot | movinghead / spot |  | 16CH, 24CH, 25CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-spot-370-moving-head-spot/) |
| MOKA SFX | EPR SPOT 440 Mythos | movinghead / profile |  | 30CH, 34CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-spot-440-mythos/) |
| MOKA SFX | EPR Spot PF1000 VIPPER | movinghead / profile |  | 32CH, 35CH | nein | [Link](https://mokasfx.com/moving-head-light/epr-spot-pf-1000-vipper/) |
| MOKA SFX | EPR 300W 3in 1 led beam | movinghead / spot |  | 18CH | nein | [Link](https://mokasfx.com/moving-head-light/moka-sfx-300w-3in-1-led-moving-head-light/) |
| MOKA SFX | EPR 150W LED Beam Lights | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/moka-sfx-epr-150w-led-beam-lights/) |
| MOKA SFX | EPR BEAM 380W Moving Beam Light | movinghead / profile |  | 21CH | nein | [Link](https://mokasfx.com/moving-head-light/moka-sfx-epr-480-profile-dmx-beam-light/) |
| MOKA SFX | EPR 382 17R Moving Head Beam Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/moving-head-light/moka-sfx-epr-pro-380-moving-beam-light/) |
| MOKA SFX | EPR SPOT 440 | movinghead / profile |  | 30CH, 34CH | nein | [Link](https://mokasfx.com/moving-head-light/moka-sfx-epr-spot-440/) |
| MOKA SFX | P-02 Battery Par Light | par | 6 Zellen | 6CH, 10CH | nein | [Link](https://mokasfx.com/par-lights/p-02-battery-par-light/) |
| MOKA SFX | P-04 12*18W battery Par light | par | 12 Zellen | 6CH, 10CH | nein | [Link](https://mokasfx.com/par-lights/p-04-battery-par-light/) |
| MOKA SFX | P-12 LED Par Light | par | 18 Zellen | 11CH | nein | [Link](https://mokasfx.com/par-lights/p-12-waterproof-led-par-can-dj-par-light/) |
| MOKA SFX | P-16 LED PAR Light | par |  | 8CH | nein | [Link](https://mokasfx.com/par-lights/p-16-par-light/) |
| MOKA SFX | P-06 100W Cob Par light | par |  | 4CH | nein | [Link](https://mokasfx.com/par-lights/p06-led-par-can-light/) |
| MOKA SFX | P-03 9*18W Battery PAR Light | par | 9 Zellen | 6CH | nein | [Link](https://mokasfx.com/par-lights/parlight-p-03/) |
| MOKA SFX | 1000w Waterproof Strobe Light | strobe | 96 Zellen | 7CH, 14CH, 42CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/1000w-waterproof-strobe-light/) |
| MOKA SFX | P-B380 380W Waterproof Moving Head Beam Light | movinghead / beam |  | 17CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/380w-waterproof-outdoor-beam-moving-head/) |
| MOKA SFX | P-B380S Mini 380W Waterproof Moving Beam Light | movinghead / beam |  | 16CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/mini-380w-waterproof-moving-beam-light/) |
| MOKA SFX | P-1940 19×40W Waterproof B-Eyes Wash | movinghead / beeeye | 19 Zellen | 21CH, 26CH, 36CH, 43CH, 78CH, 119CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-1940-waterproof-wash-moving-head-light/) |
| MOKA SFX | P-380BSW 380W 3-in-1 Beam | movinghead / spot |  | 18CH, 20CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-380bsw-beam-moving-head/) |
| MOKA SFX | P-C18 18x20W 4-in-1 LED Wall Washer | bar | 18 Zellen | 72CH Pixel | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-c18-4-in-1-led-wall-washer/) |
| MOKA SFX | Waterproof P-C27 27×15W 4-in-1 LED Wash Light | panel |  | 4CH, 7CH, 8CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-c27-waterproof-led-wash-light/) |
| MOKA SFX | P-C32 32×30W 4-in-1 LED Wash Flood Light | panel |  | 15CH, 25CH, 45CH, 60CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-c32-waterproof-outdoor-led-wash-flood-light/) |
| MOKA SFX | P-C60 60×10W 4-in-1 LED Wash Flood Lights | panel |  | 4CH, 6CH, 9CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-c60-outdoor-led-wash-flood-lights/) |
| MOKA SFX | P-C80 80×20W 4-in-1 LED Full Color Wash Light | panel |  | 13CH | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-c80-80x20w-4-in-1-led-full-color-wash-light/) |
| MOKA SFX | P-L18 18x18W 6-in-1 Wall Washer Light | bar | 18 Zellen | 6CH, 10CH, 108CH Pixel | nein | [Link](https://mokasfx.com/waterproof-outdoor-lights/p-l18-18x18w-wall-washer-light/) |
| OPPSK | 200W 6-in-1 LED DJ GigBar Moving Head Light System | gigbar | 4 Zellen | 12CH, 30CH | nein | [Link](https://oppsk.com/products/200w-6-in-1-led-dj-gigbar-moving-head-light-system) |
| OPPSK | Outdoor 6LED RGBWAUV 6in1 Battery Powered Par Light | par | 6 Zellen | 6CH, 8CH, 10CH, 11CH | nein | [Link](https://oppsk.com/products/outdoor-6led-rgbwauv-6in1-battery-powered-par-light) |
| OPPSK | 24x6W RGBWAUV 6in1 Outdoor LED Wall Wash Light Bar | bar | 24 Zellen | 6CH, 8CH, 11CH, 144CH Pixel, 149CH Pixel | nein | [Link](https://oppsk.com/products/24x6w-rgbwauv-6in1-wall-wash-light-bar-with-remote) |
| OPPSK | 60W Battery Powered LED Spot Moving Head Light | movinghead / spot |  | 10CH, 12CH | nein | [Link](https://oppsk.com/products/battery-powered-led-moving-head) |
| OPPSK | Multi-effect LED Hybrid Moving Head Light | movinghead / spot |  | 22CH | nein | [Link](https://oppsk.com/products/multi-effect-led-hybrid-moving-head-light) |
| OPPSK | RGBA 4n1 LED Wash Light Bar with Remote | bar | 24 Zellen | 4CH, 12CH, 32CH | nein | [Link](https://oppsk.com/products/rgba-4n1-led-wash-light-bar-with-remote) |
| OPPSK | DJ Lighting System with Strobe Light Par light Disco Ball | gigbar | 4 Zellen | 12CH, 29CH Pixel, 33CH Pixel, 46CH Pixel | nein | [Link](https://oppsk.com/products/dj-lighting-system-with-strobe-light-bar-par-light-disco-ball) |
| OPPSK | 800W RGB+W+A LED DJ Strobe Light Panel | strobe |  | 18CH | nein | [Link](https://oppsk.com/products/800w-rgb-w-a-led-dj-strobe-light-panel) |
| OPPSK | 100W LED Retro Stage Moving Head Light | retro | 4 Zellen | 13CH, 17CH Pixel, 26CH Pixel, 29CH Pixel, 36CH Pixel | nein | [Link](https://oppsk.com/products/100w-4-leaf-led-retro-stage-light) |
| OPPSK | 200W LED Hybrid Moving Head Effect Light with 8 Arms | arms | 8 Zellen | 28CH Pixel | nein | [Link](https://oppsk.com/products/200w-led-hybrid-moving-head-effect-light-with-8-arms) |
| OPPSK | 6x50W Retro Stage Light with Stand | retro | 6 Zellen | 8CH Pixel, 28CH Pixel | nein | [Link](https://oppsk.com/products/6x50w-retro-stage-light-with-stand) |
| OPPSK | 200W LED Moving Head Beam Light with RGB Ring | movinghead / beam | 48 Zellen | 16CH | nein | [Link](https://oppsk.com/products/200w-led-moving-head-beam-light) |
| OPPSK | 19×15W Zoomable Moving Head Wash Light with LED Ring | movinghead / wash | 67 Zellen | 17CH, 25CH | nein | [Link](https://oppsk.com/products/19-15w-zoomable-moving-head-wash-light-with-led-ring) |
| OPPSK | 360° RGB LED Pixel Tube Light Bar- Battery Powered | tube | 1 Zellen | 5CH, 8CH, 60CH, 65CH | nein | [Link](https://oppsk.com/products/360-rgb-led-pixel-tube-light-bar-battery-powered) |
| OPPSK | 150W LED Hybrid Moving Head Effect Light with 6 Arms | arms | 2 Zellen | 25CH | nein | [Link](https://oppsk.com/products/150w-led-hybrid-moving-head-effect-light-with-6-arms) |
| OPPSK | 80W Mini Moving Head Beam Spot Light with Ring | movinghead / spot |  | 14CH | nein | [Link](https://oppsk.com/products/80w-mini-led-moving-head-beam-light-with-ring) |
| OPPSK | 150W LED Versatile Moving Head Light with 6 Arms | arms | 2 Zellen | 26CH | nein | [Link](https://oppsk.com/products/150w-led-versatile-moving-head-light-with-6-arms) |
| OPPSK | 100W RGBW 4in1 LED Par Light with RGB Rings | par | 140 Zellen | 8CH | nein | [Link](https://oppsk.com/products/100w-rgbw-4in1-led-par-light-with-rgb-rings) |
| OPPSK | 18LED RGBW 4in1 Par Light with RGB Ring | par | 53 Zellen | 6CH, 10CH | nein | [Link](https://oppsk.com/products/18led-rgbw-4in1-par-light-with-rgb-ring) |
| OPPSK | 6-Pack, 24x4W RGBA 4in1 Indoor LED Wall Washer Light | bar | 24 Zellen | 1CH, 6CH, 9CH | nein | [Link](https://oppsk.com/products/6-pack-oppsk-24x4w-rgba-4in1-indoor-led-wall-washer-light-for-wedding-uplighting-40-us-warehouse) |
| OPPSK | LED Hybrid Moving Head Beam Laser Strobe Effect Light | movinghead / matrix | 7 Zellen | 19CH, 25CH Pixel | nein | [Link](https://oppsk.com/products/led-hybrid-moving-head-beam-laser-strobe-effect-light) |
| OPPSK | 120W RGBW 4in1 LED Wash Light Bar-Individual Control | bar | 1 Zellen | 4CH, 8CH, 26CH, 72CH | nein | [Link](https://oppsk.com/products/120w-rgbw-4in1-led-wash-light-bar-individual-control) |
| OPPSK | 150W RGB+W LED DJ Strobe Light Panel | strobe |  | 4CH, 16CH | nein | [Link](https://oppsk.com/products/150w-rgb-w-led-dj-strobe-light-panel) |
| OPPSK | 120W RGBWA LED DJ Strobe Light Panel | strobe |  | 12CH, 70CH | nein | [Link](https://oppsk.com/products/120w-rgb-w-a-led-dj-strobe-light-panel) |
| OPPSK | 60LED RGB 3in1 Par Light | par | 60 Zellen | 6CH | nein | [Link](https://oppsk.com/products/60led-rgb-3in1-par-light) |
| OPPSK | Battery Powered Pixel Control Light Bar - 100W, Warm White & RGB 3n1 | bar | 12 Zellen | 5CH, 14CH, 63CH | nein | [Link](https://oppsk.com/products/battery-powered-pixel-control-dj-light-bar-100w) |
| OPPSK | DJ Effect Light bar-448LED RGBWA Pixel Light | bar | 96 Zellen | 7CH, 13CH, 82CH, 130CH, 135CH | nein | [Link](https://oppsk.com/products/dj-effect-light-bar-448led-rgbwa-pixel-light) |
| OPPSK | 9LED RGBWAUV 6in1 Battery Powered Par Light | par | 9 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://oppsk.com/products/9led-rgbwauv-6in1-battery-powered-par-light) |
| OPPSK | 24x6W RGBWAUV 6in1 LED Wash Light Bar | bar | 24 Zellen | 6CH, 8CH, 11CH, 48CH, 52CH | nein | [Link](https://oppsk.com/products/24x6w-rgbwauv-6in1-led-wash-light-bar) |
| OPPSK | 500W RGB+W LED Strobe Light Panel | strobe | 96 Zellen | 4CH, 11CH, 32CH, 39CH | nein | [Link](https://oppsk.com/products/strobe-light-panel-500w-rgb-w-led) |
| OPPSK | 44LED Waterproof Flood Light with Barn Door | panel |  | 4CH, 9CH | nein | [Link](https://oppsk.com/products/flood-light-with-barn-door-44led-wateproof) |
| OPPSK | 10×30W Beam Moving Head Light Bar | tiltbar | 1 Zellen | 7CH, 13CH, 43CH | nein | [Link](https://oppsk.com/products/moving-head-light-bar-10-30w-beam) |
| OPPSK | 300W Mini LED Beam Wash Moving Head Light | movinghead / beam |  | 23CH, 35CH, 51CH | nein | [Link](https://oppsk.com/products/moving-head-light-300w-mini-led-beam-wash) |
| OPPSK | 280W Beam Moving Head Light | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://oppsk.com/products/moving-head-light-280w-beam) |
| OPPSK | 280W Beam Moving Head Light with LED Ring | movinghead / beam |  | 18CH | nein | [Link](https://oppsk.com/products/moving-head-light-with-led-ring-280w-beam) |
| OPPSK | 250W Mini Beam Moving Head Light with LED Ring | movinghead / beam |  | 18CH | nein | [Link](https://oppsk.com/products/moving-head-light-with-led-ring-250w-mini-beam) |
| OPPSK | 250W Mini Beam Moving Head Light | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://oppsk.com/products/moving-head-light-250w-mini-beam) |
| OPPSK | 250W LED Hybrid Moving Head Light | movinghead / spot |  | 18CH | nein | [Link](https://oppsk.com/products/moving-head-light-250w-led-hybrid) |
| OPPSK | 1-meter LED Stage Wash Light Bar - RGBW 4in1 - 120W | bar | 36 Zellen | 4CH, 6CH, 9CH, 48CH, 52CH | nein | [Link](https://oppsk.com/products/1m-led-stage-wash-light-bar) |
| OPPSK | 70W RGBWA 5in1 LED Par Light | par | 7 Zellen | 9CH | nein | [Link](https://oppsk.com/products/70w-rgbwa-5in1-led-par-light) |
| OPPSK | DJ Light Bar - 100W, 288LEDs RGB+W | bar | 96 Zellen | 6CH, 9CH, 12CH, 32CH, 64CH | nein | [Link](https://oppsk.com/products/100w-288leds-rgbw-dj-light-bar) |
| OPPSK | LED Pixel Light Bar - 224LED, RGB 3n1, Frosted Cover | bar | 96 Zellen | 3CH, 5CH, 8CH, 24CH, 48CH, 53CH | nein | [Link](https://oppsk.com/products/224-led-rgb-led-pixel-light-bar) |
| OPPSK | LED Aluminum Par Light - 18x6W, RGBWA+UV 6n1 | par | 18 Zellen | 10CH | nein | [Link](https://oppsk.com/products/rgbwa-uv-led-aluminum-par-light) |
| OPPSK | LED Wash Light Bar - 96W, RGBA 4n1 | bar | 24 Zellen | 6CH, 9CH, 16CH, 30CH, 58CH | nein | [Link](https://oppsk.com/products/96w-rgba-led-wash-light-bar) |
| OPPSK | LED Beam Moving Head Light - Double Balls, 14x10W RGBW 4n1 | movinghead / orb | 14 Zellen | 9CH, 16CH | nein | [Link](https://oppsk.com/products/rgbw-led-beam-moving-head-light-double-balls) |
| OPPSK | LED Zoomable Par Light - 250W, RGBW 4n1 | par | 19 Zellen | 10CH, 18CH | nein | [Link](https://oppsk.com/products/250w-rgbw-led-zoomable-par-light) |
| OPPSK | LED Pixel Bar - 60W, RGB 3n1 | bar | 1 Zellen | 3CH, 5CH, 8CH, 36CH, 40CH | nein | [Link](https://oppsk.com/products/60w-rgb-led-pixel-bar) |
| OPPSK | Pixel Control DJ Light Bar - 100W, Warm White & RGB 3n1 LED | bar | 96 Zellen | 5CH, 12CH, 14CH, 75CH | nein | [Link](https://oppsk.com/products/pixel-control-dj-light-bar) |
| OPPSK | Battery-Powered Wireless Par Light - RGBW 4n1 - Uplighting | par | 3 Zellen | 8CH | nein | [Link](https://oppsk.com/products/battery-powered-wireless-par-light-rgbw-4n1-for-uplighting) |
| OPPSK | Outdoor RGBWAUV LED Par Light - 18x18W, 6n1 | par | 18 Zellen | 6CH, 10CH | nein | [Link](https://oppsk.com/products/outdoor-led-par-light-6in1-18x18w) |
| PR Lighting | AQUA Marine 580 BWS | movinghead / spot |  | 31CH, 35CH | nein | [Link](http://www.pr-lighting.com/product/index100.html) |
| PR Lighting | AQUA 580 BWS | movinghead / spot |  | 31CH, 35CH | nein | [Link](http://www.pr-lighting.com/product/index101.html) |
| PR Lighting | AQUA 580 Beam (PR-2569) | movinghead / beam |  | 26CH, 30CH | nein | [Link](http://www.pr-lighting.com/product/index102.html) |
| PR Lighting | AQUA 480 BWS | movinghead / spot |  | 31CH, 35CH | nein | [Link](http://www.pr-lighting.com/product/index105.html) |
| PR Lighting | AQUA 480 Beam | movinghead / beam |  | 26CH, 30CH | nein | [Link](http://www.pr-lighting.com/product/index106.html) |
| PR Lighting | XR 580 BWS | movinghead / spot |  | 31CH, 35CH | nein | [Link](http://www.pr-lighting.com/product/index115.html) |
| PR Lighting | XR 580 Beam | movinghead / beam |  | 26CH, 30CH | nein | [Link](http://www.pr-lighting.com/product/index116.html) |
| PR Lighting | GALAXY | effect |  | 30CH, 102CH | nein | [Link](http://www.pr-lighting.com/product/index117.html) |
| PR Lighting | XR 380 BWS (PR-2393) | movinghead / spot |  | 28CH, 33CH | nein | [Link](http://www.pr-lighting.com/product/index118.html) |
| PR Lighting | XR 380 Beam (PR-2345) | movinghead / beam |  | 19CH, 21CH | nein | [Link](http://www.pr-lighting.com/product/index119.html) |
| PR Lighting | XR 480 BWS | movinghead / spot |  | 28CH, 33CH | nein | [Link](http://www.pr-lighting.com/product/index123.html) |
| PR Lighting | AQUA 380 Beam | movinghead / beam |  | 20CH, 21CH | nein | [Link](http://www.pr-lighting.com/product/index133.html) |
| PR Lighting | AQUA 380 BWS | movinghead / spot |  | 27CH, 32CH | nein | [Link](http://www.pr-lighting.com/product/index134.html) |
| PR Lighting | PLANET | effect |  | 26CH, 30CH, 54CH | nein | [Link](http://www.pr-lighting.com/product/index138.html) |
| PR Lighting | XLED 3019 | movinghead / wash | 19 Zellen | 20CH | nein | [Link](http://www.pr-lighting.com/product/index141.html) |
| PR Lighting | XLED 1061 | movinghead / wash | 61 Zellen | 30CH | nein | [Link](http://www.pr-lighting.com/product/index143.html) |
| PR Lighting | XPAR 354 | par | 54 Zellen | 11CH | nein | [Link](http://www.pr-lighting.com/product/index146.html) |
| PR Lighting | LS PAR 1512-W | par | 12 Zellen | 2CH | nein | [Link](http://www.pr-lighting.com/product/index148.html) |
| PR Lighting | LS PAR 1512 | par | 12 Zellen | 11CH | nein | [Link](http://www.pr-lighting.com/product/index149.html) |
| PR Lighting | LS PAR 1524 | par | 24 Zellen | 10CH | nein | [Link](http://www.pr-lighting.com/product/index161.html) |
| PR Lighting | XPAR 1514 Zoom | par | 14 Zellen | 5CH | nein | [Link](http://www.pr-lighting.com/product/index162.html) |
| PR Lighting | AQUA LED 3000-W Framing | movinghead / profile |  | 38CH, 54CH | nein | [Link](http://www.pr-lighting.com/product/index270.html) |
| PR Lighting | XRLED 3000-W Framing (PR-8837) | movinghead / profile |  | 47CH, 52CH, 67CH | nein | [Link](http://www.pr-lighting.com/product/index279.html) |
| PR Lighting | XLED 1537 | movinghead / wash | 37 Zellen | 29CH, 41CH | nein | [Link](http://www.pr-lighting.com/product/index280.html) |
| PR Lighting | AQUA 580 Beam (PR-2569S) | movinghead / beam |  | 18CH, 20CH | nein | [Link](http://www.pr-lighting.com/product/index286.html) |
| PR Lighting | CUBIX 600 | effect |  | 19CH | nein | [Link](http://www.pr-lighting.com/product/index297.html) |
| PR Lighting | AQUA Laser 260 Beam (PR-8339) | movinghead / beam |  | 25CH, 28CH | nein | [Link](http://www.pr-lighting.com/product/index313.html) |
| PR Lighting | XR 230 Beam | movinghead / beam |  | 14CH, 16CH | nein | [Link](http://www.pr-lighting.com/product/index316.html) |
| PR Lighting | XR 450 BWS | movinghead / spot |  | 28CH, 33CH | nein | [Link](http://www.pr-lighting.com/product/index317.html) |
| PR Lighting | AQUA LED 770-W BWSF | movinghead / profile |  | 35CH, 50CH | nein | [Link](http://www.pr-lighting.com/product/index319.html) |
| PR Lighting | XR 300 Beam | movinghead / beam |  | 16CH | nein | [Link](http://www.pr-lighting.com/product/index320.html) |
| PR Lighting | XRLED 400 BWS | movinghead / spot |  | 22CH, 28CH | nein | [Link](http://www.pr-lighting.com/product/index326.html) |
| PR Lighting | XRLED 3500-W Framing | movinghead / profile |  | 47CH, 52CH, 67CH | nein | [Link](http://www.pr-lighting.com/product/index329.html) |
| PR Lighting | XRLED 700-W BWS | movinghead / spot |  | 30CH | nein | [Link](http://www.pr-lighting.com/product/index330.html) |
| PR Lighting | XRLED 3000-W Wash/Framing | movinghead / profile |  | 22CH, 25CH, 31CH | nein | [Link](http://www.pr-lighting.com/product/index332.html) |
| PR Lighting | TANGO 680 Spot DE | movinghead / spot |  | 17CH | nein | [Link](http://www.pr-lighting.com/product/index334.html) |
| PR Lighting | TANGO 750 Framing | movinghead / profile |  | 30CH | nein | [Link](http://www.pr-lighting.com/product/index337.html) |
| PR Lighting | AQUA Laser 260 BWS | movinghead / spot |  | 28CH, 31CH | nein | [Link](http://www.pr-lighting.com/product/index340.html) |
| PR Lighting | XRLED 3000-W Wash | movinghead / wash |  | 22CH, 25CH, 31CH | nein | [Link](http://www.pr-lighting.com/product/index343.html) |
| PR Lighting | XRLED 3500-W Wash/Framing | movinghead / profile |  | 31CH, 35CH, 49CH | nein | [Link](http://www.pr-lighting.com/product/index349.html) |
| PR Lighting | XLED 4012 | movinghead / wash | 12 Zellen | 18CH | nein | [Link](http://www.pr-lighting.com/product/index351.html) |
| PR Lighting | XLED 4019 | movinghead / wash | 19 Zellen | 31CH, 41CH | nein | [Link](http://www.pr-lighting.com/product/index355.html) |
| PR Lighting | XRLED 700-W BWSF | movinghead / profile |  | 40CH | nein | [Link](http://www.pr-lighting.com/product/index356.html) |
| PR Lighting | AQUA XLED 6019 | movinghead / wash | 19 Zellen | 7CH, 21CH, 26CH, 35CH, 43CH, 78CH Pixel, 92CH Pixel, 97CH Pixel | nein | [Link](http://www.pr-lighting.com/product/index362.html) |
| PR Lighting | AQUA Laser 500 BWS | movinghead / spot |  | 28CH, 31CH | nein | [Link](http://www.pr-lighting.com/product/index368.html) |
| PR Lighting | XRLED 1600-W BWSF | movinghead / profile |  | 40CH, 46CH, 59CH | nein | [Link](http://www.pr-lighting.com/product/index370.html) |
| PR Lighting | PR-6000 Spot(1400W) | movinghead / spot |  | 32CH, 39CH | nein | [Link](http://www.pr-lighting.com/product/index371.html) |
| PR Lighting | XR 380 BWS (PR-2392A) | movinghead / spot |  | 28CH | nein | [Link](http://www.pr-lighting.com/product/index372.html) |
| PR Lighting | XR 380 BWS (PR-2393A) | movinghead / spot |  | 23CH | nein | [Link](http://www.pr-lighting.com/product/index373.html) |
| PR Lighting | XR 380 Beam (PR-2345A) | movinghead / beam |  | 16CH | nein | [Link](http://www.pr-lighting.com/product/index374.html) |
| PR Lighting | AQUA Laser 120 BEAM | movinghead / beam |  | 17CH, 18CH | nein | [Link](http://www.pr-lighting.com/product/index377.html) |
| PR Lighting | AQUA Laser 500 Beam (PR-8369) | movinghead / beam |  | 25CH, 28CH | nein | [Link](http://www.pr-lighting.com/product/index378.html) |
| PR Lighting | AQUA LED 4000-W Framing | movinghead / profile |  | 40CH, 45CH, 59CH | nein | [Link](http://www.pr-lighting.com/product/index380.html) |
| PR Lighting | XRLED 1600-W BWS | movinghead / spot |  | 31CH, 36CH, 41CH | nein | [Link](http://www.pr-lighting.com/product/index382.html) |
| PR Lighting | AQUA LED 1600-W BWSF | movinghead / profile |  | 40CH, 46CH, 59CH | nein | [Link](http://www.pr-lighting.com/product/index383.html) |
| PR Lighting | AQUA LASER 260 BEAM (PR-8329) | movinghead / beam |  | 17CH, 18CH | nein | [Link](http://www.pr-lighting.com/product/index385.html) |
| PR Lighting | AQUA Laser 500 Beam (PR-8359) | movinghead / beam |  | 17CH, 18CH | nein | [Link](http://www.pr-lighting.com/product/index386.html) |
| PR Lighting | DRAGON 1600-W BWSF | movinghead / profile |  | 32CH, 38CH, 51CH | nein | [Link](http://www.pr-lighting.com/product/index388.html) |
| PR Lighting | XRLED 2600-W BWSF | movinghead / profile |  | 40CH, 46CH, 59CH | nein | [Link](http://www.pr-lighting.com/product/index389.html) |
| PR Lighting | DRAGON 700-W BWS | movinghead / spot |  | 20CH, 25CH, 29CH | nein | [Link](http://www.pr-lighting.com/product/index392.html) |
| PR Lighting | XRLED 4000-W Framing | movinghead / profile |  | 47CH, 52CH, 67CH | nein | [Link](http://www.pr-lighting.com/product/index393.html) |
| PR Lighting | AQUA LED 2600-W BWSF | movinghead / profile |  | 40CH, 46CH, 59CH | nein | [Link](http://www.pr-lighting.com/product/index396.html) |
| PR Lighting | TANGO LED 4000-W FRAMING | movinghead / profile |  | 35CH, 40CH, 54CH | nein | [Link](http://www.pr-lighting.com/product/index398.html) |
| PR Lighting | TANGO LED 2600-W BWSF | movinghead / profile |  | 35CH, 41CH, 54CH | nein | [Link](http://www.pr-lighting.com/product/index400.html) |
| PR Lighting | AQUA Laser 850 Beam | movinghead / beam |  | 23CH | nein | [Link](http://www.pr-lighting.com/product/index401.html) |
| PR Lighting | PR-6000 Framing(1400W) | movinghead / profile |  | 36CH | nein | [Link](http://www.pr-lighting.com/product/index96.html) |
| PR Lighting | PR-6000 Wash/Framing | movinghead / wash |  | 32CH, 45CH | nein | [Link](http://www.pr-lighting.com/product/index97.html) |
| PR Lighting | PR-6000 Wash | movinghead / wash |  | 23CH, 27CH | nein | [Link](http://www.pr-lighting.com/product/index98.html) |
| PR Lighting | AQUA Marine 580 Beam | movinghead / beam |  | 26CH, 30CH | nein | [Link](http://www.pr-lighting.com/product/index99.html) |
| Prolights | ArenaCob 4FC | strobe | 4 Zellen | 1CH, 4CH, 6CH, 15CH, 16CH Pixel, 21CH Pixel, 27CH Pixel, 28CH Pixel | nein | [Link](https://www.prolights.it/en/product/ARENACOB4FC) |
| Prolights | ArenaCob 4Halo | strobe | 16 Zellen | 1CH, 2CH, 4CH, 6CH, 7CH, 8CH, 10CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ARENACOB4HALO) |
| Prolights | Aria 700Spot | movinghead / spot |  | 23CH, 28CH, 29CH | nein | [Link](https://www.prolights.it/en/product/ARIA700SPOT) |
| Prolights | Astra Beam120IP | movinghead / beam |  | 32CH | nein | [Link](https://www.prolights.it/en/product/ASTRABEAM120IP) |
| Prolights | Astra Beam260IP | movinghead / beam |  | 17CH | nein | [Link](https://www.prolights.it/en/product/ASTRABEAM260IP) |
| Prolights | Astra Hybrid260IP | movinghead / spot |  | 33CH, 37CH | nein | [Link](https://www.prolights.it/en/product/ASTRAHYB260IP) |
| Prolights | Astra Hybrid330 | movinghead / spot |  | 29CH | nein | [Link](https://www.prolights.it/en/product/ASTRAHYB330) |
| Prolights | Astra Hybrid330IP | movinghead / spot |  | 29CH | nein | [Link](https://www.prolights.it/en/product/ASTRAHYB330IP) |
| Prolights | Astra Hybrid420 | movinghead / spot |  | 30CH | nein | [Link](https://www.prolights.it/en/product/ASTRAHYB420) |
| Prolights | Astra Hybrid420IP | movinghead / spot |  | 30CH | nein | [Link](https://www.prolights.it/en/product/ASTRAHYB420IP) |
| Prolights | Astra PAR7ZIP | par | 7 Zellen | 1CH, 2CH, 6CH, 12CH, 14CH, 21CH Pixel, 33CH Pixel | nein | [Link](https://www.prolights.it/en/product/ASTRAPAR7ZIPBK) |
| Prolights | Astra Profile1200IP | movinghead / profile |  | 45CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROF1200IP) |
| Prolights | Astra Profile300LTIP | movinghead / profile |  | 42CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROF300LTIP) |
| Prolights | Astra Profile500LTIP | movinghead / profile |  | 43CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROF500LTIP) |
| Prolights | Astra Profile600IP | movinghead / profile |  | 29CH, 39CH, 54CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROFILE600IP) |
| Prolights | Astra Profile900 | movinghead / profile |  | 46CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROFILE900) |
| Prolights | Astra Profile900HQ | movinghead / profile |  | 46CH | nein | [Link](https://www.prolights.it/en/product/ASTRAPROFILE900HQ) |
| Prolights | Astra Wash19Pix | movinghead / wash | 19 Zellen | 29CH, 32CH, 53CH | nein | [Link](https://www.prolights.it/en/product/ASTRAWASH19PIX) |
| Prolights | Astra Wash19PixIP | movinghead / wash | 19 Zellen | 29CH, 32CH, 53CH | nein | [Link](https://www.prolights.it/en/product/ASTRAWASH19PIXIP) |
| Prolights | Astra Wash37Pix | movinghead / wash | 37 Zellen | 23CH, 30CH, 44CH, 52CH | nein | [Link](https://www.prolights.it/en/product/ASTRAWASH37PIX) |
| Prolights | Astra Wash7Pix | movinghead / wash | 7 Zellen | 24CH, 27CH, 39CH Pixel | nein | [Link](https://www.prolights.it/en/product/ASTRAWASH7PIX) |
| Prolights | CROMOSPOT400 | movinghead / spot |  | 11CH, 14CH | nein | [Link](https://www.prolights.it/en/product/CROMOSPOT400) |
| Prolights | Diamond 7 | par | 7 Zellen | 18CH, 19CH, 20CH, 26CH Pixel, 50CH Pixel | nein | [Link](https://www.prolights.it/en/product/DIAMOND7BK) |
| Prolights | DigiStrip IP100 | bar | 100 Zellen | 300CH Pixel | nein | [Link](https://www.prolights.it/en/product/DIGISTRIPIP100) |
| Prolights | DigiStrip IP50 | bar | 50 Zellen | 150CH Pixel | nein | [Link](https://www.prolights.it/en/product/DIGISTRIPIP50) |
| Prolights | DisplayCob DY | par |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/DISPLAYCOBDY) |
| Prolights | DisplayCob FC | par |  | 3CH, 5CH, 8CH | nein | [Link](https://www.prolights.it/en/product/DISPLAYCOBFC) |
| Prolights | DisplayCob WW | par |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/DISPLAYCOBWW) |
| Prolights | Dot QPack | par |  | 5CH, 9CH | nein | [Link](https://www.prolights.it/en/product/DOTQPACKMR) |
| Prolights | EclProfile CT+HP | profile |  | 1CH, 30CH | nein | [Link](https://www.prolights.it/en/product/ECLCTPLUSHPBK) |
| Prolights | EclProfile CT+HPIP | profile |  | 1CH, 30CH | nein | [Link](https://www.prolights.it/en/product/ECLCTPLUSHPIPBK) |
| Prolights | EclProfile | profile |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLDY) |
| Prolights | EclProfile FC | profile |  | 1CH, 3CH, 4CH, 5CH, 8CH, 11CH, 17CH | nein | [Link](https://www.prolights.it/en/product/ECLFCWH) |
| Prolights | EclFresnel 2KPTW | fresnel |  | 1CH, 2CH, 5CH, 7CH, 8CH, 9CH, 12CH, 13CH, 16CH, 19CH, 21CH | nein | [Link](https://www.prolights.it/en/product/ECLFR2KPTW) |
| Prolights | EclFresnel 2K | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLFR2KTU) |
| Prolights | EclFresnel 2KVW | fresnel | 2 Zellen | 1CH, 2CH, 4CH, 5CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLFR2KVWBK) |
| Prolights | EclFresnel CT+L | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPLBK) |
| Prolights | EclFresnel CT+LIP | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPLIPBK) |
| Prolights | EclFresnel CT+M | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPMBK) |
| Prolights | EclFresnel CT+MIP | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPMIPBK) |
| Prolights | EclFresnel CT+S | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPSBK) |
| Prolights | EclFresnel CT+SIP | fresnel |  | 3CH, 98CH, 99CH, 130CH, 131CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPSIPBK) |
| Prolights | EclFresnel CT+XS | fresnel |  | 1CH, 34CH | nein | [Link](https://www.prolights.it/en/product/ECLFRCTPXSBK) |
| Prolights | EclFresnel Jr | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELJTU) |
| Prolights | EclFresnel JrTW | fresnel |  | 1CH, 2CH, 5CH, 7CH, 8CH, 9CH, 12CH, 13CH, 16CH, 19CH, 21CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELJTW) |
| Prolights | EclFresnel PTW | fresnel |  | 1CH, 2CH, 5CH, 7CH, 9CH, 12CH, 13CH, 16CH, 19CH, 21CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELPTW) |
| Prolights | EclFresnel | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELTU) |
| Prolights | EclFresnel TW | fresnel |  | 1CH, 2CH, 5CH, 7CH, 9CH, 12CH, 13CH, 16CH, 19CH, 21CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELTW) |
| Prolights | EclFresnel VW | fresnel | 2 Zellen | 1CH, 2CH, 4CH, 5CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLFRESNELVWPOBK) |
| Prolights | EclFresnel FWXSVW | fresnel | 2 Zellen | 1CH, 14CH | nein | [Link](https://www.prolights.it/en/product/ECLFRFWXSVWBK) |
| Prolights | EclFresnel JrP | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLFRJPDY) |
| Prolights | EclFresnel JrPTW | fresnel |  | 1CH, 2CH, 5CH, 7CH, 8CH, 9CH, 12CH, 13CH, 16CH, 19CH, 21CH | nein | [Link](https://www.prolights.it/en/product/ECLFRJPTW) |
| Prolights | EclProfile FWHPIPVW | panel | 2 Zellen | 1CH, 16CH | nein | [Link](https://www.prolights.it/en/product/ECLFWHPIPVWBK) |
| Prolights | EclProfile FWHPVW | panel | 2 Zellen | 1CH, 16CH | nein | [Link](https://www.prolights.it/en/product/ECLFWHPVWBK) |
| Prolights | EclProfile FWIP | panel |  | 2CH, 3CH, 4CH, 5CH | nein | [Link](https://www.prolights.it/en/product/ECLFWIPTUBK) |
| Prolights | EclProfile FWIPVW | panel | 2 Zellen | 2CH, 3CH, 4CH, 6CH, 12CH | nein | [Link](https://www.prolights.it/en/product/ECLFWIPVWBK) |
| Prolights | EclProfile FW | panel |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.prolights.it/en/product/ECLFWTUBK) |
| Prolights | EclProfile FWVW | panel | 2 Zellen | 1CH, 2CH, 3CH, 5CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLFWVWBK) |
| Prolights | EclProfile JrZIP | profile |  | 1CH, 3CH | nein | [Link](https://www.prolights.it/en/product/ECLJZIPDYBK) |
| Prolights | EclPar DotFC | par |  | 1CH, 2CH, 5CH, 6CH, 9CH, 12CH, 13CH | nein | [Link](https://www.prolights.it/en/product/ECLPARDOTFC) |
| Prolights | EclPar DotVW | par |  | 1CH, 2CH, 3CH, 4CH, 9CH | nein | [Link](https://www.prolights.it/en/product/ECLPARDOTVW) |
| Prolights | EclPar | par |  | 1CH, 2CH, 3CH, 6CH | nein | [Link](https://www.prolights.it/en/product/ECLPARDY) |
| Prolights | EclPar IPLFC | par |  | 1CH, 2CH, 5CH, 9CH, 10CH, 12CH, 18CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPLFCBK) |
| Prolights | EclPar IPLVW | par |  | 1CH, 2CH, 4CH, 5CH, 9CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPLVWBK) |
| Prolights | EclPar IPMUV | par |  | 1CH, 2CH, 3CH, 4CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPMUVBK) |
| Prolights | EclPar IPMVW | par |  | 1CH, 2CH, 4CH, 5CH, 9CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPMVWBK) |
| Prolights | EclPar IPSFC | par |  | 1CH, 2CH, 5CH, 9CH, 10CH, 12CH, 18CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPSFCBK) |
| Prolights | EclPar IPSVW | par |  | 1CH, 2CH, 4CH, 5CH, 9CH, 11CH | nein | [Link](https://www.prolights.it/en/product/ECLPARIPSVWBK) |
| Prolights | FlatCob 80UV | panel |  | 1CH, 5CH | nein | [Link](https://www.prolights.it/en/product/FLATCOB80UV) |
| Prolights | HaluPix Duo | strobe | 441 Zellen | 12CH | nein | [Link](https://www.prolights.it/en/product/HALUPIXDUO) |
| Prolights | HaluStrip Duo | bar | 1 Zellen | 12CH | nein | [Link](https://www.prolights.it/en/product/HALUSTRIPDUO) |
| Prolights | Jade | movinghead / spot |  | 14CH, 16CH, 22CH, 23CH | nein | [Link](https://www.prolights.it/en/product/JADE) |
| Prolights | Jet Beam120IP | movinghead / beam |  | 18CH | nein | [Link](https://www.prolights.it/en/product/JETBEAM120IP) |
| Prolights | Jet Beam1 | movinghead / beam |  | 8CH, 10CH | nein | [Link](https://www.prolights.it/en/product/JETBEAM1WH) |
| Prolights | Jet Hybrid200 | movinghead / spot |  | 20CH | nein | [Link](https://www.prolights.it/en/product/JETHYB200) |
| Prolights | Jet PAR7ZIP | par | 7 Zellen | 1CH, 2CH, 6CH, 12CH, 14CH, 20CH | nein | [Link](https://www.prolights.it/en/product/JETPAR7ZIPBK) |
| Prolights | Jet Profile300LT | movinghead / profile |  | 38CH, 42CH | nein | [Link](https://www.prolights.it/en/product/JETPROFILE300LT) |
| Prolights | Jet Spot120 | movinghead / spot |  | 20CH | nein | [Link](https://www.prolights.it/en/product/JETSPOT120) |
| Prolights | Jet Spot2 | movinghead / spot |  | 12CH, 15CH | nein | [Link](https://www.prolights.it/en/product/JETSPOT2WH) |
| Prolights | Jet Spot3 | movinghead / spot |  | 17CH, 19CH | nein | [Link](https://www.prolights.it/en/product/JETSPOT3WH) |
| Prolights | Jet Spot4Z | movinghead / spot |  | 23CH, 25CH, 27CH | nein | [Link](https://www.prolights.it/en/product/JETSPOT4Z) |
| Prolights | Jet Wash7 | movinghead / wash | 7 Zellen | 23CH Pixel | nein | [Link](https://www.prolights.it/en/product/JETWASH7) |
| Prolights | Luma 1500SH | follow |  | 28CH, 30CH, 37CH, 38CH | nein | [Link](https://www.prolights.it/en/product/LUMA1500SH) |
| Prolights | Luma 1500SP | follow |  | 21CH, 23CH, 30CH, 31CH | nein | [Link](https://www.prolights.it/en/product/LUMA1500SP) |
| Prolights | LumiPar 12HPro | par | 12 Zellen | 3CH, 6CH, 8CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR12HPRO) |
| Prolights | LumiPar 12IP | par | 12 Zellen | 4CH, 6CH, 11CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR12IP20D) |
| Prolights | LumiPar 12UAW | par | 12 Zellen | 3CH, 7CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR12UAW3) |
| Prolights | LUMIPAR12UQPRO | par | 12 Zellen | 4CH, 9CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR12UQPRO5) |
| Prolights | Lumipar 7HPro | par | 7 Zellen | 3CH, 6CH, 8CH, 12CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR7HPRO) |
| Prolights | LumiPar 7IP | par | 7 Zellen | 4CH, 6CH, 11CH | nein | [Link](https://www.prolights.it/en/product/LUMIPAR7IP20D) |
| Prolights | LumiPix 12QTour | bar | 12 Zellen | 5CH, 7CH, 9CH, 49CH Pixel | nein | [Link](https://www.prolights.it/en/product/LUMIPIX12QTOUR) |
| Prolights | LumiPix 12UQ | bar | 12 Zellen | 4CH, 7CH, 9CH, 12CH, 17CH | nein | [Link](https://www.prolights.it/en/product/LUMIPIX12UQ) |
| Prolights | LumiPix 12UQPRO | bar | 12 Zellen | 4CH, 7CH, 9CH, 12CH, 17CH | nein | [Link](https://www.prolights.it/en/product/LUMIPIX12UQPRO) |
| Prolights | LumiPix 12UT | bar | 12 Zellen | 3CH, 4CH, 6CH, 7CH, 8CH, 9CH, 12CH, 18CH, 36CH Pixel, 41CH Pixel | nein | [Link](https://www.prolights.it/en/product/LUMIPIX12UT) |
| Prolights | Lumipix 15IP | bar | 15 Zellen | 4CH, 6CH, 10CH, 60CH Pixel, 65CH Pixel | nein | [Link](https://www.prolights.it/en/product/LUMIPIX15IP) |
| Prolights | LumiPix 16H | bar | 16 Zellen | 6CH, 8CH, 12CH, 96CH Pixel, 101CH Pixel | nein | [Link](https://www.prolights.it/en/product/LUMIPIX16H) |
| Prolights | LumiPix 8H | bar | 8 Zellen | 3CH, 6CH, 8CH, 12CH, 48CH Pixel, 53CH Pixel | nein | [Link](https://www.prolights.it/en/product/LUMIPIX8H) |
| Prolights | EclMiniFresnel | fresnel |  | 1CH, 2CH, 3CH, 5CH | nein | [Link](https://www.prolights.it/en/product/MINIECLFRDY) |
| Prolights | EclMiniFresnel FC | fresnel |  | 1CH, 2CH, 3CH, 4CH, 5CH, 6CH, 7CH, 9CH, 12CH, 14CH, 17CH | nein | [Link](https://www.prolights.it/en/product/MINIECLFRFC) |
| Prolights | EclMiniFresnel VW | fresnel | 2 Zellen | 1CH, 2CH, 4CH, 5CH, 11CH | nein | [Link](https://www.prolights.it/en/product/MINIECLFRVWWH) |
| Prolights | Mini VersaPar | par | 7 Zellen | 5CH, 10CH | nein | [Link](https://www.prolights.it/en/product/MINIVERSAPAR) |
| Prolights | Muse Fresnel70CT+ | fresnel |  | 35CH, 40CH, 41CH, 46CH | nein | [Link](https://www.prolights.it/en/product/MUSEF70CTP) |
| Prolights | Muse Profile70CT+ | profile |  | 43CH, 48CH, 49CH, 53CH | nein | [Link](https://www.prolights.it/en/product/MUSEP70CTP) |
| Prolights | PanoramaIP AirBeam | movinghead / beam |  | 19CH, 22CH, 28CH | nein | [Link](https://www.prolights.it/en/product/PANORAMAIPAB) |
| Prolights | PanoramaIP Spot | movinghead / spot |  | 19CH, 21CH, 28CH, 29CH, 36CH | nein | [Link](https://www.prolights.it/en/product/PANORAMAIPSPOT) |
| Prolights | PanoramaIP WBX | movinghead / wash | 19 Zellen | 18CH, 42CH, 44CH, 120CH | nein | [Link](https://www.prolights.it/en/product/PANORAMAIPWBX) |
| Prolights | Pixie Beam | movinghead / beam |  | 14CH, 16CH, 18CH | nein | [Link](https://www.prolights.it/en/product/PIXIEBEAM) |
| Prolights | Pixie WashXB | movinghead / wash |  | 13CH, 15CH, 16CH, 18CH, 22CH, 23CH, 27CH | nein | [Link](https://www.prolights.it/en/product/PIXIEWASHXB) |
| Prolights | Pixie ZoomXB | par |  | 5CH, 7CH, 11CH | nein | [Link](https://www.prolights.it/en/product/PIXIEZOOMXB) |
| Prolights | Poet F6 | fresnel |  | 1CH, 24CH | nein | [Link](https://www.prolights.it/en/product/POETF6BK) |
| Prolights | Poet F6X | fresnel |  | 2CH, 25CH | nein | [Link](https://www.prolights.it/en/product/POETF6XBK) |
| Prolights | Poet F8 | fresnel |  | 1CH, 24CH | nein | [Link](https://www.prolights.it/en/product/POETF8BK) |
| Prolights | Poet F8X | fresnel |  | 2CH, 25CH | nein | [Link](https://www.prolights.it/en/product/POETF8XBK) |
| Prolights | Ra 3000Profile | movinghead / profile |  | 38CH, 39CH, 40CH, 41CH | nein | [Link](https://www.prolights.it/en/product/RA3000PROFILE) |
| Prolights | Razor 440 | movinghead / beam |  | 21CH, 24CH, 26CH | nein | [Link](https://www.prolights.it/en/product/RAZOR440) |
| Prolights | Ruby | movinghead / beam |  | 11CH, 13CH, 14CH, 17CH | nein | [Link](https://www.prolights.it/en/product/RUBYBK) |
| Prolights | Ruby FCX | movinghead / beam |  | 18CH, 20CH, 22CH, 23CH | nein | [Link](https://www.prolights.it/en/product/RUBYFCX) |
| Prolights | Smart BatIP | bar | 4 Zellen | 4CH, 6CH, 10CH | nein | [Link](https://www.prolights.it/en/product/SMARTBATIP) |
| Prolights | Smart ParNeo | par | 7 Zellen | 1CH, 3CH, 4CH, 5CH, 6CH, 10CH, 11CH, 17CH | nein | [Link](https://www.prolights.it/en/product/SMARTPARNEO) |
| Prolights | Solar 27Q | blinder | 27 Zellen | 5CH, 7CH, 10CH, 13CH, 17CH | nein | [Link](https://www.prolights.it/en/product/SOLAR27Q) |
| Prolights | Solar 48Q | blinder | 48 Zellen | 5CH, 7CH, 10CH, 17CH, 22CH | nein | [Link](https://www.prolights.it/en/product/SOLAR48Q) |
| Prolights | Stark 1000 | movinghead / wash | 19 Zellen | 16CH, 26CH, 27CH, 36CH, 98CH | nein | [Link](https://www.prolights.it/en/product/STARK1000) |
| Prolights | Stark Blade8 | tiltbar | 8 Zellen | 17CH, 27CH Pixel, 55CH Pixel | nein | [Link](https://www.prolights.it/en/product/STARKBLADE8) |
| Prolights | StudioCob CW | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBCWBK) |
| Prolights | StudioCob DY | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBDYBK) |
| Prolights | StudioCob PlusDY2 | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBPDY2BK) |
| Prolights | StudioCob PlusDY | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBPLUSDYWH) |
| Prolights | StudioCob PlusNW | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBPLUSNW) |
| Prolights | StudioCob TU | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBTUCR) |
| Prolights | StudioCob WW | panel |  | 1CH, 2CH, 5CH | nein | [Link](https://www.prolights.it/en/product/STUDIOCOBWWBK) |
| Prolights | SunBar 2000FC | strobe | 24 Zellen | 4CH, 87CH Pixel | nein | [Link](https://www.prolights.it/en/product/SUNBAR2000FC) |
| Prolights | SunBar 2500Max | strobe | 24 Zellen | 1CH, 71CH | nein | [Link](https://www.prolights.it/en/product/SUNBAR2500MAX) |
| Prolights | SunBar FLX | strobe |  | 8CH, 13CH, 21CH, 32CH, 36CH, 42CH, 47CH, 60CH | nein | [Link](https://www.prolights.it/en/product/SUNBARFLX) |
| Prolights | Sunblast FLX | strobe | 24 Zellen | 8CH, 13CH, 21CH, 32CH, 36CH, 42CH, 47CH, 60CH | nein | [Link](https://www.prolights.it/en/product/SUNBLASTFLX) |
| Prolights | SunRise 2FLXFC | blinder | 2 Zellen | 1CH, 35CH | nein | [Link](https://www.prolights.it/en/product/SUNRISE2FLXFC) |
| Prolights | SunRise 2FLXVW | blinder | 2 Zellen | 1CH, 18CH Pixel | nein | [Link](https://www.prolights.it/en/product/SUNRISE2FLXVW) |
| Prolights | SunRise 2IP | blinder | 2 Zellen | 1CH, 2CH Pixel, 6CH Pixel, 12CH Pixel | nein | [Link](https://www.prolights.it/en/product/SUNRISE2IP) |
| Prolights | SunRise 4FLXFC | blinder | 4 Zellen | 1CH, 56CH | nein | [Link](https://www.prolights.it/en/product/SUNRISE4FLXFC) |
| Prolights | SunRise 4FLXVW | blinder | 4 Zellen | 1CH, 18CH Pixel | nein | [Link](https://www.prolights.it/en/product/SUNRISE4FLXVW) |
| Robe | GigaPointe | movinghead / spot |  | 39CH, 41CH | nein | [Link](https://www.robe.cz/gigapointe) |
| Robe | iPointe 65 | movinghead / spot |  | 34CH, 39CH | nein | [Link](https://www.robe.cz/ipointe65) |
| Robe | iPointe 55 | movinghead / spot |  | 34CH, 39CH | nein | [Link](https://www.robe.cz/ipointe55) |
| Robe | miniPointe | movinghead / beam |  | 17CH, 22CH, 27CH | nein | [Link](https://www.robe.cz/minipointe) |
| Robe | LedPOINTE | movinghead / spot |  | 39CH | nein | [Link](https://www.robe.cz/ledpointe) |
| Robe | BMFL WashBeam EV | movinghead / spot |  | 40CH, 48CH | nein | [Link](https://www.robe.cz/bmfl-washbeam-ev) |
| Robe | BMFL Wash / Wash XF | movinghead / wash |  | 21CH, 25CH | nein | [Link](https://www.robe.cz/bmfl-wash-wash-xf) |
| Robe | BMFL FollowSpot | follow |  | 27CH, 33CH | nein | [Link](https://www.robe.cz/bmfl-followspot) |
| Robe | BMFL FollowSpot LT | follow |  | 27CH, 33CH | nein | [Link](https://www.robe.cz/bmfl-followspot-lt) |
| Robe | FORTE FS | follow |  | 54CH | nein | [Link](https://www.robe.cz/forte-fs) |
| Robe | FORTE Fresnel | fresnel |  | 35CH | nein | [Link](https://www.robe.cz/forte-fresnel) |
| Robe | FORTE PC | fresnel |  | 35CH | nein | [Link](https://www.robe.cz/forte-pc) |
| Robe | iFORTE FS | follow |  | 54CH, 56CH | nein | [Link](https://www.robe.cz/iforte-fs) |
| Robe | iFORTE Fresnel | fresnel |  | 35CH | nein | [Link](https://www.robe.cz/iforte-fresnel) |
| Robe | iFORTE LTX WB | movinghead / spot |  | 54CH | nein | [Link](https://www.robe.cz/iforte-ltx-wb) |
| Robe | iFORTE LTX FS | follow |  | 54CH | nein | [Link](https://www.robe.cz/iforte-ltx-fs) |
| Robe | ESPRITE FS | follow |  | 42CH, 43CH, 49CH, 50CH | nein | [Link](https://www.robe.cz/esprite-fs) |
| Robe | ESPRITE Fresnel | fresnel |  | 30CH, 31CH, 34CH, 35CH | nein | [Link](https://www.robe.cz/esprite-fresnel) |
| Robe | ESPRITE PC | fresnel |  | 30CH, 31CH, 34CH, 35CH | nein | [Link](https://www.robe.cz/esprite-pc) |
| Robe | iESPRITE | movinghead / profile |  | 42CH, 43CH, 49CH, 50CH | nein | [Link](https://www.robe.cz/iesprite) |
| Robe | iESPRITE Fresnel | fresnel |  | 30CH, 31CH, 34CH, 35CH | nein | [Link](https://www.robe.cz/iesprite-fresnel) |
| Robe | iESPRITE LTL WB | movinghead / spot |  | 53CH | nein | [Link](https://www.robe.cz/iesprite-ltl-wb) |
| Robe | iESPRITE LTL FS | follow |  | 53CH | nein | [Link](https://www.robe.cz/iesprite-ltl-fs) |
| Robe | PAINTE | movinghead / profile |  | 44CH, 45CH | nein | [Link](https://www.robe.cz/painte) |
| Robe | PAINTE Spot | movinghead / spot |  | 35CH, 36CH | nein | [Link](https://www.robe.cz/painte-spot) |
| Robe | PAINTE Fresnel | fresnel |  | 33CH | nein | [Link](https://www.robe.cz/painte-fresnel) |
| Robe | iPAINTE LTM WB | movinghead / spot |  | 51CH | nein | [Link](https://www.robe.cz/ipainte-ltm-wb) |
| Robe | T1 Profile FS | follow |  | 33CH, 49CH, 53CH | nein | [Link](https://www.robe.cz/t1-profile-fs) |
| Robe | T1 Fresnel | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t1-fresnel) |
| Robe | T1 PC | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t1-pc) |
| Robe | T2 Profile FS | follow |  | 36CH, 52CH, 56CH | nein | [Link](https://www.robe.cz/t2-profile-fs) |
| Robe | T2 Fresnel | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t2-fresnel) |
| Robe | T2 PC | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t2-pc) |
| Robe | T3 Profile | movinghead / profile |  | 36CH, 52CH, 56CH, 57CH | nein | [Link](https://www.robe.cz/t3-profile) |
| Robe | T3 Profile FS | follow |  | 36CH, 52CH, 56CH, 57CH | nein | [Link](https://www.robe.cz/t3-profile-fs) |
| Robe | T3 Fresnel | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t3-fresnel) |
| Robe | T3 PC | fresnel |  | 24CH, 35CH, 39CH | nein | [Link](https://www.robe.cz/t3-pc) |
| Robe | TX1 PosiProfile | movinghead / profile |  | 27CH, 33CH, 40CH, 44CH, 48CH, 52CH | nein | [Link](https://www.robe.cz/tx1-posiprofile) |
| Robe | iT10 Profile | profile |  | 1CH, 5CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/it10-profile) |
| Robe | iT12 Profile | profile |  | 24CH, 28CH, 32CH, 35CH, 36CH, 39CH, 43CH, 47CH | nein | [Link](https://www.robe.cz/it12-profile) |
| Robe | iT12 Fresnel | fresnel |  | 24CH, 28CH, 32CH, 35CH, 36CH, 39CH, 43CH, 47CH | nein | [Link](https://www.robe.cz/it12-fresnel) |
| Robe | iT12 PC | fresnel |  | 24CH, 28CH, 32CH, 35CH, 36CH, 39CH, 43CH, 47CH | nein | [Link](https://www.robe.cz/it12-pc) |
| Robe | T10 Profile | profile |  | 1CH, 5CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t10-profile) |
| Robe | T10 Fresnel | fresnel |  | 1CH, 5CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t10-fresnel) |
| Robe | T10 PC | fresnel |  | 1CH, 5CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t10-pc) |
| Robe | T11 Profile | profile |  | 1CH, 6CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t11-profile) |
| Robe | T11 Fresnel | fresnel |  | 1CH, 6CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t11-fresnel) |
| Robe | T11 PC | fresnel |  | 1CH, 6CH, 9CH, 13CH, 18CH, 22CH, 24CH, 28CH | nein | [Link](https://www.robe.cz/t11-pc) |
| Robe | T14 Fresnel | fresnel |  | 1CH, 2CH, 7CH, 10CH, 20CH, 24CH | nein | [Link](https://www.robe.cz/t14-fresnel) |
| Robe | T15 Fresnel | fresnel |  | 1CH, 2CH, 7CH, 10CH, 20CH, 24CH | nein | [Link](https://www.robe.cz/t15-fresnel) |
| Robe | T15 PC | fresnel |  | 1CH, 2CH, 7CH, 10CH, 20CH, 24CH | nein | [Link](https://www.robe.cz/t15-pc) |
| Robe | T31 Cyc | panel |  | 38CH, 42CH | nein | [Link](https://www.robe.cz/t31-cyc) |
| Robe | T31 Cyc Slim | panel |  | 31CH, 35CH | nein | [Link](https://www.robe.cz/t31-cyc-slim) |
| Robe | T32 Cyc | panel |  | 31CH, 35CH | nein | [Link](https://www.robe.cz/t32-cyc) |
| Robe | T32 Cyc Slim | panel |  | 31CH, 35CH | nein | [Link](https://www.robe.cz/t32-cyc-slim) |
| Robe | iSpiider | movinghead / wash |  | 27CH, 33CH, 47CH, 49CH, 90CH, 91CH, 104CH, 110CH, 123CH | nein | [Link](https://www.robe.cz/ispiider) |
| Robe | iSpiiderX | movinghead / wash |  | 27CH, 33CH, 47CH, 49CH, 90CH, 91CH, 104CH, 110CH, 123CH | nein | [Link](https://www.robe.cz/ispiiderx) |
| Robe | Arianne 2 | movinghead / wash | 31 Zellen | 16CH, 22CH Pixel, 24CH Pixel | nein | [Link](https://www.robe.cz/arianne-2) |
| Robe | Arianne 4 | movinghead / wash | 36 Zellen | 16CH, 22CH, 24CH | nein | [Link](https://www.robe.cz/arianne-4) |
| Robe | Arianne 6 | movinghead / wash | 43 Zellen | 22CH, 27CH, 58CH Pixel | nein | [Link](https://www.robe.cz/arianne-6) |
| Robe | Arianne 12 | movinghead / wash | 61 Zellen | 22CH, 27CH, 66CH | nein | [Link](https://www.robe.cz/arianne-12) |
| Robe | LEDBeam 150 FW | movinghead / wash | 7 Zellen | 16CH, 22CH Pixel | nein | [Link](https://www.robe.cz/ledbeam-150-fw) |
| Robe | LEDBeam 150 FWQ | movinghead / wash | 7 Zellen | 16CH, 22CH Pixel | nein | [Link](https://www.robe.cz/ledbeam-150-fwq) |
| Robe | LEDBeam 200 | movinghead / wash | 7 Zellen | 22CH, 25CH, 32CH Pixel | nein | [Link](https://www.robe.cz/ledbeam-200) |
| Robe | LEDBeam 350 FW | movinghead / wash | 12 Zellen | 16CH, 22CH, 24CH | nein | [Link](https://www.robe.cz/ledbeam-350-fw) |
| Robe | LEDBeam 400 | movinghead / wash | 12 Zellen | 22CH, 27CH, 50CH Pixel | nein | [Link](https://www.robe.cz/ledbeam-400) |
| Robe | iBeam 350 | movinghead / wash | 12 Zellen | 16CH, 22CH, 24CH | nein | [Link](https://www.robe.cz/ibeam-350) |
| Robe | iBeam 250 | movinghead / wash | 7 Zellen | 16CH, 22CH Pixel | nein | [Link](https://www.robe.cz/ibeam-250) |
| Robe | iTetra2 | tiltbar | 18 Zellen | 34CH, 56CH Pixel, 97CH Pixel, 110CH Pixel, 115CH Pixel, 128CH Pixel | nein | [Link](https://www.robe.cz/itetra2) |
| Robe | TetraX | tiltbar | 9 Zellen | 41CH Pixel, 61CH Pixel, 75CH Pixel, 84CH Pixel, 88CH Pixel, 97CH Pixel | nein | [Link](https://www.robe.cz/tetrax) |
| Robe | SilverScan | scanner |  | 26CH, 32CH | nein | [Link](https://www.robe.cz/silverscan) |
| Robe | Spikie+ | movinghead / spot |  | 21CH, 27CH | nein | [Link](https://www.robe.cz/spikie-plus) |
| Robe | SuperSpikie | movinghead / spot |  | 31CH | nein | [Link](https://www.robe.cz/superspikie) |
| Robe | SPOTE | movinghead / spot |  | 25CH | nein | [Link](https://www.robe.cz/spote) |
| Robe | ROBIN Viva | movinghead / spot |  | 23CH, 30CH | nein | [Link](https://www.robe.cz/viva) |
| Robe | DL4S Profile | movinghead / profile |  | 36CH, 38CH, 48CH | nein | [Link](https://www.robe.cz/dl4s-profile) |
| Robe | DL4X Spot | movinghead / spot |  | 23CH, 25CH, 35CH | nein | [Link](https://www.robe.cz/dl4x-spot) |
| Robe | DL4F Wash | movinghead / wash |  | 21CH, 23CH, 29CH | nein | [Link](https://www.robe.cz/dl4f-wash) |
| Robe | DL7S Profile | movinghead / profile |  | 42CH, 46CH, 51CH, 59CH | nein | [Link](https://www.robe.cz/dl7s-profile) |
| Robe | DL7F Wash | movinghead / wash |  | 29CH, 33CH, 34CH, 42CH | nein | [Link](https://www.robe.cz/dl7f-wash) |
| Robe | ROBIN DLS Profile | movinghead / profile |  | 36CH, 38CH, 47CH | nein | [Link](https://www.robe.cz/robin-dls-profile) |
| Robe | ROBIN DLF Wash | movinghead / wash |  | 21CH, 23CH, 29CH | nein | [Link](https://www.robe.cz/robin-dlf-wash) |
| Robe | ROBIN MMX Spot | movinghead / spot |  | 29CH, 31CH, 38CH, 40CH | nein | [Link](https://www.robe.cz/mmx-spot) |
| Robe | ROBIN MMX Blade | movinghead / profile |  | 37CH, 39CH, 45CH | nein | [Link](https://www.robe.cz/mmx-blade) |
| Robe | ROBIN MMX WashBeam | movinghead / spot |  | 26CH, 29CH, 34CH | nein | [Link](https://www.robe.cz/mmx-washbeam) |
| Robe | ROBIN LEDWash 300 | movinghead / wash | 19 Zellen | 10CH, 15CH, 21CH, 37CH | nein | [Link](https://www.robe.cz/ledwash-300) |
| Robe | ROBIN LEDWash 300+ | movinghead / wash | 19 Zellen | 10CH, 15CH, 21CH, 37CH | nein | [Link](https://www.robe.cz/ledwash-300plus) |
| Robe | ROBIN LEDWash 300X | movinghead / wash | 19 Zellen | 10CH, 15CH, 21CH, 37CH | nein | [Link](https://www.robe.cz/ledwash-300x) |
| Robe | ROBIN LEDWash 600X | movinghead / wash | 37 Zellen | 10CH, 15CH, 21CH, 24CH | nein | [Link](https://www.robe.cz/ledwash-600x) |
| Robe | ROBIN LEDWash 800X | movinghead / wash | 37 Zellen | 11CH, 16CH, 22CH, 38CH | nein | [Link](https://www.robe.cz/ledwash-800x) |
| Robe | ROBIN LEDWash 1200 | movinghead / wash | 61 Zellen | 10CH, 15CH, 21CH, 37CH, 45CH | nein | [Link](https://www.robe.cz/ledwash-1200) |
| Robe | ROBIN PureWhite 600 SW | movinghead / wash | 37 Zellen | 10CH, 12CH, 16CH, 24CH | nein | [Link](https://www.robe.cz/purewhite-600-sw) |
| Robe | ROBIN PureWhite 600 DL | movinghead / wash | 37 Zellen | 10CH, 12CH, 13CH, 18CH | nein | [Link](https://www.robe.cz/purewhite-600-dl) |
| Robe | ROBIN PureWhite 600 WW | movinghead / wash | 37 Zellen | 10CH, 12CH, 13CH, 18CH | nein | [Link](https://www.robe.cz/purewhite-600-ww) |
| Robe | ROBIN LEDBeam 1000 | movinghead / wash | 37 Zellen | 10CH, 15CH, 21CH | nein | [Link](https://www.robe.cz/ledbeam-1000) |
| Robe | ColorWash 2500E AT | movinghead / wash |  | 5CH, 17CH, 21CH, 23CH, 24CH, 30CH | nein | [Link](https://www.robe.cz/colorwash-2500e-at) |
| Robe | ColorSpot 1200E AT | movinghead / spot |  | 24CH, 32CH | nein | [Link](https://www.robe.cz/colorspot-1200e-at) |
| Robe | ColorWash 700E AT | movinghead / wash |  | 6CH, 18CH, 20CH, 21CH, 22CH, 23CH, 24CH | nein | [Link](https://www.robe.cz/colorwash-700e-at) |
| Robe | ColorWash 750 AT Tungsten | movinghead / wash |  | 5CH, 18CH, 20CH, 21CH, 23CH | nein | [Link](https://www.robe.cz/colorwash-750-at-tungsten) |
| Robe | ColorSpot 575E AT | movinghead / spot |  | 19CH, 21CH, 27CH, 29CH | nein | [Link](https://www.robe.cz/colorspot-575e-at) |
| Robe | ColorWash 575E AT | movinghead / wash |  | 18CH, 20CH, 22CH, 24CH | nein | [Link](https://www.robe.cz/colorwash-575e-at) |
| Robe | ColorWash 575E AT Zoom | movinghead / wash |  | 16CH, 18CH, 19CH, 21CH | nein | [Link](https://www.robe.cz/colorwash-575e-at-zoom) |
| Robe | ColorStrobe | strobe | 96 Zellen | 9CH, 14CH, 18CH, 28CH, 84CH | nein | [Link](https://www.robe.cz/colorstrobe) |
| Robe | ColorStrobe IP | strobe | 60 Zellen | 9CH, 14CH, 18CH, 21CH, 42CH | nein | [Link](https://www.robe.cz/colorstrobe-ip) |
| Robe | Strobe / Strobe Lite | strobe |  | 3CH, 4CH, 8CH, 20CH | nein | [Link](https://www.robe.cz/strobe-strobe-lite) |
| Robe | Strobe IP | strobe |  | 3CH, 4CH, 8CH, 14CH | nein | [Link](https://www.robe.cz/strobe-ip) |
| Robe | UV Strobe | strobe | 40 Zellen | 3CH, 4CH, 8CH, 20CH | nein | [Link](https://www.robe.cz/uv-strobe) |
| Robe | CycFX 4 | tiltbar | 4 Zellen | 14CH, 21CH Pixel, 33CH Pixel, 37CH Pixel | nein | [Link](https://www.robe.cz/cycfx-4) |
| Robe | CycFX 8 | tiltbar | 8 Zellen | 14CH, 21CH, 22CH, 45CH Pixel, 53CH Pixel, 61CH Pixel | nein | [Link](https://www.robe.cz/cycfx-8) |
| Robe | CycBar 15 | bar | 15 Zellen | 11CH, 16CH, 45CH, 47CH, 61CH Pixel, 76CH Pixel | nein | [Link](https://www.robe.cz/cycbar-15) |
| Robe | iBar 15 | bar | 15 Zellen | 11CH, 16CH, 61CH Pixel, 76CH Pixel | nein | [Link](https://www.robe.cz/ibar-15) |
| Robe | CycPix 12 | panel |  | 12CH, 18CH, 54CH, 66CH | nein | [Link](https://www.robe.cz/cycpix-12) |
| Robe | Divine 160 RGBW | panel |  | 4CH, 5CH, 10CH, 22CH | nein | [Link](https://www.robe.cz/divine-160-rgbw) |
| Robe | ParFect 150 RGBA | par | 7 Zellen | 11CH, 17CH | nein | [Link](https://www.robe.cz/parfect-150-rgba) |
| Robe | ParFect 150 FWQ RGBW | par | 7 Zellen | 11CH, 17CH | nein | [Link](https://www.robe.cz/parfect-150-fwq-rgbw) |
| Robe | iParFect 150 FWQ RGBW | par | 7 Zellen | 11CH, 17CH | nein | [Link](https://www.robe.cz/iparfect-150-fwq-rgbw) |
| Robe | iParFect 150 FWQ RGBA | par | 7 Zellen | 11CH, 17CH | nein | [Link](https://www.robe.cz/iparfect-150-fwq-rgba) |
| Robe | ParFect 100 | par | 12 Zellen | 4CH, 9CH, 14CH, 30CH, 35CH | nein | [Link](https://www.robe.cz/parfect-100) |
| Robe | PATT 2017 | retro | 7 Zellen | 13CH, 32CH Pixel, 40CH Pixel, 47CH Pixel, 53CH Pixel, 60CH Pixel | nein | [Link](https://www.robe.cz/patt-2017) |
| Robe | pixelPATT | retro | 7 Zellen | 13CH, 32CH Pixel, 40CH Pixel, 47CH Pixel, 53CH Pixel, 60CH Pixel | nein | [Link](https://www.robe.cz/pixelpatt) |
| Robe | onePATT | retro | 1 Zellen | 13CH, 32CH, 40CH, 47CH, 53CH, 60CH | nein | [Link](https://www.robe.cz/onepatt) |
| Robe | SVOPATT | strobe | 7 Zellen | 21CH Pixel, 124CH Pixel, 286CH Pixel, 384CH Pixel | nein | [Link](https://www.robe.cz/svopatt) |
| Robe | SVOPATT Classic | strobe | 6 Zellen | 1CH, 5CH, 19CH Pixel, 83CH Pixel | nein | [Link](https://www.robe.cz/svopatt-classic) |
| Robe | mySVOPATT | movinghead / matrix | 7 Zellen | 6CH, 30CH Pixel, 130CH Pixel, 291CH Pixel, 389CH Pixel | nein | [Link](https://www.robe.cz/mysvopatt) |
| Robe | LEDForce 18 RGBW | par |  | 7CH | nein | [Link](https://www.robe.cz/ledforce-18-rgbw) |
| Robe | Dominator 1200 XT | scanner |  | 12CH | nein | [Link](https://www.robe.cz/dominator-1200-xt) |
| SGM | Q-7 W | strobe |  | 1CH, 4CH, 6CH, 8CH | nein | [Link](https://www.sgmlighting.com/products/q%C2%B77-w) |
| SGM | Q-2 W | strobe |  | 1CH, 3CH, 6CH, 12CH, 14CH, 24CH | nein | [Link](https://www.sgmlighting.com/products/q%C2%B72-w) |
| SGM | Q-10 | strobe |  | 6CH, 8CH, 10CH, 27CH, 30CH | nein | [Link](https://www.sgmlighting.com/products/q%C2%B710) |
| SGM | P-1 | panel |  | 3CH, 4CH, 6CH, 9CH, 11CH, 16CH | nein | [Link](https://www.sgmlighting.com/products/p%C2%B71) |
| SGM | P-2 | panel |  | 3CH, 6CH, 9CH, 12CH, 15CH, 22CH | nein | [Link](https://www.sgmlighting.com/products/p%C2%B72) |
| SGM | P-5 W | panel |  | 1CH, 2CH | nein | [Link](https://www.sgmlighting.com/products/p%C2%B75-w) |
| SGM | P-5 TW | panel |  | 2CH, 4CH, 6CH, 8CH | nein | [Link](https://www.sgmlighting.com/products/p%C2%B75-tw) |
| SGM | P-10 | panel |  | 4CH, 6CH, 8CH, 9CH, 10CH, 21CH, 27CH, 30CH, 32CH, 35CH, 52CH | nein | [Link](https://www.sgmlighting.com/products/p%C2%B710) |
| SGM | i-2 RGBW | bar | 1 Zellen | 3CH, 4CH, 6CH, 8CH | nein | [Link](https://www.sgmlighting.com/products/i%C2%B72-rgbw) |
| SGM | i-5 RGBW | bar | 1 Zellen | 3CH, 4CH, 6CH, 8CH, 9CH, 10CH | nein | [Link](https://www.sgmlighting.com/products/i%C2%B75-rgbw) |
| SGM | i-6 | bar | 1 Zellen | 3CH, 4CH, 6CH, 8CH, 10CH, 22CH | nein | [Link](https://www.sgmlighting.com/products/i%C2%B76) |
| SGM | S-4 | fresnel |  | 13CH | nein | [Link](https://www.sgmlighting.com/products/s%C2%B74) |
| SGM | X-5 | strobe |  | 1CH, 3CH, 4CH, 6CH, 7CH | nein | [Link](https://www.sgmlighting.com/products/x%C2%B75) |
| SGM | XC-5 | strobe |  | 1CH, 3CH, 4CH, 6CH, 7CH | nein | [Link](https://www.sgmlighting.com/products/xc%C2%B75) |
| SGM | P-3 Wash | panel |  | 3CH, 31CH | nein | [Link](https://www.sgmlighting.com/products/p-3-wash) |
| SGM | P-3 Vision | panel |  | 7CH, 128CH | nein | [Link](https://www.sgmlighting.com/products/p-3-vision) |
| SGM | SixPack | tiltbar | 6 Zellen | 6CH, 7CH, 18CH, 22CH, 24CH Pixel, 28CH Pixel, 48CH Pixel, 53CH Pixel | nein | [Link](https://www.sgmlighting.com/products/sixpack) |
| SGM | Touring VPL 305-20 | bar | 1 Zellen | 1CH, 3CH, 6CH, 12CH, 24CH, 48CH, 96CH | nein | [Link](https://www.sgmlighting.com/products/touring-vpl-305-20) |
| SGM | Touring VPL 610-20 | bar | 1 Zellen | 3CH, 6CH, 12CH, 24CH, 48CH, 96CH, 192CH | nein | [Link](https://www.sgmlighting.com/products/touring-vpl-610-20) |
| SGM | Touring VPL 1220-20 | bar | 1 Zellen | 3CH, 6CH, 12CH, 24CH, 48CH, 96CH, 192CH, 384CH | nein | [Link](https://www.sgmlighting.com/products/touring-vpl-1220-20) |
| SGM | G-7 Spot | movinghead / spot |  | 22CH, 29CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B77-spot) |
| SGM | G-7 Beast | movinghead / beam |  | 18CH, 22CH, 29CH, 35CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B77-beast) |
| SGM | G-Spot | movinghead / spot |  | 24CH, 30CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B7spot) |
| SGM | G-Profile Turbo | movinghead / profile |  | 31CH, 32CH, 46CH, 47CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B7profile-turbo) |
| SGM | G-Wash | movinghead / wash |  | 16CH, 19CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B7wash) |
| SGM | G-4 Wash | movinghead / wash |  | 18CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B74-wash) |
| SGM | G-4 Wash Beam | movinghead / wash |  | 18CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B74-wash-beam) |
| SGM | G-1 Wash | movinghead / wash |  | 13CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B71-wash) |
| SGM | G-1 Beam | movinghead / beam |  | 12CH | nein | [Link](https://www.sgmlighting.com/products/g%C2%B71-beam) |
| Shehds | 16X3W LED Football Beam & Laser & Strobe 3in1 Moving head light | derby / orb | 16 Zellen | 18CH | nein | [Link](https://shehds.com/products/flash-sale-shehds-16x3w-led-football-beam-laser-strobe-3in1-moving-head-light-with-red-green-laser) |
| Shehds | JMS WEBB 6x15W Laser & RGBW Beam Moving Head Light | movinghead / matrix | 6 Zellen | 13CH | nein | [Link](https://shehds.com/products/big-sale-jms-webb-6x15w-laser-rgbw-beam-moving-head-light) |
| Shehds | JMS WEBB LED Bee Eye 4x40W RGBW 4in1 Zoom & Beam & Wash Moving Head | movinghead / beeeye | 4 Zellen | 16CH Pixel | nein | [Link](https://shehds.com/products/jms-webb-mirror-rotation-led-zoom-beam-wash-bee-eye-4x40w-rgbw-4in1-light-for-stage-performance-dj-club) |
| Shehds | Waterproof LED Par Light 7x12W RGBW / 7x18 RGBWA+UV | par | 7 Zellen | 3CH, 4CH, 5CH, 6CH, 8CH, 9CH, 11CH | nein | [Link](https://shehds.com/products/shehds-led-waterproof-led-par-7x12w-rgbwlighting-lighting-for-stage-effect) |
| Shehds | Mini LED RGBW Beam 8x6W Spider Light Moving Head Laser | spider | 8 Zellen | 7CH, 15CH | nein | [Link](https://shehds.com/products/free-shipping-rgbw-mini-led-spider-beam-light-led-8x6w-bar-beam-moving-head-beam-led-spider-light-rgbw-good-for-dj-disco-party) |
| Shehds | LED Bee Eye Beam & Wash 6x15W RGBW 4in1 Moving Head Light | movinghead / beeeye | 6 Zellen | 10CH, 14CH, 15CH | nein | [Link](https://shehds.com/products/high-quality-fast-shipping-led-beamwash-6x12w-rgbw-4in1-bees-eyes-led-moving-head-light-with-excellent-pragrams-11-14-channels) |
| Shehds | 4x25W RGBW Beam Moving Head Light | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://shehds.com/products/led-super-beam-4x25w-rgbw-moving-head-stage-lighting) |
| Shehds | 4x10W RGBW LED Spot & Beam Moving Head Light | movinghead / spot |  | 9CH, 28CH | nein | [Link](https://shehds.com/products/led-spot-4x10w-rgbw-beam-moving-head-lighting) |
| Shehds | 380W 3in1 Beam & GOBO & Wash Moving Head Light | movinghead / spot |  | 19CH | nein | [Link](https://shehds.com/products/bulb-380w-beamampspotampwash-3in1-moving-head-lighting-professional-stage-dj-light) |
| Shehds | Mini LED Beam Spider 9x10W RGBW Moving Head Light | spider | 9 Zellen | 16CH, 48CH Pixel | nein | [Link](https://shehds.com/products/new-arrival-mini-led-9x10w-led-spider-light-rgbw-16-48ch-dmx-stage-lights-dj-led-spider-moving-head-beam-lights) |
| Shehds | 4 Eyes LED Blinder 4x100W COB Light With 2 Channels | blinder | 4 Zellen | 2CH | nein | [Link](https://shehds.com/products/led-blinder-light-4x100w-led-cob-light-with-2-channels-4-eyes-blinder-stage-effect-lighting-for-events-show-fast-free-shipping) |
| Shehds | COB Blinder 2Eyes LED 2x100W RGBWA+UV 6in1 Par Light | blinder | 2 Zellen | 4CH, 8CH Pixel | nein | [Link](https://shehds.com/products/fashional-2eyes-2x100w-led-blinder-200w-cob-par-rgbw-4in1-and-rgbwauv-6in1-dmx-stage-lighting-effect-audience-lighting-dj-equipment-disco) |
| Shehds | Mini LED Spot Beam 10W Moving Head Light | movinghead / spot |  | 7CH, 15CH | nein | [Link](https://shehds.com/products/mini-led-spot-beam-10w-lighting) |
| Shehds | LED 7x12W / 7x18W Wash Moving Head Light | movinghead / wash | 7 Zellen | 15CH | nein | [Link](https://shehds.com/products/fast-shipping-led-moving-head-wash-7x12w-rgbw-lighting-quad-with-advanced-dmx-10-15-channels-dmx512-good-for-dj-night-club-show) |
| Showtec | ACT Fresnel 150 | fresnel |  | 5CH, 8CH, 12CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-act-fresnel-150-rgbal-compact-150w-theatre-led-fresnel) |
| Showtec | ACT Fresnel 50 | fresnel |  | 5CH, 8CH, 12CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-act-fresnel-50-rgbal-compact-50-w-rgbal-theatre-led-fresnel) |
| Showtec | Cameleon Spot 12Q6 Tour | par |  | 6CH, 8CH, 13CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-cameleon-spot-12q6-tour-12x-12-w-rgbwa-uv-led-spot-power-pro-true) |
| Showtec | Cameleon Spot 18Q6 Tour | par |  | 6CH, 8CH, 13CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-cameleon-spot-18q6-tour-18x-12-w-rgbwa-uv-led-spot-power-pro-true) |
| Showtec | Cameleon Spot 7Q6 Tour | par |  | 6CH, 8CH, 13CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-cameleon-spot-7q6-tour-7x-12-w-rgbwa-uv-led-spot-power-pro-true) |
| Showtec | Demon | effect |  | 3CH, 9CH, 12CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-demon-led-barrel-scan-effect-140w) |
| Showtec | Dreammoon LED | effect |  | 5CH, 9CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-dreammoon) |
| Showtec | Dreamwave | effect |  | 10CH, 34CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-dreamwave) |
| Showtec | Edison Vintage V1 DMX | retro | 1 Zellen | 1CH, 2CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-edison-vintage-v1-dmx-light-bundle-of-2-inc-dimmable-filament-lamps) |
| Showtec | FireBall PRO Dual Ball | derby / orb | 24 Zellen | 7CH, 10CH, 14CH, 22CH, 28CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-fireball-pro-dual-ball-rgbw-effect-light) |
| Showtec | Firestorm | effect |  | 2CH, 18CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-firestorm-led-light-effect-4-in-1-wash-led-strobe) |
| Showtec | Galactic Txt TEXT | effect |  | 17CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-galactic-txt-text-laser-with-dmx) |
| Showtec | Goliath Retro | retro | 1 Zellen | 4CH, 5CH, 14CH, 20CH, 21CH, 300CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-goliath-retro-led-light-effect-320w-vintage-blaze) |
| Showtec | Hurricane 320 | arms | 6 Zellen | 4CH, 17CH, 32CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-hurricane-320-rgbw-moonflower-effect-with-spinning-arms) |
| Showtec | Hydrogen LED | effect |  | 4CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-hydrogen-dmx-mkii-led-effect-light) |
| Showtec | Kanjo 60 | effect |  | 8CH, 10CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-kanjo-scan-60) |
| Showtec | LED Par 64 Short Q4-18 | par |  | 4CH, 5CH, 8CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-led-par-64-q4-18-black) |
| Showtec | PAR 56 COB | cob |  | 3CH, 6CH, 7CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-par-56-cob-rgb-90-w-rgb-cob-led-par) |
| Showtec | Performer Profile Zoom 150 Q6, 150w | profile |  | 3CH, 7CH, 8CH, 10CH, 13CH, 20CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-performer-profile-zoom-150-q6-150w-rgbacl-theatre-led) |
| Showtec | Phantom 120LSR Beam | movinghead / beam |  | 14CH, 20CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-phantom-120lsr-beam-120w-laser-moving-head-outdoor-ip65) |
| Showtec | Phantom 180 WashFX | movinghead / wash |  | 26CH, 34CH, 95CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-phantom-180-washfx-180w-rgbl-led-wash-moving-head-pixel-effect-ip65-outdoor) |
| Showtec | Phantom 280 Hybrid | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-phantom-280-hybrid-280w-led-ip65-moving-head) |
| Showtec | Phantom 350 Spot 350w | movinghead / spot |  | 22CH, 26CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-phantom-350-spot-350w-led-spot-moving-head-ip65) |
| Showtec | Razor Blaze 12 | effect | 12 Zellen | 4CH, 9CH, 12CH, 48CH, 300CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-razor-blaze-12) |
| Showtec | Shark Beam One Compact | movinghead / beam |  | 8CH, 15CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-shark-beam-one-compact-90w-led-beam-moving-head) |
| Showtec | Shark Combi Spot One | movinghead / spot |  | 7CH, 8CH, 11CH, 19CH, 25CH, 30CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-shark-combi-spot-one) |
| Showtec | Shark Spot Two | movinghead / spot |  | 8CH, 15CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-shark-spot-two-90w-led-spot-moving-head) |
| Showtec | Shark Wash Zoom Two | movinghead / wash |  | 8CH, 15CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-shark-wash-zoom-two-7-x-30w-rgbw) |
| Showtec | Shark Zoom Wash One | movinghead / wash | 7 Zellen | 6CH, 8CH, 15CH, 36CH Pixel | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-shark-wash-zoom-one) |
| Showtec | Sonus Bar 8B | bar | 24 Zellen | 4CH, 6CH, 10CH, 32CH, 34CH, 38CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-sonus-bar-8b-battery-rgbw-1m-led-light-bar) |
| Showtec | Spectra Strobe | strobe |  | 3CH, 9CH, 21CH, 35CH, 49CH, 91CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-spectra-strobe-rgb-led-bar-ip65-outdoor-led-batten) |
| Showtec | Swing 4 | derby | 2 Zellen | 6CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-swing-4-led-multi-effect) |
| Showtec | Titan Strobe 100 FX | strobe |  | 4CH, 8CH, 11CH, 52CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-titan-strobe-100-fx-100w-led-12-x-rgbw-2w) |
| Showtec | Titan Strobe 1000 FX | strobe |  | 4CH, 7CH, 10CH, 12CH, 20CH, 73CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-titan-strobe-1000-fx-1000w-rgb-led-strobe-panel) |
| Showtec | Titan Strobe 200 FX | strobe |  | 4CH, 8CH, 11CH, 52CH, 100CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-titan-strobe-200-fx-led-strobe-pod-with-rgbw-led-ring-effect) |
| Showtec | Xpression | movinghead / wash |  | 13CH, 21CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-xpression-2000w-led-wash-moving-head-7-x-40w) |
| Showtec | Xpression 2000B | movinghead / beam |  | 14CH, 18CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-xpression-2000b-led-beam-moving-head-150w) |
| Showtec | Xpression 2000S | movinghead / spot |  | 14CH, 18CH | nein | [Link](https://www.simplysoundandlighting.co.uk/products/showtec-xpression-2000s-led-spot-moving-head-200w) |
| Stairville | BSW-100 LED BeamSpotWash | movinghead / spot |  | 17CH, 20CH | nein | [Link](https://www.thomann.de/de/stairville_bsw_100_led_beamspotwash.htm) |
| Stairville | Quad Par Profile 5x8W RGB WW | par | 5 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.thomann.de/de/stairville_quad_par_profile_5x8w_rgb_ww.htm) |
| Stairville | Quad Par Profile 5x8W RGB WW 45° | par | 5 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.thomann.de/de/stairville_quad_par_profile_5x8w_rgb_ww_414497.htm) |
| Stairville | Quad Par Profile 5x8W RGBW 25° | par | 5 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.thomann.de/de/stairville_quad_par_profile_5x8w_rgbw.htm) |
| Stairville | Quad Par Profile 5x8W RGBW 45° | par | 5 Zellen | 4CH, 6CH, 8CH | nein | [Link](https://www.thomann.de/de/stairville_quad_par_profile_5x8w_rgbw_40.htm) |
| Tomshine | 30W Mini Spider RGBW | spider | 1 Zellen | 10CH, 14CH | nein | [Link](https://us.amazon.com/Tomshine-Rotatable-Lighting-Channels-Wedding/dp/B073S72B9Z) |
| Tomshine | 60W 6in1 Moving Head RGBWA+UV (4×12W) | movinghead / wash | 4 Zellen | 16CH Pixel, 18CH Pixel | nein | [Link](https://www.amazon.com/Tomshine-Channels-Lighting-Activated-Spotlight/dp/B071ZH8P8C) |
| Tomshine | 70W RGBW Mini Beam Moving Head (1 COB, 60W) | movinghead / beam |  | 10CH, 13CH | nein | [Link](https://alltdu.com/index.php?route=product/product&product_id=521) |
| Topled | CT-001P-0.5M | bar | 7 Zellen | 4CH, 6CH, 8CH, 38CH Pixel | nein | [Link](https://www.topledlighting.com/product/ct-001p-0-5m/) |
| Topled | CT-001P-1M | bar | 14 Zellen | 4CH, 6CH, 8CH, 56CH Pixel | nein | [Link](https://www.topledlighting.com/product/ct-001p-1m/) |
| Topled | CT-002P | bar | 14 Zellen | 4CH, 6CH, 8CH, 56CH Pixel | nein | [Link](https://www.topledlighting.com/product/ct-002p/) |
| Topled | CT-020P-6C | bar | 1 Zellen | 6CH, 8CH, 12CH | nein | [Link](https://www.topledlighting.com/product/ct-020p-6c/) |
| Topled | DC-100P | par |  | 4CH, 6CH, 10CH | nein | [Link](https://www.topledlighting.com/product/dc-100p/) |
| Topled | FX-005P | panel |  | 4CH, 6CH, 10CH | nein | [Link](https://www.topledlighting.com/product/fx-005p/) |
| Topled | FX-200P | blinder |  | 5CH, 7CH, 10CH, 13CH, 17CH | nein | [Link](https://www.topledlighting.com/product/fx-200p/) |
| Topled | FX-300P | blinder |  | 5CH, 7CH, 10CH, 13CH, 17CH | nein | [Link](https://www.topledlighting.com/product/fx-300p/) |
| Topled | FX-400P | panel |  | 4CH, 6CH, 9CH, 20CH, 25CH | nein | [Link](https://www.topledlighting.com/product/fx-400p/) |
| Topled | IXQ17C | bar | 1 Zellen | 4CH, 6CH, 7CH, 16CH | nein | [Link](https://www.topledlighting.com/product/ixq17c/) |
| Topled | IXQ17D | bar | 1 Zellen | 4CH, 6CH, 7CH, 16CH | nein | [Link](https://www.topledlighting.com/product/ixq17d/) |
| Topled | IXQ18A | bar | 1 Zellen | 4CH, 6CH, 7CH, 16CH | nein | [Link](https://www.topledlighting.com/product/ixq18a/) |
| Topled | IXQ18B | bar | 1 Zellen | 4CH, 6CH, 7CH, 16CH | nein | [Link](https://www.topledlighting.com/product/ixq18b/) |
| Topled | MYLED-064 | bar | 8 Zellen | 2CH, 3CH, 5CH, 6CH, 12CH, 24CH Pixel | nein | [Link](https://www.topledlighting.com/product/myled-064/) |
| Topled | MYLED-101 | bar | 1 Zellen | 3CH, 6CH, 24CH | nein | [Link](https://www.topledlighting.com/product/myled-101/) |
| Topled | MYLED-131 | par |  | 7CH, 11CH, 18CH, 28CH, 32CH, 39CH | nein | [Link](https://www.topledlighting.com/product/myled-131/) |
| Topled | MYLED-150 | panel |  | 4CH, 6CH, 8CH | nein | [Link](https://www.topledlighting.com/product/myled-150-2/) |
| Topled | MYLED-150T | panel |  | 8CH, 10CH, 12CH | nein | [Link](https://www.topledlighting.com/product/myled-150t/) |
| Topled | Q12 BT IP | bar | 12 Zellen | 4CH, 6CH, 10CH, 16CH, 32CH | nein | [Link](https://www.topledlighting.com/product/q12-bt-ip/) |
| Topled | Q12 BT | bar | 12 Zellen | 4CH, 6CH, 11CH, 16CH, 23CH | nein | [Link](https://www.topledlighting.com/product/q12-bt/) |
| Topled | Q24 BT IP | bar | 2 Zellen | 4CH, 6CH, 9CH Pixel, 32CH Pixel, 37CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24-bt-ip/) |
| Topled | Q24 BT | bar | 2 Zellen | 4CH, 6CH, 9CH Pixel, 32CH Pixel, 37CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24-bt/) |
| Topled | Q24 DC | bar | 2 Zellen | 4CH, 6CH, 9CH Pixel, 32CH Pixel, 37CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24-dc/) |
| Topled | Q24 IP | bar | 2 Zellen | 4CH, 6CH, 9CH Pixel, 32CH Pixel, 37CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24-ip/) |
| Topled | Q24 | bar | 2 Zellen | 4CH, 5CH, 6CH, 12CH Pixel, 40CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24/) |
| Topled | Q24II | bar | 2 Zellen | 4CH, 6CH, 10CH Pixel, 32CH Pixel, 38CH Pixel | nein | [Link](https://www.topledlighting.com/product/q24ii/) |
| Topled | TG-041 | panel |  | 3CH | nein | [Link](https://www.topledlighting.com/product/tg-041/) |
| Topled | TG-046 | par |  | 4CH, 6CH, 7CH | nein | [Link](https://www.topledlighting.com/product/tg-046/) |
| Topled | TG-110 | par |  | 4CH, 6CH, 7CH | nein | [Link](https://www.topledlighting.com/product/tg-110/) |
| Topled | TPL-028TE | bar | 24 Zellen | 2CH, 4CH, 6CH, 8CH | nein | [Link](https://www.topledlighting.com/product/tpl-028te/) |
| Topled | TPL-083C | par |  | 8CH | nein | [Link](https://www.topledlighting.com/product/tpl-083c/) |
| Topled | TPL-128 | bar | 1 Zellen | 4CH, 6CH, 9CH | nein | [Link](https://www.topledlighting.com/product/tpl-128/) |
| Topled | XY-012A | movinghead / wash |  | 10CH, 20CH | nein | [Link](https://www.topledlighting.com/product/xy-012a/) |
| Topled | XY-037 | movinghead / wash |  | 9CH, 12CH, 29CH | nein | [Link](https://www.topledlighting.com/product/xy-037/) |
| Topled | XY-101BEAM | movinghead / beam |  | 13CH, 16CH | nein | [Link](https://www.topledlighting.com/product/xy-101beam/) |
| UKing | ZQ02373 Dual-Head Moving Head 2×100W Beam | spider | 2 Zellen | 33CH | nein | [Link](https://www.uking-online.com/products/uking-zq02373-moving-head-light) |
| UKing | ZQ02254 Moving Head 36 LED (Focusing) | movinghead / wash | 36 Zellen | 16CH | nein | [Link](https://www.uking-online.com/product/36pcs-focusing-light-moving-head-light-stage-lighting-effect-dmx-control-for-dj-disco-nightclub-ktv-bar-theater-shopping-mall/) |
| UKing | ZQ-B147 80W LED Spot Moving Head | movinghead / spot |  | 9CH, 11CH | nein |  |
| UKing | ZQ-B54A 30W Mini Gobo Moving Head | movinghead / spot |  | 7CH, 10CH | nein |  |
| UKing | ZQ-B54 30W Gobo Moving Head (Marken Ktaxon / Lampwin) | movinghead / spot |  | 7CH, 10CH | nein | [Link](https://www.ktaxon.com/ktaxon-zq-b54-30w-led-stage-lighting-8-rotary-pattern-effect-light-dmx-512-self-propelled-sound-control-mode-party-bar-club-light-p5373.html) |
| Vari-Lite | SL Nitro 510C | strobe | 96 Zellen | 6CH | nein | [Link](https://www.vari-lite.com/global/products/sl-nitro-510c) |
| VSHOW | B1060 | tiltbar | 10 Zellen | 17CH, 27CH, 99CH, 108CH, 168CH, 170CH | nein | [Link](https://vshowlighting.com/product/b1060_outdoor_10pcs_60w/) |
| VSHOW | B1060S | tiltbar | 10 Zellen | 17CH, 27CH, 99CH, 108CH, 168CH, 170CH | nein | [Link](https://vshowlighting.com/product/b1060s_10pcs_60w_rgbw_4in1/) |
| VSHOW | S128 | strobe |  | 4CH, 17CH, 145CH | nein | [Link](https://vshowlighting.com/product/indoor_strobe_light_s128_864pcs/) |
| VSHOW | IP1820 | bar | 18 Zellen | 6CH, 17CH, 108CH | nein | [Link](https://vshowlighting.com/product/ip1820_18pcs_20w_rgbwa/) |
| VSHOW | IP760 | movinghead / wash | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://vshowlighting.com/product/ip65_outdoor_led_zoom/) |
| VSHOW | Kinetic light lifting ball combination | derby / orb | 1 Zellen | 7CH, 15CH, 17CH, 20CH, 22CH, 40CH, 42CH, 80CH, 83CH, 85CH, 128CH, 132CH | nein | [Link](https://vshowlighting.com/product/kinetic_light_lifting_ball_combination/) |
| VSHOW | L8 | blinder | 1 Zellen | 25CH, 34CH, 59CH | nein | [Link](https://vshowlighting.com/product/l8_luna_6pcs_100w_rgbww/) |
| VSHOW | L9 | bar | 10 Zellen | 14CH, 55CH Pixel | nein | [Link](https://vshowlighting.com/product/l9_10150w-_wall_washer/) |
| VSHOW | L3 | blinder | 64 Zellen | 17CH | nein | [Link](https://vshowlighting.com/product/outdoor_l3_1782w_rgbalc/) |
| VSHOW | Q7 | strobe | 49 Zellen | 1CH, 5CH, 7CH, 10CH, 12CH, 13CH, 16CH, 252CH | nein | [Link](https://vshowlighting.com/product/q7_magic_dot_ip65_4910w/) |
| VSHOW | T917 | movinghead / beam |  | 17CH | nein | [Link](https://vshowlighting.com/product/t917_lang_professional_300w/) |
| VSHOW | TB5 | multibar | 5 Zellen | 41CH, 71CH | nein | [Link](https://vshowlighting.com/product/tb5_5pcs_120w_rgbl_led/) |
| VSHOW | V7 | retro | 6 Zellen | 5CH, 13CH, 79CH, 151CH | nein | [Link](https://vshowlighting.com/product/v7_retroline_660w_led/) |
| VSHOW | V8 | strobe |  | 20CH, 120CH | nein | [Link](https://vshowlighting.com/product/v8_flasher_strobe_effect_light/) |
| VSHOW | V9 | strobe | 96 Zellen | 12CH, 27CH, 44CH, 100CH, 138CH, 166CH, 269CH, 297CH Pixel | nein | [Link](https://vshowlighting.com/product/v9_ip66_outdoor_strobe_light/) |
| VSHOW | T911 | movinghead / beam |  | 18CH | nein | [Link](https://vshowlighting.com/product/vshow-beam-moving-head-light-t911-300w-with-fog-colorful-effect-wheel/) |
| VSHOW | T913 | movinghead / beam |  | 16CH, 21CH | nein | [Link](https://vshowlighting.com/product/vshow-beam-moving-head-light-t913-420w-ushio-nsl420s/) |
| VSHOW | G420E-Wash | par | 4 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://vshowlighting.com/product/vshow-g420e-wash-4x20w-hybrid-battery-uplighter-spot-ip65-with-rgbwauv-led-source/) |
| VSHOW | G45 | movinghead / beam |  | 24CH | nein | [Link](https://vshowlighting.com/product/vshow-g45-optic-420w-ip66-waterproof-beam-moving-head-light/) |
| VSHOW | G63 | movinghead / spot |  | 20CH, 28CH | nein | [Link](https://vshowlighting.com/product/vshow-g63-prime-450w-ip66-waterproof-beam-spot/) |
| VSHOW | T912 | movinghead / spot |  | 31CH | nein | [Link](https://vshowlighting.com/product/vshow-hybrid-moving-head-light-t912-380w-philips-msd-lamp/) |
| VSHOW | IP1940 | movinghead / wash | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel, 99CH Pixel | nein | [Link](https://vshowlighting.com/product/vshow-ip1940-ip65-wash-moving-wash-rgbw-led-beam-wash-big-eye-moving-head-dmx-stage-lights-stage-lighting-for-outdoor-event/) |
| VSHOW | L10 | bar | 14 Zellen | 5CH, 8CH, 18CH, 57CH Pixel, 74CH Pixel, 99CH Pixel, 116CH Pixel | nein | [Link](https://vshowlighting.com/product/vshow-l10-gamut-1425w-rgbwylp-7in1-wall-washer-outdoor-equipment-for-concert-dj-party/) |
| VSHOW | L0603 | laser |  | 12CH | nein | [Link](https://vshowlighting.com/product/vshow-laser-stage-lights-l0603-6w-rgb-animation-laser-20kpps-30kpps-scanner/) |
| VSHOW | T360 | tube | 1 Zellen | 7CH, 36CH, 48CH | nein | [Link](https://vshowlighting.com/product/vshow-led-battery-outdoor-tube-light-t360-965050-rgb-3in1-wireless-control/) |
| VSHOW | T918 | movinghead / beam |  | 21CH | nein | [Link](https://vshowlighting.com/product/vshow-led-beam-moving-head-light-t918-80w-with-pa6-nylon-casing/) |
| VSHOW | GT640 | strobe | 6 Zellen | 17CH, 23CH, 38CH Pixel | nein | [Link](https://vshowlighting.com/product/vshow-led-beam-wash-light-gt640-640w-rgbw-4in1-led-puzzle-matrix/) |
| VSHOW | S712 | movinghead / spot |  | 29CH | nein | [Link](https://vshowlighting.com/product/vshow-led-hybrid-moving-head-s712-450w-3in1-led-light-with-cmy-cto/) |
| VSHOW | S718 | movinghead / spot |  | 17CH | nein | [Link](https://vshowlighting.com/product/vshow-led-moving-head-light-s718-150w-with-folding-clamp/) |
| VSHOW | PZ1806 | par |  | 7CH, 12CH | nein | [Link](https://vshowlighting.com/product/vshow-led-par-light-pz1806-1818w-rgbwauv-6-in-1-indoor-zoom-led-par-7-12-channel/) |
| VSHOW | FWBR1206 | par |  | 6CH, 10CH | nein | [Link](https://vshowlighting.com/product/vshow-led-par-lights-fwbr1206-1218w-6in1-ip65-battery-powered-wireless-ir-dmx-led-par/) |
| VSHOW | PL4003 | tube | 1 Zellen | 7CH, 16CH, 48CH, 82CH | nein | [Link](https://vshowlighting.com/product/vshow-led-pixel-tube-pl4003-400-5w-smd5050-rgb-7-16-48-82-480ch-artnet/) |
| VSHOW | BL200 | blinder |  | 2CH, 6CH | nein | [Link](https://vshowlighting.com/product/vshow-led-studio-light-bl200-2100w-cw-ww-led-blinder-light-2-ra90-6ch/) |
| VSHOW | PSP300P | profile |  | 2CH | nein | [Link](https://vshowlighting.com/product/vshow-led-studio-lights-psp300p-300w-profile-spotlight-pro-version-2/) |
| VSHOW | R740L | movinghead / wash | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://vshowlighting.com/product/vshow-led-zoom-moving-wash-light-r740l-740w-rgbw-4in1/) |
| VSHOW | LM10 mini 10w full color animation weddi | laser |  | 19CH, 32CH | nein | [Link](https://vshowlighting.com/product/vshow-lm10-mini-10w-full-color-animation-wedding-laser-show-beam-disco-stage-dj-laser-lights/) |
| VSHOW | S711 | movinghead / profile |  | 25CH, 29CH, 34CH | nein | [Link](https://vshowlighting.com/product/vshow-moving-head-led-light-s711-powerful-600w-led-module-engine-profile/) |
| VSHOW | LB06 | laser |  | 14CH, 35CH, 42CH | nein | [Link](https://vshowlighting.com/product/vshow-moving-laser-bar-lb06-3w-12w-rgb-beam-6-eyes-heads/) |
| VSHOW | P300F | profile |  | 2CH | nein | [Link](https://vshowlighting.com/product/vshow-outdoor-spotlights-p300f-300w-ra95-edison-led-source-profile/) |
| VSHOW | PZ0740 | par | 7 Zellen | 5CH, 9CH | nein | [Link](https://vshowlighting.com/product/vshow-outdoor-zoom-par-light-pz0740-7x40w-rgbw-4-in-1-led-par-light-5-9-ch/) |
| VSHOW | P31 MAX | par |  | 3CH, 4CH | nein | [Link](https://vshowlighting.com/product/vshow-p31-max-ip66-waterproof-600w/) |
| VSHOW | P1806S | par |  | 6CH, 10CH | nein | [Link](https://vshowlighting.com/product/vshow-par-led-lights-p1806s-1818w-rgbwa-uv-6-in1-6-10-ch-25-lens-angle/) |
| VSHOW | Q8 | panel | 28 Zellen | 3CH, 4CH, 6CH, 12CH, 16CH, 24CH, 32CH | nein | [Link](https://vshowlighting.com/product/vshow-q8-queen-washer-led-panel-2820w-rgbwauv-for-dynamic-lightshows/) |
| VSHOW | S600 | movinghead / profile |  | 22CH, 30CH, 31CH, 39CH, 40CH | nein | [Link](https://vshowlighting.com/product/vshow-s600-1000w-led-waterproof-moving-head-cutting-light-beam-spot-wash-4in1-professional-stage-moving-head-led-with-cmyctocri-plate/) |
| VSHOW | S710 | movinghead / profile |  | 27CH, 29CH, 36CH | nein | [Link](https://vshowlighting.com/product/vshow-s710-800w-image-profile-bswf-4-in-1-moving-head-stage-lighting/) |
| VSHOW | S716 | movinghead / spot |  | 20CH | nein | [Link](https://vshowlighting.com/product/vshow-spot-moving-head-light-s716-200w-3in1-led-beam-wash-light/) |
| VSHOW | L1003 | laser |  | 12CH, 21CH | nein | [Link](https://vshowlighting.com/product/vshow-stage-laser-lighting-l1003-10w-rgb-laser-projector-35kpps-scanner-system-12-21ch/) |
| VSHOW | FSP200 | fresnel |  | 2CH | nein | [Link](https://vshowlighting.com/product/vshow-studio-led-lighting-fsp200-200w-led-fresnel-spotlight-with-manual-zoom/) |
| VSHOW | FSP300 | fresnel |  | 2CH, 3CH | nein | [Link](https://vshowlighting.com/product/vshow-studio-led-lights-fsp300-300w-edison-led-fresnel-spotlight-cri95-2-3ch-2/) |
| VSHOW | TB5F | multibar | 5 Zellen | 41CH, 71CH, 75CH, 85CH, 170CH | nein | [Link](https://vshowlighting.com/product/vshow-tb5f-ip65-tornado-5pcs-120w-moving-lights-rgbw-4in1-beam-wash-strobe-rotating-effect-lighting/) |
| VSHOW | V12 | strobe |  | 8CH, 11CH, 24CH, 30CH, 47CH, 74CH, 97CH | nein | [Link](https://vshowlighting.com/product/vshow-v12-outdoor-waterproof-moving-head-led-strobe-light-ip65/) |
| VSHOW | WBRF0606 | par | 6 Zellen | 6CH, 10CH | nein | [Link](https://vshowlighting.com/product/vshow-wbrf0606-618w-6in1-battery-wireless-dmx-wi-fi-remote-led-up-light/) |
| VSHOW | AURA1915 | movinghead / wash |  | 14CH, 25CH | nein | [Link](https://vshowlighting.com/product/vshow-zoom-moving-head-light-aura1915-1915w-rgbw-4in1-mac-aura/) |
| VSHOW | R1940L | movinghead / wash | 19 Zellen | 21CH, 23CH, 35CH, 78CH Pixel, 92CH Pixel, 97CH Pixel, 99CH Pixel | nein | [Link](https://vshowlighting.com/product/vshow-zoom-moving-head-light-r1940l-1940w-rgbw-4in1/) |
| VSHOW | G18 E-Wash | par | 18 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://vshowlighting.com/product/vshow_g18_e-wash_18x12w/) |
| VSHOW | W1060 | tiltbar | 10 Zellen | 29CH, 56CH Pixel, 142CH Pixel, 216CH Pixel, 262CH Pixel, 282CH Pixel | nein | [Link](https://vshowlighting.com/product/w1060_wave_line_ip65_10pcs_60w/) |
| VSHOW | P7 | par | 7 Zellen | 1CH, 4CH, 15CH | nein | [Link](https://vshowlighting.com/product/waterproof_10w_rgbw_4in1_led_ip65/) |
| VSHOW | P18 | par |  | 6CH, 8CH, 10CH | nein | [Link](https://vshowlighting.com/product/waterproof_par_light_p18/) |
| VSHOW | WP1220 | par | 12 Zellen | 7CH, 11CH | nein | [Link](https://vshowlighting.com/product/waterproof_par_light_wp1220/) |
| VSHOW | X1925 | movinghead / wash | 19 Zellen | 14CH, 22CH, 25CH, 27CH, 36CH, 84CH Pixel | nein | [Link](https://vshowlighting.com/product/x1925_19pcs_25w_rgbw_4in/) |
| VSHOW | X760 | movinghead / wash |  | 20CH, 36CH, 57CH, 93CH, 102CH, 214CH | nein | [Link](https://vshowlighting.com/product/x760_760w_rgbw_4_in_1_zoom/) |
| VSHOW | X760A | movinghead / wash | 7 Zellen | 20CH, 36CH Pixel, 57CH Pixel, 93CH Pixel, 102CH Pixel, 215CH Pixel | nein | [Link](https://vshowlighting.com/product/x760a_760w_rgbw_4_in_1_zoom/) |
| XMlite | BOT230 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/508.html) |
| XMlite | LED Par 54x3W | par |  | 14CH, 25CH, 30CH | nein | [Link](https://www.movinghead.net/stagelights/509.html) |
| XMlite | Beam230 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/510.html) |
| XMlite | Hotbeam280 | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/511.html) |
| XMlite | LS180 | movinghead / spot |  | 17CH | nein | [Link](https://www.movinghead.net/stagelights/512.html) |
| XMlite | Minihotbeam | movinghead / spot |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/513.html) |
| XMlite | LM915Z | movinghead / matrix | 1 Zellen | 16CH, 22CH, 50CH | nein | [Link](https://www.movinghead.net/stagelights/515.html) |
| XMlite | BS440/BS440C | movinghead / spot |  | 16CH, 20CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/516.html) |
| XMlite | BEAM 440 | movinghead / beam |  | 16CH | nein | [Link](https://www.movinghead.net/stagelights/518.html) |
| XMlite | Dot beam 60W | movinghead / beam |  | 14CH, 16CH | nein | [Link](https://www.movinghead.net/stagelights/519.html) |
| XMlite | Hotbeam350 | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/521.html) |
| XMlite | LM285 | movinghead / wash |  | 15CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/522.html) |
| XMlite | MINI HOTBEAM (16/24 CH) | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/523.html) |
| XMlite | Beam350 | movinghead / beam |  | 16CH, 19CH | nein | [Link](https://www.movinghead.net/stagelights/524.html) |
| XMlite | MS440 | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/525.html) |
| XMlite | Megabeam350 | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/526.html) |
| XMlite | LP285 | par |  | 7CH, 9CH | nein | [Link](https://www.movinghead.net/stagelights/527.html) |
| XMlite | LP285CW | par |  | 6CH | nein | [Link](https://www.movinghead.net/stagelights/528.html) |
| XMlite | LED Par 54x3W (Variante) | par |  | 14CH, 25CH, 30CH | nein | [Link](https://www.movinghead.net/stagelights/529.html) |
| XMlite | XC230 | movinghead / beam |  | 6CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/530.html) |
| XMlite | LM560 | movinghead / wash |  | 14CH, 25CH, 30CH | nein | [Link](https://www.movinghead.net/stagelights/531.html) |
| XMlite | Exp1400 | movinghead / profile |  | 37CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/532.html) |
| XMlite | NEX 350 | movinghead / beam |  | 16CH, 19CH | nein | [Link](https://www.movinghead.net/stagelights/533.html) |
| XMlite | Nex-260 | movinghead / beam |  | 16CH | nein | [Link](https://www.movinghead.net/stagelights/534.html) |
| XMlite | Exp660 | movinghead / profile |  | 37CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/535.html) |
| XMlite | Exp600 | movinghead / profile |  | 37CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/536.html) |
| XMlite | Exp410 | movinghead / spot |  | 16CH, 21CH, 24CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/537.html) |
| XMlite | LP310 | par |  | 1CH, 3CH, 4CH, 6CH, 9CH, 27CH | nein | [Link](https://www.movinghead.net/stagelights/538.html) |
| XMlite | LWP310 | par |  | 1CH, 3CH, 4CH, 6CH, 9CH, 27CH | nein | [Link](https://www.movinghead.net/stagelights/539.html) |
| XMlite | LLP400 | movinghead / beam |  | 16CH, 19CH | nein | [Link](https://www.movinghead.net/stagelights/540.html) |
| XMlite | LM560C | movinghead / wash |  | 14CH, 25CH, 30CH | nein | [Link](https://www.movinghead.net/stagelights/541.html) |
| XMlite | NEX150 | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/542.html) |
| XMlite | LP 560C | par |  | 3CH, 7CH, 10CH | nein | [Link](https://www.movinghead.net/stagelights/543.html) |
| XMlite | LM760 | movinghead / wash |  | 20CH, 30CH, 77CH | nein | [Link](https://www.movinghead.net/stagelights/544.html) |
| XMlite | MEGAPLUS480 | movinghead / spot |  | 34CH, 39CH | nein | [Link](https://www.movinghead.net/stagelights/545.html) |
| XMlite | MEGAPLUS 420 | movinghead / spot |  | 19CH | nein | [Link](https://www.movinghead.net/stagelights/547.html) |
| XMlite | LM105 | movinghead / wash |  | 14CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/549.html) |
| XMlite | LWP285CW | par |  | 6CH | nein | [Link](https://www.movinghead.net/stagelights/550.html) |
| XMlite | LWP216 | par | 18 Zellen | 8CH | nein | [Link](https://www.movinghead.net/stagelights/551.html) |
| XMlite | LP228 | par | 19 Zellen | 8CH | nein | [Link](https://www.movinghead.net/stagelights/552.html) |
| XMlite | Mega Plus 450 | movinghead / spot |  | 19CH | nein | [Link](https://www.movinghead.net/stagelights/553.html) |
| XMlite | NEX320 | movinghead / beam |  | 16CH | nein | [Link](https://www.movinghead.net/stagelights/554.html) |
| XMlite | XF580 | movinghead / profile |  | 22CH | nein | [Link](https://www.movinghead.net/stagelights/555.html) |
| XMlite | LLP450 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/556.html) |
| XMlite | H9 | movinghead / profile |  | 42CH, 49CH | nein | [Link](https://www.movinghead.net/stagelights/558.html) |
| XMlite | H12 | movinghead / profile |  | 39CH, 43CH | nein | [Link](https://www.movinghead.net/stagelights/559.html) |
| XMlite | LM660 | movinghead / wash |  | 19CH, 32CH | nein | [Link](https://www.movinghead.net/stagelights/560.html) |
| XMlite | H10 | movinghead / profile |  | 36CH, 52CH, 56CH | nein | [Link](https://www.movinghead.net/stagelights/561.html) |
| XMlite | MEGABEAM380 | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/562.html) |
| XMlite | MF9 | movinghead / profile |  | 37CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/563.html) |
| XMlite | H5 | movinghead / profile |  | 36CH, 52CH, 56CH | nein | [Link](https://www.movinghead.net/stagelights/564.html) |
| XMlite | EXP 700 | movinghead / profile |  | 43CH | nein | [Link](https://www.movinghead.net/stagelights/565.html) |
| XMlite | EXP290 | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/566.html) |
| XMlite | NEX295 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/567.html) |
| XMlite | H5 (500W LED PROFILE MOVING HEAD LIGHT) | movinghead / profile |  | 44CH, 45CH, 50CH | nein | [Link](https://www.movinghead.net/stagelights/568.html) |
| XMlite | C10 | movinghead / profile |  | 39CH, 43CH | nein | [Link](https://www.movinghead.net/stagelights/569.html) |
| XMlite | WP430 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/570.html) |
| XMlite | LM610 | movinghead / beeeye | 19 Zellen | 21CH, 23CH, 35CH, 78CH, 92CH, 97CH, 99CH | nein | [Link](https://www.movinghead.net/stagelights/571.html) |
| XMlite | NEX 430 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/572.html) |
| XMlite | L5 | strobe |  | 7CH, 15CH, 17CH, 21CH, 33CH, 39CH, 65CH, 68CH, 70CH, 112CH, 117CH | nein | [Link](https://www.movinghead.net/stagelights/573.html) |
| XMlite | W8 | movinghead / profile |  | 37CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/574.html) |
| XMlite | EXP351 | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/576.html) |
| XMlite | EXP490C | movinghead / spot |  | 16CH, 24CH | nein | [Link](https://www.movinghead.net/stagelights/577.html) |
| XMlite | NEX256 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/578.html) |
| XMlite | WP610 | movinghead / wash |  | 21CH, 23CH, 35CH, 78CH, 92CH, 97CH, 99CH | nein | [Link](https://www.movinghead.net/stagelights/579.html) |
| XMlite | C8 | movinghead / profile |  | 37CH, 41CH, 50CH | nein | [Link](https://www.movinghead.net/stagelights/580.html) |
| XMlite | WP380 | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://www.movinghead.net/stagelights/581.html) |
| XMlite | Mega Plus 450C | movinghead / spot |  | 19CH, 24CH, 31CH | nein | [Link](https://www.movinghead.net/stagelights/582.html) |
| XMlite | LWP180 | par |  | 2CH, 6CH, 8CH | nein | [Link](https://www.movinghead.net/stagelights/583.html) |
| XMlite | LWP200 | par |  | 8CH | nein | [Link](https://www.movinghead.net/stagelights/584.html) |
| XMlite | Magaplus370 | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/585.html) |
| XMlite | BP60 | par |  | 6CH, 8CH, 10CH | nein | [Link](https://www.movinghead.net/stagelights/587.html) |
| XMlite | EXP410C | movinghead / spot |  | 21CH, 25CH | nein | [Link](https://www.movinghead.net/stagelights/879.html) |
| XMlite | LED hotbeam | movinghead / spot |  | 39CH | nein | [Link](https://www.movinghead.net/stagelights/880.html) |
| XMlite | Megaplus382 | movinghead / spot |  | 19CH, 24CH, 31CH | nein | [Link](https://www.movinghead.net/stagelights/881.html) |
| XMlite | LM940 | movinghead / wash | 37 Zellen | 22CH, 36CH, 133CH, 147CH, 170CH Pixel | nein | [Link](https://www.movinghead.net/stagelights/882.html) |
| XMlite | LM350B | movinghead / beam |  | 18CH | nein | [Link](https://www.movinghead.net/stagelights/883.html) |
| XMlite | S6 | strobe |  | 8CH, 16CH, 23CH, 114CH | nein | [Link](https://www.movinghead.net/stagelights/884.html) |
| XMlite | W10 | movinghead / profile |  | 37CH, 38CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/885.html) |
| XMlite | NEX361 | movinghead / beam |  | 18CH | nein | [Link](https://www.movinghead.net/stagelights/886.html) |
| XMlite | WP370 | movinghead / beam |  | 16CH, 27CH | nein | [Link](https://www.movinghead.net/stagelights/887.html) |
| XMlite | LLP520 | movinghead / beam |  | 16CH | nein | [Link](https://www.movinghead.net/stagelights/888.html) |
| XMlite | WP390H | movinghead / spot |  | 24CH | nein | [Link](https://www.movinghead.net/stagelights/889.html) |
| XMlite | WP390 | movinghead / beam |  | 16CH | nein | [Link](https://www.movinghead.net/stagelights/890.html) |
| XMlite | Precision 900 | movinghead / profile |  | 37CH | nein | [Link](https://www.movinghead.net/stagelights/914.html) |
| XMlite | W9 | movinghead / profile |  | 44CH, 45CH | nein | [Link](https://www.movinghead.net/stagelights/919.html) |
| XMlite | LM970 | movinghead / wash | 37 Zellen | 19CH, 32CH | nein | [Link](https://www.movinghead.net/stagelights/927.html) |
| XMlite | 120W Waterproof Laser Moving Head | movinghead / beam |  | 25CH | nein | [Link](https://www.movinghead.net/stagelights/928.html) |
| XMlite | 260W Laser Beam | movinghead / beam |  | 15CH | nein | [Link](https://www.movinghead.net/stagelights/929.html) |
| XMlite | EXP 351C | movinghead / spot |  | 29CH | nein | [Link](https://www.movinghead.net/stagelights/930.html) |
| XMlite | C8 Mini | movinghead / profile |  | 37CH, 38CH, 41CH | nein | [Link](https://www.movinghead.net/stagelights/934.html) |
| XMlite | NA100 | movinghead / beam |  | 16CH, 24CH, 27CH | nein | [Link](https://www.movinghead.net/stagelights/970.html) |
| YUER | 12x10W RGBW 4in1 +2x10W White Strobe +2x10W Gold Strobe 8 Arm Bee Eye | arms | 2 Zellen | 24CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x10w-rgbw-4in1-2x10w-white-strobe-2x10w-gold-strobe-8-arm-bee-eye-moving-head-light-wash-laser-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 3x10W RGBW 4in1 +2x10W +3x10W Moving Head Light With Ring Gobo Laser | movinghead / spot |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x10w-rgbw-4in1-2x10w-3x10w-moving-head-light-with-ring-gobo-laser-strobe-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 5x20W RGBW 4in1 +6x5W Gold Moving Head Light Wash Laser Strobe Effect | movinghead / matrix | 5 Zellen | 17CH, 22CH Pixel, 33CH Pixel, 48CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-5x20w-rgbw-4in1-6x5w-gold-moving-head-light-wash-laser-strobe-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 16x3W +72x0.2w RGB +3x5w COB Moving Head Light Wash Laser Strobe | movinghead / matrix | 64 Zellen | 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-16x3w-72x0-2w-rgb-3x5w-cob-moving-head-light-wash-laser-strobe-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 7x15W RGBW 4in1 LED +90pcs RGB LED Par Light Wash Effect | par | 7 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x15w-rgbw-4in1-led-90pcs-rgb-led-par-light-wash-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 12x8W RGBW 4in1 LED +144pcs RGB LED Par Light Wash Effect | par | 12 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x8w-rgbw-4in1-led-144pcs-rgb-led-par-light-wash-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 4x10W RGBWAU +4X10w Strobe +Red Green Laser Moving Head Light Beam | movinghead / matrix | 1 Zellen | 19CH, 24CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x10w-rgbwau-4x10w-strobe-red-green-laser-moving-head-light-beam-laser-strobe-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | IP65 Waterproof 295W/350W/380W Beam Moving Head Light 8+16 Prisms | movinghead / beam |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-295w-350w-380w-beam-moving-head-light-8-16-prisms-focus-frost-rainbow-effect-dmx512-rdm-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 360x0.5W RGB +360x1W Warm/Cold White Strobe Light With Auxiliary | strobe | 96 Zellen | 7CH, 22CH, 280CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-360x0-5w-rgb-360x1w-warm-cold-white-strobe-light-with-auxiliary-light-beam-wash-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 12x12W RGBWAUV 6in1 Battery Par Light Wash Effect APP Control | par | 12 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x12w-rgbwauv-6in1-battery-par-light-wash-effect-dmx512-remote-app-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 24x6W RGBWAUV 6in1 Battery Wall Wash Light Wash Effect Retro Control | retro | 1 Zellen | 6CH, 11CH, 17CH, 48CH, 59CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-24x6w-rgbwauv-6in1-battery-wall-wash-light-wash-effect-dmx512-retro-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 7x10W RGBW +3X3W +4x10W Gold/White Strobe 6 Arm Moving Head Light | arms | 7 Zellen | 26CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x10w-rgbw-3x3w-4x10w-gold-white-strobe-6-arm-moving-head-light-with-ring-wash-laser-strobe-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 4x30W White +Amber Retro Effect Light With RGBW Auxiliary Light Wash | retro | 4 Zellen | 10CH, 22CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x30w-white-amber-retro-effect-light-with-rgbw-auxiliary-light-wash-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 7x10W RGBW 4in1 +3x3W Gobo +2x10W White Strobe Moving Head Light | movinghead / spot |  | 26CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x10w-rgbw-4in1-3x3w-gobo-2x10w-white-strobe-moving-head-light-strobe-laser-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 200W COB +48x0.5W RGB Retro Par Light Wash Effect | retro | 1 Zellen | 5CH, 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-200w-cob-48x0-5w-rgb-retro-par-light-wash-effect-dmx512-sound-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 6x8W RGBW 4in1 Moving Head Light With Ring Wash Effect | movinghead / wash | 6 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x8w-rgbw-4in1-moving-head-light-with-ring-wash-effect-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 10W/15W/20W Full Color RGB Animation Laser Light 35 Kpps Water | laser |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-10w-15w-20w-full-color-rgb-animation-laser-light-35-kpps-water-ripples-effect-dmx512-ilda-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 6x10W Gold Strobe +24x3W 2 Head Moving Head Light Strobe Effect | spider | 24 Zellen | 14CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x10w-gold-strobe-24x3w-2-head-moving-head-light-strobe-effect-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 300W LED Beam Spot Wash Moving Head Light With Ring Frost Focus Effect | movinghead / spot |  | 18CH, 26CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-300w-led-beam-spot-wash-moving-head-light-with-ring-frost-focus-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 400W LED Beam Spot Wash Moving Head Light CMY CTO Frost Focus Effect | movinghead / spot |  | 21CH, 23CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-400w-led-beam-spot-wash-moving-head-light-cmy-cto-frost-focus-effect-dmx512-rdm-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | IP66 Waterproof 650W LED Beam Spot Wash Moving Head Light With CMY | movinghead / spot |  | 24CH, 34CH, 39CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip66-waterproof-650w-led-beam-spot-wash-moving-head-light-with-cmy-cto-rainbow-focus-frost-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 5x10W LED +12x3W LED +1 Red 1 Green Laser 4 Head Moving Head Light | movinghead / matrix | 5 Zellen | 30CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-5x10w-led-12x3w-led-1-red-1-green-laser-4-head-moving-head-light-with-gobo-laser-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 8x3W RGBW 2x5W Warm White Strobe +1 Red 1 Green Laser Moving Head | movinghead / matrix | 8 Zellen | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-8x3w-rgbw-2x5w-warm-white-strobe-1-red-1-green-laser-moving-head-light-with-strobe-beam-laser-effect-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 2x5W Warm White Strobe +1 Red 1 Green Laser Beam Moving Head Light | movinghead / matrix | 2 Zellen | 15CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-2x5w-warm-white-strobe-1-red-1-green-laser-beam-moving-head-light-with-strobe-beam-effect-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 2x5W Warm White Strobe +3 Red 2 Green 1 Blue Laser Moving Head Light | movinghead / matrix | 2 Zellen | 9CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-2x5w-warm-white-strobe-3-red-2-green-1-blue-laser-moving-head-light-with-strobe-laser-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 4x5W COB Warm White +2 Red 2 Green Laser Moving Head Light | movinghead / matrix | 4 Zellen | 23CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x5w-cob-warm-white-2-red-2-green-laser-moving-head-light-with-strobe-laser-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | MINI 12x3W LED +3x3W LED +2X5W Gold Strobe +R G Laser Six Arm Moving | arms | 12 Zellen | 19CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-12x3w-led-3x3w-led-2x5w-gold-strobe-r-g-laser-six-arm-moving-head-light-with-gobo-beam-effect-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club) |
| YUER | MINI 15W RGBW 4in1 Beam Moving Head Light With Ring | movinghead / beam |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-15w-rgbw-4in1-beam-moving-head-light-with-ring-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club-stage-show) |
| YUER | MINI 6x8W RGBW Bee Eye Moving Head Light With Ring | movinghead / beeeye | 6 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-6x8w-rgbw-bee-eye-moving-head-light-with-ring-dmx512-remote-control-for-dj-disco-wedding-event-party-bar-club-stage-show) |
| YUER | 6x60W COB Retro Light With Auxiliary Light Wash Effect | retro | 6 Zellen | 15CH, 33CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x60w-cob-retro-light-with-auxiliary-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 7x50W COB Retro Light Wash Effect DMX512 Sound Control | retro | 7 Zellen | 16CH, 37CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x50w-cob-retro-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 3x10W LED White Strobe +Red Green Laser Moving Head Light With Laser | retro | 3 Zellen | 15CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x10w-led-white-strobe-red-green-laser-moving-head-light-with-laser-strobe-effect-dmx512-sound-retro-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 18x12W RGBW 4in1 Par Light With Ring Wash Effect Sound Retro Control | retro | 18 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-18x12w-rgbw-4in1-par-light-with-ring-wash-effect-dmx512-sound-retro-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 200W Warm/Cold White Spot Light Wash Effect | effect |  | 2CH, 3CH, 4CH, 5CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-200w-warm-cold-white-spot-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 4x40W RGBW 4in1 +20x6W RGB Bar Bracket Light Beam Wash Effect | effect | 4 Zellen | 19CH, 56CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x40w-rgbw-4in1-20x6w-rgb-bar-bracket-light-beam-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 12x10W RGBW 4in1 Bee Eye +10x4W Wash +7x3W Beam +4x10W Gold Strobe | movinghead / beeeye | 12 Zellen | 30CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x10w-rgbw-4in1-bee-eye-10x4w-wash-7x3w-beam-4x10w-gold-strobe-rack-light-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 40W RGBW 4in1 Moving Head Light With Ring Beam Effect | movinghead / beam |  | 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-40w-rgbw-4in1-moving-head-light-with-ring-beam-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 3x8W RGBWAUV 6in1 Battery Par Light Wash Effect | par | 3 Zellen | 6CH, 8CH, 10CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x8w-rgbwauv-6in1-battery-par-light-wash-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 200W LED Moving Head Light With Ring Rainbow Frost 18 Prisms Effect | movinghead / beam |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-200w-led-moving-head-light-with-ring-rainbow-frost-18-prisms-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 18x3W RGB Light Curtain Light With LED Strip Point Control Wash Effect | bar | 18 Zellen | 5CH, 14CH, 54CH Pixel, 56CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-18x3w-rgb-light-curtain-light-with-led-strip-point-control-wash-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 18x3W RGB Light Curtain Light Point Control Wash Effect | effect | 18 Zellen | 5CH, 8CH, 54CH, 56CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-18x3w-rgb-light-curtain-light-point-control-wash-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 12x6W RGBW 4in1 Wall Wash Light Point Control Wash Effect | bar | 12 Zellen | 6CH, 9CH, 16CH, 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x6w-rgbw-4in1-wall-wash-light-point-control-wash-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 96+48 Segments RGB Cold/Warm White Strobe Light Wash Effect | strobe |  | 5CH, 13CH, 16CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-96-48-segments-rgb-cold-warm-white-strobe-light-wash-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 12x10W RGBW 4in1 Beam + 4x10W RGBW Bee Eye + Red Green Laser Moving | movinghead / beeeye | 12 Zellen | 21CH, 36CH, 52CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x10w-rgbw-4in1-beam-4x10w-rgbw-bee-eye-red-green-laser-moving-head-light-beam-strobe-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 24x3W RGBW 4in1+ Auxiliary Light Wall Wash Light Wash Effect App | bar | 24 Zellen | 5CH, 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-24x3w-rgbw-4in1-auxiliary-light-wall-wash-light-wash-effect-dmx512-app-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 295W Bulb Moving Head Light With Ring Frost Focus Rainbow Six Line | movinghead / beam |  | 16CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-295w-bulb-moving-head-light-with-ring-frost-focus-rainbow-six-line-prisms-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 28+14 Segments RGB+ White Gold Pixel Tube Wash Effect RDM | tube | 1 Zellen | 5CH, 15CH, 70CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-28-14-segments-rgb-white-gold-pixel-tube-wash-effect-rdm-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 150W LED White Spot Moving Head Light With Ring Focus 3 Prisms Effect | movinghead / spot |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-150w-led-white-spot-moving-head-light-with-ring-focus-3-prisms-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 10W Full Color RGB APP Animation Laser Light With Emergency Switch | laser |  | 21CH, 38CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-10w-full-color-rgb-app-animation-laser-light-with-emergency-switch-40kpps-beam-pattern-effect-ilda-dmx512-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 350W RGBALC Audience Light With Wsah Effect | effect |  | 1CH, 2CH, 3CH, 4CH, 6CH, 7CH, 10CH, 13CH, 15CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-350w-rgbalc-audience-light-with-wsah-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 19x15W RGBW 4in1 Zoom +Auxiliary Light Par Light With Ring CTO Wash | par | 19 Zellen | 11CH, 25CH, 33CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-19x15w-rgbw-4in1-zoom-auxiliary-light-par-light-with-ring-cto-wash-beam-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 135+30 Segments RGB +White Strobe Light Wash Effect | strobe |  | 4CH, 12CH, 15CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-135-30-segments-rgb-white-strobe-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 5W APP Full Color RGB Animation Laser Light 30Kpps | laser |  | 16CH, 20CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-5w-app-full-color-rgb-animation-laser-light-30kpps-beam-pattern-effect-ilda-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 9x10W RGBW 4in1 +9x10W Strobe +2 Red 1 Green Laser 3 Arm Moving Head | arms | 9 Zellen | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-9x10w-rgbw-4in1-9x10w-strobe-2-red-1-green-laser-3-arm-moving-head-light-with-ring-beam-laser-strobe-effect-dmx512-remote-control-for-dj-disco-club-wedding-party-bar-stage-lighting) |
| YUER | 4x50W COB+108x0.2W RGB Audience Light Wash Effect | cob | 4 Zellen | 13CH Pixel, 25CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x50w-cob-108x0-2w-rgb-audience-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 192x0.2W RGB + 96X2W White Strobe Light Horse Wash Effect | strobe |  | 4CH, 16CH, 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-192x0-2w-rgb-96x2w-white-strobe-light-horse-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 14x15W RGBW 4in1 Par Light Wash Effect DMX512 Sound Control | par | 14 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-14x15w-rgbw-4in1-par-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 7x30W RGBW 4in1 Par Light Wash Effect DMX512 Sound Control | par | 7 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x30w-rgbw-4in1-par-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 24x3W LED RGB Light Curtain Light Wash Effect | effect | 24 Zellen | 3CH, 9CH, 26CH, 36CH, 72CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-24x3w-led-rgb-light-curtain-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 4x120W LED + 48pcs LED Moving Head Bracket Light Beam Rainbow Frost | movinghead / beam |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x120w-led-48pcs-led-moving-head-bracket-light-beam-rainbow-frost-18-prisms-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 3x15W +Red Green Blue Laser Moving Head Light Magic Ball Laser Effect | derby / orb | 3 Zellen | 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x15w-red-green-blue-laser-moving-head-light-magic-ball-laser-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 12x3W +3x10W Gold Strobe Moving Head Light Beam Strobe Effect | movinghead / matrix | 12 Zellen | 13CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x3w-3x10w-gold-strobe-moving-head-light-beam-strobe-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 16x3W +10W RGBW +4x5W White Strobe +Red Green Laser 4Arm Moving Head | movinghead / matrix | 16 Zellen | 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-16x3w-10w-rgbw-4x5w-white-strobe-red-green-laser-4arm-moving-head-light-beam-laser-strobe-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 6x500mw RGB Swing Laser Light WIth Light Strip Wash Strobe Effect RDM | strobe |  | 22CH, 44CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x500mw-rgb-swing-laser-light-with-light-strip-wash-strobe-effect-dmx512-rdm-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 14x10W RGBW 4in1 +4x10w Gold Strobe +3 Red 2 Green 1 Blue Moving Head | movinghead / matrix | 14 Zellen | 28CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-14x10w-rgbw-4in1-4x10w-gold-strobe-3-red-2-green-1-blue-moving-head-light-lasr-strobe-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 8x10W RGBW 4in1 +1x10w RGB +3pcs Spot +2x10w Gold Storbe +2x10w White | derby / orb | 8 Zellen | 28CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-8x10w-rgbw-4in1-1x10w-rgb-3pcs-spot-2x10w-gold-storbe-2x10w-white-storbe-r-g-laser-moving-head-light-beam-magic-ball-strob-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 16x3W +1pcs 5050 RGBW 4in1 +2x10w Storbe +R G Laser Moving Head Light | derby / orb | 16 Zellen | 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A216x3w-1pcs-5050-rgbw-4in1-2x10w-storbe-r-g-laser-moving-head-light-beam-magic-ball-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | MINI 2Red 3Green 1Blue Laser +5w Strobe Moving Head Light | movinghead / matrix | 1 Zellen | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-2red-3green-1blue-laser-5w-strobe-moving-head-light-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | MINI 4x10W RGBW 4in1 +5w Strobe Moving Head Light RG Laser Strobe | movinghead / matrix | 4 Zellen | 14CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-4x10w-rgbw-4in1-5w-strobe-moving-head-light-rg-laser-strobe-spot-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 4x3W RGBW +5w Strobe Moving Head Light RG Laser Strobe Effect | movinghead / matrix | 4 Zellen | 13CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x3w-rgbw-5w-strobe-moving-head-light-rg-laser-strobe-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 12x60W Double-sided Swing Moving Head Light With Auxiliary Light | movinghead / beam |  | 12CH, 23CH, 30CH, 44CH, 59CH, 78CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-12x60w-double-sided-swing-moving-head-light-with-auxiliary-light-y-axis-infinite-rotation-point-control-beam-horse-racing-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 150W White +24pcs Colorful LED Strips Moving Head Light Rainbow Frost | movinghead / beam |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-150w-white-24pcs-colorful-led-strips-moving-head-light-rainbow-frost-18-prisms-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-show-lighting) |
| YUER | 6 Head Rotating Reflector Ball DMX512 Sound Control | movinghead / matrix | 6 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6-head-rotating-reflector-ball-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-show-lighting) |
| YUER | 6x4W RGBW 4in1 Lifting Ball DMX512 Sound Control | derby / orb | 6 Zellen | 11CH, 35CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x4w-rgbw-4in1-lifting-ball-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-show-lighting) |
| YUER | 6x18W RGBWAUV 6in1 Battery Par Light Wash Effect Sound | par | 6 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x18w-rgbwauv-6in1-battery-par-light-wash-effect-dmx512-sound-remote-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 32x3W RGBW 4in1 +2x5w Gold Strobe +RG Laser 8 Arm Moving Head Light | arms | 32 Zellen | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-32x3w-rgbw-4in1-2x5w-gold-strobe-rg-laser-8-arm-moving-head-light-beam-laser-strobe-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-effect-lighting) |
| YUER | 10x40W RGBW 4in1 +240x0.5w White +240x0.5w Gold Swing Moving Head | movinghead / beam |  | 17CH, 26CH, 86CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-10x40w-rgbw-4in1-240x0-5w-white-240x0-5w-gold-swing-moving-head-light-beam-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 80W White +6x10W RGBW 4in1 Spot Moving Head Light Bee Eye Gobo Effect | movinghead / beeeye | 1 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-80w-white-6x10w-rgbw-4in1-spot-moving-head-light-bee-eye-gobo-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 260W Bulb Beam Moving Head Light Focus Rainbow Effect Control | movinghead / beam |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-260w-bulb-beam-moving-head-light-focus-rainbow-effect-dmx512-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 80W RGBW 4in1 Zoom Par Light Wash Effect | par |  | 5CH, 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-80w-rgbw-4in1-zoom-par-light-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP66 Waterproof 750W LED Cutting Moving Head Light Zoom CMY CTO Frost | movinghead / spot |  | 44CH, 45CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip66-waterproof-750w-led-cutting-moving-head-light-zoom-cmy-cto-frost-rainbow-effect-dmx512-rdm-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 300W LED Beam Spot Wash 3in1 Moving Head Light Zoom | movinghead / spot |  | 26CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-300w-led-beam-spot-wash-3in1-moving-head-light-zoom-frost-double-prisms-rainbow-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | LED RGB Pixel Bar Light Wash Effect DMX512 Artnet Klingnet | bar | 1 Zellen | 7CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-40pcs-led-rgb-pixel-bar-light-wash-effect-dmx512-artnet-klingnet-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 3x3W Red +3x3W Green +3x3W Blue +3x3W White +3x10W Golden Strobe | strobe | 3 Zellen | 14CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x3w-red-3x3w-green-3x3w-blue-3x3w-white-3x10w-golden-strobe-green-laser-dynamic-3-arm-light-beam-laser-strobe-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 5W 6W RGB Animation Battery Laser Light With Bluetooth APP ILDA | laser |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-5w-6w-rgb-animation-battery-laser-light-with-bluetooth-app-ilda-control-pattern-effect-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 295W Bulb Moving Head Light With Ring Double Prisms 8+16+24 Prisms | movinghead / beam |  | 18CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-295w-bulb-moving-head-light-with-ring-double-prisms-8-16-24-prisms-rainbow-frost-effect-dmx512-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 14x3W +12x4W RGBW +5x10W Gold Strobe Mini 6 Head Moving Head Rack | movinghead / matrix | 14 Zellen | 30CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-14x3w-12x4w-rgbw-5x10w-gold-strobe-mini-6-head-moving-head-rack-light-with-rg-laser-beam-bee-eye-wash-14pcs-iridescent-light-strips-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 40x3W RGB LED Light Curtain Light Wall Wash Effect | bar | 40 Zellen | 3CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-40x3w-rgb-led-light-curtain-light-wall-wash-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 60x1.5W RGB LED Par Light with 36Pcs 5050 RGB Auxiliary Light Wash | par | 60 Zellen | 5CH, 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-60x1-5w-rgb-led-par-light-with-36pcs-5050-rgb-auxiliary-light-wash-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 4x18W LED RGBWAUV 6in1 Battery Par Light Wash Effect | par | 4 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x18w-led-rgbwauv-6in1-battery-par-light-wash-effect-dmx512-remote-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 72+32+8 Segment LED RGB+W Strobe Light Wash Effect Copy Roxx Effect | strobe |  | 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-72-32-8-segment-led-rgb-w-strobe-light-wash-effect-copy-roxx-effect-dmx512-sound-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 18x4W RGBW 4in1 + 36pcs 5050 RGB + 30x0.5W White LED Par Light Wash | par | 18 Zellen | 8CH, 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-18x4w-rgbw-4in1-36pcs-5050-rgb-30x0-5w-white-led-par-light-wash-effect-dmx512-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 7x60W LED RGBW 4in1 +210x0.3W LED RGB Bee Eye Moving | movinghead / beeeye | 7 Zellen | 20CH, 23CH, 36CH Pixel, 39CH Pixel, 57CH Pixel, 67CH Pixel, 93CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-7x60w-led-rgbw-4in1-210x0-3w-led-rgb-bee-eye-moving-head-light-wash-zoom-rainbow-effect-dmx512-art-net-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 16x50W LED RGBL 4in1 +204x0.3W LED RGB Moving Head | movinghead / wash | 16 Zellen | 24CH, 44CH, 48CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-16x50w-led-rgbl-4in1-204x0-3w-led-rgb-moving-head-light-wash-zoom-rainbow-effect-copy-ayrton-effect-dmx512-rdm-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 48+18 Segments Moving Head Strobe Light Wash Effect | movinghead / matrix | 1 Zellen | 25CH, 34CH, 68CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-48-18-segments-moving-head-strobe-light-wash-effect-art-net-dmx512-rdm-control-for-dj-disco-party-bar-club-stage-lighting) |
| YUER | 300W LED Beam Spot Wash 3in1 Moving Head Light Frost Zoom Rainbow | movinghead / spot |  | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-300w-led-beam-spot-wash-3in1-moving-head-light-frost-zoom-rainbow-effect-gobo-light-dmx512-for-dj-disco-party-bar-club-stage-lighting) |
| YUER | 280W Bulb Beam Spot Wash 3in1 Moving Head Light With Ring 5 Prism | movinghead / spot |  | 18CH, 26CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-280w-bulb-beam-spot-wash-3in1-moving-head-light-with-ring-5-prism-frost-zoom-effect-robe-chanel-dmx512-for-dj-disco-party-wedding-dance-stage-lighting) |
| YUER | IP65 Waterproof 178X2W LED RGBALC 6in1 MINI Audience Light Splicing | effect | 64 Zellen | 1CH, 2CH, 3CH, 4CH, 6CH, 7CH, 10CH, 13CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-waterproof-178x2w-led-rgbalc-6in1-mini-audience-light-splicing-wash-effect-dmx512-rdm-for-dj-disco-party-bar-club-party-outerdoor-dance) |
| YUER | 96+56+20 Segment LED Moving head Strobe Light X-Infinite rotation | movinghead / matrix | 1 Zellen | 11CH, 28CH, 49CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-96-56-20-segment-led-moving-head-strobe-light-x-infinite-rotation-dyeing-flash-effect-light-copy-roxx-effect-dmx512-rdm-art-net-for-dj-disco-stage-wedding-indoor-dance-floor-music-party) |
| YUER | IP65 Waterproof 7x18W LED RGBALC 6 in1 Battery Par Light Wash Effect | par | 7 Zellen | 3CH, 6CH, 8CH, 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-7x18w-led-rgbalc-6-in1-battery-par-light-wash-effect-dmx512-remote-app-control-for-dj-disco-theater-bar-club-event-party-stage-effect-lighting) |
| YUER | 40W Warm Tungsten Glow Retro Light Tungsten Wire Bulb DMX512 | retro | 1 Zellen | 1CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-40w-warm-tungsten-glow-retro-light-tungsten-wire-bulb-dmx512-for-dj-disco-theater-broadcast-event-stage-effect-light) |
| YUER | 6x500mw R Laser 91 magic Strobe Battle Shadow Six Arm Laser Moving | arms | 2 Zellen | 23CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x500mw-r-laser-91-magic-strobe-battle-shadow-six-arm-laser-moving-head-effect-light-with-iridescent-light-strips-white-gold-strobe-rg-laser-wash-effect-dmx512-sound-control-for-dj-disco-bar-ktv) |
| YUER | 10x10w RGBW Beam 6-Arm Super Bee Eye Donkey Kong Moving Head Effect | arms | 2 Zellen | 26CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-10x10w-rgbw-beam-6-arm-super-bee-eye-donkey-kong-moving-head-effect-light-with-iridescent-light-strips-white-gold-strobe-rg-laser-effect-dmx512-sound-control-for-dj-disco-bar-ktv-%E5%89%AF%E6%9C%AC) |
| YUER | 36X4W RGBW 4IN1 + 256X0.5W RGB 3IN1 +96X0.5W White LED Vertical Beam | strobe | 36 Zellen | 17CH, 32CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F36x4w-rgbw-4in1-256x0-5w-rgb-3in1-96x0-5w-white-led-vertical-beam-strobe-wash-effect-light-dmx512-for-clubs-bar-wedding-decorations) |
| YUER | Mold 150W LED With Ring Beam Spot Moving Head Light With 18 Rotating | movinghead / spot |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-mold-150w-led-with-ring-beam-spot-moving-head-light-with-18-rotating-prism-rainbow-effect-dmx-disco-party-club-stage-lights) |
| YUER | 32+16 Segments 192X0.2W RGB +96X2W White Long strip Pixel Strobe | strobe | 96 Zellen | 4CH, 16CH, 17CH, 128CH, 131CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-32-16-segments-192x0-2w-rgb-96x2w-white-long-strip-pixel-strobe-light-wash-strobe-effect-dj-disco-outdoor-stage) |
| YUER | LED 6X40W COB Wall Washer Light With Fill Light 112X0.2W | bar | 6 Zellen | 10CH Pixel, 15CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-6x40w-cob-wall-washer-light-with-fill-light-112x0-2w-voice-control-dmx-for-dj-club-disco-party-dance-floor) |
| YUER | LED 3x60W Gold + 48X3W RGB Auxiliary Light | effect | 3 Zellen | 4CH, 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-3x60w-gold-48x3w-rgb-auxiliary-light-voice-control-dmx512-for-stage-indoor-dj-disco-party-wedding-decoration-dmx-music-control-lamp) |
| YUER | 420W Prism King Moving Head Light With LED Ring Spot 12+24+48 Prisms | movinghead / spot |  | 18CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-420w-prism-king-moving-head-light-with-led-ring-spot-12-24-48-prisms-rotating-a-6-row-lens-rainbow-atomization-effect-rdm-dmx512-for-stage-light-effectdisco-dj-bar) |
| YUER | LED 18X3W Golden Point Control Wall Washer Light With 120X0.5W RGB | bar | 18 Zellen | 4CH, 13CH, 31CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-18x3w-golden-point-control-wall-washer-light-with-120x0-5w-rgb-3in1-horse-racing-effect-dmx512-for-dj-club-disco-party-dance-floor) |
| YUER | LED RGB 3IN1 Warm/White Pixel Light With Wash Strobe Effect | strobe | 96 Zellen | 5CH, 7CH, 12CH, 160CH, 162CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-rgb-3in1-warm-white-pixel-light-with-wash-sound-control-strobe-effect-for-bar-light-dj-disco-party-wedding-club) |
| YUER | Upgraded version LED 380W Moving Head Beam Light With Ring 12+48 | movinghead / beam |  | 16CH, 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fupgraded-version-led-380w-moving-head-beam-light-with-ring-12-48-prisms-atomization-rainbow-effect-for-stage-light-effect-light-disco-dj-bar) |
| YUER | LED 6-Eye 6X60W COB Par Light 2200K+RGB Beads Vertical Retro Light | retro | 6 Zellen | 13CH Pixel, 33CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-6-eye-6x60w-cob-par-light-2200k-rgb-beads-vertical-retro-lamp-light-adjustable-telescopic-wall-wash-effect-dmx512-for-dj-stage-bar-disco) |
| YUER | LED 60W COB Par Light 2200K+RGB Beads Wall Wash Effect | bar | 24 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-60w-cob-par-light-2200k-rgb-beads-wall-wash-effect-dmx512-for-dj-disco-wedding-birthday-party-club-stage-lighting) |
| YUER | LED 6EYE 6X30W RGBW 4IN1 Moving Head Light With 90pcs Horse Racing | movinghead / beam |  | 17CH, 43CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-6eye-6x30w-rgbw-4in1-moving-head-light-with-90pcs-horse-racing-led-strip-beam-sound-control-dmx512-for-dj-disco-party-christmas-wedding) |
| YUER | LED 6X20W/40W/60W RGBW 4IN1 +5X3W Single-Color 6 Head Retro Effect | movinghead / matrix | 6 Zellen | 35CH Pixel, 77CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2new-led-6x20w-40w-60w-rgbw-4in1-5x3w-single-color-6-head-retro-effect-light-beam-strobe-effect-dmx512-for-stage-light-disco-dj) |
| YUER | Mini LED 30mv Red+100mv Green +3X10W Strobe Moving Head Laser Light | movinghead / matrix | 3 Zellen | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fmini-led-30mv-red-100mv-green-3x10w-strobe-moving-head-laser-light-with-ring-dmx512-for-dj-disco-stage-party-wedding-dance-floor) |
| YUER | Infinite Rotation 2X80W Golden+60W 4IN1 LED Retro Flash Light | retro | 2 Zellen | 15CH Pixel, 21CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-infinite-rotation-2x80w-golden-60w-4in1-led-retro-flash-light-with-ring-wash-dmx512-for-dj-party-flashing-lights-dance-club-disco-stage-effect-light) |
| YUER | LED 2Eyes 2x100W COB Blinder Light With Ring +48X0.2W RGB | blinder | 2 Zellen | 18CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-led-2eyes-2x100w-cob-blinder-light-with-ring-48x0-2w-rgb-voice-control-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | 480X0.3W RGB+500X2W Amber Cool White Moving Head Strobe Light | movinghead / matrix | 64 Zellen | 5CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F480x0-3w-rgb-500x2w-amber-cool-white-moving-head-strobe-light-individual-control-voice-control-dmx512-for-show-disco-dj-party-club-lights) |
| YUER | Waterproof IP65 4X18W RGBW+UA 6IN1 Battery Par Light With APP Control | par | 4 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-waterproof-ip65-4x18w-rgbw-ua-6in1-battery-par-light-with-app-control-voice-control-dmx512-for-dj-disco-stage-wedding-indoor-dance-floor-music-party) |
| YUER | 360X0.2W RGB+204X0.5W White Strobe Light Independent Control | strobe | 96 Zellen | 1CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2new-360x0-2w-rgb-204x0-5w-white-strobe-light-independent-control-voice-control-dmx512-for-party-dj-disco-concert-live-show-horse-racing-lamp) |
| YUER | 1W 2W 3W Laser Light With APP Control Pattern Stage | laser |  | 16CH, 36CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2new-1w-2w-3w-laser-light-with-app-control-pattern-stage-voice-control-dmx512-for-stage-indoor-dj-disco-party-wedding-decoration-dmx-music-control-lamp) |
| YUER | Copy Martin LED 150W RGBL Moving Head Back Ground Light Wash Zoom LCD | movinghead / wash |  | 20CH, 36CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fcopy-martin-led-150w-rgbl-moving-head-back-ground-light-wash-zoom-lcd-dmx512-for-wedding-dj-party-effect-lights) |
| YUER | 4Eyes 4X50W White+Warm White 2IN1 LED COB Blinder Light Cool and Warm | blinder | 4 Zellen | 6CH Pixel, 12CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-4eyes-4x50w-white-warm-white-2in1-led-cob-blinder-light-cool-and-warm-white-for-dj-party-stage-effect-lighting) |
| YUER | 2W 3W Full Color RGB Laser Light Patten Projection Beam Shaping ILDA | laser |  | 18CH, 25CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-2w-3w-full-color-rgb-laser-light-patten-projection-beam-shaping-ilda-dmx512-for-stage-effect-dj-disco-party-christmas-wedding) |
| YUER | LED Mini 2X3W Red+2X3W Green+2X3W Blue Moving Head Beam Light | movinghead / beam |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-led-mini-2x3w-red-2x3w-green-2x3w-blue-moving-head-beam-light-with-ring-dmx512-for-dj-disco-stage-party-wedding-dance-floor) |
| YUER | LED Full-Color 5W 10W RGB 3IN1 Moving Head Laser Light With Ring | movinghead / spot |  | 20CH, 25CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-full-color-5w-10w-rgb-3in1-moving-head-laser-light-with-ring-pattern-voice-control-stage-effect-ilda-dmx512-for-dj-light-party-dance-disco-bar-music-club) |
| YUER | Mini LED 2X3W Red+2X3W Green+2X3W Blue Bee Eye Moving Head Light | movinghead / beeeye | 2 Zellen | 11CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-mini-led-2x3w-red-2x3w-green-2x3w-blue-bee-eye-moving-head-light-with-ring-dmx512-for-dj-disco-stage-party-wedding-dance-floor) |
| YUER | 12W RGB Laser Light With APP Control Animation Beam Scanner ILDA | laser |  | 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-12w-rgb-laser-light-with-app-control-animation-beam-scanner-voice-control-ilda-dmx512-for-dj-disco-stage-wedding-party-bar) |
| YUER | Brand New Upgrade 2Eyes 2x100W White+Warm White 2IN1 LED COB Blinder | blinder | 2 Zellen | 11CH Pixel, 13CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fbrand-new-upgrade-2eyes-2x100w-white-warm-white-2in1-led-cob-blinder-light-cool-and-warm-white-professional-dj-party-stage-effect-lighting) |
| YUER | 576X0.3W RGB 3IN1 LED Pixel Light Indoor Flashing Dance Light | effect | 64 Zellen | 21CH, 79CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F576x0-3w-rgb-3in1-led-pixel-light-voice-control-dmx512-for-indoor-dj-party-flashing-lights-dance-club-disco-stage-effect-light) |
| YUER | LED Waterproof IP65 54X3W RGB Par Light With Wash Strobe Effect | strobe | 54 Zellen | 3CH, 4CH, 7CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-waterproof-ip65-54x3w-rgb-par-light-with-wash-strobe-effect-voice-control-dmx512-for-disco-dj-projector-party-decoration-night-light) |
| YUER | 5X60W RGBW Point Control Moving Head Light Beam Horse Racing Effect | movinghead / beam |  | 5CH, 16CH, 22CH, 32CH, 38CH, 48CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F5x60w-rgbw-point-control-moving-head-light-beam-horse-racing-effect-rdm-dmx512-for-stage-light-effect-light-disco-dj-music-party-bar) |
| YUER | LED 18X12W RGBW 4IN1 Moving Head Zoom Light With Ring | movinghead / beam |  | 12CH, 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-18x12w-rgbw-4in1-moving-head-zoom-light-with-ring-voice-control-dmx512-for-disco-party-club-dj-stage-effect-lights) |
| YUER | Mini 5X30W Moving Head Light With LED Ring 5X100mw Green Lasers Effect | movinghead / beam |  | 19CH, 43CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fmini-5x30w-moving-head-light-with-led-ring-5x100mw-green-lasers-effect-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | LED 61X30W RGBW 4in1 Moving Head Light With Ring Beam Wash Zoom RDM | movinghead / wash | 61 Zellen | 21CH, 49CH, 204CH, 232CH, 265CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-61x30w-rgbw-4in1-moving-head-light-with-ring-beam-wash-zoom-rdm-dmx512-for-dj-disco-party-bar-dance-floor-stage-effect-lighting) |
| YUER | LED 5X80W RGBW 4IN1 Electrodeless Moving Head Beam Light With 180X3W | movinghead / matrix | 5 Zellen | 34CH Pixel, 60CH Pixel, 72CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-5x80w-rgbw-4in1-electrodeless-moving-head-beam-light-with-180x3w-warm-white-180x3w-white-strobe-effect-rdm-dmx512-for-dj-disco-party-wedding) |
| YUER | LED 10X80W RGBW 4IN1 Double-sided Electrodeless Moving Head Beam | movinghead / matrix | 10 Zellen | 31CH, 44CH Pixel, 76CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-10x80w-rgbw-4in1-double-sided-electrodeless-moving-head-beam-light-with-360x3w-warm-white-360x3w-white-strobe-effect-rdm-dmx512-for-dj-disco-party-wedding) |
| YUER | 350W Bulb Beam Spot Moving Head Light With Aperture +Focus+ 48+8+24 | movinghead / spot |  | 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F350w-bulb-beam-spot-moving-head-light-with-aperture-focus-48-8-24-prism-atomization-rainbow-effect-dmx512-for-dj-dmx-stage-light-effect-light-disco-dj-bar) |
| YUER | LED 24X4W RGBW 4IN1 Wall Washer With 120X0.2W Warm White+Horse Racing | bar | 1 Zellen | 5CH, 9CH, 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-24x4w-rgbw-4in1-wall-washer-lights-with-120x0-2w-warm-white-horse-racing-effects-rdm-dmx512-for-dj-club-disco-party-dance-floor) |
| YUER | 100W Positive White+Warm White COB LED Par Light With RGB 3IN1 | strobe |  | 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-100w-positive-white-warm-white-cob-led-par-light-with-rgb-3in1-auxiliary-light-strobe-effect-dmx512-for-party-disco-club-light-dj-equipment-stage-effect-lighting) |
| YUER | Mini Moving Head Laser Light With LED Ring 1X50mw Red+1X50mw | movinghead / beam |  | 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-mini-moving-head-laser-light-with-led-ring-1x50mw-red-1x50mw-green-1x50mw-blue-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | 3W 5W 6W RGB Animaiton Laser Light With Bluetooth APP Control Pattern | laser |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-3w-5w-6w-rgb-animaiton-laser-light-with-app-control-pattern-stage-lights-dmx512-16ch-for-dj-disco-wedding-bar-stage-effect) |
| YUER | LED 200W Beam Moving Head Light With Ring 6+12 Prisms+Rainbow Effect | movinghead / beam |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-200w-beam-moving-head-light-with-ring-6-12-prisms-rainbow-effect-voice-control-dmx512-for-dj-stage-bar-disco-strobe) |
| YUER | Waterproof IP66 Mini Full Cast Aluminum 380W BEAM Moving Head Light | movinghead / beam |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof-ip66-mini-full-cast-aluminum-380w-beam-moving-head-light-8-16-24-honeycomb-prism-16-double-prism-rainbow-atomization-effect-dmx512-for-stage-light-effect-light-disco-dj-bar) |
| YUER | Waterproof IP65 LED 44X10W RGBW 4in1 Wash Floodlight Strobe Effect | strobe | 44 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof-ip65-led-44x10w-rgbw-4in1-wash-floodlight-strobe-effect-rdm-dmx512for-stage-studio-theater-building-landscape-city-night-view) |
| YUER | 7X50W CW WW COB Round Blinder Light Strobe Wash Effect | blinder | 7 Zellen | 6CH, 18CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-7x50w-cw-ww-cob-round-blinder-light-strobe-wash-effect-dmx512-for-dj-dmx-stage-light-effect-light-disco-dj-bar) |
| YUER | Battery Wireless Waterproof 6X15W RGBWA-UV 6IN1 LED Par Light | par | 6 Zellen | 2CH, 6CH, 8CH, 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-battery-wireless-waterproof-6x15w-rgbwa-uv-6in1-led-par-light-with-swedish-wireless-mode-app-control-2-4g-wireless-dmx512-for-dj-disco-stage-indoor-bar) |
| YUER | 300W LED Beam Moving Head Light With Aperture Rainbow 6+12 Prism | movinghead / beam |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-300w-led-beam-moving-head-light-with-aperture-rainbow-6-12-prism-effect-dmx512-for-dj-disco-party-stage-effect-light-nightclub-bar-light) |
| YUER | 3X80W Golden Retro Light + 36X1W RGB 3in1 Strobe Effect + 3X25W RGBW | retro | 3 Zellen | 15CH Pixel, 33CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-3x80w-golden-retro-light-36x1w-rgb-3in1-strobe-effect-3x25w-rgbw-4in1-beam-effect-stage-light-dmx512-for-dj-party-flashing-lights-dance-club-disco-stage-effect-light) |
| YUER | 6W 8W RGB Animation Laser With APP Control Laser Analog Modulation | laser |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-6w-8w-rgb-animation-laser-stage-light-with-app-control-laser-analog-modulation-scanner-ilda-control-for-dj-disco-bar) |
| YUER | LED 42X3W RGB 3IN1 +63x1W White Curtain Light Wall Washer With 14+21 | bar | 42 Zellen | 4CH, 16CH, 63CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-42x3w-rgb-3in1-63x1w-white-curtain-light-wall-washer-lights-with-14-21-fun-horse-racing-effects-dmx512-for-dj-club-disco-party-dance-floor) |
| YUER | 380w Spot king Moving HeadLight With LED Ring 8+16+24 prisms | movinghead / spot |  | 19CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-380w-spot-king-moving-headlight-with-led-ring-8-16-24-prisms-rotating-rainbow-effect-dmx-for-stage-light-effect-lightdisco-d-bar) |
| YUER | Waterproof IP65 2Eyes 2X300W RGBAW 5IN1 LED Blinder Light | blinder | 2 Zellen | 1CH, 2CH, 4CH, 6CH, 9CH Pixel, 10CH Pixel, 12CH Pixel, 13CH Pixel, 14CH Pixel, 17CH Pixel, 22CH Pixel, 24CH Pixel, 28CH Pixel, 33CH Pixel, 41CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof-ip65-2eyes-2x300w-rgbaw-5in1-led-blinder-light-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | Mini 295W Beam Spot Moving Head Light With LED Ring Double Prism | movinghead / spot |  | 8CH, 16CH, 24CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mini-295w-beam-spot-moving-head-light-with-led-ring-double-prism-stage-light-dmx512-for-dj-disco-wedding-effect) |
| YUER | 4X10W LED White Mast with Manual Focus APP Suitable | effect | 4 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-4x10w-led-white-lighting-mast-with-manual-focus-dmx512-app-remote-control-suitable-for-stage-performance-conference-wedding-party) |
| YUER | 380W Beam Spot Wash 3in1 Moving Head Light Gobo Foucs Frost | movinghead / spot |  | 18CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-380w-beam-spot-wash-3in1-moving-head-light-gobo-foucs-frost-stage-light-dmx512-for-dj-show-wedding-event-stage-effect) |
| YUER | Beam 300W Bulb Moving Head Stage Indoor Control Light | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fbeam-300w-bulb-moving-head-lighting-stage-party-dj-disco-wedding-club-show-music-indoor-event-ktv-concert-dmx-control-light) |
| YUER | 6x60W COB Retro With 116x0.2W RGB Auxiliary Light Horse Racing Wall | retro | 6 Zellen | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F6x60w-cob-retro-with-116x0-2w-rgb-auxiliary-light-horse-racing-wall-wash-strobe-effect-stage-lighting-dmx-music-control) |
| YUER | 1200W LED CMY CTO Beam Spot Zoom Wash 3IN1 Moving Head Cutter Light | movinghead / profile |  | 41CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-1200w-led-cmy-cto-beam-spot-zoom-wash-3in1-moving-head-cutter-light-dmx512-for-concert-theater-club-large-scale-event) |
| YUER | LED COB Audience Light 2 Eyes Blinder 6x30W Strobe Wash Effect | blinder | 6 Zellen | 8CH, 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-cob-audience-light-2-eyes-blinder-lights-6x30w-strobe-wash-effect-with-102x0-2w-rgb-ring-dmx512-flood-lighting-dj-disco) |
| YUER | 4 eyes 4X50W Cool Warm White COB + RGB Flood Blinder Audience Effect | blinder | 4 Zellen | 13CH Pixel, 25CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-4-eyes-4x50w-cool-warm-white-cob-rgb-flood-blinder-lights-dj-audience-stage-lighting-effect-disco-bar-wedding-party) |
| YUER | Mini 150W Beam Moving Head Light With Aperture Spot Rainbow Effect | movinghead / spot |  | 13CH, 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fmini-150w-beam-moving-head-light-with-aperture-spot-rainbow-effect-6-12-prism-stage-lights-dmx512-dj-disco-party-stage-effect) |
| YUER | 200W COB Amber Retro Backlight Light With RGB Ring Inner And SMD RGB | retro | 1 Zellen | 7CH, 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-200w-cob-amber-retro-backlight-light-with-rgb-ring-inner-lamp-and-smd-rgb-out-ring-strobe-wash-strobe-effect-dj-disco) |
| YUER | 295W Moving Head Light Double Prism With LED Aperture Effect | movinghead / beam |  | 24CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-295w-moving-head-light-double-prism-stage-light-with-led-aperture-effect-for-dj-disco-party-christmas-bar-club-wedding) |
| YUER | Iron Man IP65 Waterproof 10X50W COB Splicing Bar Light Warm+Cold/RGBW | cob | 10 Zellen | 6CH, 8CH, 14CH, 40CH Pixel, 44CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-iron-man-ip65-waterproof-10x50w-cob-splicing-bar-light-warm-cold-rgbw-optional-dmx512-dj-disco-stage-light-wash-wall-light-for-club-party-show) |
| YUER | 2W 3W 5W ILDA Splicing RGB 3D RGB Animation Laser Light Beam Scanning | laser |  | 21CH, 40CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F2w-3w-5w-ilda-splicing-rgb-3d-rgb-animation-laser-light-beam-scanning-laser-projector-dmx512-dj-disco-party-club-stage-effects) |
| YUER | IP65 Waterproof MINI 18R 380W Beam Moving Head Light RDM 16CH 20CH | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-waterproof-mini-380w-beam-moving-head-light-rdm-dmx-512-16ch-20ch-stage-effect-lighting-for-home-entertainment-professional-dj) |
| YUER | 4x25W RGBW 4IN1 LED +50MW Green Laser Bee Eye Moving Head Light | movinghead / beeeye | 4 Zellen | 14CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-4x25w-rgbw-4in1-led-50mw-green-laser-bee-eye-moving-head-light-with-aperture-dmx-512-dyeing-beam-strobe-effect-dj-disco-stage-weeding) |
| YUER | IP65 Waterproof LED Zoom&Wash Par Light 200W 300W 400W Cool&Warm | par |  | 3CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-led-zoom-wash-par-light-200w-300w-400w-cool-warm-white-2in1-light-high-brightness-for-church-theater-wedding) |
| YUER | IP65 Waterproof LED 40x15w RGBW 4in1 Wash Floodlight Par Light Strobe | strobe | 40 Zellen | 2CH, 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-led-40x15w-rgbw-4in1-wash-floodlight-par-light-strobe-light-dmx512-control-for-party-wedding-dj-disco) |
| YUER | 20W 30W 40W 40KPPS RGB Full Color Scanning Performance Laser Light | laser |  | 27CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-20w-30w-40w-40kpps-rgb-full-color-scanning-performance-laser-light-ilda-dmx-for-dj-disco-stage-party-bar-nightclub) |
| YUER | Battery Wireless Waterproof Par Light 4X20W RGBWA-UV 6IN1 LED Par | par | 4 Zellen | 2CH, 6CH, 8CH, 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-battery-wireless-waterproof-par-light-4x20w-rgbwa-uv-6in1-led-par-light-dmx512-automatic-voice-control-for-dj-disco-stage-indoor-bar) |
| YUER | IP65 Strobe Light RGBW 12+12 Segements Wash Effect Flash Gathering | strobe |  | 6CH, 16CH, 48CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-strobe-light-rgbw-12-12-segements-wash-effect-flash-dj-disco-gathering-high-bright-flashing-stage-effect-lighting) |
| YUER | 5X60W LED Beam Belt Ring Moving Head Light RGBW 4-in-1 Effect Strobe | movinghead / matrix | 5 Zellen | 8CH, 21CH Pixel, 60CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-5x60w-led-beam-belt-ring-moving-head-light-rgbw-4-in-1-dmx512-stage-lighting-effect-strobe-for-live-performance-dj-nightclub-party) |
| YUER | 10X30W COB LED Bar Light Strip Matrix Warm/Cold/RGBW Optional Wash | strobe | 10 Zellen | 14CH, 24CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-10x30w-cob-led-bar-light-strip-matrix-dmx-warm-cold-rgbw-optional-dj-disco-stage-light-wash-wall-light-for-club-party-show) |
| YUER | Laser 24 Eye Red Laser Light Bar Light Laser Red | laser |  | 6CH, 29CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-dj-laser-24-eye-red-laser-light-bar-light-laser-red-stage-effect-dmx512-lighting-for-dj-disco-party-ktv-nightclub-dance-floor) |
| YUER | Copy Martin 250W LED RGB+W 48 Segments Strobe Light Horse racing | strobe |  | 4CH, 6CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-copy-martin-250w-led-rgb-w-48-segments-strobe-light-horse-racing-flash-effect-stage-lighting-party-dj-disco-concert-live-show-horse-racing-lamp) |
| YUER | Copy Martin 160W LED RGB 3in1 Strobe Light 80 Segments Horse racing | strobe |  | 3CH, 4CH, 8CH, 12CH, 13CH, 24CH, 25CH, 60CH, 61CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-copy-martin-160w-led-rgb-3in1-strobe-light-80-segments-horse-racing-flash-effect-stage-lighting-party-dj-disco-concert-live-show-horse-racing-lamp) |
| YUER | Super Brightness 20 Segements RGB 3in1 LED Strobe Light With Warm | strobe |  | 8CH, 15CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-super-brightness-20-segements-rgb-3in1-led-strobe-light-with-warm-cold-wite-hight-brightness-flash-effect-stage-light-strobe-dj-disco-party-washing) |
| YUER | 18X12W RGBW 4in1 LED Par Light With Aperture Light Professional Stage | par | 18 Zellen | 6CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-18x12w-rgbw-4in1-led-par-light-with-aperture-dmx512-disco-light-professional-stage-bar-dj-equipment) |
| YUER | 295W Beam Moving Head Light Bulb Double 48 + 8Prisms Professional | movinghead / beam |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-295w-beam-moving-head-light-bulb-double-48-8prisms-dmx512-for-night-club-wedding-theater-dj-disco-professional-stage) |
| YUER | LED 300W Beam Spot Moving Head Light+Aperture+Rainbow Effect Effect | movinghead / spot |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-300w-beam-spot-moving-head-light-aperture-rainbow-effect-dmx512-stage-light-effect-light-disco-dj-bar) |
| YUER | Martin Atomic 3000 Strobe Light Super bright 3000W Strobe Flash Light | strobe |  | 4CH | nein | [Link](https://yuerlights.com/products/yuer-martin-atomic-3000-strobe-light-dmx-super-bright-3000w-dmx-strobe-flash-light-cob-led-strobe-lights-3000w-white-color) |
| YUER | 288X3W RGBW SMD LED Strobe Light Dyeing Effect Light 14/38CH | strobe | 96 Zellen | 14CH, 38CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-288x3w-rgbw-smd-led-strobe-light-dyeing-effect-light-dmx512-14-38ch-for-dj-disco-stage-wedding-indoor-dance-floor-music-party) |
| YUER | 250W Waterproof Focusing Surface Light Warm White Cool White RGBW Par | par |  | 3CH, 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-250w-waterproof-focusing-surface-light-warm-white-cool-white-rgbw-wedding-par-light-led-stage-lights-dj-party-christmas-lights) |
| YUER | LED 12x8W RGBS + 48x1W White + 288x1w RGBA Beads Waterproof Bar Light | strobe | 12 Zellen | 22CH, 29CH, 37CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-led-12x8w-rgbs-48x1w-white-288x1w-rgba-lamp-beads-waterproof-bar-light-beam-wash-strobe-effect-dj-disco-outdoor-stage) |
| YUER | 44x10W RGBW 4 in 1 Waterproof LED Wall Washer Outdoor Performance | bar | 44 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-44x10w-rgbw-4-in-1-waterproof-led-wall-washer-outdoor-performance-stage-light-halloween-dj-disco-equipment-lighting) |
| YUER | IP65 Waterproof LED Par Light 12x10w RGBW 4in1 /12x15W RGBWA UV 6in1 | par | 12 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-led-par-light-12x10w-rgbw-4in1-12x15w-rgbwa-uv-6in1-dmx512-control-for-party-wedding-dj-disco) |
| YUER | IP65 Waterproof Full Color 18X8W RGBW 4IN1 LED Wall Washer Control | bar | 18 Zellen | 4CH, 10CH, 72CH Pixel, 78CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-full-color-18x8w-rgbw-4in1-led-wall-washer-dmx-control-device-suitable-for-disco-dj-stage-bar-decoration) |
| YUER | 5x40W RGBW + 6x20W white Super Beam Strobe Moving Head Light 16CH | movinghead / matrix | 5 Zellen | 13CH, 16CH, 17CH, 28CH Pixel, 43CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-5x40w-rgbw-6x20w-white-super-beam-strobe-moving-head-light-dmx512-16ch-music-control-for-dj-disoc-stage-lighting-show-party-club-park-indoor-bar) |
| YUER | Copy GLP JDC1 1320 pcs RGB 3 in 1+216 pcs white DMX52 GLP moving head | movinghead / matrix | 64 Zellen | 5CH, 7CH, 14CH, 19CH, 50CH, 62CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-1320pcs-rgb-3in1-216pcs-white-dmx52-glp-moving-head-light-super-bright-dj-disco-party-washing-light-bar-strobe-light-stage-lighting-effect) |
| YUER | High Power 450W LED Beam Spot Wash Moving Head Light Projector | movinghead / spot |  | 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-high-power-450w-led-beam-spot-wash-moving-head-light-dmx-stage-lighting-projector-suitable-for-dj-disco-party-concert-professional-stage) |
| YUER | LIDA 10W RGB Moving Head Laser Projector 20Kpps Scanning LED Aperture | movinghead / beam |  | 32CH, 49CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-lida-10w-rgb-moving-head-laser-projector-20kpps-scanning-led-aperture-assist-for-dj-disco-dmx-512-auto-sound-music-modes) |
| YUER | 30W/60W COB Warm White/COB Cool White/RGB Mini Zoom Spotlight Follow | follow |  | 2CH, 3CH, 7CH | nein | [Link](https://yuerlights.com/products/yuer-30w-60w-cob-warm-white-cob-cool-white-rgb-mini-zoom-spotlight-dmx512-follow-spot-lights-for-party-stage-dj-performance) |
| YUER | 9X20W LED 4IN1 + 30KPPS 5W 10W full color RGB laser moving head light | movinghead / beam |  | 20CH, 30CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-9x20w-led-4in1-30kpps-5w-10w-full-color-rgb-laser-moving-head-light-dmx-scanning-pattern-effect-laser-projector-for-dj-disco-stage-wedding) |
| YUER | LED Par Light 7x3W RGB 3IN1 LED Wash Light Effect Small Bar | par | 7 Zellen | 3CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-led-par-light-7x3w-rgb-3in1-led-dj-wash-disco-light-dmx512-effect-for-small-party-bar-stage-lighting) |
| YUER | 7X50W LED Stage Par Light Retro Uplights flash retro light | retro | 7 Zellen | 11CH, 18CH, 25CH, 32CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-7x50w-led-stage-par-light-retro-uplights-flash-retro-light-with-dmx-sound-activated-control-dj-stage-background-effect-for-party-disco-show) |
| YUER | LED 150W Moving Head Light Beam Spot 18 Prism With Aperture | movinghead / spot |  | 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-spotlight-18-rotating-prism-led-beam-150w-moving-head-light-for-disco-dj-party-bar-stage-equipment-concert) |
| YUER | LED 500W CMY CTO Beam Spot Zoom Wash 3in1 Moving Head | movinghead / spot |  | 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-led-500w-cmy-cto-beam-spot-zoom-wash-3in1-moving-head-lighting-dmx512-for-dj-disco-night-club-wedding) |
| YUER | LED Starry Sky Radium Curtain Light LED 24X3W Warm White + 96Pcs LED | effect | 24 Zellen | 21CH, 34CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-led-starry-sky-radium-curtain-light-led-24x3w-warm-white-96pcs-led-cold-and-warm-white-48-segment-192pcs-led-rgb-3in1-point-control-strobe-light-dmx-control-for-dj-disco-party-stage) |
| YUER | 5x10W RGBW LED RG Laser 2x10W White Strobe RGB Ring Moving Head | movinghead / matrix | 5 Zellen | 22CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-stage-effect-lighting-5x10w-rgbw-led-rg-laser-2x10w-white-strobe-rgb-ring-moving-head-party-dj-disco-club-stage-lighting) |
| YUER | LED Beam 16x10w RGBW + 16x10w Amber COB Strobe Lifting Hight 1-6M | strobe | 16 Zellen | 13CH, 70CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-beam-16x10w-rgbw-16x10w-amber-cob-strobe-lifting-hight-1-6m-dmx-artnet-mode-dj-disco-stage-lighting-club-bar-wedding) |
| YUER | LED 250W CMY CTO Beam Spot Zoom Wash 3in1 Moving Head | movinghead / spot |  | 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-250w-cmy-cto-beam-spot-zoom-wash-3in1-moving-head-lighting-dmx512-for-dj-disco-night-club-wedding) |
| YUER | Battery LED Par Light 4X15W RGBWA UV 6IN1 Control Battery | par | 4 Zellen | 6CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-battery-led-par-light-4x15w-rgbwa-uv-6in1-dmx512-control-dj-party-disco-wedding-ktv-battery-stage-light) |
| YUER | Laser Butterfly Light Beam Wash Decoration Device Strobe Projector | strobe |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-with-remote-disco-laser-butterfly-light-dmx512-beam-wash-lighting-wedding-club-decoration-device-holiday-party-strobe-projector) |
| YUER | Battery Powered LED Par 3x18W RGBWA UV Wall Wash Wireless App Control | bar | 3 Zellen | 6CH, 10CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-battery-powered-led-par-3x18w-rgbwa-uv-wall-wash-dmx-wireless-remote-app-control-dj-club-home-party-wedding-stage-light-uplights) |
| YUER | LED 150W Spot Gobo Moving Head 7 Patterns 7 Colors White Stage Indoor | movinghead / spot |  | 10CH, 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-150w-spot-gobo-moving-head-7-patterns-7-colors-white-stage-indoor-dj-disco-party-wedding-decoration-dmx-music-control-lamp) |
| YUER | RGBW 300W LED 4in1 Lifting Football Shape Light Rolling Beam Moving | derby / orb | 1 Zellen | 10CH, 60CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-rgbw-300w-led-4in1-lifting-football-shape-light-dmx-rolling-beam-moving-head-stage-effect-dj-party-christmas-decoration-lights) |
| YUER | RGBW 150W LED 4in1 Lifting Football Shape Light Rolling Beam Moving | derby / orb | 1 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2new-style-150w-football-lifting-moving-head-stage-lighting-lift-ball-rgbw-4in1-dmx-lights-dj-disco-club-bar-concert-party-ktv-karaoke) |
| YUER | Promise Rotating Maple Leaf Retro RGBW LED 250W Strobe Effect Light | retro | 3 Zellen | 15CH Pixel, 20CH Pixel, 26CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-promise-rotating-maple-leaf-retro-lamp-rgbw-led-250w-strobe-effect-light-dmx-retro-lighting-for-dj-disco-stage-wedding-party) |
| YUER | LED 150W Spot Beam Moving Head Light 18 Face Prism | movinghead / spot |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-150w-spot-beam-moving-head-light-18-face-prism-stage-lighting-for-show-disco-dj-party-club-lights) |
| YUER | 3x60W Golden COB + LED 48x3W RGB LED Retro Flashing LED Background Bar | retro | 3 Zellen | 8CH, 10CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-3x60w-golden-cob-led-48x3w-rgb-led-retro-flashing-lights-dmx512-led-background-lighting-dj-disco-bar-party-club-show) |
| YUER | 10x30W RGBW LED Rotating beam Moving Head Light Wall Bar Stage Matrix | movinghead / matrix | 10 Zellen | 5CH, 7CH, 13CH, 41CH Pixel, 43CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-10x30w-rgbw-led-rotating-beam-moving-head-light-wall-bar-stage-matrix-dyeing-for-disco-dance-floor-bar-party-nightclub-dj) |
| YUER | 300W Beam Moving Head Light 17CH 0sram 295W Spot Strobe Prism Effect | movinghead / matrix | 1 Zellen | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-300w-beam-moving-head-light-dmx512-17ch-0sram-295w-spot-strobe-prism-effect-light-dj-dicso-party-bar-wedding-indoor-light-show) |
| YUER | 150W Beam Abyss Effect Light Moving Head Spot Equipment Beam Moving | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-150w-beam-abyss-effect-light-moving-head-spot-dj-party-wedding-stage-light-equipment-dmx512-beam-moving-lighting) |
| YUER | 36X3W LED RGB Dyeing Light 8CH Dyeing Strobe Effect Light | strobe | 36 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-36x3w-led-rgb-dyeing-light-dmx-8ch-dyeing-strobe-effect-light-for-dj-disco-studio-theater-background-engineering-wall-stage-bar) |
| YUER | 16 Prisms 150W LED With Ring Moving Head High Bright Mobile Heads Beam | movinghead / beam |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-dj-party-lighting-16-prisms-150w-led-moving-head-high-bright-mobile-heads-beam-rainbow-effect-for-home-disco-bar-stage-wedding) |
| YUER | IP65 Waterproof RGBW Full Color 10W Projector Moving Head Laser Light | movinghead / beam |  | 42CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-waterproof-rgbw-full-color-10w-projector-moving-head-laser-light-3d-animation-stage-lights-xy-magnetic-encoding-dmx-dj-disco-bar) |
| YUER | Double Head Full Color Animation Laser Light 20K Galvanometer | laser |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-double-head-full-color-animation-laser-light-20k-galvanometer-dmx512-voice-control-for-dj-disco-wedding-stage-bar-nightclub) |
| YUER | 6 Eyes Bar Light Fat Beam Laser Light RGB 6X500mw 6X2100mw Control | multibar | 6 Zellen | 14CH, 35CH, 42CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-6-eyes-bar-light-fat-beam-laser-light-rgb-6x500mw-6x2100mw-dmx-control-moving-head-laser-light-for-party-disco-wedding-stage) |
| YUER | 120W RGBW LED Moving Head Light Wash Effect Color Macro | movinghead / wash |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-120w-rgbw-led-moving-head-light-wash-effect-color-macro-for-dj-disco-party-nightclub-performance-show-bar-wedding-stage-light) |
| YUER | LED 150W Beam Spot Zoom Wash 3in1 Moving Head | movinghead / spot |  | 6CH, 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-150w-beam-spot-zoom-wash-3in1-moving-head-lighting-dmx512-for-dj-disco-night-club-wedding) |
| YUER | 150W LED GOBO 3 Prisms Spot With SMD RGB Strip Ring Moving Head Hotal | movinghead / spot |  | 13CH, 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-150w-led-gobo-3-prisms-spot-with-smd-rgb-strip-ring-stage-lighting-moving-head-party-dj-disco-party-hotal-club-bar-wedding) |
| YUER | Mini 40W LED RGBW 4IN1 Beam Moving Head Light With Dual Ring Strobe | movinghead / matrix | 1 Zellen | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-mini-40w-led-rgbw-4in1-beam-moving-head-light-with-dual-ring-strobe-stage-lights-dmx512-dj-disco-party-wedding-bar-stage-effects) |
| YUER | 32+16 Segement LED Strobe RGBW Wave Screen Horse Racing Decoration | strobe |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-32-16-segement-led-strobe-rgbw-wave-screen-stage-lighting-horse-racing-dmx-party-decoration-concert-dj-disco-equipment) |
| YUER | 300W LED Moving Head Light With Aperture 8+16 Prisms Rainbow Effect | movinghead / spot |  | 16CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-300w-led-moving-head-light-with-aperture-8-16-prisms-rainbow-effect-gobos-dmx-512-for-disco-party-club-bar-dj-show-stage-lighting) |
| YUER | 7R 230W Moving Head Light Beam With LED Aperture Rainbow Effect | movinghead / beam |  | 18CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-7r-230w-moving-head-light-beam-with-led-aperture-rainbow-effect-stage-lighting-dmx512-control-for-disco-party-club-bar-dj-show) |
| YUER | 2W Phone App Edit Software RGB Laser Animation Scan Projector | laser |  | 7CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-2w-phone-app-edit-software-rgb-laser-dmx-animation-scan-projector-lighting-christmas-disco-dj-club-party-show-stage-lights) |
| YUER | Mini 14R Beam 295W Moving Head Light | movinghead / beam |  | 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-mini-14r-dj-lights-dmx512-stage-lighting-beam-295w-moving-head-light-for-wedding-nightclub-disco-ktv-party-club-lamp) |
| YUER | 1000W Waterproof IP65 RGBW LED Strobe Light 8 Segements Stage Outdoor | strobe |  | 6CH, 38CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-1000w-waterproof-ip65-rgbw-led-strobe-8-segements-dmx-party-stage-dj-disco-outdoor-park-wall-wash-effect-stage-lighting-light) |
| YUER | Mini Beetle Ball Colorful LED Beam Green Laser Moving Head Strobe | movinghead / matrix | 1 Zellen | 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-mini-beetle-dj-disco-ball-lights-colorful-led-beam-green-laser-moving-head-lights-dmx512-strobe-nightclub-party-show) |
| YUER | Copy GLP 20x40W RGBW LED ZOOM BAR Scanning Point Control Moving Head | movinghead / beam |  | 20CH, 34CH, 35CH, 48CH, 49CH, 88CH, 89CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-20x40w-rgbw-led-zoom-bar) |
| YUER | Mold Professional Ball LED beam laser strobe 3in1 moving head light | movinghead / matrix | 6 Zellen | 20CH Pixel, 57CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mold-professional-dj-disco-ball-lights-led-beam-laser-strobe-3in1-moving-head-light-dmx-nightclub-party-show-stage-lighting) |
| YUER | Double Heads LED 8x10w RGBW + 2x100MW RG Laser + 96PCS RGB Ring 3in1 | movinghead / spot |  | 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-double-heads-led-8x10w-rgbw-2x100mw-rg-laser-96pcs-rgb-lamp-ring-3in1-effect-stage-lighting-moving-head-for-ktv-music-bar) |
| YUER | LED 25x30W RGBW Matrix Beam Star Sky Effect Stage Ligthing | effect | 25 Zellen | 27CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-25x30w-rgbw-matrix-beam-star-sky-effect-stage-ligthing-with-200x0-2w-rgb-rainbow-effect-stage-lighting-bar-dj-disco-club) |
| YUER | 120W LED COB Warm Cold White Moving Head With RGB 5050 SMD Pixel | movinghead / beam |  | 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-120w-led-cob-warm-cold-white-moving-head-with-rgb-5050-smd-pixel-horse-racing-wall-washing-beam-effect-for-dj-disco-party-lamp) |
| YUER | 60W Mini LED Beam With Ring Moving Head Light RGBW 4In1 Effect | movinghead / beam |  | 12CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-60w-mini-led-beam-with-ring-moving-head-light-rgbw-4in1-dmx512-stage-light-effect-stroboscope-for-live-show-dj-nightclub-party) |
| YUER | 9X12W Wall Wash Light High Brightness Race Horce Effects | bar | 9 Zellen | 3CH, 5CH, 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-9x12w-wall-wash-light-high-brightness-race-horce-effects-voice-control-dmx512-for-dj-disco-party-show-stage-effects-lamps) |
| YUER | Mold 100W LED Ball Reflection Roller Light With Spot Strobe Effects | strobe |  | 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mold-100w-led-disco-ball-reflection-roller-light-with-spot-strobe-effects-dmx512-dj-party-bar-show-wedding-stage-lighting) |
| YUER | LED 120W Beam Spot Moving Head Light with Aperture Control Light | movinghead / spot |  | 13CH | nein | [Link](https://yuerlights.com/products/yuer-led-120w-beam-spot-moving-head-light-with-aperture-dmx512-control-dj-stage-effect-light-party-dance-disco-bar-music-club) |
| YUER | 9x12w LED UV Light Bar Halloween Blacklight Fluorescent Poster Purple | bar | 9 Zellen | 2CH, 4CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-9x12w-led-uv-light-bar-stage-lighting-holiday-halloween-party-blacklight-fluorescent-poster-stage-lighting-dj-disco-purple-lamp) |
| YUER | 9x12W LED Amber COB Gold Beam Wash Effect Bar Light Stage Ligthing | strobe | 9 Zellen | 1CH, 9CH Pixel, 13CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-9x12w-led-amber-cob-gold-beam-wash-effect-bar-light-remote-control-stage-ligthing-strobe-horse-racing-party-dj-disco-bar-dmx) |
| YUER | 2X40W Beam Moving Head 6X8W Par Light White Strobe Green Laser 4in1 | movinghead / matrix | 2 Zellen | 16CH Pixel, 31CH Pixel | nein | [Link](https://yuerlights.com/products/yuer-2x40w-beam-moving-head-6x8w-par-light-white-strobe-green-laser-4in1-stand-dj-disco-effect-stage-lighting-dmx-music-nightclub) |
| YUER | 9x12W LED RGBW 4IN1 Wall Wash Effect Dance Bar Halloween Decorate | bar | 9 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-9x12w-led-rgbw-4in1-dmx-wall-wash-lamp-dj-disco-party-stage-light-effect-for-dance-bar-holiday-wedding-xmas-halloween-decorate) |
| YUER | RGB 3IN1 Animation Laser Light 256 Patterns And 11 laser Effect Stage | laser |  | 6CH, 34CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-rgb-3in1-animation-laser-light-256-patterns-and-11-laser-effect-stage-projector-dmx512-for-dj-disco-dance-floor-party-bar) |
| YUER | Battery Wireless Waterproof Par Light 6X18W RGBWA-UV 6IN1 LED Par | par | 6 Zellen | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-battery-wireless-waterproof-par-light-6x18w-rgbwa-uv-6in1-led-par-light-dmx512-automatic-voice-control-for-dj-disco-stage-indoor-bar) |
| YUER | RGB 3IN1 Laser Beam Moving Head Light XY Axis Infinite Rotation Indoor | movinghead / spot |  | 23CH, 37CH, 70CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-arrival-rgb-3in1-laser-beam-moving-head-light-xy-axis-infinite-rotation-dmx512-dj-disco-party-club-indoor-stage-effect-lamp) |
| YUER | LED 12+12 RGBW Strobe Light DMX512 | strobe |  | 6CH, 16CH, 42CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-led-12-12-rgbw-strobe-light-dmx512-for-dj-disco-bar-music-party-stage-light) |
| YUER | RGB Full Color 1W 2W 3W 4W 5W Beam Laser Light Effect | laser |  | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-rgb-full-color-1w-2w-3w-4w-5w-beam-laser-light-lighting-effect-for-dj-club-bar-decoration-party-lights-projector-lamp-halloween-laser) |
| YUER | 25X12W RGBW LED Matrix Wall Wash Moving Head light Professional | movinghead / matrix | 25 Zellen | 20CH, 116CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-25x12w-rgbw-led-matrix-wall-wash-moving-head-light-dmx512-dj-disco-party-club-show-professional-stage-effect-lights) |
| YUER | 420W CMY CTO Moving Head Light Beam Spot Zoom Prism Frost Effect | movinghead / spot |  | 31CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-420w-cmy-cto-moving-head-light-beam-spot-zoom-prism-frost-effect-dmx512-dj-disco-party-club-professional-stage-effects-lamp) |
| YUER | Mold 4 Eyes 200W LED RGBW 4IN1 COB Full Color 4X50W Blinder Bar 20CH | blinder | 4 Zellen | 20CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mold-4-eyes-200w-led-rgbw-4in1-cob-full-color-lighting-4x50w-blinder-lighting-wedding-party-bar-dmx512-20ch-stage-lighting) |
| YUER | 8 Eyes Red + 8 Eyes RGB Laser Swinging Light Bar RGB Laser Beam Bar | bar | 1 Zellen | 23CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-8-eyes-red-8-eyes-rgb-laser-swinging-light-bar-dmx512-stage-light-rgb-laser-beam-dj-bar-stage-equipment-dance-floor) |
| YUER | IP65 420W Beam Moving Head Light Spot Zoom 48 Prism Half Color | movinghead / spot |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-420w-beam-moving-head-light-spot-zoom-48-prism-half-color-rainbow-effect-dmx-dj-disco-party-stage-effects-waterproof-lamp) |
| YUER | Waterproof IP65 12x18W RGBWA+UV 6 in 1 LED With Battery Wash Light | effect | 12 Zellen | 6CH, 8CH, 10CH, 65CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof-ip65-12x18w-rgbwa-uv-6-in-1-led-with-battery-wash-light-wireless-remote-control-stage-light-party-wedding-dj-disco) |
| YUER | Professional 550W LED CMY CTO Profile Spot Beam Wash Zoom Moving Head | movinghead / profile |  | 35CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-professional-550w-led-cmy-cto-profile-spot-beam-wash-zoom-moving-head-lighting-effect-dmx512-rotating-prism-dj-disco) |
| YUER | 6x30W LED Zoom Wash RGB 3in1 Moving Head Light Stage Equipment | movinghead / spot |  | 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-6x30w-led-zoom-wash-rgb-3in1-moving-head-light-dxm-stage-equipment-dj-party-christmas-nightclub-stage-light) |
| YUER | LED 100W Gobo Wizard Beam Effect Reflection Lens Rotating Pattern | effect |  | 1CH, 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-100w-gobo-wizard-beam-effect-reflection-lens-rotating-pattern-dmx512-music-control-stage-lighting-for-dj-disco-dance-club) |
| YUER | 150W LED Strobe Light Sound/ Control LED RGB Segmented Flash Wall | strobe | 96 Zellen | 4CH, 13CH, 14CH, 192CH, 202CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-150w-led-strobe-light-music-sound-dmx-control-led-rgb-segmented-flash-wall-wash-light-disco-party-home-show-stage-projector) |
| YUER | Mold 12W RGB Laser Light With APP control ILDA Animation Beam Scanner | laser |  | 17CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mold-12w-rgb-laser-light-ilda-dmx-animation-beam-scanner-stage-laser-projector-dj-disco-party-christmas-stage-effect-lights) |
| YUER | LED 7X12W Wash Light RGBW 4in1 Stage Moving Head | movinghead / wash | 7 Zellen | 9CH, 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-7x12w-wash-light-rgbw-4in1-dj-disco-stage-moving-head-lights) |
| YUER | LED Mushroom Starry Sky Laser Lights With DMX512 Control | derby | 19 Zellen | 12CH, 24CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-mushroom-starry-sky-laser-lights-with-dmx512-control-for-disco-dj-ktv-pub-party-wedding-led-head-moving-laser-lights) |
| YUER | 4X15W RGBW Laser Moving Head Light Beam Strobe Magic Ball Projector | derby / orb | 4 Zellen | 14CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-4x15w-rgbw-laser-lamp-moving-head-light-beam-strobe-magic-ball-projector-14-21dmx-stage-dj-bar-party-stage-light-4in1) |
| YUER | LED 300W Imaging Light Image Spotlight Stage Light High Power Follow | follow |  | 3CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-300w-imaging-light-image-spotlight-stage-dj-theater-lighting-wedding-party-auto-show-light-high-power-follow-spot-light) |
| YUER | LED Beam+ Laser + Strobe 3IN1 9x10W Good | strobe | 9 Zellen | 19CH, 51CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-beam-laser-strobe-3in1-9x10w-dmx512-stage-effect-lighting-good-for-dj-disco-party-dance-floor-nightclub-and-christmas-decorations) |
| YUER | 54x3W RGB LED Par Light Sound | par | 54 Zellen | 6CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-54x3w-rgb-led-par-light-stage-effect-lighting-for-sound-party-disco-dj-club) |
| YUER | 49X20W RGBW LED Matrix Zoom Wall Wash Moving Head light Professional | movinghead / matrix | 49 Zellen | 22CH, 25CH, 33CH, 206CH Pixel, 229CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-49x20w-rgbw-led-matrix-zoom-wall-wash-moving-head-light-dmx512-dj-disco-party-club-show-professional-stage-effect-lights) |
| YUER | Copy Robe Esprite 800W LED CMY CTO Beam Spot Wash 3in1 Moving Head | movinghead / spot |  | 42CH, 49CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-copy-robe-esprite-800w-led-cmy-cto-beam-spot-wash-3in1-moving-head-light-professional-dj-big-show-effect-lightings) |
| YUER | 200W/300W LED flat panel soft light cold light / warm light suitable | panel |  | 3CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-200w-300w-led-flat-panel-soft-light-cold-light-warm-light-suitable-for-photography-studio-conference-room-live-fill-light) |
| YUER | 371W Beam Spot Moivng Head Light With Aperture Rainbow Prism Effect | effect |  | 16CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-371w-beam-spot-moivng-head-light-with-aperture-rainbow-prism-effect-dmx512-dj-disco-party-xmas-nightclub-stage-effects-lamp) |
| YUER | 4x20W Beam RG Laser Moving Head Light DMX512 Strobe Effects | movinghead / matrix | 4 Zellen | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-4x20w-beam-rg-laser-moving-head-light-dmx512-strobe-effects-for-dj-disco-party-club-show-christmas-stage-lighting-effect) |
| YUER | Butterfly Effect Light 32x100MW RGB Laser Beam Projector Indoor Dance | laser |  | 9CH, 33CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-butterfly-effect-light-32x100mw-rgb-laser-beam-projector-party-stage-lighting-indoor-dance-bar-club-laser-night-wedding-lamp) |
| YUER | 150W LED Spot Beam Wall Wash Moving Head Light With 7 Gobo Prism | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-150w-led-spot-beam-wall-wash-moving-head-light-dmx-with-7-gobo-prism-strobe-focus-effect-dj-disco-party-christmas-stage-effects) |
| YUER | 2R 180W Wizard Beam Gobo Rotate Roller Scanning Light | scanner |  | 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-2r-180w-wizard-beam-gobo-rotate-roller-scanning-light-dmx512-stage-effect-lighting-for-dj-disco-party-club-christmas-show-acme) |
| YUER | Mini 6 Eyes XYZ Infinite Rotation RGB Laser Bar Beam | laser |  | 15CH, 27CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-mini-6-eyes-xyz-stage-effect-infinite-rotation-rgb-laser-bar-beam-lighting-for-dj-disco-party-wedding-moving-head-projector-dmx512) |
| YUER | Pro 600W Profile Spot Moving Head Lighting DMX 512 CMY&CTO | movinghead / profile |  | 34CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-pro-600w-profile-spot-moving-head-lighting-dmx-512-cto-cto-for-dj-bar-disco-concert-party-stage-effect-lights) |
| YUER | Mini LED Spot 260W Moving Head Lighting With SMD Aperture | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mini-led-beam-260w-moving-head-lighting-with-smd-aperture-for-stage-performance-concert-birthday-party-wedding) |
| YUER | (Mirror Rotation) LED ZOOM & BEAM & WASH Bee Eye 4X60W RGBW 4in1 | movinghead / beeeye | 4 Zellen | 18CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-mirror-rotation-led-zoom-beam-wash-bee-eye-4x60w-rgbw-4in1-moving-head-light-for-stage-performance-dj-club) |
| YUER | Mini LED Beam 260W Moving Head Lighting | movinghead / beam |  | 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mini-led-beam-260w-moving-head-lighting-for-stage-performance-concert-birthday-party-wedding) |
| YUER | Single Head Full Color Scanning Laser Projector RGB Stage Pattern | laser |  | 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-single-head-full-color-scanning-laser-projector-dmx512-rgb-stage-pattern-effect-light-for-disco-dj-party-bar-dance-floor-prom) |
| YUER | LED CMY+CTO 500W Beam Spot Zoom Moving Head Light With Prism Frost | movinghead / spot |  | 22CH, 27CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-cmy-cto-500w-beam-spot-zoom-moving-head-light-with-prism-frost-effect-dmx512-dj-lighting-dicso-party-wedding-stage-effect) |
| YUER | 200W LED Moving Head Light Beam+Spot+Aperture+ 8+16Prisms Control | movinghead / spot |  | 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-200w-led-moving-head-light-beam-spot-aperture-8-16prisms-dmx-control-stage-light-effect-light-disco-dj-bar-1) |
| YUER | LED Waterproof Flat Par 7x18W RGBW 4IN1/RGBWA 5IN1/RGBWA+UV 6IN1 | strobe | 7 Zellen | 8CH, 9CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-waterproof-flat-par-7x18w-rgbw-4in1-rgbwa-5in1-rgbwa-uv-6in1-lighting-strobe-dmx512-for-disco-dj-music-party-club-dance-floor-bar-stage) |
| YUER | Professional 1W 2W 3W 4W 5W ILDA 3D RGB Scan Beam Laser Light Dance | laser |  | 7CH, 17CH | nein | [Link](https://yuerlights.com/products/dj-professional-1w-2w-3w-4w-5w-ilda-3d-rgb-scan-beam-laser-light-disco-bar-club-wedding-dance-party-christmas-effect-lamp-pojector) |
| YUER | LED Par COB 200W White Light/Warm White/True White+Warm White/RGBW | cob |  | 1CH, 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-par-cob-200w-white-light-warm-white-true-white-warm-white-rgbw-4in1-light-dmx512-led-lamp-stage-lighting-concert-productions-with-barn-doors) |
| YUER | LED 100W Beam Spot + Aperture Moving Head Light 3 or 5 Face Prism | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-100w-beam-spot-aperture-moving-head-light-3-or-5-face-prism-with-aperture-dmx512-dj-stage-effect-light-party-dance-disco-bar) |
| YUER | MINI LED Moving Head Light 150W Beam+Spot+Rainbow Effect+Aperture+18 | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer-mini-led-moving-head-light-150w-beam-spot-rainbow-effect-aperture-18-prisms-dj-dmx-stage-light-effect-light-disco-dj-bar) |
| YUER | Professional Big LED 500W Spot Frame Moving Head Light with Cmy | movinghead / spot |  | 28CH | nein | [Link](https://yuerlights.com/products/professional-dj-big-show-led-500w-spot-frame-moving-head-light-with-cmy-pattern-cutting-stage-lighting-for-stage-effect-equipmen) |
| YUER | With Aperture 150W LED Moving Head Light Beam Spot 18 Rotating Prisms | movinghead / spot |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-with-aperture-150w-led-moving-head-light-beam-spot-18-rotating-prisms-dj-dmx-stage-light-effect-light-disco-dj-bar-wedding-club) |
| YUER | 6W RGB Laser Light Animation Beam Scanner Stage Laser Projector Dance | laser |  | 10CH, 34CH | nein | [Link](https://yuerlights.com/products/yuer-6w-rgb-laser-light-animation-beam-scanner-stage-laser-projector-dj-disco-bar-club-party-dance-wedding-effect-show) |
| YUER | RGB 15W ILDA 40Kpps Animation Scanner Projector Beam Laser Effect | laser |  | 18CH, 25CH | nein | [Link](https://yuerlights.com/products/rgb-15w-ilda-40kpps-animation-scanner-projector-beam-laser-stage-lighting-effect-dance-party-wedding-holiday-bar-club-dmx-dj) |
| YUER | Full Color 10W 40KPPS ILDA Scanner Laser RGB Projector Ultra | laser |  | 11CH, 31CH, 61CH | nein | [Link](https://yuerlights.com/products/full-color-10w-40kpps-ilda-scanner-laser-show-rgb-projector-ultra-dmx512-party-lights-decoration-nightclub-disco-xmas-dj-disco) |
| YUER | LED Moving Head Light 200W Beam+Spot+18 Rotating Prisms+Rainbow | movinghead / spot |  | 11CH, 13CH | nein | [Link](https://yuerlights.com/products/yuer-new-led-moving-head-light-200w-beam-spot-18-rotating-prisms-rainbow-effect-dj-dmx-stage-light-effect-light-disco-dj-bar) |
| YUER | 20W 40K Full Color RGB Scanning Effect Laser Light Control Laser | laser |  | 17CH, 23CH | nein | [Link](https://yuerlights.com/products/20w-40k-full-color-rgb-scanning-effect-laser-light-dmx512-music-control-laser-projector-dj-disco-stage-party-bar-indoor-outdoor) |
| YUER | 5050 RGB 3IN1 LED Flat Pixel Control Digital Dream Bar Multi-Color | bar | 1 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-124pcs-5050-rgb-3in1-led-flat-pixel-lights-dmx-control-digital-dream-bar-dj-party-club-multi-color-led-light-strips-lights) |
| YUER | Aluminum Alloy LED Par 18X10W RGBW 4in1/18X15W RGBWA 5in1//18x18W | par | 18 Zellen | 6CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer-aluminum-alloy-led-par-18x18w-rgbwa-uv-lights-6in1-led-lighting-dmx512-disco-light-professional-stage-bar-dj-equipment) |
| YUER | 60W Beam 0SRAM RGBW 4IN1 Moving Head Light Strobe | movinghead / matrix | 1 Zellen | 11CH | nein | [Link](https://yuerlights.com/products/yuer-60w-beam-0sram-rgbw-4in1-moving-head-light-strobe-dmx512-voice-control-for-dj-disco-stage-indoor-bar-wedding-lights-show) |
| YUER | 100W COB Warm White Par Atmosphere Light RGBW 4in1 COB Par Can | cob |  | 1CH, 2CH, 4CH, 8CH | nein | [Link](https://yuerlights.com/products/stage-lights-100w-cob-warm-white-par-lights-atmosphere-light-rgbw-4in1-cob-par-can-lights-for-party-dj-disoc-wedding-garden) |
| YUER | Mold LED Flat Par 7X12W RGBW Light Family Birthday Control | par |  | 8CH | nein | [Link](https://yuerlights.com/products/yuer-new-mold-led-flat-par-7x12w-rgbw-light-family-birthday-party-theater-wedding-stage-lighting-dmx512-remote-music-control) |
| YUER | Professional NEW Mold 100W 15 Gobo 8 Colors 18 Prism Led Beam Moving | movinghead / spot |  | 9CH | nein | [Link](https://yuerlights.com/products/professional-new-mold-100w-dmx-15-gobo-8-colors-18-prism-led-beam-moving-head-stage-light-for-dj-party-wedding-disco-bar-yuer) |
| YUER | Waterproof IP65 480W LED Outdoor Beam Spot Moving Head Light CMY | movinghead / spot |  | 22CH, 26CH | nein | [Link](https://yuerlights.com/products/yuer-new-waterproof-ip65-400w-led-outdoor-beam-spot-moving-head-light-cmy-cto-rdm-zoom-effect-dmx-event-stage-park-church) |
| YUER | Atomic 3000 LED RGB Wash Strobe Nightcuble Bar Professional | strobe | 96 Zellen | 3CH, 4CH, 14CH | nein | [Link](https://yuerlights.com/products/atomic-3000-dmx-led-rgb-wash-strobe-stage-lighting-dj-disco-nightcuble-bar-party-professional-stage-effect-performance) |
| YUER | 1000 LED 112 Segments RGB Strobe Effect Bar Night | strobe | 96 Zellen | 3CH, 11CH | nein | [Link](https://yuerlights.com/products/martin-1000-led-112-segments-rgb-strobe-stage-light-effect-sound-activated-for-club-disco-party-dj-bar-holiday-night-lighting) |
| YUER | LED 10X10W 6 Head Moving Head Beam Light RG Laser Strobe Light RGB | multibar | 10 Zellen | 22CH | nein | [Link](https://yuerlights.com/products/yuer-led-10x10w-6-head-moving-head-beam-light-rg-laser-strobe-light-dmx-stage-light-rgb-beam-light-rotating-disco-party-bar) |
| YUER | Waterproof IP65 Outdoor Scanner 10w Animation Projector ILDA Beam | laser |  | 12CH, 21CH | nein | [Link](https://yuerlights.com/products/waterproof-ip65-outdoor-scanner-10w-animation-projector-ilda-beam-30kpps-dmx-music-rgb-stage-effect-lighting-laser-show-disco-dj) |
| YUER | 6X15W LED Beam + 6X500W Red Laser Moving Head Light Bar 11/28/46 RGBW | tiltbar | 6 Zellen | 11CH, 28CH Pixel, 46CH Pixel | nein | [Link](https://yuerlights.com/products/6x15w-led-beam-6x500w-red-laser-moving-head-light-bar-11-28-46-dmx-rgbw-4in1-led-running-effect-for-dj-disco-party-stage-yuer) |
| YUER | LED 7x20W RGBW 4In1 Beam Moving Head Zoom Wash Light Nigh | movinghead / wash | 7 Zellen | 11CH, 17CH | nein | [Link](https://yuerlights.com/products/yuer-7x20w-rgbw-4in1-rgbw-beam-moving-head-led-zoom-wash-light-for-dmx-disco-dj-nigh-club-party-wedding-stage-light) |
| YUER | Die-cast Alu. Led Par Light 54x3W RGB 3in1/54x3W RGBW 4in1 Business | par | 54 Zellen | 1CH, 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-die-cast-alu-led-par-light-54x3w-rgb-3in1-54x3w-rgbw-4in1-dmx-stage-lights-business-lighting-high-power-light-party-ktv-disco-dj-6-sold-in-last-15-hours) |
| YUER | Festival Ball LED beam laser strobe 3in1 moving head football light | derby / orb | 16 Zellen | 18CH | nein | [Link](https://yuerlights.com/products/yuer-festival-dj-disco-ball-lights-led-beam-laser-strobe-3in1-moving-head-football-light-dmx-nightclub-party-show-stage-lighting) |
| YUER | Die-cast Alu. Led Par Light 18x10W RGBW 4in1/18x15W RGBWA 5in1/18x18W | par | 18 Zellen | 1CH, 6CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-die-cast-alu-led-par-light-18x10w-rgbw-4in1-18x15w-rgbwa-5in1-18x18w-rgbwa-uv-6in1-dmx-stage-lights-business-lighting-high-power-light-party-ktv-disco-dj) |
| YUER | Die-cast Alu. Led Par Light 14x10W RGBW 4in1/14x15W RGBWA 5in1/14x18W | par | 14 Zellen | 1CH, 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-die-cast-alu-led-par-light-14x10w-rgbw-4in1-14x15w-rgbwa-5in1-dmx-stage-lights-business-lighting-high-power-light-party-ktv-disco-dj) |
| YUER | IP65 Waterproof 1200W RGBW LED Strobe Light Controlled Strobe Light | strobe |  | 2CH, 6CH, 7CH, 8CH, 14CH | nein | [Link](https://yuerlights.com/products/ip65-waterproof-1200w-rgbw-led-strobe-light-dmx-controlled-strobe-dj-party-disco-light-background-decorative-effect-lighting) |
| YUER | RGB Moving Head Strobe Beam Laser Light Ball LED Professional | movinghead / matrix | 1 Zellen | 28CH, 50CH | nein | [Link](https://yuerlights.com/products/rgb-moving-head-strobe-beam-laser-light-dmx512-dj-disco-ball-for-nightclub-party-show-led-professional-stage-effect-lighting) |
| YUER | 60W Mini Zoom LED LEKO Light Profile Spot Light Professional | profile |  | 1CH, 2CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-60w-mini-zoom-led-leko-light-profile-spot-light-professional-3200k-5600k-dmx512-follow-logo-projector-for-party-stage-dj-show) |
| YUER | LED 8x6w RGBW With RG Laser Beam Pixel Strip Spider Moving Head Dance | spider | 8 Zellen | 9CH, 19CH | nein | [Link](https://yuerlights.com/products/led-8x6w-rgbw-with-rg-laser-beam-pixel-strip-spider-moving-head-dmx512-dj-disco-party-nightclub-dance-wedding-stage-lighting) |
| YUER | Mini LED 8x6W RGBW Moving Head Light LED Spider Beam Spider Light Good | spider | 8 Zellen | 7CH, 15CH | nein | [Link](https://yuerlights.com/products/yuer-mini-led-8x6w-rgbw-moving-head-light-led-spider-beam-stage-lighting-dmx-512-spider-light-good-for-dj-nightclub-party) |
| YUER | Double Side 4x2w RGB Laser 20Kpps Scanner Beam Projector With Strobe | movinghead / matrix | 4 Zellen | 42CH, 96CH | nein | [Link](https://yuerlights.com/products/new-double-side-4x2w-rgb-laser-20kpps-scanner-beam-projector-with-strobe-moving-head-dmx-wedding-party-stage-lighting-bar-lamp) |
| YUER | 5 Head RGB 3IN1 Laser Animation Scanning Effect Bar Light 16X5W LED | multibar | 16 Zellen | 12CH, 35CH Pixel | nein | [Link](https://yuerlights.com/products/5-head-rgb-3in1-laser-animation-scanning-effect-bar-light-16x5w-led-amber-wash-moving-head-light-dmx512-dj-disco-stage-lighting) |
| YUER | LED Matrix 25x30W RGBW 4in1 Good | strobe | 25 Zellen | 2CH, 4CH, 6CH, 9CH, 100CH Pixel, 102CH Pixel, 104CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-matrix-lights-25x30w-rgbw-4in1-dmx512-stage-effect-lighting-good-for-dj-disco-party-dance-floor-clubs-bar-and-wedding-decorations) |
| YUER | LED Matrix 16x12W RGBW 4in1 Good | strobe | 16 Zellen | 4CH, 6CH, 9CH, 64CH Pixel, 66CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-matrix-lights-16x12w-rgbw-4in1-dmx512-stage-effect-lighting-good-for-dj-disco-party-dance-floor-clubs-bar-and-wedding-decorations) |
| YUER | LED Matrix 9x12W RGBW 4in1 Good | strobe | 9 Zellen | 4CH, 6CH, 36CH Pixel, 38CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-matrix-lights-9x12w-rgbw-4in1-dmx512-stage-effect-lighting-good-for-dj-disco-party-dance-floor-clubs-bar-and-wedding-decorations) |
| YUER | Single Head 2W or 500MW NEW 6 Heads Stage Beam Laser Moving Head | movinghead / matrix | 1 Zellen | 18CH, 48CH | nein | [Link](https://yuerlights.com/products/single-head-2w-or-500mw-new-6-heads-stage-beam-laser-moving-head-light-rgb-dj-laser-effect-for-disco-music-dance-party-lights) |
| YUER | Mold Smart 6 Heads Moving Head Beam Laser Light RGB Floral Color | movinghead / matrix | 1 Zellen | 25CH, 55CH | nein | [Link](https://yuerlights.com/products/new-mold-smart-6-heads-moving-head-beam-laser-light-rgb-floral-color-laser-light-projector-unlimited-rotating-disco-laser-light) |
| YUER | LED Wash Zoom Moving Head Light 36x8W RGBW 4IN1/36x12W RGBWA | movinghead / wash | 36 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/yuer-new-led-wash-zoom-moving-head-light-36x8w-rgbw-4in1-36x12w-rgbwa-5in1-36x18w-rgbwa-uv-6in1-lyre-dmx-15-channelsfor-dj-disco-party-bar) |
| YUER | 10X8W LED RGBW Infinite Rotation Moving Head Light 16CH | movinghead / beam |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer-10x8w-led-rgbw-infinite-rotation-moving-head-light-dmx512-16ch-for-dj-disco-stage-wedding-music-party-dance-floor-indoor) |
| YUER | 37X15W RGBW 4IN1 Moving Head Light 24/36/48CH strobe Effect | movinghead / matrix | 37 Zellen | 24CH, 36CH, 48CH | nein | [Link](https://yuerlights.com/products/new-37x15w-rgbw-4in1-moving-head-light-dmx512-24-36-48ch-strobe-effect-for-stage-wedding-dj-show-disco-bar-dance-floor-party) |
| YUER | 350W Spot Beam Wash 3IN1 17R 16/32 Facet Rotating Prism Moving Head | movinghead / spot |  | 18CH | nein | [Link](https://yuerlights.com/products/flightcase-3in1-350w-17r-16-32-facet-rotating-prism-moving-head-lights-spot-beam-wash-3in1-professional-stage-lighting-equipment) |
| YUER | 5x60W Amber LED Retro Flash Light With Auxiliary Blacklight Sound | retro | 5 Zellen | 5CH, 19CH Pixel, 65CH Pixel | nein | [Link](https://yuerlights.com/products/5x60w-amber-led-retro-flash-light-with-auxiliary-blacklight-dmx512-dj-sound-party-music-dance-club-dj-disco-stage-effect-s-tribe) |
| YUER | Mold Professionale Ball LED beam laser strobe 3 in1 moving head light | movinghead / matrix | 1 Zellen | 18CH | nein | [Link](https://yuerlights.com/products/new-mold-professionale-dj-disco-ball-lights-led-beam-laser-strobe-3-in1-moving-head-light-dmx-nightclub-party-show-stage-lightin) |
| YUER | 4 Head 16X10W RGBW +RG Laser Strobe Beam Effect Moving Head Light | movinghead / matrix | 16 Zellen | 16CH | nein | [Link](https://yuerlights.com/products/yuer-4-head-16x10w-rgbw-rg-laser-strobe-beam-effect-moving-head-light-for-dj-disco-stage-wedding-music-party-bar-club-dmx512) |
| YUER | OSRAM 295W Beam 8 Segment 128LED RGB Auxiliary Moving Head Light | movinghead / beam |  | 22CH | nein | [Link](https://yuerlights.com/products/osram-295w-beam-8-segment-128led-rgb-auxiliary-moving-head-light-dmx-fossa-prism-and-atomizing-mirror-effect-light-for-disco-bar) |
| YUER | 150W Spot LED Moving Head Light Support Have Frost RDM Function | movinghead / spot |  | 16CH | nein | [Link](https://yuerlights.com/products/yuer-new-150w-spot-led-moving-head-light-support-remote-control-have-frost-rdm-function-effect-stage-disco-dj-music-party-club) |
| YUER | 30Kpps 2W 3W 5W Full Color RGB Laser Moving Head Light 23CH Scanning | movinghead / beam |  | 23CH | nein | [Link](https://yuerlights.com/products/new-30kpps-2w-3w-5w-full-color-rgb-laser-moving-head-light-dmx512-23ch-scanning-pattern-effect-laser-projector-dj-disco-stage) |
| YUER | LED Spot 180W Atomization Moving Head Light Beam 6+12 Face Prism Bar | movinghead / spot |  | 11CH, 13CH | nein | [Link](https://yuerlights.com/products/new-led-spot-100w-atomization-moving-head-light-beam-6-12-face-prism-dj-disco-nightclub-bar-wedding-activity-dance-floors-dmx) |
| YUER | 200W 7 Colors+5 Gobos Led Spot 14Ch Moving Head Focus 5 Facet Prism | movinghead / spot |  | 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-200w-7-colors-5-gobos-led-spot-dmx-512-14ch-moving-head-stage-lights-focus-5-facet-prism-effect-lightings-dj-disco-party) |
| YUER | 90W LED bee eye laser moving head beam celebration bar voice | movinghead / beeeye | 19 Zellen | 13CH | nein | [Link](https://yuerlights.com/products/90w-led-bee-eye-laser-lights-moving-head-beam-lights-celebration-ktv-disco-dj-bar-voice-controlled-rotating-dmxstage-lighting) |
| YUER | 4W RGB Laser Light Animation Beam Scanner Stage Laser Projector Laser | bar | 1 Zellen | 16CH | nein | [Link](https://yuerlights.com/products/4w-rgb-laser-light-animation-beam-scanner-stage-laser-projector-party-laser-light-dj-laser-stage-effect-light-bar-disco-wedding) |
| YUER | Portman 4 Head Infinite Rotating Compass Retro Light 4X80W + 48X3W | multibar | 4 Zellen | 34CH | nein | [Link](https://yuerlights.com/products/portman-4-head-infinite-rotating-compass-retro-light-4x80w-48x3w-led-retro-flash-effect-light-dj-disco-party-bar-wedding-dmx) |
| YUER | Atomic LED 48 +8 Segment Strobe Light Horse Racing Wash Flash Marquee | strobe |  | 4CH, 6CH, 12CH | nein | [Link](https://yuerlights.com/products/new-martin-atomic-stage-lighting-led-48-8-segment-strobe-light-horse-racing-wash-flash-marquee-light-background-dyeing-lights) |
| YUER | Equipments 200W Beam Spot 2IN1 LED Moving Head LCD Display With 6 | movinghead / spot |  | 6CH, 18CH | nein | [Link](https://yuerlights.com/products/2021-stage-lighting-equipments-200w-beam-spot-2in1-led-moving-head-lights-lcd-display-with-6-rotating-gobos-and-8-static-gobos) |
| YUER | Professional 120W LED Pattern Moving Head Light Light Bar Beam | movinghead / beam |  | 11CH, 16CH | nein | [Link](https://yuerlights.com/products/professional-disco-120w-led-pattern-moving-head-light-dmx512-stage-effect-party-show-light-dj-wedding-club-bar-beam-lighting) |
| YUER | Mold Double LED Strobe Arm Rotating Moving Head Light With RG Laser | arms | 6 Zellen | 18CH | nein | [Link](https://yuerlights.com/products/new-mold-double-led-strobe-arm-rotating-moving-head-light-with-rg-laser-light-for-dj-disco-stage-wedding-music-party-bar) |
| YUER | Strobe Light Focusing 300W Beam Moving Head Light | movinghead / matrix | 1 Zellen | 18CH, 25CH | nein | [Link](https://yuerlights.com/products/2021-new-stage-effect-strobe-light-dmx512-focusing-300w-dj-beam-moving-head-light-for-disco-dance-floor-bar-party-nightclub) |
| YUER | 150W Beam Spot Moving Head High Power 150W White LED Wash IP20 16/14 | movinghead / spot |  | 14CH, 16CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-150w-beam-spot-moving-head-lights-high-power-150w-white-led-wash-lights-ip20-dmx-16-14-channels-good-for-stage-dj-ktv-nightclubs) |
| YUER | 60X1W RGBW 3IN1 LED Par Light LED Light Professional Stage Equipment | par | 60 Zellen | 1CH, 6CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-60x1w-rgbw-3in1-led-par-light-led-lighting-dmx512-disco-light-professional-stage-party-dj-equipment) |
| YUER | Beam Zoom Wash Stage Moving Head LED RGBW 7x60w Light With 70x0.5w | movinghead / wash | 7 Zellen | 25CH Pixel, 93CH Pixel | nein | [Link](https://yuerlights.com/products/new-beam-zoom-wash-stage-moving-head-led-rgbw-7x60w-light-with-70x0-5w-auxiliary-lighting-dj-disco-party-consert-event-wedding) |
| YUER | 200W LED Beam Plus Light Strip With Moving Head Light Stage Bar Strobe | movinghead / matrix | 27 Zellen | 14CH, 20CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-200wled-beam-plus-light-strip-with-moving-head-light-dmx-dj-stage-bar-disco-strobe) |
| YUER | 10W Full Color Laser Light RGB Pattern Scanning Effect Light Stage | laser |  | 21CH, 36CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-10w-full-color-laser-light-rgb-pattern-scanning-effect-light-stage-projector-dmx512-music-control-dj-disco-party-prom-bar-club-dance-floor) |
| YUER | Multiple Colors LED Strong Beam 300W With Aperture Atomization Moving | movinghead / matrix | 1 Zellen | 20CH, 24CH | nein | [Link](https://yuerlights.com/products/yuer-new-multiple-colors-led-strong-beam-300w-with-aperture-atomization-moving-head-dmx-light-dj-stage-bar-disco-strobe) |
| YUER | 400W Waterproof Strobe Light 672x0.25W RGB 3in1 LED + 96x3W CREE LED | strobe | 96 Zellen | 12CH, 59CH | nein | [Link](https://yuerlights.com/products/400w-waterproof-strobe-light-672x0-25w-rgb-3in1-led-96x3w-cree-led-dmx-strobe-flash-lights-professional-dj-disco-stage-lights) |
| YUER | 100cm RGB Battery LED Light Tube Waterproof IP54 Built-in Battery APP | tube | 1 Zellen | 7CH, 36CH, 48CH | nein | [Link](https://yuerlights.com/products/8pcs-100cm-rgb-battery-led-light-tube-waterproof-ip54-built-in-battery-app-control-stage-lighting-for-dj-disco-photo-photographe) |
| YUER | Pixel Tube Waterproof Battery Wireless Wifi 360 Pixel Tube RGBWA 5in1 | tube | 1 Zellen | 4CH, 5CH, 6CH, 7CH, 12CH, 40CH, 80CH | nein | [Link](https://yuerlights.com/products/yuer-pixel-tube-lighting-waterproof-battery-dmx-wireless-wifi-360-pixel-tube-rgbwa-5in1-led-with-charge-case) |
| YUER | 300W LED Cyclorama Light 100pcs 3W high brightness colorful LED Lamps | effect |  | 7CH, 9CH, 11CH, 15CH, 17CH, 22CH | nein | [Link](https://yuerlights.com/products/yuer-300w-led-cyclorama-light-100pcs-3w-high-brightness-colorful-led-lamps-dmx512-suitable-for-large-scale-theatrical-performances-theaters-studios-discos-and-other-places) |
| YUER | IP65 Outdoor Waterproof Moving Head Laser Light Full Color RGB | movinghead / beam |  | 6CH, 16CH, 33CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-ip65-outdoor-waterproof-moving-head-laser-light-full-color-rgb-animation-laser-light-dj-disco-laser-light-stage-laser-light-effect) |
| YUER | LED 250W RGB+W Matrix Wash Strobe Lighting | strobe | 1 Zellen | 11CH | nein | [Link](https://yuerlights.com/products/led-250w-rgb-w-matrix-wash-strobe-lighting-for-dj-disco-bar-nightcuble-home-party-professional-stage-performance) |
| YUER | Aluminum Alloy LED Par Light 84X3W RGBWA 5 Colors High Brightness LED | par | 64 Zellen | 5CH, 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-aluminum-alloy-led-par-light-84x3w-rgbwa-5-colors-high-brightness-led-par-light-dmx-channels-stage-dj-disco-party-events-lighting) |
| YUER | Aluminum Alloy LED Par Light 30X10W RGBW Quad Color LED Par Cans | par | 30 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer-aluminum-alloy-led-par-light-30x10w-rgbw-quad-color-led-par-cans-with-4-8-dmx-channels-stage-dj-disco-party-events-lighting) |
| YUER | 6x60W LED Retro Burst Flashing Night Light 2200K LED Flash Stage | retro | 6 Zellen | 6CH | nein | [Link](https://yuerlights.com/products/nordic-6x60w-led-retro-burst-flashing-night-light-dmx512-2200k-led-flash-stage-dj-party-photographic-effect-lighting-equipment) |
| YUER | type 210W LED Retro Flash Light LED Night Light Decorative With 48pcs | retro | 3 Zellen | 6CH, 8CH, 12CH Pixel | nein | [Link](https://yuerlights.com/products/new-type-210w-led-retro-flash-light-led-night-light-music-party-dj-disco-decorative-lamp-with-48pc-led-rgb-projector-lights) |
| YUER | LED Zoom Par Light Indoor Aluminum Par 18X18W RGBWA-UV 6IN1 Quad | par | 18 Zellen | 8CH, 9CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-18pcs-led-zoom-par-light-indoor-aluminum-par-lights-18x18w-rgbwa-uv-6in1-quad-color-led-zoom-par-lights-25-degree-beam-angle) |
| YUER | LED Bar 2in1 Effect RGBW & UV Control Rhythm Colorful Car TV Desktop | bar | 9 Zellen | 9CH | nein | [Link](https://yuerlights.com/products/led-bar-2in1-effect-rgbw-uv-sound-control-lights-dmx-control-music-rhythm-colorful-lamp-dj-disco-car-tv-desktop-decora-lights) |
| YUER | 85W LED Moving Head With Laser Stage Effect Lighting | movinghead / beam |  | 12CH, 14CH | nein | [Link](https://yuerlights.com/products/yuer-new-85w-led-moving-head-with-laser-stage-effect-lighting-for-dj-disco-club-wedding-beam-spot-sharpy-dmx-sound-modes-fixture) |
| YUER | 85W Spot Wash Moving Head Light 11/13CH Cntrol Stage Dance Floor | movinghead / spot |  | 11CH, 13CH | nein | [Link](https://yuerlights.com/products/yuer-85w-spot-wash-moving-head-light-dmx-11-13ch-music-cntrol-dj-disco-stage-wedding-party-dance-floor-concert-lighting-show) |
| YUER | LED 36x3W RGB Par LED Stage Sound Equipment Effect | par | 36 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/led-36x3w-rgb-par-led-lights-party-nightclub-stage-sound-music-wedding-christmas-dmx512-dj-equipment-disco-effect-lights) |
| YUER | Wireless LED Par 9x10W RGBW 4IN1 LED Wash Light Stage Uplighting No | par | 9 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/wireless-remote-control-led-par-9x10w-rgbw-4in1-led-wash-light-stage-dj-party-uplighting-no-noise-remote-control-night-lights) |
| YUER | 14X15W RGBW Par light Laser Light Projector Strobe | strobe | 14 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-14x15w-rgbw-par-light-dj-disco-laser-light-projector-strobe-stage-effect-wedding-xmas-holiday-party-lamp-gift-holiday-bar-club-lights) |
| YUER | IP65 water proof LED Par Light 5x10W RGBW 4IN1/5x15W RGBWA 5IN1 Laser | strobe | 5 Zellen | 1CH, 8CH, 9CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-water-proof-led-par-light-5x10w-rgbw-4in1-5x15w-rgbwa-5in1-dj-disco-laser-light-projector-strobe-stage-effect-wedding-xmas-holiday-party-lamp-gift-holiday-bar-club-lights) |
| YUER | IP65 water proof LED Par Light 2700k/5700K dual color temperature | par | 18 Zellen | 5CH, 6CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-water-proof-led-par-light-2700k-5700k-dual-color-temperature-pixel-control-1pcs-50w-golden-light-18x0-5smd-5050-rgb3-in-1) |
| YUER | 7X30W RGBW Par light Laser Light Projector Strobe | strobe | 7 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/7x30w-rgbw-par-dj-disco-laser-light-projector-strobe-stage-effect-wedding-xmas-holiday-party-lamp-gift-holiday-bar-club-lights) |
| YUER | 16X30W LED RGB Triangle Retro Bar Background 1800K Matrix Stage | retro | 16 Zellen | 4CH, 6CH, 12CH, 21CH, 64CH Pixel, 76CH Pixel | nein | [Link](https://yuerlights.com/products/16x30w-led-rgb-triangle-retro-bar-concert-dj-disco-party-background-lights-dmx512-1800k-matrix-stage-strobe-effect-lights) |
| YUER | 2Eyes 2x100W White+Warm White 2IN1 LED COB Blinder Light Cool | blinder | 2 Zellen | 8CH Pixel | nein | [Link](https://yuerlights.com/products/2eyes-2x100w-white-warm-white-2in1-led-cob-blinder-light-cool-and-warm-white-professional-dj-party-stage-effect-lighting) |
| YUER | IP65 Waterproof 200W Beam Moving Head Light Control | movinghead / beam |  | 13CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof200w-beam-moving-head-light-dmx-512-control-stage-effect-lighting-for-home-entertainment-professional-dj) |
| YUER | Waterproof Moving Head 260W 9R Outdoor Beam Moving Head Light Sky | movinghead / beam |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/waterproof-moving-head-260w-9r-outdoor-beam-moving-head-light-sky-super-beam-260w-beam-9r-dmx-512-control-stage-lighting-effect) |
| YUER | Laser Strobe Beam Effect 3in1Wireless Rotation Moving Head Light | movinghead / matrix | 1 Zellen | 29CH, 45CH | nein | [Link](https://yuerlights.com/products/laser-strobe-beam-effect-3in1wireless-rotation-moving-head-light-dmx512-29-45ch-dj-disco-stage-wedding-party-show-nightclub-bar) |
| YUER | Beam Wash 2IN1 12X3W CREE LEDS Warm White Or Cold White LED Wall Wash | bar | 12 Zellen | 6CH, 8CH, 52CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-beam-wash-2in1-12x3w-cree-leds-warm-white-or-cold-white-led-wall-wash-lights-with-72pcs-rgb-3in1-smd-5050-led-chips-show-room-effect-running-horse-functions) |
| YUER | 6×4W Dyeing 4in1+150W LED Spot Moving Head Light | movinghead / spot |  | 19CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-6-4w-dyeing-4in1-100w-spot-moving-head-light-for-dj-disco-stage-wedding-party-lighting-show-bar-party-club) |
| YUER | 4 Eyes LED RGB 3IN1 Par Light DMX512 Voice Contro | par |  | 7CH | nein | [Link](https://yuerlights.com/products/4-eyes-led-rgb-3in1-par-light-dmx512-voice-contro-for-dj-disco-stage-dance-hall-party-indoor-bar-professional-background-light) |
| YUER | 4X50W WWA + 16X8W RGBW Led Par Light Flat Par Light LED PAR Equipment | par | 4 Zellen | 12CH Pixel | nein | [Link](https://yuerlights.com/products/4x50w-wwa-16x8w-rgbw-led-par-light-flat-par-light-led-par-lighting-equipment-stage-party-dyeing-light-dmx512-musci-control) |
| YUER | 27x6W RGBW 4in1 Par Light Performance Bar LED Wash Light LEDs | par | 27 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer-27x6w-rgbw-4in1-dj-par-light-party-wedding-performance-bar-disco-event-disco-led-wash-light-stage-effect-leds) |
| YUER | Mold 12x6W RGBWA 4 in 1 LED Par Light Wireless Dance Birthday | par | 12 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/new-mold-12x6w-rgbwa-4-in-1-led-par-light-wireless-remote-control-stage-light-for-dance-club-birthday-party-wedding-dj-disco) |
| YUER | 9x6W RGBW LED Flat Colorful Par Light Control DJLive Family Bar Light | par | 9 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/with-remote-control-9x6w-rgbw-led-flat-colorful-par-light-dmx512-control-for-djlive-disco-family-party-bar-stage-effect-light) |
| YUER | 7x6W RGBW 4in1 LED Par Light Wireless Dance Birthday | par | 7 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/new-7x6w-rgbw-4in1-led-par-light-wireless-remote-control-stage-light-for-dance-club-birthday-party-wedding-dj-disco) |
| YUER | Moving Head Laser Projector 3W 5W 8W RGB 20Kpps Scanning Aperture | movinghead / beam |  | 23CH | nein | [Link](https://yuerlights.com/products/proyektor-laser-kepala-bergerak-3w-5w-8w-rgb-pemindaian-20kpps-led-bantuan-apertur-untuk-dj-disko-dmx-512-mode-musik-suara-otomatis-rdm) |
| YUER | 10W Full Color RGB Pattern Scanning Effect Light Stage Projector | scanner |  | 12CH, 25CH | nein | [Link](https://yuerlights.com/products/10w-full-color-rgb-pattern-scanning-effect-light-stage-projector-dmx512-music-control-dj-disco-party-prom-bar-club-dance-floor) |
| YUER | 7X100W LED Pixel Retro Light Background Light bar Light 7pcs 100W | retro | 7 Zellen | 8CH, 32CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-stage-light-7x100w-led-pixel-retro-light-background-light-dj-nightclub-bar-light-7pcs-100w-warm-white-cob-led-168pcs-0-3w-rgb-3in1-5050-led) |
| YUER | Hot selling led Strip retro strobe light 6 high-brightness 60W beads | retro | 1 Zellen | 8CH, 28CH | nein | [Link](https://yuerlights.com/products/yuer-hot-selling-led-strip-retro-strobe-light-6-high-brightness-60w-lamp-beads-144-led-three-in-one-lamp-beads-nightclub-dj-disco-stage-wash-effect-light-professional-lighting-equipment) |
| YUER | RGBW LED Butterfly Light Strobe Beam Spot Effect Dance Butterfly | strobe |  | 8CH | nein | [Link](https://yuerlights.com/products/dmx-rgbw-led-butterfly-light-strobe-disco-dj-beam-spot-stage-lighting-effect-party-dance-club-wedding-butterfly) |
| YUER | 8X4W RGBW LED Dyeing Light Wall Washer Light DMX512 7CH | bar | 8 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/8x4w-rgbw-led-dyeing-light-wall-washer-light-dmx512-7ch-for-dj-disco-stage-wedding-music-party-bar-indoor-dance-floor-nightclub) |
| YUER | Fan Shaped 6 head Full Color Scanning Laser Light Spot Beam Effect | movinghead / matrix | 1 Zellen | 10CH | nein | [Link](https://yuerlights.com/products/fan-shaped-6-head-full-color-scanning-laser-light-spot-beam-effect-stage-projector-dmx512-voice-control-dj-disco-dance-floor) |
| YUER | 1000LED 5-segment RGB strobe light control light LED flash strobe | strobe |  | 6CH, 16CH | nein | [Link](https://yuerlights.com/products/new-1000led-5-segment-rgb-strobe-light-dmx-control-for-dj-disco-party-wedding-stage-effect-light-led-flash-strobe-light) |
| YUER | 10X10W RGBW 6 Head LED Beam Moving Head Light with RG Laser Effect | movinghead / matrix | 10 Zellen | 23CH | nein | [Link](https://yuerlights.com/products/remote-control-10x10w-rgbw-6-head-led-beam-moving-head-light-with-rg-laser-effect-dmx-stage-lighting-for-disco-music-bar-party) |
| YUER | Mold Mini 150W LED Bee Eye + 3 Prism Spot Moving Head Light Effect | movinghead / beeeye | 19 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/new-mold-mini-150w-led-bee-eye-3-prism-spot-moving-head-light-dj-dmx512-stage-light-effect-lighting-disco-dj-bar-dance-floor) |
| YUER | Kaleidoscope 4in1 Strobe Magic Ball Beam Effect | derby / orb | 1 Zellen | 16CH | nein | [Link](https://yuerlights.com/products/new-kaleidoscope-4in1-remote-dmx-stage-rg-laser-projector-strobe-magic-ball-lighting-beam-effect-dj-disco-party-holiday-wedding) |
| YUER | LED Beam Wash Zoom 250W Moving Head Lyre Beam Spot Sharpy Modes | movinghead / wash |  | 17CH, 20CH | nein | [Link](https://yuerlights.com/products/led-lights-beam-wash-zoom-250w-moving-head-stage-effect-lighting-lyre-dj-disco-night-club-wedding-beam-spot-sharpy-dmx512-modes) |
| YUER | Mini LED Moving Head Light 150W Beam+Spot+ 18 Rotating Prisms Effect | movinghead / spot |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer-new-mini-led-moving-head-light-150w-beam-spot-18-rotating-prisms-dj-dmx-stage-light-effect-light-disco-dj-music-party-bar) |
| YUER | Laser 6 Eyes Bar Light Fat Beam Laser RGB 6X500mw Control Moving Head | multibar | 6 Zellen | 12CH, 21CH | nein | [Link](https://yuerlights.com/products/yuer-dj-laser-6-eyes-bar-light-fat-beam-laser-rgb-6x500mw-dmx-control-moving-head-beam-laser-light-party-disco-wedding-stage) |
| YUER | RGBW LED 4in1 Effect Wash Beam Strobe Laser Control Sound Infinite | movinghead / matrix | 1 Zellen | 18CH | nein | [Link](https://yuerlights.com/products/rgbw-led-4in1-effect-wash-beam-strobe-laser-remote-dmx-control-sound-music-infinite-rotation-party-wedding-moving-stage-lighting) |
| YUER | LED 8x10w RGBW White Strobe RG Laser Bee Eye Effect Decoration 17CH | movinghead / beeeye | 8 Zellen | 17CH | nein | [Link](https://yuerlights.com/products/new-led-8x10w-rgbw-white-strobe-rg-laser-bee-eye-effect-stage-lighting-party-decoration-wedding-events-dmx-17ch-flash-rotation) |
| YUER | LED 6X15W RGBW Bee Eye Laser Moving Head Light 10/15CH Strobe Dyeing | movinghead / beeeye | 6 Zellen | 10CH, 15CH | nein | [Link](https://yuerlights.com/products/new-led-6x15w-rgbw-bee-eye-laser-moving-head-light-dmx512-10-15ch-strobe-dyeing-effect-lighting-dj-disco-stage-party-wedding-bar) |
| YUER | 350W Spot Zoom Moving Head Light CMY RDM 20CH Atomization Strobe | movinghead / matrix | 1 Zellen | 20CH, 22CH | nein | [Link](https://yuerlights.com/products/350w-spot-zoom-moving-head-light-cmy-rdm-dmx512-20ch-atomization-strobe-effect-stage-light-dj-disco-wedding-music-party-bar-club) |
| YUER | 350W Beam Spot Zoom cutting Moving Head Light 5 Prisms Strobe Eeffect | movinghead / spot |  | 26CH | nein | [Link](https://yuerlights.com/products/350w-beam-spot-zoom-cutting-moving-head-light-5-prisms-dmx-strobe-eeffect-for-stage-theater-dj-disco-performance-wedding-light) |
| YUER | Upside down Starry sky Grating pattern 3 in 1 Beam laser projector | effect |  | 13CH | nein | [Link](https://yuerlights.com/products/upside-down-starry-sky-grating-pattern-beam-laser-projector-strobe-effect-dmx512-for-dj-disco-stage-music-party-dance-floor-bar) |
| YUER | LED 280W Spot Zoom Strobe Effect 3IN1 Moving Head Light | movinghead / matrix | 64 Zellen | 26CH, 35CH | nein | [Link](https://yuerlights.com/products/yuer-new-led-280w-spot-zoom-strobe-effect-3in1-moving-head-light-for-dj-disco-stage-wedding-dance-floor-indoor-party-nightclub) |
| YUER | 6 Eyes Moving Head RGB Laser Bar Beam Strobe | multibar | 6 Zellen | 23CH, 29CH, 74CH | nein | [Link](https://yuerlights.com/products/6-eyes-moving-head-rgb-laser-bar-beam-strobe-stage-effect-lighting-for-dj-disco-party-events-dmx-sound-modes-projector-fixtures) |
| YUER | 4x15W RGBW 4in1 LED Par Can Wash Stage Effect Lighting | par | 4 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/4x15w-rgbw-4in1-led-par-can-wash-stage-effect-lighting-for-dj-disco-home-party-dmx-control-sound-auto-remote-modes) |
| YUER | 4x20W RGBW 4in1 LED Mini Bee Eye Led Moving Head Light Beam Effect | movinghead / beeeye | 4 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/new-4x20w-rgbw-4in1-led-mini-bee-eye-led-moving-head-light-beam-effect-dj-bar-light-stage-light-for-music-party-club-wedding-dmx) |
| YUER | Light Light Voice Control Laser Projector Light 5in1 RGB Effect | laser |  | 11CH, 24CH | nein | [Link](https://yuerlights.com/products/dj-disco-light-party-light-voice-music-control-ktv-laser-projector-light-5in1-rgb-effect-lamp-for-stage-party-bar-home-wedding) |
| YUER | Type 7 - Halo Hexa LED Pixel Light 1000W RGB LED | effect | 7 Zellen | 33CH | nein | [Link](https://yuerlights.com/products/new-type-disco-lights-7-halo-hexa-led-pixel-light-1000w-rgb-led-stage-lights-for-christmas-home-dj-ktv-xmas-wedding-show-pub) |
| YUER | Swinging 8 Eye Red Laser Rainband LED Full Color Beam Light Laser | multibar | 8 Zellen | 15CH, 31CH | nein | [Link](https://yuerlights.com/products/yuer-swinging-8-eye-red-laser-rainband-led-full-color-beam-light-dmx-dj-disco-laser-moving-head-light-bar-party-show-laser) |
| YUER | 8 Eyes Full Color RGB Laser Bar Light Stage Strobe Effect Projector | strobe |  | 15CH | nein | [Link](https://yuerlights.com/products/8-eyes-full-color-rgb-laser-bar-light-dmx512-stage-strobe-effect-projector-dj-disco-party-dance-floor-bar-club-music-restaurant) |
| YUER | LED 3000 Strobe Light Atomic 3000 Strobe Flash Light Professional | strobe |  | 3CH, 4CH, 14CH | nein | [Link](https://yuerlights.com/products/led-martin-3000w-dmx-strobe-light-atomic-3000-strobe-flash-light-professional-dj-disco-party-christmas-concert-stage-lighting) |
| YUER | LED 400W RGB White LED Strobe 4x100W LED Strobe Control Sound Flash | strobe | 4 Zellen | 1CH, 2CH, 6CH, 8CH, 12CH Pixel | nein | [Link](https://yuerlights.com/products/led-stage-light-400w-rgb-white-led-strobe-4x100w-dmx-led-strobe-control-sound-flash-party-wedding-holiday-dj-lighting-effect) |
| YUER | LED Cree RGB Laser Beam Marquee 3IN1 Multifunction Moving Head Light | movinghead / spot |  | 22CH, 28CH, 61CH | nein | [Link](https://yuerlights.com/products/yuer-led-cree-rgb-laser-beam-marquee-3in1-multifunction-moving-head-light-dmx512-stage-effect-laser-projector-voice-control) |
| YUER | ILDA 8W Animation Scanner RGB Laser Lines Beam Projector Dance Bar | laser |  | 18CH, 25CH | nein | [Link](https://yuerlights.com/products/yuer-new-ilda-8w-animation-scanner-rgb-laser-lines-beam-stage-light-projector-dmx-dj-disco-dance-bar-professional-laser-light) |
| YUER | 2W 3W Professional Animation Strobe Laser 3in1 Moving Head Light | movinghead / matrix | 1 Zellen | 6CH, 40CH | nein | [Link](https://yuerlights.com/products/2w-3w-professional-dj-disco-lights-animation-strobe-laser-3in1-moving-head-light-dmx-nightclub-party-show-stage-lighting-dmx512) |
| YUER | 200W LED Moving Head Lighting Stage Effect With Aperture | movinghead / beam |  | 19CH | nein | [Link](https://yuerlights.com/products/yuer-new-200w-led-moving-head-lighting-stage-effect-with-aperture-for-dj-disco-wedding-party-dmx512-auto-sound-modes-beam-spot) |
| YUER | 2W 3W RGB Full Color Animated Scanning Laser Light Laser Beam | laser |  | 5CH, 34CH | nein | [Link](https://yuerlights.com/products/new-2w-3w-rgb-full-color-animated-scanning-laser-light-laser-beam-projector-dmx512-for-dj-disco-stage-wedding-music-party-bar) |
| YUER | RGB 40X3W LED Wall Washer Light Strobe Dyeing Effect Light Single | strobe | 40 Zellen | 3CH | nein | [Link](https://yuerlights.com/products/new-rgb-40x3w-led-wall-washer-light-strobe-dyeing-effect-light-single-point-of-control-dmx512-for-dj-disco-stage-dance-music-bar) |
| YUER | 272W Beam Spot Light 48 Honeycomb Prism Moving Head Light /Bar / / / | movinghead / spot |  | 16CH, 20CH | nein | [Link](https://yuerlights.com/products/272w-beam-spot-light-48-honeycomb-prism-moving-head-light-dj-bar-party-show-christmas-stage-effect-light-led-stage-machine) |
| YUER | 60W Pattern Bee Eye Beam Dyeing Moving Head Light 16/18CH Stage | movinghead / beeeye | 19 Zellen | 16CH, 18CH | nein | [Link](https://yuerlights.com/products/yuer-60w-pattern-bee-eye-beam-dyeing-moving-head-light-dmx512-16-18ch-voice-control-dj-disco-stage-wedding-party-bar-club) |
| YUER | Professional 15W ILDA RGB 30/40KPP Scanner Laser Light Beam Line | laser |  | 18CH, 29CH | nein | [Link](https://yuerlights.com/products/professional-15w-ilda-rgb-30-40kpp-scanner-laser-light-dmx-beam-line-scanner-projector-stage-laser-lights-effect-for-party-night) |
| YUER | Mini LED Par Light 54W DMX Wireless RGBWA-UV 6IN1 | par |  | 6CH, 10CH | nein | [Link](https://yuerlights.com/products/mini-led-par-light-54w-dmx-wireless-rgbwa-uv-6in1-for-led-dj-party-stage-lights-wash-led-2-4ghz-wireless-remote-control-battery) |
| YUER | 4X30W COB Par Light Dyeing DMX512 8/9CH Voice Control | cob | 4 Zellen | 8CH, 9CH | nein | [Link](https://yuerlights.com/products/4x30w-cob-par-light-dyeing-dmx512-8-9ch-voice-control-for-dj-disco-stage-wedding-music-party-dance-floor-indoor-room-nighclub) |
| YUER | Battery Par LED Light WiFi App Control 6/10CH Wireless 4x18W RGBWAUV | par | 4 Zellen | 6CH, 10CH | nein | [Link](https://yuerlights.com/products/new-battery-par-led-light-wifi-app-control-6-10ch-dmx512-wireless-4x18w-rgbwauv-6in1-disco-dj-wedding-party-stage-lighting-bar) |
| YUER | 4 Red Laser + 4x5w LED RGBW Beam Laser Scanner Moving Head | movinghead / beam |  | 15CH, 23CH | nein | [Link](https://yuerlights.com/products/4-red-laser-4x5w-led-rgbw-beam-laser-scanner-moving-head-stage-light-for-party-christmas-disco-dj-indoor-night-club) |
| YUER | LED 4x5w Amber RED Laser Beam Strobe Flow Line Effect 8/17CH Bars | strobe | 4 Zellen | 8CH Pixel, 17CH Pixel | nein | [Link](https://yuerlights.com/products/led-4x5w-amber-red-laser-beam-strobe-flow-line-effect-dmx-8-17ch-bars-ktv-performing-stage-dance-halls-wedding-washing-lighting) |
| YUER | 24X4W LED PAR Light/ light RGBW par LED Strobe wash light stage | strobe | 24 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/new-mold-24x4w-led-par-light-disco-light-rgbw-par-dmx512-led-strobe-wash-light-stage-dj-equipment-party-dyeing-effect-light) |
| YUER | 24x4W 4in1RGBW LED Wall Wash Super Large Light Angle Control Device | bar | 24 Zellen | 6CH, 9CH, 16CH, 30CH, 58CH | nein | [Link](https://yuerlights.com/products/new-24x4w-4in1rgbw-led-wall-wash-super-large-light-angle-dmx-control-device-suitable-disco-dj-stage-bar-decoration) |
| YUER | 150W LED Lyre Moving Head Light Beam Spot 2IN1 LED Light Effect Shows | movinghead / spot |  | 6CH, 19CH | nein | [Link](https://yuerlights.com/products/new-150w-led-lyre-moving-head-light-beam-spot-2in1-led-light-party-dj-stage-lighting-effect-night-club-wedding-shows-projector) |
| YUER | LED 230W Spot Moving Head Light Beam Wash Zoom Pattern led Control | movinghead / spot |  | 6CH, 18CH | nein | [Link](https://yuerlights.com/products/led-230w-spot-moving-head-light-beam-wash-zoom-pattern-led-stage-effect-lights-dmx512-music-control-dj-disco-bar-lamp-equipment) |
| YUER | Professional LED 127Pcs RGB 3in1 Point Control Magic Par Light | par |  | 8CH | nein | [Link](https://yuerlights.com/products/professional-led-stage-lights-127pcs-rgb-3in1-point-control-magic-par-light-dmx512-master-slave-led-flat-for-dj-disco-party-ktv) |
| YUER | Mold Mini Infinite Rotation 3x50W LED Retro Flash Light flashing | retro | 3 Zellen | 19CH, 28CH | nein | [Link](https://yuerlights.com/products/new-mold-mini-infinite-rotation-3x50w-led-retro-flash-light-dmx512-dj-party-flashing-lights-dance-club-disco-stage-effect-light) |
| YUER | Men’s 5-in-1 Electric Shaver LED Wash Laser Crystal Magic Ball 3IN1 | derby / orb | 1 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/4pcs-lot-led-wash-laser-crystal-magic-ball-3in1-moving-head-light-crystal-magic-ball-stage-effect-lamp-dj-disco-club-laser-show) |
| YUER | LED 100W Spot Beam Moving Head Light 18 Face Prism Sound Light Dance | movinghead / spot |  | 12CH | nein | [Link](https://yuerlights.com/products/yuer-new-led-100w-spot-beam-moving-head-light-18-face-prism-dmx512-sound-dj-stage-effect-light-party-dance-disco-bar-music-club) |
| YUER | RGB 3IN1 LED Strobe Light Super Strobe Effect 7/13/148CH | strobe |  | 7CH, 13CH | nein | [Link](https://yuerlights.com/products/144pcs-rgb-3in1-led-strobe-light-super-strobe-effect-lighting-dmx-7-13-148ch-for-dj-disco-stage-wedding-music-party-bar-indoor) |
| YUER | Waterproof IP65 5X72W 1800K COB LED Amber Warm Bar | cob | 5 Zellen | 5CH Pixel, 7CH Pixel, 11CH Pixel | nein | [Link](https://yuerlights.com/products/new-waterproof-ip65-5x72w-1800k-cob-led-amber-warm-bar-stage-effect-lighting-for-dj-party-disco-outdoor-wall-wash-lamp-dmx512) |
| YUER | LED Bar Light 40x0.5W SMD RGB 3IN1 Pixel rigid strip Control Digital | bar | 40 Zellen | 8CH | nein | [Link](https://yuerlights.com/products/led-bar-light-40x0-5w-smd-rgb-3in1-pixel-rigid-strip-control-digital-dream-bar-dj-party-club-multi-color-led-light-strips-lights) |
| YUER | 6x10W RGBW 4in1 Beam +6pcs Red Laser 6 Head Moving Head Light Beam | movinghead / matrix | 6 Zellen | 8CH, 13CH, 38CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x10w-rgbw-4in1-beam-6pcs-red-laser-6-head-moving-head-light-beam-laser-effect-dmx512-for-dj-disco-wedding-event-party-bar-club) |
| YUER | 6x50W Warm White COB + 6x10W RGBW 4in1 LED Bee Eye + 72x0.5W LED | movinghead / beeeye | 6 Zellen | 18CH Pixel, 25CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x50w-warm-white-cob-6x10w-rgbw-4in1-led-bee-eye-72x0-5w-led-retro-light-bee-eye-wash-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | IP65 Waterproof 19x60W RGBL LED Zoom Moving Head Light With Ring CMY | movinghead / beeeye | 38 Zellen | 28CH, 30CH, 42CH, 85CH, 99CH, 104CH, 106CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-ip65-waterproof-19x60w-rgbl-led-zoom-moving-head-light-with-ring-cmy-point-control-bee-eye-effect-dmx512-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 7x40W RGBW Bee Eye Wash Moving Head Light With 5W RGB Full-color | movinghead / beeeye | 7 Zellen | 37CH Pixel, 65CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x40w-rgbw-bee-eye-wash-moving-head-light-with-5w-rgb-full-color-animation-laser-dmx512-app-control-for-dj-disco-party-bar-club-wedding-stage-lighting) |
| YUER | 80W RGBW 4in1 Beam + 48X2W RGB Retro Backlight With RGB Ring Wash | retro | 1 Zellen | 10CH, 18CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-80w-rgbw-4in1-beam-48x2w-rgb-retro-backlight-with-rgb-ring-wash-effect-stage-lighting-dmx512-for-dj-disco-club-wedding-party-bar) |
| YUER | 6x10W RGBW Beam Battle Shadow Six Arm Magic Ball Moving Head Effect | effect | 6 Zellen | 23CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x10w-rgbw-beam-battle-shadow-six-arm-magic-ball-moving-head-effect-light-with-white-gold-strobe-rg-laser-kaleidoscope-effect-dmx512-sound-control-for-dj-disco-bar-ktv-club) |
| YUER | 6x10w RGBW Beam 6-Arm Super Magic Ball Donkey Kong Moving Head Effect | effect | 6 Zellen | 25CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-6x10w-rgbw-beam-6-arm-super-magic-ball-donkey-kong-moving-head-effect-light-with-iridescent-light-strips-white-gold-strobe-rg-laser-effect-dmx512-sound-control-for-dj-disco-bar-ktv) |
| YUER | LED Waterproof 18X10W RGBWA+UV Battery Floodlight With Wash Wireless | panel |  | 6CH, 8CH, 10CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fnew-led-waterproof-18x10w-rgbwa-uv-battery-floodlight-with-wash-sound-control-wireless-dmx512-for-dj-disco-party-wedding-club) |
| YUER | Copy Martin Waterproof IP65 LED 19X40W RGBW 4IN1 +114PCS LED Beads | movinghead / wash |  | 7CH, 17CH, 29CH, 32CH, 37CH, 46CH, 94CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-copy-martin-waterproof-ip65-led-19x40w-rgbw-4in1-114pcs-led-beads-moving-head-light-with-ring-wash-zoom-storbe-effect-rdm-dmx512-for-stage-effect-equipmen) |
| YUER | Waterproof IP68 LED 19X15W RGBW Par Light Zoom Strobe Effect Circle | strobe | 19 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fwaterproof-ip68-led-19x15w-rgbw-par-light-zoom-strobe-effect-circle-control-voice-control-dmx512-for-dmx-dj-disco-dance-bar-professional-laser-light) |
| YUER | Waterproof IP66 18X40W RGBW 4IN1 Wall Washer Light Master-Slave | bar | 18 Zellen | 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fwaterproof-ip66-18x40w-rgbw-4in1-wall-washer-light-master-slave-control-dmx512-for-dj-disco-bar-club-party-dance-wedding-effect-show) |
| YUER | 6 Eyes 6X50W COB + RGB Flood Blinder Light Adjustable Telescopic | blinder | 6 Zellen | 15CH, 33CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-6-eyes-6x50w-cob-rgb-flood-blinder-light-adjustable-telescopic-dmx512-for-dj-stage-lighting-effect-disco-bar-wedding-party) |
| YUER | LED 19X10W RGBW 4IN1 Moving Head Light With Ring Beam Wash Zoom | movinghead / matrix | 19 Zellen | 18CH, 26CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-led-19x10w-rgbw-4in1-moving-head-light-with-ring-beam-wash-zoom-strobe-effect-dmx512-for-dj-lights-for-disco-ktv-bar-party) |
| YUER | Waterproof IP66 LED 19X80W RGBW 4IN1 Bee Eye Moving Head Light Beam | movinghead / beeeye | 19 Zellen | 27CH, 41CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fwaterproof-ip66-led-19x80w-rgbw-4in1-bee-eye-moving-head-light-beam-wash-zoom-fx-dmx512-for-party-disco-club-light-dj) |
| YUER | 4x80W LED RGBW 4IN1 Moving Head Beam Light With Ring Infinite | movinghead / beam |  | 26CH, 81CH, 91CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x80w-led-rgbw-4in1-moving-head-beam-light-with-ring-infinite-rotation-wash-dmx512-stage-effect-for-dj-disco-wedding-party-club) |
| YUER | LED Waterproof IP65 18X10W RGBW Par Light With Wash Strobe Effect | strobe | 18 Zellen | 3CH, 4CH, 7CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-waterproof-ip65-18x10w-rgbw-par-light-with-wash-strobe-effect-voice-control-dmx512-for-disco-dj-projector-party-decoration-night-light) |
| YUER | LED Waterproof IP65 19X10W RGBW Par Light With Wash Strobe Effect | strobe | 19 Zellen | 3CH, 4CH, 7CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fled-waterproof-ip65-19x10w-rgbw-par-light-with-wash-strobe-effect-voice-control-dmx512-for-disco-dj-projector-party-decoration-night-light) |
| YUER | Mini Waterproof IP65 19X40W RGBW 4IN1 Moving Head Light With Ring | movinghead / wash |  | 14CH, 25CH, 30CH, 54CH, 58CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8Fmini-waterproof-ip65-19x40w-rgbw-4in1-moving-head-light-with-ring-beam-wash-zoom-rdm-dmx512-for-dj-bar-wedding-stage-party) |
| YUER | 6X10W RGBW 4in1 Double Head Moving Head Beam Light With LED Ring | movinghead / beam |  | 19CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-6x10w-rgbw-4in1-double-head-moving-head-beam-light-with-led-ring-2x50mw-red-2x50mw-green-lasers-effect-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | 12X10W 4 Head Moving Head Beam Light With LED Ring 2X100mw Red+2X50mw | movinghead / matrix | 6 Zellen | 21CH, 33CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-12x10w-4-head-moving-head-beam-light-with-led-ring-2x100mw-red-2x50mw-green-lasers-effect-dmx512-for-dj-disco-party-stage-effect-lighting-night-club-bar-light) |
| YUER | Waterproof IP65 10X60W RGBW 4IN1 LED Moving Head Beam Light With 96 | movinghead / matrix | 10 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-waterproof-ip65-10x60w-rgbw-4in1-led-moving-head-beam-light-with-96-golden-light-96-cold-light-96-rgb-strobe-effect-dmx512-for-disco-dance-floor-bar-party-nightclub) |
| YUER | LED 6X10W RGBW 4IN1 6 Head Moving Head Beam Light With RG Laser | movinghead / matrix | 6 Zellen | 24CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-6x10w-rgbw-4in1-6-head-moving-head-beam-light-with-rg-laser-strobe-light-dmx512-for-stage-light-beam-light-rotating-disco-party-bar) |
| YUER | IP65 Waterproof 7X60W RGBW 4in1 Bee Eye Wash Moving Head Light Control | movinghead / beeeye | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-ip65-waterproof-7x60w-rgbw-4in1-bee-eye-wash-moving-head-light-dmx512-control-for-dj-disco-bar-party) |
| YUER | LED 19x15W RGBW 4IN1 Wash Moving Head Zoom Light With LED Aperture | movinghead / wash | 19 Zellen | 17CH, 25CH | nein | [Link](https://yuerlights.com/products/lyuer%E2%84%A2%EF%B8%8F-led-19x15w-rgbw-4in1-wash-moving-head-zoom-light-with-led-aperture-for-dj-bar-stage-ktv-nightclub) |
| YUER | 18X10W LED RGBW 4in1 IP65 Waterproof Wall Washer Light Adjustable | bar | 18 Zellen | 4CH, 8CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-18x10w-led-rgbw-4in1-ip65-waterproof-wall-washer-light-dmx512-adjustable-beam-auto-sound-activated-master-slave-control-for-stage-event-outdoor-dj-nightclub-concert) |
| YUER | 19x15W RGBW 4in1 Zoom LED Beam Wash Moving Head Light Professional | movinghead / wash | 19 Zellen | 14CH, 26CH, 30CH | nein | [Link](https://yuerlights.com/products/new-9x15w-rgbw-4in1-zoom-led-beam-wash-moving-head-light-professional-dmx-control-beam-lights-for-christmas-disco-dj-parties) |
| YUER | IP65 Waterproof 7X40W LED RGBW 4in1 Wash Beam Zoom Effect Par | strobe | 7 Zellen | 11CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-7x40w-led-rgbw-4in1-wash-beam-zoom-effect-par-lights-aluminum-case-strobe-dmx-music-dj-disco-stage-chirstmas-background) |
| YUER | Copy ROBE 18x40W RGBW LED ZOOM BAR Scanning Point Control Moving Head | movinghead / beam |  | 34CH, 56CH, 97CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-copy-robe-18x40w-rgbw-led-zoom-bar-scanning-point-control-moving-head-beam-light-for-party-ktv-disco-dj) |
| YUER | 19x15w LED RGBW 4in1 Wash Beam Zoom Effect Par Aluminum Case Strobe | strobe | 19 Zellen | 17CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-19x15w-led-rgbw-4in1-wash-beam-zoom-effect-par-lights-aluminum-case-strobe-dmx-music-dj-disco-stage-chirstmas-background) |
| YUER | 4x80W LED beam moving head Bar light RGBW 4in1 with ring | tiltbar | 4 Zellen | 8CH, 12CH, 23CH Pixel, 36CH Pixel, 60CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2-4x80w-led-beam-moving-head-bar-light-rgbw-4in1-with-ring-dmx512-stage-effect-lighting-for-dj-disco-wedding-party-club) |
| YUER | Mold Waterproof IP66 7X40W RGBW 4 in 1 LED Bee Eyes Zoom Moving Head | movinghead / beeeye | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-mold-waterproof-ip66-7x40w-rgbw-4-in-1-led-bee-eyes-zoom-moving-head-light-dmx-beam-wash-stage-dj-disco-party-light) |
| YUER | 10x35W Halogen Light Warm White Strobe Bar Flashing Horse Running RDM | strobe | 10 Zellen | 1CH, 2CH, 4CH, 5CH, 10CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-10x35w-halogen-light-warm-white-strobe-bar-flashing-horse-running-dmx-rdm-control-dj-disco-background-show-party-stage-lamp) |
| YUER | 7x40W RGBW 4IN1 LED Bee Eye Zoom Moving Head Light 23/35/51Ch CTO | movinghead / beeeye | 7 Zellen | 23CH, 35CH Pixel, 51CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-7x40w-rgbw-4in1-led-bee-eye-zoom-moving-head-light-dmx-512-23-35-51ch-stage-lights-cto-dyeing-beam-zoom-effect-lighting) |
| YUER | 6x40W LED Head Bee Eye Led Beam Moving Head Wash Light With LED Strip | movinghead / beeeye | 6 Zellen | 18CH Pixel, 23CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-6x40w-led-head-bee-eye-led-beam-moving-head-wash-light-stage-lights-with-led-strip-dj-stage-light-effect-light-disco-wedding-bar) |
| YUER | LED Beam10x60W RGBW LED 3w Warm Cold White 0.3W RGB 4in1 Wash Strobe | tiltbar | 10 Zellen | 7CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-beam10x60w-rgbw-led-3w-warm-cold-white-0-3w-rgb-4in1-wash-strobe-horse-racing-effect-moving-bar-stage-lighting-for-dj-disco) |
| YUER | Professional Beetle LED Beam laser strobe 3in1 Moving Head Beetle | movinghead / matrix | 1 Zellen | 24CH | nein | [Link](https://yuerlights.com/products/yuer-professional-dj-disco-beetle-lights-led-beam-laser-strobe-3in1-moving-head-beetle-light-dmx-nightclub-party-show-stage-lighting) |
| YUER | 6x10W LED Bee Eyes Gobo Moving Head Light 100W Beam Spot RGBW Super | movinghead / beeeye | 6 Zellen | 9CH, 14CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-6x10w-led-bee-eyes-gobo-moving-head-light-100w-beam-spot-rgbw-stage-lighting-super-smooth-dimming-for-wedding-party-dmx-9-14ch) |
| YUER | Full-Color 144X3W Pixel Light LED Strobe Light DMX Control | strobe |  | 3CH, 6CH, 52CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-full-color-144x3w-pixel-light-led-strobe-light-dmx-control-for-party-wedding-holiday-stage-lighting-effect) |
| YUER | Professional Entertainment Led Light 7X60W Big Bee Eye Moving Head | movinghead / beeeye | 7 Zellen | 21CH, 23CH, 35CH Pixel, 42CH Pixel, 49CH Pixel, 51CH Pixel, 56CH Pixel | nein | [Link](https://yuerlights.com/products/yuer-new-professional-entertainment-led-light-stage-light-7x60w-big-bee-eye-moving-light-control-projector-led-moving-head-light) |
| YUER | 10x40W LED Scanning Point Control Moving Head Beam Light RGBW 4IN1 | movinghead / matrix | 10 Zellen | 43CH Pixel | nein | [Link](https://yuerlights.com/products/10x40w-led-scanning-point-control-moving-head-beam-light-rgbw-4in1-wall-bar-stage-matrix-dyeing-for-party-ktv-disco-dj) |
| YUER | LED Matrix 10x12W RGBW 4in1 Good | strobe | 10 Zellen | 4CH, 6CH, 9CH, 40CH Pixel, 42CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-led-matrix-lights-10x12w-rgbw-4in1-dmx512-stage-effect-lighting-good-for-dj-disco-party-dance-floor-clubs-bar-and-wedding-decorations) |
| YUER | 12X10W RGBW LED Beam Laser Strobe Beam Laser Effect Projector | strobe | 12 Zellen | 16CH, 64CH Pixel | nein | [Link](https://yuerlights.com/products/12x10w-rgbw-led-beam-laser-lights-strobe-beam-laser-effect-projector-dmx512-for-dj-wedding-disco-stage-dance-floor-bar-party) |
| YUER | Mold 12X10W 3 head infinitely rotating moving head light With RGB | movinghead / matrix | 12 Zellen | 15CH | nein | [Link](https://yuerlights.com/products/new-mold-12x10w-3-head-infinitely-rotating-moving-head-light-with-rgb-laser-light-for-dj-disco-stage-wedding-music-party-bar) |
| YUER | 4x40W Head LED Beam Moving Head With Auxiliary Bar 40W RGBW 4in1 Beam | movinghead / beam |  | 25CH, 32CH, 53CH | nein | [Link](https://yuerlights.com/products/yuer-4x40w-head-led-beam-moving-head-lighting-with-auxiliary-bar-dj-lights-stage-lighting-40w-rgbw-4in1-beam-wash-effect-dmx512) |
| YUER | 7x60W unique LED Wall Wash Light Led Bar Line Bar Wash | bar | 1 Zellen | 21CH, 63CH | nein | [Link](https://yuerlights.com/products/7x60w-unique-led-wall-wash-light-dmx-led-bar-dmx-line-bar-wash-stage-light-for-wedding-dj-point-control-portman-retro-lamp) |
| YUER | 7x60W LED Retro Flash Light Professional Decorate Bar Stage Night | retro | 1 Zellen | 6CH, 7CH | nein | [Link](https://yuerlights.com/products/new-music-stage-lighting-7x60w-led-retro-flash-light-dmx512-professional-decorate-disco-dj-party-bar-stage-lamp-night-light-1) |
| YUER | 450W 36X12W RGBW 4IN1 Focusing Moving Head Light Effect Control | movinghead / beam |  | 15CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-450w-36x12w-focusing-moving-head-light-stage-lighting-effect-dmx-control-for-dj-disco-nightclub-ktv-bar-theater) |
| YUER | LED 7X60W RGBW 4IN1Retro Flash 168pcs SMD5050 RGB Stage Strobe Effect | retro | 7 Zellen | 4CH, 6CH, 28CH Pixel, 30CH Pixel | nein | [Link](https://yuerlights.com/products/2021-disco-led-7x60w-rgbw-4in1retro-flash-168pcs-smd5050-rgb-stage-strobe-effect-light-for-concert-dj-wedding-led-club-party) |
| YUER | 18X10W RGBW 4IN1/18X15W RGBWA 5IN1/18X18W RGBWA+UV 6IN1 LED Bar Wall | bar | 10 Zellen | 8CH, 9CH | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-new-arrival-18x10w-rgbw-4in1-18x15w-rgbwa-5in1-18x18w-rgbwa-uv-6in1-led-bar-wall-washer-lights-dmx512-washer-floodlights-dj-bar-party-show-stage-lighting) |
| YUER | 200W Sound Effect 18x18W RGBWA+UV 6IN1 LED Flat Par Light Par Light | par | 18 Zellen | 8CH, 9CH, 10CH | nein | [Link](https://yuerlights.com/products/new-200w-sound-music-effect-stage-light-18x18w-rgbwauv-6in1-led-flat-par-light-disco-par-light-wedding-party-holiday-spotlight) |
| YUER | LED Waterproof Par Light 18x10W RGBW 4IN1/18x15W RGBWA 5IN1/18x18W | par | 18 Zellen | 4CH, 5CH, 6CH, 8CH, 9CH, 10CH, 65CH Pixel | nein | [Link](https://yuerlights.com/products/led-waterproof-par-light-18x10w-rgbw-led-stage-light-par-light-with-dmx512-for-disco-dj-projector-party-decoration-night-light) |
| YUER | LED 6x50w High Bright Amber + 72PCS RGB LED Retro Background Light | retro | 6 Zellen | 8CH, 28CH Pixel | nein | [Link](https://yuerlights.com/products/yuer%E2%84%A2%EF%B8%8F-hot-selling-led-strip-retro-strobe-light-6-high-brightness-50w-lamp-beads-72-leds-three-in-one-lamp-bead-nightclub-dj-disco-stage-wash-effect-light-professional-lighting-equipment) |
| YUER | Projector 4IN1 6X10W Bee Eye Laser Strobe Light Dance Floor Bar Game | movinghead / beeeye | 6 Zellen | 11CH | nein | [Link](https://yuerlights.com/products/2021-stage-effect-projector-4in1-6x10w-bee-eye-laser-strobe-light-dmx512-dance-floor-bar-game-party-dj-disco-music-control) |
| YUER | 7X40W Bee Eye Zoom LED Moving Head Light 0SRAM LED Beads 23/35/51CH | movinghead / beeeye | 19 Zellen | 23CH, 35CH, 51CH | nein | [Link](https://yuerlights.com/products/7x40w-bee-eye-zoom-led-moving-head-light-0sram-led-lamp-beads-dmx512-23-35-51ch-dyeing-beam-strobe-effect-dj-disco-stage-weeding) |
| YUER | 6X10W RGBW 4IN1 LED Bee Eyes Beam Par Light | movinghead / beeeye | 6 Zellen | 5CH, 8CH | nein | [Link](https://yuerlights.com/products/2020-free-shipping-hot-sales-6x10w-rgbw-4in1-led-bee-eyes-beam-par-light-for-stage-dj-disco-party-club-bar-laser-effect-lighting) |
| YUER | 6x40W Pixels Control RGBW 4in1 LED Bee Eye Moving Head Wash Light | movinghead / beeeye | 6 Zellen | 21CH, 24CH Pixel, 32CH Pixel, 56CH Pixel | nein | [Link](https://yuerlights.com/products/new-6x40w-pixels-control-rgbw-4in1-led-bee-eye-moving-head-wash-light-zoom-dmx-dj-disco-theatre-stage-party-effect-lights) |
| YUER | Professional 12x40W LED RGBW 4in1 Zoom Wash LED Moving Head Light | movinghead / wash | 12 Zellen | 16CH, 21CH | nein | [Link](https://yuerlights.com/products/professional-12x40w-led-rgbw-4in1-zoom-wash-led-moving-head-light-beam-effect-light-for-dj-bar-stage-ktv-nightclub) |
| YUER | LED Beam Wash Bees Eyes 12x40w RGBW Zoom Moving Head Light | movinghead / beeeye | 12 Zellen | 21CH, 25CH, 33CH, 81CH | nein | [Link](https://yuerlights.com/products/yuer-led-beam-wash-bees-eyes-12x40w-rgbw-zoom-moving-head-light-stage-effect-lighting-for-party-dj-disco-wedding-dance-floor-bar) |
| YUER | LED 6x10W Zoom Wash LED Moving Head Light RGBW 4in1 Effect | movinghead / wash | 6 Zellen | 17CH, 38CH Pixel | nein | [Link](https://yuerlights.com/products/led-6x10w-zoom-wash-led-moving-head-light-rgbw-4in1-dmx-stage-light-effect-disco-stage-lighting-professionals-wedding) |
| YUER | 7x40W Beam Stage Moving Head light Electronic Zoom LED RGBW Bee Eye | movinghead / beeeye | 7 Zellen | 21CH, 24CH, 32CH Pixel, 60CH Pixel | nein | [Link](https://yuerlights.com/products/led-rgbw-7x40w-beam-stage-moving-head-electronic-zoom-wedding-party-bee-eye-effect-dmx-music-control-dj-disco-rdm-bar-lamp) |
