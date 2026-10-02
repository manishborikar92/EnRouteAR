import { ExternalIcon } from "@/components/common/Icons";

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
    <section className="sec campus" id="college" aria-labelledby="college-h">
      <div className="wrap split b">
        <div>
          <h2 id="college-h" className="mb-7">
            Kavikulguru Institute of Technology &amp; Science
          </h2>
          <p>
            KITS Ramtek is a private un-aided institution run by Vodithala
            Education Society, Hyderabad. Founded in 1985 with a foundation stone
            laid by former Prime Minister Late Sri P. V. Narsimha Rao, the
            institute has grown into a distinguished technical institution
            serving rural students across Central India.
          </p>
          <p>
            Permanently affiliated to RTMNU Nagpur, KITS offers B.E., B.Arch.,
            M.Tech. and Ph.D. programs across its lush 48.96-acre pollution-free
            campus. Awarded &apos;A&apos; Grade twice by Maharashtra State
            Government, accredited by NBA, and NAAC-rated B++.
          </p>
          <ul className="chips" aria-label="Accreditations">
            <li>NAAC B++</li>
            <li>NBA Accredited</li>
            <li>&apos;A&apos; Grade × 2</li>
            <li>RTMNU Affiliated</li>
          </ul>
          <a
            className="btn ghost"
            href="https://www.kits.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit kits.edu
            <ExternalIcon className="i" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <div className="panel">
          <h3>
            <span className="dot" />
            KITS Campus, Ramtek
          </h3>
          <ul className="stops">
            {stops.map((stop) => (
              <li key={stop}>{stop}</li>
            ))}
          </ul>
          <p className="coord">21.385°N, 79.306°E</p>
        </div>
      </div>
    </section>
  );
}
