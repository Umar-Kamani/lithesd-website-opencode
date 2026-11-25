import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { OfficeCards } from "@/components/office-cards";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Icon } from "@/lib/icons";
import { about, values, whyPartner } from "@/lib/content";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/about",
    title: locale === "fr" ? "À propos" : "About us",
    description:
      locale === "fr"
        ? "Lithe Solutions Distributor Ltd est un distributeur à valeur ajoutée de solutions dans la COI, en Afrique et au Moyen-Orient."
        : "Lithe Solutions Distributor Ltd is a solutions value-added distributor operating in the IOC, Africa and Middle East.",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const purpose = [
    { label: l(locale, "Vision", "Vision"), body: about.vision },
    { label: l(locale, "Mission", "Mission"), body: about.mission },
    { label: l(locale, "Our process", "Notre processus"), body: about.process },
  ];

  return (
    <>
      <PageHero
        eyebrow={l(locale, "About Lithe SD", "À propos de Lithe SD")}
        title={l(locale, "A more flexible approach to technology distribution", "Une approche plus flexible de la distribution technologique")}
        intro={l(
          locale,
          "We partner with System Integrators across the entire sales, design, implementation and support lifecycle — ensuring successful, measurable customer outcomes.",
          "Nous accompagnons les intégrateurs sur tout le cycle de vente, de conception, de mise en œuvre et de support — pour des résultats mesurables.",
        )}
      />

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Who we are", "Qui sommes-nous")}
              title={l(locale, "Distribution, reimagined around the partner", "La distribution repensée autour du partenaire")}
              dark
            />
            <div className="mt-6 flex flex-col gap-4 text-body leading-relaxed text-ash">
              {about.intro.map((paragraph) => (
                <p key={paragraph.en}>{l(locale, paragraph.en, paragraph.fr)}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <StatBand locale={locale} tone="dark" />
            <div className="rounded-card border border-white/10 bg-charcoal p-6">
              <p className="text-sm leading-relaxed text-ash">
                {l(
                  locale,
                  "Every System Integrator has unique strengths — and we tailor our engagement to complement and amplify yours.",
                  "Chaque intégrateur a ses forces — et nous adaptons notre engagement pour les compléter et les amplifier.",
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Our purpose", "Notre raison d'être")}
              title={l(locale, "Vision, mission and the way we work", "Vision, mission et méthode")}
              dark
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {purpose.map((item) => (
              <div key={item.label} className="flex flex-col gap-4 rounded-card border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-heading-sm font-medium text-white">{item.label}</h3>
                <p className="text-sm leading-relaxed text-ash">{l(locale, item.body.en, item.body.fr)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Our values", "Nos valeurs")}
            title={l(locale, "The principles behind every partnership", "Les principes derrière chaque partenariat")}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title.en} className="flex flex-col rounded-card border border-white/10 bg-charcoal p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-iris-bright">
                  <Icon name={value.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[16px] font-medium text-white">
                  {l(locale, value.title.en, value.title.fr)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ash">
                  {l(locale, value.summary.en, value.summary.fr)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="obsidian">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Why partner with us", "Pourquoi nous choisir")}
              title={l(locale, "What partners gain when they work with Lithe SD", "Ce que les partenaires gagnent avec Lithe SD")}
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
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Locations", "Implantations")}
            title="IOC · East Africa · Middle East"
            intro={l(locale, "Local teams, regional reach and support that meets you where you are.", "Des équipes locales et un support au plus près de vous.")}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <OfficeCards locale={locale} />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button locale={locale} to="/contact" variant="ghost">
            {l(locale, "Get in touch", "Nous contacter")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
