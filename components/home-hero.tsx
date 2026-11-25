import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Container } from "./container";
import { Button } from "./button";
import { ThreadCanvas } from "./thread-canvas";
import { href as localeHref, l, type Locale } from "@/lib/i18n";
import type { SiteOffice } from "@/lib/cms";

export function HomeHero({
  locale,
  offices,
}: {
  locale: Locale;
  offices: SiteOffice[];
}) {
  const regions = offices.slice(0, 3);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-void pb-20 pt-36 sm:pt-40 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[620px] w-[620px] glow-iris opacity-70" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] glow-ember opacity-50" />

      {/* The Thread */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] h-[70%] opacity-90">
        <ThreadCanvas />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex max-w-2xl flex-col items-start">
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

          {/* Regional coverage */}
          <div className="relative hidden lg:block">
            <div className="rounded-panel border border-white/12 bg-charcoal/90 p-1.5 shadow-card">
              <div className="rounded-[26px] border border-white/8 bg-obsidian p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-smoke">
                    <span className="h-1.5 w-1.5 rounded-full bg-iris-bright" />
                    {l(locale, "Regional coverage", "Couverture régionale")}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-iron">
                    IOC · Africa · ME
                  </span>
                </div>

                <p className="mt-5 font-display text-xl font-medium leading-snug text-white">
                  {l(locale, "Three regions. One accountable partner.", "Trois régions. Un partenaire responsable.")}
                </p>

                <div className="mt-5 flex flex-col gap-2.5">
                  {(regions.length > 0
                    ? regions
                    : [
                        { city: "Mauritius", role: l(locale, "IOC office", "Bureau COI"), phone: "+230 467 2006", email: "" },
                        { city: "Kenya", role: l(locale, "East Africa office", "Bureau Afrique de l'Est"), phone: "+254 727 162 875", email: "" },
                        { city: "Dubai", role: l(locale, "Middle East office", "Bureau Moyen-Orient"), phone: "+971 56 211 7015", email: "" },
                      ]
                  ).map((office) => (
                    <div
                      key={`${office.city}-${office.phone}`}
                      className="flex items-start gap-3 rounded-card border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-iris/15 text-iris-bright">
                        <MapPin className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">{office.city}</p>
                        <p className="truncate text-[11px] text-smoke">{office.role}</p>
                      </div>
                      {office.phone ? (
                        <a
                          href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                          className="inline-flex items-center gap-1 text-[11px] text-ash transition-colors hover:text-white"
                        >
                          <Phone className="h-3 w-3" />
                          {office.phone}
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>

                <a
                  href={localeHref(locale, "/contact")}
                  className="mt-4 flex items-center justify-between rounded-card border border-white/8 bg-white/[0.02] px-4 py-3 transition-colors hover:border-iris/50"
                >
                  <span className="text-[11px] text-ash">
                    {l(locale, "Talk to your regional team", "Parler à votre équipe régionale")}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-iris text-white">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
