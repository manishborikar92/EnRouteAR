# EnRouteAR — Contributing Guidelines

Thank you for your interest in contributing to **EnRouteAR**! This guide outlines our development workflow, coding standards, mobile testing procedures, and submission requirements.

---

## 1. Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version `>=18.18.0` (LTS or Node v24.x recommended).
- **npm**: Version `>=10.0.0` (preferred package manager).
- **Git**: Version control client.
- **Hardware / Testing Device**:
  - A modern mobile phone (Android with Chrome or iOS with Safari) equipped with GPS, a camera, and a gyroscope for physical AR verification.
  - Or a desktop browser (Google Chrome / Edge) using DevTools **Sensors** emulation (Geolocation & DeviceOrientation).

---

## 2. Quick Start & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manishborikar92/EnRouteAR.git
   cd EnRouteAR
   ```

2. **Navigate to the web project**:
   ```bash
   cd web
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 3. Available npm Scripts

All commands should be executed from within the `web/` directory:

| Command | Action |
|---|---|
| `npm run dev` | Launches the Next.js development server with hot module replacement (HMR) and Turbopack on `http://localhost:3000`. |
| `npm run build` | Compiles an optimized production build using Turbopack and pre-renders static HTML pages. |
| `npm run start` | Serves the compiled production build locally for verification. |
| `npm run lint` | Runs ESLint to check for syntax errors, React hooks violations, and Next.js App Router rules. |

---

## 4. Mobile Device Testing & Debugging

Because EnRouteAR relies on real-world sensors (**Camera Stream**, **High-Accuracy GPS**, and **DeviceOrientation Gyroscope**), testing on physical mobile hardware is essential.

### Secure Context (HTTPS) Requirement
Modern web browsers (Chrome, Safari, Edge) strictly enforce that sensor APIs (`navigator.mediaDevices.getUserMedia`, `navigator.geolocation`, and WebXR) are **only accessible in Secure Contexts** (`https://` or `localhost`).

To test on a physical mobile device, choose one of the following methods:

#### Method A: Chrome Remote Debugging over USB (Recommended)
1. Connect your Android device to your computer using a USB cable.
2. Enable **USB Debugging** in your phone's Developer Options.
3. Open `chrome://inspect/#devices` on your desktop Chrome browser.
4. Under **Port forwarding**, map port `3000` to `localhost:3000`.
5. On your phone, open Chrome and navigate to `http://localhost:3000`. Because it uses `localhost`, the mobile browser treats it as a secure context, enabling camera and GPS access without SSL certificates!

#### Method B: Local HTTPS Tunneling (ngrok or cloudflared)
1. Run your dev server: `npm run dev` (port 3000).
2. In a separate terminal, launch a secure tunnel:
   ```bash
   npx ngrok http 3000
   ```
3. Open the generated HTTPS URL (e.g. `https://xxxx.ngrok-free.app`) on your mobile browser.

---

## 5. Coding Standards & Conventions

### Commit Messages
We follow the **Conventional Commits** specification. Please format your commit messages as:

```
<type>(<scope>): <short description>

[optional body]
```

- **Common Types**:
  - `feat`: A new feature or user-facing capability.
  - `fix`: A bug fix.
  - `docs`: Documentation updates or additions.
  - `refactor`: Code refactoring without behavior change.
  - `test`: Adding or updating test suites.
  - `chore`: Build scripts, dependencies, or tool configuration.
- **Example**:
  ```
  feat(navigation): add heading smoothing to dynamic compass widget
  fix(viewport): prevent camera stream clipping on mobile resize
  docs(architecture): update state machine flow diagram
  ```

### Next.js 16 & React 19 Architecture
- **Server Components First**: Keep components as Server Components by default. Only add `"use client"` when the component requires browser APIs (DOM, event listeners, hooks, local state, or sensors).
- **Proxy vs Middleware**: In Next.js 16+, `middleware.js` is deprecated and replaced by `proxy.js` if network boundary routing is needed.
- **Next.js Link Usage**: Always use `<Link>` from `next/link` for internal navigation. Do not use standard `<a>` tags for internal paths.
- **Tailwind CSS v4 Tokens**: Maintain consistency with the established theme colors in [`globals.css`](file:///c:/Users/manis/Projects/EnRouteAR/web/src/app/globals.css):
  - Primary Cyan: `text-primary`, `bg-primary`, `border-primary`
  - Accent Yellow: `text-accent`, `bg-accent`
  - Background: `bg-bg`, `bg-bg-alt`, `bg-surface`
  - Typography: `font-display` (Orbitron), `font-body` (Outfit)

---

## 6. Pre-Submission Checklist

Before submitting a pull request or code changes:

- [ ] Run `npm run lint` inside `web/` and verify **0 errors and 0 warnings**.
- [ ] Run `npm run build` inside `web/` and verify the project compiles cleanly.
- [ ] Verify that all asset paths resolve properly with no broken 404s.
- [ ] Test the responsive layout on desktop, tablet, and mobile screen sizes.
- [ ] Verify that existing landing page and navigation functionality remains intact.
