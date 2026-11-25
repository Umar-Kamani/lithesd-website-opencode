import type { ContentCardData } from "@/components/content-card";
import { formatDate, readingTime, type BlogPost, type CaseStudy } from "./cms-content";
import type { Locale } from "./i18n";
import { industryLabels, labelFor, pillarLabels } from "./taxonomy";

const brandChips = (brands: { name: string; logo: string | null }[]) =>
  brands.map((brand) => ({ name: brand.name, logo: brand.logo }));

export function caseStudyCard(item: CaseStudy, locale: Locale): ContentCardData {
  const industry = item.industry
    ? labelFor(industryLabels, locale, item.industry)
    : labelFor(pillarLabels, locale, item.pillar);
  return {
    path: `/case-studies/${item.slug}`,
    title: item.title,
    excerpt: item.excerpt,
    cover: item.coverImage,
    eyebrow: locale === "fr" ? "Étude de cas" : "Case study",
    meta: [item.customerName, industry].filter(Boolean).join(" · "),
    brands: brandChips(item.brands),
    kind: "case-study",
  };
}

export function blogPostCard(item: BlogPost, locale: Locale): ContentCardData {
  const pillar = item.pillar ? labelFor(pillarLabels, locale, item.pillar) : "";
  const minutes = readingTime(item.body);
  return {
    path: `/insights/${item.slug}`,
    title: item.title,
    excerpt: item.excerpt,
    cover: item.coverImage,
    eyebrow: pillar || (locale === "fr" ? "Analyse" : "Insight"),
    meta: [
      formatDate(item.publishedAt, locale),
      `${minutes} ${locale === "fr" ? "min de lecture" : "min read"}`,
    ]
      .filter(Boolean)
      .join(" · "),
    brands: brandChips(item.brands),
    kind: "post",
  };
}
