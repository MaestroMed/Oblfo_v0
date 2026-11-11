import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConversionTracking } from "@/components/conversion-tracking";
import { CookieBanner } from "@/components/cookie-banner";
import { Ga4 } from "@/components/ga4";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Figtree, Fredoka } from "next/font/google";
import "../globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-context";
import { Toaster } from "sonner";
import { MotionProvider } from "@/components/ui/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, ogLocale, routing } from "@/i18n/routing";
import { isFreeShippingPromo } from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

// Promo de port datée (`shipping.ts`) : chaque page se régénère au plus une
// fois par heure, donc bandeau, textes et JSON-LD basculent sans redéploiement.
export const revalidate = 3600;

// Deux familles variables seulement : titres ronds et gras, texte courant neutre.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | OBFLO",
    },
    description: t("description"),
    openGraph: {
      siteName: "OBFLO",
      locale: ogLocale(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fredoka.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <MotionProvider>
          <CartProvider>
            <AnnouncementBar promo={isFreeShippingPromo(new Date())} />
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
            <Toaster position="bottom-center" offset={88} mobileOffset={{ bottom: 88 }} toastOptions={{ className: "obflo-toast" }} />
          </CartProvider>
          </MotionProvider>
          {/* Dans le provider : le bandeau lit ses libellés via useTranslations. */}
          <CookieBanner />
        </NextIntlClientProvider>
        <Ga4 />
        <ConversionTracking />
      </body>
    </html>
  );
}
