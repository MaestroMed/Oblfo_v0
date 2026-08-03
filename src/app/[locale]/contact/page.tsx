import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";
import { getPathname, Link } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

function alternates(locale: Locale) {
  const path = (l: Locale) => getPathname({ locale: l, href: "/contact" });
  return hreflangAlternates(path, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  const tc = (chunks: React.ReactNode) => <ToComplete>{chunks}</ToComplete>;

  return (
    <InfoPage kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      <InfoSection title={t("emailTitle")}>
        <p>{t.rich("emailText", { tc })}</p>
      </InfoSection>
      <InfoSection title={t("trackingTitle")}>
        <p>{t("trackingText")}</p>
      </InfoSection>
      <InfoSection title={t("faqTitle")}>
        <p>
          {t.rich("faqText", {
            faqLink: (chunks) => (
              <Link
                href={{ pathname: "/", hash: "faq" }}
                className="text-cold hover:text-accent"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </InfoSection>
    </InfoPage>
  );
}
