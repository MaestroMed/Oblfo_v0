import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionKicker } from "@/components/section-heading";
import { getGuides } from "@/data/guides";
import { getPathname, Link } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale } from "@/i18n/routing";

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
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Guides");
  const guides = getGuides(locale);

  return (
    <main className="bg-night py-[90px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-12 flex max-w-[720px] flex-col gap-3.5">
          <SectionKicker index="—" label={t("kicker")} />
          <h1 className="text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
            {t("title")}
          </h1>
          <p className="text-[16.5px] leading-relaxed text-[#93A2B1] text-pretty">
            {t("intro")}
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-5">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={{ pathname: "/guides/[slug]", params: { slug: guide.slug } }}
              className="flex flex-col gap-4 rounded-[18px] border border-white/7 bg-card p-7 no-underline transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent/55 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
            >
              <div className="font-mono text-[10.5px] tracking-[0.18em] text-accent">
                {t("readTime", { minutes: guide.readMinutes })}
              </div>
              <h2 className="text-[22px] font-bold leading-snug tracking-[-0.01em] text-ink">
                {guide.title}
              </h2>
              <p className="text-[14.5px] leading-relaxed text-[#8FA0B0] text-pretty">
                {guide.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
