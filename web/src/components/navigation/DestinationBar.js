"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { places } from "@/lib/places";
import Button from "@/components/common/Button";

export default function DestinationBar({
  selectedDestination,
  onDestinationChange,
  onNavigate,
  isNavigating = false,
}) {
  return (
    <div
      id="destination-select-container"
      className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] flex justify-between items-center gap-2.5 px-3 py-2.5 bg-[#07111E]/92 backdrop-blur-[16px] border border-line-bright/70 rounded-[18px] text-t1 shadow-[0_12px_40px_rgba(0,0,0,0.65)] z-5 pointer-events-auto"
    >
      <Link
        href="/"
        title="Return to Home"
        aria-label="Return to Home"
        className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-white/[0.06] border border-line-bright/60 text-lk hover:text-white hover:border-route transition-all no-underline"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <select
        id="select-destination"
        value={selectedDestination || ""}
        onChange={(e) => onDestinationChange(e.target.value)}
        aria-label="Select destination"
        className="flex-1 min-w-0 pl-3.5 pr-8 py-2.5 bg-[#030a14]/65 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%238EA0B8%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3E%3Cpath_d=%22m6_9_6_6_6-6%22/%3E%3C/svg%3E')] bg-[right_10px_center] bg-no-repeat border border-line-bright/60 rounded-xl text-t1 font-body text-base sm:text-[0.92rem] font-medium appearance-none cursor-pointer outline-none overflow-hidden text-ellipsis whitespace-nowrap transition-all focus:border-route focus:ring-4 focus:ring-route/25 z-5"
      >
        <option value="" disabled>
          Select Campus Destination
        </option>
        {places.map((place) => (
          <option key={place.name} value={place.name}>
            {place.name}
          </option>
        ))}
      </select>

      <Button
        id="get-direction-button"
        size="sm"
        onClick={onNavigate}
        disabled={!selectedDestination || isNavigating}
        busy={isNavigating}
        className="shrink-0 z-5 font-bold !text-[0.85rem] !px-3 sm:!px-4 min-h-10"
      >
        {isNavigating ? "Routing…" : "Navigate"}
      </Button>
    </div>
  );
}
