// Guides d'achat SEO — contenu éditorial bilingue, maillé vers le catalogue.
// Dates figées à la publication (pas de Date.now : contenu stable en SSG).

import { guidesDe } from "./guides-de";
import { guidesEs } from "./guides-es";
import { getProductById } from "./catalog";
import { GUIDE_SLUGS, guideIdFromSlug } from "./guides-slugs";
import { routing, type Locale } from "@/i18n/routing";
import { frTypoDeep } from "@/lib/typo";

/** Locale de rédaction native des sources ci-dessous. */
type SourceLocale = "fr" | "en";
type LText = Record<SourceLocale, string>;

export type GuideSection = {
  title: string;
  paragraphs: string[];
};

/** Contenu localisé d'un guide pour une locale overlay (de/es). */
export type GuideL10n = {
  title: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
};

const overlays: Partial<Record<Locale, Record<string, GuideL10n>>> = {
  de: guidesDe,
  es: guidesEs,
};

export type Guide = {
  id: string;
  slug: string;
  slugs: Record<Locale, string>;
  title: string;
  metaDescription: string;
  intro: string;
  datePublished: string;
  readMinutes: number;
  sections: GuideSection[];
  relatedProductIds: string[];
  /** Photos d'usage des produits liés, la première sert de vignette. */
  images: { src: string; alt: string }[];
};

type GuideSource = {
  id: string;
  /** Slugs fr/en historiques — l'autorité est GUIDE_SLUGS (guides-slugs.ts). */
  slug: LText;
  datePublished: string;
  readMinutes: number;
  relatedProductIds: string[];
  title: LText;
  metaDescription: LText;
  intro: LText;
  sections: Record<SourceLocale, GuideSection[]>;
};

