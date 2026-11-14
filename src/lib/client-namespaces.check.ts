// Vérifie que chaque espace lu par useTranslations dans le code est bien transmis au navigateur (layout : CLIENT_NAMESPACES).
// Usage : npx tsx src/lib/client-namespaces.check.ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "src");
const layout = readFileSync(join(root, "app/[locale]/layout.tsx"), "utf8");
const block = layout.slice(layout.indexOf("CLIENT_NAMESPACES = ["), layout.indexOf("] as const"));
const sent = new Set([...block.matchAll(/"([A-Za-z0-9]+)"/g)].map((m) => m[1]));
const missing = new Set<string>();
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(name)) {
      for (const m of readFileSync(p, "utf8").matchAll(/useTranslations\(\s*"([A-Za-z0-9]+)"\s*\)/g)) {
        if (!sent.has(m[1])) missing.add(`${m[1]} (${p})`);
      }
    }
  }
};
walk(root);
if (missing.size) {
  console.error("Espaces de textes absents de CLIENT_NAMESPACES :", [...missing]);
  process.exit(1);
}
console.log("ok :", sent.size, "espaces transmis, tous les useTranslations couverts");
