import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { VerticalsGrid } from "@/components/verticals-grid";
import { CustomerWall } from "@/components/customer-wall";
import { CtaBand } from "@/components/cta-band";
import { customers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Lithe SD supports over 1,200 customers across government, banking, healthcare, telecoms, hospitality, datacenters, retail and more.",
};

const half = Math.ceil(customers.length / 2);

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Trusted by the organisations that keep the region running"
        intro="Across banking, telecoms, government, healthcare, hospitality and beyond, Lithe SD technology powers businesses throughout the IOC, Africa and Middle East."
      />

      {/* Stats */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="By the numbers"
            title="Scale that partners can rely on"
            intro="Deep regional knowledge, a growing channel network and a track record of successful delivery."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <StatBand tone="light" />
        </Reveal>
      </Section>

      {/* Verticals */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Who we serve"
            title="Every major sector, one standard of service"
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <VerticalsGrid />
        </Reveal>
      </Section>

      {/* Customer wall */}
      <Section tone="light" container={false}>
        <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Our customers"
              title="Organisations we are proud to support"
              align="center"
              className="mx-auto"
            />
          </Reveal>
        </div>
        <Reveal delay={120} className="mt-12 flex flex-col gap-8">
          <CustomerWall items={customers.slice(0, half)} slow />
          <CustomerWall
            items={customers.slice(half)}
            reverse
            className="max-w-[1400px] self-center"
          />
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Join them"
        title="Let's build your next success story"
        intro="Whether you are a System Integrator or an end-customer, our team is ready to help you deliver measurable outcomes."
      />
    </>
  );
}
