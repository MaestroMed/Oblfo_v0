import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BuyBox } from "@/components/product/buy-box";
import { ImageSlot } from "@/components/image-slot";
import { RecentlyViewed, TrackProductView } from "@/components/recently-viewed";
import { VariantPicker } from "@/components/variant-picker";
import {
  formatPrice,
  getPacksForProduct,
  getProductBySlug,
  getProducts,
  getSellableById,
} from "@/data/catalog";
import { getPathname, Link } from "@/i18n/navigation";
import {
  hreflangAlternates,
  isLocale,
  ogLocale,
  routing,
  type Locale,
} from "@/i18n/routing";
import {
  MERCHANT_RETURN_POLICY,
  OFFER_SHIPPING_DETAILS,
} from "@/lib/shipping";
import { heatProofs } from "@/lib/heat";
import { SITE_URL } from "@/lib/site";

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
  const packsWithProduct = getPacksForProduct(locale, product.id);
  // Même rayon d'abord (le plus complémentaire), complété avec le reste — 4 max.
  const siblings = getProducts(locale).filter((p) => p.id !== product.id);
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
          shippingDetails: OFFER_SHIPPING_DETAILS,
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
          { "@type": "ListItem", position: 2, name: product.name },
        ],
      },
    ],
  };

  const proofs = heatProofs(product.specs, product.highlights);
  const careSpec = product.specs.find((s) => /entretien|care|pflege|cuidado/i.test(s.label));
  const heatSpecs = product.specs.filter((s) =>
    /chauff|heat|heiz|wärm|calor|calent|temp|niveau|level|stufe|nivel|autonom|batter|akku|usb/i.test(s.label),
  );
  const unit = { temp: tUx("unitTemp"), seconds: tUx("unitSeconds"), levels: tUx("unitLevels") };
  const accordion = [
    {
      title: tUx("accHeat"),
      body: heatSpecs.length ? (
        <dl className="grid gap-2">
          {heatSpecs.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 border-b border-black/[0.06] pb-2 last:border-0">
              <dt className="text-muted-warm">{s.label}</dt>
              <dd className="text-right font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <ul className="grid gap-1.5">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ),
    },
    { title: tUx("accCare"), body: <p>{careSpec?.value ?? tUx("careFallback")}</p> },
    { title: tUx("accShipping"), body: <p>{tUx("shippingText")}</p> },
  ];

  return (
    <main className="bg-cream text-ink-warm">
      {/* ── Fiche produit ── */}
      <section className="relative">
        <div className="relative mx-auto max-w-[1240px] px-4 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-[90px]">
          <nav
            aria-label={t("breadcrumbLabel")}
            className="mb-7 flex flex-wrap items-center gap-2.5 font-mono text-[10.5px] tracking-[0.16em] text-muted-warm"
          >
            <Link href="/" className="text-muted-warm no-underline transition-colors hover:text-ember">
              {t("breadcrumbHome")}
            </Link>
            <span>/</span>
            <Link href="/collection" className="text-muted-warm no-underline transition-colors hover:text-ember">
              {t("breadcrumbRange")}
            </Link>
            <span>/</span>
            <span className="text-ember">{product.name.toUpperCase()}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
            {/* Galerie collante */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
              <div className="relative aspect-square overflow-hidden rounded-[22px] bg-espresso shadow-[0_40px_90px_-50px_rgba(22,17,12,0.7)]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ImageSlot label={product.gallery[0]} />
                )}
                <div aria-hidden className="grain pointer-events-none absolute inset-0" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.slice(1).map((label) => (
                  <div key={label} className="relative aspect-square overflow-hidden rounded-[14px] bg-espresso-2">
                    <ImageSlot label={label} />
                  </div>
                ))}
              </div>
            </div>

            {/* Infos + achat */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-copper">
                <span className="h-2 w-2 rotate-45 bg-ember" />
                {t("kicker")}
              </div>
              <h1 className="font-serif text-[clamp(36px,4.4vw,58px)] font-medium leading-[1.02] tracking-[-0.02em]">
                {product.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-black/12 bg-white/60 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-muted-warm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {proofs.length ? (
                <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-black/[0.08] py-4">
                  {proofs.map((p) => (
                    <div key={p.kind} className="flex items-baseline gap-1.5">
                      <span className="bg-[linear-gradient(135deg,#c98a4b,#f07b2e,#e8451f)] bg-clip-text font-serif text-[40px] font-medium leading-none text-transparent">
                        {p.value}
                      </span>
                      <span className="font-mono text-xs tracking-[0.1em] text-muted-warm">{unit[p.kind]}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <BuyBox
                id={product.id}
                name={product.name}
                price={product.price}
                variant={product.variant}
                available={product.available}
              />

              <div className="flex flex-col">
                {accordion.map((item, i) => (
                  <details key={item.title} open={i === 0} className="group border-b border-black/[0.08] first:border-t">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                      {item.title}
                      <span aria-hidden className="font-mono text-lg text-copper transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="pb-5 text-[14.5px] leading-relaxed text-ink-warm/85">{item.body}</div>
                  </details>
                ))}
              </div>

              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-[560px] text-base leading-relaxed text-muted-warm text-pretty">
                  {paragraph}
                </p>
              ))}
              <ul className="flex flex-col gap-2.5">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-[15px] font-medium">
                    <span className="h-1.5 w-1.5 flex-none rotate-45 bg-ember" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Caractéristiques ── */}
      <section className="border-y border-black/[0.06] bg-cream-2 py-16 sm:py-[90px]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
            <span className="text-muted-warm">{t("specsKicker")}</span>
            <span className="h-px w-7 bg-copper/60" />
            <span className="text-ember">{t("specsLabel")}</span>
          </div>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-2 rounded-[14px] border border-black/[0.06] bg-white px-5 py-4">
                <dt className="font-mono text-[10.5px] tracking-[0.18em] text-muted-warm uppercase">{spec.label}</dt>
                <dd className="text-[15px] font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Moins cher en pack ── */}
      {packsWithProduct.length > 0 ? (
        <section className="bg-espresso py-16 text-[#F5EFE6] sm:py-[90px]">
          <div className="mx-auto max-w-[1240px] px-8">
            <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
              <span className="text-[#6D8093]">{t("packsKicker")}</span>
              <span className="h-px w-7 bg-accent/50" />
              <span className="text-accent">{t("packsLabel")}</span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
              {packsWithProduct.map((pack) => (
                <div
                  key={pack.id}
                  className="flex flex-col gap-3 rounded-[18px] border border-white/8 bg-pack p-6 transition-[border-color,box-shadow] duration-[250ms] hover:border-accent/50 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
                >
                  <div className="text-[21px] font-bold tracking-[-0.01em] text-ink">
                    {pack.name}
                  </div>
                  <div className="text-sm text-[#93A2B1]">{pack.contents}</div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="font-mono text-sm text-[#6D8093] line-through">
                      {formatPrice(pack.compareAt, locale)}
                    </span>
                    <span className="text-[26px] font-bold text-accent">
                      {formatPrice(pack.price, locale)}
                    </span>
                    <span className="rounded-md border border-accent/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-accent">
                      −{formatPrice(pack.compareAt - pack.price, locale)}
                    </span>
                  </div>
                  <div className="mt-2">
                    {(() => {
                      const sellable = getSellableById(pack.id, locale);
                      const packBtn =
                        "cursor-pointer rounded-[10px] bg-[linear-gradient(135deg,#FF6A2B,#E8451F)] px-5 py-[11px] text-sm font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(255,106,43,0.7)]";
                      if (sellable?.variant) {
                        return (
                          <VariantPicker
                            id={pack.id}
                            name={pack.name}
                            price={pack.price}
                            label={sellable.variant.label}
                            options={sellable.variant.options}
                            layout="select"
                            buttonLabel={t("choosePack")}
                            buttonClassName={packBtn}
                          />
                        );
                      }
                      return (
                        <AddToCartButton
                          id={pack.id}
                          name={pack.name}
                          price={pack.price}
                          className={packBtn}
                        >
                          {t("choosePack")}
                        </AddToCartButton>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Compléter la panoplie ── */}
      <section className="bg-cream py-16 sm:py-[90px]">
        <div className="mx-auto max-w-[1240px] px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
            <span className="text-[#6D8093]">{t("rangeKicker")}</span>
            <span className="h-px w-7 bg-accent/50" />
            <span className="text-accent">{t("rangeLabel")}</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(255px,1fr))] gap-5">
            {otherProducts.map((other) => (
              <Link
                key={other.id}
                href={{
                  pathname: "/produits/[slug]",
                  params: { slug: other.slug },
                }}
                className="card-glow flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white no-underline"
              >
                <div className="relative aspect-[4/3] bg-espresso-2">
                  {other.image ? (
                    <Image
                      src={other.image}
                      alt={other.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  ) : (
                    <ImageSlot label={other.imageLabel} />
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-base font-semibold text-ink-warm">
                    {other.name}
                  </span>
                  <span className="text-[17px] font-bold text-accent">
                    {formatPrice(other.price, locale)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewed excludeId={product.id} />

      <TrackProductView id={product.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