const guideSources: GuideSource[] = [
  {
    id: "chauffage-appoint-economique",
    slug: {
      fr: "chauffage-appoint-economique",
      en: "space-heater-running-costs",
    },
    datePublished: "2026-07-31",
    readMinutes: 6,
    relatedProductIds: ["chauffage-appoint", "pack-maison-chaude"],
    title: {
      fr: "Chauffage d'appoint économique : chauffer une petite pièce sans exploser la facture",
      en: "Space heater running costs: how to heat a small room without a scary bill",
    },
    metaDescription: {
      fr: "Combien coûte vraiment un chauffage d'appoint par heure ? Calcul simple, choix de la puissance selon la surface, sécurité et erreurs à éviter.",
      en: "What a space heater really costs per hour: simple math, sizing the wattage to your room, safety checks and the mistakes that waste money.",
    },
    intro: {
      fr: "Chauffer toute la maison pour une seule pièce occupée, c'est la façon la plus chère de ne pas avoir froid. Un chauffage d'appoint bien choisi fait l'inverse : il chauffe l'endroit où vous êtes, au moment où vous y êtes. Voici comment calculer ce qu'il coûte vraiment, choisir la bonne puissance et éviter les pièges.",
      en: "Heating the whole house for the one room you actually occupy is the most expensive way to stay warm. A well-chosen space heater does the opposite: it heats the spot you're in, while you're in it. Here's how to work out the real cost, pick the right wattage and avoid the classic mistakes.",
    },
    sections: {
      fr: [
        {
          title: "Le vrai coût par heure : un calcul en 10 secondes",
          paragraphs: [
            "La formule tient sur une ligne : puissance (en kW) × heures d'utilisation × prix du kWh. Un chauffage de 1 200 W utilisé 3 heures par soir, avec un kWh autour de 0,25 €, coûte 1,2 × 3 × 0,25 = 0,90 € par soirée. Environ 27 € par mois — pour une pièce vraiment chaude, aux heures où vous y êtes.",
            "Le comparatif qui compte : monter le chauffage central de 2 degrés pour toute la maison coûte typiquement 3 à 5 fois plus cher que chauffer ponctuellement la pièce occupée. Le chauffage d'appoint n'est pas économique « en soi » — il l'est parce qu'il chauffe petit et court.",
            "La règle d'or qui en découle : un chauffage d'appoint sert en complément, pièce par pièce, session par session. Si vous le laissez tourner 24 h/24 dans un grand salon mal isolé, le calcul se retourne contre vous.",
          ],
        },
        {
          title: "Quelle puissance pour quelle surface",
          paragraphs: [
            "L'ordre de grandeur standard : comptez environ 100 W par m² pour une pièce normalement isolée. Un bureau ou une chambre de 10 à 15 m² se contente donc de 1 000 à 1 500 W — inutile de viser plus gros, un appareil surdimensionné cycle en permanence et n'apporte aucun confort supplémentaire.",
            "La technologie céramique (PTC) a un avantage concret pour les petits espaces : elle monte en température en quelques dizaines de secondes et s'autorégule — la résistance céramique réduit d'elle-même sa consommation à l'approche de sa température cible. C'est le bon choix pour des sessions courtes et répétées, exactement l'usage bureau/chambre.",
            "Depuis 2018, la réglementation européenne (écoconception ErP) impose aux chauffages d'appoint électriques une régulation électronique de la température. Un modèle avec thermostat électronique n'est pas un gadget : c'est ce qui évite de chauffer au-delà du nécessaire, et c'est obligatoire pour être vendu légalement en Europe.",
          ],
        },
        {
          title: "Sécurité : les deux protections non négociables",
          paragraphs: [
            "Coupure en cas de surchauffe et coupure en cas de basculement. Ces deux protections doivent figurer noir sur blanc dans la fiche technique. Un chauffage posé sur un bureau ou près d'un lit sans détecteur de basculement est un risque, pas une économie.",
            "Les règles d'usage restent les mêmes quel que soit l'appareil : jamais couvert, jamais collé à un textile, jamais branché sur une multiprise déjà chargée (1 200 W, c'est la moitié de ce qu'une multiprise standard supporte), et pas de fonctionnement sans surveillance prolongée.",
          ],
        },
        {
          title: "Les erreurs qui coûtent cher",
          paragraphs: [
            "Chauffer une pièce aux fenêtres ouvertes ou très mal isolée : l'appareil tourne à plein régime en continu et le coût s'envole. Cinq minutes d'aération fenêtres grandes ouvertes puis fenêtres fermées battent une fenêtre entrouverte en permanence.",
            "Prendre un appareil sous-dimensionné « pour économiser » : un 500 W dans 20 m² tourne sans jamais atteindre la consigne — vous consommez sans confort. Mieux vaut la bonne puissance utilisée moins longtemps.",
            "Négliger le positionnement : au sol ou sur un bureau, flux d'air orienté vers vous, pas vers la porte. La chaleur d'un soufflant est directionnelle — c'est sa force pour un poste de travail, à condition de l'orienter.",
          ],
        },
      ],
      en: [
        {
          title: "The real cost per hour: 10-second math",
          paragraphs: [
            "The formula fits on one line: power (kW) × hours of use × price per kWh. A 1,200 W heater running 3 hours per evening at €0.25/kWh costs 1.2 × 3 × 0.25 = €0.90 per evening. Roughly €27 a month — for a genuinely warm room, during the hours you're actually in it.",
            "The comparison that matters: raising central heating by 2 degrees for the whole home typically costs 3 to 5 times more than spot-heating the one occupied room. A space heater isn't cheap 'by nature' — it's cheap because it heats small and short.",
            "The rule that follows: a space heater is a complement, room by room, session by session. Leave it running 24/7 in a large, badly insulated living room and the math turns against you.",
          ],
        },
        {
          title: "Sizing the wattage to the room",
          paragraphs: [
            "The standard rule of thumb: about 100 W per m² (roughly 10 W per sq ft) for a normally insulated room. A 10–15 m² office or bedroom needs 1,000–1,500 W — no point going bigger, an oversized unit just cycles constantly without adding comfort.",
            "Ceramic (PTC) technology has a concrete advantage in small spaces: it reaches temperature in tens of seconds and self-regulates — the ceramic element naturally draws less power as it approaches its target temperature. That makes it the right pick for short, repeated sessions, which is exactly the desk/bedroom use case.",
            "Since 2018, EU ecodesign rules (ErP) require electric space heaters to have electronic temperature control. An electronic thermostat isn't a gimmick: it's what stops the unit heating beyond what's needed — and it's legally required for sale in Europe.",
          ],
        },
        {
          title: "Safety: the two non-negotiable protections",
          paragraphs: [
            "Overheat cut-off and tip-over cut-off. Both must be stated explicitly in the spec sheet. A heater on a desk or near a bed without tip-over protection is a hazard, not a saving.",
            "Usage rules are the same whatever the device: never covered, never against fabric, never on an already-loaded power strip (1,200 W is half of what a standard strip tolerates), and no extended unattended running.",
          ],
        },
        {
          title: "The mistakes that cost money",
          paragraphs: [
            "Heating a room with open windows or terrible insulation: the unit runs flat-out non-stop and costs balloon. Five minutes of full-open-window airing, then windows shut, beats a permanently cracked-open window.",
            "Under-sizing 'to save money': a 500 W unit in a 20 m² room runs forever without reaching temperature — you pay without comfort. The right wattage used for less time always wins.",
            "Ignoring placement: floor or desk level, airflow pointed at you, not at the door. A fan heater's warmth is directional — that's its strength at a workstation, provided you aim it.",
          ],
        },
      ],
    },
  },
  {
    id: "choisir-gants-chauffants",
    slug: {
      fr: "choisir-gants-chauffants",
      en: "heated-gloves-buying-guide",
    },
    datePublished: "2026-07-31",
    readMinutes: 5,
    relatedProductIds: ["gants-chauffants", "pack-sortie-hiver"],
    title: {
      fr: "Gants chauffants : USB, batterie, niveaux — comment choisir sans se tromper",
      en: "Heated gloves buying guide: USB vs battery, heat levels, and what actually matters",
    },
    metaDescription: {
      fr: "USB 5V, boîtier à piles ou batterie 7,4V ? Autonomie réelle, zones de chauffe, entretien : le guide honnête pour choisir des gants chauffants.",
      en: "USB 5V, battery pack or 7.4V lithium? Real-world battery life, heating zones and care: an honest guide to choosing heated gloves.",
    },
    intro: {
      fr: "Tous les « gants chauffants » ne chauffent pas pareil — et la différence tient presque entièrement à l'alimentation. Ce guide explique ce que chaque type fait vraiment, ce qu'il faut regarder dans une fiche produit, et pour quel usage chaque option a du sens.",
      en: "Not all 'heated gloves' heat the same — and the difference comes almost entirely down to the power source. This guide explains what each type actually does, what to check on a spec sheet, and which option makes sense for which use.",
    },
    sections: {
      fr: [
        {
          title: "L'alimentation décide de tout",
          paragraphs: [
            "USB 5V filaire : les gants se branchent sur une powerbank glissée dans la poche. C'est la solution la plus simple et la plus abordable. La chaleur est douce — pense « fond de chaleur permanent » plutôt que « radiateur dans les mains ». Idéal pour le bureau froid, la marche urbaine, les mains sensibles au froid.",
            "Boîtier à piles : un compartiment intégré au poignet alimente les zones de chauffe. Un cran au-dessus du 5V en intensité, sans câble qui dépasse. L'autonomie dépend des piles — prévois des rechargeables.",
            "Batterie lithium 7,4V : c'est la catégorie qui chauffe fort, celle des motards et des sports d'hiver. Comptez un budget nettement supérieur — sous un certain prix, un gant « 7,4V » n'en est généralement pas un. Si une annonce pas chère promet une chaleur intense, c'est le premier signal d'alerte.",
          ],
        },
        {
          title: "Autonomie réelle : les chiffres à connaître",
          paragraphs: [
            "Sur une powerbank de 10 000 mAh, des gants USB tiennent en pratique 3 à 6 heures selon le niveau de chauffe choisi. Niveau maximum = autonomie divisée par deux par rapport au niveau doux : la plupart des utilisateurs trouvent leur équilibre au niveau intermédiaire.",
            "Le temps de chauffe, lui, est court partout : la chaleur se sent en 30 secondes à 2 minutes. Ce qui varie entre les gammes, c'est le plafond de température, pas la vitesse.",
          ],
        },
        {
          title: "Ce qu'il faut vérifier dans la fiche produit",
          paragraphs: [
            "Les zones de chauffe : paume + dessus des doigts est la configuration efficace — c'est le dos de la main et les doigts qui souffrent en premier. Certains modèles d'entrée de gamme ne chauffent que le dos de la main : chaleur réelle très limitée.",
            "Index tactile pour garder le téléphone utilisable, textile déperlant pour la bruine (déperlant ≠ étanche : aucun gant chauffant grand public ne se plonge dans l'eau), et lavage à la main une fois le câble ou la batterie débranché.",
            "Niveaux de chauffe : trois niveaux suffisent. Au-delà, c'est du marketing ; en dessous, vous n'avez pas de position « économie d'autonomie ».",
          ],
        },
        {
          title: "Pour quel usage, quel choix",
          paragraphs: [
            "Bureau froid, trajets à pied, mains froides chroniques : USB 5V, budget contenu, autonomie confortable sur powerbank. Scooter et vélo par temps froid : boîtier à piles ou 7,4V selon le budget — et des zones de chauffe couvrant bien les doigts. Moto l'hiver et sports de montagne : 7,4V, sans hésiter, c'est le prix de la chaleur réelle à -5 °C.",
          ],
        },
      ],
      en: [
        {
          title: "The power source decides everything",
          paragraphs: [
            "Wired USB 5V: the gloves plug into a power bank in your pocket. Simplest and most affordable. The warmth is gentle — think 'permanent background heat', not 'radiator in your hands'. Ideal for a cold office, city walks, and cold-sensitive hands.",
            "Battery-pack (AA-style): a wrist compartment powers the heating zones. A step up from 5V in intensity, with no trailing cable. Battery life depends on the cells — plan on rechargeables.",
            "7.4V lithium: this is the category that heats hard — the one motorcyclists and winter-sports riders buy. Expect a significantly higher budget; below a certain price, a '7.4V' glove usually isn't one. A cheap listing promising intense heat is the first red flag.",
          ],
        },
        {
          title: "Real-world battery life",
          paragraphs: [
            "On a 10,000 mAh power bank, USB gloves realistically last 3 to 6 hours depending on the heat level. Max level roughly halves the runtime versus the gentle setting — most people settle on the middle level.",
            "Heat-up time is short across the board: you feel warmth within 30 seconds to 2 minutes. What differs between price tiers is the temperature ceiling, not the speed.",
          ],
        },
        {
          title: "What to check on the spec sheet",
          paragraphs: [
            "Heating zones: palm + top of fingers is the configuration that works — fingers and the back of the hand freeze first. Some entry-level models only heat the back of the hand: very limited real warmth.",
            "A touchscreen index fingertip so your phone stays usable, water-repellent fabric for drizzle (repellent ≠ waterproof: no consumer heated glove should be submerged), and hand-washing once the cable or battery is unplugged.",
            "Heat levels: three is the sweet spot. More is marketing; fewer means no 'battery-saver' setting.",
          ],
        },
        {
          title: "Which type for which use",
          paragraphs: [
            "Cold office, walking commutes, chronically cold hands: USB 5V — contained budget, comfortable runtime on a power bank. Scooter and bike rides in cold weather: battery-pack or 7.4V depending on budget, with heating zones that properly cover the fingers. Winter motorcycling and mountain sports: 7.4V, no hesitation — that's the price of real heat at -5 °C.",
          ],
        },
      ],
    },
  },
];

