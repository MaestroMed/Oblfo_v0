import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/produits/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/livraison-retours`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
