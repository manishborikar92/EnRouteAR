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

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Atmosphere />
      <SpotlightTracker />
      <Header />

      <main id="main" className="pt-[calc(var(--hdr)+36px)] pb-24">
        <div className="wrap">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-display text-[0.8rem] tracking-[0.04em] text-t3">
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
            <p className="status mb-6">
              <span className="dot" />
              Direct Communication
            </p>
            <h1>Get in touch</h1>
            <p className="lead mt-6 text-t2 text-lg">
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
              <div className="panel glass-spotlight p-7">
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
              <div className="panel glass-spotlight p-7">
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
              <div className="panel glass-spotlight p-7">
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
