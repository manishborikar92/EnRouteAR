# Current Project Analysis — EnRouteAR

> **Date:** February 2026
> **Scope:** Full analysis of the existing static HTML/CSS/JS codebase

---

## 1. Project Overview

**EnRouteAR** is a web-based Augmented Reality (AR) navigation system built for the **Kavikulguru Institute of Technology and Science (KITS), Ramtek** campus. It overlays AR directional markers onto a real-world camera feed while simultaneously displaying a 2D satellite map, allowing users to navigate between buildings and landmarks on campus.

| Attribute       | Value                                   |
| --------------- | --------------------------------------- |
| Type            | Static website (no build step)          |
| Language        | HTML5, CSS3, Vanilla JavaScript         |
| Hosting         | Vercel (static)                         |
| Live URL        | https://virtualvanguard.vercel.app/     |
| License         | MIT                                     |

---

## 2. File & Folder Structure

```
EnRouteAR/
├── index.html                  # Landing / home page
├── navigation.html             # AR navigation page
├── LICENSE                     # MIT license
├── README.md                   # Brief project readme
├── EnRouteAR.md                # Detailed development plan document
├── Project Structure.md        # Step-by-step project description
│
├── favicon/                    # Favicon & PWA icons
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   └── site.webmanifest
│
├── logos/                      # Brand logos
│   ├── logo-transparent-png 1x1.png
│   ├── logo-transparent-png.png
│   ├── logo-transparent-svg 1x1.svg
│   └── logo-transparent-svg.svg
│
├── models/                     # 3D models & marker images
│   ├── bearing.png
│   ├── centered.png
│   ├── compass.png
│   ├── current.png / current2.png
│   ├── map_pointer_3d_icon.glb
│   ├── recenter.png
│   └── reset-all.png
│
├── scripts/                    # JavaScript source
│   ├── places.js               # Static destination data (14 places)
│   ├── script.js               # Full navigation logic (545 lines)
│   └── script-mini.js          # Minified version of script.js
│
└── styles/                     # CSS stylesheets
    ├── index.css               # Landing page styles
    ├── navigation.css          # Navigation page styles
    └── navigation-mini.css     # Minified version of navigation.css
```

---

## 3. Page-by-Page Breakdown

### 3.1 Landing Page (`index.html`)

| Section            | Description |
| ------------------ | ----------- |
| **Header**         | Displays brand logo via CSS `background-image` (SVG). |
| **Hero Section**   | Title "EnRouteAR – Augmented Reality Navigation" with project description and a "Navigate" CTA button. |
| **College Info**   | Long-form description of KITS Ramtek campus, departments, and external link to `kits.edu`. |
| **Project Vision** | Multi-paragraph narrative about the project mission and team ethos. |
| **Contact Form**   | Name / Email / Message form powered by **Formspree** (`formspree.io/f/mgegpkeb`). |
| **Footer**         | Copyright notice "© 2024 EnRouteAR". |

**Inline JavaScript:**
- Intercepts the "Navigate" button click.
- Requests geolocation permission before redirecting to `navigation.html`.
- Falls back to direct navigation if geolocation is unsupported.

### 3.2 Navigation Page (`navigation.html`)

| Component                     | Description |
| ----------------------------- | ----------- |
| **Destination Selector**      | `<select>` dropdown dynamically populated from `places.js`, plus a "Get Directions" button. |
| **A-Frame AR Scene**          | Full-screen camera feed with GPS-based AR entities (cylinders for route, GLB for destination marker). |
| **Compass Widget**            | Rotates with device orientation to show heading. |
| **2D Mapbox Map**             | Fixed-height panel at the bottom showing satellite imagery, route polyline, and markers. |
| **Multifunction Button**      | Context-sensitive button (recenter / bearing / reset) positioned bottom-right. |

---

## 4. External Dependencies & CDN Libraries

| Library              | Version   | Purpose                            | CDN Source |
| -------------------- | --------- | ---------------------------------- | ---------- |
| **A-Frame**          | 1.3.0     | WebXR / AR scene rendering         | aframe.io |
| **AR.js**            | latest    | GPS-based location AR              | raw.githack.com (AR-js-org) |
| **aframe-look-at**   | 0.8.0     | Entity look-at-camera component    | unpkg.com |
| **Mapbox GL JS**     | 3.2.0     | 2D satellite map, directions API   | api.mapbox.com |
| **Formspree**        | —         | Contact form backend               | formspree.io |

---

## 5. Core Business Logic — `script.js`