guideSources.push(
  {
    id: "plaid-chauffant-guide",
    slug: {
      fr: "plaid-chauffant-consommation",
      en: "heated-blanket-running-costs",
    },
    datePublished: "2026-08-01",
    readMinutes: 6,
    relatedProductIds: ["plaid-chauffant", "pack-cocooning"],
    title: {
      fr: "Plaid chauffant : consommation réelle, sécurité et critères qui comptent",
      en: "Heated throw blankets: real running costs, safety, and what actually matters",
    },
    metaDescription: {
      fr: "Combien consomme un plaid chauffant ? Est-ce dangereux pour dormir ? Lavable ou pas ? Le guide honnête avant d'acheter une couverture chauffante.",
      en: "How much does a heated blanket cost to run? Is it safe to fall asleep under? Washable or not? The honest guide before you buy.",
    },
    intro: {
      fr: "Le plaid chauffant est l'objet le plus rentable de l'hiver : il chauffe la personne, pas la pièce. Mais entre les modèles qui ne se lavent pas, les alimentations mal expliquées et les puissances fantaisistes, il y a de quoi trier. Voici ce qui compte vraiment.",
      en: "A heated throw is winter's most cost-effective object: it heats the person, not the room. But between models you can't wash, poorly explained power supplies and fantasy wattage claims, there's sorting to do. Here's what actually matters.",
    },
    sections: {
      fr: [
        {
          title: "La consommation : quelques centimes par soirée",
          paragraphs: [
            "Un plaid chauffant branché sur secteur consomme typiquement autour de 100 W — soit, à 0,25 €/kWh, environ 0,025 € par heure, 8 centimes pour une soirée de 3 heures et moins de 2,50 € pour un mois d'utilisation quotidienne. Un plaid USB 5 V consomme encore moins : sa puissance est plafonnée par la powerbank ou le chargeur qui l'alimente. Dans les deux cas, c'est bien moins qu'un chauffage d'appoint (10 à 15 fois pour un modèle secteur), parce que la chaleur va directement sur vous au lieu de chauffer l'air.",
            "Le calcul qui en découle est simple : baisser le thermostat du salon de 2 degrés et s'installer sous un plaid chauffant est l'un des meilleurs arbitrages confort/facture de l'hiver.",
          ],
        },
        {
          title: "Sécurité : les protections à exiger",
          paragraphs: [
            "La protection anti-surchauffe d'abord : l'élément chauffant doit couper si un point de la couverture monte anormalement (couverture pliée, par exemple), avec en complément une protection contre les courts-circuits. Sur les produits sérieux, ces protections sont citées noir sur blanc dans la fiche.",
            "L'arrêt automatique minuté est un vrai plus pour s'endormir dessous sans y penser, mais tous les plaids n'en ont pas. S'il est absent, l'alimentation en basse tension (USB 5 V) et la protection anti-surchauffe font l'essentiel du travail ; reste le bon réflexe : on l'éteint ou on débranche avant de dormir.",
            "Enfin, la base. En secteur : prise européenne 220–240 V et marquage CE avec un vrai certificat derrière — la norme applicable est EN 60335-2-17. En USB 5 V : une powerbank ou un chargeur de qualité, aux sorties adaptées. Un logo CE imprimé sans certificat ne protège personne.",
          ],
        },
        {
          title: "Entretien : ce qu'il faut vérifier avant d'acheter",
          paragraphs: [
            "Un plaid vit sur un canapé : il prendra du café, des miettes et des poils de chat. S'il ne passe pas en machine, il finit roulé en boule dans un placard avant février.",
            "Le point à vérifier : une alimentation qui se débranche (câble USB ou contrôleur détachable). Le lavage en machine n'est pas toujours confirmé : si la fiche produit ne le dit pas clairement, considérez le plaid comme non lavable, nettoyez-le délicatement en surface, alimentation débranchée, et évitez le sèche-linge.",
          ],
        },
        {
          title: "Taille et matière : ce qui change le confort",
          paragraphs: [
            "Le format dépend de l'usage. Un grand format de canapé (autour de 130 × 180 cm) couvre des pieds aux épaules mais demande généralement plus de puissance. Un format plaid-châle (150 × 85 cm) est plus léger et se drape sur les épaules ou les genoux, ce qui convient bien à une alimentation USB 5 V. Dans tous les cas, évitez un format trop petit pour l'usage visé : on passe la soirée à se rebattre les jambes.",
            "Côté matière, le polaire corail est doux, léger et agréable dès la mise en route ; la flanelle épaisse ou le sherpa gardent plus longtemps la chaleur une fois éteints. Plus important que la matière : la répartition de la chauffe — plusieurs zones (par exemple 8 zones en fibre de carbone) et plusieurs niveaux (par exemple 40 à 60 °C) permettent d'ajuster, et de chauffer par intermittence pour consommer encore moins.",
          ],
        },
      ],
      en: [
        {
          title: "Running costs: pennies per evening",
          paragraphs: [
            "A mains-powered heated throw typically draws around 100 W — at €0.25/kWh, that's about €0.025 per hour, 8 cents for a 3-hour evening and under €2.50 for a month of daily use. A USB 5 V throw draws even less: its power is capped by the power bank or charger feeding it. Either way it's far cheaper than a space heater (10 to 15 times less for a mains model), because the heat goes straight onto you instead of warming the air.",
            "The obvious trade that follows: turn the living-room thermostat down 2 degrees and settle under a heated throw — one of winter's best comfort-per-euro moves.",
          ],
        },
        {
          title: "Safety: the protections to insist on",
          paragraphs: [
            "Overheat protection first: the heating element must cut out if any spot runs abnormally hot (a folded blanket, for instance), ideally with short-circuit protection as well. Serious products spell these protections out on the product sheet.",
            "A timed auto shut-off is a real plus for dozing off under it, but not every throw has one. Without it, low-voltage power (USB 5 V) and overheat protection do most of the work; the rest is a good habit: switch it off or unplug it before sleeping.",
            "And the basics. Mains-powered: a 220–240 V EU plug and a CE marking backed by a real certificate — the applicable standard is EN 60335-2-17. USB 5 V: a quality power bank or charger with suitable outputs. A printed CE logo with no certificate behind it protects nobody.",
          ],
        },
        {
          title: "Care: what to check before you buy",
          paragraphs: [
            "A throw lives on a sofa: it will collect coffee, crumbs and cat hair. If it can't go in the machine, it ends up balled in a cupboard before February.",
            "The point to check: a power supply that disconnects (USB cable or detachable controller). Machine washing isn't always confirmed: if the product page doesn't say so clearly, treat the throw as not machine washable, clean the surface gently with the power disconnected, and keep it out of the dryer.",
          ],
        },
        {
          title: "Size and fabric: what changes the comfort",
          paragraphs: [
            "The right size depends on use. A full sofa size (around 130 × 180 cm) covers you from feet to shoulders but generally needs more power. A throw-shawl format (150 × 85 cm) is lighter and drapes over shoulders or knees, which suits USB 5 V power well. Either way, avoid a size too small for your use: you'll spend the evening re-tucking your legs.",
            "On fabric, coral fleece is soft and light and feels good as soon as it warms up; thick flannel or sherpa keep heat longer once switched off. More important than the fabric is how the heat is spread — several zones (for example 8 carbon-fibre zones) and several levels (for example 40 to 60 °C) let you fine-tune it, and heat intermittently to spend even less.",
          ],
        },
      ],
    },
  },
  {
    id: "gilet-chauffant-guide",
    slug: { fr: "choisir-gilet-chauffant", en: "heated-vest-guide" },
    datePublished: "2026-08-01",
    readMinutes: 6,
    relatedProductIds: ["gilet-chauffant", "chauffe-mains"],
    title: {
      fr: "Gilet chauffant : zones, autonomie réelle, tailles — le guide sans marketing",
      en: "Heated vests: zones, real battery life, sizing — the no-marketing guide",
    },
    metaDescription: {
      fr: "Combien de zones de chauffe faut-il vraiment ? Pourquoi l'autonomie annoncée est fausse ? Quelle taille commander ? Guide d'achat honnête du gilet chauffant USB.",
      en: "How many heating zones do you really need? Why claimed battery life is wrong? What size to order? An honest USB heated vest buying guide.",
    },
    intro: {
      fr: "Le gilet chauffant est le vêtement chauffant le plus efficace : il chauffe le tronc, et le corps redistribue. Mais c'est aussi la catégorie où le marketing exagère le plus — zones comptées généreusement, autonomies irréalistes, tailles trompeuses. Remettons les chiffres à l'endroit.",
      en: "A heated vest is the most effective heated garment: it warms your core and the body redistributes. It's also the category where marketing exaggerates most — generously counted zones, unrealistic battery life, misleading sizes. Let's put the numbers straight.",
    },
    sections: {
      fr: [
        {
          title: "Les zones de chauffe : l'emplacement compte plus que le nombre",
          paragraphs: [
            "Les fiches annoncent 9, 21, parfois 28 « zones ». En pratique, ce qui compte est ailleurs : le dos et les lombaires doivent être couverts (c'est là que la chaleur détend et se diffuse), le col est un vrai plus par grand froid, et des sections pilotables séparément (avant / arrière) évitent de surchauffer la poitrine pour avoir chaud au dos.",
            "Un gilet à 6 zones bien placées et contrôlables bat un gilet à 28 micro-zones toutes reliées au même bouton.",
          ],
        },
        {
          title: "L'autonomie réelle (et pourquoi les fiches mentent)",
          paragraphs: [
            "Les « 8 à 10 heures » des annonces correspondent au niveau minimum, souvent avec une seule zone active. En usage réel sur une powerbank de 10 000 mAh, comptez environ 3 heures à pleine puissance — davantage en mode moyen ou éco. C'est suffisant pour un trajet, un match, une session de travail dans une pièce froide ; pas pour une journée de ski en continu.",
            "Deux détails qui changent tout : la powerbank n'est presque jamais incluse (budget 15–25 € en plus), et la chauffe est nettement meilleure avec une powerbank capable de délivrer 20 W qu'avec un vieux modèle 10 W.",
          ],
        },
        {
          title: "Tailles : la règle de la taille au-dessus",
          paragraphs: [
            "La quasi-totalité des gilets chauffants du marché taillent asiatique : comptez une taille au-dessus de votre taille européenne habituelle — un M français commande un L, un L commande un XL. C'est la première cause de retour de la catégorie.",
            "Le bon test à la réception : le gilet doit se porter près du corps (la chaleur se transmet par contact) mais laisser passer une couche fine dessous. Trop serré, il comprime les zones de chauffe ; trop ample, la chaleur se perd.",
          ],
        },
        {
          title: "Entretien et durée de vie",
          paragraphs: [
            "Un gilet graphène se lave en machine à froid, programme délicat, sans essorage fort et sans sèche-linge — après avoir retiré la powerbank de la poche. Ne jamais tordre le textile : c'est le geste qui casse les pistes chauffantes.",
            "Au rangement de printemps, pliez-le sans écraser les zones de chauffe et stockez la powerbank à moitié chargée : c'est elle qui vieillit le plus vite.",
          ],
        },
      ],
      en: [
        {
          title: "Heating zones: placement beats the number",
          paragraphs: [
            "Listings advertise 9, 21, sometimes 28 'zones'. In practice what matters is elsewhere: the back and lower back must be covered (that's where heat relaxes and spreads), a heated collar is a real plus in deep cold, and separately controllable sections (front / back) stop you cooking your chest to warm your back.",
            "A vest with 6 well-placed, controllable zones beats one with 28 micro-zones all wired to a single button.",
          ],
        },
        {
          title: "Real battery life (and why listings lie)",
          paragraphs: [
            "The advertised '8 to 10 hours' refers to the minimum level, often with a single zone active. In real use on a 10,000 mAh power bank, expect about 3 hours at full power — more in medium or eco mode. Enough for a commute, a match, or a session in a cold room; not for a full ski day.",
            "Two details that change everything: the power bank is almost never included (budget €15–25 extra), and heating is noticeably stronger with a 20 W-capable power bank than with an old 10 W unit.",
          ],
        },
        {
          title: "Sizing: the one-size-up rule",
          paragraphs: [
            "Nearly every heated vest on the market uses Asian sizing: order one size above your usual EU size — an EU M orders L, an L orders XL. It's the category's number-one cause of returns.",
            "The right test on delivery: the vest should sit close to the body (heat transfers by contact) while leaving room for one thin layer underneath. Too tight compresses the heating zones; too loose loses the heat.",
          ],
        },
        {
          title: "Care and lifespan",
          paragraphs: [
            "A graphene vest machine-washes cold on a delicate cycle, no hard spin, no dryer — after removing the power bank from the pocket. Never wring the fabric: that's the gesture that snaps heating tracks.",
            "For spring storage, fold without creasing the heating zones and store the power bank half-charged: it's the part that ages fastest.",
          ],
        },
      ],
    },
  },
  {
    id: "pieds-froids-guide",
    slug: { fr: "pieds-froids-solutions", en: "cold-feet-solutions" },
    datePublished: "2026-08-01",
    readMinutes: 5,
    relatedProductIds: ["semelles-chauffantes", "chaussons-chauffants"],
    title: {
      fr: "Pieds froids : semelles chauffantes ou chaussons, que choisir selon votre cas",
      en: "Cold feet: heated insoles or heated slippers — which one for your case",
    },
    metaDescription: {
      fr: "Pieds gelés dehors, au bureau ou à la maison ? Semelles chauffantes vs chaussons chauffants : autonomie, usage, limites — le comparatif honnête.",
      en: "Frozen feet outdoors, at your desk or at home? Heated insoles vs heated slippers: battery life, use cases, limits — the honest comparison.",
    },
    intro: {
      fr: "Les pieds sont l'extrémité que le corps sacrifie en premier quand il a froid : la circulation y ralentit pour protéger le tronc. Résultat, on peut avoir chaud partout et les orteils gelés. Il existe deux réponses chauffantes — elles ne servent pas du tout au même moment.",
      en: "Feet are the first extremity the body sacrifices in the cold: circulation slows there to protect the core. The result: you can feel warm everywhere with frozen toes. Two heated answers exist — and they serve completely different moments.",
    },
    sections: {
      fr: [
        {
          title: "Dehors et en mouvement : les semelles chauffantes",
          paragraphs: [
            "Dès que vous êtes en chaussures — marche, chantier, stade, chasse, ski — la semelle chauffante est la bonne réponse. Deux conceptions existent. Batterie intégrée : pas de câble, parfois une télécommande, mais un produit plus technique. USB sur batterie externe : plus simple et plus abordable, la powerbank se glisse dans une poche, l'autonomie se choisit en choisissant la powerbank, et il suffit de faire passer le câble le long de la jambe. Les deux se défendent ; tout dépend de votre usage. C'est le principe de notre modèle : USB sur batterie externe (non incluse), chauffe sur tout le pied, une température fixe, en EU 35–40 ou 41–46.",
            "L'autonomie honnête : sur batterie intégrée, 3 à 7 heures selon le niveau (les « 9 heures » des annonces correspondent au niveau minimum) ; en USB, elle dépend directement de la capacité de la powerbank, dimensionnez-la en conséquence. Et un avertissement d'usine à prendre au sérieux : si votre semelle se découpe à la pointure, uniquement le long des lignes marquées — jamais dans la zone de l'élément chauffant.",
          ],
        },
        {
          title: "À la maison : les chaussons chauffants",
          paragraphs: [
            "À l'intérieur, le chausson chauffant est plus simple et plus confortable : chaleur sur l'avant-pied, intérieur doux qui garde la température, et alimentation USB sans batterie à gérer. C'est la solution du télétravail, du soir devant la télé et des rez-de-chaussée froids. Précision : le modèle Obflo est un chauffe-pieds en peluche à poser sous le bureau ou devant le canapé, dans lequel on glisse les pieds ; ce n'est pas un chausson pour marcher.",
            "Sa limite est sa force : branché, il ne bouge pas loin. Pour circuler dans la maison, on privilégie un modèle à câble détachable qui garde la chaleur accumulée quelques dizaines de minutes.",
          ],
        },
        {
          title: "Les erreurs qui gâchent tout",
          paragraphs: [
            "Laver une semelle chauffante : l'eau — et même une transpiration très abondante — endommage l'élément chauffant. L'entretien correct, c'est un chiffon humide en surface, jamais d'immersion.",
            "Superposer deux paires de chaussettes épaisses : cela comprime le pied, ralentit encore la circulation et isole le pied… de la semelle chauffante. Une seule paire de chaussettes de qualité, et la chaleur passe.",
            "Attendre d'avoir les pieds gelés pour allumer : la chauffe sert à maintenir des pieds chauds, pas à réchauffer des pieds déjà froids à travers la corne du pied. On allume au moment de sortir, pas une heure après.",
          ],
        },
      ],
      en: [
        {
          title: "Outdoors and on the move: heated insoles",
          paragraphs: [
            "As soon as you're in shoes — walking, worksite, stadium, hunting, skiing — a heated insole is the right answer. Two designs exist. Built-in battery: no cable, sometimes a remote, but a more complex product. USB on a power bank: simpler and more affordable; the power bank slips into a pocket, you pick the runtime by picking the power bank, and the cable just has to run up the leg. Both are defensible; it depends on your use. That's the principle of our model: USB on a power bank (not included), heating the whole foot, one fixed temperature, in EU 35–40 or 41–46.",
            "Honest battery life: with a built-in battery, 3 to 7 hours depending on the level (the advertised '9 hours' is the minimum setting); on USB it depends directly on the power bank's capacity, so size it accordingly. And a factory warning worth taking seriously: if your insole is trimmed to size, cut only along the marked lines — never into the heating-element area.",
          ],
        },
        {
          title: "At home: heated slippers",
          paragraphs: [
            "Indoors, heated slippers are simpler and more comfortable: forefoot warmth, a soft lining that holds temperature, and USB power with no battery to manage. That's the answer for home-office days, evenings on the sofa and cold ground floors. Note: the Obflo model is a plush foot warmer to set under the desk or by the sofa and slide your feet into; it is not a slipper for walking.",
            "Their limit is their strength: plugged in, they don't roam far. To move around the house, pick a model with a detachable cable that holds accumulated heat for a few dozen minutes.",
          ],
        },
        {
          title: "The mistakes that ruin everything",
          paragraphs: [
            "Washing a heated insole: water — and even very heavy sweat — damages the heating element. Correct care is a damp cloth on the surface, never immersion.",
            "Stacking two thick pairs of socks: it compresses the foot, slows circulation further and insulates your foot… from the heated insole. One quality pair, and the heat gets through.",
            "Waiting until your feet are frozen to switch on: heating maintains warm feet, it doesn't defrost cold ones through thick skin. Switch on when you head out, not an hour later.",
          ],
        },
      ],
    },
  },
  {
    id: "chauffe-mains-guide",
    slug: {
      fr: "chauffe-mains-rechargeable-guide",
      en: "rechargeable-hand-warmer-guide",
    },
    datePublished: "2026-08-01",
    readMinutes: 5,
    relatedProductIds: ["chauffe-mains", "gants-chauffants"],
    title: {
      fr: "Chauffe-mains rechargeable : autonomie réelle, avion, et comment bien choisir",
      en: "Rechargeable hand warmers: real battery life, flying rules, and how to choose",
    },
    metaDescription: {
      fr: "mAh gonflés, autonomie réelle, règles en avion, chauffe-mains vs gants chauffants : le guide honnête du chauffe-mains électrique rechargeable.",
      en: "Inflated mAh, real battery life, flying rules, hand warmer vs heated gloves: the honest guide to rechargeable electric hand warmers.",
    },
    intro: {
      fr: "Le chauffe-mains rechargeable a remplacé les sachets jetables : quelques secondes pour chauffer, des centaines de cycles, et souvent une fonction powerbank en bonus. Mais la catégorie a ses pièges — capacités gonflées, autonomies théoriques, et des règles de transport que peu de fiches mentionnent.",
      en: "Rechargeable hand warmers have replaced disposable packets: seconds to heat, hundreds of cycles, and often a power-bank function as a bonus. But the category has its traps — inflated capacities, theoretical battery life, and transport rules few product pages mention.",
    },
    sections: {
      fr: [
        {
          title: "Autonomie : les vrais chiffres",
          paragraphs: [
            "Un chauffe-mains sérieux tient 4 à 8 heures au niveau haut — les « 15 heures » des annonces correspondent au niveau minimum d'un modèle double batterie. Trois niveaux entre 45 et 55 °C suffisent : au-delà, on ne tient plus l'objet en main.",
            "Méfiez-vous des capacités annoncées : les « 10 000 mAh » à 8 € font souvent 5 000 mAh réels. Le format double galet magnétique — deux unités séparables, une par poche — est le plus polyvalent : chaleur des deux côtés en marchant, un seul bloc pour recharger.",
          ],
        },
        {
          title: "En avion : cabine oui, soute non",
          paragraphs: [
            "C'est une batterie lithium : elle voyage obligatoirement en cabine, jamais dans une valise en soute. La règle vaut pour tous les appareils à batterie intégrée. En pratique : glissez-le dans le sac à main ou la poche du manteau, et pas de souci jusqu'à 100 Wh — un chauffe-mains en fait typiquement 15 à 40.",
            "Sur le même sujet sécurité : n'achetez pas l'entrée de gamme à 3–4 €. La catégorie fait l'objet d'une vraie surveillance des régulateurs, et l'écart de prix se joue précisément sur la puce de contrôle de température et la qualité de cellule.",
          ],
        },
        {
          title: "Chauffe-mains ou gants chauffants ?",
          paragraphs: [
            "Les deux ne s'excluent pas, ils se complètent. Le chauffe-mains gagne quand les mains doivent rester libres et nues par intermittence : photo, poussette, attente à l'arrêt de bus, bureau glacial. Les gants gagnent en continu dehors : vélo, scooter, randonnée.",
            "Le combo le plus efficace par grand froid : gants chauffants aux mains, chauffe-mains dans les poches pour les pauses — c'est aussi une seconde source d'énergie de secours pour le téléphone.",
          ],
        },
      ],
      en: [
        {
          title: "Battery life: the real numbers",
          paragraphs: [
            "A serious hand warmer lasts 4 to 8 hours on high — the advertised '15 hours' is a dual-battery model on its minimum setting. Three levels between 45 and 55 °C are enough: beyond that you can't hold the thing.",
            "Distrust claimed capacities: '10,000 mAh' at €8 is often 5,000 real mAh. The magnetic split-pebble format — two separable units, one per pocket — is the most versatile: warmth on both sides while walking, one block to recharge.",
          ],
        },
        {
          title: "Flying: cabin yes, hold no",
          paragraphs: [
            "It's a lithium battery: it must travel in the cabin, never in checked luggage. The rule covers every device with a built-in battery. In practice: keep it in your hand luggage or coat pocket, and you're fine up to 100 Wh — a hand warmer is typically 15 to 40.",
            "On the same safety theme: skip the €3–4 entry level. The category is under real regulator scrutiny, and the price gap sits precisely in the temperature-control chip and cell quality.",
          ],
        },
        {
          title: "Hand warmer or heated gloves?",
          paragraphs: [
            "They don't compete — they combine. The hand warmer wins when hands must stay free and bare intermittently: photos, strollers, waiting for the bus, a freezing office. Gloves win for continuous outdoor use: cycling, scooters, hiking.",
            "The most effective deep-cold combo: heated gloves on, hand warmer in the pockets for breaks — which doubles as emergency phone power.",
          ],
        },
      ],
    },
  },
);

