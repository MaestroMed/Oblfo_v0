# OBFLO°

Boutique e-commerce d'objets chauffants (gants, chaussons, chauffe-tasse, chauffage d'appoint). Cible : SEO massive scale international, dropshipping automatisé via CJDropshipping, pilotée à terme par une app de gestion de boutique externe.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4
- pnpm
- Déploiement Vercel (seule `main` déclenche un build — cf. `vercel.json`)

## Développement

```bash
pnpm install
pnpm dev
```

## Structure

- `src/app` — layout (fonts, metadata SEO) et pages
- `src/components` — sections de la homepage + primitives (panier, slots photo)
- `src/data/catalog.ts` — catalogue statique v0 (produits, packs, FAQ, avis) ; sera alimenté par l'app de pilotage
- `design/` — export du design de référence (`OBFLO Homepage.dc.html`)

## Direction artistique

Thème sombre « chaleur dans la nuit » : fond `#0A0C10`, accent orange `#FF6A2B`, bleu froid `#8FC1E3`, typo Space Grotesk + IBM Plex Mono. Les visuels produits sont des emplacements (`ImageSlot`) en attente des photos définitives.
