/**
 * Lithe SD — Company Presentation generator
 * -----------------------------------------
 * Produces a 16:9 .pptx that shares the website's design system
 * (docs/DESIGN.md): midnight canvas, signal blue, arc-cyan accents,
 * hairline cards, light editorial headings and mono micro-labels.
 *
 * Run:  node build-deck.mjs
 */
import pptxgen from "pptxgenjs";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, "assets");
const ICON_SRC = path.join(__dirname, "node_modules", "lucide-static", "icons");
const ICON_OUT = path.join(ASSETS, "icons");
const LOGO_OUT = path.join(ASSETS, "logos");
const VENDOR_SRC = path.join(__dirname, "..", "public", "vendors");

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
const C = {
  midnight: "00052E",
  deep: "00021C",
  wash: "06105A",
  signal: "0428CB",
  signalDark: "0320A3",
  cyan: "34FCFF",
  halo: "AFB4DB",
  fog: "6B6B83",
  mist: "8185A0",
  silver: "DBDCDF",
  slate: "4F5166",
  paper: "FFFFFF",
  muted: "F5F6F9",
  cardDark: "0A1140",
  lineDark: "1B2757",
};

/* Fonts: Office-standard for portability. Swap to "Inter" / "IBM Plex Mono"
   (free, Google Fonts) for an exact match with the website. */
const F = { light: "Segoe UI Light", body: "Segoe UI", mono: "Consolas" };

const W = 13.333;
const H = 7.5;
const M = 0.9;
const CW = W - M * 2;

const TONES = {
  dark: {
    bg: C.midnight, text: "FFFFFF", sub: C.halo, eyebrow: C.halo,
    eyebrowRule: C.cyan, card: C.cardDark, line: C.lineDark, meta: C.fog,
    grid: "grid-dark.png",
  },
  deep: {
    bg: C.deep, text: "FFFFFF", sub: C.halo, eyebrow: C.halo,
    eyebrowRule: C.cyan, card: "080E38", line: "1B2757", meta: C.fog,
    grid: "grid-dark.png",
  },
  light: {
    bg: C.paper, text: C.midnight, sub: C.slate, eyebrow: C.signal,
    eyebrowRule: C.signal, card: C.paper, line: C.silver, meta: C.mist,
    grid: "grid-light.png",
  },
  muted: {
    bg: C.muted, text: C.midnight, sub: C.slate, eyebrow: C.signal,
    eyebrowRule: C.signal, card: C.paper, line: C.silver, meta: C.mist,
    grid: "grid-light.png",
  },
};

/* ------------------------------------------------------------------ */
/* Asset preparation (icons, logos, imagery)                           */
/* ------------------------------------------------------------------ */
const ICON_NAMES = [
  "shield-check", "server", "briefcase", "activity", "brain-circuit",
  "database-backup", "siren", "fingerprint", "crosshair", "scan-search",
  "package-open", "clipboard-check", "badge-check", "file-search", "leaf",
  "gem", "users", "wrench", "graduation-cap", "compass", "headset",
  "presentation", "handshake", "life-buoy", "flask-conical", "rocket",
  "trophy", "sparkles", "share-2", "landmark", "hotel", "truck", "radio-tower",
  "building-2", "banknote", "heart-pulse", "hard-hat", "shopping-bag", "lock",
  "pickaxe", "factory", "network", "mail", "phone", "map-pin", "clock", "globe",
  "database", "target", "trending-up",
];
const ICON_COLORS = {
  blue: "#0428CB",
  cyan: "#34FCFF",
  white: "#FFFFFF",
  halo: "#AFB4DB",
  fog: "#6B6B83",
  slate: "#4F5166",
};

const iconPath = (name, colorKey = "blue") =>
  path.join(ICON_OUT, `${name}-${colorKey}.png`);

async function prepareIcons() {
  fs.mkdirSync(ICON_OUT, { recursive: true });
  const jobs = [];
  for (const name of ICON_NAMES) {
    const srcFile = path.join(ICON_SRC, `${name}.svg`);
    if (!fs.existsSync(srcFile)) {
      console.warn(`  ! missing icon: ${name}`);
      continue;
    }
    const raw = fs.readFileSync(srcFile, "utf8");
    for (const [key, hex] of Object.entries(ICON_COLORS)) {
      const svg = raw
        .replaceAll("currentColor", hex)
        .replace('width="24"', 'width="192"')
        .replace('height="24"', 'height="192"');
      jobs.push(
        sharp(Buffer.from(svg), { density: 384 })
          .png()
          .toFile(iconPath(name, key)),
      );
    }
  }
  await Promise.all(jobs);
  console.log(`  · ${ICON_NAMES.length} icons × ${Object.keys(ICON_COLORS).length} colors`);
}

const VENDOR_FILES = [
  ["Sangfor", "sangfor.png"], ["Arcon", "arcon.png"],
  ["WatchGuard", "watchguard.png"], ["Seceon", "seceon.png"],
  ["MonitorApp", "monitorapp.png"], ["KIOXIA", "kioxia.svg"],
  ["Western Digital", "western-digital.svg"], ["Fusion", "fusion.svg"],
  ["QSAN", "qsan.png"], ["Samsung", "samsung.png"], ["Sangoma", "sangoma.png"],
  ["IceWarp", "icewarp.png"], ["Motadata", "motadata.png"],
  ["Scalefusion", "scalefusion.svg"], ["Trassir", "trassir.png"],
  ["vCount", "vcount.png"], ["Updapt", "updapt.png"], ["Keepit", "keepit.png"],
  ["Teramind", "teramind.png"], ["Backup Everything", "backup-everything.png"],
];

const logoPath = (file) =>
  path.join(LOGO_OUT, file.replace(/\.(svg|png|jpe?g)$/i, ".png"));

async function prepareLogos() {
  fs.mkdirSync(LOGO_OUT, { recursive: true });
  await Promise.all(
    VENDOR_FILES.map(async ([, file]) => {
      const out = logoPath(file);
      if (fs.existsSync(out)) return;
      await sharp(path.join(VENDOR_SRC, file), { density: 300 })
        .flatten({ background: "#ffffff" })
        .trim({ threshold: 12 })
        .resize({ width: 420, height: 220, fit: "inside", withoutEnlargement: false })
        .png()
        .toFile(out);
    }),
  );
  console.log(`  · ${VENDOR_FILES.length} vendor logos`);
}

