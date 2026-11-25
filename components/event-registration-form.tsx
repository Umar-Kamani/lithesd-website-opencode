"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CalendarPlus, Check } from "lucide-react";
import { l, type Locale } from "@/lib/i18n";

const inputClass =
  "w-full rounded-input border border-white/12 bg-charcoal px-4 py-3 text-sm text-white placeholder:text-iron outline-none transition-colors focus:border-iris-bright";
const labelClass = "text-[10px] uppercase tracking-[0.12em] text-smoke";

export function EventRegistrationForm({
  eventId,
  locale,
  closed,
  confirmationMessage,
  icsHref,
}: {
  eventId: string;
  locale: Locale;
  closed: boolean;
  confirmationMessage: string;
  icsHref: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventId,
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          phone: data.get("phone"),
          jobTitle: data.get("jobTitle"),
          notes: data.get("notes"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const json = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !json.ok) {
        throw new Error(json.error || l(locale, "Something went wrong.", "Une erreur est survenue."));
      }
      form.reset();
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : l(locale, "Something went wrong.", "Une erreur est survenue."));
    } finally {
      setSending(false);
    }
  }

  if (closed) {
    return (
      <div className="rounded-card border border-white/10 bg-charcoal p-7">
        <h3 className="font-display text-heading-sm font-medium text-white">
          {l(locale, "Registration is closed", "Les inscriptions sont closes")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          {l(
            locale,
            "This event is no longer accepting registrations. Contact our team if you would still like to attend.",
            "Cet événement n'accepte plus d'inscriptions. Contactez notre équipe si vous souhaitez participer.",
          )}
        </p>
        <a
          href={`mailto:info@lithesd.com?subject=${encodeURIComponent("Event registration")}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-iris-bright hover:text-white"
        >
          {l(locale, "Contact us", "Nous contacter")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-white/10 bg-charcoal p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-iris text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-heading-sm font-medium text-white">
          {l(locale, "You're registered", "Inscription confirmée")}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ash">
          {confirmationMessage ||
            l(
              locale,
              "A confirmation email with a calendar invite is on its way. We look forward to seeing you.",
              "Un email de confirmation avec une invitation calendrier vous a été envoyé. À bientôt.",
            )}
        </p>
        <a
          href={icsHref}
          className="inline-flex items-center gap-2 rounded-pill border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-iris-bright hover:text-iris-bright"
        >
          <CalendarPlus className="h-4 w-4" />
          {l(locale, "Add to calendar", "Ajouter au calendrier")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-card border border-white/10 bg-charcoal p-6 sm:p-8">
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{l(locale, "Full name", "Nom complet")}</span>
          <input name="name" type="text" required autoComplete="name" className={inputClass} placeholder={l(locale, "Jane Doe", "Jeanne Dupont")} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{l(locale, "Work email", "Email professionnel")}</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jane@company.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{l(locale, "Company", "Entreprise")}</span>
          <input name="company" type="text" autoComplete="organization" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{l(locale, "Job title", "Fonction")}</span>
          <input name="jobTitle" type="text" autoComplete="organization-title" className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{l(locale, "Phone", "Téléphone")}</span>
        <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{l(locale, "Anything we should know?", "Quelque chose à nous signaler ?")}</span>
        <textarea name="notes" rows={3} className={inputClass} />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-ash">
        <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-charcoal accent-iris" />
        <span>
          {l(
            locale,
            "I agree to Lithe SD storing my details to manage this registration and contact me about the event.",
            "J'accepte que Lithe SD conserve mes données pour gérer cette inscription et me contacter au sujet de l'événement.",
          )}
        </span>
      </label>

      {error ? (
        <p className="rounded-card border border-alert/40 bg-alert/10 px-4 py-3 text-sm text-alert-soft">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-iris px-6 text-sm font-medium text-white transition-colors hover:bg-iris-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? l(locale, "Registering…", "Inscription…") : l(locale, "Register", "S'inscrire")}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
