/**
 * EnRouteAR — Predefined destination waypoints
 * Coordinates used for destination selection, routing, and AR waypoint anchoring.
 */

export const places = [
  { name: 'Administration Center', latitude: 21.38541, longitude: 79.30562 },
  { name: 'Design & Architecture Center', latitude: 21.38529, longitude: 79.30656 },
  { name: 'Dining & Cafeteria', latitude: 21.38641, longitude: 79.30685 },
  { name: 'East Facility', latitude: 21.38615, longitude: 79.30640 },
  { name: 'Technology Center', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'Innovation Lab', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'Sports & Recreation Complex', latitude: 21.386459963614396, longitude: 79.30433992812651 },
  { name: 'Information Center', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'North Wing', latitude: 21.38681, longitude: 79.30335 },
  { name: 'South Wing', latitude: 21.38440, longitude: 79.30420 },
  { name: 'Central Library', latitude: 21.38584, longitude: 79.30689 },
  { name: 'Engineering Center', latitude: 21.38493, longitude: 79.30606 },
  { name: 'Northeast Annex', latitude: 21.38836, longitude: 79.30370 },
  { name: 'Operations Workshop', latitude: 21.38486, longitude: 79.30620 },
  { name: 'Field Location (20°18\'32"N, 78°51\'00"E)', latitude: 20.309028, longitude: 78.850139 },
];

export function findPlaceByName(name) {
  return places.find((p) => p.name === name) || null;
}