guideSources.push(
  {
    id: "chaussons-guide",
    slug: {
      fr: "choisir-chaussons-chauffants",
      en: "heated-slippers-guide",
    },
    datePublished: "2026-08-02",
    readMinutes: 5,
    relatedProductIds: ["chaussons-chauffants", "pack-maison-chaude"],
    title: {
      fr: "Chaussons chauffants : USB, lavage, sécurité — le guide avant d'acheter",
      en: "Heated slippers: USB power, washing, safety — the pre-purchase guide",
    },
    metaDescription: {
      fr: "Chaussons chauffants USB ou bouillotte sèche ? Lavables ou pas ? Câble détachable, taille unique, sécurité : ce qu'il faut vérifier avant d'acheter.",
      en: "USB heated slippers or microwavable ones? Washable or not? Detachable cable, one-size fit, safety: what to check before buying.",
    },
    intro: {
      fr: "Le sol est la surface la plus froide de la maison, et les pieds y passent la soirée. Les chaussons chauffants règlent le problème à la source — mais la catégorie mélange trois produits très différents sous le même nom. Voici comment les distinguer et ce qui fait un bon achat.",
      en: "The floor is the coldest surface in the house, and your feet spend the evening on it. Heated slippers fix the problem at the source — but the category mixes three very different products under one name. Here's how to tell them apart and what makes a good buy.",
    },
    sections: {
      fr: [
        {
          title: "Trois produits sous un seul nom",
          paragraphs: [
            "Le chausson chauffant électrique (USB) : des zones de chauffe actives sur l'avant-pied, alimentées par câble. Chaleur constante et réglable — c'est la catégorie de ce guide, et la seule qui chauffe vraiment en continu.",
            "Le chausson « bouillotte sèche » à passer au micro-ondes : des graines qui restituent la chaleur 20 à 30 minutes. Sans fil, mais il refroidit vite et repasse par la case micro-ondes toute la soirée.",
            "Le chausson isolant simple (sherpa, laine) : il conserve la chaleur du pied mais n'en produit pas — si vos pieds sont déjà froids, il ne les réchauffera pas. C'est le piège classique des fiches ambiguës : cherchez les mots « zones chauffantes » et une alimentation explicite.",
          ],
        },
        {
          title: "USB 5V : ce que ça implique au quotidien",
          paragraphs: [
            "L'alimentation USB 5V est une force : aucune tension dangereuse au niveau des pieds, compatible avec n'importe quel chargeur, powerbank ou port d'ordinateur, et une chauffe perceptible en moins d'une minute sur l'avant-pied — la zone la plus lente à se réchauffer naturellement.",
            "Sa contrepartie est le câble. Le critère qui change tout : un câble détachable. On se lève, on se détache, on marche — et le rembourrage isolant garde la chaleur accumulée pendant de longues minutes. Un modèle à câble fixe transforme chaque déplacement en manœuvre.",
          ],
        },
        {
          title: "Lavage, taille, semelle : les trois vérifications",
          paragraphs: [
            "Lavables, vraiment ? Un chausson vit au sol et se lave forcément un jour. La règle : lavage à la main à l'eau froide, une fois le câble débranché — et jamais de sèche-linge, qui casse les éléments chauffants. Une fiche qui ne dit rien sur le lavage cache généralement un produit non lavable.",
            "La taille unique (souvent EU 36–45) fonctionne grâce à un intérieur adaptatif — vérifiez quand même la plage exacte si vous chaussez du 35 ou du 46.",
            "La semelle antidérapante n'est pas une option : un chausson moelleux sur du parquet, c'est une glissade en puissance. Semelle texturée obligatoire, usage intérieur uniquement.",
          ],
        },
        {
          title: "Pour qui c'est le bon achat",
          paragraphs: [
            "Le chausson chauffant est la solution du poste fixe : télétravail, lecture, soirée canapé, rez-de-chaussée froid. Pour circuler dans la maison, le duo gagnant est chausson à câble détachable + petites sessions de recharge de chaleur. Et si votre problème est dehors — bottes, chantier, stade — ce sont des semelles chauffantes qu'il vous faut, pas des chaussons. Précision : le modèle Obflo est un chauffe-pieds en peluche à poser sous le bureau ou devant le canapé, dans lequel on glisse les pieds ; ce n'est pas un chausson pour marcher.",
          ],
        },
      ],
      en: [
        {
          title: "Three products under one name",
          paragraphs: [
            "The electric (USB) heated slipper: active heating zones on the forefoot, powered by cable. Constant, adjustable warmth — that's this guide's category, and the only one that genuinely heats continuously.",
            "The microwavable 'dry hot-water-bottle' slipper: grain filling that releases heat for 20 to 30 minutes. Cordless, but it cools fast and goes back to the microwave all evening.",
            "The plain insulating slipper (sherpa, wool): it keeps the foot's own heat but produces none — if your feet are already cold, it won't warm them up. That's the classic trap of ambiguous listings: look for the words 'heating zones' and an explicit power source.",
          ],
        },
        {
          title: "USB 5V: what it means day to day",
          paragraphs: [
            "5V USB power is a strength: no dangerous voltage at foot level, compatibility with any charger, power bank or laptop port, and noticeable warmth in under a minute on the forefoot — the area slowest to warm up naturally.",
            "Its trade-off is the cable. The criterion that changes everything: a detachable cable. You stand up, unclip, walk — and the insulating lining holds the accumulated heat for long minutes. A fixed-cable model turns every trip to the kitchen into a manoeuvre.",
          ],
        },
        {
          title: "Washing, sizing, sole: the three checks",
          paragraphs: [
            "Washable, really? A slipper lives on the floor and will need washing one day. The rule: hand wash in cold water, cable unplugged — and never the dryer, which kills heating elements. A listing that says nothing about washing usually hides a non-washable product.",
            "One-size fits (often EU 36–45) work thanks to an adaptive lining — still check the exact range if you wear a 35 or a 46.",
            "A non-slip sole is not optional: a plush slipper on hardwood is a slip waiting to happen. Textured sole required, indoor use only.",
          ],
        },
        {
          title: "Who it's the right buy for",
          paragraphs: [
            "Heated slippers are the fixed-station answer: home office, reading, sofa evenings, cold ground floors. To move around the house, the winning combo is a detachable-cable slipper plus short heat top-up sessions. And if your problem is outdoors — boots, worksites, stadiums — you need heated insoles, not slippers. Note: the Obflo model is a plush foot warmer to set under the desk or by the sofa and slide your feet into; it is not a slipper for walking.",
          ],
        },
      ],
    },
  },
  {
    id: "chauffe-tasse-guide",
    slug: {
      fr: "chauffe-tasse-usb-guide",
      en: "mug-warmer-guide",
    },
    datePublished: "2026-08-02",
    readMinutes: 4,
    relatedProductIds: ["mini-chauffe-tasse", "sous-main-chauffant"],
    title: {
      fr: "Chauffe-tasse USB : maintenir chaud, oui — réchauffer, non. Le guide honnête",
      en: "USB mug warmers: keeping hot, yes — reheating, no. The honest guide",
    },
    metaDescription: {
      fr: "Un chauffe-tasse USB maintient votre café à ~55 °C, il ne réchauffe pas un café froid. Mugs compatibles, arrêt auto, consommation : le guide honnête.",
      en: "A USB mug warmer keeps coffee at ~55 °C — it won't reheat a cold cup. Compatible mugs, auto-off, power use: the honest guide.",
    },
    intro: {
      fr: "C'est l'objet à 19 € qui supprime un rituel absurde : l'aller-retour au micro-ondes toutes les quarante minutes. Mais la catégorie souffre d'un malentendu massif sur ce qu'elle fait vraiment — et les déceptions viennent presque toutes de là. Mise au point en quatre minutes.",
      en: "It's the €19 object that removes an absurd ritual: the microwave round-trip every forty minutes. But the category suffers from one massive misunderstanding about what it actually does — and nearly every disappointment comes from there. Let's clear it up in four minutes.",
    },
    sections: {
      fr: [
        {
          title: "Le malentendu n° 1 : maintenir ≠ réchauffer",
          paragraphs: [
            "Un chauffe-tasse USB délivre 5 à 10 W. C'est exactement assez pour compenser la chaleur qu'un mug perd — et pas assez pour remonter un café froid à température. Physique simple : réchauffer demande dix fois plus de puissance que maintenir.",
            "Le bon usage en découle : posez le café chaud dès qu'il est servi, et il reste à température de dégustation tout l'après-midi. Posez un café oublié depuis une heure, et vous obtiendrez un café tiède — c'est le reproche n° 1 dans les avis de toute la catégorie, et il vise un usage, pas un défaut.",
          ],
        },
        {
          title: "Le mug fait la moitié du résultat",
          paragraphs: [
            "La chaleur passe par conduction : il faut un fond plat et un contact franc avec le plateau. Les mugs à fond épais ou incurvé isolent leur propre contenu — les fonds fins et plats transmettent le mieux.",
            "Deux cas particuliers : les tasses à double paroi, conçues précisément pour bloquer les transferts de chaleur, neutralisent le chauffe-tasse ; et les gobelets en carton fonctionnent, mais mieux vaut un mug — le plateau chauffe autour de 55 °C.",
          ],
        },
        {
          title: "Sécurité et consommation : les deux bonnes nouvelles",
          paragraphs: [
            "L'arrêt automatique au retrait de la tasse est le critère de sécurité à exiger : le plateau s'éteint seul quand vous partez en réunion. À ~55 °C de température de plateau, on parle d'un objet moins chaud qu'une tasse de thé fraîchement servie.",
            "Côté consommation, 5 à 10 W pendant un après-midi représentent environ un centime d'électricité — moins que le micro-ondes qu'il remplace, et sans le goût de café recuit.",
          ],
        },
        {
          title: "Pour qui, et avec quoi",
          paragraphs: [
            "Le profil type : bureau ou télétravail, café ou thé qui traîne, pièce fraîche. Il se combine naturellement avec le reste du poste de travail d'hiver — sous-main chauffant pour les mains, chauffage d'appoint pour la pièce. Un trio qui tient dans 60 W là où un radiateur en demande 1 500.",
          ],
        },
      ],
      en: [
        {
          title: "Misunderstanding #1: keeping ≠ reheating",
          paragraphs: [
            "A USB mug warmer delivers 5 to 10 W. That's exactly enough to offset the heat a mug loses — and not enough to bring a cold coffee back up to temperature. Simple physics: reheating takes ten times more power than maintaining.",
            "The right usage follows: set your coffee down hot as soon as it's poured, and it stays at drinking temperature all afternoon. Set down a cup forgotten an hour ago, and you'll get a lukewarm coffee — that's complaint #1 in reviews across the category, and it targets a usage, not a defect.",
          ],
        },
        {
          title: "The mug does half the work",
          paragraphs: [
            "Heat transfers by conduction: you need a flat bottom and firm contact with the plate. Thick or curved-bottom mugs insulate their own contents — thin, flat bottoms transmit best.",
            "Two special cases: double-walled cups, designed precisely to block heat transfer, neutralise a mug warmer; and paper cups work, but a mug is better — the plate runs at around 55 °C.",
          ],
        },
        {
          title: "Safety and power use: the two pieces of good news",
          paragraphs: [
            "Auto-off when the mug is lifted is the safety criterion to demand: the plate switches itself off when you leave for a meeting. At ~55 °C plate temperature, we're talking about an object cooler than a freshly served cup of tea.",
            "On consumption, 5 to 10 W across an afternoon is roughly one cent of electricity — less than the microwave it replaces, and without the re-cooked coffee taste.",
          ],
        },
        {
          title: "Who it's for, and what to pair it with",
          paragraphs: [
            "The typical profile: office or home office, coffee or tea that lingers, a cool room. It pairs naturally with the rest of the winter desk setup — a heated desk mat for the hands, a space heater for the room. A trio that fits in 60 W where a radiator asks for 1,500.",
          ],
        },
      ],
    },
  },
  {
    id: "sous-main-guide",
    slug: {
      fr: "mains-froides-bureau",
      en: "cold-hands-desk-guide",
    },
    datePublished: "2026-08-02",
    readMinutes: 5,
    relatedProductIds: ["sous-main-chauffant", "mini-chauffe-tasse"],
    title: {
      fr: "Mains froides au bureau : pourquoi ça arrive et ce qui marche vraiment",
      en: "Cold hands at your desk: why it happens and what actually works",
    },
    metaDescription: {
      fr: "Doigts gelés au clavier même dans une pièce à 19 °C ? L'immobilité en est la cause. Sous-main chauffant, températures sûres, setup complet : le guide.",
      en: "Frozen fingers on the keyboard even at 19 °C? Immobility is the cause. Heated desk mats, safe temperatures, the full setup: the guide.",
    },
    intro: {
      fr: "On peut avoir froid aux mains dans une pièce à 19 degrés. Ce n'est pas une impression : huit heures d'immobilité réduisent la circulation vers les extrémités, et le clavier n'arrange rien. Voici la mécanique du problème, et les solutions classées par efficacité réelle.",
      en: "You can have cold hands in a 19-degree room. It's not in your head: eight hours of sitting still reduce circulation to the extremities, and the keyboard doesn't help. Here's the mechanics of the problem, and the solutions ranked by real effectiveness.",
    },
    sections: {
      fr: [
        {
          title: "Pourquoi les mains gèlent au clavier",
          paragraphs: [
            "Assis immobile, le corps réduit la circulation périphérique — c'est le même mécanisme qui gèle les pieds au cinéma. Les mains posées sur un bureau y ajoutent deux aggravants : le contact permanent avec une surface froide qui pompe la chaleur, et une position surélevée qui n'aide pas le retour veineux.",
            "Conséquence directe : chauffer la pièce entière est la réponse la plus chère au problème le plus localisé de la maison. La chaleur de contact, elle, agit exactement où le froid s'installe.",
          ],
        },
        {
          title: "Le sous-main chauffant : la solution de contact",
          paragraphs: [
            "Un sous-main chauffant d'environ 60 × 36 cm couvre la zone clavier + souris : les poignets et les paumes reposent en permanence sur une surface tiède, et les doigts restent souples. La chauffe arrive en quelques secondes — c'est la différence avec un radiateur, qui met une heure à changer votre confort.",
            "Les deux réflexes de sécurité : un interrupteur à portée de main pour l'éteindre en partant (l'oubli du soir est la règle, pas l'exception — un arrêt automatique est un plus quand il existe) et une température de surface modérée. Au-delà de 43 °C en contact permanent prolongé, la peau n'aime pas — un sous-main doit rester tiède, pas brûlant.",
          ],
        },
        {
          title: "Ce qui complète (et ce qui ne marche pas)",
          paragraphs: [
            "Le trio bureau d'hiver efficace : sous-main chauffant pour les mains, chauffe-tasse pour le café, et si la pièce est vraiment froide, un chauffage céramique orienté vers vous. Le tout consomme moins qu'une ampoule halogène d'époque.",
            "Ce qui déçoit : les mitaines épaisses au clavier (perte de précision, transpiration), et le radiateur à l'autre bout de la pièce (l'air chaud monte au plafond avant d'atteindre vos doigts). Ce qui aide gratuitement : deux minutes de mouvement par heure — la circulation repart, la chaleur de contact fait le reste.",
          ],
        },
      ],
      en: [
        {
          title: "Why hands freeze at the keyboard",
          paragraphs: [
            "Sitting still, the body reduces peripheral circulation — the same mechanism that freezes your feet at the cinema. Hands resting on a desk add two aggravators: permanent contact with a cold surface that pumps heat away, and a raised position that doesn't help venous return.",
            "The direct consequence: heating the whole room is the most expensive answer to the most localised problem in the house. Contact warmth, by contrast, acts exactly where the cold sets in.",
          ],
        },
        {
          title: "The heated desk mat: the contact solution",
          paragraphs: [
            "A heated desk mat of about 60 × 36 cm covers the keyboard + mouse zone: wrists and palms rest permanently on a warm surface, and fingers stay supple. The heat arrives within seconds — that's the difference from a radiator, which takes an hour to change your comfort.",
            "The two safety habits: a switch within reach to turn it off when you leave (forgetting it at night is the rule, not the exception — an automatic shut-off is a plus when there is one) and a moderate surface temperature. Beyond 43 °C in prolonged permanent contact, skin doesn't like it — a desk mat should stay warm, not hot.",
          ],
        },
        {
          title: "What completes it (and what doesn't work)",
          paragraphs: [
            "The effective winter desk trio: a heated desk mat for the hands, a mug warmer for the coffee, and if the room is genuinely cold, a ceramic heater aimed at you. The whole thing draws less than an old halogen bulb.",
            "What disappoints: thick fingerless gloves at the keyboard (lost precision, sweat), and a radiator across the room (warm air reaches the ceiling before your fingers). What helps for free: two minutes of movement per hour — circulation restarts, and contact warmth does the rest.",
          ],
        },
      ],
    },
  },
);

