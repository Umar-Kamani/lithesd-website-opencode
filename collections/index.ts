import type { Access, CollectionConfig, Field } from "payload";

type Role = "admin" | "editor" | "viewer";
const roleOf = (req: { user?: unknown }): Role | undefined =>
  (req.user as { role?: Role } | null)?.role;

const isAdmin: Access = ({ req }) => roleOf(req) === "admin";
const isEditor: Access = ({ req }) => ["admin", "editor"].includes(roleOf(req) ?? "");
const isViewer: Access = ({ req }) => ["admin", "editor", "viewer"].includes(roleOf(req) ?? "");
const publicRead: Access = () => true;

const contentWrite = {
  create: isEditor,
  update: isEditor,
  delete: isEditor,
} as const;

const seoFields: Field[] = [
  {
    name: "seo",
    type: "group",
    label: "SEO",
    fields: [
      { name: "metaTitle", type: "text", localized: true },
      { name: "metaDescription", type: "textarea", localized: true },
      { name: "ogImage", type: "upload", relationTo: "media" },
    ],
  },
];


export const PILLAR_OPTIONS = [
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Enterprise infrastructure & cloud", value: "infrastructure-cloud" },
  { label: "Business tools", value: "business-tools" },
  { label: "Observability", value: "observability" },
  { label: "AI & business intelligence", value: "ai-bi" },
  { label: "Data protection & backup", value: "data-protection" },
];

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Administration", defaultColumns: ["name", "email", "role"] },
  access: { read: isViewer, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Admin — full access", value: "admin" },
        { label: "Editor — content & leads", value: "editor" },
        { label: "Viewer — read only", value: "viewer" },
      ],
    },
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Library", useAsTitle: "alt" },
  access: { read: publicRead, ...contentWrite },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900 },
      { name: "hero", width: 1800 },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [{ name: "alt", type: "text", label: "Alt text" }],
};

export const Brochures: CollectionConfig = {
  slug: "brochures",
  admin: { group: "Catalogue", useAsTitle: "title", defaultColumns: ["title", "gated", "updatedAt"] },
  access: { read: publicRead, ...contentWrite },
  upload: {
    staticDir: "brochures",
    mimeTypes: ["application/pdf"],
    displayPreview: false,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "brand", type: "relationship", relationTo: "brands" },
    { name: "product", type: "relationship", relationTo: "products" },
    { name: "gated", type: "checkbox", defaultValue: true, label: "Require contact details to download" },
    { name: "description", type: "textarea", localized: true },
  ],
};

export const Brands: CollectionConfig = {
  slug: "brands",
  admin: { group: "Catalogue", useAsTitle: "name", defaultColumns: ["name", "pillar", "featured"] },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "pillar", type: "select", required: true, options: PILLAR_OPTIONS },
    { name: "tagline", type: "text", localized: true },
    { name: "description", type: "textarea", localized: true },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "brochures", type: "relationship", relationTo: "brochures", hasMany: true },
    { name: "videos", type: "relationship", relationTo: "videos", hasMany: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: { group: "Catalogue", useAsTitle: "name", defaultColumns: ["name", "brand", "updatedAt"] },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, index: true },
    { name: "brand", type: "relationship", relationTo: "brands", required: true },
    { name: "category", type: "text", localized: true },
    { name: "summary", type: "textarea", localized: true },
    {
      name: "highlights",
      type: "array",
      localized: true,
      fields: [{ name: "text", type: "text", required: true }],
    },
    { name: "video", type: "relationship", relationTo: "videos" },
    { name: "brochures", type: "relationship", relationTo: "brochures", hasMany: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: { group: "Content", useAsTitle: "title" },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "provider",
      type: "select",
      defaultValue: "youtube",
      options: [
        { label: "YouTube", value: "youtube" },
        { label: "Vimeo", value: "vimeo" },
        { label: "Direct URL", value: "url" },
      ],
    },
    { name: "url", type: "text", required: true },
    { name: "poster", type: "upload", relationTo: "media" },
    { name: "description", type: "textarea", localized: true },
  ],
};

export const Events: CollectionConfig = {
  slug: "events",
  admin: { group: "Content", useAsTitle: "title", defaultColumns: ["title", "date", "type"] },
  versions: { drafts: true },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "date", type: "date", required: true },
    { name: "startAt", type: "date" },
    { name: "endAt", type: "date" },
    { name: "timezone", type: "text", defaultValue: "UTC" },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Participated", value: "participated" },
        { label: "Organised", value: "organised" },
      ],
    },
    {
      name: "format",
      type: "select",
      defaultValue: "in-person",
      options: [
        { label: "In person", value: "in-person" },
        { label: "Virtual", value: "virtual" },
        { label: "Hybrid", value: "hybrid" },
      ],
    },
    { name: "location", type: "text" },
    { name: "venueName", type: "text" },
    { name: "venueAddress", type: "textarea" },
    { name: "virtualUrl", type: "text" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "description", type: "textarea", localized: true },
    { name: "agenda", type: "array", fields: [
      { name: "time", type: "text" },
      { name: "title", type: "text", required: true, localized: true },
      { name: "detail", type: "textarea", localized: true },
    ] },
    { name: "speakers", type: "array", fields: [
      { name: "name", type: "text", required: true },
      { name: "role", type: "text" },
      { name: "photo", type: "upload", relationTo: "media" },
    ] },
    { name: "registrationEnabled", type: "checkbox", defaultValue: true },
    { name: "registrationDeadline", type: "date" },
    { name: "confirmationMessage", type: "textarea", localized: true },
    { name: "video", type: "relationship", relationTo: "videos" },
    {
      name: "images",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    ...seoFields,
  ],
};

