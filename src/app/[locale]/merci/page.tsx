import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Stripe from "stripe";
import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { PurchaseEvent } from "@/components/purchase-event";
import { HeatWaves } from "@/components/ui/heat-waves";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Merci" });
  return {
    title: t("metaTitle"),
    robots: { index: false },
  };
}

/**
 * Confirme la page uniquement pour une vraie session payée quand Stripe est
 * configuré. Sans clé (dev), on affiche la page si un session_id est présent.
 */
type Paid = { value: number; currency: string } | null;

async function paidSession(sessionId: string | undefined): Promise<Paid | false> {
  if (!sessionId) return false;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return false;
    return {
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "eur").toUpperCase(),
    };
  } catch {
    return false;
  }
}

export default async function MerciPage({ params, searchParams }: Props) {
  const [{ locale }, { session_id: sessionId }] = await Promise.all([
    params,
    searchParams,
  ]);
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const paid = await paidSession(sessionId);
  if (paid === false) notFound();

  const t = await getTranslations("Merci");

  return (
    <main>
      <ClearCartOnMount />
      {paid && sessionId && (
        <PurchaseEvent id={sessionId} value={paid.value} currency={paid.currency} />
      )}

      <section className="on-peche">
        <div className="relative mx-auto max-w-[1240px] px-4 py-14 sm:px-8 sm:py-24">
          <HeatWaves className="absolute top-6 right-4 h-14 w-14 sm:top-12 sm:right-8 sm:h-28 sm:w-28" />
          <span className="chip">{t("badge")}</span>
          <h1 className="mt-5 text-[clamp(36px,8vw,72px)] break-words">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>
          <p className="mt-6 max-w-[26ch] font-display text-xl leading-snug font-bold sm:text-2xl">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-8 sm:py-24">
        <h2 className="text-[clamp(28px,5vw,44px)]">{t("nextTitle")}</h2>
        <ul className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          <li className="tile on-miel p-6 sm:p-8">
            <h3 className="text-[22px]">{t("step1Title")}</h3>
            <p className="mt-2.5">{t("step1Text")}</p>
          </li>
          <li className="tile on-choco p-6 sm:p-8">
            <h3 className="text-[22px]">{t("step2Title")}</h3>
            <p className="mt-2.5">{t("step2Text")}</p>
          </li>
          <li className="tile on-sable p-6 sm:p-8">
            <h3 className="text-[22px]">{t("step3Title")}</h3>
            <p className="mt-2.5">{t("step3Text")}</p>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:mt-12 sm:flex-row sm:items-center">
          <Link href="/" className="btn btn-lg w-full sm:w-auto">
            {t("cta")}
          </Link>
          <p>
            {t("helpText")}{" "}
            <Link href="/contact" className="link inline-flex min-h-11 items-center font-semibold">
              {t("helpCta")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
