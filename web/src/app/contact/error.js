"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Atmosphere from "@/components/common/Atmosphere";
import Button from "@/components/common/Button";

export default function ContactError({ error, reset }) {
  useEffect(() => {
    console.error("Contact page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-t1 px-6 relative">
      <Atmosphere />
      <div className="glass-panel max-w-[480px] w-full p-8 rounded-2xl text-center relative z-10">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[rgba(255,197,61,0.12)] border border-[rgba(255,197,61,0.35)] flex items-center justify-center text-signal shadow-[0_0_24px_rgba(255,197,61,0.25)]">
          <AlertTriangle className="w-7 h-7 shrink-0" />
        </div>
        <h2 className="font-display text-xl font-bold text-t1 mb-2 tracking-[-0.02em]">
          Unable to Load Contact Form
        </h2>
        <p className="text-[0.92rem] text-t2 mb-6 leading-[1.6]">
          An unexpected network or rendering issue occurred. Please retry or navigate back to the home page.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            type="button"
            size="sm"
            onClick={() => reset()}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Retry</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            href="/"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
