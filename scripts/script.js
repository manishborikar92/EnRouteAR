document.addEventListener('DOMContentLoaded', function () {
    // Get HTML elements
    const destinationSelectInput = document.getElementById('select-destination');
    const destinationSelectButton = document.getElementById('get-direction-button');
    const mapContainer = document.getElementById('map');
    let map;
    let compass;
    let mapBearing = 0; // Global variable to store the map's bearing
    let currentLocationMarker;
    let destinationMarker;
    let userLocation = { latitude: 0, longitude: 0 }; // Initialize with default values
    let destination;

    // Flags to control various aspects of map interaction
    let isUserInteraction = false; // Flag to control user interaction with the map
    let isMapCentered = true; // Flag to track if the map is currently centered on the user's location
    let isBearing = false; // Flag to track if map bearing is applied
    let compassRotation; // Variable to store device orientation

    // Function to initialize the map and get the user's current location
    const initMap = async () => {
        try {
            // Initialize the map with Mapbox
            mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
            map = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/satellite-streets-v12',
                center: [78, 20], // Default center
                zoom: 0,
                bearing: 0, // Initial bearing
                pitch: 0, // Initial pitch
                projection: 'globe',
            });

            // Enable map controls (zoom, pan, rotate)
            map.addControl(new mapboxgl.NavigationControl(), 'top-left');

            // Create and append compass element
            compass = document.createElement('div');
            compass.className = 'compass';
            compass.innerHTML = '<img src="../models/compass.png" alt="Compass Icon">';

            // Add compass to the compass container
            const compassContainer = document.getElementById('compass-container');
            compassContainer.appendChild(compass);

            // Watch for changes in the device's orientation
            window.addEventListener('deviceorientation', handleOrientation);
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    };

    // Function to watch for changes in the user's location
const watchUserLocation = () => {
    navigator.geolocation.watchPosition(
        // Success callback when position is retrieved
        (position) => {
            const { latitude, longitude } = position.coords;
            userLocation = { latitude, longitude }; // Update global userLocation

            // If there is no ongoing user interaction, update the map center
            if (!isUserInteraction) {
                userLocation = { latitude, longitude };
                updateMapCenter(latitude, longitude);
            }

            // Update or create the current location marker
            currentLocationMarker
                ? updateMarker(currentLocationMarker, latitude, longitude, 'You are here!')
                : (currentLocationMarker = addMarker(latitude, longitude, 'You are here!', '../models/current.png'));
        },
        // Error callback when there's an issue retrieving position
        (error) => {
            if (error.code === 1) {
                // Device location is off. Please enable location and refresh the page.
                alert('Device location is off. Please enable location and refresh the page.');
            } else if (error.code === 2) {
                // Position information is unavailable
                alert('Position information is unavailable. Please try again.');
            } else if (error.code === 3) {
                // The request to get user location timed out
                alert('Request to get user location timed out. Please try again.');
            } else {
                // For other errors, log the error to the console
                console.error('Error in retrieving position:', error.message);
            }
        },
        // Geolocation options
        { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
    );
};

    // Function to handle changes in device orientation
    const handleOrientation = (event) => {
        compassRotation = 360 - event.alpha; // Calculate rotation in degrees
        compass.style.transform = `rotate(${360 - compassRotation}deg)`; // Update compass display

        // If the map is centered and bearing is applied or there's a destination set, apply bearing
        if (isMapCentered && isBearing) {
            map.setBearing(compassRotation); // Set the bearing of the Mapbox map to achieve rotation
        }

        // Update or create the current location marker
        if (currentLocationMarker) {
            // Update the marker's rotation based on the device's orientation and map's bearing
            currentLocationMarker.setRotation(compassRotation - mapBearing);
            currentLocationMarker.setPitchAlignment('map'); // Set pitchAlignment to 'map'
        } else {
            // If the marker doesn't exist, create a new one with the updated rotation
            currentLocationMarker = addMarker(userLocation.latitude, userLocation.longitude, 'You are here!', '../models/current.png');
            currentLocationMarker.setRotation(compassRotation);
            currentLocationMarker.setPitchAlignment('map'); // Set pitchAlignment to 'map'
        }
        // Call Repeatedly
        setMultifunctionImage();
    };

    // Function to dynamically set the image source based on conditions
    const setMultifunctionImage = () => {
        const multifunctionButton = document.getElementById('multifunction-button');
        const centeredImage = document.getElementById('centeredImage');

        // Set the image source based on conditions
        if (destination && isMapCentered && isBearing) {
            centeredImage.src = '../models/reset-all.png';
        } else if (isMapCentered && !isBearing) {
            centeredImage.src = '../models/centered.png';
        } else if (isUserInteraction) {
            centeredImage.src = '../models/recenter.png';
        } else if (isBearing) {
            centeredImage.src = '../models/bearing.png';
        }

        // Set alt text for the image (modify as needed)
        centeredImage.alt = 'Multifunction Icon';
    };

    // Add a click event listener for the recenter button
    const recenterButton = document.getElementById('multifunction-button');
    recenterButton.addEventListener('click', () => {
        // If there's a destination, the map is centered, and bearing is on, call reset();
        if (destination && isMapCentered && isBearing) {
            reset(); // Reset all
        }

        // If map centered after clicking on multifunction button, set bearing on
        else if (isMapCentered) {
                // If bearing is already on, turn it off
                if (isBearing) {
                    isBearing = false;
                    map.setBearing(0); // Stop the map rotation                
                } else {
                    // If bearing is off, turn it on
                    isBearing = true;
                }
            } else {
                // If map not centered after clicking on multifunction button, set map center
                isUserInteraction = false;
                isMapCentered = true;
        }

        // Call the function to set the multifunction button image after any changes
        setMultifunctionImage();
    });

    // Function to update the 2D map center
    const updateMapCenter = (latitude, longitude, zoomLevel = 17) => {
        map.flyTo({
            center: [longitude, latitude],
            zoom: zoomLevel,
            essential: true, // This ensures that the animation is considered essential and cannot be interrupted
            speed: 1.5, // Adjust the speed of the animation as needed
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
    
        // Check if a custom marker image is provided
        if (markerImage) {
            markerOptions.element = createCustomMarker(markerImage);
        } else {
            // Use the default Mapbox marker with a red color
            markerOptions.color = '#FF0000'; // Red color
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
        element.style.width = '25px';  // Set the width of your custom marker
        element.style.height = '25px'; // Set the height of your custom marker
        return element;
    };

    // Function to add a marker for a location on the map
    const addDestinationMarker = (latitude, longitude, title) => {
        // Remove the previous destination marker if it exists
        if (destinationMarker) {
            destinationMarker.remove();
        }
    
        // Add a new marker at the destination with a popup
        destinationMarker = addMarker(latitude, longitude, title);
        return destinationMarker;
    };

    // Function to add AR label for the selected destination
    const addDestinationAREntity = (latitude, longitude, name) => {
        // Remove existing entities
        const existingLabels = document.querySelectorAll('#ar-destination-entity a-text');
        
        if (existingLabels.length > 0) {
            console.log('Removing existing text entities:', existingLabels.length);
            existingLabels.forEach(label => label.remove());
        } else {
            console.log('No existing text entities to remove.');
        }
    
        console.log('Adding AR label for:', name, 'at', latitude, longitude);
        
        // Create a new A-Frame entity (a-text) for the destination label
        const arLabel = document.createElement('a-text');

        // Set attributes for the label
        arLabel.setAttribute('value', name);
        arLabel.setAttribute('look-at', '[gps-new-camera]'); // Make the text face the camera
        arLabel.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        arLabel.setAttribute('color', '#3882f6'); // Set the text color
        arLabel.setAttribute('scale', '2 2 2'); // Adjust scale as needed

        // Append the label to the A-Frame scene
        document.querySelector('#ar-destination-entity').appendChild(arLabel);
    };

// Function to update AR elements based on Mapbox directions
// Function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (coord1, coord2) => {
    const earthRadius = 6371e3; // Earth's radius in meters
    const lat1 = coord1[1] * Math.PI / 180; // Latitude of coord1 in radians
    const lat2 = coord2[1] * Math.PI / 180; // Latitude of coord2 in radians
    const deltaLat = (coord2[1] - coord1[1]) * Math.PI / 180; // Difference in latitudes
    const deltaLon = (coord2[0] - coord1[0]) * Math.PI / 180; // Difference in longitudes

    // Haversine formula for calculating distance
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in meters
};

// Function to calculate initial bearing between two coordinates
const calculateInitialBearing = (coord1, coord2) => {
    const lat1 = coord1[1] * Math.PI / 180; // Latitude of coord1 in radians
    const lat2 = coord2[1] * Math.PI / 180; // Latitude of coord2 in radians
    const deltaLon = (coord2[0] - coord1[0]) * Math.PI / 180; // Difference in longitudes

    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    let initialBearing = Math.atan2(y, x) * 180 / Math.PI; // Bearing in degrees
    initialBearing = (initialBearing + 360) % 360; // Normalize to range [0, 360]

    return initialBearing;
};

// Function to determine turning direction based on change in bearing
const getTurnDirection = (previousBearing, currentBearing) => {
    const threshold = 30; // Threshold angle for determining turn direction

    if (previousBearing === null) return 'continue'; // No previous bearing (initial segment)
    
    const angleDiff = (currentBearing - previousBearing + 360) % 360; // Angle difference
    if (angleDiff < threshold) return 'continue'; // Straight ahead
    if (angleDiff < 180) return 'right'; // Right turn
    return 'left'; // Left turn
};

// Function to add AR entities for route segment with turn direction
const addRouteSegmentAR = (startCoord, endCoord, distance, turnDirection) => {
    // Calculate the midpoint between startCoord and endCoord for positioning the AR entity
    const midpoint = [
        (startCoord[0] + endCoord[0]) / 2,
        (startCoord[1] + endCoord[1]) / 2
    ];

    // Create an A-Frame entity for the route segment
    const arEntity = document.createElement('a-entity');
    arEntity.setAttribute('geometry', {
        primitive: 'box',
        depth: 0.5, // Adjust the depth of the box as needed
        width: distance, // Set the width of the box based on the distance between coordinates
        height: 0.1 // Adjust the height of the box as needed
    });
    arEntity.setAttribute('material', {
        color: 'blue' // Set the color of the route segment
    });
    arEntity.setAttribute('position', `${midpoint[0]} 0 ${midpoint[1]}`); // Position the entity at the midpoint
    arEntity.setAttribute('rotation', `0 ${180 - calculateInitialBearing(startCoord, endCoord)} 0`); // Rotate the entity to align with the bearing
    document.querySelector('a-scene').appendChild(arEntity);
};

// Function to display total route length in a user-friendly format
const displayRouteLength = (totalDistance) => {
    const distanceInKm = totalDistance / 1000; // Convert distance to kilometers
    const distanceString = distanceInKm < 1 ? `${totalDistance} m` : `${distanceInKm.toFixed(2)} km`;
    // Update UI with the total distance information
    console.log('Total Route Length:', distanceString);
};

// Function to update AR elements based on Mapbox directions
const updateARDirections = (directionsData) => {
    if (!directionsData || !directionsData.routes || directionsData.routes.length === 0) {
        console.error('No valid route data provided.');
        return;
    }

    const route = directionsData.routes[0];
    const routeCoordinates = route.geometry.coordinates;
    let totalRouteDistance = 0;
    let previousBearing = null;

    // Iterate through route coordinates to calculate distance and bearing
    for (let i = 0; i < routeCoordinates.length - 1; i++) {
        const currentCoord = routeCoordinates[i];
        const nextCoord = routeCoordinates[i + 1];

        // Calculate distance between current and next coordinates
        const distance = calculateDistance(currentCoord, nextCoord);
        totalRouteDistance += distance;

        // Calculate initial bearing from current coordinate to next coordinate
        const bearing = calculateInitialBearing(currentCoord, nextCoord);

        // Determine turning instructions based on change in bearing
        const turnDirection = getTurnDirection(previousBearing, bearing);
        // Add AR entities for route segment with turnDirection information
        addRouteSegmentAR(currentCoord, nextCoord, distance, turnDirection);

        // Store current bearing for next iteration
        previousBearing = bearing;
    }

    // Display totalRouteDistance in a user-friendly format
    displayRouteLength(totalRouteDistance);
};
        
    // Function to update the 2D map with the route
    const updateMapWithRoute = (directionsData) => {
        // Ensure the map is initialized
        if (!map) {
            console.error('Map not initialized. Unable to update route.');
            return;
        }
    
        // Log directionsData to identify the structure
        console.log('Directions Data:', directionsData);
    
        // Check if directionsData is defined and contains route information
        if (directionsData && directionsData.routes && directionsData.routes.length > 0) {
            // Extract route coordinates from Mapbox directions data
            const routeCoordinates = directionsData.routes[0].geometry.coordinates;
    
            // Log route coordinates to identify any issues
            console.log('Route Coordinates:', routeCoordinates);
    
            const sourceId = 'route';
    
            // Check if the 'route' source already exists
            if (map.getSource(sourceId)) {
                try {
                    // If it exists, remove the existing source and layer
                    map.removeLayer(sourceId);
                    map.removeSource(sourceId);
                } catch (error) {
                    console.error('Error removing existing route:', error);
                }
            }
    
            // Add a new source and layer
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
                    'line-width': 7,
                },
            });
        } else {
            console.error('Invalid directionsData or missing route coordinates.');
        }
    };

    // Function to remove the route from the map
    const reset = () => {
        // Reset the destination
        destination = null;

        isBearing = false; // Set the bearing flag to false

        // Stop the map rotation
        map.setBearing(0);

        const sourceId = 'route';

        // Check if the 'route' source and layer exist
        if (map.getSource(sourceId) && map.getLayer(sourceId)) {
            try {
                // Remove the existing source and layer
                map.removeLayer(sourceId);
                map.removeSource(sourceId);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }

        // Function to remove existing entities
        const existingLabels = document.querySelectorAll('#ar-destination-entity a-text');
        
        if (existingLabels.length > 0) {
            console.log('Removing existing text entities:', existingLabels.length);
            existingLabels.forEach(label => label.remove());
        } else {
            console.log('No existing text entities to remove.');
        }

        // Remove the previous destination marker if it exists
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

                // Update 2D map with user's current location
                updateMapCenter(userLocation.latitude, userLocation.longitude);

                // If the destination marker exists, update its position; otherwise, create a new marker
                const destinationMarker = addDestinationMarker(destination.latitude, destination.longitude, destination.name);

                // Add AR entity for the selected destination
                addDestinationAREntity(destination.latitude, destination.longitude, destination.name);

                // Update AR elements
                updateARDirections(directionsData);
    
                // Update 2D map with route
                updateMapWithRoute(directionsData);
                
                // If map is not centered, set it to centered
                if (!isMapCentered) {
                    isUserInteraction = false;
                    isMapCentered = true;
                }

                // If bearing is off, turn it on
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
    initMap();
    // Call the function to start watching the user's location
    watchUserLocation();
    // Call the function to set the initial multifunction button image
    setMultifunctionImage();

    // Watch for changes in the map's bearing
    map.on('rotate', (event) => {
        // Update the map's bearing variable when the map is rotated
        mapBearing = event.target.getBearing();
    });

    map.on('load', () => {
        // Set the default atmosphere style
        map.setFog({});
    });

    // Add an event listener for map interaction (e.g., drag or zoom)
    map.on('touchstart', () => {
        isUserInteraction = true; // Set the user interaction flag to true
        isMapCentered = false; // Set the map-centered flag to false
        isBearing = false; // Set the bearing flag to false
    });

});