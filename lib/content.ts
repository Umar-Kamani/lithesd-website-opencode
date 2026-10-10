import type { IconName } from "./icons";

/* ------------------------------------------------------------------
   Stats
------------------------------------------------------------------ */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  isYear?: boolean;
};

export const stats: Stat[] = [
  { value: 2014, label: "Founded", isYear: true },
  { value: 1200, suffix: "+", label: "Customers" },
  { value: 100, suffix: "+", label: "Channel Partners" },
  { value: 100, suffix: "+", label: "Projects Executed" },
  { value: 20, suffix: "+", label: "Countries" },
  { value: 3, label: "Strategic Regions" },
];

/* ------------------------------------------------------------------
   Solution pillars
------------------------------------------------------------------ */
export type Pillar = {
  id: string;
  title: string;
  summary: string;
  icon: IconName;
  capabilities: string[];
};

export const pillars: Pillar[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "shield-check",
    summary:
      "Defence-in-depth across identity, network, endpoint and cloud — from prevention through to resilience and recovery.",
    capabilities: [
      "Identity Security",
      "Operations & Monitoring",
      "Network, Endpoint & Ransomware Protection",
      "WAF, ZTNA & API Security",
      "Cyber Resilience & Recovery",
    ],
  },
  {
    id: "infrastructure-cloud",
    title: "Enterprise Infrastructure & Cloud",
    icon: "server",
    summary:
      "Modern, resilient foundations — hyperconverged compute, private and hybrid cloud, and frictionless multi-cloud integration.",
    capabilities: [
      "Hyperconverged Infrastructure",
      "High Availability & Disaster Recovery",
      "Containerisation, SDI & VDI",
      "Private & Hybrid Cloud",
      "Multi-Cloud Migration and Integration",
    ],
  },
  {
    id: "business-tools",
    title: "Business Tools",
    icon: "briefcase",
    summary:
      "The collaboration, telephony and data-sovereignty platforms that keep distributed teams productive and compliant.",
    capabilities: [
      "Enterprise Collaboration Platforms",
      "Telephony",
      "Data Sovereignty",
    ],
  },
  {
    id: "monitoring-observability",
    title: "Asset Management, Monitoring & Observability",
    icon: "activity",
    summary:
      "Unified visibility across networks, infrastructure and services — with ITSM, ITAM and performance management built in.",
    capabilities: [
      "Unified Observability Platform",
      "ITSM & ITAM",
      "Hybrid Infrastructure Monitoring",
      "Network Performance Monitoring & Configuration",
      "Compliance Management",
    ],
  },
  {
    id: "ai-bi",
    title: "AI & BI",
    icon: "brain-circuit",
    summary:
      "Turn data into decisions with AI analytics, low-code platforms and intelligent video and footfall analytics.",
    capabilities: [
      "AI Analytics and Bespoke Development",
      "Low Code / No Code Platforms",
      "CCTV & Footfall Analytics",
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection & Backup",
    icon: "database-backup",
    summary:
      "Protect what matters with resilient backup, storage and insider-risk controls that satisfy the strictest compliance mandates.",
    capabilities: [
      "Data Backup",
      "Storage Solutions",
      "User Activity Monitoring",
      "Data Loss Protection",
    ],
  },
];

/* ------------------------------------------------------------------
   Professional services
------------------------------------------------------------------ */
export type Service = {
  title: string;
  description: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    title: "Incident Response",
    icon: "siren",
    description:
      "Rapid containment and recovery when it matters most, guided by certified responders.",
  },
  {
    title: "Cyber Forensics",
    icon: "fingerprint",
    description:
      "Deep investigation that establishes root cause, scope and evidence you can act on.",
  },
  {
    title: "Threat Hunting",
    icon: "crosshair",
    description:
      "Proactive detection of threats that evade automated tooling before they cause impact.",
  },
  {
    title: "Vulnerability Assessment",
    icon: "scan-search",
    description:
      "A prioritised roadmap that hardens your infrastructure against emerging risk.",
  },
  {
    title: "Deployment & Implementation",
    icon: "package-open",
    description:
      "Swift, low-disruption rollouts that get technology delivering value fast.",
  },
  {
    title: "Compliance Management",
    icon: "clipboard-check",
    description:
      "Streamlined adherence to industry standards, minimising risk and operational friction.",
  },
  {
    title: "ISO Consultancy",
    icon: "badge-check",
    description:
      "Navigate standards and certification with a partner who has walked the path before.",
  },
  {
    title: "Security & IT Audits",
    icon: "file-search",
    description:
      "Meticulous assessment that uncovers gaps and fortifies your defences.",
  },
];

/* ------------------------------------------------------------------
   Values
------------------------------------------------------------------ */
export type Value = {
  title: string;
  description: string;
  icon: IconName;
};

