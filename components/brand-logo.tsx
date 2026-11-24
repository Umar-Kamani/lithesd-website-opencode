import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  name,
  logo,
  className,
  imageClassName,
  mono = false,
}: {
  name: string;
  logo: string | null;
  className?: string;
  imageClassName?: string;
  mono?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={160}
          height={64}
          unoptimized
          loading="eager"
          className={cn("max-h-8 w-auto max-w-full object-contain", imageClassName)}
        />
      ) : (
        <span
          className={cn(
            "font-display text-base font-medium tracking-[-0.02em]",
            mono ? "text-white" : "text-void",
          )}
        >
          {name}
        </span>
      )}
    </span>
  );
}
