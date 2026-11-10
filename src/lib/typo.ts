// Typographie française : espace insécable avant « : ; ? ! » et à l'intérieur des guillemets,
// pour qu'une ponctuation ne se retrouve jamais seule en début de ligne.
const NBSP = " ";

export function frTypo(s: string): string {
  return s.replace(/ ([:;?!»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);
}

/** Applique frTypo à toutes les chaînes d'une valeur (tableaux et objets compris). */
export function frTypoDeep<T>(value: T): T {
  if (typeof value === "string") return frTypo(value) as T;
  if (Array.isArray(value)) return value.map(frTypoDeep) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, frTypoDeep(v)])) as T;
  }
  return value;
}
