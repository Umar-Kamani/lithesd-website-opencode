import Link from "next/link";
import { cn } from "@/lib/utils";
import { href as localeHref, type Locale } from "@/lib/i18n";

type Variant = "primary" | "ghost" | "light" | "outline" | "link";

const variants: Record<Variant, string> = {
  primary:
    "bg-iris text-white hover:bg-iris-bright focus-visible:outline-white",
  ghost:
    "border border-white/20 text-white hover:border-white hover:bg-white hover:text-void",
  light:
    "bg-white text-void hover:bg-frost",
  outline:
    "border border-void/15 text-void hover:border-void/40 hover:bg-void/[0.03]",
  link:
    "text-white/80 hover:text-white px-0",
};

export function Button({
  locale,
  to,
  href: rawHref,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  onClick,
  ariaLabel,
}: {
  locale: Locale;
  to?: string;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium tracking-[-0.01em] transition-colors duration-200",
    size === "sm" && "h-9 px-4 text-[13px]",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-[15px]",
    variants[variant],
    className,
  );

  if (to) {
    return (
      <Link href={localeHref(locale, to)} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (rawHref) {
    const isExternal = external ?? /^https?:\/\//.test(rawHref);
    if (isExternal) {
      return (
        <a
          href={rawHref}
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
      <Link href={rawHref} className={classes} aria-label={ariaLabel}>
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
