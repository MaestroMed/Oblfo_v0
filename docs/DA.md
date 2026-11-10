# OBFLO — direction artistique v3 « color-blocking chaud »

Validée par Mehdi le 10/11/2026 sur maquette (référence : `conceptD.jpg`, voir le brief).
Boutique d'accessoires chauffants. Le site doit **donner chaud** et ressembler à une vraie
marque de grande consommation, pas à un gabarit généré.

## En une phrase
Page crème, **grands aplats saturés sans dégradé** (braise, tomate, moutarde, chocolat),
typo ronde très grasse, coins très arrondis, boutons pilule chocolat, prix en pastille,
produits **détourés** posés sur les aplats.

## Jetons (définis dans `src/app/globals.css`)
| Jeton | Hex | Usage |
|---|---|---|
| `cream` | #fcf1da | fond de page |
| `cream-2` | #f6e3bf | encart doux, fond de section alterné |
| `paper` | #fffaf0 | carte claire, champ de formulaire |
| `choco` | #3b160d | texte, boutons, blocs sombres |
| `choco-2` | #57200f | bandeau d'annonce, survol des boutons |
| `braise` | #eb3a0c | en-tête, hero, pastille prix |
| `tomate` | #d4281a | aplat rouge |
| `moutarde` | #f5b82e | aplat jaune, ondes de chaleur, accents |
| `brique` | #8c3a1c | aplat brun moyen |
| `muted` | #7a5546 | texte secondaire **sur fond clair uniquement** |

Classes Tailwind : `bg-braise`, `text-choco`, `border-choco/15`, etc.
Polices : `font-display` (Fredoka, titres, boutons, prix, étiquettes) et `font-sans`
(Figtree, texte courant). `h1 h2 h3` sont déjà en display 700 par défaut.

## Kit CSS (déjà écrit, à utiliser tel quel)
- Aplats : `.on-cream .on-cream-2 .on-paper .on-moutarde .on-braise .on-tomate .on-brique .on-choco`
  (fond + couleur de texte assortie).
- `.tile` : bloc arrondi (22 px mobile, 28 px bureau, overflow hidden, relative).
- `.btn` (pilule chocolat, 48 px) + `.btn-cream` `.btn-moutarde` `.btn-outline` `.btn-sm` (44 px)
  `.btn-lg` (56 px) `.btn-block`. Sur un aplat sombre (choco, braise, tomate, brique) : `.btn-cream`
  ou `.btn-moutarde`. Sur moutarde ou crème : `.btn`.
- `.price` (pastille braise) + `.price-moutarde` `.price-choco` `.price-lg` `.price-sm`.
  Sur aplat braise/tomate → `.price-moutarde`. Sur moutarde/crème → `.price`.
- `.strike` : prix barré, **packs seulement**, toujours accompagné de « Achetés séparément ».
- `.chip` + `.chip-moutarde` `.chip-cream` : étiquettes.
- `.field` : champs de formulaire. `.link` : lien de texte. `.prose-obflo` : texte long.
- `.cutout` : image détourée avec ombre portée. Les produits ont `product.cutout`
  (`/images/products/<id>/cutout.webp`, transparent) ; `product.image` reste le packshot carré
  sur fond crème. Un produit sans image n'a pas de détouré : prévoir le repli (`ImageSlot`).
- `<HeatWaves className="h-12 w-12" />` (`src/components/ui/heat-waves.tsx`) : le seul ornement.
  À doser : hero, une ou deux tuiles, pas partout.

## Règles
1. **Aplats, jamais de dégradé.** Pas d'ombre floue sur les blocs, pas de verre dépoli, pas de halo.
   La seule ombre : celle des détourés.
2. Le rythme vient des **changements de couleur de bloc**, pas de bordures fines. Bordure
   seulement pour un champ ou une séparation de liste (`border-choco/15`).
3. Contraste : texte crème sur `braise` uniquement en gras ≥ 18 px. Texte courant sur
   crème/paper/moutarde = `choco`. `muted` seulement sur fond clair. Jamais de texte moutarde sur crème.
4. Titres : hero `clamp(44px, 12vw, 104px)` en capitales ; titre de section
   `clamp(30px, 6vw, 52px)` ; titre de carte 20–24 px ; texte 16–17 px ; **rien sous 14 px**.
5. Mobile d'abord (320 → 1440). Gouttière 16 px mobile, 32 px bureau, largeur max 1240 px.
   Sections : 56 px de marge verticale mobile, 96 px bureau. Cibles tactiles ≥ 44 px.
6. Prix : toujours `formatPrice(value, locale)`, chiffres tabulaires. **Aucun prix barré sur un
   produit seul** (loi française). Aucun faux avis, aucune note, aucun compteur d'urgence inventé.
7. Mouvement : ≤ 300 ms, `transform`/`opacity`/`background-color` seulement, jamais
   `transition: all`, survol sous `@media (hover:hover)` (`hover:` de Tailwind 4 le fait déjà),
   `prefers-reduced-motion` respecté.
8. À supprimer partout où on les croise (c'est ce qui « fait IA ») : surtitres en capitales
   espacées, police mono, flèches « → » et « ↗ », numéros 01/02/03, anneaux ou halos animés,
   grain, bordures 1 px blanches translucides, dégradés, fonds sombres « nuit », italiques serif.
9. Ton des textes : court, concret, pas de jargon. On vouvoie en français, « Sie » en allemand ;
   l'espagnol garde le « tú », norme des boutiques en ligne espagnoles.
   Toute chaîne visible passe par `messages/{fr,en,de,es}.json` (les quatre langues).

## Anciens jetons à faire disparaître
`accent ember copper espresso espresso-2 ink ink-warm muted-warm night night-2 night-3 card media pack`,
`font-mono`, `font-serif`, et toute couleur en dur `[#…]`, `white/…`, `black/…`. Ils ne sont plus
définis : une classe qui les utilise ne produit plus rien.
