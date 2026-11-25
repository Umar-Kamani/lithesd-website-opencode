import type { MetadataRoute } from "next";
import { getBrands, getEvents } from "@/lib/cms";
import { getBlogPosts, getCaseStudies } from "@/lib/cms-content";
import { getPolicies } from "@/lib/cms-policies";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

const pages = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/brands", priority: 0.9 },
  { path: "/insights", priority: 0.8 },
  { path: "/case-studies", priority: 0.8 },
  { path: "/partners", priority: 0.8 },
  { path: "/customers", priority: 0.7 },
  { path: "/resources", priority: 0.7 },
  { path: "/policies", priority: 0.4 },
  { path: "/events", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

type SitemapEntry = {
  path: string;
  priority: number;
  lastModified?: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [allBrands, posts, studies, policies, events] = await Promise.all([
    getBrands(),
    getBlogPosts("en"),
    getCaseStudies("en"),
    getPolicies("en"),
    getEvents("en"),
  ]);

  const brandPages: SitemapEntry[] = allBrands.flatMap((brand) => [
    { path: `/brands/${brand.slug}`, priority: 0.8 },
    ...brand.products.map((product) => ({
      path: `/brands/${brand.slug}/${product.slug}`,
      priority: 0.7,
    })),
  ]);

  const contentPages: SitemapEntry[] = [
    ...posts.map((post) => ({
      path: `/insights/${post.slug}`,
      priority: 0.7,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    })),
    ...studies.map((study) => ({
      path: `/case-studies/${study.slug}`,
      priority: 0.7,
      lastModified: study.publishedAt ? new Date(study.publishedAt) : now,
    })),
    ...policies.map((policy) => ({
      path: `/policies/${policy.slug}`,
      priority: 0.3,
      lastModified: policy.updatedAt ? new Date(policy.updatedAt) : now,
    })),
    ...events.map((event) => ({
      path: `/events/${event.slug}`,
      priority: 0.6,
      lastModified: event.startAt ? new Date(event.startAt) : now,
    })),
  ];

  const all: SitemapEntry[] = [...pages, ...brandPages, ...contentPages];

  return all.flatMap(({ path, priority, lastModified }) => {
    const modified = lastModified ?? now;
    const en = `${siteUrl}${path || "/"}`;
    const fr = `${siteUrl}/fr${path}`;
    return [
      {
        url: en,
        lastModified: modified,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority,
        alternates: { languages: { fr } },
      },
      {
        url: fr,
        lastModified: modified,
        changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
        priority: priority - 0.1,
        alternates: { languages: { en } },
      },
    ];
  });
}
