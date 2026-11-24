import type { ReactNode } from "react";
import { Container } from "./container";

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
    <section className="relative overflow-hidden border-b border-white/8 bg-void pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] glow-iris opacity-70" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] glow-ember opacity-40" />
      <Container className="relative">
        <div className="flex max-w-4xl flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
            <span className="h-px w-8 bg-gradient-to-r from-iris to-ember" />
            {eyebrow}
          </span>
          <h1 className="text-display-sm font-medium text-white">{title}</h1>
          {intro ? <p className="max-w-2xl text-lead text-ash">{intro}</p> : null}
          {children ? <div className="pt-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
