"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import {
  alternateHref,
  href as localeHref,
  l,
  otherLocale,
  type Locale,
} from "@/lib/i18n";
import { nav, site } from "@/lib/site";


export function SiteHeader({
  locale,
  bannerMessage,
  bannerLink,
}: {
  locale: Locale;
  bannerMessage?: string | null;
  bannerLink?: string | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const routePath = pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  const alternate = alternateHref(locale, routePath);
  const activeMessage =
    bannerMessage ||
    l(
      locale,
      "Now live: specialist brands across cybersecurity, cloud, infrastructure and data protection.",
      "Désormais en ligne : des marques spécialisées en cybersécurité, cloud, infrastructure et protection des données.",
    );
  const activeLink = bannerLink || "/brands";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      {/* Dynamic banner (CMS-managed in phase 2) */}
      <div
        className={cn(
          "overflow-hidden bg-iris text-white transition-[max-height,opacity] duration-300",
          showBanner && !scrolled ? "max-h-12 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex h-10 w-full max-w-page items-center justify-center gap-2 px-5 sm:px-8 lg:px-10">
          <Link
            href={localeHref(locale, activeLink)}
            className="flex items-center gap-2 text-center text-[12px] font-medium tracking-[-0.01em]"
          >
            <span className="line-clamp-1">{activeMessage}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label={l(locale, "Dismiss announcement", "Fermer l'annonce")}
            className="absolute right-4 rounded-full p-1 text-white/70 transition-colors hover:text-white sm:right-8"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "transition-colors duration-300",
          scrolled || open
            ? "border-b border-white/10 bg-void/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-page items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Logo locale={locale} width={122} priority />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                routePath === item.path ||
                routePath.startsWith(`${item.path}/`) ||
                Boolean(
                  item.children?.some(
                    (child) =>
                      routePath === child.path ||
                      routePath.startsWith(`${child.path}/`),
                  ),
                );

              if (!item.children?.length) {
                return (
                  <Link
                    key={item.key}
                    href={localeHref(locale, item.path)}
                    className={cn(
                      "rounded-pill px-3.5 py-2 text-sm transition-colors",
                      active ? "text-white" : "text-ash hover:text-white",
                    )}
                  >
                    {l(locale, item.en, item.fr)}
                  </Link>
                );
              }

              return (
                <div key={item.key} className="group relative">
                  <Link
                    href={localeHref(locale, item.path)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-pill px-3.5 py-2 text-sm transition-colors",
                      active ? "text-white" : "text-ash hover:text-white",
                    )}
                  >
                    {l(locale, item.en, item.fr)}
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-[200px] rounded-card border border-white/10 bg-obsidian/95 p-2 shadow-card backdrop-blur-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={localeHref(locale, child.path)}
                          className="block rounded-[8px] px-3 py-2 text-sm text-ash transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {l(locale, child.en, child.fr)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={alternate}
              className="rounded-pill border border-white/15 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ash transition-colors hover:border-white/40 hover:text-white"
              aria-label={l(locale, "Switch to French", "Passer en anglais")}
            >
              {otherLocale(locale)}
            </Link>
            <Link
              href={localeHref(locale, "/contact")}
              className="inline-flex h-10 items-center gap-2 rounded-pill bg-iris px-5 text-sm font-medium text-white transition-colors hover:bg-iris-bright"
            >
              {l(locale, "Talk to us", "Parlons-en")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? l(locale, "Close menu", "Fermer le menu") : l(locale, "Open menu", "Ouvrir le menu")}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300", open && "translate-y-[7px] rotate-45")} />
              <span className={cn("absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform duration-300", open && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "overflow-hidden border-t border-white/10 bg-void/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden",
            open ? "max-h-[80vh]" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-1 px-5 py-5 sm:px-8">
            {[...nav, { key: "contact", path: "/contact", en: "Contact", fr: "Contact" }].map((item) => (
              <div key={item.key} className="flex flex-col">
                <Link
                  href={localeHref(locale, item.path)}
                  onClick={() => setOpen(false)}
                  className="rounded-card px-3 py-3 font-display text-lg text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l(locale, item.en, item.fr)}
                </Link>
                {item.children?.length ? (
                  <div className="mb-1 flex flex-col border-l border-white/10 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={localeHref(locale, child.path)}
                        onClick={() => setOpen(false)}
                        className="rounded-card px-3 py-2 text-[15px] text-ash transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {l(locale, child.en, child.fr)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-5">
              <a href={site.phoneHref} className="text-sm text-ash">
                {site.phone}
              </a>
              <Link
                href={alternate}
                className="rounded-pill border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ash"
              >
                {otherLocale(locale)}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
