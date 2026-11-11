import { PaymentIcons } from "@/components/payment-icons";
import { useLocale, useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/home/icons";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { NewsletterForm } from "@/components/newsletter-form";
import { ObfloLogo } from "@/components/obflo-logo";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 text-[20px] text-moutarde">{children}</h2>;
}

// Cible de 44 px de haut, même quand le nom passe sur deux lignes.
const footerLinkClass =
  "flex min-h-11 items-center py-1.5 text-[16px] leading-snug no-underline decoration-2 underline-offset-4 hover:underline";

const BADGES: [IconName, "badge1" | "badge2" | "badge3" | "badge4"][] = [
  ["lock", "badge1"],
  ["chat", "badge2"],
  ["truck", "badge3"],
  ["returns", "badge4"],
];

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const locale = useLocale() as Locale;
  // Pas de lien vers un produit sans photo ni vers un produit épuisé.
  const products = getProducts(locale).filter((p) => p.available && p.image);

  return (
    <footer className="on-choco mt-auto">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <a href={`/${locale}`} aria-label="OBFLO" className="flex h-11 items-center self-start">
              <ObfloLogo className="h-10 w-auto" />
            </a>
            <p className="max-w-[420px] text-[17px] leading-relaxed">{t("tagline")}</p>
            <div className="tile on-moutarde flex flex-col gap-4 p-5 sm:p-7">
              <h2 className="text-[24px] sm:text-[28px]">{t("newsletterTitle")}</h2>
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            <nav aria-label={t("shop")} className="row-span-2 flex flex-col sm:row-span-1">
              <FooterHeading>{t("shop")}</FooterHeading>
              <Link href="/collection" className={footerLinkClass}>
                {t("collection")}
              </Link>
              <Link href="/black-friday" className={footerLinkClass}>
                {t("blackFriday")}
              </Link>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={{
                    pathname: "/produits/[slug]",
                    params: { slug: product.slug },
                  }}
                  className={footerLinkClass}
                >
                  {product.name}
                </Link>
              ))}
              <a href={`/${locale}#pack`} className={footerLinkClass}>
                {t("packs")}
              </a>
            </nav>
            <nav aria-label={t("help")} className="flex flex-col">
              <FooterHeading>{t("help")}</FooterHeading>
              <Link href="/guides" className={footerLinkClass}>
                {t("guides")}
              </Link>
              <a href={`/${locale}#faq`} className={footerLinkClass}>
                {t("faq")}
              </a>
              <Link href="/contact" className={footerLinkClass}>
                {t("contact")}
              </Link>
            </nav>
            <nav aria-label={t("infos")} className="flex flex-col">
              <FooterHeading>{t("infos")}</FooterHeading>
              <Link href="/livraison-retours" className={footerLinkClass}>
                {t("shipping")}
              </Link>
              <Link href="/mentions-legales" className={footerLinkClass}>
                {t("legalNotice")}
              </Link>
              <Link href="/cgv" className={footerLinkClass}>
                {t("terms")}
              </Link>
              <Link href="/confidentialite" className={footerLinkClass}>
                {t("privacy")}
              </Link>
            </nav>
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {BADGES.map(([icon, key]) => (
            <li key={key} className="tile flex items-start gap-3 bg-choco-2 p-4">
              <Icon name={icon} className="h-7 w-7 shrink-0 text-moutarde" />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-display text-[17px] leading-tight font-semibold">
                  {t(`${key}Title`)}
                </span>
                <span className="text-[15px] leading-snug">{t(`${key}Text`)}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="text-[15px]">{t("copyright")}</span>
          <PaymentIcons />
          <LocaleSwitcher label={tNav("language")} />
        </div>
      </div>
    </footer>
  );
}
