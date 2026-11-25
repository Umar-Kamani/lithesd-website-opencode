import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { BrandBrowser } from "@/components/brand-browser";
import { CtaBand } from "@/components/cta-band";
import { getBrands } from "@/lib/cms";
import { pillars } from "@/lib/content";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/brands",
    title: l(locale, "Brands", "Marques"),
    description: l(
      locale,
      "Explore the Lithe SD portfolio: specialist technology brands across cybersecurity, infrastructure, business tools, observability, AI and data protection.",
      "Découvrez le portefeuille Lithe SD : des marques technologiques spécialisées en cybersécurité, infrastructure, outils métier, observabilité, IA et protection des données.",
    ),
  });
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const allBrands = await getBrands();
  const items = allBrands.map((brand) => ({
    slug: brand.slug,
    name: brand.name,
    logo: brand.logo,
    pillar: brand.pillar,
    tagline: brand.tagline,
    productCount: brand.products.length,
  }));

  const filters = pillars.map((pillar) => ({
    id: pillar.id,
    label: l(locale, pillar.title.en, pillar.title.fr),
  }));

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Brands", "Marques")}
        title={l(locale, "Best-in-class brands, one trusted distributor", "Des marques de référence, un distributeur de confiance")}
        intro={l(
          locale,
          "We curate, validate and support a portfolio of innovative and disruptive technologies — so partners can confidently take them to market.",
          "Nous sélectionnons, validons et soutenons un portefeuille de technologies innovantes — pour que les partenaires les commercialisent en confiance.",
        )}
      />

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "The portfolio", "Le portefeuille")}
            title={l(locale, "A specialist portfolio, across six pillars", "Un portefeuille spécialisé, réparti en six piliers")}
            intro={l(
              locale,
              "Filter by pillar to find the right technology, then explore products and brochures.",
              "Filtrez par pilier pour trouver la bonne technologie, puis explorez les produits et brochures.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <BrandBrowser locale={locale} items={items} filters={filters} tone="dark" />
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Vendors", "Éditeurs")}
        title={l(locale, "Bring your technology to the region", "Amenez votre technologie dans la région")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Become a vendor", "Devenir éditeur")}
        secondaryTo="/partners"
        secondaryLabel={l(locale, "Partner program", "Programme partenaire")}
      />
    </>
  );
}
