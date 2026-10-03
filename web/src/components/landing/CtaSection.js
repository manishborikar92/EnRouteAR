"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function CtaSection() {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = (e) => {
    e.preventDefault();
    if (isLaunching) return;

    const navigateToApp = () => {
      router.push("/navigate");
    };

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      setIsLaunching(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLaunching(false);
          navigateToApp();
        },
        (err) => {
          console.warn("Geolocation warning:", err.message);
          setIsLaunching(false);
          navigateToApp();
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    } else {
      navigateToApp();
    }
  };

  return (
    <section className="py-[clamp(64px,9vw,120px)] relative z-1" aria-labelledby="cta-h">
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto relative overflow-hidden grid gap-7 items-center p-[clamp(32px,6vw,64px)] rounded-[32px] border border-[rgba(160,195,255,0.35)] bg-[radial-gradient(600px_300px_at_100%_0,rgba(255,197,61,0.22),transparent_60%),linear-gradient(135deg,#1E4FD6,#0F2F8F_55%,#0A1D5A)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_40px_80px_-30px_rgba(42,100,245,0.6)] min-[53.75em]:grid-cols-[1fr_auto] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:[background:repeating-radial-gradient(circle_at_92%_8%,transparent_0_34px,rgba(255,255,255,0.09)_35px_36px)] before:[mask-image:radial-gradient(circle_at_92%_8%,#000,transparent_70%)] [&>*]:relative">
        <div>
          <h2 id="cta-h" className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white mb-3">
            Ready to navigate in AR?
          </h2>
          <p className="text-[#D2DEF5] max-w-[50ch] text-[1.08rem] [text-wrap:pretty]">
            Point your phone, pick a destination, and walk toward a new era of
            wayfinding.
          </p>
        </div>
        <Button
          variant="signal"
          onClick={handleLaunch}
          id="cta-launch-btn"
          busy={isLaunching}
          className="min-h-14 px-8 text-base shrink-0"
        >
          <PlayIcon className="w-5 h-5 shrink-0" />
          <span>Launch EnRouteAR</span>
        </Button>
      </div>
    </section>
  );
}
