import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { brands as staticBrands } from "./brands";
import type { Locale } from "./i18n";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>;

async function client() {
  return getPayload({ config });
}

const urlOf = (media: unknown): string | null => {
  if (!media || typeof media !== "object") return null;
  const url = (media as Doc).url;
  return typeof url === "string" ? url : null;
};

const relDocs = (value: unknown): Doc[] =>
  Array.isArray(value)
    ? (value.filter((item) => item && typeof item === "object") as Doc[])
    : [];

export type ContentBrandRef = { name: string; slug: string; logo: string | null };
export type ContentProductRef = { name: string; slug: string; brandSlug: string };
export type ContentTopicRef = { name: string; slug: string };

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  customerName: string;
  industry: string;
  pillar: string;
  topics: ContentTopicRef[];
  brands: ContentBrandRef[];
  products: ContentProductRef[];
  challenge: unknown;
  solution: unknown;
  results: { label: string; value: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  publishedAt: string;
  featured: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  body: unknown;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  featured: boolean;
  pillar: string;
  topics: ContentTopicRef[];
  brands: ContentBrandRef[];
  products: ContentProductRef[];
  tags: string[];
};

const brandRef = (doc: Doc): ContentBrandRef => {
  const slug = String(doc.slug ?? "");
  return {
    name: String(doc.name ?? ""),
    slug,
    logo:
      urlOf(doc.logo) ??
      staticBrands.find((brand) => brand.slug === slug)?.logo ??
      null,
  };
};

const productRef = (doc: Doc): ContentProductRef => {
  const brandDoc =
    typeof doc.brand === "object" && doc.brand ? (doc.brand as Doc) : null;
  return {
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
    brandSlug: String(brandDoc?.slug ?? ""),
  };
};

const topicsOf = (value: unknown): ContentTopicRef[] =>
  relDocs(value).map((doc) => ({
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
  }));

const mapCaseStudy = (raw: Doc): CaseStudy => ({
  id: String(raw.id),
  slug: String(raw.slug ?? ""),
  title: String(raw.title ?? ""),
  excerpt: String(raw.excerpt ?? ""),
  coverImage: urlOf(raw.coverImage),
  customerName: String(raw.customerName ?? ""),
  industry: String(raw.industry ?? ""),
  pillar: String(raw.pillar ?? ""),
  topics: topicsOf(raw.topics),
  brands: relDocs(raw.brands).map(brandRef),
  products: relDocs(raw.products).map(productRef),
  challenge: raw.challenge ?? null,
  solution: raw.solution ?? null,
  results: Array.isArray(raw.results)
    ? raw.results.map((row: Doc) => ({
        label: String(row?.label ?? ""),
        value: String(row?.value ?? ""),
      }))
    : [],
  quote: String(raw.quote ?? ""),
  quoteAuthor: String(raw.quoteAuthor ?? ""),
  quoteRole: String(raw.quoteRole ?? ""),
  publishedAt: String(raw.publishedAt ?? raw.createdAt ?? ""),
  featured: Boolean(raw.featured),
});

const mapBlogPost = (raw: Doc): BlogPost => ({
  id: String(raw.id),
  slug: String(raw.slug ?? ""),
  title: String(raw.title ?? ""),
  excerpt: String(raw.excerpt ?? ""),
  coverImage: urlOf(raw.coverImage),
  body: raw.body ?? null,
  authorName: String(raw.authorName ?? ""),
  authorRole: String(raw.authorRole ?? ""),
  publishedAt: String(raw.publishedAt ?? raw.createdAt ?? ""),
  featured: Boolean(raw.featured),
  pillar: String(raw.pillar ?? ""),
  topics: topicsOf(raw.topics),
  brands: relDocs(raw.brands).map(brandRef),
  products: relDocs(raw.products).map(productRef),
  tags: Array.isArray(raw.tags)
    ? raw.tags.map((row: Doc) => String(row?.tag ?? "")).filter(Boolean)
    : [],
});

export const getCaseStudies = cache(async (locale: Locale): Promise<CaseStudy[]> => {
  try {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "case-studies",
      where: { _status: { equals: "published" } } as never,
      locale,
      depth: 2,
      sort: "-publishedAt",
      limit: 100,
    });
    return docs.map(mapCaseStudy).filter((item) => item.slug);
  } catch (error) {
    console.error("[cms] getCaseStudies failed", error);
    return [];
  }
});

export const getCaseStudy = cache(async (locale: Locale, slug: string) =>
  (await getCaseStudies(locale)).find((item) => item.slug === slug),
);

export const getBlogPosts = cache(async (locale: Locale): Promise<BlogPost[]> => {
  try {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "blog-posts",
      where: { _status: { equals: "published" } } as never,
      locale,
      depth: 2,
      sort: "-publishedAt",
      limit: 100,
    });
    return docs.map(mapBlogPost).filter((item) => item.slug);
  } catch (error) {
    console.error("[cms] getBlogPosts failed", error);
    return [];
  }
});

export const getBlogPost = cache(async (locale: Locale, slug: string) =>
  (await getBlogPosts(locale)).find((item) => item.slug === slug),
);

export const getRelatedCaseStudies = cache(
  async (locale: Locale, brandSlug: string, productSlug?: string, limit = 3) => {
    const items = await getCaseStudies(locale);
    return items
      .filter(
        (item) =>
          item.brands.some((brand) => brand.slug === brandSlug) ||
          (productSlug
            ? item.products.some((product) => product.slug === productSlug)
            : false),
      )
      .slice(0, limit);
  },
);

export const getRelatedPosts = cache(
  async (locale: Locale, brandSlug: string, productSlug?: string, limit = 3) => {
    const items = await getBlogPosts(locale);
    return items
      .filter(
        (item) =>
          item.brands.some((brand) => brand.slug === brandSlug) ||
          (productSlug
            ? item.products.some((product) => product.slug === productSlug)
            : false),
      )
      .slice(0, limit);
  },
);

export const getRelatedPostsByTopic = cache(
  async (locale: Locale, topicSlugs: string[], excludeSlug: string, limit = 3) => {
    const items = await getBlogPosts(locale);
    return items
      .filter(
        (item) =>
          item.slug !== excludeSlug &&
          item.topics.some((topic) => topicSlugs.includes(topic.slug)),
      )
      .slice(0, limit);
  },
);

export const getRelatedCaseStudiesByTopic = cache(
  async (locale: Locale, topicSlugs: string[], excludeSlug: string, limit = 2) => {
    const items = await getCaseStudies(locale);
    return items
      .filter(
        (item) =>
          item.slug !== excludeSlug &&
          item.topics.some((topic) => topicSlugs.includes(topic.slug)),
      )
      .slice(0, limit);
  },
);

/** Collect plain text from a Lexical document for reading time. */
function collectText(node: unknown): string {
  if (!node) return "";
  if (Array.isArray(node)) return node.map(collectText).join(" ");
  if (typeof node === "object") {
    const record = node as Doc;
    const own = typeof record.text === "string" ? record.text : "";
    const children = Array.isArray(record.children)
      ? record.children.map(collectText).join(" ")
      : "";
    return `${own} ${children}`;
  }
  return "";
}

export function readingTime(body: unknown): number {
  const words = collectText(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(value: string, locale: Locale): string {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
