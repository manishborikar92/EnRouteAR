# Feature Inventory & User Flows — EnRouteAR

> **Date:** February 2026

---

## 1. Feature Inventory

### 1.1 Landing Page Features

| #  | Feature                  | Status     | Description |
| -- | ----------------------- | ---------- | ----------- |
| F1 | Brand Header            | ✅ Complete | SVG logo in header bar |
| F2 | Hero Section            | ✅ Complete | Project title, description, and CTA button |
| F3 | College Information     | ✅ Complete | Multi-paragraph info about KITS Ramtek |
| F4 | Project Vision          | ✅ Complete | Team and project mission narrative |
| F5 | Contact Form            | ✅ Complete | Name/Email/Message via Formspree |
| F6 | Footer                  | ✅ Complete | Copyright notice |
| F7 | Geolocation Permission  | ✅ Complete | Pre-requests location before navigation |

### 1.2 Navigation Page Features

| #   | Feature                      | Status     | Description |
| --- | ---------------------------- | ---------- | ----------- |
| F8  | Destination Selector         | ✅ Complete | Dropdown populated from `places.js` |
| F9  | Get Directions Button        | ✅ Complete | Triggers route calculation |
| F10 | AR Camera Feed               | ✅ Complete | Full-screen webcam via A-Frame |
| F11 | AR Route Markers             | ✅ Complete | Blue cylinders along walking route |
| F12 | AR Destination Marker        | ✅ Complete | 3D GLB pointer at destination |
| F13 | 2D Satellite Map             | ✅ Complete | Mapbox map with globe projection |
| F14 | Route Polyline (2D)          | ✅ Complete | Blue line on map showing walking route |
| F15 | User Location Marker         | ✅ Complete | Custom marker with rotation matching device heading |
| F16 | Destination Marker (2D)      | ✅ Complete | Red default Mapbox marker |
| F17 | Compass Widget               | ✅ Complete | Rotates with device orientation |
| F18 | Map Bearing Sync             | ✅ Complete | Map rotates with device heading when enabled |
| F19 | Multifunction Button         | ✅ Complete | Context-aware: recenter / bearing / reset |
| F20 | User Location Tracking       | ✅ Complete | Continuous watch via Geolocation API |
| F21 | Route Reset                  | ✅ Complete | Clears all markers, route, and bearing |

### 1.3 Features Not Yet Implemented (from EnRouteAR.md roadmap)

| #   | Feature                      | Status        | Description |
| --- | ---------------------------- | ------------- | ----------- |
| F22 | Google Authentication        | 🔲 Planned    | Firebase Google sign-in |
| F23 | User Dashboard               | 🔲 Planned    | View/manage saved routes |
| F24 | Route Saving (Firestore)     | 🔲 Planned    | Persist routes to database |
| F25 | Search / Geocoding           | 🔲 Planned    | Mapbox geocoding search bar |
| F26 | Text-to-Speech Navigation    | 🔲 Planned    | Audio prompts for directions |
| F27 | Offline Support              | 🔲 Planned    | Cached map tiles and routes |

---

## 2. User Flows

### 2.1 First Visit → AR Navigation

```
┌─────────────────────────────────────────────────────┐
│  USER opens website                                 │
│  └─→ index.html loads                               │
│       └─→ Reads about EnRouteAR, KITS, Vision       │
│            └─→ Clicks "Navigate" button             │
│                 └─→ Browser requests geolocation     │
│                      ├─→ ✅ Permission granted        │
│                      │    └─→ Redirects to           │
│                      │        navigation.html        │
│                      └─→ ❌ Permission denied         │
│                           └─→ Still redirects        │
│                                (limited function)    │
└─────────────────────────────────────────────────────┘
```

### 2.2 AR Navigation Session

