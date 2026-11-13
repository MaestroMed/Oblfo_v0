// Auto-contrôle : npx tsx src/lib/product-faq.check.ts
import assert from "node:assert/strict";
import { getProducts } from "@/data/catalog";
import { productFaq } from "./product-faq";

for (const locale of ["fr", "en", "de", "es"] as const) {
  for (const p of getProducts(locale)) {
    const faq = productFaq(p.specs, (k) => k);
    assert.ok(faq.length >= 5 && faq.length <= 8, `${locale} ${p.id} : ${faq.length} questions`);
    assert.equal(new Set(faq.map((f) => f.question)).size, faq.length, `${locale} ${p.id} : question en double`);
  }
}
console.log("faq ok");
