// Correspondance article Obflo → variante CJ.
// Clé : `id` pour un produit sans variante, `${id}|${variant}` sinon.
// Un produit absent d'ici est « non relié » : sa commande se saisit à la main.
// Variantes et lignes relevées sur les fiches CJ les 10 et 13/11/2026 : chaque ligne existe vers FR, DE, ES et PT.
// Seul le tapis pour animaux reste hors pont (indisponible à la vente).
export const CJ_MAP: Record<string, { sku: string; logistic: string }> = {
  "gants-chauffants": { sku: "CJYD214762501AZ", logistic: "CJPacket Euro Sensitive" }, // noir, câble USB
  "chaussons-chauffants": { sku: "CJJJJTJT36087-Pink-USB", logistic: "CJPacket Ordinary I" }, // rose
  "chauffage-appoint": { sku: "CJJJJTJT01122-Blue-EU", logistic: "CJPacket Ordinary I" }, // turquoise, prise EU
  "chaussettes-chauffantes": { sku: "CJYD219617201AZ", logistic: "CJPacket Euro Sensitive" }, // rouge
  "ceinture-lombaire-chauffante": { sku: "CJJT166461902BY", logistic: "CJPacket Euro Sensitive" }, // blanc, sangle orange
  "bonnet-chauffant": { sku: "CJYD182570501AZ", logistic: "CJPacket Ordinary I" }, // blanc
  "gilet-chauffant|S": { sku: "CJYR179753201AZ", logistic: "CJPacket Euro Sensitive" }, // gilet 15 zones noir, une référence par taille
  "gilet-chauffant|M": { sku: "CJYR179753202BY", logistic: "CJPacket Euro Sensitive" },
  "gilet-chauffant|L": { sku: "CJYR179753203CX", logistic: "CJPacket Euro Sensitive" },
  "gilet-chauffant|XL": { sku: "CJYR179753204DW", logistic: "CJPacket Euro Sensitive" },
  "gilet-chauffant|2XL": { sku: "CJYR179753205EV", logistic: "CJPacket Euro Sensitive" },
  "gilet-chauffant|3XL": { sku: "CJYR179753206FU", logistic: "CJPacket Euro Sensitive" },
  "plaid-chauffant": { sku: "CJJT130967303CX", logistic: "CJPacket Euro Sensitive" }, // gris, USB sans batterie
  "coussin-chauffant": { sku: "CJQCQCQC02253-Beige-USB", logistic: "CJPacket Euro Sensitive" }, // beige
  "chauffe-mains": { sku: "CJJT131810506FU", logistic: "CJPacket Pure Electricity" }, // blanc, oreilles bleues ; batterie intégrée : seule ligne possible, 12-25 j vers l'Allemagne
  "semelles-chauffantes|EU 35–40": { sku: "CJNSFJWZ00204-35to40-USB-Full foot heat", logistic: "CJPacket Euro Sensitive" },
  "semelles-chauffantes|EU 41–46": { sku: "CJNSFJWZ00204-41to46-USB-Full foot heat", logistic: "CJPacket Euro Sensitive" },
  "sous-main-chauffant": { sku: "CJJJJTJT22751-Pink push pull switch", logistic: "CJPacket Ordinary I" }, // rose, 220 V
  "mini-chauffe-tasse": { sku: "CJMP114652201AZ", logistic: "CJPacket Euro Sensitive" }, // noir
  "echarpe-chauffante": { sku: "CJYD215515201AZ", logistic: "CJPacket Ordinary I" }, // gris
};
