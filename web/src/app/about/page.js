import Link from "next/link";
import {
  Compass,
  Layers,
  Cpu,
  Smartphone,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Atmosphere from "@/components/common/Atmosphere";
import SpotlightTracker from "@/components/common/SpotlightTracker";
import { PlayIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About",
  description:
    "Discover the architecture, WebXR spatial computing, and real-time navigation technology powering EnRouteAR.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | EnRouteAR",
    description:
      "Explore the spatial computing architecture, WebXR rendering, and real-time GPS tracking behind EnRouteAR.",
    url: "/about",
  },
};

const TECH_PILLARS = [
  {
    icon: Smartphone,
    title: "WebXR & A-Frame 1.3.0",
    badge: "3D SPATIAL ENGINE",
    description:
      "Leverages browser-native WebGL and WebXR APIs through A-Frame to render hardware-accelerated 3D geometries, waypoints, and markers directly inside standard mobile browsers without external native app installs.",
  },
  {
    icon: Compass,
    title: "AR.js Location-Based Framework",
    badge: "GEOSPATIAL ANCHORING",
    description:
      "Calculates real-world distances and bearings using high-precision Spherical Mercator (EPSG:3857) projections, locking 3D cylinders and GLB destination models to exact physical coordinates in real-world space.",
  },
  {
    icon: Layers,
    title: "Mapbox GL JS v3 Satellite Map",
    badge: "2D SATELLITE HUD",
    description:
      "Integrates high-resolution satellite imagery with dynamic vector polyline layers, turn-by-turn walking routing from Mapbox Directions API, and fluid 60fps multi-touch gestures including 2-finger pan, rotate, and pitch.",
  },
  {
    icon: Cpu,
    title: "Next.js 16 App Router",
    badge: "CORE PLATFORM",
    description:
      "Built on the latest stable Next.js 16 foundation with Turbopack, React 19 Client Component isolation for sensor-heavy views, optimized metadata generation, and zero-overhead static pre-rendering.",
  },
];

