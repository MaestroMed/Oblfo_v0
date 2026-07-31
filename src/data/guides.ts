// Guides d'achat SEO — contenu éditorial bilingue, maillé vers le catalogue.
// Dates figées à la publication (pas de Date.now : contenu stable en SSG).

import type { Locale } from "@/i18n/routing";

type LText = Record<Locale, string>;

export type GuideSection = {
  title: string;
  paragraphs: string[];
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
};

type GuideSource = {
  id: string;
  slug: LText;
  datePublished: string;
  readMinutes: number;
  relatedProductIds: string[];
  title: LText;
  metaDescription: LText;
  intro: LText;
  sections: Record<Locale, GuideSection[]>;
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
      fr: "Chauffer toute la maison pour une seule pièce occupée, c'est la façon la plus chère de ne pas avoir froid. Un chauffage d'appoint bien choisi fait l'inverse : il chauffe l'endroit où tu es, au moment où tu y es. Voici comment calculer ce qu'il coûte vraiment, choisir la bonne puissance et éviter les pièges.",
      en: "Heating the whole house for the one room you actually occupy is the most expensive way to stay warm. A well-chosen space heater does the opposite: it heats the spot you're in, while you're in it. Here's how to work out the real cost, pick the right wattage and avoid the classic mistakes.",
    },
    sections: {
      fr: [
        {
          title: "Le vrai coût par heure : un calcul en 10 secondes",
          paragraphs: [
            "La formule tient sur une ligne : puissance (en kW) × heures d'utilisation × prix du kWh. Un chauffage de 1 200 W utilisé 3 heures par soir, avec un kWh autour de 0,25 €, coûte 1,2 × 3 × 0,25 = 0,90 € par soirée. Environ 27 € par mois — pour une pièce vraiment chaude, aux heures où tu y es.",
            "Le comparatif qui compte : monter le chauffage central de 2 degrés pour toute la maison coûte typiquement 3 à 5 fois plus cher que chauffer ponctuellement la pièce occupée. Le chauffage d'appoint n'est pas économique « en soi » — il l'est parce qu'il chauffe petit et court.",
            "La règle d'or qui en découle : un chauffage d'appoint sert en complément, pièce par pièce, session par session. Si tu le laisses tourner 24 h/24 dans un grand salon mal isolé, le calcul se retourne contre toi.",
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
            "Prendre un appareil sous-dimensionné « pour économiser » : un 500 W dans 20 m² tourne sans jamais atteindre la consigne — tu consommes sans confort. Mieux vaut la bonne puissance utilisée moins longtemps.",
            "Négliger le positionnement : au sol ou sur un bureau, flux d'air orienté vers toi, pas vers la porte. La chaleur d'un soufflant est directionnelle — c'est sa force pour un poste de travail, à condition de l'orienter.",
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
            "Niveaux de chauffe : trois niveaux suffisent. Au-delà, c'est du marketing ; en dessous, tu n'as pas de position « économie d'autonomie ».",
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

function localizeGuide(source: GuideSource, locale: Locale): Guide {
  return {
    id: source.id,
    slug: source.slug[locale],
    slugs: source.slug,
    title: source.title[locale],
    metaDescription: source.metaDescription[locale],
    intro: source.intro[locale],
    datePublished: source.datePublished,
    readMinutes: source.readMinutes,
    sections: source.sections[locale],
    relatedProductIds: source.relatedProductIds,
  };
}

export function getGuides(locale: Locale): Guide[] {
  return guideSources.map((g) => localizeGuide(g, locale));
}

export function getGuideBySlug(
  locale: Locale,
  slug: string,
): Guide | undefined {
  const source = guideSources.find((g) => g.slug[locale] === slug);
  return source ? localizeGuide(source, locale) : undefined;
}

export function translateGuideSlug(
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  const source = guideSources.find((g) => g.slug[from] === slug);
  return source?.slug[to];
}
