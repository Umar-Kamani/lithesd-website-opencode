import { Icon } from "@/lib/icons";
import { valueAdd } from "@/lib/content";
import { cn } from "@/lib/utils";
import { l, type Locale } from "@/lib/i18n";

export function ValueAdd({
  locale,
  tone = "light",
}: {
  locale: Locale;
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {valueAdd.map((item, index) => (
        <article
          key={item.title.en}
          className={cn(
            "flex gap-4 rounded-card border p-5",
            tone === "light" ? "border-void/10 bg-white" : "border-white/10 bg-white/[0.03]",
            index === 0 && "sm:col-span-2",
          )}
        >
          <span
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              tone === "light" ? "bg-iris text-white" : "bg-iris text-white",
            )}
          >
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className={cn("text-[16px] font-medium", tone === "light" ? "text-void" : "text-white")}>
              {l(locale, item.title.en, item.title.fr)}
            </h3>
            <p className={cn("mt-1.5 text-sm leading-relaxed", tone === "light" ? "text-body-light" : "text-ash")}>
              {l(locale, item.summary.en, item.summary.fr)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
