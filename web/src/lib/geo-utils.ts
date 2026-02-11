import type { LngLat } from '@/types';

// ============================================================================
// EnRouteAR — Geospatial Utility Functions
// ============================================================================

const EARTH_RADIUS_METERS = 6371000;

/**
 * Calculate the distance between two geographic coordinates using the
 * Haversine formula.
 * @param start - [lng, lat] of the start point
 * @param end - [lng, lat] of the end point
 * @returns Distance in meters
 */
export function calculateDistance(start: LngLat, end: LngLat): number {
    const [startLng, startLat] = start;
    const [endLng, endLat] = end;

    const startLatRad = (startLat * Math.PI) / 180;
    const endLatRad = (endLat * Math.PI) / 180;
    const latDiffRad = ((endLat - startLat) * Math.PI) / 180;
    const lngDiffRad = ((endLng - startLng) * Math.PI) / 180;

    const a =
        Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
        Math.cos(startLatRad) *
        Math.cos(endLatRad) *
        Math.sin(lngDiffRad / 2) *
        Math.sin(lngDiffRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_METERS * c;
}

/**
 * Generate evenly-spaced intermediary points between two coordinates.
 * Used to place AR markers along a route segment.
 * @param startPoint - [lng, lat] of segment start
 * @param endPoint - [lng, lat] of segment end
 * @param distanceBetweenPoints - spacing in meters between generated points
 * @returns Array of intermediary [lng, lat] coordinates
 */
export function generateIntermediaryPoints(
    startPoint: LngLat,
    endPoint: LngLat,
    distanceBetweenPoints: number
): LngLat[] {
    const intermediaryPoints: LngLat[] = [];
    const totalDistance = calculateDistance(startPoint, endPoint);
    const segments = Math.ceil(totalDistance / distanceBetweenPoints);

    for (let i = 1; i < segments; i++) {
        const fraction = i / segments;
        const intermediateLng = startPoint[0] + (endPoint[0] - startPoint[0]) * fraction;
        const intermediateLat = startPoint[1] + (endPoint[1] - startPoint[1]) * fraction;
        intermediaryPoints.push([intermediateLng, intermediateLat]);
    }

    return intermediaryPoints;
}
