import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/lib/icons";
import { customers, verticals } from "@/lib/content";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/customers",
    title: l(locale, "Customers", "Clients"),
    description: l(
      locale,
      "Lithe SD supports over 1,200 customers across government, banking, healthcare, telecoms, hospitality, datacenters and more.",
      "Lithe SD accompagne plus de 1 200 clients dans le secteur public, la banque, la santé, les télécoms et bien d'autres.",
    ),
  });
}

export default async function CustomersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Customers", "Clients")}
        title={l(locale, "Trusted by the organisations that keep the region running", "La confiance des organisations qui font tourner la région")}
        intro={l(
          locale,
          "Across banking, telecoms, government, healthcare, hospitality and beyond, Lithe SD technology powers businesses throughout the IOC, Africa and Middle East.",
          "Dans la banque, les télécoms, le secteur public, la santé et l'hôtellerie, la technologie Lithe SD soutient les entreprises de la COI, d'Afrique et du Moyen-Orient.",
        )}
      />

      <Section tone="void">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "By the numbers", "En chiffres")}
            title={l(locale, "Scale that partners can rely on", "Une envergure sur laquelle compter")}
            intro={l(
              locale,
              "Deep regional knowledge, a growing channel network and a track record of successful delivery.",
              "Une connaissance approfondie de la région, un réseau en croissance et une expérience éprouvée.",
            )}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <StatBand locale={locale} tone="dark" />
        </Reveal>
      </Section>

      <Section tone="obsidian">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Who we serve", "Qui nous servons")}
            title={l(locale, "Every major sector, one standard of service", "Tous les grands secteurs, un même niveau de service")}
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-white/10 bg-white/5 sm:grid-cols-3 lg:grid-cols-5">
            {verticals.map((vertical) => (
              <div key={vertical.title.en} className="group flex flex-col items-center gap-4 bg-charcoal px-4 py-8 text-center transition-colors hover:bg-white/[0.06]">
                <span className="text-iris-bright transition-transform group-hover:-translate-y-0.5">
                  <Icon name={vertical.icon} className="h-7 w-7" />
                </span>
                <span className="text-sm font-medium text-white">
                  {l(locale, vertical.title.en, vertical.title.fr)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Our customers", "Nos clients")}
              title={l(locale, "Organisations we are proud to support", "Des organisations dont nous sommes fiers")}
              dark
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {customers.map((name) => (
              <div key={name} className="flex h-16 items-center justify-center rounded-card border border-white/10 bg-white/[0.03] px-3 text-center">
                <span className="text-sm text-ash">{name}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Join them", "Rejoignez-les")}
        title={l(locale, "Let's build your next success story", "Construisons votre prochain succès")}
      />
    </>
  );
}
