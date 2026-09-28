"use client";

import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function CtaSection() {
  const router = useRouter();

  const handleLaunch = (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => router.push("/navigate"),
        (err) => {
          console.warn("Geolocation warning:", err.message);
          router.push("/navigate");
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      router.push("/navigate");
    }
  };

  return (
    <section className="cta-section relative z-10 py-[100px] px-10 max-md:py-[72px] max-md:px-6 overflow-hidden">
      <div className="cta-inner reveal max-w-[700px] mx-auto text-center relative">
        <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,180,255,0.1),transparent_70%)] pointer-events-none" />
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text-1 mb-4">
          Ready to navigate in AR?
        </h2>
        <p className="text-[1.05rem] text-text-2 mb-9">
          Point your phone, pick a destination, and walk toward a new era of wayfinding.
        </p>
        <button
          onClick={handleLaunch}
          className="btn-primary btn-large inline-flex items-center gap-2.5 bg-gradient-to-br from-primary to-primary-dk text-white no-underline font-display text-[0.82rem] font-semibold tracking-[0.1em] px-9 py-[18px] rounded-md border-none cursor-pointer relative overflow-hidden transition-[box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,180,255,0.4)] active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,255,255,0.15)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-250 hover:before:opacity-100"
          id="cta-launch-btn"
        >
          <Play className="w-4 h-4 shrink-0 fill-current" />
          Launch EnRouteAR
        </button>
      </div>
    </section>
  );
}
