"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * "The Thread" — a single luminous thread draws the Lithe cloud silhouette
 * and dissolves into flowing data.
 *
 * Performance model: the strands, main gradient thread and pulse sprite are
 * rendered once per resize into offscreen canvases. Each frame only blits the
 * cached layer, moves the pulse sprite and draws a handful of motes — no path
 * rebuilding, no per-frame gradients, no shadow blur.
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
    const MOTES = 10;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let baseY: number[] = [];
    let layer: HTMLCanvasElement | null = null;
    let pulse: HTMLCanvasElement | null = null;

    const hump = (x: number) => {
      const b1 = 0.3 * Math.exp(-Math.pow((x - 0.34) / 0.17, 2));
      const b2 = 0.21 * Math.exp(-Math.pow((x - 0.66) / 0.14, 2));
      return 0.62 - b1 - b2;
    };

    const buildPulse = () => {
      const sprite = document.createElement("canvas");
      sprite.width = 240;
      sprite.height = 32;
      const sctx = sprite.getContext("2d");
      if (!sctx) return null;
      const g = sctx.createLinearGradient(0, 0, 240, 0);
      g.addColorStop(0, "rgba(120,170,255,0)");
      g.addColorStop(0.34, "rgba(150,195,255,0.22)");
      g.addColorStop(0.5, "rgba(220,238,255,0.95)");
      g.addColorStop(0.66, "rgba(150,195,255,0.22)");
      g.addColorStop(1, "rgba(120,170,255,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 240, 32);
      return sprite;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;

      let dpr = Math.min(window.devicePixelRatio || 1, w > 1000 ? 1.25 : 1.5);
      const maxPixels = 1_600_000;
      if (w * h * dpr * dpr > maxPixels) {
        dpr = Math.sqrt(maxPixels / (w * h));
      }

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      baseY = [];
      for (let i = 0; i <= SAMPLE; i++) {
        baseY.push(hump(i / SAMPLE) * h);
      }

      // Cache the static thread once.
      const cached = document.createElement("canvas");
      cached.width = canvas.width;
      cached.height = canvas.height;
      const cctx = cached.getContext("2d");
      if (!cctx) return;
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const strandGrad = cctx.createLinearGradient(0, 0, w, 0);
      strandGrad.addColorStop(0, "rgba(30,109,255,0)");
      strandGrad.addColorStop(0.22, "rgba(30,109,255,0.16)");
      strandGrad.addColorStop(0.72, "rgba(74,139,255,0.18)");
      strandGrad.addColorStop(1, "rgba(169,199,255,0.12)");

      for (let b = 0; b < 3; b++) {
        const offset = (b - 1) * 20;
        cctx.beginPath();
        for (let i = 0; i <= SAMPLE; i++) {
          const x = (i / SAMPLE) * w;
          const y = baseY[i] + offset;
          if (i) cctx.lineTo(x, y);
          else cctx.moveTo(x, y);
        }
        cctx.strokeStyle = strandGrad;
        cctx.lineWidth = 1;
        cctx.stroke();
      }

      const mainGrad = cctx.createLinearGradient(0, 0, w, 0);
      mainGrad.addColorStop(0, "rgba(30,109,255,0.12)");
      mainGrad.addColorStop(0.34, "rgba(74,139,255,0.95)");
      mainGrad.addColorStop(0.72, "rgba(190,214,255,1)");
      mainGrad.addColorStop(1, "rgba(169,199,255,0.85)");

      cctx.beginPath();
      for (let i = 0; i <= SAMPLE; i++) {
        const x = (i / SAMPLE) * w;
        if (i) cctx.lineTo(x, baseY[i]);
        else cctx.moveTo(x, baseY[i]);
      }
      cctx.strokeStyle = mainGrad;
      cctx.lineWidth = 2;
      cctx.lineCap = "round";
      cctx.stroke();

      layer = cached;
      pulse = pulse ?? buildPulse();
    };

    const drawMotes = (t: number, offsetY: number) => {
      ctx.fillStyle = "rgba(150,190,255,0.6)";
      for (let i = 0; i < MOTES; i++) {
        const speed = 0.00001 + (i % 5) * 0.000004;
        const xn = (i / MOTES + t * speed) % 1;
        const idx = Math.min(SAMPLE, Math.floor(xn * SAMPLE));
        const x = xn * w;
        const y =
          baseY[idx] +
          Math.sin(t * 0.001 + i) * 6 +
          (i % 2 ? -1 : 1) * (6 + (i % 4) * 4) +
          offsetY;
        const alpha = Math.max(0.15, 0.32 + 0.45 * Math.sin(t * 0.002 + i));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, i % 5 === 0 ? 1.7 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawFrame = (time: number) => {
      if (!w || !h || !layer) return;
      const t = reduce ? 0 : time;
      const offsetY = reduce ? 0 : Math.sin(t * 0.0004) * 3;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(layer, 0, offsetY, w, h);

      if (!reduce && pulse) {
        const prog = (t * 0.00006) % 1;
        const idx = Math.min(SAMPLE, Math.floor(prog * SAMPLE));
        const x = prog * w;
        const y = baseY[idx] + offsetY;
        ctx.drawImage(pulse, x - 70, y - 7, 140, 14);
      }

      drawMotes(t, offsetY);
    };

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (time - last < 33) return; // ~30 fps
      last = time;
      drawFrame(time);
    };

    build();
    drawFrame(0);

    if (!reduce) raf = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        drawFrame(0);
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
