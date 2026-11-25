import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContentBrowser, type BrowserItem } from "@/components/content-browser";
import { ContentCard } from "@/components/content-card";
import { CtaBand } from "@/components/cta-band";
import { getBlogPosts } from "@/lib/cms-content";
import { blogPostCard } from "@/lib/content-view";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { labelFor, pillarLabels } from "@/lib/taxonomy";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const base = pageMetadata({
    locale,
    path: "/insights",
    title: l(locale, "Insights", "Analyses"),
    description: l(
      locale,
      "Practical analysis from the Lithe SD practice teams — cybersecurity, infrastructure, data protection and the digital workplace.",
      "Analyses pratiques des équipes Lithe SD — cybersécurité, infrastructure, protection des données et espace de travail numérique.",
    ),
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      types: {
        "application/rss+xml": `${siteUrl}${locale === "fr" ? "/fr" : ""}/insights/rss.xml`,
      },
    },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const posts = await getBlogPosts(locale);

  const featured =
    posts.find((post) => post.featured) ?? posts[0] ?? null;
  const rest = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;

  const items: BrowserItem[] = rest.map((post) => {
    const card = blogPostCard(post, locale);
    return {
      ...card,
      id: post.id,
      brandSlugs: post.brands.map((brand) => brand.slug),
      pillar: post.pillar,
      topicSlugs: post.topics.map((topic) => topic.slug),
    };
  });

  const brandMap = new Map<string, string>();
  const topicMap = new Map<string, string>();
  const pillarSet = new Set<string>();
  for (const post of posts) {
    post.brands.forEach((brand) => brandMap.set(brand.slug, brand.name));
    post.topics.forEach((topic) => topicMap.set(topic.slug, topic.name));
    if (post.pillar) pillarSet.add(post.pillar);
  }

  const filters = {
    brands: [...brandMap.entries()].map(([value, label]) => ({ value, label })),
    pillars: [...pillarSet].map((value) => ({
      value,
      label: labelFor(pillarLabels, locale, value),
    })),
    topics: [...topicMap.entries()].map(([value, label]) => ({ value, label })),
  };

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Insights", "Analyses")}
        title={l(
          locale,
          "Field notes from the front line of enterprise IT",
          "Notes de terrain au cœur de l'IT d'entreprise",
        )}
        intro={l(
          locale,
          "Architecture guidance, threat analysis and practical playbooks from the teams who design, deploy and support the portfolio.",
          "Conseils d'architecture, analyse des menaces et méthodes concrètes des équipes qui conçoivent, déploient et supportent le portefeuille.",
        )}
      />

      {featured ? (
        <Section tone="white" className="pb-0 sm:pb-0 lg:pb-0">
          <Reveal>
            <div className="grid gap-5">
              <ContentCard item={blogPostCard(featured, locale)} locale={locale} featured />
            </div>
          </Reveal>
        </Section>
      ) : null}

      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "All insights", "Toutes les analyses")}
            title={
              posts.length > 0
                ? l(locale, "Browse the archive", "Parcourir les archives")
                : l(locale, "Insights are coming", "Les analyses arrivent")
            }
            intro={
              posts.length > 0
                ? l(
                    locale,
                    "Filter by brand, pillar or topic to find the analysis closest to your project.",
                    "Filtrez par marque, pilier ou sujet pour trouver l'analyse la plus proche de votre projet.",
                  )
                : l(
                    locale,
                    "Our practice teams are preparing the first articles. They will appear here as they are published.",
                    "Nos équipes préparent les premiers articles. Ils apparaîtront ici dès leur publication.",
                  )
            }
          />
        </Reveal>
        {items.length > 0 ? (
          <Reveal delay={120} className="mt-10">
            <ContentBrowser
              items={items}
              filters={filters}
              locale={locale}
              labels={{
                search: l(locale, "Search insights", "Rechercher une analyse"),
                brand: l(locale, "Brand", "Marque"),
                pillar: l(locale, "Pillar", "Pilier"),
                industry: l(locale, "Industry", "Secteur"),
                topic: l(locale, "Topic", "Sujet"),
                all: l(locale, "All", "Tous"),
                empty: l(locale, "No insights match those filters.", "Aucune analyse ne correspond à ces filtres."),
                more: l(locale, "Load more", "Charger plus"),
              }}
            />
          </Reveal>
        ) : null}
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Put it into practice", "Passer à la pratique")}
        title={l(locale, "Want this applied to your estate?", "Envie d'appliquer cela à votre parc ?")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Talk to the practice", "Parler aux experts")}
        secondaryTo="/case-studies"
        secondaryLabel={l(locale, "Read case studies", "Lire les études de cas")}
      />
    </>
  );
}
