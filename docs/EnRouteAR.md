## Development Plan for AR Navigation Website

### 1. Project Overview
- **Goal**: Build a web-based AR navigation app with a 2D map powered by Mapbox, Firebase Google Authentication, and a Firestore database to store user routes.
- **Features**:
  - Google login for user authentication.
  - Interactive 2D map for route planning using Mapbox.
  - AR navigation mode to display routes in the real world.
  - User dashboard to view and manage saved routes.
  - Responsive UI for mobile and desktop.
- **Target Audience**: Users needing navigation assistance with an AR-enhanced experience (e.g., tourists, hikers).
- **Deployment**: Vercel for hosting, with HTTPS for WebXR compatibility.

---

### 2. Tech Stack
The chosen tech stack is optimized for rapid development, scalability, and AR/map integration:

- **Frontend Framework**: Next.js (App Router, TypeScript)
  - Full-stack framework with SSR, SSG, and API routes.
  - TypeScript for type safety with Mapbox, Firebase, and AR data.
- **Map Integration**: Mapbox GL JS
  - Interactive 2D/3D maps with geocoding and directions.
- **AR Integration**: A-Frame (with WebXR)
  - Simplifies WebXR for browser-based AR navigation.
- **Authentication**: Firebase Authentication (Google Provider)
  - Secure Google OAuth with easy integration.
- **Database**: Firebase Firestore
  - Real-time NoSQL database for storing routes.
- **Styling**: Tailwind CSS
  - Utility-first CSS for responsive, customizable UI.
- **Deployment**: Vercel
  - Optimized for Next.js with automatic scaling and HTTPS.
- **Testing**: Jest + React Testing Library
  - Unit and integration testing for components and APIs.
- **Language**: JavaScript (with TypeScript)
  - TypeScript for type safety, but JavaScript for core logic to align with your preference.
- **Additional Tools**:
  - ESLint + Prettier: Code quality and formatting.
  - Husky: Pre-commit hooks for linting and testing.
  - GitHub: Version control and CI/CD.

---

### 3. Project Structure
The project structure is modular, feature-based, and follows Next.js conventions:

```
ar-navigation-app/
├── src/
│   ├── app/                     # App Router (Next.js 13+)
│   │   ├── api/                 # Backend API routes
│   │   │   ├── routes/          # Route-related endpoints
│   │   │   │   ├── save/
│   │   │   │   │   └── route.ts # POST: Save route
│   │   │   │   ├── get/
│   │   │   │   │   └── route.ts # GET: Fetch routes
│   │   ├── (auth)/             # Auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page
│   │   ├── (navigation)/       # Core app pages
│   │   │   ├── map/
│   │   │   │   └── page.tsx    # 2D Map with Mapbox
│   │   │   ├── ar/
│   │   │   │   └── page.tsx    # AR navigation
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx    # User dashboard
│   │   ├── globals.css          # Tailwind CSS
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   ├── map/                 # Map components
│   │   │   ├── MapboxMap.tsx
│   │   ├── ar/                  # AR components
│   │   │   ├── ARScene.tsx
│   │   ├── auth/                # Auth components
│   │   │   ├── GoogleLoginButton.tsx
│   ├── lib/                     # Utilities
│   │   ├── firebase/            # Firebase setup
│   │   │   ├── auth.ts          # Firebase Auth
│   │   │   ├── firestore.ts     # Firestore queries
│   │   │   ├── models/
│   │   │   │   ├── route.ts     # Route model
│   │   ├── mapbox/              # Mapbox utilities
│   │   │   ├── mapbox.ts        # Mapbox setup
│   │   ├── types.ts             # TypeScript types
│   │   ├── constants.ts         # Constants (e.g., tokens)
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts           # Auth state
│   │   ├── useMapbox.ts         # Mapbox interactions
│   │   ├── useAR.ts             # AR session
│   ├── styles/                  # Component-specific styles
│   │   ├── components/
│   │   │   ├── MapboxMap.module.css
│   ├── middleware.ts            # Auth protection
│   ├── public/                  # Static assets
│   │   ├── images/              # Markers, logos
│   │   ├── models/              # 3D models for AR
│   ├── tests/                   # Tests
│   │   ├── components/
│   │   ├── api/
│   ├── scripts/                 # Utility scripts
│   │   ├── seed.ts              # Seed Firestore
├── .env.local                   # Env variables
├── next.config.js               # Next.js config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── package.json                 # Dependencies
├── README.md                    # Documentation
```

