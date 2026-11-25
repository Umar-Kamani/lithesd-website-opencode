import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Button } from "./button";
import { ThreadCanvas } from "./thread-canvas";
import { BrandLogo } from "./brand-logo";
import { brands as staticBrands, type Brand } from "@/lib/brands";
import { l, type Locale } from "@/lib/i18n";

export function HomeHero({
  locale,
  panelBrands: supplied,
}: {
  locale: Locale;
  panelBrands?: Brand[];
}) {
  const source = supplied && supplied.length > 0 ? supplied : staticBrands;
  const panelBrands = ["sangfor", "fujitsu", "accops"]
    .map((slug) => source.find((brand) => brand.slug === slug))
    .filter((brand): brand is Brand => Boolean(brand));

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
              <Button locale={locale} to="/contact" variant="ghost" size="lg">
                {l(locale, "Talk to us", "Parlons-en")}
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { value: "24", en: "brands", fr: "marques" },
                { value: "100+", en: "channel partners", fr: "partenaires" },
                { value: "20+", en: "countries", fr: "pays" },
              ].map((stat) => (
                <div key={stat.value} className="flex items-baseline gap-2">
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

          {/* Catalogue panel */}
          <div className="relative hidden lg:block">
            <div className="animate-float rounded-panel border border-white/12 bg-charcoal/80 p-1.5 shadow-card backdrop-blur-xl">
              <div className="rounded-[26px] border border-white/8 bg-obsidian/90 p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-smoke">
                    <span className="h-1.5 w-1.5 rounded-full bg-iris-bright" />
                    {l(locale, "Live catalogue", "Catalogue en ligne")}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-iron">
                    Lithe SD
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { value: "24", en: "Brands", fr: "Marques" },
                    { value: "72", en: "Products", fr: "Produits" },
                    { value: "6", en: "Pillars", fr: "Piliers" },
                  ].map((m) => (
                    <div key={m.en} className="rounded-card border border-white/8 bg-white/[0.03] p-3">
                      <p className="font-display text-2xl font-medium text-white">{m.value}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-iron">
                        {l(locale, m.en, m.fr)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col divide-y divide-white/8">
                  {panelBrands.map((brand) =>
                    brand ? (
                      <div key={brand.slug} className="flex items-center gap-3 py-3">
                        <span className="flex h-10 w-20 items-center justify-center rounded-card bg-white px-2">
                          <BrandLogo
                            name={brand.name}
                            logo={brand.logo}
                            imageClassName="max-h-5 max-w-full"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-white">
                            {brand.name}
                          </p>
                          <p className="truncate text-[11px] text-iron">
                            {l(locale, brand.tagline.en, brand.tagline.fr)}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-iron" />
                      </div>
                    ) : null,
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-card border border-white/8 bg-white/[0.02] px-4 py-3">
                  <span className="text-[11px] text-ash">
                    {l(locale, "72 products, one partner", "72 produits, un partenaire")}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-iris text-white">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
