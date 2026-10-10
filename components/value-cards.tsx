import { Icon } from "@/lib/icons";
import { values } from "@/lib/content";

export function ValueCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value) => (
        <article
          key={value.title}
          className="flex flex-col rounded-card border border-white/12 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-arc-cyan/40 hover:bg-white/[0.05]"
        >
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-card border border-white/15 text-arc-cyan">
            <Icon name={value.icon} className="h-5 w-5" />
          </span>
          <h3 className="font-mono text-micro uppercase tracking-[0.12em] text-white">
            {value.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-halo-violet/80">
            {value.description}
          </p>
        </article>
      ))}
    </div>
  );
}
