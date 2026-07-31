import Image from "next/image";
import { useTranslations } from "next-intl";
import { PowerGlyph } from "@/components/power-glyph";

// Séquence signature : O B F L apparaissent, le O-power s'allume,
// le mot passe de froid à chauffant, puis le contenu se révèle.
// Timings et fallback reduced-motion : globals.css (.hero-*).
const letters = ["O", "B", "F", "L"] as const;

export function Hero() {
  const t = useTranslations("HomeV2");

  return (
    <section className="relative overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,17,12,0.94)_0%,rgba(22,17,12,0.72)_38%,rgba(22,17,12,0.25)_70%,rgba(22,17,12,0.45)_100%)] max-md:bg-[linear-gradient(180deg,rgba(22,17,12,0.9)_0%,rgba(22,17,12,0.65)_55%,rgba(22,17,12,0.9)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(22,17,12,0)_0%,#16110C_100%)]" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-8 pt-16 pb-[150px] md:pt-20">
        <div className="flex max-w-[620px] flex-col items-start gap-7">
          {/* Marque animée — décorative, le vrai H1 est en dessous */}
          <div
            aria-hidden
            className="hero-brand flex items-center font-serif text-[clamp(64px,10vw,130px)] leading-none font-semibold tracking-[0.04em]"
          >
            {letters.map((letter, i) => (
              <span
                key={letter + i}
                className="hero-letter"
                style={{ "--stagger": i } as React.CSSProperties}
              >
                {letter}
              </span>
            ))}
            <span
              className="hero-letter ml-[0.06em]"
              style={{ "--stagger": 4 } as React.CSSProperties}
            >
              <PowerGlyph className="hero-power h-[0.72em] w-[0.72em]" />
            </span>
          </div>

          <div className="hero-content flex flex-col items-start gap-6">
            <span className="rounded-full border border-copper/40 bg-copper/10 px-4 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-copper">
              ◈ {t("heroBadge")}
            </span>
            <h1 className="font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.1] font-medium tracking-[-0.01em] text-[#F5EFE6] text-pretty">
              {t("heroTitle1")}
              <span className="text-accent">{t("heroAccent1")}</span>
              <span className="italic">{t("heroTitle2")}</span>
              <span className="text-accent">{t("heroAccent2")}</span>
              {t("heroTitle3")}
            </h1>
            <p className="text-[15.5px] leading-relaxed text-[#C8BBAA]">
              {t("heroSubtitle")}
            </p>
            <div className="mt-1 flex flex-wrap gap-3.5">
              <a
                href="#essentiels"
                className="rounded-lg bg-accent px-7 py-[15px] text-[15px] font-semibold text-[#14100C] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(240,123,46,0.6)]"
              >
                {t("heroCtaPrimary")} →
              </a>
              <a
                href="#pack"
                className="rounded-lg border border-white/25 bg-black/20 px-7 py-[15px] text-[15px] font-medium text-[#EDE4D7] no-underline backdrop-blur-sm transition-colors hover:border-accent/70 hover:text-white"
              >
                {t("heroCtaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
