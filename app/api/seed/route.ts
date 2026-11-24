import { getPayload } from "payload";
import { pushDevSchema } from "@payloadcms/drizzle";
import config from "@payload-config";
import { brands } from "@/lib/brands";
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
    if (banner.docs.length === 0) {
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
