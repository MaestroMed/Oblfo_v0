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
- Webhook `POST /api/webhooks/stripe` (signature vérifiée) : sur `checkout.session.completed`, la commande est normalisée (session, items+variantes, montants, adresse, e-mail) puis POSTée à `ORDERS_WEBHOOK_URL` avec `x-idempotency-key` = id de session ; échec de transmission ⇒ 500 ⇒ Stripe réessaie. Trace `[obflo:order]` systématique dans les logs.
- Produits à déclinaison (taille, pointure) : la variante est obligatoire au checkout (`400 invalid_variant` sinon) et voyage dans la metadata `obflo_items`.
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

- Entité : Opcodia LLC (Nouveau-Mexique, USA) — renseignée dans mentions légales et CGV. Restent `[À COMPLÉTER]` : e-mails (contact, SAV, RGPD), TVA/IOSS, médiateur de la consommation.
- Renseigner `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` sur Vercel, et activer les reçus e-mail dans le dashboard Stripe (Settings → Customer emails).
- `NEWSLETTER_WEBHOOK_URL` pour activer l'inscription newsletter (sinon le formulaire affiche « ouverture bientôt »).
- `ORDERS_WEBHOOK_URL` pour transmettre les commandes payées à l'app de pilotage / l'automatisation CJ (sinon : trace logs uniquement — à configurer avant tout volume réel).
- Configurer obflo.fr → 301 obflo.com.
- Flux Google Merchant Center prêts : `/api/merchant-feed/fr|en|de|es` (RSS g:, une entrée par variante avec `item_group_id`). À déclarer dans Merchant Center une fois le paiement actif.
- IndexNow (Bing/Copilot) : clé servie à la racine, `POST /api/indexnow` soumet les 124 URLs du sitemap — à appeler après chaque déploiement significatif (`INDEXNOW_SUBMIT_SECRET` optionnel pour verrouiller).
- Section avis clients désactivée (aucun vrai avis — L121-4 C. conso). Réactiver `<Avis />` dans `src/app/[locale]/page.tsx` avec de vraies données.
- Rupture de stock : passer `available: false` sur le produit/pack dans `src/data/catalog.ts` (bouton grisé + refus au checkout).
- Compte client : volontairement absent à ce stade — exige une base de données + un fournisseur d'auth, décisions qui appartiennent à l'app de pilotage à venir. Le tunnel invité (Stripe Checkout + reçus e-mail + webhook commandes) couvre le lancement.
