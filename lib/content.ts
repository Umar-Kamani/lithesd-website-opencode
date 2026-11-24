import type { IconName } from "./icons";

export type Bi = { en: string; fr: string };

export const stats: { value: string; label: Bi }[] = [
  { value: "2014", label: { en: "Founded", fr: "Fondée en" } },
  { value: "1,200+", label: { en: "Customers", fr: "Clients" } },
  { value: "100+", label: { en: "Channel partners", fr: "Partenaires" } },
  { value: "100+", label: { en: "Projects delivered", fr: "Projets livrés" } },
  { value: "20+", label: { en: "Countries", fr: "Pays" } },
  { value: "3", label: { en: "Strategic regions", fr: "Régions" } },
];

export type Pillar = {
  id: string;
  title: Bi;
  summary: Bi;
  icon: IconName;
  capabilities: Bi[];
};

export const pillars: Pillar[] = [
  {
    id: "cybersecurity",
    icon: "shield-check",
    title: { en: "Cybersecurity", fr: "Cybersécurité" },
    summary: {
      en: "Defence in depth across identity, network, endpoint and cloud — from prevention through to resilience and recovery.",
      fr: "Une défense en profondeur de l'identité, du réseau, des postes et du cloud — de la prévention à la résilience et à la reprise.",
    },
    capabilities: [
      { en: "Identity security", fr: "Sécurité des identités" },
      { en: "Operations & monitoring", fr: "Opérations & supervision" },
      { en: "Network, endpoint & ransomware", fr: "Réseau, postes & rançongiciels" },
      { en: "WAF, ZTNA & API security", fr: "WAF, ZTNA & sécurité des API" },
      { en: "Cyber resilience & recovery", fr: "Résilience & reprise" },
    ],
  },
  {
    id: "infrastructure-cloud",
    icon: "server",
    title: { en: "Enterprise infrastructure & cloud", fr: "Infrastructure & cloud" },
    summary: {
      en: "Modern, resilient foundations — hyperconverged compute, private and hybrid cloud, and frictionless multi-cloud integration.",
      fr: "Des fondations modernes et résilientes — calcul hyperconvergé, cloud privé et hybride, intégration multi-cloud.",
    },
    capabilities: [
      { en: "Hyperconverged infrastructure", fr: "Infrastructure hyperconvergée" },
      { en: "High availability & disaster recovery", fr: "Haute disponibilité & PRA" },
      { en: "Containerisation, SDI & VDI", fr: "Conteneurs, SDI & VDI" },
      { en: "Private & hybrid cloud", fr: "Cloud privé & hybride" },
      { en: "Multi-cloud migration", fr: "Migration multi-cloud" },
    ],
  },
  {
    id: "business-tools",
    icon: "briefcase",
    title: { en: "Business tools", fr: "Outils métier" },
    summary: {
      en: "The collaboration, telephony and data-sovereignty platforms that keep distributed teams productive and compliant.",
      fr: "Les plateformes de collaboration, de téléphonie et de souveraineté des données qui rendent les équipes productives et conformes.",
    },
    capabilities: [
      { en: "Enterprise collaboration", fr: "Collaboration d'entreprise" },
      { en: "Telephony", fr: "Téléphonie" },
      { en: "Data sovereignty", fr: "Souveraineté des données" },
    ],
  },
  {
    id: "observability",
    icon: "activity",
    title: { en: "Asset management, monitoring & observability", fr: "Gestion des actifs, supervision & observabilité" },
    summary: {
      en: "Unified visibility across networks, infrastructure and services — with ITSM, ITAM and performance management built in.",
      fr: "Une visibilité unifiée sur les réseaux, l'infrastructure et les services — avec ITSM, ITAM et gestion des performances.",
    },
    capabilities: [
      { en: "Unified observability", fr: "Observabilité unifiée" },
      { en: "ITSM & ITAM", fr: "ITSM & ITAM" },
      { en: "Hybrid infrastructure monitoring", fr: "Supervision hybride" },
      { en: "Network performance", fr: "Performance réseau" },
      { en: "Compliance management", fr: "Gestion de la conformité" },
    ],
  },
  {
    id: "ai-bi",
    icon: "brain-circuit",
    title: { en: "AI & business intelligence", fr: "IA & business intelligence" },
    summary: {
      en: "Turn data into decisions with AI analytics, low-code platforms and intelligent video and footfall analytics.",
      fr: "Transformez les données en décisions avec l'analytique IA, les plateformes low-code et l'analyse vidéo intelligente.",
    },
    capabilities: [
      { en: "AI analytics & bespoke development", fr: "Analytique IA & développement sur mesure" },
      { en: "Low code / no code", fr: "Low code / no code" },
      { en: "CCTV & footfall analytics", fr: "Vidéosurveillance & analyse de flux" },
    ],
  },
  {
    id: "data-protection",
    icon: "database-backup",
    title: { en: "Data protection & backup", fr: "Protection des données & sauvegarde" },
    summary: {
      en: "Protect what matters with resilient backup, storage and insider-risk controls that satisfy the strictest mandates.",
      fr: "Protégez l'essentiel avec une sauvegarde résiliente, du stockage et des contrôles des risques internes.",
    },
    capabilities: [
      { en: "Data backup", fr: "Sauvegarde des données" },
      { en: "Storage solutions", fr: "Solutions de stockage" },
      { en: "User activity monitoring", fr: "Surveillance de l'activité" },
      { en: "Data loss prevention", fr: "Prévention des fuites" },
    ],
  },
];

