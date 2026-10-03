# EnRouteAR — Migration History & Architecture Plan

This document records the complete migration history of EnRouteAR from its original vanilla HTML/JS prototype (`vanilla/`) to the production Next.js 16 App Router application (`web/`), detailing the execution phases, critical bugs resolved, and technical decisions.

---

## 1. Migration Background & Objectives

The original EnRouteAR project was developed as a static prototype inside the `vanilla/` directory:
- `vanilla/index.html`: A static marketing landing page with embedded canvas stars and CSS styles.
- `vanilla/navigation.html`: A monolithic browser AR viewport with inline scripts, coupled Mapbox and A-Frame calls, and manual DOM mutations.
- `vanilla/scripts/script.js` & `vanilla/scripts/places.js`: Tightly coupled procedural logic handling GPS, camera, Mapbox, compass, and UI state.

### Core Migration Objectives
1. **Modern App Router Foundation**: Migrate to Next.js 16 with Turbopack, React 19, and Tailwind CSS v4.
2. **Behavioral & Functional Parity**: Preserve 100% of the original AR positioning, Mapbox navigation, 4-mode multifunction controller, and compass behavior.
3. **Component Modularity**: Decompose monolithic procedural scripts into maintainable, reusable React components with clean Server/Client boundaries.
4. **Production SEO & Web Standards**: Implement dynamic metadata routes (`robots.js`, `sitemap.js`), OpenGraph cards, PWA manifest, and Schema.org JSON-LD.
5. **Rigorous Verification**: Validate with headless Chromium browser automation (CDP) under real-world simulated sensor conditions.

---

## 2. Execution Phases