---

### 4. Pages
The app will have the following pages, organized by route groups:

1. **Homepage** (`src/app/page.tsx`):
   - Description: Landing page with app overview and CTA to log in or explore.
   - Features: Hero section, app description, Google Login button.
   - Route: `/`

2. **Login Page** (`src/app/(auth)/login/page.tsx`):
   - Description: Allows users to sign in with Google.
   - Features: Google Login button, redirect to dashboard on success.
   - Route: `/auth/login`

3. **Map Page** (`src/app/(navigation)/map/page.tsx`):
   - Description: Displays an interactive 2D map for route planning.
   - Features: Mapbox map, search bar (geocoding), route calculation, save route option.
   - Route: `/navigation/map` (protected)

4. **AR Page** (`src/app/(navigation)/ar/page.tsx`):
   - Description: AR navigation mode with real-world route overlays.
   - Features: A-Frame AR scene, navigation cues (e.g., arrows), fallback to 2D map.
   - Route: `/navigation/ar` (protected)

5. **Dashboard Page** (`src/app/(navigation)/dashboard/page.tsx`):
   - Description: Displays user’s saved routes and profile info.
   - Features: Route list, delete/edit routes, logout button.
   - Route: `/navigation/dashboard` (protected)

---

### 5. Database (Firebase Firestore)
Firestore will store user-specific navigation data. The schema is designed for simplicity and scalability.

#### Schema
- **Collection**: `users`
  - **Document**: `{userId}`
    - **Fields**:
      - `email`: String (e.g., "user@example.com")
      - `displayName`: String (e.g., "John Doe")
      - `createdAt`: Timestamp
    - **Subcollection**: `routes`
      - **Document**: `{routeId}`
        - **Fields**:
          - `start`: Object `{ lat: Number, lng: Number }` (e.g., `{ lat: 37.7749, lng: -122.4194 }`)
          - `end`: Object `{ lat: Number, lng: Number }`
          - `waypoints`: Array `<{ lat: Number, lng: Number }>` (optional)
          - `name`: String (e.g., "Home to Work")
          - `createdAt`: Timestamp
          - `distance`: Number (in meters, e.g., 5000)
          - `duration`: Number (in seconds, e.g., 1800)

#### Example Data
```json
users/
  user_123/
    email: "john@example.com"
    displayName: "John Doe"
    createdAt: "2025-05-02T12:00:00Z"
    routes/
      route_001/
        start: { lat: 37.7749, lng: -122.4194 }
        end: { lat: 37.7849, lng: -122.4094 }
        waypoints: [{ lat: 37.7799, lng: -122.4144 }]
        name: "City Tour"
        createdAt: "2025-05-02T12:30:00Z"
        distance: 5000
        duration: 1800
```

---

### 6. API Routes
Next.js API routes in `src/app/api/` handle backend logic, interacting with Firestore and Mapbox.

1. **Save Route** (`src/app/api/routes/save/route.ts`):
   - Method: POST
   - Path: `/api/routes/save`
   - Description: Saves a user’s route to Firestore.
   - Request Body:
     ```json
     {
       "userId": "user_123",
       "route": {
         "start": { "lat": 37.7749, "lng": -122.4194 },
         "end": { "lat": 37.7849, "lng": -122.4094 },
         "waypoints": [{ "lat": 37.7799, "lng": -122.4144 }],
         "name": "City Tour",
         "distance": 5000,
         "duration": 1800
       }
     }
     ```
   - Response: `{ success: true, routeId: "route_001" }`

