import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { BrochureSlot, VideoSlot } from "@/components/placeholders";
import { CtaBand } from "@/components/cta-band";
import { getBrochures } from "@/lib/cms";
import { BrochureCard } from "@/components/brochure-card";
import { href as localeHref, isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/resources",
    title: l(locale, "Resources", "Ressources"),
    description: l(
      locale,
      "Branded brochures, datasheets and videos from the Lithe SD portfolio. Gated downloads captured as leads.",
      "Brochures, fiches techniques et vidéos du portefeuille Lithe SD. Téléchargements soumis à formulaire.",
    ),
  });
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const brochures = await getBrochures(locale);

  const steps = [
    {
      icon: ShieldCheck,
      title: l(locale, "Gated by design", "Soumis à formulaire"),
      body: l(locale, "Every brochure download captures name, company and email as a lead — no third-party redirects.", "Chaque téléchargement capture nom, entreprise et email comme lead — sans redirection externe."),
    },
    {
      icon: FileText,
      title: l(locale, "Branded and current", "De marque et à jour"),
      body: l(locale, "Brand and product brochures are managed in the CMS, so the latest version is always served.", "Les brochures sont gérées dans le CMS, la dernière version est toujours servie."),
    },
    {
      icon: Download,
      title: l(locale, "Instant delivery", "Livraison immédiate"),
      body: l(locale, "A signed, expiring link is issued after submission, with an optional copy by email.", "Un lien signé et expirant est émis après soumission, avec copie par email en option."),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Resources", "Ressources")}
        title={l(locale, "Brochures, datasheets and videos", "Brochures, fiches techniques et vidéos")}
        intro={l(
          locale,
          "Everything your sales team needs to take the portfolio to market — branded, current and ready to share.",
          "Tout ce dont votre équipe commerciale a besoin pour commercialiser le portefeuille — de marque, à jour et prêt à partager.",
        )}
      />

      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Downloads", "Téléchargements")}
            title={l(locale, "Brochures are being prepared", "Les brochures sont en préparation")}
            intro={l(
              locale,
              "The download experience is built and ready. Branded PDFs will appear here once uploaded to the CMS.",
              "L'expérience de téléchargement est prête. Les PDF de marque apparaîtront ici dès leur ajout au CMS.",
            )}
          />
        </Reveal>
        {brochures.length > 0 ? (
          <Reveal delay={120} className="mt-10 grid gap-4 md:grid-cols-2">
            {brochures.map((brochure) => (
              <BrochureCard key={brochure.id} brochure={brochure} locale={locale} />
            ))}
          </Reveal>
        ) : (
          <Reveal delay={120} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <BrochureSlot locale={locale} />
            <BrochureSlot locale={locale} />
            <BrochureSlot locale={locale} />
          </Reveal>
        )}
      </Section>

      <Section tone="linen">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Videos", "Vidéos")}
            title={l(locale, "Short-form product and event videos", "Vidéos courtes produits et événements")}
            intro={l(
              locale,
              "Product walkthroughs and event highlights will live here, managed from the CMS.",
              "Les présentations produits et temps forts d'événements seront gérés depuis le CMS.",
            )}
          />
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-5 md:grid-cols-2">
          <VideoSlot locale={locale} tone="light" />
          <VideoSlot locale={locale} tone="light" />
        </Reveal>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "How it works", "Comment ça marche")}
              title={l(locale, "A download that becomes a relationship", "Un téléchargement qui devient une relation")}
              dark
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-smoke">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-iris text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-[17px] font-medium text-white">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ash">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Editorial", "Éditorial")}
            title={l(locale, "Read before you shortlist", "À lire avant de présélectionner")}
            intro={l(
              locale,
              "Case studies show what changed in the field. Insights explain the design decisions behind it.",
              "Les études de cas montrent ce qui a changé sur le terrain. Les analyses expliquent les choix de conception.",
            )}
          />
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              to: "/case-studies",
              eyebrow: l(locale, "Case studies", "Études de cas"),
              title: l(locale, "Deployments, constraints and measured outcomes", "Déploiements, contraintes et résultats mesurés"),
              body: l(
                locale,
                "Filter by industry or brand to find an environment close to your own.",
                "Filtrez par secteur ou marque pour trouver un environnement proche du vôtre.",
              ),
            },
            {
              to: "/insights",
              eyebrow: l(locale, "Insights", "Analyses"),
              title: l(locale, "Architecture guidance from the practice teams", "Conseils d'architecture des équipes"),
              body: l(
                locale,
                "Threat analysis, platform comparisons and practical playbooks.",
                "Analyse des menaces, comparaisons de plateformes et méthodes concrètes.",
              ),
            },
          ].map((item) => (
            <Link
              key={item.to}
              href={localeHref(locale, item.to)}
              className="group flex flex-col rounded-card border border-void/10 bg-white p-7 transition-colors hover:border-iris/40"
            >
              <span className="text-[10px] uppercase tracking-[0.14em] text-iris">
                {item.eyebrow}
              </span>
              <h3 className="mt-3 text-heading-sm font-medium text-void">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body-light">{item.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-iris">
                {l(locale, "Explore", "Explorer")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Need something specific?", "Besoin d'un document précis ?")}
        title={l(locale, "Request a datasheet or briefing", "Demandez une fiche technique ou un briefing")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Request a document", "Demander un document")}
        secondaryTo="/brands"
        secondaryLabel={l(locale, "Browse brands", "Parcourir les marques")}
      />
    </>
  );
}
