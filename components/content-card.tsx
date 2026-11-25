import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentCover } from "./content-cover";
import { href as localeHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ContentCardData = {
  path: string;
  title: string;
  excerpt: string;
  cover: string | null;
  eyebrow: string;
  meta: string;
  brands: { name: string; logo: string | null }[];
  kind: "case-study" | "post";
};

export function ContentCard({
  item,
  locale,
  tone = "light",
  featured = false,
}: {
  item: ContentCardData;
  locale: Locale;
  tone?: "light" | "dark";
  featured?: boolean;
}) {
  return (
    <Link
      href={localeHref(locale, item.path)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border transition-colors duration-300",
        tone === "light"
          ? "border-void/10 bg-white hover:border-iris/40"
          : "border-white/10 bg-white/[0.03] hover:border-iris/50",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-stretch",
      )}
    >
      <ContentCover
        src={item.cover}
        label={item.eyebrow}
        className={cn("rounded-none", featured && "h-full lg:aspect-auto")}
      />
      <div className={cn("flex flex-1 flex-col p-5", featured && "lg:p-8")}>
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.14em]",
              tone === "light" ? "text-iris" : "text-iris-bright",
            )}
          >
            {item.eyebrow}
          </span>
          <ArrowUpRight
            className={cn(
              "h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              tone === "light" ? "text-iron" : "text-smoke",
            )}
          />
        </div>
        <h3
          className={cn(
            "mt-3 font-display font-medium leading-snug",
            featured ? "text-heading" : "text-heading-sm",
            tone === "light" ? "text-void" : "text-white",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-2 line-clamp-3 text-sm leading-relaxed",
            tone === "light" ? "text-body-light" : "text-ash",
          )}
        >
          {item.excerpt}
        </p>
        <div
          className={cn(
            "mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4",
            tone === "light" ? "border-void/10" : "border-white/10",
          )}
        >
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.1em]",
              tone === "light" ? "text-iron" : "text-smoke",
            )}
          >
            {item.meta}
          </span>
          <span className="flex flex-wrap items-center gap-2">
            {item.brands.map((brand) => (
              <span
                key={brand.name}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.08em]",
                  tone === "light"
                    ? "border-void/10 text-iron"
                    : "border-white/15 text-smoke",
                )}
              >
                {brand.name}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
