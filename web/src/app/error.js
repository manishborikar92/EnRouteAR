"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text-1 px-6 text-center">
      <div className="max-w-[480px] p-8 rounded-xl bg-surface border border-border backdrop-blur-md flex flex-col items-center gap-4 shadow-card">
        <div className="w-12 h-12 rounded-full bg-[rgba(239,68,68,0.1)] border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="font-display text-xl font-bold text-text-1 tracking-wide">
          System Error Encountered
        </h2>
        <p className="text-[0.9rem] text-text-2 leading-relaxed">
          An unexpected issue occurred while rendering the page. You can attempt to reload the view.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dk text-white font-display text-[0.72rem] font-semibold tracking-[0.1em] px-6 py-3 rounded-md border-none cursor-pointer hover:shadow-glow transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
