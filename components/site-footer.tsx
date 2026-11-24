import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "./social-icons";
import { href as localeHref, l, type Locale } from "@/lib/i18n";
import { offices, site } from "@/lib/site";

const company = [
  { path: "/about", en: "About", fr: "À propos" },
  { path: "/brands", en: "Brands", fr: "Marques" },
  { path: "/partners", en: "Partners", fr: "Partenaires" },
  { path: "/customers", en: "Customers", fr: "Clients" },
  { path: "/events", en: "Events", fr: "Événements" },
];

const explore = [
  { path: "/solutions", en: "Solutions", fr: "Solutions" },
  { path: "/services", en: "Services", fr: "Services" },
  { path: "/resources", en: "Resources", fr: "Ressources" },
  { path: "/contact", en: "Contact", fr: "Contact" },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-obsidian">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] glow-iris opacity-60" />
      <div className="relative mx-auto w-full max-w-page px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-5">
            <Logo locale={locale} width={150} />
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              {l(
                locale,
                "A solutions value-added distributor for the IOC, East Africa and the Middle East — partnering with System Integrators across the full lifecycle.",
                "Un distributeur à valeur ajoutée de solutions pour la COI, l'Afrique de l'Est et le Moyen-Orient.",
              )}
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: site.social.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-ash transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-iron">
              {l(locale, "A member of the Lithe Group of Companies", "Membre du Lithe Group of Companies")}
            </p>
          </div>

          <FooterColumn title={l(locale, "Company", "Société")}>
            {company.map((item) => (
              <FooterLink key={item.path} to={localeHref(locale, item.path)}>
                {l(locale, item.en, item.fr)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={l(locale, "Explore", "Explorer")}>
            {explore.map((item) => (
              <FooterLink key={item.path} to={localeHref(locale, item.path)}>
                {l(locale, item.en, item.fr)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={l(locale, "Get in touch", "Nous contacter")}>
            <a href={`mailto:${site.email}`} className="text-sm text-ash transition-colors hover:text-white">
              {site.email}
            </a>
            <a href={site.phoneHref} className="text-sm text-ash transition-colors hover:text-white">
              {site.phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-ash transition-colors hover:text-white">
              {site.whatsapp}
            </a>
            <p className="text-xs text-iron">{l(locale, site.hours.en, site.hours.fr)}</p>
            <div className="mt-2 flex flex-col gap-1">
              {offices.map((office) => (
                <p key={office.city.en} className="text-xs text-iron">
                  {l(locale, office.city.en, office.city.fr)} · {office.phone}
                </p>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-iron">
            IOC · East Africa · Middle East · 100% Channel Driven
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { href: site.legal.privacy, en: "Privacy policy", fr: "Politique de confidentialité" },
              { href: site.legal.terms, en: "Terms & conditions", fr: "Conditions générales" },
              { href: site.legal.antiCorruption, en: "Anti-corruption policy", fr: "Politique anticorruption" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ash transition-colors hover:text-white"
              >
                {l(locale, item.en, item.fr)}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs text-iron">
          © {new Date().getFullYear()} {site.legalName}.{" "}
          {l(locale, "All rights reserved.", "Tous droits réservés.")}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-smoke">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      className="group inline-flex items-center gap-1.5 text-sm text-ash transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