export type Service = {
  id: string;
  title: Bi;
  summary: Bi;
  icon: IconName;
};

export const services: Service[] = [
  {
    id: "incident-response",
    icon: "siren",
    title: { en: "Incident response", fr: "Réponse aux incidents" },
    summary: {
      en: "Rapid containment and recovery when it matters most, guided by certified responders.",
      fr: "Confinement et reprise rapides, guidés par des intervenants certifiés.",
    },
  },
  {
    id: "cyber-forensics",
    icon: "fingerprint",
    title: { en: "Cyber forensics", fr: "Investigation numérique" },
    summary: {
      en: "Deep investigation that establishes root cause, scope and evidence you can act on.",
      fr: "Une investigation approfondie qui établit la cause, l'ampleur et les preuves exploitables.",
    },
  },
  {
    id: "threat-hunting",
    icon: "crosshair",
    title: { en: "Threat hunting", fr: "Chasse aux menaces" },
    summary: {
      en: "Proactive detection of threats that evade automated tooling before they cause impact.",
      fr: "Détection proactive des menaces qui échappent aux outils automatisés.",
    },
  },
  {
    id: "vulnerability-assessment",
    icon: "scan-search",
    title: { en: "Vulnerability assessment", fr: "Évaluation des vulnérabilités" },
    summary: {
      en: "A prioritised roadmap that hardens your infrastructure against emerging risk.",
      fr: "Une feuille de route priorisée qui renforce l'infrastructure face aux risques.",
    },
  },
  {
    id: "deployment",
    icon: "package-open",
    title: { en: "Deployment & implementation", fr: "Déploiement & mise en œuvre" },
    summary: {
      en: "Swift, low-disruption rollouts that get technology delivering value fast.",
      fr: "Des déploiements rapides et sans perturbation qui apportent de la valeur vite.",
    },
  },
  {
    id: "compliance",
    icon: "clipboard-check",
    title: { en: "Compliance management", fr: "Gestion de la conformité" },
    summary: {
      en: "Streamlined adherence to industry standards, minimising risk and operational friction.",
      fr: "Une conformité simplifiée aux normes du secteur, avec moins de risques et de friction.",
    },
  },
  {
    id: "iso",
    icon: "badge-check",
    title: { en: "ISO consultancy", fr: "Conseil ISO" },
    summary: {
      en: "Navigate standards and certification with a partner who has walked the path before.",
      fr: "Naviguez les normes et la certification avec un partenaire expérimenté.",
    },
  },
  {
    id: "audits",
    icon: "file-search",
    title: { en: "Security & IT audits", fr: "Audits sécurité & IT" },
    summary: {
      en: "Meticulous assessment that uncovers gaps and fortifies your defences.",
      fr: "Une évaluation méticuleuse qui révèle les écarts et renforce vos défenses.",
    },
  },
];

