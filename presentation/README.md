# Lithe SD — Company Presentation

A 21-slide, 16:9 PowerPoint deck that shares the website's design system
(`../docs/DESIGN.md`): midnight navy canvas, signal blue, arc-cyan accents,
hairline cards, light editorial headings and mono micro-labels.

```
Lithe-SD-Company-Presentation.pptx   ← editable deck (deliverable)
Lithe-SD-Company-Presentation.pdf    ← share/print export
build-deck.mjs                       ← generator
assets/                              ← imagery used by the deck
```

## Rebuild the deck

```bash
cd presentation
npm install
node build-deck.mjs
```

This regenerates `Lithe-SD-Company-Presentation.pptx`. Icons are rendered from
`lucide-static` (the same icon set as the website) and vendor logos are
rasterised from `../public/vendors/` on each run.

## Slide outline

| # | Slide | # | Slide |
|---|-------|---|-------|
| 1 | Title | 12 | How we support you (lifecycle) |
| 2 | Contents | 13 | Why partner with Lithe SD |
| 3 | About Lithe SD | 14 | The Lithe SD difference (comparison) |
| 4 | By the numbers | 15 | Vendor ecosystem |
| 5 | Purpose — vision, mission, process | 16 | Vendor onboarding |
| 6 | Our values | 17 | Customer verticals |
| 7 | The channel reality | 18 | Our customers |
| 8 | Our Value ADDition | 19 | Why choose us |
| 9 | Solution pillars (1/2) | 20 | Locations |
| 10 | Solution pillars (2/2) | 21 | Let's build something together |
| 11 | Professional services | | |

## Fonts

The deck ships with Office-standard fonts for maximum portability:

- Headings: **Segoe UI Light**
- Body: **Segoe UI**
- Micro-labels: **Consolas**

To match the website's typography exactly, install **Inter** and **IBM Plex Mono**
(both free, Google Fonts), then change `F` near the top of `build-deck.mjs`:

```js
const F = { light: "Inter", body: "Inter", mono: "IBM Plex Mono" };
```

## Editing content

All copy lives in named `const` arrays in `build-deck.mjs` — e.g. `STATS`,
`PILLARS`, `SERVICES`, `LIFECYCLE`, `VENDOR_GROUPS`, `CUSTOMERS`, `OFFICES`.
Edit those, then re-run the generator.

## Imagery

`assets/hero.png`, `hero-clean.png`, `hero-banner.png` and `sphere.png` are
captures of the live website (the particle-sphere hero). `grid-*.png` and
`glow.png` are generated overlays. Everything else in `assets/` (icons, logos)
is regenerated on each build and can be ignored in version control.
