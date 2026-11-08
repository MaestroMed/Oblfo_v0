// Preuves de chaleur extraites des specs réelles de la fiche — jamais inventées.
// Toutes les langues : « °C », « niveaux / levels / Stufen / niveles », « s / secondes / Sekunden / segundos ».

export type HeatProof = { kind: "temp" | "levels" | "seconds"; value: number };

type Spec = { label: string; value: string };

export function heatProofs(specs: Spec[], highlights: string[] = []): HeatProof[] {
  const texts = [...specs.map((s) => `${s.label} ${s.value}`), ...highlights];
  const out: HeatProof[] = [];

  const temps = texts.flatMap((t) => [...t.matchAll(/(\d{2})\s*°\s*C/g)].map((m) => Number(m[1])));
  // Les plages « 40–60 °C » n'ont le °C qu'à la fin : on prend aussi le nombre juste après le tiret.
  for (const t of texts) for (const m of t.matchAll(/(\d{2})\s*[–-]\s*(\d{2})\s*°/g)) temps.push(Number(m[2]));
  if (temps.length) out.push({ kind: "temp", value: Math.max(...temps) });

  const levelSpec = specs.find((s) => /niveau|level|stufe|nivel/i.test(s.label));
  const levels = levelSpec?.value.match(/^\s*(\d)\b/);
  if (levels) out.push({ kind: "levels", value: Number(levels[1]) });

  for (const s of specs) {
    const m = s.value.match(/(\d{1,3})\s*(?:s\b|sec|seg|Sek)/i);
    if (m && /chauffe|heat|heiz|calenta/i.test(s.label)) {
      out.push({ kind: "seconds", value: Number(m[1]) });
      break;
    }
  }
  return out;
}
