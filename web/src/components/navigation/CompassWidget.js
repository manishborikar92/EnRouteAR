"use client";

import { useEffect, useRef } from "react";

export default function CompassWidget({ heading: externalHeading }) {
  const needleRef = useRef(null);

  useEffect(() => {
    // If externalHeading is explicitly provided and controlled, honor it
    if (typeof externalHeading === "number") {
      if (needleRef.current) {
        const rot = (360 - (externalHeading % 360)) % 360;
        needleRef.current.style.transform = `rotate(${rot}deg)`;
      }
      return;
    }

    // Direct high-performance deviceorientation listener
    let rafId = null;
    let latestAlpha = 0;

    const handleOrientation = (event) => {
      if (typeof event.alpha === "number" && !isNaN(event.alpha)) {
        latestAlpha = event.alpha;
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            if (needleRef.current) {
              const currentHeading = (360 - latestAlpha) % 360;
              const rot = (360 - (currentHeading % 360)) % 360;
              needleRef.current.style.transform = `rotate(${rot}deg)`;
            }
          });
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [externalHeading]);

  return (
    <div id="compass-container" aria-hidden="true" className="pointer-events-auto">
      <div
        ref={needleRef}
        className="w-[42px] h-[42px] absolute bottom-[195px] left-[max(0.875rem,env(safe-area-inset-left))] z-3 rounded-full bg-[#07111E]/92 border border-line-bright bg-[url(/icons/compass.svg)] bg-center bg-no-repeat [background-size:70%] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_16px_rgba(76,141,255,0.2)] origin-center"
        style={{
          transition: "transform 0.08s linear",
        }}
      />
    </div>
  );
}
