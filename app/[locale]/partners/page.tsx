import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Lifecycle } from "@/components/lifecycle";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Icon } from "@/lib/icons";
import { comparison, litheProtect, whyPartner } from "@/lib/content";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/partners",
    title: l(locale, "Partners", "Partenaires"),
    description: l(
      locale,
      "The LithePROTECT partner program: vendor-independent deal registration, training, incentives and dedicated channel support.",
      "Le programme partenaire LithePROTECT : enregistrement d'affaires indépendant, formation, incitations et support canal dédié.",
    ),
  });
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Partners", "Partenaires")}
        title={l(locale, "A partnership model built to protect your margin", "Un modèle de partenariat qui protège vos marges")}
        intro={l(
          locale,
          "Lithe SD goes to market exclusively through our partner network. LithePROTECT™ is how we make that partnership worth your while.",
          "Lithe SD va au marché exclusivement via son réseau de partenaires. LithePROTECT™ rend ce partenariat rentable.",
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
              <article key={item.title.en} className="flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-7">
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

      <Section tone="white">
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
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="flex flex-col gap-3">
              {whyPartner.map((item) => (
                <li key={item.en} className="flex items-start gap-4 rounded-card border border-void/10 bg-white p-5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-iris text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-void">{l(locale, item.en, item.fr)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="linen">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "The Lithe SD difference", "La différence Lithe SD")}
            title={l(locale, "Traditional distribution, versus a true growth partner", "Distribution traditionnelle ou véritable partenaire de croissance")}
          />
        </Reveal>
        <Reveal delay={120} className="mt-10 overflow-hidden rounded-card border border-void/10">
          <div className="grid grid-cols-2">
            <div className="border-r border-void/10 bg-linen px-4 py-4 sm:px-6">
              <h3 className="text-sm font-medium text-iron">{l(locale, "Traditional distributor", "Distributeur traditionnel")}</h3>
            </div>
            <div className="bg-iris px-4 py-4 sm:px-6">
              <h3 className="text-sm font-medium text-white">Lithe SD</h3>
            </div>
          </div>
          {comparison.map((row) => (
            <div key={row.traditional.en} className="grid grid-cols-2 border-t border-void/10">
              <div className="border-r border-void/10 bg-white px-4 py-5 sm:px-6">
                <p className="text-sm leading-snug text-iron">{l(locale, row.traditional.en, row.traditional.fr)}</p>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <p className="text-sm font-medium leading-snug text-void">{l(locale, row.lithe.en, row.lithe.fr)}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-sm italic text-iron">
          {l(
            locale,
            "We work closely with partners throughout the full engagement lifecycle — from first sales conversation to long-term success.",
            "Nous travaillons étroitement avec les partenaires sur tout le cycle — du premier échange au succès durable.",
          )}
        </p>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "How we support you", "Comment nous vous accompagnons")}
            title={l(locale, "Support across the entire lifecycle", "Un support sur tout le cycle de vie")}
          />
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <Lifecycle locale={locale} tone="light" />
        </Reveal>
      </Section>

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
