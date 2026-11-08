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
    image: "/images/products/gants.jpg",
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
    image: "/images/products/chaussons.jpg",
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
    image: "/images/products/chauffage.jpg",
    name: {
      fr: "Chauffage Céramique Pro",
      en: "Ceramic Heater Pro",
      de: "Keramik-Heizlüfter Pro",
      es: "Calefactor Cerámico Pro",
    },
    tagline: {
      fr: "Chauffe rapide, 2 niveaux, pour une petite pièce.",
      en: "Fast heat, 2 levels, sized for a small room.",
      de: "Schnelle Wärme, 2 Stufen, für kleine Räume.",
      es: "Calor rápido, 2 niveles, para habitaciones pequeñas.",
    },
    tags: {
      fr: ["3 NIVEAUX", "COMPACT"],
      en: ["3 MODES", "COMPACT"],
      de: ["3 MODI", "KOMPAKT"],
      es: ["3 MODOS", "COMPACTO"],
    },
    imageLabel: "PHOTO STUDIO — chauffage d'appoint",
    description: {
      fr: [
        "Chauffer toute la maison pour une seule pièce occupée, c'est le meilleur moyen de faire exploser la facture. Le chauffage d'appoint OBFLO réchauffe l'espace où tu es — un bureau, une chambre — en quelques minutes, puis maintient la température sans gaspiller.",
        "Céramique à chauffe rapide, trois modes dont une ventilation seule pour l'été, et des protections contre la surchauffe et le basculement : il se pose sur un bureau et se fait oublier.",
      ],
      en: [
        "Heating the whole house for one occupied room is the fastest way to blow up the bill. The OBFLO space heater warms the space you're actually in — a desk, a bedroom — within minutes, then holds the temperature without waste.",
        "Fast-heating ceramic, three modes including fan-only for summer, plus overheat and tip-over protection: it sits on a desk and disappears from your mind.",
      ],
      de: [
        "Das ganze Haus für ein einziges bewohntes Zimmer zu heizen, ist der schnellste Weg zu einer hohen Rechnung. Der OBFLO-Heizlüfter erwärmt den Raum, in dem du wirklich bist — Schreibtisch oder Schlafzimmer — in wenigen Minuten und hält die Temperatur dann ohne Verschwendung.",
        "Schnell heizende PTC-Keramik, drei Modi inklusive reinem Lüfterbetrieb für den Sommer, dazu Überhitzungs- und Umkippschutz: Er steht auf dem Schreibtisch und man vergisst ihn einfach.",
      ],
      es: [
        "Calentar toda la casa por una sola habitación ocupada es la forma más rápida de disparar la factura. El calefactor OBFLO calienta el espacio donde realmente estás — un escritorio, un dormitorio — en pocos minutos y mantiene la temperatura sin desperdicio.",
        "Cerámica PTC de calentamiento rápido, tres modos incluida la ventilación sola para el verano, y protecciones contra sobrecalentamiento y vuelco: se coloca en el escritorio y te olvidas de él.",
      ],
    },
    highlights: {
      fr: [
        "Chauffe une pièce de 10–15 m²",
        "3 modes dont ventilation seule",
        "Protections surchauffe + basculement",
        "Format compact, posable sur un bureau",
      ],
      en: [
        "Heats a 10–15 m² room",
        "3 modes including fan-only",
        "Overheat + tip-over protection",
        "Compact, fits on a desk",
      ],
      de: [
        "Heizt Räume von 10–15 m²",
        "3 Modi inkl. reinem Lüfterbetrieb",
        "Überhitzungs- + Umkippschutz",
        "Kompakt, passt auf den Schreibtisch",
      ],
      es: [
        "Calienta habitaciones de 10–15 m²",
        "3 modos incluida solo ventilación",
        "Protección contra sobrecalentamiento y vuelco",
        "Compacto, cabe en un escritorio",
      ],
    },
    specs: {
      fr: [
        { label: "Technologie", value: "Céramique PTC, chauffe rapide" },
        { label: "Modes", value: "3 (éco / confort / ventilation)" },
        { label: "Surface conseillée", value: "10 à 15 m²" },
        { label: "Sécurité", value: "Coupure surchauffe et basculement" },
        { label: "Alimentation", value: "Secteur 220–240 V" },
      ],
      en: [
        { label: "Technology", value: "PTC ceramic, fast heat-up" },
        { label: "Modes", value: "3 (eco / comfort / fan)" },
        { label: "Recommended area", value: "10 to 15 m²" },
        { label: "Safety", value: "Overheat and tip-over cut-off" },
        { label: "Power", value: "Mains 220–240 V" },
      ],
      de: [
        { label: "Technologie", value: "PTC-Keramik, schnelles Aufheizen" },
        { label: "Modi", value: "3 (Eco / Komfort / Lüfter)" },
        { label: "Empfohlene Fläche", value: "10 bis 15 m²" },
        { label: "Sicherheit", value: "Abschaltung bei Überhitzung und Umkippen" },
        { label: "Stromversorgung", value: "Netz 220–240 V, EU-Stecker" },
      ],
      es: [
        { label: "Tecnología", value: "Cerámica PTC, calentamiento rápido" },
        { label: "Modos", value: "3 (eco / confort / ventilador)" },
        { label: "Superficie recomendada", value: "10 a 15 m²" },
        { label: "Seguridad", value: "Corte por sobrecalentamiento y vuelco" },
        { label: "Alimentación", value: "Red 220–240 V, enchufe EU" },
      ],
    },
    gallery: [
      "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
      "PHOTO MACRO — grille et lueur chaude",
      "PHOTO — dans une chambre, lumière tamisée",
      "PACKSHOT — chauffage sur fond studio sombre",
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