export const values: { title: Bi; summary: Bi; icon: IconName }[] = [
  {
    icon: "shield-check",
    title: { en: "Integrity", fr: "Intégrité" },
    summary: {
      en: "We prioritise trust, ethical standards and transparent relationships in all interactions and decisions.",
      fr: "Nous privilégions la confiance, l'éthique et la transparence dans toutes nos interactions.",
    },
  },
  {
    icon: "leaf",
    title: { en: "Responsibility", fr: "Responsabilité" },
    summary: {
      en: "We take ownership of our clients' needs, environmental impact and employee growth with unwavering commitment.",
      fr: "Nous assumons les besoins de nos clients, notre impact environnemental et la croissance de nos équipes.",
    },
  },
  {
    icon: "gem",
    title: { en: "Excellence", fr: "Excellence" },
    summary: {
      en: "We strive for unparalleled quality, setting industry standards and delivering optimal outcomes.",
      fr: "Nous visons une qualité sans équivalent, en établissant les standards du secteur.",
    },
  },
  {
    icon: "users",
    title: { en: "Empowerment", fr: "Autonomisation" },
    summary: {
      en: "We foster personal and professional growth, providing opportunities for our team to excel and lead.",
      fr: "Nous favorisons la croissance personnelle et professionnelle de nos équipes.",
    },
  },
];

export const valueAdd: { title: Bi; summary: Bi; icon: IconName }[] = [
  {
    icon: "shield-check",
    title: { en: "LithePROTECT™ partner program", fr: "Programme partenaire LithePROTECT™" },
    summary: {
      en: "Vendor-independent deal registration, comprehensive training and lucrative incentives.",
      fr: "Enregistrement d'affaires indépendant des éditeurs, formation complète et incitations attractives.",
    },
  },
  {
    icon: "wrench",
    title: { en: "Technical expertise", fr: "Expertise technique" },
    summary: {
      en: "A team with unmatched technical knowledge, solving complex issues and optimising performance.",
      fr: "Une équipe à l'expertise technique reconnue, qui résout les problèmes complexes.",
    },
  },
  {
    icon: "graduation-cap",
    title: { en: "Partner enablement", fr: "Enablement partenaire" },
    summary: {
      en: "Extensive training and marketing support that equips partners with the right skills.",
      fr: "Formation et soutien marketing complets pour doter les partenaires des bonnes compétences.",
    },
  },
  {
    icon: "compass",
    title: { en: "Product & market specialist", fr: "Spécialiste produits & marchés" },
    summary: {
      en: "In-depth insight that keeps partners ahead in rapidly evolving technology markets.",
      fr: "Une vision approfondie qui garde les partenaires en avance sur des marchés en évolution.",
    },
  },
  {
    icon: "headset",
    title: { en: "Presales support", fr: "Support avant-vente" },
    summary: {
      en: "Comprehensive presales assistance so partners make informed decisions.",
      fr: "Une assistance avant-vente complète pour des décisions éclairées.",
    },
  },
];

export type Stage = {
  title: Bi;
  icon: IconName;
  points: Bi[];
};

export const lifecycle: Stage[] = [
  {
    icon: "presentation",
    title: { en: "Pre-sales", fr: "Avant-vente" },
    points: [
      { en: "Technical consultation and needs analysis", fr: "Consultation technique et analyse des besoins" },
      { en: "Solution architecture and BoM development", fr: "Architecture de solution et nomenclature" },
      { en: "Vendor engagement and proof-of-concept support", fr: "Engagement éditeur et support de POC" },
      { en: "Competitive positioning and proposal support", fr: "Positionnement concurrentiel et propositions" },
    ],
  },
  {
    icon: "handshake",
    title: { en: "Sales", fr: "Ventes" },
    points: [
      { en: "Competitive and flexible commercial pricing", fr: "Tarification compétitive et flexible" },
      { en: "Deal registration and margin protection", fr: "Enregistrement d'affaires et protection des marges" },
      { en: "Commercial structuring and financing options", fr: "Structuration commerciale et financement" },
    ],
  },
  {
    icon: "wrench",
    title: { en: "Implementation", fr: "Mise en œuvre" },
    points: [
      { en: "Deployment and integration support", fr: "Support au déploiement et à l'intégration" },
      { en: "Quality assurance and technical testing", fr: "Assurance qualité et tests techniques" },
      { en: "Technical escalation and certified expert access", fr: "Escalade technique et experts certifiés" },
    ],
  },
  {
    icon: "life-buoy",
    title: { en: "Post-sales", fr: "Après-vente" },
    points: [
      { en: "Ongoing Level 2/3 technical support", fr: "Support technique N2/N3 continu" },
      { en: "Training and knowledge transfer", fr: "Formation et transfert de connaissances" },
      { en: "Managed services enablement", fr: "Enablement des services managés" },
      { en: "Product lifecycle and roadmap updates", fr: "Cycle de vie produit et feuilles de route" },
    ],
  },
];

