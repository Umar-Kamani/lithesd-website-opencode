import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { OfficeCards } from "@/components/office-cards";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "@/components/social-icons";
import { isLocale, l, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return pageMetadata({
    locale,
    path: "/contact",
    title: l(locale, "Contact", "Contact"),
    description: l(
      locale,
      "Talk to Lithe SD — email info@lithesd.com or call +230 467 2006. Offices in Mauritius, Kenya and Dubai.",
      "Contactez Lithe SD — info@lithesd.com ou +230 467 2006. Bureaux à Maurice, au Kenya et à Dubaï.",
    ),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const rows = [
    { icon: Mail, label: l(locale, "Email", "Email"), value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: l(locale, "Phone", "Téléphone"), value: site.phone, href: site.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp, href: site.whatsappHref },
    { icon: MapPin, label: "What3words", value: site.what3words, href: site.what3wordsHref },
  ];

  return (
    <>
      <PageHero
        eyebrow={l(locale, "Contact", "Contact")}
        title={l(locale, "Let's build something together", "Construisons quelque chose ensemble")}
        intro={l(
          locale,
          "Tell us what you're trying to achieve and we'll connect you with the right team — across the IOC, East Africa and the Middle East.",
          "Dites-nous ce que vous cherchez à accomplir et nous vous mettrons en relation avec la bonne équipe.",
        )}
      />

      <Section tone="void">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={l(locale, "Send a message", "Envoyer un message")}
                title={l(locale, "Start a conversation", "Démarrer la conversation")}
                dark
              />
              <ContactForm locale={locale} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6 rounded-card border border-white/10 bg-charcoal p-7">
              <h3 className="text-heading-sm font-medium text-white">
                {l(locale, "Reach us directly", "Nous joindre directement")}
              </h3>
              <ul className="flex flex-col divide-y divide-white/10">
                {rows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label}>
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 py-4 transition-colors hover:text-white"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-iris-bright">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-[0.12em] text-iron">{row.label}</span>
                          <span className="text-[15px] text-white">{row.value}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-3 rounded-card border border-white/10 bg-white/[0.03] p-4">
                <Clock className="h-4 w-4 shrink-0 text-iris-bright" />
                <span className="text-sm text-ash">{l(locale, site.hours.en, site.hours.fr)}</span>
              </div>

              <div className="flex items-center gap-3">
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-ash transition-colors hover:border-iris-bright hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="obsidian">
        <Reveal>
          <SectionHeading
            eyebrow={l(locale, "Our offices", "Nos bureaux")}
            title="IOC · East Africa · Middle East"
            dark
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <OfficeCards locale={locale} />
        </Reveal>
      </Section>
    </>
  );
}
