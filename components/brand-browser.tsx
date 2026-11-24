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
}: {
  locale: Locale;
  items: BrowserBrand[];
  filters: { id: string; label: string }[];
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
                : "border-void/15 bg-white text-iron hover:border-iris/40 hover:text-void",
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
            className="group flex flex-col rounded-card border border-void/10 bg-white p-5 transition-colors hover:border-iris/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-16 w-full max-w-[150px] items-center justify-center rounded-card bg-linen px-4">
                <BrandLogo name={brand.name} logo={brand.logo} />
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-iron transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-5 text-heading-sm font-medium text-void">{brand.name}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-body-light">
              {l(locale, brand.tagline.en, brand.tagline.fr)}
            </p>
            <p className="mt-4 border-t border-void/10 pt-3 text-[11px] uppercase tracking-[0.1em] text-iron">
              {brand.productCount} {l(locale, "products", "produits")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
