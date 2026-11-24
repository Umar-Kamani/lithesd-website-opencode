import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { href as localeHref, type Locale } from "@/lib/i18n";

export default function NotFound() {
  const locale: Locale = "en";
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-void pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 glow-iris opacity-70" />
      <Container className="relative">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
            <span className="h-px w-8 bg-gradient-to-r from-iris to-ember" />
            Error 404
          </span>
          <p className="mt-8 font-display text-[clamp(4rem,16vw,9rem)] font-medium leading-none text-white">
            404
          </p>
          <h1 className="mt-4 text-heading font-medium text-white">
            This page has moved on
          </h1>
          <p className="mt-4 text-lead text-ash">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button locale={locale} to="/" size="lg">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
            <Button locale={locale} to="/contact" variant="ghost" size="lg">
              Contact us
            </Button>
          </div>
          <Link
            href={localeHref(locale, "/brands")}
            className="mt-8 text-[11px] uppercase tracking-[0.14em] text-iron transition-colors hover:text-white"
          >
            Or explore the brands →
          </Link>
        </div>
      </Container>
    </section>
  );
}
