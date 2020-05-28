# Lösungsweg

## Übersicht

Hier ist eine Systemübersicht der Komponente und Umgebung, die ich verwende/benötige.

![res/SystemübersichtV2.png](res/SystemübersichtV2.png)

Systemübersicht aller Komponente im Einsatz

| Name | Status | 
|:-|-:| 
| Raspberry PI | muss abgeholt werden | 
| (mini) HDMI Kabel | muss abgeholt werden | 
| Micro SD-Card | muss abgeholt werden | 
| Webcam | vorhanden | 
| Stromkabel | muss abgeholt werden | 
| Tastatur & Maus | vorhanden | 
| Internetkabel | vorhanden | 
| Monitor | vorhanden |


Ich habe für das Projekt mich für 2 Wege eingeplant. Der erste Weg war das ich alles von Grund auf selbst mit der Programmiersprache ***Typescript*** verwirkliche***.***
Der zweite war ein Backup-Plan falls das mit dem ersten Weg nicht funktionieren sollte.



## Organisation

Mithilfe des **IPERKA-Systems** habe ich meine Praxisarbeit aufgeteilt und organisiert.

### Informieren

Wie vorhin erwähnt habe ich mich für 2 potenzielle Wege informiert, um die Frage zu klären:

> ***Welche Programmiersprache soll ich benutzen?***

#### Typescript

Diese Sprache basiert auf stark definierten Bausteinen für die Programmierung. Sie ist sehr robust und sehr beliebt bei Programmierern.
Ich habe mich für Programminterne-Module schlau gemacht und einige gefunden, die meinem Projekt hilfreich sein könnten.

Module, die ich verwendet habe, waren:

