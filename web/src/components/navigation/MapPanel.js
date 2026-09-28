"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_ZOOM = 17;
const SOURCE_ID = "route";

export default function MapPanel({
  userLocation,
  destination,
  directionsData,
  isMapCentered,
  isBearing,
  compassRotation,
  onUserInteraction,
  onMapBearingChange,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const mapBearingRef = useRef(0);
  const isLoadedRef = useRef(false);

  // Keep latest callbacks in ref to avoid re-triggering map initialization
  const callbacksRef = useRef({ onUserInteraction, onMapBearingChange });
  useEffect(() => {
    callbacksRef.current = { onUserInteraction, onMapBearingChange };
  }, [onUserInteraction, onMapBearingChange]);

  // Initial user location ref to center initial map without re-creating map
  const initialCenterRef = useRef(
    userLocation?.latitude && userLocation?.longitude
      ? [userLocation.longitude, userLocation.latitude]
      : [79.30562, 21.38541] // KITS Ramtek campus default center
  );

  // Initialize Mapbox map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const token =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
      "pk.eyJ1IjoicHJhbmtpdGEiLCJhIjoiY2xydnB6aXQzMHZqejJpdGV1NnByYW1kZyJ9.OedTGDqNQXNv-DJOV2HXuw";

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: initialCenterRef.current,
      zoom: 16,
      bearing: 0,
      pitch: 0,
      projection: "globe",
    });

    mapInstanceRef.current = map;

    map.on("load", () => {
      isLoadedRef.current = true;
      try {
        map.setFog({});
      } catch (err) {
        console.warn("Mapbox setFog warning:", err);
      }
      map.resize();
    });

    map.on("rotate", (e) => {
      const b = e.target.getBearing();
      mapBearingRef.current = b;
      callbacksRef.current.onMapBearingChange?.(b);
    });

    // Detect user manual interaction
    const handleInteraction = () => {
      callbacksRef.current.onUserInteraction?.();
    };

    map.on("touchstart", handleInteraction);
    map.on("dragstart", handleInteraction);

    const handleWindowResize = () => {
      map.resize();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      isLoadedRef.current = false;
      window.removeEventListener("resize", handleWindowResize);
      map.off("touchstart", handleInteraction);
      map.off("dragstart", handleInteraction);
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.remove();
        currentLocationMarkerRef.current = null;
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.remove();
        destinationMarkerRef.current = null;
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // Handle user location updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation?.latitude || !userLocation?.longitude) return;

    const { latitude, longitude } = userLocation;

    // Follow user if centered
    if (isMapCentered) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: DEFAULT_ZOOM,
        essential: true,
        speed: 1.5,
      });
    }

    // Update or create "You are here" marker
    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setLngLat([longitude, latitude]);
    } else {
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.style.backgroundImage = "url(/models/current.png)";
      markerEl.style.width = "30px";
      markerEl.style.height = "30px";

      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML("You are here!"))
        .addTo(map);

      currentLocationMarkerRef.current = marker;
    }
  }, [userLocation, isMapCentered]);

  // Handle compass and bearing rotation
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (isMapCentered && isBearing) {
      map.setBearing(compassRotation);
    }

    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.setRotation(
        compassRotation - mapBearingRef.current
      );
      currentLocationMarkerRef.current.setPitchAlignment("map");
    }
  }, [compassRotation, isMapCentered, isBearing]);

  // Handle destination marker updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!destination) {
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.remove();
        destinationMarkerRef.current = null;
      }
      return;
    }

    const { latitude, longitude, name } = destination;

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    const marker = new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(name || "Destination"))
      .addTo(map);

    destinationMarkerRef.current = marker;
  }, [destination]);

  // Handle route line drawing
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const updateRoute = () => {
      if (!isLoadedRef.current) return;

      const hasRoute =
        directionsData?.routes?.length &&
        directionsData.routes[0]?.geometry?.coordinates?.length;

      // Clean existing route if already present
      if (map.getSource(SOURCE_ID)) {
        try {
          if (map.getLayer(SOURCE_ID)) {
            map.removeLayer(SOURCE_ID);
          }
          map.removeSource(SOURCE_ID);
        } catch (err) {
          console.error("Error removing route layer/source:", err);
        }
      }

      if (!hasRoute) return;

      const routeCoordinates = directionsData.routes[0].geometry.coordinates;

      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        },
      });

      map.addLayer({
        id: SOURCE_ID,
        type: "line",
        source: SOURCE_ID,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3882f6",
          "line-width": 7,
        },
      });
    };

    if (map.isStyleLoaded()) {
      updateRoute();
    } else {
      map.once("style.load", updateRoute);
    }
  }, [directionsData]);

  return (
    <div
      id="map-container"
      className="fixed bottom-0 left-0 right-0 w-full h-[180px] border-t border-border shadow-[0_-8px_32px_rgba(0,0,0,0.5)] z-2"
    >
      <div ref={mapContainerRef} id="map" className="w-full h-full" />
    </div>
  );
}
