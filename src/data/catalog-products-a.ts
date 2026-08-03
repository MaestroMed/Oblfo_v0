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
    price: 59,
    category: "mains",
    glow: "warm",
    badge: "new",
    image: "/images/products/gants.jpg",
    name: {
      fr: "Gants Chauffants Pro 2026",
      en: "Heated Gloves Pro 2026",
      de: "Beheizbare Handschuhe Pro 2026",
      es: "Guantes Calefactables Pro 2026",
    },
    tagline: {
      fr: "Chaleur rapide et réglable, paume et doigts.",
      en: "Fast, adjustable warmth across palm and fingers.",
      de: "Schnelle, regulierbare Wärme an Handfläche und Fingern.",
      es: "Calor rápido y regulable en palma y dedos.",
    },
    tags: {
      fr: ["USB", "3 NIVEAUX"],
      en: ["USB", "3 HEAT LEVELS"],
      de: ["USB", "3 HEIZSTUFEN"],
      es: ["USB", "3 NIVELES"],
    },
    imageLabel: "PHOTO STUDIO — gants chauffants",
    description: {
      fr: [
        "Des mains froides, c'est la première chose qui gâche une sortie d'hiver. Les gants chauffants OBFLO diffusent une chaleur douce sur la paume et le dessus des doigts — là où le froid mord en premier — en une trentaine de secondes.",
        "Trois niveaux de chauffe pour doser selon la météo, un textile déperlant qui encaisse la bruine, et une alimentation USB universelle : branche-les sur une powerbank dans la poche et tu es autonome pour la matinée.",
      ],
      en: [
        "Cold hands are the first thing that ruins a winter outing. OBFLO heated gloves deliver gentle warmth across the palm and the top of the fingers — where the cold bites first — in about thirty seconds.",
        "Three heat levels to match the weather, a water-repellent fabric that shrugs off drizzle, and universal USB power: plug them into a power bank in your pocket and you're set for the whole morning.",
      ],
      de: [
        "Kalte Hände verderben jeden Winterausflug als Erstes. Die beheizbaren OBFLO-Handschuhe wärmen Handfläche und Fingerrücken — genau dort, wo die Kälte zuerst zubeißt — in rund dreißig Sekunden.",
        "Drei Heizstufen je nach Wetter, ein wasserabweisendes Gewebe gegen Nieselregen und universelle USB-Stromversorgung: einfach an eine Powerbank in der Tasche anschließen und der Vormittag ist gesichert.",
      ],
      es: [
        "Las manos frías son lo primero que arruina una salida de invierno. Los guantes calefactables OBFLO reparten un calor suave por la palma y el dorso de los dedos — donde el frío muerde primero — en unos treinta segundos.",
        "Tres niveles de calor según el tiempo, un tejido repelente al agua que aguanta la llovizna y alimentación USB universal: conéctalos a una powerbank en el bolsillo y tienes toda la mañana resuelta.",
      ],
    },
    highlights: {
      fr: [
        "Zones chauffantes paume + doigts",
        "3 niveaux de chauffe",
        "Textile déperlant, index tactile",
        "Fonctionne sur powerbank",
      ],
      en: [
        "Heating zones on palm + fingers",
        "3 heat levels",
        "Water-repellent fabric, touchscreen index",
        "Works with any power bank",
      ],
      de: [
        "Heizzonen an Handfläche + Fingern",
        "3 Heizstufen",
        "Wasserabweisend, Touchscreen-Zeigefinger",
        "Läuft mit jeder Powerbank",
      ],
      es: [
        "Zonas de calor en palma + dedos",
        "3 niveles de calor",
        "Tejido repelente al agua, índice táctil",
        "Funciona con cualquier powerbank",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Niveaux de chauffe", value: "3 (éco / confort / boost)" },
        { label: "Temps de chauffe", value: "≈ 30 secondes" },
        {
          label: "Autonomie sur powerbank 10 000 mAh",
          value: "3 à 6 h selon le niveau",
        },
        { label: "Entretien", value: "Lavage à la main, câble débranché" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Heat levels", value: "3 (eco / comfort / boost)" },
        { label: "Heat-up time", value: "≈ 30 seconds" },
        {
          label: "Battery life on a 10,000 mAh power bank",
          value: "3 to 6 h depending on level",
        },
        { label: "Care", value: "Hand wash, cable unplugged" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5V" },
        { label: "Heizstufen", value: "3 (Eco / Komfort / Boost)" },
        { label: "Aufheizzeit", value: "≈ 30 Sekunden" },
        {
          label: "Laufzeit mit 10.000-mAh-Powerbank",
          value: "3 bis 6 Std. je nach Stufe",
        },
        { label: "Pflege", value: "Handwäsche, Kabel abgezogen" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5V" },
        { label: "Niveles de calor", value: "3 (eco / confort / boost)" },
        { label: "Tiempo de calentamiento", value: "≈ 30 segundos" },
        {
          label: "Autonomía con powerbank de 10.000 mAh",
          value: "3 a 6 h según el nivel",
        },
        { label: "Cuidado", value: "Lavado a mano, cable desconectado" },
      ],
    },
    gallery: [
      "PHOTO — gant chauffant porté, fond sombre, lueur orange",
      "PHOTO MACRO — zones chauffantes paume",
      "PHOTO — gants + powerbank dans une poche de manteau",
      "PACKSHOT — paire de gants sur fond studio sombre",
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
      fr: "Chaussons Chauffants Confort",
      en: "Comfort Heated Slippers",
      de: "Beheizbare Hausschuhe Komfort",
      es: "Zapatillas Calefactables Confort",
    },
    tagline: {
      fr: "Douceur & chaleur enveloppante, port USB discret.",
      en: "Soft, enveloping warmth with a discreet USB port.",
      de: "Weiche, umhüllende Wärme mit dezentem USB-Anschluss.",
      es: "Suavidad y calor envolvente con puerto USB discreto.",
    },
    tags: {
      fr: ["USB", "CHALEUR RAPIDE"],
      en: ["USB", "FAST HEAT"],
      de: ["USB", "SCHNELLE WÄRME"],
      es: ["USB", "CALOR RÁPIDO"],
    },
    imageLabel: "PHOTO STUDIO — chaussons chauffants",
    description: {
      fr: [
        "Rentrer chez soi et garder les pieds gelés pendant une heure, c'est fini. Les chaussons chauffants OBFLO concentrent la chaleur sur l'avant-pied, la zone la plus longue à réchauffer, avec un intérieur doux qui garde la chaleur même une fois débranchés.",
        "Le port USB est discret, le câble se détache pour marcher librement, et l'ensemble se lave à la main une fois le module débranché.",
      ],
      en: [
        "Coming home and keeping frozen feet for an hour — that's over. OBFLO heated slippers focus warmth on the forefoot, the slowest area to warm up, with a soft lining that holds the heat even once unplugged.",
        "The USB port is discreet, the cable detaches so you can walk freely, and everything hand-washes once the module is unplugged.",
      ],
      de: [
        "Nach Hause kommen und noch eine Stunde eiskalte Füße haben — das ist vorbei. Die beheizbaren OBFLO-Hausschuhe konzentrieren die Wärme auf den Vorfuß, die Zone, die am längsten zum Aufwärmen braucht, mit einem weichen Futter, das die Wärme auch nach dem Abstecken hält.",
        "Der USB-Anschluss ist dezent, das Kabel lässt sich zum freien Gehen abnehmen, und nach dem Abtrennen des Moduls ist alles per Handwäsche waschbar.",
      ],
      es: [
        "Llegar a casa y seguir con los pies helados una hora — se acabó. Las zapatillas calefactables OBFLO concentran el calor en el antepié, la zona que más tarda en calentarse, con un interior suave que conserva el calor incluso desenchufadas.",
        "El puerto USB es discreto, el cable se suelta para caminar con libertad y todo se lava a mano una vez desconectado el módulo.",
      ],
    },
    highlights: {
      fr: [
        "Chaleur ciblée avant-pied",
        "Intérieur doux et isolant",
        "Câble USB détachable",
        "Semelle antidérapante",
      ],
      en: [
        "Targeted forefoot warmth",
        "Soft, insulating lining",
        "Detachable USB cable",
        "Non-slip sole",
      ],
      de: [
        "Gezielte Vorfußwärme",
        "Weiches, isolierendes Futter",
        "Abnehmbares USB-Kabel",
        "Rutschfeste Sohle",
      ],
      es: [
        "Calor dirigido al antepié",
        "Interior suave y aislante",
        "Cable USB desmontable",
        "Suela antideslizante",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Temps de chauffe", value: "≈ 45 secondes" },
        {
          label: "Pointures",
          value: "Taille unique 36–45 (intérieur adaptatif)",
        },
        { label: "Semelle", value: "Antidérapante, usage intérieur" },
        { label: "Entretien", value: "Lavage à la main, câble débranché" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Heat-up time", value: "≈ 45 seconds" },
        { label: "Sizes", value: "One size EU 36–45 (adaptive lining)" },
        { label: "Sole", value: "Non-slip, indoor use" },
        { label: "Care", value: "Hand wash, cable unplugged" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5V" },
        { label: "Aufheizzeit", value: "≈ 45 Sekunden" },
        { label: "Größen", value: "Einheitsgröße EU 36–45 (anpassendes Futter)" },
        { label: "Sohle", value: "Rutschfest, für drinnen" },
        { label: "Pflege", value: "Handwäsche, Kabel abgezogen" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5V" },
        { label: "Tiempo de calentamiento", value: "≈ 45 segundos" },
        { label: "Tallas", value: "Talla única EU 36–45 (interior adaptable)" },
        { label: "Suela", value: "Antideslizante, uso interior" },
        { label: "Cuidado", value: "Lavado a mano, cable desconectado" },
      ],
    },
    gallery: [
      "PHOTO — chaussons portés sur parquet, neige à la fenêtre",
      "PHOTO MACRO — intérieur doux et zone chauffante",
      "PHOTO — détail port USB discret",
      "PACKSHOT — paire de chaussons sur fond studio sombre",
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
    price: 19,
    category: "bureau",
    glow: "cold",
    image: "/images/products/tasse.jpg",
    name: {
      fr: "Mug Warmer Intelligent",
      en: "Smart Mug Warmer",
      de: "Smarter Tassenwärmer",
      es: "Calientatazas Inteligente",
    },
    tagline: {
      fr: "Température constante, votre café reste chaud.",
      en: "Constant temperature — your coffee stays hot.",
      de: "Konstante Temperatur — der Kaffee bleibt heiß.",
      es: "Temperatura constante: tu café sigue caliente.",
    },
    tags: {
      fr: ["USB", "COMPACT"],
      en: ["USB", "COMPACT"],
      de: ["USB", "KOMPAKT"],
      es: ["USB", "COMPACTO"],
    },
    imageLabel: "PHOTO STUDIO — mini chauffe-tasse",
    description: {
      fr: [
        "Le café froid à moitié bu, c'est le lot de tous les après-midis de travail. Le mini chauffe-tasse OBFLO maintient ton mug à température de dégustation tant qu'il est posé dessus — pas de re-chauffe, pas d'aller-retour au micro-ondes.",
        "Il se branche en USB sur l'ordinateur ou un chargeur, occupe la place d'un dessous de verre, et s'éteint tout seul quand tu retires la tasse.",
      ],
      en: [
        "Half-drunk cold coffee is the fate of every working afternoon. The OBFLO mini mug warmer keeps your mug at drinking temperature as long as it sits on it — no reheating, no trips to the microwave.",
        "It plugs into your laptop or a USB charger, takes up the space of a coaster, and switches off by itself when you lift the mug.",
      ],
      de: [
        "Halb getrunkener kalter Kaffee ist das Schicksal jedes Arbeitsnachmittags. Der OBFLO-Tassenwärmer hält die Tasse auf Trinktemperatur, solange sie darauf steht — kein Aufwärmen, kein Gang zur Mikrowelle.",
        "Er hängt per USB am Laptop oder Ladegerät, braucht nur den Platz eines Untersetzers und schaltet sich von selbst ab, sobald man die Tasse abhebt.",
      ],
      es: [
        "El café frío a medio beber es el destino de todas las tardes de trabajo. El mini calientatazas OBFLO mantiene tu taza a temperatura de consumo mientras esté encima — sin recalentar, sin viajes al microondas.",
        "Se conecta por USB al ordenador o a un cargador, ocupa lo que un posavasos y se apaga solo al retirar la taza.",
      ],
    },
    highlights: {
      fr: [
        "Maintient la boisson à ≈ 55°C",
        "Arrêt automatique au retrait de la tasse",
        "Format dessous de verre",
        "Compatible mugs à fond plat",
      ],
      en: [
        "Keeps drinks at ≈ 55°C",
        "Auto-off when the mug is lifted",
        "Coaster-sized footprint",
        "Works with flat-bottomed mugs",
      ],
      de: [
        "Hält Getränke auf ≈ 55 °C",
        "Auto-Abschaltung beim Abheben der Tasse",
        "Untersetzer-Format",
        "Für Tassen mit flachem Boden",
      ],
      es: [
        "Mantiene la bebida a ≈ 55 °C",
        "Apagado automático al retirar la taza",
        "Tamaño de posavasos",
        "Compatible con tazas de fondo plano",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Température de maintien", value: "≈ 55°C" },
        { label: "Diamètre du plateau", value: "≈ 10 cm" },
        { label: "Arrêt automatique", value: "Oui, au retrait de la tasse" },
        { label: "Compatibilité", value: "Mugs et tasses à fond plat" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Holding temperature", value: "≈ 55°C" },
        { label: "Plate diameter", value: "≈ 10 cm" },
        { label: "Auto-off", value: "Yes, when the mug is lifted" },
        { label: "Compatibility", value: "Flat-bottomed mugs and cups" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5V" },
        { label: "Halte-Temperatur", value: "≈ 55 °C" },
        { label: "Plattendurchmesser", value: "≈ 10 cm" },
        { label: "Auto-Abschaltung", value: "Ja, beim Abheben der Tasse" },
        { label: "Kompatibilität", value: "Tassen und Becher mit flachem Boden" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5V" },
        { label: "Temperatura de mantenimiento", value: "≈ 55 °C" },
        { label: "Diámetro de la placa", value: "≈ 10 cm" },
        { label: "Apagado automático", value: "Sí, al retirar la taza" },
        { label: "Compatibilidad", value: "Tazas de fondo plano" },
      ],
    },
    gallery: [
      "PHOTO — mug sur chauffe-tasse, laptop sombre",
      "PHOTO MACRO — plateau chauffant et témoin lumineux",
      "PHOTO — bureau du soir, vapeur au-dessus du mug",
      "PACKSHOT — chauffe-tasse sur fond studio sombre",
    ],
  },
];
