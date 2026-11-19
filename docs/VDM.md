# VDM (VD-Mobile) – der Club in der VR-Brille

VDM ist die App für Standalone-Brillen (Pico 4 Ultra, später Meta Quest). Sie zeigt den Club aus VD-Link mit
Lichtkegeln, Lichtflecken, Gobos, Lampenköpfen und Videowänden. Den Raum zeichnet sie so wie VD-Link am Computer:
Bar, Lounge, Traversen, Publikum, Materialien und Raumlicht kommen direkt aus VD-Link.

## Startbildschirm

VDM startet in einer kleinen Lounge mit eigener Lichtshow. Auf dem Pult davor wählst du:

- **Weiter mit <Computer>**: der zuletzt verbundene Computer. **Computer suchen …** findet VD-Link im WLAN.
- **Gespeicherte Shows**: laufen ohne Computer.
- **Demo-Club mit Lichtshow**.
- **Einstellungen**: Haze, Grundlicht, Laufen, Drehen.

Mit dem Controller auf das Pult zeigen und den Abzug ziehen. In der Lounge kannst du dich frei bewegen. B / Y holt
das Pult vor dich und stellt es wieder zurück. Aus jeder Show führt Menü → **Startbildschirm** zurück.

## Betriebsarten

| Quelle | Was passiert |
|---|---|
| **Live** | VD-Link am Computer rechnet die Show. VDM zeigt sie und meldet zurück, wo die Brille steht und wohin sie schaut. VD-Link zeigt die Brille in der 3D-Ansicht. Änderungen in VD-Link sind sofort in der Brille zu sehen. |
| **Gespeichert** | Eine Show, die vorher auf der Brille gespeichert wurde, läuft ohne Computer in einer Schleife. |
| **Demo** | Der mitgelieferte Demo-Club mit Demo-Lichtshow und Demo-Bildern. Er läuft ohne Computer, auch beim ersten Start. |

Pult (Art-Net/sACN) und Videostreams (NDI®) kommen immer am Computer an, nie direkt in der Brille.

Für die beste Grafik unter Windows gibt es den PC-Modus: VD-Link rendert selbst und schickt das Bild per WebXR über
Pico Connect, Steam Link oder Meta Link in die Brille (VERBINDEN → VR-Brille → „In PC-VR öffnen“).

## Verbinden

1. In VD-Link: **VERBINDEN → VR-Brille einschalten**. VD-Link zeigt einen 4-stelligen Code.
2. Brille und Computer im selben WLAN.
3. In VDM: Menü → **Verbinden …**. VDM sucht VD-Link im WLAN. Computer wählen und den Code eingeben.

VDM merkt sich den Computer. Beim nächsten Start steht er auf dem Pult als **Weiter mit …**. Ist er nach 12 Sekunden
nicht erreichbar, geht VDM zurück zum Startbildschirm und sagt warum.

## VR-Knopf in VD-Link

Oben rechts in VD-Link, zwischen Bildrate und Einstellungen, steht der Knopf **VR**. Die Zahl daneben zeigt die
verbundenen Brillen. Ein Klick öffnet:

- **Ein/Aus** des VR-Servers und den **Code** für die Brille.
- **Verbundene Brillen** mit Namen. In der 3D-Ansicht steht jede Brille mit Kopf, Blickkegel und Namen.
  - **Mitschauen**: Die 3D-Ansicht zeigt, was die Brille gerade sieht. Ziehen in der Ansicht oder eine Kamera-Taste
    beendet es.
  - **Hierher holen**: Die Brille steht danach dort, wo die 3D-Ansicht steht (auf dem Boden darunter), und schaut in
    dieselbe Richtung – in der Brille ist dann dasselbe zu sehen wie in VD-Link.
- **Show auf VDM-Brillen speichern (60 s)**.

Adressen für den Browser der Brille und PC-VR stehen weiter unter VERBINDEN → VR-Brille.

## Show auf der Brille speichern

- **In VDM:** Menü → „Show aufnehmen (30 s / 60 s)“. Das geht nur, solange Live läuft.
- **In VD-Link:** VERBINDEN → VR-Brille → „Show auf VDM-Brillen speichern (60 s)“. Alle verbundenen VDM-Brillen
  nehmen dann gleichzeitig auf.

Gespeichert werden der Raum (so detailliert wie in VD-Link), die Lichtshow mit 30 Bildern pro Sekunde und die Bilder
der Videowände mit 4 Bildern pro Sekunde. Abspielen und Löschen: Menü → Quelle „Gespeichert“.

## Bedienung

| Controller | Funktion |
|---|---|
| Rechter Stick nach vorn, loslassen | Teleport (Bogen zeigt das Ziel, nur auf begehbare Flächen) |
| Rechter Stick links/rechts | Drehen (30°- oder 45°-Schritte oder gleitend) |
| Linker Stick | Laufen (stoppt an Wänden und Möbeln, Stufen bis 40 cm) |
| B / Y | Menü auf und zu (Startbildschirm: Pult vor dich holen und zurückstellen) |
| Zeigen + Abzug | Im Menü wählen |

Im Menü: Quelle, Standort (Publikumsbereiche der Location), Haze, Grundlicht, Laufen an/aus, Drehart, Aufnahme,
Startbildschirm. **Grundlicht „Wie VD-Link“** entspricht dem Raumlicht der 3D-Ansicht am Computer. „Heller“ und
„Hell“ helfen beim Begehen eines dunklen Raums. VDM läuft mit 72 Bildern pro Sekunde.

## Installieren (Entwicklerstand)

VDM ist noch nicht im Store. Installation auf der Pico per USB-Debugging:

```bash
adb install -r vr-app/build/vdm-pico.apk
```

Die Pico verlangt für seitlich installierte Apps ein angemeldetes PICO-Konto. Ohne Controller in der Hand legt sie
ihren Handtracking-Dialog vor die App.
