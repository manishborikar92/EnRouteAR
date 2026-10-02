# EnRouteAR

**Browser-based AR walking wayfinding, with a map for context.**

EnRouteAR combines a live camera view, GPS-anchored route markers, and a satellite map to help people orient themselves on foot. Open it in a compatible mobile browser, choose an available destination, and request a walking route. No account or native app installation is required.

The product and interface are location-independent; the current destination coverage is not. This version retains **15 fixed destination records**. Neutral display labels do not add places or change their coordinates.

## What is here

- Four routes: `/`, `/about`, `/contact`, and `/navigate`.
- Next.js 16 App Router, React 19, JavaScript, and Tailwind CSS v4 in [`web/`](web/README.md).
- Local A-Frame/AR.js vendor scripts for the camera scene and GPS-anchored markers.
- Mapbox GL JS satellite-streets map and the Mapbox Directions API's walking profile.
- Live browser location updates, device-heading feedback, and the existing center/bearing/recenter/reset controls.
- A contact form using the existing Formspree endpoint, with configurable public environment values and preserved fallbacks.

There is **no destination search, destination editor, authentication, database, saved-route service, offline navigation, or automatic rerouting**. GPS updates move the position marker; a route request is still an explicit action. A manifest is not evidence of offline support.

## Run locally

Use **Node.js >=20.9**; the current verification environment is **Node.js 22.23.3**. Run app commands from `web/`:

```bash
cd web
npm ci
npm run dev
```

Open <http://localhost:3000>. For optional public configuration, create `web/.env.local` using the placeholders in [Environment variables](docs/ENVIRONMENT-VARS.md). Do not commit private credentials or copy existing environment files into documentation.

```bash
npm run lint
npm run build
npm run start  # after a successful build
```

**Verification status:** baseline `npm run lint` was blocked by a pre-existing `node_modules/.bin` shell permission error; direct `node node_modules/eslint/bin/eslint.js .` passed at baseline. This is not a final redesign result. Build, browser, and device validation must be recorded in [Final verification](docs/REDESIGN-PLAN.md#final-verification).

## Try navigation safely

1. Use HTTPS on a phone, or a browser-recognized secure localhost setup for development. A plain HTTP LAN address is usually insufficient for camera/location access.
2. Choose **Start navigating**. The launch flow checks location, then opens `/navigate` even when that check fails; entering the page does not mean permission was granted.
3. Allow camera and location access. Heading permissions and sensor availability vary by browser.
4. Select a destination from the existing list and request directions. The AR markers and satellite route share the returned walking geometry; distance and time are route estimates, not live remaining-trip measurements.
5. Pan the map to explore, recenter with the existing control, or clear the active route.

Accuracy depends on GPS reception, compass calibration, hardware, browser behavior, and mapping data. **Sub-meter accuracy is not guaranteed.** Indoors and obstructed areas can be unreliable. Stop in a safe place to check directions, then lower the phone and watch your surroundings. This is not obstacle detection or a substitute for signs and safe walking judgment.

Physical-device validation on Android Chrome and iOS Safari is still required. Desktop sensor emulation cannot establish camera sizing, real heading alignment, or GPS accuracy.

## Repository and design

- `web/`: the Next.js application being redesigned.
- `vanilla/`: the earlier static implementation, left unchanged by this redesign.
- `docs/`: current product, implementation, and verification notes. Superseded plans remain recoverable in Git history.

The visual system uses warm ivory `#f5f4ee`, forest ink `#172d29`, muted green `#52645e`, and lime `#d7ef85`; Bricolage Grotesque and Public Sans remain loaded through `next/font`. Shared UI primitives, original inline SVG route illustrations, and a responsive navigation HUD keep the presentation consistent without an animation dependency.

No hosting provider, active deployment root, or production rollout is asserted by these docs. Confirm those separately before deployment; a canonical URL fallback does not establish deployment status.

## Documentation

- [Project overview and documentation index](docs/PROJECT-OVERVIEW.md)
- [Architecture and navigation state](docs/ARCHITECTURE.md)
- [Design decisions, research, and verification](docs/REDESIGN-PLAN.md)
- [Technology stack](docs/TECH-STACK.md)
- [Contribution and device-testing guide](docs/CONTRIBUTING.md)
- [Migration notes and sensor caveats](docs/MIGRATION-PLAN.md)

## License

[MIT](LICENSE). Vendored dependencies retain their own license terms.
