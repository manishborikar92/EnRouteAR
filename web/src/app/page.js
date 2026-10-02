import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import HowSection from "@/components/landing/HowSection";
import AboutSection from "@/components/landing/AboutSection";
import VisionSection from "@/components/landing/VisionSection";
import CtaSection from "@/components/landing/CtaSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import MobileDock from "@/components/landing/MobileDock";

export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <><Header /><main id="main" tabIndex={-1}><HeroSection /><HowSection /><AboutSection /><VisionSection /><CtaSection /><ContactSection /></main><Footer /><MobileDock /></>;
}
