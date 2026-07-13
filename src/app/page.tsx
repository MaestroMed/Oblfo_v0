import { AnnouncementBar } from "@/components/announcement-bar";
import { Avis } from "@/components/avis";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Moments } from "@/components/moments";
import { Packs } from "@/components/packs";
import { Pourquoi } from "@/components/pourquoi";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Techno } from "@/components/techno";
import { faqItems, products } from "@/data/catalog";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      name: "OBFLO",
      description:
        "Chaleur portable : gants chauffants, chaussons chauffants, chauffe-tasse et chauffage d'appoint USB.",
    },
    {
      "@type": "ItemList",
      name: "La gamme OBFLO",
      itemListElement: products.map((product, i) => ({
        "@type": "Product",
        position: i + 1,
        name: product.name,
        description: product.tagline,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <ProductGrid />
        <Moments />
        <Packs />
        <Techno />
        <Pourquoi />
        <Avis />
        <Faq />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
