"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Button } from "./button";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-midnight-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Lithe SD — home"
        >
          <Logo priority width={126} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-button px-3.5 py-2 font-display text-[13px] uppercase tracking-[0.08em] transition-colors",
                  active
                    ? "text-white"
                    : "text-halo-violet/70 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="font-mono text-[12px] tracking-wide text-halo-violet/70 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
          <Button href="/contact" size="md">
            Contact Us
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-white/20 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-midnight-ink/95 backdrop-blur-xl transition-[max-height] duration-500 ease-out lg:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-5 sm:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-button px-3 py-3 font-display text-lg text-white/90 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-5">
            <a
              href={site.phoneHref}
              className="font-mono text-sm text-halo-violet/80"
            >
              {site.phone}
            </a>
            <Button href="/contact" size="lg" className="w-full">
              Contact Us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
