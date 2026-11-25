import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  brands as staticBrands,
  type Brand,
  type BrochureRef,
  type Product,
} from "./brands";
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

const idOf = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && "id" in (value as Doc)) return String((value as Doc).id);
  return null;
};

const brochuresOf = (value: unknown): BrochureRef[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Doc => Boolean(item) && typeof item === "object")
    .map((item) => ({
      id: String(item.id ?? ""),
      title: String(item.title ?? ""),
      url: urlOf(item),
      gated: Boolean(item.gated ?? true),
    }))
    .filter((item) => item.id && item.title);
};

export const getBrands = cache(async (): Promise<Brand[]> => {
  try {
    const payload = await client();
    const [en, fr, productsEn, productsFr] = await Promise.all([
      payload.find({ collection: "brands", limit: 200, depth: 2, locale: "en", sort: "order" }),
      payload.find({ collection: "brands", limit: 200, depth: 2, locale: "fr", sort: "order" }),
      payload.find({ collection: "products", limit: 500, depth: 2, locale: "en", sort: "order" }),
      payload.find({ collection: "products", limit: 500, depth: 2, locale: "fr", sort: "order" }),
    ]);

    const frBrands = new Map(fr.docs.map((doc) => [String((doc as Doc).id), doc as Doc]));
    const frProducts = new Map(productsFr.docs.map((doc) => [String((doc as Doc).id), doc as Doc]));

    const productsByBrand = new Map<string, Product[]>();
    for (const raw of productsEn.docs) {
      const doc = raw as Doc;
      const translated = frProducts.get(String(doc.id)) ?? doc;
      const brandId = idOf(doc.brand);
      if (!brandId) continue;

      const enHighlights = Array.isArray(doc.highlights) ? doc.highlights : [];
      const frHighlights = Array.isArray(translated.highlights) ? translated.highlights : [];
      const videoDoc =
        typeof doc.video === "object" && doc.video ? (doc.video as Doc) : null;

      const product: Product = {
        slug: String(doc.slug ?? ""),
        name: String(doc.name ?? ""),
        category: {
          en: String(doc.category ?? ""),
          fr: String(translated.category ?? doc.category ?? ""),
        },
        summary: {
          en: String(doc.summary ?? ""),
          fr: String(translated.summary ?? doc.summary ?? ""),
        },
        highlights: enHighlights.map((highlight: Doc, index: number) => ({
          en: String(highlight?.text ?? ""),
          fr: String(frHighlights[index]?.text ?? highlight?.text ?? ""),
        })),
        video: Boolean(doc.video),
        videoUrl: videoDoc && typeof videoDoc.url === "string" ? videoDoc.url : null,
        videoProvider:
          videoDoc && typeof videoDoc.provider === "string" ? videoDoc.provider : null,
        brochures: brochuresOf(doc.brochures),
      };

      const list = productsByBrand.get(brandId) ?? [];
      list.push(product);
      productsByBrand.set(brandId, list);
    }

    const mapped: Brand[] = en.docs
      .map((raw) => {
        const doc = raw as Doc;
        const translated = frBrands.get(String(doc.id)) ?? doc;
        const fallback = staticBrands.find((item) => item.slug === doc.slug);
        return {
          slug: String(doc.slug ?? ""),
          name: String(doc.name ?? ""),
          logo: urlOf(doc.logo) ?? fallback?.logo ?? null,
          pillar: String(doc.pillar ?? "business-tools"),
          featured: Boolean(doc.featured),
          tagline: {
            en: String(doc.tagline ?? fallback?.tagline.en ?? ""),
            fr: String(translated.tagline ?? doc.tagline ?? fallback?.tagline.fr ?? ""),
          },
          description: {
            en: String(doc.description ?? fallback?.description.en ?? ""),
            fr: String(translated.description ?? doc.description ?? fallback?.description.fr ?? ""),
          },
          brochures: brochuresOf(doc.brochures),
          products: productsByBrand.get(String(doc.id)) ?? [],
        };
      })
      .filter((brand) => brand.slug);

    return mapped.length > 0 ? mapped : staticBrands;
  } catch (error) {
    console.error("[cms] getBrands failed; using static catalogue", error);
    return staticBrands;
  }
});

export const getBrand = cache(async (slug: string) =>
  (await getBrands()).find((brand) => brand.slug === slug),
);

export const getProduct = cache(
  async (brandSlug: string, productSlug: string) => {
    const brand = await getBrand(brandSlug);
    return brand
      ? { brand, product: brand.products.find((item) => item.slug === productSlug) }
      : undefined;
  },
);

