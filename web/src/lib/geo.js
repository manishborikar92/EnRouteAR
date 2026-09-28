/**
 * EnRouteAR — Geolocation & Route Calculation Utilities
 * Includes Haversine formula distance calculation, waypoint interpolation,
 * and Mapbox Directions API client.
 */

export const EARTH_RADIUS_METERS = 6371000;
export const DEFAULT_ROUTE_STEP_METERS = 2;

/**
 * Calculates great-circle distance in meters between two [longitude, latitude] coordinates.
 * @param {[number, number]} start - [lng, lat]
 * @param {[number, number]} end - [lng, lat]
 * @returns {number} Distance in meters
 */
export function calculateDistance([startLng, startLat], [endLng, endLat]) {
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(endLat - startLat);
  const dLng = toRad(endLng - startLng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(startLat)) * Math.cos(toRad(endLat)) * Math.sin(dLng / 2) ** 2;

  return EARTH_RADIUS_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Generates intermediary [lng, lat] points spaced distanceMeters apart along a line segment.
 * @param {[number, number]} startPoint - [lng, lat]
 * @param {[number, number]} endPoint - [lng, lat]
 * @param {number} distanceMeters - Step distance in meters (default 2m)
 * @returns {Array<[number, number]>} Array of interpolated points
 */
export function generateIntermediaryPoints(startPoint, endPoint, distanceMeters = DEFAULT_ROUTE_STEP_METERS) {
  const points = [];
  const distance = calculateDistance(startPoint, endPoint);
  const segments = Math.ceil(distance / distanceMeters);

  for (let i = 1; i < segments; i++) {
    const fraction = i / segments;
    points.push([
      startPoint[0] + (endPoint[0] - startPoint[0]) * fraction,
      startPoint[1] + (endPoint[1] - startPoint[1]) * fraction,
    ]);
  }

  return points;
}

/**
 * Interpolates all line segments of a route polyline into discrete points for AR rendering.
 * @param {Array<[number, number]>} routeCoordinates - Array of [lng, lat] coordinates
 * @param {number} stepMeters - Distance spacing between AR cylinder entities
 * @returns {Array<[number, number]>} Array of all interpolated [lng, lat] points
 */
export function interpolateRouteCoordinates(routeCoordinates, stepMeters = DEFAULT_ROUTE_STEP_METERS) {
  if (!Array.isArray(routeCoordinates) || routeCoordinates.length < 2) {
    return [];
  }

  const allPoints = [];
  for (let i = 0; i < routeCoordinates.length - 1; i++) {
    const points = generateIntermediaryPoints(routeCoordinates[i], routeCoordinates[i + 1], stepMeters);
    allPoints.push(...points);
  }
  return allPoints;
}

export const DEFAULT_MAPBOX_TOKEN =
  "pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw";

/**
 * Fetches walking route directions from Mapbox Directions API.
 * @param {{ latitude: number, longitude: number }} origin
 * @param {{ latitude: number, longitude: number }} dest
 * @param {string} [accessToken]
 * @returns {Promise<Object>} Mapbox directions GeoJSON response
 */
export async function getWalkingDirections(origin, dest, accessToken) {
  if (!origin?.latitude || !origin?.longitude || !dest?.latitude || !dest?.longitude) {
    throw new Error('Valid origin and destination coordinates are required.');
  }

  const token = accessToken || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || DEFAULT_MAPBOX_TOKEN;
  if (!token) {
    throw new Error('Mapbox access token is not configured.');
  }

  const url = [
    'https://api.mapbox.com/directions/v5/mapbox/walking/',
    `${origin.longitude},${origin.latitude}`,
    ';',
    `${dest.longitude},${dest.latitude}`,
    `?access_token=${encodeURIComponent(token)}&geometries=geojson`,
  ].join('');

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mapbox Directions API failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}
