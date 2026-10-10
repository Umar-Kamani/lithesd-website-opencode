"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./button";
import { site } from "@/lib/site";

const INTERESTS = [
  "Become a partner",
  "Request a quote",
  "Technical support",
  "Vendor partnership",
  "Professional services",
  "Something else",
];

const REGIONS = ["IOC", "East Africa", "Middle East", "Elsewhere"];

const inputClass =
  "w-full rounded-card border border-silver-border bg-white px-4 py-3 text-sm text-midnight-ink placeholder:text-mist/70 outline-none transition-colors focus:border-signal-blue";

const labelClass =
  "font-mono text-micro uppercase tracking-[0.1em] text-fog";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-silver-border bg-white p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-signal-blue text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-subheading font-light text-midnight-ink">
          Thank you
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-slate-body">
          This form isn&apos;t connected to a mailbox yet. In the meantime,
          please reach us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-signal-blue underline-offset-2 hover:underline"
          >
            {site.email}
          </a>{" "}
          or call{" "}
          <a
            href={site.phoneHref}
            className="font-medium text-signal-blue underline-offset-2 hover:underline"
          >
            {site.phone}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-card border border-silver-border bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Full name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Work email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Region</span>
          <select name="region" className={inputClass} defaultValue={REGIONS[0]}>
            {REGIONS.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>How can we help?</span>
        <select name="interest" className={inputClass} defaultValue={INTERESTS[0]}>
          {INTERESTS.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project or partnership goals…"
          className={`${inputClass} resize-y`}
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-body">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-silver-border accent-signal-blue"
        />
        <span>
          I agree to be contacted by Lithe SD about my enquiry and have read the
          Privacy Policy.
        </span>
      </label>

      <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start">
        Send message
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      </Button>
    </form>
  );
}
