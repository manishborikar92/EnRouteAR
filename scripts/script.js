document.addEventListener('DOMContentLoaded', async () => {
    // Constants for better maintainability
    const CONSTANTS = {
        MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw',
        MAP_DEFAULT_CENTER: [0, 0],
        MAP_DEFAULT_ZOOM: 15,
        MAP_DEFAULT_BEARING: 0,
        MAP_DEFAULT_PITCH: 0,
        SOURCE_ID_ROUTE: 'route',
        MARKER_COLOR: '#FF0000',
    };

    // Map and AR-related variables
    let map;
    let compass;
    let mapBearing = 0;
    let currentLocationMarker;
    let destinationMarker;
    let userLocation = { latitude: 0, longitude: 0 };
    let destination;

    // Flags to control various aspects of map interaction
    let isUserInteraction = false;
    let isMapCentered = true;
    let isBearing = false;
    let compassRotation;

    try {
        // Initialize map and start watching user's location
        await initMap();
        watchUserLocation();
        setMultifunctionImage();

        // Watch for changes in the map's bearing
        map.on('rotate', (event) => {
            mapBearing = event.target.getBearing();
        });

        // Add an event listener for map interaction (e.g., drag or zoom)
        map.on('touchstart', () => {
            isUserInteraction = true;
            isMapCentered = false;
            isBearing = false;
        });

    } catch (error) {
        console.error('Error during initialization:', error);
    }

    /**
     * Initialize the map using Mapbox GL
     */
    async function initMap() {
        try {
            mapboxgl.accessToken = CONSTANTS.MAPBOX_ACCESS_TOKEN;
            map = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: CONSTANTS.MAP_DEFAULT_CENTER,
                zoom: CONSTANTS.MAP_DEFAULT_ZOOM,
                bearing: CONSTANTS.MAP_DEFAULT_BEARING,
                pitch: CONSTANTS.MAP_DEFAULT_PITCH,
            });

            // Enable map controls (zoom, pan, rotate)
            map.addControl(new mapboxgl.NavigationControl());

            // Create and append compass element
            compass = document.createElement('div');
            compass.className = 'compass';
            compass.innerHTML = '<img src="../models/compass.png" alt="Compass Icon">';
            compassContainer.appendChild(compass);

            // Watch for changes in the device's orientation
            window.addEventListener('deviceorientation', handleOrientation);

        } catch (error) {
            console.error('Error initializing map:', error);
            throw error;
        }
    }

    /**
     * Watch for changes in the user's location
     */
    function watchUserLocation() {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                userLocation = { latitude, longitude };

                // If there is no ongoing user interaction, update the map center
                if (!isUserInteraction) {
                    userLocation = { latitude, longitude };
                    updateMapCenter(latitude, longitude, 15);
                }

                // Update or create the current location marker
                currentLocationMarker
                    ? updateMarker(currentLocationMarker, latitude, longitude, 'You are here!')
                    : (currentLocationMarker = addMarker(latitude, longitude, 'You are here!', '../models/current1.png'));
            },
            (error) => console.error('Error in retrieving position', error),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
        );
    }

    /**
     * Handle changes in device orientation
     */
    function handleOrientation(event) {
        compassRotation = 360 - event.alpha;
        compass.style.transform = `rotate(${360 - compassRotation}deg)`;

        if (isMapCentered && isBearing) {
            map.setBearing(compassRotation);
        }

        if (currentLocationMarker) {
            currentLocationMarker.setRotation(compassRotation - mapBearing);
            currentLocationMarker.setPitchAlignment('map');
        } else {
            currentLocationMarker = addMarker(userLocation.latitude, userLocation.longitude, 'You are here!', '../models/current1.png');
            currentLocationMarker.setRotation(compassRotation);
            currentLocationMarker.setPitchAlignment('map');
        }

        setMultifunctionImage();
    }

    /**
     * Dynamically set the image source based on conditions
     */
    function setMultifunctionImage() {
        const multifunctionButton = document.getElementById('multifunction-button');
        const centeredImage = document.getElementById('centeredImage');

        if (destination && isMapCentered && isBearing) {
            centeredImage.src = '../models/reset-all.png';
        } else if (isMapCentered && !isBearing) {
            centeredImage.src = '../models/centered.png';
        } else if (isUserInteraction) {
            centeredImage.src = '../models/recenter.png';
        } else if (isBearing) {
            centeredImage.src = '../models/bearing.png';
        }

        centeredImage.alt = 'Multifunction Icon';
    }

    /**
     * Add a click event listener for the recenter button
     */
    const recenterButton = document.getElementById('multifunction-button');
    recenterButton.addEventListener('click', () => {
        if (destination && isMapCentered && isBearing) {
            reset();
        } else if (isMapCentered) {
            if (isBearing) {
                isBearing = false;
                map.setBearing(0);
            } else {
                isBearing = true;
            }
        } else {
            isUserInteraction = false;
            isMapCentered = true;
        }

        setMultifunctionImage();
    });

    /**
     * Update the 2D map center
     */
    function updateMapCenter(latitude, longitude, zoomLevel) {
        map.flyTo({
            center: [longitude, latitude],
            zoom: zoomLevel,
            essential: true,
            speed: 1.5,
        });
    }

    /**
     * Update the marker on the map
     */
    function updateMarker(marker, latitude, longitude, title) {
        marker.setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title));
    }

    /**
     * Add a marker on the map
     */
    function addMarker(latitude, longitude, title, markerImage) {
        const markerOptions = {};

        if (markerImage) {
            markerOptions.element = createCustomMarker(markerImage);
        } else {
            markerOptions.color = CONSTANTS.MARKER_COLOR;
        }

        return new mapboxgl.Marker(markerOptions)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);
    }

    /**
     * Create a custom marker element
     */
    function createCustomMarker(markerImage) {
        const element = document.createElement('div');
        element.className = 'custom-marker';
        element.style.backgroundImage = `url(${markerImage})`;
        element.style.width = '30px';
        element.style.height = '30px';
        return element;
    }

    /**
     * Add a marker for a location on the map
     */
    function addDestinationMarker(latitude, longitude, title) {
        if (destinationMarker) {
            destinationMarker.remove();
        }

        destinationMarker = addMarker(latitude, longitude, title);
        return destinationMarker;
    }

    /**
     * Add AR label for the selected destination
     */
    function addDestinationAREntity(latitude, longitude, name) {
        const existingLabels = document.querySelectorAll('#ar-destination-entity a-text');

        if (existingLabels.length > 0) {
            existingLabels.forEach(label => label.remove());
        }

        const arLabel = document.createElement('a-text');
        arLabel.setAttribute('value', name);
        arLabel.setAttribute('look-at', '[gps-new-camera]');
        arLabel.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        arLabel.setAttribute('color', '#0100ff');
        arLabel.setAttribute('scale', '5 5 5');

        document.querySelector('#ar-destination-entity').appendChild(arLabel);
    }

    /**
     * Update AR elements based on Mapbox directions
     */
    function updateARDirections(directionsData) {
        // Add AR route that shows a blue conveyor belt on the route
    }

    /**
     * Update the 2D map with the route
     */
    function updateMapWithRoute(directionsData) {
        if (!map) {
            console.error('Map not initialized. Unable to update route.');
            return;
        }

        console.log('Directions Data:', directionsData);

        if (directionsData && directionsData.routes && directionsData.routes.length > 0) {
            const routeCoordinates = directionsData.routes[0].geometry.coordinates;

            console.log('Route Coordinates:', routeCoordinates);

            const sourceId = CONSTANTS.SOURCE_ID_ROUTE;

            if (map.getSource(sourceId)) {
                try {
                    map.removeLayer(sourceId);
                    map.removeSource(sourceId);
                } catch (error) {
                    console.error('Error removing existing route:', error);
                }
            }

            map.addSource(sourceId, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: routeCoordinates,
                    },
                },
            });

            map.addLayer({
                id: sourceId,
                type: 'line',
                source: sourceId,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#3882f6',
                    'line-width': 3,
                },
            });
        } else {
            console.error('Invalid directionsData or missing route coordinates.');
        }
    }

    /**
     * Reset the map to initial state
     */
    function reset() {
        destination = null;
        isBearing = false;
        map.setBearing(0);

        const sourceId = CONSTANTS.SOURCE_ID_ROUTE;

        if (map.getSource(sourceId) && map.getLayer(sourceId)) {
            try {
                map.removeLayer(sourceId);
                map.removeSource(sourceId);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }

        const existingLabels = document.querySelectorAll('#ar-destination-entity a-text');

        if (existingLabels.length > 0) {
            existingLabels.forEach(label => label.remove());
        }

        if (destinationMarker) {
            destinationMarker.remove();
        }
    }

    /**
     * Fetch directions from the Mapbox API
     */
    async function getDirections(origin, destination) {
        const apiKey = CONSTANTS.MAPBOX_ACCESS_TOKEN;
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${apiKey}&geometries=geojson`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    }

    /**
     * Handle destination selection and initiate directions
     */
    async function selectDestination() {
        const selectedDestination = destinationSelectInput.value;
        destination = places.find(place => place.name === selectedDestination);

        if (destination) {
            try {
                const directionsData = await getDirections(userLocation, destination);

                updateMapCenter(userLocation.latitude, userLocation.longitude, 17);

                const destinationMarker = addDestinationMarker(destination.latitude, destination.longitude, destination.name);

                addDestinationAREntity(destination.latitude, destination.longitude, destination.name);

                updateARDirections(directionsData);
                updateMapWithRoute(directionsData);

                if (!isMapCentered) {
                    isUserInteraction = false;
                    isMapCentered = true;
                }

                if (!isBearing) {
                    isBearing = true;
                }

            } catch (error) {
                console.error('Error in retrieving position', error);
            }
        } else {
            console.log('Destination not found:', selectedDestination);
        }
    }

    // Populate the dropdown with places from places.js
    places.forEach(place => {
        const option = document.createElement('option');
        option.value = place.name;
        option.text = place.name;
        destinationSelectInput.appendChild(option);
    });

    destinationSelectButton.addEventListener('click', selectDestination);

});
