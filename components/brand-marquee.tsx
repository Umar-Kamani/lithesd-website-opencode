import { BrandLogo } from "./brand-logo";
import { brands as staticBrands, type Brand } from "@/lib/brands";
import { cn } from "@/lib/utils";

function Row({
  items,
  hidden,
  tone,
}: {
  items: Brand[];
  hidden?: boolean;
  tone: "dark" | "light";
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((brand) => (
        <div
          key={`${brand.slug}-${hidden ? "b" : "a"}`}
          className={cn(
            "flex h-16 w-36 shrink-0 items-center justify-center rounded-card border px-5",
            tone === "dark" ? "border-white/10 bg-white" : "border-void/10 bg-white",
          )}
        >
          <BrandLogo name={brand.name} logo={brand.logo} imageClassName="max-h-7" />
        </div>
      ))}
    </div>
  );
}

export function BrandMarquee({
  items,
  tone = "dark",
  reverse = false,
  className,
}: {
  items?: Brand[];
  tone?: "dark" | "light";
  reverse?: boolean;
  className?: string;
}) {
  const list = items && items.length > 0 ? items : staticBrands;

  return (
    <div
      className={cn(
        "marquee-group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]",
        className,
      )}
    >
      <div className={cn("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        <Row items={list} tone={tone} />
        <Row items={list} tone={tone} hidden />
      </div>
    </div>
  );
}
