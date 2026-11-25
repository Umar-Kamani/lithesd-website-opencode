import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ServiceGrid } from "@/components/service-grid";
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
    path: "/services",
    title: locale === "fr" ? "Services" : "Services",
    description:
      locale === "fr"
        ? "Réponse aux incidents, investigation numérique, chasse aux menaces, évaluation des vulnérabilités, déploiement, conformité, ISO et audits."
        : "Incident response, cyber forensics, threat hunting, vulnerability assessment, deployment, compliance, ISO and audits.",
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Services", "Services")}
        title={l(locale, "Expertise you can put in front of your customers", "Une expertise à mettre devant vos clients")}
        intro={l(
          locale,
          "From assessment and response to deployment, compliance and audit — our professional services extend what your team can deliver, without adding headcount.",
          "De l'évaluation à la réponse, du déploiement à la conformité et à l'audit — nos services étendent ce que votre équipe peut livrer.",
        )}
      />

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Professional services", "Services professionnels")}
            title={l(locale, "Certified expertise, on demand", "Une expertise certifiée, à la demande")}
            intro={l(
              locale,
              "Eight services that let partners deliver more — with certified specialists behind every engagement.",
              "Huit services qui permettent aux partenaires d'en faire plus, avec des spécialistes certifiés.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ServiceGrid locale={locale} tone="dark" />
        </Reveal>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "How we support you", "Comment nous vous accompagnons")}
              title={l(locale, "Support across the entire lifecycle", "Un support sur tout le cycle de vie")}
              intro={l(
                locale,
                "Pre-sales, sales, implementation and post-sales — we are with you from first conversations to long-term customer success.",
                "Avant-vente, ventes, mise en œuvre et après-vente — à vos côtés du premier échange au succès durable.",
              )}
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <Lifecycle locale={locale} />
          </Reveal>
        </div>
      </Section>

      <Section tone="obsidian">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Enablement", "Enablement")}
            title={l(locale, "More than a service desk", "Plus qu'un service desk")}
            intro={l(
              locale,
              "Training, presales, market insight and a partner program designed to make your practice more capable and more profitable.",
              "Formation, avant-vente, vision marché et un programme partenaire conçu pour rendre votre pratique plus performante.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueAdd locale={locale} tone="dark" />
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Talk to our team", "Parlez à notre équipe")}
        title={l(locale, "Bring our specialists into your next deal", "Impliquez nos spécialistes dans votre prochaine affaire")}
      />
    </>
  );
}
