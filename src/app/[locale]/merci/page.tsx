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
        <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-8 sm:py-16">
          <HeatWaves className="absolute top-6 right-4 h-14 w-14 sm:top-12 sm:right-8 sm:h-28 sm:w-28" />
          <span className="chip">{t("badge")}</span>
          <h1 className="mt-4 text-display break-words">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>
          <p className="mt-6 max-w-[26ch] font-display text-body font-bold">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-12 sm:px-8 sm:py-16">
        <h2 className="text-display">{t("nextTitle")}</h2>
        <ul className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
          <li className="tile on-miel p-6 sm:p-8">
            <span className="block font-display font-semibold [text-wrap:balance] text-body">{t("step1Title")}</span>
            <p className="mt-2">{t("step1Text")}</p>
          </li>
          <li className="tile on-choco p-6 sm:p-8">
            <span className="block font-display font-semibold [text-wrap:balance] text-body">{t("step2Title")}</span>
            <p className="mt-2">{t("step2Text")}</p>
          </li>
          <li className="tile on-sable p-6 sm:p-8">
            <span className="block font-display font-semibold [text-wrap:balance] text-body">{t("step3Title")}</span>
            <p className="mt-2">{t("step3Text")}</p>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:mt-12 sm:flex-row sm:items-center">
          <Link href="/" className="btn btn-lg w-full sm:w-auto">
            {t("cta")}
          </Link>
          <p>
            {t("helpText")}{" "}
            <Link href="/contact" className="link inline-flex min-h-12 items-center font-semibold">
              {t("helpCta")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
