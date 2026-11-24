"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./button";
import { l, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const inputClass =
  "w-full rounded-input border border-void/15 bg-white px-4 py-3 text-sm text-void placeholder:text-iron/60 outline-none transition-colors focus:border-iris";
const labelClass = "text-[10px] uppercase tracking-[0.12em] text-iron";

export function ContactForm({ locale }: { locale: Locale }) {
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
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          region: data.get("region"),
          interest: data.get("interest"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          source: "contact",
          page: typeof window !== "undefined" ? window.location.pathname : "",
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

  const regions = ["IOC", l(locale, "East Africa", "Afrique de l'Est"), l(locale, "Middle East", "Moyen-Orient"), l(locale, "Elsewhere", "Autre")];
  const interests = [
    l(locale, "Become a partner", "Devenir partenaire"),
    l(locale, "Request a quote", "Demander un devis"),
    l(locale, "Technical support", "Support technique"),
    l(locale, "Vendor partnership", "Partenariat éditeur"),
    l(locale, "Professional services", "Services professionnels"),
    l(locale, "Something else", "Autre demande"),
  ];

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-void/10 bg-white p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-iris text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-heading-sm font-medium text-void">
          {l(locale, "Thank you", "Merci")}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-body-light">
          {l(
            locale,
            "Your enquiry has been received. Our team will be in touch shortly. You can also reach us at ",
            "Votre demande a bien été reçue. Notre équipe vous contactera rapidement. Vous pouvez aussi nous écrire à ",
          )}
          <a href={`mailto:${site.email}`} className="font-medium text-iris hover:underline">
            {site.email}
          </a>
          .
        </p>
        <Button locale={locale} variant="outline" onClick={() => setSubmitted(false)}>
          {l(locale, "Send another message", "Envoyer un autre message")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-card border border-void/10 bg-white p-6 sm:p-8"
    >
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
          <input name="company" type="text" autoComplete="organization" className={inputClass} placeholder={l(locale, "Company name", "Nom de l'entreprise")} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{l(locale, "Region", "Région")}</span>
          <select name="region" className={inputClass} defaultValue={regions[0]}>
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{l(locale, "How can we help?", "Comment pouvons-nous aider ?")}</span>
        <select name="interest" className={inputClass} defaultValue={interests[0]}>
          {interests.map((i) => <option key={i}>{i}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{l(locale, "Message", "Message")}</span>
        <textarea name="message" rows={5} className={`${inputClass} resize-y`} placeholder={l(locale, "Tell us about your project or partnership goals…", "Parlez-nous de votre projet ou de vos objectifs…")} />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-body-light">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-void/20 accent-iris" />
        <span>
          {l(
            locale,
            "I agree to be contacted by Lithe SD about my enquiry and have read the Privacy Policy.",
            "J'accepte d'être contacté par Lithe SD au sujet de ma demande et j'ai lu la politique de confidentialité.",
          )}
        </span>
      </label>

      {error ? (
        <p role="alert" className="rounded-input border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <Button
        locale={locale}
        type="submit"
        size="lg"
        className="w-full sm:w-auto sm:self-start"
        disabled={sending}
      >
        {sending
          ? l(locale, "Sending…", "Envoi…")
          : l(locale, "Send message", "Envoyer le message")}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
