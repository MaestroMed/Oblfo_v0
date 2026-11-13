// Auto-contrôle : npx tsx src/lib/stock.check.ts
import assert from "node:assert/strict";
import { defaultStock, unitsOf } from "./stock";

const d = defaultStock();
assert.equal(d["gilet-chauffant"], 10); // 64,90 €
assert.equal(d["plaid-chauffant"], 10); // 74,90 €
assert.equal(d["chaussettes-chauffantes"], 20); // 39,90 €
const u = unitsOf([{ id: "pack-maison-chaude", qty: 2 }, { id: "chaussons-chauffants", qty: 1 }]);
assert.equal(u["chaussons-chauffants"], 3);
assert.equal(u["chauffage-appoint"], 2);
console.log("stock ok");
