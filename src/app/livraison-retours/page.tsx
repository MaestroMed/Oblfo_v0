import type { Metadata } from "next";
import { InfoPage, InfoSection } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Livraison & retours",
  description:
    "Délais de livraison, frais de port et politique de retours 30 jours OBFLO. Livraison offerte dès 60 € en France métropolitaine.",
  alternates: { canonical: "/livraison-retours" },
};

export default function LivraisonRetoursPage() {
  return (
    <InfoPage
      kicker="INFOS"
      title="Livraison & retours."
      intro="Des produits d'hiver doivent arriver vite et pouvoir être retournés sans friction. Voici comment ça se passe."
    >
      <InfoSection title="Délais de livraison">
        <p>
          Les commandes sont expédiées sous 24 à 48 h ouvrées. La livraison en
          France métropolitaine prend ensuite 3 à 5 jours ouvrés. Un numéro de
          suivi t&apos;est envoyé par e-mail dès l&apos;expédition.
        </p>
      </InfoSection>
      <InfoSection title="Frais de port">
        <p>
          La livraison est offerte dès 60 € d&apos;achat. En dessous, les frais
          sont calculés au checkout selon la destination et affichés avant le
          paiement — jamais de surprise.
        </p>
      </InfoSection>
      <InfoSection title="Retours sous 30 jours">
        <p>
          Tu as 30 jours après réception pour retourner un produit, sans
          justification. Il suffit qu&apos;il soit complet et en bon état.
          Contacte-nous pour obtenir l&apos;étiquette de retour, le
          remboursement intégral part dès que le produit nous revient.
        </p>
      </InfoSection>
      <InfoSection title="Produit défectueux">
        <p>
          Si un produit arrive endommagé ou tombe en panne dans des conditions
          normales d&apos;utilisation, on le remplace ou on le rembourse —
          photos à l&apos;appui, sans renvoi obligatoire pour les cas évidents.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
