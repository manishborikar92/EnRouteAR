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
      className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2.5 px-3 py-2.5 bg-[#07111E]/92 backdrop-blur-[16px] border border-line-bright/70 rounded-[18px] text-t1 shadow-[0_12px_40px_rgba(0,0,0,0.65)] z-5 pointer-events-auto"
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
        className="flex-1 min-w-0 px-3.5 py-2.5 bg-[#030a14]/65 border border-line-bright/60 rounded-xl text-t1 font-body text-[0.92rem] font-medium appearance-none cursor-pointer outline-none overflow-hidden text-ellipsis whitespace-nowrap transition-all focus:border-route focus:ring-4 focus:ring-route/25 z-5"
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
        className="shrink-0 z-5 font-bold !text-[0.85rem] !px-4"
      >
        {isNavigating ? "Routing…" : "Navigate"}
      </Button>
    </div>
  );
}