export const BannerMessages: CollectionConfig = {
  slug: "banner-messages",
  admin: { group: "Content", useAsTitle: "message", defaultColumns: ["message", "active", "order"] },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "message", type: "text", required: true, localized: true },
    { name: "link", type: "text" },
    { name: "active", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
  ],
};

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    group: "Leads",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "company", "status", "createdAt"],
    description: "Every website enquiry, brochure download and quote request.",
  },
  access: {
    read: isViewer,
    create: () => false, // created only through the validated website endpoint
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text" },
    { name: "phone", type: "text" },
    { name: "region", type: "text" },
    { name: "interest", type: "text" },
    { name: "message", type: "textarea" },
    { name: "source", type: "text", admin: { readOnly: true } },
    { name: "page", type: "text", admin: { readOnly: true } },
    { name: "brochure", type: "relationship", relationTo: "brochures" },
    { name: "consent", type: "checkbox", defaultValue: false },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "notes", type: "textarea" },
    { name: "ip", type: "text", admin: { readOnly: true } },
    { name: "userAgent", type: "text", admin: { readOnly: true } },
  ],
};

export const INDUSTRY_OPTIONS = [
  { label: "Government", value: "government" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Education", value: "education" },
  { label: "Logistics", value: "logistics" },
  { label: "Telecoms", value: "telecoms" },
  { label: "Real estate", value: "real-estate" },
  { label: "Banking", value: "banking" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Construction", value: "construction" },
  { label: "Datacenters", value: "datacenters" },
  { label: "Retail", value: "retail" },
  { label: "Security", value: "security" },
  { label: "Mining", value: "mining" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "ISPs", value: "isps" },
];

export const Topics: CollectionConfig = {
  slug: "topics",
  admin: { group: "Content", useAsTitle: "name", defaultColumns: ["name", "slug"] },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "description", type: "textarea", localized: true },
  ],
};

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case study", plural: "Case studies" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "customerName", "industry", "publishedAt"],
  },
  versions: { drafts: true },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "customerName", type: "text", label: "Customer" },
    { name: "industry", type: "select", options: INDUSTRY_OPTIONS },
    { name: "pillar", type: "select", options: PILLAR_OPTIONS },
    { name: "topics", type: "relationship", relationTo: "topics", hasMany: true },
    { name: "brands", type: "relationship", relationTo: "brands", hasMany: true },
    { name: "products", type: "relationship", relationTo: "products", hasMany: true },
    { name: "publishedAt", type: "date" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "challenge", type: "richText", localized: true },
    { name: "solution", type: "richText", localized: true },
    {
      name: "results",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "value", type: "text", required: true },
      ],
    },
    { name: "quote", type: "textarea", localized: true },
    { name: "quoteAuthor", type: "text" },
    { name: "quoteRole", type: "text" },
    ...seoFields,
  ],
};

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "authorName", "publishedAt", "featured"],
  },
  versions: { drafts: true },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "authorName", type: "text", required: true },
    { name: "authorRole", type: "text" },
    { name: "publishedAt", type: "date" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "pillar", type: "select", options: PILLAR_OPTIONS },
    { name: "topics", type: "relationship", relationTo: "topics", hasMany: true },
    { name: "brands", type: "relationship", relationTo: "brands", hasMany: true },
    { name: "products", type: "relationship", relationTo: "products", hasMany: true },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    ...seoFields,
  ],
};

export const Policies: CollectionConfig = {
  slug: "policies",
  labels: { singular: "Policy", plural: "Policies" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "effectiveDate", "showInFooter"],
    description: "Legal and policy pages. Published policies can appear automatically in the footer.",
  },
  versions: { drafts: true },
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "body", type: "richText", localized: true },
    { name: "effectiveDate", type: "date" },
    {
      name: "category",
      type: "select",
      defaultValue: "other",
      options: [
        { label: "Privacy", value: "privacy" },
        { label: "Terms", value: "terms" },
        { label: "Anti-corruption", value: "anti-corruption" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "order", type: "number", defaultValue: 1 },
    {
      name: "showInFooter",
      type: "checkbox",
      defaultValue: true,
      label: "Show in footer",
      admin: { description: "Uncheck to keep this policy published but hidden from the footer." },
    },
    ...seoFields,
  ],
};

export const EventRegistrations: CollectionConfig = {
  slug: "event-registrations",
  labels: { singular: "Event registration", plural: "Event registrations" },
  admin: {
    group: "Events",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "event", "status", "createdAt"],
    description: "Everyone who registered for an event. Export to CSV from the list view.",
  },
  access: {
    read: isViewer,
    create: () => false,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: "event", type: "relationship", relationTo: "events", required: true },
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, index: true },
    { name: "company", type: "text" },
    { name: "phone", type: "text" },
    { name: "jobTitle", type: "text" },
    { name: "notes", type: "textarea" },
    { name: "consent", type: "checkbox", defaultValue: false },
    {
      name: "status",
      type: "select",
      defaultValue: "registered",
      options: [
        { label: "Registered", value: "registered" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Attended", value: "attended" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    { name: "source", type: "text", admin: { readOnly: true } },
    { name: "ip", type: "text", admin: { readOnly: true } },
    { name: "userAgent", type: "text", admin: { readOnly: true } },
  ],
};

export const collections = [
  Users,
  Media,
  Brands,
  Products,
  Brochures,
  Videos,
  Events,
  EventRegistrations,
  BannerMessages,
  Topics,
  CaseStudies,
  BlogPosts,
  Policies,
  Leads,
];
