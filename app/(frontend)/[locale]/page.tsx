import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { PillarGrid } from "@/components/pillar-grid";
import { ServiceGrid } from "@/components/service-grid";
import { BrandMarquee } from "@/components/brand-marquee";
import { BrandCard } from "@/components/brand-card";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Icon } from "@/lib/icons";
import { about, whyChoose } from "@/lib/content";
import { getBrands } from "@/lib/cms";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/",
    title:
      locale === "fr"
        ? "Distributeur à valeur ajoutée de solutions IT d'entreprise"
        : "Enterprise IT solutions value-added distributor",
    description:
      locale === "fr"
        ? "Lithe SD distribue les technologies de cybersécurité, cloud, infrastructure, observabilité et protection des données dans la COI, en Afrique de l'Est et au Moyen-Orient."
        : "Lithe SD distributes cybersecurity, cloud, infrastructure, observability and data protection technology across the IOC, East Africa and the Middle East.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const allBrands = await getBrands();
  const featured = ["sangfor", "fujitsu", "asus", "watchguard", "seceon", "kioxia", "accops", "keepit"]
    .map((slug) => allBrands.find((brand) => brand.slug === slug))
    .filter((brand): brand is (typeof allBrands)[number] => Boolean(brand));

  return (
    <>
      <HomeHero locale={locale} panelBrands={allBrands} />

      {/* Ecosystem strip */}
      <Section tone="obsidian" className="border-y border-white/8 py-14 sm:py-16">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
                {l(locale, "The ecosystem", "L'écosystème")}
              </span>
              <h2 className="mt-3 text-heading-sm font-medium text-white">
                {l(locale, "24 brands. One accountable partner.", "24 marques. Un partenaire responsable.")}
              </h2>
            </div>
            <Button locale={locale} to="/brands" variant="ghost" size="sm">
              {l(locale, "All brands", "Toutes les marques")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Reveal>
          <Reveal delay={100}>
            <BrandMarquee items={allBrands} tone="dark" />
          </Reveal>
        </div>
      </Section>

      {/* Who we are */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Who we are", "Qui sommes-nous")}
              title={l(locale, "Distribution, reimagined around the partner", "La distribution repensée autour du partenaire")}
              intro={l(
                locale,
                "We go beyond traditional distribution — partnering with System Integrators across the entire sales, design, implementation and support lifecycle.",
                "Nous allons au-delà de la distribution traditionnelle — aux côtés des intégrateurs sur tout le cycle de vente, de conception, de mise en œuvre et de support.",
              )}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5">
              {about.intro.slice(0, 3).map((paragraph) => (
                <p key={paragraph.en} className="text-body leading-relaxed text-body-light">
                  {l(locale, paragraph.en, paragraph.fr)}
                </p>
              ))}
              <StatBand locale={locale} className="mt-2" />
            </div>
          </Reveal>
        </div>
        <div className="mt-9">
          <Button locale={locale} to="/about" variant="outline">
            {l(locale, "Our story", "Notre histoire")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="linen">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={l(locale, "What we distribute", "Ce que nous distribuons")}
              title={l(locale, "A portfolio built for the modern enterprise", "Un portefeuille conçu pour l'entreprise moderne")}
              intro={l(
                locale,
                "Six pillars of technology, each backed by certified expertise and full lifecycle support.",
                "Six piliers technologiques, chacun soutenu par une expertise certifiée et un support complet.",
              )}
              className="lg:max-w-2xl"
            />
            <Button locale={locale} to="/solutions" variant="outline" className="shrink-0">
              {l(locale, "All solutions", "Toutes les solutions")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <PillarGrid locale={locale} />
        </Reveal>
      </Section>

      {/* Services preview */}
      <Section tone="white">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={l(locale, "Services", "Services")}
              title={l(locale, "Expertise you can put in front of your customers", "Une expertise à mettre devant vos clients")}
              intro={l(
                locale,
                "From assessment and response to deployment, compliance and audit — our services extend what your team can deliver.",
                "De l'évaluation à la réponse, du déploiement à la conformité et à l'audit — nos services étendent ce que votre équipe peut livrer.",
              )}
              className="lg:max-w-2xl"
            />
            <Button locale={locale} to="/services" variant="outline" className="shrink-0">
              {l(locale, "All services", "Tous les services")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ServiceGrid locale={locale} limit={4} />
        </Reveal>
      </Section>

      {/* Brands */}
      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={l(locale, "Brands", "Marques")}
                title={l(locale, "The technology behind our solutions", "La technologie derrière nos solutions")}
                intro={l(
                  locale,
                  "A curated ecosystem of industry leaders, validated and supported locally.",
                  "Un écosystème sélectionné de leaders du secteur, validé et soutenu localement.",
                )}
                dark
                className="lg:max-w-2xl"
              />
              <Button locale={locale} to="/brands" variant="ghost" className="shrink-0">
                {l(locale, "All brands", "Toutes les marques")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <BrandMarquee items={allBrands} tone="dark" />
          </Reveal>
          <Reveal delay={160} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((brand) =>
                brand ? <BrandCard key={brand.slug} brand={brand} locale={locale} tone="dark" /> : null,
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why choose */}
      <Section tone="linen">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Why Lithe SD", "Pourquoi Lithe SD")}
            title={l(locale, "A partner, not just a supplier", "Un partenaire, pas un simple fournisseur")}
            intro={l(
              locale,
              "We differentiate ourselves by working closely with partners throughout the full engagement lifecycle.",
              "Nous nous différencions par un accompagnement étroit des partenaires sur tout le cycle d'engagement.",
            )}
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <div className="grid gap-5 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <article key={item.title.en} className="flex flex-col rounded-card border border-void/10 bg-white p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-iris text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-heading-sm font-medium text-void">
                  {l(locale, item.title.en, item.title.fr)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-light">
                  {l(locale, item.summary.en, item.summary.fr)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
