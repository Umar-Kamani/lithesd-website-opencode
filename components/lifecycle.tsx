import { Icon } from "@/lib/icons";
import { lifecycle } from "@/lib/content";
import { cn } from "@/lib/utils";
import { l, type Locale } from "@/lib/i18n";

export function Lifecycle({
  locale,
  tone = "dark",
}: {
  locale: Locale;
  tone?: "dark" | "light";
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
      {lifecycle.map((stage, index) => (
        <div key={stage.title.en} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className={cn("text-[10px] uppercase tracking-[0.14em]", tone === "dark" ? "text-smoke" : "text-iron")}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={cn("h-px flex-1", tone === "dark" ? "bg-white/12" : "bg-void/10")} />
          </div>
          <span
            className={cn(
              "mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full",
              tone === "dark" ? "bg-white/[0.06] text-iris-bright" : "bg-linen text-iris",
            )}
          >
            <Icon name={stage.icon} className="h-5 w-5" />
          </span>
          <h3 className={cn("mt-5 text-heading-sm font-medium", tone === "dark" ? "text-white" : "text-void")}>
            {l(locale, stage.title.en, stage.title.fr)}
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {stage.points.map((point) => (
              <li
                key={point.en}
                className={cn(
                  "flex gap-3 text-sm leading-snug",
                  tone === "dark" ? "text-ash" : "text-body-light",
                )}
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-iris" />
                <span>{l(locale, point.en, point.fr)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
