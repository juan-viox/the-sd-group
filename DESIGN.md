# The SD Group · Design System

> Portable design tokens governing the website, Instagram templates, flyers, email signature, and any future subpages. Generated Phase 11 of cinematic-design-studio.

**Vibe archetype:** Editorial Luxury
**Owner:** The SD Group · Sarah De Jesus
**Last updated:** 2026-04-17

---

## 1 · Color Tokens

| Token | Hex | Usage | Proportion |
|---|---|---|---|
| `--ink` | `#141414` | Primary text · hero overlay · footer | 30% |
| `--deep-ink` | `#0A0A0A` | Hero video tint · darkest contexts | 2% |
| `--bone` | `#F5F1EA` | Primary surface · editorial canvas | 60% |
| `--champagne` | `#B59766` | Single accent · rules · CTAs · hover · logo mark | 7% |
| `--champagne-soft` | `#C8AC7F` | Accent hover state | – |
| `--moss` | `#3A4A3F` | Secondary accent · language-toggle inactive · dividers | 3% |
| `--soft-white` | `#FFFFFF` | Card surfaces · text over dark imagery | – |
| `--dim` | `#6B6B6B` | Meta text · timestamps | – |
| `--rule` | `rgba(20,20,20,0.12)` | Hairlines on Bone | – |
| `--rule-on-dark` | `rgba(245,241,234,0.18)` | Hairlines on Ink | – |

**Rules:**
- **One accent, always.** Champagne carries every highlight moment. Do not introduce a second accent.
- **Moss is secondary only.** Use for dividers, botanical moments, inactive-state toggles. Never as a primary CTA color.
- **No pure black.** `#000` is banned — use `--ink` or `--deep-ink`.
- **No purple, blue, or red accents.** Specifically banned: violet gradients, neon blue, corporate realtor blue, KW red.

---

## 2 · Typography

### Families (both Google Fonts)

**Display — Fraunces (variable serif)**
- Source: `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900`
- Weights: 300 / 400 / 500 / 600 / 700
- Italics: yes
- Variation axes: `opsz 9..144`, `SOFT 0..100`
- Used for: headlines, section titles, founder name, editorial callouts

**Body — Geist (neo-grotesque sans)**
- Source: `https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700`
- Weights: 300 / 400 / 500 / 600 / 700
- Used for: body copy, navigation, UI chrome, listing data (tabular nums)

### Scale

| Role | Family | Size | Line | Letter | Weight | Notes |
|---|---|---|---|---|---|---|
| H1 hero | Fraunces | `clamp(56px, 8vw, 120px)` | 1.08 | `-0.02em` | 300 | `opsz 144`, `SOFT 40` |
| H2 section | Fraunces | `clamp(36px, 4.5vw, 64px)` | 1.08 | `-0.02em` | 400 | `opsz 96` |
| H3 subsection | Fraunces | `clamp(24px, 2.2vw, 32px)` | 1.1 | `-0.02em` | 500 | – |
| Body | Geist | 17px | 1.75 | 0 | 400 | – |
| Body lead | Geist | 19–22px | 1.5–1.7 | 0 | 300 | Intro paragraphs |
| Nav | Geist | 14px | 1.2 | 0.08em | 500 | Uppercase |
| Eyebrow | Geist | 11–13px | 1.2 | 0.28em | 500 | Uppercase, Champagne |
| Meta | Geist | 12–13px | 1.4 | 0.1em | 400 | Uppercase |
| Italic callout | Fraunces italic | 19–24px | 1.4 | -0.01em | 300 | Champagne |
| Listing number | Geist tabular | 42–72px | 1 | -0.02em | 400 | Tabular-nums |

**Banned fonts:** Inter · Roboto · Arial · Open Sans · Helvetica · any script font signaling "feminine luxury"

---

## 3 · Spacing

- Section vertical padding: `clamp(96px, 12vw, 160px)` (var: `--section-pad-y`)
- Gutter: `clamp(20px, 4vw, 56px)` (var: `--gutter`)
- Max content width: 1440px (var: `--max`)
- Card padding: 32–48px depending on context
- Tap target minimum: 44px × 44px
- Grid: CSS Grid only — never `calc()` percentage hacks
- Whitespace: macro — never cramped, never dense

