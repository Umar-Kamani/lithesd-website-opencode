import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { href as localeHref, type Locale } from "@/lib/i18n";
import type {
  ContentBrandRef,
  ContentProductRef,
  ContentTopicRef,
} from "@/lib/cms-content";

function Chip({
  locale,
  to,
  children,
}: {
  locale: Locale;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={localeHref(locale, to)}
      className="inline-flex items-center gap-1.5 rounded-pill border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ash transition-colors hover:border-iris-bright hover:text-white"
    >
      {children}
      <ArrowUpRight className="h-3 w-3" />
    </Link>
  );
}

export function ContentAttribution({
  locale,
  label,
  brands,
  products,
  topics,
}: {
  locale: Locale;
  label: string;
  brands: ContentBrandRef[];
  products: ContentProductRef[];
  topics: ContentTopicRef[];
}) {
  const hasAny = brands.length + products.length + topics.length > 0;
  if (!hasAny) return null;

  return (
    <div className="rounded-card border border-white/10 bg-charcoal p-6 sm:p-7">
      <p className="text-[10px] uppercase tracking-[0.16em] text-iron">{label}</p>

      <div className="mt-5 flex flex-col gap-6">
        {brands.length > 0 ? (
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-iron">
              {locale === "fr" ? "Marques" : "Brands"}
            </p>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={localeHref(locale, `/brands/${brand.slug}`)}
                  className="group flex items-center gap-3 rounded-card border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors hover:border-iris/50"
                >
                  <span className="flex h-9 w-16 shrink-0 items-center justify-center rounded-[6px] bg-white px-2">
                    <BrandLogo name={brand.name} logo={brand.logo} imageClassName="max-h-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-white">
                    {brand.name}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-smoke transition-colors group-hover:text-iris-bright" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {products.length > 0 ? (
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-iron">
              {locale === "fr" ? "Produits" : "Products"}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {products.map((product) => (
                <Chip
                  key={`${product.brandSlug}-${product.slug}`}
                  locale={locale}
                  to={`/brands/${product.brandSlug}/${product.slug}`}
                >
                  {product.name}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}

        {topics.length > 0 ? (
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-iron">
              {locale === "fr" ? "Sujets" : "Topics"}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic.slug}
                  className="rounded-pill border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] text-ash"
                >
                  {topic.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
