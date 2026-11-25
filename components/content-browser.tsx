"use client";

import { useMemo, useState } from "react";
import { ContentCard, type ContentCardData } from "./content-card";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrowserItem = ContentCardData & {
  id: string;
  brandSlugs: string[];
  pillar: string;
  industry?: string;
  topicSlugs: string[];
};

export type BrowserFilters = {
  brands: { value: string; label: string }[];
  pillars: { value: string; label: string }[];
  industries?: { value: string; label: string }[];
  topics?: { value: string; label: string }[];
};

const selectLight =
  "h-10 w-full rounded-pill border border-void/15 bg-white px-4 text-[12px] text-void outline-none transition-colors focus:border-iris";
const selectDark =
  "h-10 w-full rounded-pill border border-white/15 bg-charcoal px-4 text-[12px] text-white outline-none transition-colors focus:border-iris-bright";

export function ContentBrowser({
  items,
  filters,
  locale,
  labels,
  pageSize = 9,
  tone = "dark",
}: {
  items: BrowserItem[];
  filters: BrowserFilters;
  locale: Locale;
  labels: {
    search: string;
    brand: string;
    pillar: string;
    industry: string;
    topic: string;
    all: string;
    empty: string;
    more: string;
  };
  pageSize?: number;
  tone?: "light" | "dark";
}) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [pillar, setPillar] = useState("");
  const [industry, setIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [visible, setVisible] = useState(pageSize);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (brand && !item.brandSlugs.includes(brand)) return false;
      if (pillar && item.pillar !== pillar) return false;
      if (industry && item.industry !== industry) return false;
      if (topic && !item.topicSlugs.includes(topic)) return false;
      if (
        q &&
        !`${item.title} ${item.excerpt} ${item.eyebrow}`
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [items, query, brand, pillar, industry, topic]);

  const selectClass = tone === "light" ? selectLight : selectDark;

  function onFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setVisible(pageSize);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className={cn("flex flex-col gap-3 rounded-card border p-4", tone === "light" ? "border-void/10 bg-white" : "border-white/10 bg-charcoal")}>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(pageSize);
          }}
          placeholder={labels.search}
          className={cn(
            "h-10 w-full rounded-pill border px-4 text-sm outline-none transition-colors",
            tone === "light"
              ? "border-void/15 bg-linen text-void focus:border-iris"
              : "border-white/15 bg-obsidian text-white placeholder:text-iron focus:border-iris-bright",
          )}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.12em] text-iron">{labels.brand}</span>
            <select className={selectClass} value={brand} onChange={(event) => onFilter(setBrand, event.target.value)}>
              <option value="">{labels.all}</option>
              {filters.brands.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.12em] text-iron">{labels.pillar}</span>
            <select className={selectClass} value={pillar} onChange={(event) => onFilter(setPillar, event.target.value)}>
              <option value="">{labels.all}</option>
              {filters.pillars.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          {filters.industries && filters.industries.length > 0 ? (
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.12em] text-iron">{labels.industry}</span>
              <select className={selectClass} value={industry} onChange={(event) => onFilter(setIndustry, event.target.value)}>
                <option value="">{labels.all}</option>
                {filters.industries.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          ) : null}
          {filters.topics && filters.topics.length > 0 ? (
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.12em] text-iron">{labels.topic}</span>
              <select className={selectClass} value={topic} onChange={(event) => onFilter(setTopic, event.target.value)}>
                <option value="">{labels.all}</option>
                {filters.topics.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className={cn("rounded-card border border-dashed p-8 text-center text-sm text-iron", tone === "light" ? "border-void/20" : "border-white/20")}>
          {labels.empty}
        </p>
      ) : (
        <>
          <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
            {shown.slice(0, visible).map((item) => (
              <ContentCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
          {visible < shown.length ? (
            <button
              type="button"
              onClick={() => setVisible((value) => value + pageSize)}
              className={cn(
                "mx-auto inline-flex h-11 items-center justify-center rounded-pill border px-6 text-sm font-medium transition-colors",
                tone === "light"
                  ? "border-void/15 text-void hover:border-iris hover:text-iris"
                  : "border-white/15 text-white hover:border-iris-bright hover:text-iris-bright",
              )}
            >
              {labels.more}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
