import { getProducts } from "@/data/catalog";
import { packSources } from "@/data/catalog-packs";
import { readJson, storeReady, writeJson } from "@/lib/store";

const PATH = "obflo/stock.json";

/** Stock réservé chez le fournisseur, par produit : il baisse à chaque vente payée. */
export type Stock = Record<string, number>;

/** Valeurs de départ demandées par Mehdi le 13/11 : 20 par produit, 10 pour les plus chers (60 € et plus). */
export function defaultStock(): Stock {
  return Object.fromEntries(getProducts("fr").map((p) => [p.id, p.price >= 60 ? 10 : 20]));
}

/** null tant que le stockage n'est pas branché : rien n'est affiché, rien n'est bloqué. */
export async function readStock(): Promise<Stock | null> {
  if (!storeReady()) return null;
  // Rien d'enregistré encore : on part des valeurs de départ ; la première vente les écrit.
  const saved = await readJson<Stock>(PATH);
  return { ...defaultStock(), ...saved };
}

export const writeStock = (stock: Stock) => writeJson(PATH, stock);

/** Quantités par produit d'un panier, packs développés en leurs produits. */
export function unitsOf(lines: { id: string; qty: number }[]): Record<string, number> {
  const units: Record<string, number> = {};
  for (const line of lines) {
    const pack = packSources.find((p) => p.id === line.id);
    for (const id of pack ? pack.items : [line.id]) units[id] = (units[id] ?? 0) + line.qty;
  }
  return units;
}

// shortcut: lecture puis écriture sans verrou, deux ventes à la même seconde peuvent perdre un décompte ; passer à un stockage atomique (Redis) si le volume monte.
export async function decrementStock(lines: { id: string; qty: number }[]): Promise<Stock | null> {
  const stock = await readStock();
  if (!stock) return null;
  for (const [id, qty] of Object.entries(unitsOf(lines))) {
    if (id in stock) stock[id] = Math.max(0, stock[id] - qty);
  }
  await writeStock(stock);
  return stock;
}
