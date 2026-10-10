import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "dark" | "deep" | "light" | "muted";

const TONES: Record<SectionTone, string> = {
  dark: "bg-midnight-ink text-white",
  deep: "bg-midnight-deep text-white",
  light: "bg-paper text-midnight-ink",
  muted: "bg-paper-muted text-midnight-ink",
};

export function Section({
  as: Tag = "section",
  tone = "light",
  className,
  innerClassName,
  container = true,
  children,
  id,
}: {
  as?: ElementType;
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  container?: boolean;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        TONES[tone],
        className,
      )}
    >
      {container ? (
        <div
          className={cn(
            "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10",
            innerClassName,
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
