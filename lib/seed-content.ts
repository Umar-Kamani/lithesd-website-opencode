import { lexical, type Block } from "./lexical";

/**
 * Editorial sample content, seeded on first run so the case study and insight
 * layouts can be reviewed. Replace or extend through the CMS.
 */

export const topicSeeds = [
  { slug: "ransomware-resilience", en: "Ransomware resilience", fr: "Résilience ransomware" },
  { slug: "network-security", en: "Network security", fr: "Sécurité réseau" },
  { slug: "data-protection", en: "Data protection", fr: "Protection des données" },
  { slug: "infrastructure-modernisation", en: "Infrastructure modernisation", fr: "Modernisation de l'infrastructure" },
  { slug: "digital-workplace", en: "Digital workplace", fr: "Espace de travail numérique" },
  { slug: "hybrid-cloud", en: "Hybrid cloud", fr: "Cloud hybride" },
];

type ProductRef = { brand: string; slug: string };

export type CaseStudySeed = {
  slug: string;
  title: string;
  excerpt: string;
  customerName: string;
  industry: string;
  pillar: string;
  topics: string[];
  brands: string[];
  products: ProductRef[];
  featured: boolean;
  publishedAt: string;
  challenge: Block[];
  solution: Block[];
  results: { label: string; value: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
};

export const caseStudySeeds: CaseStudySeed[] = [
  {
    slug: "banking-group-branch-security-sangfor",
    title: "Banking group hardens 40 branch sites with a single security platform",
    excerpt:
      "A regional banking group standardised branch protection on Sangfor Network Secure and Endpoint Secure, cutting alert noise and closing endpoint gaps across 40 sites.",
    customerName: "Regional banking group",
    industry: "banking",
    pillar: "cybersecurity",
    topics: ["network-security", "ransomware-resilience"],
    brands: ["sangfor"],
    products: [
      { brand: "sangfor", slug: "network-secure" },
      { brand: "sangfor", slug: "endpoint-secure" },
    ],
    featured: true,
    publishedAt: "2026-09-18T09:00:00.000Z",
    challenge: [
      {
        type: "p",
        text: "Each branch ran its own firewall appliance and a mix of consumer-grade endpoint tools. Head office had no consolidated view of lateral traffic, and a single compromised teller workstation could move unchecked into the branch LAN.",
      },
      {
        type: "h2",
        text: "The pressure points",
      },
      {
        type: "ul",
        items: [
          "Inconsistent firewall policy across 40 branches, maintained site by site.",
          "Endpoint coverage estimated at 70%, with no reliable inventory of unmanaged devices.",
          "Security alerts arriving from five consoles, none correlated.",
          "An internal audit deadline requiring demonstrable segmentation.",
        ],
      },
    ],
    solution: [
      {
        type: "p",
        text: "Lithe SD scoped a two-tier design: Network Secure at each branch for perimeter, IPS and application control, and Endpoint Secure for server and workstation protection, both managed from a central console.",
      },
      {
        type: "p",
        text: "Rollout ran in three waves of branch clusters, with a standard policy baseline applied before cut-over. Remote sites were staged and validated by the integrator, then handed back with runbooks for local IT.",
      },
      {
        type: "h3",
        text: "What changed operationally",
      },
      {
        type: "ul",
        items: [
          "One policy template, versioned centrally and pushed to new branches in minutes.",
          "Endpoint and network telemetry correlated in a single queue.",
          "Branch-to-branch lateral movement blocked by default.",
          "Quarterly policy reviews built into the managed service.",
        ],
      },
      {
        type: "p",
        text: "The programme completed ahead of the audit window. The same platform now anchors the group's incident response playbook, with Lithe SD and the integrator providing second-line escalation.",
      },
    ],
    results: [
      { label: "Branch sites standardised", value: "40" },
      { label: "Endpoint coverage", value: "70% → 99%" },
      { label: "Security consoles consolidated", value: "5 → 1" },
      { label: "Audit findings closed", value: "100%" },
    ],
    quote:
      "We stopped managing forty small estates and started running one. The difference in response time was immediate.",
    quoteAuthor: "Head of IT Security",
    quoteRole: "Regional banking group",
  },
  {
    slug: "logistics-operator-consolidates-fujitsu",
    title: "Logistics operator consolidates ageing storage onto PRIMERGY and ETERNUS",
    excerpt:
      "A freight and warehousing operator replaced end-of-life servers and SANs across two data centres with Fujitsu PRIMERGY and ETERNUS, halving rack footprint and restoring a tested recovery path.",
    customerName: "Freight and warehousing operator",
    industry: "logistics",
    pillar: "infrastructure-cloud",
    topics: ["infrastructure-modernisation", "data-protection"],
    brands: ["fujitsu"],
    products: [
      { brand: "fujitsu", slug: "primergy" },
      { brand: "fujitsu", slug: "eternus" },
    ],
    featured: false,
    publishedAt: "2026-08-27T09:00:00.000Z",
    challenge: [
      {
        type: "p",
        text: "Warehouse management, transport planning and finance all depended on hardware that was five generations out of support. Replacement parts came from secondary markets, and the last successful restore test was over two years old.",
      },
      {
        type: "ul",
        items: [
          "Eleven physical servers running mixed hypervisor versions.",
          "Two SANs at 88% capacity with no growth headroom.",
          "Backup window overrunning into peak picking hours.",
          "No documented recovery time objective for the warehouse platform.",
        ],
      },
    ],
    solution: [
      {
        type: "p",
        text: "Working with the incumbent integrator, Lithe SD designed a two-site PRIMERGY cluster with ETERNUS storage and a replicated secondary array. The warehouse platform was migrated first, then transport and finance, using a phased cut-over that avoided peak season.",
      },
      {
        type: "p",
        text: "ETERNUS snapshots now provide hourly recovery points, and the backup window moved entirely outside operating hours. A restore rehearsal was run before decommissioning the legacy estate.",
      },
      {
        type: "h3",
        text: "Design decisions that mattered",
      },
      {
        type: "ul",
        items: [
          "Capacity modelled on 36 months of growth rather than current utilisation.",
          "Storage replication sized to keep a same-day recovery point at the secondary site.",
          "Firmware and driver baselines standardised before migration.",
          "Decommissioning tied to a signed-off restore test, not a migration date.",
        ],
      },
    ],
    results: [
      { label: "Rack units reclaimed", value: "−52%" },
      { label: "Backup window", value: "9h → 3h" },
      { label: "Recovery point objective", value: "1 hour" },
      { label: "Legacy servers retired", value: "11" },
    ],
    quote:
      "The migration was boring, which is exactly what we wanted. Everything cut over on the night it was planned for.",
    quoteAuthor: "Group IT Manager",
    quoteRole: "Freight and warehousing operator",
  },
];

export type PostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  pillar: string;
  topics: string[];
  brands: string[];
  products: ProductRef[];
  featured: boolean;
  publishedAt: string;
  body: Block[];
  tags: string[];
};