async function prepareImagery() {
  // Cropped sphere for the title / closing slides, with a radial alpha
  // vignette so it blends seamlessly into the dark background.
  const sphere = path.join(ASSETS, "sphere.png");
  const SIZE = 1100;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
      <defs>
        <radialGradient id="m">
          <stop offset="52%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="82%" stop-color="#fff" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#m)"/>
    </svg>`,
  );
  const cropped = await sharp(path.join(ASSETS, "hero-clean.png"))
    .extract({ left: 980, top: 270, width: 1200, height: 1200 })
    .resize(SIZE, SIZE)
    .ensureAlpha()
    .png()
    .toBuffer();
  await sharp(cropped)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(sphere);
  console.log("  · imagery ready");
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */
const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: W, height: H });
pptx.layout = "WIDE";
pptx.author = "Lithe Solutions Distributor Ltd";
pptx.company = "Lithe SD";
pptx.title = "Lithe SD — Company Presentation";
pptx.subject = "Solutions Value-Added Distributor · IOC · East Africa · Middle East";

const T = pptx.ShapeType;

function newSlide(tone = "dark", { grid = true, glow = false, page = null, label = "" } = {}) {
  const t = TONES[tone];
  const s = pptx.addSlide();
  s.background = { color: t.bg };
  if (grid) s.addImage({ path: path.join(ASSETS, t.grid), x: 0, y: 0, w: W, h: H });
  if (glow) {
    s.addImage({
      path: path.join(ASSETS, "glow.png"),
      x: W / 2 - 4.4, y: H / 2 - 4.4, w: 8.8, h: 8.8,
    });
  }
  if (page !== null) chrome(s, tone, page, label);
  return s;
}

function chrome(s, tone, page, label) {
  const t = TONES[tone];
  s.addShape(T.rect, { x: M, y: H - 0.6, w: CW, h: 0.01, fill: { color: t.line } });
  s.addText("LITHE SD — A MORE FLEXIBLE APPROACH", {
    x: M, y: H - 0.54, w: CW * 0.6, h: 0.3, fontFace: F.mono, fontSize: 7.5,
    color: t.meta, charSpacing: 1.4, valign: "top",
  });
  if (label) {
    s.addText(label.toUpperCase(), {
      x: M + CW * 0.6, y: H - 0.54, w: CW * 0.3, h: 0.3, fontFace: F.mono,
      fontSize: 7.5, color: t.meta, charSpacing: 1.4, align: "right", valign: "top",
    });
  }
  s.addText(String(page).padStart(2, "0"), {
    x: W - M - 0.6, y: H - 0.54, w: 0.6, h: 0.3, fontFace: F.mono, fontSize: 7.5,
    color: t.meta, charSpacing: 1.4, align: "right", valign: "top",
  });
}

function eyebrow(s, text, tone, x = M, y = 0.72) {
  const t = TONES[tone];
  s.addShape(T.rect, { x, y: y + 0.13, w: 0.32, h: 0.014, fill: { color: t.eyebrowRule } });
  s.addText(text.toUpperCase(), {
    x: x + 0.44, y, w: CW - 0.44, h: 0.32, fontFace: F.mono, fontSize: 9,
    color: t.eyebrow, charSpacing: 2.2, valign: "middle",
  });
}

function heading(s, text, tone, { x = M, y = 1.12, w = CW, size = 27, h = 0.95 } = {}) {
  s.addText(text, {
    x, y, w, h, fontFace: F.light, fontSize: size, color: TONES[tone].text,
    valign: "top", lineSpacingMultiple: 1.05,
  });
}

function intro(s, text, tone, { x = M, y = 2.0, w = 8.2, h = 0.9, size = 12.5 } = {}) {
  s.addText(text, {
    x, y, w, h, fontFace: F.body, fontSize: size, color: TONES[tone].sub,
    lineSpacingMultiple: 1.3, valign: "top",
  });
}

function card(s, tone, { x, y, w, h, radius = 0.06, fill, line }) {
  const t = TONES[tone];
  s.addShape(T.roundRect, {
    x, y, w, h, rectRadius: radius,
    fill: { color: fill ?? t.card },
    line: { color: line ?? t.line, width: 0.75 },
  });
}

function number(s, n, tone, { x, y, w = 1.6, color } = {}) {
  s.addText(n, {
    x, y, w, h: 0.6, fontFace: F.mono, fontSize: 9,
    color: color ?? TONES[tone].meta, charSpacing: 1.6,
  });
}

function statValue(s, value, tone, { x, y, w = 2, size = 27 } = {}) {
  s.addText(value, {
    x, y, w, h: 0.75, fontFace: F.light, fontSize: size,
    color: TONES[tone].text, valign: "middle",
  });
}

function footnote(s, text, tone, y = H - 1.15) {
  s.addText(text, {
    x: M, y, w: CW, h: 0.4, fontFace: F.body, fontSize: 10,
    color: TONES[tone].meta, italic: true, align: "center",
  });
}

/* ================================================================== */
/* SLIDES                                                             */
/* ================================================================== */

function slideTitle() {
  const s = newSlide("dark", { glow: true });
  s.addImage({ path: path.join(ASSETS, "sphere.png"), x: 7.75, y: 1.25, w: 5.2, h: 5.2 });

  s.addImage({
    path: path.join(__dirname, "..", "public", "lithe-logo-white.png"),
    x: M, y: 0.72, w: 1.9, h: 1.0, sizing: { type: "contain", w: 1.9, h: 1.0 },
  });

  s.addShape(T.rect, { x: M, y: 2.55, w: 0.34, h: 0.016, fill: { color: C.cyan } });
  s.addText("SOLUTIONS VALUE-ADDED DISTRIBUTOR", {
    x: M + 0.48, y: 2.4, w: 6.6, h: 0.34, fontFace: F.mono, fontSize: 9.5,
    color: C.halo, charSpacing: 2.4, valign: "middle",
  });

  s.addText("LITHE SD", {
    x: M - 0.06, y: 2.85, w: 7.4, h: 1.5, fontFace: F.light, fontSize: 68,
    color: "FFFFFF", valign: "middle", charSpacing: 1,
  });
  s.addText("A more flexible approach", {
    x: M, y: 4.32, w: 7.2, h: 0.6, fontFace: F.body, fontSize: 21,
    color: C.halo, valign: "middle",
  });
  s.addText("Your strategic growth & enablement partner", {
    x: M, y: 4.92, w: 7.2, h: 0.5, fontFace: F.body, fontSize: 13,
    color: C.fog, valign: "middle",
  });

  s.addShape(T.rect, { x: M, y: 5.72, w: 2.0, h: 0.012, fill: { color: C.lineDark } });
  s.addText("IOC · EAST AFRICA · MIDDLE EAST      ·      100% CHANNEL DRIVEN", {
    x: M, y: 5.9, w: 7.6, h: 0.4, fontFace: F.mono, fontSize: 8.5,
    color: C.fog, charSpacing: 1.6,
  });
  s.addText("A MEMBER OF THE LITHE GROUP OF COMPANIES", {
    x: M, y: 6.32, w: 7.6, h: 0.4, fontFace: F.mono, fontSize: 8.5,
    color: C.mist, charSpacing: 1.6,
  });
}

const AGENDA = [
  ["Who we are", "Distribution, reimagined around the partner"],
  ["By the numbers", "Scale and reach across three regions"],
  ["Our purpose & values", "Vision, mission and the principles we work by"],
  ["The channel reality", "Where Lithe SD makes the difference"],
  ["Our Value ADDition", "Services that grow your business"],
  ["Solution pillars", "Six pillars of enterprise technology"],
  ["Professional services", "Certified expertise on demand"],
  ["Why Lithe SD", "Partnership model, lifecycle and ecosystem"],
];

function slideAgenda(page) {
  const s = newSlide("light", { page, label: "Agenda" });
  eyebrow(s, "Contents", "light");
  heading(s, "What we'll cover", "light", { size: 30 });

  const colW = CW / 2 - 0.25;
  AGENDA.forEach(([title, sub], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (colW + 0.5);
    const y = 2.25 + row * 1.12;
    s.addText(String(i + 1).padStart(2, "0"), {
      x, y, w: 0.5, h: 0.5, fontFace: F.mono, fontSize: 11, color: C.signal,
    });
    s.addText(title, {
      x: x + 0.6, y: y - 0.06, w: colW - 0.6, h: 0.4, fontFace: F.body,
      fontSize: 14.5, color: C.midnight, bold: true,
    });
    s.addText(sub, {
      x: x + 0.6, y: y + 0.3, w: colW - 0.6, h: 0.4, fontFace: F.body,
      fontSize: 10.5, color: C.slate,
    });
  });
}

const ABOUT = [
  "Lithe Solutions Distributor Ltd (Lithe SD) is a Solutions Value-Added Distributor operating in the IOC, Africa and Middle East regions, and a proud member of the Lithe Group of Companies.",
  "We go beyond traditional distribution. We partner with System Integrators throughout the entire sales, design, implementation and support lifecycle — ensuring successful, measurable customer outcomes.",
  "Our expertise spans enterprise infrastructure, private and hybrid cloud, cybersecurity, infrastructure monitoring and observability, and professional services.",
  "With deep regional knowledge and a growing network of over 100 channel partners, Lithe SD has become the trusted distributor of choice for businesses and System Integrators seeking reliable, innovative technology solutions.",
];

function slideAbout(page) {
  const s = newSlide("dark", { page, label: "About" });
  eyebrow(s, "About Lithe SD", "dark");
  heading(s, "Distribution, reimagined around the partner", "dark", { size: 26, w: 9 });

  const colW = 6.7;
  s.addText(ABOUT.slice(0, 3).map((p) => ({ text: p, options: { breakLine: true, paraSpaceAfter: 10 } })), {
    x: M, y: 2.3, w: colW, h: 3.6, fontFace: F.body, fontSize: 11.5,
    color: C.halo, lineSpacingMultiple: 1.3, valign: "top",
  });

  const bx = M + colW + 0.55;
  const bw = CW - colW - 0.55;
  card(s, "dark", { x: bx, y: 2.3, w: bw, h: 3.95 });
  s.addText("AT A GLANCE", {
    x: bx + 0.35, y: 2.55, w: bw - 0.7, h: 0.3, fontFace: F.mono, fontSize: 8.5,
    color: C.cyan, charSpacing: 1.8,
  });
  const facts = [
    ["2014", "Founded"],
    ["3", "Strategic regions"],
    ["100+", "Channel partners"],
    ["20+", "Countries served"],
    ["1,200+", "Customers"],
  ];
  facts.forEach(([v, l], i) => {
    const y = 3.05 + i * 0.64;
    s.addText(v, {
      x: bx + 0.35, y, w: 1.35, h: 0.45, fontFace: F.light, fontSize: 19,
      color: "FFFFFF", valign: "middle",
    });
    s.addText(l.toUpperCase(), {
      x: bx + 1.75, y, w: bw - 2.1, h: 0.45, fontFace: F.mono, fontSize: 8.5,
      color: C.mist, charSpacing: 1.6, valign: "middle",
    });
  });

  s.addText(ABOUT[3], {
    x: M, y: 6.0, w: colW, h: 0.8, fontFace: F.body, fontSize: 11.5,
    color: C.fog, lineSpacingMultiple: 1.3,
  });
}

const STATS = [
  ["2014", "Founded"], ["1,200+", "Customers"], ["100+", "Channel Partners"],
  ["100+", "Projects Executed"], ["20+", "Countries"], ["3", "Strategic Regions"],
];

function slideStats(page) {
  const s = newSlide("deep", { page, label: "By the numbers" });
  eyebrow(s, "By the numbers", "deep");
  heading(s, "Scale that partners can rely on", "deep", { size: 28 });
  intro(s, "Proof of a distributor with the reach, relationships and delivery track record to help you grow.", "deep", { y: 2.0 });

  const gap = 0.2;
  const cw = (CW - gap * 5) / 6;
  STATS.forEach(([v, l], i) => {
    const x = M + i * (cw + gap);
    card(s, "deep", { x, y: 3.05, w: cw, h: 1.9 });
    statValue(s, v, "deep", { x: x + 0.22, y: 3.35, w: cw - 0.3 });
    s.addText(l.toUpperCase(), {
      x: x + 0.28, y: 4.2, w: cw - 0.4, h: 0.6, fontFace: F.mono, fontSize: 8,
      color: C.mist, charSpacing: 1.4, lineSpacingMultiple: 1.15,
    });
  });
}

function slidePurpose(page) {
  const s = newSlide("light", { page, label: "Our purpose" });
  eyebrow(s, "Our purpose", "light");
  heading(s, "Vision, mission and the way we work", "light", { size: 28 });

  const items = [
    ["VISION", "We aim to revolutionise the IT solutions distribution landscape by delivering unmatched value to our partners and end-customers — the catalyst for digital transformation across the IOC, Africa and Middle East."],
    ["MISSION", "To be the leading provider of innovative IT solutions, empowering System Integrators and businesses to achieve their strategic objectives through our tailored approach, comprehensive support and unwavering commitment to excellence."],
    ["OUR PROCESS", "A streamlined, partner-centric process ensuring successful delivery of IT solutions — from initial consultation and solution design through to implementation, training and ongoing support."],
  ];
  const gap = 0.35;
  const cw = (CW - gap * 2) / 3;
  items.forEach(([title, body], i) => {
    const x = M + i * (cw + gap);
    card(s, "light", { x, y: 2.35, w: cw, h: 3.7 });
    s.addShape(T.rect, { x, y: 2.35, w: cw, h: 0.045, fill: { color: C.signal } });
    s.addText(title, {
      x: x + 0.35, y: 2.72, w: cw - 0.7, h: 0.4, fontFace: F.mono, fontSize: 9.5,
      color: C.signal, charSpacing: 2,
    });
    s.addText(body, {
      x: x + 0.35, y: 3.25, w: cw - 0.7, h: 2.6, fontFace: F.body, fontSize: 11,
      color: C.slate, lineSpacingMultiple: 1.35, valign: "top",
    });
  });
}

const VALUES = [
  ["shield-check", "Integrity", "We prioritise trust, ethical standards and transparent relationships in all interactions and decisions."],
  ["leaf", "Responsibility", "We take ownership of our clients' needs, environmental impact and employee growth with unwavering commitment."],
  ["gem", "Excellence", "We strive for unparalleled quality, setting industry standards and delivering optimal outcomes for clients."],
  ["users", "Empowerment", "We foster personal and professional growth, providing opportunities for our team to excel and lead."],
];

function slideValues(page) {
  const s = newSlide("dark", { page, label: "Our values" });
  eyebrow(s, "Our values", "dark");
  heading(s, "The principles behind every partnership", "dark", { size: 27 });
  intro(s, "We are committed to delivering cutting-edge technology solutions that empower businesses to optimise their operations and achieve their strategic objectives.", "dark", { y: 1.95, w: 9 });

  const gap = 0.28;
  const cw = (CW - gap * 3) / 4;
  VALUES.forEach(([icon, title, body], i) => {
    const x = M + i * (cw + gap);
    card(s, "dark", { x, y: 3.0, w: cw, h: 2.7 });
    s.addImage({ path: iconPath(icon, "cyan"), x: x + 0.32, y: 3.32, w: 0.34, h: 0.34 });
    s.addText(title.toUpperCase(), {
      x: x + 0.32, y: 3.85, w: cw - 0.64, h: 0.4, fontFace: F.mono, fontSize: 10,
      color: "FFFFFF", charSpacing: 1.8,
    });
    s.addText(body, {
      x: x + 0.32, y: 4.3, w: cw - 0.64, h: 1.2, fontFace: F.body, fontSize: 10.5,
      color: C.halo, lineSpacingMultiple: 1.3, valign: "top",
    });
  });
}

const PAIN = [
  "Pressure to expand your solution portfolio without proportionally scaling headcount",
  "Difficulty accessing the right technologies at competitive margins",
  "Customers demanding end-to-end project accountability and measurable outcomes",
  "The need to build recurring managed services revenues alongside project work",
  "Complex multi-vendor implementations with tight delivery deadlines",
  "Evolving cybersecurity threats that your customers need solved now",
];

function slideChannelReality(page) {
  const s = newSlide("deep", { page, label: "The channel reality" });
  eyebrow(s, "The channel reality", "deep");
  heading(s, "As a Channel Partner, you are likely navigating", "deep", { size: 26 });

  const gap = 0.3;
  const cw = (CW - gap) / 2;
  PAIN.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (cw + gap);
    const y = 2.35 + row * 0.86;
    card(s, "deep", { x, y, w: cw, h: 0.72 });
    s.addShape(T.diamond, {
      x: x + 0.3, y: y + 0.3, w: 0.13, h: 0.13, fill: { color: C.cyan },
    });
    s.addText(p, {
      x: x + 0.6, y: y + 0.06, w: cw - 0.85, h: 0.6, fontFace: F.body,
      fontSize: 10.5, color: C.halo, valign: "middle", lineSpacingMultiple: 1.15,
    });
  });

  s.addText(
    [
      { text: "THAT IS EXACTLY WHERE ", options: { color: "FFFFFF" } },
      { text: "LITHE SD", options: { color: C.cyan } },
      { text: " COMES IN", options: { color: "FFFFFF" } },
    ],
    {
      x: M, y: 5.25, w: CW, h: 0.9, fontFace: F.light, fontSize: 26,
      align: "center", charSpacing: 1,
    },
  );
}

const VALUE_ADD = [
  ["wrench", "Technical Expertise", "A team with unmatched technical knowledge, solving complex issues and optimising system performance effectively."],
  ["graduation-cap", "Partner Enablement", "Extensive training and marketing support that equips partners with the right skills to serve their customers."],
  ["compass", "Product & Market Specialist", "In-depth insight that keeps partners ahead in rapidly evolving technology markets."],
  ["headset", "Presales Support", "Comprehensive presales assistance so partners make informed decisions and maximise their technology investments."],
];

function slideValueAdd(page) {
  const s = newSlide("light", { page, label: "Value addition" });
  eyebrow(s, "Our Value ADDition", "light");
  heading(s, "Everything a modern System Integrator needs to grow", "light", { size: 26, w: 10 });

  const leftW = 4.35;
  const rightX = M + leftW + 0.4;
  const rightW = CW - leftW - 0.4;

  // Featured LithePROTECT card
  const fy = 2.25, fh = 4.15;
  s.addShape(T.roundRect, {
    x: M, y: fy, w: leftW, h: fh, rectRadius: 0.06,
    fill: { color: C.signal }, line: { color: C.signal, width: 0.75 },
  });
  s.addImage({ path: iconPath("shield-check", "white"), x: M + 0.4, y: fy + 0.42, w: 0.42, h: 0.42 });
  s.addText("LithePROTECT™\nPartner Program", {
    x: M + 0.4, y: fy + 1.05, w: leftW - 0.8, h: 1.0, fontFace: F.light,
    fontSize: 22, color: "FFFFFF", lineSpacingMultiple: 1.05, valign: "top",
  });
  s.addText("Vendor-independent deal registration, comprehensive training and lucrative incentives — empowering partners to win.", {
    x: M + 0.4, y: fy + 2.2, w: leftW - 0.8, h: 1.2, fontFace: F.body,
    fontSize: 11, color: "DCE3FF", lineSpacingMultiple: 1.3, valign: "top",
  });
  s.addText("PARTNER PROGRAM", {
    x: M + 0.4, y: fy + fh - 0.62, w: leftW - 0.8, h: 0.3, fontFace: F.mono,
    fontSize: 8.5, color: "AFC0FF", charSpacing: 1.8,
  });

  // 2×2 cards
  const gap = 0.28;
  const cw = (rightW - gap) / 2;
  const ch = (fh - gap) / 2;
  VALUE_ADD.forEach(([icon, title, body], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = rightX + col * (cw + gap);
    const y = fy + row * (ch + gap);
    card(s, "light", { x, y, w: cw, h: ch });
    s.addImage({ path: iconPath(icon, "blue"), x: x + 0.3, y: y + 0.28, w: 0.32, h: 0.32 });
    s.addText(title, {
      x: x + 0.3, y: y + 0.72, w: cw - 0.6, h: 0.4, fontFace: F.body,
      fontSize: 12.5, color: C.midnight,
    });
    s.addText(body, {
      x: x + 0.3, y: y + 1.12, w: cw - 0.6, h: ch - 1.22, fontFace: F.body,
      fontSize: 9.1, color: C.slate, lineSpacingMultiple: 1.2, valign: "top",
    });
  });
}

const PILLARS = [
  ["shield-check", "Cybersecurity", "Defence-in-depth across identity, network, endpoint and cloud — from prevention through to resilience and recovery.", ["Identity Security", "Operations & Monitoring", "Network, Endpoint & Ransomware Protection", "WAF, ZTNA & API Security", "Cyber Resilience & Recovery"]],
  ["server", "Enterprise Infrastructure & Cloud", "Modern, resilient foundations — hyperconverged compute, private and hybrid cloud, and frictionless multi-cloud integration.", ["Hyperconverged Infrastructure", "High Availability & Disaster Recovery", "Containerisation, SDI & VDI", "Private & Hybrid Cloud", "Multi-Cloud Migration and Integration"]],
  ["briefcase", "Business Tools", "The collaboration, telephony and data-sovereignty platforms that keep distributed teams productive and compliant.", ["Enterprise Collaboration Platforms", "Telephony", "Data Sovereignty"]],
  ["activity", "Asset Management, Monitoring & Observability", "Unified visibility across networks, infrastructure and services — with ITSM, ITAM and performance management built in.", ["Unified Observability Platform", "ITSM & ITAM", "Hybrid Infrastructure Monitoring", "Network Performance Monitoring", "Compliance Management"]],
  ["brain-circuit", "AI & BI", "Turn data into decisions with AI analytics, low-code platforms and intelligent video and footfall analytics.", ["AI Analytics & Bespoke Development", "Low Code / No Code Platforms", "CCTV & Footfall Analytics"]],
  ["database-backup", "Data Protection & Backup", "Protect what matters with resilient backup, storage and insider-risk controls that satisfy the strictest compliance mandates.", ["Data Backup", "Storage Solutions", "User Activity Monitoring", "Data Loss Prevention"]],
];

function slidePillars(page, tone, indices, part) {
  const s = newSlide(tone, { page, label: `Solution pillars ${part}` });
  eyebrow(s, "Solution pillars", tone);
  heading(s, part === 1 ? "A portfolio spanning the modern IT stack" : "Deep capability across every pillar", tone, { size: 26 });
  intro(s, "Each pillar is backed by certified technical experts and a curated ecosystem of industry-leading vendors.", tone, { y: 1.95, w: 9 });

  const gap = 0.32;
  const cw = (CW - gap * 2) / 3;
  indices.forEach((idx, i) => {
    const [icon, title, body, caps] = PILLARS[idx];
    const x = M + i * (cw + gap);
    const y = 2.75;
    const h = 3.75;
    card(s, tone, { x, y, w: cw, h });
    s.addImage({ path: iconPath(icon, tone === "light" || tone === "muted" ? "blue" : "cyan"), x: x + 0.34, y: y + 0.32, w: 0.36, h: 0.36 });
    s.addText(title, {
      x: x + 0.34, y: y + 0.82, w: cw - 0.68, h: 0.72, fontFace: F.light,
      fontSize: 16, color: TONES[tone].text, lineSpacingMultiple: 1.05, valign: "top",
    });
    s.addText(body, {
      x: x + 0.34, y: y + 1.5, w: cw - 0.68, h: 0.78, fontFace: F.body,
      fontSize: 9.4, color: TONES[tone].sub, lineSpacingMultiple: 1.2, valign: "top",
    });
    s.addShape(T.rect, { x: x + 0.34, y: y + 2.26, w: cw - 0.68, h: 0.008, fill: { color: TONES[tone].line } });
    s.addText(
      caps.map((c) => ({ text: c.toUpperCase(), options: { breakLine: true, paraSpaceAfter: 3 } })),
      {
        x: x + 0.34, y: y + 2.38, w: cw - 0.68, h: 1.28, fontFace: F.mono, fontSize: 7.3,
        color: tone === "light" || tone === "muted" ? C.fog : C.mist,
        charSpacing: 0.8, valign: "top", lineSpacingMultiple: 1.15,
      },
    );
  });
}

const SERVICES = [
  ["siren", "Incident Response", "Rapid containment and recovery when it matters most."],
  ["fingerprint", "Cyber Forensics", "Root cause, scope and evidence you can act on."],
  ["crosshair", "Threat Hunting", "Proactive detection of threats that evade tooling."],
  ["scan-search", "Vulnerability Assessment", "A prioritised roadmap that hardens infrastructure."],
  ["package-open", "Deployment & Implementation", "Swift, low-disruption rollouts that deliver value."],
  ["clipboard-check", "Compliance Management", "Streamlined adherence to industry standards."],
  ["badge-check", "ISO Consultancy", "Navigate standards and certification with confidence."],
  ["file-search", "Security & IT Audits", "Meticulous assessment that fortifies defences."],
];

function slideServices(page) {
  const s = newSlide("light", { page, label: "Professional services" });
  eyebrow(s, "Professional services", "light");
  heading(s, "Expertise you can put in front of your customers", "light", { size: 26, w: 10 });
  intro(s, "From assessment and response to deployment, compliance and audit — our services extend what your team can deliver, without adding headcount.", "light", { y: 1.95, w: 9.5 });

  const gap = 0.24;
  const cw = (CW - gap * 3) / 4;
  const ch = 1.72;
  SERVICES.forEach(([icon, title, body], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = M + col * (cw + gap);
    const y = 2.95 + row * (ch + gap);
    card(s, "light", { x, y, w: cw, h: ch });
    s.addShape(T.roundRect, {
      x: x + 0.28, y: y + 0.26, w: 0.52, h: 0.52, rectRadius: 0.05,
      fill: { color: C.muted }, line: { color: C.muted, width: 0 },
    });
    s.addImage({ path: iconPath(icon, "blue"), x: x + 0.41, y: y + 0.39, w: 0.26, h: 0.26 });
    s.addText(title, {
      x: x + 0.28, y: y + 0.88, w: cw - 0.56, h: 0.4, fontFace: F.body,
      fontSize: 11.5, color: C.midnight, lineSpacingMultiple: 1.05,
    });
    s.addText(body, {
      x: x + 0.28, y: y + 1.24, w: cw - 0.56, h: 0.42, fontFace: F.body,
      fontSize: 9, color: C.slate, lineSpacingMultiple: 1.15, valign: "top",
    });
  });
}

const LIFECYCLE = [
  ["presentation", "Pre-Sales", ["Technical consultation and needs analysis", "Solution architecture and BoM development", "Vendor engagement and proof-of-concept support", "Competitive positioning and proposal support"]],
  ["handshake", "Sales", ["Competitive and flexible commercial pricing", "Deal registration and margin protection", "Commercial structuring and financing options"]],
  ["wrench", "Implementation", ["Deployment and integration support", "Quality assurance and technical testing", "Technical escalation and certified expert access"]],
  ["life-buoy", "Post-Sales", ["Ongoing Level 2/3 technical support", "Training and knowledge transfer", "Managed services enablement and practice", "Product lifecycle management and roadmap updates"]],
];

function slideLifecycle(page) {
  const s = newSlide("dark", { page, label: "How we support you" });
  eyebrow(s, "How we support you", "dark");
  heading(s, "With you from first conversation to long-term success", "dark", { size: 26, w: 10 });
  intro(s, "A streamlined, partner-centric process that carries a project through every stage — aligned to your teams and your customers.", "dark", { y: 1.95, w: 9.5 });

  card(s, "dark", { x: M, y: 2.9, w: CW, h: 3.55 });
  const gap = 0.25;
  const cw = (CW - 0.9 - gap * 3) / 4;
  LIFECYCLE.forEach(([icon, title, points], i) => {
    const x = M + 0.45 + i * (cw + gap);
    const y = 3.25;
    s.addText(String(i + 1).padStart(2, "0"), {
      x, y, w: 0.5, h: 0.3, fontFace: F.mono, fontSize: 8.5, color: C.fog, charSpacing: 1.4,
    });
    s.addShape(T.rect, { x: x + 0.5, y: y + 0.14, w: cw - 0.55, h: 0.008, fill: { color: C.lineDark } });
    s.addImage({ path: iconPath(icon, "cyan"), x, y: y + 0.42, w: 0.36, h: 0.36 });
    s.addText(title, {
      x, y: y + 0.9, w: cw, h: 0.4, fontFace: F.light, fontSize: 16, color: "FFFFFF",
    });
    s.addText(
      points.map((p) => ({ text: p, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 5 } })),
      {
        x, y: y + 1.4, w: cw + 0.05, h: 1.6, fontFace: F.body, fontSize: 9.3,
        color: C.halo, lineSpacingMultiple: 1.15, valign: "top",
      },
    );
  });
}

const WHY_PARTNER = [
  "Expand their technology portfolio and add value to existing offerings",
  "Access new, innovative technologies and specialised technical expertise",
  "Accelerate project delivery with deployment services and expert support",
  "Increase professional services revenue through high-margin engagements",
  "Develop managed services offerings for predictable, recurring revenue",
  "Improve customer retention through value-added, outcome-driven solutions",
];

function slideWhyPartner(page) {
  const s = newSlide("light", { page, label: "Why partner" });
  eyebrow(s, "Why partner with Lithe SD", "light");
  heading(s, "We help our partners grow", "light", { size: 28 });
  intro(s, "From portfolio expansion to recurring revenue, everything we do is designed to make your business more capable and more profitable.", "light", { y: 1.95, w: 9.5 });

  const gap = 0.3;
  const cw = (CW - gap) / 2;
  WHY_PARTNER.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (cw + gap);
    const y = 3.0 + row * 1.02;
    card(s, "light", { x, y, w: cw, h: 0.84 });
    s.addShape(T.roundRect, {
      x: x + 0.28, y: y + 0.25, w: 0.34, h: 0.34, rectRadius: 0.04,
      fill: { color: C.signal }, line: { color: C.signal, width: 0 },
    });
    s.addImage({ path: iconPath("shield-check", "white"), x: x + 0.33, y: y + 0.30, w: 0.24, h: 0.24 });
    s.addText(item, {
      x: x + 0.78, y: y + 0.02, w: cw - 1.05, h: 0.8, fontFace: F.body,
      fontSize: 11, color: C.midnight, valign: "middle", lineSpacingMultiple: 1.15,
    });
  });
}

const COMPARISON = [
  ["Product fulfilment only", "Full lifecycle support: Pre-Sales → Implementation → Post-Sales"],
  ["Transactional, order-driven relationships", "Strategic, long-term partnership model"],
  ["Minimal post-sale technical support", "Dedicated technical and managed services support"],
  ["One-size-fits-all product approach", "Tailored to your SI's strengths and customer base"],
  ["Limited in-house technical depth", "Certified technical experts across all solution pillars"],
];

function slideDifference(page) {
  const s = newSlide("muted", { page, label: "The difference" });
  eyebrow(s, "The Lithe SD difference", "muted");
  heading(s, "Traditional distribution, versus a true growth partner", "muted", { size: 26, w: 10 });

  const rows = [
    [
      { text: "Traditional Distributor", options: { fill: { color: C.muted }, color: C.slate, bold: false } },
      { text: "Lithe SD", options: { fill: { color: C.signal }, color: "FFFFFF", bold: false } },
    ],
    ...COMPARISON.map(([a, b]) => [
      { text: a, options: { fill: { color: "FFFFFF" }, color: C.fog } },
      { text: b, options: { fill: { color: "FFFFFF" }, color: C.midnight, bold: true } },
    ]),
  ];

  s.addTable(rows, {
    x: M, y: 2.35, w: CW, colW: [CW / 2, CW / 2],
    rowH: 0.62, fontFace: F.body, fontSize: 11, valign: "middle",
    border: { type: "solid", pt: 0.5, color: C.silver },
    margin: 0.16,
  });

  s.addText("We work closely with partners throughout the full engagement lifecycle — from first sales conversation through to long-term customer success.", {
    x: M, y: 5.9, w: CW, h: 0.6, fontFace: F.body, fontSize: 11, color: C.slate,
    align: "center", italic: true,
  });
}

const VENDOR_GROUPS = [
  ["Cybersecurity", ["Sangfor", "Arcon", "WatchGuard", "Seceon", "MonitorApp"]],
  ["Enterprise Infrastructure & Cloud", ["KIOXIA", "Western Digital", "Fusion", "QSAN", "Samsung"]],
  ["Business Tools", ["Sangoma", "IceWarp"]],
  ["Asset Management, Monitoring & Observability", ["Motadata", "Scalefusion"]],
  ["AI & BI", ["Trassir", "vCount", "Updapt"]],
  ["Data Protection & Backup", ["Keepit", "Teramind", "Backup Everything"]],
];

function slideVendors(page) {
  const s = newSlide("light", { page, label: "Vendor ecosystem" });
  eyebrow(s, "Vendor ecosystem", "light");
  heading(s, "Best-in-class vendors, one trusted distributor", "light", { size: 26 });
  intro(s, "We curate, validate and support a portfolio of innovative and disruptive technologies — so partners can confidently take them to market.", "light", { y: 1.95, w: 10 });

  const fileFor = (name) => VENDOR_FILES.find(([n]) => n === name)?.[1];
  const rowH = 0.64;
  let y = 2.65;
  VENDOR_GROUPS.forEach(([group, names]) => {
    s.addText(group.toUpperCase(), {
      x: M, y, w: 4.0, h: 0.3, fontFace: F.mono, fontSize: 8, color: C.signal,
      charSpacing: 1.2, valign: "middle",
    });
    s.addShape(T.rect, { x: M + 4.1, y: y + 0.15, w: CW - 4.1, h: 0.008, fill: { color: C.silver } });
    names.forEach((name, i) => {
      const cw = 1.44, ch = 0.5, gap = 0.12;
      const x = M + 4.35 + i * (cw + gap);
      const cy = y + 0.04;
      s.addShape(T.roundRect, {
        x, y: cy, w: cw, h: ch, rectRadius: 0.04,
        fill: { color: "FFFFFF" }, line: { color: C.silver, width: 0.5 },
      });
      const file = fileFor(name);
      if (file) {
        s.addImage({
          path: logoPath(file), x: x + 0.12, y: cy + 0.09, w: cw - 0.24, h: ch - 0.18,
          sizing: { type: "contain", w: cw - 0.24, h: ch - 0.18 },
        });
      } else {
        s.addText(name, {
          x, y: cy, w: cw, h: ch, fontFace: F.body, fontSize: 9, color: C.slate,
          align: "center", valign: "middle",
        });
      }
    });
    y += rowH;
  });

  s.addText("Vendor logos are the property of their respective owners and are shown to represent our distribution relationships.", {
    x: M, y: 6.5, w: CW, h: 0.3, fontFace: F.body, fontSize: 8.5, color: C.mist, italic: true,
  });
}

const ONBOARDING = [
  ["shield-check", "Technology Vetting & Strategic Fit", "Ensure the technology aligns with market demands and evaluate the vendor roadmap."],
  ["flask-conical", "Proof of Concept & Technical Validation", "Validate real-world performance and compatibility in region."],
  ["handshake", "Commercial & Partnership Evaluation", "Confirm commercial viability and long-term partner alignment."],
  ["users", "Internal Enablement & Resource Building", "Prepare Lithe SD to sell, deploy and support the solution end-to-end."],
  ["rocket", "Go to Market", "Activate the channel with pricing, enablement and demand generation."],
];

function slideOnboarding(page) {
  const s = newSlide("muted", { page, label: "Vendor onboarding" });
  eyebrow(s, "Vendor onboarding", "muted");
  heading(s, "How technology joins the Lithe SD portfolio", "muted", { size: 26, w: 10 });
  intro(s, "A rigorous, transparent onboarding path that ensures every solution is market-ready, commercially sound and fully supported in region.", "muted", { y: 1.95, w: 10 });

  s.addShape(T.rect, { x: M + 0.3, y: 3.35, w: CW - 0.6, h: 0.008, fill: { color: C.silver } });

  const gap = 0.22;
  const cw = (CW - gap * 4) / 5;
  ONBOARDING.forEach(([icon, title, body], i) => {
    const x = M + i * (cw + gap);
    s.addShape(T.ellipse, {
      x: x, y: 3.05, w: 0.62, h: 0.62, fill: { color: "FFFFFF" },
      line: { color: C.silver, width: 0.75 },
    });
    s.addImage({ path: iconPath(icon, "blue"), x: x + 0.17, y: 3.22, w: 0.28, h: 0.28 });
    s.addText(`STEP ${String(i + 1).padStart(2, "0")}`, {
      x, y: 3.85, w: cw, h: 0.3, fontFace: F.mono, fontSize: 7.5, color: C.mist, charSpacing: 1.2,
    });
    s.addText(title, {
      x, y: 4.15, w: cw, h: 0.85, fontFace: F.body, fontSize: 11.5, color: C.midnight,
      lineSpacingMultiple: 1.1, valign: "top",
    });
    s.addText(body, {
      x, y: 5.0, w: cw, h: 1.0, fontFace: F.body, fontSize: 9, color: C.slate,
      lineSpacingMultiple: 1.2, valign: "top",
    });
  });
}

const VERTICALS = [
  ["landmark", "Government"], ["hotel", "Hospitality"], ["graduation-cap", "Education"],
  ["truck", "Logistics"], ["radio-tower", "Telecoms"], ["building-2", "Real Estate"],
  ["banknote", "Banking"], ["heart-pulse", "Healthcare"], ["hard-hat", "Construction"],
  ["server", "Datacenters"], ["shopping-bag", "Retail"], ["lock", "Security"],
  ["pickaxe", "Mining"], ["factory", "Manufacturing"], ["network", "ISPs"],
];

function slideVerticals(page) {
  const s = newSlide("light", { page, label: "Who we serve" });
  eyebrow(s, "Who we serve", "light");
  heading(s, "Trusted across every major sector", "light", { size: 27 });
  intro(s, "From government and banking to healthcare, telecoms and datacenters — Lithe SD supports the organisations that keep the region running.", "light", { y: 1.95, w: 10 });

  const gap = 0.16;
  const cw = (CW - gap * 4) / 5;
  const ch = 1.12;
  VERTICALS.forEach(([icon, label], i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = M + col * (cw + gap);
    const y = 2.85 + row * (ch + gap);
    card(s, "light", { x, y, w: cw, h: ch });
    s.addImage({ path: iconPath(icon, "blue"), x: x + cw / 2 - 0.18, y: y + 0.26, w: 0.36, h: 0.36 });
    s.addText(label, {
      x, y: y + 0.72, w: cw, h: 0.3, fontFace: F.body, fontSize: 10.5,
      color: C.midnight, align: "center",
    });
  });
}

const CUSTOMERS = [
  "Emtel", "MCB", "Sanlam", "Orange", "MauBank", "SICOM Group", "Sunlife",
  "Gamma", "IBL", "DBS", "Seypec", "Ocorian", "AML", "Cargo Handling",
  "Intermart", "Metro Express", "Landscape Mauritius", "QuantiLAB",
  "Lottotech", "Capital", "Credentia", "Odity", "The Hub Karen", "Duty Free",
  "Sika", "Text Book Centre", "La Sentinelle", "DTOS", "Mauri Facilities",
  "State Investment Corporation",
];

function slideCustomers(page) {
  const s = newSlide("muted", { page, label: "Our customers" });
  eyebrow(s, "Our customers", "muted");
  heading(s, "Organisations we are proud to support", "muted", { size: 27 });
  intro(s, "Over 1,200 customers across the IOC, Africa and Middle East — spanning banking, telecoms, government, healthcare, hospitality and beyond.", "muted", { y: 1.95, w: 10 });

  const cols = 5;
  const gap = 0.16;
  const cw = (CW - gap * (cols - 1)) / cols;
  const ch = 0.52;
  CUSTOMERS.forEach((name, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = M + col * (cw + gap);
    const y = 2.6 + row * 0.62;
    card(s, "muted", { x, y, w: cw, h: ch });
    s.addText(name, {
      x: x + 0.1, y, w: cw - 0.2, h: ch, fontFace: F.body, fontSize: 9.5,
      color: C.slate, align: "center", valign: "middle",
    });
  });
}

const WHY_CHOOSE = [
  ["trophy", "Award-Winning Distributor", "Globally recognised by international technology vendors for our commitment to excellence and continuous growth."],
  ["sparkles", "Unparalleled Technology Solutions", "The gateway to top-tier, innovative and disruptive technology — partnering with industry leaders to empower business success."],
  ["share-2", "100% Channel-Driven Distribution", "We go to market exclusively through our partner network — strengthening partnerships, protecting margins and fostering mutual growth."],
];

function slideWhyChoose(page) {
  const s = newSlide("dark", { page, label: "Why choose us" });
  eyebrow(s, "Why choose us", "dark");
  heading(s, "A partner, not just a supplier", "dark", { size: 28 });
  intro(s, "We differentiate ourselves by working closely with partners throughout the full engagement lifecycle.", "dark", { y: 1.95, w: 9.5 });

  const gap = 0.32;
  const cw = (CW - gap * 2) / 3;
  WHY_CHOOSE.forEach(([icon, title, body], i) => {
    const x = M + i * (cw + gap);
    const y = 2.85;
    card(s, "dark", { x, y, w: cw, h: 3.3 });
    s.addShape(T.roundRect, {
      x: x + 0.34, y: y + 0.36, w: 0.6, h: 0.6, rectRadius: 0.06,
      fill: { color: C.signal }, line: { color: C.signal, width: 0 },
    });
    s.addImage({ path: iconPath(icon, "white"), x: x + 0.5, y: y + 0.52, w: 0.28, h: 0.28 });
    s.addText(title, {
      x: x + 0.34, y: y + 1.2, w: cw - 0.68, h: 0.7, fontFace: F.light,
      fontSize: 17, color: "FFFFFF", lineSpacingMultiple: 1.05, valign: "top",
    });
    s.addText(body, {
      x: x + 0.34, y: y + 1.95, w: cw - 0.68, h: 1.2, fontFace: F.body,
      fontSize: 10.5, color: C.halo, lineSpacingMultiple: 1.3, valign: "top",
    });
  });
}

const OFFICES = [
  ["Mauritius", "IOC Office", "02, Osman Avenue, Quatre Bornes – 72249, Republic of Mauritius", "+230 467 2006"],
  ["Kenya", "East Africa Office", "Suite 3, 20 Westlands Road, Nairobi, Kenya", "+254 727 162 875"],
  ["Dubai", "Middle East Office", "Suite 801-04, Al Serkal Building 2, Port Saeed, Deira, Dubai, UAE", "+971 56 211 7015"],
];

function slideLocations(page) {
  const s = newSlide("light", { page, label: "Locations" });
  eyebrow(s, "Locations", "light");
  heading(s, "IOC · East Africa · Middle East", "light", { size: 28 });
  intro(s, "Local teams, regional reach and support that meets you where you are.", "light", { y: 1.95, w: 9 });

  const gap = 0.35;
  const cw = (CW - gap * 2) / 3;
  OFFICES.forEach(([city, role, address, phone], i) => {
    const x = M + i * (cw + gap);
    const y = 2.75;
    card(s, "light", { x, y, w: cw, h: 2.9 });
    s.addText(city, {
      x: x + 0.34, y: y + 0.3, w: cw - 0.68, h: 0.5, fontFace: F.light,
      fontSize: 20, color: C.midnight,
    });
    s.addText(role.toUpperCase(), {
      x: x + 0.34, y: y + 0.86, w: cw - 0.68, h: 0.3, fontFace: F.mono,
      fontSize: 8, color: C.signal, charSpacing: 1.4,
    });
    s.addShape(T.rect, { x: x + 0.34, y: y + 1.28, w: cw - 0.68, h: 0.008, fill: { color: C.silver } });
    s.addImage({ path: iconPath("map-pin", "blue"), x: x + 0.34, y: y + 1.5, w: 0.22, h: 0.22 });
    s.addText(address, {
      x: x + 0.68, y: y + 1.42, w: cw - 1.0, h: 0.75, fontFace: F.body,
      fontSize: 10, color: C.slate, lineSpacingMultiple: 1.2, valign: "top",
    });
    s.addImage({ path: iconPath("phone", "blue"), x: x + 0.34, y: y + 2.28, w: 0.22, h: 0.22 });
    s.addText(phone, {
      x: x + 0.68, y: y + 2.24, w: cw - 1.0, h: 0.3, fontFace: F.body,
      fontSize: 10, color: C.midnight, valign: "middle",
    });
  });
}

function slideClosing(page) {
  const s = newSlide("dark", { glow: true, page, label: "Contact" });
  s.addImage({ path: path.join(ASSETS, "sphere.png"), x: 7.9, y: 1.35, w: 5.1, h: 5.1 });

  eyebrow(s, "Let's build something together", "dark", M, 1.35);
  s.addText("Ready to expand what your\nbusiness can deliver?", {
    x: M, y: 1.8, w: 7.2, h: 1.7, fontFace: F.light, fontSize: 31,
    color: "FFFFFF", lineSpacingMultiple: 1.05, valign: "top",
  });
  s.addText("Partner with a value-added distributor that invests in your success — from first conversation through to long-term customer outcomes.", {
    x: M, y: 3.5, w: 6.6, h: 0.9, fontFace: F.body, fontSize: 12, color: C.halo,
    lineSpacingMultiple: 1.3, valign: "top",
  });

  const items = [
    ["mail", "info@lithesd.com"],
    ["phone", "+230 467 2006"],
    ["globe", "lithesd.com"],
    ["map-pin", "Quatre Bornes · Nairobi · Dubai"],
  ];
  items.forEach(([icon, text], i) => {
    const y = 4.45 + i * 0.44;
    s.addImage({ path: iconPath(icon, "cyan"), x: M, y: y + 0.05, w: 0.24, h: 0.24 });
    s.addText(text, {
      x: M + 0.42, y, w: 6.0, h: 0.34, fontFace: F.body, fontSize: 11.5,
      color: "FFFFFF", valign: "middle",
    });
  });

  s.addText("IOC · EAST AFRICA · MIDDLE EAST      ·      100% CHANNEL DRIVEN", {
    x: M, y: 6.4, w: 8, h: 0.35, fontFace: F.mono, fontSize: 8.5, color: C.fog,
    charSpacing: 1.6,
  });
}

/* ------------------------------------------------------------------ */
/* Build                                                              */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Preparing assets…");
  await prepareIcons();
  await prepareLogos();
  await prepareImagery();

  console.log("Building slides…");
  slideTitle();
  slideAgenda(2);
  slideAbout(3);
  slideStats(4);
  slidePurpose(5);
  slideValues(6);
  slideChannelReality(7);
  slideValueAdd(8);
  slidePillars(9, "light", [0, 1, 2], 1);
  slidePillars(10, "muted", [3, 4, 5], 2);
  slideServices(11);
  slideLifecycle(12);
  slideWhyPartner(13);
  slideDifference(14);
  slideVendors(15);
  slideOnboarding(16);
  slideVerticals(17);
  slideCustomers(18);
  slideWhyChoose(19);
  slideLocations(20);
  slideClosing(21);

  const out = path.join(__dirname, "Lithe-SD-Company-Presentation.pptx");
  await pptx.writeFile({ fileName: out });
  const size = (fs.statSync(out).size / 1024 / 1024).toFixed(2);
  console.log(`✓ ${path.basename(out)} (${size} MB, 21 slides)`);
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