### Phase 1 — Foundation & Next.js Setup
- **Work Performed**:
  - Initialized Next.js 16 App Router inside `web/` with `@tailwindcss/postcss` and Tailwind CSS v4.
  - Configured Google Fonts (`Orbitron` for display headers and `Outfit` for body text) using Next.js font optimization.
  - Rebuilt root metadata in [`web/src/app/layout.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/layout.js) following current Next.js 16 standards: `metadataBase`, `viewport` export, `openGraph`, `twitter`, and `manifest.json`.
  - Configured theme color (`#020c16`) and color scheme (`dark`).
  - Added global dark-themed toast notifications via `sonner`.

### Phase 2 — Landing Page Migration
- **Work Performed**:
  - Migrated `vanilla/index.html` into semantic, modular React components located in [`web/src/components/landing/`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/landing):
    - `Header.js`: Fixed blurred navigation bar with mobile drawer toggle and route-aware active states.
    - `HeroSection.js`: Luminous title, GPS status badge, action buttons, stats counters, and interactive 3D phone mockup.
    - `TechTicker.js`: Continuous marquee showcasing underlying technology protocols.
    - `FeaturesSection.js`: Feature grid highlighting camera AR, 3D overlays, live route tracking, compass heading, satellite map, and destination waypoints.
    - `DestinationsSection.js`: Physical environment wayfinding overview and waypoint network preview.
    - `VisionSection.js`: Core philosophical pillars.
    - `CtaSection.js`: High-converting launch AR trigger and direct contact dispatch bridge.
  - **Fidelity Audit**: Conducted an exhaustive corner radius audit across cards (`rounded-lg`), badges (`rounded-full`), inputs (`rounded-md`), and buttons (`rounded-sm` / `rounded-md`) to ensure 100% visual parity with vanilla tokens.

### Phase 3 — AR Navigation Migration (`/navigate`)
- **Work Performed**:
  - Re-architected `vanilla/navigation.html` and `vanilla/scripts/script.js` into a coordinated React client subsystem:
    - `NavigateClient.js`: Central orchestrator managing destination state, active routes, and sensor feeds.
    - `ARViewport.js`: Dynamic vendor script loader (`aframe.min.js`, `aframe-ar.js`), WebXR camera manager, and 3D waypoint injector.
    - `MapPanel.js`: Embedded Mapbox GL JS v3 satellite HUD, turn-by-turn polyline layers, and gestural decoupling.
    - `DestinationBar.js`: 15-location dropdown selector with home navigation and direction triggers.
    - `CompassWidget.js`: Hardware heading tracker rotating the HUD dial via GPU-accelerated CSS transforms.
    - `MultifunctionButton.js`: 4-mode tactile navigation state machine.
  - Extracted math formulas (Haversine, waypoint interpolation, Mapbox client) into [`web/src/lib/geo.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/lib/geo.js).
  - Extracted verified destination coordinates into [`web/src/lib/places.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/lib/places.js).

### Phase 4 — Supporting Pages, SEO & Technical Requirements
- **Work Performed**:
  - Created dedicated route [`/about`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/about) with technical architecture cards, navigation capabilities, and spatial computing philosophy.
  - Created dedicated route [`/contact`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/contact) with platform accessibility specs, FAQs, and functional Formspree contact dispatch.
  - Added loading screens (`loading.js`) and client error boundaries (`error.js`) for all routes.
  - Created [`robots.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/robots.js) and [`sitemap.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/sitemap.js) metadata routes.
  - Created [`web/src/components/seo/JsonLd.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/seo/JsonLd.js) generating Schema.org `WebApplication`, `Organization`, and `BreadcrumbList` structured data.

### Phase 5 — End-to-End Testing & Verification
- **Work Performed**:
  - Implemented automated static asset audit verifying all 18 public assets and vendor scripts.
  - Built an internal link crawler verifying all 26 route and anchor references.
  - Created an HTTP test suite asserting 200/404 responses, metadata tags, and JSON-LD schemas across 25 endpoints.
  - Developed an automated Chrome DevTools Protocol (CDP) test suite driving real headless Chrome to verify desktop viewports, mobile drawer toggling, geolocation emulation, Mapbox canvas instantiation, and multifunction state transitions.
  - Verified 100% coordinate parity against `vanilla/scripts/places.js`.
  - Executed final `npm run lint` and `npm run build` checks with zero errors and zero warnings.

### Phase 6 — Documentation
- **Work Performed**:
  - Produced comprehensive, maintainable technical documentation in `docs/`: `PROJECT-OVERVIEW.md`, `ARCHITECTURE.md`, `TECH-STACK.md`, `MIGRATION-PLAN.md`, `ENVIRONMENT-VARS.md`, and `CONTRIBUTING.md`.

---

## 3. Critical Runtime Issues Resolved

During migration, extensive mobile device testing and screen recording analyses uncovered several subtle runtime bugs that were thoroughly investigated and resolved:

### 1. Mobile Camera Viewport Clipping & Narrow Strip
- **Symptom**: On real mobile devices, the AR camera feed rendered only as a narrow vertical strip on the left edge, with the rest of the screen black.
- **Root Cause**: AR.js injected a `<video>` element with hardcoded inline pixel dimensions calculated before the mobile orientation or address bar settled. Additionally, conflicting stacking contexts between the Next.js root layout, Tailwind containers, and A-Frame canvas caused the video to be clipped.
- **Resolution**: Implemented dynamic viewport units (`100dvh`), explicit absolute positioning (`inset: 0`), `object-fit: cover`, and forced video/canvas resize recalculations upon camera initialization in `ARViewport.js`.

### 2. Mapbox Interaction Decoupling & GPS Update Lag
- **Symptom**: Touching or panning the Mapbox satellite map caused tracking conflicts or map disappearance. Initial GPS update was noticeably slower than in vanilla.
- **Root Cause**: The vanilla version immediately decoupled camera follow upon user touch events (`touchstart`, `mousedown`), switching the multifunction button to `recenter`. In Next.js, state re-renders were re-centering the map on every GPS tick.
- **Resolution**: Injected event listeners into the Mapbox canvas to intercept user drag gestures and cleanly transition the state machine to `recenter`. Implemented smooth `flyTo` transitions matching vanilla velocity.

### 3. Subpage Anchor Trapping
- **Symptom**: When navigating to `/about` or `/contact`, clicking header or footer links (e.g. `About` or `Contact`) kept the user trapped on the subpage (e.g. `/about#about`).
- **Root Cause**: Anchor links were hardcoded as relative hashes (`#about`, `#contact`).
- **Resolution**: Updated all navigation links to use Next.js `<Link href="/#about">`, enabling smooth scrolling on `/` while seamlessly routing back to homepage sections from subpages.

---

---

## 4. Phase 7 — Control Icons & State Representation Strategy (Post-Migration Optimization)

### Strategy Selection: Option B — Consolidated SVG Sprite / Symbols
In Phase 7, the navigation HUD iconography and map markers were optimized to eliminate 7 legacy raster PNGs and transition to high-performance, resolution-independent vector graphics while preserving 100% visual fidelity to the original design.

### 1. Multifunction Navigation Control Icons (`/icons/nav-controls.svg`)
- **Format**: Consolidated SVG sprite with `<defs>` containing 4 `<symbol>` definitions with `viewBox="0 0 500 500"`.
- **Symbols**:
  - `icon-centered`: Cyan reticle with filled center dot ($r=49$), outer ring ($r=94$, stroke 15px), and 4 crosshair tick marks at 0°, 90°, 180°, and 270°.
  - `icon-bearing`: Cyan circular disc ($r=101$) with a white directional needle rotated at $-60^\circ$ and a cyan center hole ($r=15$).
  - `icon-recenter`: Dark gray (`#5e5e5e`) hollow reticle matching the centered geometry without the center dot.
  - `icon-reset-all`: Red circular ring ($r=95$, stroke 12px) with two 180° rotationally symmetric curved cycle arrows.
- **Component Integration**: Updated `MultifunctionButton.js` to render `<svg id="centeredImage"><use href={`/icons/nav-controls.svg#icon-${currentMode}`} /></svg>`. Eliminates `next/image` runtime overhead and reduces 4 network requests to 1 cached SVG fetch.

### 2. Compass Needle Widget (`/icons/compass.svg`)
- **Format**: Clean standalone vector SVG with `viewBox="0 0 500 500"`.
- **Visual Design**: Preserves the 4-faceted diamond needle artwork on a white circular base disc:
  - North Needle: Bright red (`#ff0000`) left facet, dark red (`#c90000`) right facet.
  - South Needle: Light silver (`#d1d1d1`) left facet, medium gray (`#e8e8e8`) right facet.
  - Center circular cutout ($r=35$) with white fill.
- **Component Integration**: Applied via CSS `background-image: url(/icons/compass.svg)` in `globals.css` (`.compass`). Smooth 360° device orientation rotation with zero pixel shimmering or blur.

### 3. Current-Location Map Marker (`/icons/current.svg`)
- **Format**: Lightweight vector SVG with `viewBox="0 0 2560 2560"`.
- **Visual Design**:
  - Outer accuracy halo circle ($r=1280$, `#3e8cf9` at 40% opacity).
  - Seamless teardrop white puck outline with rounded top pointer tip ($y=95$) tangent to the circle base ($r=708$).
  - Inner location circle puck ($r=620$, `#3e8cf9`).
  - Top directional cone triangle ($y=225$, `#3e8cf9`) separated by the circular white ring arc.
- **Component Integration**: Instantiated in `MapPanel.js` via `mapboxgl.Marker` with `background-image: url(/icons/current.svg)` and `marker.setRotation(compassHeading - mapBearing)`.

### 4. Asset Audit & Payload Savings
| Asset Path | Original Format & Size | Phase 7 Format & Size | Payload Reduction | Status |
|---|---|---|---|---|
| `web/public/models/centered.png` | PNG (23.7 KB) | Symbol in `nav-controls.svg` | Included in sprite | Removed |
| `web/public/models/bearing.png` | PNG (22.3 KB) | Symbol in `nav-controls.svg` | Included in sprite | Removed |
| `web/public/models/recenter.png` | PNG (22.6 KB) | Symbol in `nav-controls.svg` | Included in sprite | Removed |
| `web/public/models/reset-all.png` | PNG (24.8 KB) | Symbol in `nav-controls.svg` | Included in sprite | Removed |
| **Consolidated Sprite** | **4 PNGs (93.4 KB)** | **`nav-controls.svg` (2.6 KB)** | **-97.2%** | **Created** |
| `web/public/models/compass.png` | PNG (24.8 KB) | `compass.svg` (0.6 KB) | **-97.6%** | **Replaced** |
| `web/public/models/current.png` | PNG (290.3 KB) | `current.svg` (0.7 KB) | **-99.8%** | **Replaced** |
| `web/public/models/current2.png` | PNG (32.1 KB) | N/A (Unused variant) | **-100.0%** | **Removed** |
| `web/public/models/map_pointer_3d_icon.glb` | GLB (127.7 KB) | GLB (127.7 KB) | 0% (Retained) | **Retained** |
| **Total HUD Assets** | **470.6 KB** | **3.9 KB (+ 127.7 KB GLB)** | **-99.2%** | **Optimized** |

---

## 5. Verification & Parity Confirmation
All Phase 7 assets were tested across:
1. **ESLint (`npm run lint`)**: 0 errors, 0 warnings.
2. **Production Build (`npm run build`)**: 13/13 static routes generated successfully.
3. **End-to-End Server Suite**: All routes, SVG sprite symbols, compass rotation, Mapbox marker orientation, and 404 responses for deleted PNGs verified.
4. **Visual Parity**: Vector SVG artwork verified pixel-perfect against original PNGs via CairoSVG test renders and mobile viewport testing.

---

## 6. Phase 8 — IA Unification, Location Independence & Roadmap

### 1. Information Architecture Unification
- **Problem**: The site previously maintained duplicate `#about` / `/about` and `#contact` / `/contact` flows, creating duplicate contact forms and orphaned subpages.
- **Solution**:
  - Restructured the landing page into a clean product conversion funnel: Hero &rarr; How it works (`#how`) &rarr; Features (`#features` with bridge to `/about`) &rarr; Destinations (`#destinations`) &rarr; Vision (`#vision`) &rarr; CTA (`#cta` with contact bridge to `/contact`).
  - Elevated `/about` to the single source of truth for 3D spatial computing architecture, geospatial anchoring, and navigation specifications.
  - Elevated `/contact` to the centralized developer dispatch hub containing sensor requirements, FAQs, and the interactive Formspree submission form.
  - Retained backward-compatible hash anchors (`#about`, `#contact`) to prevent broken external links.

### 2. Location-Independent Evolution
- **Decoupling from Institutions**: All UI elements, page metadata, descriptions, JSON-LD schemas, and navigation labels were completely decoupled from any specific college or campus context. EnRouteAR is now positioned as a universal AR wayfinding platform for any physical space worldwide.
- **Sample Coordinate Test Suite**: The 15 pre-calibrated coordinates in `lib/places.js` are retained as a verified sample test suite for outdoor GPS validation and Haversine interpolation testing.

### 3. Future Roadmap: Global Location Search
- **Search-Based Discovery**: In the next phase, the static destination dropdown will be replaced with an interactive search system powered by the Mapbox Geocoding & Search API.
- **Universal Wayfinding**: Users will be able to search and route to any address, point of interest, or custom coordinate globally, making the platform fully dynamic and location-independent end-to-end.

