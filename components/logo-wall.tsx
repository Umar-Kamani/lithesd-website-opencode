import Image from "next/image";
import type { Vendor } from "@/lib/content";
import { cn } from "@/lib/utils";

export function VendorLogoCard({
  vendor,
  eager,
}: {
  vendor: Vendor;
  eager?: boolean;
}) {
  return (
    <div className="group flex h-[76px] w-[168px] shrink-0 items-center justify-center rounded-card border border-silver-border bg-white px-6 transition-colors duration-300 hover:border-signal-blue/40">
      {vendor.logo ? (
        <Image
          src={vendor.logo}
          alt={vendor.name}
          width={140}
          height={56}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          unoptimized
        />
      ) : (
        <span className="font-display text-lg text-slate-body transition-colors group-hover:text-midnight-ink">
          {vendor.name}
        </span>
      )}
    </div>
  );
}

function Row({
  items,
  hidden,
}: {
  items: Vendor[];
  hidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 pr-4"
      aria-hidden={hidden || undefined}
    >
      {items.map((vendor) => (
        <VendorLogoCard key={vendor.name} vendor={vendor} eager />
      ))}
    </div>
  );
}

export function LogoWall({
  items,
  reverse = false,
  slow = false,
  className,
}: {
  items: Vendor[];
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const animation = reverse
    ? slow
      ? "animate-marquee-reverse-slow"
      : "animate-marquee-reverse"
    : slow
      ? "animate-marquee-slow"
      : "animate-marquee";

  return (
    <div
      className={cn(
        "marquee-group relative overflow-hidden",
        // Fade the edges into the background
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className={cn("flex w-max", animation)}>
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
