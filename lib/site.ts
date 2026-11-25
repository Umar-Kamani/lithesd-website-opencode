export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://lithesd.com";

export const site = {
  name: "Lithe SD",
  legalName: "Lithe Solutions Distributor Ltd",
  url: siteUrl,
  email: "info@lithesd.com",
  phone: "+230 467 2006",
  phoneHref: "tel:+2304672006",
  whatsapp: "+230 5919 3131",
  whatsappHref: "https://api.whatsapp.com/send?phone=+23059193131",
  what3words: "///masking.sand.tokens",
  what3wordsHref: "https://w3w.co/masking.sand.tokens",
  hours: {
    en: "Monday – Friday · 8:00 AM – 5:30 PM",
    fr: "Lundi – Vendredi · 8h00 – 17h30",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/lithe-sd",
    facebook: "https://www.facebook.com/Lithe.Solutions.Distributor",
    whatsapp: "https://api.whatsapp.com/send?phone=+23059193131",
  },
  legal: {
    privacy: "https://lithesd.com/privacy-policy/",
    terms: "https://lithesd.com/terms-condition/",
    antiCorruption: "https://lithesd.com/anti-corruption-and-bribery-policy/",
  },
} as const;

export type NavItem = {
  key: string;
  path: string;
  en: string;
  fr: string;
};

export const nav: NavItem[] = [
  { key: "about", path: "/about", en: "About", fr: "À propos" },
  { key: "solutions", path: "/solutions", en: "Solutions", fr: "Solutions" },
  { key: "services", path: "/services", en: "Services", fr: "Services" },
  { key: "brands", path: "/brands", en: "Brands", fr: "Marques" },
  { key: "insights", path: "/insights", en: "Insights", fr: "Analyses" },
  { key: "partners", path: "/partners", en: "Partners", fr: "Partenaires" },
  { key: "resources", path: "/resources", en: "Resources", fr: "Ressources" },
];

export const footerNav = [
  ...nav,
  { key: "case-studies", path: "/case-studies", en: "Case studies", fr: "Études de cas" },
  { key: "customers", path: "/customers", en: "Customers", fr: "Clients" },
  { key: "events", path: "/events", en: "Events", fr: "Événements" },
  { key: "contact", path: "/contact", en: "Contact", fr: "Contact" },
];

export const offices = [
  {
    city: { en: "Mauritius", fr: "Maurice" },
    role: { en: "IOC Office", fr: "Bureau COI" },
    phone: "+230 467 2006",
    phoneHref: "tel:+2304672006",
    email: "info@lithesd.com",
  },
  {
    city: { en: "Kenya", fr: "Kenya" },
    role: { en: "East Africa Office", fr: "Bureau Afrique de l'Est" },
    phone: "+254 727 162 875",
    phoneHref: "tel:+254727162875",
    email: "info@lithesd.com",
  },
  {
    city: { en: "Dubai", fr: "Dubaï" },
    role: { en: "Middle East Office", fr: "Bureau Moyen-Orient" },
    phone: "+971 56 211 7015",
    phoneHref: "tel:+971562117015",
    email: "info@lithesd.com",
  },
] as const;

export const regionNames = ["IOC", "East Africa", "Middle East"];
