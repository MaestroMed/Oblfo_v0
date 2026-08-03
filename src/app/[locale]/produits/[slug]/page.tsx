import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
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
  const tCart = await getTranslations("Cart");
  const packsWithProduct = getPacksForProduct(locale, product.id);
  const otherProducts = getProducts(locale).filter((p) => p.id !== product.id);

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

  return (
    <main>
      {/* ── Fiche produit ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0B1119_0%,#0A0C10_70%)]">
        <div
          className={`${product.glow === "warm" ? "glow-warm" : "glow-cold"} pointer-events-none absolute -top-[120px] -right-[220px] h-[700px] w-[900px]`}
        />
        <div className="relative mx-auto max-w-[1240px] px-8 pt-8 pb-[90px]">
          <nav
            aria-label={t("breadcrumbLabel")}
            className="mb-9 flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.16em] text-[#66788A]"
          >
            <Link
              href="/"
              className="text-[#8FA1B3] no-underline transition-colors hover:text-accent"
            >
              {t("breadcrumbHome")}
            </Link>
            <span>/</span>
            <Link
              href="/collection"
              className="text-[#8FA1B3] no-underline transition-colors hover:text-accent"
            >
              {t("breadcrumbRange")}
            </Link>
            <span>/</span>
            <span className="text-accent">{product.name.toUpperCase()}</span>
          </nav>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] items-start gap-16">
            {/* Galerie */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-[22px] border border-white/9 bg-media">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ImageSlot label={product.gallery[0]} />
                )}
                <div className="pointer-events-none absolute top-2.5 right-2.5 h-3.5 w-3.5 border-t-2 border-r-2 border-accent/80" />
                <div className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-accent/80" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.slice(1).map((label) => (
                  <div
                    key={label}
                    className="relative aspect-square overflow-hidden rounded-[14px] border border-white/7 bg-media"
                  >
                    <ImageSlot label={label} />
                  </div>
                ))}
              </div>
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-[#8FA1B3]">
                <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
                {t("kicker")}
              </div>
              <h1 className="text-[clamp(38px,4.4vw,60px)] font-bold leading-[1.02] tracking-[-0.025em] text-ink">
                {product.name}
              </h1>
              <div className="flex gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-cold/25 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-[#9FB3C4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {product.description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="max-w-[520px] text-base leading-relaxed text-[#9AA9B8] text-pretty"
                >
                  {paragraph}
                </p>
              ))}
              <ul className="flex flex-col gap-2.5">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-3 text-[15px] font-medium text-[#DCE4EC]"
                  >
                    <span className="h-1.5 w-1.5 flex-none rotate-45 bg-accent shadow-[0_0_10px_rgba(255,106,43,0.8)]" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {product.available ? (
                product.variant ? (
                  <div className="mt-2 flex flex-col gap-4">
                    <div className="text-[38px] font-bold text-ink">
                      {formatPrice(product.price, locale)}
                    </div>
                    <VariantPicker
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      label={product.variant.label}
                      options={product.variant.options}
                      layout="pills"
                      buttonLabel={t("addToCart")}
                      buttonClassName="cursor-pointer rounded-xl bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
                    />
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap items-center gap-5">
                    <div className="text-[38px] font-bold text-ink">
                      {formatPrice(product.price, locale)}
                    </div>
                    <AddToCartButton
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      className="cursor-pointer rounded-xl bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
                    >
                      {t("addToCart")}
                    </AddToCartButton>
                  </div>
                )
              ) : (
                <div className="mt-2 flex flex-wrap items-center gap-5">
                  <div className="text-[38px] font-bold text-ink">
                    {formatPrice(product.price, locale)}
                  </div>
                  <span className="rounded-xl border border-white/12 px-[26px] py-[15px] text-[15px] font-semibold text-[#66788A]">
                    {tCart("unavailable")}
                  </span>
                </div>
              )}
              <div className="font-mono text-[11px] tracking-[0.16em] text-[#66788A]">
                {t("reassurance")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Caractéristiques ── */}
      <section className="border-y border-white/5 bg-night-2 py-[90px]">
        <div className="mx-auto max-w-[1240px] px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
            <span className="text-[#66788A]">{t("specsKicker")}</span>
            <span className="h-px w-7 bg-accent/50" />
            <span className="text-accent">{t("specsLabel")}</span>
          </div>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-2 rounded-[14px] border border-white/8 bg-white/[0.02] px-5 py-4"
              >
                <dt className="font-mono text-[10.5px] tracking-[0.18em] text-[#66788A] uppercase">
                  {spec.label}
                </dt>
                <dd className="text-[15px] font-medium text-[#DCE4EC]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Moins cher en pack ── */}
      {packsWithProduct.length > 0 ? (
        <section className="bg-night py-[90px]">
          <div className="mx-auto max-w-[1240px] px-8">
            <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
              <span className="text-[#66788A]">{t("packsKicker")}</span>
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
                    <span className="font-mono text-sm text-[#66788A] line-through">
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
      <section className="border-t border-white/5 bg-night-2 py-[90px]">
        <div className="mx-auto max-w-[1240px] px-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
            <span className="text-[#66788A]">{t("rangeKicker")}</span>
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
                className="flex flex-col overflow-hidden rounded-[18px] border border-white/7 bg-card no-underline transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent/55 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
              >
                <div className="relative aspect-[4/3] bg-media">
                  <ImageSlot label={other.imageLabel} />
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-base font-semibold text-ink">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
