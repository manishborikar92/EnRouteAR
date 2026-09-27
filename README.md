# EnRouteAR

**Augmented Reality campus navigation for smartphones — powered by Next.js, Tailwind CSS, A-Frame, AR.js, and Mapbox.**

EnRouteAR overlays GPS-accurate 3D waypoints and walking routes directly onto your live camera feed, letting you navigate Kavikulguru Institute of Technology and Science (KITS), Ramtek without ever looking down at a traditional map.

🌐 **Live demo:** [enroutear.vercel.app](https://enroutear.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Next.js Application (`web/`)](#1-nextjs-application-web---active-production-app)
  - [Vanilla Reference Site (`vanilla/`)](#2-vanilla-reference-site-vanilla---standalone)
- [Vercel Deployment Configuration](#vercel-deployment-configuration)
- [Campus Locations](#campus-locations)
- [How It Works](#how-it-works)
- [Device Requirements](#device-requirements)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

EnRouteAR is a mobile-first web application that fuses augmented reality with real-time GPS navigation. When a user selects a destination on campus, the app fetches a walking route from the Mapbox Directions API and visualises it in two ways simultaneously:

- **AR view** — blue cylinder markers trace the walking path on the ground in 3D space, with a GLB pointer model at the destination, all anchored to real-world GPS coordinates via AR.js
- **2D satellite map** — an embedded Mapbox satellite-streets panel shows the same route as a polyline overlay, with live position and bearing tracking

A device-orientation compass keeps both the AR scene and the map bearing locked to the user's heading as they walk.

The repository contains two clean, decoupled implementations:
1. **`web/`** — Modern **Next.js 16 + React 19 + Tailwind CSS v4** progressive web application (active target for Vercel production deployment).
2. **`vanilla/`** — Self-contained, zero-dependency **HTML5 + Tailwind CSS v4 + Vanilla JS** reference implementation.

---

## Features

| Feature | Description |
|---|---|
| **GPS-anchored AR waypoints** | 3D route cylinders and a destination pointer model placed at real-world coordinates |
| **Live walking route** | Walking directions fetched from Mapbox Directions API and rendered in both AR and 2D |
| **Real-time GPS tracking** | User position updated continuously via the Geolocation API |
| **Compass-corrected bearing** | Device orientation sensor rotates the AR scene and map to match the user's heading |
| **Satellite mini-map** | Mapbox satellite-streets panel with live position marker and route polyline |
| **Multifunction button** | Context-aware button that cycles through: centre map → enable bearing → reset route |
| **14 campus destinations** | Pre-mapped locations covering all departments, hostels, canteen, library, and gym |
| **Tailwind CSS v4 Styling** | High-performance CSS-first architecture with custom neon HUD aesthetic and glassmorphism |
| **Responsive landing page** | Animated hero, scroll-reveal sections, mobile navigation, and a contact form |

---

## Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Web Framework | [Next.js](https://nextjs.org/) | 16.3+ | App Router, Turbopack, React 19 in `web/` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 4.3+ | CSS-first configuration (`@theme`) across all views |
| AR Framework | [A-Frame](https://aframe.io/) | 1.3.0 | WebGL 3D scene graph |
| Location-based AR | [AR.js](https://ar-js-org.github.io/AR.js-Docs/) | latest | Location-only build |
| 3D Engine | Three.js | bundled | Bundled with AR.js |
| 2D Mapping | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) | 3.2.0 | Satellite-streets tiles |
| Walking Directions | [Mapbox Directions API](https://docs.mapbox.com/api/navigation/directions/) | v5 | GeoJSON route geometry |
| Fonts | [Google Fonts](https://fonts.google.com/) | — | Orbitron (display) & Outfit (body) |
| Hosting | [Vercel](https://vercel.com/) | — | Deployed from `web/` root directory |

---

## Project Structure

```
enroutear/
│
├── web/                                # Next.js 16 + React 19 application (Vercel Root)
│   ├── src/
│   │   └── app/
│   │       ├── layout.js               # Root layout with PWA metadata
│   │       ├── page.js                 # Landing page route
│   │       └── globals.css             # Tailwind CSS v4 stylesheet
│   ├── public/                         # Public static assets
│   │   ├── models/                     # 3D pointer GLB, compass & button state icons
│   │   ├── favicon/                    # PWA icons & site.webmanifest
│   │   ├── logos/                      # Brand vector and transparent logos
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   ├── .env.local                      # Local environment variables
│   ├── package.json                    # Next.js & React dependencies
│   ├── next.config.mjs                 # Next.js configuration
│   └── postcss.config.mjs              # PostCSS / Tailwind v4 plugin
│
├── vanilla/                            # Self-contained vanilla HTML/CSS/JS reference
│   ├── index.html                      # Landing page
│   ├── navigation.html                 # AR navigation view
│   ├── styles/
│   │   ├── index.css                   # Compiled Tailwind v4 landing styles
│   │   └── navigation.css              # Compiled Tailwind v4 navigation styles
│   ├── scripts/
│   │   ├── places.js                   # 14 campus destination coordinates
│   │   └── script.js                   # Navigation logic (map, AR, GPS, compass)
│   ├── models/                         # 3D assets & HUD icons
│   └── favicon/                        # Favicon assets & webmanifest
│
├── docs/                               # Architectural plans & migration specs
├── design/                             # UI mockups & color palette references
├── logos/                              # Master brand logos
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+ (for `web/`)
- A modern smartphone with a rear-facing camera
- A browser supporting the [Geolocation API](https://caniuse.com/geolocation), [DeviceOrientation API](https://caniuse.com/deviceorientation), and [WebGL](https://caniuse.com/webgl)
- Recommended: **Android Chrome** or **iOS Safari 15+**
- HTTPS is mandatory for camera and GPS access

---

### 1. Next.js Application (`web/`) — Active Production App

1. **Navigate to the web directory and install dependencies:**

   ```bash
   cd web
   npm install
   ```

2. **Configure environment variables:**

   Create or verify `web/.env.local`:

   ```env
   NEXT_PUBLIC_APP_URL="https://enroutear.vercel.app"
   NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/mgegpkeb"
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_token_here"
   ```

3. **Start the local development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

---

### 2. Vanilla Reference Site (`vanilla/`) — Standalone

The `vanilla/` directory runs directly in the browser with zero build tools:

1. **Serve over HTTPS:**

   ```bash
   # Start a local static file server inside vanilla/
   npx serve vanilla -l 8080

   # In a separate terminal, tunnel via ngrok to test on a physical smartphone
   ngrok http 8080
   ```

2. **Grant permissions on your smartphone:**
   - **Camera** — required for the AR camera pass-through
   - **Location** — required for GPS positioning and route calculation

---

## Vercel Deployment Configuration

When deploying this repository to [Vercel](https://vercel.com/), configure the project settings to build from `web/`:

| Setting | Value | Notes |
|---|---|---|
| **Root Directory** | `web` | In Project Settings ➔ General ➔ Root Directory |
| **Framework Preset** | **Next.js** | Automatically detected |
| **Build Command** | `next build` (Default) | Standard Next.js production build |
| **Output Directory** | `.next` (Default) | Next.js build output |
| **Install Command** | `npm install` (Default) | Installs dependencies in `web/` |

### Environment Variables on Vercel
Add the following in Vercel **Settings ➔ Environment Variables**:
- `NEXT_PUBLIC_APP_URL` — e.g. `https://enroutear.vercel.app`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — Formspree submission endpoint
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — Your Mapbox public access token

---

## Campus Locations

The following 14 locations are pre-mapped within KITS Ramtek campus (21.385°N, 79.306°E):

| Location | Latitude | Longitude |
|---|---|---|
| Administrative Department | 21.38541 | 79.30562 |
| Architecture Department | 21.38529 | 79.30656 |
| Canteen | 21.38641 | 79.30685 |
| Civil Department | 21.38615 | 79.30640 |
| Computer Tech. Department | 21.38590 | 79.30618 |
| Electronics Department | 21.38590 | 79.30618 |
| Gym / Stadium | 21.38646 | 79.30434 |
| Information Tech. Department | 21.38590 | 79.30618 |
| Jamuna Boys Hostel | 21.38681 | 79.30335 |
| Kaveri Girls Hostel | 21.38440 | 79.30420 |
| Library | 21.38584 | 79.30689 |
| Mechanical Department | 21.38493 | 79.30606 |
| Triveni Boys Hostel | 21.38836 | 79.30370 |
| Work Shop | 21.38486 | 79.30620 |

### Adding a new location

In `vanilla/scripts/places.js` (or in the Next.js places configuration), append an entry to the `places` array:

```js
{ name: 'New Building', latitude: 21.38600, longitude: 79.30650 },
```

---

## How It Works

### AR rendering pipeline

```
getUserMedia() → <video> element (visible in DOM)
                        ↓
           AR.js reads video as camera feed
                        ↓
     A-Frame WebGL canvas (alpha: true, transparent)
     draws 3D entities anchored to GPS coordinates
                        ↓
     Canvas sits on top of the video — AR objects
     appear to float over the real world
```

Using `renderer="alpha: true"` keeps the `<video>` element visible in the DOM at all times. This prevents Android Chrome's power manager from suspending the camera stream.

### Route rendering

When the user taps **Navigate**:

1. The current GPS position and selected destination are sent to the **Mapbox Directions API** (walking profile)
2. The returned GeoJSON route coordinates are interpolated at **2-metre intervals** using the Haversine formula
3. An `<a-cylinder>` element is placed at each interpolated point, gps-anchored via AR.js
4. An `<a-entity>` with the GLB pointer model is placed at the final coordinate
5. The same route is drawn as a blue polyline on the **Mapbox 2D mini-map**

### Multifunction button states

The button in the bottom-right corner changes function based on navigation state:

| Icon | State | Tap action |
|---|---|---|
| `centered` | Map following user, bearing off | Enable compass bearing |
| `bearing` | Bearing on, no destination | Disable bearing |
| `recenter` | User panned the map manually | Re-centre map on user |
| `reset-all` | Active route, centred, bearing on | Clear route and reset everything |

---

## Device Requirements

| Requirement | Notes |
|---|---|
| **HTTPS** | Mandatory — camera and GPS APIs are blocked on HTTP |
| **Camera permission** | Rear-facing camera used for AR view |
| **Location permission** | Required for GPS positioning and routing |
| **DeviceOrientation API** | Used for compass bearing; gracefully absent if unavailable |
| **WebGL support** | Required by A-Frame for 3D rendering |
| **Recommended OS** | Android 9+ or iOS 15+ |
| **Recommended browser** | Chrome for Android, Safari for iOS |

---

## Known Limitations

- **GPS accuracy** — outdoor GPS accuracy on consumer smartphones is typically ±3–5 metres, which may cause minor drift in AR waypoint positioning
- **Indoor use** — AR.js location-only mode requires GPS signal; the app will not function correctly indoors or in areas with poor satellite visibility
- **iOS DeviceOrientation** — Safari on iOS 13+ requires a user gesture before granting `DeviceOrientationEvent` permission; compass bearing may not activate automatically on first load
- **AR.js version** — the project uses the `raw.githack.com` CDN build of AR.js; pinning to a specific release tag is recommended for production deployments
- **Same-building destinations** — Computer Tech., Electronics, and Information Tech. departments share identical coordinates as they are co-located; route cylinders will overlap for these three destinations

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: describe your change"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Built for KITS Ramtek Campus &nbsp;·&nbsp; Powered by Next.js, Tailwind CSS, A-Frame, AR.js &amp; Mapbox
</p>