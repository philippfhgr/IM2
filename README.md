# Dokumentation

## Beschreibung
In unserem Projekt verwenden wir eine API zum Thema: Aktuelle Belegung der öffentlichen Parkhäuser der Stadt Basel. Die Daten werden ständig aktualisiert und sind somit immer aktuell. Wir haben uns überlegt, eine Karte einzubinden, auf der die verschiedenen Parkhäuser eingezeichnet sind. Die eingezeichneten Parkhäuser sind Punkte, die beim Anklicken ein Popup-Fenster mit allen sofort relevanten Informationen zum Parkhaus öffnen. Die Farben der Punkte entsprechen dem Belegungsgrad. Rot bedeutet also stark , orange mittel und grün wenig belegt. Ist der Punkt schwarz, hat es keinen Platz mehr im Parkhaus. Die Karte ist für die schnelle Abfrage gedacht und erhält Grundinformationen für zum Beispiel einen kurzen Check vor der Anfahrt. In der Liste untendran können die Parkhäuser über das Suchfeld gesucht werden, wenn nicht bekannt ist, wo ein spezifischen Parkhaus steht. So kann man auch darüber zu den Informationen und zur Navigation gelangen.

## Learnings
Wir hatten Probleme die Punkte der Parkhäsuer auf der statischen Karte zu fixieren, so dass sie beim anpassen des Viewports an der selben Stelle auf der Karte bleiben. Da ein IMG kein Parent sein kann, mussten wir Umwege suchen. In einem Forum sind wir auf einen Lösungsansatz gestossen und haben diesen dann umgesetzt bekommen. Ein Learning zu position absolute und variable sowie die Parent und Child Beziehung.


## Schwierigkeiten
Interaktive Karten benötigen mehr Wissen und Hintergrundinformationen, um sie richtig anwenden zu können als wir hatten. Wir haben versucht Google Maps und Mapbox einzubinden, was leider nicht reibungslos funktionierte. Wir konnten die Karten einbinden, sind aber an den Markierungen für die Parkhäuser gescheitert. Diese müssten bereits in der Karte vorhanden sein, ansonsten würden sie beim Verschieben der Karte nicht am richtig Ort bleiben. Zusätzlich bräuchten die Markierungen mit der Parking API verbundene Popups. Da ein Verschieben eigentlich nicht nötig ist, Basel bleibt an einem Ort, haben wir uns auf eine statische Karte geeinigt. So profitieren wir auch von schnelleren Ladezeiten.
Die Absprache untereinander war sicherlich auch eine Schwierigkeit. Wer arbeitet wann am Code und erledigt was? Gerade gegen Ende, wo alle nochmals dran arbeiten wollten, mussten wir vermehrt kommunizieren und uns absprechen. 


## Benutzte Ressourcen

- ChatGPT
- w3schools
