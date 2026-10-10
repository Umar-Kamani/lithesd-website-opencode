import { Icon } from "@/lib/icons";
import { valueAdd } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ValueAddGrid() {
  const [featured, ...rest] = valueAdd;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <article className="relative flex flex-col justify-between overflow-hidden rounded-card border border-white/12 bg-signal-blue p-7 lg:row-span-2">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-arc-cyan/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-card border border-white/25 text-white">
            <Icon name={featured.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-subheading font-light text-white">
            {featured.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">
            {featured.description}
          </p>
        </div>
        <span className="relative mt-10 font-mono text-micro uppercase tracking-[0.14em] text-white/70">
          Partner program
        </span>
      </article>

      {rest.map((item) => (
        <article
          key={item.title}
          className="flex flex-col rounded-card border border-silver-border bg-white p-6 transition-colors duration-300 hover:border-signal-blue/40"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-card border border-silver-border text-signal-blue">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-[17px] font-normal text-midnight-ink">
            {item.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-body">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ValueAddList({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", className)}>
      {valueAdd.map((item) => (
        <div
          key={item.title}
          className="flex gap-4 rounded-card border border-silver-border bg-white p-5"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-paper-muted text-signal-blue">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[16px] font-normal text-midnight-ink">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
