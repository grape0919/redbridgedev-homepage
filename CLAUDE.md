# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Next.js dev server (Turbopack) on http://localhost:3000
npm run build     # Production build + static export to out/
npm run lint      # ESLint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit  # Type check only
```

No test runner is configured.

### Deploy

Firebase Hosting, static-exported site:

```bash
npm run build
firebase deploy --only hosting --project prod   # alias in .firebaserc → red-bridge-dev-homepage
```

`firebase.json` serves `out/` with SPA rewrite (`**` → `/index.html`).

## Architecture

Single-page marketing site for RED BRIDGE DEV (웹/앱/솔루션 외주 개발). Next.js 16 App Router, React 19, Tailwind v4, configured as **static export** (`next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`).

### Page composition

[src/app/page.tsx](src/app/page.tsx) is a single `"use client"` component that stacks section components in order:
`Hero → About → Services → Process → Portfolio → FAQ → Contact → Footer`, with `Navigation`, `CustomCursor`, and `ChannelTalk` as overlays. All sections live in [src/components/sections/](src/components/sections/) and are self-contained — each owns its copy (both `ko` and `en` objects inline) and its animation logic. There is no CMS or remote content source.

### i18n + theme

- [src/context/LanguageContext.tsx](src/context/LanguageContext.tsx): `ko`/`en` via `useLanguage()`. Persists to `localStorage.language`, initial value from `navigator.language`. Also exposes a `t(key)` helper with a flat dictionary, but **most sections bypass `t()` and inline their own `content = { ko, en }` object** — keep this pattern when editing copy.
- [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx): `dark`/`light` via `useTheme()`. Persists to `localStorage.theme`, applies `data-theme` on `<html>`. Provider returns `null` until mounted (lazy init from `typeof window`) to avoid SSR hydration mismatch.

Both providers wrap the app in [src/app/layout.tsx](src/app/layout.tsx). Every section branches UI on `theme === "dark"` with conditional Tailwind classes — no CSS-variable-driven theming beyond `globals.css`.

### Animation / 3D

- Framer Motion drives all section transitions (`useInView` + `motion.div`). Standard pattern: `initial={{opacity:0, y:50}}` + `animate={isInView ? {...} : {}}`.
- [src/components/three/Bridge3D.tsx](src/components/three/Bridge3D.tsx) renders a wireframe bridge in the Hero via `@react-three/fiber`. It is **dynamically imported with `ssr: false`** and Hero gates rendering via `useSyncExternalStore` on `matchMedia("(max-width: 768px)")`, `prefers-reduced-motion`, and `navigator.hardwareConcurrency < 4` — do not render Bridge3D unconditionally.
- [src/components/ui/CustomCursor.tsx](src/components/ui/CustomCursor.tsx) is gated by `matchMedia("(hover: hover)")` via a lazy `useState` initializer (avoid reintroducing `setState`-in-effect — ESLint rule `react-hooks/set-state-in-effect` is enforced).

### Contact form → email

[src/components/sections/Contact.tsx](src/components/sections/Contact.tsx) POSTs to [src/app/api/contact/route.ts](src/app/api/contact/route.ts), which uses `nodemailer` + Gmail SMTP. Env vars: `GMAIL_USER`, `GMAIL_APP_PASSWORD`. Recipient hard-coded to `red.bridge.kim.dev@gmail.com`. The form includes Korean/English translation of `projectType` and `budget` labels before POST.

**Caveat:** the project builds with `output: "export"`, so the `/api/contact` route shows as `ƒ (Dynamic)` in build output but is **not included in the static `out/` bundle**. The Firebase deploy therefore ships a site where the contact form will 404 its endpoint. Any change to Contact form wiring must account for this — either point to an external endpoint, run without export, or add Firebase Functions / another host for the API route.

### SEO

[src/app/layout.tsx](src/app/layout.tsx) holds Metadata (OG, Twitter, robots), Naver site verification, and inline JSON-LD `Organization` + `Service` schema. Language alternates are declared but both `ko-KR` and `en-US` resolve to the same URL (no separate English route exists). `og-image.png`, `apple-touch-icon.png`, `icon.svg`, and the manifest's `icon-192/512` are referenced but **may not exist in `public/`** — verify before claiming SEO/PWA assets are complete.

### Styling

Tailwind v4 (`@import "tailwindcss"` in [globals.css](src/app/globals.css), config via `@tailwindcss/postcss`). Fonts are wired through `next/font/google` in layout (`Geist`, `Geist_Mono`, `Poppins`) and exposed as CSS variables. Primary brand color is red-500/600/700 throughout.
