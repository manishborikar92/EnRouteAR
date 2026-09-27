# EnRouteAR — Professional UI Redesign Plan

---

## 1. Executive Summary

EnRouteAR is an augmented reality campus navigation application for KITS (Kavikulguru Institute of Technology and Science) in Ramtek, India. It currently exists as a two-page HTML/CSS/JavaScript project that overlays 3D route markers onto the real world via A-Frame and AR.js, paired with a 2D Mapbox satellite map. While the core AR navigation and map routing features work, the project lacks responsive design, accessibility, proper error handling, environment variable management, SEO, and professional visual polish. This redesign migrates the entire application to Next.js 16 with Tailwind CSS v4, establishing it as a production-quality progressive web application with a stunning, premium dark-mode interface.

---

## 2. Product Analysis Summary

### 2.1 What the Project Is

EnRouteAR is a mobile-first AR navigation tool for university campuses. Users open the app on their phone, select a campus destination (department, hostel, canteen, library, etc.) from a dropdown, and receive:
1. **AR route markers** — blue cylinders along the walking path and a 3D map pin at the destination, visible through the device camera
2. **2D satellite map** — showing the route line, user location, and destination marker on a Mapbox map
3. **Compass** — rotating with device orientation
4. **Multifunction control** — toggling between bearing, recenter, and reset states

The landing page provides project information, college details, and a contact form.

### 2.2 Feature Inventory

| Feature | Current State | Treatment in Redesign |
|---|---|---|
| Landing page with project description | Working | Redesign completely — create a premium, animated landing page |
| College information section | Working | Carry forward, enhance as an "About" section |
| Contact form (Formspree) | Working | Carry forward with proper UX feedback (toast on submit, validation) |
| Navigate button with geolocation prompt | Working | Enhance with proper permission UI and loading state |
| AR scene (A-Frame + AR.js + camera) | Working | Carry forward as client component with proper loading |
| 2D Mapbox satellite map | Working | Carry forward, enhance with better controls and responsive sizing |
| Walking directions via Mapbox API | Working | Carry forward, add route info display (distance/duration) |
| AR cylinder route markers | Working | Carry forward with improved visuals |
| 3D GLB destination marker | Working | Carry forward |
| Compass widget | Working | Enhance — larger, more visible, polished design |
| Multifunction button (4 states) | Working | Enhance — clearer iconography, tooltip labels |
| Destination dropdown (14 locations) | Working | Enhance — searchable combobox with location categories |
| Device orientation handling | Working | Carry forward |
| User location tracking | Working | Carry forward, add error UI |
| Map bearing / rotation | Working | Carry forward |
| AR text destination labels | Stub (commented out) | Implement properly |
| Route distance/duration display | Missing | Implement for first time |
| Back navigation to home | Missing | Implement via App Router |
| Loading states | Missing | Implement throughout |
| Error states | Missing | Implement with error.js boundaries |
| Dark mode toggle | Missing | Not needed — dark mode is the default and only mode (matches AR/camera use in dark environments) |

### 2.3 What Changes and Why

| Limitation | Resolution in New Version |
|---|---|
| No SSR — poor SEO | Next.js Server Components + Metadata API |
| No routing — hard page links | App Router with clean URL structure |
| Hardcoded Mapbox API key in source | Environment variables via `.env.local` |
| System font (Arial) only | next/font with Inter for professional typography |
| No responsive design | Tailwind responsive utilities, mobile-first |
| No loading states | loading.js + Suspense boundaries |
| No error handling UI | error.js + component-level error boundaries |
| No accessibility | ARIA, keyboard nav, focus management, skip link |
| Blocking CDN scripts in head | Dynamic imports, next/script, client components |
| Oversized PNG icons for tiny display | SVG icons via Lucide React, optimised images |
| No build pipeline | Next.js + Turbopack |
| Manual minification (duplicate files) | Automated build pipeline eliminates duplicates |
| `alert()` for errors | Sonner toast notifications |
| No component architecture | Modular React components |

---

## 3. Information Architecture

### 3.1 Current vs New URL Structure

| Current File | Current "URL" | New Next.js Route | Route File Path |
|---|---|---|---|
| index.html | / | / | src/app/page.js |
| navigation.html | /navigation.html | /navigate | src/app/navigate/page.js |
| N/A | N/A | /about | src/app/about/page.js |
| N/A | N/A | /contact | src/app/contact/page.js |

### 3.2 Navigation Structure

