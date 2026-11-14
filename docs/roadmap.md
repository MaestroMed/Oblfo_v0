# Feuille de route : conformité aux briefs (relevé du 13/11/2026)

Mesures prises sur obflo.com (script `audit_brief.py`, Lighthouse mobile), sur 6 pages à 375, 768 et 1440 px.

## Déjà conforme

- 1 H1 par page, focus clavier visible partout, aucun débordement horizontal (y compris zoom 200 %).
- Mouvement réduit respecté, aucun script tiers avant consentement, paiement invité sur une page (Stripe).
- Images AVIF, polices auto-hébergées et préchargées, CLS 0 à 0,014, page d'accueil 653 Ko.
- Barre d'achat collante sur mobile avec `safe-area-inset`, un seul bouton d'achat sur la fiche.

## Phase 1 : sans attendre Mehdi (en ligne le 13/11, main 8c8017e)

Fait : 1.1 à 1.9, 1.11 à 1.13 (mesure après mise en ligne : 0 texte sous 16 px, 0 cible sous 48 px, 0 H3, 19 à 37 requêtes,
Lighthouse accessibilité 100, SEO 100). Reste : 1.10 (performance 90-91, LCP 2,4 s simulé, blocage 310-350 ms) et 1.14
(Stripe a refusé la session avec reprise + accord marketing : paiement en erreur 5 min, réglages retirés, cause à lire dans les journaux).
Aussi : descriptions produit sous 150 mots (59 à 92) à enrichir sans rien inventer.

| # | Point du brief | Mesuré | À faire |
|---|---|---|---|
| 1.1 | Texte ≥ 16 px | 9 à 49 textes plus petits par page | relever toutes les tailles sous 16 px |
| 1.2 | Cibles ≥ 48 px | 22 à 57 cibles plus petites par page | hauteur et largeur 48 px sur boutons, liens de menu et de pied de page |
| 1.3 | Étiquettes visibles | newsletter et « Pointure » sans étiquette visible | étiquettes visibles |
| 1.4 | Élément fixe et encoche | bandeau cookies sans `safe-area-inset` | marge d'encoche |
| 1.5 | Menu ordinateur ≤ 5 entrées | 9 entrées | 5 entrées, familles regroupées |
| 1.6 | Menu mobile plein écran au-delà de 4 entrées | à contrôler | plein écran |
| 1.7 | Pas de H3 visible | 10 à 20 par page | titres de carte en texte simple |
| 1.8 | Requêtes < 45 | 37 à 102 (préchargements de liens) | préchargement au survol seulement |
| 1.9 | CSS critique en ligne | fichier CSS séparé | CSS en ligne |
| 1.10 | LCP < 1,8 s, Lighthouse > 90 | 1,9 à 2,4 s, accueil 90 | gagner sur le blocage (350 ms) |
| 1.11 | Fiche : H1 produit + bénéfice | nom seul | nom + bénéfice |
| 1.12 | Fiche : FAQ 5-8 questions + schéma, liens vers 2-3 guides | à contrôler | compléter |
| 1.13 | Panier sans distraction, 1 seule suggestion | à contrôler | 1 suggestion |
| 1.14 | Relance des paniers abandonnés | absente | relance Stripe (accord de Mehdi du 13/11) |

## Phase 2 : système de design (branche claude/braise, 13/11, non mis en ligne)

Tout est dans `src/app/globals.css` ; les composants n'utilisent plus que les jetons.

