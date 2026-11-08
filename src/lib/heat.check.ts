// Auto-contrôle : npx tsx src/lib/heat.check.ts
import assert from "node:assert/strict";
import { heatProofs } from "./heat";

const gants = heatProofs([
  { label: "Niveaux de chauffe", value: "3 (éco / confort / boost)" },
  { label: "Temps de chauffe", value: "≈ 30 secondes" },
]);
assert.deepEqual(gants, [
  { kind: "levels", value: 3 },
  { kind: "seconds", value: 30 },
]);

const plaid = heatProofs([{ label: "Stufen", value: "3 (≈ 40–60 °C)" }]);
assert.deepEqual(plaid, [
  { kind: "temp", value: 60 },
  { kind: "levels", value: 3 },
]);

const tasse = heatProofs([{ label: "Holding temperature", value: "≈ 55°C" }]);
assert.deepEqual(tasse, [{ kind: "temp", value: 55 }]);

assert.deepEqual(heatProofs([{ label: "Niveaux de chauffe", value: "Plusieurs niveaux (≈ 40–55 °C)" }]), [
  { kind: "temp", value: 55 },
]);
console.log("heat ok");
