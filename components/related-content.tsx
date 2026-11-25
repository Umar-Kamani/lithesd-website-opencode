import { ContentCard, type ContentCardData } from "./content-card";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import type { Locale } from "@/lib/i18n";

export function RelatedContent({
  locale,
  eyebrow,
  title,
  intro,
  items,
  tone = "void",
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ContentCardData[];
  tone?: "void" | "obsidian" | "charcoal" | "white" | "linen";
}) {
  if (items.length === 0) return null;
  const dark = tone !== "white" && tone !== "linen";

  return (
    <Section tone={tone}>
      {dark ? <div className="pointer-events-none absolute inset-0 grid-dark opacity-30" /> : null}
      <div className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            dark={dark}
            size="sm"
          />
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ContentCard
              key={item.path}
              item={item}
              locale={locale}
              tone={dark ? "dark" : "light"}
            />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