export const postSeeds: PostSeed[] = [
  {
    slug: "ransomware-resilience-distributed-branch-networks",
    title: "Ransomware resilience for distributed branch networks",
    excerpt:
      "Branches are where ransomware finds its way in and where recovery is hardest. A practical model for segmentation, endpoint coverage and tested restore paths.",
    authorName: "Lithe SD Security Practice",
    authorRole: "Solution architecture",
    pillar: "cybersecurity",
    topics: ["ransomware-resilience", "network-security"],
    brands: ["sangfor", "watchguard"],
    products: [
      { brand: "sangfor", slug: "network-secure" },
      { brand: "watchguard", slug: "firebox" },
    ],
    featured: true,
    publishedAt: "2026-10-06T09:00:00.000Z",
    body: [
      {
        type: "p",
        text: "Most ransomware incidents in distributed organisations do not begin at head office. They begin at a branch with a flat network, a shared login and an endpoint that nobody has inventoried. By the time the alert reaches a central team, the encryption has already moved.",
      },
      {
        type: "p",
        text: "Resilience is not a product you install. It is a small number of design decisions, applied consistently, and then tested. For branch estates, four of them matter more than the rest.",
      },
      { type: "h2", text: "1. Segment before you detect" },
      {
        type: "p",
        text: "Detection without segmentation gives you visibility into a compromise you cannot contain. Put branch traffic through a policy enforcement point that separates point-of-sale, voice, guest and corporate zones, and deny inter-zone traffic by default.",
      },
      {
        type: "p",
        text: "This is where a next-generation firewall earns its place: not as a checkbox at the perimeter, but as the control that limits blast radius. Appliances such as Sangfor Network Secure and WatchGuard Firebox both support zone-based policy at branch scale, provided the rule set is standardised centrally.",
      },
      { type: "h2", text: "2. Close the endpoint inventory gap" },
      {
        type: "p",
        text: "Every unmanaged device is an unmonitored execution path. The goal is not 100% coverage on paper; it is a live inventory that reconciles what is on the network against what is reporting to the console.",
      },
      {
        type: "ul",
        items: [
          "Discover first, then enforce — blocking unknown devices before you know what they are creates operational incidents.",
          "Treat servers and workstations with the same policy discipline; attackers rarely care about the distinction.",
          "Alert on coverage drop, not just on malware detection. A device that stops reporting is a signal.",
        ],
      },
      { type: "h2", text: "3. Make recovery a rehearsed process" },
      {
        type: "p",
        text: "An untested backup is a hypothesis. Define a recovery time objective per service, then prove it on a schedule with real data and real operators. Keep at least one copy offline or immutable, and make sure the restore path does not depend on the same directory services that an attack will target.",
      },
      {
        type: "quote",
        text: "The organisations that recover fastest are rarely the ones with the most tools. They are the ones that have practised with the tools they already own.",
      },
      { type: "h2", text: "4. Design the first hour" },
      {
        type: "p",
        text: "Write the first hour of an incident down: who isolates a branch, who contacts the service provider, who decides whether to shut down the warehouse platform. Ambiguity in the first hour costs more than any control gap.",
      },
      {
        type: "p",
        text: "Lithe SD works with partners to run this as a structured assessment across the portfolio, then map findings to a phased programme rather than a single product purchase. If you would like to review your branch design, our team can scope it with you.",
      },
    ],
    tags: ["Ransomware", "Branch security", "Segmentation"],
  },
  {
    slug: "choosing-vdi-platform-regulated-teams",
    title: "Choosing a VDI platform for regulated teams",
    excerpt:
      "Virtual desktops are a control decision as much as a performance one. How to compare hypervisor independence, access control and auditability before you commit.",
    authorName: "Lithe SD Digital Workplace Practice",
    authorRole: "Solution architecture",
    pillar: "business-tools",
    topics: ["digital-workplace", "hybrid-cloud"],
    brands: ["accops"],
    products: [
      { brand: "accops", slug: "hyworks" },
      { brand: "accops", slug: "hysecure" },
    ],
    featured: false,
    publishedAt: "2026-09-09T09:00:00.000Z",
    body: [
      {
        type: "p",
        text: "Regulated teams rarely ask for virtual desktops because they want virtual desktops. They ask because they need data to stay in a controlled environment while people work from more places, on more devices, than the old office model assumed.",
      },
      {
        type: "p",
        text: "That framing changes the evaluation. Performance matters, but the decision usually turns on three questions: where the data can live, who can reach it, and what evidence you can produce afterwards.",
      },
      { type: "h2", text: "Hypervisor independence buys you options" },
      {
        type: "p",
        text: "A VDI layer that only runs on one hypervisor locks your infrastructure roadmap to your desktop roadmap. Platforms such as Accops HyWorks run across common hypervisors and public clouds, which matters when a workload later moves for cost or residency reasons.",
      },
      {
        type: "ul",
        items: [
          "Check supported hypervisor versions against your current estate, not the vendor's latest matrix.",
          "Confirm how image updates are published across sites with limited bandwidth.",
          "Ask what the fallback is when the management plane is unavailable.",
        ],
      },
      { type: "h2", text: "Access control is the actual product" },
      {
        type: "p",
        text: "Most breaches of remote work programmes are credential problems, not virtualisation problems. Pair the desktop platform with an access gateway that enforces device posture, contextual policy and strong authentication before a session is brokered.",
      },
      {
        type: "p",
        text: "That is the role of a zero-trust access layer such as Accops HySecure: it sits in front of the desktop estate, so the VDI platform is never directly exposed. The two should be designed together, even if they are purchased separately.",
      },
      { type: "h2", text: "Auditability decides the renewal" },
      {
        type: "p",
        text: "Ask what an auditor will be able to see in twelve months: who accessed which application, from which device, and what data left the session. If the answer requires log reconstruction across three systems, the platform will be hard to defend at renewal.",
      },
      {
        type: "quote",
        text: "Design for the audit conversation, not just the demo. The demo lasts an hour; the audit conversation repeats every year.",
      },
      {
        type: "p",
        text: "We help partners run structured VDI and access assessments against these criteria, including a pilot scope that can be validated with a regulated customer before a wider commitment.",
      },
    ],
    tags: ["VDI", "Zero trust", "Compliance"],
  },
];

