import { CalendarClock, Download, Play, ShieldCheck } from "lucide-react";
import { l, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BrochureSlot({
  locale,
  tone = "light",
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-card border border-dashed p-6",
        tone === "light" ? "border-void/20 bg-linen/60" : "border-white/20 bg-white/[0.02]",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          tone === "light" ? "bg-white text-iris" : "bg-white/10 text-iris-bright",
        )}
      >
        <Download className="h-5 w-5" />
      </span>
      <div>
        <h3 className={cn("text-[16px] font-medium", tone === "light" ? "text-void" : "text-white")}>
          {l(locale, "Branded brochures", "Brochures de marque")}
        </h3>
        <p className={cn("mt-1.5 text-sm", tone === "light" ? "text-body-light" : "text-ash")}>
          {l(
            locale,
            "Datasheets and brochures for this brand will be available here. Downloads are gated and captured as leads.",
            "Les fiches techniques et brochures de cette marque seront disponibles ici. Les téléchargements seront soumis à un formulaire.",
          )}
        </p>
      </div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-current/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] opacity-70">
        <ShieldCheck className="h-3.5 w-3.5" />
        {l(locale, "Coming with the CMS", "Bientôt avec le CMS")}
      </span>
    </div>
  );
}

export function VideoSlot({
  locale,
  tone = "light",
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-card border border-dashed",
        tone === "light" ? "border-void/20 bg-linen" : "border-white/20 bg-obsidian",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-iris text-white">
        <Play className="ml-0.5 h-5 w-5" />
      </span>
      <p className={cn("relative text-sm", tone === "light" ? "text-body-light" : "text-ash")}>
        {l(locale, "Video coming soon", "Vidéo bientôt disponible")}
      </p>
      <span className="relative text-[10px] uppercase tracking-[0.12em] text-iron">
        {l(locale, "Managed in the CMS", "Gérée dans le CMS")}
      </span>
    </div>
  );
}

export function EventsPlaceholder({ locale }: { locale: Locale }) {
  const rows = [
    { en: "Participated event", fr: "Événement suivi" },
    { en: "Organised event", fr: "Événement organisé" },
    { en: "Upcoming event", fr: "Événement à venir" },
  ];
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-iris/60 via-white/15 to-transparent" />
      <ol className="flex flex-col gap-6">
        {rows.map((row) => (
          <li key={row.en} className="relative flex gap-5 pl-0">
            <span className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-obsidian text-iris-bright">
              <CalendarClock className="h-4 w-4" />
            </span>
            <div className="flex-1 rounded-card border border-dashed border-white/15 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">
                  {l(locale, row.en, row.fr)}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-iron">
                  {l(locale, "Date TBC", "Date à venir")}
                </span>
              </div>
              <p className="mt-2 text-sm text-ash">
                {l(
                  locale,
                  "Event details, photos and a short video will appear here once the events timeline is published.",
                  "Les détails, photos et une courte vidéo apparaîtront ici dès la publication de la chronologie.",
                )}
              </p>
              <div className="mt-4 flex h-24 items-center justify-center rounded-card border border-white/8 bg-white/[0.02] text-[10px] uppercase tracking-[0.12em] text-iron">
                {l(locale, "Video placeholder", "Emplacement vidéo")}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
