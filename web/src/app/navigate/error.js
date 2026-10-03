"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Atmosphere from "@/components/common/Atmosphere";
import Button from "@/components/common/Button";

export default function NavigateError({ error, reset }) {
  useEffect(() => {
    console.error("Navigation error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-t1 px-6 text-center relative">
      <Atmosphere />
      <div className="glass-panel max-w-[480px] w-full p-6 sm:p-8 rounded-2xl flex flex-col items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,145,136,0.12)] border border-[rgba(255,145,136,0.35)] flex items-center justify-center text-err shadow-[0_0_24px_rgba(255,145,136,0.25)]">
          <AlertTriangle className="w-7 h-7 shrink-0" />
        </div>
        <h2 className="font-display text-xl font-bold text-t1 tracking-[-0.02em]">
          Navigation Error
        </h2>
        <p className="text-[0.92rem] text-t2 leading-relaxed">
          An error occurred while initializing the AR navigation system or map engine.
        </p>
        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center w-full">
          <Button
            type="button"
            size="sm"
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Retry</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            href="/"
            className="w-full sm:w-auto"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
