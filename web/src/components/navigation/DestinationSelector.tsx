'use client';

import { ChangeEvent } from 'react';
import { places } from '@/lib/places';
import type { Place } from '@/types';

// ============================================================================
// DestinationSelector — Dropdown for selecting a campus destination
// ============================================================================

interface DestinationSelectorProps {
    onSelectDestination: (place: Place) => void;
    disabled?: boolean;
}

export default function DestinationSelector({
    onSelectDestination,
    disabled = false,
}: DestinationSelectorProps) {
    const handleGetDirections = () => {
        const select = document.getElementById('select-destination') as HTMLSelectElement;
        const selectedName = select?.value;
        const place = places.find((p) => p.name === selectedName);
        if (place) {
            onSelectDestination(place);
        }
    };

    return (
        <div
            id="destination-select-container"
            className="absolute left-[1%] right-[1%] top-[2%] z-40 flex items-center
                 justify-between gap-3 rounded-lg bg-navy/80 px-3 py-2.5
                 backdrop-blur-sm"
        >
            <select
                id="select-destination"
                disabled={disabled}
                className="flex-1 rounded-lg bg-white/90 px-3 py-2 text-center text-sm
                   text-gray-800 outline-none transition-colors hover:bg-white
                   disabled:opacity-50"
            >
                <option value="">Select Destination</option>
                {places.map((place) => (
                    <option key={place.name} value={place.name}>
                        {place.name}
                    </option>
                ))}
            </select>

            <button
                id="get-direction-button"
                onClick={handleGetDirections}
                disabled={disabled}
                className="shrink-0 rounded-lg border-2 border-blue-dark bg-blue-route
                   px-4 py-2 text-sm font-medium text-white transition-all
                   duration-200 hover:bg-blue active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-50"
            >
                Get Directions
            </button>
        </div>
    );
}
