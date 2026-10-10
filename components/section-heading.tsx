import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-3xl text-heading font-light",
          tone === "dark" ? "text-white" : "text-midnight-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-lead",
            tone === "dark" ? "text-halo-violet" : "text-slate-body",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
