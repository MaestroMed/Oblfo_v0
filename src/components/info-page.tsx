import { SectionKicker } from "@/components/section-heading";

/** Gabarit des pages éditoriales (légal, aide) — typographie prose sur fond nuit. */
export function InfoPage({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-night py-[90px]">
      <div className="mx-auto max-w-[820px] px-8">
        <div className="mb-12 flex flex-col gap-3.5">
          <SectionKicker index="—" label={kicker} />
          <h1 className="text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
            {title}
          </h1>
          {intro ? (
            <p className="text-[16.5px] leading-relaxed text-[#93A2B1] text-pretty">
              {intro}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </main>
  );
}

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-white/8 pt-8">
      <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-[#9AA9B8]">
        {children}
      </div>
    </section>
  );
}

/** Marqueur visible des informations légales à compléter avant mise en ligne. */
export function ToComplete({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[12px] tracking-[0.06em] text-accent">
      [À COMPLÉTER — {children}]
    </span>
  );
}
