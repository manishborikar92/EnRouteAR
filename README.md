# EnRouteAR

**Augmented Reality campus navigation for smartphones — powered by A-Frame, AR.js, and Mapbox.**

EnRouteAR overlays GPS-accurate 3D waypoints and walking routes directly onto your live camera feed, letting you navigate Kavikulguru Institute of Technology and Science (KITS), Ramtek without ever looking down at a traditional map.

🌐 **Live demo:** [enroutear.vercel.app](https://enroutear.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
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
| **Responsive landing page** | Animated hero, scroll-reveal sections, mobile navigation, and a contact form |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| AR framework | [A-Frame](https://aframe.io/) | 1.3.0 |
| Location-based AR | [AR.js](https://ar-js-org.github.io/AR.js-Docs/) (location-only build) | latest |
| 3D engine | Three.js | bundled with AR.js |
| 2D mapping | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) | 3.2.0 |
| Walking directions | [Mapbox Directions API](https://docs.mapbox.com/api/navigation/directions/) | v5 |
| Fonts | [Google Fonts](https://fonts.google.com/) — Orbitron, Outfit | — |
| Hosting | [Vercel](https://vercel.com/) | — |
| Language | Vanilla HTML, CSS, JavaScript (ES2020+) | — |

No build tools, bundlers, or frameworks are required. The project runs directly in the browser from static files.

---

## Project Structure

```
enroutear/
│
├── index.html              # Landing page
├── navigation.html         # AR navigation view
│
├── styles/
│   ├── index.css           # Landing page styles
│   └── navigation.css      # Navigation view styles
│
├── scripts/
│   ├── places.js           # Campus location coordinates
│   └── script.js           # Navigation logic (map, AR, GPS, compass)
│
├── models/
│   ├── map_pointer_3d_icon.glb   # Destination pointer (3D model)
│   ├── compass.png               # Compass indicator image
│   ├── current.png               # Current-location marker image
│   ├── centered.png              # Multifunction button — centred state
│   ├── bearing.png               # Multifunction button — bearing state
│   ├── recenter.png              # Multifunction button — recenter state
│   └── reset-all.png             # Multifunction button — reset state
│
└── favicon/
    ├── apple-touch-icon.png
    ├── favicon-32x32.png
    ├── favicon-16x16.png
    └── site.webmanifest
```

---

## Getting Started

### Prerequisites

- A modern smartphone with a rear-facing camera
- A browser that supports the [Geolocation API](https://caniuse.com/geolocation), [DeviceOrientation API](https://caniuse.com/deviceorientation), and [WebGL](https://caniuse.com/webgl)
- Recommended: **Android Chrome** or **iOS Safari 15+**
- HTTPS is required — the Geolocation and Camera APIs will not work over plain HTTP

### Running locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/enroutear.git
   cd enroutear
   ```

2. **Serve over HTTPS**

   The app requires HTTPS for camera and GPS access. Use any local HTTPS server. A quick option with [ngrok](https://ngrok.com/):

   ```bash
   # Start any static file server on port 8080
   npx serve . -l 8080

   # In a separate terminal, expose it over HTTPS
   ngrok http 8080
   ```

   Then open the ngrok HTTPS URL on your phone.

   Alternatively, deploy directly to Vercel or Netlify — both serve over HTTPS by default.

3. **Grant permissions**

   When the navigation page loads, the browser will request:
   - **Camera** — required for the AR view
   - **Location** — required for GPS positioning and route calculation

### Mapbox access token

The Mapbox token in `script.js` and `navigation.html` is scoped to the project's domain. If you fork this project and deploy to a different domain, you will need to replace it with your own token from [account.mapbox.com](https://account.mapbox.com/).

```js
// script.js — line 42
const MAPBOX_TOKEN = 'your_token_here';
```

```html
<!-- navigation.html — head section -->
<script>
    mapboxgl.accessToken = 'your_token_here';
</script>
```

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

Open `scripts/places.js` and append an entry to the `places` array:

```js
{ name: 'New Building', latitude: 21.38600, longitude: 79.30650 },
```

No other changes are needed — the destination dropdown is populated dynamically from this array.

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

Using `renderer="alpha: true"` keeps the `<video>` element visible in the DOM at all times. This is important for Android Chrome stability — hiding the video element (as `videoTexture: true` does) causes the browser's power manager to suspend the camera stream after approximately one second, resulting in a black screen.

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
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please keep changes focused and test on a physical mobile device before submitting.

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
  Built for KITS Ramtek Campus &nbsp;·&nbsp; Powered by A-Frame, AR.js &amp; Mapbox
</p>