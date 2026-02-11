import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import CollegeInfo from '@/components/landing/CollegeInfo';
import ProjectVision from '@/components/landing/ProjectVision';
import ContactForm from '@/components/landing/ContactForm';

// ============================================================================
// Landing Page — Home (/)
// Renders static content sections as Server Components for optimal performance.
// Only HeroSection and ContactForm are Client Components (they need interactivity).
// ============================================================================

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl">
        <HeroSection />
        <CollegeInfo />
        <ProjectVision />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
