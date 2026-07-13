import type { Metadata } from "next";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de la boutique OBFLO.",
  alternates: { canonical: "/cgv" },
  robots: { index: false },
};

export default function CgvPage() {
  return (
    <InfoPage
      kicker="LÉGAL"
      title="Conditions générales de vente."
      intro="Version applicable à toute commande passée sur le site OBFLO."
    >
      <InfoSection title="1. Objet">
        <p>
          Les présentes conditions régissent les ventes conclues entre{" "}
          <ToComplete>raison sociale</ToComplete> et tout client passant
          commande sur le site OBFLO.
        </p>
      </InfoSection>
      <InfoSection title="2. Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises, hors frais
          de livraison. Les frais de livraison sont affichés avant validation
          de la commande. La livraison est offerte dès 60 € d&apos;achat en
          France métropolitaine.
        </p>
      </InfoSection>
      <InfoSection title="3. Commande et paiement">
        <p>
          La commande est ferme dès validation du paiement. Moyens de paiement
          acceptés : <ToComplete>CB, Apple Pay, PayPal…</ToComplete>. Le
          paiement est sécurisé par <ToComplete>prestataire de paiement</ToComplete>.
        </p>
      </InfoSection>
      <InfoSection title="4. Livraison">
        <p>
          Expédition sous 24 à 48 h ouvrées, livraison en 3 à 5 jours ouvrés en
          France métropolitaine avec numéro de suivi. En cas de retard
          supérieur à 7 jours ouvrés, le client peut annuler la commande et
          être intégralement remboursé.
        </p>
      </InfoSection>
      <InfoSection title="5. Droit de rétractation et retours">
        <p>
          Conformément au Code de la consommation, le client dispose de 14
          jours pour se rétracter. OBFLO étend ce délai à 30 jours après
          réception, sans justification. Le remboursement intégral intervient
          dès réception du produit retourné complet et en bon état.
        </p>
      </InfoSection>
      <InfoSection title="6. Garanties">
        <p>
          Tous les produits bénéficient des garanties légales de conformité (2
          ans) et des vices cachés. En cas de produit défectueux, remplacement
          ou remboursement au choix du client.
        </p>
      </InfoSection>
      <InfoSection title="7. Service client">
        <p>
          Pour toute question ou réclamation : <ToComplete>e-mail SAV</ToComplete>.
          Réponse sous 24 h ouvrées.
        </p>
      </InfoSection>
      <InfoSection title="8. Litiges">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de
          litige, une solution amiable sera recherchée avant toute action
          judiciaire ; le client peut recourir gratuitement au médiateur de la
          consommation <ToComplete>médiateur désigné</ToComplete>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
