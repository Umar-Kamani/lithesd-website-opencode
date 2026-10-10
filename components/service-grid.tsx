import { Icon } from "@/lib/icons";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServiceGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {services.map((service) => (
        <article
          key={service.title}
          className="group flex flex-col rounded-card border border-silver-border bg-white p-6 transition-colors duration-300 hover:border-signal-blue/40"
        >
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-card bg-paper-muted text-signal-blue transition-colors duration-300 group-hover:bg-signal-blue group-hover:text-white">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <h3 className="text-[17px] font-normal text-midnight-ink">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-body">
            {service.description}
          </p>
        </article>
      ))}
    </div>
  );
}
