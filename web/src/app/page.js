import StarfieldCanvas from "@/components/landing/StarfieldCanvas";
import ScrollReveal from "@/components/landing/ScrollReveal";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import TechTicker from "@/components/landing/TechTicker";
import AboutSection from "@/components/landing/AboutSection";
import CampusSection from "@/components/landing/CampusSection";
import VisionSection from "@/components/landing/VisionSection";
import CtaSection from "@/components/landing/CtaSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Animated Starfield and Scanline Overlay */}
      <StarfieldCanvas />

      {/* Intersection Observer for Scroll Reveal */}
      <ScrollReveal />

      {/* Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <TechTicker />
        <AboutSection />
        <CampusSection />
        <VisionSection />
        <CtaSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
