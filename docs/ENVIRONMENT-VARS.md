# EnRouteAR — Environment Variables Reference

This document provides a detailed reference of all environment variables used in EnRouteAR, including their purpose, default values, and setup instructions for local development and production deployments.

---

## 1. Environment Variables Overview

| Variable Name | Required | Default / Fallback Value | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Optional | `https://enroutear.vercel.app` | Base canonical URL used for constructing absolute URLs in `metadataBase`, dynamic `sitemap.xml`, `robots.txt`, OpenGraph cards, and Schema.org JSON-LD structured data. |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Optional | Bundled public token in `geo.js` | Public Mapbox API access token used for loading satellite raster/vector tiles and querying the Mapbox Directions API for walking routes. |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Optional | `https://formspree.io/f/mgegpkeb` | Target API endpoint for the contact form dispatch component (`ContactForm.js`). |
| `VERCEL_OIDC_TOKEN` | Optional | N/A | Vercel OpenID Connect (OIDC) token used automatically by the Vercel CLI during CI/CD deployments. |

---

## 2. Local Development Setup

To configure your local environment:

1. Navigate to the `web/` directory:
   ```bash
   cd web
   ```

2. Create a `.env.local` file (or duplicate an existing `.env.example`):
   ```bash
   # .env.local
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.your_custom_mapbox_token_here"
   NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"
   ```

3. Restart the Next.js development server to load the new environment variables:
   ```bash
   npm run dev
   ```

---

## 3. Variable Descriptions & Usage

### `NEXT_PUBLIC_APP_URL`
- **Prefix**: `NEXT_PUBLIC_` (Exposed to both browser client and server runtime).
- **Usage**:
  - [`web/src/app/layout.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/layout.js): Injected into `metadataBase` to ensure all relative metadata and OpenGraph images resolve to canonical absolute URLs.
  - [`web/src/app/robots.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/robots.js): References the absolute path to the sitemap (`${NEXT_PUBLIC_APP_URL}/sitemap.xml`).
  - [`web/src/app/sitemap.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/sitemap.js): Generates `<loc>` tags for all indexed routes.
  - [`web/src/components/seo/JsonLd.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/seo/JsonLd.js): Populates the Schema.org `url` and `item` properties.

### `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- **Prefix**: `NEXT_PUBLIC_` (Required on client for Mapbox GL JS).
- **Usage**:
  - [`web/src/lib/geo.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/lib/geo.js): Appended to the Mapbox Directions API walking directions query:
    ```
    https://api.mapbox.com/directions/v5/mapbox/walking/{start};{end}?access_token={token}&geometries=geojson
    ```
  - [`web/src/components/navigation/MapPanel.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/navigation/MapPanel.js): Passed directly to `mapboxgl.accessToken` when instantiating the WebGL satellite map canvas.
- **Fallback**: If not provided in the environment, the application falls back to the default project token bundled in `geo.js`.

### `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- **Prefix**: `NEXT_PUBLIC_` (Accessed by client-side form submit handlers).
- **Usage**:
  - [`web/src/components/landing/ContactForm.js`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/components/landing/ContactForm.js): Target endpoint for HTTP POST requests containing user feedback, contact name, email, and message.

---

## 4. Production Configuration on Vercel

When deploying to Vercel:

1. Open your project dashboard at [vercel.com](https://vercel.com).
2. Navigate to **Settings** > **Environment Variables**.
3. Add the following keys for **Production**, **Preview**, and **Development** environments:
   - `NEXT_PUBLIC_APP_URL`: Set to your production domain (e.g., `https://enroutear.vercel.app` or a custom domain).
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: Your production Mapbox public access token.
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`: Your Formspree form submission endpoint.
4. Redeploy the application to apply the environment variables across static pre-rendered routes.

---

## 5. Security & Best Practices

- **Never Commit Secrets**: Never commit `.env.local`, `.env.production`, or private API credentials to git. The `.gitignore` file in `web/` is pre-configured to ignore all `.env*.local` files.
- **Client Visibility**: Any variable starting with `NEXT_PUBLIC_` is included in the client JavaScript bundle. Only public tokens (such as Mapbox public keys or public form endpoints) should use this prefix. Never prefix database passwords or server secret keys with `NEXT_PUBLIC_`.
