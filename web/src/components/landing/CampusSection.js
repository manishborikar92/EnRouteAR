import { ExternalIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";

export default function CampusSection() {
  const stops = [
    "Administrative Dept.",
    "Architecture Dept.",
    "CS / IT / Electronics",
    "Civil & Mechanical Depts.",
    "Library & Canteen",
    "Gym / Indoor Stadium",
    "Jamuna & Triveni Hostels",
    "Kaveri Girls Hostel",
  ];

  return (
    <section
      className="py-[clamp(64px,9vw,120px)] relative z-1"
      id="college"
      aria-labelledby="college-h"
    >
      <div className="w-[min(1180px,100%-1.5rem)] sm:w-[min(1180px,100%-2.5rem)] mx-auto grid gap-[clamp(32px,6vw,80px)] items-start min-[56.25em]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <h2
            id="college-h"
            className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em] mb-7"
          >
            Kavikulguru Institute of Technology &amp; Science
          </h2>
          <p className="text-t2 text-[0.96rem] leading-[1.7] max-w-[60ch]">
            KITS Ramtek is a private un-aided institution run by Vodithala
            Education Society, Hyderabad. Founded in 1985 with a foundation stone
            laid by former Prime Minister Late Sri P. V. Narsimha Rao, the
            institute has grown into a distinguished technical institution
            serving rural students across Central India.
          </p>
          <p className="text-t2 text-[0.96rem] leading-[1.7] max-w-[60ch] mt-4">
            Permanently affiliated to RTMNU Nagpur, KITS offers B.E., B.Arch.,
            M.Tech. and Ph.D. programs across its lush 48.96-acre pollution-free
            campus. Awarded &apos;A&apos; Grade twice by Maharashtra State
            Government, accredited by NBA, and NAAC-rated B++.
          </p>
          <ul className="flex flex-wrap gap-2.5 my-7 list-none p-0" aria-label="Accreditations">
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              NAAC B++
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              NBA Accredited
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              &apos;A&apos; Grade × 2
            </li>
            <li className="px-3.5 py-1.5 rounded-full bg-[rgba(255,197,61,0.1)] border border-[rgba(255,197,61,0.38)] text-[#FFD978] text-[0.84rem] font-semibold">
              RTMNU Affiliated
            </li>
          </ul>
          <Button
            as="a"
            variant="ghost"
            href="https://www.kits.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Visit kits.edu</span>
            <ExternalIcon className="w-4 h-4 shrink-0" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        </div>
        <div data-spotlight="true" className="glass-panel rounded-[26px]">
          <h3 className="flex items-center gap-2.5 px-6 py-4.5 font-body font-bold text-base tracking-normal border-b border-line bg-white/[0.04] text-t1 m-0">
            <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_10px_var(--color-green)] animate-[ping-dot_2.4s_infinite]" />
            KITS Campus, Ramtek
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
            21.385°N, 79.306°E
          </p>
        </div>
      </div>
    </section>
  );
}
