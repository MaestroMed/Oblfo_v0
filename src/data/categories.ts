// Contenu éditorial des pages catégories — fr/en/de/es complets.
// Les slugs vivent dans category-slugs.ts (module léger client-safe).

import type { Category } from "./catalog-types";
import { CATEGORY_SLUGS } from "./category-slugs";
import type { Locale } from "@/i18n/routing";

type L4 = Record<Locale, string>;

type CategoryContent = {
  metaTitle: L4;
  metaDescription: L4;
  title: L4;
  /** H1 de la page famille : le mot-clé que les gens tapent. */
  h1: L4;
  /** Accroche de deux lignes sous le H1 ; le texte long (intro) passe sous la grille. */
  lead: L4;
  intro: L4;
  /** Ids de guides pertinents pour ce rayon (masqués si indisponibles). */
  guideIds: string[];
};

const content: Record<Category, CategoryContent> = {
  mains: {
    metaTitle: {
      fr: "Mains au chaud — gants et chauffe-mains chauffants",
      en: "Warm hands — heated gloves and hand warmers",
      de: "Warme Hände — beheizbare Handschuhe und Handwärmer",
      es: "Manos calientes — guantes calefactables y calientamanos",
    },
    metaDescription: {
      fr: "Gants chauffants USB et chauffe-mains rechargeables : chaleur en secondes pour le bureau, la ville, le vélo. Garantie 2 ans, retours 30 jours.",
      en: "USB heated gloves and rechargeable hand warmers: warmth in seconds for the office, the city, the bike. 2-year warranty, 30-day returns.",
      de: "Beheizbare USB-Handschuhe und wiederaufladbare Handwärmer: Wärme in Sekunden für Büro, Stadt und Rad. 2 Jahre Gewährleistung, 30 Tage Rückgabe.",
      es: "Guantes calefactables USB y calientamanos recargables: calor en segundos para la oficina, la ciudad y la bici. Garantía de 2 años, devoluciones de 30 días.",
    },
    title: {
      fr: "Mains.",
      en: "Hands.",
      de: "Hände.",
      es: "Manos.",
    },
    h1: {
      fr: "Gants chauffants et chauffe-mains",
      en: "Heated gloves and hand warmers",
      de: "Beheizbare Handschuhe und Handwärmer",
      es: "Guantes calefactables y calientamanos",
    },
    lead: {
      fr: "Des gants branchés en USB pour dehors, un chauffe-mains rechargeable pour la poche. De la chaleur là où le froid arrive en premier.",
      en: "USB-powered gloves for outdoors, a rechargeable hand warmer for your pocket. Warmth where the cold bites first.",
      de: "USB-Handschuhe für draußen, ein wiederaufladbarer Handwärmer für die Tasche. Wärme dort, wo die Kälte zuerst ankommt.",
      es: "Guantes con USB para la calle y un calientamanos recargable para el bolsillo. Calor donde el frío llega primero.",
    },
    intro: {
      fr: "Les mains sont la première alarme du froid : la circulation y ralentit dès que la température chute, bien avant le reste du corps. Notre rayon mains attaque le problème des deux côtés — des gants chauffants pour la chaleur continue en extérieur, un chauffe-mains rechargeable pour les pauses, les poches et les bureaux glacials.",
      en: "Hands are the body's first cold alarm: circulation slows there as soon as the temperature drops, well before the rest of the body. Our hands range attacks the problem from both sides — heated gloves for continuous outdoor warmth, a rechargeable hand warmer for breaks, pockets and freezing offices.",
      de: "Die Hände sind der erste Kältealarm des Körpers: Die Durchblutung verlangsamt sich dort, sobald die Temperatur fällt — lange vor dem Rest. Unsere Hände-Abteilung packt das Problem von beiden Seiten an: beheizbare Handschuhe für dauerhafte Wärme draußen, ein wiederaufladbarer Handwärmer für Pausen, Taschen und eiskalte Büros.",
      es: "Las manos son la primera alarma del frío: la circulación se ralentiza ahí en cuanto baja la temperatura, mucho antes que en el resto del cuerpo. Nuestra sección de manos ataca el problema por los dos lados: guantes calefactables para el calor continuo en exterior y un calientamanos recargable para pausas, bolsillos y oficinas heladas.",
    },
    guideIds: ["choisir-gants-chauffants", "chauffe-mains-guide"],
  },
  pieds: {
    metaTitle: {
      fr: "Pieds au chaud — chaussons et semelles chauffantes",
      en: "Warm feet — heated slippers and insoles",
      de: "Warme Füße — beheizbare Hausschuhe und Einlegesohlen",
      es: "Pies calientes — zapatillas y plantillas calefactables",
    },
    metaDescription: {
      fr: "Chauffe-pieds en peluche USB pour la maison, semelles chauffantes USB pour l'extérieur : les pieds gèlent en premier, on les équipe en premier.",
      en: "USB plush foot warmer for home, USB heated insoles for outdoors: feet freeze first, so we equip them first.",
      de: "USB-Plüsch-Fußwärmer für zuhause, USB-Heizsohlen für draußen: Füße frieren zuerst — also rüsten wir sie zuerst aus.",
      es: "Calientapiés de peluche USB para casa y plantillas USB para el exterior: los pies se congelan primero, así que los equipamos primero.",
    },
    title: {
      fr: "Pieds.",
      en: "Feet.",
      de: "Füße.",
      es: "Pies.",
    },
    h1: {
      fr: "Chaussons, semelles et chaussettes chauffantes",
      en: "Heated slippers, insoles and socks",
      de: "Beheizbare Hausschuhe, Sohlen und Socken",
      es: "Zapatillas, plantillas y calcetines calefactables",
    },
    lead: {
      fr: "Un chauffe-pieds en peluche pour la maison, des semelles et des chaussettes chauffantes pour dehors. Les pieds se refroidissent en premier : commencez par eux.",
      en: "A plush foot warmer for home, heated insoles and socks for outdoors. Feet get cold first, so start there.",
      de: "Ein Plüsch-Fußwärmer für zuhause, Heizsohlen und Heizsocken für draußen. Füße werden zuerst kalt: Fangen Sie dort an.",
      es: "Un calientapiés de peluche para casa, plantillas y calcetines calefactables para la calle. Los pies se enfrían primero: empieza por ahí.",
    },
    intro: {
      fr: "Les pieds gèlent en premier et se réchauffent en dernier — c'est mécanique, le corps sacrifie ses extrémités pour protéger le tronc. Deux réponses selon le moment : le chauffe-pieds en peluche pour couper le froid en rentrant, les semelles chauffantes à batterie intégrée pour rester dehors sans compter les minutes.",
      en: "Feet freeze first and warm up last — it's mechanical: the body sacrifices its extremities to protect the core. Two answers depending on the moment: the plush foot warmer to cut the cold when you come home, built-in-battery heated insoles to stay outside without counting the minutes.",
      de: "Füße frieren zuerst und werden zuletzt warm — das ist Mechanik: Der Körper opfert seine Extremitäten, um den Rumpf zu schützen. Zwei Antworten je nach Moment: der Plüsch-Fußwärmer, der die Kälte beim Nachhausekommen kappt, und Einlegesohlen mit integriertem Akku, um draußen zu bleiben, ohne die Minuten zu zählen.",
      es: "Los pies se congelan primero y se calientan los últimos — es mecánico: el cuerpo sacrifica sus extremidades para proteger el tronco. Dos respuestas según el momento: el calientapiés de peluche para cortar el frío al llegar a casa y plantillas con batería integrada para quedarse fuera sin contar los minutos.",
    },
    guideIds: ["pieds-froids-guide", "chaussons-guide"],
  },
  corps: {
    metaTitle: {
      fr: "Corps au chaud — gilets chauffants",
      en: "Warm core — heated vests",
      de: "Warmer Rumpf — beheizbare Westen",
      es: "Cuerpo caliente — chalecos calefactables",
    },
    metaDescription: {
      fr: "Gilet chauffant graphène multi-zones : chauffez le tronc et tout le corps suit. Sous n'importe quelle veste, sur powerbank USB.",
      en: "Multi-zone graphene heated vest: warm the core and the whole body follows. Under any jacket, on a USB power bank.",
      de: "Beheizbare Graphen-Weste mit mehreren Zonen: Wärmen Sie den Rumpf, und der ganze Körper folgt. Unter jeder Jacke, mit USB-Powerbank.",
      es: "Chaleco calefactable de grafeno multizona: calienta el tronco y todo el cuerpo le sigue. Bajo cualquier chaqueta, con powerbank USB.",
    },
    title: {
      fr: "Corps.",
      en: "Body.",
      de: "Körper.",
      es: "Cuerpo.",
    },
    h1: {
      fr: "Gilets, écharpes et ceintures chauffantes",
      en: "Heated vests, scarves and belts",
      de: "Beheizbare Westen, Schals und Gürtel",
      es: "Chalecos, bufandas y fajas calefactables",
    },
    lead: {
      fr: "Gilet, écharpe, bonnet, ceinture lombaire : une couche chauffante pour garder le buste, la nuque et le dos au chaud, dehors comme à la maison.",
      en: "Vest, scarf, beanie, lumbar belt: a heated layer that keeps your core, neck and back warm, outdoors or at home.",
      de: "Weste, Schal, Mütze, Rückengurt: eine beheizte Schicht, die Oberkörper, Nacken und Rücken warm hält, draußen wie zuhause.",
      es: "Chaleco, bufanda, gorro, faja lumbar: una capa calefactable para mantener el torso, la nuca y la espalda en calor, en la calle o en casa.",
    },
    intro: {
      fr: "Le tronc commande la sensation de chaleur de tout le corps : quand il est au chaud, le cerveau relâche la circulation vers les extrémités. C'est pour ça qu'un gilet chauffant change plus que n'importe quelle autre pièce — il se porte sous n'importe quelle veste et transforme un manteau moyen en équipement grand froid.",
      en: "Your core drives how warm your whole body feels: when it's warm, the brain releases circulation back to the extremities. That's why a heated vest changes more than any other garment — it wears under any jacket and turns an average coat into deep-winter gear.",
      de: "Der Rumpf bestimmt das Wärmegefühl des ganzen Körpers: Ist er warm, gibt das Gehirn die Durchblutung der Extremitäten wieder frei. Deshalb verändert eine beheizbare Weste mehr als jedes andere Kleidungsstück — sie passt unter jede Jacke und macht aus einem durchschnittlichen Mantel eine Ausrüstung für tiefen Winter.",
      es: "El tronco decide cuánto calor siente todo el cuerpo: cuando está caliente, el cerebro libera la circulación hacia las extremidades. Por eso un chaleco calefactable cambia más que cualquier otra prenda — se lleva bajo cualquier chaqueta y convierte un abrigo normal en equipo de invierno profundo.",
    },
    guideIds: ["gilet-chauffant-guide"],
  },
  maison: {
    metaTitle: {
      fr: "Maison au chaud — plaids et coussins chauffants",
      en: "Warm home — heated throws and heating pads",
      de: "Warmes Zuhause — Heizdecken und Heizkissen",
      es: "Casa caliente — mantas eléctricas y almohadillas térmicas",
    },
    metaDescription: {
      fr: "Plaid chauffant USB en flanelle et coussin chauffant USB 45 × 45 cm : le confort du soir pour quelques centimes d'électricité.",
      en: "USB heated flannel throw and 45 × 45 cm USB heated cushion: evening comfort for pennies of electricity.",
      de: "USB-Heizdecke aus Flanell und 45 × 45 cm USB-Heizkissen: Abendkomfort für ein paar Cent Strom.",
      es: "Manta eléctrica USB de franela y cojín calefactable USB de 45 × 45 cm: el confort de la tarde por céntimos de electricidad.",
    },
    title: {
      fr: "Maison.",
      en: "Home.",
      de: "Zuhause.",
      es: "Casa.",
    },
    h1: {
      fr: "Plaids et coussins chauffants",
      en: "Heated throws and cushions",
      de: "Heizdecken und Heizkissen",
      es: "Mantas y cojines calefactables",
    },
    lead: {
      fr: "Un plaid et un coussin chauffants pour le canapé : la chaleur sur vous, sans monter le chauffage de toute la pièce.",
      en: "A heated throw and cushion for the sofa: warmth on you, without turning up the heating for the whole room.",
      de: "Heizdecke und Heizkissen fürs Sofa: Wärme direkt bei Ihnen, ohne die Heizung im ganzen Raum aufzudrehen.",
      es: "Una manta y un cojín calefactables para el sofá: calor sobre ti, sin subir la calefacción de toda la habitación.",
    },
    intro: {
      fr: "Chauffer la personne plutôt que la pièce : c'est l'arbitrage le plus rentable de l'hiver, et c'est exactement ce que fait ce rayon. Un plaid chauffant consomme autour de 100 W — le centième d'un chauffage central — et le coussin chauffant USB réchauffe la chaise ou le canapé.",
      en: "Heat the person, not the room: it's winter's most cost-effective trade, and exactly what this range does. A heated throw draws around 100 W — a hundredth of central heating — and the USB heated cushion warms your chair or sofa.",
      de: "Die Person heizen statt den Raum: Das ist der rentabelste Tausch des Winters — und genau das leistet diese Abteilung. Eine Heizdecke zieht rund 100 W — ein Hundertstel der Zentralheizung —, und das USB-Heizkissen wärmt Stuhl oder Sofa.",
      es: "Calentar a la persona y no la habitación: es el intercambio más rentable del invierno, y exactamente lo que hace esta sección. Una manta eléctrica consume unos 100 W — la centésima parte de la calefacción central — y el cojín calefactable USB calienta la silla o el sofá.",
    },
    guideIds: ["plaid-chauffant-guide"],
  },
  bureau: {
    metaTitle: {
      fr: "Bureau au chaud — chauffe-tasse et sous-main chauffant",
      en: "Warm desk — mug warmer and heated desk mat",
      de: "Warmer Schreibtisch — Tassenwärmer und Heizunterlage",
      es: "Escritorio caliente — calientatazas y alfombrilla térmica",
    },
    metaDescription: {
      fr: "Café toujours chaud, mains au chaud sur le clavier : le duo bureau qui sauve les journées de travail dans une pièce froide.",
      en: "Coffee always hot, warm hands on the keyboard: the desk duo that saves working days in a cold room.",
      de: "Kaffee immer heiß, warme Hände auf der Tastatur: das Schreibtisch-Duo, das Arbeitstage im kalten Raum rettet.",
      es: "Café siempre caliente y manos calientes en el teclado: el dúo de escritorio que salva las jornadas en una habitación fría.",
    },
    title: {
      fr: "Bureau.",
      en: "Desk.",
      de: "Schreibtisch.",
      es: "Escritorio.",
    },
    h1: {
      fr: "Sous-main chauffant et chauffe-tasse",
      en: "Heated desk pad and mug warmer",
      de: "Beheizbare Schreibtischunterlage und Tassenwärmer",
      es: "Alfombrilla calefactable y calientatazas",
    },
    lead: {
      fr: "Un sous-main qui chauffe les poignets, un chauffe-tasse qui garde le café chaud : le duo des journées de télétravail.",
      en: "A desk pad that warms your wrists, a mug warmer that keeps coffee hot: the pair for work-from-home days.",
      de: "Eine Unterlage, die die Handgelenke wärmt, ein Tassenwärmer, der den Kaffee heiß hält: das Duo fürs Homeoffice.",
      es: "Una alfombrilla que calienta las muñecas y un calientatazas que mantiene el café caliente: el dúo del teletrabajo.",
    },
    intro: {
      fr: "Une pièce à 17 degrés ne pardonne rien aux journées d'écran : café froid à moitié bu, doigts raides sur le clavier, concentration qui s'effrite. Le rayon bureau règle les deux points de friction — un chauffe-tasse qui maintient la température de dégustation, un sous-main 60 × 36 cm qui garde mains et poignets à température de travail.",
      en: "A 17-degree room is merciless on screen days: half-drunk cold coffee, stiff fingers on the keyboard, crumbling focus. The desk range fixes both friction points — a mug warmer that holds drinking temperature, and a 60 × 36 cm desk mat that keeps hands and wrists at working temperature.",
      de: "Ein 17-Grad-Raum verzeiht an Bildschirmtagen nichts: halb getrunkener kalter Kaffee, steife Finger auf der Tastatur, bröckelnde Konzentration. Die Schreibtisch-Abteilung löst beide Reibungspunkte — ein Tassenwärmer, der die Trinktemperatur hält, und eine 60 × 36 cm große Unterlage, die Hände und Handgelenke auf Arbeitstemperatur hält.",
      es: "Una habitación a 17 grados no perdona en los días de pantalla: café frío a medio beber, dedos rígidos en el teclado, concentración que se desmorona. La sección de escritorio arregla ambos puntos de fricción: un calientatazas que mantiene la temperatura de consumo y una alfombrilla de 60 × 36 cm que mantiene manos y muñecas a temperatura de trabajo.",
    },
    guideIds: ["sous-main-guide", "chauffe-tasse-guide"],
  },
  piece: {
    metaTitle: {
      fr: "Chauffage personnel — mini chauffage d'appoint",
      en: "Personal heating — mini space heater",
      de: "Persönliche Wärme — Mini-Heizlüfter",
      es: "Calor personal — mini calefactor",
    },
    metaDescription: {
      fr: "Mini chauffage d'appoint 250 W : de l'air chaud là où tu es, sans chauffer toute la maison. Coupure automatique en cas de surchauffe.",
      en: "250 W mini space heater: warm air where you are, without heating the whole house. Automatic overheat cut-off.",
      de: "Mini-Heizlüfter mit 250 W: warme Luft dort, wo du bist, ohne das ganze Haus zu heizen. Automatische Abschaltung bei Überhitzung.",
      es: "Mini calefactor de 250 W: aire caliente donde estás, sin calentar toda la casa. Corte automático por sobrecalentamiento.",
    },
    title: {
      fr: "Petite pièce.",
      en: "Small room.",
      de: "Kleiner Raum.",
      es: "Habitación pequeña.",
    },
    h1: {
      fr: "Mini chauffage d'appoint",
      en: "Mini space heater",
      de: "Mini-Heizlüfter",
      es: "Mini calefactor",
    },
    lead: {
      fr: "250 W d'air chaud dirigé vers vous, sur le bureau ou à vos pieds. On chauffe la personne, pas toute la pièce.",
      en: "250 W of warm air aimed at you, on the desk or at your feet. Heat the person, not the whole room.",
      de: "250 W warme Luft, direkt auf Sie gerichtet, auf dem Schreibtisch oder an den Füßen. Die Person heizen, nicht den ganzen Raum.",
      es: "250 W de aire caliente dirigido hacia ti, en el escritorio o a tus pies. Calentar a la persona, no toda la habitación.",
    },
    intro: {
      fr: "Chauffer toute la maison pour un bureau occupé trois heures, c'est la facture qui s'envole. Un mini chauffage d'appoint fait l'inverse : 250 W d'air chaud dirigé vers vous, à vos pieds ou sur le bureau, avec une coupure automatique en cas de surchauffe. On chauffe la personne, pas la pièce.",
      en: "Heating the whole house for an office used three hours a day is how bills take off. A mini space heater does the opposite: 250 W of warm air aimed at you, at your feet or on the desk, with automatic overheat cut-off. Heat the person, not the room.",
      de: "Das ganze Haus für ein drei Stunden genutztes Büro zu heizen — so explodieren Rechnungen. Ein Mini-Heizlüfter macht das Gegenteil: 250 W warme Luft direkt auf Sie gerichtet, zu Ihren Füßen oder auf dem Schreibtisch, mit automatischer Abschaltung bei Überhitzung. Die Person heizen, nicht den Raum.",
      es: "Calentar toda la casa por un despacho ocupado tres horas es la manera de disparar la factura. Un mini calefactor hace lo contrario: 250 W de aire caliente dirigido hacia ti, a tus pies o sobre el escritorio, con corte automático por sobrecalentamiento. Calentar a la persona, no la habitación.",
    },
    guideIds: ["chauffage-appoint-economique"],
  },
};

export type LocalizedCategoryContent = {
  category: Category;
  slug: string;
  slugs: Record<Locale, string>;
  metaTitle: string;
  metaDescription: string;
  title: string;
  h1: string;
  lead: string;
  intro: string;
  guideIds: string[];
};

export function getCategoryContent(
  category: Category,
  locale: Locale,
): LocalizedCategoryContent {
  const c = content[category];
  return {
    category,
    slug: CATEGORY_SLUGS[category][locale],
    slugs: CATEGORY_SLUGS[category],
    metaTitle: c.metaTitle[locale],
    metaDescription: c.metaDescription[locale],
    title: c.title[locale],
    h1: c.h1[locale],
    lead: c.lead[locale],
    intro: c.intro[locale],
    guideIds: c.guideIds,
  };
}
