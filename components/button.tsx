import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-signal-blue text-white hover:bg-signal-blue-600 focus-visible:outline-arc-cyan",
  outline:
    "border border-silver-border text-midnight-ink hover:border-signal-blue hover:text-signal-blue",
  ghost:
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  light:
    "bg-white text-midnight-ink hover:bg-halo-violet/40 border border-transparent",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[13px]",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  type,
  onClick,
  ariaLabel,
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-button font-display font-normal tracking-[0.01em] transition-colors duration-200 ease-out",
    SIZES[size],
    VARIANTS[variant],
    className,
  );

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
