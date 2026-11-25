import Image from "next/image";
import { cn } from "@/lib/utils";

export function ContentCover({
  src,
  label,
  className,
  priority,
}: {
  src: string | null;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-card bg-void",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={1200}
          height={750}
          priority={priority}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_20%_0%,rgba(30,109,255,0.45),transparent_55%),radial-gradient(100%_100%_at_100%_100%,rgba(74,139,255,0.38),transparent_55%)]">
          <div className="pointer-events-none absolute inset-0 grid-dark opacity-40" />
          <span className="relative max-w-[80%] text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
