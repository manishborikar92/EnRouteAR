import { ArrowUpRight, LocateFixed, Map, ScanLine } from "lucide-react";

export function RouteMap({ className = "" }) {
  return (
    <svg viewBox="0 0 600 420" fill="none" aria-hidden="true" className={className}>
      <path d="M-60 90C60 30 120 130 210 60S370 35 440 0M-70 130C60 70 130 170 220 100S380 75 450 30M-70 170C50 110 140 210 230 140S390 115 470 60M-70 210C70 150 130 250 240 180S400 155 490 100M-70 250C80 190 140 290 250 220S410 195 510 140M-70 290C90 230 160 330 260 260S440 240 600 160M-70 330C90 270 180 370 280 300S450 280 640 200M-70 370C110 310 190 410 290 340S480 310 640 240M-70 410C110 350 220 450 310 380S480 350 640 280" stroke="#456457" strokeWidth="1" opacity=".5" />
      <g transform="translate(75 12) rotate(-18 240 210)">
        <path d="M-120 135H560M-120 286H600M98-40V480M293-40V480M447-40V480" stroke="#0e2821" strokeWidth="28" />
        <path d="M-120 135H560M-120 286H600M98-40V480M293-40V480M447-40V480" stroke="#5a7465" strokeWidth="1" strokeDasharray="4 7" />
        <g fill="#38584a" stroke="#64816c" strokeWidth="1">
          <rect x="-15" y="22" width="82" height="79" rx="7" /><rect x="132" y="19" width="57" height="84" rx="7" /><rect x="208" y="19" width="52" height="84" rx="7" />
          <rect x="327" y="19" width="83" height="82" rx="7" /><rect x="328" y="175" width="85" height="76" rx="7" />
          <rect x="132" y="171" width="124" height="82" rx="7" /><rect x="-32" y="176" width="98" height="77" rx="7" />
          <rect x="133" y="323" width="57" height="89" rx="7" /><rect x="211" y="323" width="47" height="89" rx="7" /><rect x="328" y="325" width="83" height="83" rx="7" />
        </g>
        <g stroke="#98b4a0" opacity=".25"><path d="M-5 32H55V87H-5ZM141 183H245V241H141ZM338 187H400V240H338ZM339 336H401V395H339" /><path d="M164 24V99M232 24V99M342 28V89M355 28V89M368 28V89M381 28V89M394 28V89" /></g>
        <path d="M98 393V303Q98 286 115 286H276Q293 286 293 268V150Q293 135 310 135H375" stroke="#d7ef85" strokeWidth="22" opacity=".1" strokeLinecap="round" />
        <path d="M98 393V303Q98 286 115 286H276Q293 286 293 268V150Q293 135 310 135H375" stroke="#d7ef85" strokeWidth="5" strokeLinecap="round" />
        <circle cx="98" cy="393" r="20" fill="#d7ef85" fillOpacity=".2" /><circle cx="98" cy="393" r="8" fill="#fff" /><circle cx="98" cy="393" r="4" fill="#203e36" />
        <circle cx="375" cy="135" r="12" fill="#d7ef85" /><circle cx="375" cy="135" r="4" fill="#203e36" />
        <path d="m181 279 9 7-9 7m105-77 7-9 7 9" stroke="#f5f4ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function RoutePreview() {
  return (
    <figure className="relative min-w-0">
      <div className="relative overflow-hidden rounded-[2rem] border border-forest bg-forest text-white shadow-panel">
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mist"><span className="size-1.5 rounded-full bg-lime" />A new perspective</span>
          <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] tracking-wider text-mist">AR + MAP</span>
        </div>
        <div className="relative h-80 sm:h-96 lg:h-[27rem]">
          <RouteMap className="absolute inset-0 size-full scale-110" />
          <div className="absolute right-5 top-12 flex items-center gap-3 rounded-2xl border border-white/20 bg-ink/95 p-3.5 shadow-xl sm:right-9 sm:top-16">
            <span className="grid size-10 place-items-center rounded-xl bg-lime text-ink"><ArrowUpRight className="size-6" aria-hidden="true" /></span>
            <div><p className="text-sm font-semibold">Your destination</p><p className="mt-0.5 text-xs text-mist">A path with perspective</p></div>
          </div>
          <div className="absolute bottom-9 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-ink/95 px-3 py-2 text-xs shadow-lg sm:left-9"><LocateFixed className="size-4 text-lime" aria-hidden="true" />Your starting point</div>
          <div className="absolute bottom-9 right-6 flex size-12 flex-col items-center justify-center rounded-full border border-white/25 text-lime sm:right-9"><span className="text-[9px] font-semibold">N</span><ArrowUpRight className="size-5 -rotate-45" aria-hidden="true" /></div>
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/15 bg-ink/40 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-2 text-sm"><ScanLine className="size-4 text-lime" aria-hidden="true" />See the way ahead.</div>
          <span className="flex items-center gap-2 text-xs text-mist"><Map className="size-4" aria-hidden="true" />Keep the bigger picture.</span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">Illustrated route preview. Live navigation uses your location.</figcaption>
    </figure>
  );
}
