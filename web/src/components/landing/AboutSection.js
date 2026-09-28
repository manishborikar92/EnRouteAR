import { MapPin, Box, Clock, Compass, Satellite, MapPinned } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: MapPin,
      title: "Real-World Navigation",
      desc: "Navigate physical spaces with GPS-accurate positioning. Your live camera feed becomes the map.",
      delay: "0",
    },
    {
      icon: Box,
      title: "3D AR Overlays",
      desc: "Destination markers, route arrows, and 3D models anchored to real-world GPS coordinates.",
      delay: "100",
    },
    {
      icon: Clock,
      title: "Live Route Tracking",
      desc: "Watches your GPS position in real time and redraws the walking route dynamically as you move.",
      delay: "200",
    },
    {
      icon: Compass,
      title: "Compass-Corrected",
      desc: "Device orientation sensor keeps the AR scene and map bearing locked to your heading automatically.",
      delay: "300",
    },
    {
      icon: Satellite,
      title: "Satellite Map View",
      desc: "Embedded Mapbox satellite-streets mini-map keeps context grounded even while you look through the AR lens.",
      delay: "0",
    },
    {
      icon: MapPinned,
      title: "14 Campus Destinations",
      desc: "Pre-mapped locations including departments, hostels, canteen, library, gym and more within KITS campus.",
      delay: "100",
    },
  ];

  return (
    <section className="content-section relative z-10 py-[100px] px-10 max-md:py-[72px] max-md:px-6" id="about">
      <div className="section-inner max-w-[1200px] mx-auto">
        <div className="section-label reveal flex items-center gap-3.5 font-display text-[0.6rem] tracking-[0.22em] text-primary uppercase mb-5">
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
          ABOUT THE PROJECT
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
        </div>

        <h2 className="section-title reveal font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-text-1 mb-[52px]">
          What is{" "}
          <span className="gradient-text bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            EnRouteAR
          </span>
          ?
        </h2>

        <div className="feature-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] max-md:grid-cols-1 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="feature-card reveal bg-surface border border-border rounded-lg p-7 backdrop-blur-[12px] relative overflow-hidden transition-[border-color,box-shadow,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-border-hi hover:shadow-glow hover:-translate-y-1 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(0,180,255,0.04)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-250 hover:before:opacity-100"
                data-delay={feat.delay}
              >
                <div className="feature-icon w-12 h-12 bg-[rgba(0,180,255,0.1)] border border-border rounded-md flex items-center justify-center mb-4">
                  <Icon className="w-[22px] h-[22px] text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[0.85rem] font-semibold tracking-[0.05em] text-text-1 mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-[0.9rem] text-text-2 leading-[1.7]">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
