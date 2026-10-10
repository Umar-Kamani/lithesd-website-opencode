import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { ValueCards } from "@/components/value-cards";
import { LocationCards } from "@/components/location-cards";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Eyebrow } from "@/components/eyebrow";
import { about, whyPartner } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lithe Solutions Distributor Ltd (Lithe SD) is a Solutions Value-Added Distributor operating in the IOC, Africa and Middle East — a proud member of the Lithe Group of Companies.",
};

const pillarsOfPurpose = [
  { key: "Vision", body: about.vision },
  { key: "Mission", body: about.mission },
  { key: "Our Process", body: about.process },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Lithe SD"
        title="A more flexible approach to technology distribution"
        intro="We partner with System Integrators across the entire sales, design, implementation and support lifecycle — ensuring successful, measurable customer outcomes."
      />

      {/* Intro + stats */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="text-heading font-light text-midnight-ink">
                Distribution, reimagined around the partner
              </h2>
              <div className="flex flex-col gap-4 text-lead text-slate-body">
                {about.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              <StatBand tone="light" />
              <div className="rounded-card border border-silver-border bg-paper-muted p-6">
                <p className="text-sm leading-relaxed text-slate-body">
                  Every System Integrator has unique strengths — and we tailor our
                  engagement to complement and amplify yours, with deep regional
                  knowledge and a growing network of channel partners.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Vision / Mission / Process */}
      <Section tone="dark">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <Reveal>
          <SectionHeading
            eyebrow="Our purpose"
            title="Vision, mission and the way we work"
            tone="dark"
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 lg:grid-cols-3">
          {pillarsOfPurpose.map((item) => (
            <div key={item.key} className="flex flex-col gap-4 bg-midnight-ink p-7">
              <h3 className="text-subheading font-light text-white">
                {item.key}
              </h3>
              <p className="text-[15px] leading-relaxed text-halo-violet/85">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section tone="deep">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
        <Reveal>
          <SectionHeading
            eyebrow="Our values"
            title="The principles behind every partnership"
            intro="We are committed to delivering cutting-edge technology solutions that empower businesses to optimise their operations and achieve their strategic objectives."
            tone="dark"
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueCards />
        </Reveal>
      </Section>

      {/* Why partner */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why partner with us"
              title="What partners gain when they work with Lithe SD"
              intro="We help our partners grow revenue, accelerate delivery and build durable, recurring relationships with their customers."
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

      {/* Locations */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Locations"
            title="IOC · East Africa · Middle East"
            intro="Local teams, regional reach and support that meets you where you are."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <LocationCards />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button href="/contact" variant="outline">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
