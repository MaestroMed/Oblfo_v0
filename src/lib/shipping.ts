// Règles de livraison — partagées entre l'API checkout (serveur) et le panier (client).
export const FREE_SHIPPING_THRESHOLD = 60;
export const STANDARD_SHIPPING = 4.9;

// Black Friday 2026 : livraison offerte sans minimum du lundi 23/11 00:00 au
// lundi 30/11 23:59, heure de Paris (UTC+1 en novembre). Début inclus, fin exclue.
export const FREE_SHIPPING_PROMO = {
  start: Date.parse("2026-11-22T23:00:00Z"),
  end: Date.parse("2026-11-30T23:00:00Z"),
} as const;

export function freeShippingPromoPhase(now: Date): "before" | "during" | "after" {
  const t = now.getTime();
  return t < FREE_SHIPPING_PROMO.start ? "before" : t < FREE_SHIPPING_PROMO.end ? "during" : "after";
}

export function isFreeShippingPromo(now: Date): boolean {
  return freeShippingPromoPhase(now) === "during";
}

export function shippingCostFor(subtotal: number, now = new Date()): number {
  return isFreeShippingPromo(now) || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

// ── Schema.org ───────────────────────────────────────────────────────────────
// La Search Console signalait « hasMerchantReturnPolicy manquant » et
// « shippingDetails manquant » sur les 10 produits (rapport Fiches de marchand).
// Sans ces champs, Google n'affiche ni le délai de livraison ni la politique de
// retour dans la SERP — deux arguments que la fiche produit met pourtant en avant.
//
// Les valeurs viennent des constantes ci-dessus et de ce qui est affiché sur le
// site (retours 30 jours, livraison 8 à 20 jours, délai fournisseur CJ) : rien n'est inventé.

export const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "FR",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  // Même règle que la page Livraison & retours, les CGV et Merchant Center :
  // frais de renvoi à la charge du client.
  returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
} as const;

const DELIVERY_TIME = {
  "@type": "ShippingDeliveryTime",
  handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "d" },
  transitTime: { "@type": "QuantitativeValue", minValue: 7, maxValue: 17, unitCode: "d" },
} as const;

const SHIPPING_DESTINATION = {
  "@type": "DefinedRegion",
  addressCountry: "FR",
} as const;

/**
 * Deux tarifs déclarés, comme sur le site : le tarif standard, et la gratuité
 * au-delà du seuil (exprimée par `eligibleTransactionVolume`).
 */
const OFFER_SHIPPING_DETAILS = [
  {
    "@type": "OfferShippingDetails",
    shippingDestination: SHIPPING_DESTINATION,
    shippingRate: {
      "@type": "MonetaryAmount",
      value: STANDARD_SHIPPING,
      currency: "EUR",
    },
    deliveryTime: DELIVERY_TIME,
  },
  {
    "@type": "OfferShippingDetails",
    shippingDestination: SHIPPING_DESTINATION,
    shippingRate: {
      "@type": "MonetaryAmount",
      value: 0,
      currency: "EUR",
    },
    eligibleTransactionVolume: {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      minPrice: FREE_SHIPPING_THRESHOLD,
    },
    deliveryTime: DELIVERY_TIME,
  },
] as const;

/**
 * Le tarif réel pour l'achat de cet article seul — un seul par offre, comme
 * dans le flux : Merchant Center refuse deux services sans nom sur un même
 * produit (« Services [shipping] ambigus »).
 */
export function shippingDetailsIndexFor(price: number, now = new Date()): 0 | 1 {
  return !isFreeShippingPromo(now) && price >= FREE_SHIPPING_THRESHOLD ? 1 : 0;
}

/**
 * Les tarifs en vigueur à l'instant `now` : pendant la promo, un seul, offert
 * sans seuil. À lire avec le même `now` que `shippingDetailsIndexFor`.
 */
export function offerShippingDetails(now = new Date()): readonly object[] {
  if (!isFreeShippingPromo(now)) return OFFER_SHIPPING_DETAILS;
  return [
    {
      "@type": "OfferShippingDetails",
      shippingDestination: SHIPPING_DESTINATION,
      shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "EUR" },
      deliveryTime: DELIVERY_TIME,
    },
  ];
}
