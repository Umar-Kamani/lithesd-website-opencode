"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * "The Thread" — a single luminous thread draws the Lithe cloud silhouette
 * and dissolves into flowing data. Unique to Lithe SD.
 */
export function ThreadCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Two soft humps echo the Lithe cloud mark.
    const hump = (x: number) => {
      const b1 = 0.3 * Math.exp(-Math.pow((x - 0.34) / 0.17, 2));
      const b2 = 0.21 * Math.exp(-Math.pow((x - 0.66) / 0.14, 2));
      return 0.62 - b1 - b2;
    };

    const draw = (time: number) => {
      const t = reduce ? 0 : time;
      ctx.clearRect(0, 0, w, h);

      const sample = 220;
      const pts: { x: number; y: number; xn: number }[] = [];
      for (let i = 0; i <= sample; i++) {
        const xn = i / sample;
        const wobble =
          Math.sin(xn * 7 + t * 0.0006) * 0.008 +
          Math.sin(xn * 13 - t * 0.0004) * 0.004;
        pts.push({ x: xn * w, y: (hump(xn) + wobble) * h, xn });
      }

      // Secondary strands
      for (let b = 0; b < 3; b++) {
        const offset = (b - 1) * 20;
        ctx.beginPath();
        pts.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.y + offset) : ctx.moveTo(p.x, p.y + offset),
        );
        const g = ctx.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, "rgba(30,109,255,0)");
        g.addColorStop(0.22, "rgba(30,109,255,0.16)");
        g.addColorStop(0.72, "rgba(74,139,255,0.16)");
        g.addColorStop(1, "rgba(246,119,47,0.12)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Main thread
      const main = ctx.createLinearGradient(0, 0, w, 0);
      main.addColorStop(0, "rgba(30,109,255,0.15)");
      main.addColorStop(0.32, "rgba(74,139,255,0.95)");
      main.addColorStop(0.7, "rgba(190,214,255,1)");
      main.addColorStop(1, "rgba(246,119,47,0.85)");
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = main;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Travelling pulse
      if (!reduce) {
        const prog = (t * 0.00006) % 1;
        const seg = pts.filter((p) => Math.abs(p.xn - prog) < 0.1);
        if (seg.length > 1) {
          ctx.save();
          ctx.beginPath();
          seg.forEach((p, i) =>
            i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
          );
          const pg = ctx.createLinearGradient(
            seg[0].x,
            0,
            seg[seg.length - 1].x,
            0,
          );
          pg.addColorStop(0, "rgba(170,210,255,0)");
          pg.addColorStop(0.5, "rgba(200,225,255,0.95)");
          pg.addColorStop(1, "rgba(246,119,47,0)");
          ctx.strokeStyle = pg;
          ctx.lineWidth = 3;
          ctx.shadowColor = "rgba(30,109,255,0.9)";
          ctx.shadowBlur = 24;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Data motes
      for (let i = 0; i < 28; i++) {
        const speed = 0.000008 + (i % 5) * 0.000004;
        const xn = (i / 28 + t * speed) % 1;
        const p = pts[Math.min(sample, Math.floor(xn * sample))];
        if (!p) continue;
        const drift = Math.sin(t * 0.001 + i) * 6;
        const y = p.y + drift + (i % 2 ? -1 : 1) * (6 + (i % 4) * 4);
        const base =
          xn < 0.55 ? "rgba(130,175,255," : "rgba(255,170,129,";
        const alpha = Math.max(0.15, 0.35 + 0.5 * Math.sin(t * 0.002 + i));
        ctx.beginPath();
        ctx.arc(p.x, y, i % 7 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = base + alpha + ")";
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
