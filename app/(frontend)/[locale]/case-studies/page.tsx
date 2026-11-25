import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContentBrowser, type BrowserItem } from "@/components/content-browser";
import { ContentCard } from "@/components/content-card";
import { CtaBand } from "@/components/cta-band";
import { getCaseStudies } from "@/lib/cms-content";
import { caseStudyCard } from "@/lib/content-view";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { industryLabels, labelFor, pillarLabels } from "@/lib/taxonomy";
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
    path: "/case-studies",
    title: l(locale, "Case studies", "Études de cas"),
    description: l(
      locale,
      "How organisations across banking, logistics, healthcare and the public sector solved real infrastructure and security problems with Lithe SD.",
      "Comment des organisations de la banque, la logistique, la santé et le secteur public ont résolu de vrais problèmes d'infrastructure et de sécurité avec Lithe SD.",
    ),
  });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const studies = await getCaseStudies(locale);

  const featured = studies.find((study) => study.featured) ?? studies[0] ?? null;
  const rest = featured
    ? studies.filter((study) => study.slug !== featured.slug)
    : studies;

  const items: BrowserItem[] = rest.map((study) => {
    const card = caseStudyCard(study, locale);
    return {
      ...card,
      id: study.id,
      brandSlugs: study.brands.map((brand) => brand.slug),
      pillar: study.pillar,
      industry: study.industry,
      topicSlugs: study.topics.map((topic) => topic.slug),
    };
  });

  const brandMap = new Map<string, string>();
  const industrySet = new Set<string>();
  const pillarSet = new Set<string>();
  for (const study of studies) {
    study.brands.forEach((brand) => brandMap.set(brand.slug, brand.name));
    if (study.industry) industrySet.add(study.industry);
    if (study.pillar) pillarSet.add(study.pillar);
  }

  const filters = {
    brands: [...brandMap.entries()].map(([value, label]) => ({ value, label })),
    pillars: [...pillarSet].map((value) => ({
      value,
      label: labelFor(pillarLabels, locale, value),
    })),
    industries: [...industrySet].map((value) => ({
      value,
      label: labelFor(industryLabels, locale, value),
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Case studies", "Études de cas")}
        title={l(
          locale,
          "What changed, and what it took",
          "Ce qui a changé, et comment",
        )}
        intro={l(
          locale,
          "Real deployments across the IOC, East Africa and the Middle East — the constraints, the design decisions and the measurable outcomes.",
          "Des déploiements réels dans la COI, en Afrique de l'Est et au Moyen-Orient — contraintes, choix de conception et résultats mesurables.",
        )}
      />

      {featured ? (
        <Section tone="void" className="pb-0 sm:pb-0 lg:pb-0">
          <Reveal>
            <div className="grid gap-5">
              <ContentCard item={caseStudyCard(featured, locale)} locale={locale} tone="dark" featured />
            </div>
          </Reveal>
        </Section>
      ) : null}

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "The archive", "Les archives")}
            title={
              studies.length > 0
                ? l(locale, "Browse by industry or brand", "Parcourir par secteur ou marque")
                : l(locale, "Case studies are coming", "Les études de cas arrivent")
            }
            intro={
              studies.length > 0
                ? l(
                    locale,
                    "Filter to find a deployment that resembles your own environment.",
                    "Filtrez pour trouver un déploiement proche de votre environnement.",
                  )
                : l(
                    locale,
                    "We are preparing the first published stories. They will appear here as customers approve them.",
                    "Nous préparons les premiers récits. Ils apparaîtront ici dès validation par les clients.",
                  )
            }
            dark
          />
        </Reveal>
        {items.length > 0 ? (
          <Reveal delay={120} className="mt-10">
            <ContentBrowser
              items={items}
              filters={filters}
              locale={locale}
              labels={{
                search: l(locale, "Search case studies", "Rechercher une étude de cas"),
                brand: l(locale, "Brand", "Marque"),
                pillar: l(locale, "Pillar", "Pilier"),
                industry: l(locale, "Industry", "Secteur"),
                topic: l(locale, "Topic", "Sujet"),
                all: l(locale, "All", "Tous"),
                empty: l(locale, "No case studies match those filters.", "Aucune étude ne correspond à ces filtres."),
                more: l(locale, "Load more", "Charger plus"),
              }}
            />
          </Reveal>
        ) : null}
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Your outcome next", "Votre résultat ensuite")}
        title={l(locale, "Bring us your constraints", "Apportez-nous vos contraintes")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Talk to us", "Parlons-en")}
        secondaryTo="/insights"
        secondaryLabel={l(locale, "Read insights", "Lire les analyses")}
      />
    </>
  );
}
