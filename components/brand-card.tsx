import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import type { Brand } from "@/lib/brands";
import { href as localeHref, l, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function BrandCard({
  brand,
  locale,
  tone = "light",
}: {
  brand: Brand;
  locale: Locale;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={localeHref(locale, `/brands/${brand.slug}`)}
      className={cn(
        "group flex flex-col rounded-card border p-5 transition-colors duration-300",
        tone === "light"
          ? "border-void/10 bg-white hover:border-iris/40"
          : "border-white/10 bg-white/[0.03] hover:border-iris/50",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-16 w-full max-w-[150px] items-center justify-center rounded-card px-4",
            tone === "light" ? "bg-linen" : "bg-white",
          )}
        >
          <BrandLogo name={brand.name} logo={brand.logo} />
        </span>
        <ArrowUpRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            tone === "light" ? "text-iron" : "text-smoke",
          )}
        />
      </div>
      <h3
        className={cn(
          "mt-5 text-heading-sm font-medium",
          tone === "light" ? "text-void" : "text-white",
        )}
      >
        {brand.name}
      </h3>
      <p
        className={cn(
          "mt-1.5 line-clamp-2 text-sm",
          tone === "light" ? "text-body-light" : "text-ash",
        )}
      >
        {l(locale, brand.tagline.en, brand.tagline.fr)}
      </p>
      <p
        className={cn(
          "mt-4 border-t pt-3 text-[11px] uppercase tracking-[0.1em]",
          tone === "light" ? "border-void/10 text-iron" : "border-white/10 text-smoke",
        )}
      >
        {brand.products.length} {l(locale, "products", "produits")}
      </p>
    </Link>
  );
}
