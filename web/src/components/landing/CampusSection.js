import { ExternalLink } from "lucide-react";

export default function CampusSection() {
  const campusLocations = [
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
      className="content-section alt-bg relative z-10 py-[100px] px-10 max-md:py-[72px] max-md:px-6 bg-gradient-to-b from-bg-alt to-[rgba(4,26,42,0.5)] border-y border-border"
      id="college"
    >
      <div className="section-inner max-w-[1200px] mx-auto">
        <div className="section-label reveal flex items-center gap-3.5 font-display text-[0.6rem] tracking-[0.22em] text-primary uppercase mb-5">
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
          THE CAMPUS
          <span className="label-line flex-1 h-[1px] bg-gradient-to-r from-primary to-transparent max-w-[80px]" />
        </div>

        <div className="college-layout grid grid-cols-[1fr_380px] max-lg:grid-cols-1 gap-[60px] items-start">
          <div className="college-text">
            <h2 className="section-title reveal font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-text-1 mb-[52px]">
              Kavikulguru Institute of Technology &amp; Science
            </h2>
            <p className="reveal text-text-2 mb-4 text-[0.96rem] leading-[1.8]">
              KITS Ramtek is a private un-aided institution run by Vodithala Education Society,
              Hyderabad. Founded in 1985 with a foundation stone laid by former Prime Minister Late
              Sri P. V. Narsimha Rao, the institute has grown into a distinguished technical
              institution serving rural students across Central India.
            </p>
            <p className="reveal text-text-2 mb-4 text-[0.96rem] leading-[1.8]">
              Permanently affiliated to RTMNU Nagpur, KITS offers B.E., B.Arch., M.Tech. and Ph.D.
              programs across its lush 48.96-acre pollution-free campus. Awarded &apos;A&apos; Grade twice
              by Maharashtra State Government, accredited by NBA, and NAAC-rated B++.
            </p>

            <div className="badge-row reveal flex flex-wrap gap-2.5 my-6">
              <div className="badge font-display text-[0.58rem] tracking-[0.12em] text-accent bg-[rgba(250,207,14,0.08)] border border-[rgba(250,207,14,0.25)] rounded-full px-3.5 py-1.25">
                NAAC B++
              </div>
              <div className="badge font-display text-[0.58rem] tracking-[0.12em] text-accent bg-[rgba(250,207,14,0.08)] border border-[rgba(250,207,14,0.25)] rounded-full px-3.5 py-1.25">
                NBA Accredited
              </div>
              <div className="badge font-display text-[0.58rem] tracking-[0.12em] text-accent bg-[rgba(250,207,14,0.08)] border border-[rgba(250,207,14,0.25)] rounded-full px-3.5 py-1.25">
                &apos;A&apos; Grade × 2
              </div>
              <div className="badge font-display text-[0.58rem] tracking-[0.12em] text-accent bg-[rgba(250,207,14,0.08)] border border-[rgba(250,207,14,0.25)] rounded-full px-3.5 py-1.25">
                RTMNU Affiliated
              </div>
            </div>

            <a
              href="https://www.kits.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline reveal inline-flex items-center gap-2 text-primary no-underline font-display text-[0.72rem] tracking-[0.1em] px-6 py-3 border border-border-hi rounded-md hover:bg-[rgba(0,180,255,0.08)] hover:border-primary transition-[background,border-color] duration-250 mt-6"
            >
              Visit kits.edu
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <div className="campus-map-card reveal bg-surface border border-border rounded-lg overflow-hidden backdrop-blur-[12px] shadow-card max-lg:max-w-[500px]">
            <div className="map-card-header flex items-center gap-2.5 font-display text-[0.6rem] tracking-[0.15em] text-primary px-5 py-4 bg-[rgba(0,180,255,0.06)] border-b border-border">
              <span className="pulse-dot w-[7px] h-[7px] bg-primary rounded-full animate-pulse-ring shrink-0" />
              KITS CAMPUS · RAMTEK
            </div>
            <div className="campus-locations py-2">
              {campusLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="loc-item flex items-center gap-2.5 px-5 py-2.5 text-[0.88rem] text-text-2 border-b border-[rgba(0,180,255,0.04)] last:border-b-0 hover:bg-surface-hi hover:text-text-1 transition-colors duration-250"
                >
                  <span className="loc-dot w-1.5 h-1.5 bg-primary rounded-full shrink-0 shadow-[0_0_6px_rgba(0,180,255,0.5)]" />
                  {loc}
                </div>
              ))}
            </div>
            <div className="map-card-footer font-display text-[0.58rem] tracking-[0.12em] text-text-3 px-5 py-3 border-t border-border bg-[rgba(0,0,0,0.15)]">
              21.385°N · 79.306°E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
