export const site = {
  name: "Lithe SD",
  legalName: "Lithe Solutions Distributor Ltd",
  tagline: "A more flexible approach",
  group: "A member of the Lithe Group of Companies",
  shortDescription:
    "A Solutions Value-Added Distributor for the IOC, Africa and Middle East — partnering with System Integrators across the full sales, design, implementation and support lifecycle.",
  description:
    "Lithe SD is a solutions value-added distributor operating across the IOC, East Africa and Middle East. We help System Integrators expand their technology portfolio, accelerate delivery and build recurring revenue across cybersecurity, cloud, infrastructure, observability and data protection.",
  url: "https://www.lithesd.com",
  email: "info@lithesd.com",
  phone: "+230 467 2006",
  phoneHref: "tel:+2304672006",
  whatsapp: "+230 5919 3131",
  whatsappHref: "https://api.whatsapp.com/send?phone=+23059193131",
  hours: "Monday – Friday · 8:00 AM – 5:30 PM",
  what3words: "///masking.sand.tokens",
  what3wordsHref: "https://w3w.co/masking.sand.tokens",
  social: {
    linkedin: "https://www.linkedin.com/company/lithe-sd",
    facebook: "https://www.facebook.com/Lithe.Solutions.Distributor",
    whatsapp: "https://api.whatsapp.com/send?phone=+23059193131",
  },
  legal: {
    privacy: "https://lithesd.com/privacy-policy/",
    terms: "https://lithesd.com/terms-condition/",
    antiCorruption:
      "https://lithesd.com/anti-corruption-and-bribery-policy/",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Vendors", href: "/vendors" },
  { label: "Partners", href: "/partners" },
  { label: "Customers", href: "/customers" },
] as const;

export const footerLegal = [
  { label: "Privacy Policy", href: site.legal.privacy },
  { label: "Terms & Condition", href: site.legal.terms },
  {
    label: "Anti-corruption & Bribery Policy",
    href: site.legal.antiCorruption,
  },
] as const;
