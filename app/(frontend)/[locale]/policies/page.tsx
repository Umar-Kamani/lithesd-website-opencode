import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { getPolicies } from "@/lib/cms-policies";
import { href as localeHref, isLocale, l, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/policies",
    title: l(locale, "Policies", "Politiques"),
    description: l(
      locale,
      "Privacy, terms and governance policies for Lithe Solutions Distributor Ltd.",
      "Politiques de confidentialité, conditions et gouvernance de Lithe Solutions Distributor Ltd.",
    ),
  });
}

export default async function PoliciesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const policies = await getPolicies(locale);

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Policies", "Politiques")}
        title={l(locale, "How we work, in writing", "Nos engagements, par écrit")}
        intro={l(
          locale,
          "Privacy, terms and governance policies for Lithe Solutions Distributor Ltd.",
          "Politiques de confidentialité, conditions et gouvernance de Lithe Solutions Distributor Ltd.",
        )}
      />

      <Section tone="void">
        <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" />
        <div className="relative">
          {policies.length === 0 ? (
            <p className="rounded-card border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-ash">
              {l(
                locale,
                "Policies are being prepared and will appear here once published.",
                "Les politiques sont en préparation et apparaîtront ici dès leur publication.",
              )}
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {policies.map((policy) => (
                <Link
                  key={policy.id}
                  href={localeHref(locale, `/policies/${policy.slug}`)}
                  className="group flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-iris/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-iris-bright">
                      {policy.category.replace(/-/g, " ")}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-smoke transition-colors group-hover:text-iris-bright" />
                  </div>
                  <h2 className="mt-3 font-display text-heading-sm font-medium text-white">
                    {policy.title}
                  </h2>
                  {policy.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ash">
                      {policy.summary}
                    </p>
                  ) : null}
                  {policy.effectiveDate ? (
                    <p className="mt-auto border-t border-white/8 pt-4 text-[11px] uppercase tracking-[0.1em] text-iron">
                      {l(locale, "Effective", "En vigueur")} ·{" "}
                      {formatDate(policy.effectiveDate, locale)}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
          <Reveal className="mt-10 text-sm text-ash">
            {l(
              locale,
              "Questions about a policy? Write to info@lithesd.com.",
              "Une question sur une politique ? Écrivez à info@lithesd.com.",
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
