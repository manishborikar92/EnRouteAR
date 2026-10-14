# EnRouteAR — Technology Stack

This document outlines the libraries, frameworks, APIs, and tooling powering EnRouteAR, along with their roles, version specifications, and architectural roadmap.

---

## 1. Core Framework & Runtime

| Technology | Version | Purpose & Rationale |
|---|---|---|
| **Next.js** | `16.3.6` | App Router framework with Turbopack compilation, zero-overhead static site generation (SSG) for landing/supporting routes, dynamic client isolation for sensor views, and native metadata routes (`robots.js`, `sitemap.js`). |
| **React** | `19.2.4` | Modern component model utilizing Server Components by default with explicit `"use client"` boundaries for browser-only sensor and canvas components. |
| **React DOM** | `19.2.4` | Virtual DOM rendering and hydration engine. |
| **Node.js** | `>=18.18.0` (v24.x tested) | Server execution and build environment. |
| **npm** | `>=10.x` | Preferred JavaScript package and dependency manager. |

---

## 2. Spatial Computing & 3D WebXR

| Technology | Source / Version | Role in Architecture |
|---|---|---|
| **WebXR Device API** | Browser Native | Underpins hardware-accelerated 3D coordinate projection directly within modern mobile web browsers. |
| **A-Frame** | `1.3.0` (`/vendor/aframe.min.js`) | Declarative 3D entity-component framework built atop Three.js. Manages the 3D scene graph, camera frustum, lighting, and entity lifecycles. |
| **AR.js** | `3.4.8` (`/vendor/aframe-ar.js`) | Location-based Augmented Reality framework. Converts latitude/longitude coordinates into relative 3D camera vector spaces. |
| **AR-ThreeX Location Only** | `/vendor/ar-threex-location-only.js` | High-precision location calculation engine that operates without marker barcodes or image targets. |
| **A-Frame Look-At** | `/vendor/aframe-look-at-component.min.js` | Ensures 3D destination markers continuously rotate to face the user's camera regardless of viewing angle. |
| **Three.js** | `^0.137.0` (bundled with A-Frame) | Low-level WebGL graphics engine rendering geometries, materials, and GLB meshes. |

---

## 3. Mapping, Geolocation & Routing

| Technology | Source / Version | Role in Architecture |
|---|---|---|
| **Mapbox GL JS** | `^3.31.0` | High-performance WebGL vector and raster map rendering engine. Provides smooth 60 FPS panning, rotating, and pitch rendering on mobile devices. |
| **Mapbox Satellite Streets** | Tile Layer (`v12`) | High-resolution aerial satellite imagery overlaid with road networks, pedestrian walkways, and building footprints worldwide. |
| **Mapbox Directions API** | REST API (`v5`) | Computes real-world walking paths between the user's live GPS coordinates and selected destinations worldwide, returning GeoJSON polylines. |
| **HTML5 Geolocation API** | Browser Native | High-accuracy GPS location stream (`enableHighAccuracy: true`, `maximumAge: 0`) tracking user latitude, longitude, altitude, and accuracy. |
| **DeviceOrientation API** | Browser Native | Accesses physical device compass orientation (`alpha`, `webkitCompassHeading`) to align HUD dials and satellite map orientation. |
| **MediaDevices API** | Browser Native (`getUserMedia`) | Requests access to the device's environment-facing (rear) video camera stream for real-world AR background rendering. |

### Planned Roadmap Integration: Global Location Search
- **Mapbox Geocoding & Search API**: In an upcoming phase, the current pre-calibrated sample destination dataset will be replaced by an interactive, search-based location discovery system. Users will be able to search and route to any address, landmark, or GPS coordinate worldwide.

---

## 4. Styling, Typography & Design System

| Technology | Version / Configuration | Purpose |
|---|---|---|
| **Tailwind CSS** | `^4.0.0` (`@tailwindcss/postcss`) | CSS-first configuration via `@theme`, dark-theme HUD color palettes, custom responsive breakpoints, and glass utilities. |
| **Bricolage Grotesque** | `next/font/google` (`latin`) | Modern, expressive geometric display typeface used for headings, HUD telemetry, and badges. |
| **Public Sans** | `next/font/google` (`latin`) | Clean, neutral grotesque typeface used for paragraphs, UI controls, and accessible body text. |
| **Lucide React** | `^1.48.0` | Clean, modern vector SVG icons for UI actions, technical pillars, and responsive menus. |
| **Sonner** | `^2.0.8` | High-performance toast notifications for geolocation warnings, permission updates, and form submissions. |

---

## 5. Development, Linting & Build Tools

| Tool | Version | Responsibility |
|---|---|---|
| **Turbopack** | Next.js 16 Native | High-speed Rust-based bundler and development server. Compiles the production build in ~1.4 seconds. |
| **ESLint** | `^9.0.0` | Static analysis ensuring code quality, React hook rules, and Next.js App Router conventions. |
| **eslint-config-next** | `16.3.6` | Official Next.js ESLint ruleset, including `@next/next/no-html-link-for-pages` checks. |
| **PostCSS** | `^8.4.0` | CSS transformation pipeline powering Tailwind CSS v4. |

---

## 6. Browser & Device Compatibility Matrix

| Platform | Browser | WebXR / AR.js | Mapbox GL v3 | Compass Heading | Status |
|---|---|---|---|---|---|
| **Android** | Chrome 90+ | Full Support | Full Support | Full Support | **Tier 1 (Recommended)** |
| **Android** | Edge Mobile | Full Support | Full Support | Full Support | **Tier 1 (Recommended)** |
| **iOS** | Safari 14.5+ | Full Support* | Full Support | Full Support* | **Tier 1 (Requires permission grant)** |
| **Desktop** | Chrome / Edge | Emulation Only | Full Support | N/A (Emulated) | **Tier 2 (Supported for preview)** |
| **Desktop** | Firefox / Safari | Emulation Only | Full Support | N/A (Emulated) | **Tier 2 (Supported for preview)** |

*\*Note: iOS Safari requires user gesture interaction to request Motion & Orientation permission and camera permission over HTTPS.*
