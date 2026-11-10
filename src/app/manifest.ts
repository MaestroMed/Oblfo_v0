import type { MetadataRoute } from 'next'

/**
 * Manifeste d'application.
 *
 * `icon.svg`, `favicon.ico` et l'icône Apple couvrent l'onglet et l'écran
 * d'accueil iOS ; les deux PNG déclarés ici couvrent Android et
 * l'installation en application.
 *
 * `purpose: 'maskable'` sur le 512 : Android recadre selon la forme imposée
 * par le lanceur. Sans cette déclaration, la marque est rognée sur les
 * appareils à masque circulaire.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OBFLO — chaleur portable',
    short_name: 'OBFLO',
    description:
      "Gants et chaussons chauffants, chauffe-tasse et chauffage d'appoint USB : une chaleur ciblée en quelques secondes.",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fcf1da',
    theme_color: '#eb3a0c',
    lang: 'fr',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
