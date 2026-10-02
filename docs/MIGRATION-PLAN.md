# EnRouteAR — Migration notes and integration caveats

The earlier static implementation remains in `vanilla/`. The Next.js application is already in `web/`; the current work redesigns its presentation and documentation, not its framework or navigation engine. Neither directory is declared the currently configured deployment target here.

Older phase-by-phase proposals, screenshots/results, and implementation history are recoverable with `git log -- docs/MIGRATION-PLAN.md` and the corresponding revisions. Historical test claims are not evidence for the current redesign.

## Retained architecture

- Next.js 16 App Router, React 19, JavaScript, Tailwind CSS v4, and the four routes `/`, `/about`, `/contact`, `/navigate`.
- Client navigation orchestration split across `NavigateClient`, `ARViewport`, `MapPanel`, `DestinationBar`, `CompassWidget`, and `MultifunctionButton`.
- Existing camera/location/orientation behavior, local A-Frame/AR.js scripts, Mapbox walking requests, SVG control assets, and destination GLB.
- All 15 original `places.js` records and `geo.js` routing behavior. Neutral `place-labels.js` strings are presentation-only.
- Existing Formspree endpoint and environment fallbacks. No new service or backend.

## Lessons that still matter

### Full-screen camera sizing

AR.js injects video with inline dimensions that can be calculated before a mobile viewport settles. Earlier integration problems produced a narrow camera strip or clipping beneath other stacking contexts. Preserve the runtime full-screen guards: fixed positioning, `100dvh`, `object-fit: cover`, transparent scene rendering, and resize/orientation/video-ready handling.

Keep camera video visible underneath the scene. Hiding or incorrectly covering it can interact badly with mobile browser camera behavior. Do not “simplify” the imperative sizing guards just because a desktop preview looks correct. Test address-bar changes, rotation, and repeated navigation on real devices.

### Gesture decoupling

Manual map touch/drag must disable automatic following and bearing, exposing recenter behavior. GPS updates must not immediately pull a manually explored map back to the user. Preserve Mapbox gesture handlers, pointer-event boundaries, latest-state refs, and controlled recenter behavior. Test pinch/rotate as well as a mouse drag.

### Route and resource cleanup

Replacing or clearing a route must remove old AR entities and Mapbox route sources/layers rather than stacking duplicate routes. Keep the AR camera entity while replacing route entities. Clearing navigation also resets the selected destination and controller flags.

Leaving `/navigate` must release camera tracks, injected video, geolocation watches, orientation/resize listeners, timers, Mapbox markers, and the map instance. A successful first visit does not prove safe client-side re-entry; test multiple enter/exit cycles and slow-loading vendor scripts.

### Cross-route links and assets

Use root-relative app routes or `/#section` links when a destination is on the home page; a bare hash from a subpage can target the wrong document. Keep map attribution/controls reachable and check local vendor/model/icon URLs. Existing manifest assets do not imply a service worker or offline support.

## Current presentation change

The redesign adopts warm ivory, forest, and lime; retains Bricolage Grotesque/Public Sans; centralizes utility-styled primitives and launch/loading/error presentation; uses original inline SVG routes; and makes existing navigation state more readable in a responsive HUD. It does not add search, destinations, authentication, storage, offline navigation, automatic rerouting, or improved sensor precision.

[Architecture](ARCHITECTURE.md) · [Design decisions and research](REDESIGN-PLAN.md) · [Required verification](REDESIGN-PLAN.md#final-verification)
