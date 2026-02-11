# EnRouteAR — Next.js Web Application

> Augmented Reality Campus Navigation for KITS Ramtek

## Tech Stack

| Technology       | Version     | Purpose |
| --------------- | ----------- | ------- |
| **Next.js**     | 16.1.6      | React framework with App Router, Turbopack |
| **React**       | 19.2.3      | UI component library |
| **Tailwind CSS** | 4.x        | Utility-first CSS (CSS-first config) |
| **TypeScript**  | 5.x         | Type safety |
| **Mapbox GL JS** | 3.x        | Interactive satellite maps |
| **A-Frame**     | 1.3.0       | WebXR / AR scene rendering |
| **AR.js**       | Latest      | GPS-based AR components |

## Getting Started

### Prerequisites
- **Node.js** v18+ and **npm** v9+

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox GL JS access token |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree form submission URL |
| `NEXT_PUBLIC_APP_URL` | Canonical URL for SEO metadata |

## Project Structure

```
web/
├── public/                         # Static assets
│   ├── favicon/                    # Favicons & PWA manifest
│   ├── logos/                      # Brand logos (SVG + PNG)
│   └── models/                     # 3D models & marker icons
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (fonts, metadata)
│   │   ├── page.tsx                # Landing page (/)
│   │   ├── globals.css             # Tailwind CSS theme
│   │   ├── navigation/
│   │   │   └── page.tsx            # AR navigation page
│   │   └── api/contact/
│   │       └── route.ts            # Contact form endpoint
│   │
│   ├── components/
│   │   ├── layout/                 # Header, Footer, Section
│   │   ├── landing/                # HeroSection, CollegeInfo, etc.
│   │   └── navigation/            # ARScene, MapView, Compass, etc.
│   │
│   ├── hooks/                      # useGeolocation, useDeviceOrientation
│   ├── lib/                        # places, directions, geo-utils, constants
│   └── types/                      # TypeScript type definitions
│
├── .env.local                      # Environment variables
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS (Tailwind v4)
└── tsconfig.json                   # TypeScript configuration
```

## Pages

| Route            | Description |
| --------------- | ----------- |
| `/`             | Landing page with project info, college info, vision, and contact form |
| `/navigation`   | AR navigation with destination selector, AR scene, 2D map, and compass |

## Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy automatically

## License

MIT
