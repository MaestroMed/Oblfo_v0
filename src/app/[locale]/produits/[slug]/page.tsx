import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuideCard, guideTone } from "@/components/guide-card";
import { getGuides } from "@/data/guides";
import { productFaq } from "@/lib/product-faq";
import { Faq } from "@/components/faq";
import { PackRail } from "@/components/pack-card";
import { BuyBox } from "@/components/product/buy-box";
import { PhotoGallery } from "@/components/product/photo-gallery";
import { ProductCard, toCardProduct } from "@/components/product-card";
import { RecentlyViewed, TrackProductView } from "@/components/recently-viewed";
import {
  formatPrice,
  getPacksForProduct,
  getProductBySlug,
  getProducts,
} from "@/data/catalog";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { getPathname, Link } from "@/i18n/navigation";
import {
  hreflangAlternates,
  isLocale,
  ogLocale,
  routing,
  type Locale,
} from "@/i18n/routing";
import { heatProofs } from "@/lib/heat";
import {
  MERCHANT_RETURN_POLICY,
  isFreeShippingPromo,
  offerShippingDetails,
  shippingDetailsIndexFor,
} from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";
import { productTile } from "@/lib/tile";

// Guides proches pour les produits qu'aucun guide ne cite encore (ou un seul).
const EXTRA_GUIDES: Record<string, string[]> = {
  "coussin-chauffant": ["plaid-chauffant-guide", "sous-main-guide", "chauffage-appoint-economique"],
  "echarpe-chauffante": ["gilet-chauffant-guide", "choisir-gants-chauffants"],
  "ceinture-lombaire-chauffante": ["chauffe-mains-guide", "gilet-chauffant-guide"],
  "bonnet-chauffant": ["choisir-gants-chauffants", "gilet-chauffant-guide"],
  "chaussettes-chauffantes": ["pieds-froids-guide", "chaussons-guide"],
  "gilet-chauffant": ["choisir-gants-chauffants", "chauffe-mains-guide"],
  "plaid-chauffant": ["chauffage-appoint-economique", "chaussons-guide"],
  "chauffage-appoint": ["plaid-chauffant-guide", "chaussons-guide"],
  "semelles-chauffantes": ["chaussons-guide", "choisir-gants-chauffants"],
  "mini-chauffe-tasse": ["sous-main-guide"],
  "gants-chauffants": ["gilet-chauffant-guide"],
  "chauffe-mains": ["gilet-chauffant-guide"],
  "chaussons-chauffants": ["plaid-chauffant-guide"],
};

function guidesFor(productId: string, locale: Locale) {
  const all = getGuides(locale).map((guide, index) => ({ guide, index }));
  const cited = all.filter(({ guide }) => guide.relatedProductIds.includes(productId));
  const extra = (EXTRA_GUIDES[productId] ?? []).flatMap((id) => all.filter(({ guide }) => guide.id === id));
  return [...new Map([...cited, ...extra].map((g) => [g.guide.id, g])).values()].slice(0, 3);
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProducts(locale).map((product) => ({ locale, slug: product.slug })),
  );
}

function productAlternates(locale: Locale, slugs: Record<Locale, string>) {
  const path = (l: Locale) =>
    getPathname({
      locale: l,
      href: { pathname: "/produits/[slug]", params: { slug: slugs[l] } },
    });
  return hreflangAlternates(path, locale);
}

