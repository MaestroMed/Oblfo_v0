# OBFLO — direction artistique v3.1

Boutique d'accessoires chauffants. Le site doit **donner chaud** sans crier : la v3
(grands aplats rouges) a été jugée trop agressive. Même esprit (Fredoka/Figtree, crème,
chocolat, braise), mais dosé.

## Règle 60-30-10
- **60 % crème** : fond de page, en-tête, cartes (`cream`, `cream-2`, `paper`).
- **30 % teintes douces et chocolat** : tuiles produit, bandeaux, encarts (`miel`, `peche`,
  `sable`, `argile`), pied de page et bandeau d'annonce `choco`.
- **10 % braise** : boutons principaux (`.btn-braise`), prix de pack, logo, petits accents
  (ondes de chaleur, pastille du panier). **Jamais en fond de section.**

Un seul bloc `moutarde` par page au plus (accueil : les preuves de chaleur). `tomate` est réservé
aux messages d'erreur.

## Jetons (`src/app/globals.css`)
| Jeton | Hex | Usage |
|---|---|---|
| `cream` | #fcf1da | fond de page |
| `cream-2` | #f6e3bf | section alternée, encart doux |
| `paper` | #fffaf0 | carte claire, champ |
| `choco` | #3b160d | texte, boutons secondaires, blocs sombres |
| `choco-2` | #57200f | bandeau d'annonce, survol des boutons |
| `braise` | #c93d18 | action principale, accents |
| `braise-2` | #a9300f | survol du bouton braise |
| `miel` | #f8e1a8 | teinte douce |
| `peche` | #f7d2ba | teinte douce |
| `sable` | #efdcc4 | teinte douce |
| `argile` | #e9bda2 | teinte douce |
| `moutarde` | #f3c058 | accent jaune, à doser |
| `tomate` | #b3261e | erreur |
| `muted` | #7a5546 | texte secondaire, sur fond clair uniquement |

Kit : `.on-*` (aplat + texte assorti), `.tile` (bloc arrondi), `.btn` (chocolat) `.btn-braise`
`.btn-outline` `.btn-sm` `.btn-lg` `.btn-block`, `.price`, `.strike`, `.chip` `.chip-moutarde`,
`.field`, `.link`, `.prose-obflo`, `.cutout`, `<HeatWaves />` (braise par défaut).
Teinte d'un produit ou d'une famille : `src/lib/tile.ts`, la même sur tout le site.

## Photos
- **Produits = photos détourées sur teinte douce.** `product.cutout` avec la classe `.cutout`
  (ombre portée) sur la teinte du produit ; pas de dessin, pas d'image générée à la place du produit.
- **Habillage = photos réalistes plein cadre** dans `public/images/deco/` : `hero.webp` (4:3) et
  une par famille (`mains pieds corps maison bureau piece`, 3:2). Chemin par `deco(nom)`,
  `next/image` en `object-cover` dans un cadre arrondi (`.tile`), `alt=""` quand la légende dit
  déjà la scène.

## Règles
1. Aplats, jamais de dégradé, pas d'ombre floue sur les blocs : la seule ombre est celle des détourés.
2. Titres : hero `clamp(40px, 10.5vw, 76px)`, titre de section `clamp(28px, 5vw, 44px)`, carte
   20–24 px, texte 16–17 px, rien sous 14 px. Pas de capitales en titre courant.
3. Texte toujours `choco` sur les fonds clairs ; `muted` seulement sur fond clair ; jamais de texte
   moutarde ou braise en petit corps sur crème.
4. Mobile d'abord (320 → 1440). Gouttière 16 px mobile, 32 px bureau, largeur max 1240 px.
   Cibles tactiles ≥ 44 px.
5. Prix : `formatPrice(value, locale)`, chiffres tabulaires. **Aucun prix barré sur un produit
   seul** ; le barré (`.strike`) est réservé aux packs, avec « Achetés séparément ». Aucun faux
   avis, aucune urgence inventée.
6. Mouvement : ≤ 300 ms, `transform`/`opacity`/`background-color`, `prefers-reduced-motion` respecté.
7. Textes courts et concrets, vouvoiement en français. Toute chaîne visible passe par
   `messages/{fr,en,de,es}.json` ; le français porte ses espaces insécables.
