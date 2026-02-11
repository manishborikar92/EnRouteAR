// ============================================================================
// EnRouteAR — Application Constants
// ============================================================================

/** Mapbox access token from environment variable */
export const MAPBOX_ACCESS_TOKEN =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

/** Formspree form endpoint */
export const FORMSPREE_ENDPOINT =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';

/** Default map configuration */
export const MAP_CONFIG = {
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    defaultCenter: [79.306, 21.386] as [number, number], // KITS campus center
    defaultZoom: 16,
    globeCenter: [78, 20] as [number, number],
    globeZoom: 0,
    flyToSpeed: 1.5,
    navigationZoom: 17,
    projection: 'globe' as const,
    routeColor: '#3882f6',
    routeWidth: 7,
} as const;

/** AR configuration */
export const AR_CONFIG = {
    markerRadius: 0.5,
    markerHeight: 0.15,
    markerColor: '#3882f6',
    markerOpacity: 1,
    glbModelPath: '/models/map_pointer_3d_icon.glb',
    glbScale: '0.5 0.5 0.5',
    glbPosition: '0 1 0',
    distanceBetweenMarkers: 2, // meters
} as const;

/** Geolocation configuration */
export const GEO_CONFIG = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000,
} as const;

/** External links */
export const EXTERNAL_LINKS = {
    collegeWebsite: 'https://www.kits.edu/',
} as const;
