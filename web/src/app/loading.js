export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text-1">
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <div className="font-display text-[0.72rem] tracking-[0.2em] text-primary uppercase animate-pulse">
          Initializing EnRouteAR...
        </div>
      </div>
    </div>
  );
}
