"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pre-rendered hero loop. The convergence is a video, not a live canvas, so
 * it is decoded off the main thread and costs the page no animation frames.
 * Playback pauses off-screen and on hidden tabs; reduced-motion users keep
 * the poster image.
 */
export function HeroThreadVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      return;
    }

    let visible = true;
    const sync = () => {
      if (document.hidden || !visible) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay may be blocked; the poster remains visible.
        });
      }
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              sync();
            },
            { rootMargin: "120px" },
          )
        : null;
    observer?.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src="/hero/thread-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90 mix-blend-screen"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero/thread-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen motion-reduce:hidden"
      >
        <source src="/hero/thread-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
