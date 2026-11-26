import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Button } from "./button";
import { ThreadCanvas } from "./thread-canvas";
import { l, type Locale } from "@/lib/i18n";

export function HomeHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-void pb-20 pt-36 sm:pt-40 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 glow-iris opacity-60" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] glow-ember opacity-40" />

      {/* Four threads converge behind the centred headline. */}
      <div className="pointer-events-none absolute inset-x-0 top-[6%] h-[76%] opacity-90 lg:top-[8%] lg:h-[78%]">
        <ThreadCanvas variant="converge" />
      </div>
      {/* Reading scrim behind the text. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[1100px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(5,7,15,0.9),rgba(5,7,15,0.55)_58%,rgba(5,7,15,0)_85%)]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-smoke">
            <span className="h-px w-8 bg-gradient-to-r from-iris to-ember" />
            {l(
              locale,
              "Value-added distributor · IOC · East Africa · Middle East",
              "Distributeur à valeur ajoutée · COI · Afrique de l'Est · Moyen-Orient",
            )}
            <span className="h-px w-8 bg-gradient-to-l from-iris to-ember" />
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

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button locale={locale} to="/brands" size="lg">
              {l(locale, "Explore brands", "Découvrir les marques")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button locale={locale} to="/partners" variant="ghost" size="lg">
              {l(locale, "Partner with us", "Devenir partenaire")}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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
