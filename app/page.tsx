import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/stat-band";
import { ChannelPain } from "@/components/channel-pain";
import { ValueAddGrid } from "@/components/value-add";
import { PillarGrid } from "@/components/pillar-grid";
import { LogoWall } from "@/components/logo-wall";
import { CustomerWall } from "@/components/customer-wall";
import { VerticalsGrid } from "@/components/verticals-grid";
import { WhyChoose } from "@/components/why-choose";
import { LocationCards } from "@/components/location-cards";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/button";
import { Eyebrow } from "@/components/eyebrow";
import { Icon } from "@/lib/icons";
import { about, customers, pillars, regionNames, vendors } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* By the numbers */}
      <Section tone="dark" className="border-t border-white/10">
        <Reveal>
          <StatBand tone="dark" />
        </Reveal>
      </Section>

      {/* Gradient transition into light product surfaces */}
      <div className="gradient-transition h-24" aria-hidden="true" />

      {/* Who we are */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="text-heading font-light text-midnight-ink">
                We go beyond traditional distribution
              </h2>
              <div className="flex flex-col gap-4 text-lead text-slate-body">
                {about.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button href="/about" variant="outline">
                  Our story
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-card border border-silver-border bg-paper-muted p-7">
              <Eyebrow>Solution pillars</Eyebrow>
              <ul className="mt-6 flex flex-col divide-y divide-silver-border">
                {pillars.map((pillar) => (
                  <li key={pillar.id}>
                    <Link
                      href="/solutions"
                      className="group flex items-center gap-4 py-4 transition-colors"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-silver-border bg-white text-signal-blue">
                        <Icon name={pillar.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-[15px] text-midnight-ink">
                        {pillar.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-mist transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-signal-blue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The channel reality */}
      <ChannelPain />

      {/* Value addition */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="Our Value ADDition"
            title="Everything a modern System Integrator needs to grow"
            intro="We elevate your channel experience with a suite of value-added services tailored to your unique requirements."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ValueAddGrid />
        </Reveal>
      </Section>

      {/* Solution pillars preview */}
      <Section tone="muted">
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="What we distribute"
                title="A portfolio built for the modern enterprise"
                intro="Six pillars of technology, each backed by certified expertise and full lifecycle support."
                className="lg:max-w-2xl"
              />
              <Button href="/solutions" variant="outline" className="shrink-0">
                All solutions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PillarGrid limit={3} />
          </Reveal>
        </div>
      </Section>

      {/* Vendor ecosystem */}
      <Section tone="light" container={false}>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Vendor ecosystem"
              title="An ecosystem engineered for efficiency"
              intro="A diverse ecosystem of IT solutions from industry leaders — seamlessly integrated to elevate business performance."
              align="center"
              className="mx-auto"
            />
          </Reveal>
        </Container>
        <Reveal delay={120} className="mt-12 flex flex-col gap-4">
          <LogoWall items={vendors} />
          <LogoWall items={[...vendors].reverse()} reverse slow />
        </Reveal>
        <Container className="mt-10">
          <div className="flex justify-center">
            <Button href="/vendors" variant="outline">
              Explore the vendor ecosystem
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Who we serve */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="Who we serve"
            title="Trusted across every major sector"
            intro="From government and banking to healthcare, telecoms and datacenters — Lithe SD supports the organisations that keep the region running."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <VerticalsGrid />
        </Reveal>
        <Reveal delay={160} className="mt-12">
          <p className="text-center font-mono text-micro uppercase tracking-[0.14em] text-fog">
            1200+ customers across {regionNames.join(" · ")}
          </p>
          <CustomerWall items={customers} className="mt-6" slow />
        </Reveal>
      </Section>

      {/* Why choose */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose Lithe SD"
            title="A partner, not just a supplier"
            intro="We differentiate ourselves by working closely with partners throughout the full engagement lifecycle — from initial sales conversation to long-term customer success."
          />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <WhyChoose />
        </Reveal>
      </Section>

      {/* Locations */}
      <Section tone="muted">
        <Reveal>
          <SectionHeading
            eyebrow="On the ground"
            title="Local presence across three regions"
            intro="Three strategic offices connect our partners and end-customers to the technology they need, wherever they operate."
          />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <LocationCards />
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
