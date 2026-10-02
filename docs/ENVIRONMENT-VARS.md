# EnRouteAR — Environment variables

The app reads three public configuration variables. Configure local overrides in `web/.env.local`; never publish existing environment-file contents.

| Variable | Purpose | Preserved fallback |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | Base URL for metadata, structured data, sitemap, and robots references | `https://enroutear.vercel.app` |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Public browser token for Mapbox GL resources and walking Directions API requests | Existing bundled public-token fallback in routing/map code; intentionally not reproduced here |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact-form JSON submission endpoint | `https://formspree.io/f/mgegpkeb` |

These overrides are optional in code because fallbacks exist. Working map/routing requests still require a valid authorized token, network connectivity, provider coverage, and available quota. A fallback does not prove current service availability or production readiness.

## Local example

Create the file yourself; no `.env.example` file is assumed:

```dotenv
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.REPLACE_WITH_YOUR_PUBLIC_TOKEN"
NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID"
```

The values above are placeholders, not working credentials. Omit an override if you intentionally need the existing fallback; do not accidentally replace a working configuration with placeholder text. Restart the development server after changes.

## Usage and visibility

- `NEXT_PUBLIC_APP_URL` is read by `src/app/layout.js`, metadata routes, and `src/components/seo/JsonLd.js`. Use a valid absolute origin for the environment being tested.
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is read by `src/lib/geo.js` and `src/components/navigation/MapPanel.js`. Routing also accepts an explicit token argument before falling back to public configuration.
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is read by `src/components/landing/ContactForm.js`. The form sends the supplied name, email, and message to that external service.

**`NEXT_PUBLIC_` values are public, not secrets.** Client-side references are embedded at build time. Use only browser-safe tokens/endpoints; apply appropriate provider restrictions and quotas. Never place private service keys, passwords, or deployment tokens in this namespace.

## Deployment and testing

Configure these values in the chosen hosting environment before building, and rebuild/redeploy to update client-bundled values. Confirm the app directory, domain, HTTPS, token restrictions, and form ownership separately. These docs do not assert which deployment target is currently configured; the canonical URL fallback is not proof of an active deployment.

Deployment credentials managed by hosting tools are not application variables and must not be copied into source, examples, logs, or documentation. Mock Formspree requests for ordinary UI tests rather than sending unsolicited messages to the existing endpoint.

[Setup](../web/README.md) · [Architecture](ARCHITECTURE.md) · [Final verification](REDESIGN-PLAN.md#final-verification)
