// Auto-contrôle : npx tsx src/lib/cj.check.ts
import assert from "node:assert/strict";
import { buildCjOrders, type PaidOrder } from "./cj";

const base: PaidOrder = {
  sessionId: "cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6a7B8c9",
  email: "client@example.com",
  phone: "+33612345678",
  customerName: "Camille Martin",
  shippingName: "Camille Martin",
  shippingAddress: {
    line1: "12 rue des Lilas",
    line2: null,
    city: "Lyon",
    postal_code: "69003",
    state: "",
    country: "FR",
  },
  items: [],
};
const build = (patch: Partial<PaidOrder>) => buildCjOrders({ ...base, ...patch });
const orders = (patch: Partial<PaidOrder>) => {
  const built = build(patch);
  assert.ok(built.ok, built.ok ? "" : built.reason);
  return built.orders;
};
const reason = (patch: Partial<PaidOrder>) => {
  const built = build(patch);
  assert.ok(!built.ok);
  return built.reason;
};

// Produit simple, et state vide → province = ville.
const [simple, ...rest] = orders({ items: [{ id: "gants-chauffants", qty: 2 }] });
assert.equal(rest.length, 0);
assert.deepEqual(simple, {
  orderNumber: `obflo-${base.sessionId.slice(-38)}-1`,
  shippingCountryCode: "FR",
  shippingCountry: "France",
  shippingProvince: "Lyon",
  shippingCity: "Lyon",
  shippingCustomerName: "Camille Martin",
  shippingAddress: "12 rue des Lilas",
  shippingZip: "69003",
  shippingPhone: "+33612345678",
  email: "client@example.com",
  logisticName: "CJPacket Euro Sensitive",
  fromCountryCode: "CN",
  payType: 3,
  products: [{ sku: "CJYD214762501AZ", quantity: 2 }],
  remark: `Stripe ${base.sessionId}`,
});

// state renseigné → il passe tel quel.
const [withState] = orders({
  items: [{ id: "gants-chauffants", qty: 1 }],
  shippingAddress: { ...base.shippingAddress!, state: "Rhône" },
});
assert.equal(withState.shippingProvince, "Rhône");

// Pack développé, quantités fusionnées avec la même référence achetée à l'unité.
const [pack, ...packRest] = orders({
  items: [
    { id: "pack-maison-chaude", qty: 2 },
    { id: "chaussons-chauffants", qty: 1 },
  ],
});
assert.equal(packRest.length, 0);
assert.deepEqual(pack.products, [
  { sku: "CJJJJTJT36087-Pink-USB", quantity: 3 },
  { sku: "CJJJJTJT01122-Blue-EU", quantity: 2 },
]);

// Deux lignes de transport → deux commandes, ordre stable quel que soit le panier.
const two = orders({
  items: [
    { id: "bonnet-chauffant", qty: 1 },
    { id: "gants-chauffants", qty: 1 },
  ],
});
assert.deepEqual(
  two.map((o) => o.logisticName),
  ["CJPacket Euro Sensitive", "CJPacket Ordinary I"],
);
assert.notEqual(two[0].orderNumber, two[1].orderNumber);
for (const o of [simple, withState, pack, ...two]) {
  assert.ok(o.orderNumber.length <= 50, o.orderNumber);
  assert.equal(o.payType, 3);
}

// Un seul article non relié → refus entier, aucune commande partielle.
assert.match(reason({ items: [{ id: "pack-sortie-hiver", qty: 1 }] }), /mini-chauffe-tasse/);

// La variante d'un pack ne va qu'à son produit à variantes.
const exterieur = reason({ items: [{ id: "pack-exterieur", qty: 1, variant: "EU 35–40" }] });
assert.match(exterieur, /semelles-chauffantes\|EU 35–40, chauffe-mains$/);
assert.doesNotMatch(exterieur, /gants-chauffants/);

// Pays ≠ FR, adresse incomplète, panier vide → refus.
assert.match(
  reason({
    items: [{ id: "gants-chauffants", qty: 1 }],
    shippingAddress: { ...base.shippingAddress!, country: "BE" },
  }),
  /BE/,
);
assert.match(reason({ items: [{ id: "gants-chauffants", qty: 1 }], shippingAddress: null }), /pays/);
assert.match(
  reason({
    items: [{ id: "gants-chauffants", qty: 1 }],
    shippingAddress: { ...base.shippingAddress!, postal_code: null },
  }),
  /incomplète/,
);
assert.match(reason({ items: [] }), /aucun article/);

// E-mail trop long pour CJ et téléphone inconnu → champs omis.
const [bare] = orders({
  items: [{ id: "gants-chauffants", qty: 1 }],
  email: `${"a".repeat(45)}@example.com`,
  phone: null,
});
assert.ok(!("email" in bare) && !("shippingPhone" in bare));

console.log("cj ok");
