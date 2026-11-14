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
npm run build     # prebuild가 scripts/generate-sitemap.mjs로 public/sitemap.xml을 재생성 (lastmod = git 커밋 날짜)
firebase deploy --only hosting --project prod   # alias in .firebaserc → red-bridge-dev-homepage
npm run indexnow  # 배포 후 실행 — sitemap의 전체 URL을 IndexNow(Bing·Naver)에 제출
```

`firebase.json` serves `out/` (`trailingSlash: true`, no SPA rewrite — unknown URLs return real 404s).

## Architecture

Single-page marketing site for RED BRIDGE DEV (웹/앱/솔루션 외주 개발). Next.js 16 App Router, React 19, Tailwind v4, configured as **static export** (`next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`).

### Page composition

[src/app/page.tsx](src/app/page.tsx) is a single `"use client"` component that stacks section components in order:
`Hero → Services → Portfolio → Process → About(왜 RED BRIDGE) → FAQ → Contact → Footer`, with `Navigation` as an overlay. `scripts/check-landing.mjs`(prebuild) enforces this order and the nav anchors — update `EXPECTED_ORDER` there when reordering. All sections live in [src/components/sections/](src/components/sections/) and are self-contained — each owns its copy (both `ko` and `en` objects inline) and its animation logic. There is no CMS or remote content source.

### i18n + theme

- [src/context/LanguageContext.tsx](src/context/LanguageContext.tsx): `ko`/`en` via `useLanguage()`. Persists to `localStorage.language`, initial value from `navigator.language`. Also exposes a `t(key)` helper with a flat dictionary, but **most sections bypass `t()` and inline their own `content = { ko, en }` object** — keep this pattern when editing copy.
- [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx): `dark`/`light` via `useTheme()`. Persists to `localStorage.theme`, applies `data-theme` on `<html>`. Both providers use `useSyncExternalStore` (server snapshot `dark`/`ko`) so the full page prerenders for SEO; a head inline script applies the stored theme/lang before first paint.

Both providers wrap the app in [src/app/layout.tsx](src/app/layout.tsx). Every section branches UI on `theme === "dark"` with conditional Tailwind classes — no CSS-variable-driven theming beyond `globals.css`.

### Animation / 3D

- Framer Motion drives all section transitions (`useInView` + `motion.div`). Standard pattern: `initial={{opacity:0, y:50}}` + `animate={isInView ? {...} : {}}`.
- The Hero background is a looping video (`public/Cinematic_Tech_Brand_Hero_Video.mp4`) shown only on desktop (≥768px) when the device is not obviously weak (≤2 cores / ≤2GB), `prefers-reduced-motion` is off, and adaptive perf mode is off; otherwise it renders `hero-poster.jpg`. The prerendered HTML always has the poster — the swap happens after hydration.
- Adaptive perf mode: [PerfWatchdog](src/components/ui/PerfWatchdog.tsx) measures FPS **after `load` + a 2s warm-up**, and turns on `data-perf="low"` (removes the video, disables glass blur) only after 3 consecutive sub-42fps seconds; the result sticks for the tab via sessionStorage. Do not measure from first paint — startup jank on ordinary PCs used to trip it and silently replace the video with the poster (2026-11).
- `src/components/three/Bridge3D.tsx` (wireframe bridge) is legacy and no longer rendered.
- The custom cursor was removed (2026-11): hiding the OS cursor and drawing it on the main thread made pointer movement stutter on low-end PCs. Do not reintroduce it. (ESLint rule `react-hooks/set-state-in-effect` is enforced — prefer `useSyncExternalStore` for browser-state reads.)

### Positioning (2026-11)

The site speaks as an **agency** ("한 팀이 기획부터 운영까지"), never as a solo developer or a résumé. Keep it that way when editing copy:
- No "단독/1인/Solo", commit counts, or "재직 중 담당" framing in visible copy. Enterprise projects are "엔터프라이즈 기술 사례 — 핵심 엔지니어가 수행" with the confidentiality footnote.
- Services, FAQ, metadata and JSON-LD must only claim what the portfolio proves (Next.js/React, FastAPI, Flutter, Supabase/PostgreSQL/MySQL; payments, identity, search, AI). Each service card links to its proof case (`caseSlug`).
- Client names are anonymized unless the client's own product is ours (Vocaro). The wine importer case is anonymized at the client's request (slug `wine-importer`, no domain/brand); the clinic is "정형외과 의원".
- Portfolio order lives in `src/components/portfolio/meta.ts` (client/in-house first, enterprise after). Guides live in `src/components/guides/` (KO only).

### AX page (`/ax/`, 2026-11)

AI 업무 자동화·시스템 연동 service page. Copy lives in `src/components/ax/content.ts` (KO only), layout in `src/app/ax/page.tsx` (server-rendered, with Service/FAQPage/Breadcrumb JSON-LD), client shell + consult button in `src/components/ax/chrome.tsx`. Entry points: nav "AI 자동화", the 6th Services card, the banner under the Services grid, and the footer. Rules for its copy:
- Do not name the speaker as "한 팀" or "개발자 한 명" — keep the voice neutral.
- The cases are **experience gained while employed, not agency contracts**: every case carries the "재직 중 수행 경험" badge. No company names, product names, or launch countries.
- Only the confirmed scope and figures (e.g. 40분 → 3분대). No invented savings rates, guarantees, or features (access control, audit logs, auto-merge/deploy).
- The consult button opens ChannelTalk with the `[AI 업무 자동화 문의]` draft; never ask for passwords, API keys, or personal data in the first contact.

### Contact → ChannelTalk

There is no mail backend (static export). [Contact.tsx](src/components/sections/Contact.tsx) builds the inquiry text and opens ChannelTalk with it pre-filled (`openChannelTalkWithMessage` → `ChannelIO('openChat', undefined, text)`); the visitor presses send. A `mailto:` link is the fallback. `<ChannelTalk />` is mounted **once in the root layout** — do not mount it per page: a client-side route change unmounts the page copy, and the next page's buttons then call a messenger that never re-boots. The plugin only boots on the `redbridgedev.ai.kr` domain (Firebase preview channels won't open it), and it returns 401 to headless user agents — test with a regular Chrome UA. Do not reintroduce third-party form relays (FormSubmit was removed at the owner's request). `src/app/api/contact/route.ts` (nodemailer) is legacy and is **not** part of the static bundle.

### Analytics

GA4 is wired in [src/lib/analytics.ts](src/lib/analytics.ts): set `GA_MEASUREMENT_ID` and the layout loads gtag; `trackEvent()` is a no-op without it. Events: `generate_lead` (form → channel_talk/email), `chat_open`, `cta_click`, `select_content` (portfolio/service case clicks).

### SEO

[src/app/layout.tsx](src/app/layout.tsx) holds Metadata (OG, Twitter, robots), Naver site verification, and inline JSON-LD `Organization` + `Service` schema. Portfolio and guide pages set their own title/description/canonical and JSON-LD. `public/sitemap.xml` is generated at prebuild from the slugs in the two `meta.ts` files. `firebase.json` redirects retired URLs (`/portfolio/goldluckwine/` → `/portfolio/wine-importer/`, `/brief/` → `/guides/project-brief/`). English is a client-side toggle on the same URL (not indexable); guides are Korean only.

### Styling

Tailwind v4 (`@import "tailwindcss"` in [globals.css](src/app/globals.css), config via `@tailwindcss/postcss`). The typeface is **Pretendard Variable** (npm `pretendard`, dynamic-subset CSS imported in layout — only the glyph ranges a page uses are fetched). `body` sets `word-break: keep-all` so Korean wraps by word. Primary brand color is red-500/600/700 throughout.

Design rules: one section header (`SectionHeader`), one card surface (`.glass-panel`, 24px radius; subpage cards 16px), pill buttons (`.btn-primary` / `.btn-secondary`), card titles 20px/700. Decorative children inside `.glass-panel` must carry the `absolute` class (the panel forces `position: relative` on other children). The hero message is the page `h1`; the nav uses light-on-dark colors while it sits over the hero regardless of theme. Subpages (portfolio, guides) share `PortfolioShell`, which renders the site `Footer`.
