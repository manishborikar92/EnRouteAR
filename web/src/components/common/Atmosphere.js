export default function Atmosphere() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(900px_620px_at_85%_-5%,rgba(47,107,255,0.34),transparent_62%),radial-gradient(700px_520px_at_-5%_38%,rgba(255,160,70,0.10),transparent_62%),radial-gradient(1000px_640px_at_50%_118%,rgba(47,107,255,0.22),transparent_62%),linear-gradient(180deg,#07111E,#0A1627)] after:content-[''] after:absolute after:inset-0 after:opacity-[0.08] after:mix-blend-overlay after:bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%22160%22_height=%22160%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.8%22_numOctaves=%222%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="wob" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency=".005 .008" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="170" />
          </filter>
          <g id="cont" fill="none" stroke="#7FB0FF" strokeWidth="1.3">
            <circle r="70" />
            <circle r="130" />
            <circle r="190" />
            <circle r="250" />
            <circle r="310" />
            <circle r="370" />
            <circle r="430" />
            <circle r="490" />
            <circle r="550" />
          </g>
        </defs>
        <g filter="url(#wob)">
          <use href="#cont" x="1010" y="170" />
          <use href="#cont" x="110" y="760" />
        </g>
      </svg>
    </div>
  );
}
