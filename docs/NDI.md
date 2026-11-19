# NDI®-Streams auf den Videowänden

NDI® ist eine eingetragene Marke der Vizrt NDI AB. VD-Link ist kein Produkt von NDI und wird von NDI weder unterstützt
noch geprüft. Mehr zu NDI: [ndi.video](https://ndi.video/)

VD-Link kann auf jeder Videowand einen NDI-Stream aus dem Netzwerk zeigen, etwa die Ausgabe von VJ-Link, Resolume, OBS
oder einer NDI-Kamera. VD-Link **empfängt** dabei nur und sendet selbst keine Streams.

## Einrichten

1. **NDI-Laufzeit installieren.** VD-Link nutzt die kostenlose NDI-Laufzeit von NDI und liefert sie nicht mit. Sie ist
   in den [NDI Tools](https://ndi.video/tools/) enthalten. Für macOS gibt es sie auch einzeln unter
   [ndi.link/NDIRedistV6Apple](https://ndi.link/NDIRedistV6Apple), für Windows unter
   [ndi.link/NDIRedistV6](https://ndi.link/NDIRedistV6). Fehlt die Laufzeit, zeigt VD-Link unter **VIDEOWÄNDE** einen
   Knopf zum Download.
2. **VIDEOWÄNDE** öffnen. VD-Link sucht jetzt NDI-Quellen im Netzwerk. Gefundene Quellen stehen in der Auswahl
   **Quelle** unter „NDI®“. Taucht eine Quelle später auf, hilft **Neu suchen**.
3. Quelle wählen. Die Wand zeigt das Bild unverzerrt (bei anderem Seitenverhältnis mit schwarzem Rand). Bei geteilten
   Ausgängen bekommt jede Fläche ihren Pixel-Ausschnitt, wie bei einem HDMI-Ausgang.
4. **NDI-Vorschauqualität** nimmt den kleineren Vorschau-Stream der Quelle. Das spart Netz und Rechenleistung, etwa im
   WLAN oder bei vielen Wänden.
5. **Bild auf Ausgang** legt fest, was passiert, wenn das NDI-Bild eine andere Größe hat als der Ausgang:
   - **Einpassen** (Standard): Das ganze Bild ist zu sehen, unverzerrt, mit schwarzen Rändern.
   - **1:1 Pixel ab Position**: Der Ausgang nimmt seine Pixel ab der Position x/y aus dem NDI-Bild, wie ein
     LED-Prozessor, der einen Teil eines größeren Signals zeigt.
   - **Strecken**: Das Bild füllt den Ausgang und wird dabei verzerrt.

   Am besten sendet die Quelle genau in der Größe des Ausgangs, etwa 2816 × 640 für eine Reihe LED-Wände an einem
   HDMI-Ausgang. In VJ-Link geht das unter **AUSGABE → NDI®-Ausgang → Eigene Größe**. Passt die Größe nicht, zeigt
   VD-Link einen Hinweis.
6. **Bei Signalverlust**: Kommt 1,5 Sekunden lang kein Bild, zeigt der Status „Verbindung verloren“. Die Wand zeigt
   dann wahlweise Schwarz (Standard), das letzte Bild oder das Testbild. Sobald die Quelle wieder sendet, verbindet
   VD-Link von selbst.

Quelle, Bild auf Ausgang, Signalverlust und Helligkeit werden im Projekt gespeichert. Beim Öffnen verbindet sich jede
Wand wieder mit ihrer NDI-Quelle, sobald diese im Netz ist. Zeigen mehrere Wände dieselbe Quelle, empfängt VD-Link
sie nur einmal.

Die Firewall muss NDI durchlassen. NDI findet Quellen per mDNS (Bonjour) und überträgt über TCP/UDP. Windows fragt beim
ersten Mal nach. Unter macOS braucht VD-Link die Freigabe „Lokales Netzwerk“.

## Wie VD-Link NDI einbindet (Lizenz)

Grundlage sind der NDI SDK License Agreement (Stand November 2024, [ndi.link/ndisdk_license](https://ndi.link/ndisdk_license))
und die Hinweise zur Lizenz und zur Weitergabe in der [NDI-SDK-Dokumentation](https://docs.ndi.video/all/developing-with-ndi/sdk/licensing).

- **Keine NDI-Dateien im Repository oder Installer.** VD-Link lädt die vom Nutzer installierte NDI-Laufzeit zur
  Laufzeit (dynamisches Laden). NDI empfiehlt dieses Verfahren für Open-Source-Projekte. VD-Link verteilt weder die
  NDI-Laufzeit noch die NDI Tools.
- **Schnittstelle.** Die wenigen Deklarationen in `electron/ndi/ndi-lib.ts` folgen den Header-Dateien des NDI SDK. NDI
  veröffentlicht diese unter der MIT-Lizenz (Copyright © 2023–2026 Vizrt NDI AB), siehe `THIRD_PARTY.md`.
- **Marke.** „NDI®“ steht bei der ersten Nennung je Seite, der Hinweis „NDI® ist eine eingetragene Marke der Vizrt NDI
  AB“ steht im Programm (Videowände, Über VD-Link), in der README und hier. Neben der NDI-Auswahl im Programm steht ein
  Link zu ndi.video. Der Name NDI wird nur verwendet, um die Kompatibilität zu benennen, nicht im Produktnamen.
- **Aktuell bleiben.** NDI verlangt aktuelle und vollständige NDI-Kompatibilität. VD-Link nutzt die jeweils installierte
  Laufzeit (NDI 6, NDI 5 als Rückfall), Updates kommen direkt von NDI.

### Bedingungen für die NDI-Teile

Diese Bedingungen gelten zusätzlich zur Eclipse Public License 2.0 von VD-Link und betreffen **nur** die NDI-Laufzeit,
das NDI SDK und die NDI-Produkte, nicht den Code von VD-Link:

- Die NDI-Laufzeit, das NDI SDK und die NDI-Produkte dürfen nicht verändert, zurückentwickelt, disassembliert oder neu
  kompiliert werden. Das gilt auch für die Protokolle, die NDI im Netzwerk oder lokal verwendet, und für Versuche dazu.
- Technische Beschränkungen der NDI-Software dürfen nicht umgangen werden.
- Urheber- und Markenhinweise von NDI dürfen nicht entfernt, verdeckt oder verändert werden.
- NDI-Laufzeit und NDI-Software © Vizrt NDI AB. Alle Rechte bei Vizrt NDI AB und ihren Lizenzgebern.
- Vizrt NDI AB und ihre Lizenzgeber geben keinerlei Gewährleistung. Soweit gesetzlich zulässig, haften sie nicht für
  direkte, indirekte, zufällige oder Folgeschäden aus der Nutzung von VD-Link oder der NDI-Teile.
- Exportkontroll- und Sanktionsrecht (u. a. der USA) ist einzuhalten.
- Wer VD-Link weiterentwickelt oder weitergibt und die NDI-Funktion behält, muss die NDI SDK License einhalten und diese
  Bedingungen an die eigenen Nutzer weitergeben.

---

**English summary:** VD-Link receives NDI® streams for its video walls using the NDI runtime that the user installs from
NDI ([ndi.video/tools](https://ndi.video/tools/)). No NDI binaries are distributed with VD-Link. NDI® is a registered
trademark of Vizrt NDI AB. The terms above (no modification or reverse engineering of NDI software, no circumvention, keep
NDI notices, no warranty or liability of Vizrt NDI AB and its licensors, export compliance, pass these terms on when
redistributing with NDI support) apply to the NDI parts only, in addition to VD-Link's EPL-2.0.
