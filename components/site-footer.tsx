import Link from "next/link";
import { Logo } from "./logo";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "./social-icons";
import { footerLegal, site } from "@/lib/site";
import { pillars, regionNames } from "@/lib/content";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Vendors", href: "/vendors" },
  { label: "Partners", href: "/partners" },
  { label: "Customers", href: "/customers" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-midnight-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="relative mx-auto w-full max-w-page px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Logo width={150} />
            <p className="max-w-xs text-sm leading-relaxed text-halo-violet/80">
              {site.shortDescription}
            </p>
            <p className="font-mono text-micro uppercase text-fog">
              {site.group}
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.whatsapp} label="WhatsApp">
                <WhatsAppIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Company */}
          <FooterColumn title="Company">
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Solutions */}
          <FooterColumn title="Solutions">
            {pillars.map((pillar) => (
              <FooterLink key={pillar.id} href="/solutions">
                {pillar.title}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Get in Touch">
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-halo-violet/80 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="text-sm text-halo-violet/80 transition-colors hover:text-white"
            >
              {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-halo-violet/80 transition-colors hover:text-white"
            >
              {site.whatsapp}
            </a>
            <a
              href={site.what3wordsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-fog transition-colors hover:text-white"
            >
              {site.what3words}
            </a>
            <p className="mt-1 text-xs text-fog">{site.hours}</p>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-micro uppercase text-fog">
            <span>{regionNames.join(" · ")}</span>
            <span className="hidden h-1 w-1 rounded-full bg-fog/50 sm:block" />
            <span>100% Channel Driven</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLegal.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-halo-violet/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-fog">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-micro uppercase tracking-[0.14em] text-halo-violet">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-halo-violet/80 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-button border border-white/15 text-halo-violet/80 transition-colors hover:border-arc-cyan/60 hover:text-white"
    >
      {children}
    </a>
  );
}
