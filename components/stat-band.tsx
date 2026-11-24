import { cn } from "@/lib/utils";
import { stats } from "@/lib/content";
import { l, type Locale } from "@/lib/i18n";

export function StatBand({
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
        "grid grid-cols-2 overflow-hidden rounded-panel border sm:grid-cols-3",
        tone === "light" ? "border-void/10 bg-void/10" : "border-white/10 bg-white/10",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.value}
          className={cn(
            "flex flex-col gap-2 p-5",
            tone === "light" ? "bg-white" : "bg-obsidian",
          )}
        >
          <span
            className={cn(
              "font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-medium leading-none tracking-[-0.03em]",
              tone === "light" ? "text-void" : "text-white",
            )}
          >
            {stat.value}
          </span>
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.12em]",
              tone === "light" ? "text-iron" : "text-smoke",
            )}
          >
            {l(locale, stat.label.en, stat.label.fr)}
          </span>
        </div>
      ))}
    </div>
  );
}
