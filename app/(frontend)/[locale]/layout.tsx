import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta = {
  en: {
    title: "Lithe SD — Enterprise IT Solutions Value-Added Distributor",
    description:
      "Lithe SD is a solutions value-added distributor across the IOC, East Africa and Middle East — partnering with System Integrators on cybersecurity, cloud, infrastructure, observability and data protection.",
    keywords: [
      "value added distributor",
      "IT distributor",
      "cybersecurity distribution",
      "cloud infrastructure",
      "IOC",
      "East Africa",
      "Middle East",
    ],
  },
  fr: {
    title: "Lithe SD — Distributeur à valeur ajoutée de solutions IT",
    description:
      "Lithe SD est un distributeur à valeur ajoutée de solutions dans la COI, en Afrique de l'Est et au Moyen-Orient — partenaire des intégrateurs sur la cybersécurité, le cloud, l'infrastructure, l'observabilité et la protection des données.",
    keywords: [
      "distributeur à valeur ajoutée",
      "distribution IT",
      "cybersécurité",
      "infrastructure cloud",
      "COI",
      "Afrique de l'Est",
      "Moyen-Orient",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const m = meta[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: m.title,
      template: "%s · Lithe SD",
    },
    description: m.description,
    keywords: [...m.keywords],
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    publisher: site.legalName,
    alternates: {
      canonical: locale === "fr" ? "/fr" : "/",
      languages: {
        en: "/",
        fr: "/fr",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      url: locale === "fr" ? `${siteUrl}/fr` : siteUrl,
      siteName: site.name,
      title: m.title,
      description: m.description,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    logo: `${siteUrl}/lithe-logo.png`,
    email: site.email,
    telephone: site.phone,
    sameAs: [site.social.linkedin, site.social.facebook],
    areaServed: ["Indian Ocean Commission", "East Africa", "Middle East"],
    address: [
      { "@type": "PostalAddress", addressLocality: "Quatre Bornes", addressCountry: "MU" },
      { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-dvh bg-void text-white">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-iris focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
