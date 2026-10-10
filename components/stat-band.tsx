"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/lib/content";
import { cn } from "@/lib/utils";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(stat.isYear ? stat.value : 0);

  useEffect(() => {
    if (stat.isYear) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        if (reduce) {
          setDisplay(stat.value);
          observer.disconnect();
          return;
        }
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(stat.value * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat.value, stat.isYear]);

  return (
    <span ref={ref}>
      {stat.prefix}
      {stat.isYear ? display : display.toLocaleString("en-US")}
      {stat.suffix}
    </span>
  );
}

export function StatBand({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-card sm:grid-cols-3 lg:grid-cols-6",
        tone === "light"
          ? "border border-silver-border bg-silver-border"
          : "border border-white/10 bg-white/10",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col items-start gap-2 px-5 py-6",
            tone === "light" ? "bg-white" : "bg-midnight-ink",
          )}
        >
          <span
            className={cn(
              "font-display text-[clamp(1.9rem,3vw,2.6rem)] font-light leading-none",
              tone === "light" ? "text-midnight-ink" : "text-white",
            )}
          >
            <Counter stat={stat} />
          </span>
          <span
            className={cn(
              "font-mono text-micro uppercase",
              tone === "light" ? "text-fog" : "text-halo-violet/70",
            )}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
