import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ProductCard } from "@/components/product-card";
import { BrochureSlot, VideoSlot } from "@/components/placeholders";
import { BrochureCard } from "@/components/brochure-card";
import { RelatedContent } from "@/components/related-content";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { getBrand, getBrands } from "@/lib/cms";
import {
  getRelatedCaseStudies,
  getRelatedPosts,
} from "@/lib/cms-content";
import { blogPostCard, caseStudyCard } from "@/lib/content-view";
import { pillars } from "@/lib/content";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const all = await getBrands();
  return locales.flatMap((locale) => all.map((brand) => ({ locale, brand: brand.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}): Promise<Metadata> {
  const { locale: raw, brand: slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const brand = await getBrand(slug);
  if (!brand) return {};
  return pageMetadata({
    locale,
    path: `/brands/${brand.slug}`,
    title: brand.name,
    description: l(locale, brand.description.en, brand.description.fr),
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { locale: raw, brand: slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const pillar = pillars.find((p) => p.id === brand.pillar);
  const all = await getBrands();
  const others = all.filter((b) => b.slug !== brand.slug && b.pillar === brand.pillar).slice(0, 3);

  const [relatedStudies, relatedPosts] = await Promise.all([
    getRelatedCaseStudies(locale, brand.slug, undefined, 2),
    getRelatedPosts(locale, brand.slug, undefined, 2),
  ]);
  const relatedContent = [
    ...relatedStudies.map((study) => caseStudyCard(study, locale)),
    ...relatedPosts.map((post) => blogPostCard(post, locale)),
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 bg-void pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] glow-iris opacity-70" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] glow-ember opacity-40" />
        <div className="relative mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-iron">
            <Link href={localeHref(locale, "/")} className="hover:text-white">{l(locale, "Home", "Accueil")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={localeHref(locale, "/brands")} className="hover:text-white">{l(locale, "Brands", "Marques")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ash">{brand.name}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col items-start gap-6">
              <span className="flex h-20 w-40 items-center justify-center rounded-card bg-white px-6">
                <BrandLogo name={brand.name} logo={brand.logo} imageClassName="max-h-9" />
              </span>
              <div>
                {pillar ? (
                  <span className="text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                    {l(locale, pillar.title.en, pillar.title.fr)}
                  </span>
                ) : null}
                <h1 className="mt-2 text-display-sm font-medium text-white">{brand.name}</h1>
                <p className="mt-3 max-w-2xl text-lead text-ash">
                  {l(locale, brand.tagline.en, brand.tagline.fr)}
                </p>
              </div>
              <p className="max-w-2xl text-body leading-relaxed text-ash">
                {l(locale, brand.description.en, brand.description.fr)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button locale={locale} to="/contact" size="lg">
                  {l(locale, "Talk to us", "Parlons-en")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button locale={locale} href="#brochures" variant="ghost" size="lg" external={false}>
                  {l(locale, "Brochures", "Brochures")}
                </Button>
              </div>
            </div>

            <div className="hidden rounded-panel border border-white/10 bg-white/[0.03] p-5 lg:block">
              <p className="text-[10px] uppercase tracking-[0.14em] text-iron">
                {l(locale, "At a glance", "En bref")}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { label: l(locale, "Products", "Produits"), value: String(brand.products.length) },
                  { label: l(locale, "Pillar", "Pilier"), value: pillar ? l(locale, pillar.title.en, pillar.title.fr) : "—" },
                  { label: l(locale, "Region", "Région"), value: "IOC · Africa · ME" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-6 border-b border-white/8 pb-2 last:border-0">
                    <span className="text-[11px] text-iron">{row.label}</span>
                    <span className="text-right text-xs text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Products", "Produits")}
            title={l(locale, "Product families from", "Les gammes de") + " " + brand.name}
            intro={l(
              locale,
              "Explore the product families we distribute and support. Every product page includes brochures and an enquiry route.",
              "Découvrez les gammes que nous distribuons et soutenons. Chaque fiche produit inclut brochures et formulaire de contact.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brand.products.map((product) => (
              <ProductCard key={product.slug} product={product} brandSlug={brand.slug} locale={locale} tone="dark" />
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="obsidian" id="brochures">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Resources", "Ressources")}
            title={l(locale, "Brochures and video", "Brochures et vidéo")}
            intro={l(
              locale,
              "Branded brochures are being prepared and will be gated for download. Videos will be added as they are produced.",
              "Les brochures de marque sont en préparation et seront soumises à un formulaire. Les vidéos seront ajoutées au fur et à mesure.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-5 lg:grid-cols-2">
          {brand.brochures && brand.brochures.length > 0 ? (
            <div className="flex flex-col gap-3">
              {brand.brochures.map((brochure) => (
                <BrochureCard key={brochure.id} brochure={brochure} locale={locale} />
              ))}
            </div>
          ) : (
            <BrochureSlot locale={locale} tone="dark" />
          )}
          <VideoSlot locale={locale} tone="dark" />
        </Reveal>
      </Section>

      <RelatedContent
        locale={locale}
        eyebrow={brand.name}
        title={l(locale, "Case studies & insights", "Études de cas et analyses")}
        intro={l(
          locale,
          "Deployments and analysis attributed to this brand.",
          "Déploiements et analyses associés à cette marque.",
        )}
        items={relatedContent}
        tone="void"
      />

      {others.length > 0 ? (
        <Section tone="void">
          <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
          <div className="relative">
            <Reveal>
              <SectionHeading
                eyebrow={l(locale, "Same pillar", "Même pilier")}
                title={l(locale, "Explore related brands", "Découvrir des marques associées")}
                dark
              />
            </Reveal>
            <Reveal delay={120} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={localeHref(locale, `/brands/${other.slug}`)}
                  className="group flex items-center gap-4 rounded-card border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-iris/50"
                >
                  <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-card bg-white px-3">
                    <BrandLogo name={other.name} logo={other.logo} imageClassName="max-h-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white">{other.name}</span>
                    <span className="block truncate text-xs text-ash">{l(locale, other.tagline.en, other.tagline.fr)}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-smoke" />
                </Link>
              ))}
            </Reveal>
          </div>
        </Section>
      ) : null}

      <CtaBand
        locale={locale}
        eyebrow={brand.name}
        title={l(locale, "Request a quote or a technical conversation", "Demandez un devis ou un échange technique")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Contact our team", "Contacter notre équipe")}
        secondaryTo="/brands"
        secondaryLabel={l(locale, "All brands", "Toutes les marques")}
      />
    </>
  );
}
