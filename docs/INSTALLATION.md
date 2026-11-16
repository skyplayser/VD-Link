# VD-Link installieren

Unten unter **Assets** die passende Datei herunterladen:

| System | Datei |
|---|---|
| Mac mit Apple-Chip (M1–M4) | `VD-Link-macos-arm64.dmg` |
| Mac mit Intel-Chip | `VD-Link-macos-x64.dmg` |
| Windows 10/11 (64 Bit) | `VD-Link-windows.exe` |

Welcher Mac? Apple-Menü → **Über diesen Mac** → steht bei „Chip“ *Apple M…*, ist es die arm64-Datei.

VD-Link ist noch nicht bei Apple bzw. Microsoft signiert. Beide Systeme warnen deshalb beim ersten Start einmalig – das ist erwartet.

## macOS (ab macOS 13)

1. DMG öffnen und **VD-Link** in den Ordner **Programme** ziehen.
2. VD-Link aus Programme starten. macOS meldet „VD-Link kann nicht geöffnet werden …“ → **Fertig** bzw. **OK** klicken.
3. **Systemeinstellungen → Datenschutz & Sicherheit**, ganz nach unten: bei „VD-Link wurde blockiert …“ auf **Trotzdem öffnen** klicken und bestätigen.
4. Für Videowände mit VJ-Link: beim ersten virtuellen Monitor die Freigabe **Bildschirmaufnahme** erlauben (Datenschutz & Sicherheit → Bildschirm- & Systemaudioaufnahme → VD-Link einschalten) und VD-Link neu starten.

Falls macOS stattdessen „VD-Link ist beschädigt“ meldet, im Terminal einmal ausführen und danach normal starten:

```bash
xattr -cr /Applications/VD-Link.app
```

Nach einem Update muss die Bildschirmaufnahme-Freigabe eventuell neu erteilt werden (Eintrag VD-Link entfernen und neu hinzufügen).

## Windows

1. `VD-Link-windows.exe` starten.
2. Erscheint „Der Computer wurde durch Windows geschützt“: **Weitere Informationen → Trotzdem ausführen**.
3. Installationsordner wählen und installieren. VD-Link liegt danach im Startmenü und auf dem Desktop.
4. Beim ersten Start fragt die Windows-Firewall nach Netzwerkzugriff: **Private Netzwerke** erlauben, sonst kommt kein Art-Net/sACN an.

Virtuelle Monitore für VJ-Link gibt es bisher nur unter macOS.

## Erster Test

Ohne Pult startet VD-Link mit einer Demo-Show. Pult verbinden: Art-Net oder sACN an die IP-Adresse senden, die auf dem Startbildschirm steht.