export const getBanner = cache(async (locale: Locale) => {
  try {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "banner-messages",
      where: { active: { equals: true } },
      sort: "order",
      limit: 1,
      locale,
    });
    const doc = docs[0] as Doc | undefined;
    if (!doc) return null;
    return {
      message: String(doc.message ?? ""),
      link: typeof doc.link === "string" && doc.link ? doc.link : "/brands",
    };
  } catch {
    return null;
  }
});

export const getBrochures = cache(async (locale: Locale): Promise<BrochureRef[]> => {
  try {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "brochures",
      depth: 1,
      locale,
      limit: 100,
      sort: "-updatedAt",
    });
    return brochuresOf(docs);
  } catch {
    return [];
  }
});

export type CmsEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  startAt: string;
  endAt: string;
  timezone: string;
  type: string;
  format: string;
  location: string;
  venueName: string;
  venueAddress: string;
  virtualUrl: string;
  coverImage: string | null;
  description: string;
  agenda: { time: string; title: string; detail: string }[];
  speakers: { name: string; role: string; photo: string | null }[];
  registrationEnabled: boolean;
  registrationDeadline: string;
  confirmationMessage: string;
  videoUrl: string | null;
  images: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getEvents = cache(async (locale: Locale): Promise<CmsEvent[]> => {
  try {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "events",
      depth: 1,
      locale,
      limit: 100,
      sort: "-date",
      where: { _status: { equals: "published" } } as never,
    });
    return docs.map((raw) => {
      const doc = raw as Doc;
      const video =
        typeof doc.video === "object" && doc.video ? (doc.video as Doc) : null;
      const images = Array.isArray(doc.images)
        ? doc.images
            .map((row: Doc) => urlOf(row?.image))
            .filter((url): url is string => Boolean(url))
        : [];
      const title = String(doc.title ?? "");
      const agenda = Array.isArray(doc.agenda)
        ? doc.agenda.map((row: Doc) => ({
            time: String(row?.time ?? ""),
            title: String(row?.title ?? ""),
            detail: String(row?.detail ?? ""),
          }))
        : [];
      const speakers = Array.isArray(doc.speakers)
        ? doc.speakers.map((row: Doc) => ({
            name: String(row?.name ?? ""),
            role: String(row?.role ?? ""),
            photo: urlOf(row?.photo),
          }))
        : [];
      return {
        id: String(doc.id),
        slug: String(doc.slug ?? slugify(title) ?? doc.id),
        title,
        date: String(doc.date ?? ""),
        startAt: String(doc.startAt ?? doc.date ?? ""),
        endAt: String(doc.endAt ?? ""),
        timezone: String(doc.timezone ?? "UTC"),
        type: String(doc.type ?? "participated"),
        format: String(doc.format ?? "in-person"),
        location: String(doc.location ?? ""),
        venueName: String(doc.venueName ?? ""),
        venueAddress: String(doc.venueAddress ?? ""),
        virtualUrl: String(doc.virtualUrl ?? ""),
        coverImage: urlOf(doc.coverImage),
        description: String(doc.description ?? ""),
        agenda,
        speakers,
        registrationEnabled: doc.registrationEnabled !== false,
        registrationDeadline: String(doc.registrationDeadline ?? ""),
        confirmationMessage: String(doc.confirmationMessage ?? ""),
        videoUrl: video && typeof video.url === "string" ? video.url : null,
        images,
      };
    });
  } catch {
    return [];
  }
});

export type SiteOffice = {
  city: string;
  role: string;
  phone: string;
  email: string;
};

export type SiteSettings = {
  email: string;
  phone: string;
  hours: string;
  offices: SiteOffice[];
};

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSettings | null> => {
  try {
    const payload = await client();
    const settings = (await payload.findGlobal({
      slug: "site-settings",
      locale,
      depth: 0,
    })) as Doc | null;
    if (!settings) return null;
    const offices = Array.isArray(settings.offices)
      ? settings.offices.map((row: Doc) => ({
          city: String(row?.city ?? ""),
          role: String(row?.role ?? ""),
          phone: String(row?.phone ?? ""),
          email: String(row?.email ?? ""),
        }))
      : [];
    return {
      email: String(settings.email ?? "info@lithesd.com"),
      phone: String(settings.phone ?? ""),
      hours: String(settings.hours ?? ""),
      offices,
    };
  } catch {
    return null;
  }
});
