# EnRouteAR — Maintenance brief

This file replaces the superseded migration prompt. `web/` is already a Next.js application; do not re-scaffold it. Use Git history for the earlier prompt rather than treating its speculative requirements as current scope.

## Read first

1. [Project overview](PROJECT-OVERVIEW.md) and [Web README](../web/README.md).
2. [Current redesign decisions and verification](REDESIGN-PLAN.md).
3. [Architecture](ARCHITECTURE.md) and [sensor integration caveats](MIGRATION-PLAN.md).
4. The relevant source, `git status`, and existing diff before changing anything.

## Preserve these boundaries

- Four routes: `/`, `/about`, `/contact`, `/navigate`.
- Next.js 16, React 19, JavaScript, Tailwind v4, and existing packages; Node >=20.9, with Node 22.23.3 used in the current verification environment.
- The 15 original names/coordinates in `web/src/lib/places.js`, `findPlaceByName` selection behavior, and `web/src/lib/geo.js`. Neutral labels in `place-labels.js` are UI-only.
- The existing local A-Frame/AR.js integration, Mapbox walking API, sensor behavior, multifunction controller, and cleanup. No engine swap.
- Formspree's existing endpoint/fallback behavior and public environment-variable names. Never read or publish private environment values for documentation work.
- `vanilla/` remains unchanged.

The product is location-independent browser AR walking wayfinding, not unlimited destination coverage. There is no search, new destination set, authentication, database, offline capability, or automatic rerouting. GPS/heading accuracy is hardware- and environment-dependent, not guaranteed sub-meter.

## Presentation and completion

Follow the ivory/forest/lime tokens and existing Bricolage Grotesque/Public Sans fonts. Keep `globals.css` theme-only, style with utilities, and reuse `Primitives.js`, `LaunchButton.js`, and loading/error states. Use original inline SVG illustrations and no new animation dependency. The responsive HUD may explain existing state and route estimates, but must not alter the state machine or invent trip progress.

Verify exact affected flows and record actual commands/results in [Final verification](REDESIGN-PLAN.md#final-verification). Baseline direct ESLint success is not final lint/build/test evidence. Physical-device camera, orientation, GPS, gesture, and cleanup validation remains required. Do not claim a deployment target or rollout without checking the authorized hosting configuration.
