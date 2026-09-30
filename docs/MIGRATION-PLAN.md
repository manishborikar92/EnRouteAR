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
    - `Header.js`: Fixed blurred navigation bar with mobile drawer toggle.
    - `HeroSection.js`: Luminous title, GPS status badge, action buttons, stats counters, and interactive 3D phone mockup.
    - `TechTicker.js`: Continuous marquee showcasing underlying technology protocols.
    - `AboutSection.js`: Feature grid highlighting camera AR, 3D overlays, and live route tracking.
    - `CampusSection.js`: KITS Ramtek narrative, accreditation badges, and interactive campus destination list.
    - `VisionSection.js`: Core philosophical pillars.
    - `CtaSection.js` & `ContactSection.js`: Launch AR trigger and Formspree contact form.
    - `StarfieldCanvas.js`: High-performance background particle canvas with scanlines.
    - `ScrollReveal.js`: Lightweight IntersectionObserver triggering fade-and-slide reveals.
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
  - Extracted campus destination coordinates into [`web/src/lib/places.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/lib/places.js).

### Phase 4 — Supporting Pages, SEO & Technical Requirements
- **Work Performed**:
  - Created dedicated route [`/about`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/about) with technical architecture cards, campus context, and AR launch CTA.
  - Created dedicated route [`/contact`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/contact) with institutional headquarters info, FAQs, and functional Formspree contact dispatch.
  - Added Orbitron-themed loading screens (`loading.js`) and client error boundaries (`error.js`) for all routes.
  - Created [`robots.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/robots.js) and [`sitemap.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/sitemap.js) metadata routes.
  - Created [`web/src/components/seo/JsonLd.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/seo/JsonLd.js) generating Schema.org `WebApplication`, `CollegeOrUniversity`, and `BreadcrumbList` structured data.

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

## 4. Future Roadmap: Phase 7 (Post-Migration Optimization)

*Note: Phase 7 is documented as an architectural roadmap for post-migration optimization.*

1. **Vector HUD Iconography**: Replace raster PNGs in `web/public/models/` (`centered.png`, `bearing.png`, `recenter.png`, `reset-all.png`) with clean, inline vector SVGs or Lucide icons to reduce HTTP requests to zero and ensure razor-sharp rendering on ultra-high-DPI mobile screens.
2. **Dynamic SVG Compass Dial**: Convert the 25 KB raster `compass.png` into an optimized inline SVG to eliminate rotational edge shimmering during device orientation updates.
3. **Pulsing Radar Marker**: Replace the 290 KB raster `current.png` user location icon with an SVG directional radar dot (<1 KB).
4. **Draco Geometry Compression**: Evaluate Google Draco compression for `map_pointer_3d_icon.glb` to reduce mesh download latency over slow mobile cellular connections.
