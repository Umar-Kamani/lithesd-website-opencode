import type { Metadata } from "next";
import { ArrowRight, Check, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Lifecycle } from "@/components/lifecycle";
import { PillarGrid } from "@/components/pillar-grid";
import { ValueAdd } from "@/components/value-add";
import { RelatedContent } from "@/components/related-content";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Icon } from "@/lib/icons";
import { comparison, litheProtect, whyPartner } from "@/lib/content";
import { getCaseStudies } from "@/lib/cms-content";
import { caseStudyCard } from "@/lib/content-view";
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
    path: "/partners",
    title: l(locale, "Partners", "Partenaires"),
    description: l(
      locale,
      "The LithePROTECT partner program: vendor-independent deal registration, training, incentives, lifecycle support and a partner portal coming soon.",
      "Le programme partenaire LithePROTECT : enregistrement d'affaires indépendant, formation, incitations, support et un portail partenaire à venir.",
    ),
  });
}

const joinSteps = [
  {
    en: "Apply",
    fr: "Candidater",
    bodyEn: "Tell us about your business, your customers and the technologies you want to add.",
    bodyFr: "Parlez-nous de votre activité, de vos clients et des technologies à ajouter.",
  },
  {
    en: "Onboard",
    fr: "Intégrer",
    bodyEn: "We agree the model, set up your account and introduce your named channel team.",
    bodyFr: "Nous définissons le modèle, ouvrons votre compte et présentons votre équipe canal dédiée.",
  },
  {
    en: "Enable",
    fr: "Former",
    bodyEn: "Certification paths, presales support and demo access across the portfolio.",
    bodyFr: "Parcours de certification, support avant-vente et accès aux démonstrations.",
  },
  {
    en: "Sell",
    fr: "Vendre",
    bodyEn: "Deal registration, protected margin and post-sales escalation when you need it.",
    bodyFr: "Enregistrement d'affaires, marge protégée et escalade après-vente si nécessaire.",
  },
];

