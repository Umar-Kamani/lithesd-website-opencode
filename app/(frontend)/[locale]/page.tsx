import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
import { ContentCard } from "@/components/content-card";
import { Icon } from "@/lib/icons";
import { about, whyChoose } from "@/lib/content";
import { getBrands, getSiteSettings } from "@/lib/cms";
import { getBlogPosts, getCaseStudies } from "@/lib/cms-content";
import { blogPostCard, caseStudyCard } from "@/lib/content-view";
import { href as localeHref, isLocale, l, type Locale } from "@/lib/i18n";
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
  const [posts, studies, settings] = await Promise.all([
    getBlogPosts(locale),
    getCaseStudies(locale),
    getSiteSettings(locale),
  ]);
  const featuredStudy = studies.find((study) => study.featured) ?? studies[0] ?? null;
  const latestPosts = posts.slice(0, 3);
  const stripStudies = studies.slice(0, 2);
  const featured = ["sangfor", "fujitsu", "asus", "watchguard", "seceon", "kioxia", "accops", "keepit"]
    .map((slug) => allBrands.find((brand) => brand.slug === slug))
    .filter((brand): brand is (typeof allBrands)[number] => Boolean(brand));

  return (
    <>
      <HomeHero locale={locale} offices={settings?.offices ?? []} />

      {stripStudies.length > 0 ? (
        <Section tone="obsidian" className="border-b border-white/8 py-12 sm:py-14 lg:py-16">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
                {l(locale, "Proof from the field", "Preuves du terrain")}
              </span>
              <Link
                href={localeHref(locale, "/case-studies")}
                className="inline-flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-white"
              >
                {l(locale, "All case studies", "Toutes les études de cas")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stripStudies.map((study) => (
                <Link
                  key={study.id}
                  href={localeHref(locale, `/case-studies/${study.slug}`)}
                  className="group flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-iris/50"
                >
                  <span className="text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                    {study.customerName || l(locale, "Case study", "Étude de cas")}
                  </span>
                  <h3 className="mt-2 line-clamp-2 font-display text-[17px] font-medium leading-snug text-white">
                    {study.title}
                  </h3>
                  {study.results[0] ? (
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-medium text-white">{study.results[0].value}</span>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-smoke">{study.results[0].label}</span>
                    </p>
                  ) : null}
                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-white/8 pt-3 text-xs text-ash">
                    {l(locale, "Read the story", "Lire l'histoire")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Ecosystem strip */}
      <Section tone="obsidian" className="border-y border-white/8 py-14 sm:py-16">
        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
                {l(locale, "The ecosystem", "L'écosystème")}
              </span>
              <h2 className="mt-3 text-heading-sm font-medium text-white">
                {l(locale, "A specialist portfolio. One accountable partner.", "Un portefeuille spécialisé. Un partenaire responsable.")}
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
      <Section tone="void">
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
              dark
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5">
              {about.intro.slice(0, 3).map((paragraph) => (
                <p key={paragraph.en} className="text-body leading-relaxed text-ash">
                  {l(locale, paragraph.en, paragraph.fr)}
                </p>
              ))}
              <StatBand locale={locale} tone="dark" className="mt-2" />
            </div>
          </Reveal>
        </div>
        <div className="mt-9">
          <Button locale={locale} to="/about" variant="ghost">
            {l(locale, "Our story", "Notre histoire")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="obsidian">
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
              dark
              className="lg:max-w-2xl"
            />
            <Button locale={locale} to="/partners" variant="ghost" className="shrink-0">
              {l(locale, "Why partner with us", "Pourquoi nous rejoindre")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <PillarGrid locale={locale} tone="dark" />
        </Reveal>
      </Section>

      {/* Services preview */}
      <Section tone="void">
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
              dark
              className="lg:max-w-2xl"
            />
            <Button locale={locale} to="/services" variant="ghost" className="shrink-0">
              {l(locale, "All services", "Tous les services")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ServiceGrid locale={locale} tone="dark" limit={4} />
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
      <Section tone="obsidian">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Why Lithe SD", "Pourquoi Lithe SD")}
            title={l(locale, "A partner, not just a supplier", "Un partenaire, pas un simple fournisseur")}
            intro={l(
              locale,
              "We differentiate ourselves by working closely with partners throughout the full engagement lifecycle.",
              "Nous nous différencions par un accompagnement étroit des partenaires sur tout le cycle d'engagement.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <div className="grid gap-5 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <article key={item.title.en} className="flex flex-col rounded-card border border-white/10 bg-charcoal p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-iris text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-heading-sm font-medium text-white">
                  {l(locale, item.title.en, item.title.fr)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {l(locale, item.summary.en, item.summary.fr)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      {featuredStudy ? (
        <Section tone="obsidian">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Case studies", "Études de cas")}
              title={l(locale, "Outcomes, not slideware", "Des résultats, pas des slides")}
              intro={l(
                locale,
                "A closer look at deployments in the region — the constraints, the design and the measured result.",
                "Un regard approfondi sur des déploiements dans la région — contraintes, conception et résultats mesurés.",
              )}
              titleClassName="max-w-2xl"
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-5">
            <ContentCard item={caseStudyCard(featuredStudy, locale)} locale={locale} tone="dark" featured />
          </Reveal>
        </Section>
      ) : null}

      {latestPosts.length > 0 ? (
        <Section tone="void">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={l(locale, "Insights", "Analyses")}
              title={l(locale, "Field notes from our practice teams", "Notes de terrain de nos équipes")}
              intro={l(
                locale,
                "Architecture guidance and threat analysis, written by the people who deploy the portfolio.",
                "Conseils d'architecture et analyse des menaces, par ceux qui déploient le portefeuille.",
              )}
              dark
            />
            <Button locale={locale} to="/insights" variant="ghost" className="shrink-0">
              {l(locale, "All insights", "Toutes les analyses")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <ContentCard key={post.id} item={blogPostCard(post, locale)} locale={locale} tone="dark" />
            ))}
          </Reveal>
        </Section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  );
}