```
┌─────────────────────────────────────────────────────┐
│  navigation.html loads                              │
│  └─→ initMap() creates Mapbox satellite map         │
│  └─→ watchUserLocation() starts GPS tracking        │
│  └─→ deviceorientation listener starts              │
│  └─→ places[] populates destination dropdown        │
│                                                     │
│  USER selects destination from dropdown             │
│  └─→ Clicks "Get Directions"                        │
│       └─→ selectDestination()                       │
│            └─→ getDirections() calls Mapbox API     │
│                 ├─→ updateARDirections():            │
│                 │    - Removes old AR markers        │
│                 │    - Creates cylinder entities     │
│                 │      along route segments          │
│                 │    - Places GLB model at end       │
│                 ├─→ updateMapWithRoute():            │
│                 │    - Adds GeoJSON polyline         │
│                 │      to 2D map                     │
│                 ├─→ addDestinationMarker():          │
│                 │    - Red marker on 2D map          │
│                 └─→ Enables bearing mode             │
│                                                     │
│  USER physically walks following AR markers         │
│  └─→ GPS watch continuously updates position        │
│       └─→ User marker moves on 2D map               │
│       └─→ Map re-centers on user (if auto-center)   │
│                                                     │
│  USER interacts with multifunction button           │
│  ├─→ If recenter: re-centers map on user            │
│  ├─→ If bearing: toggles compass-aligned rotation   │
│  └─→ If reset: clears everything                    │
└─────────────────────────────────────────────────────┘
```

### 2.3 Contact Form Submission

```
┌─────────────────────────────────────────────────────┐
│  USER scrolls to "Contact Us" section               │
│  └─→ Fills in Name, Email, Message                  │
│       └─→ Clicks "Send"                             │
│            └─→ Form POSTs to Formspree              │
│                 ├─→ ✅ Success: Formspree shows       │
│                 │    confirmation page               │
│                 └─→ ❌ Error: Formspree shows         │
│                      error page                      │
└─────────────────────────────────────────────────────┘
```

### 2.4 Map Interaction States

```
                    ┌────────────────┐
                    │   CENTERED     │
                    │  (no bearing)  │
             ┌──────┤   Button:      │
             │      │   "centered"   │
             │      └───────┬────────┘
             │              │ click
             │              ▼
             │      ┌────────────────┐
             │      │   CENTERED     │
    touch    │      │ (with bearing) │──── destination
    map      │      │   Button:      │     selected
             │      │   "bearing"    │────────┐
             │      └───────┬────────┘        │
             │              │                 ▼
             │              │         ┌────────────────┐
             ▼              │         │   NAVIGATING   │
    ┌────────────────┐      │         │   Button:      │
    │  USER INTERACT │      │         │   "reset-all"  │
    │   Button:      │      │         └───────┬────────┘
    │   "recenter"   │──────┘                 │ click
    └────────────────┘  click         ┌───────┴────────┐
                                      │     RESET      │
                                      │  → CENTERED    │
                                      └────────────────┘
```

---

## 3. Technology Integration Map

```
┌──────────────────────────────────────────────────┐
│                    Browser                       │
│                                                  │
│  ┌─────────┐   ┌──────────┐   ┌──────────────┐  │
│  │ A-Frame  │   │ AR.js    │   │ Geolocation  │  │
│  │  Scene   │◄──┤ GPS-based│◄──┤    API       │  │
│  │(webcam)  │   │ entities │   │              │  │
│  └─────────┘   └──────────┘   └──────┬───────┘  │
│                                      │           │
│  ┌─────────────────┐         ┌───────┴───────┐   │
│  │   Mapbox GL JS  │◄────────┤ Device Orient │   │
│  │  (satellite map,│         │   API         │   │
│  │   directions)   │         └───────────────┘   │
│  └────────┬────────┘                             │
│           │                                      │
│           ▼                                      │
│  ┌─────────────────┐                             │
│  │ Mapbox Directions│                            │
│  │    REST API      │                            │
│  └─────────────────┘                             │
│                                                  │
│  ┌─────────────────┐                             │
│  │    Formspree    │  (contact form only)         │
│  └─────────────────┘                             │
└──────────────────────────────────────────────────┘
```
