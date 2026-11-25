import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Locale } from "./i18n";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>;

export type Policy = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: unknown;
  effectiveDate: string;
  category: string;
  order: number;
  showInFooter: boolean;
  updatedAt: string;
};

const mapPolicy = (raw: Doc): Policy => ({
  id: String(raw.id),
  slug: String(raw.slug ?? ""),
  title: String(raw.title ?? ""),
  summary: String(raw.summary ?? ""),
  body: raw.body ?? null,
  effectiveDate: String(raw.effectiveDate ?? ""),
  category: String(raw.category ?? "other"),
  order: Number(raw.order ?? 0),
  showInFooter: raw.showInFooter !== false,
  updatedAt: String(raw.updatedAt ?? ""),
});

export const getPolicies = cache(async (locale: Locale): Promise<Policy[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "policies",
      where: { _status: { equals: "published" } } as never,
      locale,
      depth: 0,
      sort: "order",
      limit: 100,
      pagination: false,
    });
    return docs.map(mapPolicy).filter((policy) => policy.slug);
  } catch (error) {
    console.error("[cms] getPolicies failed", error);
    return [];
  }
});

export const getPolicy = cache(async (locale: Locale, slug: string) =>
  (await getPolicies(locale)).find((policy) => policy.slug === slug),
);
