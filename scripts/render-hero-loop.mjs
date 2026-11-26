/**
 * Renders the Lithe SD hero loop: 40 fibre strands converging on a central
 * point, with pulses, a centre flare and drifting motes.
 *
 * Usage (one-off asset generation, not part of the app build):
 *   npm i --no-save @napi-rs/canvas ffmpeg-static
 *   node scripts/render-hero-loop.mjs
 *
 * Frames are written to /tmp/opencode/hero-frames and encoded to
 * public/hero/thread-loop.mp4 with public/hero/thread-poster.jpg.
 */
import { createCanvas } from "@napi-rs/canvas";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const W = 1920;
const H = 1080;
const FPS = 60;
const DURATION = 8;
const FRAMES = FPS * DURATION;
const CX = W / 2;
const CY = H / 2;

const FRAME_DIR = "/tmp/opencode/hero-frames";
const OUT_DIR = path.resolve("public/hero");

fs.rmSync(FRAME_DIR, { recursive: true, force: true });
fs.mkdirSync(FRAME_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

/* ------------------------------------------------------------------ */
/* Geometry                                                           */
/* ------------------------------------------------------------------ */

const bezier = (p0, p1, p2, p3, samples = 120) => {
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const inv = 1 - t;
    pts.push({
      x:
        inv ** 3 * p0.x +
        3 * inv ** 2 * t * p1.x +
        3 * inv * t ** 2 * p2.x +
        t ** 3 * p3.x,
      y:
        inv ** 3 * p0.y +
        3 * inv ** 2 * t * p1.y +
        3 * inv * t ** 2 * p2.y +
        t ** 3 * p3.y,
    });
  }
  return pts;
};

const tiers = [
  { rgb: [90, 151, 255], alpha: 0.38, width: 1.4 },
  { rgb: [190, 212, 255], alpha: 0.30, width: 1.0 },
  { rgb: [40, 120, 255], alpha: 0.34, width: 1.8 },
];

// Threads enter from all four sides, then curve toward a single centre point.
const sides = [
  { edge: "left", positions: [0.28, 0.5, 0.72] },
  { edge: "right", positions: [0.28, 0.5, 0.72] },
  { edge: "top", positions: [0.3, 0.5, 0.7] },
  { edge: "bottom", positions: [0.3, 0.5, 0.7] },
];
const perEntry = 4; // 4 sides × 3 entries × 4 strands = 48

