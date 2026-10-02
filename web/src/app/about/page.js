import { Camera, Compass, Map, LocateFixed, ArrowUpRight, Smartphone, Wifi, Footprints } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CtaSection from "@/components/landing/CtaSection";
import { RouteMap } from "@/components/landing/RoutePreview";
import { Container, Eyebrow, SectionHeading, Breadcrumb, TextLink } from "@/components/ui/Primitives";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About",
  description: "A clearer perspective on walking navigation. Learn how EnRouteAR combines camera-based AR, live GPS, and satellite maps, and what’s available today.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | EnRouteAR", description: "The idea, technology, and practical details behind browser-based AR wayfinding.", url: "/about" },
};

const capabilities = [
  { icon: Camera, title: "See your route in context", text: "A-Frame and AR.js place 3D route markers over your camera feed using GPS coordinates. The result is another way to understand the path ahead." },
  { icon: Map, title: "Keep your map close", text: "Mapbox provides a satellite-streets map and walking-route geometry. Your position updates as you move; the selected route stays visible in both views." },
  { icon: Compass, title: "Stay oriented", text: "On supported devices, orientation sensors drive the compass and map heading. Pan to look around, then recenter when you’re ready." },
  { icon: LocateFixed, title: "Keep things simple", text: "One context-aware control handles heading follow, recentering, and route reset. Your route is calculated when you tap Navigate, not automatically rerouted." },
];
const requirements = [
  { icon: Smartphone, title: "A compatible phone", text: "Use a mobile browser with camera, GPS, WebGL, and orientation support. Device and browser behavior varies." },
  { icon: Wifi, title: "An internet connection", text: "Map tiles and walking directions need a connection. Camera and location access require HTTPS or localhost." },
  { icon: Footprints, title: "An outdoor setting", text: "GPS works best with a clear view of the sky. Buildings and weak signals can cause markers to drift." },
];

export default function AboutPage() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} /><Header /><main id="main" tabIndex={-1}>
    <Container className="pb-16 pt-6 lg:pb-20"><Breadcrumb current="About" /><div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]"><div><Eyebrow>About EnRouteAR</Eyebrow><h1 className="max-w-2xl text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">A more natural<br />sense of direction.</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">Maps show you where to go. We’re exploring how augmented reality can help you see the way there.</p><p className="mt-5 max-w-xl leading-relaxed text-muted">EnRouteAR brings camera-based wayfinding and satellite mapping together in your browser. No installation, no account, and no need to switch between separate apps to understand your route.</p></div><div className="relative overflow-hidden rounded-3xl bg-forest text-white"><RouteMap className="w-full" /><p className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-ink/95 px-6 py-4 text-sm">Built around your perspective<ArrowUpRight className="size-5 text-lime" aria-hidden="true" /></p></div></div></Container>
    <section className="border-y border-line bg-white/50 py-16 lg:py-20" aria-labelledby="inside-h"><Container><Eyebrow>Behind the experience</Eyebrow><SectionHeading id="inside-h">Two views, working together.</SectionHeading><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-12">{capabilities.map(({ icon: Icon, title, text }) => <article key={title} className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-paper"><Icon className="size-5" aria-hidden="true" /></span><div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{text}</p></div></article>)}</div></Container></section>
    <section id="availability" className="py-16 lg:py-20" aria-labelledby="availability-h"><Container><div className="grid gap-8 md:grid-cols-2 md:gap-16"><div><Eyebrow>A clear starting point</Eyebrow><SectionHeading id="availability-h">A broader vision.<br />An honest starting point.</SectionHeading></div><div className="space-y-5 leading-relaxed text-muted"><p>Our long-term direction is location-independent wayfinding: a useful companion wherever your journey takes you.</p><p>Today, navigation is limited to a fixed list of predefined destinations. You can view that list in the navigation screen. Worldwide location search is not available in this version.</p><p>AR markers are guides, not precision measurements. Accuracy depends on your GPS signal, device sensors, and map data. The experience is not designed for indoor positioning.</p><TextLink href="/navigate" className="text-ink">See available destinations</TextLink></div></div><div className="mt-12 grid gap-4 md:grid-cols-3">{requirements.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-line p-6"><Icon className="mb-5 size-5 text-forest" aria-hidden="true" /><h3 className="font-display text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{text}</p></article>)}</div><p className="mt-6 text-sm leading-relaxed text-muted">Walk with awareness. Stop somewhere safe to check directions, respect access restrictions, and put your phone down when you know where to go.</p></Container></section>
    <CtaSection />
  </main><Footer /></>;
}
