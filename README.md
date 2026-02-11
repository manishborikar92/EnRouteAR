# EnRouteAR — Augmented Reality Navigation

> **AR-powered campus navigation** for Kavikulguru Institute of Technology and Science (KITS), Ramtek

Navigate the KITS campus using augmented reality overlays, 3D markers, and real-time GPS walking directions — all in the browser.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (CSS-first configuration)
- **Mapbox GL JS** — Interactive satellite maps & directions
- **A-Frame + AR.js** — WebXR augmented reality

## Project Structure

```
EnRouteAR/
├── docs/           # Project documentation
│   ├── 01_Current_Project_Analysis.md
│   ├── 02_Feature_Inventory_and_User_Flows.md
│   ├── 03_Dependencies_and_Integrations.md
│   ├── 04_Performance_Observations.md
│   └── 05_Migration_Architecture.md
│
├── web/            # Next.js application
│   ├── src/
│   │   ├── app/            # Pages & API routes
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities & data
│   │   └── types/          # TypeScript definitions
│   ├── public/             # Static assets
│   └── package.json
│
├── LICENSE
└── README.md
```

## Quick Start

```bash
cd web
npm install
cp .env.example .env.local   # Add your API keys
npm run dev                   # http://localhost:3000
```

## Live Demo

[virtualvanguard.vercel.app](https://virtualvanguard.vercel.app/)

## License

MIT
