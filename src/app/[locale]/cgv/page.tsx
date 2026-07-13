import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const SECTIONS = [
  ["s1Title", "s1P1"],
  ["s2Title", "s2P1"],
  ["s3Title", "s3P1"],
  ["s4Title", "s4P1"],
  ["s5Title", "s5P1"],
  ["s6Title", "s6P1"],
  ["s7Title", "s7P1"],
  ["s8Title", "s8P1"],
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "TermsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false },
  };
}

export default async function CgvPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("TermsPage");

  const tc = (chunks: React.ReactNode) => <ToComplete>{chunks}</ToComplete>;

  return (
    <InfoPage kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      {SECTIONS.map(([titleKey, textKey]) => (
        <InfoSection key={titleKey} title={t(titleKey)}>
          <p>{t.rich(textKey, { tc })}</p>
        </InfoSection>
      ))}
    </InfoPage>
  );
}
