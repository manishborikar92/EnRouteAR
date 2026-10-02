import { MessageSquare, Bug, ArrowUpRight, Plus } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ContactForm from "@/components/landing/ContactForm";
import { Container, Eyebrow, SectionHeading, Breadcrumb } from "@/components/ui/Primitives";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Contact",
  description: "Questions, feedback, or a new idea? Get in touch with the EnRouteAR team about browser-based augmented reality navigation.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | EnRouteAR", description: "Share your feedback or get help with EnRouteAR.", url: "/contact" },
};

const faqs = [
  { q: "Do I need to download an app?", a: "No. EnRouteAR runs in your mobile browser. You don’t need an account. A compatible device, an internet connection, and camera and location permissions are needed for the full experience." },
  { q: "Can I navigate to any location?", a: "Not yet. This version has a fixed list of available destinations. The product is being designed with broader wayfinding in mind, but worldwide location search isn’t available today." },
  { q: "Which devices and browsers can I use?", a: "Use a recent mobile browser with camera, geolocation, WebGL, and device-orientation support. Chrome on Android and Safari on iOS are useful starting points, but compatibility depends on your device and settings. Some browsers ask separately for motion and orientation access." },
  { q: "Why do the AR markers drift?", a: "GPS and compass accuracy vary with your surroundings and device. Tall buildings, indoor spaces, and weak signals can affect alignment. Move to an open outdoor area, check the satellite map, and treat AR markers as guidance rather than exact measurements." },
  { q: "What if I’ve blocked camera or location access?", a: "Open your browser’s permissions for this site, allow camera and location access, and reload navigation. Use a secure HTTPS connection. Your device’s location services must also be enabled." },
  { q: "How is my location used?", a: "Your location positions the map and AR view. When you request a route, the starting and destination coordinates are sent to Mapbox for walking directions. This app has no account system or saved-route database. Mapbox and Formspree have their own data policies." },
];

export default function ContactPage() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} /><Header /><main id="main" tabIndex={-1}>
    <Container className="pb-16 pt-6 lg:pb-20"><Breadcrumb current="Contact" /><div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20"><div><Eyebrow>Let’s talk</Eyebrow><h1 className="text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Every good route<br />starts with a<br className="hidden lg:block" /> conversation.</h1><p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Questions, ideas, or a little help finding your way? You’re in the right place.</p><div className="mt-9 divide-y divide-line border-y border-line">{[{ icon: MessageSquare, title: "Share a perspective", text: "Product feedback, ideas, and collaboration." }, { icon: Bug, title: "Something not working?", text: "Include your device, browser, and steps to reproduce the issue. Please leave out private location details." }].map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 py-5"><Icon className="mt-1 size-5 shrink-0 text-forest" aria-hidden="true" /><div><h2 className="font-display text-lg font-bold">{title}</h2><p className="mt-1 text-sm leading-relaxed text-muted">{text}</p></div></div>)}</div><a href="#faq" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-line underline-offset-4">A quick answer might be below<ArrowUpRight className="size-4" aria-hidden="true" /></a></div><ContactForm /></div></Container>
    <section id="faq" aria-labelledby="faq-h" className="border-t border-line bg-white/50 py-16 lg:py-20"><Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><Eyebrow>A little clarity</Eyebrow><SectionHeading id="faq-h">Before you<br />get going.</SectionHeading><p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">A few practical things to know about the experience.</p></div><div className="border-t border-line">{faqs.map(({ q, a }) => <details key={q} className="group border-b border-line"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold transition-colors hover:text-muted [&::-webkit-details-marker]:hidden">{q}<Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" /></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-relaxed text-muted">{a}</p></details>)}</div></Container></section>
  </main><Footer /></>;
}
