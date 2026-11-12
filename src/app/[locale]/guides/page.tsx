import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuideCard, guideTone } from "@/components/guide-card";
import { PAGE, PageBanner } from "@/components/page-banner";
import { getGuides } from "@/data/guides";
import { getPathname } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale, pageOpenGraph } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

function alternates(locale: Locale) {
  const path = (l: Locale) => getPathname({ locale: l, href: "/guides" });
  return hreflangAlternates(path, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Guides" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale),
    openGraph: pageOpenGraph(locale, alternates(locale).canonical),
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Guides");
  const guides = getGuides(locale);

  return (
    <main className={`${PAGE} pt-4 pb-14 sm:pt-6 sm:pb-24`}>
      <PageBanner tone="peche" waves title={t("title")} lead={t("intro")} />
      <div className="mt-6 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {guides.map((guide, i) => (
          <GuideCard key={guide.id} guide={guide} tone={guideTone(i)} priority={i === 0} />
        ))}
      </div>
    </main>
  );
}
