/**
 * EnRouteAR — Predefined campus destinations for KITS Ramtek
 * Coordinates used for destination selection, routing, and AR waypoint anchoring.
 */

export const places = [
  { name: 'Administrative Department', latitude: 21.38541, longitude: 79.30562 },
  { name: 'Architecture Department', latitude: 21.38529, longitude: 79.30656 },
  { name: 'Canteen', latitude: 21.38641, longitude: 79.30685 },
  { name: 'Civil Department', latitude: 21.38615, longitude: 79.30640 },
  { name: 'Computer Tech. Department', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'Electronics Department', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'Gym/Stadium', latitude: 21.386459963614396, longitude: 79.30433992812651 },
  { name: 'Information Tech. Department', latitude: 21.38589858431855, longitude: 79.30617602325364 },
  { name: 'Jamuna Boys Hostel', latitude: 21.38681, longitude: 79.30335 },
  { name: 'Kaveri Girls Hostel', latitude: 21.38440, longitude: 79.30420 },
  { name: 'Library', latitude: 21.38584, longitude: 79.30689 },
  { name: 'Mechanical Department', latitude: 21.38493, longitude: 79.30606 },
  { name: 'Triveni Boys Hostel', latitude: 21.38836, longitude: 79.30370 },
  { name: 'Work Shop', latitude: 21.38486, longitude: 79.30620 },
  { name: 'Location 20°18\'32.5"N 78°51\'00.5"E', latitude: 20.309028, longitude: 78.850139 },
];

export function findPlaceByName(name) {
  return places.find((p) => p.name === name) || null;
}
