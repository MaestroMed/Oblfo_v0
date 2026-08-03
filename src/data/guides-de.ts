// Traductions allemandes des guides — remplies par passe de traduction.
// Clé = id du guide (cf. GUIDE_SLUGS). Un guide absent d'ici est
// simplement indisponible en allemand (filtré partout automatiquement).
import type { GuideL10n } from "./guides";

export const guidesDe: Record<string, GuideL10n> = {
  "chauffage-appoint-economique": {
    title:
      "Sparsame Zusatzheizung: einen kleinen Raum heizen, ohne die Stromrechnung zu sprengen",
    metaDescription:
      "Was kostet eine elektrische Zusatzheizung wirklich pro Stunde? Einfache Rechnung, passende Wattzahl je Raumgröße, Sicherheit und teure Fehler im Überblick.",
    intro:
      "Das ganze Haus zu heizen, wenn Sie nur einen Raum nutzen, ist die teuerste Art, nicht zu frieren. Eine gut gewählte Zusatzheizung macht genau das Gegenteil: Sie wärmt den Ort, an dem Sie sind — in dem Moment, in dem Sie dort sind. Hier erfahren Sie, wie Sie die tatsächlichen Kosten berechnen, die richtige Leistung wählen und die klassischen Fallen vermeiden.",
    sections: [
      {
        title: "Die echten Kosten pro Stunde: eine 10-Sekunden-Rechnung",
        paragraphs: [
          "Die Formel passt in eine Zeile: Leistung (in kW) × Nutzungsstunden × Strompreis pro kWh. Ein 1.200-W-Gerät, das 3 Stunden pro Abend läuft, kostet bei rund 0,25 €/kWh: 1,2 × 3 × 0,25 = 0,90 € pro Abend. Etwa 27 € im Monat — für einen wirklich warmen Raum, genau in den Stunden, in denen Sie ihn nutzen.",
          "Der Vergleich, auf den es ankommt: Die Zentralheizung für das ganze Haus um 2 Grad höher zu drehen, kostet typischerweise 3- bis 5-mal mehr, als gezielt den einen genutzten Raum zu heizen. Eine Zusatzheizung ist nicht „an sich“ sparsam — sie ist es, weil sie klein und kurz heizt.",
          "Daraus folgt die goldene Regel: Eine Zusatzheizung ist eine Ergänzung — Raum für Raum, Sitzung für Sitzung. Lassen Sie sie rund um die Uhr in einem großen, schlecht gedämmten Wohnzimmer laufen, kehrt sich die Rechnung gegen Sie.",
        ],
      },
      {
        title: "Welche Leistung für welche Raumgröße",
        paragraphs: [
          "Die übliche Faustregel: rund 100 W pro m² bei normal gedämmten Räumen. Ein Büro oder Schlafzimmer mit 10 bis 15 m² kommt also mit 1.000 bis 1.500 W aus — mehr bringt nichts: Ein überdimensioniertes Gerät taktet nur ständig, ohne zusätzlichen Komfort zu liefern.",
          "Die Keramik-Technologie (PTC) hat in kleinen Räumen einen handfesten Vorteil: Sie erreicht ihre Temperatur in wenigen Dutzend Sekunden und regelt sich selbst — das Keramikelement senkt seine Leistungsaufnahme von allein, sobald es sich der Zieltemperatur nähert. Genau die richtige Wahl für kurze, wiederholte Heizphasen — also exakt den Einsatz am Schreibtisch oder im Schlafzimmer.",
          "Seit 2018 schreibt die europäische Ökodesign-Verordnung (ErP) für elektrische Zusatzheizungen eine elektronische Temperaturregelung vor. Ein elektronisches Thermostat ist kein Gimmick: Es verhindert, dass über den Bedarf hinaus geheizt wird — und es ist Pflicht, damit das Gerät in Europa überhaupt legal verkauft werden darf.",
        ],
      },
      {
        title: "Sicherheit: die zwei unverzichtbaren Schutzfunktionen",
        paragraphs: [
          "Abschaltung bei Überhitzung und Abschaltung beim Umkippen. Beide Schutzfunktionen müssen schwarz auf weiß im Datenblatt stehen. Ein Heizgerät auf dem Schreibtisch oder neben dem Bett ohne Kippschutz ist ein Risiko, keine Ersparnis.",
          "Die Nutzungsregeln gelten für jedes Gerät gleichermaßen: niemals abdecken, nie direkt an Textilien, nie an einer bereits belasteten Steckdosenleiste (1.200 W sind die Hälfte dessen, was eine Standardleiste verträgt) — und kein längerer Betrieb ohne Aufsicht.",
        ],
      },
      {
        title: "Die Fehler, die richtig Geld kosten",
        paragraphs: [
          "Einen Raum mit offenen Fenstern oder sehr schlechter Dämmung heizen: Das Gerät läuft pausenlos auf Volllast, und die Kosten explodieren. Fünf Minuten Stoßlüften bei weit geöffnetem Fenster, dann Fenster zu — das schlägt jedes dauerhaft gekippte Fenster.",
          "Ein zu schwaches Gerät kaufen, „um zu sparen“: 500 W auf 20 m² laufen endlos, ohne die Zieltemperatur je zu erreichen — Sie verbrauchen Strom ohne Komfort. Besser die richtige Leistung, dafür kürzer genutzt.",
          "Die Platzierung vernachlässigen: auf den Boden oder den Schreibtisch, Luftstrom auf Sie gerichtet, nicht zur Tür. Die Wärme eines Heizlüfters ist gerichtet — genau das ist seine Stärke am Arbeitsplatz, sofern Sie ihn richtig ausrichten.",
        ],
      },
    ],
  },
  "choisir-gants-chauffants": {
    title:
      "Beheizbare Handschuhe: USB, Akku, Heizstufen — so wählen Sie richtig",
    metaDescription:
      "USB 5 V, Batteriefach oder 7,4-V-Akku? Reale Laufzeit, Heizzonen, Pflege: der ehrliche Ratgeber für die Wahl beheizbarer Handschuhe.",
    intro:
      "Nicht alle „beheizbaren Handschuhe“ wärmen gleich — und der Unterschied liegt fast vollständig in der Stromversorgung. Dieser Ratgeber erklärt, was jeder Typ wirklich leistet, worauf Sie im Datenblatt achten sollten und für welchen Einsatz welche Variante sinnvoll ist.",
    sections: [
      {
        title: "Die Stromversorgung entscheidet alles",
        paragraphs: [
          "Kabelgebunden per USB 5 V: Die Handschuhe werden an eine Powerbank in der Jackentasche angeschlossen. Die einfachste und günstigste Lösung. Die Wärme ist sanft — denken Sie an eine permanente Grundwärme, nicht an einen Heizkörper in den Händen. Ideal fürs kalte Büro, für Wege durch die Stadt und für kälteempfindliche Hände.",
          "Batteriefach: Ein Fach am Handgelenk versorgt die Heizzonen. Eine Stufe intensiver als 5 V, ohne herabhängendes Kabel. Die Laufzeit hängt von den Batterien ab — planen Sie wiederaufladbare Akkus ein.",
          "7,4-V-Lithium-Akku: Das ist die Kategorie, die wirklich stark heizt — die der Motorradfahrer und Wintersportler. Rechnen Sie mit einem deutlich höheren Budget: Unter einem gewissen Preis ist ein „7,4-V“-Handschuh in der Regel keiner. Wenn ein billiges Angebot intensive Wärme verspricht, ist das das erste Warnsignal.",
        ],
      },
      {
        title: "Reale Laufzeit: die Zahlen, die Sie kennen sollten",
        paragraphs: [
          "An einer Powerbank mit 10.000 mAh halten USB-Handschuhe in der Praxis 3 bis 6 Stunden durch, je nach gewählter Heizstufe. Höchste Stufe heißt: halbe Laufzeit gegenüber der sanften Stufe — die meisten Nutzer finden ihr Gleichgewicht auf der mittleren Stufe.",
          "Die Aufheizzeit ist dagegen überall kurz: Die Wärme ist nach 30 Sekunden bis 2 Minuten spürbar. Was sich zwischen den Preisklassen unterscheidet, ist die maximale Temperatur, nicht das Tempo.",
        ],
      },
      {
        title: "Worauf Sie im Datenblatt achten sollten",
        paragraphs: [
          "Die Heizzonen: Handfläche + Fingeroberseiten ist die Konfiguration, die funktioniert — Finger und Handrücken frieren zuerst. Manche Einstiegsmodelle heizen nur den Handrücken: real sehr begrenzte Wärme.",
          "Eine touchscreenfähige Zeigefingerkuppe, damit das Smartphone nutzbar bleibt, wasserabweisendes Material für Nieselregen (wasserabweisend ≠ wasserdicht: kein beheizbarer Handschuh für Endverbraucher gehört ins Wasser) und Handwäsche, sobald Kabel oder Akku abgetrennt sind.",
          "Heizstufen: Drei genügen. Mehr ist Marketing, weniger bedeutet, dass Ihnen die Sparstufe für lange Laufzeiten fehlt.",
        ],
      },
      {
        title: "Welcher Einsatz, welche Wahl",
        paragraphs: [
          "Kaltes Büro, Wege zu Fuß, chronisch kalte Hände: USB 5 V — überschaubares Budget, komfortable Laufzeit an der Powerbank. Roller und Fahrrad bei Kälte: Batteriefach oder 7,4 V je nach Budget — mit Heizzonen, die die Finger wirklich abdecken. Motorrad im Winter und Bergsport: 7,4 V, ohne zu zögern — das ist der Preis für echte Wärme bei -5 °C.",
        ],
      },
    ],
  },
  "plaid-chauffant-guide": {
    title:
      "Heizdecke: realer Stromverbrauch, Sicherheit und die Kriterien, die zählen",
    metaDescription:
      "Wie viel Strom verbraucht eine Heizdecke? Ist Einschlafen darunter sicher? Waschbar oder nicht? Der ehrliche Ratgeber vor dem Kauf.",
    intro:
      "Die Heizdecke ist das rentabelste Objekt des Winters: Sie wärmt den Menschen, nicht den Raum. Doch zwischen Modellen, die sich nicht waschen lassen, Modellen ohne Abschaltautomatik und Fantasie-Wattzahlen gibt es einiges auszusortieren. Das zählt wirklich.",
    sections: [
      {
        title: "Der Verbrauch: ein paar Cent pro Abend",
        paragraphs: [
          "Eine Heizdecke zieht typischerweise rund 100 W — bei 0,25 €/kWh sind das etwa 0,025 € pro Stunde, also 8 Cent für einen Abend von 3 Stunden. Ein Monat täglicher Nutzung kostet weniger als 2,50 €. Das ist 10- bis 15-mal weniger als eine Zusatzheizung, weil die Wärme direkt zu Ihnen geht, statt die Luft zu erwärmen.",
          "Die Rechnung, die daraus folgt, ist einfach: das Wohnzimmer-Thermostat um 2 Grad herunterdrehen und es sich unter der Heizdecke bequem machen — einer der besten Komfort-pro-Euro-Deals des Winters.",
        ],
      },
      {
        title: "Sicherheit: die zwei unverzichtbaren Funktionen",
        paragraphs: [
          "Zuerst die Abschaltautomatik: Eine gute Heizdecke schaltet sich nach einer festgelegten Zeit von selbst ab (typischerweise 3 Stunden). Genau das macht das Einschlafen darunter völlig unproblematisch. Ein Modell ohne Abschaltautomatik hat auf einem Sofa nichts verloren.",
          "Dann der Überhitzungsschutz: Das Heizelement muss abschalten, wenn eine Stelle der Decke ungewöhnlich heiß wird (zum Beispiel bei gefalteter Decke). Bei seriösen Produkten übernimmt das ein Doppelsensor (PTC + NTC).",
          "Und die Grundlagen: ein europäischer Stecker für 220–240 V und eine CE-Kennzeichnung mit einem echten Zertifikat dahinter — für Heizdecken gilt die Norm EN 60335-2-17. Ein aufgedrucktes CE-Logo ohne Zertifikat schützt niemanden.",
        ],
      },
      {
        title: "Maschinenwaschbar: das Kriterium, das alles entscheidet",
        paragraphs: [
          "Eine Heizdecke lebt auf dem Sofa: Sie wird Kaffee, Krümel und Katzenhaare abbekommen. Lässt sie sich nicht in der Maschine waschen, landet sie noch vor Februar zusammengeknüllt im Schrank.",
          "Der Mechanismus, den Sie prüfen sollten: ein abnehmbarer Controller. Bedienteil abziehen — und das Textil darf bei 30 °C in die Maschine, Schonschleudern, kein Trockner. Erwähnt die Produktseite den abnehmbaren Controller nicht ausdrücklich, betrachten Sie die Decke als nicht waschbar.",
        ],
      },
      {
        title: "Größe und Material: was den Komfort verändert",
        paragraphs: [
          "Das Format 130 × 180 cm ist der richtige Sofa-Standard: groß genug, um Sie von den Füßen bis zu den Schultern zu bedecken, kompakt genug, um ein Plaid zu bleiben und keine Bettdecke zu werden. Unter 120 cm Breite verbringen Sie den Abend damit, Ihre Beine immer wieder neu einzupacken.",
          "Beim Material hält doppelseitiger Flanell (oder Flanell + Sherpa) die Wärme zwischen zwei Heizzyklen deutlich besser als dünnes Fleece — die Decke bleibt auch ausgeschaltet warm. So können Sie nur zeitweise heizen und verbrauchen noch weniger.",
        ],
      },
    ],
  },
  "gilet-chauffant-guide": {
    title:
      "Beheizbare Weste: Heizzonen, reale Akkulaufzeit, Größen — der Ratgeber ohne Marketing",
    metaDescription:
      "Wie viele Heizzonen braucht es wirklich? Warum die angegebene Laufzeit täuscht? Welche Größe bestellen? Der ehrliche Ratgeber zur beheizbaren USB-Weste.",
    intro:
      "Die beheizbare Weste ist das wirksamste beheizbare Kleidungsstück: Sie wärmt den Rumpf, und der Körper verteilt die Wärme weiter. Zugleich ist es die Kategorie, in der das Marketing am stärksten übertreibt — großzügig gezählte Zonen, unrealistische Laufzeiten, irreführende Größen. Bringen wir die Zahlen wieder ins Lot.",
    sections: [
      {
        title: "Heizzonen: Die Platzierung zählt mehr als die Anzahl",
        paragraphs: [
          "Produktseiten werben mit 9, 21, manchmal 28 „Zonen“. In der Praxis zählt etwas anderes: Rücken und Lendenbereich müssen abgedeckt sein (dort entspannt und verteilt sich die Wärme), ein beheizter Kragen ist bei strengem Frost ein echtes Plus, und separat steuerbare Bereiche (vorne / hinten) verhindern, dass Sie die Brust überhitzen, nur um am Rücken warm zu sein.",
          "Eine Weste mit 6 gut platzierten, steuerbaren Zonen schlägt eine mit 28 Mikro-Zonen, die alle am selben Knopf hängen.",
        ],
      },
      {
        title: "Die reale Akkulaufzeit (und warum die Angaben täuschen)",
        paragraphs: [
          "Die „8 bis 10 Stunden“ aus den Anzeigen beziehen sich auf die niedrigste Stufe, oft mit nur einer aktiven Zone. Im realen Einsatz an einer Powerbank mit 10.000 mAh sollten Sie mit etwa 3 Stunden bei voller Leistung rechnen — mehr im mittleren oder Eco-Modus. Das reicht für den Arbeitsweg, ein Spiel im Stadion oder eine Arbeitssession im kalten Raum; nicht für einen ganzen Skitag am Stück.",
          "Zwei Details, die alles verändern: Die Powerbank ist fast nie im Lieferumfang enthalten (planen Sie 15–25 € zusätzlich ein), und die Heizleistung ist mit einer 20-W-fähigen Powerbank spürbar stärker als mit einem alten 10-W-Modell.",
        ],
      },
      {
        title: "Größen: die Eine-Nummer-größer-Regel",
        paragraphs: [
          "Fast alle beheizbaren Westen am Markt fallen asiatisch aus: Bestellen Sie eine Nummer über Ihrer üblichen EU-Größe — wer M trägt, bestellt L; wer L trägt, bestellt XL. Das ist Retourengrund Nummer eins in dieser Kategorie.",
          "Der richtige Test beim Auspacken: Die Weste sollte körpernah sitzen (Wärme überträgt sich durch Kontakt), aber eine dünne Schicht darunter zulassen. Sitzt sie zu eng, drückt sie die Heizzonen zusammen; sitzt sie zu weit, verpufft die Wärme.",
        ],
      },
      {
        title: "Pflege und Lebensdauer",
        paragraphs: [
          "Eine Graphen-Weste wird in der Maschine kalt im Schonprogramm gewaschen, ohne starkes Schleudern und ohne Trockner — nachdem Sie die Powerbank aus der Tasche genommen haben. Das Textil niemals auswringen: Genau diese Bewegung bricht die Heizbahnen.",
          "Beim Einlagern im Frühjahr falten Sie die Weste, ohne die Heizzonen zu knicken, und lagern die Powerbank halb geladen: Sie ist das Teil, das am schnellsten altert.",
        ],
      },
    ],
  },
  "pieds-froids-guide": {
    title:
      "Kalte Füße: beheizbare Einlegesohlen oder Hausschuhe — was zu Ihrem Fall passt",
    metaDescription:
      "Eiskalte Füße draußen, im Büro oder zu Hause? Beheizbare Einlegesohlen vs. beheizte Hausschuhe: Laufzeit, Einsatz, Grenzen — der ehrliche Vergleich.",
    intro:
      "Die Füße sind die Extremität, die der Körper bei Kälte zuerst opfert: Die Durchblutung wird dort gedrosselt, um den Rumpf zu schützen. Das Ergebnis: Ihnen kann überall warm sein — und die Zehen frieren trotzdem. Es gibt zwei beheizte Antworten, und sie dienen völlig unterschiedlichen Momenten.",
    sections: [
      {
        title: "Draußen und in Bewegung: beheizbare Einlegesohlen",
        paragraphs: [
          "Sobald Sie in Schuhen stecken — beim Gehen, auf der Baustelle, im Stadion, auf der Jagd, beim Skifahren — ist die einzige Option, die funktioniert, die beheizbare Einlegesohle mit integriertem Akku. Aktuelle Modelle bauen den Akku direkt in die Sohle ein: kein Gehäuse am Knöchel, kein Kabel, dafür eine Fernbedienung, um die Stufe zu wechseln, ohne die Schuhe auszuziehen.",
          "Die ehrliche Laufzeit: 3 bis 7 Stunden je nach Stufe. Die „9 Stunden“ aus den Anzeigen entsprechen der niedrigsten Stufe. Und eine Hersteller-Warnung, die Sie ernst nehmen sollten: Die Sohle wird ausschließlich entlang der markierten Linien auf Ihre Schuhgröße zugeschnitten — niemals im Bereich des Heizelements.",
        ],
      },
      {
        title: "Zu Hause: beheizte Hausschuhe",
        paragraphs: [
          "Drinnen ist der beheizte Hausschuh einfacher und bequemer: Wärme am Vorfuß, ein weiches Innenfutter, das die Temperatur hält, und USB-Versorgung ohne Akku, um den Sie sich kümmern müssten. Das ist die Lösung fürs Homeoffice, den Abend vor dem Fernseher und kalte Erdgeschosse.",
          "Seine Grenze ist zugleich seine Stärke: Angeschlossen kommt er nicht weit. Wer sich in der Wohnung bewegen möchte, wählt ein Modell mit abnehmbarem Kabel, das die gespeicherte Wärme einige Dutzend Minuten hält.",
        ],
      },
      {
        title: "Die Fehler, die alles verderben",
        paragraphs: [
          "Eine beheizbare Einlegesohle waschen: Wasser — und selbst sehr starker Schweiß — beschädigt das Heizelement. Richtige Pflege heißt: feuchtes Tuch an der Oberfläche, niemals eintauchen.",
          "Zwei Paar dicke Socken übereinander tragen: Das drückt den Fuß zusammen, verlangsamt die Durchblutung weiter und isoliert den Fuß … ausgerechnet gegen die beheizbare Sohle. Ein einziges Paar hochwertiger Socken — und die Wärme kommt durch.",
          "Erst einschalten, wenn die Füße schon eiskalt sind: Die Heizung hält warme Füße warm, sie taut keine bereits kalten Füße durch die Hornhaut hindurch auf. Eingeschaltet wird beim Losgehen, nicht eine Stunde später.",
        ],
      },
    ],
  },
  "chauffe-mains-guide": {
    title:
      "Handwärmer mit Akku: reale Laufzeit, Regeln im Flugzeug und die richtige Wahl",
    metaDescription:
      "Geschönte mAh, reale Laufzeit, Regeln im Flugzeug, Handwärmer vs. beheizbare Handschuhe: der ehrliche Ratgeber zum wiederaufladbaren Handwärmer.",
    intro:
      "Der wiederaufladbare Handwärmer hat die Einweg-Wärmebeutel abgelöst: in Sekunden warm, Hunderte Ladezyklen und oft eine Powerbank-Funktion als Bonus. Doch die Kategorie hat ihre Fallen — geschönte Kapazitäten, theoretische Laufzeiten und Transportregeln, die kaum eine Produktseite erwähnt.",
    sections: [
      {
        title: "Laufzeit: die echten Zahlen",
        paragraphs: [
          "Ein seriöser Handwärmer hält 4 bis 8 Stunden auf hoher Stufe durch — die „15 Stunden“ aus den Anzeigen stammen von einem Doppel-Akku-Modell auf niedrigster Stufe. Drei Stufen zwischen 45 und 55 °C genügen: Darüber lässt sich das Gerät nicht mehr in der Hand halten.",
          "Misstrauen Sie den angegebenen Kapazitäten: „10.000 mAh“ für 8 € sind oft real 5.000 mAh. Das magnetische Doppel-Format — zwei trennbare Einheiten, eine pro Tasche — ist das vielseitigste: Wärme auf beiden Seiten beim Gehen, ein einziger Block zum Aufladen.",
        ],
      },
      {
        title: "Im Flugzeug: Kabine ja, Frachtraum nein",
        paragraphs: [
          "Es handelt sich um einen Lithium-Akku: Er muss zwingend in der Kabine reisen, niemals im aufgegebenen Koffer. Die Regel gilt für alle Geräte mit fest verbautem Akku. In der Praxis: in die Handtasche oder die Manteltasche stecken — bis 100 Wh gibt es keine Probleme, und ein Handwärmer liegt typischerweise bei 15 bis 40.",
          "Zum selben Sicherheitsthema: Kaufen Sie nicht das Einstiegsmodell für 3–4 €. Die Kategorie steht unter echter Beobachtung der Aufsichtsbehörden, und der Preisunterschied steckt genau im Chip zur Temperaturkontrolle und in der Zellqualität.",
        ],
      },
      {
        title: "Handwärmer oder beheizbare Handschuhe?",
        paragraphs: [
          "Die beiden schließen sich nicht aus — sie ergänzen sich. Der Handwärmer gewinnt, wenn die Hände zwischendurch frei und unbedeckt sein müssen: Fotos, Kinderwagen, Warten an der Bushaltestelle, eiskaltes Büro. Die Handschuhe gewinnen im Dauereinsatz draußen: Fahrrad, Roller, Wanderung.",
          "Die wirksamste Kombination bei strengem Frost: beheizbare Handschuhe an den Händen, Handwärmer in den Taschen für die Pausen — zugleich eine Notstromreserve fürs Smartphone.",
        ],
      },
    ],
  },
  "chaussons-guide": {
    title:
      "Beheizbare Hausschuhe: USB, Waschen, Sicherheit — der Ratgeber vor dem Kauf",
    metaDescription:
      "Beheizbare Hausschuhe mit USB oder Körnerkissen? Waschbar oder nicht? Abnehmbares Kabel, Einheitsgröße, Sicherheit: was Sie vor dem Kauf prüfen sollten.",
    intro:
      "Der Boden ist die kälteste Fläche im Haus — und genau dort verbringen Ihre Füße den Abend. Beheizbare Hausschuhe lösen das Problem an der Wurzel. Doch die Kategorie vermischt drei sehr unterschiedliche Produkte unter demselben Namen. Hier erfahren Sie, wie Sie sie auseinanderhalten — und was einen guten Kauf ausmacht.",
    sections: [
      {
        title: "Drei Produkte unter einem Namen",
        paragraphs: [
          "Der elektrisch beheizte Hausschuh (USB): aktive Heizzonen am Vorfuß, per Kabel versorgt. Konstante, regelbare Wärme — das ist die Kategorie dieses Ratgebers und die einzige, die wirklich dauerhaft heizt.",
          "Der Hausschuh als Mikrowellen-Körnerkissen: eine Füllung aus Körnern, die die Wärme 20 bis 30 Minuten abgibt. Kabellos — aber er kühlt schnell aus und wandert den ganzen Abend immer wieder zurück in die Mikrowelle.",
          "Der einfache isolierende Hausschuh (Sherpa, Wolle): Er bewahrt die Eigenwärme des Fußes, erzeugt aber keine — sind Ihre Füße bereits kalt, wärmt er sie nicht auf. Das ist die klassische Falle mehrdeutiger Produktseiten: Achten Sie auf das Wort „Heizzonen“ und eine ausdrücklich genannte Stromversorgung.",
        ],
      },
      {
        title: "USB 5V: was das im Alltag bedeutet",
        paragraphs: [
          "Die USB-Versorgung mit 5V ist eine Stärke: keine gefährliche Spannung auf Fußhöhe, kompatibel mit jedem Ladegerät, jeder Powerbank und jedem Laptop-Anschluss — und spürbare Wärme in weniger als einer Minute am Vorfuß, der Zone, die sich von Natur aus am langsamsten erwärmt.",
          "Die Kehrseite ist das Kabel. Das Kriterium, das alles ändert: ein abnehmbares Kabel. Aufstehen, ausklinken, losgehen — und die isolierende Polsterung hält die gespeicherte Wärme viele Minuten lang. Ein Modell mit fest verbautem Kabel macht aus jedem Gang in die Küche ein Manöver.",
        ],
      },
      {
        title: "Waschen, Größe, Sohle: die drei Prüfpunkte",
        paragraphs: [
          "Wirklich waschbar? Ein Hausschuh lebt auf dem Boden und muss irgendwann in die Wäsche. Die Regel: Handwäsche in kaltem Wasser, mit abgezogenem Kabel — und niemals in den Trockner, der die Heizelemente zerstört. Eine Produktseite, die zum Waschen schweigt, verbirgt in der Regel ein nicht waschbares Produkt.",
          "Die Einheitsgröße (oft EU 36–45) funktioniert dank eines anpassungsfähigen Innenfutters — prüfen Sie dennoch die genaue Spanne, wenn Sie Größe 35 oder 46 tragen.",
          "Die rutschfeste Sohle ist keine Option: Ein flauschiger Hausschuh auf Parkett ist ein Ausrutscher in Wartestellung. Strukturierte Sohle Pflicht, Nutzung ausschließlich drinnen.",
        ],
      },
      {
        title: "Für wen sich der Kauf lohnt",
        paragraphs: [
          "Der beheizte Hausschuh ist die Lösung für den festen Platz: Homeoffice, Lesen, Sofaabend, kaltes Erdgeschoss. Wer sich in der Wohnung bewegt, fährt am besten mit dem Duo aus Hausschuh mit abnehmbarem Kabel und kurzen Wärme-Nachladephasen. Und liegt Ihr Problem draußen — Stiefel, Baustelle, Stadion — brauchen Sie beheizbare Einlegesohlen, keine Hausschuhe.",
        ],
      },
    ],
  },
  "chauffe-tasse-guide": {
    title:
      "USB-Tassenwärmer: warmhalten ja — aufwärmen nein. Der ehrliche Ratgeber",
    metaDescription:
      "Ein USB-Tassenwärmer hält Ihren Kaffee bei ~55 °C — kalten Kaffee wärmt er nicht auf. Passende Tassen, Abschaltautomatik, Verbrauch: der ehrliche Ratgeber.",
    intro:
      "Es ist das 19-€-Objekt, das ein absurdes Ritual abschafft: den Gang zur Mikrowelle alle vierzig Minuten. Doch die Kategorie leidet unter einem massiven Missverständnis darüber, was sie wirklich leistet — und fast jede Enttäuschung kommt genau daher. Eine Klarstellung in vier Minuten.",
    sections: [
      {
        title: "Missverständnis Nr. 1: warmhalten ≠ aufwärmen",
        paragraphs: [
          "Ein USB-Tassenwärmer liefert 5 bis 10 W. Das ist exakt genug, um die Wärme auszugleichen, die eine Tasse verliert — und nicht genug, um kalten Kaffee wieder auf Temperatur zu bringen. Einfache Physik: Aufwärmen braucht zehnmal mehr Leistung als Warmhalten.",
          "Daraus folgt die richtige Nutzung: Stellen Sie den Kaffee heiß ab, sobald er eingeschenkt ist — dann bleibt er den ganzen Nachmittag auf Trinktemperatur. Stellen Sie eine seit einer Stunde vergessene Tasse ab, bekommen Sie lauwarmen Kaffee — das ist Kritikpunkt Nr. 1 in den Bewertungen der gesamten Kategorie, und er zielt auf eine Nutzung, nicht auf einen Defekt.",
        ],
      },
      {
        title: "Die Tasse macht die halbe Arbeit",
        paragraphs: [
          "Die Wärme wird durch Wärmeleitung übertragen: Es braucht einen flachen Boden und satten Kontakt mit der Heizplatte. Tassen mit dickem oder gewölbtem Boden isolieren ihren eigenen Inhalt — dünne, flache Böden übertragen am besten.",
          "Zwei Sonderfälle: Doppelwandige Tassen, die genau dafür gebaut sind, Wärmeübertragung zu blockieren, neutralisieren den Tassenwärmer; und Pappbecher funktionieren zwar, eine Tasse ist aber die bessere Wahl — die Platte erreicht rund 55 °C.",
        ],
      },
      {
        title: "Sicherheit und Verbrauch: die zwei guten Nachrichten",
        paragraphs: [
          "Die automatische Abschaltung beim Anheben der Tasse ist das Sicherheitskriterium, auf dem Sie bestehen sollten: Die Platte schaltet sich von selbst ab, wenn Sie ins Meeting gehen. Bei ~55 °C Plattentemperatur reden wir von einem Objekt, das kühler ist als eine frisch servierte Tasse Tee.",
          "Beim Verbrauch entsprechen 5 bis 10 W über einen Nachmittag etwa einem Cent Strom — weniger als die Mikrowelle, die er ersetzt, und ohne den Geschmack von wieder aufgekochtem Kaffee.",
        ],
      },
      {
        title: "Für wen — und womit kombinieren",
        paragraphs: [
          "Das typische Profil: Büro oder Homeoffice, Kaffee oder Tee, der vor sich hin steht, ein kühler Raum. Der Tassenwärmer fügt sich natürlich in den restlichen Winter-Arbeitsplatz ein — beheizbare Schreibtischunterlage für die Hände, Zusatzheizung für den Raum. Ein Trio, das mit 60 W auskommt, wo ein Heizkörper 1.500 verlangt.",
        ],
      },
    ],
  },
  "sous-main-guide": {
    title:
      "Kalte Hände am Schreibtisch: warum das passiert — und was wirklich hilft",
    metaDescription:
      "Eiskalte Finger auf der Tastatur trotz 19 °C im Raum? Schuld ist das Stillsitzen. Beheizbare Schreibtischunterlage, sichere Temperaturen, Setup: der Ratgeber.",
    intro:
      "Man kann in einem 19 Grad warmen Raum kalte Hände haben. Das ist keine Einbildung: Acht Stunden Bewegungslosigkeit drosseln die Durchblutung der Extremitäten, und die Tastatur macht es nicht besser. Hier ist die Mechanik hinter dem Problem — und die Lösungen, geordnet nach tatsächlicher Wirksamkeit.",
    sections: [
      {
        title: "Warum die Hände an der Tastatur frieren",
        paragraphs: [
          "Wer still sitzt, dessen Körper drosselt die periphere Durchblutung — derselbe Mechanismus, der im Kino die Füße gefrieren lässt. Auf dem Schreibtisch liegende Hände fügen zwei Verstärker hinzu: den dauerhaften Kontakt mit einer kalten Oberfläche, die Wärme abzieht, und eine erhöhte Position, die dem venösen Rückfluss nicht hilft.",
          "Die direkte Konsequenz: Den ganzen Raum zu heizen ist die teuerste Antwort auf das am stärksten lokalisierte Problem im Haus. Kontaktwärme dagegen wirkt genau dort, wo sich die Kälte festsetzt.",
        ],
      },
      {
        title: "Die beheizbare Schreibtischunterlage: die Kontaktlösung",
        paragraphs: [
          "Eine großformatige beheizbare Schreibtischunterlage (80 × 33 cm) deckt die Zone von Tastatur und Maus ab: Handgelenke und Handflächen ruhen dauerhaft auf einer angenehm warmen Fläche, die Finger bleiben geschmeidig. Die Wärme kommt in wenigen Sekunden — das ist der Unterschied zum Heizkörper, der eine Stunde braucht, um Ihren Komfort zu verändern.",
          "Die zwei Sicherheitskriterien: eine automatische Abschaltung nach ~3 Stunden (das abendliche Vergessen ist die Regel, nicht die Ausnahme) und eine auf rund 45–50 °C begrenzte Oberflächentemperatur. Oberhalb von 43 °C bei längerem Dauerkontakt macht die Haut nicht mit — regelbare Stufen gibt es genau dafür: um den angenehm warmen Punkt zu finden, nicht um zu garen.",
        ],
      },
      {
        title: "Was das Setup ergänzt (und was nicht funktioniert)",
        paragraphs: [
          "Das wirksame Winter-Schreibtisch-Trio: beheizbare Schreibtischunterlage für die Hände, Tassenwärmer für den Kaffee — und wenn der Raum wirklich kalt ist, eine auf Sie gerichtete Keramikheizung. Zusammen verbraucht das Ganze weniger als eine alte Halogenlampe.",
          "Was enttäuscht: dicke fingerlose Handschuhe an der Tastatur (Präzisionsverlust, Schwitzen) und der Heizkörper am anderen Ende des Raums (die warme Luft erreicht die Decke, bevor sie Ihre Finger erreicht). Was gratis hilft: zwei Minuten Bewegung pro Stunde — die Durchblutung springt wieder an, die Kontaktwärme erledigt den Rest.",
        ],
      },
    ],
  },
};
