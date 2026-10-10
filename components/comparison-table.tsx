import { comparison } from "@/lib/content";
import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-card border border-silver-border">
      {/* Header */}
      <div className="grid grid-cols-2">
        <div className="border-r border-silver-border bg-paper-muted px-4 py-5 sm:px-6">
          <h3 className="font-display text-base font-normal text-slate-body sm:text-lg">
            Traditional Distributor
          </h3>
        </div>
        <div className="bg-signal-blue px-4 py-5 sm:px-6">
          <h3 className="font-display text-base font-normal text-white sm:text-lg">
            Lithe SD
          </h3>
        </div>
      </div>

      {/* Rows */}
      {comparison.map((row) => (
        <div
          key={row.traditional}
          className="grid grid-cols-2 border-t border-silver-border"
        >
          <div className="flex items-start gap-2.5 border-r border-silver-border bg-paper-muted/50 px-4 py-5 sm:px-6">
            <Minus className="mt-0.5 h-4 w-4 shrink-0 text-mist" aria-hidden="true" />
            <span className="text-sm leading-snug text-fog">{row.traditional}</span>
          </div>
          <div className="flex items-start gap-2.5 px-4 py-5 sm:px-6">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-blue" aria-hidden="true" />
            <span className="text-sm font-medium leading-snug text-midnight-ink">
              {row.lithe}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
