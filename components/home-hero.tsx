import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { ParticleSphere } from "./particle-sphere";

function FloatCard({
  label,
  value,
  dot = "cyan",
  className,
}: {
  label: string;
  value: string;
  dot?: "cyan" | "blue" | "amber" | "green";
  className?: string;
}) {
  const dots: Record<string, string> = {
    cyan: "bg-arc-cyan",
    blue: "bg-signal-blue-bright",
    amber: "bg-amber-400",
    green: "bg-emerald-400",
  };
  return (
    <div
      className={`w-[210px] rounded-card border border-white/15 bg-midnight-ink/90 p-4 backdrop-blur-sm ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dots[dot]}`} />
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fog">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-midnight-ink pb-24 pt-32 text-white sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      {/* Particle sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[min(94vw,760px)] w-[min(94vw,760px)] opacity-90">
          <ParticleSphere />
        </div>
      </div>

      {/* Floating data cards */}
      <div className="pointer-events-none absolute left-[4%] top-[24%] hidden animate-float xl:block">
        <FloatCard label="Deal Registration" value="Margin protected" dot="cyan" />
      </div>
      <div className="pointer-events-none absolute right-[4%] top-[32%] hidden [animation-delay:-2.5s] animate-float xl:block">
        <FloatCard label="Channel Partners" value="100+ and growing" dot="green" />
      </div>
      <div className="pointer-events-none absolute bottom-[16%] right-[8%] hidden [animation-delay:-1.2s] animate-float xl:block">
        <FloatCard label="Strategic Regions" value="IOC · Africa · Middle East" dot="blue" />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="dark">
            Value-Added Distributor · IOC · East Africa · Middle East
          </Eyebrow>
          <h1 className="mt-6 text-display font-light text-white">
            A more flexible
            <br className="hidden sm:block" /> approach to technology
          </h1>
          <p className="mt-6 max-w-xl text-lead text-halo-violet/85">
            Lithe SD partners with System Integrators across the full sales,
            design, implementation and support lifecycle — so you can deliver
            measurable outcomes, with confidence.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Become a Partner
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href="/solutions" variant="ghost" size="lg">
              Explore Solutions
            </Button>
          </div>
          <p className="mt-8 font-mono text-micro uppercase tracking-[0.14em] text-fog">
            A member of the Lithe Group of Companies
          </p>
        </div>
      </Container>
    </section>
  );
}
