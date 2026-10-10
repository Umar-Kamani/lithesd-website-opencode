import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { VendorCatalog } from "@/components/vendor-catalog";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Vendors",
  description:
    "An ecosystem of industry-leading vendors across cybersecurity, cloud, business tools, observability, AI & BI and data protection — curated and supported by Lithe SD.",
};

export default function VendorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Vendor ecosystem"
        title="Best-in-class vendors, one trusted distributor"
        intro="We curate, validate and support a portfolio of innovative and disruptive technologies — so partners can confidently take them to market."
      />

      {/* Catalog */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="Our ecosystem"
            title="The technology behind our solutions"
            intro="Vendor logos are the property of their respective owners and are shown to represent our distribution relationships."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <VendorCatalog />
        </Reveal>
      </Section>

      {/* Onboarding */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Vendor onboarding"
            title="How technology joins the Lithe SD portfolio"
            intro="A rigorous, transparent onboarding path that ensures every solution is market-ready, commercially sound and fully supported in region."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <OnboardingFlow />
        </Reveal>
      </Section>

      {/* Vendor CTA */}
      <Section tone="dark">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 hero-glow" />
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <SectionHeading
              eyebrow="Vendors"
              title="Bring your technology to the region"
              intro="Partner with a distributor that invests in enablement, demand generation and technical validation — and goes to market 100% through the channel."
              tone="dark"
              align="center"
            />
            <div className="mt-9">
              <Button href="/contact" size="lg">
                Become a Vendor
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Partner with Lithe SD"
        title="Ready to add value to your portfolio?"
        intro="Join a network of System Integrators who grow faster with a distributor that is invested in their success."
      />
    </>
  );
}
