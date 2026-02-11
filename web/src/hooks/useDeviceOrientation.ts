'use client';

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// useDeviceOrientation — Compass Heading Hook
// ============================================================================

interface UseDeviceOrientationReturn {
    /** Compass heading in degrees (0-360, 0 = North) */
    heading: number;
    /** Whether the device supports orientation events */
    isSupported: boolean;
}

/**
 * Custom hook for reading the device's compass heading via the
 * DeviceOrientation API. Throttled to ~15Hz to reduce CPU usage.
 */
export function useDeviceOrientation(): UseDeviceOrientationReturn {
    const [heading, setHeading] = useState(0);
    const [isSupported, setIsSupported] = useState(false);
    const lastUpdate = useRef(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            // Throttle to ~15fps (approximately every 66ms)
            const now = Date.now();
            if (now - lastUpdate.current < 66) return;
            lastUpdate.current = now;

            if (event.alpha !== null) {
                setIsSupported(true);
                const compassHeading = 360 - event.alpha;
                setHeading(compassHeading);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return { heading, isSupported };
}
