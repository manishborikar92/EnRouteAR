"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Atmosphere from "@/components/common/Atmosphere";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-t1 px-6 text-center relative">
      <Atmosphere />
      <div className="panel max-w-[480px] p-8 rounded-2xl flex flex-col items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,145,136,0.12)] border border-[rgba(255,145,136,0.35)] flex items-center justify-center text-err shadow-[0_0_24px_rgba(255,145,136,0.25)]">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-t1">
          System Error Encountered
        </h2>
        <p className="text-[0.95rem] text-t2 leading-relaxed">
          An unexpected issue occurred while rendering the page. You can attempt to
          reload the view.
        </p>
        <button
          onClick={() => reset()}
          className="btn mt-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
