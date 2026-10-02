"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { places } from "@/lib/places";

export default function DestinationBar({
  selectedDestination,
  onDestinationChange,
  onNavigate,
  isNavigating = false,
}) {
  return (
    <div
      id="destination-select-container"
      className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2.5 px-3 py-2.5 bg-[rgba(7,17,30,0.92)] backdrop-blur-[16px] border border-[rgba(150,185,235,0.25)] rounded-[18px] text-t1 shadow-[0_12px_40px_rgba(0,0,0,0.65)] z-5 pointer-events-auto"
    >
      <Link
        href="/"
        title="Return to Home"
        aria-label="Return to Home"
        className="w-10 h-10 shrink-0 flex items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.06)] border border-[rgba(150,185,235,0.2)] text-lk hover:text-white hover:border-route transition-all no-underline"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <select
        id="select-destination"
        value={selectedDestination || ""}
        onChange={(e) => onDestinationChange(e.target.value)}
        aria-label="Select destination"
        className="flex-1 min-w-0 px-3.5 py-2.5 bg-[rgba(3,10,20,0.65)] border border-[rgba(150,185,235,0.2)] rounded-[12px] text-t1 font-body text-[0.92rem] font-medium appearance-none cursor-pointer outline-none overflow-hidden text-ellipsis whitespace-nowrap transition-all focus:border-route focus:shadow-[0_0_0_3px_rgba(76,141,255,0.25)] z-5"
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

      <button
        id="get-direction-button"
        type="button"
        onClick={onNavigate}
        disabled={!selectedDestination || isNavigating}
        className="btn sm shrink-0 !min-h-[40px] !px-4 text-[0.85rem] font-bold z-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isNavigating ? "Routing…" : "Navigate"}
      </button>
    </div>
  );
}
