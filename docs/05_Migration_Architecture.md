# Migration Architecture — EnRouteAR → Next.js 16 + Tailwind CSS v4

> **Date:** February 2026

---

## 1. Technology Stack

| Technology         | Version    | Purpose |
| ------------------ | ---------- | ------- |
| **Next.js**        | 16 (LTS)   | React framework with App Router, SSR, RSC, Turbopack |
| **React**          | 19         | UI component library |
| **Tailwind CSS**   | 4.x        | Utility-first CSS framework (CSS-first config) |
| **TypeScript**     | 5.x        | Type safety |
| **Mapbox GL JS**   | 3.x (npm)  | Interactive maps |
| **A-Frame**        | Latest     | WebXR / AR rendering (client-only) |
| **AR.js**          | Latest     | GPS-based AR components |
| **Vercel**         | —          | Deployment platform |

---

## 2. Migration Rationale

### Why Next.js 16?
1. **App Router** — File-based routing with layouts, loading states, and error boundaries.
2. **Server Components** — Static content (hero, college info, vision) rendered on the server for faster initial load.
3. **Client Components** — AR scene and Mapbox map loaded only client-side with `"use client"`.
4. **Dynamic Imports** — `next/dynamic` with `ssr: false` for A-Frame/AR.js (browser-only APIs).
5. **API Routes** — Built-in API routes for future backend features (auth, route saving).
6. **Image Optimization** — `next/image` for automatic WebP conversion and responsive sizing.
7. **Turbopack** — Default bundler for fast dev and production builds.
8. **Metadata API** — Built-in SEO metadata management per route.

### Why Tailwind CSS v4?
1. **CSS-first configuration** — No `tailwind.config.js` needed; configure via CSS `@theme`.
2. **Faster builds** — 5× faster full builds, 100× faster incremental.
3. **Modern CSS** — Uses cascade layers, `color-mix()`, registered custom properties.
4. **Design tokens** — Easy to define project-specific colors and spacing.

---

## 3. Proposed Folder Structure

```
web/
├── public/                         # Static assets
│   ├── favicon/                    # Favicons & PWA manifest
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   ├── logos/                      # Brand logos (SVG + PNG)
│   │   ├── logo-transparent-svg.svg
│   │   └── logo-transparent-png.png
│   ├── models/                     # 3D models & marker icons
│   │   ├── map_pointer_3d_icon.glb
│   │   ├── bearing.png
│   │   ├── centered.png
│   │   ├── compass.png
│   │   ├── current.png
│   │   ├── recenter.png
│   │   └── reset-all.png
│   └── og-image.png                # Open Graph image for social sharing
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                # Landing page (/)
│   │   ├── globals.css             # Tailwind CSS imports & theme
│   │   ├── navigation/
│   │   │   └── page.tsx            # AR navigation page (/navigation)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # Contact form API endpoint
│   │
│   ├── components/                 # Reusable components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Section.tsx
│   │   ├── landing/                # Landing page components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CollegeInfo.tsx
│   │   │   ├── ProjectVision.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── navigation/             # Navigation page components
│   │   │   ├── DestinationSelector.tsx
│   │   │   ├── ARScene.tsx         # Client-only (dynamic import)
│   │   │   ├── MapView.tsx         # Client-only (dynamic import)
│   │   │   ├── CompassWidget.tsx
│   │   │   └── MultifunctionButton.tsx
│   │   └── ui/                     # Generic UI components
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useGeolocation.ts       # GPS tracking hook
│   │   ├── useDeviceOrientation.ts # Compass heading hook
│   │   └── useMapbox.ts            # Mapbox map management
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── places.ts               # Campus destination data
│   │   ├── directions.ts           # Mapbox Directions API client
│   │   ├── geo-utils.ts            # Haversine distance, intermediary points
│   │   └── constants.ts            # Configuration constants
│   │
│   └── types/                      # TypeScript type definitions
│       └── index.ts                # All shared types and interfaces
│
├── .env.local                      # Environment variables (gitignored)
├── .env.example                    # Example env vars for developers
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── postcss.config.mjs              # PostCSS config for Tailwind v4
├── package.json                    # Project dependencies
└── README.md                       # Project README
```

---

## 4. Component Architecture

### 4.1 Page Components (Server Components by Default)

```
Layout (RootLayout)
├── Header
├── [Page Content]
│   ├── Landing Page (Server Component)
│   │   ├── HeroSection
│   │   ├── CollegeInfo
│   │   ├── ProjectVision
│   │   └── ContactForm (Client Component — form state)
│   │
│   └── Navigation Page (Client Component — browser APIs)
│       ├── DestinationSelector
│       ├── ARScene (dynamic, ssr: false)
│       ├── MapView (dynamic, ssr: false)
│       ├── CompassWidget
│       └── MultifunctionButton
└── Footer
```

