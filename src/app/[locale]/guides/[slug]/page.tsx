import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { guideTone } from "@/components/guide-card";
import { Crumbs, PAGE, PageBanner } from "@/components/page-banner";
import { HeatWaves } from "@/components/ui/heat-waves";
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
import { productTile, TILE_CLASS } from "@/lib/tile";

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
  const tPage = await getTranslations("CategoryPage");
  const tone = guideTone(getGuides(locale).findIndex((g) => g.id === guide.id));
  const related = guide.relatedProductIds.flatMap((id) => {
    const item = getSellableById(id, locale);
    if (!item) return [];
    const product = getProductById(id, locale);
    // Un pack n'a pas de page : on renvoie vers le bloc pack de l'accueil, et seulement s'il est en vente.
    if (!product && !item.available) return [];
    return [{ ...item, product }];
  });

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
    <main>
      <article className={`${PAGE} pt-1 pb-14 sm:pt-3 sm:pb-24`}>
        <Crumbs
          items={[
            { label: tPage("home"), href: "/" },
            { label: t("backToGuides"), href: "/guides" },
          ]}
        />
        <PageBanner
          compact
          tone={tone}
          title={guide.title}
          meta={
            <p className="mb-4 flex flex-wrap gap-2">
              <span className="chip">{t("readTime", { minutes: guide.readMinutes })}</span>
              <span className="chip">{t("published", { date: dateLabel })}</span>
            </p>
          }
        />

        <div className="mt-8 grid gap-x-16 gap-y-12 sm:mt-14 lg:grid-cols-[minmax(0,68ch)_minmax(0,1fr)]">
          <div className="prose-obflo">
            <p className="text-[19px] leading-[1.6] font-medium sm:text-[21px]">{guide.intro}</p>
            {guide.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          {related.length > 0 ? (
            <aside className="tile on-cream-2 w-full max-w-[440px] p-5 sm:p-7 lg:sticky lg:top-24 lg:self-start lg:justify-self-end">
              <h2 className="text-[24px]">{t("relatedLabel")}</h2>
              <ul className="mt-2 flex flex-col divide-y-2 divide-choco/15">
                {related.map(({ id, name, price, product }) => (
                  <li key={id} className="flex items-center gap-4 py-4 last:pb-0">
                    <span
                      className={`relative flex h-[72px] w-[72px] flex-none items-center justify-center overflow-hidden rounded-2xl ${product ? TILE_CLASS[productTile(id)] : "on-miel"}`}
                    >
                      {product?.cutout ? (
                        <Image src={product.cutout} alt="" fill sizes="72px" className="cutout p-1.5" />
                      ) : (
                        <HeatWaves className="h-9 w-9" />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-col items-start gap-2">
                      <span className="font-display text-[18px] leading-[1.15] font-semibold">
                        {name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={product ? "text-[17px] font-bold tabular-nums" : "price price-sm"}>
                          {formatPrice(price, locale)}
                        </span>
                        {product ? (
                          <Link
                            href={{ pathname: "/produits/[slug]", params: { slug: product.slug } }}
                            className="btn btn-sm"
                          >
                            {t("seeProduct")}
                            <span className="sr-only"> {name}</span>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/", hash: "pack" }} className="btn btn-sm">
                            {t("seePacks")}
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
