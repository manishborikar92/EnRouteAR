import Link from "next/link";
import {
  Compass,
  MapPin,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Navigation,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StarfieldCanvas from "@/components/landing/StarfieldCanvas";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About",
  description:
    "Discover the architecture, WebXR spatial computing, and campus navigation technology powering EnRouteAR at KITS Ramtek.",
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
      "Calculates real-world distances and bearings using high-precision Spherical Mercator (EPSG:3857) projections, locking 3D cylinders and GLB destination models to exact physical coordinates on campus.",
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
      "Digital navigation beacons appear seamlessly floating in physical space, guiding visitors and students across paths, quadrangles, and building entrances.",
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

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <StarfieldCanvas />
      <ScrollReveal />
      <Header />

      <main className="relative z-10 pt-[110px] pb-[100px] px-6 max-w-[1200px] mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-display text-[0.68rem] tracking-[0.12em] text-text-3 uppercase">
            <li>
              <Link href="/" className="hover:text-primary transition-colors no-underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-primary font-semibold">About</li>
          </ol>
        </nav>

        {/* Page Hero */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(0,180,255,0.08)] border border-border rounded-full text-primary font-display text-[0.62rem] tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-accent" />
            SYSTEM SPECIFICATION & MISSION
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-text-1 leading-[1.1] mb-6">
            Pioneering Spatial Computing for{" "}
            <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              Campus Navigation
            </span>
          </h1>
          <p className="text-[1.05rem] text-text-2 leading-[1.8] max-w-[780px]">
            EnRouteAR is an open augmented reality wayfinding platform developed for Kavikulguru
            Institute of Technology and Science (KITS), Ramtek. By combining browser-based spatial
            computing with live satellite mapping, it bridges physical architecture with digital
            waypoint guidance.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <section className="mb-24">
          <div className="flex items-center gap-3.5 font-display text-[0.62rem] tracking-[0.22em] text-primary uppercase mb-3">
            <span className="h-[1px] w-8 bg-primary" />
            ENGINEERING FOUNDATION
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-text-1 mb-10">
            Core Architectural Stack
          </h2>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {TECH_PILLARS.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="bg-surface border border-border rounded-lg p-8 backdrop-blur-[12px] transition-[border-color,box-shadow,transform] duration-250 hover:border-border-hi hover:shadow-[0_0_24px_rgba(0,180,255,0.18)]"
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-md bg-[rgba(0,180,255,0.1)] border border-border flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display text-[0.58rem] tracking-[0.16em] text-accent uppercase font-bold">
                      {tech.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.1rem] font-bold text-text-1 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-[0.88rem] text-text-2 leading-[1.7]">{tech.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Capabilities Breakdown */}
        <section className="mb-24">
          <div className="flex items-center gap-3.5 font-display text-[0.62rem] tracking-[0.22em] text-primary uppercase mb-3">
            <span className="h-[1px] w-8 bg-primary" />
            FEATURE ARCHITECTURE
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-text-1 mb-10">
            Navigation Capabilities
          </h2>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.number}
                className="bg-surface border border-border rounded-lg p-7 backdrop-blur-[12px] flex items-start gap-5"
              >
                <span className="font-display text-[1.8rem] font-bold text-primary/30 shrink-0">
                  {cap.number}
                </span>
                <div>
                  <h3 className="font-display text-[0.98rem] font-bold text-text-1 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-[0.85rem] text-text-2 leading-[1.65]">{cap.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Campus Focus */}
        <section className="mb-24 p-10 max-md:p-6 bg-gradient-to-br from-bg-alt to-[rgba(4,26,42,0.8)] border border-border rounded-lg">
          <div className="flex items-center gap-2 text-accent font-display text-[0.62rem] tracking-[0.18em] uppercase mb-3">
            <ShieldCheck className="w-4 h-4" />
            CAMPUS CONTEXT
          </div>
          <h2 className="font-display text-[1.6rem] font-bold text-text-1 mb-4">
            Kavikulguru Institute of Technology & Science (KITS), Ramtek
          </h2>
          <p className="text-[0.92rem] text-text-2 leading-[1.8] mb-6">
            Founded in 1985 and permanently affiliated with RTM Nagpur University, KITS Ramtek encompasses
            over 50 acres of academic complexes, dedicated engineering workshops, administrative
            halls, hostel zones, and recreational facilities. EnRouteAR was designed specifically to
            provide frictionless navigation across this expansive campus without requiring
            expensive physical signage or proprietary hardware.
          </p>
          <div className="flex items-center gap-6 flex-wrap font-display text-[0.7rem] text-text-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Ramtek, Nagpur, Maharashtra, India</span>
            </div>
            <a
              href="https://www.kits.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:text-white transition-colors no-underline"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Call to Action Banner */}
        <div className="p-10 max-md:p-6 bg-surface border border-border rounded-lg text-center backdrop-blur-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgba(0,180,255,0.1)] border border-border flex items-center justify-center text-primary">
            <Navigation className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-[1.4rem] tracking-[0.05em] text-text-1 mb-3">
            Ready to Navigate the Campus?
          </h2>
          <p className="text-[0.9rem] text-text-2 max-w-[560px] mx-auto mb-6 leading-[1.6]">
            Launch the live AR experience directly in your browser. Grant location and camera
            permissions to begin real-time navigation.
          </p>
          <Link
            href="/navigate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dk text-white font-display text-[0.72rem] tracking-[0.14em] font-bold rounded-sm no-underline hover:shadow-[0_0_24px_rgba(0,180,255,0.5)] hover:-translate-y-px transition-all"
          >
            LAUNCH AR NAVIGATION
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