2. **Get Routes** (`src/app/api/routes/get/route.ts`):
   - Method: GET
   - Path: `/api/routes/get?userId=user_123`
   - Description: Fetches all routes for a user.
   - Response:
     ```json
     [
       {
         "id": "route_001",
         "start": { "lat": 37.7749, "lng": -122.4194 },
         "end": { "lat": 37.7849, "lng": -122.4094 },
         "name": "City Tour",
         ...
       }
     ]
     ```

---

### 7. Development Phases
The project is divided into phases to ensure incremental progress and testing.

#### Phase 1: Setup and Authentication (Week 1)
- **Tasks**:
  - Initialize Next.js project with TypeScript and Tailwind CSS.
  - Set up Firebase project (Authentication and Firestore).
  - Configure environment variables (`.env.local`).
  - Implement Google Authentication (`src/lib/firebase/auth.ts`).
  - Create Login page (`src/app/(auth)/login/page.tsx`) with GoogleLoginButton component.
  - Add middleware (`src/middleware.ts`) to protect routes.
- **Deliverables**:
  - Functional login system with Google OAuth.
  - Protected routes redirecting unauthenticated users to `/auth/login`.
- **Tech**:
  - Next.js, Firebase Authentication, Tailwind CSS.

#### Phase 2: 2D Map Integration (Weeks 2-3)
- **Tasks**:
  - Set up Mapbox GL JS (`src/lib/mapbox/mapbox.ts`).
  - Create MapboxMap component (`src/components/map/MapboxMap.tsx`).
  - Implement Map page (`src/app/(navigation)/map/page.tsx`) with search (Mapbox Geocoding) and route calculation (Mapbox Directions API).
  - Add functionality to save routes to Firestore via API route (`src/app/api/routes/save/route.ts`).
  - Create `useMapbox` hook for map interactions (`src/hooks/useMapbox.ts`).
- **Deliverables**:
  - Interactive 2D map with route planning.
  - Ability to save routes to Firestore.
- **Tech**:
  - Mapbox GL JS, Next.js, Firestore, TypeScript.

#### Phase 3: AR Navigation (Weeks 4-5)
- **Tasks**:
  - Set up A-Frame and WebXR (`src/components/ar/ARScene.tsx`).
  - Create AR page (`src/app/(navigation)/ar/page.tsx`) with navigation cues (e.g., arrows for route direction).
  - Integrate Mapbox route data into AR scene (e.g., overlay waypoints).
  - Implement `useAR` hook for AR session management (`src/hooks/useAR.ts`).
  - Add fallback to 2D map for unsupported devices.
- **Deliverables**:
  - AR navigation mode with route visualization.
  - Fallback for non-AR devices.
- **Tech**:
  - A-Frame, WebXR, Mapbox, Next.js.

#### Phase 4: Dashboard and Polish (Week 6)
- **Tasks**:
  - Create Dashboard page (`src/app/(navigation)/dashboard/page.tsx`) to display saved routes.
  - Implement API route to fetch routes (`src/app/api/routes/get/route.ts`).
  - Add delete/edit route functionality.
  - Style all pages with Tailwind CSS for responsive design.
  - Optimize performance (e.g., lazy-load map tiles, AR models).
- **Deliverables**:
  - User dashboard with route management.
  - Polished, responsive UI.
- **Tech**:
  - Firestore, Next.js, Tailwind CSS.

#### Phase 5: Testing and Deployment (Week 7)
- **Tasks**:
  - Write unit tests for components (`src/tests/components/`) and API routes (`src/tests/api/`).
  - Test AR functionality on real devices (Android, iOS).
  - Set up Vercel project and deploy.
  - Configure environment variables on Vercel.
  - Monitor Mapbox and Firebase usage to stay within free tiers.
