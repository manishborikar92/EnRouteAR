import type { Coordinates, DirectionsResponse } from '@/types';
import { MAPBOX_ACCESS_TOKEN } from './constants';

// ============================================================================
// EnRouteAR — Mapbox Directions API Client
// ============================================================================

/**
 * Fetch walking directions between two coordinates from the Mapbox Directions API.
 * @param origin - User's current location
 * @param destination - Selected destination
 * @returns Parsed directions response with route geometry
 */
export async function getDirections(
    origin: Coordinates,
    destination: Coordinates
): Promise<DirectionsResponse> {
    const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/walking';
    const coordinates = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;
    const params = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        geometries: 'geojson',
    });

    const url = `${baseUrl}/${coordinates}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Directions API error: ${response.status} ${response.statusText}`);
    }

    const data: DirectionsResponse = await response.json();

    if (data.code !== 'Ok' || !data.routes.length) {
        throw new Error('No route found between the specified locations.');
    }

    return data;
}
