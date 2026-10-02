import { ArrowDown, Camera, MapPin, Smartphone } from "lucide-react";
import LaunchButton from "@/components/common/LaunchButton";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import RoutePreview from "@/components/landing/RoutePreview";

export default function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Less guessing. More going.</Eyebrow>
          <h1 id="hero-heading" className="max-w-2xl text-balance font-display text-[clamp(2.75rem,5.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.045em]">The real world.<br />A clearer <span className="text-forest underline decoration-lime decoration-[6px] underline-offset-8">way.</span></h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">Find your bearings with augmented reality. See walking-route markers through your camera, with a satellite map to keep you oriented.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LaunchButton id="turnOnLocationBtn" className="max-sm:w-full" />
            <a href="#how" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold hover:text-muted">See how it works<ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">No download. No account. Just your mobile browser.</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 text-xs text-muted">
            {[{ icon: Camera, label: "Camera-based AR" }, { icon: MapPin, label: "Live GPS" }, { icon: Smartphone, label: "Made for walking" }].map(({ icon: Icon, label }) => <span key={label} className="flex items-center gap-2"><Icon className="size-4" aria-hidden="true" />{label}</span>)}
          </div>
        </div>
        <RoutePreview />
      </Container>
    </section>
  );
}
