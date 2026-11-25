import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "./social-icons";
import { href as localeHref, l, type Locale } from "@/lib/i18n";
import { offices as staticOffices, site } from "@/lib/site";
import { getPolicies } from "@/lib/cms-policies";
import { getSiteSettings } from "@/lib/cms";

const company = [
  { path: "/about", en: "About", fr: "À propos" },
  { path: "/brands", en: "Brands", fr: "Marques" },
  { path: "/partners", en: "Partners", fr: "Partenaires" },
  { path: "/customers", en: "Customers", fr: "Clients" },
  { path: "/events", en: "Events", fr: "Événements" },
];

const explore = [
  { path: "/services", en: "Services", fr: "Services" },
  { path: "/insights", en: "Insights", fr: "Analyses" },
  { path: "/case-studies", en: "Case studies", fr: "Études de cas" },
  { path: "/resources", en: "Resources", fr: "Ressources" },
  { path: "/contact", en: "Contact", fr: "Contact" },
];

export async function SiteFooter({ locale }: { locale: Locale }) {
  const [policies, settings] = await Promise.all([
    getPolicies(locale),
    getSiteSettings(locale),
  ]);

  const footerPolicies = policies.filter((policy) => policy.showInFooter);
  const offices =
    settings && settings.offices.length > 0
      ? settings.offices
      : staticOffices.map((office) => ({
          city: l(locale, office.city.en, office.city.fr),
          role: l(locale, office.role.en, office.role.fr),
          phone: office.phone,
          email: office.email,
        }));
  const email = settings?.email || site.email;
  const phone = settings?.phone || site.phone;
  const hours = settings?.hours || l(locale, site.hours.en, site.hours.fr);

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
            <a href={`mailto:${email}`} className="text-sm text-ash transition-colors hover:text-white">
              {email}
            </a>
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-sm text-ash transition-colors hover:text-white">
              {phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-ash transition-colors hover:text-white">
              {site.whatsapp}
            </a>
            <p className="text-xs text-iron">{hours}</p>
            <div className="mt-2 flex flex-col gap-1">
              {offices.map((office) => (
                <p key={`${office.city}-${office.phone}`} className="text-xs text-iron">
                  {office.city} · {office.phone}
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
            {footerPolicies.length > 0 ? (
              footerPolicies.map((policy) => (
                <Link
                  key={policy.id}
                  href={localeHref(locale, `/policies/${policy.slug}`)}
                  className="text-xs text-ash transition-colors hover:text-white"
                >
                  {policy.title}
                </Link>
              ))
            ) : (
              <Link
                href={localeHref(locale, "/policies")}
                className="text-xs text-ash transition-colors hover:text-white"
              >
                {l(locale, "Policies", "Politiques")}
              </Link>
            )}
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
