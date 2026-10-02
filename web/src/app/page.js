import Atmosphere from "@/components/common/Atmosphere";
import SpotlightTracker from "@/components/common/SpotlightTracker";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import TechTicker from "@/components/landing/TechTicker";
import HowSection from "@/components/landing/HowSection";
import AboutSection from "@/components/landing/AboutSection";
import CampusSection from "@/components/landing/CampusSection";
import VisionSection from "@/components/landing/VisionSection";
import CtaSection from "@/components/landing/CtaSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import MobileDock from "@/components/landing/MobileDock";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Ambient Atmospheric Glows, Wobbled Contours & Grain Overlay */}
      <Atmosphere />

      {/* Reactive Cursor Spotlight on Glass Cards */}
      <SpotlightTracker />

      {/* Navigation Header */}
      <Header />

      {/* Main Landmark */}
      <main id="main">
        <HeroSection />
        <TechTicker />
        <HowSection />
        <AboutSection />
        <CampusSection />
        <VisionSection />
        <CtaSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Launch Dock */}
      <MobileDock />
    </>
  );
}
