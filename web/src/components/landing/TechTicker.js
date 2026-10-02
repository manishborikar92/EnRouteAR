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
      className={`stack live ${isPaused ? "paused" : ""}`}
      id="stack"
      onClick={() => setIsPaused((prev) => !prev)}
      title="Click to pause/play marquee"
    >
      <div className="wrap stack-row">
        <div
          className="lane"
          role="region"
          aria-label="Technologies"
          tabIndex={0}
        >
          <ul className="reel" style={{ "--dur": "35s" }}>
            {repeatedTech.map((tech, idx) => (
              <li
                key={idx}
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