- [camera](https://www.npmjs.com/package/camera)
    Dieses Kamera Modul wird zum Interagieren mit der Kamera API Schnittstelle verwendet.

- [ts-node](https://www.npmjs.com/package/ts-node)
    Zum Ausführen des Typescript-Programcodes in Node.js wird dieses Modul benötigt, Grund: Das Programm wird automatisch kompiliert und ausgeführt.

- [nodemon](https://www.npmjs.com/package/nodemon)
    Dieses Modul wird zum automatisierten Neustart des Programms verwendet (Ist aber kein muss)

#### Python

Diese Sprache existiert schon seit 30 Jahren und ist zurzeit auf Version 3.5+. Sie wird sehr oft von Programmierern verwendet und ist äußerst beliebt, da sie viele Bibliotheken mit sich trägt. Python erleichtert Automatisierungsprozesse und ist eine sehr leichte Programmiersprache. Ich habe mich um diese Sprache entschieden, damit ich meine Python-Skills auffrischen kann und kleineres lerne.

Bibliotheken die ich verwendet habe:

- OpenCV für Python3

    - Die Hauptwebseite: [OpenCV](https://opencv.org/)
    
    - Die Reference der Bibliothek wo ich die meisten Codebeispiele übernommen habe: [OpenCV: Image Processing in OpenCV](https://docs.opencv.org/3.4/d2/d96/tutorial_py_table_of_contents_imgproc.html)

---

### Planung

Da ich nicht mit der Planung Schwierigkeiten habe, nutze ich mehr Zeit für die Planung, um meine Prozedur zu erleichtern und einen roten Faden bei der Programmierung zu finden.

#### Mindmap

Damit ich die Übersicht nicht verliere, habe ich mir als erstes ein Mindmap gemacht:

<figure class="image">
    <img src="res/Untitled.png" alt="Hier sind meine ersten Ideen in einer Mindmap zu sehen.">
    <figcaption><p>Hier sind meine <strong>ersten Ideen</strong> in einer Mindmap zu sehen.</p></figcaption>
<figure>

#### Zeitplanung

Meine Zeitplanung besteht aus 2 Teilen: 

1. Die Arbeitstermine der Arbeitsschritte und Meilensteine.
2. Terminvergabe für die Aktivität: *Dokumentation schreiben.*

Anhand des Mindmaps habe ich eine Checkliste vorbereitet, welche - egal auf welchen Weg ich mich entscheide - dasselbe Ziel erfüllt.

> Die erste Checkliste - V1

- Equipment
    - [x]  Equipment einrichten
    - [x]  Betriebssystem installieren
    - [x]  Voraussetzungen erfüllen (Bibliotheken oder Module)
    - [x]  Equipment testen
    - [x]  Lerndokumentation ***Version 1*** vorbereiten
- Programmierung
    - [x]  Programmierumgebung einrichten
    - [x]  Erste Programmstruktur planen
    - [x]  Programmstruktur implementieren
    - [ ]  Tests implementieren
- Dokumentation
    - [ ]  Praxisdokumentation vorbereiten
    - [ ]  Code-Snippets erstellen
    - [ ]  Textkonzept notieren.
    - [ ]  Text verfassen
- Präsentation
    - [ ]  Powerpoint vorbereiten
    - [x]  Visio vorbereiten
    - [ ]  FAQ einbauen

---

> Arbeitspakete und Meilensteine

- Arbeitspakete

    Die Arbeitspakete sind die einzelnen Schritte die bearbeitet werden müssen. Diese haben bei mir festgelegte Termine zugewiesen bekommen an die ich mich halten sollte.
    
    - [x] **Apr 05, 2020: Tag 5 *Meilenstein:***
    
    | Name |  Tags | 
    |:-|-:| 
    | Planung | Plan A | 
    | Resume | Meilenstein, Plan A | 
    | Weiteres | Next Day Tasks, Plan A | 
    
    - [x]  **Apr 06, 2020: Tag 2 *Meilenstein:***
    
    | Name |  Tags | 
    |:-|-:| 
    | Planung | Plan A|
    | Resume | Meilenstein, Plan A |
    | Weiteres | Next Day Tasks, Plan A |
    
    - [x] **Apr 07, 2020: *Update***
    
    - [x] **Apr 09, 2020: Tag 3 *Meilenstein:***
    
    | Name |  Tags | 
    |:-|-:| 
    | Planung | Plan A | 
    | Resume | Meilenstein, Plan A | 
    | Weiteres | Next Day Tasks, Plan A | 
    
    - [x] **Apr 10, 2020: Tag 4 *Meilenstein:***
    
    | Name |  Tags | 
    |:-|-:| 
    | Planung | Plan A | 
    | Resume | Meilenstein, Plan A | 
    | Weiteres | Next Day Tasks, Plan A  | 
    
    - [x] **Apr 08, 2020: *Update***
    - [x] **Apr 10, 2020: *Update***
    - [x] **Apr 11, 2020: *Meilenstein: Überprüfung/Kontrolle***
    - [x] **Apr 28, 2020: *Update***
    - [x] **Apr 29, 2020: *Update***
    - [x] **Mai 09, 2020: *Update***
    - [x] **Mai 17, 2020: Tag 5 *Wichtiges Update* -> Umstieg auf Plan B**
    - [x] **Mai 18, 2020: *Update***
    - [ ] **Mai 29, 2020: *Präsentation***
    - [ ] **Mai 30, 2020: *Meilenstein: Präsentation***
    - [ ] **Mai 31, 2020: *Meilenstein: Finale Präsentation***
    - [ ] **Jun 12, 2020: *Abgabe, Meilenstein: Abgabe Dokumente***
    - [ ] **Jun 16, 2020: *Abgabe, Meilenstein: SOL Präsentation***

- Meilensteine

    Die Meilensteine müssen fest definiert sein, damit ich mich so gut wie Möglich auf ein Zeitraffer einhalten kann. Die Funktion dieser Meilensteine ist ein kleiner Checkpoint welcher für sich eine Prozedur abschließt und die nächste Hürde freischaltet.
    Meine Meilensteine wären:
    
    - [x] **Apr 05, 2020: Tag 1 *Meilenstein: Resume***
    - [x] **Apr 06, 2020: Tag 2 *Meilenstein: Resume***
    - [x] **Apr 09, 2020: Tag 3 *Meilenstein: Resume***
    - [x] **Apr 10, 2020: Tag 4 *Meilenstein: Resume***
    - [x] **Apr 11, 2020: *Meilenstein: Überprüfung***
    - [x] **Mai 17, 2020: *Meilenstein: Plan B***
    - [ ] **Mai 30, 2020: *Meilenstein: Präsentation***
    - [ ] **May 31, 2020: *Meilenstein: Präsentation***
    - [ ] **Jun 12, 2020: *Abgabe***
    - [ ] **Jun 16, 2020: *Abgabe, Meilenstein: SOL Präsentation***


