import { Icon } from "@/lib/icons";
import { pillars } from "@/lib/content";
import { cn } from "@/lib/utils";
import { l, type Locale } from "@/lib/i18n";

export function PillarGrid({
  locale,
  tone = "light",
  limit,
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
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
          className={cn(
            "group flex flex-col rounded-card border p-6 transition-colors duration-300",
            tone === "light"
              ? "border-void/10 bg-white hover:border-iris/40"
              : "border-white/10 bg-white/[0.03] hover:border-iris/50",
          )}
        >
          <span
            className={cn(
              "mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full",
              tone === "light" ? "bg-linen text-iris" : "bg-white/[0.06] text-iris-bright",
            )}
          >
            <Icon name={pillar.icon} className="h-5 w-5" />
          </span>
          <h3
            className={cn(
              "text-heading-sm font-medium",
              tone === "light" ? "text-void" : "text-white",
            )}
          >
            {l(locale, pillar.title.en, pillar.title.fr)}
          </h3>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed",
              tone === "light" ? "text-body-light" : "text-ash",
            )}
          >
            {l(locale, pillar.summary.en, pillar.summary.fr)}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 border-t border-current/10 pt-5">
            {pillar.capabilities.map((cap) => (
              <li
                key={cap.en}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em]",
                  tone === "light"
                    ? "border-void/10 text-iron"
                    : "border-white/10 text-smoke",
                )}
              >
                {l(locale, cap.en, cap.fr)}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
