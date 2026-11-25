import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Quote } from "lucide-react";
import { ContentCover } from "@/components/content-cover";
import { ContentAttribution } from "@/components/content-attribution";
import { ArticleBody } from "@/components/rich-text";
import { RelatedContent } from "@/components/related-content";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import {
  formatDate,
  getCaseStudies,
  getCaseStudy,
  getRelatedCaseStudiesByTopic,
} from "@/lib/cms-content";
import { caseStudyCard } from "@/lib/content-view";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { industryLabels, labelFor, pillarLabels } from "@/lib/taxonomy";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const studies = await getCaseStudies("en");
  return locales.flatMap((locale) => studies.map((study) => ({ locale, slug: study.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const study = await getCaseStudy(locale, slug);
  if (!study) return {};

  const base = pageMetadata({
    locale,
    path: `/case-studies/${study.slug}`,
    title: study.title,
    description: study.excerpt,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: study.publishedAt,
      images: study.coverImage ? [{ url: study.coverImage }] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const study = await getCaseStudy(locale, slug);
  if (!study) notFound();

  const industry = study.industry
    ? labelFor(industryLabels, locale, study.industry)
    : "";
  const pillar = study.pillar
    ? labelFor(pillarLabels, locale, study.pillar)
    : "";

  const topicSlugs = study.topics.map((topic) => topic.slug);
  const related = await getRelatedCaseStudiesByTopic(locale, topicSlugs, study.slug, 3);
  const fallback =
    related.length > 0
      ? related
      : (await getCaseStudies(locale))
          .filter((item) => item.slug !== study.slug)
          .slice(0, 3);

  const url = `${siteUrl}${locale === "fr" ? "/fr" : ""}/case-studies/${study.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    datePublished: study.publishedAt,
    dateModified: study.publishedAt,
    author: { "@type": "Organization", name: "Lithe SD", url: siteUrl },
    publisher: { "@type": "Organization", name: "Lithe SD", url: siteUrl },
    image: study.coverImage ? [study.coverImage] : undefined,
    mainEntityOfPage: url,
    about: [industry, pillar, ...study.brands.map((brand) => brand.name)].filter(Boolean),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link href={localeHref(locale, "/case-studies")} className="hover:text-white">
              {l(locale, "Case studies", "Études de cas")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-ash">{study.customerName || study.title}</span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-pill border border-ember/40 bg-ember/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ember-soft">
                  {l(locale, "Case study", "Étude de cas")}
                </span>
                {industry ? (
                  <span className="rounded-pill border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-smoke">
                    {industry}
                  </span>
                ) : null}
                {pillar ? (
                  <span className="text-[11px] text-smoke">{pillar}</span>
                ) : null}
              </div>

              <h1 className="mt-4 text-display-sm font-medium text-white">{study.title}</h1>
              {study.excerpt ? (
                <p className="mt-4 max-w-2xl text-lead text-ash">{study.excerpt}</p>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs text-smoke">
                {study.customerName ? (
                  <span>
                    <span className="text-iron">{l(locale, "Customer", "Client")}: </span>
                    {study.customerName}
                  </span>
                ) : null}
                <span>{formatDate(study.publishedAt, locale)}</span>
              </div>
            </div>

            <ContentCover
              src={study.coverImage}
              label={industry || l(locale, "Lithe SD case study", "Étude de cas Lithe SD")}
              priority
              className="hidden lg:block"
            />
          </div>
        </div>
      </header>

      {study.results.length > 0 ? (
        <Section tone="obsidian" className="border-b border-white/8 py-14 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((result) => (
              <div key={result.label} className="border-l border-white/12 pl-4">
                <p className="font-display text-3xl font-medium tracking-[-0.03em] text-white">
                  {result.value}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.1em] text-smoke">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="min-w-0">
            {study.challenge ? (
              <div>
                <h2 className="text-heading-sm font-medium text-void">
                  {l(locale, "The challenge", "Le défi")}
                </h2>
                <div className="mt-5">
                  <ArticleBody data={study.challenge} />
                </div>
              </div>
            ) : null}

            {study.solution ? (
              <div className="mt-12">
                <h2 className="text-heading-sm font-medium text-void">
                  {l(locale, "The solution", "La solution")}
                </h2>
                <div className="mt-5">
                  <ArticleBody data={study.solution} />
                </div>
              </div>
            ) : null}

            <div className="mt-12 border-t border-void/10 pt-8">
              <p className="text-sm text-body-light">
                {l(
                  locale,
                  "Facing a similar constraint? We can scope a comparable design for your environment.",
                  "Vous faites face à une contrainte similaire ? Nous pouvons cadrer une conception comparable.",
                )}
              </p>
              <Link
                href={localeHref(locale, "/contact")}
                className="mt-4 inline-flex items-center gap-2 rounded-pill bg-iris px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-iris-bright"
              >
                {l(locale, "Talk to us", "Parlons-en")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <ContentAttribution
              locale={locale}
              label={l(locale, "Delivered with", "Réalisé avec")}
              brands={study.brands}
              products={study.products}
              topics={study.topics}
            />
            <div className="rounded-card border border-void/10 bg-linen p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-iron">
                {l(locale, "At a glance", "En bref")}
              </p>
              <dl className="mt-4 flex flex-col gap-3">
                {[
                  { label: l(locale, "Industry", "Secteur"), value: industry },
                  { label: l(locale, "Pillar", "Pilier"), value: pillar },
                  { label: l(locale, "Published", "Publié"), value: formatDate(study.publishedAt, locale) },
                ]
                  .filter((row) => row.value)
                  .map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4 border-b border-void/10 pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.08em] text-iron">
                        {row.label}
                      </dt>
                      <dd className="text-right text-xs text-void">{row.value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {study.quote ? (
        <Section tone="linen">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-iris" />
            <blockquote className="mt-6 font-display text-heading-sm font-medium leading-snug text-void">
              “{study.quote}”
            </blockquote>
            {study.quoteAuthor ? (
              <p className="mt-5 text-sm text-body-light">
                <span className="font-medium text-void">{study.quoteAuthor}</span>
                {study.quoteRole ? <span> · {study.quoteRole}</span> : null}
              </p>
            ) : null}
          </div>
        </Section>
      ) : null}

      <RelatedContent
        locale={locale}
        eyebrow={l(locale, "More outcomes", "D'autres résultats")}
        title={l(locale, "Related case studies", "Études de cas associées")}
        items={fallback.map((item) => caseStudyCard(item, locale))}
        tone="void"
      />

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "Your project", "Votre projet")}
        title={l(locale, "Start with the constraints, not the product", "Partons des contraintes, pas du produit")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Talk to our team", "Contacter notre équipe")}
        secondaryTo="/brands"
        secondaryLabel={l(locale, "Explore brands", "Découvrir les marques")}
      />
    </article>
  );
}
