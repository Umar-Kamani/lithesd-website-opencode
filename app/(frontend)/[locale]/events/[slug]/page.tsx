import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, CalendarPlus, ChevronRight, Clock, MapPin, Users, Video } from "lucide-react";
import { ContentCover } from "@/components/content-cover";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { getEvents } from "@/lib/cms";
import { formatDate } from "@/lib/cms-content";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site, siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const events = await getEvents("en");
  return locales.flatMap((locale) => events.map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const event = (await getEvents(locale)).find((item) => item.slug === slug);
  if (!event) return {};
  return pageMetadata({
    locale,
    path: `/events/${event.slug}`,
    title: event.title,
    description: event.description,
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const event = (await getEvents(locale)).find((item) => item.slug === slug);
  if (!event) notFound();

  const start = new Date(event.startAt);
  const end = event.endAt ? new Date(event.endAt) : null;
  const valid = !Number.isNaN(start.getTime());
  const dateLabel = valid
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(start)
    : formatDate(event.date, locale);
  const timeLabel = valid
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
        timeZone: event.timezone || "UTC",
      }).format(start)
    : "";
  const endLabel =
    end && !Number.isNaN(end.getTime())
      ? new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
          timeZone: event.timezone || "UTC",
        }).format(end)
      : "";

  const deadlinePassed =
    Boolean(event.registrationDeadline) &&
    new Date(event.registrationDeadline) < new Date();
  const closed = !event.registrationEnabled || deadlinePassed;
  const icsHref = localeHref(locale, `/events/${event.slug}/calendar.ics`);
  const url = `${siteUrl}${locale === "fr" ? "/fr" : ""}/events/${event.slug}`;
  const venue = [event.venueName, event.venueAddress, event.location].filter(Boolean).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || event.title,
    startDate: event.startAt,
    endDate: event.endAt || undefined,
    eventAttendanceMode:
      event.format === "virtual"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.format === "hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location:
      event.format === "virtual"
        ? { "@type": "VirtualLocation", url: event.virtualUrl || url }
        : { "@type": "Place", name: event.venueName || event.location, address: event.venueAddress },
    image: event.coverImage ? [event.coverImage] : undefined,
    url,
    organizer: { "@type": "Organization", name: site.name, url: siteUrl },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden border-b border-white/8 bg-void pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] glow-iris opacity-70" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] glow-ember opacity-40" />
        <div className="relative mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-iron">
            <Link href={localeHref(locale, "/")} className="hover:text-white">
              {l(locale, "Home", "Accueil")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={localeHref(locale, "/events")} className="hover:text-white">
              {l(locale, "Events", "Événements")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-ash">{event.title}</span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-pill border border-iris/40 bg-iris/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-iris-bright">
                  {event.type === "organised"
                    ? l(locale, "Organised by Lithe SD", "Organisé par Lithe SD")
                    : l(locale, "Participating", "Participation")}
                </span>
                <span className="rounded-pill border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-smoke">
                  {event.format === "virtual"
                    ? l(locale, "Virtual", "Virtuel")
                    : event.format === "hybrid"
                      ? l(locale, "Hybrid", "Hybride")
                      : l(locale, "In person", "Présentiel")}
                </span>
              </div>

              <h1 className="mt-4 text-display-sm font-medium text-white">{event.title}</h1>
              {event.description ? (
                <p className="mt-4 max-w-2xl text-lead text-ash">{event.description}</p>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-smoke">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-iris-bright" />
                  {dateLabel}
                </span>
                {timeLabel ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-iris-bright" />
                    {timeLabel}
                    {endLabel ? ` – ${endLabel}` : ""}
                  </span>
                ) : null}
                {venue ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-iris-bright" />
                    {venue}
                  </span>
                ) : null}
              </div>
            </div>

            <ContentCover
              src={event.coverImage}
              label={event.location || l(locale, "Lithe SD event", "Événement Lithe SD")}
              priority
              className="hidden lg:block"
            />
          </div>
        </div>
      </header>

      <Section tone="void">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="min-w-0">
            {event.agenda.length > 0 ? (
              <Reveal>
                <h2 className="text-heading-sm font-medium text-white">
                  {l(locale, "Agenda", "Programme")}
                </h2>
                <ol className="mt-5 flex flex-col gap-3">
                  {event.agenda.map((item, index) => (
                    <li key={`${item.title}-${index}`} className="rounded-card border border-white/10 bg-charcoal p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-[15px] font-medium text-white">{item.title}</h3>
                        {item.time ? (
                          <span className="text-[11px] uppercase tracking-[0.1em] text-iris-bright">{item.time}</span>
                        ) : null}
                      </div>
                      {item.detail ? <p className="mt-2 text-sm leading-relaxed text-ash">{item.detail}</p> : null}
                    </li>
                  ))}
                </ol>
              </Reveal>
            ) : null}

            {event.speakers.length > 0 ? (
              <Reveal className="mt-12">
                <h2 className="text-heading-sm font-medium text-white">
                  {l(locale, "Speakers", "Intervenants")}
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.name} className="flex items-center gap-4 rounded-card border border-white/10 bg-charcoal p-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-iris/15 font-display text-sm text-iris-bright">
                        {speaker.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={speaker.photo} alt="" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          speaker.name.slice(0, 1)
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{speaker.name}</p>
                        {speaker.role ? <p className="text-xs text-smoke">{speaker.role}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal className="mt-12">
              <h2 className="text-heading-sm font-medium text-white">
                {l(locale, "Register", "Inscription")}
              </h2>
              <p className="mt-2 text-sm text-ash">
                {closed
                  ? l(locale, "Registration for this event is closed.", "Les inscriptions pour cet événement sont closes.")
                  : l(locale, "Places are confirmed by email with a calendar invite.", "Les places sont confirmées par email avec une invitation calendrier.")}
              </p>
              <div className="mt-6">
                <EventRegistrationForm
                  eventId={event.id}
                  locale={locale}
                  closed={closed}
                  confirmationMessage={event.confirmationMessage}
                  icsHref={icsHref}
                />
              </div>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-card border border-white/10 bg-charcoal p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-iron">
                {l(locale, "Event details", "Détails")}
              </p>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-iron">{l(locale, "Date", "Date")}</dt>
                  <dd className="mt-0.5 text-white">{dateLabel}</dd>
                </div>
                {timeLabel ? (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-iron">{l(locale, "Time", "Heure")}</dt>
                    <dd className="mt-0.5 text-white">
                      {timeLabel}
                      {endLabel ? ` – ${endLabel}` : ""}
                      <span className="ml-1 text-xs text-smoke">({event.timezone})</span>
                    </dd>
                  </div>
                ) : null}
                {venue ? (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-iron">{l(locale, "Location", "Lieu")}</dt>
                    <dd className="mt-0.5 text-white">{venue}</dd>
                  </div>
                ) : null}
                {event.virtualUrl ? (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-iron">{l(locale, "Join link", "Lien de connexion")}</dt>
                    <dd className="mt-0.5">
                      <a href={event.virtualUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-iris-bright hover:text-white">
                        <Video className="h-3.5 w-3.5" />
                        {l(locale, "Open link", "Ouvrir le lien")}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <a
                href={icsHref}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-pill border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-iris-bright hover:text-iris-bright"
              >
                <CalendarPlus className="h-4 w-4" />
                {l(locale, "Add to calendar", "Ajouter au calendrier")}
              </a>
            </div>

            <div className="rounded-card border border-white/10 bg-white/[0.03] p-6">
              <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                <Users className="h-3.5 w-3.5" />
                {l(locale, "Who it's for", "Pour qui")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {l(
                  locale,
                  "System Integrators, MSSPs and technology teams evaluating or deploying the Lithe SD portfolio.",
                  "Intégrateurs, MSSP et équipes techniques qui évaluent ou déploient le portefeuille Lithe SD.",
                )}
              </p>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-iris-bright hover:text-white"
              >
                {l(locale, "Questions?", "Des questions ?")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </article>
  );
}
