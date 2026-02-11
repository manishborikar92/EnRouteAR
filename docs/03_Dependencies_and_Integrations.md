# Dependencies & Integrations — EnRouteAR

> **Date:** February 2026

---

## 1. External Libraries (CDN-loaded)

### 1.1 A-Frame (v1.3.0)
- **URL:** `https://aframe.io/releases/1.3.0/aframe.min.js`
- **Purpose:** WebXR/VR framework for rendering the AR scene with camera feed.
- **Usage:** Creates the `<a-scene>` element, handles camera access, renders 3D entities.
- **Notes:** Version 1.3.0 is significantly outdated. Current versions offer better WebXR support and performance.

### 1.2 A-Frame Look-At Component (v0.8.0)
- **URL:** `https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js`
- **Purpose:** Makes A-Frame entities always face the camera.
- **Usage:** Used with `look-at="[gps-new-camera]"` attribute on entity labels (currently commented out).

### 1.3 AR.js — Three.js Location Module
- **URL:** `https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js`
- **Purpose:** GPS-based location AR for three.js (underlying A-Frame renderer).
- **Usage:** Provides `gps-new-entity-place` and `gps-new-camera` components.
- **Risk:** Loads from `raw.githack.com` pointing to `master` branch — no version pinning.

### 1.4 AR.js — A-Frame Build
- **URL:** `https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js`
- **Purpose:** A-Frame integration layer for AR.js.
- **Risk:** Same `master` branch concern as above.

### 1.5 Mapbox GL JS (v3.2.0)
- **URL (JS):** `https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js`
- **URL (CSS):** `https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css`
- **Purpose:** Interactive 2D/3D satellite map rendering, navigation controls.
- **Usage:** Map container, markers, GeoJSON route layers, fly-to animations.

---

## 2. External APIs

### 2.1 Mapbox Directions API
- **Endpoint:** `https://api.mapbox.com/directions/v5/mapbox/walking/{coords}?access_token={key}&geometries=geojson`
- **Method:** GET
- **Purpose:** Calculates walking routes between user location and selected destination.
- **Response Used:** `routes[0].geometry.coordinates` — array of `[lng, lat]` coordinate pairs.
- **Access Token:** `pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw`
- **⚠ Security:** Token is hardcoded in multiple files. Should be stored in environment variables.

### 2.2 Formspree
- **Endpoint:** `https://formspree.io/f/mgegpkeb`
- **Method:** POST (form submission)
- **Purpose:** Processes contact form submissions without a custom backend.
- **Fields:** `name`, `email`, `message`

---

## 3. Browser APIs Used

| API                        | Purpose                                     | Fallback |
| -------------------------- | ------------------------------------------- | -------- |
| **Geolocation API**        | Get and watch user's GPS coordinates        | Alert dialog |
| **DeviceOrientation API**  | Read compass heading from device sensors    | No rotation |
| **getUserMedia (WebRTC)**  | Camera access for AR feed (via A-Frame)     | No AR |
| **WebXR Device API**       | AR session management (via A-Frame/AR.js)   | 2D only |

---

## 4. Static Assets

### 4.1 3D Models
| File                        | Format | Size    | Purpose |
| --------------------------- | ------ | ------- | ------- |
| `map_pointer_3d_icon.glb`   | glTF   | 128 KB  | 3D destination marker in AR scene |

### 4.2 UI Icons (PNG)
| File            | Size   | Purpose |
| --------------- | ------ | ------- |
| `bearing.png`   | 22 KB  | Multifunction button — bearing state |
| `centered.png`  | 24 KB  | Multifunction button — centered state |
| `compass.png`   | 25 KB  | Compass widget background |
| `current.png`   | 290 KB | User location marker on map |
| `current2.png`  | 32 KB  | Alternative user marker (unused) |
| `recenter.png`  | 23 KB  | Multifunction button — recenter state |
| `reset-all.png` | 25 KB  | Multifunction button — reset state |

### 4.3 Brand Assets
| File                            | Format | Size    |
| ------------------------------- | ------ | ------- |
| `logo-transparent-svg.svg`      | SVG    | 16 KB   |
| `logo-transparent-svg 1x1.svg`  | SVG    | 101 KB  |
| `logo-transparent-png.png`      | PNG    | 197 KB  |
| `logo-transparent-png 1x1.png`  | PNG    | 273 KB  |

---

## 5. Integration Diagram

```
┌──────────────────────────────────────────────────────────┐
│                      Client Browser                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │              Navigation Page                       │   │
│  │                                                    │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │   │
│  │  │ A-Frame  │  │  AR.js   │  │  Mapbox GL JS  │   │   │
│  │  │ v1.3.0   │──│ (master) │  │    v3.2.0      │   │   │
│  │  └────┬─────┘  └────┬─────┘  └───────┬────────┘   │   │
│  │       │              │                │            │   │
│  │       │   ┌──────────┴────────┐       │            │   │
│  │       └───│    script.js      │───────┘            │   │
│  │           │  (545 lines)      │                    │   │
│  │           └──────────┬────────┘                    │   │
│  │                      │                             │   │
│  └──────────────────────┼─────────────────────────────┘   │
│                         │                                 │
│  ┌──────────────────────┼─────────────────────────────┐   │
│  │              Landing Page                          │   │
│  │                                                    │   │
│  │  ┌──────────────┐  ┌──────────────────────────┐    │   │
│  │  │  index.css   │  │  Inline JS (geolocation) │    │   │
│  │  └──────────────┘  └──────────────────────────┘    │   │
│  └────────────────────────────────────────────────────┘   │
└──────────────────────┬────────────────────────────────────┘
                       │
         ┌─────────────┼──────────────┐
         │             │              │
         ▼             ▼              ▼
  ┌────────────┐ ┌──────────┐ ┌──────────┐
  │  Mapbox    │ │ Geoloc.  │ │Formspree │
  │ Directions │ │   API    │ │   API    │
  │    API     │ │          │ │          │
  └────────────┘ └──────────┘ └──────────┘
```

---

## 6. Security Considerations

| Issue                    | Severity | Description |
| ------------------------ | -------- | ----------- |
| Exposed API Key          | 🔴 High  | Mapbox access token is hardcoded in HTML and JS, visible in page source. |
| Unpinned CDN Dependency  | 🟡 Medium| AR.js loads from `master` branch — could change unexpectedly. |
| No CSP Headers           | 🟡 Medium| No Content-Security-Policy; vulnerable to injection. |
| No HTTPS enforcement     | 🟢 Low   | Vercel provides HTTPS by default, but no redirect rules defined. |

---

## 7. Migration Impact Assessment

| Dependency          | Migration Strategy |
| ------------------- | ---- |
| A-Frame + AR.js     | Load as client-side-only dynamic imports (no SSR) via `next/dynamic` |
| Mapbox GL JS        | Install via npm (`mapbox-gl`), use as client component |
| Formspree           | Replace with Next.js API route or keep as external service |
| places.js data      | Convert to TypeScript module with typed interfaces |
| Static assets       | Move to `public/` directory in Next.js project |
