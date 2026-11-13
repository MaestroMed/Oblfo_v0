# Tests Obflo

Un test = une variable. Format : hypothèse, mise en place, mesure, résultat, décision.
Tant que le trafic est trop faible (moins de 1 000 visites par variante), on note la mesure avant/après
sans conclure.

## 1. Mots-clés dans le H1 de l'accueil (lancé le 13/11/2026)

- **Hypothèse** : un H1 avec « gants, gilets et plaids chauffants USB » aide l'accueil à ressortir sur
  ces recherches. Avant : « On vous réchauffe. » (aucun mot-clé).
- **Mise en place** : H1 = ligne de mots-clés, la phrase de marque reste en grand dessous (4 langues).
- **Mesure** : Search Console, page d'accueil, impressions et position moyenne sur « gants chauffants »,
  « gilet chauffant », « plaid chauffant », 28 jours avant / 28 jours après.
- **Résultat** : à relever le 11/12/2026.

## 2. Accueil en mouvement (lancé le 13/11/2026)

- **Hypothèse** : produits flottants sur la photo + bandeau défilant augmentent les clics vers les fiches.
- **Mise en place** : gilet et plaid sur la photo, bandeau de tout le catalogue, apparitions au défilement.
- **Mesure** : GA4, part des visites de l'accueil qui ouvrent une fiche produit, 14 jours avant / après.
  Vitesse inchangée vérifiée : LCP 1,93 s (médiane, mobile 4G lente simulée), 653 Ko.
- **Point ouvert** : le brief UX déconseille le défilement automatique sur mobile. Si le taux de clic
  ne monte pas, tester la version glissable au doigt sans défilement automatique.

## 3. Pub vidéo gilet et plaid (à lancer, attend les comptes Meta de Mehdi)

- **Hypothèse** : la démonstration « pourquoi il est à 64,90 € : il se branche sur ta batterie »
  vend mieux que l'angle prix seul.
- **Mise en place** : 2 vidéos par produit, 10-15 €/jour, même audience.
- **Règle d'arrêt** : 25 € dépensés sans vente, ou CTR < 1 % après 500 impressions → coupée.
