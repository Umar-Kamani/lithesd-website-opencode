import { Icon } from "@/lib/icons";
import { onboarding } from "@/lib/content";

export function OnboardingFlow() {
  return (
    <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
      <div
        className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-silver-border lg:block"
        aria-hidden="true"
      />
      {onboarding.map((step, index) => (
        <li key={step.title} className="relative flex flex-col">
          <span className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver-border bg-white text-signal-blue">
            <Icon name={step.icon} className="h-5 w-5" />
          </span>
          <span className="font-mono text-micro uppercase text-fog">
            Step {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-[17px] font-normal leading-snug text-midnight-ink">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-body">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
