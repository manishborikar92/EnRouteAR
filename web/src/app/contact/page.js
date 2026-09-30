import Link from "next/link";
import {
  MapPin,
  Mail,
  Compass,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StarfieldCanvas from "@/components/landing/StarfieldCanvas";
import ScrollReveal from "@/components/landing/ScrollReveal";
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
            <li className="text-primary font-semibold">Contact</li>
          </ol>
        </nav>

        {/* Page Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(0,180,255,0.08)] border border-border rounded-full text-primary font-display text-[0.62rem] tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-accent" />
            DIRECT COMMUNICATION
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-text-1 leading-[1.1] mb-6">
            Get in{" "}
            <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-[1.05rem] text-text-2 leading-[1.8] max-w-[760px]">
            Have inquiries regarding the AR navigation platform, campus integration, research
            collaboration, or technical questions? Reach out using the direct dispatch form or
            institutional channels below.
          </p>
        </div>

        {/* Two-Column Section */}
        <div className="grid grid-cols-[1fr_1.3fr] max-lg:grid-cols-1 gap-12 items-start mb-20">
          {/* Left Column: Details & FAQs */}
          <div className="space-y-6">
            {/* Campus Info Card */}
            <div className="bg-surface border border-border rounded-lg p-7 backdrop-blur-[12px]">
              <div className="flex items-center gap-2 text-primary font-display text-[0.68rem] tracking-[0.14em] uppercase mb-4 font-bold">
                <MapPin className="w-4 h-4 text-accent" />
                INSTITUTIONAL HEADQUARTERS
              </div>
              <h3 className="font-display text-[1.1rem] font-bold text-text-1 mb-2">
                Kavikulguru Institute of Technology & Science
              </h3>
              <p className="text-[0.88rem] text-text-2 leading-[1.65] mb-4">
                Mouda Road, Ramtek, Dist. Nagpur, Maharashtra, India — 441106
              </p>
              <div className="flex items-center gap-3 text-[0.78rem] text-text-3 font-display">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>Coordinates: 21.38541°N, 79.30562°E</span>
              </div>
            </div>

            {/* Response Time & Portal Card */}
            <div className="bg-surface border border-border rounded-lg p-7 backdrop-blur-[12px]">
              <div className="flex items-center gap-2 text-primary font-display text-[0.68rem] tracking-[0.14em] uppercase mb-3 font-bold">
                <Clock className="w-4 h-4 text-accent" />
                RESPONSE DISPATCH
              </div>
              <p className="text-[0.88rem] text-text-2 leading-[1.65] mb-4">
                Submissions via this form are dispatched to the project maintainers. Inquiries
                regarding college administration should be directed through the official portal.
              </p>
              <div className="pt-2 border-t border-[rgba(0,180,255,0.08)] flex items-center justify-between text-[0.78rem]">
                <span className="text-text-3 font-display">Official Portal:</span>
                <a
                  href="https://www.kits.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-white transition-colors no-underline font-display text-[0.75rem]"
                >
                  <span>kits.edu</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Technical FAQ */}
            <div className="bg-surface border border-border rounded-lg p-7 backdrop-blur-[12px]">
              <div className="flex items-center gap-2 text-primary font-display text-[0.68rem] tracking-[0.14em] uppercase mb-4 font-bold">
                <HelpCircle className="w-4 h-4 text-accent" />
                FREQUENTLY ASKED QUESTIONS
              </div>
              <div className="space-y-4">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="pb-3 border-b border-[rgba(0,180,255,0.06)] last:border-b-0 last:pb-0">
                    <h4 className="font-display text-[0.82rem] font-bold text-text-1 mb-1">
                      {faq.q}
                    </h4>
                    <p className="text-[0.82rem] text-text-2 leading-[1.6]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
