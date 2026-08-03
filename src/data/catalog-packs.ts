// Packs et FAQ — fr/en/de/es.
import type { FaqSource, PackSource } from "./catalog-types";

export const packSources: PackSource[] = [
  {
    id: "pack-sortie-hiver",
    name: {
      fr: "Pack Sortie Hiver",
      en: "Winter Outing Bundle",
      de: "Set Winterausflug",
      es: "Pack Salida de Invierno",
    },
    contents: {
      fr: "Gants Chauffants + Mini Chauffe-Tasse",
      en: "Heated Gloves + Mini Mug Warmer",
      de: "Beheizbare Handschuhe + Tassenwärmer",
      es: "Guantes Calefactables + Calientatazas",
    },
    items: ["gants-chauffants", "mini-chauffe-tasse"],
    price: 59,
    compareAt: 78,
    imageLabel: "PHOTO — gants + chauffe-tasse ensemble",
  },
  {
    id: "pack-maison-chaude",
    name: {
      fr: "Pack Maison Chaude",
      en: "Warm Home Bundle",
      de: "Set Warmes Zuhause",
      es: "Pack Hogar Cálido",
    },
    contents: {
      fr: "Chaussons Chauffants + Chauffage d'Appoint",
      en: "Heated Slippers + Portable Space Heater",
      de: "Beheizbare Hausschuhe + Keramik-Heizlüfter",
      es: "Zapatillas Calefactables + Calefactor Cerámico",
    },
    items: ["chaussons-chauffants", "chauffage-appoint"],
    price: 79,
    compareAt: 93,
    imageLabel: "PHOTO — chaussons + chauffage d'appoint",
  },
  {
    id: "pack-exterieur",
    name: {
      fr: "Pack Extérieur Hiver",
      en: "Winter Outdoor Bundle",
      de: "Set Outdoor Winter",
      es: "Pack Exterior Invierno",
    },
    contents: {
      fr: "Gants Pro + Semelles Chauffantes + Chauffe-Mains",
      en: "Pro Gloves + Heated Insoles + Hand Warmer",
      de: "Pro-Handschuhe + Einlegesohlen + Handwärmer",
      es: "Guantes Pro + Plantillas + Calientamanos",
    },
    items: ["gants-chauffants", "semelles-chauffantes", "chauffe-mains"],
    price: 129,
    compareAt: 147,
    imageLabel: "PHOTO — gants + semelles + chauffe-mains réunis",
  },
  {
    id: "pack-cocooning",
    name: {
      fr: "Pack Cocooning",
      en: "Cocooning Bundle",
      de: "Set Cocooning",
      es: "Pack Cocooning",
    },
    contents: {
      fr: "Plaid Chauffant + Coussin Nuque & Épaules",
      en: "Heated Throw + Neck & Shoulder Pad",
      de: "Kuscheldecke + Nacken-Heizkissen",
      es: "Manta Eléctrica + Almohadilla Cervical",
    },
    items: ["plaid-chauffant", "coussin-chauffant"],
    price: 109,
    compareAt: 123,
    imageLabel: "PHOTO — plaid + coussin sur canapé",
  },
  {
    id: "pack-full-obflo",
    name: {
      fr: "Pack Full OBFLO",
      en: "Full OBFLO Bundle",
      de: "Full-OBFLO-Set",
      es: "Pack Full OBFLO",
    },
    contents: {
      fr: "Les 4 produits — mains, pieds, café, pièce",
      en: "All 4 products — hands, feet, coffee, room",
      de: "Alle 4 Produkte — Hände, Füße, Kaffee, Raum",
      es: "Los 4 productos — manos, pies, café, habitación",
    },
    items: [
      "gants-chauffants",
      "chaussons-chauffants",
      "chauffage-appoint",
      "mini-chauffe-tasse",
    ],
    price: 149,
    compareAt: 171,
    imageLabel: "PHOTO — les 4 produits OBFLO réunis",
    featured: true,
  },
];