export const comparison: { traditional: Bi; lithe: Bi }[] = [
  {
    traditional: { en: "Product fulfilment only", fr: "Simple fourniture de produits" },
    lithe: { en: "Full lifecycle support: pre-sales → implementation → post-sales", fr: "Support complet : avant-vente → mise en œuvre → après-vente" },
  },
  {
    traditional: { en: "Transactional, order-driven relationships", fr: "Relations transactionnelles centrées sur la commande" },
    lithe: { en: "Strategic, long-term partnership model", fr: "Modèle de partenariat stratégique et durable" },
  },
  {
    traditional: { en: "Minimal post-sale technical support", fr: "Support technique après-vente minimal" },
    lithe: { en: "Dedicated technical and managed services support", fr: "Support technique et services managés dédiés" },
  },
  {
    traditional: { en: "One-size-fits-all product approach", fr: "Approche produit standardisée" },
    lithe: { en: "Tailored to your SI's strengths and customer base", fr: "Adapté aux forces et aux clients de votre intégrateur" },
  },
  {
    traditional: { en: "Limited in-house technical depth", fr: "Profondeur technique interne limitée" },
    lithe: { en: "Certified technical experts across all solution pillars", fr: "Experts certifiés sur tous les piliers de solutions" },
  },
];

export const whyPartner: Bi[] = [
  { en: "Expand your technology portfolio and add value to existing offerings", fr: "Élargissez votre portefeuille technologique et valorisez votre offre" },
  { en: "Access new, innovative technologies and specialised technical expertise", fr: "Accédez à des technologies innovantes et à une expertise spécialisée" },
  { en: "Accelerate project delivery with deployment services and expert support", fr: "Accélérez vos projets grâce aux services de déploiement et d'expertise" },
  { en: "Increase professional services revenue through high-margin engagements", fr: "Augmentez vos revenus de services à forte marge" },
  { en: "Develop managed services offerings for predictable, recurring revenue", fr: "Développez des services managés à revenus récurrents" },
  { en: "Improve customer retention through outcome-driven solutions", fr: "Améliorez la fidélité client grâce à des solutions orientées résultats" },
];

export const whyChoose: { title: Bi; summary: Bi; icon: IconName }[] = [
  {
    icon: "trophy",
    title: { en: "Award-winning distributor", fr: "Distributeur primé" },
    summary: {
      en: "Globally recognised by international technology vendors for our commitment to excellence and continuous growth.",
      fr: "Reconnu mondialement par les éditeurs pour notre engagement envers l'excellence et la croissance.",
    },
  },
  {
    icon: "sparkles",
    title: { en: "Unparalleled technology solutions", fr: "Solutions technologiques sans équivalent" },
    summary: {
      en: "The gateway to top-tier, innovative and disruptive technology — empowering business success with precision.",
      fr: "La porte d'entrée vers des technologies de pointe, innovantes et disruptives.",
    },
  },
  {
    icon: "share-2",
    title: { en: "100% channel-driven distribution", fr: "Distribution 100 % via le canal" },
    summary: {
      en: "We go to market exclusively through our partner network — strengthening partnerships and protecting margins.",
      fr: "Nous allons au marché exclusivement via notre réseau de partenaires.",
    },
  },
];

export const verticals: { title: Bi; icon: IconName }[] = [
  { icon: "landmark", title: { en: "Government", fr: "Gouvernement" } },
  { icon: "hotel", title: { en: "Hospitality", fr: "Hôtellerie" } },
  { icon: "graduation-cap", title: { en: "Education", fr: "Éducation" } },
  { icon: "truck", title: { en: "Logistics", fr: "Logistique" } },
  { icon: "radio-tower", title: { en: "Telecoms", fr: "Télécoms" } },
  { icon: "building", title: { en: "Real estate", fr: "Immobilier" } },
  { icon: "banknote", title: { en: "Banking", fr: "Banque" } },
  { icon: "heart-pulse", title: { en: "Healthcare", fr: "Santé" } },
  { icon: "hard-hat", title: { en: "Construction", fr: "Construction" } },
  { icon: "server", title: { en: "Datacenters", fr: "Datacenters" } },
  { icon: "shopping-bag", title: { en: "Retail", fr: "Commerce" } },
  { icon: "lock", title: { en: "Security", fr: "Sécurité" } },
  { icon: "pickaxe", title: { en: "Mining", fr: "Mines" } },
  { icon: "factory", title: { en: "Manufacturing", fr: "Industrie" } },
  { icon: "network", title: { en: "ISPs", fr: "FAI" } },
];

