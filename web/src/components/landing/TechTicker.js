"use client";

import { useState } from "react";

const TECHNOLOGIES = [
  "A-Frame",
  "AR.js",
  "Mapbox GL JS",
  "WebGL",
  "Three.js",
  "GPS Geolocation",
  "Device Orientation API",
];

export default function TechTicker() {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items for continuous infinite marquee
  const repeatedTech = [
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
  ];

  return (
    <div
      className={`border-y border-line bg-white/[0.025] relative z-1 cursor-pointer select-none ${
        isPaused ? "[&_.reel]:[animation-play-state:paused]" : ""
      }`}
      id="stack"
      onClick={() => setIsPaused((prev) => !prev)}
      title="Click to pause/play marquee"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto flex items-center gap-5 py-4">
        <div
          className="flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] hover:[&_.reel]:[animation-play-state:paused]"
          role="region"
          aria-label="Technologies"
          tabIndex={0}
        >
          <ul
            className="reel flex w-max animate-[reel_35s_linear_infinite]"
            style={{ "--dur": "35s" }}
          >
            {repeatedTech.map((tech, idx) => (
              <li
                key={idx}
                className="flex items-center whitespace-nowrap font-display font-semibold text-[1.05rem] tracking-[-0.01em] text-t2 after:content-[''] after:w-[7px] after:h-[7px] after:mx-7 after:rotate-45 after:bg-signal after:opacity-70"
                aria-hidden={idx >= TECHNOLOGIES.length ? "true" : undefined}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
