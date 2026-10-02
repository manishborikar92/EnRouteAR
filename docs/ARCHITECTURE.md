# EnRouteAR — Architecture

## Rendering and component boundaries

The Next.js 16 App Router application lives in `web/` and uses JavaScript with React 19. Keep content and page shells as Server Components; isolate hooks, DOM access, permissions, and sensors in Client Components.

| Route | Structure |
| --- | --- |
| `/` | Product introduction with shared header/footer, original route illustration, and client launch action |
| `/about` | Product explanation and practical limitations within a server page shell |
| `/contact` | Server page shell with the client-side `ContactForm` |
| `/navigate` | Server page shell containing the client-side `NavigateClient` subsystem |

`layout.js` owns fonts, metadata, and toast infrastructure. Route `loading.js` and `error.js` boundaries share loading/error presentation. Metadata helpers, `robots.js`, `sitemap.js`, and the manifest describe the app; they do not supply offline functionality. Browser behavior is not determined by whether a page shell is prerendered.

## UI layer

- `src/app/globals.css` contains the Tailwind v4 import and `@theme`/`@theme inline` tokens, not a global component stylesheet.
- `components/ui/Primitives.js` centralizes common containers, headings, link treatments, and button presentation.
- `LoadingState` and `ErrorState` provide consistent route-boundary feedback.
- `components/common/LaunchButton.js` preserves the location-check-then-route flow, including entry after denied/timed-out location requests.
- Landing illustrations are original inline SVGs; no animation dependency or external image service is introduced.
- The responsive navigation HUD presents existing location/request/route state without changing routing or the controller state machine.

See [Design decisions](REDESIGN-PLAN.md#design-decisions) for tokens and interaction rationale.

## Navigation data flow

```text
Existing destination selection + current browser GPS position
    → findPlaceByName in lib/places.js
    → getWalkingDirections in lib/geo.js
    → Mapbox Directions v5 / mapbox/walking
    → first route's geometry, distance, and duration
        ├─ MapPanel: satellite map, markers, and route line
        ├─ ARViewport: interpolated GPS entities + destination GLB
        └─ HUD: route summary derived from the existing response
```

`NavigateClient` owns selected/active destination, position, directions response, request-in-progress state, and the map controller flags. Geolocation uses an initial request plus a continuous watch; unmount clears the watch. Position updates do **not** automatically fetch a new route.

`lib/places.js` remains the fixed set of **15 records**. Original names are internal selection/lookup values; latitude/longitude values and duplicate coordinates remain untouched. `lib/place-labels.js` maps those values to neutral display labels for UI surfaces. Labels must not be passed back as replacement lookup keys or used to imply wider destination coverage.

`lib/geo.js` retains the walking API request, Haversine distance, and interpolation helpers. AR route segments use approximately two-meter spacing for visualization, not a positioning-accuracy guarantee. Mapbox coordinate arrays are `[longitude, latitude]`; source records use named `latitude` and `longitude` fields.

## Existing multifunction controller

Mode selection has ordered precedence in `NavigateClient`:

| Condition, in order | Mode |
| --- | --- |
| Active destination, map centered, bearing enabled | `reset-all` |
| Map centered, bearing disabled | `centered` |
| User map interaction active | `recenter` |
| Bearing enabled | `bearing` |
| Otherwise | `centered` |

The click handler is similarly state-based:

- An active destination with centered/bearing flags clears the destination, selection, route response, bearing, and interaction state.
- Otherwise, a centered map toggles bearing.
- Otherwise, the control recenters and clears the manual-interaction flag.

A touch/drag interaction decouples map following and disables bearing. A successful route request recenters and enables bearing. Presentation changes must not reinterpret these transitions as a new navigation workflow.

## AR and map lifecycle

`ARViewport` loads these local files sequentially:

1. `/vendor/aframe.min.js`
2. `/vendor/aframe-look-at-component.min.js`
3. `/vendor/ar-threex-location-only.js`
4. `/vendor/aframe-ar.js`

The A-Frame scene uses a transparent renderer over camera video, `gps-new-camera`, interpolated cylinder entities, and `/models/map_pointer_3d_icon.glb`. It is the existing AR.js location integration, not a new WebXR session implementation.

Preserve the full-screen camera sizing guards: fixed viewport positioning, `100dvh`, `object-fit: cover`, and reapplication after video load, resize, and orientation changes. Earlier AR.js inline sizing could create a clipped video strip. Keep camera video visible beneath the transparent scene rather than hiding it; mobile camera behavior needs device validation.

`MapPanel` owns Mapbox GL JS, the satellite-streets style, location/destination markers, route source/layer, gestures, and heading updates. Refs avoid recreating the map on every location or controller change. Map gestures must remain isolated from page gestures and must stop GPS updates from forcibly recentering a manually explored map.

Route changes/reset remove old AR entities and map route data. Unmount must stop camera tracks, remove injected video, dispose of the map and markers, and detach sensor/resize listeners and timers. Verify this through repeated client-side entry/exit, not just a full page reload. See [Migration caveats](MIGRATION-PLAN.md).

## External data and operational limits

- Mapbox receives route origin/destination coordinates and serves map resources. Internet access, valid public-token permissions, and provider coverage are required.
- `ContactForm` posts name, email, and message to the configured Formspree endpoint. Existing fallback behavior remains.
- There is no application authentication, database, route storage service, search, offline routing, or automatic rerouting.
- A route distance/time summary is an estimate from the selected response, not live trip progress.
- Camera/GPS/heading access depends on secure contexts, browser permissions, and real hardware. GPS and compass drift remain possible; no sub-meter or indoor reliability claim is supported.

[Public configuration](ENVIRONMENT-VARS.md) · [Technology stack](TECH-STACK.md) · [Final verification](REDESIGN-PLAN.md#final-verification)
