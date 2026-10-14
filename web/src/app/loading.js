import Atmosphere from "@/components/common/Atmosphere";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-t1 relative">
      <Atmosphere />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="w-12 h-12 rounded-full border-3 border-line border-t-route animate-spin shadow-[0_0_24px_rgba(76,141,255,0.4)]" />
        <div className="font-display text-sm tracking-[0.12em] text-route uppercase animate-pulse font-bold">
          Initializing EnRouteAR…
        </div>
      </div>
    </div>
  );
}
