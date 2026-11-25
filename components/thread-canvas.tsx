"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * "The Thread" — a single luminous thread draws the Lithe cloud silhouette
 * and dissolves into flowing data. Unique to Lithe SD.
 *
 * Performance notes: geometry and gradients are built once per resize, the
 * loop is capped at 30 fps, the canvas pauses when off-screen or hidden, and
 * the travelling pulse uses a two-stroke glow instead of `shadowBlur`.
 */
export function ThreadCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SAMPLE = 180;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let baseY: number[] = [];
    let mainGrad: CanvasGradient | null = null;
    let strandGrad: CanvasGradient | null = null;

    const hump = (x: number) => {
      const b1 = 0.3 * Math.exp(-Math.pow((x - 0.34) / 0.17, 2));
      const b2 = 0.21 * Math.exp(-Math.pow((x - 0.66) / 0.14, 2));
      return 0.62 - b1 - b2;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;

      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const maxPixels = 2_200_000;
      if (w * h * dpr * dpr > maxPixels) {
        dpr = Math.sqrt(maxPixels / (w * h));
      }
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseY = [];
      for (let i = 0; i <= SAMPLE; i++) {
        baseY.push(hump(i / SAMPLE) * h);
      }

      strandGrad = ctx.createLinearGradient(0, 0, w, 0);
      strandGrad.addColorStop(0, "rgba(30,109,255,0)");
      strandGrad.addColorStop(0.22, "rgba(30,109,255,0.16)");
      strandGrad.addColorStop(0.72, "rgba(74,139,255,0.18)");
      strandGrad.addColorStop(1, "rgba(169,199,255,0.12)");

      mainGrad = ctx.createLinearGradient(0, 0, w, 0);
      mainGrad.addColorStop(0, "rgba(30,109,255,0.12)");
      mainGrad.addColorStop(0.34, "rgba(74,139,255,0.95)");
      mainGrad.addColorStop(0.72, "rgba(190,214,255,1)");
      mainGrad.addColorStop(1, "rgba(169,199,255,0.85)");
    };

    const draw = (time: number) => {
      if (!w || !h || !mainGrad || !strandGrad) return;
      const t = reduce ? 0 : time;
      ctx.clearRect(0, 0, w, h);

      const wobbleAt = (xn: number) =>
        Math.sin(xn * 7 + t * 0.0006) * 0.008 +
        Math.sin(xn * 13 - t * 0.0004) * 0.004;

      // Secondary strands
      for (let b = 0; b < 3; b++) {
        const offset = (b - 1) * 20;
        ctx.beginPath();
        for (let i = 0; i <= SAMPLE; i++) {
          const xn = i / SAMPLE;
          const x = xn * w;
          const y = baseY[i] + wobbleAt(xn) * h + offset;
          if (i) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.strokeStyle = strandGrad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Main thread
      ctx.beginPath();
      for (let i = 0; i <= SAMPLE; i++) {
        const xn = i / SAMPLE;
        const x = xn * w;
        const y = baseY[i] + wobbleAt(xn) * h;
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.strokeStyle = mainGrad;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Travelling pulse — wide translucent pass plus a narrow bright pass.
      if (!reduce) {
        const prog = (t * 0.00006) % 1;
        const half = 0.09;
        const from = Math.max(1, Math.floor((prog - half) * SAMPLE));
        const to = Math.min(SAMPLE, Math.ceil((prog + half) * SAMPLE));
        if (to > from + 1) {
          const x0 = (from / SAMPLE) * w;
          const x1 = (to / SAMPLE) * w;
          const pg = ctx.createLinearGradient(x0, 0, x1, 0);
          pg.addColorStop(0, "rgba(140,184,255,0)");
          pg.addColorStop(0.5, "rgba(190,220,255,0.55)");
          pg.addColorStop(1, "rgba(169,199,255,0)");

          ctx.beginPath();
          for (let i = from; i <= to; i++) {
            const xn = i / SAMPLE;
            const x = xn * w;
            const y = baseY[i] + wobbleAt(xn) * h;
            if (i > from) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
          }
          ctx.strokeStyle = pg;
          ctx.lineWidth = 9;
          ctx.stroke();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "rgba(210,230,255,0.9)";
          ctx.stroke();
        }
      }

      // Data motes
      ctx.fillStyle = "rgba(150,190,255,0.6)";
      for (let i = 0; i < 20; i++) {
        const speed = 0.00001 + (i % 5) * 0.000004;
        const xn = (i / 20 + t * speed) % 1;
        const idx = Math.min(SAMPLE, Math.floor(xn * SAMPLE));
        const x = xn * w;
        const y =
          baseY[idx] +
          wobbleAt(xn) * h +
          Math.sin(t * 0.001 + i) * 6 +
          (i % 2 ? -1 : 1) * (6 + (i % 4) * 4);
        const alpha = Math.max(0.15, 0.32 + 0.45 * Math.sin(t * 0.002 + i));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, i % 7 === 0 ? 1.7 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (time - last < 33) return; // ~30 fps
      last = time;
      draw(time);
    };

    build();
    draw(0);

    if (!reduce) raf = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduce) draw(0);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
            },
            { rootMargin: "120px" },
          )
        : null;
    observer?.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
