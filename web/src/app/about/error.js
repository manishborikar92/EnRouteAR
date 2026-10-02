"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Atmosphere from "@/components/common/Atmosphere";

export default function AboutError({ error, reset }) {
  useEffect(() => {
    console.error("About page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-t1 px-6 relative">
      <Atmosphere />
      <div className="panel max-w-[480px] w-full p-8 rounded-2xl text-center relative z-10">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(255,197,61,0.12)] border border-[rgba(255,197,61,0.35)] flex items-center justify-center text-signal shadow-[0_0_24px_rgba(255,197,61,0.25)]">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-t1 mb-2">
          Unable to Load About Data
        </h2>
        <p className="text-[0.92rem] text-t2 mb-6 leading-[1.6]">
          An unexpected issue occurred while loading this section. Please attempt a reload or return to the home page.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => reset()}
            className="btn sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry</span>
          </button>
          <Link
            href="/"
            className="btn sm ghost"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
