/**
 * Hôte canonique du site.
 *
 * C'est `www` et pas l'apex : Vercel sert le site sur www.obflo.com et
 * redirige obflo.com dessus en 308. Vérifié le 03/08/2026 —
 *
 *     https://obflo.com/fr      -> 308 https://www.obflo.com/fr
 *     https://www.obflo.com/fr  -> 200
 *
 * La valeur par défaut était l'apex, si bien que les balises canonical,
 * les hreflang, le sitemap et les URLs Open Graph désignaient tous un
 * hôte qui redirige. Google recevait deux signaux contradictoires : le
 * sitemap l'envoyait sur l'apex, la redirection le posait sur www, et la
 * page lui répondait que la version de référence était l'apex. Lighthouse
 * le relevait en « Document does not have a valid rel=canonical », seul
 * défaut SEO du parc.
 *
 * Si l'hôte servi change un jour, c'est cette constante qu'il faut
 * changer — et vérifier que NEXT_PUBLIC_SITE_URL ne la contredit pas
 * côté Vercel.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.obflo.com";

export const SITE_NAME = "OBFLO";
