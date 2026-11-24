import type { Access, CollectionConfig } from "payload";

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
  access: { read: publicRead, ...contentWrite },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "date", type: "date", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Participated", value: "participated" },
        { label: "Organised", value: "organised" },
      ],
    },
    { name: "location", type: "text" },
    { name: "description", type: "textarea", localized: true },
    { name: "video", type: "relationship", relationTo: "videos" },
    {
      name: "images",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
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

export const collections = [Users, Media, Brands, Products, Brochures, Videos, Events, BannerMessages, Leads];
