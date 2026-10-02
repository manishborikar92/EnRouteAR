"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Atmosphere from "@/components/common/Atmosphere";

export default function NavigateError({ error, reset }) {
  useEffect(() => {
    console.error("Navigation error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-t1 px-6 text-center relative">
      <Atmosphere />
      <div className="panel max-w-[480px] p-8 rounded-2xl flex flex-col items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,145,136,0.12)] border border-[rgba(255,145,136,0.35)] flex items-center justify-center text-err shadow-[0_0_24px_rgba(255,145,136,0.25)]">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-t1">
          Navigation Error
        </h2>
        <p className="text-[0.92rem] text-t2 leading-relaxed">
          An error occurred while initializing the AR navigation system or map engine.
        </p>
        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
          <button
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
