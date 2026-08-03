import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartPageContent } from "@/components/cart-page-content";
import { RecentlyViewed } from "@/components/recently-viewed";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "CartPage" });
  return {
    title: t("metaTitle"),
    robots: { index: false },
  };
}

export default async function PanierPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <CartPageContent locale={locale} />
      <RecentlyViewed />
    </>
  );
}