export const values: Value[] = [
  {
    title: "Integrity",
    icon: "shield-check",
    description:
      "We prioritise trust, ethical standards and transparent relationships in all interactions and decisions.",
  },
  {
    title: "Responsibility",
    icon: "leaf",
    description:
      "We take ownership of our clients' needs, environmental impact and employee growth with unwavering commitment.",
  },
  {
    title: "Excellence",
    icon: "gem",
    description:
      "We strive for unparalleled quality, setting industry standards and delivering optimal outcomes for clients.",
  },
  {
    title: "Empowerment",
    icon: "users",
    description:
      "We foster personal and professional growth, providing opportunities for our team to excel and lead.",
  },
];

/* ------------------------------------------------------------------
   Value addition (what makes Lithe SD different)
------------------------------------------------------------------ */
export type ValueAdd = { title: string; description: string; icon: IconName };

export const valueAdd: ValueAdd[] = [
  {
    title: "LithePROTECT™ Partner Program",
    icon: "shield-check",
    description:
      "Vendor-independent deal registration, comprehensive training and lucrative incentives — empowering partners to win.",
  },
  {
    title: "Technical Expertise",
    icon: "wrench",
    description:
      "A team with unmatched technical knowledge, solving complex issues and optimising system performance effectively.",
  },
  {
    title: "Partner Enablement",
    icon: "graduation-cap",
    description:
      "Extensive training and marketing support that equips partners with the right skills to serve their customers.",
  },
  {
    title: "Product & Market Specialist",
    icon: "compass",
    description:
      "In-depth insight that keeps partners ahead in rapidly evolving technology markets.",
  },
  {
    title: "Presales Support",
    icon: "headset",
    description:
      "Comprehensive presales assistance so partners make informed decisions and maximise their technology investments.",
  },
];

/* ------------------------------------------------------------------
   Why partner with Lithe SD
------------------------------------------------------------------ */
export const whyPartner: string[] = [
  "Expand their technology portfolio and add value to existing offerings",
  "Access new, innovative technologies and specialised technical expertise",
  "Accelerate project delivery with deployment services and expert support",
  "Increase professional services revenue through high-margin engagements",
  "Develop managed services offerings for predictable, recurring revenue",
  "Improve customer retention through value-added, outcome-driven solutions",
];

/* ------------------------------------------------------------------
   Channel partner pain points
------------------------------------------------------------------ */
export const painPoints: string[] = [
  "Pressure to expand your solution portfolio without proportionally scaling headcount",
  "Difficulty accessing the right technologies at competitive margins",
  "Customers demanding end-to-end project accountability and measurable outcomes",
  "The need to build recurring managed services revenues alongside project work",
  "Complex multi-vendor implementations with tight delivery deadlines",
  "Evolving cybersecurity threats that your customers need solved now",
];

/* ------------------------------------------------------------------
   Comparison — traditional distributor vs Lithe SD
------------------------------------------------------------------ */
export const comparison: { traditional: string; lithe: string }[] = [
  {
    traditional: "Product fulfilment only",
    lithe: "Full lifecycle support: Pre-Sales → Implementation → Post-Sales",
  },
  {
    traditional: "Transactional, order-driven relationships",
    lithe: "Strategic, long-term partnership model",
  },
  {
    traditional: "Minimal post-sale technical support",
    lithe: "Dedicated technical and managed services support",
  },
  {
    traditional: "One-size-fits-all product approach",
    lithe: "Tailored to your SI's strengths and customer base",
  },
  {
    traditional: "Limited in-house technical depth",
    lithe: "Certified technical experts across all solution pillars",
  },
];

/* ------------------------------------------------------------------
   Support lifecycle
------------------------------------------------------------------ */
export type LifecycleStage = {
  stage: string;
  icon: IconName;
  points: string[];
};

export const lifecycle: LifecycleStage[] = [
  {
    stage: "Pre-Sales",
    icon: "presentation",
    points: [
      "Technical consultation and needs analysis",
      "Solution architecture and Bill of Materials (BoM) development",
      "Vendor engagement and proof-of-concept support",
      "Competitive positioning and proposal support",
    ],
  },
  {
    stage: "Sales",
    icon: "handshake",
    points: [
      "Competitive and flexible commercial pricing",
      "Deal registration and margin protection",
      "Commercial structuring and financing options",
    ],
  },
  {
    stage: "Implementation",
    icon: "wrench",
    points: [
      "Deployment and integration support",
      "Quality assurance and technical testing",
      "Technical escalation and certified expert access",
    ],
  },
  {
    stage: "Post-Sales",
    icon: "life-buoy",
    points: [
      "Ongoing Level 2/3 technical support",
      "Training and knowledge transfer",
      "Managed services enablement and practice development",
      "Product lifecycle management and roadmap updates",
    ],
  },
];

