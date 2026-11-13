import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// CSP : le site n'embarque que GA4 (googletagmanager, chargé après consentement
// — cf. cookie-banner) ; Stripe est une redirection pleine page, pas un embed.
// 'unsafe-inline' sur script-src reste nécessaire aux scripts d'hydratation
// inline de Next (pas de nonces sur pages statiques) — la protection principale
// vient de connect-src/frame-ancestors/object-src/base-uri.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Brief perf : CSS critique dans la page (11 Ko compressés, sous le plafond de 14 Ko) au lieu d'un fichier bloquant.
  experimental: { inlineCss: true },
  // AVIF pèse nettement moins que WebP à rendu égal. Cache 31 jours : une photo remplacée doit changer de nom de fichier.
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75], minimumCacheTTL: 2678400 },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default withNextIntl(nextConfig);
