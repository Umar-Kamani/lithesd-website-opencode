import { getPayload } from "payload";
import { pushDevSchema } from "@payloadcms/drizzle";
import config from "@payload-config";
import { brands } from "@/lib/brands";
import { offices, site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  const payload = await getPayload({ config });

  // Bootstrap the production schema once (development pushes automatically).
  if (process.env.NODE_ENV === "production") {
    try {
      await pushDevSchema(payload.db as never);
    } catch (error) {
      console.error("[seed] schema push failed", error);
    }
  }

  const existing = await payload.count({ collection: "brands" });
  if (existing.totalDocs > 0) {
    return Response.json({ ok: true, seeded: false, brands: existing.totalDocs });
  }

  let productCount = 0;

  for (const [index, brand] of brands.entries()) {
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
        order: index,
      } as Record<string, unknown>,
    });

    for (const [productIndex, product] of brand.products.entries()) {
      const productDoc = await payload.create({
        collection: "products",
        locale: "en",
        data: {
          name: product.name,
          slug: product.slug,
          brand: created.id,
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

      productCount++;
    }

    await payload.update({
      collection: "brands",
      id: created.id,
      locale: "fr",
      data: {
        tagline: brand.tagline.fr,
        description: brand.description.fr,
      } as Record<string, unknown>,
    });
  }

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

  await payload.updateGlobal({
    slug: "email-settings",
    data: { notifyEmails: [{ email: "info@lithesd.com" }] },
  });

  const bannerEn = await payload.create({
    collection: "banner-messages",
    locale: "en",
    data: {
      message:
        "Now live: 24 brands across cybersecurity, cloud, infrastructure and data protection.",
      link: "/brands",
      active: true,
      order: 1,
    } as Record<string, unknown>,
  });

  await payload.update({
    collection: "banner-messages",
    id: bannerEn.id,
    locale: "fr",
    data: {
      message:
        "Désormais en ligne : 24 marques en cybersécurité, cloud, infrastructure et protection des données.",
    } as Record<string, unknown>,
  });

  return Response.json({ ok: true, seeded: true, brands: brands.length, products: productCount });
}
