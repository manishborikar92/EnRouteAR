import Atmosphere from "@/components/common/Atmosphere";

export default function NavigateLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-t1 relative">
      <Atmosphere />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-3 border-line border-t-route animate-spin shadow-[0_0_24px_rgba(76,141,255,0.4)]" />
        <div className="font-display text-[0.8rem] tracking-[0.14em] text-route uppercase animate-pulse font-bold">
          Calibrating AR Sensors &amp; Map…
        </div>
      </div>
    </div>
  );
}
