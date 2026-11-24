import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EventsPlaceholder } from "@/components/placeholders";
import { CtaBand } from "@/components/cta-band";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/events",
    title: l(locale, "Events", "Événements"),
    description: l(
      locale,
      "Events participated in and organised by Lithe SD, with photos and short videos.",
      "Les événements suivis et organisés par Lithe SD, avec photos et courtes vidéos.",
    ),
  });
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Events", "Événements")}
        title={l(locale, "Where the channel meets", "Là où le canal se rencontre")}
        intro={l(
          locale,
          "A timeline of the events we participate in and organise — with photos, highlights and short videos.",
          "Une chronologie des événements auxquels nous participons et que nous organisons — photos, temps forts et vidéos.",
        )}
      />

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Timeline", "Chronologie")}
              title={l(locale, "Participated and organised", "Suivis et organisés")}
              intro={l(
                locale,
                "The events timeline is being prepared. Each entry will include the date, city, role and a short video.",
                "La chronologie est en préparation. Chaque entrée inclura la date, la ville, le rôle et une courte vidéo.",
              )}
              dark
            />
          </Reveal>
          <Reveal delay={120}>
            <EventsPlaceholder locale={locale} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Meet us", "Rencontrons-nous")}
        title={l(locale, "Want to meet at the next event?", "Envie de nous rencontrer au prochain événement ?")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Get in touch", "Nous contacter")}
        secondaryTo="/partners"
        secondaryLabel={l(locale, "Partner program", "Programme partenaire")}
      />
    </>
  );
}
