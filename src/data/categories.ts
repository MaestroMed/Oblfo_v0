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
      fr: "Chaussons chauffants pour la maison, semelles chauffantes télécommandées pour l'extérieur : les pieds gèlent en premier, on les équipe en premier.",
      en: "Heated slippers for home, remote-control heated insoles for outdoors: feet freeze first, so we equip them first.",
      de: "Beheizbare Hausschuhe für zuhause, ferngesteuerte Einlegesohlen für draußen: Füße frieren zuerst — also rüsten wir sie zuerst aus.",
      es: "Zapatillas calefactables para casa y plantillas con mando para el exterior: los pies se congelan primero, así que los equipamos primero.",
    },
    title: {
      fr: "Pieds.",
      en: "Feet.",
      de: "Füße.",
      es: "Pies.",
    },
    intro: {
      fr: "Les pieds gèlent en premier et se réchauffent en dernier — c'est mécanique, le corps sacrifie ses extrémités pour protéger le tronc. Deux réponses selon le moment : les chaussons chauffants pour couper le froid en rentrant, les semelles chauffantes à batterie intégrée pour rester dehors sans compter les minutes.",
      en: "Feet freeze first and warm up last — it's mechanical: the body sacrifices its extremities to protect the core. Two answers depending on the moment: heated slippers to cut the cold when you come home, built-in-battery heated insoles to stay outside without counting the minutes.",
      de: "Füße frieren zuerst und werden zuletzt warm — das ist Mechanik: Der Körper opfert seine Extremitäten, um den Rumpf zu schützen. Zwei Antworten je nach Moment: beheizbare Hausschuhe, die die Kälte beim Nachhausekommen kappen, und Einlegesohlen mit integriertem Akku, um draußen zu bleiben, ohne die Minuten zu zählen.",
      es: "Los pies se congelan primero y se calientan los últimos — es mecánico: el cuerpo sacrifica sus extremidades para proteger el tronco. Dos respuestas según el momento: zapatillas calefactables para cortar el frío al llegar a casa y plantillas con batería integrada para quedarse fuera sin contar los minutos.",
    },
    guideIds: ["pieds-froids-guide"],
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
      fr: "Plaid chauffant lavable et coussin nuque-épaules : le confort du soir pour quelques centimes d'électricité. Arrêt automatique de série.",
      en: "Washable heated throw and neck-shoulder pad: evening comfort for pennies of electricity. Auto shut-off as standard.",
      de: "Waschbare Heizdecke und Nacken-Schulter-Kissen: Abendkomfort für ein paar Cent Strom. Abschaltautomatik serienmäßig.",
      es: "Manta eléctrica lavable y almohadilla cervical: el confort de la tarde por céntimos de electricidad. Apagado automático de serie.",
    },
    title: {
      fr: "Maison.",
      en: "Home.",
      de: "Zuhause.",
      es: "Casa.",
    },
    intro: {
      fr: "Chauffer la personne plutôt que la pièce : c'est l'arbitrage le plus rentable de l'hiver, et c'est exactement ce que fait ce rayon. Un plaid chauffant consomme autour de 100 W — le centième d'un chauffage central — et le coussin nuque-épaules transforme le canapé en séance de thermothérapie.",
      en: "Heat the person, not the room: it's winter's most cost-effective trade, and exactly what this range does. A heated throw draws around 100 W — a hundredth of central heating — and the neck-shoulder pad turns the sofa into a heat-therapy session.",
      de: "Die Person heizen statt den Raum: Das ist der rentabelste Tausch des Winters — und genau das leistet diese Abteilung. Eine Heizdecke zieht rund 100 W — ein Hundertstel der Zentralheizung —, und das Nacken-Schulter-Kissen macht aus dem Sofa eine Wärmetherapie-Sitzung.",
      es: "Calentar a la persona y no la habitación: es el intercambio más rentable del invierno, y exactamente lo que hace esta sección. Una manta eléctrica consume unos 100 W — la centésima parte de la calefacción central — y la almohadilla cervical convierte el sofá en una sesión de termoterapia.",
    },
    guideIds: ["plaid-chauffant-guide"],
  },
  bureau: {
    metaTitle: {
      fr: "Bureau au chaud — chauffe-tasse et sous-main chauffant",
      en: "Warm desk — mug warmer and heated desk mat",
      de: "Warmer Schreibtisch — Tassenwärmer und beheizbare Unterlage",
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
    intro: {
      fr: "Une pièce à 17 degrés ne pardonne rien aux journées d'écran : café froid à moitié bu, doigts raides sur le clavier, concentration qui s'effrite. Le rayon bureau règle les deux points de friction — un chauffe-tasse qui maintient la température de dégustation, un sous-main grand format qui garde mains et poignets à température de travail.",
      en: "A 17-degree room is merciless on screen days: half-drunk cold coffee, stiff fingers on the keyboard, crumbling focus. The desk range fixes both friction points — a mug warmer that holds drinking temperature, and a full-size desk mat that keeps hands and wrists at working temperature.",
      de: "Ein 17-Grad-Raum verzeiht an Bildschirmtagen nichts: halb getrunkener kalter Kaffee, steife Finger auf der Tastatur, bröckelnde Konzentration. Die Schreibtisch-Abteilung löst beide Reibungspunkte — ein Tassenwärmer, der die Trinktemperatur hält, und eine großformatige Unterlage, die Hände und Handgelenke auf Arbeitstemperatur hält.",
      es: "Una habitación a 17 grados no perdona en los días de pantalla: café frío a medio beber, dedos rígidos en el teclado, concentración que se desmorona. La sección de escritorio arregla ambos puntos de fricción: un calientatazas que mantiene la temperatura de consumo y una alfombrilla de gran formato que mantiene manos y muñecas a temperatura de trabajo.",
    },
    guideIds: [],
  },
  piece: {
    metaTitle: {
      fr: "Petite pièce au chaud — chauffage céramique",
      en: "Warm small room — ceramic heater",
      de: "Warmer kleiner Raum — Keramik-Heizlüfter",
      es: "Habitación pequeña caliente — calefactor cerámico",
    },
    metaDescription: {
      fr: "Chauffage d'appoint céramique PTC : une petite pièce chaude en quelques minutes, sans chauffer toute la maison. Protections surchauffe et basculement.",
      en: "PTC ceramic space heater: a warm small room in minutes without heating the whole house. Overheat and tip-over protection.",
      de: "PTC-Keramik-Heizlüfter: ein warmer kleiner Raum in Minuten, ohne das ganze Haus zu heizen. Überhitzungs- und Umkippschutz.",
      es: "Calefactor cerámico PTC: una habitación pequeña caliente en minutos sin calentar toda la casa. Protección contra sobrecalentamiento y vuelco.",
    },
    title: {
      fr: "Petite pièce.",
      en: "Small room.",
      de: "Kleiner Raum.",
      es: "Habitación pequeña.",
    },
    intro: {
      fr: "Chauffer toute la maison pour un bureau occupé trois heures, c'est la facture qui s'envole. Un chauffage d'appoint céramique fait l'inverse : 10 à 15 m² chauds en quelques minutes, une autorégulation PTC qui évite de gaspiller, et des protections surchauffe et basculement pour se faire oublier sur un coin de bureau.",
      en: "Heating the whole house for an office used three hours a day is how bills take off. A ceramic space heater does the opposite: 10 to 15 m² warm within minutes, PTC self-regulation that avoids waste, and overheat plus tip-over protection so it disappears on a desk corner.",
      de: "Das ganze Haus für ein drei Stunden genutztes Büro zu heizen — so explodieren Rechnungen. Ein Keramik-Heizlüfter macht das Gegenteil: 10 bis 15 m² in Minuten warm, PTC-Selbstregelung gegen Verschwendung und Überhitzungs- plus Umkippschutz, damit er in der Schreibtischecke einfach vergessen werden kann.",
      es: "Calentar toda la casa por un despacho ocupado tres horas es la manera de disparar la factura. Un calefactor cerámico hace lo contrario: 10 a 15 m² calientes en minutos, autorregulación PTC que evita el desperdicio y protecciones contra sobrecalentamiento y vuelco para olvidarse de él en una esquina del escritorio.",
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
    intro: c.intro[locale],
    guideIds: c.guideIds,
  };
}
