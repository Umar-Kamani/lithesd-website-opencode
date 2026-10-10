import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "white",
  className,
  priority,
  width = 132,
}: {
  variant?: "white" | "dark";
  className?: string;
  priority?: boolean;
  width?: number;
}) {
  const src =
    variant === "white"
      ? "/lithe-logo-white.png"
      : "/lithe-logo.png";
  const height = Math.round((width * 82) / 156);

  return (
    <Image
      src={src}
      alt="Lithe SD — A more flexible approach"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ width, height }}
    />
  );
}
