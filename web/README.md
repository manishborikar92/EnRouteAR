# EnRouteAR web application

Next.js 16 / React 19 / JavaScript / Tailwind CSS v4. This is the four-route browser AR walking-wayfinding application, not a new scaffold.

## Development

Use **Node.js >=20.9**. The current verification environment is **Node.js 22.23.3**.

```bash
# From this directory
npm ci
npm run dev
```

Open <http://localhost:3000>. Optional public environment overrides belong in `web/.env.local`; see [Environment variables](../docs/ENVIRONMENT-VARS.md). Never commit environment credentials.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js development server |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run start` | Serve an already completed production build |

There is no `npm test` script in `package.json`. Do not report a test suite as passing without running a named check.

The baseline `npm run lint` encountered a pre-existing shell permission problem in `node_modules/.bin`; `node node_modules/eslint/bin/eslint.js .` passed at baseline. If that wrapper error recurs, the direct command runs the same installed ESLint without changing package files. Final lint/build/browser results are tracked in [Final verification](../docs/REDESIGN-PLAN.md#final-verification), not inferred from baseline results.

## Routes and code entry points

| Route | Entry | Responsibility |
| --- | --- | --- |
| `/` | `src/app/page.js` | Introduce walking wayfinding and launch navigation |
| `/about` | `src/app/about/page.js` | Explain the experience, technology, and limitations |
| `/contact` | `src/app/contact/page.js` | Feedback and the existing Formspree form |
| `/navigate` | `src/app/navigate/page.js` | Page shell for `NavigateClient` and the sensor-driven HUD |

- `src/app/globals.css`: Tailwind import and CSS-first theme tokens only; style components with utilities.
- `src/components/ui/Primitives.js`: shared layout, typography, link, and button presentation; shared `LoadingState`/`ErrorState` support route boundaries.
- `src/components/common/LaunchButton.js`: reusable permission-first launch flow, preserving navigation on denial or timeout.
- `src/components/navigation/`: camera/AR viewport, map, compass, destination picker, and unchanged navigation controller.
- `src/lib/places.js`: 15 fixed records; preserve internal names and coordinates.
- `src/lib/place-labels.js`: neutral labels for display only, not a data migration.
- `src/lib/geo.js`: existing walking requests and geometry helpers; preserved by the redesign.
- `public/vendor/`: local A-Frame, AR.js, and supporting scripts. Do not replace the engine as part of UI work.

The design uses ivory/forest/lime tokens, Bricolage Grotesque + Public Sans through `next/font`, and original inline SVG route illustrations without adding an animation library.

## Validation boundaries

The destination list is fixed: there is no search, new destination coverage, authentication, database, offline navigation, or automatic rerouting. Distance/time summaries come from the existing route response, not a new trip-progress engine.

Camera, GPS, and heading require a compatible device and a secure context; physical Android Chrome and iOS Safari validation remains required. Accuracy is sensor-dependent, not guaranteed sub-meter. See [Contributing](../docs/CONTRIBUTING.md) for permission, resize, gesture, and cleanup checks.

`vanilla/` remains unchanged. These docs do not establish a configured deployment target. Start with the [documentation index](../docs/PROJECT-OVERVIEW.md) for architecture and current scope.
