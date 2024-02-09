document.addEventListener('DOMContentLoaded', function () {
    // Get HTML elements
    const destinationSelectInput = document.getElementById('select-destination');
    const destinationSelectButton = document.getElementById('get-direction-button');
    const mapContainer = document.getElementById('map');
    const compassContainer = document.getElementById('compass-container');
    const multifunctionButton = document.getElementById('multifunction-button');
    const arDestinationEntity = document.getElementById('ar-destination-entity');

    let map;
    let compass;
    let compassRotation = 0;
    let currentLocationMarker;
    let destinationMarker;
    let userLocation = { latitude: 0, longitude: 0 };
    let destination;
    let isUserInteraction = false;
    let isMapCentered = true;
    let isBearing = false;
    let mapBearing = 0;

    // Initialize the map with Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
    map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 15,
        bearing: 0,
        pitch: 0,
    });

    // Enable map controls
    map.addControl(new mapboxgl.NavigationControl());

    // Create compass element
    compass = document.createElement('div');
    compass.className = 'compass';
    compass.innerHTML = '<img src="../models/compass.png" alt="Compass Icon">';
    compassContainer.appendChild(compass);

    // Watch for changes in device orientation
    window.addEventListener('deviceorientation', handleOrientation);

    // Watch for changes in the map's bearing
    map.on('rotate', (event) => {
        mapBearing = event.target.getBearing();
    });

    // Watch for map interaction (e.g., drag or zoom)
    map.on('touchstart', () => {
        isUserInteraction = true;
        isMapCentered = false;
        isBearing = false;
    });

    // Function to handle changes in device orientation
    const handleOrientation = (event) => {
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
    };

    // Function to dynamically set the image source based on conditions
    const setMultifunctionImage = () => {
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
    };

    // Add click event listener for the recenter button
    multifunctionButton.addEventListener('click', () => {
        if (destination && isMapCentered && isBearing) {
            reset();
        } else if (isMapCentered) {
            isBearing ? (isBearing = false, map.setBearing(0)) : (isBearing = true);
        } else {
            isUserInteraction = false;
            isMapCentered = true;
        }

        setMultifunctionImage();
    });

    // Function to update the 2D map center
    const updateMapCenter = (latitude, longitude, zoomLevel) => {
        map.flyTo({
            center: [longitude, latitude],
            zoom: zoomLevel,
            essential: true,
            speed: 1.5,
        });
    };

    // Function to update the marker on the map
    const updateMarker = (marker, latitude, longitude, title) => {
        marker.setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title));
    };

    // Function to add a marker on the map
    const addMarker = (latitude, longitude, title, markerImage) => {
        const markerOptions = {};
        if (markerImage) {
            markerOptions.element = createCustomMarker(markerImage);
        } else {
            markerOptions.color = '#FF0000';
        }
        return new mapboxgl.Marker(markerOptions)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);
    };

    // Function to create a custom marker element
    const createCustomMarker = (markerImage) => {
        const element = document.createElement('div');
        element.className = 'custom-marker';
        element.style.backgroundImage = `url(${markerImage})`;
        element.style.width = '30px';
        element.style.height = '30px';
        return element;
    };

    // Function to add a marker for a location on the map
    const addDestinationMarker = (latitude, longitude, title) => {
        if (destinationMarker) {
            destinationMarker.remove();
        }
        destinationMarker = addMarker(latitude, longitude, title);
        return destinationMarker;
    };

    // Function to add AR label for the selected destination
    const addDestinationAREntity = (latitude, longitude, name) => {
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
        arDestinationEntity.appendChild(arLabel);
    };

    // Function to update AR elements based on Mapbox directions
    const updateARDirections = (directionsData) => {
        // Add an AR route that shows a blue conveyor belt on the route.
        // Add implementation based on AR directions data
    };

    // Function to update the 2D map with the route
    const updateMapWithRoute = (directionsData) => {
        if (!map) {
            console.error('Map not initialized. Unable to update route.');
            return;
        }

        if (directionsData && directionsData.routes && directionsData.routes.length > 0) {
            const routeCoordinates = directionsData.routes[0].geometry.coordinates;

            const sourceId = 'route';

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
    };

    // Function to remove the route from the map
    const reset = () => {
        destination = null;
        isBearing = false;
        map.setBearing(0);

        const sourceId = 'route';

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
    };

    // Function to get directions from the Mapbox API
    const getDirections = async (origin, destination) => {
        const apiKey = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${apiKey}&geometries=geojson`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    };

    // Function to handle destination selection and initiate directions
    const selectDestination = async () => {
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
            // Handle case when the selected destination is not found
        }
    };

    // Populate the dropdown with places from places.js
    places.forEach(place => {
        const option = document.createElement('option');
        option.value = place.name;
        option.text = place.name;
        destinationSelectInput.appendChild(option);
    });

    destinationSelectButton.addEventListener('click', selectDestination);

    // End of the 'DOMContentLoaded' event listener
    // Call the function to initialize map and location
    watchUserLocation();
    setMultifunctionImage();

    // Function to watch for changes in the user's location
    function watchUserLocation() {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                userLocation = { latitude, longitude };

                if (!isUserInteraction) {
                    userLocation = { latitude, longitude };
                    updateMapCenter(latitude, longitude, 15);
                }

                currentLocationMarker
                    ? updateMarker(currentLocationMarker, latitude, longitude, 'You are here!')
                    : (currentLocationMarker = addMarker(latitude, longitude, 'You are here!', '../models/current1.png'));
            },
            (error) => console.error('Error in retrieving position', error),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
        );
    }
});
