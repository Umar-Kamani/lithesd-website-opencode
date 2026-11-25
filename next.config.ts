import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/solutions", destination: "/partners", permanent: true },
      { source: "/fr/solutions", destination: "/fr/partners", permanent: true },
    ];
  },
  images: {
    localPatterns: [{ pathname: "/**" }],
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
  outputFileTracingIncludes: {
    "/api/seed": [
      "./node_modules/drizzle-kit/**/*",
      "./node_modules/drizzle-orm/**/*",
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
