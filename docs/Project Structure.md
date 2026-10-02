# EnRouteAR — Project structure

```text
EnRouteAR/
├── README.md
├── docs/                         Current product, design, and implementation notes
├── vanilla/                      Earlier static implementation; unchanged
└── web/                          Next.js application
    ├── package.json              Existing dev/build/start/lint commands
    ├── package-lock.json         Existing dependency resolutions
    ├── next.config.mjs
    ├── postcss.config.mjs        Tailwind v4 integration
    ├── public/
    │   ├── vendor/               Local A-Frame / AR.js and supporting scripts
    │   ├── icons/                Compass, position marker, navigation controls
    │   ├── models/               Destination GLB
    │   └── ...                   Brand and manifest images
    └── src/
        ├── app/
        │   ├── layout.js         Fonts, metadata, toast infrastructure
        │   ├── page.js           /
        │   ├── globals.css       Tailwind import and theme tokens only
        │   ├── about/            /about plus loading/error boundaries
        │   ├── contact/          /contact plus loading/error boundaries
        │   ├── navigate/         /navigate plus loading/error boundaries
        │   ├── loading.js        Shared route loading presentation
        │   ├── error.js          Shared route error presentation
        │   ├── not-found.js      Missing-page response
        │   ├── robots.js
        │   ├── sitemap.js
        │   └── manifest.json
        ├── components/
        │   ├── common/           Brand and shared LaunchButton
        │   ├── ui/               Primitives and shared loading/error states
        │   ├── landing/          Content, navigation, form, SVG illustrations
        │   ├── navigation/       Navigation state, AR, map, compass, controls
        │   └── seo/              Structured data helpers
        └── lib/
            ├── places.js         15 fixed records; original data preserved
            ├── place-labels.js   Neutral UI labels, not routing keys
            └── geo.js            Existing geometry helpers and walking API
```

There is no application API/backend directory, authentication layer, database, or new search service. A manifest does not mean offline navigation exists. Private configuration such as `web/.env.local` is intentionally omitted from the tree.

This directory map does not identify the currently configured deployment root. See the [documentation index](PROJECT-OVERVIEW.md), [architecture](ARCHITECTURE.md), and [final verification](REDESIGN-PLAN.md#final-verification) for scope and validation status. The older directory proposal remains available in Git history.
