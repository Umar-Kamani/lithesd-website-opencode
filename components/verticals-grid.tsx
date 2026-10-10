import { Icon } from "@/lib/icons";
import { verticals } from "@/lib/content";
import { cn } from "@/lib/utils";

export function VerticalsGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-card border border-silver-border bg-silver-border sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {verticals.map((vertical) => (
        <div
          key={vertical.title}
          className="group flex flex-col items-center gap-4 bg-white px-4 py-8 text-center transition-colors duration-300 hover:bg-paper-muted"
        >
          <span className="text-signal-blue transition-transform duration-300 group-hover:-translate-y-0.5">
            <Icon name={vertical.icon} className="h-7 w-7" />
          </span>
          <span className="font-display text-sm font-normal tracking-wide text-midnight-ink">
            {vertical.title}
          </span>
        </div>
      ))}
    </div>
  );
}
