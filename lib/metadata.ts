import type { Metadata } from "next";
import { siteUrl } from "./site";
import type { Locale } from "./i18n";

export function pageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const clean = path === "/" ? "" : path;
  const canonical = locale === "fr" ? `/fr${clean}` : clean || "/";
  const en = clean || "/";
  const fr = `/fr${clean}` || "/fr";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: { en, fr, "x-default": en },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical === "/" ? "" : canonical}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}
