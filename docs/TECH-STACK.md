# EnRouteAR — Technology stack

Package declarations in [`web/package.json`](../web/package.json) and resolutions in `web/package-lock.json` are authoritative. The redesign keeps the existing stack and introduces no animation library.

## Application and tooling

| Technology | Current declaration / role |
| --- | --- |
| Next.js | `16.3.6`; App Router, metadata, development/build tooling |
| React / React DOM | `19.2.4`; server page shells and browser-side interactive components |
| JavaScript | `.js` modules and JSX; no TypeScript migration |
| Node.js | **>=20.9**; current verification environment **22.23.3** |
| npm | Existing package manager and lockfile; use `npm ci` for reproducible installation |
| Tailwind CSS / `@tailwindcss/postcss` | v4; CSS-first theme tokens and component utility classes |
| ESLint / `eslint-config-next` | v9 / `16.3.6`; existing static checks |
| Lucide React | `^1.48.0`; UI icons |
| Sonner | `^2.0.8`; existing navigation feedback toasts |
| Bricolage Grotesque / Public Sans | Existing display/body fonts loaded with `next/font/google` |

`globals.css` is the Tailwind import and theme entry point. The ivory/forest/lime design, shared primitives, and original inline SVG route artwork do not require a component-suite or motion dependency. Google font retrieval can require network access during the build; report fetch failures as build-environment limitations rather than silently changing fonts.

## Maps and AR

| Integration | Actual use |
| --- | --- |
| Mapbox GL JS | `^3.31.0`; interactive satellite-streets map, position/destination markers, route line |
| Mapbox Directions API v5 | `mapbox/walking`; explicit origin-to-existing-destination requests |
| Local A-Frame | `public/vendor/aframe.min.js`; 3D entity scene and bundled Three.js rendering |
| Local AR.js | `public/vendor/aframe-ar.js`; existing GPS-based AR integration |
| AR-ThreeX location helper | `public/vendor/ar-threex-location-only.js`; retained supporting runtime |
| A-Frame look-at component | `public/vendor/aframe-look-at-component.min.js`; retained supporting script |
| GLB destination model | `public/models/map_pointer_3d_icon.glb` |

Vendored files, not a runtime CDN's current release, determine the AR runtime. Preserve their existing load order and integration. [AR.js upstream](https://github.com/AR-js-org/AR.js) explains the available builds; its latest examples are not an instruction to replace or upgrade this app's engine.

## Browser APIs and external form

- **Geolocation:** initial position and ongoing location watch. High-accuracy requests do not guarantee precise coordinates.
- **DeviceOrientation:** heading feedback where supported; iOS permission/gesture behavior needs physical testing.
- **MediaDevices / camera:** AR.js camera video in a secure context.
- **WebGL:** A-Frame and Mapbox rendering. Do not describe this as a newly implemented WebXR session or guaranteed ARKit/ARCore integration.
- **Fetch / Formspree:** direct JSON submission from the existing contact form with pending/success/failure feedback.

There is no authentication, database, geocoding/search, offline-navigation service, automatic rerouting, or newly installed test framework. `package.json` currently has no `test` script. No frame-rate, build-time, accessibility-conformance, or device-support benchmark is claimed.

For setup and actual check status, see the [Web README](../web/README.md), [Contributing](CONTRIBUTING.md), and [Final verification](REDESIGN-PLAN.md#final-verification). Deployment configuration must be confirmed independently.
