import type { Metadata } from "next";
import { InfoPage, InfoSection, ToComplete } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site OBFLO.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <InfoPage kicker="LÉGAL" title="Mentions légales.">
      <InfoSection title="Éditeur du site">
        <p>
          Le site OBFLO est édité par <ToComplete>raison sociale</ToComplete>,{" "}
          <ToComplete>forme juridique et capital</ToComplete>, immatriculée au
          RCS sous le numéro <ToComplete>SIREN / RCS</ToComplete>, dont le siège
          social est situé <ToComplete>adresse du siège</ToComplete>.
        </p>
        <p>
          N° de TVA intracommunautaire : <ToComplete>TVA</ToComplete>.
          Directeur de la publication : <ToComplete>nom</ToComplete>. Contact :{" "}
          <ToComplete>e-mail de contact</ToComplete>.
        </p>
      </InfoSection>
      <InfoSection title="Hébergement">
        <p>
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
          CA 91789, États-Unis — vercel.com.
        </p>
      </InfoSection>
      <InfoSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus du site (textes, visuels, logo, charte
          graphique) est la propriété exclusive de l&apos;éditeur. Toute
          reproduction sans autorisation écrite préalable est interdite.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
