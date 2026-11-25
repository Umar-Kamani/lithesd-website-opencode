import { getBlogPosts } from "@/lib/cms-content";
import { isLocale, type Locale } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";

export const revalidate = 300;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const posts = await getBlogPosts(locale);

  const base = `${siteUrl}${locale === "fr" ? "/fr" : ""}`;
  const items = posts
    .slice(0, 30)
    .map((post) => {
      const link = `${base}/insights/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)} — ${locale === "fr" ? "Analyses" : "Insights"}</title>
    <link>${base}/insights</link>
    <description>${escape(
      locale === "fr"
        ? "Analyses pratiques sur la cybersécurité, l'infrastructure et la protection des données."
        : "Practical analysis on cybersecurity, infrastructure and data protection.",
    )}</description>
    <language>${locale === "fr" ? "fr" : "en"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
