import { Icon } from "@/lib/icons";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { l, type Locale } from "@/lib/i18n";

export function ServiceGrid({
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
  const items = limit ? services.slice(0, limit) : services;

  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((service) => (
        <article
          key={service.id}
          className={cn(
            "group flex flex-col rounded-card border p-6 transition-colors duration-300",
            tone === "light"
              ? "border-void/10 bg-white hover:border-iris/40"
              : "border-white/10 bg-white/[0.03] hover:border-iris/50",
          )}
        >
          <span
            className={cn(
              "mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              tone === "light"
                ? "bg-linen text-iris group-hover:bg-iris group-hover:text-white"
                : "bg-white/[0.06] text-iris-bright",
            )}
          >
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <h3
            className={cn(
              "text-[16px] font-medium leading-snug",
              tone === "light" ? "text-void" : "text-white",
            )}
          >
            {l(locale, service.title.en, service.title.fr)}
          </h3>
          <p
            className={cn(
              "mt-2.5 text-sm leading-relaxed",
              tone === "light" ? "text-body-light" : "text-ash",
            )}
          >
            {l(locale, service.summary.en, service.summary.fr)}
          </p>
        </article>
      ))}
    </div>
  );
}
