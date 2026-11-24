import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { href as localeHref, type Locale } from "@/lib/i18n";

export function Logo({
  locale,
  variant = "white",
  width = 128,
  className,
  priority,
}: {
  locale: Locale;
  variant?: "white" | "dark";
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href={localeHref(locale, "/")} aria-label="Lithe SD — home" className="inline-flex">
      <Image
        src={variant === "white" ? "/lithe-logo-white.png" : "/lithe-logo.png"}
        alt="Lithe SD — A more flexible approach"
        width={width}
        height={Math.round((width * 82) / 156)}
        priority={priority}
        className={cn("h-auto w-auto", className)}
      />
    </Link>
  );
}
