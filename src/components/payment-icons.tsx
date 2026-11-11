import { useTranslations } from "next-intl";

// Moyens de paiement réellement actifs dans Stripe pour la France (relevé du 11/11/2026).
// Google Pay est désactivé dans Stripe : ne l'ajouter ici qu'une fois activé là-bas.
const METHODS = [
  ["visa", "Visa"],
  ["mastercard", "Mastercard"],
  ["amex", "American Express"],
  ["apple-pay", "Apple Pay"],
] as const;

/** Rangée des logos de paiement acceptés (icônes payment_icons, licence MIT). */
export function PaymentIcons({ className = "" }: { className?: string }) {
  const label = useTranslations("Cart")("paymentMethods");
  return (
    <ul aria-label={label} className={`flex flex-wrap items-center gap-2 ${className}`}>
      {METHODS.map(([file, name]) => (
        <li key={file} className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG de 2 Ko, rien à optimiser */}
          <img src={`/images/pay/${file}.svg`} alt={name} width={38} height={24} loading="lazy" decoding="async" className="h-6 w-auto rounded-[4px] bg-white" />
        </li>
      ))}
    </ul>
  );
}
