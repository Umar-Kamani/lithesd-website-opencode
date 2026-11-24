export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Inline bilingual string helper. */
export function l(locale: Locale, en: string, fr: string): string {
  return locale === "fr" ? fr : en;
}

/** Pick a localized value from a record. */
export function pick<T>(locale: Locale, value: { en: T; fr: T }): T {
  return locale === "fr" ? value.fr : value.en;
}

/** Build a locale-aware href. English lives at the root, French under /fr. */
export function href(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "fr" ? `/fr${clean}` || "/fr" : clean || "/";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Given the current pathname, return the same page in the other locale. */
export function alternateHref(locale: Locale, pathname: string): string {
  const clean = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
  return href(otherLocale(locale), clean);
}
