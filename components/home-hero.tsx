import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Button } from "./button";
import { ThreadCanvas } from "./thread-canvas";
import { l, type Locale } from "@/lib/i18n";

export function HomeHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-void pb-20 pt-36 sm:pt-40 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[620px] w-[620px] glow-iris opacity-70" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] glow-ember opacity-50" />

      {/* The Thread — sits behind the headline and opens out to the right. */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] h-[52%] opacity-40 sm:top-[12%] sm:h-[60%] sm:opacity-55 lg:inset-y-0 lg:left-[28%] lg:right-[-6%] lg:top-[14%] lg:h-[72%] lg:opacity-95">
        <ThreadCanvas />
      </div>

      <Container className="relative">
        <div className="flex max-w-3xl flex-col items-start">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
            <span className="h-px w-8 bg-gradient-to-r from-iris to-ember" />
            {l(
              locale,
              "Value-added distributor · IOC · East Africa · Middle East",
              "Distributeur à valeur ajoutée · COI · Afrique de l'Est · Moyen-Orient",
            )}
          </span>

          <h1 className="mt-7 font-display text-display font-medium text-white">
            {l(locale, "A more flexible approach to technology", "Une approche plus flexible de la technologie")}
          </h1>

          <p className="mt-7 max-w-xl text-lead text-ash">
            {l(
              locale,
              "Lithe SD partners with System Integrators across the full sales, design, implementation and support lifecycle — so you can deliver measurable outcomes with confidence.",
              "Lithe SD accompagne les intégrateurs sur tout le cycle de vente, de conception, de mise en œuvre et de support — pour des résultats mesurables en toute confiance.",
            )}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button locale={locale} to="/brands" size="lg">
              {l(locale, "Explore brands", "Découvrir les marques")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button locale={locale} to="/partners" variant="ghost" size="lg">
              {l(locale, "Partner with us", "Devenir partenaire")}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { value: "6", en: "pillars", fr: "piliers" },
              { value: "100+", en: "channel partners", fr: "partenaires" },
              { value: "20+", en: "countries", fr: "pays" },
            ].map((stat) => (
              <div key={stat.en} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-medium text-white">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-iron">
                  {l(locale, stat.en, stat.fr)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