function localizeGuide(source: GuideSource, locale: Locale): Guide | undefined {
  const slugs = GUIDE_SLUGS[source.id];
  if (!slugs) return undefined;

  const base = {
    id: source.id,
    slug: slugs[locale],
    slugs,
    datePublished: source.datePublished,
    readMinutes: source.readMinutes,
    relatedProductIds: source.relatedProductIds,
    // Pas de photo propre aux guides : celles des produits dont ils parlent, mises en situation d'abord.
    images: source.relatedProductIds.flatMap((id) => {
      const product = getProductById(id, locale);
      return (product?.photos ?? [])
        .filter((src) => src.includes("-usage-"))
        .map((src) => ({ src, alt: product!.name }));
    }),
  };

  if (locale === "fr" || locale === "en") {
    const text = {
      title: source.title[locale],
      metaDescription: source.metaDescription[locale],
      intro: source.intro[locale],
      sections: source.sections[locale],
    };
    return { ...base, ...(locale === "fr" ? frTypoDeep(text) : text) };
  }

  const l10n = overlays[locale]?.[source.id];
  if (!l10n) return undefined;
  return { ...base, ...l10n };
}

export function getGuides(locale: Locale): Guide[] {
  return guideSources
    .map((g) => localizeGuide(g, locale))
    .filter((g): g is Guide => Boolean(g));
}

export function getGuideBySlug(
  locale: Locale,
  slug: string,
): Guide | undefined {
  const id = guideIdFromSlug(locale, slug);
  if (!id) return undefined;
  const source = guideSources.find((g) => g.id === id);
  return source ? localizeGuide(source, locale) : undefined;
}

/** Locales dans lesquelles un guide donné est réellement disponible. */
export function guideLocales(id: string): Locale[] {
  return routing.locales.filter((locale) => {
    if (locale === "fr" || locale === "en") return true;
    return Boolean(overlays[locale]?.[id]);
  });
}
