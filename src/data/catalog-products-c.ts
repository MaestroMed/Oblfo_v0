// Produits CJdropshipping ajoutés 11/2026 — fr/en/de/es. Specs reprises de la fiche CJ, rien d'inventé.
import type { ProductSource } from "./catalog-types";

export const productsC: ProductSource[] = [
  {
    id: "echarpe-chauffante",
    slug: {
      fr: "echarpe-chauffante",
      en: "heated-scarf",
      de: "beheizbarer-schal",
      es: "bufanda-calefactable",
    },
    price: 29,
    category: "corps",
    glow: "warm",
    badge: "new",
    image: "/images/products/echarpe-chauffante/02-packshot.jpg",
    photos: [
      "/images/products/echarpe-chauffante/01-hero.jpg",
      "/images/products/echarpe-chauffante/02-packshot.jpg",
      "/images/products/echarpe-chauffante/03-usage-quai.jpg",
      "/images/products/echarpe-chauffante/04-usage-interieur.jpg",
      "/images/products/echarpe-chauffante/05-detail.jpg",
    ],
    name: {
      fr: "Écharpe Chauffante USB",
      en: "USB Heated Scarf",
      de: "USB-Heizschal",
      es: "Bufanda Calefactable USB",
    },
    tagline: {
      fr: "Un tour de cou qui chauffe, sur trois niveaux.",
      en: "A neck wrap that heats, on three levels.",
      de: "Ein Halswärmer mit drei Heizstufen.",
      es: "Un cuello que calienta, con tres niveles.",
    },
    tags: {
      fr: [
        "USB",
        "3 NIVEAUX",
      ],
      en: [
        "USB",
        "3 LEVELS",
      ],
      de: [
        "USB",
        "3 STUFEN",
      ],
      es: [
        "USB",
        "3 NIVELES",
      ],
    },
    imageLabel: "PACKSHOT — écharpe chauffante USB, indicateur de niveau visible",
    description: {
      fr: [
        "Le cou est l'endroit où le froid s'invite en premier. Cette écharpe chauffante en tissu doux se pose autour du cou et diffuse une chaleur régulière, sans la lourdeur d'un manteau supplémentaire.",
        "Elle s'alimente en USB (5 V, 4 W) et propose trois niveaux de chauffe signalés par une couleur : rouge 55 °C, bleu 48 °C, vert 42 °C. Un appui long de trois secondes la met en marche. Les niveaux sont ceux indiqués par le fabricant.",
      ],
      en: [
        "The neck is where the cold gets in first. This soft-fabric heated scarf sits around the neck and gives steady warmth, without the bulk of an extra coat.",
        "It runs on USB (5 V, 4 W) and offers three heat levels shown by colour: red 55 °C, blue 48 °C, green 42 °C. A three-second long press switches it on. Levels are those stated by the manufacturer.",
      ],
      de: [
        "Am Hals dringt die Kälte zuerst ein. Dieser Heizschal aus weichem Stoff wird um den Hals gelegt und gibt gleichmäßige Wärme, ohne die Schwere einer zusätzlichen Jacke.",
        "Er wird per USB betrieben (5 V, 4 W) und bietet drei Heizstufen, die farblich angezeigt werden: rot 55 °C, blau 48 °C, grün 42 °C. Ein dreisekündiger Druck schaltet ihn ein. Die Stufen entsprechen den Herstellerangaben.",
      ],
      es: [
        "El cuello es por donde el frío entra primero. Esta bufanda calefactable de tela suave se coloca alrededor del cuello y da un calor constante, sin el peso de otro abrigo.",
        "Funciona por USB (5 V, 4 W) y ofrece tres niveles de calor indicados por color: rojo 55 °C, azul 48 °C, verde 42 °C. Una pulsación larga de tres segundos la enciende. Los niveles son los que indica el fabricante.",
      ],
    },
    highlights: {
      fr: [
        "Trois niveaux : 42, 48 et 55 °C",
        "Alimentation USB 5 V, 4 W",
        "Tissu doux, léger autour du cou",
        "Lavable à l'eau sans démontage (fabricant)",
      ],
      en: [
        "Three levels: 42, 48 and 55 °C",
        "USB power, 5 V, 4 W",
        "Soft, light fabric around the neck",
        "Water washable without disassembly (manufacturer)",
      ],
      de: [
        "Drei Stufen: 42, 48 und 55 °C",
        "USB-Betrieb, 5 V, 4 W",
        "Weicher, leichter Stoff am Hals",
        "Ohne Zerlegen mit Wasser waschbar (Hersteller)",
      ],
      es: [
        "Tres niveles: 42, 48 y 55 °C",
        "Alimentación USB, 5 V, 4 W",
        "Tela suave y ligera en el cuello",
        "Lavable con agua sin desmontar (fabricante)",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5 V, 4 W (batterie externe non incluse)" },
        { label: "Niveaux de chauffe", value: "3 : vert 42 °C / bleu 48 °C / rouge 55 °C" },
        { label: "Allumage", value: "Appui long de 3 secondes" },
        { label: "Matière", value: "Tissu" },
        { label: "Entretien", value: "Lavable à l'eau selon le fabricant — débrancher avant" },
      ],
      en: [
        { label: "Power", value: "USB 5 V, 4 W (power bank not included)" },
        { label: "Heat levels", value: "3: green 42 °C / blue 48 °C / red 55 °C" },
        { label: "Switch on", value: "Long press, 3 seconds" },
        { label: "Material", value: "Fabric" },
        { label: "Care", value: "Water washable per manufacturer — unplug first" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5 V, 4 W (Powerbank nicht enthalten)" },
        { label: "Heizstufen", value: "3: grün 42 °C / blau 48 °C / rot 55 °C" },
        { label: "Einschalten", value: "3 Sekunden gedrückt halten" },
        { label: "Material", value: "Stoff" },
        { label: "Pflege", value: "Laut Hersteller mit Wasser waschbar — vorher abziehen" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5 V, 4 W (batería externa no incluida)" },
        { label: "Niveles de calor", value: "3: verde 42 °C / azul 48 °C / rojo 55 °C" },
        { label: "Encendido", value: "Pulsación larga de 3 segundos" },
        { label: "Material", value: "Tela" },
        { label: "Cuidado", value: "Lavable con agua según el fabricante — desenchufar antes" },
      ],
    },
    gallery: [
      "PACKSHOT — écharpe chauffante USB",
      "PHOTO — écharpe portée autour du cou",
      "PHOTO MACRO — indicateur de niveau coloré",
      "PHOTO — écharpe branchée à une batterie externe",
    ],
  },
  {
    id: "ceinture-lombaire-chauffante",
    slug: {
      fr: "ceinture-lombaire-chauffante",
      en: "heated-lumbar-belt",
      de: "beheizbarer-lendengurt",
      es: "cinturon-lumbar-calefactable",
    },
    price: 64,
    category: "corps",
    glow: "warm",
    badge: "new",
    name: {
      fr: "Ceinture Chauffante Rechargeable",
      en: "Rechargeable Heated Belt",
      de: "Wiederaufladbarer Heizgürtel",
      es: "Cinturón Calefactable Recargable",
    },
    tagline: {
      fr: "Chaleur au ventre et aux reins, sans fil.",
      en: "Warmth for belly and lower back, cordless.",
      de: "Wärme für Bauch und unteren Rücken, kabellos.",
      es: "Calor en vientre y lumbares, sin cable.",
    },
    tags: {
      fr: [
        "SANS FIL",
        "VIBRATION",
      ],
      en: [
        "CORDLESS",
        "VIBRATION",
      ],
      de: [
        "KABELLOS",
        "VIBRATION",
      ],
      es: [
        "SIN CABLE",
        "VIBRACIÓN",
      ],
    },
    imageLabel: "PACKSHOT — ceinture chauffante rechargeable avec ceinture élastique",
    description: {
      fr: [
        "Une ceinture en polaire à bande élastique, qui se porte à la taille et chauffe le bas du dos ou le ventre. Elle contient sa propre batterie : pas de câble pendant l'usage, on peut bouger, travailler ou rester sur le canapé.",
        "Trois températures au choix (45, 55 ou 65 °C) et cinq intensités de vibration. Elle se recharge en USB-C. C'est un produit de confort : il ne soigne rien et ne remplace pas un avis médical.",
      ],
      en: [
        "A fleece belt with an elastic band, worn at the waist to warm the lower back or belly. It has its own battery: no cable while in use, so you can move, work or stay on the sofa.",
        "Three temperatures to choose from (45, 55 or 65 °C) and five vibration levels. It recharges over USB-C. It is a comfort product: it does not treat anything and is no substitute for medical advice.",
      ],
      de: [
        "Ein Fleecegürtel mit elastischem Band, der in der Taille getragen wird und den unteren Rücken oder den Bauch wärmt. Er hat einen eigenen Akku: kein Kabel im Betrieb, Sie können sich bewegen, arbeiten oder auf dem Sofa bleiben.",
        "Drei Temperaturen zur Wahl (45, 55 oder 65 °C) und fünf Vibrationsstufen. Aufgeladen wird per USB-C. Ein Komfortprodukt: Es behandelt nichts und ersetzt keinen ärztlichen Rat.",
      ],
      es: [
        "Un cinturón de forro polar con banda elástica, que se lleva en la cintura y calienta la zona lumbar o el vientre. Lleva su propia batería: sin cable durante el uso, puedes moverte, trabajar o quedarte en el sofá.",
        "Tres temperaturas a elegir (45, 55 o 65 °C) y cinco niveles de vibración. Se recarga por USB-C. Es un producto de confort: no cura nada y no sustituye el consejo médico.",
      ],
    },
    highlights: {
      fr: [
        "Batterie intégrée 2 500 mAh, sans fil en usage",
        "Trois températures : 45, 55 et 65 °C",
        "Cinq niveaux de vibration",
        "Recharge USB-C, ceinture élastique",
      ],
      en: [
        "Built-in 2,500 mAh battery, cordless in use",
        "Three temperatures: 45, 55 and 65 °C",
        "Five vibration levels",
        "USB-C charging, elastic belt",
      ],
      de: [
        "Integrierter 2.500-mAh-Akku, im Betrieb kabellos",
        "Drei Temperaturen: 45, 55 und 65 °C",
        "Fünf Vibrationsstufen",
        "USB-C-Aufladung, elastischer Gurt",
      ],
      es: [
        "Batería integrada de 2.500 mAh, sin cable en uso",
        "Tres temperaturas: 45, 55 y 65 °C",
        "Cinco niveles de vibración",
        "Carga USB-C, cinturón elástico",
      ],
    },
    specs: {
      fr: [
        { label: "Batterie", value: "Lithium polymère intégrée, 2 500 mAh" },
        { label: "Recharge", value: "USB-C" },
        { label: "Puissance", value: "8 W" },
        { label: "Températures", value: "45 / 55 / 65 °C" },
        { label: "Vibration", value: "5 niveaux" },
        { label: "Matières", value: "ABS + PC + polaire + bande élastique" },
      ],
      en: [
        { label: "Battery", value: "Built-in lithium polymer, 2,500 mAh" },
        { label: "Charging", value: "USB-C" },
        { label: "Power", value: "8 W" },
        { label: "Temperatures", value: "45 / 55 / 65 °C" },
        { label: "Vibration", value: "5 levels" },
        { label: "Materials", value: "ABS + PC + fleece + elastic band" },
      ],
      de: [
        { label: "Akku", value: "Integrierter Lithium-Polymer, 2.500 mAh" },
        { label: "Aufladung", value: "USB-C" },
        { label: "Leistung", value: "8 W" },
        { label: "Temperaturen", value: "45 / 55 / 65 °C" },
        { label: "Vibration", value: "5 Stufen" },
        { label: "Materialien", value: "ABS + PC + Fleece + elastisches Band" },
      ],
      es: [
        { label: "Batería", value: "Polímero de litio integrado, 2.500 mAh" },
        { label: "Carga", value: "USB-C" },
        { label: "Potencia", value: "8 W" },
        { label: "Temperaturas", value: "45 / 55 / 65 °C" },
        { label: "Vibración", value: "5 niveles" },
        { label: "Materiales", value: "ABS + PC + forro polar + banda elástica" },
      ],
    },
    gallery: [
      "PACKSHOT — ceinture chauffante rechargeable",
      "PHOTO — ceinture portée à la taille",
      "PHOTO MACRO — module chauffant et boutons",
      "PHOTO — recharge USB-C",
    ],
  },
  {
    id: "tapis-chauffant-animaux",
    slug: {
      fr: "tapis-chauffant-animaux",
      en: "pet-heating-pad",
      de: "heizmatte-haustiere",
      es: "manta-calefactable-mascotas",
    },
    price: 39,
    // CJ ne montre que des prises AU : en vente seulement quand une variante EU est confirmée.
    available: false,
    category: "maison",
    glow: "warm",
    badge: "new",
    name: {
      fr: "Tapis Chauffant pour Animaux",
      en: "Pet Heating Pad",
      de: "Heizmatte für Haustiere",
      es: "Manta Calefactable para Mascotas",
    },
    tagline: {
      fr: "Une place chaude pour chien et chat.",
      en: "A warm spot for dogs and cats.",
      de: "Ein warmer Platz für Hund und Katze.",
      es: "Un sitio cálido para perros y gatos.",
    },
    tags: {
      fr: [
        "20 W",
        "2 RÉGLAGES",
      ],
      en: [
        "20 W",
        "2 SETTINGS",
      ],
      de: [
        "20 W",
        "2 STUFEN",
      ],
      es: [
        "20 W",
        "2 AJUSTES",
      ],
    },
    imageLabel: "PACKSHOT — tapis chauffant pour animaux, cordon visible",
    description: {
      fr: [
        "Un tapis chauffant de 45 × 45 cm à poser dans le panier, la niche ou sur un coussin, pour que chien ou chat ait une surface tiède en hiver. Il est en tissu suédine et PU double face.",
        "Un interrupteur propose deux niveaux de chauffe, haut et bas, plus l'arrêt. Le cordon est annoncé résistant aux morsures. Puissance 20 W : à surveiller comme tout appareil chauffant, surtout avec un animal qui mâchonne les câbles.",
      ],
      en: [
        "A 45 × 45 cm heating pad to place in a basket, kennel or on a cushion, so your dog or cat has a warm surface in winter. Suede-style fabric and double-sided PU.",
        "A switch gives two heat levels, high and low, plus off. The cord is described as chew-resistant. 20 W: use it like any heating appliance and keep an eye on an animal that likes to chew cables.",
      ],
      de: [
        "Eine 45 × 45 cm große Heizmatte für Korb, Hütte oder Kissen, damit Hund oder Katze im Winter eine warme Fläche hat. Aus Veloursstoff und doppelseitigem PU.",
        "Ein Schalter bietet zwei Heizstufen, hoch und niedrig, sowie Aus. Das Kabel wird als bissfest beschrieben. 20 W: wie jedes Heizgerät beaufsichtigen, besonders bei Tieren, die an Kabeln nagen.",
      ],
      es: [
        "Una manta calefactable de 45 × 45 cm para la cesta, la caseta o sobre un cojín, para que tu perro o gato tenga una superficie cálida en invierno. De tela tipo ante y PU de doble cara.",
        "Un interruptor ofrece dos niveles de calor, alto y bajo, además de apagado. El cable se describe como resistente a mordiscos. 20 W: úsala como cualquier aparato calefactor y vigila a los animales que muerdan cables.",
      ],
    },
    highlights: {
      fr: [
        "Format 45 × 45 cm",
        "Deux niveaux de chauffe + arrêt",
        "Cordon annoncé résistant aux morsures",
        "Suédine et PU double face",
      ],
      en: [
        "45 × 45 cm size",
        "Two heat levels + off",
        "Cord described as chew-resistant",
        "Suede-style fabric and double-sided PU",
      ],
      de: [
        "Format 45 × 45 cm",
        "Zwei Heizstufen + Aus",
        "Kabel als bissfest beschrieben",
        "Veloursstoff und doppelseitiges PU",
      ],
      es: [
        "Tamaño 45 × 45 cm",
        "Dos niveles de calor + apagado",
        "Cable descrito como resistente a mordiscos",
        "Tela tipo ante y PU de doble cara",
      ],
    },
    specs: {
      fr: [
        { label: "Dimensions", value: "45 × 45 cm" },
        { label: "Puissance", value: "20 W" },
        { label: "Réglage", value: "Interrupteur : haut / bas / arrêt" },
        { label: "Matières", value: "Suédine, PU double face" },
        { label: "Usage", value: "Chien et chat, à l'intérieur" },
      ],
      en: [
        { label: "Size", value: "45 × 45 cm" },
        { label: "Power", value: "20 W" },
        { label: "Setting", value: "Switch: high / low / off" },
        { label: "Materials", value: "Suede-style fabric, double-sided PU" },
        { label: "Use", value: "Dogs and cats, indoors" },
      ],
      de: [
        { label: "Maße", value: "45 × 45 cm" },
        { label: "Leistung", value: "20 W" },
        { label: "Einstellung", value: "Schalter: hoch / niedrig / aus" },
        { label: "Materialien", value: "Veloursstoff, doppelseitiges PU" },
        { label: "Einsatz", value: "Hund und Katze, drinnen" },
      ],
      es: [
        { label: "Dimensiones", value: "45 × 45 cm" },
        { label: "Potencia", value: "20 W" },
        { label: "Ajuste", value: "Interruptor: alto / bajo / apagado" },
        { label: "Materiales", value: "Tela tipo ante, PU de doble cara" },
        { label: "Uso", value: "Perros y gatos, en interior" },
      ],
    },
    gallery: [
      "PACKSHOT — tapis chauffant pour animaux",
      "PHOTO — chat couché sur le tapis",
      "PHOTO MACRO — interrupteur et cordon",
      "PHOTO — tapis posé dans un panier",
    ],
  },
  {
    id: "bonnet-chauffant",
    slug: {
      fr: "bonnet-chauffant",
      en: "heated-hat",
      de: "beheizbare-muetze",
      es: "gorro-calefactable",
    },
    price: 49,
    category: "corps",
    glow: "warm",
    badge: "new",
    name: {
      fr: "Bonnet Chauffant USB",
      en: "USB Heated Hat",
      de: "USB-Heizmütze",
      es: "Gorro Calefactable USB",
    },
    tagline: {
      fr: "Un bonnet qui chauffe, sur batterie externe.",
      en: "A hat that heats, from a power bank.",
      de: "Eine Mütze, die heizt – über die Powerbank.",
      es: "Un gorro que calienta, con batería externa.",
    },
    tags: {
      fr: [
        "USB",
        "40–50 °C",
      ],
      en: [
        "USB",
        "40–50 °C",
      ],
      de: [
        "USB",
        "40–50 °C",
      ],
      es: [
        "USB",
        "40–50 °C",
      ],
    },
    imageLabel: "PACKSHOT — bonnet chauffant USB avec câble",
    description: {
      fr: [
        "Un bonnet chauffant qui se branche en USB pour garder la tête au chaud par temps froid : marche, attente à l'arrêt de bus, trajet à vélo.",
        "Un module de conduction thermique produit une chaleur annoncée entre 40 et 50 °C. Il s'alimente en 5 V par un câble USB relié à une batterie externe (non incluse) glissée dans la poche. Un seul réglage : on branche et ça chauffe.",
      ],
      en: [
        "A heated hat that plugs in over USB to keep your head warm in cold weather: walks, waiting at the bus stop, a bike ride.",
        "A thermal conduction module gives a stated warmth of 40 to 50 °C. It runs on 5 V through a USB cable linked to a power bank (not included) in your pocket. No settings: plug in and it heats.",
      ],
      de: [
        "Eine Heizmütze, die per USB angeschlossen wird und den Kopf bei Kälte warm hält: Spaziergang, Warten an der Haltestelle, Fahrradtour.",
        "Ein Wärmeleitmodul erzeugt laut Hersteller 40 bis 50 °C. Betrieben wird die Mütze mit 5 V über ein USB-Kabel an einer Powerbank (nicht enthalten) in der Tasche. Keine Einstellungen: einstecken und es wird warm.",
      ],
      es: [
        "Un gorro calefactable que se conecta por USB para mantener la cabeza caliente con frío: paseos, esperas en la parada, trayectos en bici.",
        "Un módulo de conducción térmica da un calor indicado de 40 a 50 °C. Funciona a 5 V con un cable USB conectado a una batería externa (no incluida) en el bolsillo. Sin ajustes: conectas y calienta.",
      ],
    },
    highlights: {
      fr: [
        "Chaleur annoncée de 40 à 50 °C",
        "Alimentation USB 5 V",
        "Câble USB fourni",
        "Batterie externe non incluse",
      ],
      en: [
        "Stated warmth of 40 to 50 °C",
        "USB 5 V power",
        "USB cable supplied",
        "Power bank not included",
      ],
      de: [
        "Angegebene Wärme von 40 bis 50 °C",
        "USB-Betrieb mit 5 V",
        "USB-Kabel im Lieferumfang",
        "Powerbank nicht enthalten",
      ],
      es: [
        "Calor indicado de 40 a 50 °C",
        "Alimentación USB 5 V",
        "Cable USB incluido",
        "Batería externa no incluida",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5 V — batterie externe non incluse" },
        { label: "Température annoncée", value: "40 à 50 °C" },
        { label: "Chauffe", value: "Module de conduction thermique" },
        { label: "Matière", value: "Tissu mélangé" },
        { label: "Contenu", value: "Bonnet + câble USB" },
      ],
      en: [
        { label: "Power", value: "USB 5 V — power bank not included" },
        { label: "Stated temperature", value: "40 to 50 °C" },
        { label: "Heating", value: "Thermal conduction module" },
        { label: "Material", value: "Blended fabric" },
        { label: "Contents", value: "Hat + USB cable" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5 V — Powerbank nicht enthalten" },
        { label: "Angegebene Temperatur", value: "40 bis 50 °C" },
        { label: "Heizung", value: "Wärmeleitmodul" },
        { label: "Material", value: "Mischgewebe" },
        { label: "Lieferumfang", value: "Mütze + USB-Kabel" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5 V — batería externa no incluida" },
        { label: "Temperatura indicada", value: "40 a 50 °C" },
        { label: "Calefacción", value: "Módulo de conducción térmica" },
        { label: "Material", value: "Tejido mixto" },
        { label: "Contenido", value: "Gorro + cable USB" },
      ],
    },
    gallery: [
      "PACKSHOT — bonnet chauffant USB",
      "PHOTO — bonnet porté en extérieur",
      "PHOTO — câble USB relié à une batterie externe",
      "PHOTO MACRO — tissu du bonnet",
    ],
  },
  {
    id: "chaussettes-chauffantes",
    slug: {
      fr: "chaussettes-chauffantes",
      en: "heated-socks",
      de: "beheizbare-socken",
      es: "calcetines-calefactables",
    },
    price: 39,
    category: "pieds",
    glow: "cold",
    badge: "new",
    name: {
      fr: "Chaussettes Chauffantes USB",
      en: "USB Heated Socks",
      de: "USB-Heizsocken",
      es: "Calcetines Calefactables USB",
    },
    tagline: {
      fr: "Des chaussettes en velours qui chauffent, pour la maison.",
      en: "Velvet socks that heat, made for home.",
      de: "Samtsocken, die heizen – für zu Hause.",
      es: "Calcetines de terciopelo que calientan, para casa.",
    },
    tags: {
      fr: [
        "USB",
        "INTÉRIEUR",
      ],
      en: [
        "USB",
        "INDOOR",
      ],
      de: [
        "USB",
        "DRINNEN",
      ],
      es: [
        "USB",
        "INTERIOR",
      ],
    },
    imageLabel: "PACKSHOT — paire de chaussettes chauffantes USB",
    description: {
      fr: [
        "Des chaussettes d'intérieur en velours très doux qui chauffent grâce à une alimentation USB. Pensées pour la maison : télétravail, lecture, soirée canapé sur un sol froid.",
        "Taille unique, de 24 à 28 cm, pour homme comme pour femme. Elles se branchent en USB sur une batterie externe ou un chargeur (non inclus). Le fabricant n'indique ni température ni autonomie : nous ne les annonçons donc pas.",
      ],
      en: [
        "Indoor socks in very soft velvet that heat via USB power. Made for home: remote work, reading, sofa evenings on a cold floor.",
        "One size, 24 to 28 cm, for men and women. They plug into USB on a power bank or charger (not included). The manufacturer gives no temperature or battery life, so we do not state any.",
      ],
      de: [
        "Hausstrümpfe aus sehr weichem Samt, die per USB-Strom heizen. Gemacht für zu Hause: Homeoffice, Lesen, Sofaabend auf kaltem Boden.",
        "Einheitsgröße, 24 bis 28 cm, für Damen und Herren. Der Anschluss erfolgt per USB an Powerbank oder Ladegerät (nicht enthalten). Der Hersteller nennt weder Temperatur noch Laufzeit, daher geben wir keine an.",
      ],
      es: [
        "Calcetines de casa de terciopelo muy suave que calientan con alimentación USB. Pensados para el hogar: teletrabajo, lectura, tardes en el sofá con suelo frío.",
        "Talla única, de 24 a 28 cm, para hombre y mujer. Se conectan por USB a una batería externa o un cargador (no incluidos). El fabricante no indica temperatura ni autonomía, así que no las anunciamos.",
      ],
    },
    highlights: {
      fr: [
        "Velours très doux",
        "Alimentation USB",
        "Taille unique 24–28 cm, mixte",
        "Pensées pour l'intérieur",
      ],
      en: [
        "Very soft velvet",
        "USB powered",
        "One size 24–28 cm, unisex",
        "Made for indoor use",
      ],
      de: [
        "Sehr weicher Samt",
        "USB-Betrieb",
        "Einheitsgröße 24–28 cm, unisex",
        "Für den Einsatz drinnen gedacht",
      ],
      es: [
        "Terciopelo muy suave",
        "Alimentación USB",
        "Talla única 24–28 cm, unisex",
        "Pensados para uso en interior",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB — batterie externe ou chargeur non inclus" },
        { label: "Taille", value: "Unique, 24–28 cm" },
        { label: "Public", value: "Mixte, homme et femme" },
        { label: "Extérieur", value: "Velours très doux" },
        { label: "Usage", value: "Intérieur, à la maison" },
      ],
      en: [
        { label: "Power", value: "USB — power bank or charger not included" },
        { label: "Size", value: "One size, 24–28 cm" },
        { label: "Fit", value: "Unisex, men and women" },
        { label: "Outer", value: "Very soft velvet" },
        { label: "Use", value: "Indoor, at home" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB — Powerbank oder Ladegerät nicht enthalten" },
        { label: "Größe", value: "Einheitsgröße, 24–28 cm" },
        { label: "Passform", value: "Unisex, Damen und Herren" },
        { label: "Außenmaterial", value: "Sehr weicher Samt" },
        { label: "Einsatz", value: "Drinnen, zu Hause" },
      ],
      es: [
        { label: "Alimentación", value: "USB — batería externa o cargador no incluidos" },
        { label: "Talla", value: "Única, 24–28 cm" },
        { label: "Público", value: "Unisex, hombre y mujer" },
        { label: "Exterior", value: "Terciopelo muy suave" },
        { label: "Uso", value: "Interior, en casa" },
      ],
    },
    gallery: [
      "PACKSHOT — chaussettes chauffantes USB",
      "PHOTO — chaussettes portées sur un sol froid",
      "PHOTO — câble USB relié à une batterie externe",
      "PHOTO MACRO — velours des chaussettes",
    ],
  },
];
