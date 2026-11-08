// Produits historiques (essentiels homepage) — fr/en/de/es.
import type { ProductSource } from "./catalog-types";

export const productsA: ProductSource[] = [
  {
    id: "gants-chauffants",
    slug: {
      fr: "gants-chauffants",
      en: "heated-gloves",
      de: "beheizbare-handschuhe",
      es: "guantes-calefactables",
    },
    price: 44,
    category: "mains",
    glow: "warm",
    badge: "new",
    image: "/images/products/gants-chauffants/02-packshot.jpg",
    photos: [
      "/images/products/gants-chauffants/01-hero.jpg",
      "/images/products/gants-chauffants/02-packshot.jpg",
      "/images/products/gants-chauffants/03-usage-tribune.jpg",
      "/images/products/gants-chauffants/04-detail-poche.jpg",
    ],
    name: {
      fr: "Gants Chauffants USB à Zip",
      en: "USB Zip Heated Gloves",
      de: "USB-Heizhandschuhe mit Reißverschluss",
      es: "Guantes Calefactables USB con Cremallera",
    },
    tagline: {
      fr: "Coupe-vent, chauffants, branchés en USB.",
      en: "Windproof, heated, plugged in over USB.",
      de: "Winddicht, beheizt, per USB.",
      es: "Cortavientos, calefactables, por USB.",
    },
    tags: {
      fr: [
        "USB",
        "COUPE-VENT",
      ],
      en: [
        "USB",
        "WINDPROOF",
      ],
      de: [
        "USB",
        "WINDDICHT",
      ],
      es: [
        "USB",
        "CORTAVIENTOS",
      ],
    },
    imageLabel: "PHOTO STUDIO — gants chauffants USB à zip",
    description: {
      fr: [
        "Des gants thermiques coupe-vent avec fermeture zippée, qui chauffent par alimentation USB. Pour les mains qui gèlent au guidon, à l'arrêt de bus ou devant l'ordinateur.",
        "Nous proposons la version à câble USB : les gants se branchent directement sur une batterie externe (non incluse) gardée dans la poche. Le fabricant n'annonce ni température, ni niveaux, ni autonomie : nous ne les affirmons donc pas.",
      ],
      en: [
        "Windproof thermal gloves with a zip fastening, heated through USB power. For hands that freeze on handlebars, at the bus stop or at the computer.",
        "We offer the USB-cable version: the gloves plug straight into a power bank (not included) kept in your pocket. The manufacturer gives no temperature, levels or battery life, so we do not state any.",
      ],
      de: [
        "Winddichte Thermohandschuhe mit Reißverschluss, die per USB-Strom heizen. Für Hände, die am Lenker, an der Haltestelle oder am Computer frieren.",
        "Wir bieten die Version mit USB-Kabel an: Die Handschuhe werden direkt an eine Powerbank (nicht enthalten) in der Tasche angeschlossen. Der Hersteller nennt weder Temperatur noch Stufen oder Laufzeit, daher geben wir keine an.",
      ],
      es: [
        "Guantes térmicos cortavientos con cremallera, que calientan por alimentación USB. Para manos que se congelan en el manillar, en la parada o frente al ordenador.",
        "Ofrecemos la versión con cable USB: los guantes se conectan directamente a una batería externa (no incluida) en el bolsillo. El fabricante no indica temperatura, niveles ni autonomía, así que no los afirmamos.",
      ],
    },
    highlights: {
      fr: [
        "Chauffage par alimentation USB",
        "Version à câble USB",
        "Thermiques et coupe-vent",
        "Fermeture zippée, mixtes adulte",
      ],
      en: [
        "Heating via USB power",
        "USB-cable version",
        "Thermal and windproof",
        "Zip fastening, adult unisex",
      ],
      de: [
        "Heizung über USB-Strom",
        "Version mit USB-Kabel",
        "Thermisch und winddicht",
        "Reißverschluss, Unisex für Erwachsene",
      ],
      es: [
        "Calor por alimentación USB",
        "Versión con cable USB",
        "Térmicos y cortavientos",
        "Cremallera, unisex para adultos",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB — version câble USB, batterie externe non incluse" },
        { label: "Protection", value: "Thermique, coupe-vent" },
        { label: "Fermeture", value: "Zip" },
        { label: "Public", value: "Adulte, mixte" },
        { label: "Matière", value: "Tissu" },
      ],
      en: [
        { label: "Power", value: "USB — USB-cable version, power bank not included" },
        { label: "Protection", value: "Thermal, windproof" },
        { label: "Fastening", value: "Zip" },
        { label: "Fit", value: "Adult, unisex" },
        { label: "Material", value: "Fabric" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB — Version mit USB-Kabel, Powerbank nicht enthalten" },
        { label: "Schutz", value: "Thermisch, winddicht" },
        { label: "Verschluss", value: "Reißverschluss" },
        { label: "Passform", value: "Erwachsene, unisex" },
        { label: "Material", value: "Stoff" },
      ],
      es: [
        { label: "Alimentación", value: "USB — versión con cable USB, batería externa no incluida" },
        { label: "Protección", value: "Térmicos, cortavientos" },
        { label: "Cierre", value: "Cremallera" },
        { label: "Público", value: "Adulto, unisex" },
        { label: "Material", value: "Tela" },
      ],
    },
    gallery: [
      "PHOTO — gants chauffants USB à zip",
      "PHOTO MACRO — fermeture zippée",
      "PHOTO — câble USB relié à une batterie externe",
      "PACKSHOT — paire de gants sur fond studio",
    ],
  },
  {
    id: "chaussons-chauffants",
    slug: {
      fr: "chaussons-chauffants",
      en: "heated-slippers",
      de: "beheizbare-hausschuhe",
      es: "zapatillas-calefactables",
    },
    price: 44,
    category: "pieds",
    glow: "cold",
    image: "/images/products/chaussons-chauffants/02-packshot.jpg",
    photos: [
      "/images/products/chaussons-chauffants/01-hero.jpg",
      "/images/products/chaussons-chauffants/02-packshot.jpg",
      "/images/products/chaussons-chauffants/03-usage-teletravail.jpg",
      "/images/products/chaussons-chauffants/04-usage-lecture.jpg",
      "/images/products/chaussons-chauffants/05-detail-zip.jpg",
    ],
    name: {
      fr: "Chauffe-Pieds Peluche USB",
      en: "USB Plush Foot Warmer",
      de: "USB-Plüsch-Fußwärmer",
      es: "Calientapiés de Peluche USB",
    },
    tagline: {
      fr: "Une pochette en peluche où glisser les pieds.",
      en: "A plush pouch to slide your feet into.",
      de: "Eine Plüschtasche für die Füße.",
      es: "Una bolsa de peluche donde meter los pies.",
    },
    tags: {
      fr: [
        "USB",
        "PELUCHE",
      ],
      en: [
        "USB",
        "PLUSH",
      ],
      de: [
        "USB",
        "PLÜSCH",
      ],
      es: [
        "USB",
        "PELUCHE",
      ],
    },
    imageLabel: "PHOTO STUDIO — chauffe-pieds peluche USB",
    description: {
      fr: [
        "Ce n'est pas un chausson qu'on porte pour marcher : c'est une pochette en peluche, à poser sous le bureau ou devant le canapé, dans laquelle on glisse les pieds (ou les mains). Elle mesure environ 32 × 28 cm pour 12 cm de haut.",
        "La peluche (imitation lapin) recouvre un film chauffant alimenté en USB. Le fabricant annonce une montée en chaleur en 3 minutes et une housse amovible, facile à laver. Câble USB fourni, batterie externe ou chargeur non inclus.",
      ],
      en: [
        "This is not a slipper you walk in: it is a plush pouch to place under the desk or by the sofa, where you slide your feet (or hands). It measures about 32 × 28 cm and 12 cm high.",
        "Imitation-rabbit plush covers a USB-powered heating film. The manufacturer states it heats up in 3 minutes and has a removable cover that is easy to wash. USB cable supplied; power bank or charger not included.",
      ],
      de: [
        "Das ist kein Hausschuh zum Laufen: Es ist eine Plüschtasche, die unter dem Schreibtisch oder am Sofa steht und in die man die Füße (oder Hände) steckt. Sie misst etwa 32 × 28 cm bei 12 cm Höhe.",
        "Kunstkaninchen-Plüsch umgibt eine USB-betriebene Heizfolie. Laut Hersteller heizt sie in 3 Minuten auf und hat einen abnehmbaren, leicht waschbaren Bezug. USB-Kabel im Lieferumfang; Powerbank oder Ladegerät nicht enthalten.",
      ],
      es: [
        "No es una zapatilla para caminar: es una bolsa de peluche que se coloca bajo el escritorio o junto al sofá y en la que se meten los pies (o las manos). Mide unos 32 × 28 cm y 12 cm de alto.",
        "La peluche (imitación de conejo) cubre una lámina calefactora alimentada por USB. El fabricante indica que se calienta en 3 minutos y que la funda es desmontable y fácil de lavar. Cable USB incluido; batería externa o cargador no incluidos.",
      ],
    },
    highlights: {
      fr: [
        "Pochette en peluche, pour poste fixe",
        "Chauffe en 3 minutes (fabricant)",
        "Housse amovible et lavable (fabricant)",
        "Alimentation USB, câble fourni",
      ],
      en: [
        "Plush pouch for a fixed spot",
        "Heats in 3 minutes (manufacturer)",
        "Removable washable cover (manufacturer)",
        "USB powered, cable supplied",
      ],
      de: [
        "Plüschtasche für den festen Platz",
        "Heizt in 3 Minuten auf (Hersteller)",
        "Abnehmbarer, waschbarer Bezug (Hersteller)",
        "USB-Betrieb, Kabel im Lieferumfang",
      ],
      es: [
        "Bolsa de peluche para un sitio fijo",
        "Se calienta en 3 minutos (fabricante)",
        "Funda desmontable y lavable (fabricante)",
        "Alimentación USB, cable incluido",
      ],
    },
    specs: {
      fr: [
        { label: "Type", value: "Chauffe-pieds en pochette — ne se porte pas pour marcher" },
        { label: "Dimensions", value: "≈ 32 × 28 × 12 cm" },
        { label: "Alimentation", value: "USB — batterie externe ou chargeur non inclus" },
        { label: "Matière", value: "Peluche imitation lapin + film chauffant" },
        { label: "Contenu", value: "Chauffe-pieds + câble USB" },
      ],
      en: [
        { label: "Type", value: "Pouch foot warmer — not for walking in" },
        { label: "Size", value: "≈ 32 × 28 × 12 cm" },
        { label: "Power", value: "USB — power bank or charger not included" },
        { label: "Material", value: "Imitation-rabbit plush + heating film" },
        { label: "Contents", value: "Foot warmer + USB cable" },
      ],
      de: [
        { label: "Typ", value: "Fußwärmer als Tasche — nicht zum Laufen" },
        { label: "Maße", value: "≈ 32 × 28 × 12 cm" },
        { label: "Stromversorgung", value: "USB — Powerbank oder Ladegerät nicht enthalten" },
        { label: "Material", value: "Kunstkaninchen-Plüsch + Heizfolie" },
        { label: "Lieferumfang", value: "Fußwärmer + USB-Kabel" },
      ],
      es: [
        { label: "Tipo", value: "Calientapiés en bolsa — no para caminar" },
        { label: "Dimensiones", value: "≈ 32 × 28 × 12 cm" },
        { label: "Alimentación", value: "USB — batería externa o cargador no incluidos" },
        { label: "Material", value: "Peluche imitación conejo + lámina calefactora" },
        { label: "Contenido", value: "Calientapiés + cable USB" },
      ],
    },
    gallery: [
      "PHOTO STUDIO — chauffe-pieds peluche USB",
      "PHOTO — pieds glissés dans la pochette sous un bureau",
      "PHOTO — housse retirée pour le lavage",
      "PHOTO MACRO — peluche et fermeture",
    ],
  },
  {
    id: "chauffage-appoint",
    slug: {
      fr: "chauffage-appoint",
      en: "portable-space-heater",
      de: "keramik-heizluefter",
      es: "calefactor-ceramico",
    },
    price: 49,
    category: "piece",
    glow: "warm",
    badge: "new",
    image: "/images/products/chauffage-appoint/02-packshot.jpg",
    photos: [
      "/images/products/chauffage-appoint/01-hero.jpg",
      "/images/products/chauffage-appoint/02-packshot.jpg",
      "/images/products/chauffage-appoint/03-usage-pieds.jpg",
      "/images/products/chauffage-appoint/04-detail-interrupteur.jpg",
    ],
    name: {
      fr: "Mini Chauffage d'Appoint",
      en: "Mini Personal Heater",
      de: "Mini-Heizlüfter",
      es: "Mini Calefactor Personal",
    },
    tagline: {
      fr: "Chauffe la personne, pas la pièce. 250 W.",
      en: "Heats you, not the whole room. 250 W.",
      de: "Wärmt dich, nicht den ganzen Raum. 250 W.",
      es: "Te calienta a ti, no a toda la habitación. 250 W.",
    },
    tags: {
      fr: ["250 W", "MINI"],
      en: ["250 W", "MINI"],
      de: ["250 W", "MINI"],
      es: ["250 W", "MINI"],
    },
    imageLabel: "PACKSHOT — mini chauffage turquoise",
    description: {
      fr: [
        "Chauffer toute la maison pour une seule personne assise à son bureau, c'est payer pour des mètres carrés vides. Ce mini chauffage soufflant fait l'inverse : posé à tes pieds ou sur le bureau, il envoie un flux d'air chaud là où tu es.",
        "250 W seulement, un interrupteur marche/arrêt, une coupure automatique en cas de surchauffe et 720 g sur la balance : il se déplace d'une pièce à l'autre et se range dans un tiroir. Ce n'est pas un radiateur pour chauffer une chambre entière — c'est un chauffage personnel.",
      ],
      en: [
        "Heating the whole house for one person sitting at a desk means paying for empty square metres. This mini fan heater does the opposite: at your feet or on the desk, it blows warm air right where you are.",
        "Only 250 W, an on/off rocker switch, automatic overheat cut-off and 720 g on the scale: it moves from room to room and fits in a drawer. It's not a radiator for a whole bedroom — it's a personal heater.",
      ],
      de: [
        "Das ganze Haus für eine Person am Schreibtisch zu heizen heißt, für leere Quadratmeter zu zahlen. Dieser Mini-Heizlüfter macht das Gegenteil: zu deinen Füßen oder auf dem Schreibtisch bläst er warme Luft genau dorthin, wo du bist.",
        "Nur 250 W, ein Ein/Aus-Schalter, automatische Abschaltung bei Überhitzung und 720 g Gewicht: Er wandert von Raum zu Raum und passt in eine Schublade. Kein Heizkörper für ein ganzes Zimmer — ein persönlicher Heizlüfter.",
      ],
      es: [
        "Calentar toda la casa para una persona sentada en su escritorio es pagar por metros cuadrados vacíos. Este mini calefactor hace lo contrario: a tus pies o sobre el escritorio, sopla aire caliente justo donde estás.",
        "Solo 250 W, un interruptor de encendido/apagado, corte automático por sobrecalentamiento y 720 g de peso: pasa de una habitación a otra y cabe en un cajón. No es un radiador para toda una habitación — es un calefactor personal.",
      ],
    },
    highlights: {
      fr: [
        "Air chaud dirigé vers toi",
        "250 W : consommation maîtrisée",
        "Coupure automatique en cas de surchauffe",
        "720 g, se pose à tes pieds ou sur le bureau",
      ],
      en: [
        "Warm air aimed at you",
        "250 W: controlled consumption",
        "Automatic overheat cut-off",
        "720 g, sits at your feet or on the desk",
      ],
      de: [
        "Warme Luft direkt auf dich gerichtet",
        "250 W: überschaubarer Verbrauch",
        "Automatische Abschaltung bei Überhitzung",
        "720 g, steht zu deinen Füßen oder auf dem Schreibtisch",
      ],
      es: [
        "Aire caliente dirigido hacia ti",
        "250 W: consumo controlado",
        "Corte automático por sobrecalentamiento",
        "720 g, a tus pies o sobre el escritorio",
      ],
    },
    specs: {
      fr: [
        { label: "Type", value: "Mini chauffage soufflant" },
        { label: "Puissance", value: "250 W" },
        { label: "Commande", value: "Interrupteur marche / arrêt" },
        { label: "Sécurité", value: "Coupure automatique en cas de surchauffe" },
        { label: "Poids", value: "720 g" },
        { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
      ],
      en: [
        { label: "Type", value: "Mini fan heater" },
        { label: "Power", value: "250 W" },
        { label: "Control", value: "On / off rocker switch" },
        { label: "Safety", value: "Automatic overheat cut-off" },
        { label: "Weight", value: "720 g" },
        { label: "Power supply", value: "Mains 220–240 V, EU plug" },
      ],
      de: [
        { label: "Typ", value: "Mini-Heizlüfter" },
        { label: "Leistung", value: "250 W" },
        { label: "Bedienung", value: "Ein/Aus-Wippschalter" },
        { label: "Sicherheit", value: "Automatische Abschaltung bei Überhitzung" },
        { label: "Gewicht", value: "720 g" },
        { label: "Stromversorgung", value: "Netz 220–240 V, EU-Stecker" },
      ],
      es: [
        { label: "Tipo", value: "Mini calefactor de aire" },
        { label: "Potencia", value: "250 W" },
        { label: "Control", value: "Interruptor de encendido / apagado" },
        { label: "Seguridad", value: "Corte automático por sobrecalentamiento" },
        { label: "Peso", value: "720 g" },
        { label: "Alimentación", value: "Red 220–240 V, enchufe EU" },
      ],
    },
    gallery: [
      "PHOTO — mini chauffage à côté d'un bureau",
      "PACKSHOT — mini chauffage turquoise",
      "PHOTO — air chaud vers les pieds",
      "PHOTO MACRO — interrupteur",
    ],
  },
  {
    id: "mini-chauffe-tasse",
    slug: {
      fr: "mini-chauffe-tasse",
      en: "mug-warmer",
      de: "tassenwaermer",
      es: "calientatazas",
    },
    price: 39,
    category: "bureau",
    glow: "cold",
    image: "/images/products/tasse.jpg",
    name: {
      fr: "Mini Chauffe-Tasse USB",
      en: "USB Mini Cup Warmer",
      de: "USB-Mini-Tassenwärmer",
      es: "Mini Calentador de Taza USB",
    },
    tagline: {
      fr: "Votre café reste tiède, branché en USB.",
      en: "Keeps your coffee warm, plugged into USB.",
      de: "Hält den Kaffee warm, per USB.",
      es: "Mantiene tu café caliente, por USB.",
    },
    tags: {
      fr: [
        "USB",
        "3 RÉGLAGES",
      ],
      en: [
        "USB",
        "3 SETTINGS",
      ],
      de: [
        "USB",
        "3 STUFEN",
      ],
      es: [
        "USB",
        "3 AJUSTES",
      ],
    },
    imageLabel: "PHOTO STUDIO — mini chauffe-tasse USB",
    description: {
      fr: [
        "Un petit plateau chauffant de 118 × 132 mm sur lequel on pose sa tasse, pour que le café ou le thé ne refroidisse pas pendant qu'on travaille. Il se branche sur un port USB.",
        "Le fabricant annonce trois réglages de température constante. Il ne précise pas les températures exactes ni la puissance en watts, nous ne les indiquons donc pas. À poser sur une surface plane, avec une tasse à fond plat.",
      ],
      en: [
        "A small 118 × 132 mm heated plate to rest your cup on, so coffee or tea does not go cold while you work. It plugs into a USB port.",
        "The manufacturer states three constant-temperature settings. Exact temperatures and wattage are not given, so we do not state them. Place on a flat surface, with a flat-bottomed cup.",
      ],
      de: [
        "Eine kleine beheizte Platte von 118 × 132 mm für die Tasse, damit Kaffee oder Tee beim Arbeiten nicht kalt wird. Sie wird an einen USB-Anschluss gesteckt.",
        "Der Hersteller nennt drei Einstellungen mit konstanter Temperatur. Genaue Temperaturen und Wattzahl werden nicht angegeben, daher nennen wir sie nicht. Auf eine ebene Fläche stellen, mit flachem Tassenboden.",
      ],
      es: [
        "Una pequeña placa calefactora de 118 × 132 mm sobre la que apoyar la taza, para que el café o el té no se enfríen mientras trabajas. Se conecta a un puerto USB.",
        "El fabricante indica tres ajustes de temperatura constante. No da las temperaturas exactas ni la potencia en vatios, así que no las indicamos. Colócala en una superficie plana, con una taza de base plana.",
      ],
    },
    highlights: {
      fr: [
        "Alimentation USB 5 V",
        "Trois réglages de température constante",
        "Plateau de 118 × 132 mm",
        "Se branche sur un port USB",
      ],
      en: [
        "USB 5 V power",
        "Three constant-temperature settings",
        "118 × 132 mm plate",
        "Plugs into a USB port",
      ],
      de: [
        "USB-Betrieb mit 5 V",
        "Drei Einstellungen mit konstanter Temperatur",
        "Platte 118 × 132 mm",
        "Wird an einen USB-Anschluss gesteckt",
      ],
      es: [
        "Alimentación USB 5 V",
        "Tres ajustes de temperatura constante",
        "Placa de 118 × 132 mm",
        "Se conecta a un puerto USB",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5 V" },
        { label: "Réglages", value: "3, température constante" },
        { label: "Plateau", value: "118 × 132 mm" },
        { label: "Coloris", value: "Noir" },
        { label: "Contenu", value: "Plateau chauffant" },
      ],
      en: [
        { label: "Power", value: "USB 5 V" },
        { label: "Settings", value: "3, constant temperature" },
        { label: "Plate", value: "118 × 132 mm" },
        { label: "Colour", value: "Black" },
        { label: "Contents", value: "Heated plate" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5 V" },
        { label: "Einstellungen", value: "3, konstante Temperatur" },
        { label: "Platte", value: "118 × 132 mm" },
        { label: "Farbe", value: "Schwarz" },
        { label: "Lieferumfang", value: "Heizplatte" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5 V" },
        { label: "Ajustes", value: "3, temperatura constante" },
        { label: "Placa", value: "118 × 132 mm" },
        { label: "Color", value: "Negro" },
        { label: "Contenido", value: "Placa calefactora" },
      ],
    },
    gallery: [
      "PHOTO STUDIO — mini chauffe-tasse USB",
      "PHOTO — tasse posée sur le plateau, au bureau",
      "PHOTO MACRO — plateau chauffant",
      "PHOTO — branchement sur un port USB",
    ],
  },
];
