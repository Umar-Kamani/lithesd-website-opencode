import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ContentCover } from "@/components/content-cover";
import { ContentAttribution } from "@/components/content-attribution";
import { ArticleBody } from "@/components/rich-text";
import { RelatedContent } from "@/components/related-content";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import {
  formatDate,
  getBlogPost,
  getBlogPosts,
  getRelatedPostsByTopic,
  readingTime,
} from "@/lib/cms-content";
import { blogPostCard } from "@/lib/content-view";
import { href as localeHref, isLocale, l, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { labelFor, pillarLabels } from "@/lib/taxonomy";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getBlogPosts("en");
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const post = await getBlogPost(locale, slug);
  if (!post) return {};

  const base = pageMetadata({
    locale,
    path: `/insights/${post.slug}`,
    title: post.title,
    description: post.excerpt,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const post = await getBlogPost(locale, slug);
  if (!post) notFound();

  const topicSlugs = post.topics.map((topic) => topic.slug);
  const related = await getRelatedPostsByTopic(locale, topicSlugs, post.slug, 3);
  const fallback =
    related.length > 0
      ? related
      : (await getBlogPosts(locale)).filter((item) => item.slug !== post.slug).slice(0, 3);

  const minutes = readingTime(post.body);
  const pillar = post.pillar ? labelFor(pillarLabels, locale, post.pillar) : "";
  const url = `${siteUrl}${locale === "fr" ? "/fr" : ""}/insights/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.authorName || "Lithe SD" },
    publisher: { "@type": "Organization", name: "Lithe SD", url: siteUrl },
    image: post.coverImage ? [post.coverImage] : undefined,
    mainEntityOfPage: url,
    articleSection: pillar || undefined,
    keywords: [...post.topics.map((topic) => topic.name), ...post.tags].join(", "),
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
            <Link href={localeHref(locale, "/insights")} className="hover:text-white">
              {l(locale, "Insights", "Analyses")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-ash">{post.title}</span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                {pillar ? (
                  <span className="rounded-pill border border-iris/40 bg-iris/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-iris-bright">
                    {pillar}
                  </span>
                ) : null}
                <span className="text-[11px] text-smoke">
                  {formatDate(post.publishedAt, locale)}
                </span>
                <span className="text-[11px] text-iron">·</span>
                <span className="text-[11px] text-smoke">
                  {minutes} {l(locale, "min read", "min de lecture")}
                </span>
              </div>

              <h1 className="mt-4 text-display-sm font-medium text-white">{post.title}</h1>
              {post.excerpt ? (
                <p className="mt-4 max-w-2xl text-lead text-ash">{post.excerpt}</p>
              ) : null}

              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-iris/15 font-display text-sm text-iris-bright">
                  {(post.authorName || "L").slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{post.authorName}</p>
                  {post.authorRole ? (
                    <p className="text-xs text-smoke">{post.authorRole}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <ContentCover
              src={post.coverImage}
              label={pillar || l(locale, "Lithe SD insight", "Analyse Lithe SD")}
              priority
              className="hidden lg:block"
            />
          </div>
        </div>
      </header>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="min-w-0">
            <ArticleBody data={post.body} />

            <div className="mt-12 border-t border-void/10 pt-8">
              <p className="text-sm text-body-light">
                {l(
                  locale,
                  "Have a question about this topic? Our practice team can walk through your environment.",
                  "Une question sur ce sujet ? Notre équipe peut analyser votre environnement.",
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
              label={l(locale, "Attributed to", "Attribué à")}
              brands={post.brands}
              products={post.products}
              topics={post.topics}
            />
            <div className="rounded-card border border-void/10 bg-linen p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-iron">
                {l(locale, "Share", "Partager")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body-light">
                {l(
                  locale,
                  "Send this analysis to a colleague who is scoping a similar project.",
                  "Transmettez cette analyse à un collègue qui cadre un projet similaire.",
                )}
              </p>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-iris hover:text-iris-deep"
              >
                {l(locale, "Email this article", "Envoyer par email")}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <RelatedContent
        locale={locale}
        eyebrow={l(locale, "Keep reading", "Poursuivre la lecture")}
        title={l(locale, "Related insights", "Analyses associées")}
        items={fallback.map((item) => blogPostCard(item, locale))}
        tone="linen"
      />

      <CtaBand
        locale={locale}
        eyebrow={l(locale, "From analysis to delivery", "De l'analyse à la mise en œuvre")}
        title={l(locale, "Let's scope this with your team", "Cadrons cela avec votre équipe")}
        primaryTo="/contact"
        primaryLabel={l(locale, "Start a conversation", "Démarrer un échange")}
        secondaryTo="/case-studies"
        secondaryLabel={l(locale, "See case studies", "Voir les études de cas")}
      />
    </article>
  );
}
