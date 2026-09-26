/* =============================================================
   EnRouteAR : script.js
   Spatial AR Navigation Controller:
     - Mapbox 2D Satellite Radar initialisation
     - Device orientation & spatial compass degrees
     - GPS Location Watching & accuracy telemetry
     - Spatial destination drawer with real-time distance & search
     - Mapbox Directions API & turn-by-turn guidance card
     - AR Route Rendering (A-Frame cylinders + GLB pointer)
     - Collapsible floating mini-map sheet
     - Multifunction state synchronization
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── DOM REFERENCES ──────────────────────────────────────────────

    const destinationSelect   = document.getElementById('select-destination');
    const directionsButton    = document.getElementById('get-direction-button');
    const mapContainer        = document.getElementById('map');
    const mapContainerSheet   = document.getElementById('map-container');
    const mapExpandBtn        = document.getElementById('map-expand-btn');
    const mapSheetToggle      = document.getElementById('map-sheet-toggle');

    const searchTrigger       = document.getElementById('search-trigger');
    const searchTriggerText   = document.getElementById('search-trigger-text');
    const drawer              = document.getElementById('destination-drawer');
    const drawerBackdrop      = document.getElementById('drawer-backdrop');
    const drawerCloseBtn      = document.getElementById('drawer-close-btn');
    const destSearchInput     = document.getElementById('dest-search-input');
    const destSearchClear     = document.getElementById('dest-search-clear');
    const filterChips         = document.querySelectorAll('.filter-chip');
    const drawerPlacesList    = document.getElementById('drawer-places-list');

    const activeRouteCard     = document.getElementById('active-route-card');
    const routeDestName       = document.getElementById('route-dest-name');
    const routeDestDist       = document.getElementById('route-dest-distance');
    const routeDestEta        = document.getElementById('route-dest-eta');
    const routeProgressFill   = document.getElementById('route-progress-fill');
    const btnEndRoute         = document.getElementById('btn-end-route');

    const gpsPulse            = document.getElementById('gps-pulse');
    const gpsStatusText       = document.getElementById('gps-status-text');
    const compassDegrees      = document.getElementById('compass-degrees');
    const multifunctionButton = document.getElementById('multifunction-button');
    const multifunctionLabel  = document.getElementById('multifunction-label');


    // ── STATE ───────────────────────────────────────────────────────

    let map;
    let compass;
    let compassRotation  = 0;   // Current device heading in degrees
    let mapBearing       = 0;   // Current map bearing in degrees

    let currentLocationMarker = null;
    let destinationMarker     = null;
    let destination           = null;

    let userLocation = { latitude: 0, longitude: 0 };
    let initialRouteDistance = 0; // For route progress bar

    // Map interaction flags
    let isUserInteraction = false;
    let isMapCentered     = true;
    let isBearing         = false;
    let isMapExpanded     = false;

    let currentFilterCategory = 'all';
    let currentSearchQuery    = '';


    // ── CONSTANTS ───────────────────────────────────────────────────

    const MAPBOX_TOKEN = 'pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw';
    const MAP_STYLE    = 'mapbox://styles/mapbox/satellite-streets-v12';
    const DEFAULT_ZOOM = 17.5;
    const ROUTE_STEP_METERS = 2; // Distance between AR route cylinder markers
    const AR_SCENE_SELECTOR = 'a-scene';
    const SOURCE_ID         = 'route';


    // ── FORMATTING & MATH HELPERS ───────────────────────────────────

    /**
     * Haversine formula to compute great-circle distance between two coords in metres.
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

    const formatDistance = (meters) => {
        if (!meters || meters < 0) return '-- m';
        if (meters < 1000) return `${Math.round(meters)} m`;
        return `${(meters / 1000).toFixed(1)} km`;
    };

    const formatDuration = (seconds) => {
        if (!seconds || seconds < 0) return '-- min';
        const mins = Math.round(seconds / 60);
        if (mins <= 1) return '< 1 min';
        return `~${mins} min`;
    };

    const getCardinalDirection = (deg) => {
        const normalized = (deg % 360 + 360) % 360;
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(normalized / 45) % 8];
    };


    // ── MAP INITIALISATION ──────────────────────────────────────────

    const initMap = async () => {
        try {
            mapboxgl.accessToken = MAPBOX_TOKEN;

            map = new mapboxgl.Map({
                container: mapContainer,
                style:     MAP_STYLE,
                center:    [79.306, 21.385], // Default KITS Ramtek center
                zoom:      16,
                bearing:   0,
                pitch:     20,
                projection: 'globe',
            });

            // Create the compass indicator element
            compass = document.createElement('div');
            compass.className = 'compass';
            const compassWrap = document.getElementById('compass-container');
            if (compassWrap) {
                compassWrap.insertBefore(compass, compassWrap.firstChild);
            }

            window.addEventListener('deviceorientation', handleOrientation);

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    };


    // ── GPS LOCATION WATCHING ───────────────────────────────────────

    const watchUserLocation = () => {
        if (!('geolocation' in navigator)) {
            if (gpsStatusText) gpsStatusText.textContent = 'No GPS';
            return;
        }

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                userLocation = { latitude, longitude };

                // Update Telemetry Badge
                if (gpsPulse) gpsPulse.classList.add('locked');
                if (gpsStatusText) {
                    const acc = Math.round(accuracy || 3);
                    gpsStatusText.textContent = `GPS ±${acc}m`;
                }

                // Center Map if not interacting
                if (!isUserInteraction && map) {
                    updateMapCenter(latitude, longitude);
                }

                // Update user location marker
                if (currentLocationMarker) {
                    updateMarker(currentLocationMarker, latitude, longitude, 'You are here!');
                } else {
                    currentLocationMarker = addMarker(latitude, longitude, 'You are here!', '../models/current.png');
                }

                // Live distance tracking to active destination
                if (destination && initialRouteDistance > 0) {
                    const remainingDist = calculateDistance(
                        [longitude, latitude],
                        [destination.longitude, destination.latitude]
                    );
                    if (routeDestDist) routeDestDist.textContent = formatDistance(remainingDist);
                    if (routeDestEta) routeDestEta.textContent = formatDuration(remainingDist / 1.3); // ~1.3 m/s walk speed

                    // Progress bar
                    const progress = Math.min(100, Math.max(5, ((initialRouteDistance - remainingDist) / initialRouteDistance) * 100));
                    if (routeProgressFill) routeProgressFill.style.width = `${progress}%`;
                }

                // Refresh distance badges in destination drawer
                renderDestinationList();
            },
            (error) => {
                if (gpsPulse) gpsPulse.classList.remove('locked');
                if (gpsStatusText) gpsStatusText.textContent = 'GPS Searching';
                console.warn('Geolocation notice:', error.message);
            },
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 27000 }
        );
    };


    // ── DEVICE ORIENTATION & COMPASS ────────────────────────────────

    const handleOrientation = (event) => {
        if (event.alpha === null) return;

        compassRotation = 360 - event.alpha;

        // Rotate the compass indicator element
        if (compass) {
            compass.style.transform = `rotate(${360 - compassRotation}deg)`;
        }

        // Compass degree readout (e.g. "342° NW")
        if (compassDegrees) {
            const card = getCardinalDirection(compassRotation);
            compassDegrees.textContent = `${Math.round(compassRotation)}° ${card}`;
        }

        // Rotate map if bearing mode is active
        if (isMapCentered && isBearing && map) {
            map.setBearing(compassRotation);
        }

        // Rotate user position marker
        if (currentLocationMarker) {
            currentLocationMarker.setRotation(compassRotation - mapBearing);
            currentLocationMarker.setPitchAlignment('map');
        }

        updateMultifunctionButton();
    };


    // ── MULTIFUNCTION BUTTON ────────────────────────────────────────

    const updateMultifunctionButton = () => {
        if (!multifunctionButton) return;

        multifunctionButton.classList.remove('reset-all', 'centered', 'recenter', 'bearing');

        if (destination && isMapCentered && isBearing) {
            multifunctionButton.classList.add('reset-all');
            if (multifunctionLabel) multifunctionLabel.textContent = 'Reset Route';
        } else if (isMapCentered && !isBearing) {
            multifunctionButton.classList.add('centered');
            if (multifunctionLabel) multifunctionLabel.textContent = 'Lock Bearing';
        } else if (isUserInteraction) {
            multifunctionButton.classList.add('recenter');
            if (multifunctionLabel) multifunctionLabel.textContent = 'Center GPS';
        } else if (isBearing) {
            multifunctionButton.classList.add('bearing');
            if (multifunctionLabel) multifunctionLabel.textContent = 'Free Pan';
        } else {
            multifunctionButton.classList.add('centered');
            if (multifunctionLabel) multifunctionLabel.textContent = 'Center GPS';
        }
    };

    if (multifunctionButton) {
        multifunctionButton.addEventListener('click', () => {
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
                isMapCentered     = true;
                if (userLocation.latitude !== 0) {
                    updateMapCenter(userLocation.latitude, userLocation.longitude);
                }
            }
            updateMultifunctionButton();
        });
    }


    // ── MAP HELPERS ─────────────────────────────────────────────────

    const updateMapCenter = (latitude, longitude, zoomLevel = DEFAULT_ZOOM) => {
        if (!map) return;
        map.flyTo({
            center:    [longitude, latitude],
            zoom:      zoomLevel,
            essential: true,
            speed:     1.5,
        });
    };

    const updateMarker = (marker, latitude, longitude, title) => {
        marker
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title));
    };

    const addMarker = (latitude, longitude, title, markerImage) => {
        const options = markerImage
            ? { element: createCustomMarkerElement(markerImage) }
            : { color: '#00e5ff' };

        return new mapboxgl.Marker(options)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(title))
            .addTo(map);
    };

    const createCustomMarkerElement = (markerImage) => {
        const el = document.createElement('div');
        el.className             = 'custom-marker';
        el.style.backgroundImage = `url(${markerImage})`;
        el.style.width           = '32px';
        el.style.height          = '32px';
        return el;
    };

    const addDestinationMarker = (latitude, longitude, title) => {
        if (destinationMarker) destinationMarker.remove();
        destinationMarker = addMarker(latitude, longitude, title);
        return destinationMarker;
    };


    // ── AR ROUTE RENDERING ──────────────────────────────────────────

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

    const createCylinderMarker = ([lng, lat]) => {
        const el = document.createElement('a-cylinder');
        el.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${lng}`);
        el.setAttribute('radius',  '0.4');
        el.setAttribute('height',  '0.12');
        el.setAttribute('color',   '#00e5ff');
        el.setAttribute('opacity', '0.9');
        document.querySelector(AR_SCENE_SELECTOR).appendChild(el);
    };

    const createGLBMarker = ([lng, lat]) => {
        const el = document.createElement('a-entity');
        el.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${lng}`);
        el.setAttribute('gltf-model', '../models/map_pointer_3d_icon.glb');
        el.setAttribute('scale',    '0.5 0.5 0.5');
        el.setAttribute('position', '0 1 0');
        document.querySelector(AR_SCENE_SELECTOR).appendChild(el);
    };


    // ── MAPBOX 2D ROUTE ─────────────────────────────────────────────

    const updateMapWithRoute = (directionsData) => {
        if (!map || !directionsData?.routes?.length) return;

        const routeCoordinates = directionsData.routes[0].geometry.coordinates;

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
                'line-color': '#00e5ff',
                'line-width': 6,
                'line-blur':  1,
            },
        });
    };


    // ── RESET ───────────────────────────────────────────────────────

    const reset = () => {
        destination = null;
        isBearing   = false;
        initialRouteDistance = 0;

        if (map) map.setBearing(0);
        if (destinationMarker) destinationMarker.remove();

        document.querySelectorAll('[gps-new-entity-place]').forEach(el => el.remove());

        if (map && map.getSource(SOURCE_ID) && map.getLayer(SOURCE_ID)) {
            try {
                map.removeLayer(SOURCE_ID);
                map.removeSource(SOURCE_ID);
            } catch (error) {
                console.error('Error removing existing route:', error);
            }
        }

        if (activeRouteCard) activeRouteCard.classList.remove('visible');
        if (searchTriggerText) searchTriggerText.textContent = 'Select Campus Hub...';

        renderDestinationList();
        updateMultifunctionButton();
    };

    if (btnEndRoute) {
        btnEndRoute.addEventListener('click', reset);
    }


    // ── DIRECTIONS API ──────────────────────────────────────────────

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


    // ── DESTINATION SELECTION & ACTIVATION ──────────────────────────

    const selectDestination = async (placeObj = null) => {
        if (placeObj) {
            destination = placeObj;
            if (destinationSelect) destinationSelect.value = placeObj.name;
        } else {
            const selectedName = destinationSelect ? destinationSelect.value : '';
            destination = places.find(place => place.name === selectedName);
        }

        if (!destination) {
            console.warn('Destination not found:', destination);
            return;
        }

        // Update search trigger label
        if (searchTriggerText) {
            searchTriggerText.textContent = destination.name;
        }

        // Close drawer if open
        closeDrawer();

        try {
            // Default origin to destination offset slightly if user location hasn't fired yet
            const origin = (userLocation.latitude !== 0 && userLocation.longitude !== 0)
                ? userLocation
                : { latitude: destination.latitude - 0.001, longitude: destination.longitude - 0.001 };

            const directionsData = await getDirections(origin, destination);

            if (directionsData?.routes?.length) {
                const route = directionsData.routes[0];
                initialRouteDistance = route.distance;

                // Update active route card
                if (routeDestName) routeDestName.textContent = destination.name;
                if (routeDestDist) routeDestDist.textContent = formatDistance(route.distance);
                if (routeDestEta)  routeDestEta.textContent = formatDuration(route.duration);
                if (routeProgressFill) routeProgressFill.style.width = '100%';
                if (activeRouteCard) activeRouteCard.classList.add('visible');
            }

            updateMapCenter(origin.latitude, origin.longitude);
            addDestinationMarker(destination.latitude, destination.longitude, destination.name);
            updateARDirections(directionsData);
            updateMapWithRoute(directionsData);

            isUserInteraction = false;
            isMapCentered     = true;
            isBearing         = true;

            updateMultifunctionButton();
            renderDestinationList();

        } catch (error) {
            console.error('Error retrieving directions:', error);
        }
    };


    // ── DESTINATION DRAWER & SEARCH LOGIC ────────────────────────────

    const openDrawer = () => {
        if (drawer) drawer.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('active');
        if (searchTrigger) searchTrigger.setAttribute('aria-expanded', 'true');
        renderDestinationList();
        setTimeout(() => {
            if (destSearchInput) destSearchInput.focus();
        }, 150);
    };

    const closeDrawer = () => {
        if (drawer) drawer.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        if (searchTrigger) searchTrigger.setAttribute('aria-expanded', 'false');
    };

    if (searchTrigger)  searchTrigger.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Search input listener
    if (destSearchInput) {
        destSearchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            if (destSearchClear) {
                destSearchClear.style.display = currentSearchQuery ? 'block' : 'none';
            }
            renderDestinationList();
        });
    }

    if (destSearchClear) {
        destSearchClear.addEventListener('click', () => {
            if (destSearchInput) {
                destSearchInput.value = '';
                currentSearchQuery = '';
                destSearchClear.style.display = 'none';
                renderDestinationList();
                destSearchInput.focus();
            }
        });
    }

    // Category filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilterCategory = chip.dataset.category || 'all';
            renderDestinationList();
        });
    });

    /**
     * Renders place cards into the drawer list based on search and category filters.
     */
    const renderDestinationList = () => {
        if (!drawerPlacesList) return;

        let filtered = places.filter(place => {
            // Filter by category
            if (currentFilterCategory !== 'all' && place.category !== currentFilterCategory) {
                return false;
            }
            // Filter by search query
            if (currentSearchQuery) {
                const matchName = place.name.toLowerCase().includes(currentSearchQuery);
                const matchDesc = place.desc ? place.desc.toLowerCase().includes(currentSearchQuery) : false;
                const matchCode = place.code ? place.code.toLowerCase().includes(currentSearchQuery) : false;
                return matchName || matchDesc || matchCode;
            }
            return true;
        });

        // Compute distance and sort by closest
        const hasUserLoc = userLocation.latitude !== 0 && userLocation.longitude !== 0;
        const enriched = filtered.map(place => {
            let dist = 0;
            if (hasUserLoc) {
                dist = calculateDistance(
                    [userLocation.longitude, userLocation.latitude],
                    [place.longitude, place.latitude]
                );
            }
            return { ...place, dist };
        });

        if (hasUserLoc) {
            enriched.sort((a, b) => a.dist - b.dist);
        }

        drawerPlacesList.innerHTML = '';

        if (enriched.length === 0) {
            drawerPlacesList.innerHTML = `
                <div style="text-align: center; padding: 36px 16px; color: var(--text-muted); font-size: 0.88rem;">
                    No campus destinations match "<strong>${currentSearchQuery}</strong>"
                </div>
            `;
            return;
        }

        enriched.forEach(place => {
            const isSelected = destination && destination.name === place.name;
            const distLabel = hasUserLoc ? formatDistance(place.dist) : '--';
            const etaLabel  = hasUserLoc ? formatDuration(place.dist / 1.3) : 'KITS Ramtek';
            const code      = place.code || place.name.slice(0, 3).toUpperCase();
            const desc      = place.desc || 'Campus location';

            const card = document.createElement('div');
            card.className = `place-card-item ${isSelected ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="place-card-left">
                    <div class="place-code-pill">${code}</div>
                    <div class="place-text-group">
                        <div class="place-item-name">${place.name}</div>
                        <div class="place-item-desc">${desc}</div>
                    </div>
                </div>
                <div class="place-card-right">
                    <div class="place-item-distance">${distLabel}</div>
                    <div class="place-item-eta">${etaLabel}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                selectDestination(place);
            });

            drawerPlacesList.appendChild(card);
        });
    };


    // ── MAP EXPAND / COLLAPSE SHEET ─────────────────────────────────

    const toggleMapSheet = () => {
        if (!mapContainerSheet) return;
        isMapExpanded = !isMapExpanded;
        mapContainerSheet.classList.toggle('expanded', isMapExpanded);
        setTimeout(() => {
            if (map) map.resize();
        }, 350);
    };

    if (mapExpandBtn)   mapExpandBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMapSheet(); });
    if (mapSheetToggle) mapSheetToggle.addEventListener('click', toggleMapSheet);


    // ── POPULATE LEGACY SELECT (BACKWARD COMPAT) ─────────────────────

    if (destinationSelect) {
        destinationSelect.innerHTML = '';
        places.forEach(place => {
            const option = document.createElement('option');
            option.value = place.name;
            option.text  = place.name;
            destinationSelect.appendChild(option);
        });
    }

    if (directionsButton) {
        directionsButton.addEventListener('click', () => selectDestination());
    }


    // ── URL PARAMETER AUTO-SELECT ───────────────────────────────────

    const checkUrlDestination = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const destParam = urlParams.get('dest');
        if (destParam) {
            const match = places.find(p => p.name.toLowerCase() === destParam.toLowerCase() || p.code?.toLowerCase() === destParam.toLowerCase());
            if (match) {
                setTimeout(() => {
                    selectDestination(match);
                }, 600);
            }
        }
    };


    // ── BOOTSTRAP ───────────────────────────────────────────────────

    initMap();
    watchUserLocation();
    renderDestinationList();
    updateMultifunctionButton();
    checkUrlDestination();

    // Mapbox listeners
    if (map) {
        map.on('rotate', (event) => {
            mapBearing = event.target.getBearing();
        });

        map.on('load', () => {
            map.setFog({});
        });

        map.on('touchstart', () => {
            isUserInteraction = true;
            isMapCentered     = false;
            isBearing         = false;
            updateMultifunctionButton();
        });

        map.on('mousedown', () => {
            isUserInteraction = true;
            isMapCentered     = false;
            isBearing         = false;
            updateMultifunctionButton();
        });
    }

});