import Atmosphere from "@/components/common/Atmosphere";

export default function ContactLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-t1 relative">
      <Atmosphere />
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="w-10 h-10 rounded-full border-3 border-line border-t-route animate-spin shadow-[0_0_20px_rgba(76,141,255,0.4)]" />
        <div className="font-display text-[0.8rem] tracking-[0.14em] text-route uppercase animate-pulse font-bold">
          Loading Contact Channels…
        </div>
      </div>
    </div>
  );
}
