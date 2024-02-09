// Wrap your code in a single object to minimize global variables
const app = {
    // Map-related variables
    map: null,
    compass: null,
    mapBearing: 0,

    // Location markers and user details
    currentLocationMarker: null,
    destinationMarker: null,
    userLocation: { latitude: 0, longitude: 0 },
    destination: null,

    // Flags for map interaction control
    isUserInteraction: false,
    isMapCentered: true,
    isBearing: false,
    compassRotation: 0,

    // Function to initialize the map and get the user's current location
    initMap: async () => {
        try {
            // Initialize the map with Mapbox
            mapboxgl.accessToken = 'your-mapbox-token';
            app.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 15,
                bearing: 0,
                pitch: 0,
            });

            app.map.addControl(new mapboxgl.NavigationControl());
            app.createCompass();
            window.addEventListener('deviceorientation', app.handleOrientation);

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    },

    // Function to watch for changes in the user's location
    watchUserLocation: () => {
        navigator.geolocation.watchPosition(
            app.handlePositionSuccess,
            app.handlePositionError,
            { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
        );
    },

    // Function to handle changes in device orientation
    handleOrientation: (event) => {
        app.compassRotation = 360 - event.alpha;
        app.updateCompass();

        if (app.currentLocationMarker) {
            app.currentLocationMarker.setRotation(app.compassRotation - app.mapBearing);
            app.currentLocationMarker.setPitchAlignment('map');
        } else {
            app.currentLocationMarker = app.addMarker(app.userLocation.latitude, app.userLocation.longitude, 'You are here!', '../models/current1.png');
            app.currentLocationMarker.setRotation(app.compassRotation);
            app.currentLocationMarker.setPitchAlignment('map');
        }

        app.setMultifunctionImage();
    },

    // Function to create the compass element
    createCompass: () => {
        app.compass = document.createElement('div');
        app.compass.className = 'compass';
        app.compass.innerHTML = '<img src="../models/compass.png" alt="Compass Icon">';
        const compassContainer = document.getElementById('compass-container');
        compassContainer.appendChild(app.compass);
    },

    // Function to update the compass rotation
    updateCompass: () => {
        app.compass.style.transform = `rotate(${360 - app.compassRotation}deg)`;

        if (app.isMapCentered && app.isBearing) {
            app.map.setBearing(app.compassRotation);
        }
    },

    // Event listener for position success
    handlePositionSuccess: (position) => {
        const { latitude, longitude } = position.coords;
        app.userLocation = { latitude, longitude };

        if (!app.isUserInteraction) {
            app.userLocation = { latitude, longitude };
            app.updateMapCenter(latitude, longitude, 15);
        }

        app.currentLocationMarker
            ? app.updateMarker(app.currentLocationMarker, latitude, longitude, 'You are here!')
            : (app.currentLocationMarker = app.addMarker(latitude, longitude, 'You are here!', '../models/current1.png'));
    },

    // Event listener for position error
    handlePositionError: (error) => {
        console.error('Error in retrieving position', error);
    },

    // Function to handle multifunction button click
    handleMultifunctionButtonClick: () => {
        if (app.destination && app.isMapCentered && app.isBearing) {
            app.reset();
        } else if (app.isMapCentered) {
            app.isBearing = !app.isBearing;
            app.map.setBearing(app.isBearing ? app.compassRotation : 0);
        } else {
            app.isUserInteraction = false;
            app.isMapCentered = true;
        }

        app.setMultifunctionImage();
    },

    // Function to update the 2D map center
    updateMapCenter: (latitude, longitude, zoomLevel) => {
        app.map.flyTo({
            center: [longitude, latitude],
            zoom: zoomLevel,
            essential: true,
            speed: 1.5,
        });
    },

    // Function to update the marker on the map
    updateMarker: (marker, latitude, longitude, title) => {
        marker.setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title));
    },

    // Function to add a marker on the map
    addMarker: (latitude, longitude, title, markerImage) => {
        const markerOptions = {};

        if (markerImage) {
            markerOptions.element = app.createCustomMarker(markerImage);
        } else {
            markerOptions.color = '#FF0000';
        }

        return new mapboxgl.Marker(markerOptions)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(app.map);
    },

    // Function to create a custom marker element
    createCustomMarker: (markerImage) => {
        const element = document.createElement('div');
        element.className = 'custom-marker';
        element.style.backgroundImage = `url(${markerImage})`;
        element.style.width = '30px';
        element.style.height = '30px';
        return element;
    },

    // Function to handle destination selection and initiate directions
    selectDestination: async () => {
        const selectedDestination = destinationSelectInput.value;
        app.destination = places.find(place => place.name === selectedDestination);

        if (app.destination) {
            try {
                const directionsData = await app.getDirections(app.userLocation, app.destination);

                app.updateMapCenter(app.userLocation.latitude, app.userLocation.longitude, 17);

                const destinationMarker = app.addMarker(app.destination.latitude, app.destination.longitude, app.destination.name);

                app.addDestinationAREntity(app.destination.latitude, app.destination.longitude, app.destination.name);

                app.updateARDirections(directionsData);
                app.updateMapWithRoute(directionsData);

                if (!app.isMapCentered) {
                    app.isUserInteraction = false;
                    app.isMapCentered = true;
                }

                if (!app.isBearing) {
                    app.isBearing = true;
                }

            } catch (error) {
                console.error('Error in retrieving position', error);
            }
        } else {
            console.log('Destination not found:', selectedDestination);
        }
    },

    // Function to get directions from the Mapbox API
    getDirections: async (origin, destination) => {
        const apiKey = 'your-mapbox-token';
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${apiKey}&geometries=geojson`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    },

    // Function to handle AR elements based on Mapbox directions
    updateARDirections: (directionsData) => {
        // Add AR route that shows a blue conveyor belt on the route.
        // Implement as needed.
    },

    // Function to update the 2D map with the route
    updateMapWithRoute: (directionsData) => {
        if (!app.map) {
            console.error('Map not initialized. Unable to update route.');
            return;
        }

        console.log('Directions Data:', directionsData);

        if (directionsData && directionsData.routes && directionsData.routes.length > 0) {
            console.log('Route Coordinates:', directionsData.routes[0].geometry.coordinates);

            const sourceId = 'route';

            if (app.map.getSource(sourceId)) {
                try {
                    app.map.removeLayer(sourceId);
                    app.map.removeSource(sourceId);
                } catch (error) {
                    console.error('Error removing existing route:', error);
                }
            }

            app.map.addSource(sourceId, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: directionsData.routes[0].geometry.coordinates,
                    },
                },
            });

            app.map.addLayer({
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
    },

    // Function to reset destination and clear map elements
    reset: () => {
        app.destination = null;
        app.isBearing = false;
        app.map.setBearing(0);

        const sourceId = 'route';

        if (app.map.getSource(sourceId) && app.map.getLayer(sourceId)) {
            try {
                app.map.removeLayer(sourceId);
                app.map.removeSource(sourceId);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }

        app.removeAREntities();
        if (app.destinationMarker) {
            app.destinationMarker.remove();
        }
    },

    // Function to remove existing AR entities
    removeAREntities: () => {
        const existingLabels = document.querySelectorAll('#ar-destination-entity a-text');

        if (existingLabels.length > 0) {
            console.log('Removing existing text entities:', existingLabels.length);
            existingLabels.forEach(label => label.remove());
        } else {
            console.log('No existing text entities to remove.');
        }
    },

    // Function to add AR label for the selected destination
    addDestinationAREntity: (latitude, longitude, name) => {
        app.removeAREntities();

        console.log('Adding AR label for:', name, 'at', latitude, longitude);

        const arLabel = document.createElement('a-text');
        arLabel.setAttribute('value', name);
        arLabel.setAttribute('look-at', '[gps-new-camera]');
        arLabel.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        arLabel.setAttribute('color', '#0100ff');
        arLabel.setAttribute('scale', '5 5 5');

        document.querySelector('#ar-destination-entity').appendChild(arLabel);
    },

    // Function to update multifunction button image based on conditions
    setMultifunctionImage: () => {
        const multifunctionButton = document.getElementById('multifunction-button');
        const centeredImage = document.getElementById('centeredImage');

        if (app.destination && app.isMapCentered && app.isBearing) {
            centeredImage.src = '../models/reset-all.png';
        } else if (app.isMapCentered && !app.isBearing) {
            centeredImage.src = '../models/centered.png';
        } else if (app.isUserInteraction) {
            centeredImage.src = '../models/recenter.png';
        } else if (app.isBearing) {
            centeredImage.src = '../models/bearing.png';
        }

        centeredImage.alt = 'Multifunction Icon';
    },

    // Function to populate the dropdown with places from places.js
    populateDropdown: () => {
        places.forEach(place => {
            const option = document.createElement('option');
            option.value = place.name;
            option.text = place.name;
            destinationSelectInput.appendChild(option);
        });
    },

    // Function to add event listeners
    addEventListeners: () => {
        destinationSelectButton.addEventListener('click', app.selectDestination);

        const recenterButton = document.getElementById('multifunction-button');
        recenterButton.addEventListener('click', app.handleMultifunctionButtonClick);
    },

    // Function to start the application
    start: () => {
        app.initMap();
        app.watchUserLocation();
        app.populateDropdown();
        app.addEventListeners();
        app.setMultifunctionImage();

        app.map.on('rotate', (event) => {
            app.mapBearing = event.target.getBearing();
        });

        document.getElementById('map').addEventListener('touchstart', () => {
            app.isUserInteraction = true;
            app.isMapCentered = false;
            app.isBearing = false;
        });
    },
};

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', app.start);
