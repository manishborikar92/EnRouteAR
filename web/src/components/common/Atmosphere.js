export default function Atmosphere() {
  return (
    <div className="atmos" aria-hidden="true">
      <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
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
