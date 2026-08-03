import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatPrice, getProductById, getSellableById } from "@/data/catalog";
import { getGuideBySlug, getGuides, guideLocales } from "@/data/guides";
import { getPathname, Link } from "@/i18n/navigation";
import {
  intlLocale,
  isLocale,
  ogLocale,
  routing,
  type Locale,
} from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getGuides(locale).map((guide) => ({ locale, slug: guide.slug })),
  );
}

/** hreflang limité aux locales où le guide existe réellement. */
function guideAlternates(
  locale: Locale,
  id: string,
  slugs: Record<Locale, string>,
) {
  const path = (l: Locale) =>
    getPathname({
      locale: l,
      href: { pathname: "/guides/[slug]", params: { slug: slugs[l] } },
    });
  const locales = guideLocales(id);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = path(l);
  languages["x-default"] = path("fr");
  return { canonical: path(locale), languages };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuideBySlug(locale, slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: guideAlternates(locale, guide.id, guide.slugs),
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: getPathname({
        locale,
        href: { pathname: "/guides/[slug]", params: { slug: guide.slug } },
      }),
      siteName: "OBFLO",
      locale: ogLocale(locale),
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const guide = getGuideBySlug(locale, slug);
  if (!guide) notFound();

  const t = await getTranslations("Guides");
  const related = guide.relatedProductIds
    .map((id) => getSellableById(id, locale))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const guideUrl = `${SITE_URL}${getPathname({
    locale,
    href: { pathname: "/guides/[slug]", params: { slug: guide.slug } },
  })}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.datePublished,
    inLanguage: locale,
    url: guideUrl,
    author: { "@type": "Organization", name: "OBFLO" },
    publisher: { "@type": "Organization", name: "OBFLO", url: SITE_URL },
  };

  const dateLabel = new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${guide.datePublished}T00:00:00Z`));

  return (
    <main className="bg-night py-[70px]">
      <article className="mx-auto max-w-[820px] px-8">
        <nav className="mb-9">
          <Link
            href="/guides"
            className="font-mono text-[10.5px] tracking-[0.16em] text-[#8FA1B3] no-underline transition-colors hover:text-accent"
          >
            ← {t("backToGuides")}
          </Link>
        </nav>

        <header className="mb-12 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10.5px] tracking-[0.18em] text-[#66788A]">
            <span className="text-accent">
              {t("readTime", { minutes: guide.readMinutes })}
            </span>
            <span>{t("published", { date: dateLabel })}</span>
          </div>
          <h1 className="text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.08] tracking-[-0.02em] text-ink text-pretty">
            {guide.title}
          </h1>
          <p className="text-[17px] leading-relaxed text-[#9AA9B8] text-pretty">
            {guide.intro}
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {guide.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="border-t border-white/8 pt-8 text-[24px] font-semibold tracking-[-0.01em] text-ink">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15.5px] leading-[1.75] text-[#AEB9C4] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {related.length > 0 ? (
          <aside className="mt-14 flex flex-col gap-5 rounded-[18px] border border-accent/25 bg-pack p-7">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
              <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_12px_rgba(255,106,43,0.8)]" />
              <span className="text-accent">{t("relatedLabel")}</span>
            </div>
            <div className="flex flex-col gap-3">
              {related.map((item) => {
                const isProduct = !item.id.startsWith("pack-");
                return (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-3 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[16px] font-semibold text-ink">
                        {item.name}
                      </span>
                      <span className="text-[17px] font-bold text-accent">
                        {formatPrice(item.price, locale)}
                      </span>
                    </div>
                    {isProduct ? (
                      <ProductLink
                        locale={locale}
                        id={item.id}
                        label={t("seeProduct")}
                      />
                    ) : (
                      <a
                        href={`/${locale}#packs`}
                        className="rounded-[10px] bg-accent px-4 py-2 text-[13px] font-semibold text-[#14100C] no-underline transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        {t("seeProduct")}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        ) : null}
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}

function ProductLink({
  locale,
  id,
  label,
}: {
  locale: Locale;
  id: string;
  label: string;
}) {
  const product = getProductById(id, locale);
  if (!product) return null;
  return (
    <Link
      href={{ pathname: "/produits/[slug]", params: { slug: product.slug } }}
      className="rounded-[10px] bg-accent px-4 py-2 text-[13px] font-semibold text-[#14100C] no-underline transition-transform duration-200 hover:-translate-y-0.5"
    >
      {label}
    </Link>
  );
}
