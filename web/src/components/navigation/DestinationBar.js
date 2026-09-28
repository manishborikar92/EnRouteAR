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
      className="absolute top-[2%] left-[1%] right-[1%] flex justify-between items-center gap-2 px-2.5 py-2 bg-[rgba(4,26,42,0.93)] border border-border rounded-[18px] text-text-1 shadow-[0_8px_32px_rgba(0,0,0,0.55)] z-5 pointer-events-auto"
    >
      <Link
        href="/"
        title="Return to Home"
        aria-label="Return to Home"
        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.40)] border border-border text-primary hover:text-white hover:border-primary transition-colors no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <select
        id="select-destination"
        value={selectedDestination || ""}
        onChange={(e) => onDestinationChange(e.target.value)}
        aria-label="Select destination"
        className="flex-1 min-w-0 px-3 py-2 bg-[rgba(0,0,0,0.40)] border border-border rounded-[8px] text-text-1 font-body text-[0.9rem] appearance-none cursor-pointer outline-none overflow-hidden text-ellipsis whitespace-nowrap transition-[border-color,box-shadow] duration-[220ms] ease-custom focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,180,255,0.15)] z-5"
      >
        <option value="" disabled>
          Select Destination
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
        className="w-[105px] sm:w-[120px] py-[9px] shrink-0 bg-gradient-to-br from-primary to-primary-dk border-none rounded-[8px] text-white font-display text-[0.62rem] font-bold tracking-[0.1em] text-center cursor-pointer transition-[box-shadow,transform] duration-[220ms] ease-custom hover:shadow-[0_0_20px_rgba(0,180,255,0.5)] hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 z-5"
      >
        {isNavigating ? "Routing..." : "Navigate"}
      </button>
    </div>
  );
}