### 5.1 Initialization Flow
1. `DOMContentLoaded` → populate destination dropdown from `places[]`.
2. `initMap()` → create Mapbox map (satellite-streets, globe projection), create compass element, listen for `deviceorientation`.
3. `watchUserLocation()` → `navigator.geolocation.watchPosition()` with high accuracy; updates user marker and map center.

### 5.2 Destination Selection Flow
1. User selects destination from dropdown → clicks "Get Directions".
2. `selectDestination()` fetches walking directions from **Mapbox Directions API**.
3. Directions response drives:
   - **AR markers:** `updateARDirections()` generates intermediary A-Frame `<a-cylinder>` entities along the route, plus a GLB 3D pointer at the destination.
   - **2D Map route:** `updateMapWithRoute()` adds a GeoJSON `LineString` layer with blue polyline.
   - **Destination marker:** Red Mapbox marker at destination coordinates.

### 5.3 State Machine (Multifunction Button)
| State Combo                         | Button Image  | Action on Click          |
| ----------------------------------- | ------------- | ------------------------ |
| Destination + centered + bearing    | `reset-all`   | Full reset (clear route, markers, bearing) |
| Centered + no bearing               | `centered`    | Toggle bearing on        |
| User interaction (map dragged)      | `recenter`    | Re-center on user        |
| Bearing on                          | `bearing`     | Toggle bearing off       |

### 5.4 Key Algorithms
- **Haversine formula** — `calculateDistance()` computes distance between GPS coordinates.
- **Intermediary point generation** — `generateIntermediaryPoints()` creates evenly spaced waypoints (every ~2 meters) along each route segment for dense AR cylinder placement.
- **Device orientation** — Compass rotation and map bearing sync via `deviceorientation` event.

---

## 6. Data — `places.js`

Contains **14 predefined campus locations** as a JavaScript array:

| Place                        | Latitude    | Longitude    |
| ---------------------------- | ----------- | ------------ |
| Administrative Department    | 21.38541    | 79.30562     |
| Architecture Department      | 21.38529    | 79.30656     |
| Canteen                      | 21.38641    | 79.30685     |
| Civil Department             | 21.38615    | 79.30640     |
| Computer Tech. Department    | 21.38590    | 79.30618     |
| Electronics Department       | 21.38590    | 79.30618     |
| Gym/Stadium                  | 21.38646    | 79.30434     |
| Information Tech. Department | 21.38590    | 79.30618     |
| Jamuna Boys Hostel           | 21.38681    | 79.30335     |
| Kaveri Girls Hostel          | 21.38440    | 79.30420     |
| Library                      | 21.38584    | 79.30689     |
| Mechanical Department        | 21.38493    | 79.30606     |
| Triveni Boys Hostel          | 21.38836    | 79.30370     |
| Work Shop                    | 21.38486    | 79.30620     |

> **Note:** Computer Tech., Electronics, and IT departments share the exact same coordinates.

---

## 7. Styling Overview

### `index.css` (Landing Page)
- Dark navy background (`#041a2a`) with gold headings (`#facf0e`) and light-blue body text (`#a9d9ff`).
- Custom scrollbar with yellow track and light-blue thumb.
- Blue CTA button with hover transition.
- Dark form container on darker blue background.
- SVG logo rendered via `background-image`.

### `navigation.css` (Navigation Page)
- Full-viewport layout with AR scene as background.
- Fixed-position destination selector bar at top with semi-transparent background.
- Fixed-height (180px) map panel at bottom.
- Compass icon (25×25px) positioned bottom-left above the map.
- Multifunction button (45×45px) bottom-right, swapping icon via CSS `content` property.

---

## 8. Identified Issues & Improvement Opportunities

1. **No build pipeline** — Raw HTML/JS served directly; no bundling, tree-shaking, or code-splitting.
2. **Hardcoded API keys** — Mapbox access token is exposed in both HTML and JS files.
3. **No responsive design system** — CSS is basic with no breakpoints or design tokens.
4. **Minified files alongside source** — `script-mini.js` and `navigation-mini.css` are manually minified copies, not auto-generated.
5. **No component reuse** — Header, footer, and navigation UI are duplicated across pages.
6. **No error boundaries** — AR/Geolocation failures show basic `alert()` dialogs.
7. **Accessibility gaps** — No ARIA labels, skip links, or semantic landmarks beyond basic `<header>/<main>/<footer>`.
8. **SEO limitations** — No meta descriptions, Open Graph tags, or structured data.
9. **Outdated A-Frame version** — Using v1.3.0 (current latest is much newer).
10. **No state management** — All state is in closure variables; difficult to extend.
11. **Copyright year** — Still shows "2024".
