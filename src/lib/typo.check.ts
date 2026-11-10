// Auto-contrôle : npx tsx src/lib/typo.check.ts
import assert from "node:assert/strict";
import { frTypo, frTypoDeep } from "./typo";

const N = " ";
assert.equal(frTypo("Gants chauffants : autonomie réelle ?"), `Gants chauffants${N}: autonomie réelle${N}?`);
assert.equal(frTypo("le mode « boost » ; et après !"), `le mode «${N}boost${N}»${N}; et après${N}!`);
// Rien à toucher : slug, URL, heure, texte déjà corrigé.
for (const s of ["gants-chauffants", "https://www.obflo.com/fr", "12:30", `déjà${N}: fait`]) assert.equal(frTypo(s), s);
assert.deepEqual(frTypoDeep({ a: ["x ?", 3], b: { c: "y :" }, d: undefined }), { a: [`x${N}?`, 3], b: { c: `y${N}:` }, d: undefined });
console.log("typo ok");
