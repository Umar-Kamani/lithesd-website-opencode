import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Eyebrow } from "@/components/eyebrow";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-midnight-ink pt-28 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <Container className="relative">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Eyebrow tone="dark">Error 404</Eyebrow>
          <p className="mt-8 font-display text-[clamp(4rem,16vw,9rem)] font-light leading-none text-white">
            404
          </p>
          <h1 className="mt-4 text-heading font-light text-white">
            This page has moved on
          </h1>
          <p className="mt-4 text-lead text-halo-violet/85">
            The page you were looking for doesn&apos;t exist or has been
            relocated. Let&apos;s get you back on track.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact us
            </Button>
          </div>
          <Link
            href="/solutions"
            className="mt-8 font-mono text-micro uppercase tracking-[0.14em] text-fog transition-colors hover:text-white"
          >
            Or explore our solutions →
          </Link>
        </div>
      </Container>
    </section>
  );
}
