import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lithe SD — Enterprise IT Solutions Value-Added Distributor",
    template: "%s · Lithe SD",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "value added distributor",
    "IT distributor",
    "cybersecurity distribution",
    "cloud infrastructure",
    "observability",
    "data protection",
    "IOC",
    "East Africa",
    "Middle East",
    "Mauritius",
    "Dubai",
    "Nairobi",
    "System Integrators",
    "Lithe SD",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Lithe SD — A more flexible approach to technology distribution",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lithe SD — A more flexible approach",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#00052e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/lithe-logo.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    sameAs: [site.social.linkedin, site.social.facebook],
    areaServed: ["Indian Ocean Commission", "East Africa", "Middle East"],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Quatre Bornes",
        addressCountry: "MU",
        streetAddress: "02, Osman Avenue, Quatre Bornes – 72249",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
        streetAddress: "Suite 3, 20 Westlands Road",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
        streetAddress: "Suite 801-04, Al Serkal Building 2, Port Saeed, Deira",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-midnight-ink">
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-signal-blue focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
