import type { GlobalConfig } from "payload";
import { encryptSecret } from "../lib/crypto";

const isAdmin = ({ req }: { req: { user?: unknown } }) =>
  (req.user as { role?: string } | null)?.role === "admin";
const isEditor = ({ req }: { req: { user?: unknown } }) =>
  ["admin", "editor"].includes((req.user as { role?: string } | null)?.role ?? "");

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings" },
  access: { read: () => true, update: isEditor },
  fields: [
    { name: "companyName", type: "text", defaultValue: "Lithe SD" },
    { name: "email", type: "email", defaultValue: "info@lithesd.com" },
    { name: "phone", type: "text", defaultValue: "+230 467 2006" },
    { name: "whatsapp", type: "text", defaultValue: "+230 5919 3131" },
    { name: "hours", type: "text", localized: true },
    {
      name: "offices",
      type: "array",
      fields: [
        { name: "city", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "phone", type: "text" },
        { name: "email", type: "email" },
      ],
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "facebook", type: "text" },
        { name: "whatsapp", type: "text" },
      ],
    },
    {
      name: "legal",
      type: "group",
      fields: [
        { name: "privacy", type: "text" },
        { name: "terms", type: "text" },
        { name: "antiCorruption", type: "text" },
      ],
    },
  ],
};

export const EmailSettings: GlobalConfig = {
  slug: "email-settings",
  label: "Email & SMTP",
  admin: {
    group: "Settings",
    description:
      "Add one or more SMTP servers (IceWarp, Microsoft 365, Google Workspace, SendGrid, etc.). The active profile is used for lead notifications and password resets.",
  },
  access: { read: isAdmin, update: isAdmin },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data?.profiles) return data;
        data.profiles = data.profiles.map((profile: { password?: string }) => {
          if (!profile.password) return profile;
          return { ...profile, password: encryptSecret(profile.password) };
        });
        return data;
      },
    ],
  },
  fields: [
    {
      name: "profiles",
      type: "array",
      labels: { singular: "SMTP server", plural: "SMTP servers" },
      fields: [
        { name: "label", type: "text", required: true, admin: { description: "e.g. IceWarp production" } },
        { name: "host", type: "text", required: true, admin: { description: "SMTP host, e.g. mail.lithesd.com" } },
        { name: "port", type: "number", required: true, defaultValue: 587 },
        {
          name: "secure",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Enable for implicit TLS (usually port 465)." },
        },
        { name: "username", type: "text" },
        {
          name: "password",
          type: "text",
          access: { read: () => false },
          admin: { description: "Stored encrypted. Re-enter to change." },
        },
        { name: "fromName", type: "text", defaultValue: "Lithe SD" },
        { name: "fromEmail", type: "email" },
        { name: "active", type: "checkbox", defaultValue: false, admin: { description: "Use this server for outgoing mail." } },
      ],
    },
    {
      name: "notifyEmails",
      type: "array",
      label: "Lead notification recipients",
      fields: [{ name: "email", type: "email", required: true }],
    },
    { name: "lastTestAt", type: "date", admin: { readOnly: true } },
    { name: "lastTestStatus", type: "text", admin: { readOnly: true } },
  ],
};

export const globals = [SiteSettings, EmailSettings];
