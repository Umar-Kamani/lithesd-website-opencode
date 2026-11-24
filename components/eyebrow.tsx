import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em]",
        dark ? "text-smoke" : "text-iron",
        className,
      )}
    >
      <span className="h-px w-7 bg-gradient-to-r from-iris to-ember" />
      {children}
    </span>
  );
}
