"use client";

import { useState, type FormEvent } from "react";
import { Download, X } from "lucide-react";
import type { BrochureRef } from "@/lib/brands";
import { l, type Locale } from "@/lib/i18n";

const inputClass =
  "w-full rounded-input border border-void/15 bg-white px-3.5 py-2.5 text-sm text-void outline-none transition-colors focus:border-iris";

export function BrochureCard({
  brochure,
  locale,
}: {
  brochure: BrochureRef;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          brochureId: brochure.id,
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          consent: data.get("consent") === "on",
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const json = (await response.json()) as { ok?: boolean; url?: string };
      if (!response.ok || !json.ok || !json.url) {
        throw new Error(l(locale, "Unable to prepare the download.", "Impossible de préparer le téléchargement."));
      }
      window.open(json.url, "_blank", "noopener,noreferrer");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : l(locale, "Something went wrong.", "Une erreur est survenue."));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-card border border-void/10 bg-white p-5">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linen text-iris">
            <Download className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-void">{brochure.title}</p>
            <p className="text-[11px] uppercase tracking-[0.1em] text-iron">
              {l(locale, "PDF brochure", "Brochure PDF")}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-pill bg-iris px-4 text-[12px] font-medium text-white transition-colors hover:bg-iris-bright"
        >
          {l(locale, "Download", "Télécharger")}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-void/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-card border border-void/10 bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={l(locale, "Close", "Fermer")}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-iron transition-colors hover:bg-linen hover:text-void"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-heading-sm font-medium text-void">
              {l(locale, "Download the brochure", "Télécharger la brochure")}
            </h3>
            <p className="mt-2 text-sm text-body-light">
              {l(
                locale,
                "Tell us who you are and the download will start immediately.",
                "Dites-nous qui vous êtes et le téléchargement démarrera immédiatement.",
              )}
            </p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
              <input name="name" required autoComplete="name" placeholder={l(locale, "Full name", "Nom complet")} className={inputClass} />
              <input name="email" type="email" required autoComplete="email" placeholder={l(locale, "Work email", "Email professionnel")} className={inputClass} />
              <input name="company" autoComplete="organization" placeholder={l(locale, "Company", "Entreprise")} className={inputClass} />
              <label className="flex items-start gap-2 text-[11px] leading-relaxed text-body-light">
                <input type="checkbox" name="consent" required className="mt-0.5 h-3.5 w-3.5 accent-iris" />
                {l(
                  locale,
                  "I agree to be contacted by Lithe SD and have read the Privacy Policy.",
                  "J'accepte d'être contacté par Lithe SD et j'ai lu la politique de confidentialité.",
                )}
              </label>
              {error ? <p className="text-xs text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-iris px-5 text-sm font-medium text-white transition-colors hover:bg-iris-bright disabled:opacity-60"
              >
                {sending
                  ? l(locale, "Preparing…", "Préparation…")
                  : l(locale, "Download brochure", "Télécharger la brochure")}
                <Download className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
