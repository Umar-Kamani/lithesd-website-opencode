import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Lifecycle } from "@/components/lifecycle";
import { ComparisonTable } from "@/components/comparison-table";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Icon } from "@/lib/icons";
import { litheProtect, whyPartner } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The Lithe PROTECT™ partner program — vendor-independent deal registration, comprehensive training, lucrative incentives and dedicated channel support.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="A partnership model built to protect your margin"
        intro="Lithe SD goes to market exclusively through our partner network. LithePROTECT™ is how we make that partnership worth your while."
      >
        <Button href="/contact" size="lg">
          Join the program
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Button>
      </PageHero>

      {/* LithePROTECT */}
      <Section tone="dark">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <Reveal>
          <SectionHeading
            eyebrow="LithePROTECT™ Partner Program"
            title="Empowering partners, together"
            tone="dark"
            intro="Vendor-independent deal registration, comprehensive training and lucrative incentives — designed for mutual, long-term success."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {litheProtect.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-card border border-white/12 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-arc-cyan/40"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-card border border-white/15 text-arc-cyan">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-[17px] font-normal text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-halo-violet/80">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Why partner */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why partner with Lithe SD"
              title="We help our partners grow"
              intro="From portfolio expansion to recurring revenue, everything we do is designed to make your business more capable and more profitable."
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="flex flex-col gap-3">
              {whyPartner.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-card border border-silver-border bg-white p-5"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-tag bg-signal-blue text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-midnight-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* The difference */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="The Lithe SD difference"
            title="Traditional distribution, versus a true growth partner"
            intro="We work closely with partners throughout the full engagement lifecycle — from first sales conversation through to long-term customer success."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <ComparisonTable />
        </Reveal>
      </Section>

      {/* Lifecycle */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="How we support you"
            title="Support across the entire lifecycle"
            intro="Pre-sales, sales, implementation and post-sales — we are with you from first conversations to long-term customer success."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <Lifecycle />
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Let's talk"
        title="Become a Lithe SD partner"
        intro="Tell us about your practice and the outcomes you want to deliver. We'll show you how the LithePROTECT™ program protects your margin and accelerates delivery."
      />
    </>
  );
}
