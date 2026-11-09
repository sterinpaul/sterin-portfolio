# Sterin Paul — Portfolio

A personal portfolio built with **Next.js 15 (App Router)**, **React 19**, **Three.js** via **React Three Fiber + drei**, and **Lenis** smooth scrolling.

The design is "Liquid Chrome": an iridescent chrome shape that keeps changing form. It follows you down the page, moving to a new spot in each section. It tilts toward your cursor, and two smaller droplets and a small bead orbit it.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Requirements: Node.js 18.18+ (Node 20 or 22 recommended).

## Editing content

All text comes from your CV and lives in **`data/profile.ts`**:

- `profile`: name, role, tagline, links, about text and stats
- `experience`: jobs (newest first)
- `projects`: project cards. `hue` sets each card's colour.
- `skills` and `education`

Things to update before going live:

1. **Project links.** ProManage, Pulz and BigShopper currently point to your GitHub profile. Replace them with each repository's URL.
2. **`siteUrl`.** Set this to your real domain. It's used for SEO and social share metadata.
3. **Phone number.** It's hidden by default. Set `showPhone: true` if you want it shown.
4. **CV.** `public/Sterin_Paul_CV.pdf` powers the "Download CV" buttons. Replace the file when your CV changes.

## Project structure

```
app/
  layout.tsx        fonts, SEO metadata
  page.tsx          page composition + JSON-LD
  globals.css       all styles (design tokens at the top)
  icon.svg          favicon
components/
  three/ChromeScene.tsx   the WebGL scene (positions per scroll in KEYS)
  three/SceneLoader.tsx   client-only loader for the scene
  sections/*              Hero, About, Work, Experience, Skills, Contact
  Nav, Reveal, ProjectCard, SmoothScroll, LocalTime
data/profile.ts     all content
```

## Customising the look

- **Accent colour:** `--accent` in `app/globals.css`. Also update the `#c8ff4d` ring light in `ChromeScene.tsx` so the reflections match.
- **Chrome motion:** `distort` / `speed` props on `MeshDistortMaterial`.
- **Where the shape travels:** the `KEYS` array in `ChromeScene.tsx` (`p` = scroll progress 0–1).

## Accessibility & performance

- Respects `prefers-reduced-motion`: smooth scroll, distortion and orbits are switched off.
- The 3D canvas is decorative (`aria-hidden`). All content is real HTML text, so it is readable by screen readers and search engines.
- Device pixel ratio is capped at 1.75, and mesh detail is lowered on small screens.
- No external 3D assets or HDR downloads. Reflections come from light-formers.

## Deploy

Push to GitHub, then import the repo on [Vercel](https://vercel.com/new). No configuration is needed.