/* ------------------------------------------------------------------
   LithePROTECT™
------------------------------------------------------------------ */
export const litheProtect = [
  {
    title: "Joint Business Planning",
    icon: "target" as IconName,
    description:
      "Align strategies and goals with Lithe SD's market insight and expertise for informed decision-making.",
  },
  {
    title: "Vendor-Independent Deal Registration",
    icon: "shield-check" as IconName,
    description:
      "Guaranteed vendor-independent deal registration — fairness and equal opportunity for every partner.",
  },
  {
    title: "Dedicated Channel Support",
    icon: "headset" as IconName,
    description:
      "Personalised support spanning pre-sales assistance, technical support and marketing collaboration.",
  },
];

/* ------------------------------------------------------------------
   Vendor onboarding journey
------------------------------------------------------------------ */
export type OnboardingStep = {
  title: string;
  description: string;
  icon: IconName;
};

export const onboarding: OnboardingStep[] = [
  {
    title: "Technology Vetting & Strategic Fit",
    icon: "shield-check",
    description:
      "Ensure the technology aligns with market demands and evaluate the vendor roadmap.",
  },
  {
    title: "Proof of Concept & Technical Validation",
    icon: "flask",
    description:
      "Validate real-world performance and compatibility in region.",
  },
  {
    title: "Commercial & Partnership Evaluation",
    icon: "handshake",
    description:
      "Confirm commercial viability and long-term partner alignment.",
  },
  {
    title: "Internal Enablement & Resource Building",
    icon: "users",
    description:
      "Prepare Lithe SD to sell, deploy and support the solution end-to-end.",
  },
  {
    title: "Go to Market",
    icon: "rocket",
    description:
      "Activate the channel with pricing, enablement and demand generation.",
  },
];

/* ------------------------------------------------------------------
   Why choose us
------------------------------------------------------------------ */
export type WhyChoose = {
  title: string;
  description: string;
  icon: IconName;
};

export const whyChoose: WhyChoose[] = [
  {
    title: "Award-Winning Distributor",
    icon: "trophy",
    description:
      "Globally recognised by international technology vendors for our commitment to excellence and continuous growth. A trusted name across the IOC, Africa and Middle East.",
  },
  {
    title: "Unparalleled Technology Solutions",
    icon: "sparkles",
    description:
      "The gateway to top-tier, innovative and disruptive technology — partnering with industry leaders to empower business success with precision and innovation.",
  },
  {
    title: "100% Channel-Driven Distribution",
    icon: "share-2",
    description:
      "We go to market exclusively through our partner network — strengthening partnerships, protecting margins and fostering mutual growth.",
  },
];

/* ------------------------------------------------------------------
   Customer verticals
------------------------------------------------------------------ */
export type Vertical = { title: string; icon: IconName };

export const verticals: Vertical[] = [
  { title: "Government", icon: "landmark" },
  { title: "Hospitality", icon: "hotel" },
  { title: "Education", icon: "graduation-cap" },
  { title: "Logistics", icon: "truck" },
  { title: "Telecoms", icon: "radio-tower" },
  { title: "Real Estate", icon: "building" },
  { title: "Banking", icon: "banknote" },
  { title: "Healthcare", icon: "heart-pulse" },
  { title: "Construction", icon: "hard-hat" },
  { title: "Datacenters", icon: "server" },
  { title: "Retail", icon: "shopping-bag" },
  { title: "Security", icon: "lock" },
  { title: "Mining", icon: "pickaxe" },
  { title: "Manufacturing", icon: "factory" },
  { title: "ISPs", icon: "network" },
];

/* ------------------------------------------------------------------
   Vendors
------------------------------------------------------------------ */
export type Vendor = { name: string; logo?: string; pillar: string };