### 4.2 Client vs. Server Component Strategy

| Component            | Rendering  | Reason |
| -------------------- | ---------- | ------ |
| Layout, Header, Footer | Server   | Static HTML, no interactivity |
| HeroSection          | Server     | Static content |
| CollegeInfo          | Server     | Static content |
| ProjectVision        | Server     | Static content |
| ContactForm          | Client     | Form state, submission handling |
| DestinationSelector  | Client     | User interaction, state |
| ARScene              | Client     | A-Frame, WebXR (browser-only APIs) |
| MapView              | Client     | Mapbox GL JS (browser-only) |
| CompassWidget        | Client     | DeviceOrientation API |
| MultifunctionButton  | Client     | Stateful UI control |

---

## 5. Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Navigation Page                    │
│                  (Client Component)                 │
│                                                     │
│  State:                                             │
│  ├── userLocation: { lat, lng }                     │
│  ├── selectedDestination: Place | null              │
│  ├── directionsData: DirectionsResponse | null      │
│  ├── isMapCentered: boolean                         │
│  ├── isBearing: boolean                             │
│  └── compassHeading: number                         │
│                                                     │
│  ┌───────────────┐  selectDest  ┌────────────────┐  │
│  │  Destination   │────────────▶│  Mapbox        │  │
│  │  Selector      │             │  Directions    │  │
│  └───────────────┘             │  API           │  │
│                                 └───────┬────────┘  │
│                                         │           │
│                    directionsData       │           │
│                  ┌──────────────────────┘           │
│                  │                                   │
│         ┌────────▼───────┐  ┌────────────────────┐  │
│         │   AR Scene     │  │   Map View         │  │
│         │  (A-Frame)     │  │  (Mapbox GL)       │  │
│         │  - cylinders   │  │  - polyline route  │  │
│         │  - GLB marker  │  │  - markers         │  │
│         └────────────────┘  └────────────────────┘  │
│                                                     │
│  ┌───────────────┐         ┌──────────────────────┐ │
│  │  Compass      │◀────────│  useDeviceOrientation│ │
│  │  Widget       │         └──────────────────────┘ │
│  └───────────────┘                                  │
│                                                     │
│  ┌───────────────┐         ┌──────────────────────┐ │
│  │  Multifunction│◀────────│  Navigation State    │ │
│  │  Button       │         │  Machine             │ │
│  └───────────────┘         └──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 6. Design System — Tailwind CSS v4 Theme

### Color Palette (matching existing design)

| Token            | Hex Value   | Usage |
| ---------------- | ----------- | ----- |
| `--color-navy`   | `#041a2a`   | Primary background |
| `--color-navy-dark` | `#011421` | Header/footer background |
| `--color-navy-mid`  | `#0b3f65` | Form inputs, hover states |
| `--color-navy-card`  | `#172b43` | Card/form backgrounds |
| `--color-gold`   | `#facf0e`   | Headings, accents |
| `--color-blue`   | `#0d94f5`   | Primary buttons, CTA |
| `--color-blue-dark` | `#003576` | Button borders |
| `--color-blue-route` | `#3882f6` | Route polyline, AR markers |
| `--color-sky`    | `#a9d9ff`   | Body text, secondary |
| `--color-sky-light` | `#c4e6ff` | Labels, subtle text |
| `--color-cream`  | `#fff4a3`   | Footer text |

---

## 7. Environment Variables

```env
# .env.local
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoicHJhbmtpdGEi...
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mgegpkeb
NEXT_PUBLIC_APP_URL=https://virtualvanguard.vercel.app
```

---

## 8. Migration Checklist

- [x] Analyze existing codebase
- [x] Document current features and flows
- [x] Design Next.js architecture
- [ ] Initialize Next.js 16 project with Tailwind CSS v4
- [ ] Set up project configuration and environment
- [ ] Migrate static assets to `public/`
- [ ] Create shared layout (Header + Footer)
- [ ] Build landing page with all sections
- [ ] Create contact form with API route
- [ ] Build navigation page with destination selector
- [ ] Integrate Mapbox GL JS as client component
- [ ] Integrate A-Frame/AR.js as dynamic client component
- [ ] Implement geolocation and orientation hooks
- [ ] Build compass and multifunction button
- [ ] Add SEO metadata for all pages
- [ ] Test on mobile devices
- [ ] Deploy to Vercel
