import { VendorLogoCard } from "./logo-wall";
import { pillars, vendors } from "@/lib/content";

export function VendorCatalog() {
  return (
    <div className="flex flex-col gap-12">
      {pillars.map((pillar) => {
        const group = vendors.filter((vendor) => vendor.pillar === pillar.id);
        if (group.length === 0) return null;
        return (
          <div key={pillar.id} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-micro uppercase tracking-[0.14em] text-signal-blue">
                {pillar.title}
              </h3>
              <span className="h-px flex-1 bg-silver-border" />
              <span className="font-mono text-micro text-mist">
                {group.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {group.map((vendor) => (
                <VendorLogoCard key={vendor.name} vendor={vendor} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
