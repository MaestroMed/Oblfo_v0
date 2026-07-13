import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-context";
import { CartToast } from "@/components/cart-toast";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OBFLO — Chaleur portable : gants, chaussons, chauffages USB",
    template: "%s | OBFLO",
  },
  description:
    "Gants chauffants, chaussons chauffants, chauffe-tasse et chauffage d'appoint USB. Une chaleur ciblée en quelques secondes, là où l'hiver s'installe. Livraison offerte dès 60 €, retours 30 jours.",
  openGraph: {
    siteName: "OBFLO",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
