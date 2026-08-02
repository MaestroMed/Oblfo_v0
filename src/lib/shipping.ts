// Règles de livraison — partagées entre l'API checkout (serveur) et le panier (client).
export const FREE_SHIPPING_THRESHOLD = 60;
export const STANDARD_SHIPPING = 4.9;

export function shippingCostFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

// ── Schema.org ───────────────────────────────────────────────────────────────
// La Search Console signalait « hasMerchantReturnPolicy manquant » et
// « shippingDetails manquant » sur les 10 produits (rapport Fiches de marchand).
// Sans ces champs, Google n'affiche ni le délai de livraison ni la politique de
// retour dans la SERP — deux arguments que la fiche produit met pourtant en avant.
//
// Les valeurs viennent des constantes ci-dessus et de ce qui est affiché sur le
// site (retours 30 jours, livraison 3–5 jours ouvrés) : rien n'est inventé.

export const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "FR",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  // `returnFees` volontairement absent : qui paie le retour n'est précisé nulle
  // part sur le site. Mieux vaut l'omettre que de déclarer une valeur fausse,
  // qui engagerait commercialement.
} as const;

const DELIVERY_TIME = {
  "@type": "ShippingDeliveryTime",
  handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "d" },
  transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 5, unitCode: "d" },
} as const;

const SHIPPING_DESTINATION = {
  "@type": "DefinedRegion",
  addressCountry: "FR",
} as const;

/**
 * Deux tarifs déclarés, comme sur le site : le tarif standard, et la gratuité
 * au-delà du seuil (exprimée par `eligibleTransactionVolume`).
 */
export const OFFER_SHIPPING_DETAILS = [
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
