import type { MetadataRoute } from "next";
import { brands } from "@/lib/brands";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/solutions", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/brands", priority: 0.9 },
  { path: "/partners", priority: 0.8 },
  { path: "/customers", priority: 0.7 },
  { path: "/resources", priority: 0.7 },
  { path: "/events", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

const brandPages = brands.flatMap((brand) => [
  { path: `/brands/${brand.slug}`, priority: 0.8 },
  ...brand.products.map((product) => ({
    path: `/brands/${brand.slug}/${product.slug}`,
    priority: 0.7,
  })),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const all = [...pages, ...brandPages];

  return all.flatMap(({ path, priority }) => {
    const en = `${siteUrl}${path || "/"}`;
    const fr = `${siteUrl}/fr${path}`;
    return [
      {
        url: en,
        lastModified: now,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority,
        alternates: { languages: { fr } },
      },
      {
        url: fr,
        lastModified: now,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority: priority - 0.1,
        alternates: { languages: { en } },
      },
    ];
  });
}
