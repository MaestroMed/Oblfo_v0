// Correspondance article Obflo → variante CJ.
// Clé : `id` pour un produit sans variante, `${id}|${variant}` sinon.
// Un produit absent d'ici est « non relié » : sa commande se saisit à la main.
// Variantes et lignes relevées sur les fiches CJ le 10/11/2026 (expédition vers FR).
export const CJ_MAP: Record<string, { sku: string; logistic: string }> = {
  "gants-chauffants": { sku: "CJYD214762501AZ", logistic: "CJPacket Euro Sensitive" }, // noir, câble USB
  "chaussons-chauffants": { sku: "CJJJJTJT36087-Pink-USB", logistic: "CJPacket Ordinary I" }, // rose
  "chauffage-appoint": { sku: "CJJJJTJT01122-Blue-EU", logistic: "CJPacket Ordinary I" }, // turquoise, prise EU
  "chaussettes-chauffantes": { sku: "CJYD219617201AZ", logistic: "CJPacket Euro Sensitive" }, // rouge
  "ceinture-lombaire-chauffante": { sku: "CJJT166461902BY", logistic: "CJPacket Euro Sensitive" }, // blanc, sangle orange
  "bonnet-chauffant": { sku: "CJYD182570501AZ", logistic: "CJPacket Ordinary I" }, // blanc
};
