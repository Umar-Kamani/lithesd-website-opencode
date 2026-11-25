import { getPayload } from "payload";
import type { Payload } from "payload";
import { pushDevSchema } from "@payloadcms/drizzle";
import config from "@payload-config";
import { brands } from "@/lib/brands";
import { lexical } from "@/lib/lexical";
import { caseStudySeeds, eventSeed, policySeeds, postSeeds, topicSeeds } from "@/lib/seed-content";
import { offices, site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  if (!process.env.SEED_SECRET || params.get("secret") !== process.env.SEED_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  const offset = Math.max(0, Number(params.get("offset") ?? 0));
  const limit = Math.min(8, Math.max(1, Number(params.get("limit") ?? 6)));
  const slice = brands.slice(offset, offset + limit);

  const payload = await getPayload({ config });

  if (process.env.NODE_ENV === "production" && offset === 0) {
    try {
      await pushDevSchema(payload.db as never);
    } catch (error) {
      console.error("[seed] schema push failed", error);
    }
  }

  let brandsCreated = 0;
  let productsCreated = 0;

  for (const [index, brand] of slice.entries()) {
    const existingBrand = await payload.find({
      collection: "brands",
      where: { slug: { equals: brand.slug } },
      limit: 1,
      depth: 0,
    });

    let brandId = existingBrand.docs[0]?.id;

    if (!brandId) {
      const created = await payload.create({
        collection: "brands",
        locale: "en",
        data: {
          name: brand.name,
          slug: brand.slug,
          pillar: brand.pillar,
          tagline: brand.tagline.en,
          description: brand.description.en,
          featured: Boolean(brand.featured),
          order: offset + index,
        } as Record<string, unknown>,
      });
      brandId = created.id;
      brandsCreated++;
    }

    await payload.update({
      collection: "brands",
      id: brandId,
      locale: "fr",
      data: {
        tagline: brand.tagline.fr,
        description: brand.description.fr,
      } as Record<string, unknown>,
    });

    for (const [productIndex, product] of brand.products.entries()) {
      const existingProduct = await payload.find({
        collection: "products",
        where: {
          and: [{ brand: { equals: brandId } }, { slug: { equals: product.slug } }],
        },
        limit: 1,
        depth: 0,
      });

      if (existingProduct.docs[0]) continue;

      const productDoc = await payload.create({
        collection: "products",
        locale: "en",
        data: {
          name: product.name,
          slug: product.slug,
          brand: brandId,
          category: product.category.en,
          summary: product.summary.en,
          highlights: product.highlights.map((highlight) => ({ text: highlight.en })),
          order: productIndex,
        } as Record<string, unknown>,
      });

      await payload.update({
        collection: "products",
        id: productDoc.id,
        locale: "fr",
        data: {
          category: product.category.fr,
          summary: product.summary.fr,
          highlights: product.highlights.map((highlight) => ({ text: highlight.fr })),
        } as Record<string, unknown>,
      });

      productsCreated++;
    }
  }

  if (offset === 0) {
    await payload.updateGlobal({
      slug: "site-settings",
      locale: "en",
      data: {
        companyName: site.name,
        email: site.email,
        phone: site.phone,
        whatsapp: site.whatsapp,
        hours: site.hours.en,
        offices: offices.map((office) => ({
          city: office.city.en,
          role: office.role.en,
          phone: office.phone,
          email: office.email,
        })),
        social: {
          linkedin: site.social.linkedin,
          facebook: site.social.facebook,
          whatsapp: site.social.whatsapp,
        },
        legal: {
          privacy: site.legal.privacy,
          terms: site.legal.terms,
          antiCorruption: site.legal.antiCorruption,
        },
      },
    });

    await payload.updateGlobal({
      slug: "site-settings",
      locale: "fr",
      data: {
        hours: site.hours.fr,
        offices: offices.map((office) => ({
          city: office.city.fr,
          role: office.role.fr,
          phone: office.phone,
          email: office.email,
        })),
      },
    });

    const emailSettings = await payload.findGlobal({ slug: "email-settings", depth: 0 });
    if (!emailSettings?.notifyEmails?.length) {
      await payload.updateGlobal({
        slug: "email-settings",
        data: { notifyEmails: [{ email: "info@lithesd.com" }] },
      });
    }

    const banner = await payload.find({ collection: "banner-messages", limit: 1, depth: 0 });
    const bannerEn =
      "Now live: specialist brands across cybersecurity, cloud, infrastructure and data protection.";
    const bannerFr =
      "Désormais en ligne : des marques spécialisées en cybersécurité, cloud, infrastructure et protection des données.";
    if (banner.docs.length === 0) {
      const created = await payload.create({
        collection: "banner-messages",
        locale: "en",
        data: {
          message: bannerEn,
          link: "/brands",
          active: true,
          order: 1,
        } as Record<string, unknown>,
      });
      await payload.update({
        collection: "banner-messages",
        id: created.id,
        locale: "fr",
        data: { message: bannerFr } as Record<string, unknown>,
      });
    } else if (/24 (brands|marques)/i.test(String(banner.docs[0].message ?? ""))) {
      await payload.update({
        collection: "banner-messages",
        id: banner.docs[0].id,
        locale: "en",
        data: { message: bannerEn } as Record<string, unknown>,
      });
      await payload.update({
        collection: "banner-messages",
        id: banner.docs[0].id,
        locale: "fr",
        data: { message: bannerFr } as Record<string, unknown>,
      });
    }

    if (params.get("content") === "1") {
      await seedEditorialContent(payload);
    }
  }

  const next = offset + limit;
  return Response.json({
    ok: true,
    offset,
    next: next < brands.length ? next : null,
    done: next >= brands.length,
    totalBrands: brands.length,
    brandsCreated,
    productsCreated,
  });
}

/**
 * Seeds topics plus the sample case studies and blog posts.
 * Idempotent: existing documents are left untouched.
 */
async function seedEditorialContent(payload: Payload) {
  const topicIdBySlug = new Map<string, string | number>();

  for (const topic of topicSeeds) {
    const existing = await payload.find({
      collection: "topics",
      where: { slug: { equals: topic.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      topicIdBySlug.set(topic.slug, existing.docs[0].id);
      continue;
    }
    const created = await payload.create({
      collection: "topics",
      locale: "en",
      data: { name: topic.en, slug: topic.slug } as Record<string, unknown>,
    });
    await payload.update({
      collection: "topics",
      id: created.id,
      locale: "fr",
      data: { name: topic.fr } as Record<string, unknown>,
    });
    topicIdBySlug.set(topic.slug, created.id);
  }

  const brandDocs = await payload.find({
    collection: "brands",
    limit: 200,
    depth: 0,
    pagination: false,
  });
  const brandIdBySlug = new Map<string, string | number>();
  const brandSlugById = new Map<string, string>();
  for (const doc of brandDocs.docs) {
    brandIdBySlug.set(String(doc.slug), doc.id);
    brandSlugById.set(String(doc.id), String(doc.slug));
  }

  const productDocs = await payload.find({
    collection: "products",
    limit: 600,
    depth: 0,
    pagination: false,
  });
  const productIdByKey = new Map<string, string | number>();
  for (const doc of productDocs.docs) {
    const brandSlug = brandSlugById.get(String(doc.brand));
    if (brandSlug) {
      productIdByKey.set(`${brandSlug}/${doc.slug}`, doc.id);
    }
  }

  type Id = string | number;
  const brandIds = (slugs: string[]): Id[] =>
    slugs.map((slug) => brandIdBySlug.get(slug)).filter((id): id is Id => id !== undefined);
  const productIds = (refs: { brand: string; slug: string }[]): Id[] =>
    refs
      .map((ref) => productIdByKey.get(`${ref.brand}/${ref.slug}`))
      .filter((id): id is Id => id !== undefined);
  const topicIds = (slugs: string[]): Id[] =>
    slugs.map((slug) => topicIdBySlug.get(slug)).filter((id): id is Id => id !== undefined);

  for (const seed of caseStudySeeds) {
    const data = {
      title: seed.title,
      slug: seed.slug,
      excerpt: seed.excerpt,
      customerName: seed.customerName,
      industry: seed.industry,
      pillar: seed.pillar,
      topics: topicIds(seed.topics),
      brands: brandIds(seed.brands),
      products: productIds(seed.products),
      publishedAt: seed.publishedAt,
      featured: seed.featured,
      challenge: lexical(seed.challenge),
      solution: lexical(seed.solution),
      results: seed.results,
      quote: seed.quote,
      quoteAuthor: seed.quoteAuthor,
      quoteRole: seed.quoteRole,
      _status: "published",
    };

    const existing = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      if (existing.docs[0]._status !== "published") {
        await payload.update({
          collection: "case-studies",
          id: existing.docs[0].id,
          locale: "en",
          data: data as Record<string, unknown>,
        });
      }
      continue;
    }

    await payload.create({
      collection: "case-studies",
      locale: "en",
      data: data as Record<string, unknown>,
    });
  }

  for (const seed of postSeeds) {
    const data = {
      title: seed.title,
      slug: seed.slug,
      excerpt: seed.excerpt,
      body: lexical(seed.body),
      authorName: seed.authorName,
      authorRole: seed.authorRole,
      publishedAt: seed.publishedAt,
      featured: seed.featured,
      pillar: seed.pillar,
      topics: topicIds(seed.topics),
      brands: brandIds(seed.brands),
      products: productIds(seed.products),
      tags: seed.tags.map((tag) => ({ tag })),
      _status: "published",
    };

    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      if (existing.docs[0]._status !== "published") {
        await payload.update({
          collection: "blog-posts",
          id: existing.docs[0].id,
          locale: "en",
          data: data as Record<string, unknown>,
        });
      }
      continue;
    }

    await payload.create({
      collection: "blog-posts",
      locale: "en",
      data: data as Record<string, unknown>,
    });
  }

  for (const seed of policySeeds) {
    const existing = await payload.find({
      collection: "policies",
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) continue;

    await payload.create({
      collection: "policies",
      locale: "en",
      data: {
        title: seed.title,
        slug: seed.slug,
        summary: seed.summary,
        body: seed.body,
        category: seed.category,
        order: seed.order,
        effectiveDate: seed.effectiveDate,
        showInFooter: true,
        _status: "published",
      } as Record<string, unknown>,
    });
  }

  const existingEvent = await payload.find({
    collection: "events",
    where: { slug: { equals: eventSeed.slug } },
    limit: 1,
    depth: 0,
  });
  if (!existingEvent.docs[0]) {
    await payload.create({
      collection: "events",
      locale: "en",
      data: {
        title: eventSeed.title,
        slug: eventSeed.slug,
        date: eventSeed.date,
        startAt: eventSeed.startAt,
        endAt: eventSeed.endAt,
        timezone: eventSeed.timezone,
        type: eventSeed.type,
        format: eventSeed.format,
        location: eventSeed.location,
        venueName: eventSeed.venueName,
        description: eventSeed.description,
        agenda: eventSeed.agenda,
        registrationEnabled: true,
        registrationDeadline: eventSeed.registrationDeadline,
        confirmationMessage: eventSeed.confirmationMessage,
        _status: "published",
      } as Record<string, unknown>,
    });
  }
}