export const faqSources: FaqSource[] = [
  {
    question: {
      fr: "Les gants fonctionnent avec une powerbank ?",
      en: "Do the gloves work with a power bank?",
      de: "Funktionieren die Handschuhe mit einer Powerbank?",
      es: "¿Los guantes funcionan con una powerbank?",
    },
    answer: {
      fr: "Oui. Tous nos produits s'alimentent en USB standard (5V). Une powerbank de 10 000 mAh fait fonctionner les gants ou les chaussons pendant plusieurs heures.",
      en: "Yes. All our products run on standard USB (5V). A 10,000 mAh power bank runs the gloves or slippers for several hours.",
      de: "Ja. Alle unsere USB-Produkte laufen mit Standard-USB (5V). Eine 10.000-mAh-Powerbank betreibt Handschuhe oder Hausschuhe mehrere Stunden.",
      es: "Sí. Todos nuestros productos funcionan con USB estándar (5V). Una powerbank de 10.000 mAh alimenta los guantes o las zapatillas durante varias horas.",
    },
  },
  {
    question: {
      fr: "Combien de temps faut-il pour chauffer ?",
      en: "How long do they take to heat up?",
      de: "Wie lange dauert das Aufheizen?",
      es: "¿Cuánto tardan en calentarse?",
    },
    answer: {
      fr: "Entre 30 secondes et 2 minutes selon le produit et le niveau choisi. La chaleur est perceptible quasi immédiatement.",
      en: "Between 30 seconds and 2 minutes depending on the product and the level. You feel the warmth almost immediately.",
      de: "Zwischen 30 Sekunden und 2 Minuten, je nach Produkt und Stufe. Die Wärme ist fast sofort spürbar.",
      es: "Entre 30 segundos y 2 minutos según el producto y el nivel. El calor se nota casi de inmediato.",
    },
  },
  {
    question: {
      fr: "Les chaussons sont-ils lavables ?",
      en: "Are the slippers washable?",
      de: "Sind die Hausschuhe waschbar?",
      es: "¿Las zapatillas son lavables?",
    },
    answer: {
      fr: "Oui, à la main et à l'eau froide, une fois le câble USB débranché. On évite le lave-linge et le sèche-linge.",
      en: "Yes, by hand in cold water, once the USB cable is unplugged. Avoid the washing machine and the dryer.",
      de: "Ja, per Hand in kaltem Wasser, sobald das USB-Kabel abgezogen ist. Waschmaschine und Trockner bitte vermeiden.",
      es: "Sí, a mano y con agua fría, una vez desconectado el cable USB. Evita la lavadora y la secadora.",
    },
  },
  {
    question: {
      fr: "Le chauffage d'appoint consomme beaucoup ?",
      en: "Does the space heater use a lot of power?",
      de: "Verbraucht der Heizlüfter viel Strom?",
      es: "¿El calefactor consume mucho?",
    },
    answer: {
      fr: "Non. Il est conçu pour chauffer un espace réduit — un bureau, une chambre — pas toute la maison. C'est justement ce qui le rend économe.",
      en: "No. It's designed to heat a small space — a desk area, a bedroom — not the whole house. That's exactly what makes it economical.",
      de: "Nein. Er ist für kleine Räume gedacht — Schreibtisch oder Schlafzimmer —, nicht für das ganze Haus. Genau das macht ihn sparsam.",
      es: "No. Está diseñado para calentar un espacio reducido — un escritorio, un dormitorio —, no toda la casa. Precisamente eso lo hace económico.",
    },
  },
  {
    question: {
      fr: "Peut-on retourner un produit ?",
      en: "Can I return a product?",
      de: "Kann ich ein Produkt zurückgeben?",
      es: "¿Puedo devolver un producto?",
    },
    answer: {
      fr: "Oui, sous 30 jours après réception, sans justification. Remboursement intégral dès que le produit nous revient.",
      en: "Yes, within 30 days of delivery, no questions asked. Full refund as soon as the product reaches us.",
      de: "Ja, innerhalb von 30 Tagen nach Erhalt, ohne Begründung. Volle Rückerstattung, sobald das Produkt bei uns eintrifft.",
      es: "Sí, en los 30 días posteriores a la entrega, sin justificación. Reembolso íntegro en cuanto el producto nos llega.",
    },
  },
  {
    question: {
      fr: "Quels sont les délais de livraison ?",
      en: "What are the delivery times?",
      de: "Wie lange dauert die Lieferung?",
      es: "¿Cuáles son los plazos de entrega?",
    },
    answer: {
      fr: "3 à 5 jours ouvrés en France métropolitaine, avec un numéro de suivi envoyé dès l'expédition.",
      en: "3 to 5 business days in metropolitan France, with a tracking number sent as soon as your order ships.",
      de: "3 bis 5 Werktage, mit Sendungsverfolgungsnummer direkt beim Versand.",
      es: "3 a 5 días laborables, con número de seguimiento enviado en cuanto sale el pedido.",
    },
  },
];
