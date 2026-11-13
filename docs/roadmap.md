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

## Phase 2 : système de design

| Point du brief | Aujourd'hui | À faire |
|---|---|---|
| 5 couleurs maximum | 14 | 5 couleurs de base, teintes de tuiles dérivées |
| 1 arrondi | 10 valeurs | 1 valeur pour les blocs, pilule pour les boutons |
| 3 tailles de texte, grille 8 px | 14 tailles | échelle titre / texte / légende |
| Mode sombre selon le système | absent | thème sombre |

Note : le brief demande « max 2 familles » (performance) puis « 1 famille » (design). Le site en a 2 (Fredoka, Figtree).

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
