import { ExternalIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function DestinationsSection() {
  const stops = [
    "Administration Center",
    "Design & Architecture Center",
    "Technology & Innovation Labs",
    "Engineering Facilities",
    "Central Library & Dining",
    "Sports & Recreation Complex",
    "North & Northeast Wings",
    "South Pavilion",
  ];

  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1"
      id="destinations"
      aria-labelledby="destinations-h"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(32px,6vw,80px)] items-start min-[56.25em]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <h2
            id="destinations-h"
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-7"
          >
            Precision navigation across physical environments
          </h2>
          <p className="text-t2 text-[0.96rem] leading-[1.7] max-w-[60ch]">
            EnRouteAR is designed for fluid, intuitive wayfinding across expansive
            venues, complexes, outdoor facilities, and architectural grounds.
            By fusing browser-based spatial computing with real-time GPS positioning,
            it connects physical spaces with digital waypoint guidance.
          </p>
          <p className="text-t2 text-[0.96rem] leading-[1.7] max-w-[60ch] mt-4">
            Without downloading native applications or relying on fixed signage,
            visitors can explore grounds, locate key facilities, and follow
            turn-by-turn walking routes rendered directly within their live camera feed.
          </p>
          <ul className="flex flex-wrap gap-2.5 my-7 list-none p-0" aria-label="System Capabilities">
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              Sub-meter Precision
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              Zero-Install WebXR
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              Satellite Overlay
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              Compass Synchronized
            </li>
          </ul>
          <Button
            as="a"
            variant="ghost"
            href="/navigate"
          >
            <span>Explore navigation</span>
            <ExternalIcon className="w-4 h-4 shrink-0" />
          </Button>
        </div>
        <div data-spotlight="true" className="glass-panel rounded-[26px]">
          <h3 className="flex items-center gap-2.5 px-6 py-4.5 font-body font-bold text-base tracking-normal border-b border-line bg-white/[0.04] text-t1 m-0">
            <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] animate-[ping-dot_2.4s_infinite]" />
            Waypoint Navigation Network
          </h3>
          <ul className="relative px-6 py-3 list-none m-0 before:content-[''] before:absolute before:left-[30px] before:top-[30px] before:bottom-[30px] before:w-0.5 before:bg-gradient-to-b before:from-route before:to-[rgba(76,141,255,0.15)]">
            {stops.map((stop) => (
              <li
                key={stop}
                className="relative py-[11px] pl-[30px] pr-0 text-t2 text-[0.96rem] before:content-[''] before:absolute before:left-[1px] before:top-[17px] before:w-3 before:h-3 before:rounded-full before:bg-bg before:border-[3px] before:border-route before:shadow-[0_0_12px_rgba(76,141,255,0.7)]"
              >
                {stop}
              </li>
            ))}
          </ul>
          <p className="px-6 py-3.5 border-t border-line text-[0.84rem] text-t3 tabular-nums bg-black/18 m-0">
            Live GPS Anchoring // Sub-Meter Interpolation
          </p>
        </div>
      </div>
    </section>
  );
}
