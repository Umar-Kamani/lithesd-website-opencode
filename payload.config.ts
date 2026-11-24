import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { collections } from "./collections";
import { globals } from "./globals";
import { litheEmailAdapter } from "./lib/email";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URI;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default buildConfig({
  admin: {
    user: "users",
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · Lithe SD CMS" },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-me",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: databaseUrl
    ? postgresAdapter({
        pool: { connectionString: databaseUrl },
        // For the first production deploy we let Payload create the schema.
        // Switch to migrations once the schema is locked.
        push: true,
      })
    : sqliteAdapter({
        client: { url: process.env.SQLITE_URL || "file:./payload.db" },
        push: true,
      }),
  sharp,
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  email: litheEmailAdapter,
  cors: [siteUrl],
  csrf: [siteUrl],
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true, brochures: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
