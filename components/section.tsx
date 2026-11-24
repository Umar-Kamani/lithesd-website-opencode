import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "void" | "obsidian" | "charcoal" | "white" | "linen";

const tones: Record<Tone, string> = {
  void: "bg-void text-white",
  obsidian: "bg-obsidian text-white",
  charcoal: "bg-charcoal text-white",
  white: "bg-white text-void",
  linen: "bg-linen text-void",
};

export function Section({
  tone = "white",
  className,
  innerClassName,
  container = true,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  container?: boolean;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      {container ? (
        <div className={cn("mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10", innerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
