import { MapPin, Phone } from "lucide-react";
import { offices } from "@/lib/content";

export function LocationCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {offices.map((office) => (
        <article
          key={office.city}
          className="flex flex-col rounded-card border border-silver-border bg-white p-6 transition-colors duration-300 hover:border-signal-blue/40"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-subheading font-light text-midnight-ink">
              {office.city}
            </h3>
            <span className="font-mono text-micro uppercase text-fog">
              {office.role}
            </span>
          </div>
          <div className="mt-5 flex items-start gap-3 border-t border-silver-border pt-5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-signal-blue" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-body">
              {office.address}
            </p>
          </div>
          <a
            href={office.phoneHref}
            className="mt-4 inline-flex items-center gap-3 text-sm text-midnight-ink transition-colors hover:text-signal-blue"
          >
            <Phone className="h-4 w-4 shrink-0 text-signal-blue" aria-hidden="true" />
            {office.phone}
          </a>
        </article>
      ))}
    </div>
  );
}