export const customers: string[] = [
  "Emtel", "MCB", "Sanlam", "Orange", "MauBank", "SICOM Group", "Sunlife",
  "Gamma", "IBL", "DBS", "Seypec", "Ocorian", "AML", "Cargo Handling",
  "Intermart", "Metro Express", "Landscape Mauritius", "QuantiLAB",
  "Lottotech", "Capital", "Credentia", "Odity", "The Hub Karen", "Duty Free",
  "Sika", "Text Book Centre", "La Sentinelle", "DTOS", "Mauri Facilities",
  "State Investment Corporation",
];

export const about = {
  intro: [
    {
      en: "Lithe Solutions Distributor Ltd (Lithe SD) is a Solutions Value-Added Distributor operating in the IOC, Africa and Middle East regions, and a proud member of the Lithe Group of Companies.",
      fr: "Lithe Solutions Distributor Ltd (Lithe SD) est un distributeur à valeur ajoutée de solutions opérant dans la COI, en Afrique et au Moyen-Orient, et membre du Lithe Group of Companies.",
    },
    {
      en: "We go beyond traditional distribution. We partner with System Integrators throughout the entire sales, design, implementation and support lifecycle — ensuring successful, measurable customer outcomes.",
      fr: "Nous allons au-delà de la distribution traditionnelle. Nous accompagnons les intégrateurs sur tout le cycle de vente, de conception, de mise en œuvre et de support.",
    },
    {
      en: "Our expertise spans enterprise infrastructure, private and hybrid cloud, cybersecurity, infrastructure monitoring and observability, and professional services.",
      fr: "Notre expertise couvre l'infrastructure d'entreprise, le cloud privé et hybride, la cybersécurité, la supervision et l'observabilité, ainsi que les services professionnels.",
    },
    {
      en: "With deep regional knowledge and a growing network of over 100 channel partners, Lithe SD has become the trusted distributor of choice for businesses and System Integrators seeking reliable, innovative technology solutions.",
      fr: "Grâce à une connaissance approfondie de la région et à un réseau de plus de 100 partenaires, Lithe SD est devenue le distributeur de confiance des entreprises et des intégrateurs.",
    },
  ],
  vision: {
    en: "We aim to revolutionise the IT solutions distribution landscape by delivering unmatched value to our partners and end-customers. We strive to be the catalyst for digital transformation across the IOC, Africa and Middle East regions.",
    fr: "Nous voulons révolutionner la distribution de solutions IT en apportant une valeur inégalée à nos partenaires et à leurs clients. Nous sommes le catalyseur de la transformation digitale dans la COI, en Afrique et au Moyen-Orient.",
  },
  mission: {
    en: "To be the leading provider of innovative IT solutions, empowering System Integrators and businesses to achieve their strategic objectives through our tailored approach, comprehensive support and unwavering commitment to excellence.",
    fr: "Être le fournisseur de référence de solutions IT innovantes, en aidant les intégrateurs et les entreprises à atteindre leurs objectifs grâce à une approche sur mesure et un support complet.",
  },
  process: {
    en: "A streamlined, partner-centric process ensuring successful delivery of IT solutions — from initial consultation and solution design through to implementation, training and ongoing support.",
    fr: "Un processus simplifié et centré sur le partenaire, de la consultation initiale et la conception à la mise en œuvre, la formation et le support continu.",
  },
};

export const litheProtect: { title: Bi; summary: Bi; icon: IconName }[] = [
  {
    icon: "target",
    title: { en: "Joint business planning", fr: "Planification conjointe" },
    summary: {
      en: "Align strategies and goals with Lithe SD's market insight and expertise for informed decision-making.",
      fr: "Alignez vos stratégies et objectifs sur l'expertise marché de Lithe SD.",
    },
  },
  {
    icon: "shield-check",
    title: { en: "Vendor-independent deal registration", fr: "Enregistrement d'affaires indépendant" },
    summary: {
      en: "Guaranteed vendor-independent deal registration — fairness and equal opportunity for every partner.",
      fr: "Un enregistrement d'affaires indépendant des éditeurs, équitable pour chaque partenaire.",
    },
  },
  {
    icon: "headset",
    title: { en: "Dedicated channel support", fr: "Support canal dédié" },
    summary: {
      en: "Personalised support spanning pre-sales assistance, technical support and marketing collaboration.",
      fr: "Un support personnalisé : avant-vente, technique et collaboration marketing.",
    },
  },
];
