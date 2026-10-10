"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number; z: number };

export function ParticleSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const COUNT = 1000;
    const points: Point[] = [];
    const offset = 2 / COUNT;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * increment;
      points.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r });
    }

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.33;
      const a = reduce ? 0.5 : time * 0.00011;
      const b = reduce ? 0.2 : time * 0.00006;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const cosB = Math.cos(b);
      const sinB = Math.sin(b);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        const y = p.y * cosB - z * sinB;
        z = p.y * sinB + z * cosB;

        const perspective = 1 / (1.9 - z * 0.85);
        const px = cx + x * radius * 1.55 * perspective;
        const py = cy + y * radius * 1.55 * perspective;

        const depth = (z + 1) / 2; // 0 (back) -> 1 (front)
        const alpha = 0.05 + depth * depth * 0.8;
        const size = 0.4 + depth * 1.8;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        if (depth > 0.72) {
          ctx.fillStyle = `rgba(52, 252, 255, ${alpha})`;
        } else if (depth > 0.4) {
          ctx.fillStyle = `rgba(120, 150, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(90, 110, 220, ${alpha})`;
        }
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

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
