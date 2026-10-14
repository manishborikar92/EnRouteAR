import Link from "next/link";
import {
  PinIcon,
  ScreenIcon,
  ClockIcon,
  CompassIcon,
  MapIcon,
  FlagIcon,
} from "@/components/common/Icons";

export default function FeaturesSection() {
  const features = [
    {
      icon: PinIcon,
      title: "Real-world navigation",
      desc: "Navigate physical spaces with GPS-accurate positioning. Your live camera feed becomes the map.",
    },
    {
      icon: ScreenIcon,
      title: "3D AR overlays",
      desc: "Destination markers, route arrows, and 3D models anchored to real-world GPS coordinates.",
    },
    {
      icon: ClockIcon,
      title: "Live route tracking",
      desc: "Watches your GPS position in real time and redraws the walking route dynamically as you move.",
    },
    {
      icon: CompassIcon,
      title: "Compass-corrected",
      desc: "Device orientation sensor keeps the AR scene and map bearing locked to your heading automatically.",
    },
    {
      icon: MapIcon,
      title: "Satellite map view",
      desc: "Embedded Mapbox satellite-streets mini-map keeps context grounded even while you look through the AR lens.",
    },
    {
      icon: FlagIcon,
      title: "Pre-mapped destinations",
      desc: "Easily navigate to key landmarks, facilities, and points of interest with pre-calibrated GPS coordinates.",
    },
  ];

  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1 bg-gradient-to-b from-white/[0.04] to-white/[0.008] border-y border-line scroll-mt-20"
      id="features"
      aria-labelledby="features-h"
    >
      {/* Invisible anchor target for legacy #about links */}
      <span id="about" className="absolute -top-24" aria-hidden="true" />

      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(28px,4vw,48px)] items-start">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-display text-[0.8rem] tracking-[0.14em] uppercase text-route font-bold mb-2">
              Platform Features
            </p>
            <h2
              id="features-h"
              className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              What is EnRouteAR?
            </h2>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-lk hover:text-white transition-colors group"
          >
            <span>System architecture</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="grid gap-4 list-none p-0 sm:grid-cols-2 min-[60em]:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <li
                key={idx}
                data-spotlight="true"
                className="glass-spotlight rounded-[22px] p-6 sm:p-7 sm:[&:nth-child(1)]:col-span-2 sm:[&:nth-child(6)]:col-span-2 min-[60em]:[&:nth-child(1)]:col-span-2 min-[60em]:[&:nth-child(4)]:col-span-2 min-[60em]:[&:nth-child(5)]:col-span-2 min-[60em]:[&:nth-child(6)]:col-auto"
              >
                <div className="w-12 h-12 p-3 mb-5 rounded-[14px] text-[#A9CBFF] bg-gradient-to-br from-[rgba(76,141,255,0.32)] to-[rgba(76,141,255,0.08)] border border-[rgba(120,170,255,0.38)] shadow-[0_0_28px_-4px_rgba(76,141,255,0.55)] flex items-center justify-center">
                  <Icon className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display text-[1.2rem] font-bold mb-2 tracking-[-0.015em] text-t1 group-first:text-[1.6rem]">
                  {feat.title}
                </h3>
                <p className="text-t2 text-[0.96rem] max-w-[46ch]">
                  {feat.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
