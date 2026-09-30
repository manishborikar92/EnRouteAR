"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function AboutError({ error, reset }) {
  useEffect(() => {
    console.error("About page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text-1 px-6">
      <div className="max-w-[480px] w-full p-8 bg-surface border border-border rounded-lg text-center backdrop-blur-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgba(250,207,14,0.1)] border border-[rgba(250,207,14,0.3)] flex items-center justify-center text-accent">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="font-display font-bold text-[1.2rem] tracking-[0.08em] text-text-1 mb-2">
          UNABLE TO LOAD ABOUT DATA
        </h2>
        <p className="text-[0.88rem] text-text-2 mb-6 leading-[1.6]">
          An unexpected anomaly occurred while loading this section. Please attempt a reload or return to the main interface.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary to-primary-dk text-white font-display text-[0.68rem] tracking-[0.12em] font-semibold rounded-sm cursor-pointer border-none hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RETRY
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgba(0,0,0,0.4)] border border-border text-text-2 font-display text-[0.68rem] tracking-[0.12em] rounded-sm hover:text-text-1 hover:border-primary transition-all no-underline"
          >
            <Home className="w-3.5 h-3.5" />
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
