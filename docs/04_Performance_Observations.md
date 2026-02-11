# Performance Observations — EnRouteAR

> **Date:** February 2026

---

## 1. Current Performance Profile

### 1.1 Page Load Analysis

#### Landing Page (`index.html`)
| Metric                    | Observation |
| ------------------------- | ----------- |
| Total HTML size           | 7 KB (no compression) |
| CSS loaded                | 1 file (2.6 KB) |
| JavaScript                | Inline only (~30 lines) |
| External requests         | 0 (no CDN libraries) |
| Images                    | 1 SVG logo via CSS background |
| **Estimated Load Time**   | Fast (< 1s on broadband) |
| **Render Blocking**       | Minimal — single CSS file |

#### Navigation Page (`navigation.html`)
| Metric                    | Observation |
| ------------------------- | ----------- |
| Total HTML size           | 3.6 KB |
| CSS loaded                | 2 files (Mapbox CSS + navigation-mini.css) |
| JavaScript loaded         | 6 external scripts + 1 inline + 2 local |
| External CDN requests     | 6 total (A-Frame, AR.js ×2, look-at, Mapbox JS, Mapbox CSS) |
| **Estimated Load Time**   | 3–5s (CDN-dependent) |
| **Render Blocking**       | All scripts are render-blocking (no `async`/`defer`) |

### 1.2 Script Size Breakdown (Navigation Page)

| Script                    | Estimated Size | Load Type |
| ------------------------- | -------------- | --------- |
| A-Frame v1.3.0            | ~1.2 MB        | Synchronous CDN |
| AR.js (three.js build)    | ~300 KB        | Synchronous CDN |
| AR.js (A-Frame build)     | ~200 KB        | Synchronous CDN |
| aframe-look-at component  | ~5 KB          | Synchronous CDN |
| Mapbox GL JS v3.2.0       | ~800 KB        | Synchronous CDN |
| places.js                 | 1.4 KB         | Synchronous local |
| script-mini.js            | 5.7 KB         | Synchronous local |
| **Total JavaScript**      | **~2.5 MB**    | **All render-blocking** |

---

## 2. Performance Issues

### 2.1 Critical Issues

#### P1: All Scripts Are Render-Blocking
All `<script>` tags in `navigation.html` lack `async` or `defer` attributes. The browser must download and execute ~2.5 MB of JavaScript before rendering anything.

**Impact:** 3–5 second blank screen on initial load.

**Recommendation:** Use `defer` for non-critical scripts; dynamically import A-Frame and AR.js only when needed.

#### P2: No Code Splitting
The entire navigation logic (545 lines) is loaded as a single file regardless of whether the user has selected a destination.

**Impact:** Unnecessary JavaScript parsing and execution.

**Recommendation:** Split into modules (map init, AR rendering, directions, UI state) and lazy-load.

#### P3: Large Image Assets
`current.png` (user location marker) is 290 KB — disproportionately large for a 30×30px marker.

**Impact:** Adds ~300 KB to initial page weight.

**Recommendation:** Compress to WebP or use SVG. Resize to actual display dimensions.

### 2.2 Moderate Issues

#### P4: No Image Optimization
All marker images are PNG without compression. No responsive image sizing (`srcset`).

**Recommendation:** Use Next.js `<Image>` component for automatic optimization.

#### P5: CDN Dependency for Core Functionality
A-Frame and AR.js are loaded from external CDNs, making the app dependent on third-party uptime and latency.

**Recommendation:** Bundle via npm for reliability and cacheability.

#### P6: Globe Projection on Initial Load
Mapbox initializes with `projection: 'globe'` and `zoom: 0`, then flies to the user's location. This loads world-scale satellite tiles before zooming in.

**Recommendation:** Initialize at a zoom level closer to campus (e.g., zoom 15) and use the user's last known location.

#### P7: No Service Worker / Caching
No offline support. Every page visit requires full re-download of CDN resources.

**Recommendation:** Implement service worker or use Next.js PWA plugin.

### 2.3 Minor Issues

#### P8: Continuous geolocation.watchPosition
High-accuracy GPS tracking runs continuously, draining battery on mobile devices.

**Recommendation:** Reduce `enableHighAccuracy` when not actively navigating; increase `maximumAge`.

#### P9: No Debouncing on Device Orientation
The `deviceorientation` event fires at 60Hz, calling `setMultifunctionImage()` on every tick.

**Recommendation:** Throttle orientation handler to 10–15Hz.

#### P10: Redundant Location Updates
In `watchUserLocation`, `userLocation` is set twice when `isUserInteraction` is false.

**Recommendation:** Remove duplicate assignment.

---

## 3. Performance Improvement Plan (Post-Migration)

| Priority | Improvement | Expected Impact |
| -------- | ----------- | --------------- |
| 🔴 P1    | Dynamic imports for A-Frame/AR.js | -2s load time |
| 🔴 P2    | Code splitting via Next.js | -500ms parse time |
| 🔴 P3    | Image optimization (WebP, resize) | -250 KB transfer |
| 🟡 P4    | Next.js Image component | Auto-optimization |
| 🟡 P5    | npm-bundled dependencies | Reliable caching |
| 🟡 P6    | Smart initial map zoom | -100ms perceived load |
| 🟡 P7    | Service worker / PWA | Offline capability |
| 🟢 P8    | Adaptive GPS accuracy | Battery savings |
| 🟢 P9    | Throttled orientation handler | CPU reduction |
| 🟢 P10   | Code cleanup | Maintainability |

---

## 4. Lighthouse Score Estimates

### Current (Static HTML)

| Category       | Estimated Score | Notes |
| -------------- | --------------- | ----- |
| Performance    | 45–55           | Large render-blocking scripts |
| Accessibility  | 60–70           | Missing ARIA, contrast issues |
| Best Practices | 55–65           | Exposed API keys, no CSP |
| SEO            | 60–70           | Missing meta tags |

### Post-Migration (Next.js)

| Category       | Target Score | Approach |
| -------------- | ------------ | -------- |
| Performance    | 85–95        | Code splitting, image optimization, SSR |
| Accessibility  | 90+          | Semantic HTML, ARIA labels, contrast |
| Best Practices | 90+          | Environment variables, HTTPS, CSP |
| SEO            | 95+          | Meta tags, OG, structured data, sitemap |
