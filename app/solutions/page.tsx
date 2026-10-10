import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PillarGrid } from "@/components/pillar-grid";
import { ServiceGrid } from "@/components/service-grid";
import { Lifecycle } from "@/components/lifecycle";
import { ValueAddList } from "@/components/value-add";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Cybersecurity, enterprise infrastructure and cloud, business tools, observability, AI & BI and data protection — distributed with certified expertise and full lifecycle support.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Technology that moves your business forward"
        intro="Six pillars of enterprise technology, delivered with the technical depth, commercial flexibility and lifecycle support that System Integrators need to win."
      />

      {/* Pillars */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="Our solution pillars"
            title="A portfolio spanning the modern IT stack"
            intro="Each pillar is backed by certified technical experts and a curated ecosystem of industry-leading vendors."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <PillarGrid />
        </Reveal>
      </Section>

      {/* Professional services */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Professional services"
            title="Expertise you can put in front of your customers"
            intro="From assessment and response to deployment, compliance and audit — our services extend what your team can deliver, without adding headcount."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ServiceGrid />
        </Reveal>
      </Section>

      {/* Lifecycle */}
      <Section tone="dark">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <Reveal>
          <SectionHeading
            eyebrow="How we support you"
            title="With you from first conversation to long-term success"
            tone="dark"
            intro="A streamlined, partner-centric process that carries a project through every stage — aligned to your teams and your customers."
          />
        </Reveal>
        <div className="mt-14 rounded-card border border-white/10 bg-white/[0.02] p-7 lg:p-10">
          <div className="[&_h3]:text-white [&_p]:text-halo-violet/80 [&_li]:text-halo-violet/85 [&_span]:text-halo-violet/70">
            <Lifecycle />
          </div>
        </div>
      </Section>

      {/* Value add */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="Beyond the box"
            title="Value-added services around every solution"
            intro="We wrap every pillar with the enablement, expertise and presales support that turns products into outcomes."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueAddList />
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
