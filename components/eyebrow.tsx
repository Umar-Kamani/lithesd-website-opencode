import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-micro font-normal uppercase",
        tone === "dark" ? "text-halo-violet" : "text-signal-blue",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-7",
          tone === "dark" ? "bg-arc-cyan/70" : "bg-signal-blue/50",
        )}
      />
      {children}
    </span>
  );
}
