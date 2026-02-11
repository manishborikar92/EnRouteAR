'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import type { Place, DirectionsResponse, MultifunctionState, Coordinates } from '@/types';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';
import { getDirections } from '@/lib/directions';
import DestinationSelector from '@/components/navigation/DestinationSelector';
import CompassWidget from '@/components/navigation/CompassWidget';
import MultifunctionButton from '@/components/navigation/MultifunctionButton';

// Dynamic imports for browser-only components (no SSR)
const ARScene = dynamic(
    () => import('@/components/navigation/ARScene'),
    { ssr: false }
);

const MapView = dynamic(
    () => import('@/components/navigation/MapView'),
    { ssr: false }
);

// ============================================================================
// Navigation Page — AR navigation with map and compass (/navigation)
// ============================================================================

export default function NavigationPage() {
    // Core state
    const [selectedDestination, setSelectedDestination] = useState<Place | null>(null);
    const [directionsData, setDirectionsData] = useState<DirectionsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Map interaction state
    const [isMapCentered, setIsMapCentered] = useState(true);
    const [isBearing, setIsBearing] = useState(false);
    const [isUserInteraction, setIsUserInteraction] = useState(false);
    const [mapBearing, setMapBearing] = useState(0);

    // Custom hooks
    const { location: userLocation, error: geoError } = useGeolocation();
    const { heading: compassHeading } = useDeviceOrientation();

    // Handle destination selection and route calculation
    const handleSelectDestination = useCallback(
        async (place: Place) => {
            if (!userLocation) {
                alert('Waiting for your location. Please try again in a moment.');
                return;
            }

            setIsLoading(true);
            setSelectedDestination(place);

            try {
                const data = await getDirections(userLocation, {
                    latitude: place.latitude,
                    longitude: place.longitude,
                });

                setDirectionsData(data);

                // Auto-center and enable bearing
                setIsUserInteraction(false);
                setIsMapCentered(true);
                setIsBearing(true);
            } catch (err) {
                console.error('Error getting directions:', err);
                alert('Could not find a route to that destination.');
            } finally {
                setIsLoading(false);
            }
        },
        [userLocation]
    );

    // Handle map touch interaction
    const handleMapInteraction = useCallback(() => {
        setIsUserInteraction(true);
        setIsMapCentered(false);
        setIsBearing(false);
    }, []);

    // Handle multifunction button click
    const handleMultifunctionClick = useCallback(() => {
        if (selectedDestination && isMapCentered && isBearing) {
            // Reset all
            setSelectedDestination(null);
            setDirectionsData(null);
            setIsBearing(false);
        } else if (isMapCentered) {
            // Toggle bearing
            setIsBearing((prev) => !prev);
        } else {
            // Re-center
            setIsUserInteraction(false);
            setIsMapCentered(true);
        }
    }, [selectedDestination, isMapCentered, isBearing]);

    // Calculate multifunction button state
    const getMultifunctionState = (): MultifunctionState => {
        if (selectedDestination && isMapCentered && isBearing) return 'reset-all';
        if (isMapCentered && !isBearing) return 'centered';
        if (isUserInteraction) return 'recenter';
        if (isBearing) return 'bearing';
        return 'centered';
    };

    // Destination coordinates for the map
    const destCoords: Coordinates | null = selectedDestination
        ? { latitude: selectedDestination.latitude, longitude: selectedDestination.longitude }
        : null;

    return (
        <div className="relative flex h-screen flex-col overflow-hidden">
            {/* Destination selector overlay */}
            <DestinationSelector
                onSelectDestination={handleSelectDestination}
                disabled={isLoading}
            />

            {/* AR camera scene (background) */}
            <ARScene directionsData={directionsData} />

            {/* Compass widget */}
            <CompassWidget heading={compassHeading} />

            {/* 2D Map panel */}
            <MapView
                userLocation={userLocation}
                directionsData={directionsData}
                destinationName={selectedDestination?.name ?? null}
                destinationCoords={destCoords}
                compassHeading={compassHeading}
                isMapCentered={isMapCentered}
                isBearing={isBearing}
                onMapInteraction={handleMapInteraction}
                onMapBearingChange={setMapBearing}
            />

            {/* Multifunction button */}
            <MultifunctionButton
                state={getMultifunctionState()}
                onClick={handleMultifunctionClick}
            />

            {/* Loading overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky/30 border-t-blue" />
                        <p className="text-sm text-sky">Calculating route…</p>
                    </div>
                </div>
            )}

            {/* Geolocation error message */}
            {geoError && (
                <div className="fixed inset-x-0 bottom-[190px] z-30 px-4">
                    <div className="rounded-lg bg-red-900/90 px-4 py-3 text-center text-sm text-red-200 backdrop-blur-sm">
                        {geoError}
                    </div>
                </div>
            )}
        </div>
    );
}
