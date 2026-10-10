import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

export function CtaBand({
  eyebrow = "Let's build something together",
  title = "Ready to expand what your business can deliver?",
  intro = "Partner with a value-added distributor that invests in your success — from first conversation through to long-term customer outcomes.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-midnight-ink py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 hero-glow" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-heading-lg font-light text-white">{title}</h2>
          <p className="mt-5 text-lead text-halo-violet/85">{intro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg">
              Become a Partner
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href="/solutions" variant="ghost" size="lg">
              Explore Solutions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
