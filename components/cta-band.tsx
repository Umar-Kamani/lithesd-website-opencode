import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./container";
import { l, type Locale } from "@/lib/i18n";

export function CtaBand({
  locale,
  eyebrow,
  title,
  intro,
  primaryTo = "/contact",
  primaryLabel,
  secondaryTo = "/brands",
  secondaryLabel,
}: {
  locale: Locale;
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryTo?: string;
  primaryLabel?: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-void py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 glow-iris opacity-70" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] glow-ember opacity-50" />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
            <span className="h-px w-8 bg-gradient-to-r from-iris to-ember" />
            {eyebrow ?? l(locale, "Let's build something together", "Construisons ensemble")}
          </span>
          <h2 className="mt-5 text-display-sm font-medium text-white">
            {title ?? l(locale, "Ready to expand what your business can deliver?", "Prêt à élargir ce que votre entreprise peut livrer ?")}
          </h2>
          <p className="mt-5 max-w-2xl text-lead text-ash">
            {intro ??
              l(
                locale,
                "Partner with a value-added distributor that invests in your success — from first conversation through to long-term customer outcomes.",
                "Associez-vous à un distributeur à valeur ajoutée qui investit dans votre réussite, du premier échange aux résultats à long terme.",
              )}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button locale={locale} to={primaryTo} size="lg">
              {primaryLabel ?? l(locale, "Become a partner", "Devenir partenaire")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button locale={locale} to={secondaryTo} variant="ghost" size="lg">
              {secondaryLabel ?? l(locale, "Explore brands", "Découvrir les marques")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