const threads = [];
for (const { edge, positions } of sides) {
  const horizontal = edge === "left" || edge === "right";
  const flip = edge === "right" || edge === "bottom";
  positions.forEach((pos, index) => {
    for (let j = 0; j < perEntry; j++) {
      const off = (j - (perEntry - 1) / 2) * 0.012;
      const point = (x, y) => ({ x: x * W, y: y * H });

      let p0;
      let p1;
      let p2;
      const p3 = { x: CX + (j - 1.5) * 1.5, y: CY + (j - 1.5) * 1.5 };

      if (horizontal) {
        const y = pos + off;
        const x0 = flip ? 1.1 : -0.1;
        const x1 = flip ? 0.82 : 0.18;
        const x2 = flip ? 0.62 : 0.38;
        p0 = point(x0, y);
        p1 = point(x1, y + (0.5 - pos) * 0.04);
        p2 = point(x2, y + (0.5 - y) * 0.6);
      } else {
        const x = pos + off;
        const y0 = flip ? 1.1 : -0.1;
        const y1 = flip ? 0.82 : 0.18;
        const y2 = flip ? 0.62 : 0.38;
        p0 = point(x, y0);
        p1 = point(x + (0.5 - pos) * 0.04, y1);
        p2 = point(x + (0.5 - x) * 0.6, y2);
      }

      threads.push({
        pts: bezier(p0, p1, p2, p3),
        tier: tiers[(index + j + (flip ? 1 : 0)) % tiers.length],
        alpha: 0.18 + ((j * 3 + index) % 4) * 0.05,
        width: 0.75 + ((j + index) % 3) * 0.22,
      });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Sprites                                                            */
/* ------------------------------------------------------------------ */

const makeGlow = (size, stops) => {
  const c = createCanvas(size, size);
  const cctx = c.getContext("2d");
  const g = cctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([offset, color]) => g.addColorStop(offset, color));
  cctx.fillStyle = g;
  cctx.fillRect(0, 0, size, size);
  return c;
};

const comet = makeGlow(128, [
  [0, "rgba(240,248,255,0.95)"],
  [0.18, "rgba(205,228,255,0.7)"],
  [0.45, "rgba(120,175,255,0.22)"],
  [1, "rgba(80,140,255,0)"],
]);

const dot = makeGlow(32, [
  [0, "rgba(225,240,255,0.9)"],
  [0.4, "rgba(150,195,255,0.5)"],
  [1, "rgba(100,150,255,0)"],
]);

/* ------------------------------------------------------------------ */
/* Draw                                                               */
/* ------------------------------------------------------------------ */

const sampleAt = (pts, p) => {
  const idx = Math.min(pts.length - 1, Math.max(0, Math.round(p * (pts.length - 1))));
  return { point: pts[idx], idx };
};

const drawStrands = () => {
  ctx.globalCompositeOperation = "lighter";
  for (const thread of threads) {
    const { pts, tier, alpha, width } = thread;
    const passes = [
      { w: width * 6, a: alpha * 0.08 },
      { w: width * 2.6, a: alpha * 0.22 },
      { w: width, a: alpha },
    ];
    for (const pass of passes) {
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = `rgba(${tier.rgb[0]},${tier.rgb[1]},${tier.rgb[2]},${pass.a})`;
      ctx.lineWidth = pass.w;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
  ctx.globalCompositeOperation = "source-over";
};

const drawCentreBloom = () => {
  const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, 260);
  g.addColorStop(0, "rgba(210,232,255,0.30)");
  g.addColorStop(0.3, "rgba(74,139,255,0.10)");
  g.addColorStop(1, "rgba(74,139,255,0)");
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = g;
  ctx.fillRect(CX - 260, CY - 260, 520, 520);
  ctx.globalCompositeOperation = "source-over";
};

const pulseThreads = Array.from({ length: 8 }, (_, i) => i * 6); // eight evenly spread pulses

const drawPulses = (t) => {
  let flare = 0;
  ctx.globalCompositeOperation = "lighter";
  pulseThreads.forEach((threadIndex, i) => {
    const thread = threads[threadIndex];
    if (!thread) return;
    const p = (t / DURATION + i / pulseThreads.length) % 1;
    const edge = Math.min(1, p / 0.05, (1 - p) / 0.05);
    if (edge <= 0) return;

    for (let k = 0; k < 7; k++) {
      const back = k * 0.008;
      const pp = Math.max(0, p - back);
      const { point, idx } = sampleAt(thread.pts, pp);
      const prev = thread.pts[Math.max(0, idx - 2)];
      const next = thread.pts[Math.min(thread.pts.length - 1, idx + 2)];
      const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
      const length = 120 * (1 - k * 0.1);
      const height = 26 * (1 - k * 0.1);
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(angle);
      ctx.globalAlpha = edge * (1 - k * 0.14) * 0.7;
      ctx.drawImage(comet, -length / 2, -height / 2, length, height);
      ctx.restore();
    }
    if (p > 0.88) {
      flare += Math.sin((Math.PI * (p - 0.88)) / 0.12) * 0.35;
    }
  });

  if (flare > 0) {
    ctx.globalAlpha = Math.min(0.55, flare);
    const size = 340;
    ctx.drawImage(comet, CX - size / 2, CY - size / 2, size, size);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
};

const motes = Array.from({ length: 12 }, (_, i) => ({
  thread: threads[(i * 7) % threads.length],
  offset: (i * 0.083) % 1,
  cycles: 1 + (i % 3),
  radius: 3 + (i % 3),
  alpha: 0.3 + (i % 4) * 0.08,
}));

const drawMotes = (t) => {
  ctx.globalCompositeOperation = "lighter";
  for (const mote of motes) {
    const p = (mote.offset + (t / DURATION) * mote.cycles) % 1;
    const { point } = sampleAt(mote.thread.pts, p);
    const size = mote.radius * 4;
    ctx.globalAlpha = mote.alpha;
    ctx.drawImage(dot, point.x - size / 2, point.y - size / 2, size, size);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
};

/* ------------------------------------------------------------------ */
/* Render                                                             */
/* ------------------------------------------------------------------ */

for (let frame = 0; frame < FRAMES; frame++) {
  const t = frame / FPS;
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(0, Math.sin((2 * Math.PI * t) / DURATION) * 2);
  drawStrands();
  drawCentreBloom();
  drawPulses(t);
  drawMotes(t);
  ctx.restore();

  const file = path.join(FRAME_DIR, `${String(frame).padStart(4, "0")}.png`);
  fs.writeFileSync(file, canvas.toBuffer("image/png"));
}

/* ------------------------------------------------------------------ */
/* Encode                                                             */
/* ------------------------------------------------------------------ */

execFileSync(
  ffmpeg,
  [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(FRAME_DIR, "%04d.png"),
    "-frames:v",
    String(FRAMES),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "20",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    path.join(OUT_DIR, "thread-loop.mp4"),
  ],
  { stdio: "inherit" },
);

execFileSync(
  ffmpeg,
  [
    "-y",
    "-i",
    path.join(FRAME_DIR, "0000.png"),
    "-q:v",
    "3",
    path.join(OUT_DIR, "thread-poster.jpg"),
  ],
  { stdio: "inherit" },
);

const mp4 = fs.statSync(path.join(OUT_DIR, "thread-loop.mp4"));
const poster = fs.statSync(path.join(OUT_DIR, "thread-poster.jpg"));
console.log(`mp4: ${(mp4.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`poster: ${(poster.size / 1024).toFixed(0)} KB`);
