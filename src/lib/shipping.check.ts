// Auto-contrôle : npx tsx src/lib/shipping.check.ts
import assert from "node:assert/strict";
import {
  FREE_SHIPPING_PROMO,
  STANDARD_SHIPPING,
  freeShippingPromoPhase,
  isFreeShippingPromo,
  offerShippingDetails,
  shippingCostFor,
  shippingDetailsIndexFor,
} from "./shipping";

// La fenêtre : du lundi 23/11/2026 00:00 au lundi 30/11/2026 23:59, heure de Paris.
const paris = (ms: number) => new Date(ms).toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
assert.equal(paris(FREE_SHIPPING_PROMO.start), "23/11/2026 00:00:00");
assert.equal(paris(FREE_SHIPPING_PROMO.end - 1000), "30/11/2026 23:59:59");

const at = (ms: number) => new Date(ms);
const { start, end } = FREE_SHIPPING_PROMO;

// Une seconde avant le début : payant sous 60 €.
assert.equal(isFreeShippingPromo(at(start - 1000)), false);
assert.equal(shippingCostFor(59.99, at(start - 1000)), STANDARD_SHIPPING);
// Au début : offert.
assert.equal(isFreeShippingPromo(at(start)), true);
assert.equal(shippingCostFor(0.01, at(start)), 0);
// Une seconde avant la fin : offert.
assert.equal(shippingCostFor(59.99, at(end - 1000)), 0);
// À la fin : payant de nouveau.
assert.equal(isFreeShippingPromo(at(end)), false);
assert.equal(shippingCostFor(59.99, at(end)), STANDARD_SHIPPING);
assert.deepEqual(
  [start - 1000, start, end - 1000, end].map((ms) => freeShippingPromoPhase(at(ms))),
  ["before", "during", "during", "after"],
);
// Hors fenêtre, dès 60 € reste offert.
assert.equal(shippingCostFor(60, at(start - 1000)), 0);
assert.equal(shippingCostFor(60, at(end)), 0);

// JSON-LD : l'index pointe toujours sur un tarif déclaré, au bon prix.
const rate = (price: number, now: Date) =>
  (offerShippingDetails(now)[shippingDetailsIndexFor(price, now)] as { shippingRate: { value: number } })
    .shippingRate.value;
for (const price of [44.9, 60, 89.9]) {
  for (const now of [at(start - 1000), at(start), at(end - 1000), at(end)]) {
    assert.equal(rate(price, now), shippingCostFor(price, now));
  }
}
// Pendant la promo, un seul tarif, sans seuil d'achat.
assert.equal(offerShippingDetails(at(start)).length, 1);
assert.ok(!("eligibleTransactionVolume" in offerShippingDetails(at(start))[0]));

console.log("shipping ok");
