# Briefs de travail Obflo (reçus de Mehdi le 13/11/2026)

Deux briefs : **Growth e-commerce** et **UX/UI & performance**. Ils fixent la boucle de travail :
**auditer → prioriser → exécuter → mesurer → itérer**, une variable à la fois, chaque décision justifiée
par un chiffre ou un test, chaque test noté dans `docs/experiments.md`.

## Cibles chiffrées

| Mesure | Cible |
|---|---|
| Taux de conversion | > 3 % (avant d'augmenter le trafic) |
| Panier moyen | > 80 € |
| Coût d'acquisition payant | < 30 € |
| ROAS | > 3 en payant, > 4 à 5 tous canaux |
| Part du CA par e-mail | > 25 % à 6 mois |
| Valeur client / coût d'acquisition | > 3 |
| Réachat à 90 jours | > 25 % |
| LCP mobile 4G | < 1,8 s |
| CLS | < 0,08 |
| INP | < 150 ms |
| Poids de page | < 900 Ko, < 45 requêtes |
| Lighthouse mobile | performance > 90, accessibilité > 95 |

## Ordre des chantiers (growth)

1. Conversion (CRO) avant de pousser le trafic.
2. E-mails : bienvenue (3 en 7 jours), panier abandonné (1 h et 24 h), après achat (J+1 merci, J+7 avis,
   J+30 vente croisée), relance des inactifs (J+60, J+90), 1 lettre par semaine au plus.
   Objet < 40 caractères, 1 bouton par e-mail.
3. Créations publicitaires : vidéo façon client filmé au téléphone, 15-30 s, accroche < 1,5 s,
   accroche → problème → démonstration → preuve → bouton, pas de logo au début.
   Couper une pub à CTR < 1 % après 500 impressions ou ROAS < 1,5 après 200 €.
4. SEO : H1 produit = produit + bénéfice, description 150 mots et plus, FAQ 5-8 questions,
   2 à 4 guides par mois orientés achat, maillage produit ↔ guide, données Product/FAQ/Breadcrumb.
5. TikTok / Reels : 3 à 5 vidéos par semaine, 15-30 s, réponse aux commentaires dans l'heure.
6. Fidélité et valeur client : packs, parrainage, demande d'avis 7 jours après livraison.

Règles : ROAS < 1,5 deux semaines de suite → pause ; ROAS > 3 une semaine → +20 % la semaine suivante ;
jamais plus de 500 €/jour sans validation.

## Règles UX / performance

- Mobile d'abord : bouton d'achat visible sans défiler (barre collante sur la fiche), cibles ≥ 48 px,
  champs avec étiquette visible et bon clavier, invité sans compte au paiement.
- Accueil : 1 message, 1 bouton principal, 1 image.
- Accessibilité WCAG 2.2 : focus visible, alt utiles, repères nav/main/header/footer, tout au clavier,
  contraste ≥ 4,5:1, texte ≥ 16 px.
- Images AVIF, dimensions fixées, lazy sauf l'image LCP ; au plus 4 scripts tiers, chacun justifié.
- Pas de `!important`, pas de `100vw`, `safe-area-inset` sur tout élément fixe.
- Avant chaque mise en ligne : LCP/CLS/INP, Lighthouse, clavier complet, 375/768/1440 px,
  mouvement réduit, zoom 200 %, parcours accueil → produit → panier → paiement → confirmation.

## Écarts assumés pour Obflo (et pourquoi)

- **Délais affichés** : le brief cite « Livraison 2-4 j ». Obflo livre en 8 à 20 jours : on affiche le vrai délai.
- **« Plus que X en stock »** : stock réservé chez le fournisseur, réglé dans le back-office (/admin) et qui baisse à chaque vente payée.
- **Avis** : aucun avis tant qu'il n'y a pas de vrais clients. Avis contre réduction : seulement avec
  mention visible de la contrepartie (décret 2017-1436) et sans tri des avis négatifs.
- **Promotion** : un prix barré seulement s'il correspond à un vrai prix antérieur ou à une somme réelle (packs).
- **Polices** : 2 familles (Fredoka, Figtree), plafond du brief côté performance ; la section design en demandait 1.
- **Bandeau défilant de l'accueil** : ajouté le 13/11 à la demande de Mehdi (« accueil trop statique »).
  Le brief déconseille le défilement automatique sur mobile : à trancher par un test (voir experiments.md).
