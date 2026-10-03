import Link from "next/link";
import {
  MapPin,
  Compass,
  ExternalLink,
  HelpCircle,
  Clock,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Atmosphere from "@/components/common/Atmosphere";
import SpotlightTracker from "@/components/common/SpotlightTracker";
import ContactForm from "@/components/landing/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the EnRouteAR team for technical inquiries, campus deployment discussions, or feedback on AR navigation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | EnRouteAR",
    description:
      "Reach out to the developers and team behind EnRouteAR campus navigation.",
    url: "/contact",
  },
};

const FAQS = [
  {
    q: "Is an app download required to navigate?",
    a: "No native app download or installation is needed. EnRouteAR runs entirely within modern mobile web browsers via WebXR, A-Frame, and WebGL APIs.",
  },
  {
    q: "Which mobile browsers are supported?",
    a: "All modern mobile browsers with camera and geolocation permissions enabled, including Chrome for Android, Safari for iOS (v14.5+), and Edge Mobile.",
  },
  {
    q: "How accurate is the AR waypoint alignment?",
    a: "Positioning combines GPS high-accuracy fixes with sub-meter Haversine path interpolation and continuous device orientation heading synchronization.",
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  const glassCardClass =
    "group relative isolate overflow-hidden border border-line bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_48px_-28px_rgba(0,0,0,0.7)] rounded-[26px] p-7 transition-[border-color,transform] duration-250 ease-smooth hover:border-line-bright hover:-translate-y-[3px] before:content-[''] before:absolute before:inset-0 before:-z-10 before:opacity-0 before:pointer-events-none before:[background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0),rgba(76,141,255,0.22),transparent_65%)] before:transition-opacity before:duration-300 hover:before:opacity-100";

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Atmosphere />
      <SpotlightTracker />
      <Header />

      <main id="main" className="pt-[calc(var(--hdr)+36px)] pb-24 relative z-1">
        <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-display text-[0.8rem] tracking-[0.04em] text-t3 list-none p-0">
              <li>
                <Link
                  href="/"
                  className="hover:text-t1 transition-colors no-underline text-t3"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
              <li className="text-route font-semibold">Contact</li>
            </ol>
          </nav>

          {/* Page Hero */}
          <div className="mb-16 max-w-[800px]">
            <p className="inline-flex items-center gap-2.5 px-3.5 py-[7px] border border-line-bright rounded-full bg-white/[0.05] backdrop-blur-md text-[0.84rem] font-semibold text-t2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] animate-[ping-dot_2.4s_infinite]" />
              Direct Communication
            </p>
            <h1 className="font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-5 bg-gradient-to-b from-white via-white via-35% to-[#9DBBE8] bg-clip-text text-transparent [text-wrap:balance]">
              Get in touch
            </h1>
            <p className="text-t2 text-[1.08rem] max-w-[56ch] mt-6 [text-wrap:pretty]">
              Have inquiries regarding the AR navigation platform, campus integration,
              collaborations, or technical feedback? Reach out using the form or institutional
              channels below.
            </p>
          </div>

          {/* Two-Column Section */}
          <div className="grid grid-cols-[1fr_1.3fr] max-lg:grid-cols-1 gap-12 items-start mb-20">
            {/* Left Column: Details & FAQs */}
            <div className="space-y-6">
              {/* Campus Info Card */}
              <div className={glassCardClass}>
                <div className="flex items-center gap-2 text-route font-display text-[0.8rem] tracking-[0.12em] uppercase mb-4 font-bold">
                  <MapPin className="w-4 h-4 text-signal" />
                  Institutional Headquarters
                </div>
                <h3 className="font-display text-xl font-bold text-t1 mb-2">
                  Kavikulguru Institute of Technology &amp; Science
                </h3>
                <p className="text-[0.92rem] text-t2 leading-[1.65] mb-4">
                  Mouda Road, Ramtek, Dist. Nagpur, Maharashtra, India — 441106
                </p>
                <div className="flex items-center gap-3 text-[0.84rem] text-t3 font-mono">
                  <Compass className="w-4 h-4 text-route" />
                  <span>21.385°N, 79.306°E</span>
                </div>
              </div>

              {/* Response Time & Portal Card */}
              <div className={glassCardClass}>
                <div className="flex items-center gap-2 text-route font-display text-[0.8rem] tracking-[0.12em] uppercase mb-3 font-bold">
                  <Clock className="w-4 h-4 text-signal" />
                  Response Dispatch
                </div>
                <p className="text-[0.92rem] text-t2 leading-[1.65] mb-4">
                  Submissions via this form are dispatched to the project maintainers.
                  Official college administration inquiries should be directed through
                  the kits.edu portal.
                </p>
                <div className="pt-3 border-t border-line flex items-center justify-between text-sm">
                  <span className="text-t3">Official Portal:</span>
                  <a
                    href="https://www.kits.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-route hover:text-white transition-colors no-underline font-semibold"
                  >
                    <span>kits.edu</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Quick Technical FAQ */}
              <div className={glassCardClass}>
                <div className="flex items-center gap-2 text-route font-display text-[0.8rem] tracking-[0.12em] uppercase mb-5 font-bold">
                  <HelpCircle className="w-4 h-4 text-signal" />
                  Frequently Asked Questions
                </div>
                <div className="space-y-4">
                  {FAQS.map((faq) => (
                    <div
                      key={faq.q}
                      className="pb-4 border-b border-line last:border-b-0 last:pb-0"
                    >
                      <h4 className="font-display text-[0.98rem] font-bold text-t1 mb-1.5">
                        {faq.q}
                      </h4>
                      <p className="text-[0.88rem] text-t2 leading-[1.6]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
