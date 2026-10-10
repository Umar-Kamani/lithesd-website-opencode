import { Icon } from "@/lib/icons";
import { whyChoose } from "@/lib/content";

export function WhyChoose() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {whyChoose.map((item, index) => (
        <article
          key={item.title}
          className="flex flex-col rounded-card border border-silver-border bg-white p-7"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-micro text-mist">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-signal-blue text-white">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
          </div>
          <h3 className="mt-6 text-subheading font-light text-midnight-ink">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-body">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
