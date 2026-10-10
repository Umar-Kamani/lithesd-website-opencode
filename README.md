# Lithe SD — Marketing Website

A modern, responsive marketing website for **Lithe Solutions Distributor Ltd (Lithe SD)** — a
Solutions Value-Added Distributor operating across the **IOC, East Africa and Middle East**.

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**, using a hybrid
dark/light design language derived from [`docs/DESIGN.md`](docs/DESIGN.md): midnight command-center
bands, a single electric accent, hairline borders and editorial light-weight typography.

---

## Stack

| Area      | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19)                   |
| Language  | TypeScript                                          |
| Styling   | Tailwind CSS v4 (`@theme` design tokens)            |
| Fonts     | Inter + IBM Plex Mono (self-hosted via `next/font`) |
| Icons     | lucide-react                                        |
| Motion    | Canvas particle sphere + scroll reveals (CSS/IO)    |

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
app/                     Routes (App Router)
  layout.tsx             Fonts, metadata, header/footer, JSON-LD
  globals.css            Design tokens + base styles
  page.tsx               Home
  about/ solutions/ vendors/ partners/ customers/ contact/
  not-found.tsx          404
  sitemap.ts robots.ts   SEO
  opengraph-image.tsx    Generated social share image
components/               Reusable UI (header, footer, hero, grids, …)
lib/
  site.ts                Site config, nav, contact, legal links
  content.ts             All page content (solutions, vendors, offices, …)
  icons.tsx              Icon name → lucide component map
public/
  vendors/               Vendor logos
  lithe-*.png            Brand assets
docs/                    Source references (design system + company profile)
```

## Editing content

- **Copy, stats, solutions, vendors, offices, customers** → `lib/content.ts`
- **Company details, navigation, contact info, legal links** → `lib/site.ts`
- **Colors, type scale, spacing, radii** → the `@theme` block in `app/globals.css`

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
