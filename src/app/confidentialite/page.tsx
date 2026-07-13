import type { Metadata } from "next";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données OBFLO.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <InfoPage
      kicker="LÉGAL"
      title="Confidentialité."
      intro="Ce que nous collectons, pourquoi, et ce que tu peux exiger. Version courte et honnête."
    >
      <InfoSection title="Données collectées">
        <p>
          Lors d&apos;une commande : nom, adresse de livraison, e-mail,
          téléphone (pour le transporteur). Lors de l&apos;inscription à la
          newsletter : e-mail uniquement. Les données de paiement sont traitées
          directement par <ToComplete>prestataire de paiement</ToComplete> et
          ne transitent jamais par nos serveurs.
        </p>
      </InfoSection>
      <InfoSection title="Utilisation">
        <p>
          Tes données servent à préparer, expédier et suivre ta commande, à
          répondre à tes demandes SAV, et — si tu y as consenti — à
          t&apos;envoyer nos offres. Elles ne sont jamais revendues.
        </p>
      </InfoSection>
      <InfoSection title="Sous-traitants">
        <p>
          Les données strictement nécessaires à l&apos;expédition sont
          transmises à nos partenaires logistiques et transporteurs, y compris
          hors Union européenne dans le cadre de l&apos;exécution de la
          commande. Hébergement : Vercel Inc.
        </p>
      </InfoSection>
      <InfoSection title="Tes droits">
        <p>
          Accès, rectification, suppression, portabilité, opposition :
          écris-nous à <ToComplete>e-mail RGPD</ToComplete>. Réponse sous 30
          jours. Tu peux aussi saisir la CNIL (cnil.fr).
        </p>
      </InfoSection>
      <InfoSection title="Cookies">
        <p>
          Le site n&apos;utilise aujourd&apos;hui aucun cookie de tracking
          tiers. Si cela change (mesure d&apos;audience, publicité), un bandeau
          de consentement sera mis en place au préalable.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
