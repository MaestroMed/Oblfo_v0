# OBFLO — plan pub Black Friday 2026 (350 €)

Rédigé le 08/11/2026. Black Friday 27/11, Cyber Monday 30/11.

## 0. Bloquants avant le moindre euro

| # | Quoi | Qui | Pourquoi |
|---|------|-----|----------|
| 1 | ~~`STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` dans Vercel (Production), puis redeploy~~ clé secrète restreinte (sans sortie de fonds) + secret du webhook réel posés le 10/11 | Mehdi | reste la commande réelle de contrôle (ligne 5) |
| 2 | Compte **Merchant Center** au nom d'Opcodia LLC + flux `https://www.obflo.com/api/merchant-feed/fr` | Mehdi | aucun compte n'existe sur le login Google actuel |
| 3 | Compte **Google Ads** neuf pour Obflo (l'actuel est « Numelite », désactivé, paiement refusé) | Mehdi | ne pas mélanger les entités ni hériter d'un compte suspendu |
| 4 | Lier GA4 ↔ Google Ads, importer la conversion GA4 `purchase` comme conversion principale | Mehdi (Claude guide) | le site envoie `purchase` + `add_to_cart` depuis le 08/11 |
| 5 | Une vraie commande test (petit montant, remboursée) | Mehdi | vérifier /merci + l'événement dans GA4 Temps réel |

Les commandes arrivent seulement dans les logs Vercel (`[obflo:order]`) et dans Stripe : `ORDERS_WEBHOOK_URL` est vide, donc **chaque commande CJ se passe à la main**.

## 1. Canaux : la réponse

| Canal | Budget | Verdict |
|-------|--------|---------|
| Google fiches gratuites (Merchant Center) | 0 € | **Oui, tout de suite.** Le délai d'approbation est le vrai risque |
| Google Shopping standard | **230 €** | **Canal n°1.** Les gens cherchent déjà « plaid chauffant sans fil », « semelles chauffantes » |
| Meta (Instagram Reels + Facebook) | **120 €** | **Canal n°2.** Une campagne, vidéos Higgsfield, puis relance des visiteurs avant le Cyber Monday |
| TikTok payant | 0 € | **Non.** Minimum officiel 50 $/jour par campagne : le budget part en 4 jours |
| TikTok / Reels organiques | 0 € | **Oui.** Les mêmes vidéos, postées tous les jours |
| Performance Max | 0 € | **Non.** Sans historique de conversions, il brûle 350 € en apprentissage |

Avec 350 € et un site neuf sans avis, on vise **5 à 10 ventes** et surtout **des données** : quels produits cliquent, quelles pages convertissent. Ce n'est pas un budget de rentabilité.

## 2. Google Shopping : la campagne

- **Type** : Shopping standard, pays France, langue français, flux `fr`.
- **Dates** : du jour de l'approbation Merchant au 30/11.
- **Budget** : 10 €/jour jusqu'au 23/11, puis **15 €/jour du 24 au 30/11**.
- **Enchères** : CPC manuel, 0,35 € au départ. Clic à plus de 0,60 € sans vente = baisser.
- **Groupes de produits** (une enchère par groupe) :

| Groupe | Produits | Enchère | Raison |
|--------|----------|---------|--------|
| A — preuve GSC | plaid chauffant, semelles chauffantes, sous-main chauffant | 0,40 € | déjà des impressions organiques |
| B — saison | gants, chauffe-mains, chauffage 250 W, chaussons | 0,35 € | gros volume en novembre |
| C — panier haut | coussin 74 €, packs jusqu'à 164 € | 0,45 € | une vente rembourse beaucoup de clics |
| D — reste | tout le reste | 0,20 € | collecter des données à petit prix |

- **Mots-clés exclus** (niveau campagne) : `gratuit`, `occasion`, `leboncoin`, `notice`, `mode d'emploi`, `avis`, `pile`, `réparation`, `pièce détachée`, `decathlon`, `amazon`, `lidl`, `action`, `moto`, `ski` (gants), `radiateur bain d'huile`, `chauffage gaz`, `poêle`, `climatisation`.
- **Revue** tous les 2 jours, onglet Termes de recherche → exclure ce qui n'a rien à voir.

## 3. Meta : la campagne

- **Objectif** : Ventes, optimisé sur `add_to_cart` la première semaine (trop peu d'achats pour optimiser l'achat), puis `purchase` s'il y en a plus de 10.
- ⚠️ Le pixel Meta n'est pas encore sur le site. À ajouter (même consentement que GA4) une fois le compte Business Manager créé par Mehdi : ~20 lignes de code.
- **Phase 1, du 14 au 24/11, 6 €/jour ≈ 66 €** : France, 25-65 ans, ciblage large (Advantage+ audience), placements Reels + Stories. 3 vidéos (voir §5).
- **Phase 2, du 25 au 30/11, 9 €/jour ≈ 54 €** : relance des visiteurs du site et des personnes ayant vu 50 % des vidéos, sur 30 jours. Message : pack, livraison offerte dès 60 €, retours 30 jours.

## 4. Textes d'annonce (Meta, FR)

1. « Tu chauffes toute la maison pour une personne assise à son bureau ? 250 W suffisent. » → mini chauffage
2. « Plaid chauffant sans fil : la chaleur sur le canapé, sans rallonge qui traverse le salon. » → plaid
3. « Les pieds gelés en télétravail, c'est fini. » → chaussons / sous-main
4. Black Friday : « Pack complet OBFLO : 12 € d'économie sur le lot. Livraison offerte dès 60 €. »

**Légal (prix barrés)** : aucun prix barré « Black Friday » sur un produit seul. Le site est trop récent pour avoir un prix de référence sur 30 jours (art. L112-1-1). Les **remises de pack** sont la seule promo sûre, c'est déjà ce qu'affiche la bannière.

## 5. Vidéos Higgsfield (9:16, 6 à 10 s)

Image-to-video à partir des visuels produits déjà en ligne. Pas de faux témoignages, pas de fausse personne qui « adore » le produit.

1. **Le froid qui recule** : bureau givré, le mini chauffage s'allume, le givre fond autour des pieds. Accroche texte : « 250 W. »
2. **Le canapé** : plaid posé, quelqu'un s'enroule dedans, la caméra recule et révèle qu'il n'y a pas de fil. Texte : « Sans rallonge. »
3. **Les mains au guidon** : vélo sous la pluie de novembre, gros plan sur les gants, buée. Texte : « 0 °C dehors. »
4. **Thermique** : passage en vue caméra thermique, les pieds passent du bleu au orange dans les chaussons. Format qui arrête le scroll.
5. **Le pack** : les produits tombent un par un dans une boîte, cadeau fermé. Texte : « Le cadeau qui sert tout l'hiver. »

Les vidéos 1, 2 et 4 vont en pub Meta. Les 5 sont postées en organique sur TikTok et Reels.

## 6. Search Console (28 jours au 06/11)

- 716 impressions, 11 clics, position moyenne 21.
- Requêtes avec de la demande : `plaid chauffant sans fil` (48 imp.), `beheizte schreibtischunterlage` (40), `heated desk mat` (27), `semelles chauffantes` (23).
- Le **sous-main chauffant** porte le site en EN et DE (5 + 1 clics) : à tester en Shopping Allemagne après Black Friday si la France marche.
- Indexation : 55 pages indexées. 64 « détectées, non indexées » : normal pour un domaine de 3 mois. 3 pages en 404 et 8 en noindex à vérifier (sans doute panier et merci).

## 7. Calendrier

| Date | Action |
|------|--------|
| 8–10/11 | Mehdi : clés Stripe, Merchant Center, Google Ads, commande test |
| 10–13/11 | Higgsfield : 5 vidéos ; organique dès qu'elles sont prêtes |
| dès approbation | Shopping 10 €/jour |
| 14/11 | Meta phase 1 |
| 24/11 | Shopping 15 €/jour |
| 25/11 | Meta phase 2 (relance) |
| 30/11 soir | tout coupé, bilan |
