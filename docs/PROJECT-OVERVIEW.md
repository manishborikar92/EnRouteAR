# EnRouteAR — Project overview

EnRouteAR is a location-independent browser AR walking-wayfinding product. The camera view supplies directional context, while a satellite map makes the requested walking route easier to understand. The interface is not tied to a particular venue or organization.

**Coverage remains limited to the 15 hardcoded records in `web/src/lib/places.js`.** Their internal names, coordinates, and lookup behavior are preserved. `web/src/lib/place-labels.js` supplies neutral UI labels only; it does not discover places or create new destinations.

## User flow

1. Read the introduction at `/` or the explanation at `/about`.
2. Use the shared launch action to open `/navigate`; a preliminary location request does not prevent entry when denied or timed out.
3. Grant supported camera/location permissions and wait for a GPS fix.
4. Select an existing destination and explicitly request a Mapbox walking route.
5. View that geometry on the map and as GPS-anchored AR markers, with a route estimate and readable status derived from existing state.
6. Explore the map, recenter, follow heading, or clear the route through the existing controls.
7. Send feedback at `/contact` through the existing Formspree form.

The app does not offer search, custom destinations, sign-in, a database, saved routes, offline navigation, or automatic rerouting. It does not detect obstacles. Estimated distance/time is not continuous remaining-distance/ETA tracking.

## Implementation and limits

`web/` uses Next.js 16 App Router, React 19, JavaScript, Tailwind CSS v4, Mapbox GL JS, and locally served A-Frame/AR.js scripts. Four public page routes remain. `vanilla/` is preserved as the earlier static implementation, not changed by the redesign.

The interface uses ivory, forest, and lime with Bricolage Grotesque and Public Sans, reusable utility-styled components, and original inline SVG illustrations. Camera/map integration and the navigation state machine remain the behavioral baseline.

Accuracy depends on GPS, orientation sensors, browser support, and map coverage. Sub-meter accuracy and reliable indoor positioning are not promised. Use a secure context, stop safely to check directions, and keep attention on the surroundings. Real-device validation remains required; no production deployment target is established by these notes.

## Documentation index

| Guide | Use it for |
| --- | --- |
| [Repository README](../README.md) | Product introduction and quick start |
| [Web README](../web/README.md) | App commands and entry points |
| [Architecture](ARCHITECTURE.md) | Rendering boundaries, routing flow, controller, and cleanup |
| [Technology stack](TECH-STACK.md) | Existing packages, browser APIs, and tooling |
| [Environment variables](ENVIRONMENT-VARS.md) | Public configuration and preserved fallbacks |
| [Contributing](CONTRIBUTING.md) | Local workflow and manual regression checklist |
| [Redesign plan](REDESIGN-PLAN.md) | Current design decisions, references, and final verification |
| [Project structure](Project%20Structure.md) | Short directory map |
| [Migration notes](MIGRATION-PLAN.md) | Retained integration lessons from the earlier implementation |
| [Maintenance brief](MIGRATION-PROMPT.MD) | Constraints for continuing this work |
| [Earlier-plan pointer](EnRouteAR.md) | Where superseded proposals went |

Use **Node.js >=20.9**; the current verification environment is Node.js 22.23.3. Final build, browser, and device results belong in [Final verification](REDESIGN-PLAN.md#final-verification).
