/* =============================================================
   EnRouteAR — script.js
   Core logic for AR navigation:
     - Mapbox 2D map initialisation
     - Device orientation / compass
     - GPS location watching
     - Destination selection & Mapbox Directions API
     - AR route rendering (A-Frame cylinders + GLB pointer)
     - Multifunction button state management
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── DOM REFERENCES ──────────────────────────────────────────────

    const destinationSelect = document.getElementById('select-destination');
    const directionsButton  = document.getElementById('get-direction-button');
    const mapContainer      = document.getElementById('map');


    // ── STATE ───────────────────────────────────────────────────────

    let map;
    let compass;
    let compassRotation  = 0;   // Current device heading in degrees
    let mapBearing       = 0;   // Current map bearing in degrees

    let currentLocationMarker = null;
    let destinationMarker     = null;
    let destination           = null;

    let userLocation = { latitude: 0, longitude: 0 };

    // Map interaction flags
    let isUserInteraction = false; // True while the user is manually panning/zooming
    let isMapCentered     = true;  // True when the map is following the user's position
    let isBearing         = false; // True when the map rotates with the device compass


    // ── CONSTANTS ───────────────────────────────────────────────────

    const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
    const MAP_STYLE    = 'mapbox://styles/mapbox/satellite-streets-v12';
    const DEFAULT_ZOOM = 17;
    const ROUTE_STEP_METERS = 2; // Distance between AR route cylinder markers
    const AR_SCENE_SELECTOR = 'a-scene';
    const SOURCE_ID         = 'route';


    // ── MAP INITIALISATION ──────────────────────────────────────────

    /**
     * Creates the Mapbox map, compass DOM element, and attaches
     * the device-orientation listener.
     */
    const initMap = async () => {
        try {
            mapboxgl.accessToken = MAPBOX_TOKEN;

            map = new mapboxgl.Map({
                container: mapContainer,
                style:     MAP_STYLE,
                center:    [78, 20], // Default — overridden once GPS fires
                zoom:      0,
                bearing:   0,
                pitch:     0,
                projection: 'globe',
            });

            // Create the compass indicator element
            compass = document.createElement('div');
            compass.className = 'compass';
            document.getElementById('compass-container').appendChild(compass);

            window.addEventListener('deviceorientation', handleOrientation);

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    };


    // ── GPS LOCATION WATCHING ───────────────────────────────────────

    /**
     * Watches the device GPS position and updates the map and
     * current-location marker on every fix.
     */
    const watchUserLocation = () => {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Always keep userLocation current for direction requests
                userLocation = { latitude, longitude };

                // Only re-centre the map if the user hasn't manually panned
                if (!isUserInteraction) {
                    updateMapCenter(latitude, longitude);
                }

                // Update or create the "You are here" marker
                if (currentLocationMarker) {
                    updateMarker(currentLocationMarker, latitude, longitude, 'You are here!');
                } else {
                    currentLocationMarker = addMarker(latitude, longitude, 'You are here!', '../models/current.png');
                }
            },
            (error) => {
                switch (error.code) {
                    case 1: alert('Device location is off. Please enable location and refresh the page.'); break;
                    case 2: alert('Position information is unavailable. Please try again.'); break;
                    case 3: alert('Request to get user location timed out. Please try again.'); break;
                    default: console.error('Error retrieving position:', error.message);
                }
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
        );
    };


    // ── DEVICE ORIENTATION ──────────────────────────────────────────

    /**
     * Fired on every deviceorientation event.
     * Rotates the compass widget, optionally rotates the map,
     * and updates the user-location marker rotation.
     */
    const handleOrientation = (event) => {
        compassRotation = 360 - event.alpha;

        // Rotate the compass widget opposite to the heading so it always points North
        compass.style.transform = `rotate(${360 - compassRotation}deg)`;

        // Apply compass heading to the map when in bearing mode
        if (isMapCentered && isBearing) {
            map.setBearing(compassRotation);
        }

        // Keep the user marker pointing in the direction of travel
        if (currentLocationMarker) {
            currentLocationMarker.setRotation(compassRotation - mapBearing);
            currentLocationMarker.setPitchAlignment('map');
        } else {
            currentLocationMarker = addMarker(userLocation.latitude, userLocation.longitude, 'You are here!', '../models/current.png');
            currentLocationMarker.setRotation(compassRotation);
            currentLocationMarker.setPitchAlignment('map');
        }

        updateMultifunctionButton();
    };


    // ── MULTIFUNCTION BUTTON ────────────────────────────────────────

    /**
     * Reflects the current navigation state onto the multifunction
     * button by swapping its CSS class (which swaps the icon image).
     *
     * States (in priority order):
     *   reset-all  — destination set, map centred, bearing on  → tap resets everything
     *   centered   — map centred, bearing off                  → tap enables bearing
     *   bearing    — bearing on, no destination yet            → tap disables bearing
     *   recenter   — user has panned away                      → tap re-centres map
     */
    const updateMultifunctionButton = () => {
        const button = document.getElementById('multifunction-button');
        button.classList.remove('reset-all', 'centered', 'recenter', 'bearing');

        if (destination && isMapCentered && isBearing) {
            button.classList.add('reset-all');
        } else if (isMapCentered && !isBearing) {
            button.classList.add('centered');
        } else if (isUserInteraction) {
            button.classList.add('recenter');
        } else if (isBearing) {
            button.classList.add('bearing');
        }

        button.title = 'Multifunction Icon';
    };

    document.getElementById('multifunction-button').addEventListener('click', () => {
        if (destination && isMapCentered && isBearing) {
            // Full reset
            reset();
        } else if (isMapCentered) {
            // Toggle bearing on/off
            if (isBearing) {
                isBearing = false;
                map.setBearing(0);
            } else {
                isBearing = true;
            }
        } else {
            // Re-centre the map on the user
            isUserInteraction = false;
            isMapCentered     = true;
        }

        updateMultifunctionButton();
    });


    // ── MAP HELPERS ─────────────────────────────────────────────────

    /**
     * Smoothly flies the map to the given coordinates.
     */
    const updateMapCenter = (latitude, longitude, zoomLevel = DEFAULT_ZOOM) => {
        map.flyTo({
            center:    [longitude, latitude],
            zoom:      zoomLevel,
            essential: true,
            speed:     1.5,
        });
    };

    /**
     * Moves an existing Mapbox marker to new coordinates.
     */
    const updateMarker = (marker, latitude, longitude, title) => {
        marker
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title));
    };

    /**
     * Creates and adds a Mapbox marker.
     * Uses a custom image element when markerImage is provided,
     * otherwise falls back to the default red Mapbox marker.
     */
    const addMarker = (latitude, longitude, title, markerImage) => {
        const options = markerImage
            ? { element: createCustomMarkerElement(markerImage) }
            : { color: '#FF0000' };

        return new mapboxgl.Marker(options)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);
    };

    /**
     * Creates the DOM element used for a custom map marker.
     */
    const createCustomMarkerElement = (markerImage) => {
        const el = document.createElement('div');
        el.className             = 'custom-marker';
        el.style.backgroundImage = `url(${markerImage})`;
        el.style.width           = '30px';
        el.style.height          = '30px';
        return el;
    };

    /**
     * Removes the previous destination marker (if any) and places
     * a new one at the given coordinates.
     */
    const addDestinationMarker = (latitude, longitude, title) => {
        if (destinationMarker) destinationMarker.remove();
        destinationMarker = addMarker(latitude, longitude, title);
        return destinationMarker;
    };


    // ── AR ROUTE RENDERING ──────────────────────────────────────────

    /**
     * Clears any existing AR route entities and rebuilds them from
     * the Mapbox directions response.
     * Places a cylinder at every interpolated point along the path
     * and a GLB pointer model at the final destination coordinate.
     */
    const updateARDirections = (directionsData) => {
        if (!directionsData?.routes?.length) {
            console.error('Invalid directions data or missing route coordinates.');
            return;
        }

        const routeCoordinates = directionsData.routes[0].geometry.coordinates;

        // Clear all existing AR route entities
        document.querySelectorAll('[gps-new-entity-place]').forEach(el => el.remove());

        // Place cylinder markers along every segment
        for (let i = 0; i < routeCoordinates.length - 1; i++) {
            const points = generateIntermediaryPoints(
                routeCoordinates[i],
                routeCoordinates[i + 1],
                ROUTE_STEP_METERS
            );
            points.forEach(createCylinderMarker);
        }

        // Place GLB pointer at the destination
        createGLBMarker(routeCoordinates[routeCoordinates.length - 1]);
    };

    /**
     * Returns an array of [lng, lat] points spaced distanceMeters
     * apart between startPoint and endPoint.
     */
    const generateIntermediaryPoints = (startPoint, endPoint, distanceMeters) => {
        const points   = [];
        const segments = Math.ceil(calculateDistance(startPoint, endPoint) / distanceMeters);

        for (let i = 1; i < segments; i++) {
            const fraction = i / segments;
            points.push([
                startPoint[0] + (endPoint[0] - startPoint[0]) * fraction,
                startPoint[1] + (endPoint[1] - startPoint[1]) * fraction,
            ]);
        }

        return points;
    };

    /**
     * Returns the great-circle distance in metres between two
     * [lng, lat] points using the Haversine formula.
     */
    const calculateDistance = ([startLng, startLat], [endLng, endLat]) => {
        const EARTH_RADIUS_M = 6371000;
        const toRad = (deg) => deg * Math.PI / 180;

        const dLat = toRad(endLat - startLat);
        const dLng = toRad(endLng - startLng);

        const a = Math.sin(dLat / 2) ** 2
                + Math.cos(toRad(startLat)) * Math.cos(toRad(endLat))
                * Math.sin(dLng / 2) ** 2;

        return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    /**
     * Creates a flat blue cylinder AR entity at the given [lng, lat] coordinate.
     */
    const createCylinderMarker = ([lng, lat]) => {
        const el = document.createElement('a-cylinder');
        el.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${lng}`);
        el.setAttribute('radius',  '0.5');
        el.setAttribute('height',  '0.15');
        el.setAttribute('color',   '#3882f6');
        el.setAttribute('opacity', '1');
        document.querySelector(AR_SCENE_SELECTOR).appendChild(el);
    };

    /**
     * Creates a GLB 3D pointer AR entity at the given [lng, lat] coordinate.
     */
    const createGLBMarker = ([lng, lat]) => {
        const el = document.createElement('a-entity');
        el.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${lng}`);
        el.setAttribute('gltf-model', '../models/map_pointer_3d_icon.glb');
        el.setAttribute('scale',    '0.5 0.5 0.5');
        el.setAttribute('position', '0 1 0');
        document.querySelector(AR_SCENE_SELECTOR).appendChild(el);
    };


    // ── MAPBOX 2D ROUTE ─────────────────────────────────────────────

    /**
     * Draws (or redraws) the walking route polyline on the 2D map.
     */
    const updateMapWithRoute = (directionsData) => {
        if (!map) {
            console.error('Map not initialized. Unable to update route.');
            return;
        }

        if (!directionsData?.routes?.length) {
            console.error('Invalid directionsData or missing route coordinates.');
            return;
        }

        const routeCoordinates = directionsData.routes[0].geometry.coordinates;

        // Remove existing route source/layer if present
        if (map.getSource(SOURCE_ID)) {
            try {
                map.removeLayer(SOURCE_ID);
                map.removeSource(SOURCE_ID);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }

        map.addSource(SOURCE_ID, {
            type: 'geojson',
            data: {
                type:     'Feature',
                properties: {},
                geometry: {
                    type:        'LineString',
                    coordinates: routeCoordinates,
                },
            },
        });

        map.addLayer({
            id:     SOURCE_ID,
            type:   'line',
            source: SOURCE_ID,
            layout: {
                'line-join': 'round',
                'line-cap':  'round',
            },
            paint: {
                'line-color': '#3882f6',
                'line-width': 7,
            },
        });
    };


    // ── RESET ───────────────────────────────────────────────────────

    /**
     * Clears the active destination, removes all AR entities and
     * the 2D route, and resets map rotation and flags.
     */
    const reset = () => {
        destination = null;
        isBearing   = false;

        map.setBearing(0);

        if (destinationMarker) destinationMarker.remove();

        document.querySelectorAll('[gps-new-entity-place]').forEach(el => el.remove());

        if (map.getSource(SOURCE_ID) && map.getLayer(SOURCE_ID)) {
            try {
                map.removeLayer(SOURCE_ID);
                map.removeSource(SOURCE_ID);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }
    };


    // ── DIRECTIONS API ──────────────────────────────────────────────

    /**
     * Fetches a walking route between origin and destination
     * from the Mapbox Directions API.
     * @returns {Promise<Object>} Directions response JSON
     */
    const getDirections = async (origin, dest) => {
        const url = [
            'https://api.mapbox.com/directions/v5/mapbox/walking/',
            `${origin.longitude},${origin.latitude}`,
            ';',
            `${dest.longitude},${dest.latitude}`,
            `?access_token=${MAPBOX_TOKEN}&geometries=geojson`,
        ].join('');

        const response = await fetch(url);
        return response.json();
    };


    // ── DESTINATION SELECTION ───────────────────────────────────────

    /**
     * Triggered when the user taps "Get Directions".
     * Looks up the selected place, fetches the walking route,
     * then updates the AR scene and 2D map.
     */
    const selectDestination = async () => {
        const selectedName = destinationSelect.value;
        destination = places.find(place => place.name === selectedName);

        if (!destination) {
            console.log('Destination not found:', selectedName);
            return;
        }

        try {
            const directionsData = await getDirections(userLocation, destination);

            updateMapCenter(userLocation.latitude, userLocation.longitude);
            addDestinationMarker(destination.latitude, destination.longitude, destination.name);
            updateARDirections(directionsData);
            updateMapWithRoute(directionsData);

            // Ensure map is centred and bearing is on when a route is active
            if (!isMapCentered) {
                isUserInteraction = false;
                isMapCentered     = true;
            }
            if (!isBearing) {
                isBearing = true;
            }

        } catch (error) {
            console.error('Error retrieving directions:', error);
        }
    };


    // ── POPULATE DESTINATION DROPDOWN ───────────────────────────────

    places.forEach(place => {
        const option   = document.createElement('option');
        option.value   = place.name;
        option.text    = place.name;
        destinationSelect.appendChild(option);
    });


    // ── BOOTSTRAP ───────────────────────────────────────────────────

    directionsButton.addEventListener('click', selectDestination);

    initMap();
    watchUserLocation();
    updateMultifunctionButton();

    // Track map bearing changes (used to counter-rotate the user marker)
    map.on('rotate', (event) => {
        mapBearing = event.target.getBearing();
    });

    // Apply the globe atmosphere once the map style has loaded
    map.on('load', () => {
        map.setFog({});
    });

    // Detect manual map interaction so we stop auto-centering
    map.on('touchstart', () => {
        isUserInteraction = true;
        isMapCentered     = false;
        isBearing         = false;
    });

});