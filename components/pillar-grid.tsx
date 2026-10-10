import { Icon } from "@/lib/icons";
import { pillars } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PillarGrid({
  limit,
  className,
}: {
  limit?: number;
  className?: string;
}) {
  const items = limit ? pillars.slice(0, limit) : pillars;

  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((pillar) => (
        <article
          key={pillar.id}
          id={pillar.id}
          className="group flex flex-col rounded-card border border-silver-border bg-white p-6 transition-colors duration-300 hover:border-signal-blue/40"
        >
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-card border border-silver-border text-signal-blue transition-colors duration-300 group-hover:border-signal-blue/40">
            <Icon name={pillar.icon} className="h-5 w-5" />
          </span>
          <h3 className="text-subheading font-light text-midnight-ink">
            {pillar.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-body">
            {pillar.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 border-t border-silver-border pt-5">
            {pillar.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-tag border border-silver-border px-2.5 py-1 font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-fog"
              >
                {cap}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