| Point du brief | Avant | Fait |
|---|---|---|
| 5 couleurs maximum | 14 hex | 5 bases (`--base-braise` #c93d18, `--base-choco` #3b160d, `--base-moutarde` #f3c058, `--base-creme` #fcf1da, `--base-papier` #fffaf0) ; cream-2, choco-2, braise-2, tomate, miel, pêche, sable, argile, muted dérivées par `color-mix()` (écart ΔE < 2,5 sauf tomate, devenue un rouge braise foncé). Palette Tailwind par défaut retirée, 0 hex dans les composants |
| 1 arrondi | 10 valeurs | `--radius` 12 px (classe `rounded`) sur tuiles, boutons, pastilles, champs, cartes, vignettes, notification ; `rounded-full` seulement pour les cercles (boutons icône 48 px, pastilles d'icône, compteur du panier, langue, point de stock) |
| 2 ombres | 3 ombres ad hoc | `--shadow-elevated` (pastilles du héros, détourés via `drop-shadow`) et `--shadow-modal` (tiroir, bandeau cookies, notification) |
| 3 tailles de texte | 28 tailles | `text-display` clamp(32px, 7vw, 56px) pour H1, H2, gros chiffres et grand prix ; `text-body` 18 px ; `text-caption` 16 px. Interligne 1,2 pour la police de titre, 1,5 pour le texte. Tailles Tailwind par défaut retirées |
| Espacements 4/8/16/24/32/48/64 | 3, 5, 7, 10, 14, 20, 24… | grille seule ; sections `py-12 sm:py-16` ; décalages sous l'en-tête collant calculés (`below-header`, `anchor-below-header` = hauteur de l'en-tête + 24 / 16 px) |
| Mode sombre selon le système | absent | `@media (prefers-color-scheme: dark)`, `color-scheme: light dark`, sans JavaScript. Fond choco assombri, texte crème, tuiles sombres dérivées ; aplats chocolat/tomate/moutarde et tuiles des détourés gardent l'aspect clair (`.keep-light`) |

Contraste mesuré sur le rendu (9 pages, 390 et 1440 px, clair et sombre) : 0 paire texte/fond sous 4,5:1.
Plus faibles : 4,85 (papier sur braise, boutons et compteur), 5,21 (muted sur cream-2), 5,23 en sombre (prix braise-2 sur carte).

Reste :
- Familles de polices : le brief dit « max 2 familles » (performance) puis « 1 famille » (design). On garde 2 (Fredoka titres, Figtree texte), conforme au plafond performance ; passer à 1 famille est un choix de charte à trancher avec Mehdi.
- Le H1 de l'accueil reste en `text-caption` (accroche SEO en petites capitales, la phrase de marque en dessous est en `display`).
- La case des CGV (24 px) devient ronde avec l'arrondi unique de 12 px.
- Les logos de paiement gardent leur propre dessin (coins de 3 px dans le SVG) : ce sont des logos, pas des blocs.
- `docs/briefs.md` (« Écarts assumés ») dit encore que la charte garde plusieurs arrondis et pas de mode sombre : à mettre à jour.
- À mesurer après mise en ligne : Lighthouse et CLS (titres plus petits sur ordinateur : 56 px au lieu de 60 à 76 px).

## Phase 3 : attend une action de Mehdi

- Compte d'e-mail (Brevo recommandé) → 5 automatismes : bienvenue, panier abandonné, après achat, relance, lettre.
- Comptes Meta et TikTok → pixel et API de conversion, vidéos, publications.
- Commande d'1 gilet et d'1 plaid chez CJ → vraies vidéos de démonstration.
- Back-office et stock réservé (« plus que X en stock » qui baisse à chaque vente).
- Fidélité et parrainage : après les e-mails et les premiers clients.

## Écarts assumés

- Délai affiché : 8 à 20 jours (vrai délai), pas « 2-4 j ».
- Note /5 et avis : seulement avec de vrais avis clients.
- « Plus que X en stock » : seulement un stock réel qui baisse à chaque vente.

## LCP (14/11/2026, main b993e1a)

Allègement : catalogue complet retiré du JavaScript client (CatalogProvider léger), Sonner remplacé, textes client filtrés,
icônes compressées. JavaScript 237 → 193 Ko, HTML de l'accueil 47 → 43 Ko, icône 25 → 15 Ko. Lighthouse 98, accessibilité 100.

| Mesure de la photo d'accueil | Résultat |
|---|---|
| 4G normale, bridage réel (9 Mb/s, 85 ms) | 0,44 à 0,49 s ✅ |
| 4G lente, bridage réel (1,6 Mb/s, 150 ms) | 2,45 à 2,7 s |
| 4G lente simulée (score Lighthouse) | 2,26 s (avant : 2,56 à 2,76 s) |

Plancher restant : ~150 Ko de JavaScript du socle Next.js/React et 51 Ko de polices téléchargés en même temps que la photo.
Passer sous 1,8 s en 4G lente simulée demanderait de retirer React des pages (refonte) ou une seule police.
