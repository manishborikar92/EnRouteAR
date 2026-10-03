import {
  PinIcon,
  ScreenIcon,
  ClockIcon,
  CompassIcon,
  MapIcon,
  FlagIcon,
} from "@/components/common/Icons";

export default function AboutSection() {
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
      title: "14 campus destinations",
      desc: "Pre-mapped locations including departments, hostels, canteen, library, gym and more within KITS campus.",
    },
  ];

  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1 bg-gradient-to-b from-white/[0.04] to-white/[0.008] border-y border-line"
      id="about"
      aria-labelledby="about-h"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(28px,4vw,48px)] items-start">
        <div>
          <h2
            id="about-h"
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em]"
          >
            What is EnRouteAR?
          </h2>
        </div>
        <ul className="grid gap-4 list-none p-0 sm:grid-cols-2 min-[60em]:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <li
                key={idx}
                className="group relative isolate overflow-hidden border border-line bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_48px_-28px_rgba(0,0,0,0.7)] rounded-[22px] p-7 transition-[border-color,transform] duration-250 ease-smooth hover:border-line-bright hover:-translate-y-[3px] before:content-[''] before:absolute before:inset-0 before:-z-10 before:opacity-0 before:pointer-events-none before:[background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0),rgba(76,141,255,0.22),transparent_65%)] before:transition-opacity before:duration-300 hover:before:opacity-100 sm:[&:nth-child(1)]:col-span-2 sm:[&:nth-child(6)]:col-span-2 min-[60em]:[&:nth-child(1)]:col-span-2 min-[60em]:[&:nth-child(4)]:col-span-2 min-[60em]:[&:nth-child(5)]:col-span-2 min-[60em]:[&:nth-child(6)]:col-auto"
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
