# Fixture-Recherche

Grundlage der rund 3 500 eigenen Lampen-Definitionen von VD-Link (EPL-2.0). `npm run vd-fixtures` baut daraus die
Definitionen in `public/fixtures/vd/` und die Liste [`docs/FIXTURES-VD.md`](../FIXTURES-VD.md).

## Dateien

| Datei | Inhalt |
|---|---|
| `<hersteller>.json` | Eckdaten je Modell aus öffentlichen Herstellerseiten: Bauform, Lichtquelle, Kanalzahlen, Funktionen, Winkel, Link zur Produktseite |
| `modes/<hersteller>.json` | Steckbriefe im Format von `tools/vd-fixtures/archetype.ts` (`Spec`), direkt baubar |
| `modes/missing-data.json` | Modelle ohne belegte Kanalzahl – noch keine Definition |
| `modes/possible-duplicates.json` | Einträge, die vermutlich schon in der Bibliothek stehen (bewusst nicht übernommen) |
| `models.json` | 3D-Hinweise je Modell (Bauform, LED-Anordnung, Maße) |
| `groups.json` | Zuordnung Herstellerdatei → Gruppe (1 High-End/Touring, 2 Mittelklasse/Club, 3 China-Direktvertrieb, 4 China-OEM) |

## Methode

- **Nur Fakten, keine Texte:** Werte stammen aus öffentlichen Produktseiten, Datenblättern und DMX-Tabellen der Hersteller.
  Beschreibungen wurden nicht übernommen. `robots.txt` und Crawl-Delays wurden beachtet.
- **Geprüft = nein** (die meisten): Kanalzahl und Funktionen kommen aus den Herstellerangaben, die Reihenfolge der Kanäle
  folgt dem typischen Schema der Lampenart. Vor einer Show mit dem Handbuch vergleichen – die Bibliothek weist darauf hin.
- **Geprüft = ja:** Kanalfolge und Wertebereiche wurden aus dem DMX-Protokoll des Herstellers in eigene Daten übertragen.
- **Plausibilität:** Unplausible Kanalzahlen (z. B. ≥ 512 oder gleich der LED-Anzahl) werden verworfen, gleiche
  Shop-Einträge zusammengefasst, Modelle, die schon in der Open Fixture Library oder bei QLC+ stehen, übersprungen.

Fehlt eine Lampe oder stimmt eine Belegung nicht? Bitte ein Issue mit der Vorlage „Fixture fehlt oder falsch“ – am besten
mit Link zum DMX-Protokoll.
