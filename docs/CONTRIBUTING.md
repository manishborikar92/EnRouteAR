# EnRouteAR — Contributing

## Local workflow

1. Read the [project overview](PROJECT-OVERVIEW.md) and [current redesign boundaries](REDESIGN-PLAN.md).
2. Check `git status` and preserve unrelated work. Keep changes scoped; the current redesign does not modify `vanilla/`, routing data, packages, or the navigation state machine.
3. Use **Node.js >=20.9** and the existing npm lockfile. The current verification environment is **Node.js 22.23.3**.
4. Run from `web/`:

   ```bash
   npm ci
   npm run dev
   ```

5. Configure only the public values you need, using [Environment variables](ENVIRONMENT-VARS.md). Do not share `.env.local` contents or private credentials.

For a pull request, explain the user-visible change, affected paths, exact checks run, and remaining gaps. Small descriptive commits such as `docs: clarify sensor requirements` are preferred over unrelated cleanup in the same change.

## Implementation conventions

- Keep the four existing routes and JavaScript/App Router structure. Prefer Server Components for content and explicit client boundaries for interaction/sensors.
- Use the existing `@/` alias and `next/link` for internal route links.
- Keep Tailwind v4 tokens in `src/app/globals.css`; use utilities and shared primitives for component presentation.
- Reuse `Primitives.js`, `LaunchButton.js`, and loading/error states rather than creating parallel implementations.
- Preserve Bricolage Grotesque/Public Sans, the ivory/forest/lime palette, and original SVG illustration style. No animation dependency is needed.
- Keep the 15 original destination records and `geo.js` intact. Neutral display labels belong in `place-labels.js`, not in the routing data or selection values.
- Preserve local AR script order, sensor effects, gesture decoupling, and resource cleanup. See [Architecture](ARCHITECTURE.md).
- Prefer semantic HTML, visible focus, labeled controls, at least 44px primary touch targets, and reduced-motion-aware feedback. Do not use an ARIA menu role for ordinary site links.

## Command checks

```bash
# From web/
npm run lint
npm run build
npm run start  # only after build succeeds
```

At baseline, `npm run lint` failed on a pre-existing executable-wrapper permission issue in `node_modules/.bin`. The direct command `node node_modules/eslint/bin/eslint.js .` passed at baseline and can bypass that wrapper if the same issue recurs. Report the wrapper failure and direct result separately; neither is a substitute for a final post-change run.

There is no package `test` script or claimed installed test suite. Name and run any targeted ad hoc checks rather than reporting an unrun `npm test` as successful. Record final results in [Final verification](REDESIGN-PLAN.md#final-verification), including build/network/font-fetch limitations.

## Browser and device checklist

Use mock responses for ordinary Formspree and routing UI tests; do not send unsolicited live contact submissions or expose real location payloads in reports.

- [ ] Open `/`, `/about`, `/contact`, `/navigate`, and a missing URL; verify metadata, local assets, route links, loading/error presentation, and recovery controls.
- [ ] Check 360–390px phones, tablet widths, wide desktop, compact landscape, browser zoom, and reduced-motion settings for clipping/overflow.
- [ ] Keyboard-test skip navigation, disclosure controls, Escape/close/focus behavior, launch buttons, the destination select, and form fields. Check labels and live feedback with assistive technology.
- [ ] Exercise launch location grant, denial, timeout, and unavailable API; `/navigate` should still be reachable without implying a granted permission.
- [ ] Mock contact success, rejected responses, and network failure; check pending state, retained values on failure, and reset on success.
- [ ] Exercise no GPS fix, no destination, route request pending, route success, empty routes, and fetch failure. Verify UI-only labels resolve to original data.
- [ ] Confirm centered → bearing, manual map interaction → recenter, successful route → reset-ready, and full reset behavior remain unchanged.
- [ ] Confirm camera video fills the viewport after initial load, device rotation, and browser address-bar changes. Check camera permission denial separately from AR script loading.
- [ ] Verify map pan/pinch/rotation do not fight GPS following or trigger unwanted page gestures.
- [ ] Enter and exit navigation repeatedly through client-side links. Confirm route entities/sources clear and camera tracks, watches, event listeners, timers, map, and markers are cleaned up.

Physical **Android Chrome and iOS Safari testing remains required**. Camera/GPS need a secure context: use HTTPS or a browser-recognized localhost setup. A phone visiting a desktop's plain HTTP LAN address is usually not sufficient. Android USB port forwarding can provide phone-localhost access; an HTTPS test URL is another option. Follow local security policy before exposing a development server.

iOS motion/orientation permission may require a user gesture. Real GPS drift, compass calibration, camera behavior, and browser resource cleanup cannot be proven by desktop emulation. Record device/browser versions and actual observations without claiming universal support. Test walking only in a safe place and do not keep watching the camera while moving.
