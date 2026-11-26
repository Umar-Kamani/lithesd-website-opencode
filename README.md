# Lithe SD — Marketing Website

A modern, responsive marketing website for **Lithe Solutions Distributor Ltd (Lithe SD)** — a
Solutions Value-Added Distributor operating across the **IOC, East Africa and Middle East**.

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**, using a hybrid
dark/light design language derived from [`docs/DESIGN.md`](docs/DESIGN.md): midnight command-center
bands, a single electric accent, hairline borders and editorial light-weight typography.

---

## Stack

| Area      | Choice                                                       |
| --------- | ------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, React 19)                            |
| Language  | TypeScript                                                   |
| Styling   | Tailwind CSS v4 (`@theme` design tokens)                     |
| CMS       | Payload 3 embedded in the app (`/admin`)                     |
| Database  | Neon Postgres on Vercel (`@payloadcms/db-postgres`)          |
| Storage   | Vercel Blob for media and brochures                          |
| Email     | Nodemailer adapter with SMTP profiles managed in the CMS     |
| Fonts     | Sora + Inter (self-hosted via `next/font`)                   |
| Icons     | lucide-react                                                 |
| Motion    | The Thread canvas hero, scroll reveals, native view transitions |

## Requirements

- **Node.js 20.9+** (developed on Node 22 LTS)

If you use `nvm`:

```bash
nvm install 22 && nvm use 22
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)   |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | ESLint                             |

## Project structure

```
app/
  (frontend)/[locale]/       Public site (English at root, French under /fr)
    page.tsx                 Home
    brands/                  Brand index, brand pages, product pages
    insights/                Blog index, article pages, RSS feed
    case-studies/            Case study index and detail pages
    events/                  Upcoming/past events, registration, calendar invites
    policies/                CMS-managed legal and policy pages
    solutions/ services/ partners/ customers/ resources/ events/ contact/
    template.tsx             Route-level view transition
  (payload)/                 Payload admin and API routes
  api/leads/                 Lead capture endpoint
  api/brochure-download/     Gated brochure delivery
  api/event-registrations/   Event registration endpoint
  api/seed/                  Idempotent catalogue + editorial seed
  globals.css                Design tokens, prose styles, transitions
  sitemap.ts robots.ts       SEO
collections/                 Payload collections (brands, products, editorial, leads)
globals/                     Site settings + email/SMTP settings
components/                  Reusable UI (header, footer, cards, browser, prose)
lib/
  cms.ts                     Catalogue access with static fallback
  cms-content.ts             Case studies, posts, reading time, date formatting
  brands.ts                  24-brand catalogue source data
  seed-content.ts            Sample case studies and blog posts
  site.ts                    Site config, nav, contact, legal links
  content.ts                 Static page content (solutions, pillars, offices)
payload.config.ts            Payload config (DB, storage, i18n, email)
```

## Content management

Everything customer-facing is managed in the CMS at **`/admin`**:

| Group    | Collections                                                    |
| -------- | -------------------------------------------------------------- |
| Catalogue | Brands, Products, Brochures, Videos, Events                   |
| Content   | Case studies, Blog posts, Topics, Policies                     |
| Library   | Media                                                          |
| Events    | Event registrations                                            |
| Leads     | Enquiries and gated downloads                                  |

- **Case studies** and **blog posts** can be attributed to multiple brands and products, a
  pillar, an industry (case studies) and topics. Those relationships drive the related-content
  sections on brand and product pages.
- **Policies** are managed in the CMS and appear in the footer automatically. Add, reorder,
  unpublish or delete them without a deploy.
- **Events** support online registration with an email confirmation and a calendar invite.
  Registrations are collected in the Events admin group and can be exported to CSV.
- Roles: **Admin** (everything), **Editor** (content and leads), **Viewer** (read only).
- Drafts and scheduled publishing are enabled on editorial content.
- The site revalidates every 5 minutes, so publishing appears without a redeploy.
- English is the default locale; French fields can be filled in per document.

### Seeding

The seed endpoint populates the 24 brands, 72 products, site settings and sample editorial
content. It is idempotent and batched:

```bash
curl "https://<host>/api/seed?secret=$SEED_SECRET&offset=0&limit=6"
```

Repeat with increasing `offset` until `next` is `null`. Pass `content=0` to skip editorial
seeding on the first batch. Rotate or remove `SEED_SECRET` before launch.

## Editing static content

- **Brand catalogue source (fallback)** → `lib/brands.ts`
- **Solutions, pillars, offices, static page copy** → `lib/content.ts`
- **Company details, navigation, contact info, legal links** → `lib/site.ts`
- **Colors, type scale, spacing, radii** → the `@theme` block in `app/globals.css`

## Hero loop

The homepage hero is a pre-rendered video (`public/hero/thread-loop.mp4`) with a
poster fallback (`public/hero/thread-poster.jpg`), not a live canvas animation.
Playback pauses off-screen, and reduced-motion visitors see the poster only.

To regenerate the loop (40 fibre strands, 8 seconds, 30 fps):

```bash
npm i --no-save @napi-rs/canvas ffmpeg-static
node scripts/render-hero-loop.mjs
```

## Notes

- **Contact form** is visual-only. Submission shows a friendly message; wire it to a
  service (Formspree, Resend, etc.) in `components/contact-form.tsx` when ready.
- **Legal pages** (Privacy, Terms, Anti-corruption) link to the existing pages on lithesd.com.
- **Vendor logos** are the property of their respective owners and are shown to represent
  distribution relationships. Customer names are rendered as a text wordmark wall.

## Deploy

Deploys as-is to **Vercel** (recommended) or **Netlify**.

- Vercel: import the repo — the framework preset is auto-detected.
- Netlify: use the official Next.js runtime plugin; build `npm run build`.

Update `site.url` in `lib/site.ts` to the production domain before launch so canonical URLs,
`sitemap.xml` and `robots.txt` point to the right place.

## Presentation

`presentation/` contains a 21-slide, 16:9 PowerPoint deck built from the same design
system as the site — available as both `.pptx` (editable) and `.pdf` (share/print).
Rebuild it with:

```bash
cd presentation && npm install && node build-deck.mjs
```

See [`presentation/README.md`](presentation/README.md) for the slide outline and how to
edit content.