---

## 4 · Motion

**Easing tokens:**
- `--ease: cubic-bezier(0.2, 0.8, 0.2, 1)` — spring-physics default
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` — symmetric reversal

**Rules:**
- Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- Never use default ease-in-out or linear.
- Stagger cascades 50–80ms between siblings.
- Scroll-triggered animations via GSAP ScrollTrigger + spring-physics easing.
- Hover states: magnetic lift (2–4px `translateY`), Champagne border-color transition (240ms).
- CTAs: underline slide-in on hover (via `transform: scaleX`).
- Nav: transparent over hero, solid Bone with Ink text after 80px scroll (`.nav.scrolled`).
- Hero: 150vh section height, canvas scrubbed via ScrollTrigger, 121 frames @ 24fps.

---

## 5 · Components

### Logo system
- `#sd-monogram` — SD interlock serif (inline SVG, `currentColor`)
- `#sd-wordmark` — "THE SD GROUP" in Geist 500, 4px letter-spacing
- `#sd-lockup` — monogram + wordmark combination
- Nav size: 44px monogram-only
- Footer size: 64px full lockup
- Favicon: 32×32 monogram in Champagne on Ink

### Buttons
- **Primary:** Champagne outline, 1px, 20px/48px padding, 13px Geist 500 tracked 0.2em uppercase. Hover: fill with Champagne, text to Ink. Transition 400ms with `--ease`.
- **Secondary:** Text-only, Ink color, Champagne underline slide-in on hover.

### Forms
- Input: 1px `--rule` border-bottom only (no box border). 14px Geist 400.
- Focus: Champagne border-bottom, 2px. No outline.
- Submit: primary button style.

### Cards
- Bone background on Bone surface with 1px `--rule` border
- Ink background on Bone surface for hero modules
- Padding 32–48px
- No `border-radius` above 2px — razor edges preferred

### Navigation
- Transparent over hero, `.scrolled` class → Bone background with Ink text + rule border-bottom
- Mobile: full-screen overlay with Ink background, Bone links, Champagne active state

### Language toggle
- Top-right floating pill: `EN · ES`
- Active lang: Ink text on Champagne
- Inactive: Ink text on transparent with Moss separator
- Persists via `localStorage` key `sdg-lang`
- Browser language auto-detect on first visit

---

## 6 · Bilingual

- Every `[data-en]` element has a matching `[data-es]` counterpart
- `<html lang>` swaps live on toggle
- Two URL paths supported: `/` (EN default) and `/?lang=es` or `/es/` (ES canonical)
- hreflang tags in sitemap.xml
- Schema.org `knowsLanguage: ["en", "es"]`
- `og:locale: en_US` + `og:locale:alternate: es_US`

---

## 7 · Design controls (per project variance)

```json
{
  "DESIGN_VARIANCE": 6,
  "MOTION_INTENSITY": 7,
  "VISUAL_DENSITY": 3
}
```

- **DESIGN_VARIANCE 6:** balanced with asymmetric moments (split-scroll, magnetic grid)
- **MOTION_INTENSITY 7:** scroll-triggered cinematic, not cursor-reactive
- **VISUAL_DENSITY 3:** spacious luxury — macro whitespace, never cramped

---

## 8 · Anti-patterns (hard bans)

- ❌ Emojis in UI chrome
- ❌ AI copy verbs: "Elevate" · "Seamless" · "Unleash" · "Cutting-edge"
- ❌ Lorem Ipsum or AI-generated testimonials under real names
- ❌ Stock drone shots of suburban cul-de-sacs
- ❌ Corporate blue + white realtor palette
- ❌ Auto-playing music or voice on page load
- ❌ Search bar as primary hero element
- ❌ Purple/violet gradients, nested translucent cards
- ❌ Red CTA buttons (KW parent-brand collision)
- ❌ Script fonts signaling "feminine luxury"
- ❌ Animated stat counters with no context
- ❌ Carousel-of-everything homepage
- ❌ MLS-iframe grids with inconsistent photo quality
- ❌ `#000` pure black
- ❌ Inter, Roboto, Arial for display

---

## 9 · Token export (JSON)

See `tokens.json` (same directory) for CSS-in-JS, Tailwind, or Figma import.