export const vendors: Vendor[] = [
  // Cybersecurity
  { name: "Sangfor", logo: "/vendors/sangfor.png", pillar: "cybersecurity" },
  { name: "Arcon", logo: "/vendors/arcon.png", pillar: "cybersecurity" },
  {
    name: "WatchGuard",
    logo: "/vendors/watchguard.png",
    pillar: "cybersecurity",
  },
  { name: "Seceon", logo: "/vendors/seceon.png", pillar: "cybersecurity" },
  {
    name: "MonitorApp",
    logo: "/vendors/monitorapp.png",
    pillar: "cybersecurity",
  },
  // Enterprise Infrastructure & Cloud
  {
    name: "KIOXIA",
    logo: "/vendors/kioxia.svg",
    pillar: "infrastructure-cloud",
  },
  {
    name: "Western Digital",
    logo: "/vendors/western-digital.svg",
    pillar: "infrastructure-cloud",
  },
  { name: "Fusion", logo: "/vendors/fusion.svg", pillar: "infrastructure-cloud" },
  { name: "QSAN", logo: "/vendors/qsan.png", pillar: "infrastructure-cloud" },
  { name: "Samsung", logo: "/vendors/samsung.png", pillar: "infrastructure-cloud" },
  // Business Tools
  { name: "Sangoma", logo: "/vendors/sangoma.png", pillar: "business-tools" },
  { name: "IceWarp", logo: "/vendors/icewarp.png", pillar: "business-tools" },
  { name: "Axigen", pillar: "business-tools" },
  // Asset Management, Monitoring & Observability
  {
    name: "Motadata",
    logo: "/vendors/motadata.png",
    pillar: "monitoring-observability",
  },
  {
    name: "Scalefusion",
    logo: "/vendors/scalefusion.svg",
    pillar: "monitoring-observability",
  },
  // AI & BI
  { name: "Trassir", logo: "/vendors/trassir.png", pillar: "ai-bi" },
  { name: "vCount", logo: "/vendors/vcount.png", pillar: "ai-bi" },
  { name: "Updapt", logo: "/vendors/updapt.png", pillar: "ai-bi" },
  // Data Protection & Backup
  { name: "Keepit", logo: "/vendors/keepit.png", pillar: "data-protection" },
  { name: "Teramind", logo: "/vendors/teramind.png", pillar: "data-protection" },
  {
    name: "Backup Everything",
    logo: "/vendors/backup-everything.png",
    pillar: "data-protection",
  },
];

/* ------------------------------------------------------------------
   Customers (rendered as a wordmark wall)
------------------------------------------------------------------ */
export const customers: string[] = [
  "Emtel",
  "MCB",
  "Sanlam",
  "Orange",
  "MauBank",
  "SICOM Group",
  "Sunlife",
  "Gamma",
  "IBL",
  "DBS",
  "Seypec",
  "Ocorian",
  "AML",
  "Cargo Handling",
  "Intermart",
  "Metro Express",
  "Landscape Mauritius",
  "QuantiLAB",
  "Lottotech",
  "Capital",
  "Credentia",
  "Odity",
  "The Hub Karen",
  "Duty Free",
  "Sika",
  "Text Book Centre",
  "La Sentinelle",
  "DTOS",
  "Mauri Facilities",
  "State Investment Corporation",
  "Mutual Aid",
];

/* ------------------------------------------------------------------
   Offices
------------------------------------------------------------------ */
export type Office = {
  city: string;
  role: string;
  address: string;
  phone: string;
  phoneHref: string;
};

export const offices: Office[] = [
  {
    city: "Mauritius",
    role: "IOC Office",
    address: "02, Osman Avenue, Quatre Bornes – 72249, Republic of Mauritius",
    phone: "+230 467 2006",
    phoneHref: "tel:+2304672006",
  },
  {
    city: "Kenya",
    role: "East Africa Office",
    address: "Suite 3, 20 Westlands Road, Nairobi, Kenya",
    phone: "+254 727 162 875",
    phoneHref: "tel:+254727162875",
  },
  {
    city: "Dubai",
    role: "Middle East Office",
    address: "Suite 801-04, Al Serkal Building 2, Port Saeed, Deira, Dubai, UAE",
    phone: "+971 56 211 7015",
    phoneHref: "tel:+971562117015",
  },
];

/* ------------------------------------------------------------------
   Misc
------------------------------------------------------------------ */
export const about = {
  vision:
    "We aim to revolutionise the IT solutions distribution landscape by delivering unmatched value to our partners and end-customers. We strive to be the catalyst for digital transformation across the IOC, Africa and Middle East regions — empowering System Integrators and businesses to thrive in the dynamic world of technology.",
  mission:
    "To be the leading provider of innovative IT solutions, empowering System Integrators and businesses in the IOC, Africa and Middle East regions to achieve their strategic objectives through our tailored approach, comprehensive support and unwavering commitment to excellence.",
  process:
    "A streamlined, partner-centric process ensuring successful delivery of IT solutions — from initial consultation and solution design through to implementation, training and ongoing support.",
  intro: [
    "Lithe Solutions Distributor Ltd (Lithe SD) is a Solutions Value-Added Distributor operating in the IOC, Africa and Middle East regions, and a proud member of the Lithe Group of Companies.",
    "We go beyond traditional distribution. We partner with System Integrators throughout the entire sales, design, implementation and support lifecycle — ensuring successful, measurable customer outcomes.",
    "Our expertise spans enterprise infrastructure, private and hybrid cloud, cybersecurity, infrastructure monitoring and observability, and professional services. We understand that every System Integrator has unique strengths, and we tailor our engagement to complement and amplify yours.",
    "With deep regional knowledge and a growing network of over 100 channel partners, Lithe SD has become the trusted distributor of choice for businesses and System Integrators seeking reliable, innovative technology solutions.",
  ],
};

export const regionNames = ["IOC", "East Africa", "Middle East"];
