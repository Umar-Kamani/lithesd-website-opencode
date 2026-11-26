"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "single" | "converge";

type Point = { x: number; y: number };

/**
 * "The Thread" — a luminous thread draws the Lithe cloud silhouette and
 * dissolves into flowing data. The `converge` variant fans many fibre-optic
 * strands in from the edges toward a single centre point.
 *
 * Performance: all strands, gradients and the centre bloom are rendered once
 * per resize into an offscreen canvas. Each frame only blits that layer, draws
 * a handful of cached comet sprites and a few soft motes. Quality degrades
 * automatically on slow devices.
 */
export function ThreadCanvas({
  className,
  variant = "single",
}: {
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SINGLE_SAMPLES = 180;
    const CONVERGE_SAMPLES = 110;
    const MOTES = 8;
    const COMET_LENGTH = 140;
    const COMET_HEIGHT = 18;
    const CONVERGE_TRAIL = [0, 3, 6];
    const SINGLE_TRAIL = [0, 4, 8];

    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let flash = 0;
    let staticMode = false;
    let quality = lowPower ? 1 : 0;
    let dprCap = lowPower ? 1.1 : 1.5;
    let pulseCount = lowPower ? 3 : 6;
    let ema = 0;
    let over = 0;
    let baseY: number[] = [];
    let threads: Point[][] = [];
    let activePulseIndexes: number[] = [];
    let layer: HTMLCanvasElement | null = null;
    let comet: HTMLCanvasElement | null = null;
    let dot: HTMLCanvasElement | null = null;

    const hump = (x: number) => {
      const b1 = 0.3 * Math.exp(-Math.pow((x - 0.34) / 0.17, 2));
      const b2 = 0.21 * Math.exp(-Math.pow((x - 0.66) / 0.14, 2));
      return 0.62 - b1 - b2;
    };

    const buildComet = () => {
      const sprite = document.createElement("canvas");
      sprite.width = 160;
      sprite.height = 40;
      const sctx = sprite.getContext("2d");
      if (!sctx) return null;
      const g = sctx.createRadialGradient(80, 20, 0, 80, 20, 80);
      g.addColorStop(0, "rgba(235,245,255,1)");
      g.addColorStop(0.18, "rgba(200,225,255,0.85)");
      g.addColorStop(0.45, "rgba(120,175,255,0.30)");
      g.addColorStop(1, "rgba(80,140,255,0)");
      sctx.save();
      sctx.translate(80, 20);
      sctx.scale(1, 0.28);
      sctx.translate(-80, -20);
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 160, 40);
      sctx.restore();
      return sprite;
    };

    const buildDot = () => {
      const sprite = document.createElement("canvas");
      sprite.width = 24;
      sprite.height = 24;
      const sctx = sprite.getContext("2d");
      if (!sctx) return null;
      const g = sctx.createRadialGradient(12, 12, 0, 12, 12, 12);
      g.addColorStop(0, "rgba(220,236,255,0.95)");
      g.addColorStop(0.4, "rgba(140,185,255,0.55)");
      g.addColorStop(1, "rgba(100,150,255,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 24, 24);
      return sprite;
    };

    const bezier = (p0: Point, p1: Point, p2: Point, p3: Point, samples: number) => {
      const pts: Point[] = [];
      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const inv = 1 - t;
        pts.push({
          x:
            inv * inv * inv * p0.x +
            3 * inv * inv * t * p1.x +
            3 * inv * t * t * p2.x +
            t * t * t * p3.x,
          y:
            inv * inv * inv * p0.y +
            3 * inv * inv * t * p1.y +
            3 * inv * t * t * p2.y +
            t * t * t * p3.y,
        });
      }
      return pts;
    };

    const computePulseIndexes = (n: number) => {
      if (!n) return [];
      const count = Math.min(pulseCount, n);
      if (count <= 1) return [0];
      return Array.from({ length: count }, (_, i) =>
        Math.min(n - 1, Math.round((i * (n - 1)) / (count - 1))),
      );
    };

    const buildConvergeThreads = () => {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const bundles = [
        { p0: { x: -0.08, y: 0.26 }, p1: { x: 0.16, y: 0.18 }, p2: { x: 0.34, y: 0.42 }, count: 4, spread: 0.055 },
        { p0: { x: -0.08, y: 0.44 }, p1: { x: 0.18, y: 0.54 }, p2: { x: 0.35, y: 0.5 }, count: 4, spread: 0.045 },
        { p0: { x: 1.08, y: 0.28 }, p1: { x: 0.84, y: 0.18 }, p2: { x: 0.66, y: 0.42 }, count: 4, spread: 0.055 },
        { p0: { x: 1.08, y: 0.46 }, p1: { x: 0.82, y: 0.56 }, p2: { x: 0.65, y: 0.5 }, count: 4, spread: 0.045 },
      ];

      const next: Point[][] = [];
      for (const bundle of bundles) {
        for (let j = 0; j < bundle.count; j++) {
          const off = (j - (bundle.count - 1) / 2) * bundle.spread * h;
          next.push(
            bezier(
              {
                x: bundle.p0.x * w,
                y: bundle.p0.y * h + off * 1.4,
              },
              {
                x: bundle.p1.x * w,
                y: bundle.p1.y * h + off,
              },
              {
                x: bundle.p2.x * w,
                y: bundle.p2.y * h + off * 0.35,
              },
              { x: cx, y: cy },
              CONVERGE_SAMPLES,
            ),
          );
        }
      }
      return next;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;

      let dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const maxPixels = quality > 0 ? 1_100_000 : 1_600_000;
      if (w * h * dpr * dpr > maxPixels) {
        dpr = Math.sqrt(maxPixels / (w * h));
      }

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cached = document.createElement("canvas");
      cached.width = canvas.width;
      cached.height = canvas.height;
      const cctx = cached.getContext("2d");
      if (!cctx) return;
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      threads = [];

      if (variant === "converge") {
        threads = buildConvergeThreads();
        activePulseIndexes = computePulseIndexes(threads.length);

        const grads = [
          cctx.createLinearGradient(0, 0, w, 0),
          cctx.createLinearGradient(0, 0, w, 0),
          cctx.createLinearGradient(0, 0, w, 0),
        ];
        grads[0].addColorStop(0, "rgba(74,139,255,0)");
        grads[0].addColorStop(0.25, "rgba(74,139,255,0.35)");
        grads[0].addColorStop(0.5, "rgba(190,214,255,0.9)");
        grads[0].addColorStop(0.75, "rgba(74,139,255,0.35)");
        grads[0].addColorStop(1, "rgba(74,139,255,0)");

        grads[1].addColorStop(0, "rgba(169,199,255,0)");
        grads[1].addColorStop(0.25, "rgba(169,199,255,0.3)");
        grads[1].addColorStop(0.5, "rgba(225,238,255,0.85)");
        grads[1].addColorStop(0.75, "rgba(169,199,255,0.3)");
        grads[1].addColorStop(1, "rgba(169,199,255,0)");

        grads[2].addColorStop(0, "rgba(30,109,255,0)");
        grads[2].addColorStop(0.25, "rgba(30,109,255,0.32)");
        grads[2].addColorStop(0.5, "rgba(150,195,255,0.8)");
        grads[2].addColorStop(0.75, "rgba(30,109,255,0.32)");
        grads[2].addColorStop(1, "rgba(30,109,255,0)");

        threads.forEach((pts, index) => {
          const tier = index % 3;
          const width = 0.7 + (index % 4) * 0.28;
          const alpha = 0.35 + ((index * 7) % 5) * 0.11;
          cctx.globalAlpha = alpha;
          cctx.beginPath();
          pts.forEach((p, i) => (i ? cctx.lineTo(p.x, p.y) : cctx.moveTo(p.x, p.y)));
          cctx.strokeStyle = grads[tier];
          cctx.lineWidth = width;
          cctx.lineCap = "round";
          cctx.stroke();
        });
        cctx.globalAlpha = 1;

        const glow = cctx.createRadialGradient(cx(0), cy(0), 0, cx(0), cy(0), Math.max(100, w * 0.13));
        glow.addColorStop(0, "rgba(215,233,255,0.55)");
        glow.addColorStop(0.35, "rgba(74,139,255,0.16)");
        glow.addColorStop(1, "rgba(74,139,255,0)");
        cctx.fillStyle = glow;
        cctx.fillRect(0, 0, w, h);
      } else {
        baseY = [];
        for (let i = 0; i <= SINGLE_SAMPLES; i++) {
          baseY.push(hump(i / SINGLE_SAMPLES) * h);
        }

        threads = [
          Array.from({ length: SINGLE_SAMPLES + 1 }, (_, i) => ({
            x: (i / SINGLE_SAMPLES) * w,
            y: baseY[i],
          })),
        ];

        const strandGrad = cctx.createLinearGradient(0, 0, w, 0);
        strandGrad.addColorStop(0, "rgba(30,109,255,0)");
        strandGrad.addColorStop(0.22, "rgba(30,109,255,0.16)");
        strandGrad.addColorStop(0.72, "rgba(74,139,255,0.18)");
        strandGrad.addColorStop(1, "rgba(169,199,255,0.12)");

        for (let b = 0; b < 3; b++) {
          const offset = (b - 1) * 20;
          cctx.beginPath();
          baseY.forEach((y, i) => {
            const x = (i / SINGLE_SAMPLES) * w;
            if (i) cctx.lineTo(x, y + offset);
            else cctx.moveTo(x, y + offset);
          });
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
        baseY.forEach((y, i) => {
          const x = (i / SINGLE_SAMPLES) * w;
          if (i) cctx.lineTo(x, y);
          else cctx.moveTo(x, y);
        });
        cctx.strokeStyle = mainGrad;
        cctx.lineWidth = 2;
        cctx.lineCap = "round";
        cctx.stroke();
      }

      layer = cached;
      comet = comet ?? buildComet();
      dot = dot ?? buildDot();
    };

    function cx(offset: number) {
      return w * 0.5 + offset;
    }
    function cy(offset: number) {
      return h * 0.5 + offset;
    }

    const tangentAt = (pts: Point[], index: number) => {
      const prev = pts[Math.max(0, index - 1)];
      const next = pts[Math.min(pts.length - 1, index + 1)];
      return Math.atan2(next.y - prev.y, next.x - prev.x);
    };

    const drawComet = (x: number, y: number, angle: number, alpha: number, scale: number) => {
      if (!comet) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(
        comet,
        (-COMET_LENGTH * scale) / 2,
        (-COMET_HEIGHT * scale) / 2,
        COMET_LENGTH * scale,
        COMET_HEIGHT * scale,
      );
      ctx.restore();
    };

    const drawPulse = (pts: Point[], progress: number, offsetY: number, trail: number[]) => {
      const count = pts.length - 1;
      const index = Math.min(count, Math.max(0, Math.round(progress * count)));
      const edgeFade = Math.min(1, progress / 0.06, (1 - progress) / 0.06);
      if (edgeFade <= 0.01) return;

      trail.forEach((back, i) => {
        const idx = Math.max(0, index - back);
        const p = pts[idx];
        if (!p) return;
        const alpha = (1 - i * 0.32) * edgeFade;
        drawComet(p.x, p.y + offsetY, tangentAt(pts, idx), alpha, 1 - i * 0.18);
      });
    };

    const drawMotes = (t: number, offsetY: number) => {
      if (!dot || variant !== "single") return;
      const count = threads[0]?.length ?? 0;
      if (!count) return;
      for (let i = 0; i < MOTES; i++) {
        const speed = 0.000006 + (i % 4) * 0.000003;
        const xn = (i / MOTES + t * speed) % 1;
        const idx = Math.min(count - 1, Math.floor(xn * count));
        const p = threads[0][idx];
        if (!p) continue;
        const y = p.y + offsetY + (i % 2 ? 7 : -7);
        ctx.globalAlpha = i % 3 === 0 ? 0.55 : 0.35;
        ctx.drawImage(dot, p.x - 6, y - 6, 12, 12);
      }
      ctx.globalAlpha = 1;
    };

    const drawFrame = (time: number) => {
      if (!w || !h || !layer) return;
      const t = reduce ? 0 : time;
      const offsetY = reduce ? 0 : Math.sin(t * 0.0004) * 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(layer, 0, offsetY, w, h);

      if (variant === "converge") {
        let arrival = 0;
        activePulseIndexes.forEach((ti, i) => {
          const pts = threads[ti];
          if (!pts) return;
          const progress = (t * 0.00006 + i / activePulseIndexes.length) % 1;
          drawPulse(pts, progress, offsetY, CONVERGE_TRAIL);
          if (progress > 0.87) {
            arrival = Math.max(arrival, (progress - 0.87) / 0.13);
          }
        });
        flash = reduce ? 0 : Math.max(flash * 0.94, arrival);
        if (flash > 0.01 && comet) {
          ctx.save();
          ctx.globalAlpha = flash * 0.55;
          ctx.globalCompositeOperation = "lighter";
          ctx.drawImage(comet, cx(-60), cy(-22 + offsetY), 120, 44);
          ctx.restore();
        }
      } else {
        drawPulse(threads[0], (t * 0.00007) % 1, offsetY, SINGLE_TRAIL);
        drawMotes(t, offsetY);
      }

      ctx.globalAlpha = 1;
    };

    const degrade = () => {
      if (quality === 0) {
        quality = 1;
        dprCap = 1;
        pulseCount = Math.min(3, pulseCount);
        build();
        drawFrame(last);
        ema = 0;
        over = 0;
        return;
      }
      staticMode = true;
      cancelAnimationFrame(raf);
      raf = 0;
      drawFrame(last);
    };

    const frame = (time: number) => {
      if (staticMode) return;
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (time - last < 33) return; // ~30 fps
      last = time;
      const start = performance.now();
      drawFrame(time);
      const cost = performance.now() - start;
      ema = ema ? ema * 0.9 + cost * 0.1 : cost;
      if (ema > 6) over += 1;
      else over = Math.max(0, over - 1);
      if (over > 40) degrade();
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
  }, [variant]);

  return <canvas ref={ref} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
