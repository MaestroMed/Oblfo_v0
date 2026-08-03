// Produits du mega-sourcing 08/2026 — fr/en/de/es.
import type { ProductSource } from "./catalog-types";

export const productsB: ProductSource[] = [
  {
    id: "gilet-chauffant",
    slug: {
      fr: "gilet-chauffant",
      en: "heated-vest",
      de: "beheizbare-weste",
      es: "chaleco-calefactable",
    },
    price: 79,
    category: "corps",
    glow: "warm",
    badge: "new",
    image: "/images/products/gilet.jpg",
    variant: {
      name: { fr: "Taille", en: "Size", de: "Größe", es: "Talla" },
      options: ["S", "M", "L", "XL", "2XL", "3XL"],
    },
    name: {
      fr: "Gilet Chauffant Graphène",
      en: "Graphene Heated Vest",
      de: "Beheizbare Graphen-Weste",
      es: "Chaleco Calefactable de Grafeno",
    },
    tagline: {
      fr: "Zones de chauffe graphène, du col aux lombaires.",
      en: "Graphene heating zones, from collar to lower back.",
      de: "Graphen-Heizzonen vom Kragen bis zum unteren Rücken.",
      es: "Zonas de calor de grafeno, del cuello a la zona lumbar.",
    },
    tags: {
      fr: ["USB", "ZONES MULTIPLES"],
      en: ["USB", "MULTI-ZONE"],
      de: ["USB", "MEHRZONEN"],
      es: ["USB", "MULTIZONA"],
    },
    imageLabel: "PACKSHOT — gilet chauffant matelassé noir",
    description: {
      fr: [
        "Le froid s'attaque d'abord au tronc — et c'est le tronc qui commande la sensation de chaleur de tout le corps. Le gilet chauffant OBFLO diffuse une chaleur graphène sur plusieurs zones indépendantes, du col aux lombaires, sous n'importe quelle veste.",
        "Trois niveaux de chauffe, un textile matelassé léger qui se porte discrètement, et une alimentation USB universelle : branchez votre powerbank (non incluse — 20 W recommandés pour une chauffe optimale) dans la poche intérieure et gardez les mains libres.",
      ],
      en: [
        "Cold goes for your core first — and your core drives how warm your whole body feels. The OBFLO heated vest delivers graphene warmth across several independent zones, from collar to lower back, under any jacket.",
        "Three heat levels, a light quilted fabric that wears discreetly, and universal USB power: plug your power bank (not included — 20 W recommended for best heat) into the inner pocket and keep your hands free.",
      ],
      de: [
        "Kälte greift zuerst den Rumpf an — und der Rumpf bestimmt, wie warm sich der ganze Körper anfühlt. Die beheizbare OBFLO-Weste verteilt Graphen-Wärme über mehrere unabhängige Zonen, vom Kragen bis zum unteren Rücken, unter jeder Jacke.",
        "Drei Heizstufen, ein leichtes Steppgewebe, das unauffällig trägt, und universelle USB-Versorgung: Powerbank (nicht enthalten — 20 W für optimale Wärme empfohlen) in die Innentasche stecken und die Hände frei behalten.",
      ],
      es: [
        "El frío ataca primero el tronco — y el tronco decide cuánto calor siente todo el cuerpo. El chaleco calefactable OBFLO reparte calor de grafeno en varias zonas independientes, del cuello a la zona lumbar, bajo cualquier chaqueta.",
        "Tres niveles de calor, un tejido acolchado ligero que se lleva con discreción y alimentación USB universal: conecta tu powerbank (no incluida — 20 W recomendados para el mejor calor) en el bolsillo interior y mantén las manos libres.",
      ],
    },
    highlights: {
      fr: [
        "Zones de chauffe indépendantes (dos, lombaires, col)",
        "3 niveaux de chauffe",
        "Textile graphène léger, lavable en machine à froid",
        "Fonctionne sur powerbank USB (non incluse)",
      ],
      en: [
        "Independent heating zones (back, lower back, collar)",
        "3 heat levels",
        "Light graphene fabric, cold machine-washable",
        "Runs on a USB power bank (not included)",
      ],
      de: [
        "Unabhängige Heizzonen (Rücken, Lendenbereich, Kragen)",
        "3 Heizstufen",
        "Leichtes Graphen-Gewebe, kalt maschinenwaschbar",
        "Läuft mit USB-Powerbank (nicht enthalten)",
      ],
      es: [
        "Zonas de calor independientes (espalda, lumbar, cuello)",
        "3 niveles de calor",
        "Tejido de grafeno ligero, lavable a máquina en frío",
        "Funciona con powerbank USB (no incluida)",
      ],
    },
    specs: {
      fr: [
        {
          label: "Alimentation",
          value: "USB 5V — powerbank non incluse (20 W recommandés)",
        },
        { label: "Niveaux de chauffe", value: "3 (≈ 25 / 35 / 45 °C annoncés)" },
        {
          label: "Autonomie sur powerbank 10 000 mAh",
          value: "Jusqu'à ≈ 3 h à pleine puissance, davantage en mode éco",
        },
        {
          label: "Tailles",
          value:
            "S à 3XL — coupe asiatique : prenez UNE taille au-dessus de votre taille EU",
        },
        { label: "Entretien", value: "Lavage machine à froid, ne pas tordre" },
      ],
      en: [
        {
          label: "Power",
          value: "USB 5V — power bank not included (20 W recommended)",
        },
        { label: "Heat levels", value: "3 (≈ 25 / 35 / 45 °C claimed)" },
        {
          label: "Battery life on a 10,000 mAh power bank",
          value: "Up to ≈ 3 h at full power, longer in eco mode",
        },
        {
          label: "Sizes",
          value: "S to 3XL — Asian cut: order ONE size up from your EU size",
        },
        { label: "Care", value: "Cold machine wash, do not wring" },
      ],
      de: [
        {
          label: "Stromversorgung",
          value: "USB 5V — Powerbank nicht enthalten (20 W empfohlen)",
        },
        { label: "Heizstufen", value: "3 (≈ 25 / 35 / 45 °C laut Hersteller)" },
        {
          label: "Laufzeit mit 10.000-mAh-Powerbank",
          value: "Bis ≈ 3 Std. bei voller Leistung, länger im Eco-Modus",
        },
        {
          label: "Größen",
          value:
            "S bis 3XL — asiatischer Schnitt: EINE Größe größer als EU bestellen",
        },
        { label: "Pflege", value: "Kalt in der Maschine waschen, nicht auswringen" },
      ],
      es: [
        {
          label: "Alimentación",
          value: "USB 5V — powerbank no incluida (20 W recomendados)",
        },
        { label: "Niveles de calor", value: "3 (≈ 25 / 35 / 45 °C anunciados)" },
        {
          label: "Autonomía con powerbank de 10.000 mAh",
          value: "Hasta ≈ 3 h a plena potencia, más en modo eco",
        },
        {
          label: "Tallas",
          value:
            "S a 3XL — corte asiático: pide UNA talla más que tu talla EU",
        },
        { label: "Cuidado", value: "Lavado a máquina en frío, no retorcer" },
      ],
    },
    gallery: [
      "PACKSHOT — gilet chauffant matelassé noir, bouton power orange",
      "PHOTO MACRO — zones de chauffe graphène dos",
      "PHOTO — gilet porté sous une veste, ville d'hiver",
      "PHOTO — poche intérieure avec powerbank branchée",
    ],
  },
  {
    id: "plaid-chauffant",
    slug: {
      fr: "plaid-chauffant",
      en: "heated-throw-blanket",
      de: "beheizbare-kuscheldecke",
      es: "manta-electrica",
    },
    price: 79,
    category: "maison",
    glow: "warm",
    badge: "new",
    image: "/images/products/plaid.jpg",
    name: {
      fr: "Plaid Chauffant Cocon",
      en: "Cocoon Heated Throw",
      de: "Beheizbare Kuscheldecke Kokon",
      es: "Manta Eléctrica Cocoon",
    },
    tagline: {
      fr: "Flanelle double face, chaleur en minutes, arrêt auto.",
      en: "Double-sided flannel, warm in minutes, auto shut-off.",
      de: "Doppelseitiger Flanell, warm in Minuten, Auto-Abschaltung.",
      es: "Franela de doble cara, calor en minutos, apagado automático.",
    },
    tags: {
      fr: ["ARRÊT AUTO", "LAVABLE"],
      en: ["AUTO-OFF", "WASHABLE"],
      de: ["AUTO-OFF", "WASCHBAR"],
      es: ["AUTO-OFF", "LAVABLE"],
    },
    imageLabel: "PACKSHOT — plaid chauffant gris anthracite plié",
    description: {
      fr: [
        "Le canapé d'hiver a un problème : la couverture met vingt minutes à devenir agréable. Le plaid chauffant OBFLO chauffe en quelques minutes grâce à son élément céramique PTC, et sa flanelle double face garde la chaleur même une fois éteint.",
        "Plusieurs niveaux de température, une minuterie avec arrêt automatique pour s'endormir dessous sans y penser, et un contrôleur détachable pour passer le plaid en machine à 30 °C.",
      ],
      en: [
        "Winter sofas have a problem: blankets take twenty minutes to feel good. The OBFLO heated throw warms up within minutes thanks to its PTC ceramic element, and its double-sided flannel holds the heat even after you switch it off.",
        "Multiple temperature levels, a timer with automatic shut-off so you can doze off under it worry-free, and a detachable controller so the throw goes straight into a 30 °C machine wash.",
      ],
      de: [
        "Das Wintersofa hat ein Problem: Die Decke braucht zwanzig Minuten, bis sie angenehm ist. Die OBFLO-Kuscheldecke wird dank ihres PTC-Keramikelements in wenigen Minuten warm, und ihr doppelseitiger Flanell hält die Wärme auch nach dem Ausschalten.",
        "Mehrere Temperaturstufen, ein Timer mit automatischer Abschaltung zum sorglosen Einschlafen und ein abnehmbarer Controller, damit die Decke direkt in die 30-°C-Maschinenwäsche kann.",
      ],
      es: [
        "El sofá de invierno tiene un problema: la manta tarda veinte minutos en estar agradable. La manta eléctrica OBFLO calienta en pocos minutos gracias a su elemento cerámico PTC, y su franela de doble cara conserva el calor incluso apagada.",
        "Varios niveles de temperatura, un temporizador con apagado automático para dormirse debajo sin preocupaciones y un controlador desmontable para lavar la manta a máquina a 30 °C.",
      ],
    },
    highlights: {
      fr: [
        "Chauffe perceptible en quelques minutes (PTC)",
        "Minuterie + arrêt automatique",
        "Contrôleur détachable, lavable en machine à 30 °C",
        "Flanelle douce double face, format canapé 130×180 cm",
      ],
      en: [
        "Noticeably warm within minutes (PTC)",
        "Timer + automatic shut-off",
        "Detachable controller, 30 °C machine washable",
        "Soft double-sided flannel, 130×180 cm sofa size",
      ],
      de: [
        "Spürbar warm in wenigen Minuten (PTC)",
        "Timer + automatische Abschaltung",
        "Abnehmbarer Controller, bei 30 °C maschinenwaschbar",
        "Weicher doppelseitiger Flanell, Sofagröße 130×180 cm",
      ],
      es: [
        "Calor perceptible en pocos minutos (PTC)",
        "Temporizador + apagado automático",
        "Controlador desmontable, lavable a máquina a 30 °C",
        "Franela suave de doble cara, tamaño sofá 130×180 cm",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
        { label: "Puissance", value: "≈ 100 W" },
        {
          label: "Sécurité",
          value: "Arrêt automatique + protection anti-surchauffe",
        },
        { label: "Dimensions", value: "≈ 130 × 180 cm" },
        { label: "Entretien", value: "Machine à 30 °C, contrôleur détaché" },
      ],
      en: [
        { label: "Power", value: "Mains 220–240 V, EU plug" },
        { label: "Wattage", value: "≈ 100 W" },
        { label: "Safety", value: "Auto shut-off + overheat protection" },
        { label: "Dimensions", value: "≈ 130 × 180 cm" },
        { label: "Care", value: "30 °C machine wash, controller detached" },
      ],
      de: [
        { label: "Stromversorgung", value: "Netz 220–240 V, EU-Stecker" },
        { label: "Leistung", value: "≈ 100 W" },
        {
          label: "Sicherheit",
          value: "Automatische Abschaltung + Überhitzungsschutz",
        },
        { label: "Maße", value: "≈ 130 × 180 cm" },
        { label: "Pflege", value: "Maschine 30 °C, Controller abgenommen" },
      ],
      es: [
        { label: "Alimentación", value: "Red 220–240 V, enchufe EU" },
        { label: "Potencia", value: "≈ 100 W" },
        {
          label: "Seguridad",
          value: "Apagado automático + protección contra sobrecalentamiento",
        },
        { label: "Dimensiones", value: "≈ 130 × 180 cm" },
        { label: "Cuidado", value: "Máquina a 30 °C, controlador desmontado" },
      ],
    },
    gallery: [
      "PACKSHOT — plaid chauffant gris anthracite plié, contrôleur posé dessus",
      "PHOTO — plaid déplié sur canapé, soirée d'hiver",
      "PHOTO MACRO — flanelle + contrôleur à molette",
      "PHOTO — machine à laver, contrôleur détaché",
    ],
  },
  {
    id: "coussin-chauffant",
    slug: {
      fr: "coussin-chauffant-nuque",
      en: "neck-shoulder-heating-pad",
      de: "nacken-heizkissen",
      es: "almohadilla-termica-cervical",
    },
    price: 44,
    category: "maison",
    glow: "cold",
    badge: "new",
    image: "/images/products/coussin.jpg",
    name: {
      fr: "Coussin Chauffant Nuque & Épaules",
      en: "Neck & Shoulder Heating Pad",
      de: "Nacken- & Schulter-Heizkissen",
      es: "Almohadilla Térmica Cervical",
    },
    tagline: {
      fr: "Chaleur ciblée sur les trapèzes, épouse la nuque.",
      en: "Targeted warmth on the trapezius, shaped for the neck.",
      de: "Gezielte Wärme auf dem Trapezmuskel, dem Nacken angepasst.",
      es: "Calor dirigido al trapecio, adaptado al cuello.",
    },
    tags: {
      fr: ["ARRÊT AUTO", "ERGONOMIQUE"],
      en: ["AUTO-OFF", "ERGONOMIC"],
      de: ["AUTO-OFF", "ERGONOMISCH"],
      es: ["AUTO-OFF", "ERGONÓMICO"],
    },
    imageLabel: "PACKSHOT — coussin chauffant nuque-épaules gris",
    description: {
      fr: [
        "Nuque raide après une journée d'écran, épaules nouées par le froid : c'est exactement là que ce coussin travaille. Sa forme en U épouse la nuque et descend sur les trapèzes, là où un coussin classique glisse.",
        "Plusieurs niveaux de température, un arrêt automatique de sécurité, et une housse douce qui se retire pour le lavage. La chaleur détend — c'est le principe même de la thermothérapie du quotidien.",
      ],
      en: [
        "Stiff neck after a screen day, shoulders knotted by the cold: that's exactly where this pad works. Its U-shape hugs the neck and reaches down over the trapezius, right where a classic pad slides off.",
        "Multiple temperature levels, a safety auto shut-off, and a soft cover that comes off for washing. Heat relaxes — that's everyday heat-therapy working as intended.",
      ],
      de: [
        "Steifer Nacken nach einem Bildschirmtag, von Kälte verspannte Schultern: genau dort arbeitet dieses Kissen. Seine U-Form schmiegt sich an den Nacken und reicht über den Trapezmuskel — dort, wo ein klassisches Kissen abrutscht.",
        "Mehrere Temperaturstufen, eine Sicherheits-Abschaltautomatik und ein weicher, abnehmbarer Bezug für die Wäsche. Wärme entspannt — Alltags-Wärmetherapie, wie sie gedacht ist.",
      ],
      es: [
        "Cuello rígido tras un día de pantalla, hombros anudados por el frío: justo ahí trabaja esta almohadilla. Su forma en U abraza el cuello y baja sobre el trapecio, donde una almohadilla clásica resbala.",
        "Varios niveles de temperatura, apagado automático de seguridad y una funda suave que se quita para lavar. El calor relaja — la termoterapia de diario funcionando como debe.",
      ],
    },
    highlights: {
      fr: [
        "Forme en U : nuque + trapèzes couverts",
        "Plusieurs niveaux de température",
        "Arrêt automatique de sécurité",
        "Housse douce amovible et lavable",
      ],
      en: [
        "U-shape covers neck + trapezius",
        "Multiple temperature levels",
        "Safety auto shut-off",
        "Soft removable, washable cover",
      ],
      de: [
        "U-Form deckt Nacken + Trapezmuskel ab",
        "Mehrere Temperaturstufen",
        "Sicherheits-Abschaltautomatik",
        "Weicher, abnehmbarer waschbarer Bezug",
      ],
      es: [
        "Forma en U: cuello + trapecio cubiertos",
        "Varios niveles de temperatura",
        "Apagado automático de seguridad",
        "Funda suave extraíble y lavable",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
        { label: "Niveaux de chauffe", value: "Plusieurs niveaux (≈ 40–55 °C)" },
        { label: "Sécurité", value: "Arrêt automatique + protection surchauffe" },
        { label: "Zone couverte", value: "Nuque, épaules, haut du dos" },
        {
          label: "Entretien",
          value: "Housse amovible lavable, module débranché",
        },
      ],
      en: [
        { label: "Power", value: "Mains 220–240 V, EU plug" },
        { label: "Heat levels", value: "Multiple levels (≈ 40–55 °C)" },
        { label: "Safety", value: "Auto shut-off + overheat protection" },
        { label: "Coverage", value: "Neck, shoulders, upper back" },
        { label: "Care", value: "Removable washable cover, module unplugged" },
      ],
      de: [
        { label: "Stromversorgung", value: "Netz 220–240 V, EU-Stecker" },
        { label: "Heizstufen", value: "Mehrere Stufen (≈ 40–55 °C)" },
        {
          label: "Sicherheit",
          value: "Abschaltautomatik + Überhitzungsschutz",
        },
        { label: "Abdeckung", value: "Nacken, Schultern, oberer Rücken" },
        { label: "Pflege", value: "Abnehmbarer waschbarer Bezug, Modul abgesteckt" },
      ],
      es: [
        { label: "Alimentación", value: "Red 220–240 V, enchufe EU" },
        { label: "Niveles de calor", value: "Varios niveles (≈ 40–55 °C)" },
        {
          label: "Seguridad",
          value: "Apagado automático + protección contra sobrecalentamiento",
        },
        { label: "Zona cubierta", value: "Cuello, hombros, parte alta de la espalda" },
        { label: "Cuidado", value: "Funda extraíble lavable, módulo desconectado" },
      ],
    },
    gallery: [
      "PACKSHOT — coussin nuque-épaules gris, contrôleur filaire",
      "PHOTO — porté assis au bureau, détente",
      "PHOTO MACRO — texture polaire + surpiqûres",
      "PHOTO — housse retirée pour lavage",
    ],
  },
  {
    id: "chauffe-mains",
    slug: {
      fr: "chauffe-mains-rechargeable",
      en: "rechargeable-hand-warmer",
      de: "handwaermer",
      es: "calientamanos",
    },
    price: 39,
    category: "mains",
    glow: "warm",
    badge: "new",
    image: "/images/products/chauffe-mains.jpg",
    name: {
      fr: "Chauffe-Mains Rechargeable",
      en: "Rechargeable Hand Warmer",
      de: "Wiederaufladbarer Handwärmer",
      es: "Calientamanos Recargable",
    },
    tagline: {
      fr: "Deux galets magnétiques, chauds en secondes, powerbank intégrée.",
      en: "Two magnetic pebbles, warm in seconds, built-in power bank.",
      de: "Zwei magnetische Steine, warm in Sekunden, Powerbank integriert.",
      es: "Dos piedras magnéticas, calientes en segundos, powerbank integrada.",
    },
    tags: {
      fr: ["2-EN-1", "SÉPARABLE"],
      en: ["2-IN-1", "SPLITS IN TWO"],
      de: ["2-IN-1", "TEILBAR"],
      es: ["2-EN-1", "SEPARABLE"],
    },
    imageLabel: "PACKSHOT — paire de chauffe-mains galets noirs",
    description: {
      fr: [
        "Un galet dans chaque poche, et le trajet du matin change. Ce chauffe-mains se sépare magnétiquement en deux unités — une par main — qui montent en température en quelques secondes, avec trois niveaux jusqu'à 55 °C.",
        "La batterie fait aussi powerbank : un port USB dépanne votre téléphone en fin de journée. Double face chauffante, corps aluminium doux au toucher, et contrôle de température embarqué contre la surchauffe.",
      ],
      en: [
        "One pebble in each pocket changes the morning commute. This hand warmer splits magnetically into two units — one per hand — that heat up in seconds, with three levels up to 55 °C.",
        "The battery doubles as a power bank: a USB port tops up your phone at the end of the day. Double-sided heating, soft-touch aluminium body, and on-board temperature control against overheating.",
      ],
      de: [
        "Ein Stein in jeder Tasche verändert den Arbeitsweg. Dieser Handwärmer teilt sich magnetisch in zwei Einheiten — eine pro Hand —, die in Sekunden warm werden, mit drei Stufen bis 55 °C.",
        "Der Akku ist zugleich Powerbank: Ein USB-Port lädt abends das Handy nach. Beidseitige Heizung, Soft-Touch-Aluminiumgehäuse und integrierte Temperaturkontrolle gegen Überhitzung.",
      ],
      es: [
        "Una piedra en cada bolsillo cambia el trayecto de la mañana. Este calientamanos se separa magnéticamente en dos unidades — una por mano — que se calientan en segundos, con tres niveles hasta 55 °C.",
        "La batería también es powerbank: un puerto USB recarga tu móvil al final del día. Calor por ambas caras, cuerpo de aluminio soft-touch y control de temperatura integrado contra el sobrecalentamiento.",
      ],
    },
    highlights: {
      fr: [
        "Se sépare en 2 unités magnétiques",
        "3 niveaux jusqu'à ≈ 55 °C, chauffe en secondes",
        "Fonction powerbank (sortie USB)",
        "Contrôle de température anti-surchauffe",
      ],
      en: [
        "Splits into 2 magnetic units",
        "3 levels up to ≈ 55 °C, warm in seconds",
        "Power bank function (USB output)",
        "Overheat-protected temperature control",
      ],
      de: [
        "Teilt sich in 2 magnetische Einheiten",
        "3 Stufen bis ≈ 55 °C, warm in Sekunden",
        "Powerbank-Funktion (USB-Ausgang)",
        "Temperaturkontrolle mit Überhitzungsschutz",
      ],
      es: [
        "Se separa en 2 unidades magnéticas",
        "3 niveles hasta ≈ 55 °C, caliente en segundos",
        "Función powerbank (salida USB)",
        "Control de temperatura anti-sobrecalentamiento",
      ],
    },
    specs: {
      fr: [
        {
          label: "Batterie",
          value: "Lithium rechargeable (2 unités) — interdite en soute avion",
        },
        { label: "Niveaux de chauffe", value: "3 (≈ 45 / 50 / 55 °C), double face" },
        {
          label: "Autonomie réaliste",
          value: "≈ 4 à 8 h au niveau haut, selon capacité",
        },
        { label: "Recharge", value: "USB, ≈ 2 h ; sortie powerbank USB" },
        { label: "Entretien", value: "Chiffon sec — non lavable (électronique)" },
      ],
      en: [
        {
          label: "Battery",
          value: "Rechargeable lithium (2 units) — not allowed in checked luggage",
        },
        { label: "Heat levels", value: "3 (≈ 45 / 50 / 55 °C), double-sided" },
        {
          label: "Realistic battery life",
          value: "≈ 4 to 8 h on high, capacity-dependent",
        },
        { label: "Charging", value: "USB, ≈ 2 h; USB power-bank output" },
        { label: "Care", value: "Dry cloth — not washable (electronics)" },
      ],
      de: [
        {
          label: "Akku",
          value: "Wiederaufladbares Lithium (2 Einheiten) — nicht ins aufgegebene Gepäck",
        },
        { label: "Heizstufen", value: "3 (≈ 45 / 50 / 55 °C), beidseitig" },
        {
          label: "Realistische Laufzeit",
          value: "≈ 4 bis 8 Std. auf höchster Stufe, je nach Kapazität",
        },
        { label: "Laden", value: "USB, ≈ 2 Std.; USB-Powerbank-Ausgang" },
        { label: "Pflege", value: "Trockenes Tuch — nicht waschbar (Elektronik)" },
      ],
      es: [
        {
          label: "Batería",
          value: "Litio recargable (2 unidades) — prohibida en bodega de avión",
        },
        { label: "Niveles de calor", value: "3 (≈ 45 / 50 / 55 °C), doble cara" },
        {
          label: "Autonomía realista",
          value: "≈ 4 a 8 h en nivel alto, según capacidad",
        },
        { label: "Carga", value: "USB, ≈ 2 h; salida powerbank USB" },
        { label: "Cuidado", value: "Paño seco — no lavable (electrónica)" },
      ],
    },
    gallery: [
      "PACKSHOT — deux galets noirs magnétiques, LED ambre",
      "PHOTO MACRO — séparation magnétique des deux unités",
      "PHOTO — galet dans une main gantée, hiver",
      "PHOTO — recharge USB-C sur bureau",
    ],
  },
  {
    id: "semelles-chauffantes",
    slug: {
      fr: "semelles-chauffantes",
      en: "heated-insoles",
      de: "beheizbare-einlegesohlen",
      es: "plantillas-calefactables",
    },
    price: 49,
    category: "pieds",
    glow: "cold",
    badge: "new",
    image: "/images/products/semelles.jpg",
    variant: {
      name: { fr: "Pointure", en: "Shoe size", de: "Schuhgröße", es: "Talla" },
      options: ["EU 35–40", "EU 41–46"],
    },
    name: {
      fr: "Semelles Chauffantes Télécommandées",
      en: "Remote-Control Heated Insoles",
      de: "Beheizbare Einlegesohlen mit Fernbedienung",
      es: "Plantillas Calefactables con Mando",
    },
    tagline: {
      fr: "Batterie intégrée, télécommande, découpables à votre pointure.",
      en: "Built-in battery, wireless remote, trim-to-fit sizing.",
      de: "Integrierter Akku, Funk-Fernbedienung, zuschneidbare Größe.",
      es: "Batería integrada, mando inalámbrico, recortables a tu talla.",
    },
    tags: {
      fr: ["TÉLÉCOMMANDE", "DÉCOUPABLES"],
      en: ["REMOTE", "TRIM-TO-FIT"],
      de: ["FERNBEDIENUNG", "ZUSCHNEIDBAR"],
      es: ["MANDO", "RECORTABLES"],
    },
    imageLabel: "PACKSHOT — semelles chauffantes noires, zone avant-pied",
    description: {
      fr: [
        "Les pieds sont les premiers à geler et les derniers à se réchauffer. Ces semelles intègrent la batterie directement dans la semelle — pas de boîtier à la cheville, pas de câble dans la chaussure — et se pilotent à la télécommande sans se déchausser.",
        "Trois niveaux de chauffe centrés sur l'avant-pied, deux bases de tailles à découper proprement le long des lignes marquées, et une autonomie honnête : comptez 3 à 7 heures selon le niveau choisi.",
      ],
      en: [
        "Feet freeze first and warm up last. These insoles build the battery into the sole itself — no ankle pack, no cable inside the shoe — and are controlled by a wireless remote without taking your shoes off.",
        "Three heat levels focused on the forefoot, two size bases that trim cleanly along the marked lines, and honest battery life: expect 3 to 7 hours depending on the level.",
      ],
      de: [
        "Füße frieren zuerst und wärmen zuletzt auf. Diese Sohlen integrieren den Akku direkt in die Sohle — kein Knöchelpack, kein Kabel im Schuh — und werden per Funk-Fernbedienung gesteuert, ohne die Schuhe auszuziehen.",
        "Drei Heizstufen mit Fokus auf dem Vorfuß, zwei Größenbasen, die sich sauber entlang der markierten Linien zuschneiden lassen, und eine ehrliche Laufzeit: 3 bis 7 Stunden je nach Stufe.",
      ],
      es: [
        "Los pies se congelan primero y se calientan los últimos. Estas plantillas integran la batería en la propia plantilla — sin caja en el tobillo, sin cable dentro del zapato — y se controlan con un mando inalámbrico sin descalzarse.",
        "Tres niveles de calor centrados en el antepié, dos bases de talla que se recortan limpiamente por las líneas marcadas y una autonomía honesta: cuenta con 3 a 7 horas según el nivel.",
      ],
    },
    highlights: {
      fr: [
        "Batterie intégrée — aucun boîtier externe",
        "Télécommande sans fil, 3 niveaux",
        "Découpables : EU 35–40 et EU 41–46",
        "Chauffe ciblée avant-pied (≈ 35–55 °C)",
      ],
      en: [
        "Built-in battery — no external pack",
        "Wireless remote, 3 levels",
        "Trim-to-fit: EU 35–40 and EU 41–46",
        "Targeted forefoot heat (≈ 35–55 °C)",
      ],
      de: [
        "Integrierter Akku — kein externes Pack",
        "Funk-Fernbedienung, 3 Stufen",
        "Zuschneidbar: EU 35–40 und EU 41–46",
        "Gezielte Vorfußwärme (≈ 35–55 °C)",
      ],
      es: [
        "Batería integrada — sin caja externa",
        "Mando inalámbrico, 3 niveles",
        "Recortables: EU 35–40 y EU 41–46",
        "Calor dirigido al antepié (≈ 35–55 °C)",
      ],
    },
    specs: {
      fr: [
        {
          label: "Batterie",
          value: "Lithium ≈ 2000 mAh intégrée par semelle, recharge USB",
        },
        {
          label: "Niveaux de chauffe",
          value: "3 (≈ 35–55 °C), télécommande sans fil",
        },
        { label: "Autonomie réaliste", value: "3 à 7 h selon le niveau" },
        {
          label: "Pointures",
          value:
            "2 bases découpables : EU 35–40 / EU 41–46 (lignes marquées uniquement)",
        },
        { label: "Entretien", value: "Chiffon humide — ne pas immerger" },
      ],
      en: [
        {
          label: "Battery",
          value: "≈ 2000 mAh lithium built into each insole, USB charging",
        },
        { label: "Heat levels", value: "3 (≈ 35–55 °C), wireless remote" },
        {
          label: "Realistic battery life",
          value: "3 to 7 h depending on level",
        },
        {
          label: "Sizes",
          value: "2 trim-to-fit bases: EU 35–40 / EU 41–46 (marked lines only)",
        },
        { label: "Care", value: "Damp cloth — do not immerse" },
      ],
      de: [
        {
          label: "Akku",
          value: "≈ 2000 mAh Lithium pro Sohle integriert, USB-Ladung",
        },
        { label: "Heizstufen", value: "3 (≈ 35–55 °C), Funk-Fernbedienung" },
        { label: "Realistische Laufzeit", value: "3 bis 7 Std. je nach Stufe" },
        {
          label: "Größen",
          value:
            "2 zuschneidbare Basen: EU 35–40 / EU 41–46 (nur an den markierten Linien)",
        },
        { label: "Pflege", value: "Feuchtes Tuch — nicht eintauchen" },
      ],
      es: [
        {
          label: "Batería",
          value: "Litio ≈ 2000 mAh integrado en cada plantilla, carga USB",
        },
        { label: "Niveles de calor", value: "3 (≈ 35–55 °C), mando inalámbrico" },
        { label: "Autonomía realista", value: "3 a 7 h según el nivel" },
        {
          label: "Tallas",
          value:
            "2 bases recortables: EU 35–40 / EU 41–46 (solo por las líneas marcadas)",
        },
        { label: "Cuidado", value: "Paño húmedo — no sumergir" },
      ],
    },
    gallery: [
      "PACKSHOT — paire de semelles noires, motif de chauffe avant-pied",
      "PHOTO MACRO — lignes de découpe pointures",
      "PHOTO — télécommande en main, bottes d'hiver",
      "PHOTO — recharge USB des deux semelles",
    ],
  },
  {
    id: "sous-main-chauffant",
    slug: {
      fr: "sous-main-chauffant",
      en: "heated-desk-mat",
      de: "beheizbare-schreibtischunterlage",
      es: "alfombrilla-termica",
    },
    price: 39,
    category: "bureau",
    glow: "warm",
    badge: "new",
    image: "/images/products/tapis-bureau.jpg",
    name: {
      fr: "Sous-Main Chauffant",
      en: "Heated Desk Mat",
      de: "Beheizbare Schreibtischunterlage",
      es: "Alfombrilla de Escritorio Térmica",
    },
    tagline: {
      fr: "Grand format 80×33 cm, mains et poignets au chaud en secondes.",
      en: "Large 80×33 cm surface — warm hands and wrists in seconds.",
      de: "Großes Format 80×33 cm — warme Hände und Handgelenke in Sekunden.",
      es: "Gran formato 80×33 cm: manos y muñecas calientes en segundos.",
    },
    tags: {
      fr: ["ARRÊT AUTO", "GRAND FORMAT"],
      en: ["AUTO-OFF", "FULL SIZE"],
      de: ["AUTO-OFF", "GROSSFORMAT"],
      es: ["AUTO-OFF", "GRAN FORMATO"],
    },
    imageLabel: "PACKSHOT — sous-main chauffant anthracite, coin relevé",
    description: {
      fr: [
        "Les mains froides au clavier ruinent la concentration. Ce sous-main grand format chauffe toute la zone clavier + souris en quelques secondes, et garde mains et poignets à température de travail toute la journée.",
        "Surface facile à nettoyer et résistante aux éclaboussures, plusieurs niveaux de température, et un arrêt automatique après quelques heures — la sécurité qui va avec un usage bureau prolongé.",
      ],
      en: [
        "Cold hands on a keyboard ruin focus. This full-size desk mat heats the entire keyboard + mouse area within seconds and keeps hands and wrists at working temperature all day.",
        "Easy-clean, splash-resistant surface, multiple temperature levels, and an automatic shut-off after a few hours — the safety that belongs with long desk sessions.",
      ],
      de: [
        "Kalte Hände auf der Tastatur ruinieren die Konzentration. Diese großformatige Unterlage erwärmt die gesamte Tastatur- und Mauszone in Sekunden und hält Hände und Handgelenke den ganzen Tag auf Arbeitstemperatur.",
        "Leicht zu reinigende, spritzwasserfeste Oberfläche, mehrere Temperaturstufen und eine automatische Abschaltung nach einigen Stunden — die Sicherheit, die zu langen Schreibtischtagen gehört.",
      ],
      es: [
        "Las manos frías en el teclado arruinan la concentración. Esta alfombrilla de gran formato calienta toda la zona de teclado y ratón en segundos y mantiene manos y muñecas a temperatura de trabajo todo el día.",
        "Superficie fácil de limpiar y resistente a salpicaduras, varios niveles de temperatura y apagado automático tras unas horas — la seguridad que corresponde a largas jornadas de escritorio.",
      ],
    },
    highlights: {
      fr: [
        "Grand format 80 × 33 cm (clavier + souris)",
        "Chauffe en quelques secondes",
        "Arrêt automatique de sécurité",
        "Surface antidérapante, résistante aux éclaboussures",
      ],
      en: [
        "Full 80 × 33 cm size (keyboard + mouse)",
        "Heats up in seconds",
        "Safety auto shut-off",
        "Non-slip, splash-resistant surface",
      ],
      de: [
        "Großes Format 80 × 33 cm (Tastatur + Maus)",
        "Warm in Sekunden",
        "Sicherheits-Abschaltautomatik",
        "Rutschfeste, spritzwasserfeste Oberfläche",
      ],
      es: [
        "Gran formato 80 × 33 cm (teclado + ratón)",
        "Calienta en segundos",
        "Apagado automático de seguridad",
        "Superficie antideslizante y resistente a salpicaduras",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
        { label: "Niveaux de chauffe", value: "3 niveaux (≈ 38–50 °C)" },
        { label: "Sécurité", value: "Arrêt automatique ≈ 3 h + anti-surchauffe" },
        { label: "Dimensions", value: "≈ 80 × 33 cm, épaisseur ≈ 3 mm" },
        {
          label: "Entretien",
          value: "Chiffon humide, surface étanche aux éclaboussures",
        },
      ],
      en: [
        { label: "Power", value: "Mains 220–240 V, EU plug" },
        { label: "Heat levels", value: "3 levels (≈ 38–50 °C)" },
        { label: "Safety", value: "≈ 3 h auto shut-off + overheat protection" },
        { label: "Dimensions", value: "≈ 80 × 33 cm, ≈ 3 mm thin" },
        { label: "Care", value: "Damp cloth, splash-proof surface" },
      ],
      de: [
        { label: "Stromversorgung", value: "Netz 220–240 V, EU-Stecker" },
        { label: "Heizstufen", value: "3 Stufen (≈ 38–50 °C)" },
        {
          label: "Sicherheit",
          value: "Auto-Abschaltung nach ≈ 3 Std. + Überhitzungsschutz",
        },
        { label: "Maße", value: "≈ 80 × 33 cm, ≈ 3 mm dünn" },
        { label: "Pflege", value: "Feuchtes Tuch, spritzwasserfeste Oberfläche" },
      ],
      es: [
        { label: "Alimentación", value: "Red 220–240 V, enchufe EU" },
        { label: "Niveles de calor", value: "3 niveles (≈ 38–50 °C)" },
        {
          label: "Seguridad",
          value: "Apagado automático ≈ 3 h + protección contra sobrecalentamiento",
        },
        { label: "Dimensiones", value: "≈ 80 × 33 cm, ≈ 3 mm de grosor" },
        {
          label: "Cuidado",
          value: "Paño húmedo, superficie resistente a salpicaduras",
        },
      ],
    },
    gallery: [
      "PACKSHOT — sous-main anthracite, commandes tactiles au bord",
      "PHOTO — setup bureau complet clavier + souris dessus",
      "PHOTO MACRO — commandes tactiles et témoin ambre",
      "PHOTO — mains au clavier, lumière chaude",
    ],
  },
];
