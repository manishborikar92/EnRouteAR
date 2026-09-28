export default function TechTicker() {
  const technologies = [
    "A-FRAME",
    "AR.JS",
    "MAPBOX GL JS",
    "WEBGL",
    "THREE.JS",
    "GPS GEOLOCATION",
    "DEVICE ORIENTATION API",
  ];

  // Repeat for continuous seamless marquee
  const tickerItems = [...technologies, ...technologies];

  return (
    <div className="tech-ticker relative z-10 overflow-hidden py-3.5 bg-[rgba(0,180,255,0.04)] border-y border-border" aria-hidden="true">
      <div className="ticker-track flex gap-5 whitespace-nowrap animate-ticker">
        {tickerItems.map((tech, idx) => (
          <span key={idx} className="flex items-center gap-5 shrink-0">
            <span className="font-display text-[0.62rem] tracking-[0.15em] text-text-3 shrink-0">
              {tech}
            </span>
            <span className="sep text-primary opacity-50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
