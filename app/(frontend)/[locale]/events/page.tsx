import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Video } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { getEvents, type CmsEvent } from "@/lib/cms";
import { href as localeHref, isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/events",
    title: l(locale, "Events", "Événements"),
    description: l(
      locale,
      "Upcoming and past Lithe SD events across the IOC, East Africa and the Middle East. Register online and get a calendar invite.",
      "Événements Lithe SD à venir et passés dans la COI, en Afrique de l'Est et au Moyen-Orient. Inscription en ligne et invitation calendrier.",
    ),
  });
}

function eventDate(event: CmsEvent) {
  return event.startAt || event.date;
}

function EventCard({ event, locale }: { event: CmsEvent; locale: Locale }) {
  const date = new Date(eventDate(event));
  const valid = !Number.isNaN(date.getTime());
  // eslint-disable-next-line react-hooks/purity
  const upcoming = valid && date.getTime() >= Date.now();
  const dateLabel = valid
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date)
    : event.date;

  return (
    <Link
      href={localeHref(locale, `/events/${event.slug}`)}
      className="group flex flex-col rounded-card border border-white/10 bg-charcoal p-6 transition-colors hover:border-iris/50"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-iris-bright">
          <CalendarDays className="h-3.5 w-3.5" />
          {dateLabel}
        </span>
        <span className="rounded-pill border border-white/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-smoke">
          {event.format === "virtual"
            ? l(locale, "Virtual", "Virtuel")
            : event.format === "hybrid"
              ? l(locale, "Hybrid", "Hybride")
              : l(locale, "In person", "Présentiel")}
        </span>
      </div>

      <h3 className="mt-4 font-display text-heading-sm font-medium text-white">{event.title}</h3>

      {event.location || event.venueName ? (
        <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-smoke">
          <MapPin className="h-3.5 w-3.5" />
          {event.venueName || event.location}
        </p>
      ) : null}

      {event.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ash">{event.description}</p>
      ) : null}

      <span className="mt-5 inline-flex items-center gap-2 border-t border-white/8 pt-4 text-sm font-medium text-white">
        {upcoming && event.registrationEnabled
          ? l(locale, "Register", "S'inscrire")
          : l(locale, "View event", "Voir l'événement")}
        <ArrowUpRight className="h-4 w-4 text-iris-bright transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const events = await getEvents(locale);

  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const upcoming = events
    .filter((event) => {
      const time = new Date(eventDate(event)).getTime();
      return Number.isNaN(time) || time >= now;
    })
    .sort((a, b) => new Date(eventDate(a)).getTime() - new Date(eventDate(b)).getTime());
  const past = events
    .filter((event) => {
      const time = new Date(eventDate(event)).getTime();
      return !Number.isNaN(time) && time < now;
    })
    .sort((a, b) => new Date(eventDate(b)).getTime() - new Date(eventDate(a)).getTime());

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Events", "Événements")}
        title={l(locale, "Where the channel meets", "Là où le canal se rencontre")}
        intro={l(
          locale,
          "Briefings, roundtables and partner sessions across the IOC, East Africa and the Middle East. Register online and we will send the calendar invite.",
          "Briefings, tables rondes et sessions partenaires dans la COI, en Afrique de l'Est et au Moyen-Orient. Inscrivez-vous et recevez l'invitation calendrier.",
        )}
      />

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Upcoming", "À venir")}
              title={l(locale, "What's next", "Les prochains rendez-vous")}
              intro={l(
                locale,
                "Register in a minute. Confirmation and calendar invite arrive by email.",
                "Inscription en une minute. Confirmation et invitation calendrier par email.",
              )}
              dark
            />
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          ) : (
            <Reveal delay={120} className="mt-10 rounded-card border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <CalendarDays className="mx-auto h-6 w-6 text-iris-bright" />
              <p className="mt-4 text-sm text-ash">
                {l(
                  locale,
                  "No events are scheduled right now. Join our mailing list by contacting the team and we will let you know first.",
                  "Aucun événement n'est programmé pour le moment. Contactez l'équipe pour être informé en priorité.",
                )}
              </p>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-iris-bright hover:text-white"
              >
                {l(locale, "Get notified", "Être informé")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          )}
        </div>
      </Section>

      {past.length > 0 ? (
        <Section tone="obsidian">
          <Reveal>
            <SectionHeading
              eyebrow={l(locale, "Past events", "Événements passés")}
              title={l(locale, "Where we have been", "Où nous étions")}
              dark
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="void">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-panel border border-white/10 bg-charcoal p-8 sm:flex-row sm:items-center lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                <Video className="h-3.5 w-3.5" />
                {l(locale, "Partner sessions", "Sessions partenaires")}
              </span>
              <h2 className="mt-3 text-heading-sm font-medium text-white">
                {l(locale, "Want a private briefing for your team?", "Une session privée pour votre équipe ?")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-ash">
                {l(
                  locale,
                  "We run vendor-led technical sessions for partners and their customers, on-site or virtual.",
                  "Nous organisons des sessions techniques avec les éditeurs pour les partenaires et leurs clients, sur site ou à distance.",
                )}
              </p>
            </div>
            <Link
              href={localeHref(locale, "/contact")}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-pill bg-iris px-6 text-sm font-medium text-white transition-colors hover:bg-iris-bright"
            >
              {l(locale, "Request a briefing", "Demander une session")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
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
