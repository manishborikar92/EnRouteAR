document.addEventListener('DOMContentLoaded', function () {
    const destinationSelectInput = document.getElementById('select-destination');
    const destinationSelectButton = document.getElementById('get-direction-button');
    const mapContainer = document.getElementById('map');
    let map;

    // Function to initialize the map and get the user's current location
    const initMapAndLocation = async () => {
        try {
            // Initialize the map with Mapbox
            mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
            map = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0], // Default center
                zoom: 15,
            });

            // Get and update the user's current location
            navigator.geolocation.watchPosition(
                (position) => {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    // Update 2D map with user's current location and continuously update marker
                    updateMapCenter(userLocation.latitude, userLocation.longitude);
                    updateMarker(userLocation.latitude, userLocation.longitude, 'You are here!');
                },
                (error) => {
                    console.error('Error in retrieving position', error);
                },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
            );
        } catch (error) {
            console.error('Error initializing map and getting initial location:', error);
        }
    };

    // Function to update the marker on the map
    const updateMarker = (latitude, longitude, title) => {
        // Check if a marker already exists and remove it before adding a new one
        const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
        if (existingMarkers.length > 0) {
            for (let i = existingMarkers.length - 1; i >= 0; i--) {
                existingMarkers[i].parentNode.removeChild(existingMarkers[i]);
            }
        }

        // Add a new marker at the updated location with a popup
        addMarker(latitude, longitude, title);
    };

    // Function to add a marker on the map
    const addMarker = (latitude, longitude, title) => {
        new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);
    };

    // Function to get the user's current location
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => {
                    console.error('Error in retrieving position', error);
                    reject(error);
                },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
            );
        });
    };

    // Function to update the 2D map center
    const updateMapCenter = (latitude, longitude) => {
        map.setCenter([longitude, latitude]); // Update to Mapbox coordinates
    };

    // Function to update AR elements based on Mapbox directions
    const updateARDirections = (directionsData) => {
        console.log('Directions:', directionsData);
        // Add logic to update AR elements based on Mapbox directions
    };

    // Function to update the 2D map with the route
    const updateMapWithRoute = (origin, destination) => {
        const directions = getDirections(origin, destination);
        // Update 2D map with the Mapbox route
        // Add logic to display the route on the Mapbox map
    };

    // Function to get directions from the Mapbox API
    const getDirections = async (origin, destination) => {
        const apiKey = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    };

    // Function to add a marker for a location on the map
    const addDestinationMarker = (latitude, longitude, title) => {
        // Add a new marker at the destination with a popup
        addMarker(latitude, longitude, title);
    };

    // Function to handle destination selection and initiate directions
    const selectDestination = async () => {
        const selectedDestination = destinationSelectInput.value;
        const destination = places.find(place => place.name === selectedDestination);

        if (destination) {
            try {
                const userLocation = await getCurrentLocation();
                // Update 2D map with user's current location
                updateMapCenter(userLocation.latitude, userLocation.longitude);

                // Add a marker for the selected destination
                addDestinationMarker(destination.latitude, destination.longitude, destination.name);

                const directionsData = await getDirections(userLocation, destination);
                // Update AR elements
                updateARDirections(directionsData);

                // Update 2D map with route
                updateMapWithRoute(userLocation, destination);
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
    initMapAndLocation(); // Call the function to initialize map and location
});
