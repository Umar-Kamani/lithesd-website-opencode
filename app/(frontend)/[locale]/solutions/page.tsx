import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PillarGrid } from "@/components/pillar-grid";
import { Lifecycle } from "@/components/lifecycle";
import { ValueAdd } from "@/components/value-add";
import { CtaBand } from "@/components/cta-band";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/solutions",
    title: locale === "fr" ? "Solutions" : "Solutions",
    description:
      locale === "fr"
        ? "Cybersécurité, infrastructure et cloud, outils métier, observabilité, IA et protection des données."
        : "Cybersecurity, enterprise infrastructure and cloud, business tools, observability, AI and data protection.",
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Solutions", "Solutions")}
        title={l(locale, "Technology that moves your business forward", "La technologie qui fait avancer votre entreprise")}
        intro={l(
          locale,
          "Six pillars of enterprise technology, delivered with the technical depth, commercial flexibility and lifecycle support that System Integrators need to win.",
          "Six piliers technologiques, livrés avec la profondeur technique, la flexibilité commerciale et le support dont les intégrateurs ont besoin.",
        )}
      />

      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Our solution pillars", "Nos piliers de solutions")}
            title={l(locale, "A portfolio spanning the modern IT stack", "Un portefeuille couvrant la pile IT moderne")}
            intro={l(
              locale,
              "Each pillar is backed by certified technical experts and a curated ecosystem of industry-leading vendors.",
              "Chaque pilier s'appuie sur des experts certifiés et un écosystème de marques leaders.",
            )}
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <PillarGrid locale={locale} />
        </Reveal>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "How we support you", "Comment nous vous accompagnons")}
              title={l(locale, "With you from first conversation to long-term success", "À vos côtés du premier échange au succès durable")}
              intro={l(
                locale,
                "A streamlined, partner-centric process that carries a project through every stage — aligned to your teams and your customers.",
                "Un processus simplifié et centré sur le partenaire, aligné sur vos équipes et vos clients.",
              )}
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-14 rounded-panel border border-white/10 bg-white/[0.02] p-7 lg:p-10">
            <Lifecycle locale={locale} />
          </Reveal>
        </div>
      </Section>

      <Section tone="linen">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Beyond the box", "Au-delà du produit")}
            title={l(locale, "Value-added services around every solution", "Des services à valeur ajoutée autour de chaque solution")}
            intro={l(
              locale,
              "We wrap every pillar with the enablement, expertise and presales support that turns products into outcomes.",
              "Chaque pilier est accompagné d'enablement, d'expertise et de support avant-vente.",
            )}
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueAdd locale={locale} />
        </Reveal>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
