// ============================================================================
// EnRouteAR — Shared Type Definitions
// ============================================================================

/** A geographic coordinate with latitude and longitude */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** A predefined campus destination */
export interface Place {
  name: string;
  latitude: number;
  longitude: number;
}

/** A coordinate pair as used by Mapbox/GeoJSON [longitude, latitude] */
export type LngLat = [number, number];

/** Mapbox Directions API response (simplified) */
export interface DirectionsResponse {
  routes: DirectionsRoute[];
  waypoints: DirectionsWaypoint[];
  code: string;
}

export interface DirectionsRoute {
  geometry: {
    coordinates: LngLat[];
    type: string;
  };
  distance: number;
  duration: number;
  legs: DirectionsLeg[];
}

export interface DirectionsLeg {
  distance: number;
  duration: number;
  steps: DirectionsStep[];
  summary: string;
}

export interface DirectionsStep {
  distance: number;
  duration: number;
  geometry: {
    coordinates: LngLat[];
    type: string;
  };
  maneuver: {
    instruction: string;
    type: string;
    modifier?: string;
    bearing_after: number;
    bearing_before: number;
    location: LngLat;
  };
  name: string;
}

export interface DirectionsWaypoint {
  name: string;
  location: LngLat;
}

/** State for the multifunction button */
export type MultifunctionState = 'centered' | 'bearing' | 'recenter' | 'reset-all';

/** Navigation page state */
export interface NavigationState {
  userLocation: Coordinates;
  selectedDestination: Place | null;
  directionsData: DirectionsResponse | null;
  isMapCentered: boolean;
  isBearing: boolean;
  isUserInteraction: boolean;
  compassHeading: number;
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
