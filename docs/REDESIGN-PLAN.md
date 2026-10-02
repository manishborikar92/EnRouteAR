# EnRouteAR — Redesign decisions and verification

## Scope

This is a presentation and documentation redesign of the existing browser AR walking-wayfinding app, not a new application migration. Keep Next.js 16, React 19, JavaScript, Tailwind v4, and the four routes `/`, `/about`, `/contact`, `/navigate`. Keep `vanilla/` untouched.

The product language is location-independent. The data is still the **15 fixed records in `web/src/lib/places.js`**, with original names and coordinates intact. `web/src/lib/place-labels.js` provides neutral UI-only labels; selection values and lookup/routing behavior remain unchanged. This is not expanded geographic coverage.

### Preserved behavior

- Shared launch action checks location and then opens `/navigate`, including denial/timeout fallback.
- Local A-Frame/AR.js scripts, GPS/camera/orientation integration, route markers, map controls, and cleanup remain in place.
- Existing `geo.js` walking Directions API logic, coordinate ordering, and fallback configuration remain unchanged.
- Navigation HUD status and distance/time summary read the existing state/route response. They do not introduce new telemetry, continuous remaining-distance tracking, or a new state machine.
- The contact form retains Formspree, its existing endpoint fallback, and pending/success/failure handling.

No search, new destinations, authentication, database, saved routes, offline support, or automatic rerouting is part of this work. Accuracy depends on GPS and sensors; sub-meter or indoor reliability must not be claimed. No deployment configuration or rollout is implied.

## Design decisions

| Area | Decision |
| --- | --- |
| Product message | Explain the walking outcome first, then show AR and map context; avoid technology-first jargon and unsupported precision claims |
| Palette | Warm ivory `#f5f4ee`, forest ink `#172d29`, muted `#52645e`, lime `#d7ef85`; use quiet surfaces and a distinct camera HUD |
| Typography | Retain Bricolage Grotesque for display and Public Sans for body/UI through existing `next/font` setup |
| Styles | Keep `globals.css` theme-only: Tailwind import plus `@theme`/`@theme inline`; use component utilities rather than global component selectors |
| Reuse | `components/ui/Primitives.js`, `common/LaunchButton.js`, and shared `LoadingState`/`ErrorState` avoid repeated layout/action/boundary implementations |
| Illustration | Original inline SVG routes explain the experience without external imagery or a new animation dependency; examples are illustrative, not live destination data |
| Navigation | Semantic links and a disclosure button for compact navigation, with expanded/control state, keyboard operation, and visible focus; not an ARIA application menu |
| Touch | Aim for at least 44×44 CSS-pixel primary controls, comfortably beyond the 24×24 minimum target-size criterion; verify actual rendered targets |
| Responsive layout | Start with useful single-column content and add columns where the content fits; check compact landscape and short viewports as well as width |
| HUD | Keep destination selection, readable state/route summary, map, compass, and existing multifunction control usable without obscuring the whole camera view |
| Motion | Functional CSS feedback only, respecting reduced-motion preferences; no animation package |
| Safety | Explain permissions and GPS limitations; encourage stopping to check orientation, lowering the phone, and watching the path |

These are design choices and implementation constraints, not a claim of complete WCAG conformance or verified support on every browser.

## Research references

References inform specific decisions; no assets, copy, or complete layouts are reproduced.

| Reference | Applied lesson |
| --- | --- |
| [Citymapper](https://citymapper.com/) | Outcome-first messaging: explain how the product helps someone get around before naming its implementation stack |
| [Mapbox Navigation](https://www.mapbox.com/navigation) | Map-first product storytelling and clear route context; do not import unrelated SDK features such as offline navigation into this app's claims |
| [Google Maps AR/Lens walking guidance](https://support.google.com/maps/answer/9332056?hl=en) | Pair AR orientation with map context and safe walking reminders; this app does not inherit Google's localization or device capabilities |
| [WAI-ARIA disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) | Prefer semantic navigation, links, disclosure buttons, and keyboard support over unnecessary `menu`/`menubar` roles; still test with assistive technology |
| [WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The minimum is 24×24 CSS pixels with exceptions; 44px primary controls deliberately exceed that minimum |
| [web.dev macro layouts](https://web.dev/learn/design/macro-layouts) | Preserve a sensible content order, then use grid/flex and content-driven responsive changes |
| [Tailwind theme variables](https://tailwindcss.com/docs/theme) | CSS-first tokens and `@theme inline` references for the existing font variables |
| [AR.js upstream](https://github.com/AR-js-org/AR.js) | Retain the current location-based integration and local script delivery; an upstream example is not a reason to swap engines |

## Acceptance checklist

- [ ] All four routes, shared navigation, launch actions, contact states, and loading/error/404 views have consistent presentation.
- [ ] UI labels are neutral while all 15 source records, internal names, coordinates, and `geo.js` remain unchanged.
- [ ] Destination selection still uses the native existing list; route requests and the four-mode controller retain their behavior.
- [ ] Metadata, manifest, structured data, and current documentation match the product without claiming new features or accuracy.
- [ ] Narrow/mobile, tablet, desktop, zoomed, and short landscape layouts remain readable; the HUD does not block essential map/control actions.
- [ ] Keyboard navigation, disclosure close/focus behavior, labels, visible focus, pending feedback, and reduced-motion behavior are checked.
- [ ] Route reset and route exit remove stale entities, map sources, watchers, listeners, timers, and camera streams as intended.
- [ ] Physical-device camera/GPS/heading checks are recorded separately from simulated-browser checks.

## Final verification

**Status at documentation handoff: final verification pending.** The implementation owner must update this section with actual commands, results, and remaining gaps after the combined redesign. Do not treat historical checks or baseline lint as final approval.

| Check | Evidence / status |
| --- | --- |
| Runtime | Node.js 22.23.3 in the current environment; Next.js requires Node >=20.9 |
| Baseline `npm run lint` in `web/` | Blocked by a pre-existing shell permission error in `node_modules/.bin` |
| Baseline direct ESLint | `node node_modules/eslint/bin/eslint.js .` passed before the combined redesign; final rerun pending |
| Final lint | Pending implementation-owner verification |
| Production build | Pending; no successful redesign build claimed |
| Automated tests | Pending; `package.json` has no `test` script, so name any ad hoc checks and their results explicitly |
| Browser/HTTP and responsive smoke checks | Pending; cover all routes, metadata/assets, menu/launch actions, and mocked contact/routing success and failure |
| Data and behavior parity | Pending final check that all 15 records, routing helpers, existing fallbacks, controller transitions, and `vanilla/` are preserved |
| Physical Android Chrome / iOS Safari | Required and not yet validated for this redesign: permissions, camera sizing, orientation, walking GPS, gestures, route reset, and re-entry |
| Deployment | Not performed or established by this documentation update; confirm host, app root, HTTPS, and public configuration separately |

See [Contributing](CONTRIBUTING.md) for the manual checklist and [Migration notes](MIGRATION-PLAN.md) for camera, gesture, and cleanup regressions to watch for. Older speculative plans and historical results remain available through Git history; they are not current verification evidence.
