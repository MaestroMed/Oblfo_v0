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
    price: 64,
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
    price: 74,
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
      fr: "Flanelle douce, se boutonne en châle, 3 niveaux sur tout port USB.",
      en: "Soft flannel, buttons up as a shawl, 3 levels on any USB port.",
      de: "Weicher Flanell, als Umhang knöpfbar, 3 Stufen an jedem USB-Anschluss.",
      es: "Franela suave, se abotona como chal, 3 niveles en cualquier puerto USB.",
    },
    tags: {
      fr: ["USB", "3 NIVEAUX"],
      en: ["USB", "3 LEVELS"],
      de: ["USB", "3 STUFEN"],
      es: ["USB", "3 NIVELES"],
    },
    imageLabel: "PACKSHOT — plaid chauffant gris chiné plié",
    description: {
      fr: [
        "Le canapé d'hiver a un problème : la couverture met vingt minutes à devenir agréable. Le plaid chauffant OBFLO chauffe vite grâce à huit zones en fibre de carbone, cachées dans une flanelle gris chiné très douce.",
        "Trois niveaux de 40 à 60 °C, commande placée sur la poitrine. Il se branche sur n'importe quel port USB : batterie externe, ordinateur ou chargeur. Format plaid-châle de 150 × 85 cm qui se boutonne, à poser sur les jambes ou sur les épaules, au bureau comme en voyage.",
      ],
      en: [
        "Winter sofas have a problem: blankets take twenty minutes to feel good. The OBFLO heated throw warms up fast thanks to eight carbon-fibre heating zones hidden in soft heather-grey flannel.",
        "Three levels from 40 to 60 °C, with the control on the chest. It plugs into any USB port: power bank, laptop or charger. A 150 × 85 cm button-up throw-shawl to wrap around your legs or shoulders, at the office or on the road.",
      ],
      de: [
        "Das Wintersofa hat ein Problem: Die Decke braucht zwanzig Minuten, bis sie angenehm ist. Die OBFLO-Kuscheldecke wird dank acht Heizzonen aus Carbonfaser schnell warm, verborgen in weichem grau meliertem Flanell.",
        "Drei Stufen von 40 bis 60 °C, Bedienteil auf Brusthöhe. Sie läuft an jedem USB-Anschluss: Powerbank, Laptop oder Ladegerät. Ein knöpfbarer Decken-Schal im Format 150 × 85 cm für Beine oder Schultern, im Büro wie auf Reisen.",
      ],
      es: [
        "El sofá de invierno tiene un problema: la manta tarda veinte minutos en estar agradable. La manta eléctrica OBFLO calienta rápido gracias a ocho zonas de fibra de carbono ocultas en una franela gris jaspeado muy suave.",
        "Tres niveles de 40 a 60 °C, con el mando a la altura del pecho. Se conecta a cualquier puerto USB: batería externa, portátil o cargador. Formato manta-chal de 150 × 85 cm con botones para las piernas o los hombros, en la oficina o de viaje.",
      ],
    },
    highlights: {
      fr: [
        "8 zones chauffantes en fibre de carbone",
        "3 niveaux, 40–60 °C, commande sur la poitrine",
        "Protection surchauffe et court-circuit",
        "Flanelle gris chiné à boutons, 150 × 85 cm",
      ],
      en: [
        "8 carbon-fibre heating zones",
        "3 levels, 40–60 °C, chest-mounted control",
        "Overheat and short-circuit protection",
        "Heather-grey button-up flannel, 150 × 85 cm",
      ],
      de: [
        "8 Heizzonen aus Carbonfaser",
        "3 Stufen, 40–60 °C, Bedienteil auf Brusthöhe",
        "Überhitzungs- und Kurzschlussschutz",
        "Grau melierter Flanell mit Knöpfen, 150 × 85 cm",
      ],
      es: [
        "8 zonas de calor de fibra de carbono",
        "3 niveles, 40–60 °C, mando a la altura del pecho",
        "Protección contra sobrecalentamiento y cortocircuito",
        "Franela gris jaspeado con botones, 150 × 85 cm",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5 V — batterie externe ou chargeur non inclus" },
        { label: "Niveaux", value: "3 (≈ 40–60 °C)" },
        { label: "Sécurité", value: "Protection surchauffe + court-circuit" },
        { label: "Dimensions", value: "≈ 150 × 85 cm" },
        { label: "Matière", value: "Flanelle, gris chiné" },
      ],
      en: [
        { label: "Power", value: "USB 5 V — power bank or charger not included" },
        { label: "Levels", value: "3 (≈ 40–60 °C)" },
        { label: "Safety", value: "Overheat + short-circuit protection" },
        { label: "Dimensions", value: "≈ 150 × 85 cm" },
        { label: "Material", value: "Flannel, heather grey" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5 V — Powerbank oder Ladegerät nicht enthalten" },
        { label: "Stufen", value: "3 (≈ 40–60 °C)" },
        { label: "Sicherheit", value: "Überhitzungs- + Kurzschlussschutz" },
        { label: "Maße", value: "≈ 150 × 85 cm" },
        { label: "Material", value: "Flanell, grau meliert" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5 V — batería o cargador no incluidos" },
        { label: "Niveles", value: "3 (≈ 40–60 °C)" },
        { label: "Seguridad", value: "Protección contra sobrecalentamiento + cortocircuito" },
        { label: "Dimensiones", value: "≈ 150 × 85 cm" },
        { label: "Material", value: "Franela, gris jaspeado" },
      ],
    },
    gallery: [
      "PACKSHOT — plaid chauffant gris chiné plié, câble USB",
      "PHOTO — plaid sur les jambes, canapé, soirée d'hiver",
      "PHOTO — plaid en châle sur les épaules, au bureau",
      "PHOTO MACRO — flanelle + commande 3 niveaux sur la poitrine",
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
    price: 74,
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
    price: 69,
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
    price: 29,
    category: "pieds",
    glow: "cold",
    badge: "new",
    image: "/images/products/semelles.jpg",
    variant: {
      name: { fr: "Pointure", en: "Shoe size", de: "Schuhgröße", es: "Talla" },
      options: ["EU 35–40", "EU 41–46"],
    },
    name: {
      fr: "Semelles Chauffantes USB",
      en: "USB Heated Insoles",
      de: "USB-Heizsohlen",
      es: "Plantillas Calefactables USB",
    },
    tagline: {
      fr: "Chaleur sur tout le pied, sur votre batterie externe.",
      en: "Full-foot warmth, powered by your power bank.",
      de: "Wärme für den ganzen Fuß, über Ihre Powerbank.",
      es: "Calor en todo el pie, con tu batería externa.",
    },
    tags: {
      fr: ["USB", "PIED ENTIER"],
      en: ["USB", "FULL FOOT"],
      de: ["USB", "GANZER FUSS"],
      es: ["USB", "PIE ENTERO"],
    },
    imageLabel: "PACKSHOT — paire de semelles chauffantes USB, câble visible",
    description: {
      fr: [
        "Les pieds sont les premiers à geler et les derniers à se réchauffer. Ces semelles chauffent sur toute leur surface, du talon aux orteils, et se glissent dans vos chaussures ou bottes d'hiver.",
        "Elles se branchent par un câble jack vers USB sur une batterie externe (non incluse) gardée dans la poche. Une seule température, douce et constante : rien à régler, il suffit de brancher.",
      ],
      en: [
        "Feet freeze first and warm up last. These insoles heat across their whole surface, heel to toe, and slip into your shoes or winter boots.",
        "They connect with a jack-to-USB cable to a power bank (not included) kept in your pocket. One gentle, steady temperature: nothing to adjust, just plug in.",
      ],
      de: [
        "Füße frieren zuerst und wärmen zuletzt auf. Diese Sohlen heizen auf ganzer Fläche, von der Ferse bis zu den Zehen, und passen in Schuhe oder Winterstiefel.",
        "Sie werden per Klinke-auf-USB-Kabel an eine Powerbank (nicht enthalten) in der Tasche angeschlossen. Eine sanfte, gleichmäßige Temperatur: nichts einzustellen, einfach einstecken.",
      ],
      es: [
        "Los pies se congelan primero y se calientan los últimos. Estas plantillas calientan toda su superficie, del talón a los dedos, y se colocan en tus zapatos o botas de invierno.",
        "Se conectan con un cable jack a USB a una batería externa (no incluida) que llevas en el bolsillo. Una sola temperatura, suave y constante: nada que ajustar, solo enchufar.",
      ],
    },
    highlights: {
      fr: [
        "Chauffe sur tout le pied",
        "Alimentation USB sur batterie externe (non incluse)",
        "Deux tailles : EU 35–40 et EU 41–46",
        "Température unique, douce et constante",
      ],
      en: [
        "Heats the whole foot",
        "USB power from a power bank (not included)",
        "Two sizes: EU 35–40 and EU 41–46",
        "Single gentle, steady temperature",
      ],
      de: [
        "Wärmt den ganzen Fuß",
        "USB-Strom über Powerbank (nicht enthalten)",
        "Zwei Größen: EU 35–40 und EU 41–46",
        "Eine sanfte, gleichmäßige Temperatur",
      ],
      es: [
        "Calienta todo el pie",
        "Alimentación USB con batería externa (no incluida)",
        "Dos tallas: EU 35–40 y EU 41–46",
        "Una sola temperatura, suave y constante",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5 V, câble jack vers USB — batterie externe non incluse" },
        { label: "Zone chauffante", value: "Pied entier" },
        { label: "Réglage", value: "Une température fixe" },
        { label: "Tailles", value: "EU 35–40 / EU 41–46" },
        { label: "Entretien", value: "Chiffon humide — ne pas immerger" },
      ],
      en: [
        { label: "Power", value: "USB 5 V, jack-to-USB cable — power bank not included" },
        { label: "Heating zone", value: "Whole foot" },
        { label: "Setting", value: "One fixed temperature" },
        { label: "Sizes", value: "EU 35–40 / EU 41–46" },
        { label: "Care", value: "Damp cloth — do not immerse" },
      ],
      de: [
        { label: "Stromversorgung", value: "USB 5 V, Klinke-auf-USB-Kabel — Powerbank nicht enthalten" },
        { label: "Heizzone", value: "Ganzer Fuß" },
        { label: "Einstellung", value: "Eine feste Temperatur" },
        { label: "Größen", value: "EU 35–40 / EU 41–46" },
        { label: "Pflege", value: "Feuchtes Tuch — nicht eintauchen" },
      ],
      es: [
        { label: "Alimentación", value: "USB 5 V, cable jack a USB — batería externa no incluida" },
        { label: "Zona de calor", value: "Pie entero" },
        { label: "Ajuste", value: "Una temperatura fija" },
        { label: "Tallas", value: "EU 35–40 / EU 41–46" },
        { label: "Cuidado", value: "Paño húmedo — no sumergir" },
      ],
    },
    gallery: [
      "PACKSHOT — paire de semelles chauffantes USB",
      "PHOTO — semelle glissée dans une botte d'hiver",
      "PHOTO — câble USB relié à une batterie externe en poche",
      "PHOTO MACRO — zone chauffante pied entier",
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
      fr: "60 × 36 cm sous le clavier et la souris, mains au chaud toute la journée.",
      en: "60 × 36 cm under keyboard and mouse — warm hands all day.",
      de: "60 × 36 cm unter Tastatur und Maus — den ganzen Tag warme Hände.",
      es: "60 × 36 cm bajo teclado y ratón: manos calientes todo el día.",
    },
    tags: {
      fr: ["SECTEUR", "60 × 36 CM"],
      en: ["MAINS", "60 × 36 CM"],
      de: ["NETZ", "60 × 36 CM"],
      es: ["RED", "60 × 36 CM"],
    },
    imageLabel: "PACKSHOT — sous-main chauffant rose, interrupteur blanc sur le cordon",
    description: {
      fr: [
        "Les mains froides au clavier ruinent la concentration. Ce sous-main de 60 × 36 cm chauffe la zone clavier + souris et garde mains et poignets à température de travail toute la journée.",
        "Surface en PVC qui s'essuie d'un coup de chiffon, interrupteur sur le cordon, branchement secteur 220 V : on l'allume en arrivant, on l'éteint en partant.",
      ],
      en: [
        "Cold hands on a keyboard ruin focus. This 60 × 36 cm desk mat heats the keyboard + mouse area and keeps hands and wrists at working temperature all day.",
        "Wipe-clean PVC surface, in-line switch on the cord, 220 V mains power: switch it on when you sit down, off when you leave.",
      ],
      de: [
        "Kalte Hände auf der Tastatur ruinieren die Konzentration. Diese 60 × 36 cm große Unterlage erwärmt die Tastatur- und Mauszone und hält Hände und Handgelenke den ganzen Tag auf Arbeitstemperatur.",
        "Abwischbare PVC-Oberfläche, Schalter am Kabel, Netzbetrieb 220 V: beim Hinsetzen an, beim Gehen aus.",
      ],
      es: [
        "Las manos frías en el teclado arruinan la concentración. Esta alfombrilla de 60 × 36 cm calienta la zona de teclado y ratón y mantiene manos y muñecas a temperatura de trabajo todo el día.",
        "Superficie de PVC que se limpia con un paño, interruptor en el cable y alimentación de red 220 V: se enciende al sentarse y se apaga al irse.",
      ],
    },
    highlights: {
      fr: [
        "60 × 36 cm : clavier + souris",
        "Interrupteur sur le cordon",
        "Surface PVC, s'essuie d'un coup de chiffon",
        "Rose, interrupteur blanc",
      ],
      en: [
        "60 × 36 cm: keyboard + mouse",
        "In-line switch on the cord",
        "PVC surface, wipes clean",
        "Pink, white switch",
      ],
      de: [
        "60 × 36 cm: Tastatur + Maus",
        "Schalter am Kabel",
        "PVC-Oberfläche, abwischbar",
        "Rosa, weißer Schalter",
      ],
      es: [
        "60 × 36 cm: teclado + ratón",
        "Interruptor en el cable",
        "Superficie de PVC, se limpia con un paño",
        "Rosa, interruptor blanco",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "Secteur 220 V, cordon C7" },
        { label: "Commande", value: "Interrupteur sur le cordon" },
        { label: "Dimensions", value: "≈ 60 × 36 cm" },
        { label: "Matière", value: "PVC" },
        { label: "Coloris", value: "Rose, interrupteur blanc" },
        { label: "Entretien", value: "Chiffon humide, débranché — ne pas immerger" },
      ],
      en: [
        { label: "Power", value: "Mains 220 V, C7 cord" },
        { label: "Control", value: "In-line switch on the cord" },
        { label: "Dimensions", value: "≈ 60 × 36 cm" },
        { label: "Material", value: "PVC" },
        { label: "Colour", value: "Pink, white switch" },
        { label: "Care", value: "Damp cloth, unplugged — do not immerse" },
      ],
      de: [
        { label: "Stromversorgung", value: "Netz 220 V, C7-Kabel" },
        { label: "Bedienung", value: "Schalter am Kabel" },
        { label: "Maße", value: "≈ 60 × 36 cm" },
        { label: "Material", value: "PVC" },
        { label: "Farbe", value: "Rosa, weißer Schalter" },
        { label: "Pflege", value: "Feuchtes Tuch, ausgesteckt — nicht eintauchen" },
      ],
      es: [
        { label: "Alimentación", value: "Red 220 V, cable C7" },
        { label: "Control", value: "Interruptor en el cable" },
        { label: "Dimensiones", value: "≈ 60 × 36 cm" },
        { label: "Material", value: "PVC" },
        { label: "Color", value: "Rosa, interruptor blanco" },
        { label: "Cuidado", value: "Paño húmedo, desenchufada — no sumergir" },
      ],
    },
    gallery: [
      "PACKSHOT — sous-main rose, interrupteur blanc sur le cordon",
      "PHOTO — setup bureau complet clavier + souris dessus",
      "PHOTO MACRO — interrupteur blanc et cordon",
      "PHOTO — mains au clavier, lumière chaude",
    ],
  },
];
