import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { LocationCards } from "@/components/location-cards";
import { ContactForm } from "@/components/contact-form";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/social-icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lithe SD — offices in Mauritius, Kenya and Dubai. Email info@lithesd.com or call +230 467 2006.",
};

const contactRows = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.whatsapp,
    href: site.whatsappHref,
  },
  {
    icon: MapPin,
    label: "What3words",
    value: site.what3words,
    href: site.what3wordsHref,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something together"
        intro="Tell us what you're trying to achieve and we'll connect you with the right team — across the IOC, East Africa and the Middle East."
      />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Send a message"
                title="Start a conversation"
              />
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6 rounded-card border border-silver-border bg-paper-muted p-7">
              <h3 className="text-subheading font-light text-midnight-ink">
                Reach us directly
              </h3>
              <ul className="flex flex-col divide-y divide-silver-border">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label}>
                      <a
                        href={row.href}
                        target={row.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          row.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-4 py-4 transition-colors hover:text-signal-blue"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-silver-border bg-white text-signal-blue">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-mono text-micro uppercase text-fog">
                            {row.label}
                          </span>
                          <span className="text-[15px] text-midnight-ink">
                            {row.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-3 rounded-card border border-silver-border bg-white p-4">
                <Clock className="h-4 w-4 shrink-0 text-signal-blue" aria-hidden="true" />
                <span className="text-sm text-slate-body">{site.hours}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-silver-border bg-white text-midnight-ink transition-colors hover:border-signal-blue hover:text-signal-blue"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-silver-border bg-white text-midnight-ink transition-colors hover:border-signal-blue hover:text-signal-blue"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-silver-border bg-white text-midnight-ink transition-colors hover:border-signal-blue hover:text-signal-blue"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Our offices"
            title="IOC · East Africa · Middle East"
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <LocationCards />
        </Reveal>
      </Section>
    </>
  );
}
