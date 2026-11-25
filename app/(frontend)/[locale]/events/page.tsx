import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EventsPlaceholder } from "@/components/placeholders";
import { getEvents } from "@/lib/cms";
import { ArrowUpRight } from "lucide-react";
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
  const events = await getEvents(locale);

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
            {events.length > 0 ? (
              <ol className="relative flex flex-col gap-5 border-l border-white/10 pl-6">
                {events.map((event) => (
                  <li key={event.id} className="relative rounded-card border border-white/10 bg-white/[0.03] p-5">
                    <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full bg-iris" />
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-iron">
                      <span>{new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(event.date))}</span>
                      <span>·</span>
                      <span>
                        {event.type === "organised"
                          ? l(locale, "Organised", "Organisé")
                          : l(locale, "Participated", "Suivi")}
                      </span>
                      {event.location ? (
                        <>
                          <span>·</span>
                          <span>{event.location}</span>
                        </>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-heading-sm font-medium text-white">{event.title}</h3>
                    {event.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-ash">{event.description}</p>
                    ) : null}
                    {event.videoUrl ? (
                      <a
                        href={event.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm text-iris-bright transition-colors hover:text-white"
                      >
                        {l(locale, "Watch the video", "Voir la vidéo")}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <EventsPlaceholder locale={locale} />
            )}
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
