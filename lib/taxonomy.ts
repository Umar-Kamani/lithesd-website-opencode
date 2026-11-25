import type { Locale } from "./i18n";

export const pillarLabels: Record<string, { en: string; fr: string }> = {
  cybersecurity: { en: "Cybersecurity", fr: "Cybersécurité" },
  "infrastructure-cloud": {
    en: "Infrastructure & cloud",
    fr: "Infrastructure & cloud",
  },
  "business-tools": { en: "Business tools", fr: "Outils métier" },
  observability: { en: "Observability", fr: "Observabilité" },
  "ai-bi": { en: "AI & BI", fr: "IA & BI" },
  "data-protection": {
    en: "Data protection",
    fr: "Protection des données",
  },
};

export const industryLabels: Record<string, { en: string; fr: string }> = {
  government: { en: "Government", fr: "Gouvernement" },
  hospitality: { en: "Hospitality", fr: "Hôtellerie" },
  education: { en: "Education", fr: "Éducation" },
  logistics: { en: "Logistics", fr: "Logistique" },
  telecoms: { en: "Telecoms", fr: "Télécoms" },
  "real-estate": { en: "Real estate", fr: "Immobilier" },
  banking: { en: "Banking", fr: "Banque" },
  healthcare: { en: "Healthcare", fr: "Santé" },
  construction: { en: "Construction", fr: "Construction" },
  datacenters: { en: "Datacenters", fr: "Datacenters" },
  retail: { en: "Retail", fr: "Commerce" },
  security: { en: "Security", fr: "Sécurité" },
  mining: { en: "Mining", fr: "Mines" },
  manufacturing: { en: "Manufacturing", fr: "Industrie" },
  isps: { en: "ISPs", fr: "FAI" },
};

export function labelFor(
  map: Record<string, { en: string; fr: string }>,
  locale: Locale,
  value: string,
): string {
  const entry = map[value];
  if (!entry) return value;
  return locale === "fr" ? entry.fr : entry.en;
}
