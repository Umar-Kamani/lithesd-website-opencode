import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Product } from "@/lib/brands";
import { href as localeHref, l, type Locale } from "@/lib/i18n";

export function ProductCard({
  product,
  brandSlug,
  locale,
  tone = "light",
}: {
  product: Product;
  brandSlug: string;
  locale: Locale;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={localeHref(locale, `/brands/${brandSlug}/${product.slug}`)}
      className={
        tone === "light"
          ? "group flex flex-col rounded-card border border-void/10 bg-white p-6 transition-colors hover:border-iris/40"
          : "group flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-iris/50"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.12em] text-iris">
          {l(locale, product.category.en, product.category.fr)}
        </span>
        <span className="flex items-center gap-2">
          {product.video ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-void/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-iron">
              <Play className="h-2.5 w-2.5" />
              {l(locale, "Video", "Vidéo")}
            </span>
          ) : null}
          <ArrowUpRight className="h-4 w-4 text-iron transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <h3
        className={
          tone === "light"
            ? "mt-4 text-heading-sm font-medium text-void"
            : "mt-4 text-heading-sm font-medium text-white"
        }
      >
        {product.name}
      </h3>
      <p
        className={
          tone === "light"
            ? "mt-2.5 line-clamp-3 text-sm leading-relaxed text-body-light"
            : "mt-2.5 line-clamp-3 text-sm leading-relaxed text-ash"
        }
      >
        {l(locale, product.summary.en, product.summary.fr)}
      </p>
      <span
        className={
          tone === "light"
            ? "mt-5 border-t border-void/10 pt-3 text-[11px] uppercase tracking-[0.1em] text-iron"
            : "mt-5 border-t border-white/10 pt-3 text-[11px] uppercase tracking-[0.1em] text-smoke"
        }
      >
        {l(locale, "View product", "Voir le produit")}
      </span>
    </Link>
  );
}
