import Image from "next/image";
import { formatPrice, getListedProducts, type Product } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

function Items({ products, locale }: { products: Product[]; locale: Locale }) {
  return products.map((p) => (
    <li key={p.id} className="shrink-0">
      <Link
        href={{ pathname: "/produits/[slug]", params: { slug: p.slug } }}
        prefetch={false}
        className="flex items-center gap-4 rounded bg-cream py-2 pr-4 pl-2 text-choco no-underline"
      >
        <span className="relative block h-12 w-12 flex-none rounded-full bg-miel">
          <Image src={p.cutout!} alt="" width={48} height={48} loading="lazy" fetchPriority="low" className="h-full w-full object-contain p-1" />
        </span>
        <span className="font-display text-caption font-semibold whitespace-nowrap">{p.name}</span>
        <span className="text-caption font-bold whitespace-nowrap text-braise-2">{formatPrice(p.price, locale)}</span>
      </Link>
    </li>
  ));
}

// Bandeau qui fait défiler tout le catalogue. La seconde copie (inerte) sert seulement à boucler sans trou.
export function ProductTicker({ locale }: { locale: Locale }) {
  const products = getListedProducts(locale).filter((p) => p.available && p.cutout);
  if (products.length < 4) return null;

  return (
    <div className="marquee on-choco mt-8 overflow-hidden py-4 sm:mt-12 sm:py-4">
      <div className="flex w-max">
        <ul className="marquee-track flex shrink-0 gap-4 pr-4">
          <Items products={products} locale={locale} />
        </ul>
        <ul className="marquee-track marquee-copy flex shrink-0 gap-4 pr-4" aria-hidden="true" inert>
          <Items products={products} locale={locale} />
        </ul>
      </div>
    </div>
  );
}
