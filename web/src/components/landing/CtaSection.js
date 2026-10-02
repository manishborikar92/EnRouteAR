"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayIcon } from "@/components/common/Icons";

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
    <section className="sec cta on-ink" aria-labelledby="cta-h">
      <div className="wrap">
        <div>
          <h2 id="cta-h">Ready to navigate in AR?</h2>
          <p>
            Point your phone, pick a destination, and walk toward a new era of
            wayfinding.
          </p>
        </div>
        <button
          onClick={handleLaunch}
          className="btn signal"
          id="cta-launch-btn"
          aria-busy={isLaunching}
        >
          <PlayIcon className="i" />
          Launch EnRouteAR
        </button>
      </div>
    </section>
  );
}