export const caseStudyRichText = (seed: CaseStudySeed) => ({
  challenge: lexical(seed.challenge),
  solution: lexical(seed.solution),
});

export const postRichText = (seed: PostSeed) => lexical(seed.body);

export type PolicySeed = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  order: number;
  effectiveDate: string;
};

const policyPlaceholder = (title: string, scope: string) =>
  lexical([
    {
      type: "p",
      text: "This policy is being prepared. The approved text will be published here and will take effect from the date shown above.",
    },
    { type: "h2", text: "Scope" },
    { type: "p", text: scope },
    { type: "h2", text: "Your rights and choices" },
    {
      type: "p",
      text: `${title} sets out how Lithe SD handles personal information and business records, how long it keeps them, and how you can request access, correction or deletion where the law provides for it.`,
    },
    { type: "h2", text: "Contact" },
    {
      type: "p",
      text: "Questions about this policy can be sent to info@lithesd.com. We aim to respond within five working days.",
    },
  ]);

export const policySeeds: (PolicySeed & { body: ReturnType<typeof lexical> })[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Lithe SD collects, uses and protects personal information.",
    category: "privacy",
    order: 1,
    effectiveDate: "2026-01-01T00:00:00.000Z",
    body: policyPlaceholder(
      "This Privacy Policy",
      "This policy applies to personal information collected through the Lithe SD website, enquiries, event registrations, brochure downloads and partner communications.",
    ),
  },
  {
    slug: "terms-condition",
    title: "Terms & Conditions",
    summary: "The terms that govern use of this website and our partner services.",
    category: "terms",
    order: 2,
    effectiveDate: "2026-01-01T00:00:00.000Z",
    body: policyPlaceholder(
      "These Terms & Conditions",
      "These terms apply to your use of the Lithe SD website and to quotations, orders and partner services unless a separate signed agreement applies.",
    ),
  },
  {
    slug: "anti-corruption-and-bribery-policy",
    title: "Anti-corruption & Bribery Policy",
    summary: "Our zero-tolerance position on bribery and corruption.",
    category: "anti-corruption",
    order: 3,
    effectiveDate: "2026-01-01T00:00:00.000Z",
    body: policyPlaceholder(
      "This Anti-corruption & Bribery Policy",
      "This policy applies to all employees, directors, contractors, agents and partners acting on behalf of Lithe Solutions Distributor Ltd in every market we serve.",
    ),
  },
];

export const eventSeed = {
  slug: "security-roundtable-mauritius",
  title: "Security roundtable — Mauritius",
  date: "2026-12-10T09:00:00.000Z",
  startAt: "2026-12-10T09:00:00.000Z",
  endAt: "2026-12-10T12:00:00.000Z",
  timezone: "Indian/Mauritius",
  type: "organised",
  format: "in-person",
  location: "Quatre Bornes, Mauritius",
  venueName: "Lithe SD offices",
  description:
    "A working session for System Integrators on branch security, ransomware resilience and endpoint coverage — with Sangfor and WatchGuard practitioners.",
  agenda: [
    { time: "09:00", title: "Registration and coffee" },
    { time: "09:30", title: "Branch security without the sprawl" },
    { time: "10:30", title: "Ransomware recovery: what actually works" },
    { time: "11:30", title: "Open discussion and next steps" },
  ],
  registrationDeadline: "2026-12-05T17:00:00.000Z",
  confirmationMessage:
    "You are on the list. We will send the venue details and a calendar invite shortly.",
};
