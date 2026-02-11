'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Coordinates } from '@/types';
import { GEO_CONFIG } from '@/lib/constants';

// ============================================================================
// useGeolocation — GPS Location Tracking Hook
// ============================================================================

interface UseGeolocationReturn {
    location: Coordinates | null;
    error: string | null;
    isTracking: boolean;
}

/**
 * Custom hook for watching the user's geolocation.
 * Starts tracking on mount and cleans up on unmount.
 */
export function useGeolocation(): UseGeolocationReturn {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setError('Geolocation is not supported by this browser.');
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                setIsTracking(true);
                setError(null);
            },
            (err) => {
                setIsTracking(false);
                switch (err.code) {
                    case 1:
                        setError('Device location is off. Please enable location and refresh the page.');
                        break;
                    case 2:
                        setError('Position information is unavailable. Please try again.');
                        break;
                    case 3:
                        setError('Request to get user location timed out. Please try again.');
                        break;
                    default:
                        setError(`Geolocation error: ${err.message}`);
                }
            },
            GEO_CONFIG
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return { location, error, isTracking };
}

/**
 * Request geolocation permission and get the current position once.
 * Used on the landing page before navigating to the navigation page.
 */
export function useGeolocationPermission() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (!('geolocation' in navigator)) {
            setHasPermission(false);
            return false;
        }

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setHasPermission(true);
                    resolve(true);
                },
                () => {
                    setHasPermission(false);
                    resolve(false);
                },
                { enableHighAccuracy: false }
            );
        });
    }, []);

    return { hasPermission, requestPermission };
}
