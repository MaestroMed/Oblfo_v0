import { useLocale, useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/newsletter-form";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 font-mono text-[10.5px] tracking-[0.2em] text-[#6D8093]">
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

  const badges = [
    ["badge1Title", "badge1Text"],
    ["badge2Title", "badge2Text"],
    ["badge3Title", "badge3Text"],
    ["badge4Title", "badge4Text"],
  ] as const;

  return (
    <footer className="mt-auto bg-[#100C08]">
      <div className="h-px bg-[linear-gradient(90deg,transparent,#F07B2E,transparent)]" />
      <div className="border-b border-white/[0.05]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 px-8 py-8 lg:grid-cols-4">
          {badges.map(([titleKey, textKey]) => (
            <div key={titleKey} className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#EDE4D7]">
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                {t(titleKey)}
              </span>
              <span className="pl-3.5 text-[11.5px] text-[#8F8171]">
                {t(textKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-8 pt-[60px] pb-9">
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
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/6 pt-6 font-mono text-[11px] tracking-[0.12em] text-[#708090]">
          <span>{t("copyright")}</span>
          <span>{t("region")}</span>
        </div>
      </div>
    </footer>
  );
}
