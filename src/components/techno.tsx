import { ImageSlot } from "@/components/image-slot";
import { SectionHeading } from "@/components/section-heading";
import { technoFeatures } from "@/data/catalog";

export function Techno() {
  return (
    <section
      id="techno"
      className="relative scroll-mt-20 overflow-hidden border-y border-white/5 bg-night-2 py-[110px]"
    >
      <div className="glow-cold pointer-events-none absolute top-[20%] -left-[200px] h-[600px] w-[700px]" />
      <div className="glow-warm pointer-events-none absolute top-[10%] -right-[200px] h-[600px] w-[700px]" />
      <div className="relative mx-auto max-w-[1240px] px-8">
        <SectionHeading
          index="04"
          label="TECHNOLOGIE"
          title={
            <>
              Une chaleur ciblée.
              <br />
              Pas un simple accessoire.
            </>
          }
          description="Les produits OBFLO diffusent une chaleur douce et localisée là où le froid se fait sentir : mains, pieds, bureau, pièce d'appoint."
        />

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-0.5 overflow-hidden rounded-[20px] border border-white/9 bg-white/9">
          <div className="relative aspect-4/3 bg-media">
            <ImageSlot label="PHOTO — main gantée, lumière froide bleutée" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,rgba(23,48,77,0.38),rgba(8,12,18,0.15)_60%)]" />
            <div className="pointer-events-none absolute top-4 left-4 rounded-lg border border-cold/30 bg-[rgba(8,10,14,0.7)] px-[11px] py-[7px] font-mono text-[10.5px] tracking-[0.18em] text-[#AFC9DE]">
              CAMÉRA STANDARD
            </div>
            <div className="pointer-events-none absolute right-4 bottom-4 rounded-lg border border-cold/30 bg-[rgba(8,10,14,0.7)] px-[11px] py-[7px] font-mono text-[13px] text-cold">
              MAINS FROIDES — 8°C
            </div>
          </div>
          <div className="relative aspect-4/3 bg-media">
            <ImageSlot label="PHOTO — même main, vision thermique orange" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,106,43,0.14),rgba(8,12,18,0.1)_60%)]" />
            <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-lg border border-accent/40 bg-[rgba(8,10,14,0.7)] px-[11px] py-[7px] font-mono text-[10.5px] tracking-[0.18em] text-[#FFD2B8]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,106,43,1)]" />
              VUE THERMIQUE
            </div>
            <div className="pointer-events-none absolute right-4 bottom-4 rounded-lg border border-accent/40 bg-[rgba(8,10,14,0.7)] px-[11px] py-[7px] font-mono text-[13px] text-accent">
              ZONES ACTIVES — +42°C
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-[rgba(8,10,14,0.85)] px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-[#C4D2DE]">
            MÊME MAIN — MÊME INSTANT
          </div>
        </div>

        <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[18px]">
          {technoFeatures.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-white/[0.02] px-[18px] py-4"
            >
              <span className="h-2 w-2 flex-none rotate-45 bg-accent shadow-[0_0_12px_rgba(255,106,43,0.8)]" />
              <span className="text-[15px] font-medium text-[#DCE4EC]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
