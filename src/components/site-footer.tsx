import { useLocale, useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/newsletter-form";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 font-mono text-[10.5px] tracking-[0.2em] text-[#66788A]">
      {children}
    </div>
  );
}

const footerLinkClass =
  "text-[13.5px] text-[#A7B4C2] no-underline transition-colors hover:text-accent";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale() as Locale;
  const products = getProducts(locale);

  return (
    <footer className="mt-auto bg-night-3">
      <div className="h-px bg-[linear-gradient(90deg,transparent,#FF6A2B,transparent)]" />
      <div className="mx-auto max-w-[1240px] px-8 pt-[70px] pb-9">
        <div className="flex flex-wrap justify-between gap-14">
          <div className="flex max-w-[360px] flex-col gap-[18px]">
            <div className="text-2xl font-bold tracking-[0.05em] text-ink">
              OBFLO<span className="text-accent">°</span>
            </div>
            <p className="text-sm leading-relaxed text-[#8595A5] text-pretty">
              {t("tagline")}
            </p>
            <div className="mt-2.5 text-sm font-medium text-[#C9D4DF]">
              {t("newsletterTitle")}
            </div>
            <NewsletterForm />
          </div>
          <div className="flex flex-wrap gap-14">
            <div className="flex min-w-[150px] flex-col gap-3">
              <FooterHeading>{t("shop")}</FooterHeading>
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
              <a href={`/${locale}#packs`} className={footerLinkClass}>
                {t("packs")}
              </a>
            </div>
            <div className="flex min-w-[150px] flex-col gap-3">
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
              <Link href="/contact" className={footerLinkClass}>
                {t("orderTracking")}
              </Link>
            </div>
            <div className="flex min-w-[150px] flex-col gap-3">
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
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/6 pt-6 font-mono text-[11px] tracking-[0.12em] text-[#5A6774]">
          <span>{t("copyright")}</span>
          <span>{t("region")}</span>
        </div>
      </div>
    </footer>
  );
}
