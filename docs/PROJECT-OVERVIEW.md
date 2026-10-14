# EnRouteAR — Project Overview

> **Browser-Native Augmented Reality Wayfinding & Spatial Navigation Platform**

---

## 1. Executive Summary

**EnRouteAR** is a modern, web-based augmented reality (AR) wayfinding and spatial navigation application. Built on **Next.js 16** with **React 19**, **A-Frame**, **AR.js**, and **Mapbox GL JS v3**, EnRouteAR enables visitors, pedestrians, and travelers to navigate physical outdoor environments, complexes, and architectural grounds with sub-meter accuracy directly inside standard mobile web browsers—eliminating the friction of native app store downloads or proprietary scanning hardware.

By fusing real-time device sensor streams (**Camera**, **High-Accuracy GPS Geolocation**, and **DeviceOrientation compass headings**) with interactive satellite cartography and hardware-accelerated WebGL/WebXR rendering, EnRouteAR overlays luminous 3D directional waypoints and animated destination markers onto the physical world.

---

## 2. Core Capabilities

### 📍 Real-World AR Waypoint Projection
- Overlays 3D beacon cylinders and custom GLB destination meshes (`/models/map_pointer_3d_icon.glb`) directly onto live camera video.
- Real-world geospatial anchoring via high-precision Spherical Mercator (`EPSG:3857`) projections.
- Continuous distance and elevation calculations relative to user position.

### 🗺️ Interactive Satellite HUD Mini-Map
- Embedded 60 FPS Mapbox GL JS v3 mini-map displaying satellite-streets imagery.
- Turn-by-turn walking route calculations powered by the Mapbox Directions API.
- Luminous blue route polyline with continuous GPS position synchronization.
- Full multi-touch support for pan, zoom, pitch, and bearing manipulation.

### 🧭 Dynamic Compass & Heading Synchronization
- Hardware orientation sensor tracking with sub-degree responsiveness.
- Rotating HUD compass needle dynamically matching real-world travel direction.
- Automatic alignment of map bearing to device heading.

### 🎛️ 4-Mode Multifunction State Machine
- **Centered (`centered`)**: Locks satellite view directly to the user's current GPS position.
- **Compass Follow (`bearing`)**: Rotates map dynamically to follow real-time device orientation.
- **Free Pan (`recenter`)**: Decouples camera follow when the user touches or pans the map manually, providing a one-tap recenter control.
- **Active Navigation Reset (`reset-all`)**: Clears active AR waypoints, route polylines, and destination state, returning the system to idle scanning.

### 📍 15 Pre-Mapped Sample Destinations
- Comprehensive coordinate index of facilities, centers, laboratories, workshops, library, and pavilions used as a verified sample test suite prior to the planned search-based location discovery system.

### 🌐 High-Performance Modern Web Architecture
- Fully responsive design matching sci-fi HUD aesthetics across mobile, tablet, and desktop viewports.
- Static pre-rendering (SSG) across landing (`/`), system specifications (`/about`), and contact (`/contact`) pages.
- Native Next.js 16 metadata routes (`robots.js`, `sitemap.js`, `manifest.json`) and Schema.org JSON-LD structured data.

---

## 3. Repository Structure

```
EnRouteAR/
├── docs/                           # Technical documentation and guides
│   ├── ARCHITECTURE.md             # System design, data flow, and state machine
│   ├── CONTRIBUTING.md             # Contributor guidelines and dev workflow
│   ├── ENVIRONMENT-VARS.md         # Configuration and environment variables
│   ├── MIGRATION-PLAN.md           # Migration history and technical decisions
│   ├── PROJECT-OVERVIEW.md         # High-level overview and summary (this file)
│   └── TECH-STACK.md               # Technology specifications and dependency audit
│
├── vanilla/                        # Original legacy static prototype (source of truth)
│   ├── index.html                  # Legacy landing page
│   ├── navigation.html             # Legacy AR navigation viewport
│   ├── models/                     # Original 3D assets and icons
│   ├── scripts/                    # Legacy vanilla JavaScript (script.js, places.js)
│   └── styles/                     # Legacy CSS stylesheets
│
└── web/                            # Production Next.js 16 Application
    ├── public/                     # Static assets served at root
    │   ├── icons/                  # HUD SVG sprite (nav-controls.svg), compass.svg, current.svg
    │   ├── models/                 # 3D spatial models (map_pointer_3d_icon.glb)
    │   ├── vendor/                 # Spatial computing scripts (A-Frame, AR.js)
    │   └── *.png, *.svg            # App icons, favicon, manifest, and SEO graphics
    │
    ├── src/
    │   ├── app/                    # Next.js 16 App Router
    │   │   ├── layout.js           # Root layout with fonts, JSON-LD, and Sonner
    │   │   ├── page.js             # High-fidelity landing page (/)
    │   │   ├── globals.css         # Tailwind v4 directives and HUD keyframes
    │   │   ├── robots.js           # Metadata route (/robots.txt)
    │   │   ├── sitemap.js          # Metadata route (/sitemap.xml)
    │   │   ├── manifest.json       # Progressive Web App manifest
    │   │   ├── about/              # System specification page (/about)
    │   │   ├── contact/            # Communication and FAQ page (/contact)
    │   │   └── navigate/           # AR navigation viewport page (/navigate)
    │   │
    │   ├── components/
    │   │   ├── landing/            # Modular landing page sections & UI components
    │   │   ├── navigation/         # AR HUD, Mapbox, Compass, and Viewport components
    │   │   └── seo/                # Schema.org structured data generators
    │   │
    │   └── lib/
    │       ├── geo.js              # Haversine distance, interpolation, and routing API
    │       └── places.js           # Predefined sample coordinates index
    │
    ├── package.json                # Project dependencies and npm scripts
    └── next.config.mjs             # Next.js build and Turbopack configuration
```

---

## 4. Primary Use Cases

1. **Complex Venues & Architectural Facilities**: Frictionless wayfinding across multi-building complexes, corporate centers, convention facilities, and research centers.
2. **Pedestrian Exploration & Tourism**: Turn-by-turn augmented reality visual trails guiding visitors across outdoor parks, historic landmarks, and city districts.
3. **Event Grounds & Arenas**: Real-time camera waypoint overlay helping attendees navigate sports complexes, open-air festivals, and exhibition grounds.

---

## 5. Architectural Roadmap: Search-Based Global Navigation

- **Current State**: Location-independent presentation with 15 pre-mapped sample waypoints in `lib/places.js` acting as a verified testing suite for outdoor GPS fix accuracy, Haversine interpolation, and Mapbox routing.
- **Upcoming Phase**: Integration of **Mapbox Geocoding & Search API**, enabling dynamic search-based location discovery. Users will be able to query and navigate to any address, venue, or coordinate worldwide without predefined datasets.
