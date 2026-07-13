import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "LegalNoticePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false },
  };
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("LegalNoticePage");

  const tc = (chunks: React.ReactNode) => <ToComplete>{chunks}</ToComplete>;

  return (
    <InfoPage kicker={t("kicker")} title={t("title")}>
      <InfoSection title={t("editorTitle")}>
        <p>{t.rich("editorP1", { tc })}</p>
        <p>{t.rich("editorP2", { tc })}</p>
      </InfoSection>
      <InfoSection title={t("hostingTitle")}>
        <p>{t("hostingP1")}</p>
      </InfoSection>
      <InfoSection title={t("ipTitle")}>
        <p>{t("ipP1")}</p>
      </InfoSection>
    </InfoPage>
  );
}
