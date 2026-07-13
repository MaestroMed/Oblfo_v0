import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question sur un produit OBFLO ou une commande ? On répond sous 24 h ouvrées.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPage
      kicker="AIDE"
      title="On te répond sous 24 h."
      intro="Une question sur un produit, une commande, un retour ? La FAQ répond aux cas les plus courants, sinon écris-nous directement."
    >
      <InfoSection title="Par e-mail">
        <p>
          Écris-nous à <ToComplete>e-mail de contact</ToComplete> en précisant
          ton numéro de commande si ta demande en concerne une. Réponse sous 24
          h ouvrées, du lundi au vendredi.
        </p>
      </InfoSection>
      <InfoSection title="Suivi de commande">
        <p>
          Ton numéro de suivi t&apos;est envoyé par e-mail dès
          l&apos;expédition (pense à vérifier les spams). Le lien du
          transporteur donne la position du colis en temps réel.
        </p>
      </InfoSection>
      <InfoSection title="Avant d'écrire">
        <p>
          Les questions sur la chauffe, l&apos;alimentation USB, les retours et
          les délais sont déjà couvertes dans la{" "}
          <Link href="/#faq" className="text-cold hover:text-accent">
            FAQ
          </Link>
          .
        </p>
      </InfoSection>
    </InfoPage>
  );
}