/** Coupe au dernier mot entier sous `max` caractères (meta descriptions). */
function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProductBySlug(locale, slug);
  if (!product) return {};

  const path = getPathname({
    locale,
    href: { pathname: "/produits/[slug]", params: { slug: product.slug } },
  });

  return {
    title: `${product.name} — ${formatPrice(product.price, locale)}`,
    description: truncateAtWord(product.description[0], 158),
    alternates: productAlternates(locale, product.slugs),
    // Fiche sans photo : gardée pour les liens existants, mais ni listée ni indexée.
    ...(product.image ? {} : { robots: { index: false } }),
    openGraph: {
      title: `${product.name} | OBFLO`,
      description: product.tagline,
      url: path,
      siteName: "OBFLO",
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const product = getProductBySlug(locale, slug);
  if (!product) notFound();

  const t = await getTranslations("ProductPage");
  const tUx = await getTranslations("Ux");
  const tCat = await getTranslations("Categories");
  const tFaq = await getTranslations("ProductFaq");
  const faqItems = productFaq(product.specs, (key) => tFaq(key));
  const guides = guidesFor(product.id, locale);
  const now = new Date();
  const categoryHref = {
    pathname: "/collection/[category]" as const,
    params: { category: CATEGORY_SLUGS[product.category][locale] },
  };
  const packsWithProduct = getPacksForProduct(locale, product.id);
  // Même rayon d'abord (le plus complémentaire), complété avec le reste — 4 max.
  const siblings = getProducts(locale).filter((p) => p.image && p.id !== product.id);
  const otherProducts = [
    ...siblings.filter((p) => p.category === product.category),
    ...siblings.filter((p) => p.category !== product.category),
  ].slice(0, 4);

  const productUrl = `${SITE_URL}${getPathname({
    locale,
    href: { pathname: "/produits/[slug]", params: { slug: product.slug } },
  })}`;
  // Vraie photo produit si disponible, sinon visuel OG généré.
  const productImageUrl = product.image
    ? `${SITE_URL}${product.image}`
    : `${SITE_URL}/${locale}/produits/${product.slug}/opengraph-image`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        // Même valeur que g:id du flux, identique dans les 4 langues.
        sku: product.id,
        name: product.name,
        description: product.tagline,
        url: productUrl,
        image: [productImageUrl],
        brand: { "@type": "Brand", name: "OBFLO" },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: productUrl,
          hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
          shippingDetails: offerShippingDetails(now)[shippingDetailsIndexFor(product.price, now)],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("breadcrumbHome"),
            item: `${SITE_URL}${getPathname({ locale, href: "/" })}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tCat(product.category),
            item: `${SITE_URL}${getPathname({ locale, href: categoryHref })}`,
          },
          { "@type": "ListItem", position: 3, name: product.name },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  const proofs = heatProofs(product.specs, product.highlights);
  const proofText = {
    temp: (v: number) => ({ figure: `${v} ${tUx("unitTemp")}`, label: t("proofTemp") }),
    levels: (v: number) => ({ figure: String(v), label: t("proofLevels") }),
    seconds: (v: number) => ({ figure: `${v} ${tUx("unitSeconds")}`, label: t("proofSeconds") }),
  };
  const careSpec = product.specs.find((s) => /entretien|care|pflege|cuidado/i.test(s.label));

  const wrap = "mx-auto max-w-[1240px] px-4 sm:px-8";
  const sectionTitle = "mb-6 text-display sm:mb-8";
  const blockTitle = "mb-4 text-display break-words hyphens-auto sm:mb-6";
  const crumb = "inline-flex min-h-12 min-w-12 items-center justify-center font-medium underline-offset-4 hover:underline";
  const chevron = (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 flex-none text-muted"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );

  return (
    <main>
      {/* ── Haut de fiche : galerie + achat ── */}
      <div className={`${wrap} pb-12 sm:pb-16`}>
        <nav aria-label={t("breadcrumbLabel")} className="py-1 sm:py-4">
          <ol className="flex flex-wrap items-center gap-x-2 text-caption">
            <li>
              <Link href="/" className={crumb}>
                {t("breadcrumbHome")}
              </Link>
            </li>
            <li className="flex items-center gap-x-2">
              {chevron}
              <Link href={categoryHref} className={crumb}>
                {tCat(product.category)}
              </Link>
            </li>
            <li aria-current="page" className="flex min-h-12 items-center gap-x-2 text-muted">
              {chevron}
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* min-w-0 : la bande défilante de la galerie ne doit pas élargir la colonne */}
          <div className="min-w-0 lg:sticky lg:below-header">
            <PhotoGallery
              photos={product.photos ?? (product.image ? [product.image] : [])}
              cutout={product.cutout}
              tile={productTile(product.id)}
              alt={product.name}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <ul className="flex flex-wrap gap-2">
              {product.badge === "new" ? (
                <li className="chip chip-moutarde">{t("badgeNew")}</li>
              ) : null}
              {product.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            {/* Brief SEO : H1 = produit + bénéfice. Le bénéfice garde l'allure de l'ancien sous-titre. */}
            <h1 className="flex flex-col gap-4">
              <span className="text-display break-words hyphens-auto">{product.name}</span>
              <span className="max-w-[34ch] font-sans text-body font-medium">{product.tagline}</span>
            </h1>
            <BuyBox
              id={product.id}
              name={product.name}
              price={product.price}
              variant={product.variant}
              available={product.available}
            />
          </div>
        </div>
      </div>

      {/* ── Le produit en blocs d'aplat ── */}
      <div className={`${wrap} grid gap-4 pb-12 sm:gap-6 sm:pb-16 lg:grid-cols-12`}>
        <section className="tile on-miel p-6 sm:p-8 lg:col-span-5">
          <h2 className={blockTitle}>{t("highlightsLabel")}</h2>
          {proofs.length ? (
            <dl className="mb-6 flex flex-wrap gap-x-8 gap-y-4">
              {proofs.map((p) => {
                const { figure, label } = proofText[p.kind](p.value);
                return (
                  <div key={p.kind} className="flex flex-col-reverse gap-1">
                    <dt className="text-caption font-medium">{label}</dt>
                    <dd className="font-display text-display font-bold tabular-nums">
                      {figure}
                    </dd>
                  </div>
                );
              })}
            </dl>
          ) : null}
          <ul className="flex flex-col gap-4">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-4 text-body font-medium">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 h-5 w-5 flex-none"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section className="tile on-paper p-6 sm:p-8 lg:col-span-7">
          <h2 className={blockTitle}>{t("descriptionLabel")}</h2>
          <div className="flex max-w-[62ch] flex-col gap-4 text-body">
            {product.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="tile on-choco p-6 sm:p-8 lg:col-span-7">
          <h2 className={blockTitle}>{t("specsLabel")}</h2>
          <dl>
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid gap-1 border-b border-cream/20 py-4 text-caption last:border-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4"
              >
                <dt className="text-cream/80">{spec.label}</dt>
                <dd className="font-semibold break-words">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-5">
          <section className="tile on-sable flex-auto p-6 sm:p-8">
            <h2 className={blockTitle}>{tUx("accShipping")}</h2>
            <p className="text-body">{tUx(isFreeShippingPromo(now) ? "shippingTextPromo" : "shippingText")}</p>
          </section>
          <section className="tile on-cream-2 flex-auto p-6 sm:p-8">
            <h2 className={blockTitle}>{tUx("accCare")}</h2>
            <p className="text-body">{careSpec?.value ?? tUx("careFallback")}</p>
          </section>
        </div>
      </div>

      {/* ── Moins cher en pack ── */}
      {packsWithProduct.length > 0 ? (
        <section className="defer on-cream-2 py-12 sm:py-16">
          <div className={wrap}>
            <h2 className={sectionTitle}>{t("packsLabel")}</h2>
            <PackRail
              packs={packsWithProduct}
              locale={locale}
              cols={packsWithProduct.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}
            />
          </div>
        </section>
      ) : null}

      {/* ── Vente croisée ── */}
      <section className="defer py-12 sm:py-16">
        <div className={wrap}>
          <h2 className={sectionTitle}>{t("rangeLabel")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {otherProducts.map((other) => (
              <ProductCard key={other.id} product={toCardProduct(other)} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed
        exclude={[product.id, ...otherProducts.map((p) => p.id)]}
        className="pb-12 sm:pb-16"
      />

      {guides.length > 0 ? (
        <section className="defer pb-12 sm:pb-16">
          <div className={wrap}>
            <h2 className={sectionTitle}>{t("guidesLabel")}</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {guides.map(({ guide, index }) => (
                <GuideCard key={guide.id} guide={guide} tone={guideTone(index)} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Faq locale={locale} items={faqItems} title={tFaq("title")} />

      <TrackProductView id={product.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