const portalFeatures = [
  { en: "Deal registration", fr: "Enregistrement d'affaires" },
  { en: "Collateral and brochure library", fr: "Bibliothèque de documents" },
  { en: "Training and certification paths", fr: "Formation et certification" },
  { en: "Pipeline and quote visibility", fr: "Visibilité pipeline et devis" },
  { en: "Support tickets and escalation", fr: "Tickets de support et escalade" },
];

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const studies = (await getCaseStudies(locale)).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Partners", "Partenaires")}
        title={l(locale, "A partnership model built to protect your margin", "Un modèle de partenariat qui protège vos marges")}
        intro={l(
          locale,
          "Lithe SD goes to market exclusively through our partner network. Everything we build — programs, enablement, support — is designed to make that partnership worth your while.",
          "Lithe SD va au marché exclusivement via son réseau de partenaires. Tout ce que nous construisons — programmes, enablement, support — vise à rendre ce partenariat rentable.",
        )}
      >
        <Button locale={locale} to="/contact" size="lg">
          {l(locale, "Join the program", "Rejoindre le programme")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "LithePROTECT™ partner program", "Programme partenaire LithePROTECT™")}
              title={l(locale, "Empowering partners, together", "Faire grandir les partenaires, ensemble")}
              intro={l(
                locale,
                "Vendor-independent deal registration, comprehensive training and lucrative incentives — designed for mutual, long-term success.",
                "Enregistrement d'affaires indépendant, formation complète et incitations attractives — pensés pour un succès mutuel.",
              )}
              dark
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {litheProtect.map((item) => (
              <article key={item.title.en} className="flex flex-col rounded-card border border-white/10 bg-charcoal p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-iris text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-[17px] font-medium text-white">
                  {l(locale, item.title.en, item.title.fr)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {l(locale, item.summary.en, item.summary.fr)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="obsidian">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Why partner with Lithe SD", "Pourquoi devenir partenaire")}
              title={l(locale, "We help our partners grow", "Nous aidons nos partenaires à grandir")}
              intro={l(
                locale,
                "From portfolio expansion to recurring revenue, everything we do is designed to make your business more capable and more profitable.",
                "De l'élargissement du portefeuille aux revenus récurrents, tout est conçu pour rendre votre entreprise plus performante.",
              )}
              dark
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="flex flex-col gap-3">
              {whyPartner.map((item) => (
                <li key={item.en} className="flex items-start gap-4 rounded-card border border-white/10 bg-white/[0.03] p-5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-iris text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-frost">{l(locale, item.en, item.fr)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "The Lithe SD difference", "La différence Lithe SD")}
              title={l(locale, "Traditional distribution, versus a true growth partner", "Distribution traditionnelle ou véritable partenaire de croissance")}
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-10 overflow-hidden rounded-card border border-white/10">
            <div className="grid grid-cols-2">
              <div className="border-r border-white/10 bg-white/[0.02] px-4 py-4 sm:px-6">
                <h3 className="text-sm font-medium text-iron">{l(locale, "Traditional distributor", "Distributeur traditionnel")}</h3>
              </div>
              <div className="bg-iris px-4 py-4 sm:px-6">
                <h3 className="text-sm font-medium text-white">Lithe SD</h3>
              </div>
            </div>
            {comparison.map((row) => (
              <div key={row.traditional.en} className="grid grid-cols-2 border-t border-white/10">
                <div className="border-r border-white/10 bg-white/[0.02] px-4 py-5 sm:px-6">
                  <p className="text-sm leading-snug text-smoke">{l(locale, row.traditional.en, row.traditional.fr)}</p>
                </div>
                <div className="bg-white/[0.04] px-4 py-5 sm:px-6">
                  <p className="text-sm font-medium leading-snug text-white">{l(locale, row.lithe.en, row.lithe.fr)}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="obsidian">
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
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "What you can sell", "Ce que vous pouvez vendre")}
              title={l(locale, "A portfolio spanning the modern IT stack", "Un portefeuille couvrant la pile IT moderne")}
              intro={l(
                locale,
                "Six pillars, each backed by certified technical experts and a curated ecosystem of specialist vendors.",
                "Six piliers, chacun soutenu par des experts certifiés et un écosystème de marques spécialisées.",
              )}
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <PillarGrid locale={locale} tone="dark" />
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <Button locale={locale} to="/brands" variant="ghost">
              {l(locale, "Explore the portfolio", "Découvrir le portefeuille")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section tone="obsidian">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Beyond the box", "Au-delà du produit")}
            title={l(locale, "Value-added services around every solution", "Des services à valeur ajoutée autour de chaque solution")}
            intro={l(
              locale,
              "We wrap every pillar with the enablement, expertise and presales support that turns products into outcomes.",
              "Chaque pilier est accompagné d'enablement, d'expertise et de support avant-vente.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueAdd locale={locale} tone="dark" />
        </Reveal>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "How to join", "Comment rejoindre")}
              title={l(locale, "Four steps to a working partnership", "Quatre étapes vers un partenariat actif")}
              dark
            />
          </Reveal>
          <Reveal delay={120} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {joinSteps.map((step, index) => (
              <article key={step.en} className="flex flex-col rounded-card border border-white/10 bg-charcoal p-6">
                <span className="text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[17px] font-medium text-white">{l(locale, step.en, step.fr)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{l(locale, step.bodyEn, step.bodyFr)}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="obsidian">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel border border-white/10 bg-charcoal p-8 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] glow-ember opacity-50" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-iris/40 bg-iris/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                  <Clock className="h-3 w-3" />
                  {l(locale, "Coming soon", "Bientôt disponible")}
                </span>
                <h2 className="mt-5 text-heading font-medium text-white">
                  {l(locale, "The Lithe SD partner portal", "Le portail partenaire Lithe SD")}
                </h2>
                <p className="mt-4 max-w-xl text-body leading-relaxed text-ash">
                  {l(
                    locale,
                    "One place to register deals, pull collateral, book training and follow your pipeline. We are building it now — your channel team will onboard you when it opens.",
                    "Un seul endroit pour enregistrer vos affaires, récupérer vos documents, réserver vos formations et suivre votre pipeline. Nous le construisons — votre équipe canal vous accompagnera à l'ouverture.",
                  )}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {portalFeatures.map((feature) => (
                  <li key={feature.en} className="flex items-center gap-3 rounded-card border border-white/8 bg-white/[0.03] px-4 py-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-iris/20 text-iris-bright">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-frost">{l(locale, feature.en, feature.fr)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <RelatedContent
        locale={locale}
        eyebrow={l(locale, "Proof, not promises", "Des preuves, pas des promesses")}
        title={l(locale, "What partners have delivered", "Ce que nos partenaires ont livré")}
        items={studies.map((study) => caseStudyCard(study, locale))}
        tone="void"
      />

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Let's talk", "Parlons-en")}
        title={l(locale, "Become a Lithe SD partner", "Devenez partenaire Lithe SD")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Apply to join", "Candidater")}
      />
    </>
  );
}
