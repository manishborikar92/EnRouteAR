'use client';

import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN, MAP_CONFIG } from '@/lib/constants';
import type { Coordinates, DirectionsResponse } from '@/types';

// ============================================================================
// MapView — 2D satellite map panel with route display
// ============================================================================

interface MapViewProps {
    userLocation: Coordinates | null;
    directionsData: DirectionsResponse | null;
    destinationName: string | null;
    destinationCoords: Coordinates | null;
    compassHeading: number;
    isMapCentered: boolean;
    isBearing: boolean;
    onMapInteraction: () => void;
    onMapBearingChange: (bearing: number) => void;
}

export default function MapView({
    userLocation,
    directionsData,
    destinationName,
    destinationCoords,
    compassHeading,
    isMapCentered,
    isBearing,
    onMapInteraction,
    onMapBearingChange,
}: MapViewProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
    const destMarkerRef = useRef<mapboxgl.Marker | null>(null);

    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: MAP_CONFIG.style,
            center: MAP_CONFIG.globeCenter,
            zoom: MAP_CONFIG.globeZoom,
            bearing: 0,
            pitch: 0,
            projection: MAP_CONFIG.projection,
        });

        map.on('load', () => {
            map.setFog({});
        });

        map.on('rotate', (e) => {
            onMapBearingChange(e.target.getBearing());
        });

        map.on('touchstart', () => {
            onMapInteraction();
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update user location marker
    useEffect(() => {
        if (!mapRef.current || !userLocation) return;

        const { latitude, longitude } = userLocation;

        if (userMarkerRef.current) {
            userMarkerRef.current
                .setLngLat([longitude, latitude])
                .setRotation(compassHeading - (mapRef.current.getBearing() || 0));
        } else {
            const el = document.createElement('div');
            el.className = 'user-marker';
            el.style.backgroundImage = 'url(/models/current.png)';
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.backgroundSize = 'cover';
            el.style.borderRadius = '50%';

            userMarkerRef.current = new mapboxgl.Marker({ element: el })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setHTML('You are here!'))
                .addTo(mapRef.current);
        }

        userMarkerRef.current.setPitchAlignment('map');
    }, [userLocation, compassHeading]);

    // Center map on user location
    useEffect(() => {
        if (!mapRef.current || !userLocation || !isMapCentered) return;

        mapRef.current.flyTo({
            center: [userLocation.longitude, userLocation.latitude],
            zoom: MAP_CONFIG.navigationZoom,
            essential: true,
            speed: MAP_CONFIG.flyToSpeed,
        });
    }, [userLocation, isMapCentered]);

    // Apply compass bearing to map
    useEffect(() => {
        if (!mapRef.current) return;

        if (isMapCentered && isBearing) {
            mapRef.current.setBearing(compassHeading);
        }
    }, [compassHeading, isMapCentered, isBearing]);

    // Update destination marker
    useEffect(() => {
        if (!mapRef.current) return;

        // Remove previous destination marker
        if (destMarkerRef.current) {
            destMarkerRef.current.remove();
            destMarkerRef.current = null;
        }

        if (destinationCoords && destinationName) {
            destMarkerRef.current = new mapboxgl.Marker({ color: '#FF0000' })
                .setLngLat([destinationCoords.longitude, destinationCoords.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(destinationName))
                .addTo(mapRef.current);
        }
    }, [destinationCoords, destinationName]);

    // Draw route polyline
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;
        const sourceId = 'route';

        // Wait for style to load
        const drawRoute = () => {
            // Remove existing route
            if (map.getSource(sourceId)) {
                try {
                    if (map.getLayer(sourceId)) map.removeLayer(sourceId);
                    map.removeSource(sourceId);
                } catch {
                    // Layer/source might not exist
                }
            }

            if (!directionsData?.routes?.length) return;

            const routeCoordinates = directionsData.routes[0].geometry.coordinates;

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
                    'line-color': MAP_CONFIG.routeColor,
                    'line-width': MAP_CONFIG.routeWidth,
                },
            });
        };

        if (map.isStyleLoaded()) {
            drawRoute();
        } else {
            map.on('load', drawRoute);
        }
    }, [directionsData]);

    return (
        <div
            id="map-container"
            className="fixed bottom-0 left-1/2 z-10 h-[180px] w-full -translate-x-1/2
                 border-t-[3px] border-navy"
        >
            <div ref={mapContainerRef} id="map" className="h-full w-full" />
        </div>
    );
}
