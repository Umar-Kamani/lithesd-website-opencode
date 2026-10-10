import type { ReactNode } from "react";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-midnight-ink pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 hero-glow" />
      <Container className="relative">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-display font-light text-white">
            {title}
          </h1>
          {intro ? (
            <p className="max-w-2xl text-lead text-halo-violet/85">{intro}</p>
          ) : null}
          {children ? <div className="pt-4">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