- **Deliverables**:
  - Fully tested, deployed application.
  - Documentation in `README.md`.
- **Tech**:
  - Jest, React Testing Library, Vercel.

---

### 8. Sample Code Snippets

#### Firebase Setup (`src/lib/firebase/auth.ts`)
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
```

#### Mapbox Component (`src/components/map/MapboxMap.tsx`)
```javascript
"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { mapboxConfig } from "@/lib/mapbox/mapbox";

mapboxgl.accessToken = mapboxConfig.accessToken;

const MapboxMap = ({ center = [-122.4194, 37.7749], zoom = 12 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center,
        zoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl());
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  return <div ref={mapContainer} className="w-full h-[500px]" />;
};

export default MapboxMap;
```

#### AR Component (`src/components/ar/ARScene.tsx`)
```javascript
import "aframe";

const ARScene = ({ route }) => {
  return (
    <a-scene
      vr-mode-ui="enabled: true"
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: red;"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;
```

#### API Route (`src/app/api/routes/save/route.ts`)
```javascript
import { NextResponse } from "next/server";
import { saveRoute } from "@/lib/firebase/firestore";

export async function POST(request) {
  try {
    const { userId, route } = await request.json();
    const routeId = await saveRoute(userId, route);
    return NextResponse.json({ success: true, routeId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### 9. Testing Plan
- **Unit Tests**:
  - Test `MapboxMap` component for rendering and interaction.
  - Test `GoogleLoginButton` for auth flow.
  - Test API routes (`save`, `get`) with mocked Firestore.
- **Integration Tests**:
  - Test login-to-dashboard flow.
  - Test route saving and retrieval.
- **Device Testing**:
  - Test AR on Android (Chrome) and iOS (Safari).
  - Ensure 2D map fallback works on non-WebXR devices.
- **Tools**: Jest, React Testing Library.

---

### 10. Deployment Plan
- **Platform**: Vercel
- **Steps**:
  1. Push code to GitHub.
  2. Connect repository to Vercel.
  3. Add environment variables in Vercel dashboard.
  4. Deploy with `vercel --prod`.
- **Monitoring**:
  - Track Mapbox API usage (stay within 50,000 loads/month).
  - Monitor Firestore reads/writes (20,000 reads/day, 50,000 writes/day).

---

### 11. Timeline
- **Total Duration**: 7 weeks
- **Breakdown**:
  - Week 1: Setup and Authentication
  - Weeks 2-3: 2D Map Integration
  - Weeks 4-5: AR Navigation
  - Week 6: Dashboard and UI Polish
  - Week 7: Testing and Deployment

---

### 12. Potential Challenges and Mitigations
1. **AR Compatibility**:
   - Challenge: WebXR requires HTTPS and compatible devices.
   - Mitigation: Use Vercel for HTTPS; provide 2D map fallback.
2. **API Costs**:
   - Challenge: Mapbox and Firebase free tiers have limits.
   - Mitigation: Cache tiles, optimize Firestore queries, monitor usage.
3. **Performance**:
   - Challenge: AR and maps can be resource-intensive.
   - Mitigation: Lazy-load assets, use Next.js Image, optimize A-Frame scenes.
4. **Learning Curve**:
   - Challenge: A-Frame/WebXR may be unfamiliar.
   - Mitigation: Start with A-Frame tutorials; prototype simple AR scenes.

---

### 13. Post-Launch Features
- **Offline Support**: Cache Mapbox tiles and routes in local storage.
- **Multi-Platform**: Extend to mobile apps using React Native with Mapbox SDK and ARKit/ARCore.
- **Social Sharing**: Allow users to share routes via links.
- **Analytics**: Track user interactions with Firebase Analytics.

---

This development plan provides a clear roadmap for building your AR navigation website. The tech stack, structure, and phased approach ensure a robust, user-friendly application. Let me know if you need detailed code for specific components or assistance with setup!
