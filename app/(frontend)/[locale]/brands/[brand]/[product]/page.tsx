import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { BrochureSlot, VideoSlot } from "@/components/placeholders";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { brandBySlug, brands } from "@/lib/brands";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    brands.flatMap((brand) =>
      brand.products.map((product) => ({
        locale,
        brand: brand.slug,
        product: product.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; brand: string; product: string }>;
}): Promise<Metadata> {
  const { locale: raw, brand: brandSlug, product: productSlug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const brand = brandBySlug(brandSlug);
  const product = brand?.products.find((p) => p.slug === productSlug);
  if (!brand || !product) return {};
  return pageMetadata({
    locale,
    path: `/brands/${brand.slug}/${product.slug}`,
    title: product.name,
    description: l(locale, product.summary.en, product.summary.fr),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string; product: string }>;
}) {
  const { locale: raw, brand: brandSlug, product: productSlug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const brand = brandBySlug(brandSlug);
  const product = brand?.products.find((p) => p.slug === productSlug);
  if (!brand || !product) notFound();

  const related = brand.products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 bg-void pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] glow-iris opacity-70" />
        <div className="relative mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-iron">
            <Link href={localeHref(locale, "/brands")} className="hover:text-white">{l(locale, "Brands", "Marques")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={localeHref(locale, `/brands/${brand.slug}`)} className="hover:text-white">{brand.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ash">{product.name}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="flex flex-col items-start gap-5">
              <span className="flex h-14 w-28 items-center justify-center rounded-card bg-white px-4">
                <BrandLogo name={brand.name} logo={brand.logo} imageClassName="max-h-7" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                {l(locale, product.category.en, product.category.fr)}
              </span>
              <h1 className="text-display-sm font-medium text-white">{product.name}</h1>
              <p className="max-w-2xl text-lead text-ash">
                {l(locale, product.summary.en, product.summary.fr)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button locale={locale} to="/contact" size="lg">
                  {l(locale, "Request a quote", "Demander un devis")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button locale={locale} to={`/brands/${brand.slug}`} variant="ghost" size="lg">
                  {l(locale, "All", "Tous les")} {brand.name} {l(locale, "products", "produits")}
                </Button>
              </div>
            </div>

            <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-iron">
                {l(locale, "Key highlights", "Points clés")}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {product.highlights.map((highlight) => (
                  <li key={highlight.en} className="flex items-start gap-3 text-sm text-ash">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-iris/15 text-iris-bright">
                      <Check className="h-3 w-3" />
                    </span>
                    {l(locale, highlight.en, highlight.fr)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={l(locale, "Overview", "Aperçu")}
                title={l(locale, "Built for the way you work", "Conçu pour votre façon de travailler")}
              />
              <p className="text-body leading-relaxed text-body-light">
                {l(locale, product.summary.en, product.summary.fr)}
              </p>
              <p className="text-body leading-relaxed text-body-light">
                {l(
                  locale,
                  `Delivered and supported in region by Lithe SD, ${product.name} is backed by certified technical expertise, presales support and lifecycle services.`,
                  `Distribué et soutenu dans la région par Lithe SD, ${product.name} bénéficie d'une expertise technique certifiée, d'un support avant-vente et de services sur tout le cycle de vie.`,
                )}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button locale={locale} to="/contact" variant="outline">
                  {l(locale, "Talk to a specialist", "Parler à un spécialiste")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <BrochureSlot locale={locale} />
          </Reveal>
        </div>
      </Section>

      {product.video ? (
        <Section tone="linen">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Video", "Vidéo")}
              title={l(locale, "See it in action", "Voir en action")}
              intro={l(
                locale,
                "A short walkthrough is being produced. It will appear here once published.",
                "Une courte présentation est en préparation. Elle apparaîtra ici dès sa publication.",
              )}
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <VideoSlot locale={locale} />
          </Reveal>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="void">
          <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
          <div className="relative">
            <Reveal>
              <SectionHeading
                eyebrow={brand.name}
                title={l(locale, "Related products", "Produits associés")}
                dark
              />
            </Reveal>
            <Reveal delay={120} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} brandSlug={brand.slug} locale={locale} tone="dark" />
              ))}
            </Reveal>
          </div>
        </Section>
      ) : null}

      <CtaBand
        locale={locale}
        eyebrow={product.name}
        title={l(locale, "Ready to scope your project?", "Prêt à cadrer votre projet ?")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Request a quote", "Demander un devis")}
        secondaryTo={`/brands/${brand.slug}`}
        secondaryLabel={l(locale, "Back to", "Retour à") + " " + brand.name}
      />
    </>
  );
}