const CAPABILITIES = [
  {
    number: "01",
    title: "Real-Time Camera Overlay",
    summary:
      "Digital navigation beacons appear seamlessly floating in physical space, guiding visitors and pedestrians across walkways, open spaces, and building entrances.",
  },
  {
    number: "02",
    title: "Sub-Meter Path Interpolation",
    summary:
      "Continuous walking routes calculated via the Haversine formula are sliced into 2-meter waypoint intervals, forming a luminous blue visual trail to your destination.",
  },
  {
    number: "03",
    title: "Dynamic Compass & Bearing Tracking",
    summary:
      "Hardware orientation sensors dynamically synchronize the HUD needle and satellite map bearing to keep navigation directions oriented to your true direction of travel.",
  },
  {
    number: "04",
    title: "Intelligent State Machine",
    summary:
      "A 4-mode multifunction controller manages map centering, compass rotation follow, manual pan decoupling, and one-tap route resetting for an intuitive tactile workflow.",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const glassCardClass = "glass-spotlight rounded-[26px]";

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Atmosphere />
      <SpotlightTracker />
      <Header />

      <main id="main" className="pt-[calc(var(--hdr)+36px)] pb-[calc(6rem+env(safe-area-inset-bottom,0px))] relative z-1">
        <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-display text-[0.8rem] tracking-[0.04em] text-t3 list-none p-0">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center min-h-[36px] py-1 text-t3 hover:text-t1 transition-colors no-underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
              <li className="text-route font-semibold">About</li>
            </ol>
          </nav>

          {/* Page Hero */}
          <div className="mb-20 max-w-[840px]">
            <p className="inline-flex items-center gap-2.5 px-3.5 py-[7px] border border-line-bright rounded-full bg-white/[0.05] backdrop-blur-md text-[0.84rem] font-semibold text-t2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] animate-[ping-dot_2.4s_infinite]" />
              System Specification &amp; Architecture
            </p>
            <h1 className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-5 bg-gradient-to-b from-white via-white via-35% to-[#9DBBE8] bg-clip-text text-transparent [text-wrap:balance]">
              Pioneering spatial computing for real-world navigation
            </h1>
            <p className="text-t2 text-[1.08rem] max-w-[56ch] mt-6 [text-wrap:pretty]">
              EnRouteAR is an open augmented reality wayfinding platform designed
              to transform how people explore physical environments. By fusing browser-based
              spatial computing with live satellite mapping, it bridges physical
              architecture with digital waypoint guidance.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <section className="mb-24">
            <div className="flex items-center gap-3 font-display text-[0.8rem] tracking-[0.14em] uppercase text-route font-bold mb-3">
              <span className="w-8 h-[2px] bg-route" />
              Engineering Foundation
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-10">
              Core Architectural Stack
            </h2>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
              {TECH_PILLARS.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.title}
                    data-spotlight="true"
                    className={`${glassCardClass} p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#A9CBFF] bg-gradient-to-br from-[rgba(76,141,255,0.32)] to-[rgba(76,141,255,0.08)] border border-[rgba(120,170,255,0.38)] shadow-[0_0_24px_-4px_rgba(76,141,255,0.55)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-[0.08em] bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978]">
                          {tech.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-t1 mb-3">
                        {tech.title}
                      </h3>
                      <p className="text-t2 text-[0.95rem] leading-[1.7]">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Capabilities Breakdown */}
          <section className="mb-24">
            <div className="flex items-center gap-3 font-display text-[0.8rem] tracking-[0.14em] uppercase text-route font-bold mb-3">
              <span className="w-8 h-[2px] bg-route" />
              Feature Architecture
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-10">
              Navigation Capabilities
            </h2>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.number}
                  data-spotlight="true"
                  className={`${glassCardClass} p-7 flex items-start gap-5`}
                >
                  <span className="font-display text-3xl font-extrabold text-route/40 shrink-0">
                    {cap.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-t1 mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-t2 text-[0.92rem] leading-[1.65]">
                      {cap.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Spatial Navigation Philosophy */}
          <section data-spotlight="true" className="mb-24 glass-panel rounded-[26px] p-10 max-md:p-6">
            <div className="flex items-center gap-2 text-signal font-display text-[0.8rem] tracking-[0.14em] uppercase font-bold mb-3">
              <ShieldCheck className="w-5 h-5 text-signal" />
              Navigation Philosophy
            </div>
            <h2 className="font-display text-2xl font-bold mb-4 text-t1">
              Frictionless Wayfinding Without Proprietary Hardware
            </h2>
            <p className="text-t2 text-[0.96rem] leading-[1.8] mb-6 max-w-[800px]">
              Navigating complex facilities, unfamiliar venues, and sprawling outdoor
              environments shouldn&apos;t require downloading heavy proprietary applications
              or relying on confusing static signage. EnRouteAR brings intuitive,
              head-up navigation directly to standard mobile browsers using open web
              standards, instant GPS positioning, and real-time spatial overlays.
            </p>
            <div className="flex items-center gap-6 flex-wrap text-t3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-route" />
                <span>Universal WebXR &amp; GPS Compatibility</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-route" />
                <span>Zero-Install Instant Wayfinding</span>
              </div>
            </div>
          </section>

          {/* Call to Action Banner */}
          <section className="py-0 relative z-1">
            <div className="w-full relative overflow-hidden grid gap-7 items-center p-[clamp(32px,6vw,64px)] rounded-[32px] border border-[rgba(160,195,255,0.35)] bg-[radial-gradient(600px_300px_at_100%_0,rgba(255,197,61,0.22),transparent_60%),linear-gradient(135deg,#1E4FD6,#0F2F8F_55%,#0A1D5A)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_40px_80px_-30px_rgba(42,100,245,0.6)] min-[53.75em]:grid-cols-[1fr_auto] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:[background:repeating-radial-gradient(circle_at_92%_8%,transparent_0_34px,rgba(255,255,255,0.09)_35px_36px)] before:[mask-image:radial-gradient(circle_at_92%_8%,#000,transparent_70%)] [&>*]:relative">
              <div>
                <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white mb-3">
                  Ready to navigate in AR?
                </h2>
                <p className="text-[#D2DEF5] max-w-[50ch] text-[1.08rem] [text-wrap:pretty]">
                  Launch the live AR experience directly in your browser. Grant location
                  and camera permissions to begin real-time navigation.
                </p>
              </div>
              <Button
                variant="signal"
                href="/navigate"
                className="w-full min-[53.75em]:w-auto min-h-14 px-8 text-base shrink-0"
              >
                <PlayIcon className="w-5 h-5 shrink-0" />
                <span>Launch navigation</span>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