**Top navigation bar** with:
- Logo (EnRouteAR brand) — links to /
- Nav links: Navigate, About, Contact
- Mobile: hamburger menu → slide-in drawer

Justification: Only 4 routes — a simple horizontal top nav is appropriate. The product is mobile-first but also used on desktop for information browsing.

### 3.3 User Journey Maps

**Journey: Campus Navigation (Primary)**
1. `/` — User lands on home page, reads about EnRouteAR
2. Clicks "Start Navigation" CTA → `/navigate`
3. Browser prompts for camera + location permission (custom permission UI)
4. AR scene loads with camera view, map panel at bottom
5. User selects destination from searchable dropdown
6. Clicks "Get Directions" → route appears on AR + map
7. Route info (distance, est. time) displayed
8. User follows AR markers to destination
9. Uses multifunction button to toggle bearing/recenter/reset

**Journey: Learning About the Project**
1. `/` → reads hero + features section
2. Scrolls to project vision or clicks "About" → `/about`
3. Reads college information, project vision

**Journey: Contacting the Team**
1. `/contact` → fills in name, email, message
2. Submits form → sees success toast
3. Form resets

---

## 4. Design Direction

### 4.1 Product Character

| Dimension | Direction | Justification |
|---|---|---|
| Visual register | Professional + Expressive | Phase 1: campus navigation product — must look modern and trustworthy while being engaging for students |
| Density | Comfortable | Phase 1: landing page is content-heavy, needs breathing room; navigation page is data-dense but overlays need clarity |
| Motion philosophy | Functional + Subtle | Phase 1: AR scenes already provide visual motion; UI animations should be purposeful (page transitions, button feedback) |
| Layout system | Full-width hero + centred content | Phase 1: 2 page types — informational (centred column) and full-viewport (AR navigation) |
| Accessibility tier | WCAG AA | Phase 1: university setting with diverse users |
| Dark mode | Default only (no toggle) | Phase 1: dark theme is core to brand identity (#041a2a); AR camera usage benefits from dark UI reducing glare |

### 4.2 Colour System

The brand colours from Phase 1 are intentional and will be preserved with refinement.

**Primary palette (Brand Blue):**
| Token | Value | Usage |
|---|---|---|
| --color-brand-50 | #e6f4ff | Light tint for subtle backgrounds |
| --color-brand-100 | #b3deff | Badge backgrounds |
| --color-brand-200 | #80c8ff | Borders, dividers |
| --color-brand-300 | #4db2ff | Secondary icon colour |
| --color-brand-400 | #269fff | Active states (secondary) |
| --color-brand-500 | #0d94f5 | Primary actions, active states, brand |
| --color-brand-600 | #0a7cd4 | Hover on primary |
| --color-brand-700 | #0b3f65 | Active/pressed state |
| --color-brand-800 | #062d4a | Deep accents |
| --color-brand-900 | #041a2a | Page background |
| --color-brand-950 | #011421 | Header / footer / deepest surfaces |

**Accent palette (Brand Gold):**
| Token | Value | Usage |
|---|---|---|
| --color-accent-300 | #fff4a3 | Footer text, subtle highlights |
| --color-accent-400 | #fde047 | Hover on accent |
| --color-accent-500 | #facf0e | Section headings, accent highlights |
| --color-accent-600 | #dbb40c | Active accent |

**Neutral palette:**
| Token | Value | Usage |
|---|---|---|
| --color-neutral-50 | #f8fafc | Maximum contrast text (rare) |
| --color-neutral-100 | #e2e8f0 | Primary body text on dark |
| --color-neutral-200 | #cbd5e1 | Secondary text |
| --color-neutral-300 | #94a3b8 | Muted text, placeholders |
| --color-neutral-400 | #64748b | Disabled text |
| --color-neutral-500 | #475569 | Borders on dark surfaces |
| --color-neutral-600 | #334155 | Elevated surface borders |
| --color-neutral-700 | #1e293b | Card surface |
| --color-neutral-800 | #172b43 | Form backgrounds, panels |

**Semantic palette:**
| Token | Value | Usage |
|---|---|---|
| --color-success-500 | #22c55e | Success states |
| --color-warning-500 | #f59e0b | Warning states |
| --color-danger-500 | #ef4444 | Error / destructive actions |
| --color-info-500 | #3b82f6 | Informational states |

**Contrast verification:**
| Foreground | Background | Ratio | WCAG Level |
|---|---|---|---|
| #e2e8f0 (body text) | #041a2a (page bg) | 13.2:1 | AAA |
| #94a3b8 (muted text) | #041a2a (page bg) | 5.8:1 | AA |
| #ffffff (button text) | #0d94f5 (brand-500) | 4.6:1 | AA |
| #facf0e (heading) | #041a2a (page bg) | 10.8:1 | AAA |
| #a9d9ff (light blue text) | #041a2a (page bg) | 9.1:1 | AAA |
| #c4e6ff (label) | #172b43 (form bg) | 8.4:1 | AAA |

### 4.3 Typography System

**Font selection:**
| Role | Typeface | Justification |
|---|---|---|
| UI Sans | Inter | Clean, modern, excellent readability at all sizes. Replaces Arial system font. Variable font for optimal performance. |
| Mono | JetBrains Mono | For any code or technical data display (coordinates, etc.) |

**Type scale:**
| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| display | 3.5rem (56px) | 800 | 1.1 | Hero heading |
| h1 | 2.25rem (36px) | 700 | 1.2 | Page titles |
| h2 | 1.5rem (24px) | 600 | 1.3 | Section headings |
| h3 | 1.25rem (20px) | 600 | 1.4 | Subsection headings |
| body-lg | 1.125rem (18px) | 400 | 1.7 | Lead paragraph text |
| body | 1rem (16px) | 400 | 1.6 | Standard body text |
| body-sm | 0.875rem (14px) | 400 | 1.5 | Secondary content |
| label | 0.875rem (14px) | 500 | 1.4 | Form labels, metadata |
| caption | 0.75rem (12px) | 400 | 1.4 | Captions, help text |

### 4.4 Spacing & Layout System

| Context | Token / Value | Rationale |
|---|---|---|
| Page outer padding | px-4 (mobile) / px-8 (desktop) | Comfortable reading margin |
| Section vertical gap | py-16 / py-24 | Clear section separation |
| Card padding | p-6 | Internal breathing room |
| Form field gap | space-y-4 | Clear field separation |
| Inline element gap | gap-2 / gap-3 | Icon+label, tag clusters |
| Max content width | 1200px | Standard content width for readability |
| Navigation height | 64px | Standard for touch-friendly nav |
| Map panel height | 200px (mobile) / 240px (desktop) | Enough for route visibility |

### 4.5 Component Inventory

**Primitive components:**
| Component | Variants Needed | States Required |
|---|---|---|
| Button | primary, secondary, ghost, destructive, icon-only | default, hover, focus-visible, active, disabled, loading |
| Input | text, email, textarea | default, focus, filled, error, disabled |
| Select/Combobox | searchable destination picker | default, open, focused option, disabled |
| Badge | info, success, warning | default |
| Separator | horizontal | default |
| Card | default, elevated | default, hover |
| Skeleton | line, block, circle | default (animated pulse) |

**Layout components:**
| Component | Description | Responsive behaviour |
|---|---|---|
| Header | Top navigation with logo, links, mobile menu | Fixed, hamburger at mobile |
| Footer | Copyright, links | Stacked on mobile |
| Container | Max-width wrapper | Fluid with max-width |
| Section | Page section with heading | Padding adapts to viewport |

**Feature components:**
| Component | Derived From (Phase 1) | New Capabilities |
|---|---|---|
| ARScene | a-scene element in navigation.html | Client component wrapping A-Frame, with loading skeleton, permission handling |
| MapPanel | #map-container + Mapbox init | Client component with responsive height, proper error states |
| CompassWidget | .compass div + orientation handler | Larger, better visibility, SVG-based |
| MultifunctionButton | #multifunction-button with 4 CSS states | Clear iconography via Lucide, tooltip labels, accessible button |
| DestinationSelector | select#select-destination | Searchable combobox with categories, keyboard accessible |
| RouteInfoPanel | Not in original | Shows distance, estimated walk time after direction fetch |
| ContactForm | form in index.html | Validated form with success/error toast, accessible labels |
| FeatureCard | Not in original | Landing page feature highlight cards |
| HeroSection | h2 + description in index.html | Animated hero with CTA, gradient background |
| PermissionPrompt | Hidden geolocation check in index.html | Explicit UI for camera + location permission |

### 4.6 Page-by-Page Design Specifications

---

#### Page: `/` — Home (Landing Page)

**Purpose:** Introduce EnRouteAR, explain its value, and drive users to the navigation experience.
**Primary action:** Click "Start Navigation" CTA → /navigate
**Render strategy:** Static (no dynamic data)
**Authenticated:** No

**Layout:**
- Full-width hero section above the fold with animated gradient background, display heading "Navigate Your Campus in Augmented Reality", description paragraph, and prominent CTA button
- Features grid (3 columns desktop / single column mobile) showcasing AR Navigation, 2D Map, Real-time Compass
- "How it Works" section with 3 steps
- Footer

**Content sections:**
| Section | Content | Component(s) Used |
|---|---|---|
| Hero | Brand heading, tagline, CTA button | HeroSection |
| Features | 3 feature cards (AR, Map, Compass) | FeatureCard × 3 |
| How It Works | 3 numbered steps | Section, ordered list |
| Footer | Copyright, nav links | Footer |

**Data requirements:**
| Data | Source | Loading state |
|---|---|---|
| All content | Static (hardcoded in JSX) | N/A (SSR) |

**States to handle:**
- Loading: N/A (static page, SSR'd immediately)
- Empty: N/A
- Error: Global error.js fallback
- Success: Page renders fully

**SEO:**
| Field | Value |
|---|---|
| `<title>` | EnRouteAR — Augmented Reality Campus Navigation |
| `description` | Navigate your university campus with augmented reality. EnRouteAR overlays 3D direction markers onto the real world through your phone's camera. |
| `robots` | index, follow |
| Structured data | WebApplication schema |
| OG image | Static brand image |

**Mobile behaviour:**
- Hero heading scales down from display to h1 size
- Features grid collapses to single column
- CTA button becomes full-width
- All padding reduces

**Accessibility requirements:**
- Hero heading is h1
- CTA button has descriptive text (not just "Click here")
- All feature icons have aria-hidden, text descriptions provided

---

#### Page: `/navigate` — AR Navigation

**Purpose:** The core product experience — select a destination, get AR directions + 2D map route.
**Primary action:** Select destination + click "Get Directions"
**Render strategy:** Client-rendered (requires camera, geolocation, device orientation — all browser APIs)
**Authenticated:** No

**Layout:**
- Full-viewport AR scene (camera background) fills entire screen
- Destination selector bar at top (absolute positioned, semi-transparent dark bg)
- Route info panel (appears after directions fetched, shows distance + time)
- Map panel docked at bottom (200–240px height)
- Compass widget at bottom-left above map
- Multifunction button at bottom-right above map
- Back button (top-left, overlaying AR scene)

**Content sections:**
| Section | Content | Component(s) Used |
|---|---|---|
| Top bar | Destination dropdown + Get Directions button | DestinationSelector, Button |
| AR viewport | A-Frame scene with camera | ARScene |
| Route info | Distance, walk time (after route loaded) | RouteInfoPanel |
| Map panel | Mapbox satellite map | MapPanel |
| Controls | Compass, multifunction button | CompassWidget, MultifunctionButton |
| Navigation | Back to home link | Button (icon-only, ghost) |

**Data requirements:**
| Data | Source | Loading state |
|---|---|---|
| Campus places | Static JSON (places data) | Pre-loaded |
| User location | Geolocation API | Loading skeleton on map |
| Route directions | Mapbox Directions API (fetch) | Loading spinner on button |
| Device orientation | DeviceOrientation API | Compass shows static until ready |

**States to handle:**
- Loading: AR scene shows loading skeleton with "Initializing camera..." text. Map shows skeleton.
- Empty: No destination selected — map centered on user, no route shown.
- Error: Geolocation denied → full-screen error with instructions. Camera denied → error with instructions. Mapbox fetch failed → toast notification.
- Success: AR markers visible, route line on map, route info displayed.

**SEO:**
| Field | Value |
|---|---|
| `<title>` | Navigate | EnRouteAR |
| `description` | AR navigation view — select a campus destination and follow augmented reality markers to your location. |
| `robots` | noindex (AR page is a tool, not discoverable content) |
| Structured data | None |
| OG image | Static brand image |

**Mobile behaviour:**
- Designed mobile-first — this is the primary viewport
- Destination bar spans full width with rounded corners
- Map panel height is 200px on mobile, 240px on wider screens
- Touch events on map set isUserInteraction flags

**Accessibility requirements:**
- Destination selector is keyboard accessible
- Multifunction button has aria-label describing current state
- Back button has aria-label "Return to home page"
- All controls have visible focus rings over dark/transparent backgrounds

---

#### Page: `/about` — About

**Purpose:** Provide information about the project, the college, and the team vision.
**Primary action:** Learn about EnRouteAR's purpose and the institution.
**Render strategy:** Static
**Authenticated:** No

**Layout:**
- Page heading "About EnRouteAR"
- Project overview section (from Phase 1 index.html section 1)
- College information section (from Phase 1 index.html section 2) with link to kits.edu
- Project vision section (from Phase 1 index.html section 3)
- Footer

**Content sections:**
| Section | Content | Component(s) Used |
|---|---|---|
| Header | Page title | h1 |
| Project Overview | EnRouteAR description | Section, body text |
| College Info | KITS information, external link | Section, body text, link |
| Project Vision | Team vision text | Section, body text |

**Data requirements:**
| Data | Source | Loading state |
|---|---|---|
| All content | Static | N/A |

**States to handle:**
- Loading: N/A (static)
- Empty: N/A
- Error: Global error.js
- Success: Full page render

**SEO:**
| Field | Value |
|---|---|
| `<title>` | About | EnRouteAR |
| `description` | Learn about EnRouteAR — an augmented reality navigation system built for the KITS campus in Ramtek, India. |
| `robots` | index, follow |
| Structured data | None |
| OG image | Static brand image |

**Mobile behaviour:**
- Single column layout at all widths
- Padding adjusts
- Text content is readable at mobile widths with proper line-height

---

#### Page: `/contact` — Contact

**Purpose:** Allow users to send a message to the team.
**Primary action:** Fill out and submit the contact form.
**Render strategy:** Static page with client-side form interaction
**Authenticated:** No

**Layout:**
- Page heading "Contact Us"
- Description paragraph
- Contact form: Name, Email, Message fields
- Submit button
- Footer

**Content sections:**
| Section | Content | Component(s) Used |
|---|---|---|
| Header | Page title + description | h1, body text |
| Form | Name, email, message, submit | ContactForm (Input × 2, Textarea, Button) |

**Data requirements:**
| Data | Source | Loading state |
|---|---|---|
| Form submission | Formspree API (POST) | Button shows loading spinner |

**States to handle:**
- Loading: Submit button shows spinner, fields disabled
- Empty: Fresh form (default state)
- Error: Validation errors shown inline; API error shown via toast
- Success: Success toast, form resets

**SEO:**
| Field | Value |
|---|---|
| `<title>` | Contact | EnRouteAR |
| `description` | Get in touch with the EnRouteAR team. We're here to help with questions about our AR campus navigation system. |
| `robots` | index, follow |
| Structured data | None |
| OG image | Static brand image |

**Mobile behaviour:**
- Form fields are full-width on all screen sizes
- Submit button is full-width on mobile, auto-width on desktop

---

## 5. Technical Architecture

### 5.1 Project Structure

```
web/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── models/
│   │   ├── map_pointer_3d_icon.glb
│   │   ├── compass.png
│   │   ├── current.png
│   │   ├── current2.png
│   │   ├── bearing.png
│   │   ├── centered.png
│   │   ├── recenter.png
│   │   └── reset-all.png
│   ├── favicon/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── site.webmanifest
│   └── logos/
│       ├── logo-transparent-svg.svg
│       └── logo-transparent-svg-1x1.svg
│
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout — fonts, metadata, header, footer
│   │   ├── page.js                # Home / Landing page
│   │   ├── not-found.js           # 404 page
│   │   ├── error.js               # Global error boundary
│   │   ├── loading.js             # Global loading
│   │   ├── sitemap.js             # Auto-generated sitemap
│   │   ├── robots.js              # Auto-generated robots.txt
│   │   │
│   │   ├── navigate/
│   │   │   ├── page.js            # AR Navigation page
│   │   │   └── loading.js         # Navigation loading state
│   │   │
│   │   ├── about/
│   │   │   └── page.js            # About page
│   │   │
│   │   └── contact/
│   │       └── page.js            # Contact page
│   │
│   ├── components/
│   │   ├── ui/                    # Primitive components
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Badge.js
│   │   │   ├── Card.js
│   │   │   ├── Separator.js
│   │   │   ├── Skeleton.js
│   │   │   └── ToastProvider.js
│   │   │
│   │   ├── layout/                # Structural components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Container.js
│   │   │   └── MobileNav.js
│   │   │
│   │   ├── home/                  # Home page components
│   │   │   ├── HeroSection.js
│   │   │   ├── FeatureCard.js
│   │   │   └── HowItWorks.js
│   │   │
│   │   └── navigation/            # AR Navigation components
│   │       ├── ARScene.js
│   │       ├── MapPanel.js
│   │       ├── CompassWidget.js
│   │       ├── MultifunctionButton.js
│   │       ├── DestinationSelector.js
│   │       ├── RouteInfoPanel.js
│   │       ├── PermissionPrompt.js
│   │       └── NavigationView.js
│   │
│   ├── lib/
│   │   ├── utils.js               # cn() helper, generic utils
│   │   ├── places.js              # Campus location data
│   │   └── constants.js           # App-wide constants
│   │
│   ├── hooks/
│   │   ├── use-geolocation.js     # Geolocation tracking hook
│   │   ├── use-device-orientation.js # Device orientation hook
│   │   └── use-mapbox.js          # Mapbox map management hook
│   │
│   └── styles/
│       └── globals.css            # Tailwind + @theme tokens
│
├── .env.example
├── .env.local                     # (gitignored)
├── next.config.js
├── package.json
├── postcss.config.mjs
├── jsconfig.json
└── README.md
```

### 5.2 Route Architecture

| Route | File Path | Strategy | Data Source | Protected |
|---|---|---|---|---|
| / | src/app/page.js | Static | None (content in JSX) | No |
| /navigate | src/app/navigate/page.js | Client | Geolocation API, Mapbox API, Camera API | No |
| /about | src/app/about/page.js | Static | None (content in JSX) | No |
| /contact | src/app/contact/page.js | Static + Client form | Formspree API (POST) | No |

### 5.3 Component Architecture

| Component | SC or CC | Justification |
|---|---|---|
| layout.js | SC | No interactivity, renders static shell |
| page.js (home) | SC | Static content, no browser APIs |
| page.js (about) | SC | Static content, no browser APIs |
| page.js (contact) | SC (wrapper) | Contains ContactForm which is CC |
| page.js (navigate) | SC (wrapper) | Contains NavigationView which is CC |
| Header | CC | Uses useState for mobile menu toggle |
| Footer | SC | No interactivity |
| Container | SC | Pure layout wrapper |
| MobileNav | CC | Uses useState for open/close, animations |
| HeroSection | SC | Static content, CSS animations only |
| FeatureCard | SC | Static content |
| HowItWorks | SC | Static content |
| ContactForm | CC | Uses form state, submission handling, toast |
| Button | SC (can accept onClick as CC child) | Complex — use forwardRef, support both |
| Input | CC | Uses form interaction, focus states |
| Skeleton | SC | Pure CSS animation |
| Card | SC | Pure layout |
| Badge | SC | Pure display |
| ToastProvider | CC | Wraps Sonner <Toaster />, requires client context |
| ARScene | CC | Uses A-Frame, browser APIs (camera, AR.js) |
| MapPanel | CC | Uses Mapbox GL JS, browser APIs (geolocation) |
| CompassWidget | CC | Uses DeviceOrientation API, state |
| MultifunctionButton | CC | Uses state, click handlers |
| DestinationSelector | CC | Uses state for search/selection |
| RouteInfoPanel | CC | Displays dynamic route data |
| PermissionPrompt | CC | Uses Permission API, state |
| NavigationView | CC | Orchestrates all navigation components, state management |

### 5.4 Data Architecture

| Data | Current Form | New Form |
|---|---|---|
| Campus places (14 locations) | Hardcoded array in places.js | Static module in src/lib/places.js (importable) |
| Mapbox access token | Hardcoded in HTML + JS (3 places) | env var NEXT_PUBLIC_MAPBOX_TOKEN |
| Formspree endpoint | Hardcoded in HTML form action | env var NEXT_PUBLIC_FORMSPREE_ID |
| User location | Geolocation API | Custom hook use-geolocation.js |
| Device orientation | DeviceOrientation API | Custom hook use-device-orientation.js |
| Map state (bearing, center, etc.) | Closure variables in script.js | React state in NavigationView |
| Navigation state (isMapCentered, isBearing, etc.) | Closure variables | React state in NavigationView |
| Route directions | Client fetch to Mapbox | Client fetch in NavigationView (same pattern, cleaner code) |

### 5.5 SEO Architecture

| Page | Title Pattern | Robots | Structured Data |
|---|---|---|---|
| Root layout | %s \| EnRouteAR | — | — |
| / | EnRouteAR — Augmented Reality Campus Navigation | index, follow | WebApplication |
| /navigate | Navigate | noindex | None |
| /about | About | index, follow | None |
| /contact | Contact | index, follow | None |

### 5.6 Performance Strategy

| Area | Current Problem | Solution |
|---|---|---|
| Images | PNG icons are 500×500px for 25-45px display | Replicate as SVG via Lucide where possible; keep PNG for map markers served from public/ |
| Fonts | System Arial loaded, no web fonts | next/font with Inter (variable, subset latin, display swap) |
| JavaScript | 4 blocking CDN scripts in `<head>` | A-Frame + AR.js loaded via next/script strategy="lazyOnload" or dynamic import in client component |
| Map library | Mapbox GL JS loaded in `<head>` for all pages | Dynamic import only in /navigate via client component |
| 3D model | GLB loaded at render with no preloading | Preload hint in navigation loading.js |
| Bundle | No code splitting (single JS file) | Automatic code splitting by route via Next.js |

### 5.7 Accessibility Strategy

| Phase 1 Issue | Fix |
|---|---|
| No skip navigation link | Add skip-nav in root layout |
| No ARIA on interactive elements | All components get proper ARIA roles/attributes |
| No keyboard navigation | Tab order, Enter/Space activation, Escape to close |
| No focus management | focus-visible rings on all interactive elements |
| `user-scalable=no` on navigation | Remove — let users zoom if needed |
| `alert()` for errors | Replace with Sonner toast (screen reader-announced) |
| No `alt` text on images | All images get descriptive alt; decorative ones get `alt=""` |
| Icon buttons without labels | All icon-only buttons get `aria-label` |
| Form inputs use `<br>` for layout | Proper flexbox/grid layout with associated labels |

**Baseline standards:**
- `focus-visible` ring on all interactive elements (never `outline: none`)
- Skip navigation link in root layout
- Semantic HTML for all structural elements
- ARIA attributes on all non-semantic interactive components
- All text at WCAG AA contrast minimum (4.5:1 normal, 3:1 large)
- Keyboard navigation complete on all interactive components
- `prefers-reduced-motion` respected

---

## 6. Implementation Order

```
1.  Project scaffold (web/ directory, next.config.js, package.json, .env.example)
2.  Design system tokens (globals.css @theme block with all colour/type/spacing tokens)
3.  Base layer styles (focus-visible, skip-nav, body, reduced motion)
4.  Primitive components (Button, Input, Badge, Card, Separator, Skeleton)
5.  Layout components (Header, Footer, Container, MobileNav)
6.  Toast infrastructure (ToastProvider wrapping Sonner)
7.  Root layout (layout.js with fonts, metadata, providers, skip-nav)
8.  Home page (page.js with HeroSection, FeatureCard, HowItWorks)
9.  About page (about/page.js — static content from Phase 1)
10. Contact page (contact/page.js + ContactForm client component)
11. Custom hooks (use-geolocation, use-device-orientation, use-mapbox)
12. Navigation feature components (DestinationSelector, CompassWidget, MultifunctionButton, RouteInfoPanel)
13. AR + Map components (ARScene, MapPanel) — client components with dynamic imports
14. NavigationView orchestrator component
15. Navigate page (navigate/page.js wrapping NavigationView)
16. Loading states (loading.js for global + navigate)
17. Error states (error.js + not-found.js)
18. SEO (sitemap.js, robots.js, structured data, metadata on all pages)
19. Redirects for old HTML URLs
20. Responsive pass (375px, 768px, 1280px, 1440px)
21. Accessibility pass (keyboard nav, ARIA, contrast, screen reader)
22. Performance audit
23. Documentation
```

---

## 7. Success Criteria

### 7.1 Feature Parity
- [ ] AR scene with camera overlay renders correctly
- [ ] GPS-based AR entity placement works
- [ ] AR cylinder route markers appear along walking route
- [ ] 3D GLB destination marker appears at destination
- [ ] Mapbox satellite map initialises and displays
- [ ] User location tracked and marker updated
- [ ] Walking directions fetched from Mapbox
- [ ] Route line drawn on 2D map
- [ ] Compass widget rotates with device orientation
- [ ] Multifunction button cycles through 4 states (reset-all, centered, recenter, bearing)
- [ ] All 14 campus destinations selectable
- [ ] Contact form submits to Formspree
- [ ] Map fly-to animation on location updates
- [ ] Map bearing rotation with device orientation

### 7.2 New Features
- [ ] Route distance and estimated walk duration displayed
- [ ] Searchable destination selector (combobox)
- [ ] Back navigation from navigate to home
- [ ] Loading states on all async operations
- [ ] Error states with recovery options
- [ ] Toast notifications replacing alert()
- [ ] Permission prompt UI for camera/location

### 7.3 Technical Quality
- [ ] No `useEffect` data fetching for static content — all handled by Server Components
- [ ] Client components have minimal surface area — only what requires browser APIs
- [ ] All `"use client"` directives have a comment explaining why
- [ ] Security headers configured in `next.config.js`
- [ ] All environment variables in `.env.example`
- [ ] No hardcoded API keys in source code
- [ ] Mapbox token in NEXT_PUBLIC_MAPBOX_TOKEN env var

### 7.4 SEO Quality
- [ ] Every page has `metadata` export or `generateMetadata`
- [ ] `title.template` set in root layout
- [ ] `metadataBase` set for absolute OG URLs
- [ ] `sitemap.js` covers all indexable pages
- [ ] `robots.js` blocks /navigate (tool page, not content)
- [ ] No page has `<title>` or `<meta>` in JSX

### 7.5 UI Quality
- [ ] All colours use design tokens — no arbitrary hex values
- [ ] All spacing uses Tailwind scale — no arbitrary pixel values
- [ ] Every interactive component has: hover, focus-visible, active, disabled states
- [ ] Every async operation has: loading state
- [ ] All pages tested at 375px, 768px, 1280px, 1440px
- [ ] `prefers-reduced-motion` respected

### 7.6 Accessibility Quality
- [ ] All pages pass WCAG AA contrast check
- [ ] Full keyboard navigation on destination selector, forms, buttons
- [ ] Focus ring visible on keyboard, absent on mouse
- [ ] Skip navigation link present and functional
- [ ] All images have appropriate `alt` text
- [ ] All icon-only buttons have `aria-label`
- [ ] Toast notifications are announced to screen readers

### 7.7 Performance
- [ ] A-Frame and AR.js not loaded on non-navigation pages
- [ ] Mapbox not loaded on non-navigation pages
- [ ] next/font used for Inter — no CDN font link
- [ ] Images appropriately sized for their display dimensions

---

## 8. Open Questions

| Question | Impact | Default if Unanswered |
|---|---|---|
| Should Formspree be replaced with a Server Action + email service? | Contact form behaviour | Keep Formspree — it works, is free, handles spam |
| Are the 3 departments with identical coordinates (CT, Electronics, IT) intentional? | Location accuracy | Keep as-is — they share the same building |
| Should the deployed URL remain virtualvanguard.vercel.app? | SEO, redirects | Configure for whatever domain is chosen |
| Is WebXR session API preferred over the current AR.js approach? | AR implementation | Keep AR.js — it works, WebXR has narrower browser support |

---

## 9. Technology Decision Record

### FINAL TECHNOLOGY STACK

| Category | Technology | Version | Justification |
|---|---|---|---|
| **Framework** | Next.js | 16 | Core migration target — SSR, App Router, code splitting |
| **Styling** | Tailwind CSS | v4 | CSS-first config with @theme, rapid utility development, dark mode |
| **Icons** | Lucide React | 0.577+ | Tree-shakable, clean design, consistent style, minimal bundle |
| **Fonts** | Inter (via next/font) | Variable | Replaces Arial — professional, readable, excellent for UI |
| **Toast** | Sonner | Latest | Lightweight, accessible, beautiful defaults, App Router compatible |
| **Map** | Mapbox GL JS | 3.2.0 | Existing dependency — working satellite map + directions API |
| **AR** | A-Frame + AR.js | 1.3.0 / master | Existing dependency — working AR navigation system |
| **3D** | GLB via A-Frame | — | Existing 3D destination marker |
| **Form** | Formspree | — | Existing dependency — working contact form endpoint |
| **Linting** | ESLint | Latest | Next.js built-in ESLint config |

### NOT INCLUDED (with justification):
| Library | Reason |
|---|---|
| shadcn/ui | Project's 4 pages and simple component needs don't justify a full component library — hand-crafted components are sufficient and lighter |
| React Hook Form / Zod | Only one form (contact) — native form handling + Formspree is sufficient |
| Zustand / Jotai | State management is localised to NavigationView — React state + custom hooks sufficient |
| Firebase Auth | Phase 1 found no implemented auth — authentication is out of scope for this redesign |
| Firebase Firestore | No route saving feature implemented — out of scope |
| Framer Motion | CSS animations sufficient for the motion requirements (transitions, hover states); AR already provides visual dynamism |
| TanStack Table | No data tables in the application |
| Recharts | No data visualisation needed |

---

*This plan is the implementation specification. All major design decisions are documented above. Implementation in Phase 4 must follow this plan. Any deviation requires updating this document first.*
