import { NewsletterForm } from "@/components/newsletter-form";
import { products } from "@/data/catalog";

const helpLinks = [
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Suivi de commande" },
];

const infoLinks = [
  { href: "#", label: "Livraison & retours" },
  { href: "#", label: "Mentions légales" },
  { href: "#", label: "CGV" },
  { href: "#", label: "Confidentialité" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex min-w-[150px] flex-col gap-3">
      <div className="mb-1 font-mono text-[10.5px] tracking-[0.2em] text-[#66788A]">
        {title}
      </div>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-[13.5px] text-[#A7B4C2] no-underline transition-colors hover:text-accent"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  const shopLinks = [
    ...products.map((p) => ({ href: "#gamme", label: p.name })),
    { href: "#packs", label: "Les packs" },
  ];

  return (
    <footer className="bg-night-3">
      <div className="h-px bg-[linear-gradient(90deg,transparent,#FF6A2B,transparent)]" />
      <div className="mx-auto max-w-[1240px] px-8 pt-[70px] pb-9">
        <div className="flex flex-wrap justify-between gap-14">
          <div className="flex max-w-[360px] flex-col gap-[18px]">
            <div className="text-2xl font-bold tracking-[0.05em] text-ink">
              OBFLO<span className="text-accent">°</span>
            </div>
            <p className="text-sm leading-relaxed text-[#8595A5] text-pretty">
              La chaleur, exactement là où tu en as besoin.
            </p>
            <div className="mt-2.5 text-sm font-medium text-[#C9D4DF]">
              Reçois les offres froides avant tout le monde.
            </div>
            <NewsletterForm />
          </div>
          <div className="flex flex-wrap gap-14">
            <FooterColumn title="BOUTIQUE" links={shopLinks} />
            <FooterColumn title="AIDE" links={helpLinks} />
            <FooterColumn title="INFOS" links={infoLinks} />
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/6 pt-6 font-mono text-[11px] tracking-[0.12em] text-[#5A6774]">
          <span>© 2026 OBFLO — CONÇU POUR L&apos;HIVER</span>
          <span>FR — EUR</span>
        </div>
      </div>
    </footer>
  );
}
