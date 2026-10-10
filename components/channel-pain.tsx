import { ArrowDown } from "lucide-react";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { painPoints } from "@/lib/content";

export function ChannelPain() {
  return (
    <section className="relative overflow-hidden bg-midnight-deep py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="dark">The channel reality</Eyebrow>
          <h2 className="mt-5 text-heading font-light text-white">
            As a Channel Partner, you are likely navigating
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point}
              className="flex items-start gap-4 rounded-card border border-white/12 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-signal-blue-bright" />
              <p className="text-[15px] leading-relaxed text-halo-violet/90">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <ArrowDown className="h-6 w-6 text-arc-cyan" aria-hidden="true" />
          <p className="max-w-2xl font-display text-heading-sm font-light uppercase tracking-[0.02em] text-white">
            That is exactly where{" "}
            <span className="text-arc-cyan text-shadow-glow">Lithe SD</span>{" "}
            comes in
          </p>
        </div>
      </Container>
    </section>
  );
}
