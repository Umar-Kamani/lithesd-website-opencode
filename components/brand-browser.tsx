"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { href as localeHref, l, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrowserBrand = {
  slug: string;
  name: string;
  logo: string | null;
  pillar: string;
  tagline: { en: string; fr: string };
  productCount: number;
};

export function BrandBrowser({
  locale,
  items,
  filters,
  tone = "dark",
}: {
  locale: Locale;
  items: BrowserBrand[];
  filters: { id: string; label: string }[];
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState("all");
  const shown = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.pillar === active)),
    [active, items],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {[{ id: "all", label: l(locale, "All brands", "Toutes les marques") }, ...filters].map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActive(filter.id)}
            className={cn(
              "rounded-pill border px-4 py-2 text-[12px] font-medium transition-colors",
              active === filter.id
                ? "border-iris bg-iris text-white"
                : tone === "light"
                  ? "border-void/15 bg-white text-iron hover:border-iris/40 hover:text-void"
                  : "border-white/15 bg-white/[0.03] text-ash hover:border-iris/50 hover:text-white",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((brand) => (
          <Link
            key={brand.slug}
            href={localeHref(locale, `/brands/${brand.slug}`)}
            className={cn(
              "group flex flex-col rounded-card border p-5 transition-colors",
              tone === "light"
                ? "border-void/10 bg-white hover:border-iris/40"
                : "border-white/10 bg-charcoal hover:border-iris/50",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-16 w-full max-w-[150px] items-center justify-center rounded-card bg-white px-4">
                <BrandLogo name={brand.name} logo={brand.logo} />
              </span>
              <ArrowUpRight className={cn(
                "h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                tone === "light" ? "text-iron" : "text-smoke",
              )} />
            </div>
            <h3 className={cn("mt-5 text-heading-sm font-medium", tone === "light" ? "text-void" : "text-white")}>{brand.name}</h3>
            <p className={cn("mt-1.5 line-clamp-2 text-sm", tone === "light" ? "text-body-light" : "text-ash")}>
              {l(locale, brand.tagline.en, brand.tagline.fr)}
            </p>
            <p className={cn("mt-4 border-t pt-3 text-[11px] uppercase tracking-[0.1em] text-iron", tone === "light" ? "border-void/10" : "border-white/8")}>
              {brand.productCount} {l(locale, "products", "produits")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
