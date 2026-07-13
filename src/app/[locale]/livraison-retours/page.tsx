import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage, InfoSection } from "@/components/info-page";
import { getPathname } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

function alternates(locale: Locale) {
  const path = (l: Locale) =>
    getPathname({ locale: l, href: "/livraison-retours" });
  return {
    canonical: path(locale),
    languages: { fr: path("fr"), en: path("en"), "x-default": path("fr") },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "ShippingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale),
  };
}

export default async function LivraisonRetoursPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ShippingPage");

  const sections = t.raw("sections") as {
    title: string;
    paragraphs: string[];
  }[];

  return (
    <InfoPage kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      {sections.map((section) => (
        <InfoSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </InfoSection>
      ))}
    </InfoPage>
  );
}
