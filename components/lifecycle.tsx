import { Icon } from "@/lib/icons";
import { lifecycle } from "@/lib/content";

export function Lifecycle() {
  return (
    <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
      {lifecycle.map((stage, index) => (
        <div key={stage.stage} className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-mono text-micro text-fog">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-silver-border" />
          </div>
          <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-card border border-silver-border text-signal-blue">
            <Icon name={stage.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-subheading font-light text-midnight-ink">
            {stage.stage}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {stage.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-snug text-slate-body">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-signal-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
