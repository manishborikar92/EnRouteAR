export default function AboutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text-1">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <div className="font-display text-[0.68rem] tracking-[0.2em] text-primary uppercase animate-pulse">
          LOADING ABOUT SPECIFICATION...
        </div>
      </div>
    </div>
  );
}
