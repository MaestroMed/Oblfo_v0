import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Merci" });
  return {
    title: t("metaTitle"),
    robots: { index: false },
  };
}

export default async function MerciPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Merci");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-night px-8 text-center">
      <ClearCartOnMount />
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-[#8FA1B3]">
        <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
        {t("kicker")}
      </div>
      <h1 className="text-[clamp(38px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.025em] text-ink">
        {t("titleLine1")}
        <br />
        <span className="text-accent">{t("titleLine2")}</span>
      </h1>
      <p className="max-w-[460px] text-[15px] leading-relaxed text-[#93A2B1] text-pretty">
        {t("text")}
      </p>
      <Link
        href="/"
        className="rounded-xl bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-[#14100C] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
      >
        {t("cta")}
      </Link>
    </main>
  );
}
