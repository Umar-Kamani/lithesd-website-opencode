import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ArticleBody } from "@/components/rich-text";
import { Section } from "@/components/section";
import { getPolicies, getPolicy } from "@/lib/cms-policies";
import { formatDate } from "@/lib/cms-content";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const policies = await getPolicies("en");
  return locales.flatMap((locale) =>
    policies.map((policy) => ({ locale, slug: policy.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const policy = await getPolicy(locale, slug);
  if (!policy) return {};
  return pageMetadata({
    locale,
    path: `/policies/${policy.slug}`,
    title: policy.title,
    description: policy.summary || policy.title,
  });
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const policy = await getPolicy(locale, slug);
  if (!policy) notFound();

  return (
    <article>
      <header className="relative overflow-hidden border-b border-white/8 bg-void pb-14 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] glow-iris opacity-70" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] glow-ember opacity-40" />
        <div className="relative mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-iron">
            <Link href={localeHref(locale, "/")} className="hover:text-white">
              {l(locale, "Home", "Accueil")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={localeHref(locale, "/policies")} className="hover:text-white">
              {l(locale, "Policies", "Politiques")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ash">{policy.title}</span>
          </nav>
          <h1 className="mt-8 text-display-sm font-medium text-white">{policy.title}</h1>
          {policy.summary ? (
            <p className="mt-4 max-w-2xl text-lead text-ash">{policy.summary}</p>
          ) : null}
          {policy.effectiveDate ? (
            <p className="mt-5 text-[11px] uppercase tracking-[0.12em] text-iron">
              {l(locale, "Effective", "En vigueur")} · {formatDate(policy.effectiveDate, locale)}
            </p>
          ) : null}
        </div>
      </header>

      <Section tone="void">
        <div className="mx-auto max-w-3xl">
          <ArticleBody data={policy.body} />
          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-ash">
            {l(
              locale,
              "Questions about this policy? Contact info@lithesd.com.",
              "Une question sur cette politique ? Contactez info@lithesd.com.",
            )}
          </p>
        </div>
      </Section>
    </article>
  );
}
