# OBFLO°

Boutique e-commerce d'objets chauffants (gants, chaussons, chauffe-tasse, chauffage d'appoint). Cible : SEO massive scale international, dropshipping automatisé via CJDropshipping, pilotée à terme par une app de gestion de boutique externe.

## Stack

- Next.js 16 (App Router, Turbopack, `proxy.ts`) + React 19 + TypeScript
- next-intl v4 (routage i18n, chemins localisés)
- Stripe Checkout (activé via variables d'env)
- Tailwind CSS v4
- pnpm
- Déploiement Vercel (seule `main` déclenche un build — cf. `vercel.json`)

## Domaines

- **obflo.com** = domaine canonique (défini dans `src/lib/site.ts`, surchargeable via `NEXT_PUBLIC_SITE_URL`)
- **obflo.fr** = à configurer en redirection 301 vers obflo.com (côté Vercel/DNS)

## Structure d'URL internationale (FIGÉE)

Préfixe locale systématique + chemins et slugs localisés. `/` négocie et redirige vers `/fr` ou `/en`.

| Interne | FR | EN |
|---|---|---|
| `/` | `/fr` | `/en` |
| `/produits/[slug]` | `/fr/produits/gants-chauffants` | `/en/products/heated-gloves` |
| `/livraison-retours` | `/fr/livraison-retours` | `/en/shipping-returns` |
| `/cgv` | `/fr/cgv` | `/en/terms-of-sale` |
| `/confidentialite` | `/fr/confidentialite` | `/en/privacy` |
| `/mentions-legales` | `/fr/mentions-legales` | `/en/legal-notice` |
| `/merci` | `/fr/merci` | `/en/thank-you` |

- Ajout d'une locale : `src/i18n/routing.ts` (locales + pathnames), `messages/<locale>.json`, champs localisés dans `src/data/catalog.ts`.
- hreflang croisés + `x-default` (fr) sur toutes les pages indexables et dans le sitemap.
- Les **ids** produits/packs (panier, checkout, future app de pilotage) sont stables et indépendants de la langue ; seuls les **slugs** d'URL sont localisés.

## Paiement (Stripe)

- `POST /api/checkout` crée une session Stripe Checkout — les prix sont revalidés côté serveur depuis le catalogue, jamais pris du client.
- Livraison : offerte dès 60 €, sinon 4,90 € (3–5 j ouvrés).
- Sans `STRIPE_SECRET_KEY`, l'API répond 503 et le panier affiche « paiement en cours d'activation ».
- Webhook `POST /api/webhooks/stripe` (signature vérifiée) — point de branchement futur pour la transmission des commandes à CJDropshipping / l'app de pilotage.
- Variables : voir `.env.example`.

## Développement

```bash
pnpm install
pnpm dev
```

## Structure

- `src/app/[locale]` — pages (homepage, produits, infos/légal, merci, 404)
- `src/app/api` — checkout Stripe + webhook
- `src/i18n` — routing (structure d'URL), navigation typée, request config
- `src/proxy.ts` — middleware next-intl (négociation + réécriture des locales)
- `messages/fr.json`, `messages/en.json` — tout le copy UI
- `src/components` — sections + primitives (panier, slots photo, switcher de langue)
- `src/data/catalog.ts` — catalogue bilingue v0 (produits, packs, FAQ, avis) ; sera alimenté par l'app de pilotage
- `design/` — export du design de référence (`OBFLO Homepage.dc.html`)

## Direction artistique

Thème sombre « chaleur dans la nuit » : fond `#0A0C10`, accent orange `#FF6A2B`, bleu froid `#8FC1E3`, typo Space Grotesk + IBM Plex Mono. Les visuels produits sont des emplacements (`ImageSlot`) dont les libellés servent de briefs de shooting — produits à sourcer sur CJDropshipping/AliExpress puis shootings via Higgsfield.

## Avant mise en ligne

- Compléter les marqueurs `[À COMPLÉTER]` des pages légales (entité juridique, e-mails, prestataire de paiement).
- Renseigner `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` sur Vercel.
- Configurer obflo.fr → 301 obflo.com.
