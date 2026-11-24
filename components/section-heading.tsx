import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  className,
  titleClassName,
  size = "md",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-3xl font-display font-medium",
          size === "sm" && "text-heading-sm",
          size === "md" && "text-heading",
          size === "lg" && "text-display-sm",
          dark ? "text-white" : "text-void",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-lead",
            dark ? "text-ash" : "text-body-light",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
